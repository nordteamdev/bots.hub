<?php

include('api.php');

$d = $_GET['params'];
$goods = [
  45700 => [
    'name' => '15.000.000.000$',
    'command' => 'autodonate15kkk %id'
  ],
  45702  => [
    'name' => '50.000.000.000$',
    'command' => 'autodonate50kkk %id'
  ],
  45703 => [
    'name' => '100.000.000.000$',
    'command' => 'autodonate100kkk %id'
  ],
  45751 => [
    'name' => 'Космическое агенство',
    'command' => 'autodonatebiz %id'
  ],
  45706 => [
    'name' => 'АКЦИЯ! → Администратор',
    'command' => 'autodonateadministrator %id'
  ],
  45751 => [
    'name' => 'Разблокировка',
    'command' => 'autodonateunban %id'
  ],
  48424 => [
    'name' => 'НОВОЕ! → Принтер Giant X10',
    'command' => 'autodonatemanic %id'
  ]
];
if ($d['signature'] != getSignature($d, 'P3VDIBDK3XMJ1BH5PV19')){
  exit('ШВЫР');
}

if($d['shop'] != 124533) return;
if($d['server'] != 10243) return;
$id = intval($d['account']);
file_get_contents('https://api.vk.com/method/messages.send?access_token='.TOKEN.'&v=5.95&random_id='.mt_rand().'&user_id=194177722&message='.rawurlencode('Донат на сумму '.$d['sum'].' от ID '.$id));
file_get_contents('https://api.vk.com/method/messages.send?access_token='.TOKEN.'&v=5.95&random_id='.mt_rand().'&user_id='.$accs[$id]['id'].'&message='.rawurlencode('Спасибо за покупку '.$goods[$d['product']]['name'].'!'));
file_get_contents('https://api.vk.com/method/messages.send?access_token='.ADMIN_USER_TOKEN.'&v=5.95&random_id='.mt_rand().'&user_id=-'.GROUP_ID.'&message='.rawurlencode(str_replace('%id', $id, $goods[$d['product']]['command'])));
function getSignature($params, $secretKey) {
  ksort($params);
  unset($params['test']);
  unset($params['signature']);
  return hash('sha256', join( '{up}', $params ) . '{up}' . $secretKey);
}
?>