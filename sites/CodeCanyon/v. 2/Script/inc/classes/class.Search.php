<?php

/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
       						        

 
class Search extends _global_co {

public $key;
public $userid;
public $time;
public $result;

// search query
public $online_interval;
public $filterbox;
public $gender;
public $fromage;
public $toage;
public $birthday;
public $location;
 
public $online;
public $withphoto;
public $relationship;
public $beliefs;

public $search_tpl_filterBox;
public $search_tpl;
private $search_header;
private $categ;

// construct
public function __construct(){

//the old building from parent class
parent::__construct();

$this->userid = isset($this->USER['id']) ? $this->USER['id'] : 0;
$this->time = time();
$this->key = isset($_POST['key']) ? $this->test_input($_POST['key']) : (isset($_GET['key']) ? $this->test_input($_GET['key']) : '');
$this->artist_id = isset($_POST['artist_id']) ? $this->test_input($_POST['artist_id']) : (isset($_GET['artist_id']) ? $this->test_input($_GET['artist_id']) : '');
$this->filterbox = isset($_POST['filterbox']) && $this->is_ajax ? 1 : (isset($_GET['filterbox']) && $this->is_ajax ? 1 : 0);
$this->categ = isset($_POST['c']) ? $this->test_input($_POST['c']) : (isset($_GET['c']) ? $this->test_input($_GET['c']) : 0);
$this->online_interval = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");

// vars .. people filtering
$this->gender = isset($_POST['gender']) ? (int) $this->test_input($_POST['gender']) : (isset($_GET['gender']) ? (int) $this->test_input($_GET['gender']) : 0);
$this->fromage = isset($_POST['fromage']) ? (int) $this->test_input($_POST['fromage']) : (isset($_GET['fromage']) ? (int) $this->test_input($_GET['fromage']) : 0);
$this->toage = isset($_POST['toage']) ? (int) $this->test_input($_POST['toage']) : (isset($_GET['toage']) ? (int) $this->test_input($_GET['toage']) : 0);

$this->bday = isset($_POST['bday']) ? (int) $this->test_input($_POST['bday']) : (isset($_GET['bday']) ? (int) $this->test_input($_GET['bday']) : 0);
$this->bmonth = isset($_POST['bmonth']) ? (int) $this->test_input($_POST['bmonth']) : (isset($_GET['bmonth']) ? (int) $this->test_input($_GET['bmonth']) : 0);
$this->byear = isset($_POST['byear']) ? (int) $this->test_input($_POST['byear']) : (isset($_GET['byear']) ? (int) $this->test_input($_GET['byear']) : 0);
$this->birthday = $this->byear.'-'.str_pad($this->bmonth, 2, '0', STR_PAD_LEFT).'-'.str_pad($this->bday, 2, '0', STR_PAD_LEFT);


$this->location = isset($_POST['location']) ?  $this->test_input(urldecode($_POST['location'])) : (isset($_GET['location']) ? $this->test_input(urldecode($_GET['location'])) : '');
 
$this->online = isset($_POST['online']) ? (int) $this->test_input($_POST['online']) : (isset($_GET['online']) ? (int) $this->test_input($_GET['online']) : 0);
$this->withphoto = isset($_POST['withphoto']) ? (int) $this->test_input($_POST['withphoto']) : (isset($_GET['withphoto']) ? (int) $this->test_input($_GET['withphoto']) : 0);
$this->relationship = isset($_POST['relationship']) ? (int) $this->test_input($_POST['relationship']) : (isset($_GET['relationship']) ? (int) $this->test_input($_GET['relationship']) : 0);
$this->beliefs = isset($_POST['beliefs']) ? $this->test_input($_POST['beliefs']) : (isset($_GET['beliefs']) ? $this->test_input($_GET['beliefs']) : '');



$this->search_tpl = $this->theme_dir.'/search/search-cnt.html';
$this->search_tpl_filterBox = $this->theme_dir.'/search/search-filter.html';
$this->search_header = $this->theme_dir.'/search/search-header.html';

// categories template
$this->search_tpl_people = $this->theme_dir.'/search/categ/search-people.html'; // people
$this->search_tpl_music = $this->theme_dir.'/search/categ/search-music.html'; // music
$this->search_tpl_video = $this->theme_dir.'/search/categ/search-video.html'; // video
$this->search_tpl_games = $this->theme_dir.'/search/categ/search-games.html'; // games

$this->result = array();
/*
if($_SERVER['REQUEST_METHOD'] === "POST" && !$this->key)
{
	
	echo json_encode($this->result);
	exit;
	
}*/

}


// open video popup
public function search_suggestion(){
	
// search for people
$q = $this->query_select("select DISTINCT (select COUNT(*) from ".tbl_friends." where (userid = '{$this->userid}' AND friendid = u.id AND status='confirmed') OR (userid = u.id AND friendid = '{$this->userid}' AND status='confirmed')) as is_friend,u.online,u.id,u.gender,u.profile_photo as uphoto,TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) AS yearsold,u.fullname from ".tbl_users." u
								left join ".tbl_friends." f ON f.friendid = u.id
															where u.search LIKE N'%{$this->key}%'
															OR u.fullname LIKE N'%{$this->key}%'
															OR u.name LIKE N'%{$this->key}%'
															OR u.surname LIKE N'%{$this->key}%'
														 
															OR u.location LIKE N'%{$this->key}%'
															group by u.id
															order by u.fullname asc
															limit 
															".$this->settings['SEARCH_SUGGESTIONS_LIMIT']);
															
	$arr = array();
		if(count($q)){
			
			foreach($q as $r):
			
			    $u_location = $this->getThisUserLocation($r['id'],1);
				 
				$arr[] = [ "is_friend" => $r['is_friend'] > 0 ? 1 : 0, "id" => $r['id'], "uphoto" => $r['uphoto'], "gender" => $r['gender'], "fullname" => $r['fullname'],"online" => $r['online'], "yearsold" => $r['yearsold'], "location" => $u_location, "on_int" => strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes") ];
			endforeach;
			
		}
	echo json_encode( $arr );														
	 
}
 
 // push param into array and return data for sql
 private function array_push_n_sql (&$array, $key, $value) { 
 
   $array[$key] = $value; 
   $in_query = '';
   
   switch($key){
	   
	   case 'gender':
	   
	   $_rs_gender = $value == '1' ? 'male' : ($value == '2' ? 'female' : '');
	   
	   $in_query = $_rs_gender ? "and u.gender = '{$_rs_gender}'" : '';
	   break;
	   
	   case 'birthday':
	   $e_birthday = $value;
	   
	   if(strpos($e_birthday, '-')){
		   
		$b = explode('-',$e_birthday);
		$byear = (int) $b[0];
		$bmonth = (int) $b[1];
		$bday = (int) $b[2];
		
	    $in_query .= $byear > 0 ? "and Year(u.birthday) = '{$byear}'" : '';
	    $in_query .= $bmonth > 0 ? "and Month(u.birthday) = '{$bmonth}'" : ''; 
	    $in_query .= $bday > 0 ? "and Day(u.birthday) = '{$bday}'" : '';

	   } else {
		  
		  $in_query = $key ? "and u.birthday='{$value}'" : ''; 
	   }
	   break;
	   
	   case 'online':
	   $in_query = "and u.online >= '{$this->online_interval}'";
	   break;
	   
	   case 'withphoto':
	   $in_query = "and (u.profile_photo > 0 && u.profile_photo IS NOT NULL)";
	   break;
	   
	   case 'relationship':
	   $in_query = "";
	   break;
	   
	   // sort by age @from
	   case 'fromage':
	   $in_query = "and TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) >= '{$value}'";
	   break;
	   
	   // sort by age @to
	   case 'toage':
	   $in_query = "and TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) <= '{$value}'";
	   break;
	   
	   default:
	   $in_query = $key ? "and u.{$key}='{$value}'" : '';
	   break;
	    
	   
   }

   return $in_query;
}
 
// search for people
private function search_people($is_json){
	
$this->beliefs = $this->beliefs ? explode(':',$this->beliefs) : '';	
$this->beliefs_a = isarray($this->beliefs) ? $this->beliefs[0] : '';
$this->beliefs_b = isarray($this->beliefs) ? $this->beliefs[1] : '';
	
$error = 0;	 
$pag_params = array();
$_gender = $this->gender ? $this->array_push_n_sql($pag_params,"gender",$this->gender) : 0;
$_fromage = $this->fromage ? $this->array_push_n_sql($pag_params,"fromage",$this->fromage) : 0;
$_toage = $this->toage ? $this->array_push_n_sql($pag_params,"toage",$this->toage) : 0;
$_birthday = $this->birthday ? $this->array_push_n_sql($pag_params,"birthday",$this->birthday) : 0;
$_location = $this->location ? $this->array_push_n_sql($pag_params,"location",$this->location) : 0;


$_online = $this->online ? $this->array_push_n_sql($pag_params,"online",$this->online) : 0;
$_withphoto = $this->withphoto ? $this->array_push_n_sql($pag_params,"withphoto",$this->withphoto) : 0;
$_relationship = $this->relationship ? $this->array_push_n_sql($pag_params,"relationship",$this->relationship) : 0;
$_beliefs = isarray($this->beliefs) ? $this->array_push_n_sql($pag_params,$this->beliefs_a,$this->beliefs_b) : 0;

 

$pag_params_count = count($pag_params);

// reset values to sql
$_gender = $_gender ? $_gender : '';
$_fromage = $_fromage ? $_fromage : '';
$_toage = $_toage ? $_toage : '';
$_birthday = $_birthday ? $_birthday : '';
$_location = $_location ? $_location : '';
 
$_online = $_online ? $_online : '';
$_withphoto = $_withphoto ? $_withphoto : '';
$_relationship = $_relationship ? $_relationship : '';
$_beliefs = $_beliefs ? $_beliefs : '';

// check for params (continue only for numeric values)
if($pag_params_count){
	
	for($i = 0; $i < $pag_params_count;$i++){
		
		if( isset($pag_params[$i]) && !is_numeric($pag_params[$i]))
			$error = 1;
		
		
	}
	
}

if($error && !$is_json){
	
	return 'FALSE';
	exit;
} else if ($error && $is_json){
	
	return json_encode([ "content" => 'FALSE', "page" => 'ERROR!' ]);
	exit;
}

$page_url = "/search?filterbox=1&key=$this->key&page=%s" . ( $pag_params_count ? '&'.http_build_query($pag_params) : '' ); 
$i = isset($this->USER['id']) ? $this->USER['id'] : 0;

// build search query
$withkey = !empty($this->key) ? "and (u.search LIKE N'%$this->key%'
															OR u.fullname LIKE N'%{$this->key}%'
															OR u.name LIKE N'%{$this->key}%'
															OR u.surname LIKE N'%{$this->key}%'
 
															OR u.location LIKE N'%{$this->key}%')" : '';
															
															
// search for people
$sql = "select f.status as is_friend, u.location, u.online, u.id,f.added as fadded, f.relationship as friend_relationship, u.online,u.gender,u.profile_photo as uphoto,TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) AS yearsold,u.fullname from ".tbl_users." u
															left join ".tbl_friends." f ON f.userid = '{$this->userid}' and f.friendid=u.id
															left join ".tbl_users." u2 ON u2.id = f.friendid
														
															where u.id != '{$i}' 
															".$withkey." 
															".$_gender."
															".$_fromage."
															".$_toage."
															".$_birthday."
															".$_location."
													 
															".$_online."
															".$_withphoto."
															".$_relationship."
															".$_beliefs."
															group by u.id
															order by u2.profile_photo desc,u2.fullname asc,u.profile_photo desc, u.fullname asc ";
// search count ... its required for pages function
$q = $this->db->query("select COUNT(id) from ".tbl_users." u
															where u.id != '{$i}' 
															".$withkey." 
															".$_gender."
															".$_fromage."
															".$_toage."
															".$_birthday."
															".$_location."
														 
															".$_online."
															".$_withphoto."
															".$_relationship."
															".$_beliefs."
															group by u.id
															order by u.id");
$count = $q->num_rows;

													
$query = $this->pagination($this->settings['SEARCH_CONTENT_LIMIT'],true,$page_url,$sql,$count);
//$count = $this->db->query("SELECT FOUND_ROWS() as c");
//$count = $count->fetch_array(MYSQLI_ASSOC);

	
$this->template->assign([ "header" => $this->search_header(), "is_online" => $this->online_interval, "filter_box" => $this->filterbox, "pagination" => $query[1], "c" => $count, "q" => $query[0], "this" => $this, "key" => $this->key]); 
$fetch_cnt = $this->template->fetch($this->search_tpl_people);

return $fetch_cnt;

}

// construct search header
private function search_header() {
	
	
// construct header for search 
$this->template->assign([ "categ" => $this->categ, "key" => $this->key, "this" => $this ]);
return $this->template->fetch($this->search_header);	
	
	
}

// extract songs for respective artist
public function getSongsArt($artist){

		return !empty($artist) ? $this->query_select("select * from ".tbl_songs." where `artist`='{$artist}' order by RAND(),added desc limit 100") : [];

}

// search for music
private function search_music() {
$user_id = isset($this->USER['id']) ? $this->USER['id'] : 0;
$filter = isset($_POST['filter']) ? $this->test_input($_POST['filter']) : ( isset($_GET['filter']) ? $this->test_input($_GET['filter']) : '' );	
$q = $found = '';

switch($filter){
	
	case 'artist':
	
	$page_url = "/search?key=$this->key&c=m&filter=artist&page=%s";
	$sql_1 = $this->db->query("select * from ".tbl_songs." where `artist` = '{$this->key}' || `id` = '{$this->artist_id}' group by artist order by artist asc limit 1");
	$query_top_artist = $sql_1->fetch_array(MYSQLI_ASSOC);
	$filter_artist_name = $query_top_artist['artist'];
	
	
    $cr_similar_key = @explode(" ",$this->key);
    $cr_s_ar_count  = count($cr_similar_key);
    $similar_key_th = '';

    $similar_key   = isset($cr_similar_key['0']) && !empty($cr_similar_key['0']) ? $cr_similar_key['0'] : ''; // "OR `artist` LIKE N'%{$cr_similar_key['0']}%'" : '';
	$similar_key = !empty($similar_key) ? "OR `artist` LIKE N'%{$similar_key}%'" : '';
    $similar_key_t = isset($cr_similar_key['1']) && !empty($cr_similar_key['1']) ? $cr_similar_key['1'] : '';//"OR `artist` LIKE N'%{$cr_similar_key['1']}%'" : '';
	$similar_key_t = !empty($similar_key_t) ? "OR `artist` LIKE N'%{$similar_key_t}%'" : '';
    if ($cr_s_ar_count >= 3){
        $similar_key_th = isset($cr_similar_key['2']) && !empty($cr_similar_key['2']) ? $cr_similar_key['2'] : ''; //"OR `artist` LIKE N'%{$cr_similar_key['2']}%'" : '';
		$similar_key_th = !empty($similar_key_th) ? "OR `artist` LIKE N'%{$similar_key_th}%'" : '';
	}
	
	
	
	$sql_2 = "Select * from ".tbl_songs." where 
	(`artist` LIKE N'%{$this->key}%' 
		".$similar_key."
		".$similar_key_t."
		".$similar_key_th."
	) and `artist`!='{$filter_artist_name}'

	group by `artist` order by artist desc limit 100";
	
	//$count = $this->db->query("select COUNT(id) as c from ".tbl_songs." where `artist` LIKE N'%{$this->key}%' group by artist order by artist asc limit 1");
    //$count = $count->fetch_array(MYSQLI_ASSOC);
    //$count = isarray($count) && isset($count['c']) ? (int) $count['c'] : 0;	
	$query = $this->query_select($sql_2);//$this->pagination($this->settings['SEARCH_CONTENT_LIMIT'],true,$page_url,$sql_2,$count);
	$count = count($query);
	$found = $count == 1 ? $this->lang['artist_found'] : $this->lang['artists_found'];

	break;
	
	case 'album':
	
	$page_url = "/search?key=$this->key&c=m&filter=album&page=%s";
	$sql = "select * from ".tbl_songs." where `album` LIKE N'%{$this->key}%' group by album order by id desc";	
	$count = $this->db->query("select COUNT(id) as c from ".tbl_songs." where `album` LIKE N'%{$this->key}%' order by id desc");
    $count = $count->fetch_array(MYSQLI_ASSOC);
    $count = isarray($count) && isset($count['c']) ? (int) $count['c'] : 0;
	$query = $this->pagination($this->settings['SEARCH_CONTENT_LIMIT'],true,$page_url,$sql,$count);
	$found = $count == 1 ? $this->lang['album_found'] : $this->lang['albums_found'];
	
	break;
	
	default:
	case 'tracks':
	
	@list($key_one, $key_two) = @explode(' ', $this->key);
    $key_one = isset($key_one) ? $key_one : $this->key;
    $key_two = isset($key_two) ? $key_two : $this->key;

	$page_url = "/search?key=$this->key&c=m&filter=tracks&page=%s";
	
	// query 
	$sql = "select * from ".tbl_songs."
            where artist like N'%{$this->key}%' or title like N'%{$this->key}%' 
            or artist like N'%{$key_one}%' or title like N'%{$key_one}%' 
			or artist like N'%{$key_two}%' or title like N'%{$key_two}%' 
            group by id order by artist asc";	
		
    // counting for pagination		
	$count = $this->db->query(" select COUNT(id) from ".tbl_songs."
								where artist like N'%{$this->key}%' or title like N'%{$this->key}%' 
								or artist like N'%{$key_one}%' or title like N'%{$key_one}%' 
								or artist like N'%{$key_two}%' or title like N'%{$key_two}%' 
								group by id order by artist asc");
			 
    $count = $count->num_rows;
	$query = $this->pagination($this->settings['SEARCH_CONTENT_LIMIT'],true,$page_url,$sql,$count);
	$found = $count == 1 ? $this->lang['track'] : $this->lang['tracks'];
	
	break;
	
	
}
	

	
$this->template->assign([ "q_top_artist" => $filter === 'artist' ? $query_top_artist : '', "header" => $this->search_header(), "user_id" => $user_id, "found" => $found, "filter" => $filter, "c" => $count, "pagination" => ($filter !== 'artist' ? $query[1] : ''), "q" => ($filter !== 'artist' ? $query[0] : $query), "filter_box" => $this->filterbox, "this" => $this, "key" => $this->key]); 
$fetch_cnt = $this->template->fetch($this->search_tpl_music);

return $fetch_cnt;
	
}
 
// search for video
private function search_video() {

    $filter = isset($_POST['filter']) ? $this->test_input($_POST['filter']) : ( isset($_GET['filter']) ? $this->test_input($_GET['filter']) : '' );	
	$page_url = "/search?key=$this->key&c=v&page=%s";
	
	switch ($filter){
		
	case '':
    default:	
	
	// query for any type of video
	$sql = "select v.*, u.id as uid, u.fullname from ".tbl_videos." v
			left join ".tbl_users." u ON u.id = v.userid
            where v.title like N'%{$this->key}%'
            group by v.id order by v.title asc";	
			
    // counting for pagination		
	$count = $this->db->query(" select COUNT(id) from ".tbl_videos."
								where `title` like N'%{$this->key}%' 
								group by id order by title asc");	
								
	break;

	case 'short':
	
	// query for short videos
	$sql = "select v.*, u.id as uid, u.fullname from ".tbl_videos." v
			left join ".tbl_users." u ON u.id = v.userid
            where v.title like N'%{$this->key}%' and TRIM(LEADING '0' FROM SUBSTRING_INDEX(SUBSTRING_INDEX(v.dur, ':', 1), ':', -1)) <= '1'
            group by v.id order by v.title asc";	
			
    // counting for pagination		
	$count = $this->db->query(" select COUNT(id) from ".tbl_videos."
								where `title` like N'%{$this->key}%' and TRIM(LEADING '0' FROM SUBSTRING_INDEX(SUBSTRING_INDEX(dur, ':', 1), ':', -1)) >= '1'
								group by id order by title asc");	
								
	break;
	
	case 'long':
	
	// query for long videos
	$sql = "select v.*, u.id as uid, u.fullname from ".tbl_videos." v
			left join ".tbl_users." u ON u.id = v.userid
            where v.title like N'%{$this->key}%' and TRIM(LEADING '0' FROM SUBSTRING_INDEX(SUBSTRING_INDEX(v.dur, ':', 1), ':', -1)) > '1'
            group by v.id order by v.title asc";	
			
			
    // counting for pagination		
	$count = $this->db->query(" select COUNT(id) from ".tbl_videos."
								where `title` like N'%{$this->key}%' and TRIM(LEADING '0' FROM SUBSTRING_INDEX(SUBSTRING_INDEX(dur, ':', 1), ':', -1)) > '1'
								group by id order by title asc");			
	
	break;
	
	}

			 
    $count = $count->num_rows;
	$query = $this->pagination($this->settings['SEARCH_CONTENT_LIMIT'],true,$page_url,$sql,$count);
	$found = $count == 1 ? $this->lang['video'] : $this->lang['videos'];
	
$this->template->assign([ "pagination" => $query[1], "query" => $query[0], "c" => $count, "found" => $found, "filter" => $filter, "header" => $this->search_header(), "filter_box" => $this->filterbox, "this" => $this, "key" => $this->key]); 
$fetch_cnt = $this->template->fetch($this->search_tpl_video);

return $fetch_cnt;
	
}

// search for games
private function search_games($key) {
	
	
$this->template->assign([ "header" => $this->search_header(), "filter_box" => $this->filterbox, "this" => $this, "key" => $this->key]); 
$fetch_cnt = $this->template->fetch($this->search_tpl_games);

return $fetch_cnt;
	
}

 
// search content
public function searchContent($key,$categ,$is_json = false){

switch($this->categ){
	
	// people
	default:
	case 'p':
	
	$result = $this->search_people($is_json);
	
	break;
	
	// music
	case 'm':
	
	$result = $this->search_music();
	
	break;
	
	// games
	case 'g':
	
	$result = $this->search_games();
	
	break;
	
	// video
	case 'v':
	
	$result = $this->search_video();
	
	break;
	
}

	$this->template->assign("cnt" , $result);
	
	if(!$is_json){
		
		echo $this->template->display($this->search_tpl);
		
	} else {
		
		$r = $this->template->fetch($this->search_tpl);
		echo $this->getPage($r);
		
	}


 }
 
 // get 5 photos for respective user
 public function getAvatarList($uid){
	$uid = (int) $uid;
	$query = $this->query_select("select SQL_CALC_FOUND_ROWS id from ".tbl_photos." where `userid`='{$uid}' and `albumid`='0' order by position asc,added desc limit 4");
	$count = $this->db->query("SELECT FOUND_ROWS() as c");
	$count = $count->fetch_array(MYSQLI_ASSOC);
	$count = isarray($count) ? $count['c'] : 0;
	return isset($uid) && $uid > 0 ? [$query,$count] : array(); 
	 
	 
 }
 
 // search hints
 public function Hints(){
	 
	 $q = $this->query_select("select distinct `fullname`,`name`,`surname` from ".tbl_users." group by fullname,name,surname");
	 echo json_encode($q);
	 
 }
 
 // get cities for respective country
 public function sgetCitiesForRespectiveCountry($country_id = 0){
	 $q = array();

	 if($country_id)
	 $q = $this->query_select("select id,name from ".tbl_states." where `country_id`='{$country_id}' order by name asc");
	 
	 return $q;
 }
 
 // filter box
 public function getFilterBox(){
	 
	// get all countries 
	$country_query = $this->query_select("select id,name from ".tbl_countries." order by name asc");

	$this->template->assign([ "countries" => $country_query, "this" => $this, "key" => $this->key]);
	$this->template->display($this->search_tpl_filterBox);
 }
 
 // generate blue cover for artist without own cover
 public function artist_cover_lv($cover,$is_album = false){
	 
	 if( strpos($cover, 'artist__redesign') !== false )
		 $cover = !$is_album ? $this->settings['HOST'].'/css/images/gs_muser_stub.png' : $this->settings['HOST'].'/css/images/gs_album_stub.png';
	 
	 return $cover;
 }
 
 // search empty result
 public function searchEmpty($str){
	 
	 $str = '<div class="kn_search_no_results"><div class="ic_search_sad"></div><div class="search_null_str">'.$str.'</div></div>';
	return $str; 
 }

 
 
// user to search history
public function toSearchHistory(){
	
	$uid = isset($_POST['uid']) ? (int) $this->test_input($_POST['uid']) : 0;
	$r = 0;
	if($uid > 0 && $uid !== $this->userid){
		
	// check if user is already in database
	$check = $this->db->query("select `id` from ".tbl_search_history." where `owner`='{$this->userid}' && `userid`='{$uid}' limit 1");
	$check_f = $check->fetch_array(MYSQLI_ASSOC);
	$id = isset($check_f['id']) && $check_f['id'] > 0 ? $check_f['id'] : 0;
	
	if($id){
		
		// if user is already in search history, then update `datetime` to show it first
		$u = $this->query_update("update ".tbl_search_history." set `added`='{$this->time}' where `id`='{$id}'");
		
	} else {
		
		// user not found, insert it
		$u = $this->query_insert("insert into ".tbl_search_history." set `userid`='{$uid}',`owner`='{$this->userid}', `added`='{$this->time}'");
		
	}

		if($u) $r = 1;
	}
	
	return $r;
	
}
 
 // get search history
 public function getSearchHistory(){
	 $arr = array();
	 if($this->userid > 0){
		 
		 $q = $this->query_select("select u.id,u.fullname, u.username,u.profile_photo as uphoto,u.gender,u.online,TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) AS yearsold from ".tbl_search_history." s
		 left join ".tbl_users." u ON u.id = s.userid
		 where s.owner='{$this->userid}' group by u.id order by s.added desc limit ".$this->settings['SEARCH_SUGGESTIONS_LIMIT']);
		 
		
		if(count($q)){
			
			foreach($q as $r):
				$u_location = $this->getThisUserLocation($r['id'],1);
 
				$arr[] = [ "id" => $r['id'], "uphoto" => $r['uphoto'], "gender" => $r['gender'], "fullname" => $r['fullname'], "online" => ($r['online'] > strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes") ? 1 : 0), "yearsold" => $r['yearsold'], "location" => $u_location];
			endforeach;
			
		}
	
	 }
	echo json_encode( $arr );	 
	 
 }
 
} // end class