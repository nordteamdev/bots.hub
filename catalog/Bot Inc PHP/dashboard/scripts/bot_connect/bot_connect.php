<?php

session_start();

if (($_SESSION['vk_uid']) and isset($_POST['step'])) {
	include "../MySQL.php";
	include "../VkApi.php";
	$SQL = new MySQL;
	$vk = new VkApi;


	if ($_POST['step'] == 2) {
		if (empty($_POST['access_token']))
			error("Введите токен");

		$vk->access_token = $_POST['access_token'];
		$resp = $vk->groups_getById();

		if (isset($resp->error))
			error("Неверный ключ, пройдите процедуру заново");

		$group_id = $resp->response[0]->id;

		// Добавляем/обновляем пользователя-группу
		if ($SQL->get_user_info($_SESSION['vk_uid'], $group_id)) {
			$SQL->query(
				"UPDATE users SET access_token = ?s, group_id = ?s WHERE vk_id = ?s",
				$_POST['access_token'],
				$group_id,
				$_SESSION['vk_uid']
			);
		}
		elseif ($SQL->get_user_info_null($_SESSION['vk_uid'])) {
			$SQL->query(
				"UPDATE users SET access_token = ?s, group_id = ?s WHERE vk_id = ?s",
				$_POST['access_token'],
				$group_id,
				$_SESSION['vk_uid']
			);
		}
		else {
			$SQL->query(
				"INSERT INTO users(access_token, group_id, vk_id, registration_date) VALUES(?s, ?i, ?i, ?s)",
				$_POST['access_token'],
				$group_id,
				$_SESSION['vk_uid'],
				date('Y-m-d H:i:s')
			);
		}

		$_SESSION['group_id'] = $group_id;

		// Пишем в базу неизвестные сообщения
		$SQL->db_upload(
			$_SESSION['vk_uid'],
			$_SESSION['group_id'],
			"Неизвестные сообщения",
			"Я не понимаю;Я не знаю что сказать; Неизвестная команда"
		);

		return 0;
	}
	if ($_POST['step'] == 3) {
		if (!isset($_POST['server_str']) or empty($_POST['server_str']))
			error("Введите строку, которую должен вернуть сервер");


		$SQL->query(
			"UPDATE users set confirmation_code = ?s WHERE vk_id = ?s AND group_id = ?s",
			$_POST['server_str'],
			$_SESSION['vk_uid'],
			$_SESSION['group_id']
		);


		$uniq_id = uniqid();
		$SQL->query(
			"UPDATE users set uniqid = ?s WHERE vk_id = ?s AND group_id = ?s",
			$uniq_id,
			$_SESSION['vk_uid'],
			$_SESSION['group_id']
		);

		echo $uniq_id;
	}
}
else
	error("Перезегрузите страницу");

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
