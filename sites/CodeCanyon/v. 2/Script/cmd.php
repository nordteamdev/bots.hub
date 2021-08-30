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

	$cmd = isset($_POST['cmd']) ? $core->test_input($_POST['cmd']) : '';

	if($core->USER){
	$cglb  = $core->c_im_global();
	$glb  = $core->im_global();
	$widget_comm = $core->commWidget();
	$postClass = $core->buildPostClass();
	$searchClass = $core->buildSearchClass();	
	}
		
	switch($cmd){

	// gifs
	case 'gifs':
	echo $core->getGifs();
	break;
	
	// right column
	case 'rightColumn':
	echo $core->rightColumn();
	break;
	
	// get ad for messages window
	case 'getMessageAd':
	echo $core->getAdMarkup('messages');
	break;
	
	// buy votes
	case 'buy-votes':
	$core->buyVotes();
	break;
	
	case 'add-votes':

	$core->addVotes();
	break;
	
	case 'buy-votes-window':
	$core->buyVotesOpenWindow();
	break;
	
	// delete user profile
	case 'deleteprofile':
	
	$cglb->deleteUserProfile();
	break;
	
	// private profile
	case 'privateprofile':
	$cglb->privateProfile();
	break;
	
	// report
	case 'report_this':
	$core->reportThis();
	break;
	
	// like comment
	case 'commLike':
	
	$cglb->sendCommLike();

	break;

	// post reply to comment (in photoViewer)
	case 'commentPostReply':

	$cglb->postReplyToComment();

	break;
	
	// update comment
	case 'updateComment':
		
	$cglb->updateComment();
	
	break;

	// get people who liked a comment
	case 'hoverLikesPeople':
	
	$cglb->CommentHoverLikesPeople();
	
	break;
	
	/*// face detect (deprectated)
	case 'faceDetect':
	
	$cglb->faceDetect();
	
	break;
	
	// php face detector
	case 'phpFaceDetector':
	
	$cglb->phpFaceDetector();
	
	break;
	*/
	
	// get all friends (specialy for tags)
	case 'getAllFriends':
	
	$cglb->JSONgetAllFriends();
	
	break;
	
	// save tags in photo
	case'saveTaggsInPhoto':
	
		$cglb->savePhotoTags();
	
	break;
	
	// get photo tags
	case 'getPhotoTags':
	
	
	$cglb->getPhotoTags();
	
	break;
	
	//remove photo tag from notif
	case 'removeTagFromPhoto':
	
	$cglb->removePhotoTagFromNotif();
	
	break;
	
	// confirm tags request from notification
	case 'confirmRequestedTags':
	
	$cglb->confirmRequestedTags();
	
	break;
	
	// update photo description
	case 'updatePhotoDescription':
	
	$cglb->updatePhotoDescription();
	
	break;
	
	// get max 5 people in dropDown people who liked a photo
	case 'dropDownPhotoLikesPeople':
	
	$cglb->getPeopleLikedPhotoDropDown();
	
	break;
	
	// get all people who liked a photo
	case 'allPeopleLikedPhoto':
	$cglb->allPeopleLikedPhoto();
	break;
	// get all people who rated a photo
	case 'allPeopleRatedPhoto':
	$cglb->allPeopleRatedPhoto();
	break;
	
	// get mutual friends in popup
	case 'mutualfriendsfor':
	$cglb->popupGetMutualFriends();
	break;
	
	
	// get last 5 comments for photo in drop down
	case 'selectMinCommentsForPhoto':
	$cglb->selectMinCommentsForPhoto();
	
	break;
	
	// get all comments for photo in drop down
	case 'selectPrevMinCommentsForPhoto':
	$cglb->selectMinCommentsForPhoto(1);
	
	break;
	
	// save personal information
	case 'savePersonalInformation':
	$cglb->settingsSavePersonalInformation();
	break;
	// save nick name 
	case'saveNickName':
	$cglb->settingsSaveNickName();
	break;
	
	case 'savePhone':
	$cglb->settingsSavePhone();
	break;
	
	case 'user-settings-update-phone':
	$cglb->settingsUpdatePhone();
	break;
	
	
	// update profile password
	case 'updatePassword':
	
	$cglb->updateProfilePassword();
	
	break;
	
	// update profile email
	case 'updateProfileEmail':
	$cglb->updateProfileEmail();
	break;
	
	// remove user from blacklist
	case 'removeBlackList':
	$cglb->removeBlackList();
	break;
	
	// remove guest
	case 'removeGuest':
	$cglb->removeGuest();
	break;
	
	// select tracks for post
	case 'postSelectTracks':
	

			$postClass->selectTracks();
	
	break;
	
	case 'postSearchMusic':
	$postClass->postSearchMusic();
	break;
	
	case 'fetchUrl':
	
	$postClass->fetchUrl();
	
	break;
	// share link
	case 'shareLink':
	
	$postClass->shareLink();
	
	break;
	// check in
	case 'checkin':
	
	$postClass->checkIn();
	
	break;
	// remove checked in
	case 'removeCheckedIn':
	
	$postClass->rcheckIn();
	
	break;
	
	// create thumb for video
	case 'createVideoThumbnail':
	$postClass->bVideoThumb();
	break;
	
	// save video information
	case 'saveVideoInfo':
	$postClass->saveVideoInfo();
	break;
	
	// delete video
	case 'deletevideo':
	$postClass->deleteVideo();
	break;
	
	// restore video
	case 'restoreVideo':
	$postClass->restoreVideo();
	break;
	
	// send notification to people where tagged in a post
	case 'sendNotifToTaggedPeople':
	$postClass->sendNotifToTaggedPeople();
	break;
	
	// delete attached image from post
	case 'deletePostAttachedPhoto':
	$postClass->deletePostAttachedPhoto();
	break;
	
	// +1 video views
	case 'video_add_views':
	$cglb->updateVideoViews();
	break;
	
	// get post's comments
	case 'getPostComments': 
	$widget_comm->getPostComments();	
	break;
	
	// add comment
	case 'addComment':
	$widget_comm->addComment();
	break;
	
	// prev comments
	case 'getPostPrevComments':
	$widget_comm->prevComments();
	break;
	
	// delete post
	case 'deleteMyPost':
	$postClass->deleteMyPost();
	break;
	
	// restore post
	case 'restoreMyPost':
	
	$postClass->restoreMyPost();
	break;
	
	// set as current status
	case 'setAsCurrPost':
	$postClass->setAsCurrStatus();
	break;
	
	case 'is-online-user':
	$user_id = isset($_POST['uid']) ? $core->test_input($_POST['uid']) : 0;
	echo $core->is_online($user_id);
	break;
	
	// remove tag from post
	case 'removeTagFromPost':
	$postClass->removeUserTag();
	break;
	
	// tophead search
	case 'tophead_search_sugg':
	
	$searchClass->search_suggestion();
	
	break;
	
	// store all users name from database
	case 'searchHint':
	
	$searchClass->Hints();
	
	break;
	
	// get filter side for search page
	case 'getSearchFilterSide':
	
	$searchClass->getFilterBox();
	
	break;
	
	// liked content in feed, get all friends in popup
	case 'LikeFeedGetAllFriends':
	
	$cglb->LikeFeedGetAllFriends();
	
	break;
	
	// get user's photo albums (json)
	case 'getmyphotoalbums':
	
	echo $cglb->getUsPhotoAlbums();
	
	break;
	
	// get images from a certain album
	case 'getphotosfromalbum':
	
	echo $cglb->getPhotosFalbum();
	
	break;
	
	// get slideshow configuration
	case 'getSlidesShowConfiguration':
	echo $cglb->getSlideshowConfig();
	break;
	
	// update slideshow images position
	case 'updateSlideShowPosition':
	echo $cglb->updateSlideShowImagesOrder();
	break;
	
	// delete image from slideshow
	case 'removeImageFromSlideshow':
	echo $cglb->deleteImageFromSlideshow();
	break;
	
	// save slideshow settings
	case 'saveSlideshowConfig':
	echo $cglb->saveSlideShowConfig();
	break;
	
	// copy images to slideshow folder
	case 'copyImagesToSlideshow':
	echo $cglb->copySlideshowImages();
	break;
	
	// save uploaded cover
	case 'saveWrapCover':
	echo $cglb->saveWrapTheme();
	break;
	
	// switch to default theme
	case 'switchToDefaultTheme':
	echo $cglb->switchToDefaultTheme();
	break;
	
	// show my own themes
	case 'showMyOwnThemes':
	echo $cglb->showMyOwnThemes();
	break;
	
	// delete cover
	case 'deletemyowncover':
	echo $cglb->deleteOwnCover();
	break;
	
	// insert user in search history
	case 'toSearchHistory':
	
	$searchClass->toSearchHistory();
	
	break;
	
	// get search history
	case 'getSearchHistory':
	$searchClass->getSearchHistory();
	break;
	
	// create new poll
	case 'newPoll':
	$postClass->newPoll();
	break;
	
	// save vote in poll
	case 'pollvote':
	$cglb->PollVote();
	break;
	
	// get participants in the poll
	case 'pollParticipants':
	$cglb->PollUsers();
	break;
	
	// delete image definitive, from server & database
	case 'deleteimagedefinitive':
	$cglb->deletePictureDefinitive();
	break;
	
	// delete image definitive, from server & database
	case 'deletevideodefinitive':
	$cglb->deleteVideoDefinitive();
	break;
	
	//run app
	case 'runapp':
	$cglb->runapp();
	break;
	
	// search in apps page
	case 'searchInApps':
	$cglb->searchInApps();
	break;
	
	// get site languages 
	case 'getSiteLanguagesList':
	$core->getSiteLangList();
	break;
	
	// get content for terms/about/policy
	case 'tpapopup':
	$core->tpaPopup();
	break;
	
	// update user's language
	case 'updateUserLanguage':
	$core->updateUserLanguage();
	break;
	
	// empty feed
	case 'emptyfeed':
	$cglb->emptyFeed();
	break;
	
	// privacy update
	case 'privacyupdate':
	$cglb->privacyupdate();
	break;
	
	// settings update media
	case 'mediaupdate':
	$cglb->mediaUpdate();
	break;
	
	// save user's basic info
	case 'basic_info_update':
	$cglb->basicInfoUpdate();
	break;
	
	// save user's personal views
	case 'personal_views_update':
	$cglb->personal_views_update();
	break;
	
	
	// search friends in chat
	case 'searchChatFriends':
	$cglb->searchChatFriends();
	break;
	
	// add to bookmark
	case 'bookmarkThis':
	$cglb->bookmarkThis();
	break;
	
	// remove bookmark
	case 'deletebookmark':
	$cglb->removeBookmark();
	break;
	
	// is in bookmarks
	case 'isfavorite':
	$cglb->isFavorite();
	break;
	
	// get gift popup
	case 'getGiftPopup':
	$cglb->getGiftPopup();
	break;
	
	// gift send to
	case 'giftReadyToSend':
	$cglb->giftReadyToSend();
	break;
	
	// buy gift
	case 'buygift':
	$cglb->buyGift();
	break;
	
	// accept gift
	case 'acceptGift':
	$cglb->acceptGift();
	break;
	
	// check allow comment
	case 'allowCommentOnPhoto':
	$cglb->allowCommentOnPhoto();
	break;
	
	// reshare content
	case 'reshare':
	$cglb->reshare();
	break;
	
	// share in message
	case 'shareInMsg':
	$cglb->shareInMessage();
	break;
	
	// forgot pass by email
	case 'forgotPass':
	$core->forgotPassByMail();
	break;
	
	// setup new password
	case 'forgotSetNewPass':
	$core->forgotSetNewPass();
	break;

	
	// search place in groups
	case 'searchPlaceInGroups':
	$core->searchPlaceInCommunities();
	break;
	
	// get friends on map
	case 'addUsersOnmap':
	$core->addUsersOnmap();
	break;
	
	// live update user ip
	case 'liveUserOnMap':
	$core->getLiveUserOnMap();
	break;
	
	// get pictures from an album
	case 'change-profile-picture-get-picture-from-album':
	$cglb->getPictureFromAlbum();
	break;
	
	// translate text
	case 'translate_str': 
	$str_txt = isset($_POST['str_text']) ? $core->test_input($_POST['str_text']) : '';
	echo $core->translate_str($str_txt);
	break;
	
	// get google api key
	case 'getGoogleApiKey':
	echo $core->getGoogleApiKey();
	break;
	
	// get google countries
	case 'getGoogleCountries':
	$core->getGoogleCountries();
	break;
	
	// get leaflet countries
	case 'getLeafletLocations':
	$core->getLeafletLocations();
	
	break;
	// by leaflet
	case 'getThisUserLocationLeaflet':
	$core->getThisUserLocationLeaflet();
	break;
	// by google
	case 'getThisUserLocation':
	$core->getThisUserLocation();
	break;
	
	case 'completeProfile':
	echo $core->completeProfile();
	break;
	
	case 'user_save_profile_status':
	echo $core->updateProfileStatusMsg();
	break;
	
	case 'savenotificationsettings':
	echo $core->updateNotificationSettings();
	break;
	
	case 'dropdown-notify':
	echo $core->checkForDropDownNotify();
	break;
	
	case 'map-live-checkin':
	echo $core->MapLiveCheckin();
	break;
	
	case 'checkForUserMapStatus':
	echo $core->checkUserStatusOnMap();
	break;
	
	case 'deleteStatusFromMap':
	echo $core->deleteStatusFromMap();
	break;
	
	case 'search-movies':
	echo $core->searchMoviesByKey();
	break;
	
	case 'search-books':
	echo $core->searchBooksByKey();
	break;
	
	
	case 'addmovietouser':
	echo $core->addMovieToUser();
	break;
	
	case 'addbooktouser':
	echo $core->addbooktouser();
	break;
	
	case 'removePageItemFromColl':
	echo $glb->removePageItemFromColl();
	break;
	
	
	case 'addPageItemToMyColl':
	echo $glb->addPageItemToMyColl();
	break;
	
	case 'rate-item':
	echo $core->rateThisItem();
	break;
	
	case 'get-item-rating-count':
	echo $core->getRatingsCount();
	break;
	
	case 'get-secret-code':
	echo $core->getUserSecretCode();

	break;

	case 'getsecretcode':
	echo $core->getSecretCodeMarkup();
	break;
	
	case 'confirm-secret-code':
	echo $core->confirmSecretCodeAjax();
	break;
	
	case 'viewStatusesOnMap':
	echo $core->viewStatusesOnMap();
	break;
	case 'getajaxpostsonmap':
	echo $core->getAjaxPostsOnMap();
	break;
	
	case 'getnearbypeople':
	echo $core->getNearbyPeople();
	break;
	
	case 'getGeoLocByHttp':
	$uid = isset($_POST['uid']) ? $core->test_input($_POST['uid']) : '';
	$ip = isset($_POST['ip']) ? $core->test_input($_POST['ip']) : '';
    $url  =  "http://www.geoplugin.net/json.gp?ip=".  ($uid == 1 ? '95.85.50.218' : $ip);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);

    //decoding request
    $result = json_decode($data, true);
 
	echo json_encode(array("latitude" => $result['geoplugin_latitude'], "longitude" => $result['geoplugin_longitude']));
 
	
	break;
	
	case 'cleanup': 
	$core->autoclean();
	break;
	
	default:

	}


} catch (Exception $e) {
	print $e->getMessage();
}
