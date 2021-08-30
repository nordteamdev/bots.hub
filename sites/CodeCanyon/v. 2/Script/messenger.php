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
					        

//session_start();

// engine file
require_once('inc/_core.php');

try {
	// build engine
	$core = new _SOCIALPLUS;
	$core->loggedin();
    $glb  = $core->im_global();
    $messenger = $core->im_messenger();
	
	// get param
	$cmd = isset($_GET['cmd']) ? $core->test_input($_GET['cmd']) : ( isset($_POST['cmd']) ? $core->test_input($_POST['cmd']) : '');
	$view_as_json = isset($_GET['view_as']) ? $core->test_input($_GET['view_as']) : ( isset($_POST['view_as']) ? $core->test_input($_POST['view_as']) : '');
	$userid = isset($_GET['userid']) ? $core->test_input($_GET['userid']) : ( isset($_POST['userid']) ? $core->test_input($_POST['userid']) : '');	
	$text = isset($_POST['text']) ? $core->test_input($_POST['text']) : '';
	$page = isset($_POST['page']) ? $core->test_input($_POST['page']) : '';
	$id = isset($_POST['id']) ? $core->test_input($_POST['id']) : '';
	$recipient = $userid;
	// get header
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	$core->build_header();
	
	
	
	
	
	
	
	
	switch ($cmd){
	
	
	case 'open':
	
	$messenger->openBox();
	
	break;
 
	
	case 'getConversation':
	$messenger->getConversation($userid);
	break;
 
 
	case 'get-attachments':
	
	$messenger->getAttachments($userid);
	
	break;
	
	case 'getChatCurColor':
	echo $messenger->getChatCurrentColor($userid);
	break;
	
	case 'setColor':
	echo $messenger->setColor($userid);
	break;
	
	case 'uToBlackList':
	$messenger->toBlacklist($userid);
	break;
	
	case 'hideConversation':
	$messenger->hideConversation($userid);
	break;
	
	case 'delConversation':
	$messenger->delConversation($userid);
	break;
	
	case 'searchFriends':
	$messenger->PMsearchForFriends();
	break;
	
	case 'sendMessage':

	if(!$text || !$recipient){
		$messenger->sendResponse(['response' => $messenger->lang['pm_error_send'] . ' ~1']);
	} else {

	
	if($messenger->sendMessage($text,$recipient))
	$messenger->sendResponse(['response' => '1']);
	else if(!$text)
	$messenger->sendResponse(['response' => $messenger->lang['pm_empty_text']]);
	else if(!$recipient)
	$messenger->sendResponse(['response' => $messenger->lang['pm_error_send'] . ' ~1']);
	else
	$messenger->sendResponse(['response' => $messenger->lang['pm_error_send'] . ' ~2']);
	}
 
	
	
	break;
	
	case 'previous-messages':
	$messenger->getPrevMessages($userid,$page);
	break;
	
	case 'node-get-last-msg':
	$messenger->nodeLastMessage($userid);
	break;
	
	case 'node-update-as-read':
	$messenger->updateMessageAsSeen($id,$userid);
	break;
	case 'node-update-all-msgs-as-read':
	$messenger->updateAllMessagesAsRead($userid);
	break;
	case 'spam':
	
	$messenger->reportMessage($id);
	break;
	
	case 'delete':
	$messenger->deleteMessage($id);
	break;
	
	case 'get-nicknames':
	$messenger->getNicknames($userid);
	break;
	
	case 'setnickname':
	$messenger->setNickname($userid);
	break;
	
	case 'search-in-conversation':
	$messenger->search_in_conversation($userid);
	break;
	
	case 'onlineTab':
	$messenger->onlineTab();
	break;
	
	case 'uploadscreen':
	$messenger->uploadscreen();
	break;
	
	case 'send-voice-clip':
	$messenger->sendVoiceClip();
	break;
	
	case 'moreConversations':
	$messenger->getMoreContacts($page);
	break;
	
	case 'call':
	$messenger->callingPopups($userid);
	break;
	
	case 'getShortcutsSessionUserInfo':
	$messenger->getShortcutsSessionUserInfo();
	break;
 
	
	default:
    $messenger->constructPage();
	break;
	
	
	}

	//get footer
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	$core->get_footer();
	
	} catch (Exception $e) {
	print $e->getMessage();
}
