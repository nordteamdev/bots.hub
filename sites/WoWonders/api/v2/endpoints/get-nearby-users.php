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
$options['limit'] = (!empty($_POST['limit'])) ? (int) $_POST['limit'] : 35;
$options['offset'] = (!empty($_POST['offset'])) ? (int) $_POST['offset'] : false;
$options['gender'] = (!empty($_POST['gender'])) ? $_POST['gender'] : false;
$options['name'] = (!empty($_POST['keyword'])) ? $_POST['keyword'] : false;
$options['status'] = (!empty($_POST['status'])) ? $_POST['status'] : false;
$options['distance'] = (!empty($_POST['distance'])) ? $_POST['distance'] : false;

$update_lat = (!empty($_POST['lat'])) ? $_POST['lat'] : false;
$update_lng = (!empty($_POST['lng'])) ? $_POST['lng'] : false;

if (!empty($update_lat) && !empty($update_lng)) {
    $array = array('lat' => $update_lat, 'lng' => $update_lng);
    $update = Wo_UpdateUserData($wo['user']['user_id'], $array);
}

$nearby = Wo_GetNearbyUsers($options);
$users = array();

foreach ($nearby as $key => $nearbyuser) {
	foreach ($non_allowed as $key => $value) {
	   unset($nearbyuser['user_data'][$value]);
	   $nearbyuser['user_data']['distance'] = $nearbyuser['distance'];
	   $nearbyuser['user_data']['user_geoinfo'] = $nearbyuser['user_geoinfo'];
	   $nearbyuser['user_data']['is_following'] = (Wo_IsFollowing($nearbyuser['user_id'])) ? 'yes' : 'no';
	}
	$users[] = $nearbyuser['user_data'];
}

$response_data = array(
    'api_status' => 200,
    'nearby_users' => $users
);