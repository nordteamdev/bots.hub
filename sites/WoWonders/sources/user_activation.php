<?php
if ($wo['loggedin'] == true) {
  header("Location: " . $wo['config']['site_url']);
  exit();
}
if (empty($_SESSION['code_id']) || !isset($_SESSION['code_id'])) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
$wo['user'] = Wo_UserData($_SESSION['code_id']);
if (empty($wo['user'])) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'user_activation';
$wo['title']       = $wo['lang']['account_activation'];
$wo['content']     = Wo_LoadPage('user_activation/content');