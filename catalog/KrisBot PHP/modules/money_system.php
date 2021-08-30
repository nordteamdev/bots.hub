<?php
$products = [
['price'=>10000, 'd'=>'Умножает лисы на 2 в ставке', 'name'=> 'Множитель лисов X2'],
['price'=>100000, 'd'=>'VIP, может звать всех в беседе, и еще многое другое (команды дополняются)', 'name'=> 'VIP', 'function'=>function ($uid){donate::set($uid, 'vip');}],
['price'=>10000000, 'd'=>'Helper, может банить/разбанивать пользователей и попасть в любую беседу)', 'name'=> 'Helper', 'function'=>function ($uid){donate::set($uid, 'helper');}]
];
function loto(){
	$base=["🍋", "🎁", "🍓"];
  $fr_1 = arr_rand($base);
  $fr_2 = arr_rand($base);
  $fr_3 = arr_rand($base);
  $otv="[$fr_1|$fr_2|$fr_3]";
}
function chance($arr) {
  $total = array_sum($arr);
  $rand = rand(1, $total);
  foreach($arr as $key => $prob) {
    $rand -= $prob;
    if ($rand <= 0) {
      return $key;
    }
  }
}
function new_account($uid){
	global $options;
	$list = json_decode(file_get_contents("modules/base/money/balances.json"), true);
	$list[$uid] = $options['start_coins'];
	file_put_contents("modules/base/money/balances.json", json_encode($list));
	return $options['start_coins'];
}
function removeCoins($uid, $coins){
	$list = json_decode(file_get_contents("modules/base/money/balances.json"), true);
	if(!isset($list[$uid]))new_account($uid);
	$user = $list[$uid];
	if($coins > $user){
		return false;
	}
	$list[$uid] = $user-$coins;
	file_put_contents("modules/base/money/balances.json", json_encode($list));
	global $remove;
	$remove = $coins;
	return true;
}
function addCoins($uid, $coins){
	$list = json_decode(file_get_contents("modules/base/money/balances.json"), true);
	if(!isset($list[$uid]))new_account($uid);
	$user = $list[$uid];
	$list[$uid] = $user+$coins;
	file_put_contents("modules/base/money/balances.json", json_encode($list));
	return $coins;
}
function getCoins($uid){
	$list = json_decode(file_get_contents("modules/base/money/balances.json"), true);
	if(isset($list[$uid])){
		$coins = $list[$uid];
		if($coins > 999999999999){
			return "MAX";
		}
		return $coins;
	}else{
		return new_account($uid);
	}
}
function check_product($uid, $product){
	$shop = json_decode(file_get_contents("modules/base/money/products.json"), true);
	foreach ($shop as $item) {
		if($item['uid'] == $uid and $item['product'] == $product)return true;
	}
}
function buy($uid, $product){
	global $products;
	$shop = json_decode(file_get_contents("modules/base/money/products.json"), true);
	foreach ($shop as $item) {
		if($item['uid'] == $uid and $item['product'] == $product)return "Вы уже купили данный продукт!";
	}
	$coins = getCoins($uid);
	if(!isset($products[$product]))return "Данный продукт не найден!";
	$product_price=$products[$product]['price'];
	//print_r($product_price);
	if($product_price > $coins)return "Недостаточно лисов";
	$shop[] = ['uid' => $uid, 'product' => $product];
	file_put_contents("modules/base/money/products.json", json_encode($shop));
	removeCoins($uid, $product_price);
	if(isset($products[$product]['function']))$products[$product]['function']($uid);
	return "Продукт успешно куплен!";
}
?>