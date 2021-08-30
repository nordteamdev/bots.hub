<?php

include("FreeKassa.php");

$shop_id = 121417;
$shop_key = 'ezn3cp92';

$fk = new FreeKassa($shop_id,$shop_key);

$user_id = $_POST['username'];
$sell_id = $_POST['selid'];

switch($sell_id){

	case '1':
	$summa = 8;
	break;

	case '2':
	$summa = 12;
	break;

	case '3':
	$summa = 22;
	break;

	case '4':
	$summa = 90;
	break;

	case '5':
	$summa = 100;
	break;

	case '6':
	$summa = 300;
	break;

	case '7':
	$summa = 800;
	break;

}

$url = $fk->buildPayUrl($summa,$user_id,$sell_id);

header("Location: ".$url);
