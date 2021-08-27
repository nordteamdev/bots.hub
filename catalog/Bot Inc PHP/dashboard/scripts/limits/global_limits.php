<?php

session_start();

if (isset($_POST['limits_day']) and isset($_POST['limits_text']) and isset($_SESSION['vk_uid'])) {
	if (!is_numeric($_POST['limits_day']) and $_POST['limits_day'] != "")
		error("Только числа");

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";
	$SQL = new MySQL;

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Ограничения ответов в сутки%",
		$_POST['limits_day']
	);

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Текст ограничения%",
		$_POST['limits_text']
	);

	header('Location: /limits.php');

}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die($err);
}
