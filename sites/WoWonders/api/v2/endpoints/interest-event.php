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
if (empty($_POST['event_id'])) {
    $error_code    = 3;
    $error_message = 'event_id (POST) is missing';
}
if (empty($error_code)) {
    $event_id   = Wo_Secure($_POST['event_id']);
    $event_data = Wo_EventData($event_id);
    if (empty($event_data)) {
        $error_code    = 6;
        $error_message = 'event not found';
    } else {
    	$intreset_message = 'invalid';
        if (Wo_EventInterestedExists($event_id) === true) {
            if (Wo_UnsetEventInterestedUsers($event_id)) {
                $intreset_message = 'not-interested';
            }
        } else {
            if (Wo_AddEventInterestedUsers($event_id)) {
                $intreset_message = 'interested';
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'interest_status' => $intreset_message
		);
    }
}