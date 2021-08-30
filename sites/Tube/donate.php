<?php

include('api.php');

$d = $_GET['params'];
$goods = [
  38872 => [
    'name' => '100 000 дублонов',
    'command' => 'give %id 100000'
  ],
  38871 => [
    'name' => 'Админ-статуса',
    'command' => 'adm %id 5'
  ]
];
if ($d['signature'] != getSignature($d, '3C7U78FIT9NCIYV0VVZG')){
   exit('ШВЫР');
}

if($d['shop'] != 124533) return;
if($d['server'] != 10243) return;
$id = intval($d['account']);
file_get_contents('https://api.vk.com/method/messages.send?access_token='.TOKEN.'&v=5.95&random_id='.mt_rand().'&user_id=167888509&message='.rawurlencode('Донат на сумму '.$d['sum'].' от ID '.$id));
file_get_contents('https://api.vk.com/method/messages.send?access_token='.TOKEN.'&v=5.95&random_id='.mt_rand().'&user_id='.$accs[$id]['id'].'&message='.rawurlencode('Спасибо за покупку '.$goods[$d['product']]['name'].'!'));
file_get_contents('https://api.vk.com/method/messages.send?access_token='.ADMIN_USER_TOKEN.'&v=5.95&random_id='.mt_rand().'&user_id=-'.GROUP_ID.'&message='.rawurlencode(str_replace('%id', $id, $goods[$d['product']]['command'])));
function getSignature($params, $secretKey) {
   ksort($params);
   unset($params['test']);
   unset($params['signature']);
   return hash('sha256', join( '{up}', $params ) . '{up}' . $secretKey);
}
 ?>
