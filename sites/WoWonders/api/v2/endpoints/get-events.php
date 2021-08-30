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

if (empty($_POST['fetch'])) {
    $error_code    = 3;
    $error_message = 'fetch (POST) is missing';
}

$options['offset'] = (!empty($_POST['offset'])) ? (int) $_POST['offset'] : 0;
$options['limit'] = (!empty($_POST['limit'])) ? (int) $_POST['limit'] : 20;
$options['my_offset'] = (!empty($_POST['my_offset'])) ? (int) $_POST['my_offset'] : 0;

if (empty($error_code)) {

    $fetch = explode(',', $_POST['fetch']);
    $data  = array();
    foreach ($fetch as $key => $value) {
        $data[$value] = $value;
    }

    if (!empty($data['events'])) {
    	$events = array();
	    $get_events = Wo_GetEvents(array('offset' => $options['offset'], 'limit' => $options['limit']));
	    foreach ($get_events as $key => $event) {
	    	foreach ($non_allowed as $key => $value) {
	           unset($event['user_data'][$value]);
	        }
	    	$event['is_going'] = Wo_EventGoingExists($event['id']);
	    	$event['is_interested'] = Wo_EventInterestedExists($event['id']);
	        $event['going_count'] = Wo_TotalGoingUsers($event['id']);
	        $event['interested_count'] = Wo_TotalInterestedUsers($event['id']);
            $event['start_date'] = date($wo['config']['date_style'], strtotime($event['start_date']));
            $event['end_date'] = date($wo['config']['date_style'], strtotime($event['end_date']));
	    	$events[] = $event;
	    }
        $response_data['events'] = $events;
        $response_data['api_status'] = 200;
    }
    
    if (!empty($data['my_events'])) {
    	$my_events = array();
        $get_my_events = Wo_GetMyEvents($options['my_offset']);
        foreach ($get_my_events as $key => $event) {
        	foreach ($non_allowed as $key => $value) {
               unset($event['user_data'][$value]);
            }
            $event['start_date'] = date($wo['config']['date_style'], strtotime($event['start_date']));
            $event['end_date'] = date($wo['config']['date_style'], strtotime($event['end_date']));
        	$my_events[] = $event;
        }
        $response_data['my_events'] = $my_events;
        $response_data['api_status'] = 200;
    }
}