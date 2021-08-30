<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if ($wo['config']['forum'] == 0) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
if (isset($_GET['fid']) && is_numeric($_GET['fid'])) {
	$forum	=  Wo_GetForum($_GET['fid']);
	if (!empty($forum)) {	
		$wo['description'] = $wo['config']['siteDesc'];
		$wo['keywords']    = $wo['config']['siteKeywords'];
		$wo['page']        = 'forum';
		$wo['bbcodeditor'] = true;
		$wo['active']      = null;
		$wo['forum_data']  = $forum;
		$wo['title']       = $wo['config']['siteTitle'];
		$wo['content']     = Wo_LoadPage('forum/forumsadd');
	}
}
