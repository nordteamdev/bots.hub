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
set_time_limit(0);
require_once($_SERVER['DOCUMENT_ROOT'] ."/music/__cache/_core.php");

$id = isset($_GET['i']) ? (int)$_GET['i'] : 0;
$dir = __ROOT__.__WindowMusic__.$wMusic_config['files_dir'];
$file_path = '';
if(!$id || !is_numeric($id))
die('Please enter a valid song id');

// call windowMusic
$c_eng = new __NOBIL_WindowMusic(true);

$query = $c_eng->__om_query("Select path from ".nobil_om_songs." where id='".$id."' limit 1");

if(count($query) <= 0) die('Sorry, the song has not been founded.');

foreach($query as $res)
$file_path = $res['path'];

$dir = __ROOT__.__WindowMusic__.$wMusic_config['files_dir'];
$filename = $file_path;
$file = $dir."/".$filename;

$extension = "mp3";
$mime_type = "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3";

if(file_exists($file)){
    header('Content-type: {$mime_type}');
    header('Content-length: ' . filesize($file));
    header('Content-Disposition: filename="' . $filename);
    header('X-Pad: avoid browser bug');
    header('Cache-Control: no-cache');
    //readfile($file);
$fp = fopen($file, 'rb'); 
fpassthru($fp); 
}else{
    header("HTTP/1.0 404 Not Found");
}