<?php
session_start();
include_once dirname(__FILE__) . '/../config.php';
include "scripts/MySQL.php";

$client_id = config\VK_CLIENT_ID; // ID приложения
$client_secret = config\VK_CLIENT_SECRET; // Защищённый ключ

if (isset($_GET['hash']) and
	isset($_GET['uid']) and isset($_GET['first_name']) and isset($_GET['last_name']) and isset($_GET['photo_rec'])) {
	if (md5($client_id . $_GET['uid'] . $client_secret) == $_GET['hash']) {
		$_SESSION['vk_uid'] = $_GET['uid'];
		$_SESSION['vk_first_name'] = $_GET['first_name'];
		$_SESSION['vk_last_name'] = $_GET['last_name'];
		$_SESSION['vk_photo_rec'] = $_GET['photo_rec'];

		$SQL = new MySQL;

		$load_info = $SQL->get_user_info_by_vk_id($_GET['uid']);
		if (!$load_info) { // Если в первый раз
			$_SESSION['group_id'] = 0;
			$SQL->query("INSERT INTO users(vk_id, registration_date) VALUES (?s, ?s);", $_GET['uid'], date('Y-m-d H:i:s'));
		}
		else {
			$_SESSION['group_id'] = $load_info["group_id"]; // текущая группа пользователя
		}

		header('Location: ' . config\DASHBOARD_PAGE);
	}
	else
		header('Location: ' . config\INDEX_PAGE);
}
else
	header('Location: ' . config\INDEX_PAGE);
