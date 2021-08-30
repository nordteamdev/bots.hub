<?php
if ($fl['loggedin'] == false || $fl['config']['usr_ads'] != 1) {
	header("Location:" . FL_Link(''));
	exit();
}

$fl['title']       = 'Create Ads  | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'user_ads';

$fl['content']     = FL_LoadPage('ads/create-new',array(
	
));