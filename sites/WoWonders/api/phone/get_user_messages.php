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
$json_success_data_2 = array();
$type                = Wo_Secure($_GET['type'], 0);
if ($type == 'get_user_messages') {
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
            $recipient_id    = $_POST['recipient_id'];
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
            $limit             = 20;
            $after_message_id  = 0;
            $before_message_id = 0;
            $message_id = 0;
            if (!empty($_POST['limit'])) {
                $limit = $_POST['limit'];
            }
            if (!empty($_POST['after_message_id'])) {
                $after_message_id = $_POST['after_message_id'];
            }
            if (!empty($_POST['before_message_id'])) {
                $before_message_id = $_POST['before_message_id'];
            }
            if (!empty($_POST['message_id'])) {
                $message_id = $_POST['message_id'];
            }
            $message_info = array(
                'user_id' => $user_id,
                'recipient_id' => $recipient_id,
                'before_message_id' => $before_message_id,
                'after_message_id' => $after_message_id,
                'message_id' => $message_id
            );
            $message_info = Wo_GetMessagesAPP($message_info);
            $not_include_status = false;
            $not_include_array = array();
            if (!empty($_POST['not_include'])) {
                $not_include_array = @explode(',', $_POST['not_include']);
                $not_include_status = true;
            }
            $timezone = new DateTimeZone($user_login_data['timezone']);
            foreach ($message_info as $message) {
                if ($not_include_status == true) {
                    foreach ($not_include_array as $value) {
                        if (!empty($value)) {
                            $value = Wo_Secure($value);
                            unset($message[$value]);
                        }
                    }
                }
                $message['time_text'] = Wo_Time_Elapsed_String($message['time']);
                $message_po  = 'left';
                if ($message['from_id'] == $user_id) {
                    $message_po  = 'right';
                }
                
                $message['position']  = $message_po;
                $message['type']      = Wo_GetFilePosition($message['media']);
                if ($message['type_two'] == 'contact') {
                    $message['type']   = 'contact';
                }
                $message['type']     = $message_po . '_' . $message['type'];
                $message['file_size'] = 0;
                if (!empty($message['media'])) {
                    $message['file_size'] = '0MB';
                    if (file_exists($message['file_size'])) {
                        $message['file_size'] = Wo_SizeFormat(filesize($message['media']));
                    }
                    $message['media']     = Wo_GetMedia($message['media']);
                }
                if (!empty($message['time'])) {
                    $time_today  = time() - 86400;
                    if ($message['time'] < $time_today) {
                        $message['time_text'] = date('m.d.y', $message['time']);
                    } else {
                        $time = new DateTime('now', $timezone);
                        $time->setTimestamp($message['time']);
                        $message['time_text'] = $time->format('H:i');
                    }
                }
                array_push($json_success_data, $message);
            }
            $send_messages_to_phones = Wo_MessagesPushNotifier();
        }
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
$typing = 0;
$check_typing = Wo_IsTyping($recipient_id);
if ($check_typing) {
    $typing = 1;
} 
$json_success_data22 = array(
    'api_status' => '200',
    'api_text' => 'success',
    'api_version' => $api_version,
    'typing' => $typing,
    'messages' => $json_success_data
);
header("Content-type: application/json");
echo json_encode($json_success_data22);
exit();
?>