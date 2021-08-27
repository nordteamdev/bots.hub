<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 21.12.17
 * Time: 18:21
 */

session_start();
if (isset($_SESSION['vk_uid']) and isset($_POST["selection"])) {

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}
	include_once "../../../config.php";

	if ($_SESSION['vk_uid'] != config\VK_ADMIN_ID) {
		error("Пожалуйста, зайдите за аккаунт админа");
	}

	if (empty($_POST["name"]))
		error("Пожалуйста, заполните название функции");


	include "../MySQL.php";
	$SQL = new MySQL;

	if ($_POST["selection"] == "Добавить функцию") {

		if (empty($_POST["group"]))
			$_POST["group"] = "vk";
		else
			$_POST["group"] = "vk_" . $_POST["group"];

		$SQL->add_methods_db($_POST["name"], $_POST["filename"], $_POST["description"], $_POST["group"], 1);
	}
	elseif ($_POST["selection"] == "Удалить функцию")
		$SQL->delete_methods_db($_POST["name"]);

}
else
	error("Пожалуйста, обновите страницу");

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');

	die(json_encode(array('error' => $err)));
}
