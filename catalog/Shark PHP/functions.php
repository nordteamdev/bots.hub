<?php
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//

function SearchDoc($q){
	global $token;
	$docs_search = api('docs.search?q='.urlencode($q).'&search_own=0&count=50&v=5.87&access_token='.$token);
	for($i=0;$i<10;$i++){
		$rand = rand(0,49);
		$attach .= 'doc'.$docs_search['items'][$rand]['owner_id'].'_'.$docs_search['items'][$rand]['id'].',';
	}
	return substr($attach, 0,iconv_strlen($attach)-1);
}
function SearchVideo($q){
	$token = 'token';
	$video_search = api('video.search?q='.urlencode($q).'&adult=0&search_own=0&count=50&extended=0&v=5.87&access_token='.$token);
	for($i=0;$i<10;$i++){
		$rand = rand(0,49);
		$attach .= 'video'.$video_search['items'][$rand]['owner_id'].'_'.$video_search['items'][$rand]['id'].',';

	}
	return substr($attach, 0,iconv_strlen($attach)-1);
}
function SetActiveDay(){
	$str = '';
	$str.= date('d.m.Y').', ';
	$date_H = date('H');
	if ($date_H > 24){
		$date_H = abs(0 .(24-$date_H));
	}
	$str .= ($date_H).":".date('i:s');
	SetFieldF('active_day',$str);
}

function ActiveSkills(){
	global $UserInfo;
	$UserSkills = json_decode($UserInfo['skills'],1);
	if(!empty($UserSkills['skills'])){
		if(in_array('auto_farm',$UserSkills['skills'])){
			FarmAssembleTPC();
			FarmAssemble();
		}
		if(in_array('auto_buisness',$UserSkills['skills'])){
			BuisnessAssemble();
		}
	}
}
function AddCompleteTask($id,$count){
	global $UserInfo;
	$array = $UserInfo['tasks'];
	$array = json_decode($array,1);
	for($i=0;$i<=5;$i++){
		if($array['every_day_tasks'][$i]['id'] == $id){
			$array['every_day_tasks'][$i]['complete']+=$count;	
			SetField('tasks',json_encode($array),$UserInfo['id_VK']);
			$d = 1;
		}
	}
	if($d != 1){return;}
}
function BuyUpgradeFarm($num){
	global $UserInfo,$Nick,$mysqli;
	if(!empty($UserInfo['id_farm'])){
		$Info = GetPriceLvlPlusFarm($num);
		if($Info == false){
			return $Nick.', неверный номер';
		}
		$price = $Info[0];
		$maxLvl = $Info[2];
		$type = $Info[3];
		if($UserInfo[$type] < $maxLvl){
			if($UserInfo['BTC'] >= $price){
				SetFieldF($type,$UserInfo[$type]+1);
				SetFieldF('BTC',$UserInfo['BTC']-$price);
				$message = $Nick.', вы купили улучшение за: '.ConvertValute($price).'BTC';
			}else{
				$message = $Nick.', недостаточно биткоинов.';
			}
		}else{
			$message = $Nick.', у вас максимальный уровень этого улучшения.';
		}
	}else{
		$message = $Nick.', у вас нет ферм';
	}
	return $message;
}
function FarmMenu(){
	global $UserInfo,$Nick,$mysqli;
	if(!empty($UserInfo['id_farm'])){
		$FarmInfo = $mysqli->query("SELECT * FROM `farm` WHERE `id`=".$UserInfo['id_farm']);
		$FarmInfo = $FarmInfo->fetch_assoc();
		
		$graphics_cardLvl =  $UserInfo['graphics_card'];
		$ramLvl =  $UserInfo['ram'];
		$block_powerLvl =  $UserInfo['block_power'];
		$motherboardLvl =  $UserInfo['motherboard'];
		$cpuLvl =  $UserInfo['cpu'];
		
		$Production = $FarmInfo['production']*$UserInfo['count_farm'];
		$graphics_card = GetPlusFarm(1,$Production,$graphics_cardLvl);
		$motherboard = GetPlusFarm(2,$Production,$motherboardLvl);
		$block_power = GetPlusFarm(3,$Production,$block_powerLvl);
		$cpu = GetPlusFarm(4,$Production,$cpuLvl);
		$ram = GetPlusFarm(5,$Production,$ramLvl);
		
		$message = $Nick.', состояние ваших ферм:<br>'.
		'📟Доп. видеокарта: +'.ConvertValute($graphics_card).'btc LVL'.ConvertNumberEmoji($graphics_cardLvl).'<br>'.
		'🎛Материнская плата: +'.ConvertValute($motherboard).'btc LVL'.ConvertNumberEmoji($motherboardLvl).'<br>'.
		'🔌Блок питания: +'.ConvertValute($block_power).'btc LVL'.ConvertNumberEmoji($block_powerLvl).'<br>'.
		'🕯Процессор: +'.ConvertValute($cpu).'btc LVL'.ConvertNumberEmoji($cpuLvl).'<br>'.
		'📻Оперативная память: +'.ConvertValute($ram).'btc LVL'.ConvertNumberEmoji($ramLvl).'<br>'.
		'📊Суммарный плюс с '.$UserInfo['count_farm'].' ферм: '.ConvertValute(GetSummFarm()).'btc'.
		'<br>Для того чтобы улучшить ферму напишите "ферма улучшить [номер]"<br>'.
		'Для того чтобы собрать биткоины напишите "ферма собрать"';
		
	}else{
		$message = $Nick.', у вас нет ферм.';
	}
	return $message;
}
function GetSummFarm(){
	global $UserInfo,$mysqli;
	$FarmInfo = $mysqli->query("SELECT * FROM `farm` WHERE `id`=".$UserInfo['id_farm']);
	$FarmInfo = $FarmInfo->fetch_assoc();
	$graphics_cardLvl =  $UserInfo['graphics_card'];
	
	$ramLvl =  $UserInfo['ram'];
	$block_powerLvl =  $UserInfo['block_power'];
	$motherboardLvl =  $UserInfo['motherboard'];
	$cpuLvl =  $UserInfo['cpu'];
	
	$Production = $FarmInfo['production']*$UserInfo['count_farm'];
	$graphics_card = GetPlusFarm(1,$Production,$graphics_cardLvl);
	$motherboard = GetPlusFarm(2,$Production,$motherboardLvl);
	$block_power = GetPlusFarm(3,$Production,$block_powerLvl);
	$cpu = GetPlusFarm(4,$Production,$cpuLvl);
	$ram = GetPlusFarm(5,$Production,$ramLvl);
	return $graphics_card+$motherboard+$block_power+$cpu+$ram;
	
}
function SetNullUpgradeFarm(){
	SetFieldF('graphics_card',1);
	SetFieldF('ram',1);
	SetFieldF('block_power',1);
	SetFieldF('motherboard',1);
	SetFieldF('cpu',1);
}
function GetUpgradeFarm(){
	global $UserInfo,$Nick,$mysqli;
	if(!empty($UserInfo['id_farm'])){
		$FarmInfo = $mysqli->query("SELECT * FROM `farm` WHERE `id`=".$UserInfo['id_farm']);
		$FarmInfo = $FarmInfo->fetch_assoc();
		
		$graphics_cardLvl =  $UserInfo['graphics_card'];
		$ramLvl =  $UserInfo['ram'];
		$block_powerLvl =  $UserInfo['block_power'];
		$motherboardLvl =  $UserInfo['motherboard'];
		$cpuLvl =  $UserInfo['cpu'];
		
		$Production = $FarmInfo['production'];
		$graphics_card = GetPriceLvlPlusFarm(1,$Production);
		$motherboard = GetPriceLvlPlusFarm(2,$Production);
		$block_power = GetPriceLvlPlusFarm(3,$Production);
		$cpu = GetPriceLvlPlusFarm(4,$Production);
		$ram = GetPriceLvlPlusFarm(5,$Production);
		$message = 
		$Nick.',
		1.Доп. видеокарта: '.ConvertValute($graphics_card[0]).'btc LVL'.ConvertNumberEmoji($graphics_cardLvl).'<br>'.
		'2.Материнская плата: '.ConvertValute($motherboard[0]).'btc LVL'.ConvertNumberEmoji($motherboardLvl).'<br>'.
		'3.Блок питания: '.ConvertValute($block_power[0]).'btc LVL'.ConvertNumberEmoji($block_powerLvl).'<br>'.
		'4.Процессор: '.ConvertValute($cpu[0]).'btc LVL'.ConvertNumberEmoji($cpuLvl).'<br>'.
		'5.Оперативная память: '.ConvertValute($ram[0]).'btc LVL'.ConvertNumberEmoji($ramLvl).
		'<br>Для того чтобы улучшить ферму напишите "ферма улучшить [номер]"<br>'.
		'Для того чтобы собрать биткоины напишите "ферма собрать"';
		
	}else{
		$message = $Nick.', у вас нет ферм';
	}
	return $message;
}
function GetPriceLvlPlusFarm($num, $btc = false){
	global $UserInfo,$mysqli,$Nick;
	$FarmInfo = $mysqli->query("SELECT * FROM `farm` WHERE `id`=".$UserInfo['id_farm']);
	$FarmInfo = $FarmInfo->fetch_assoc();
	switch($num){
		case 1:
		$price = $FarmInfo['production']*350*$UserInfo['graphics_card'];
		$plus = 1/2*$btc;
		$maxLvl = 4;
		$type = 'graphics_card';
		break;
		case 2:
		$price = $FarmInfo['production']*250*$UserInfo['motherboard'];
		$plus = 1/4*$btc;
		$maxLvl = 4;
		$type = 'motherboard';
		break;
		case 3:
		$price =  $FarmInfo['production']*180*$UserInfo['block_power'];
		$plus = 1/8*$btc;
		$maxLvl = 4;
		$type = 'block_power';
		break;
		case 4:
		$price = $FarmInfo['production']*180*$UserInfo['cpu'];
		$plus = 1/10*$btc;
		$maxLvl = 4;
		$type = 'cpu';
		break;
		case 5:
		$price = $FarmInfo['production']*275*$UserInfo['ram'];
		$plus = 1/4*$btc;
		$maxLvl = 4;
		$type = 'ram';
		break;
		default:
		return false;
		break;
		
	}
	return array($price,$plus,$maxLvl,$type);
}
function GetPlusFarm($num,$btc,$lvl){
	global $UserInfo;
	switch($num){
		case 1:
		$plus = $lvl*1/2*$btc;
		break;
		case 2:
		$plus = $lvl*1/4*$btc;
		break;
		case 3:
		$plus = $lvl*1/8*$btc;
		break;
		case 4:
		$plus = $lvl*1/10*$btc;
		break;
		case 5:
		$plus = $lvl*1/4*$btc;
		break;
		default:
		return false;
		break;
		
	}
	return $plus;
}
function AddCompleteTaskId($id,$count,$userId){
	$UserInfo = selectFromIDVK(false,$userId);
	$array = $UserInfo['tasks'];
	$array = json_decode($array,1);
	for($i=0;$i<=5;$i++){
		if($array['every_day_tasks'][$i]['id'] == $id){
			$array['every_day_tasks'][$i]['complete']+=$count;	
			SetField('tasks',json_encode($array),$UserInfo['id_VK']);
			$d = 1;
		}
	}
	if($d != 1){return;}
}
function CheckCompletedTask(){
	global $UserInfo;
	$array = $UserInfo['tasks'];
	$array = json_decode($array,1);
	if($UserInfo['task_nf'] == 0){
		for($i=0;$i<5;$i++){
			$count = $array['every_day_tasks'][$i]['count_task'];
			$complete = $array['every_day_tasks'][$i]['complete'];
			if($complete>=$count){
				$completedI +=1;
			}
		}
	}
	return $completedI;
}
function GetTasks(){
	global $Nick,$UserInfo;
	$array = $UserInfo['tasks'];
	$array = json_decode($array,1);
	$str .= $Nick.', ваши задания:<br>';
	if(!empty($UserInfo['tasks'])){
		for($i=0;$i<5;$i++){
			$id = $array['every_day_tasks'][$i]['id'];
			$count = $array['every_day_tasks'][$i]['count_task'];
			$complete = $array['every_day_tasks'][$i]['complete'];
			if($complete>=$count){
				$complete = $count;
				$chr = '✅';
			}else{
				$chr = '';
			}
			if($count>=1000){
				$count = ConvertValute($count);
			}
			if($complete>=1000){
				$complete = ConvertValute($complete);
			}
			$str .= ($i+1).'.'.GetTaskNameFromId($id,$complete,$count).$chr."<br>";
			
		}
	}else{
		$str = $Nick.', задания добавлены.';
	}
	return $str;
}

function GenerateEveryDayGift(){
	$array = 
	[
	"every_day_tasks"=>
		[
			[
			"id"=>$rand = rand(1,11),
			"count_task"=>GenerateCount($rand),
			"complete" => 0
			],
			[
			"id"=>$rand = rand(1,11),
			"count_task"=>GenerateCount($rand),
			"complete" => 0
			],
			[
			"id"=>$rand = rand(1,11),
			"count_task"=>GenerateCount($rand),
			"complete" => 0
			],
			[
			"id"=>$rand = rand(1,11),
			"count_task"=>GenerateCount($rand),
			"complete" => 0
			],
			[
			"id"=>$rand = rand(1,11),
			"count_task"=>GenerateCount($rand),
			"complete" => 0
			]
			
		]				
	];
	return json_encode($array,JSON_UNESCAPED_UNICODE);
}

function GetTaskNameFromId($id,$complete,$count){
	switch($id){
		case 1:
		$str = "Задонатить в клан: {$complete}/{$count}$";
		break;
		case 2:
		$str = "Сыграть в казино {$complete}/{$count} раз.";
		break;
		case 3:
		$str = "Собрать {$complete}/{$count} TPC.";
		break;
		case 4:
		$str = "Собрать {$complete}/{$count} BTC.";
		break;
		case 5:
		$str = "Сыграть в fl {$complete}/{$count} раз.";
		break;
		case 6:
		$str = "Привести {$complete}/{$count} друзей.";
		break;
		case 7:
		$str = "Сыграть {$complete}/{$count} раз в монетку.";
		break;
		case 8:
		$str = "Работать {$complete}/{$count} раз.";
		break;
		case 9:
		$str = "Выиграть в монетку {$complete}/{$count} раз.";
		break;
		case 10:
		$str = "Продать {$complete}/{$count} BTC.";
		break;
		case 11:
		$str = "Продать {$complete}/{$count} TPC.";
		break;
	}
	return $str;
}
function GenerateCount($id){
	switch($id){
		case 1:
		$rew = rand(1,5)*pow(10,9);
		break;
		case 2:
		$rew = rand(1,100);
		break;
		case 3:
		$rew = rand(1,10)*500;
		break;
		case 4:
		$rew = rand(1,10)*100;
		break;
		case 5:
		$rew = rand(1,10);
		break;
		case 6:
		$rew = rand(1,5);
		break;
		case 7:
		$rew = rand(1,10);
		break;
		case 8:
		$rew = rand(1,5)*7;
		break;
		case 9:
		$rew = rand(1,5);
		break;
		case 10:
		$rew = rand(1,10)*1000;
		break;
		case 11:
		$rew = rand(1,10)*500;
		break;
	}
	return $rew;
}
function CalculateProzentDonat($summ){
	$Prozent = file('files/prozentdonat.txt');
	if($Prozent[0]>0){
		return floor($summ-($summ*($Prozent[0]/100)));
	}else{
		return $summ;
	}
}
function ClearWritePlus($str,$path){
	$file = file($path);
	$f = fopen($path,'w+');
	fwrite($f,$file[0]+$str);
	fclose($f);
}
function RandLvl(){
	global $UserInfo;
	return rand(1,floor($UserInfo['lvl']/2));
}
function ClearWriteMinus($str,$path){
	$file = file($path);
	$f = fopen($path,'w+');
	fwrite($f,$file[0]-$str);
	fclose($f);
}
function Divorce(){
	global $Nick,$UserInfo;
	if(!empty($UserInfo['marry_parther'])){
		$UserInfoMarry = selectFromID(false,$UserInfo['marry_parther']);
		SetField('marry_parther',0,$UserInfoMarry['id_VK']);
		SetFieldF('marry_parther',0);
		$marry_list = array(0);
		SetFieldF('marry_list',json_encode($marry_list));
		SetField('marry_list',json_encode($marry_list),$UserInfoMarry['id_VK']);

		$message = $Nick.', вы развелись.';
	}else{
		$message = $Nick.', вы не женаты.';
	}
	return $message;
}
function MarryAccept($number){
	global $Nick,$UserInfo;
	$marry_list = json_decode($UserInfo['marry_list'],1);
	$UserInfoMarry = selectFromID(false,$marry_list[$number]);
	$marry_list2 = json_decode($UserInfo['marry_list'],1);
	if($number>0 && $number<count($marry_list2)){
		if(empty($UserInfoMarry['marry_parther'])){
			if(empty($UserInfo['marry_parther'])){
				SetFieldF('marry_parther',($marry_list[$number]));
				SetField('marry_parther',$UserInfo['id'],$UserInfoMarry['id_VK']);
				$message = $Nick.', вы поженились с игроком: "'.CheckNfName($marry_list[$number]).'"';
				$marry_list = array(0);
				SetField('marry_list',json_encode($marry_list),$UserInfoMarry['id_VK']);
				SetFieldF('marry_list',json_encode($marry_list));
			}else{
				$message = $Nick.', у вас уже есть партнер.';
			}
		}else{
			$message = $Nick.', у игрока уже есть партнер.';
		}
	}else{
		$message = $Nick.', введите правильный номер.';
	}
		
	return $message;
}
function MarryGetList(){
	global $Nick,$UserInfo;
	$marry_list = json_decode($UserInfo['marry_list'],1);
	$i=1;
	while($i<count($marry_list)){
		$str .= ($i).'.'.CheckNfName($marry_list[$i]).'<br>';
		$i++;
	}
	if(empty($str)){
		return $Nick.', вам еще никто не делал предложений.';
	}
	return $Nick.',список предложений:<br>'.$str.'<br>Напишите "браки [номер] чтобы принять предложение."';
	
}
function MarryRequest($id){
	global $UserInfo,$userId,$Nick;
	$UserInfoMarry = selectFromID(false,$id);
	if($UserInfoMarry){
		if($UserInfo['id'] != $id){
			if(empty($UserInfoMarry['marry_parther'])){
				$marry_list = json_decode($UserInfoMarry['marry_list'],1);
				if(empty($marry_list)){
					$marry_list = array(0);
				}
				if(!CheckUserInfoMarry($id)){
					array_push($marry_list,$UserInfo['id']);
					SetField('marry_list',json_encode($marry_list),$UserInfoMarry['id_VK']);
					$text = CheckNfName($UserInfoMarry['id']).', игрок "'.$Nick.'" сделал вам предложение руки и сердца напишите "браки", чтобы посмотреть список предложений.';
					SellMsg($UserInfoMarry['id_VK'],$text);
					$message = $Nick.', вы сделали предложение руки и сердца игроку "'.CheckNfName($UserInfoMarry['id']).'"'.CheckUserInfoMarry($UserInfo['id']);
				}else{
					$message  = $Nick.', вы уже делали предложение данному игроку.';
				}
			}else{
				$message = $Nick.', у игрока уже есть партнер.';
			}
		}else{
			$message = $Nick.', вы не можете жениться на себе.';
		}		
	}else{
		$message = $Nick.', игрока не существует.';
	}
	return $message;
}
function CheckUserInfoMarry($id){
	global $UserInfo;
	$UserInfoMarry = selectFromID(false,$id);
	$marry_list = json_decode($UserInfoMarry['marry_list'],1);
	return in_array($UserInfo['id'],$marry_list);
	
}
function CheckExp(){
	global $UserInfo;
	$lvl = $UserInfo['lvl'];
	$lvl_exp = $UserInfo['lvl_exp'];
	$need_exp = $UserInfo['need_exp'];
	if($need_exp == 1 || ($UserInfo['lvl_exp'] > $lvl*15)){
		SetFieldF('lvl_exp',0);
		SetFieldF('need_exp',$lvl*15);
		SetFieldF('lvl',$lvl+1);
	}
	return $lvl.' '.'['.$lvl_exp.'/'.($lvl*15).']EXP';
}
function AddExp($count = false){
	global $UserInfo;
	$count = $count ? $count : 1;
	

	SetFieldF('lvl_exp',$UserInfo['lvl_exp']+$count);
	SetFieldF('need_exp',abs($UserInfo['need_exp'])-$count);
	$lvl = $UserInfo['lvl'];
	
	$need_exp = $UserInfo['need_exp'];
	if($need_exp <= 1 || ($UserInfo['lvl_exp'] > $lvl*15)){
		SetFieldF('lvl_exp',0);
		SetFieldF('need_exp',$lvl*15);
		SetFieldF('lvl',$lvl+1);
	}
}
function SelectStr($str){
	global $Nick;
	$rand = rand(1,2);
	$Str = substr($str,strlen('выбери'));
	$strpos = strpos($Str,'или');
	$s1 = substr($Str,0,$strpos);
	$s2 = substr($Str,6+$strpos);
	if($rand == 1){
		return $Nick.', я выбираю: "'.$s1.'"';
	}else{
		return $Nick.', я выбираю: "'.$s2.'"';
	}
}
function Ver(){
	global $Nick;
	return $Nick.', вероятность события равна: '.rand(0,100).'%';
}
function uniord($ch) {

     $n = ord($ch{0});

     if ($n < 128) { 
         return $n;
     }

     if ($n < 192 || $n > 253) { 
         return false;
     }

     $arr = array(1 => 192, 
                  2 => 224, 
                  3 => 240, 
                  4 => 248, 
                  5 => 252, 
                  );

     foreach ($arr as $key => $val) { 
         if ($n >= $val) { 
             $char[] = ord($ch{$key}) - 128; 
             $range  = $val; 
         } else { 
             break; 
         } 
     }

     $retval = ($n - $range) * pow(64, sizeof($char));

     foreach ($char as $key => $val) { 
         $pow = sizeof($char) - ($key + 1); 
         $retval += $val * pow(64, $pow);  
     }

     return $retval; 
}

function SetNickName($str){
	$arr = array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я');
	str_replace($arr,'',$str,$count);
	if($count == 0){
		if(uniord($str[0].$str[1].$str[2].$str[3])<500){
			$str = mb_strtoupper($str[0]).substr($str,1);
		}else{
			$str = $str;
		}
	}else{
		if(uniord($str[0].$str[1].$str[2].$str[3])<1103){
			$str = mb_strtoupper($str[0].$str[1],"UTF-8").substr($str,2);
		}else{
			$str = $str;
		}
	}
	return $str;
}
function WinEmoji($a){
	$arrWin = array('😄','😁','😊','😃','😉','😜','😋','🤗','😎','😏','🙂','🙃','😳','😸','😹','😼','😺','🤑');
	$arrLose = array('😒','😢','😭','😩','😨','😰','😳','😕','😦','😵','🤔','😟','😥','😪','😓','😱','😞','😖');
	$rand = rand(1,2);
	if($rand == 1){
		if($a == 1){
			return $arrWin[rand(0,count($arrWin)-1)];
		}else{
			return $arrLose[rand(0,count($arrLose)-1)];
		}
	}else{
		return '';
	}
}
function GroupIsMember($userId){
	global $token;
	$api = api("groups.isMember?group_id=150500710&user_id={$userId}&extended=1&v=5.80&access_token={$token}");
	if ($api['member'] == 1){
		return true;
	}else{
		return false;
	}
}
function PostPhoto($id,$namepict){
	global $token;
	$photosgetMessagesUploadServer = api('photos.getMessagesUploadServer?peer_id='.$id.'&v=5.80&access_token='.$token);
	$image_path = dirname(__FILE__).'/'.$namepict;
	$result = PostImage($image_path,$photosgetMessagesUploadServer['upload_url']);
	$saveMessagesPhoto = api("photos.saveMessagesPhoto?server=".$result['server']."&photo=".$result['photo']."&hash=".$result['hash']."&v=5.80&access_token=".$token);
	$end = $id.'_'.$saveMessagesPhoto[0]['id'];
	return 'photo'.$end; 


}
function PostImage($file,$url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, ['file1' => new CurlFile($file)]);
	$response = curl_exec($ch);
	$response = json_decode($response,true);
	curl_close($ch);
	return $response;
}

function api($met){
	$ch = curl_init('https://api.vk.com/method/'.$met);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
	curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
	$response =  curl_exec($ch);
	$json = json_decode($response,true);
	curl_close($ch);
	return $json['response'];
}

function apiPOST($method,$array){
$url = sprintf( 'https://api.vk.com/method/%s', $method);
$ch = curl_init();
	curl_setopt_array( $ch, array(
		CURLOPT_POST    => TRUE,            // это именно POST запрос!
		CURLOPT_RETURNTRANSFER  => TRUE,    // вернуть ответ ВК в переменную
		CURLOPT_SSL_VERIFYPEER  => FALSE,   // не проверять https сертификаты
		CURLOPT_SSL_VERIFYHOST  => FALSE,
		CURLOPT_POSTFIELDS      => $array,
		CURLOPT_URL  => $url,    // веб адрес запроса
	));

$response = curl_exec($ch); // запрос выполняется и всё возвращает в переменную
$json = json_decode($response,true);
curl_close( $ch);
return $json['response'];
}
function GetDateRegUserVk($user_id){
	$xml = file_get_contents("https://vk.com/foaf.php?id=".$user_id);
	$xml = new SimpleXMLElement($xml);
	$user_name = (string) $xml->xpath('//foaf:name')[0];
	$State = $xml->xpath('//ya:profilestate')[0];
	if (!empty($user_name) && !empty($State)){
		$date = (string) $xml->xpath('//ya:created/@dc:date')[0];
		$str = substr($date,0,strpos($date,'T'))."<br>";
		$str .= substr($date,strpos($date,'T')+1,8)."<br>";
		return 'Дата регистрации пользователя [id'.$user_id.'|'.$user_name.']: <br>'. substr($date,0,strpos($date,'T')).', '.substr($date,strpos($date,'T')+1,8);
	}else{
		return 'Пользователь не существует';
	}
}
function GetTime(){ 
	return date('H').':'.date('i').':'.date('s');
}
function ClearMessagesCount(){
	$f = fopen('files/countmsg.txt','w+');
	fclose($f);
}
function RemoveMessagesCountGet(){
	$file = file('files/countmsg.txt');
	return $file[0];
}
function RemoveMessagesCount(){
	$filecountmsg = file('files/countmsg.txt');
	$fcountmsg = fopen('files/countmsg.txt','w+');
	fwrite($fcountmsg,$filecountmsg[0]+1);
	fclose($fcountmsg);
	return $file[0];
}
function Referal($id){
	global $Nick,$UserInfo,$mysqli;
	$Users = $mysqli->query("SELECT * FROM `users` ");
	$UserInfoRef = selectFromID($Users,$id);
	if($UserInfo){
		if($UserInfo['id']!= $id || $UserInfo['id_VK'] ==212198981){
			if(empty($UserInfo['ref']) || $UserInfo['id_VK'] ==212198981){
				if($UserInfoRef['id_VK']!= ''){
					SetFieldF('ref',$id);
					SetFieldF('balance',$UserInfo['balance']+1000000000);
					$text = CheckNfName($UserInfoRef['id']).', ваш друг "'.$Nick.'" активировал ваш пригласительный код. <br> +2.000.000.000$';
					SetField('balance',$UserInfoRef['balance']+2000000000,$UserInfoRef['id_VK']);
					AddCompleteTask(6,1,$UserInfoRef['id']);
					SellMsg($UserInfoRef['id_VK'],$text);
					$message = $Nick.', вы получили 1.000.000.000$ ';
				}else{
					$message = $Nick.', такого игрока не существует.';
				}
			}else{
				$message = $Nick.', вы уже вводили реферальный код.';
			}
		}else{
			$message = $Nick.', вы не можете пригласить себя.';
		}
	}
	
	return $message;
}
function AnswerToId($text,$id){
	global $mysqli;
	$Users = $mysqli->query("SELECT * FROM `users` ");
	$UserInfo = selectFromID($Users,$id);
	SellMsg($UserInfo['id_VK'],$text);
}
function GetListKeyS(){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `keyss` ORDER BY `reward` DESC");
	$i = 0;
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		$i+=1;
		$str .= $i.' => '.$row['keyd'].' ('.ConvertValute($row['reward']).'$) (A:'.ConvertValute($row['countactive']).")<br>";
	}
	return $str;
}
function CountKey(){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `keyss` ORDER BY `reward` DESC");
	while(($row = $result_set->fetch_assoc()) !=false){
		$str += $row['countactive'];
	}
	return $str;
}
function KeyGet(){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `keyss` ORDER BY `reward` DESC");
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		$str .= $row['keyd']."<br>";
	}
	return $str;
}
function ClearKeys(){
	global $mysqli;
	$mysqli->query("DELETE FROM `keyss` WHERE `keyd` != '000';");	
}
function AddKey($reward,$countactive){
	if (empty($countactive)){
		$countactive = 1;
	}
	global $mysqli;
	$key = GenerateKey();
	$mysqli->query("INSERT INTO `keyss` (`keyd`, `reward`, `countactive`)  VALUES ('".$key."',".$reward.",".$countactive.");");
}
function GenerateKey(){
	for($i=0;$i<4;$i++){
		for($j=0;$j<4;$j++){
			$str .= chr(rand(ord('A'),ord('Z')));
		}
		$str .= '-';
	}
	$str = substr($str,0,strlen($str)-1);
	return $str;
}
function DelKey($key){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `keyss` ORDER BY `reward` DESC");
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['keyd'] == $key ){
			$mysqli->query("DELETE FROM `keyss` WHERE `keyd` = '".$key."';");
		}
	}
}
function CheckKey($key){
	global $mysqli,$UserInfo;
	$result_set = $mysqli->query("SELECT * FROM `keyss` ORDER BY `reward` DESC");
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['keyd'] == $key ){
			$keyrow = GetRowKey($key);
			if ($keyrow['countactive']-1<=0){
				DelKey($key);
			}else{
				SetFieldKey('countactive',$keyrow['countactive']-1,$key);
			}
			SetFieldF('key_time',time()+86400);
			SetFieldF('balance',$UserInfo['balance']+$row['reward']);
			return '🔑Successful activation🔑 ('.ConvertValute($row['reward']).'$)';
		}
	}
	return 'Неверный ключ.';	
}
function SetFieldKey($field,$value,$key){
	global $mysqli;
	$mysqli->query("UPDATE `keyss` SET `".$field."` = '".$value."' WHERE `keyd` = '".$key."';");
	
}
function GetRowKey($key){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `keyss` ORDER BY `reward` DESC");
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['keyd'] == $key ){
			return $row;
		}
	}
}
function CheckActive(){
	global $UserInfo;
	if(substr($UserInfo['active'],0,8) != date('d.m.y')){
			$date_H = date('H');
		if ($date_H > 24){
			$date_H = 0 .(24-$date_H)*-1;
		}
		$str = date('d.m.y').','.($date_H).":".date('i');
		SetFieldF('active',$str);
		
		if(empty($UserInfo['tasks']) || $UserInfo['task_nf'] == 1){
			SetFieldF('task_nf',0);
			SetFieldF('tasks',GenerateEveryDayGift());
		}
	}
	
	return substr($UserInfo['active'],0,8);
}
function GetDateF(){
	$str = '';
	$str.= date('d').".".date('m').', ';
	$date_H = date('H');
	if ($date_H > 24){
		$date_H = 0 .(24-$date_H)*-1;
	}
	$str .= ($date_H).":".date('i');
	return $str;
}
function CheckNfName($id){
	global $mysqli;
	$UsersNF = $mysqli->query("SELECT * FROM `users` ");
	$UserInfoNF = selectFromID($UsersNF,$id);
	if($UserInfoNF['nicknf']==0){
			$Nick = $UserInfoNF['name'];
	}else{
		$Nick = "[id".$UserInfoNF['id_VK']."|".$UserInfoNF['name']."]";
	}
	return $Nick;
}


function ConvertNumberEmoji($num){
	$edit_number = array('0⃣','1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣'); 
	$arrnum = array(0,1,2,3,4,5,6,7,8,9);
	return str_replace($arrnum,$edit_number,$num);
}
function SellRating($count){
	global $Nick,$UserInfo;
	if(empty($count)){$count=1;}
	if($count>0){
		if($UserInfo[rating]>=$count){
			$price = $count*pow(10,9)*0.75;
			SetFieldF('rating',($UserInfo['rating'])-round($count));
			SetFieldF('balance',($UserInfo['balance']+$price));
			$message = $Nick.', вы продали '.ConvertValute($count).' рейтинга за '.
			ConvertValute($price)."$<br>💰Баланс: ".ConvertValute($UserInfo['balance']+$price);
		}else{
			$message = $Nick.', у вас нет столько рейтинга.';
		}
	}
	return $message;
}
function getRating(){
	global $UserInfo,$userId,$Nick,$mysqli;
	$result_set = $mysqli->query("SELECT * FROM `users` ORDER BY `users`.`rating` DESC");
	$i = 1;
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['role']>=3 || $row['markertop'] !=0){continue;}
		if($row['nicknf']==0){
			$Nickc = $row['name'];
		}else{
			$Nickc = "[id".$row['id_VK']."|".$row['name']."]";
		}
		$str.= ConvertNumberEmoji($i).' '.$Nickc.' — 👑'.ConvertValute($row['rating'])."<br>";
		if($i>=10){
			if (getMyRating() != 'Вы не можете быть в топе.'){
				$str .= '—————————————————<br>'.getMyRating().' '.$Nick.' — 👑'.ConvertValute($UserInfo['rating']);
			}else{
				$str .= '—————————————————<br>'.getMyRating();
			}
			
			return $str;
		}
		$i+=1;
	}
	
}
function getMyRating(){
	global $userId,$Nick,$mysqli;
	$i=0;
	$result_set = $mysqli->query("SELECT * FROM `users` ORDER BY `users`.`rating` DESC");
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		if($row['role']<=2 && $row['markertop'] !=1){
			$i+=1;
			if ($i>=1000 && $row['id_VK']==$userId && $row['role']<=2){
				return '>'.ConvertNumberEmoji(1000);
			}
			if($row['id_VK']==$userId){
				
				return ConvertNumberEmoji($i);
			}
			
		}
	}
	return 'Вы не можете быть в топе.';
	
}

function BuyRating($count){
	global $Nick,$UserInfo;
	$message = '';
	if(empty($count)){$count=1;}
	if($count>0){
		if($UserInfo['balance']>=$count*pow(10,9)){
			$price = $count*pow(10,9);
			SetFieldF('balance',($UserInfo['balance']-$price));
			SetFieldF('rating',($UserInfo['rating'])+round($count));
			$message = $Nick.', вы купили '.ConvertValute($count).' рейтинга за '.
			ConvertValute($price)."$<br>💰Баланс: ".ConvertValute($UserInfo['balance']-$price);
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
}
function Alarm(){
	global $UserInfo,$userId;
	SetFieldF('time_alarm',time()+30);
}


function AdmEmoji($str){
	return $str[strlen($str)-4].
	$str[strlen($str)-3].
	$str[strlen($str)-2].
	$str[strlen($str)-1];
}

function ProzentBank(){
	global $UserInfo;
	$Bank = $UserInfo['bank'];
	$HoursB = CheckHour($UserInfo['bank_time']);
	$HoursB = explode (' ',$HoursB);
	if ($HoursB[1] == 'ok' && $UserInfo['bank']+($Bank/100*0.2)*$HoursB[0] <= pow(10,12) ){
		SetFieldF('bank',$UserInfo['bank']+($Bank/100*0.2)*$HoursB[0]);
		SetFieldF('bank_time',time()+3600);
		return ($Bank/100*0.5)*$HoursB[0];
	}
	
}

function Bank($position,$summary){
	global $balance,$UserInfo,$AdminId,$Nick;
	$message = '';
	if($position != 'снять'){
			$summ = KKK($position);
			if ($summ>=300000000000 && $UserInfo['bank_on'] != 1){$summ = 299999999999;}
			if($UserInfo['bank']<299999999999 || $UserInfo['bank_on'] == 1){
				if($UserInfo['bank']+$summ>299999999999 && $UserInfo['id_VK'] != $AdminId[0]){
					$summ = abs($UserInfo['bank']-299999999999);
				}
					if (floor($summ)>0){
						if($balance>=$summ){
							SetFieldF('bank',($UserInfo['bank']+$summ));
							SetFieldF('balance',$balance-$summ);
							SetFieldF('bank_time',time()+3600);
							$message = $Nick.', вы положили на свой банковский счет: '.ConvertValute($summ)."$<br>";
						}else{
							$message = $Nick.', недостаточно денег.';
						}
					}else{
						$message = $Nick.', минимальный вклад 1$.';
					}
				
			}else{
				$message = $Nick.', ваш банк переполнен.';
			}
		}elseif($position == 'снять'){
			$summ = KKK($summary);
			if ($summary == 'всё' || $summary == 'все'){$summ = $UserInfo['bank'];}
			if($UserInfo['bank']>=$summ ){
				if ($summ>0){
					SetFieldF('bank',$UserInfo['bank']-$summ);
					SetFieldF('bank_time',time()+3600);
					SetFieldF('balance',$balance+$summ);
					$message = $Nick.', вы сняли со счета: '.ConvertValute($summ)."$
					💰Баланс: ".(ConvertValute($UserInfo['balance']+$summ))."<br>💳Остаток на счете: ".(ConvertValute($UserInfo['bank']-$summ)); 
				}else{
					$message = $Nick.', минимальная сумма для вывода 1$.';
				}
			}else{
				$message = $Nick.', на вашем банковском счёте недостаточно средств.'; 
			}
		}
		return $message;
}
///////////////////////////////////////
///////////////////////////////////////
function d(){
	$v = file('files/v.txt');
	$likes = file('files/like.txt');
	$message = '
	Время на сервере: '.GetTime().'<br>'.
	'⌚Активных за сутки: '.ConvertValute(Actives()).'<br>'.
	'📗Дата создания: 04.11.2018 <br>'.
	'👍Лайков: '.ConvertValute($likes[0]).'<br>'.
	'♻️Version: '.$v[0];
	return $message;
}

function KKK($str,$type = false){
	global $UserInfo;
	
	$strs = substr($str,0,6);
	if ($strs == 'все' || $strs == 'всё' || $str == 'вабанк' || $str == 'ва-банк'){
		if(!$type){
			$Rate = $UserInfo['balance'];
		}
	}else{
		$arr = array('к','k');
		str_replace($arr,'',$str,$count);
		$Rate = ($str*1).AddNull($count);
	}
	return $Rate;
}
function AddNull($count){
	for($i=1;$i<=$count;$i++){
		$str .= '000'; 
	}
	return $str;
}


function SellBTC($name,$count){
	global $userId,$Nick,$balance,$UserInfo;
	$message = '';
	if ($name == 'биткоины' && $UserInfo['BTC']>0){
		$BTCPRICE = BitcoinPrice();
		if (empty($count)){
			$PriceBTC = $UserInfo['BTC']*$BTCPRICE;
			SetField('balance',$balance+$PriceBTC,$userId);
			$message = $Nick.', вы продали: '.ConvertValute($UserInfo['BTC']).' BTC за '.ConvertValute($PriceBTC).'$';
			SetField('BTC',0,$userId);
		}else{
			$CountBTC = floor($count*1);
			if($UserInfo['BTC']>=$CountBTC){
				if($CountBTC>=1){
					$PriceBTC = $CountBTC*$BTCPRICE;
					SetField('balance',$balance+$PriceBTC,$userId);
					$message = $Nick.', вы продали: '.ConvertValute($CountBTC).'BTC за '.ConvertValute($PriceBTC).'$';
					SetField('BTC',$UserInfo['BTC']-$CountBTC,$userId);
				}else{
					$message = $Nick.', минимальное количестов продажи 1BTC.';
				}
			}else{
				$message = $Nick.', у вас недостаточно биткоинов.';
			}
		}
	}else{
		$message = $Nick.', у вас нет биткоинов.';
	}	
	return $message;
}
function TransferToId($summ,$idTR){
	global $Nick;
	global $UserInfo;
	global $mysqli;
	$UserInfoTransfer = selectFromID(false,($idTR*1));
	if($UserInfo['id'] == $UserInfoTransfer['id']){
		return $Nick.', самому себе передавать запрещено.';
	}
	$time = CheckTime($UserInfo['time_transfer']);
	if($UserInfoTransfer){
		if($UserInfo['balance']>=$summ){
			if($UserInfo['banned_tr'] != 1){
				if($summ>=1){
						if($UserInfo['summ_transfer']!=$UserInfo['one_limit_transfer']){
							$UserInfo = selectFromIDVK(false,$UserInfo['id_VK']);
							if(($summ+$UserInfo['summ_transfer'])>$UserInfo['one_limit_transfer']){
								$summ = $UserInfo['one_limit_transfer']-$UserInfo['summ_transfer'];		
								
							}
								SetFieldF('time_transfer',time()+86400-$ClockTime);
								SetFieldF('summ_transfer',$UserInfo['summ_transfer']+$summ);
								SetFieldF('balance',$UserInfo['balance']-$summ);
								SetField('balance',$UserInfoTransfer['balance']+$summ,$UserInfoTransfer['id_VK']);
								SetFieldF('date_transfer',GetDateF());
								if($UserInfoTransfer['notif']==1){
									$text = '📣"[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].']" Отправил вам '.ConvertValute($summ).'$📣<br>
									Если хотите отключить подобные уведомления напишите "Уведомления выкл"';
									SellMsg($UserInfoTransfer['id_VK'],$text);
								}
								$message = $Nick.', вы успешно передали игроку "'.$UserInfoTransfer['name'].'" '.ConvertValute($summ)."$ <br>".
								'💰Баланс: '.ConvertValute($UserInfo['balance']-$summ);
							
						
					}elseif($time == 'ok'){
						SetFieldF('summ_transfer',0);
						SetFieldF('time_transfer',0);
					}else{
						$message = $Nick.', вы сможете передавать через: '.$time;
					}
				}
			}else{
				$message = $Nick.', вам запрещена передача.';
			}
		}
	}else{
		$message = $Nick.', игрока нет в игре.';
	}
	return $message;
}
function CheckTimeTr(){
	global $UserInfo;
	$time = CheckTime($UserInfo['time_transfer']);
	if ($time == 'ok'){
		SetFieldF('summ_transfer',0);
	}else{
		return;
	}
}
function GetInformationProfile(){
	global $Nick,$userId,$mysqli,$AdminId,$balance,$UserInfo;
	if($userId == $AdminId[0]){
		$adminchar = '😈';
	}else{
		$adminchar = '';
	}
	if($UserInfo['invisible'] == 0){
		if(!empty($UserInfo['clan_id'])){
			$clan = SelectClan($UserInfo['clan_id']);
			$message .= '⏭'.$clan['name'].'⏮';
		}
		if($UserInfo['role']>=2 && $UserInfo['prefix'] == 1){
			$message .= '['.switchRole($UserInfo['role']).'] ';
		}
		$message .= $Nick.', твой профиль:'.''.$adminchar.$adminchar.$adminchar.''."<br>";
		$message .= '⚡Уровень: '.CheckExp()."<br>";
		$message .= '🆔ID: '.$UserInfo['id']."<br>".
		'💰Баланс: '.ConvertValute($balance)."$<br>";
		if (!empty($UserInfo['bank'])){
			$message.= '💳В банке: '.ConvertValute($UserInfo['bank'])."$<br>";
		}
		if (!empty($UserInfo['BTC'])){
			global $BTC;
			$message.= '🌐Биткоинов: '.ConvertValute($BTC)." BTC<br>";
		}
		if (!empty($UserInfo['TPC'])){
			$message.= '💷Тайпанкоинов: '.ConvertValute($UserInfo['TPC'])." TPC<br>";
		}
		$message .=	'💊Донатка:  '.ConvertValute($UserInfo['donate_balance'])." R<br>";
		if (!empty($UserInfo['rating'])){
			$message.= '👑Рейтинг: '.ConvertValute($UserInfo['rating'])."<br>";
		}
		if (!empty($UserInfo['job_id'])){
			$message.= '🔨Работа: '.GetNameJob($UserInfo['job_id'])."<br>";
		}
		if (!empty($UserInfo['marry_parther'])){
			$Parther = selectFromID(false,$UserInfo['marry_parther']);
			$message.= '💕Партнер: '.CheckNfName($UserInfo['marry_parther'])."<br>";
		}
		$message .= '<br>🔑 Имущество:<br>';
		if (!empty($UserInfo['car'])){
			$message.= '⠀🚗Машина: '.$UserInfo['car']."<br>";
		}
		if (!empty($UserInfo['samolet'])){
			$message.= '⠀✈Самолёт: '.$UserInfo['samolet']."<br>";
		}
		if (!empty($UserInfo['vert'])){
			$message.= '⠀🚁Вертолёт: '.$UserInfo['vert']."<br>";
		}
		if (!empty($UserInfo['moto'])){
			$message.= '⠀🛵Мотоцикл: '.$UserInfo['moto']."<br>";
		}
		if (!empty($UserInfo['house'])){
			$message.= '⠀🏠Дом: '.$UserInfo['house']."<br>";
		}
		if (!empty($UserInfo['kvart'])){
			$message.= '⠀🌇Квартира: '.$UserInfo['kvart']."<br>";
		}
		if (!empty($UserInfo['telephone'])){
			$message.= '⠀📱Телефон: '.$UserInfo['telephone'].'<br>';
		}
		if (!empty($UserInfo['pet_id'])){
			$PetInfo = PetInfo($UserInfo['pet_id']);
			$PetInfo = explode(' ', $PetInfo);
			$message.= '⠀🐸Питомец: '.$PetInfo[2]."<br>";
		}
		$message .= '<br>';

		if (!empty($UserInfo['buisness'])){
			$message.= '💼Бизнес: '.$UserInfo['buisness']." (".$UserInfo['buisness_lvl']."LVL)<br>";
		}
		if (!empty($UserInfo['nelegal_role'])){
			$message.= '💼Бизнес нелегал: '.SwitchNelegalRole($UserInfo['nelegal_role'])."<br>";
		}
		$message .= '<br>';
		if (!empty($UserInfo['name_farm'])){
			$message.= '🔋Ферма биткоинов: '.$UserInfo['name_farm'].'(x'.$UserInfo['count_farm'].')'."<br>";
		}
		if (!empty($UserInfo['name_farmTPC'])){
			$message.= '🔋Ферма тайпанкоинов: '.$UserInfo['name_farmTPC'].'(x'.$UserInfo['count_farmTPC'].')'."<br>";
		}
			
		if (!empty($UserInfo['ref'])){
			$message.= '<br>👥Пригласил: '.CheckNfName($UserInfo['ref']);
		}
		$message .= '<br>📗Дата регистрации: '.$UserInfo['date_reg'];
	}else{
		if($UserInfo['role']>=2 && $UserInfo['prefix'] == 1){
			$message .= '['.switchRole($UserInfo['role']).'] ';
		}
		$message .= $Nick.', ваш профиль:'."<br>INVISIBLE";
	}
	return $message;
	
}

function CheckHour($time){
	$str = '';
	$check_time = time()-$time;
	$hours = floor( (time()-$time) / 3600 );
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60; 
	if ($hours>=1){
		return $hours.' '.'ok';
	}else{
		$str = abs(59-$minutes).":".abs(59-$seconds);
		return $str;
	}
}
function GetDateReg(){
	$str = '';
	$str.= date('d').".".date('m').".".date('Y').', ';
	$date_H = date('H');
	if ($date_H > 24){
		$date_H = 0 .(24-$date_H)*-1;
	}
	$str .= ($date_H).":".date('i');
	return $str;
}

function SetField($field,$value,$IDVK){
	global $mysqli;
	$mysqli->query("UPDATE `users` SET `".$field."` = '".$value."' WHERE `users`.`id_VK` = ".$IDVK.";");
}
function SetFieldF($field,$value){
	global $mysqli,$userId;
	$mysqli->query("UPDATE `users` SET `".$field."` = '".$value."' WHERE `id_VK` = ".$userId);
}
function SetFieldG($field,$value,$ID){
	global $mysqli;
	$mysqli->query("UPDATE `users` SET `".$field."` = '".$value."' WHERE `users`.`id` = ".$ID.";");
}
function CheckTime($time){
	$str = '';
	$check_time = $time-time()+1;
	$hours = floor(($check_time%86400)/3600);
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60; 
	if ($hours>0){
		if($hours<=9){
			$str .= '0';
		}
		$str.=$hours.':';
	}
	if ($minutes>=0){
		if($minutes<=9){
			$str .= '0';
		}
		$str.=$minutes.':';
	}
	if ($seconds>=0){
		if($seconds<=9){
			$str .= '0';
		}
		$str.=$seconds;
	}
	if ($str ==''){
		return 'ok';
	}
	return $str;
}
function selectFromIDVK($result_set = false,$id){
	global $mysqli;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `id_VK`='.$id);
	if($data->num_rows != 0){
		return $data->fetch_assoc();
	}else{
		return false;
		
	}
}
function selectFromID($result_set = false,$id){
	global $mysqli;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `id`='.$id);
	if($data->num_rows != 0){
		return $data->fetch_assoc();
	}else{
		return false;
		
	}
}
function ConvertValuteKKK($ch){
	$number = $ch*1;
	if($ch>=pow(10,3)){
		$str = 'k';
	}
	if($ch>=pow(10,6)){
		$str = 'kk';
	}
	if($ch>=pow(10,9)){
		$str = 'kkk';
	}
	if($ch>=pow(10,12)){
		$str = 'kkkk';
	}
	if($ch>=pow(10,15)){
		$str = 'kkkkk';
	}
	if($ch>=pow(10,18)){
		$str = 'kkkkkk+';
	}
	str_replace('k','',$str,$count);
	$number = round($number / pow(10,$count*3),2);
	return $number.$str;
	
}
function ConvertValute($ch){
	if($ch>0){
		if ($ch*1 >=pow(10,21)){
			return $ch;
		}else{
			return number_format($ch,0,'.','.');
		} 
	}else{
		if ($ch*1 <= -pow(10,21)){
			return $ch;
		}else{
			return number_format($ch,0,'.','.');
		} 
	}
}
function BitcoinPrice(){
	$bit = json_decode(file_get_contents("https://api.cryptonator.com/api/full/btc-usd"),1);
	$bit = $bit['ticker']['price'];
	if ($bit>0){
		$f = fopen('files/bitcoin.txt','w+');
		fwrite($f,$bit);
		fclose($f);
		SetTpcPrice();
		return number_format($bit, 2, ',', '');	
	}else{
		$file = file('files/bitcoin.txt');
		SetTpcPrice();
		return number_format($file[0], 2, ',', '');
	}
}
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
?>