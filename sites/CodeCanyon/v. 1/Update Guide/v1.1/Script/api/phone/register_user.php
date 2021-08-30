<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2017 phpflame. All rights reserved.
// +------------------------------------------------------------------------+


/* 

   http://www.site.com/app_api.php? type = user_registration
   POST:
       1. username         = < username >
       2. password         = < user password >
       3. confirm_password = < user password >
       4. email            = < user email >
       4. gender           = < default male >
       3. s                = < session >


   ERROR CODES: 
       1.  Bad request, no type specified.
       2.  Please write your username.
       3.  Username is already exists.
       4.  Username must be between 5 / 32.
       5.  Invalid username characters.
       6.  Please write your email.
       7.  This e-mail is already in use.
       8.  This e-mail is invalid.
       9.  Please write your password.
       10. Password is too short.
       11. Please confirm your password.
       12. Password not match.
       13. Error found, please try again later.

   JSON REPLY:
       {
        'api_status'     => '200',
        'api_text'       => 'success',
        'api_version'    => 'api_version',
        'success_type'   => 'registered'
        'user_id'        => 'new_user_id',
        'session_id'     => 'user session id'
        'message'        => 'text',
        'timezone'       => user_timezone,
        'cookie'         => session
        
       }


*/

$json_error_data         = array();
$json_success_data       = array();
if (empty($_GET['type']) || !isset($_GET['type'])) {
    $json_error_data = array(
        'api_status'     => '400',
        'api_text'       => 'failed',
        'api_version'    => $api_version,
        'errors'         => array(
            'error_id'   => '1',
            'error_text' => 'Bad request, no type specified.'
        )
    );
    header("Content-type: application/json");
    echo json_encode($json_error_data, JSON_PRETTY_PRINT);
    exit();
}
$json_error_data         = array(
    'api_status'         => '400',
    'api_text'           => 'failed',
    'api_version'        => $api_version,
    'errors'             => array()
);
$type = FL_Secure($_GET['type'], 0);
if ($type == 'user_registration') {
    if (empty($_POST['username'])) {
        $json_error_data['errors']  = array(
            'error_id'              => '2',
            'error_text'            => 'Please write your username.'
        );
    } else if (FL_UserExists($_POST['username'])) {
    	$json_error_data['errors']  = array(
            'error_id'              => '3',
            'error_text'            => 'Username is already exists.'
        );
    } else if (strlen($_POST['username']) < 5 OR strlen($_POST['username']) > 32) {
    	$json_error_data['errors']  = array(
            'error_id'              => '4',
            'error_text'            => 'Username must be between 5 / 32'
        );
    } else if (!preg_match('/^[\w]+$/', $_POST['username'])) {
    	$json_error_data['errors']  = array(
            'error_id'              => '5',
            'error_text'            => 'Invalid username characters'
        );
    } else if (empty($_POST['email'])) {
        $json_error_data['errors']  = array(
            'error_id'              => '6',
            'error_text'            => 'Please write your email.'
        );
    } else if (FL_EmailExists($_POST['email']) === true) {
    	$json_error_data['errors']  = array(
            'error_id'              => '7',
            'error_text'            => 'This e-mail is already in use.'
        );
    } else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    	$json_error_data['errors']  = array(
            'error_id'              => '8',
            'error_text'            => 'This e-mail is invalid.'
        );
    } else if (empty($_POST['password'])) {
    	$json_error_data['errors']  = array(
            'error_id'              => '9',
            'error_text'            => 'Please write your password.'
        );
    } else if (strlen($_POST['password']) < 6) {
    	$json_error_data['errors']  = array(
            'error_id'              => '10',
            'error_text'            => 'Password is too short.'
        );
    } else if (empty($_POST['confirm_password'])) {
    	$json_error_data['errors']  = array(
            'error_id'              => '11',
            'error_text'            => 'Please confirm your password.'
        );
    } else if ($_POST['password']  != $_POST['confirm_password']) {
    	$json_error_data['errors']  = array(
            'error_id'              => '12',
            'error_text'            => 'Password not match.'
        );
    } else if (empty($_POST['s'])) {
        $json_error_data['errors']  = array(
            'error_id'              => '13',
            'error_text'            => 'Error found, please try again later.'
        );
    } 
    if (empty($json_error_data['errors'])) {
        $username                   = FL_Secure($_POST['username'], 0);
        $password                   = FL_Secure($_POST['password'], 0);
        $email                      = FL_Secure($_POST['email'], 0);
        $hashed_time                = FL_Secure(md5(time()), 0);
        $gender                     = 'male';
        if (!empty($_POST['gender'])) {
        	if ($_POST['gender'] == 'female') {
        		$gender             = 'female';
        	}
        }
        $activate                   = 1;
        $device_id                  = '';
        if (!empty($_POST['device_id'])) {
            $device_id              = Fl_Secure($_POST['device_id']);
        }
        $re_data                    = array(
            'email'                 => $email,
            'username'              => $username,
            'password'              => $password,
            'email_code'            => $hashed_time,
            'src'                   => 'Phone',
            'timezone'              => 'UTC',
            'device_id'             => $device_id,
            'gender'                => FL_Secure($gender),
            'active'                => FL_Secure($activate)
        );
        $register                   = FL_RegisterUser($re_data);
        if ($register === true) {
            if ($activate == 1) {
                $json_success_data  = array(
                	'api_status'    => '200',
                    'api_text'      => 'success',
                    'api_version'   => $api_version,
                    'message'       => 'Successfully joined, Please wait..',
                    'success_type'  => 'registered',
                    'session_id'    => 0,
                    'cookie'        => FL_CreateLoginSession(FL_UserIdForLogin($username)),
                    'user_id'       => 0
                );
                $s       = $_POST['s'];
                $s_md5   = md5($_POST['s']);
                $time    = time();
                $user_id = FL_UserIdFromUsername($username);
                $add_session = mysqli_query($sqlConnect, "INSERT INTO " . T_APP_SESSIONS . " (`user_id`, `session_id`, `platform`, `time`) VALUES ('{$user_id}', '{$s_md5}', 'phone', '{$time}')");
                if ($add_session) {
            	    $json_success_data['session_id'] = $s_md5;
            	    $json_success_data['user_id']    = $user_id;
                }
            }
        }
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
header("Content-type: application/json");
echo json_encode($json_success_data);
exit();
?>