<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}

$wo['album']['id'] = 0;
$wo['album']['album_name'] = '';
$wo['album']['title'] = $wo['lang']['create_album'];
if (!empty($_GET['album'])) {
	$_GET['album'] = Wo_Secure($_GET['album']);
	$album = Wo_PostData($_GET['album']);
	if (!empty($album)) {
		$wo['album']['id'] = $album['post_id'];
		$wo['album']['album_name'] = $album['album_name'];
		$wo['album']['title'] = $wo['lang']['add_photos'] .' (' . $album['album_name'] . ')';
	}
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'create_album';
$wo['title']       = $wo['album']['title'] . ' | ' . $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('album/create-album');