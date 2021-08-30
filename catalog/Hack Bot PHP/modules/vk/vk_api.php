<?php
function AddLogsToFile($user_id){
	$UserInfo = selectFromIDVK($user_id);
	$fileName = 'data/docs/'.'id'.$UserInfo['id_VK'].'.txt';
	$logs = $UserInfo['game_logs'];
	if(!empty($logs)){
		file_put_contents($fileName, str_replace('/end', '
',$logs ));
	return $fileName;
}else{
	return false;
}
	
}

function WallSellReward(){
	global $group_id;
	$token = '169638042faeacefe3c461e3e8311a2d897bcb87246196422a2c777ecba66313dec090e219b514b9e21c1'; 
	
	$message = '';
	
	$dir = 'data/repost/wall_info.json';
	$wall_info = json_decode(file_get_contents($dir),1);
	$post_id = $wall_info['post_id'];

	$wallGetReposts = api('wall.getReposts?owner_id='.$group_id.'&post_id='.$post_id.'&count=1000&v=5.92&access_token='.$token);
	$countProfiles = count($wallGetReposts['profiles']);
	$j = 0;
	for($i=0;$i<$countProfiles;$i++){
		Repost($wallGetReposts['items'][$i]['from_id']);
		$j++;
	}
	if($j>0){
		return $j.' members';
	}else{
		return 'empty';
	}
	
}
function GetRandUserRepostWall($post_id,$count = false){
	global $group_id;
	$token = '169638042faeacefe3c461e3e8311a2d897bcb87246196422a2c777ecba66313dec090e219b514b9e21c1'; 
	$message = '';
	$count = empty($count) ? 1 : $count;

	$wallGetReposts = api('wall.getReposts?owner_id='.$group_id.'&post_id='.$post_id.'&count=1000&v=5.92&access_token='.$token);

	$countProfiles = count($wallGetReposts['profiles']);
	if($countProfiles >= $count){
		$arrayIds = array();
		for($i=0;$i<$countProfiles;$i++){
			$id = $wallGetReposts['items'][$i]['from_id'];
			$j++;
			array_push($arrayIds, $id);
		}
		$j = 0;
		for($i=1;$i<=$count;$i++){
			$key = rand(0,count($arrayIds)-1);
			$UserId = $arrayIds[$key];
			$User = selectFromIDVK($UserId);
			if($User){
				$message .= $UserId.'<br>';
			}else{
				$message .= 'no<br>';
			}
			$key = array_search($UserId, $arrayIds);
			unset($arrayIds[$key]);
			$j++;
		}
		if($j>0){
			return $message;
		}else{
			return 'empty';
		}
	}else{
		return 'Error count';
	}
	
}	
function UploadDocToMessage($file,$peer_id,$nameDoc){
	global $token;
	$getMessagesUploadServer = api('docs.getMessagesUploadServer?type=doc&peer_id='.$peer_id.'&v=5.92&access_token='.$token)['upload_url'];
	$ch = curl_init();
	if(!file_exists($file)){
		return false;
	}
	curl_setopt($ch, CURLOPT_URL, $getMessagesUploadServer);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, ['file' => new CurlFile($file)]);
	$response = curl_exec($ch);
	$response = json_decode($response,true);
	curl_close($ch);
	$docsSave = api('docs.save?file='.$response['file'].'&title='.$nameDoc.'&v=5.92&access_token='.$token);
	$type = $docsSave['type'];
	unlink($file);
	return $type.$docsSave[$type]['owner_id'].'_'.$docsSave[$type]['id'];

}

function WallPost($message,$attachment,$values = false){
	global $group_id;
	$token = '169638042faeacefe3c461e3e8311a2d897bcb87246196422a2c777ecba66313dec090e219b514b9e21c1'; 
	$dir = 'data/repost/wall_info.json';
	$wall_info = json_decode(file_get_contents($dir),1);
	$wall_info = empty($wall_info) ? array() : $wall_info;
	$last_wall_id = $wall_info['post_id'];

	$wall_delete = api('wall.delete?owner_id='.$group_id.'&post_id='.$last_wall_id.'&v=5.92&access_token='.$token); // delete last wall

	$wall_post = api('wall.post?owner_id='.$group_id.'&friends_only=0&attachments='.$attachment.'&from_group=1&message='.urlencode($message).'&signed=0&mark_as_ads=0&close_comments=0&v=5.92&access_token='.$token); // create new post
	
	$wall_info['post_id'] = $wall_post['post_id']; // new post id
	$wall_info['reward'] = $values['reward'];
	$wall_info['reward_id'] = $values['reward_id'];
	$wall_info['type_repost'] = $values['type_repost'];
	$wall_info['type_reward'] = empty($values['type_reward']) ? 'dollar' : $values['type_reward'];
	file_put_contents($dir, json_encode($wall_info,JSON_UNESCAPED_UNICODE));
	return $wall_post['post_id'];
}
?>
