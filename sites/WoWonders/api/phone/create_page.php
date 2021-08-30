<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2016 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
$json_error_data   = array();
$json_success_data = array();
if (empty($_GET['type']) || !isset($_GET['type'])) {
    $json_error_data = array(
        'api_status' => '400',
        'api_text' => 'failed',
        'api_version' => $api_version,
        'errors' => array(
            'error_id' => '1',
            'error_text' => 'Bad request, no type specified.'
        )
    );
    header("Content-type: application/json");
    echo json_encode($json_error_data, JSON_PRETTY_PRINT);
    exit();
}
$type = Wo_Secure($_GET['type'], 0);
if ($type == 'create_page') {
    if (empty($_POST['user_id'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '3',
                'error_text' => 'No user id sent.'
            )
        );
    } else if (empty($_POST['s'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '5',
                'error_text' => 'No session sent.'
            )
        );
    }
    if (empty($json_error_data)) {
        $user_id         = $_POST['user_id'];
        $s               = Wo_Secure($_POST['s']);
        $user_login_data = Wo_UserData($user_id);
        $wo['lang']      = Wo_LangsFromDB($user_login_data['language']);
        if (empty($user_login_data)) {
            $json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => array(
                    'error_id' => '6',
                    'error_text' => 'Username is not exists.'
                )
            );
            header("Content-type: application/json");
            echo json_encode($json_error_data, JSON_PRETTY_PRINT);
            exit();
        } else if ($wo['loggedin'] == false) {
            $json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => array(
                    'error_id' => '6',
                    'error_text' => 'Session id is wrong.'
                )
            );
            header("Content-type: application/json");
            echo json_encode($json_error_data, JSON_PRETTY_PRINT);
            exit();
        } else {
            if (empty($_POST['page_name']) || empty($_POST['page_title'])) {
                $errors[] = $wo['lang']['please_check_details'];
            } else {
                $is_exist = Wo_IsNameExist($_POST['page_name'], 0);
                if (in_array(true, $is_exist)) {
                    $errors[] = $wo['lang']['page_name_exists'];
                }
                if (in_array($_POST['page_name'], $wo['site_pages'])) {
                    $errors[] = $wo['lang']['page_name_invalid_characters'];
                }
                if (strlen($_POST['page_name']) < 5 OR strlen($_POST['page_name']) > 32) {
                    $errors[] = $wo['lang']['page_name_characters_length'];
                }
                if (!preg_match('/^[\w]+$/', $_POST['page_name'])) {
                    $errors[] = $wo['lang']['page_name_invalid_characters'];
                }
                if (empty($_POST['page_category'])) {
                    $_POST['page_category'] = 1;
                }
            }
            if (empty($errors)) {
                $re_page_data  = array(
                    'page_name' => Wo_Secure($_POST['page_name']),
                    'user_id' => Wo_Secure($wo['user']['user_id']),
                    'page_title' => Wo_Secure($_POST['page_title']),
                    'page_description' => Wo_Secure($_POST['page_description']),
                    'page_category' => Wo_Secure($_POST['page_category']),
                    'active' => '1'
                );
                $register_page = Wo_RegisterPage($re_page_data);
                if ($register_page) {
                    $json_success_data = array(
                        'api_status' => 200,
                        'api_text'  => 'success',
                        'api_version'  => $api_version,
                        'page_name' => Wo_Secure($_POST['page_name']),
                        'page_id' => Wo_PageIdFromPagename($_POST['page_name'])
                    );
                }
            } else {
                $json_success_data = array('api_status' => 400, 'errors' => $errors);
            }
            header("Content-type: application/json");
            echo json_encode($json_success_data, JSON_PRETTY_PRINT);
            exit();
        }
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data);
        exit();
    }
}
header("Content-type: application/json");
echo json_encode($json_success_data);
exit();
?>