<?php
require_once('../index.php');
$mysqli = new mysqli("localhost", "root", "riconc1020", "bot"); 
$mysqli->set_charset('utf8mb4');
$distrib = $mysqli->query('SELECT * FROM `distrib` WHERE `status`=0')->fetch_assoc();


if(!$distrib){
	$mysqli->close();
	return 'Null distrib';
	
}


$message = $distrib['text'].'<br>Для того чтобы отписаться от рассылки 🌀 
Напишите Уведомления выкл 🔥';
$attachment = $distrib['attachment'];

$mysqli->query('DELETE FROM `distrib` WHERE `distrib`.`id` ='.$distrib['id']);


$data = $mysqli->query('SELECT * FROM `users` WHERE `notification`=1');
while(($row = $data->fetch_assoc()) != false){
	SellMsg($row['id_VK'],$row['name'].','.$message,$attachment);
}
$dir = '../data/conference/conference.json';
$arr = json_decode(file_get_contents($dir),1);
$last_conference = max(array_keys($arr));

for($i=$last_conference+50; $i>2000000000;$i--){
	SellMsg($i,$message,$attachment);

}

$mysqli->close();
?>