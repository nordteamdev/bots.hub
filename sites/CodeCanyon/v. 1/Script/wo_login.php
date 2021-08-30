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
if (isset($_GET['code']) && !empty($_GET['code'])) {
    $app_id     = $fl['config']['wowonder_app_ID'];
    $app_secret = $fl['config']['wowonder_app_key'];
    $code       = $_GET['code'];
    $url        = $config['wownder_domain_uri'] . "/authorize?app_id={$app_id}&app_secret={$app_secret}&code={$code}";
    $get        = file_get_contents($url);

    $wo_json_reply = json_decode($get, true);
    $access_token  = '';

    if (is_array($wo_json_reply) && isset($wo_json_reply['access_token'])) {
       $access_token    = $wo_json_reply['access_token']; 
       $type            = "get_user_data";
       $url             = $config['wownder_domain_uri'] . "/app_api?access_token={$access_token}&type={$type}";
       $user_data_json  = file_get_contents($url);
       $user_data_array = json_decode($user_data_json, true);

       if (is_array($user_data_array) && !empty($user_data_array) && isset($user_data_array['user_data'])) {
            $user_data   = $user_data_array['user_data'];
            $user_email  = $user_data['email'];

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
            }


            else {
                $str             = md5(microtime());
                $id              = substr($str, 0, 9);
                $user_uniq_id    = (FL_UserExists($id) === false)    ? $id                                   : 'u_' . $id;
                $first_name      = (isset($user_data['first_name'])) ? FL_Secure($user_data['first_name'],0) : '';
                $last_name       = (isset($user_data['last_name']))  ? FL_Secure($user_data['last_name'],0)  : '';
                $gender          = (isset($user_data['gender']))     ? FL_Secure($user_data['gender'],0)     : 'none';
                $username        = (FL_Secure($user_data['username']));
                $provider        = ($config['wownder_domain_uri'] . "/{$username}");
                $re_data         = array(
                    'username'   => FL_Secure($user_uniq_id, 0),
                    'email'      => FL_Secure($user_email, 0),
                    'password'   => FL_Secure($user_email, 0),
                    'email_code' => FL_Secure(md5($user_uniq_id), 0),
                    'first_name' => $first_name,
                    'last_name'  => $last_name,
                    'gender'     => FL_Secure($gender),
                    'src'        => FL_Secure($provider),
                    'active'     => '1'
                );
                if (!empty($user_data['avatar'])) {
                    $re_data['avatar'] = FL_Secure(FL_ImportImageFromLogin($user_data['avatar']));
                }
                if ($fl['config']['amazone_s3'] == 1) {
                    $upload = FL_UploadToS3($re_data['avatar']);
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

                    header("Location: " . FL_Link(''));
                    exit('Done');
                } 
            }

       }
    }
}

else{
    echo "<a href='".$config['site_url']."'>Return back</a>";
}
?>

