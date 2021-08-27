<?php
session_start();

include "../MySQL.php";
include "../VkApi.php";

$SQL = new MySQL;
$VK = new VkApi;

if (isset($_SESSION['vk_uid']) and isset($_POST["message"]) and !empty($_POST["message"]) and isset($_POST["to"]) and
																							  !empty($_POST["to"]) and
																							  isset($_POST["from"])) {

	if($_SESSION['group_id'] == 0) {
		error("Пожалуйста, подключите бота в настройках");
	}

	$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);
/*	if (date('Y-m-d H:i:s') > $user_info["bot_expiration_date"])
		error("Пожалуйста, закажите/продлите аккаунт");*/

	$VK->access_token = $user_info["access_token"];
	if ($VK->access_token != "") {
		$max_messages_count = $VK->messages_getDialogs(1);
		$max_messages_count = $max_messages_count->response->count;
	}
	else
		$max_messages_count = 0;


	if (!is_numeric($_POST["to"]) or !is_numeric($_POST["from"]) or ($_POST["to"] - $_POST["from"]) <= 0)
		error("Пожалуйста, введите вверный диапазон рассылки");

	if ($_POST["to"] > $max_messages_count)
		error("Количество Ваших диалогов не должно превышать максимума($max_messages_count).");

	$message = (htmlspecialchars($_POST["message"]));
	if ($message == "")
		error("Некорректное сообщение");

	$attachment = "";
	if (mb_substr($message, 0, 1) == "@") {
		$message = mb_substr($message, 1); // Отсекаем
		$message = explode(" ", $message); // разбиваем по пробелам
		$attachment = trim($message[0]); // Прикрепляем
		unset($message[0]); // Отбрасываем прикрепление
		$message = trim(implode(" ", $message));
	}


	$memcached = new Memcached();
	$memcached->addServer('localhost', 11211);

	$memcached->set('message_sending_message_' . $_SESSION['vk_uid'], $message);
	$memcached->set('message_sending_attachment_' . $_SESSION['vk_uid'], $attachment);
	$memcached->set('message_sending_from_' . $_SESSION['vk_uid'], $_POST["from"]);
	$memcached->set('message_sending_to' . $_SESSION['vk_uid'], $_POST["to"]);


	if (!$memcached->get('message_sending_start_' . $_SESSION['vk_uid'])) // Если юзер еще не заходил
	{
		$memcached->set('message_sending_start_' . $_SESSION['vk_uid'], true);
		shell_exec("php " . __DIR__ . "/process.php " . $_SESSION['vk_uid'] . " " . $_SESSION['group_id'] . "> /dev/null 2>/dev/null &");
	}
	else
		error("Дождитесь выполнения предыдущей команды!");

}
else
	error("Пожалуйста, введите все параметры");

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}

