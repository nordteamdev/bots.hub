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

$user_data = array();
if (!empty($_POST)) {
	$user_data = $_POST;
}

$escape = array('server_key');
$genders = array('male', 'female');
$keys = array();
$remove_from_list = array('user_id', 'background_image', 'background_image_status', 'last_data_update', 'sidebar_data', 'details', 'id'. 'following_data', 'name', 'url', 'followers_data', 'likes_data', 'groups_data', 'album_data', 'css_file', 'joined');
foreach ($wo['user'] as $key => $value) {
	if (!in_array($key, $remove_from_list )) {
		$keys[] = $key;
	}
}

$keys = implode(', ', $keys);

if (!empty($user_data['username'])) {
	$is_exist = Wo_IsNameExist($user_data['username'], 0);
    if (in_array(true, $is_exist) && $user_data['username'] != $wo['user']['username']) {
        $error_code    = 2;
        $error_message = 'Username is already exists';
    }
    if (in_array($user_data['username'], $wo['site_pages']) || !preg_match('/^[\w]+$/', $user_data['username'])) {
        $error_code    = 3;
        $error_message = 'Invalid username characters';
    }
    if (strlen($user_data['username']) < 5 || strlen($user_data['username']) > 32) {
        $error_code    = 4;
        $error_message = 'Username must be between 5/32';
    }
}

if (!empty($user_data['email'])) {
	$is_exist = Wo_EmailExists($user_data['email']);
    if ($is_exist && $user_data['email'] != $wo['user']['email']) {
        $error_code    = 5;
        $error_message = 'E-mail is already exists';
    }
    if (!filter_var($user_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_code    = 6;
        $error_message = 'Invalid email characters';
    }
}

if (!empty($user_data['phone_number'])) {
	$is_exist = Wo_PhoneExists($user_data['phone_number']);
    if ($is_exist && $user_data['phone_number'] != $wo['user']['phone_number']) {
        $error_code    = 7;
        $error_message = 'Phone number already used';
    }
}

if (!empty($user_data['new_password']) && !empty($user_data['current_password'])) {
    if (Wo_HashPassword($user_data['current_password'], $wo['user']['password']) == false) {
        $error_code    = 8;
        $error_message = 'Current password not match';
    }
    if (strlen($user_data['new_password']) < 6) {
        $error_code    = 9;
        $error_message = 'Password is too short';
    }
    if (empty($error_code)) {
    	$user_data['password'] = sha1($user_data['new_password']);
    	unset($user_data['new_password']);
    	unset($user_data['current_password']);
    }
}

if (!empty($user_data['gender'])) {
	$user_data['gender'] = (in_array($user_data['gender'], $genders)) ? $user_data['gender'] : $wo['user']['gender'];
}

if (!empty($user_data['follow_privacy'])) {
	$user_data['follow_privacy'] = (in_array($user_data['follow_privacy'], array(0, 1))) ? $user_data['follow_privacy'] : $wo['user']['follow_privacy'];
}

if (!empty($user_data['message_privacy'])) {
	$user_data['message_privacy'] = (in_array($user_data['message_privacy'], array(0, 1))) ? $user_data['message_privacy'] : $wo['user']['message_privacy'];
}

if (!empty($user_data['birth_privacy'])) {
	$user_data['birth_privacy'] = (in_array($user_data['birth_privacy'], array(0, 1, 2))) ? $user_data['birth_privacy'] : $wo['user']['birth_privacy'];
}

if (!empty($user_data['friend_privacy'])) {
	$user_data['friend_privacy'] = (in_array($user_data['friend_privacy'], array(0, 1, 2, 3))) ? $user_data['friend_privacy'] : $wo['user']['friend_privacy'];
}

if (!empty($user_data['post_privacy'])) {
	$user_data['post_privacy'] = (in_array($user_data['post_privacy'], array('everyone', 'ifollow', 'nobody'))) ? $user_data['post_privacy'] : $wo['user']['post_privacy'];
}

if (!empty($user_data['confirm_followers'])) {
	$user_data['confirm_followers'] = (in_array($user_data['confirm_followers'], array(0, 1))) ? $user_data['confirm_followers'] : $wo['user']['confirm_followers'];
}

if (!empty($user_data['visit_privacy'])) {
	$user_data['visit_privacy'] = (in_array($user_data['visit_privacy'], array(0, 1))) ? $user_data['visit_privacy'] : $wo['user']['visit_privacy'];
}

if (!empty($user_data['showlastseen'])) {
	$user_data['showlastseen'] = (in_array($user_data['showlastseen'], array(0, 1))) ? $user_data['showlastseen'] : $wo['user']['showlastseen'];
}

if (!empty($user_data['show_activities_privacy'])) {
	$user_data['show_activities_privacy'] = (in_array($user_data['show_activities_privacy'], array(0, 1))) ? $user_data['show_activities_privacy'] : $wo['user']['show_activities_privacy'];
}

if (!empty($user_data['share_my_location'])) {
	$user_data['share_my_location'] = (in_array($user_data['share_my_location'], array(0, 1))) ? $user_data['share_my_location'] : $wo['user']['share_my_location'];
}

if (!empty($user_data['status'])) {
	$user_data['status'] = (in_array($user_data['status'], array(0, 1))) ? $user_data['status'] : $wo['user']['status'];
}

if (!empty($_FILES["avatar"]["tmp_name"])) {
	$upload_image = Wo_UploadImage($_FILES["avatar"]["tmp_name"], $_FILES['avatar']['name'], 'avatar', $_FILES['avatar']['type'], $wo['user']['user_id']);
    if ($upload_image) {
        $response_data['api_status'] = 200;
    }
}

if (!empty($_FILES["cover"]["tmp_name"])) {
	$upload_image = Wo_UploadImage($_FILES["cover"]["tmp_name"], $_FILES['cover']['name'], 'cover', $_FILES['cover']['type'], $wo['user']['user_id']);
    if ($upload_image) {
        $response_data['api_status'] = 200;
    }
}

if (isset($user_data['server_key'])) {
	unset($user_data['server_key']);
}

if (empty($error_code)) {
	foreach ($user_data as $key => $value) {
		if (!isset($wo['user'][$key]) && !in_array($key, $escape)) {
			$error_code = 1;
			$error_message = "Key #$key not found, check Wo_Users table to get the correct information, or you can use the following keys: $keys";
			unset($user_data[$key]);
		}
	}
}

if (empty($error_code)) {
	$update = Wo_UpdateUserData($wo['user']['user_id'], $user_data);
	$update_last_seen = Wo_LastSeen($wo['user']['user_id']);
	if ($update) {
		$response_data['api_status'] = 200;
		$response_data['message'] = 'Your profile was updated';
	}
}