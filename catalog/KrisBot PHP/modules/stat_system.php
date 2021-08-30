<?php
class STAT{
	public static function add($uid,$element, $value){
		$st=get("modules/base/statistics.json");
		//if(!isset($st[$uid][$element]))$st[$uid][$element]=0;
		$st[$uid][$element]=$value;
		file_put_contents("modules/base/statistics.json", json_encode($st,JSON_UNESCAPED_UNICODE));
	}
	public static function plus($uid,$element, $value){
		$st=get("modules/base/statistics.json");
		if(!isset($st[$uid][$element]))$st[$uid][$element]=0;
		$st[$uid][$element]+=$value;
		file_put_contents("modules/base/statistics.json", json_encode($st,JSON_UNESCAPED_UNICODE));
	}
		public static function all($element, $value){
		$st=get("modules/base/statistics_all.json");
		if(!isset($st[$element]))$st[$element]=0;
		$st[$element]+=$value;
		file_put_contents("modules/base/statistics_all.json", json_encode($st,JSON_UNESCAPED_UNICODE));
	}
	public static function stata($element, $value){
		$st=get("modules/base/statistics_all.json");
		if(!isset($st['st'][$element]))$st['st'][$element]=0;
		$st['st'][$element]+=$value;
		file_put_contents("modules/base/statistics_all.json", json_encode($st,JSON_UNESCAPED_UNICODE));
	}
		public static function minus($uid,$element, $value){
		$st=get("modules/base/statistics.json");
		if(!isset($st[$uid][$element]))$st[$uid][$element]=0;
		$st[$uid][$element]-=$value;
		file_put_contents("modules/base/statistics.json", json_encode($st,JSON_UNESCAPED_UNICODE));
	}
	public static function get($uid){
		$st=get("modules/base/statistics.json")[$uid];
		return $st;
	}
}
?>