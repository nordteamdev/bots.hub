<?php


function DcorText($str){
	$arraystan = 
	['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
	$arrayNew =[
	 ['丹','乃','匚','刀','モ','下','ム','卄','工','Ｊ','Ｋ','ㄥ','爪','れ','口','ㄗ','Ｑ','尺','ち','匕','∪','∨','山','メ','ㄚ','乙','₁','₂','₃','₄','₅','₆','₈','₉','₀'],
	 ['ᵃ','ᵇ','ͨ','ᵈ','ᵉ','f','ᵍ','ʰ','`','ʲ','ᵏ','ˡ','ᵐ','ⁿ','º','ᵖ','զ','ʳ','ˢ','ᵗ','ᵘ','ᵛ','ʷ','ˣ','ʸ','ʐ','₁','₂','₃','₄','₅','₆','₈','₉','₀'],
	 ['Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ','Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ','１','２','３','４','５','６','７','８','９','０'],
	 ['Δ','β','Ć','Đ','€','₣','Ǥ','Ħ','Ξ','Ĵ','Ҝ','Ł','Μ','Ň','Ø','Р','Ω','Ř','Ş','Ŧ','Ữ','V','Ŵ','Ж','¥','Ž','Ι','Ձ','კ','Ч','Ƽ','б','ל','ȣ','ף','θ']
	];
	

	$message = str_replace($arraystan, $arrayNew[rand(0,count($arrayNew)-1)], $str);
	return $message;

}
function Why(){
	global $peer_id,$token;
	$getConversationMembers = api('messages.getConversationMembers?peer_id='.$peer_id.'&v=5.92&access_token='.$token);
	$count = count($getConversationMembers['items']);
	$user_id = $getConversationMembers['items'][rand(0,$count-1)]['member_id'];
	$UserFirstName = UsersGet($user_id,'first_name');
	return 'Я думаю это [id'.$user_id.'|'.$UserFirstName.']';
}
function AnekdotRu($type = false){
	require_once('modules/simple_html_dom/simple_html_dom.php');
	$type = empty($type) ? 'anekdot' : $type;
	$html = file_get_html('https://www.anekdot.ru/random/'.$type.'/');
	$message = '';
	$search = $html->find('div [class=text]',1);
	$message = $search->plaintext;
	$html->clear();
	unset($html);
	return htmlspecialchars_decode($message);
}
function RandstuffRu($type = false){
	require_once('modules/simple_html_dom/simple_html_dom.php');
	$type = empty($type) ? 'fact' : $type;
	$html = file_get_html('https://randstuff.ru/'.$type.'/');

	$message = '';
	$search = $html->find('div [id='.$type.'] table ',0);

	$message = $search->plaintext;
	$html->clear();
	unset($html);
	return htmlspecialchars_decode($message);
}
function FoafVK($user_id){
	global $Nick;
	$r = simplexml_load_file("http://vk.com/foaf.php?id=".$user_id); //куда обращаемся
	$name = (string) $r->xpath('//foaf:name')[0]; 
	if(!empty($name)){
		$t = (string) $r->xpath('//ya:created/@dc:date')[0]; //берем дату регистрации пользователя
		$d = str_replace('-', '.', $t);
		$d = str_replace('T', ' ', $t);
		$message = 'Дата регистрации пользователя [id'.$user_id.'|'.$name.']:<br>'.substr($d,0,strpos($d,'+'));
	}else{
		$message = $Nick.', пользователя не существует.';
	}
	return $message;
}
function ZagadkaAnswer($text){
	global $UserInfo,$Nick;
	$TrueAnswer = GetJsonValue('zagadki','true_answer');
	$lvl = GetJsonValue('zagadki','exp');
	$exp = GetJsonValue('zagadki','lvl');
	if(!empty($text)){
		if($text == $TrueAnswer && $TrueAnswer != 'def'){
			$reward = SwitchRewardZagadka();
			SetFieldF('dollar',$UserInfo['dollar'] + $reward);
			$message = $Nick.', вы угадали! <br>+'.ConvertValute($reward).SwitchEmoji('dollar');
			AddJsonValue('zagadki','true_answer','def');
			if(($exp+1)% 50 == 0){
				if($lvl == 0){
					AddJsonValue('zagadki','lvl',1,'+');
				}
				AddJsonValue('zagadki','lvl',1,'+');
			}
			AddJsonValue('zagadki','exp',1,'+');
		}elseif($TrueAnswer == 'def'){
			$message = $Nick.', напишите "загадка"';
		}else{
			$message = $Nick.', неправильный ответ!';
		}
	}
	return $message;
}
function SwitchRewardZagadka(){
	global $UserInfo;
	$lvl = GetJsonValue('zagadki','lvl');
	$reward = floor (pow($lvl,2) + 10);
	return $reward;
}
function Zagadka(){
	global $Nick;
	$href = 'http://zagadka.pro/'.rand(1,4000).'.html';
	$page = file_get_contents($href);
	preg_match("/<p>(.*)<\/p>/", $page, $match);
	preg_match("/<font color=\"red\"><b>(.*)<\/b><\/font>/", $page, $match1);

	$zagadka =  str_replace(array('<p>','</p>'),'',ToUTF($match[0]));
	
	
	$otvet =  str_replace(array('<font color="red">','<b>','</b>','</font>'),'',ToUTF($match1[0]));
	$otvet =  mb_strtolower($otvet,"UTF-8");
	AddJsonValue('zagadki','true_answer',$otvet);
	return $Nick.', загадка:<br>'.$zagadka;
}

function ToUTF($text){
		return mb_convert_encoding($text,'UTF-8','cp-1251');
	}
function SearchDoc($q){
	global $UserInfo,$Nick,$token,$peer_id;
	$j = 10;
	$gifs = array();
	if($j >0){
		$docs_search = api('docs.search?q='.urlencode($q).'&search_own=0&count=50&v=5.87&access_token='.$token);
		for($i=0;$i<$j;$i++){
			$rand = rand(0,49);
			$docAdress = $docs_search['items'][$rand]['owner_id'].'_'.$docs_search['items'][$rand]['id'];
			if($failed>=2){
				if($count>0){
					SellMsg($peer_id,$Nick.', гиф по запросу "'.$q.'"');
					return substr($attach, 0,iconv_strlen($attach)-1);
				}else{
					SellMsg($peer_id,$Nick.', гиф по запросу "'.$q.'" ❌не найдено❌');
					return;
				}
				
			}elseif($docs_search['items'][$rand]['ext'] == 'gif' && !in_array($docAdress, $gifs)){
				array_push($gifs, $docAdress);
				$attach .= 'doc'.$docAdress.',';
				$count++;
			}else{
				$i--;
				$failed++;
			}
		}
		SellMsg($peer_id,$Nick.', гиф по запросу "'.$q.'"');
		return substr($attach, 0,iconv_strlen($attach)-1);
	}else{
		SellMsg($peer_id,$Nick.', прокачайте гиф в разделе "🌀Скиллы"');
	}
}
?>
