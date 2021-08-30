<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2018 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
$response_data   = array(
    'api_status' => 400
);
$required_fields = array(
    'username',
    'password',
    'email',
    'confirm_password'
);
foreach ($required_fields as $key => $value) {
    if (empty($_POST[$value]) && empty($error_code)) {
        $error_code    = 3;
        $error_message = $value . ' (POST) is missing';
    }
}
if (empty($error_code)) {
    $username         = $_POST['username'];
    $password         = $_POST['password'];
    $email            = $_POST['email'];
    $confirm_password = $_POST['confirm_password'];
    if (in_array(true, Wo_IsNameExist($username, 0))) {
        $error_code    = 4;
        $error_message = 'Username is already taken';
    } else if (in_array($username, $wo['site_pages']) || !preg_match('/^[\w]+$/', $username)) {
        $error_code    = 5;
        $error_message = 'Invalid username characters, please choose another username';
    } else if (strlen($username) < 5 OR strlen($username) > 32) {
        $error_code    = 6;
        $error_message = 'Username must be between 5 / 32 letters';
    } else if (Wo_EmailExists($email) === true) {
        $error_code    = 7;
        $error_message = 'E-mail is already taken';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_code    = 8;
        $error_message = 'E-mail is invalid';
    } else if (strlen($password) < 6) {
        $error_code    = 9;
        $error_message = 'Password is too short';
    } else if ($password != $confirm_password) {
        $error_code    = 10;
        $error_message = 'Passwords don\'t match';
    }
    if (empty($error_code)) {
        $activate  = ($wo['config']['emailValidation'] == '1') ? 0 : 1;
        $device_id = (!empty($_POST['device_id'])) ? $_POST['device_id'] : '';
        $gender    = 'male';
        if (!empty($_POST['gender'])) {
            if ($_POST['gender'] == 'female') {
                $gender = 'female';
            }
        }
        $code = md5(rand(1111, 9999) . time());
        $account_data = array(
            'email' => Wo_Secure($email, 0),
            'username' => Wo_Secure($username, 0),
            'password' => Wo_Secure($password, 0),
            'email_code' => $code,
            'src' => 'Phone',
            'timezone' => 'UTC',
            'device_id' => Wo_Secure($device_id),
            'gender' => Wo_Secure($gender),
            'lastseen' => time(),
            'active' => Wo_Secure($activate)
        );
        $register     = Wo_RegisterUser($account_data);
        if ($register === true) {
            if ($activate == 1) {
                $access_token        = sha1(rand(111111111, 999999999)) . md5(microtime()) . rand(11111111, 99999999) . md5(rand(5555, 9999));
                $time                = time();
                $user_id             = Wo_UserIdFromUsername($username);
                $create_access_token = mysqli_query($sqlConnect, "INSERT INTO " . T_APP_SESSIONS . " (`user_id`, `session_id`, `platform`, `time`) VALUES ('{$user_id}', '{$access_token}', 'phone', '{$time}')");
                if ($create_access_token) {
                    $response_data = array(
                        'api_status' => 200,
                        'access_token' => $access_token,
                        'user_id' => $user_id
                    );
                }
            } else {
                $wo['user']        = $_POST;
                $wo['code']        = $code;
                $body              = Wo_LoadPage('emails/activate');
                $send_message_data = array(
                    'from_email' => $wo['config']['siteEmail'],
                    'from_name' => $wo['config']['siteName'],
                    'to_email' => $email,
                    'to_name' => $username,
                    'subject' => $wo['lang']['account_activation'],
                    'charSet' => 'utf-8',
                    'message_body' => $body,
                    'is_html' => true
                );
                $send              = Wo_SendMessage($send_message_data);
                if ($send) {
                    $response_data = array(
                        'api_status' => 220,
                        'message' => 'Registration successful! We have sent you an email, Please check your inbox/spam to verify your email.'
                    );
                } else {
                    $error_code    = 11;
                    $error_message = 'Error found while sending the verification email, please try again later.';
                }
            }
        }
    }
}