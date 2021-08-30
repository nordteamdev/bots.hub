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
/* Script Main Functions (File 1) */
function Wo_GetTerms() {
    global $sqlConnect;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_TERMS);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[$fetched_data['type']] = $fetched_data['text'];
    }
    return $data;
}
function Wo_GetUserFromSessionID($session_id, $platform = 'web') {
    global $sqlConnect, $db;
    if (empty($session_id)) {
        return false;
    }
    $session_id = Wo_Secure($session_id);
    $query      = mysqli_query($sqlConnect, "SELECT * FROM " . T_APP_SESSIONS . " WHERE `session_id` = '{$session_id}' LIMIT 1");
    $fetched_data = mysqli_fetch_assoc($query);
    if (empty($fetched_data['platform_details']) && $fetched_data['platform'] == 'web') {
        $ua = serialize(getBrowser());
        if (isset($fetched_data['platform_details'])) {
            $update_session = $db->where('id', $fetched_data['id'])->update(T_APP_SESSIONS, array('platform_details' => $ua));
        }
    }
    return $fetched_data['user_id'];
}
function Wo_GetDataFromSessionID($session_id, $platform = 'web') {
    global $sqlConnect;
    if (empty($session_id)) {
        return false;
    }
    $platform   = Wo_Secure($platform);
    $session_id = Wo_Secure($session_id);
    $data       = array();
    $query      = mysqli_query($sqlConnect, "SELECT * FROM " . T_APP_SESSIONS . " WHERE `session_id` = '{$session_id}' AND `platform` = '{$platform}' LIMIT 1");
    return mysqli_fetch_assoc($query);
}
function Wo_GetSessionDataFromUserID($user_id = 0) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $time    = time() - 30;
    $query   = mysqli_query($sqlConnect, "SELECT * FROM " . T_APP_SESSIONS . " WHERE `user_id` = '{$user_id}' AND `platform` = 'web' AND `time` > $time LIMIT 1");
    return mysqli_fetch_assoc($query);
}
function Wo_GetAllSessionsFromUserID($user_id = 0) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, "SELECT * FROM " . T_APP_SESSIONS . " WHERE `user_id` = '{$user_id}' ORDER by time DESC");
    $data = array();
    while ($row = mysqli_fetch_assoc($query)) {
        $row['browser'] = 'Unknown';
        $row['time'] = Wo_Time_Elapsed_String($row['time']);
        $row['platform'] = ucfirst($row['platform']);
        $row['ip_address'] = '';
        if ($row['platform'] == 'web' || $row['platform'] == 'windows') {
            $row['platform'] = 'Unknown';
        }
        if ($row['platform'] == 'Phone') {
            $row['browser'] = 'Mobile';
        }
        if ($row['platform'] == 'Windows') {
            $row['browser'] = 'Desktop Application';
        }
        if (!empty($row['platform_details'])) {
            $uns = unserialize($row['platform_details']);
            $row['browser'] = $uns['name'];
            $row['platform'] = ucfirst($uns['platform']);
            $row['ip_address'] = $uns['ip_address'];
        }

        $data[] = $row;
    }
    return $data;
}
function Wo_GetPlatformFromUser_ID($user_id = 0) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, "SELECT `platform` FROM " . T_APP_SESSIONS . " WHERE `user_id` = '{$user_id}' ORDER BY `time` DESC LIMIT 1");
    $mysqli  = mysqli_fetch_assoc($query);
    return $mysqli['platform'];
}
function Wo_SaveTerm($update_name, $value) {
    global $wo, $config, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $update_name = Wo_Secure($update_name);
    $value       = mysqli_real_escape_string($sqlConnect, $value);
    $query_one   = " UPDATE " . T_TERMS . " SET `text` = '{$value}' WHERE `type` = '{$update_name}'";
    $query       = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetConfig() {
    global $sqlConnect;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_CONFIG);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[$fetched_data['name']] = $fetched_data['value'];
    }
    return $data;
}
function Wo_GetLangDetails($lang_key = '') {
    global $sqlConnect, $wo;
    if (empty($lang_key)) {
        return false;
    }
    $lang_key = Wo_Secure($lang_key);
    $data     = array();
    $query    = mysqli_query($sqlConnect, "SELECT * FROM " . T_LANGS . " WHERE `lang_key` = '{$lang_key}'");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        unset($fetched_data['lang_key']);
        unset($fetched_data['id']);
        $data[] = $fetched_data;
    }
    return $data;
}
function Wo_LangsFromDB($lang = 'english') {
    global $sqlConnect, $wo;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SELECT `lang_key`, `$lang` FROM " . T_LANGS);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[$fetched_data['lang_key']] = htmlspecialchars_decode($fetched_data[$lang]);
    }
    return $data;
}
function Wo_LangsNamesFromDB($lang = 'english') {
    global $sqlConnect, $wo;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SHOW COLUMNS FROM " . T_LANGS);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = $fetched_data['Field'];
    }
    unset($data[0]);
    unset($data[1]);
    return $data;
}
function Wo_SaveConfig($update_name, $value) {
    global $wo, $config, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!array_key_exists($update_name, $config)) {
        return false;
    }
    $update_name = Wo_Secure($update_name);
    $value       = mysqli_real_escape_string($sqlConnect, $value);
    $query_one   = " UPDATE " . T_CONFIG . " SET `value` = '{$value}' WHERE `name` = '{$update_name}'";
    $query       = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_Login($username, $password) {
    global $sqlConnect;
    if (empty($username) || empty($password)) {
        return false;
    }
    $username            = Wo_Secure($username);
    $query_hash          = mysqli_query($sqlConnect, "SELECT * FROM " . T_USERS . " WHERE (`username` = '{$username}' OR `email` = '{$username}' OR `phone_number` = '{$username}')");
    $mysqli_hash_upgrade = mysqli_fetch_assoc($query_hash);
    $hash                = 'md5';
    if (preg_match('/^[a-f0-9]{32}$/', $mysqli_hash_upgrade['password'])) {
        $hash = 'md5';
    } else if (preg_match('/^[0-9a-f]{40}$/i', $mysqli_hash_upgrade['password'])) {
        $hash = 'sha1';
    }
    $login_password = Wo_Secure($hash($password));
    $query          = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE (`username` = '{$username}' OR `email` = '{$username}' OR `phone_number` = '{$username}') AND `password` = '{$login_password}'");
    if (Wo_Sql_Result($query, 0) == 1) {
        if ($hash == 'md5') {
            $new_password = Wo_Secure(sha1($password));
            $query_       = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET password = '$new_password' WHERE (`username` = '{$username}' OR `email` = '{$username}' OR `phone_number` = '{$username}')");
        }
        return true;
    }
    return false;
}
function Wo_CreateLoginSession($user_id = 0) {
    global $sqlConnect, $db;
    if (empty($user_id)) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $hash      = sha1(rand(111111111, 999999999)) . md5(microtime()) . rand(11111111, 99999999) . md5(rand(5555, 9999));
    $query_two = mysqli_query($sqlConnect, "DELETE FROM " . T_APP_SESSIONS . " WHERE `session_id` = '{$hash}'");
    if ($query_two) {
        $ua = serialize(getBrowser());
        $delete_same_session = $db->where('user_id', $user_id)->where('platform_details', $ua)->delete(T_APP_SESSIONS);
        $query_three = mysqli_query($sqlConnect, "INSERT INTO " . T_APP_SESSIONS . " (`user_id`, `session_id`, `platform`, `platform_details`, `time`) VALUES('{$user_id}', '{$hash}', 'web', '$ua'," . time() . ")");
        if ($query_three) {
            return $hash;
        }
    }
}
function Wo_IsUserCookie($user_id, $password) {
    global $sqlConnect;
    if (empty($user_id) || empty($password)) {
        return false;
    }
    $user_id  = Wo_Secure($user_id);
    $password = Wo_Secure($password);
    $query    = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `user_id` = '{$user_id}' AND `password` = '{$password}'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_SetLoginWithSession($user_email) {
    if (empty($user_email)) {
        return false;
    }
    $user_email          = Wo_Secure($user_email);
    $_SESSION['user_id'] = Wo_CreateLoginSession(Wo_UserIdFromEmail($user_email));
}
function Wo_UserActive($username) {
    global $sqlConnect;
    if (empty($username)) {
        return false;
    }
    $username = Wo_Secure($username);
    $query    = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . "  WHERE (`username` = '{$username}' OR `email` = '{$username}' OR `phone_number` = '{$username}') AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_UserInactive($username) {
    global $sqlConnect;
    if (empty($username)) {
        return false;
    }
    $username = Wo_Secure($username);
    $query    = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . "  WHERE (`username` = '{$username}' OR `email` = '{$username}' OR `phone_number` = '{$username}') AND `active` = '2'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_UserExists($username) {
    global $sqlConnect;
    if (empty($username)) {
        return false;
    }
    $username = Wo_Secure($username);
    $query    = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `username` = '{$username}'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_IsUserComplete($user_id) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `user_id` = '{$user_id}' AND `start_up` = '0'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_UserIdFromUsername($username) {
    global $sqlConnect;
    if (empty($username)) {
        return false;
    }
    $username = Wo_Secure($username);
    $query    = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `username` = '{$username}'");
    return Wo_Sql_Result($query, 0, 'user_id');
}
function Wo_UserIdFromPhoneNumber($phone_number) {
    global $sqlConnect;
    if (empty($phone_number)) {
        return false;
    }
    $phone_number = Wo_Secure($phone_number);
    $query    = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `phone_number` = '{$phone_number}'");
    return Wo_Sql_Result($query, 0, 'user_id');
}
function Wo_UserNameFromPhoneNumber($phone_number) {
    global $sqlConnect;
    if (empty($phone_number)) {
        return false;
    }
    $phone_number = Wo_Secure($phone_number);
    $query    = mysqli_query($sqlConnect, "SELECT `username` FROM " . T_USERS . " WHERE `phone_number` = '{$phone_number}'");
    return Wo_Sql_Result($query, 0, 'username');
}
function Wo_UserIdForLogin($username) {
    global $sqlConnect;
    if (empty($username)) {
        return false;
    }
    $username = Wo_Secure($username);
    $query    = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `username` = '{$username}' OR `email` = '{$username}' OR `phone_number` = '{$username}'");
    return Wo_Sql_Result($query, 0, 'user_id');
}
function Wo_UserIdFromEmail($email) {
    global $sqlConnect;
    if (empty($email)) {
        return false;
    }
    $email = Wo_Secure($email);
    $query = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `email` = '{$email}'");
    return Wo_Sql_Result($query, 0, 'user_id');
}
function Wo_UserIDFromEmailCode($email_code) {
    global $sqlConnect;
    if (empty($email_code)) {
        return false;
    }
    $email_code = Wo_Secure($email_code);
    $query      = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `email_code` = '{$email_code}'");
    return Wo_Sql_Result($query, 0, 'user_id');
}
function Wo_UserIDFromSMSCode($email_code) {
    global $sqlConnect;
    if (empty($email_code)) {
        return false;
    }
    $email_code = Wo_Secure($email_code);
    $query      = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `sms_code` = '{$email_code}'");
    return Wo_Sql_Result($query, 0, 'user_id');
}
function Wo_IsBlocked($user_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $user_id        = Wo_Secure($user_id);
    $query          = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_BLOCKS . " WHERE (`blocker` = {$logged_user_id} AND `blocked` = {$user_id}) OR (`blocker` = {$user_id} AND `blocked` = {$logged_user_id})");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_RegisterBlock($user_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $user_id        = Wo_Secure($user_id);
    $query          = mysqli_query($sqlConnect, "INSERT INTO " . T_BLOCKS . " (`blocker`, `blocked`) VALUES ('{$logged_user_id}', '{$user_id}')");
    return ($query) ? true : false;
}
function Wo_RemoveBlock($user_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $user_id        = Wo_Secure($user_id);
    $query          = mysqli_query($sqlConnect, "DELETE FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}' AND `blocked` = '{$user_id}'");
    return ($query) ? true : false;
}
function Wo_GetBlockedMembers($user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $data           = array();
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $user_id        = Wo_Secure($user_id);
    $query          = mysqli_query($sqlConnect, "SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}'");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['blocked']);
    }
    return $data;
}
function Wo_EmailExists($email) {
    global $sqlConnect;
    if (empty($email)) {
        return false;
    }
    $email = Wo_Secure($email);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `email` = '{$email}'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_PhoneExists($phone) {
    global $sqlConnect;
    if (empty($phone)) {
        return false;
    }
    $phone = Wo_Secure($phone);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `phone_number` = '{$phone}'");
    return (Wo_Sql_Result($query, 0) > 1) ? true : false;
}
function Wo_IsOnwerUser($user_id) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $user_id        = Wo_Secure($user_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    if ($user_id == $logged_user_id) {
        return true;
    } else {
        return false;
    }
}
function Wo_IsOnwer($user_id) {
    global $wo;

    if ($wo['loggedin'] == false) {
        return false;
    }

    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }

    $user_id        = Wo_Secure($user_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);

    if (Wo_IsAdmin($logged_user_id) === false) {
        if ($user_id == $logged_user_id) {
            return true;
        } 
        else {
            return false;
        }
    } 

    else {
        return true;
    }
}

function Wo_UserData($user_id, $password = true) {
    global $wo, $sqlConnect, $cache;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $data           = array();
    $user_id        = Wo_Secure($user_id);
    $query_one      = "SELECT * FROM " . T_USERS . " WHERE `user_id` = {$user_id}";
    $hashed_user_Id = md5($user_id);
    if ($wo['config']['cacheSystem'] == 1) {
        $fetched_data = $cache->read($hashed_user_Id . '_U_Data.tmp');
        if (empty($fetched_data)) {
            $sql          = mysqli_query($sqlConnect, $query_one);
            $fetched_data = mysqli_fetch_assoc($sql);
            $cache->write($hashed_user_Id . '_U_Data.tmp', $fetched_data);
        }
    } else {
        $sql          = mysqli_query($sqlConnect, $query_one);
        $fetched_data = mysqli_fetch_assoc($sql);
    }
    if (empty($fetched_data)) {
        return array();
    }
    if ($password == false) {
        unset($fetched_data['password']);
    }
    $fetched_data['avatar_org'] = $fetched_data['avatar'];
    $fetched_data['cover_org']  = $fetched_data['cover'];
    $explode2                   = @end(explode('.', $fetched_data['cover']));
    $explode3                   = @explode('.', $fetched_data['cover']);
    $fetched_data['cover_full'] = $wo['userDefaultCover'];
    if ($fetched_data['cover'] != $wo['userDefaultCover']) {
        @$fetched_data['cover_full'] = $explode3[0] . '_full.' . $explode2;
    }
    $explode2                   = @end(explode('.', $fetched_data['avatar']));
    $explode3                   = @explode('.', $fetched_data['avatar']);
    if ($fetched_data['avatar'] != $wo['userDefaultAvatar']) {
        @$fetched_data['avatar_full'] = $explode3[0] . '_full.' . $explode2;
    }
    $fetched_data['avatar'] = Wo_GetMedia($fetched_data['avatar']) . '?cache=' . $fetched_data['last_avatar_mod'];
    $fetched_data['cover']  = Wo_GetMedia($fetched_data['cover']) . '?cache=' . $fetched_data['last_cover_mod'];
    $fetched_data['id']     = $fetched_data['user_id'];
    $fetched_data['type']   = 'user';
    $fetched_data['url']    = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['username']);
    $fetched_data['name']   = '';
    if (!empty($fetched_data['first_name'])) {
        if (!empty($fetched_data['last_name'])) {
            $fetched_data['name'] = $fetched_data['first_name'] . ' ' . $fetched_data['last_name'];
        } else {
            $fetched_data['name'] = $fetched_data['first_name'];
        }
    } else {
        $fetched_data['name'] = $fetched_data['username'];
    }
    if (!empty($fetched_data['details'])) {
        $fetched_data['details'] = unserialize($fetched_data['details']);
    }
    $fetched_data['following_data'] = '';
    $fetched_data['followers_data'] = '';
    $fetched_data['mutual_friends_data'] = '';
    $fetched_data['likes_data'] = '';
    $fetched_data['groups_data'] = '';
    $fetched_data['album_data'] = '';
    if (!empty($fetched_data['sidebar_data'])) {
        $sidebar_data = unserialize($fetched_data['sidebar_data']);
        if (!empty($sidebar_data['following_data'])) {
            $fetched_data['following_data'] = $sidebar_data['following_data'];
        }
        if (!empty($sidebar_data['followers_data'])) {
            $fetched_data['followers_data'] = $sidebar_data['followers_data'];
        }
        if (!empty($sidebar_data['mutual_friends_data'])) {
            $fetched_data['mutual_friends_data'] = $sidebar_data['mutual_friends_data'];
        }
        if (!empty($sidebar_data['likes_data'])) {
            $fetched_data['likes_data'] = $sidebar_data['likes_data'];
        }
        if (!empty($sidebar_data['groups_data'])) {
            $fetched_data['groups_data'] = $sidebar_data['groups_data'];
        }
        if (!empty($sidebar_data['album_data'])) {
            $fetched_data['album_data'] = $sidebar_data['album_data'];
        }
    }
    $fetched_data['website'] = (strpos($fetched_data['website'], 'http') === false && !empty($fetched_data['website'])) ? 'http://' . $fetched_data['website'] : $fetched_data['website'];
    $fetched_data['working_link'] = (strpos($fetched_data['working_link'], 'http') === false && !empty($fetched_data['working_link'])) ? 'http://' . $fetched_data['working_link'] : $fetched_data['working_link'];
    $fetched_data['lastseen_unix_time'] = $fetched_data['lastseen'];
    $fetched_data['lastseen_status'] = ($fetched_data['lastseen'] > (time() - 60)) ? 'on' : 'off';
    
    return $fetched_data;
}

function Wo_UserStatus($user_id, $lastseen, $type = '') {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['user']['showlastseen'] == 0) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($lastseen) || !is_numeric($lastseen) || $lastseen < 0) {
        return false;
    }

    $status   = '';
    $user_id  = Wo_Secure($user_id);
    $lastseen = Wo_Secure($lastseen);
    $time     = time() - 60;

    if ($lastseen < $time) {
        if ($type == 'profile') {
            $status = '<span class="small-last-seen"><span style="font-size:12px; color:#777;">' . Wo_Time_Elapsed_String($lastseen) . '</span></span>';
        } 
        else {
            $status = '<span class="small-last-seen">' . Wo_Time_Elapsed_String($lastseen) . '</span>';
        }
    } 

    else {
        $status = '<span class="online-text"> ' . $wo['lang']['online'] . ' </span>';
    }

    return $status;
}

function Wo_LastSeen($user_id, $type = '') {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if ($type == 'first') {
        $user = Wo_UserData($user_id);
        if ($user['status'] == 1) {
            return false;
        }
    } else {
        if ($wo['user']['status'] == 1) {
            return false;
        }
    }
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, " UPDATE " . T_USERS . " SET `lastseen` = " . time() . " WHERE `user_id` = {$user_id} AND `active` = '1'");
    if ($query) {
        return true;
    } else {
        return false;
    }
}

function Wo_RegisterUser($registration_data, $invited = false) {
    global $wo, $sqlConnect;
    if (empty($registration_data)) {
        return false;
    }
    if ($wo['config']['user_registration'] == 0 && !$invited) {
        return false;
    }
    $ip     = '0.0.0.0';
    $get_ip = get_ip_address();
    if (!empty($get_ip)) {
        $ip = $get_ip;
    }
    if ($wo['config']['login_auth'] == 1) {
        $getIpInfo = fetchDataFromURL("http://ip-api.com/json/$get_ip");
        $getIpInfo = json_decode($getIpInfo, true);
        if ($getIpInfo['status'] == 'success' && !empty($getIpInfo['regionName']) && !empty($getIpInfo['countryCode']) && !empty($getIpInfo['timezone']) && !empty($getIpInfo['city'])) {
            $registration_data['last_login_data'] = serialize($getIpInfo);
        }
    }
    $registration_data['registered'] = date('n') . '/' . date("Y");
    $registration_data['joined']     = time();
    $registration_data['password']   = sha1($registration_data['password']);
    $registration_data['ip_address'] = Wo_Secure($ip);
    $registration_data['language']   = $wo['config']['defualtLang'];
    if (!empty($_SESSION['lang'])) {
        $lang_name = strtolower($_SESSION['lang']);
        $langs     = Wo_LangsNamesFromDB();
        if (in_array($lang_name, $langs)) {
            $registration_data['language'] = Wo_Secure($lang_name);
        }
    }
    $registration_data['order_posts_by'] = $wo['config']['order_posts_by'];
    $fields                              = '`' . implode('`,`', array_keys($registration_data)) . '`';
    $data                                = '\'' . implode('\', \'', $registration_data) . '\'';
    $query                               = mysqli_query($sqlConnect, "INSERT INTO " . T_USERS . " ({$fields}) VALUES ({$data})");
    $user_id                             = mysqli_insert_id($sqlConnect);
    $query_2                             = mysqli_query($sqlConnect, "INSERT INTO " . T_USERS_FIELDS . " (`user_id`) VALUES ({$user_id})");
    if ($query) {
        if ($invited) {
            @Wo_DeleteAdminInvitation('code', $invited);
        }
        return true;
    } else {
        return false;
    }
}
function Wo_ActivateUser($email, $code) {
    global $sqlConnect;
    $email  = Wo_Secure($email);
    $code   = Wo_Secure($code);
    $query  = mysqli_query($sqlConnect, " SELECT COUNT(`user_id`)  FROM " . T_USERS . "  WHERE `email` = '{$email}' AND `email_code` = '{$code}' AND `active` = '0'");
    $result = Wo_Sql_Result($query, 0);
    if ($result == 1) {
        $query_two = mysqli_query($sqlConnect, " UPDATE " . T_USERS . "  SET `active` = '1' WHERE `email` = '{$email}' ");
        if ($query_two) {
            return true;
        }
    } else {
        return false;
    }
}
function Wo_ResetPassword($user_id, $password) {
    global $sqlConnect;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($password)) {
        return false;
    }
    $user_id  = Wo_Secure($user_id);
    $password = sha1($password);
    $query    = mysqli_query($sqlConnect, " UPDATE " . T_USERS . " SET `password` = '{$password}' WHERE `user_id` = {$user_id} ");
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetLanguages() {
    $data           = array();
    $dir            = scandir('assets/languages');
    $languages_name = array_diff($dir, array(
        ".",
        "..",
        "error_log",
        "index.html",
        ".htaccess",
        "_notes",
        "extra"
    ));
    return $languages_name;
}
function Wo_SlugPost($string) {
    $slug = url_slug($string, array(
        'delimiter' => '-',
        'limit' => 80,
        'lowercase' => true,
        'replacements' => array(
            '/\b(an)\b/i' => 'a',
            '/\b(example)\b/i' => 'Test'
        )
    ));
    return $slug . '.html';
}
function Wo_GetPostIdFromUrl($string) {
    $slug_string = '';
    $string      = Wo_Secure($string);
    if (preg_match('/[^a-z\s-]/i', $string)) {
        $string_exp  = @explode('_', $string);
        $slug_string = $string_exp[0];
    } else {
        $slug_string = $string;
    }
    return Wo_Secure($slug_string);
}
function Wo_isValidPasswordResetToken($string) {
    global $sqlConnect;
    $string_exp = explode('_', $string);
    $user_id    = Wo_Secure($string_exp[0]);
    $password   = Wo_Secure($string_exp[1]);
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if (empty($password)) {
        return false;
    }
    $query = mysqli_query($sqlConnect, " SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `user_id` = {$user_id} AND `password` = '{$password}' AND `active` = '1' ");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_DeleteUser($user_id) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        if ($wo['user']['user_id'] != $user_id) {
            return false;
        }
    }
    if (Wo_IsModerator() === true) {
        if (Wo_IsAdmin($user_id)) {
            return false;
        }
    }
    $user_data = Wo_UserData($user_id);
    $query_one_delete_photos = mysqli_query($sqlConnect, " SELECT `avatar`,`cover` FROM " . T_USERS . " WHERE `user_id` = {$user_id}");
    $fetched_data            = mysqli_fetch_assoc($query_one_delete_photos);
    if (isset($fetched_data['avatar']) && !empty($fetched_data['avatar']) && $fetched_data['avatar'] != $wo['userDefaultAvatar']) {
        $explode2 = @end(explode('.', $fetched_data['avatar']));
        $explode3 = @explode('.', $fetched_data['avatar']);
        $media_2  = $explode3[0] . '_avatar_full.' . $explode2;
        @unlink(trim($media_2));
        @unlink($fetched_data['avatar']);
        $delete_from_s3 = Wo_DeleteFromToS3($fetched_data['avatar']);
        $delete_from_s3 = Wo_DeleteFromToS3($media_2);
    }
    if (isset($fetched_data['cover']) && !empty($fetched_data['cover']) && $fetched_data['cover'] != $wo['userDefaultCover']) {
        $explode2 = @end(explode('.', $fetched_data['cover']));
        $explode3 = @explode('.', $fetched_data['cover']);
        $media_2  = $explode3[0] . '_cover_full.' . $explode2;
        @unlink(trim($media_2));
        @unlink($fetched_data['cover']);
        $delete_from_s3 = Wo_DeleteFromToS3($fetched_data['cover']);
        $delete_from_s3 = Wo_DeleteFromToS3($media_2);
    }
    $query_one_delete_media = mysqli_query($sqlConnect, " SELECT `media` FROM " . T_MESSAGES . " WHERE `from_id` = {$user_id} OR `to_id` = {$user_id}");
    if (mysqli_num_rows($query_one_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_one_delete_media)) {
            if (isset($fetched_data['media']) && !empty($fetched_data['media'])) {
                @unlink($fetched_data['media']);
            }
        }
    }
    $query_two_delete_media = mysqli_query($sqlConnect, " SELECT `postFile`,`id`,`post_id` FROM " . T_POSTS . " WHERE `user_id` = {$user_id}");
    if (mysqli_num_rows($query_two_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_two_delete_media)) {
            $query_one_reports = mysqli_query($sqlConnect, "DELETE FROM " . T_REPORTS . " WHERE `post_id` = " . $fetched_data['id']);
            $query_one_reports .= mysqli_query($sqlConnect, "DELETE FROM " . T_REPORTS . " WHERE `post_id` = " . $fetched_data['post_id']);
            if (isset($fetched_data['postFile']) && !empty($fetched_data['postFile'])) {
                @unlink($fetched_data['postFile']);
            }
        }
    }
    if ($wo['config']['cacheSystem'] == 1) {
        $cache->delete(md5($user_id) . '_U_Data.tmp');
        $query_two = mysqli_query($sqlConnect, "SELECT `id`,`post_id` FROM " . T_POSTS . " WHERE `user_id` = {$user_id} OR `recipient_id` = {$user_id}");
        if (mysqli_num_rows($query_two) > 0) {
            while ($fetched_data_two = mysqli_fetch_assoc($query_two)) {
                $cache->delete(md5($fetched_data_two['id']) . '_P_Data.tmp');
                $cache->delete(md5($fetched_data_two['post_id']) . '_P_Data.tmp');
            }
        }
    }
    $query_four_delete_media = mysqli_query($sqlConnect, "SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id}");
    if (mysqli_num_rows($query_four_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_four_delete_media)) {
            $delete_posts = Wo_DeletePage($fetched_data['page_id']);
        }
    }
    $query_five_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_GROUPS . " WHERE `user_id` = {$user_id}");
    if (mysqli_num_rows($query_five_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_five_delete_media)) {
            $delete_groups = Wo_DeleteGroup($fetched_data['id']);
        }
    }
    $query_6_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_POSTS . " WHERE `user_id` = {$user_id} OR `recipient_id` = {$user_id}");
    if (mysqli_num_rows($query_6_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_6_delete_media)) {
            $delete_posts = Wo_DeletePost($fetched_data['id']);
        }
    }
    $query_7_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_FORUM_THREADS . " WHERE `user` = {$user_id}");
    if (mysqli_num_rows($query_7_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_7_delete_media)) {
            $delete_posts = Wo_DeleteForumThread($fetched_data['id']);
        }
    }
    $query_8_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_FORUM_THREAD_REPLIES . " WHERE `poster_id` = {$user_id}");
    if (mysqli_num_rows($query_8_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_8_delete_media)) {
            $delete_posts = Wo_DeleteThreadReply($fetched_data['id']);
        }
    }
    $query_9_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_EVENTS . " WHERE `poster_id` = {$user_id}");
    if (mysqli_num_rows($query_9_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_9_delete_media)) {
            $delete_posts = Wo_DeleteEvent($fetched_data['id']);
        }
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_USERS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_RECENT_SEARCHES . " WHERE `user_id` = {$user_id} OR `search_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GAMES_PLAYERS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} OR `following_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_MESSAGES . " WHERE `from_id` = {$user_id} OR `to_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `notifier_id` = {$user_id} OR `recipient_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_REPORTS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENTS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_LIKES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_WONDERS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_REPLIES_LIKES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_REPLIES_WONDERS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_SAVED_POSTS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_LIKES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_WONDERS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENTS_REPLIES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_ACTIVITIES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGES_INVAITES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PINNED_POSTS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_VERIFICATION_REQUESTS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_A_REQUESTS . " WHERE `user_id` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_BLOCKS . " WHERE `blocker` = {$user_id} OR `blocked` = {$user_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_U_CHATS . " WHERE `conversation_user_id` = '{$user_id}' OR `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG . " WHERE `user` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM_REPLIES . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_MOVIE_COMM_REPLIES . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_MOVIE_COMMS . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREADS . " WHERE `user` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREAD_REPLIES . " WHERE `poster_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_EVENTS . " WHERE `poster_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_USER_ADS . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_USER_STORY . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_HIDDEN_POSTS . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_CHAT . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_CHAT_USERS . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGE_RATING . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_FAMILY . " WHERE `user_id` = '{$user_id}' OR `member_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_REL_SHIP . " WHERE `from_id` = '{$user_id}' OR `to_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGE_ADMINS . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_ADMINS . " WHERE `user_id` = '{$user_id}'");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_REACTIONS . " WHERE `user_id` = '{$user_id}'");
    $query_ones = mysqli_query($sqlConnect, "DELETE FROM " . T_POKES . " WHERE `received_user_id` = '{$user_id}' OR `send_user_id` = '{$user_id}'");
    $query_ones = mysqli_query($sqlConnect, "DELETE FROM " . T_USERGIFTS . " WHERE `from` = '{$user_id}' OR `to` = '{$user_id}'");
    $query_ones = mysqli_query($sqlConnect, "DELETE FROM " . T_STORY_SEEN . " WHERE `user_id` = '{$user_id}'");
    if ($query_one) {
        $send_message_data       = array(
            'from_email' => $wo['config']['siteEmail'],
            'from_name' => $wo['config']['siteName'],
            'to_email' => $user_data['email'],
            'to_name' => $user_data['name'],
            'subject' => 'Your account was deleted',
            'charSet' => 'utf-8',
            'message_body' => "Hi {$user_data['name']},<br><br> We are here to inform you that your account on {$wo['config']['siteName']} was deleted and all your data were erased.<br><br>Best regards,<br> {$wo['config']['siteName']} team.",
            'is_html' => true
        );
        $send = Wo_SendMessage($send_message_data);
        return true;
    }
}
function Wo_UpdateUserData($user_id, $update_data, $unverify = false) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $is_mod = Wo_IsModerator();
    $is_admin = Wo_IsAdmin();
    
    if ($is_admin === false && $is_mod === false) {
        if ($wo['user']['user_id'] != $user_id) {
            return false;
        }
    }
    if (isset($update_data['verified'])) {
        if (empty($update_data['pro_'])) {
            if ($is_admin === false && $is_mod === false) {
                return false;
            }
        }
    }
    if ($is_mod) {
        $user_data_ = Wo_UserData($user_id);
        if ($user_data_['admin'] == 1) {
            return false;
        }
    }
    if (!empty($update_data['relationship'])) {
        if (!array_key_exists($update_data['relationship'], $wo['relationship'])) {
            $update_data['relationship_id'] = 1;
        }
    } else if (isset($update_data['relationship'])) {
        if (!array_key_exists($update_data['relationship'], $wo['relationship'])) {
            $update_data['relationship_id'] = 0;
        }
    }
    if (isset($update_data['country_id'])) {
        if (!array_key_exists($update_data['country_id'], $wo['countries_name'])) {
            $update_data['country_id'] = 1;
        }
    }
    if (!isset($update_data['relationship_id'])) {
        $update_data['relationship_id'] = $wo['user']['relationship_id'];
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        if ($field != 'pro_') {
            $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
        }
    }
    $impload   = implode(', ', $update);
    $query_one = " UPDATE " . T_USERS . " SET {$impload} WHERE `user_id` = {$user_id} ";
    $query_two = " UPDATE " . T_USERS . " SET `verified` = '0' WHERE `user_id` = {$user_id} ";
    $query1    = mysqli_query($sqlConnect, $query_one);
    if ($unverify == true) {
        @mysqli_query($sqlConnect, $query_two);
    }
    if ($query1) {
        if (!empty($update_data['username'])) {
            Wo_UpdateUsernameInNotifications($user_id, $update_data['username']);
        }
        return true;
    } else {
        return false;
    }
}
function Wo_UpdateUsernameInNotifications($user_id = 0, $username = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($username)) {
        return false;
    }
    $query_one = "UPDATE " . T_NOTIFICATION . " SET `url` = 'index.php?link1=timeline&u={$username}' WHERE `notifier_id` = {$user_id} AND (`type` = 'following' OR `type` = 'visited_profile' OR `type` = 'accepted_request')";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
}
function addhttp($url) {
    if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "http://" . $url;
    }
    return $url;
}
function Wo_GetMedia($media) {
    global $wo;
    if (empty($media)) {
        return '';
    }
    if ($wo['config']['amazone_s3'] == 1) {
        if (empty($wo['config']['amazone_s3_key']) || empty($wo['config']['amazone_s3_s_key']) || empty($wo['config']['region']) || empty($wo['config']['bucket_name'])) {
            return $wo['config']['site_url'] . '/' . $media;
        }
        return $wo['config']['s3_site_url'] . '/' . $media;
    } else if ($wo['config']['spaces'] == 1) {
        if (empty($wo['config']['spaces_key']) || empty($wo['config']['spaces_secret']) || empty($wo['config']['space_region']) || empty($wo['config']['space_name'])) {
            return $wo['config']['site_url'] . '/' . $media;
        }
        return  'https://' . $wo['config']['space_name'] . '.' . $wo['config']['space_region'] . '.digitaloceanspaces.com/' . $media;
    } else if ($wo['config']['ftp_upload'] == 1) {
        return addhttp($wo['config']['ftp_endpoint']) . '/' . $media;
    }
    return $wo['config']['site_url'] . '/' . $media;
}
function Wo_UploadImage($file, $name, $type, $type_file, $user_id = 0, $placement = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($file) || empty($name) || empty($type) || empty($user_id)) {
        return false;
    }
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    if (!file_exists('upload/photos/' . date('Y'))) {
        mkdir('upload/photos/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/photos/' . date('Y') . '/' . date('m'))) {
        mkdir('upload/photos/' . date('Y') . '/' . date('m'), 0777, true);
    }
    $allowed           = 'jpg,png,jpeg,gif';
    $new_string        = pathinfo($name, PATHINFO_FILENAME) . '.' . strtolower(pathinfo($name, PATHINFO_EXTENSION));
    $extension_allowed = explode(',', $allowed);
    $file_extension    = pathinfo($new_string, PATHINFO_EXTENSION);
    if (!in_array($file_extension, $extension_allowed)) {
        return false;
    }
    $ar = array(
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/jpg'
    );
    if (!in_array($type_file, $ar)) {
        return false;
    }
    $dir = 'upload/photos/' . date('Y') . '/' . date('m');
    if ($placement == 'page') {
        $image_data['page_id'] = Wo_Secure($user_id);
    } else if ($placement == 'group') {
        $image_data['id'] = Wo_Secure($user_id);
    } else if ($placement == 'event') {
        $image_data['event_id'] = Wo_Secure($user_id);
    } else {
        $image_data['user_id'] = Wo_Secure($user_id);
    }
    if ($type == 'cover') {
        if ($placement == 'page') {
            $query_one_delete_cover = mysqli_query($sqlConnect, " SELECT `cover` FROM " . T_PAGES . " WHERE `page_id` = " . $image_data['page_id'] . " AND `active` = '1' ");
        } else if ($placement == 'group') {
            $query_one_delete_cover = mysqli_query($sqlConnect, " SELECT `cover` FROM " . T_GROUPS . " WHERE `id` = " . $image_data['id'] . " AND `active` = '1'");
        } else if ($placement == 'event') {
            $query_one_delete_cover = mysqli_query($sqlConnect, " SELECT `cover` FROM " . T_EVENTS . " WHERE `id` = " . $image_data['event_id']);
        } else {
            $query_one_delete_cover = mysqli_query($sqlConnect, " SELECT `cover` FROM " . T_USERS . " WHERE `user_id` = " . $image_data['user_id'] . " AND `active` = '1' ");
        }
        $fetched_data        = mysqli_fetch_assoc($query_one_delete_cover);
        $filename            = $dir . '/' . Wo_GenerateKey() . '_' . date('d') . '_' . md5(time()) . '_cover.' . $ext;
        $image_data['cover'] = $filename;
        if (move_uploaded_file($file, $filename)) {
            $update_data = false;
            if ($placement == 'page') {
                $update_data = Wo_UpdatePageData($image_data['page_id'], $image_data);
            } else if ($placement == 'group') {
                $update_data = Wo_UpdateGroupData($image_data['id'], $image_data);
            } else if ($placement == 'event') {
                $update_data = Wo_UpdateEvent($image_data['event_id'], array(
                    "cover" => $image_data['cover']
                ));
            } else {
                $update_data = Wo_UpdateUserData($image_data['user_id'], $image_data);
                if ($update_data) {
                    $last_file = $filename;
                    $explode2  = @end(explode('.', $filename));
                    $explode3  = @explode('.', $filename);
                    $last_file = $explode3[0] . '_full.' . $explode2;
                    @Wo_CompressImage($filename, $last_file, 50);
                    $upload_s3            = Wo_UploadToS3($last_file);
                    $regsiter_cover_image = Wo_RegisterPost(array(
                        'user_id' => Wo_Secure($image_data['user_id']),
                        'postFile' => Wo_Secure($last_file, 0),
                        'time' => time(),
                        'postType' => Wo_Secure('profile_cover_picture'),
                        'postPrivacy' => '2'
                    ));
                }
            }
            if ($update_data == true) {
                Wo_Resize_Crop_Image(918, 300, $filename, $filename, 80);
                $upload_s3 = Wo_UploadToS3($filename);
                return true;
            }
            return true;
        }
    } else if ($type == 'avatar') {
        $filename             = $dir . '/' . Wo_GenerateKey() . '_' . date('d') . '_' . md5(time()) . '_avatar.' . $ext;
        $image_data['avatar'] = $filename;
        $user_data            = Wo_UserData($image_data['user_id']);
        $image_data_d         = array();
        @$image_data_d['avatar'] = $user_data['avatar'];
        if (move_uploaded_file($file, $filename)) {
            if ($placement == 'page') {
                $update_data = Wo_UpdatePageData($image_data['page_id'], $image_data);
                Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $filename, $filename, $wo['profile_picture_image_quality']);
                $upload_s3 = Wo_UploadToS3($filename);
                return true;
            } else if ($placement == 'group') {
                $update_data = Wo_UpdateGroupData($image_data['id'], $image_data);
                Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $filename, $filename, $wo['profile_picture_image_quality']);
                $upload_s3 = Wo_UploadToS3($filename);
                return true;
            } else if ($placement == 'app') {
                $update_data = Wo_UpdateAppImage($user_id, $filename);
                Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $filename, $filename, $wo['profile_picture_image_quality']);
                $upload_s3 = Wo_UploadToS3($filename);
                return true;
            } else {
                $image_data['startup_image'] = 1;
                if (Wo_UpdateUserData($image_data['user_id'], $image_data)) {
                    $explode2  = @end(explode('.', $filename));
                    $explode3  = @explode('.', $filename);
                    $last_file = $explode3[0] . '_full.' . $explode2;
                    $compress  = Wo_CompressImage($filename, $last_file, 50);
                    if ($compress) {
                        $upload_s3      = Wo_UploadToS3($last_file);
                        $regsiter_image = Wo_RegisterPost(array(
                            'user_id' => Wo_Secure($image_data['user_id']),
                            'postFile' => Wo_Secure($last_file, 0),
                            'time' => time(),
                            'postType' => Wo_Secure('profile_picture'),
                            'postPrivacy' => '2'
                        ));
                        Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $filename, $filename, $wo['profile_picture_image_quality']);
                        $upload_s3 = Wo_UploadToS3($filename);
                    } else {
                        Wo_UpdateUserData($image_data['user_id'], $image_data_d);
                    }
                    return true;
                }
            }
        }
    } else if ($type == 'background_image') {
        $query_one_delete_background_image = mysqli_query($sqlConnect, " SELECT `background_image` FROM " . T_USERS . " WHERE `user_id` = " . $image_data['user_id'] . " AND `active` = '1' ");
        $fetched_data                      = mysqli_fetch_assoc($query_one_delete_background_image);
        $filename                          = $dir . '/' . Wo_GenerateKey() . '_' . date('d') . '_' . md5(time()) . '_background_image.' . $ext;
        $image_data['background_image']    = $filename;
        if (move_uploaded_file($file, $filename)) {
            $upload_s3 = Wo_UploadToS3($filename);
            if (isset($fetched_data['background_image']) && !empty($fetched_data['background_image'])) {
                @unlink($fetched_data['background_image']);
            }
            if (Wo_UpdateUserData($image_data['user_id'], $image_data)) {
                return true;
            }
        }
    } else if ($type == 'page_background_image') {
        $query_one_delete_background_image = mysqli_query($sqlConnect, " SELECT `background_image` FROM " . T_PAGES . " WHERE `page_id` = " . $image_data['page_id'] . " AND `active` = '1' ");
        $fetched_data                      = mysqli_fetch_assoc($query_one_delete_background_image);
        $filename                          = $dir . '/' . Wo_GenerateKey() . '_' . date('d') . '_' . md5(time()) . '_background_image.' . $ext;
        $image_data['background_image']    = $filename;
        if (move_uploaded_file($file, $filename)) {
            $upload_s3 = Wo_UploadToS3($filename);
            if (isset($fetched_data['background_image']) && !empty($fetched_data['background_image'])) {
                @unlink($fetched_data['background_image']);
            }
            if (Wo_UpdatePageData($image_data['page_id'], $image_data)) {
                return true;
            }
        }
    }
}
function Wo_UserBirthday($birthday) {
    global $wo;
    if (empty($birthday)) {
        return false;
    }
    $birthday = Wo_Secure($birthday);
    if ($wo['config']['age'] == 0) {
        $age = date_diff(date_create($birthday), date_create('today'))->y;
    } else {
        $age_style = explode('-', $birthday);
        $age       = $age_style[1] . '/' . $age_style[2] . '/' . $age_style[0];
    }
    return $age;
}
function Wo_GetAllUsers($limit = '', $type = '', $filter = array(), $after = '') {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE `type` = 'user'";
    if (isset($filter) AND !empty($filter)) {
        if (!empty($filter['query'])) {
            $query_one .= " AND ((`email` LIKE '%" . Wo_Secure($filter['query']) . "%') OR (`username` LIKE '%" . Wo_Secure($filter['query']) . "%') OR CONCAT( `first_name`,  ' ', `last_name` ) LIKE  '%" . Wo_Secure($filter['query']) . "%')";
        }
        if (isset($filter['source']) && $filter['source'] != 'all') {
            $query_one .= " AND `src` = '" . Wo_Secure($filter['source']) . "'";
        }
        if (isset($filter['status']) && $filter['status'] != 'all') {
            $query_one .= " AND `active` = '" . Wo_Secure($filter['status']) . "'";
        }
    }
    if (!empty($after) && is_numeric($after) && $after > 0) {
        $query_one .= " AND `user_id` < " . Wo_Secure($after);
    }
    if ($type == 'sidebar') {
        $query_one .= " ORDER BY RAND()";
    } else {
        $query_one .= " ORDER BY `user_id` DESC";
    }
    if (isset($limit) and !empty($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $user_data        = Wo_UserData($fetched_data['user_id']);
        $user_data['src'] = ($user_data['src'] == 'site') ? $wo['config']['siteName'] : $user_data['src'];
        ;
        $data[] = $user_data;
    }
    return $data;
}
function Wo_GetAllUsersByType($type = 'all') {
    global $sqlConnect;
    $data      = array();
    $query_one = " SELECT `user_id` FROM " . T_USERS;
    if ($type == 'active') {
        $query_one .= " WHERE `active` = '1'";
    } else if ($type == 'inactive') {
        $query_one .= " WHERE `active` = '0' OR `active` = '2'";
    } else if ($type == 'all') {
        $query_one .= "";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetFollowingSug($limit, $query) {
    global $wo, $sqlConnect;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($query)) {
        return false;
    }
    $query_one_search = " WHERE ((`username` LIKE '%" . Wo_Secure($query) . "%') OR CONCAT( `first_name`,  ' ', `last_name` ) LIKE  '%" . Wo_Secure($query) . "%')";
    $user_id          = Wo_Secure($wo['user']['user_id']);
    $query_one        = "SELECT `user_id` FROM " . T_USERS;
    $query_one .= $query_one_search;
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query_one .= " AND (`user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') AND (`user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `active` = '1') OR `user_id` IN (SELECT `follower_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` <> {$user_id} AND `following_id` = {$user_id} AND `active` = '1'))) AND `active` = '1'";
    $query_one .= " LIMIT {$limit}";
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $user_data           = Wo_UserData($fetched_data['user_id']);
        $html_fi['username'] = $user_data['username'];
        $html_fi['label']    = $user_data['name'];
        $html_fi['img']      = $user_data['avatar'];
        $data[]              = $html_fi;
    }
    if (empty($data)) {
        $sql = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " {$query_one_search} AND `user_id` <> {$user_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') LIMIT {$limit}");
        while ($fetched_data = mysqli_fetch_assoc($sql)) {
            $user_data           = Wo_UserData($fetched_data['user_id']);
            $html_fi['username'] = $user_data['username'];
            $html_fi['label']    = $user_data['name'];
            $html_fi['img']      = $user_data['avatar'];
            $data[]              = $html_fi;
        }
    }
    return $data;
}
function Wo_GetHashtagSug($limit, $query) {
    global $wo, $sqlConnect;
    $data      = array();
    $html_fi   = array();
    $query_one = "SELECT * FROM " . T_HASHTAGS . " WHERE `tag` LIKE '%{$query}%' ORDER BY `trend_use_num` DESC";
    $query_one .= " LIMIT {$limit}";
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $html_fi['username'] = $fetched_data['tag'];
        $html_fi['label']    = $fetched_data['tag'];
        $data[]              = $html_fi;
    }
    return $data;
}
function Wo_WelcomeUsers($limit = '', $type = '') {
    global $wo, $sqlConnect;
    if (empty($limit)) {
        $limit = 12;
    }
    $data      = array();
    $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1' AND `avatar` <> '" . Wo_Secure($wo['userDefaultAvatar']) . "' ORDER BY RAND() LIMIT {$limit}";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_FeaturedUsers($limit = '', $type = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data           = array();
    $logged_user_id = $wo['user']['user_id'];
    $query_one      = " SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') AND `is_pro` = '1' ORDER BY RAND() LIMIT {$limit}";
    $sql            = mysqli_query($sqlConnect, $query_one);
    $mysql_count    = mysqli_num_rows($sql);
    if ($mysql_count > 7) {
        $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') AND `is_pro` = '1' ORDER BY RAND() LIMIT {$limit}";
        $sql       = mysqli_query($sqlConnect, $query_one);
        while ($fetched_data = mysqli_fetch_assoc($sql)) {
            $data[] = Wo_UserData($fetched_data['user_id']);
        }
    } else {
        while ($fetched_data = mysqli_fetch_assoc($sql)) {
            $data[] = Wo_UserData($fetched_data['user_id']);
        }
    }
    return $data;
}
function Wo_UserSug($limit = 20) {
    global $wo, $sqlConnect;
    if (!is_numeric($limit)) {
        return false;
    }
    $data      = array();
    $user_id   = Wo_Secure($wo['user']['user_id']);
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
function Wo_ImportImageFromLogin($media, $amazon = 0) {
    global $wo;
    if (!file_exists('upload/photos/' . date('Y'))) {
        mkdir('upload/photos/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/photos/' . date('Y') . '/' . date('m'))) {
        mkdir('upload/photos/' . date('Y') . '/' . date('m'), 0777, true);
    }
    $dir               = 'upload/photos/' . date('Y') . '/' . date('m');
    $file_dir          = $dir . '/' . Wo_GenerateKey() . '_avatar.jpg';
    $getImage          = fetchDataFromURL($media);
    if (!empty($getImage)) {
        $importImage = file_put_contents($file_dir, $getImage);
        if ($importImage) {
            Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $file_dir, $file_dir, 100);
        }
    }
    if (file_exists($file_dir)) {
        $upload_s3 = Wo_UploadToS3($file_dir, array(
            'amazon' => $amazon
        ));
        return $file_dir;
    } else {
        return false;
    }
}
function Wo_ImportImageFromFile($media, $custom_name = '_url_image') {
    global $wo;
    if (empty($media)) {
        return false;
    }
    if (!file_exists('upload/photos/' . date('Y'))) {
        mkdir('upload/photos/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/photos/' . date('Y') . '/' . date('m'))) {
        mkdir('upload/photos/' . date('Y') . '/' . date('m'), 0777, true);
    }
    $extension = 0; //image_type_to_extension($size[2]);
    if (empty($extension)) {
        $extension = '.jpg';
    }
    $dir               = 'upload/photos/' . date('Y') . '/' . date('m');
    $file_dir          = $dir . '/' . Wo_GenerateKey() . $custom_name . $extension;
    $fileget           = file_get_contents($media);
    if (!empty($fileget)) {
        $importImage = @file_put_contents($file_dir, $fileget);
    }
    if (file_exists($file_dir)) {
        $upload_s3 = Wo_UploadToS3($file_dir);
        $check_image = getimagesize($file_dir);
        if (!$check_image) {
            unlink($file_dir);
        }
        return $file_dir;
    } else {
        return false;
    }
}
function Wo_ImportImageFromUrl($media, $custom_name = '_url_image') {
    global $wo;
    if (empty($media)) {
        return false;
    }
    if (!file_exists('upload/photos/' . date('Y'))) {
        mkdir('upload/photos/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/photos/' . date('Y') . '/' . date('m'))) {
        mkdir('upload/photos/' . date('Y') . '/' . date('m'), 0777, true);
    }
    //$size      = getimagesize($media);
    $extension = 0; //image_type_to_extension($size[2]);
    if (empty($extension)) {
        $extension = '.jpg';
    }
    $dir               = 'upload/photos/' . date('Y') . '/' . date('m');
    $file_dir          = $dir . '/' . Wo_GenerateKey() . $custom_name . $extension;
    $fileget           = fetchDataFromURL($media);
    if (!empty($fileget)) {
        $importImage = @file_put_contents($file_dir, $fileget);
    }
    if (file_exists($file_dir)) {
        $upload_s3 = Wo_UploadToS3($file_dir);
        $check_image = getimagesize($file_dir);
        if (!$check_image) {
            unlink($file_dir);
        }
        return $file_dir;
    } else {
        return false;
    }
}
function Wo_IsFollowing($following_id, $user_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($following_id) || !is_numeric($following_id) || $following_id < 0) {
        return false;
    }
    if ((empty($user_id) || !is_numeric($user_id) || $user_id < 0)) {
        $user_id = $wo['user']['user_id'];
    }
    $following_id = Wo_Secure($following_id);
    $user_id      = Wo_Secure($user_id);
    $query        = mysqli_query($sqlConnect, " SELECT COUNT(`id`) FROM " . T_FOLLOWERS . " WHERE `following_id` = {$following_id} AND `follower_id` = {$user_id} AND `active` = '1' ");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_RegisterFollow($following_id = 0, $followers_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($following_id) or empty($following_id) or !is_numeric($following_id) or $following_id < 1) {
        return false;
    }
    if (!is_array($followers_id)) {
        $followers_id = array($followers_id);
    }
    foreach ($followers_id as $follower_id) {
        if (!isset($follower_id) or empty($follower_id) or !is_numeric($follower_id) or $follower_id < 1) {
            continue;
        }
        if (Wo_IsBlocked($following_id)) {
            continue;
        }
        $following_id = Wo_Secure($following_id);
        $follower_id  = Wo_Secure($follower_id);
        $active       = 1;
        if (Wo_IsFollowing($following_id, $follower_id) === true) {
            continue;
        }
        $follower_data  = Wo_UserData($follower_id);
        $following_data = Wo_UserData($following_id);
        if (empty($follower_data['user_id']) || empty($following_data['user_id'])) {
            continue;
        }
        if ($following_data['confirm_followers'] == 1) {
            $active = 0;
        }
        if ($wo['config']['connectivitySystem'] == 1) {
            $active = 0;
        }
        $query = mysqli_query($sqlConnect, " INSERT INTO " . T_FOLLOWERS . " (`following_id`,`follower_id`,`active`) VALUES ({$following_id},{$follower_id},'{$active}')");
        if ($query) {
            if ($active == 1) {
                $notification_data = array(
                    'recipient_id' => $following_id,
                    'notifier_id' => $follower_id,
                    'type' => 'following',
                    'url' => 'index.php?link1=timeline&u=' . $follower_data['username']
                );
                Wo_RegisterNotification($notification_data);
                $activity_data = array(
                    'user_id' => $follower_id,
                    'follow_id' => $following_id,
                    'activity_type' => 'following'
                );
                $add_activity  = Wo_RegisterActivity($activity_data);
            }
        }
    }
    return true;
}
function Wo_CountFollowRequests($data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $get     = array();
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (empty($data['account_id']) || $data['account_id'] == 0) {
        $data['account_id'] = $user_id;
        $account            = $wo['user'];
    }
    if (!is_numeric($data['account_id']) || $data['account_id'] < 1) {
        return false;
    }
    if ($data['account_id'] != $user_id) {
        $data['account_id'] = Wo_Secure($data['account_id']);
        $account            = Wo_UserData($data['account_id']);
    }
    $query_one = " SELECT COUNT(`id`) AS `FollowRequests` FROM " . T_FOLLOWERS . " WHERE `active` = '0' AND `following_id` =  " . $account['user_id'] . " AND `follower_id` IN (SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1')";
    if (isset($data['unread']) && $data['unread'] == true) {
        $query_one .= " AND `seen` = 0";
    }
    $query_one .= " ORDER BY `id` DESC";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
    return $sql_fetch_one['FollowRequests'];
}
function Wo_IsFollowRequested($following_id = 0, $follower_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($following_id) or empty($following_id) or !is_numeric($following_id) or $following_id < 1) {
        return false;
    }
    if ((!isset($follower_id) or empty($follower_id) or !is_numeric($follower_id) or $follower_id < 1)) {
        $follower_id = $wo['user']['user_id'];
    }
    if (!is_numeric($follower_id) or $follower_id < 1) {
        return false;
    }
    $following_id = Wo_Secure($following_id);
    $follower_id  = Wo_Secure($follower_id);
    $query        = "SELECT `id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$follower_id} AND `following_id` = {$following_id} AND `active` = '0'";
    $sql_query    = mysqli_query($sqlConnect, $query);
    if (mysqli_num_rows($sql_query) > 0) {
        return true;
    }
}
function Wo_DeleteFollow($following_id = 0, $follower_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($following_id) or empty($following_id) or !is_numeric($following_id) or $following_id < 1) {
        return false;
    }
    if (!isset($follower_id) or empty($follower_id) or !is_numeric($follower_id) or $follower_id < 1) {
        return false;
    }
    $following_id = Wo_Secure($following_id);
    $follower_id  = Wo_Secure($follower_id);
    if (Wo_IsFollowing($following_id, $follower_id) === false && Wo_IsFollowRequested($following_id, $follower_id) === false) {
        return false;
    } else {
        $query = mysqli_query($sqlConnect, " DELETE FROM " . T_FOLLOWERS . " WHERE `following_id` = {$following_id} AND `follower_id` = {$follower_id}");
        if ($wo['config']['connectivitySystem'] == 1) {
            $query_two     = "DELETE FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$following_id} AND `following_id` = {$follower_id}";
            $sql_query_two = mysqli_query($sqlConnect, $query_two);
            Wo_DeleteSelectedActivity($follower_id, 'friend', $following_id);
            Wo_DeleteSelectedActivity($following_id, 'friend', $follower_id);
        } else {
            Wo_DeleteSelectedActivity($follower_id, 'following', $following_id);
        }
        if ($query) {

            return true;
        }
    }
}

function Wo_CountMutualFriends($user_id, $active = true) {
    global $wo, $sqlConnect;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id    = Wo_Secure($user_id);
    $sub_sql    = '';
    if ($active === true) {
        $sub_sql = "AND `active` = '1'";
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    
    $query_text = "SELECT f1.following_id
FROM " . T_FOLLOWERS . " f1 INNER JOIN " . T_FOLLOWERS . " f2
  ON f1.following_id = f2.following_id
WHERE f1.follower_id = {$user_id}
  AND f2.follower_id = {$logged_user_id} AND f1.`following_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND f1.`following_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') AND f1.active = 1 GROUP BY following_id";

    $query        = mysqli_query($sqlConnect, $query_text);
    $fetched_data = mysqli_num_rows($query);
    return $fetched_data;
}

function Wo_CountFollowing($user_id,$active = true) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id    = Wo_Secure($user_id);
    $sub_sql    = '';
    if ($active === true) {
        $sub_sql = "AND `active` = '1'";
    }
    $query_text = "SELECT COUNT(`user_id`) AS count FROM " . T_USERS . " WHERE `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} {$sub_sql}) {$sub_sql}";
    if ($wo['loggedin'] == true) {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
        $query_text .= " AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}')";
    }

    $query        = mysqli_query($sqlConnect, $query_text);
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_AcceptFollowRequest($following_id = 0, $follower_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($following_id) or empty($following_id) or !is_numeric($following_id) or $following_id < 1) {
        return false;
    }
    if (!isset($follower_id) or empty($follower_id) or !is_numeric($follower_id) or $follower_id < 1) {
        return false;
    }
    $following_id = Wo_Secure($following_id);
    $follower_id  = Wo_Secure($follower_id);
    if (Wo_IsFollowRequested($following_id, $follower_id) === false) {
        return false;
    }
    $follower_data = Wo_UserData($follower_id);
    if (empty($follower_data['user_id'])) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "UPDATE " . T_FOLLOWERS . " SET `active` = '1' WHERE `following_id` = {$follower_id} AND `follower_id` = {$following_id} AND `active` = '0'");
    if ($wo['config']['connectivitySystem'] == 1) {
        $query_two = mysqli_query($sqlConnect, "INSERT INTO " . T_FOLLOWERS . " (`following_id`,`follower_id`,`active`) VALUES ({$following_id},{$follower_id},'1') ");
    }
    if ($query) {
        $notification_data = array(
            'recipient_id' => $following_id,
            'type' => 'accepted_request',
            'url' => 'index.php?link1=timeline&u=' . $follower_data['username']
        );
        $activity_data = array(
            'user_id' => $follower_id,
            'follow_id' => $following_id,
            'activity_type' => 'friend'
        );
        $add_activity  = Wo_RegisterActivity($activity_data);
        $activity_data = array(
            'user_id' => $following_id,
            'follow_id' => $follower_id,
            'activity_type' => 'friend'
        );
        $add_activity  = Wo_RegisterActivity($activity_data);
        if (Wo_RegisterNotification($notification_data) === true) {
            return true;
        } else {
            return false;
        }
    }
}
function Wo_DeleteFollowRequest($following_id, $follower_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($following_id) or empty($following_id) or !is_numeric($following_id) or $following_id < 1) {
        return false;
    }
    if (!isset($follower_id) or empty($follower_id) or !is_numeric($follower_id) or $follower_id < 1) {
        return false;
    }
    $following_id = Wo_Secure($following_id);
    $follower_id  = Wo_Secure($follower_id);
    if (Wo_IsFollowRequested($following_id, $follower_id) === false) {
        return false;
    } else {
        $query = mysqli_query($sqlConnect, " DELETE FROM " . T_FOLLOWERS . " WHERE `following_id` = {$follower_id} AND `follower_id` = {$following_id} ");
        if ($query) {
            return true;
        }
    }
}
function Wo_GetFollowRequests($user_id = 0, $search_query = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data = array();
    if (empty($user_id) or $user_id == 0) {
        $user_id = $wo['user']['user_id'];
    }
    if (!is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $query   = "SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `follower_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` <> {$user_id} AND `following_id` = {$user_id} AND `active` = '0') AND `active` = '1' ";
    if (!empty($search_query)) {
        $search_query = Wo_Secure($search_query);
        $query .= " AND `name` LIKE '%$search_query%'";
    }
    $query .= " ORDER BY `user_id` DESC";
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($sql_fetch = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_UserData($sql_fetch['user_id']);
    }
    return $data;
}
function Wo_CountFollowers($user_id) {
    global $wo, $sqlConnect;
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $data       = array();
    $user_id    = Wo_Secure($user_id);
    $query_text = " SELECT COUNT(`user_id`) AS count FROM " . T_USERS . " WHERE `user_id` IN (SELECT `follower_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` <> {$user_id} AND `following_id` = {$user_id} AND `active` = '1') AND `active` = '1'";
    if ($wo['loggedin'] == true) {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
        $query_text .= " AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}')";
    }
    $query        = mysqli_query($sqlConnect, $query_text);
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_SearchFollowers($user_id, $filter = '', $limit = 10, $event_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    if (empty($event_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $filter  = Wo_Secure($filter);
    ;
    $query = " SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `follower_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` <> {$user_id} AND `following_id` = {$user_id} AND `active` = '1') AND `active` = '1'";
    if (!empty($filter)) {
        $query .= " AND (`username` LIKE '%$filter%' OR `first_name` LIKE '%$filter%' OR `last_name` LIKE '%$filter%')";
    }
    $query .= " AND `user_id` NOT IN (SELECT `invited_id` FROM " . T_EVENTS_INV . " WHERE `inviter_id` = '$user_id') ";
    $query .= " AND `user_id` NOT IN (SELECT `user_id` FROM " . T_EVENTS_GOING . " WHERE `event_id` = '$event_id') ";
    $query .= " AND `user_id` NOT IN (SELECT `poster_id` FROM " . T_EVENTS . " WHERE `id` = '$event_id') ";
    $query .= " LIMIT {$limit} ";
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetFollowing($user_id, $type = '', $limit = '', $after_user_id = '', $placement = array()) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id       = Wo_Secure($user_id);
    $after_user_id = Wo_Secure($after_user_id);
    $query         = "SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `active` = '1') AND `active` = '1' ";
    if (!empty($after_user_id) && is_numeric($after_user_id)) {
        $query .= " AND `user_id` < {$after_user_id}";
    }
    if ($wo['loggedin'] == true) {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
        $query .= " AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}')";
    }
    if ($type == 'sidebar' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY RAND() LIMIT {$limit}";
    }
    if ($type == 'profile' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY `user_id` DESC LIMIT {$limit}";
    }
    if (!empty($placement)) {
        if ($placement['in'] == 'profile_sidebar' && is_array($placement['following_data'])) {
            foreach ($placement['following_data'] as $key => $id) {
                $user_data   = Wo_UserData($id, false);
                if (!empty($user_data)) {
                    $data[]  = $user_data;
                }
            }
            return $data;
        }
    }
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $user_data                  = Wo_UserData($fetched_data['user_id'], false);
        $user_data['family_member'] = Wo_GetFamalyMember($fetched_data['user_id'], $wo['user']['id']);
        $data[]                     = $user_data;
    }
    return $data;
}
function Wo_GetMutualFriends($user_id, $type = '', $limit = '', $after_user_id = '', $placement = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id       = Wo_Secure($user_id);
    $after_user_id = Wo_Secure($after_user_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query = "SELECT f1.*
FROM " . T_FOLLOWERS . " f1 INNER JOIN " . T_FOLLOWERS . " f2
  ON f1.following_id = f2.following_id
WHERE f1.follower_id = {$user_id}
  AND f2.follower_id = {$logged_user_id} AND f1.`following_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND f1.`following_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') AND f1.active = 1 GROUP BY following_id ";

    if (!empty($after_user_id) && is_numeric($after_user_id)) {
        $query .= " AND f1.id < {$after_user_id}";
    }
    if ($type == 'sidebar' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY RAND()";
    }
    if ($type == 'profile' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY f1.id DESC";
    }
    $query .= " LIMIT {$limit} ";
    if (!empty($placement)) {
        if ($placement['in'] == 'profile_sidebar' && is_array($placement['mutual_friends_data'])) {
            foreach ($placement['mutual_friends_data'] as $key => $id) {
                $user_data   = Wo_UserData($id, false);
                if (!empty($user_data)) {
                    $data[]  = $user_data;
                }
            }
            return $data;
        }
    }
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $user_data                  = Wo_UserData($fetched_data['following_id'], false);
        $data[]                     = $user_data;
    }
    return $data;
}
function Wo_GetFollowers($user_id, $type = '', $limit = '', $after_user_id = '', $placement = array()) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id       = Wo_Secure($user_id);
    $after_user_id = Wo_Secure($after_user_id);
    $query         = " SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `follower_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` <> {$user_id} AND `following_id` = {$user_id} AND `active` = '1') AND `active` = '1'";
    if (!empty($after_user_id) && is_numeric($after_user_id)) {
        $query .= " AND `user_id` < {$after_user_id}";
    }
    if ($wo['loggedin'] == true) {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
        $query .= " AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}')";
    }
    if ($type == 'sidebar' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY RAND()";
    }
    if ($type == 'profile' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY `user_id` DESC";
    }
    $query .= " LIMIT {$limit} ";
    if (!empty($placement)) {
        if ($placement['in'] == 'profile_sidebar' && is_array($placement['followers_data'])) {
            foreach ($placement['followers_data'] as $key => $id) {
                $user_data   = Wo_UserData($id, false);
                if (!empty($user_data)) {
                    $data[]  = $user_data;
                }
            }
            return $data;
        }
    }
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $user_data                  = Wo_UserData($fetched_data['user_id'], false);
        $user_data['family_member'] = Wo_GetFamalyMember($fetched_data['user_id'], $wo['user']['id']);
        $data[]                     = $user_data;
    }
    return $data;
}
function Wo_GetFollowButton($user_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!is_numeric($user_id) or $user_id < 0) {
        return false;
    }
    if ($user_id == $wo['user']['user_id']) {
        return false;
    }
    $account = $wo['follow'] = Wo_UserData($user_id);
    if (!isset($wo['follow']['user_id'])) {
        return false;
    }
    $user_id           = Wo_Secure($user_id);
    $logged_user_id    = Wo_Secure($wo['user']['user_id']);
    $follow_button     = 'buttons/follow';
    $unfollow_button   = 'buttons/unfollow';
    $add_frined_button = 'buttons/add-friend';
    $unfrined_button   = 'buttons/unfriend';
    $accept_button     = 'buttons/accept-request';
    $request_button    = 'buttons/requested';
    if (Wo_IsFollowing($user_id, $logged_user_id)) {
        if ($wo['config']['connectivitySystem'] == 1) {
            return Wo_LoadPage($unfrined_button);
        } else {
            return Wo_LoadPage($unfollow_button);
        }
    } else {
        if (Wo_IsFollowRequested($user_id, $logged_user_id)) {
            return Wo_LoadPage($request_button);
        } else if (Wo_IsFollowRequested($logged_user_id, $user_id)) {
            return Wo_LoadPage($accept_button);
        } else {
            if ($account['follow_privacy'] == 1) {
                if (Wo_IsFollowing($logged_user_id, $user_id)) {
                    if ($wo['config']['connectivitySystem'] == 1) {
                        return Wo_LoadPage($add_frined_button);
                    } else {
                        return Wo_LoadPage($follow_button);
                    }
                }
            } else if ($account['follow_privacy'] == 0) {
                if ($wo['config']['connectivitySystem'] == 1) {
                    return Wo_LoadPage($add_frined_button);
                } else {
                    return Wo_LoadPage($follow_button);
                }
            }
        }
    }
}

function Wo_RegisterNotification($data = array()) {
    global $wo, $sqlConnect;
    
    if (empty($data['session_id'])) {
        if ($wo['loggedin'] == false) {
            return false;
        }
    }
    if (!isset($data['recipient_id']) or empty($data['recipient_id']) or !is_numeric($data['recipient_id']) or $data['recipient_id'] < 1) {
        return false;
    }
    if (Wo_IsBlocked($data['recipient_id'])) {
        return false;
    }
    if (!isset($data['post_id']) or empty($data['post_id'])) {
        $data['post_id'] = 0;
    }
    if (!is_numeric($data['post_id']) or $data['recipient_id'] < 0) {
        return false;
    }
    if (empty($data['notifier_id']) or $data['notifier_id'] == 0) {
        $data['notifier_id'] = Wo_Secure($wo['user']['user_id']);
    }
    if (!is_numeric($data['notifier_id']) or $data['notifier_id'] < 1) {
        return false;
    }
    if ($data['notifier_id'] == $wo['user']['user_id']) {
        $notifier = $wo['user'];
    } 
    else {
        $data['notifier_id'] = Wo_Secure($data['notifier_id']);
        $notifier            = Wo_UserData($data['notifier_id']);
        if (!isset($notifier['user_id'])) {
            return false;
        }
    }
    if (!isset($data['comment_id']) or empty($data['comment_id'])) {
        $data['comment_id'] = 0;
    }else{
        $data['comment_id']      = Wo_Secure($data['comment_id']);
    }
    if (!isset($data['reply_id']) or empty($data['reply_id'])) {
        $data['reply_id'] = 0;
    }else{
        $data['reply_id']      = Wo_Secure($data['reply_id']);
    }
    if ($notifier['user_id'] != $wo['user']['user_id']) {
        return false;
    }
    if ($data['recipient_id'] == $data['notifier_id']) {
        return false;
    }
    if (!isset($data['text'])) {
        $data['text'] = '';
    }
    if (!isset($data['type']) or empty($data['type'])) {
        return false;
    }
    if (!isset($data['url']) and empty($data['url']) and !isset($data['full_link']) and empty($data['full_link'])) {
        return false;
    }
    $recipient = Wo_UserData($data['recipient_id']);
    if (!isset($recipient['user_id'])) {
        return false;
    }

    $url                  = $data['url'];
    $recipient['user_id'] = Wo_Secure($recipient['user_id']);
    $data['post_id']      = Wo_Secure($data['post_id']);
    $data['type']         = Wo_Secure($data['type']);
    if (!empty($data['type2'])) {
        $data['type2'] = Wo_Secure($data['type2']);
    } else {
        $data['type2'] = '';
    }
    if ($data['text'] != strip_tags($data['text'])) {
        $data['text'] = '';
    }
    $data['text']            = Wo_Secure($data['text']);
    $notifier['user_id']     = Wo_Secure($notifier['user_id']);
    $page_notifcation_query  = '';
    $page_notifcation_query2 = '';

    $send_notification = true;
    
    if (!empty($recipient['notification_settings'])) {
        $recipient['notification_settings'] = unserialize(html_entity_decode($recipient['notification_settings']));
    } else {
        $recipient['notification_settings'] = array();
    }
    if (($data['type'] == 'liked_post' || $data['type'] == 'reaction') && $recipient['notification_settings']['e_liked'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'share_post' && $recipient['notification_settings']['e_shared'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'comment' && $recipient['notification_settings']['e_commented'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'following' && $recipient['notification_settings']['e_followed'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'wondered_post' && $recipient['notification_settings']['e_wondered']!= 1) {
        $send_notification = false;
    }
    if (($data['type'] == 'comment_mention' || $data['type'] == 'post_mention') && $recipient['notification_settings']['e_mentioned'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'accepted_request' && $recipient['notification_settings']['e_accepted'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'visited_profile' && $recipient['notification_settings']['e_visited'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'joined_group' && $recipient['notification_settings']['e_joined_group'] != 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'liked_page' && $recipient['notification_settings']['e_liked_page'] =! 1) {
        $send_notification = false;
    }
    if ($data['type'] == 'profile_wall_post' && $recipient['notification_settings']['e_profile_wall_post']!= 1) {
        $send_notification = false;
    }
    if ($send_notification == false) {
        return false;
    }
    if (!empty($data['page_id']) && $data['page_id'] > 0) {
        $page = Wo_PageData($data['page_id']);
        if (!isset($page['page_id'])) {
            return false;
        }
        $page_id = Wo_Secure($page['page_id']);
        if (isset($data['page_enable'])) {
            if ($data['page_enable'] !== false) {
                $notifier['user_id'] = 0;
            }
        } else {
            $notifier['user_id'] = 0;
        }
        $page_notifcation_query  = '`page_id`,';
        $page_notifcation_query2 = "{$page_id}, ";
    }
    $group_notifcation_query  = '';
    $group_notifcation_query2 = '';
    if (!empty($data['group_id']) && $data['group_id'] > 0) {
        $group = Wo_GroupData($data['group_id']);
        if (!isset($group['id'])) {
        }
        $group_id                 = Wo_Secure($group['id']);
        $group_notifcation_query  = '`group_id`,';
        $group_notifcation_query2 = "{$group_id}, ";
    }
    $event_notifcation_query  = '';
    $event_notifcation_query2 = '';
    if (!empty($data['event_id']) && $data['event_id'] > 0) {
        $event                    = Wo_EventData($data['event_id']);
        $event_id                 = Wo_Secure($event['id']);
        $event_notifcation_query  = '`event_id`,';
        $event_notifcation_query2 = "{$event_id}, ";
    }
    $thread_notifcation_query  = '';
    $thread_notifcation_query2 = '';
    if (!empty($data['thread_id']) && $data['thread_id'] > 0) {
        $thread_id                 = Wo_Secure($data['thread_id']);
        $thread_notifcation_query  = '`thread_id`,';
        $thread_notifcation_query2 = "{$thread_id}, ";
    }

    $story_notifcation_query  = '';
    $story_notifcation_query2 = '';
    if (!empty($data['story_id']) && $data['story_id'] > 0) {
        $story_id                 = Wo_Secure($data['story_id']);
        $story_notifcation_query  = '`story_id`,';
        $story_notifcation_query2 = "{$story_id}, ";
    }

    $blog_notifcation_query  = '';
    $blog_notifcation_query2 = '';
    if (!empty($data['blog_id']) && $data['blog_id'] > 0) {
        $blog_id                 = Wo_Secure($data['blog_id']);
        $blog_notifcation_query  = '`blog_id`,';
        $blog_notifcation_query2 = "{$blog_id}, ";
    }

    $query_one     = " SELECT `id` FROM " . T_NOTIFICATION . " WHERE `recipient_id` = " . $recipient['user_id'] . " AND `post_id` = " . $data['post_id'] . " AND `type` = '" . $data['type'] . "'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) > 0) {
        if ($data['type'] != "following" ) {
            if ( $data['type'] != "reaction" ) {
                $query_two     = " DELETE FROM " . T_NOTIFICATION . " WHERE `recipient_id` = " . $recipient['user_id'] . " AND `post_id` = " . $data['post_id'] . " AND `type` = '" . $data['type'] . "'";
                $sql_query_two = mysqli_query($sqlConnect, $query_two);
            }
        }
    }
    if (!isset($data['undo']) or $data['undo'] != true) {
        $query_three     = "INSERT INTO " . T_NOTIFICATION . " (`recipient_id`, `notifier_id`, {$page_notifcation_query} {$group_notifcation_query} {$story_notifcation_query} {$blog_notifcation_query} {$event_notifcation_query} {$thread_notifcation_query} `post_id`, `comment_id`, `reply_id`, `type`, `type2`, `text`, `url`, `time`) VALUES (" . $recipient['user_id'] . "," . $notifier['user_id'] . ",{$page_notifcation_query2} {$group_notifcation_query2} {$story_notifcation_query2} {$blog_notifcation_query2} {$event_notifcation_query2} {$thread_notifcation_query2} " . $data['post_id'] . ",'" . $data['comment_id'] . "','" . $data['reply_id'] . "','" . $data['type'] . "','" . $data['type2'] . "','" . $data['text'] . "','{$url}'," . time() . ")";
        $sql_query_three = mysqli_query($sqlConnect, $query_three);

        $post_data = array();
        $admin_ids = array();

        if (!empty($data['post_id'])) {
            $post_data = Wo_PostData($data['post_id']);
        }
        
        $my_id = $wo['user']['user_id'];
        if (!empty($post_data['page_id'])) {
            $admin_post_id = $post_data['id'];
            $admins = Wo_GetPageAdmins($post_data['page_id'], 'user_id');
            if (!empty($admins)) {
                foreach ($admins as $admin) {
                    if ($admin['user_id'] != $wo['user']['user_id']) {
                        $admin_id = $admin['user_id'];
                        $admin_ids[] = "('$admin_id', '$my_id', '$admin_post_id','" . $data['comment_id'] . "','" . $data['reply_id'] . "','" . $data['type'] . "','" . $data['type2'] . "','" . $data['text'] . "','{$url}'," . time() . ")";
                    }
                }
            }
        }
        if (!empty($admin_ids)) {
            $implode_query = implode(',', $admin_ids);
            $query_admins = "INSERT INTO " . T_NOTIFICATION . " (`recipient_id`, `notifier_id`, `post_id`, `comment_id`, `reply_id`, `type`, `type2`, `text`, `url`, `time`) VALUES ";
            $sql_query_three = mysqli_query($sqlConnect, $query_admins . $implode_query);
        }
        
        if ($sql_query_three) {
            if ($wo['config']['emailNotification'] == 1 && $recipient['emailNotification'] == 1) {
                $send_mail = false;
                if (($data['type'] == 'liked_post' || $data['type'] == 'reaction') && $recipient['e_liked'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'share_post' && $recipient['e_shared'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'comment' && $recipient['e_commented'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'following' && $recipient['e_followed'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'wondered_post' && $recipient['e_wondered'] == 1) {
                    $send_mail = true;
                }
                if (($data['type'] == 'comment_mention' || $data['type'] == 'post_mention') && $recipient['e_mentioned'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'accepted_request' && $recipient['e_accepted'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'visited_profile' && $recipient['e_visited'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'joined_group' && $recipient['e_joined_group'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'liked_page' && $recipient['e_liked_page'] == 1) {
                    $send_mail = true;
                }
                if ($data['type'] == 'profile_wall_post' && $recipient['e_profile_wall_post'] == 1) {
                    $send_mail = true;
                }
                if ($send_mail == true) {
                    $post_data_id      = $post_data;
                    $post_data['text'] = '';
                    if (!empty($post_data_id['postText'])) {
                        $post_data['text'] = substr($post_data_id['postText'], 0, 20);
                    }
                    $data['notifier']        = $notifier;
                    $data['url']             = Wo_SeoLink($url);
                    $data['post_data']       = $post_data;
                    $wo['emailNotification'] = $data;
                    $send_message_data       = array(
                        'from_email' => $wo['config']['siteEmail'],
                        'from_name' => $wo['config']['siteName'],
                        'to_email' => $recipient['email'],
                        'to_name' => $recipient['name'],
                        'subject' => 'New notification',
                        'charSet' => 'utf-8',
                        'message_body' => Wo_LoadPage('emails/notifiction-email'),
                        'is_html' => true
                    );
                    if ($wo['config']['smtp_or_mail'] == 'smtp') {
                        $send_message_data['insert_database'] = 1;
                    }
                    $send = Wo_SendMessage($send_message_data);

                }
            }
            if ($wo['config']['push_notifications'] == 1) {
                Wo_NotificationWebPushNotifier();
            }
            return true;
        }
    }
}
function Wo_GetNotifications($data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $get = array();
    if (!isset($data['account_id']) or empty($data['account_id'])) {
        $data['account_id'] = $wo['user']['user_id'];
    }
    if (!is_numeric($data['account_id']) or $data['account_id'] < 1) {
        return false;
    }
    if ($data['account_id'] == $wo['user']['user_id']) {
        $account = $wo['user'];
    } else {
        $data['account_id'] = $data['account_id'];
        $account            = Wo_UserData($data['account_id']);
    }
    if ($account['user_id'] != $wo['user']['user_id']) {
        return false;
    }
    if (empty($data['limit'])) {
        $data['limit'] = 15;
    }
    $new_notif = Wo_CountNotifications(array(
        'unread' => true
    ));
    if ($new_notif > 0) {
        $query_4 = '';
        if (isset($data['type_2']) && !empty($data['type_2'])) {
            if ($data['type_2'] == 'popunder') {
                $timepopunder = time() - 60;
                $query_4      = ' AND `seen_pop` = 0 AND `time` >= ' . $timepopunder;
            }
        }
        $query_one = " SELECT * FROM " . T_NOTIFICATION . " WHERE `recipient_id` = " . $account['user_id'] . " AND `seen` = 0 {$query_4} ORDER BY `id` DESC";
    } else {
        $query_one = " SELECT * FROM " . T_NOTIFICATION . " WHERE `recipient_id` = " . $account['user_id'];
        if (isset($data['unread']) && $data['unread'] == true) {
            $query_one .= " AND `seen` = 0";
        }
        if (isset($data['type_2']) && !empty($data['type_2'])) {
            if ($data['type_2'] == 'popunder') {
                $timepopunder = time() - 60;
                $query_one .= ' AND `seen_pop` = 0 AND `time` >= ' . $timepopunder;
            }
        }
        if (isset($data['remove_notification']) && !empty($data['remove_notification'])) {
            foreach ($data['remove_notification'] as $key => $remove_notification) {
                $query_one .= ' AND `type` <> "$remove_notification"';
            }
        }
        $query_one .= " ORDER BY `id` DESC LIMIT " . $data['limit'];
    }
    if (isset($data['all']) && $data['all'] == true) {
        $query_one = "SELECT * FROM " . T_NOTIFICATION . " WHERE `recipient_id` = " . $account['user_id'] . " AND `seen` = 0 ORDER BY `id` DESC LIMIT 20";
    }
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) > 0) {
        while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
            if (!empty($sql_fetch_one['page_id']) && empty($sql_fetch_one['notifier_id'])) {
                $sql_fetch_one['notifier']        = Wo_PageData($sql_fetch_one['page_id']);
                $sql_fetch_one['notifier']['url'] = Wo_SeoLink('index.php?link1=timeline&u=' . $sql_fetch_one['notifier']['page_name']);
            } else {
                $sql_fetch_one['notifier']        = Wo_UserData($sql_fetch_one['notifier_id']);
                $sql_fetch_one['notifier']['url'] = Wo_SeoLink('index.php?link1=timeline&u=' . $sql_fetch_one['notifier']['username']);
            }
            $cutted_url                = substr($sql_fetch_one['url'], 9);
            $sql_fetch_one['url']      = Wo_SeoLink($sql_fetch_one['url']);
            $sql_fetch_one['ajax_url'] = $cutted_url;
            $get[]                     = $sql_fetch_one;
        }
    }
    mysqli_multi_query($sqlConnect, " DELETE FROM " . T_NOTIFICATION . " WHERE `time` < " . (time() - (60 * 60 * 24 * 5)) . " AND `seen` <> 0");
    return $get;
}
function Wo_CountNotifications($data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $get = array();
    if (empty($data['account_id']) or $data['account_id'] == 0) {
        $data['account_id'] = Wo_Secure($wo['user']['user_id']);
        $account            = $wo['user'];
    }
    if (!is_numeric($data['account_id']) or $data['account_id'] < 1) {
        return false;
    }
    if ($data['account_id'] != $wo['user']['user_id']) {
        $data['account_id'] = Wo_Secure($data['account_id']);
        $account            = Wo_UserData($data['account_id']);
    }
    $query_one = " SELECT COUNT(`id`) AS `notifications` FROM " . T_NOTIFICATION . " WHERE `recipient_id` = " . $account['user_id'];
    if (isset($data['unread']) && $data['unread'] == true) {
        $query_one .= " AND `seen` = 0";
    }
    if (isset($data['remove_notification']) && !empty($data['remove_notification'])) {
        foreach ($data['remove_notification'] as $key => $remove_notification) {
            $query_one .= ' AND `type` <> "$remove_notification"';
        }
    }
    $query_one .= " ORDER BY `id` DESC";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
    return $sql_fetch_one['notifications'];
}
function Wo_GetSearch($search_qeury) {
    global $sqlConnect, $wo;
    $search_qeury = Wo_Secure($search_qeury);
    $data         = array();
    $query_text   = "SELECT `user_id` FROM " . T_USERS . " WHERE ((`username` LIKE '%$search_qeury%') OR CONCAT( `first_name`,  ' ', `last_name` ) LIKE '%$search_qeury%') AND `active` = '1'";
    if ($wo['loggedin'] == true) {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
        $query_text .= " AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}')";
    }
    $query_text .= " LIMIT 3";
    $query = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    $query = mysqli_query($sqlConnect, " SELECT `page_id` FROM " . T_PAGES . " WHERE ((`page_name` LIKE '%$search_qeury%') OR `page_title` LIKE '%$search_qeury%') AND `active` = '1' LIMIT 3");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_PageData($fetched_data['page_id']);
    }
    $query = mysqli_query($sqlConnect, " SELECT `id` FROM " . T_GROUPS . " WHERE ((`group_name` LIKE '%$search_qeury%') OR `group_title` LIKE '%$search_qeury%') AND `active` = '1' LIMIT 3");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_GroupData($fetched_data['id']);
    }
    return $data;
}
function Wo_GetRecentSerachs() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $data    = array();
    $query   = mysqli_query($sqlConnect, "SELECT `search_id`,`search_type` FROM " . T_RECENT_SEARCHES . " WHERE `user_id` = {$user_id} AND `search_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `search_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') ORDER BY `id` DESC LIMIT 10");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        if ($fetched_data['search_type'] == 'user') {
            $fetched_data_2 = Wo_UserData($fetched_data['search_id']);
        } else if ($fetched_data['search_type'] == 'page') {
            $fetched_data_2 = Wo_PageData($fetched_data['search_id']);
        } else if ($fetched_data['search_type'] == 'group') {
            $fetched_data_2 = Wo_GroupData($fetched_data['search_id']);
        } else {
            return false;
        }
        $data[] = $fetched_data_2;
    }
    return $data;
}
function Wo_GetSearchFilter($result, $limit = 30, $offset = 0) {
    global $wo, $sqlConnect,$db;
    $data = array();
    $profiledata = array();
    $time = time() - 60;
    if (empty($result)) {
        return array();
    }

    $custom_query = '';

    $profile_search_sql = "AND (SELECT COUNT(*) FROM ".T_USERS_FIELDS." WHERE ";
    $profile_search = array();
    foreach( $_GET as $key => $val ){
        if( substr( $key, 0, 4 ) == 'fid_' && !empty( $val ) ){
            $profile_search[ $key ] = Wo_Secure( $val );
            $custom_type = $db->where('name',substr( $key, 4))->getOne(T_FIELDS);
            if ($custom_type->type == 'textbox' || $custom_type->type == 'textarea') {
                $profile_search_sql .= "`" . Wo_Secure( $key ) . "` LIKE '%" . Wo_Secure( $val ) . "%' AND";
            }
            else{
                $profile_search_sql .= "`" . Wo_Secure( $key ) . "` = '" . Wo_Secure( $val ) . "' AND";
            }
        }
    }
    if( substr( $profile_search_sql, -3 ) == "AND" ){
        $profile_search_sql = substr( $profile_search_sql, 0, -3 );
    }
    if( !empty( $profile_search ) ){
        $custom_query = $profile_search_sql.' AND '.T_USERS.'.user_id = user_id) > 0 ';
    }

    $query = '';
    if (!empty($result['query'])) {
        $query = Wo_Secure($result['query']);
    }
    if (!empty($result['country'])) {
        $country = Wo_Secure($result['country']);
    }
    if (!empty($result['status'])) {
        $result['status'] = Wo_Secure($result['status']);
    }
    if (!empty($result['verified'])) {
        $result['verified'] = Wo_Secure($result['verified']);
    }

    if (!empty($result['filterbyage']) && $result['filterbyage'] == 'yes') {
        if (!empty($result['age_from'])) {
            $result['age_from'] = Wo_Secure($result['age_from']);
        }
        if (!empty($result['age_to'])) {
            $result['age_to'] = Wo_Secure($result['age_to']);
        }
    }


    if (!empty($result['image'])) {
        $result['image'] = Wo_Secure($result['image']);
    }
    $query = " SELECT `user_id` FROM " . T_USERS . " WHERE (`username` LIKE '%{$query}%' OR CONCAT( `first_name`,  ' ', `last_name` ) LIKE  '%{$query}%') {$custom_query}";
    if ($wo['loggedin'] == true) {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
        $query .= " AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}')";
    }
    if (!empty($result['gender'])) {
        if ($result['gender'] == 'male') {
            $query .= " AND (`gender` = 'male') ";
        } else if ($result['gender'] == 'female') {
            $query .= " AND (`gender` = 'female') ";
        }
    }
    if (!empty($result['country'])) {
        if ($result['country'] != 'all') {
            $query .= " AND (`country_id` = '{$country}')";
        }
    }
    if (isset($result['verified'])) {
        if ($result['verified'] == 'on') {
            $query .= " AND (`verified` = 1 ) ";
        } else if ($result['verified'] == 'off') {
            $query .= " AND (`verified` = 0 ) ";
        }
    }
    if (isset($result['status'])) {
        if ($result['status'] == 'on') {
            $query .= " AND (`lastseen` >= {$time}) ";
        } else if ($result['status'] == 'off') {
            $query .= " AND (`lastseen` <= {$time}) ";
        }
    }

    if (!empty($result['filterbyage']) && $result['filterbyage'] == 'yes') {
        if (!empty($result['age_from']) && $result['age_from'] > 0 ) {
            $query .= " AND TIMESTAMPDIFF(YEAR, `birthday`, CURDATE()) > ". $result['age_from'] ." AND TIMESTAMPDIFF(YEAR, `birthday`, CURDATE()) < ". $result['age_to']." ";
        }
    }

    if (isset($result['image'])) {
        $result['image'] = Wo_Secure($result['image']);
        $d_image         = Wo_Secure($wo['userDefaultAvatar']);
        if ($result['image'] == 'yes') {
            $query .= " AND (`avatar` <> '{$d_image}') ";
        } else if ($result['image'] == 'no') {
            $query .= " AND (`avatar` = '{$d_image}') ";
        }
    }
    if ($wo['loggedin'] == true || !empty($result['user_id'])) {
        if (!empty($result['user_id'])) {
            $user_id = Wo_Secure($result['user_id']);
        } else {
            $user_id = Wo_Secure($wo['user']['user_id']);
        }
        $query .= " AND `user_id` <> {$user_id}";
    }
    $query .= " AND `active` = '1' ";

    if ($offset > 0) {
        $query .= " AND `user_id` < {$offset} AND `user_id` <> {$offset}";
    }
    if (!empty($limit)) {
        $limit = Wo_Secure($limit);
        $query .= " ORDER BY `user_id` DESC LIMIT {$limit}";
    }
    $sql_query_one = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[$fetched_data['user_id']] = Wo_UserData($fetched_data['user_id']);
    }

    // if( !empty( $profile_search ) ){
    //     $profile_sql_query_one = mysqli_query($sqlConnect, $profile_search_sql);
    //     while ($profile_fetched_data = mysqli_fetch_assoc($profile_sql_query_one)) {
    //         $data[$fetched_data['user_id']] = Wo_UserData($profile_fetched_data['user_id']);
    //     }
    // }


    return $data;
}
function Wo_GetMessagesUsers($user_id, $searchQuery = '', $limit = 50, $new = false, $update = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if (!isset($user_id)) {
        $user_id = $wo['user']['user_id'];
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
function Wo_GetMessages($data = array(), $limit = 50) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $message_data   = array();
    $user_id        = Wo_Secure($data['user_id']);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
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
        $query_one .= " ORDER BY `id` ASC LIMIT {$query_limit_from}, 50";
    }
    $query = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['messageUser'] = Wo_UserData($fetched_data['from_id']);
        $fetched_data['text']        = Wo_Markup($fetched_data['text']);
        $fetched_data['text']        = Wo_Emo($fetched_data['text']);
        $fetched_data['onwer']       = ($fetched_data['messageUser']['user_id'] == $wo['user']['user_id']) ? 1 : 0;
        if (!empty($fetched_data['stickers']) && !Wo_IsUrl($fetched_data['stickers'])) {
            $fetched_data['stickers'] = Wo_GetMedia($fetched_data['stickers']);
        }
        $message_data[]              = $fetched_data;
        if ($fetched_data['messageUser']['user_id'] == $user_id && $fetched_data['seen'] == 0) {
            mysqli_query($sqlConnect, " UPDATE " . T_MESSAGES . " SET `seen` = " . time() . " WHERE `id` = " . $fetched_data['id']);
        }
    }
    return $message_data;
}
function Wo_GetGroupMessages($args = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options        = array(
        "id" => false,
        "offset" => 0,
        "group_id" => false,
        "limit" => 50,
        "old" => false,
        "new" => false
    );
    $args           = array_merge($options, $args);
    $offset         = Wo_Secure($args['offset']);
    $id             = Wo_Secure($args['id']);
    $group_id       = Wo_Secure($args['group_id']);
    $limit          = Wo_Secure($args['limit']);
    $new            = Wo_Secure($args['new']);
    $old            = Wo_Secure($args['old']);
    $query_one      = '';
    $data           = array();
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $message_data   = array();
    if (empty($group_id) || !is_numeric($group_id) || $group_id < 0) {
        return false;
    }
    if ($id && is_numeric($id) && $id > 0) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($new && $offset && $offset > 0 && !$old) {
        $query_one .= " AND `id` > {$offset} AND `id` <> {$offset} ";
    }
    if ($old && $offset && $offset > 0 && !$new) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    $query_one        = " SELECT * FROM " . T_MESSAGES . " WHERE `group_id` = '$group_id' {$query_one} ";
    $sql_query_one    = mysqli_query($sqlConnect, $query_one);
    $query_limit_from = mysqli_num_rows($sql_query_one) - 50;
    if ($query_limit_from < 1) {
        $query_limit_from = 0;
    }
    if (isset($limit)) {
        $query_one .= " ORDER BY `id` ASC LIMIT {$query_limit_from}, 50";
    }
    $query = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['from_id']);
        $fetched_data['text']      = Wo_Markup($fetched_data['text']);
        $fetched_data['text']      = Wo_Emo($fetched_data['text']);
        $fetched_data['onwer']     = ($fetched_data['user_data']['user_id'] == $wo['user']['user_id']) ? 1 : 0;
        $message_data[]            = $fetched_data;
    }
    return $message_data;
}
function Wo_GetMessagesHeader($data = array()) {
    global $wo, $sqlConnect;
    if (empty($data['session_id'])) {
        if ($wo['loggedin'] == false) {
            return false;
        }
    }
    $message_data = array();
    $user_id      = Wo_Secure($data['user_id']);
    if (!empty($data['session_id'])) {
        $logged_user_id = Wo_GetUserFromSessionID($data['session_id'], $data['platform']);
        if (empty($logged_user_id)) {
            return false;
        }
    } else {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
    }
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
    $query_one .= " ORDER BY `id` DESC LIMIT 1";
    $query        = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($query);
    if (!isset($data['user_data'])) {
        $fetched_data['messageUser'] = Wo_UserData($fetched_data['from_id']);
        $fetched_data['onwer']       = ($fetched_data['messageUser']['user_id'] == $logged_user_id) ? 1 : 0;
    }
    if (!empty($fetched_data['text'])) {
        $fetched_data['text'] = Wo_EditMarkup($fetched_data['text']);
    }
    return $fetched_data;
}
function Wo_RegisterMessage($ms_data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($ms_data)) {
        return false;
    }
    if (empty($ms_data['to_id']) || !is_numeric($ms_data['to_id']) || $ms_data['to_id'] < 0) {
        return false;
    }
    if (empty($ms_data['from_id']) || !is_numeric($ms_data['from_id']) || $ms_data['from_id'] < 0) {
        return false;
    }
    if ($ms_data['to_id'] == $ms_data['from_id']) {
        return false;
    }
    if (!isset($ms_data['stickers'])) {
        if (empty($ms_data['text']) || !isset($ms_data['text']) || strlen($ms_data['text']) < 0) {
            if (empty($ms_data['media']) || !isset($ms_data['media']) || strlen($ms_data['media']) < 0) {
                return false;
            }
        }
    }
    $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
    $i          = 0;
    preg_match_all($link_regex, $ms_data['text'], $matches);
    foreach ($matches[0] as $match) {
        $match_url       = strip_tags($match);
        $syntax          = '[a]' . urlencode($match_url) . '[/a]';
        $ms_data['text'] = str_replace($match, $syntax, $ms_data['text']);
    }
    $mention_regex = '/@([A-Za-z0-9_]+)/i';
    preg_match_all($mention_regex, $ms_data['text'], $matches);
    foreach ($matches[1] as $match) {
        $match         = Wo_Secure($match);
        $match_user    = Wo_UserData(Wo_UserIdFromUsername($match));
        $match_search  = '@' . $match;
        $match_replace = '@[' . $match_user['user_id'] . ']';
        if (isset($match_user['user_id'])) {
            $ms_data['text'] = str_replace($match_search, $match_replace, $ms_data['text']);
            $mentions[]      = $match_user['user_id'];
        }
    }
    $hashtag_regex = '/#([^`~!@$%^&*\#()\-+=\\|\/\.,<>?\'\":;{}\[\]* ]+)/i';
    preg_match_all($hashtag_regex, $ms_data['text'], $matches);
    foreach ($matches[1] as $match) {
        if (!is_numeric($match)) {
            $hashdata = Wo_GetHashtag($match);
            if (is_array($hashdata)) {
                $match_search  = '#' . $match;
                $match_replace = '#[' . $hashdata['id'] . ']';
                if (mb_detect_encoding($match_search, 'ASCII', true)) {
                    $ms_data['text'] = preg_replace("/$match_search\b/i", $match_replace, $ms_data['text']);
                } else {
                    $ms_data['text'] = str_replace($match_search, $match_replace, $ms_data['text']);
                }
                //$ms_data['text']      = preg_replace("/$match_search\b/i", $match_replace,  $ms_data['text']);
                $hashtag_query = " UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
            }
        }
    }
    $fields = '`' . implode('`, `', array_keys($ms_data)) . '`';
    $data   = '\'' . implode('\', \'', $ms_data) . '\'';
    $query  = mysqli_query($sqlConnect, " INSERT INTO " . T_MESSAGES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        $message_id = mysqli_insert_id($sqlConnect);
        if (!empty($ms_data['from_id'])) {
            $from_id = $ms_data['from_id'];
        }
        $update_user_chats = Wo_CreateUserChat($ms_data['to_id'], $from_id);
        return $message_id;
    } else {
        return false;
    }
}
function Wo_RegisterGroupMessage($ms_data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($ms_data)) {
        return false;
    }
    if (empty($ms_data['group_id']) || !is_numeric($ms_data['group_id']) || $ms_data['group_id'] < 0) {
        return false;
    }
    if (empty($ms_data['from_id']) || !is_numeric($ms_data['from_id']) || $ms_data['from_id'] < 0) {
        return false;
    }
    if (empty($ms_data['text']) || !isset($ms_data['text']) || strlen($ms_data['text']) < 0) {
        if (empty($ms_data['media']) || !isset($ms_data['media']) || strlen($ms_data['media']) < 0) {
            return false;
        }
    }
    $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
    $i          = 0;
    preg_match_all($link_regex, $ms_data['text'], $matches);
    foreach ($matches[0] as $match) {
        $match_url       = strip_tags($match);
        $syntax          = '[a]' . urlencode($match_url) . '[/a]';
        $ms_data['text'] = str_replace($match, $syntax, $ms_data['text']);
    }
    $mention_regex = '/@([A-Za-z0-9_]+)/i';
    preg_match_all($mention_regex, $ms_data['text'], $matches);
    foreach ($matches[1] as $match) {
        $match         = Wo_Secure($match);
        $match_user    = Wo_UserData(Wo_UserIdFromUsername($match));
        $match_search  = '@' . $match;
        $match_replace = '@[' . $match_user['user_id'] . ']';
        if (isset($match_user['user_id'])) {
            $ms_data['text'] = str_replace($match_search, $match_replace, $ms_data['text']);
            $mentions[]      = $match_user['user_id'];
        }
    }
    $hashtag_regex = '/#([^`~!@$%^&*\#()\-+=\\|\/\.,<>?\'\":;{}\[\]* ]+)/i';
    preg_match_all($hashtag_regex, $ms_data['text'], $matches);
    foreach ($matches[1] as $match) {
        if (!is_numeric($match)) {
            $hashdata = Wo_GetHashtag($match);
            if (is_array($hashdata)) {
                $match_search  = '#' . $match;
                $match_replace = '#[' . $hashdata['id'] . ']';
                if (mb_detect_encoding($match_search, 'ASCII', true)) {
                    $ms_data['text'] = preg_replace("/$match_search\b/i", $match_replace, $ms_data['text']);
                } else {
                    $ms_data['text'] = str_replace($match_search, $match_replace, $ms_data['text']);
                }
                $hashtag_query = " UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
            }
        }
    }
    $fields = '`' . implode('`, `', array_keys($ms_data)) . '`';
    $data   = '\'' . implode('\', \'', $ms_data) . '\'';
    $query  = mysqli_query($sqlConnect, " INSERT INTO " . T_MESSAGES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        $message_id = mysqli_insert_id($sqlConnect);
        return $message_id;
    } else {
        return false;
    }
}
function Wo_CreateUserChat($user_id = 0, $from_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id)) {
        return false;
    }
    if (!empty($from_id)) {
        $logged_user_id = $from_id;
    } else {
        $logged_user_id = Wo_Secure($wo['user']['user_id']);
    }
    $user_id         = Wo_Secure($user_id);
    $time            = time();
    $query_one       = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_U_CHATS . " WHERE `conversation_user_id` = '$user_id' AND `user_id` = '$logged_user_id'");
    $query_one_fetch = mysqli_fetch_assoc($query_one);
    if ($query_one_fetch['count'] > 0) {
        $query_two        = mysqli_query($sqlConnect, "UPDATE " . T_U_CHATS . " SET `time` = '$time' WHERE `conversation_user_id` = '$user_id' AND `user_id` = '$logged_user_id'");
        $query_two        = mysqli_query($sqlConnect, "UPDATE " . T_U_CHATS . " SET `time` = '$time' WHERE `conversation_user_id` = '$logged_user_id' AND `user_id` = '$user_id'");
        $query_five       = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_U_CHATS . " WHERE `user_id` = '$user_id' AND `conversation_user_id` = '$logged_user_id'");
        $query_five_fetch = mysqli_fetch_assoc($query_five);
        if ($query_five_fetch['count'] == 0) {
            $query_three = mysqli_query($sqlConnect, "INSERT INTO " . T_U_CHATS . " (`user_id`, `conversation_user_id`, `time`) VALUES ('$user_id', '$logged_user_id', '$time')");
        }
        if ($query_two) {
            return true;
        }
    } else {
        $query_two = mysqli_query($sqlConnect, "INSERT INTO " . T_U_CHATS . " (`user_id`, `conversation_user_id`, `time`) VALUES ('$logged_user_id', '$user_id', '$time')");
        if ($query_two) {
            $query_one__       = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_U_CHATS . " WHERE `conversation_user_id` = '$logged_user_id' AND `user_id` = '$user_id'");
            $query_one_fetch__ = mysqli_fetch_assoc($query_one__);
            if ($query_one_fetch__['count'] == 0) {
                $query_three = mysqli_query($sqlConnect, "INSERT INTO " . T_U_CHATS . " (`user_id`, `conversation_user_id`, `time`) VALUES ('$user_id', '$logged_user_id', '$time')");
            }
            return true;
        }
    }
}
function Wo_DeleteConversation($user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $user_data = Wo_UserData($user_id);
    if (empty($user_data)) {
        return false;
    }
    $my_id         = $wo['user']['user_id'];
    $query_one     = "SELECT id FROM " . T_MESSAGES . " WHERE (`from_id` = {$user_id} AND `to_id` = '{$my_id}') OR (`from_id` = {$my_id} AND `to_id` = '{$user_id}')";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
        $deleteMessage = Wo_DeleteMessage($sql_fetch_one['id'], '', $my_id);
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_U_CHATS . " WHERE `conversation_user_id` = '$user_id' AND `user_id` = '$my_id'");
    if ($query_one) {
        return true;
    }
}
function Wo_DeleteGroupConversation($id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 0) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $user_data = Wo_UserData($user_id);
    if (empty($user_data)) {
        return false;
    }
    $my_id         = $wo['user']['user_id'];
    $query_one     = "SELECT id FROM " . T_MESSAGES . " WHERE (`from_id` = {$user_id} AND `to_id` = '{$my_id}') OR (`from_id` = {$my_id} AND `to_id` = '{$user_id}')";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
        $deleteMessage = Wo_DeleteMessage($sql_fetch_one['id'], '', $deleter_id);
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_U_CHATS . " WHERE `conversation_user_id` = '$user_id' AND `user_id` = '$my_id'");
    if ($query_one) {
        return true;
    }
}
function Wo_DeleteMessage($message_id, $media = '', $deleter_id = 0) {
    global $wo, $sqlConnect;
    if (empty($deleter_id)) {
        if ($wo['loggedin'] == false) {
            return false;
        }
    }
    if (empty($message_id) || !is_numeric($message_id) || $message_id < 0) {
        return false;
    }
    $user_id = $deleter_id;
    if (empty($user_id) && $wo['loggedin'] == true) {
        $user_id = $wo['user']['user_id'];
    }
    $message_id    = Wo_Secure($message_id);
    $query_one     = "SELECT * FROM " . T_MESSAGES . " WHERE `id` = {$message_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        if ($sql_fetch_one['to_id'] != $user_id && $sql_fetch_one['from_id'] != $user_id) {
            return false;
        }
        if ($sql_fetch_one['deleted_one'] == 1 || $sql_fetch_one['deleted_two'] == 1) {
            $query = mysqli_query($sqlConnect, "DELETE FROM " . T_MESSAGES . " WHERE `id` = {$message_id}");
            if ($query) {
                if (isset($sql_fetch_one['media']) AND !empty($sql_fetch_one['media'])) {
                    @unlink($sql_fetch_one['media']);
                    $delete_from_s3 = Wo_DeleteFromToS3($sql_fetch_one['media']);
                }
                return true;
            } else {
                return false;
            }
        } else {
            $delete_type = 'deleted_one';
            if ($sql_fetch_one['to_id'] == $user_id) {
                $delete_type = 'deleted_two';
            }
            $query = mysqli_query($sqlConnect, "UPDATE " . T_MESSAGES . " set `$delete_type` = '1' WHERE `id` = {$message_id}");
            if ($query) {
                return true;
            }
        }
        return false;
    }
}
function Wo_CountMessages($data = array(), $type = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($data['user_id']) or $data['user_id'] == 0) {
        $data['user_id'] = $wo['user']['user_id'];
    }
    if (!is_numeric($data['user_id']) or $data['user_id'] < 1) {
        return false;
    }
    $data['user_id'] = Wo_Secure($data['user_id']);
    if ($type == 'interval') {
        $account = $wo['user'];
    } else {
        $account = Wo_UserData($data['user_id']);
    }
    if (empty($account['user_id'])) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    if (isset($data['user_id']) && is_numeric($data['user_id']) && $data['user_id'] > 0) {
        $user_id = Wo_Secure($data['user_id']);
        if (isset($data['new']) && $data['new'] == true) {
            $query = " SELECT COUNT(`id`) AS `messages` FROM " . T_MESSAGES . " WHERE `to_id` = {$logged_user_id} AND (`from_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `from_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}'))";
            if ($wo['user']['user_id'] != $user_id) {
                $query .= " AND `from_id` = {$user_id}";
            }
        } else {
            $query = "SELECT COUNT(`id`) AS `messages` FROM " . T_MESSAGES . " WHERE ((`from_id` = {$user_id} AND `to_id` = {$logged_user_id} AND `deleted_two` = '0') OR (`from_id` = {$logged_user_id} AND `to_id` = {$user_id} AND `deleted_one` = '0') AND (`from_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `from_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}')))";
        }
    } else {
        $query = " SELECT COUNT(`from_id`) AS `messages` FROM " . T_MESSAGES . " WHERE `to_id` = {$logged_user_id} AND (`from_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `from_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}'))";
    }
    if (isset($data['new']) && $data['new'] == true) {
        $query .= " AND `seen` = 0";
    }
    $sql_query = mysqli_query($sqlConnect, $query);
    $sql_fetch = mysqli_fetch_assoc($sql_query);
    return $sql_fetch['messages'];
}
function Wo_SeenMessage($message_id) {
    global $sqlConnect;
    $message_id   = Wo_Secure($message_id);
    $query        = mysqli_query($sqlConnect, " SELECT `seen` FROM " . T_MESSAGES . " WHERE `id` = {$message_id}");
    $fetched_data = mysqli_fetch_assoc($query);
    if ($fetched_data['seen'] > 0) {
        $data         = array();
        $data['time'] = date('c', $fetched_data['seen']);
        $data['seen'] = Wo_Time_Elapsed_String($fetched_data['seen']);
        return $data;
    } else {
        return false;
    }
}
function Wo_GetMessageButton($user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!is_numeric($user_id) or $user_id < 0) {
        return false;
    }
    if ($user_id == $wo['user']['user_id']) {
        return false;
    }
    $user_id        = Wo_Secure($user_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $message_button = 'buttons/message';
    $account        = $wo['message'] = Wo_UserData($user_id);
    if (!isset($account['user_id'])) {
        return false;
    }
    if ($account['message_privacy'] == 1) {
        if (Wo_IsFollowing($logged_user_id, $user_id) === true) {
            return Wo_LoadPage($message_button);
        }
    } else if ($account['message_privacy'] == 0) {
        return Wo_LoadPage($message_button);
    }
}
function Wo_MarkupAPI($text, $link = true, $hashtag = true, $mention = true) {
    if ($link == true) {
        $link_search = '/\[a\](.*?)\[\/a\]/i';
        if (preg_match_all($link_search, $text, $matches)) {
            foreach ($matches[1] as $match) {
                $match_decode     = urldecode($match);
                $match_decode_url = $match_decode;
                $count_url        = mb_strlen($match_decode);
                if ($count_url > 50) {
                    $match_decode_url = mb_substr($match_decode_url, 0, 30) . '....' . mb_substr($match_decode_url, 30, 20);
                }
                $match_url = $match_decode;
                if (!preg_match("/http(|s)\:\/\//", $match_decode)) {
                    $match_url = 'http://' . $match_url;
                }
                $text = str_replace('[a]' . $match . '[/a]', '<span onclick="InjectAPI(\'{&quot;type&quot; : &quot;url&quot;, &quot;link&quot;:&quot;' . strip_tags($match_url) . '&quot;}\');" class="hash" rel="nofollow">' . $match_decode_url . '</span>', $text);
            }
        }
    }
    if ($hashtag == true) {
        $hashtag_regex = '/(#\[([0-9]+)\])/i';
        preg_match_all($hashtag_regex, $text, $matches);
        $match_i = 0;
        foreach ($matches[1] as $match) {
            $hashtag  = $matches[1][$match_i];
            $hashkey  = $matches[2][$match_i];
            $hashdata = Wo_GetHashtag($hashkey);
            if (is_array($hashdata)) {
                $hashlink = '<span class="hash" onclick="InjectAPI(\'{&quot;type&quot; : &quot;hashtag&quot;, &quot;tag&quot;:&quot;' . $hashdata['tag'] . '&quot;}\');">#' . $hashdata['tag'] . '</span>';
                $text     = str_replace($hashtag, $hashlink, $text);
            }
            $match_i++;
        }
    }
    if ($mention == true) {
        $mention_regex = '/@\[([0-9]+)\]/i';
        if (preg_match_all($mention_regex, $text, $matches)) {
            foreach ($matches[1] as $match) {
                $match         = Wo_Secure($match);
                $match_user    = Wo_UserData($match);
                $match_search  = '@[' . $match . ']';
                $match_replace = '<span class="hash" onclick="InjectAPI(\'{&quot;type&quot; : &quot;mention&quot;, &quot;user_id&quot;:&quot;' . $match_user['user_id'] . '&quot;}\');">' . $match_user['name'] . '</span>';
                if (isset($match_user['user_id'])) {
                    $text = str_replace($match_search, $match_replace, $text);
                }
            }
        }
    }
    return $text;
}
function Wo_Markup($text, $link = true, $hashtag = true, $mention = true) {
    if ($link == true) {
        $link_search = '/\[a\](.*?)\[\/a\]/i';
        if (preg_match_all($link_search, $text, $matches)) {
            foreach ($matches[1] as $match) {
                $match_decode     = urldecode($match);
                $match_decode_url = $match_decode;
                $count_url        = mb_strlen($match_decode);
                if ($count_url > 50) {
                    $match_decode_url = mb_substr($match_decode_url, 0, 30) . '....' . mb_substr($match_decode_url, 30, 20);
                }
                $match_url = $match_decode;
                if (!preg_match("/http(|s)\:\/\//", $match_decode)) {
                    $match_url = 'http://' . $match_url;
                }
                $text = str_replace('[a]' . $match . '[/a]', '<a href="' . strip_tags($match_url) . '" target="_blank" class="hash" rel="nofollow">' . $match_decode_url . '</a>', $text);
            }
        }
    }
    if ($hashtag == true) {
        $hashtag_regex = '/(#\[([0-9]+)\])/i';
        preg_match_all($hashtag_regex, $text, $matches);
        $match_i = 0;
        foreach ($matches[1] as $match) {
            $hashtag  = $matches[1][$match_i];
            $hashkey  = $matches[2][$match_i];
            $hashdata = Wo_GetHashtag($hashkey);
            if (is_array($hashdata)) {
                $hashlink = '<a href="' . Wo_SeoLink('index.php?link1=hashtag&hash=' . $hashdata['tag']) . '" class="hash">#' . $hashdata['tag'] . '</a>';
                $text     = str_replace($hashtag, $hashlink, $text);
            }
            $match_i++;
        }
    }
    if ($mention == true) {
        $mention_regex = '/@\[([0-9]+)\]/i';
        if (preg_match_all($mention_regex, $text, $matches)) {
            foreach ($matches[1] as $match) {
                $match         = Wo_Secure($match);
                $match_user    = Wo_UserData($match);
                $match_search  = '@[' . $match . ']';
                $match_replace = '<span class="user-popover" data-id="' . $match_user['id'] . '" data-type="' . $match_user['type'] . '"><a href="' . Wo_SeoLink('index.php?link1=timeline&u=' . $match_user['username']) . '" class="hash" data-ajax="?link1=timeline&u=' . $match_user['username'] . '">' . $match_user['name'] . '</a></span>';
                if (isset($match_user['user_id'])) {
                    $text = str_replace($match_search, $match_replace, $text);
                }
            }
        }
    }
    return $text;
}
function Wo_EditMarkup($text, $link = true, $hashtag = true, $mention = true) {
    if ($link == true) {
        $link_search = '/\[a\](.*?)\[\/a\]/i';
        if (preg_match_all($link_search, $text, $matches)) {
            foreach ($matches[1] as $match) {
                $match_decode = urldecode($match);
                $match_url    = $match_decode;
                if (!preg_match("/http(|s)\:\/\//", $match_decode)) {
                    $match_url = 'http://' . $match_url;
                }
                $text = str_replace('[a]' . $match . '[/a]', $match_decode, $text);
            }
        }
    }
    if ($hashtag == true) {
        $hashtag_regex = '/(#\[([0-9]+)\])/i';
        preg_match_all($hashtag_regex, $text, $matches);
        $match_i = 0;
        foreach ($matches[1] as $match) {
            $hashtag  = $matches[1][$match_i];
            $hashkey  = $matches[2][$match_i];
            $hashdata = Wo_GetHashtag($hashkey);
            if (is_array($hashdata)) {
                $hashlink = '#' . $hashdata['tag'];
                $text     = str_replace($hashtag, $hashlink, $text);
            }
            $match_i++;
        }
    }
    if ($mention == true) {
        $mention_regex = '/@\[([0-9]+)\]/i';
        if (preg_match_all($mention_regex, $text, $matches)) {
            foreach ($matches[1] as $match) {
                $match         = Wo_Secure($match);
                $match_user    = Wo_UserData($match);
                $match_search  = '@[' . $match . ']';
                $match_replace = '@' . $match_user['username'];
                if (isset($match_user['user_id'])) {
                    $text = str_replace($match_search, $match_replace, $text);
                }
            }
        }
    }
    return $text;
}
function Wo_Emo($string = '') {
   global $emo,$wo;
   foreach ($emo as $code => $name) {
        $code   = $code;
        $name   = '<i class="twa-lg twa twa-' . $name . '"></i>';
        $string = str_replace($code, $name, $string);
    }
    return $string;
}
function Wo_EmoPhone($string = '') {
    global $emo_full;
    foreach ($emo_full as $code => $name) {
        $code   = $code;
        $string = str_replace($code, $name, $string);
    }
    return $string;
}
function Wo_UploadLogo($data = array()) {
    global $wo, $sqlConnect;
    if (isset($data['file']) && !empty($data['file'])) {
        $data['file'] = Wo_Secure($data['file']);
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (empty($data)) {
        return false;
    }
    $allowed           = 'jpg,png,jpeg,gif';
    $new_string        = pathinfo($data['name'], PATHINFO_FILENAME) . '.' . strtolower(pathinfo($data['name'], PATHINFO_EXTENSION));
    $extension_allowed = explode(',', $allowed);
    $file_extension    = pathinfo($new_string, PATHINFO_EXTENSION);
    if (!in_array($file_extension, $extension_allowed)) {
        return false;
    }
    $dir      = "themes/" . $wo['config']['theme'] . "/img/";
    $filename = $dir . "logo.{$file_extension}";
    if (move_uploaded_file($data['file'], $filename)) {
        if (Wo_SaveConfig('logo_extension', $file_extension)) {
            return true;
        }
    }
}
function Wo_UploadBackground($data = array()) {
    global $wo, $sqlConnect;
    if (isset($data['file']) && !empty($data['file'])) {
        $data['file'] = Wo_Secure($data['file']);
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (empty($data)) {
        return false;
    }
    $allowed           = 'jpg,png,jpeg,gif';
    $new_string        = pathinfo($data['name'], PATHINFO_FILENAME) . '.' . strtolower(pathinfo($data['name'], PATHINFO_EXTENSION));
    $extension_allowed = explode(',', $allowed);
    $file_extension    = pathinfo($new_string, PATHINFO_EXTENSION);
    if (!in_array($file_extension, $extension_allowed)) {
        return false;
    }
    $dir      = "themes/" . $wo['config']['theme'] . "/img/backgrounds/";
    $filename = $dir . "background-1.{$file_extension}";
    if (move_uploaded_file($data['file'], $filename)) {
        if (Wo_SaveConfig('background_extension', $file_extension)) {
            return true;
        }
    }
}
function Wo_UploadFavicon($data = array()) {
    global $wo, $sqlConnect;
    if (isset($data['file']) && !empty($data['file'])) {
        $data['file'] = Wo_Secure($data['file']);
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (empty($data)) {
        return false;
    }
    $allowed           = 'jpg,png,jpeg,gif';
    $new_string        = pathinfo($data['name'], PATHINFO_FILENAME) . '.' . strtolower(pathinfo($data['name'], PATHINFO_EXTENSION));
    $extension_allowed = explode(',', $allowed);
    $file_extension    = pathinfo($new_string, PATHINFO_EXTENSION);
    if (!in_array($file_extension, $extension_allowed)) {
        return false;
    }
    $dir      = "themes/" . $wo['config']['theme'] . "/img/";
    $filename = $dir . "icon.{$file_extension}";
    if (move_uploaded_file($data['file'], $filename)) {
        if (Wo_SaveConfig('favicon_extension', $file_extension)) {
            return true;
        }
    }
}
function Wo_ShareFile($data = array(), $type = 0, $crop = true) {
    global $wo, $sqlConnect, $s3;
    $allowed = '';
    if (!file_exists('upload/files/' . date('Y'))) {
        @mkdir('upload/files/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/files/' . date('Y') . '/' . date('m'))) {
        @mkdir('upload/files/' . date('Y') . '/' . date('m'), 0777, true);
    }
    if (!file_exists('upload/photos/' . date('Y'))) {
        @mkdir('upload/photos/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/photos/' . date('Y') . '/' . date('m'))) {
        @mkdir('upload/photos/' . date('Y') . '/' . date('m'), 0777, true);
    }
    if (!file_exists('upload/videos/' . date('Y'))) {
        @mkdir('upload/videos/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/videos/' . date('Y') . '/' . date('m'))) {
        @mkdir('upload/videos/' . date('Y') . '/' . date('m'), 0777, true);
    }
    if (!file_exists('upload/sounds/' . date('Y'))) {
        @mkdir('upload/sounds/' . date('Y'), 0777, true);
    }
    if (!file_exists('upload/sounds/' . date('Y') . '/' . date('m'))) {
        @mkdir('upload/sounds/' . date('Y') . '/' . date('m'), 0777, true);
    }
    if (isset($data['file']) && !empty($data['file'])) {
        $data['file'] = $data['file'];
    }
    if (isset($data['name']) && !empty($data['name'])) {
        $data['name'] = Wo_Secure($data['name']);
    }
    if (empty($data)) {
        return false;
    }
    if ($wo['config']['fileSharing'] == 1) {
        if (isset($data['types'])) {
            $allowed = $data['types'];
        } else {
            $allowed = $wo['config']['allowedExtenstion'];
        }
    } else {
        $allowed = 'jpg,png,jpeg,gif,mp4,m4v,webm,flv,mov,mpeg,mp3,wav';
    }
    $new_string        = pathinfo($data['name'], PATHINFO_FILENAME) . '.' . strtolower(pathinfo($data['name'], PATHINFO_EXTENSION));
    $extension_allowed = explode(',', $allowed);
    $file_extension    = pathinfo($new_string, PATHINFO_EXTENSION);
    if (!in_array($file_extension, $extension_allowed)) {
        return false;
    }
    if ($data['size'] > $wo['config']['maxUpload']) {
        return false;
    }
    if ($file_extension == 'jpg' || $file_extension == 'jpeg' || $file_extension == 'png' || $file_extension == 'gif') {
        $folder   = 'photos';
        $fileType = 'image';
    } else if ($file_extension == 'mp4' || $file_extension == 'mov' || $file_extension == 'webm' || $file_extension == 'flv') {
        $folder   = 'videos';
        $fileType = 'video';
    } else if ($file_extension == 'mp3' || $file_extension == 'wav') {
        $folder   = 'sounds';
        $fileType = 'soundFile';
    } else {
        $folder   = 'files';
        $fileType = 'file';
    }
    if (empty($folder) || empty($fileType)) {
        return false;
    }
    $mime_types = explode(',', str_replace(' ', '', $wo['config']['mime_types'] . ',application/octet-stream'));
    if (!in_array($data['type'], $mime_types)) {
        return false;
    }
    $dir         = "upload/{$folder}/" . date('Y') . '/' . date('m');
    $filename    = $dir . '/' . Wo_GenerateKey() . '_' . date('d') . '_' . md5(time()) . "_{$fileType}.{$file_extension}";
    $second_file = pathinfo($filename, PATHINFO_EXTENSION);
    if (move_uploaded_file($data['file'], $filename)) {
        if ($second_file == 'jpg' || $second_file == 'jpeg' || $second_file == 'png' || $second_file == 'gif') {
            $check_file = getimagesize($filename);
            if (!$check_file) {
                unlink($filename);
            }
            if( $crop == true ){
                if ($type == 1) {
                    @Wo_CompressImage($filename, $filename, 50);
                    $explode2  = @end(explode('.', $filename));
                    $explode3  = @explode('.', $filename);
                    $last_file = $explode3[0] . '_small.' . $explode2;

                    if (Wo_Resize_Crop_Image(400, 400, $filename, $last_file, 60)) {
                        if (($wo['config']['amazone_s3'] == 1 || $wo['config']['ftp_upload'] == 1 || $wo['config']['spaces'] == 1) && !empty($last_file)) {
                            $upload_s3 = Wo_UploadToS3($last_file);
                        }
                    }
                } else {
                    if (!isset($data['compress']) && $second_file != 'gif') {
                        @Wo_CompressImage($filename, $filename, 10);
                        watermark_image($filename);
                    }
                }
            }
        }
        if (!empty($data['crop'])) {
            $crop_image = Wo_Resize_Crop_Image($data['crop']['width'], $data['crop']['height'], $filename, $filename, 60);
        }
        if (($wo['config']['amazone_s3'] == 1 || $wo['config']['ftp_upload'] == 1 || $wo['config']['spaces'] == 1) && !empty($filename)) {
            $upload_s3 = Wo_UploadToS3($filename);
        }
        $last_data             = array();
        $last_data['filename'] = $filename;
        $last_data['name']     = $data['name'];
        return $last_data;
    }
}
function Wo_DisplaySharedFile($media, $placement = '', $cache = false) {
    global $wo, $sqlConnect, $db;
    $wo['media']['filename']    = Wo_GetMedia($media['filename']);
    $wo['media']['video_thumb'] = ((!empty($media['postFileThumb'])) ? Wo_GetMedia($media['postFileThumb']) : '');
    $wo['media']['name']        = Wo_Secure($media['name']);
    $wo['media']['type']        = $media['type'];
    $wo['media']['storyId']     = @$media['storyId'];
    $wo['is_video_ad']          = '';
    $wo['wo_ad_media']          =    '';
    $wo['wo_ad_url']            = '';
    $wo['wo_ad_id']             = 0;
    $wo['rvad_con']             = '';
    $icon_size                  = 'fa-2x';
    if ($placement == 'chat') {
        $icon_size = '';
    }
    if (!empty($wo['media']['filename'])) {
        $file_extension = pathinfo($wo['media']['filename'], PATHINFO_EXTENSION);
        $file           = '';
        $media_file     = '';
        $start_link     = "<a href=" . $wo['media']['filename'] . ">";
        $end_link       = '</a>';
        $file_extension = strtolower($file_extension);
        if (!empty($cache)) {
            $wo['media']['filename'] = $wo['media']['filename'] . "?cache=" . $cache;
        }

        if ($file_extension == 'jpg' || $file_extension == 'jpeg' || $file_extension == 'png' || $file_extension == 'gif') {
            if ($placement == 'api') {
                $media_file .= "<img src='" . $wo['media']['filename'] . "' alt='image' class='image-file pointer' onclick=\"InjectAPI('{&quot;type&quot; : &quot;lightbox&quot;, &quot;image_url&quot;:&quot;" . $wo['media']['filename'] . "&quot;}');\">";
            } else {
                if ($placement != 'chat' && $media['type'] != 'message') {
                    $media_file .= "<img src='" . $wo['media']['filename'] . "' alt='image' class='image-file pointer' onclick='Wo_OpenLightBox(" . $media['storyId'] . ");'>";
                } else {
                    $media_file .= "<span data-href='" . $wo['media']['filename'] . "'  onclick='Wo_OpenLighteBox(this,event);'><img src='" . $wo['media']['filename'] . "' alt='image' class='image-file pointer'></span>";
                }
            }
        }
        if ($file_extension == 'pdf') {
            $file .= '<i class="fa ' . $icon_size . ' fa-file-pdf-o"></i> ' . $wo['media']['name'];
        }
        if ($file_extension == 'txt') {
            $file .= '<i class="fa ' . $icon_size . ' fa-file-text-o"></i> ' . $wo['media']['name'];
        }
        if ($file_extension == 'zip' || $file_extension == 'rar' || $file_extension == 'tar') {
            $file .= '<i class="fa ' . $icon_size . ' fa-file-archive-o"></i> ' . $wo['media']['name'];
        }
        if ($file_extension == 'doc' || $file_extension == 'docx') {
            $file .= '<i class="fa ' . $icon_size . ' fa-file-word-o"></i> ' . $wo['media']['name'];
        }
        if ($file_extension == 'mp3' || $file_extension == 'wav') {
            if ($placement == 'chat') {
                $file .= '<i class="fa ' . $icon_size . ' fa-music"></i> ' . $wo['media']['name'];
            } else if ($placement == 'message') {
                $media_file .= Wo_LoadPage('players/chat-audio');
            } else if ($placement == 'record') {
                $media_file .= Wo_LoadPage('players/audio');
            } else {
                $media_file .= Wo_LoadPage('players/audio');
            }
        }
        if (empty($file)) {
            $file .= '<i class="fa ' . $icon_size . ' fa-file-o"></i> ' . $wo['media']['name'];
        }
        if ($file_extension == 'mp4' || $file_extension == 'mkv' || $file_extension == 'avi' || $file_extension == 'webm' || $file_extension == 'mov') {
            if ($placement == 'message' || $placement == 'chat') {
                $media_file .= Wo_LoadPage('players/chat-video');
            } 
            else {
                $t_users    = T_USERS;
                $lats_ad_id = (!empty($_GET['ad_id']) && is_numeric($_GET['ad_id'])) ? $_GET['ad_id'] : false;
                $con_list   = implode(',', $wo['ad-con']['ads']);

                if ($con_list) {
                    $db->where(" `id` NOT IN ({$con_list}) ");
                }

                $db->where(" `user_id` IN (SELECT `user_id` FROM `$t_users` WHERE `wallet` > 0) ");
                $db->where("`status`", 1);
                $db->where("`appears`", 'video');

                if (!empty($lats_ad_id)) {
                    $db->where("id", $lats_ad_id,"<>");
                }

                if ($wo['loggedin'] && !empty($wo['user']['country_id'])) {
                    $usr_country = $wo['user']['country_id'];
                    $db->where(" `audience` LIKE '%$usr_country%' ");
                }


                $video_ad = $db->orderBy('RAND()')->getOne(T_USER_ADS);
                if (!empty($video_ad)) {
                    $wo['is_video_ad'] = ",'ads'";
                    $wo['wo_ad_url']   = $video_ad->url;
                    $wo['wo_ad_media'] = $video_ad->ad_media;
                    $wo['wo_ad_id']    = $video_ad->id;
                    $wo['rvad_con']    = "rvad-".$video_ad->bidding;
                    if ($video_ad->bidding == 'views') {
                        Wo_RegisterAdConversionView($video_ad->id);
                    } else {
                        Wo_RegisterAdView($video_ad->id);
                    }
                }

                $media_file       .= Wo_LoadPage('players/video');
            }
        }
        $last_file_view = '';
        if (isset($media_file) && !empty($media_file)) {
            $last_file_view = $media_file;
        } else {
            $last_file_view = $start_link . $file . $end_link;
        }
        return $last_file_view;
    }
}
function Wo_IsAdmin($user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    if (!empty($user_id) && $user_id > 0) {
        $query = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) as count FROM " . T_USERS . " WHERE admin = '1' AND user_id = {$user_id}");
        $sql   = mysqli_fetch_assoc($query);
        if ($sql['count'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    if ($wo['user']['admin'] == 1) {
        return true;
    }
    return false;
}
function Wo_IsModerator($user_id = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['user']['admin'] == 2) {
        return true;
    }
    return false;
}
function Wo_CheckIfUserCanPost($num = 10) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $time      = time() - 3200;
    $query     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_POSTS . " WHERE `user_id` = {$user_id} AND `time` > {$time}");
    $sql_query = mysqli_fetch_assoc($query);
    if ($sql_query['count'] > $num) {
        return false;
    }
}
function Wo_CheckIfUserCanRegister($num = 10) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == true) {
        return false;
    }
    $ip = get_ip_address();
    if (empty($ip)) {
        return true;
    }
    $time      = time() - 3200;
    $query     = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) as count FROM " . T_USERS . " WHERE `ip_address` = '{$ip}' AND `joined` > {$time}");
    $sql_query = mysqli_fetch_assoc($query);
    if ($sql_query['count'] > $num) {
        return false;
    }
}
function Wo_RegisterPost($re_data = array('recipient_id' => 0)) {
    global $wo, $sqlConnect;
    $is_there_video = false;
    $playtube_root  = preg_quote($wo['config']['playtube_url']);
    
    if (empty($re_data['user_id']) or $re_data['user_id'] == 0) {
        $re_data['user_id'] = $wo['user']['user_id'];
    }
    if (!is_numeric($re_data['user_id']) or $re_data['user_id'] < 0) {
        return false;
    }
    if ($re_data['user_id'] == $wo['user']['user_id']) {
        $timeline = $wo['user'];
    } else {
        $re_data['user_id'] = Wo_Secure($re_data['user_id']);
        $timeline           = Wo_UserData($re_data['user_id']);
    }
    if ($timeline['user_id'] != $wo['user']['user_id']) {
        return false;
    }
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
    if (Wo_CheckIfUserCanPost($wo['config']['post_limit']) === false) {
        return false;
    }
    if (!empty($re_data['postText'])) {
        if ($wo['config']['maxCharacters'] > 0) {
            if ((mb_strlen($re_data['postText']) - 10) > $wo['config']['maxCharacters']) {
                return false;
            }
        }
        $re_data['postVine']        = '';
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postFacebook']    = '';
        $re_data['postPlaytube']    = '';
        if (preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $re_data['postText'], $match)) {
            $re_data['postYoutube'] = Wo_Secure($match[1]);
            $re_data['postText'] = preg_replace('/((?:https?:\/\/)?www\.youtube\.com\/watch\?v=\w+)/', "", $re_data['postText']);
            $is_there_video         = true;
        }
        if (Wo_IsUrl($wo['config']['playtube_url']) && preg_match('#'.$playtube_root.'\/(?:watch|embed)\/(.*)#i', $re_data['postText'], $match)) {
            $re_data['postPlaytube'] = ((!empty($match[1])) ? Wo_Secure($match[1]) : '');
            $is_there_video          = true;
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
                    $match_search  = '#' . $match;
                    $match_replace = '#[' . $hashdata['id'] . ']';
                    if (mb_detect_encoding($match_search, 'ASCII', true)) {
                        $re_data['postText'] = preg_replace("/$match_search\b/i", $match_replace, $re_data['postText']);
                    } else {
                        $re_data['postText'] = str_replace($match_search, $match_replace, $re_data['postText']);
                    }
                    $hashtag_query     = "UPDATE " . T_HASHTAGS . " SET 
                    `last_trend_time` = " . time() . ", 
                    `trend_use_num`   = " . ($hashdata['trend_use_num'] + 1) . ",
                    `expire`          = '" . date('Y-m-d', strtotime(date('Y-m-d') . " +1week")) . "'       
                    WHERE `id` = " . $hashdata['id'];
                    $hashtag_sql_query = mysqli_query($sqlConnect, $hashtag_query);
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
    if (!empty($re_data['postPlaytube'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
    }
    if (!empty($re_data['postVine'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
        $re_data['postPlaytube']    = '';
    }
    else if (!empty($re_data['postYoutube'])) {
        $re_data['postVine']        = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
        $re_data['postPlaytube']    = '';
    }
    if (!empty($re_data['postVimeo'])) {
        $re_data['postVine']        = '';
        $re_data['postYoutube']     = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postSoundCloud']  = '';
        $re_data['postPlaytube']    = '';
    }
    if (!empty($re_data['postDailymotion'])) {
        $re_data['postYoutube']    = '';
        $re_data['postVimeo']      = '';
        $re_data['postVine']       = '';
        $re_data['postFacebook']   = '';
        $re_data['postSoundCloud'] = '';
        $re_data['postPlaytube']   = '';
    }
    if (!empty($re_data['postFacebook'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postVine']        = '';
        $re_data['postSoundCloud']  = '';
        $re_data['postPlaytube']    = '';
    }
    if (!empty($re_data['postSoundCloud'])) {
        $re_data['postYoutube']     = '';
        $re_data['postVimeo']       = '';
        $re_data['postDailymotion'] = '';
        $re_data['postFacebook']    = '';
        $re_data['postVine']        = '';
        $re_data['postPlaytube']    = '';
    }
    if (empty($re_data['multi_image'])) {
        $re_data['multi_image'] = 0;
    }
    if (empty($re_data['postText']) && empty($re_data['album_name']) && $re_data['multi_image'] == 0 && empty($re_data['postFacebook']) && empty($re_data['postVimeo']) && empty($re_data['postDailymotion']) && empty($re_data['postVine']) && empty($re_data['postYoutube']) && empty($re_data['postFile']) && empty($re_data['postSoundCloud']) && empty($re_data['postFeeling']) && empty($re_data['postListening']) && empty($re_data['postPlaying']) && empty($re_data['postWatching']) && empty($re_data['postTraveling']) && empty($re_data['postMap']) && empty($re_data['product_id']) && empty($re_data['blog_id']) && empty($re_data['page_event_id']) && empty($re_data['postRecord']) && empty($re_data['postSticker']) && empty($re_data['postPlaytube'])) {
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
                    'post_id' => $post_id,
                    'url' => 'index.php?link1=post&id=' . $post_id
                );
                Wo_RegisterNotification($notification_data_array);
            }
        }

        //Register point level system for createpost
        Wo_RegisterPoint($post_id, "createpost");

        return $post_id;
    }
}
function Wo_GetHashtag($tag = '', $type = true) {
    global $sqlConnect;
    $create = false;
    if (empty($tag)) {
        return false;
    }
    $tag     = Wo_Secure($tag);
    $md5_tag = md5($tag);
    if (is_numeric($tag)) {
        $query = " SELECT * FROM " . T_HASHTAGS . " WHERE `id` = {$tag}";
    } else {
        $query  = " SELECT * FROM " . T_HASHTAGS . " WHERE `hash` = '{$md5_tag}' ";
        $create = true;
    }
    $sql_query   = mysqli_query($sqlConnect, $query);
    $sql_numrows = mysqli_num_rows($sql_query);
    $week        = date('Y-m-d', strtotime(date('Y-m-d') . " +1week"));
    if ($sql_numrows == 1) {
        $sql_fetch = mysqli_fetch_assoc($sql_query);
        return $sql_fetch;
    } elseif ($sql_numrows == 0 && $type == true) {
        if ($create == true) {
            $hash          = md5($tag);
            $query_two     = " INSERT INTO " . T_HASHTAGS . " (`hash`, `tag`, `last_trend_time`,`expire`) VALUES ('{$hash}', '{$tag}', " . time() . ", '$week')";
            $sql_query_two = mysqli_query($sqlConnect, $query_two);
            if ($sql_query_two) {
                $sql_id = mysqli_insert_id($sqlConnect);
                $data   = array(
                    'id' => $sql_id,
                    'hash' => $hash,
                    'tag' => $tag,
                    'last_trend_time' => time(),
                    'trend_use_num' => 0
                );
                return $data;
            }
        }
    }
}
function Wo_PostData($post_id, $placement = '', $limited = '') {
    global $wo, $sqlConnect, $cache;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    $data           = array();
    $post_id        = Wo_Secure($post_id);
    $query_one      = "SELECT * FROM " . T_POSTS . " WHERE `id` = {$post_id}";
    $hashed_post_Id = md5($post_id);
    if ($wo['config']['cacheSystem'] == 1) {
        $fetched_data = $cache->read($hashed_post_Id . '_P_Data.tmp');
        if (empty($fetched_data)) {
            $sql_query_one = mysqli_query($sqlConnect, $query_one);
            $fetched_data  = mysqli_fetch_assoc($sql_query_one);
            $cache->write($hashed_post_Id . '_P_Data.tmp', $fetched_data);
        }
    } else {
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    }
    if (empty($fetched_data['id'])) {
        return false;
    }
    if (!empty($fetched_data['page_id'])) {
        $fetched_data['publisher'] = Wo_PageData($fetched_data['page_id']);
    } else {
        $fetched_data['publisher'] = Wo_UserData($fetched_data['user_id']);
    }
    if ($fetched_data['id'] == $fetched_data['post_id']) {
        $story = $fetched_data;
    } else {
        $query_two     = "SELECT * FROM " . T_POSTS . " WHERE `id` = " . $fetched_data['post_id'];
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if (mysqli_num_rows($sql_query_two) != 1) {
            return false;
        }
        $sql_fetch_two = mysqli_fetch_assoc($sql_query_two);
        $story         = $sql_fetch_two;
        if (!empty($story['page_id'])) {
            $story['publisher'] = Wo_PageData($story['page_id']);
        } else {
            $story['publisher'] = Wo_UserData($story['user_id']);
        }
    }
    $story['limit_comments']   = 3;
    $story['limited_comments'] = true;
    if ($limited == 'not_limited') {
        $story['limit_comments']   = 10000;
        $story['limited_comments'] = false;
    }
    $story['is_group_post']          = false;
    $story['group_recipient_exists'] = false;
    $story['group_admin']            = false;
    if ($placement != 'admin') {
        if (!empty($story['group_id'])) {
            if ($wo['config']['groups'] == 0) {
                return false;
            }
            $story['group_recipient_exists'] = true;
            $story['group_recipient']        = Wo_GroupData($story['group_id']);
            if ($story['group_recipient']['privacy'] == 2) {
                if ($wo['loggedin'] == true) {
                    if ($story['publisher']['user_id'] != $wo['user']['user_id']) {
                        if (Wo_IsGroupOnwer($story['group_id']) === false) {
                            if (Wo_IsGroupJoined($story['group_id']) === false) {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }
            }
            if (Wo_IsGroupOnwer($story['group_id']) === false) {
                $story['is_group_post'] = true;
            } else {
                $story['group_admin'] = true;
            }
        }
        if ($story['postPrivacy'] == 1) {
            if ($wo['loggedin'] == true) {
                if (!empty($story['publisher']['page_id'])) {
                } else {
                    if ($story['publisher']['user_id'] != $wo['user']['user_id']) {
                        if (Wo_IsFollowing($wo['user']['user_id'], $story['publisher']['user_id']) === false) {
                            return false;
                        }
                    }
                }
            } else {
                return false;
            }
        }
        if ($story['postPrivacy'] == 2) {
            if ($wo['loggedin'] == true) {
                if (!empty($story['publisher']['page_id'])) {
                    if ($story['publisher']['user_id'] != $wo['user']['user_id']) {
                        if (Wo_IsPageLiked($story['publisher']['page_id'], $wo['user']['user_id']) === false) {
                            return false;
                        }
                    }
                } else {
                    if ($story['publisher']['user_id'] != $wo['user']['user_id']) {
                        if (Wo_IsFollowing($story['publisher']['user_id'], $wo['user']['user_id']) === false && empty($story['group_id'])) {
                            return false;
                        }
                    }
                }
            } else {
                return false;
            }
        }
        if ($story['postPrivacy'] == 3) {
            if ($wo['loggedin'] == true) {
                if (!empty($story['publisher']['page_id'])) {
                } else {
                    if ($wo['user']['user_id'] != $story['publisher']['user_id']) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    }
    $story['postText_API'] = Wo_MarkupAPI($story['postText']);
    $story['postText_API'] = Wo_Emo($story['postText_API']);
    $story['Orginaltext']  = Wo_EditMarkup($story['postText']);
    $story['Orginaltext']  = str_replace('<br>', "\n", $story['Orginaltext']);
    $story['postText']     = Wo_Emo($story['postText']);
    $story['postText']     = Wo_Markup($story['postText']);
    $story['post_time']    = Wo_Time_Elapsed_String($story['time']);
    $story['page']         = 0;
    if (!empty($story['postFeeling'])) {
        $story['postFeelingIcon'] = $wo['feelingIcons'][$story['postFeeling']];
    }
    if (isset($story['Orginaltext']) && !empty($story['Orginaltext']) && $wo['config']['useSeoFrindly'] == 1) {
        $story['url'] = Wo_SeoLink('index.php?link1=post&id=' . $story['id']) . '_' . Wo_SlugPost($story['Orginaltext']);
    } else {
        $story['url'] = Wo_SeoLink('index.php?link1=post&id=' . $story['id']);
    }
    $story['via_type'] = '';
    if ($story['id'] != $fetched_data['id'] && $story['user_id'] != $fetched_data['user_id']) {
        $story['via_type'] = 'share';
        $story['via']      = $fetched_data['publisher'];
    }
    $story['recipient_exists'] = false;
    $story['recipient']        = '';
    if ($story['recipient_id'] > 0) {
        $story['recipient_exists'] = true;
        $story['recipient']        = Wo_UserData($story['recipient_id']);
    }
    $story['admin'] = false;
    if ($wo['loggedin'] == true) {
        if (!empty($story['page_id'])) {
            if (Wo_IsPageOnwer($story['page_id'])) {
                $story['admin'] = true;
            }
        } else {
            if ($story['publisher']['user_id'] == $wo['user']['user_id']) {
                $story['admin'] = true;
            }
        }
        if ($story['recipient_exists'] == true) {
            if ($story['recipient']['user_id'] == $wo['user']['user_id']) {
                $story['admin'] = true;
            }
        }
    }
    if (!empty($story['page_id'])) {
        if ($wo['config']['pages'] == 0) {
            return false;
        }
    }
    $story['is_post_saved']     = false;
    $story['is_post_reported']  = false;
    $story['is_post_boosted']   = 0;
    $story['is_liked']          = false;
    $story['is_wondered']       = false;
    $story['post_comments']     = 0;
    $story['post_shares']       = 0;
    $story['post_likes']        = 0;
    $story['post_wonders']      = 0;
    $story['postLinkImage']     = Wo_GetMedia($story['postLinkImage']);
    $story['is_post_pinned']    = (Wo_IsPostPinned($story['id']) === true) ? true : false;
    $story['get_post_comments'] = ($story['comments_status'] == 1) ? Wo_GetPostComments($story['id'], $story['limit_comments']) : array();
    $story['photo_album']       = array();
    if (!empty($story['album_name'])) {
        $story['photo_album'] = Wo_GetAlbumPhotos($story['id']);
    }
    if ($story['boosted'] == 1) {
        $story['is_post_boosted'] = 1;
    }
    if ($story['multi_image'] == 1) {
        $parent_id            = ($story['parent_id'] > 0) ? $story['parent_id'] : $story['id'];
        $story['photo_multi'] = Wo_GetAlbumPhotos($parent_id);
    }
    if ($story['product_id'] > 0) {
        $story['product'] = Wo_GetProduct($story['product_id']);
    }
    if ($story['page_event_id'] > 0) {
        $story['event'] = Wo_EventData($story['page_event_id']);
    }
    if ($story['event_id'] > 0) {
        $story['event'] = Wo_EventData($story['event_id']);
    }
    $story['options'] = array();
    if ($story['poll_id'] == 1) {
        $options = Ju_GetPercentageOfOptionPost($story['id']);
        if (!empty($options)) {
            $story['options'] = $options;
        }
    }
    if ($wo['loggedin'] == true) {
        $story['post_comments']    = Wo_CountPostComment($story['id']);
        $story['post_shares']      = Wo_CountShares($story['id']);
        $story['post_likes']       = Wo_CountLikes($story['id']);
        $story['post_wonders']     = Wo_CountWonders($story['id']);
        $story['is_liked']         = (Wo_IsLiked($story['id'], $wo['user']['user_id']) === true) ? true : false;
        $story['is_wondered']      = (Wo_IsWondered($story['id'], $wo['user']['user_id']) === true) ? true : false;
        $story['is_post_saved']    = (Wo_IsPostSaved($story['id'], $wo['user']['user_id']) === true) ? true : false;
        $story['is_post_reported'] = (Wo_IsPostRepotred($story['id'], $wo['user']['user_id']) === true) ? true : false;
        if (Wo_IsBlocked($story['user_id']) || Wo_IsBlocked($story['recipient_id'])) {
            if (empty($story['group_id'])) {
                return false;
            }
        }
    }
    $story['postFile_full'] = '';
    $story['shared_from']   = ($story['shared_from'] > 0) ? Wo_UserData($story['shared_from']) : false;
    if (!empty($story['postFile'])) {
        $story['postFile_full'] = Wo_GetMedia($story['postFile']);
    }
    if (!empty($story['postPhoto'])) {
        $story['postPhoto'] = Wo_GetMedia($story['postPhoto']);
    }
    if (!empty($story['blog_id'])) {
        $story['blog'] = Wo_GetArticle($story['blog_id']);
    }
    return $story;
}
function Wo_CountUserPosts($user_id) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id      = Wo_Secure($user_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_POSTS . " WHERE `user_id` = {$user_id}");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_PostExists($post_id) {
    global $sqlConnect;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    $post_id = Wo_Secure($post_id);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_POSTS . " WHERE `id` = {$post_id}");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_IsPostOnwer($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    $post_id = Wo_Secure($post_id);
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_POSTS . " WHERE `id` = {$post_id} AND (`user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id}) OR `page_id` IN (SELECT `page_id` FROM " . T_PAGE_ADMINS . " WHERE `user_id` = {$user_id}))");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_GetPostPublisherBox($user_id = 0, $recipient_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $continue = true;
    if (empty($user_id) or $user_id == 0) {
        $user_id = $wo['user']['user_id'];
    }
    if (!is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if ($user_id == $wo['user']['user_id']) {
        $user_timline = $wo['user'];
    } else {
        $user_id      = Wo_Secure($user_id);
        $user_timline = Wo_UserData($user_id);
    }
    if (!isset($recipient_id) or empty($recipient_id)) {
        $recipient_id = 0;
    }
    if (!is_numeric($recipient_id) or $recipient_id < 0) {
        return false;
    }
    $recipient_id = Wo_Secure($recipient_id);
    if ($user_id == $recipient_id) {
        $recipient_id = 0;
    }
    if ($recipient_id > 0) {
        $recipient = Wo_UserData($recipient_id);
        if (!isset($recipient['user_id'])) {
            return false;
        }
        if ($recipient['post_privacy'] == "ifollow") {
            if (Wo_IsFollowing($wo['user']['user_id'], $recipient_id) === false) {
                $continue = false;
            }
        } elseif ($recipient['post_privacy'] == "nobody") {
            $continue = false;
        } elseif ($recipient['post_privacy'] == "everyone") {
            $continue = true;
        }
        $wo['input']['recipient'] = $recipient;
    }
    if ($continue == true) {
        $wo['input']['user_timline'] = $user_timline;
        return Wo_LoadPage('story/publisher-box');
    }
}
function Wo_GetPosts($data = array('filter_by' => 'all', 'after_post_id' => 0, 'page_id' => 0, 'group_id' => 0, 'publisher_id' => 0, 'limit' => 5, 'event_id' => 0, 'ad-id' => 0)) {
    global $wo, $sqlConnect;
    if (empty($data['filter_by'])) {
        $data['filter_by'] = 'all';
    }
   
    $subquery_one = " `id` > 0 ";
    if (!empty($data['after_post_id']) && is_numeric($data['after_post_id']) && $data['after_post_id'] > 0) {
        $data['after_post_id'] = Wo_Secure($data['after_post_id']);
        $subquery_one          = " `id` < " . $data['after_post_id'] . " AND `id` <> " . $data['after_post_id'];
    } else if (!empty($data['before_post_id']) && is_numeric($data['before_post_id']) && $data['before_post_id'] > 0) {
        $data['before_post_id'] = Wo_Secure($data['before_post_id']);
        $subquery_one           = " `id` > " . $data['before_post_id'] . " AND `id` <> " . $data['before_post_id'];
    }
    if (!empty($data['publisher_id']) && is_numeric($data['publisher_id']) && $data['publisher_id'] > 0) {
        $data['publisher_id'] = Wo_Secure($data['publisher_id']);
        $Wo_publisher         = Wo_UserData($data['publisher_id']);
    }
    if (!empty($data['page_id']) && is_numeric($data['page_id']) && $data['page_id'] > 0) {
        $data['page_id']   = Wo_Secure($data['page_id']);
        $Wo_page_publisher = Wo_PageData($data['page_id']);
    }
    if (!empty($data['group_id']) && is_numeric($data['group_id']) && $data['group_id'] > 0) {
        $data['group_id']   = Wo_Secure($data['group_id']);
        $Wo_group_publisher = Wo_GroupData($data['group_id']);
    }
    if (!empty($data['event_id']) && is_numeric($data['event_id']) && $data['event_id'] > 0) {
        $data['event_id']   = Wo_Secure($data['event_id']);
        $Wo_event_publisher = Wo_EventData($data['event_id']);
    }
    $query_text = "SELECT `id` FROM " . T_POSTS . " WHERE {$subquery_one} AND `postType` <> 'profile_picture_deleted'";
    if (isset($Wo_publisher['user_id'])) {
        $user_id = Wo_Secure($Wo_publisher['user_id']);
        $query_text .= " AND (`user_id` = {$user_id} OR `recipient_id` = {$user_id}) AND postShare IN (0,1) AND `id` NOT IN (SELECT `post_id` from " . T_PINNED_POSTS . " WHERE `user_id` = {$user_id})  AND `page_id` NOT IN (SELECT `page_id` from " . T_PAGES . " WHERE user_id = {$user_id}) AND `group_id` = 0 AND `event_id` = 0";
        switch ($data['filter_by']) {
            case 'text':
                $query_text .= " AND `postText` <> '' AND `postFile` = '' AND `postYoutube` = '' AND `postFacebook` = ''  AND `postVimeo` = ''  AND `postDailymotion` = '' AND `postSoundCloud` = '' ";
                break;
            case 'files':
                $query_text .= " AND (`postFile` LIKE '%_file%' AND `postFile` NOT LIKE '%_video%' AND `postFile` NOT LIKE '%_avatar%' AND `postFile` NOT LIKE '%_soundFile%' AND `postFile` NOT LIKE '%_image%')";
                break;
            case 'photos':
                $query_text .= " AND (`postFile` LIKE '%_image%' OR `postFile` LIKE '%_avatar%' OR `postFile` LIKE '%_cover%' OR multi_image = '1' OR album_name <> '') "; 
                break;
            case 'music':
                $query_text .= " AND (`postSoundCloud` <> '' OR `postFile` LIKE '%_soundFile%')";
                break;
            case 'video':
                $query_text .= " AND (`postYoutube` <> '' OR `postVine` <> '' OR `postFacebook` <> '' OR `postDailymotion` <> '' OR `postVimeo` <> '' OR `postFile` LIKE '%_video%')";
                break;
            case 'maps':
                $query_text .= " AND `postMap` <> ''";
                break;
        }
    } else if (isset($Wo_page_publisher['page_id'])) {
        $page_id = Wo_Secure($Wo_page_publisher['page_id']);
        $query_text .= " AND (`page_id` = {$page_id}) AND `id` NOT IN (SELECT `post_id` from " . T_PINNED_POSTS . " WHERE `page_id` = {$page_id})";
        switch ($data['filter_by']) {
            case 'text':
                $query_text .= " AND `postText` <> '' AND `postFile` = '' AND `postYoutube` = '' AND `postFacebook` = ''  AND `postVimeo` = ''  AND `postDailymotion` = '' AND `postSoundCloud` = '' ";
                break;
            case 'files':
                $query_text .= " AND (`postFile` LIKE '%_file%' AND `postFile` NOT LIKE '%_video%' AND `postFile` NOT LIKE '%_avatar%' AND `postFile` NOT LIKE '%_soundFile%' AND `postFile` NOT LIKE '%_image%')";
                break;
            case 'photos':
                $query_text .= " AND (`postFile` LIKE '%_image%' OR `postFile` LIKE '%_avatar%' OR multi_image = '1' OR album_name <> '')";
                break;
            case 'music':
                $query_text .= " AND (`postSoundCloud` <> '' OR `postFile` LIKE '%_soundFile%')";
                break;
            case 'video':
                $query_text .= " AND (`postYoutube` <> '' OR `postVine` <> '' OR `postFacebook` <> '' OR `postDailymotion` <> '' OR `postVimeo` <> '' OR `postFile` LIKE '%_video%')";
                break;
            case 'maps':
                $query_text .= " AND `postMap` <> ''";
                break;
        }

    } else if (isset($Wo_group_publisher['id'])) {
        $group_id = Wo_Secure($Wo_group_publisher['id']);
        $query_text .= " AND (`group_id` = {$group_id}) AND `id` NOT IN (SELECT `post_id` from " . T_PINNED_POSTS . " WHERE `group_id` = {$group_id})";
        switch ($data['filter_by']) {
            case 'text':
                $query_text .= " AND `postText` <> '' AND `postFile` = '' AND `postYoutube` = '' AND `postFacebook` = ''  AND `postVimeo` = ''  AND `postDailymotion` = '' AND `postSoundCloud` = '' ";
                break;
            case 'files':
                $query_text .= " AND (`postFile` LIKE '%_file%' AND `postFile` NOT LIKE '%_video%' AND `postFile` NOT LIKE '%_avatar%' AND `postFile` NOT LIKE '%_soundFile%' AND `postFile` NOT LIKE '%_image%')";
                break;
            case 'photos':
                $query_text .= " AND (`postFile` LIKE '%_image%' OR `postFile` LIKE '%_avatar%' OR multi_image = '1' OR album_name <> '')";
                break;
            case 'music':
                $query_text .= " AND (`postSoundCloud` <> '' OR `postFile` LIKE '%_soundFile%')";
                break;
            case 'video':
                $query_text .= " AND (`postYoutube` <> '' OR `postVine` <> '' OR `postFacebook` <> '' OR `postDailymotion` <> '' OR `postVimeo` <> '' OR `postFile` LIKE '%_video%')";
                break;
            case 'maps':
                $query_text .= " AND `postMap` <> ''";
                break;
        }
    } else if (isset($Wo_event_publisher['id'])) {
        $event_id = Wo_Secure($Wo_event_publisher['id']);
        $query_text .= " AND (`event_id` = {$event_id}) AND `id` NOT IN (SELECT `post_id` from " . T_PINNED_POSTS . " WHERE `event_id` = {$event_id})";
        switch ($data['filter_by']) {
            case 'text':
                $query_text .= " AND `postText` <> '' AND `postFile` = '' AND `postYoutube` = '' AND `postFacebook` = ''  AND `postVimeo` = ''  AND `postDailymotion` = '' AND `postSoundCloud` = '' ";
                break;
            case 'files':
                $query_text .= " AND (`postFile` LIKE '%_file%' AND `postFile` NOT LIKE '%_video%' AND `postFile` NOT LIKE '%_avatar%' AND `postFile` NOT LIKE '%_soundFile%' AND `postFile` NOT LIKE '%_image%')";
                break;
            case 'photos':
                $query_text .= " AND (`postFile` LIKE '%_image%' OR `postFile` LIKE '%_avatar%' OR multi_image = '1' OR album_name <> '')";
                break;
            case 'music':
                $query_text .= " AND (`postSoundCloud` <> '' OR `postFile` LIKE '%_soundFile%')";
                break;
            case 'video':
                $query_text .= " AND (`postYoutube` <> '' OR `postVine` <> '' OR `postFacebook` <> '' OR `postDailymotion` <> '' OR `postVimeo` <> '' OR `postFile` LIKE '%_video%')";
                break;
            case 'maps':
                $query_text .= " AND `postMap` <> ''";
                break;
        }
    } else {
        $logged_user_id    = Wo_Secure($wo['user']['user_id']);
        $groups_not_joined = array();
        $query_groups      = "SELECT `group_id` FROM " . T_POSTS . " WHERE (`user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$logged_user_id} AND `active` = '1') AND `group_id` <> 0 AND `group_id` NOT IN (SELECT `group_id` FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = '{$logged_user_id}' AND `active` = '1'))";
        $query_groups      = mysqli_query($sqlConnect, $query_groups);
        while ($fetched_data_groups = mysqli_fetch_assoc($query_groups)) {
            if (!in_array($fetched_data_groups['group_id'], $groups_not_joined)) {
                $groups_not_joined[] = $fetched_data_groups['group_id'];
            }
        }
        $add_filter_query = false;
        
        if ($wo['config']['order_posts_by'] == 0) {
            if ($wo['user']['order_posts_by'] == 1) {
                $add_filter_query = true;
            }
        } else {
            $add_filter_query = true;
        }

        if ($add_filter_query == true) {
            $query_text .= "
            AND (
                  `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$logged_user_id} AND `active` = '1')
                  OR `recipient_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$logged_user_id} AND `active` = '1' )
                  OR `user_id` IN ({$logged_user_id}) OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$logged_user_id} AND `active` = '1')
                  OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$logged_user_id} AND `active` = '1')
                  OR `group_id` IN (SELECT `id` FROM " . T_GROUPS . " WHERE `user_id` = {$logged_user_id})
                  OR `event_id` IN (SELECT `event_id` FROM " . T_EVENTS_GOING . " WHERE `user_id` = {$logged_user_id})
                  OR `group_id` IN (SELECT `group_id` FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$logged_user_id} AND `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$logged_user_id} AND `active` = '1')
                  )
            )";
        }
        $query_text .= " AND `postPrivacy` <> '3'";
        $query_text .= " AND `postShare` NOT IN (1)";
        if (!empty($groups_not_joined)) {
            $implode_groups = implode($groups_not_joined, ',');
            $query_text .= " AND `group_id` NOT IN ($implode_groups)";
        }
        switch ($data['filter_by']) {
            case 'text':
                $query_text .= " AND `postText` <> '' AND `postFile` = '' AND `postYoutube` = '' AND `postFacebook` = ''  AND `postVimeo` = ''  AND `postDailymotion` = '' AND `postSoundCloud` = '' ";
                break;
            case 'files':
                $query_text .= " AND (`postFile` LIKE '%_file%' AND `postFile` NOT LIKE '%_video%' AND `postFile` NOT LIKE '%_avatar%' AND `postFile` NOT LIKE '%_soundFile%' AND `postFile` NOT LIKE '%_image%')";
                break;
            case 'photos':
                $query_text .= " AND (`postFile` LIKE '%_image%' OR `postFile` LIKE '%_avatar%' OR multi_image = '1' OR album_name <> '')";
                break;
            case 'music':
                $query_text .= " AND (`postSoundCloud` <> '' OR `postFile` LIKE '%_soundFile%')";
                break;
            case 'video':
                $query_text .= " AND (`postYoutube` <> '' OR `postVine` <> '' OR `postFacebook` <> '' OR `postDailymotion` <> '' OR `postVimeo` <> '' OR `postFile` LIKE '%_video%')";
                break;
            case 'maps':
                $query_text .= " AND `postMap` <> ''";
                break;
        }
    }
    
    $user = ($wo['loggedin']) ? $wo['user']['id'] : 0;
    if ((!isset($data['publisher_id']) || $data['publisher_id'] == $user) && empty($Wo_page_publisher['page_id'])  && empty($Wo_group_publisher['id'])) {
        $query_text .= " AND `shared_from` <>  {$user}";
    }
    
    $query_text .= " AND `id` NOT IN (SELECT `post_id` FROM " . T_HIDDEN_POSTS . " WHERE `user_id` = {$user})";
    if (empty($data['limit']) or !is_numeric($data['limit']) or $data['limit'] < 1) {
        $data['limit'] = 5;
    }
    $limit   = Wo_Secure($data['limit']);
    $last_ad = 0;

    if (!empty($data['ad-id'])) {
        $last_ad = $data['ad-id'];
    }

    if (isset($data['order'])) {
        $query_text .= " ORDER BY `id` " . Wo_Secure($data['order']) . " LIMIT {$limit}";
    } else {
        $query_text .= " ORDER BY `id` DESC LIMIT {$limit}";
    }

    $filter = $data['filter_by'];
    if( $data['filter_by'] == 'most_liked'  ){
        $commentscount = " (SELECT Count(*) FROM ".T_COMMENTS." WHERE post_id = p.id) ";
        $likes_count = '';
        if ($wo['config']['second_post_button'] !== 'reaction') {
            $likes_count= " ( SELECT COUNT(*) FROM ".T_LIKES." WHERE post_id = p.id ) ";
        } else {
            $likes_count= " ( SELECT COUNT(*) FROM ".T_REACTIONS." WHERE post_id = p.id ) ";
        }

        $hour = time()-(60*60*72);
        $sq = '';
        if ( ( isset( $data['after_post_id'] ) && $data['after_post_id'] > 0 ) && $data['lasttotal'] > 0 && $data['dt'] > 0 ) {
            $id = Wo_Secure($data['after_post_id']);
            $total = Wo_Secure($data['lasttotal']);
            
            $sq = " p.id <> " . $id . " AND p.time >= " . $hour . "
                    AND (
                        ( $commentscount + $likes_count ) < $total
                        AND 
                        ( $commentscount + $likes_count ) > 0 
                    ) ";
        }else{
            $sq = "p.id > 0 AND p.time >= " . $hour;
        }

        $query_text = "SELECT p.id AS `id`, 
                            $commentscount AS comments_count, 
                            $likes_count AS likes_count, 
                            ( $commentscount + $likes_count ) AS Total, 
                            p.time AS `time` 
                    FROM   ".T_POSTS." p 
                    WHERE
                            $sq
                    ORDER  BY total DESC 
                    LIMIT {$limit}";
    }
    $data = array();
    $sql  = mysqli_query($sqlConnect, $query_text);
    $ids = array();
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        if( $filter !== 'most_liked'  ){
            $post = Wo_PostData($fetched_data['id']);
            if (is_array($post)) {
                $data[] = $post;
            }
        }else{
            if( $fetched_data['comments_count'] > 0 || $fetched_data['likes_count'] > 0 ){
                $post = Wo_PostData($fetched_data['id']);
                if (is_array($post)) {
                    $post["LastTotal"] = $fetched_data['Total'];
                    $ids[] = $fetched_data['id'];
                    $post["dt"] = $fetched_data['time'];
                    $data[] = $post;
                }
            }
        }
    }

    if( $filter !== 'most_liked'  ){
        if (is_numeric($last_ad) && count($data) > 1) {
            $ad = Wo_GetPostAds(Wo_Secure($last_ad));
            if (is_array($ad) && !empty($ad)) {
                if ($ad['bidding'] == 'views') {
                    Wo_RegisterAdConversionView($ad['id']);
                }
                $data[] = $ad;
            }
        }
    }

    return $data;
}


function Wo_DeletePost($post_id = 0) {
    global $wo, $sqlConnect, $cache;
    if ($post_id < 1 || empty($post_id) || !is_numeric($post_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $post_id = Wo_Secure($post_id);
    $query   = mysqli_query($sqlConnect, "SELECT `id`, `user_id`, `recipient_id`, `page_id`, `postFile`, `postType`, `postText`, `postLinkImage`, `multi_image`, `album_name`,`parent_id` FROM " . T_POSTS . " WHERE `id` = {$post_id} AND (`user_id` = {$user_id} OR `recipient_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id}) OR `group_id` IN (SELECT `id` FROM " . T_GROUPS . " WHERE `user_id` = {$user_id}) OR `page_id` IN (SELECT `page_id` FROM " . T_PAGE_ADMINS . " WHERE `user_id` = {$user_id}))");
    $is_me = mysqli_num_rows($query);
    if ($is_me > 0 || (Wo_IsAdmin() || Wo_IsModerator())) {

        $is_this_post_shared = Wo_IsThisPostShared($post_id);
        $is_post_shared = Wo_IsPostShared($post_id);
        $fetched_data = mysqli_fetch_assoc($query);
        if ($fetched_data['postType'] == 'profile_picture' || $fetched_data['postType'] == 'profile_picture_deleted' || $fetched_data['postType'] == 'profile_cover_picture') {
            $query_delete_3 = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `postType` = 'profile_picture_deleted' WHERE `id` = '" . $fetched_data['id'] . "'");
            return true;
        }
        if (!empty($fetched_data['postText'])) {
            $hashtag_regex = '/(#\[([0-9]+)\])/i';
            preg_match_all($hashtag_regex, $fetched_data['postText'], $matches);
            $match_i = 0;
            foreach ($matches[1] as $match) {
                $hashtag  = $matches[1][$match_i];
                $hashkey  = $matches[2][$match_i];
                $hashdata = Wo_GetHashtag($hashkey);
                if (is_array($hashdata)) {
                    $hash_id = Wo_Secure($hashdata['id']);
                    $query_check_hash = mysqli_query($sqlConnect, "SELECT COUNT(id) as count FROM " . T_POSTS . " WHERE postText LIKE '%#[$hash_id]%'");
                    $query_get_hash = mysqli_fetch_assoc($query_check_hash);
                    if ($query_get_hash['count'] < 2) {
                        $delete = mysqli_query($sqlConnect, "DELETE FROM " . T_HASHTAGS . " WHERE id = $hash_id");
                    }
                }
                $match_i++;
            }
        }
        if (isset($fetched_data['postFile']) && !empty($fetched_data['postFile'])) {
            if ($fetched_data['postType'] != 'profile_picture' && $fetched_data['postType'] != 'profile_cover_picture' && !$is_post_shared && !$is_this_post_shared) {
                @unlink(trim($fetched_data['postFile']));
                $delete_from_s3 = Wo_DeleteFromToS3($fetched_data['postFile']);
            }
        }
        if (!empty($fetched_data['postFileThumb'])) {
            if (file_exists($fetched_data['postFileThumb'])) {
                @unlink(trim($fetched_data['postFileThumb']));
            }
            else if($wo['config']['amazone_s3'] == 1 || $wo['config']['ftp_upload'] == 1){
                @Wo_DeleteFromToS3($fetched_data['postFileThumb']);
            }   
        }
        if (isset($fetched_data['postLinkImage']) && !empty($fetched_data['postLinkImage']) && !$is_post_shared && !$is_this_post_shared) {
            @unlink($fetched_data['postLinkImage']);
            $delete_from_s3 = Wo_DeleteFromToS3($fetched_data['postLinkImage']);
        }
        if (!empty($fetched_data['album_name']) || !empty($fetched_data['multi_image']) && !$is_post_shared && !$is_this_post_shared) {
            $query_delete_4 = mysqli_query($sqlConnect, "SELECT `image` FROM " . T_ALBUMS_MEDIA . " WHERE `post_id` = {$post_id}");
            while ($fetched_delete_data = mysqli_fetch_assoc($query_delete_4)) {
                $explode2 = @end(explode('.', $fetched_delete_data['image']));
                $explode3 = @explode('.', $fetched_delete_data['image']);
                $media_2  = $explode3[0] . '_small.' . $explode2;
                @unlink(trim($media_2));
                @unlink($fetched_delete_data['image']);
                $delete_from_s3 = Wo_DeleteFromToS3($media_2);
                $delete_from_s3 = Wo_DeleteFromToS3($fetched_delete_data['image']);
            }
        }
        $query_two_2 = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_COMMENTS . " WHERE `post_id` = {$post_id}");
        while ($fetched_data = mysqli_fetch_assoc($query_two_2)) {
            Wo_DeletePostComment($fetched_data['id']);
        }
        $product    = Wo_PostData($post_id);
        $product_id = $product['product_id'];
        if (!empty($product_id) && !$is_post_shared && !$is_this_post_shared) {
            $query_two_3 = mysqli_query($sqlConnect, "SELECT `image` FROM " . T_PRODUCTS_MEDIA . " WHERE `product_id` = {$product_id}");
            while ($fetched_data = mysqli_fetch_assoc($query_two_3)) {
                $explode2 = @end(explode('.', $fetched_data['image']));
                $explode3 = @explode('.', $fetched_data['image']);
                $media_2  = $explode3[0] . '_small.' . $explode2;
                @unlink(trim($media_2));
                @unlink($fetched_data['image']);
                $delete_from_s3 = Wo_DeleteFromToS3($media_2);
                $delete_from_s3 = Wo_DeleteFromToS3($fetched_data['image']);
            }
        }
        $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_POSTS . " WHERE `id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_POSTS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_ALBUMS_MEDIA . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENTS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_WONDERS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_LIKES . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_SAVED_POSTS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_REPORTS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_PINNED_POSTS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_ACTIVITIES . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_PRODUCTS_MEDIA . " WHERE `product_id` = {$product_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_PRODUCTS . " WHERE `id` = {$product_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_POLLS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_VOTES . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_HIDDEN_POSTS . " WHERE `post_id` = {$post_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_REACTIONS . " WHERE `post_id` = '{$post_id}'");

        if ($is_me > 0) {
            Wo_RegisterPoint($post_id, "createpost", "-");
        }

        return true;
    } else {
        return false;
    }
}
function Wo_DeleteGame($game_id) {
    global $wo, $sqlConnect, $cache;
    if ($game_id < 1 || empty($game_id) || !is_numeric($game_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    $game_id      = Wo_Secure($game_id);
    $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_GAMES . " WHERE `id` = {$game_id}");
    $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_GAMES_PLAYERS . " WHERE `game_id` = {$game_id}");
    if ($query_delete) {
        return true;
    } else {
        return false;
    }
}
function Wo_DeleteGift($gift_id) {
    global $wo, $sqlConnect, $cache;
    if ($gift_id < 1 || empty($gift_id) || !is_numeric($gift_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    $gift_id      = Wo_Secure($gift_id);
    $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_GIFTS . " WHERE `id` = {$gift_id}");
    $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_USERGIFTS . " WHERE `gift_id` = {$gift_id}");
    $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `type2` = 'gift_{$gift_id}'");
    if ($query_delete) {
        return true;
    } else {
        return false;
    }
}
function Wo_DeleteSticker($sticker_id) {
    global $wo, $sqlConnect, $cache;
    if ($sticker_id < 1 || empty($sticker_id) || !is_numeric($sticker_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    $sticker_id      = Wo_Secure($sticker_id);
    $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_STICKERS . " WHERE `id` = {$sticker_id}");
    // $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_USERGIFTS . " WHERE `gift_id` = {$gift_id}");
    // $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `type2` = 'gift_{$gift_id}'");
    if ($query_delete) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetUserIdFromPostId($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `user_id` FROM " . T_POSTS . " WHERE `id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['user_id'];
    }
}
function Wo_GetPinnedPost($user_id, $type = '') {
    global $sqlConnect, $wo;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $query_type = 'user_id';
    if ($type == 'page') {
        $query_type = 'page_id';
    } else if ($type == 'profile') {
        $query_type = 'user_id';
    } else if ($type == 'group') {
        $query_type = 'group_id';
    } else if ($type == 'event') {
        $query_type = 'event_id';
    }
    $data      = array();
    $query_one = mysqli_query($sqlConnect, "SELECT `post_id` FROM " . T_PINNED_POSTS . " WHERE `{$query_type}` = {$user_id} AND `active` = '1'");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $post = Wo_PostData($fetched_data['post_id']);
        if (is_array($post)) {
            $data[] = $post;
        }
    }
    return $data;
}
function Wo_IsPostPinned($post_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `pinned` FROM " . T_PINNED_POSTS . " WHERE `post_id` = {$post_id} AND `active` = '1'");
    $sql_query_one = mysqli_fetch_assoc($query_one);
    return ($sql_query_one['pinned'] == 1) ? true : false;
}
function Wo_IsUserPinned($id, $type = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id         = Wo_Secure($id);
    $query_type = 'user_id';
    if ($type == 'page') {
        $query_type = 'page_id';
    } else if ($type == 'profile') {
        $query_type = 'user_id';
    } else if ($type == 'group') {
        $query_type = 'group_id';
    } else if ($type == 'event') {
        $query_type = 'event_id';
    }
    $query_one     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `pinned` FROM " . T_PINNED_POSTS . " WHERE `{$query_type}` = {$id} AND `active` = '1'");
    $sql_query_one = mysqli_fetch_assoc($query_one);
    return ($sql_query_one['pinned'] == 1) ? true : false;
}
function Wo_PinPost($post_id = 0, $type = '', $id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id  = Wo_Secure($wo['user']['user_id']);
    $post_id  = Wo_Secure($post_id);
    $continue = false;
    if (empty($type)) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    if (Wo_PostExists($post_id) === false) {
        return false;
    }
    if (Wo_IsPostOnwer($post_id, $user_id) === false) {
        return false;
    }
    if ($type == 'page') {
        if (Wo_IsPageOnwer($id) === false) {
            return false;
        }
        $where_delete_query = " WHERE `page_id` = {$id} AND `active` = '1'";
        $where_insert_query = " (`page_id`, `post_id`, `active`) VALUES ({$id}, {$post_id}, '1')";
    } else if ($type == 'group') {
        if (Wo_IsGroupOnwer($id) === false) {
            return false;
        }
        $where_delete_query = " WHERE `group_id` = {$id} AND `active` = '1'";
        $where_insert_query = " (`group_id`, `post_id`, `active`) VALUES ({$id}, {$post_id}, '1')";
    } else if ($type == 'event') {
        if (Is_EventOwner($id) === false) {
            return false;
        }
        $where_delete_query = " WHERE `event_id` = {$id} AND `active` = '1'";
        $where_insert_query = " (`event_id`, `post_id`, `active`) VALUES ({$id}, {$post_id}, '1')";
    } else if ($type == 'profile') {
        $where_delete_query = " WHERE `user_id` = {$user_id} AND `active` = '1'";
        $where_insert_query = " (`user_id`, `post_id`, `active`) VALUES ({$user_id}, {$post_id}, '1')";
    }
    $delete_query_text = "DELETE FROM " . T_PINNED_POSTS;
    $query_text        = $delete_query_text . $where_delete_query;
    $insert_query_text = "INSERT INTO " . T_PINNED_POSTS;
    $insert_text       = $insert_query_text . $where_insert_query;
    if (Wo_IsPostPinned($post_id)) {
        $query_two = mysqli_query($sqlConnect, $query_text);
        return 'unpin';
    } else {
        if (Wo_IsUserPinned($id, $type)) {
            $query_two = mysqli_query($sqlConnect, $query_text);
            $continue  = true;
        } else {
            $continue = true;
        }
        if ($continue === true) {
            $query_three = mysqli_query($sqlConnect, $insert_text);
            if ($query_three) {
                return 'pin';
            }
        }
    }
}
function Wo_BoostPost($post_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['pro'] == 0) {
        return false;
    }
    if ($wo['user']['is_pro'] == 0 || $wo['user']['pro_type'] == 1) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $post_id = Wo_Secure($post_id);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    if (Wo_PostExists($post_id) === false) {
        return false;
    }
    if (Wo_IsPostOnwer($post_id, $user_id) === false) {
        return false;
    }
    if (Wo_IsPostBoosted($post_id)) {
        $query_text = "UPDATE " . T_POSTS . " SET `boosted` = '0' WHERE `id` = '{$post_id}' AND (`user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id}))";
        $query_two  = mysqli_query($sqlConnect, $query_text);
        return 'unboosted';
    } else {
        $query_select       = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_POSTS . " WHERE `boosted` = '1' AND (`user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id}))");
        $query_select_fetch = mysqli_fetch_assoc($query_select);
        $query_textt        = "UPDATE " . T_POSTS . " SET `boosted` = '0' WHERE `id` IN (SELECT * FROM (SELECT `id` FROM " . T_POSTS . " WHERE `boosted` = '1' AND (`user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id})) ORDER BY `id` DESC LIMIT 1) as t)";
        $continue           = 0;
        if ($wo['user']['pro_type'] == 2) {
            if ($query_select_fetch['count'] > ($wo['config']['monthly_boosts'] - 1)) {
                $continue = 1;
            }
        } else if ($wo['user']['pro_type'] == 3) {
            if ($query_select_fetch['count'] > ($wo['config']['yearly_boosts'] - 1)) {
                $continue = 1;
            }
        } else if ($wo['user']['pro_type'] == 4) {
            if ($query_select_fetch['count'] == ($wo['config']['lifetime_boosts'] - 1)) {
                $continue = 1;
            }
        }
        if ($continue == 1) {
            $query_two = mysqli_query($sqlConnect, $query_textt);
        }
        $query_text = "UPDATE " . T_POSTS . " SET `boosted` = '1' WHERE `id` = '{$post_id}' AND (`user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id}))";
        $query_two  = mysqli_query($sqlConnect, $query_text);
        return 'boosted';
    }
}
function Wo_IsPostBoosted($post_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `count` FROM " . T_POSTS . " WHERE `id` = {$post_id} AND `boosted` = '1'");
    $sql_query_one = mysqli_fetch_assoc($query_one);
    return ($sql_query_one['count'] == 1) ? true : false;
}
function Wo_RegisterActivity($data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['user']['show_activities_privacy'] == 0) {
        return false;
    }
    if (!empty($data['post_id'])) {
        if (!is_numeric($data['post_id']) || $data['post_id'] < 1) {
            return false;
        }
    }
    if (empty($data['user_id']) || !is_numeric($data['user_id']) || $data['user_id'] < 1) {
        return false;
    }
    if (empty($data['activity_type'])) {
        return false;
    }

    $comment_id = 0;
    if (empty($data['comment_id']) || !is_numeric($data['comment_id']) || $data['comment_id'] < 1) {
        $comment_id = 0;
    }else{
        $comment_id = Wo_Secure($data['comment_id']);
    }

    $replay_id = 0;
    if (empty($data['reply_id']) || !is_numeric($data['reply_id']) || $data['reply_id'] < 1) {
        $replay_id = 0;
    }else{
        $replay_id = Wo_Secure($data['reply_id']);
    }

    $follow_id = 0;
    if (empty($data['follow_id']) || !is_numeric($data['follow_id']) || $data['follow_id'] < 1) {
        $follow_id = 0;
    }else{
        $follow_id = Wo_Secure($data['follow_id']);
    }


    @$post_id       = Wo_Secure($data['post_id']);
    @$user_id       = Wo_Secure($data['user_id']);
    @$post_user_id  = Wo_Secure($data['post_user_id']);
    @$activity_type = Wo_Secure($data['activity_type']);
    @$follow_id     = Wo_Secure($data['follow_id']);
    $time          = time();

    if( $comment_id > 0 || $replay_id > 0 ){

    }else{
        if ($user_id == $post_user_id) {
            return false;
        }
    }

    $query_insert = "INSERT INTO " . T_ACTIVITIES . " (`user_id`, `post_id`,`comment_id`,`reply_id`, `follow_id`, `activity_type`, `time`) VALUES ('{$user_id}', '{$post_id}', '{$comment_id}','{$replay_id}','{$follow_id}','{$activity_type}', '{$time}')";

    if (Wo_IsActivity($post_id, $comment_id, $replay_id, $follow_id, $user_id, $activity_type) === true) {
        $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_ACTIVITIES . " WHERE `user_id` = '{$user_id}' AND `post_id` = '{$post_id}'");
        if ($query_delete) {
            $query_one = mysqli_query($sqlConnect, $query_insert);
        }
    } else {
        $query_one = mysqli_query($sqlConnect, $query_insert);
    }
    if ($query_one) {
        return true;
    }
}
function Wo_IsActivity($post_id, $comment_id, $replay_id, $follow_id,  $user_id, $activity_type) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_ACTIVITIES . " WHERE `user_id` = '{$user_id}' AND ( `post_id` = '{$post_id}' OR `comment_id` = '{$comment_id}' OR `reply_id` = '{$replay_id}' OR `follow_id` = '{$follow_id}' ) AND `activity_type` = '{$activity_type}'");
    return (mysqli_num_rows($query) > 0) ? true : false;
}
function Wo_DeleteSelectedActivity($user_id, $activity_type, $follow_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($follow_id) || !is_numeric($follow_id) || $follow_id < 1) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_ACTIVITIES . " WHERE `user_id` = '{$user_id}' AND `follow_id` = '{$follow_id}' AND `activity_type` = '{$activity_type}'");
    return ($query) ? true : false;
}
function Wo_DeleteActivity($post_id, $user_id, $activity_type) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_ACTIVITIES . " WHERE `user_id` = '{$user_id}' AND `post_id` = '{$post_id}' AND `activity_type` = '{$activity_type}'");
    return ($query) ? true : false;
}
function Wo_GetActivity($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (empty($id) || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_ACTIVITIES . " WHERE `id` = {$id}");
    if (mysqli_num_rows($query) == 1) {
        $finel_fetched_data              = mysqli_fetch_assoc($query);
        $finel_fetched_data['postData']  = Wo_PostData($finel_fetched_data['post_id']);
        $finel_fetched_data['activator'] = Wo_UserData($finel_fetched_data['user_id']);
        return $finel_fetched_data;
    }
}
function Wo_GetActivities($data = array('after_activity_id' => 0, 'before_activity_id' => 0, 'limit' => 5, 'me' => false)) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $get     = array();
    if (empty($data['limit'])) {
        $data['limit'] = 5;
    }
    $limit        = Wo_Secure($data['limit']);
    $subquery_one = " `id` > 0 ";
    if (!empty($data['after_activity_id']) && is_numeric($data['after_activity_id']) && $data['after_activity_id'] > 0) {
        $data['after_activity_id'] = Wo_Secure($data['after_activity_id']);
        $subquery_one              = " `id` < " . $data['after_activity_id'] . " AND `id` <> " . $data['after_activity_id'];
    } else if (!empty($data['before_activity_id']) && is_numeric($data['before_activity_id']) && $data['before_activity_id'] > 0) {
        $data['before_activity_id'] = Wo_Secure($data['before_activity_id']);
        $subquery_one               = " `id` > " . $data['before_activity_id'] . " AND `id` <> " . $data['before_activity_id'];
    }
    
    $query_text = "SELECT `id` FROM " . T_ACTIVITIES . " WHERE {$subquery_one}";
    if (!empty($data['me'])) {
        $query_text .= " AND user_id = '{$wo['user']['user_id']}'";
    } else {
        $query_text .= " AND `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `active` = '1') AND `user_id` NOT IN ($user_id)";
    }
    $query_text .= " ORDER BY `id` DESC LIMIT {$limit}";
    $sql_query_one = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        if (is_array($fetched_data)) {
            $get[] = Wo_GetActivity($fetched_data['id']);
        }
    }
    return $get;
}
function Wo_DeleteReactions($post_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    $post_id        = Wo_Secure($post_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsReacted($post_id, $wo['user']['user_id']) == true) {
        Wo_RegisterPoint($post_id, "reaction", '-');
        $query_one        = "DELETE FROM " . T_REACTIONS . " WHERE `post_id` = {$post_id} AND `user_id` = {$logged_user_id}";
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);
        return true;
    }
}
function Wo_DeleteCommentReactions($comment_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($comment_id) || !is_numeric($comment_id) || $comment_id < 1) {
        return false;
    }
    $comment_id         = Wo_Secure($comment_id);
    $logged_user_id     = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsReacted($comment_id, $wo['user']['user_id'], "comment") == true) {
        $query_one        = "DELETE FROM " . T_REACTIONS . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$logged_user_id}";
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);
        return true;
    }
}
function Wo_DeleteReplayReactions($replay_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($replay_id) || !is_numeric($replay_id) || $replay_id < 1) {
        return false;
    }
    $replay_id         = Wo_Secure($replay_id);
    $logged_user_id     = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsReacted($replay_id, $wo['user']['user_id'], "replay") == true) {
        $query_one        = "DELETE FROM " . T_REACTIONS . " WHERE `replay_id` = {$replay_id} AND `user_id` = {$logged_user_id}";
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);
        return true;
    }
}
function Wo_AddReactions($post_id, $reaction) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || empty($reaction) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    $post_id        = Wo_Secure($post_id);
    $user_id        = Wo_GetUserIdFromPostId($post_id);
    $page_id        = 0;
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post           = Wo_PostData($post_id);
    $text           = 'post';
    $type2          = $reaction;
    if (empty($user_id)) {
        $user_id = Wo_GetUserIdFromPageId($post['page_id']);
        if (empty($user_id)) {
            return false;
        }
    }
    if (Wo_IsReacted($post_id, $wo['user']['user_id']) == true) {
        $query_one        = "DELETE FROM " . T_REACTIONS . " WHERE `post_id` = {$post_id} AND `user_id` = {$logged_user_id}";
        $query_delete_one = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$user_id} AND `type` = 'reaction'");
        $delete_activity  = Wo_DeleteActivity($post_id, $logged_user_id, 'reaction');
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);

        //Register point level system for reaction
        Wo_RegisterPoint($post_id, "reaction" , "-");
    }
        $query_two     = "INSERT INTO " . T_REACTIONS . " (`user_id`, `post_id`, `reaction`) VALUES ({$logged_user_id}, {$post_id},'{$reaction}')";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            $activity_data = array(
                'post_id' => $post_id,
                'user_id' => $logged_user_id,
                'post_user_id' => $user_id,
                'activity_type' => 'reaction|post|'.$reaction
            );
            $add_activity  = Wo_RegisterActivity($activity_data);
            $notification_data_array = array(
                'recipient_id' => $user_id,
                'post_id' => $post_id,
                'type' => 'reaction',
                'text' => $text,
                'type2' => $type2,
                'url' => 'index.php?link1=post&id=' . $post_id
            );
            Wo_RegisterNotification($notification_data_array);

            //Register point level system for reaction
            Wo_RegisterPoint($post_id, "reaction");

            return 'reacted';
        }
}
function Wo_AddReplayReactions($user_id,$reply_id, $reaction) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($reply_id) || empty($reaction) || !is_numeric($reply_id) || $reply_id < 1) {
        return false;
    }
    $reply_id        = Wo_Secure($reply_id);
    $page_id         = 0;
    $logged_user_id  = Wo_Secure($wo['user']['user_id']);
    $comment         = Wo_GetCommentIdFromReplyId($reply_id);
    $post_id         = Wo_GetPostIdFromCommentId($comment);
    $text            = 'replay';
    $type2           = $reaction;
    if (empty($user_id)) {
        return false;
    }
    if (Wo_IsReacted($reply_id, $wo['user']['user_id'], "replay") == true) {
        $query_one        = "DELETE FROM " . T_REACTIONS . " WHERE `replay_id` = {$reply_id} AND `user_id` = {$logged_user_id}";
        $query_delete_one = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `reply_id` = {$reply_id} AND `recipient_id` = {$user_id} AND `type` = 'reaction'");
        $delete_activity  = Wo_DeleteActivity($reply_id, $logged_user_id, 'reaction');
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);

        //Register point level system for reaction
        //Wo_RegisterPoint($post_id, "reaction" , "-");
    }
        $query_two     = "INSERT INTO " . T_REACTIONS . " (`user_id`, `replay_id`, `reaction`) VALUES ({$logged_user_id}, {$reply_id},'{$reaction}')";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            // $activity_data = array(
            //     'post_id' => $post_id,
            //     'reply_id' => $reply_id,
            //     'user_id' => $logged_user_id,
            //     'post_user_id' => $user_id,
            //     'activity_type' => 'reaction|replay|'.$reaction
            // );
            // $add_activity  = Wo_RegisterActivity($activity_data);
            $notification_data_array = array(
                'recipient_id' => $user_id,
                'reply_id' => $reply_id,
                'type' => 'reaction',
                'text' => $text,
                'type2' => $type2,
                'url' => 'index.php?link1=post&id=' . $post_id . '&ref=' . $comment
            );
            Wo_RegisterNotification($notification_data_array);

            //Register point level system for reaction
            //Wo_RegisterPoint($post_id, "reaction");

            return 'reacted';
        }
}
function Wo_AddCommentReactions($comment_id, $reaction) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($comment_id) || empty($reaction) || !is_numeric($comment_id) || $comment_id < 1) {
        return false;
    }
    $comment_id     = Wo_Secure($comment_id);
    $user_id        = Wo_GetUserIdFromCommentId($comment_id);
    $page_id        = 0;
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post_id        = Wo_GetPostIdFromCommentId($comment_id);
    $text           = 'comment';
    $type2          = $reaction;
    if (empty($user_id)) {
        return false;
    }

    if (Wo_IsReacted($comment_id, $logged_user_id, "comment") == true) {
        $query_one        = "DELETE FROM " . T_REACTIONS . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$logged_user_id}";
        $query_delete_one = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `comment_id` = {$comment_id} AND `recipient_id` = {$user_id} AND `type` = 'reaction'");
        $delete_activity  = Wo_DeleteActivity($comment_id, $logged_user_id, 'reaction');
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);

        //Register point level system for reaction
        //Wo_RegisterPoint($post_id, "reaction" , "-");
    }
        $query_two     = "INSERT INTO " . T_REACTIONS . " (`user_id`, `comment_id`, `reaction`) VALUES ({$logged_user_id}, {$comment_id},'{$reaction}')";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            // $activity_data = array(
            //     'post_id' => $post_id,
            //     'comment_id' => $comment_id,
            //     'user_id' => $logged_user_id,
            //     'post_user_id' => $user_id,
            //     'activity_type' => 'reaction|comment|'.$reaction
            // );
            //$add_activity  = Wo_RegisterActivity($activity_data);
            $notification_data_array = array(
                'recipient_id' => $user_id,
                'comment_id' => $comment_id,
                'type' => 'reaction',
                'text' => $text,
                'type2' => $type2,
                'url' => 'index.php?link1=post&id=' . $post_id . '&ref=' . $comment_id
            );
            Wo_RegisterNotification($notification_data_array);

            //Register point level system for reaction
            //Wo_RegisterPoint($post_id, "reaction");

            return 'reacted';
        }
}
function Wo_IsReacted($object_id, $user_id, $col = "post") {
    global $sqlConnect;
    if (empty($object_id) or !is_numeric($object_id) or $object_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $object_id     = Wo_Secure($object_id);
    $query_one     = "SELECT `id` FROM " . T_REACTIONS . " WHERE `{$col}_id` = {$object_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_GetReactedTextIcon($object_id, $user_id, $col = "post") {
    global $sqlConnect,$wo;
    if (empty($object_id) or !is_numeric($object_id) or $object_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $object_id     = Wo_Secure($object_id);
    $query_one     = "SELECT `reaction` FROM " . T_REACTIONS . " WHERE `{$col}_id` = {$object_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        $reaction_icon = "";
        $reaction_color = "";
        if (!file_exists('./themes/' . $wo['config']['theme'] . '/reaction/like-sm.png')) {
        
        switch ($sql_fetch_one['reaction']) {
            case 'Like':
                $reaction_icon = '<div class="inline_post_emoji no_anim"><div class="emoji emoji--like"><div class="emoji__hand"><div class="emoji__thumb"></div></div></div></div>';
                $reaction_color = '#1da1f2';
                break;
            case 'Love':
                $reaction_icon = '<div class="inline_post_emoji no_anim"><div class="emoji emoji--love"><div class="emoji__heart"></div></div></div>';
                $reaction_color = '#f25268';
                break;
            case 'HaHa':
                $reaction_icon = '<div class="inline_post_emoji no_anim"><div class="emoji emoji--haha"><div class="emoji__face"><div class="emoji__eyes"></div><div class="emoji__mouth"><div class="emoji__tongue"></div></div></div></div></div>';
                $reaction_color = '#f3b715';
                break;
            case 'Wow':
                $reaction_icon = '<div class="inline_post_emoji no_anim"><div class="emoji emoji--wow"><div class="emoji__face"><div class="emoji__eyebrows"></div><div class="emoji__eyes"></div><div class="emoji__mouth"></div></div></div></div>';
                $reaction_color = '#f3b715';
                break;
            case 'Sad':
                $reaction_icon = '<div class="inline_post_emoji no_anim"><div class="emoji emoji--sad"><div class="emoji__face"><div class="emoji__eyebrows"></div><div class="emoji__eyes"></div><div class="emoji__mouth"></div></div></div></div>';
                $reaction_color = '#f3b715';
                break;
            case 'Angry':
                $reaction_icon = '<div class="inline_post_emoji no_anim"><div class="emoji emoji--angry"><div class="emoji__face"><div class="emoji__eyebrows"></div><div class="emoji__eyes"></div><div class="emoji__mouth"></div></div></div></div>';
                $reaction_color = '#f7806c';
                break;
        }
        }
        else{
        
            switch ($sql_fetch_one['reaction']) {
                case 'Like':
                    $reaction_icon = '<div class="inline_post_emoji"><img class="" src="' . $wo['config']['theme_url'] . '/reaction/like-sm.png" alt="' . $wo['lang']['like'] . '"></div>';
                    $reaction_color = '#1da1f2';
                    break;
                case 'Love':
                    $reaction_icon = '<div class="inline_post_emoji"><img class="" src="' . $wo['config']['theme_url'] . '/reaction/love-sm.png" alt="' . $wo['lang']['love'] . '"></div>';
                    $reaction_color = '#f25268';
                    break;
                case 'HaHa':
                    $reaction_icon = '<div class="inline_post_emoji"><img class="" src="' . $wo['config']['theme_url'] . '/reaction/haha-sm.png" alt="' . $wo['lang']['haha'] . '"></div>';
                    $reaction_color = '#f3b715';
                    break;
                case 'Wow':
                    $reaction_icon = '<div class="inline_post_emoji"><img class="" src="' . $wo['config']['theme_url'] . '/reaction/wow-sm.png" alt="' . $wo['lang']['wow'] . '"></div>';
                    $reaction_color = '#f3b715';
                    break;
                case 'Sad':
                    $reaction_icon = '<div class="inline_post_emoji"><img class="" src="' . $wo['config']['theme_url'] . '/reaction/sad-sm.png" alt="' . $wo['lang']['sad'] . '"></div>';
                    $reaction_color = '#f3b715';
                    break;
                case 'Angry':
                    $reaction_icon = '<div class="inline_post_emoji"><img class="" src="' . $wo['config']['theme_url'] . '/reaction/angry-sm.png" alt="' . $wo['lang']['angry'] . '"></div>';
                    $reaction_color = '#f7806c';
                    break;
            }
        }

        return '<span class="status-reaction-'.$object_id.' active-like">' . $reaction_icon . '<span style="color: '. $reaction_color .';"> '.$wo['lang'][strtolower($sql_fetch_one['reaction'])].'</span></span>';
    }
}
function Wo_CountReactions($object_id, $reaction, $col = "post") {
    global $sqlConnect;
    if (empty($object_id) or !is_numeric($object_id) or $object_id < 1) {
        return false;
    }
    if (empty($reaction)) {
        return false;
    }
    $object_id     = Wo_Secure($object_id);
    $query_one     = "SELECT COUNT(`id`) AS `reactions` FROM " . T_REACTIONS . " WHERE `{$col}_id` = {$object_id} AND `reaction` = '{$reaction}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['reactions'];
    }
}
function Wo_GetPostReactions($object_id, $col = "post") {
   global $sqlConnect,$wo;
   if (empty($object_id) or !is_numeric($object_id) or $object_id < 1) {
       return false;
   }
   $reactions_html = "";
   $reactions     = array();
   $reactions_count = 0;
   $object_id     = Wo_Secure($object_id);
   $query_one     = "SELECT `reaction` FROM " . T_REACTIONS . " WHERE `{$col}_id` = {$object_id}";
   $sql_query_one = mysqli_query($sqlConnect, $query_one);
   while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
       $reactions[$fetched_data['reaction']] = $fetched_data['reaction'];
       $reactions_count++;
   }

   if( !empty($reactions) ){
       foreach( $reactions as $key => $val ){
        if (!file_exists('./themes/' . $wo['config']['theme'] . '/reaction/like-sm.png')) {
           
           switch (strtolower($key)) {
               case 'like':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji no_anim'><div class='emoji emoji--like'><div class='emoji__hand'><div class='emoji__thumb'></div></div></div></div></span>";
                   break;
               case 'love':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji no_anim'><div class='emoji emoji--love'><div class='emoji__heart'></div></div></div></span>";
                   break;
               case 'haha':
                  $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji no_anim'><div class='emoji emoji--haha'><div class='emoji__face'><div class='emoji__eyes'></div><div class='emoji__mouth'><div class='emoji__tongue'></div></div></div></div></div></span>";
                   break;
               case 'wow':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji no_anim'><div class='emoji emoji--wow'><div class='emoji__face'><div class='emoji__eyebrows'></div><div class='emoji__eyes'></div><div class='emoji__mouth'></div></div></div></div></span>";
                   break;
               case 'sad':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji no_anim'><div class='emoji emoji--sad'><div class='emoji__face'><div class='emoji__eyebrows'></div><div class='emoji__eyes'></div><div class='emoji__mouth'></div></div></div></div></span>";
                   break;
               case 'angry':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji no_anim'><div class='emoji emoji--angry'><div class='emoji__face'><div class='emoji__eyebrows'></div><div class='emoji__eyes'></div><div class='emoji__mouth'></div></div></div></div></span>";
                   break;
           }
        }
        else{

           
           switch (strtolower($key)) {
               case 'like':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji'><img src='{$wo['config']['theme_url']}/reaction/like-sm.png' alt=\"" . $wo['lang']['like'] . "\"></div></span>";
                   break;
               case 'love':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji'><img src='{$wo['config']['theme_url']}/reaction/love-sm.png' alt=\"" . $wo['lang']['love'] . "\"></div></span>";
                   break;
               case 'haha':
                  $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji'><img src='{$wo['config']['theme_url']}/reaction/haha-sm.png' alt=\"" . $wo['lang']['haha'] . "\"></div></span>";
                   break;
               case 'wow':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji'><img src='{$wo['config']['theme_url']}/reaction/wow-sm.png' alt=\"" . $wo['lang']['wow'] . "\"></div></span>";
                   break;
               case 'sad':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji'><img src='{$wo['config']['theme_url']}/reaction/sad-sm.png' alt=\"" . $wo['lang']['sad'] . "\"></div></span>";
                   break;
               case 'angry':
                   $reactions_html .= "<span class=\"how_reacted like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"><div class='inline_post_count_emoji'><img src='{$wo['config']['theme_url']}/reaction/angry-sm.png' alt=\"" . $wo['lang']['angry'] . "\"></div></span>";
                   break;
           }
        }
           //$reactions_html .= "<span class=\"like-btn-".strtolower($key)."\" id=\"_".$col.$object_id."\" onclick=\"Wo_OpenPostReactedUsers(".$object_id.",'".strtolower($key)."');\"></span>";
       }
       return $reactions_html . "<span class=\"how_many_reacts\">".$reactions_count."</span>";
   }else{
       return "";
   }
}
function Wo_AddLikes($post_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    $post_id        = Wo_Secure($post_id);
    $user_id        = Wo_GetUserIdFromPostId($post_id);
    $page_id        = 0;
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post           = Wo_PostData($post_id);
    $text           = '';
    $type2          = '';
    if (empty($user_id)) {
        $user_id = Wo_GetUserIdFromPageId($post['page_id']);
        if (empty($user_id)) {
            return false;
        }
    }
    if (isset($post['postText']) && !empty($post['postText'])) {
        $text = substr($post['postText'], 0, 10) . '..';
    }
    if (isset($post['postYoutube']) && !empty($post['postYoutube'])) {
        $type2 = 'post_youtube';
    } elseif (isset($post['postSoundCloud']) && !empty($post['postSoundCloud'])) {
        $type2 = 'post_soundcloud';
    } elseif (isset($post['postVine']) && !empty($post['postVine'])) {
        $type2 = 'post_vine';
    } elseif (isset($post['postFile']) && !empty($post['postFile'])) {
        if (strpos($post['postFile'], '_image') !== false) {
            $type2 = 'post_image';
        } else if (strpos($post['postFile'], '_video') !== false) {
            $type2 = 'post_video';
        } else if (strpos($post['postFile'], '_avatar') !== false) {
            $type2 = 'post_avatar';
        } else if (strpos($post['postFile'], '_sound') !== false) {
            $type2 = 'post_soundFile';
        } else if (strpos($post['postFile'], '_cover') !== false) {
            $type2 = 'post_cover';
        } else if (strpos($post['postFile'], '_cover') !== false) {
            $type2 = 'post_cover';
        } else {
            $type2 = 'post_file';
        }
    }
    if (Wo_IsLiked($post_id, $wo['user']['user_id']) === true) {
        $query_one        = "DELETE FROM " . T_LIKES . " WHERE `post_id` = {$post_id} AND `user_id` = {$logged_user_id}";
        $query_delete_one = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$user_id} AND `type` = 'liked_post'");
        $delete_activity  = Wo_DeleteActivity($post_id, $logged_user_id, 'liked_post');
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {

            //Register point level system for unlikes 
            Wo_RegisterPoint($post_id, "likes", "-");

            return 'unliked';
        }
    } else {
        if ($wo['config']['second_post_button'] == 'dislike' && Wo_IsWondered($post_id, $wo['user']['user_id'])) {
            Wo_AddWonders($post_id);
        }
        $query_two     = "INSERT INTO " . T_LIKES . " (`user_id`, `post_id`) VALUES ({$logged_user_id}, {$post_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            if ($type2 != 'post_avatar') {
                $activity_data = array(
                    'post_id' => $post_id,
                    'user_id' => $logged_user_id,
                    'post_user_id' => $user_id,
                    'activity_type' => 'liked_post'
                );
                $add_activity  = Wo_RegisterActivity($activity_data);
            }
            $notification_data_array = array(
                'recipient_id' => $user_id,
                'post_id' => $post_id,
                'type' => 'liked_post',
                'text' => $text,
                'type2' => $type2,
                'url' => 'index.php?link1=post&id=' . $post_id
            );
            Wo_RegisterNotification($notification_data_array);

            //Register point level system for likes
            Wo_RegisterPoint($post_id, "likes");

            return 'liked';
        }
    }
}
function Wo_CountLikes($post_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT COUNT(`id`) AS `likes` FROM " . T_LIKES . " WHERE `post_id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['likes'];
    }
}
function Wo_IsLiked($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `id` FROM " . T_LIKES . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_IsUserPostReacted($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `id` FROM " . T_REACTIONS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_IsCommented($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }

    $query_one     = "SELECT `id` FROM " . T_COMMENTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
    return false;
}
function Wo_AddWonders($post_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($post_id) or empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id        = Wo_Secure($post_id);
    $user_id        = Wo_GetUserIdFromPostId($post_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post           = Wo_PostData($post_id);
    if (empty($user_id)) {
        $user_id = Wo_GetUserIdFromPageId($post['page_id']);
        if (empty($user_id)) {
            return false;
        }
    }
    $text  = '';
    $type2 = '';
    if (isset($post['postText']) && !empty($post['postText'])) {
        $text = substr($post['postText'], 0, 10) . '..';
    }
    if (isset($post['postYoutube']) && !empty($post['postYoutube'])) {
        $type2 = 'post_youtube';
    } elseif (isset($post['postSoundCloud']) && !empty($post['postSoundCloud'])) {
        $type2 = 'post_soundcloud';
    } elseif (isset($post['postVine']) && !empty($post['postVine'])) {
        $type2 = 'post_vine';
    } elseif (isset($post['postFile']) && !empty($post['postFile'])) {
        if (strpos($post['postFile'], '_image') !== false) {
            $type2 = 'post_image';
        } else if (strpos($post['postFile'], '_video') !== false) {
            $type2 = 'post_video';
        } else if (strpos($post['postFile'], '_avatar') !== false) {
            $type2 = 'post_avatar';
        } else if (strpos($post['postFile'], '_sound') !== false) {
            $type2 = 'post_soundFile';
        } else if (strpos($post['postFile'], '_cover') !== false) {
            $type2 = 'post_cover';
        } else {
            $type2 = 'post_file';
        }
    }
    if (Wo_IsWondered($post_id, $logged_user_id) === true) {
        $query_one        = "DELETE FROM " . T_WONDERS . " WHERE `post_id` = {$post_id} AND `user_id` = {$logged_user_id}";
        $query_delete_one = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$user_id} AND `type` = 'wondered_post' ");
        $delete_activity  = Wo_DeleteActivity($post_id, $logged_user_id, 'wondered_post');
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            if ($wo['config']['second_post_button'] == 'dislike') {
                //Register point level system for dislikes -
                Wo_RegisterPoint($post_id, "dislikes", "-");
            }else if ($wo['config']['second_post_button'] == 'wonder') {
                //Register point level system for wonders -
                Wo_RegisterPoint($post_id, "wonders", "-");
            }
            return 'unwonder';
        }
    } else {
        if ($wo['config']['second_post_button'] == 'dislike' && Wo_IsLiked($post_id, $wo['user']['user_id'])) {
            Wo_AddLikes($post_id);
        }
        $query_two     = "INSERT INTO " . T_WONDERS . " (`user_id`, `post_id`) VALUES ({$logged_user_id}, {$post_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            if ($type2 != 'post_avatar') {
                $activity_data = array(
                    'post_id' => $post_id,
                    'user_id' => $logged_user_id,
                    'post_user_id' => $user_id,
                    'activity_type' => 'wondered_post'
                );
                $add_activity  = Wo_RegisterActivity($activity_data);
            }
            $notification_data_array = array(
                'recipient_id' => $user_id,
                'post_id' => $post_id,
                'type' => 'wondered_post',
                'text' => $text,
                'type2' => $type2,
                'url' => 'index.php?link1=post&id=' . $post_id
            );
            Wo_RegisterNotification($notification_data_array);
            if ($wo['config']['second_post_button'] == 'dislike') {
                //Register point level system for dislikes +
                Wo_RegisterPoint($post_id, "dislikes");
            }else if ($wo['config']['second_post_button'] == 'wonder') {
                //Register point level system for wonders +
                Wo_RegisterPoint($post_id, "wonders");
            }
            return 'wonder';
        }
    }
}
function Wo_CountWonders($post_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT COUNT(`id`) AS `wonders` FROM " . T_WONDERS . " WHERE `post_id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['wonders'];
    }
}
function Wo_IsWondered($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `id` FROM " . T_WONDERS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_GetPostLikes($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $data          = array();
    $query_one     = "SELECT `user_id` FROM " . T_LIKES . " WHERE `post_id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetPostReactionUsers($post_id = 0, $type="like") {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $data          = array();
    $query_one     = "SELECT `user_id`,`reaction` FROM " . T_REACTIONS . " WHERE `post_id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        if( strtolower( $fetched_data['reaction'] ) == $type ){
            $ud = Wo_UserData($fetched_data['user_id']);
            $ud['reaction'] = $fetched_data['reaction'];
            $data[] = $ud;
        }
    }
    return $data;
}
function Wo_GetPostWonders($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $data          = array();
    $query_one     = "SELECT `user_id` FROM " . T_WONDERS . " WHERE `post_id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_AddShare($post_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] !== true) {
        return false;
    }
    if (!isset($post_id) or empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id        = Wo_Secure($post_id);
    $user_id        = Wo_GetUserIdFromPostId($post_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post           = Wo_PostData($post_id);
    if (empty($user_id)) {
        $user_id = Wo_GetUserIdFromPageId($post['page_id']);
        if (empty($user_id)) {
            return false;
        }
    }
    $text  = '';
    $type2 = '';
    if (isset($post['postText']) && !empty($post['postText'])) {
        $text = substr($post['postText'], 0, 10) . '..';
    }
    if (isset($post['postYoutube']) && !empty($post['postYoutube'])) {
        $type2 = 'post_youtube';
    } elseif (isset($post['postSoundCloud']) && !empty($post['postSoundCloud'])) {
        $type2 = 'post_soundcloud';
    } elseif (isset($post['postVine']) && !empty($post['postVine'])) {
        $type2 = 'post_vine';
    } elseif (isset($post['postFile']) && !empty($post['postFile'])) {
        if (strpos($post['postFile'], '_image') !== false) {
            $type2 = 'post_image';
        } else if (strpos($post['postFile'], '_video') !== false) {
            $type2 = 'post_video';
        } else if (strpos($post['postFile'], '_avatar') !== false) {
            $type2 = 'post_avatar';
        } else if (strpos($post['postFile'], '_sound') !== false) {
            $type2 = 'post_soundFile';
        } else if (strpos($post['postFile'], '_cover') !== false) {
            $type2 = 'post_cover';
        } else {
            $type2 = 'post_file';
        }
    }
    if (Wo_IsShared($post_id, $logged_user_id)) {
        $query_one        = "DELETE FROM " . T_POSTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$logged_user_id} AND `postShare` = 1";
        $query_delete_one = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$user_id} AND `type` = 'share_post'");
        $delete_activity  = Wo_DeleteActivity($post_id, $logged_user_id, 'shared_post');
        $sql_query_one    = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            return 'unshare';
        }
    } else {
        $query_two        = "INSERT INTO " . T_POSTS . " (`user_id`, `post_id`, `time`, `postShare`) VALUES ({$logged_user_id}, {$post_id}, " . time() . ", 1)";
        $sql_query_two    = mysqli_query($sqlConnect, $query_two);
        $inserted_post_id = mysqli_insert_id($sqlConnect);
        if ($sql_query_two) {
            if ($type2 != 'post_avatar') {
                $activity_data = array(
                    'post_id' => $post_id,
                    'user_id' => $logged_user_id,
                    'post_user_id' => $user_id,
                    'activity_type' => 'shared_post'
                );
                $add_activity  = Wo_RegisterActivity($activity_data);
            }
            $notification_data_array = array(
                'recipient_id' => $user_id,
                'post_id' => $post_id,
                'type' => 'share_post',
                'text' => $text,
                'type2' => $type2,
                'url' => 'index.php?link1=post&id=' . $inserted_post_id
            );
            Wo_RegisterNotification($notification_data_array);
            return 'share';
        }
    }
}
function Wo_CountShares($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT COUNT(`id`) AS `shares` FROM " . T_POSTS . " WHERE `post_id` = {$post_id} AND `postShare` = 1";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['shares'];
    }
}
function Wo_IsShared($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `id` FROM " . T_POSTS . " WHERE `post_id`= {$post_id} AND `postShare` = 1 AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_RegisterPostComment($data = array()) {
    global $sqlConnect, $wo, $db;
    if (empty($data['post_id']) || !is_numeric($data['post_id']) || $data['post_id'] < 0) {
        return false;
    }
    if (empty($data['text']) && empty($data['c_file']) && empty($data['record'])) {
        return false;
    }
    if (empty($data['user_id']) || !is_numeric($data['user_id']) || $data['user_id'] < 0) {
        return false;
    }
    if (!empty($data['page_id'])) {
        if (Wo_IsPageOnwer($data['page_id']) === false) {
            $data['page_id'] = 0;
        }
    }
    $getPost = Wo_PostData($data['post_id']);
    if ($getPost['comments_status'] == 0) {
        return false;
    }
    
    if (!empty($data['text'])) {
        if ($wo['config']['maxCharacters'] > 0) {
            if (mb_strlen($data['text']) - 10 > $wo['config']['maxCharacters']) {
                return false;
            }
        }
        $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
        $i          = 0;
        preg_match_all($link_regex, $data['text'], $matches);
        foreach ($matches[0] as $match) {
            $match_url    = strip_tags($match);
            $syntax       = '[a]' . urlencode($match_url) . '[/a]';
            $data['text'] = str_replace($match, $syntax, $data['text']);
        }
        $mention_regex = '/@([A-Za-z0-9_]+)/i';
        preg_match_all($mention_regex, $data['text'], $matches);
        foreach ($matches[1] as $match) {
            $match         = Wo_Secure($match);
            $match_user    = Wo_UserData(Wo_UserIdFromUsername($match));
            $match_search  = '@' . $match;
            $match_replace = '@[' . $match_user['user_id'] . ']';
            if (isset($match_user['user_id'])) {
                $data['text'] = str_replace($match_search, $match_replace, $data['text']);
                $mentions[]   = $match_user['user_id'];
            }
        }
    }
    $hashtag_regex = '/#([^`~!@$%^&*\#()\-+=\\|\/\.,<>?\'\":;{}\[\]* ]+)/i';
    preg_match_all($hashtag_regex, $data['text'], $matches);
    foreach ($matches[1] as $match) {
        if (!is_numeric($match)) {
            $hashdata = Wo_GetHashtag($match);
            if (is_array($hashdata)) {
                $match_search  = '#' . $match;
                $match_replace = '#[' . $hashdata['id'] . ']';
                if (mb_detect_encoding($match_search, 'ASCII', true)) {
                    $data['text'] = preg_replace("/$match_search\b/i", $match_replace, $data['text']);
                } else {
                    $data['text'] = str_replace($match_search, $match_replace, $data['text']);
                }
                //$data['text']      = preg_replace("/$match_search\b/i", $match_replace,  $data['text']);
                //$data['text']      = str_replace($match_search, $match_replace, $data['text']);
                $hashtag_query     = "UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
                $hashtag_sql_query = mysqli_query($sqlConnect, $hashtag_query);
            }
        }
    }
    $post    = Wo_PostData($data['post_id']);
    $text    = '';
    $type2   = '';
    $page_id = 0;
    if (!empty($post['page_id']) && $post['page_id'] > 0) {
        $page_id = $post['page_id'];
    }
    if (isset($post['postText']) && !empty($post['postText'])) {
        $text = substr($post['postText'], 0, 10) . '..';
    }
    if (isset($post['postYoutube']) && !empty($post['postYoutube'])) {
        $type2 = 'post_youtube';
    } elseif (isset($post['postSoundCloud']) && !empty($post['postSoundCloud'])) {
        $type2 = 'post_soundcloud';
    } elseif (isset($post['postVine']) && !empty($post['postVine'])) {
        $type2 = 'post_vine';
    } elseif (isset($post['postFile']) && !empty($post['postFile'])) {
        if (strpos($post['postFile'], '_image') !== false) {
            $type2 = 'post_image';
        } else if (strpos($post['postFile'], '_video') !== false) {
            $type2 = 'post_video';
        } else if (strpos($post['postFile'], '_avatar') !== false) {
            $type2 = 'post_avatar';
        } else if (strpos($post['postFile'], '_sound') !== false) {
            $type2 = 'post_soundFile';
        } else if (strpos($post['postFile'], '_cover') !== false) {
            $type2 = 'post_cover';
        } else {
            $type2 = 'post_file';
        }
    }
    $user_id = Wo_GetUserIdFromPostId($data['post_id']);
    if (empty($user_id)) {
        $user_id = Wo_GetUserIdFromPageId($post['page_id']);
        if (empty($user_id)) {
            return false;
        }
    }
    if (empty($data['page_id'])) {
        $data['page_id'] = 0;
    }
    $fields       = '`' . implode('`, `', array_keys($data)) . '`';
    $comment_data = '\'' . implode('\', \'', $data) . '\'';
    $check_if_comment_is_spam = $db->where('text', $data['text'])->where('time', (time() - 3600), ">")->getValue(T_COMMENTS, "COUNT(*)");
    if ($check_if_comment_is_spam >= 5) {
        return false;
    }
    $check_last_comment_exists = $db->where('text', $data['text'])->where('user_id', $data['user_id'])->where('post_id', $data['post_id'])->getValue(T_COMMENTS, "COUNT(*)");
    if ($check_last_comment_exists >= 2) {
        return false;
    }
    // $check_last_comment = $db->where('user_id', $data['user_id'])->where('post_id', $data['post_id'])->where('time', (time() - 3600), ">=")->getValue(T_COMMENTS, "COUNT(*)");
    // if ($check_last_comment >= 5) {
    //     return false;
    // }
    $query        = mysqli_query($sqlConnect, "INSERT INTO  " . T_COMMENTS . " ({$fields}) VALUES ({$comment_data})");
    if ($query) {
        $inserted_comment_id     = mysqli_insert_id($sqlConnect);
        $activity_data           = array(
            'post_id' => $data['post_id'],
            'user_id' => $data['user_id'],
            'post_user_id' => $user_id,
            'activity_type' => 'commented_post'
        );
        $add_activity            = Wo_RegisterActivity($activity_data);
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'post_id' => $data['post_id'],
            'type' => 'comment',
            'text' => $text,
            'type2' => $type2,
            'url' => 'index.php?link1=post&id=' . $data['post_id'] . '&ref=' . $inserted_comment_id
        );
        Wo_RegisterNotification($notification_data_array);
        if (isset($mentions) && is_array($mentions)) {
            foreach ($mentions as $mention) {
                $notification_data_array = array(
                    'recipient_id' => $mention,
                    'type' => 'comment_mention',
                    'post_id' => $data['post_id'],
                    'page_id' => $page_id,
                    'url' => 'index.php?link1=post&id=' . $data['post_id']
                );
                Wo_RegisterNotification($notification_data_array);
            }
        }

        //Register point level system for comments
        Wo_RegisterPoint(Wo_Secure($data['post_id']), "comments");
        return $inserted_comment_id;
    }
}
function Wo_GetPostComments($post_id = 0, $limit = 5) {
    global $sqlConnect, $wo;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post_id        = Wo_Secure($post_id);
    $data           = array();
    $query          = "SELECT `id` FROM " . T_COMMENTS . " WHERE `post_id` = {$post_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') ORDER BY `id` ASC";
    if (($comments_num = Wo_CountPostComment($post_id)) > $limit) {
        $query .= " LIMIT " . ($comments_num - $limit) . ", {$limit} ";
    }
    $query_one = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_GetPostComment($fetched_data['id']);
    }
    return $data;
}
function Wo_GetPostComment($comment_id = 0) {
    global $wo, $sqlConnect;
    if (empty($comment_id) || !is_numeric($comment_id) || $comment_id < 0) {
        return false;
    }
    $query_one    = mysqli_query($sqlConnect, "SELECT * FROM " . T_COMMENTS . " WHERE `id` = {$comment_id} ");
    $fetched_data = mysqli_fetch_assoc($query_one);
    if (!empty($fetched_data['page_id'])) {
        $fetched_data['publisher'] = Wo_PageData($fetched_data['page_id']);
        $fetched_data['url']       = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['publisher']['page_name']);
    } else {
        $fetched_data['publisher'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['url']       = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['publisher']['username']);
    }
    $fetched_data['fullurl'] = Wo_SeoLink("index.php?link1=post&id=". $fetched_data['post_id'] . "&ref=". $comment_id);
    $fetched_data['Orginaltext']         = Wo_EditMarkup($fetched_data['text']);
    $fetched_data['Orginaltext']         = str_replace('<br>', "\n", $fetched_data['Orginaltext']);
    $fetched_data['text']                = Wo_Markup($fetched_data['text']);
    $fetched_data['text']                = Wo_Emo($fetched_data['text']);
    $fetched_data['onwer']               = false;
    $fetched_data['post_onwer']          = false;
    $fetched_data['comment_likes']       = Wo_CountCommentLikes($fetched_data['id']);
    $fetched_data['comment_wonders']     = Wo_CountCommentWonders($fetched_data['id']);
    $fetched_data['is_comment_wondered'] = false;
    $fetched_data['is_comment_liked']    = false;
    if ($wo['loggedin'] == true) {
        $fetched_data['onwer']               = ($fetched_data['publisher']['user_id'] == $wo['user']['user_id']) ? true : false;
        $fetched_data['post_onwer']          = (Wo_IsPostOnwer($fetched_data['post_id'], $wo['user']['user_id'])) ? true : false;
        $fetched_data['is_comment_wondered'] = (Wo_IsCommentWondered($fetched_data['id'], $wo['user']['user_id'])) ? true : false;
        $fetched_data['is_comment_liked']    = (Wo_IsCommentLiked($fetched_data['id'], $wo['user']['user_id'])) ? true : false;
    }
    return $fetched_data;
}
function Wo_CountPostComment($post_id = '') {
    global $sqlConnect;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS `comments` FROM " . T_COMMENTS . " WHERE `post_id` = {$post_id} ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['comments'];
}
function Wo_CountUserPostComment($post_id = '',$user_id = '') {
    global $sqlConnect;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS `comments` FROM " . T_COMMENTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id} ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['comments'];
}
function Wo_DeletePostComment($comment_id = '') {
    global $wo, $sqlConnect;
    if ($comment_id < 0 || empty($comment_id) || !is_numeric($comment_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $post_id        = Wo_GetPostIdFromCommentId($comment_id);
    $query_one      = mysqli_query($sqlConnect, "SELECT `id`, `user_id`, `c_file` FROM " . T_COMMENTS . " WHERE `id` = {$comment_id} AND `user_id` = {$logged_user_id}");
    if (mysqli_num_rows($query_one) > 0 || Wo_IsPostOnwer($post_id, $logged_user_id) === true || Wo_IsAdmin()) {
        $query_img = mysqli_fetch_assoc($query_one);
        if (!empty($query_img['c_file'])) {
            @unlink($query_img['c_file']);
        }
        Wo_RegisterPoint($post_id, "comments", "-");
        $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENTS . " WHERE `id` = {$comment_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_LIKES . " WHERE `comment_id` = {$comment_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_WONDERS . " WHERE `comment_id` = {$comment_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_REACTIONS . " WHERE `comment_id` = '{$comment_id}'");
        if ($query_delete) {
            $query_two = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_COMMENTS_REPLIES . " WHERE `comment_id` = {$comment_id}");
            while ($fetched_data = mysqli_fetch_assoc($query_two)) {
                Wo_DeleteCommentReply($fetched_data['id']);
            }
            $delete_activity = Wo_DeleteActivity($post_id, $logged_user_id, 'commented_post');

            $delete_reports = mysqli_query($sqlConnect, "DELETE FROM " . T_REPORTS . " WHERE `comment_id` = {$comment_id}");

            return true;
        }
    } else {
        return false;
    }
}
function Wo_DeletePostReplyComment($comment_id = '') {
    global $wo, $sqlConnect;
    if ($comment_id < 0 || empty($comment_id) || !is_numeric($comment_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query_one      = mysqli_query($sqlConnect, "SELECT `id`, `user_id` FROM " . T_COMMENTS_REPLIES . " WHERE `id` = {$comment_id} AND `user_id` = {$logged_user_id}");
    if (mysqli_num_rows($query_one) > 0 || Wo_IsAdmin()) {
        $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENTS_REPLIES . " WHERE `id` = {$comment_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_REACTIONS . " WHERE `replay_id` = '{$comment_id}'");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_REPLIES_WONDERS . " WHERE `reply_id` = {$comment_id}");
        $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_REPLIES_LIKES . " WHERE `reply_id` = {$comment_id}");
        return true;
    } else {
        return false;
    }
}
function Wo_UpdateComment($data = array()) {
    global $wo, $sqlConnect;
    if ($data['comment_id'] < 0 || empty($data['comment_id']) || !is_numeric($data['comment_id'])) {
        return false;
    }
    if (empty($data['text'])) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $page_id = 0;
    if (!empty($data['page_id'])) {
        $page_id = Wo_Secure($data['page_id']);
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $comment_id   = Wo_Secure($data['comment_id']);
    $comment_text = Wo_Secure($data['text']);
    $query        = mysqli_query($sqlConnect, "SELECT `id`, `user_id` FROM " . T_COMMENTS . " WHERE `id` = {$comment_id} AND `user_id` = {$user_id}");
    if (mysqli_num_rows($query) > 0) {
        if (!empty($comment_text)) {
            if ($wo['config']['maxCharacters'] > 0) {
                if (strlen($data['text']) > $wo['config']['maxCharacters']) {
                    return false;
                }
            }
            $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
            $i          = 0;
            preg_match_all($link_regex, $comment_text, $matches);
            foreach ($matches[0] as $match) {
                $match_url    = strip_tags($match);
                $syntax       = '[a]' . urlencode($match_url) . '[/a]';
                $comment_text = str_replace($match, $syntax, $comment_text);
            }
            $mention_regex = '/@([A-Za-z0-9_]+)/i';
            preg_match_all($mention_regex, $comment_text, $matches);
            foreach ($matches[1] as $match) {
                $match         = Wo_Secure($match);
                $match_user    = Wo_UserData(Wo_UserIdFromUsername($match));
                $match_search  = '@' . $match;
                $match_replace = '@[' . $match_user['user_id'] . ']';
                if (isset($match_user['user_id'])) {
                    $comment_text = str_replace($match_search, $match_replace, $comment_text);
                    $mentions[]   = $match_user['user_id'];
                }
            }
        }
        $hashtag_regex = '/#([^`~!@$%^&*\#()\-+=\\|\/\.,<>?\'\":;{}\[\]* ]+)/i';
        preg_match_all($hashtag_regex, $comment_text, $matches);
        foreach ($matches[1] as $match) {
            if (!is_numeric($match)) {
                $hashdata = Wo_GetHashtag($match);
                if (is_array($hashdata)) {
                    $match_search  = '#' . $match;
                    $match_replace = '#[' . $hashdata['id'] . ']';
                    if (mb_detect_encoding($match_search, 'ASCII', true)) {
                        $comment_text = preg_replace("/$match_search\b/i", $match_replace, $comment_text);
                    } else {
                        $comment_text = str_replace($match_search, $match_replace, $comment_text);
                    }
                    //$comment_text      = preg_replace("/$match_search\b/i", $match_replace,  $comment_text);
                    $hashtag_query     = "UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
                    $hashtag_sql_query = mysqli_query($sqlConnect, $hashtag_query);
                }
            }
        }
        $query_one = mysqli_query($sqlConnect, "UPDATE " . T_COMMENTS . " SET `text` = '{$comment_text}' WHERE `id` = {$comment_id}");
        if ($query_one) {
            if (isset($mentions) && is_array($mentions)) {
                foreach ($mentions as $mention) {
                    $notification_data_array = array(
                        'recipient_id' => $mention,
                        'type' => 'comment_mention',
                        'page_id' => $page_id,
                        'post_id' => Wo_GetPostIdFromCommentId($data['comment_id']),
                        'url' => 'index.php?link1=post&id=' . Wo_GetPostIdFromCommentId($data['comment_id'])
                    );
                    Wo_RegisterNotification($notification_data_array);
                }
            }
            $query                = mysqli_query($sqlConnect, "SELECT `text` FROM " . T_COMMENTS . " WHERE `id` = {$comment_id}");
            $fetched_data         = mysqli_fetch_assoc($query);
            $fetched_data['text'] = Wo_Markup($fetched_data['text']);
            $fetched_data['text'] = Wo_Emo($fetched_data['text']);
            return $fetched_data['text'];
        }
    } else {
        return false;
    }
}
function Wo_UpdatePostPrivacy($data = array()) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($data['post_id'] < 0 || empty($data['post_id']) || !is_numeric($data['post_id'])) {
        return false;
    }
    if (!is_numeric($data['privacy_type'])) {
        return false;
    }
    $privacy_type = Wo_Secure($data['privacy_type']);
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $post_id      = Wo_Secure($data['post_id']);
    if (Wo_IsPostOnwer($post_id, $user_id) === false) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `postPrivacy` = '{$privacy_type}' WHERE `id` = {$post_id}");
    if ($query_one) {
        if ($wo['config']['cacheSystem'] == 1) {
            $cache->delete(md5($data['post_id']) . '_P_Data.tmp');
        }
        return $privacy_type;
    }
}
function Wo_UpdatePost($data = array()) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($data['post_id'] < 0 || empty($data['post_id']) || !is_numeric($data['post_id'])) {
        return false;
    }
    if (empty($data['text'])) {
        return false;
    }
    $page_id = 0;
    if (!empty($data['page_id'])) {
        $page_id = Wo_Secure($data['page_id']);
    }
    $post_text = Wo_Secure($data['text']);
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $post_id   = Wo_Secure($data['post_id']);
    if (Wo_IsPostOnwer($post_id, $user_id) === false || Wo_IsPostShared($post_id)) {
        return false;
    }
    if (!empty($post_text)) {
        if ($wo['config']['maxCharacters'] > 0) {
            if (strlen($post_text) > $wo['config']['maxCharacters']) {
            }
        }
        $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
        $i          = 0;
        preg_match_all($link_regex, $post_text, $matches);
        foreach ($matches[0] as $match) {
            $match_url = strip_tags($match);
            $syntax    = '[a]' . urlencode($match_url) . '[/a]';
            $post_text = str_replace($match, $syntax, $post_text);
        }
        $mention_regex = '/@([A-Za-z0-9_]+)/i';
        preg_match_all($mention_regex, $post_text, $matches);
        foreach ($matches[1] as $match) {
            $match         = Wo_Secure($match);
            $match_user    = Wo_UserData(Wo_UserIdFromUsername($match));
            $match_search  = '@' . $match;
            $match_replace = '@[' . $match_user['user_id'] . ']';
            if (isset($match_user['user_id'])) {
                $post_text  = str_replace($match_search, $match_replace, $post_text);
                $mentions[] = $match_user['user_id'];
            }
        }
    }
    $hashtag_regex = '/#([^`~!@$%^&*\#()\-+=\\|\/\.,<>?\'\":;{}\[\]* ]+)/i';
    preg_match_all($hashtag_regex, $post_text, $matches);
    foreach ($matches[1] as $match) {
        if (!is_numeric($match)) {
            $hashdata = Wo_GetHashtag($match);
            if (is_array($hashdata)) {
                $match_search  = '#' . $match;
                $match_replace = '#[' . $hashdata['id'] . ']';
                if (mb_detect_encoding($match_search, 'ASCII', true)) {
                    $post_text = preg_replace("/$match_search\b/i", $match_replace, $post_text);
                } else {
                    $post_text = str_replace($match_search, $match_replace, $post_text);
                }
                $hashtag_query     = "UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
                $hashtag_sql_query = mysqli_query($sqlConnect, $hashtag_query);
            }
        }
    }
    $query_one = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `postText` = '{$post_text}' WHERE `id` = {$post_id}");
    if ($query_one) {
        if ($wo['config']['cacheSystem'] == 1) {
            $cache->delete(md5($data['post_id']) . '_P_Data.tmp');
        }
        if (isset($mentions) && is_array($mentions)) {
            foreach ($mentions as $mention) {
                $notification_data_array = array(
                    'recipient_id' => $mention,
                    'type' => 'post_mention',
                    'page_id' => $page_id,
                    'post_id' => $post_id,
                    'url' => 'index.php?link1=post&id=' . $post_id
                );
                Wo_RegisterNotification($notification_data_array);
            }
        }
        $query                    = mysqli_query($sqlConnect, "SELECT `postText` FROM " . T_POSTS . " WHERE `id` = {$post_id}");
        $fetched_data             = mysqli_fetch_assoc($query);
        $fetched_data['postText'] = Wo_Markup($fetched_data['postText']);
        $fetched_data['postText'] = Wo_Emo($fetched_data['postText']);
        return $fetched_data['postText'];
    }
}
function Wo_SavePosts($post_data = array()) {
    global $wo, $sqlConnect;
    if (empty($post_data)) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $post_id = Wo_Secure($post_data['post_id']);
    if (Wo_IsPostSaved($post_id, $user_id)) {
        $query_one     = "DELETE FROM " . T_SAVED_POSTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            return 'unsaved';
        }
    } else {
        $query_two     = "INSERT INTO " . T_SAVED_POSTS . " (`user_id`, `post_id`) VALUES ({$user_id}, {$post_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            return 'saved';
        }
    }
}
function Wo_GetChatColor($user_id = 0, $conversation_user_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || empty($conversation_user_id)) {
        return false;
    }
    if (!is_numeric($conversation_user_id) || !is_numeric($user_id)) {
        return false;
    }
    $user_id              = Wo_Secure($user_id);
    $conversation_user_id = Wo_Secure($conversation_user_id);
    $sql_queryset         = mysqli_query($sqlConnect, "SELECT color FROM " . T_U_CHATS . " WHERE `user_id` = '$user_id' AND `conversation_user_id` = '$conversation_user_id' LIMIT 1");
    $fetched_data         = mysqli_fetch_assoc($sql_queryset);
    $color = (!empty($fetched_data['color'])) ? $fetched_data['color'] : $wo['config']['btn_background_color'];
    if (file_exists('./themes/' . $wo['config']['theme'] . '/reaction/like-sm.png') && empty($fetched_data['color'])) {
        $color = '';
    }
    return $color;
}
function Wo_UpdateChatColor($user_id = 0, $conversation_user_id = 0, $color = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || empty($conversation_user_id)) {
        return false;
    }
    if (!is_numeric($conversation_user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($color)) {
        return false;
    }
    $user_id              = Wo_Secure($user_id);
    $conversation_user_id = Wo_Secure($conversation_user_id);
    $color                = Wo_Secure($color);
    $query_one            = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_U_CHATS . " WHERE `conversation_user_id` = '$user_id' AND `user_id` = '$conversation_user_id'");
    $query_one_fetch      = mysqli_fetch_assoc($query_one);
    if ($query_one_fetch['count'] == 0) {
        $update_ = Wo_CreateUserChat($conversation_user_id, $user_id);
    }
    $query        = "UPDATE " . T_U_CHATS . " SET `color` = '$color' 
            WHERE (`user_id` = '$user_id' AND `conversation_user_id` = '$conversation_user_id')
            OR (`user_id` = '$conversation_user_id' AND `conversation_user_id` = '$user_id')";
    $sql_queryset = mysqli_query($sqlConnect, $query);
    return $sql_queryset;
}


function Wo_ProfileCompletion(){
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }

    $data = array(
        1 => 0,
        2 => 0,
        3 => 0,
        4 => 0,
        5 => 0,
    );

    if (!empty($wo['user']['startup_image'])) {
        $data[1] = 20;
    }

    if (!empty($wo['user']['first_name']) && !empty($wo['user']['first_name'])) {
        $data[2] = 20;
    }

    if (!empty($wo['user']['working'])) {
        $data[3] = 20;
    }

    if (!empty($wo['user']['country_id'])) {
        $data[4] = 20;
    }

    if (!empty($wo['user']['address'])) {
        $data[5] = 20;
    }
    
    return $data;
}

function Wo_GetLastAttachments($user_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query = " SELECT * FROM " . T_MESSAGES . " WHERE ((`from_id` = {$user_id} AND (`to_id` = {$logged_user_id} AND `deleted_two` = '0') OR (`from_id` = {$logged_user_id} AND `to_id` = {$user_id} AND `deleted_one` = '0')) AND (`from_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `from_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND ( mediaFileName like '%jpg' OR mediaFileName like '%PNG' OR mediaFileName like '%jpeg'))) ORDER BY id DESC limit 6";
    $sql_query = mysqli_query($sqlConnect, $query);
    $data = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_GetMedia($fetched_data['media']);
    }
    return $data;
}