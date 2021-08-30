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

 
 
 class cleanup_class extends _SOCIALPLUS {
	

// construct
public function __construct(){ 

	set_time_limit(0);
	ignore_user_abort(1);

}
public function docleanup() {

	//$core = new _SOCIALPLUS;
	//delete expired statuses on map
	$dt = strtotime('-23 hours');
	$this->query_delete("DELETE FROM ".tbl_friends_on_map." WHERE `available`='yes' AND `time` < '{$dt}'");

	// delete old data from nearby table (1 week)
	$dt = strtotime('-1 week');
	$this->query_delete("DELETE FROM ".tbl_nearby_people." WHERE `time` < '{$dt}'");
	
	
	// delete stories after 24 hours
	$dt = strtotime('-1 day');
	// select stories for deleting
	$q_stories = $this->query_select("select `id` from ".tbl_stories." where `added` < '{$dt}'");
	$stories = $this->im_stories();
	if(count($q_stories)){
	foreach($q_stories as $story):
	$stories->delete_Story($story['id'],true);
	endforeach;
	}
	
	
}

}

