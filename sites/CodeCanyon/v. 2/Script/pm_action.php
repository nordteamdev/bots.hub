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
     


// private messages class
//require_once('pm_class.php');

// engine file
require_once('inc/_core.php');

try {
	$core = new _SOCIALPLUS;$core->loggedin();
    $pm  = $core->c_PM();
      //  $pm   = new PRIVATE_MESSAGES;
	$pm->rlog();
        $user = $pm->USER;
	$action = isset($_POST['action']) ? $pm->test_input($_POST['action']) : '';
	$text = isset($_POST['text']) ? $pm->test_input($_POST['text']) : '';
	$recipient = isset($_POST['to']) ? (int) $pm->test_input($_POST['to']) : '';
	$typing = isset($_POST['tp']) ? $pm->test_input($_POST['tp']) : '';
        $i = isset($_POST['i']) ? $pm->test_input($_POST['i']) : '';
	$key = isset($_POST['key']) ? $pm->test_input($_POST['key']) : '';
	


        switch($action){

case 'chat_write':
$pm->chatWrite();
break;

case 'chat_write_delete':
$pm->chatWriteDelete();
break;

	case 'moreConversations':

	if($i)
	$pm->getMoreConversations($i);

	break;

	case 'searchFriends':
 
	$pm->PMsearchForFriends();
	break;

	case 'delConversation':

        if(!$recipient) echo $pm->lang['pm_no_opponent_id']; else $pm->delConversation($recipient);

	break;

	case 'hideConversation':

	if(!$recipient) echo $pm->lang['pm_no_opponent_id']; else $pm->hideConversation($recipient);

	break;

	case 'uToBlackList':

	if(!$recipient) echo '0'; else $pm->toBlacklist($recipient);

	break;
	// delete message
	case 'del':

	if($i)
	$pm->deleteMessage($i);
	else
	echo $pm->lang['pm_delete_no_message_id'];

	break;
	// report message
	case 'spam':

	if($i)
	$pm->reportMessage($i);
	else
	echo $pm->lang['pm_delete_no_message_id'];

	break;

	case 'onlineTab':

	$pm->switchToOnlineTab();

	break;

	case 'typing':

	$pm->typing($recipient,$typing);

	break;

	case 'chatNumCount':

	$pm->getNewMsgCount();	

	break;

	case 'chatheartbeat':

	$pm->checkForNewMessage($user['id'], $recipient);

	break;

	case 'oldm':

	$pm->getPrevMessages($recipient,$i);

	break;

	case 'getMessages':

	$pm->getConversation($recipient);


	break;

	case 'editMessage':

	$pm->editMessage($text,$recipient,$i);

	break;

	case 'sendMessage':

	if(!$text || !$recipient){
		$pm->sendResponse(['response' => $pm->lang['pm_error_send'] . ' ~1']);
	} else {

	
	if($pm->sendMessage($text,$recipient))
	$pm->sendResponse(['response' => '1']);
	else if(!$text)
	$pm->sendResponse(['response' => $pm->lang['pm_empty_text']]);
	else if(!$recipient)
	$pm->sendResponse(['response' => $pm->lang['pm_error_send'] . ' ~1']);
	else
	$pm->sendResponse(['response' => $pm->lang['pm_error_send'] . ' ~2']);
	}
	break;
	
	case 'getUsDialogs':

	$pm->getUsersDialog();

	break;

 
        }


} catch (Exception $e) {
	print $e->getMessage();
}
