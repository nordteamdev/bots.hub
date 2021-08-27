<?php

session_start();

if (isset($_POST['message']) and isset($_POST['selection']) and isset($_SESSION['vk_uid'])) {

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";
	include "../Emoji.php";
	$SQL = new MySQL;

	$_POST["message"] = Emoji::Encode($_POST["message"]);
	if ($_POST['selection'] == "Добавить ограничение") {
		if (!is_numeric($_POST['limit']) and $_POST['limit'] != "")
			error("Только числа");

		$SQL->query(
			"INSERT INTO user_db_limits(vk_id, group_id, input, limit_count, limit_time, limit_text) VALUES(?i, ?i, ?s, ?s, ?s, ?s)",
			$_SESSION['vk_uid'],
			$_SESSION['group_id'],
			$_POST['message'],
			$_POST['limit_count'],
			$_POST['limit_time'],
			$_POST['limit_text']
		);
	}
	elseif ($_POST['selection'] == "Удалить ограничение") {

		$SQL->query(
			"DELETE FROM user_db_limits WHERE vk_id = ?i AND group_id = ?i AND input = ?s",
			$_SESSION['vk_uid'],
			$_SESSION['group_id'],
			$_POST['message']
		);
	}

	header('Location: /limits.php');

}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die($err);
}
