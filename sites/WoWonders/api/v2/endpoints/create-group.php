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

$required_fields = array(
    'group_name',
    'group_title',
    'category',
    'about',
);

foreach ($required_fields as $key => $value) {
    if (empty($_POST[$value]) && empty($error_code)) {
        $error_code    = 3;
        $error_message = $value . ' (POST) is missing';
    }
}

if (empty($error_code)) {
    $group_name     = Wo_Secure($_POST['group_name']);
    $group_title    = Wo_Secure($_POST['group_title']);
    $category       = Wo_Secure($_POST['category']);
    $about          = Wo_Secure($_POST['about']);

    $is_exist = Wo_IsNameExist($_POST['group_name'], 0);
    
    if (in_array(true, $is_exist) || in_array($_POST['group_name'], $wo['site_pages'])) {
        $error_code    = 4;
        $error_message = 'Group name is already exists.';
    } else if (strlen($_POST['group_name']) < 5 OR strlen($_POST['group_name']) > 32) {
        $error_code    = 5;
        $error_message = 'Group name must be between 5 / 32';
    } else if (!preg_match('/^[\w]+$/', $_POST['group_name'])) {
        $error_code    = 6;
        $error_message = 'Invalid group name characters';
    }
    
    if (empty($error_code)) {
    	$group_data  = array(
            'group_name' => $group_name,
            'user_id' => $wo['user']['user_id'],
            'group_title' => $group_title,
            'about' => $about,
            'category' => $category,
            'active' => 1
        );
        $register_group    = Wo_RegisterGroup($group_data);
        if ($register_group) {
            $response_data = array(
                'api_status' => 200,
                'group_data' => Wo_GroupData(Wo_GroupIdFromGroupname($_POST['group_name']))
            );
        }
    }
}