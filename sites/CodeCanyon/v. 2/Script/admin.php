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

// admin class
require_once('admincp/admin.class.php');

try {
	// build engine
	$admincp = new admincp;
	
	$no_header_footer = isset($_POST['json']) ? 1 : 0;
	
	// get header
	if(!$no_header_footer)$admincp->header();

	$cmd = isset($_GET['cmd']) ? $_GET['cmd'] : (isset($_POST['cmd']) ? $_POST['cmd'] : '');

	// echo $no_header_footer;die;
	
	switch ($cmd){
		
		default:
		// home page
		$admincp->cnt();
		break;

		
		// languages
		case 'lang':
		$admincp->lang();
		break;
		
		// update language
		case 'updateLang':
		$admincp->upLang();
		break;
		
		// mailing
		case 'mail':
		$admincp->mailing();
		break;
		
		// send mail
		case 'sendmail':
		$admincp->sendmail();
		break;
		
		// reports
		case 'reports':
		$admincp->reports();
		break;
		
		
		// view report
		case 'viewreport':
		$admincp->viewreport();
		break;
		
		// block post
		case 'block-post':
		$admincp->blockPost();
		break;
		
		// delete photo
		case 'rdeletephoto':
		$admincp->rDeletePhoto();
		break;
		
		// delete video
		case 'rdeletevideo':
		$admincp->rDeleteVideo();
		break;
		
		// make reports as read
		case 'reportsMarkAsRead':
		$admincp->markReportAsRead();
		break;
		
		// mark message as spam
		case 'msgmarkasspam':
		$admincp->msgAsSpam();
		break;
				
		// search
		case 'search':
		$admincp->search();
		break;
				
		// monthly average
		case 'mavg':
		$admincp->gSiteMonthAvg();
		break;
		
		// site settings
		case 'settings':
		$admincp->siteSettings();
		break;
		
		// save site settings
		case 'savesitesettings':
		$admincp->saveSiteSettings();
		break;
		
		// users
		case 'users':
		$admincp->users();
		break;
		
		// edit user
		case 'useredit':
		$admincp->userEdit();
		break;
		
		// save edited user
		case 'takeuseredit':
		$admincp->takeUserEdit();
		break;
		
		// edit song
		case 'trackedit':
		$admincp->editTrack();
		break;
		
		// save edited song
		case 'taketrackedit':
		$admincp->saveSongInfo();
		break;
		
		// songs
		case 'tracks':
		$admincp->tracks();
		break;
		
		// delete song
		case 'deleteTrack':
		$admincp->deleteTrack();
		break;
		
		// videos
		case 'videos':
		$admincp->videos();
		break;
		
		case 'communities':
		$admincp->communities();
		break;
		
		case 'unverify-group':
		$admincp->verifyUnverifyGroups('unverify');
		break;
		case 'verify-group':
		$admincp->verifyUnverifyGroups('verify');
		break;
		case 'games':
			
			// games
			$admincp->games();
		
		break;
		
		case 'uploadgamecovers':
			$admincp->uploadGameCovers();
		break;
		
		// create app
		case 'createnewapp':
		$admincp->createApp();
		break;
		
		// delete app
		case 'deleteApp':
		$admincp->deleteApp();
		break;
		
		// edit video
		case 'videoedit':
		$admincp->videoEdit();
		break;
		
		// save edited video
		case 'takevideoedit':
		$admincp->saveEditedVideo();
		break;
		
		// delete video
		case 'deleteVideo':
		$admincp->deleteVideo();
		break;
		
		// general settings
		case 'gsettings':
		$admincp->generalSettings();
		break;
		
		// save general settings
		case 'savegsettings':
		$admincp->saveGeneralSettings();
		break;
		
		// ads
		case 'ads':
		$admincp->ads();
		break;
		
		// update ads
		case'saveads':
		$admincp->updateAds();
		break;
		
		
		// terms
		case 'terms':
		$admincp->terms();
		break;
		
		// save terms
		case 'saveterms':
		$admincp->saveTPA();
		break;
		
		// get feedback messages
		case 'getFeedbackMsgs':
		$admincp->getFeedbackMsgs();
		break;
		
		// feedback data for popup
		case 'getFeedbackContent':
		$admincp->getFeedbackContent();
		break;
		
		// posts
		case 'posts':
		$admincp->posts();
		break;
		
		// edit post
		case 'editpost':
		$admincp->editPost();
		break;
		
		
		// save edited post
		case 'takepostedit':
		$admincp->savePost();
		break;
		
		// delete post
		case 'deletePost':
		$admincp->deletePost();
		break;
		
		// themes
		case 'themes':
		$admincp->gthemes();
		break;
		
		// gifts
		case 'gifts':
		$admincp->gifts();
		break;
		
		// upload gifts
		case 'uploadgifts':
		$admincp->uploadGifts();
		break;
		
		// submit new gift
		case 'createnewgift':
		$admincp->submitNewGifts();
		break;
		
		// delete gift
		case 'deleteGift':
		$admincp->deleteGift();
		break;
		
		// upload theme image
		case 'uploadthemeimage':
		$admincp->uploadThemeImage();
		break;
		
		// create new theme
		case 'createnewtheme':
		$admincp->createNewTheme();
		break;
		
		// delete theme
		case 'deleteTheme':
		$admincp->deleteTheme();
		break;
		
	}


	//get footer
	if(!$no_header_footer)$admincp->footer();

} catch (Exception $e) {
	print $e->getMessage();
}
