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
$count_notifications = array();
$friend_requests = array();
$pro_users = array();
$trending_hashtag = array();
$promoted_pages = array();
$count_messages = array();
$count_friend_requests = array();
$final_pro_users = array();
$final_friend_requests = array();

if ($type == 'get_notifications') {
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
            if (!empty($_POST['device_id'])) {
                $device_id  = Wo_Secure($_POST['device_id']);
                $update  = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `device_id` = '{$device_id}' WHERE `user_id` = '{$user_id}'");
            }
            $notifications = Wo_GetNotifications(array('remove_notification' => array('requested_to_join_group', 'interested_event', 'going_event', 'invited_event', 'forum_reply', 'admin_notification')));
            $count_notifications = Wo_CountNotifications(array(
                'unread' => true,
                'remove_notification' => array('requested_to_join_group', 'interested_event', 'going_event', 'invited_event', 'forum_reply', 'admin_notification')
            ));
            $count_friend_requests = Wo_CountFollowRequests();
            $friend_requests = Wo_GetFollowRequests();
            if ($config['pro'] == 1) {
                $pro_users = Wo_FeaturedUsers(9);
                $promoted_pages = Wo_GetPromotedPage();
            }
            $trending_hashtag = Wa_GetTrendingHashs('popular');
            $count_messages = Wo_CountMessages(array('new' => true), 'interval');
            $notification_ids = array();

            $timezone      = new DateTimeZone($user_login_data['timezone']);
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
                    if ($wo['notification']['type'] == 'interested_event') {
                        $event_data = Wo_EventData($wo['notification']['event_id']);
                        $wo['notification']['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['is_interested']);
                        $wo['notification']['icon'] .= 'eye';
                    }
                    if ($wo['notification']['type'] == 'going_event') {
                        $event_data = Wo_EventData($wo['notification']['event_id']);
                        $wo['notification']['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['is_going']);
                        $wo['notification']['icon'] .= 'calendar-o';
                    }
                    if ($wo['notification']['type'] == 'invited_event') {
                        $event_data = Wo_EventData($wo['notification']['event_id']);
                        $wo['notification']['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['invited_you_event']);
                        $wo['notification']['icon'] .= 'calendar-o';
                    }
                }
                $wo['notification']['time_text_string'] = Wo_Time_Elapsed_String($wo['notification']['time']);
                $wo['notification']['time_text'] = Wo_Time_Elapsed_String($wo['notification']['time']);
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
                    $query     = "UPDATE " . T_NOTIFICATION . " SET `seen` = " . time() . " WHERE `id` IN ($query_where)";
                    $sql_query = mysqli_query($sqlConnect, $query);
                }
                foreach ($non_allowed as $key => $value) {
                   unset($wo['notification']['notifier'][$value]);
                }
                array_push($json_success_data, $wo['notification']);
            }
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
    'notifications' => $json_success_data,
    'count_notifications' => $count_notifications,
    'count_friend_requests' => $count_friend_requests,
    'friend_requests' => $final_friend_requests,
    'pro_users' => $final_pro_users,
    'trending_hashtag' => $trending_hashtag,
    'promoted_pages' => $promoted_pages,
    'count_messages' => $count_messages
);
header("Content-type: application/json");
echo json_encode($json_success_data22);
exit();
?>