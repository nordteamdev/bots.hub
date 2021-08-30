<?php
if ($fl['loggedin'] == true) {
	header("Location:" . $site_url);
	exit();
}
$fl['page'] = 'forgot_password';
$fl['title'] = $lang['forgot_password'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords'] = $fl['config']['keywords'];

$fl['content']  = FL_LoadPage('forgot_password/content', array(
    'LOGIN_LINK' => FL_Link('login'),
));