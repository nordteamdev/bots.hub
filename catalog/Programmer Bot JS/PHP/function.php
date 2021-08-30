<?php

function ban($userId) {
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['ban'] = true;
  @file_put_contents('players/'.$userId, serialize($array));
}

function unban($userId){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['ban'] = false;
  @file_put_contents('players/'.$userId, serialize($array));
}

function getDClient($userId){
  $data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	return $array['dclient'];
}

function getNClient($userId){
  $data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	return $array['nclient'];
}

function getComp($userId){
  $data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	return $array['comp'];
}

function newComp($userId, $comp){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['comp'] = $comp;
  @file_put_contents('players/'.$userId, serialize($array));
}

function addDClient($userId){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['dclient'] = $array['dclient'] + 1;
  @file_put_contents('players/'.$userId, serialize($array));
}

function addNClient($userId){
	$data = file_get_contents('players/'.$userId);
	$array = unserialize($data);
	$array['nclient'] = $array['nclient'] + 1;
  @file_put_contents('players/'.$userId, serialize($array));
}

function getTrends() {
	foreach(scandir('players/') as $array) {
		$file = file_get_contents('players/'.$array); 
    $data = unserialize($file);
    $id = $array;
    $topp[$id] = $data['money'];
  }
  arsort($topp);
  $p = [];
  $n = 0;
  foreach($topp as $id => $moneys) {
  	$n++;
    $p[$n]["id"] = $id;
    $p[$n]["money"] = $moneys;
  }
  $number = array("1" => "1⃣","2" => "2⃣","3" => "3⃣","4" => "4⃣","5" => "5⃣","6" => "6⃣","7" => "7⃣","8" => "8⃣","9" => "9⃣","10" => "🔟");
  $top = [];
  for($i = 1; $i < 11; $i++) {
  	$n = (String)$i; 
    $file = file_get_contents('players/'.$p[$i]["id"]); 
    $data = unserialize($file);
    $top[$i] = $number[$n]." [id".$p[$i]["id"]."|A]  — 👑 ".conv($p[$i]["money"]);
  }
  return $top;
}

?>