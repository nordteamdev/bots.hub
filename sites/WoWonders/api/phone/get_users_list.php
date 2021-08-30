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
$video_call = false;
$video_call_user = array();

$audio_call = false;
$audio_call_user = array();

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
if ($type == 'get_users_list') {
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
        $s      = Wo_Secure($_POST['s']);
        $user_login_data = Wo_UserData($user_id);
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
            $wo['lang'] = Wo_LangsFromDB($user_login_data['language']);
            $timezone = new DateTimeZone($user_login_data['timezone']);
            $list_type = 'all';
            $array_list_type = array('all', 'online', 'offline');
            $search_key = '';
            if (!empty($_POST['search_key'])) {
                $search_key = $_POST['search_key'];
            }
            if (!empty($_POST['list_type'])) {
                $list_type = $_POST['list_type'];
            }
            if ($list_type == 'online' || $list_type == 'offline') {
                $get = Wo_GetChatUsersAPP($user_id, $list_type, $search_key);
            } else {
                $fetch_array = array(
                    'user_id' => $user_id, 
                    'searchQuery' => $search_key, 
                    'limit' => 15, 
                    'new' => false, 
                    'after_user_id' => 0,
                    'update' => 0, 
                    'session_id' => $s
                );
                $get = Wo_GetMessagesUsersAPP($fetch_array);
            }
            foreach ($get as $user_list) {
                $lastseen = ($user_list['lastseen'] > (time() - 60)) ? 'on' : 'off';
                if (mb_strlen($user_list['name']) > 18) {
                    $user_list['name'] = mb_substr($user_list['name'], 0, 18, "UTF-8") . '..';
                }
                $json_data                 = array(
                    'user_id' => $user_list['user_id'],
                    'username' => $user_list['username'],
                    'name' => $user_list['name'],
                    'profile_picture' => $user_list['avatar'],
                    'cover_picture' => $user_list['cover'],
                    'verified' => $user_list['verified'],
                    'lastseen' => $lastseen,
                    'lastseen_unix_time' => $user_list['lastseen'],
                    'lastseen_time_text' => Wo_Time_Elapsed_String($user_list['lastseen']),
                    'url' => $user_list['url'],
                    'chat_color' => Wo_GetChatColor($wo['user']['user_id'], $user_list['user_id'])
                );
                $json_data['last_message'] = Wo_GetMessagesHeader(array(
                    'user_id' => $user_list['user_id'],
                    'limit' => 1,
                    'user_data' => 1,
                    'session_id' => $s,
                    'platform' => 'phone'
                ));

                if (!empty($json_data['last_message']['time'])) {
                    $time_today  = time() - 86400;
                    if (mb_strlen($json_data['last_message']['text']) > 20) {
                        $json_data['last_message']['text'] = mb_substr($json_data['last_message']['text'], 0, 20, "UTF-8") . '..';
                    }
                    if ($json_data['last_message']['time'] < $time_today) {
                        $json_data['last_message']['date_time'] = date('m.d', $json_data['last_message']['time']);
                    } else {
                        $time = new DateTime('now', $timezone);
                        $time->setTimestamp($json_data['last_message']['time']);
                        $json_data['last_message']['date_time'] = $time->format('H:i');
                    }
                } else {
                    $json_data['last_message'] = array(
                        'id'  => '',
                        "from_id" => '',
                        "to_id" => '',
                        "text" => '',
                        "media" => '',
                        "mediaFileName" => '',
                        "mediaFileNames" => '',
                        "time" => '',
                        "seen" => '',
                        "date_time" => ''
                    );
                }
                array_push($json_success_data, $json_data);
            }
            $check_calles     = Wo_CheckFroInCalls();
            if ($check_calles !== false && is_array($check_calles)) {
                $video_call = true;
                $wo['video_call_user'] = Wo_UserData($check_calles['from_id']);
                $video_call_user['data'] = $check_calles;
                $video_call_user['user_id'] = $wo['video_call_user']['user_id'];
                $video_call_user['avatar'] = $wo['video_call_user']['avatar'];
                $video_call_user['name'] = $wo['video_call_user']['name'];
            }

            $check_audio_calles     = Wo_CheckFroInCalls('audio');
            if ($check_audio_calles !== false && is_array($check_audio_calles)) {
                $audio_call = true;
                $wo['audio_call_user'] = Wo_UserData($check_audio_calles['from_id']);
                $audio_call_user['data'] = $check_audio_calles;
                $audio_call_user['user_id'] = $wo['audio_call_user']['user_id'];
                $audio_call_user['avatar'] = $wo['audio_call_user']['avatar'];
                $audio_call_user['name'] = $wo['audio_call_user']['name'];
            }
            $agora_call = false;
            $agora_call_data = array();
            $check_agora_calls     = Wo_CheckFroInCallsAgora();
            if ($check_agora_calls !== false && is_array($check_agora_calls)) {
                $agora_call = true;
                $wo['agora_call_data'] = Wo_UserData($check_agora_calls['from_id']);
                $agora_call_data['data'] = $check_agora_calls;
                $agora_call_data['user_id'] = $wo['agora_call_data']['user_id'];
                $agora_call_data['avatar'] = $wo['agora_call_data']['avatar'];
                $agora_call_data['name'] = $wo['agora_call_data']['name'];
            }

            header("Content-type: application/json");
            echo json_encode(array(
                'api_status' => 200,
                'api_text' => 'success',
                'api_version' => $api_version,
                'theme_url' => $config['theme_url'],
                'users' => $json_success_data,
                'video_call' => $video_call,
                'video_call_user' => $video_call_user,
                'audio_call' => $audio_call,
                'audio_call_user' => $audio_call_user,
                'agora_call' => $agora_call,
                'agora_call_data' => $agora_call_data
            ));
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