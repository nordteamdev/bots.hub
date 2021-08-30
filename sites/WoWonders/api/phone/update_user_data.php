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
if ($type == 'update_user_data' || $type == 'u_user_data') {
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
            $Userdata = Wo_UserData($user_id);
            $updated  = false;
            if (!empty($_POST['user_data'])) {
                $json_decode = json_decode($_POST['user_data'], true);
                if (is_array($json_decode)) {
                    if (!empty($_POST['type'])) {
                        if ($_POST['type'] == 'general_settings') {
                            $user_data = $json_decode;
                            if ($user_data['email'] != $Userdata['email']) {
                                if (Wo_EmailExists($user_data['email'])) {
                                    $errors[] = $wo['lang']['email_exists'];
                                }
                            }
                            if (!empty($user_data['phone_number'])) {
                                if ($user_data['phone_number'] != $Userdata['phone_number']) {
                                    if (Wo_PhoneExists($user_data['phone_number'])) {
                                        $errors[] = $wo['lang']['phone_already_used'];
                                    }
                                }
                            }
                            if ($user_data['username'] != $Userdata['username']) {
                                $is_exist = Wo_IsNameExist($user_data['username'], 0);
                                if (in_array(true, $is_exist)) {
                                    $errors[] = $wo['lang']['username_exists'];
                                }
                                if (in_array($user_data['username'], $wo['site_pages'])) {
                                    $errors[] = $wo['lang']['username_invalid_characters'];
                                }
                            }
                            if (!filter_var($user_data['email'], FILTER_VALIDATE_EMAIL)) {
                                $errors[] = $wo['lang']['email_invalid_characters'];
                            }
                            if (strlen($user_data['username']) < 5 || strlen($user_data['username']) > 32) {
                                $errors[] = $wo['lang']['username_characters_length'];
                            }
                            if (!preg_match('/^[\w]+$/', $user_data['username'])) {
                                $errors[] = $wo['lang']['username_invalid_characters'];
                            }
                            $gender = 'male';
                            if (!empty($user_data['gender'])) {
                                if ($user_data['gender'] == 'female') {
                                    $gender = 'female';
                                }
                            }
                            if (empty($errors)) {
                                $u_user_data = array(
                                    'username' => $user_data['username'],
                                    'email' => $user_data['email'],
                                    'gender' => $gender
                                );
                                if (!empty($user_data['phone_number'])) {
                                    $u_user_data['phone_number'] = $user_data['phone_number'];
                                }
                                $update_user_data = Wo_UpdateUserData($user_id, $u_user_data);
                                if ($update_user_data) {
                                    $updated = true;
                                }
                            }
                        } else if ($_POST['type'] == 'password_settings') {
                            $user_data = $json_decode;
                            if (Wo_HashPassword($user_data['current_password'], $Userdata['password']) == false) {
                                $errors[] = $wo['lang']['current_password_mismatch'];
                            }
                            if ($user_data['new_password'] != $user_data['repeat_new_password']) {
                                $errors[] = $wo['lang']['password_mismatch'];
                            }
                            if (strlen($user_data['new_password']) < 6) {
                                $errors[] = $wo['lang']['password_short'];
                            }
                            if (empty($errors)) {
                                $password_data    = array(
                                    'password' => sha1($user_data['new_password'])
                                );
                                $update_user_data = Wo_UpdateUserData($user_id, $password_data);
                                if ($update_user_data) {
                                    $updated = true;
                                    $mysqli  = mysqli_query($sqlConnect, "DELETE FROM " . T_APP_SESSIONS . " WHERE `user_id` = '{$user_id}' AND `session_id` <> '{$s}'");
                                }
                            }
                        } else if ($_POST['type'] == 'privacy_settings') {
                            $message_privacy = 0;
                            $follow_privacy  = 0;
                            $birth_privacy   = 0;
                            $status          = 0;
                            $array           = array(
                                '0',
                                '1'
                            );
                            $array_2         = array(
                                '0',
                                '1',
                                '2'
                            );
                            $user_data       = $json_decode;
                            if (!empty($user_data['follow_privacy'])) {
                                if (in_array($user_data['follow_privacy'], $array)) {
                                    $follow_privacy = $user_data['follow_privacy'];
                                }
                            }
                            if (!empty($user_data['message_privacy'])) {
                                if (in_array($user_data['message_privacy'], $array)) {
                                    $message_privacy = $user_data['message_privacy'];
                                }
                            }
                            if (!empty($user_data['birth_privacy'])) {
                                if (in_array($user_data['birth_privacy'], $array_2)) {
                                    $birth_privacy = $user_data['birth_privacy'];
                                }
                            }
                            if (!empty($user_data['status'])) {
                                if (in_array($user_data['status'], $array)) {
                                    $status = $user_data['status'];
                                }
                            }
                            if (empty($errors)) {
                                $Update_data      = array(
                                    'message_privacy' => $message_privacy,
                                    'follow_privacy' => $follow_privacy,
                                    'birth_privacy' => $birth_privacy,
                                    'status' => $status
                                );
                                $update_user_data = Wo_UpdateUserData($user_id, $Update_data);
                                if ($update_user_data) {
                                    $updated = true;
                                }
                            }
                        } else if ($_POST['type'] == 'online_status') {
                            $status    = 0;
                            $array     = array(
                                '0',
                                '1'
                            );
                            $user_data = $json_decode;
                            if (!empty($user_data['status'])) {
                                if (in_array($user_data['status'], $array)) {
                                    $status = $user_data['status'];
                                }
                            }
                            if (empty($errors)) {
                                $Update_data      = array(
                                    'status' => $status
                                );
                                $update_user_data = Wo_UpdateUserData($user_id, $Update_data);
                                if ($update_user_data) {
                                    $updated = true;
                                }
                            }
                        } else if ($_POST['type'] == 'profile_settings') {
                            $user_data = $json_decode;
                            if (empty($errors)) {
                                $u_user_data = array(
                                    'first_name' => $user_data['first_name'],
                                    'last_name' => $user_data['last_name'],
                                    'about' => $user_data['about'],
                                    'facebook' => (empty($user_data['facebook'])) ? $Userdata['facebook'] : $user_data['facebook'],
                                    'google' => (empty($user_data['google'])) ? $Userdata['google'] : $user_data['google'],
                                    'linkedin' => (empty($user_data['linkedin'])) ? $Userdata['linkedin'] : $user_data['linkedin'],
                                    'vk' => (empty($user_data['vk'])) ? $Userdata['vk'] : $user_data['vk'],
                                    'instagram' => (empty($user_data['instagram'])) ? $Userdata['instagram'] : $user_data['instagram'],
                                    'twitter' => (empty($user_data['twitter'])) ? $Userdata['twitter'] : $user_data['twitter'],
                                    'youtube' => (empty($user_data['youtube'])) ? $Userdata['youtube'] : $user_data['youtube']
                                );
                                $update_user_data = Wo_UpdateUserData($user_id, $u_user_data);
                                if ($update_user_data) {
                                    $updated = true;
                                }
                            }
                        } else if ($_POST['type'] == 'custom_settings') {
                            $user_data = $json_decode;
                            if (empty($errors)) {
                                $update_user_data = Wo_UpdateUserData($user_id, $user_data);
                                if ($update_user_data) {
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