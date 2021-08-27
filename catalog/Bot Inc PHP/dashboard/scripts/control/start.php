<?php

session_start();

if (isset($_SESSION['vk_uid'])) {

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";
	$SQL = new MySQL;

	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

	if ($user_info["access_token"] == NULL or $user_info["access_token"] == "")
		error("Необходимо <a href=\"/bot_connect.php\">Подключить бота</a>");

	if ($user_info["work"] == 1)
		$SQL->query(
			"UPDATE users set work = 0 WHERE vk_id = ?s AND group_id = ?s",
			$_SESSION['vk_uid'],
			$_SESSION['group_id']
		);
	else
		$SQL->query(
			"UPDATE users set work = 1 WHERE vk_id = ?s AND group_id = ?s",
			$_SESSION['vk_uid'],
			$_SESSION['group_id']
		);
}
else
	error("Пожалуйста, обновите страницу");

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
