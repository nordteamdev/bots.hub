<?php
if ($fl['loggedin'] == false || empty($fl['config']['go_pro']) || (FL_IsPRO() && empty($_SESSION['upgraded']))) {
	header("Location:" . FL_Link(''));
	exit();
}

$fl['title']       = 'Go pro | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'go_pro';
$fl['content']     = FL_LoadPage('go_pro/content',array(

));
