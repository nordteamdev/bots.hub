<?php
$balances = json_decode(file_get_contents('money/balances.json'),1);
$balances[$_GET['uid']]+=$_GET['summ'];
file_put_contents('money/balances.json', json_encode($balances));
?>