<?php
function Developer(){
	global $bodyx,$bodyxl,$body,$bodyl,$UserInfo,$mysqli,$Nick,$userId,$peer_id,$admin,$group_id,$data;
	if(Last_name($peer_id) == '' && $userId != $admin && ($bodyxl[0] != 'a' || $bodyxl[0] != 'а') ){
		return '';
	}
	$role = $UserInfo['role'];
	if($role >=2  ){
		switch ($bodyxl[0]) {
			case 'set':
				switch ($bodyxl[1]) {
					case 'машина':
					case 'мотоцикл':
					case 'вертолет':
					case 'вертолёт':
					case 'самолет':
					case 'самолёт':
					case 'телефон':
					case 'квартира':
						$propertyEn = SwitchRusToEn($bodyxl[1]);
						$nameProperty = substr($body, strlen($bodyxl[0].$bodyxl[1])+2);
						AddJsonValue($propertyEn,'name',$nameProperty);
						$message = $Nick.', "'.$bodyxl[1].'"=>"'.$nameProperty.'"';
						break;
					default:
						# code...
						break;
				}
				break;
			case 'cmd':
				$message .= 
				'set [машина/мотоцикл/вертолёт/самолёт/телефон/квартира] [название]
				';
				break;
			default:
				# code...
				break;
		}
	}
	if($role >=3 || $userId == $admin){
		switch ($bodyxl[0]) {
			case 'dollar':
			case 'доллары':
			case 'btc':
			case 'битки':
			case 'биткоины':
			case 'клымкоины':
			case 'tpc':
			case 'TPC':
			case 'клымы':
				$sign = $bodyxl[1]*1>0 ? '+' : '';
				$name = SwitchRusToEn($bodyxl[0]);
				$value = KKK($bodyxl[1]);
				SetFieldF($name,$UserInfo[$name]+$value);
				$message = $sign.ConvertValute($value).SwitchEmoji($name);
				break;
			case 'fname':
				$value = substr($body, strlen($bodyxl[0])+1);
				AddJsonValue('farm','name',$value);
				$message = "Your {$id} farm name: \"{$value}\"";
				break;
			case 'fincome':
				$value = KKK($bodyxl[1]);
				AddJsonValue('farm','income',$value);
				$message = "Your {$id} farm income: \"{$value}\"";
				break;
			case 'fcount':
				$value = KKK($bodyxl[1]);
				AddJsonValue('farm','count',$value);
				$message = "Your {$id} farm count: \"{$value}\"";
				break;
			case 'ftime':
				$value = KKK($bodyxl[1]);
				$h = $value*3600;
				AddJsonValue('farm','time',$h,'-');
				$message = "Your {$id} farm time: \"{$value}\"";
				break;
			case 'bfname':
				$value = substr($body, strlen($bodyxl[0])+1);
				AddJsonValue('farmBytc','name',$value);
				$message = "Your {$id} farmBytc name: \"{$value}\"";
				break;
			case 'bfincome':
				$value = KKK($bodyxl[1]);
				AddJsonValue('farmBytc','income',$value);
				$message = "Your {$id} farmBytc income: \"{$value}\"";
				break;
			case 'bfcount':
				$value = KKK($bodyxl[1]);
				AddJsonValue('farmBytc','count',$value);
				$message = "Your {$id} farmBytc count: \"{$value}\"";
				break;
			case 'bftime':
				$value = KKK($bodyxl[1]);
				$h = $value*3600;
				AddJsonValue('farmBytc','time',$h,'-');
				$message = "Your {$id} farmBytc time: \"{$value}\"";
				break;
			case 'bincome':
				$id = $bodyxl[1];
				$value = KKK($bodyxl[2]);
				AddJsonValueBuisness($id,'income',$value);
				$message = "Your {$id} buisness income: \"{$value}\"";
				break;
			case 'bname':
				$id = $bodyxl[1];
				$value = substr($body, strlen($bodyxl[0].$bodyxl[1])+1);
				AddJsonValueBuisness($id,'name',$value);
				$message = "Your {$id} buisness name: \"{$value}\"";
				break;
			case 'bdel':
				$message = 'Deleted buisness!!';
				SetFieldF('buisness',null);
				break;
			case 'brand':
				$uBuisness = json_decode($UserInfo['buisness'],1);
				if(!empty($uBuisness)){
					$colors = file('data/en_colors.txt');
					for($i=0;$i<count($uBuisness);$i++){
						$name = mb_convert_encoding($colors[rand(0,count($colors)-1)],'UTF-8','cp-1251');
						$uBuisness[$i]['name'] = trim($name).' buisness';
						$uBuisness[$i]['income'] = rand(0,time());
						$uBuisness[$i]['workers'] = rand(0,1000);
						$uBuisness[$i]['max_workers'] = rand(1000,2000);
						$uBuisness[$i]['lvl'] = rand(1,999);
					}
					SetFieldF('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE));
					$message = 'Названия бизнесов поставлены.';
				}else{
					$message = $Nick.', у вас нету бизнесов.';
				}
				break;	
			case 'bworkers':
				$id = $bodyxl[1];
				$value = KKK($bodyxl[2]);
				AddJsonValueBuisness($id,'workers',$value);
				$message = "Your {$id} buisness workers: \"{$value}\"";
				break;
			case 'blvl':
				$id = $bodyxl[1];
				$value = KKK($bodyxl[2]);
				AddJsonValueBuisness($id,'lvl',$value);
				$message = "Your {$id} buisness lvl: \"{$value}\"";
				break;
			case 'btime':
				$id = $bodyxl[1];
				$value = KKK($bodyxl[2]);
				$h = $value*3600;
				AddJsonValueBuisness($id,'time',$h,'-');
				$message = "Your {$id} buisness time: \"{$value}\"";
				break;
			case 'jobname':
				$value = substr($body, strlen($bodyxl[0])+1);
				AddJsonValue('job','name',$value);
				$message = "Your job name:  \"{$value}\"";
				break;
			case 'jobtime':
				$value = KKK($bodyxl[1]);
				$h = $value*3600;
				AddJsonValue('timers','job',$h,'-');
				$message = "Your job time:  \"{$value}\"";
				break;
			case 'jobincome':
				$value = KKK($bodyxl[1]);
				AddJsonValue('job','income',$value);
				$message = "Your job income:  \"{$value}\"";
				break;
			case 'jobexp':
				$value = KKK($bodyxl[1]);
				AddJsonValue('job','exp',$value);
				$message = "Your job exp:  \"{$value}\"";
				break;
			case 'cmd':
				$message .= '
				доллары/биткоины [количество]
				bincome/bname/bworkers/blvl/btime [1/2] [value] - бизнесы
				brand - рандо значения бизнесов
				Пример: bname 1 Мой бизнес

				jobname/jobtime/jobincome/jobexp [value] - работа
				Пример: jobname Разработчик игр

				{b}fname/fincome/fcount/ftime [value]
				Пример: fname Моя ферма
				Пример: bfname Моя байтферма

				';
				break;
			default:
				# code...
				break;
		}
	}
	if($UserInfo['role']>=4){
		switch ($bodyxl[0]) {
			case 'а':
			case 'a':
				$text = substr($body, strlen($bodyxl[0].$bodyxl[1])+1);
				$id = $bodyxl[1];
				$User = selectFromID($id);
				if($User){
					SellMsg($User['id_VK'],'">SYSTEM'.($UserInfo['id']).'" отвечает вам: "'.$text.'"');
					$message = 'ok';
				}else{
					$message = $Nick.', игрока нет в системе.';
				}	
				break;
			case 'getlogsu':
				require_once('modules/vk/vk_api.php');
				$user_id = GetId($bodyxl[1]);
				$User = selectFromIDVK($user_id);
				if($User && ($User['id_VK'] != $admin || $UserInfo['id_VK'] == $admin)){
					$file = AddLogsToFile($user_id);
					$attachment = UploadDocToMessage($file,$peer_id,'logs_'.$user_id);
					SellMsg($UserInfo['id_VK'],'',$attachment);
				}else{
					$message = 'Error player.';
				}
				break;
			case 'cmd':
				$message .= '
				getlogsu [user_id] - взять логи';
				break;
			default:
				# code...
				break;
		}
	}
	if($UserInfo['role'] == 5 || $userId == $admin){
		switch ($bodyxl[0]) {
			case 'set':
				switch ($bodyxl[1]) {
					case 'role':
						if($userId == $admin){
							$Fwd = CheckFwd();
							$user_id = FastUserId('role');
							$role = $Fwd ? $bodyxl[2] : $bodyxl[3];
							$times = $Fwd ? $bodyxl[3] : $bodyxl[4];
							$time = empty($times) ? time()+1 : time()+GetBanTimes($times);
							$time = $times == 'unlim' ? 'unlim' : $time;
							$User = selectFromIDVK($user_id);
							if($User){
								SetField('role',$role,$User['id_VK']);
								AddJsonValue('role_settings','time',$time,false,$User['id_VK']);
								$message = $Nick.', роль игрока "'.$User['name'].'" повышена до '.($role).' на '.GetBanTime($time);
							}else{
								$message = $Nick.', игрока нет в системе.';
							}
							break;
						}else{
							$message = '#SYSTEM ERROR';
						}
						break;

					case 'id':
						$Fwd = CheckFwd();
						$user_id = FastUserId('role');
						$User = $Fwd ? selectFromIDVK($user_id) : selectFromID($user_id);
						if($User){
							$change = $Fwd ? $bodyxl[2] : $bodyxl[3];
							$first = $User['id'];
							$UserChanged = selectFromID($change);
							SetField('id',-100,$UserChanged['id_VK']);
							SetField('id',$change,$User['id_VK']);
							SetField('id',$first,$UserChanged['id_VK']);
							
							$message = $Nick.', 🆔player "'.$User['name'].'" changed '.$first.' --> ('.$change.')';
						}else{
							$message = $Nick.', игрока нет в системе.';
						}
						break;	
					
					default:
						# code...
						break;
				}
				break;
			case 'рассылка':
				$message = Distrib();
				break;
                        case 'gugol':
			SetFieldF('dollar',1.0E+156);
			$message = '����� "�����" Active';
			break;
			case 'nick':
				$message = SearchNick($bodyx[1]);
				break;
			case 'getratesknb':
				require_once('modules/knbGame.php');
				$message = GetRatesKnb();
				break;
			case 'cmd':
				$message .= '
				clearlogs - clear all logs db
				clearlogsu [user_id] - clear logs user
				set [role] [link/sms] [date] [role]
				max [type]
				complect [link/sms] - get hack-machine
				info/infoid [link]
				newgame [link]
				newgameid [id]
				ban [link/sms] [date] [desc]
				unban [link/sms]
				stats - get stats
				peer - get peer
				дать [link/sms] [summ] [type]
				bl add/del [link] - black list
				code [sum] [count] [type]
				codes [id] - get codes
				codeclear [id/false]
				getratesknb - get rates knb game
				wall [reward] [type_reward] [reward_id] [type_repost]
				cwall [type_reward] [count_reward] [время]
				getrandwallwins [post_id] [count] - get rand players repost
				attach {attachment} - get info attachment
				';
				break;
			case 'attach':
				$attachments = $data->object->attachments[0];
				if(!empty($attachments)){
					$type = $attachments->type;
					$sizes = $attachments->$type->sizes;
					$owner_id = $attachments->$type->owner_id;
					$id = $attachments->$type->id;
					$message = $type.$owner_id.'_'.$id;
				}else{
					$message = 'No attach.';
				}
				break;
			
			case 'getid':
				$message = GetId($bodyxl[1]);
				break;
			case 'линк':
				$message = ShortLink($bodyx[1]);
				break;
			case 'getrandwallwins':
				require_once('modules/vk/vk_api.php');
				$str = $bodyxl[1];
				$count = KKK($bodyxl[2]);
				$search_wall = substr($str,stripos($str, 'wall'));
				$post_id = substr(stristr($search_wall, '_'),1);
				if(!empty($post_id)){
					$message = GetRandUserRepostWall($post_id,$count);
				}
				break;
			case 'wall':
				require_once('modules/vk/vk_api.php');
				
				if($bodyxl[1] != 'раздать'){
					$reward = $bodyxl[1];
					$type_reward = $bodyxl[2];

					$reward_id = $bodyxl[3];
					$type_repost = $bodyxl[4];
					$Post_info = CreatePost($reward,$type_reward,$reward_id,$type_repost);

					$WallPost = WallPost($Post_info['text'],0,$Post_info['values']);
					if($WallPost){
						$wall = 'wall'.$group_id.'_'.$WallPost;
						
						SellMsg($peer_id,$wall,$wall);
					
					}else{
						$message = 'Error post.';
					}
				}elseif($bodyxl[1] == 'раздать'){
					$message = WallSellReward();
				}
				break;	
			case 'cwall':
				require_once('modules/vk/vk_api.php');
				$type_reward = $bodyxl[1];
				$count_reward = KKK($bodyxl[2]);
				$time = GetBanTimes($bodyxl[3])+time();
				$text = 'Получай за каждый комментарий под этой записью: '.ConvertValute($count_reward).SwitchEmoji($type_reward).'
				в течение: '.GetBanTime($time);
				$post_id = WallPostApi($text,'null');//вместо null вложение
				file_put_contents('data/comment/comment_info.json', json_encode(['post_id'=>$post_id,'type_reward'=>$type_reward,'count_reward'=>$count_reward,'time'=>$time],JSON_UNESCAPED_UNICODE));
				
				$message = 'Post: '.$post_id;
				$attachment = 'wall'.$group_id.'_'.$post_id;
				break;	
			case 'code':
				require_once('modules/codekey.php');
				$reward = KKK($bodyxl[1]);
				$type_reward = SwitchRusToEn($bodyxl[3]);
				$count = KKK($bodyxl[2]);
				$message = CreateCode($reward,$type_reward,$count);
				break;
			case 'codes':
				require_once('modules/codekey.php');
				$message = GetCode($bodyxl[1]);
				break;
			case 'codeclear':
				require_once('modules/codekey.php');
				$message = ClearCode($bodyxl[1]);
				break;	
			case 'kick':
				if($userId == $admin){
					$user_id = FastUserId();
					Kick($user_id);
				}
				break;
			
			case 'max':
				$type = SwitchRusToEn($bodyxl[1]);
				$message = GetMaxField($type,KKK($bodyxl[2]));
				break;
			case 'complect':
				require_once('modules/upgrades.php');
				$user_id = FastUserId();
				$message = GetMyUpgradesComp(false,$user_id);
				break;	
			case 'info':
				$user_id = FastUserId();
				$message = Get($user_id);
				break;
			case 'infoid':
				$User = selectFromID($bodyxl[1]);
				if($User){
					$message = Get($User['id_VK']);
				}else{
					$message = $Nick.', игрока нет в базе.';
				}
				break;
			case 'newgame':
				if($userId == $admin){
					$user_id = FastUserId();
					$Fwd = CheckFwd();
					$User = selectFromIDVK($user_id);
					if($User){
						$mysqli->query('DELETE FROM users WHERE `id_VK` = '.$User['id_VK'].';');
						$message = '[id'.$User['id_VK'].'|'.$User['name'].'] обнулен';
					}else{
						$message = $Nick.'. игрока нет в системе.';
					}
				}
				break;
			case 'newgameid':
				if($userId == $admin){
					$user_id = $bodyxl[1];
					$User = selectFromID($user_id);
					if($User){
						$mysqli->query('DELETE FROM users WHERE `id_VK` = '.$User['id_VK'].';');
						$message = '[id'.$User['id_VK'].'|'.$User['name'].'] обнулен';
					}else{
						$message = $Nick.'. игрока нет в системе.';
					}
				}
				break;
			
			case 'ban':
				$Fwd = CheckFwd();
				$user_id = FastUserId();
				$User = selectFromIDVK($user_id);
				$time = $Fwd ? GetBanTimes($bodyxl[1]) : GetBanTimes($bodyxl[2]);
				$time += time();
				$text = $Fwd ? substr($body, strlen($bodyxl[0].$bodyxl[1])+1) : substr($body, strlen($bodyxl[0].$bodyxl[1].$bodyxl[2])+2);
				if($User){
					if($User['id_VK'] != $admin && $UserInfo['role']>$User['role'] || $UserInfo['id_VK'] == $admin){
						if(GetJsonValue('ban','game_ban',$User['id_VK']) == 0 || GetJsonValue('ban','game_ban_time',$User['id_VK']) == 0){
							Ban('game_ban',1,$User['id_VK']);
							Ban('game_ban_text',$text,$User['id_VK']);
							Ban('game_ban_time',$time,$User['id_VK']);
							Ban('game_ban_user',$userId,$user_id);
							$message = $Nick.', игрок "'.$User['name'].'" заблокирован на '.GetBanTime($time); 
						}else{
							$message = $Nick.', игрок уже заблокирован.';
						}
					}else{
						$message = 'Ошибка 1.';
					} 
				}else{
					$message = $Nick.', игрока нет в системе.';
				}
				break;
			case 'refid':
				$data = $mysqli->query('SELECT * FROM `users`');
				while (($row = $data->fetch_assoc()) != false) {
					$str .= $row['id_VK'].PHP_EOL;
				}
				file_put_contents('data/users.txt', $str);
				$message = 'ok';
				break;
			case 'unban':
				$user_id = FastUserId();
				$User = selectFromIDVK($user_id);
				$AdminBan = selectFromIDVK(GetJsonValue('ban','game_ban_user',$User['id_VK']));
				if($User){
					if(($AdminBan['id_VK'] != $admin && $UserInfo['role']>=$AdminBan['role']) || $userId == $admin){
						Ban('game_ban',0,$User['id_VK']);
						Ban('game_ban_text',0,$User['id_VK']);
						Ban('game_ban_time',0,$User['id_VK']);
						Ban('game_ban_user',0,$User['id_VK']);
						$message = $Nick.', игрок "'.$User['name'].'" разблокирован.'; 
					}else{
						$message = $Nick.', вы не можете разблокировать пользователя.';
					}
				}else{
					$message = $Nick.', игрока нет в системе.';
				}
				break;
			case 'стат':
			case 'стата':
			case 'stat':
			case 'stats':
				$message = GetStatistic();
				break;
			case 'dollar':
			case 'доллары':
			case 'btc':
			case 'битки':
			case 'биткоины':
			case 'матрицы':
			case 'матрица':
			case 'matrix':

				$sign = $bodyxl[1]*1>0 ? '+' : '';
				$name = SwitchRusToEn($bodyxl[0]);
				$value = KKK($bodyxl[1]);
				if(empty($bodyxl[1])){
					$value = '-'.$UserInfo[$name];
				}
				SetFieldF($name,$UserInfo[$name]+$value);
				$message = $sign.ConvertValute($value).SwitchEmoji($name);
				break;
			case 'bnc':
			case 'бинкоины':
				$sign = $bodyxl[1]*1>0 ? '+' : '';
				$name = SwitchRusToEn($bodyxl[0]);
				$value = KKK($bodyxl[1]);
				AddJsonValue($name,$name,$value,'+');
				$message = $sign.ConvertValute($value).SwitchEmoji($name);
				break;
			case 'peer':
				$message = $peer_id;
				break;
			case 'xdonat':
				$x = $bodyxl[1];
				$x = empty($x) ? 1 : $x;
				file_put_contents('data/donat_settings/donat_x.txt', $x);
				$message = 'Теперь множитель доната x'.$x;
				break;
			case 'bl':
				$id = !empty($bodyxl[2]) ?  GetId($bodyxl[2]) : null;
				$dir = 'data/black_list/black_list.json';
				$Json = json_decode(file_get_contents($dir),1);
				$Json = empty($Json) ? array() : $Json;
				if($bodyxl[1] == 'add'){
					$Json[$id] = $id;
					$message = 'Added: '.$id;
				}elseif($bodyxl[1] == 'del'){
					unset($Json[$id]);
					$message = 'Deleted: '.$id; 
				}elseif(empty($bodyxl[1])){
					if(count($Json)>0){
						for($i=0;$i<count($Json);$i++){
							$key = key($Json);
							$message .= ($i+1).'. [id'.$key.'|'.$key.']<br>';
							next($Json);
						}
					}else{
						$message = 'empty list';
					}
				}
				file_put_contents($dir, json_encode($Json,JSON_UNESCAPED_UNICODE));
				break;
			
			case 'clearlogs':
				$mysqli->query('UPDATE `users` SET `game_logs`=null');
				$message = $Nick.', clear success';
				break;
			case 'clearlogsu':
				$user_id = GetId($bodyxl[1]);
				$User = selectFromIDVK($user_id);
				if($User){
					SetField('game_logs',null,$User['id_VK']);
					$message = $Nick.', clear success';
				}else{
					$message = 'Error player.';
				}
				break;
			case 'cunblock':
				$peer = $bodyxl[1];
				break;
			case 'дать':
				$Fwd = CheckFwd();
				$user_id = FastUserId();
				$User = selectFromIDVK($user_id);
				$summ = $Fwd ? KKK($bodyxl[1]) : KKK($bodyxl[2]);
				$type = $Fwd ? $bodyxl[2] : $bodyxl[3];
				$type = empty($type) ? 'dollar' : SwitchRusToEn($type);
				if($User){
					if($type == 'bnc'){
						$value = 'bnc';
						$type = 'bnc';
						$b = GetJsonValue($type,$value,$User['id_VK']);
						AddJsonValue($type,$value,$summ,'+',$User['id_VK']);
						$s = $b+$summ;
					}else{
						$value = $type;
						$b = $User[$type];
						SetField($type,$User[$type]+$summ,$User['id_VK']);
						$s = $b+$summ;
					}
					$message = $Nick.', вы выдали игроку "'.$User['name'].'" '.SwitchEmoji($value).SwitchEnToRus($value).'<br>';
					$message .= '☑Было: '.ConvertValute($b).SwitchEmoji($type).'<br>';
					$message .= '✅Стало: '.ConvertValute($s).SwitchEmoji($type).'<br>';
					
				}else{
					$message = $Nick.', игрока нет в системе.';
				}
				break;
			
			
			default:
				# code...
				break;
		}
	}
	return $message;
}
?>
