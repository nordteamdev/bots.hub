<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2017 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
require_once('assets/init.php');
$provider = "";
$types = array(
    'Google',
    'Facebook',
    'Twitter',
    'LinkedIn',
    'Vkontakte',
    'Instagram'
);
if (isset($_GET['provider']) && in_array($_GET['provider'], $types)) {
    $provider = Wo_Secure($_GET['provider']);
}

require_once('assets/libraries/social-login/config.php');
require_once('assets/libraries/social-login/autoload.php');

use Hybridauth\Hybridauth;
use Hybridauth\HttpClient;

if (isset($_GET['provider']) && in_array($_GET['provider'], $types)) {
    try {
        $hybridauth = new Hybridauth( $LoginWithConfig );

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
                Wo_SetLoginWithSession($user_email);
                header("Location: " . $config['site_url']);
                exit();
            } else {
                $str          = md5(microtime());
                $id           = substr($str, 0, 9);
                $user_uniq_id = (Wo_UserExists($id) === false) ? $id : 'u_' . $id;
                $social_url   = substr($user_profile->profileURL, strrpos($user_profile->profileURL, '/') + 1);
                $imported_image = Wo_ImportImageFromLogin($user_profile->photoURL, 1);
                if (empty($imported_image)) {
                    $imported_image = $wo['userDefaultAvatar'];
                }
                $password = rand(1111, 9999);
                $re_data      = array(
                    'username' => Wo_Secure($user_uniq_id, 0),
                    'email' => Wo_Secure($user_email, 0),
                    'password' => Wo_Secure(md5($password), 0),
                    'email_code' => Wo_Secure(md5(rand(1111, 9999) . time()), 0),
                    'first_name' => Wo_Secure($name),
                    'last_name' => Wo_Secure($user_profile->lastName),
                    'avatar' => Wo_Secure($imported_image),
                    'src' => Wo_Secure($provider),
                    'startup_image' => 1,
                    'lastseen' => time(),
                    'social_login' => 1,
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
                if ($provider == 'Vkontakte') {
                    $re_data['about'] = Wo_Secure($user_profile->description);
                    $re_data['vk']    = Wo_Secure($social_url);
                }
                if ($provider == 'Instagram') {
                    $re_data['instagram']   = Wo_Secure($user_profile->username);
                }
                if (!empty($_SESSION['ref']) && $wo['config']['affiliate_type'] == 0) {
                    $ref_user_id = Wo_UserIdFromUsername($_SESSION['ref']);
                    if (!empty($ref_user_id) && is_numeric($ref_user_id)) {
                        $re_data['referrer'] = Wo_Secure($ref_user_id);
                        $re_data['src']      = Wo_Secure('Referrer');
                        $update_balance      = Wo_UpdateBalance($ref_user_id, $wo['config']['amount_ref']);
                        unset($_SESSION['ref']);
                    }
                }
                if (Wo_RegisterUser($re_data) === true) {
                    Wo_SetLoginWithSession($user_email);
                    $user_id = Wo_UserIdFromEmail($user_email);
                    if (!empty($wo['config']['auto_friend_users'])) {
                        $autoFollow = Wo_AutoFollow($user_id);
                    }
                    if (!empty($user_profile->photoURL) && $imported_image != $wo['userDefaultAvatar']) {
                        $explode2  = @end(explode('.', $imported_image));
                        $explode3  = @explode('.', $imported_image);
                        $last_file = $explode3[0] . '_full.' . $explode2;
                        $compress = Wo_CompressImage($imported_image, $last_file, 50);
                        if ($compress) {
                            $upload_s3 = Wo_UploadToS3($last_file);
                            $query = mysqli_query($sqlConnect, "INSERT INTO " . T_POSTS . " (`user_id`, `postFile`, `time`, `postType`, `postPrivacy`) VALUES ('$user_id', '" . Wo_Secure($last_file) . "', '" . Wo_Secure(time()) . "', 'profile_picture_deleted', '0')");
                            $sql_id = mysqli_insert_id($sqlConnect);
                            $sql_id = Wo_Secure($sql_id);
                            $update_query = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `post_id` = '$sql_id' WHERE `id` = '$sql_id'");
                            Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $imported_image, $imported_image, $wo['profile_picture_image_quality']);
                            $upload_s3 = Wo_UploadToS3($imported_image);
                        }
                    }
                    $wo['user'] = $re_data;
                    $wo['pass'] = $password;
                    $body       = Wo_LoadPage('emails/login-with');
                    $headers    = "From: " . $config['siteName'] . " <" . $config['siteEmail'] . ">\r\n";
                    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
                    @mail($re_data['email'], 'Thank you for your registration.', $body, $headers);
                    header("Location: " . Wo_SeoLink('index.php?link1=start-up'));
                    exit();
                }
            }
        }
    }
    catch (Exception $e) {
        echo $e->getMessage();
        echo " <b><a href='" . Wo_SeoLink('index.php?link1=welcome') . "'>Try again<a></b>";
    }
} else {
    header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}