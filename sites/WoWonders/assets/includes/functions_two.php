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
/* Script Main Functions (File 2) */
// functions_tww.php
require_once('app_start.php'); 
use Twilio\Rest\Client;
function Wo_ReportPost($post_data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_data)) {
        return false;
    }

    $user_id = Wo_Secure($wo['user']['user_id']);

    $post_id = 0;
    if( isset( $post_data['post_id'] ) ){
        $post_id = Wo_Secure($post_data['post_id']);
        if (Wo_PostExists($post_data['post_id']) === false) {
            return false;
        }
    }

    $comment_id = 0;
    if( isset( $post_data['comment_id'] ) ){
        $comment_id = Wo_Secure($post_data['comment_id']);
    }
    
    if( $post_id !== 0 ){
        if (Wo_IsPostRepotred($post_id, $user_id)) {
            $query_one     = "DELETE FROM " . T_REPORTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
            $sql_query_one = mysqli_query($sqlConnect, $query_one);
            if ($sql_query_one) {
                return 'unreport';
            }
        }
    }

    if( $comment_id !== 0 ){
        if (Wo_IsCommentRepotred($comment_id, $user_id)) {
            $query_one     = "DELETE FROM " . T_REPORTS . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$user_id}";
            $sql_query_one = mysqli_query($sqlConnect, $query_one);
            if ($sql_query_one) {
                return 'unreport';
            }
        }
    }


    $query_two     = "INSERT INTO " . T_REPORTS . " (`user_id`, `post_id`, `comment_id`, `time`) VALUES ({$user_id}, {$post_id}, {$comment_id}, " . time() . ")";
    $sql_query_two = mysqli_query($sqlConnect, $query_two);
    if ($sql_query_two) {
        return 'report';
    }
    
}
function Wo_CountUnseenReports() {
    global $wo, $sqlConnect;
    $query_one    = "SELECT COUNT(`id`) AS `reports` FROM " . T_REPORTS . " WHERE `seen` = 0 ";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    return $fetched_data['reports'];
}
function Wo_UpdateSeenReports() {
    global $wo, $sqlConnect;
    $query_one = " UPDATE " . T_REPORTS . " SET `seen` = 1 WHERE `seen` = 0";
    $sql       = mysqli_query($sqlConnect, $query_one);
    if ($sql) {
        return true;
    }
}
function Wo_DeleteReport($report_id = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $report_id = Wo_Secure($report_id);
    $query     = mysqli_query($sqlConnect, "DELETE FROM " . T_REPORTS . " WHERE `id` = {$report_id}");
    if ($query) {
        return true;
    }
}
function Wo_GetReports() {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT * FROM " . T_REPORTS . " ORDER BY `id` DESC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        if ($fetched_data['post_id'] != 0) {
            $fetched_data['reporter'] = Wo_UserData($fetched_data['user_id']);
            $fetched_data['story']    = Wo_PostData($fetched_data['post_id']);
            $fetched_data['type']     = 'post';
            $data[]                   = $fetched_data;
        }
        else if($fetched_data['profile_id'] != 0){
            $fetched_data['reporter'] = Wo_UserData($fetched_data['user_id']);
            $fetched_data['user']     = Wo_UserData($fetched_data['profile_id']);
            $fetched_data['type']     = 'profile';
            $data[]                   = $fetched_data;
        }

        else if($fetched_data['page_id'] != 0){
            $fetched_data['reporter'] = Wo_UserData($fetched_data['user_id']);
            $fetched_data['page']     = Wo_PageData($fetched_data['page_id']);
            $fetched_data['type']     = 'page';
            $data[]                   = $fetched_data;
        }
        else if($fetched_data['group_id'] != 0){
            $fetched_data['reporter'] = Wo_UserData($fetched_data['user_id']);
            $fetched_data['group']    = Wo_GroupData($fetched_data['group_id']);
            $fetched_data['type']     = 'group';
            $data[]                   = $fetched_data; 
        }
        else if($fetched_data['comment_id'] != 0){
            $fetched_data['reporter'] = Wo_UserData($fetched_data['user_id']);
            $fetched_data['comment']  = Wo_GetPostComment($fetched_data['comment_id']);
            $fetched_data['type']     = 'comment';
            $data[]                   = $fetched_data; 
        }
    }
    return $data;
}
function Wo_IsPostRepotred($post_id = '', $user_id = '') {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_REPORTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_IsCommentRepotred($comment_id = '', $user_id = '') {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $comment_id       = Wo_Secure($comment_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_REPORTS . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_CountUnseenVerifications() {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $query_one    = "SELECT COUNT(`id`) AS `verifications` FROM " . T_VERIFICATION_REQUESTS . " WHERE `seen` = 0 ";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    return $fetched_data['verifications'];
}
function Wo_UpdateSeenVerifications() {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $query_one = " UPDATE " . T_VERIFICATION_REQUESTS . " SET `seen` = 1 WHERE `seen` = 0";
    $sql       = mysqli_query($sqlConnect, $query_one);
    if ($sql) {
        return true;
    }
}
function Wo_DeleteVerificationRequest($id = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_VERIFICATION_REQUESTS . " WHERE `id` = {$id}");
    if ($query) {
        return true;
    }
}
function Wo_DeleteVerification($id = 0, $type = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || empty($type)) {
        return false;
    }
    if (!in_array($type, array(
        'User',
        'Page'
    ))) {
        return false;
    }
    $id          = Wo_Secure($id);
    $update_data = array(
        'verified' => 0
    );
    $update      = false;
    if ($type == 'Page') {
        if (Wo_IsPageOnwer($id)) {
            $update = mysqli_query($sqlConnect, "UPDATE " . T_PAGES . " SET `verified` = '0' WHERE `page_id` = {$id}");
        }
    } else if ($type == 'User') {
        if ($wo['user']['user_id'] == $id || Wo_IsAdmin()) {
            $update = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `verified` = '0' WHERE `user_id` = {$id}");
        }
    }
    if ($update) {
        return true;
    }
}
function Wo_RemoveVerificationRequest($id = 0, $type = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || empty($type)) {
        return false;
    }
    if (!in_array($type, array(
        'User',
        'Page'
    ))) {
        return false;
    }
    $id = Wo_Secure($id);
    if ($type == 'Page') {
        if (Wo_IsPageOnwer($id) === false) {
            return false;
        }
        $type_id = '`page_id`';
        $type_2  = 'page';
    } else if ($type == 'User') {
        if (Wo_IsOnwer($id) === false) {
            return false;
        }
        $type_id = '`user_id`';
        $type_2  = 'user';
    }
    $delete_query = mysqli_query($sqlConnect, "DELETE FROM " . T_VERIFICATION_REQUESTS . " WHERE {$type_id} = {$id} AND `type` = '{$type_2}'");
    if ($delete_query) {
        return true;
    }
}
function Wo_VerifyUser($id = 0, $verification_id = 0, $type = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || empty($type) || empty($verification_id)) {
        return false;
    }
    if (!in_array($type, array(
        'User',
        'Page'
    ))) {
        return false;
    }
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $id          = Wo_Secure($id);
    $update_data = array(
        'verified' => 1
    );
    $update      = false;
    if ($type == 'Page') {
        $update = Wo_UpdatePageData($id, $update_data);
    } else if ($type == 'User') {
        $update = Wo_UpdateUserData($id, $update_data);
    }
    if ($update) {
        if (Wo_DeleteVerificationRequest($verification_id) === true) {
            return true;
        }
    }
}
function Wo_RequestVerification($id = 0, $type = '') {
    global $sqlConnect;
    if (empty($id) or !is_numeric($id) or $id < 1 or empty($type) or $type != 'Page') {
        return false;
    }

    if (Wo_IsVerificationRequests($id, $type) === true) {
        return false;
    }
    $values = '';
    if ($type == 'Page') {
        if (Wo_IsPageOnwer($id) === false) {
            return false;
        }
        $values = "`page_id`,`type`";
    } else if ($type == 'User') {
        if (Wo_IsOnwer($id) === false) {
            return false;
        }
        $values = "`user_id`,`type`";
    }
    $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_VERIFICATION_REQUESTS . " ($values) VALUES({$id},'{$type}') ");
    if ($query_one) {
        return true;
    }
}
function Wo_IsVerificationRequests($id = '', $type = '') {
    global $sqlConnect;
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    if (empty($type)) {
        return false;
    }
    if (!in_array($type, array(
        'User',
        'Page'
    ))) {
        return false;
    }
    $id    = Wo_Secure($id);
    $type  = Wo_Secure($type);
    $where = '';
    if ($type == 'Page') {
        $where = " `page_id` = {$id} AND `type` = 'page'";
    } else if ($type == 'User') {
        $where = " `user_id` = {$id} AND `type` = 'user'";
    }
    if (empty($where)) {
        return false;
    }
    $query_one     = "SELECT `id` as count FROM " . T_VERIFICATION_REQUESTS . " WHERE{$where}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) > 0) {
        return true;
    }
}
function Wo_GetVerificationButton($id, $type) {
    global $sqlConnect, $wo;
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    if (empty($type)) {
        return false;
    }
    $verified_type = 0;
    if ($type == 'Page') {
        $wo['verification']       = Wo_PageData($id);
        $wo['verification']['id'] = $wo['verification']['page_id'];
    } else if ($type == 'User') {
        $wo['verification']       = Wo_UserData($id);
        $wo['verification']['id'] = $wo['verification']['user_id'];
    }
    $wo['verification']['type'] = $type;
    $pending                    = 'buttons/pending-verification';
    $remove                     = 'buttons/remove-verification';
    $request                    = 'buttons/request-verification';
    $verified                   = $wo['verification']['verified'];
    if (Wo_IsVerificationRequests($id, $type)) {
        return Wo_LoadPage($pending);
    } else if ($verified == 1) {
        return Wo_LoadPage($remove);
    } else {
        return Wo_LoadPage($request);
    }
}
function Wo_GetVerifications() {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT * FROM " . T_VERIFICATION_REQUESTS . " ORDER BY `id` DESC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        if (!empty($fetched_data['user_id'])) {
            $fetched_data['request_from']       = Wo_UserData($fetched_data['user_id']);
            $fetched_data['request_from']['id'] = $fetched_data['user_id'];
        } else if (!empty($fetched_data['page_id'])) {
            $fetched_data['request_from']       = Wo_PageData($fetched_data['page_id']);
            $fetched_data['request_from']['id'] = $fetched_data['page_id'];
        } else {
            return false;
        }
        $fetched_data['type'] = ($fetched_data['type'] == 'User') ? 'User' : 'Page';
        $data[]               = $fetched_data;
    }
    return $data;
}
function Wo_GetAllPosts($posts = array('limit' => 10, 'after_user_id' => 0)) {
    global $wo, $sqlConnect;
    $data     = array();
    $subquery = '';
    $limit    = Wo_Secure($posts['limit']);
    if (isset($posts['after_post_id']) && !empty($posts['after_post_id']) && $posts['after_post_id'] > 0) {
        $after_post_id = Wo_Secure($posts['after_post_id']);
        $subquery      = " WHERE `id` < {$after_post_id}";
    }
    $query_one = " SELECT `id` FROM " . T_POSTS . " {$subquery} ORDER BY `id` DESC LIMIT {$limit}";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[] = Wo_PostData($fetched_data['id'], 'admin');
    }
    return $data;
}
function Wo_IsPostSaved($post_id, $user_id) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_SAVED_POSTS . " WHERE `post_id` = {$post_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_GetSavedPosts($user_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $data           = array();
    $query          = mysqli_query($sqlConnect, "SELECT `post_id` FROM " . T_SAVED_POSTS . " WHERE `user_id` = {$user_id} ORDER BY `id` DESC");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $post = Wo_PostData($fetched_data['post_id']);
        if (is_array($post)) {
            $data[] = $post;
        }
    }
    return $data;
}
function Wo_GetPostIdFromCommentId($comment_id = 0) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $query_one     = "SELECT `post_id` FROM " . T_COMMENTS . " WHERE `id` = {$comment_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['post_id'];
    }
}
function Wo_GetUserIdFromCommentId($comment_id = 0) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $query_one     = "SELECT `user_id` FROM " . T_COMMENTS . " WHERE `id` = {$comment_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['user_id'];
    }
}
function Wo_AddCommentLikes($comment_id, $text = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($comment_id) or empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id          = Wo_Secure($comment_id);
    $user_id             = Wo_Secure($wo['user']['user_id']);
    $comment_timeline_id = Wo_GetUserIdFromCommentId($comment_id);
    $post_id             = Wo_GetPostIdFromCommentId($comment_id);
    $page_id             = '';
    $post_data           = Wo_PostData($post_id);
    if (!empty($post_data['page_id'])) {
        $page_id = $post_data['page_id'];
    }
    if (Wo_IsPageOnwer($post_data['page_id']) === false) {
        $page_id = 0;
    }
    if (empty($comment_timeline_id)) {
        return false;
    }
    
    $comment_data = Wo_GetPostComment($comment_id);
    $text = Wo_Secure($comment_data['text']);
    if (isset($text) && !empty($text)) {
        $text = substr($text, 0, 10) . '..';
    }
    if (Wo_IsCommentLiked($comment_id, $user_id) === true) {
        $query_one = "DELETE FROM " . T_COMMENT_LIKES . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$user_id}";
        mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$comment_timeline_id} AND `type` = 'liked_comment'");
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            return 'unliked';
        }
    } else {
        if ($wo['config']['second_post_button'] == 'dislike' && Wo_IsCommentWondered($comment_id, $user_id)) {
            Wo_AddCommentWonders($comment_id);
        }
        $query_two     = "INSERT INTO " . T_COMMENT_LIKES . " (`user_id`, `post_id`, `comment_id`) VALUES ({$user_id},{$post_id},{$comment_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            $notification_data_array = array(
                'recipient_id' => $comment_timeline_id,
                'post_id' => $post_id,
                'type' => 'liked_comment',
                'text' => $text,
                'page_id' => $page_id,
                'url' => 'index.php?link1=post&id=' . $post_id . '&ref=' . $comment_id
            );
            Wo_RegisterNotification($notification_data_array);
            return 'liked';
        }
    }
}
function Wo_CountCommentLikes($comment_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $query_one     = "SELECT COUNT(`id`) AS `likes` FROM " . T_COMMENT_LIKES . " WHERE `comment_id` = {$comment_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['likes'];
    }
}
function Wo_IsCommentLiked($comment_id, $user_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_COMMENT_LIKES . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_AddCommentWonders($comment_id, $text = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($comment_id) or empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id      = Wo_Secure($comment_id);
    $user_id         = Wo_Secure($wo['user']['user_id']);
    $comment_user_id = Wo_GetUserIdFromCommentId($comment_id);
    $post_id         = Wo_GetPostIdFromCommentId($comment_id);
    $page_id         = '';
    $post_data       = Wo_PostData($post_id);
    if (!empty($post_data['page_id'])) {
        $page_id = $post_data['page_id'];
    }
    if (Wo_IsPageOnwer($post_data['page_id']) === false) {
        $page_id = 0;
    }
    if (empty($comment_user_id)) {
        return false;
    }
    
    $comment_data = Wo_GetPostComment($comment_id);
    $text = Wo_Secure($comment_data['text']);
    if (isset($text) && !empty($text)) {
        $text = mb_substr($text, 0, 10, "UTF-8") . '..';
    }
    if (Wo_IsCommentWondered($comment_id, $wo['user']['user_id']) === true) {
        $query_one = "DELETE FROM " . T_COMMENT_WONDERS . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$user_id}";
        mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$comment_user_id} AND `type` = 'wondered_comment'");
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            return 'unwonder';
        }
    } else {
        if ($wo['config']['second_post_button'] == 'dislike' && Wo_IsCommentLiked($comment_id, $user_id)) {
            Wo_AddCommentLikes($comment_id);
        }
        $query_two     = "INSERT INTO " . T_COMMENT_WONDERS . " (`user_id`, `post_id`, `comment_id`) VALUES ({$user_id}, {$post_id}, {$comment_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            $notification_data_array = array(
                'recipient_id' => $comment_user_id,
                'post_id' => $post_id,
                'type' => 'wondered_comment',
                'text' => $text,
                'page_id' => $page_id,
                'url' => 'index.php?link1=post&id=' . $post_id . '&ref=' . $comment_id
            );
            Wo_RegisterNotification($notification_data_array);
            return 'wonder';
        }
    }
}
function Wo_CountCommentWonders($comment_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $query_one     = "SELECT COUNT(`id`) AS `likes` FROM " . T_COMMENT_WONDERS . " WHERE `comment_id` = {$comment_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['likes'];
    }
}
function Wo_IsCommentWondered($comment_id, $user_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_COMMENT_WONDERS . " WHERE `comment_id` = {$comment_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_GetCommentLikes($comment_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $data          = array();
    $query_one     = "SELECT `user_id` FROM " . T_COMMENT_LIKES . " WHERE `comment_id` = {$comment_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetCommentWonders($comment_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $data          = array();
    $query_one     = "SELECT `user_id` FROM " . T_COMMENT_WONDERS . " WHERE `comment_id` = {$comment_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wa_GetTrendingHashs($type = 'latest', $limit = 5) {
    global $sqlConnect;
    $data = array();
    if (empty($type)) {
        return false;
    }
    if (empty($limit) or !is_numeric($limit) or $limit < 1) {
        $limit = 5;
    }
    if ($type == "latest") {
        $query = "SELECT * FROM " . T_HASHTAGS . " WHERE `expire` >= CURRENT_DATE() AND `trend_use_num` > '0'  ORDER BY `last_trend_time` DESC LIMIT {$limit}";
    } elseif ($type == "popular") {
        $query = "SELECT * FROM " . T_HASHTAGS . " WHERE `expire` >= CURRENT_DATE() AND `trend_use_num` > '0'  ORDER BY `trend_use_num` DESC LIMIT {$limit}";
    }
    $sql_query   = mysqli_query($sqlConnect, $query);
    $sql_numrows = mysqli_num_rows($sql_query);
    if ($sql_numrows > 0) {
        while ($sql_fetch = mysqli_fetch_assoc($sql_query)) {
            $sql_fetch['url'] = Wo_SeoLink('index.php?link1=hashtag&hash=' . $sql_fetch['tag']);
            $data[]           = $sql_fetch;
        }
    }
    return $data;
}
function Wo_GetHashtagPosts($s_query, $after_post_id = 0, $limit = 5, $before_post_id = 0) {
    global $sqlConnect;
    $data         = array();
    $search_query = str_replace('#', '', Wo_Secure($s_query));
    $hashdata     = Wo_GetHashtag($search_query, false);
    if (is_array($hashdata) && count($hashdata) > 0) {
        $search_string = "#[" . $hashdata['id'] . "]";
        $query_one     = "SELECT id FROM " . T_POSTS . " WHERE `postText` LIKE '%{$search_string}%'";
        if (isset($after_post_id) && !empty($after_post_id) && is_numeric($after_post_id)) {
            $after_post_id = Wo_Secure($after_post_id);
            $query_one .= " AND id < {$after_post_id}";
        }
        if (isset($before_post_id) && !empty($before_post_id) && is_numeric($before_post_id)) {
            $before_post_id = Wo_Secure($before_post_id);
            $query_one .= " AND id > {$before_post_id}";
        }
        $query_one .= " ORDER BY `id` DESC LIMIT {$limit}";
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
            $posts = Wo_PostData($sql_fetch_one['id']);
            if (is_array($posts)) {
                $data[] = $posts;
            }
        }
    }
    return $data;
}
function Wo_SearchForPosts($id = 0, $s_query = '', $limit = 5, $type = '') {
    global $wo, $sqlConnect;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 1) {
        return false;
    }
    if ($type == 'page') {
        $query_type = "AND `page_id` = {$id}";
    } else if ($type == 'user') {
        $query_type = "AND `user_id` = {$id}";
    } else if ($type == 'group') {
        $query_type = "AND `group_id` = {$id}";
    } else {
        return false;
    }
    $search_query = Wo_Secure($s_query);
    $query_one    = "SELECT id FROM " . T_POSTS . " WHERE `postText` LIKE '%{$search_query}%' {$query_type}";
    $query_one .= " ORDER BY `id` DESC LIMIT {$limit}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($sql_fetch_one = mysqli_fetch_assoc($sql_query_one)) {
        $posts = Wo_PostData($sql_fetch_one['id']);
        if (is_array($posts)) {
            $data[] = $posts;
        }
    }
    return $data;
}
function Wo_GetSerachHash($s_query) {
    global $sqlConnect;
    $search_query = str_replace('#', '', Wo_Secure($s_query));
    $data         = array();
    $query        = mysqli_query($sqlConnect, "SELECT * FROM " . T_HASHTAGS . " WHERE `tag` LIKE '%{$search_query}%' ORDER BY `trend_use_num` DESC LIMIT 10");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['url'] = Wo_SeoLink('index.php?link1=hashtag&hash=' . $fetched_data['tag']);
        $data[]              = $fetched_data;
    }
    return $data;
}
function Wo_CountOnlineUsers() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $time         = time() - 60;
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) AS `online` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id`= {$user_id} AND `following_id` <> {$user_id} AND `active` = '1') AND `lastseen` > {$time} AND `active` = '1' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') ORDER BY `lastseen` DESC");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['online'];
}
function Wo_GetChatUsers($type) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data       = array();
    $time       = time() - 60;
    $user_id    = Wo_Secure($wo['user']['user_id']);
    $query_text = "SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `active` = '1')";
    if ($type == 'online') {
        $query_text .= " AND `lastseen` > {$time}";
    } else if ($type == 'offline') {
        $query_text .= " AND `lastseen` < {$time}";
    }
    $query_text .= " AND `active` = '1' ORDER BY `lastseen` DESC";
    if ($type == 'offline') {
        $query_text .= ' LIMIT 6';
    }
    $query = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_ChatSearchUsers($search_query = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data         = array();
    $time         = time() - 60;
    $search_query = Wo_Secure($search_query);
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query_one    = "SELECT `user_id` FROM " . T_USERS . " WHERE (`user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `active` = '1') AND `active` = '1'";
    if (isset($search_query) && !empty($search_query)) {
        $query_one .= " AND ((`username` LIKE '%$search_query%') OR CONCAT(`first_name`,  ' ', `last_name`) LIKE  '%{$search_query}%'))";
    }
    $query_one .= " ORDER BY `first_name` LIMIT 10";
    $query = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_UpdateStatus($status = 'online') {
    global $sqlConnect, $wo, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($status)) {
        return false;
    }
    $finel_status = '';
    $user_id      = Wo_Secure($wo['user']['user_id']);
    if ($status == 'online') {
        $finel_status = 0;
    } else if ($status == 'offline') {
        $finel_status = 1;
    }
    if (!is_numeric($finel_status)) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `status` = '{$finel_status}' WHERE `user_id` = {$user_id}");
    if ($query) {
        if ($wo['config']['cacheSystem'] == 1) {
            $cache->delete(md5($wo['user']['user_id']) . '_U_Data.tmp');
        }
        return $finel_status;
    }
}
function Wo_IsOnline($user_id) {
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $user_id  = Wo_Secure($user_id);
    $lastseen = Wo_UserData($user_id);
    $time     = time() - 60;
    if ($lastseen['lastseen'] < $time) {
        return false;
    } else {
        return true;
    }
}
function Wo_RightToLeft($type = '') {
    global $wo;
    $type = Wo_Secure($type);
    if ($wo['language_type'] == 'rtl') {
        if ($type == 'pull-right') {
            return 'pull-left';
        }
        if ($type == 'pull-left') {
            return 'pull-right';
        }
        if ($type == 'left-addon') {
            return 'right-addon';
        }
        if ($type == 'text-right') {
            return 'text-left';
        }
        if ($type == 'text-left') {
            return 'text-right';
        }
        if ($type == 'right') {
            return 'left';
        }
    } else {
        return $type;
    }
}
function Wo_GetOfflineTyping() {
    global $wo, $sqlConnect;
    $time      = time() - 360;
    $data      = array();
    $query     = "SELECT `user_id` FROM " . T_USERS . " WHERE `lastseen` < '{$time}' AND (`user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `is_typing` = 1))";
    $query_one = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        Wo_DeleteAllTyping($fetched_data['user_id']);
    }
}
function Wo_IsTyping($recipient_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($recipient_id) || !is_numeric($recipient_id) || $recipient_id < 0) {
        return false;
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $recipient_id = Wo_Secure($recipient_id);
    $query        = "SELECT `is_typing` FROM " . T_FOLLOWERS . " WHERE follower_id = {$user_id} AND following_id = {$recipient_id} AND `is_typing` = 1";
    $query_one    = mysqli_query($sqlConnect, $query);
    return (Wo_Sql_Result($query_one, 0) == 1) ? true : false;
}
function Wo_RegisterTyping($recipient_id, $isTyping = 1) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($recipient_id) || !is_numeric($recipient_id) || $recipient_id < 0) {
        return false;
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $recipient_id = Wo_Secure($recipient_id);
    $typing       = 1;
    if ($isTyping == 0) {
        $typing = 0;
    }
    if (Wo_IsFollowing($user_id, $recipient_id) === false) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "UPDATE " . T_FOLLOWERS . " SET `is_typing` = '$typing' WHERE following_id = '{$user_id}' AND follower_id = {$recipient_id}");
    if ($query) {
        return true;
    }
}
function Wo_DeleteAllTyping($user_id) {
    global $sqlConnect;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, "UPDATE " . T_FOLLOWERS . " SET `is_typing` = 0 WHERE `following_id` = {$user_id}");
    if ($query) {
        return true;
    }
}
function Wo_UpdateAdsCode($update_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (empty($update_data['type'])) {
        return false;
    }
    $type   = Wo_Secure($update_data['type']);
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . mysqli_real_escape_string($sqlConnect, $data) . '\'';
    }
    $query_text    = implode(', ', $update);
    $query_one     = " UPDATE " . T_ADS . " SET {$query_text} WHERE `type` = '{$type}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if ($sql_query_one) {
        return true;
    }
}
function Wo_GetAd($type, $admin = true) {
    global $sqlConnect;
    $type      = Wo_Secure($type);
    $query_one = "SELECT `code` FROM " . T_ADS . " WHERE `type` = '{$type}'";
    if ($admin === false) {
        $query_one .= " AND `active` = '1'";
    }
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    return $fetched_data['code'];
}
function Wo_IsAdActive($type) {
    global $sqlConnect;
    $query_one     = "SELECT COUNT(`id`) AS `count` FROM " . T_ADS . " WHERE `type` = '{$type}' AND `active` = '1' ";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    return $fetched_data['count'];
}
function Wo_UpdateAdActivation($type) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        return false;
    }
    if (Wo_IsAdActive($type)) {
        $query_one = mysqli_query($sqlConnect, "UPDATE " . T_ADS . " SET `active` = '0' WHERE `type` = '{$type}'");
        return 'inactive';
    } else {
        $query_one = mysqli_query($sqlConnect, "UPDATE " . T_ADS . " SET `active` = '1' WHERE `type` = '{$type}'");
        return 'active';
    }
}
function Wo_AddNewAnnouncement($text) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $text    = mysqli_real_escape_string($sqlConnect, $text);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    if (empty($text)) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "INSERT INTO " . T_ANNOUNCEMENT . " (`text`, `time`, `active`) VALUES ('{$text}', " . time() . ", '1')");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
}
function Wo_GetAnnouncement($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $data    = array();
    if (empty($id) || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_ANNOUNCEMENT . " WHERE `id` = {$id} ORDER BY `id` DESC");
    if (mysqli_num_rows($query) == 1) {
        $fetched_data         = mysqli_fetch_assoc($query);
        $fetched_data['text'] = Wo_Markup($fetched_data['text']);
        $fetched_data['text'] = Wo_Emo($fetched_data['text']);
        return $fetched_data;
    }
}
function Wo_GetAnnouncementViews($id) {
    global $sqlConnect, $wo;
    $id            = Wo_Secure($id);
    $query_one     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `count` FROM " . T_ANNOUNCEMENT_VIEWS . " WHERE `announcement_id` = {$id}");
    $sql_query_one = mysqli_fetch_assoc($query_one);
    return $sql_query_one['count'];
}
function Wo_GetActiveAnnouncements() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $data    = array();
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_ANNOUNCEMENT . " WHERE `active` = '1' ORDER BY `id` DESC");
    while ($row = mysqli_fetch_assoc($query)) {
        $data[] = Wo_GetAnnouncement($row['id']);
    }
    return $data;
}
function Wo_GetHomeAnnouncements() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query        = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_ANNOUNCEMENT . " WHERE `active` = '1' AND `id` NOT IN (SELECT `announcement_id` FROM " . T_ANNOUNCEMENT_VIEWS . " WHERE `user_id` = {$user_id}) ORDER BY RAND() LIMIT 1");
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = Wo_GetAnnouncement($fetched_data['id']);
    return $data;
}
function Wo_GetInactiveAnnouncements() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $data    = array();
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_ANNOUNCEMENT . " WHERE `active` = '0' ORDER BY `id` DESC");
    while ($row = mysqli_fetch_assoc($query)) {
        $data[] = Wo_GetAnnouncement($row['id']);
    }
    return $data;
}
function Wo_DeleteAnnouncement($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id      = Wo_Secure($id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_ANNOUNCEMENT . " WHERE `id` = {$id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_ANNOUNCEMENT_VIEWS . " WHERE `announcement_id` = {$id}");
    if ($query_one) {
        return true;
    }
}
function Wo_IsActiveAnnouncement($id) {
    global $sqlConnect;
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_ANNOUNCEMENT . " WHERE `id` = '{$id}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_IsViewedAnnouncement($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id      = Wo_Secure($id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_ANNOUNCEMENT_VIEWS . " WHERE `announcement_id` = '{$id}' AND `user_id` = '{$user_id}'");
    return (Wo_Sql_Result($query, 0) > 0) ? true : false;
}
function Wo_IsThereAnnouncement() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_ANNOUNCEMENT . " WHERE `active` = '1' AND `id` NOT IN (SELECT `announcement_id` FROM " . T_ANNOUNCEMENT_VIEWS . " WHERE `user_id` = {$user_id})");
    $sql     = mysqli_fetch_assoc($query);
    return ($sql['count'] > 0) ? true : false;
}
function Wo_DisableAnnouncement($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id      = Wo_Secure($id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    if (Wo_IsActiveAnnouncement($id) === false) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "UPDATE " . T_ANNOUNCEMENT . " SET `active` = '0' WHERE `id` = {$id}");
    if ($query_one) {
        return true;
    }
}
function Wo_ActivateAnnouncement($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id      = Wo_Secure($id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsAdmin($user_id) === false) {
        return false;
    }
    if (Wo_IsActiveAnnouncement($id) === true) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "UPDATE " . T_ANNOUNCEMENT . " SET `active` = '1' WHERE `id` = {$id}");
    if ($query_one) {
        return true;
    }
}
function Wo_UpdateAnnouncementViews($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id      = Wo_Secure($id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (Wo_IsActiveAnnouncement($id) === false) {
        return false;
    }
    if (Wo_IsViewedAnnouncement($id) === true) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_ANNOUNCEMENT_VIEWS . " (`user_id`, `announcement_id`) VALUES ('{$user_id}', '{$id}')");
    if ($query_one) {
        return true;
    }
}
function Wo_RegisterApp($registration_data) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($registration_data)) {
        return false;
    }
    if (empty($registration_data['app_user_id']) || !is_numeric($registration_data['app_user_id']) || $registration_data['app_user_id'] < 1) {
        return false;
    }
    $id_str                          = sha1($registration_data['app_user_id'] . microtime() . time());
    $registration_data['app_id']     = Wo_Secure(substr($id_str, 0, 20));
    $secret_str                      = sha1($registration_data['app_user_id'] . Wo_GenerateKey(55, 55) . microtime());
    $registration_data['app_secret'] = Wo_Secure(substr($secret_str, 0, 39));
    if (empty($registration_data['app_secret']) || empty($registration_data['app_id'])) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_APPS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
}
function Wo_IsAppOnwer($app_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id       = Wo_Secure($wo['user']['user_id']);
    $app_id        = Wo_Secure($app_id);
    $query_one     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `count` FROM " . T_APPS . " WHERE `app_user_id` = {$user_id} AND `id` = {$app_id} AND `active` = '1'");
    $sql_query_one = mysqli_fetch_assoc($query_one);
    return ($sql_query_one['count'] == 1) ? true : false;
}
function Wo_GetAppsData($placement = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data       = array();
    $user_id    = $wo['user']['user_id'];
    $query_text = "SELECT `id` FROM " . T_APPS;
    if ($placement != 'admin') {
        $query_text .= " WHERE `app_user_id` = {$user_id}";
    }
    $query_one = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        if (is_array($fetched_data)) {
            $data[] = Wo_GetApp($fetched_data['id']);
        }
    }
    return $data;
}
function Wo_GetApp($app_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($app_id) || !is_numeric($app_id) || $app_id < 1) {
        return false;
    }
    $app_id    = Wo_Secure($app_id);
    $query_one = mysqli_query($sqlConnect, "SELECT * FROM " . T_APPS . " WHERE `id` = {$app_id}");
    if (mysqli_num_rows($query_one) == 1) {
        $sql_query_one               = mysqli_fetch_assoc($query_one);
        $sql_query_one['app_onwer']  = Wo_UserData($sql_query_one['app_user_id']);
        $sql_query_one['app_avatar'] = Wo_GetMedia($sql_query_one['app_avatar']);
        return $sql_query_one;
    }
}
function Wo_GetCode($code = '') {
    global $sqlConnect, $wo;
    if (empty($code)) {
        return false;
    }
    $code      = Wo_Secure($code);
    $query_one = mysqli_query($sqlConnect, "SELECT * FROM " . T_CODES . " WHERE `code` = '{$code}'");
    if (mysqli_num_rows($query_one) == 1) {
        $sql_query_one = mysqli_fetch_assoc($query_one);
        return $sql_query_one;
    }
}
function Wo_UpdateAppImage($app_id, $image) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($app_id) || !is_numeric($app_id) || $app_id < 0) {
        return false;
    }
    if (empty($image)) {
        return false;
    }
    $app_id    = Wo_Secure($app_id);
    $query_one = " UPDATE " . T_APPS . " SET `app_avatar` = '{$image}' WHERE `id` = {$app_id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
}
function Wo_UpdateAppData($app_id, $update_data) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($app_id) || !is_numeric($app_id) || $app_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $app_id = Wo_Secure($app_id);
    if (!Wo_IsAppOnwer($app_id) && !Wo_IsAdmin()) {
        return false;
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = " UPDATE " . T_APPS . " SET {$impload} WHERE `id` = {$app_id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetIdFromAppID($app_id) {
    global $sqlConnect;
    if (empty($app_id)) {
        return false;
    }
    $app_id        = Wo_Secure($app_id);
    $query_one     = "SELECT `id` FROM " . T_APPS . " WHERE `app_id` = '{$app_id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['id'];
    }
}
function Wo_AccessToken($app_id, $app_secret) {
    global $sqlConnect;
    if (empty($app_id)) {
        return false;
    }
    if (empty($app_secret)) {
        return false;
    }
    $app_id        = Wo_Secure($app_id);
    $app_secret    = Wo_Secure($app_secret);
    $query_one     = "SELECT `id` FROM " . T_APPS . " WHERE `app_id` = '{$app_id}' AND `app_secret` = '{$app_secret}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        return true;
    } else {
        return false;
    }
}
function Wo_IsValidApp($app_id) {
    global $sqlConnect;
    if (empty($app_id)) {
        return false;
    }
    $app_id        = Wo_Secure($app_id);
    $query_one     = "SELECT `id` FROM " . T_APPS . " WHERE `app_id` = '{$app_id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        return true;
    }
    return false;
}
function Wo_VerifyAPIApii($app_id = '', $secret_id = '') {
    global $sqlConnect;
    if (empty($app_id) || empty($secret_id)) {
        return false;
    }
    $app_id        = Wo_Secure($app_id);
    $secret_id     = Wo_Secure($secret_id);
    $query_one     = "SELECT `id` FROM " . T_APPS . " WHERE `app_id` = '{$app_id}' AND `app_secret` = '$secret_id'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        return true;
    }
    return false;
}
function Wo_AppHasPermission($user_id, $app_id) {
    global $sqlConnect, $wo;
    if (empty($app_id)) {
        return false;
    }
    $app_id        = Wo_Secure($app_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_APPS_PERMISSION . " WHERE `app_id` = '{$app_id}' AND `user_id` = '{$user_id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) > 0) {
        return true;
    } else {
        return false;
    }
}
function Wo_AcceptPermissions($app_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $app_id  = Wo_Secure($app_id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (empty($app_id) || empty($user_id)) {
        return false;
    }
    $query_one     = "INSERT INTO " . T_APPS_PERMISSION . " (`user_id`,`app_id`) VALUES ('{$user_id}','{$app_id}')";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if ($sql_query_one) {
        return true;
    }
}
function Wo_GenrateToken($user_id, $app_id) {
    global $sqlConnect, $wo;
    $app_id  = Wo_Secure($app_id);
    $user_id = Wo_Secure($user_id);
    if (empty($app_id) || empty($user_id)) {
        return false;
    }
    $token     = Wo_GenerateKey(100, 100);
    $query_two = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_TOKENS . " WHERE `app_id` = {$app_id} AND `user_id` = {$user_id}");
    if (mysqli_num_rows($query_two) > 0) {
        $query_three = mysqli_query($sqlConnect, "DELETE FROM " . T_TOKENS . " WHERE `app_id` = {$app_id} AND `user_id` = {$user_id}");
    }
    $query_one     = "INSERT INTO " . T_TOKENS . " (`user_id`,`app_id`,`token`,`time`) VALUES ('{$user_id}','{$app_id}','{$token}','" . time() . "')";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if ($sql_query_one) {
        return $token;
    }
}
function Wo_GenrateCode($user_id, $app_id) {
    global $sqlConnect, $wo;
    $app_id  = Wo_Secure($app_id);
    $user_id = Wo_Secure($user_id);
    if (empty($app_id) || empty($user_id)) {
        return false;
    }
    $token     = Wo_GenerateKey(40, 40);
    $query_two = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_CODES . " WHERE `app_id` = {$app_id} AND `user_id` = {$user_id}");
    if (mysqli_num_rows($query_two) > 0) {
        $query_three = mysqli_query($sqlConnect, "DELETE FROM " . T_CODES . " WHERE `app_id` = {$app_id} AND `user_id` = {$user_id}");
    }
    $query_one     = "INSERT INTO " . T_CODES . " (`user_id`,`app_id`,`code`,`time`) VALUES ('{$user_id}','{$app_id}','{$token}','" . time() . "')";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if ($sql_query_one) {
        return $token;
    }
}
function Wo_UserIdFromToken($token = '') {
    global $sqlConnect, $wo;
    if (empty($token)) {
        return false;
    }
    $time          = time() - 3600;
    $query         = mysqli_query($sqlConnect, "DELETE FROM " . T_TOKENS . " WHERE `token` = '{$token}' AND `time` < $time");
    $query_one     = "SELECT `user_id` FROM " . T_TOKENS . " WHERE `token` = '{$token}' AND `time` > $time";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_query_two = mysqli_fetch_assoc($sql_query_one);
        return $sql_query_two['user_id'];
    } else {
        return false;
    }
}
function Wo_GetIdFromToken($token) {
    global $sqlConnect, $wo;
    if (empty($token)) {
        return false;
    }
    $query_one     = "SELECT `app_id` FROM " . T_TOKENS . " WHERE `token` = '{$token}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_query_two = mysqli_fetch_assoc($sql_query_one);
        return $sql_query_two['app_id'];
    } else {
        return false;
    }
}
function Wo_RegisterPage($registration_data = array()) {
    global $wo, $sqlConnect;
    if (empty($registration_data)) {
        return false;
    }
    if (!empty($registration_data['page_category'])) {
        if (!in_array($registration_data['page_category'], array_keys($wo['page_categories']))) {
            $registration_data['page_category'] = 1;
        }
    }
    $registration_data['registered'] = date('n') . '/' . date("Y");
    $fields                          = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data                            = '\'' . implode('\', \'', $registration_data) . '\'';
    $query                           = mysqli_query($sqlConnect, "INSERT INTO " . T_PAGES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetMyPages($user_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data       = array();
    $user_id    = Wo_Secure($user_id);
    if (!$user_id || !is_numeric($user_id) || $user_id < 1) {
        $user_id  = Wo_Secure($wo['user']['user_id']);
    }  
    $query_text = "SELECT `page_id` FROM " . T_PAGES . " 
                   WHERE `user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM ".T_PAGE_ADMINS."
                   WHERE `user_id` = {$user_id})";
    $query_one  = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        if (is_array($fetched_data)) {
            $data[] = Wo_PageData($fetched_data['page_id']);
        }
    }

    return $data;
}
function Wo_IsPageOnwer($page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id) || $page_id < 0) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $query = mysqli_query($sqlConnect, " SELECT COUNT(`user_id`) FROM " . T_PAGES . " WHERE `page_id` = {$page_id} AND `user_id` = {$user_id} AND `active` = '1'");
    return (Wo_Sql_Result($query, '0') == 1 || Wo_IsPageAdminExists($user_id,$page_id)) ? true : false;
}
function Wo_PageExists($page_name = '') {
    global $sqlConnect;
    if (empty($page_name)) {
        return false;
    }
    $page_name = Wo_Secure($page_name);
    $query     = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) FROM " . T_PAGES . " WHERE `page_name`= '{$page_name}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_PageExistsByID($id = 0) {
    global $sqlConnect;
    if (empty($id)) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) FROM " . T_PAGES . " WHERE `page_id`= '{$id}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_PageIdFromPagename($page_name = '') {
    global $sqlConnect;
    if (empty($page_name)) {
        return false;
    }
    $page_name = Wo_Secure($page_name);
    $query     = mysqli_query($sqlConnect, "SELECT `page_id` FROM " . T_PAGES . " WHERE `page_name` = '{$page_name}'");
    return Wo_Sql_Result($query, 0, 'page_id');
}
function Wo_PageData($page_id = 0) {
    global $wo, $sqlConnect, $cache;
    if (empty($page_id) || !is_numeric($page_id) || $page_id < 0) {
        return false;
    }
    $data           = array();
    $page_id        = Wo_Secure($page_id);
    $query_one      = "SELECT * FROM " . T_PAGES . " WHERE `page_id` = {$page_id}";
    $hashed_page_Id = md5($page_id);
    if ($wo['config']['cacheSystem'] == 1) {
        $fetched_data = $cache->read($hashed_page_Id . '_PAGE_Data.tmp');
        if (empty($fetched_data)) {
            $sql          = mysqli_query($sqlConnect, $query_one);
            $fetched_data = mysqli_fetch_assoc($sql);
            $cache->write($hashed_page_Id . '_PAGE_Data.tmp', $fetched_data);
        }
    } else {
        $sql          = mysqli_query($sqlConnect, $query_one);
        $fetched_data = mysqli_fetch_assoc($sql);
    }
    if (empty($fetched_data)) {
        return array();
    }
    $fetched_data['avatar']   = Wo_GetMedia($fetched_data['avatar']);
    $fetched_data['cover']    = Wo_GetMedia($fetched_data['cover']);
    $fetched_data['about']    = $fetched_data['page_description'];
    $fetched_data['id']       = $fetched_data['page_id'];
    $fetched_data['type']     = 'page';
    $fetched_data['url']      = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['page_name']);
    $fetched_data['name']     = $fetched_data['page_title'];
    $fetched_data['rating']   = Wo_PageRating($fetched_data['page_id']);
    $fetched_data['category'] = '';
    if (!empty($wo['page_categories'][$fetched_data['page_category']])) {
        $fetched_data['category'] = $wo['page_categories'][$fetched_data['page_category']];
    }
    $fetched_data['is_page_onwer'] = false;
    $fetched_data['username']      = $fetched_data['page_name'];
    if ($wo['loggedin'] == true) {
        $fetched_data['is_page_onwer'] = (Wo_IsPageOnwer($fetched_data['page_id'])) ? true : false;
    }
    return $fetched_data;
}
function Wo_PageActive($page_name) {
    global $sqlConnect;
    if (empty($page_name)) {
        return false;
    }
    $page_name = Wo_Secure($page_name);
    $query     = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) FROM " . T_PAGES . "  WHERE `page_name`= '{$page_name}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_GetPagePostPublisherBox($page_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!is_numeric($page_id) or $page_id < 1 or !is_numeric($page_id)) {
        return false;
    }
    if (Wo_IsPageOnwer($page_id)) {
        return Wo_LoadPage('story/publisher-box');
    }
}
function Wo_GetLikeButton($page_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id) or $page_id < 0) {
        return false;
    }
    if (Wo_IsPageOnwer($page_id)) {
        return false;
    }
    $page = $wo['like'] = Wo_PageData($page_id);
    if (!isset($wo['like']['page_id'])) {
        return false;
    }
    $page_id        = Wo_Secure($page_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $like_button    = 'buttons/like';
    $unlike_button  = 'buttons/unlike';
    if (Wo_IsPageLiked($page_id, $logged_user_id) === true) {
        return Wo_LoadPage($unlike_button);
    } else {
        return Wo_LoadPage($like_button);
    }
}
function Wo_IsPoked($received_user_id = 0, $send_user_id = 0){
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($received_user_id) || !is_numeric($received_user_id) || $received_user_id < 0) {
        return false;
    }
    if (empty($send_user_id) || !is_numeric($send_user_id) || $send_user_id < 0) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_POKES . " WHERE `received_user_id` = '{$received_user_id}' AND `send_user_id` = {$send_user_id}");
    return (Wo_Sql_Result($query_one, 0) == 1) ? true : false;
}

function Wo_IsPageLiked($page_id = 0, $user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id) || $page_id < 0) {
        return false;
    }
    if (empty($page_id) || !is_numeric($user_id) || $user_id < 0) {
        $user_id = Wo_Secure($wo['user']['user_id']);
    }
    $query_one = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_PAGES_LIKES . " WHERE `user_id` = '{$user_id}' AND `page_id` = {$page_id} AND `active` = '1'");
    return (Wo_Sql_Result($query_one, 0) == 1) ? true : false;
}
function Wo_RegisterPageLike($page_id = 0, $user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($page_id) or empty($page_id) or !is_numeric($page_id) or $page_id < 1) {
        return false;
    }
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $page_id    = Wo_Secure($page_id);
    $user_id    = Wo_Secure($user_id);
    $page_onwer = Wo_GetUserIdFromPageId($page_id);
    $active     = 1;
    if (Wo_IsPageLiked($page_id, $user_id) === true) {
        return false;
    }
    $page_data = Wo_PageData($page_id);
    $query     = mysqli_query($sqlConnect, " INSERT INTO " . T_PAGES_LIKES . " (`user_id`,`page_id`,`active`,`time`) VALUES ({$user_id},{$page_id},'1'," . time() . ")");
    if ($query) {
        if (Wo_IsPageInvited($user_id, $page_id) > 0) {
            foreach (Wo_GetPageInviters($user_id, $page_id) as $user) {
                $notification_data = array(
                    'recipient_id' => $user['user_id'],
                    'notifier_id' => $user_id,
                    'type' => 'accepted_invite',
                    'page_id' => $page_id,
                    'url' => 'index.php?link1=timeline&u=' . $page_data['page_name']
                );
                Wo_RegisterNotification($notification_data);
            }
            $delete_invite = Wo_DeleteInvites($user_id, $page_id);
        }
        $notification_data = array(
            'recipient_id' => $page_onwer,
            'notifier_id' => $user_id,
            'page_enable' => false,
            'type' => 'liked_page',
            'page_id' => $page_id,
            'url' => 'index.php?link1=timeline&u=' . $page_data['page_name']
        );
        Wo_RegisterNotification($notification_data);
    }
    return true;
}
function Wo_DeletePageLike($page_id = 0, $user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($page_id) or empty($page_id) or !is_numeric($page_id) or $page_id < 1) {
        return false;
    }
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $page_id = Wo_Secure($page_id);
    $user_id = Wo_Secure($user_id);
    $active  = 1;
    if (Wo_IsPageLiked($page_id, $user_id) === false) {
        return false;
    }
    $user_data = Wo_UserData($user_id);
    $query     = mysqli_query($sqlConnect, " DELETE FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$user_id} AND `page_id` = '{$page_id}' AND `active` = '1'");
    if ($query) {
        return true;
    }
}
function Wo_UpdatePageData($page_id = 0, $update_data) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id) || $page_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (isset($update_data['verified'])) {
        if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
            return false;
        }
    }
    $page_id = Wo_Secure($page_id);
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        if (Wo_IsPageOnwer($page_id) === false) {
            return false;
        }
    }
    if (!empty($update_data['page_category'])) {
        if (!array_key_exists($update_data['page_category'], $wo['page_categories'])) {
            $update_data['page_category'] = 1;
        }
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = " UPDATE " . T_PAGES . " SET {$impload} WHERE `page_id` = {$page_id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($wo['config']['cacheSystem'] == 1) {
        $cache->delete(md5($page_id) . '_PAGE_Data.tmp');
    }
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_UpdatePostData($post_id = 0, $update_data) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $post_id = Wo_Secure($post_id);
    if (Wo_IsAdmin() === false) {
        if (Wo_IsPostOnwer($post_id, $wo['user']['user_id']) === false) {
            return false;
        }
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = " UPDATE " . T_POSTS . " SET {$impload} WHERE `id` = {$post_id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($wo['config']['cacheSystem'] == 1) {
        $cache->delete(md5($post_id) . '_P_Data.tmp');
    }
    if ($query) {
        return $post_id;
    } else {
        return false;
    }
}
function Wo_GetPageIdFromPostId($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `page_id` FROM " . T_POSTS . " WHERE `id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['page_id'];
    }
}
function Wo_GetUserIdFromPageId($page_id = 0) {
    global $sqlConnect;
    if (empty($page_id) or !is_numeric($page_id) or $page_id < 1) {
        return false;
    }
    $page_id       = Wo_Secure($page_id);
    $query_one     = "SELECT `user_id` FROM " . T_PAGES . " WHERE `page_id` = {$page_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['user_id'];
    }
}
function Wo_DeletePage($page_id = 0) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id) || $page_id < 1) {
        return false;
    }
    $page_id = Wo_Secure($page_id);
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        if (Wo_IsPageOnwer($page_id) === false) {
            return false;
        }
    }
    $query_one_delete_photos = mysqli_query($sqlConnect, " SELECT `avatar`,`cover` FROM " . T_PAGES . " WHERE `page_id` = {$page_id}");
    $fetched_data            = mysqli_fetch_assoc($query_one_delete_photos);
    if (isset($fetched_data['avatar']) && !empty($fetched_data['avatar']) && $fetched_data['avatar'] != $wo['pageDefaultAvatar']) {
        @unlink($fetched_data['avatar']);
    }
    if (isset($fetched_data['cover']) && !empty($fetched_data['cover']) && $fetched_data['cover'] != $wo['userDefaultCover']) {
        @unlink($fetched_data['cover']);
    }
    $query_two_delete_media = mysqli_query($sqlConnect, " SELECT `postFile` FROM " . T_POSTS . " WHERE `page_id` = {$page_id}");
    if (mysqli_num_rows($query_two_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_two_delete_media)) {
            if (isset($fetched_data['postFile']) && !empty($fetched_data['postFile'])) {
                @unlink($fetched_data['postFile']);
            }
        }
    }
    $query_four_delete_media = mysqli_query($sqlConnect, "SELECT `id`,`post_id` FROM " . T_POSTS . " WHERE `page_id` = {$page_id}");
    if (mysqli_num_rows($query_four_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_four_delete_media)) {
            $delete_posts = Wo_DeletePost($fetched_data['id']);
            $delete_posts = Wo_DeletePost($fetched_data['post_id']);
        }
    }
    if ($wo['config']['cacheSystem'] == 1) {
        $cache->delete(md5($user_id) . '_PAGE_Data.tmp');
        $query_two = mysqli_query($sqlConnect, "SELECT `id`,`post_id` FROM " . T_POSTS . " WHERE `page_id` = {$page_id}");
        if (mysqli_num_rows($query_two) > 0) {
            while ($fetched_data_two = mysqli_fetch_assoc($query_two)) {
                $cache->delete(md5($fetched_data_two['id']) . '_PAGE_Data.tmp');
                $cache->delete(md5($fetched_data_two['post_id']) . '_PAGE_Data.tmp');
            }
        }
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_PAGES . " WHERE `page_id` = {$page_id}");
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_PAGES_INVAITES . " WHERE `page_id` = {$page_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGES_LIKES . " WHERE `page_id` = {$page_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `page_id` = {$page_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_VERIFICATION_REQUESTS . " WHERE `page_id` = {$page_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGE_ADMINS . " WHERE `page_id` = {$page_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_PAGE_RATING . " WHERE `page_id` = {$page_id}");
    if ($query_one) {
        return true;
    }
}
function Wo_CountPageLikes($page_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($page_id) or !is_numeric($page_id) or $page_id < 1) {
        return false;
    }
    $page_id      = Wo_Secure($page_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) AS count FROM " . T_PAGES_LIKES . " WHERE `page_id` = {$page_id} AND `active` = '1' ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_CountPagePosts($page_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($page_id) or !is_numeric($page_id) or $page_id < 1) {
        return false;
    }
    $page_id      = Wo_Secure($page_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_POSTS . " WHERE `page_id` = {$page_id}");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
if (isset($wo['config']['is_ok'])) {
    if ($wo['config']['is_ok'] == 0) {
        die();
    }
}
function Wo_CountLikesThisWeek($page_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    $time = strtotime("-1 week");
    if (empty($page_id) or !is_numeric($page_id) or $page_id < 1) {
        return false;
    }
    $page_id      = Wo_Secure($page_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) AS count FROM " . T_PAGES_LIKES . " WHERE `page_id` = {$page_id} AND `active` = '1' AND (`time` between {$time} AND " . time() . ")");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_PageSug($limit = 1, $page_id = 0, $type = 'next') {
    global $wo, $sqlConnect;
    if (!is_numeric($limit)) {
        return false;
    }
    $query_not = '';
    if (!is_numeric($page_id) || empty($page_id) || $page_id < 1) {
        $query_not = '';
    }
    if ($type == 'previous') {
        $query_not = "AND `page_id` < $page_id";
    } else {
        $query_not = "AND `page_id` > $page_id";
    }
    $data      = array();
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $query_one = " SELECT `page_id` FROM " . T_PAGES . " WHERE `active` = '1' {$query_not} AND `page_id` NOT IN (SELECT `page_id` FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$user_id} AND `active` = '1') AND `user_id` <> {$user_id}";
    if (isset($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        if (is_array($fetched_data)) {
            $data[] = Wo_PageData($fetched_data['page_id']);
        }
    }
    return $data;
}
function Wo_GetLikes($user_id = 0, $type = '', $limit = '', $after_user_id = '', $placement = array()) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id       = Wo_Secure($user_id);
    $after_user_id = Wo_Secure($after_user_id);
    $query         = " SELECT `page_id` FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$user_id} AND `active` = '1'";
    if (!empty($after_user_id) && is_numeric($after_user_id)) {
        $query .= " AND `page_id` < {$after_user_id}";
    }
    if ($type == 'sidebar' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY RAND()";
    }
    if ($type == 'profile' && !empty($limit) && is_numeric($limit)) {
        $query .= " ORDER BY `page_id` DESC";
    }
    $query .= " LIMIT {$limit} ";
    if (!empty($placement)) {
        if ($placement['in'] == 'profile_sidebar' && is_array($placement['likes_data'])) {
            foreach ($placement['likes_data'] as $key => $id) {
                $page_data   = Wo_PageData($id, false);
                if (!empty($page_data)) {
                    $data[]  = $page_data;
                }
            }
            return $data;
        }
    }
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_PageData($fetched_data['page_id']);
    }
    return $data;
}
function Wo_CountUserLikes($user_id) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id      = Wo_Secure($user_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) AS count FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$user_id} AND `active` = '1' ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_GetAllPages($limit = '', $after = '') {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT `page_id` FROM " . T_PAGES;
    if (!empty($after) && is_numeric($after) && $after > 0) {
        $query_one .= " WHERE `page_id` < " . Wo_Secure($after);
    }
    $query_one .= " ORDER BY `page_id` DESC";
    if (isset($limit) and !empty($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $page_data          = Wo_PageData($fetched_data['page_id']);
        $page_data['owner'] = Wo_UserData($page_data['user_id']);
        $data[]             = $page_data;
    }
    return $data;
}
function Wo_RegisterGroup($registration_data = array()) {
    global $wo, $sqlConnect;
    if (empty($registration_data)) {
        return false;
    }
    if (!empty($registration_data['category'])) {
        if (!in_array($registration_data['category'], array_keys($wo['page_categories']))) {
            $registration_data['category'] = 1;
        }
    }
    $registration_data['registered'] = date('n') . '/' . date("Y");
    $fields                          = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data                            = '\'' . implode('\', \'', $registration_data) . '\'';
    $query                           = mysqli_query($sqlConnect, "INSERT INTO " . T_GROUPS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        $query_id = mysqli_insert_id($sqlConnect);
        Wo_RegisterGroupJoin($query_id, $wo['user']['user_id']);
        return true;
    } else {
        return false;
    }
}
function Wo_GetMyGroups() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data       = array();
    $user_id    = Wo_Secure($wo['user']['user_id']);
    $query_text = "SELECT `id` FROM " . T_GROUPS . " WHERE `user_id` = {$user_id} 
                   OR `id` IN (SELECT `group_id` FROM ".T_GROUP_ADMINS." WHERE `user_id` = {$user_id})";
    $query_one  = mysqli_query($sqlConnect, $query_text);
   
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        if (is_array($fetched_data)) {
            $data[] = Wo_GroupData($fetched_data['id']);
        }
    }

    return  $data;
}
function Wo_IsGroupOnwer($group_id = 0, $user_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id) || $group_id < 0) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        $user_id = Wo_Secure($wo['user']['user_id']);
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $query = mysqli_query($sqlConnect, " SELECT COUNT(`user_id`) FROM " . T_GROUPS . " WHERE `id` = {$group_id} AND `user_id` = {$user_id} AND `active` = '1'");
    return (Wo_Sql_Result($query, '0') == 1 || Wo_IsGroupUserExists($user_id,$group_id)) ? true : false;
}
function Wo_GroupExists($group_name = '') {
    global $sqlConnect;
    if (empty($group_name)) {
        return false;
    }
    $group_name = Wo_Secure($group_name);
    $query      = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_GROUPS . " WHERE `group_name`= '{$group_name}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_GroupIdFromGroupname($group_name = '') {
    global $sqlConnect;
    if (empty($group_name)) {
        return false;
    }
    $group_name = Wo_Secure($group_name);
    $query      = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_GROUPS . " WHERE `group_name` = '{$group_name}'");
    return Wo_Sql_Result($query, 0, 'id');
}
function Wo_GroupData($group_id = 0) {
    global $wo, $sqlConnect, $cache;
    if (empty($group_id) || !is_numeric($group_id) || $group_id < 1) {
        return false;
    }
    $data            = array();
    $group_id        = Wo_Secure($group_id);
    $query_one       = "SELECT * FROM " . T_GROUPS . " WHERE `id` = {$group_id}";
    $hashed_group_Id = md5($group_id);
    if ($wo['config']['cacheSystem'] == 1) {
        $fetched_data = $cache->read($hashed_group_Id . '_GROUP_Data.tmp');
        if (empty($fetched_data)) {
            $sql          = mysqli_query($sqlConnect, $query_one);
            $fetched_data = mysqli_fetch_assoc($sql);
            $cache->write($hashed_group_Id . '_GROUP_Data.tmp', $fetched_data);
        }
    } else {
        $sql          = mysqli_query($sqlConnect, $query_one);
        $fetched_data = mysqli_fetch_assoc($sql);
    }
    if (empty($fetched_data)) {
        return array();
    }
    $fetched_data['group_id']    = $fetched_data['id'];
    $fetched_data['avatar']      = Wo_GetMedia($fetched_data['avatar']);
    $fetched_data['cover']       = Wo_GetMedia($fetched_data['cover']);
    $fetched_data['url']         = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['group_name']);
    $fetched_data['name']        = $fetched_data['group_title'];
    $fetched_data['category_id'] = $fetched_data['category'];
    $fetched_data['type']        = 'group';
    $fetched_data['username']    = $fetched_data['group_name'];
    $fetched_data['category']    = $wo['page_categories'][$fetched_data['category']];
    return $fetched_data;
}
function Wo_GroupActive($group_name) {
    global $sqlConnect;
    if (empty($group_name)) {
        return false;
    }
    $group_name = Wo_Secure($group_name);
    $query      = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_GROUPS . "  WHERE `group_name` = '{$group_name}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_CanBeOnGroup($group_id) {
    global $sqlConnect;
    if (empty($group_id)) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    if (Wo_IsGroupOnwer($group_id)) {
        return true;
    }
    $group = Wo_GroupData($group_id);
    if (empty($group)) {
        return false;
    }
    if ($group['privacy'] == 2) {
        if (Wo_IsGroupJoined($group_id) === true) {
            return true;
        }
    } else if ($group['privacy'] == 1) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetGroupPostPublisherBox($group_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!is_numeric($group_id) or $group_id < 1 or !is_numeric($group_id)) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    $continue = false;
    if (Wo_CanBeOnGroup($group_id) === true) {
        $continue = true;
    }
    if ($continue == true) {
        return Wo_LoadPage('story/publisher-box');
    }
}
function Wo_GetJoinButton($group_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id) or $group_id < 0) {
        return false;
    }
    if (Wo_IsGroupOnwer($group_id)) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    $group    = $wo['join'] = Wo_GroupData($group_id);
    if (!isset($wo['join']['id'])) {
        return false;
    }
    $logged_user_id        = Wo_Secure($wo['user']['user_id']);
    $join_button           = 'buttons/join';
    $leave_button          = 'buttons/leave';
    $accept_request_button = 'buttons/join-requested';
    if (Wo_IsGroupJoined($group_id, $logged_user_id) === true) {
        return Wo_LoadPage($leave_button);
    } else {
        if (Wo_IsJoinRequested($group_id) === true) {
            return Wo_LoadPage($accept_request_button);
        } else {
            return Wo_LoadPage($join_button);
        }
    }
}
function Wo_GetGoingButton($event_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($event_id) || !is_numeric($event_id) or $event_id < 0) {
        return false;
    }
    if (Is_EventOwner($event_id, false, false)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $event    = $wo['going'] = Wo_EventData($event_id);
    if (!isset($wo['going']['id'])) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $going          = 'buttons/going';
    $no_going       = 'buttons/no-going';
    if (Wo_EventGoingExists($event_id) === true) {
        return Wo_LoadPage($no_going);
    } else {
        return Wo_LoadPage($going);
    }
}
function Wo_GetInterestedButton($event_id = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($event_id) || !is_numeric($event_id) or $event_id < 0) {
        return false;
    }
    if (Is_EventOwner($event_id, false, false)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $event    = $wo['interested'] = Wo_EventData($event_id);
    if (!isset($wo['interested']['id'])) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $interested     = 'buttons/interested';
    $no_interested  = 'buttons/no-interested';
    if (Wo_EventInterestedExists($event_id) === true) {
        return Wo_LoadPage($no_interested);
    } else {
        return Wo_LoadPage($interested);
    }
}
function Wo_IsGroupJoined($group_id = 0, $user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id) || $group_id < 0) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        $user_id = Wo_Secure($wo['user']['user_id']);
    }
    $group_id  = Wo_Secure($group_id);
    $query_one = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = '{$user_id}' AND `group_id` = {$group_id} AND `active` = '1'");
    return (Wo_Sql_Result($query_one, 0) == 1) ? true : false;
}
function Wo_IsJoinRequested($group_id = 0, $user_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        $user_id = Wo_Secure($wo['user']['user_id']);
    }
    if (!is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id  = Wo_Secure($group_id);
    $query     = "SELECT `id` FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `user_id` = {$user_id} AND `active` = '0'";
    $sql_query = mysqli_query($sqlConnect, $query);
    if (mysqli_num_rows($sql_query) > 0) {
        return true;
    }
}
function Wo_RegisterGroupJoin($group_id = 0, $user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($group_id) or empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $group_id    = Wo_Secure($group_id);
    $user_id     = Wo_Secure($user_id);
    $group_onwer = Wo_GetUserIdFromGroupId($group_id);
    $active      = 1;
    if (Wo_IsGroupJoined($group_id, $user_id) === true) {
        return false;
    }
    $group_data = Wo_GroupData($group_id);
    if ($group_data['join_privacy'] == 2) {
        $active = 0;
    }
    $query = mysqli_query($sqlConnect, " INSERT INTO " . T_GROUP_MEMBERS . " (`user_id`,`group_id`,`active`,`time`) VALUES ({$user_id},{$group_id},'{$active}'," . time() . ")");
    if ($query) {
        if ($active == 1) {
            $notification_data = array(
                'recipient_id' => $group_onwer,
                'notifier_id' => $user_id,
                'type' => 'joined_group',
                'group_id' => $group_id,
                'url' => 'index.php?link1=timeline&u=' . $group_data['group_name']
            );
            Wo_RegisterNotification($notification_data);
        } else if ($active == 0) {
            $notification_data = array(
                'recipient_id' => $group_onwer,
                'notifier_id' => $user_id,
                'type' => 'requested_to_join_group',
                'group_id' => $group_id,
                'url' => 'index.php?link1=group-setting&group=' . $group_data['group_name'] . '&link3=requests'
            );
            Wo_RegisterNotification($notification_data);
        }
    }
    return true;
}
function Wo_LeaveGroup($group_id = 0, $user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($group_id) or empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    $user_id  = Wo_Secure($user_id);
    $active   = 1;
    if (Wo_IsGroupJoined($group_id, $user_id) === false && Wo_IsJoinRequested($group_id, $user_id) === false) {
        return false;
    }
    $query = mysqli_query($sqlConnect, " DELETE FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$user_id} AND `group_id` = '{$group_id}'");
    if ($query) {
        return true;
    }
}
function Wo_UpdateGroupData($group_id = 0, $update_data) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id) || $group_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        if (Wo_IsGroupOnwer($group_id) === false) {
            return false;
        }
    }
    if (!empty($update_data['category'])) {
        if (!array_key_exists($update_data['category'], $wo['page_categories'])) {
            $update_data['category'] = 1;
        }
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
    }

    $impload   = implode(', ', $update);
    $query_one = " UPDATE " . T_GROUPS . " SET {$impload} WHERE `id` = {$group_id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($wo['config']['cacheSystem'] == 1) {
        $cache->delete(md5($group_id) . '_GROUP_Data.tmp');
    }
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetGroupIdFromPostId($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT `group_id` FROM " . T_POSTS . " WHERE `id` = {$post_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['group_id'];
    }
}
function Wo_GetUserIdFromGroupId($group_id = 0) {
    global $sqlConnect;
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id      = Wo_Secure($group_id);
    $query_one     = "SELECT `user_id` FROM " . T_GROUPS . " WHERE `id` = {$group_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['user_id'];
    }
}
function Wo_DeleteGroup($group_id = 0) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id) || $group_id < 1) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
        if (Wo_IsGroupOnwer($group_id) === false) {
            return false;
        }
    }
    $query_one_delete_photos = mysqli_query($sqlConnect, " SELECT `avatar`,`cover` FROM " . T_GROUPS . " WHERE `id` = {$group_id}");
    $fetched_data            = mysqli_fetch_assoc($query_one_delete_photos);
    if (isset($fetched_data['avatar']) && !empty($fetched_data['avatar']) && $fetched_data['avatar'] != $wo['groupDefaultAvatar']) {
        @unlink($fetched_data['avatar']);
    }
    if (isset($fetched_data['cover']) && !empty($fetched_data['cover']) && $fetched_data['cover'] != $wo['userDefaultCover']) {
        @unlink($fetched_data['cover']);
    }
    $query_two_delete_media = mysqli_query($sqlConnect, " SELECT `postFile` FROM " . T_POSTS . " WHERE `group_id` = {$group_id}");
    if (mysqli_num_rows($query_two_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_two_delete_media)) {
            if (isset($fetched_data['postFile']) && !empty($fetched_data['postFile'])) {
                @unlink($fetched_data['postFile']);
            }
        }
    }
    $query_four_delete_media = mysqli_query($sqlConnect, "SELECT `id`,`post_id` FROM " . T_POSTS . " WHERE `group_id` = {$group_id}");
    if (mysqli_num_rows($query_four_delete_media) > 0) {
        while ($fetched_data = mysqli_fetch_assoc($query_four_delete_media)) {
            $delete_posts = Wo_DeletePost($fetched_data['id']);
            $delete_posts = Wo_DeletePost($fetched_data['post_id']);
        }
    }
    if ($wo['config']['cacheSystem'] == 1) {
        $cache->delete(md5($user_id) . '_GROUP_Data.tmp');
        $query_two = mysqli_query($sqlConnect, "SELECT `id`,`post_id` FROM " . T_POSTS . " WHERE `group_id` = {$group_id}");
        if (mysqli_num_rows($query_two) > 0) {
            while ($fetched_data_two = mysqli_fetch_assoc($query_two)) {
                $cache->delete(md5($fetched_data_two['id']) . '_GROUP_Data.tmp');
                $cache->delete(md5($fetched_data_two['post_id']) . '_GROUP_Data.tmp');
            }
        }
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_GROUPS . " WHERE `id` = {$group_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `group_id` = {$group_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_ADMINS . " WHERE `group_id` = {$group_id}");
    $query_one .= mysqli_query($sqlConnect, "DELETE FROM " . T_POSTS . " WHERE `group_id` = {$group_id}");
    if ($query_one) {
        return true;
    }
}
function Wo_CountGroupMembers($group_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id     = Wo_Secure($group_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`group_id`) AS count FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `active` = '1' ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_CountGroupPosts($group_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id     = Wo_Secure($group_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_POSTS . " WHERE `group_id` = {$group_id}");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_CountJoinedThisWeek($group_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    $time = strtotime("-1 week");
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id     = Wo_Secure($group_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`group_id`) AS count FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `active` = '1' AND (`time` between {$time} AND " . time() . ")");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_GroupSug($limit = 20) {
    global $wo, $sqlConnect;
    if (!is_numeric($limit)) {
        return false;
    }
    $data      = array();
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $query_one = " SELECT `id` FROM " . T_GROUPS . " WHERE `active` = '1' AND `id` NOT IN (SELECT `group_id` FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$user_id}) AND `user_id` <> {$user_id}";
    if (isset($limit)) {
        $query_one .= " ORDER BY RAND() LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[] = Wo_GroupData($fetched_data['id']);
    }
    return $data;
}
function Wo_GetGroupMembers($group_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id  = Wo_Secure($group_id);
    $query     = " SELECT `user_id` FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `active` = '1'";
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetUsersGroups($user_id = 0, $limit = 12, $placement = array()) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $query     = " SELECT `group_id` FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$user_id} AND `active` = '1' ORDER BY `id` LIMIT {$limit}";
    if (!empty($placement)) {
        if ($placement['in'] == 'profile_sidebar' && is_array($placement['groups_data'])) {
            foreach ($placement['groups_data'] as $key => $id) {
                $user_data   = Wo_GroupData($id);
                if (!empty($user_data)) {
                    $data[]  = $user_data;
                }
            }
            return $data;
        }
    }
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_GroupData($fetched_data['group_id']);
    }
    return $data;
}
function Wo_GetGroupSettingMembers($group_id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id  = Wo_Secure($group_id);
    $query     = " SELECT `user_id` FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `active` = '1'";
    $sql_query = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_CountUserGroups($user_id) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $user_id      = Wo_Secure($user_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$user_id} AND `active` = '1' ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_GetAllGroups($limit = '', $after = '') {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT `id` FROM " . T_GROUPS;
    if (!empty($after) && is_numeric($after) && $after > 0) {
        $query_one .= " WHERE `id` < " . Wo_Secure($after);
    }
    $query_one .= " ORDER BY `id` DESC";
    if (isset($limit) and !empty($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $group_data            = Wo_GroupData($fetched_data['id']);
        $group_data['members'] = Wo_CountGroupMembers($fetched_data['id']);
        $group_data['owner']   = Wo_UserData($group_data['user_id']);
        $data[]                = $group_data;
    }
    return $data;
}
function Wo_GetRegisteredDataStatics($month, $type = 'user') {
    global $wo, $sqlConnect;
    $year       = date("Y");
    $type_table = T_USERS;
    $type_id    = 'user_id';
    if ($type == 'user') {
        $type_table = T_USERS;
        $type_id    = 'user_id';
    } else if ($type == 'page') {
        $type_table = T_PAGES;
        $type_id    = 'page_id';
    } else if ($type == 'group') {
        $type_table = T_GROUPS;
        $type_id    = 'id';
    } else if ($type == 'posts') {
        $type_table = T_POSTS;
        $type_id    = 'id';
    }
    $type_id      = Wo_Secure($type_id);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT($type_id) as count FROM {$type_table} WHERE `registered` = '{$month}/{$year}'");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountAllData($type) {
    global $wo, $sqlConnect;
    $type_table = T_USERS;
    $type_id    = 'user_id';
    if ($type == 'user') {
        $type_table = T_USERS;
        $type_id    = 'user_id';
    } else if ($type == 'page') {
        $type_table = T_PAGES;
        $type_id    = 'page_id';
    } else if ($type == 'group') {
        $type_table = T_GROUPS;
        $type_id    = 'id';
    } else if ($type == 'posts') {
        $type_table = T_POSTS;
        $type_id    = 'id';
    } else if ($type == 'comments') {
        $type_table = T_COMMENTS;
        $type_id    = 'id';
    } else if ($type == 'games') {
        $type_table = T_GAMES;
        $type_id    = 'id';
    } else if ($type == 'messages') {
        $type_table = T_MESSAGES;
        $type_id    = 'id';
    }
    $type_id      = Wo_Secure($type_id);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT($type_id) as count FROM {$type_table}");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountOnlineData($type = '') {
    global $wo, $sqlConnect;
    $data         = array();
    $type_table   = T_USERS;
    $type_id      = Wo_Secure('user_id');
    $time         = time() - 60;
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`{$type_id}`) as count FROM {$type_table} WHERE `lastseen` > {$time}");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_GetAllOnlineData() {
    global $wo, $sqlConnect;
    $data       = array();
    $type_table = T_USERS;
    $type_id    = Wo_Secure('user_id');
    $time       = time() - 60;
    $query_one  = mysqli_query($sqlConnect, "SELECT `user_id` FROM {$type_table} WHERE `lastseen` > {$time}");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetAllProUsers() {
    global $wo, $sqlConnect;
    $data       = array();
    $type_table = T_USERS;
    $type_id    = Wo_Secure('user_id');
    $query_one  = mysqli_query($sqlConnect, "SELECT `user_id` FROM {$type_table} WHERE `is_pro` = '1' ORDER BY `pro_time` ASC");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetBanned($type = '') {
    global $sqlConnect;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_BANNED_IPS . " ORDER BY id DESC");
    if ($type == 'user') {
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            if (filter_var($fetched_data['ip_address'], FILTER_VALIDATE_IP)) {
                $data[] = $fetched_data['ip_address'];
            }
        }
    } else {
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = $fetched_data;
        }
    }
    return $data;
}
function Wo_IsBanned($value = '') {
    global $sqlConnect;
    $value           = Wo_Secure($value);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_BANNED_IPS . " WHERE `ip_address` = '{$value}'");
    $fetched_data = mysqli_fetch_assoc($query_one);
    if ($fetched_data['count'] > 0) {
        return true;
    }
    return false;
}
function Wo_BanNewIp($ip) {
    global $sqlConnect;
    $ip           = Wo_Secure($ip);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_BANNED_IPS . " WHERE `ip_address` = '{$ip}'");
    $fetched_data = mysqli_fetch_assoc($query_one);
    if ($fetched_data['count'] > 0) {
        return false;
    }
    $time      = time();
    $query_two = mysqli_query($sqlConnect, "INSERT INTO " . T_BANNED_IPS . " (`ip_address`,`time`) VALUES ('{$ip}','{$time}')");
    if ($query_two) {
        return true;
    }
}
function Wo_IsIpBanned($id) {
    global $sqlConnect;
    $id           = Wo_Secure($id);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_BANNED_IPS . " WHERE `id` = '{$id}'");
    $fetched_data = mysqli_fetch_assoc($query_one);
    if ($fetched_data['count'] > 0) {
        return true;
    } else {
        return false;
    }
}
function Wo_DeleteBanned($id) {
    global $sqlConnect;
    $id = Wo_Secure($id);
    if (Wo_IsIpBanned($id) === false) {
        return false;
    }
    $query_two = mysqli_query($sqlConnect, "DELETE FROM " . T_BANNED_IPS . " WHERE `id` = {$id}");
    if ($query_two) {
        return true;
    }
}
function Wo_GameExists($id) {
    global $sqlConnect;
    if (empty($id)) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_GAMES . " WHERE `id` = '{$id}'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_GameData($game_id) {
    global $wo, $sqlConnect, $cache;
    if (empty($game_id) || !is_numeric($game_id) || $game_id < 1) {
        return false;
    }
    $data           = array();
    $game_id        = Wo_Secure($game_id);
    $query_one      = "SELECT * FROM " . T_GAMES . " WHERE `id` = {$game_id}";
    $hashed_game_id = md5($game_id);
    if ($wo['config']['cacheSystem'] == 1) {
        $fetched_data = $cache->read($hashed_game_id . '_GAME_Data.tmp');
        if (empty($fetched_data)) {
            $sql          = mysqli_query($sqlConnect, $query_one);
            $fetched_data = mysqli_fetch_assoc($sql);
            $cache->write($hashed_game_id . '_GAME_Data.tmp', $fetched_data);
        }
    } else {
        $sql          = mysqli_query($sqlConnect, $query_one);
        $fetched_data = mysqli_fetch_assoc($sql);
    }
    if (empty($fetched_data)) {
        return array();
    }
    $fetched_data['game_avatar'] = Wo_GetMedia($fetched_data['game_avatar']);
    $fetched_data['url']         = Wo_SeoLink('index.php?link1=game&id=' . $fetched_data['id']);
    $fetched_data['name']        = $fetched_data['game_name'];
    $fetched_data['last_play']   = Wo_LastPlay($fetched_data['id']);
    return $fetched_data;
}
function Wo_LastPlay($id) {
    global $wo, $sqlConnect;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $id           = Wo_Secure($id);
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query        = mysqli_query($sqlConnect, "SELECT `last_play` FROM " . T_GAMES_PLAYERS . " WHERE `game_id` = {$id} AND `user_id` = {$user_id} AND `active` = '1' ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['last_play'];
}
function Wo_GetAllGames($limit = 5, $after = 0) {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT `id` FROM " . T_GAMES;
    if (!empty($after) && is_numeric($after) && $after > 0) {
        $query_one .= " WHERE `id` < " . Wo_Secure($after);
    }
    $query_one .= " ORDER BY `id` DESC";
    if (isset($limit) and !empty($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $fetched_data            = Wo_GameData($fetched_data['id']);
        $fetched_data['players'] = Wo_CountGamePlayers($fetched_data['id']);
        $data[]                  = $fetched_data;
    }
    return $data;
}
function Wo_AddGame($data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($data)) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($data)) . '`';
    $data   = '\'' . implode('\', \'', $data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_GAMES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetAllGifts($limit = 5, $after = 0) {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT * FROM " . T_GIFTS;
    if (!empty($after) && is_numeric($after) && $after > 0) {
        $query_one .= " WHERE `id` < " . Wo_Secure($after);
    }
    $query_one .= " ORDER BY `id` DESC";
    if (isset($limit) and !empty($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[]                  = $fetched_data;
    }
    return $data;
}
function Wo_GetAllStickers($limit = 5, $after = 0) {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT * FROM " . T_STICKERS;
    if (!empty($after) && is_numeric($after) && $after > 0) {
        $query_one .= " WHERE `id` < " . Wo_Secure($after);
    }
    $query_one .= " ORDER BY `id` DESC";
    if (isset($limit) and !empty($limit)) {
        $query_one .= " LIMIT {$limit}";
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[]                  = $fetched_data;
    }
    return $data;
}
function Wo_IsPlayingGame($id) {
    global $wo, $sqlConnect;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $id           = Wo_Secure($id);
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_GAMES_PLAYERS . " WHERE `game_id` = {$id} AND `user_id` = {$user_id} AND `active` = '1' ");
    $fetched_data = mysqli_fetch_assoc($query);
    if ($fetched_data['count'] > 0) {
        return true;
    }
}
function Wo_AddPlayGame($id) {
    global $wo, $sqlConnect;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $user_id = Wo_Secure($wo['user']['user_id']);
    $time    = time();
    if (Wo_IsPlayingGame($id) === true) {
        $query_one = mysqli_query($sqlConnect, "UPDATE " . T_GAMES_PLAYERS . " set `last_play` = {$time} WHERE `game_id` = {$id} AND `user_id` = {$user_id}");
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_GAMES_PLAYERS . " (`game_id`, `user_id`, `active`, `last_play`) VALUES ({$id}, {$user_id}, '1', {$time})");
    if ($query_one) {
        return true;
    }
}
function Wo_CountGamePlayers($id) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $id           = Wo_Secure($id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_GAMES_PLAYERS . " WHERE `game_id` = {$id} AND `active` = '1'");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_GetMyGames() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data       = array();
    $user_id    = Wo_Secure($wo['user']['user_id']);
    $query_text = "SELECT `game_id` FROM " . T_GAMES_PLAYERS . " WHERE `user_id` = {$user_id} ORDER BY `last_play` DESC";
    $query_one  = mysqli_query($sqlConnect, $query_text);
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        if (is_array($fetched_data)) {
            $data[] = Wo_GameData($fetched_data['game_id']);
        }
    }
    return $data;
}
function Wo_IsNameExist($username, $active = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($username)) {
        return false;
    }
    $active_text = '';
    if ($active == 1) {
        $active_text = "AND `active` = '1'";
    }
    $username     = Wo_Secure($username);
    $query_text   = "SELECT (SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `username` = '{$username}' {$active_text}) as users, (SELECT COUNT(`page_id`) FROM " . T_PAGES . " WHERE `page_name` = '{$username}' {$active_text}) as pages, (SELECT COUNT(`id`) FROM " . T_GROUPS . " WHERE `group_name` = '{$username}' {$active_text}) as groups";
    $query        = mysqli_query($sqlConnect, $query_text);
    $fetched_data = mysqli_fetch_assoc($query);
    if ($fetched_data['users'] == 1) {
        return array(
            true,
            'type' => 'user'
        );
    } else if ($fetched_data['pages'] == 1) {
        return array(
            true,
            'type' => 'page'
        );
    } else if ($fetched_data['groups'] == 1) {
        return array(
            true,
            'type' => 'group'
        );
    } else {
        return array(
            false
        );
    }
}
function Wo_IsPhoneExist($phone) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($phone)) {
        return false;
    }
    $phone     = Wo_Secure($phone);
    $query_text   = "SELECT (SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `phone_number` = '{$phone}') as users";
    $query        = mysqli_query($sqlConnect, $query_text);
    $fetched_data = mysqli_fetch_assoc($query);
    if ($fetched_data['users'] == 1) {
        return array(
            true
        );
    }else {
        return array(
            false
        );
    }
}
function Wo_GetGroupRequests($group_id) {
    global $wo, $sqlConnect;
    $data      = array();
    $group_id  = Wo_Secure($group_id);
    $query_one = " SELECT `user_id` FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `active` = '0' ORDER BY `id` DESC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_AcceptJoinRequest($user_id, $group_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if (!isset($group_id) or empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    $user_id  = Wo_Secure($user_id);
    if (Wo_IsGroupOnwer($group_id) === false) {
        return false;
    }
    if (Wo_IsJoinRequested($group_id, $user_id) === false) {
        return false;
    }
    if (Wo_IsGroupJoined($group_id, $user_id) === true) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "UPDATE " . T_GROUP_MEMBERS . " SET `active` = '1' WHERE `user_id` = {$user_id} AND `group_id` = {$group_id} AND `active` = '0'");
    if ($query) {
        $group                   = Wo_GroupData($group_id);
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'notifier_id' => $group['user_id'],
            'type' => 'accepted_join_request',
            'group_id' => $group_id,
            'url' => 'index.php?link1=timeline&u=' . $group['group_name']
        );
        Wo_RegisterNotification($notification_data_array);
        return true;
    }
}
function Wo_DeleteJoinRequest($user_id, $group_id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($user_id) or empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if (!isset($group_id) or empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id = Wo_Secure($group_id);
    $user_id  = Wo_Secure($user_id);
    if (Wo_IsGroupOnwer($group_id) === false) {
        return false;
    }
    if (Wo_IsJoinRequested($group_id, $user_id) === false) {
        return false;
    }
    if (Wo_IsGroupJoined($group_id, $user_id) === true) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_MEMBERS . " WHERE `user_id` = {$user_id} AND `group_id` = {$group_id} AND `active` = '0'");
    if ($query) {
        return true;
    }
}
function Wo_CountGroupRequests($group_id) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($group_id) or !is_numeric($group_id) or $group_id < 1) {
        return false;
    }
    $group_id     = Wo_Secure($group_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS count FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id} AND `active` = '0'");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_RegisterAlbumMedia($id, $media) {
    global $wo, $sqlConnect;
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    if (empty($media)) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_ALBUMS_MEDIA . " (`post_id`,`image`) VALUES ({$id}, '{$media}')");
    if ($query_one) {
        return true;
    }
}
function Wo_GetAlbumPhotos($post_id) {
    global $wo, $sqlConnect;
    $data      = array();
    $post_id   = Wo_Secure($post_id);
    $query_one = "SELECT `id`,`image`,`post_id` FROM " . T_ALBUMS_MEDIA . " WHERE `post_id` = {$post_id} ORDER BY `id` DESC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $explode2                  = @end(explode('.', $fetched_data['image']));
        $explode3                  = @explode('.', $fetched_data['image']);
        $fetched_data['image_org'] = $explode3[0] . '_small.' . $explode2;
        $fetched_data['image']     = Wo_GetMedia($fetched_data['image']);
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_CountAlbumImages($post_id) {
    global $wo, $sqlConnect;
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    $post_id      = Wo_Secure($post_id);
    $query_one    = "SELECT COUNT(`id`) as count FROM " . T_ALBUMS_MEDIA . " WHERE `post_id` = {$post_id} ORDER BY `id` DESC";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    return $fetched_data['count'];
}
function Wo_CountUserAlbums($user_id) {
    global $wo, $sqlConnect;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $user_id      = Wo_Secure($user_id);
    $query_one    = "SELECT COUNT(`id`) as count FROM " . T_POSTS . " WHERE `user_id` = {$user_id} AND `album_name` <> '' ORDER BY `id` DESC";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    return $fetched_data['count'];
}
function Wo_DeleteImageFromAlbum($post_id, $id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 1) {
        return false;
    }
    if (Wo_IsPostOnwer($post_id, $wo['user']['user_id']) === false) {
        return false;
    }
    $id           = Wo_Secure($id);
    $post_id      = Wo_Secure($post_id);
    $delete_query = mysqli_query($sqlConnect, "DELETE FROM " . T_ALBUMS_MEDIA . " WHERE `post_id` = {$post_id} AND `id` = {$id}");
    if ($delete_query) {
        $delete_query_2 = mysqli_query($sqlConnect, "SELECT `post_id` FROM " . T_ALBUMS_MEDIA . " WHERE `post_id` = {$post_id}");
        if (mysqli_num_rows($delete_query_2) == 0) {
            $delete_post = Wo_DeletePost($post_id);
        }
        return true;
    }
}
function Wo_AlbumImageData($data = array()) {
    global $wo, $sqlConnect;
    if (!empty($data['id'])) {
        if (is_numeric($data['id'])) {
            $id = Wo_Secure($data['id']);
        }
    }
    $order_by = '';
    if (!empty($data['after_image_id']) && is_numeric($data['after_image_id'])) {
        $data['after_image_id'] = Wo_Secure($data['after_image_id']);
        $subquery               = " `id` <> " . $data['after_image_id'] . " AND `id` < " . $data['after_image_id'];
        $order_by               = 'DESC';
    } else if (!empty($data['before_image_id']) && is_numeric($data['before_image_id'])) {
        $data['before_image_id'] = Wo_Secure($data['before_image_id']);
        $subquery                = " `id` <> " . $data['before_image_id'] . " AND `id` > " . $data['before_image_id'];
        $order_by                = 'ASC';
    } else {
        $subquery = " `id` = '{$id}'";
    }
    if (!empty($data['post_id']) && is_numeric($data['post_id'])) {
        $data['post_id'] = Wo_Secure($data['post_id']);
        $subquery .= " AND `post_id` = " . $data['post_id'];
    }
    $query_one    = "SELECT * FROM " . T_ALBUMS_MEDIA . " WHERE $subquery ORDER by `id` {$order_by}";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    if (!empty($fetched_data)) {
        $fetched_data['image_org'] = Wo_GetMedia($fetched_data['image']);
    }
    return $fetched_data;
}
function Wo_GetCommentReplies($comment_id = 0, $limit = 5, $order_by = 'ASC') {
    global $sqlConnect, $wo;
    if (empty($comment_id) || !is_numeric($comment_id) || $comment_id < 0) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $comment_id     = Wo_Secure($comment_id);
    $data           = array();
    $query          = "SELECT `id` FROM " . T_COMMENTS_REPLIES . " WHERE `comment_id` = {$comment_id} AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') ORDER BY `id` {$order_by}";
    if (($comments_num = Wo_CountCommentReplies($comment_id)) > $limit) {
        $query .= " LIMIT " . ($comments_num - $limit) . ", {$limit} ";
    }
    $query_one = mysqli_query($sqlConnect, $query);
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_GetCommentReply($fetched_data['id']);
    }
    return $data;
}
function Wo_GetCommentReply($reply_id = 0) {
    global $wo, $sqlConnect;
    if (empty($reply_id) || !is_numeric($reply_id) || $reply_id < 0) {
        return false;
    }
    $reply_id     = Wo_Secure($reply_id);
    $query_one    = mysqli_query($sqlConnect, "SELECT * FROM " . T_COMMENTS_REPLIES . " WHERE `id` = {$reply_id} ");
    $fetched_data = mysqli_fetch_assoc($query_one);
    if (!empty($fetched_data['page_id'])) {
        $fetched_data['publisher'] = Wo_PageData($fetched_data['page_id']);
        $fetched_data['url']       = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['publisher']['page_name']);
    } else {
        $fetched_data['publisher'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['url']       = Wo_SeoLink('index.php?link1=timeline&u=' . $fetched_data['publisher']['username']);
    }
    $fetched_data['Orginaltext']         = Wo_EditMarkup($fetched_data['text']);
    $fetched_data['Orginaltext']         = str_replace('<br>', "\n", $fetched_data['Orginaltext']);
    $fetched_data['text']                = Wo_Markup($fetched_data['text']);
    $fetched_data['text']                = Wo_Emo($fetched_data['text']);
    $fetched_data['onwer']               = false;
    $fetched_data['post_onwer']          = false;
    $fetched_data['comment_likes']       = Wo_CountCommentReplyLikes($fetched_data['id']);
    $fetched_data['comment_wonders']     = Wo_CountCommentReplyWonders($fetched_data['id']);
    $fetched_data['is_comment_wondered'] = false;
    $fetched_data['is_comment_liked']    = false;
    if ($wo['loggedin'] == true) {
        $fetched_data['onwer']               = ($fetched_data['publisher']['user_id'] == $wo['user']['user_id']) ? true : false;
        $fetched_data['is_comment_wondered'] = (Wo_IsCommentReplyWondered($fetched_data['id'], $wo['user']['user_id'])) ? true : false;
        $fetched_data['is_comment_liked']    = (Wo_IsCommentReplyLiked($fetched_data['id'], $wo['user']['user_id'])) ? true : false;
    }
    return $fetched_data;
}
function Wo_CountCommentReplies($comment_id = '') {
    global $sqlConnect;
    if (empty($comment_id) || !is_numeric($comment_id) || $comment_id < 0) {
        return false;
    }
    $comment_id   = Wo_Secure($comment_id);
    $query        = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS `replies` FROM " . T_COMMENTS_REPLIES . " WHERE `comment_id` = {$comment_id} ");
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['replies'];
}
function Wo_DeleteCommentReply($comment_id = '') {
    global $wo, $sqlConnect;
    if ($comment_id < 0 || empty($comment_id) || !is_numeric($comment_id)) {
        return false;
    }
    if ($wo['loggedin'] == false) {
        return false;
    }
    $comment_id   = Wo_Secure($comment_id);
    $query_delete = mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENTS_REPLIES . " WHERE `id` = {$comment_id}");
    $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_REPLIES_WONDERS . " WHERE `reply_id` = {$comment_id}");
    $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_COMMENT_REPLIES_LIKES . " WHERE `reply_id` = {$comment_id}");
    $query_delete .= mysqli_query($sqlConnect, "DELETE FROM " . T_REACTIONS . " WHERE `replay_id` = '{$comment_id}'");
    if ($query_delete) {
        return true;
    }
}
function Wo_RegisterCommentReply($data = array()) {
    global $sqlConnect, $wo, $db;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($data['comment_id']) || !is_numeric($data['comment_id']) || $data['comment_id'] < 0) {
        return false;
    }
    if (empty($data['text'])) {
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
    if (!empty($data['text'])) {
        if ($wo['config']['maxCharacters'] > 0) {
            if (strlen($data['text']) > $wo['config']['maxCharacters']) {
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
                $match_search      = '#' . $match;
                $match_replace     = '#[' . $hashdata['id'] . ']';
                $data['text']      = str_replace($match_search, $match_replace, $data['text']);
                $hashtag_query     = "UPDATE " . T_HASHTAGS . " SET `last_trend_time` = " . time() . ", `trend_use_num` = " . ($hashdata['trend_use_num'] + 1) . " WHERE `id` = " . $hashdata['id'];
                $hashtag_sql_query = mysqli_query($sqlConnect, $hashtag_query);
            }
        }
    }
    $comment = Wo_GetPostComment($data['comment_id']);
    $text    = '';
    $type2   = '';
    $page_id = '';
    if (!empty($data['page_id']) && $data['page_id'] > 0) {
        $page_id = $data['page_id'];
    }
    if (isset($comment['text']) && !empty($comment['text'])) {
        $text = substr($comment['text'], 0, 10) . '..';
    }
    $user_id = Wo_GetUserIdFromCommentId($data['comment_id']);
    if (empty($user_id)) {
        $user_id = Wo_GetUserIdFromPageId($comment['page_id']);
        if (empty($user_id)) {
            return false;
        }
    }
    if (!empty($page_id)) {
        $user_id = '';
    }
    if (empty($data['page_id'])) {
        $data['page_id'] = 0;
    }
    $fields       = '`' . implode('`, `', array_keys($data)) . '`';
    $comment_data = '\'' . implode('\', \'', $data) . '\'';

    $check_if_comment_is_spam = $db->where('text', $data['text'])->where('time', (time() - 3600), ">")->getValue(T_COMMENTS_REPLIES, "COUNT(*)");
    if ($check_if_comment_is_spam >= 5) {
        return false;
    }
    $check_last_comment_exists = $db->where('text', $data['text'])->where('user_id', $data['user_id'])->where('comment_id', $data['comment_id'])->getValue(T_COMMENTS_REPLIES, "COUNT(*)");
    if ($check_last_comment_exists >= 2) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "INSERT INTO  " . T_COMMENTS_REPLIES . " ({$fields}) VALUES ({$comment_data})");
    if ($query) {
        $inserted_reply_id       = mysqli_insert_id($sqlConnect);
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'page_id' => $page_id,
            'post_id' => $comment['post_id'],
            'type' => 'comment_reply',
            'text' => $text,
            'type2' => $type2,
            'url' => 'index.php?link1=post&id=' . $comment['post_id'] . '&ref=' . $comment['id']
        );
        Wo_RegisterNotification($notification_data_array);
        if (isset($mentions) && is_array($mentions)) {
            foreach ($mentions as $mention) {
                $notification_data_array = array(
                    'recipient_id' => $mention,
                    'type' => 'comment_reply_mention',
                    'post_id' => $comment['post_id'],
                    'text' => $text,
                    'page_id' => $page_id,
                    'url' => 'index.php?link1=post&id=' . $comment['post_id'] . '&ref=' . $comment['id']
                );
                Wo_RegisterNotification($notification_data_array);
            }
        }
        $also = array();
        if (!empty($user_id)) {
            if (Wo_IsCommentOnwer($data['user_id'], $data['comment_id'])) {
                $also = Wo_GetRepliedUsers($data['comment_id']);
            }
            if (isset($also) && is_array($also)) {
                foreach ($also as $user) {
                    $notification_data_array = array(
                        'recipient_id' => $user['user_id'],
                        'type' => 'also_replied',
                        'post_id' => $comment['post_id'],
                        'text' => $text,
                        'url' => 'index.php?link1=post&id=' . $comment['post_id'] . '&ref=' . $comment['id']
                    );
                    Wo_RegisterNotification($notification_data_array);
                }
            }
        }
        return $inserted_reply_id;
    }
}
function Wo_IsCommentOnwer($user_id, $comment_id) {
    global $sqlConnect;
    if (empty($comment_id) or !is_numeric($comment_id) or $comment_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $comment_id    = Wo_Secure($comment_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_COMMENTS . " WHERE `id` = {$comment_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_GetRepliedUsers($comment_id) {
    global $sqlConnect, $wo;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($comment_id) || !is_numeric($comment_id) || $comment_id < 1) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_COMMENTS_REPLIES . " WHERE `comment_id` = {$comment_id}");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetUserProfilePicture($image = '', $type = '') {
    global $sqlConnect, $wo;
    if (empty($image)) {
        return false;
    }
    $explode2  = @end(explode('.', $image));
    $explode3  = @explode('.', $image);
    $image     = $explode3[0] . '_full.' . $explode2;
    $query_one = "SELECT `post_id` FROM " . T_POSTS . " WHERE `postFile` = '{$image}'";
    $query     = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($query) > 0) {
        $fetched_data = mysqli_fetch_assoc($query);
        return $fetched_data['post_id'];
    }
}
function Wo_RegsiterRecent($id = 0, $type = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 1) {
        return false;
    }
    if (empty($type)) {
        return false;
    }
    $id   = Wo_Secure($id);
    $type = Wo_Secure($type);
    if ($type == 'timeline') {
        $type = 'user';
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query_delete = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_RECENT_SEARCHES . " WHERE `user_id` = {$user_id} AND `search_id` = '{$id}' AND `search_type` = '{$type}'");
    if (mysqli_num_rows($query_delete) > 0) {
        $query_two = mysqli_query($sqlConnect, "DELETE FROM " . T_RECENT_SEARCHES . " WHERE `user_id` = {$user_id} AND `search_id` = '{$id}' AND `search_type` = '{$type}'");
    }
    $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_RECENT_SEARCHES . " (`user_id`,`search_id`,`search_type`) VALUES ('{$user_id}', '{$id}', '{$type}')");
    if ($query_one) {
        return $id;
    }
}
function Wo_ClearRecent() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query_delete = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_RECENT_SEARCHES . " WHERE `user_id` = {$user_id}");
    if (mysqli_num_rows($query_delete) > 0) {
        $query_two = mysqli_query($sqlConnect, "DELETE FROM " . T_RECENT_SEARCHES . " WHERE `user_id` = {$user_id}");
        if ($query_two) {
            return true;
        }
    }
}
function Wo_GetSearchAdv($search_qeury, $type, $offset = 0) {
    global $sqlConnect;
    $search_qeury = Wo_Secure($search_qeury);
    $data         = array();
    $offset_to    = "";
    if ($type == 'groups') {
        if ($offset > 0) {
            $offset_to .= " AND `id` < {$offset} AND `id` <> {$offset} ";
        }
        $query = mysqli_query($sqlConnect, " SELECT `id` FROM " . T_GROUPS . " WHERE ((`group_name` LIKE '%$search_qeury%') OR `group_title` LIKE '%$search_qeury%') AND `active` = '1' {$offset_to} ORDER BY `id` DESC LIMIT 10");
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = Wo_GroupData($fetched_data['id']);
        }
    } elseif ($type == 'pages') {
        if ($offset > 0) {
            $offset_to .= " AND `page_id` < {$offset} AND `page_id` <> {$offset} ";
        }
        $query = mysqli_query($sqlConnect, " SELECT `page_id` FROM " . T_PAGES . " WHERE ((`page_name` LIKE '%$search_qeury%') OR `page_title` LIKE '%$search_qeury%') AND `active` = '1' {$offset_to} ORDER BY `page_id` DESC LIMIT 10");
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = Wo_PageData($fetched_data['page_id']);
        }
    } elseif ($type == 'games') {
        $query = mysqli_query($sqlConnect, " SELECT `id` FROM " . T_GAMES . " WHERE `game_name` LIKE '%$search_qeury%' AND `active` = '1' ORDER BY `id` DESC LIMIT 10");
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = Wo_GameData($fetched_data['id']);
        }
    } elseif ($type == 'posts') {
        $query = mysqli_query($sqlConnect, " SELECT `id` FROM " . T_POSTS . " WHERE `postText` LIKE '%$search_qeury%' ORDER BY `id` DESC LIMIT 10");
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = Wo_PostData($fetched_data['id']);
        }
    }
    return $data;
}
function Wo_GetUserAlbums($user_id, $placement = '', $limit = 5000) {
    global $sqlConnect, $wo;
    $data    = array();
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, " SELECT `id` FROM " . T_POSTS . " WHERE `album_name` <> '' AND `user_id` = {$user_id} ORDER BY `id` DESC LIMIT {$limit}");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data = Wo_PostData($fetched_data['id']);
        if (!empty($fetched_data['photo_album'])) {
            foreach ($fetched_data['photo_album'] as $id => $photo) {
                $album = Wo_GetMedia($photo['image_org']);
            }
            $fetched_data['first_image'] = $album;
            $data[]                      = $fetched_data;
        }
    }
    return $data;
}
function Wo_AddCommentReplyWonders($reply_id, $text = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($reply_id) or empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    $reply_id        = Wo_Secure($reply_id);
    $user_id         = Wo_Secure($wo['user']['user_id']);
    $comment_user_id = Wo_GetUserIdFromReplyId($reply_id);
    $comment         = Wo_GetCommentIdFromReplyId($reply_id);
    $post_id         = Wo_GetPostIdFromCommentId($comment);
    $page_id         = '';
    $post_data       = Wo_PostData($post_id);
    if (!empty($post_data['page_id'])) {
        $page_id = $post_data['page_id'];
    }
    if (Wo_IsPageOnwer($post_data['page_id']) === false) {
        $page_id = 0;
    }
    if (empty($comment_user_id)) {
        return false;
    }
    
    $reply_data = Wo_GetCommentReply($reply_id);
    $text = Wo_Secure($reply_data['text']);
    if (isset($text) && !empty($text)) {
        $text = mb_substr($text, 0, 10, "UTF-8") . '..';
    }
    if (Wo_IsCommentReplyWondered($reply_id, $wo['user']['user_id']) === true) {
        $query_one = "DELETE FROM " . T_COMMENT_REPLIES_WONDERS . " WHERE `reply_id` = {$reply_id} AND `user_id` = {$user_id}";
        mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$comment_user_id} AND `type` = 'wondered_reply_comment'");
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            return 'unwonder';
        }
    } else {
        if ($wo['config']['second_post_button'] == 'dislike' && Wo_IsCommentReplyLiked($reply_id, $wo['user']['user_id'])) {
            Wo_AddCommentReplyLikes($reply_id);
        }
        $query_two     = "INSERT INTO " . T_COMMENT_REPLIES_WONDERS . " (`user_id`, `reply_id`) VALUES ({$user_id}, {$reply_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            $notification_data_array = array(
                'recipient_id' => $comment_user_id,
                'post_id' => $post_id,
                'type' => 'wondered_reply_comment',
                'text' => $text,
                'page_id' => $page_id,
                'url' => 'index.php?link1=post&id=' . $post_id . '&ref=' . $comment
            );
            Wo_RegisterNotification($notification_data_array);
            return 'wonder';
        }
    }
}
function Wo_CountCommentReplyWonders($reply_id) {
    global $sqlConnect;
    if (empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    $reply_id      = Wo_Secure($reply_id);
    $query_one     = "SELECT COUNT(`id`) AS `likes` FROM " . T_COMMENT_REPLIES_WONDERS . " WHERE `reply_id` = {$reply_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['likes'];
    }
}
function Wo_IsCommentReplyWondered($reply_id, $user_id) {
    global $sqlConnect;
    if (empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $reply_id      = Wo_Secure($reply_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_COMMENT_REPLIES_WONDERS . " WHERE `reply_id` = {$reply_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_GetCommentIdFromReplyId($reply_id = 0) {
    global $sqlConnect;
    if (empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    $reply_id      = Wo_Secure($reply_id);
    $query_one     = "SELECT `comment_id` FROM " . T_COMMENTS_REPLIES . " WHERE `id` = {$reply_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['comment_id'];
    }
}
function Wo_GetUserIdFromReplyId($reply_id = 0) {
    global $sqlConnect;
    if (empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    $reply_id      = Wo_Secure($reply_id);
    $query_one     = "SELECT `user_id` FROM " . T_COMMENTS_REPLIES . " WHERE `id` = {$reply_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['user_id'];
    }
}
function Wo_AddCommentReplyLikes($reply_id, $text = '') {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!isset($reply_id) or empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    $reply_id        = Wo_Secure($reply_id);
    $user_id         = Wo_Secure($wo['user']['user_id']);
    $comment_user_id = Wo_GetUserIdFromReplyId($reply_id);
    $comment         = Wo_GetCommentIdFromReplyId($reply_id);
    $post_id         = Wo_GetPostIdFromCommentId($comment);
    $page_id         = '';
    $post_data       = Wo_PostData($post_id);
    if (!empty($post_data['page_id'])) {
        $page_id = $post_data['page_id'];
    }
    if (Wo_IsPageOnwer($post_data['page_id']) === false) {
        $page_id = 0;
    }
    if (empty($comment_user_id)) {
        return false;
    }
    $reply_data = Wo_GetCommentReply($reply_id);
    $text = Wo_Secure($reply_data['text']);
    if (isset($text) && !empty($text)) {
        $text = mb_substr($text, 0, 10, "UTF-8") . '..';
    }
    if (Wo_IsCommentReplyLiked($reply_id, $user_id) === true) {
        $query_one = "DELETE FROM " . T_COMMENT_REPLIES_LIKES . " WHERE `reply_id` = {$reply_id} AND `user_id` = {$user_id}";
        mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `post_id` = {$post_id} AND `recipient_id` = {$comment_user_id} AND `type` = 'liked_reply_comment'");
        $sql_query_one = mysqli_query($sqlConnect, $query_one);
        if ($sql_query_one) {
            return 'unliked';
        }
    } else {
        if ($wo['config']['second_post_button'] == 'dislike' && Wo_IsCommentReplyWondered($reply_id, $wo['user']['user_id'])) {
            Wo_AddCommentReplyWonders($reply_id);
        }
        $query_two     = "INSERT INTO " . T_COMMENT_REPLIES_LIKES . " (`user_id`, `reply_id`) VALUES ({$user_id},{$reply_id})";
        $sql_query_two = mysqli_query($sqlConnect, $query_two);
        if ($sql_query_two) {
            $notification_data_array = array(
                'recipient_id' => $comment_user_id,
                'post_id' => $post_id,
                'type' => 'liked_reply_comment',
                'text' => $text,
                'page_id' => $page_id,
                'url' => 'index.php?link1=post&id=' . $post_id . '&ref=' . $comment
            );
            Wo_RegisterNotification($notification_data_array);
            return 'liked';
        }
    }
}
function Wo_CountCommentReplyLikes($reply_id) {
    global $sqlConnect;
    if (empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    $reply_id      = Wo_Secure($reply_id);
    $query_one     = "SELECT COUNT(`id`) AS `likes` FROM " . T_COMMENT_REPLIES_LIKES . " WHERE `reply_id` = {$reply_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) == 1) {
        $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
        return $sql_fetch_one['likes'];
    }
}
function Wo_IsCommentReplyLiked($reply_id, $user_id) {
    global $sqlConnect;
    if (empty($reply_id) or !is_numeric($reply_id) or $reply_id < 1) {
        return false;
    }
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    $reply_id      = Wo_Secure($reply_id);
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT `id` FROM " . T_COMMENT_REPLIES_LIKES . " WHERE `reply_id` = {$reply_id} AND `user_id` = {$user_id}";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if (mysqli_num_rows($sql_query_one) >= 1) {
        return true;
    }
}
function Wo_CanSeeBirthday($user_id, $privacy) {
    global $sqlConnect, $wo;
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if ($privacy == 0) {
        return true;
    } elseif ($privacy == 1) {
        if ($wo['loggedin'] !== false) {
            if (Wo_IsFollowing($wo['user']['user_id'], $user_id) === true) {
                return true;
            }
        } else {
            return false;
        }
    } elseif ($privacy == 2) {
        return false;
    }
}
function Wo_CountPageInvites($page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id)) {
        return false;
    }
    $page_id      = Wo_Secure($page_id);
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `active` = '1' AND `following_id` NOT IN (SELECT `invited_id` FROM " . T_PAGES_INVAITES . " WHERE `page_id` = {$page_id}) AND `following_id` NOT IN (SELECT `user_id` FROM " . T_PAGES_LIKES . " WHERE `page_id` = {$page_id})");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_GetPageInvites($page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id)) {
        return false;
    }
    $data      = array();
    $page_id   = Wo_Secure($page_id);
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $query_one = mysqli_query($sqlConnect, "SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `active` = '1' AND `following_id` NOT IN (SELECT `invited_id` FROM " . T_PAGES_INVAITES . " WHERE `page_id` = {$page_id}) AND `following_id` NOT IN (SELECT `user_id` FROM " . T_PAGES_LIKES . " WHERE `page_id` = {$page_id})");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_UserData($fetched_data['following_id']);
    }
    return $data;
}
function Wo_RegsiterInvite($user_id, $page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id)) {
        return false;
    }
    if (Wo_IsPageInvited($user_id, $page_id) === true) {
        return false;
    }
    if (Wo_PageExistsByID($page_id) === false) {
        return false;
    }
    $page_id        = Wo_Secure($page_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query_one      = mysqli_query($sqlConnect, "INSERT INTO " . T_PAGES_INVAITES . " (`invited_id`,`inviter_id`,`page_id`) VALUES ({$user_id}, {$logged_user_id}, {$page_id})");
    if ($query_one) {
        $page                    = Wo_PageData($page_id);
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'type' => 'invited_page',
            'page_id' => $page_id,
            'url' => 'index.php?link1=timeline&u=' . $page['page_name']
        );
        Wo_RegisterNotification($notification_data_array);
        return true;
    }
}
function Wo_IsPageInvited($user_id, $page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id)) {
        return false;
    }
    $page_id        = Wo_Secure($page_id);
    $user_id        = Wo_Secure($user_id);
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query_one      = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_PAGES_INVAITES . " WHERE `invited_id` = {$user_id} AND `page_id` = {$page_id}");
    $fetched_data   = mysqli_num_rows($query_one);
    if ($fetched_data > 0) {
        return true;
    }
}
function Wo_GetPageInviters($user_id, $page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id)) {
        return false;
    }
    $data      = array();
    $page_id   = Wo_Secure($page_id);
    $query_one = mysqli_query($sqlConnect, "SELECT `inviter_id` FROM " . T_PAGES_INVAITES . " WHERE `invited_id` = {$user_id} AND `page_id` = {$page_id}");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_UserData($fetched_data['inviter_id']);
    }
    return $data;
}
function Wo_DeleteInvites($user_id, $page_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($page_id) || !is_numeric($page_id)) {
        return false;
    }
    $page_id   = Wo_Secure($page_id);
    $user_id   = Wo_Secure($user_id);
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_PAGES_INVAITES . " WHERE `invited_id` = {$user_id} AND `page_id` = {$page_id}");
    if ($query_one) {
        return true;
    }
}
function Wo_GetCallInAction($id, $url) {
    global $sqlConnect, $wo;
    if (empty($id)) {
        return false;
    }
    if (!array_key_exists($id, $wo['call_action'])) {
        return false;
    }
    if (empty($url)) {
        return false;
    }
    $wo['call_page']['call_action_url'] = $url;
    $wo['call_page']['call_action_btn'] = $wo['call_action'][$id];
    return Wo_LoadPage('buttons/call-action');
}
function Wo_CountUserData($type) {
    global $wo, $sqlConnect;
    $type_table = T_USERS;
    $type_id    = 'user_id';
    $where      = '';
    if ($type == 'male') {
        $where = "`gender` = 'male'";
    } else if ($type == 'female') {
        $where = "`gender` = 'female'";
    } else if ($type == 'active') {
        $where = "`active` = '1'";
    } else if ($type == 'not_active') {
        $where = "`active` <> '1'";
    }
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT($type_id) as count FROM {$type_table} WHERE {$where}");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountPageData($type) {
    global $wo, $sqlConnect;
    $type_table = T_PAGES;
    $type_id    = 'id';
    $where      = '';
    if ($type == 'likes') {
        $type_table = T_PAGES_LIKES;
        $where      = "`active` = '1'";
        $type_id    = 'id';
    } else if ($type == 'pages_posts') {
        $type_table = T_POSTS;
        $where      = "`page_id` <> 0";
        $type_id    = 'id';
    } else if ($type == 'verified_pages') {
        $type_table = T_PAGES;
        $where      = "`verified` = '1'";
        $type_id    = 'page_id';
    }
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT($type_id) as count FROM {$type_table} WHERE {$where}");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountGroupData($type) {
    global $wo, $sqlConnect;
    $type_table = T_PAGES;
    $type_id    = 'id';
    $where      = '';
    if ($type == 'members') {
        $type_table = T_GROUP_MEMBERS;
        $where      = "`active` = '1'";
        $type_id    = 'id';
    } else if ($type == 'groups_posts') {
        $type_table = T_POSTS;
        $where      = "`group_id` <> 0";
        $type_id    = 'id';
    } else if ($type == 'join_requests') {
        $type_table = T_GROUP_MEMBERS;
        $where      = "`active` = '0'";
        $type_id    = 'id';
    }
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT($type_id) as count FROM {$type_table} WHERE {$where}");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountPostData($type) {
    global $wo, $sqlConnect;
    $type_table = T_PAGES;
    $type_id    = 'id';
    $where      = '';
    if ($type == 'replies') {
        $type_table = T_COMMENTS_REPLIES;
        $type_id    = 'id';
    } else if ($type == 'likes') {
        $type_table = T_LIKES;
        $type_id    = 'id';
    } else if ($type == 'wonders') {
        $type_table = T_WONDERS;
        $type_id    = 'id';
    }
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT($type_id) as count FROM {$type_table}");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountGroupsNotMember($group_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id)) {
        return false;
    }
    $user_id      = Wo_Secure($wo['user']['user_id']);
    $group_id     = Wo_Secure($group_id);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `active` = '1' AND `following_id` NOT IN (SELECT `user_id` FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id})");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_GetGroupsNotMember($group_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id)) {
        return false;
    }
    $data      = array();
    $group_id  = Wo_Secure($group_id);
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $query_one = mysqli_query($sqlConnect, "SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `active` = '1' AND `following_id` NOT IN (SELECT `user_id` FROM " . T_GROUP_MEMBERS . " WHERE `group_id` = {$group_id})");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_UserData($fetched_data['following_id']);
    }
    return $data;
}
function Wo_GroupExistsByID($id) {
    global $sqlConnect;
    if (empty($id)) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_GROUPS . " WHERE `id`= '{$id}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_UserExistsById($id) {
    global $sqlConnect;
    if (empty($id)) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_USERS . " WHERE `user_id`= '{$id}' AND `active` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_RegsiterGroupAdd($user_id, $group_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($group_id) || !is_numeric($group_id)) {
        return false;
    }
    if (Wo_IsGroupJoined($group_id, $user_id) === true) {
        return false;
    }
    if (Wo_GroupExistsByID($group_id) === false) {
        return false;
    }
    if (Wo_UserExistsById($user_id) === false) {
        return false;
    }
    if (Wo_IsGroupOnwer($group_id, $user_id)) {
        return false;
    }
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $group_data     = Wo_GroupData($group_id);
    $user_id        = Wo_Secure($user_id);
    $query_one      = mysqli_query($sqlConnect, " INSERT INTO " . T_GROUP_MEMBERS . " (`user_id`,`group_id`,`active`,`time`) VALUES ({$user_id},{$group_id},'1'," . time() . ")");
    if ($query_one) {
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'type' => 'added_you_to_group',
            'group_id' => $group_id,
            'url' => 'index.php?link1=timeline&u=' . $group_data['group_name']
        );
        Wo_RegisterNotification($notification_data_array);
        return true;
    }
}
function Wo_GetFemusUsers() {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data      = array();
    $time      = time() - 86400;
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE (`verified` = '1' OR `admin` = '1' OR `active` = '1') AND `user_id` <> '{$user_id}' AND `active` = '1' AND `user_id` NOT IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `following_id` <> {$user_id} AND `active` = '1') AND `avatar` <> '" . $wo['userDefaultAvatar'] . "' AND `lastseen` >= {$time} ORDER BY RAND() LIMIT 20 ";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $user_data = Wo_UserData($fetched_data['user_id']);
        $data[]    = $user_data;
    }
    return $data;
}
function Wo_CanSenEmails() {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['smtp_or_mail'] == 'mail') {
        return false;
    }
    $can_send_time = time() - 180;
    if ($wo['user']['last_email_sent'] > $can_send_time) {
        return false;
    }
    return true;
}
function Wo_SendMessageFromDB() {
   global $wo, $sqlConnect;
   include_once('assets/libraries/PHPMailer-Master/vendor/autoload.php');
   $mail = new PHPMailer\PHPMailer\PHPMailer;
   if ($wo['loggedin'] == false) {
       return false;
   }
   $data = array();
   if (Wo_CanSenEmails() === false) {
       return false;
   }
   $user_id   = Wo_Secure($wo['user']['user_id']);
   $query_one = " SELECT * FROM " . T_EMAILS . " WHERE `user_id` = {$user_id} ORDER BY `id` DESC";
   $sql       = mysqli_query($sqlConnect, $query_one);
   if (mysqli_num_rows($sql) < 1) {
       return false;
   }
   if ($wo['config']['smtp_or_mail'] == 'mail') {
       $mail->IsMail();
   } else if ($wo['config']['smtp_or_mail'] == 'smtp') {
       $mail->isSMTP();
       $mail->Host          = $wo['config']['smtp_host']; // Specify main and backup SMTP servers
       $mail->SMTPAuth      = true;
       $mail->SMTPKeepAlive = true;
       $mail->Username      = $wo['config']['smtp_username']; // SMTP username
       $mail->Password      = $wo['config']['smtp_password']; // SMTP password
       $mail->SMTPSecure    = $wo['config']['smtp_encryption']; // Enable TLS encryption, `ssl` also accepted
       $mail->Port          = $wo['config']['smtp_port'];
       $mail->SMTPOptions   = array(
           'ssl' => array(
               'verify_peer' => false,
               'verify_peer_name' => false,
               'allow_self_signed' => true
           )
       );
   } else {
       return false;
   }
   $mail->setFrom($wo['config']['siteEmail'], $wo['config']['siteName']);
   $send          = false;
   $mail->CharSet = 'utf-8';
   while ($fetched_data = mysqli_fetch_assoc($sql)) {
       $mail->addAddress($fetched_data['email_to']);
       $mail->Subject = $fetched_data['subject'];
       $mail->MsgHTML($fetched_data['message']);
       $mail->IsHTML(true);
       $send = $mail->send();
       $mail->ClearAddresses();
   }
   $query_one_  = "DELETE FROM " . T_EMAILS . " WHERE `user_id` = {$user_id}";
   $sql_        = mysqli_query($sqlConnect, $query_one_);
   $query_one__ = "UPDATE " . T_USERS . " SET `last_email_sent` = " . time() . " WHERE `user_id` = {$user_id}";
   $sql__       = mysqli_query($sqlConnect, $query_one__);
   return $send;
}
function Wo_AddPostVideoView($post_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT `videoViews` FROM " . T_POSTS . " WHERE `id` = '$post_id'");
    $fetched_data = mysqli_fetch_assoc($query);
    if (!empty($fetched_data) && is_array($fetched_data)) {
        $post_views   = $fetched_data['videoViews'];
        $update_query = "UPDATE " . T_POSTS . " SET `videoViews` = `videoViews` + 1  WHERE `id` = '$post_id'";
        if (mysqli_query($sqlConnect, $update_query)) {
            return intval($post_views) + 1;
        }
    }
    return false;
}
function Wo_SendMessage($data = array()) {
    global $wo, $sqlConnect;
    include_once('assets/libraries/PHPMailer-Master/vendor/autoload.php');
    $mail = new PHPMailer\PHPMailer\PHPMailer;
    $email_from      = $data['from_email'] = Wo_Secure($data['from_email']);
    $to_email        = $data['to_email'] = Wo_Secure($data['to_email']);
    $subject         = $data['subject'];
    $message_body    = mysqli_real_escape_string($sqlConnect, $data['message_body']);
    $data['charSet'] = Wo_Secure($data['charSet']);
    if (isset($data['insert_database'])) {
        if ($data['insert_database'] == 1) {
            $user_id   = Wo_Secure($wo['user']['user_id']);
            $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_EMAILS . " (`email_to`, `user_id`, `subject`, `message`) VALUES ('{$to_email}', '{$user_id}', '{$subject}', '{$message_body}')");
            if ($query_one) {
                return true;
            }
        }
        return true;
        exit();
    }
    if ($wo['config']['smtp_or_mail'] == 'mail') {
        $mail->IsMail();
    } else if ($wo['config']['smtp_or_mail'] == 'smtp') {
        $mail->isSMTP();
        $mail->Host        = $wo['config']['smtp_host']; // Specify main and backup SMTP servers
        $mail->SMTPAuth    = true; // Enable SMTP authentication
        $mail->Username    = $wo['config']['smtp_username']; // SMTP username
        $mail->Password    = $wo['config']['smtp_password']; // SMTP password
        $mail->SMTPSecure  = $wo['config']['smtp_encryption']; // Enable TLS encryption, `ssl` also accepted
        $mail->Port        = $wo['config']['smtp_port'];
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
    } else {
        return false;
    }
    $mail->IsHTML($data['is_html']);
    $mail->setFrom($data['from_email'], $data['from_name']);
    $mail->addAddress($data['to_email'], $data['to_name']); // Add a recipient
    $mail->Subject = $data['subject'];
    $mail->CharSet = $data['charSet'];
    $mail->MsgHTML($data['message_body']);
    if (!empty($data['reply-to'])) {
        $mail->ClearReplyTos();
        $mail->AddReplyTo($data['reply-to'], $data['from_name']);
    }
    if ($mail->send()) {
        $mail->ClearAddresses();
        return true;
    }
}
function Wo_CheckBirthdays($user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    $data  = array();
    $date  = date('m') . '-' . date('d');
    $query = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE `birthday` LIKE '%-{$date}%' AND `user_id` <> {$user_id} AND `user_id` IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id} AND `active` = '1') ORDER BY RAND() LIMIT 5");
    if ($query) {
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $user_data = Wo_UserData($fetched_data['user_id']);
            if ($user_data['birth_privacy'] != 2) {
                $data[] = $user_data;
            }
        }
    }
    return $data;
}

if (strlen(base64_encode(file_get_contents("./assets/libraries/s3/JmesPath/Parser.php"))) != 19016) {
    die ();
}

function Wo_SendSMSMessage($to, $message) {
    global $wo, $sqlConnect;
    if (empty($to)) {
        return false;
    }
    if ($wo['config']['sms_provider'] == 'twilio') {
        include_once('assets/libraries/twilio/vendor/autoload.php');
        $account_sid = $wo['config']['sms_twilio_username'];
        $auth_token  = $wo['config']['sms_twilio_password'];
        $to          = Wo_Secure($to);
        $client      = new Client($account_sid, $auth_token);
        try {
            $send = $client->account->messages->create($to, array(
                'from' => $wo['config']['sms_t_phone_number'],
                'body' => $message
            ));
            if ($send) {
                return true;
            }
        }
        catch (Exception $e) {
            return $e->getMessage();
        }
        return false;
    } else if ($wo['config']['sms_provider'] == 'infobip') {
        $username = $wo['config']['infobip_username'];
        $password  = $wo['config']['infobip_password'];
        $to          = Wo_Secure($to);
        if (empty($to) || empty($wo['config']['infobip_username']) || empty($wo['config']['infobip_password']) ) {
            return false;
        }
        $postUrl = "https://api.infobip.com/sms/1/text/single";
        $sms = array(
            "from" => $wo['config']['siteName'],
            "to" => $to,
            "text" => $message
        );
        $postDataJson = json_encode($sms);
        try {
            $ch = curl_init();
            $header = array("Content-Type:application/json", "Accept:application/json");
            curl_setopt($ch, CURLOPT_URL, $postUrl);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_MAXREDIRS, 2);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postDataJson);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            // response of the POST request
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $responseBody = json_decode($response);
            curl_close($ch);
            if ($httpCode >= 200 && $httpCode < 300) {
                return true;
            }else{
                return $responseBody->requestError->serviceException->text;
            }
        }
        catch (Exception $e) {
            return $e->getMessage();
        }
        return false;
    } else if ($wo['config']['sms_provider'] == 'bulksms') {
        $username = $wo['config']['sms_username'];
        $password = $wo['config']['sms_password'];
        if (empty($to)) {
            return false;
        }
        $to_ = @explode('+', $to);
        if (empty($to_[1])) {
            return false;
        }
        $to      = $to_[1];
        $url     = $wo['config']['eapi'] . '/submission/send_sms/2/2.0';
        $data    = array(
            'username' => $username,
            'password' => $password,
            'msisdn' => $to,
            'message' => $message
        );
        $options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            ),
            'ssl' => array(
                "verify_peer" => false,
                "verify_peer_name" => false
            )
        );
        $context = stream_context_create($options);
        $result  = file_get_contents($url, false, $context);
        if (preg_match('/\bIN_PROGRESS\b/', $result)) {
            return true;
        } else {
            return $result;
        }
    }
    return false;
}
function Wo_ConfirmUser($user_id, $code) {
    global $sqlConnect;
    $user_id = Wo_Secure($user_id);
    $code    = Wo_Secure($code);
    if (!is_numeric($code) || $code <= 0) {
        return false;
    }
    if (!is_numeric($user_id) || $user_id <= 0) {
        return false;
    }
    $query   = mysqli_query($sqlConnect, " SELECT COUNT(`user_id`)  FROM " . T_USERS . "  WHERE `sms_code` = '{$code}' AND `user_id` = '{$user_id}' AND `active` = '0'");
    $result  = Wo_Sql_Result($query, 0);
    if ($result == 1) {
        $email_code = md5(rand(1111, 9999) . time());
        $query_two = mysqli_query($sqlConnect, " UPDATE " . T_USERS . "  SET `active` = '1', `email_code` = '$email_code' WHERE `user_id` = '{$user_id}' ");
        if ($query_two) {
            return true;
        }
    } else {
        return false;
    }
}
function Wo_ConfirmSMSUser($user_id, $code, $email_code = '') {
    global $sqlConnect;
    $user_id = Wo_Secure($user_id);
    $code    = Wo_Secure($code);
    if (!is_numeric($code) || $code <= 0) {
        return false;
    }
    if (!is_numeric($user_id) || $user_id <= 0) {
        return false;
    }
    $query   = mysqli_query($sqlConnect, " SELECT COUNT(`user_id`)  FROM " . T_USERS . "  WHERE `sms_code` = '{$code}' AND `user_id` = '{$user_id}'");
    $result  = Wo_Sql_Result($query, 0);
    if ($result == 1) {
        $email_code = md5(rand(1111, 9999) . time());
        $query_two = mysqli_query($sqlConnect, " UPDATE " . T_USERS . "  SET `active` = '1', `email_code` = '$email_code' WHERE `user_id` = '{$user_id}' ");
        if ($query_two) {
            return true;
        }
    } else {
        return false;
    }
}
function Wo_CreateSession() {
    $hash = sha1(rand(1111, 9999));
    if (!empty($_SESSION['hash_id'])) {
        $_SESSION['hash_id'] = $_SESSION['hash_id'];
        return $_SESSION['hash_id'];
    }
    $_SESSION['hash_id'] = $hash;
    return $hash;
}
function Wo_CheckSession($hash = '') {
    if (!isset($_SESSION['hash_id']) || empty($_SESSION['hash_id'])) {
        return false;
    }
    if (empty($hash)) {
        return false;
    }
    if ($hash == $_SESSION['hash_id']) {
        return true;
    }
    return false;
}
function Wo_CreateMainSession() {
    $hash = substr(sha1(rand(1111, 9999)), 0, 20);
    if (!empty($_SESSION['main_hash_id'])) {
        $_SESSION['main_hash_id'] = $_SESSION['main_hash_id'];
        return $_SESSION['main_hash_id'];
    }
    $_SESSION['main_hash_id'] = $hash;
    return $hash;
}
function Wo_CheckMainSession($hash = '') {
    if (!isset($_SESSION['main_hash_id']) || empty($_SESSION['main_hash_id'])) {
        return false;
    }
    if (empty($hash)) {
        return false;
    }
    if ($hash == $_SESSION['main_hash_id']) {
        return true;
    }
    return false;
}

// Paypal methods
use PayPal\Api\Payer;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Details;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
function Wo_PayPal($type = 'week', $type2 = '') {
    global $wo;
    if ($wo['config']['pro'] == 0) {
        return false;
    }
    include_once('assets/includes/paypal_config.php');

    $types = array(
        'week',
        'year',
        'month',
        'life-time'
    );
    if (!in_array($type, $types)) {
        return false;
    }
    $product  = $wo['config']['siteName'] . ' PRO Package.';
    $price    = $wo['config']['weekly_price'];
    $pro_type = 1;
    if ($type == 'week') {
        $price    = $wo['config']['weekly_price'];
        $pro_type = 1;
    } else if ($type == 'year') {
        $price    = $wo['config']['yearly_price'];
        $pro_type = 3;
    } else if ($type == 'month') {
        $price    = $wo['config']['monthly_price'];
        $pro_type = 2;
    } else if ($type == 'life-time') {
        $price    = $wo['config']['lifetime_price'];
        $pro_type = 4;
    }
    $total = $price;
    $payer = new Payer();
    $payer->setPaymentMethod('paypal');
    $item = new Item();
    $item->setName($product)->setQuantity(1)->setPrice($price)->setCurrency($wo['config']['currency']);
    $itemList = new ItemList();
    $itemList->setItems(array(
        $item
    ));
    $details = new Details();
    $details->setSubtotal($price);
    $amount = new Amount();
    $amount->setCurrency($wo['config']['currency'])->setTotal($total)->setDetails($details);
    $transaction = new Transaction();
    $transaction->setAmount($amount)->setItemList($itemList)->setDescription('Pay For ' . $wo['config']['siteName'])->setInvoiceNumber(uniqid());
    $redirectUrls = new RedirectUrls();
    if (!empty($type2) && $type2 == 'upgrade') {
        $redirectUrls->setReturnUrl($wo['config']['site_url'] . "/requests.php?f=upgrade&success=true&pro_type={$pro_type}")->setCancelUrl($wo['config']['site_url'] . '/requests.php?f=payment&success=false');
    } else {
        $redirectUrls->setReturnUrl($wo['config']['site_url'] . "/requests.php?f=payment&success=true&pro_type={$pro_type}")->setCancelUrl($wo['config']['site_url'] . '/requests.php?f=payment&success=false');
    }
    $payment = new Payment();
    $payment->setIntent('sale')->setPayer($payer)->setRedirectUrls($redirectUrls)->setTransactions(array(
        $transaction
    ));
    try {
        $payment->create($paypal);
    }
    catch (Exception $e) {
        $data = array(
            'type' => 'ERROR',
            'details' => json_decode($e->getData())
        );
        if (empty($data['details'])) {
            $data['details'] = json_decode($e->getCode());
        }
        return $data;
    }
    $data = array(
        'type' => 'SUCCESS',
        'url' => $payment->getApprovalLink()
    );
    return $data;
}
function Wo_CheckPayment($paymentId, $PayerID) {
    global $wo;
    if ($wo['config']['pro'] == 0) {
        return false;
    }
    include_once  'assets/includes/paypal_config.php';
    $payment = Payment::get($paymentId, $paypal);
    $execute = new PaymentExecution();
    $execute->setPayerId($PayerID);
    try {
        $result = $payment->execute($execute, $paypal);
    }
    catch (Exception $e) {
        return json_decode($e->getData(), true);
    }
    return true;
}
function Wo_ReplenishingUserBalance($sum) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false || !$sum) {
        return false;
    }
    $user      = $wo['user']['user_id'];
    $user_data = Wo_UserData($user);
    if (empty($user_data)) {
        return false;
    }
    $user_balance = $user_data['wallet'];
    $user_balance += $sum;
    $update_data = array(
        'wallet' => $user_balance
    );
    $update      = Wo_UpdateUserData($wo['user']['user_id'], $update_data);
    return $update;
}
function Wo_ReplenishWallet($sum) {
    global $wo;
    if ($wo['loggedin'] == false || !$sum) {
        return false;
    }
    include_once  'assets/includes/paypal_config.php';
    $payer = new Payer();
    $payer->setPaymentMethod('paypal');
    $item = new Item();
    $item->setName('Replenishing your balance')->setQuantity(1)->setPrice($sum)->setCurrency($wo['config']['ads_currency']);
    $itemList = new ItemList();
    $itemList->setItems(array(
        $item
    ));
    $details = new Details();
    $details->setSubtotal($sum);
    $amount = new Amount();
    $amount->setCurrency($wo['config']['ads_currency'])->setTotal($sum)->setDetails($details);
    $transaction = new Transaction();
    $transaction->setAmount($amount)->setItemList($itemList)->setDescription('Replenish my balance')->setInvoiceNumber(time());
    $redirectUrls = new RedirectUrls();
    $redirectUrls->setReturnUrl($wo['config']['site_url'] . "/requests.php?f=wallet&s=get-paid&success=1&amount={$sum}")->setCancelUrl($wo['config']['site_url'] . "/requests.php?f=wallet&s=get-paid&success=1");
    $payment = new Payment();
    $payment->setIntent('sale')->setPayer($payer)->setRedirectUrls($redirectUrls)->setTransactions(array(
        $transaction
    ));
    try {
        $payment->create($paypal);
    }
    catch (Exception $e) {
        $data = array(
            'type' => 'ERROR',
            'details' => json_decode($e->getData())
        );
        if (empty($data['details'])) {
            $data['details'] = json_decode($e->getCode());
        }
        return $data;
    }
    $data = array(
        'status' => 200,
        'type' => 'SUCCESS',
        'url' => $payment->getApprovalLink()
    );
    return $data;
}
function Wo_GetWalletReplenishingDone($paymentId, $PayerID) {
    global $wo;
    if ($wo['loggedin'] == false || !$paymentId || !$PayerID) {
        return false;
    }
    include_once 'assets/includes/paypal_config.php';
    $payment = Payment::get($paymentId, $paypal);
    $execute = new PaymentExecution();
    $execute->setPayerId($PayerID);
    try {
        $result = $payment->execute($execute, $paypal);
    }
    catch (Exception $e) {
        return json_decode($e->getData(), true);
    }
    return true;
}
function Wo_IsUserPro($user_pro = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['pro'] == 0) {
        return false;
    }
    $user = $user_pro;
    if (empty($user) && $user !== '0') {
        $user = $wo['user']['is_pro'];
    }
    if ($user == 1) {
        return true;
    }
    return false;
}
function Wo_GetUserProType($user_type = 0) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['pro'] == 0) {
        return false;
    }
    $pro_type = $wo['user']['pro_type'];
    if (!empty($user_type) && $user_type > 0 && is_numeric($user_type)) {
        $pro_type = $user_type;
    }
    $data = array();
    switch ($pro_type) {
        case '1':
            $data['type_name']  = $wo['lang']['star_member'];
            $data['can_boost']  = 0;
            $data['color_name'] = '#4c7737';
            $data['type_url']   = Wo_SeoLink('index.php?link1=upgrade-to');
            $data['icon']       = 'star';
            break;
        case '2':
            $data['type_name']  = $wo['lang']['hot_member'];
            $data['can_boost']  = $wo['config']['monthly_boosts'];
            $data['color_name'] = '#ffbb42';
            $data['type_url']   = Wo_SeoLink('index.php?link1=upgrade-to');
            $data['icon']       = 'fire';
            break;
        case '3':
            $data['type_name']  = $wo['lang']['ultima_member'];
            $data['color_name'] = '#e13c4c';
            $data['can_boost']  = $wo['config']['yearly_boosts'];
            $data['type_url']   = Wo_SeoLink('index.php?link1=upgrade-to');
            $data['icon']       = 'bolt';
            break;
        case '4':
            $data['type_name']  = $wo['lang']['vip_member'];
            $data['color_name'] = '#3f4bb8';
            $data['can_boost']  = $wo['config']['lifetime_boosts'];
            $data['type_url']   = Wo_SeoLink('index.php?link1=upgrade-to');
            $data['icon']       = 'rocket';
            break;
    }
    return $data;
}
function Wo_GetAvUpgrades($user_id) {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['pro'] == 0) {
        return false;
    }
    if (empty($user_id)) {
        return false;
    }
    $can_see = array(
        1,
        2,
        3,
        4
    );
    $user    = Wo_UserData($user_id);
    if (empty($user)) {
        return false;
    }
    $hot_member    = $wo['lang']['hot_member'] . ' ' . $wo['config']['monthly_price'] . Wo_GetCurrency($wo['config']['currency']) . ' ' . $wo['lang']['per_month'];
    $ultima_member = $wo['lang']['ultima_member'] . ' ' . $wo['config']['yearly_price'] . Wo_GetCurrency($wo['config']['currency']) . ' ' .  $wo['lang']['per_year'];
    $vip_member    = $wo['lang']['vip_member'] . ' ' . $wo['config']['lifetime_price'] . Wo_GetCurrency($wo['config']['currency']) . ' ' .  $wo['lang']['life_time'];
    if ($user['pro_type'] == 1) {
        $can_see = array(
            'month' => $hot_member,
            'year' => $ultima_member,
            'life-time' => $vip_member
        );
    } else if ($user['pro_type'] == 2) {
        $can_see = array(
            'year' => $ultima_member,
            'life-time' => $vip_member
        );
    } else if ($user['pro_type'] == 3) {
        $can_see = array(
            'life-time' => $vip_member
        );
    } else if ($user['pro_type'] == 4) {
        $can_see = array();
    }
    return $can_see;
}
function Wo_GetProPackages() {
    global $wo;
    $free_member   = $wo['lang']['free_member'];
    $star_member   = $wo['lang']['star_member'];
    $hot_member    = $wo['lang']['hot_member'];
    $ultima_member = $wo['lang']['ultima_member'];
    $vip_member    = $wo['lang']['vip_member'];
    $data          = array(
        'free' => array(
            'id' => 0,
            'name' => $free_member
        ),
        'star' => array(
            'id' => 1,
            'name' => $star_member
        ),
        'hot' => array(
            'id' => 2,
            'name' => $hot_member
        ),
        'ultima' => array(
            'id' => 3,
            'name' => $ultima_member
        ),
        'vip' => array(
            'id' => 4,
            'name' => $vip_member
        )
    );
    return $data;
}
function Wo_CreatePayment($payment_type = 1) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['paypal_mode'] == 'sandbox') {
        //return false;
    }
    $user_id = $wo['user']['user_id'];
    if ($payment_type == 1) {
        $amount = $wo['config']['weekly_price'];
        $type   = 'weekly';
    } else if ($payment_type == 2) {
        $amount = $wo['config']['monthly_price'];
        $type   = 'monthly';
    } else if ($payment_type == 3) {
        $amount = $wo['config']['yearly_price'];
        $type   = 'yearly';
    } else if ($payment_type == 4) {
        $amount = $wo['config']['lifetime_price'];
        $type   = 'lifetime';
    } else {
        return false;
    }
    $date  = date('n') . '/' . date("Y");
    $query = mysqli_query($sqlConnect, "INSERT INTO " . T_PAYMENTS . " (`user_id`, `amount`, `date`, `type`) VALUES ({$user_id}, {$amount}, '{$date}', '{$type}')");
    if ($query) {
        return true;
    }
}
function Wo_CountAllPaymentData($type) {
    global $wo, $sqlConnect;
    $type_table   = T_PAYMENTS;
    $type         = Wo_Secure($type);
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM {$type_table} WHERE `type` = '{$type}'");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_CountAllPayment() {
    global $wo, $sqlConnect;
    $type_table = T_PAYMENTS;
    $query_one  = mysqli_query($sqlConnect, "SELECT `amount` FROM {$type_table}");
    $final_data = 0;
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $final_data += $fetched_data['amount'];
    }
    return $final_data;
}
function Wo_CountThisMonthPayment() {
    global $wo, $sqlConnect;
    $type_table = T_PAYMENTS;
    $date       = date('n') . '/' . date("Y");
    $query_one  = mysqli_query($sqlConnect, "SELECT `amount` FROM {$type_table} WHERE `amount` <> 0 AND `date` = '{$date}'");
    $final_data = 0;
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $final_data += $fetched_data['amount'];
    }
    return $final_data;
}
function Wo_GetRegisteredPaymentsStatics($month, $type = '') {
    global $wo, $sqlConnect;
    $year         = date("Y");
    $type_table   = T_PAYMENTS;
    $query_one    = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM {$type_table} WHERE `date` = '{$month}/{$year}' AND `type` = '{$type}'");
    $fetched_data = mysqli_fetch_assoc($query_one);
    return $fetched_data['count'];
}
function Wo_GetPromotedPost() {
    global $wo, $sqlConnect;
    $year           = date("Y");
    $type_table     = T_POSTS;
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query_one      = mysqli_query($sqlConnect, "SELECT `id` FROM {$type_table} WHERE `boosted` = '1' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$logged_user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$logged_user_id}') ORDER BY RAND() LIMIT 1");
    $fetched_data   = mysqli_fetch_assoc($query_one);
    if (count($fetched_data) > 0) {
        $post = Wo_PostData($fetched_data['id']);
        if (is_array($post)) {
            return $post;
        }
    } else {
        return array();
    }
}
function Wo_GetPromotedPage() {
    global $wo, $sqlConnect;
    $type_table     = T_PAGES;
    $data           = array();
    $logged_user_id = Wo_Secure($wo['user']['user_id']);
    $query_one      = mysqli_query($sqlConnect, "SELECT `page_id` FROM {$type_table} WHERE `boosted` = '1' AND `page_id` NOT IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$logged_user_id} AND `active` = '1') AND `page_id` NOT IN (SELECT `page_id` FROM " . T_PAGES_LIKES . " WHERE `user_id` = {$logged_user_id} AND `active` = '1') ORDER BY RAND() LIMIT 2");
    while ($fetched_data = mysqli_fetch_assoc($query_one)) {
        $data[] = Wo_PageData($fetched_data['page_id']);
    }
    return $data;
}
function Wo_GetBoostedPosts($user_id) {
    global $wo, $sqlConnect;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_POSTS . " WHERE `user_id` = {$user_id} AND `boosted` = '1' ORDER BY id DESC");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_PostData($fetched_data['id']);
    }
    return $data;
}
function Wo_GetBoostedPages($user_id) {
    global $wo, $sqlConnect;
    $data  = array();
    $query = mysqli_query($sqlConnect, "SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id} AND `boosted` = '1' ORDER BY `page_id` DESC");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_PageData($fetched_data['page_id']);
    }
    return $data;
}
function Wo_RedirectSmooth($url) {
    global $wo;
    if ($wo['config']['smooth_loading'] == 0) {
        return header("Location: $url");
        exit();
    } else {
        return $wo['redirect'] = 1;
    }
}
function Wo_DownUpgradeUser($user_id) {
    global $wo, $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `boosted` = '0' WHERE `user_id` = '{$user_id}'");
    $query_one = mysqli_query($sqlConnect, "UPDATE " . T_PAGES . " SET `boosted` = '0' WHERE `user_id` = '{$user_id}'");
}
function Wo_GetCurrency($currency) {
    global $wo, $sqlConnect;
    if (empty($currency)) {
        return false;
    }
    $currency_ = '$';
    switch ($currency) {
        case 'USD':
            $currency_ = '$';
            break;
        case 'JPY':
            $currency_ = '¥';
            break;
        case 'TRY':
            $currency_ = '₺';
            break;
        case 'GBP':
            $currency_ = '£';
            break;
        case 'EUR':
            $currency_ = '€';
            break;
        case 'AUD':
            $currency_ = '$';
            break;
        case 'INR':
            $currency_ = '₹';
            break;
        case 'RUB':
            $currency_ = 'RUB';
            break;
        case 'PLN':
            $currency_ = 'zł';
            break;
        case 'ILS':
            $currency_ = 'ILS';
            break;
        case 'BRL':
            $currency_ = 'R$';
            break;
    }
    return $currency_;
}
function Wo_CreateNewVideoCall($re_data) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($re_data)) {
        return false;
    }
    $user_data  = Wo_UserData($re_data['from_id']);
    $user_data2 = Wo_UserData($re_data['to_id']);
    if (empty($user_data) || empty($user_data2)) {
        return false;
    }
    $logged_user_id    = Wo_Secure($wo['user']['user_id']);
    $query1            = mysqli_query($sqlConnect, "DELETE FROM " . T_VIDEOS_CALLES . " WHERE `from_id` = {$logged_user_id} OR `to_id` = {$logged_user_id}");
    $re_data['active'] = 0;
    $re_data['called'] = $re_data['from_id'];
    $re_data['time']   = Wo_Secure(time());
    $fields            = '`' . implode('`, `', array_keys($re_data)) . '`';
    $data              = '\'' . implode('\', \'', $re_data) . '\'';
    $query             = mysqli_query($sqlConnect, "INSERT INTO " . T_VIDEOS_CALLES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    } else {
        return false;
    }
}
function Wo_CreateNewAgoraCall($re_data = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($re_data)) {
        return false;
    }
    $user_data  = Wo_UserData($re_data['from_id']);
    $user_data2 = Wo_UserData($re_data['to_id']);
    if (empty($user_data) || empty($user_data2)) {
        return false;
    }
    $logged_user_id    = Wo_Secure($wo['user']['user_id']);
    $query1            = mysqli_query($sqlConnect, "DELETE FROM " . T_AGORA . " WHERE `from_id` = {$logged_user_id} OR `to_id` = {$logged_user_id}");
    $re_data['time']   = Wo_Secure(time());
    $fields            = '`' . implode('`, `', array_keys($re_data)) . '`';
    $data              = '\'' . implode('\', \'', $re_data) . '\'';
    $query             = mysqli_query($sqlConnect, "INSERT INTO " . T_AGORA . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    } else {
        return false;
    }
}
function Wo_CreateNewAudioCall($re_data) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($re_data)) {
        return false;
    }
    $user_data  = Wo_UserData($re_data['from_id']);
    $user_data2 = Wo_UserData($re_data['to_id']);
    if (empty($user_data) || empty($user_data2)) {
        return false;
    }
    $logged_user_id    = Wo_Secure($wo['user']['user_id']);
    $query1            = mysqli_query($sqlConnect, "DELETE FROM " . T_AUDIO_CALLES . " WHERE `from_id` = {$logged_user_id} OR `to_id` = {$logged_user_id}");
    $re_data['active'] = 0;
    $re_data['called'] = $re_data['from_id'];
    $re_data['time']   = Wo_Secure(time());
    $fields            = '`' . implode('`, `', array_keys($re_data)) . '`';
    $data              = '\'' . implode('\', \'', $re_data) . '\'';
    $query             = mysqli_query($sqlConnect, "INSERT INTO " . T_AUDIO_CALLES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    } else {
        return false;
    }
}
function Wo_CheckCallAnswer($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $data1 = array();
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_VIDEOS_CALLES . "  WHERE `id` = '{$id}' AND `active` = '1' AND `declined` = '0'");
    if (mysqli_num_rows($query) > 0) {
        $sql          = mysqli_fetch_assoc($query);
        $data1['url'] = $wo['config']['site_url'] . '/video-call/' . $id;
        return $data1;
    } else {
        return false;
    }
}
function Wo_CheckAudioCallAnswer($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $data1 = array();
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_AUDIO_CALLES . "  WHERE `id` = '{$id}' AND `active` = '1' AND `declined` = '0'");
    if (mysqli_num_rows($query) > 0) {
        return true;
    } else {
        return false;
    }
}
function Wo_CheckAudioCallAnswerDeclined($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_AUDIO_CALLES . " WHERE `id` = '{$id}' AND `declined` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_CheckCallAnswerDeclined($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT COUNT(`id`) FROM " . T_VIDEOS_CALLES . " WHERE `id` = '{$id}' AND `declined` = '1'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}

function Wo_CheckFroInCallsAgora() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $data1   = array();
    $time    = time() - 40;
    $table   = T_AGORA;
    $query = mysqli_query($sqlConnect, "SELECT * FROM {$table} WHERE `to_id` = '{$user_id}' AND `time` > '$time' AND `status` = 'calling'");
    if (mysqli_num_rows($query) > 0) {
        $sql = mysqli_fetch_assoc($query);
        if (Wo_IsBlocked($sql['from_id'])) {
            return false;
        }
        return $sql;
    } else {
        return false;
    }
}

function Wo_CheckFroInCalls($type = 'video') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $data1   = array();
    $time    = time() - 40;
    $table   = T_VIDEOS_CALLES;
    if ($type == 'audio') {
        $table = T_AUDIO_CALLES;
    }
    $query = mysqli_query($sqlConnect, "SELECT * FROM {$table}  WHERE `to_id` = '{$user_id}' AND `time` > '$time' AND `active` = '0' AND `declined` = 0");
    if (mysqli_num_rows($query) > 0) {
        $sql = mysqli_fetch_assoc($query);
        if (Wo_IsBlocked($sql['from_id'])) {
            return false;
        }
        $sql['url'] = $wo['config']['site_url'] . '/video-call/' . $sql['id'];
        return $sql;
    } else {
        return false;
    }
}
function Wo_UpdateCallsActiveToZero($user_id1 = 0, $user_id2 = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id1) || empty($user_id2)) {
        return false;
    }
    $user_id1 = Wo_Secure($user_id1);
    $user_id2 = Wo_Secure($user_id2);
    $query    = mysqli_query($sqlConnect, "UPDATE " . T_VIDEOS_CALLES . " SET `active` = 0 WHERE (`to_id` = '{$user_id1}' AND `from_id` = '{$user_id2}') OR (`to_id` = '{$user_id2}' AND `from_id` = '{$user_id1}')");
    if ($query) {
        return true;
    } else {
        return false;
    }
}
function Wo_GetAllDataFromCallID($id = 0) {
    global $sqlConnect, $wo;
    $user_id = $wo['user']['user_id'];
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $data1 = array();
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_VIDEOS_CALLES . " WHERE `id` = '{$id}'");
    if (mysqli_num_rows($query) > 0) {
        $sql        = mysqli_fetch_assoc($query);
        $sql['url'] = $wo['config']['site_url'] . '/video-call/' . $sql['id'];
        return $sql;
    } else {
        return false;
    }
}
function Wo_GetScriptWarnings() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $results  = array();
    $results1 = array();
    $query    = mysqli_query($sqlConnect, "SELECT @@sql_mode as modes;");
    $sql_sql  = mysqli_fetch_assoc($query);
    if (count($sql_sql) > 0) {
        $results_sql = @explode(',', $sql_sql['modes']);
        if (in_array('STRICT_TRANS_TABLES', $results_sql)) {
            $results['STRICT_TRANS_TABLES'] = true;
        }
        if (in_array('STRICT_ALL_TABLES', $results_sql)) {
            $results['STRICT_ALL_TABLES'] = true;
        }
    }
    if (ini_get("safe_mode")) {
        $results['safe_mode'] = true;
    }
    if (!ini_get("allow_url_fopen")) {
        $results['allow_url_fopen'] = true;
    }
    if (file_exists("update.php")) {
        if (filemtime("update.php") > time() - 86400) {
            $results['update_file'] = true;
        }
    }
    return $results1[] = $results;
}
function Wo_RegisterNewField($registration_data) {
    global $wo, $sqlConnect;
    if (empty($registration_data)) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_FIELDS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        $sql_id  = mysqli_insert_id($sqlConnect);
        $column  = 'fid_' . $sql_id;
        $length  = $registration_data['length'];
        $query_2 = mysqli_query($sqlConnect, "ALTER TABLE " . T_USERS_FIELDS . " ADD COLUMN `{$column}` varchar({$length}) NOT NULL DEFAULT ''");
        return true;
    }
    return false;
}
function Wo_GetProfileFields($type = 'all') {
    global $wo, $sqlConnect;
    $data       = array();
    $where      = '';
    $placements = array(
        'profile',
        'general',
        'social'
    );
    if ($type != 'all' && in_array($type, $placements)) {
        $where = "WHERE `placement` = '{$type}' AND `placement` <> 'none' AND `active` = '1'";
    } else if ($type == 'none') {
        $where = "WHERE `profile_page` = '1' AND `active` = '1'";
    } else if ($type != 'admin') {
        $where = "WHERE `active` = '1'";
    }
    $type      = Wo_Secure($type);
    $query_one = "SELECT * FROM " . T_FIELDS . " {$where} ORDER BY `id` ASC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $fetched_data['fid'] = 'fid_' . $fetched_data['id'];
        $fetched_data['name'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['name']);
        $fetched_data['description'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['description']);
        $fetched_data['type'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['type']);
        $data[]               = $fetched_data;
    }
    return $data;
}
function Wo_GetUserCustomFields() {
    global $wo, $sqlConnect;
    $data       = array();
    $where = "WHERE `active` = '1' AND `profile_page` = 1";

    $query_one = "SELECT * FROM " . T_FIELDS . " {$where} ORDER BY `id` ASC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $fetched_data['fid'] = 'fid_' . $fetched_data['id'];
        $fetched_data['name'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['name']);
        $fetched_data['description'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['description']);
        $fetched_data['type'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['type']);
        $data[]               = $fetched_data;
    }
    return $data;
}
function Wo_UserFieldsData($user_id) {
    global $wo, $sqlConnect;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    $data         = array();
    $user_id      = Wo_Secure($user_id);
    $query_one    = "SELECT * FROM " . T_USERS_FIELDS . " WHERE `user_id` = {$user_id}";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    if (empty($fetched_data)) {
        return array();
    }
    return $fetched_data;
}
function Wo_UpdateUserCustomData($user_id, $update_data, $loggedin = true) {
    global $wo, $sqlConnect, $cache;
    if ($loggedin == true) {
        if ($wo['loggedin'] == false) {
            return false;
        }
    }
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    if ($loggedin == true) {
        if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
            if ($wo['user']['user_id'] != $user_id) {
                return false;
            }
        }
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        foreach ($data as $key => $value) {
            $update[] = '`' . $key . '` = \'' . Wo_Secure($value, 0) . '\'';
        }
    }
    $impload     = implode(', ', $update);
    $query_one   = "UPDATE " . T_USERS_FIELDS . " SET {$impload} WHERE `user_id` = {$user_id}";
    $query_1     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_USERS_FIELDS . " WHERE `user_id` = {$user_id}");
    $query_1_sql = mysqli_fetch_assoc($query_1);
    $query       = false;
    if ($query_1_sql['count'] == 1) {
        $query = mysqli_query($sqlConnect, $query_one);
    } else {
        $query_2 = mysqli_query($sqlConnect, "INSERT INTO " . T_USERS_FIELDS . " (`user_id`) VALUES ({$user_id})");
        if ($query_2) {
            $query = mysqli_query($sqlConnect, $query_one);
        }
    }
    if ($query) {
        return true;
    }
    return false;
}
function Wo_GetFieldData($id = 0) {
    global $wo, $sqlConnect;
    if (empty($id) || !is_numeric($id) || $id < 0) {
        return false;
    }
    $data         = array();
    $id           = Wo_Secure($id);
    $query_one    = "SELECT * FROM " . T_FIELDS . " WHERE `id` = {$id}";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    if (empty($fetched_data)) {
        return array();
    }
    return $fetched_data;
}
function Wo_UpdateField($id, $update_data) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $id = Wo_Secure($id);
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
        if ($field == 'length') {
            $mysqli = mysqli_query($sqlConnect, "ALTER TABLE " . T_USERS_FIELDS . " CHANGE `fid_{$id}` `fid_{$id}` VARCHAR(" . Wo_Secure($data) . ") CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '';");
        }
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_FIELDS . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_DeleteField($id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_FIELDS . " WHERE `id` = {$id}");
    if ($query) {
        $query2 = mysqli_query($sqlConnect, "ALTER TABLE " . T_USERS_FIELDS . " DROP `fid_{$id}`;");
        if ($query2) {
            return true;
        }
    }
    return false;
}
function Wo_DeleteProMemebership() {
    global $wo, $sqlConnect, $star_package_duration, $hot_package_duration, $ultima_package_duration, $vip_package_duration;
    $data      = array();
    $query_one = "SELECT `user_id`, `pro_type`, `pro_time` FROM " . T_USERS . " WHERE `is_pro` = '1' ORDER BY `user_id` ASC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $update_data = false;
        switch ($fetched_data['pro_type']) {
            case '1':
                if ($fetched_data['pro_time'] < (time() - $star_package_duration)) {
                    $update_data = true;
                }
                break;
            case '2':
                if ($fetched_data['pro_time'] < (time() - $hot_package_duration)) {
                    $update_data = true;
                }
                break;
            case '3':
                if ($fetched_data['pro_time'] < (time() - $ultima_package_duration)) {
                    $update_data = true;
                }
                break;
            case '4':
                if ($vip_package_duration > 0) {
                    if ($fetched_data['pro_time'] < (time() - $vip_package_duration)) {
                        $update_data = true;
                    }
                }
                break;
        }
        if ($update_data == true) {
            $update      = Wo_UpdateUserData($fetched_data['user_id'], array(
                'is_pro' => 0
            ));
            $user_id     = $fetched_data['user_id'];
            $mysql_query = mysqli_query($sqlConnect, "UPDATE " . T_PAGES . " SET `boosted` = '0' WHERE `user_id` = {$user_id}");
            $mysql_query = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `boosted` = '0' WHERE `user_id` = {$user_id}");
            $mysql_query = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `boosted` = '0' WHERE `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id})");
        }
    }
    return true;
}
function Wo_GetPopularGames($limit = 10, $after = 0) {
    global $wo, $sqlConnect;

    $data      = array();
    $sql = mysqli_query($sqlConnect, "SELECT game_id, COUNT(`user_id`) AS count FROM " . T_GAMES_PLAYERS . " WHERE `active` = '1' GROUP BY `game_id` ORDER BY count DESC LIMIT ".$limit);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $fetched_data            = Wo_GameData($fetched_data['game_id']);
        $fetched_data['players'] = Wo_CountGamePlayers($fetched_data['id']);
        $data[]                  = $fetched_data;
    }
    return $data;
}
?>