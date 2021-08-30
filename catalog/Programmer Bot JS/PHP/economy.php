<?php

CONST MAX_BANK = 500000000;

function getMoney($userId){
   $data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	return $array['money'];
}

function addMoney($userId, $summa){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['money'] = $array['money'] + (int)$summa;
   @file_put_contents('players/'.$userId, serialize($array));
}

function remMoney($userId){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['money'] = 0;
   @file_put_contents('players/'.$userId, serialize($array));
}

function reduceMoney($userId, $summa){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['money'] = $array['money'] - (int)$summa;
	@file_put_contents('players/'.$userId, serialize($array));
}

function addBank($userId,$summa){
	$data = file_get_contents('players/vk/'.$userId);
	$array = unserialize($data);
	$array['bank'] = $array['bank'] + (int)$summa;
	@file_put_contents('players/vk/'.$userId,serialize($array));
}

function reduceBank($userId,$summa){
	$data = file_get_contents('players/vk/'.$userId);
	$array = unserialize($data);
	$array['bank'] = $array['bank'] - (int)$summa;
	@file_put_contents('players/vk/'.$userId,serialize($array));
}

?>