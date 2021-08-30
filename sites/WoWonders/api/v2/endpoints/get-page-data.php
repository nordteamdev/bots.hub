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
    'api_status' => 400,
);
if (empty($_POST['page_id'])) {
    $error_code    = 3;
    $error_message = 'page_id (POST) is missing';
}

if (empty($error_code)) {
    $page_id   = Wo_Secure($_POST['page_id']);
    $page_data = Wo_PageData($page_id);
    if (empty($page_data)) {
        $error_code    = 6;
        $error_message = 'Page not found';
    } else {
        $response_data = array('api_status' => 200);
        
        foreach ($non_allowed as $key => $value) {
            unset($page_data[$value]);
        }

        $page_data['post_count'] = Wo_CountPagePosts($page_data['page_id']);
        $page_data['is_liked'] = Wo_IsPageLiked($page_data['page_id'], $user_id);
        $page_data['likes_count'] = Wo_CountPageLikes($page_data['page_id']);
        $page_data['call_action_type_text'] = '';
        if (!empty($page_data['call_action_type'])) {
            $page_data['call_action_type_text'] = $wo['call_action'][$page_data['call_action_type']];
        }

        $response_data['page_data'] = $page_data;
    }
}