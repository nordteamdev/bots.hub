<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2018 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
$response_data = array(
    'api_status' => 400
);

if (empty($_POST['fetch'])) {
    $error_code    = 3;
    $error_message = 'fetch (POST) is missing';
}

$user_id = $wo['user']['user_id'];

if (!empty($_POST['device_id'])) {
    $device_id  = Wo_Secure($_POST['device_id']);
    $update  = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `device_id` = '{$device_id}' WHERE `user_id` = '{$user_id}'");
}

if (empty($error_code)) {
    
    $response_data = array(
        'api_status' => 200
    );
    
    $fetch = explode(',', $_POST['fetch']);
    $data  = array();
    foreach ($fetch as $key => $value) {
        $data[$value] = $value;
    }
    if (empty($wo['user']['timezone'])) {
        $wo['user']['timezone'] = 'UTC';
    }
    $timezone      = new DateTimeZone($wo['user']['timezone']);

    if (!empty($data['notifications'])) {
    	$final_notifications= array();
        $notifications = Wo_GetNotifications(array(
            'remove_notification' => array(
                'requested_to_join_group',
                'interested_event',
                'going_event',
                'invited_event',
                'forum_reply',
                'admin_notification',
            )
        ));
        
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
                if ($wo['notification']['type'] == 'viewed_story') {
                    $wo['notification']['type_text'] = $wo['lang']['viewed_your_story'];
                    $wo['notification']['url']       = $wo['notification']['url']; 
                    $wo['notification']['icon']     .= 'story';
                }
                if ($wo['notification']['type'] == "reaction") {
                    if( $wo['notification']['text'] == "post" ){
                        $wo['notification']['type_text'] .= $wo['lang']['reacted_to_your_post'];
                    }else if( $wo['notification']['text'] == "comment" ){
                        $wo['notification']['type_text'] .= $wo['lang']['reacted_to_your_comment'];
                    }else if( $wo['notification']['text'] == "replay" ){
                        $wo['notification']['type_text'] .= $wo['lang']['reacted_to_your_replay'];
                    }
                    $wo['notification']['icon'] = strtolower($notificationType2);
                }
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
                    $event_data                      = Wo_EventData($wo['notification']['event_id']);
                    $wo['notification']['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['is_interested']);
                    $wo['notification']['icon'] .= 'eye';
                }
                if ($wo['notification']['type'] == 'going_event') {
                    $event_data                      = Wo_EventData($wo['notification']['event_id']);
                    $wo['notification']['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['is_going']);
                    $wo['notification']['icon'] .= 'calendar-o';
                }
                if ($wo['notification']['type'] == 'invited_event') {
                    $event_data                      = Wo_EventData($wo['notification']['event_id']);
                    $wo['notification']['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['invited_you_event']);
                    $wo['notification']['icon'] .= 'calendar-o';
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
            array_push($final_notifications, $wo['notification']);
        }
        $count_notifications = Wo_CountNotifications(array(
            'unread' => true,
            'remove_notification' => array('requested_to_join_group', 'interested_event', 'going_event', 'invited_event', 'forum_reply', 'admin_notification')
        ));
        $response_data['notifications'] = $final_notifications;
        $response_data['new_notifications_count'] = $count_notifications;
    }
    
    if (!empty($data['friend_requests'])) {
    	$final_friend_requests = array();
    	$friend_requests = Wo_GetFollowRequests();
    	if (!empty($friend_requests)) {
            foreach ($friend_requests as $key => $friend_request) {
                foreach ($non_allowed as $key => $value) {
                   unset($friend_request[$value]);
                }
                $final_friend_requests[] = $friend_request;
            }
        }
        $response_data['friend_requests'] = $final_friend_requests;
        $response_data['new_friend_requests_count'] = Wo_CountFollowRequests();
    }

    if (!empty($data['pro_users'])) {
    	$final_pro_users = array();
    	$pro_users = Wo_FeaturedUsers(9);
    	if (!empty($pro_users)) {
            foreach ($pro_users as $key => $pro_user) {
                foreach ($non_allowed as $key => $value) {
                   unset($pro_user[$value]);
                }
                $final_pro_users[] = $pro_user;
            }
        }
        $response_data['pro_users'] = $final_pro_users;
    }

    if (!empty($data['promoted_pages'])) {
        $response_data['promoted_pages'] = Wo_GetPromotedPage();
    }

    if (!empty($data['trending_hashtag'])) {
        $response_data['trending_hashtag'] = Wa_GetTrendingHashs('popular');
    }

    if (!empty($data['count_new_messages'])) {
        $response_data['count_new_messages'] =  Wo_CountMessages(array('new' => true), 'interval');
    }
}