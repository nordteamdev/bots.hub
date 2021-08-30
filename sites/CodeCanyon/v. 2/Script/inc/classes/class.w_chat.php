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

 
class w_chat extends _global_co {

public $uid;
public $me;
public $time;
public $r;

// construct
public function __construct(){

parent::__construct();

$this->uid = isset($_GET['q']) ? (int) $this->test_input(b_decode($_GET['q'])) : 0;
$this->me = isset($this->USER['id']) ? (int) $this->test_input($this->USER['id']) : 0;
$this->time = time();



// check in database if user exist
$q_recip = $this->db->query("select id,fullname,profile_photo as photo, gender from ".tbl_users." where `id`='{$this->uid}' limit 1");
$this->r = $q_recip->fetch_array(MYSQLI_ASSOC);

// call header
$this->chat_header( (isset($this->r['fullname']) ? $this->r['fullname'] : $this->settings['SITENAME']), (isset($this->r['photo']) ? $this->r['photo'] : false), (isset($this->r['gender']) ? $this->r['gender'] : false) );

if(!$this->uid || !is_numeric($this->uid) || !$this->r)
{
	$this->chatError($this->lang['chat_user_not_found']); //err code 0 == invalid recipient id
	exit;
	
}



}

// messages query
public function chat_msgs_query($page = 0){
	
$uid = $this->uid;
$i = $this->me;

$msgs_limit = $this->settings['CHAT_LIMIT']; // from settings
$start = ($page * $msgs_limit) - $msgs_limit;

$limit = $page ? "limit {$start},{$msgs_limit}" : "limit ".$msgs_limit;

$query = $this->query_select("
SELECT * FROM (
select *, (select COUNT(id) from ".tbl_msg." where fromUser = '{$i}' && toUser = '{$uid}' && `deleteby` != '{$i}' 
				  || 
			     `fromUser` = '{$uid}' && `toUser` = '{$i}' && `deleteby` != '{$i}') as c

			      from ".tbl_msg." where fromUser = '{$i}' && toUser = '{$uid}' && `deleteby` != '{$i}'
			      || 
			     `fromUser` = '{$uid}' && `toUser` = '{$i}' && `deleteby` != '{$i}' order by time desc {$limit}

) sub
 ORDER BY time ASC
");

return $query;
	
	
}
// convert timestamp to hour and minutes
public function pm_time($t){
return date("H:i",$t);
}
// empty chat conversation 
public function empty_chat_conv(){
	
	
	return '<div class="_chempty42">'.$this->lang['pm_no_msg'].'</div>';
	
	
}

// get chat last messages
public function open(){
	
	
	$query = $this->chat_msgs_query();
	$date_verified = isset($_GET['verified']) ? true : false;
	$ver_link = $this->settings['HOST'].'/chat?q='.$this->uid.'&verified='.mt_rand().'&_tok='.time();
	
	$this->template->assign([ 'this' => $this, 'ver_link' => $ver_link, 'verified' => $date_verified, 'q' => $query, 'me' => $this->me, 'u' => $this->r ]);
	$this->template->display($this->theme_dir.'/chat/msgs.html');
	
}

// chat generate message date
public function chatGnDate($time){

$date = date('j',$time);
$dateMonth = date('Y',$time) == date('Y') ? ($date === date('j') ? $this->lang['today'] : ($date == date('j') -1 ? $this->lang['yesterday'] : date('j F', $time))) : date('j F, Y', $time);
return [$date,$dateMonth];	

}

// chat display errors
public function chatError($msg){
	
	echo '<div class="chat_warn"><i class="ic chat_warn_i"></i><span class="chat_warn_msg">'.$msg.'</span><br/><A onclick="this.classList.add(\'_//on\');" href="javascript:location.reload();"><div class="chat_refresh_w"></div></a></div>';
	
}
 // chat header 
 public function chat_header($title = false,$uphoto = false, $ugender = false){
	 
	 $title = $title ? $title : $this->settings['SITENAME'];
	 $this->template->assign([ 'this' => $this, 'title' => $title, 'recipient' => $this->uid, 'uphoto' => $uphoto, "ugender" => $ugender ]);
	 $this->template->display($this->theme_dir.'/chat/chat-header.html');
	 
 }
 public function getChatTemplate(){
	 
	
 }
} // end class