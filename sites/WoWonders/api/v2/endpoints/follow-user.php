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
    'api_status' => 400,
);
if (empty($_POST['user_id'])) {
    $error_code    = 3;
    $error_message = 'user_id (POST) is missing';
}
if (empty($error_code)) {
    $recipient_id   = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($recipient_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
    	$follow_message = 'invalid';
        if (Wo_IsFollowing($recipient_id, $wo['user']['user_id']) === true || Wo_IsFollowRequested($recipient_id, $wo['user']['user_id']) === true) {
            if (Wo_DeleteFollow($recipient_id, $wo['user']['user_id'])) {
                $follow_message = 'unfollowed';
            }
        } else {
            if (Wo_RegisterFollow($recipient_id, $wo['user']['user_id'])) {
                $follow_message = 'followed';
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'follow_status' => $follow_message
		);
    }
}