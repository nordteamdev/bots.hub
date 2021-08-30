<?php
class AntiCaptcha
{	
	private static $init = false, $key, $server;
	
	public static function init($server, $key)
	{
		if(self::$init === false)
		{
			self::$server = $server;
			self::$key = $key;
			
			return self::$init = true;
		}
		return false;
	}
	
	public static function inited()
	{
		return self::$init;
	}
	
	public static function vk($url)
	{
		if(self::$init === true)
		{
			$body = file_get_contents($url);
			$result = self::recognize(base64_encode($body), self::$key, false, self::$server, 5, //Ожидание времени перед проверкой решена ли капча
				60, //Макс. время ожидания
				0, //Одно слово (0 по умолчанию - одно слово, 1 имеет два слова)
				0, //Регистр не имеет значения (0 по умолчанию - не имеет, 1 имеет значение)
				false, //Состоит ли только из цифр
				4, //Мин. длина
				10, //Макс. длина
				2 //Язык (0 по умолчанию - не задействован, 1 на капче только кирилица А-Я, 2 на капче только латинские буквы A-Z)
			);
			if($result == 'ERROR_WRONG_USER_KEY')
			{
				notif('AntiCaptcha', 'Wrong key.');
				//exit;
			}elseif($result == 'ERROR_ZERO_BALANCE')
			{
				notif('AntiCaptcha', 'Zero balance!');
				//exit;
			}elseif($result == 'ERROR_KEY_DOES_NOT_EXIST')
			{
				notif('AntiCaptcha', 'Key does not exists!');
				//exit;
			}elseif($result == 'ERROR_NO_SLOT_AVAILABLE')
			{
				notif('AntiCaptcha', 'No slot available. Try to up Bet on captcha!');
				//exit;
			}elseif($result == 'ERROR_IP_NOT_ALLOWED')
			{
				notif('AntiCaptcha', 'IP not allowed!');
				//exit;
			}elseif($result == 'IP_BANNED')
			{
				notif('AntiCaptcha', 'IP BANNED!');
				//exit;
			}else{
				return $result;
			}
		}
		return false;
	}
	public static function getBalance(){
		return json_decode(file_get_contents('http://rucaptcha.com/res.php?key='.self::$key.'&action=getbalance'),1);
	}
	private static function recognize(
            $body,
            $apikey,
            $is_verbose = true,
            $domain="rucaptcha.com",
            $rtimeout = 5, //Ожидание времени для решения капчи
            $mtimeout = 120, //Макс. время ожидания
            $is_phrase = 0, //Одно слово (0 по умолчанию - одно слово, 1 имеет два слова)
            $is_regsense = 0, //Регистр не имеет значения (0 по умолчанию - не имеет, 1 имеет значение)
            $is_numeric = 0, //Цифры
            $min_len = 0, //Мин. длина
            $max_len = 0, //Макс. длина
            $language = 0, //Язык (0 по умолчанию - не задействован, 1 на капче только кирилица А-Я, 2 на капче только латинские буквы A-Z)
            $execute=null
			){
		$postdata = array(
			'method'    => 'base64', 
			'key'       => $apikey, 
			'body'      => $body,
			'phrase'	=> $is_phrase,
			'regsense'	=> $is_regsense,
			'numeric'	=> $is_numeric,
			'min_len'	=> $min_len,
			'max_len'	=> $max_len,
			'language'	=> $language
			
		);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,             "http://$domain/in.php");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,     1);
		curl_setopt($ch, CURLOPT_TIMEOUT,             60);
		curl_setopt($ch, CURLOPT_POST,                 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS,         $postdata);
		$result = curl_exec($ch);
		if (curl_errno($ch)) 
		{
			if ($is_verbose) echo "CURL returned error: ".curl_error($ch)."\n";
			return false;
		}
		curl_close($ch);
		if (strpos($result, "ERROR")!==false)
		{
			if ($is_verbose) echo "server returned error: $result\n";
			return $result;
		}
		else
		{
			$ex = explode("|", $result);
			$captcha_id = $ex[1];
			if ($is_verbose) echo "captcha sent, got captcha ID $captcha_id\n";
			$waittime = 0;
			if ($is_verbose) echo "waiting for $rtimeout seconds\n";
			sleep($rtimeout);
			while(true)
			{
				if( is_callable($execute) ) $execute();
				$result = file_get_contents("http://$domain/res.php?key=".$apikey.'&action=get&id='.$captcha_id);
				if (strpos($result, 'ERROR')!==false)
				{
					if ($is_verbose) echo "server returned error: $result\n";
					return false;
				}
				if ($result=="CAPCHA_NOT_READY")
				{
					if ($is_verbose) echo "captcha is not ready yet\n";
					$waittime += $rtimeout;
					if ($waittime>$mtimeout) 
					{
						if ($is_verbose) echo "timelimit ($mtimeout) hit\n";
						break;
					}
					if ($is_verbose) echo "waiting for $rtimeout seconds\n";
					sleep($rtimeout);
				}
				else
				{
					$ex = explode('|', $result);
					if (trim($ex[0])=='OK') return trim($ex[1]);
				}
			}
			
			return false;
		}
	}
}
?>