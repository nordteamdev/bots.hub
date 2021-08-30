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
    						        

session_start();

// engine file
require_once('inc/_core.php');

try {
	// build engine
	$core = new _SOCIALPLUS;
	$core->loggedin();
        $glb  = $core->im_global();

        //if (!isset($_SESSION['guests']))
        //$_SESSION['guests'] = array();


	$cmd = isset($_GET['cmd']) ? $core->test_input($_GET['cmd']) : '';
	$profileId = isset($_GET['q']) ? $core->test_input($_GET['q']) : '';
	$i = isset($_GET['i']) ? (int) $core->test_input($_GET['i']) : '0';
        $profileName = isset($_GET['n']) ? $core->test_input($_GET['n']) : '';
        $phId  =  isset($_GET['ph']) ? (int) $core->test_input($_GET['ph']) : '';


	$a = $profileId;
	$b = str_replace(" ", "-", $profileName);


	if(isset($_POST['type']) == 'pos'){
	$a = isset($_POST['q']) ? $core->test_input($_POST['q']) : '';
        $cmd = isset($_POST['cmd']) ? $core->test_input($_POST['cmd']) : '';
	$phId = isset($_POST['ph']) ? (int) $core->test_input($_POST['ph']) : '';
        $i = isset($_POST['i']) ? (int) $core->test_input($_POST['i']) : '0';

	// albums
	if(isset($_POST['tip']) == 'alb'){
        $albumPolicy = isset($_POST['st_layer_photoAlbumsPolicy']) ? $_POST['st_layer_photoAlbumsPolicy'] : '';
        $albName = isset($_POST['st_layer_alb_name']) ? $core->test_input($_POST['st_layer_alb_name']) : '';
	}

	}
	if($a || $profileId) $_SESSION['cur_uid'] = $a ? $a : ($profileId ? $profileId : $core->USER['id']); 

	if ($_SERVER['REQUEST_METHOD'] != "POST") 
 	// get header
	$core->build_header();
  
	switch($cmd){


	
	case 'hide_from_feed':
	$c_feed = new _u_wall;
	if($i)
	$c_feed->hide_from_feed($i);
	else echo 0;
	break;

	// jBox upload files (attachments module)
	case 'gJBupload':
	
	$glb->jBoxGetUploadHtml($i);

	break;

	// jBox get photos from album (attachments module)
	case 'jBoxPhotoAlbum':
        $i = $i ? $i : '0';

	$glb->jBoxPhotoAlbum($i);

	break;

	// jBox call user's photos (attachments module)
	case 'gAllPhotos':

	$glb->gAllPhotos();

	break;

        // jBox call all friends
        case 'all_friends':

	$glb->myFriends();

	break;

	case 'feedFilterFav':

	$glb->feedFavoriteUs($a,$i);
	
	break;
	
        // delete friend
	case 'unfriend':
	if(!is_numeric($i)) echo 0; else
	$glb->unfriend($i);

	break;

	// get profile theme
	case 'gTheme':

	$glb->profileTheme(isset($_SESSION['cur_uid']) ? ($_SESSION['cur_uid'] > 0 ? $_SESSION['cur_uid'] : $core->USER['id']) : $core->USER['id']);

	break;

	// set friend relationship
	case 'updateRelationShip':

	if(!is_numeric($i)) echo $core->lang['err_invalid_uid']; else
	///if(!isset($_POST['fr'])) echo $core->lang['err_invalid_relationship']; else
	$glb->updateRelationShip($i);

	break;

        // post status
        case 'pStatus':
		$postClass = $core->buildPostClass();
		
        if(empty($a) || !isset($core->USER['id']))
        echo $core->dieErr([ 'response' => $core->lang['st_no_prm'] ]);
  
		$categ = isset($_POST['categ']) ? $core->test_input($_POST['categ']) : '';
        $i ? $postClass->songToStatus($i) : ($categ ? $postClass->mediaToStatus($a,$categ) : $postClass->textToStatus($a));

        break;

	// hide current status
        case 'hideStatus':
	
	$glb->hideCurStatus($i);
	
	break;

        // get user's feed band
        case 'wall':

        if(!isset($_POST['token']) || !is_numeric($_POST['token']))
        $glb->dieErr(['content' => $core->lang['tehnical_error_on_wall']]);
 
		///$whoId = isset($_POST['w_prid']) ? (int) $core->test_input($_POST['w_prid']) : 0;
		//$whoId = 0;//isset($_POST['w_prid']) ? $core->test_input($_POST['w_prid']) : (isset($_SESSION['cur_uid']) ? ($_SESSION['cur_uid'] > 0 ? $core->test_input($_SESSION['cur_uid']) : $core->USER['id']) : $core->USER['id']); //$profileId ? $profileId : $core->USER['id'];
		
		$whoId = isset($_POST['uid']) ? (int) $core->test_input($_POST['uid']) : 0;
		$page = isset($_POST['fp']) ? $core->test_input($_POST['fp']) : ( isset($_GET['fp'])  ? (int) $core->test_input($_GET['fp']) : 0); 
        //if(isset($_SESSION['cur_uid'])) unset($_SESSION['cur_uid']);
		
        $glb->cFeed($whoId,$page);
        
        break;

        // remove friend notification
        case 'removeNotif':

        if(!is_numeric($i)) $glb->dieErr(['response' => '0']);
  
        $glb->removeNotification($i);

 
        break;
 
        // confirm friend request
        case 'vFriendReq':
   
        $notificationId = isset($_POST['nt']) ? $core->test_input($_POST['nt']) : '';
        if(!$i || !is_numeric($i) || !is_numeric($a) || !is_numeric($phId) || !is_numeric($notificationId))
        $glb->dieErr(['response' => $core->lang['tehnical_error']]);

        $glb->confirmFriendReq($i,$a,$phId,$notificationId);
  
        break;
	         
	// friend request
        case 'addFriend':

        if(!$i || !is_numeric($i))
        $glb->dieErr(['response' => $core->lang['tehnical_error']]);  

	if($core->USER['id'] == $i)
        $glb->dieErr(['response' => $core->lang['me_to_friends']]);    
 
             

        $glb->sendFriendRequest($i);

        break;

        // set photo as album cover
        case 'setAlbumCover':

        if($core->USER['id'] !== $a || !$i || !$phId)
        $glb->notFound();

        $glb->toAlbumCover($phId,$i);

        break;

        // move photos to another album
        case 'movePhotos':
 
        $postArray = isset($_POST['mvarr']) ? $_POST['mvarr'] : '';

        if(!$core->USER || empty($postArray) || $i < 0 || $a < 0) $glb->notFound();

        $glb->movePhotos($postArray,$i,$a);
 
        break;

        // get user albums
        case 'getAlbums':

        if(!$a && $a < 0) {echo 0; die;}

        $glb->getUAlbums($a);
        
        break;

        // delete album
        case 'deleteAlbum':
	
	if(!is_numeric($i)) $core->dieErr([ 'response' => '0', 'message' => $core->lang['err_invalid_id'] ]); 

        $glb->delete_album($i);

	break;

	// album page
	case 'album':
	
	if(!$i || !$a)
	$glb->notFound();

	$glb->profile_album_photos($a,$i,$profileName);

	break;
	
	// tagged album page
	case 'tagged_alb':
	if(!$a)
	$glb->notFound();
	$glb->profile_tagged_album($a,$profileName);
	
	break;
	
	// album "Deleted photos"
	case 'deleted_alb':
	if(!$a)
	$glb->notFound();
	$glb->profile_deleted_album($a,$profileName);
	
	break;
	
	// get grades
	case 'grades':
	
	if ($_SERVER['REQUEST_METHOD'] != "POST") 
	{
		
	$content = '<a id="refresh-url" onclick="event.preventDefault();evstop(event);return getMyGrades(this,event);" href="'.$_SERVER["REQUEST_URI"].'"></a>';
	echo $core->getPage($content);

	}

	break;
	
	// get notifications
        case 'Notif':
      
	if ($_SERVER['REQUEST_METHOD'] != "POST") 
	{
		
	$content = '<a id="refresh-url" onclick="return getMyNotifications(this,event);" href="'.$_SERVER["REQUEST_URI"].'"></a>';
	echo $core->getPage($content);

	}
 
        break;
		
		case 'groups': 
		$glb->profile_groups_page($a,$b);
		break;

        // add Album
        case 'addAlbum':

	$edit = isset($_POST['edit']) ? $core->test_input($_POST['edit']) : 0;
    
        if($edit && !is_numeric($edit)) $glb->dieErr(['response' => '0']);
	

	// for empty album name and/or checkboxes

        if(!$albumPolicy && !$albName){

	// empty checkboxed and albumname
	echo json_encode(['e_albumname' => '1','e_checkbox' => '1']);
	die;
	}

	else if(!$albName){

	// empty album name
	echo json_encode(['e_albumname' => '1']);
        die;
	}else if(!$albumPolicy){

        // empty checkboxes
	echo json_encode(['e_checkbox' => '1']);
        die;
	} 

	if( (!$core->USER['id'] || $core->USER['id'] != $a) || (!$albumPolicy || !$albName))
	$glb->notFound();
	if(!$edit)
	$glb->addAlbum($albumPolicy,$albName);
        else
	$glb->updateAlbum($albumPolicy,$albName,$edit);

        break;

	// rotate photo
	case 'rotate':

	if( (empty($a) || !$core->USER['id']) || !$phId)
	$glb->notFound();

	$glb->rotateImage($a,$phId);	
	
	break;

	// update photo description
	case 'phdescr':

	if( (empty($a) || !$core->USER['id']) || !$phId)
	$glb->notFound();

	$glb->profile_update_photoDescr($a,$phId);

	break;

	case 'profpict':


	if((empty($a) || $a != $core->USER['id']) || (empty($phId) || !is_numeric($phId)))
	$glb->notFound();

	$glb->profile_update_profPhoto($phId);

	break;

	case 'updateSort':

	if( (empty($core->USER['id']) || !is_numeric($core->USER['id'])) || $core->USER['id'] != $a)
	$glb->notFound();

	$glb->profile_update_sort();

	break;

	// sort photos from album
        case 'AsortPhotos':

	if( (empty($core->USER['id']) || !is_numeric($core->USER['id'])) || $core->USER['id'] != $a)
	$glb->notFound();

	$glb->profile_sort_photos($i);
	
	break;
	
	// sort personal photos
	case 'sortPhotos':

	if( (empty($core->USER['id']) || !is_numeric($core->USER['id'])) || $core->USER['id'] != $a)
	$glb->notFound();

	$glb->profile_sort_photos();

	break;

	// return deleted photo
	case 'phreturn':

	
		
	$glb->profile_photo_return($a,$b);
	
	break;

	// delete photo
        case 'deletephoto':
	
	if(!is_numeric($phId)) $glb->notFound();	   

	$glb->profile_delete_photo($a,$b,$phId);
	
	break;


    case 'photos':

	$glb->profile_photos_page($a,$b);

	break;

    case 'posts':

	$glb->profile_posts_page($a,$b);

	break;

	case 'friends':

	$filter = isset($_GET['filter']) ? $core->test_input($_GET['filter']) : '';
	$glb->profile_friends_page($a,$b,$filter);	

	break;

	// load indicate relation ship button
	case 'loadFriendRelationShipBtn':
	$glb->getRelationshipButton();
	break;
	
	// check availability of email in reg form
	case 'registrationValidateEmail':
	$core->regFormValidateMail();
	break;
	
	// profile settings
	case 'settings':
	
	if(!$core->USER) $glb->notFound();
	
	$glb->profile_settings_page();
	
	break;
	
	// personal photos
	case 'pphotos':

	$glb->profile_personal_photos($a,$b);

	break;

	// get alphabet
	case 'getAlpha':

	$glb->getAlpha($i);

	break;

	// search for friends (in friends page)
	case 'searchFriends':
	
        $glb->searchForFriends();

	break;

	// update friends relationship
        case 'updFriendRelat':

	if(!$glb->USER['id']) echo 0; else
	$glb->notifUpdateFriendRelation($phId,$i);
	
	break;
	
	// opposite friends relationship
	case 'opposRelationShip':

        $f_repl = isset($_POST['r']) ? $_POST['r'] : '';
	echo $glb->oppositeRelationship($f_repl);
	break;

	case 'popupFriendRelationShip':

	$glb->popupFriendRelationShip();

	break;

	case 'saveFriendPopupRelationship':

	$glb->saveFriendPopupRelationship();

	break;
	
	case 'gifts':
	 
	$glb->profile_gifts_page($a,$b);
	
	break;
	
	case 'about':
	 
	$glb->profile_about_page($a,$b);
	
	break;

	// open photo viewer
	case 'openPhotoViewer':

	$_pviewer = new pviewer;
        $_pviewer->buildPopup();

	break;

	// create popups like windows 8
	case 'wpopups':

	$glb->wpopups();

	break;

	// check photo rate
	case 'check_photo_rate':
	$glb->checkRatingPhoto();
	break;

	// rate 
	case 'rateit':
	$glb->rateIt();
	break;

	// post comment to photo
	case 'photoPostComment':

	$glb->photoPostComment();

	break;

	//get comments of respective photo
	case 'getPhotoComments':
	$glb->photoGetComments();
	break;

	// get photo previous comments
	case 'getPhotoPrevComments':
	
	$glb->photoGetComments(1);
	
	break;
	
	case 'books':
	$glb->buildUserBooksPage($profileId);
	break;
	case 'movies':
	$glb->buildUserMoviesPage($profileId);
	break;
	default:

	$glb->profile_feed_page($a,$b);


	}

	if ($_SERVER['REQUEST_METHOD'] != "POST") 
	//get footer
	$core->get_footer();

} catch (Exception $e) {
	print $e->getMessage();
}
