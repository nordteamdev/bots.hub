<?php

session_start();
if (isset($_POST['date']) and isset($_SESSION['vk_uid'])) {
	include "../MySQL.php";
	include "../VkApi.php";
	$SQL = new MySQL;
	$VK = new VkApi;

	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

	if ($_POST['date'] == 1) // За сегодня
		$active_users = $SQL->get_active_users(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'))),
			strtotime(date(('Y-m-d'), strtotime("+1 day")))
		);
	elseif ($_POST['date'] == 2) // За вчера
		$active_users = $SQL->get_active_users(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'), strtotime("-1 day"))),
			strtotime(date(('Y-m-d')))
		);
	elseif ($_POST['date'] == 3) // За неделю
		$active_users = $SQL->get_active_users(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'), strtotime("-7 day"))),
			strtotime(date(('Y-m-d'), strtotime("+1 day")))
		);
	elseif ($_POST['date'] == 4) // За месяц
		$active_users = $SQL->get_active_users(
			$_SESSION["group_id"],
			25,
			strtotime(date(('Y-m-d'), strtotime("-30 day"))),
			strtotime(date(('Y-m-d'), strtotime("+1 day")))
		);

	if (count($active_users) > 0) {
		echo '<ul class="list-unstyled top_profiles">';

		$active_users_ids = $active_users[0]["vk_id"];
		for ($i = 1; $i < count($active_users); $i++)
			$active_users_ids .= "," . $active_users[$i]["vk_id"];

		$active_users_vk = $VK->users_get($active_users_ids, $fields = "photo_50");
		$active_users_vk = $active_users_vk->response;
		for ($i = 0; $i < count($active_users); $i++) {
			echo '<li class="media event">';
			echo '<a class="pull-left">';
			echo '<img src="' . $active_users_vk[$i]->photo_50 . '" class="img-circle">';
			echo '</a>';
			echo '<div class="media-body">';
			echo ' <a class="title" target="_blank" href="https://vk.com/id' . $active_users[$i]["vk_id"] . '">' .
				 $active_users_vk[$i]->first_name . ' ' . $active_users_vk[$i]->last_name . '</a>';
			echo '<p><strong>' . $active_users[$i]["count"] . ' </strong> сообщений </p>';
			echo '<p> <small><a target="_blank" href="https://vk.com/gim' . $user_info["group_id"] . '?sel=' .
				 $active_users[$i]["vk_id"] . '">Посмотреть</a></small></p>'; // Добавсь ссылку
			echo '</div>';
			echo '</li>';
		}

		echo '</ul>';
	}
}


                      
