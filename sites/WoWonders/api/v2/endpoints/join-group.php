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
if (empty($_POST['group_id'])) {
    $error_code    = 3;
    $error_message = 'group_id (POST) is missing';
}
if (empty($error_code)) {
    $group_id   = Wo_Secure($_POST['group_id']);
    $group_data = Wo_PageData($group_id);
    if (empty($group_data)) {
        $error_code    = 6;
        $error_message = 'Group not found';
    } else {
    	$join_message = 'invalid';
        if (Wo_IsGroupJoined($group_id) === true || Wo_IsJoinRequested($group_id, $wo['user']['user_id']) === true) {
            if (Wo_LeaveGroup($group_id, $wo['user']['user_id'])) {
                $join_message = 'left';
            }
        } else {
            if (Wo_RegisterGroupJoin($group_id, $wo['user']['user_id'])) {
               $join_message = 'joined';
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'join_status' => $join_message
		);
    }
}