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
$non_allowed = array(
    'password',
    'background_image',
    'background_image_status',
    'email_code',
    'emailNotification',
    'e_liked',
    'e_wondered',
    'e_shared',
    'e_followed',
    'e_commented',
    'e_visited',
    'e_mentioned',
    'e_liked_page',
    'e_joined_group',
    'e_accepted',
    'e_profile_wall_post',
    'type',
    'start_up',
    'start_up_info',
    'startup_follow',
    'startup_image',
    'id',
    'cover_full',
    'cover_org',
    'avatar_org',
    'app_session',
    'last_email_sent',
    'sms_code',
    'pro_time',
    'css_file',
    'src',
    'country_id'
);
function Wo_GetMessagesUsersAPP($user_id, $searchQuery = '', $limit = 50, $new = false, $update = 0, $session_id = 0) {
    global $wo, $sqlConnect;
    if (empty($session_id)) {
        if ($wo['loggedin'] == false) {
           return false;
        }
    }
    if (!is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if (!isset($user_id)) {
        return false;
    }
    $data     = array();
    $excludes = array();
    if (isset($searchQuery) AND !empty($searchQuery)) {
        $query_one = " SELECT `user_id` as `conversation_user_id` FROM " . T_USERS . " WHERE (`user_id` IN (SELECT `from_id` FROM " . T_MESSAGES . " WHERE `to_id` = {$user_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `active` = '1' ";
        if (isset($new) && $new == true) {
            $query_one .= " AND `seen` = 0";
        }
        $query_one .= " ORDER BY `user_id` DESC)";
        if (!isset($new) or $new == false) {
            $query_one .= " OR `user_id` IN (SELECT `to_id` FROM " . T_MESSAGES . " WHERE `from_id` = {$user_id} ORDER BY `id` DESC)";
        }
        $query_one .= ") AND ((`username` LIKE '%{$searchQuery}%') OR CONCAT( `first_name`,  ' ', `last_name` ) LIKE  '%{$searchQuery}%')";
    } else {
       $query_one = "SELECT `conversation_user_id` FROM " . T_U_CHATS . " WHERE `user_id` = '$user_id' AND (`conversation_user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `conversation_user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}')) ORDER BY `time` DESC";
    }
    $query_one .= " LIMIT {$limit}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) > 0) {
        while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
            $user = Wo_UserData($sql_fetch_one['conversation_user_id']);
            if (!empty($user)) {
                $data[] = $user;
            }
        }
    }
    return $data;
}

function Wo_ChatSearchUsersAPP($search_query = '', $user_session = '', $user_id = 0) {
    global $sqlConnect, $wo;
    if (empty($user_session)) {
        if ($wo['loggedin'] == false) {
           return false;
        }
    }
    if (empty($user_id)) {
        return false;
    }
    $data         = array();
    $search_query = Wo_Secure($search_query);
    $user_id      = Wo_Secure($user_id);
    $query_one    = "SELECT `user_id` FROM " . T_USERS . " WHERE (`user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `active` = '1') AND `active` = '1'";
    if (isset($search_query) && !empty($search_query)) {
        $query_one .= " AND ((`username` LIKE '%$search_query%') OR CONCAT(`first_name`,  ' ', `last_name`) LIKE  '%{$search_query}%'))";
    }
    $query_one .= " ORDER BY `first_name` LIMIT 20";
    $query = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}

function Wo_GetChatUsersAPP($user_id = 0, $type = 'online', $search_query = '') {
    global $sqlConnect, $wo;
    $data       = array();
    $time       = time() - 60;
    $user_id    = Wo_Secure($user_id);
    $query_text = "SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `active` = '1')";
    if ($type == 'online') {
        $query_text .= " AND `lastseen` > {$time}";
    } else if ($type == 'offline') {
        $query_text .= " AND `lastseen` < {$time}";
    }
    if (isset($search_query) && !empty($search_query)) {
        $search_query = Wo_Secure($search_query);
        $query_one .= " AND ((`username` LIKE '%$search_query%') OR CONCAT(`first_name`,  ' ', `last_name`) LIKE  '%{$search_query}%'))";
    }
    $query_text .= " AND `active` = '1' ORDER BY `lastseen` DESC";
    if ($type == 'offline') {
        $query_text .= ' LIMIT 30';
    }
    $query = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}

function Wo_GetMessagesAPP($data = array(), $limit = 50) {
    global $wo, $sqlConnect;
    $message_data   = array();
    $user_id        = Wo_Secure($data['recipient_id']);
    $logged_user_id = Wo_Secure($data['user_id']);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $query_one = " SELECT * FROM " . T_MESSAGES;
    if (isset($data['new']) && $data['new'] == true) {
        $query_one .= " WHERE `seen` = 0 AND `from_id` = {$user_id} AND `to_id` = {$logged_user_id} AND `deleted_two` = '0'";
    } else {
        $query_one .= " WHERE ((`from_id` = {$user_id} AND `to_id` = {$logged_user_id} AND `deleted_two` = '0') OR (`from_id` = {$logged_user_id} AND `to_id` = {$user_id} AND `deleted_one` = '0'))";
    }
    if (!empty($data['message_id'])) {
        $data['message_id'] = Wo_Secure($data['message_id']);
        $query_one .= " AND `id` = " . $data['message_id'];
    } else if (!empty($data['before_message_id']) && is_numeric($data['before_message_id']) && $data['before_message_id'] > 0) {
        $data['before_message_id'] = Wo_Secure($data['before_message_id']);
        $query_one .= " AND `id` < " . $data['before_message_id'] . " AND `id` <> " . $data['before_message_id'];
    } else if (!empty($data['after_message_id']) && is_numeric($data['after_message_id']) && $data['after_message_id'] > 0) {
        $data['after_message_id'] = Wo_Secure($data['after_message_id']);
        $query_one .= " AND `id` > " . $data['after_message_id'] . " AND `id` <> " . $data['after_message_id'];
    }
    $sql_query_one    = mysqli_query($sqlConnect, $query_one);
    $query_limit_from = mysqli_num_rows($sql_query_one) - 50;
    if ($query_limit_from < 1) {
        $query_limit_from = 0;
    }
    if (isset($limit)) {
        if (!empty($data['before_message_id']) && is_numeric($data['before_message_id']) && $data['before_message_id'] > 0) {
            $query_one .= " ORDER BY `id` DESC LIMIT {$query_limit_from}, 50";
        } else {
            $query_one .= " ORDER BY `id` ASC LIMIT {$query_limit_from}, 50";
        }
    }
    $query = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['messageUser'] = Wo_UserData($fetched_data['from_id']);
        $fetched_data['messageUser'] = array('user_id' => $fetched_data['messageUser']['user_id'], 'avatar' => $fetched_data['messageUser']['avatar']);
        $fetched_data['text']        = Wo_EditMarkup($fetched_data['text']);
        $message_data[]              = $fetched_data;
        if ($fetched_data['messageUser']['user_id'] == $user_id && $fetched_data['seen'] == 0) {
            mysqli_query($sqlConnect, " UPDATE " . T_MESSAGES . " SET `seen` = " . time() . " WHERE `id` = " . $fetched_data['id']);
        }
    }
    return $message_data;
}

function Wo_GetFilePosition($file) {
    $file_type = 'text';
    if (empty($file)) {
        return $file_type;
    }
    $file_extension = pathinfo($file, PATHINFO_EXTENSION);
    if ($file_extension == 'jpg' || $file_extension == 'jpeg' || $file_extension == 'png' || $file_extension == 'gif') {
        $file_type = 'image';
        if (strpos($file, 'sticker') !== false) {
            $file_type = 'sticker';
        }
    } else if ($file_extension == 'mp4' || $file_extension == 'mkv' || $file_extension == 'avi' || $file_extension == 'mov') {
        $file_type = 'video';
    } else if ($file_extension == 'mp3' || $file_extension == 'wav') {
        $file_type = 'audio';
    } else {
        $file_type = 'file';
    }
    return $file_type;
}
