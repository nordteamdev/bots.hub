<?php

define('TOKEN','d90cf04eae221bcb4731221d1f2c5efac1567752d6913007bad47494c8cb52e31a1583ae0e0f18fd33b24');
define('ADMIN_USER_TOKEN','f850cfed71b566eb58267fdb3bb7e4949c55512501a5a5fb2b518d34dd4f14dcb623fa8e26a0d3dae22ca');
define('GROUP_ID',181406058); //ид группы

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
  $d = json_decode(file_get_contents('https://api.mcpetrade.com/shop.getProducts?shop=126215&server=11890&category=1111'),1);
  $arr = [];
  foreach($d['response'] as $product){
    $arr[$product['name']] = ['id' => $product['id'], 'price' => $product['price']];
  }
  return $arr;
}
function createPayment($nick,$pid){
  return json_decode(file_get_contents('https://api.mcpetrade.com/shop.createPayment?shop=126215&server=11890&product='.$pid.'&username='.$nick.'&cupon='),1);
}
function getData(){
  return json_decode(file_get_contents('./users.json'),true);
}
function setData($data){
  file_put_contents('./users.json',json_encode($data));
}
function isUser($id){
  return isset(getData()[$id]);
}
 ?>
