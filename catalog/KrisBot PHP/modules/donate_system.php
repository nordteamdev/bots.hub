<?php
$donates_lvl=['user'=>0,'vip'=>1,'helper'=>2,'moder'=>3,'tester'=>4,'admin'=>4,'dev'=>5];
class donate{
	public static function get($uid){
		$donates=json_decode(file_get_contents('modules/base/donates.json'),1);
		if(isset($donates[$uid])){
			return $donates[$uid];
		}
		return 'User';
	}
	public static function getname($uid){
		$donate = self::get($uid);
		if($donate=='User')return 'Пользователь';
		if($donate=='vip')return 'VIP';
		if($donate=='helper')return 'Хелпер';
		if($donate=='moder')return 'Модератор';
		if($donate=='admin')return 'Администратор';
		if($donate=='dev')return 'Разработчик';
	}
	public static function getlvl($uid){
		global $donates_lvl;
		$donates=json_decode(file_get_contents('modules/base/donates.json'),1);
		if(isset($donates[$uid])){
			$donate= $donates[$uid];
		}else{
			$donate = 'user';
		}
		return $donates_lvl[$donate];
	}
	public static function getlvls(){
		global $donates_lvl;
		return $donates_lvl;
	}
	public static function set($uid, $donate){
		$donates=json_decode(file_get_contents('modules/base/donates.json'),1);
		$donates[$uid]=$donate;
		file_put_contents('modules/base/donates.json', json_encode($donates));
	}
}
?>