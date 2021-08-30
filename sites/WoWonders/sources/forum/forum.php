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
$wo['active']      = 'forums';
$wo['sections']    = Wo_GetForumSec(array("forums" => true,"limit" => 300));
$wo['f-total']     = Wo_GetTotalForums();
$wo['title']       = $wo['lang']['forum'] . ' | ' . $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('forum/forum');