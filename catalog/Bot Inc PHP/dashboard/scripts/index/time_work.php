<?php
/*
 * Предпологалось, что будет время жизни аккаунта
 *
 */
session_start();

if (isset($_SESSION['vk_uid'])) {

	echo json_encode(array('max' => 365, 'day' => 365, 'color' => '#1ABC9C'));
	return; // заглушка

	include_once "../MySQL.php";
	$SQL = new MySQL;

	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

	$datetime1 = new DateTime($user_info["bot_expiration_date"]);
	$datetime2 = new DateTime(date('Y-m-d'));
	$interval = $datetime1->diff($datetime2);
	$diff = $interval->format('%R%a');

	$diff *= -1;

	if ($diff > 0) {
		if ($diff > 30) {
			if ($diff > 365)
				$diff = 365;
			echo json_encode(array('max' => 365, 'day' => $diff, 'color' => '#1ABC9C'));
		}
		elseif ($diff > 15) {
			echo json_encode(array('max' => 30, 'day' => $diff, 'color' => '#1ABC9C'));
		}
		elseif ($diff > 5) {
			echo json_encode(array('max' => 30, 'day' => $diff, 'color' => '#F39C12'));
		}
		else {
			echo json_encode(array('max' => 30, 'day' => $diff, 'color' => '#D9534F'));
		}
	}
	else {
		echo json_encode(array('max' => 30, 'day' => 0.1, 'color' => '#D9534F'));
	}
}

