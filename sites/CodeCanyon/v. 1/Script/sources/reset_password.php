<?php
if ($fl['loggedin'] == true || empty($_GET['code'])) {
	header("Location:" . $site_url);
	exit();
}
$check_code = FL_PasswordResetCode($_GET['code']);
if ($check_code) {
	$fl['content'] = FL_LoadPage('reset_password/content');
} else {
	$fl['content'] = FL_LoadPage('reset_password/error');
}
$fl['page'] = 'reset_password';
$fl['title'] = $lang['reset_your_password'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords'] = $fl['config']['keywords'];
