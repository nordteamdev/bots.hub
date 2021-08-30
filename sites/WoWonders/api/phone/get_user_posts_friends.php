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
if ($type == 'get_user_posts') {
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
    } else if (empty($_POST['user_profile_id'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '5',
                'error_text' => 'No profile id sent.'
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
            $user_profile_id = $_POST['user_profile_id'];
            $user_login_data = Wo_UserData($user_profile_id);
            if (empty($user_login_data)) {
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
            $limit = 3;
            if (!empty($_POST['limit'])) {
                $limit = $_POST['limit'];
            }
            $post_info = array(
                'filter_by' => 'all',
                'publisher_id' => $user_profile_id,
                'limit' => $limit
            );
            if (!empty($_POST['filter_by'])) {
                $post_info['filter_by'] = $_POST['filter_by'];
            }
            $stories  = Wo_GetPosts($post_info);
            $continue = true;
            if (count($stories) == 0) {
                $continue = false;
            } else {
                $not_include_status = false;
                $not_include_array  = array();
                if (!empty($_POST['not_include'])) {
                    $not_include_array  = @explode(',', $_POST['not_include']);
                    $not_include_status = true;
                }
                foreach ($stories as $story) {
                    if ($not_include_status == true) {
                        foreach ($not_include_array as $value) {
                            if (!empty($value)) {
                                $value = Wo_Secure($value);
                                unset($story[$value]);
                            }
                        }
                    }
                    $story['postFile'] = Wo_GetMedia($story['postFile']);
                    if (!empty($story['Orginaltext'])) {
                        if (!empty($_POST['sub_text_limit'])) {
                            if (is_numeric($_POST['sub_text_limit'])) {
                                $story['Orginaltext'] = mb_substr($story['Orginaltext'], 0, $_POST['sub_text_limit'], "UTF-8");
                            }
                        }
                    }
                    $story['time_text'] = Wo_Time_Elapsed_String($story['time']);
                    array_push($json_success_data, $story);
                }
            }
            if (!empty($_POST['friends'])) {
                $limit_f = 10;
                if (!empty($_POST['limit_friends'])) {
                    $limit_f = Wo_Secure($_POST['limit_friends']);
                }
                $users = Wo_GetFollowing($user_profile_id, 'sidebar', $limit_f);
                foreach ($users as $user) {
                    foreach ($non_allowed as $value) {
                        unset($user[$value]);
                    }
                    array_push($json_success_data_2, $user);
                }
            }
        }
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
$connectivity_system = ($wo['config']['connectivitySystem'] == 0) ? $wo['lang']['following'] : $wo['lang']['friends_btn'];
$json_success_data22 = array(
    'api_status' => '200',
    'api_text' => 'success',
    'api_version' => $api_version,
    'posts' => $json_success_data,
    'friends' => $json_success_data_2,
    'connectivity_system' => $connectivity_system
);
header("Content-type: application/json");
echo json_encode($json_success_data22);
exit();
?>