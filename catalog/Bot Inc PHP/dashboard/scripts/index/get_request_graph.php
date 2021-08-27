<?php
session_start();
/*
 * Вк предеает времяпо UTC, так что на при локальных текстах нужно это учитывать, иначе графики прогрузятся
 * несколько позже
 */

if (isset($_SESSION['vk_uid']) and isset($_POST["date"])) {
	include "../MySQL.php";
	$SQL = new MySQL;

	if ($_POST["date"] == 0) { //  за вчера
		$date = date(('Y-m-d'));
		$arr = array();
		for ($i = 24; $i > 0; $i--) {
			$date1 = strtotime($date) - $i * 60 * 60;
			$date2 = strtotime($date) - ($i - 1) * 60 * 60;

			$resp = $SQL->get_count_messages($_SESSION['group_id'], $date1, $date2);
			array_push($arr, array('year' => date('Y-m-d H:i:s', $date1), 'value' => $resp["count"]));
		}
	}

	if ($_POST["date"] == 2) { // за сегодня
		$date = date(('Y-m-d'), strtotime("+1 day"));
		$arr = array();
		for ($i = 24; $i > 0; $i--) {
			$date1 = strtotime($date) - $i * 60 * 60;
			$date2 = strtotime($date) - ($i - 1) * 60 * 60;

			$resp = $SQL->get_count_messages($_SESSION['group_id'], $date1, $date2);
			array_push($arr, array('year' => date('Y-m-d H:i:s', $date1), 'value' => $resp["count"]));
		}
	}

	if ($_POST["date"] == 1) { // за неделю
		$arr = array();
		for ($i = 5; $i >= -1; $i--) {
			$day1 = -$i;
			$date1 = strtotime(date(('Y-m-d'), strtotime("$day1 day")));

			$day2 = -$i - 1;
			$date2 = strtotime(date(('Y-m-d'), strtotime("$day2 day")));

			$resp = $SQL->get_count_messages($_SESSION['group_id'], $date2, $date1);
			$arr[$i] = array('year' => date(('Y-m-d'), strtotime("$day2 day")), 'value' => $resp["count"]);
		}
		$arr = array_reverse($arr);
	}

	// за месяц
	if ($_POST["date"] == 3) {
		$arr = array();
		for ($i = 28; $i >= -1; $i--) {
			$day1 = -$i;
			$date1 = strtotime(date(('Y-m-d'), strtotime("$day1 day")));

			$day2 = -$i - 1;
			$date2 = strtotime(date(('Y-m-d'), strtotime("$day2 day")));

			$resp = $SQL->get_count_messages($_SESSION['group_id'], $date2, $date1);
			$arr[$i] = array('year' => date(('Y-m-d'), strtotime("$day2 day")), 'value' => $resp["count"]);
		}
		$arr = array_reverse($arr);
	}


	echo json_encode($arr);
}
