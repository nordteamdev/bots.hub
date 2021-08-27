<?php
/*
 * Для корректоной работы рассылки, необходимо подключить memcached
 */
session_start();

if (isset($_SESSION['vk_uid'])) {
	$memcached = new Memcached();
	$memcached->addServer('localhost', 11211);

	if ($memcached->get('message_sending_start_' . $_SESSION['vk_uid'])) {
		echo $memcached->get('message_sending_value_now' . $_SESSION['vk_uid']);
	}
	else
		echo "null";
}
else
	error("Обновите страничку");

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}

