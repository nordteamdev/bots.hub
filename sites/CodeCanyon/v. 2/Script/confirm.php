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


// engine file
require_once('inc/_core.php');

 
$email = isset($_GET['email']) ? $_GET['email'] : '';
$id = isset($_GET['uid']) ? $_GET['uid'] : '';
$p = isset($_GET['p']) ? $_GET['p'] : '';

try {
	// build engine
	$core = new _SOCIALPLUS;
        $glb  = $core->im_global();




	if( $email && $p && $id) {
	// check for hash and email
	
	$q = count($core->query_select("select id from ".tbl_users." where `id`='{$id}' and `email`='{$email}' limit 1"));
	

	if($q){
			$core->query_update("update ".tbl_users." set `status`='confirmed' where `id`='{$id}'");
		
			$core->signincookie($id, $p);
			header("location: ".$core->settings['HOST']."?welcome=1");
		
		
	} else {
		
			// get header
		$core->build_header();
		$core->message("error","An error occured at activate your account, please retry or write us.");
		
			//get footer
	$core->get_footer();
	}
	
	
	
	
	}
	



} catch (Exception $e) {
	print $e->getMessage();
}
