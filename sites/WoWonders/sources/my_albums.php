<?php
if ($wo['loggedin'] == false) {
  header("Location: " . $wo['config']['site_url']);
  exit();
}

$wo['user_id'] = $wo['user']['user_id'];
if (!empty($_GET['user'])) {
	$user_id = Wo_UserIdFromUsername($_GET['user']);
	if (!empty($user_id)) {
		$wo['user_album'] = Wo_UserData($user_id);
		$wo['user_id'] = $wo['user_album']['user_id'];
	}
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'my_albums';
$wo['title']       = $wo['lang']['albums'];
$wo['content']     = Wo_LoadPage('album/my-albums');