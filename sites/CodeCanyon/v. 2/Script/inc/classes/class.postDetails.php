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
   						        


class postDetails extends _global_co {


public $postid;
public $uid;
public $clubid;

public function __construct($postid){

//the old building from parent class
parent::__construct();

$this->postid = $postid;
$this->uid = isset($_POST['u']) ? (int) $this->test_input($_POST['u']) : (isset($_GET['u']) ? (int) $this->test_input($_GET['u']) : 0);
$this->clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : (isset($_GET['clubid']) ? (int) $this->test_input($_GET['clubid']) : 0);


}

// build post in popup
public function buildPopup(){
	
$nop = isset($_POST['nop']) ? $_POST['nop'] : '';	
	
$q = $this->clubid ? $this->db->query("select p.*, c.name as c_name,c.id as c_id, c.logo as c_logo,
							c.category as c_category, c.subcategory as c_subcategory 
							from ".tbl_posts." p
							left join ".tbl_communities." c ON c.id = p.clubid
							where p.id='{$this->postid}' and p.community='yes' and p.clubid='{$this->clubid}' group by p.id limit 1")
							
							: 
							
							$this->db->query("select p.*, u.fullname as uname,u.id as uid, u.profile_photo as uphoto, u.gender as ugender,
							  u.birthday as ubirthday
							from ".tbl_posts." p
							left join ".tbl_users." u ON u.id = p.userid
							where p.id='{$this->postid}' group by p.id limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

// post not found
if(!$r['id']) {
	echo 0;
	die;
}
// get post author's id
$uid = $r['userid'];

// next & previous id
$n_prev_id = $this->clubid ? $this->query_select(" select id from ".tbl_posts." 
		where ( 
        id = IFNULL((select min(id) from ".tbl_posts." where id > '{$this->postid}' and `clubid`='{$this->clubid}' and `community`='yes'),0) 
        or  id = IFNULL((select max(id) from ".tbl_posts." where id < '{$this->postid}' and `clubid`='{$this->clubid}' and `community`='yes'),0)
      )") 
	  
	  : 
	  
	  $this->query_select(" select id from ".tbl_posts." 
		where ( 
        id = IFNULL((select min(id) from ".tbl_posts." where id > '{$this->postid}' and `userid`='{$uid}'),0) 
        or  id = IFNULL((select max(id) from ".tbl_posts." where id < '{$this->postid}' and `userid`='{$uid}'),0)
      )");
$next_id = isset($n_prev_id[1]['id']) ? (int) $n_prev_id[1]['id'] : '';
$prev_id = isset($n_prev_id[0]['id']) ? (int) $n_prev_id[0]['id'] : '';

						
$this->template->assign([ "club_logo_url" => ($this->clubid ? $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->clubid.'/' : ''), "this" => $this, "res" => $r, "nop" => $nop, "clubid" => $this->clubid, "next_id" => $next_id, "prev_id" => $prev_id]);
$content = $this->template->fetch($this->theme_dir.'/popups/p_post_details.html');
echo $this->getPage($content);
}

public function view_post_by_link() {
	
	$content = '<a id="refresh-url" href="'.str_replace('&nop=1','',$_SERVER["REQUEST_URI"]).'" data-type-post="1"></a>';
	echo $this->getPage($content);
}

} // end class