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
$type              = Wo_Secure($_GET['type'], 0);
if ($type == 'update_group' || $type == 'u_group') {
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
    } else if (empty($_POST['group_id'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '5',
                'error_text' => 'No page_id sent.'
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
        $wo['lang'] = Wo_LangsFromDB($user_login_data['language']);
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
        	$group_id = Wo_Secure($_POST['group_id']);
            $Userdata = Wo_UserData($user_id);
            $groupdata = Wo_GroupData($_POST['group_id']);
            $updated  = false;
            if (!empty($_POST['data'])) {
                $json_decode = json_decode($_POST['data'], true);
                if (is_array($json_decode)) {
                    if (!empty($_POST['type'])) {
                        if ($_POST['type'] == 'general_settings') {
                            $user_data = $json_decode;
                            if ($user_data['group_name'] != $groupdata['group_name']) {
                                $is_exist = Wo_IsNameExist($user_data['group_name'], 0);
                                if (in_array(true, $is_exist)) {
                                    $errors[] = $wo['lang']['group_name_exists'];
                                }
                                if (in_array($user_data['group_name'], $wo['site_pages'])) {
                                    $errors[] = $wo['lang']['group_name_invalid_characters'];
                                }
                            }
                            if (strlen($user_data['group_name']) < 5 || strlen($user_data['group_name']) > 32) {
                                $errors[] = $wo['lang']['page_name_characters_length'];
                            }
                            if (!preg_match('/^[\w]+$/', $user_data['group_name'])) {
                                $errors[] = $wo['lang']['group_name_invalid_characters'];
                            }
                            if (empty($errors)) {
                                $u_user_data = array(
                                    'group_name' => $user_data['group_name'],
                                    'group_title' => $user_data['group_title'],
                                    'category' => $user_data['group_category'],
                                    'about' => $user_data['about']
                                );
                                $update_user_data = Wo_UpdateGroupData($group_id, $u_user_data);
                                if ($update_user_data) {
                                    $updated = true;
                                }
                            }
                        } else if ($_POST['type'] == 'avatar_cover') {
                        	$image_type = 'avater';
				            if (!empty($_POST['image_type'])) {
				                $image_type = $_POST['image_type'];
				            }
				            $upload_image = Wo_UploadImage($_FILES["image"]["tmp_name"], $_FILES['image']['name'], $image_type, $_FILES['image']['type'], $group_id, 'group');
				            if ($upload_image === true) {
				                $pageData = Wo_GroupData($group_id);
				                $json_success_data22 = array(
				                    'api_status' => '200',
				                    'api_text' => 'success',
				                    'api_version' => $api_version,
				                    'avatar' => ($image_type == 'avatar') ? $pageData['avatar'] : $pageData['cover']
				                );
				                header("Content-type: application/json");
				                echo json_encode($json_success_data22);
				                exit();
				            }
                        } else if ($_POST['type'] == 'custom_settings') {
                            $user_data = $json_decode;
                            if (empty($errors)) {
                                $update_page_data = Wo_UpdateGroupData($group_id, $user_data);
                                if ($update_page_data) {
                                    $updated = true;
                                }
                            }
                        }
                    }
                    if (!empty($errors)) {
                        $json_errors = array(
                            'api_status' => '500',
                            'api_text' => 'failed',
                            'api_version' => $api_version,
                            'errors' => $errors
                        );
                        header("Content-type: application/json");
                        echo json_encode($json_errors, JSON_PRETTY_PRINT);
                        exit();
                    } else if ($updated == true) {
                        $json_success_data = array(
                            'api_status' => '200',
                            'api_text' => 'success',
                            'api_version' => $api_version
                        );
                    }
                }
            }
        }
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
header("Content-type: application/json");
echo json_encode($json_success_data);
exit();
?>