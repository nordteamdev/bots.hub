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
if (empty($_POST['post_id'])) {
    $error_code    = 3;
    $error_message = 'post_id (POST) is missing';
}

if (empty($_POST['fetch'])) {
    $error_code    = 3;
    $error_message = 'fetch (POST) is missing';
}

if (empty($error_code)) {
    $post_id   = Wo_Secure($_POST['post_id']);
    $post_data = Wo_PostData($post_id);
    if (empty($post_data)) {
        $error_code    = 6;
        $error_message = 'Post not found';
    } else {
        $response_data = array('api_status' => 200);
        
        $post_comments = $post_data['get_post_comments'];
        unset($post_data['get_post_comments']);

        $fetch = explode(',', $_POST['fetch']);
		$data = array();
		foreach ($fetch as $key => $value) {
			$data[$value] = $value;
		}
        
        foreach ($non_allowed as $key => $value) {
           unset($post_data['publisher'][$value]);
        }

        if (!empty($data['post_data'])) {
        	if (!empty($post_data['blog'])) {
	        	foreach ($non_allowed as $key => $value) {
		           unset($post_data['blog']['author'][$value]);
		        }
	        }
	        if (!empty($post_data['event'])) {
	        	foreach ($non_allowed as $key => $value) {
		           unset($post_data['event']['user_data'][$value]);
		        }
	        }
            $post_data['shared_from'] = (empty($post_data['shared_from'])) ? null : $post_data['shared_from'];
        	$response_data['post_data'] = $post_data;
        }

        
        if (!empty($data['post_comments'])) {
        	$comments = array();
	        foreach ($post_comments as $key => $comment) {
	            foreach ($non_allowed as $key => $value) {
	              unset($comment['publisher'][$value]);
	            }
	            $comments[] = $comment;
	        }
	        $response_data['post_comments'] = $comments;
        } 

        if (!empty($data['post_liked_users'])) {
        	$response_data['post_liked_users'] = Wo_SecureData(array('multi_array' => true), Wo_GetPostLikes($post_id));
        }

        if (!empty($data['post_wondered_users'])) {
        	$response_data['post_wondered_users'] = Wo_SecureData(array('multi_array' => true), Wo_GetPostWonders($post_id));
        }

    }
}