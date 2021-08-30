<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}


if ($wo['config']['forum'] == 0) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'forum';
$wo['active']      = null;
$wo['char']        = Wo_Secure($_GET['char']);
$wo['members']     = Wo_GetForumUsers(array("key" => Wo_Secure($_GET['char'])));
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('forum/members');