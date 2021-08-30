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
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
$json_error_data     = array();
$json_success_data   = array();
$type                = Wo_Secure($_GET['type'], 0);
if ($type == 'create_video_call') {
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
        $s               = Wo_Secure(md5($_POST['s']));
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
            //
            $user_1       = $user_login_data;
		    $user_2       = $user_login_data2;
		    $room_script  = sha1(rand(1111111, 9999999999));
		    $accountSid   = $wo['config']['video_accountSid'];
		    $apiKeySid    = $wo['config']['video_apiKeySid'];
		    $apiKeySecret = $wo['config']['video_apiKeySecret'];
		    $call_id      = substr(md5(microtime()), 0, 15);
		    $call_id_2    = substr(md5(time()), 0, 15);
		    $token        = new AccessToken($accountSid, $apiKeySid, $apiKeySecret, 3600, $call_id);
		    $grant        = new VideoGrant();
		    $grant->setRoom($room_script);
		    $token->addGrant($grant);
		    $token_ = $token->toJWT();
		    $token2 = new AccessToken($accountSid, $apiKeySid, $apiKeySecret, 3600, $call_id_2);
		    $grant2 = new VideoGrant();
		    $grant2->setRoom($room_script);
		    $token2->addGrant($grant2);
		    $token_2    = $token2->toJWT();
		    $insertData = Wo_CreateNewVideoCall(array(
		        'access_token' => Wo_Secure($token_),
		        'from_id' => Wo_Secure($user_id),
		        'to_id' => Wo_Secure($recipient_id),
		        'access_token_2' => Wo_Secure($token_2),
                'room_name' => $room_script
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
                                'access_token_2' => Wo_Secure($token_2),
                                'room_name' => $room_script,
                                'call_id' => $insertData
                            )
                        )
                    );
                    Wo_SendPushNotification($send_array);
                }
		        $data               = array(
		            'status' => 200,
		            'access_token' => $token_,
		            'id' => $insertData,
		            'url' => $wo['config']['site_url'] . '/video-call-api/' . $insertData . '?c_id=' . $_POST['s'] . '&user_id=' . $user_id,
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