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

if (empty($_POST['user_id'])) {
    $error_code    = 4;
    $error_message = 'user_id (POST) is missing';
}
if (empty($_POST['fetch'])) {
    $error_code    = 3;
    $error_message = 'fetch (POST) is missing';
}
if (empty($error_code)) {
	$user_id  = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($user_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
    	$response_data = array(
		    'api_status' => 200,
		);
    	$fetch = explode(',', $_POST['fetch']);
		$data = array();
		foreach ($fetch as $key => $value) {
			$data[$value] = $value;
		}
		if (!empty($data['groups'])) {
			$response_data['groups'] = Wo_GetUsersGroups($user_id);
		}
		if (!empty($data['pages'])) {
			$response_data['pages'] = Wo_GetMyPages($user_id);
		}
		if (!empty($data['liked_pages'])) {
			$response_data['liked_pages'] = Wo_GetLikes($user_id, 'profile', 50, 0, array('in' => 'profile_sidebar', 'likes_data' => $recipient_data['likes_data']));
		}
    }
}
