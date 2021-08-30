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

try {
	// build engine
	$core = new _SOCIALPLUS;
 
	$glb  = $core->im_global();
	$stories = $core->im_stories();
	$cmd = isset($_GET['cmd']) ? $core->test_input($_GET['cmd']) : ( isset($_POST['cmd']) ? $core->test_input($_POST['cmd']) : '');
	$view_as_json = isset($_GET['view_as']) ? $core->test_input($_GET['view_as']) : ( isset($_POST['view_as']) ? $core->test_input($_POST['view_as']) : '');
	
	
	// get header
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	if($cmd != 'view-picture') $core->build_header();

 
	
		switch($cmd) {
 
		
		case 'upload':
		$stories->upload();
		break;
		
		case 'deleteStory':
		$stories->delete_Story();
		break;
		
		case 'create-story':
		$stories->buildStory();
		break;
		
		case 'view-picture':
		$stories->viewPicture();
		break;
		
		case 'createVideoStory':
		$stories->createVideoStory();
		break;
		
		case 'add-views':
		$stories->addViews();
		break;
		
		case 'createCoverForVideo':
		$stories->createVideoCover();
		break;
		
		case 'getStoriesAjax':
		$stories->getStoriesAjax();
		break;
		
		case 'get-views':
		$stories->getViews(3);
		break;
 
 
		case 'get-story-guests':
		$stories->getAllGuests();
		break;
		
		}

	//get footer
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	if($cmd != 'view-picture') $core->get_footer();

} catch (Exception $e) {
	print $e->getMessage();
}
