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
if ($type == 'create_story') {
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
            $data  = array(
                'message' => $error_icon . $wo['lang']['please_check_details'],
                'status' => 500
            );
            $error = false;
            if (!isset($_FILES["image"]["tmp_name"])) {
                $error = $wo['lang']['please_check_details'];
            } else {
                if (isset($_POST['title']) && strlen($_POST['title']) > 100) {
                    $error = 'Title is so long';
                }
                if (isset($_POST['description']) && strlen($_POST['description']) > 300) {
                    $error = 'Description is so long';
                }
                if (empty($_POST['file_type'])) {
                    $error = 'file_type is required (video|image)';
                }
            }
            if (!$error) {
                $registration_data            = array();
                $registration_data['user_id'] = $wo['user']['id'];
                $registration_data['posted']  = time();
                $registration_data['expire']  = date('Y-m-d');
                if (isset($_POST['title']) && strlen($_POST['title']) >= 2) {
                    $registration_data['title'] = Wo_Secure($_POST['title']);
                }
                if (isset($_POST['description']) && strlen($_POST['description']) >= 10) {
                    $registration_data['description'] = Wo_Secure($_POST['description']);
                }
                if (count($registration_data) > 0) {
                    $last_id = Wo_InsertUserStory($registration_data);
                    if ($last_id && is_numeric($last_id) && !empty($_FILES["image"]["tmp_name"])) {
                        $true     = false;
                        $sources  = array();
                        $fileInfo = array(
                            'file' => $_FILES["image"]["tmp_name"],
                            'name' => $_FILES['image']['name'],
                            'size' => $_FILES["image"]["size"],
                            'type' => $_FILES["image"]["type"],
                            'types' => 'jpg,png,mp4,gif,jpeg,mov,webm'
                        );
                        $media    = Wo_ShareFile($fileInfo);
                        if (!empty($media)) {
                            $filename = $media['filename'];
                        }
                        if ($filename) {
                            $sources[] = array(
                                'story_id' => $last_id,
                                'type' => Wo_Secure($_POST['file_type']),
                                'filename' => $filename,
                                'expire' => date('Y-m-d')
                            );
                            $thumb     = '';
                            if (empty($thumb)) {
                                if (in_array(strtolower(pathinfo($filename, PATHINFO_EXTENSION)), array(
                                    "gif",
                                    "jpg",
                                    "png"
                                ))) {
                                    $thumb             = $filename;
                                    $explode2          = @end(explode('.', $thumb));
                                    $explode3          = @explode('.', $thumb);
                                    $last_file         = $explode3[0] . '_small.' . $explode2;
                                    $arrContextOptions = array(
                                        "ssl" => array(
                                            "verify_peer" => false,
                                            "verify_peer_name" => false
                                        )
                                    );
                                    $fileget           = file_get_contents(Wo_GetMedia($thumb), false, stream_context_create($arrContextOptions));
                                    if (!empty($fileget)) {
                                        $importImage = @file_put_contents($thumb, $fileget);
                                    }
                                    $crop_image = Wo_Resize_Crop_Image(100, 100, $thumb, $last_file, 60);
                                    $upload_s3  = Wo_UploadToS3($last_file);
                                    $thumb      = $last_file;
                                }
                            }
                        }
                        if (count($sources) > 0) {
                            foreach ($sources as $registration_data) {
                                Wo_InsertUserStoryMedia($registration_data);
                            }
                            if (!empty($thumb)) {
                                $thumb        = Wo_Secure($thumb);
                                $mysqli_query = mysqli_query($sqlConnect, "UPDATE " . T_USER_STORY . " SET thumbnail = '$thumb' WHERE id = $last_id");
                            }
                            $json_success_data = array(
                                'message' => $wo['lang']['status_added'],
                                'api_status' => 200,
                                'api_text' => 'success',
                                'api_version' => $api_version
                            );
                        }
                    }
                }
            } else {
                $json_success_data = array(
                    'errors' => array(
                        $error
                    ),
                    'api_status' => 400,
                    'api_version' => $api_version
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