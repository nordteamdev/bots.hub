<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2016 phpflame. All rights reserved.
// +------------------------------------------------------------------------+
require_once('assets/init.php');
require_once( "assets/import/hybridauth/hybridauth/Hybrid/Auth.php" );
require_once( "assets/import/hybridauth/hybridauth/Hybrid/Endpoint.php" );

require_once('assets/import/hybridauth/config.php');
$types = array(
    'Google',
    'Facebook',
    'Twitter',
    'Vkontakte'
);
if (isset($_GET['provider']) && in_array($_GET['provider'], $types)) {
    $provider = FL_Secure($_GET['provider']);
    try {
        $hybridauth   = new Hybrid_Auth($LoginWithConfig);
        $authProvider = $hybridauth->authenticate($provider);
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
            } else if ($provider == 'Vkontakte') {
                $notfound_email     = 'vk_';
                $notfound_email_com = '@vkontakte.com';
            }
            $user_name  = $notfound_email . $user_profile->identifier;
            $user_email = $user_name . $notfound_email_com;
            if (!empty($user_profile->email)) {
                $user_email = $user_profile->email;
            }
            if (FL_EmailExists($user_email) === true) {
                $user_id = FL_UserIdForLogin($user_email);
                $session = FL_CreateLoginSession($user_id);
                $_SESSION['user_id'] = $session;
                setcookie(
                  "user_id",
                  $session,
                  time() + (10 * 365 * 24 * 60 * 60)
                );
                header("Location: " . $config['site_url']);
                exit();
            } else {
                $str          = md5(microtime());
                $id           = substr($str, 0, 9);
                $user_uniq_id = (FL_UserExists($id) === false) ? $id : 'u_' . $id;
                $social_url   = substr($user_profile->profileURL, strrpos($user_profile->profileURL, '/') + 1);
                $image = FL_ImportImageFromLogin($user_profile->photoURL);
                $re_data      = array(
                    'username' => FL_Secure($user_uniq_id, 0),
                    'email' => FL_Secure($user_email, 0),
                    'password' => FL_Secure($user_email, 0),
                    'email_code' => FL_Secure(md5($user_uniq_id), 0),
                    'first_name' => FL_Secure($name),
                    'last_name' => FL_Secure($user_profile->lastName),
                    'avatar' => FL_Secure($image),
                    'src' => FL_Secure($provider),
                    'active' => '1'
                );
                if ($fl['config']['amazone_s3'] == 1) {
                    $upload = FL_UploadToS3($image);
                }
                if ($provider == 'Google') {
                    $re_data['about']  = FL_Secure($user_profile->description);
                    $re_data['google'] = FL_Secure($social_url);
                }
                if ($provider == 'Facebook') {
                    $fa_social_url       = @explode('/', $user_profile->profileURL);
                    $re_data['facebook'] = FL_Secure($fa_social_url[4]);
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
                    $re_data['twitter'] = FL_Secure($social_url);
                }
                if (FL_RegisterUser($re_data) === true) {
                    $user_id = FL_UserIdForLogin($user_email);
                    $session = FL_CreateLoginSession($user_id);
                    $_SESSION['user_id'] = $session;
                    setcookie(
                      "user_id",
                      $session,
                      time() + (10 * 365 * 24 * 60 * 60)
                    );
                    /*$wo['user'] = $re_data;
                    $body       = FL_LoadPage('emails/login-with');
                    $headers    = "From: " . $config['siteName'] . " <" . $config['siteEmail'] . ">\r\n";
                    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
                    @mail($re_data['email'], 'Thank you for your registration.', $body, $headers);*/
                    header("Location: " . FL_Link(''));
                    exit('Done');
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
        echo " <b><a href='" . FL_Link('') . "'>Try again<a></b>";
    }
} else {
    header("Location: " . FL_Link(''));
    exit();
}