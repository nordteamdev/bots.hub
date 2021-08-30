<?php
require_once '../functions.php';
$owner_id = 137112508;
$token = 'c954b7ac16e7d17f6edd82fab33ff8da3a97e026063e9a1d2a84822ac87af7da6391571e8ac614f463e87';
$mysqli = new mysqli("localhost", "root", "riconc1020", "bot"); 
$mysqli->set_charset('utf8mb4');


$online = $mysqli->query('SELECT * FROM `users` WHERE `online_time`>='.(time()-30))->num_rows;
$donate_balance = $mysqli->query("SELECT SUM(`donate_balance`) FROM `users` WHERE `users`.`role`<=3")->fetch_assoc()['SUM(`donate_balance`)'];
$players = $mysqli->query('SELECT * FROM `users`')->num_rows;
$mysqli->close();
$text = "🤑Выведено денег: 7 👥Игроков:".ConvertValute($players)." 👾Сумма матриц:".ConvertValute($donate_balance)." 👥 Онлайн:".ConvertValute($online);

$StatusSet = api('status.set?group_id='.$owner_id.'&text='.urlencode($text).'&v=5.90&access_token='.$token);
echo $StatusSet;

?>