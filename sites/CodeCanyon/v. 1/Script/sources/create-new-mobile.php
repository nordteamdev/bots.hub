<?php
if ($fl['loggedin'] == false) {
	header("Location:" . $site_url);
	exit();
}

$fl['page'] = 'create-new-mobile';
$fl['title'] = $fl['config']['title'] . ' | ' . $lang['reset_your_password'];
$fl['description'] = $fl['config']['description'];
$fl['keywords'] = $fl['config']['keywords'];
$fl['content'] = FL_LoadPage('create-new/mobile');
