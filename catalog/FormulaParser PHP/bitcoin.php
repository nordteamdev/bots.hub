<?php

function addBtc($userId,$btc){
   $data = file_get_contents('users/vk/'.$userId);
	$data = unserialize($data);
    $data['btc'] = $data['btc'] + $btc;
   @file_put_contents('users/vk/'.$userId,serialize($data));
}

function reduceBtc($userId,$btc){
   $data = file_get_contents('users/vk/'.$userId);
	$data = unserialize($data);
   $data['btc'] = $data['btc'] - $btc;
   @file_put_contents('users/vk/'.$userId,serialize($data));
}

function getBtc() {
   $data = json_decode(file_get_contents("https://api.cryptonator.com/api/ticker/btc-usd"));
   return $data->ticker->price;
}