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

require_once($_SERVER['DOCUMENT_ROOT'] ."/music/__cache/_core.php");

$id = isset($_GET['i']) ? (int)$_GET['i'] : 0;

if(!$id || !is_numeric($id))
die('Please enter a valid song id');

// call windowMusic
$c_eng = new __NOBIL_WindowMusic(true);

$artist = $song = $cover = $comment = $song_name = $song_path = $genre = $album = $path = '';

$query = $c_eng->__om_query("select artist,title,cover,comment,path,time,genre,album from ".nobil_om_songs." where `id`='".$id."'");

foreach($query as $res):
$artist = $res['artist'];
$song = $res['title'];
$song_name = $artist.' - '.$song;
$comment = $res['comment'];
$cover = isset($res['cover']) ? $res['cover'] : $wMusic_config['defaultCover'];
$song_path = $res['path'];
$genre = $res['genre'];
$album = $res['album'];
$song_path = $c_eng->host .__WindowMusic__.$c_eng->files_dir. $res['path'];
endforeach;

$vc = @explode('/', $cover);
$cover = isset($vc[3]) && '../'.$vc[3].'/' == __FILE_COVER_DIR ? $wMusic_config['host'].$cover : $cover;


?>
<!DOCTYPE html>

<html>
<head>
<link rel="stylesheet" type="text/css" href="../css/style.css?v=254363">
<script type="text/javascript" src="../../js/jquery-v1.11.1.js"></script>
<script type="text/javascript" src="../javascript/nobilscripts.WindowMusic_v1.9.js"></script>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9">


<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">

<meta property="og:site_name" content="<?php echo $wMusic_config['sharing_title'];?>">
<meta property="og:title" content="<?php echo $song_name;?>">
<meta property="og:url" content="<?php echo $wMusic_config['host'].__WindowMusic__.'media/share.php?i='.$id;?>">
<meta property="og:description" content="<?php echo $comment;?>">
<meta property="og:image" content="<?php echo $wMusic_config['host'].__WindowMusic__.'media/getCover.php?i='.$id;?>">
<meta property="og:audio" content="<?php echo $wMusic_config['host'].__WindowMusic__.'media/getSong.php?i='.$id;?>">
<meta property="og:audio:type" content="audio/vnd.facebook.bridge">
<meta property="og:type" content="music.song">

<meta name="twitter:card" content="summary">
<meta name="twitter:url" content="<?php echo $wMusic_config['host'].__WindowMusic__.'media/share.php?i='.$id;?>">
<meta name="twitter:title" content="<?php echo $song_name;?>">
<meta name="twitter:description" content="<?php echo $comment;?>">
<meta name="twitter:site" content="<?php echo $wMusic_config['sharing_title'];?>">
<meta name="twitter:creator" content="Nobil Scripts">
<meta name="twitter:image" content="<?php echo $wMusic_config['host'].__WindowMusic__.'media/getCover.php?i='.$id;?>">

</head>
<h2>This is a simple player for shared song, you need to implement it into your site.</h2>
<audio src="<?php echo $song_path;?>" preload="auto" />
<script>
  waudio.events.ready(function() {
    var a = waudio.createAll();
  });
setTimeout(function(){
//removeClass('mus_player-controls_i');
jQuery('.mus_player_cover-img').attr('src','<?php echo $cover;?>').removeAttr('onerror').removeAttr('style');//.after('<a class="__pause __play"></a>');
jQuery('.mus_player_info,.__back,.__forward,.mus_player-volume,.mml_ac,.mus_player_shuffle,.mus_player_repeat').remove();
jQuery('.mus_player_artist').text('<?php echo $artist;?>').addClass('share_artist');
jQuery('.mus_player_song').text('<?php echo $song;?>').addClass('share_song');
jQuery('.play').on('click',function(){ audiojs.playPause();});
jQuery('.__pause.__play').addClass('sharing_p').removeClass('mus_player-controls_i').click(function(){ if(!this.pl) {this.pl = true;jQuery(this).addClass('__playing'); } else { this.pl = false; jQuery(this).removeClass('__playing');} });
jQuery('.mus_player-controls').removeClass('mus_player-controls');
},500);
</script>



<style>
.sharing_p{
position: relative;
  width: 48px;
  height: 48px;
  left: 68px;
  z-index: 99;
  background-color: rgba(0,0,0,.5);
  top: 0px;
  opacity: 1;
  -webkit-transition: opacity .3s,top 0 0;
  transition: opacity .3s,top 0 0;
cursor:pointer;
}

.sharing_p:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-left: -8px;
  margin-top: -10px;
  opacity:.85
}
.sharing_p:before {
  background-image: url(../css/images/b5069d75870d794dd030a2976b22eacd.png?v=2);
  background-position: left -147px;
}
.sharing_p:hover:before {
opacity:1;
}
.sharing_p.__playing:before{
  background-position: left -175px;
}
.share_artist,.share_song {
font-family:Arial,helvetica,sans-serif;
color:#000;

}
.mus_player_played, .mus_player_duration {
font-family:Arial,helvetica,sans-serif;
}

.mus_player_played{
color:silver;
}
.mus_player_duration{
color:#000;
}

</style>
