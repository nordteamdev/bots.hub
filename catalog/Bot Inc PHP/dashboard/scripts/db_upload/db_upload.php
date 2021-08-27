<?php
session_start();

include "../MySQL.php";
include "../Emoji.php";

$SQL = new MySQL;

set_include_path(get_include_path() . PATH_SEPARATOR);
include __DIR__ . '/PHPExcel.php';

if (isset($_SESSION['vk_uid'])) {

	if ($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['vk_uid']);

	/*	if (date('Y-m-d H:i:s') > $user_info["bot_expiration_date"])
			error("Пожалуйста, закажите/продлите аккаунт");*/

	if ($_FILES["file"]["size"] != 0 and $_FILES["file"]["size"] < 1000000) {
		if ($error == UPLOAD_ERR_OK) {

			move_uploaded_file($_FILES["file"]["tmp_name"], "/tmp/" . $_SESSION['group_id']);

			$arr = array();

			$objPHPExcel = PHPExcel_IOFactory::load("/tmp/" . $_SESSION['group_id']);

			$arr = $objPHPExcel->getActiveSheet()->toArray();

			if (count($arr) > 10000)
				error("Количество строк должно быть менее 10 000");


			$SQL->query(
				"DELETE FROM user_db WHERE vk_id = ?s AND group_id = ?s",
				$_SESSION['vk_uid'],
				$_SESSION['group_id']
			);

			if($arr[0][1] == "Сообщение")
				array_shift($arr);

			for ($i = 0; $i < count($arr); $i++) {
				$arr[$i][1] = Emoji::Encode($arr[$i][1]);
			}

			$SQL->db_multi_upload($_SESSION['vk_uid'], $_SESSION['group_id'], $arr);

		}
		else
			error($error);
	}
	else
		error("Объем базы превышает норму, обратись к админу или уменьши базу!");
}
else
	error("Обновите страничку");

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	die($err);
}

