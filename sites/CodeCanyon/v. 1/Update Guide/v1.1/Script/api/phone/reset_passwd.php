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

   http://www.site.com/app_api.php? type = reset_passwd
   POST:
       1. email            = < user email >

   ERROR CODES: 
       1.  No user email  sent.
       2.  E-mail is not exists.

   JSON REPLY:
       {
        'api_status'     => '200',
        'api_text'       => 'success',
        'api_version'    => 'api_version'
        
       }


*/


$json_error_data                   = array();
$json_success_data                 = array();
$follow_data                       = array();
$type                              = FL_Secure($_GET['type'], 0);
if ($type == 'reset_passwd') {
    if (empty($_POST['email'])) {
        $json_error_data           = array(
            'api_status'           => '400',
            'api_text'             => 'failed',
            'api_version'          => $api_version,
            'errors'               => array(
                'error_id'         => '1',
                'error_text'       => 'No user email  sent.'
            )
        );
    } else if (FL_EmailExists($_POST['email']) === false) {
        $json_error_data           = array(
            'api_status'           => '400',
            'api_text'             => 'failed',
            'api_version'          => $api_version,
            'errors'               => array(
                'error_id'         => '2',
                'error_text'       => 'E-mail is not exists.'
            )
        );
    } 
    if (empty($json_error_data)) {
        $user_recover_data         = FL_UserData(FL_UserIdFromEmail($_POST['email']));
        $subject                   = $config['name'] . 'password_rest_request';
        $user_recover_data['link'] = FL_Link('index.php?link1=reset-password&code=' . $user_recover_data['user_id'] . '_' . $user_recover_data['password']);
        $fl['recover']             = $user_recover_data;
        $reset_link                = $user_recover_data['link'];
        $username                  = $user_recover_data['name'];
        $body                      = FL_LoadPage('emails/forgot-password');
        $body                      = str_replace('{username}', $username, $body);
        $body                      = str_replace('{reset_link}', $reset_link, $body);
        $body                      = str_replace('{site_name}', $fl['config']['name'], $body);
        $send_message_data         = array(
            'from_email'           => $fl['config']['email'],
            'from_name'            => $fl['config']['name'],
            'to_email'             => $_POST['email'],
            'to_name'              => '',
            'subject'              => $subject,
            'charSet'              => 'utf-8',
            'message_body'         => $body,
            'is_html'              => true
        );
        $send                      = FL_SendMessage($send_message_data);
    } 
    else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
$json_success_data                 = array(
    'api_status'                   => '200',
    'api_text'                     => 'success',
    'api_version'                  => $api_version,
);
header("Content-type: application/json");
echo json_encode($json_success_data);
exit();