<?php
$pages  = array('news','polls','videos','lists','music','quiz');

if (empty($_GET['id']) || empty($_GET['post_type'])) {
    $e404 = FL_LoadPage("api/markup/html/404/content");
    echo $e404;
    exit();
}

else if (!in_array($_GET['post_type'], $pages)) {
	$e404 = FL_LoadPage("api/markup/html/404/content");
    echo $e404;
    exit();
}

$page        = 1;
$post_type   = FL_Secure($_GET['post_type']);
$post_id     = @end(explode('-', $_GET['id']));
$post_data   = FL_GetPost($post_id, $page, $post_type);

if (empty($post_data)) {
    $e404 = FL_LoadPage("api/markup/html/404/content");
    echo $e404;
    exit();
}


$fl['content']  = FL_LoadPage("api/markup/html/story/content", array(
    'STORY_ENTRIES' => FL_ForEachEntries($post_data['entries']),
    'STORY_AD' => FL_GetAd('between', false)
));

$fl['title']               = $post_data['title'];
$fl['keywords']               = '';
$fl['description']         = $post_data['description'];
$fl['page']                = 'post_data';