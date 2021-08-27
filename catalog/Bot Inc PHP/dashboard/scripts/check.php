<?php

include_once dirname(__FILE__ ). '/../../config.php';
if (!isset($_SESSION['vk_uid'])) {
	header('Location: ' . config\INDEX_PAGE . '/#auth');
	exit;
}

?>

