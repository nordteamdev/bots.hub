<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2016 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
use Hybridauth\Hybridauth;
use Hybridauth\HttpClient;
$types = array(
    'Google',
    'Facebook',
    'Twitter',
    'LinkedIn',
    'Vkontakte',
    'Instagram'
);
if (isset($_GET['provider']) && in_array($_GET['provider'], $types) && !empty($_GET['hash'])) {
    $hash = Wo_Secure($_GET['hash']);
    if (empty($_SESSION['hash']) OR !isset($_SESSION['hash'])) {
        $query = mysqli_query($sqlConnect, "INSERT INTO " . T_APPS_HASH . " (`hash_id`, `active`) VALUES ('{$hash}', '0')");
        if ($query) {
            $_SESSION['hash'] = $_GET['hash'];
        }
    }
    $provider = Wo_Secure($_GET['provider']);
    try {
        $hybridauth   = new Hybridauth($LoginWithConfig);
        $authProvider = $hybridauth->authenticate($provider);
        $tokens = $authProvider->getAccessToken();
        $user_profile = $authProvider->getUserProfile();
        if ($user_profile && isset($user_profile->identifier)) {
            $name = $user_profile->firstName;
            if ($provider == 'Google') {
                $notfound_email     = 'go_';
                $notfound_email_com = '@google.com';
            } else if ($provider == 'Facebook') {
                $notfound_email     = 'fa_';
                $notfound_email_com = '@facebook.com';
            } else if ($provider == 'Twitter') {
                $notfound_email     = 'tw_';
                $notfound_email_com = '@twitter.com';
            } else if ($provider == 'LinkedIn') {
                $notfound_email     = 'li_';
                $notfound_email_com = '@linkedIn.com';
            } else if ($provider == 'Vkontakte') {
                $notfound_email     = 'vk_';
                $notfound_email_com = '@vk.com';
            } else if ($provider == 'Instagram') {
                $notfound_email     = 'in_';
                $notfound_email_com = '@instagram.com';
                $name = $user_profile->displayName;
            }
            $user_name  = $notfound_email . $user_profile->identifier;
            $user_email = $user_name . $notfound_email_com;
            if (!empty($user_profile->email)) {
                $user_email = $user_profile->email;
            }
            if (Wo_EmailExists($user_email) === true) {
                $user_id    = Wo_UserIdFromEmail($user_email);
                $query = mysqli_query($sqlConnect, "UPDATE " . T_APPS_HASH . " SET `active` = '1', `user_id` = '{$user_id}' WHERE `hash_id` = '{$hash}'");
                if ($query) {
                    unset($_SESSION['hash']);
                    echo Wo_LoadPage('api/phone/social-login/content');
                    exit();
                }
            } else {
                $str          = md5(microtime());
                $id           = substr($str, 0, 9);
                $user_uniq_id = (Wo_UserExists($id) === false) ? $id : 'u_' . $id;
                $social_url   = substr($user_profile->profileURL, strrpos($user_profile->profileURL, '/') + 1);
                $re_data      = array(
                    'username' => Wo_Secure($user_uniq_id, 0),
                    'email' => Wo_Secure($user_email, 0),
                    'password' => Wo_Secure($user_email, 0),
                    'email_code' => Wo_Secure(md5($user_uniq_id), 0),
                    'first_name' => Wo_Secure($name),
                    'last_name' => Wo_Secure($user_profile->lastName),
                    'avatar' => Wo_Secure(Wo_ImportImageFromLogin($user_profile->photoURL)),
                    'src' => Wo_Secure($provider),
                    'startup_image' => 1,
                    'lastseen' => time(),
                    'timezone' => 'UTC',
                    'active' => '1'
                );
                if ($provider == 'Google') {
                    $re_data['about']  = Wo_Secure($user_profile->description);
                    $re_data['google'] = Wo_Secure($social_url);
                }
                if ($provider == 'Facebook') {
                    $fa_social_url       = @explode('/', $user_profile->profileURL);
                    $re_data['facebook'] = Wo_Secure($fa_social_url[4]);
                    $re_data['gender'] = 'male';
                    if (!empty($user_profile->gender)) {
                        if ($user_profile->gender == 'male') {
                            $re_data['gender'] = 'male';
                        } else if ($user_profile->gender == 'female') {
                            $re_data['gender'] = 'female';
                        }
                    }
                }
                if ($provider == 'Twitter') {
                    $re_data['twitter'] = Wo_Secure($social_url);
                }
                if ($provider == 'LinkedIn') {
                    $re_data['about']    = Wo_Secure($user_profile->description);
                    $re_data['linkedIn'] = Wo_Secure($social_url);
                }
                if (Wo_RegisterUser($re_data) === true) {
                    $wo['user'] = $re_data;
                    $user_id    = Wo_UserIdFromUsername($re_data['username']);
                    $body       = Wo_LoadPage('emails/login-with');
                    $headers    = "From: " . $config['siteName'] . " <" . $config['siteEmail'] . ">\r\n";
                    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
                    @mail($re_data['email'], 'Thank you for your registration.', $body, $headers);
                    $query = mysqli_query($sqlConnect, "UPDATE " . T_APPS_HASH . " SET `active` = '1', `user_id` = '{$user_id}' WHERE `hash_id` = '{$hash}'");
                    if ($query) {
                        unset($_SESSION['hash']);
                        echo Wo_LoadPage('api/phone/social-login/content');
                        exit();
                    }
                }
            }
        }
    }
    catch (Exception $e) {
        switch ($e->getCode()) {
            case 0:
                echo "Unspecified error.";
                break;
            case 1:
                echo "Hybridauth configuration error.";
                break;
            case 2:
                echo "Provider not properly configured.";
                break;
            case 3:
                echo "Unknown or disabled provider.";
                break;
            case 4:
                echo "Missing provider application credentials.";
                break;
            case 5:
                echo "Authentication failed The user has canceled the authentication or the provider refused the connection.";
                break;
            case 6:
                echo "User profile request failed. Most likely the user is not connected to the provider and he should to authenticate again.";
                break;
            case 7:
                echo "User not connected to the provider.";
                break;
            case 8:
                echo "Provider does not support this feature.";
                break;
        }
        echo " an error found while processing your request!";
        echo " <b><a href='" . Wo_SeoLink('index.php?link1=welcome') . "'>Try again<a></b>";
    }
} else {
    //b header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit('Error found while loggin in, pleae try again later.');
}