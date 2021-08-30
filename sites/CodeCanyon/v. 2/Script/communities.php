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
	

	// call head
	$core = new _SOCIALPLUS;
	$core->loggedin();
    $glb  = $core->im_global();
	$comm = $core->im_communities();

	$cmd = isset($_GET['cmd']) ? $core->test_input($_GET['cmd']) : ( isset($_POST['cmd']) ? $core->test_input($_POST['cmd']) : '');
	$view_as_json = isset($_GET['view_as']) ? $core->test_input($_GET['view_as']) : ( isset($_POST['view_as']) ? $core->test_input($_POST['view_as']) : '');
	
	$id = isset($_POST['id']) ? (int) $core->test_input($_POST['id']) : (isset($_GET['id']) ? (int) $core->test_input($_GET['id']) : '');
	$id = preg_replace('/[^0-9]/', '', $id);
 
if( !( $cmd == 'join' || $cmd == 'unjoin' || $cmd == 'addcover' || $cmd == 'addlogo' || $cmd == 'followers-community') ){
 
// check if community is private or closed
$check = $core->db->query("select * from ".tbl_communities." where `id`='{$id}' limit 1");
$check = $check->fetch_array(MYSQLI_ASSOC);

if( ($check['privacy'] == 'Private' || $check['privacy'] == 'Closed') && !($comm->isAdmin() || $comm->isSubscribed($id)) ){
	// get header
	$core->build_header();
	
	$comm->privateCommunity($check);
	
	//get footer
	$core->get_footer();
	exit;
}

}
	
	
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	// get header
	$core->build_header();


	
	switch($cmd) {
		
		default:
		case '':
		 // create page
         $comm->communities();
		break;
		
		case 'new-popup':
		$comm->new_group_popup();
		break;
		
		case 'addcover': 
		$comm->addcover();
		break;
		
		case 'saveCommunity':
		$comm->saveCommunity();
		break;
		
		case 'updateCommunity':
		$comm->updateCommunity();
		break;
		
		case 'searchGroups':
		$comm->searchByCommunities();
		break;
		
		case 'details':
		$comm->communityPage();
		break;
		
		case 'saveStatus':
		$comm->saveStatus();
		break;
		
		case 'uploadImagesPopup':
		$comm->uploadImagePopup();
		break;
		
		case 'communityUploadImage':
		$comm->communityUploadImages();
		break;
		
		case 'addlogo':	
		$core->settings['AMAZON_S3_ENABLED'] ?  $comm->communityAddLogoToS3() : $comm->communityAddLogo();		
		break;
		
		case 'changeCover':
		$comm->changeCover();
		break;
		
		case 'deleteCover':
		$comm->deleteCover();
		break;
		
		// save cover position
		case 'communitySaveCover':
		$comm->communitySaveCoverPosition();
		break;
		
		// join to the group
		case'join':
		$comm->joinToThisGroup();
		break;
		
		case 'unjoin':
		$comm->unjoinToThisGroup();
		break;
		
		case 'edit-community':
		$comm->editCommunity();
		break;
		
		case 'followers-community': 
		$comm->communityFollowers();
		break;
		
		case 'add-admin':
		$comm->communityAddAdmin();
		break;
		
		case 'cm-admin-remove':
		$comm->communityManageAdminstrators('remove');
		break;
		
		case 'cm-admin-add':
		$comm->communityManageAdminstrators('add');
		break;
		
		case'albums':
		$comm->albums();
		break;
		
		case 'album-main':
		$comm->mainAlbum();
		break;
		
		case 'addphotos':
	 
		$core->settings['AMAZON_S3_ENABLED'] ?  $comm->communityUploadPicturesToS3() : $comm->communityUploadPictures();
		break;
		
		case 'delete-pic':
		$comm->deletePicture();
		break;
		
		case 'delete-video':
		$comm->deleteVideo();
		break;
		
		case 'add-video':
		$core->settings['AMAZON_S3_ENABLED'] ?  $comm->communityUploadVideosToS3() : $comm->communityUploadVideos();
		break;
		
		case 'add-album':
		$comm->createAlbum();
		break;
		
		case 'album-details':
		$comm->albumDetails();
		break;
		
		case 'album-edit':
		$comm->albumEdit();
		break;
		
		case 'update-album':
		$comm->updateCommAlbum();
		break;
		
		case 'album-videos':
		$comm->albumVideos();
		break;
		
		case 'share-community':
		$comm->shareCommunity();
		break;
	
		case 'save-file-info':
		$comm->saveFileInfo();
		break;
		
		case 'feed':
		$comm->feed();
		break;
		
		case 'my':
		$comm->myClubs();
		break;
		
		case 'album-load-more-items':
		$comm->albumGetMoreItems();
		break;
		
		case 'album-load-more-videos':
		$comm->albumGetMoreVideos();
		break;
		
	}

	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	//get footer
	$core->get_footer();

} catch (Exception $e) {
	print $e->getMessage();
}
