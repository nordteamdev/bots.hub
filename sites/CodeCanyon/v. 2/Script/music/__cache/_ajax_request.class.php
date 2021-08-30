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

 
require_once('_grab_html_dom.inc');

 

// construct class
class _ajax_req extends _MUSIC_MODULE {


public $download;
public $add_slash;

public function __construct(){

//the old building from parent class
parent::__construct();

// import variables from parent class
parent::__store_ajax_variables();

}

// error reporting for lyrics
public function lyrics_error($text){
print(json_encode(array('lyrics_data' => array('l_error' => $text))));
exit;
}

// replace accented letters
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

// create dropDown for lyrics
public function getLyricsDropDown(){
$this->inject_html->display('../template/ajax_result/lyrics.html');
}

// generate lyrics (implemented in v1.5)
public function getLyrics(){

// vars
$l_data = 0;
$lyrics = 0;
$default_song_name = $this->c;
$default_artist_name = $this->b;
$__l_artist = preg_replace('/ feat.*/', '', $default_artist_name);
$__l_song_name = trim(preg_replace('/\s*\([^)]*\)/', '', $default_song_name));
$l_artist = urlencode($__l_artist);
$l_song_name = str_replace('%5C','',urlencode($__l_song_name));
$l_error = 0;

  if(!$l_artist || !$l_song_name){
    return $this->lyrics_error('Missing artist name or song name');//$l_error;

    } else {

    libxml_use_internal_errors(true);
    $url  = "http://lyrics.wikia.com/api.php?fmt=xml&artist=".$l_artist."&song=".$l_song_name;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $XMLData = curl_exec($curl);
    curl_close($curl);
    //decoding xml request
    $xml_result = simplexml_load_string($XMLData);

if($xml_result === false) {
    foreach(libxml_get_errors() as $error)
    return $this->lyrics_error('Probably the name of song contains illicit characters. <br/>Message: '.urldecode($error->message));
} else if($xml_result->lyrics == 'Instrumental')
    return $this->lyrics_error('Instrumental song.');


$response_artist_name = isset($xml_result->artist) ? $xml_result->artist : 0; // artist name
$response_song_name   = isset($xml_result->song) ? $xml_result->song : 0; // song name
$response_lyrics_url  = isset($xml_result->url) ? $this->l_mb_string($xml_result->url,1) : 0; // lyric url


if(!$response_artist_name || !$response_song_name || $xml_result->lyrics == 'Not found')
return $this->lyrics_error('Sorry, but the lyrics for this song has not been found, please try again later');


if(strstr(strtolower($this->l_mb_string($response_artist_name)), strtolower(stripslashes($__l_artist))) && strstr(strtolower($this->l_mb_string($response_song_name)), strtolower(stripslashes($__l_song_name)))){
$html = file_get_html($response_lyrics_url);
$filter_lyrics = $html->find('div[class=lyricbox]'); // grab lyrics from http://lyrics.wikia.com

foreach($filter_lyrics as $lyrics_text)
$lyrics = isset($lyrics_text->plaintext) ? $lyrics_text->plaintext : 0;

$cover = $this->defaultCover;
// get cover for respective track
$query = $this->__om_query("select `cover` from ".nobil_om_songs." where `artist` = '$default_artist_name' and `title`='$default_song_name' order by id desc limit 1");

foreach($query as $res)
$cover = $res['cover'];

$l_data = array(
    'l_error' => '0',
    'l_artist' => $response_artist_name,
    'l_song_name' => $response_song_name,
    'l_cover' => $cover,
    'l_text' => $lyrics ? $lyrics : $xml_result->lyrics
);


} else return $this->lyrics_error('Sorry, but the lyrics for this song has not been found, please try again later. [error:1]');

}

    print(json_encode(array('lyrics_data' => $l_data)));
    exit(0);

}

// payments [implemented in v1.5]
public function getService(){

$service = isset($_POST['service']) ? $_POST['service'] : '';

if($service){


} else die('Please select a payment method');


}

// get more data when scrolling
public function scrollEvent_loadData(){


    // abbreviate main variables
    $b = $this->b;
    $c = $this->c;
    $d = $this->d;
  

    $page  = (int) (!isset($c)) ? 1 : $c;
    $pd_fr = ($d ? $d : 0);
    
    // for security reason
    if(!is_numeric($page)) exit;

    switch ($b) {
        // get more songs for friends page
        case 'users':
            $limit = $this->friends_songs_limit; // from settings
            $start = ($page * $limit) - $limit;
	    $start = isset($_POST['start_at']) ? $_POST['start_at'] : $start;
            $sql   = "select mm.owner,mm.musid,m.* from ".nobil_om_my_music." mm, ".nobil_om_songs." m WHERE m.id=mm.musid and mm.owner = " . $d . " group by m.id order by m.id desc limit {$start},{$limit}";
            break;
        // load more songs for history page
        case 'history':
            $limit = $this->history_limit; // from settings
            $start = ($page * $limit) - $limit;
	    $start = isset($_POST['start_at']) ? $_POST['start_at'] : $start;
            $sql   = "select h.*,m.*,m.id as s_id from ".nobil_om_history." h, ".nobil_om_songs." m where h.song = m.id and h.user = '" . $this->USER['id'] . "' order by h.listen desc limit {$start},{$limit}";
            
            break;
        // load more songs for my music page
        case 'mymusic':
            $limit = $this->my_mus_songs_limit; // from settings
            $start = ($page * $limit) - $limit;
	    $start = isset($_POST['start_at']) ? $_POST['start_at'] : $start;
            $sql   = "SELECT m1.*,m2.position,m2.added FROM ".nobil_om_songs." m1 
        INNER JOIN (
            SELECT musid,position,id,added
            FROM ".nobil_om_my_music."
            where owner='" . $this->USER['id'] . "'
           ) m2 ON m1.id = m2.musid ORDER BY m2.position ASC,m2.added DESC limit {$start},{$limit}";
            break;
        // get more songs for playlists page
        case 'playlist':
            $plId  = (isset($_POST['pl']) ? $this->db->real_escape_string($_POST['pl']) : 0);
            $pd_fr = $plId;
            $limit = $this->playlist_limit_songs; // from settings
            $start = ($page * $limit) - $limit;
	    $start = isset($_POST['start_at']) ? $_POST['start_at'] : $start;
            $sql   = "SELECT  m.*,pp.*,p.id as pid,p.originalpid,p.added,p.name,p.owner,p.favorite_cover,COUNT(pp.trackid)
            FROM ".nobil_om_playlists." p
         inner join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id
         inner join ".nobil_om_songs." m on m.id = pp.trackid
         WHERE p.id=" . $plId . "
          group by pp.trackid ORDER BY pp.position ASC, pp.id DESC LIMIT {$start},{$limit}";
            break;
        // load more songs for search result
        case 'search-song':
            $key   = (isset($_POST['pl']) ? $this->db->real_escape_string($_POST['pl']) : 0);
            $pd_fr = $key;
            $limit = $this->search_songs_limit; // from settings
            $start = ($page * $limit) - $limit;
	    $start = isset($_POST['start_at']) ? $_POST['start_at'] : $start;
            @list($key_one, $key_two) = @explode(' ', $key);
            $key_one = $key_one ? $key_one : $key;
            $key_two = $key_two ? $key_two : $key;
            $sql     = "select id,artist,title,album,time,cover,path,video,language from ".nobil_om_songs."
            where artist like N'%$key%' or title like N'%$key%' 
            or artist like N'%$key_one%' or title like N'%$key_one%' 
            or artist like N'%$key_two%' or title like N'%$key_two%' 
             group by id order by artist asc LIMIT {$start},{$limit}";
            
            break;
        default:
            die('0');
            
    }
    
    
    // run query
    $query = $this->__om_query($sql);
    $purchase_ic = $this->show_prch_icon;
    $condition   = date('d') - 1;
    $todaycl     = $nmt = "";
    $curr_year   = date('Y');

    if (count($query) >= 1) {
        
// assign foreach loop to smarty
$this->inject_html->assign('query', $query);

//assign variables to smarty
$this->inject_html->assign('purchase_ic',$this->show_prch_icon);
$this->inject_html->assign('b',$b);
$this->inject_html->assign('pd_fr',$pd_fr);
$this->inject_html->assign('curr_year',$curr_year);
$this->inject_html->assign('this',$this);
$this->inject_html->assign('nmt',$nmt);
$this->inject_html->assign('todaycl',$todaycl);
$this->inject_html->assign('condition',$condition);
$this->inject_html->assign('_SESSION',$_SESSION);

// display it
$this->inject_html->display('../template/ajax_result/load_more_data.html');


        
    } else {
        unset($_SESSION['curr_date_res']);
        echo('end');
    }


}


// generate songs for recommendation section
public function getRecommendationsTracks($x){

    $download = $add_slash = '';

    // switch statement for derivative sql queries
    switch($x) {

    // for my music page 
    case '1':     
        $SQL = "SELECT mm.owner, m.artist, m.title, m.album, m.id, m.path, m.cover, m.time, m.video
    FROM ".nobil_om_songs." m,
      ".nobil_om_my_music." mm WHERE mm.owner != m.uploader
    AND m.artist LIKE CONCAT('%', m.artist , '%') and m.uploader != '" . $this->USER['id'] . "'
        AND m.id != mm.musid group by m.id
    ORDER BY RAND() desc limit 3";
    break; 

    // for user playlists
    case '2':       
        
        $SQL = "SELECT mm.owner, m.artist, m.title, m.album, m.id, m.path, m.cover, m.time, m.video
    FROM ".nobil_om_songs." m,
      ".nobil_om_playlists." mm WHERE mm.owner != m.uploader
    AND m.artist LIKE CONCAT('%', m.artist , '%') and m.uploader != '" . $this->USER['id'] . "' group by m.id
    ORDER BY RAND() desc limit 3";
    break;
   
    // for downloaded page
    case '3':

        $current_year = date('Y') - 8;
        $download     = '__download';
        $add_slash    = '_';
        $SQL          = "SELECT m.artist, m.title, m.album, m.id, m.path, m.cover, m.time, m.video,m.year
      FROM ".nobil_om_songs." m
      left join ".nobil_om_purchased." b ON b.user = '" . $this->USER['id'] . "'
          left join ".nobil_om_songs." mm ON mm.id = b.song
      where m.id <> b.song and m.language = 'unknown' and m.artist LIKE CONCAT('%', mm.artist, '%') or m.title LIKE CONCAT('%', mm.title,'%') or m.genre = mm.genre
      group by m.id
      ORDER BY RAND() desc limit 3";
        
    break;
 }
    
    
    $query = $this->__om_query($SQL);

// assign foreach loop to smarty
$this->inject_html->assign('query', $query);
// assign variable to smarty
$this->inject_html->assign('download', $download);
$this->inject_html->assign('add_slash', $add_slash);

// display it
$this->inject_html->display('../template/ajax_result/recommendation_section.html');

}





// get the count of my songs
public function getMySongsCount(){

    $count = count($this->__om_query("select id from ".nobil_om_my_music." where `owner`='" . $this->USER['id']."'"));
    echo $count;

}

// edit/update existent playlists
public function editCreatedPlaylists(){

    $dt = $_POST['dt'];
    $cover = 0;
    $founded_cover = 0;

    if (!$this->b || !$dt)
        die('0');
    
    $query_update = $this->__om_query_update("update ".nobil_om_playlists." set `name`='$this->b' where `id`=" . $this->trackid);
    $this->__om_query_update("update ".nobil_om_playlists." set `updates`='yes' where `originalpid`=" . $this->trackid);
    $check_for_cv = $this->__om_query("select favorite_cover from ".nobil_om_playlists." where id = '".$this->trackid."' limit 1");
    foreach($check_for_cv as $pl_cover)
    $cover = $pl_cover['favorite_cover'] == $this->collection_img || $pl_cover['favorite_cover'] == $this->defaultCover || !$pl_cover['favorite_cover'] ? 1 : 0;


    if ($dt !== 'empty' && $query_update):
        foreach ($dt as $id): 
         if($cover != 0) {
 		$select_cover = $this->__om_query("select cover from ".nobil_om_songs." where id='$id' and cover != '".$this->defaultCover."' limit 1");
 		foreach($select_cover as $n_cover)
		$founded_cover = $n_cover['cover'] != $this->defaultCover ? $n_cover['cover'] : 0;
	 }
         
            $query_insert = $this->__om_query_insert("insert into ".nobil_om_playlist_pos." SET `trackid`='$id',`playlistid`=".$this->trackid);
        endforeach;

	if($founded_cover !== 0)
 	$this->__om_query_update("update ".nobil_om_playlists." SET `favorite_cover`='$founded_cover' where id=".$this->trackid);

        die('1');
    endif;

}

// buy song.. insert into db a new purchased song
public function buy_song($s_id = false){

    $s_id = isset($s_id) ? $s_id : $this->trackid;

    // check if the song exist into database
    $check_song = count($this->__om_query("select id from ".nobil_om_songs." where id='$s_id' limit 1"));

    if ($check_song) {
         /// insert into purchased table
        $insert = $this->__om_query_insert("insert into ".nobil_om_purchased." set `song`='$s_id', `user`='" . $this->USER['id']."'");
        if ($insert)
            die('<div class="m_song_purchased"><span class="text">Congratulation, the song has been purchased successfully, if you want to play it or download please click the button below, thanks.</span><button onclick="parent.success_paied()" class="m_song_payment_button">My purchased music</button></div>');
        else
            die('An error occured to buy song, please try again.');
        
    } else
        die('Sorry, but the track who you want to purchase has not found, we have yet more songs :)');
    

}


// update song information: artist name, song name, album name.
public function updateSongInfo(){
    $b = htmlentities($this->l_mb_string($this->b), ENT_QUOTES, "UTF-8");
    $c = htmlentities($this->l_mb_string($this->c), ENT_QUOTES, "UTF-8");
    $d = htmlentities($this->l_mb_string($this->d), ENT_QUOTES, "UTF-8");
    $v = isset($_POST['v']) && !empty($_POST['v']) ? $this->db->real_escape_string($_POST['v']) : 0;

    $up_cv = $v && filter_var($v, FILTER_VALIDATE_URL) ? ',cover="'.$v.'"' : '';

    $query = $this->__om_query_update("update ".nobil_om_songs." set `artist`='$b',`title`='$c',`album`='$d' $up_cv where `id`='$this->trackid'");

    if(!filter_var($v,FILTER_VALIDATE_URL) && $v) die('The cover have not been changed, invalid URL.');

    if($query) echo 1; else echo 0;


}

// delete covers with dead link
public function died_covers(){

    $defaultcv = $this->defaultCover;
    if ($this->b) // if requested data is not empty, run query
        $query = $this->__om_query_update("update ".nobil_om_songs." set cover='$defaultcv' where cover = '$this->b'");
    
}

// feedback
public function send_feedback(){

    $now  = time();
    $msg  = (isset($_POST['m']) ? $this->db->real_escape_string($_POST['m']) : '');
    $subj = (isset($_POST['s']) ? $this->db->real_escape_string($_POST['s']) : '');
    
    if ($this->b && $this->c) {
	$sql = "insert into ".nobil_om_feedback." set `sender`='{$this->b}', `send_at`='{$now}',`sender_email`='{$this->c}',`attachment`='{$this->d}',`subject`='{$subj}',`message`='{$msg}'";
        $insert = $this->__om_query_insert($sql);
        if ($insert)
            die('1');
        
    } else
        die('Enter your name and your email.'); 

}

// manipulates history (Recently played), update, insert.
public function updateHistory(){
    
    $time  = time();
    $items = array();
    
    if ($this->USER):
        if ($this->b === 'getData') {
            $select = $this->__om_query("select song from ".nobil_om_history." where `user`='" . $this->USER['id']."'");
            foreach($select as $res)
            $items[] = $res['song'];
            exit(json_encode($items));
        }
        // update
        if ($this->b === 'h_up') {
            $update = $this->__om_query_update("update ".nobil_om_history." SET `listen`='$time' where `song`='" . $this->trackid . "' and `user`='" . $this->USER['id']."'");
            die('1');
        } else if ($this->b === 'h_in') {
            // insert
            $insert = $this->__om_query_insert("insert into ".nobil_om_history." SET `listen`='$time',`user`='" . $this->USER['id'] . "',`song`='$this->trackid'");
            if ($insert)
                die('1');
        } else
            die('0');
    endif;

}

// get friends, select only friends who have music and stick on the left side
public function getFriends(){
    $i = $this->USER['id']; 
    $query = $this->__om_query("select u.*,mm.owner from ".tbl_users." u, ".tbl_friends." f, ".nobil_om_my_music." mm where u.id !='" . $this->USER['id'] . "' and mm.owner = u.id and u.id = f.friendid and f.userid='$i' and f.status='confirmed' group by u.id order by u.id");

    if (count($query) >= 1) {

// assign foreach loop to smarty
$this->inject_html->assign('query', $query);

// assign objects to smarty
$this->inject_html->assign('this',$this); // assign $this for call functions
$this->inject_html->assign('limit_of_users',$this->left_side_users_limit);

// display it
$this->inject_html->display('../template/ajax_result/friends.html');
    } else
        die('0');

}


// generate friends count of songs
public function get_friend_songs_count($friend_id){
$count = count($this->__om_query("select id from ".nobil_om_my_music." where `owner`=" . $friend_id));
echo $count;
}


// sharing function [v1.5]
public function EnableSharingDropDown($ID,$artist,$song) {

$this->inject_html->assign('sharing_url', urlencode($this->sharing_url.'?i='.$ID.'&tk='.$_COOKIE['tk_m'])); // url
$this->inject_html->assign('sharing_title', str_replace('%5C','',urlencode($artist)).' - '.str_replace('%5C','',urlencode($song))); // title
$this->inject_html->assign('sharing_cover', $this->sharing_cover.$ID); // cover
$this->inject_html->display('../template/ajax_result/sharing.html');
}

// call last uploads file [template]
public function EnableLFilesDropDown(){ return $this->inject_html->display('../template/ajax_result/last_files.html');}


// delete the playlists and all songs for this playlist
public function deletePlaylist(){

  // query
  $query = $this->__om_query_delete("

  DELETE a.*, b.* , p.*
       FROM ".nobil_om_playlists." as b 
       LEFT JOIN ".nobil_om_playlists." as p
      ON p.originalpid = b.id
       LEFT JOIN ".nobil_om_playlist_pos." as a
          ON a.playlistid = b.id where
             b.id = '$this->trackid' 
             AND b.owner = '" . $this->USER['id'] . "'

  ");



   echo '1';


}

// Search for songs to be included in the collection that will be created
public function addNewCollection(){

    if (empty($this->b))
        die('0');

    $query = $this->__om_query("select * from ".nobil_om_songs." where `artist` LIKE '%$this->b%' OR `title` LIKE '%$this->b%' group by id ORDER BY artist asc,title asc LIMIT 200");
    
    if (count($query) > 0) {

// assign foreach loop to smarty
$this->inject_html->assign('query', $query);

// display it
$this->inject_html->display('../template/ajax_result/search_new_collection.html');


        
    } else
        die('0');

}


// function to create new playlists
public function createNewPlaylist(){


    $now = time();
    
    $dt = $_POST['dt'];
    $founded_cover = 0;

    // NOTE: the variable $insert_playlist is returned as new inserted ID
    $insert_playlist = $this->__om_query_insert("insert into ".nobil_om_playlists." SET `name`='$this->b', `added` = '$now', `owner`='" . $this->USER['id']."'");

    if ($insert_playlist) { // <- it's ok ? further...
        if ($dt !== 'empty'):
            foreach ($dt as $id):
 		$select_cover = $this->__om_query("select cover from ".nobil_om_songs." where id='$id' and cover != '".$this->defaultCover."' limit 1");
 		foreach($select_cover as $cover)
		$founded_cover = $cover['cover'] != $this->defaultCover ? $cover['cover'] : 0;

                $insert_songs = $this->__om_query_insert("insert into ".nobil_om_playlist_pos." set `trackid`='$id', `playlistid`=" . $insert_playlist);
            endforeach;

	// set default cover for this created playlist
 	if($founded_cover !== 0)
 	$this->__om_query_update("update ".nobil_om_playlists." SET `favorite_cover`='$founded_cover' where id=".$insert_playlist);

        endif;

        echo $insert_playlist;
    } else echo '0';

}


// function to add songs to the respective playlist
public function addSongsToPlaylist(){

    // abbreviate main variables
    $b = $this->b;
    $c = $this->c;
    $d = $this->d;
    $trackid = $this->trackid;
    $now = time();

    if ($trackid && $b === 'exist_playlist'):
        $insert_track = $this->__om_query_insert("insert into ".nobil_om_playlist_pos." SET `trackid`='$trackid', `playlistid`='" . $c . "'");

	// insert into news feed 
	$this->toFeed($trackid,$c);

        if ($insert_track) {
            // delete all duplicates songs from playlist
            $dl = $this->__om_query_delete("DELETE p1 FROM ".nobil_om_playlist_pos." p1, ".nobil_om_playlist_pos." p2 WHERE p1.id < p2.id AND p1.trackid = p2.trackid AND p1.playlistid = p2.playlistid");
            $up = $this->__om_query_update("update ".nobil_om_playlists." set `updates`='yes' where originalpid='" . $c . "'");
            $get_c = $this->__om_query("select DISTINCT m.cover,COUNT(p.id) from ".nobil_om_songs." m, ".nobil_om_playlist_pos." p WHERE m.id='$trackid' and p.playlistid='" . $c . "'");
            foreach($get_c as $get_cc)
            echo $get_cc['cover'] . ':><:' . $get_cc['COUNT(p.id)'];
            
        } else
            echo '0';
        exit;
    endif;
    
    if ($trackid):
        $now = time();
        $insert_pl   = $this->__om_query_insert("insert into ".nobil_om_playlists." SET `name`='$b', `added` = '$now', `owner`='" . $this->USER['id']."'");
        $insertid    = $insert_pl;
        $insert_song = $this->__om_query_insert("insert into ".nobil_om_playlist_pos." SET `trackid`='$trackid', `playlistid`=" . $insertid);

	// insert into news feed
	$this->toFeed($trackid,$insertid);

        $select_cover = $this->__om_query("select cover from ".nobil_om_songs." where `id`=" . $trackid);
        foreach($select_cover as $result_cover)
        $select_cover = $result_cover;
        if ($insertid)
            echo($insertid . '*-*' . $select_cover['cover']);
        else
            die('0');
        
        die;
    endif;
    
    $sql   =   "SELECT  id,name
         FROM ".nobil_om_playlists."
         WHERE  owner = '" . $this->USER['id'] . "' AND `originalpid` = '0'
          ORDER BY id DESC";

    $query = $this->__om_query($sql);
    
// assign foreach loop to smarty
$this->inject_html->assign('query', $query);

//assign variables to smarty
$this->inject_html->assign('count',count($query));
$this->inject_html->assign('d',$d);

// display it
$this->inject_html->display('../template/ajax_result/dropDown.html');

}

// #jSon  check if collection is created by respective user or is added from friends
public function checkMyCollection(){

    
    $sql = "select distinct `originalpid`,`id` FROM ".nobil_om_playlists." where `owner`='" . $this->USER['id']."'";
    
    // run query
    $query = $this->__om_query($sql);
    
    $i_my_collection = array();
    // store data
    foreach($query as $r):
        $x = ($r['originalpid'] ? $r['originalpid'] : $r['id']);
        $i_my_collection[] = $x;
    endforeach;
    
    echo(json_encode($i_my_collection));

}


// stores the IDs of all my songs and my playlists to the jSon and sends them to remove dropDown
public function checkMyMusic(){

    
    $sql = "select distinct m.musid FROM ".nobil_om_my_music." m where m.owner='" . $this->USER['id']."'";
    
    $query_a = $this->__om_query($sql);
    
    $items = array(); // simple array
    
    foreach($query_a as $result)
        $items[] = $result['musid'];
    
    
    $sql = "select distinct pp.trackid from ".nobil_om_playlists." p, ".nobil_om_playlist_pos." pp where pp.playlistid=p.id and p.owner='" . $this->USER['id']."'";
    
    $query_b = $this->__om_query($sql);
    
    
    foreach ($query_b as $r)
        $items[] = $r['trackid'];
    
    // send json object to javascript
    echo(json_encode($items));
    

}



// for edit playlist, update cover of respective playlist
public function updatePlaylistCover(){

    $b_p_c = (isset($_POST['cv_or']) ? $this->db->real_escape_string($_POST['cv_or']) : '');
    
    if ($b_p_c === 'update_name_of_pl') {
        $update_name = $this->__om_query_update("update ".nobil_om_playlists." set `name`='$this->b' where `id`='$this->trackid' and `owner` = '" . $this->USER['id']."'");
        die('1');
    }
    $sql_a = "UPDATE ".nobil_om_playlists." SET favorite_cover = '$b_p_c' where id='$this->trackid' and owner = '" . $this->USER['id']."'";
    $sql_b = "UPDATE ".nobil_om_playlists." SET favorite_cover = '$b_p_c' where originalpid='$this->trackid'";
    
    
    $check_if_exists_playlist = count($this->__om_query("select id from ".nobil_om_playlists." where `id`='" . $this->trackid ."' limit 1"));
    
    if ($check_if_exists_playlist > 0 && ($b_p_c != $this->defaultCover || $b_p_c != str_replace($this->host, '' ,$this->defaultCover) || $b_p_c != $this->collection_img || $b_p_c != str_replace($this->host, '' ,$this->collection_img))) {
        $update_cover_a = $this->__om_query_update($sql_a);
        $update_cover_b = $this->__om_query_update($sql_b);
        echo 1;
    } else
        die('Sorry, but the playlist has not found');


}

// check if there are new songs in the playlist and green lamp lights
public function getForUpdatedPlaylists(){

    $items = array();
    $sql   = "select originalpid from ".nobil_om_playlists." where updates='yes' and `originalpid` IS NOT NULL and owner = '" . $this->USER['id']."'";
    $query = $this->__om_query($sql);
    $count = count($query); echo $count;
    if ($count > 0) {
        foreach ($query as $res)
            $items[] = $res['originalpid'];
        
        echo(json_encode($items));
        
    } else
        echo('0');

}


// get the user playlists, jSon
public function getMyPlaylists(){

    
    // delete all duplicates songs from playlist p
    $dl = $this->__om_query_delete("DELETE p1 FROM ".nobil_om_playlist_pos." p1, ".nobil_om_playlist_pos." p2 WHERE p1.id < p2.id AND p1.trackid = p2.trackid AND p1.playlistid = p2.playlistid");
    
    
    $sql = "SELECT distinct pp.trackid,p.*,COUNT(pp.trackid) as s_count
            FROM ".nobil_om_playlists." p
            left join ".nobil_om_playlist_pos." pp on pp.playlistid = p.id OR pp.playlistid = p.originalpid 
            WHERE p.owner = '" . $this->USER['id'] . "'
            group by p.id ORDER BY p.id ASC";
    
    // run query
    $query = $this->__om_query($sql);
    
    $items = '';

    foreach ($query as $rows) {

        $p_original_ID  = $rows['originalpid'];
        $favorite_cover = urldecode($rows['favorite_cover']);
        $updates        = $rows['updates'];
        $pNm            = urldecode($rows['name']);
        $cvr            = $favorite_cover;
        $pCv            = ($cvr !== $this->defaultCover && !empty($cvr) ? $cvr : $this->collection_img);
        $pId            = ($p_original_ID > '0' ? $p_original_ID : $rows['id']);
        $pCo            = $rows['s_count']; //($p_original_ID !== '0' ? $rows['s_count'] :  $rows['s_count']-1);
        
        
        $items .= <<<EOD
                       {

            "pn": "{$pNm}",
            "pc": "{$pCv}",
            "pi": "{$pId}",
            "po": "{$pCo}",
            "pu": "{$updates}"

       },
EOD;
        
    }
    
    
    
    if ($items != '') {
        $items = substr($items, 0, -1);
    }
    //header('Content-type: application/json');
    printf('{ "items": [%s]}', $items);
    
    exit(0);

}


// add foreign collections to my collections archive
public function addCollection(){

    if ($this->c) {
        $now   = time();
        $name  = $this->db->real_escape_string(urldecode($_POST['n']));
        $plco  = $this->db->real_escape_string($_POST['m']);
        $orig  = '-' . $this->db->real_escape_string($_POST['l']);
        $cover = $this->db->real_escape_string(urldecode($_POST['i']));
        $songs = $_POST['song'];
        
        
        
        $insert_into_playlist = $this->__om_query_insert("insert into ".nobil_om_playlists." set 
                                `added`='$now',
                                `owner`='" . $this->USER['id'] . "',
                                `name`='$name',
                                `playcount`='-0',
                                `originalpid`='$orig',
                                `favorite_cover`='$cover'") or die('0');
        
        $om_tb_playlists_id = $insert_into_playlist;
        if ($om_tb_playlists_id) {
            
            // after collection is successfully addded, insert songs in it
            foreach ($songs as $id)
                $insert_songs = $this->__om_query_insert("insert into ".nobil_om_playlist_pos." set `trackid`='$id', `playlistid`='$om_tb_playlists_id'");

            echo $om_tb_playlists_id;
            die;
        } else
            die('0');
    }
    
    $sql_select_collection_data = $this->__om_query("select * from ".nobil_om_playlists." where id='" . $this->b . "'");
  
    foreach($sql_select_collection_data as $result)
    $sql_select_collection_data = $result;    

    if ($sql_select_collection_data) {
        $insert_into_playlist = $this->__om_query_insert("insert into ".nobil_om_playlists." set 
                                `added`='" . $sql_select_collection_data['added'] . "',
                                `owner`='" . $this->USER['id'] . "',
                                `name`='" . $sql_select_collection_data['name'] . "',
                                `playcount`='" . $sql_select_collection_data['playcount'] . "',
                                `originalpid`='" . $sql_select_collection_data['id']."',
				`favorite_cover`='" . $sql_select_collection_data['favorite_cover']."'
				");

        if ($insert_into_playlist)
            echo '1';
        
    } else
        echo '0';

}

// add tracks to my music collection
public function addTrack(){

    $now = time();
    if ($this->b === 'm') {
        $select         = $this->__om_query("select id,uploader from ".nobil_om_songs." where id='$this->trackid'");
        foreach($select as $result) $select = $result;
        $mymus          = count($this->__om_query("select id from ".nobil_om_my_music." where musid='$this->trackid' and owner = '" . $this->USER['id']."'"));
        $my_songs_count = count($this->__om_query("select id from ".nobil_om_my_music." where owner = '" . $this->USER['id']."'"));
        $uploader       = ($select['uploader'] ? $select['uploader'] : '0');
        $added          = time();
        $musid          = $select['id'];
        if ($mymus >= 1) {
            $this->__om_query_update("update ".nobil_om_my_music." set `added`='$now',`position`='0' where `musid`='$musid' and `owner`='" . $this->USER['id']."'");
            echo $my_songs_count;
            exit();
        } //die('Sorry, but the track already exist into your music'); 
        else if (!$select['id'])
            die('Sorry, but the track has not found, please try again');
        $addMusic = $this->__om_query_insert("insert into ".nobil_om_my_music." SET `musid`='$musid',`uploader`='$uploader',`added`='$added',`owner`='" . $this->USER['id']."'");
	
	// insert into news feed 
	$this->toFeed($musid);

        echo $my_songs_count + 1;
        die();
        
    } else if ($this->b === 'p') {
        
        $sql   = "select m.id,COUNT(pp.trackid) from ".nobil_om_songs." m left join ".nobil_om_playlist_pos." pp ON pp.playlistid = '$this->c' and pp.trackid = '$this->trackid' where m.id = '$this->trackid' ";
        $ssl   = $this->__om_query($sql);
        foreach($ssl as $p_s)
        $p_s = $p_s;
        $mymus = $p_s['COUNT(pp.trackid)'];
        $musid = $p_s['id'];
        if ($mymus >= 1)
            echo '1'; //die('Sorry, but the track already exist into your music'); 
        else if (!$p_s['id'])
            die('Sorry, but the track has not found, please try again');
        $addMusic = $this->__om_query("insert into ".nobil_om_playlist_pos." SET `trackid`='$this->trackid',`playlistid`='$this->c'");

	// insert into news feed 
	$this->toFeed($this->trackid,$this->c);

        echo '1';
        
    }

}

// restore deleted song, [ for playlists and my music ]
public function restoreSong(){


    $select   = $this->__om_query("select `uploader` from ".nobil_om_songs." where `id`='$this->trackid'");
    foreach($select as $result)
    $select = $result;
    $uploader = ($select['uploader'] ? $select['uploader'] : '0');
    
    $m_r_sql = "insert into ".nobil_om_my_music." SET `musid`='$this->trackid',`uploader`='$uploader',`added`='$this->c',`position`='$this->b',`owner`='" . $this->USER['id']."'";
    $p_r_sql = "insert into ".nobil_om_playlist_pos." SET `trackid`='$this->trackid',`position`='$this->b',`playlistid`='$this->c'";
    
    $s_q_l = ($this->d === 'm' ? $m_r_sql : $p_r_sql);
    
    $restore = $this->__om_query_insert($s_q_l);
    if($restore)
    echo 1;
    else echo 0;

}


// delete song [ for playlists and my music ]
public function deleteSong(){

    $m_d_sql = "delete from ".nobil_om_my_music." where `musid`='$this->trackid' AND `owner`='" . $this->USER['id']."'";
    $p_d_sql = "delete from ".nobil_om_playlist_pos." where `trackid`='$this->trackid' AND `playlistid`=" . $this->b;
    
    $s_q_l = ($this->d === 'm' ? $m_d_sql : $p_d_sql);
    $delete = $this->__om_query_delete($s_q_l);
    if($delete)
    echo 1;
    else echo 0;

}

// sorting songs
public function sortSongs(){

    $data = $_POST['tracks'];
    $i    = 0;
    foreach ($data as $id) {
        $id = $this->db->real_escape_string($id);
        $updatePlayList = $this->__om_query_update("update ".nobil_om_my_music." set `position` = '$i' where `musid`='$id' AND `owner`='" . $this->USER['id']."'");
        
        $i++;
    }
    echo 1;

}

// sorting songs from playlist
public function sortPlaylistSongs(){

    $data = $_POST['tracks'];
    $plId = $_POST['pl'];
    
    
    $i = 0;
    foreach ($data as $id) {
        $id = $this->db->real_escape_string($id);
        $updatePlayList = $this->__om_query_update("update ".nobil_om_playlist_pos." set `position` = '$i' where `trackid`='$id' AND `playlistid`=" . $plId);
        
        $i++;
    }
    echo 1;


}


} // END class
