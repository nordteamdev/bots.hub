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
			        


class _u_wall extends _global_co {

public $templ;
public $iid;
public $me;
public $uid;
public $index_feed;
public function __construct(){

// the old building from parent class
parent::__construct();
$this->iid = isset($_POST['i']) ? $this->test_input($_POST['i']) : '';
$this->me = isset($_POST['me']) ? $this->test_input($_POST['me']) : '';
$this->uid = isset($_POST['uid']) ? $this->test_input($_POST['uid']) : '';
$this->index_feed = 0;
}
// construct feed
public function build_user_feed($i,$filter,$page){

$this->cleanup_feed();

$mid = $this->USER['id'];
$template = $this->theme_dir.$this->feed_templates;
$this->templ = $template;
$_f_no_repeat = $wall_friends = array();


$wall_content = $photos_count = '';
			$page = !$page ? 1 : $page;
            $limit = $i == $mid && !$this->me ? $this->settings['FEED_RESULT_LIMIT'] : $this->settings['USER_FEED_LIMIT']; // from settings
            $start = ($page * $limit) - $limit;
			
			
			$this->template->assign(["clubid" => ""]);
		
switch($filter){
default:
case '':


if($this->uid){   
	
	// user's wall
$sql = "select DISTINCT IF( FIND_IN_SET('{$this->uid}', fd.byuser), REPLACE(fd.byuser, fd.byuser, '{$this->uid}'), fd.byuser ) as byuser,
fd.id, fd.parent_id,fd.hide_for,fd.itemid,fd.added,fd.categ,fd.community,

  u.id as uid,u.gender as ugender,u.fullname,u.profile_photo, c.name as club_name, c.logo as club_logo from
                             ".tbl_users." u, ".tbl_feed." fd 
							 
						left join ".tbl_communities." c ON c.id = fd.parent_id
					where FIND_IN_SET('{$mid}', fd.hide_for) = 0 && (fd.byuser = '{$this->uid}' || FIND_IN_SET('{$this->uid}', fd.byuser)) 
					&&  
					
					
					
					(
					IF(fd.categ='like_photo', u.id = fd.parent_id, u.id = '{$this->uid}') 
						
						 
					) 
						 
						
					
					
					
					
					
					&& !( (fd.categ = 'picture' || fd.categ ='video' || fd.categ = 'post_media' || fd.categ = 'post') && fd.community = 'yes')
					group by fd.id
			      order by fd.added desc limit 
			     {$start},{$limit}";
				 
 
}

else
if($i == $mid && !$this->me){
$this->index_feed = 1;
// general all
$sql = "select DISTINCT IF(fd.community='yes', g.name, '') as club_name, IF(fd.community='yes', g.logo, '') as club_logo,

 
 u.id as uid,u.gender as ugender,u.fullname,u.profile_photo, fd.*,fr.friendid from
                           ".tbl_feed." fd
							
							
							
				 
							left join ".tbl_communities_followers." cf ON (fd.community='yes' && cf.userid='{$mid}')
							 left join ".tbl_communities." g ON ( (g.id = cf.group_id || g.id=fd.parent_id) && fd.community='yes')
							 
							 left join ".tbl_friends." fr ON fr.friendid=fd.byuser && fr.userid='{$mid}'
							 


		
		left join ".tbl_users." u ON   if(fd.community='yes',  IF(fd.categ='like_photo' || fd.categ='like_photo_album', u.id = fd.parent_id, u.id = fd.byuser) ,  IF(fd.categ='like_photo' || fd.categ='like_photo_album', u.id = fd.parent_id, u.id = fr.friendid) && fr.status = 'confirmed' )  
							
                              where 
							  FIND_IN_SET('{$mid}', fd.hide_for) = 0 
							  && 
							  
							  (  
							  
( 
							  
(fd.community='yes' && fd.parent_id=cf.group_id  && cf.userid='{$mid}') 
|| 
(fd.community='yes' && fd.byuser=fr.friendid && fr.userid='{$mid}' && u.id = fr.friendid && IF(fd.categ='reshare', g.id = fd.itemid, g.id = fd.parent_id) && (fd.categ = 'like_photo' || fd.categ='like_photo_album' || fd.categ='like_multi_videos' || fd.categ='like_video' || fd.categ='reshare') )

) || ( ( FIND_IN_SET(fr.friendid, fd.byuser) && fd.community='no' && fr.userid='{$mid}' && IF(fd.categ='like_photo' || fd.categ='like_photo_album', u.id = fd.parent_id, u.id = fr.friendid)  && fr.status = 'confirmed'  ) ) 
							 
							  
							) 
							  
							 
							  && fd.byuser <> '{$mid}' 
				  group by fd.id 
			      order by fd.added desc limit 
			     {$start},{$limit}";
				 

} else {

// user's wall
$sql = "select DISTINCT u.id as uid,u.gender as ugender,fd.*,u.fullname,u.profile_photo from
                             ".tbl_users." u, ".tbl_feed." fd 
					where FIND_IN_SET('{$mid}', fd.hide_for) = 0 && fd.byuser = '{$i}' && u.id = '{$i}'
					group by fd.id
			      order by fd.added desc limit 
			     {$start},{$limit}";

}


break;

case 'popular':

$sql = "select DISTINCT u.id as uid,u.gender as ugender,fd.*,fr.friendid,u.fullname,u.profile_photo from
                             ".tbl_users." u, ".tbl_friends." fr, ".tbl_feed." fd 
                              where FIND_IN_SET('{$mid}', fd.hide_for) = 0 and fd.byuser = fr.friendid and fr.userid='{$mid}' and u.id = fr.friendid
			      and fr.status = 'confirmed' and fd.categ = 'pphotos' OR fd.categ = 'palbum'
			      group by fd.id
			      order by RAND() limit 
			     {$start},{$limit}";



break;


case 'favorite':

if(!$this->iid){
// filter feed only for favorite users
$sql = "select DISTINCT IF(fd.community='yes', g.name, '') as club_name, IF(fd.community='yes', g.logo, '') as club_logo, 
u.id as uid,u.gender as ugender,fd.*,u.fullname,u.profile_photo from
                             ".tbl_users." u,  ".tbl_feed_fv." fv , ".tbl_feed." fd
							 
							 
							 left join ".tbl_communities." g ON (g.id=fd.parent_id && fd.community='yes')
			
                              where
				 FIND_IN_SET('{$mid}', fd.hide_for) = 0
			 	 and fd.byuser = fv.fvid 
				 and fv.userid='{$mid}' 
				 and u.id = fd.byuser
			      group by fd.id
			      order by fd.added desc limit 
			     {$start},{$limit}";
	}
		else
				{

// filter feed by a certain user
$sql =  "select DISTINCT  IF( FIND_IN_SET('{$this->iid}', fd.byuser), REPLACE(fd.byuser, fd.byuser, '{$this->iid}'), fd.byuser ) as byuser,
fd.id, fd.parent_id,fd.hide_for,fd.itemid,fd.added,fd.categ,fd.community,

  u.id as uid,u.gender as ugender,u.fullname,u.profile_photo, c.name as club_name, c.logo as club_logo from
                             ".tbl_users." u, ".tbl_feed." fd 
							 
						left join ".tbl_communities." c ON c.id = fd.parent_id
					where FIND_IN_SET('{$mid}', fd.hide_for) = 0 && (fd.byuser = '{$this->iid}' || FIND_IN_SET('{$this->iid}', fd.byuser)) 
					&&  
					
					
					
					(
					IF(fd.categ='like_photo' || fd.categ='like_photo_album', u.id = fd.parent_id, u.id = '{$this->iid}') 
						
						 
					) 
						 
						
					
					
					
					
					
					&& !( (fd.categ = 'picture' || fd.categ ='video' || fd.categ = 'post_media' || fd.categ = 'post') && fd.community = 'yes')
					group by fd.id
			      order by fd.added desc limit 
			     {$start},{$limit}";
}

break;



case 'friends':

// filter feed by a certain user
$sql = "select DISTINCT  IF( FIND_IN_SET('{$this->iid}', fd.byuser), REPLACE(fd.byuser, fd.byuser, '{$this->iid}'), fd.byuser ) as byuser,
fd.id, fd.parent_id,fd.hide_for,fd.itemid,fd.added,fd.categ,fd.community,

  u.id as uid,u.gender as ugender,u.fullname,u.profile_photo, c.name as club_name, c.logo as club_logo from
                             ".tbl_users." u, ".tbl_feed." fd 
							 
						left join ".tbl_communities." c ON c.id = fd.parent_id
					where FIND_IN_SET('{$mid}', fd.hide_for) = 0 && (fd.byuser = '{$this->iid}' || FIND_IN_SET('{$this->iid}', fd.byuser)) 
					&&  
					
					
					
					(
					IF(fd.categ='like_photo' || fd.categ='like_photo_album', u.id = fd.parent_id, u.id = '{$this->iid}') 
						
						 
					) 
						 
						
					
					
					
					
					
					&& !( (fd.categ = 'picture' || fd.categ ='video' || fd.categ = 'post_media' || fd.categ = 'post') && fd.community = 'yes')
					group by fd.id
			      order by fd.added desc limit 
			     {$start},{$limit}";

break;


case 'groups':
/*
// filter feed by a certain group
$sql = "select DISTINCT g.name as club_name, g.logo as club_logo, g.id as club_id, u.id as uid, u.gender as ugender, u.fullname,
fd.* from ".tbl_communities_followers." cf, ".tbl_communities." g, ".tbl_feed." fd
			left join ".tbl_users." u ON u.id = fd.byuser
                 where
				 FIND_IN_SET('{$mid}', fd.hide_for) = 0
			 	 and cf.group_id = '{$this->iid}' and cf.userid = '{$mid}'
				 and g.id = fd.parent_id
					and fd.parent_id = '{$this->iid}'
				 and fd.community='yes'
				 and (fd.categ != 'like_photo' && fd.categ != 'like_multi_videos' && fd.categ != 'like_photo_album' && fd.categ != 'like_video')
			      group by fd.id
			      order by RAND() limit 
			     {$start},{$limit}";*/
				 
				 // club wall 
$sql = "select DISTINCT u.id as uid,u.gender as ugender,feed.*,u.fullname,u.profile_photo, club.name as club_name, club.logo as club_logo from
                             ".tbl_users." u, ".tbl_feed." feed , ".tbl_communities." club
					where FIND_IN_SET('{$mid}', feed.hide_for) = 0 && feed.parent_id = '{$this->iid}' && club.id='{$this->iid}'
					&& feed.community='yes'
					&& (feed.categ != 'like_photo' && feed.categ != 'like_multi_videos' && feed.categ != 'like_photo_album' && feed.categ != 'like_video')
					group by feed.id
			      order by feed.added desc limit 
			     {$start},{$limit}";
		$this->index_feed = 1;			  
break;

}

// get data from database
$query = $this->query_select($sql);




function shuffle_assoc($list) { 
  if (!is_array($list)) return $list; 

  $keys = array_keys($list); 
  shuffle($keys); 
  $random = array(); 
 
  foreach ($keys as $key) { 
  
 
    $random[$key] = $list[$key]; 
	/*
  if($list[$key]['added'] >= strtotime('-2 days'))
	array_unshift($random , $random[$key]);
*/
	
	
  }
 
  return $random; 
} 
$is_result = sizeof($query);
$query = $this->index_feed ? shuffle_assoc($query) : $query;

 
$this->template->assign(["index_feed" => $this->index_feed]);


//print_r($query);die;
foreach($query as $res):

if($res['community'] == 'yes')
$this->template->assign(["club_logo_path" => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$res['parent_id'].'/']);




switch($res['categ']){
	
	
/*  Market products
-----------------------------------------------------------*/
case 'market_product':
$market = $this->im_market();

	
$wd_comm_count = $this->getCommentsCount($res['itemid'],'market_product',1);
$wd_comm_href = "/market/product/".$res['itemid'];
$wd_comm_data = "hrefattr=\"true\" data-open-marketproduct=\"{$res['itemid']}\"";

$this->template->assign([ 
'wd_comm_data' => $wd_comm_data,
 'wd_comm_href' => $wd_comm_href,
 'wd_comm_count' => $wd_comm_count,
 'klass_c' => 1,
 'user_id' => $res['uid'],
 'market' => $market,
 'item_type' => 'market_product',
 'this' => $this, 
 'res' => $res,
 'kl_count' => $this->getLikesCount($res['itemid'],'market_product'),
 'kl_eu' => $this->likedByMe($res['itemid'],'market_product')
 ]);
 
 
$temp = $template.'market-product.html';
$wall_content .= $this->template->fetch($temp);
break;

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

/* PERSONAL PHOTOS
-----------------------------------------------------------*/
case 'pphotos':


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



$wd_comm_count = $photos_count == 1 ? $this->getCommentsCount($res['itemid'],'photo') : '';
$wd_comm_href = "javascript:;";
$wd_comm_data = 'onclick="return photoCommentBfLayer(event,this);" data-thicommi="comm_1710"';


if($res['community'] == 'yes')
$this->template->assign(["clubid" => $res['parent_id']]);
else
$this->template->assign(["clubid" => ""]);

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
 'this' => $this, 
 'res' => $res,
 'c' => 0, 
 'm_photos' => $arr_photos 
 ]);

$temp = $template.'pphoto.html';

$wall_content .= $this->template->fetch($temp);

break;

/* LIKES ON MULTIPLE PHOTOS
-----------------------------------------------------------*/
case 'like_photo_album':

$photos = explode(',',$res['itemid']);
$t_uid = $res['byuser'];
$author_id = $res['parent_id'];
$myid = isset($this->USER['id']) ? (int) $this->USER['id'] : '';
$photos_details = array();
$condition = 0;
$us_author_details = '';
if($myid == $res['parent_id'] && $res['community'] == 'no') break;

/*
// select details about user
$user_details = $this->query_select("select id,fullname,profile_photo,gender from ".tbl_users." where `id`='{$t_uid}' 
									UNION
									select id,fullname,profile_photo,gender from ".tbl_users." where `id`='{$author_id}' 
									limit 2");
$us_lk_details = $user_details[0];
*/



if($res['community'] == 'yes')
$this->template->assign(["clubid" => $author_id]);
else
	$this->template->assign(["clubid" => ""]);


if(count($photos)){
	
	foreach($photos as $photo):
	
	
	if($condition === 6) break;
	
	
	if($res['community'] == 'yes'){
		
	
	$photos_details[] = array(  "photo_id" => $photo,
								"author_id" => $author_id,
								"klass_c" => $this->getLikesCount($photo,"photo",1),///$ph_details['klass_count'],
								"klass_by_me" => $this->likedByMe($photo,"photo",1),//$ph_details['klass_by_me'],
								"comm_count" => $this->getCommentsCount($photo,"photo",1)//$ph_details['comments_count']
								);
									
		
		
	} else {
$user_details = $this->query_select("select id,fullname,profile_photo,gender from ".tbl_users." where `id`='{$author_id}' 
									limit 1");

$us_author_details = $user_details[0];
		
	// get details about photos
	$_s_ph_details = $this->db->query("select p.userid as photo_authorid
									from ".tbl_photos." p
									
									where p.id='{$photo}'
									group by p.id
									limit 1
									");
	$ph_details = $_s_ph_details->fetch_array(MYSQLI_ASSOC);
	
	$photos_details[] = array(  "photo_id" => $photo,
								"author_id" => $ph_details['photo_authorid'],
								"klass_c" => $this->getLikesCount($photo,"photo"),///$ph_details['klass_count'],
								"klass_by_me" => $this->likedByMe($photo,"photo"),//$ph_details['klass_by_me'],
								"comm_count" => $this->getCommentsCount($photo,"photo")//$ph_details['comments_count']
								);
								
	}
								
	$condition++;
	endforeach;
	
	
}


$this->template->assign([ 'this' => $this,
 'c_break' => $condition,
 'myid' => $myid,
 'all_pp_id' => $res['itemid'],
 'photos_details' => $photos_details,
/// 'user_details' => $us_lk_details,
 "author_details" => $us_author_details,
 "photos" => $photos,
 "photo_c" => count($photos),
 "res" => $res]);

$temp = $template.'/like/multiple-photo-like.html';
$wall_content .= $this->template->fetch($temp);

break;

/* LIKES ON PHOTOS
-----------------------------------------------------------*/
case 'like_photo':

$myid = $this->USER['id'];
 
$is_multiple_likes = strpos($res['byuser'],',') ? true : false;
$likeby = 1;
$arr_photos = $g_friends_liked_nm = $tooltip_data = array();
$f_for_ph = $all_pp_id = $users_like_count = '';
$users = array();

if($myid == $res['parent_id'] && $res['community'] == 'no') break;


if ($is_multiple_likes) {
	
$users = explode(',',$res['byuser']);
$users_like_count = sizeof($users);

krsort($users);

}else{
	
	
	$users = array("id" => $res['byuser']);
	
}
 
$condition = $condition2 = $tooltip_more = 0;
$total_fr_count = 0;
//print_r($users);die;
//for($i = 0; $i < $users_like_count; $i++){
	foreach($users as $uid){

	
//	$uid = $users[$i];
	

	
	
	$c_for_friends = count($users) == 1 ? $this->query_select("select u.fullname,u.id,u.profile_photo as avatar,u.gender from ".tbl_users." u where u.id='{$uid}' limit 1") : $this->query_select("select u.fullname,u.id,u.profile_photo as avatar,u.gender from ".tbl_friends." f 
										  left join ".tbl_users." u ON u.id=f.friendid where f.friendid='{$uid}' and f.userid='{$myid}' and f.status='confirmed'
										  group by u.id limit 1");
										  

	if( count($c_for_friends) ) {
		$total_fr_count++;
		foreach( $c_for_friends as $r_f_friends ):
		
		$g_friends_liked_nm[] = array("id" => $r_f_friends['id'], "photo" => $r_f_friends['avatar'], "gender" => $r_f_friends['gender'], "name" => $r_f_friends['fullname']);
		
		if($condition > 1 && $condition2 < 7)
		$tooltip_data[] = array("id" => $r_f_friends['id'], "photo" => $r_f_friends['avatar'], "gender" => $r_f_friends['gender'], "name" => $r_f_friends['fullname']);

		if($condition2 >= 7)
			$tooltip_more++;
		
		
		$condition++;
		$condition2++;
		endforeach;
		
	
		
	
	
} 

}
$corrupted_feed = false;

// select details of photo
$photoid = $res['itemid'];
$q_photo = $res['community'] == 'yes' ? 
$this->db->query("select COUNT(k2.id) as kl_eu, COUNT(k.id) as kl_count, p.id, p.info, c.name as club_name,c.id as uid,c.logo as club_logo
							from ".tbl_communities_pics." p
							left join ".tbl_communities." c ON c.id = ".$res['parent_id']."
							left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo' and k.community='yes'
							left join ".tbl_klass." k2 ON k2.itemid = p.id and k2.type='photo' and k2.userid='{$myid}' and k2.community='yes'
							where p.id = '{$photoid}'
							group by p.id
							limit 1
							")
:

$this->db->query("select COUNT(k2.id) as kl_eu, COUNT(k.id) as kl_count,p.id, p.info,u.fullname,u.id as uid,u.profile_photo, u.gender as ugender 
							from ".tbl_photos." p
							left join ".tbl_users." u ON u.id = p.userid
							left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
							left join ".tbl_klass." k2 ON k2.itemid = p.id and k2.type='photo' and k2.userid='{$myid}'
							where p.id = '{$photoid}'
							group by p.id
							limit 1
							");
$r_u_photo = $q_photo->fetch_array(MYSQLI_ASSOC);

if(!isset($r_u_photo['id'])) $corrupted_feed = true;

if($r_u_photo['uid'] === $myid) break;

if($res['community'] == 'yes')
$this->template->assign(["clubid" => $res['parent_id']]);
else
$this->template->assign(["clubid" => ""]);

$wd_comm_count = $this->getCommentsCount($res['itemid'],'photo', $res['community'] == 'yes' ? 1 : 0);
$wd_comm_href = "/post?". ($res['community'] == 'yes' ? '&clubid='.$res['parent_id'] : '') ."i=";
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';

$this->template->assign([ 'wd_comm_data' => $wd_comm_data, 
						  'wd_comm_href' => $wd_comm_href,
						  'wd_comm_count' => $wd_comm_count,
						  'res_u_photo' => $r_u_photo,
						  'tooltip_data' => json_encode($tooltip_data),
						  'photo_id' => $photoid,
						  'kl_eu' => $r_u_photo['kl_eu'], 
						  'user_id' => $res['uid'],
						  'all_pp_id' => $all_pp_id,
						  'ugender' => $res['ugender'],
						  'max_loop' =>$f_for_ph,
						  'item_type' => 'photo',
						  'this' => $this,
						  'res' => $res,
						  'corrupted_feed' => $corrupted_feed,
						  'c' => 0,
						  'm_photos' => $arr_photos,
						  'l_users' => $g_friends_liked_nm,
						  'total_u_lk_count' => $total_fr_count,
						  'tooltip_more' => $tooltip_more,
						  'all_friends' => json_encode($users)
						  ]);


$temp = $template.'/like/photo-like.html';
$wall_content .= $this->template->fetch($temp);


break;

/* LIKES ON VIDEOS
-----------------------------------------------------------*/
case 'like_video':

$myid = isset($this->USER['id']) ? (int) $this->USER['id'] : '';
$is_multiple_likes = strpos($res['byuser'],',') ? true : false;
$arr_videos = $g_friends_liked_nm = $tooltip_data = array();
$f_for_vd = $all_pp_id = $users_like_count = '';
$users = array();

if($myid == $res['parent_id'] && $res['community'] == 'no') break;


if ($is_multiple_likes) {
	
$users = explode(',',$res['byuser']);
$users_like_count = sizeof($users);

krsort($users);

}else{
	
	
	$users = array("id" => $res['byuser']);
	
}
 
$condition = $condition2 = $tooltip_more = 0;
$total_fr_count = 0;
//print_r($users);die;
//for($i = 0; $i < $users_like_count; $i++){
	foreach($users as $uid){

	
//	$uid = $users[$i];
	

	
	
	$c_for_friends = count($users) == 1 ? $this->query_select("select u.fullname,u.id,u.profile_photo as avatar,u.gender from ".tbl_users." u where u.id='{$uid}' limit 1") : $this->query_select("select u.fullname,u.id,u.profile_photo as avatar,u.gender from ".tbl_friends." f 
										  left join ".tbl_users." u ON u.id=f.friendid where f.friendid='{$uid}' and f.userid='{$myid}' and f.status='confirmed'
										  group by u.id limit 1");

	if( count($c_for_friends) ) {
		$total_fr_count++;
		foreach( $c_for_friends as $r_f_friends ):
		
		$g_friends_liked_nm[] = array("id" => $r_f_friends['id'], "photo" => $r_f_friends['avatar'], "gender" => $r_f_friends['gender'], "name" => $r_f_friends['fullname']);
		
		if($condition > 1 && $condition2 < 7)
		$tooltip_data[] = array("id" => $r_f_friends['id'], "photo" => $r_f_friends['avatar'], "gender" => $r_f_friends['gender'], "name" => $r_f_friends['fullname']);

		if($condition2 >= 7)
			$tooltip_more++;
		
		
		$condition++;
		$condition2++;
		endforeach;
		
	
		
	
	
}

}


// select details of video
$videoid = $res['itemid'];

$q_video = $res['community'] == 'yes' ? 

 $this->db->query("select 

 COUNT(k2.id) as kl_eu, COUNT(k.id) as kl_count,
 v.info as description,v.vd_name as title, v.views as views,v.vd_duration as dur,v.filename as filename, v.type as extension, v.id as id

 from ".tbl_communities_pics." v
						
							left join ".tbl_klass." k ON k.itemid=v.id and k.type='video' and k.community='yes'
							left join ".tbl_klass." k2 ON k2.itemid = v.id and k2.type='video' and k2.userid='{$myid}' and k2.community='yes'
							where v.id = '{$videoid}'
							group by v.id
							limit 1
							")

 : $this->db->query("select COUNT(k2.id) as kl_eu, COUNT(k.id) as kl_count, v.*,u.fullname,u.id as uid,u.gender as ugender,u.profile_photo from ".tbl_videos." v
							left join ".tbl_users." u ON u.id = v.userid
							left join ".tbl_klass." k ON k.itemid=v.id and k.type='video'
							left join ".tbl_klass." k2 ON k2.itemid = v.id and k2.type='video' and k2.userid='{$myid}'
							where v.id = '{$videoid}'
							group by v.id
							limit 1
							");
$r_u_video = $q_video->fetch_array(MYSQLI_ASSOC);

if(!$r_u_video['id']){

	$this->deleteFromFeed($res['id']);

	break;
	
	}
	
if($res['community'] == 'yes'){
	$r_u_video['uid'] = 0;
	$this->template->assign("clubid",$res['parent_id']);
	$video_like_stcmd = __COMMUNITIES_VIDEOS_DIR.$res['parent_id'].'/';
} else {
	$video_like_stcmd = "/stcmd/uvideo/".$r_u_video['userid']."/videos/";
	$this->template->assign("clubid","");
	
}

$wd_comm_count = $this->getCommentsCount($res['itemid'],'video', ( $res['community'] == 'yes' ? 1 : 0 ) );
$wd_comm_href = "/video?i=";
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';

$this->template->assign([ 'wd_comm_data' => $wd_comm_data, 
						  'wd_comm_href' => $wd_comm_href,
						  'wd_comm_count' => $wd_comm_count,
						  'video_like_stcmd' => $video_like_stcmd,
						  'res_u_video' => $r_u_video,
						  'tooltip_data' => json_encode($tooltip_data),
						  'video_id' => $videoid,
						  'user_id' => $res['uid'],
						  'all_pp_id' => $all_pp_id,
						  'ugender' => $res['ugender'],
						  'kl_eu' => $r_u_video['kl_eu'],
						  'max_loop' =>$f_for_vd,
						  'item_type' => 'video',
						  'parent_id' => $res['parent_id'],
						  'this' => $this,
						  'res' => $res,
						  'c' => 0,
						  'l_users' => $g_friends_liked_nm,
						  'total_u_lk_count' => $total_fr_count,
						  'tooltip_more' => $tooltip_more,
						  'all_friends' => json_encode($users)
						  ]);



$temp = $template.'/like/video-like.html';
$wall_content .= $this->template->fetch($temp);

break;


/* LIKES ON MULTIPLE VIDEOS
-----------------------------------------------------------*/
case 'like_multi_videos':

$videos = explode(',',$res['itemid']);
$t_uid = $res['byuser'];
$author_id = $res['parent_id'];
$myid = isset($this->USER['id']) ? (int) $this->USER['id'] : '';
$videos_details = array();
$condition = 0;


if($myid == $res['parent_id'] && $res['community'] == 'no') break;

if($res['community'] == 'yes')
$this->template->assign(["clubid" => $res['parent_id']]);
else
	$this->template->assign(["clubid" => ""]);


if($res['community'] == 'no'){
// select details about user
$user_details = $this->query_select("select id,fullname,profile_photo,gender from ".tbl_users." where `id`='{$author_id}' 
									limit 1");
$us_author_details = $user_details[0];
} else {
	
	$us_author_details = array();
	
}



if(count($videos)){
	
	foreach($videos as $video):
	
	
	if($condition === 6) break;
	
	
	if($res['community'] == 'yes') {

	$_s_vd_details = $this->db->query("select * from ".tbl_communities_pics." where `id`='{$video}' limit 1");
	$videos_details[] = $_s_vd_details->fetch_array(MYSQLI_ASSOC);
	
	
			
	} else {
		
	// get details about videos
	$_s_vd_details = $this->db->query("select v.dur,v.external, v.title, v.userid as video_authorid
									from ".tbl_videos." v
									
						
									
									where v.id='{$video}'
									group by v.id
									limit 1
									");
									
	$vd_details = $_s_vd_details->fetch_array(MYSQLI_ASSOC);
	$videos_details[] = array(  "video_id" => $video,
								"dur" => $vd_details['dur'],
								"external" => $vd_details['external'],
								"title" => $vd_details['title'],
								"author_id" => $vd_details['video_authorid'],
								"klass_c" => $this->getLikesCount($video,'video'),
								"klass_by_me" => $this->likedByMe($video,"video"),//$vd_details['klass_by_me'],
								"comm_count" => $this->getCommentsCount($video,"video")//$vd_details['comments_count'] 

								);	
		
		
	}
								
	$condition++;
	endforeach;
	
	
}


$this->template->assign([ 'this' => $this,
 'c_break' => $condition,
 'myid' => $myid,
 'all_vd_id' => $res['itemid'],
 'videos_details' => $videos_details,
 ///'user_details' => $us_lk_details,
 "author_details" => $us_author_details,
 "videos" => $videos,
 "videos_c" => count($videos),
 'videos_dir' => __COMMUNITIES_VIDEOS_DIR,
 "res" => $res]);

$temp = $template.'/like/multiple-videos-like.html';
$wall_content .= $this->template->fetch($temp);

break;


/* LIKES ON POSTS
-----------------------------------------------------------*/
case 'like_post':

$post_id = (int) $this->test_input($res['itemid']);
$author_id = (int) $this->test_input($res['parent_id']);
$myid = isset($this->USER['id']) ? (int) $this->USER['id'] : '';

if(!$author_id || !$post_id) {
	
	$this->deleteFromFeed($res['id']); break;

} else if ($author_id !== $myid){
	
	break;
}

else {
	
		
	// select details about post
	$_q_post = $this->db->query("select p.*, u.gender, u.id as puid, u.fullname, u.profile_photo as puphoto
			  ,(select COUNT(*) from ".tbl_klass." where type='post' and itemid='{$post_id}') as klass_count
			  ,(select COUNT(id) from ".tbl_klass." where type='post' and itemid='{$post_id}' and `userid` = '{$myid}') as eu
			  from ".tbl_posts." p
			  left join ".tbl_users." u ON u.id = p.userid
			  where p.id = '{$post_id}' group by p.id limit 1");
	$_r_post = $_q_post->fetch_array(MYSQLI_ASSOC);
	
	if(!$_r_post['id']){
		
		$this->deleteFromFeed($res['id']);
		break;
		
		
	} else {
	
	
	if($_r_post['type'] === 'song' || $_r_post['type'] === 'text'){
		
		
		
$s_details = $s_artist = $s_songname = $s_albumname = $s_fname = $s_id = $s_cover = '';

$wd_comm_count = $this->getCommentsCount($_r_post['id'],'post');
$wd_comm_href = "/post?i=".$_r_post['id'];
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';


if($_r_post['type'] == 'song'){
// select details of respective song
$song_id = $_r_post['text'];
$s_query = $this->db->query("select `id`,`artist`,`title`,`album`,`path`,`cover` from ".tbl_songs." where `id` = '{$song_id}' limit 1");
$s_details = $s_query->fetch_array(MYSQLI_ASSOC);

$s_id = $s_details['id'];
$s_artist = $s_details['artist'];
$s_songname = $s_details['title'];
$s_albumname = $s_details['album'];
$s_fname = $s_details['path'];
$s_cover = $s_details['cover'];

}

$this->template->assign([ 'wd_comm_data' => $wd_comm_data,
						  'wd_comm_href' => $wd_comm_href,
						  'wd_comm_count' => $wd_comm_count,
						  'post_res' => $_r_post,
						  'item_type' => 'post',
						  'this' => $this,
						  'res' => $res,
						  'postid' => $post_id,
						  'p_song_id' => $s_id,
						  'p_song_fname' => $s_fname,
						  'p_song_cover' => $s_cover,
						  'p_song_artist' => $s_artist,
						  'p_song_name' => $s_songname,
						  'p_song_album' => $s_albumname,
						  'p_text' => $_r_post['text'],
						  'kl_count' => $_r_post['klass_count'],
						  'kl_eu' => ($_r_post['eu'] ? true : false),
						  'p_song' => $_r_post['type'] == 'song' ? true : false ]);

	

	$temp = $template.'/like/post-st-like.html';
	$wall_content .= $this->template->fetch($temp);	
		
	} else {
	
	
$wd_comm_count = $this->getCommentsCount($_r_post['id'],'post');
$wd_comm_href = "/post?i=".$_r_post['id'];
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';


$this->template->assign([ 'wd_comm_data' => $wd_comm_data,
						  'wd_comm_href' => $wd_comm_href,
						  'wd_comm_count' => $wd_comm_count,
						  'liked' => 1,
						  'this' => $this,
						  'res' => $res,
						  "pid" => $post_id,
						  'pd' => $_r_post,
						  'p_text' => $_r_post['text'],
						  'kl_count' => $_r_post['klass_count'],
						  'kl_eu' => ($_r_post['eu'] ? true : false) ]);

$temp = $template.'/like/post-media-like.html';
$wall_content .= $this->template->fetch($temp);
	

	}
	
	
	
	}
	
	
	
}



break;

// Group add pictures to album
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
 'this' => $this, 
 'res' => $res,
 'c' => 0, 
 'm_photos' => $arr_photos 
 ]);

$temp = $template.'pphoto.html';
$wall_content .= $this->template->fetch($temp);

break;

/* PHOTOS IN ALBUMS
-----------------------------------------------------------*/
case 'palbum':
$this->template->assign(["clubid" => ""]);
$album_id = $res['parent_id'];

// get album details
$query = $this->db->query("select 
			  (select COUNT(*) from ".tbl_klass." where type='photo' and itemid='".$res['itemid']."') as klass_count
			  ,(select COUNT(id) from ".tbl_klass." where type='photo' and itemid='".$res['itemid']."' and `userid` = '{$mid}') as eu,
a.id,a.name,a.userid,a.cover,COUNT(p.id) as a_c from ".tbl_albums." a, ".tbl_photos." p where p.albumid=a.id and a.id = '{$album_id}' limit 1");
$album_res = $query->fetch_array(MYSQLI_ASSOC);

$is_multiple_photos = strpos($res['itemid'],',') ? true : false;
$arr_photos = array();
$wd_comm_count = $wd_comm_href = $wd_comm_data = '';
if ($is_multiple_photos) {
	
$photos = explode(',',$res['itemid']);
$photos_count = sizeof($photos);
$min_four = min(4,$photos_count);
for($x = 0; $x < $min_four; ++$x)
$arr_photos[] = $photos[$x];

} else {
	
$arr_photos[] = $res['itemid'];
	
$wd_comm_count = $this->getCommentsCount($res['itemid'],'photo');
$wd_comm_href = "";
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';

}


$this->template->assign([
							
						  'wd_comm_data' => $wd_comm_data,
						  'wd_comm_href' => $wd_comm_href,
						  'wd_comm_count' => $wd_comm_count,
						  'kl_count' => $album_res['klass_count'],
						  'kl_eu' => ($album_res['eu'] ? true : false),
						  'item_type' => 'photo',
						  'this' => $this,
						  'res' => $res,
						  'album_r' => $album_res,
						  'c' => 0,
						  'm_photos' => $arr_photos,
						  'all_imgs_id' => $res['itemid'],
						  'photos_c' => $is_multiple_photos ? $photos_count : sizeof($arr_photos) 
						  
						  ]);

$temp = $template.'aphotos.html';
$wall_content .= $this->template->fetch($temp);

break;

/* MEDIA STATUSES
-----------------------------------------------------------*/
case 'post_media':
$this->template->assign(["clubid" => ""]);
$it_id = (int) $this->test_input($res['itemid']);
$q_media_post = $this->db->query("select p.text,p.id,p.type,p.clubid
			  ,(select COUNT(*) from ".tbl_klass." where type='post' and itemid='{$it_id}') as klass_count
			  ,(select COUNT(id) from ".tbl_klass." where type='post' and itemid='{$it_id}' and `userid` = '{$mid}') as eu
			  from ".tbl_posts." p where p.id = '{$it_id}' limit 1");
$p_data = $q_media_post->fetch_array(MYSQLI_ASSOC);
$wd_comm_count = $this->getCommentsCount($p_data['id'],'post');
$wd_comm_href = '/post?i='.$p_data['id']. ($p_data['clubid'] > 0 ? '&clubid='.$p_data['clubid'] : '');
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';


$this->template->assign([ 'wd_comm_data' => $wd_comm_data, 'wd_comm_href' => $wd_comm_href, 'wd_comm_count' => $wd_comm_count, 'this' => $this, 'res' => $res,"pid" => $res['itemid'], 'pd' => $p_data, 'p_text' => $p_data['text'], 'kl_count' => $p_data['klass_count'], 'kl_eu' => ($p_data['eu'] ? true : false) ]);

$temp = $template.'post_media.html';
$wall_content .= $this->template->fetch($temp);

break;


/* Shared items
-----------------------------------------------------------*/
case 'reshare':
 

$clubid = 0;
$this->template->assign(["clubid" => 0]);
 
$user_details = $this->getUserDetails($res['byuser']);

if ($res['community'] == 'yes'){
 
	$o_post = $this->db->query("select post_id,post_type from ".tbl_shared_posts." where `id`='".$res['itemid']."' limit 1");
	$o_post = $o_post->fetch_array(MYSQLI_ASSOC);
	 
	
	if($o_post['post_id'] && $o_post['post_type'] != 'club') {
	$clubid = $this->getClubIDbyPostId($o_post['post_id']);  
	
		$this->template->assign(["clubid" => $clubid ]);
		
	} else if ($res['community'] == 'yes' && $res['parent_id'] == 'club'){
		$get_clubid = $this->db->query("select owner_id from ".tbl_shared_posts." where `id`='".$res['itemid']."' limit 1");
		$get_clubid = $get_clubid->fetch_array(MYSQLI_ASSOC);
		$get_clubid = $get_clubid['owner_id'];
		
		$this->template->assign(["clubid" => $get_clubid ]);
	}
}  

 
 
$post_details_q = $this->db->query("select 
				 s.id,
				 s.owner_id as post_author_id,
				 s.post_id as original_post_id,
				 s.post_type as type,
				 s.community as original_post_community
		 
				 
				 from ".tbl_shared_posts." s
 
				 where s.id='".$res['itemid']."' group by s.id limit 1");
		 
$post_details = $post_details_q->fetch_array(MYSQLI_ASSOC);



switch($post_details['type']) {
	
	case 'club':
	$post_details['share_id'] = $get_clubid;
	$post_details['p_type'] = 'club';
	$post_details['type'] = 'club';
	break;
	
	case 'market_product':
	$post_details['share_id'] = $post_details['id'];
	$post_details['p_type'] = 'market_product';
	break;
	
	case 'photo':
	
	$photo_id = $post_details['original_post_id'];
	$sec_post_details = $this->db->query("select info from ".tbl_photos." where `id`='{$photo_id}' limit 1");
	$sec_post_details = $sec_post_details->fetch_array(MYSQLI_ASSOC);
	$post_details['p_type'] = 'photo';
	$post_details['text'] = $sec_post_details['info'];
	$post_details['share_id'] = $post_details['id'];
	break;
	

	case 'post':
	$post_id = $post_details['original_post_id'];
	$sec_post_details = $this->db->query("select text,`type` from ".tbl_posts." where `id`='{$post_id}' limit 1");
	$sec_post_details = $sec_post_details->fetch_array(MYSQLI_ASSOC);
	$post_details['p_type'] = $sec_post_details['type'];
	$post_details['text'] = $sec_post_details['text'];
	$post_details['share_id'] = $post_details['id'];
	$this->template->assign('k_it_type','post');
	break;
	
	case 'video':
	$video_id = $post_details['original_post_id'];
	$sec_post_details = $this->db->query("select description from ".tbl_videos." where `id`='{$video_id}' limit 1");
	$sec_post_details = $sec_post_details->fetch_array(MYSQLI_ASSOC);
	$post_details['p_type'] = 'video';
	$post_details['text'] = $sec_post_details['description'];
	$post_details['share_id'] = $post_details['id'];
	break;
}
 
 
 

$wd_comm_href = "/post?i=".$res['parent_id']. ($res['community'] == 'yes' ? "&clubid=".$clubid : "");
$wd_comm_data = 'data-type-post="1" data-scrollto="comments"';
														
$us_author_details = $user_details;
$us_author_details['photo'] = $us_author_details['profile_photo'];
$w_res = array();
$w_res['itemid'] = $res['parent_id'];
$w_res['id'] = $res['id'];
$w_res['byuser'] = $res['byuser'];
$id_shared_id = $post_details['id'];

				$this->template->assign([ 

										'wd_comm_data' => $wd_comm_data,
										'wd_comm_href' => $wd_comm_href,
										'wd_comm_count' => $this->getCommentsCountSharedPosts($post_details['id']),
										'id_shared_id' => $id_shared_id,
										'r' => $post_details,
										'post_type' => $post_details['type'],
										
										'user_result' => $us_author_details,
										'res' => $res,
										
										'post_id' => $post_details['id'],
										'f_widget_id' => $post_details['id'],
										'this' => $this,
										'item_type' => 'post',
										'kl_count' => $this->getLikesCountSharedPost($post_details['id']),
										'kl_eu' => $this->likedByMeSharedContent($post_details['id']),
										'w_res' => $w_res
										]);

	$temp = $template.'/like/reshare.html'; 
	$wall_content .= $this->template->fetch($temp);
break;

/* STATUSES
-----------------------------------------------------------*/
case 'post':
//$this->template->assign(["clubid" => ""]);
$it_id = (int) $this->test_input($res['itemid']);
$s_details = $s_artist = $s_songname = $s_albumname = $s_fname = $s_id = $s_cover = '';
$q_post = $this->db->query("select p.text,p.id,p.type
			  ,(select COUNT(*) from ".tbl_klass." where type='post' and itemid='{$it_id}') as klass_count
			  ,(select COUNT(id) from ".tbl_klass." where type='post' and itemid='{$it_id}' and `userid` = '{$mid}') as eu
			  from ".tbl_posts." p where p.id = '{$it_id}'  limit 1");

$p_data = $q_post->fetch_array(MYSQLI_ASSOC);

$wd_comm_count = $this->getCommentsCount($p_data['id'],'post');
$wd_comm_href = "/post?i=".$p_data['id'];
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

$this->template->assign([ 
'wd_comm_data' => $wd_comm_data, 
'wd_comm_href' => $wd_comm_href,
 'wd_comm_count' => $wd_comm_count,
 'pd' => $p_data,
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


/* MUSIC
-----------------------------------------------------------*/
case 'music':
$this->template->assign(["clubid" => ""]);
$tracks_count = $all_song_id = '';
$is_multiple_tracks = strpos($res['itemid'],',') ? true : false;
$arr_tracks = array();

if ($is_multiple_tracks) {
$tracks = explode(',',$res['itemid']);
$tracks_count = sizeof($tracks);

for($x = 0; $x < $tracks_count; $x++)
$all_song_id .= $all_song_id ? ','.$tracks[$x] : $tracks[$x];

$f_for_tr = min(5,$tracks_count);
for($y = 0; $y < $f_for_tr; $y++)
$arr_tracks[] = $tracks[$y];
} else {
$arr_tracks[] = $res['itemid'];
}



$this->template->assign([ 'this' => $this, 'res' => $res, 'tracks_arr' => $arr_tracks, 'tracks_c' => $tracks_count, 'c' => 0, 'all_s_id' => $all_song_id ]);

$temp = $template.'track.html';
$wall_content .= $this->template->fetch($temp);

break;


/* New friends
-----------------------------------------------------------*/
case 'newfriend':
$this->template->assign(["clubid" => ""]);
if(!in_array($res['parent_id'],$_f_no_repeat) && $res['byuser'] !== $this->USER['id'] && $res['itemid'] !== $this->USER['id']){//&& !$this->isfriend($res['itemid'])){

/*
$ui = $res['itemid'];
$q = $this->db->query("select id,fullname,profile_photo from ".tbl_users." where `id` = '$ui' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);
$this->template->assign([ 'this' => $this, 'res' => $res, 'friend' => $r ]);

$temp = $template.'new_friend.feed';
$wall_content .= $this->template->fetch($temp);
*/

$_f_no_repeat[] = $res['parent_id'];
$wall_friends[] = array("uid" => $res['uid'], "feed_id" => $res['id'], "feed_added" => $res['added'], "byuser" => $res['byuser'], "itemid" => $res['itemid'], "parent" => $res['parent_id']);

if( strpos($wall_content, '[friendWallReplace_'.$res['id'].']') == false)
$wall_content .= '<friendWallReplace_'.$res['id'].'></friendWallReplace_'.$res['id'].'>';

}


break;

// without default case

}


endforeach;

// group friends
if(sizeof($wall_friends)){

$wall_content = $this->feedGenerFriends($wall_content,$wall_friends);

}
if($filter && ($filter === 'favorite' || $filter === 'friends' || $filter === 'groups') ){
$fv_qu = $c_fqu = '';
$eu = $this->USER['id'];

if($filter === 'favorite'){

$fv_qu = $this->query_select("select u.fullname,u.profile_photo,u.id as uid from ".tbl_users." u, ".tbl_feed_fv." fv
				where fv.userid='{$eu}' and u.id=fv.fvid group by fv.id order by fv.added desc");
$c_fqu = sizeof($fv_qu);
} else if($filter === 'friends'){

$fv_qu = $this->query_select("select u.fullname,u.profile_photo,u.id as uid from ".tbl_users." u, ".tbl_friends." fr
				where fr.userid='{$eu}' and u.id=fr.friendid and fr.status='confirmed' group by u.id order by fr.added desc");
$c_fqu = sizeof($fv_qu);
} else if ($filter === 'groups'){
	
$fv_qu = $this->query_select("select g.name as club_name,g.logo as club_logo,g.id as club_id from ".tbl_communities." g, ".tbl_communities_followers." cf
				where cf.userid='{$eu}' and cf.group_id=g.id group by g.id order by cf.added desc");
$c_fqu = sizeof($fv_qu);
//echo $this->iid;
$this->template->assign("clubid",$this->iid);	
	
}

$favorite_users_count = 0;
if($filter === 'favorite') $favorite_users_count = count($this->query_select("select id from ".tbl_feed_fv." where `userid`='{$eu}' limit 1"));

$this->template->assign([ 'this' => $this, 'fav_count_us' => $favorite_users_count, 'gl_rs' => $fv_qu, 'c_fq' => $c_fqu, 'th_ii' => $this->iid, 'cus' => !$is_result ? 0 : 1, 'faktive_us' => $this->iid]);

$fv_schelet = $template.'/sub/'.$filter.'_slider.html';

echo $this->getPage( ($is_result ? (!empty($wall_content) ? $wall_content : $this->empty_feed()) : ''), $this->template->fetch($fv_schelet) );


} else if(empty($wall_content)) {
echo $this->getPage( ( $page ? '[END]' : $this->empty_feed() ) );
} else {
echo $this->getPage($wall_content);
}

}

public function feedGenerFriends($wcont,$arr){
global $res;

$_fr_tmp = array();

foreach($arr as $arg)
{
    $_fr_tmp[$arg['uid']][] = array("fr_id" => $arg['itemid'], "feed_id" => $arg['feed_id'], "feed_added" => $arg['feed_added'], "byuser" => $arg['byuser']);
}

$_fr_output = array();

foreach($_fr_tmp as $uid => $wid)
{


    $_fr_output[] = array(
        'uid' => $uid,
        'w_ids' => $wid
    );

}





foreach($_fr_output as $fr_output){
$nw_fr_feed_id = $fr_output['w_ids']['0']['feed_id'];
$nw_fr_feed_added = $fr_output['w_ids']['0']['feed_added'];
$this->template->assign([ 
						'this' => $this,
						'_d' => new _c_global_co,
						'f_count' => sizeof($fr_output['w_ids']),
						'uid' => $uid,
						'fadded' => $nw_fr_feed_added,
						'fid' => $nw_fr_feed_id,
						'outp' => $fr_output,
						'frid' => $fr_output['uid'],
						'ftc' => $res
						]);

$temp = $this->templ.'new_friend.html';
$wcont = str_replace('<friendWallReplace_'.$nw_fr_feed_id.'></friendWallReplace_'.$nw_fr_feed_id.'>', $this->template->fetch($temp),$wcont);
}

return $wcont;

}


// get friend info
public function gFriendDt($id){

$q = $this->db->query("select id,fullname,profile_photo,gender,theme,location,TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS yearsold, online from ".tbl_users." where `id` = '{$id}' limit 1");
return $q->fetch_array(MYSQLI_ASSOC);

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
$mid = $this->USER['id'];
$query_lk = $this->db->query("	
				select COUNT(*) as klass_count, (select COUNT(id) from ".tbl_klass." where type='photo' and itemid='{$photo_id}' and `userid` = '{$mid}') as eu from ".tbl_klass." where type='photo' and itemid='{$photo_id}'  
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
public function unv_feed($c,$feed_id){
	$str = $this->lang['post_deleted_or_not_available'];
	
	switch($c){
		
		case 'video':
		
		$str = $this->lang['Corrupted_video'];
		
		break;
		
		case 'photo':
		
		$str = $this->lang['Corrupted_photo'];
		
		break;
		
	}

	return '<div class="feed">
		<div class="feed_ac"><a title="'.$this->lang['hide_from_feed'].'" data-gth="'.$feed_id.'" href="javascript:;" class="al feed_close"></a></div>
	<section class="feed_undefined"><div class="media-block media-stub" style="margin:0">
					<div class="media-stub_img">
						<div class="stub-img stub-img__64 __'.$c.' stub-img__na64"></div>
					</div>
					<div class="media-stub_tx textWrap">'.$str.'</div>
				</div></section></div>';
				
}
//get photo description
public function gPhotoDescr($id,$is_club = 0){
	
	$q = $is_club ? $this->db->query("select info from ".tbl_communities_pics." where `id`='{$id}' limit 1") : $this->db->query("Select info from ".tbl_photos." where `id`='{$id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	return $r['info'];
	
}

// get photo description
public function getPhotoDescription($pid,$clubid = 0){

if(is_numeric($pid))
{

return $this->gPhotoDescr($pid,$clubid);

}else return '';

}
// delete from feed died items
public function deleteFromFeed($id){
	
	
	$this->query_delete("delete from ".tbl_feed." where `id`='{$id}'");
	
}

} // end class