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
          						        


class _to_feed extends _global_co {

   private $itemid;
   private $type;
   private $parentid;
   private $now;
   private $i;
   private $in_community;

public function __construct($itemid,$type,$parentid,$in_community){

parent::__construct();


        $this->itemid = $itemid;
        $this->type = $type;
    	$this->parentid = $parentid;
        $this->now = time();
		$this->i = isset($this->USER['id']) ? (int) $this->USER['id'] : '';
		$this->in_community = $in_community ? 'yes' : 'no';

	if(!$this->i) die;

}

public function postToFeed(){


$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$this->i}', `itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}', `parent_id`='{$this->parentid}',`community`='{$this->in_community}'");

return $send;

}

// likes on video to feed
public function VlikesToFeed(){
	$send = 0;

	
// check for multiple likes on videos
$f_interval = strtotime("-12 hours");
$check = $this->query_select("select id,itemid from ".tbl_feed." where (`categ`='like_video' || `categ`='like_multi_videos') && `byuser`='{$this->i}' && `parent_id`='{$this->parentid}' && `added` >= '{$f_interval}' limit 1");

if(count($check)){
	$_item_id = $feed_id = '';
	
	foreach($check as $r_inq):
	$_item_id = $r_inq['itemid'];
	$feed_id = $r_inq['id'];
	endforeach;
	
	$_item_id = empty($_item_id) ? $_item_id : $_item_id.','.$this->itemid;
	$send = $this->query_update("update ".tbl_feed." set `categ`='like_multi_videos',`itemid`='{$_item_id}',`added`='{$this->now}' where `id`='{$feed_id}'");
	
} else {

$q = $this->db->query("select `id`,`byuser` from ".tbl_feed." where `categ`='like_video' and `itemid`='{$this->itemid}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);
$list_users = $r['byuser'];
$feed_id = $r['id'];
$search_user = in_array($this->i, explode(',', $list_users));
$ins_data = empty($list_users) ? $this->i : $list_users.','.$this->i;


if(!$feed_id)
$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$ins_data}',`community`='{$this->in_community}', `itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}', `parent_id`='{$this->parentid}'");
else if( $feed_id && !$search_user )
$send = $this->query_update("update ".tbl_feed." set `byuser`='{$ins_data}',`added`='{$this->now}' where `id`='{$feed_id}'");
}

 return $send;
	
}

// shares to feed
public function resharePost(){
$send = 0;	

if($this->itemid && $this->parentid)
$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$this->i}',`community`='{$this->in_community}', `itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}', `parent_id`='{$this->parentid}'");
	
return $send;	
}
// likes on shared posts to feed
public function SlikesToFeed(){
$send = 0;	

if($this->itemid && $this->parentid)
$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$this->i}',
`community`='{$this->in_community}',
 `itemid`='{$this->itemid}',
 `added`='{$this->now}',
 `categ`='{$this->type}', `parent_id`='{$this->parentid}'");
	
return $send;	
}
// likes on posts to feed
public function POSTlikesToFeed(){
$send = 0;	

if($this->itemid && $this->parentid)
$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$this->i}',`community`='{$this->in_community}', `itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}', `parent_id`='{$this->parentid}'");
	
return $send;	
}

// likes on photos to feed
public function PlikesToFeed(){
	$send = 0;
	//if( !count($this->query_select("select `id` from ".tbl_feed." where `categ`='like_photo' and `byuser`='{$this->i}' and `itemid`='{$this->itemid}' limit 1")) )
    //$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$this->i}', `itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}'");

// check for multiple likes on photos
$f_interval = strtotime("-12 hours");
$check = $this->query_select("select id,itemid from ".tbl_feed." where (`categ`='like_photo' || `categ`='like_photo_album') && `byuser`='{$this->i}' && `parent_id`='{$this->parentid}' && `added` >= '{$f_interval}' limit 1");

if(count($check)){
	$_item_id = $feed_id = '';
	
	foreach($check as $r_inq):
	$_item_id = $r_inq['itemid'];
	$feed_id = $r_inq['id'];
	endforeach;
	
	$_item_id = empty($_item_id) ? $_item_id : $_item_id.','.$this->itemid;
	$send = $this->query_update("update ".tbl_feed." set `parent_id`='{$this->parentid}',`categ`='like_photo_album',`itemid`='{$_item_id}',`added`='{$this->now}' where `id`='{$feed_id}'");
	
} else {

$q = $this->db->query("select `id`,`byuser` from ".tbl_feed." where `categ`='like_photo' and `itemid`='{$this->itemid}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);
$list_users = $r['byuser'];
$feed_id = $r['id'];
$search_user = in_array($this->i, explode(',', $list_users));
$ins_data = empty($list_users) ? $this->i : $list_users.','.$this->i;


if(!$feed_id)
$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$ins_data}', `community`='{$this->in_community}',`itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}', `parent_id`='{$this->parentid}'");
else if( $feed_id && !$search_user )
$send = $this->query_update("update ".tbl_feed." set `byuser`='{$ins_data}',`added`='{$this->now}' where `id`='{$feed_id}'");
}

 return $send;
	
}

public function friendFeed(){

/*
$q_ck = $this->db->query("select `id`,`itemid`,`categ` from ".tbl_feed." where `byuser`='$this->i' order by id desc limit 1");
$c_ck = $q_ck->fetch_array(MYSQLI_ASSOC);

$c_ck = '';
foreach($q_ck as $res)
$c_ck = $res;


if($c_ck['categ'] == 'newfriend'){
$up_it = $c_ck['itemid'] . ',' . $this->itemid; 
$c_id = $c_ck['id'];
$sql = "UPDATE ".tbl_feed." SET `itemid`='$up_it',`added`='$this->now' where `id` = '$c_id'";

} else {

$query = $this->db->query("Select `id`,`itemid`,`added` from ".tbl_feed." where `byuser`='$this->i' and `categ`='newfriend' order by id desc limit 1");
$check = $query->fetch_array(MYSQLI_ASSOC);


if($check['added'] >= strtotime("-1 hour")){
$c_id = $check['id'];
$old_fr = $check['itemid'] . ','. $this->itemid;
$sql = "UPDATE ".tbl_feed." SET `itemid`='$old_fr',`added`='$this->now' where `id` = '$c_id'";

} else {

$sql = "INSERT INTO ".tbl_feed."
   				(`byuser`, `itemid`, `added`, `categ`,`parent_id`)
				VALUES
    				('$this->i','$this->itemid','$this->now','$this->type','$this->i'),
    				('$this->itemid','$this->i','$this->now','$this->type','$this->i')";

}


}*/

$sql = "INSERT INTO ".tbl_feed."
   				(`byuser`, `itemid`, `added`, `categ`,`parent_id`)
				VALUES
    				('{$this->i}','{$this->itemid}','{$this->now}','{$this->type}','{$this->i}'),
    				('{$this->itemid}','{$this->i}','{$this->now}','{$this->type}','{$this->i}')";

$send = $this->db->query($sql);

}

public function productToFeed(){
	
$send = $this->query_insert("insert into ".tbl_feed." set `byuser`='{$this->i}', `itemid`='{$this->itemid}',`added`='{$this->now}', `categ`='{$this->type}', `parent_id`='{$this->parentid}'");

return $send;
}
} // end class