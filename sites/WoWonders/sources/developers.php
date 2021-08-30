<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if ($wo['config']['developers_page'] == 0) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'developers';
$wo['title']       = $wo['config']['siteTitle'];
$page = 'graph/content';
$wo['active'] = 1;
if (!empty($_GET['page'])) {
	if ($_GET['page'] == 'share') {
		$page = 'graph/share';
		$wo['active'] = 2;
	}
}
$wo['content']     = Wo_LoadPage($page);