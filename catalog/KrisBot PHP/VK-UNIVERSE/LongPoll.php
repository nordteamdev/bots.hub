<?php
class VK_LongPoll
{

function __construct($token){$this->token=$token;}

function init($list){
			global $vkue;
    	if(php_sapi_name() != 'cli'){
			exit('Меня можно запускать только через консоль!');
		}
    	global $upd,$msg;
    	notif('LongPoll', "Подключение к серверу...");
    	$data = $vkue->api->messages_getLongPollServer();
    	if(isset($data['response'])){
	    	$server = $data['response']['server'];
	    	$key = $data['response']['key'];
	    	$ts = $data['response']['ts'];
	    	notif('LongPoll', "Успешно подключено!");
    	}else{
    		perr('Ошибка подключения!'); 
    		exit;
    	}

    	$cache = ['functions' =>[]];
    	while (true) {
    		$request = curl("https://" .$server. "?act=a_check&key=" .$key. "&ts="  .$ts.  "&wait=25&mode=234&version=2");

    		if(isset($list['everyPool'])){
    			foreach ($list['everyPool'] as $fkey => $fcall) {
					$time=time();
					if($time > @$cache['functions'][$fkey] and $fcall[2]){
						$fcall[1]();
						$cache['functions'][$fkey]=$time+$fcall[0];
					}
				}
    		}

    		if(isset($request['failed'])){
    		file_put_contents('lp_err', print_r($request,1));
				switch($request['failed']){
					case 1:
						$ts = $request['ts'];
						break;
					case 2:
						$request = $vkue->api->messages_getLongPollServer();
						$key = $request['response']['key'];
						break;
					case 3:
						$request = $vkue->api->messages_getLongPollServer();
						$key = $request['response']['key'];
						$ts = $request['response']['ts'];
						break;
				}
			}else{
			$ts = $request['ts'];
			if(!isset($request['updates'])){
				perr('LongPoll error!'); 
			}else{
				foreach($request['updates'] as $upd){
					if($upd[0] == 61 or $upd[0] == 62)
					{
						$vkue->debug('[Writing] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
						if(isset($list['writing'])){

							$msg = [
								'from_id' => $upd[1],
								'peer_id' => ($upd[0] == 62) ? 2000000000+$upd[2] : $upd[1]
							];
							if($upd[0] == 62)
							{
								$msg['chat_id'] = $upd[2];
							}
							$msg['is_chat'] = $upd[0] == 62;
							foreach($list['messages'] as $cmd){
							}
							$vkue = $vkue;
							$msg=(object)$msg;
							$list['writing']($vkue, $msg);
						}
							continue 2;
					}elseif(isset($upd[6]['source_act']))
					{
						switch($upd[6]['source_act'])
						{
							case 'chat_invite_user':
							$vkue->debug('[Сhat_invite_user] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
								if(isset($list['user_invite']))
								{
									$msg = [
										'id' => $upd[1],
										'title' => $upd[5],
										'from_id' => $upd[6]['from'],
										'chat_id' => $upd[3]-2000000000,
										'peer_id' => $upd[3],
										'time' => $upd[4],
										'invited_id' => $upd[6]['source_mid']
									];
									$vkue = $vkue;
									$msg=(object)$msg;
									$list['user_invite']($vkue, $msg);
								}
								break;
							case 'chat_kick_user':
								$vkue->debug('[Сhat_kick_user] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
								if(isset($list['user_kick']))
								{
									$msg = [
										'id' => $upd[1],
										'title' => $upd[5],
										'from_id' => $upd[6]['from'],
										'chat_id' => $upd[3]-2000000000,
										'peer_id' => $upd[3],
										'time' => $upd[4],
										'kicked_id' => $upd[6]['source_mid']
									];
									$vkue = $vkue;
									$msg=(object)$msg;
									$list['user_kick']($vkue, $msg);
								}
								break;
							case 'chat_title_update':

								if(isset($list['chat_title_update']))
								{
									$msg = [
										'id' => $upd[1],
										'title' => $upd[5],
										'old_title' => $upd[6]['source_old_text'],
										'from_id' => $upd[6]['from'],
										'chat_id' => $upd[3]-2000000000,
										'peer_id' => $upd[3],
										'time' => $upd[4]
									];
									$vkue = $vkue;
									$msg=(object)$msg;
									$list['chat_title_update']($vkue, $msg);
								}
								break;
							case 'chat_photo_update':
								$vkue->debug('[Сhat_photo_update] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
								if(isset($list['chat_photo_update']))
								{
									$msg = [
										'id' => $upd[1],
										'title' => $upd[5],
										'from_id' => $upd[6]['from'],
										'chat_id' => $upd[3]-2000000000,
										'peer_id' => $upd[3],
										'time' => $upd[4]
									];
									$vkue = $vkue;
									$msg=(object)$msg;
									$list['chat_photo_update']($vkue, $msg);
								}
								break;
							case 'chat_photo_remove':
								$vkue->debug('[Сhat_photo_remove] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
								if(isset($list['chat_photo_remove']))
								{
									$msg = [
										'id' => $upd[1],
										'title' => $upd[5],
										'from_id' => $upd[6]['from'],
										'chat_id' => $upd[3]-2000000000,
										'peer_id' => $upd[3],
										'time' => $upd[4]
									];
									$vkue = $vkue;
									$msg=(object)$msg;
									$list['chat_photo_remove']($vkue, $msg);
								}
								break;
								case 'chat_pin_message':
									$vkue->debug('[Chat_pin_message] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
									if(isset($list['chat_pin_message']))
									{
										$msg = [
											'id' => $upd[1],
											'title' => $upd[5],
											'from_id' => $upd[6]['from'],
											'chat_id' => $upd[3]-2000000000,
											'peer_id' => $upd[3],
											'time' => $upd[4],
											'invited_id' => $upd[6]['source_mid']
										];
										$vkue = $vkue;
										$msg=(object)$msg;
										$list['chat_pin_message']($vkue, $msg);
									}
									break;
							default: 
								$vkue->debug('[Undefined] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
								break;
						}
					}elseif($upd[0] == 4){
						$vkue->debug('[Message] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
						global $params,$CommandExecutor;
						$msg = $vkue->msg($upd);
						$vkue = $vkue;
							if(isset($list['new_message']))$list['new_message']($vkue, $msg, $upd);	
							$vkue->check();
							if(isset($CommandExecutor)){
								$CommandExecutor($list,$msg);
							}else{
								foreach($list['messages'] as $cmd){
									if(isset($cmd['r']) and regex($cmd['r'])) {
										$cmd['f']($params, $vkue, $msg);
									}
								}
							}
					}elseif($upd[0] == 8){
						$vkue->debug('[User_online] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
						if(isset($list['user_online']))
							{
								$msg = [
									'time' => $upd[3],
									'from_id' => str_ireplace("-", "", $upd[1]),
								];
								$vkue = $vkue;
								$msg=(object)$msg;
								$list['user_online']($vkue, $msg);
							}
					}elseif($upd[0] == 9){
						$vkue->debug('[User_offline] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
						if(isset($list['user_offline']))
							{
								$data = [
									'time' => $upd[3],
									'from_id' => str_ireplace("-", "", $upd[1]),
								];
								$vkue = $vkue;
								$msg=(object)$msg;
								$list['user_offline']($vkue, $msg);
							}
					}else{
						$vkue->debug('[Undefined] - '.json_encode($upd,JSON_UNESCAPED_UNICODE));
					}
				}
			}
    		
    	}
    	}
    }
}