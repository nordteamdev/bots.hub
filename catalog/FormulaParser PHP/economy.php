<?php

CONST MAX_BANK = 500000000;

function getMoney($userId){
   $data = file_get_contents('users/vk/'.$userId);
	$array = unserialize($data);
	return number_format($array['balance'],0,",",".");
}

function addMoney($userId,$summa){
	$data = file_get_contents('users/vk/'.$userId);
	$array = unserialize($data);
	$array['balance'] = $array['balance'] + (int)$summa;
   @file_put_contents('users/vk/'.$userId,serialize($array));
}

function reduceMoney($userId,$summa){
	$data = file_get_contents('users/vk/'.$userId);
	$array = unserialize($data);
	$array['balance'] = $array['balance'] - (int)$summa;
	@file_put_contents('users/vk/'.$userId,serialize($array));
}

function addBank($userId,$summa){
	$data = file_get_contents('users/vk/'.$userId);
	$array = unserialize($data);
	$array['bank'] = $array['bank'] + (int)$summa;
	@file_put_contents('users/vk/'.$userId,serialize($array));
}

function reduceBank($userId,$summa){
	$data = file_get_contents('users/vk/'.$userId);
	$array = unserialize($data);
	$array['bank'] = $array['bank'] - (int)$summa;
	@file_put_contents('users/vk/'.$userId,serialize($array));
}

?>