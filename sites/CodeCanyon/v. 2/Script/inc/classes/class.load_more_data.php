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


class d_load extends _global_co {


public function __construct(){

// the old building from parent class
parent::__construct();

}

// load more friends
public function friends_more($uid,$page = 0,$alpha = ''){

$limit_st = $this->settings['FRIENDS_PER_PAGE_LIMIT']; // from settings
$start = ($page * $limit_st) - $limit_st;
$limit = $page ? "limit {$start},{$limit_st}" : "limit ".$limit_st;

$s = array();

if(!$alpha)
$sql = "select DISTINCT u.id,u.fullname,u.profile_photo,u.online,p.id as pid, p.text as ptext, p.type as ptype from ".tbl_users." u
			  left join ".tbl_posts." p ON p.userid = u.id AND p.available='yes' 
			  where u.id IN (select friendid from ".tbl_friends." where `userid`='$uid' and status='confirmed') 
			  group by u.id
			  order by id desc ".$limit;
else
$sql = "
SELECT SUBSTRING(u.name, 1, 1) as alpha, u.id,u.fullname,u.profile_photo,u.online,p.id as pid, p.text as ptext, p.type as ptype
 from ".tbl_users." u
 left join ".tbl_posts." p ON p.userid = u.id AND p.available='yes' 
			  where u.id IN (select friendid from ".tbl_friends." where `userid`='$uid' and status='confirmed') 
			  
 GROUP BY u.id order by alpha, u.name asc ".$limit;

$q = $this->query_select($sql);

foreach($q as $r){
$song_info = $r['ptype'] != 'song' ?  array("path" => "", "cover" => "", "artist" => "", "title" => "", "album" => "") : $this->getPostSongInfo($r['ptext']);
$s[] = array("id" => $r['id'], "fullname" => $r['fullname'], "photo" => $r['profile_photo'], "dt" => $this->friendsLastOnline($r['online']), "curLetter" => ($alpha ? $r['alpha'] : ""),
             "p_id" => $r['pid'], "p_text" => $r['ptext'], "p_type" => $r['ptype'],
	     "track" => $song_info['path'], "cover" => $song_info['cover'], "artist" => $song_info['artist'],
             "songname" => $song_info['title'], "albumname" => $song_info['album'], "limit" => $limit_st
	 );
}

echo json_encode($s);

}


// load more grades
public function more_grades($uid,$page = 0,$n = ''){
	$c_im_glb = $this->im_global();
	$content = $c_im_glb->rpopup('grades','','', $page);  
	echo json_encode([ "content" => !trim($content) ? 'NULL' : $content ]);
}

// load more photos in profile page (categ "All Photos")
public function profileWallPhotosMore($uid,$page = 0){
	$result = array();
	if(!$uid || !$page) {
		$result['content'] = "NULL";
		$result['hide_btn'] = true;
	}else{
		$limit_p = $this->settings['PROFILE_WALL_PHOTOS_LIMIT'];// from settings
		$start = ($page * $limit_p) - $limit_p;
		$limit = $page ? "limit {$start},{$limit_p}" : "limit ".$limit_p;
		$all_photos_q = $this->query_select("select COUNT(distinct lb.id) as lbyme,COUNT(distinct l.id) as lc,COUNT(distinct c.id) as kc,p.id,.p.userid,p.albumid,a.name,p.albumid,p.added from ".tbl_photos." p
												left join ".tbl_albums." a ON a.id=p.albumid
												left join ".tbl_klass." l ON l.itemid=p.id and l.type='photo'
												left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
												left join ".tbl_comments." c ON c.itemid=p.id and c.categ='photo'
												where p.userid='{$uid}' group by p.id order by p.added desc ".$limit);
		
		$p_count = sizeof($all_photos_q);
		
		if($p_count){
			
			$userData = $this->db->query("select `id`,`gender` from ".tbl_users." where `id`='{$uid}' limit 1");
			$userData = $userData->fetch_array(MYSQLI_ASSOC);
			$this->template->assign([ "this" => $this, "user" => $userData, "q" => $all_photos_q ]);
			$content = $this->template->fetch($this->theme_dir.'/profile/load_more/profile_wall_photos.html');

			$result['hide_btn'] = ($p_count < $limit_p);
			$result['content'] = $content;

			
		} else {$result = $this->returnNull();}
	}
	echo json_encode($result);
}

// load more photos in personal photos album
public function profilePersonalPhotosMore($uid,$page =0){
	
	$json = isset($_POST['json_code']) ? true : false;
	$albumid = isset($_POST['album']) ? (int) $this->test_input($_POST['album']) : '0';
	$result = array();
	if(!$uid || !$page) {
		$result['content'] = "NULL";
		$result['hide_btn'] = true;
	}else{
		$limit_p = $this->settings['P_PHOTOS_LIMIT'];// from settings
		$start = ($page * $limit_p) - $limit_p;
		$limit = $page ? "limit {$start},{$limit_p}" : "limit ".$limit_p;
		$user = $this->checkUserCredential($uid);

		// return only photos ID in json
		if($json) {   
		
		$q_JS = $this->query_select("select id from ".tbl_photos." where `userid`='".$user['id']."' and `albumid`='{$albumid}' order by position ASC, added DESC ".$limit);
		
		echo json_encode($q_JS);
		
		
		exit;
		
		}
		
		if(!$user) {$this->returnNull();exit;}
		
		
		$userPhotos = $this->getUPhotos($user,'ORDER BY position ASC, added DESC '.$limit);		
		
		$p_count = sizeof($userPhotos);
		
		if($p_count){
			$_notes = $this->theme_dir."/body/notes.html";
			$this->template->assign([ "this" => $this, "user" => $user, '_notes' => $_notes, "q" => $userPhotos ]);
			$content = $this->template->fetch($this->theme_dir.'/profile/load_more/profile_pp_photos.html');

			$result['hide_btn'] = ($p_count < $limit_p);
			$result['content'] = $content;

			
		} else {$result = $this->returnNull();}
	}
	
	
	echo json_encode($result);
	
	
}
public function returnNull(){
	return ["content" => "NULL", "hide_btn" => true];
}
// get more items in photoalbum
public function profileAlbumPhotosMore($uid,$page =0,$alpha = false,$albumid){
    
	// check if is video album
	$video_album = isset($_POST['video_album']) ? $this->test_input($_POST['video_album']) : '';
		///echo $_POST['video_album'];die;
	$result = array();
	if(!$uid || !$page) {
		$result['content'] = "NULL";
		$result['hide_btn'] = true;
	}else{
		$limit_p = $this->settings['A_PHOTOS_LIMIT'];// from settings
		$start = ($page * $limit_p) - $limit_p;
		$limit = $page ? "limit {$start},{$limit_p}" : "limit ".$limit_p;
		$user = $this->checkUserCredential($uid);
		
		if(!$user) {echo $this->returnNull();exit;}
		
		$userPhotos = $video_album ? $this->query_select("select * from ".tbl_videos." where `userid`='{$uid}' ORDER BY added DESC " . $limit) : $this->getUPhotosA($user,$albumid,'ORDER BY position ASC, added DESC '.$limit);	
	
		$p_count = sizeof($userPhotos);
		
		if($p_count){
			$_notes = $this->theme_dir."/body/notes.html";
			$this->template->assign([ "this" => $this, "user" => $user, '_notes' => $_notes, "q" => $userPhotos ]);
			$content = $video_album ? $this->template->fetch($this->theme_dir.'/profile/load_more/profile_av_videos.html') : $this->template->fetch($this->theme_dir.'/profile/load_more/profile_pa_photos.html');

			$result['hide_btn'] = ($p_count < $limit_p);
			$result['content'] = $content;

			
		} else {$result = $this->returnNull();}
	}
	echo json_encode($result);
	
}

// load more products
public function market_my_product_more($uid, $page = 0){
	 
	$limit = 10;
	$start = ($page * $limit) - $limit;
	
	$result = array();
	if(!$uid || !$page) {
		$result['content'] = "NULL";
		$result['hide_btn'] = true;
	}else{
	 $q = $this->query_select("select * from ".tbl_market." where `userid`='{$this->userid}' order by added desc limit {$start},{$limit}");
	 
		$p_count = sizeof($q);
		
	if($p_count){
	 
	 $this->template->assign(["query" => $q, "this" => $this, "market" => $this->newMarket(), "empty" => 0]); 
	 $content = $this->template->fetch($this->theme_dir.'/market/each-product.html');
	 $result['hide_btn'] = ($p_count < $limit);
	 $result['content'] = $content;
	 
	} else {$result = $this->returnNull();}
	
	}
	
	echo json_encode($result);
}
public function market_browse_product_more($uid, $page = 0){
	 
	$limit = 25;
	$start = ($page * $limit) - $limit;
	
	$result = array();
	if(!$uid || !$page) {
		$result['content'] = "NULL";
		$result['hide_btn'] = true;
	}else{
 
	$q = $this->query_select("select m.* from ".tbl_market."m
	
	left join ".tbl_friends."f1 ON f1.userid = '{$this->userid}' and f1.status='confirmed'
	left join ".tbl_friends."f2 ON f2.userid = f1.friendid and f2.status='confirmed'
	where m.userid <> '{$this->userid}' and (
												m.userid = f1.friendid
												||
												m.userid = f2.friendid
												)
	group by m.id order by m.added desc limit {$start},{$limit}");
		$p_count = sizeof($q);
		
	if($p_count){
	 
	 $this->template->assign(["query" => $q, "this" => $this, "market" => $this->newMarket(), "empty" => 0]); 
	 $content = $this->template->fetch($this->theme_dir.'/market/each-product.html');
	 $result['hide_btn'] = ($p_count < $limit);
	 $result['content'] = $content;
	 
	} else {$result = $this->returnNull();}
	
	}
	
	echo json_encode($result);
}
public function market_search_product_more($uid, $page = 0, $alpha = false, $key){
	 
	$limit = 15;
	$start = ($page * $limit) - $limit;
	
	$result = array();
	if(!$uid || !$page) {
		$result['content'] = "NULL";
		$result['hide_btn'] = true;
	}else{
		$key = urldecode($key);
	 $q = $this->query_select("select * from ".tbl_market." 
																	where (`product_name` LIKE N'%{$key}%' 
																	OR `product_description` LIKE '%{$key}%')
																	and `userid`<>'{$this->userid}'
																	order by `product_name` asc limit {$start},{$limit}");
	
		$p_count = sizeof($q);
		
	if($p_count){
	 
	 $this->template->assign(["query" => $q, "this" => $this, "key" => $key, "market" => $this->newMarket(), "empty" => 0]); 
	 $content = $this->template->fetch($this->theme_dir.'/market/each-product.html');
	 $result['hide_btn'] = ($p_count < $limit);
	 $result['content'] = $content;
	 
	} else {$result = $this->returnNull();}
	
	}
	
	echo json_encode($result);
}



} // end class