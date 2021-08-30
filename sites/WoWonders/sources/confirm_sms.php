<?php
if ($wo['loggedin'] == true) {
  header("Location: " . $wo['config']['site_url']);
  exit();
}
if (empty($_GET['code'])) {
	header("Location: " . $wo['config']['site_url']);
    exit(); 
}
$get_user = $wo['confirm_user'] = Wo_UserData(Wo_UserIDFromEmailCode($_GET['code']));

if (empty($get_user)) {
	header("Location: " . $wo['config']['site_url']);
    exit(); 
}


$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'welcome';
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('welcome/confirm-sms');

