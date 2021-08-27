<?php
session_start();

if (isset($_SESSION['vk_uid']) and isset($_POST["date"])) {
	include "../MySQL.php";
	$SQL = new MySQL;

	if ($_POST["date"] == 2) { // за сегодня
		$date = date(('Y-m-d'), strtotime("+1 day"));
		$arr = array();
		for ($i = 24; $i > 0; $i--) {
			$date1 = strtotime($date) - $i * 60 * 60;
			$date2 = strtotime($date) - ($i - 1) * 60 * 60;

			$join = $SQL->get_count_group_join($_SESSION['group_id'], $date1, $date2);
			$leave = $SQL->get_count_group_leave($_SESSION['group_id'], $date1, $date2);

			array_push(
				$arr,
				array('year' => date('Y-m-d H:i:s', $date1), 'value1' => $join["count"], 'value2' => $leave["count"])
			);
		}
	}

	if ($_POST["date"] == 0) { // за вчера
		$date = date(('Y-m-d'));
		$arr = array();
		for ($i = 24; $i > 0; $i--) {
			$date1 = strtotime($date) - $i * 60 * 60;
			$date2 = strtotime($date) - ($i - 1) * 60 * 60;

			$join = $SQL->get_count_group_join($_SESSION['group_id'], $date1, $date2);
			$leave = $SQL->get_count_group_leave($_SESSION['group_id'], $date1, $date2);

			array_push(
				$arr,
				array('year' => date('Y-m-d H:i:s', $date1), 'value1' => $join["count"], 'value2' => $leave["count"])
			);

		}
	}

	if ($_POST["date"] == 1) { // за неделю
		$arr = array();
		for ($i = 5; $i >= -1; $i--) {
			$day1 = -$i;
			$date1 = strtotime(date(('Y-m-d'), strtotime("$day1 day")));

			$day2 = -$i - 1;
			$date2 = strtotime(date(('Y-m-d'), strtotime("$day2 day")));

			$join = $SQL->get_count_group_join($_SESSION['group_id'], $date2, $date1);
			$leave = $SQL->get_count_group_leave($_SESSION['group_id'], $date2, $date1);

			$arr[$i] = array(
				'year'   => date(('Y-m-d'), strtotime("$day2 day")),
				'value1' => $join["count"],
				'value2' => $leave["count"]
			);
		}
		$arr = array_reverse($arr);
	}

	if ($_POST["date"] == 3) { // За месяц
		$arr = array();
		for ($i = 28; $i >= -1; $i--) {

			$day1 = -$i;
			$date1 = strtotime(date(('Y-m-d'), strtotime("$day1 day")));

			$day2 = -$i - 1;
			$date2 = strtotime(date(('Y-m-d'), strtotime("$day2 day")));

			$join = $SQL->get_count_group_join($_SESSION['group_id'], $date2, $date1);
			$leave = $SQL->get_count_group_leave($_SESSION['group_id'], $date2, $date1);

			$arr[$i] = array(
				'year'   => date(('Y-m-d'), strtotime("$day2 day")),
				'value1' => $join["count"],
				'value2' => $leave["count"]
			);
		}
		$arr = array_reverse($arr);
	}

	echo json_encode($arr);
}

