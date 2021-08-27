<?php

session_start();

if (isset($_SESSION['vk_uid'])) {
	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";
	include "../Emoji.php";

	$SQL = new MySQL;

	$data = $SQL->get_user_db($_SESSION['vk_uid'], $_SESSION['group_id']);
	for ($i = 0; $i < count($data); $i++) {
		echo '<tr>';
		echo '<td>' . Emoji::Decode($data[$i]["input"]) . '</td>' . '<td>' . $data[$i]["output"] . '</td>';
		echo '</tr>';
	}
}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
