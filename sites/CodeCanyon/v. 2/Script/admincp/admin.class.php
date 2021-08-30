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

						        

require_once("inc/_core.php");


class admincp extends _SOCIALPLUS {
public $ctime;
public $userid;
public $id;
public $s3_bucket_name_default;


public function __construct(){

//the old building from parent class
parent::__construct();
$this->userid = $this->USER['id'];
$this->ctime = time();
$this->id = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : ( isset($_GET['id']) ? (int) $this->test_input($_GET['id']) : false );
$this->s3_bucket_name_default = isset($_SERVER['SERVER_NAME']) ? explode(".",$_SERVER['SERVER_NAME']) : 'SOCIALPLUS'.rand();
	
	if(carray($this->s3_bucket_name_default))
		$this->s3_bucket_name_default = $this->s3_bucket_name_default[0];
	
	
if(!isset($this->USER) || $this->userid <= 0 || $this->USER['class'] == 'UC_USER')
	header("location: /404.html");
 
}

// header
public function header(){
	
	
	$kn_header = $this->theme_dir.'/body/header.html';
	$this->template->assign(["header" => $kn_header, "cmd" => isset($_GET['cmd']) ? $_GET['cmd'] : '', "is_chat" => 1, "is_admin" => 1, "acvm" => false]);

	// get unread messages for feedback
	$c_feedback = count($this->query_select("select id from ".tbl_feedback." where `read`='no'"));
	
	// get unread reports
	$c_reports = count($this->query_select("select id from ".tbl_report." where `seen`='no'"));
	
	// get site name
	$this->template->assign('SITENAME',$this->settings['SITENAME']);
	$this->template->assign('DIR',__ROOT__);
	$this->template->assign(['c_feedback' => $c_feedback, 'c_reports' => $c_reports]);
	$this->template->assign('this',$this);
	$this->template->assign('php_self',$_SERVER['PHP_SELF']);
	$this->template->assign('title',!empty($title) ? '- '.$title : '');
	$this->template->assign('c2global',new _global_co);
	$this->template->display($this->theme_dir."/admincp/header.html");
	
}

// admin panel content
public function cnt(){
	
	// get stats count
	$q = $this->query_select("select COUNT(*) as c from ".tbl_users." 
							UNION ALL
							select COUNT(*) as c from ".tbl_posts."
							UNION ALL 
							select COUNT(*) as c from ".tbl_videos."
							UNION ALL
							select COUNT(*) as c from ".tbl_photos."
							UNION ALL
							select COUNT(*) as c from ".tbl_comments."
							UNION ALL
							select COUNT(*) as c from ".tbl_songs."
							UNION ALL
							select COUNT(*) as c from ".tbl_apps);
							

	

	
	$c_users = $q[0]['c']; // count users
	$c_posts = $q[1]['c']; // count posts
	$c_videos = $q[2]['c']; // count videos
	$c_photos = $q[3]['c']; // count photos

	$c_comments = $q[4]['c']; // count comments
	$c_tracks = $q[5]['c']; // count tracks
	$c_apps = $q[6]['c']; // apps count
	$this->template->assign([ 
								"c_users" => $c_users,
								"c_posts" => $c_posts,
								"c_videos" => $c_videos,
								"c_photos" => $c_photos,
								"c_tracks" => $c_tracks,
								"c_comments" => $c_comments,
								"c_apps" => $c_apps
	]);
	$this->template->display($this->theme_dir.'/admincp/index.html');
}

public function calibrateDatAvg($array){
	
	$a = $b = array();
	
	foreach($array as $r):
	$a[$r['month']] = $r['c'];
	endforeach;
	
	for($i = 1; $i < 13; $i++):
		$x = isset($a[$i]) ? (int) $a[$i] : 0;
			if($i == 1)
				$b[1] = $x;
			else
				$b[] = $x;
	endfor;

	return array_values($b);
}

// get monthly average statistic
public function gSiteMonthAvg(){
	
	$y = $this->cyear;
	$result = array();
	
	// count photos
	$q_photos = $this->query_select("SELECT COUNT(id) as c,MONTH(FROM_UNIXTIME(added)) as month FROM ".tbl_photos." where YEAR(FROM_UNIXTIME(added)) = '{$this->cyear}' GROUP BY YEAR(FROM_UNIXTIME(added)), MONTH(FROM_UNIXTIME(added))");
	$q_users = $this->query_select("SELECT COUNT(id) as c,MONTH(FROM_UNIXTIME(added)) as month FROM ".tbl_users." where YEAR(FROM_UNIXTIME(added)) = '{$this->cyear}' GROUP BY YEAR(FROM_UNIXTIME(added)), MONTH(FROM_UNIXTIME(added))");
	$q_videos = $this->query_select("SELECT COUNT(id) as c,MONTH(FROM_UNIXTIME(added)) as month FROM ".tbl_videos." where YEAR(FROM_UNIXTIME(added)) = '{$this->cyear}' GROUP BY YEAR(FROM_UNIXTIME(added)), MONTH(FROM_UNIXTIME(added))");
	$q_tracks = $this->query_select("SELECT COUNT(id) as c,MONTH(FROM_UNIXTIME(added)) as month FROM ".tbl_songs." where YEAR(FROM_UNIXTIME(added)) = '{$this->cyear}' GROUP BY YEAR(FROM_UNIXTIME(added)), MONTH(FROM_UNIXTIME(added))");
	$q_posts = $this->query_select("SELECT COUNT(id) as c,MONTH(FROM_UNIXTIME(added)) as month FROM ".tbl_posts." where YEAR(FROM_UNIXTIME(added)) = '{$this->cyear}' GROUP BY YEAR(FROM_UNIXTIME(added)), MONTH(FROM_UNIXTIME(added))");
	$q_apps = $this->query_select("SELECT COUNT(id) as c,MONTH(FROM_UNIXTIME(added)) as month FROM ".tbl_apps." where YEAR(FROM_UNIXTIME(added)) = '{$this->cyear}' GROUP BY YEAR(FROM_UNIXTIME(added)), MONTH(FROM_UNIXTIME(added))");


$result['photos'] = $this->calibrateDatAvg($q_photos);
$result['users'] = $this->calibrateDatAvg($q_users);
$result['videos'] = $this->calibrateDatAvg($q_videos);
$result['tracks'] = $this->calibrateDatAvg($q_tracks);
$result['posts'] = $this->calibrateDatAvg($q_posts);
$result['apps'] = $this->calibrateDatAvg($q_apps);
echo json_encode($result);
	
}

// error
public function msg($str,$mode){
	$this->template->assign(["msg" => $str, "mode" => $mode]);
	$this->template->display($this->theme_dir.'/admincp/msg.html');
}
// redirect to in 5 seconds
public function returnto($url){
	
	?>
	<script>
	var url = '<?php echo $url;?>';
	setTimeout(function(){
		
		window.location=url;
	},5000);
	</script>
	<?php
	
}

// get languages files 
public function gLangFiles(){
	
	$langs = array();
	$path = __ROOT__."/inc/lang/";
	$lang_files = glob($path."*.php");
	foreach($lang_files as $l_file)
	$langs[] = str_replace(".php","",str_replace($path,"",$l_file));
	
	return $langs;
}

// site settings
public function siteSettings(){
	
	$kn_settings = glob(__ROOT__."/inc/json/ssettings/*.json");
	$kn_settings = $kn_settings[0];
	
	
	$settings = json_decode(file_get_contents($kn_settings),true); // decode the JSON into an associative array
	

	
	$tzlist = DateTimeZone::listIdentifiers(DateTimeZone::ALL);

	// select all languages files 
	$langs = $this->gLangFiles();
 
	
	$this->template->assign(["tzlist" => $tzlist,
	"limit" => array("personal_photos" => $settings['limit']['p_photos_limit'], 
						"album_photos" => $settings['limit']['a_photos_limit'],
						"pm_conversation_limit" => $settings['limit']['pm_conversation_limit'],
						"pm_messages_limit" => $settings['limit']['pm_messages_limit'],
						"chat_messages_limit" => $settings['limit']['chat_messages_limit'],
						"friends_per_page_limit" => $settings['limit']['friends_per_page_limit'],
						"friends_online_limit" => $settings['limit']['friends_online_limit'],
						"photoviewer_comments_limit" => $settings['limit']['photoviewer_comments_limit'],
						"photo_viewer_comments_replies_limit" => $settings['limit']['photo_viewer_comments_replies_limit'],
						"grades_limit" => $settings['limit']['grades_limit'],
						"post_comments_limit" => $settings['limit']['post_comments_limit'],
						"feed_res" => $settings['limit']['feed_res'],
						"user_feed_limit" => $settings['limit']['user_feed_limit'],
						"post_per_page_limit" => $settings['limit']['post_per_page_limit'],
						"profile_wall_photos_limit" => $settings['limit']['profile_wall_photos_limit'],
						"vide_popup_similar_limit" => $settings['limit']['vide_popup_similar_limit'],
						"search_suggestions_limit" => $settings['limit']['search_suggestions_limit'],
						"search_content_limit" => $settings['limit']['search_content_limit']
				),
	
	
						"s3_bucket_default_name" => $this->s3_bucket_name_default,
	"smilies" => $settings['emoticons_path'], "ip_stack_api" => $settings['ip_stack_api'], "google" => $settings['google'], "sms" => $settings['sms'], "gliphy" => $settings['gliphy'], "movies" => $settings['movies'], "languages" => $langs, "communities" => $settings['communities'], "marketplace" => $settings['marketplace'], "youtube" => $settings['youtube'], "s3" => $settings['s3'], "gifts" => $settings['gifts'], "apps" => $settings['apps'], "v_upload" => $settings['upload_videos'],"p_upload" => $settings['upload_photos'], "u_config" => $settings['user_config'], "site" => $settings['site'], "server" => $settings['server'], "themes" => $settings['themes']]);
	$this->template->display($this->theme_dir.'/admincp/pages/site-settings.html');
}

// save site settings
public function saveSiteSettings(){
	
	
// general	
$host = isset($_POST['host']) ? $this->test_input($_POST['host']) : $_SERVER['SERVER_NAME'];
$sitename = isset($_POST['sitename']) ? $this->test_input($_POST['sitename']) : 'Professional Social Network';
$sitename_lower = isset($_POST['sitename_lower']) ? $this->test_input($_POST['sitename_lower']) : strtolower('Professional Social Network');
$site_slogan = isset($_POST['site_slogan']) ? $this->test_input($_POST['site_slogan']) : 'Connecting people.';
$site_lang = isset($_POST['site_lang']) ? $this->test_input($_POST['site_lang']) : 'en';
$site_ip_region = isset($_POST['site_ip_region']) ? $this->test_input($_POST['site_ip_region']) : 'https://api.ipstack.com/';
$timezone = isset($_POST['timezone']) ? $this->test_input($_POST['timezone']) : 'Europe/Moscow';


// server
$memory_limit = isset($_POST['memory_limit']) ? $this->test_input($_POST['memory_limit']) : '128M';
$max_exec_time = isset($_POST['max_exec_time']) ? (int) $this->test_input($_POST['max_exec_time']) : '300';
	

// users	
$user_status = isset($_POST['user_status']) ? $this->test_input($_POST['user_status']) : 'pending';
$time_keep_user_logged = isset($_POST['time_keep_user_logged']) ? (int) $this->test_input($_POST['time_keep_user_logged']) : '1';
$online_interval = isset($_POST['online_interval']) ? (int) $this->test_input($_POST['online_interval']) : '5';

// upload photos
$max_photo_upload = isset($_POST['max_photo_upload']) ? (int) $this->test_input($_POST['max_photo_upload']) : '20';
$valid_formats = isset($_POST['valid_formats']) ? $_POST['valid_formats'] : array('jpg','jpeg','png','gif');
$p_size_small = isset($_POST['p_size_small']) ? (int) $this->test_input($_POST['p_size_small']) : '80';
$p_size_thumb = isset($_POST['p_size_thumb']) ? (int) $this->test_input($_POST['p_size_thumb']) : '240';
$p_size_medium = isset($_POST['p_size_medium']) ? (int) $this->test_input($_POST['p_size_medium']) : '480';
$p_size_exp = isset($_POST['p_size_exp']) ? (int) $this->test_input($_POST['p_size_exp']) : '600';
$p_size_grid = isset($_POST['p_size_grid']) ? (int) $this->test_input($_POST['p_size_grid']) : '290';
$watermark_url = isset($_POST['watermark_url']) ? $this->test_input($_POST['watermark_url']) : '/css/images/logo/watermark-sitename-v2.png';
$watermark = isset($_POST['watermark']) ? $this->test_input($_POST['watermark']) : 'true';


// apps
$apps_genre = isset($_POST['apps_genre']) ? $_POST['apps_genre'] : ["Casual", "Strategy", "Adventure", "Gambling", "Arcade", "Racing", "Sport", "Shooters", "Other"];

// gifts
$gifts_genre = isset($_POST['gifts_genre']) ? $_POST['gifts_genre'] : ["Cars","Flowers","Friendship","Love","Other"];
$gift_expires_time = isset($_POST['gift_expires_time']) ? $_POST['gift_expires_time'] : '3 days';

// videos
$max_video_upload = isset($_POST['max_video_upload']) ? (int) $this->test_input($_POST['max_video_upload']) : '100';
$vd_valid_formats = isset($_POST['vd_valid_formats']) ?  $_POST['vd_valid_formats'] : array('wmv', 'mp4', 'flv', 'avi');


// marketplace
$marketplace_currency = isset($_POST['marketplace_Currency']) ? $this->test_input($_POST['marketplace_Currency']) : 'USD';
#categories
$marketplace_categories_index = isset($_POST['marketplace_categories']) ? $_POST['marketplace_categories'] : '';
#subcategories
$marketplace_subcategories_index = isset($_POST['marketplace_subcategories_index']) ? $_POST['marketplace_subcategories_index'] : '';
 
$marketplace_categories = array();

if(carray($marketplace_categories_index))
foreach($marketplace_categories_index as $index):
$marketplace_categories[$index] = $index;
endforeach;
 

 
 
if(carray($marketplace_subcategories_index))
foreach($marketplace_subcategories_index as $index):
$marketplace_categories[$index] = $_POST['marketplace_subcategories_'.$index];
endforeach;

 

// communities
$community_small_images_size = isset($_POST['community_small_images_size']) ? (int) $this->test_input($_POST['community_small_images_size']) : '100';
$community_medium_images_size = isset($_POST['community_medium_images_size']) ? (int) $this->test_input($_POST['community_medium_images_size']) : '400';
$group_default_cover = isset($_POST['group_default_cover']) ? $this->test_input($_POST['group_default_cover']) : '/css/images/profile_cover_bg_2.png';

#categories
$communities_categories_one = isset($_POST['communities_categories_one']) ? $_POST['communities_categories_one'] : '';
$communities_categories_two = isset($_POST['communities_categories_two']) ? $_POST['communities_categories_two'] : '';

#subcategories
$communities_subcategories_one_array_index = isset($_POST['communities_subcategories_one_array_index']) ? $_POST['communities_subcategories_one_array_index'] : '';
$communities_subcategories_two_array_index = isset($_POST['communities_subcategories_two_array_index']) ? $_POST['communities_subcategories_two_array_index'] : '';


$communities_subcategories_one = $communities_subcategories_two = array();
 
if(carray($communities_subcategories_one_array_index))
foreach($communities_subcategories_one_array_index as $index):
$communities_subcategories_one[$index] = $_POST['communities_subcategories_one_'.$index];
endforeach;


if(carray($communities_subcategories_two_array_index))
foreach($communities_subcategories_two_array_index as $index):
$communities_subcategories_two[$index] = $_POST['communities_subcategories_two_'.$index];
endforeach;



// themes
$themes_dir = isset($_POST['themes_dir']) ? $this->test_input($_POST['themes_dir']) : '/cmd/themes/';
$default_theme = isset($_POST['default_theme']) ? $this->test_input($_POST['default_theme']) : '/cmd/themes/default/1.jpg';


// emoticons
$smilies_path = isset($_POST['smilies_path']) ? $this->test_input($_POST['smilies_path']) : '/cmd/smilies/';
$meeps_path = isset($_POST['meeps_path']) ? $this->test_input($_POST['meeps_path']) : '/cmd/smilies/meep/';

// email
$site_email = isset($_POST['email']) ? $this->test_input($_POST['email']) : 'no-reply@kontackt.net';

// youtube
$youtube_api_key = isset($_POST['youtube_api_key']) ? $this->test_input($_POST['youtube_api_key']) : 'AIzaSyAfgQrT-dK8BNaIgy-kC6fRHJaB-oxdbQ8';


// google 
$google_api_key = isset($_POST['google_api_key']) ? $this->test_input($_POST['google_api_key']) : '';

// google 
$ip_stack_api = isset($_POST['ip_stack_api']) ? $this->test_input($_POST['ip_stack_api']) : '';

// gliphy (gifs)
$gliphy_api_key = isset($_POST['gliphy_api_key']) ? $this->test_input($_POST['gliphy_api_key']) : 'LPLu3CMwDLo5d8f3JA7ZfOO05qcn4qnW';

// Movies DB api key
$moviesdb_api_key = isset($_POST['moviesdb_api_key']) ? $this->test_input($_POST['moviesdb_api_key']) : '';


// Textlocal SMS 
$sms_enabled = isset($_POST['sms_enable']) ? true : false;
$sms_sender = isset($_POST['sms_sender']) ? $this->test_input($_POST['sms_sender']) : 'Kontackt';
$sms_telcode = isset($_POST['sms_telcode']) ? $this->test_input($_POST['sms_telcode']) : '00';
$sms_email = isset($_POST['sms_email']) ? $this->test_input($_POST['sms_email']) : '';
$sms_password = isset($_POST['sms_password']) ? $this->test_input($_POST['sms_password']) : '';

// mobile view
$mob_view_installed = isset($_POST['mob_view_installed']) ? 'yes' : 'no';
$mob_host = isset($_POST['mob_host']) ? $_POST['mob_host'] : '';

// Real-time app
$nodejs_enabled = isset($_POST['nodejs_enabled']) ? 'yes' : 'no';
$nodejs_host = isset($_POST['nodejs_host']) ? $_POST['nodejs_host'] : '';
$nodejs_port = isset($_POST['nodejs_port']) ? $_POST['nodejs_port'] : '';
$iceservers_stun = isset($_POST['iceserver_stun']) ? $_POST['iceserver_stun'] : 'stun:stun.l.google.com:19301';
$iceservers_turn = isset($_POST['iceserver_turn']) ? $_POST['iceserver_turn'] : '';
$iceservers_credential = isset($_POST['iceserver_credential']) ? $_POST['iceserver_credential'] : '';
$iceservers_username = isset($_POST['iceserver_username']) ? $_POST['iceserver_username'] : '';



// s3
$s3_enabled = isset($_POST['s3_enable']) ? 'yes' : 'no';
$s3_accessKey = isset($_POST['s3_awsAccessKey']) ? $this->test_input($_POST['s3_awsAccessKey']) : '';
$s3_secretKey = isset($_POST['s3_awsSecretKey']) ? $this->test_input($_POST['s3_awsSecretKey']) : '';
$s3_bucket_name = isset($_POST['s3_bucket_name']) ? $this->test_input($_POST['s3_bucket_name']) : $this->s3_bucket_name_default;

 
/*
$s3_buckets_array_index = isset($_POST['s3_buckets_array_index']) ? $_POST['s3_buckets_array_index'] : '';
 


$s3_buckets =  array();
 
if(carray($s3_buckets_array_index))
foreach($s3_buckets_array_index as $index):
$s3_buckets[$index] = $s3_bucket_namespace.$_POST['s3_buckets_'.$index];
endforeach;
*/



// limits
$l_p_photos = isset($_POST['personal_photos']) ? (int) $this->test_input($_POST['personal_photos']) : '16';
$l_a_photos = isset($_POST['album_photos']) ? (int) $this->test_input($_POST['album_photos']) : '16';
$l_pm_conversations = isset($_POST['pm_conversation_limit']) ? (int) $this->test_input($_POST['pm_conversation_limit']) : '15';
$l_msgs = isset($_POST['msg_limit']) ? (int) $this->test_input($_POST['msg_limit']) : '30';
$l_chat_msgs = isset($_POST['chat_messages_limit']) ? (int) $this->test_input($_POST['chat_messages_limit']) : '15';
$l_friends_per_page = isset($_POST['friends_per_page']) ? (int) $this->test_input($_POST['friends_per_page']) : '12';
$l_friends_online = isset($_POST['friends_online_limit']) ? (int) $this->test_input($_POST['friends_online_limit']) : '18';
$l_photoviewer_comments = isset($_POST['photoviewer_comments_limit']) ? (int) $this->test_input($_POST['photoviewer_comments_limit']) : '10';
$l_photoviewer_comments_replies = isset($_POST['photo_viewer_comments_replies_limit']) ? (int) $this->test_input($_POST['photo_viewer_comments_replies_limit']) : '40';
$l_grades = isset($_POST['grades_limit']) ? (int) $this->test_input($_POST['grades_limit']) : '10';
$l_postsbox_comments = isset($_POST['post_comments_limit']) ? (int) $this->test_input($_POST['post_comments_limit']) : '10';
$l_wall = isset($_POST['feed_res']) ? (int) $this->test_input($_POST['feed_res']) : '14';
$l_user_wall = isset($_POST['user_feed_limit']) ? (int) $this->test_input($_POST['user_feed_limit']) : '5';
$l_posts_per_page = isset($_POST['post_per_page_limit']) ? (int) $this->test_input($_POST['post_per_page_limit']) : '10';
$l_profile_wall_photos = isset($_POST['profile_wall_photos_limit']) ? (int) $this->test_input($_POST['profile_wall_photos_limit']) : '15';
$l_similar_videos = isset($_POST['vide_popup_similar_limit']) ? (int) $this->test_input($_POST['vide_popup_similar_limit']) : '15';
$l_search_suggestions = isset($_POST['search_suggestions_limit']) ? (int) $this->test_input($_POST['search_suggestions_limit']) : '8';
$l_search_cnt = isset($_POST['search_content_limit']) ? (int) $this->test_input($_POST['search_content_limit']) : '24';

$l_communities_limit = isset($_POST['communities_limit']) ? (int) $this->test_input($_POST['communities_limit']) : '20';
$l_community_feed_items_limit = isset($_POST['community_feed_items_limit']) ? (int) $this->test_input($_POST['community_feed_items_limit']) : '4';
$l_community_album_items_limit = isset($_POST['community_album_items_limit']) ? (int) $this->test_input($_POST['community_album_items_limit']) : '12';
 
	 
$data = [];

 
$data['server'] = ["memory_limit" => $memory_limit, "max_exec_time" => $max_exec_time];
$data['site'] = ["real_time" => ["host" => $nodejs_host, "port" => $nodejs_port, "enabled" => $nodejs_enabled,"iceservers"=>["stun" => $iceservers_stun,"turn" => $iceservers_turn,"credential"=>$iceservers_credential,"username"=>$iceservers_username]], "mobile" => ["host" => $mob_host, "enabled" => $mob_view_installed], "host" => $host, "sitename" => $sitename, "email" => $site_email, "sitename_lower" => $sitename_lower, "site_slogan" => $site_slogan, "site_lang" => $site_lang, "detect_user_location" => $site_ip_region, "time_zone" => $timezone];
$data['youtube'] = ["youtube_api_key" => $youtube_api_key];

$data['ip_stack_api'] = ["api" => $ip_stack_api];

$data['google'] = ["google_api_key" => $google_api_key];

$data['gliphy'] = ["gliphy_api_key" => $gliphy_api_key];

$data['movies'] = ["moviesdb_api_key" => $moviesdb_api_key];

 

$data['sms'] = ["enabled" => $sms_enabled, "sms_sender" => $sms_sender, "sms_telcode" => $sms_telcode, "sms_email" => $sms_email, "sms_password" => $sms_password];

$data['s3'] = ["enabled" => $s3_enabled, "awsAccessKey" => $s3_accessKey, "awsSecretKey" => $s3_secretKey, "bucket_name" => $s3_bucket_name];

$data['themes'] = ["themes_dir" => $themes_dir, "default_theme" => $default_theme];
$data['apps'] = ["genres" => array_filter($apps_genre)];
$data['gifts'] = ["genres" => array_filter($gifts_genre), "expires_time" => $gift_expires_time];
$data['emoticons_path'] = ["smilies" => $smilies_path, "stickers" => $meeps_path];
$data['user_config'] = ["user_reg_status" => $user_status, "time_keep_user_logged" => $time_keep_user_logged, "online_interval" => $online_interval];
$data['upload_photos'] = ["max_file_upload" => $max_photo_upload, "valid_formats" => $valid_formats, "size" => ["medium" => $p_size_medium, "thumb" => $p_size_thumb, "grid" => $p_size_grid, "exp" => $p_size_exp, "small" => $p_size_small], "watermark_url" => $watermark_url, "watermark" => $watermark];
$data['upload_videos'] = ["vd_max_file_upload" =>$max_video_upload, "vd_valid_formats" => $vd_valid_formats];




$data['communities'] = [
"community_small_images_size" => $community_small_images_size,
"community_medium_images_size" => $community_medium_images_size,
"group_default_cover" => $group_default_cover,
"genres" => [ 
"0" => ["categories" => array_filter($communities_categories_one), "subcategories" => $communities_subcategories_one], 
"1" => ["categories" => array_filter($communities_categories_two), "subcategories" => $communities_subcategories_two]
 ]
 ];
$data['marketplace'] = [
"currency" => $marketplace_currency,
"products_categories" =>
array_filter($marketplace_categories)




];

$data['limit'] = ["p_photos_limit" => $l_p_photos,
				  "a_photos_limit" => $l_a_photos,
				  "pm_conversation_limit" => $l_pm_conversations,
				  "pm_messages_limit" => $l_msgs,
				  "chat_messages_limit" => $l_chat_msgs,
				  "friends_per_page_limit" => $l_friends_per_page,
				  "friends_online_limit" => $l_friends_online,
				  "photoviewer_comments_limit" => $l_photoviewer_comments,
				  "photo_viewer_comments_replies_limit" => $l_photoviewer_comments_replies,
				  "grades_limit" => $l_grades,
				  "post_comments_limit" => $l_postsbox_comments, 
				  "feed_res" => $l_wall, 
				  "user_feed_limit" => $l_user_wall, 
				  "post_per_page_limit" => $l_posts_per_page, 
				  "profile_wall_photos_limit" => $l_profile_wall_photos, 
				  "vide_popup_similar_limit" => $l_similar_videos, 
				  "search_suggestions_limit" => $l_search_suggestions,
				  "search_content_limit" => $l_search_cnt,
				  "communities_limit" => $l_communities_limit,
				  "community_feed_items_limit" => $l_community_feed_items_limit,
				  "community_album_items_limit" => $l_community_album_items_limit
				  
				  ];





$dir = __ROOT__.'/inc/json/ssettings/';


    if (file_exists($dir))
			$this->deleteDir($dir);

    mkdir($dir, 0777, true);

$fp = fopen($dir.$this->generateRandomString(32) . '.json', 'w');



if ( fwrite($fp, json_encode($data)) )
{
		fclose($fp);
		$this->returnto("./admin?cmd=settings");
		$this->msg('The site settings are successfully updated!','success');
}	else {
	
	
	$this->msg('An error occured at updating site settings!','error');
	
}


}

// kn general settings
public function generalSettings()
{
	$g_settings = glob(__ROOT__."/inc/json/gsettings/*.json");
	$g_settings = $g_settings[0];
	
	
	$gsettings = json_decode(file_get_contents($g_settings),true);
	
	$this->template->assign( "s", $gsettings);
	$this->template->display($this->theme_dir.'/admincp/pages/general-settings.html');
	
	
	
}

// update general settings
public function saveGeneralSettings(){
	
	$site_offline = isset($_POST['siteoffline']) ? $this->test_input($_POST['siteoffline']) : "false";
	$closed_user_reg = isset($_POST['registration']) ? $this->test_input($_POST['registration']) : "false";
	$vdupload = isset($_POST['vdupload']) ? $this->test_input($_POST['vdupload']) : "false";
	$aupload = isset($_POST['aupload']) ? $this->test_input($_POST['aupload']) : "false";
	$delete_account = isset($_POST['daccount']) ? $this->test_input($_POST['daccount']) : "false";
	$invite_friends = isset($_POST['finvite']) ? $this->test_input($_POST['finvite']) : "false";
	$collapsed_menu = isset($_POST['cmenu']) ? $this->test_input($_POST['cmenu']) : "false";
	$private_account = isset($_POST['caccount']) ? $this->test_input($_POST['caccount']) : "false";
	
	if($private_account === "false"){
		
		
		// disable private account for all users
		$this->query_update("update ".tbl_users." set `private`='no' where `private`='yes'");
		
	}
	
	
	$data = array("siteoffline" => $site_offline,
	
					"user_registration" => $closed_user_reg,
					"allow_videoupload" => $vdupload,
					"allow_audioupload" => $aupload,
					"delete_user_account" => $delete_account,
					"invite_friends" => $invite_friends,
					"collapsed_menu" => $collapsed_menu,
					"private_user_account" => $private_account
					);
	
	

$dir = __ROOT__.'/inc/json/gsettings/';

 if (file_exists($dir))
	$this->deleteDir($dir);


    mkdir($dir, 0777, true);



$fp = fopen($dir.$this->generateRandomString(32) . '.json', 'w');



if ( fwrite($fp, json_encode($data)) )
{
		fclose($fp);
		$this->returnto("./admin?cmd=gsettings");
		$this->msg('The general settings are successfully updated!','success');
}	else {
	
	
	$this->msg('An error occured at updating general settings!','error');
	
}
	
}


// generate random string
private static function generateRandomString($length = 10) {
    /*$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;*/
	
	return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);

}
// delete folder
private static function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            self::deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}

// users
public function users(){
	

$sql = "select * from ".tbl_users." order by id desc";


		// select users count
		$cq = $this->db->query("select COUNT(*) from ".tbl_users);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
$page_url = "/admin?cmd=users&page=%s"; 
														
$query = $this->pagination(12,false,$page_url,$sql,$count);						 
								 
	
	$this->template->assign(["q" => $query[0],"pagination" =>  $query[1], "count" => $count]);
	$this->template->display($this->theme_dir.'/admincp/pages/users.html');
}

// edit user
public function userEdit(){
	
	if($this->id){
		
		// select data about user
		$q = $this->query_select("select * from ".tbl_users." where `id`='{$this->id}' limit 1");
		
	$this->template->assign(["q" => $q]);
	$this->template->display($this->theme_dir.'/admincp/pages/edit/user.html');	
		
	}
	
	
	
}

// save edited user
public function takeUserEdit(){
	
if($this->id){
	$name = isset($_POST['name']) ? $this->test_input($_POST['name']) : '';
	$surname = isset($_POST['surname']) ? $this->test_input($_POST['surname']) : '';
	$fullname = $name .' '.$surname;
	
	$email = isset($_POST['email']) ? $this->test_input($_POST['email']) : '';
	$username = isset($_POST['username']) ? $this->test_input($_POST['username']) : '';
	$balance = isset($_POST['balance']) ? $this->test_input($_POST['balance']) : '';
	$status = isset($_POST['status']) ? $this->test_input($_POST['status']) : '';
	
	$day = isset($_POST['day']) ? $this->test_input($_POST['day']) : '';
	$month = isset($_POST['month']) ? $this->test_input($_POST['month']) : '';
	$year = isset($_POST['year']) ? $this->test_input($_POST['year']) : '';
	$birthday = $year.'-'.$month.'-'.$day;
	
	$gender = isset($_POST['gender']) ? $this->test_input($_POST['gender']) : '';
	
	$country = isset($_POST['country']) ? $this->test_input($_POST['country']) : '';

	$class = isset($_POST['class']) ? $this->test_input($_POST['class']) : 'UC_USER';


	$search = $fullname.' '.$this->getUserAge($birthday).' '.$country;
	
	if(!$name){
		
		$this->msg('Empty first name.','error');
		
	} else
	
	if(!$surname){
		
		$this->msg('Empty surname.','error');
		
	} else 
	if(!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)){
		
		$this->msg('Invalid email format.','error');
		
	} else 
	if(!$country){
		
		$this->msg('Provide user region.','error');
		
	} else
	
 	if(!$year || !$month || !$day){
		
		$this->msg('Invalid User birthday date.','error');
		
	}
	else {
	// update user
	$update = $this->query_update("update ".tbl_users." set 
	`name`='{$name}',
	`surname`='{$surname}',
	`fullname`='{$fullname}',
	`search`='{$search}',
	`email`='{$email}',
	`birthday`='{$birthday}',
	`gender`='{$gender}',
	`location`='{$country}',
	`location_id`='0',
	`status`='{$status}',
	`username`='{$username}',
	`balance`='{$balance}',
	`class`='{$class}'
	where id ='{$this->id}'");
	
	if($update){
		$this->returnto("./admin.php?cmd=useredit&id=".$this->id);
		$this->msg('The user information was successfully saved.','success');
		
	}
	}
}
	
}

//tracks
public function tracks(){
$sql = "select t.*, u.fullname, u.id as uid from ".tbl_songs."t
	
								left join ".tbl_users." u ON u.id = t.uploader
								 group by t.id order by t.id desc";	

		// select tracks count
		$cq = $this->db->query("select COUNT(*) from ".tbl_songs);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
$page_url = "/admin?cmd=tracks&page=%s"; 
														
$query = $this->pagination(12,false,$page_url,$sql,$count);						 
								 
	
	$this->template->assign(["q" => $query[0],"pagination" =>  $query[1], "count" => $count]);
	$this->template->display($this->theme_dir.'/admincp/pages/tracks.html');
}

// edit track
public function editTrack(){
	
	if($this->id){
		
		// select data about song
		$q = $this->query_select("select * from ".tbl_songs." where `id`='{$this->id}' limit 1");
		
	$this->template->assign(["q" => $q]);
	$this->template->display($this->theme_dir.'/admincp/pages/edit/song.html');	
	}
	
}

// save edited song
public function saveSongInfo(){
	
if($this->id){
	$track = isset($_POST['title']) ? $this->test_input($_POST['title']) : '';
	$artist = isset($_POST['artist']) ? $this->test_input($_POST['artist']) : '';
	$album = isset($_POST['album']) ? $this->test_input($_POST['album']) : '';
	$length = isset($_POST['length']) ? $this->test_input($_POST['length']) : '';
	$year = isset($_POST['year']) ?  (int) $this->test_input($_POST['year']) : '';
	$genre = isset($_POST['genre']) ?  $this->test_input($_POST['genre']) : '';
	$filename = isset($_POST['fn']) ?  $this->test_input($_POST['fn']) : '';
	$cover = isset($_POST['cover']) ?  $this->test_input($_POST['cover']) : '';
	
	if(!$track){
		
		$this->msg('Empty name of track.','error');
		
	} else
	if(!$artist){
		
		$this->msg('Empty artist name.','error');
		
	} else
	if(!$length){
		
		$this->msg('Enter the length of song.','error');
		
	} else 
	if(!$filename){
		
		$this->msg('Provide a correct track filename (mp3) .','error');
		
	} else {
	
	
	// update song
	$update = $this->query_update("update ".tbl_songs." set 
	`title`='{$track}',
	`artist`='{$artist}',
	`album`='{$album}',
	`time`='{$length}',
	`year`='{$year}',
	`path`='{$filename}',
	`genre`='{$genre}',
	`cover`='{$cover}'
	
	where id ='{$this->id}'");
	
	if($update){
		$this->returnto("./admin.php?cmd=trackedit&id=".$this->id);
		$this->msg('The information about the song was successfully saved.','success');
		
	}
	}
	
	
}
	
}

// delete track
public function deleteTrack(){
	
	$r = '0';
	if($this->id){
		
		
		//delete track
		$delete = $this->query_delete("delete from ".tbl_songs." where `id`='{$this->id}'");
		
		// delete song from users collections
		$del_col = $this->query_delete("delete from ".tbl_music." where `musid`='{$this->id}'");
		
		
		if($delete) $r = '1';
		
	}
	
	echo $r;
}

//videos
public function videos(){

$sql = "select v.*, u.fullname, u.id as uid from ".tbl_videos."v
	
								left join ".tbl_users." u ON u.id = v.userid
								 group by v.id order by v.id desc";	

		// select videos count
		$cq = $this->db->query("select COUNT(*) from ".tbl_videos);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
$page_url = "/admin?cmd=videos&page=%s"; 
														
$query = $this->pagination(12,false,$page_url,$sql,$count);						 
								 
	
	$this->template->assign(["q" => $query[0],"pagination" =>  $query[1], "count" => $count]);
	$this->template->display($this->theme_dir.'/admincp/pages/videos.html');
}



// edit video
public function videoEdit(){
	
	if($this->id){
		
		// select data about video
		$q = $this->query_select("select * from ".tbl_videos." where `id`='{$this->id}' limit 1");
		
	$this->template->assign(["q" => $q]);
	$this->template->display($this->theme_dir.'/admincp/pages/edit/video.html');	
	}

}

// save edited video
public function saveEditedVideo(){
	
if($this->id){
	$title = isset($_POST['title']) ? $this->test_input($_POST['title']) : '';
	$description = isset($_POST['description']) ? $this->test_input($_POST['description']) : '';
	$tags = isset($_POST['tags']) ? $this->test_input($_POST['tags']) : '';
	$dur = isset($_POST['duration']) ? $this->test_input($_POST['duration']) : '';
	$views = isset($_POST['views']) ? (int) $this->test_input($_POST['views']) : '';
	$filename = isset($_POST['fn']) ?  $this->test_input($_POST['fn']) : '';
	
	
	if(!$title){
		
		$this->msg('Please enter a title for respective video.','error');
		
	} else
	
	if(!$dur){
		
		$this->msg('Enter the video duration time.','error');
		
	} else 
	if(!$filename){
		
		$this->msg('Enter a link URL or correct video filename.','error');
		
	} else {
	
	
	// update video
	$update = $this->query_update("update ".tbl_videos." set `title`='{$title}',`description`='{$description}',`tags`='{$tags}',`dur`='{$dur}',`views`='{$views}',`filename`='{$filename}'
	where id ='{$this->id}'");
	
	if($update){
		$this->returnto("./admin.php?cmd=videoedit&id=".$this->id);
		$this->msg('The information about the video was successfully saved.','success');
		
	}
	}
}
	
}

// delete video
public function deleteVideo()
{
	$r = '0';
	if($this->id){
		
		
		//delete video
		$delete = $this->query_delete("delete from ".tbl_videos." where `id`='{$this->id}'");
		
		// delete comments for respective video
		$del_comms = $this->query_delete("delete from ".tbl_comments." where `itemid`='{$this->id}' and `categ`='video'");
		
		
		if($delete) $r = '1';
		
	}
	
	echo $r;
}



// games
public function games(){
	
		// select data about apps
		$q = $this->query_select("select * from ".tbl_apps." order by id desc");
	
	$this->template->assign(["q" => $q]);
	$this->template->display($this->theme_dir.'/admincp/pages/games.html');
}

// upload covers for games
public function uploadGameCovers(){
	
$count   = 0;
$message = "";
// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
 

	$images = array();
    $max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.'/stcmd/apps-covers/';
    $large       = $dir.'/large/';
    $thumbnail   = $dir.'/thumb/';

    // generate dir 
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);



    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
		$fileExt = end($temp);
                $newName = basename(mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
		$mainImage = $large . $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainImage)) {
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['files']['type'][$f]))
	{
		case 'image/png':
			//Create a new image from file 
			$CreatedImage = imagecreatefrompng($mainImage);
			break;
		case 'image/gif':
			$CreatedImage = imagecreatefromgif($mainImage);
			break;			
		case 'image/jpeg':
		case 'image/pjpeg':
		case 'image/jpg':
			$CreatedImage = imagecreatefromjpeg($mainImage);
			break;
		default:
			$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}
			list($CurWidth,$CurHeight)=getimagesize($mainImage);

    // create thumbs

    // thumb dir
    if(!file_exists($thumbnail))
    mkdir($thumbnail, 0777, true);

    $thumb_size = $this->cropImage($CurWidth,$CurHeight,190,$thumbnail.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  

                    $userid = $this->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
						
					$images[] = $newName;
                    
                    
                }
            }
        }
    }

if ($message) {
    
    ////foreach ($message as $msg)
        //echo $msg;
    echo json_encode($message);
} else
    echo json_encode(array("status" => "ok","msg" => "Uploaded ".count($images)." files", "covers" => $images));


}
	
	
	
}

private function cropForThemes($filename,$imagetype,$srcimage,$destFolder){
	
$width = INF;
$height = 90;
	
// Get new dimensions
list($width_orig, $height_orig) = getimagesize($filename);

$ratio_orig = $width_orig/$height_orig;

if ($width/$height > $ratio_orig) {
   $width = $height*$ratio_orig;
} else {
   $height = $width/$ratio_orig;
}
	
	
	
	// Resample
	$image_p = imagecreatetruecolor($width, $height);

	if(imagecopyresampled($image_p, $srcimage, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig))
	{
		switch(strtolower($imagetype))
		{
			case 'image/png':
				imagepng($image_p,$destFolder);
				break;
			case 'image/gif':
				imagegif($image_p,$destFolder);
				break;			
			case 'image/jpeg':
			case 'image/pjpeg':
			case 'image/jpg':
				imagejpeg($image_p,$destFolder,90);
				break;
			default:
				return false;
		}

	//Destroy image, frees memory	
	if(is_resource($image_p)) {imagedestroy($image_p);} 
	return true;

	}
	
	
}

private function cropImage($CurWidth,$CurHeight,$iSize,$DestFolder,$SrcImage,$Quality,$ImageType,$iHeight = 0)
{	 
	//Check Image size is not 0
	if($CurWidth <= 0 || $CurHeight <= 0) 
	{
		return false;
	}
	$iHeight = !$iHeight ? $iSize : $iHeight;
	//abeautifulsite.net has excellent article about "Cropping an Image to Make Square bit.ly/1gTwXW9
	if($CurWidth>$CurHeight)
	{
		$y_offset = 0;
		$x_offset = ($CurWidth - $CurHeight) / 2;
		$square_size 	= $CurWidth - ($x_offset * 2);
	}else{
		$x_offset = 0;
		$y_offset = ($CurHeight - $CurWidth) / 2;
		$square_size = $CurHeight - ($y_offset * 2);
	}
	
	$NewCanves 	= imagecreatetruecolor($iSize, $iHeight);	

	if(imagecopyresampled($NewCanves, $SrcImage,0, 0, $x_offset, $y_offset, $iSize, $iHeight, $square_size, $square_size))
	{
		switch(strtolower($ImageType))
		{
			case 'image/png':
				imagepng($NewCanves,$DestFolder);
				break;
			case 'image/gif':
				imagegif($NewCanves,$DestFolder);
				break;			
			case 'image/jpeg':
			case 'image/pjpeg':
			case 'image/jpg':
				imagejpeg($NewCanves,$DestFolder,$Quality);
				break;
			default:
				return false;
		}

	//Destroy image, frees memory	
	if(is_resource($NewCanves)) {imagedestroy($NewCanves);} 
	return true;

	}
	  
}

// create new app
public function createApp(){
	
$app_genre = isset($_POST['game_genre']) ? $this->test_input($_POST['game_genre']) : '';
$app_title = isset($_POST['game_title']) ? $this->test_input($_POST['game_title']) : '';
$app_descr = isset($_POST['game_description']) ? $this->test_input($_POST['game_description']) : '';	
$app_iframe = isset($_POST['game_iframe']) ? $this->db->real_escape_string($_POST['game_iframe']) : '';
$app_default_cover = isset($_POST['default_cover']) ? $this->test_input($_POST['default_cover']) : '';
$app_covers = isset($_POST['covers']) ? $_POST['covers'] : '';
$app_covers = json_decode($app_covers);
$msg = 'ok';


if(!$app_genre){
	$msg = 'Please select an genre';
} else if (!$app_title){
	$msg = 'Empty app title';
} else if (!$app_iframe){
		$msg = 'Empty app iframe';
} else if (!$app_default_cover){
	
	$msg = 'Default cover is not selected';
} 
 else {
	 
	 // add new app
	 $new_app = $this->query_insert("insert into ".tbl_apps." set `title`='{$app_title}',`genre`='{$app_genre}',`added`='{$this->ctime}',`description`='{$app_descr}',`iframe`='{$app_iframe}'");
	 
	if ($new_app){
		
		foreach($app_covers as $cover):
		// insert cover for respective app
		$in_covers = $this->query_insert("insert into ".tbl_apps_covers." set `filename`='{$cover}',`app_id`='{$new_app}'");
		
		if($app_default_cover === $cover){
			
			// update default cover
			$up = $this->query_update("update ".tbl_apps." set `cover`='{$in_covers}' where `id`='{$new_app}'");
		}
		
		endforeach;
		
		
	}
	 
	 
	 
 }
echo $msg;
}

// ads page
public function ads(){
	
	$this->template->assign(["this" => $this]);
	$this->template->display($this->theme_dir."/admincp/pages/ads.html");
}

// get ads markup
public function adsMarkup($page){

    // select ads from db
	$q = $this->query_select("select * from ".tbl_ads." where `page`='{$page}' order by added desc limit 1");
	
	return ["count" => count($q), "q" => $q];
	
	
}

// delete empties ad
public function deleteEmptyAd(){
	
	$this->query_delete("Delete from ".tbl_ads." where `markup`=''");
	
}

// get current markup for respective ad
public function adOldMarkup($page){
	
	$m = $this->db->query("Select `markup` from ".tbl_ads." where `page`='{$page}' limit 1");
	$m = $m->fetch_array(MYSQLI_ASSOC);
	$m = $m['markup'];
	
	return $m;
	
}

// update ads
public function updateAds(){
	
	$guests = isset($_POST['guests']) ? $this->test_input($_POST['guests']) : '';
	$friends = isset($_POST['friends']) ? $this->test_input($_POST['friends']) : '';
	$messages = isset($_POST['messages']) ? $this->test_input($_POST['messages']) : '';
	$apps = isset($_POST['apps']) ? $this->test_input($_POST['apps']) : '';
	$posts = isset($_POST['posts']) ? $this->test_input($_POST['posts']) : '';
	$profile = isset($_POST['profile']) ? $this->test_input($_POST['profile']) : '';
	
	
	// guests
	if($guests != $this->adOldMarkup('guests')){
		
		// delete current ad
		$this->query_delete("delete from ".tbl_ads." where `page`='guests'");
		
		// add ad
		if ($guests) $this->query_insert("insert into ".tbl_ads." set `markup`='{$guests}',`added`='{$this->ctime}',`page`='guests'");
		
	}
	
	// friends
	if($friends != $this->adOldMarkup('friends')){
		
		// delete current ad
		$this->query_delete("delete from ".tbl_ads." where `page`='friends'");
		
		// add ad
		if($friends) $this->query_insert("insert into ".tbl_ads." set `markup`='{$friends}',`added`='{$this->ctime}',`page`='friends'");
		
	}
	// messages
	if($messages != $this->adOldMarkup('messages')){
		
		// delete current ad
		$this->query_delete("delete from ".tbl_ads." where `page`='messages'");
		
		// add ad
		if($messages) $this->query_insert("insert into ".tbl_ads." set `markup`='{$messages}',`added`='{$this->ctime}',`page`='messages'");
		
	}	
	// apps
	if($apps != $this->adOldMarkup('apps')){
		
		// delete current ad
		$this->query_delete("delete from ".tbl_ads." where `page`='apps'");
		
		// add ad
		if($apps) $this->query_insert("insert into ".tbl_ads." set `markup`='{$apps}',`added`='{$this->ctime}',`page`='apps'");
		
	}	
	// posts
	if($posts != $this->adOldMarkup('posts')){
		
		// delete current ad
		$this->query_delete("delete from ".tbl_ads." where `page`='posts'");
		
		// add ad
		if($posts) $this->query_insert("insert into ".tbl_ads." set `markup`='{$posts}',`added`='{$this->ctime}',`page`='posts'");
		
	}	
	
	// profile
	if($profile != $this->adOldMarkup('profile')){
		
		// delete current ad
		$this->query_delete("delete from ".tbl_ads." where `page`='profile'");
		
		// add ad
		if($profile) $this->query_insert("insert into ".tbl_ads." set `markup`='{$profile}',`added`='{$this->ctime}',`page`='profile'");
		
	}	
	
		$this->returnto("./admin?cmd=ads");
		$this->msg('The advertisements are updated!','success');
}

// delete app
public function deleteApp(){
	
	$appid = isset($_POST['appid']) ? (int) $this->test_input($_POST['appid']) : 0;
	$r = 0;
	if(is_numeric($appid)){
		
		// check if app exist
		$c = count($this->query_select("select id from ".tbl_apps." where `id`='{$appid}' limit 1"));
		
		if($c){
			
				// delete app
				$delete = $this->query_delete("DELETE FROM ".tbl_apps." WHERE `id`='{$appid}'");
			
			
			// select covers filename to delete from server
			$covers = $this->query_select("select filename from ".tbl_apps_covers." where `app_id`='{$appid}'");
			$dir = __ROOT__.'/stcmd/apps-covers/';
			$large       = $dir.'/large/';
			$thumbnail   = $dir.'/thumb/';
			foreach($covers as $cover):
			
				@unlink($large.$cover['filename']);
				@unlink($thumbnail.$cover['filename']);
			
			endforeach;
			
			// delete covers 
			$delete_covers = $this->query_delete("delete from ".tbl_apps_covers." where `app_id`='{$appid}'");
			
			// delete app from user's collections
			$delete_app_u = $this->query_delete("delete from ".tbl_my_apps." where `appid`='{$appid}'");
			
			$r = 1;
		}
		
		
	}
	
	echo $r;
}

//terms
public function terms(){
	
	
	$this->template->assign(["this" => $this]);
	$this->template->display($this->theme_dir."/admincp/pages/terms.html");
	
}

// get markup for terms/policy/about
public function tpaMarkup($page){

    // select markup from db
	$q = $this->query_select("select * from ".tbl_terms." where `page`='{$page}' order by added desc limit 1");
	
	return ["count" => count($q), "q" => $q];
	
	
}

// get current markup for terms
public function tpaOldMarkup($page){
	
	$m = $this->db->query("Select `markup` from ".tbl_terms." where `page`='{$page}' limit 1");
	$m = $m->fetch_array(MYSQLI_ASSOC);
	$m = $m['markup'];
	
	return $m;
	
}

// save terms/policy/about
public function saveTPA(){
	
	$terms = isset($_POST['terms']) ? $this->test_input($_POST['terms']) : '';
	$policy = isset($_POST['policy']) ? $this->test_input($_POST['policy']) : '';
	$about = isset($_POST['about']) ? $this->test_input($_POST['about']) : '';
	
	// terms
	if($terms != $this->tpaOldMarkup('terms')){
		
		// delete current term
		$this->query_delete("delete from ".tbl_terms." where `page`='terms'");
		
		// add ad
		if ($terms) $this->query_insert("insert into ".tbl_terms." set `markup`='{$terms}',`added`='{$this->ctime}',`page`='terms'");
		
	}	
	
	
	// policy
	if($policy != $this->tpaOldMarkup('policy')){
		
		// delete current policy
		$this->query_delete("delete from ".tbl_terms." where `page`='policy'");
		
		// add ad
		if ($policy) $this->query_insert("insert into ".tbl_terms." set `markup`='{$policy}',`added`='{$this->ctime}',`page`='policy'");
		
	}	
	
	
	// about
	if($about != $this->tpaOldMarkup('about')){
		
		// delete current about
		$this->query_delete("delete from ".tbl_terms." where `page`='about'");
		
		// add ad
		if ($about) $this->query_insert("insert into ".tbl_terms." set `markup`='{$about}',`added`='{$this->ctime}',`page`='about'");
		
	}
	
		$this->returnto("./admin?cmd=terms");
		$this->msg('Updated!','success');
}

// get feedback messages 
public function getFeedbackMsgs(){
	
	$q = $this->query_select("select * from ".tbl_feedback." order by `read` desc, id desc limit 100");
	$this->template->assign([ "this" => $this, "q" => $q ]);
	$this->template->display($this->theme_dir."/admincp/pages/feedback_box.html");
	
}

public function getFeedbackContent(){
	
	$fid = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : '';
	
	
	
	$q = $this->query_select("select * from ".tbl_feedback." where `id`='{$fid}' limit 1");
	$up = $this->query_update("update ".tbl_feedback." set `read`='yes' where `id`='{$fid}'");
	$this->template->assign([ "this" => $this, "q" => $q ]);
	$this->template->display($this->theme_dir."/admincp/popup/feedback.html");
	
}

// get posts
public function posts(){
	
$sql = "select p.*, u.fullname, u.id as uid from ".tbl_posts."p
	
								left join ".tbl_users." u ON u.id = p.userid
								 group by p.id order by p.id desc";	

		// select videos count
		$cq = $this->db->query("select COUNT(*) from ".tbl_posts);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=posts&page=%s"; 
														
		$query = $this->pagination(12,false,$page_url,$sql,$count);						 
								 
	
		$this->template->assign(["q" => $query[0],"pagination" =>  $query[1], "count" => $count]);
		$this->template->display($this->theme_dir.'/admincp/pages/posts.html');
	
}

// edit post
public function editPost(){
	
	if($this->id){
		
		
		
	$q = $this->query_select("select * from ".tbl_posts." where `id`='{$this->id}' limit 1");
		
	$this->template->assign(["q" => $q]);
	$this->template->display($this->theme_dir.'/admincp/pages/edit/post.html');	
		
	}
	
	
	
}
//save post
public function savePost(){
	
	if($this->id){
		
		$type = isset($_POST['type']) ? $this->test_input($_POST['type']) : '';
		$cnt =  isset($_POST['text']) ? $this->test_input($_POST['text']) : '';
		
		
		$q = $this->query_update("update ".tbl_posts." set `type`='{$type}',`text`='{$cnt}' where `id`='{$this->id}'");
		
		if($q){ 		$this->returnto("./admin.php?cmd=editpost&id=".$this->id);
		$this->msg('Post updated!','success');
		} else 
		{
$this->returnto("./admin.php?cmd=editpost&id=".$this->id);
		$this->msg('Error at updatind the post!','error');
		}
	}
	
}

// delete post
public function deletePost(){
	$r = 0;
	if($this->id)
	{
		
		$d = $this->query_delete("delete from ".tbl_posts." where `id`='{$this->id}'");
		
		if($d) $r = 1;
	}
	echo $r;
}

public function generatePostContent($id,$c,$type){
	
	$nc = new postDetails($id);
	
	return $nc->generatePostContent($c,$type);
	
}

public function verifyUnverifyGroups($c){
	$group_id = isset($_POST['group_id']) ? $this->test_input($_POST['group_id']) : '';
	switch ($c){
		
		case'verify':
		$b = 'yes';
		break;
		case 'unverify':
		$b = 'no';
		break;
		
	}
	if($this->query_update("update ".tbl_communities." set `verified`='{$b}' where `id`='{$group_id}' "))
	echo 1;
else
	echo 0;
}

// communities
public function communities(){
	
$sql = "select * from ".tbl_communities." order by created desc";	

		// select gifts count
		$cq = $this->db->query("select COUNT(*) from ".tbl_communities);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
$page_url = "/admin?cmd=communities&page=%s"; 
														
$query = $this->pagination(12,false,$page_url,$sql,$count);						 
								 
	
	$this->template->assign(["q" => $query[0],"pagination" =>  $query[1], "count" => $count]);
	$this->template->display($this->theme_dir.'/admincp/pages/communities.html');	
}
// gifts
public function gifts(){
		
	
$sql = "select * from ".tbl_gifts." order by added desc";	

		// select gifts count
		$cq = $this->db->query("select COUNT(*) from ".tbl_gifts);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
$page_url = "/admin?cmd=gifts&page=%s"; 
														
$query = $this->pagination(12,false,$page_url,$sql,$count);						 
								 
	
	$this->template->assign(["q" => $query[0],"pagination" =>  $query[1], "count" => $count]);
	$this->template->display($this->theme_dir.'/admincp/pages/gifts.html');	
	
}

// add new gift
public function submitNewGifts()
{
	
	$categ = isset($_POST['gift_categ']) ? $this->test_input($_POST['gift_categ']) : '';
	$gift = isset($_POST['gift']) ? $this->test_input($_POST['gift']) : '';
	$price = isset($_POST['gift_price']) ? (int) $this->test_input($_POST['gift_price']) : '';
	$tags = isset($_POST['gift_tags']) ? $this->test_input($_POST['gift_tags']) : '';
	
	$r = 'An error occured at submit this gift, make sure if the category is selected correctly and gift image is uploaded.';	
	
	if($gift){
		
		$add = $this->query_insert("insert into ".tbl_gifts." set `tags`='{$tags}', `categ`='{$categ}',`price`='{$price}',`gift`='{$gift}',`added`='{$this->ctime}'");

		
		if($add){ 
		
				$r = 'ok';
				
		} 
	}
	
	echo $r;
	
}

// delete gift
public function deleteGift(){
	
	$giftid = isset($_POST['giftid']) ? (int) $this->test_input($_POST['giftid']) : 0;
	$r = 0;
	if(is_numeric($giftid)){
		
		// check if gift exist
		$c = count($this->query_select("select id from ".tbl_gifts." where `id`='{$giftid}' limit 1"));
		
		if($c){
			

			
			
			// select gift filename to delete from server
			$gift = $this->db->query("select `gift` from ".tbl_gifts." where `id`='{$giftid}'");
			$gift = $gift->fetch_array(MYSQLI_ASSOC);

			$dir = __ROOT__.'/stcmd/gifts/';			
				@unlink($dir.$gift['gift']);
				
				
				// delete gift
				$delete = $this->query_delete("DELETE FROM ".tbl_gifts." WHERE `id`='{$giftid}'");
	
			
			if($delete) $r = 1;
		}
		
		
	}
	
	echo $r;
	
}

// upload gifts
public function uploadGifts(){
	
$count   = 0;
$message = "";

// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
 

	$images = array();
    $max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.'/stcmd/gifts/';

    // generate dir 
    if (!file_exists($dir))
    mkdir($dir, 0777, true);


    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
		$fileExt = end($temp);
                $newName = basename(mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
		$mainImage = $dir. $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainImage)) {
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['files']['type'][$f]))
	{
		case 'image/png':
			//Create a new image from file 
			$CreatedImage = imagecreatefrompng($mainImage);
			break;
		case 'image/gif':
			$CreatedImage = imagecreatefromgif($mainImage);
			break;			
		case 'image/jpeg':
		case 'image/pjpeg':
		case 'image/jpg':
			$CreatedImage = imagecreatefromjpeg($mainImage);
			break;
		default:
			$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}


                    $userid = $this->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
						
					$images[] = $newName;
                    
                    
                }
            }
        }
    }

if ($message) {
    
    ////foreach ($message as $msg)
        //echo $msg;
    echo json_encode($message);
} else
    echo json_encode(array("status" => "ok","msg" => "Gift uploaded.", "covers" => $images));


}
	
	
	
}

// get themes
public function gthemes(){
	
		$q = $this->query_select("select * from ".tbl_themes." where `kn`='true' order by added desc");
		
	$this->template->assign(["q" => $q]);
	$this->template->display($this->theme_dir.'/admincp/pages/themes.html');	
}

// delete theme
public function deleteTheme(){
	
	

	$r = 0;
	if(is_numeric($this->id)){
		
		// check if app exist
		$c = $this->db->query("select `photo` from ".tbl_themes." where `id`='{$this->id}' and `kn`='true' limit 1");
		$x = $c->fetch_array(MYSQLI_ASSOC);
		$img = $x['photo'];
		if($img){
			
				// delete app
				///$delete = $this->query_delete("DELETE FROM ".tbl_themes." WHERE `id`='{$this->id}' and `kn`='true'");
			
		
			$dir = __ROOT__.'/cmd/themes/';
			$thumbnail   = $dir.'/thumb/';

				@unlink($dir.$img);
				@unlink($thumbnail.$img);
				
			
			// delete theme
			$delete_theme = $this->query_delete("delete from ".tbl_themes." where `id`='{$this->id}' and `kn`='true'");
			
			if($delete_theme) $r = 1;
		}
		
		
	}
	
	echo $r;
	
	
}

// upload themes
public function uploadThemeImage(){
	
$count   = 0;
$message = "";


// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
 

    $max_file_size = 1048576 * 999999999999999;
    $dir = __ROOT__.'/cmd/themes/';
    $large       = $dir;
    $thumbnail   = $dir.'/thumb/';


    // Loop $_FILES to execute all files
    foreach ($_FILES['file']['name'] as $f => $name) {
        if ($_FILES['file']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['file']['error'][$f] == 0) {
            if ($_FILES['file']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['file']['name'][$f];
                $temp    = explode('.', $fileN);
		$fileExt = end($temp);
                $newName = basename(mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
		$mainImage = $large . $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["file"]["tmp_name"][$f], $mainImage)) {
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['file']['type'][$f]))
	{
		case 'image/png':
			//Create a new image from file 
			$CreatedImage = imagecreatefrompng($mainImage);
			break;
		case 'image/gif':
			$CreatedImage = imagecreatefromgif($mainImage);
			break;			
		case 'image/jpeg':
		case 'image/pjpeg':
		case 'image/jpg':
			$CreatedImage = imagecreatefromjpeg($mainImage);
			break;
		default:
			$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}
			list($CurWidth,$CurHeight)=getimagesize($mainImage);

    // create thumbs

    // thumb dir
    if(!file_exists($thumbnail))
    mkdir($thumbnail, 0777, true);

  //  $thumb_size = $this->cropImage($CurWidth,$CurHeight,240,$thumbnail.$newName,$CreatedImage,90,$_FILES['file']['type'][$f]);
  $thumb_size = $this->cropForThemes($mainImage,$_FILES['file']['type'][$f],$CreatedImage,$thumbnail.$newName);

                    $userid = $this->USER['id'];
                    $name_m   = $_FILES["file"]["name"][$f]; 
                }
            }
        }
    }

if ($message) {
    
    echo json_encode($message);
} else
    echo json_encode(array("status" => "ok","msg" => "Image uploaded!", "cover" => $newName));


}
	
	
}

// create theme
public function createNewTheme(){
	
	$theme_name = isset($_POST['theme_name']) ? $this->test_input($_POST['theme_name']) : 'Theme';
	$theme_img = isset($_POST['th_image']) ? $this->test_input($_POST['th_image']) : '';
	
	if($theme_img){
		
		$add = $this->query_insert("insert into ".tbl_themes." set `kn`='true',`name`='{$theme_name}',`photo`='{$theme_img}',`added`='{$this->ctime}'");

		
		if($add){ 
		
				$this->returnto("./admin.php?cmd=themes");
				$this->msg('Theme added!','success');
				
		} else {
			
				$this->returnto("./admin.php?cmd=themes");
				$this->msg('Error at creating the theme!','error');
		}		
		
		} else {
			
				$this->returnto("./admin.php?cmd=themes");
				$this->msg('The theme must have a image!','error');
		}
	
}



// languages
public function lang(){
	
	$sp_lang_str = isset($_GET['l']) ? $this->test_input($_GET['l']) : '';
	$sp_lang = $sp_lang_str ? $sp_lang_str.'.php' : '';
	$check_l_exist = file_exists(__ROOT__."/inc/lang/".$sp_lang);
	
	// get lang for php
	if($sp_lang && $check_l_exist) include __ROOT__."/inc/lang/".$sp_lang;
		

	
	$this->template->assign([ "av_lang_files" => $this->gLangFiles(),  "l" => $sp_lang_str, "lang_exist" => $check_l_exist, "php_arr" => ($sp_lang && $check_l_exist) ? $site_lang : [] ]);
	$this->template->display($this->theme_dir."/admincp/pages/lang.html");	
	
	
}

// upadate language
public function upLang(){
	
	$l_name = isset($_POST['lname']) ? $this->test_input($_POST['lname']) : '';
	$p_lang = isset($_POST['p_lang']) ? $_POST['p_lang'] : '';
	$j_lang = isset($_POST['j_lang']) ? $_POST['j_lang'] : '';
	
	$r = 0;
	if ( $p_lang && $j_lang && $l_name  )
	{
	
		@unlink(__ROOT__.'/inc/lang/'.$l_name.'.php');
		unlink(__ROOT__."/js/lang/".$l_name.".js");
		

		file_put_contents(__ROOT__."/inc/lang/".$l_name.'.php', '<?php /* '.$l_name.' php lang file */ $site_lang = ' . var_export( json_decode($p_lang,true), true) . ';');
		file_put_contents(__ROOT__."/js/lang/".$l_name.'.js', '/* '.$l_name.' language for javascript document---------------------------------------------- */ var lang = ' . $j_lang . ';');

		$r = 1;
	}
	echo $r;
}

// mailing
public function mailing()
{


$this->template->display($this->theme_dir."/admincp/pages/mail.html");


}

// send mail
public function sendmail(){
	
	$subj = isset($_POST['subject']) ? $this->test_input($_POST['subject']) : '';
	$msg = isset($_POST['message']) ? $this->test_input($_POST['message']) : '';
	$to = isset($_POST['filter']) ? $this->test_input($_POST['filter']) : '';
	
	if($to && $msg && $subj)
	{
	// select e-mails
	switch($to){
		
		case 'all':
		$q = $this->query_select("select email from ".tbl_users." order by id desc");
		break;
		
		case 'confirmed':
		$q = $this->query_select("select email from ".tbl_users." where `status`='confirmed' order by id desc");
		break;
		
		case 'pending':
		$q = $this->query_select("select email from ".tbl_users." where `status`='pending' order by id desc");
		break;
		
	}
		$emails = array();
		foreach($q as $r):
		
				$emails[] = $r['email'];
		
		endforeach;

		
		
						$to      = implode(',',$emails);
						$subject = $subj;
						$message = $msg;
						$headers = '';
						$headers .= 'From: no-reply@'.$this->settings['sitename'] . "\r\n" .
									'Reply-To: no-reply@'.$this->settings['sitename'] . "\r\n";
									
						// To send HTML mail, the Content-type header must be set
						$headers .= 'MIME-Version: 1.0' . "\r\n";
						$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

						if(mail($to, $subject, $message, $headers)){
		
				$this->returnto("./admin.php?cmd=mail");
				$this->msg('The messages was successfully sent!','success');
						} else {
				$this->returnto("./admin.php?cmd=mail");
				$this->msg('Messages was not sent!, there is an tehnical error, please check the email settings section.','error');
							
						}
} else {
				$this->returnto("./admin.php?cmd=mail");
				$this->msg('Messages was not sent!, please check if the form is completed correctly.','error');
}
}

// search
public function search(){
	
$key = isset($_GET['key']) ? $this->test_input($_GET['key']) : '';
$search_in = isset($_GET['search_in']) ? $this->test_input($_GET['search_in']) : '';

	
	switch($search_in){
		
		case 'users':
		$sql = "select * from ".tbl_users." where `name` LIKE N'%".$key."%' OR `surname` LIKE N'%".$key."%' OR `fullname` LIKE N'%".$key."%' OR `username` LIKE N'%".$key."%' 
		order by fullname asc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_users." where `name` LIKE N'%".$key."%' OR `surname` LIKE N'%".$key."%' OR `fullname` LIKE N'%".$key."%'")
		 or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=users&key=".$key."&page=%s"; 
		break;
		case 'communities':
		$sql = "select * from ".tbl_communities." where `name` LIKE N'%".$key."%' 
		order by `name` asc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_communities." where `name` LIKE N'%".$key."%'")or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=communities&key=".$key."&page=%s";
		break;
		case 'videos':
		$sql = "select * from ".tbl_videos." where `title` LIKE N'%".$key."%' OR `description` LIKE N'%".$key."%' OR `tags` LIKE N'%".$key."%'
		order by `title` asc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_videos." where `title` LIKE N'%".$key."%' OR `description` LIKE N'%".$key."%' OR `tags` LIKE N'%".$key."%'")or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=videos&key=".$key."&page=%s"; 
		break;
		
		case 'music':
		$sql = "select * from ".tbl_songs." where `artist` LIKE N'%".$key."%' OR `title` LIKE N'%".$key."%' OR `album` LIKE N'%".$key."%'
		order by `artist` asc,`title` asc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_songs." where `artist` LIKE N'%".$key."%' OR `title` LIKE N'%".$key."%' OR `album` LIKE N'%".$key."%'")or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=music&key=".$key."&page=%s"; 
		break;
		
		case 'apps':
		$sql = "select * from ".tbl_apps." where `title` LIKE N'%".$key."%' OR `description` LIKE N'%".$key."%' order by `title` asc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_apps." where `title` LIKE N'%".$key."%' OR `description` LIKE N'%".$key."%'")or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=apps&key=".$key."&page=%s"; 
		break;
		
		case 'posts':
		$sql = "select * from ".tbl_posts." where `text` LIKE N'%".$key."%' order by `id` desc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_posts." where `text` LIKE N'%".$key."%'")or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;	
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=posts&key=".$key."&page=%s"; 
		break;
		
		case 'themes':
		$sql = "select * from ".tbl_themes." where `name` LIKE N'%".$key."%' order by `name` asc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_themes." where `name` LIKE N'%".$key."%'")or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;
		$cq = $cq->fetch_row();
		$count = $cq[0];
		
		$page_url = "/admin?cmd=search&search_in=themes&key=".$key."&page=%s"; 
		break;
		
	}

														
		$query = $this->pagination(25,false,$page_url,$sql,$count);						 
								 
	
		$this->template->assign(["q" => $query[0], "pagination" =>  $query[1], "count" => $count]);
		$this->template->assign([
							"key" => $key
						   ,"this" => $this
						   ,"_in" => $search_in
		]);	
		$this->template->display($this->theme_dir."/admincp/pages/search.html");	

}

// reports
public function reports(){
	
	
		$sql = "select * from ".tbl_report."
		order by `id` desc";
		
		$cq = $this->db->query("select COUNT(*) FROM ".tbl_report)or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);	;
		$cq = $cq->fetch_row();
		$count = $cq[0];
				
		$page_url = "/admin?cmd=reports&page=%s"; 
	
		$query = $this->pagination(25,false,$page_url,$sql,$count);	
	
		$this->template->assign(["q" => $query[0], "pagination" =>  $query[1], "count" => $count]);	
		$this->template->display($this->theme_dir."/admincp/pages/reports.html");
}

// get report cnt
public function getReportCnt($id,$type){
	
	$str = 'Not available.';
	switch($type){
		
		case 'private_messages':
		
		$q = $this->query_select("select `msg` from ".tbl_msg." where `id`='{$id}' limit 1");
		foreach($q as $r):
				$str = $r['msg'];
		endforeach;
		break;
		
		case 'user':
		
		$u_n = $u_c = $u_g = '';
		$q = $this->query_select("select `gender`,`fullname`,`profile_photo` as avatar from ".tbl_users." where `id`='{$id}' limit 1");
		foreach($q as $r):
				$u_n = $r['fullname'];
				$u_c = $r['avatar'];
				$u_g = $r['gender'];
		endforeach;
		
		$str = '<!---<div class="report_user_nm"><b>'.$u_n.'</b></div>--><div title="'.$u_n.'" rel="tipsy" class="report_avatar"><img src="/getPhoto?p='.$u_c.'&sz=small&g='.$u_g.'"/></div>';
		
		break;
		
		case 'post':
		
		$q = $this->query_select("select `type` from ".tbl_posts." where `id`='{$id}' limit 1");
		foreach($q as $r):
				$str = $r['type'];
		endforeach;
		break;
		
		case 'photo':
				$str = '<div class="rp_photo"><img src="/getPhoto?p='.$id.'&sz=small" /></div>';
		break;
		
		
		case 'video':
				$str = '<div class="rp_vd"><img src="/videoCover?v='.$id.'" /></div>';
		break;
		
	}
	
return $str;
	
}

public function getReportUser($uid){
	
	$a = $this->db->query("select `id`,`fullname` from ".tbl_users." where `id`='{$uid}' limit 1");
	$b = $a->fetch_array(MYSQLI_ASSOC);
	return $b;
}

public function markReportAsRead(){
	
	$ids = isset($_POST['ids']) ? json_decode($_POST['ids'],true) : '';
	$r = 0;
	$update = false;
	if($ids){
		
		
		foreach($ids as $id):
		$update = $this->query_update("update ".tbl_report." set `seen`='yes' where `id`='{$id}'");
		endforeach;
		
		if ($update) $r = 1;
	}
	
	
	echo $r;
}

public function viewreport(){
	
	$type = isset($_GET['type']) ? $this->test_input($_GET['type']) : '';
	$item_id = isset($_GET['itemid']) ? (int) $this->test_input($_GET['itemid']) : '';
	$rby = isset($_GET['rby']) ? (int) $this->test_input($_GET['rby']) : '';
	
	// update report as seen='yes'
	$this->query_update("update ".tbl_report." set `seen`='yes' where `id`='{$this->id}'");
	
	$report_q = $this->db->query("Select * from ".tbl_report." where `id`='{$this->id}' limit 1");
	$report_q = $report_q->fetch_array(MYSQLI_ASSOC);
	
	switch($type){
		
		case 'private_messages':
		
		$q = $this->db->query("select * from ".tbl_msg." where `id`='{$item_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		$this->template->assign(["this" => $this, "r" => $r, "rby" => $rby, "report_q" => $report_q]);
		$this->template->display($this->theme_dir."/admincp/pages/report/pm.html");
		
		break;
		
		
		case 'user':
		
		$q = $this->db->query("select * from ".tbl_users." where `id`='{$item_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
	
		
		$this->template->assign(["this" => $this, "r" => $r, "rby" => $rby, "report_q" => $report_q]);
		$this->template->display($this->theme_dir."/admincp/pages/report/user.html");
		
		break;
		
		case 'post':
		
		$q = $this->db->query("select * from ".tbl_posts." where `id`='{$item_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
	
		
		$this->template->assign(["this" => $this, "id" => $this->id, "r" => $r, "rby" => $rby, "report_q" => $report_q]);
		$this->template->display($this->theme_dir."/admincp/pages/report/post.html");
		
		break;
		
		
		case 'photo':
		
		$q = $this->db->query("select * from ".tbl_photos." where `id`='{$item_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
	
		$p_ow = $this->db->query("select `id`,`fullname` from ".tbl_users." where `id`='".$r['userid']."' limit 1");
		$p_ow = $p_ow->fetch_array(MYSQLI_ASSOC);
		
		$this->template->assign(["this" => $this, "ufn" => $p_ow['fullname'], "item_id" => $item_id, "uid" => $p_ow['id'], "id" => $this->id, "r" => $r, "rby" => $rby, "report_q" => $report_q]);
		$this->template->display($this->theme_dir."/admincp/pages/report/photo.html");
		
		break;
		
		
		case 'video':
		
		$q = $this->db->query("select * from ".tbl_videos." where `id`='{$item_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
	
		$p_ow = $this->db->query("select `id`,`fullname` from ".tbl_users." where `id`='".$r['userid']."' limit 1");
		$p_ow = $p_ow->fetch_array(MYSQLI_ASSOC);
		
		$this->template->assign(["this" => $this, "ufn" => $p_ow['fullname'], "item_id" => $item_id, "uid" => $p_ow['id'], "id" => $this->id, "r" => $r, "rby" => $rby, "report_q" => $report_q]);
		$this->template->display($this->theme_dir."/admincp/pages/report/video.html");
		
		break;
		
	}
	
	
	
}


public function rDeletePhoto(){
	
	$returnto = isset($_GET['returnto']) ? $_GET['returnto'] : '';
	$r_id = isset($_GET['rid']) ? $_GET['rid'] : '';
	if($this->id){
		
		if( $this->query_delete("delete from ".tbl_photos." where `id`='{$this->id}'") )
			{
				$this->query_update("update ".tbl_report." set `type_id`='0' where `id`='{$r_id}'");
				$this->returnto($returnto);
				$this->msg('Photo has been successfully deleted.','success');
			} else 
			{
				$this->returnto($returnto);
				$this->msg('An tehnical error occurred.','error');
			}
		
	}
	
}
public function rDeleteVideo() {
	
	$returnto = isset($_GET['returnto']) ? $_GET['returnto'] : '';
	$r_id = isset($_GET['rid']) ? $_GET['rid'] : '';
	if($this->id){
		
		if( $this->query_delete("delete from ".tbl_videos." where `id`='{$this->id}'") )
			{
				$this->query_update("update ".tbl_report." set `type_id`='0' where `id`='{$r_id}'");
				$this->returnto($returnto);
				$this->msg('Video has been successfully deleted.','success');
			} else 
			{
				$this->returnto($returnto);
				$this->msg('An tehnical error occurred.','error');
			}
		
	}
	
}
public function blockPost(){
	$returnto = isset($_GET['returnto']) ? $_GET['returnto'] : '';
	
	if($this->id){
		
		if( $this->query_update("update ".tbl_posts." set `text`='The post has been blocked by administration.' where `id`='{$this->id}' limit 1") )
			{
		
				$this->returnto($returnto);
				$this->msg('Post has been successfully blocked.','success');
			} else 
			{
				$this->returnto($returnto);
				$this->msg('An tehnical error occurred.','error');
			}
		
	}
	
}

public function msgAsSpam(){
	
	$returnto = isset($_POST['returnto']) ? $_POST['returnto'] : '';

	if($this->id){
		
		if( $this->query_update("update ".tbl_msg." set `msg`='Message was marked as spam.' where `id`='{$this->id}' ") )
			{
		
				$this->returnto($returnto);
				$this->msg('Message marked as spam.','success');
			} else 
			{
				$this->returnto($returnto);
				$this->msg('An tehnical error occurred.','error');
			}
		
	}
	
}

public function userdetails($id){
	$q = $this->db->query("select * from ".tbl_users." where `id`='{$id}' limit 1");
	return $q->fetch_array(MYSQLI_ASSOC);
	
}

// footer
public function footer(){
		$this->template->display($this->theme_dir."/admincp/footer.html");
	
}

}