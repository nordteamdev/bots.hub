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
if ($type == 'create_event') {
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
            if (empty($_POST['event-name']) || empty($_POST['event-locat']) || empty($_POST['event-description'])) {
                $error = $wo['lang']['please_check_details'];
            } else {
                if (strlen($_POST['event-name']) < 5) {
                    $error = $wo['lang']['title_more_than10'];
                }
                if (strlen($_POST['event-description']) < 10) {
                    $error = $wo['lang']['desc_more_than32'];
                }
                if (empty($_POST['event-start-date'])) {
                    $error = $wo['lang']['please_check_details'];
                }
                if (empty($_POST['event-end-date'])) {
                    $error = $wo['lang']['please_check_details'];
                }
                if (empty($_POST['event-start-time'])) {
                    $error = $wo['lang']['please_check_details'];
                }
                if (empty($_POST['event-end-time'])) {
                    $error = $wo['lang']['please_check_details'];
                }
            }
            if (empty($error)) {
                $registration_data = array(
                    'name' => Wo_Secure($_POST['event-name']),
                    'location' => Wo_Secure($_POST['event-locat']),
                    'description' => Wo_Secure($_POST['event-description']),
                    'start_date' => Wo_Secure($_POST['event-start-date']),
                    'start_time' => Wo_Secure($_POST['event-start-time']),
                    'end_date' => Wo_Secure($_POST['event-end-date']),
                    'end_time' => Wo_Secure($_POST['event-end-time']),
                    'poster_id' => $wo['user']['id']
                );
                $last_id           = Wo_InsertEvent($registration_data);
                if ($last_id && is_numeric($last_id)) {
                    if (!empty($_FILES["event-cover"]["tmp_name"])) {
                        $temp_name = $_FILES["event-cover"]["tmp_name"];
                        $file_name = $_FILES["event-cover"]["name"];
                        $file_type = $_FILES['event-cover']['type'];
                        $file_size = $_FILES["event-cover"]["size"];
                        Wo_UploadImage($temp_name, $file_name, 'cover', $file_type, $last_id, 'event');
                    }
                    $json_success_data = array(
                        'api_status' => 200,
                        'api_text'  => 'success',
                        'api_version'  => $api_version,
                    );
                }
            } else {
                $json_success_data = array(
                    'api_status' => 400,
                    'errors' => array($error)
                );
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