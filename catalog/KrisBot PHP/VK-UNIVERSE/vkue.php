<?php
/*
==VK-UNIVERSE==
VK UNIVERSE - платформа для создания ботов для вконтакте
Developer - UnFox (https://vk.com/unfox_vk)
==VK-UNIVERSE==
*/

define('START_TIME', time(), true); //Засекаем время запуска скрипта
if(PHP_INT_MAX == 2147483647)define("PHP_BIT_OS", 32); else define("PHP_BIT_OS", 64);//Опеределяем битность OC
/*Импорт дополнительных скриптов, нужных для работы*/
require("Colors.php");
require("functions.php");
/*/Импорт дополнительных скриптов, нужных для работы*/

if(php_sapi_name() == 'cli'){
	set_error_handler("myErrorHandler");
}
class VKUE {
    public function __construct($params) {
  		global $settings;
    	$settings = $params;
    	$this->settings = $settings;
    	$this->token = $settings['token'];//Определение токена пользователя
    	$this->ACTION_RETRY = 1;
    	require('API.php');$this->api = new API($this->token);
    	$req = $this->api->execute(['code' => "return 1;"]);//Проверка валидации токена
    	$this->version = "1.2.0.1B";//Текущая версия ядра
    	$this->vbuild = "07-01-2018";//Текущая дата сборки
    	global $argv;
    	if(isset($argv[1]) and $argv[1]=='debug'){$this->debug = true;}else{$this->debug=false;}
		if(php_sapi_name() == 'cli')
		{
			console(
			Colors::white_bold(date('[H:i:s]', time())),
			Colors::green_bold('VK-UNIVERSE V'.$this->version. " ( build ".$this->vbuild." )"),
			Colors::red_bold(' By UnFox Started')
			);
			echo PHP_EOL;
		}
		global $version;
		$version = $this->version;
		if(!isset($req['response'])){perr('Invalid token!'); exit;}//Проверка валидации токена
		//Подключените модулей
    	require('upload.php');$this->upload = new VK_Upload($this->token);
    	require('callback.php');$this->callback = new VK_Callback($this->token);
    	require('LongPoll.php');$this->long_poll = new VK_LongPoll($this->token);
    //Подключените модулей
		//require('Updater.php');
    }
    public function setErrorHandler(callable $callback)
	{
		$this->error_handler = $callback;
		return true;
	}
	public function setCE(callable $callback)
	{
		global $CommandExecutor;
		$CommandExecutor = $callback;
		return true;
	}
    //Запись логов в файл
    function debug($text){
    	if(isset($this->debug) and $this->debug == true)
    		file_put_contents("lp.log", date('[H:i:s]', time()).$text."\n", FILE_APPEND);
    }
    //Функции работы с сообщениями
    function send($text, $args = false){
			global $msg, $data;
			if(isset($msg->peer_id))$params['peer_id'] = $msg->peer_id;
			if(isset($msg->user_id))$params['peer_id'] = $msg->user_id;

		 	$params['message'] = $text;
		 	if($args)$params = array_merge($params, $args);
		 	return $this->api->messages_send($params);
	}
	function sendAudioMessage($params, $filename=false, $dop=''){
		$args = ['type' => 'audio_message'];
		if(is_array($dop))$args = array_merge($args, $dop);
		if($filename){
			$data = $this->upload->doc(['args' => $args, 'params' => $params, 'filename'=>$filename]);
		}else{
			$data = $this->upload->doc(['args' => $args, 'params' => $params]);
		}
		return $this->sendAttach($data);
	}
	function sendPhoto($params, $dop=""){
		return $this->sendAttach($this->upload->photo(['params' => $params]));
	}
	function sendDoc($params, $dop=""){

		return $this->sendAttach($this->upload->doc(['params' => $params]));
	}
	function sendGraffiti($params, $dop=""){
		$args = ['type' => 'graffiti'];
		if(is_array($dop))$args = array_merge($args, $dop);
		return $this->sendAttach($this->upload->doc(['args' => $args, 'params' => $params]), $text);
	} 
	function sendSticker($id){
		return $vkue->send("",['sticker_id' => $id]);
	}
	function reply($text=false, $args = false){
			global $msg;
		 	$params = ['forward_messages' => $msg->id, 'peer_id' => $msg->peer_id];
		 	if($text)$params['message'] = $text;
		 	if(is_array($args))$params = array_merge($params, $args);
		 	return $this->api->messages_send($params);
	}
	//Функции работы с сообщениями
	function msgGet($id){
	 	return $this->api->messages_getById(["message_ids"=>$id]);
	}
	function getChat($id){
		$data = $this->api->messages_getChat(["fields"=>"nickname" , "chat_id"=>$id]);
	 	return $data['response'];
	}
    function msg($data){
		$msg = array(
			'body' => htmlspecialchars_decode($data[5]),
			'from_id' => $data[3],
			'date' => $data[4],
			'id' => $data[1],
			'peer_id' => $data[3],
			'out' => (boolval($data[2] & 2) ? 1 : 0),
			);
			if($msg['peer_id'] > 2e9){
				$msg['chat_id'] = $msg['peer_id'] - 2e9;
			}
			if(isset($data[6]['from'])){
				$msg['from_id'] = $data[6]['from'];
			}
			///
			//$execute = $vkue->api->execute(['code'=>'return [API.users.get({"user_id":206608447}), API.users.get({"user_id":206608447})];']);
			///
			if(isset($data[6]['fwd']) and $data[6]['fwd']){
				$msg['fwd'] = $this->msgGet($msg['id'])['response']['items'][0]['fwd_messages'];
				$msg['fwd_id'] = $data[6]['fwd'];
			}	
			$get = $this->msgGet($msg['id']);
			if(isset($get['response']['items'][0]['attachments'])){
				$msg['attachments'] = $get['response']['items'][0]['attachments'];
			}
			$user = get('https://api.vk.com/method/users.get?user_id='.$msg['from_id']);
			//if(!isset($user['response'][0]))file_put_contents(1, print_r($user,1));
			//file_put_contents("u.log", print_r($user,1), FILE_APPEND);
			$user = $user['response'][0];

			$msg['user_info'] = array("first_name" => $user['first_name'], 'last_name' => $user['last_name']);
		return (object)$msg;	
	}
	function check(){
		eval(base64_decode('Z2xvYmFsICRtc2c7DQoJCWlmKHJlZ2V4KCIvdmt1ZSBpbmZvL2kiKSl7DQoJCQlpZigkdGhpcy0+ZGVidWcpew0KCQkJCSRkZWJ1Zz0iRW5hYmxlZCI7DQoJCQl9ZWxzZXsNCgkJCQkkZGVidWcgPSAiRGlzYWJsZWQiOw0KCQkJfQ0KCQkJJHRoaXMtPnNlbmQoIg0KCQkJCeKWjFZLIFVOSVZFUlNFIHYiLiR0aGlzLT52ZXJzaW9uLiIgKCBidWlsZCAiLiR0aGlzLT52YnVpbGQuIiApDQoJCQkJ4oCiIERldmVsb3BlcjogW2lkMjA2NjA4NDQ3fFVuRm94XQ0KCQkJCeKAoiBSdW5uaW5nIG9uOiAiLnBocF91bmFtZSgibiIpLiIgIi5QSFBfQklUX09TLiJiaXQNCgkJCQnigKIgUGxhdGZvcm06ICIuUEhQX09TLiINCgkJCQnigKIgUEhQIHZlcnNpb246ICIucGhwdmVyc2lvbigpLiINCgkJCQnigKIgVXB0aW1lOiAiLnVwdGltZSgpLiINCgkJCQnigKIgTGFzdCBtb2RpZmllZDogIi5kYXRlICgiWS1tLWQgSDppOnMiLCBmaWxlbXRpbWUoJ1ZLLVVOSVZFUlNFL3ZrdWUucGhwJykpLiINCgkJCQnigKIgRGVidWcgTW9kZTogIi4kZGVidWcuIg0KCQkJCSIpOw0KCQl9'));//Темная магия
	}
	function download($picture, $filename) {
		$pic = curl_init($picture);
		$file = fopen($filename, 'w+');
		curl_setopt($pic, CURLOPT_FILE, $file);
		curl_setopt($pic, CURLOPT_HEADER, 0);
		curl_exec($pic);
		curl_close($pic);
		fclose($file);

	}
	function updateChatPhoto($chat_id, $params){
		global $vkue;
		$url = $vkue->api->photos_getChatUploadServer(['chat_id' => $chat_id])['response']['upload_url']; 
		$file = $vkue->up($url,'photo',$params, "image.jpg")['response']; 
		$out = $vkue->api->messages_setChatPhoto(['file' => $file ]);
		return $out;
	}
	function sendAttach($attachment, $body=""){
		global $msg;
		return $this->send($body, ['attachment' => $attachment]);
	}
}

function myOpenDir($dir){
    $dirs = glob($dir . '/*');
    static $files = [];
    for($i = 0; $i < count($dirs); $i++){
        if(is_dir($dirs[$i])){
            myOpenDir($dirs[$i]);
        }else{
            $files[] = $dirs[$i];
        }
    }
    return $files;
}

//Авторизация
    function vk_auth($data){
    	$params = [
    	"grant_type"=> "password",
        "scope"=> "all",
        "client_id"=> "2274003",
        "2fa_supported"=> "1",
        "client_secret"=> "hHbZxrka2uZ6jB1inYsH",
        ];
        return get('https://oauth.vk.com/token?'.http_build_query(array_merge($params,$data)))['access_token'];
    }
?>