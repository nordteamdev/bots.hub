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
if ($type == 'insert_new_message' || $type == 'new_message') {
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
    } else if (empty($_POST['send_time'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '5',
                'error_text' => 'No send_time sent.'
            )
        );
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
            if (empty($_POST['text'])) {
                if (empty($_FILES['message_file']['name']) && empty($_POST['image_url'])) {
                    $json_error_data = array(
                    'api_status' => '400',
                    'api_text' => 'failed',
                    'api_version' => $api_version,
                    'errors' => array(
                        'error_id' => '10',
                        'error_text' => 'Empty message text.'
                    )
                   );
                   header("Content-type: application/json");
                   echo json_encode($json_error_data, JSON_PRETTY_PRINT);
                   exit();
                }
            }
            $mediaFilename = '';
            $mediaName     = '';
            if (isset($_FILES['message_file']['name'])) {
                $fileInfo      = array(
                    'file' => $_FILES["message_file"]["tmp_name"],
                    'name' => $_FILES['message_file']['name'],
                    'size' => $_FILES["message_file"]["size"],
                    'type' => $_FILES["message_file"]["type"]
                );
                $media         = Wo_ShareFile($fileInfo);
                $mediaFilename = $media['filename'];
                $mediaName     = $media['name'];
            }
            if (!empty($_POST['image_url'])) {
                $mediaFilename = Wo_ImportImageFromUrl($_POST['image_url'], '_' . $_POST['sticker_id']); //_sticker1
            }
            if (!empty($_POST['contact'])) {
                # code...
            }
            $message_id    = Wo_RegisterMessage(array(
                'from_id' => Wo_Secure($user_id),
                'to_id' => Wo_Secure($recipient_id),
                'text' => Wo_Secure($_POST['text']),
                'media' => Wo_Secure($mediaFilename),
                'mediaFileName' => Wo_Secure($mediaName),
                'time' => time(),
                'type_two' => (!empty($_POST['contact'])) ? 'contact' : ''
            ));
            if (!empty($message_id)) {
                $message_info = array(
                    'user_id' => $user_id,
                    'recipient_id' => $recipient_id,
                    'message_id' => $message_id
                );
                $message_info = Wo_GetMessagesAPP($message_info);
            } else {
                $json_error_data = array(
                    'api_status' => '400',
                    'api_text' => 'failed',
                    'api_version' => $api_version,
                    'errors' => array(
                        'error_id' => '11',
                        'error_text' => 'failed to send message, please try again.'
                    )
                );
                header("Content-type: application/json");
                echo json_encode($json_error_data, JSON_PRETTY_PRINT);
                exit();
            }
            if (empty($user_login_data['timezone'])) {
                $user_login_data['timezone'] = 'UTC';
            }
            $timezone = new DateTimeZone($user_login_data['timezone']);
            foreach ($message_info as $message) {
                $message['time_text'] = Wo_Time_Elapsed_String($message['time']);
                $message_po           = 'left';
                if ($message['from_id'] == $user_id) {
                    $message_po = 'right';
                }
                $message['position'] = $message_po;
                $message['type']     = Wo_GetFilePosition($message['media']);
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
                    $time_today = time() - 86400;
                    if ($message['time'] < $time_today) {
                        $message['time_text'] = date('m.d.y', $message['time']);
                    } else {
                        $time = new DateTime('now', $timezone);
                        $time->setTimestamp($message['time']);
                        $message['time_text'] = $time->format('H:i');
                    }
                    $message['send_time'] = $_POST['send_time'];
                }
                array_push($json_success_data, $message);
            }
        }
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
$json_success_data22 = array(
    'api_status' => '200',
    'api_text' => 'success',
    'api_version' => $api_version,
    'messages' => $json_success_data
);
header("Content-type: application/json");
echo json_encode($json_success_data22);
exit();
?>