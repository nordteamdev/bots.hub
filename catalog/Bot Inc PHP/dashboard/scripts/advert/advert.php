<?php
session_start();

if (isset($_POST['advert_text']) and
	isset($_POST['advert_frequency']) and isset($_POST['advert_first']) and isset($_SESSION['vk_uid'])) {

	include "../MySQL.php";
	$SQL = new MySQL;

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Рекламный текст%",
		$_POST['advert_text']
	);

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Частота повторов рекламы%",
		$_POST['advert_frequency']
	);

	$SQL->db_upload_special(
		$_SESSION['vk_uid'],
		$_SESSION['group_id'],
		"%Первая реклама%",
		$_POST['advert_first']
	);

	header('Location: /advert.php');
}
else
	header('Location: /advert.php');

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('error' => $err)));
}
