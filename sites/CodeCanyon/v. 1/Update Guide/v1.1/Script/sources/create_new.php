<?php
if ($fl['loggedin'] == false || (!FL_IsAdmin() && $fl['config']['can_post'] != 1)) {
    header("Location:" . $site_url);
    exit();
}
$fl['title']          = $lang['create_new'] . ' | ' . $fl['config']['title'];
$fl['description']    = $fl['config']['description'];
$fl['page']           = 'create_new';
$fl['keywords']       = $fl['config']['keywords'];
$type                 = 'news';
$allowed_create_pages = array(
    'news',
    'video',
    'list',
    'music',
    'poll',
    'quiz'
);
if (!empty($_GET['type'])) {
    $_GET['type'] = FL_Secure($_GET['type']);
    if (in_array($_GET['type'], $allowed_create_pages)) {
        $type = $_GET['type'];
    }
    else{
        header("Location:" . $site_url);
        exit();
    }
}
if (in_array($fl['page'], $fl['pages_home_array'])) {
    $fl['page_home'] = true;
}
$time              = time() . rand(1111, 9999);
$create_session    = FL_CreateSession();
$include_type      = '';
$include_entry     = 'text';
$allow_create_post = true;
if ($type == 'news') {
    $include_type      = 'news';
    if($fl['config']['news'] == 0) $allow_create_post = false;
}

if ($type == 'list') {
    $include_type    = 'list';
    if($fl['config']['lists'] == 0) $allow_create_post = false;
}
if ($type == 'poll') {
    $include_type    = 'poll';
    if($fl['config']['polls'] == 0) $allow_create_post = false;
}
if ($type == 'quiz') {
    $include_type    = 'quiz';
    if($fl['config']['quizzes'] == 0) $allow_create_post = false;
}
if ($type == 'video') {
    $include_type    = 'video';
    if($fl['config']['videos'] == 0) $allow_create_post = false;
}
if ($type == 'music') {
    $include_type    = 'music';
    if($fl['config']['music'] == 0) $allow_create_post = false;
}

if (!$allow_create_post) {
    header("Location:" . $site_url);
    exit();
}

$categories_string = $type . '_' . 'categories';
$categories = $fl[$categories_string];
$category_html = '';
foreach ($categories as $key => $category) {
    $category_html .= '<option value=" ' . $key . ' "> ' . $category . ' </option>';
}

$entry_type = '';
$page_type  = '';
switch ($include_type) {
    case 'video':
        $entry_type = FL_LoadPage("create-new/entries/video", array(
           'ENTRY_TIME' => $time,

        ));
        $page_type = FL_LoadPage('create-new/add-entries');
        break;
    case 'music':
        $entry_type = FL_LoadPage("create-new/entries/soundcloud", array(
           'ENTRY_TIME' => $time
        ));
        $page_type = FL_LoadPage('create-new/add-entries');
        break;
    case 'poll':
        $entry_type = FL_LoadPage("create-new/entries/options", array(
           'ENTRY_TIME' => $time
        ));
        $page_type = FL_LoadPage('create-new/add-entries');
        break;
    case 'quiz':
        $entry_type = FL_LoadPage("create-new/entries/quiz", array(
           'ENTRY_TIME' => $time,
           'QUESTION'   => FL_LoadPage("create-new/entries/question",array(
                'ENTRY_TIME' => time() . rand(1111, 9999),
            ))
        ));
        break;
    default:
        $entry_type = FL_LoadPage("create-new/entries/text", array(
           'ENTRY_TIME' => $time
        ));
        $page_type = FL_LoadPage('create-new/add-entries');
        break;
}
$fl['content']  = FL_LoadPage("create-new/content", array(
    'ENTRY_TIME' => $time,
    'NEW_SESSION_HASH' => $create_session,
    'NEW_ENTRY' => $entry_type,
    'PAGE_TYPE' => $include_type,
    'ADD_ENTRIES' => $page_type,
    'Categories' => $category_html
));