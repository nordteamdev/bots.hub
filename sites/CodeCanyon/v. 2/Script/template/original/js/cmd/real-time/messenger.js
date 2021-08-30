var messenger = new Messenger();
var mess_shortcut = function(arg,b){
	
	return new Messenger(arg,b);
}

function Messenger(chat_id,b) {
	var self = this;
 

	self.socket = sio;
	self.socket_messages = 'null';
	self.room_id;
	self.socket_rooms = [];
	self.recipient_picture;
	self.recipient_fullname;
	self.emojiarea_created=false;
	self.sending_Message = false;
	self.show_sent_status = b ? b : false;
	self.window_curr_title = __SITENAME;
	self.recipient_last_message_timestamp;
	self.isOldTitle = true;
	self.count_minus = false;
	self.minus_count_message=false;
	self.blinkTitleInterval;
	self.scrollNow = false;
	self.last_msg_date = false;
	self.mdialog_hide_loader = false;
	self.uploadingScreen=false;
	self.conversation_in_viewport = true;
	//self.global_messenger_count = 0;
	self.scrollChatDelayTime = 1000;
	self.last_message_object = {msgs_count:0,global:0}; 
	self.recipient_nickname = '';
	self.mess_opened_contacts = [];
	self.mess_opened_contacts__shortcut = [];
	self._search_conv_messages = [];
	self.search_in_conv_curr_id = 0;
	self.text_val = self.text_val || '';
	self.msg_page = 1;
	self.randId = Math.floor(Math.random() * 2);
	self.default_color = chat_default_color;
	self.curr_color = chat_default_color;
	self.contenteditable;
	self.curr_recipient;
	self.voice_clip_chunks;
	self.voice_clip_media_recorder;
	self.recording_timeout;
	self.mediatp;
	self.shortcut = chat_id ? ga('#'+chat_id) : false;
	self.shortcut_id_num;
	self.shortcut_id;
	self.voice_clip_extension = 'ogg';
	self.event;
	self.more_contacts_page = 0;
	self.loaded_all_contacts=false;
	self.mediaRecorderConstructed = false;
	self.messenger_local_stream=false;
	self.existingCall;
//	self.newCallWindow = {};

	
	self.flying_new_message_markup = '<div id="flying-notif-new-messages">+%count&nbsp;'+lang.mess_new_flying_messages+'</div>';
	self.notif__markup = '<div id="msg_00" class="pmessenger-message-txt messenger_notif_nickname"><div class="mess_notif_nick_text">%text</div></div>';
	self.prev_messages_btn = '<div class="messenger_older_msg_div"><a rel="li-gliph-color-border" class="messenger_older_msg_a" href="javascript:void(0);" onclick="messenger.mdialog_load_prev_messages(event,this);" uid="mdialog_prev_btn_ld" id="id-prev-comm-link-w-msg"><span class="txt-msg-old-load-g" rel="gliph-mess-color">'+lang.pm_load_old+'</span><span class="txt-msg-old-load">'+lang.please_wait+'</span></a></div>';
	self.mess_colors = ["#2196F3","#44bec7","#ffc300","#fa3c4c","#d696bb","#6699cc","#13cf13","#ff7e29","#e68585","#7646ff","#20cef5","#67b868","#d4a88c","#ff5ca1","#a695c7"];

	
	
	
	// make compatible to shortcuts
	if(chat_id) {
		recipientId = tonum(chat_id);
		self.curr_recipient = recipientId;
		//self.curr_color = self.shortcut.find('#chat-curr-color').val();
		self.shortcut_id = chat_id;
		self.shortcut_id_num = recipientId;
 
		
	}
		
 
	this.open = function(evt,el){
		evt.preventDefault();
		self.emojiarea_created=false;
		el = ga(el);
		
 
		addTopGlobalHelper();

		var send = jAjax('/messenger.php', 'post', {'cmd':'open'});
		
		send.done(function(data){ 
			
			if(!ga('#messenger_window_body').length){
				ga('#messenger-box-app').html(data);
				ga('.messenger-shortcut-container').addClass('zindex1');
				el.parent().addClass('__active');
				el.parent().addClass('__on');
			}
			
			
			ga(document).off('click.closeMessBox').on('click.closeMessBox', 'body', function(e){
				
				self.closeBox();
			});
			ga(document).off('keyup.closeMessBox').on('keyup.closeMessBox', 'body', function(e){
				if(e.keyCode == 27)
				self.closeBox();
			});
			// close messenger box
			ga('#close-messenger-box').on('click',function(e){
				
				self.closeBox();
				
			});
			
		});
		
	}
	,
	this.closeBox = function(){
		
		ga('#messenger-box-app').empty();
		ga(document).off('click.closeMessBox keyup.closeMessBox');
		ga('.messenger-shortcut-container').removeClass('zindex1');
		ga('.bas_ntf_top.msgs').removeClass('__active __on');
		removeTopGlobalHelper();
	}
	,
	this.separateMediaFromText = function(msg){
		
	
	// separate media from text
 
	/* search for images */
	var message_text = '', message_html = '';
	var body_msg = ga('#messenger_message_cookie');
	body_msg.html(msg);
 
	// images
	if(body_msg.find('.mdialog_atch_items_container').length){
		
		var get_html_from_msg = body_msg.find('.mdialog_atch_items_container');
		
		message_html = get_html_from_msg.html();
		get_html_from_msg.remove();
		
		
		message_text = typeof body_msg.text() != 'undefined' ? $.trim(body_msg.text()) : '';
		
	 
		gl_scrollChatDelay = self.scrollChatDelayTime;
		

	} else
		//voice clips
		if(body_msg.find('.sp-voice-clip-comment').length){
		
		var get_html_from_msg = body_msg.find('.sp-voice-clip-comment');
		
		message_html = get_html_from_msg.html();
		get_html_from_msg.remove();
		
		
		message_text = '';
		
		gl_scrollChatDelay = 10;
		
	} else
		
	
	
	
		//tracks
		if(body_msg.find('.commentsWidgetTracks').length){
		
		var get_html_from_msg = body_msg.find('.commentsWidgetTracks');
		
		message_html = '<div class="messenger_msgs_tracks">'+get_html_from_msg.html()+'</div>';
		get_html_from_msg.remove();
		
		
		message_text = typeof body_msg.text() != 'undefined' ? $.trim(body_msg.text()) : '';
		
	 gl_scrollChatDelay = self.scrollChatDelayTime;
 	} else
		// gifs
		if(body_msg.find('.msg_gif').length){
		
		var get_html_from_msg = body_msg.find('.msg_gif');
		
		message_html = get_html_from_msg.parent().html();
		get_html_from_msg.remove();
		
		
		message_text = '';
		
	    gl_scrollChatDelay = 1000;
	} else
		// shared content
		if(body_msg.find('.msg_shared_cnt').length){
		
		var get_html_from_msg = body_msg.find('.msg_shared_cnt');
		
		message_html = get_html_from_msg.parent().html();
		get_html_from_msg.remove();
		
		
		message_text = '';
		
	    gl_scrollChatDelay = 1000;
	} else
		// calls
		if(body_msg.find('.messenger_call_msg').length){
		
		var get_html_from_msg = body_msg.find('.messenger_call_msg');
		
		message_html = get_html_from_msg.parent().html();
		get_html_from_msg.remove();
		
		
		message_text = '';
		 
		
		gl_scrollChatDelay = self.scrollChatDelayTime;
		
		
	} else 
		// embera
	
		if(body_msg.find('.embera_embd').length){
		
		var get_html_from_msg = body_msg.find('.embera_embd');
		
		message_html = '<div class="mess-embera">'+get_html_from_msg.html()+'</div>';
		get_html_from_msg.remove();
		
		
		message_text = typeof body_msg.text() != 'undefined' ? $.trim(body_msg.text()) : '';
		
	 
		gl_scrollChatDelay= self.scrollChatDelayTime;
		

		
		
	} else 

		// emojis
		if(body_msg.find('.emotics').length){
			
			
		message_text = $.trim(body_msg.text());
		
		if( !message_text){
				message_text = message_text;
				message_html = body_msg.html();
		}else 
				message_text = $.trim(body_msg.html());
		
	} else 
		// img
		if(body_msg.find('img').length){
			
			gl_scrollChatDelay = self.scrollChatDelayTime;
		message_text = $.trim(body_msg.text());
		
		if( !message_text){
				message_text = message_text;
				message_html = body_msg.html();
		}else 
				message_text = $.trim(body_msg.html());
			
	} else 
		
		// stickers
		if(body_msg.find('.sticker').length){
			
			message_text = '';
			message_html = body_msg.html();
 
 
	
	} else {
		
		message_text = body_msg.html();
		//message_html = body_msg.html();
	}
	
	
	body_msg.empty();
	
	
	return [message_text,message_html];
		
	},
	this.getMessagesMarkup = function(arr,from,avatar,show_conv_date){
	var is_avatar = avatar ? true : false;
	/*
	
	var l_dat = ga('.messenger_date_delim:first').text();
	var hj = l_dat == arr.dateMonth ? true : false;
	

	console.log(self.last_msg_date+' !== '+arr.dateMonth);
	
	*/
	//if(l_dat == arr.dateMonth) ga('#messenger_date_delim_'+ arr.dateMonth).remove();
	
	
	

	var get_message_text_media = self.separateMediaFromText(arr.msg);
	var message_text = get_message_text_media[0];
	var message_html = get_message_text_media[1];
	
	show_conv_date = show_conv_date ? '<div id="messenger_date_delim_'+ arr.dateMonth+'" class="messenger_date_delim">'+ arr.dateMonth+'</div>' : '';
	//self.last_msg_date = arr.dateMonth;//arr.date;
 
	if(	from == 'me'){
		
		avatar = avatar  || show_conv_date ? '<img src="/getPhoto?p='+_U.p+'&sz=small" />' : '<img src="'+_BLANK+'" />';
		return show_conv_date+'<div id="msg_'+arr.id+'" class="pmessenger-message-txt _me soh-s '+ (!is_avatar ? 'messenger-message-margin-m' : '') +' '+ (arr.bg == 'no' ? '_nobg' : '')+'">\
				<div class="txt_pmessenger-user-avatar">'+avatar+'</div>\
				<div class="messenger_text_col">'+($.trim(message_text) ? '<div rel="li-gliph-color-background" class="txt_pmessenger-text mess-msgs-cnt-rows">'+ message_text +'</div>' : '')+( $.trim(message_html) ? '<div class="mess-msgs-cnt-rows messenger_media_in_msg">'+message_html+'</div>' : '' )+'</div>'+self.message_actions(arr.id,arr.time)+'\
				</div>';
		
		
	}else {
		avatar = avatar || show_conv_date ? '<img src="/getPhoto?p='+self.recipient_picture+'&sz=small" />' : '<img src="'+_BLANK+'" />';
		return show_conv_date+'<div id="msg_'+arr.id+'" class="pmessenger-message-txt soh-s '+ (!is_avatar ? 'messenger-message-margin-m' : '') +' '+ (arr.bg == 'no' ? '_nobg' : '')+'">\
				<div class="txt_pmessenger-user-avatar">'+avatar+'</div>\
				<div class="messenger_text_col '+ (arr.read=='no' ? 'is_new' : '') +'">'+($.trim(message_text) ? '<div class="txt_pmessenger-text mess-msgs-cnt-rows">'+ message_text +'</div>' : '')+( $.trim(message_html) ? '<div class="mess-msgs-cnt-rows messenger_media_in_msg">'+message_html+'</div>' : '' )+'</div>'+self.message_actions(arr.id,arr.time)+'\
				</div>';
				 
	}
	
	
	},
	
	this.switchToNextConv = function() {

    var cur_u = ga('.pmessenger-contact-a.active');
    cur_u.slideUp(400, function() {
        cur_u.remove();
        setTimeout(function() {
           self.firstConvClick();
        }, 100);
    });

},
this.firstConvClick = function(){
	
	ga('.pmessenger-contact-a:first').trigger('click');
},
	this.contactToBlacklist = function(evt,el){
		
                confirm_act(jprintf(lang.pm_to_blacklist, self.recipient_fullname),
                    function(event) {

                        var send = jAjax('/messenger.php', 'post', 'cmd=uToBlackList&userid=' + escape(self.curr_recipient));
                        send.done(function(res) {

                            if (res === '1') {

                                self.switchToNextConv();
                            } else if (res === '0') {
                                displayErr(lang.pm_err_us_to_blacklist);
                            } else if (res !== '1' && res !== '0') displayErr(lang.somethingWrong);

                        }); // ajax

                    }); // confirmation
		
	},
	this.hideConversation = function(e,el){
                e.preventDefault();
                e.stopImmediatePropagation();
		 
                var send = jAjax('/messenger.php', 'post', 'cmd=hideConversation&userid=' + escape(self.curr_recipient));
                send.done(function(res) {

                    if (res == '1') {

                        self.switchToNextConv();
                    } else {
                        displayErr(lang.somethingWrong);
                    }


                });
	},
	this.deleteConversation = function(e,el){
		
                e.preventDefault();
                e.stopImmediatePropagation();

                confirm_act(jprintf(lang.pm_confirm_delete_conversation, self.recipient_fullname),
                    function(event) {

                        var send = jAjax('/messenger.php', 'post', 'cmd=delConversation&userid=' + escape(self.curr_recipient));
                        send.done(function(res) {  

                            if (res == '1') {

                               self.switchToNextConv();
                            } else {
                                displayErr(lang.somethingWrong);
                            }
                        }); //ajax


                    }); //confirm
		
	},
	this.toggleConvDetails = function(el,evt){
		
		evt.preventDefault();
		el = ga(el);
		
		
		
		if(!el.hasClass('aria-hidden')){
			el.addClass('aria-hidden');
			ga('#mess-user-details').hide();
			
		} else {
			el.removeClass('aria-hidden');
			ga('#mess-user-details').show();
			
		}
		
	},
 
	this.openContact = function(el,evt,user_id,user_avatar,user_name,user_active){ 
		self.msg_page = 1;
		self.event = evt;
		// generate room id
		self.last_msg_date = false;
		self.recipient_picture = user_avatar;
		self.recipient_fullname = user_name;
		self.recipient_nickname = '';
		
		
		// get new room id
		self.room_id = parseInt(user_id)+parseInt(_U.i);
		
		var messenger_msg_list = ga('#pmessenger-messages-cnt > #messages-tick');
		
		var c_header = ga('#pmessenger-contact-header');
		var user_details_col = ga('#mess-user-details');
		var mess_right_col_udetails = ga('#mess-right-col-userdetails');
		var mess_aria_options = ga('#messenger_aria_options');
		mess_right_col_udetails.empty();
		recipientId = user_id;
		var $contact_id = ga('#contact-'+user_id);
		
 

		self.socket = sio;
 
		 
		self.setUpVoiceVideoCallButtons();
 
		


		updateSessionContacts(user_id);
		
		// close search
		messenger.close_search();
 
		
		
		if(!self.mdialog_hide_loader)
			messenger_msg_list.html('<div class="pmessenger-loading-conv"></div>');
		self.mdialog_hide_loader = false;
		
		ga('.pmessenger').attr('id','messenger_'+user_id);
		
		ga('.pmessenger-messages-list').removeClass('empty');
		
		ga('.pmessenger-no-contacts').remove();
		
		ga('.xweeWrt').text(user_name);
		
		ga('.pmessenger-messages-list').attr({'rel':'contactid-'+user_id,'id':'room_'+self.room_id});
		
		ga('#messenger_with_user').val(user_id);
		
		ga('#WD_tracks_PM>ul').empty();
		ga('#WD_attach_files_PM').empty();
		
		mess_right_col_udetails.html('<div class="xgrWfs">\
				<input type="hidden" class="ufullname'+self.room_id+'" value="'+user_name+'"/>\
				<div class="xgr54a"><a href="/user/'+user_id+'" hrefattr="true"><img src="/getPhoto?p='+user_avatar+'&sz=small" /></a></div>\
			<div class="gsgXAfwe2"><a href="/user/'+user_id+'" hrefattr="true"><div class="xvgg2a">'+user_name+'</div>\
			<div class="xvgg3a global_user_online global_user_online_'+user_id+'">'+user_active+'</div></a>\
			</div><div class="_3-ne"><div class="_3d85"><div class="_5blh _4-0h soh-s" role="button" tabindex="0">\
			<ul class="user_more_act foh-s">\
			<li><A href="javascript:void(0);" onclick="messenger.contactToBlacklist(event,this);">'+lang.Block_the_user+'</a></li>\
			<li><A href="javascript:void(0);" onclick="messenger.hideConversation(event,this);">'+lang.pm_hide_convers+'</a></li>\
			<li><A href="javascript:void(0);" onclick="messenger.deleteConversation(event,this);">'+lang.pm_delete_convers+'</a></li>\
			</ul>\
			</div></div></div>\
			\
			\
		</div>');
		
		
		
		mess_aria_options.html('<div class="_3szo" onclick="return messenger.search('+user_id+');" tabindex="0"><div class="_3szp"><div class="_6b45">\
<svg viewBox="8 8 48 48"><title>search conversation</title>\
<circle cx="28" cy="28" fill="none" r="14" stroke="#666" rel="mess-colorate-this-stroke" stroke-miterlimit="10" stroke-width="2"></circle>\
<path clip-rule="evenodd" d="M50,50L37.9,37.9" fill="none" fill-rule="evenodd" stroke="#666" rel="mess-colorate-this-stroke" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>\
</div></div>\
<div class="_3szq">'+lang.Messenger_Search_in_conversation+'</div></div>\
\
\
<div onclick="messenger.changeColor('+user_id+');" class="_3szo" tabindex="0"><div class="_3szp"><div class="_17vc">\
<svg class="colors" viewBox="-1 -1 47 47"><title>colors@2x</title>\
<path d="M912,1569a3,3,0,1,1-3,3A3,3,0,0,1,912,1569Z" fill="#666" rel="mess-colorate-this-fill" transform="translate(-895.5 -1561.5)"></path>\
<path d="M924,1569a3,3,0,1,1-3,3A3,3,0,0,1,924,1569Z" fill="#666" rel="mess-colorate-this-fill" transform="translate(-895.5 -1561.5)"></path>\
<path d="M931,1579a3,3,0,1,1-3,3A3,3,0,0,1,931,1579Z" fill="#666" rel="mess-colorate-this-fill" transform="translate(-895.5 -1561.5)"></path>\
<path d="M905,1579a3,3,0,1,1-3,3A3,3,0,0,1,905,1579Z" fill="#666" rel="mess-colorate-this-fill" transform="translate(-895.5 -1561.5)"></path>\
<path d="M918,1562a22,22,0,0,0,0,44,3.67,3.67,0,0,0,2.71-6.14,3.65,3.65,0,0,1,2.74-6.09h4.33A12.23,12.23,0,0,0,940,1581.56C940,1570.75,930.15,1562,918,1562Z" rel="mess-colorate-this-stroke" fill="transparent" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="4%" transform="translate(-895.5 -1561.5)"></path></svg>\
</div></div>\
<div class="_3szq">'+lang.Messenger_Change_color+'</div></div>\
\
\
	<div onclick="messenger.setNicknames('+user_id+',\''+encodeURIComponent(user_name)+'\');" class="_3szo"><div class="_3szp"><div class="_5odt"><svg viewBox="0 0 38 37.01"><title>nicknames</title>\
	<path d="M899,1204h38v2H899v-2Z" fill="#666" rel="mess-colorate-this-fill" fill-rule="evenodd" transform="translate(-898.99 -1168.99)"></path>\
	<path d="M927.57,1172.17l-22.32,22.36-0.72,5,5-.72,22.32-22.36ZM908.8,1196.6l-1.41-1.41L929,1173.61l1.41,1.41Z" rel="mess-colorate-this-fill" fill="#666" fill-rule="evenodd" transform="translate(-898.99 -1168.99)"></path>\
	<path d="M932.93,1175.36l2.07-2.13a6,6,0,0,0-1.33-3,5.72,5.72,0,0,0-2.91-1.28l-2.07,2.13Z" rel="mess-colorate-this-fill" fill="#666" fill-rule="evenodd" transform="translate(-898.99 -1168.99)"></path></svg>\
	</div></div>\
	<div class="_3szq">'+lang.Messenger_Edit_nickname+'</div></div>');
		

var messenger_toggle_right_info = '<ul class="_fl2">\
<li><a id="start-audio-chat" onclick="javascript:void(0);" class="_30yy" role="button" aria-expanded="true" data-testid="info_panel_button" href="javascript:void(0);">\
<div aria-label="Start a voice call" title="'+lang.messenger_start_voice_call+'" data-testid="startVoiceCall" style="height: 32px; width: 32px;">\
<svg viewBox="0 0 64 64" rel="mess-colorate-this-stroke" style="clip-rule: evenodd; fill: none; fill-rule: evenodd; stroke-miterlimit: 10; stroke-width: 2;"><title>Start a voice call</title>\
<path  d="M48.3,50.5c-7.7,6.5-24.2-10-24.5-10.3C23.5,39.9,7,23.4,13.5,15.7c4.8-5.7,6.3-3.4,7-2.7\
c0.6,0.5,5.7,7.8,6,9.2c0.3,1.4-2.4,4.6-2.2,5.9c0.2,1.2,3.6,5,5.1,6.5c1.5,1.5,5.3,4.9,6.5,5.1c1.2,0.2,4.4-2.5,5.9-2.2\
c1.4,0.3,8.7,5.4,9.2,6C51.6,44.2,54,45.7,48.3,50.5z"></path></svg></div></a></li>\
<li><a id="start-video-chat" class="_30yy" role="button" aria-expanded="true" data-testid="info_panel_button" href="javascript:void(0);">\
<div aria-label="'+lang.messenger_start_video_call+'" title="Start a video chat" data-testid="startVideoCall" style="height: 32px; width: 32px;">\
<svg viewBox="0 0 64 64" rel="mess-colorate-this-stroke" style="clip-rule: evenodd; fill: none; fill-rule: evenodd; stroke-miterlimit: 10; stroke-width: 2;"><title>Start a video chat</title><g><g>\
<path d="M47,27.8v7.5l9,4.5V23.2L47,27.8z M37.2,17H13.8C10.6,17,8,19.6,8,22.8v17.4c0,3.2,2.6,5.8,5.8,5.8h23.3\
c3.2,0,5.8-2.6,5.8-5.8V22.8C43,19.6,40.4,17,37.2,17z"></path></g></g></svg></div></a><div class=""></div></li>\
													<li><a onclick="messenger.toggleConvDetails(this,event);" class="_30yy" role="button" aria-expanded="true" data-testid="info_panel_button" href="javascript:void(0);">\
													  <div style="height: 32px; width: 32px;"><svg viewBox="0 0 64 64" style=""><g><g>\
														<path rel="mess-colorate-this-fill" d="M32,10c-12.2,0-22,9.8-22,22s9.8,22,22,22s22-9.8,22-22S44.2,10,32,10z M32,19c1.6,0,3,1.4,3,3s-1.4,3-3,3 c-1.6,0-3-1.4-3-3S30.4,19,32,19z M36,45h-2h-4h-2v-1h2V29h-2v-1h2h4v1v15h2V45z" fill="#aaa"></path></g></g></svg></div></a>\
														  <div aria-owns="js_8"></div></li>\
										  </ul>';
		
		
 
		
		
		
		
		var send = jAjax('/messenger.php', 'post', {'cmd':'getConversation', 'userid' : user_id});
		
		ga('.pmessenger-contact-a').removeClass('active');
		ga(el).addClass('active');
		
		self.curr_recipient = user_id;
		send.done(function(data){   
			
			var last_message_id;
			
	 
			
			var d = validateJson(data);
			var text = '';
			
			
			if($.trim(d.nickname)){
				 
				self.recipient_nickname = d.nickname;
			}

			
			
			if(d.count  <= 0){
				
				messenger_msg_list.html('<div class="messenger-no-messages"><div class="messenger-exp">'+d.exp+'</div><div class="messenger-sub">'+d.sub+'</div></div>');
				
			} else if(d.count > 0){
				
				
				var author_last_msg;
				var avatar = true;
				var last_date;
				for(var i = 0; i < d.messages.length;i++){
					
					var msg = d.messages[i];
					
					if(author_last_msg != msg.fromUser)
						avatar = true;
					else
						avatar = false;
					
					
					var l_dat = ga('.messenger_date_delim:first').text();
					var hj = l_dat == msg.dateMonth ? true : false;
					
					var $show_date = author_last_msg === msg.lastby && msg.date == last_date ? false : true;
					$show_date = msg.date !== last_date && !hj && $show_date ? true : false;
					 
					text += self.getMessagesMarkup(msg,(msg.fromUser == _U.i ? 'me' : ''),avatar,$show_date);
					
					author_last_msg = msg.lastby;
					last_date = msg.date;
				}
				 
				ga('.pmessenger #last-message-datetime').val(last_date);
 
				var show_load_prev_btn = d.count_messages >= messenger_limit ? self.prev_messages_btn : '';
				messenger_msg_list.html('<div class="nano"><div class="nano-content"><div id="messenger-nano-content-fullheight">'+show_load_prev_btn+text+'</div></div></div>');
				self.startvenobox();

				
				var check_for_last_msg = ga('.pmessenger').find('.pmessenger-message-txt:not(._me):last');
				last_message_id = check_for_last_msg.length ? check_for_last_msg.attr('id').match(/\d/g).join('') : 0;
				setTimeout(function(){self.scrollChat();},1000);
 
				
				
				
				
				
			}	
	 
				ga('.pmessenger-msg-list-contenteditable').html('		\
				<div class="pmess-smilies-btn"><a href="javascript:void(0);" id="mess_button_smilies" class="em_disc_toolbar_i_ic__sm smiles_w"></a></div>\
				<textarea id="messenger-send-contenteditable"></textarea>\
				');
				c_header.html('<div class="fj4232xY">\
								<a href="/user/'+user_id+'" hrefattr="true"><div class="xveRafa"><img src="/getPhoto?p='+user_avatar+'&sz=small" /></div>\
								<div class="tr4565Saew">\
								<div class="xweeWrt">'+ (self.recipient_nickname ? self.recipient_nickname : user_name) +'</div>\
								<div class="gre45af global_user_online global_user_online_'+user_id+'">'+user_active+'</div>\
								</a></div>'+messenger_toggle_right_info+'</div>');
				 
				  
				self.text_val = ga('#messenger-send-contenteditable').emojiarea(
																	{	stickers:true,
																		wysiwyg: true,
																		buttonLabel: 'Emojis',
																		buttonPosition: 'before',
																		button:ga('#mess_button_smilies')
																	});
						

						var bottom_message_write = ga('.pmessenger-msg-list-contenteditable');
						self.contenteditable = bottom_message_write.find('[contenteditable]');
						
		
			self.timeout_typing;
			self.timeoutFunction = function() {
				 
			self.socket.emit("typing", 'no', self.room_id, self.curr_recipient);
			}

			
			
            _act_emoji = 'messages';
            // send message by pressing ENTER key
            self.contenteditable.on('keydown keypress keyup', function(e) {
				
				evstop(e);
                // $(this).removeClass('emoji-empty-focus');
			
			    if (e.keyCode == 13) {messenger.send(this, e);}
                // edit the last message by up arrow key
               // if (e.keyCode == 38 && !$.trim(self.contenteditable.val())) getChatCont().find('[uid="editMsg"]:last').trigger('click');
                // if pressing esc, cancel editing
                //if (e.keyCode == 27) ga('[uid="uidCancelEdit"]').trigger('click');
				
				self.socket.emit("typing", 'yes', self.room_id, self.curr_recipient);
 
				clearTimeout(self.timeout_typing);
				self.timeout_typing = setTimeout(self.timeoutFunction, 1500);
            }).on('paste', function(ev){
				self.pasteMessages(this,ev);
			});
						
					self.contenteditable.attr('placeholder',lang.pm_emoji_placeholder+'...');
					ga('.ms_items_more_wrap').addClass('__none');
					ga('.comments_attach_trigger_ic').click();

					bottom_message_write.append(self.get_bottom_mess_buttons());		
 
			
			 
			if(!self.emojiarea_created)  
				self.emojiarea_created=true;	

				
				setTimeout(function(){
				self.getAttachments(user_id);
				},1000);
				
				// get color
				var send = jAjax('/messenger.php','post',{'cmd':'getChatCurColor','userid':escape(user_id)});
				
				send.done(function(color){
				//	self.curr_color = color;
					ga('#mess-curr-color').val(color);
					self.colorateStrokes(color);
				});
				nanoScrollStart();
				
				// auto load old messages on scrolling up
				var nano = ga("#messages-tick .nano");
				nano.off('scrolltop.a'+self.randId).on('scrolltop.a'+self.randId, function() {
					
					ga('.pmessenger [uid="mdialog_prev_btn_ld"]').trigger('click');
					
				});
		

				// remove meesage count from left side for respective contact
				$contact_id.removeClass('_newmessages').find('.convo__unread.in_messenger').remove();
				
 
				
				self.join_rooms();
		 
		 

				self.socket.emit("seen", last_message_id, user_id);
		 
		 

				
            if (d.blacklist === 1) {

				self.isInBlackList();

            }
				
		});
		

		
	},
	this.mdialog_load_prev_messages = function (ev, ob) {
    ev.preventDefault();
    self.shortcut ? mess_shortcut(self.shortcut_id).mdialog_load_older_msgs() : self.mdialog_load_older_msgs();
}
,
this.mdialog_load_older_msgs = function(shortcut_id) { 
    var mdil_loader = self.shortcut_id ? self.shortcut.find('#id-prev-comm-link-w-msg-chat') : ga('#id-prev-comm-link-w-msg'),
        last_msg_id_vport = self.shortcut_id ? self.shortcut.find('.pmessenger-message-txt:first').attr('id') : ga('.pmessenger').find('.pmessenger-message-txt:first').attr('id');
		var j_last_msg = self.shortcut_id ? self.shortcut.find('#'+last_msg_id_vport) : ga('.pmessenger').find('#'+last_msg_id_vport);
		
		if(mdil_loader.hasClass('in-progress') || !mdil_loader.length) return;
		
    mdil_loader.addClass('in-progress');

	++self.msg_page;
 
    var send = jAjax('/messenger.php', 'post', 'cmd=previous-messages&userid=' + escape(recipientId) + '&page=' + escape(self.msg_page) + '&view_as=json');
    send.done(function(res) { 
        var data = validateJson(res);
        mdil_loader.removeClass('in-progress');
        if (data.exp == '1') {
            mdil_loader.parent().remove();
        } else {
			var message_markup = '';
			 var author_last_msg;
			var avatar = true;
			var last_date;
			for (var i = 0; i < data.length; i++) {
				
				if(author_last_msg != data[i].fromUser)
						avatar = true;
					else
						avatar = false;
					
					
					
					var l_dat = self.shortcut_id ? self.shortcut.find('.messenger_date_delim:first').text() : ga('.pmessenger .messenger_date_delim:first').text();
					var hj = l_dat == data[i].dateMonth ? true : false;
					
					var $show_date = author_last_msg === data[i].lastby && data[i].date == last_date ? false : true;
					$show_date = data[i].date !== last_date && !hj && $show_date ? true : false;
					
					
				message_markup += self.getMessagesMarkup(data[i],(data[i].fromUser == _U.i ? 'me' : ''),avatar,$show_date);//data[i].fromUser == _U.i ? self.getMessagesMarkup(data[i],'me',avatar) : self.getMessagesMarkup(data[i],'',avatar);  
				//j_last_msg

				author_last_msg = data[i].lastby;
				last_date = data[i].date;
				
			}
			self.shortcut_id ? self.shortcut.find('.messenger_older_msg_div').after(message_markup) : ga('.pmessenger .messenger_older_msg_div').after(message_markup);
			self.colorateStrokes(self.curr_color,self.shortcut_id);
			nanoScrollStart();
 
			self.shortcut_id ? self.shortcut.find(".messenger-shortcut-messages .nano").nanoScroller({ scrollTop: j_last_msg.position().top - 50}) : ga("#pmessenger-messages-cnt .nano").nanoScroller({ scrollTop: j_last_msg.position().top - 50});
        }

    });
	

	
},
	this.send = function(el, ev, stk, toId){
		
		ev = ev || $.Event();

		ev.preventDefault();
		ev.stopImmediatePropagation();
		
		if(self.sending_Message || self.uploadingScreen) return;
		
		
 
    var count = 0;
    var atch_files = self.shortcut ? self.shortcut.find('.jb_attached_files._tchat#tchat_'+self.shortcut_id_num).children() : ga('.jb_attached_files.__messages').children();
	var atch_tracks = self.shortcut ? self.shortcut.find('#WD_tracks_tchat_'+self.shortcut_id_num+' > ul') : ga('#WD_tracks_PM>ul');
    var $el = ga(el),
        text = stk ? stk : (self.shortcut ? self.shortcut.find('#messenger-shortcut-send-contenteditable').val() : self.text_val.val());
 
		
	recipientId = toId ? toId : recipientId;	
	
	if(!stk)
	self.shortcut ? self.shortcut.find('[contenteditable]').empty().focus() : self.contenteditable.empty().focus();
			
			
			
 		 
	// photos	
    if (atch_files.length > 0 && !stk) {
        for (var i = 0; i < atch_files.length; i++) {
            var bj_ph = ga('.attach-photo_del:eq(' + i + ')');
            var jb_ph = bj_ph.attr('id').split('_')[1];
            var _attached_m = bj_ph.data('attached') ? 1 : 0;
            var inceput = count == 0 ? '[divstart]' : '';
            var sfarsit = count + 1 == atch_files.length ? '[divend]' : '';
            text += inceput + '[img]' + escape(jb_ph) + (_attached_m ? '&from=attach&' : '') + '[/img]' + sfarsit;
            count++;
        }

    }
	
	// with tracks
    if (atch_tracks.children().length) {
        var songs_arr = [];
        // post contain songs
        atch_tracks.children().each(function() {
            var $this = ga(this);
            var postSongId = escape($this.attr('id').split('-')[1]);

            text += '[postSong]' + postSongId + '[/postSong]';

            songs_arr.push(postSongId);
       
        });

    }
 
    if (!$.trim(text)) {   
        self.shortcut ? self.shortcut.find('[contenteditable]').focus() : self.contenteditable.addClass('_emoji-empty-focus').focus();
        return;
    } else
    if (!recipientId) {
        setTimeout(function() {
			displayErr(lang.somethingWrong);
            window.location.reload(1)
        }, 3000);
        return displayErr(lang.pm_no_recipient);

    } else { 
		self.sending_Message = true;
        var act = 'sendMessage'; //message_editable ? 'editMessage&i=' + message_editable : 'sendMessage';
        var ac = 'cmd=' + act + '&userid=' + escape(self.curr_recipient) + '&bg='+ (stk ? 'no' : 'yes') +'&text=' + encodeURIComponent(text) + '&view_as=json';
        var send = jAjax('/messenger.php', 'post', ac);
        var new_m = $('.mdialog_newdialogmsg');
        var l_status_message = ga('.mdialog_send_message_loader');
        l_status_message.addClass('__visible');
        send.done(function(data) {
			self.sending_Message = false;
            var res = validateJson(data);
            // message delivered, hide loader ic
            l_status_message.removeClass('__visible');
            if (res.response === 'blacklist') {

				self.isInBlackList();

            } else if (res.response === 'success') {
				var j_last_msg = self.shortcut ? self.shortcut.find('.pmessenger-message-txt:last') : ga('.pmessenger-message-txt:last');
                var text = res.text.replace(/\\/g, ""),
                    time = res.time,
					min_text = res.min_text.replace(/\\/g, ""),
                    mid = res.msgid,
                    read = res.rd,
					m_bg = res.bg,
					timestamp = res.timestamp,
                    recid = res.recipient;

				if(self.shortcut)
					self.shortcut.find('.jb_attached_files._tchat#tchat_'+self.shortcut_id_num).empty();
				else
					ga('.jb_attached_files.__messages').empty();
				
 
				
				atch_tracks.empty();
				
				if (self.mess_opened_contacts.indexOf(recipientId) == -1 && !self.shortcut) {
                    self.mdialog_hide_loader = true;
                   
                       
					self.appendNewDateTime(res.curr_date);
						

                    self.mess_opened_contacts.push(recipientId);

                } else if (self.mess_opened_contacts__shortcut.indexOf(recipientId) == -1 && self.shortcut){
					
                    self.mdialog_hide_loader = true;
                   
                       
					self.shortcut__appendNewDateTime(res.curr_date);
						
              
                    self.mess_opened_contacts__shortcut.push(recipientId);
					
					
				}
 
 

 
					self.scrollNow = true;
					if(j_last_msg.hasClass('_me'))
						this.avatar = false;
					else
						this.avatar = true;
 


             
				self.show_sent_status=true;
				gl_scrollChatDelay = stk ? 200 : false;
			
				
				if(self.shortcut || ga('#mshortcut-'+self.curr_recipient).length){
					var uid = !self.shortcut_id ? 'mshortcut-'+self.curr_recipient : self.shortcut_id;
					 
					 
					mess_shortcut(uid,1).apMessage(mid, '_me', _U.i, _U.p, time, text, 1, m_bg, this.avatar);
					mess_shortcut(uid,1).colorateStrokes(self.curr_color,uid);
				}
				
				if(ga('#messenger_'+self.curr_recipient).length){	
				 
					self.appendMessageInContacts(min_text,recid,timestamp,time,'me');
					messenger.apMessage(mid, '_me', _U.i, _U.p, time, text, 1, m_bg, this.avatar);
					self.colorateStrokes(self.curr_color);
				} 


                if (new_m.length != 0) new_m.remove();
            } else if (res.response !== 'success') {
                return displayErr(res.response);
            } else {
                return displayErr(lang.pm_error_deliv);
            }

        });

    }

		
		
		
		
		
	},
	this.appendNewDateTime = function(_date){
		
		var j_last_msg = ga('.pmessenger .pmessenger-message-txt:last');
		var curr_datetime = ga('.pmessenger #last-message-datetime');
		var datetime_l_val = curr_datetime.val();
		
		 
		if(_date !== datetime_l_val && curr_datetime.length){
			
			j_last_msg.after('<div id="messenger_date_delim_'+ lang.today +'" class="messenger_date_delim">'+ lang.today +'</div>');
			curr_datetime.remove();
		}
		
		
	},
	this.shortcut__appendNewDateTime = function(_date){
		
		var j_last_msg = self.shortcut.find('.pmessenger-message-txt:last');
		var curr_datetime = self.shortcut.find('#last-message-datetime');
		var datetime_l_val = curr_datetime.val();
 

		if(_date !== datetime_l_val && curr_datetime.length){
			
			j_last_msg.after('<div id="messenger_date_delim_'+ lang.today +'" class="messenger_date_delim">'+ lang.today +'</div>');
			curr_datetime.remove();
		}
		
		
	},
	
	this.appendMessageInContacts = function(msg,contact_id,timestamp,msg_time,from,stop_sort,show_count){
 

				msg = msg.replace(/&amp;/g,'&');
				show_count = show_count ? '<div class="convo__unread oval in_messenger">+'+show_count+'</div>' : '';
				from = from == 'me' ? '<span class="convo__msgAuthor">'+lang.You+':</span>&nbsp;' : '';
				var find_contact = ga('#contact-'+contact_id);

				
				
				if(show_count){
				find_contact.addClass('_newmessages');

					self.turnOnSound();
				}
				
				// make contact at last messaged
				find_contact.removeData('last-message-timestamp').removeAttr('last-message-timestamp');
				find_contact.attr('data-last-message-timestamp',timestamp);
				
				// append message to the left side bar in contacts
				find_contact.find('.pmessenger-contact-last-msg')
				.html('<div class="pmessenger-contact-last-msg ellip">'+from+msg+'</div>'+show_count);
				find_contact.find('.pmessenger-contact-last-msg-time').text(msg_time);
				
				
						if(!stop_sort){
						// sort contacts live
						tinysort(ga('#messenger-contacts-last').find('.nano-content').children(), {
							data: 'last-message-timestamp',
							order: 'desc',
							ignoreDashes: true
						});		
						}
						
					if(!window_tab_active && !find_contact.hasClass('active')) self.messengerFocusWindow();
	},
	// report message
	this.message_report = function(e, o) {

    e.preventDefault();
    var $o = ga(o),
        m_e = $o.attr('id').split('-'),
        m_id = m_e[m_e.length - 1],
        msg = $o.closest('#msg_'+m_id).find('.mdialog_atch_items_container').length != 0 ? '' : $o.closest('#msg_'+m_id).find('.txt_pmessenger-text').html();

    confirm_act(lang.pm_report_confirm + '<br/><div class="c_mdialog_sm_mg ellip">' + msg + '</div>',
        function(event) {

            var s_d = jAjax('/messenger.php', 'post', 'cmd=spam&id=' + escape(m_id) + '&view_as=json');
            s_d.done(function(r) {

                if (r === '1') {
                    $o.closest('#msg_'+m_id).find('.txt_pmessenger-text').html('<i>' + lang.pm_reported_msg + '</i>');
                    $o.closest('#msg_'+m_id).addClass('deleted_pm');
                } else
                    return displayErr(r);

            });

        });

},
// delete message
this.delete_message = function(o, e) {
    e.preventDefault();
    var $o = ga(o),
        m_e = $o.attr('id').split('-'),
        m_id = m_e[m_e.length - 1],
        msg = $o.closest('#msg_'+m_id).find('.mdialog_atch_items_container').length != 0 ? '' : $o.closest('#msg_'+m_id).find('.txt_pmessenger-text').html();

    confirm_act(lang.pm_delete_confirm + '<br/><div class="c_mdialog_sm_mg ellip">' + msg + '</div>',
        function(event) {

            var s_d = jAjax('/messenger.php', 'post', 'cmd=delete&id=' + escape(m_id) + '&view_as=json');
            s_d.done(function(r) {

                if (r === '1') {
                     
					$o.closest('#msg_'+m_id).find('.messenger_text_col').replaceWith('<div class="txt_pmessenger-text deleted"><i>' + lang.pm_deleted_succ + '</i></div>');
                     $o.closest('#msg_'+m_id).addClass('deleted_pm');
                } else
                    return displayErr(r);

            });

        });

}
	this.message_actions = function(id,time){
		
	return '<div class="d_comment_r foh-s">\
								<div class="d_comment_act_w">\
								  <a title="'+lang.del_pm+'" onclick="messenger.delete_message(this,event)" id="m-id-msg-'+id+'" class="d_comment_act d_comment_act_del d_comment_act_spam ic10 ic10_close-g " uid="delMsg"></a>\
									<span title="'+lang.report+'" onclick="messenger.message_report(event,this)" id="m-id-msg-'+id+'" class="d_comment_act d_comment_act_spam ic10 ic10_warn-g" uid="reportSpam"></span>\
								</div>\
								<div class="d_comment_time">'+time+'</div>\
							</div>';
		
	},
	this.redialUser = function(el,evt,type){
		evt.preventDefault();
		
		el = ga(el);
		if(type == 'audio')
			el.closest('.mmmm_c_m').find('#start-audio-chat').trigger('click');
		else
			el.closest('.mmmm_c_m').find('#start-video-chat').trigger('click');
	},
	this.apMessage = function(mid, whois, userId, userPhoto, mtime, mtext, online, m_bg, avatar, check_for_read_messaging, msgs_count, timestamp, php_curr_date) {
 

	var get_message_text_media = self.separateMediaFromText(mtext);
	var message_text = get_message_text_media[0];
	var message_html = get_message_text_media[1];
	
	var is_new = self.shortcut ? (!self.shortcut.hasClass('_focus') || !window_tab_active) && !whois : !window_tab_active; 
	
	
	var append_container = self.shortcut ? self.shortcut : ga('#messages-tick');
 
 
 
	if(php_curr_date){
	var d = new Date(php_curr_date*1000);
	var last_msg_date = d.getDate();

		 
 
	if(userId != _U.i && self.shortcut && php_curr_date){
		
		self.shortcut__appendNewDateTime(php_curr_date);
		
	} else if(userId != _U.i && !self.shortcut && php_curr_date){
		
		self.appendNewDateTime(php_curr_date);
	}
	
	
	}
	
		 
 
	check_for_read_messaging = check_for_read_messaging || false;
	avatar = avatar ? '<img src="/getPhoto?p='+userPhoto+'&sz=small">' : '<img src="'+_BLANK+'">';
	var sent_status = '<div id="mess_sent_status" class="messenger_sent_Status" rel="tipsy" title="'+lang.mess_sent_status+'"><i rel="gliph-mess-color" class="glyphicon glyphicon-send messenger-sent-ic"></i></div>';

    var msg_markup = '<div id="msg_'+mid+'" class="pmessenger-message-txt soh-s '+ (m_bg == 'no' ? '_nobg' : '') +' '+whois+'"><div class="txt_pmessenger-user-avatar">'+avatar+'</div>'+
 
	'<div class="messenger_text_col '+ (is_new ? 'is_new' : '') +'">'+($.trim(message_text) ? '<div '+ (userId == _U.i ? 'rel="li-gliph-color-background"' : '')+' class="txt_pmessenger-text mess-msgs-cnt-rows">'+ message_text +'</div>' : '')+( $.trim(message_html) ? '<div class="mess-msgs-cnt-rows messenger_media_in_msg">'+message_html+'</div>' : '' )+'</div>'+self.message_actions(mid,mtime)+''+ (self.show_sent_status ? sent_status : '') +'</div>';
	
	
	append_container.find('#mess_sent_status').remove();

	
	if(append_container.find('.messenger-no-messages').length && !self.shortcut)
		append_container.replaceWith('<div id="messages-tick"><div class="nano"><div class="nano-content"><div id="messenger-nano-content-fullheight">'+msg_markup+'</div></div></div></div>');
	else if(append_container.find('.messenger-no-messages').length && self.shortcut)
		append_container.find('.messenger-no-messages').replaceWith('<div id="messenger-nano-content-fullheight">'+msg_markup+'</div>');
	else
		append_container.find('#messenger-nano-content-fullheight').append(msg_markup);
	 
	if(self.shortcut && !(ga('.pmessenger').length && ga('#messenger_with_user').val() == tonum(chat_id)) ){		

		messenger_shortcut.scrollChat(self.shortcut_id,check_for_read_messaging,msgs_count,mid);
		self.show_sent_status=false;
	}
 

	//ga('#messages-tick .nano-content')
 
    // scroll down to the last message
	if(ga('.pmessenger').length && !self.shortcut){
	if(self.scrollNow)
		self.scrollChat(check_for_read_messaging,msgs_count,mid,userId);
	else
    setTimeout(function(){self.scrollChat(check_for_read_messaging,msgs_count);},100);

	self.scrollNow=false;
	self.show_sent_status=false;
	}
	
	

	self.startvenobox();
	
	
	},
	this.startvenobox = function(){
	// attachments viewer
	venobox(ga('[data-vbgall]'));
		
	},
	 
	this.prependContact = function(el,evt,avatar,name,id,last_seen,last_msg,new_msg,click,is_return){
		
		el = ga(el);
		
		if(evt) evt.preventDefault();
		var old_contacts = ga('#messenger-contacts-last').find('.nano-content');
		var html = '<a href="javascript:void(0);" id="contact-'+id+'" class="pmessenger-contact-a '+(new_msg ? '_newmessages' : '')+' '+ (!click ? 'active' : '') +'" onclick="messenger.openContact(this,event,\''+id+'\',\''+avatar+'\',\''+name+'\',\''+last_seen+'\');">\
						<div class="pmessenger-mleft12">\
							<div class="pmessenger-contact-avatar"><img src="/getPhoto?p='+avatar+'&sz=small"><div class="only_ic global_user_online global_user_online_%id"></div></div>\
							<div class="pmessenger-contact-info">\
								<div class="pmessenger-contact-name ellip">'+name+'</div>\
								<div class="pmessenger-contact-last-msg ellip">'+ (last_msg ? last_msg : '') +'\
								'+ (new_msg ? '<div class="convo__unread oval in_messenger">+'+new_msg+'</div>' : '')+'\
									\
								</div>\
								<div class="pmessenger-contact-last-msg-time"></div>\
							</div>\
						</div>\
					</a>';
		
		if(is_return){
			return html;
			
		} else {

		if(ga('#contact-'+id).length){

			ga('#contact-'+id).click();
			setTimeout(function(){	old_contacts.nanoScroller({ scrollTo: ga('#contact-'+id) }); },1500);
		} else {
		
		old_contacts.prepend(html);
		if(!click)
		messenger.openContact(ga('#contact-'+id),evt,id,avatar,name,last_seen);
		}
		self.closeSearch(ga('.messenger-cancel-search'),evt);
		}
	},
	this.closeSearch = function(el,evt){
		
		evt.preventDefault();
		var contact_res = ga('#messenger-contacts-search-res').find('.nano-content');
		var last_contacts = ga('#messenger-contacts-last');
		el = ga(el);
		
		ga('#input-search-messenger').val('');
		el.addClass('hidden_elem');
		contact_res.empty();
		contact_res.parent().addClass('__none');
		last_contacts.show();
	},
	this.searchMessenger = function(){
		
		var contact_res = ga('#messenger-contacts-search-res').find('.nano-content');
		var last_contacts = ga('#messenger-contacts-last');
		var ms_srch_time;
		var  u_markup = '<div onclick="messenger.prependContact(this,event,\'%avatar\',\'%name\',\'%id\',\'\');" id="%id" class="mess-search-contact-res">\
			<div class="mess-search-res_contact_avatar"><img src="/getPhoto?p=%avatar&sz=small" /></div>\
			<div class="mess-search-res_contact_details">\
			<div class="mess-search-res_contact_name">%name&nbsp;<div id="f_onl_gtm" class="only_ic global_user_online global_user_online_%id">%online</div></div>\
			</div>\
			</div>';
		
		
            // search friends
            var ms_s_inp = ga('#input-search-messenger');
            ms_s_inp.on('keydown keypress', function() {
                clearTimeout(ms_srch_time)
            });
            ms_s_inp.on('keyup', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                var $this = ga(this);
                var ms_u_key = $this.val();
				var cancel_search = ga('.messenger-cancel-search');
                var l_s_msg_us = ga('#pm_dlg_lft_users');
                var mdialog_srch_res = ga('#msg_d_search_res');
                var lupa_ic = ga('#msrch-act-1');
                var fbc_loader = "_55yn _55yo _55ym";
                if (mdialog_srch_res.length == 0) l_s_msg_us.before('<section id="msg_d_search_res"></section');



                if ($.trim(ms_u_key)) {
                    clearTimeout(ms_srch_time);
                    lupa_ic.removeClass('__remover').addClass(fbc_loader); //addClass('__loader');
					cancel_search.removeClass('hidden_elem');
                    ms_srch_time = setTimeout(function() {
                        var send = jAjax('/messenger.php', 'post', 'cmd=searchFriends&key=' + escape(ms_u_key));
                        send.done(function(data) { 
						
                            var vd = validateJson(data);
                            lupa_ic.removeClass(fbc_loader).addClass('__remover').on('click', function() {
                                $this.val('');
                                ms_s_inp.trigger('keyup')
                            });
                            if (vd.length <= 0) {
                                // empty result
                                contact_res.html('<div class="mdialog_search_empty">' + lang.pm_no_friends_found + '</div>');
                            } else {
                                // result
                                var r_html = '';

                                last_contacts.hide();

                                for (var i = 0; i < vd.length; i++) {
                                    var rsd = vd[i];
                                    var mg_us_mkup = jprintf(u_markup, '1', 'onUcLeft', rsd.id, rsd.id, rsd.name, rsd.photo, rsd.id, rsd.photo, rsd.name, (rsd.online == 'true' ? '<div class="ic-online"></div>' : ''), rsd.id, rsd.id, rsd.name, rsd.id, '', 'notifications__hide', '');
                                    r_html += u_markup.replace(/%id/g,rsd.id).replace(/%avatar/g,rsd.photo).replace(/%online/g, (rsd.online == 'true' ? '<div class="ic-online"></div>' : '')).replace(/%name/g,rsd.name);

                                }
                                contact_res.html(r_html);
								contact_res.parent().removeClass('__none');
								nanoScrollStart();
                            }

                        });
                    }, 500);

                } else {
                    last_contacts.show();
                    contact_res.empty();
					contact_res.parent().addClass('__none');
                    //aaCtiveTab();
                    lupa_ic.removeClass('__remover ' + fbc_loader);
                }

            });
		
		
		
	},
	this.getOnlineContacts = function(cnt){
	
	var no_online_contacts = '<div class="messenger_no_online_users">'+lang.mess_no_online_users+'</div>';
	cnt.removeClass('__none').html('<div class="div-loader"></div>');
	

	
    var send = jAjax('/messenger.php', 'post', 'cmd=onlineTab&view_as=json');

	
    send.done(function(result) {  
 
		var u_mkup = '';
        if (result !== 'null') {

            for (var rs = validateJson(result), i = 0; i < rs.length; i++) {
				var d = rs[i];
				u_mkup += self.prependContact('',window.event,d.photo,d.name,d.id,d.last_seen,'',false,true,true);  
            }
 
			 
			 
			 cnt.html(u_mkup);
        } else {

            // no online friends
			cnt.html(no_online_contacts);
        }



    });
		
	},
	this.switchTabs = function(tab,evt,c){
		evt.preventDefault();
		tab = ga(tab);
		
		ga('.mstabactive').removeClass('active');
		
		tab.addClass('active');
		
		
		var online_cnt = ga('#messenger-contacts-online-res');
		var contacts_cnt = ga('#messenger-contacts-last');
		
		
		
		
		switch(c){
			
			case 'conversations':
			online_cnt.addClass('__none').empty();
			contacts_cnt.show();
			ga('._1nq2').show();
			break;
			
			
			case 'online':
			// hide contacts
			contacts_cnt.hide();
			// hide search
			ga('._1nq2').hide();
 
			
			self.getOnlineContacts(online_cnt);
			
			
			
			
			
			break;
			
			
			
			
		}
		
	},
	this.removeNewBubble = function(mid,timeout,without_id){
		
							// unmark new messages
							var t = setTimeout(function() {
								
									if(self.shortcut){
										
										if(mid)
										self.shortcut.find('.is_new').each(function(){
											
											
											if( tonum(ga(this).closest('.pmessenger-message-txt').attr('id')) <= mid)
												ga(this).removeClass('is_new');
											
										});
										else if(without_id) self.shortcut.find('.is_new').removeClass('is_new');
										
									
									
										
									} else {
										
										if(mid)
										ga('.pmessenger').find('.is_new').each(function(){
											
											
											if( tonum(ga(this).closest('.pmessenger-message-txt').attr('id')) <= mid)
												ga(this).removeClass('is_new');
											
										});
										else if(without_id) ga('.pmessenger').find('.is_new').removeClass('is_new');
										
										 
										
									}
									
									
								
									 
							}, timeout ? timeout : 5000);
							
						
		
	},
	this.updateMessagesAsRead = function(userid,msg_id){
		
 
		
					if(userid != _U.i){
 
					self.socket.emit("seen", msg_id, userid);
					
					var send = jAjax('/messenger.php', 'post', {'cmd':'node-update-all-msgs-as-read','userid':userid});
					send.done(function(){
						
						if(self.shortcut) self.shortcut.removeClass('_h_unread');
						ga('#contact-'+userid).removeClass('_newmessages').find('.convo__unread.in_messenger').remove();
						
						self.removeNewBubble(msg_id);

						
						// remove from online hook
						ga('.nav_tool_friends_online #friend_'+userid).find('#online-friend-new-msg-count').remove();
					});

 
					}  
					
					

 		
		
	},
 
	this.notificationNewMessage = function(c,userid,msg_id){
		
		if(!c) return;
		var nano = ga("#messages-tick .nano");
		var nano_msg_cnt = nano.find('.nano-content');
	 
		
		if(!nano_msg_cnt.find('#flying-notif-new-messages').length){
			
			nano_msg_cnt.append(self.flying_new_message_markup.replace('%count',c));
			
			
		} else {
			nano_msg_cnt.find('#flying-notif-new-messages').replaceWith(self.flying_new_message_markup.replace('%count',c));
			
		}
		
	//	var is_scrollbar = nano.length ? 
		
		ga('.pmessenger #flying-notif-new-messages').off('click.new_msg_flying').on('click.new_msg_flying', function(e){
			
			e.preventDefault(); 
			e.stopImmediatePropagation();
			
			if(!ga(this).hasClass('no-nano-scroll'))
				nano.nanoScroller({ scroll: 'bottom' });
			
			
			ga(this).fadeOut(function(){ga(this).remove();});
			
			self.updateMessagesAsRead(userid,msg_id);
 
						
			if(self.minus_count_message) global_messenger_count -= 1;
				gwtlog.updateCountMessages(global_messenger_count);
		 
				self.minus_count_message=false;
				
			ga(window).off('focus.messenger');	
				
		});
		
		
		var nano = ga("#messages-tick .nano");
		var nano_pane = nano.find('.nano-content');
		var nano_scrolltop = nano_pane.scrollTop();
		
		if(nano_scrolltop <= 0) ga('.pmessenger #flying-notif-new-messages').addClass('no-nano-scroll').trigger('click.new_msg_flying');
		
		nano.off('scrollend.notifNewMessageBottom').on('scrollend.notifNewMessageBottom', function() {
		
 
			ga('.pmessenger #flying-notif-new-messages').addClass('no-nano-scroll').trigger('click.new_msg_flying');
			nano.off('scrollend.notifNewMessageBottom');
			 
			
		});
		
	},
	this.blinkWindowTitle = function(){
		
			if(self.getTotalMessUnreadCount() <= 0) {
				
				document.title = self.window_curr_title;
				return clearInterval(self.blinkTitleInterval);
				
			}
		
			if(!self.window_curr_title)
				self.window_curr_title = document.title;
			
			var create_window_title = '('+self.getTotalMessUnreadCount()+') '+ (self.getTotalMessUnreadCount() > 1 ? lang.new_messages : lang.new_message);
			
			document.title = self.isOldTitle ? self.window_curr_title : create_window_title;
			self.isOldTitle = !self.isOldTitle;
 
		
	},
	this.getTotalMessUnreadCount = function(){
 
		return parseInt(global_messenger_count);//+parseInt(self.last_message_object.global);
		
	},
	this.messengerFocusWindow = function(obj){
		
			clearInterval(self.blinkTitleInterval);

			//self.last_message_object = obj || self.last_message_object;//self.shortcut ? obj : self.last_message_object;
			if(self.getTotalMessUnreadCount() <= 0) {clearInterval(self.blinkTitleInterval); return;}


			// change document title
			self.blinkTitleInterval = setInterval(self.blinkWindowTitle, 700);
			


			
			
			
							setTimeout(function(){
							
							
 
							
							if(Object.keys(self.last_message_object).length){ 
							self.notificationNewMessage(
							
							self.last_message_object.msgs_count,
							self.last_message_object.userid,
							self.last_message_object.msg_id
							
							);
							
							self.turnOnSound();
	 
							
							
							
							} 

							if(self.shortcut && obj){

							if(Object.keys(obj).length)
							messenger_shortcut.notificationNewMessage(
							
							obj.msgs_count,
							'mshortcut-'+obj.userid,
							obj.msg_id
							
							);
							
							}
							 
							 

							},100);
			
			
			
			
			ga(window).off("focus.messenger").on("focus.messenger", function(e) { 
							e.preventDefault();
							e.stopImmediatePropagation();
							
							setTimeout(function(){
							nanoScrollStart();
							clearInterval(self.blinkTitleInterval);
							document.title = self.window_curr_title;
							self.window_curr_title = document.title;
							self.last_message_object = {};
							},100);
			});
						
						

						
		
	},
	
	this.scrollChat = function(read_messages,msgs_count,msg_id,userid){
		
		var nano = ga("#messages-tick .nano");
		var nano_pane = nano.find('.nano-content');
		var last_msg = ga('.pmessenger .pmessenger-message-txt:last');
		var nano_fullheight = ga('.pmessenger #messenger-nano-content-fullheight');
	 	
		if(!window_tab_active) { 
		
			if(!msgs_count) return;
			self.minus_count_message=true;

			self.last_message_object = {'msg_id':msg_id,'msgs_count':msgs_count,'userid':userid,'global':1}; 
			return self.messengerFocusWindow();

		} else {
			
			ga(window).off("focus.messenger");
		}

		
		
 

		nanoScrollStart();
 
 
 


 
	if((nano_fullheight.height() - nano_pane.scrollTop() - nano.height() >= 100) && read_messages){
		
		
			  if(msg_id) ga('#msg_'+msg_id).find('.messenger_text_col').addClass('is_new');
			  
				self.notificationNewMessage(msgs_count,userid,msg_id);
	} else{
	 

 
		
		if(msg_id) self.updateMessagesAsRead(userid,msg_id);
		
		setTimeout(function(){
 
		var scroll_evt = 'scrollend.c'+self.randId;
		nano.nanoScroller({ scroll: 'bottom' }).on(scroll_evt, function() {
 
		self.removeNewBubble(msg_id);
		gl_scrollChatDelay = false;
		});
		nano.trigger(scroll_evt);
		
		},gl_scrollChatDelay ? gl_scrollChatDelay : 10);
		
		nano.nanoScroller({ scroll: 'bottom' });
	
 }
	},
	this.getAttachments = function(uid){
		var attachments_cnt = ga('#messenger-attachments-cnt');
		attachments_cnt.html('<div class="div-loader"></div>');
		var send = jAjax('/messenger.php', 'post', {'cmd':'get-attachments','userid':escape(uid)});
		send.done(function(data){
			
			var d = validateJson(data);
			
			if(d.success == 1){
				
				if(d.info == 'no'){
					
					attachments_cnt.html('<div class="mess-textcenter">'+lang.messenger_no_attach+'</div>');
				} else {
					
					var files = '';
					
					for(var i = 0; i < d.files.length;i++){
						var file = d.files[i];
						files += '<a href="/gCimage?img='+file.id+'&from=attach&&sz=large" data-vbgall="112998877" class="venobox mess vbox-item image-hover"><div class="mess_attachment_small" style="background-image:url(/gCimage?img='+file.id+'&from=attach&&sz=small)"></div></a>';
						
					}
					attachments_cnt.html('<div class="nano"><div class="nano-content">'+files+'</div></div>');
					nanoScrollStart();
					venobox(ga('[data-vbgall]'));
				}
				
			} else {
				
				attachments_cnt.text(lang.messenger_err_loading_attach);
				
			}
			
		});
		
		
	},
	this.expandTab = function(evt,el){
		
		el = ga(el);
		
		if(el.parent().hasClass('expanded')){
			
			el.parent().removeClass('expanded');
			
			
		}
		 else {
			 
			 el.parent().addClass('expanded');
		 }
		
	},
	this.setColor = function(el,uid){
		
		el=ga(el);
		
		
		var color = el.data('color');
		var s_shortcut_id = self.shortcut_id ? tonum(self.shortcut_id) : 0;
		
		if( self.mess_colors.indexOf(color) <= -1){
			
			return displayErr(lang.messenger_invalid_color);
		}
		
		ajaxLoading();
		
		var send = jAjax('/messenger.php', 'post', {'cmd':'setColor','color':color,'userid':escape(uid)});
		
		send.done(function(data){
		
		
			removeAjaxLoad();
			if(data == 1) {
				ga('.mess_color.active').removeClass('active');
				
				el.addClass('active');
				
					//self.curr_color = color;
					
					ga('#sc_modern_popup').remove();
					var local_room_id = parseInt(_U.i)+uid;
					self.writeNotification('color_changed*'+_U.fn+'*'+color,'colors',s_shortcut_id,local_room_id);
					
			} else {
				
				return displayErr(lang.somethingWrong);
			}
		});
		
		 
	},
	this.curr_color = function(){
		if(self.shortcut) 
			return self.shortcut.find('#chat-curr-color').val();
		else
			return ga('.pmessenger').length ? ga('#mess-curr-color').val() : self.curr_color;
	},
	this.colorateStrokes = function(color,chat){
				var chat_id = chat;
				chat = chat ? '#'+chat+' ' : false;
 
				var mess = chat ? '#messenger_'+ga(chat).attr('id').split('-')[1]+' ' : '.pmessenger ';
				
				if(chat)
					ga(chat).find('#chat-curr-color').val(color);
				
				if(mess)
					ga(mess.replace(' ','')).find('#mess-curr-color').val(color);

				var elements_type = {
					"stroke" : "mess-colorate-this-stroke",
					"fill" : "mess-colorate-this-fill",
					"color": "gliph-mess-color",
					"background-color":"li-gliph-color-background",
					"border-color" : "li-gliph-color-border"
 
				};
 
				$.each(elements_type, function(key, value) {
					 
					 
						ga(mess+'[rel="'+value+'"]').each(function(){
								if(key == 'fill' || key == 'stroke')
									ga(this).attr(key,color);
								else 
									ga(this).css(key,color);
						});
						
						
						ga(chat+'[rel="'+value+'"]').each(function(){
					
									if(key == 'fill' || key == 'stroke')
										ga(this).attr(key,color);
									else 
										ga(this).css(key,color);
							
						});
 

				
				});
				 
		 

				
				// colorate messages
				var message = ga(chat+'.pmessenger-message-txt._me').find('.txt_pmessenger-text');
				ga(chat+'.pmessenger-message-txt._me').find('.txt_pmessenger-text').css('background-color',color);
	
				var style_id = chat_id ? 'messenger-pseudo-element-color-'+chat_id : 'messenger-pseudo-element-color-mshortcut-'+self.recipient_id;
				var color_ps_before = '<style id="'+style_id+'">#'+chat_id+' .messenger-shortcut-cnt ._me .txt_pmessenger-text:before{ border-right-color: %color;}</style>';
	
				if(!ga('body').find('#'+style_id).length){
					
					ga('body').prepend(color_ps_before.replace(/%color/g,color));
				} else {
					ga('body').find('#'+style_id).replaceWith(color_ps_before.replace(/%color/g,color));
				}
		
	},
	this.setNicknames = function(uid,uname){
		
		return modernPopup(function(confirm_btn,cnt){
		
		var shortcut_id = self.shortcut_id ? tonum(self.shortcut_id) : 0;
		
		var nicknames_markup = '<li><div class="mess_nickname_input"><div class="mess_nickname_td ellip">'+decodeURIComponent(uname)+'&nbsp;<a href="javascript:void(0);" onclick="ga(this).parent().parent().find(\'input\').val(\'\');">'+lang.remove+'</a></div><div class="mess_nickname_inp"><input class="dark" type="text" id="messenger_recipient_nickname" placeholder="'+lang.messenger_nickname_placeholder+'" value="%nickname_recipient" /></div></div></li>\
								<li><div class="mess_nickname_input"><div class="mess_nickname_td ellip">'+_U.n+'&nbsp;<a href="javascript:void(0);" onclick="ga(this).parent().parent().find(\'input\').val(\'\');">'+lang.remove+'</a></div><div class="mess_nickname_inp"><input class="dark" type="text" id="messenger_my_nickname" placeholder="'+lang.messenger_nickname_placeholder+'" value="%my_nickname" /></div></div></li>';

						
		cnt.html('<div class="div-loader"></div>');
		var send = jAjax('/messenger.php', 'post', {'cmd':'get-nicknames', 'userid':escape(uid)});
		send.done(function(data){

		

												
				var d = validateJson(data);
 
				if(d.count > 0){
					/*
					var my_data = d.my;
					var recipient_data = d.recipient;
					*/
					
					var my_nickname = d.my;//Object.keys(my_data).length > 0 ? my_data.nickname : '';
					var recipient_nickname = d.recipient;//Object.keys(recipient_data).length > 0 ? recipient_data.nickname : '';
					
 
					
					nicknames_markup = nicknames_markup.replace(/%nickname_recipient/g,recipient_nickname).replace(/%my_nickname/g,my_nickname);

					
				} else {
 
					nicknames_markup = nicknames_markup.replace(/%nickname_recipient/g,'').replace(/%my_nickname/g,'');
 
				}
		/*
				for(var i = 0; i < self.mess_colors.length;i++)
					colors += color.replace(/%nickname/g,self.mess_colors[i]).replace('%active', (data == self.mess_colors[i] ? 'active' : ''));
			*/
					var m_nicknames_markup = '<div class="pmessenger_nicknames"><header class="colors-popup-h">'+lang.messenger_edit_nicknames+'</header>\
												\
												<div class="messenger_nicknames_cnt"><ul>'+nicknames_markup+'</ul>\
												\
												</div>\
												\
												</div>';
												
			

				cnt.html(m_nicknames_markup);
		});
		
		
		
			

			 
		
			 
			
			confirm_btn.on('click',function(e){
				
				var send = jAjax('/messenger.php', 'post', {'cmd':'setnickname',
				'userid':escape(uid), 
				'nickname_recipient':$.trim(ga('#messenger_recipient_nickname').val()),
				'my_nickname':$.trim(ga('#messenger_my_nickname').val())
				});
				
				send.done(function(data){ 
					
					 
					var local_room_id = parseInt(_U.i)+uid;
					if(data == 1) {
						
						if ( $.trim(ga('#messenger_recipient_nickname').val()) || $.trim(ga('#messenger_my_nickname').val())) {
							var send_new_nickname = $.trim(ga('#messenger_my_nickname').val()) ? ga('#messenger_my_nickname').val() : '';
							
							self.writeNotification('nickname_added*'+_U.fn+'*'+send_new_nickname,'nicknames',shortcut_id,local_room_id);
						}
						 else {
							
							
							self.writeNotification('nickname_cleared*'+_U.fn+'*','nicknames',shortcut_id,local_room_id);
							
						}
						
						
						if($.trim(ga('#messenger_recipient_nickname').val()) != '') {
							
							// messenger
							ga('#messenger_'+uid).find('.xweeWrt').text(ga('#messenger_recipient_nickname').val());
							// shortcut
							ga('#mshortcut-'+uid).find('.mshortcut-u-name-str>a').text(ga('#messenger_recipient_nickname').val());
						} else {
							
							//ga('.xweeWrt').text(decodeURIComponent(uname));
							// messenger
							ga('#messenger_'+uid).find('.xweeWrt').text(decodeURIComponent(uname));
							// shortcut
							ga('#mshortcut-'+uid).find('.mshortcut-u-name-str>a').text(decodeURIComponent(uname));
						}
						
						
						kn_liveNotif(lang.messenger_nickname_updated,'done',2000,'');
						ga('#sc_modern_popup').remove();
						
						} else {
							
							
						return kn_liveNotif(lang.Error,'warn',4000,data);
						 
						
					}
					
				});
				
				
				
			});
			
			
		});

		
	},
	this.sWriteNotification = function(w,categ,shortcut_id){

		shortcut_id = shortcut_id ? 'mshortcut-'+shortcut_id : false;
 
		var append_to = self.shortcut ? self.shortcut.find('.pmessenger-message-txt:last') : ga('.pmessenger .pmessenger-message-txt:last');
		
		switch(categ){
			
			
			
		case 'nicknames':
		w = w.split('*');
		
		var w_1 = w[0];
		var w_2 = w[1];
		var nickname_new = w[2];
		
		
						switch(w_1) {
							
							case 'nickname_added':
							 
								append_to.after(self.notif__markup.replace('%text',w_2+'&nbsp;'+lang.messenger_notif_changed_nickname));
								
							break;
							
							case 'nickname_cleared':
							
								append_to.after(self.notif__markup.replace('%text',w_2+'&nbsp;'+lang.messenger_notif_removed_nickname));
								 
							break;
							
							
						}
		break;
		
		case 'colors':
 
		w = w.split('*');
		var w_1 = w[0];
		var w_2 = w[1];
		var n_color = w[2]; 
		append_to.after(self.notif__markup.replace('%text',w_2+'&nbsp;'+lang.messenger_notif_changed_color));
		self.colorateStrokes(n_color,shortcut_id);
		if( ga('#mshortcut-'+self.curr_recipient).length ){
			self.colorateStrokes(n_color,'mshortcut-'+self.curr_recipient);
		}
		
		//self.curr_color = n_color;
		break;
		
		} 
		

		
		
		if(shortcut_id) {
			messenger_shortcut.focusChatTab(shortcut_id);
			setTimeout(function(){messenger_shortcut.scrollChat(shortcut_id);},100); 
			
		} else self.scrollChat();
	//	self.turnOnSound();
	},
	this.writeNotification = function(w,categ,shortcut_id,room_id){

		// send to recipient
		self.socket.emit("messenger_notification", w, room_id, self.curr_recipient, categ);
		// write for me
		self.sWriteNotification(w,categ,shortcut_id);
		
	},
	this.changeColor = function(uid){
		
		return modernPopup(function(confirm_btn,cnt){
		
				
		var color = '<li><div class="mess_color %active" onclick="messenger.setColor(this,'+uid+');" data-color="%m_color" style="background-color:%m_color;"><i class="sp_color-sel" alt="" style="color: %m_color;"></i></div></li>';
		
		if(self.shortcut)
		   color = '<li><div class="mess_color %active" onclick="mess_shortcut(\''+self.shortcut_id+'\').setColor(this,'+uid+');" data-color="%m_color" style="background-color:%m_color;"><i class="sp_color-sel" alt="" style="color: %m_color;"></i></div></li>';


		var colors = '';
		cnt.html('<div class="div-loader"></div>');
		var send = jAjax('/messenger.php', 'post', {'cmd':'getChatCurColor', 'userid':escape(uid)});
		send.done(function(data){
			
			
			 
		
				for(var i = 0; i < self.mess_colors.length;i++)
					colors += color.replace(/%m_color/g,self.mess_colors[i]).replace('%active', (data == self.mess_colors[i] ? 'active' : ''));
			
						var m_colors_markup = '<div class="pmessenger_colors"><header class="colors-popup-h">'+lang.messenger_pick_color+'</header>\
						\
						<div class="messenger_colors_cnt"><ul>'+colors+'</ul>\
						\
						</div>\
						\
						</div>';
				cnt.html(m_colors_markup);
				
				
				ga('#mess-curr-color').val(color);
				
		});
		
		
		
			

			 
		
			
			
			confirm_btn.on('click',function(e){
				ga('#sc_modern_popup').remove();
				
			});
			
			
		},1);

		
	},
	this.appendNewMessages = function(messages,user,bubble_count){
 
		var no_messenger = !ga('.pmessenger').length;
		for(var i=0; i < messages.length; i++){
			
			
			var message = messages[i].message;
			var user = messages[i].user;
			
	
                var text = message.text.replace(/\\/g, ""),
                    time = message.time,
					min_text = message.min_text.replace(/\\/g, ""),
                    mid = message.msgid,
                    read = message.rd,
					m_bg = message.bg,
					userId = user.id,
					online = user.online,
					avatar = user.avatar,
					timestamp = message.timestamp,
					php_curr_date = message.curr_date,
					user_fullname = user.fullname,
					count = message.count,
					user_online = user.online_ago;
					
					
				 
					self.recipient_last_message_timestamp = timestamp;
					// check if messenger is open
					if(ga('.pmessenger').length){
					
									// current open room
									if(ga('#messenger_with_user').val() == userId){
										
									ga('.pmessenger').find('.typing').remove();
									self.scrollNow=true;
				 
									var j_last_msg = ga('.pmessenger-message-txt:last');
				 
									
									if(j_last_msg.hasClass('_me'))
										this.avatar = true;
									else
										this.avatar = false;
									global_messenger_count = bubble_count;
									self.apMessage(mid, userId, userId, avatar, time, text, online, m_bg, this.avatar, 1, count,timestamp,php_curr_date);
									self.appendMessageInContacts(min_text,userId,timestamp,time,'',1);
														

									
									 
									if(window_tab_active){self.count_minus=1; bubble_count -= 1;}
								
									}
									// if contact exist in left side
									else if(ga('#contact-'+userId).length) {
							 
										self.appendMessageInContacts(min_text,userId,timestamp,time,'',false,count);
										//return last_msgs_count;
						 
									}
									// if contact dose not exist, create one
									else {
										//prependContact = function(el,evt,avatar,name,id,last_seen,last_msg,new_msg,click)
										
										messenger.prependContact('',window.event,avatar,user_fullname,userId,user_online, min_text, count, true);
										
									}
					
					
					
					
					} 
					
					
					// check if user is in friend list on right sidebar, app count 
					if(ga('.nav_tool_friends_online #friend_'+userId).length && !messenger_shortcut.isfocus('mshortcut-'+userId)){
						
						var u = ga('.nav_tool_friends_online #friend_'+userId);
						
						if(!u.find('#online-friend-new-msg-count').length)
							u.find('.online_u_cnt').prepend('<div class="online-friend-new-msg-count" id="online-friend-new-msg-count"><span>+'+count+'</span></div>');
						else
							u.find('#online-friend-new-msg-count>span').text('+'+count);
						
						if(count <= 0)
							u.find('#online-friend-new-msg-count').remove();
					}
					
					
					 // check if shortcut is created
					if( ga('#mshortcut-'+userId).length) {
							var shortcut_id = 'mshortcut-'+userId;
							var shortcut = ga('#'+shortcut_id);
							
									
									ga('#mshortcut-'+userId).find('.typing').remove();
									//self.scrollNow=true;
				 
									var j_last_msg = shortcut.find('.pmessenger-message-txt:last');
									var last_msg_id = j_last_msg.length ? tonum(j_last_msg.attr('id')) : 0;
									
									
									global_messenger_count = bubble_count;
									
									// check if shortcut is focused
									if( shortcut.hasClass('_focus') && window_tab_active ) {
										
										bubble_count -= 1;
							 
								
									}
						
									
									// check if shortcut is closed, just open it
									if(shortcut.hasClass('__none') && no_messenger){
										
										messenger_shortcut.just_show('mshortcut-'+userId);
														 
									}
									
									
									
									
									 
									if(last_msg_id == mid) return bubble_count;
									
									if(j_last_msg.hasClass('_me'))
										this.avatar = true;
									else
										this.avatar = false;
									
									
									var _this = this;
									//setTimeout(function(){
									mess_shortcut(shortcut_id).apMessage(mid, userId, userId, avatar, time, text, online, m_bg, _this.avatar, 1, count, timestamp,php_curr_date);
									//},1);
									
									
									/*
									if(unread_messages_by_user && unread_messages_by_user.hasOwnProperty(userId) ){
			
										if(unread_messages_by_user[userId] > 0)	{
											bubble_count -= 1;
										}
										
									}
									*/

						
					} else 
						// shortcut is not created yet, create it
						if( no_messenger ){
							 
							var d = {};
							d['id'] = userId;
							d['fullname'] = user_fullname;
							d['photo'] = avatar;
					
							messenger_shortcut.open(false,false,d,1);
						}
 
		}

		 global_messenger_count = bubble_count;

		 return bubble_count;
		 
		 
		 
		 /*
		var send = jAjax('/messenger.php', 'post', {'cmd':'node-update-as-read','userid':recipientId});
		send.done(function(data){
			
			var res = validateJson(data);
			
			
			if(res.count > 0){
				
				
				
				var message = res.message;
				
                var text = message.text.replace(/\\/g, ""),
                    time = message.time,
					min_text = message.min_text.replace(/\\/g, ""),
                    mid = message.msgid,
                    read = message.rd,
					m_bg = message.bg,
					whois = recipientId,
					userId = whois,
					online = 1;
 
					
					ga('.typing').remove();
					self.scrollNow=true;
 
					var j_last_msg = ga('.pmessenger-message-txt:last');
 
					
					if(j_last_msg.hasClass('_me'))
						this.avatar = true;
					else
						this.avatar = false;
					
					self.apMessage(mid, recipientId, userId, self.recipient_picture, time, text, online, m_bg, this.avatar);
					self.appendMessageInContacts(min_text,'');
					
					self.socket.emit("seen", mid,self.room_id, _U.i);
					
			 
			}
			 
		});*/
	},

	this.join_rooms = function(){
 
	
	//self.socket = io(NODE_HOST);

		
 
/*
	if( self.socket instanceof Object )
		for(var x=0; x < self.socket_rooms.length;x++){
			// leave chat with prev user
			self.socket.emit("leave_room",self.socket_rooms[x]);
			
			delete self.socket_rooms[x];
			
		}
				
	

 		self.socket.on('connect', function(){
			
			self.socket.emit('joinroom', self.room_id);
			
		});
		self.socket.emit('joinroom', self.room_id);
		
*/
 
 	self.socket_rooms.push(self.room_id);
 
	if( self.socket_messages == 'null' ){
     /*   self.socket.on('chat message', function(msg,room_id){  
		  
			console.log(msg);
            self.appenMessageInConversation();
			
        });
		*/
 
		self.socket_messages = 1;
	}
	
	 


	},
	this.updateTopBubble = function(user_count){
	 
		var c = gwtlog.getCounts();
		var $count = Object.keys(user_count).length;
 
		
	},
	this.close_search = function(){
		
						
		ga('#messenger-search-result').hide().find('.nano-content').empty();
		ga('#messages-tick').show();
		nanoScrollStart();
		self.scrollChat();
		
		return ga('#messenger_search_enabled').remove();
	},
	this.search = function(uid){
		
		
		if(!ga('#messenger_search_enabled').length){
			
			ga('#pmessenger-contact-header').append(
			'<div id="messenger_search_enabled" class="mess_search_header">\
			<div class="messenger-search-arr" onclick="messenger.close_search();"><i class="mess-header-ic close"></i></div>\
			<div class="mess_search_header_input _5iwm">\
			<label class="_58ak"><input onkeypress="clearTimeout(this.messenger_search_timeout);" onkeydown="clearTimeout(this.messenger_search_timeout);" onkeyup="var _this = this;clearTimeout(_this.messenger_search_timeout);if(event.keyCode == 27) {return messenger.close_search();} _this.messenger_search_timeout = setTimeout(function(){ clearTimeout(_this.messenger_search_timeout);messenger.searchInConversation(_this,event);  },500);" placeholder="'+lang.messenger_search_in_conversation+'" type="text" id="messenger-search-input" /></label>\
			</div>\
			<div class="messenger-search-status"></div>\
			<div class="messenger-search-arrows">\
			<div class="messenger-search-arr" onclick="messenger.searchInConv(this,\'up\')"><i class="mess-header-ic up"></i></div>\
			<div class="messenger-search-arr" onclick="messenger.searchInConv(this,\'down\')"><i class="mess-header-ic down"></i></div>\
			</div>\
			</div>'
			);
			
			ga(document).off('keyup.closeMessengerSearch').on('keyup.closeMessengerSearch','body',function(e){
				
				if(e.keyCode == 27) self.close_search();
				
			});
			
			
			
		} else {
			
			self.close_search();
		}
		
		
		
	}
	,
	this.searchInConv = function(el,direction){
		
		
		

 
		var un_highlight = function(){

		 ga('.messenger_conv_marks').each(function(){
				
				var txt = ga(this).html();
				
				ga(this).replaceWith(txt);
				
			});
		
		}		
		  
		  
 
function highlight_words(word, element) {
    if(word) {
        var textNodes;
        word = word.replace(/\W/g, '');
        var str = word.split(" ");
        $(str).each(function() {
            var term = this;
            var textNodes = $(element).contents().filter(function() { return this.nodeType === 3 });
            textNodes.each(function() {
              var content = $(this).text();
              var regex = new RegExp(term, "gi");
              content = content.replace(regex, '<span class="highlight">' + term + '</span>');
              $(this).replaceWith(content);
            });
        });
    }
}




var highlight = function(msg_id) { 


un_highlight();

//highlight_words(ga('#messenger-search-input').val(),ga('#msg_'+msg_id));
		var key = ga('#messenger-search-input').val();
		var opar = ga('#msg_'+msg_id).find('.txt_pmessenger-text'), opar_val = opar.text();

		
		opar = opar[0];
		
  var paragraph = opar;
  var search = key;
  search = search.replace('[.*+?^${}()|[\]\\]', '\\$&');  

 
  var m;

  if (search.length > 0)
    paragraph.innerHTML = opar_val.replace(search, '<mark class="messenger_conv_marks">$&</mark>');
  else paragraph.innerHTML = opar_val;
  

}
		  
 var scrollNanoToMsg = function(){
	 ga('#mess-header-zero-res').text( Math.ceil(self.search_in_conv_curr_id+1) );
	 ga("#messenger-search-result .nano").nanoScroller({ scrollTop: ga('#msg_'+ self._search_conv_messages[self.search_in_conv_curr_id]).position().top - 50});
 }
		  switch(direction){
			  
			  
			  
			  case 'up':
			   
				
	 
				self.search_in_conv_curr_id = typeof self._search_conv_messages[self.search_in_conv_curr_id] == "undefined" ? self._search_conv_messages.length-1 : self.search_in_conv_curr_id;
		   
				highlight(self._search_conv_messages[self.search_in_conv_curr_id]);
			  
				scrollNanoToMsg();
				
				self.search_in_conv_curr_id--;
				
				
				
			  break;
			  
			  case 'down':
			   
 
				self.search_in_conv_curr_id = typeof self._search_conv_messages[self.search_in_conv_curr_id] == "undefined" ? 0 : self.search_in_conv_curr_id;
				highlight(self._search_conv_messages[self.search_in_conv_curr_id]);
				scrollNanoToMsg();
				self.search_in_conv_curr_id++;
			  
			  break;
			  
			  
			  
			  
		  }
 
 
		
		
		
		
	},
	this.searchInConversation = function(input,evt){
		
		evt.preventDefault();
		
		var $input = ga(input);
		var key = $input.val();
		

		if($.trim(key)){
			ga('#messages-tick').hide();
			ga('#messenger-search-result').show().find('.nano-content').html('<div class="div-loader"></div>');
			self.search_in_conv_curr_id = 0;
			var send = jAjax('/messenger.php', 'post', {'cmd':'search-in-conversation','userid':escape(self.curr_recipient),'key':urlencode(key)});
			ga('#pmessenger-contact-header').css('pointer-events','none');
			send.done(function(res){ 
 
					
					ga('#pmessenger-contact-header').css('pointer-events','auto');
					var data = validateJson(res);
			 
					if (data.count == 0) {
 
						ga('.messenger-search-status').html('0&nbsp;'+ lang.messenger_search_conv_count_results);
						ga('#messenger-search-result').show().find('.nano-content').html('<div class="mess-search-conv-empty">'+lang.messenger_search_conv_empty.replace('%key','<strong>'+key+'</strong>')+'</div>');
					} else {
						ga('.messenger-search-status').html('<span id="mess-header-zero-res">0</span>&nbsp;/&nbsp;'+data.count+'&nbsp;'+ lang.messenger_search_conv_count_results);
						var message_markup = '';
						 var author_last_msg = 0;
						var avatar = true;
						var last_date = 0;
						self._search_conv_messages = new Array();
						for (var i = 0; i < data.messages.length; i++) {
							var _arr = data.messages[i];
							if(author_last_msg != _arr.fromUser)
									avatar = true;
								else
									avatar = false;
								
		
								
								var l_dat = ga('#messenger-search-result .messenger_date_delim:first').length ? ga('#messenger-search-result .messenger_date_delim:first').text() : '';
								var hj = l_dat == _arr.dateMonth ? true : false;
								
								var $show_date = (author_last_msg == _arr.lastby && author_last_msg > 0) && (_arr.date == last_date && last_date > 0) ? false : true;
								
								$show_date = _arr.date !== last_date && !hj && $show_date ? true : false;
								 
								
							message_markup += self.getMessagesMarkup(_arr,(_arr.fromUser == _U.i ? 'me' : ''),avatar,$show_date);
							self._search_conv_messages.push(_arr.id);
								
							author_last_msg = _arr.lastby;
							last_date = _arr.date;
							
						}
 
						ga('#messenger-search-result').show().find('.nano-content').html('<div id="messenger-nano-content-fullheight">'+message_markup+'</div>');
						self.colorateStrokes(self.curr_color);
						nanoScrollStart();
			 
						 
					}

				});
			
			
		}
		
	},
	
	this.isInBlackList = function(){
		
				var container = ga('.pmessenger');
				
				if(self.shortcut)
					container = self.shortcut;
		
                if (container.find('.blocked_u_no_pm').length == 0){
					
				if(self.shortcut)
					container.find('.messenger-shortcut-footer').html('<div class="blocked_u_no_pm">' + jprintf(lang.pm_user_to_blacklist, '') + '</div>');
				else
                    container.find('.pmessenger-msg-list-contenteditable').html('<div class="blocked_u_no_pm">' + jprintf(lang.pm_user_to_blacklist, self.recipient_fullname) + '</div>');
				
				}
                setTimeout(function() {
                    container.find('.blocked_u_no_pm').addClass('__up');
                }, 1000);
				container.find('#messenger_aria_options').empty();
				container.find('#messenger_aria_options_chat').empty();
	},
	this.deleteScreenshot = function(evt){
		
		evt.preventDefault();
		
		var el = ga(evt.target);
		
		
		el.closest('.screenshot').remove();
		
		
	},
	this.uploadScreenshot = function(screen_data){
		
		
		// append screenshot before uploading
		var $screen = ga('<obattch class="screenshot_uploading"><div class="attach-photo_del id-needle" data-attached="1" onclick="jb_delete_attach(event);" title="'+lang.Delete+'"><div class="ic10 ic10_i_close"></div></div><img class="attach-photo_img" border="0"></obattch>');
		
		if(self.shortcut_id)
			ga('#tchat_'+self.shortcut_id_num).prepend($screen);
		else
			ga('#WD_attach_files_PM').prepend($screen);
		
		self.uploadingScreen=1;
		
 
		var send = jAjax('/messenger.php', 'post', {'cmd':'uploadscreen','to':escape(recipientId),'data':urlencode(screen_data)});
		send.done(function(data){ 
			
		var r = validateJson(data);
		
		self.uploadingScreen=false;
		if(r.success == 1){
			$screen.removeClass('screenshot_uploading');
			$screen.find('.id-needle').attr('id','attachDe_'+r.id);
			$screen.find('img').attr('src',r.image_url);

		} else{
			$screen.find('.attach-photo_del').click();
			return displayErr(lang.somethingWrong);
		}
		
			
			
		});
		
		

		
	},
	this.load_more_contacts = function(btn) {
	btn = ga(btn);
    ++self.more_contacts_page;
    var l = ga('#messenger-contacts-last').find('.nano-content');
    var s_at = l.children().length;



    var send = jAjax('/messenger.php', 'post', 'cmd=moreConversations&page=' + escape(self.more_contacts_page) + '&s_at=' + (s_at) + '&token=' + (new Date()).getTime());

    send.done(function(html) {  


        if (html != 0) {
            l.find('.messenger-load-more-contacts-loader').before(html);
			setTimeout(function(){nanoScrollStart();},100);
        } else {
            self.loaded_all_contacts = 1;
            btn.parent().remove();
        }
    });

}
	this.pasteMessages = function(el,ev){
					
					
					
  
						  // use event.originalEvent.clipboard for newer chrome versions
						  var items = (ev.clipboardData  || ev.originalEvent.clipboardData).items;
						   
						  // find pasted image among pasted items
						  var blob = null;
						  for (var i = 0; i < items.length; i++) {
							if (items[i].type.indexOf("image") === 0) {
							  blob = items[i].getAsFile();
							}
						  }
						  // load image if there is a pasted image
						  if (blob !== null) {
							var reader = new FileReader();
							reader.onload = function(e) {
							 // console.log(e.target.result); // data url!
							  var screen_data = e.target.result;
							if(self.shortcut_id)
								mess_shortcut(self.shortcut_id).uploadScreenshot(screen_data);
							else
								self.uploadScreenshot(screen_data);

							};
							reader.readAsDataURL(blob);
						  } else {
							  
					   // cancel paste
						ev.preventDefault();

						// get text representation of clipboard
						var text = (ev.originalEvent || ev).clipboardData.getData('text/plain');

						// insert text manually
						document.execCommand("insertHTML", false, text);
							  
						  }
					 
					
					
					
					
	},
	this.toggle_sound = function(){
		
                if (self.pm_sound_enable()) {
                    createCookie('dk_pm_sound', 'off');
                    sound_o_f();
                } else {
                    createCookie('dk_pm_sound', 'on');
                    sound_o_f(1);
                    setTimeout('turnOnSound();', 100);
                }
	},
	this.pm_sound_enable = function() {
    return 1;//readCookie('dk_pm_sound') === 'on' || !readCookie('dk_pm_sound') ? 1 : 0;
	},

	// sound
	this.turnOnSound = function() {
	var mess = true;
 
    if (self.pm_sound_enable()) {  

	// play sound
	soundManager.play('new-message');
 
    }

},







this.add_media = function(el,o){
	
	el = ga(el);
	var f = el.closest('.mmmm_c_m');
	switch(o){
		
		case 'audio':
		f.find('._type_audio').click();
		break;
		
		case'device_files':
		f.find('._type_photo_from_computer').click();
		break;
		
		case 'photo':
		f.find('._type_photo').click();
		break;
		
		case 'gif':
		f.find('._type_gif').click();
		break;
	}
	
}
this.get_bottom_mess_buttons = function(size,i_shortcut){
	
			size = size || 20;
	
			 return '<div class="_4rv4"><div class="mdialog_send_message_loader _55yn _55yo _55ym"></div>\
					<ul class="_39bj">\
					<li onclick="evstop(event,1);messenger.add_media(this,\'audio\');" class="_39bk"><a href="javascript:void(0);">\
					<svg width="'+size+'px" height="'+size+'px" x="0px" y="0px" viewBox="0 0 25.685 25.685" style="enable-background:new 0 0 25.685 25.685;">\
					<g>\
						<path fill="#666" rel="mess-colorate-this-fill"  d="M22.08,0.098L10.97,3.497C9.624,3.881,8.533,5.285,8.533,6.631v11.557c0,0,0,0.158,0,0.162   c0,0-0.805-0.543-2.598-0.289c-2.633,0.374-4.768,2.395-4.768,4.515s2.135,3.419,4.768,3.045c2.635-0.372,4.566-2.331,4.566-4.452   c0,0,0-9.066,0-10.006s1.13-1.343,1.13-1.343l9.823-3.079c0,0,1.087-0.365,1.087,0.641s0,8.031,0,8.031s0,0.002,0,0.006   c0,0-1.001-0.576-2.794-0.358c-2.633,0.319-4.768,2.298-4.768,4.417c0,2.121,2.135,3.463,4.768,3.143   c2.635-0.319,4.77-2.297,4.77-4.418V1.84C24.517,0.494,23.425-0.286,22.08,0.098z"/>\
					</g>\
					</svg>\
					</a></li>\
					<li title="Hold on to record a voice clip" id="messenger-recording-button" onclick="evstop(event,1);messenger._constrMediaRecorder(this,'+(i_shortcut ? 1 : 0)+');" class="_39bk">\
					<a href="javascript:void(0);">\
					<svg fill="#666" rel="mess-colorate-this-fill" x="0px" y="0px" width="'+size+'px" height="'+size+'px" viewBox="0 0 96.667 96.666" style="enable-background:new 0 0 96.667 96.666;">\
					<g>\
							<path d="M48.333,73.296c9.519,0,17.263-7.744,17.263-17.262V17.262C65.596,7.743,57.852,0,48.333,0c-9.519,0-17.262,7.743-17.262,17.262v38.773C31.071,65.553,38.814,73.296,48.333,73.296z"/>\
							<path d="M76.078,45.715h-3.437c-1.104,0-2,0.896-2,2v7.029c0,12.3-10.008,22.308-22.309,22.308S26.025,67.044,26.025,54.744v-7.029c0-1.104-0.896-2-2-2h-3.437c-1.104,0-2,0.896-2,2v7.029c0,14.707,11.433,27.667,26.026,29.506v4.98h-15.35c-1.104,0-2,0.896-2,2v3.436c0,1.104,0.896,2,2,2h38.138c1.104,0,2-0.896,2-2V91.23c0-1.104-0.896-2-2-2H52.051v-4.98c14.594-1.838,26.026-14.799,26.026-29.506v-7.029C78.078,46.61,77.182,45.715,76.078,45.715z"/>\
						</g>\
					</svg>\
					</a>\
					</li>\
					<li onclick="evstop(event,1);messenger.add_media(this,\'device_files\');" class="_39bk"><a href="javascript:void(0);">\
					<svg width="'+size+'px" height="'+size+'px" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;">\
					<g>\
							<path fill="#666" rel="mess-colorate-this-fill" d="M50,40c-8.285,0-15,6.718-15,15c0,8.285,6.715,15,15,15c8.283,0,15-6.715,15-15    C65,46.718,58.283,40,50,40z M90,25H78c-1.65,0-3.428-1.28-3.949-2.846l-3.102-9.309C70.426,11.28,68.65,10,67,10H33    c-1.65,0-3.428,1.28-3.949,2.846l-3.102,9.309C25.426,23.72,23.65,25,22,25H10C4.5,25,0,29.5,0,35v45c0,5.5,4.5,10,10,10h80    c5.5,0,10-4.5,10-10V35C100,29.5,95.5,25,90,25z M50,80c-13.807,0-25-11.193-25-25c0-13.806,11.193-25,25-25    c13.805,0,25,11.194,25,25C75,68.807,63.805,80,50,80z M86.5,41.993c-1.932,0-3.5-1.566-3.5-3.5c0-1.932,1.568-3.5,3.5-3.5    c1.934,0,3.5,1.568,3.5,3.5C90,40.427,88.433,41.993,86.5,41.993z"/>\
						</g>\
					</svg>\
					</a></li>\
					<li onclick="evstop(event,1);messenger.add_media(this,\'photo\');" class="_39bk"><a href="javascript:void(0);">\
					<svg fill="#666" rel="mess-colorate-this-fill" width="'+size+'px" height="'+size+'px" x="0px" y="0px" viewBox="0 0 315.58 315.58" style="enable-background:new 0 0 315.58 315.58;">\
					<g>\
						<path d="M310.58,33.331H5c-2.761,0-5,2.238-5,5v238.918c0,2.762,2.239,5,5,5h305.58c2.763,0,5-2.238,5-5V38.331   C315.58,35.569,313.343,33.331,310.58,33.331z M285.58,242.386l-68.766-71.214c-0.76-0.785-2.003-0.836-2.823-0.114l-47.695,41.979   l-60.962-75.061c-0.396-0.49-0.975-0.77-1.63-0.756c-0.631,0.013-1.22,0.316-1.597,0.822L30,234.797V63.331h255.58V242.386z"/>\
						<path d="M210.059,135.555c13.538,0,24.529-10.982,24.529-24.531c0-13.545-10.991-24.533-24.529-24.533   c-13.549,0-24.528,10.988-24.528,24.533C185.531,124.572,196.511,135.555,210.059,135.555z"/>\
					</g>\
					</svg>\
					</a></li>\
					<li onclick="evstop(event,1);messenger.add_media(this,\'gif\');" class="_39bk"><a href="javascript:void(0);">\
					<svg fill="#666" rel="mess-colorate-this-fill" width="'+size+'px" height="'+size+'px" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">\
					<g>\
						<g>\
							<g>\
								<path d="M146.286,146.286H36.571C14.629,146.286,0,164.571,0,182.857v146.286c0,18.286,14.629,36.571,36.571,36.571h109.714     c21.943,0,36.571-18.286,36.571-36.571V256H128v54.857H54.857V201.143h128v-18.286     C182.857,164.571,168.229,146.286,146.286,146.286z"/>\
								<polygon points="512,201.143 512,146.286 347.429,146.286 347.429,365.714 402.286,365.714 402.286,292.571 475.429,292.571      475.429,237.714 402.286,237.714 402.286,201.143    "/>\
								<rect x="237.714" y="146.286" width="54.857" height="219.429"/>\
							</g>\
						</g>\
					</g>\
					</svg>\
					</a></li>\
					</ul>\
					</div>';
	
}
	this.startRecordingEvents = function(btn,shortcut){
		
		//var btn = ga('#messenger-recording-button');
		btn = ga(btn);
		
		if(!self.mediaRecorderConstructed)
		// construct mediaRecorder
		return self._constrMediaRecorder(btn,shortcut);
		  
			// start recording
			btn.off('mousedown.recording').on('mousedown.recording', function(){
				
				if (self.recording_timeout) clearTimeout(self.recording_timeout);
				

				
				self.recording_timeout = setTimeout(function(){
					  
						self.startRecordingVoiceClip();
						btn.addClass('recording');
					  
				 }, 100); // the above code is executed after 100 ms
				
			});

			 // stop recording
			 btn.off('mouseup.recording').on('mouseup.recording', function(){
				 
			   if (self.recording_timeout) clearTimeout(self.recording_timeout);
 
				btn.removeClass('recording');
				
				self.stopRecordingVoiceClip();
				 
				 
			 });
		
		
		
	},
			
	this._constrMediaRecorder = function(btn,shortcut){
		
		if(self.mediaRecorderConstructed)
			return self.startRecordingEvents(btn,shortcut);
 
 
		var mediaOptions = {
				video: {
				  tag: 'video',
				  type: 'video/webm',
				  ext: 'mp4',
				  gUM: {video: true, audio: true}
				},
				audio: {
				  tag: 'audio',
				  type: 'audio/ogg',
				  ext: self.voice_clip_extension,
				  gUM: {audio: true}
				}
			  };
		  self.mediatp = mediaOptions.audio;//mv.checked ? mediaOptions.video : mediaOptions.audio;

		  navigator.mediaDevices.getUserMedia(self.mediatp.gUM).then(_stream => {
			self.startRecordingEvents(btn,shortcut);
			self.messenger_local_stream = _stream;
			self.mediaRecorderConstructed = true;
			self.voice_clip_media_recorder = new MediaRecorder(_stream);
			self.voice_clip_media_recorder.ondataavailable = e => {
			  self.voice_clip_chunks.push(e.data);
			  if(self.voice_clip_media_recorder.state == 'inactive') self.sendVoiceClip(btn,shortcut);
			};
			
		  }).catch(function(err){
			  
			  return modernPopup(function(){},1,err.toString());
			  });


			   
		  
		  
		
		
	},
	this.startRecordingVoiceClip = function(){
		self.voice_clip_chunks=[];
		self.voice_clip_media_recorder.start();
		
	},
	
	this.stopRecordingVoiceClip = function(){
		self.voice_clip_media_recorder.stop();
		
	},
	this.sendVoiceClip = function(btn,shortcut){
		let blob = new Blob(self.voice_clip_chunks, {type: self.mediatp.type });
		var shortcut_id = shortcut ? ga('.messenger-shortcut-container._focus').attr('id') : '';
		

		var f = new FormData();
 
		f.append('cmd','send-voice-clip');
		f.append('clip', blob);
		f.append('extension', self.voice_clip_extension);
		f.append('room_id',self.room_id);
		f.append('recipient_id',self.curr_recipient);
		ajaxLoading();
        $.ajax({
            type: 'POST',
            url: '/messenger.php',
            data: f,
            processData: false,
            contentType: false
        }).done(function(data) {
 
		   removeAjaxLoad();
		   var d = validateJson(data);
		   
		   if(d.success == 1){
			   
			   if(shortcut) mess_shortcut(shortcut_id).send(false, false, d.text); else self.send(false, self.event, d.text);
			   
			   
			   
			   
		   } else {
			   
			   
			  return displayErr(lang.somethingWrong); 
			   
		   }
        });
		
 
		
		
 
	},
 
	this.createCallingPopup = function(c,uid,call,s){
	 
		var url;
		var disconnect_peer = false;
		switch(c){
			
			
			case 'answer-video':
			url = '/messenger?view_as=json&cmd=call&action=answer&type=video&userid='+uid+'&v='+(new Date().getTime());
			disconnect_peer = false;
			break;
			
			case 'answer-audio':
			url = '/messenger?view_as=json&cmd=call&action=answer&type=audio&userid='+uid+'&v='+(new Date().getTime());
			break;
			
			case 'initiate-video-call':
			url = '/messenger?view_as=json&cmd=call&action=call&type=video&userid='+uid+'&v='+(new Date().getTime());
			break;
			
			
			case 'initiate-audio-call':
			url = '/messenger?view_as=json&cmd=call&action=call&type=audio&userid='+uid+'&v='+(new Date().getTime());
			
			break;
			
			
			
		}
		
		
		
		
		
		
		
					// initiate call
		//	var call = peer.call(self.curr_recipient, self.messenger_local_stream);
			//self.calling_video(call);
			
 
			
			
			
    var w_wd = 780;
    var w_wh = 590;
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var w_width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var w_height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var w_left = ((w_width / 2) - (w_wd / 2)) + dualScreenLeft;
    var w_top = ((w_height / 2) - (w_wh / 2)) + dualScreenTop;
	
    // Puts focus on the self.newCallWindow
    if (window.focus && _U.i in newCallWindow) {

        newCallWindow[_U.i].focus();

		
    } else {
		 
	//	if(disconnect_peer) _peer.disconnect();
        newCallWindow[_U.i] = window.open(
			url,
			'popUpWindow',
			'height='+w_wh+',width='+w_wd+',left='+w_left+',top='+w_top+',resizable=yes,scrollbars=no,toolbar=no,menubar=yes,location=yes,directories=no, status=no'
			);
			 
		if(call)	
		newCallWindow[_U.i].call = call;
		newCallWindow[_U.i].call_user_answered = call_user_answered;
		newCallWindow[_U.i].sio = sio;
		//newCallWindow[_U.i].abc = 'PRIMA';
		//self.newCallWindow[_U.i].socket = sio;
		//self.newCallWindow[_U.i].call_timeout = call_timeout;
		//self.newCallWindow[_U.i].existingCall = existingCall;
 
		
        remainOnSite('You have a calling window', 'CallWindow' + _U.i, function() {
            for (x in newCallWindow) newCallWindow[x].close();
        });
    }


    var call_w_interval = window.setInterval(function() {
        try {  
            if (newCallWindow[_U.i] == null || newCallWindow[_U.i].closed) {
                window.clearInterval(call_w_interval);
                delete newCallWindow[_U.i];
                unbindRemainOnSite('CallWindow' + _U.i);
				if(existingCall) {
					existingCall.close();}
				 
				if(call_user_answered)
					s.emit("call_finished", uid);
				else
					s.emit("call_stopped", uid);
				
				
				existingCall = false;
				//if(disconnect_peer) _peer.reconnect();
				//if(call_timeout)clearTimeout(call_timeout);
            }
        } catch (err) {
            
			return modernPopup(function(){},1,err.toString());
        }
    }, 1000);
			
		
		
		
		
		
		
		
		
		
		
	},
	this.setUpVoiceVideoCallButtons = function(el,evt) {
 		 

		
		// setupt handlers
		// CALLING VIDEO
		ga(document).off('click.call_video').on('click.call_video', '#start-video-chat', function(evt){
			evstop(evt);
 

	 
			self.createCallingPopup('initiate-video-call',self.curr_recipient,_peer,self.socket);
			
			
 
			
		});
		// CALLING AUDIO
		ga(document).off('click.call_audio').on('click.call_audio', '#start-audio-chat', function(evt){
			evstop(evt);
 

			
			self.createCallingPopup('initiate-audio-call',self.curr_recipient,_peer,self.socket);
			
			
 
			
		});
		
		
		
		
	},
	this.hangUpCall = function(el,ev){
		evstop(ev);
		self.existingCall.close();
	},
	this.calling_video = function(v_call){
		
		
		
      // Hang up on an existing call if present
      if (self.existingCall) {
			self.existingCall.close();
      }
      // Wait for stream on the call, then set peer video display
      v_call.on('stream', function(stream){
        $('#their-video').prop('src', URL.createObjectURL(stream));
      });
      // UI stuff
      self.existingCall = v_call;

      v_call.on('close', step2);
      $('#step1, #step2').hide();
      $('#step3').show();
		
		
		
		
	}
	
};