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

if (empty($_POST['page_id'])) {
    $error_code    = 1;
    $error_message = 'page_id (POST) is missing';
}

if (empty($error_code)) {
	$page = Wo_PageData($_POST['page_id']);
	if (empty($page)) {
		$error_code    = 2;
    	$error_message = 'Page not found';
	} else {
		$page_data = array();
		if (!empty($_POST)) {
			$page_data = $_POST;
		}
		$escape = array('server_key');
		if (isset($page_data['server_key'])) {
			unset($page_data['server_key']);
		}
		if (!empty($page_data['page_name'])) {
			$is_exist = Wo_IsNameExist($page_data['page_name'], 0);
		    if (in_array(true, $is_exist) && $page_data['page_name'] != $page['page_name']) {
		        $error_code    = 3;
		        $error_message = 'Page name is already exists';
		    }
		    if (in_array($page_data['page_name'], $wo['site_pages']) || !preg_match('/^[\w]+$/', $page_data['page_name'])) {
		        $error_code    = 4;
		        $error_message = 'Invalid Page name characters';
		    }
		    if (strlen($page_data['page_name']) < 5 || strlen($page_data['page_name']) > 32) {
		        $error_code    = 5;
		        $error_message = 'Page name must be between 5/32';
		    }
		}
		if (!empty($_FILES["avatar"]["tmp_name"])) {
			$upload_image = Wo_UploadImage($_FILES["avatar"]["tmp_name"], $_FILES['avatar']['name'], 'avatar', $_FILES['avatar']['type'], $page['page_id'], 'page');
			if ($upload_image) {
		        $response_data['api_status'] = 200;
		    }
		}
		if (!empty($_FILES["cover"]["tmp_name"])) {
			$upload_image = Wo_UploadImage($_FILES["cover"]["tmp_name"], $_FILES['cover']['name'], 'cover', $_FILES['cover']['type'], $page['page_id'], 'page');
			if ($upload_image) {
		        $response_data['api_status'] = 200;
		    }
		}
		if (empty($error_code)) {
			foreach ($page_data as $key => $value) {
				if (!isset($page[$key])) {
					$error_code = 1;
					$error_message = "Key #$key not found, check Wo_Pages table to get the correct information";
					unset($page_data[$key]);
				}
			}
		}
		if (empty($error_code)) {
			if ($page_data['page_id']) {
				unset($page_data['page_id']);
			}
			$update = Wo_UpdatePageData($page['page_id'], $page_data);
			if ($update) {
				$response_data['api_status'] = 200;
				$response_data['message'] = 'Your page was updated';
			}
		}
	}
}