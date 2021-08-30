<?php
$fl['title'] = $config['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords'] = $fl['config']['keywords'];
$fl['page'] = 'activate';
if ($fl['loggedin'] == true) {
	header("Location: " . $config['site_url']);
	exit();
}
if (empty($_GET['email']) || empty($_GET['code'])) {
	header("Location: " . $config['site_url']);
	exit();
}
$user_id = FL_UserIdFromEmail($_GET['email']);
if (empty($user_id)) {
	header("Location: " . $config['site_url']);
	exit();
}
$user_data = FL_UserData($user_id);
if (empty($user_data)) {
	header("Location: " . $config['site_url']);
	exit();
}
if (FL_UserActive($user_data['username'])) {
	header("Location: " . $config['site_url']);
	exit();
}
if (FL_EmailCode($_GET['email'], $_GET['code']) === false) {
	header("Location: " . $config['site_url']);
	exit();
}
$activate_account = FL_ActivateAccount($user_data['user_id'], $user_data['username']);
if ($activate_account) {
	$_SESSION['user_id'] = $user_data['user_id'];
	$fl['content'] = FL_LoadPage('activate/done');
} else {
	$fl['content'] = FL_LoadPage('activate/error');
}

