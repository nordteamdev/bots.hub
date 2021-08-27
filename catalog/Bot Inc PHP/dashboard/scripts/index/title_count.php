<?php

include __DIR__ . "/../MySQL.php";
$SQL = new MySQL;

// Messages
$count_messages_yesterday = $SQL->get_count_messages(
	$_SESSION["group_id"],
	strtotime("yesterday"),
	strtotime("yesterday") + strtotime("now") - strtotime("today")
)["count"];

$count_messages_now = $SQL->get_count_messages($_SESSION["group_id"], strtotime("today"), strtotime("now"))["count"];

$count_messages_last_week = $SQL->get_count_messages(
	$_SESSION["group_id"],
	strtotime(date(('Y-m-d'), strtotime("-14 day"))),
	strtotime(date(('Y-m-d'), strtotime("-7 day"))) + strtotime("now") - strtotime("today")
)["count"];

$count_messages_current_week = $SQL->get_count_messages($_SESSION["group_id"], strtotime("-7 day"), strtotime("now"))["count"];

$count_messages_all_time = $SQL->get_all_count_messages($_SESSION["group_id"])["count"];


// group join
$count_group_join_yesterday = $SQL->get_count_group_join(
	$_SESSION["group_id"],
	strtotime("yesterday"),
	strtotime("yesterday") + strtotime("now") - strtotime("today")
)["count"];

$count_group_leave_yesterday = $SQL->get_count_group_leave(
	$_SESSION["group_id"],
	strtotime("yesterday"),
	strtotime("yesterday") + strtotime("now") - strtotime("today")
)["count"];

$clean_group_join_yesterday = $count_group_join_yesterday - $count_group_leave_yesterday;


$count_group_join_now = $SQL->get_count_group_join($_SESSION["group_id"], strtotime("today"), strtotime("now"))["count"];
$count_group_leave_now = $SQL->get_count_group_leave($_SESSION["group_id"], strtotime("today"), strtotime("now"))["count"];
$clean_group_join_now = $count_group_join_now - $count_group_leave_now;


$count_group_join_last_week = $SQL->get_count_group_join(
	$_SESSION["group_id"],
	strtotime(date(('Y-m-d'), strtotime("-14 day"))),
	strtotime(date(('Y-m-d'), strtotime("-7 day"))) + strtotime("now") - strtotime("today")
)["count"];

$count_group_leave_last_week = $SQL->get_count_group_leave(
	$_SESSION["group_id"],
	strtotime(date(('Y-m-d'), strtotime("-14 day"))),
	strtotime(date(('Y-m-d'), strtotime("-7 day"))) + strtotime("now") - strtotime("today")
)["count"];

$clean_group_join_last_week = $count_group_join_last_week - $count_group_leave_last_week;

$count_group_join_current_week = $SQL->get_count_group_join(
	$_SESSION["group_id"],
	strtotime(date(('Y-m-d'), strtotime("-7 day"))),
	strtotime("now")
)["count"];

$count_group_leave_current_week = $SQL->get_count_group_leave(
	$_SESSION["group_id"],
	strtotime(date(('Y-m-d'), strtotime("-7 day"))),
	strtotime("now")
)["count"];

$clean_group_leave_current_week = $count_group_join_current_week - $count_group_leave_current_week;

$count_group_join_all_time = $SQL->get_all_count_group_join($_SESSION["group_id"])["count"];
$count_group_leave_all_time = $SQL->get_all_count_group_leave($_SESSION["group_id"])["count"];
