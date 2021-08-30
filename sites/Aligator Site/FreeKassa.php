<?php

  class FreeKassa{

  	private $secret_one;
  	private $secret_two;
  	private $shop_id;

  	public function __construct($shop_id, $secret_one, $secret_two = null){
  	  	$this->shop_id = $shop_id;
  	  	$this->secret_one = $secret_one;
  		$this->secret_two = ($secret_two == null) ? $secret_one : $secret_two;
  	}

  	public function buildPayUrl($price, $order_id, $sell_id){
  		$price = "$price.00";
  		return "http://www.free-kassa.ru/merchant/cash.php?".http_build_query(array(
  			"m" => $this->shop_id,
  			"oa" => $price,
  			"o" => $order_id,
  			"s" => md5($this->shop_id.":".$price.":".$this->secret_one.":".$order_id),
  			"us_sell" => $sell_id
  		));
  	}

  	public function checkIP($ip){
  		return in_array($ip, [""]);
  	}

  	public function getIP(){
  		return (isset($_SERVER['HTTP_X_REAL_IP'])) ? $_SERVER['HTTP_X_REAL_IP'] : $_SERVER['REMOTE_ADDR'];
  	}

  	public function checkSign($uid, $price, $sign){
  	  return ($sign == md5($this->shop_id.":".$price.":".$this->secret_two.":".$uid)) ? true : false;
  	}

  }

?>
