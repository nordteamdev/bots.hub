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
$response_data = array(
    'api_status' => 200,
    'color' => '#'
);
if (empty($_POST['user_id'])) {
    $error_code    = 3;
    $error_message = 'user_id (POST) is missing';
}
if (empty($_POST['color'])) {
    $error_code    = 4;
    $error_message = 'color (POST) is missing';
} else {
    if (!in_array($_POST['color'], $colors)) {
        $error_code    = 5;
        $error_message = 'The color you chose is not valid or not listed in our color list';
    }
}
if (empty($error_code)) {
    $recipient_id   = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($recipient_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
        if (Wo_UpdateChatColor($wo['user']['user_id'], $recipient_id, $_POST['color'])) {
            $response_data = array(
                'api_status' => 200,
                'color' => $_POST['color']
            );
        }
    }
}