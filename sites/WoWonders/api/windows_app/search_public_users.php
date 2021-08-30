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
$search_users = array();
$pages = array();
$groups = array();
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
if ($type == 'search_public_users') {
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
            $gender = 'all';
            $status = '';
            $image = '';
            $array_list_type = array('all', 'male', 'female');
            $search_key = '';
            if (!empty($_POST['search_key'])) {
                $search_key = $_POST['search_key'];
            }
            if (!empty($_POST['gender'])) {
                $gender = $_POST['gender'];
            }
            if (!empty($_POST['status'])) {
                $status = $_POST['status'];
            }
            if (!empty($_POST['image'])) {
                $image = $_POST['image'];
            }
            $fetch_array = array(
                'query' => $search_key, 
                'gender' => $gender,
                'image' => $image,
                'status' => $status,
                'user_id' => $user_id
            );
            $get = Wo_GetSearchFilter($fetch_array, 20);
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
                    'gender' => $user_list['gender'],
                    'lastseen_unix_time' => $user_list['lastseen'],
                    'lastseen_time_text' => Wo_Time_Elapsed_String($user_list['lastseen']),
                    'url' => $user_list['url'],
                    'is_following' => (Wo_IsFollowing($user_list['user_id'])) ? 'yes' : 'no'
                );
                array_push($search_users, $json_data);
            }
            $search_query = Wo_GetSearchAdv($_POST['search_key'], 'pages');
            if (count($search_query) > 0) {
                foreach ($search_query as $wo['result']) {
                    $wo['result']['is_liked'] = (Wo_IsPageLiked($wo['result']['id'], $user_list['user_id'])) ? 'yes' : 'no';
                    $pages[] = $wo['result'];
                }
            }
            $search_query2 = Wo_GetSearchAdv($_POST['search_key'], 'groups');
            if (count($search_query2) > 0) {
                foreach ($search_query2 as $wo['result']) {
                    $wo['result']['is_joined'] = (Wo_IsGroupJoined($wo['result']['id'], $user_list['user_id'])) ? 'yes' : 'no';
                    $groups[] = $wo['result'];
                }
            }
            header("Content-type: application/json");
            echo json_encode(array(
                'api_status' => 200,
                'api_text' => 'success',
                'api_version' => $api_version,
                'theme_url' => $config['theme_url'],
                'users' => (!empty($search_users)) ? $search_users : array(),
                'pages' => (!empty($pages)) ? $pages : array(),
                'groups' => (!empty($groups)) ? $groups : array()
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