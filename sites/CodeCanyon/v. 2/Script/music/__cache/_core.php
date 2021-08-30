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

// ajax requests class
require_once('_ajax_request.class.php');
 

// vimeo class, search engine for video clips
require_once('vimeo.php');


class _MUSIC_MODULE {

// NOTE: the height of all pages are resized automatically
public $get_header = '../template/header.html'; // get header for all pages
public $get_footer = '../template/footer.html'; // close html content for all pages
public $feedback_target_dir = "attachments/"; // name of the folder where are stored feedback attachments 
public $sortable; // for sorting songs from playlist
public $playlists_page_title = 'Playlists'; // name of page in header, for playlist page
public $playlists_page_height = '590'; // height of playlists page
public $downloaded_page_title = 'My purchased music'; // name of page in header, for downloaded page
public $downloaded_page_height = '590'; // height of downloaded page
public $mymusic_page_title = 'My Music'; // name of page in header, for My Music page
public $mymusic_page_height = '570'; // height of my music page
public $history_page_height = '670';// height of recently played page
public $history_page_title  = 'Recently played'; // name of page in header, for Recently played
public $users_page_height   = '570'; // height of users page
public $collection_page_name = 'Playlist'; // name of page in header, for playlist details
public $collection_page_height = '570'; // height of playlist details page
public $get_radio; // request the radio station
public $more_s;
public $inject_html;
public $action;
public $id;
public $USER;
public $purchase_ic;
public $user_id;
public $vimeo;
public $song_active;
public $album_active;
public $artist_active;
public $inx_active;
public $sub_activeClass_albums;
public $method;
public $allow_upload_songs;
protected $db;


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



// --------------------------- GET DATABASE ---------------------------------
private function db_conn($encoding = 'utf8'){

$this->db = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

if($this->db->connect_errno > 0){
    die('Unable to connect to database [' . $this->db->connect_error . ']');
} else
// only for "insert and update" charset is 'cp1251'
$this->db->set_charset('utf8mb4');

return $this->db;

} // END db_conn()


// ------------------------------ RUN QUERIES --------------------------
// for select
public function __om_query($query) {

    $result_array = array();
    $database = $this->db_conn();
    $result = $database->query($query) or die($database->error);
    if(!$result){
        die("No disponible data to show. [ error: empty ]");
    }
   

    while($row = $result->fetch_assoc())
        $result_array[] = $row;

    return $result_array;


} // END om_query()

// for insert
public function __om_query_insert($query) {

    $database = $this->db_conn('cp1251');
    $query = $database->query($query) or die($database->error);
    $insert_id = @mysqli_insert_id($database);
    if(!$insert_id){
        die("An error occurred to insert data into database.");
    }

    return $insert_id;
   

} // END om_query_insert()

// for update
public function __om_query_update($query) {

    $database = $this->db_conn('cp1251');
    $query = $database->query($query) or die($database->error);
    if(!$query){
        die("An error occurred to update data.");
    }

   return true;
   

} // END om_query_update()

// for delete
public function __om_query_delete($query) {

    $database = $this->db_conn();
    $query = $database->query($query) or die($database->error);
    if(!$query){
        die("An error occurred to delete data from database.");
    }

   return true;
   

} // END om_query_delete()



// redirect user if getting a request without our security code :)
public function get_req_redir(){

if (!isset($_GET['tk']) || $_GET['tk'] != $_COOKIE['tk_m']) {
    header("location:http://" . $_SERVER['SERVER_NAME'] . "?music=" . base64_encode($_SERVER['REQUEST_URI']));
    die();
}

} // END get_req_redir()


public function build_header($title,$height) { require_once($this->get_header);  }
public function close_html() { require_once($this->get_footer);  }
public function iconv_convert($string) { return iconv('UTF-8', 'CP1251//TRANSLIT//IGNORE',$string); }

// ------------------------- BUILD WindowMusic ------------------------------
public function __construct($s = false){
global $wMusic_config, $site_settings; // import settings


      // Check for PHP version
      $required_php_version = '5.3.0';
      if (version_compare(PHP_VERSION, $required_php_version, '<')) {
           return die('WindowMusic requires PHP v' . $required_php_version . ' or higher - you are running v' . PHP_VERSION);
      }

      // check if cUrl is enabled
      if  (!function_exists('curl_version')) {
        
          return die('<p>1Music can not be initialized.<br/>Your server are disabled the php cURL function, please enable it an try again.</p>'); 
      }
 
      if((!defined('__USER_ID') || __USER_ID <= 0) && !$s)
	 return die('<p style="background:whitesmoke;padding:5px;font-family: monospace;">1Music can not be initialized.<br/> The "__USER_ID" is empty, please set constant "__USER_ID" from _config.php .</p>');

      // store settings
      foreach($wMusic_config as $key => $value){
        $this->{$key} = $value;
      }

     // get the user data and set the global var $USER
     // define USER
     $sql = "SELECT * FROM ".nobil_om_users." WHERE id = ". __USER_ID; // you need to change this query to your compatible rows
     foreach($this->__om_query($sql) as $user_data)
     $this->USER = $user_data;// the $USER variable has been defined :) 

    // create a smarty object
    $this->inject_html = new Smarty;
	$this->allow_upload_songs = $site_settings['upload_audios'];
	$this->core = new _SOCIALPLUS;
	
   // check vimeo settings
   if(!$this->VIMEO_APP_ID || !$this->VIMEO_APP_SECRET)
      return die('Empty VIMEO APP ID or APP SECRET, check <b>_config.php</b>');
    } // END __construct()


// ------------------ POPULAR SONGS & PLAYLISTS --------------------------------
public function Popular(){


$request_ct = isset($_GET['ct']) ? $this->db->real_escape_string($_GET['ct']) : '';
$group_enable = true;
$group_by = '';

switch ($request_ct) {
    
    case 'hipHop':
        $sql_where = "where m.genre='Hip-Hop'";
        break;
    case 'trance':
        $sql_where = "where m.genre='Trance'";
        break;
    case 'popDance':
        $sql_where = "where m.genre='Pop/Dance'";
        break;
    case 'rock':
        $sql_where = "where m.genre='Rock'";
        break;
    case 'other':
        $sql_where = "where m.genre='Other' or m.genre='unknown'";
        break;
    case 'today':
        $group_enable = false;
	$today_d = strtotime('today UTC');
        $sql_where = "where m.added >= '{$today_d}'";
    break;
    case 'week':
        $group_enable = false;
	$week = strtotime('-1 week');
        $sql_where = "where m.added >= '{$week}'";
    break;
    case 'month':
        $group_enable = false;
	$month = strtotime('-1 month');
        $sql_where = "where m.added >= '{$month}'";
    break;
    default:
        $sql_where = "where m.artist!='Unknown Artist' and m.title!='unknown'";
        
}

if($group_enable) $group_by = ' group by m.artist ';

// ----- SQL Queries

// store the most popular songs
$sql_a = "
        select distinct m.*, m.added as dtb from ".nobil_om_songs." m 
        $sql_where $group_by
        order by m.year * 1 desc,rand() LIMIT " . $this->index_mus_limit;

// get the first 4 popular playlists
$sql_b = "
     select p.*, COUNT(pp.trackid) as pl_c from ".nobil_om_playlists." p 
     inner join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id 
     where p.playcount !='-0' and p.favorite_cover != '' and p.favorite_cover IS NOT NULL
     group by p.id having COUNT(pp.trackid) >= '" . $this->playlists_having_tr . "'
     ORDER BY p.playcount,p.added desc LIMIT " . $this->index_playlist_limit . "
     ";



$popular_s = $this->__om_query($sql_a); // popular songs
$popular_p =  $this->__om_query($sql_b); // popular playlists

// assign LOOP to smarty 
$this->inject_html->assign('s_res', $popular_s);
$this->inject_html->assign('p_res', $popular_p);

// assign vars to smarty
$this->inject_html->assign('pl_is_new', $this->int_date_new_pl); // check days interval for add new emblem to playlists
$this->inject_html->assign('s_av_down', $this->show_prch_icon); // get song language

// display it
$this->inject_html->display('../template/popular/popular.html');

} // END Popular()


// ---------------------- #PLAYLISTS ----------------------------

public function Playlist($act){


switch ($act) { case 'public': $this->getPublicPlaylists(); break; // get the top 20 collections in playlists page
        case 'my': $this->getMyPlaylist(); break; // get the user collections
                                                                     }

}

// get the user's playlists
private function getMyPlaylist(){

$display         = 'none';
$count_upl_songs = '0';// count of uploaded songs
$pl_songs_limit  = $this->playlist_limit_songs; // from settings, limit of songs in playlist
$purchase_ic     = $this->show_prch_icon; // from settings, show or not purchase ic
$more_s = '';

$this->id = isset($_GET['i']) ? $this->db->real_escape_string($_GET['i']) : '';
$play = isset($_GET['play']) ? '1' : '';
if (!isset($_SESSION['playcountup']))
    $_SESSION['playcountup'] = array();



    if (empty($this->id) || !is_numeric($this->id))
        die('The playlist ID '.$this->id.' not found.');


    
    if (isset($_GET['upload_succes'])):
        $display         = 'block';
        $count_upl_songs = $_GET['upload_succes'];
        if ($count_upl_songs > 1)
            $more_s = 's';
    endif;


    $c = 0; // a simple condition
    
    // construct header
    $this->build_header($this->collection_page_name,$this->collection_page_height);
    
    $sql = "SELECT  m.*,pp.*,p.id,p.originalpid,p.added,p.name,p.owner,p.favorite_cover,COUNT(pp.trackid)
            FROM ".nobil_om_playlists." p
         inner join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id
         inner join ".nobil_om_songs." m on m.id = pp.trackid
         WHERE p.id=" . $this->id . "
          group by pp.trackid ORDER BY pp.position ASC, pp.id DESC LIMIT " . $pl_songs_limit;
    
    
    $query = $this->__om_query($sql);
    $count = count($query);
    
    $r_data = $this->getCollectionTracksDetails($this->id); // get the tracks details of respective collection
    $r_data = explode('~*~', $r_data);
    
// assign loop to smarty
$this->inject_html->assign('query', $query);
    
// assign variables to smarty
$this->inject_html->assign('this', $this);
$this->inject_html->assign('count', $count);
$this->inject_html->assign('get_playlist_id', $r_data[0]);
$this->inject_html->assign('get_playlist_name', urldecode($r_data[1]));
$this->inject_html->assign('get_playlist_cover', urldecode($r_data[2]));
$this->inject_html->assign('get_playlist_owner', $r_data[3]);
$this->inject_html->assign('get_playlist_plcount', $r_data[4]);
$this->inject_html->assign('get_playlist_trcount', $r_data[5]);
$this->inject_html->assign('get_playlist_original_id', $r_data[6]);
$this->inject_html->assign('get_playlist_original_owner', $r_data[7]);
$this->inject_html->assign('pl_songs_limit', $pl_songs_limit);
$this->inject_html->assign('display', $display);
$this->inject_html->assign('count_upl_songs', $count_upl_songs);
$this->inject_html->assign('more_s', $more_s);
$this->inject_html->assign('run_update', 0);
$this->inject_html->assign('smarty_original_pl_id', 0);
$this->inject_html->assign('sortable', '');
$this->inject_html->assign('play', $play);
$this->inject_html->assign('c', $c); // simple condition

 // listened collections just once is counted
 if (!in_array($r_data[0], $_SESSION['playcountup'])) {
    $this->__om_query_update("update ".nobil_om_playlists." set `playcount`=playcount+1 where `playcount`!='-0' and id = " . $r_data[0]);
    $_SESSION['playcountup'][] = $r_data[0];
 }

if ($r_data[7] === $this->USER['id'] || ($r_data[4] === '-0' && $r_data[3] === $this->USER['id'])) {
$smarty_get_playlist_original_id = ($r_data[4] === '-0' && !$r_data[6] ? $r_data[0] : $r_data[6]);
//assign new variables to smarty
$this->inject_html->assign('run_update', 1);
$this->inject_html->assign('smarty_original_pl_id', $smarty_get_playlist_original_id);
if ($r_data[4] !== '-0')
 $this->__om_query_update("update ".nobil_om_playlists." set `updates`='no' where playcount!='-0' and `id`=" . $r_data[6]);
}

// display it
$this->inject_html->display('../template/playlist/my_playlists.html');   

    // close html content
    $this->close_html();

} // END getMyPlaylist()


// get the tracks details of respective collection
public function getCollectionTracksDetails($coll_id){

    $originalpid   = '0';
    $originalowner = '0';
    $query        = $this->__om_query("
                         SELECT p.name,p.id,p.favorite_cover,pp.trackid, p.owner 
                         ,po.owner as ow, po.id as poid, p.playcount, COUNT(pp.trackid) FROM ".nobil_om_playlists." p 
                         left join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id 
                     	 left join ".nobil_om_playlists." po on po.originalpid = p.id and po.owner = '" . $this->USER['id'] . "'
                         where p.id=" . $coll_id);
    foreach($query as $result)
    $row = $result;
    
    $cover         = $row['favorite_cover'];
    $originalpid   = $row['poid'];
    $originalowner = $row['ow'];
    
    return $row['id'] . '~*~' . $row['name'] . '~*~' . $cover . '~*~' . $row['owner'] . '~*~' . $row['playcount'] . '~*~' . $row['COUNT(pp.trackid)'] . '~*~' . $originalpid . '~*~' . $originalowner;


} // END getCollectionTracksDetails()


// Top 20 collections in playlists page
private function getPublicPlaylists(){

    
    $title  = $this->playlists_page_title; // name of page in header 
    $height = $this->playlists_page_height; // height of page, NOTE: the page are resize automaticially by page height
    $this->build_header($title,$height); // get header
  
    $sql = "select  p.*, COUNT(pp.trackid) as songs_count from ".nobil_om_playlists." p 
            inner join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id
            where p.playcount !='-0' and p.favorite_cover != '' and p.favorite_cover IS NOT NULL group by p.id having COUNT(pp.trackid) >= '$this->playlists_having_tr'
            ORDER BY p.added,p.playcount DESC LIMIT " . $this->limit_of_playlists;



    // run query
    $query = $this->__om_query($sql);


    // assign LOOP to smarty 
    $this->inject_html->assign('rows', $query);

// assign to smarty
$this->inject_html->assign('this', $this);
$this->inject_html->assign('days', $this->int_date_new_pl); // get days interval for add new emblem to the playlist


// display it
$this->inject_html->display('../template/playlist/public_playlists.html');    

// close html content 
$this->close_html();

} // END getPublicPlaylists()




// END PLAYLISTS 



// ------------------------------ PURCHASED SONGS -------------------------

public function Downloads() {

// build header
$this->build_header($this->downloaded_page_title,$this->downloaded_page_height);

$sql = "select m.* from ".nobil_om_purchased." b, ".nobil_om_songs." m where b.user='" . $this->USER['id'] . "' and m.id=b.song order by id desc";
$query = $this->__om_query($sql);
$count = count($query);

// assign foreach loop to smarty, only if user have a purchased songs
$this->inject_html->assign('rows', $query);
// assign vars to smarty
$this->inject_html->assign('count', $count); // get count of purchased songs
$this->inject_html->assign('_COOKIE', $_COOKIE); // cookie

// if user haven't purchased song, show one track who avalaible for purchase
if($count <= 0):
$sql_b = "select * from ".nobil_om_songs." where `language`='$this->show_prch_icon' order by rand() limit 1";
$query_b = $this->__om_query($sql_b);
$this->inject_html->assign('random_song', $query_b);
endif;

// display it
$this->inject_html->display('../template/purchased/purchased.html'); 

// footer
$this->close_html();

}

// When user has purchased a song, and want to download it for free
public function download_song($file){
 
if (!$file) { // file does not exist
    die('Sorry, the file has been deleted or corrupted.');
} else {
    $song_file = $this->host . $this->musicpth . $this->files_dir . $file;

    $old_name = $song_file;
    $new_name =  $file;
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=$new_name");
    header("Content-Type: application/zip");
    header("Content-Transfer-Encoding: binary");
    
    // read the file from disk
    readfile($old_name);
}

} //  END Downloads()


// ------------------------------ # RADIO  -------------------------
public function Radio(){

// if request is empty
if (isset($_GET['station'])) {
    $get_radio = $_GET['station'];
    $this->getRadioSongs($get_radio);
    exit;
}


$purchase_ic = $this->show_prch_icon;
$SQL = "SELECT *, COUNT(id) as b FROM ".nobil_om_songs." group by genre having b > 5 order by added desc";
$query = $this->__om_query($SQL);

// assign foreach loop to smarty
$this->inject_html->assign('rows', $query);

// assign objects to smarty
$this->inject_html->assign('defaultcover', $this->defaultCover); // get default cover for song
$this->inject_html->assign('this', $this); // get default cover for song
//$this->inject_html->assign('radio_station_name', 'replaceRadioName'); // get default cover for song
//$this->inject_html->assign('radio_station_white_space', 'replaceRadioWhiteSpace'); // get default cover for song


// display it
$this->inject_html->display('../template/radio/radio.html');

} // END Radio()

//replace the [unknown & other] radio name with your custom radio station name
public function replaceRadioName($radio_name){

    $radio      = str_replace('Other', $this->other_radio, $radio_name);
    $radio      = str_replace('unknown', $this->unknown_radio, $radio);
    return $radio;  
  
}

// replace the white_space in radio id
public function replaceRadioWhiteSpace($string){
return str_replace(' ', '', $string);
}

public function getRadioSongs($g){

      
    if (!$g || is_numeric($g))
        die('0');
  
    

    $sql = "SELECT * FROM ".nobil_om_songs." where genre = '$g' order by RAND() desc limit 200";
    $query = $this->__om_query($sql);

// assign foreach loop to smarty
$this->inject_html->assign('rows', $query);

$this->inject_html->assign('d_ic', $this->show_prch_icon);
    
return $this->inject_html->display('../template/radio/get_radio_songs.html');

}

public function getRadioArtists($genre){
    
    $query = "SELECT artist FROM ".nobil_om_songs." where genre = '$genre' group by artist order by added desc limit 10";
    $result = $this->__om_query($query);
    
    $artists = array();
    
    foreach ($result as $row)
         $artists[] = $row['artist'];
          
    return join(',&nbsp;', $artists);

}

// -------------------------------- END #RADIO --------------------------------


// ------------------- START AJAX REQUESTS ------------------------------------

public function __store_ajax_variables(){


$this->action = (isset($_POST['action']) ? $this->db->real_escape_string($_POST['action']) : '');
$this->trackid = (isset($_POST['track']) ? $this->db->real_escape_string($_POST['track']) : 0);

// $a & $b & $c are converted with iconv, from UTF-8 to CP1251
$this->b = (isset($_POST['b']) ? $this->db->real_escape_string($_POST['b']) : '');
$this->c = (isset($_POST['c']) ? $this->db->real_escape_string($_POST['c']) : '');
$this->d = (isset($_POST['d']) ? $this->db->real_escape_string($_POST['d']) : '');

}

// construct ajax request
public function __get_ajax_request($b = false){

// build class
$call_ajax = new _ajax_req;

if($b):
$call_ajax->buy_song($b);
exit;
endif;

// NOTE: the response 0 is replaced to informational text in javascript
$this->__store_ajax_variables();

if (!$this->USER['id'])
    die('0'); 

if ($this->action != 'myMusCount') {
    if ($this->action != 'add_pl_search') {
        if (!is_numeric($this->trackid))
            die('0');
    }
};


// for the purpose of each function, see the _ajax_request.class.php file
switch($this->action){

default: die('0'); break;
case 'buy': $call_ajax->buy_song(); break;
case 'trackSaveChanges': $call_ajax->updateSongInfo(); break;
case 'myMusCount': $call_ajax->getMySongsCount(); break;
case 'getFriends': $call_ajax->getFriends(); break;
case 'editCreatedPlaylist': $call_ajax->editCreatedPlaylists(); break;
case 'died_covers': $call_ajax->died_covers(); break; 
case 'send_feedback': $call_ajax->send_feedback(); break; 
case 'update_history':  $call_ajax->updateHistory(); break; 
case 'deletePlaylist':  $call_ajax->deletePlaylist(); break; 
case 'add_pl_search':  $call_ajax->addNewCollection(); break; 
case 'load_scroll_more_songs':  $call_ajax->scrollEvent_loadData(); break;
case 'createNewPlaylist':   $call_ajax->createNewPlaylist(); break;
case 'addToPlaylist': $call_ajax->addSongsToPlaylist(); break;
case 'checkMyCollection': $call_ajax->checkMyCollection(); break;
case 'checkMyMusic': $call_ajax->checkMyMusic(); break;
case 'update_playlist_cover': $call_ajax->updatePlaylistCover(); break;
case 'get_playlist_notif': $call_ajax->getForUpdatedPlaylists(); break;
case 'checkPlaylists':  $call_ajax->getMyPlaylists(); break;
case 'add_collection': $call_ajax->addCollection(); break;
case 'addTrack': $call_ajax->addTrack(); break;
case 'restore': $call_ajax->restoreSong(); break;
case 'delete': $call_ajax->deleteSong(); break;
case 'sortmy': $call_ajax->sortSongs(); break;
case 'sortpl': $call_ajax->sortPlaylistSongs(); break;
case 'Lyrics': $call_ajax->getLyrics(); break; // v1.5 
case 'lyricDropDown': $call_ajax->getLyricsDropDown(); break; // v1.5
case 'payment': $call_ajax->getService(); break; // v1.5
case 'Sharing': $call_ajax->EnableSharingDropDown($this->trackid,$this->b,$this->c); break; // v1.5
case 'Last_Files': $call_ajax->EnableLFilesDropDown(); break; // v1.5
case 'updRecommendations': $call_ajax->getRecommendationsTracks($this->b); break;

}


}



// my music page
public function Mymusic(){


$this->action          = '';
$this->display         = 'none';
$this->count_upl_songs = '0';
$this->more_s          = '';

$this->action          = (isset($_GET['action']) ? $this->db->real_escape_string($_GET['action']) : '');
$this->count_upl_songs = (isset($_GET['c']) && $this->action === '1' ? $this->db->real_escape_string($_GET['c']) : '0');

// add 's' to song word,if uploaded more than one song
if ($this->count_upl_songs > 1)
    $this->more_s = 's';

// go to history page
if ($this->action === 'history') {
return $this->getHistory();
exit;
}

// construct header
$this->build_header($this->mymusic_page_title,$this->mymusic_page_height);


// go to music edit page
if ($this->action === 'playListEdit') {
     return $this->editMymusic();
    exit;
}


// if are uploaded songs, show count of uploaded
if ($this->action === '1'):
    $this->display         = 'block';
    $this->count_upl_songs = $this->db->real_escape_string($_GET['c']);
endif;

// get count of user's music
$this->num_mus = count($this->__om_query("select id from ".nobil_om_my_music." where `owner`='" . $this->USER['id']."' group by id"));


// assign vars to smarty
$this->inject_html->assign('count_a', $this->num_mus); // send to html file count of user's music
$this->inject_html->assign('page_name', $this->mymusic_page_title); // page title, appear in header
$this->inject_html->assign('page_height', $this->mymusic_page_height); // page height

// if user have music
if($this->num_mus):
    
    // sql query
    $sql = "SELECT m1.*,m2.position,m2.added FROM ".nobil_om_songs." m1 
             INNER JOIN (
            SELECT musid,position,id,added
            FROM ".nobil_om_my_music."
            where owner='" . $this->USER['id'] . "'
            ) m2 ON m1.id = m2.musid group by m1.id ORDER BY m2.position ASC,m2.added DESC limit " . $this->my_mus_songs_limit;

    $query = $this->__om_query($sql);

// assign LOOP to smarty 
$this->inject_html->assign('query', $query); // sql query
// assign variables to smarty
$this->inject_html->assign('count_b', count($query)); // count of music
$this->inject_html->assign('condition', 0); // simple condition
$this->inject_html->assign('defaultCover', $this->defaultCover); // default cover
$this->inject_html->assign('this', $this);

endif;

// display it
$this->inject_html->display('../template/my_music/songs.html');

}

/// my playlists
public function myPlaylists(){


// get the user's playlists
$pl_query = $this->__om_query("SELECT distinct p.*,COUNT(pp.trackid) as s_count
                 FROM ".nobil_om_playlists." p
                 left join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id OR pp.playlistid = p.originalpid 
                 WHERE  p.owner = '" . $this->USER['id'] . "'
                  group by p.id ORDER BY p.id DESC");


// assign LOOP to smarty 
$this->inject_html->assign('query', $pl_query);

//assign variables to smarty
$this->inject_html->assign('pl_count', count($pl_query)); // count of playlists
$this->inject_html->assign('this', $this);


// display it
$this->inject_html->display('../template/my_music/collections.html');

 // close html content
 $this->close_html(); 

}


// edit my music
public function editMymusic() {



$sql = "SELECT m1.*,m2.position,m2.added FROM ".nobil_om_songs." m1 
    INNER JOIN (
        SELECT musid,position,id,added
        FROM ".nobil_om_my_music."
        where owner='" . $this->USER['id'] . "'
        ) m2 ON m1.id = m2.musid ORDER BY m2.position ASC,m2.added DESC limit 350";

$query  = $this->__om_query($sql); 
                   

// assign LOOP to smarty 
$this->inject_html->assign('query', $query);

//assign variables to smarty
$this->inject_html->assign('condition', 0);
$this->inject_html->assign('this', $this);


// display it
$this->inject_html->display('../template/my_music/edit.html');

 // close html content
 $this->close_html(); 

}

// go to history page
public function getHistory() {

    // construct header
    $this->build_header($this->history_page_title,$this->history_page_height);

  
    // ----------- START Recently played content ------------

$sql = "select h.*,m.*,m.id as s_id from ".nobil_om_history." h, ".nobil_om_songs." m
     where h.song = m.id and h.user = '" . $this->USER['id'] . "' order by h.listen desc limit " . $this->history_limit;
$query = $this->__om_query($sql);


// delete data older than two months
$two_months = strtotime($this->history_clean_interval);
$clean      = $this->__om_query_delete("DELETE FROM ".nobil_om_history." WHERE `user` = '" . $this->USER['id'] . "' and listen < '$two_months'");

// assign LOOP to smarty 
$this->inject_html->assign('query', $query);

//assign variables to smarty
$this->inject_html->assign('count', count($query));
$this->inject_html->assign('this', $this);
$this->inject_html->assign('condition', date('d') - 1); // simple condition for add date after each day
$this->inject_html->assign('curr_year', date('Y')); // current year
$this->inject_html->assign('today', date('d')); // today
$this->inject_html->assign('yday', (date('d')-1)); // yesterday

// display it
$this->inject_html->display('../template/my_music/history.html');


    // close html content
    $this->close_html();
    exit;

}


// ------------------ USERS / FRIENDS --------------------------------
public function Users(){


$this->user_id = $limit_tracks = "";

if (isset($_GET['user']))
    $this->user_id = $this->db->real_escape_string($_GET['user']);

// query user details, name, family
$userdetails = $this->__om_query("SELECT id,name,surname FROM ".nobil_om_users." where `id`=" . $this->user_id);


$purchase_ic  = $this->show_prch_icon;

if (!$userdetails)
    die('The user has not found');

// query for user's playlists
$pl_query = $this->__om_query(" SELECT distinct p.*,COUNT(pp.trackid) as s_count
                 FROM ".nobil_om_playlists." p
                 left join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id OR pp.playlistid = p.originalpid 
                 WHERE  p.owner = " . $this->user_id . "
                  group by p.id HAVING(s_count) > 0 ORDER BY p.id DESC");


$limit_tracks = count($pl_query) > 0 ? 'limit '.$this->friends_songs_limit : 'limit 90';

// query for user's songs
$s_query = $this->__om_query("select mm.owner,mm.musid,m.* from ".nobil_om_my_music." mm, ".nobil_om_songs." m WHERE m.id=mm.musid and mm.owner = " . $this->user_id . " group by m.id order by m.id desc " . $limit_tracks);


// create the user full name
foreach($userdetails as $res)
$this->user_full_name = $res['name'].'&nbsp;'.$res['surname']; 


// construct header
$this->build_header($this->user_full_name,$this->users_page_height);

/// ============== Assign data to smarty 
// assign LOOP to smarty 
$this->inject_html->assign('s_query', $s_query);

// assign LOOP for user's playlists to smarty 
$this->inject_html->assign('pl_query', $pl_query);


//assign variables to smarty
$this->inject_html->assign('purchase_ic', $this->show_prch_icon);
$this->inject_html->assign('this', $this);
$this->inject_html->assign('title', $this->user_full_name); // full name of user
$this->inject_html->assign('limit_tracks', 'limit '.$this->friends_songs_limit); // limit of songs in user page, the limit number is setted in configuration file
$this->inject_html->assign('condition', 0); // simple condition to separate data from foreach loop
$this->inject_html->assign('songs_count', count($s_query)); // count of friend's songs
$this->inject_html->assign('friend_songs_limit', $this->friends_songs_limit); // limit per page of friend's songs

// display it
$this->inject_html->display('../template/users/users.html');

// close html content
$this->close_html();

}

// get the respective user's collections
public function getUserPlaylists(){

// assign object to smarty 
$this->inject_html->assign('this', $this);
$this->inject_html->assign('condition', 0);

// display it
$this->inject_html->display('../template/users/playlists.html');
}

// ------------------------------- POPUP LAYERS ------------------------------

// construct layer popups
public function enablePopup(){

$this->action = $this->song_id = $l_artist = $l_song_name = "";

if(isset($_POST['action']))
$this->action = $this->db->real_escape_string($_POST['action']);
else die('0'); // if request action is empty

if(isset($_POST['track']))
$this->song_id = $this->db->real_escape_string($_POST['track']);

if(isset($_POST['song']))
$l_song_name = $this->db->real_escape_string($_POST['song']);

if(isset($_POST['artist']))
$l_artist = $this->db->real_escape_string($_POST['artist']);

// assign to smarty
$this->inject_html->assign('song_id', $this->song_id);

 switch ($this->action) {

  case 'confirmation': $this->inject_html->display('../template/popups/p_confirm.html');  break; // prompt confirmation popup
  case 'get_video': 

$q = $this->__om_query("select artist,title from ".nobil_om_songs." where `video`='$this->song_id' limit 1");
foreach($q as $res){
$l_artist = $res['artist'];
$l_song_name   = $res['title'];
}

// assign to smarty
$this->inject_html->assign('artist_name', $l_artist); // artist name
$this->inject_html->assign('song_name', $l_song_name); // song name



$this->inject_html->display('../template/popups/p_video.html'); 

 break; // enable popup for music video
  case 'Lyrics': $this->inject_html->display('../template/popups/p_lyrics.html');  break;  // Lyrics [v1.5]
  case 'Payments': $this->inject_html->display('../template/popups/p_payment.html');  break;  // Payments [ v1.5]

  // enable popup for showing images from feedback 
  case 'feedback_img':
  
  // explode data
  list($img,$descr,$subj) = explode('~*~', $this->song_id);

  // assign variable to smarty
  $this->inject_html->assign('image', $img);
  $this->inject_html->assign('description', $descr);
  $this->inject_html->assign('subject', $subj);
  // run popup 
  $this->inject_html->display('../template/popups/p_feedback_images.html');
  break;
  
  // enable create popup for send feedback
  case 'feedback':
  $user = $this->__om_query("select name,surname,email from ".nobil_om_users." where `id`='".$this->USER['id']."'");
  foreach($user as $result)
  $r = $result;

  // assign user details to smarty
  $this->inject_html->assign('user_name', $r['name']); // user name
  $this->inject_html->assign('user_family', $r['surname']); // user family
  $this->inject_html->assign('user_email', $r['email']); // user email
  $this->inject_html->assign('host', $this->host); // host
  // run popup 
  $this->inject_html->display('../template/popups/p_feedback.html');
  break;

  // enable popup for buy song
  case 'download_song':

  $query = $this->__om_query("select artist,title,cover from ".nobil_om_songs." where `id`=".$this->song_id);

  // assign variables to smarty
  $this->inject_html->assign('download_price', $this->download_song_price); // price of song
  $this->inject_html->assign('download_curr', $this->download_song_currency); // currency
  $this->inject_html->assign('song_id', $this->song_id); // requested song id

  // assign song details to smarty
  foreach($query as $result): 
  $this->inject_html->assign('artist', $result['artist']); // artist name
  $this->inject_html->assign('song_name', $result['title']); // song name
  $this->inject_html->assign('cover', $result['cover']); // song cover
  endforeach;

  // run popup 
  $this->inject_html->display('../template/popups/p_download.html');

  break;

  // enable popup for update song details, [ album, artist, song name ]
  case 'editTrack':

   $sql = "Select m.id,m.artist,m.title,m.album,m.cover,mm.position,mm.added,mm.owner,mm.musid from ".nobil_om_songs." m, ".nobil_om_my_music." mm where m.id='$this->song_id' AND mm.owner='".$this->USER['id']."' limit 1";
   $query = $this->__om_query($sql);

   // if missing song, run javascript error box
   if (!$query) 
    die('<script>jQuery.windowMusic("error","","The track has not found in our database");</script>');

  $this->inject_html->assign('allow_change_cover', 0);
  // assign song details to smarty
  foreach($query as $result): 
  $this->inject_html->assign('s_id', $result['id']); // song id
  $this->inject_html->assign('s_artist', $result['artist']); // singer name
  $this->inject_html->assign('s_title', $result['title']); // song name
  $this->inject_html->assign('s_album', $result['album']); // song album
  $this->inject_html->assign('s_cover', $result['cover']); // cover
  $this->inject_html->assign('allow_change_cover', !strstr($result['cover'],str_replace("..","",__FILE_COVER_DIR)) ? 1 : 0);
  endforeach;

  // run popup 
  $this->inject_html->display('../template/popups/p_edit_song.html');

 break;
 
  // enable popup for upload files
  case 'uploadFiles':

  $this->inject_html->assign(['host' => $this->host, 'this' => $this]); // song album

  // run popup 
  $this->inject_html->display('../template/popups/p_upload.html');

 break;

  // enable popup for create new playlist
  case 'addPlaylist':

$sql = "SELECT m1.*,m2.position,m2.added FROM ".nobil_om_songs." m1 
INNER JOIN (
    SELECT musid,position,id,added
    FROM ".nobil_om_my_music."
    where owner='".$this->USER['id']."'
    ) m2 ON m1.id = m2.musid ORDER BY m2.position ASC,m2.added DESC";
$query = $this->__om_query($sql);

  // assign query result to smarty
  $this->inject_html->assign('query', $query);

  // run popup 
  $this->inject_html->display('../template/popups/p_collection.html');

break;
 

 default: 
   die('0');

} // switch statement


} // END enablePopup()

// ------------------------------- UPLOAD FILES -----------------------------
 

// upload files
public function Upload(){

//define variables
$count   = 0;
$searchG = "bad";
$singer  = $this->singer; // from settings
$this->vimeo   = new phpVimeo($this->VIMEO_APP_ID, $this->VIMEO_APP_SECRET);
$artist  = $song = $album = $year = $comment = $genre = $recCover = $srchim = $message = $b0 = $db_video = $ex_v = $id_video = $cover_file = "";
$dir_cov = str_replace('..','',__FILE_COVER_DIR);

// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
    
    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $this->max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->valid_formats)) {
                $message[] = "$name is not a valid format, only " . $this->valid_formats[1];
                continue; // Skip invalid file formats
                
            } else {
                
                $temp    = explode('.', $_FILES['files']['name'][$f]);
                $newName = mt_rand().mt_rand().mt_rand(). '.' . end($temp);

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $this->output_dir . $newName)) {
                    $count++; // Number of successfully uploaded files
                    
                    /* analyze the file and get details of it */
                    
                    $name_m   = $_FILES["files"]["name"][$f];
                    $name_n   = explode(".", $name_m);
                    $filename = $newName;
                    $nameb    = explode(".", $filename);
                    
                    // build getId3
                    $getID3 = new getID3;
                    $getID3->encoding = 'UTF-8';      

                    $uploadedFile = $this->output_dir . $filename;
                    $ThisFileInfo = $getID3->analyze($uploadedFile);
                    
		    // check if file contain tags and bitrate not less 128kbs
		    if(isset($ThisFileInfo['error'][0]) || (!$ThisFileInfo['audio']['bitrate'] || $ThisFileInfo['audio']['bitrate'] < 128000)){
		    @unlink($uploadedFile);
		    die('Sorry, the file ['.$name.'] should meet the following technical requirements: bit rate not less than
			 128kbps, sampling frequency not less than 44,1 kHz.');
		    }
                    
                    if (isset($ThisFileInfo['tags'][0]['id3v1']['title'][0])) {
                        $song = $this->ch($this->esc($ThisFileInfo['tags'][0]['id3v1']['title'][0]));
                    } else if (isset($ThisFileInfo['tags']['id3v2']['title'][0])) {
                        $song = $this->ch($this->esc($ThisFileInfo['tags']['id3v2']['title'][0]));
                    } else {
                        $song = "unknown";
                    }
                    
                    if (isset($ThisFileInfo['tags']['id3v2']['artist'][0])) {
                        $artist = $this->ch($this->esc($ThisFileInfo['tags']['id3v2']['artist'][0]));
			$artist_ch = $ThisFileInfo['tags']['id3v2']['artist'][0];
                    } else if (isset($ThisFileInfo['tags']['id3v1']['artist'][0])) {
                        $artist = $this->ch($this->esc($ThisFileInfo['tags']['id3v1']['artist'][0]));
			$artist_ch = $ThisFileInfo['tags']['id3v1']['artist'][0];
                    } else {
                        $artist = "Unknown Artist";
			$artist_ch = $artist;
                    }
                    
                    if (isset($ThisFileInfo['tags']['id3v2']['album'][0])) {
                        $album = $this->ch($this->esc($ThisFileInfo['tags']['id3v2']['album'][0]));
                    } else if (isset($ThisFileInfo['tags']['id3v1']['album'][0])) {
                        $album = $this->ch($this->esc($ThisFileInfo['tags']['id3v1']['album'][0]));
                    } else {
                        $album = "unknown album";
                    }
                    
                    if (isset($ThisFileInfo['tags']['id3v1']['year'][0])) {
                        $year = $this->esc($ThisFileInfo['tags']['id3v1']['year'][0]);
                    } else if (isset($ThisFileInfo['tags']['id3v2']['year'][0])) {
                        $year = $this->esc($ThisFileInfo['tags']['id3v2']['year'][0]);
                    } else {
                        $year = "unknown";
                    }
                    
                    
                    if (isset($ThisFileInfo['tags']['id3v2']['comment'][0])) {
                        $comment = $this->ch($this->esc($ThisFileInfo['tags']['id3v2']['comment'][0]));
                    } else if (isset($ThisFileInfo['tags']['id3v1']['comment'][0])) {
                        $comment = $this->ch($this->esc($ThisFileInfo['tags']['id3v1']['comment'][0]));
                    } else {
                        $comment = $artist;
                    }
                    
                    if (isset($ThisFileInfo['tags']['id3v2']['genre'][0])) {
                        $genre = $this->esc($ThisFileInfo['tags']['id3v2']['genre'][0]);
                    } else if (isset($ThisFileInfo['tags']['id3v1']['genre'][0])) {
                        $genre = $this->esc($ThisFileInfo['tags']['id3v1']['genre'][0]);
                    } else {
                        $genre = "unknown";
                    }
                    
                    if (isset($ThisFileInfo['id3v2']['COMM'][0]['languagename'])) {
                        $language = $this->esc($ThisFileInfo['id3v2']['COMM'][0]['languagename']);
                    } else {
                        $language = "unknown";
                    }
                    
                    if (isset($ThisFileInfo['playtime_string']))
                        $duration = $this->esc($ThisFileInfo['playtime_string']);
                    else
                        $duration = "unknown";
                    
// create cover from file [implemented in v1.5]
if(!file_exists(__FILE_COVER_DIR.$this->rplchr($this->clean_string($artist)).'___'.$this->rplchr($this->clean_string($album)).'.png')){
if (isset($getID3->info['id3v2']['APIC'][0]['data'])) { 
   $cover_file = $getID3->info['id3v2']['APIC'][0]['data']; 
} elseif (isset($getID3->info['id3v2']['PIC'][0]['data'])) { 
   $cover_file = $getID3->info['id3v2']['PIC'][0]['data']; 
} else { 
   $cover_file = ''; 
} 
if (isset($getID3->info['id3v2']['APIC'][0]['image_mime'])) { 
   $mimetype = $getID3->info['id3v2']['APIC'][0]['image_mime']; 
} else { 
   $mimetype = 'image/jpeg';
} 

if (!empty($cover_file)) {


// Send file 
header("Content-Type: " . $mimetype); 

if (isset($getID3->info['id3v2']['APIC'][0]['image_bytes'])) { 
    header("Content-Length: " . $getID3->info['id3v2']['APIC'][0]['image_bytes']); 
} 
if(file_put_contents(__FILE_COVER_DIR.$this->rplchr($this->clean_string($artist)).'___'.$this->rplchr($this->clean_string($album)).'.png', $cover_file)){
$recCover = '/music/'.$dir_cov.$this->rplchr($this->clean_string($artist)).'___'.$this->rplchr($this->clean_string($album)).'.png';
}else
$recCover = $this->defaultCover;

} else {


                    // receive name of the cover and send in google
                    if ($artist !== $name_n[0] && $artist !== 'Unknown Artist') {
                        $searchG      = "ok";
                        $cover_search = $this->es_rus($artist_ch);///$this->rplchr($this->rpl($artist));
                    } else if ($song != "unknown") {
                        $searchG      = "bad";
                        $cover_search = $this->rplchr($this->rpl($song));
                    } else if ($album != "unknown") {
                        $searchG      = "bad";
                        $cover_search = $this->rplchr($this->rpl($album));
                    } else {
                        $searchG = "bad";
                        $b0      = $this->rplchr($this->rpl($artist));
                        if (!empty($b0)) {
                            $searchG      = "bad";
                            $cover_search = $this->rplchr($this->rpl($artist));
                        }
                        
                    }
                                      
                    
                    // get cover from rapidapi
                    if ($searchG === 'bad') {
                       
                        
                        $recCover = $this->defaultCover;
                    }
                    
} // else [ if file has no cover ]

}else // else [ if for current uploading song exist already cover ]
$recCover = '/music/'.$dir_cov.$this->rplchr($this->clean_string($artist)).'___'.$this->rplchr($this->clean_string($album)).'.png';

                    // get video from vimeo
                    $v_art  = preg_replace("/\([^)]+\)/", "", $artist);
                    $v_song = preg_replace("/\([^)]+\)/", "", $song); 
                  /*  if ($v_art !== 'Unknown Artist' && $v_song !== 'unknown')
                        $video = $this->vimeo_get_video($this->rplchr($v_art) . ' ' . $this->rplchr($v_song));
                    else
                        $video = '0';*/
                    $video = '0';
                    if ($video !== '0' && array_key_exists('0', $video) && $video['0']->embed_privacy == 'anywhere') {
                        $video       = $video['0'];
                        $id_video    = $video->id;
                        $title_video = $video->title;
                    } else if ($video !== '0' && array_key_exists('1', $video) && $video['1']->embed_privacy == 'anywhere') {
                        $video       = $video['1'];
                        $title_video = $video->title;
                        $id_video    = $video->id;
                    } else if ($video !== '0' && array_key_exists('2', $video) && $video['2']->embed_privacy == 'anywhere') {
                        $video       = $video['2'];
                        $id_video    = $video->id;
                        $title_video = $video->title;
                    }
                    
                    if ($id_video && $title_video)
                        $db_video = strstr(strtolower($title_video), strtolower(trim($v_song, " "))) ? $id_video : '0';
                    
                    $path     = $newName;
                    $time     = $this->esc($duration);
                    $cover    = $this->esc($recCover);
                    $title    = $song;
                    $added    = time();
                    $uploader = $this->esc($this->USER['id']);
                    $method   = $_POST['uploadin'];
		    $pl_covr  = isset($_POST['pl_cover']) ? $_POST['pl_cover'] : '';
		    $artist   = $artist !== 'Unknown Artist' ? $artist : $name;
		    $artist_x   = str_replace('+', '&', $artist);
		    $song     = str_replace('+', '&', $song);
		    $album    = str_replace('+', '&', $album);
		    $artist   = str_replace('&amp;', '&', $artist_x);

		    // Escape artist, album ,song
         	$artist   = $this->core->test_input($artist);
		    $song     = $this->core->test_input($song);
		    $album    = $this->core->test_input($album);


                    //insert into db                   
                    $insert     = $this->__om_query_insert("insert into ".nobil_om_songs." set 
                          				   `artist`='$artist',`title`='$song',`time`='$time',`genre`='$genre',`album`='$album',`cover`='$cover',`video`='$db_video',`language`='$language',`year`='$year',`comment`='$comment',`added`='$added',`uploader`='$uploader',`path`='$path'");
                    $insertedId = $insert; // new inserted id
                    
                    if ($method === 'mymusic'){
                        $insertIntoMyMusic = $this->__om_query_insert("insert into ".nobil_om_my_music." SET `musid`='$insertedId',`uploader`='$uploader',`added`='$added',`owner`='" . $this->USER['id']."'");
						$this->toFeed($insertedId);
                  }  else {

                        $insertIntoPlaylist_a = $this->__om_query_insert("insert into ".nobil_om_playlist_pos." SET `trackid`='$insertedId',`playlistid`='$method'");
                        $insertIntoPlaylist = $this->__om_query_update("update ".nobil_om_playlists." SET `updates`='yes' where `originalpid`='$method'");
			$this->toFeed($insertedId,$method);
			// set to playlist cover if it haven't
			if(($pl_covr == $this->collection_img || $pl_covr == $this->defaultCover || !$pl_covr) && $cover)
			$this->__om_query_update("update ".nobil_om_playlists." SET `favorite_cover`='$cover' where id=".$method);

                    }
                    if (!$insertedId) {
                        @unlink($uploadedFile);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    }
                    
                    
                }
            }
        }
    }
}

if ($message) {
    
    foreach ($message as $msg)
        echo $msg;
    
} else
    echo 'OK';


}

// get covers in google, cUrl must be enabled
private function google_get_cover($key)
{

    $url  = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' . $key . $this->singer;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);

    //decoding request
    $result = json_decode($data, true);
    
    return $result;
}

private function es_rus($str){

$x_a = mb_convert_encoding($str, 'iso-8859-1', 'utf-8');

if($this->isRussian($this->ch($str)) <= 3)
return $this->rplchr($this->ch($this->rpl($str)));
else
return $this->rplchr($this->rpl($x_a));

}

// get video clips in vimeo
private function vimeo_get_video($key)
{

    $videos = $this->vimeo->call('vimeo.videos.search', array(
        'query' => $key,
        'page' => 1,
        'per_page' => 3
    ));
    $v = $videos->videos->video;

    return $v;
    
}


// generate a new name for files
private function generateRandomString($length = 50, $filename)
{
    
    $fib          = $this->rpl($filename, 0);
    $filename     = str_replace(array("'","."), "", $fib);
    $fn           = @iconv('UTF-8', 'ISO-8859-1//TRANSLIT//IGNORE', $this->rplchr($filename));
    $fname        = mb_substr($fn, 0, 5); // use mb_substr for multi-byte strings (e.g. UTF-8, UTF-16, etc.)
    $characters   = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $fname . "_" . $randomString;
} 


// escape strings
private function esc($x)
{
    return $this->db->real_escape_string($x);
}

// detect if string contain russian chars
public function isRussian($text) {
   $text = preg_match_all('/&#10[78]\d/', mb_encode_numericentity($text, array(0x0, 0x2FFFF, 0, 0xFFFF), 'UTF-8'), $m);
   return count($m[0]);
}

public function clean_string($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

// replace accented letters [v1.5]
public function l_mb_string($string,$url = 0){

    if (!preg_match('/[\x80-\xff]/', $string))
        return $string;

    $chars = array(
    // Decompositions for Latin-1 Supplement
    chr(195).chr(128) => 'A', chr(195).chr(129) => 'A',
    chr(195).chr(130) => 'A', chr(195).chr(131) => 'A',
    chr(195).chr(132) => 'A', chr(195).chr(133) => 'A',
    chr(195).chr(135) => 'C', chr(195).chr(136) => 'E',
    chr(195).chr(137) => 'E', chr(195).chr(138) => 'E',
    chr(195).chr(139) => 'E', chr(195).chr(140) => 'I',
    chr(195).chr(141) => 'I', chr(195).chr(142) => 'I',
    chr(195).chr(143) => 'I', chr(195).chr(145) => 'N',
    chr(195).chr(146) => 'O', chr(195).chr(147) => 'O',
    chr(195).chr(148) => 'O', chr(195).chr(149) => 'O',
    chr(195).chr(150) => 'O', chr(195).chr(153) => 'U',
    chr(195).chr(154) => 'U', chr(195).chr(155) => 'U',
    chr(195).chr(156) => 'U', chr(195).chr(157) => 'Y',
    chr(195).chr(159) => 's', chr(195).chr(160) => 'a',
    chr(195).chr(161) => 'a', chr(195).chr(162) => 'a',
    chr(195).chr(163) => 'a', chr(195).chr(164) => 'a',
    chr(195).chr(165) => 'a', chr(195).chr(167) => 'c',
    chr(195).chr(168) => 'e', chr(195).chr(169) => 'e',
    chr(195).chr(170) => 'e', chr(195).chr(171) => 'e',
    chr(195).chr(172) => 'i', chr(195).chr(173) => 'i',
    chr(195).chr(174) => 'i', chr(195).chr(175) => 'i',
    chr(195).chr(177) => 'n', chr(195).chr(178) => 'o',
    chr(195).chr(179) => 'o', chr(195).chr(180) => 'o',
    chr(195).chr(181) => 'o', chr(195).chr(182) => 'o',
    chr(195).chr(182) => 'o', chr(195).chr(185) => 'u',
    chr(195).chr(186) => 'u', chr(195).chr(187) => 'u',
    chr(195).chr(188) => 'u', chr(195).chr(189) => 'y',
    chr(195).chr(191) => 'y',
    // Decompositions for Latin Extended-A
    chr(196).chr(128) => 'A', chr(196).chr(129) => 'a',
    chr(196).chr(130) => 'A', chr(196).chr(131) => 'a',
    chr(196).chr(132) => 'A', chr(196).chr(133) => 'a',
    chr(196).chr(134) => 'C', chr(196).chr(135) => 'c',
    chr(196).chr(136) => 'C', chr(196).chr(137) => 'c',
    chr(196).chr(138) => 'C', chr(196).chr(139) => 'c',
    chr(196).chr(140) => 'C', chr(196).chr(141) => 'c',
    chr(196).chr(142) => 'D', chr(196).chr(143) => 'd',
    chr(196).chr(144) => 'D', chr(196).chr(145) => 'd',
    chr(196).chr(146) => 'E', chr(196).chr(147) => 'e',
    chr(196).chr(148) => 'E', chr(196).chr(149) => 'e',
    chr(196).chr(150) => 'E', chr(196).chr(151) => 'e',
    chr(196).chr(152) => 'E', chr(196).chr(153) => 'e',
    chr(196).chr(154) => 'E', chr(196).chr(155) => 'e',
    chr(196).chr(156) => 'G', chr(196).chr(157) => 'g',
    chr(196).chr(158) => 'G', chr(196).chr(159) => 'g',
    chr(196).chr(160) => 'G', chr(196).chr(161) => 'g',
    chr(196).chr(162) => 'G', chr(196).chr(163) => 'g',
    chr(196).chr(164) => 'H', chr(196).chr(165) => 'h',
    chr(196).chr(166) => 'H', chr(196).chr(167) => 'h',
    chr(196).chr(168) => 'I', chr(196).chr(169) => 'i',
    chr(196).chr(170) => 'I', chr(196).chr(171) => 'i',
    chr(196).chr(172) => 'I', chr(196).chr(173) => 'i',
    chr(196).chr(174) => 'I', chr(196).chr(175) => 'i',
    chr(196).chr(176) => 'I', chr(196).chr(177) => 'i',
    chr(196).chr(178) => 'IJ',chr(196).chr(179) => 'ij',
    chr(196).chr(180) => 'J', chr(196).chr(181) => 'j',
    chr(196).chr(182) => 'K', chr(196).chr(183) => 'k',
    chr(196).chr(184) => 'k', chr(196).chr(185) => 'L',
    chr(196).chr(186) => 'l', chr(196).chr(187) => 'L',
    chr(196).chr(188) => 'l', chr(196).chr(189) => 'L',
    chr(196).chr(190) => 'l', chr(196).chr(191) => 'L',
    chr(197).chr(128) => 'l', chr(197).chr(129) => 'L',
    chr(197).chr(130) => 'l', chr(197).chr(131) => 'N',
    chr(197).chr(132) => 'n', chr(197).chr(133) => 'N',
    chr(197).chr(134) => 'n', chr(197).chr(135) => 'N',
    chr(197).chr(136) => 'n', chr(197).chr(137) => 'N',
    chr(197).chr(138) => 'n', chr(197).chr(139) => 'N',
    chr(197).chr(140) => 'O', chr(197).chr(141) => 'o',
    chr(197).chr(142) => 'O', chr(197).chr(143) => 'o',
    chr(197).chr(144) => 'O', chr(197).chr(145) => 'o',
    chr(197).chr(146) => 'OE',chr(197).chr(147) => 'oe',
    chr(197).chr(148) => 'R',chr(197).chr(149) => 'r',
    chr(197).chr(150) => 'R',chr(197).chr(151) => 'r',
    chr(197).chr(152) => 'R',chr(197).chr(153) => 'r',
    chr(197).chr(154) => 'S',chr(197).chr(155) => 's',
    chr(197).chr(156) => 'S',chr(197).chr(157) => 's',
    chr(197).chr(158) => 'S',chr(197).chr(159) => 's',
    chr(197).chr(160) => 'S', chr(197).chr(161) => 's',
    chr(197).chr(162) => 'T', chr(197).chr(163) => 't',
    chr(197).chr(164) => 'T', chr(197).chr(165) => 't',
    chr(197).chr(166) => 'T', chr(197).chr(167) => 't',
    chr(197).chr(168) => 'U', chr(197).chr(169) => 'u',
    chr(197).chr(170) => 'U', chr(197).chr(171) => 'u',
    chr(197).chr(172) => 'U', chr(197).chr(173) => 'u',
    chr(197).chr(174) => 'U', chr(197).chr(175) => 'u',
    chr(197).chr(176) => 'U', chr(197).chr(177) => 'u',
    chr(197).chr(178) => 'U', chr(197).chr(179) => 'u',
    chr(197).chr(180) => 'W', chr(197).chr(181) => 'w',
    chr(197).chr(182) => 'Y', chr(197).chr(183) => 'y',
    chr(197).chr(184) => 'Y', chr(197).chr(185) => 'Z',
    chr(197).chr(186) => 'z', chr(197).chr(187) => 'Z',
    chr(197).chr(188) => 'z', chr(197).chr(189) => 'Z',
    chr(197).chr(190) => 'z', chr(197).chr(191) => 's'
    );

    $string = strtr($url ? urldecode($string) : $string, $chars);

    return $string;
}

// multi-bytes strings
private function ch($x)
{

$original_x = $this->l_mb_string($x);

$x_a = mb_convert_encoding($x, 'iso-8859-1', 'utf-8');

$x   = $x_a ? $x_a : $x;

$x   = mb_convert_encoding($x, 'UTF-8', 'CP1251');

if($this->isRussian($x) <= 3)
$x = htmlentities($original_x, ENT_QUOTES, "UTF-8");


    if (!strlen($x))
        return 'unknown';
    else
        return $x;
  
}

// generate a keyword for search cover in google
private function rpl($artist, $p = 1)
{
    
    
    $pls = '+';
    
    if ($p == 0)
        $pls = '';
    
    $artist1  = str_replace('.', $pls, $artist);
    $artist2  = str_replace(' ', $pls, $artist1);
    $artist3  = str_replace('&', $pls, $artist2);
    $artist4  = str_replace('()',$pls, $artist3);
    $artist5  = str_replace('(', $pls, $artist4);
    $artist6  = str_replace(')', $pls, $artist5);
    $artist7  = str_replace('*', $pls, $artist6);
    $artist8  = str_replace('$', $pls, $artist7);
    $artist9  = str_replace('#', $pls, $artist8);
    $artist10 = str_replace('!', $pls, $artist9);
    $artist11 = str_replace('@', $pls, $artist10);
    $artist12 = str_replace('^', $pls, $artist11);
    $artist13 = str_replace('~', $pls, $artist12);
    $artist14 = str_replace('=', $pls, $artist13);
    $artist15 = str_replace('-', $pls, $artist14);
    $artist16 = str_replace('_', $pls, $artist15);
    $artist19 = str_replace('|', $pls, $artist16);
    $artist20 = str_replace('<', $pls, $artist19);
    $artist21 = str_replace('>', $pls, $artist20);
    $artist22 = str_replace(':', $pls, $artist21);
    $artist23 = str_replace(';', $pls, $artist22);
    
    return $artist23;
    
}


// replace russian chars with latin
private function rplchr($string)
{ 

    $replace = array(
        '0' => '',
        '1' => '',
        '2' => '',
        '3' => '',
        '4' => '',
        '5' => '',
        '6' => '',
        '7' => '',
        '8' => '',
        '9' => '',
        'Track' => '',
        'track' => '',
        'UNKNOWN' => '',
        'unknown' => '',
        '&lt;' => '',
        '&gt;' => '',
        '&#039;' => '',
        '&amp;' => '',
        '&quot;' => '',
        'A' => 'A',
        'A' => 'A',
        'A' => 'A',
        'A' => 'A',
        'A' => 'Ae',
        '&Auml;' => 'A',
        'A' => 'A',
        'A' => 'A',
        'A' => 'A',
        'A' => 'A',
        'Ae' => 'Ae',
        'C' => 'C',
        'C' => 'C',
        'C' => 'C',
        'C' => 'C',
        'C' => 'C',
        'D' => 'D',
        'D' => 'D',
        'D' => 'D',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'E' => 'E',
        'G' => 'G',
        'G' => 'G',
        'G' => 'G',
        'G' => 'G',
        'H' => 'H',
        'H' => 'H',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'I' => 'I',
        'IJ' => 'IJ',
        'J' => 'J',
        'K' => 'K',
        'L' => 'L',
        'L' => 'L',
        'L' => 'L',
        'L' => 'L',
        'K' => 'K',
        'N' => 'N',
        'N' => 'N',
        'N' => 'N',
        'N' => 'N',
        'N' => 'N',
        'O' => 'O',
        'O' => 'O',
        'O' => 'O',
        'O' => 'O',
        'O' => 'Oe',
        '&Ouml;' => 'Oe',
        'O' => 'O',
        'O' => 'O',
        'O' => 'O',
        'O' => 'O',
        'OE' => 'OE',
        'R' => 'R',
        'R' => 'R',
        'R' => 'R',
        'S' => 'S',
        'S' => 'S',
        'S' => 'S',
        'S' => 'S',
        'S' => 'S',
        'T' => 'T',
        'T' => 'T',
        'T' => 'T',
        'T' => 'T',
        'U' => 'U',
        'U' => 'U',
        'U' => 'U',
        'U' => 'Ue',
        'U' => 'U',
        '&Uuml;' => 'Ue',
        'U' => 'U',
        'U' => 'U',
        'U' => 'U',
        'U' => 'U',
        'U' => 'U',
        'W' => 'W',
        'Y' => 'Y',
        'Y' => 'Y',
        'Y' => 'Y',
        'Z' => 'Z',
        'Z' => 'Z',
        'Z' => 'Z',
        'T' => 'T',
        'a' => 'a',
        'a' => 'a',
        'a' => 'a',
        'a' => 'a',
        'a' => 'ae',
        '&auml;' => 'ae',
        'a' => 'a',
        'a' => 'a',
        'a' => 'a',
        'a' => 'a',
        'ae' => 'ae',
        'c' => 'c',
        'c' => 'c',
        'c' => 'c',
        'c' => 'c',
        'c' => 'c',
        'd' => 'd',
        'd' => 'd',
        'd' => 'd',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'e' => 'e',
        'f' => 'f',
        'g' => 'g',
        'g' => 'g',
        'g' => 'g',
        'g' => 'g',
        'h' => 'h',
        'h' => 'h',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'i' => 'i',
        'ij' => 'ij',
        'j' => 'j',
        'k' => 'k',
        'k' => 'k',
        'l' => 'l',
        'l' => 'l',
        'l' => 'l',
        'l' => 'l',
        'l' => 'l',
        'n' => 'n',
        'n' => 'n',
        'n' => 'n',
        'n' => 'n',
        'n' => 'n',
        'n' => 'n',
        'o' => 'o',
        'o' => 'o',
        'o' => 'o',
        'o' => 'o',
        'o' => 'oe',
        '&ouml;' => 'oe',
        'o' => 'o',
        'o' => 'o',
        'o' => 'o',
        'o' => 'o',
        'oe' => 'oe',
        'r' => 'r',
        'r' => 'r',
        'r' => 'r',
        's' => 's',
        'u' => 'u',
        'u' => 'u',
        'u' => 'u',
        'u' => 'ue',
        'u' => 'u',
        '&uuml;' => 'ue',
        'u' => 'u',
        'u' => 'u',
        'u' => 'u',
        'u' => 'u',
        'u' => 'u',
        'w' => 'w',
        'y' => 'y',
        'y' => 'y',
        'y' => 'y',
        'z' => 'z',
        'z' => 'z',
        'z' => 'z',
        't' => 't',
        'ss' => 'ss',
        'ss' => 'ss',
        'ый' => 'iy',
        'А' => 'A',
        'Б' => 'B',
        'В' => 'V',
        'Г' => 'G',
        'Д' => 'D',
        'Е' => 'E',
        'Ё' => 'YO',
        'Ж' => 'ZH',
        'З' => 'Z',
        'И' => 'I',
        'Й' => 'Y',
        'К' => 'K',
        'Л' => 'L',
        'М' => 'M',
        'Н' => 'N',
        'О' => 'O',
        'П' => 'P',
        'Р' => 'R',
        'С' => 'S',
        'Т' => 'T',
        'У' => 'U',
        'Ф' => 'F',
        'Х' => 'H',
        'Ц' => 'C',
        'Ч' => 'CH',
        'Ш' => 'SH',
        'Щ' => 'SCH',
        'Ъ' => '',
        'Ы' => 'Y',
        'Ь' => '',
        'Э' => 'E',
        'Ю' => 'YU',
        'Я' => 'YA',
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'yo',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'y',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'c',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'sch',
        'ъ' => '',
        'ы' => 'y',
        'ь' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya'
    );
    
    
    $r = str_replace(array_keys($replace), $replace, $string);

    if (!strlen($r))
        return 'unknown';

    return $r;
}

// -------------------------- Feedback --------------------
// feedback panel, for administrator of site
public function Admin(){


// construct header
$this->build_header('Feedback','670');

// query
$query = $this->__om_query("select * from ".nobil_om_feedback." order by id desc");

// assign loop to smarty
$this->inject_html->assign('query', $query);

// display it
$this->inject_html->display('../template/feedback/feedback.html');

// close html content
$this->close_html();


} // END Admin()

// upload files for feedback
public function feedbackUpload(){


$target_dir    = $this->feedback_target_dir;
$target_file   = $target_dir . basename($_FILES["feedback_file"]["name"]);
$uploadOk      = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["feedback_file"]["tmp_name"]);
    if ($check !== false) {
        $msg      = "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        $msg      = "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    $msg      = "file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["feedback_file"]["size"] > 1024 * 1000) {
    $msg      = "your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    $msg      = "only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "0~Sorry, your file was not uploaded, because " . $msg;

// if everything is ok, try to upload file
} else {
    $temp    = explode('.', $target_file);
	$newName = mt_rand().mt_rand(). '.' . end($temp);
    $newName = str_replace('-', '', $newName);
    if (move_uploaded_file($_FILES["feedback_file"]["tmp_name"], $target_dir . $newName)) {
        echo '1~' . $newName;
    } else {
        echo "0~Sorry, there was an error uploading your file.";
    }
}


} // END feedbackUpload()


/// ================================================== SEARCH ENGINE =============================================
public function Search(){

$this->old_cookie = $_COOKIE['tk_m'];
$this->new_cookie = $this->old_cookie + time(); 
//setcookie('tk_m', $this->new_cookie, '0x7fffffff', '/'); // generate a new security code

$this->a_a = $this->a_b = $this->a_c = $this->rus_artist = $this->sub_activeClass = $this->session_genre = '';
$this->orig_keyword         = (isset($_GET['key']) ? $this->db->real_escape_string($_GET['key']) : '');
$this->keyword                = urldecode(stripslashes($this->orig_keyword));///urldecode(stripslashes(htmlentities($this->orig_keyword, ENT_QUOTES, 'UTF-8')));
$this->action               = (isset($_GET['action']) ? $this->db->real_escape_string($_GET['action']) : '');
$this->method               = (isset($_GET['method']) ? $this->db->real_escape_string($_GET['method']) : '');
$this->request_album        = (isset($_GET['alb']) ? $this->db->real_escape_string(urldecode($_GET['alb'])) : '');
$this->sub_activeClass_hits = 'mus_submenu_a__active';

// variables with value from settings
$dfc                  = $this->defaultCover;
$dci                  = $this->albums_default_cv;
$this->default_cover        = $this->defaultCover;
$this->songs_limit          = $this->search_songs_limit;
$this->artists_limit        = $this->search_artists_limit;
$this->albums_limit         = $this->search_albums_limit;
$this->purchase_ic          = $this->show_prch_icon;

if (!isset($_SESSION['search_keyword']) || $_SESSION['search_keyword'] !== $this->keyword) {
    $_SESSION['search_keyword']      = $this->keyword;
    $_SESSION['srch_display_tracks'] = FALSE;
    setcookie('srch_display_tracks', false, time() + (60 * 24), '/');
} else if (isset($_COOKIE['srch_display_tracks']) && $_SESSION['search_keyword'] === $this->keyword)
    $_SESSION['srch_display_tracks'] = TRUE;
    $_SESSION['suggest_art_id'] = array();

if (isset($_SESSION['song_genre']))
    $this->session_genre = $_SESSION['song_genre'];

// assign to smarty
$this->inject_html->assign('_COOKIE', $_COOKIE);
$this->inject_html->assign('this', $this); 
$this->inject_html->assign('_SESSION', $_SESSION);

// for header
switch ($this->method) {
    case 'inx':
    case 'artists':
        $this->inx_active = "__active";
        break;
    case 'songs':
        $this->song_active = "__active";
        break;
    case 'albums':
        $this->album_active = "__active";
        break;
    case 'artistalbums':
        $this->sub_activeClass_hits   = '';
        $this->sub_activeClass_albums = 'mus_submenu_a__active';
        break;
        
}


if ($this->action === 'searchResult')
    return $this->get_result_content();


if (empty($this->keyword) || empty($this->action))
    die('0');

if ($this->action === 'live_srch')
    $this->build_suggestions($this->keyword, $dfc, $dci);


} /// END Search()




// generate queries for better results
private function generate_queries($m, $h = false)
{
    
    
    $key =  $this->esc($this->keyword);

    if ($h) {
        $sql_select_songs     = 'COUNT(DISTINCT id) as cnt';
        $sql_select_artists   = 'COUNT(DISTINCT id) as cnt';
        $sql_select_albums    = 'COUNT(DISTINCT id) as cnt';
        $sql_where_artists_ex = '';
        $sql_limit_artists    = '';
        $sql_limit_songs      = '';
        $sql_limit_albums     = '';
    } else {
        $sql_select_songs     = 'id,artist,title,album,time,cover,path,video,language';
        $sql_select_artists   = 'id as m_id, cover as m_cover,artist as m_artist,language';
        $sql_select_albums    = 'id,cover,album,artist';
        $sql_where_artists_ex =  $this->method !== 'artists' ? "and artist != '$key'" : '';
        $sql_limit_artists    = 'limit ' . $this->artists_limit;
        $sql_limit_songs      = 'limit ' . $this->songs_limit;
        $sql_limit_albums     = 'limit ' . $this->albums_limit;
    }
    
    
    @list($key_one, $key_two) = @explode(' ', $key);
    $key_one = $key_one ? $key_one : $key;
    $key_two = $key_two ? $key_two : $key;

    $sql_inx = "select distinct m.id as m_id,m.time as m_time,m.cover as m_cover,m.title as m_title,m.video as m_video,m.path as m_path,m.album as m_album,m.artist as m_artist,m.genre as m_genre,language
                  from ".nobil_om_songs." m where m.artist='$key' group by m.title order by m.year desc limit 99";
    
    $sql_songs = "select $sql_select_songs from ".nobil_om_songs."
            where artist like N'%$key%' or title like N'%$key%' 
            or artist like N'%$key_one%' or title like N'%$key_one%' 
            or artist like N'%$key_two%' or title like N'%$key_two%' 
             group by id order by artist asc " . $sql_limit_songs;
    
    $sql_artists = "select $sql_select_artists from ".nobil_om_songs."
                    where artist like N'%$key%'  $sql_where_artists_ex
             OR artist like N'%$key_one%' $sql_where_artists_ex
             OR artist like N'%$key_two%' $sql_where_artists_ex
                group by artist
                order by artist desc " . $sql_limit_artists;
    
    $sql_albums = "select $sql_select_albums from ".nobil_om_songs." where album LIKE N'%$key%' group by album order by album asc " . $sql_limit_albums;
    
    $sql_radio = "select distinct id,artist,title,album,time,cover,path,video,language from ".nobil_om_songs."
                 where genre LIKE N'%" . $this->session_genre . "%' and artist like N'%$key%' OR artist like N'%$key_one%' OR artist like N'%$key_two%'
                 group by artist order by year desc limit 100";
    
    if (!$h) {
        switch ($m) {
            case 'inx':
                $sql = $this->__om_query($sql_inx);
                break;
            case 'songs':
                $sql = $this->__om_query($sql_songs);
                break;
            case 'artists':
                $sql = $this->__om_query($sql_artists);
                break;
            case 'album':
                $sql = $this->__om_query($sql_albums);
                break;
            case 'artistradio':
                $sql = $this->__om_query($sql_radio);
                break;
        }
        return $sql;
        
    } else {
        /// generate counts of result
        $c_artist = count($this->__om_query($sql_artists));
        $c_artist = ($c_artist > 0 ? $c_artist : 0);
        $c_songs  = count($this->__om_query($sql_songs));
        $c_songs  = ($c_songs > 0 ? $c_songs : 0);
        $c_albums = count($this->__om_query($sql_albums));
        $c_albums = ($c_albums > 0 ? $c_albums : 0);
        
        return $c_artist . ',' . $c_songs . ',' . $c_albums;
        
    }
    
}

// construct html content for results
private function get_result_content()
{
    
    if (!$this->keyword || !$this->method)
        return $this->empty_result();
    
    $this->request_stop = true;
    $this->build_result_content();
}

// html for empty result
public function empty_result($e = 0, $b = 0, $h = false)
{

    // if artist return null result, try to search for songs.s
    if ($e && !$b) {
        $_SESSION['not_concr_artist'] = true;
        $loc = $this->musicpth."search/index.php?action=searchResult&method=$e&tk=".$_COOKIE['tk_m']."&key=" . urlencode($this->orig_keyword);
        Header("Location: " . $loc, TRUE, 301);
        
    }

    if (!$h) {
        $title  = 'Search results is empty'; // title of search page, with 0 results
        $height = '500'; // height of search page
        $this->build_header($title,$height);
        
        echo '<div class="m_search_not-found">No results that matched your search.</div><div class="m_search_upload" data-href="mymusic">Upload your music</div>';
        $this->close_html();
    } else {
        printf('<div class="m_search_not-found">%s</div>', $h);
        echo '<div class="m_search_upload" data-href="mymusic">Upload your music</div>';
    }
    exit;
}

// construct result page
public function build_result_content(){

// redirect to home page if request is not an ajax
//$this->get_req_redir();

switch ($this->method) {
    case 'songs':
        $this->getSongsResult();
        break;
    case 'artistradio':
        $this->get_ArtistRadio(); 
        break;
    case 'artistalbums':
        $this->get_index_results(false);
        break;
    case 'albums':
        $this->getAlbums(); 
        break;
    case 'album':
        $this->get_album_details();
        break;
    case 'artists':
        $this->getMoreArtists(true);
        break;
    default:
        $this->get_index_results(); 
}

} // END build_result_content()


// construct header for search pages
public function search_build_header($key){
    
    // if result for artist is empty go to songs result
    $artist_tab = (!isset($_SESSION['not_concr_artist']) ? 'inx' : 'artists');
    
    list($artists_count, $songs_count, $albums_count) = explode(',', $this->generate_queries(null, true));
 
    if($albums_count)
    $_SESSION['albums_count'] = $albums_count;
    else unset($_SESSION['albums_count']);

    if($songs_count)
    $_SESSION['songs_count'] = $songs_count;
    else unset($_SESSION['songs_count']);

    $songs_href = (!$this->song_active ? 'data-href="search" data-action="true" data-query="?action=searchResult&method=songs&key=' . $key . '"' : 'style="cursor:default;"');
    $album_href = (!$this->album_active ? 'data-href="search" data-action="true" data-query="?action=searchResult&method=albums&key=' . $key . '"' : 'style="cursor:default;"');
    $artis_href = (!$this->inx_active ? 'data-href="search" data-action="true" data-query="?action=searchResult&method=' . $artist_tab . '&key=' . $key . '"' : 'style="cursor:default;"');
    
// assign variables to smarty
$this->inject_html->assign('song_active', $this->song_active);    
$this->inject_html->assign('songs_href', $songs_href);   
$this->inject_html->assign('songs_count', $songs_count);     
$this->inject_html->assign('inx_active', $this->inx_active);  
$this->inject_html->assign('artis_href', $artis_href); 
$this->inject_html->assign('artists_count', $artists_count); 
$this->inject_html->assign('album_active', $this->album_active); 
$this->inject_html->assign('album_href', $album_href); 
$this->inject_html->assign('albums_count', $albums_count);

// display it  
$this->inject_html->display('../template/search/header.html'); 


}


// result of songs
public function getSongsResult($mrs = false) {

    
    $query   = $this->generate_queries('songs');
    $count_songs = count($query);
    
// assig loop to smarty
$this->inject_html->assign('query', $query); 

// assign variables to smarty
$this->inject_html->assign('mrs', $mrs);    
$this->inject_html->assign('count_songs', $count_songs);   
$this->inject_html->assign('purchase_ic', $this->purchase_ic);  
$this->inject_html->assign('count_albums', isset($_SESSION['albums_count']) ? 1 : 0);  
$this->inject_html->assign('albums_redir', !isset($_SESSION['albums_redir']) ? 1 : 0); 
unset($_SESSION['albums_redir']);
$this->inject_html->display('../template/search/songs.html'); 

}

// more similar artists 
public function getMoreArtists($mrs = false) {

    $key   = $this->keyword;
    $query = $this->generate_queries('artists');
    $count = count($query);
    
// assig loop to smarty
$this->inject_html->assign('query', $query); 

// assign variables to smarty
$this->inject_html->assign('mrs', $mrs);    
$this->inject_html->assign('count', $count);            
$this->inject_html->display('../template/search/a_more_result.html'); 


}



// index results
public function get_index_results($inx = true) {

   
    $key = urlencode($this->keyword);
   
    $this->sub_activeClass_href_hits = '';

    if ($this->sub_activeClass_hits === '')
        $sub_activeClass_href_hits = 'data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=' . $key . '"';

   
    $sub_similar_tracks = 'data-href="search" data-action="true" data-query="?action=searchResult&method=artistradio&key=' . $key . '"';
    $more_details       = 'data-href="search" data-action="true" data-query="?action=searchResult&method=artistalbums&key=' . $key . '"';
    $query              = $this->generate_queries('inx');
    $count_rows         = count($query);
    $c                  = 0;
    $v                  = $count_rows - 1;
    $mt                 = '';
    $display_tracks     = '';
    $aria_hidden        = 'false';
    $p_top              = 0;

    
//assign loop to smarty
$this->inject_html->assign('query', $query);
$this->inject_html->assign('count_rows', $count_rows);
//assign variables to smarty
$this->inject_html->assign('mt', $mt);
$this->inject_html->assign('aria_hidden', $aria_hidden);
$this->inject_html->assign('display_tracks', $display_tracks);
$this->inject_html->assign('inx', $inx);
$this->inject_html->assign('more_details', $more_details);
$this->inject_html->assign('sub_similar_tracks', $sub_similar_tracks);
$this->inject_html->assign('key', $key);
$this->inject_html->assign('c', $c);
$this->inject_html->assign('v', $v);
$this->inject_html->assign('sub_activeClass_albums', $this->sub_activeClass_albums);
$this->inject_html->assign('play', isset($_GET['play']) ? '1' : '0');
$this->inject_html->assign('sub_activeClass_href_hits', isset($sub_activeClass_href_hits) ? $sub_activeClass_href_hits : '');    
$this->inject_html->assign('sub_similar_tracks', $sub_similar_tracks);            
$this->inject_html->display('../template/search/index.html');  

}

// Albums
public function getAlbums(){

    $_SESSION['albums_redir'] = 'confirmed';
    $query = $this->generate_queries('album');
    $count = count($query);
    $this->search_build_header($this->keyword);

    if ($count > 0){
    // assign loop to smarty
    $this->inject_html->assign('query', $query);
    // display it
    $this->inject_html->display('../template/search/albums.html');     
    }else
    return $this->empty_result(null, null, 'No albums that matched your search.');

}


// generate the albums of respective artist
public function get_artistAlbums($key,$mt,$album){

    $key            = urlencode($key);
    $c              = 0;
    $cr_similar_key = str_split($key, 2);
    $cr_s_ar_count  = count($cr_similar_key);
    $similar_key_th = $key;
    
    $similar_key   = $cr_similar_key['0'];
    $similar_key_t = $cr_similar_key['1'];
    if ($cr_s_ar_count > 3)
        $similar_key_th = $cr_similar_key['2'];
    $display_sm_art = '';
    $aria_hidden    = 'false';
    $query_a = $this->__om_query("select a.id,a.artist,a.cover,a.genre                       
                        from  ".nobil_om_songs." a
                        where a.artist LIKE N'%$similar_key%' and a.artist !='$key' 
                        or a.artist  LIKE N'%$similar_key_t%' and a.artist !='$key' 
            or a.artist LIKE N'%$similar_key_th%' and a.artist !='$key' 
             and a.artist !='$key' group by a.artist limit 16
                  ");
    

$this->inject_html->assign('c', $c);      
$this->inject_html->assign('aria_hidden', $aria_hidden);  
$this->inject_html->assign('display_sm_art', $display_sm_art);  

///if (count($query_a) > 0):
// assign LOOP to smarty 
$this->inject_html->assign('query_a', $query_a);
$this->inject_html->assign('count_a', count($query_a));
//assign variables to smarty
$this->inject_html->assign('mt', $mt); 
///endif;
    
    
    // artist's albums
    $query_b = $this->__om_query("select id as b_id, cover as b_cover, artist as b_artist, album as b_album
                              from  ".nobil_om_songs."
                              where artist='$this->keyword' group by album order by album asc limit 100
                              ");
    
//assign variables to smarty
$this->inject_html->assign('query_b', $query_b); 

//assign variables to smarty
$this->inject_html->assign('count_b', count($query_b)); 

// display it
$this->inject_html->display('../template/search/a_albums.html');

}

// Similar tracks for respective artist
public function get_ArtistRadio(){


    $query = $this->generate_queries('artistradio');
    $count = count($query);
    $c     = 0;
    
    $title  = 'Radio';
    $height = '590';
    $this->build_header($title,$height);

    if ($count > 0) {

// assign LOOP to smarty 
$this->inject_html->assign('query', $query);

//assign variables to smarty
$this->inject_html->assign('c', $c); 
$this->inject_html->assign('count', $count);
$this->inject_html->assign('play', isset($_GET['play']) ? '1' : '0');
        
// display it
$this->inject_html->display('../template/search/similar_songs.html');

    } else
     return $this->empty_result(null, null, 'Sorry, but similar songs for ' . $_SESSION['song_artist_searched'] . ' has not founded.');



}

// Album details
public function get_album_details(){

    $encoding = mb_detect_encoding($this->keyword);
    $keyword       = $encoding !== 'UTF-8' ? @iconv('CP1251', 'UTF-8', urldecode($this->keyword)) : urldecode($this->keyword);  
    $request_album = $encoding !== 'UTF-8' ? @iconv('CP1251', 'UTF-8', urldecode($this->request_album)) : urldecode($this->request_album); 
//$keyword = urldecode($this->keyword);
//$request_album = urldecode($this->request_album);
    $sql = "select distinct * from ".nobil_om_songs." where `album`='$request_album' and artist='$keyword' group by title order by year desc";
    $query = $this->__om_query($sql);
    $count = count($query);
    $c     = 0;
    
    $title  = 'Album';
    $height = '590';
    $this->build_header($title,$height);

    if ($count > 0) {

// assign LOOP to smarty 
$this->inject_html->assign('query_a', $query);

//assign variables to smarty
$this->inject_html->assign('c', $c); 
$this->inject_html->assign('count', $count);
$this->inject_html->assign('play', isset($_GET['play']) ? '1' : '0');




        
        $sql = "select id,artist,cover,album from ".nobil_om_songs." where artist = '$keyword' and album != '$request_album' group by album order by added desc";
        $ot_query = $this->__om_query($sql);
        $ot_count = count($ot_query);
        $oc       = 0;

// assign LOOP to smarty 
$this->inject_html->assign('query_b', $ot_query);

//assign variables to smarty
$this->inject_html->assign('oc', $oc); 
$this->inject_html->assign('ot_count', $ot_count);





          
        
// display it
$this->inject_html->display('../template/search/album_details.html');
         $this->close_html(); 

    } else
        return $this->empty_result(null, null, 'Sorry, but the album has not found.');

}




// search with latin chars
private function getAq($k)
{
    $sql_a = $this->__om_query("select * from ".nobil_om_songs." where artist LIKE N'%$k%' group by artist ORDER BY artist limit 3");
    return $sql_a;
}

// search with russian chars, only if result is empty
private function getAlq($k)
{ 
    $sql_b = $this->__om_query("select * from ".nobil_om_songs." where album LIKE N'%$k%' or artist like N'%$k%' group by album order by album limit 3");
    return $sql_b;
}


// generate suggestions
private function build_suggestions($key, $d1, $d2)
{    
    $keyword = $this->keyword;

    $keyword_r = mb_convert_encoding($this->translit_russian($keyword), 'UTF-8', 'CP1251');//@iconv('UTF-8', 'CP1251', $this->translit_russian($keyword));

    $sql_a = $this->getAq($keyword);
    $sql_b = $this->getAlq($keyword);
    

    if (count($sql_a) <= 0)
        $sql_a = $this->getAq($keyword_r);
    
    if (count($sql_b) <= 0)
        $sql_b = $this->getAlq($keyword_r);
    

    $albums  = '';
    $artists = '';
    
    $b = array();
    $c = array();
    
    foreach($sql_a as $rows) {    
        $artists_i = $rows['id'];
        $artists_n = htmlentities(stripslashes($rows['artist']));//@iconv('CP1251', 'UTF-8', $rows['artist']);
        $artists_c = (!empty($rows['cover']) ? $rows['cover'] : $d1);
        
        
        if (!in_array($artists_n, $b) && $artists_i) {
            $artists .= <<<EOD
                       {

            "an": "{$artists_n}",
            "cv": "{$artists_c}",
            "id": "{$artists_i}"

       },
EOD;
        };

        $b[] = $artists_n;
        
    } // foreach loop
    

    foreach($sql_b as $rows) {   
        $albums_i = $rows['id'];
        $albums_n = htmlentities(stripslashes($rows['album']));//@iconv('CP1251', 'UTF-8', $rows['album']);
        $albums_a = htmlentities(stripslashes($rows['artist']));//@iconv('CP1251', 'UTF-8', $rows['artist']);
        $albums_c = (!empty($rows['cover']) ? $rows['cover'] : $d2);
        $albums_c = ($albums_c !== $d1 ? $albums_c : $d2);
        
        
        if (!in_array($albums_n, $c) && $albums_i) {
            $albums .= <<<EOD
                       {

            "an": "{$albums_n}",
            "aa": "{$albums_a}",
            "cv": "{$albums_c}",
            "id": "{$albums_i}"

       },
EOD;
        };

        $c[] = $albums_n;
        
    } // foreach loop
    
    if ($artists != '') {
        $artists = substr($artists, 0, -1);
    }
    if ($albums != '') {
        $albums = substr($albums, 0, -1);
    }
    
    header('Content-type: application/json');
    printf('{ "artists": [%s], "albums": [%s]}', $artists, $albums);

    exit(0);
    
}

// translate to russian chars, if the result is empty with latin
public function translit_russian($string)
{
    
    
    $replace = array(
        
        'ый' => 'iy',
        'А' => 'A',
        'Б' => 'B',
        'В' => 'V',
        'Г' => 'G',
        'Д' => 'D',
        'Е' => 'E',
        'Ё' => 'YO',
        'Ж' => 'ZH',
        'З' => 'Z',
        'И' => 'I',
        'Й' => 'Y',
        'К' => 'K',
        'Л' => 'L',
        'М' => 'M',
        'Н' => 'N',
        'О' => 'O',
        'П' => 'P',
        'Р' => 'R',
        'С' => 'S',
        'Т' => 'T',
        'У' => 'U',
        'Ф' => 'F',
        'Х' => 'H',
        'Ц' => 'C',
        'Ч' => 'CH',
        'Ш' => 'SH',
        'Щ' => 'SCH',
        'Ъ' => '',
        'Ы' => 'Y',
        'Ь' => '',
        'Э' => 'E',
        'Ю' => 'YU',
        'Я' => 'YA',
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'yo',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'y',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'c',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'sch',
        'ъ' => '',
        'ы' => 'y',
        'ь' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya'
    );
    

    $r = str_replace($replace, array_keys($replace), $string);

    return $r;
}

// ======================================================================= END SEARCH ENGINE ===================================================


// insert track in news feed
public function toFeed($tid,$parent_id = 0){
$now = time();
$i = $this->USER['id'];
$minus_ten_minutes = strtotime("-10 minutes");

$check = $this->db->query("select `itemid`,`id` from ".tbl_feed." where `byuser`='$i' and `categ`='music' and `parent_id` = '$parent_id' order by added desc limit 1");
$check_r = $check->fetch_array(MYSQLI_ASSOC);

if(!$check_r['id']){
$check = $this->db->query("select `itemid`,`id` from ".tbl_feed." where `byuser`='$i' and `categ`='music' and `parent_id` = '$parent_id' and `added` >= '$minus_ten_minutes' order by added desc limit 1");
$check_r = $check->fetch_array(MYSQLI_ASSOC);
}

if(!$check_r['id']){
// insert into news feed 
$toFeed = $this->__om_query_insert("insert into ".tbl_feed." set `byuser`='$i',`itemid`='$tid',`added`='$now', `categ`='music', `parent_id` = '$parent_id'");
}
 else {
// update
$tid = $tid.','.$check_r['itemid'];
$feed_id = $check_r['id'];
$toFeed = $this->__om_query_update("update ".tbl_feed." set `itemid`='$tid',`added`='$now' where `id` = '$feed_id'");

}
}

public function UserAddedTracks(){

$id = isset($_GET['tid']) ? $_GET['tid'] : '';
$uid = isset($_GET['uid']) ? $_GET['uid'] : '';
$ufn = isset($_GET['ufn']) ? $_GET['ufn'] : '';
$nArr = $selected_tracks = array();


if(!$id || !$ufn) die;
else {

$id = explode(",",$id);
$count = sizeof($id);


for($x=0;$x<$count;$x++){
$track = $id[$x];

if(!in_array($track,$selected_tracks)){

$selected_tracks[] = $track;
$s_query = $this->db->query("select * from ".tbl_songs."where id='{$track}' limit 1");
$a = $s_query->fetch_array(MYSQLI_ASSOC);
$nArr[] = array('id' => $a['id'],
	        'artist' => $a['artist'],
		'title' => $a['title'],
		'album' => $a['album'],
		'cover' => $a['cover'],
		'path' => $a['path'],
		'time' => $a['time'],
		'video' => $a['video'],
		'language' => $a['language']
						);
}
		
}

$this->inject_html->assign([
'arr_ftc' => $nArr, 'randomize_id' => $uid, 'this' => $this, 'title' => $ufn .' added '.$count.' tracks', 'condition' => 0, 'songs_count' => $count, 'purchase_ic' => $this->show_prch_icon
				]);

// construct header
$this->build_header($ufn ." added ".$count." tracks",$this->users_page_height);

// display it
$this->inject_html->display('../template/users/addedTracks.html');
$this->close_html();
}

}

// destruct wMusic class
public function __destruct(){ if(isset($this->db)) return $this->db->close(); }

} // END class

