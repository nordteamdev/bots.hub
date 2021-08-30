<?php
class API{
	public function __construct($token) {
		$this->token=$token;
		
	}
	public function __call($method, $args=[]) {
		global $vkue;
		$method = str_ireplace("_", ".", $method);
	  	while(true){
	  		if(isset($args[0]))$args=$args[0];
	  		$args['v'] = '5.68';
	  		if(!isset($args['access_token']))
	  			$args['access_token'] = $this->token;

	  		$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, 'https://api.vk.com/method/'.$method);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FORBID_REUSE , false);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($args));
			$result = json_decode(curl_exec($ch), true);
			if(!is_array($result)){
				continue;
			}
			
			//file_put_contents('api.log', $method.">>".json_encode($args,JSON_UNESCAPED_UNICODE).">>".json_encode($result, JSON_UNESCAPED_UNICODE)."\n", FILE_APPEND);
			if(isset($result['error']))
				if(isset($vkue->error_handler)){
					if($result['error']['error_code']==6){
						usleep(334000);
						continue;
					}
					$data = call_user_func($vkue->error_handler, $result['error']);
					if($data == "retry"){
						continue;
					}elseif(is_array($data))
					{
						if($data[0] == "retry")
						{
							if(is_array($data[1]))
								if(isset($args)){
									$args = array_merge($args, $data[1]);
								}else{
									$args = $data[1];
								}
							continue;
						}
					}
				}
			return $result;
		}
    }
}
?>