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


// configuration file
require_once('_config.php');

// global functions
require_once('classes/class._c2_global.php');

// continue global functions
require_once('classes/class._d2_global.php');

// window chat class
require_once('classes/class.w_chat.php');

// tab chat class
require_once('classes/class.t_chat.php');

// load more data
require_once('classes/class.load_more_data.php');

// smarty class, template engine
require_once('__smarty.class.php');

// getID3
require_once('getid3/getid3.php');

// global functions
require_once('global.functions.php');

// photo viewer
require_once('classes/class.photoViewer.php');

// post details class
require_once('classes/class.postDetails.php');

// comments widget
require_once('classes/class.commentsWidget.php');

// statuses class
require_once('classes/class.Posts.php');

// video class
require_once('classes/class.Video.php');

// search class
require_once('classes/class.Search.php');


// Messenger
require_once('classes/class.messenger.php');

// Ajax messenger
require_once('classes/class.messenger_ajax.php');

// Ratings class
require_once('classes/class.ratings.php');

// PHPMailer
//require_once('phpmailer/PHPMailerAutoload.php');

// Communities
require_once('classes/class.communities.php');

// market 
require_once('classes/class.market.php');

// stories 
require_once('classes/class.stories.php');

// Amazon S3 cloud service
require_once('classes/class.S3.php');

// face detector
//require_once('../cmd/face-detector/FaceDetector.php');

// load embera
require_once('classes/Embera/Autoload.php');

// sms api
require_once('classes/textlocal.class.php');

// load composer
require_once('vendor/autoload.php'); 

// cleanup
require_once("cleanup.php");

// Add translate module
use Stichoza\GoogleTranslate\TranslateClient;
 

class _SOCIALPLUS {

public $autoclean_interval = (60*3); // 3 mins
public $get_header = "/body/header.html"; // get header for all pages
public $get_footer = "/body/footer.html"; // close html content for all pages
public $error_template = "/body/error.html"; // error template
public $online_hook = "/body/online-friends.html"; // online friends
public $user_content = "/body/user-content.html";
public $anonym_content = "/body/anonym-content.html";
public $pNotFound      = "/404.html";
public $menuFile = "/profile/menu.html";
public $friendmenu = "/friends/friend-top-menu.html";
public $menuFile_FEED = "/profile/menu_feed.html";
public $wideMenu = "/profile/wide-menu.html";
public $postsFile = "/profile/posts-box.html";
public $detectionDAT = "/cmd/face-detector/detection.dat";
public $userPostBox;
public $widget_list;
public $private_profile_tpl;
public $lang;
public $is_ajax;
public $view_as_json;
public $db;
public $pSize;
public $cyear;
public $activePage;
public $_friendmenu;
public $_lang_prefix;
public $s3;
public $s3_video_url;
public $theme_dir;
public $theme_url;
 
 


    


// set session, specially for smarty
public function smarty_set_session($value,$session_name) {
$_SESSION[$session_name] = $value;
return $_SESSION[$session_name];

}

// simple die() php function, specially for smarty 
public function smarty_die($text = ''){
return die($text);
}

// simple exit() php function, specially for smarty 
public function smarty_exit($text = ''){
return exit($text);
}



// --------------------------- Connect to DATABASE ---------------------------------
private function db_conn($encoding = 'utf8'){

try {
$this->db = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

if($this->db->connect_errno > 0){
    die('Unable to connect to database [' . $this->db->connect_error . ']');
} else
$this->db->set_charset('utf8mb4');

register_shutdown_function([$this, 'autoclean']);

return $this->db;

} catch (Exception $e) {
	return $e->getMessage();
}


} // END db_conn()


// ------------------------------ RUN QUERIES --------------------------
// for select
public function query_select($query) {

    $result_array = array();
    $database = $this->db_conn();
    $result = $database->query($query) or die($database->error);
    if(!$result){
        die("No disponible data to show. [ error: empty ]");
    }
   

    while($row = $result->fetch_assoc())
        $result_array[] = $row;

    return $result_array;


} // END run_query()

// for insert
public function query_insert($query) {

    $database = $this->db_conn('utf8mb4');
    $query = $database->query($query) or die($database->error);
    $insert_id = @mysqli_insert_id($database);
    if(!$insert_id){
        die("An error occurred to insert data into database.");
    }

    return $insert_id;
   

} // END run_query_insert()

// for update
public function query_update($query) {

    $database = $this->db_conn('utf8mb4');
    $query = $database->query($query) or die($database->error);
    if(!$query){
        die("An error occurred to update data.");
    }

   return true;
   

} // END run_query_update()

// for delete
public function query_delete($query) { 

    $database = $this->db_conn();
    $query = $database->query($query) or die($database->error);
    if(!$query){
        die("An error occurred to delete data from database.");
    }

   return true;
   

} // END query_delete()
public function autoclean() {


    $now = time();
    $docleanup = 0;

    $res = $this->db->query("SELECT value_u FROM avps WHERE arg = 'lastcleantime'");
    $row = $res->fetch_array(MYSQLI_ASSOC);
	$row_z = isset($row['value_u']) ? $row['value_u'] : 0;
	
	 
    if (!$row_z) {
        $this->query_insert("INSERT INTO avps (arg, value_u) VALUES ('lastcleantime','{$now}')");
        return;
    }
    $ts = $row_z;

    if ($ts + $this->autoclean_interval > $now)
        return;
 
    if ( !$this->query_update("UPDATE avps SET value_u='{$now}' WHERE arg='lastcleantime' AND value_u = '{$ts}'") )
        return;
	else {
 
	$c = new cleanup_class;
    $c->docleanup();
	
	
	}
	
}



public function __construct(){
global $site_config,$site_lang; // import settings

 

	// check for install folder
	if ( file_exists(__ROOT__.'/install/') || !defined("_INSTALLED")){

		header("location:/install/");
		exit();
		
		
	}
	

	$v_cok_exp = time() + (86400 * 360); // 1 year
	if(isset($_COOKIE['_version'])) {
		
		if($_COOKIE['_version'] < _VERSION) { 
				$this->signoutcookie();
				setcookie("_version", _VERSION, $v_cok_exp, "/");
				
		}

	}
	

	// redirect to secured url
	if(HTTPS_ON){
	if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
		$redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		header('HTTP/1.1 301 Moved Permanently');
		header('Location: ' . $redirect);
		exit();
	}
	}
	if(substr($_SERVER['SERVER_NAME'],0,4) != "www." && ($_SERVER['SERVER_NAME'] != 'localhost' && $_SERVER['SERVER_NAME'] != '127.0.0.1') ) {
		
		if(HTTPS_ON) $www_https = "https://www."; else $www_https = "http://www.";
		
		header('Location: '.$www_https.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']);
		
	}
		
      // Check for PHP version
      $required_php_version = '7.0';
      if (version_compare(PHP_VERSION, $required_php_version, '<')) {
           return die('SocialPlus requires PHP v' . $required_php_version . ' or higher - you are running v' . PHP_VERSION);
      }
	 

      // check if cUrl is enabled
      if  (!function_exists('curl_version')) {
        
          return die('<p>Social Plus can not be initialized.<br/>Your server are disabled the php cURL function, please enable it an try again.</p>'); 
      }
 
      // store settings
      foreach($site_config as $key => $value){
      $this->settings[$key] = $value;
      }
	  
		// detect mobile devices	
		if($this->settings['mob_view_enabled'] && !empty($this->settings['mob_HOST'])){
		$useragent = $_SERVER['HTTP_USER_AGENT'];
		if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))
		{
			if(!isset($_SESSION['sp_fullversion']))
			header('Location: '.$this->settings['mob_HOST']);
			
		}
		}

     $this->view_as_json = isset($_GET['view_as']) || isset($_POST['view_as']) ? true : false;
	 // check for ajax requests
	 $this->is_ajax = isset($_POST['ajax']) ? 1 : ( isset($_GET['ajax']) ? 1 : 0 );

     // create a smarty object
     $this->template = new Smarty;
	 
	 $this->activePage = isset($_GET['nav']) ? $_GET['nav'] : '';

  
     $this->db_conn();

	 if(!isset($_COOKIE['bday_blacklist'])){
		 
	$expires = time() + (86400 * 2); // 2 days
	//setcookie("bday_blacklist", "", $expires, "/");
	 }


	 
     if($this->get_userId() > 0){
     // get the user data and set the global var $USER
     $sql = "SELECT * FROM ".tbl_users." WHERE id = ". $this->get_userId(); 
	 
     foreach($this->query_select($sql) as $user_data):
     $this->USER = $user_data;// the $USER variable has been defined :) 
     endforeach;
	 
     if( isset($this->USER['id']) ){
		 $this->updateOnlineStatus($this->USER['id']);
	 } else {
		 
		 $this->signoutcookie();
		 header("refresh:3; url=/");
		 echo 'Please wait..';
		 die();
	 }
	 
	 
     } else {
     $this->USER = 0;
     }
	 
	 /*
	 	 if(!count($this->query_select("SELECT * FROM ".tbl_users))){
		 
		$this->USER = 0;
		 
	 }*/
	 
	   // Language packs
	   # language file
	   $this->_lang_prefix = ( $this->USER ? $this->test_input($this->USER['language'] ) : ( isset($_COOKIE['global_lang']) ? $this->test_input($_COOKIE['global_lang'] ) : $site_config['SITE_LANG']) );
	   require_once('lang/'. $this->_lang_prefix.'.php');

      // get site language
      foreach($site_lang as $key => $value){
      $this->lang[$key] = $value;
      }
	 
	$this->cyear = date('Y');
	$this->pSize = array(
			'large' => '/large/',
			'thumb' => '/thumb/',
			'medium' => '/medium/',
			'small' => '/small/',
			'exp' => '/exp/',
			'grid' => '/grid/'
		      );
	$this->theme_dir = __ROOT__.'/template/'._THEME.'/nav/';  
	$this->theme_url = $this->settings['HOST'].'/template/'._THEME.'/';
	$this->_friendmenu = $this->theme_dir.$this->friendmenu;
	$this->widget_list = $this->theme_dir.'/feed/widget-list.html';
	$this->userPostBox = $this->theme_dir.'/profile/add-post.html';
 
	
	//AWS access info
	if (!defined('awsAccessKey')) define('awsAccessKey', $this->settings['AMAZON_S3_ACCESS_KEY']);
	if (!defined('awsSecretKey')) define('awsSecretKey', $this->settings['AMAZON_S3_SECRET_KEY']);
			  
    $this->s3 = new S3(awsAccessKey, awsSecretKey);
	
	$htps = HTTPS_ON ? 'https://' : 'http://';
	$this->s3_video_url = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uvideo/';
 

	// update users ip
	$this->updateUserIp();
	
	
	///$htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uvideo/'.$glb->getVidCover($vid).'/covers/'.$vid.'.png'
	
	$this->s3_club_video_url = $htps.AWS_S3_BUCKET_NAME.$this->settings['AMAZON_S3_COMMUNITIES_VIDEO_BUCKET'][0].'.s3.amazonaws.com/';
	
	 // site offline
	if($this->settings['site_offline'] === "true" && ( (isset($this->USER) && $this->USER['class'] !== 'UC_SYSOP') || !isset($this->USER) ) ){
	$this->template->assign(["this" => $this, "widget_list" => $this->widget_list]);
	$this->template->display($this->theme_dir."/body/site-offline.html");
	exit;
	
}	  
 


	// private profile path
	$this->private_profile_tpl = $this->theme_dir."/body/private-profile.html";
			  
     
    } // END __construct()

public function updateUserIp(){
	
	$ip = $_SERVER['REMOTE_ADDR'];
	if( isset($this->USER) && $this->USER > 0 ){
	$user_ip = $this->get_client_ip_env();
	$update_user_ip = $this->query_update("UPDATE ".tbl_users." SET `ip`='{$user_ip}' WHERE id = ".$this->USER['id']);
	$ip = $user_ip;
	}
	return $ip;
}



// require global functions
 public function im_global(){
 return  new _global_co;
}
// require mobile music class
public function mobile_music(){
 return  new MOBILE_MUSIC;
}
// require communities class
public function im_communities(){
 return  new _COMMUNITIES;	
}
// require market class
public function im_market(){
 return  new _MARKET;	
}
// require stories class
public function im_stories(){
 return  new _STORIES;	
}
// require video class
 public function n_video(){
 return  new video;
}
      // require global functions (the file 2, continue of c2_global)
 public function c_im_global(){
 return  new _c_global_co;
}

 public function im_messenger(){
 return  new MESSENGER;
}

 public function c_PM(){
 return  new PRIVATE_MESSAGES;
}

// window chat class
 public function w_chat(){
 return  new w_chat;
}
// tab chat class
 public function t_chat(){
 return  new t_chat;
}
// require d_load class
 public function call_load(){
 return  new d_load;
}

// build statuses class
public function buildPostClass(){

return new postsClass;

}
// build statuses class
public function buildSearchClass(){

return new Search;

}
// build new market 
public function newMarket(){
	return new _MARKET;
}
// comments widget class
public function commWidget(){
	
	return new comm_widget;
}
// get all Countries
public function getAllCountries(){
	$countries = array();

	$q = $this->query_select("select * from ".tbl_countries);

	foreach($q as $r):
	
	$countries[] = array(
	"id" => $r['id'],
	"name" => $r['name'],
	"code" => $r['sortname']
	);
	
	endforeach;
	
	return addslashes(json_encode($countries));
}
 // get city and country name by id
 // @apart = return as array or string
 public function gUserCtyCity($u_country,$u_city,$apart = NULL){
	 
	 	$country_id = $u_country;
		$city_id = $u_city;
		
		$q = $this->db->query("select c.name as country_name, s.name as state_name from ".tbl_countries." c 
												left join ".tbl_states." s ON s.id = '{$city_id}' 
												where c.id = '{$country_id}' group by c.id limit 1");
		$res = $q->fetch_array(MYSQLI_ASSOC);
		$country_name = isset($res['country_name']) ? $res['country_name'] : '';
		$city_name = isset($res['state_name']) ? $res['state_name'] : '';
		$r = $apart ? array("city" => $city_name, "country" => $country_name) : $city_name.',&nbsp;'.$country_name;	 
		
	 return $r;
 }
 public function getUserNotifSettings(){

	$result = isJson( $this->USER['notifications_settings'] ) ? $this->USER['notifications_settings'] : $this->createArrForNotifSettings();
 
	 return addslashes($result); 
 }
 private function createArrForNotifSettings($key = false, $value = false){
	 
	$default_arr = array("notification_sound" => "on", "important_notif_dropdown" => "on");
	
	if($key && $value)
		$default_arr[$key] = $value;
	
	 return json_encode($default_arr);
 }
 public function updateNotificationSettings(){
	$st_name = isset($_POST['notif-st-key']) ? $this->test_input($_POST['notif-st-key']) : '';
	$val = isset($_POST['val']) ? $this->test_input($_POST['val']) : 'on';
	$key = false;
	$update_arr = array();
	$i = $this->USER['id'];
	switch($st_name){
		
		case 'sound':
		$key = 'notification_sound';
		break;
		case 'dropdown':
		$key = 'important_notif_dropdown';
		break;
		
		
	}
	 
	if( isJson( $this->USER['notifications_settings'] ) ){
		
		
		$update_arr = json_decode($this->USER['notifications_settings'],true);
		
		
	} else {
		
		$update_arr = json_decode($this->createArrForNotifSettings("notification_sound",$val),true);
		
	}
	$r = array("msg" => 0, "key" => 0);
	if($key){
	$update_arr[$key] = $val;
	$update_arr = json_encode($update_arr);
 
	
	if($this->query_update("update ".tbl_users." set `notifications_settings`='{$update_arr}' where `id`='{$i}'"))
		$r = array("msg" => $val, "key" => $key);
	}
	
	return json_encode($r);
	
 }
// get all friends
public function getAllFriends(){
	
	$i = $this->USER['id'];
	if(!$i) return ''; else {
		$friends = [];
		// get friends
		$q = $this->query_select("select u.allow_tag_posts,u.id,u.fullname,u.gender,u.profile_photo as photo from ".tbl_users." u, ".tbl_friends." f 
		where u.id = f.friendid and f.status='confirmed' and f.userid='{$i}' group by f.friendid order by f.added desc
		");
		
		foreach($q as $r):
		
		$friends[$r['id']] = ["id" => $r['id'], "uname" => $r['fullname'], "gender" => $r['gender'], "photo" => $r['photo'], "allow_tag_in_posts" => $r['allow_tag_posts']]; 
		
		endforeach;
		
		return addslashes(json_encode($friends));
		
	}
	
}
public function getAllFrendsId(){
	$i = $this->USER['id'];
	if(!$i) return array(); else {
		$friends = [];
		// get friends
		$q = $this->query_select("select u.id from ".tbl_users." u, ".tbl_friends." f 
		where u.id = f.friendid and f.status='confirmed' and f.userid='{$i}' group by f.friendid order by f.added desc
		");
		
		foreach($q as $r):
		
		$friends[] = $r['id']; 
		
		endforeach;
		
		return $friends;
		
	}
}
// get user country and city
public function getUserCityAndCountry($h_user = false){
	
	$user = isset($this->USER) ? $this->USER : 0;
	
	if(isarray($user) && !$h_user){
		
		$r = $this->getThisUserLocation($user['id'],true);

	} else if (isset($h_user) && isarray($h_user)) {
		$r = $this->getThisUserLocation($h_user['id'],true);
		
	} else $r = '';
	
	
	return $r;
}

public function getUserLocationName($uid) {
	
	$q = $this->db->query("select country,city from ".tbl_users." where `id`='{$uid}' limit 1");
	$user = $q->fetch_array(MYSQLI_ASSOC);
	
	return $this->gUserCtyCity($user['country'],$user['city']);
	
}
public function getStates(){
	
	$states = array();
	$states_gr = array();
	// select states for respective country
	$q = $this->query_select("select id,name,country_id from ".tbl_states);
	
	foreach($q as $r):

	$states[$r['country_id']][] =  ["id" => $r['id'], "name" => $r['name']];

	endforeach;
	
	return addslashes(json_encode($states));	
}

// check for country if exist in database
public function findCountryInDb($c)
{	$c = $this->test_input($c);
	$search = $this->db->query("select id from ".tbl_countries." where `name` = '{$c}' limit 1");
	$search = $search->fetch_array(MYSQLI_ASSOC);
	return $search['id'] ? $search['id'] : 0;
	
	
}

// check for country if exist in database
public function findCityInCountry($c)
{
	$c = $this->test_input($c);
	$search = $this->db->query("select s.id from ".tbl_states." s,".tbl_countries." c where s.name = '{$c}' and c.id=s.country_id limit 1");
	$search = $search->fetch_array(MYSQLI_ASSOC);
	return $search['id'] ? $search['id'] : 0;
	
}
// get user notifications
public function userNotifCount($total = 0){


$res = '';
$friends = $gifts = $groups = $games = $payments = $other = $totalc = 0;


if($this->USER){

$uid = $this->USER['id'];

// get user notifications
$query = $this->query_select("select categ from ".tbl_notif." where `userid`='{$uid}' and `unread`='no'");

 
 
foreach($query as $res):


switch($res['categ']) {
	
	
	case 'friends':
	$friends++;
	break;
	
	case 'gifts':
	$gifts++;
	break;
	
	case 'groups':
	$groups++;
	break;
	
	case 'games':
	$games++;
	break;
	
	case 'payments':
	$payments++;
	break;
	
	case 'other':
	$other++;
	break;
}

$totalc++;
endforeach;


}
 
 

if($total)
$response = $totalc;
else
$response = ['friends' => $friends, 'gifts' => $gifts, 'groups' => $groups, 'games' => $games, 'payments' => $payments, 'other' => $other];

return $response;


}

// get photo dimension
public function getThisPhotoDimension($id,$size,$w_h,$max = 0){

list($width,$height) = getimagesize($this->settings['HOST']."/getPhoto?p=".$id."&sz=".$size);

return $w_h == 'width' ?  ($max && $max < $width ? $max : $width) : ($max && $height > $max ? $max : $height);

}
// build online query
public function onlineQuery($all = 0,$c = 0){
$i = $this->USER['id'];
$arr = array();
$limit = $all ? '' : "limit ".$this->settings['FRIENDS_ONLINE_LIMIT'];
$select = $c ? 'u.id' : 'u.id,u.username,u.online,u.fullname,u.gender,u.profile_photo';
$query = $this->query_select("select ".$select." from ".tbl_users." u, ".tbl_friends." f
                              where f.userid='{$i}' and u.display_online='true' and f.status='confirmed' and u.id=f.friendid and u.id != '{$i}' 
and f.friendid NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}')
group by u.id order by u.online desc,RAND() ".$limit);

if($c){
foreach ($query as $res){
if($this->is_online($res['id']))
array_push($arr,$res['id']);
}
}

return $c ? sizeof($arr) : $query;

}
// online friends
public function hookOnlineFriends(){

// select online friends for respective user
$query = $this->onlineQuery();

$this->template->assign(['this' => $this, 'query' => $query]);
$this->template->display($this->theme_dir.$this->online_hook);

}

// get count of online friends
public function count_online_friends(){
$i = $this->USER['id'];
$on = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");
$query = $this->db->query("   select COUNT(u.id) as c from ".tbl_users." u, ".tbl_friends." f
                              where f.userid='{$i}'
			      and f.status='confirmed'
			      and u.id = f.friendid
			      and u.id != '{$i}' 
			      and u.online >= '{$on}'
			      and f.friendid NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}')
			      order by u.online desc,RAND()");
$res = $query->fetch_array(MYSQLI_ASSOC);
return !$res['c'] ? '0' : $res['c'];
}

// get online friends
public function getOnlineFr(){

$i = $this->USER['id'];
$arr = array();
$on = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");
$query = $this->query_select("select u.id,u.fullname,u.profile_photo,u.online from ".tbl_users." u, ".tbl_friends." f
                              where f.userid='{$i}'
			      and f.status='confirmed'
			      and u.id = f.friendid
			      and u.id != '{$i}' 
			      and u.online >= '{$on}'
			      and f.friendid NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}')
			      order by u.online desc,RAND()");

foreach($query as $res)
$arr[] = array('id' => $res['id'], 'last_seen' => $this->time_elapsed($res['online']), 'online' => $res['online'], 'name' => $res['fullname'], 'photo' => $res['profile_photo']);


return count($arr) > 0 ? json_encode($arr) : 'null';

}

// build header
public function build_header($title = '',$reg_form = false, $is_chat = false, $force_header = false){
	
 

if(!$this->view_as_json || $force_header){

// get site name
$this->template->assign('SITENAME',$this->settings['SITENAME']);
$this->template->assign('DIR',__ROOT__);
$this->template->assign('this',$this);
$this->template->assign('php_self',$_SERVER['PHP_SELF']);
$this->template->assign('title',!empty($title) ? '- '.$title : '');
$this->template->assign('reg_form',$reg_form);
$this->template->assign('c2global',new _global_co);

$this->template->assign(['notif'=>$this->userNotifCount(1), 'is_chat' => $is_chat,'acvm' => isset($_GET['music']) ? base64_decode($_GET['music']) : '']);

$this->template->display($this->theme_dir.'/body/header.html');//$this->get_header);  //(__ROOT__.$this->get_header);

}


}

public function get_footer($force_footer = false){

if(!$this->view_as_json || $force_footer)
// get site name
$this->template->display($this->theme_dir.$this->get_footer);
 
}

public function uGetTopMenuRedesign(){
$GLB = $this->im_global();
$GLB->getUmenuRedesign();
}

public function user_content(){

$uid = isset($_SESSION['cur_uid']) ?  ($_SESSION['cur_uid'] > 0 ? (int) $_SESSION['cur_uid'] : $this->USER['id'] ) : $this->USER['id'];

///echo '<div style="color:red;font-weight:bold;font-size:40px;z-index:9999999999;">'.$uid.'</div>';
// get user theme
//$query = $this->db->query("select theme from ".tbl_users." where `id` = '$uid' limit 1");
//$res = $query->fetch_array(MYSQLI_ASSOC);


//$this->template->assign(['this' => $this, 'themeid' => $res['theme']]);

$wall = isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '' ? '__wall' : '';
$p = $this->USER;
$cglb = $this->im_global();
$this->template->assign(['this' => $this, 'p' => $p, 'wall' => $wall, 'cglb' => $cglb]);
$this->template->display($this->theme_dir.$this->user_content);
}
public function anonym_content(){
$this->template->display($this->theme_dir.$this->anonym_content);
}

public function info_msg($text){

$this->template->assign(['back'=>$this->lang['back'], 's' => $text]);
$this->template->display($this->theme_dir.'/body/infoMessage.html');

}
public function getUserCountryCode(){
	
 
	$ip = 'http://api.ipstack.com/'.$_SERVER['REMOTE_ADDR'].'?access_key='.$this->settings['IP_STACK_API'].'&format=1'; 
	$location = json_decode(file_get_contents($ip),true);
	$country_code = isset($location['country_code']) ? $location['country_code'] : 'us';

return 	$country_code;
}
/** PAGES **/

// registration
public function create_registration(){
$sysop = isset($_GET['sysop']) ? 1 : 0;
 

 
 
$this->template->assign('SITENAME',$this->settings['SITENAME']);
$this->template->assign('this',$this);
 


 
$this->template->assign('sysop',$sysop);

$this->template->display($this->theme_dir.'/registration/signup.html');

}


// index page 
public function login_page(){
$return_to = isset($_GET['returnto']) ? urldecode($_GET['returnto']) : '';
$user = isset($_GET['user']) ? urldecode($_GET['user']) : '';
$this->template->assign(['this' => $this, 'returnto' => $return_to, 'login' => $user]);

$this->template->display($this->theme_dir.'/index/login.html');
}

/** END PAGES **/

// escape input
public function test_input($data,$no_emoji = false) {

   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   
   if($no_emoji) $data = remove_emoji($data);
   
   return $this->db->real_escape_string($data);
}
// escape for sql
public function sql_escape($str){
	
	return $this->db->real_escape_string($str);
	
}
// is online user ?
public function is_online($id){
return $this->getUserStatus($id);
}

// get user status
public function getUserStatus($u){

if(!$u) return false;

$request = $this->db->query("select `online` from ".tbl_users." where `id`='{$u}' limit 1");
$response = $request->fetch_array(MYSQLI_ASSOC);

return $response['online'] > strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");
}

// update user online
public function updateOnlineStatus($id){
$id = $this->test_input($id);
$update = $this->query_update("UPDATE ".tbl_users." SET online = '".time()."' WHERE id = ".$id);

return $update ? 1 : 0;
}
public function signincookie($id, $passhash, $updatedb = 1, $expires = '')
{

	$expires = $expires != '' ? $expires : time() + (86400 * $this->settings['TIME_KEEP_USER_LOGGED']);
    $now = time();
	
	$ip = $_SERVER['REMOTE_ADDR'];
	$location = file_get_contents('http://api.ipstack.com/'.$ip.'?access_key='.$this->settings['IP_STACK_API'].'&format=1');
 
  
	$device_name = gethostbyaddr($ip);
	$i = $id;
    $backTwoMonths = strtotime("-2 months");
	setcookie("__sp_usi", base64_encode($id), $expires, "/");
	setcookie("__sp_usp", $passhash, $expires, "/");

  if ($updatedb)
  	$this->query_update("UPDATE ".tbl_users." SET last_login = NOW(), `online`='{$now}' WHERE id = ".$id);

 // check if exist in ip log
  $check_ip_log = count($this->query_select("select id from ".tbl_iplog." where `userid`='{$i}' and `ip`='{$ip}' limit 1")); 
 // insert into ip log
if(!$check_ip_log){
	  // delete data old than 2 months
	  $delete = $this->query_delete("delete from ".tbl_iplog." where `userid`='{$i}' and `time` < '{$backTwoMonths}'");
	 $this->query_insert("insert into ".tbl_iplog." set `data`='{$location}',`device_name`='{$device_name}', `ip`='{$ip}', `userid`='{$i}', `time`='$now' ");
}
 }

// logout
public function signoutcookie() {
    setcookie("__sp_usi", "", 0x7fffffff, "/");
    setcookie("__sp_usp", "", 0x7fffffff, "/");
	setcookie("chat_session", "", 0x7fffffff, "/");
	setcookie("chattab_minimized", "", 0x7fffffff, "/");
	setcookie("srch_display_tracks", "", 0x7fffffff, "/");
	
    setcookie("phlayer_top_editor", "", 0x7fffffff, "/");
 
}

// if user is logged
public function islogged(){

if(!$this->USER){
echo '<div class="__must_login"><span>Oops.. You don\'t have access to this page. Please <A href="./sign_in?returnto=/upload">login</a> to continue</span></div>';
$this->get_footer();
exit;
}
}
 
// need accoun to acces this page
public function loggedin(){

$require_loggin = (!isset($this->USER) || !$this->USER) ? true : false;
 
if($require_loggin && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{    
  echo json_encode(["status" => "require_login"]);
  exit;    
}
if($require_loggin){

header("location: /?returnto=".urlencode($_SERVER['REQUEST_URI']));
//print "<script>var return_to = '".urlencode($_SERVER['REQUEST_URI'])."';window.location='/?returnto="+return_to+";</script>";
}

}

// require account
public function rlog(){

$this->loggedin();

}
// if the count is greater than 99 , we show 99+
public function noMonHund($c){
return $c > 99 ? '99+' : $c;
}
// get user id
public function get_userId(){

return isset($_COOKIE['__sp_usi']) ? base64_decode($_COOKIE['__sp_usi']) : 0;
}


// user's count albums
public function getUserAlbumsCount($uid){
$request = $this->db->query("select id from ".tbl_albums." where userid=".$this->test_input($uid));
return 1+$request->num_rows;
}
// get user birthday like April 22 1994
public function getUserBirthday($bday){
	
 return $this->gMonthName(date('F j Y', strtotime($bday)));
	
	
}

// get user details
public function getUserDetails($uid) {
	
	$q = $this->db->query("Select * from ".tbl_users." where `id`='{$uid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	return $r;
	
}
// get gift details
public function getGiftDetails($gid){
	
	$q = $this->db->query("Select * from ".tbl_gifts." where `id`='{$gid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	return $r;
	
}

//get user age
public function getUserAge($b){

  //date in yyyy-mm-dd format; or it can be in other formats as well
  $birthDate = $b;
  //explode the date to get month, day and year
  $birthDate = explode("-", $birthDate);
  //get age from date or birthdate
  $age = (date("md", date("U", mktime(0, 0, 0, $birthDate[1], $birthDate[2], $birthDate[0]))) > date("md")
    ? ((date("Y") - $birthDate[0]) - 1)
    : (date("Y") - $birthDate[0]));
 return $age;
}

// get user gender
public function getUserGender($id){

$q = $this->db->query("select gender from ".tbl_users." where `id`='{$id}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

return $r['gender'];
}

public function displayError($text){
$this->template->assign('text',$text);
$this->template->display($this->theme_dir.$this->error_template);
$this->get_footer();
die;
}
public function infoM($t){

$this->template->assign(['back'=>$this->lang['back'], 's' => $t]);
$content = $this->template->fetch($this->theme_dir.'/body/infoMessage.html');
echo $this->getPage($content);
die;
}
public function dieErr($arr){

echo json_encode($arr);

die;

}
public function sendResponse($arr){

return json_encode($arr);

}
public function mksecret($len = 20) {
    $ret = "";
    for ($i = 0; $i < $len; $i++)
        $ret .= chr(rand(0,25)+65);
    return $ret;
}

public function getPage($content,$page = false){


if($this->view_as_json)
return json_encode(array("page" => $page ? $page : '', "content" => $content));
else 
return $content;

}

// insert to notification
public function toNotif($id,$categ,$reqId,$json = '',$c = '',$community = false,$mentioned = false){
$now = time();
if(!$id || !$categ) exit;

$community = $community ? ",`community`='yes'" : '';
$mentioned = $mentioned ? ",`mentioned`='yes'" : '';
$insert = $this->query_insert("insert into ".tbl_notif." set `userid` = '{$id}', `categ`='{$categ}', `item`='{$reqId}', `json`='{$json}',`time`='{$now}',`condition`='{$c}' ".$community.$mentioned);

if($insert){
 $data = array("event" => "notifications", "userid" => $id); 
 $this->emit_notification_to_socketio($data);
}


return $insert;

}

public function emit_notification_to_socketio(array $data){
         
 if(!$this->settings['_NODE_ENABLED']) return true;
 else {
 
 
	$data_string = json_encode($data);

	$ch = curl_init($this->settings['NODE_HOST'].'/emit-notifications');  
	if(HTTPS_ON) curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);	
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		'Content-Type: application/json',                                                                                
		'Content-Length: ' . strlen($data_string))                                                                       
	);                                                                                                                   

	$response = curl_exec($ch) == 'ok' ? true : false;
	curl_close($ch);

 	return $response;
 }
 
 
}
// get cover for personal photos album
public function getPphotoCover($uid = 0){
	
	$uid = $uid ? $uid : $this->USER['id'];
	
// select cover for personal album
$cv_p_album = $this->db->query("select id from ".tbl_photos." where `userid`='{$uid}' and albumid='0' order by position asc, added desc limit 1");
$cv_p_album = $cv_p_album->fetch_array(MYSQLI_ASSOC);
	
	return $cv_p_album;
	
}
public function getPphotosCount($uid = 0){
	$uid = $uid ? $uid : $this->USER['id'];
	$result = $this->db->query("select COUNT(*) as c from ".tbl_photos." where `userid`='{$uid}' and albumid = '0'");
	$row = $result->fetch_row();
	return $row[0];
	
}
// get active theme
public function getCurrentTheme($a = false,$th_id){

// theme id
//$th_id = $this->USER['theme'];

$sql = "select photo,body from ".tbl_themes." where `id` = '{$th_id}' limit 1";
$query = $this->db->query($sql);
$res = $query->fetch_array(MYSQLI_ASSOC);

return !$a ? $res['photo'] : $res['body'];

}

public function gDateYear($time){

if(date('j',$time) == date('j')){
// hour + minutes
$d = date('H:i',$time);
} else if(date('j',$time) == date('j')-1){
$d = $this->lang['yesterday'].' '.date('H:i',$time);

}else if (date('Y') != date('Y',$time)){
$d = $this->gMonthName(date("j F, Y", $time));
} else {
$d = $this->gMonthName(date("j F, H:i", $time));
}

return $d;

}
// added date format like 5 February 2015 
public function addedConv($time){

if(date('j',$time) == date('j')){
// hour + minutes
$d = date('H:i',$time);
} else if(date('j',$time) == date('j')-1){
$d = $this->lang['yesterday'].' '.date('H:i',$time);

}else if (date('Y') !== date('Y',$time)){
$d = $this->gMonthName(date("j F, Y", $time));
} else {
$d = $this->gMonthName(date("j F", $time));
}

return $d;

}
public function fullDate($time){
	return $this->gMonthName(date("j F, Y", $time));
}

public function time_elapsed( $time, $min = false, $numeric = false )
{
    

   $etime = time() - str_replace( '+0000', '', $time );

    if ($etime < 1)
    {
		return $this->lang['just_now'];
    }

    $a = array( 365 * 24 * 60 * 60  =>  $this->lang['year'],
                 30 * 24 * 60 * 60  =>  $this->lang['month'],
                  7 * 24 * 60 * 60  =>  $this->lang['week'],
                      24 * 60 * 60  =>  $this->lang['day'],
                           60 * 60  =>  $this->lang['hour'],
                                60  =>  $this->lang['minute'],
                                 1  =>  $this->lang['second']
                );
    $b = array( 365 * 24 * 60 * 60  =>  'year',
                 30 * 24 * 60 * 60  =>  'month',
                  7 * 24 * 60 * 60  =>  'week',
                      24 * 60 * 60  =>  'day',
                           60 * 60  =>  'hour',
                                60  =>  'minute',
                                 1  =>  'second'
                );

    $a_plural = array( $this->lang['year']   => $this->lang['years'],
                       $this->lang['month']  => $this->lang['months'],
                       $this->lang['week']   => $this->lang['weeks'],
                       $this->lang['day']    => $this->lang['days'],
                       $this->lang['hour']   => $this->lang['hours'],
                       $this->lang['minute'] => $this->lang['minutes'],
                       $this->lang['second'] => $this->lang['seconds']
                );

    if($numeric){

    foreach ($b as $secs => $str)
    {
        $d = $etime / $secs;
        if ($d >= 1)
        {
            $r = round($d);

             return [$r,$str];
        }
    }
	return 0;
}

    foreach ($a as $secs => $str)
    {
        $d = $etime / $secs;
        if ($d >= 1)
        {
            $r = round($d);
 
            if(!$min) return $r . ' ' . ($r > 1 ? $a_plural[$str] : $str) . ' '.$this->lang['ago'];
	    else return $r . $this->time_elapse_min($str);
        }
    }
}

// replace time elapsed month name. year ..
public function time_elapse_min($str){
	
	$r = array(
			   $this->lang['year'] => $this->lang['min_year_name'],
			   $this->lang['month'] => $this->lang['min_month_name'],
			   $this->lang['week'] => $this->lang['min_week_name'],
			   $this->lang['day'] => $this->lang['min_day_name'],
			   $this->lang['hour'] => $this->lang['min_hour_name'],
			   $this->lang['minute'] => $this->lang['min_minute_name'],
			   $this->lang['second'] => $this->lang['min_second_name'],

			   $this->lang['years'] => $this->lang['min_year_name'],
			   $this->lang['months'] => $this->lang['min_month_name'],
			   $this->lang['weeks'] => $this->lang['min_week_name'],
			   $this->lang['days'] => $this->lang['min_day_name'],
			   $this->lang['hours'] => $this->lang['min_hour_name'],
			   $this->lang['minutes'] => $this->lang['min_minute_name'],
			   $this->lang['seconds'] => $this->lang['min_second_name']);

return str_replace(array_keys($r), array_values($r),$str);
}
 
public function str_smilies_fpost($string,$w_html = false){
	 
	include('smilies_code.php');	 
	$smilies_path = $this->settings['SMILIES_PATH'];
	$stickers_path = $this->settings['STICKERS_PATH'];

	$string = $w_html ? $string : htmlspecialchars($string);
	$toSmall = 'style="vertical-align:middle;max-width:16px!important;max-height:16px!important;"';
	$minWidth = true;
	
	reset($smilies_arr);
	while (list($code, $bg) = each($smilies_arr))
		$string = str_replace($code, '<span class="emotics emoji-spritesheet-0 emoji-code-bg-kn_'.$bg.'">'.$code.'</span>',$string);
		///$string = str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$smilies_path.$url.'" alt="'.$code.'" title="'.$code.'" border="0">', $string);

	// y smilies
	reset($y_smilies_arr);
	while (list($code, $ic) = each($y_smilies_arr)) {
		// $code = preg_quote($code);
		$string = str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$smilies_path.'/y/'.$ic.'.gif"  border="0">', trim($string));
	}

	// stickers
	//=================================================================
	
	/* Hacker boy */
	reset($stickers['hacker-boy']);
	while (list($code, $bg) = each($stickers['hacker-boy']))
		$string = str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$this->theme_url.'/css/images/b/blank.gif" class="sticker hacker-boy sticker-spritesheet-0 sticker-code-bg-kn_'.$bg.'" alt="'.htmlspecialchars($bg).'" border="0">', $string);

	reset($stickers['cute-cat']);
	while (list($code, $bg) = each($stickers['cute-cat']))
		$string = str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$this->theme_url.'/css/images/b/blank.gif" class="sticker cute-cat sticker-spritesheet-0 sticker-code-bg-kn_'.$bg.'" alt="'.htmlspecialchars($bg).'" border="0">', $string);

	
	
	// =========================== end stickers

	return $string;
 }

// replace codes to smilies
public function str_smilies($string, $minWidth = false, $id = false, $bgcolor = false, $messenger = false, $text = false){


 

	include('smilies_code.php');
 
	
	// embera
	$embera = new \Embera\Embera();
	$embera = new \Embera\Formatter($embera);
	$show_embera = $this->USER['show_embera'] == 'yes' ? true : false;
	$embera_unique_id = 'emberalink'.mt_rand().mt_rand();
	
	if(!$minWidth || !$text)
	$embera->setTemplate('<div class="embera_embd">
	<a href="javascript:void(0);" rel="showembera" id="clickshow-'.$embera_unique_id.'" class="embera-a '. ($show_embera ? '__none' : '') .'">+ '.$this->lang['embera_show_attachment'].'</a>
	<a href="javascript:void(0);" rel="hideembera" id="clickhide-'.$embera_unique_id.'" class="embera-a '. (!$show_embera ? '__none' : '') .'">- '.$this->lang['embera_hide_attachment'].'</a>
	<div id="'.$embera_unique_id.'" class="embera_cnt_embd '. (!$show_embera ? '__none' : '') .' ">{html}</div></div>');
   /// $string = $minWidth ? '<div class="i_share_cnt"></div>' : $embera->transform($string);	///$embera->autoEmbed($string);
	$string = $minWidth || $text ? $string : $embera->transform($string);
	
	$string = htmlspecialchars($string);
	$smilies_path = $this->settings['SMILIES_PATH'];
	$stickers_path = $this->settings['STICKERS_PATH'];

	$toSmall = 'style="vertical-align:middle;max-width:16px!important;max-height:16px!important;"';
	reset($smilies_arr);
	
	
	while (list($code, $bg) = each($smilies_arr))
		$string = str_replace($code, '<span class="emotics emoji-spritesheet-0 emoji-code-bg-kn_'.$bg.'"></span>',$string);
		///$string = str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$smilies_path.$url.'" alt="'.$code.'" title="'.$code.'" border="0">', $string);

	// y smilies
	reset($y_smilies_arr);
	while (list($code, $ic) = each($y_smilies_arr)){
		// $code = preg_quote($code);
		$string = str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$smilies_path.'/y/'.$ic.'.gif" alt="'.htmlspecialchars($code).'" border="0">', trim($string));
		}

	// stickers
	//=================================================================
	reset($stickers['hacker-boy']);
	while (list($code, $bg) = each($stickers['hacker-boy']))
		$string =  $minWidth ? str_replace($code,'<span class="min_sticker_placeholder">sticker</span>',$string) : str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$this->theme_url.'/css/images/b/blank.gif" class="sticker hacker-boy sticker-spritesheet-0 sticker-code-bg-kn_'.$bg.'" alt="'.htmlspecialchars($bg).'" border="0">', $string);

	reset($stickers['cute-cat']);
	while (list($code, $bg) = each($stickers['cute-cat']))
		$string = $minWidth ? str_replace($code,'<span class="min_sticker_placeholder">sticker</span>',$string) : str_replace($code, '<img '.($minWidth ? $toSmall : '').' src="'.$this->theme_url.'/css/images/b/blank.gif" class="sticker cute-cat sticker-spritesheet-0 sticker-code-bg-kn_'.$bg.'" alt="'.htmlspecialchars($bg).'" border="0">', $string);

	// =========================== end stickers

	
	
	
	
	// [img]Attached Images[/img]
	if($minWidth){
	//$string = preg_replace_callback("/\[img\]((\s|.)+?)\[\/img\]/i", function($matches) { static $c = 0; $res = ''; if($c == 0) $res = "&nbsp;(".$this->lang['photo'].")"; $c++; return $res; }, $string);
	$string = preg_replace_callback("/\[img\]((\s|.)+?)\[\/img\]/i", function($matches) {
		
	static $c = 0; 
	$res = '';
	
	if($c <= 4) $res = "&nbsp;<div class=\"l_msg_is_photo\"><div class=\"msg_l_attachment\" style=\"background-image:url(/gCimage?img=".$matches[1]."&sz=small&msg=1);\"></div></div>"; 
	
	$c++;
	
	return $res; 
	
	}, $string);
	$string = str_replace('[divstart]', '', $string);
	$string = str_replace('[divend]', '', $string);
 
	
	
	$string =  preg_replace_callback("/\[share\]((\s|.)+?)\[\/share\]/i", function($id)  { 

			return '<div class="i_share_cnt"></div>';
		}, $string);
		
	} else {
		
	$cust_id = $id ? $id : '';
	//$string = preg_replace("/\[img\]((\s|.)+?)\[\/img\]/i", "<div class=\"mdialog_jb_item\"><img src=\"/gCimage?img=\\1&sz=small&from=attach&dm=70*70\" border=\"0\"></div>", $string);//gCimage?img=166&amp;album=1&amp;sz=thumb&amp;dm=70*70
	$string = preg_replace("/\[img\]((\s|.)+?)\[\/img\]/i", "<div class=\"mdialog_jb_item\"><a class=\"venobox vbox-item image-hover\" data-vbgall=\"gall".$cust_id."\" href=\"/gCimage?img=\\1&sz=large\"><img class=\"jb_attach_in_msg __default\" src=\"/gCimage?img=\\1&sz=small\" /></a></div>", $string);//preg_replace("/\[img\]((\s|.)+?)\[\/img\]/i", "<div class=\"mdialog_jb_item\"><i class=\"jb_attach_in_msg __default\" data-imageu=\"/gCimage?img=\\1&sz=small\" style=\"background-image:url(/gCimage?img=\\1&sz=small)\"></i></div>", $string);
	$string = str_replace('[divstart]', '<div class="mdialog_atch_items_container">', $string);
	$string = str_replace('[divend]', '</div>', $string);
    
 
	
 
	$string =  preg_replace_callback("/\[share\]((\s|.)+?)\[\/share\]/i", function($post_exp) use(&$messenger)  { 
	
			$post_deleted = 0;
			$p = array();
		if(strstr($post_exp[1],"-") !== false){
				
				
				$post = explode('-',$post_exp[1]);	
				$post_type = $post[0];
				$post_id = $post[1];
				
			
				if(strstr($post_type,"community") !== false){
					
					$post_type = explode('_',$post_type);
					
					$post_type = $post_type[1];
					
					
					switch ($post_type) {
						
					case 'post':
								$p = $this->db->query("select * from ".tbl_posts." where `id`='{$post_id}' and `community`='yes' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$clubid = $p['clubid'];
								$p['p_type'] = 'post';
								
								
					break;
					
					case 'photo':
					
								$p = $this->db->query("select * from ".tbl_communities_pics." where `id`='{$post_id}' and `file`='picture' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$p['clubid'] = $p['group_id'];
								$p['text'] = $p['info'];
								$p['p_type'] = 'photo';
								$p['community'] = 'yes';
								
					break;
					
					case 'video':
								$p = $this->db->query("select * from ".tbl_communities_pics." where `id`='{$post_id}' and `file`='video' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$p['clubid'] = $p['group_id'];
								$p['text'] = $p['info'];
								$p['p_type'] = 'video';
								$p['community'] = 'yes';
								
					break;
						
						
						
						
					}
					
					
				} else {
				
				
				switch($post_type){
					
					case 'market_product':
								$p = $this->db->query("select * from ".tbl_market." where `id`='{$post_id}' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$p['clubid'] = 0;
								$p['community'] = 'no';
								$p['p_type'] = 'market_product';
					break;
					
					
					case 'post':
								$p = $this->db->query("select * from ".tbl_posts." where `id`='{$post_id}' and `community`='no' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$p['clubid'] = 0;
								$p['community'] = 'no';
								$p['p_type'] = 'post';
								
								
								
					break;
					
					case 'photo':
					
								$p = $this->db->query("select * from ".tbl_photos." where `id`='{$post_id}' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$p['clubid'] = 0;
								$p['text'] = isset($p['info']) ? $p['info'] : '';
								$p['p_type'] = 'photo';
								$p['community'] = 'no';
								
					break;
					
					case 'video':
								$p = $this->db->query("select * from ".tbl_videos." where `id`='{$post_id}' limit 1");
								$p = $p->fetch_array(MYSQLI_ASSOC);
								if(!isset($p['id'])) $post_deleted = 1;
								$p['clubid'] = 0;
								$p['text'] = isset($p['description']) ? $p['description'] : '';
								$p['p_type'] = 'video';
								$p['community'] = 'no';
								
					break;
					
					
				}
				
				}
				
				
			//print_r($p);
				if(!$post_deleted){
				
				$p['original_post_community'] = $p['community'];
				$p['post_author_id'] = $p['userid'];
				$p['original_post_id'] = $p['id'];
				
				
				$this->template->assign([
				'this' => $this,
				'post_id' => $post_id,
				'post_type' => $post_type,
				'clubid' => $p['clubid'],
				'k_it_type' => $post_type,
				'r' => $p
				]);
 
				$content = $messenger ? $this->template->fetch($this->theme_dir.'/messenger/shared-content.html') : $this->template->fetch($this->theme_dir.'/feed/shared-cnt.html');
				return '<div class="msg_shared_cnt">'.$content.'</div>';
				} else {
					
					return '';
				}
				
		} else {
			
			return '';
		}
		}, $string);
	
	}
	
	// for reply comments
	$string = str_replace('[postReply]', '<span class="post_reply_cl">', $string);
	$string = str_replace('[/postReply]', '</span>', $string);
	$string = str_replace('[postreplyvirgula]', '<span class="post_reply_virgula">', $string);
	$string = str_replace('[/postreplyvirgula]', '</span>', $string);
	
	// if somehow the message contains placeholder, remove it
	$string = str_replace($this->lang['pm_placeholder'], '', $string);
	
	// tracks in comment
	$string = $this->trackInComment($string,$minWidth);

	// hashtags
	$string = $minWidth || $messenger ? $string : $this->gethashtags($string);
	
	// links
	$string = $minWidth ? $string : $this->makeClickableLinks($string);///preg_replace('!(((f|ht)tp(s)?://)[-a-zA-Zа-яА-Я()0-9@:%_+.~#?&;//=]+)!i', '<a target="_blank" href="/r?u=$1">$1</a>', $string);

	// voice clips
	$string = $minWidth ? 
	preg_replace("/\[voice-clip\]((\s|.)+?)\[\/voice-clip\]/i", $this->lang['voice_clip'] , $string) 
	: 
	preg_replace_callback("/\[voice-clip\]((\s|.)+?)\[\/voice-clip\]/i", function($src)  {
		$src = $src[1];
		return '<div class="sp-voice-clip-comment"><audio controls="" src="'.$src.'"></audio></div>';
		
	},$string);
	
	// mentioned users
	$string =  preg_replace_callback("/\[umention\]((\s|.)+?)\[\/umention\]/i", function($id)  { 
				$id = $id[1];
				$user = $this->db->query("select `id`,`profile_photo`,`gender`,`fullname` from ".tbl_users." where `id`='{$id}' limit 1");
				$user = $user->fetch_array(MYSQLI_ASSOC);
				return '<span class="kn_shortcutmenu"><div class="hookDataShortcut" data-shortcutmenudata=\'{"uid":"'.$user['id'].'","uname":"'.$user['fullname'].'","uphoto":"'.$user['profile_photo'].'","ugender":"'.$user['gender'].'","ulmen":{"photo":"1","guest":"0","block":"0","unblock":"0","unfriend":"0"}}\' id="hook_ShortcutMenu_'.$user['id'].'"></div><a class="umentionedcomm" hrefattr="true" href="/user/'.$id.'">'.$user['fullname'].'</a></span>';
		}, $string);
	
 
	
	// gif's
	if($minWidth){
	$string = preg_replace("/\[gif\]((\s|.)+?)\[\/gif\]/i", "<div class=\"msg-gif-txt\">GIF</div>", $string);
	} else {
	$string = preg_replace("/\[gif\]((\s|.)+?)\[\/gif\]/i", "<div class=\"msg_gif\">
	<A href=\"$1\" target=\"_blank\"><img class=\"msg0xf3gif\" src=\"$1\" /><div class=\"gif_bottom_d\">GIF</div></a></div>", $string);
	}
	
 
	/*if(!$minWidth && !$bgcolor && !$messenger)
		$string = $this->checkForTranslating($string);
		*/
		
		 ///if($messenger) $string = $string.'<div class="msg_translate"><div class="relative">aa</div></div>';
	
 
	
return trim($string);

}
 




public function checkForTranslating($string,$bez_text = false){
   
	return ($this->detectStringLang($string) != $this->_lang_prefix) && trim(!empty($string)) && $string != '&nbsp;' ? (!$bez_text ? $string : '').'<div><div class="div_str_translate"><a href="javascript:void(0);" onclick="translate_str(event,this);" class="a_str_translate"><span class="glyphicon glyphicon-text-background"></span><span class="__none" rel="str_text">'.$string.'</span>'.$this->lang['translate_this'].'</a><div class="__none tr_output"></div></div></div>' : (!$bez_text ? $string : '');
}
public function gethashtags($str)
{


    return preg_replace('/#([a-zA-Z0-9!_%]+)([^;\w]{1}|$)/', ' <a hrefattr="true" href="/tag/$1">#$1</a>$2', $str);//$hashtags;

}


private function makeClickableLinks($text)
{
	
$text = html_entity_decode($text);
$text = " ".$text;
$text= preg_replace("/(^|[\n ])([\w]*?)([\w]*?:\/\/[\w]+[^ \,\"\n\r\t<]*)/is", "$1$2<a target=\"_blank\" href=\"/r?u=$3\" >$3</a>", $text);  
$text= preg_replace("/(^|[\n ])([\w]*?)((www|wap)\.[^ \,\"\t\n\r<]*)/is", "$1$2<a target=\"_blank\" href=\"/r?u=http://$3\" >$3</a>", $text);
$text= preg_replace("/(^|[\n ])([\w]*?)((ftp)\.[^ \,\"\t\n\r<]*)/is", "$1$2<a target=\"_blank\" href=\"$4://$3\" >$3</a>", $text);  
$text= preg_replace("/(^|[\n ])([a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+)+)/i", "$1<a target=\"_blank\" href=\"mailto:$2@$3\">$2@$3</a>", $text);  
$text= preg_replace("/(^|[\n ])(mailto:[a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+)+)/i", "$1<a target=\"_blank\" href=\"/r?u=$2@$3\">$2@$3</a>", $text);  
$text= preg_replace("/(^|[\n ])(skype:[^ \,\"\t\n\r<]*)/i", "$1<a target=\"_blank\" href=\"/r?u=$2\">$2</a>", $text);  
return $text;
//return preg_replace(array('/(?i)\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))/', '/(^|[^a-z0-9_])@([a-z0-9_]+)/i', '/(^|[^a-z0-9_])#([a-z0-9_]+)/i'), array('<a href="$1" target="_blank">$1</a>', '$1<a href="">@$2</a>', '$1<a href="index.php?hashtag=$2">#$2</a>'), $str);

}
// tracks in comments
public function trackInComment($original,$minWidth = false){
		$tracks_markup = '';

	$original = preg_replace_callback("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", function($id) use (&$tracks_markup) { 

		// select info for respective song
		$q = $this->db->query("select id,artist,title,album,cover,path as filename from ".tbl_songs." where `id`='{$id[1]}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);

			$tracks_markup .= sprintf('<div class="track __media-status songpsh"><div class="track_hld soh-s"><span id="pm_sec_outsite_track_%s" class="track_play" data-track-inf=\'{"track":"%s","cover":"%s","artist":"%s","songname":"%s","albumname":"%s"}\' onclick="nobilMusicPlayOutsideTrack(this,event)"></span><div class="track_cnt textWrap"><span class="track_song ellip"><A onclick="nobilMusicSearch(\'%s\');">%s</a> - <A onclick="nobilMusicSearch(\'%s\');">%s</a> <span class="foh-s track_info"> %s <a onclick="nobilMusicSearch(\'%s\');" class="track_album">%s</a></span></span></div></div></div>'
			,$r['id'], 
			$r['filename'], 
			$r['cover'], 
			urlencode($r['artist']), 
			urlencode($r['title']), 
			urlencode($r['album']), 
			urlencode($r['artist']), 
			$r['artist'], 
			urlencode($r['title']), 
			$r['title'], 
			$this->lang['from'], 
			urlencode($r['album']), 
			$r['album']);


			return '';
		}, $original);


return $minWidth && $tracks_markup ? $original. '<div class="ic-msg-tracks"></div>' : ($tracks_markup ? $original . '<div class="commentsWidgetTracks">'.$tracks_markup.'</div>' : $original);
}

// construct html for statuses
 public function strPosts($string){
	 

	 
	 
	$i = $this->USER['id'];
	$link_markup = $taggedUsers = array();
	$place = $poll = $bg = '';
	$pphotos = $ssongs = $vvideos = 0;

	// check for background
    $string = preg_replace_callback("/\[postBg\]((\s|.)+?)\[\/postBg\]/i", function($id) use (&$bg){
		$bg = 1;
		return '';
	}, $string);
	
	

	// check for poll
    $string = preg_replace_callback("/\[poll\]((\s|.)+?)\[\/poll\]/i", function($id) use (&$poll){
		$poll = 1;
		return '';
	}, $string);
	
	// create photos
    $string = preg_replace_callback("/\[postPhoto\]((\s|.)+?)\[\/postPhoto\]/i", function($id) use (&$pphotos){
		$pphotos++;
		return '';//"<div class=\"pstatus_photos_sh\"><img src=\"/getPhoto?p={$id[1]}&sz=small\" /></div>";
	}, $string);
	
	// create videos
    $string = preg_replace_callback("/\[postVideo\]((\s|.)+?)\[\/postVideo\]/i", function($id) use (&$vvideos){
		$vvideos++;
		return '';// "<div class=\"pstatus_photos_sh\"><img src=\"/getPhoto?p={$id[1]}&sz=small\" /></div>";
	}, $string);

	//create tracks
    //$string = preg_replace("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", "<div class=\"pstatus_song_sh\"><img src=\"/getPhoto?p=\\1&sz=small\" /></div>", $string);
	$string = preg_replace_callback("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", function($id) use (&$ssongs) { 

	// select info for respective song
	$q = $this->db->query("select id,artist,title,album,cover,path as filename from ".tbl_songs." where `id`='$id[1]' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$song_markup = sprintf('<div class="track __media-status songpsh"><div class="track_hld soh-s"><span id="pm_sec_outsite_track_%s" class="track_play" data-track-inf=\'{"track":"%s","cover":"%s","artist":"%s","songname":"%s","albumname":"%s"}\' onclick="nobilMusicPlayOutsideTrack(this,event)"></span><div class="track_cnt textWrap"><span class="track_song ellip"><A onclick="nobilMusicSearch(\'%s\');">%s</a> - <A onclick="nobilMusicSearch(\'%s\');">%s</a> <span class="foh-s track_info"> %s <a onclick="nobilMusicSearch(\'%s\');" class="track_album">%s</a></span></span></div></div></div>'
	,$r['id'],$r['filename'],$r['cover'],$r['artist'],$r['title'],$r['album'],$r['artist'],$r['artist'],$r['title'],$r['title'],$this->lang['from'],$r['album'],$r['album']);
	///$song_markup = '<div class="pstatus_song_sh">'.$r['artist'].' - '.$r['title'].'</div>';
	///static $c = 0; $res = ''; if($c == 0) $res = "&nbsp;(".$this->lang['photo'].")"; $c++; return $res;

	$ssongs++; 
	return $ssongs > 4 ? '' : $song_markup;
	}, $string);


	// create users
    $string = preg_replace_callback("/\[postTag\]((\s|.)+?)\[\/postTag\]/i", function($id)  use (&$taggedUsers) {

		// select info about user
		//$q = $this->db->query("select id,fullname,gender,profile_photo as photo from ".tbl_users." where `id`='$id[1]' limit 1");
		//$r = $q->fetch_array(MYSQLI_ASSOC);
		///static $c = 0;
		//$userTagged = sprintf(' <span class="f12">%s</span> <span class="shortcut-wrap"><a class="o f12" href="/profile?q=%s" hrefattr="true">%s</a></span>',($c === 0 ? $this->lang['with'] : ''),$r['id'],$r['fullname']);
		///$c++;
		$taggedUsers[] = $id[1]; 
		return'';// $userTagged;


	}, $string);

		
	// create links
	$string  = preg_replace_callback("/\[postLink\]((\s|.)+?)\[\/postLink\]/i", function($id) use (&$link_markup)  {

		// select info about the link
		$q = $this->db->query("select * from ".tbl_slinks." where `id`='$id[1]' order by id desc limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		$d = json_decode($r['data'],true);

		$is_video = isset($d['type']) ? ($d['type'] == 'video' ? '<div class="preview-link-has-video"><div class="preview-v-play-ic"></div></div>' : '') : '';
		$no_image = isset($d['image']) ? ($d['image'] != '' ? '' : '__noimage') : '__noimage';
		$is_image = isset($d['image']) ? ($d['image'] != '' ? '<img src="'.$d['image'].'">' : '') : '';
		$is_title = isset($d['title']) ? (!empty($d['title']) ? $d['title'] : '') : '';
		$is_descr = isset($d['description']) ? (!empty($d['description']) ? $d['description'] : '') : '';
		$is_url = isset($d['url']) ? (!empty($d['url']) ? $d['url'] : '') : '';
		$is_site_name = isset($d['site_name']) ? (!empty($d['site_name']) ? $d['site_name'] : '') : '';
		$is_only_img = isset($d['type']) ? ($d['type'] == 'image' ? $d['image'] : '') : '';
		$is_only_video = isset($d['type']) ? ($d['type'] == 'video' ? $d['image'] : '') : '';
		if($is_only_img){
			/*$link_markup = sprintf('<div class="stpreview-only-image">
			<img class="stpost_url_only_image" onerror="this.src=\'/css/images/BrailleFilled-64.png\';" src="%s">
			</div>',$is_only_img);
			*/

			$link_markup['images'][] = $is_only_img;
			
		}else if ($is_only_video){
			/*
			$link_markup = sprintf('<div class="stpos_video"><div class="preview-link-has-video __onlyvid"><div class="preview-v-play-ic"></div></div>
			<div class="video-prv-cover" style="background-image:url(%s);"></div><div class="video-title-c stpost">%s</div></div>'
			,$is_only_video,$is_title);

		*/

			$link_markup['videos'][] = $is_only_video;

		}else{
		/*$link_markup = sprintf( '<div class="post_url_preview soh-s" id="u-%s">
									<div id="lk_prev_cnt">
									<div class="link-preview-image-thumb %s">
									%s %s</div>
									<div class="preview-info-cnt">
									<div class="link-preview-title ellip textWrap">%s</div>
									<div class="link-preview-description textWrap">%s</div>
									<div class="link-preview-site-name textWrap"><a href="/r?u=%s">%s</a></div>
									</div>
									</div>
									</div>
									',$r['id'],$no_image,$is_video,$is_image,$is_title,$is_descr,$is_url,$is_site_name);
		*/

			$link_markup['urls'][] = 'url';
		}
	

		return '';
	}, $string);
	$attachedLink = count($link_markup) ? '<div class="links_mk_bt">' : '';

	if($poll){
		
		$attachedLink .='<div title="Poll" rel="tipsy" class="bt_lks_st"><span class="status_poll_nt">Poll</span><i class="ic icon-stars-count icpoll"></i></div>';
		
	}
	
	if( isset($link_markup['images']) || $pphotos > 0 ){
		$lk_img_count = isset($link_markup['images']) ? count($link_markup['images']) : 0;
		$attachedLink .= '<div class="bt_lks_st"><i class="ic ic-image-st"></i>'.($lk_img_count + $pphotos).'</div>';
		
	}
	if( isset($link_markup['videos']) || $vvideos > 0 ){
		$lk_vd_count = isset($link_markup['videos']) ? count($link_markup['videos']) : 0;
		$attachedLink .= (isset($link_markup['images']) || $pphotos > 0 ? '' : '').'<div class="bt_lks_st"><i class="ic ic-vd-st"></i>'.($lk_vd_count + $vvideos).'</div>';
		
	}
	if( isset($link_markup['urls']) || $pphotos || $vvideos ){
		$lk_url_count = isset($link_markup['urls']) ? count($link_markup['urls']) : 0;
		$attachedLink .= $lk_url_count > 0 ? ( isset($link_markup['images']) || isset($link_markup['videos']) || $pphotos || $vvideos ? '' : '').'<div class="bt_lks_st"><i class="ic ic-url-st"></i>'.($lk_url_count).'</div>' : '';
		
	}
	$attachedLink .= count($link_markup) ? '</div>' : '';

	// get people tags
	$userTagged = '';
	if(sizeof($taggedUsers)){

		$tg_c = 0;
		foreach($taggedUsers as $uid):
		
		$q = $this->db->query("select id,fullname,gender,profile_photo as photo from ".tbl_users." where `id`='$uid' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		static $c = 0;

		$userTagged .= sprintf(' <span class="f12">%s <span '.(sizeof($taggedUsers) > 2 && $c > 1 ? 'style="display:none;" data-aria-hidden="true"' : '').' data-udatacont=\'{"uid":"'.$r['id'].'","ugender":"'.$r['gender'].'","uname":"'.$r['fullname'].'","uphoto":"'.$r['photo'].'"}\' class="post-tagged-friends" id="'.$r['id'].'"><a class="o f12" href="/user/%s" hrefattr="true">%s</a></span>%s %s</span>'
		,($c === 0 ? $this->lang['with'] : ''),$r['id'],$r['fullname'],(sizeof($taggedUsers) == 2 && $c == 0 ? '&nbsp;'.$this->lang['and'] : (sizeof($taggedUsers) > 2 && $c == 0 ? ',' : '') ), ( sizeof($taggedUsers) > 2 && $c == 1 ? '<span class="il all-hidden-tagged-people">'.str_replace('%friends', ((sizeof($taggedUsers) - 2) > 1 ? $this->lang['friends'] : $this->lang['friend']), str_replace('%c', sizeof($taggedUsers)-2, $this->lang['and_other_friends'])).'</span>' : '') );
		$c++;
		
		endforeach;
		
		
	}
	
	// create places
	$string  = preg_replace_callback("/\[postPlace\]((\s|.)+?)\[\/postPlace\]/i", function($id) use (&$place) {

	// load data from database
	$q = $this->db->query("select * from ".tbl_checkin." where `id`='{$id[1]}' order by added desc limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);

	$jdata = json_decode($r['data'],true);
	
	$place_name = isset($jdata['pl-n']) && $jdata['pl-n'] != '' ? $jdata['pl-n'] : '';
    $place_lt = $jdata['pl-lt'];
	$place_ln = $jdata['pl-ln'];
	
    $hookData = '<div class="hookData _0"><!--'.$r['data'].'--></div>';
	$data = ' <span class="post_jb_tip_map" id="'.$r['id'].'">'.$hookData.'<span class="f12">'.($jdata['pl-type'] == 'vilage' || $jdata['pl-type'] == 'town' || $jdata['pl-type'] == 'city' || $jdata['pl-type'] == 'country' ? $this->lang['in'] : $this->lang['at']).' <a class="o" href="javascript:void(0);" onclick="searchPlaceInGroups(this,\''.$place_ln.'\',\''.$place_lt.'\');">'.$place_name.'</a></span></span>';
	$place = $data;
	return '';
	},$string);
	
	$string = $this->str_smilies_fpost($string,1);
	$bg_ic = $bg ? '<div class="p_covers_control_anim"><div class="p_covers_control_ic"></div></div>' : '';
	$media_i = $bg_ic.$userTagged.$place.$attachedLink;
	$media = $userTagged || $place || $attachedLink || $bg ? '<div class="status_media-b">'.$media_i.'</div>':'';

	return $string.$media;
}

// replace month name in php datetime
public function gMonthName($str){


$a = array('January', 'February', 'March', 'Aprill', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December');
$b = array($this->lang['january'], $this->lang['february'], $this->lang['march'],$this->lang['aprill'],$this->lang['may'],$this->lang['june'],$this->lang['july'],$this->lang['august'],$this->lang['september'],$this->lang['octomber'],$this->lang['november'],$this->lang['december']);
$mName = str_ireplace($a, $b, $str);

return $mName;
}
// replace short month name in php datetime
public function gMinMonthName($str){


$a = array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
$b = array($this->lang['Jan'], $this->lang['Feb'], $this->lang['Mar'],$this->lang['Apr'],$this->lang['May'],$this->lang['Jun'],$this->lang['Jul'],$this->lang['Aug'],$this->lang['Sep'],$this->lang['Oct'],$this->lang['Nov'],$this->lang['Dec']);
$mName = str_ireplace($a, $b, $str);

return $mName;
}
// check friend status
public function friendStatus($id){
	
	$i = $this->USER['id'];
	$q = $this->db->query("select status from ".tbl_friends." where (`userid`='{$i}' and `friendid`='{$id}' OR `userid`='{$id}' and `friendid`='{$i}') limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	return !isset($r['status']) ? 'none' : $r['status'];
	
}

// check if the user is my friend
public function isfriend($id){

$i = $this->USER['id'];
$count = count($this->query_select("select `id` from ".tbl_friends." where `userid`='{$i}' and `friendid`='{$id}' and status='confirmed' limit 1"));


return $count ? true : false;

}

public function is_html($string)
{
  return preg_match("/<[^<]+>/",$string,$m) != 0;
}

// by respective day generate ['yesterday', 'today', 'tomorrow']
public function ieriaz($day){

$r = '[_UNDEFINED_]';
$today = date('d');

if($today == $day)
$r = $this->lang['Today'];
else if($today+1 == $day)
$r = $this->lang['Tomorrow'];
else if($today-1 == $day)
$r = $this->lang['Yesterday'];

return $r;


}

// last online friends convert timestamp to e.g -> September 27 2015 at 19:04
public function friendsLastOnline($time){

if(date('d',$time) == date('d')){
// hour + minutes
$d = $this->lang['today'].' '.$this->lang['at'].' '.date('H:i',$time);
} else if(date('d',$time) == date('d')-1){
$d = $this->lang['yesterday'].' '.$this->lang['at'].' '.date('H:i',$time);
} else if(date('Y',$time) != date('Y')){
$d = $this->gMonthName(date("F d Y, H:i", $time));
} else {
$d = $this->gMonthName(date("F d, H:i", $time));
}

return $d;

}
// date, hour, month
public function feedConvDate($time,$today = false){

if(date('d',$time) == date('d')){
// hour + minutes
$d = $today ? $this->lang['today'].' '.date('H:i',$time) : date('H:i',$time);
} else if(date('d',$time) == date('d')-1){
$d = $this->lang['yesterday'].' '.date('H:i',$time);
} else {
$d = $this->gMonthName(date("d F, H:i", $time));
}

return $d;

}

// get app genre
public function getAppGenre($genre_id){
	
	return isset($this->settings['APPS_GENRES'][$genre_id-1]) ? $this->settings['APPS_GENRES'][$genre_id-1] : $this->settings['APPS_GENRES'][0];
	
	
}

// pagination plugin
# return array
# offset 0 => Query result
# offset 1 => Pagination Markup
public function pagination($limit = 10,$hrefattr = true, $target,$sql_query,$result_count){

	// How many adjacent pages should be shown on each side?
	$adjacents = 3;
	
	/* 
	   First get total number of rows in data table. 
	   If you have a WHERE clause in your query, make sure you mirror it here.
	*/

	$total_pages = $result_count;
	
	/* Setup vars for query. */
	$targetpage = $target; 	//your file name  (the name of this file)
	$hrefattr = $hrefattr ? 'hrefattr="true"' : '';
	$pages = ceil($total_pages / $limit);
	$page = min($pages, filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT, array(
        'options' => array(
            'default'   => 1,
            'min_range' => 1,
        ),
    )));
	if($page) 
		$start = ($page - 1) * $limit; 			//first item to display on this page
	else
		$start = 0;								//if no page var is given, set start to 0
	
	/* Get data. */
	$sql = $sql_query." LIMIT {$start}, {$limit}";
	$query = $this->query_select($sql);
	
	/* Setup page vars for display. */
	if ($page == 0) $page = 1;					//if no page var is given, default to 1.
	$prev = $page - 1;							//previous page is page - 1
	$next = $page + 1;							//next page is page + 1
	$lastpage = ceil($total_pages/$limit);		//lastpage is = total pages / items per page, rounded up.
	$lpm1 = $lastpage - 1;						//last page minus 1
	
	/* 
		Now we apply our rules and draw the pagination object. 
		We're actually saving the code to a variable in case we want to draw it more than once.
	*/
	$pagination = "";
	if($lastpage > 1)
	{	
		$pagination .= "<div class=\"pagination\">";
		//previous button
		if ($page > 1) 
			$pagination.= sprintf("<a title=\"".$this->lang['previous_page']."\" $hrefattr href=\"$targetpage\">&#x276e;</a>",$prev);
		else
			$pagination.= "<span class=\"disabled\">&#x276e;</span>";	
		
		//pages	
		if ($lastpage < 7 + ($adjacents * 2))	//not enough pages to bother breaking it up
		{	
			for ($counter = 1; $counter <= $lastpage; $counter++)
			{
				if ($counter == $page)
					$pagination.= sprintf("<span class=\"current\">%s</span>",$counter);
				else
					$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">%s</a>",$counter,$counter);					
			}
		}
		elseif($lastpage > 5 + ($adjacents * 2))	//enough pages to hide some
		{
			//close to beginning; only hide later pages
			if($page < 1 + ($adjacents * 2))		
			{
				for ($counter = 1; $counter < 4 + ($adjacents * 2); $counter++)
				{
					if ($counter == $page)
						$pagination.= sprintf("<span class=\"current\">%s</span>",$counter);
					else
						$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">%s</a>",$counter,$counter);					
				}
				$pagination.= "...";
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">$lpm1</a>",$lpm1);
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">$lastpage</a>",$lastpage);		
			}
			//in middle; hide some front and some back
			elseif($lastpage - ($adjacents * 2) > $page && $page > ($adjacents * 2))
			{
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">1</a>",1);
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">2</a>",2);
				$pagination.= "...";
				for ($counter = $page - $adjacents; $counter <= $page + $adjacents; $counter++)
				{
					if ($counter == $page)
						$pagination.= "<span class=\"current\">$counter</span>";
					else
						$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">$counter</a>",$counter);					
				}
				$pagination.= "...";
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">$lpm1</a>",$lpm1);
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">$lastpage</a>",$lastpage);		
			}
			//close to end; only hide early pages
			else
			{
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">1</a>",1);
				$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">2</a>",2);
				$pagination.= "...";
				for ($counter = $lastpage - (2 + ($adjacents * 2)); $counter <= $lastpage; $counter++)
				{
					if ($counter == $page)
						$pagination.= "<span class=\"current\">$counter</span>";
					else
						$pagination.= sprintf("<a $hrefattr href=\"$targetpage\">$counter</a>",$counter);					
				}
			}
		}
		
		//next button
		if ($page < $counter - 1) 
			$pagination.= sprintf("<a title=\"".$this->lang['next_page']."\" $hrefattr href=\"$targetpage\">&#x276f;</a>",$next);
		else
			$pagination.= "<span class=\"disabled\">&#x276f;</span>";
		$pagination.= "</div>\n";		
	}
	
	return [$query,$pagination];
	}

	// generate album name
	public function getAlbumName($albumname){
	if ($albumname == 'LANG_ALBUM_VIDEOS')
$r = $this->lang['ALB_NAME_VIDEOS'];
else if ($albumname == 'LANG_ALBUM_MISCELLANEOUS')
$r = $this->lang['ALB_NAME_MISCELLANEOUS'];
else
$r = $albumname;

return $r;
}
	
	// validate email in reg for
	public function regFormValidateMail(){
		
		$_email = isset($_POST['rm']) ? $this->test_input($_POST['rm']) : '';
		$r = 0;
		if (!filter_var($_email, FILTER_VALIDATE_EMAIL) || empty($_email))
		{
			
			$r = '_INVALID_TYPE';
			
		} else if ( count($this->query_select("select `id` from ".tbl_users." where `email`='{$_email}' limit 1")) ){
		
			$r = '_EMAIL_EXIST';
		
		} else { 
		
			$r = '_SUCCESS';
		
		}
		
		echo $r;
	}
 
// check if the photo is .gif
public function is_gif($pid,$community=false){
	
	$pid = (int) $this->test_input($pid);
	$R = '';

if($pid > 0)	{
$q_gif = $community ? $this->db->query("select `type` from ".tbl_communities_pics." where `id`='{$pid}' limit 1") : $this->db->query("select `extension` from ".tbl_photos." where `id`='{$pid}' limit 1");
$r_gif = $q_gif->fetch_array(MYSQLI_ASSOC);
$R = $community ? $r_gif['type'] : (isset($r_gif['extension']) ? $r_gif['extension'] : '');
}

return strtolower($R) === 'gif' ? true : false;
}

// get poll markup
public function getPollMarkup($pid){
	

	$ans = '';
	
	// get data for respective sondage
	$q = $this->db->query("select * from ".tbl_poll_questions." where `id`='{$pid}' limit 1");
	$q = $q->fetch_array(MYSQLI_ASSOC);
	$q = $q['question'];

	
	// get options for respective poll
	$a = $this->query_select("select * from ".tbl_poll_options." where `question_id`='{$pid}'");
	
	// check if the user has already voted for this sondage
	$cq = count($this->query_select("select id from ".tbl_poll_answers." where `question_id`='{$pid}' and `user_id`='{$this->userid}' limit 1"));
	
	if($cq){
	$pll_data = json_decode($this->get_all_answers($pid,1));

	$poll_success = $pll_data->success;
	$total = $pll_data->total;

	$ans = "<div class='result'>";
	$width = $acount = "";
					if($poll_success == 1){
						
						
					foreach($pll_data->opt as $id => $label):
							if(!isset($pll_data->details->$id)){
								$width  = 0;
								$acount = 0;
							}else{
								$acount = $pll_data->details->$id;
								$width = round((intval($acount)/intval($total)) * 100); 
							}
							$votes = $acount > 0 ? '<a href="javascript:;" id="pollmiv|'.$pid.'" onclick="pollGetTotalVotes(event,'.$id.');">('.$acount.' '.($acount == 1 ? $this->lang['vote'] : $this->lang['votes']).')</a>' : '('.$acount.' votes)';
							$ans .= '<div class="bar-holder">'.$label.' '.$votes.'<div class="perc"></div><div class="bc"><div class="bar" style="width:'.$width.'%">'.$width.'% &nbsp;</div></div></div>';
					endforeach;
						$ans .= '</div>';
						$ans .= '<p><a href="javascript:;" id="pollmiv|'.$pid.'" onclick="pollGetTotalVotes(event);" class="total">'.$this->lang['total_votes'].' : <b>'.$total.'</b></a>';

					}
					
	} else {

	foreach($a as $o)
	$ans .= '<div class="poll_label_i" onclick="ga(this).find(\'input\').prop(\'checked\', true);"><input class="rad" type="radio" name="poll_options" id="'.$o['id'].'" value="'.$o['id'].'"/><label for="'.$o['id'].'">'.$o['option'].'</label></div>';

	}
	$button = !$cq ? '<div class="sub"><a href="javascript:;" onclick="PollVote(event);" class="flat_button secondary">'.$this->lang['Vote'].'</a></div>' : '';
	$poll = '<div class="poll-container" id="mzv|'.$pid.'">
			<div class="poll"><div class="question">'.$q.'<div class="options">'.$ans.'</div></div></div>
			'.$button.'
			</div>';

return $poll;
	
}


// message
public function message($type,$msg){
	
	
$this->template->assign(['this' => $this, 'msg' => $msg, 'type' => $type]);
$this->template->display($this->theme_dir."/body/message.html");
	
}

// check for private profile 
public function is_private($user_id){
	
	$is_private = count($this->query_select("select id from ".tbl_friends." where `id`='{$user_id}' and `private`='yes'"));
	
	return $is_private;
	
	
}

// get ad markup
public function getAdMarkup($page){
	
	$ad_m = $this->db->query("select `markup` from ".tbl_ads." where `page`='{$page}' limit 1");
	$ad_m = $ad_m->fetch_array(MYSQLI_ASSOC);
	$ad_m = isset($ad_m['markup']) ? htmlspecialchars_decode($ad_m['markup']) : '';
	
	return $ad_m;
	
}

// update user language
public function updateUserLanguage() {
	
	$lang = isset($_POST['lang']) ? $this->test_input($_POST['lang']) : 'en';
	$r = 0;
	if($this->USER) {
		
		if($this->query_update("update ".tbl_users." set `language`='{$lang}' where `id`=".$this->USER['id']))
		$r = 1;
		
	} else {
		if(setcookie("global_lang", $lang, 0x7fffffff, "/"))
			$r = 1;
	}
	
	echo $r;
}

// translate languages
public function translate_languages($lang){
	
	switch($lang){
		
		case 'en':
		$lang = $this->lang['English'];
		break;
		
		case 'ru':
		$lang = $this->lang['Russian'];
		break;
		
		
	}
	return $lang;
	
}


// get site languages
public function getSiteLangList(){
	
	// select all languages files 
	$langs = array();
	$path = __ROOT__."/inc/lang/";
	$lang_files = glob($path."*.php");
	
	foreach($lang_files as $l_file):
	$lang_b = str_replace(".php","",str_replace($path,"",$l_file));
	$langs[] = array("lang_a" => $lang_b, "lang_str" => $this->translate_languages($lang_b));	
	endforeach;
	
	echo json_encode($langs);
	
}

// get content for terms/about/policy
public function tpaPopup(){
	
	$page = isset($_POST['a']) ? $this->test_input($_POST['a']) : '';
	$a = array();
	$title = '';
	if($page){
		
		$q = $this->db->query("select `markup` from ".tbl_terms." where `page`='{$page}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$r = isset($r['markup']) ?  htmlspecialchars_decode($r['markup']) : '';
		
		switch($page){
			 
			case 'terms':
			$title = $this->lang['terms_and_condition'];
			break;
			
			case 'policy':
			$title = $this->lang['privacy_policy'];
			break;
			
			case 'about':
			$title = $this->lang['About_Us'];
			break;
		}
	
		$a['title'] = $title;
		$a['cnt'] = $r;
	}
	
	echo json_encode($a);
}

// report
public function reportThis()
{	
	$item_id = isset($_POST['item_id']) ? (int) $this->test_input($_POST['item_id']) : 0;
	$item_type = isset($_POST['item_type']) ? $this->test_input($_POST['item_type']) : 0;
	$reason = isset($_POST['reason']) ? $this->test_input($_POST['reason']) : 'not_specified';
	$r = 0;
	$uid = $this->USER['id'];
	$time = time();

	if($item_id and $item_type){
		
		if($this->query_insert("insert into ".tbl_report." set `type`='{$item_type}',`type_id`='{$item_id}', `report_by`='{$uid}',`added`='{$time}',`reason`='{$reason}'"))
			$r = 1;
		
	}
	echo $r;
}

// check for item if is bookmarked by the respective user
public function checkInBookmarks($itemid,$categ){
	$i = $this->USER['id'];
	return count($this->query_select("select id from ".tbl_bookmarks." where `uid`='{$i}' and `itemid`='{$itemid}' and `categ`='{$categ}' limit 1"));
}

// get bookmark id
public function getBookmarkId($itemid, $categ){

	$i = $this->USER['id'];	
	$q = $this->db->query("select `id` from ".tbl_bookmarks." where `itemid`='{$itemid}' and `categ`='{$categ}' and `uid`='{$i}' limit 1");
	$b_id = $q->fetch_array(MYSQLI_ASSOC);
	$b_id = isset($b_id['id']) ? $b_id['id'] : '';
	
	return $b_id;
}

// get user gifts
public function getUserGifts($id) {
	$expires_time = strtotime('-'.$this->settings['GIFT_EXPIRES_TIME']);
	// select gifts for respective user
	return $this->query_select("select u.fullname,u.id as uid,g.*, ug.gift_id, ug.private, ug.anonym from ".tbl_ugifts." ug 
	left join ".tbl_gifts." g ON g.id = ug.gift_id
	left join ".tbl_users." u ON u.id = ug.fromuser
	where ug.userid='{$id}' and ug.added >= '{$expires_time}' group by ug.gift_id
	");
	
}

// get gifts markup
public function getGiftsMarkup($uid){
	
$this->template->assign(['this' => $this, 'q' => $this->getUserGifts($uid)]);
$this->template->display($this->theme_dir."/profile/gifts.html");
}

// check if the user allow to comment their photos
public function allowCommentPhoto($userid){
	$a = '';
	if($userid === $this->USER['id']) $a = true;
	else {
	
	$friend = $this->isfriend($userid);
	
	// check settings
	$q = $this->db->query("select `allow_comment_myphotos` as allowcomm from ".tbl_users." where `id`='{$userid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$a = $r['allowcomm'];
	
	$a = !$friend && $a === 'friends' ? false : true;
	}
	return $a;
}
// check if the user allow to comment their photos
public function allowSendPm($userid){
	
	$friend = $this->isfriend($userid);
	
	// check settings
	$q = $this->db->query("select `allow_send_pm` as allowsendpm from ".tbl_users." where `id`='{$userid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$a = $r['allowsendpm'];
	
	return !$friend && $a === 'friends' ? false : true;
}

// send private message
public function sendPM($msg,$uid,$shared = false,$nobg = false){
	$a = 0;
	$pm = $this->im_messenger();

	if($pm->sendMessage($msg,$uid,0,$shared,$nobg)) $a = 1;
	return $a;
}

// forgot password
public function forgotPassword() {
	
$this->template->assign(['this' => $this]);
$this->template->display($this->theme_dir."/index/forgot.html");
}

// recover pass by email
public function forgotPassByMail(){
	
	$email = isset($_POST['mail']) ? $this->test_input($_POST['mail']) : '';
	$r = 0;
	
	if($email) {
		
		// check if email exist
		$q = $this->db->query("select * from ".tbl_users." where `email`='{$email}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		if(!$r['id']) $r = 2;
		else {

			
		$link = $this->settings['HOST'].'/forgot?cmd=changepass&hash='.$r['password'].'&email='.$email;	
		
	

$to      = $email;
$subject = $this->settings['SITENAME'].'. '.$this->lang['Password_recovery_mail_title'];
$message = '<img style="background-color:#5D7894;" src="'.$this->settings['HOST'].'/css/images/logo_new/logo-v2-white.png" /><br/><br/>'.str_replace('%link',$link,str_replace('%sitename', $this->settings['SITENAME'], str_replace('%username', $r['fullname'], $this->lang['Password_recovery_mail_descr'])));
$headers = "From: noreply@social-plus.org\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";


if(!mail($to, $subject, $message, $headers)) {
$r = 3;
} else {
    echo json_encode(["fullname" => $r['fullname'], "email" => $email]);
}




					
			
			
			
		}
	}
	echo $r;
	
}

// recover password
public function RecoverThePassword() {
	
	$code = isset($_GET['code']) ? $this->test_input($_GET['code']) : '';
	$email = isset($_GET['email']) ? $this->test_input($_GET['email']) : '';

	$last_pass = ''; 
	$r = array("password" => "x1", "fullname" => "", "real_pass" => "x1");
	if($code && $email) {
		
		// query
		$q = $this->db->query("select `real_pass`,`password`,`fullname`,`secret_code` from ".tbl_users." where `secret_code`='{$code}' and `email`='{$email}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		$last_pass = $r['real_pass'];
	}
	
	$this->template->assign(['this' => $this, 'code' => $code, 'email' => $email, 'r' => $r, 'last_pass' => $last_pass]);
	$this->template->display($this->theme_dir."/index/changePass.html");
}


// forgot set new pass
public function forgotSetNewPass(){
	
	$update = false;
	
	// post passwords
	$email = isset($_POST['email']) ? $_POST['email'] : '';
	$old_pass = isset($_POST['rps']) ? b_decode($_POST['rps']) : '';
	$code = isset($_POST['code']) ? $_POST['code'] : '';
	$new_pass = isset($_POST['newpass']) ? $_POST['newpass'] : '';
	$re_pass = isset($_POST['repass']) ? $_POST['repass'] : '';
	
	if($old_pass === $new_pass){ echo '2';die;}	// password its same at old
	else if(strlen($new_pass) < 6) {echo '3'; die;} // the password is too short
	else if($new_pass !== $re_pass) {echo '4'; die;} // the password don't match
	else {
	
		$secret = $this->mksecret();
		$new_pass = md5($secret . $new_pass . $secret);
		$editsecret = $this->mksecret();
	
	// get user id
	$uid = $this->db->query("select id from ".tbl_users." where `secret_code`='{$code}' and `email`='{$email}' limit 1");
	$uid = $uid->fetch_array(MYSQLI_ASSOC);
	$uid = isset($uid['id']) ? $uid['id'] : 0;
	// update 
	$update = $this->query_update("update ".tbl_users." set
	`password` = '{$new_pass}',
	`real_pass` = '{$re_pass}',
	`secret`='{$secret}',
	`editsecret`='{$editsecret}'
	 where `id`='{$uid}'");
		
	}
	
	if($update) {
		// update secret code
		$this->renewSecretCode($uid); 
		echo '1';
	} else echo '0';
	
}
// mutual friends
public function getMutualFriends($uid,$limit = 6, $only_count = 0){
	$res = '';
	$uid = (int) $uid;
	$i = isset($this->USER['id']) ? $this->USER['id'] : '';

	if($only_count) {
		
	$sql = "
	SELECT COUNT(*)
	from ".tbl_users." u
	left join ".tbl_friends." f1 ON f1.userid = '{$uid}' and f1.userid <> '{$i}' and f1.status='confirmed'
	left join ".tbl_friends." f2 ON f2.userid = '{$i}' and f2.friendid = f1.friendid and f2.status='confirmed'
	where u.id <> '{$uid}' and u.id <> '{$i}' and u.id=f2.friendid group by f2.friendid,u.id";
	$count = $this->db->query($sql);
	$count = $count->num_rows;
	$res = $count;
 
	} else {
		
	$sql = "
	SELECT SQL_CALC_FOUND_ROWS u.id,u.location,u.fullname,u.username,u.name,u.surname,u.profile_photo as photo, u.gender, TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) AS yearsold
	from ".tbl_users." u
	left join ".tbl_friends." f1 ON f1.userid = '{$uid}' and f1.userid <> '{$i}' and f1.status='confirmed'
	left join ".tbl_friends." f2 ON f2.userid = '{$i}' and f2.friendid = f1.friendid and f2.status='confirmed'
	where u.id <> '{$uid}' and u.id <> '{$i}' and u.id=f2.friendid group by f2.friendid,u.id
    limit ".$limit;
	$query = $this->query_select($sql);
	$mutual_count = $this->db->query("SELECT FOUND_ROWS() as c");
	$mutual_count = $mutual_count->fetch_array(MYSQLI_ASSOC);
	$mutual_count = $mutual_count['c'];
		
	$res = $uid > 0 ? [$mutual_count,$query] : [];
	
	}
		return $res;
}
// people you may know
public function knownPeople($limit = 6) {
	$i = $this->USER['id'];
	$mylocation = $this->USER['location'];
	$my_location_id = $this->USER['location_id'];
	$sql = "
	SELECT COUNT(f2.friendid) as mutual_count,(select status from ".tbl_friends." where `friendid`=f2.friendid and `userid`='{$i}') as status,u.id,u.fullname,u.name,u.location,u.birthday,u.surname,u.profile_photo as photo, u.gender
	from ".tbl_users." u
	left join ".tbl_friends." f1 ON f1.userid = '{$i}' && f1.friendid <> '{$i}' && f1.status='confirmed'
	left join ".tbl_friends." f2 ON f2.userid = f1.friendid && f2.friendid != '{$i}' && f2.friendid NOT IN (select friendid from ".tbl_friends." where `userid`=f1.userid and status='confirmed')
	where u.id != '{$i}' && (u.id=f2.friendid || (u.location LIKE N'%{$mylocation}%' || u.location_id = '{$my_location_id}')) group by u.id
	ORDER BY RAND()
    limit ".$limit;
	return $i > 0 ? $this->query_select($sql) : [];
}
// right column
public function rightColumn(){
	
	$act = isset($_POST['act']) ? $_POST['act'] : '';
 
		
	$rightColumn = $this->theme_dir."/rightColumn/";
	$this->template->assign('this',$this);
	$c = '';
	foreach($act as $categ):
	switch($categ){
		
		// filter feed
		case 'filter-feed':
		$c .= $this->template->fetch($rightColumn.'filter-feed.html');
		break;
		
		// stories
		case 'stories':
		$this->template->assign(["this" => $this, "stories" => $this->im_stories()]);
		$c .= $this->template->fetch($rightColumn.'stories.html');
		break;
		
		// groups
		case 'groups': 
		$c .= $this->template->fetch($rightColumn.'groups.html');
		break;
		
		// people you may know
		case 'pymkn':
		$c .= $this->template->fetch($rightColumn.'pymkn.html');
		break;
		
		// birthday
		case 'birthday':
		
		
		$i = $this->USER['id'];
		$today = date('d');
		$rand_day = rand($today -1,$today +1);
		$this_month = date('m');
		$sql = "SELECT u.id,u.fullname,u.birthday,u.profile_photo,u.gender FROM ".tbl_friends." f, ".tbl_users." u WHERE u.id=f.friendid and f.userid='{$i}' and
		 DAY( u.birthday ) = '".$rand_day."' AND MONTH( u.birthday ) = '".$this_month."'
		 ORDER BY RAND()";
		$q = $this->db->query($sql);
		$r = $q->fetch_array(MYSQLI_ASSOC);

		$this->template->assign( [ 'r' => $r, 'r_day' => $this->ieriaz($rand_day), 'online' => $this->is_online($r['id']) ] );	
		
		$c .= $this->template->fetch($rightColumn.'birthday.html');
		
		break;
		

	}
	endforeach;
	
	return $c;
}


public function suggestedGroups(){
	
	$g = new _COMMUNITIES;
	# limit 4
	return $g->suggGroups(4);
	
}

public function groupGetFollowersCount($group_id){
	$g = new _COMMUNITIES;

	return $g->getCommunityFollowersC($group_id);
}


// get gifs
public function getGifs(){
	
$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';	
	
// php
$url = "http://api.giphy.com/v1/gifs/search?q=".$key."&api_key=".$this->settings['GLIPHY_API']."&limit=20";
return file_get_contents($url);
	
	
}

// buy votes
public function buyVotes(){
	
	
	$this->template->assign(['this' => $this, 'sms_fortumo_key' => $this->settings['SMS_FORTUMO_KEY']]);
	
	$this->template->display($this->theme_dir.'/popups/p_buy_votes.html');
}

public function buyVotesOpenWindow(){
	$option = isset($_POST['option']) ? $this->test_input($_POST['option']) : '';
	$count = isset($_POST['count']) ? $this->test_input($_POST['count']) : '';
	if($option == 'sms'){
		
		$url = $this->settings['HOST'].'/pay/p_sms_pay.php?amount=100&k='.$this->settings['SMS_FORTUMO_KEY'];
		
	} else if ($option == 'paypal'){
		
		$url =  $this->settings['HOST'].'/pay/p_paypal_pay.php?k='.base64_encode($this->settings['PAYPAL_ACCOUNT']).'&currency='.$this->settings['VOTE_CURRENCY'].'&price='.$this->settings['VOTE_PRICE'].'&count='.$count.'&host='.$this->settings['HOST'].'&url=/nav/popups/pay/buyvotes.php?';
	}
	
	echo $url;
	
}

public function addVotes(){
	
	$i= $this->USER['id'];
	$votes = isset($_POST['votes']) ? $this->test_input($_POST['votes']) : '';
	
	$r = 0;
	
	// add votes
	if($this->query_update("update ".tbl_users." set `balance`=balance+{$votes} where id='{$i}' limit 1"))
		$r = 1;
	
	echo $r;
	
}
 
 public function cleanup()
 {
	 
	 
 } 

 public function CheckS3Pictures($pic){
	
	
	if(strstr($pic,"s3.amazonaws.com") !== false)
		return $pic;
	else
		return false;
	
}

public function getWidgets()
	{
		
		include($this->theme_dir.'/feed/widget-list.html');
		 
		
	}
	
function url_exists($url) {
    $hdrs = @get_headers($url);

    echo @$hdrs[1]."\n";

    return is_array($hdrs) ? preg_match('/^HTTP\\/\\d+\\.\\d+\\s+2\\d\\d\\s+.*$/',$hdrs[0]) : false;
}


public function checkAWSfileExists($url)
{
	$htps = HTTPS_ON ? 'https://' : 'http://';
 $file = str_replace( $htps.AWS_S3_BUCKET_NAME.".s3.amazonaws.com/", "", $url );
$info = $this->s3->getObjectInfo(AWS_S3_BUCKET_NAME, $file);
if ($info){
return 1;
}
else{
return 0;
}



}

 public function getJSLang(){
	 
	 return json_encode($this->lang);
 }
 
 
 // search place in communities
 public function searchPlaceInCommunities() {
	 
	 $loc_lat = isset($_POST['lt']) ? $this->test_input($_POST['lt']) : '';
	 $loc_lon = isset($_POST['ln']) ? $this->test_input($_POST['ln']) : '';
	 $community_id = 0;
	 
	 if($loc_lon && $loc_lat) {
	///echo 'LAT--'.$loc_lat;
			// search for community 
			$q = $this->db->query("select `id` from ".tbl_communities." where `loc_lat`='{$loc_lat}' and `loc_lon`='{$loc_lon}' limit 1");
			$r = $q->fetch_array(MYSQLI_ASSOC);
			$community_id = $r['id'];
    
	 
	 }
	 echo $community_id;
 }
 // Function to get the client ip address
public function get_client_ip_env() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
 
    return $ipaddress;
}
 
public function addUsersOnmap() {
	
	
		$i = $this->USER['id'];
		$result = array();
		
	
		
	
		// get friends
		foreach($this->query_select("select u.ip, u.id,u.fullname,u.gender,u.profile_photo as photo from ".tbl_users." u, ".tbl_friends." f 
		where u.id = f.friendid and f.status='confirmed' and f.userid='{$i}' group by f.friendid order by f.added desc
		") as $r):
		$gip = 'http://api.ipstack.com/'.$r['ip'].'?access_key='.$this->settings['IP_STACK_API'].'&format=1';
		$g = json_decode(@file_get_contents($gip),true);
 
		$region = $g['city'] !== $g['region_name'] ? ',&nbsp;'.$g['region_name'] : '';
		$at = $g['country_name'].',&nbsp;'.$g['city'] . $region;
		$result[] = array("ip" => $r['ip'], "online" => $this->is_online($r['id']), "id" => $r['id'], "fullname" => $r['fullname'], "photo" => $r['photo'], "at" => $at, "mutual_friends" => $this->getMutualFriends($r['id'],999, 1), "loc_from" => $this->getThisUserLocation($r['id'],true));
		
		 
		endforeach;
		
		
		echo json_encode($result); 
		
}

public function getLiveUserOnMap(){
	
 
	$i = $this->USER['id'];
	$users = isset($_POST['users']) ? $_POST['users'] : '';
	$return_users = array();
	
	//print_r(json_decode($users,true));
	
	foreach(json_decode($users,true) as $user):

		$user_ip = $this->db->query("select `ip` from ".tbl_users." where `id`='{$user}' limit 1");
		$user_ip = $user_ip->fetch_array(MYSQLI_ASSOC);
		$user_ip = $user_ip['ip'];
		$gip = IS_HTTPS.'api.ipstack.com/'.$user_ip.'?access_key='.$this->settings['IP_STACK_API'].'&format=1';
			$g = json_decode(@file_get_contents($gip),true);
	$return_users[] = array("user_id" => $user, "lat" => $g['latitude'], "lng" => $g['longitude']);
	endforeach;
	
	
	echo json_encode($return_users);
	
}


// translate text
public function translate_str($str){

$str = preg_replace('/[^\p{L}\p{N}\s]/u', '', $str);
// auto detect
$tr = new TranslateClient(null, $this->_lang_prefix);

$tr->setUrlBase('http://translate.google.cn/translate_a/single'); // Set Google Translate URL base (This is not necessary, only for some countries)
return $tr->translate($str);
	
	
}

// detect string language
public function detectStringLang($str){
	$str = preg_replace('/[^\p{L}\p{N}\s]/u', '', $str);
	$tr = new TranslateClient(null, $this->_lang_prefix);
	
	if(!isarray($tr) || !isJson($tr)) { return false;exit;}
	
	$text = $tr->translate($str);

	return $tr->getLastDetectedSource();
}


// get location by google api
public function getGoogleApiKey(){
	
	return $this->settings['GOOGLE_API_KEY'];
	
}
public function getGoogleCountries(){
	
 
	$input = isset($_POST['input']) ? $this->test_input($_POST['input']) : '';

    $url  =  "https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&input=".urlencode($input)."&language=".$this->_lang_prefix."&key=".$this->getGoogleApiKey();
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);

    //decoding request
    //$result = json_decode($data, true);
    
    echo $data;	
	
}

public function getLeafletLocations($key = ''){
	
 
	$input = $key ? $key : (isset($_POST['input']) ? $this->test_input($_POST['input']) : '');
 
	$url = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language=".$this->_lang_prefix."&extratags=1&namedetails=1&q=".urlencode($input);
 
 
   /// $url  =  "https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&input=".urlencode($input)."&language=".$this->_lang_prefix."&key=".$this->getGoogleApiKey();
  $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl); 

    //decoding request
    //$result = json_decode($data, true);
    if($key)
		return $data;
	else
    echo $data;	
	
}

public function getUserLocationById($place_id){
 
    $url  =  "https://maps.googleapis.com/maps/api/place/details/json?types=(cities)&placeid=".$place_id."&language=".$this->_lang_prefix."&key=".$this->getGoogleApiKey();
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
    $data = curl_exec($curl);
    curl_close($curl);


    //decoding request
    $result = json_decode($data, true);
 
    return $result;
	
	
}

 
 public function getThisUserLocationLeaflet($userid = false,$return = false){
	 
	$user_id = isset($_POST['user_id']) ? $this->test_input($_POST['user_id']) : '';
	$user_id = $userid ? $userid : $user_id;

	$q = $this->db->query("select location,location_id from ".tbl_users." where `id`='{$user_id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	
	//$full_location = json_decode($this->getLeafletLocations($r['location']),true);//$this->getUserLocationByIdLeaflet($r['location']);
	
	///echo $this->getLeafletLocations($r['location']);die;
	$result = $r['location'];
	//$result = $full_location['display_name'];//isset($full_location['result']['formatted_address']) ? $full_location['result']['formatted_address'] : (isset( $full_location['result']['adr_address'] ) ? $full_location['result']['adr_address'] : 'unknown');
	
	if($return)
		return $result;
	else
	echo $result; 
	 
 }
public function getThisUserLocation($userid = false,$return = false){
	
	$user_id = isset($_POST['user_id']) ? $this->test_input($_POST['user_id']) : '';
	$user_id = $userid ? $userid : $user_id;

	$q = $this->db->query("select location,location_id from ".tbl_users." where `id`='{$user_id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	
	$full_location = $this->getUserLocationById($r['location_id']);
	$result = isset($full_location['result']['formatted_address']) ? $full_location['result']['formatted_address'] : (isset( $full_location['result']['adr_address'] ) ? $full_location['result']['adr_address'] : 'unknown');
	
	if($return)
		return $result;
	else
	echo $result;
}

// get user's friends count
public function friendsCount($c = 0,$a = 0){
$i = $c ? $c : $this->USER['id'];
$q = $this->db->query("select `id` from ".tbl_friends." where `userid`='{$i}' and `status`='confirmed'");

return $a ? $this->noMonHund($q->num_rows) : $q->num_rows;
}
public function completeProfile(){
	
	$complete = array();
	
	
	if( !$this->USER['location'] || empty($this->USER['location']) || !$this->USER['location_id'] || empty($this->USER['location_id']) ){
		$complete[] = "location"; 
	}
	
	if(!$this->USER['username'] || empty($this->USER['username'])){
		$complete[] = "nickname"; 
		
	}
	
	if(!$this->USER['profile_photo'] || empty($this->USER['profile_photo']) || $this->USER['profile_photo'] == 0){
		$complete[] = "profile_photo"; 
	}
	
	if(!$this->friendsCount($this->USER['id'])){
		$complete[] = "friends"; 
	}
	
	if(!$this->USER['phone'] || empty($this->USER['phone']) || $this->USER['phone'] == '' || strlen($this->USER['phone']) <= 6){
		$complete[] = "phone"; 
	}
	
	return json_encode($complete);
	
}


// update profile status message
public function updateProfileStatusMsg(){
	$uid = $this->USER['id'];
	$status = isset($_POST['value']) ? $this->test_input($_POST['value']) : '';
	$r = 'status_err_add';
 
		
		 if($this->query_update("update ".tbl_users." set `text_post`='{$status}' where `id`='{$uid}' limit 1"))
			 $r = empty($status) ? '' : $this->str_smilies($status);
		
		
 
	
	return $r;
	
}

// check for dropdown notify
public function checkForDropDownNotify(){
	$i = $this->USER['id'];
	$markup = '';
	$q = $this->query_select("select * from ".tbl_notif." where `userid`='{$i}' and `dropdown_seen`='no' and unread='no' and (categ = 'friends' || categ = 'community' || (categ ='comment' && mentioned='yes') ) order by id desc limit 3");
	$c = 1;
	if(count($q) > 0){
		
	foreach($q as $r):
	$this_notif_id = $r['id'];
	$this->query_update("update ".tbl_notif." set `dropdown_seen`='yes' where `id`-'{$this_notif_id}'");
	
	switch($r['categ']){
		
		case 'friends':
		$friend_id = $r['item'];
		$user_details = $this->db->query("select u.id,u.fullname,u.profile_photo from ".tbl_friends." f, ".tbl_users." u where u.id=f.userid and f.id='{$friend_id}' group by u.id limit 1");
		$user_details = $user_details->fetch_array(MYSQLI_ASSOC);
		
		$markup .= '<li><div class="dropdown_notif_left_img"><img src="/getPhoto?p='.$user_details['profile_photo'].'&sz=small" /></div><div class="dropdown_notif_str"><a href="/user/'.$user_details['id'].'" hrefattr="true" data-clbk="removePopup">'.$user_details['fullname'].'</a>&nbsp;'.$this->lang['want_become_friend'].'</div></li>';
		break;
		
		case 'community':
		$friend_id = $r['condition'];
		$user_details = $this->db->query("select `id`,`fullname`,`profile_photo` from ".tbl_users." where `id`='{$friend_id}' limit 1");
		$user_details = $user_details->fetch_array(MYSQLI_ASSOC);
		
		$clubid = $r['item'];
		$group_details = $this->db->query("select `id`,`name` from ".tbl_communities." where `id`='{$clubid}' limit 1");
		$group_details = $group_details->fetch_array(MYSQLI_ASSOC);
		$clubname = $group_details['name'];
		
		
		$markup .= '<li><div class="notif-topdropdown-left-ic _groups"><span class="glyphicon glyphicon-user"></span></div><div class="dropdown_notif_str"><a href="/user/'.$user_details['id'].'" hrefattr="true" data-clbk="removePopup">'.$user_details['fullname'].'</a>&nbsp;'.$this->lang['invited_you_to_join_the_group'].'&nbsp;<a href="/community/'.$group_details['id'].'" hrefattr="true" data-clbk="removePopup">'.$group_details['name'].'</a></div></li>';
		
		
		break;
		
		case 'comment':
		$markup .= '<li><div class="notif-topdropdown-left-ic _comment"><span class="glyphicon glyphicon-comment"></span></div><div class="dropdown_notif_tolyko__str">'.$this->lang['notif_dropdown_mentioned'].'</div></li>';
		$c++;
		break;
 
	}
	endforeach;
	
	}
	
	
	return trim($markup);
	
}

public function MapLiveCheckin(){
	
	$is_custom = isset($_POST['is_custom']) ? 'yes' : 'no';
	$val = isset($_POST['value']) ? $this->test_input($_POST['value']) : '';
	$lat_long = isset($_POST['lat_long']) ? json_decode($_POST['lat_long'],true) : '';
    $status = $val; 
	$media = '';
	
	
	if( $is_custom == 'no' )
	{
		
		
		$status = explode("_-_",$val);
		 
		$media = $status[1];
		$status = $status[0];
		
		
		
	}
	
	
	$i = $this->USER['id'];
	$now = time();
	$location = 'unknown';
	$r = array("is" => 0);
	//echo implode(',',$lat_long);
	if(!empty($status)) {
		
	if( isarray($lat_long) ){	
 
	$lat_lng = implode(',',$lat_long);
	$url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=".$lat_lng."&language=".$this->_lang_prefix."&key=".$this->getGoogleApiKey();
	$g = json_decode(@file_get_contents($url),true);  //.$this->USER['ip']),true);
 
	$location = $g['results']['0']['formatted_address'];
	
	$update_last = $this->query_update("update ".tbl_friends_on_map." set `available`='no' where `userid`='{$i}'");
	$q = $this->query_insert("insert into ".tbl_friends_on_map." set `lat_long`='{$lat_lng}',`custom`='{$is_custom}',`time`='{$now}',`status`='{$status}',`media`='{$media}',`userid`='{$i}',`location`='{$location}' ");
	//$r = array("msg" => 1, "custom" => $is_custom, "val" => $val, "location" => $location);
	

		$result['custom'] = $is_custom;
		$result['is'] = 1;
		$result['added'] = $this->time_elapsed($now);
		if($is_custom == 'yes'){
			
			$result['ic'] = $this->getUserMapStatusIc('custom');
			$result['text'] = '<div class="map_custom_status">'.$this->str_smilies($status).'&nbsp;<span class="map_status_loc_font">'.$this->lang['at'].'&nbsp;'.$location.'</span></div>';
			$result['class'] = '';
			
		} else {
			
			$f_subcateg = $this->fCheckInSubcateg($status,$media);
			
			
			$result['ic'] = $this->getUserMapStatusIc($status);
			$result['text'] = '<div class="map_selected_status '.$status.'">'.$this->lang['map_sugg_'.$status].'&nbsp;'.$f_subcateg.'&nbsp;<span class="map_status_loc_font">'.$this->lang['at'].'&nbsp;'.$location.'</span></div>';
			$result['class'] = $status;
		
		}
	
	
	}
 
		

 

	
	} 
	return json_encode($result);
}
public function replaceFeelingsToEMoji($c){
	$r = $p = '';
	switch($c){
		
		
		case 'good':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_blush';
		$p = 'background-position: -78px -0px;';
		break;
		case 'sad':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_pensive';
		$p = 'background-position: -416px -0px;';
		break;
		case 'happy':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_smiley';
		$p = 'background-position: -26px -0px;';
		break;
		case 'astonished':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_open_mouth';
		$p = 'background-position: -572px -26px;';
		break;
		case 'awesome':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_grin';
		$p = 'background-position: -52px -0px;';
		break;
		case 'inlove':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_heart-eyes';
		$p = 'background-position: -156px -0px;';
		break;
		case 'nervous':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_rage';
		$p = 'background-position: -182px -26px;';
		break;
		case 'tired':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_sweat';
		$p = 'background-position: -26px -26px;';
		break;
		case 'excited':
		$r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_yum';
		$p = 'background-position: -286px -26px;';
		break;
		
	}
	
	return [$r,$p];
}
public function fCheckInSubcateg($status,$media_id = '') {
	
	$return = 'unknown';
	switch($status) {
		
		
		case 'watching':
		
		$q = $this->db->query("select `id`,`title` from ".tbl_pages." where `page_id`='{$media_id}' and `type`='movie' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		$return = isset($r['title']) && isset($r['id']) ? '<a class="map-page-link" href="/page/movie/'.$r['id'].'/" hrefattr="true">'.$r['title'].'</a>' : 'unknown';
		break;
		
	    case 'reading':
		
		$q = $this->db->query("select `id`,`title` from ".tbl_pages." where `page_id`='{$media_id}' and `type`='book' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		$return = isset($r['title']) ? '<a class="map-page-link" href="/page/book/'.$r['id'].'/" hrefattr="true">'.$r['title'].'</a>' : 'unknown book';
		break;
		
		case 'listen':
		
		$q = $this->db->query("select `id`,`title`,`artist` from ".tbl_songs." where `id`='{$media_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		if(isset($r['id'])){
		$song_title = $r['artist'].'&nbsp;-&nbsp;'.$r['title'];
		$song_search = $r['artist'].' '.$r['title'];
		}
		
		$return = isset($r['id']) ? '<a href="javascript:void(0);" onclick="nobilMusicSearch(\''.$song_search.'\');">'.$song_title.'</a>' : 'unknown track';
		break;
		
		case 'feeling_good':
		$g = $this->replaceFeelingsToEMoji($media_id);
		$return = '<span style="'.$g[1].'" class="'.$g[0].'"></span><span class="feeling_txt">'. $this->lang['_map_feelings_'.$media_id] .'</span>';
		break;
		
		case 'drinking':
 
		
		$return = '<span class="map-drinkic small '.$media_id.'"></span><span class="feeling_txt">'. $this->lang['_map_drink_'.$media_id] .'</span>';
		break;
		
		case 'eating':
 
		
		$return = '<span class="map-eatic small '.$media_id.'"></span><span class="feeling_txt">'. $this->lang['_map_eating_'.$media_id] .'</span>';
		break;
		
		
		case 'shopping':
		$return = '';
		break;
		
		case 'playing':
		$return = '<span class="map-playingic small '.$media_id.'"></span><span class="feeling_txt">'. $this->lang['_map_playing_'.$media_id] .'</span>';
		break;
		
	}
	
	return $return;
}


public function getUserMapStatusIc($ic){
	$r = '';
	switch($ic){
		
		case 'feeling_good':
		$r = '<i class="icofont icofont-emo-simple-smile">&#xebbd;</i>';
		break;
	 
		case 'drink_coffe':
		case 'drinking':
		$r = '<i class="icofont icofont-coffee-mug">&#xec3f;</i>';
		break;
		
		case 'eating':
		$r = '<i class="icofont icofont-pizza-slice">&#xec6b;</i>';
		break;
		
		case 'watching':
		$r = '<i class="icofont icofont-film">&#xeff9;</i>';
		break;
		
		case 'listen':
		$r = '<i class="icofont icofont-headphone">&#xf01b;</i>';
		break;
		
		case 'shopping':
		$r = '<i class="icofont icofont-shopping-cart">&#xf0cd;</i>';
		break;
		
		case 'playing':
		$r = '<i class="icofont icofont-game-pad">&#xf00c;</i>';
		break;
		
		case 'reading':
		$r = '<i class="icofont icofont-book">&#xef8f;</i>';
		break;
		case 'custom':
 
		$r = '<i class="icofont icofont-volume-up">&#xf109;</i>';
		break;
	}
	
	return $r;
}


public function addToNearbyPeople($lat_long){
	
	
	$explode_latlong = explode(',',$lat_long);
	$lat = $explode_latlong[0];
	$long = $explode_latlong[1];
	
	$now = time();
	$i = $this->USER['id'];
	$q = $this->db->query("select `lat`,`long` from ".tbl_nearby_people." where `userid`='{$i}' order by id desc limit 1");
	$q = $q->fetch_array(MYSQLI_ASSOC);
	$old_lat = $q['lat'];
	$old_long = $q['long'];
	
	
	if($old_lat != $lat || $old_long != $old_long)
	{
		
	if($lat > 0 && $long > 0)
	// insert lat&long to nearby table
	$insert_nearby = $this->query_insert("insert into ".tbl_nearby_people." set `userid`='{$i}',`lat`='{$lat}',`long`='{$long}',`time`='{$now}'");
	}
	
}

public function checkUserStatusOnMap(){
	
	$userid = isset($_POST['userid']) ? (int) $this->test_input($_POST['userid']) : 0;
	$lat_long = isset($_POST['lat_long']) ? $this->test_input($_POST['lat_long']) : '';
	
	
 
	$i = $userid ? $userid : $this->USER['id'];
	$result = array("is" => 0);
	$q = $this->db->query("select * from ".tbl_friends_on_map." where `userid`='{$i}' and `available`='yes' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
 
	$this->addToNearbyPeople($lat_long);
 

	
	
 
	if(count($r)){
		
		if($lat_long){
			
			$lat_long_ex = explode(',',$lat_long);
			$lat = $lat_long_ex['1'];
			$lon = $lat_long_ex['0'];
			
			
			if($lat_long != $r['lat_long']){
				
				$q = $this->query_update("update ".tbl_friends_on_map." set `available`='no' where `lat_long`='". $r['lat_long']."' limit 1");
				$result['is'] = 0;
				return json_encode($result);
				exit;
			}
			
			
		}
		
		
		
		$result['lat_long'] = $r['lat_long'];
		$result['is'] = 1;
		$result['added'] = $this->time_elapsed($r['time']);
		if($r['custom'] == 'yes'){
			
			$result['ic'] = $this->getUserMapStatusIc('custom');
			$result['text'] = '<div class="map_custom_status">'.$this->str_smilies($r['status']).'&nbsp;<span class="map_status_loc_font">'.$this->lang['at'].'&nbsp;'.$r['location'].'</span></div>';
			$result['class'] = '';
			
		} else {
			$f_subcateg = $this->fCheckInSubcateg($r['status'],$r['media']);
			$result['ic'] = $this->getUserMapStatusIc($r['status']);
			$result['text'] = '<div class="map_selected_status '.$r['status'].'">'.$this->lang['map_sugg_'.$r['status']].'&nbsp;'.$f_subcateg.'&nbsp;<span class="map_status_loc_font">'.$this->lang['at'].'&nbsp;'.$r['location'].'</span></div>';
			$result['class'] = $r['status'];
		
		}
	}
	
	return json_encode($result);
}

public function deleteStatusFromMap(){
	
	$i = $this->USER['id'];
	$update = $this->query_update("update ".tbl_friends_on_map." set `available`='no' where `userid`='{$i}' and `available`='yes'");
	
	if($update) echo 1; else echo 2;
	
	
}
public function searchMovies($key){
	
    
    $url  =  "https://api.themoviedb.org/3/search/movie?include_adult=false&query=".urlencode($key)."&language=".$this->_lang_prefix."&api_key=".$this->settings['MOVIES_DB_API'];
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);

    //decoding request
    $result = isJson($data) ? $data : json_encode(array( "results" => []));//json_decode($data, true);
 
    return $result;
	
}

public function searchMoviesByKey(){
	$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
	
	return $this->searchMovies($key);
}


public function searchBooks($key){
	$key = urlencode($key);
    
    $url  =  "https://www.googleapis.com/books/v1/volumes?maxResults=20&q=intitle:".$key."&inauthor:".$key;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);

    //decoding request
    $result = isJson($data) ? $data : json_encode(array( "items" => [])); 
 
    return $result;
	
}
public function searchBooksByKey(){
	$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
	return $this->searchBooks($key);	
}
public function createPage($id, $type, $title, $cover, $json){
	
		$page_id = 0;
		// create page
		$check_page = $this->db->query("select id from  ".tbl_pages." where `page_id`='{$id}' and `type`='{$type}' limit 1");
		$check_page = $check_page->fetch_array(MYSQLI_ASSOC);
		$page_id = $check_page['id'];
		if(!$page_id){
			
			$page_id = $this->query_insert("insert into  ".tbl_pages." set `page_id`='{$id}', `type`='{$type}',`title`='{$title}',`cover`='{$cover}',`json`='{$json}'");
		
		}
	return $page_id;
}
public function addMovieToUser(){
	$movie = isset($_POST['movie']) ? ($_POST['movie']) : '';
    $r = 0;
	$movie = !empty($movie) ? json_decode($movie,true) : '';
	$i = $this->USER['id'];
	if ( isarray($movie)){
		
		$title = $movie['title'];
		$id = $movie['id'];
		$movie_cover = $movie['poster_path'];
		$movie_json = addslashes(json_encode($movie));
		
		// create page
		$page_id = $this->createPage($id,'movie',$title,$movie_cover,$movie_json);
		
		
		// check for movie id
		$check = count($this->query_select("select id from ".tbl_users_movies." where `userid`='{$i}' and `movie_id`='{$id}' limit 1"));
		
		if(!$check) {
		
		// add to user
		$add_movie = $this->query_insert("insert into ".tbl_users_movies." set `userid`='{$i}',`page_id`='{$page_id}',`movie_title`='{$title}',`movie_cover`='{$movie_cover}',`movie_id`='{$id}'");
		
		if($add_movie) $r =$page_id;
		
		} else {
			
			$r = $page_id;
		}
	}
	return $r;
}


public function addBookToUser(){
	$book = isset($_POST['book']) ? ($_POST['book']) : '';
    $r = 0;
	$book = !empty($book) ? json_decode($book,true) : '';
	$i = $this->USER['id'];
	$unknown_book_title = $this->lang['book_unknown_title'];
	if ( isarray($book) ){
		
		$book_info = isset($book['volumeInfo']) ? $book['volumeInfo'] : false;
		$title = $book_info ? (isset($book_info['title']) ? $book_info['title'] : $unknown_book_title) : $unknown_book_title;
		$id = $book['id'];
		$book_cover = 'nope'; 
		
		if(isset($book_info['imageLinks'])){
			
			if(isset($book_info['imageLinks']['thumbnail']))
			$book_cover = $book_info['imageLinks']['thumbnail'];
		else
			$book_cover = $book_info['imageLinks']['smallThumbnail'];
			
		}
		
		$book_json = addslashes(json_encode($book));
		
		// create page
		$page_id = $this->createPage($id,'book',$title,$book_cover,$book_json);
		
		
		// check for book id
		$check = count($this->query_select("select id from ".tbl_users_books." where `userid`='{$i}' and `book_id`='{$id}' limit 1"));
		
		if(!$check) {
		
		// add to user
		$add_book = $this->query_insert("insert into ".tbl_users_books." set `userid`='{$i}',`page_id`='{$page_id}',`book_title`='{$title}',`book_cover`='{$book_cover}',`book_id`='{$id}'");
		
		if($add_book) $r = $page_id;
		
		} else {
			
			$r = $page_id;
		}
	}
	return $r;
}
// check if the item is rated by me
public function checkItemIsRatedByMe($item_id,$type) {
	
	$i = $this->USER['id'];
	if($i)
	$count = count($this->query_select("select `id` from ".tbl_ratings." where `userid`='{$i}' && `item_id`='{$item_id}' && `item_type`='{$type}' limit 1"));
    else
		$count = 1;
	return $count >= 1 ? true : false;
	
}

// get item stars 
public function getItemStars($item_id,$type){
	
 
		$q = $this->query_select("select SQL_CALC_FOUND_ROWS `rating` from ".tbl_ratings." where `item_id`='{$item_id}' && `item_type`='{$type}'");

		$stars = 0;
		if(count($q)){
			
			foreach($q as $r):
			$stars = $stars + $r['rating'];
			endforeach;
			
		}
		
		
		$total = $this->db->query("SELECT FOUND_ROWS() as c");
		$total = $total->fetch_array(MYSQLI_ASSOC);
		$total = $total['c'];
	
	return $stars > 0 ? intval($stars / $total) : 0;
}
// get item ratings count
public function getRatingsCount($item_id = 0, $item_type = '') {
	
	$item_type = $item_type ? $item_type : (isset($_POST['item-type']) ? $this->test_input($_POST['item-type']) : '');
	$item_id = $item_id ? $item_id : (isset($_POST['item-id']) ? (int) $this->test_input($_POST['item-id']) : '');
	$r = 0;
	if( $item_type && $item_id){
		
		$q = $this->db->query("select COUNT(*) from ".tbl_ratings." where `item_id`='{$item_id}' && `item_type`='{$item_type}'");
		$q = $q->fetch_row();
		$r = $q[0];
	}
	
	return $r;
}
public function rateThisItem(){
	
	$i = $this->USER['id'];
	$item_type = isset($_POST['item-type']) ? $this->test_input($_POST['item-type']) : '';
	$item_id = isset($_POST['item-id']) ? (int) $this->test_input($_POST['item-id']) : '';
	$rating = isset($_POST['rating']) ? (int) $this->test_input($_POST['rating']) : '';
	$response = array("msg" => 0, "total_rating" => 0);
	
	// check if the item is already rated by respective user
	$check = $this->checkItemIsRatedByMe($item_id,$item_type);
	
		if( $item_type && $item_id && $rating && $i && !$check){
			
			$add_rating = $this->query_insert("insert into ".tbl_ratings." set `item_id`='{$item_id}',`item_type`='{$item_type}',`rating`='{$rating}',`userid`='{$i}'");
			
			if($add_rating){
				
				$cur_stars = $this->getItemStars($item_id,$item_type);
				$response['total_rating'] = $cur_stars;
				$response['msg'] = 1; 
			}
			
		}
	 
	return json_encode($response);
}

public function sendSMS($numbers = array(),$text){
	
	
$textlocal = new Textlocal($this->settings['TXTLOCAL_EMAIL'], $this->settings['TXTLOCAL_PASS']);


$sender = $this->settings['TXTLOCAL_SENDER'];
$message = $text;
$return = array("status" => "error", "msg" => "unknown error");
try {
    $result = (array) $textlocal->sendSms($numbers, $message, $sender);
 //print_r($result);

	$return = array("status" => ( $result['status'] == "success" ? "done" : "error" ), "msg" => "success");
	
} catch (Exception $e) {
	$return = array("status" => "error", "msg" => $e->getMessage());
}
	return json_encode($return);
}

public function confirmSecretCode($value,$case,$via){
	
	// check for user and code
	$c = count($this->query_select("select id from ".tbl_users." where `phone`='{$user}' || `username`='{$user}' || `id`='{$user}' || `email`='{$user}' limit 1"));
	
	
	$this->template->assign(['this' => $this, 'case' => $case, 'via' => $via, 'c'=>$c, 'value' => $value]);
	$this->template->display($this->theme_dir."/secret/confirm.html");
}

public function renewSecretCode($uid){
	$code =  getRandomSecretCode();
	return ['code' => $code, 'status' => $this->query_update("update ".tbl_users." set `secret_code`='{$code}' where `id`='{$uid}'")];
}
public function confirmSecretCodeAjax() {
	
$mode = (isset($_POST['mode']) ? $this->test_input($_POST['mode']) : '');
$code = (isset($_POST['code']) ? (is_numeric($this->test_input($_POST['code'])) ? $this->test_input($_POST['code']) : '') : '');
$r = array( 'status' => 'error', 'msg' => $this->lang['incorect_secret_code']);

			switch($mode){
				
				case 'activate-account':
				$r['mode'] = 'activate-account';
				
				// check code
				$g_user = $this->db->query("select `email`,`id`,`secret_code` from ".tbl_users." where `secret_code`='{$code}' limit 1");
				$g_user = $g_user->fetch_array(MYSQLI_ASSOC);
				
				if(isset($g_user['id']) && isset($g_user['secret_code'])){
				if($g_user['secret_code'] == $code){
					$r['status'] = 'error';
					$r['msg'] = $this->lang['sorry_code_not_found'];
					$user_id = $g_user['id'];
					$update = $this->query_update("update ".tbl_users." set `status`='confirmed' where `id`='{$user_id}'");
					// change pass code
					$new_code = $this->renewSecretCode($user_id);
					
					$r['status'] = 'ok';
					$r['msg'] = 'activate_account';
					$r['login_username'] = $g_user['email'];
					$r['new_code'] = $new_code['code'];
					
				} else if($g_user['secret_code'] != $code){
					
					$r['status'] = 'incorrect';
					$r['msg'] = $this->lang['incorect_secret_code'];
				} 	
					 

				}
				
				break;
				
				case 'restore-password':
				$r['mode'] = 'restore-password';
				
				// check code
				$g_user = $this->db->query("select `id`,`email`,`secret_code` from ".tbl_users." where `secret_code`='{$code}' limit 1");
				$g_user = $g_user->fetch_array(MYSQLI_ASSOC);
				 
				$r['status'] = 'error';
				$r['msg'] = $this->lang['sorry_code_not_found'];
				
				if(isset($g_user['id']) && isset($g_user['secret_code'])){
				
				if($g_user['secret_code'] == $code){
					
					$user_id = $g_user['id'];
					 
					// change pass code
					$new_code = $this->renewSecretCode($user_id);
					
					$r['status'] = 'ok';
					$r['msg'] = 'restore-password';
					$r['login_username'] = $g_user['email'];
					$r['new_code'] = $new_code['code'];
					
				} else if($g_user['secret_code'] != $code){
					
					$r['status'] = 'incorrect';
					$r['msg'] = $this->lang['incorect_secret_code'];
				} 
					 
				
				}
				
				break;
				
				
			}

return json_encode($r);
}

public function getSecretCodeBySms($number) {
	
	$number = $number ? $number : (isset($_POST['number']) ? $this->test_input($_POST['number']) : '');
	$text = $this->lang['sms_text_secret_code'];
	$result = array('status'=>'error','msg'=>$this->lang['sms_get_code_err']);
	if($number) {
		 
		
		$q = $this->db->query("select `id`,`secret_code` from ".tbl_users." where `phone`='{$number}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$user_id = isset($r['id']) ? $r['id'] : false;
		if(!count($r)){
			$result = array('status'=>'error','msg'=>$this->lang['your_number_was_not_found']);
			
		} else {
		
		$secret = $r['secret_code'];
		
		if(!$secret || empty($secret)){
			
			if($user_id) {
				
				$new_code = $this->renewSecretCode($user_id);
				
				if($new_code['status'] == true) $secret = $new_code['code'];
				
			}
			
		}
		$numbers = isarray($number) ? $number : array($number);
		$d_numbers = array();
		
		foreach($numbers as $number)
		$d_numbers[] = $this->settings['PHONE_PREFIX_CD'].$number;
 
		if($user_id) {
			
				$new_code = $this->renewSecretCode($user_id);
				
				if($new_code['status'] == true) $secret = $new_code['code'];
		}
		
		$message = str_replace('%code',$secret,str_replace('%sitename',$this->settings['SITENAME'],$this->lang['your_social_plus_code_is']));
		$send_sms = json_decode($this->sendSMS($d_numbers,$message),true);

		$result = $send_sms['status'] == 'done' ? array('status'=>'success','msg'=>'code_sent') : $result;
		
		}
		
	}
	
	return json_encode($result);
}


public function getUserSecretCode(){
		$mode = isset($_POST['mode']) ? $this->test_input($_POST['mode']) : '';
		$to = isset($_POST['to']) ? $this->test_input($_POST['to']) : '';
		switch($mode){
			
			case 'sms':
				$r = $this->getSecretCodeBySms($to);
			break;
			
			case 'email':
				$r = $this->getSecretCodeByEmail($to);
			break;
			
			
		}
		return $r;
}



public function getSecretCodeMarkup($mode,$case,$key = ''){
	

	
	if( !$this->settings['TXTLOCAL_ENABLED'] ) $mode = 'email';else if ($mode == '' && $this->settings['TXTLOCAL_ENABLED']) $mode = 'sms'; 
    $key = $key ? $key : '';
	$data = !$this->settings['TXTLOCAL_ENABLED'] ? $this->template->fetch($this->theme_dir."/secret/email.html") : $this->template->fetch($this->theme_dir."/secret/select-method.html");
	
	$this->template->assign(['this' => $this, 'case' => $case]);
	switch($mode){
		
	
		case 'email':
		if($key){
		// get email
		$q = $this->db->query("select `email` from ".tbl_users." where `phone`='{$key}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$key = $r['email'];
		}
		$this->template->assign([ 'email' => $key]);
		$data = $this->template->fetch($this->theme_dir."/secret/email.html");
		
		break;
		
		case 'sms':
		if($key){ 
		// get phone
		$q = $this->db->query("select `phone` from ".tbl_users." where `email`='{$key}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$key = $r['phone']; 
		}
	
		$this->template->assign(['prefixcode' => $this->settings['PHONE_PREFIX_CD'], 'phone' => $key]);
		$data = $this->template->fetch($this->theme_dir."/secret/sms.html");
		
		break;
	}
	
	echo $this->getPage($data);
	
}
public function getSecretCodeByEmail($email = '',$code = ''){
	
	
	
			$email = $email ? $email : ( (isset($_GET['email']) ? $this->test_input($_GET['email']) : ( isset($_POST['email']) ? $this->test_input($_POST['email']) : '') ));
			$email = !$email ? ( (isset($_GET['to']) ? $this->test_input($_GET['to']) : ( isset($_POST['to']) ? $this->test_input($_POST['to']) : '') )) : $email;
			$code = $code ? $code : ( (isset($_GET['code']) ? $this->test_input($_GET['code']) : ( isset($_POST['code']) ? $this->test_input($_POST['code']) : '') ));
			$result = array('status' => 'error', 'msg' => $this->lang['forgot_email_not_found']);
 
			if($email) {
				
				
			// select user data
			$user = $this->db->query("select id,secret_code from ".tbl_users." where `email`='{$email}' limit 1");
			$user = $user->fetch_array(MYSQLI_ASSOC);
			$user_id = $user['id'];
			$code = $user['secret_code'];
			
			$new_code = $this->renewSecretCode($user_id);
				if( isarray($new_code) ){
							
							$code = $new_code['code'];
				}

			$to      = $email;
			$subject = $this->settings['SITENAME'].'. .'.$this->lang['email_title_secret_code'];
			$message = '';
			$message .= '<img style="background-color:#5D7894;" src="'.$this->theme_url.'/css/images/logo_new/logo-v2-white.png" />';
			$message .= '<br/><br/>'.$this->lang['email_verification_code_msg'].' <strong>'.$code.'</strong>';
			$headers = "From: ".SITE_MAIL."\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
 
				 if(@mail($to, $subject, $message, $headers)){
						$result['msg'] = $this->lang['code_sent_to_email'];
						$result['status'] = 'success';
						

				 } else
						$result['msg'] = $this->lang['code_not_sent_to_email'];
			}

	return json_encode($result);
	
}
public function enterSecretCode($case,$user) {
	
	/*
	if(isset($this->USER)){
		
		echo 'Oooooopsss.';
		exit;
	}*/
	
	// check for user and code
	$c = count($this->query_select("select id from ".tbl_users." where `phone`='{$user}' || `email`='{$user}' limit 1"));

	$this->template->assign(['this' => $this,'case' => $case, 'c' => $c]);
	switch($case){
		
		
		case 'activate-account':
		$this->template->assign(['cmd' => 'activate-account']);

		break;
		
		case 'recover-password':
		$this->template->assign(['cmd' => 'recover-password']);
		break;
		
	}
	
	$data = $this->template->fetch($this->theme_dir."/secret/confirm.html");
	echo $this->getPage($data);
	
}
public function PostsOnMapCount($c){
	$i = $this->USER['id'];
	$dt = strtotime('-2 hours');
	switch($c){
		default:
		case 'now':
		$dt_start = strtotime('-2 hours');
		$dt_end = time();
		break;
		case 'all_today':
		$dt_start = strtotime('-22 hours');
		$dt_end = strtotime('-2 hours');
		break;
		case 'last_days':
		$dt_start = strtotime('-3 days');
		$dt_end = strtotime('-24 hours');
		
		
		
	}
	
	$sql = "select COUNT(*) from ".tbl_friends." f, ".tbl_friends_on_map." m 
								where m.userid<>'{$i}' and f.userid = '{$i}' and m.userid = f.friendid and f.status='confirmed' and m.time > '{$dt_start}' and m.time < '{$dt_end}' group by m.id";
 
	$c = count($this->query_select($sql));
 
	
	

	$count  = $c;
	
	return $count;
}
public function viewStatusesOnMap(){
	
	$ignore_ids = 0;
	$i = $this->USER['id'];
	$dt = strtotime("-2 hours");

	$this->template->assign("this",$this);
	$data = $this->template->fetch($this->theme_dir."/users-on-map/statuses-box.html");
	echo $this->getPage($data);
}

public function getAjaxPostsOnMap(){
	 
	$c = isset($_POST['c']) ? $this->test_input($_POST['c']) : '';
	
	switch($c) {
		
		case 'now':
		$dt_start = strtotime('-2 hours');
		$dt_end = time();
		break;
		case 'all_today':
		$dt_start = strtotime('-22 hours');
		$dt_end = strtotime('-2 hours');
		break;
		case 'last_days':
		$dt_start = strtotime('-3 days');
		$dt_end = strtotime('-24 hours');
		break;
	}
	$i = $this->USER['id'];
	$res = array();
	
	if(!isset($_SESSION['ignore_fmapbox_ids'])){
	 $_SESSION['ignore_fmapbox_ids'] = array();
 	
	}  
	 
	 
	 
	$q = $this->query_select("select u.id as uid, u.fullname as ufullname, u.profile_photo as uphoto, m.* from ".tbl_friends." f, ".tbl_users." u, ".tbl_friends_on_map." m
	where u.id=m.userid and m.userid<>'{$i}' and f.userid = '{$i}' and m.userid = f.friendid and f.status='confirmed' and m.time > '{$dt_start}' and m.time < '{$dt_end}' group by m.id order by m.time desc limit 100");

	foreach($q as $r):
	
	$f_subcateg = $this->fCheckInSubcateg($r['status'],$r['media']);
	$res[] = array("user_id" => $r['uid'], 
	"user_name" => $r['ufullname'], 
	"user_photo" => $r['uphoto'], 
	"time_ago" => $this->time_elapsed($r['time']), 
	"location" => $r['location'],
	"bg" => in_array($r['id'], $_SESSION['ignore_fmapbox_ids']) ? '#f7f7f7' : 'transparent',
	"status" => $r['custom'] == 'yes' ? $r['status'] : '<div class="map_selected_status '.$r['status'].'">'.$this->lang['map_sugg_'.$r['status']].'&nbsp;'.$f_subcateg.'&nbsp;<span class="map_status_loc_font">'.$this->lang['at'].'&nbsp;'.$r['location'].'</span></div>'
	);
	$_SESSION['ignore_fmapbox_ids'][] = $r['id'];
	endforeach;
	
	
	return json_encode($res);
}
public function nearbyPeopleCount($new = false){
 
	$i = $this->USER['id'];
	// select count of nearby peoples
	$my_n = $this->db->query("select `lat`,`long` from ".tbl_nearby_people." where `userid`='{$i}' order by id desc limit 1");
	$my_n = $my_n->fetch_array(MYSQLI_ASSOC);
	$lat = $my_n['lat'];
	$long = $my_n['long'];
	
	
	$arr_lat_max_lon = around20km($lat,$long);
	$maxLat = $arr_lat_max_lon[0];
	$maxLon = $arr_lat_max_lon[1];
	$minLat = $arr_lat_max_lon[2];
	$minLon = $arr_lat_max_lon[3];
	
	$ignore_ids = isset($_SESSION['ignore_fmapbox_nearby_ids']) ? implode(',',$_SESSION['ignore_fmapbox_nearby_ids']) : '0';
 
	// check for nearby people
    $n = count($this->query_select("select id from ".tbl_nearby_people." where FIND_IN_SET(id,'{$ignore_ids}') = 0 and `userid`<>'{$i}' && !(`lat` > '{$maxLat}') && !(`lat` < '{$minLat}') && !(`long` > '{$maxLon}') && !(`long` < '{$minLon}') "));
	$count = $n; 
	
	return $n;
}
public function getNearbyPeople(){
	 
	$i = $this->USER['id'];
	
	// select count of nearby peoples
	$my_n = $this->db->query("select `lat`,`long` from ".tbl_nearby_people." where `userid`='{$i}' order by id desc limit 1");
	$my_n = $my_n->fetch_array(MYSQLI_ASSOC);
	$lat = $my_n['lat'];
	$long = $my_n['long'];
	
	
	$arr_lat_max_lon = around20km($lat,$long);
	$maxLat = $arr_lat_max_lon[0];
	$maxLon = $arr_lat_max_lon[1];
	$minLat = $arr_lat_max_lon[2];
	$minLon = $arr_lat_max_lon[3];
	
	 
	// check for nearby people
    $n = $this->query_select("select n.*, u.profile_photo as uphoto, u.fullname as user_name, u.id as uid from ".tbl_nearby_people." n 
	left join ".tbl_users." u ON u.id = n.userid
	where n.userid<>'{$i}' && !(n.lat > '{$maxLat}') && !(n.lat < '{$minLat}') && !(n.long > '{$maxLon}') && !(n.long < '{$minLon}') 
	group by n.id 
	order by n.time desc limit 100
	
	");

	$resp = array();
	
	
	if(!isset($_SESSION['ignore_fmapbox_nearby_ids'])){

			$_SESSION['ignore_fmapbox_nearby_ids'] = array();

	} 
	
	
	if(count($n)){
		
		foreach($n as $r):
		
		$lat_lng = $r['lat'].','.$r['long'];
		$url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=".$lat_lng."&language=".$this->_lang_prefix."&key=".$this->getGoogleApiKey();
		$g = json_decode(@file_get_contents($url),true);  
 
		$location = $g['results']['0']['formatted_address'];
		
		$distance_km = circle_distance($lat, $long, $r['lat'], $r['long']);
		$resp[] = array("bg" => 'transparent', "location" => $location, "user_photo" => $r['uphoto'], "user_fullname" => $r['user_name'], "user_id" => $r['uid'], "time_ago" => $this->time_elapsed($r['time']), "distance" => round($distance_km, 1));
		$_SESSION['ignore_fmapbox_nearby_ids'][] = $r['id'];
		endforeach;
	}
	
	return json_encode($resp);
}
public function userProductsCount($uid){
	$market = new _MARKET;
	return $market->myProductsCount();
}
public function getClubIdByPost($post_id,$post_type){
	
	$a = $this->db->query("select group_id from ".tbl_communities_pics." where `id`='{$post_id}' limit 1");
	$b = $a->fetch_array(MYSQLI_ASSOC);
	
	return $b['group_id'];
	
}


 




} // end class
 