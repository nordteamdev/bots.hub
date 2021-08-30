<?php

if (empty($_GET['app_id']) && empty($_GET['app_secret'])) {
	die('');
}

if (Wo_AccessToken($_GET['app_id'], $_GET['app_secret']) === true) {
	header('Location: http://localhost/wowonder_update/oauth?app_id=' . $_GET['app_id']);
	exit();
}

die('Wrong APP ID or APP Secret.');
?>