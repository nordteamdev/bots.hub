<?php
if ($fl['loggedin'] == false || (!FL_IsAdmin() && $fl['config']['can_post'] != 1)) {
	header("Location:" . FL_Link(''));
	exit();
}
if (empty($_GET['id'])) {
	header("Location:" . FL_Link(''));
	exit();
}
if (empty($_GET['type'])) {
	header("Location:" . FL_Link(''));
	exit();
}
$types = array('news', 'lists', 'music', 'videos', 'polls','quiz');
if (!in_array($_GET['type'], $types)) {
	header("Location:" . FL_Link(''));
	exit();
}
$type = FL_Secure($_GET['type']);
$id = FL_Secure($_GET['id']);
$is_post_owner = FL_IsPostOwner($id, $type);

if ($is_post_owner === false) {
	header("Location:" . FL_Link(''));
	exit();
}
$fl['delete_data'] = array();
$fl['delete_data'] = FL_GetPost($id, 0, $type);
if (empty($fl['delete_data'])) {
	header("Location:" . FL_Link(''));
	exit();
}
$fl['delete_data']['type'] = $type;


$fl['title'] = $lang['delete_post'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['page'] = 'delete-post';
$fl['keywords'] = $fl['config']['keywords'];

$time           = time() . rand(1111, 9999);
$create_session = FL_CreateSession();

$fl['content']  = FL_LoadPage("delete-post/content", array(
    'NEW_SESSION_HASH' => $create_session,
    'DELETE_DATA__TITLE' => $fl['delete_data']['title'],
    'DELETE_DATA__ID' => $fl['delete_data']['id'],
    'DELETE_DATA__TYPE' => $fl['delete_data']['type'],
    'DELETE_DATA__URL' => $fl['delete_data']['url'],
    'SIDEBAR_HTML' => FL_LoadPage('sidebar/content', array())
));