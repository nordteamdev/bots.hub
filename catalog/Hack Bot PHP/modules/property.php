<?php
function BuyProperty($db, $id = false){
	global $UserInfo,$Nick,$mysqli,$bodyxl;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `'.$db.'`');
		$message = $Nick.', ниже ты видишь все '.($bodyxl[0]).':<br>';
		while (($row = $data->fetch_assoc()) != false) {
			$message .= $row['id'].'.'.$row['name'].'('.ConvertValute(GetPriceProperty($row['price'])).'$)<br>';
		}
		$message .= 'Напишите "'.$bodyxl[0].' [номер]", чтобы купить.';
	}elseif(!empty($id)){
		$data = $mysqli->query('SELECT * FROM `'.$db.'` WHERE `id`='.$id)->fetch_assoc();
		if($data){
			if(empty($UserInfo[$db])){
				$propertyPrice = GetPriceProperty($data['price']);
				if($UserInfo['dollar'] >= $propertyPrice){
					AddJsonValue($db,'id',$data['id']);
					AddJsonValue($db,'name',$data['name']);
					SetFieldF('dollar',$UserInfo['dollar']-$propertyPrice);
					$message = $Nick.', вы купили "'.$data['name'].'" за '.ConvertValute($propertyPrice).'$.';
				}else{
					$message = $Nick.', недостаточно $.';
				}
			}else{
				$message = $Nick.', продайте сначала имущество.'.SwitchRusToEn($db);
			}
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;
}
function SellProperty($typeProperty){
	global $UserInfo,$Nick,$mysqli;
	$typeProperty = SwitchRusToEn($typeProperty);
	if(!empty(GetJsonValue($typeProperty,'id'))){
		$idProperty = GetJsonValue($typeProperty,'id');
		$data = $mysqli->query('SELECT * FROM `'.$typeProperty.'` WHERE `id`='.$idProperty)->fetch_assoc();
		if($data){
			$propertyPrice = GetPriceProperty($data['price']);
			$propertyPrice = $propertyPrice*0.75;
			SetFieldF($typeProperty,null);
			SetFieldF('dollar',$UserInfo['dollar']+$propertyPrice);
			$message = $Nick.', вы продали "'.GetJsonValue($typeProperty,'name').'" за '.ConvertValute($propertyPrice).'$.';
		}
	}else{
		$message = $Nick.', у вас нет "'.SwitchEnToRus($typeProperty).'", купите в магазине.';
	}
	return $message;
}
function GetPriceProperty($price){
	global $UserInfo;
	if(!empty($UserInfo['anonym'])){
		$anonym = SelectAnonym();
		$aBonuses = json_decode($anonym['bonuses'],1);
		$anonymProzent = $aBonuses['property_price_prozent']/100;
	}else{
		$anonymProzent = 0;
	}
	$price = $UserInfo['role'] >= 2 ? floor($price/2) : $price;
	$price = $price-$price*$anonymProzent;
	return $price;
}
?>