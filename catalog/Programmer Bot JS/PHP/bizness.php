<?php

function getBiznes($userId) {
	$data = file_get_contents('bizness/'.$userId);
	$array = unserialize($data);
	return $array;
}

function newBiznes($userId, $name, $world) {
	$data = file_get_contents('bizness/'.$userId);
	$array = unserialize($data);
	$array['name'] = $name;
	$array['world'] = $world;
  @file_put_contents('bizness/'.$userId, serialize($array));
}