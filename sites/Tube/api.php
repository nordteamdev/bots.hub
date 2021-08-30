<?php

define('TOKEN','сюда токен');
define('ADMIN_USER_TOKEN','сюда токен пользователя-админа, который будет выдавать донат');
define('GROUP_ID',176187130); //ид группы

function getOnline(){
  $online = 0;
  $dialogs = json_decode(file_get_contents('https://api.vk.com/method/messages.getConversations?v=5.95&access_token='.TOKEN.'&offset=0&count=100&'),true);
  foreach($dialogs['response']['items'] as $dialog){
    if($dialog['last_message']['date']+60 > time()) $online++;
    else break;
  }
  return $online;
}

function getProducts(){
  $d = json_decode(file_get_contents('https://api.mcpetrade.com/shop.getProducts?shop=124533&server=10243&category=552'),1);
  $arr = [];
  foreach($d['response'] as $product){
    $arr[$product['name']] = ['id' => $product['id'], 'price' => $product['price']];
  }
  return $arr;
}
function createPayment($nick,$pid){
  return json_decode(file_get_contents('https://api.mcpetrade.com/shop.createPayment?shop=124533&server=10243&product='.$pid.'&username='.$nick.'&cupon='),1);
}
function getData(){
  return json_decode(file_get_contents('userdata/users.json'),true);
}
function setData($data){
  file_put_contents('userdata/users.json',json_encode($data));
}
function isUser($id){
  return isset(getData()[$id]);
}
 ?>
