<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 17.12.17
 * Time: 14:25
 */

session_start();
include_once dirname(__FILE__) . '/../../../config.php';
if (($_SESSION['vk_uid']) and isset($_POST['group_id'])) {
	include "../MySQL.php";
	$SQL = new MySQL;

	$test = $SQL->get_user_info($_SESSION['vk_uid'], $_POST['group_id']);
	if (!$test) {
		error("Invalid group_id");
	}

	if(isset($_POST['change'])) {
		$_SESSION['group_id'] = $_POST['group_id']; // меняем группу юзера
	}
	if(isset($_POST['delete'])) {
		$SQL->delete_user_group($_SESSION['vk_uid'], $_POST['group_id']);
	}

	header('Location: ' . config\DASHBOARD_PAGE);
}

function error($err)
{
	header('HTTP/1.1 500 Internal Server Booboo');
	header('Content-Type: application/json; charset=UTF-8');
	die($err);
}