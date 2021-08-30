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
$json_error_data     = array();
$json_success_data   = array();
$type                = Wo_Secure($_GET['type'], 0);
if ($type == 'create_agora_call') {
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
    } else if (empty($_POST['recipient_id'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '5',
                'error_text' => 'No recipient id sent.'
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
        } else if (empty($_POST['call_type'])) {
            $json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => array(
                    'error_id' => '6',
                    'error_text' => 'call_type is empty'
                )
            );
            header("Content-type: application/json");
            echo json_encode($json_error_data, JSON_PRETTY_PRINT);
            exit();
        }  else {
            $recipient_id     = $_POST['recipient_id'];
            $user_login_data2 = Wo_UserData($recipient_id);
            if (empty($user_login_data2)) {
                $json_error_data = array(
                    'api_status' => '400',
                    'api_text' => 'failed',
                    'api_version' => $api_version,
                    'errors' => array(
                        'error_id' => '6',
                        'error_text' => 'User Profile is not exists.'
                    )
                );
                header("Content-type: application/json");
                echo json_encode($json_error_data, JSON_PRETTY_PRINT);
                exit();
            }
            $call_type = ($_POST['call_type'] == 'video') ? 'video' : 'audio';
		    $room_script  = sha1(rand(1111111, 9999999999));
		    $insertData = Wo_CreateNewAgoraCall(array(
		        'from_id' => Wo_Secure($user_id),
		        'to_id' => Wo_Secure($recipient_id),
                'room_name' => $room_script,
                'type' => $call_type,
                'status' => 'calling'
		    ));
		    if ($insertData > 0) {
		        $wo['calling_user'] = Wo_UserData($recipient_id);
                if (!empty($wo['calling_user']['device_id']) && $wo['config']['push_messages'] == 1) {
                     $send_array = array(
                        'send_to' => array(
                            $wo['calling_user']['device_id']
                        ),
                        'notification' => array(
                            'notification_content' => 'is calling you',
                            'notification_title' => $wo['calling_user']['name'],
                            'notification_image' => $wo['calling_user']['avatar'],
                            'notification_data' => array(
                                'call_type' => 'video',
                                'from_id' => Wo_Secure($user_id),
                                'to_id' => Wo_Secure($recipient_id),
                                'room_name' => $room_script,
                                'call_id' => $insertData
                            )
                        )
                    );
                    Wo_SendPushNotification($send_array);
                }
		        $data               = array(
		            'status' => 200,
                    'room_name' => $room_script,
                    'id' => $insertData
		        );
		        header("Content-type: application/json");
		        echo json_encode($data, JSON_PRETTY_PRINT);
		        exit();
		    } else {
		    	header("Content-type: application/json");
		        echo json_encode(array('error' => 'Can\'t create a video call'), JSON_PRETTY_PRINT);
		        exit();
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