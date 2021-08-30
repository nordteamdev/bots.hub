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
    'page_name',
    'page_title',
    'page_category',
    'page_description',
);

foreach ($required_fields as $key => $value) {
    if (empty($_POST[$value]) && empty($error_code)) {
        $error_code    = 3;
        $error_message = $value . ' (POST) is missing';
    }
}

if (empty($error_code)) {
    $page_name     = Wo_Secure($_POST['page_name']);
    $page_title    = Wo_Secure($_POST['page_title']);
    $page_category   = Wo_Secure($_POST['page_category']);
    $page_description  = Wo_Secure($_POST['page_description']);

    $is_exist = Wo_IsNameExist($_POST['page_name'], 0);
    
    if (in_array(true, $is_exist) || in_array($_POST['page_name'], $wo['site_pages'])) {
        $error_code    = 4;
        $error_message = 'Page name is already exists.';
    } else if (strlen($_POST['page_name']) < 5 OR strlen($_POST['page_name']) > 32) {
        $error_code    = 5;
        $error_message = 'Page name must be between 5 / 32';
    } else if (!preg_match('/^[\w]+$/', $_POST['page_name'])) {
        $error_code    = 6;
        $error_message = 'Invalid Page name characters';
    }
    
    if (empty($error_code)) {
    	$group_data  = array(
            'page_name' => $page_name,
            'user_id' => $wo['user']['user_id'],
            'page_title' => $page_title,
            'page_description' => $page_description,
            'page_category' => $page_category,
            'active' => 1
        );
        $register_group    = Wo_RegisterPage($group_data);
        if ($register_group) {
            $response_data = array(
                'api_status' => 200,
                'page_data' => Wo_PageData(Wo_PageIdFromPagename($_POST['page_name']))
            );
        }
    }
}