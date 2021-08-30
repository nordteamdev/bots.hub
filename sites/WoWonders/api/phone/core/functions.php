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
function Wo_UserSugAPP($limit = 20, $user_id=  0) {
    global $wo, $sqlConnect;
    if (!is_numeric($limit)) {
        return false;
    }
    $data      = array();
    $user_id   = Wo_Secure($user_id);
    $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `user_id` NOT IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id}) AND `user_id` <> {$user_id}";
    if (isset($limit)) {
        $query_one .= " ORDER BY RAND() LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetMessagesUsersAPP($fetch_array = array()) {
    global $wo, $sqlConnect;
    if (empty($fetch_array['session_id'])) {
        if ($wo['loggedin'] == false) {
            return false;
        }
    }
    if (!is_numeric($fetch_array['user_id']) or $fetch_array['user_id'] < 1) {
        return false;
    }
    if (!isset($fetch_array['user_id'])) {
        $user_id = $wo['user']['user_id'];
    }
    $user_id     = Wo_Secure($fetch_array['user_id']);
    $searchQuery = '';
    if (!empty($fetch_array['searchQuery'])) {
        $searchQuery = Wo_Secure($fetch_array['searchQuery']);
    }

/*
                     ___            __           __         
                    /\_ \    __  __/\ \__       /\ \        
 _ __   __  _    __ \//\ \  /\_\/\_\ \ ,_\   ___\ \ \___    
/\`'__\/\ \/'\ /'_ `\ \ \ \ \/\ \/\ \ \ \/  /'___\ \  _ `\  
\ \ \/ \/>  <//\ \L\ \ \_\ \_\ \ \ \ \ \ \_/\ \__/\ \ \ \ \ 
 \ \_\  /\_/\_\ \____ \/\____\\ \_\ \_\ \__\ \____\\ \_\ \_\
  \/_/  \//\/_/\/___L\ \/____/ \/_/\/_/\/__/\/____/ \/_/\/_/
                 /\____/                                    
                 \_/__/                                     
  _____ _____  _____ __  __  _____  ____  _   _ _____  ___  __ 
 / ____|  __ \|_   _|  \/  |/ ____|/ __ \| \ | | ____|/ _ \/_ |
| |    | |__) | | | | \  / | (___ | |  | |  \| | |__ | | | || |
| |    |  _  /  | | | |\/| |\___ \| |  | | . ` |___ \| | | || |
| |____| | \ \ _| |_| |  | |____) | |__| | |\  |___) | |_| || |
 \_____|_|  \_\_____|_|  |_|_____/ \____/|_| \_|____/ \___/ |_|

*/
    
    $data     = array();
    $excludes = array();
    if (isset($searchQuery) AND !empty($searchQuery)) {
        $query_one = "SELECT `user_id` as `conversation_user_id` FROM " . T_USERS . " WHERE (`user_id` IN (SELECT `from_id` FROM " . T_MESSAGES . " WHERE `to_id` = {$user_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `active` = '1' ";
        if (isset($fetch_array['new']) && $fetch_array['new'] == true) {
            $query_one .= " AND `seen` = 0";
        }
        $query_one .= " ORDER BY `user_id` DESC)";
        if (!isset($fetch_array['new']) or $fetch_array['new'] == false) {
            $query_one .= " OR `user_id` IN (SELECT `to_id` FROM " . T_MESSAGES . " WHERE `from_id` = {$user_id} ORDER BY `id` DESC)";
        }
        $query_one .= ") AND ((`username` LIKE '%{$searchQuery}%') OR CONCAT( `first_name`,  ' ', `last_name` ) LIKE  '%{$searchQuery}%')";
        if (!empty($fetch_array['limit'])) {
            $limit = Wo_Secure($fetch_array['limit']);
            $query_one .= "LIMIT {$limit}";
        }
    } else {
        $query_one = "SELECT `conversation_user_id` FROM " . T_U_CHATS . " WHERE `user_id` = '$user_id' AND (`conversation_user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `conversation_user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}')) ORDER BY `time` DESC";
    }
    if (!empty($fetch_array['limit'])) {
        $limit = Wo_Secure($fetch_array['limit']);
        $query_one .= " LIMIT {$limit}";
    }
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) > 0) {
        while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
            $data[] = Wo_UserData($sql_fetch_one['conversation_user_id']);
        }
    }
    return $data;
}
function Wo_GetMessagesNotifications($data = array()) {
    global $wo, $sqlConnect;
    $message_data   = array();
    $logged_user_id = Wo_Secure($data['user_id']);
    if (empty($logged_user_id) || !is_numeric($logged_user_id) || $logged_user_id < 0) {
        return false;
    }
    $query_one = " SELECT * FROM " . T_MESSAGES;
    $query_one .= " WHERE `seen` = '0' AND `to_id` = {$logged_user_id} AND `deleted_two` = '0' ORDER BY `id` DESC";
    $query = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['messageUser'] = Wo_UserData($fetched_data['from_id']);
        $fetched_data['messageUser'] = array(
            'user_id' => $fetched_data['messageUser']['user_id'],
            'avatar' => $fetched_data['messageUser']['avatar']
        );
        $fetched_data['text']        = Wo_EditMarkup($fetched_data['text']);
        $message_data[]              = $fetched_data;
    }
    return $message_data;
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

function Wo_GetChatUsersAPP($user_id = 0, $type = 'online', $search_query = '', $user_ids = array()) {
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
    if (!empty($user_ids)) {
        $userids = implode(',', $user_ids);
        $query_text .= " AND `user_id` NOT IN ($userids)";
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
    //Brought to you by CN/CR501
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
        $fetched_data['messageUser'] = array(
            'user_id' => $fetched_data['messageUser']['user_id'],
            'avatar' => $fetched_data['messageUser']['avatar']
        );
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


function Wo_UserContactsAPP($limit = 20, $json_contacts = '{}', $user_id = 0) {
    global $wo, $sqlConnect;
    if (empty($json_contacts)) {
        return false;
    }
    $data = array();
    $json_decode = json_decode($json_contacts, true);
    if (!empty($json_decode)) {
        foreach ($json_decode as $key => $contact) {
            $contact_name = Wo_Secure($contact['Key']);
            $contact_phone = Wo_Secure($contact['Value']);
            $contact_phone = str_replace(' ', '', $contact_phone);
            $contact_phone = str_replace('+', '', $contact_phone);
            $contact_phone = str_replace('-', '', $contact_phone);
            $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1' AND `phone_number` LIKE '%{$contact_phone}%' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `user_id` NOT IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id}) AND `user_id` <> {$user_id} ORDER BY `user_id` DESC LIMIT 1";
            $query = mysqli_query($sqlConnect, $query_one);
            while ($mysqli_fetch = mysqli_fetch_assoc($query)) {
                if (!empty($mysqli_fetch['user_id'])) {
                    $data[] = Wo_UserData($mysqli_fetch['user_id']);
                }
            }
        }
    }
    return $data;
}

function Wo_RegisterAPPPost($re_data = array('recipient_id' => 0)) {
    global $wo, $sqlConnect;
    $is_there_video = false;
    if (empty($re_data['user_id']) or $re_data['user_id'] == 0) {
        $re_data['user_id'] = $wo['user']['user_id'];
    }
    if (!is_numeric($re_data['user_id']) or $re_data['user_id'] < 0) {
        return false;
    }
    
        $re_data['user_id'] = Wo_Secure($re_data['user_id']);
        $timeline           = Wo_UserData($re_data['user_id']);
    if (!empty($re_data['page_id'])) {
        if (Wo_IsPageOnwer($re_data['page_id']) === false) {
            return false;
        }
    }
    if (!empty($re_data['group_id'])) {
        if (Wo_CanBeOnGroup($re_data['group_id']) === false) {
            return false;
        }
    }
    if (!empty($re_data['postText'])) {
        if ($wo['config']['maxCharacters'] > 0) {
            if (mb_strlen($re_data['postText']) > $wo['config']['maxCharacters']) {
            }
        }
        $re_data['postVine']        = '';
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        if (preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $re_data['postText'], $match)) {
            $re_data['postYoutube'] = Wo_Secure($match[1]);
            $is_there_video         = true;
        }
        if (preg_match("#(?<=vine.co/v/)[0-9A-Za-z]+#", $re_data['postText'], $match)) {
            $re_data['postVine'] = Wo_Secure($match[0]);
            $is_there_video      = true;
        }
        if (preg_match("#https?://vimeo.com/([0-9]+)#i", $re_data['postText'], $match)) {
            $re_data['postVimeo'] = Wo_Secure($match[1]);
            $is_there_video       = true;
        }
        if (preg_match('#http://www.dailymotion.com/video/([A-Za-z0-9]+)#s', $re_data['postText'], $match)) {
            $re_data['postDailymotion'] = Wo_Secure($match[1]);
            $is_there_video             = true;
        }
        if (preg_match('~([A-Za-z0-9]+)/videos/(?:t\.\d+/)?(\d+)~i', $re_data['postText'], $match)) {
            $re_data['postFacebook'] = Wo_Secure($match[0]);
            $is_there_video          = true;
        }
        if (preg_match("~\bfacebook\.com.*?\bv=(\d+)~", $re_data['postText'], $match)) {
            $is_there_video = true;
        }
        if (preg_match('%(?:https?://)(?:www\.)?soundcloud\.com/([\-a-z0-9_]+/[\-a-z0-9_]+)%im', $re_data['postText'], $match)) {
            $arrContextOptions = array(
                "ssl" => array(
                    "verify_peer" => false,
                    "verify_peer_name" => false
                )
            );
            $url               = "https://api.soundcloud.com/resolve.json?url=" . $match[0] . "&client_id=d4f8636b1b1d07e4461dcdc1db226a53";
            $track_json        = @file_get_contents($url, false, stream_context_create($arrContextOptions));
            $track             = json_decode($track_json, true);
            if (!empty($track[0]['tracks'][0]['id'])) {
                $re_data['postSoundCloud'] = $track[0]['tracks'][0]['id'];
            } else if (!empty($track['id'])) {
                $re_data['postSoundCloud'] = $track['id'];
            }
            $is_there_video = true;
        }
        $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
        $i          = 0;
        preg_match_all($link_regex, $re_data['postText'], $matches);
        foreach ($matches[0] as $match) {
            $match_url           = strip_tags($match);
            $syntax              = '[a]' . urlencode($match_url) . '[/a]';
            $re_data['postText'] = str_replace($match, $syntax, $re_data['postText']);
        }
        $mention_regex = '/@([A-Za-z0-9_]+)/i';
        preg_match_all($mention_regex, $re_data['postText'], $matches);
        foreach ($matches[1] as $match) {
            $match         = Wo_Secure($match);
            $match_user    = Wo_UserData(Wo_UserIdFromUsername($match));
            $match_search  = '@' . $match;
            $match_replace = '@[' . $match_user['user_id'] . ']';
            if (isset($match_user['user_id'])) {
                $re_data['postText'] = str_replace($match_search, $match_replace, $re_data['postText']);
                $mentions[]          = $match_user['user_id'];
            }
        }
        $hashtag_regex = '/#([^`~!@$%^&*\#()\-+=\\|\/\.,<>?\'\":;{}\[\]* ]+)/i';
        preg_match_all($hashtag_regex, $re_data['postText'], $matches);
        foreach ($matches[1] as $match) {
            if (!is_numeric($match)) {
                $hashdata = Wo_GetHashtag($match);
                if (is_array($hashdata)) {
                    $match_search        = '#' . $match;
                    $match_replace       = '#[' . $hashdata['id'] . ']';
                    if (mb_detect_encoding($match_search, 'ASCII', true)) {
                        $re_data['postText'] = preg_replace("/$match_search\b/i", $match_replace,  $re_data['postText']);
                    } else {
                        $re_data['postText'] = str_replace($match_search, $match_replace, $re_data['postText']);
                    }
                    $hashtag_query       = "UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
                    $hashtag_sql_query   = mysqli_query($sqlConnect, $hashtag_query);
                }
            }
        }
    }
    $re_data['registered'] = date('n') . '/' . date("Y");
    if ($is_there_video == true) {
        $re_data['postFile']        = '';
        $re_data['postLinkImage']   = '';
        $re_data['postLinkTitle']   = '';
        $re_data['postLinkContent'] = '';
        $re_data['postLink']        = '';
    }
    if (!empty($re_data['postVine'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
    }
    if (!empty($re_data['postYoutube'])) {
        $re_data['postVine']        = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
    }
    if (!empty($re_data['postVimeo'])) {
        $re_data['postVine']        = '';
        $re_data['postYoutube']     = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
    }
    if (!empty($re_data['postDailymotion'])) {
        $re_data['postYoutube']    = '';
        $re_data['postVimeo']      = '';
        $re_data['postVine']       = '';
        $re_data['postFacebook']   = '';
        $re_data['postSoundCloud'] = '';
    }
    if (!empty($re_data['postFacebook'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postVine']        = '';
        $re_data['postSoundCloud']  = '';
    }
    if (!empty($re_data['postSoundCloud'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postVine']        = '';
    }
    if (empty($re_data['multi_image'])) {
        $re_data['multi_image'] = 0;
    }
    if (empty($re_data['postText']) && empty($re_data['album_name']) && $re_data['multi_image'] == 0 && empty($re_data['postFacebook']) && empty($re_data['postVimeo']) && empty($re_data['postDailymotion']) && empty($re_data['postVine']) && empty($re_data['postYoutube']) && empty($re_data['postFile']) && empty($re_data['postSoundCloud']) && empty($re_data['postFeeling']) && empty($re_data['postListening']) && empty($re_data['postPlaying']) && empty($re_data['postWatching']) && empty($re_data['postTraveling']) && empty($re_data['postMap']) && empty($re_data['product_id'])) {
        return false;
    }
    if (!empty($re_data['recipient_id']) && is_numeric($re_data['recipient_id']) && $re_data['recipient_id'] > 0) {
        if ($re_data['recipient_id'] == $re_data['user_id']) {
            return false;
        }
        $recipient = Wo_UserData($re_data['recipient_id']);
        if (empty($recipient['user_id'])) {
            return false;
        }
        if (!empty($recipient['user_id'])) {
            if ($recipient['post_privacy'] == 'ifollow') {
                if (Wo_IsFollowing($recipient['user_id'], $wo['user']['user_id']) === false) {
                    return false;
                }
            } else if ($recipient['post_privacy'] == 'nobody') {
                return false;
            }
        }
    }
    if (!isset($re_data['postType'])) {
        $re_data['postType'] = 'post';
    }
    if (!empty($re_data['page_id'])) {
        $re_data['user_id'] = 0;
    }
    $fields  = '`' . implode('`, `', array_keys($re_data)) . '`';
    $data    = '\'' . implode('\', \'', $re_data) . '\'';
    $query   = mysqli_query($sqlConnect, "INSERT INTO " . T_POSTS . " ({$fields}) VALUES ({$data})");
    $post_id = mysqli_insert_id($sqlConnect);
    if ($query) {
        mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `post_id` = {$post_id} WHERE `id` = {$post_id}");
        if (isset($recipient['user_id'])) {
            $notification_data_array = array(
                'recipient_id' => $recipient['user_id'],
                'post_id' => $post_id,
                'type' => 'profile_wall_post',
                'url' => 'index.php?link1=post&id=' . $post_id
            );
            Wo_RegisterNotification($notification_data_array);
        }
        if (isset($mentions) && is_array($mentions)) {
            foreach ($mentions as $mention) {
                $notification_data_array = array(
                    'recipient_id' => $mention,
                    'page_id' => $re_data['page_id'],
                    'type' => 'post_mention',
                    'url' => 'index.php?link1=post&id=' . $post_id
                );
                Wo_RegisterNotification($notification_data_array);
            }
        }
        return $post_id;
    }
}
function Wo_SecureData($config = array(), $data = array()) {
    global $non_allowed;
    if (!empty($config['multi_array'])) {
        $final_data = array();
        foreach ($data as $key => $user) {
            foreach ($non_allowed as $key => $value) {
                unset($user[$value]);
            }
            $final_data[] = $user;
        }
        return $final_data;
    } else {
        foreach ($non_allowed as $key => $value) {
            unset($data[$value]);
        }
    }
    return $data;
}