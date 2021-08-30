<?php
if ($fl['loggedin'] == true) {
	header("Location:" . $site_url);
	exit();
}
$fl['title'] = $lang['login']  . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['page'] = 'login';
$fl['keywords'] = $fl['config']['keywords'];
$fl['content'] = FL_LoadPage('login/content');