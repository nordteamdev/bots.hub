<?php
session_start();

include "../MySQL.php";
include "../Emoji.php";
$SQL = new MySQL;

if (isset($_SESSION['vk_uid']) and
	isset($_POST["selection"]) and isset($_POST["message"]) and isset($_POST["answer"])) {
	if($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	/*	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

		if (date('Y-m-d H:i:s') > $user_info["bot_expiration_date"])
			error("Пожалуйста, закажите/продлите аккаунт");*/

	$_POST["message"] = Emoji::Encode($_POST["message"]);
	if ($_POST["selection"] == "Добавить сообщение") {
		$SQL->db_upload($_SESSION['vk_uid'], $_SESSION['group_id'], $_POST["message"], $_POST["answer"]);
	}
	elseif ($_POST["selection"] == "Удалить сообщение") {
		$SQL->query("DELETE FROM user_db WHERE group_id = ?s AND input = ?s", $_SESSION['group_id'], $_POST["message"]);
	}
}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
