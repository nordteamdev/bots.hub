<?php

session_start();

if (isset($_POST['subscribe_text']) and isset($_POST['unsubscribe_text']) and isset($_SESSION['vk_uid'])) {

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";
	$SQL = new MySQL;

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Сообщение при подписке%",
		$_POST['subscribe_text']
	);

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Сообщение при отписке%",
		$_POST['unsubscribe_text']
	);

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Отвечать только подписчикам%",
		$_POST['please_subscribe_text']
	);

	header('Location: /subscribe.php');
}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
