<?php
set_time_limit(0);


$token = '5d5ef1d9383614d69d40d725fca4743f59da1435a23073d1f27b3efe4e5c579677204f378b5d2c3c0e85b';
$group_id = '-137112508';
require_once('../../index.php');
require_once('../../modules/vk/vk_api.php');
$dopToken = '7c70db1922be0cd9a19330d971422b61b360ad7b43ad4d2ac53d4279a7ca948b151c5b38c21e85a1775b8';

$post_id = sellRewardAndMakePost();

/****************************************************************Рассылка*/
$attachment = 'wall'.$group_id.'_'.$post_id;
$mysqli = new mysqli("localhost", "root", "adsjgm23f", "bot"); 
$mysqli->set_charset('utf8mb4');	

$repost_info = json_decode(file_get_contents('repost_info.json'),1);
$type_reward = $repost_info['type'];
$data = $mysqli->query('SELECT `name`,`id_VK` FROM `users` WHERE `notification`=1');
$players = 0;

while(($row = $data->fetch_assoc()) != false){
	$text = 'Те кто сделает репост этой записи через 6 часов выдадим: '.ConvertValute($repost_info['cost']).SwitchEmoji($type_reward);
	SellMsg($row['id_VK'],$text,$attachment);
	$players++;

}
$mysqli->close();

$conferences = 0;
$dir = '../../data/conference/conference.json';
$arr = json_decode(file_get_contents($dir),1);
$last_conference = max(array_keys($arr));
$last_conference += 500;

for($i=$last_conference; $i>2000000000; $i--){
	SellMsg($i,$text,$attachment);
	$conferences++;

}
echo 'Complete:<br>post_id: '.$post_id.'<br>Players: '.ConvertValute($players).'<br>Conferences: '.ConvertValute($conferences);
function sellRewardAndMakePost(){	
	
	$repost_info = json_decode(file_get_contents('repost_info.json'),1);
	if($repost_info['type_repost'] == 'wait'){
		$WallGetReposts = WallGetReposts($repost_info['post_id']);
		$mysqli = new mysqli("localhost", "root", "adsjgm23f", "bot");  
		$mysqli->set_charset('utf8mb4');
		for($i=0;$i<count($WallGetReposts);$i++){
			$userId = $WallGetReposts[$i];
			
			
			$UserInfo = $mysqli->query('SELECT * FROM `users` WHERE `id_VK`='.$userId)->fetch_assoc();
			if($UserInfo){
				if($UserInfo['post_id'] != $repost_info['post_id']){
					
					$mysqli->query('UPDATE `users` SET `post_id`='.$repost_info['post_id'].' WHERE `id_VK`='.$UserInfo['id_VK']);
					$type_reward = $repost_info['type'];
					$mysqli->query('UPDATE `users` SET `'.$type_reward.'`='.($UserInfo[$type_reward]+$repost_info['cost']).' WHERE `id_VK`='.$UserInfo['id_VK']);
					
					SellMsg($userId,'За репост ты получил: '.ConvertValute($repost_info['cost']).SwitchEmoji($type_reward));
				}
			}
			
		}
		$mysqli->close();
	}
	$type ='dollar';
	$cost = rand(1000000,30000000);
	$type_repost = 'wait';
	$message = 'Тем кто сделает репост через 6 часов выдадим: '.ConvertValute($cost).SwitchEmoji($type).'
	*Ваш профиль должен быть открыт в настройках приватности [⚠].
	*Вы должны быть подписаны на нас [⚠].
	Или бот не увидит ваш репост и не выдаст награду [⚠]';
	$WallPost = WallPost($message,'');
	if($WallPost['post_id'] != null){
		$arr = ['type'=>$type,'cost'=>$cost,'type_repost'=>$type_repost,'post_id'=>$WallPost['post_id']];
		$fpc = file_put_contents('repost_info.json', json_encode($arr,JSON_UNESCAPED_UNICODE));
		
		return $WallPost['post_id'];

	}else{
		return 'Ошибка.<br>'.$WallPost['error_msg'].'<br>Error_code.'.$WallPost['error_code'].'<br>Error_list: https://vk.com/dev/errors';
	}
	
}
?>