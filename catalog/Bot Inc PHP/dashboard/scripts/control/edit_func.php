<?php

session_start();
if (isset($_SESSION['vk_uid']) and isset($_POST["func"]) and isset($_POST["status"])) {

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	include "../MySQL.php";

	$SQL = new MySQL;
	$data = $SQL->get_methods_db();
	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

	$user_functions = explode(";", $user_info["functions"]);
	$all_functions = array();

	for ($i = 0; $i < count($data); $i++) {
		$local_func = explode(";", $data[$i]["path_name"]);

		if ($_POST["func"] == $i and $_POST["status"] == "true")
			for ($j = 0; $j < count($local_func); $j++)
				array_push($all_functions, $local_func[$j]);
		elseif ($_POST["func"] == $i and $_POST["status"] == "false")
			continue;
		elseif (in_array($data[$i]["path_name"], $user_functions))
			for ($j = 0; $j < count($local_func); $j++)
				array_push($all_functions, $local_func[$j]);
	}
	$functions = implode(";", $all_functions);


	$SQL->query(
		"UPDATE users SET functions = ?s WHERE vk_id = ?s AND group_id = ?s",
		$functions,
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
