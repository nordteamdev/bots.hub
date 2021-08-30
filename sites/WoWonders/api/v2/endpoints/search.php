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
$users = array();
$pages = array();
$groups = array();

$options['limit'] = (!empty($_POST['limit'])) ? (int) $_POST['limit'] : 35;
$options['query'] = (!empty($_POST['search_key'])) ? Wo_Secure($_POST['search_key']) : '';
$options['gender'] = (!empty($_POST['gender'])) ? Wo_Secure($_POST['gender']) : '';
$options['status'] = (!empty($_POST['status'])) ?  Wo_Secure($_POST['status']) : '';
$options['image'] = (!empty($_POST['image'])) ?  Wo_Secure($_POST['image']) : '';

$user_offset = (!empty($_POST['user_offset'])) ? (int) $_POST['user_offset'] : 0;
$page_offset = (!empty($_POST['page_offset'])) ? (int) $_POST['page_offset'] : 0;
$group_offset = (!empty($_POST['group_offset'])) ? (int) $_POST['group_offset'] : 0;

$get_users = Wo_GetSearchFilter($options, $options['limit'], $user_offset);

foreach ($get_users as $key => $user) {
    foreach ($non_allowed as $key => $value) {
       unset($user[$value]);
    }
    $user['is_following'] = (Wo_IsFollowing($wo['user']['user_id'], $user['user_id'])) ? 1 : 0;
    $users[] = $user;
}

$search_query = Wo_GetSearchAdv($options['query'], 'pages', $page_offset);
if (count($search_query) > 0) {
    foreach ($search_query as $wo['result']) {
        $wo['result']['is_liked'] = (Wo_IsPageLiked($wo['result']['id'], $wo['user']['user_id'])) ? 'yes' : 'no';
        $pages[] = $wo['result'];
    }
}
$search_query2 = Wo_GetSearchAdv($options['query'], 'groups', $group_offset);
if (count($search_query2) > 0) {
    foreach ($search_query2 as $wo['result']) {
        $wo['result']['is_joined'] = (Wo_IsGroupJoined($wo['result']['id'], $wo['user']['user_id'])) ? 'yes' : 'no';
        $groups[] = $wo['result'];
    }
}

$response_data = array(
    'api_status' => 200,
    'users' => $users,
    'pages' => $pages,
    'groups' => $groups
);