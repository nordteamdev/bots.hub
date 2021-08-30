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
$json_error_data       = array();
$json_success_data     = array();
$json_success_data_n  = array();
$count_notifications   = array();
$friend_requests       = array();
$pro_users             = array();
$trending_hashtag      = array();
$promoted_pages        = array();
$count_messages        = array();
$count_friend_requests = array();
$final_pro_users       = array();
$final_friend_requests = array();
$video_call = false;
$video_call_user = array();
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
        $s               = Wo_Secure($_POST['s']);
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
            $notifications         = Wo_GetNotifications(array(
                'remove_notification' => array(
                    'requested_to_join_group',
                    'interested_event',
                    'going_event',
                    'invited_event',
                    'forum_reply'
                )
            ));
            $count_notifications   = Wo_CountNotifications(array(
                'unread' => true,
                'remove_notification' => array(
                    'requested_to_join_group',
                    'interested_event',
                    'going_event',
                    'invited_event',
                    'forum_reply'
                )
            ));
            $count_friend_requests = Wo_CountFollowRequests();
            $friend_requests       = Wo_GetFollowRequests();
            if ($config['pro'] == 1) {
                $pro_users      = Wo_FeaturedUsers(9);
                $promoted_pages = Wo_GetPromotedPage();
            }
            $trending_hashtag = Wa_GetTrendingHashs('popular');
            $count_messages   = Wo_CountMessages(array(
                'new' => true
            ), 'interval');
            $notification_ids = array();
            $wo['lang']       = Wo_LangsFromDB($user_login_data['language']);
            $timezone         = new DateTimeZone($user_login_data['timezone']);
            foreach ($notifications as $notification) {
                $wo['notification'] = $notification;
                if ($wo['notification']['seen'] == 0 && !empty($_GET['seen'])) {
                    $notification_ids[] = $wo['notification']['id'];
                }
                $unread_class = '';
                if ($wo['notification']['seen'] == 0) {
                    $unread_class = ' unread';
                }
                $wo['notification']['type_text'] = '';
                $wo['notification']['icon']      = '';
                $notificationText                = $wo['notification']['text'];
                if (isset($notificationText) && !empty($notificationText)) {
                    $notificationText = '"' . $wo['notification']['text'] . '"';
                }
                $notificationType2 = $wo['notification']['type2'];
                if (isset($notificationType2) && !empty($notificationType2)) {
                    if ($notificationType2 == 'post_image') {
                        $type2 = $wo['lang']['photo_n_label'];
                    } elseif ($notificationType2 == 'post_youtube' || $notificationType2 == 'post_video') {
                        $type2 = $wo['lang']['video_n_label'];
                    } elseif ($notificationType2 == 'post_file') {
                        $type2 = $wo['lang']['file_n_label'];
                    } elseif ($notificationType2 == 'post_vine') {
                        $type2 = $wo['lang']['vine_n_label'];
                    } elseif ($notificationType2 == 'post_soundFile') {
                        $type2 = $wo['lang']['sound_n_label'];
                    } elseif ($notificationType2 == 'post_avatar') {
                        $type2 = $wo['lang']['avatar_n_label'];
                    } elseif ($notificationType2 == 'post_cover') {
                        $type2 = $wo['lang']['cover_n_label'];
                    } else {
                        $type2 = '';
                    }
                } else {
                    $type2 = $wo['lang']['post_n_label'];
                }
                $orginal_txt  = array(
                    "{postType}",
                    "{post}"
                );
                $replaced_txt = array(
                    $type2,
                    $notificationText
                );
                if (!empty($wo['notification']['type'])) {
                    if ($wo['notification']['type'] == "following") {
                        $wo['notification']['type_text'] .= $wo['lang']['followed_you'];
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                    if ($wo['notification']['type'] == 'comment_mention') {
                        $wo['notification']['type_text'] .= $wo['lang']['comment_mention'];
                        $wo['notification']['icon'] .= 'at';
                    }
                    if ($wo['notification']['type'] == 'post_mention') {
                        $wo['notification']['type_text'] .= $wo['lang']['post_mention'];
                        $wo['notification']['icon'] .= 'at';
                    }
                    if ($wo['notification']['type'] == 'liked_post') {
                        $wo['notification']['type_text'] = str_replace($orginal_txt, $replaced_txt, $wo['lang']['liked_post']);
                        $wo['notification']['icon'] .= 'thumbs-up';
                    }
                    if ($wo['notification']['type'] == 'wondered_post') {
                        $lang_type                       = ($wo['config']['second_post_button'] == 'wonder') ? $wo['lang']['wondered_post'] : $wo['lang']['disliked_post'];
                        $wo['notification']['type_text'] = str_replace($orginal_txt, $replaced_txt, $lang_type);
                        $wo['notification']['icon'] .= $wo['second_post_button_icon'];
                    }
                    if ($wo['notification']['type'] == 'share_post') {
                        $wo['notification']['type_text'] = str_replace($orginal_txt, $replaced_txt, $wo['lang']['share_post']);
                        $wo['notification']['icon'] .= 'share';
                    }
                    if ($wo['notification']['type'] == 'comment') {
                        $wo['notification']['type_text'] = str_replace($orginal_txt, $replaced_txt, $wo['lang']['commented_on_post']);
                        $wo['notification']['icon'] .= 'comment';
                    }
                    if ($wo['notification']['type'] == 'comment_reply') {
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $wo['lang']['replied_to_comment']);
                        $wo['notification']['icon'] .= 'comment';
                    }
                    if ($wo['notification']['type'] == 'comment_reply_mention') {
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $wo['lang']['comment_reply_mention']);
                        $wo['notification']['icon'] .= 'comment';
                    }
                    if ($wo['notification']['type'] == 'also_replied') {
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $wo['lang']['also_replied']);
                        $wo['notification']['icon'] .= 'comment';
                    }
                    if ($wo['notification']['type'] == 'liked_comment') {
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $wo['lang']['liked_comment']);
                        $wo['notification']['icon'] .= 'thumbs-up';
                    }
                    if ($wo['notification']['type'] == 'wondered_comment') {
                        $lang_type                       = ($wo['config']['second_post_button'] == 'wonder') ? $wo['lang']['wondered_comment'] : $wo['lang']['disliked_comment'];
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $lang_type);
                        $wo['notification']['icon'] .= $wo['second_post_button_icon'];
                    }
                    if ($wo['notification']['type'] == 'liked_reply_comment') {
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $wo['lang']['liked_reply_comment']);
                        $wo['notification']['icon'] .= 'thumbs-up';
                    }
                    if ($wo['notification']['type'] == 'wondered_reply_comment') {
                        $lang_type                       = ($wo['config']['second_post_button'] == 'wonder') ? $wo['lang']['wondered_reply_comment'] : $wo['lang']['disliked_reply_comment'];
                        $wo['notification']['type_text'] = str_replace('{comment}', $wo['notification']['text'], $lang_type);
                        $wo['notification']['icon'] .= $wo['second_post_button_icon'];
                    }
                    if ($wo['notification']['type'] == 'profile_wall_post') {
                        $wo['notification']['type_text'] = $wo['lang']['posted_on_timeline'];
                        $wo['notification']['icon'] .= 'user';
                    }
                    if ($wo['notification']['type'] == 'visited_profile') {
                        $wo['notification']['type_text'] = $wo['lang']['profile_visted'];
                        $wo['notification']['icon'] .= 'eye';
                    }
                    if ($wo['notification']['type'] == 'liked_page') {
                        $page                            = Wo_PageData($wo['notification']['page_id']);
                        $wo['notification']['type_text'] = str_replace('{page_name}', $page['name'], $wo['lang']['liked_page']);
                        $wo['notification']['icon'] .= 'thumbs-up';
                    }
                    if ($wo['notification']['type'] == 'joined_group') {
                        $group                           = Wo_GroupData($wo['notification']['group_id']);
                        $wo['notification']['type_text'] = str_replace('{group_name}', $group['name'], $wo['lang']['joined_group']);
                        $wo['notification']['icon'] .= 'users';
                    }
                    if ($wo['notification']['type'] == 'accepted_invite') {
                        $page_id                         = @end(explode('/', $wo['notification']['url']));
                        $page                            = Wo_PageData(Wo_PageIdFromPagename($page_id));
                        $wo['notification']['type_text'] = str_replace('{page_name}', $page['name'], $wo['lang']['accepted_invited_page']);
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                    
                    if ($wo['notification']['type'] == 'invited_page') {
                        $page_id                         = @end(explode('/', $wo['notification']['url']));
                        $page                            = Wo_PageData(Wo_PageIdFromPagename($page_id));
                        $wo['notification']['type_text'] = str_replace('{page_name}', $page['name'], $wo['lang']['invited_page']);
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                    if ($wo['notification']['type'] == 'accepted_join_request') {
                        $group_id                        = @end(explode('/', $wo['notification']['url']));
                        $group                           = Wo_GroupData(Wo_GroupIdFromGroupname($group_id));
                        $wo['notification']['type_text'] = str_replace('{group_name}', $group['name'], $wo['lang']['accepted_join_request']);
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                    if ($wo['notification']['type'] == 'added_you_to_group') {
                        $group_id                        = @end(explode('/', $wo['notification']['url']));
                        $group                           = Wo_GroupData(Wo_GroupIdFromGroupname($group_id));
                        $wo['notification']['type_text'] = str_replace('{group_name}', $group['name'], $wo['lang']['added_you_to_group']);
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                    if ($wo['notification']['type'] == 'requested_to_join_group') {
                        $wo['notification']['type_text'] = $wo['lang']['requested_to_join_group'];
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                    if ($wo['notification']['type'] == 'accepted_request') {
                        if ($wo['config']['connectivitySystem'] == 1) {
                            $wo['notification']['type_text'] = $wo['lang']['accepted_friend_request'];
                        } else {
                            $wo['notification']['type_text'] = $wo['lang']['accepted_follow_request'];
                        }
                        $wo['notification']['icon'] .= 'user-plus';
                    }
                }
                $wo['notification']['time_text_string'] = Wo_Time_Elapsed_String($wo['notification']['time']);
                $wo['notification']['time_text']        = Wo_Time_Elapsed_String($wo['notification']['time']);
                if (!empty($wo['notification']['time'])) {
                    $time_today = time() - 86400;
                    if ($wo['notification']['time'] < $time_today) {
                        $wo['notification']['time_text'] = date('m.d.y', $wo['notification']['time']);
                    } else {
                        $time = new DateTime('now', $timezone);
                        $time->setTimestamp($wo['notification']['time']);
                        $wo['notification']['time_text'] = $time->format('H:i');
                    }
                }
                if (!empty($notification_ids)) {
                    $query_where = '\'' . implode('\', \'', $notification_ids) . '\'';
                    $query       = "UPDATE " . T_NOTIFICATION . " SET `seen` = " . time() . " WHERE `id` IN ($query_where)";
                    $sql_query   = mysqli_query($sqlConnect, $query);
                }
                foreach ($non_allowed as $key => $value) {
                    unset($wo['notification']['notifier'][$value]);
                }
                array_push($json_success_data_n, $wo['notification']);
            }
            $list_type       = 'all';
            $array_list_type = array(
                'all',
                'online',
                'offline'
            );
            $search_key      = '';
            if (!empty($_POST['search_key'])) {
                $search_key = $_POST['search_key'];
            }
            if (!empty($_POST['list_type'])) {
                
                $list_type = $_POST['list_type'];
            }
            if ($list_type == 'online' || $list_type == 'offline') {
                $get = Wo_GetChatUsersAPP($user_id, $list_type, $search_key);
            } else {
                $get = Wo_GetMessagesUsersAPP($user_id, $search_key, 30, false, 0, $s);
            }
            $update = Wo_LastSeen($wo['user']['user_id']);
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
                    'user_platform' => Wo_GetPlatformFromUser_ID($user_list['user_id']),
                    'chat_color' => Wo_GetChatColor($wo['user']['user_id'], $user_list['user_id'])
                );
                $json_data['last_message'] = Wo_GetMessagesHeader(array(
                    'user_id' => $user_list['user_id'],
                    'limit' => 1,
                    'user_data' => 1,
                    'session_id' => $s,
                    'platform' => 'windows'
                ));
                $json_data['user_profile'] = Wo_UserData($user_list['user_id']);
                foreach ($non_allowed as $key => $value) {
                    unset($json_data['user_profile'][$value]);
                }
                $check_calles     = Wo_CheckFroInCalls();
                if ($check_calles !== false && is_array($check_calles)) {
                    $video_call = true;
                    $wo['video_call_user'] = Wo_UserData($check_calles['from_id']);
                    $video_call_user['call_id'] = $check_calles['id'];
                    $video_call_user['user_id'] = $wo['video_call_user']['user_id'];
                    $video_call_user['avatar'] = $wo['video_call_user']['avatar'];
                    $video_call_user['name'] = $wo['video_call_user']['name'];
                }
                $json_data['user_profile']['gender'] = ($json_data['user_profile']['gender'] == 'male') ? $wo['lang']['male'] : $wo['lang']['female'];
                if (!empty($json_data['last_message']['time'])) {
                    $time_today = time() - 86400;
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
                        'id' => '',
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
            if (!empty($pro_users)) {
                foreach ($pro_users as $key => $pro_user) {
                    foreach ($non_allowed as $key => $value) {
                        unset($pro_user[$value]);
                    }
                    $final_pro_users[] = $pro_user;
                }
            }
            if (!empty($friend_requests)) {
                foreach ($friend_requests as $key => $friend_request) {
                    foreach ($non_allowed as $key => $value) {
                        unset($friend_request[$value]);
                    }
                    $final_friend_requests[] = $friend_request;
                }
            }
            if (!empty($_POST['friends'])) {
                $limit_f = 10;
                if (!empty($_POST['limit_friends'])) {
                    $limit_f = Wo_Secure($_POST['limit_friends']);
                }
                $users = Wo_GetFollowing($user_id, 'sidebar', $limit_f);
                foreach ($users as $user) {
                    foreach ($non_allowed as $value) {
                        unset($user[$value]);
                    }
                    array_push($json_success_data_2, $user);
                }
            }
            header("Content-type: application/json");
            echo json_encode(array(
                'api_status' => 200,
                'api_text' => 'success',
                'api_version' => $api_version,
                'theme_url' => $config['theme_url'],
                'users' => $json_success_data,
                'notifications' => $json_success_data_n,
                'count_notifications' => $count_notifications,
                'count_friend_requests' => $count_friend_requests,
                'friend_requests' => $final_friend_requests,
                'pro_users' => $final_pro_users,
                'trending_hashtag' => $trending_hashtag,
                'promoted_pages' => $promoted_pages,
                'count_messages' => $count_messages,
                'video_call' => $video_call,
                'video_call_user' => $video_call_user
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