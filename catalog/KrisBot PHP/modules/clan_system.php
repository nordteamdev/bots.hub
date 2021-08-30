<?php
class Clans
{
	public static function create($name, $user_id, $open=1){
		$clans = get("modules/base/clans.json");
		if(!isset($clans[$name])){
			$clans[$name]=['name'=>$name,'owner_id'=>$user_id, 'users'=>[$user_id=>'owner'], 'open'=>$open];
			$clans_cache = get("modules/base/clans_owners.json");
			$clans_cache[$user_id]=$name;
			file_put_contents("modules/base/clans_owners.json", json_encode($clans, JSON_UNESCAPED_UNICODE));
			file_put_contents("modules/base/clans.json", json_encode($clans, JSON_UNESCAPED_UNICODE ));
			return true;
		}else{return false;}
	}
	public static function remove($name){
		$clans = get("modules/base/clans.json");
		$clans_cache = get("modules/base/clans.json");
		if(isset($clans[$name])){
			unset($clans[$name]);
			unset($clans_cache[self::getOwner($name)]);
			file_put_contents("modules/base/clans_owners.json", json_encode($clans_cache, JSON_UNESCAPED_UNICODE));
			file_put_contents("modules/base/clans.json", json_encode($clans, JSON_UNESCAPED_UNICODE));
			return true;
		}else{return false;}
	}
	public static function addUser($name, $user_id){
		$clans = get("modules/base/clans.json");
		if(isset($clans[$name])){
			$clan_info=$clans[$name];
			$clans[$name]['users'][$user_id]='user';
		 	file_put_contents("modules/base/clans.json", json_encode($clans, JSON_UNESCAPED_UNICODE));
		}
	}
	public static function kickUser($name, $user_id){
		$clans = get("modules/base/clans.json");
		if(isset($clans[$name])){
			if(isset($clans[$name]['users'][$user_id])){unset($clans[$name]['users'][$user_id]);}
		 	file_put_contents("modules/base/clans.json", json_encode($clans, JSON_UNESCAPED_UNICODE));
		}
	}
	public static function getInvites($uid){
		$clans_ivites = get("modules/base/clans_ivites.json");
		if(isset($clans_ivites[$uid])){return $clans_ivites[$uid];}
		return false;
	}
	public static function unInvite($uid){
		$clans_ivites = get("modules/base/clans_ivites.json");
		if(isset($clans_ivites[$uid])){unset($clans_ivites[$uid]); file_put_contents("modules/base/clans_ivites.json", json_encode($clans_ivites, JSON_UNESCAPED_UNICODE));}
		return false;
	}
	public static function invite($name, $uid, $inv_id){
		$clans = get("modules/base/clans.json");
		$clans_ivites = get("modules/base/clans_ivites.json");
		if(isset($clans[$name])){
			$clans_ivites[$uid][0]=['name'=>$name,'inv_id'=>$inv_id];
		 	file_put_contents("modules/base/clans_ivites.json", json_encode($clans_ivites, JSON_UNESCAPED_UNICODE));
		}
	}
	public static function join($name, $uid){
		$clans_ivites=get('modules/base/clans_ivites.json');
			if(isset($clans_ivites[$uid])){
				foreach ($clans_ivites[$uid] as $key => $invite) {
					if(isset($invite['name']) and $invite['name']==$name){
						self::addUser($name, $uid);
						unset($clans_ivites[$uid]);
						file_put_contents("modules/base/clans_ivites.json", json_encode($clans, JSON_UNESCAPED_UNICODE));
						break;
					}
			}
		}
	}
	public static function check($uid){
		$clans = get("modules/base/clans.json");
		foreach ($clans as $key => $clan) {
			if(isset($clan['users'][$uid])){return $clans[$key];}
		}
		return false;
	}
	public static function is_owner($uid){
		if(self::check($uid)){
			$clans = get("modules/base/clans.json");
			return self::check($uid);
		}
		return false;
	}
	public static function setStatus($name, $status){
		$clans = get("modules/base/clans.json");
		if(isset($clans[$name])){
			$clan_info=$clans[$name];
			$clans[$name]['open']=$status;
		 	file_put_contents("modules/base/clans.json", json_encode($clans, JSON_UNESCAPED_UNICODE));
		}
	}
	public static function get(){
		$clans = get("modules/base/clans.json");
		return $clans;
	}
	public static function getByName($name){
		$clans = get("modules/base/clans.json");
		if(isset($clans[$name])){
			return $clans[$name];
		}else{return false;}
	}
	public static function getOwner($name){
		$clans_owners = get("modules/base/clans_owners.json");
		return $clans_owners[$name];
	}
}

?>