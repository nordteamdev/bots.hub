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
    'api_status' => 400
);
if (empty($_POST['user_id'])) {
    $error_code    = 4;
    $error_message = 'user_id (POST) is missing';
}
if (empty($error_code)) {
    $user_id  = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($user_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
    	$delete = Wo_DeleteConversation($user_id, $wo['user']['user_id']);
    	if ($delete) {
    		$response_data = array(
		        'api_status' => 200,
		        'message' => "Conversation successfully deleted."
		    );
    	}
    }
}