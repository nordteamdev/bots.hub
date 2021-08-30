var chat_tabs = new Array();

var ch_blinkOrder = 0;

var ch_newMessages = new Array();
var ch_newMessagesWin = new Array();
var chat_tab_closed = new Array();
var ch_chatboxFocus = new Array();

var ch_windowFocus = true;
var ch_typing = 0;
var chat_emj,ch_emojiTxtEditor;
var plholder = lang.pm_emoji_placeholder;
var ch_originalTitle;

var chatHeartbeatCount = 0;
var minChatHeartbeat = 4000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var TAB_startChatHeartBeat;

var chat_markup = '<section id="%chatid" class="chat_tab">\
				   <a title="Close" onclick="closeChatTab(this,event,\'%chatid\');" href="javascript:void(0)" class="tico tico__n-t notifs_close"><span class="glyphicon glyphicon-remove chattab"></span><!--<i class="tico_img ic ic_close"></i>--></a>\
				   <div class="chat_sub_tab">\
				   <div class="chat_header_uname">\
				   <a href="javascript:void(0)" class="maxminchattab" onclick="toggleChatBoxGrowth(\'%chatid\');" >&nbsp;</a>\
				   <div class="chat_user_img"><img src="/getPhoto?p=%photo&sz=small" /></div>\
				   <a href="/user/%uid" hrefattr="true">%user_fullname</a>\
				   <div data-tipsy-orientation="e" style="display:none;" rel="tipsy" id="chat_active_now" class="ic_msg_header_online" title="'+ lang.active_now +'"><i class="msg_online_ic"></i></div>\
				   <span id="chat_tab_unread_count" class="chatTab_unread_count"></span>\
				   </div>\
				   <div class="chat_cnt">\
				   <div class="chat_msgs nano"><div class="chat_ovr nano-content">\
				   <div id="hooKMsgkLoadingChat" style="color:#fff;"><span class="app_loading"></span></div>\
					</div></div>\
					<div class="chat_txt_separator"></div>\
				   <div class="chat_textarea"><textarea placeholder="'+lang.pm_emoji_placeholder+'..." id="txt_%uid"></textarea>\
				   <div class="chat_bottom_ics" data-chat-id="t%chatid">\
					<a class="chat_sm_btn" href="javascript:;"></a>\
					</div>\
					<div id="WD_tracks_t%chatid" class="WD_attached_tracks _CHAT"><ul></ul></div>\
					<div id="t%chatid" class="jb_attached_files _tchat"></div>\
				   </div>\
				   </div></div></section>';
		
		
function getTabPos(chat_id){
	//return ((ga('#page_layout').width() - ( ga('.nav_tool_friends_online').width() + ga('#'+chat_id).width())) -20);
	return ga('.nav_tool_friends_online').width();//(ga('.nav_tool_friends_online').width() + ga('#'+chat_id).width()) -20;
}

function buildMap(){
	
	setTimeout(function ()
						{
							// build map
							if (ga('.chat_msgs')
								.find('.map-box')
								.length) ga('.chat_msgs')
								.find('.map-box')
								.each(function ()
								{
									var _t_data_ka = $(this)
										.find('.hookMapData')
										.html();
									var d_lc_map_dt = objHook(_t_data_ka);
									postPopupBuildMap(_t_data_ka, 'feed-tip-map-loc-' + d_lc_map_dt['pl-i']);
								});
						}, 100);
}

		function checkForOnlineUser(user_id){
			
		var chatTab = ga('#chat_'+user_id);
		var send = jAjax('/cmd.php','post',{'cmd':'is-online-user','uid':user_id});
		send.done(function(d){
		if(d) chatTab.find('#chat_active_now').show(); else chatTab.find('#chat_active_now').hide();
		});
			
		}
		
		
function new_chat_window(elem,evt,is_session){
   if(!is_session)  evt.preventDefault();
    if(!is_session){
	
			evt.stopPropagation();
			var el = ga(elem), uch = el.data('uch');
	}else
		    var uch = is_session;
		
	ga('[uid="closePanel"]').trigger('click');
	var user_id = uch.id, user_fullname = uch.fullname, user_photo = uch.photo;
	var chat_id = 'chat_'+user_id;
	var b = ga('body');
	///chat_user_id = user_id;
	
	
	const index = chat_tab_closed.indexOf(chat_id);
    
    if (index !== -1) {
        chat_tab_closed.splice(index, 1);
		chatHeartBeat(user_id);
    }
		
	
	
if (ga("#"+chat_id).length > 0) {
		if (ga("#"+chat_id).hasClass('__none')) {
			
		chat_tabs.push(chat_id);
		createCookie('chat_session', chat_tabs,1);
			removeAllChatFocusClass();
			ga("#"+chat_id).addClass('_focus').removeClass('__none _min');
			
			restructureChatTabs();
		} else if(ga('#'+chat_id).hasClass('_min')){
			 
			toggleChatBoxGrowth(chat_id);
			
		}
		if(!is_session)ga("#"+chat_id+" .emoji-wysiwyg-editor").focus();

		return;
	}
	
	
	if( chat_tabs.indexOf(chat_id) == -1 )
	{
		
		b.append( rp(chat_markup,{"%photo" : user_photo, "%chatid" : chat_id, "%uid" : user_id, "%user_fullname" : user_fullname}) );
		
		checkForOnlineUser( user_id );

		removeAllChatFocusClass();
		ga('#'+chat_id).addClass('_focus').css('bottom', '0px');

		
	var chat_position_calc = getTabPos(chat_id);

		var chatTabslength = 0;

		/*
	for (a in chat_tabs) {
		var _chtabx = chat_tabs.a;
		alert(a);
		if (!ga("#"+_chtabx).hasClass('__none')) {
			chatTabslength++;
		}
	}*/
	$.each(chat_tabs, function(a){
		
		if (!ga("#"+chat_tabs[a]).hasClass('__none')) 
			chatTabslength++;
	});

	if (chatTabslength == 0) {
		ga("#"+chat_id).css('right', chat_position_calc +'px');
	} else {
		var posleft = chat_position_calc + ((chat_tabs.length)*(270+7));
		ga('#'+chat_id).css('right', posleft +'px');
	}
	
	

/*
	if (chat_tabs.length == 0) {
		ga('#'+chat_id).css('left', chat_position_calc +'px');
	} else {
		var width = chat_position_calc - ((chat_tabs.length)*(270+7)); ///(chat_tabs.length)*(270+7)+20;
		ga('#'+chat_id).css('left', width+'px');
	}
	*/
	
	  // create emoji text editor
	           chat_emj = ga('#'+chat_id).find('textarea').emojiarea({
                wysiwyg: true,
                buttonLabel: 'Emojis'+ (new Date()).getTime(),
                buttonPosition: 'after',
                button: '#'+chat_id+' .chat_sm_btn'
            });
			ch_emojiTxtEditor = ga('#'+chat_id).find('.emoji-wysiwyg-editor');
		
	
            // send message by pressing ENTER key
            ch_emojiTxtEditor.off('keyup.tchatsend').on('keyup.tchatsend', function(e) {
				
                if (e.keyCode == 13) return t_send(this,chat_emj, e,chat_id);

            });
			
			
    ch_emojiTxtEditor.addClass('__placeholder_ex').html(plholder);
	ch_emojiTxtEditor.on('focus click', function(e){

			var $this = $(this);
			
				if($this.hasClass('__placeholder_ex')){
				$this.removeClass('__placeholder_ex').empty();}
	
	

	}).on('blur',function(e){ var $this = ga(this); 

				if(!$.trim(chat_emj.val()))
					$this.html(plholder).addClass('__placeholder_ex');

	});
	
	
	
	ch_chatboxFocus[chat_id] = false;

	ga("#"+chat_id).find('[contenteditable="true"]').blur(function(){
		ch_chatboxFocus[chat_id] = false;
		///$("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
	}).focus(function(){
		ch_chatboxFocus[chat_id] = true;
		ch_newMessages[chat_id] = false;
		ga("#"+chat_id).find('.chat_header_uname').removeClass('highlight_chat_v');
		////$("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
	});
	
	
	
	
	
			if(!is_session) ch_emojiTxtEditor.focus();	
		
		
		
		chat_tabs.push(chat_id);
		
		
		createCookie('chat_session', chat_tabs,1);

		
		getChatMessages(user_id);
		
	} else {
		
		ga('#'+chat_id).focus();
		
	}
	
	
	scrollTChat(chat_id);
	ch_typingHead(chat_id);
	setTimeout(function(){chatHeartBeat(user_id);},!TAB_startChatHeartBeat ? 5000 : chatHeartbeatTime);
	     TAB_startChatHeartBeat = true;
}

// generate chat messages
function getChatMessages(user_id){

	var send = jAjax('/chat.php', 'post', {cmd:'getChatMessages', uid:user_id});
	send.done(function(d){
		
		ga('#chat_'+user_id+' .chat_msgs>.chat_ovr').html(d);

		nanoScrollStart();
		setTimeout(function(){scrollTChat('chat_'+user_id);
		startVenoBox();},1000);
		buildMap();
	});
	
	
}
function chatTabSend(el,e,chat_id,str){
	
	return t_send(false, el, e, chat_id, str)
}


// send message
function t_send(t_emoji, el, e, chat_id, str){
	
	e.preventDefault();
	e.stopPropagation();
		
	var msg = str ? str : ga('#'+chat_id).find('textarea').val(),
	rand_msg_id = Math.round(Math.random() * (99999 - 99)) + 99, 
	msg_markup = '<li %m_transparent id="chat_msg_%mid">\
	<div class="cnt_w_chat_m _me _chat_msg_sending">\
	<div rel="tipsy" class="chat_w_msg from-me " title="'+lang.just_now+'">%text</div>\
	</div></li><div class="clear"></div>';
	
	t_emoji = t_emoji ? ga(t_emoji) : '';

	msg = msg.replace(/^\s+|\s+$/g,"");
	
	// check for images
	var images_cage = ga('#'+chat_id).find('.jb_attached_files._tchat');
	
	if(images_cage.children().length){
		
        // contain images 
		var im_cage_count = 0;
        for (var i = 0; i < images_cage.children().length; i++) {
            var bj_ph = images_cage.find('.attach-photo_del:eq(' + i + ')');
            var jb_ph = bj_ph.attr('id').split('_')[1];
            var _attached_m = bj_ph.data('attached') ? 1 : 0;
            var inceput = im_cage_count == 0 ? '[divstart]' : '';
            var sfarsit = im_cage_count + 1 == images_cage.children().length ? '[divend]' : '';
            msg += inceput + '[img]' + escape(jb_ph) + (_attached_m ? '&from=attach&' : '') + '[/img]' + sfarsit;
            im_cage_count++;
        }
		
	}
	
	
	// check for tracks
	var tracks_cage = ga('#'+chat_id).find('.WD_attached_tracks._CHAT>ul');
	
	if(tracks_cage.children().length){
		
        // contain songs
        tracks_cage.children().each(function() {
            var $this = ga(this);
            var track_id = escape($this.attr('id').split('-')[1]);

            msg += '[postSong]' + track_id + '[/postSong]';
       
        });
		
	}
	
	
	if ( t_emoji && ( !$.trim(msg) || msg === lang.pm_emoji_placeholder) ) {
        t_emoji.addClass('_emoji-empty-focus').focus();
        return;
    }
	
	if(t_emoji)
	t_emoji.empty();

	ga('#'+chat_id).find('ul:first').append( rp(msg_markup,{"%m_transparent" : str ? 'class="m_transparent"' : '', "%mid" : rand_msg_id, "%text" : str_smilies(msg)}) );
	ga('#'+chat_id).find('._chempty42').remove();
	
	// remove tracks
	tracks_cage.empty();
	
	//remove images
	images_cage.empty();
	
	// scroll down chat
	scrollTChat(chat_id);
	
	///var send = jAjax('/chat.php', 'post', {cmd:'send', msg:msg, uid:escape(chat_id.replace('chat_','')) });
	
	ga('#'+chat_id).find('._seen_msg').remove();
    var ac = {'action':'sendMessage','to':escape(chat_id.replace('chat_','')),'text':msg, 'bg': str ? 'no' : 'yes', 'view_as':'json'};
	var send = jAjax(pm__action, 'post', ac);
	
	send.done(function(d){
		//return;
		 var res = validateJson(d);
		 
		 
		if (res.response === 'success') {
			
			
			   ga('#chat_msg_'+rand_msg_id).removeAttr('id').attr('id','chat_msg_'+res.msgid);
			   var message = ga('#chat_msg_'+res.msgid);
               message.find('._chat_msg_sending').removeClass('_chat_msg_sending');
			   message.find('[rel="tipsy"]').removeAttr('original-title').attr('title',res.time);//.data('original-title',res.time);
			   message.find('.chat_w_msg').html(res.text.replace(/\\/g, ""));
			  
			   scrollTChat(chat_id);
			   startVenoBox();
            } else if (res.response !== 'success') {
                return displayErr(res.response);
            } else {
                return displayErr(lang.pm_error_deliv);
            }
		 
		
	});
	
	
}

// close chat tab
function closeChatTab(elem,ev,chatid){
	
	const index = chat_tabs.indexOf(chatid);
    
    if (index !== -1) {
        chat_tabs.splice(index, 1);
    }
	
	var c_chatTabs = readCookie('chat_session');
	var new_chat_session = removeValue(c_chatTabs, chatid, ',')
	ga('#'+chatid).addClass('__none');
	restructureChatTabs();
	chat_tab_closed.push(chatid);
	createCookie('chat_session', new_chat_session,1);
}


function chatApMsg(message_txt, sended_at, chat_id, msgid,bg) {

	
	var msg_txt_markup = '<li '+bg+' id="chat_msg_'+msgid+'">\
	<div class="cnt_w_chat_m">\
	<div rel="tipsy" class="chat_w_msg from-they _ml" title="'+sended_at+'">'+message_txt+'</div></div></li><div class="clear"></div>';
   
	ga('#'+chat_id).find('ul:first').append( msg_txt_markup );


    // scroll down to the last message
    scrollTChat(chat_id);
		
}
function chatHeartBeat(chat_user_id) {

	var chatTabId = 'chat_'+chat_user_id;
	var chatWindow = ga('#'+chatTabId).find('.chat_ovr');
	const index = chat_tab_closed.indexOf(chatTabId);
    console.log(chat_tab_closed);
    if (index !== -1) {
		
        return;
    }
	
	var ch_itemsfound = 0;
	
	if (ch_windowFocus == false) {
 
		var ch_blinkNumber = 0;
		var ch_titleChanged = 0;
		for (x in ch_newMessagesWin) {
			if (ch_newMessagesWin[x] == true) {
				++ch_blinkNumber;
				if (ch_blinkNumber >= ch_blinkOrder) {
					document.title = '* * * * * * * * * *';//x+' says...';
					ga('#favicon').attr({'href':ga('#favicon').attr('pm-href')+ '?v'+ Math.random()});
					ch_titleChanged = 1;
					break;	
				}
			}
		}
		
		if (ch_titleChanged == 0) {
			document.title = ch_originalTitle;
			chatWindowTurnOnOriginalFavicon();
	
			ch_blinkOrder = 0;
		} else {
			++ch_blinkOrder;
		}

	} else {
		for (x in ch_newMessagesWin) {
			ch_newMessagesWin[x] = false;
		}
	}

	for (x in ch_newMessages) {
		if (ch_newMessages[x] == true) {
			if (ch_chatboxFocus[x] == false) { 
				//FIXME: add toggle all or none policy, otherwise it looks funny
				//ga('#'+chatTabId).find('.chat_header_uname').toggleClass('highlight_chat_v');
				
			}
		}
	}
	
	// online user
	checkForOnlineUser( chat_user_id );

    // typing
    var sTyping = jAjax(pm__action, 'post', 'action=typing&to=' + escape(chat_user_id) + '&tp=' + escape(ch_typing) + '&view_as=json');
    sTyping.done(function(data) {
      



        var rsp = validateJson(data);


        if (rsp.typing === '1' && chat_user_id === rsp.user) {
            if (chatWindow.find('[data-utyping="true"]').length == 0)
                chatWindow.append('<div class="toCenterTtp" data-utyping="true"><span class="ic12 ico-inline ic12_typing"></span><span class="msg_seen_tx">' + lang.typing + ' ...</span></div>');
				scrollTChat(chatTabId);
        } else if (rsp.typing !== '1') {

            chatWindow.find('[data-utyping="true"]').remove();

        }

    });


    // update messages on active conversation
    var req = jAjax(pm__action, 'post', 'action=chatheartbeat&to=' + escape(chat_user_id) + '&view_as=json');

    req.done(function(data) {


		var i_c = validateJson(data);
		var unread_count = i_c.count_unread;
		
		// Seen 
		if(unread_count <= 0 && !chatWindow.find('._seen_msg').length && chatWindow.find('ul li:last>div:first').hasClass('_me')){
				
										  chatWindow.find('ul').after('<div class="_seen_msg">Seen</div>'); 
			}else if( unread_count > 0 ) { 
								 chatWindow.find('._seen_msg').remove(); 
		
		}
		
		
        for (var items = i_c.d, i = 0; i < items.length; ++i) {

            if (items.length) {
                var c = items[i],
                    message_id = c.id,
                    message_txt = c.msg.replace(/\\/g, ""),
                    from_user = c.from,
                    sended_at = c.time,
                    last_msg_by = c.lastby,
					bg = c.bg == 'no' ? true : false,
                    recipient_online = c.uonline,
                    message_read = c.read;
				
					chatWindow.find('._seen_msg').remove(); 
					chatApMsg(message_txt, sended_at, chatTabId, message_id, bg ? 'class="m_transparent"' : '');
					ch_newMessages[chatTabId] = true;
                    ch_newMessagesWin[chatTabId] = true;
					buildMap();
					
					
					
                ch_itemsfound += 1;
                if (ch_windowFocus == false) turnOnSound();
            }
        }

        chatHeartbeatCount++;

        if (ch_itemsfound > 0) {
            chatHeartbeatTime = minChatHeartbeat;
            chatHeartbeatCount = 1;		
        } else if (chatHeartbeatCount >= 10) {
            chatHeartbeatTime *= 2;
            chatHeartbeatCount = 1;
            if (chatHeartbeatTime > maxChatHeartbeat) {
                chatHeartbeatTime = maxChatHeartbeat;
            }
        }

		
				if( ! ga('#'+chatTabId).hasClass('_focus') && ch_itemsfound > 0){
				ga('#'+chatTabId).find('#chat_tab_unread_count').html('('+ch_itemsfound+')');
				//ga('#'+chatTabId).find('.chat_header_uname').toggleClass('highlight_chat_v');
			}
		
        setTimeout(function(){chatHeartBeat(chat_user_id);}, chatHeartbeatTime);
      //  console.log("Chat Time",chatHeartbeatTime);
	///	console.log(data);
    });


}

// restructure chat tabs
function restructureChatTabs() {
	align = 0;

	///for (var x in chat_tabs) {
		$.each(chat_tabs,function(x){
		var chat_id = chat_tabs[x];
		var chat_position_calc = getTabPos(chat_id);
		
		if (!ga("#"+chat_id).hasClass('__none')) {
			
			if (align == 0) {
				
				ga("#"+chat_id).css('right', chat_position_calc +'px');
			} else {
				var posleft = chat_position_calc + ((align)*(270+7));
				ga("#"+chat_id).css('right', posleft+'px');
				
				
			}
			align++;
		}
	///}
	});
}

function rp(str, map){

  var re = new RegExp(Object.keys(map).join("|"),"gi");
	str = str.replace(re, function(matched){
		return map[matched];
	});
  
   return str;
}

function startChatSession(){
	
	var ss_chat_list = readCookie('chat_session');

	
		if( anonym_content && !guest ) return;
	
	var send = jAjax('/chat.php', 'post', {cmd:'chatSessionGetUserInfo', chat_list:ss_chat_list});
	send.done(function(d){
	var r = validateJson(d);


	//for(var x in r)
		$.each(r,function(x){
				new_chat_window(false,false,r[x]);
		});
	
	});
	
}

function removeAllChatFocusClass(){
	
		ga('.chat_cnt').each(function(){
		ga(this).closest('section').removeClass('_focus');
	});
	
}
function gchatsc(chat_id){
	return  ga('#'+chat_id+' .chat_ovr');

}
// automatically scroll down the scrollbar
function scrollTChat(chat_id) {

  //  mdialog_hide_loader ? $ch_sc.scrollTop($ch_sc[0].scrollHeight) : setTimeout(function(){$ch_sc.scrollTop($ch_sc[0].scrollHeight)}, 800);


		gchatsc(chat_id).on('scroll.ImageLoad',function(e){
			//alert('este');
			var $this = $(this);
			
			$this.find('img:not(.__inited)').each(function(){
				var _$this = $(this);
				if(isElementInViewport(_$this))
				_$this.attr('src',_$this.data('original')).removeAttr('data-original').load(function(){
					
					ga(this).removeAttr('style').addClass('__inited');
					
				});
			});
			
		});
		  gchatsc(chat_id).scrollTop(gchatsc(chat_id)[0].scrollHeight+100);
  
}

// toggle chat box
function toggleChatBoxGrowth(chat_id) {
	if (ga('#'+chat_id).hasClass('_min')) {  
		
		var minimizedChatBoxes = new Array();
		
		if (readCookie('chattab_minimized')) {
			minimizedChatBoxes = readCookie('chattab_minimized').split(/\|/);
		}

		var newCookie = '';

		for (i=0;i<minimizedChatBoxes.length;i++) {
			if (minimizedChatBoxes[i] != chat_id) {
				newCookie += chat_id+'|';
			}
		}

		newCookie = newCookie.slice(0, -1)


		createCookie('chattab_minimized', newCookie, 1);
		ga('#'+chat_id).removeClass('_min');

	} else {
		
		var newCookie = chat_id;

		if (readCookie('chattab_minimized')) {
			newCookie += '|'+readCookie('chattab_minimized');
		}


		createCookie('chattab_minimized',newCookie,1);
		ga('#'+chat_id).addClass('_min');

	}
	
}

function startVenoBox(){
	
	
var chat_venoOptions = {

    bgcolor: '#5dff5e',         // default: '#fff'
    numeratio: true,            // default: false


    // is called when opening is finished
    post_open_callback  : function(content, blocknum, blocktitle){
				ga('body').attr('style','overflow:hidden!important');
	},



    // is called after finished closing. 
    post_close_callback : function(content,blocknum,blocktitle){
        ga('body').removeAttr('style');
    }
}

  ga('.chat_tab .venobox').venobox(chat_venoOptions); 
	
}


ga(document).ready(function(){
	
startChatSession();
	ch_originalTitle = document.title;
	
	ga([window, document]).blur(function(){
		ch_windowFocus = false;
	}).focus(function(){
		ch_windowFocus = true;
		document.title = ch_originalTitle;
	});
});

// focus chat tab
ga(document).off('click.chattab').on('click.chattab', '.chat_cnt', function(e){
	e.stopPropagation();
	removeAllChatFocusClass();
	
	ga(this).closest('section').addClass('_focus');
	ga(this).closest('section').find('#chat_tab_unread_count').html('');
	ga(this).closest('section').find('.chat_header_uname').removeClass('highlight_chat');
	
});

ga(document).off('click.chatTabBlur').on('click.chatTabBlur', 'body,html', function(e){
	ga('.chat_cnt').each(function(){
		ga(this).closest('section').removeClass('_focus');
	});
});


/* Live typing notification
---------------------------- */

function c_doneTyping() {
    ch_typing = 0;
    return ch_typing;
}

function ch_typingHead() {

    var c_typingTimer;
    var c_doneTypingInterval = 500;


    ch_emojiTxtEditor.off('keypress.tchat_write').on('keyup.tchat_write', function(e) {
        ch_typing = 1;

        clearTimeout(c_typingTimer);
        c_typingTimer = setTimeout(c_doneTyping, c_doneTypingInterval);

    });

    ch_emojiTxtEditor.off('keydown.tchat_write').on('keydown.tchat_write', function() {
        clearTimeout(c_typingTimer);
        ch_typing = 0;

    });

}
