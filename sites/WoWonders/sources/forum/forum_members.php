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
$wo['active']      = 'members';
$wo['members']     = Wo_GetForumUsers();
$wo['total_mbrs']  = Wo_GetTotalUsers();
$wo['char']        = null;
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('forum/members');