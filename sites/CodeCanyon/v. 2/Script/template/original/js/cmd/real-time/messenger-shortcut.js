var messenger_shortcut = new Messenger_shortcut();

function Messenger_shortcut(){
	
 
	var self = this;
	self.text_val;
	self.contenteditable;
	self.room_id;
	self.curr_recipient;
	self.socket;
	self.global_messenger_count = 0;
	self.last_message_object = {msgs_count:0,global:0}; 
	self.randId = Math.floor(Math.random() * 2);
	self.count_minus = false;
	self.minus_count_message=false;
	self.prev_messages_btn = '<div class="messenger_older_msg_div"><a rel="li-gliph-color-border" class="messenger_older_msg_a" href="javascript:void(0);" uid="mdialog_prev_btn_ld" id="id-prev-comm-link-w-msg-chat"><span class="txt-msg-old-load-g" rel="gliph-mess-color">'+lang.pm_load_old+'</span><span class="txt-msg-old-load">'+lang.please_wait+'</span></a></div>';
	self.flying_new_message_markup = '<div m-count="%count" id="flying-notif-new-messages">+%count&nbsp;'+lang.mess_new_flying_messages+'</div>';
	self.chatBoxes = new Array();
	self.chat_tab_closed = new Array();

	this.call = function(el,evt,type,uid){

		if(evt)
		evt.preventDefault();
	
		if(type == 'audio')
			messenger.createCallingPopup('initiate-audio-call',uid,_peer,sio);
		else
			messenger.createCallingPopup('initiate-video-call',uid,_peer,sio);
	
	
	
	
	},

	this.getChatMarkup = function(u_id,u_fullname,u_photo,room_id,focused,blinking){
		var mshortcut = 'mshortcut-'+u_id;
		var settings = '<div class="foh-s mess-shortcut-dropdown-settings"><ul>\
						<li><a href="/user/'+u_id+'" hrefattr="true">'+u_fullname+'</a></li>\
						<li><a href="/messenger" style="display:none;" hrefattr="true">'+lang.Messenger_shortcut_view_in_messenger+'</a></li>\
						<li><a href="javascript:void(0);" onclick="evstop(event,1);mess_shortcut(\''+mshortcut+'\').setNicknames('+u_id+',\''+encodeURIComponent(u_fullname)+'\');">'+lang.messenger_edit_nicknames+'</a></li>\
						<li><a href="javascript:void(0);" onclick="evstop(event,1);mess_shortcut(\''+mshortcut+'\').changeColor('+u_id+');">'+lang.Messenger_Change_color+'</a></li>\
						</ul></div>';
		
		
		
		return 			'<section class="messenger-shortcut-container mmmm_c_m '+(blinking ? 'blinking':'')+' '+(focused ? '_focus':'')+'" id="mshortcut-'+u_id+'">\
						<input type="hidden" id="last-message-datetime" />\
						<input type="hidden" id="chat-curr-color" />\
						<input type="hidden" class="ufullname'+room_id+'" value="'+u_fullname+'"/>\
						<div class="messenger-shortcut" id="room_'+room_id+'">\
						<div class="messenger-shortcut-header" onclick="messenger_shortcut.toggleChatBoxGrowth(\'mshortcut-'+u_id+'\');" rel="li-gliph-color-background" style="background:'+chat_default_color+';">\
							<div class="mshortcut-u-avatar messenger-shortcut-draggable"><img src="/getPhoto?p='+u_photo+'&sz=small" /></div>\
							<div class="mshortcut-u-name ellip"><span class="mshortcut-u-name-str"><A href="/user/'+u_id+'" hrefattr="true">'+u_fullname+'</a></span><span class="mshortcut-u-last-active global_user_online global_user_online_'+u_id+'"></span></div>\
							<div class="mshortcut-top-count"></div>\
							<div class="mshortcut-header-ul" id="messenger_aria_options_chat">\
								<ul class="_32ca">\
								<li class="_3a61 _461b"><div><a id="start-audio-chat" title="'+lang.Messenger_call_audio+'" rel="tipsy" onclick="messenger_shortcut.call(this,event,\'audio\',\''+u_id+'\');" class="_3olv _2fpc enabled" href="javascript:void(0);"></a></div></li>\
								<li class="_3a61 _461a"><div><a id="start-video-chat" title="'+lang.Messenger_call_video+'" rel="tipsy" onclick="messenger_shortcut.call(this,event,\'video\',\''+u_id+'\');" class="_3olv _2fpd enabled" href="javascript:void(0);"></a></div></li>\
								<li class="_3a61 _461_"><div><span title="'+lang.Settings+'" class="_3olv _1ll- soh-s" href="javascript:void(0);">'+settings+'</span></div></li>\
								</ul>\
							</div>\
							<div class="mshortcut-close"><a title="'+lang.Close+'" rel="tipsy" onclick="messenger_shortcut.close(this,event,\''+u_id+'\');" href="javascript:void(0)" class=""><span class="glyphicon glyphicon-remove chattab"></span></a></div>\
						</div>\
						<div class="chat_cnt"><div class="messenger-shortcut-cnt"><div class="messenger-shortcut-messages" id="messenger-shortcut-messages-tr"><div class="div-loader _msescenter"></div></div></div>\
						<div class="messenger-shortcut-footer">\
						<div class="messenger-shortcut-footer-mediafiles">\
						<div id="tchat_'+u_id+'" class="jb_attached_files _tchat"></div>\
						<div id="WD_tracks_tchat_'+u_id+'" class="WD_attached_tracks _CHAT"><ul></ul></div>\
						</div>\
						<div class="flex-shortcut-bottom-emojis"><textarea id="messenger-shortcut-send-contenteditable"></textarea>\
						<div class="pmess-shortcut-smilies-btn chat_bottom_ics" data-chat-id="tchat_'+u_id+'"><a href="javascript:void(0);" id="mess_chat_button_smilies" class="em_disc_toolbar_i_ic__sm smiles_w"></a></div>\
						</div><div class="mess-shortcut-bottom-media-btns"><div class="mess-nopointer"></div>'+messenger.get_bottom_mess_buttons(16,u_id)+'</div>\
						</div>\
						</div></div>\
						</section>';
		
	},
	this.open = function(el,evt,is_session,blink){

		
		if(!is_session){
	
			evt.preventDefault();
			el = ga(el);
			var uch = el.data('uch');
			
		} else
		    var uch = is_session;
		
		
		var u_data = uch;
		var u_id = u_data.id;
		var u_fullname = u_data.fullname;
		var u_photo = u_data.photo;
		var markup_focused = is_session ? false : true;
		var chat_id = 'mshortcut-'+u_id;
		// get new room id
		self.room_id = parseInt(u_id)+parseInt(_U.i);
		self.curr_recipient = u_id;
		self.socket = sio;
		
		updateSessionContacts(u_id);
	

		const index = self.chat_tab_closed.indexOf(chat_id);
		
		if (index !== -1) {
			self.chat_tab_closed.splice(index, 1);
		}
		

	if (ga("#"+chat_id).length > 0) {
			if (ga("#"+chat_id).hasClass('__none')) {

			self.chatBoxes.push(chat_id);
			createCookie('chat_session', self.chatBoxes,1);

			//self.focusChatTab(chat_id);
			setTimeout(function(){self.restructureChatTabs();},100);
				
			} else if(ga('#'+chat_id).hasClass('_min')){
				 
			self.toggleChatBoxGrowth(chat_id);
				
			}  
			if(!is_session) {
				
			self.focusChatTab(chat_id);
				
			}

			return;
		}
	
	
	
	
	if( self.chatBoxes.indexOf(chat_id) == -1 )
	{  

		var chatTabslength = 0;
		var chat_position_calc = self.getTabPos(chat_id);
		var $markup = self.getChatMarkup(u_id,u_fullname,u_photo,self.room_id,markup_focused,blink);

		ga('body').prepend($markup);

		$.each(self.chatBoxes, function(a){
			
			if (!ga("#"+self.chatBoxes[a]).hasClass('__none')) 
				chatTabslength++;
		});
		
		if (chatTabslength == 0) {
			ga("#"+chat_id).css('right', chat_position_calc +'px');
		} else {
			var posleft = chat_position_calc + ((self.chatBoxes.length)*(270+7));
			ga('#'+chat_id).css('right', posleft +'px');
		}
		

		
		self.text_val = ga('#messenger-shortcut-send-contenteditable').emojiarea(
																	{	stickers:true,
																		wysiwyg: true,
																		buttonLabel: 'Emojis',
																		buttonPosition: 'after',
																		button:ga('#'+chat_id).find('#mess_chat_button_smilies')
																	});
		self.contenteditable = ga('#'+chat_id).find('[contenteditable]');
		self.contenteditable.attr('placeholder',lang.pm_emoji_placeholder+'...');
		
		ga('#'+chat_id).find('.ms_items_more_wrap').addClass('__none');
		ga('#'+chat_id).find('.comments_attach_trigger_ic').click();
		

		_act_emoji = 'messages';
		self.timeout_typing;
		self.timeoutFunction = function() {
				 
			self.socket.emit("typing", 'no', self.room_id, self.curr_recipient);
		}
		
		// send message by pressing ENTER key
		self.contenteditable.off('keydown.tchatsend').on('keydown.tchatsend', function(e) { 
			evstop(e);
			if (e.keyCode == 13) return mess_shortcut(chat_id).send(false, e);
		
			self.socket.emit('typing', 'yes', self.room_id, self.curr_recipient);
			clearTimeout(self.timeout_typing);
			self.timeout_typing = setTimeout(self.timeoutFunction, 1500);
		}).on('paste', function(ev){
				mess_shortcut(chat_id).pasteMessages(this,ev);
		});
		


		// draggable chat window
		//ga('.messenger-shortcut-container').sortable({handle :ga('#'+chat_id).find('.messenger-shortcut-draggable')});//draggable({handle :ga('#'+chat_id).find('.messenger-shortcut-draggable')});
 
		//ga('.messenger-shortcut-container').disableSelection();
		
		self.chatBoxes.push(chat_id);
		createCookie('chat_session', self.chatBoxes,1);
		
		// get messages
		self.getMessages(chat_id,u_id,is_session);
 
		
		// add class focus 
		if(!is_session) 
			self.focusChatTab(chat_id);
		else
			self.bindGlobalEvents();
		

		
		} else {
		
		ga('#'+chat_id).focus();
		
		}
		


		
	},
	this.bindGlobalEvents = function(){
		
		self.unFocusTabs();
		 setTimeout(function(){
			self.focusTabs();
		},1000); 
 
	},
	this.unFocusTabs = function(){
		ga(document).off('click.chattab click.chatTabBlur');
	},
	this.focusTabs = function(){
		
		
		// focus chat tab
		ga(document).off('click.chattab').on('click.chattab', '.chat_cnt', function(e){
			e.stopImmediatePropagation();
			self.focusChatTab(ga(this).closest('section').attr('id'),1);

		});

		ga(document).off('click.chatTabBlur').on('click.chatTabBlur', 'body,html', function(e){
			e.stopImmediatePropagation();
			ga('.chat_cnt').each(function(){
				ga(this).closest('section').removeClass('_focus');
			});
		});
		
		
		
	},
	this.getMessages = function(chat_id,uid,is_session){
		var nickname;
		var no_update = is_session ? 'yes' : 'no';
		var send = jAjax('/messenger.php', 'post', {'cmd':'getConversation','no_update':no_update, 'userid' : escape(uid)});
		
		send.done(function(data){  
 
			var last_message_id;
			
	 
			var messenger_msg_list = ga('#'+chat_id+' #messenger-shortcut-messages-tr');
			
			var d = validateJson(data);
			var text = '';
			
			
			if($.trim(d.nickname)){
				 
				//self.recipient_nickname = d.nickname;
				nickname = d.nickname;
			}
			
			
			
			if(d.count  <= 0){
				
				messenger_msg_list.html('<div class="messenger-no-messages"><div class="messenger-exp">'+d.exp+'</div><div class="messenger-sub">'+d.sub+'</div></div>');
				
			} else if(d.count > 0){
				
				
				var author_last_msg;
				var avatar = true;
				var last_date;
				
				var have_unread_messages;
				for(var i = 0; i < d.messages.length;i++){
					
					var msg = d.messages[i];
					
					if(author_last_msg != msg.fromUser)
						avatar = true;
					else
						avatar = false;
					
					
					var l_dat = ga('#'+chat_id+' .messenger_date_delim:first').text();
					var hj = l_dat == msg.dateMonth ? true : false;
 
					
					var $show_date = author_last_msg === msg.lastby && msg.date == last_date ? false : true;
					$show_date = msg.date !== last_date && !hj && $show_date ? true : false;
					 
					text += messenger.getMessagesMarkup(msg,(msg.fromUser == _U.i ? 'me' : ''),avatar,$show_date);
					
					author_last_msg = msg.lastby;
					last_date = msg.date;
					have_unread_messages = msg.read == 'yes' ? false : true;
				} 
				
				if(have_unread_messages)
					messenger_msg_list.closest('section').addClass('_h_unread');
				
				messenger_msg_list.closest('section').find('#last-message-datetime').val(last_date);
 
				var show_load_prev_btn = d.count_messages >= messenger_limit ? self.prev_messages_btn : '';
				messenger_msg_list.html('<div class="nano"><div class="nano-content"><div id="messenger-nano-content-fullheight">'+show_load_prev_btn+text+'</div></div></div>');
				
				messenger_msg_list.find('#id-prev-comm-link-w-msg-chat').on('click',function(e){
					 
					mess_shortcut(chat_id).mdialog_load_prev_messages(e,this);
					
				});
				

				
				messenger.startvenobox();


				
				var check_for_last_msg = messenger_msg_list.find('.pmessenger-message-txt:not(._me):last');
				last_message_id = check_for_last_msg.length ? check_for_last_msg.attr('id').match(/\d/g).join('') : 0;
				setTimeout(function(){ self.scrollChat(chat_id,'init'); },1000);
 
				messenger_msg_list.closest('section').find('#last-message-datetime').val(last_date);
				
				
				
				
			}	
	 
			// set nickaname 
			if(nickname) ga('#'+chat_id).find('.mshortcut-u-name-str>a').text(nickname);
	 
			// get color 
			self.getChatColors(uid,chat_id);
			
			
			
			
            if (d.blacklist === 1) {
 
				mess_shortcut(chat_id).isInBlackList();

            }
			
			
		
		});
		
		
	},
	this.notificationNewMessage = function(c,chat_id,msg_id,trigger){

		if(!c) return;
		var nano = ga('#'+chat_id).find(".nano");
		var nano_msg_cnt = nano.find('.nano-content');
	 
	
		if(!nano_msg_cnt.find('#flying-notif-new-messages').length){
			
			nano_msg_cnt.append(self.flying_new_message_markup.replace(/%count/g,c));
			
			
		} else {
			nano_msg_cnt.find('#flying-notif-new-messages').replaceWith(self.flying_new_message_markup.replace(/%count/g,c));
			
		}
 
		ga('#'+chat_id).find('.mshortcut-top-count').text('('+c+')');
		ga('#'+chat_id).addClass('blinking').find('#flying-notif-new-messages').off('click.new_msg_flying_chat').on('click.new_msg_flying_chat', function(e){
		
			e.preventDefault(); 
			e.stopImmediatePropagation();
			nanoScrollStart();
			if(!ga(this).hasClass('no-nano-scroll'))
				nano.nanoScroller({ scroll: 'bottom' });
			
			
			ga(this).fadeOut(function(){ga(this).remove();});
			ga('#'+chat_id).find('.mshortcut-top-count').empty();
			
			mess_shortcut(chat_id).updateMessagesAsRead(tonum(chat_id),msg_id);
			self.focusChatTab(chat_id);
						
			if(self.minus_count_message) global_messenger_count -= 1;
				gwtlog.updateCountMessages(global_messenger_count);
		 
				self.minus_count_message=false;
				
				
			ga(window).off('focus.messenger');	
		});
		
		
		//var nano = ga("#messages-tick .nano");
		var nano_pane = nano_msg_cnt;
		var nano_scrolltop = nano_pane.scrollTop();
		
		if(nano_scrolltop <= 0 && !self.isMin(chat_id)) ga('#'+chat_id).find('#flying-notif-new-messages').addClass('no-nano-scroll').trigger('click.new_msg_flying_chat');
	//	if(c <= 2 && c > 0 && !trigger && !self.isMin(chat_id) && self.isfocus(chat_id)) setTimeout(function(){ga('#'+chat_id).find('#flying-notif-new-messages').trigger('click.new_msg_flying_chat');},300);
		
		nano.off('scrollend.notifNewMessageBottom_CHAT').on('scrollend.notifNewMessageBottom_CHAT', function() {
		
 
			ga('#'+chat_id).find('#flying-notif-new-messages').addClass('no-nano-scroll').trigger('click.new_msg_flying_chat');
			nano.off('scrollend.notifNewMessageBottom_CHAT');
			 
			
		});
		
	},
	this.isfocus = function(chatid){
		
		return ga('#'+chatid).hasClass('_focus');
		
	},
	this.isMin = function(chatid){
		return ga('#'+chatid).hasClass('_min');
	},
	this.pm_sound_enable = function() {
    return 1;//readCookie('dk_pm_sound') === 'on' || !readCookie('dk_pm_sound') ? 1 : 0;
	},
	// sound
	this.turnOnSound = function() {

 
    if (self.pm_sound_enable() && !ga('.pmessenger').length) {  

	// play sound
	soundManager.play('new-message');
    }

	},
	this.scrollChat = function(chat_id,read_messages,msgs_count,msg_id){
 
		if(ga('.pmessenger').length && ga('#messenger_with_user').val() == tonum(chat_id)) return;
		
 

		var nano = ga('#'+chat_id).find(".nano");
		var nano_pane = nano.find('.nano-content');
		 var last_msg = ga('#'+chat_id).find('.pmessenger-message-txt:last');
		var nano_fullheight = ga('#'+chat_id).find('#messenger-nano-content-fullheight');

		
		nanoScrollStart();
		
		if(read_messages == 'init') nano.nanoScroller({ scroll: 'bottom' });
		
		var chat_notif = function(obj,sound,x){
				
				
						if(Object.keys(obj).length){
							
									self.notificationNewMessage(
									
									obj.msgs_count,
									'mshortcut-'+tonum(obj.userid),
									obj.msg_id,
									x
									
									);
									
							if(sound) self.turnOnSound();
						}
				
				
				
		}
		var shortcutMarkAsUnread = function(c){
			
			ga('#'+c).addClass('_h_unread');
			
		}
		
		if(!window_tab_active || ( !self.isfocus(chat_id) && read_messages != 'init') || self.isMin(chat_id)) { 
			
 
			if(!msgs_count) return;
			self.minus_count_message=true;
			self.last_message_object = {'msg_id':msg_id,'msgs_count':msgs_count,'userid':tonum(chat_id),'global':1}; 
			
		

		
		    if(!window_tab_active && !self.isMin(chat_id)){
				 
				shortcutMarkAsUnread(chat_id);
				mess_shortcut(chat_id).messengerFocusWindow(self.last_message_object);
				
			} 
			
			else 
				// if chat is open, but is not focused, show notifications
				if(!self.isfocus(chat_id) && !self.isMin(chat_id)) {
					shortcutMarkAsUnread(chat_id);
					chat_notif(self.last_message_object,1,1);

			}
			
			else
				// if chat is minimized, show notifications
				if(self.isMin(chat_id)){
					shortcutMarkAsUnread(chat_id);
					chat_notif(self.last_message_object,1,1);
						
						
			}
			
			return;
			} else {
			 
			ga(window).off("focus.messenger");
			
			}
	 
		
		
		
		
		

		
 
	if((nano_fullheight.height() - nano_pane.scrollTop() - nano.height() >= 50) && (read_messages && read_messages != 'init') ){
		
			if(msg_id) nano_fullheight.find('#msg_'+msg_id).find('.messenger_text_col').addClass('is_new');
			if(msg_id) self.notificationNewMessage(msgs_count,chat_id,msg_id);
			
	} else {
 
		if(msg_id) mess_shortcut(chat_id).updateMessagesAsRead(tonum(chat_id),msg_id);
		 
		setTimeout(function(){
	
		nanoScrollStart();
		
		var scroll_evt = 'scrollend.s'+self.randId;
		nano.nanoScroller({ scroll: 'bottom' }).on(scroll_evt, function() {
 
		mess_shortcut(chat_id).removeNewBubble();
		gl_scrollChatDelay = false;
		});
		nano.trigger(scroll_evt);

		},gl_scrollChatDelay ? gl_scrollChatDelay : 1);
		

		
	}
	},
	this.getChatColors = function(uid,chat_id){
		
		
		
		
				// get color
				var send = jAjax('/messenger.php','post',{'cmd':'getChatCurColor','userid':escape(uid)});
				
				send.done(function(color){  
					messenger.colorateStrokes(color,chat_id);
					
					ga('#'+chat_id).find('#chat-curr-color').val(color);
				});
		
		
		
		
		
	},
	// restructure chat tabs
	this.restructureChatTabs = function () {  
	var align = 0;


		$.each(self.chatBoxes,function(x){
		var chat_id = self.chatBoxes[x];
		var chat_position_calc = self.getTabPos(chat_id);
		
		if (!ga("#"+chat_id).hasClass('__none')) {
			
			if (align == 0) {
				
				ga("#"+chat_id).css('right', chat_position_calc +'px');
			} else {
				var posleft = chat_position_calc + ((align)*(270+7));
				ga("#"+chat_id).css('right', posleft+'px');
				
				
			}
			align++;
		}
	});
	},
	this.close = function(el,evt,id){
 
	var chatid = 'mshortcut-'+id;
	const index = self.chatBoxes.indexOf(chatid);
    
    if (index !== -1) {
        self.chatBoxes.splice(index, 1);
    }
	
	var c_chatTabs = readCookie('chat_session');
	var new_chat_session = removeValue(c_chatTabs, chatid, ',');
	ga('#'+chatid).addClass('__none');
	self.restructureChatTabs();
	self.chat_tab_closed.push(chatid);
	createCookie('chat_session', new_chat_session,1);
 

	},
	this.getTabPos = function(chat_id){

	return ga('.nav_tool_friends_online').width();
	}
	,
	this.removeAllChatFocusClass = function(){
	
	ga('.messenger-shortcut-container').each(function(){
		ga(this).removeClass('_focus');
		ga(this).find('[contenteditable]').blur();
	});
	
	//ga('body').focus();
 
	},
	this.just_show = function(chat_id){
		ga("#"+chat_id).removeClass('__none _min');
		self.restructureChatTabs();
	},
	this.focusChatTab = function(chat_id,without_bind){  
		if(!without_bind) self.bindGlobalEvents();
		
		if(!window_tab_active || self.isfocus(chat_id)) return;
		
		self.removeAllChatFocusClass();

		ga("#"+chat_id).addClass('_focus').removeClass('__none _min blinking');
		ga("#"+chat_id+" .emoji-wysiwyg-editor").focus();	
		
		var have_unread_message_btn = ga("#"+chat_id).find('#flying-notif-new-messages');
		var have_unread_msgs_count = have_unread_message_btn.attr('m-count');
		nanoScrollStart();
		if(unread_messages_by_user && unread_messages_by_user.hasOwnProperty(tonum(chat_id)) && !have_unread_message_btn.length){
			
			if(unread_messages_by_user[tonum(chat_id)] > 0)	{
				
				global_messenger_count -=1;
				gwtlog.updateCountMessages(global_messenger_count);
				mess_shortcut(chat_id).updateMessagesAsRead(tonum(chat_id));
				mess_shortcut(chat_id).removeNewBubble(false,false,1);
			}
			
		}
		
	 
		
		//if(parseInt(have_unread_msgs_count) > 0 && parseInt(have_unread_msgs_count) <= 2)
		//	have_unread_message_btn.trigger('click.new_msg_flying_chat');
			
		//mess_shortcut(chat_id).updateMessagesAsRead(tonum(chat_id));
		//mess_shortcut(chat_id).removeNewBubble(false,false,1);
		
	},
	
	// toggle chat box
	this.toggleChatBoxGrowth = function(chat_id) {
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
		//ga('#'+chat_id).removeClass('_min');
		self.focusChatTab(chat_id);

	} else {
		
		var newCookie = chat_id;

		if (readCookie('chattab_minimized')) {
			newCookie += '|'+readCookie('chattab_minimized');
		}


		createCookie('chattab_minimized',newCookie,1);
		ga('#'+chat_id).addClass('_min');

	}
	
},

this.startShortcutsSession = function(){
	
	var ss_chat_list = readCookie('chat_session');

	
	if( anonym_content && !guest ) return;
	
	var send = jAjax('/messenger.php', 'post', {cmd:'getShortcutsSessionUserInfo', chat_list:ss_chat_list});
	send.done(function(d){  
	var r = validateJson(d);

		$.each(r,function(x){
				self.open(false,false,r[x]);
		});
	
	});
	
}


}


ga(document).ready(function(){
	
	messenger_shortcut.startShortcutsSession();
	
});

function chatTabSend(el,e,chat_id,str){
	 
	chat_id = 'mshortcut-'+tonum(chat_id);
 
	return mess_shortcut(chat_id).send(false,e,str,tonum(chat_id));
 
}


