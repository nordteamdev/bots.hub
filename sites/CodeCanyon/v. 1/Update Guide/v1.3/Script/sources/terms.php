<?php
if (empty($_GET['type']) || !isset($_GET['type'])) {
	header("Location: " . $fl['config']['site_url']);
	exit();
}
$pages = array('terms','privacy-policy','about-us', 'developers');
if (!in_array($_GET['type'], $pages)) {
	eader("Location: " . $fl['config']['site_url']);
	exit();
}
$fl['terms'] = FL_GetTerms();

$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'terms';
$fl['title']       = '';

$type = FL_Secure($_GET['type']);
if ($type == 'terms') {
	$fl['title']  = $lang['terms_of_use'];
} else if ($type == 'about-us') {
    $fl['title']  = $lang['about_us'];
} else if ($type == 'privacy-policy') {
    $fl['title']  = $lang['privacy_policy'];
} 
$page = 'terms/' . $type;

$fl['type'] = $type;
$fl['title'] = $fl['config']['name'] . ' | ' . $fl['title'];
$fl['content']     = FL_LoadPage($page);