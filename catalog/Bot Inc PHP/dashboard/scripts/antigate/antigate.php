<?php
/*
 * Не нужно, код нерабочий
 */
session_start();	

if(isset($_POST['antigate']) and isset($_SESSION['vk_uid']))
{
	if($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";
	$SQL = new MySQL;

	$SQL->query("UPDATE users SET antigate = ?s WHERE group_id = ?s", $_POST['antigate'], $_SESSION['vk_uid']);
	
	header('Location: /antigate.php');
	
}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
