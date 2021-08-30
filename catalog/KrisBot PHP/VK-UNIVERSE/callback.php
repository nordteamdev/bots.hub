<?php
class VK_Callback
{
function __construct($token){$this->token=$token;}

function _callback_okResponse() {
  	$this->_callback_response('ok');
}
function _callback_response($data) {
  	echo $data;
  	exit();
}
function init($list){
		$data = json_decode(file_get_contents('php://input')); 
		if($data->type == "confirmation")
		{
    		echo $this->settings['confirmation']; 
    		exit;
    	}elseif ($data->type == "message_new" and isset($list["message_new"])) {
    		global $msg;
			$msg = $data->object;
			global $vkue;
			
    		if(isset($list['message']))$list['message']($vkue, $msg);	
				$vkue->check();
				foreach($list['message_new'] as $cmd){
					if(isset($cmd['r']) and regex($cmd['r'])) {
						$cmd['f']($vkue, $msg);
						$this->_callback_okResponse();
					}
				}
				$this->_callback_okResponse();
		}elseif(isset($list[$data->type])){
			global $msg;
			$msg = $data->object;
			$list[$data->type]($this, $msg);
			$this->_callback_okResponse();
		}
	}
}