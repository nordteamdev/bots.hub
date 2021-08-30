<?php

function createAcc($peerId,$userId){
    if($userId > 0){
	$id = (int)file_get_contents('ids_users') + 1; 
   @file_put_contents('ids_users', $id); 
	$data = [
	  'name' => "Новый игрок", 
	  'click' => true, 
	  'balance' => 100000,
	  'botid' => $id,
	  'bonus' => 0,
     'rating' => 0,
	  'bank' => 0,
	  'time' => time(),
	  'report' => 0,
	  'car' => 0,
	  'house' => 0,
	  'mobile' => 0,
	  'computer' => 0,
	  'btc' => 0,
	  'inv' => 0,
	  'give' => 0, //скок игрок передал 
     'timegive' => 0, //когда можно будет передавать
     'limit' => 5000000000,
     'ref' => 0,
     'yacht' => 0,
     'vert' => 0,
     'biznesName' => 0, //название
     'biznecBalance' => 0,
     'biznesMoney' => 0, //доход
     'biznesTime' => 0, //time
     'biznesLevel' => 0, //уровень
     'biznesCount' => 0, //минимум людей
     'biznesMax' => 0, //максимум людей
     'ferm' => 0, //название
     'ferm1' => 0, //доход
     'ferm2' => 0, //time
     'ferm3' => 0, //count
     'exp' => 0,
     'energyTime' => 0,
     'energy' => 10,
     'iron' => 0,
     'zolot' => 0,
     'almaz' => 0
	];
	@file_put_contents('users/vk/'.$userId, serialize($data));
	$bot = ['vkid' => $userId];
	@file_put_contents('users/bot/'.$id, serialize($bot));
	sendMessage($peerId,$userId,"будем знакомы! Не забудь получить бонус, придумать уникальный ник и ввести рефералку!  Присоединяйся, у нас весело!");
}
}

function sendMessage($peerId,$userId,$message){
    $array = getProfile($userId); 
    $name = $array['name'];
    if($array['click'] == true){
      $data = "[id".$userId."|".$name."], ";
    }else{
     	$data = $name.", ";
    }
      $yess = urlencode($data.$message); 
      file_get_contents("https://api.vk.com/method/messages.send?random_id=".rand()."&peer_id=$peerId&message=$yess&payload=1000&access_token=0273cc5e384d2d37864673bf6a6f32e779b78e4fa2c212255366a278f85f9fc393925e7e98fef8b63d336&v=5.85");
}

function getImus($user_id,$data){
	switch($data){
		
		case "car":
		  return getProfile($user_id)['car'];
		break;
		
		case "house":
		  return getProfile($user_id)['house'];
		break;
		
		case "mobile":
		  return getProfile($user_id)['mobile'];
		break;
		
		case "computer":
		  return getProfile($user_id)['computer'];
		break;
	}
}

function convertValute($data){
    return number_format($data,0,",",".");
}

function sendReport($report,$userId){
    unset($report[0]);
    $report = implode(" ", $report);
    $report = "репорт от [id".$userId."|игрока]".PHP_EOL. "репорт: ".$report.PHP_EOL."ID в боте: ".getProfile($userId)['botid'];
    $report = urlencode($report); 
    $id = rand();
    file_get_contents("https://api.vk.com/method/messages.send?random_id=$id&user_ids=445747664,436837354&message=$report&payload=1000&access_token=0273cc5e384d2d37864673bf6a6f32e779b78e4fa2c212255366a278f85f9fc393925e7e98fef8b63d336&v=5.85");
}

function sendOtwet($message, $botId) {
   unset($message[0]);
   unset($message[1]);
   $message = implode(" ", $message);
   $request = "Пришел ответ на ваш репорт!".PHP_EOL.$message; 
   $request = urlencode($request); 
   $id = getBotId($botId); 
   file_get_contents("https://api.vk.com/method/messages.send?random_id=".rand()."&user_id=$id&message=$request&payload=1000&access_token=0273cc5e384d2d37864673bf6a6f32e779b78e4fa2c212255366a278f85f9fc393925e7e98fef8b63d336&v=5.85");
}

function getBotId($userId){
	$data = file_get_contents('users/bot/'.$userId); 
   $array = unserialize($data);
	return $array['vkid']; 
}

function getProfile($userId){
	$data = file_get_contents('users/vk/'.$userId);
	$array = unserialize($data);
	return $array;
}

function changeName($userId,$name) {
   $data = getProfile($userId);
   unset($data['name']);
   $data['name'] = $name;
   @file_put_contents('users/vk/'.$userId,serialize($data));
}

function changeReport($userId){
   $data = getProfile($userId);
   unset($data['report']);
   $data['report'] = time();
   @file_put_contents('users/vk/'.$userId,serialize($data));
}

function changeClick($userId,$click){
	 $data = getProfile($userId);
	 unset($data['click']);
	 $data['click'] = $click;
	 @file_put_contents('users/vk/'.$userId,serialize($data));
}

function getCitata(){
   $jsonurl = "https://api.forismatic.com/api/jsonp/";
   $json = file_get_contents($jsonurl); 
   $json_output = json_decode($json);
   return $json_output; 
}

function under($text) {
 $mass = [ 
 'а' => 'ɐ', 'б' => 'ƍ', 'в' => 'ʚ', 
 'г' => 'ɹ', 'д' => 'ɓ', 'е' => 'ǝ',
 'ё' => 'ǝ', 'ж' => 'ж', 'з' => 'ε', 
 'и' => 'и', 'й' => 'ņ', 'к' => 'ʞ', 
 'л' => 'v', 'м' => 'w', 'н' => 'н', 
 'о' => 'o', 'п' => 'u', 'р' => 'd', 
 'с' => 'ɔ', 'т' => 'ɯ', 'у' => 'ʎ', 
 'ф' => 'ф', 'х' => 'х', 'ц' => 'ǹ', 
 'ч' => 'Һ', 'ш' => 'm', 'щ' => 'm', 
 'ь' => 'q', 'ы' => 'ıq', 'ъ' => 'q_',
 'э' => 'є', 'ю' => 'oı', 'я' => 'ʁ'];
 $str = iconv('UTF-8','windows-1251', $text);
 $stroka = strrev($str);
 $str = iconv('windows-1251', 'UTF-8', $stroka);
 $out = strtr($str, $mass);
 
 return $out;
}


function addInv($userId) {
    $data = getProfile($userId);
	 $data['inv'] = $data['inv'] + 1;
	 @file_put_contents('users/vk/'.$userId,serialize($data));
}

function getTopRating(){
    foreach(scandir('users/vk/') as $array){
      $file = file_get_contents('users/vk/'.$array); 
      $data = unserialize($file);
      $id = getBotId($data['botid']); 
      $topp[$id] = $data['rating'];
    }

    arsort($topp);
    $p = [];
    $n = 0;

     foreach($topp as $id => $moneys){
      $n++;
      $p[$n]["id"] = $id;
      $p[$n]["money"] = $moneys;
     }

    $number = array("1" => "&#49;&#8419;","2" => "&#50;&#8419;","3" => "&#51;&#8419;","4" => "&#52;&#8419;","5" => "&#53;&#8419;","6" => "&#54;&#8419;","7" => "&#55;&#8419;","8" => "&#56;&#8419;","9" => "&#57;&#8419;","10" => "&#128287;");
    $top = [];
    for($i = 1; $i < 11; $i++){
     $n = (String)$i; 
     $top[$i] = $number[$n]." [id".$p[$i]["id"]."|".getProfile($p[$i]["id"])['name']."]  — &#128142;".convertValute($p[$i]["money"])." | ₽".convertValute(getProfile($p[$i]["id"])['balance']);
    }
    return $top;
     }
   
function getMyTop($id,$top){
 $count = count($top)-1;
 for($i=0;$i<$count;$i++){
  if($top[$i]["id"] == $id){
   return $i+1;
  }
 }
}

?>