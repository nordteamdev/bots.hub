<?php
require_once '../index.php';



$dir = '../games/knb/knb.txt';
$dirGame = '../games/knb/knbProcess.json';
$time = file_get_contents($dir);
if(date('l') == 'Monday'){ // время вышло и день недели - понедельник
	$time = time()+(3600*24*5);
	file_put_contents($dir, $time);
	file_put_contents($dirGame, json_encode(array(),JSON_UNESCAPED_UNICODE));
	SellMsg($admin,'>SYSTEM KNB RUNNING');
	echo 'KNB RUNNING.';
}
?>