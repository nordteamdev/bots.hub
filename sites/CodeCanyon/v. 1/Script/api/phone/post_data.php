<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2017 phpflame. All rights reserved.
// +------------------------------------------------------------------------+
exit();
$json_error_data   = array();
$json_success_data = array();
$post_pages        = array('news','poll','video','list','music','quiz');
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
$type     = FL_Secure($_GET['type'], 0);
if ($type == 'post_data') {
    if (empty($_GET['post_id']) || !is_numeric($_GET['post_id']) || $_GET['post_id'] < 1) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '2',
                'error_text' => 'Bad request,post id is wrong.'
            )
        );
    }
    if (empty($_GET['post_type']) || !in_array($_GET['post_type'], $post_pages)) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '3',
                'error_text' => 'Bad request,no page specified.'
            )
        );
    }
    if (empty($json_error_data)) {
        $page        = (isset($_GET['page'])) ? (int) $_GET['page'] : 1;
        $post_type   = $_GET['post_type'];
        $post_id     = FL_Secure($_GET['post_id']);
        $post_data   = FL_GetPost($post_id, $page, $post_type);

        if (empty($post_data)) {
            header("Content-type: application/json");
            echo 'Post is not exists.';
            exit();
        }

        else {
            $post_content = FL_LoadPage("api/markup/html/story/content", array(
                'STORY_TITLE' => $post_data['title'],
                'STORY_DESC' => $post_data['description'],
                'STORY_ENTRIES' => FL_ForEachEntries($post_data['entries']),
                'STORY_AD' => FL_GetAd('between', false)
            ));

            
            $json_success_data  = array(
                'api_status' => '200',
                'api_text' => 'success',
                'api_version' => $api_version,
                'post_data' => $post_content
            );
            header("Content-type: application/html");
            echo $post_content;
            exit();
        }
    }
    else {
        header("Content-type: application/html");
        echo '';
        exit();
    }
}

header("Content-type: application/json");
echo json_encode($json_success_data);
exit();
?>