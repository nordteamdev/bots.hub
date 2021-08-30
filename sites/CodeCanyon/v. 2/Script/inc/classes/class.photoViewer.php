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

    						        


class pviewer extends _global_co {


public $gPhoto   = "/getPhoto";
public $notesFile = "/body/notes.html";
public $photoid;
public $albumid;
public $userid;
public $fromImageSize;
public $frmSize;
public $show;
public $clubid;
public $photo_direct_link_url;
 

public function __construct($req_type){

//the old building from parent class
parent::__construct();


$this->photoid = $req_type == 'post' ? (isset($_POST['o']) ? $this->test_input(b_decode($_POST['o'])) : '') : (isset($_GET['o']) ? $this->test_input(b_decode($_GET['o'])) : '');
$this->albumid = $req_type == 'post' ? (isset($_POST['a']) ? $this->test_input(b_decode($_POST['a'])) : '') : (isset($_GET['a']) ? $this->test_input(b_decode($_GET['a'])) : '');
$this->userid  = $req_type == 'post' ? (isset($_POST['q']) ? $this->test_input(b_decode($_POST['q'])) : '') : (isset($_GET['q']) ? $this->test_input(b_decode($_GET['q'])) : '');
$this->x  = $req_type == 'post' ? (isset($_POST['x']) ? $this->test_input(b_decode($_POST['x'])) : '') : (isset($_GET['x']) ? $this->test_input(b_decode($_GET['x'])) : '');
$this->fromImageSize = $req_type == 'post' ? (isset($_POST['o']) ? $this->test_input($_POST['from']) : '') : (isset($_GET['o']) ? $this->test_input($_GET['from']) : '');
$this->frmSizeh = $req_type == 'post' ? (isset($_POST['fszh']) ? $this->test_input($_POST['fszh']) : '') : (isset($_GET['fszh']) ? $this->test_input($_GET['fszh']) : '');
$this->frmSizew = $req_type == 'post' ? (isset($_POST['fszw']) ? $this->test_input($_POST['fszw']) : '') : (isset($_GET['fszw']) ? $this->test_input($_GET['fszw']) : '');
$this->show = $req_type == 'post' ? (isset($_POST['show']) ? $this->test_input($_POST['show']) : '') : (isset($_GET['show']) ? $this->test_input($_GET['show']) : '');

$this->clubid = $req_type == 'post' ? (isset($_POST['clubid']) ? $this->test_input(b_decode($_POST['clubid'])) : '') : (isset($_GET['clubid']) ? $this->test_input(b_decode($_GET['clubid'])) : '');

$this->albumid = (!$this->albumid || $this->albumid == '') && $this->clubid ? '0' : $this->albumid;


// filter photo id
$this->pp = $req_type == 'post' ? (isset($_POST['pp']) ? $this->test_input(b_decode($_POST['pp'])) : '') : (isset($_GET['pp']) ? $this->test_input(b_decode($_GET['pp'])) : '');
$this->curr_pid = $req_type == 'post' ? (isset($_POST['cur_pid']) ? $this->test_input(b_decode($_POST['cur_pid'])) : '') : (isset($_GET['cur_pid']) ? $this->test_input(b_decode($_GET['cur_pid'])) : '');

 
}

// build photo viewer popup
public function buildPopup(){


//$q = $this->query_select("Select * from ".tbl_photos." where `userid`='$this->userid' order by added desc limit 5");
/*
$q = $this->query_select("select  id,added,lag(id) over (order by added desc) as prev, lead(id) over (order by added desc) as next from ".tbl_photos."
where '$this->userid' IN (id, prev, next)
order by added desc limit 3");



$q = $this->db->query("
Select min(id) as prev,
(select max(id) from ".tbl_photos." where id < '$this->photoid' and `userid`='$this->userid' order by added desc) as next
from ".tbl_photos." where id > '$this->photoid' and `userid`='$this->userid' order by added desc limit 1
");
$r = $q->fetch_array(MYSQLI_ASSOC);
*/
/*
$q = $this->query_select("
select * from (
select p.id as previd,n.id as nextid from ".tbl_photos." n
left join ".tbl_photos." p ON p.id < '$this->photoid' and p.userid='$this->userid'

where n.id > '$this->photoid' and n.userid='$this->userid'
group by nextid,previd
order by n.added desc, p.added desc
)
order by added desc

");

$q = $this->query_select("
SELECT x.* 
  FROM ".tbl_photos." x
  JOIN
     (
       SELECT a.id,a.added 
         FROM ".tbl_photos." a

         LEFT 
         JOIN ".tbl_photos." n 
           ON n.id > '$this->photoid' 
          AND n.userid = '$this->userid' 

         LEFT 
         JOIN ".tbl_photos." p 
           ON p.id < '$this->photoid' 
          AND p.userid = '$this->userid' 




        GROUP 
           BY a.id
     ) y
    order by y.added desc
");

$prevArr = $nextArr = array();
$prev = $this->query_select("select id from ".tbl_photos." where `id` > '$this->photoid'
			     and `userid` = '$this->userid' order by added desc");
$next = $this->query_select("select id from ".tbl_photos." where `id` < '$this->photoid'
			     and `userid` = '$this->userid' order by added desc");
foreach($prev as $photo)
$prevArr[] = $photo;

foreach($next as $photo)
$nextArr[] = $photo;
`albumid` = '$this->albumid'
			     and
*/


switch($this->show){

// photos from profile wall
case 'profileWall':
	
$sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto,alb.name as albumname,alb.id as albid,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 from ".tbl_photos." p
  left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
 where  p.userid = '{$this->userid}' group by p.id order by p.added desc";
 
 break;
 
 // photos from an album
 case 'album':
 
 $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto,alb.name as albumname,alb.id as albid,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 from ".tbl_photos." p
  left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
 where p.userid = '{$this->userid}' and p.albumid='{$this->albumid}' group by p.id ORDER BY p.position ASC, p.added DESC";
 
 
 break;
 
 
  case 'single':
 
 $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto,alb.name as albumname,alb.id as albid,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 from ".tbl_photos." p
  left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
where p.id='{$this->photoid}' and p.userid = '{$this->userid}' group by p.id order by p.added desc limit 1";
 
 break;
 
 // personal photos
 case 'pphotos':
 
  $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto,
alb.name as albumname,alb.id as albid,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 from ".tbl_photos." p
 left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
 where p.userid = '{$this->userid}' and p.albumid='0' group by p.id ORDER BY p.position ASC, p.added DESC LIMIT ".$this->settings['P_PHOTOS_LIMIT'];
 
 break;
 
 // photos from tagged album
 case 'tagged_album':
 
 
  $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto, alb.id as albid, alb.name as albumname,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 
 from ".tbl_tag_album." tg

 left join ".tbl_photos." p ON p.id = tg.photoid
 left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=tg.photoid and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = tg.photoid and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=tg.photoid and lb.type='photo' and lb.userid='".$this->USER['id']."'

 where tg.userid='{$this->x}' group by tg.id ORDER BY tg.id desc";
 
 break;
 

 
 // search result view max 4 photos
 case 'searchquery':

 $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto,alb.name as albumname,alb.id as albid,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 from ".tbl_photos." p
  left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
where p.albumid='0' and p.userid = '{$this->userid}' group by p.id order by p.position asc,p.added desc limit 4";

 break;
 
 case 'filter':
 if($this->pp){
	 

	 
  $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
u.profile_photo as uphoto,alb.name as albumname,alb.id as albid,
SUBSTRING_INDEX(SUBSTRING_INDEX(u.birthday, '-', 1), '-', -1) as uage,u.gender as ugender,u.id as uid,u.fullname,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.extension as pext, p.position as ppos, p.userid
 from ".tbl_photos." p
  left join ".tbl_albums." alb ON alb.id = p.albumid
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
 where p.id IN ({$this->pp}) group by p.id order by p.added desc";
} else die;


 break;
 
 
   // photos from album of community
 case 'album-community':
 
 $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
alb.title as community_album_name,
alb.id as community_album_id,
com.name,com.logo as community_logo,
 com.category as community_category,com.subcategory as community_sub_category,p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.type as pext, p.userid
 from ".tbl_communities_pics." p
  left join ".tbl_communities_albums." alb ON alb.id = p.albumid and alb.group_id='{$this->clubid}'
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo' and k.community='yes'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_communities." com ON com.id='{$this->clubid}'
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='comment' and c.community='yes' and c.item_type='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.community='yes' and lb.userid='".$this->USER['id']."'
where p.group_id = '{$this->clubid}' and p.albumid='{$this->albumid}' and (p.type='png' || p.type='gif' || p.type='jpg') group by p.id ORDER BY p.added DESC";
 
 
 break;
 
 
 // community single
  case 'community-single':
 
 $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
alb.title as community_album_name,
alb.id as community_album_id,
com.name,com.logo as community_logo,
 com.category as community_category,com.subcategory as community_sub_category,
 p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.type as pext, p.userid
 
 from ".tbl_communities_pics." p
 left join ".tbl_communities_albums." alb ON alb.id = p.albumid and alb.group_id='{$this->clubid}'
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo' and k.community='yes'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_communities." com ON com.id='{$this->clubid}'
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='comment' and c.community='yes' and c.item_type='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.community='yes' and lb.userid='".$this->USER['id']."'
where p.id='{$this->photoid}'  and (p.type='png' || p.type='gif' || p.type='jpg') group by p.id ORDER BY p.added DESC limit 1";
 
 
 
 
 break;
 
 
 // filter community
  case 'filter-community':
 if($this->pp){
	
 
 $sql = "select 
COUNT(distinct c.id) as count_comments,
COUNT(distinct k.id) as likes,
COUNT(distinct lb.id) as liked_by_me,
alb.title as community_album_name,
alb.id as community_album_id,
com.name,com.logo as community_logo,
 com.category as community_category,com.subcategory as community_sub_category,p.id,p.info,p.added as padded,p.filename as pfilename,p.size as fsize,p.albumid as paid, p.type as pext, p.userid
 from ".tbl_communities_pics." p
  left join ".tbl_communities_albums." alb ON alb.id = p.albumid and alb.group_id='{$this->clubid}'
 left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo' and k.community='yes'
 left join ".tbl_users." u ON u.id=p.userid
 left join ".tbl_communities." com ON com.id='{$this->clubid}'
 left join ".tbl_comments." c ON c.itemid = p.id and c.categ='comment' and c.community='yes' and c.item_type='photo'
 left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.community='yes' and lb.userid='".$this->USER['id']."'
where p.id IN ({$this->pp}) and p.group_id = '{$this->clubid}' and (p.type='png' || p.type='gif' || p.type='jpg') group by p.id ORDER BY p.added DESC";

 
} else die;


 break;
 
 
 
 default: echo 0; die;
 
}


$query = $this->query_select($sql);
//print_r($query);die;


// create direct link for photos
$each_photo_link = array();
$each_photo_link['cmd'] = 'openPhotoViewer';
$each_photo_link['_token'] = time();

if($this->show)
	$each_photo_link['show'] = $this->show;

if($this->x)
	$each_photo_link['x'] = b_encode($this->x);

if($this->fromImageSize)
	$each_photo_link['from'] = $this->fromImageSize;

if( $this->frmSizew )
	$each_photo_link['fszw'] = $this->frmSizew;

if( $this->frmSizeh )
	$each_photo_link['fszh'] = $this->frmSizeh;

if( $this->pp )
	$each_photo_link['pp'] = b_encode($this->pp);

if($this->clubid)
	$each_photo_link['clubid'] = b_encode($this->clubid);

if(!$this->clubid){

for($i=0; $i<count($query);$i++):
$user_dom = $this->getThisUserLocation($query[$i]['uid'],true);
$query[$i]['ulocation'] = $this->getThisUserLocation($query[$i]['uid'],true);
$query[$i]['albumname'] = $this->getAlbumName($query[$i]['albumname']);



if( isset($query[$i]['userid']) )
	$each_photo_link['q'] = $query[$i]['userid'];

if( isset($query[$i]['id']) )
	$each_photo_link['o'] = b_encode($query[$i]['id']);

if( isset($query[$i]['paid']) && $query[$i]['paid'] > 0 )
	$each_photo_link['a'] = b_encode($query[$i]['paid']);

if( isset($query[$i]['id']) )
	$each_photo_link['cur_pid'] = b_encode($query[$i]['id']);

$query[$i]['direct-photo-link'] = urldecode('/photo?'.http_build_query($each_photo_link));
endfor;

}else {
	
for($i=0; $i<count($query);$i++):
$query[$i]['community_logo_path'] = $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->clubid.'/';
$query[$i]['community_category'] = $this->lang[$query[$i]['community_category']];
 
 
if( isset($query[$i]['community_sub_category']) && !empty($query[$i]['community_sub_category'])) {$query[$i]['community_sub_category'] = $this->lang[$query[$i]['community_sub_category']];}

if( isset($query[$i]['userid']) )
	$each_photo_link['q'] = $query[$i]['userid'];

if( isset($query[$i]['id']) )
	$each_photo_link['o'] = b_encode($query[$i]['id']);

if( isset($query[$i]['community_album_id']) && $query[$i]['community_album_id'] > 0 )
	$each_photo_link['a'] = b_encode($query[$i]['community_album_id']);

if( isset($query[$i]['id']) )
	$each_photo_link['cur_pid'] = b_encode($query[$i]['id']);

$query[$i]['direct-photo-link'] = urldecode('/photo?'.http_build_query($each_photo_link));
endfor;

}
//print_r($query);


//$next_photo = arrIndexOf($this->photoid, $query,'id')+1 ? $query[arrIndexOf($this->photoid, $query,'id')+1]['id'] : 0;
//$prev_photo = arrIndexOf($this->photoid, $query,'id')-1 ? $query[arrIndexOf($this->photoid, $query,'id')-1]['id'] : 0;

 
$this->template->assign([ 
						"photo_direct_link" => urldecode($_SERVER['REQUEST_URI'].'?'.http_build_query(array_merge($_POST))),
						"nav_uid" => $this->USER['id'],
						"curr_pid" => $this->curr_pid,
						"uid" => $this->userid,
						"this" => $this,
						"cookii" => $_COOKIE,
						"query" => $query,
						"count_res" => sizeof($query),
						"c" => 0,
						"clubid" => $this->clubid,
						"albumid" => $this->albumid ? $this->albumid : 0,
						"bookmarked" => $this->isFavorite(),
						"photo" => $this->photoid,
						"fromSize" => $this->fromImageSize,
						"df_szh"=>$this->frmSizeh,
						"df_szw"=>$this->frmSizew 
 ]);

$content = $this->template->fetch($this->theme_dir. ($this->clubid ? '/popups/community_photo_viewer.html' : '/popups/p_photo_viewer.html') );
echo $this->getPage($content);
}

// bookmarked photo
public function isFavorite() {
	
	$i = $this->USER['id'];
	$q = $this->db->query("select `id` from ".tbl_bookmarks." where `itemid`='{$this->photoid}' and `categ`='photo' and `uid`='{$i}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	return isset($r['id']) ? $r['id'] : 0;
	
}

public function view_photo_by_link() {
	
 if ($_SERVER['REQUEST_METHOD'] != "POST") 
	{
	$content = '<a id="refresh-url" href="'.$_SERVER["REQUEST_URI"].'" data-vphopen="1" data-vphi="'.base64_encode($this->photoid).'"></a>';
	echo $this->getPage($content);
	}
 
}


} // end class