<?php
if (empty($_GET['type']) || !isset($_GET['type'])) {
	header("Location: " . $wo['config']['site_url']);
	exit();
}
$pages = array('terms','privacy-policy','about-us','developers');
if (!in_array($_GET['type'], $pages)) {
	header("Location: " . $wo['config']['site_url']);
	exit();
}
$wo['terms'] = Wo_GetTerms();

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'terms';
$wo['title']       = '';
$type = Wo_Secure($_GET['type']);

if ($type == 'terms') {
	$wo['title']  = $wo['lang']['terms_of_use'];
} else if ($type == 'about-us') {
    $wo['title']  = $wo['lang']['about'];
} else if ($type == 'privacy-policy') {
    $wo['title']  = $wo['lang']['privacy_policy'];
} else if ($type == 'developers') {
	if ($wo['config']['developers_page'] == 0) {
		header("Location: " . $wo['config']['site_url']);
	    exit();
	}
    $wo['title']  = $wo['lang']['developers'];
}

$page = 'terms/' . $type;

$wo['title'] = $wo['config']['siteName'] . ' | ' . $wo['title'];
$wo['content']     = Wo_LoadPage($page);