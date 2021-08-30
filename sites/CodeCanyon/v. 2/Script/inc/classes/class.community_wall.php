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


class club_wall extends _global_co {

public $templ;
public $id;
public $me;
public $userid;

public function __construct(){

// the old building from parent class
parent::__construct();

$this->userid = isset($this->USER['id']) ? $this->test_input($this->USER['id']) : 0;
}

// construct feed
public function build_user_feed($clubid){

//$this->cleanup_feed();

$this->id = $clubid;
$template = $this->theme_dir.$this->feed_templates;
$this->templ = $template;
$_f_no_repeat = array();

$page = isset($_POST['p']) ? $this->test_input($_POST['p']) : '';
$filter = isset($_POST['filter']) ? $this->test_input($_POST['filter']) : '';
$wall_content = $photos_count = '';
			$page = !$page ? 1 : $page;
            $limit = $this->settings['GROUP_FEED_LIMIT']; // from settings
            $start = ($page * $limit) - $limit;
			
$this->template->assign(['clubid' => $this->id,'club_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/']);

switch($filter){
	
default:
case '':


// club wall 
$sql = "select DISTINCT u.id as uid,u.gender as ugender,feed.*,u.fullname,u.profile_photo, club.name as club_name, club.logo as club_logo from
                              ".tbl_communities." club,".tbl_feed." feed 
							 
							 left join ".tbl_users." u ON u.id = feed.byuser
					where FIND_IN_SET('{$this->userid}', feed.hide_for) = 0 && feed.parent_id = '{$this->id}' && club.id='{$this->id}'
					group by feed.id
			      order by feed.added desc limit 
			     {$start},{$limit}";
	



break;


}

// get data from database
$query = $this->query_select($sql);
$is_result = sizeof($query);


foreach($query as $res):

switch($res['categ']){

/* Videos
-----------------------------------------------------------*/
case 'video':



$is_multiple_videos = strpos($res['itemid'],',') ? true : false;
$videos_count = 1;
$arr_videos = array();
$f_for_vd = $all_vv_id = '';
if ($is_multiple_videos) {
$videos = explode(',',$res['itemid']);
$videos_count = sizeof($videos);
$f_for_vd = min(6,$videos_count);

for($x = 0; $x < $f_for_vd; $x++)
$arr_videos[] = $videos[$x];

$all_vv_id = $res['itemid'];

} else {
$arr_videos[] = $res['itemid'];
}



$wd_comm_count = $videos_count == 1 ? $this->getCommentsCount($res['itemid'],'video',1) : '';
$wd_comm_href = "javascript:void(0);";
$wd_comm_data = $videos_count == 1 ? "onclick=\"ga(this).removeAttr('hrefattr');return ga(this).closest('.feed_cnt').find('[contenteditable]').focus();\"" : 'onclick="return photoCommentBfLayer(event,this);" data-thicommi="comm_1710"';

$this->template->assign([ 
'wd_comm_data' => $wd_comm_data,
 'wd_comm_href' => $wd_comm_href,
 'wd_comm_count' => $wd_comm_count,
 'klass_c' => 1,
 'user_id' => $res['uid'],
 'all_vv_id' => $all_vv_id,
 'ugender' => $res['ugender'],
 'max_loop' =>$f_for_vd, 
 'video_c' => $videos_count,
 'item_type' => 'video',
 'this' => $this, 'res' => $res,
 'c' => 0, 
 'm_videos' => $arr_videos,
 'videos_dir' => __COMMUNITIES_VIDEOS_DIR
 ]);

$temp = $template.'videos.html';
$wall_content .= $this->template->fetch($temp);

break;

/* Pictures
-----------------------------------------------------------*/
case 'picture':



$is_multiple_photos = strpos($res['itemid'],',') ? true : false;
$photos_count = 1;
$arr_photos = array();
$f_for_ph = $all_pp_id = '';
if ($is_multiple_photos) {
$photos = explode(',',$res['itemid']);
$photos_count = sizeof($photos);
$f_for_ph = min(6,$photos_count);

for($x = 0; $x < $f_for_ph; $x++)
$arr_photos[] = $photos[$x];

$all_pp_id = b_encode($res['itemid']);

} else {
$arr_photos[] = $res['itemid'];
}



$wd_comm_count = $photos_count == 1 ? $this->getCommentsCount($res['itemid'],'photo',1) : '';
$wd_comm_href = "javascript:void(0);";
$wd_comm_data = $photos_count == 1 ? "onclick=\"ga(this).removeAttr('hrefattr');return ga(this).closest('.feed_cnt').find('[contenteditable]').focus();\"" : 'onclick="return photoCommentBfLayer(event,this);" data-thicommi="comm_1710"';

$this->template->assign([ 
'wd_comm_data' => $wd_comm_data,
 'wd_comm_href' => $wd_comm_href,
 'wd_comm_count' => $wd_comm_count,
 'klass_c' => 1,
 'user_id' => $res['uid'],
 'all_pp_id' => $all_pp_id,
 'ugender' => $res['ugender'],
 'max_loop' =>$f_for_ph, 
 'photo_c' => $photos_count,
 'item_type' => 'photo',
 'this' => $this, 'res' => $res,
 'c' => 0, 
 'm_photos' => $arr_photos 
 ]);

$temp = $template.'pphoto.html';
$wall_content .= $this->template->fetch($temp);

break;



/* MEDIA POSTS
-----------------------------------------------------------*/
case 'post_media':
$it_id = (int) $this->test_input($res['itemid']);
$q_media_post = $this->db->query("select p.text,p.id,p.type
			  ,(select COUNT(*) from ".tbl_klass." where type='post' and itemid='{$it_id}' and `community`='yes') as klass_count
			  ,(select COUNT(id) from ".tbl_klass." where type='post' and itemid='{$it_id}' and `community`='yes' and `userid` = '{$this->userid}') as eu
			  from ".tbl_posts." p where p.id = '{$it_id}' and community='yes' and `clubid`='{$this->id}' limit 1");
$p_data = $q_media_post->fetch_array(MYSQLI_ASSOC);
$wd_comm_count = $this->getCommentsCount($p_data['id'],'post',1);
$wd_comm_href = "/post?clubid=".$this->id."&i=".$p_data['id'];
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';


$this->template->assign([ 'wd_comm_data' => $wd_comm_data, 
'wd_comm_href' => $wd_comm_href, 
'wd_comm_count' => $wd_comm_count,
 'this' => $this, 
 'res' => $res,
 'pid' => $res['itemid'],
 'pd' => $p_data,
 'p_text' => $p_data['text'], 'kl_count' => $p_data['klass_count'], 'kl_eu' => ($p_data['eu'] ? true : false) ]);

$temp = $template.'post_media.html';
$wall_content .= $this->template->fetch($temp);

break;



/* Text Posts
-----------------------------------------------------------*/
case 'post':
$it_id = (int) $this->test_input($res['itemid']);
$s_details = $s_artist = $s_songname = $s_albumname = $s_fname = $s_id = $s_cover = '';
$q_post = $this->db->query("select p.text,p.id,p.type
			  ,(select COUNT(*) from ".tbl_klass." where type='post' and itemid='{$it_id}') as klass_count
			  ,(select COUNT(id) from ".tbl_klass." where type='post' and itemid='{$it_id}' and `userid` = '{$this->userid}') as eu
			  from ".tbl_posts." p where p.id = '{$it_id}'  limit 1");

$p_data = $q_post->fetch_array(MYSQLI_ASSOC);

$wd_comm_count = $this->getCommentsCount($p_data['id'],'post');
$wd_comm_href = "/post?clubid=".$this->id."&i=".$p_data['id'];
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';


if($p_data['type'] == 'song'){
// select details of respective song
$song_id = $p_data['text'];
$s_query = $this->db->query("select `id`,`artist`,`title`,`album`,`path`,`cover` from ".tbl_songs." where `id` = '{$song_id}' limit 1");
$s_details = $s_query->fetch_array(MYSQLI_ASSOC);

$s_id = $s_details['id'];
$s_artist = $s_details['artist'];
$s_songname = $s_details['title'];
$s_albumname = $s_details['album'];
$s_fname = $s_details['path'];
$s_cover = $s_details['cover'];

}

$this->template->assign([ 'pd' => $p_data, 
'wd_comm_data' => $wd_comm_data, 
'wd_comm_href' => $wd_comm_href, 
'wd_comm_count' => $wd_comm_count,
'item_type' => 'post',
 'this' => $this, 
 'res' => $res, 
 'postid' => $res['itemid'],
 'p_song_id' => $s_id,
 'p_song_fname' => $s_fname,
 'p_song_cover' => $s_cover,
 'p_song_artist' => $s_artist,
 'p_song_name' => $s_songname,
 'p_song_album' => $s_albumname,
 'p_text' => $p_data['text'],
 'kl_count' => $p_data['klass_count'],
 'kl_eu' => ($p_data['eu'] ? true : false),
 'p_song' => $p_data['type'] == 'song' ? true : false ]);

$temp = $template.'post.html';
$wall_content .= $this->template->fetch($temp);

break;



// without default case

}


endforeach;


if(empty($wall_content)) {
echo $this->getPage( ( $page ? '[END]' : $this->empty_feed() ) );
} else {
echo $this->getPage($wall_content);
}

}


// get song info
public function getTrackInfo($t_id){

// get song information
$q = $this->db->query("select `id`,`artist`,`title`,`album`,`cover`,`path` from ".tbl_songs." where `id` = '{$t_id}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);
return $r;

}

// get photo dimension
public function getThisPhotoDimension_v($id,$size,$w_h,$max_width,$max_height){

        list($width, $height) = getimagesize($this->settings['HOST']."/getPhoto?p=".$id."&sz=".$size);
        $scale = min($max_width/$width, $max_height/$height);
         
        if ($scale < '1') {
            $scale_width = floor($scale * $width);
            $scale_height = floor($scale * $height);
        } else {
            $scale_width = $width;
            $scale_height = $height;
        }
         
        $img =  explode(',',$scale_width . ',' . $scale_height);


return $w_h == 'width' ? $img[0] : $img[1];

}



// get likes count from multiple photos 
public function gMultiPhotosKlass($photo_id){
$query_lk = $this->db->query("	
				select COUNT(*) as klass_count, (select COUNT(id) from ".tbl_klass." where type='photo' and itemid='{$photo_id}' and `userid` = '{$this->userid}') as eu from ".tbl_klass." where type='photo' and itemid='{$photo_id}'  
				");
$result = $query_lk->fetch_array(MYSQLI_ASSOC);
return $result['klass_count'] .',' . $result['eu'];

}
// run explode function in clean php, because smarty creates some conflicts
public function smarty_explode_data($data,$delimiter,$offset){
$result = explode($delimiter, $data);
return $result[$offset];
}
// delete from feed the dead photos
public function cleanup_feed(){
/*
	$sql = "
	DELETE
 	 FROM ".tbl_feed."
 	WHERE `categ` = 'pphotos' or `categ`='palbums' and `itemid` NOT IN
   	  (SELECT id
        FROM ".tbl_photos." p
      	 WHERE p.id = itemid)
	";

	$this->db->query($sql) or die("err sql");*/
   //$sqlp = "update ".tbl_feed." SET `itemid`= TRIM(BOTH ',' FROM REPLACE(REPLACE(itemid, '$id', ''), ',,', ','))  where FIND_IN_SET($id, itemid) AND `userid`=".$usid;

}



public function hide_from_feed($feed_id){

$i = $this->USER['id'];

if(!is_numeric($feed_id) || !$i) {
echo 0;

} else {

$sl = $this->db->query("select hide_for from ".tbl_feed." where `id`='{$feed_id}' limit 1");
$rs = $sl->fetch_array(MYSQLI_ASSOC);
$ad = !empty($rs['hide_for']) ? $rs['hide_for'].','.$i : $i;
$query = $this->query_update("update ".tbl_feed." set `hide_for` = '{$ad}' where `id` = '{$feed_id}'");
echo 1;


}

}





// unavailable feed
public function unv_feed($c){
	$str = $this->lang['post_deleted_or_not_available'];
	switch($c){
		
		case 'video':
		
		$str = $this->lang['Corrupted_video'];
		
		break;
		
	}
	return '<div class="media-block media-stub" style="margin:0">
					<div class="media-stub_img">
						<div class="stub-img stub-img__64 __'.$c.' stub-img__na64"></div>
					</div>
					<div class="media-stub_tx textWrap">'.$str.'</div>
				</div>';
				
}
//get photo description
public function gPhotoDescr($id){
	
$q = $this->db->query("select info from ".tbl_communities_pics." where `id`='{$id}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);
	
	return $r['info'];
	
}

// get photo description
public function getPhotoDescription($pid){

if(is_numeric($pid))
{

return $this->gPhotoDescr($pid);

}else return '';

}



// delete from feed died items
public function deleteFromFeed($id){
	
	
	$this->query_delete("delete from ".tbl_feed." where `id`='{$id}'");
	
}



} // end class