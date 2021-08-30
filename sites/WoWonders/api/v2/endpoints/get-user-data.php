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
if (empty($_POST['fetch'])) {
    $error_code    = 3;
    $error_message = 'fetch (POST) is missing';
}
if (empty($error_code)) {
    $recipient_id   = Wo_Secure($_POST['user_id']);
    $logged_user_id  = $wo['user']['user_id'];
    $recipient_data = Wo_UserData($recipient_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
    	$response_data = array('api_status' => 200);
		$recipient_data_ = Wo_UpdateUserDetails($recipient_data, true, true, true);
        if (is_array($recipient_data_)) {
            $recipient_data = $recipient_data_;
        }
        foreach ($non_allowed as $key => $value) {
           unset($recipient_data[$value]);
        }
	    $fetch = explode(',', $_POST['fetch']);
		$data = array();
		foreach ($fetch as $key => $value) {
			$data[$value] = $value;
		}
		if (!empty($data['user_data'])) {
			$recipient_data['is_following'] = 0;
	        $recipient_data['can_follow'] = 0;
	        if (Wo_IsFollowing($recipient_id, $logged_user_id)) {
	            $recipient_data['is_following'] = 1;
	            $recipient_data['can_follow'] = 1;
	        } else {
	            if (Wo_IsFollowRequested($recipient_id, $logged_user_id)) {
	                $recipient_data['is_following'] = 2;
	                $recipient_data['can_follow'] = 1;
	            } else {
	                if ($recipient_data['follow_privacy'] == 1) {
	                    if (Wo_IsFollowing($logged_user_id, $recipient_id)) {
	                        $recipient_data['is_following'] = 0;
	                        $recipient_data['can_follow'] = 1;
	                    }
	                } else if ($recipient_data['follow_privacy'] == 0) {
	                    $recipient_data['can_follow'] = 1;
	                }
	            }
	        }
	        $recipient_data['is_following_me'] = (Wo_IsFollowing($recipient_data['user_id'], $wo['user']['user_id'] )) ? 1 : 0;
	        $recipient_data['gender_text']        = ($recipient_data['gender'] == 'male') ? $wo['lang']['male'] : $wo['lang']['female'];
        	$recipient_data['lastseen_time_text'] = Wo_Time_Elapsed_String($recipient_data['lastseen']);
        	$recipient_data['is_blocked']         = Wo_IsBlocked($recipient_data['user_id']);
        	$response_data['user_data'] = $recipient_data;
		}

		if (!empty($data['followers'])) {
			$followers_latest = array();
			$followers = Wo_GetFollowers($recipient_data['user_id'], 'profile', 50);
			foreach ($followers as $key => $follower) {
				$follower['is_following'] = (Wo_IsFollowing($wo['user']['user_id'], $follower['user_id'])) ? 1 : 0;
				$followers_latest[] = $follower;
			}
			$response_data['followers'] = $followers_latest;
		}
		if (!empty($data['following'])) {
			$followings_latest = array();
			$followings = Wo_GetFollowing($recipient_data['user_id'], 'profile', 50);
			foreach ($followings as $key => $following) {
				$following['is_following'] = (Wo_IsFollowing($wo['user']['user_id'], $following['user_id'])) ? 1 : 0;
				$followings_latest[] = $following;
			}
			$response_data['following'] = $followings_latest;
		}
		if (!empty($data['liked_pages'])) {
			$response_data['liked_pages'] = Wo_GetLikes($recipient_data['user_id'], 'profile', 50);
		}
		if (!empty($data['joined_groups'])) {
			$response_data['joined_groups'] = Wo_GetUsersGroups($recipient_data['user_id'], 50);
		}
    }
}