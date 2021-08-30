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

 // fetching urls
 require_once 'class.openGraph.php';
 
class postsClass extends _global_co {


public $gPhoto   = "/getPhoto";
public $photoid;
public $userid;
public $time;
public $checked;
public function __construct(){

//the old building from parent class
parent::__construct();


//$this->photoid = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
$this->userid = $this->USER['id'];
$this->time = time();
$this->checked = isset($_POST['post_as_status']) ? 'yes' : 'no';
}


// post song to status
public function songToStatus($song_id){
$i = $this->userid;
$this->checked = 'yes';
$now = time();
$insert = $this->query_insert("insert into ".tbl_posts." set `userid`='{$i}', `type`='song', `text`='{$song_id}',`added`='{$now}',`available`='{$this->checked}'");

if($insert){
	
if($this->checked === 'yes')	
$update = $this->query_update("update ".tbl_posts." set `available`='no' where `userid`='{$i}' and `id`<>'{$insert}'");

echo $this->sendResponse(['response' => 'OK', 'id' => $insert]);
$this->toFeed($insert,'post','postToFeed');
}else
echo $this->sendResponse(['response' => $this->lang['p_status_err_thc']]);

}


// post status as text
public function textToStatus($text){
	
$clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : '';
$i = $this->userid;
$now = time();

$insert = $clubid ? 
$this->query_insert("insert into ".tbl_posts." set `userid`='{$i}', `type`='text', `text`='{$text}', `added` ='{$now}',`available`='no',`community`='yes',`clubid`='{$clubid}'") 
: $this->query_insert("insert into ".tbl_posts." set `userid`='{$i}', `type`='text', `text`='{$text}', `added` ='{$now}',`available`='{$this->checked}'");

if($insert){
			if($this->checked === 'yes')	
				$update = $this->query_update("update ".tbl_posts." set `available`='no' where `userid`='{$i}' and `id`<>'{$insert}'");



if(!$clubid)
$this->toFeed($insert,'post','postToFeed');
else
$this->toFeed($insert,'post','postToFeed',$clubid,true);


echo $this->sendResponse(['response' => 'OK', 'id' => $insert]);
}else
echo $this->sendResponse(['response' => $this->lang['p_status_err_thc']]);

}

// media to status
public function mediaToStatus($content,$categ){
	
	$clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : '';
$i = $this->userid;
$now = $this->time;
$insert = $clubid ? 
$this->query_insert("insert into ".tbl_posts." set `userid`='{$i}', `type`='{$categ}', `text`='{$content}',`added`='{$now}',`available`='no',`community`='yes',`clubid`='{$clubid}'")
 : $this->query_insert("insert into ".tbl_posts." set `userid`='{$i}', `type`='{$categ}', `text`='{$content}',`added`='{$now}',`available`='{$this->checked}'");
	
if($insert){
	
if(!$clubid && $this->checked === 'yes')
$update = $this->query_update("update ".tbl_posts." set `available`='no' where `userid`='{$i}' and `id`<>'{$insert}'");

if(!$clubid)
$this->toFeed($insert,'post_media','postToFeed');
else
$this->toFeed($insert,'post_media','postToFeed',$clubid,true);

echo $this->sendResponse(['response' => 'OK', 'id' => $insert]);


}else
echo $this->sendResponse(['response' => $this->lang['p_status_err_thc']]);
	
	
}

// select tracks
public function selectTracks(){
	
	if(!$this->userid) {echo 0;}else {
		
		
		$q = $this->query_select("select s.id,s.artist,s.title,s.path as filename,s.album,s.cover from ".tbl_songs." s, ".tbl_music." my where my.owner='{$this->userid}' and s.id=my.musid group by my.id order by my.position asc,my.added desc limit 300");
		if(count($q))
		echo json_encode($q);
		else echo 1;
	
	}
	
}
//search music
public function postSearchMusic(){
	$key = isset($_POST['key']) ? $_POST['key'] : '';
	
		if(!$key) {echo 2;die;}
		if(!$this->userid) {echo 0;}else {
		
		
		$q = $this->query_select("select s.id,s.artist,s.title,s.path as filename,s.album,s.cover from ".tbl_songs."s where s.artist LIKE N'%$key%' or s.title LIKE N'%$key%' OR s.album LIKE N'%$key%' group by s.id order by s.artist asc limit 400");
		if(count($q))
		echo json_encode($q);
		else echo 1;
	
	}
}
// fetch url
public function fetchUrl(){

	$url = isset($_POST['url']) ? $_POST['url'] : '';
	$clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : false;

	if(trim($url) && filter_var($url, FILTER_VALIDATE_URL)){

		// link is a image
		$imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
		$urlExt = pathinfo($url, PATHINFO_EXTENSION);
		 if (in_array(strtolower($urlExt), $imgExts)) {

			$newImageName = $clubid ? $this->createImageFromUrlForCommunities($url,$clubid) : $this->createImageFromUrl($url);
		 
			if($newImageName){
				
            $userid = $this->USER['id'];

			$file_size = filesize($clubid ?  __ROOT__.__COMMUNITIES_IMAGES_DIR.'/large/'.$clubid.'/'.$newImageName : __ROOT__.$this->settings['PH_OUTPUT_DIR'].'/'.$userid.'/large/'.$newImageName); // Get file size in bytes
				
				
				if(!$clubid) {
				// check if the album "Miscellaneous" is created
				$check = $this->db->query("select id from ".tbl_albums." where `userid`='{$userid}' and `name`='LANG_ALBUM_MISCELLANEOUS'");
				$albid = $check->fetch_array(MYSQLI_ASSOC);
				$albid = $albid['id'];
				if(!$albid)
					// create album "Miscellaneous"
					$albid = $this->query_insert("insert into ".tbl_albums." set `userid`='{$userid}',`name`='LANG_ALBUM_MISCELLANEOUS',`added`='".time()."'");
				} else {
					
					$albid = 0;
				}
				
			$phadded = time();	

		
		    $photoId = $clubid ? 
			
			$this->query_insert("insert into ".tbl_communities_pics." set `userid`='{$userid}',`info`='{$url}',`filename` = '{$newImageName}', `added`='{$phadded}', `size`='{$file_size}', `type`='{$urlExt}',`group_id`='{$clubid}', `albumid`='{$albid}'")
		
			: 
			
			$this->query_insert("insert into ".tbl_photos." set `userid`='{$userid}',`info`='{$url}',`filename` = '{$newImageName}', `added`='{$phadded}', `size`='{$file_size}', `extension`='{$urlExt}', `albumid`='{$albid}'");
		
				
				
			echo json_encode([ "clubid" => $clubid, "image" => $newImageName,"phalbum" => $albid,"phsize"=>$file_size,"phadded"=>$phadded,"phext"=>$urlExt, "photoid" => $photoId,"phFilename"=>$newImageName, "description" => $url, "type" => "image"]);
			}else echo 0;
		
		exit;
		}
 
	
        $graph = OpenGraph::fetch($url);
        $array[] = array();
        $is_video = false;
		$is_youtube = false;
		
		if($graph){
			
        foreach($graph as $key => $value) {
			
			 
            $array[$key] = mb_convert_encoding($value, 'iso-8859-1', 'utf-8');
			
		
		if($value == 'video') $is_video = true;
        }
		
		if($array['title'] == 'YouTube'){

			$is_video = true;
			$array['site_name'] = 'YouTube';
			$is_youtube = 1;
		} 
		
		if(!$is_video){
		// get all images
		$gimages = $this->getExternalImages($url);
		$array['all_images'] = $gimages;  
		} else if(isset($array['site_name']) && ($array['site_name'] == 'YouTube' || $array['site_name'] == 'Vimeo')) {
			$key = $array;
			
			if(! $is_youtube ){
			$site_name = isset($key['site_name']) ? $this->sql_escape($key['site_name']) : '';
			$vurl = isset($key['url']) ? $this->sql_escape($key['url']) : '';
			$title = isset($key['title']) ? $this->sql_escape($key['title']) : '';
			$vdcover = isset($key['image']) ? $this->sql_escape($key['image']) : '';
			
			$type = isset($key['type']) ? $this->sql_escape($key['type']) : '';
			$video_url = isset($key['video:url']) ? ( $site_name == 'Vimeo' ? $this->sql_escape($key['url']) : $this->sql_escape($key['video:url']) ) : '';
			$video_tags = isset($key['video:tag']) ? $this->sql_escape($key['video:tag']) : '';
			$vm = $site_name == 'Vimeo' ? new vimeoVData((int) substr(parse_url($vurl, PHP_URL_PATH), 1)) : '';
			$description = isset($key['description']) ? ($site_name == 'Vimeo' ? $this->sql_escape($vm->getVideoProperty('description')) : $this->sql_escape($key['description'])) : '';
			$video_dur = $vurl ? (!$vm ? getYoutubeVideoDur($vurl) : getVideoDur((int) $vm->getVideoProperty('duration'))) : '--:--';
			
			} else {
				
				// Display Data 

				$yt_data_array = fetch_youtube_url($url);
				//print_r($yt_data_array);
				$dt_snippet = $yt_data_array['items'][0];
				$snippet = $dt_snippet['snippet'];
				$description = $this->sql_escape($snippet['description']);
				$title = isset($snippet['title']) ? $this->sql_escape($snippet['title']) : '';
				$tags = isset($snippet['tags']) ? $snippet['tags'] : '';
				$vdcover = isset($snippet['thumbnails']['maxres']) ? $snippet['thumbnails']['maxres']['url'] : ( isset($snippet['thumbnails']['high']) ? $snippet['thumbnails']['high']['url'] : ( isset($snippet['thumbnails']['medium']) ? $snippet['thumbnails']['medium']['url'] : $snippet['thumbnails']['default']['url'] ) );
				$video_dur = getYoutubeVideoDur($url);
				$video_url = $url;
				$video_tags = '';
				$site_name = 'YouTube';
				
				
				
				if( carray($tags) ){
					
						$i = 0;
						foreach($tags as $tag):
						$video_tags .= $this->sql_escape($tag) . (count($tags) == $i+1 ? '' : ',');
						$i++;
						endforeach;
	
				} else $video_tags = $tags;
	
			}
			
			
			$userid = $this->userid;	
			
			
			if(!$clubid) {
				// check if the album "Videos" is created
				$check = $this->db->query("select id from ".tbl_albums." where `userid`='{$userid}' and `video`='yes'");
				$albid = $check->fetch_array(MYSQLI_ASSOC);
				$albid = isset($albid) && $albid > 0 ? $albid['id'] : '';
				if(!$albid)
					// create album "Miscellaneous"
					$albid = $this->query_insert("insert into ".tbl_albums." set `userid`='{$userid}',`name`='LANG_ALBUM_VIDEOS',`added`='".time()."',`video`='yes'");	
			} else {
				
				$albid=0;
			}
		    $insert_into_videos = $clubid ? 

										$this->query_insert("insert into ".tbl_communities_pics." set 
																									`userid`='{$userid}',
																									`vd_name`='{$title}',
																									`filename` = '{$video_url}',
																									`info`='{$description}',
																									`added`='".time()."',
																									`size`='NULL',
																									`type`='NULL',
																									`group_id`='{$clubid}',
																									`vd_external`='{$site_name}',
																									`vd_duration`='{$video_dur}',
																									`vd_tags` = '{$video_tags}',
																									`albumid`='{$albid}',
																									`file`='video'
							")

			: $this->query_insert("insert into ".tbl_videos." set
																			`userid`='{$userid}',
																			`title`='{$title}',
																			`description`='{$description}',
																			`filename` = '{$video_url}',
																			`added`='".time()."',
																			`size`='NULL',
																			`extension`='NULL',
																			`albumid`='{$albid}',
																			`external`='{$site_name}',
																			`dur`='{$video_dur}',
																			`tags`='{$video_tags}'
											");
											
											
			// upload video cover
			if($vdcover){
				
			if(!$clubid) {
			$dir = __ROOT__.__VD_DIR.$userid.'/thumbs/';
				
				if (!file_exists($dir))
				@mkdir($dir, 0777, true);
			
			$vd_cv = $dir.$insert_into_videos.'.png';
			@file_put_contents($vd_cv, @file_get_contents($vdcover));
			
			} else {
			$dir = __ROOT__.__COMMUNITIES_VIDEOS_DIR.$clubid.'/covers/';
			if (!file_exists($dir))
			@mkdir($dir, 0777, true);
			$vd_cv = $dir.$insert_into_videos.'.png';
			@file_put_contents($vd_cv, @file_get_contents($vdcover));
			}
			
			}
			echo json_encode(["type"=>"video", "filename" => $video_url, "clubid" => $clubid, "vd_id" => $insert_into_videos,"vd_title"=>$title,"vd_dur" => $video_dur]);
			
			die;
			
		}
		
		
 
		
		
        echo json_encode($array);
		
		} 
		else
			echo 0;		
		
	} 
	else
		echo 0;
	
}

// share link
public function shareLink(){
	$link = isset($_POST['lnk']) ? $_POST['lnk'] : '';
	$data = isset($_POST['obj']) ? $_POST['obj'] : '';
	$res =0;
	if(!$this->userid) {echo 0;}else {
	
		if($link && $data){
		$data = addslashes($data);
		$query_insert = $this->query_insert("insert into ".tbl_slinks." set `added`='{$this->time}',`byuser`='{$this->userid}',`link`='{$link}',`data`='{$data}'");
			$res = $query_insert;
		}
	
	}
	echo $res;
}

//get images from fetched link
public function getExternalImages($url){

if(!$url) die;


// link is a image
$imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
$html = file_get_contents($url);
$arr = [];
$doc = new DOMDocument();
@$doc->loadHTML($html);

$tags = $doc->getElementsByTagName('img');



foreach ($tags as $tag) {
	
		
	   $src = $tag->getAttribute('src');
	   $urlExt = pathinfo($src, PATHINFO_EXTENSION);

	   if(!in_array($src, $arr) && in_array($urlExt, $imgExts) && strpos($src, "//")):

		$img_get_size = @getimagesize($src);
		$img_width = $img_get_size[0];
		$img_height = $img_get_size[1];
		if($img_width >= 20 || $img_height >= 20 )
		$arr[] = $src;
		
		// maximum 25 images
		if(sizeof($arr) > 23) break;
	endif;
}
return $arr;	
}

// insert checked in
public function checkIn(){
	
	$location = isset($_POST['data']) ? addslashes(@json_encode($_POST['data'])) : '';
	$place_id = isset($_POST['placeid']) ? $this->test_input($_POST['placeid']) : '';
	$place_type = isset($_POST['place_type']) ? $this->test_input($_POST['place_type']) : '';
	$delete_place = isset($_POST['delete_id']) ? $this->test_input($_POST['delete_id']) : '';
	if($location && $this->USER){
		
		if(!empty($delete_place) || $delete_place > 0)
			$delete_place = $this->query_delete("delete from ".tbl_checkin." where `id`='{$delete_place}' and `user`='{$this->userid}'");
		
		$insert = $this->query_insert("insert into ".tbl_checkin." set `place_type`='{$place_type}',`place_id`='{$place_id}',`user`='{$this->userid}',`data`='{$location}',`added`='{$this->time}'");
		
		if($insert) echo $insert; else echo 0;
		
		
	} else echo 0;
	
}
// remove checked in 
public function rcheckIn(){
	
	$place_id = isset($_POST['i']) ? $this->test_input($_POST['i']) : '';
	
	
		if($place_id && $this->userid){
		
		$check_user = count($this->query_select("select id from ".tbl_checkin." where `user`='{$this->userid}' and `id`='{$place_id}'"));
		if($check_user){
		$delete = $this->query_delete("delete from ".tbl_checkin." where `id`='{$place_id}' and `user`='{$this->userid}'");
		
		if($delete) echo 1; else echo 0;
		} else echo 0;
		
	} else echo 0;
}
public function bVideoThumb(){
	
	$club_id = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : '0';
	
	return !$club_id ? $this->createVideoThumbnail() : $this->createVideoThumbnailForComm($club_id);
	
}

// create video thumb for communities
public function createVideoThumbnailForComm($club_id){
	
	 $i = $this->USER['id'];
	 $vid = isset($_POST['vid']) ? $this->test_input($_POST['vid']) : 0;
	 $thumb_data = isset($_POST['img_data']) ? $_POST['img_data'] : '';
	 $covers_dir = __ROOT__.__COMMUNITIES_VIDEOS_DIR.$club_id.'/covers/';
	 $r = array();
	 
	 $s3_thumbs_dir = __ROOT__.'/stcmd/s3-communities-videos-covers/';
	 $s3_success = false;
	 
	 if(!$this->settings['AMAZON_S3_ENABLED']) {
	// covers dir
    if(!file_exists($covers_dir))
    @mkdir($covers_dir, 0777, true);
	 
	 if($vid && $thumb_data){
		 
		 
		 // image data
		 $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $thumb_data));

		 if(@file_put_contents($covers_dir.$vid.'.png', $data)){
			$r['s'] = 1;
			$r['vid'] = $vid;
		 }else $r['s'] = $this->lang['err_create_video_thumb'];
		 
		 
	 } else $r['s'] = $this->lang['invalid_video_thumb'];
	 
	 
	} else {
		
		
		
		
	// thumbs dir
    if(!file_exists($s3_thumbs_dir))
    @mkdir($s3_thumbs_dir, 0777, true);
		 
		 
	 if($vid && $thumb_data){
		 
		
		 
		 // image data
		 $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $thumb_data));

		 
 
	
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_COMMUNITIES_VIDEO_COVERS_BUCKET'];

 
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	$videoCover = $s3_thumbs_dir.$vid.'.png';
	if(@file_put_contents($videoCover, $data)){
		
		
		 $folderName = 'communities/videos/'.$club_id.'/covers/'; // path on s3 bucket.
 
	
	
		 foreach($buckets as $bucket):
		 if($this->s3->putObjectFile($videoCover, AWS_S3_BUCKET_NAME, $folderName.$vid.'.png', S3::ACL_PUBLIC_READ)){
			 $s3_success = true;
			$r['s'] = 1;
			$r['vid'] = $vid;
			
		 }else $r['s'] = $this->lang['err_create_video_thumb'];
			 
	
		 
		 endforeach;
		 
		 
		 if($s3_success) unlink($videoCover);
		 
		 
		 
		 	}
			
			
			
		
		 	 
		 
		 
		 
		 
	 } else $r['s'] = $this->lang['invalid_video_thumb'];
		
		
		
	}
	 
	 
	 echo json_encode($r);
	
}

 // create video thumb
 public function createVideoThumbnail(){
	 $i = $this->USER['id'];
	 $vid = isset($_POST['vid']) ? $this->test_input($_POST['vid']) : 0;
	 $thumb_data = isset($_POST['img_data']) ? $_POST['img_data'] : '';
	 
	 $thumbs_dir = __ROOT__.$this->settings['VD_OUTPUT_DIR'] . $this->USER['id'] . '/thumbs/';
	 $s3_thumbs_dir = __ROOT__.'/stcmd/s3-uvideo-covers/';
	 $r = array();
	 $s3_success = false;



	 if(!$this->settings['AMAZON_S3_ENABLED']) {
	 
	// thumbs dir
    if(!file_exists($thumbs_dir))
    @mkdir($thumbs_dir, 0777, true);
	 
	 if($vid && $thumb_data){
		 
		 // check for video if exist & owner
		 $check = count($this->query_select("select id from ".tbl_videos." where `id`='{$vid}' and `userid`='{$i}'"));
		 
		 if(!$check){
			 $r['s'] = $this->lang['vd_update_thumb_invalid_owner'];
		 } else {
		 
		 // image data
		 $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $thumb_data));

		 if(@file_put_contents($thumbs_dir.$vid.'.png', $data)){
			$r['s'] = 1;
			$r['vid'] = $vid;
		 }else $r['s'] = $this->lang['err_create_video_thumb'];
		 }
		 
	 } else $r['s'] = $this->lang['invalid_video_thumb'];
	 
	 } else {
		 
		 
	// thumbs dir
    if(!file_exists($s3_thumbs_dir))
    @mkdir($s3_thumbs_dir, 0777, true);
		 
		 
	 if($vid && $thumb_data){
		 
		 // check for video if exist & owner
		 $check = count($this->query_select("select id from ".tbl_videos." where `id`='{$vid}' and `userid`='{$i}'"));
		 
		 if(!$check){
			 $r['s'] = $this->lang['vd_update_thumb_invalid_owner'];
		 } else {
		 
		 // image data
		 $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $thumb_data));

		 
 
	
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_USER_VIDEO_BUCKET'];

 
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	$videoCover = $s3_thumbs_dir.$vid.'.png';
	if(@file_put_contents($videoCover, $data)){
		
		

	
		 $folderName = 'uvideo/'.$this->USER['id'].'/covers/'; // path on s3 bucket.
		 foreach($buckets as $bucket):
		 if($this->s3->putObjectFile($videoCover, AWS_S3_BUCKET_NAME, $folderName.$vid.'.png', S3::ACL_PUBLIC_READ)){
			 $s3_success = true;
			$r['s'] = 1;
			$r['vid'] = $vid;
			
		 }else $r['s'] = $this->lang['err_create_video_thumb'];
			 
	
		 
		 endforeach;
		 
		 
		 if($s3_success) unlink($videoCover);
		 
		 
		 
		 	}
			
			
			
		
		 	 }
		 
		 
		 
		 
	 } else $r['s'] = $this->lang['invalid_video_thumb'];
		 
		 
	 }
	 
	 
	 echo json_encode($r);
 }

 // save video info
 public function saveVideoInfo(){
	 $i = $this->USER['id'];
	 $vid = isset($_POST['vid']) ? (int) $this->test_input($_POST['vid']) : '';
	 $title = isset($_POST['title']) ? $this->test_input($_POST['title']) : '';
	 $descr = isset($_POST['descr']) ? $this->test_input($_POST['descr']) : '';
	 $tags = isset($_POST['tags']) ? $_POST['tags'] : '';
	 $clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : '';
	 $r = array();
	 
	 if(!is_numeric($vid)) $r['s'] = $this->lang['vd_save_empty_vid'];
	 else if(empty($title)) $r['s'] = $this->lang['vd_empty_title'];
	 else {
		 
		 
		 // find video in database
		 if(!$clubid) $check = count($this->query_select("select id from ".tbl_videos." where `id`='{$vid}' and `userid`='{$i}'"));
		 
		 if($clubid) $check = 1;
		 
		 if(!$check)
		   $r['s'] = $this->lang['vd_update_thumb_invalid_owner'];
			else {
				
				// update video info
				if(!$clubid)$update = $this->query_update("update ".tbl_videos." set `title`='{$title}', `description`='{$descr}',`tags`='{$tags}' where `id`='{$vid}' and `userid`='{$i}'");
					else 
					$update = $this->query_update("update ".tbl_communities_pics." set `vd_name`='{$title}', `info`='{$descr}',`vd_tags`='{$tags}' where `id`='{$vid}' and `userid`='{$i}'");
		 
				if($update){ $r['s'] = 1; $r['title'] = $title;$r['vid'] = $vid;} else $r['s'] = $this->lang['video_update_err'];
		 
			}
	 
	 
	 }
	 echo json_encode($r);
	 
 }
 
 // delete video
 public function deletevideo(){
	 
	 $i = $this->USER['id'];
	 $postUser = isset($_POST['q']) ? $this->test_input($_POST['q']) : 0;
	 $videoid = isset($_POST['vd']) ? $this->test_input($_POST['vd']) : 0;
	 $delete_video = '';
	 $r = array();
	 
	 if($videoid && $postUser && $this->USER){
		 
		 if($this->USER['id'] !== $postUser) $r['s'] = $this->lang['you_dosent_have_permission_to_delete_this_video'];
		 else {
			 
			 
			 // check for video
			 $check = $this->db->query("select * from ".tbl_videos." where `userid`='{$i}' and `id`='{$videoid}' limit 1");
			 $res = $check->fetch_array(MYSQLI_ASSOC);
			 
			 
		
			 
			 
			 if( isset($res['id']) && $res['id'] > 0 ) {
			 $delete_video = $this->query_delete("delete from ".tbl_videos." where `id`='{$videoid}' and `userid`='{$i}'");
			$s3 = $res['s3'];
				
		 
			$im = __ROOT__.__VD_DIR.$this->USER['id'];
			$trash = __ROOT__.__TRASH_;
			$lvd = $im.'/videos/'.$res['filename'].'.'.$res['extension'];	 
			$thumb = $im.'/thumbs/'.$res['id'].'.png';
				if(!file_exists($trash)){
					
					mkdir($trash, 0777, true);
				}
			
			
			
			if(file_exists($lvd) && $s3 == 'no'){

				if(!file_exists($trash.'/videos/'))
					mkdir($trash.'/videos/', 0777, true);
				

				
				
					@rename($lvd, $trash.'/videos/'.$res['filename'].'.'.$res['extension']);
					
			}
					
					
			if(file_exists($thumb) && $s3 == 'no'){

				 if(!file_exists($trash.'/videos/thumbs/'))
					mkdir($trash.'/videos/thumbs/', 0777, true);
			@rename($thumb, $trash.'/videos/thumbs/'.$res['id'].'.png');
			
			}
			
			
			if($delete_video) {
				$r['s'] = 1; 
				$videoid = $videoid; 
				$description = $res['description']; 
				$filename = $res['filename'];
				$title = $res['title'];
				$added = $res['added'];
				$duration = $res['dur'];
				$external = $res['external'];
				$tags = $res['tags'];
				$s3 = $res['s3'];
				$size = $res['size'];
				$albumid = $res['albumid'];
				$userid = $res['userid'];
				$views = $res['views'];
				$extension = $res['extension'];
				
				
				
// turn off all the comments for respective photo
$off_comments = $this->query_update("update ".tbl_comments." set `available`='no' where `itemid`='{$videoid}' and `item_type`='video'");

// turn off all likes for respective photo
$off_likes = $this->query_update("update ".tbl_klass." set `item_deleted`='yes' where `itemid`='{$videoid}' and `type`='video' and `community`='no'");

// delete from notification
$notif_delete = $this->query_delete("delete from ".tbl_grades." where `itemid`='{$videoid}' and `categ`='video' and `community`='no'");
				
				
				
				// delete from posts
				$this->deleteVideoFromPost($videoid);
				
				// add to deleted videos
				$this->query_insert("insert into ".tbl_deleted_videos." set
				`time`='{$this->time}',
				`videoid`='{$videoid}',
				`title`='{$title}',
				 `description`='{$description}',
				 
				 `filename`='{$filename}',
				 `added`='{$added}',
				 `size`='{$size}',
				 `extension`='{$extension}',
				 
				 `albumid`='{$albumid}',
				 `userid`='{$userid}',
				  `tags`='{$tags}',
				 `views`='{$views}',
				  `external`='{$external}',
				   `dur`='{$duration}',
		 
				`s3`='{$s3}'
			 ");
				

				} else $r['s'] = $this->lang['video_not_found'];
		 
		 
			 }
			 
		 }
		 
	 }
	 echo json_encode($r);
 }
 
  // restore video
 public function restoreVideo(){
	 
	 $i = $this->USER['id'];
	 $postUser = isset($_POST['q']) ? $this->test_input($_POST['q']) : 0;
	 $videoid = isset($_POST['vid']) ? $this->test_input($_POST['vid']) : 0;
	 
	 
	 $restore_video = '';
	 $r = array();
	 
	 if($videoid && $postUser && $this->USER){
		 
		 if($this->USER['id'] !== $postUser) $r['s'] = $this->lang['you_dosent_have_permission_to_restore_this_video'];
		 else {
			 
			 
			 
			// get data from deleted videos table
				$deleted_video = $this->db->query("Select * from ".tbl_deleted_videos." where `videoid`='{$videoid}' limit 1");
				$del_res = $deleted_video->fetch_array(MYSQLI_ASSOC);
			 
	 
	 $title = $del_res['title'];
	 $description = $del_res['description'];
	 $filename = $del_res['filename'];
	 $added = $del_res['added'];
	 $duration = $del_res['dur'];
	 $external = $del_res['external'];
	 $tags = $del_res['tags'];
	 $s3 = $del_res['s3'];
	 $size = $del_res['size'];
	 $views = $del_res['views'];
	 $albumid = $del_res['albumid'];
	 $userid = $del_res['userid'];
	 $extension = $del_res['extension'];
 
	$restore_video = $this->query_insert("insert into ".tbl_videos." set `id`='{$videoid}',
				
				
				`title`='{$title}',
		 `description`='{$description}',
		 
		 `filename`='{$filename}',
		 `added`='{$added}',
		 `size`='{$size}',
		 `extension`='{$extension}',
		 
		 `albumid`='{$albumid}',
		 `userid`='{$userid}',
		  `tags`='{$tags}',
		 `views`='{$views}',
		  `external`='{$external}',
		   `dur`='{$duration}',
 
			 `s3`='{$s3}' ");
		 
// turn on all the comments for respective photo
$on_comments = $this->query_update("update ".tbl_comments." set `available`='yes' where `itemid`='{$videoid}' and `item_type`='video'");

// turn on all likes for respective photo
$on_likes = $this->query_update("update ".tbl_klass." set `item_deleted`='no' where `itemid`='{$videoid}' and `type`='video' and `community`='no'");
		 
		 // restore video & thumb files
			$im = __ROOT__.__VD_DIR.$userid;
			$trash = __ROOT__.__TRASH_;
			$lvd = $im.'/videos/'.$filename.'.'.$extension;	 
			if(file_exists($trash.'/videos/'.$filename.'.'.$extension) && $s3 == 'no'){
 
				
					@rename($trash.'/videos/'.$filename.'.'.$extension, $lvd);
					
					
					
			}
		 
			@rename( $trash.'/videos/thumbs/'.$videoid.'.png', $im.'/thumbs/'.$videoid.'.png');
		 
		 
		 
		 
		 
		 
				if($restore_video) {
					
					$r['s'] = 1;
					$r['vid'] = $restore_video;
					
					// delet video from deleted video table
					$this->query_delete("delete from ".tbl_deleted_videos." where `videoid`='{$videoid}'");
					
					} else $r['s'] = $this->lang['video_not_found'];
		 
			 
		 }
		 
	 }
	 echo json_encode($r);
 }
 
 // post submited, if tagged people, send notification
 public function sendNotifToTaggedPeople(){
	 
	 $friends = isset($_POST['friends']) ? $_POST['friends'] : '';
	 $post_id = isset($_POST['post']) ? $_POST['post'] : '';
	 
	 if($friends && !empty($friends) && $post_id && !empty($post_id)){
		 
		/// $all_data = json_decode($all_data,true);
		 print_r($friends);
		 foreach($friends as $r):
		 $this->toNotif($r,'post_tags',$post_id,$this->userid);
 
		 endforeach;
		 
		 
	 }
	 
 }
 
 // create image from url
 public function createImageFromUrlForCommunities($url,$clubid){
	 
	 
    $dir = __ROOT__.__COMMUNITIES_IMAGES_DIR;
    $large       = $dir.'/large/'.$clubid.'/';
    $medium      = $dir.'/medium/'.$clubid.'/';
    $small       = $dir.'/small/'.$clubid.'/';


    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

 
$ok = 0;
$img = file_get_contents($url);

$im = imagecreatefromstring($img);

$width = imagesx($im);

$height = imagesy($im);

$newName = basename($clubid.'_'.rand(0, 999999999999999) . rand(0, 999999999999999) . rand(0, 999999999999999) . '.jpg');

for($i=0;$i<3;++$i){
switch ($i){
	
	
		case '0':
	
	// large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

$newwidth = $width;

$newheight = $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$large.$newName); //save image as jpg

imagedestroy($thumb); 


$ok = 1;
break;
	
	
	case '1':
	
	// medium dir
    if(!file_exists($medium))
    mkdir($medium, 0777, true);

$newwidth = $width > $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'] ? $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'] : $width;
$newheight = $height > $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'] ? $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'] : $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$medium.$newName); //save image as jpg

imagedestroy($thumb); 


$ok = 1;
break;


	case '2':
	
	// small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);

$newwidth = $width > $this->settings['GROUPS_SMALL_IMAGES_SIZE'] ? $this->settings['GROUPS_SMALL_IMAGES_SIZE'] : $width;

$newheight = $height > $this->settings['GROUPS_SMALL_IMAGES_SIZE'] ? $this->settings['GROUPS_SMALL_IMAGES_SIZE'] : $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$small.$newName); //save image as jpg

imagedestroy($thumb); 



$ok = 1;
break;
default: $ok = 0;
}


}
imagedestroy($im);
return $ok ? $newName : 0;


 }
 
 // create image from url
 public function createImageFromUrl($url){
	 
	 
    $dir = __ROOT__.$this->settings['PH_OUTPUT_DIR'].$this->USER['id'].'/';
    $large       = $dir.'/large/';
    $medium      = $dir.'/medium/'; 
    $thumbnail   = $dir.'/thumb/';
    $small       = $dir.'/small/';  


    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

 
$ok = 0;
$img = file_get_contents($url);

$im = imagecreatefromstring($img);

$width = imagesx($im);

$height = imagesy($im);

$newName = basename($this->USER['id'].'_'.rand(0, 999999999999999) . rand(0, 999999999999999) . rand(0, 999999999999999) . '.jpg');

for($i=0;$i<4;++$i){
switch ($i){
	
	
		case '0':
	
	// large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

$newwidth = $width;

$newheight = $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$large.$newName); //save image as jpg

imagedestroy($thumb); 


$ok = 1;
break;
	
	
	case '1':
	
	// medium dir
    if(!file_exists($medium))
    mkdir($medium, 0777, true);

$newwidth = $width > $this->settings['MEDIUM_SIZE'] ? $this->settings['MEDIUM_SIZE'] : $width;
$newheight = $height > $this->settings['MEDIUM_SIZE'] ? $this->settings['MEDIUM_SIZE'] : $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$medium.$newName); //save image as jpg

imagedestroy($thumb); 


$ok = 1;
break;

	case '2':
	
	// thumb dir
    if(!file_exists($thumbnail))
    mkdir($thumbnail, 0777, true);

$newwidth = $width > $this->settings['THUMB_SIZE'] ? $this->settings['THUMB_SIZE'] : $width;

$newheight = $height > $this->settings['THUMB_SIZE'] ? $this->settings['THUMB_SIZE'] : $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$thumbnail.$newName); //save image as jpg

imagedestroy($thumb); 


$ok = 1;
break;

	case '3':
	
	// small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);

$newwidth = $width > $this->settings['SMALL_SIZE'] ? $this->settings['SMALL_SIZE'] : $width;

$newheight = $height > $this->settings['SMALL_SIZE'] ? $this->settings['SMALL_SIZE'] : $height;

$thumb = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($thumb, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

imagejpeg($thumb,$small.$newName); //save image as jpg

imagedestroy($thumb); 



$ok = 1;
break;
default: $ok = 0;
}


}
imagedestroy($im);
return $ok ? $newName : 0;


 }
 
 // delete attached image
 public function deletePostAttachedPhoto(){
	 
	 
	 $photoId = isset($_POST['pid']) ? $this->test_input($_POST['pid']) : '';
	 $i = $this->USER['id'];
	 $r = 0;
	 if(is_numeric($photoId) && is_numeric($i)){
		 
		 // check for photo
		 $check = $this->db->query("select filename from ".tbl_photos." where `userid`='{$i}' and `id`='{$photoId}' limit 1");
		 $filename = $check->fetch_array(MYSQLI_ASSOC);
		 $filename = $filename['filename'];
		 if($filename){
			 
			 // delete
			 $delete = $this->query_delete("delete from ".tbl_photos." where `id`='{$photoId}' and `userid`='{$i}'");
			 if($delete){
				 
				@unlink(__ROOT__.__IMG_DIR.'/'.$i.'/large/'.$filename);
				@unlink(__ROOT__.__IMG_DIR.'/'.$i.'/medium/'.$filename);
				@unlink(__ROOT__.__IMG_DIR.'/'.$i.'/thumb/'.$filename);
				@unlink(__ROOT__.__IMG_DIR.'/'.$i.'/small/'.$filename);
				
				$r = 1;
				 
			 } 
			 
		 }
		 
	 }
	 echo $r;
 }

 // delete post
 public function deleteMyPost(){
	 
	 $post_id = isset($_POST['i']) ? (int) $this->test_input(b_decode($_POST['i'])) : '';
	 $r = 0;
	 if(!is_numeric($post_id) || !isset($this->userid))
			$r = 0;
		else {
			
			// check author of this post
			$check = count($this->query_select("select `id` from ".tbl_posts." where `userid`='{$this->userid}' and `id`='{$post_id}' limit 1"));
			
			if(!$check){
				$r = 1;
			} else {
								
				// delete post
				$delete = $this->query_delete("delete from ".tbl_posts." where `id`='{$post_id}' and `userid`='{$this->userid}'");
				if($delete) $r = 1; else $r = 0;
				
				
				
				if($r){
					
				// delete notification
				$this->query_delete("delete from ".tbl_grades." where `categ`='post' and `itemid`='{$post_id}' and `community`='no'");
				
				// hide likes for respective post
				$this->query_update("update ".tbl_klass." set `item_deleted`='yes' where `itemid`='{$post_id}' and `type`='post' and `community`='no'");
					
				// hide comments
				$this->query_update("update ".tbl_comments." set `available`='no' where `categ`='post' and `itemid`='{$post_id}'");	

				// delete post from feed
				$this->query_delete("delete from ".tbl_feed." where `itemid`='{$post_id}' and `categ`='post_media'");
					
				}
							
			}
			
		}
		
		echo $r;
	 
	 
	 
 }
 
  // restore post
 public function restoreMyPost(){
	 
	 $post_data = isset($_POST['d']) ? $_POST['d'] : '';
	 $r = 0;

	 if(!isJson($post_data) || !isset($this->userid))
			$r = 0;
		else {
			
			$d = json_decode($post_data,true);
			$post_id = isset($d['i']) ? b_decode($d['i']) : 0;
			$post_added  = isset($d['added']) ? $d['added'] : time();
			$post_available = isset($d['available']) ? $d['available'] : 'no';
			$post_type = isset($d['type']) ? $d['type'] : 'media';
			$post_cnt = isset($d['cnt']) ? $d['cnt'] : $this->lang['post_corrupted_content'];
			$clubid = isset($d['clubid']) ? (int) $d['clubid'] : '';
			$community = isset($d['community']) ? $d['community'] : 'no';
			
			
			if(!$post_id){
				
				$r = 0;  
			
			} else {
			
				
				// restore post
				$restored = $this->query_insert("insert into ".tbl_posts." set `clubid`='{$clubid}',`community`='{$community}',`id`='{$post_id}', `userid`='{$this->userid}', `type`='{$post_type}', `available`='{$post_available}',`text`='{$post_cnt}',`added`='{$post_added}'");
				if($restored) $r = 1; else $r = 0;
				
				if($r){
					
				// show comments
				$this->query_update("update ".tbl_comments." set `available`='yes' where `categ`='post' and `itemid`='{$post_id}'");
				
				// show likes
				$this->query_update("update ".tbl_klass." set `item_deleted`='no' where `itemid`='{$post_id}' and `type`='post' and `community`='no'");
					
				}
							
			}
			
		}
		
		echo $r;
	 
	 
	 
 }

 // set as current status
 public function setAsCurrStatus(){
	 
	 $post_id = isset($_POST['i']) ? (int) $this->test_input(b_decode($_POST['i'])) : '';
	 $r = 0;
	 
	 if(!is_numeric($post_id) || $post_id <= 0)
		 $r = 0;
	 else {
		 
		 // check for status
		 $check = count($this->query_select("select id from ".tbl_posts." where `id`='{$post_id}' and `userid`='{$this->userid}' limit 1"));
		 
		 if($check){
			 
			 // unavailable curr status
			 $update = $this->query_update("update ".tbl_posts." set `available`='no' where `available`='yes' and `userid`='{$this->userid}'");
			 // set available called status
			 $update = $this->query_update("update ".tbl_posts." set `available`='yes' where `available`='no' and `userid`='{$this->userid}' and `id`='{$post_id}'");
			 
			 if($update) $r = 1; else $r = 0;
			 
		 }
		 
		 
	 }
	 
	 echo $r;
	 
 }
 
 // remove user tag
 public function removeUserTag(){
	 
	 $post_id = isset($_POST['i']) ? (int) $this->test_input(b_decode($_POST['i'])) : '';
	 $author_id = isset($_POST['auth']) ? (int) $this->test_input(b_decode($_POST['auth'])) : '';
	 $r = 0;
	 
	 if(!is_numeric($post_id) || $post_id <= 0)
		 $r = 0;
	 else {
		 
		 // check for status
		 $q = $this->db->query("select text from ".tbl_posts." where `id`='{$post_id}' and `userid`='{$author_id}' limit 1");
		 $r = $q->fetch_array(MYSQLI_ASSOC);
		 
		 if(count($r) && !empty($r['text'])){
			 
			 $post_text = $r['text'];
			 $new_text = str_replace('[postTag]'.$this->userid.'[/postTag]', '', $post_text);
			
			// update post
			$update = $this->query_update("update ".tbl_posts." SET `text`='{$new_text}' where `userid`='{$author_id}' and `id`='{$post_id}'");
			$notification_text = '<a class="o" data-clbk="removePopup" href="/profile?q='.$this->userid.'" hrefattr="true">'.$this->USER['fullname'].'</a><span class="__frrpkc_txt"> %remove_himself_from_post%</span>
									... <a href="/post?i='.$post_id.'" data-type-post="1" hrefattr="true"><span class="ic ic_view_post"></span>%view_post%</a>';
		    
      		if($update){ $r = 1; 
			 $this->toNotif($author_id,"text",$post_id,$notification_text,$this->userid);
			 }else $r = 0;
			 
		 }
		 
		 
	 }
	 
	 echo $r;
	 
	 
 }
 
// build new poll
public function newPoll(){
	
	$data = isset($_POST['polldata']) ? $_POST['polldata'] : '';
	
	if( isJson($data) ){
	
	$data = json_decode($data);
	$question = $this->test_input($data->question);

	// insert new question
	$question_id = $this->query_insert("insert into ".tbl_poll_questions." set `question`='{$question}'");
	
	
	// add options for respective question
	if($question_id){
		
	foreach($data->options as $option):
	$option = $this->test_input($option);
	$add_options = $this->query_insert("insert into ".tbl_poll_options." set `question_id`='{$question_id}',`option`='{$option}'");
	endforeach;
		
	}
	echo $question_id;

	} else {
		
		echo 0;
	}
	
} 
 
} // end class