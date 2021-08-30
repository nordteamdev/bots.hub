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
$wo['messages']    = Wo_GetMyReplies();
$wo['forums']      = Wo_GetForums();
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('forum/mymessages');