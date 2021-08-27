<?php
session_start();
if (isset($_POST['date']) and isset($_SESSION['vk_uid'])) {
	include "../MySQL.php";
	$SQL = new MySQL;

	if ($_POST['date'] == 1) // За сегодня
		$messages = $SQL->get_top_messages(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'))),
			strtotime(date(('Y-m-d'), strtotime("+1 day")))
		);
	elseif ($_POST['date'] == 2) // За вчера
		$messages = $SQL->get_top_messages(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'), strtotime("-1 day"))),
			strtotime(date(('Y-m-d')))
		);
	elseif ($_POST['date'] == 3) // За неделю
		$messages = $SQL->get_top_messages(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'), strtotime("-7 day"))),
			strtotime(date(('Y-m-d'), strtotime("+1 day")))
		);
	elseif ($_POST['date'] == 4) // За месяц
		$messages = $SQL->get_top_messages(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'), strtotime("-30 day"))),
			strtotime(date(('Y-m-d'), strtotime("+1 day")))
		);

	if (count($messages) > 0) {
		echo '<ul class="list-unstyled top_profiles">';
		for ($i = 0; $i < count($messages); $i++) {
			echo '<li class="media event">';
			echo '<div class="media-body">';
			echo '<p><strong>' . $messages[$i]["message"] . '</strong> </p>';
			echo ' <p><small>' . $messages[$i]["count"] . '  запросов </small></p>';
			echo '</div>';
			echo '</li>';
		}
		echo '</ul>';
	}
}
