<?php
class VK_Upload
{
function __construct($token){$this->token=$token;}
	
function doc($arr){
		global $vkue;
		if(!isset($arr['filename'])){
				$arr['filename'] = "audio.ogg";
			}
			if(!isset($arr['args']))$args = [];
			if(isset($arr['args']))$args = $arr['args'];
			$doc = $vkue->api->docs_getWallUploadServer($args);
			$json = $this->up($doc["response"]["upload_url"], "file", $arr['params'], $arr['filename']);
			$reply = $vkue->api->docs_save(["file" => $json['file']])['response'][0];
			return "doc".$reply['owner_id']."_".$reply['id'];
	}

function photo($arr){
		global $vkue;
		if(!isset($arr['filename'])){
				$arr['filename'] = "photo.jpg";
			}
			if(!isset($arr['args']))$args = [];
			if(isset($arr['args']))$args = $arr['args'];
			$photosgetUploadServer = $vkue->api->photos_getMessagesUploadServer($args);
			$json = $this->up($photosgetUploadServer["response"]["upload_url"], "photo", $arr['params'], $arr['filename']);
			$prms=["hash" => $json["hash"], "server" => $json["server"], "photo" => $json["photo"]];
			if(isset($arr['args']['group_id']))$prms['group_id']=$arr['args']['group_id'];
			$reply = $vkue->api->photos_saveMessagesPhoto($prms)["response"][0];
			return "photo".$reply['owner_id']."_".$reply['id'];
	}

	function up($url, $name, $dt ,$filename){
		if(isset($dt['url'])){
			$boundary = uniqid();
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTPHEADER, Array('Content-Type: multipart/form-data; boundary=' . $boundary));
			$post  = "\n--$boundary\nContent-Disposition: form-data; name=\"$name\"; filename=\"$filename\"\n\n";
			$post .= file_get_contents($dt['url']);
			$post .= "\r\n--" . $boundary . "--\r\n";
			curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
			$data = json_decode(curl_exec($ch), true);
			return $data;
		}
		if(isset($dt['file'])){
			$file = dirname(__FILE__)."/".$dt['file'];
			$cfile = curl_file_create($file,'image/jpeg',$file);
			$curl=curl_init();
			curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => $url,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => array($name => $cfile)
			));
			$response = curl_exec($curl);
			curl_close($curl);
			$json=json_decode($response,true);
			return $json;
		}
	}
}