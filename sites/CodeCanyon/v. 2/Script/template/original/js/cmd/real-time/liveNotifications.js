var gwtlog = new gwtlog();
var unread_messages_by_user = {};

function gwtlog() {
	var self = this;
	self.socket_io;
	self.url = '/gwtlog';
	self.time = (new Date()).getTime();
	self.mtime = 60000; // 60 sec
	self.last_c = self.last_c || {};
	self.functions = ['mod_messages', 'mod_messenger_aditional_f', 'mod_notifications', 'mod_online_users', 'mod_guests', 'mod_grades', 'mod_live_map'];
	


	this.startBoot = function(){
		
		
		if(typeof _U == 'undefined' || anonym_content) return false;
		
		
		sio = connectIo();
		self.socket_io = sio;//connectIo();//io.connect(NODE_HOST);
 
		self.socket_io.on('connect', function(){
			
			self.socket_io.emit('connect_user', _U.i);
			
		});
 

		
			for (var i = 0; i < self.functions.length; i++)
				self[self.functions[i]](arguments);
				//self.socket_io.emit('gwtlog', self.functions[i], _U.i);
			
		/*self.socket_io.on('gwtlog', function (data) {
				//console.log(data);
				//socket.emit('my other event', { my: 'data' });
				
			self[data](arguments);
				

				
				
		});*/
			//self.socket_io.emit('connect_user', _U.i);
		
	},
	this.g = function(data) {

	   var send = jAjax(self.url, 'post', data + '&view_as=json&token=' + self.time);

	   return send;

	},
	this.mod_notifications = function(){
		 
		 
		 
	var checkForDropDownNotify = function(){


	var user_notif_st = validateJson(_U.notif_settings);
	if(!ga('.notification_box_flying').length && user_notif_st.important_notif_dropdown == "on"){
	var send = jAjax('/cmd.php','post',{'cmd':'dropdown-notify'});
	send.done(function(d){
		 
		if($.trim(d) != '' && !ga('#new_top_notify_dropdown').length){
			
			var markup = '<section id="new_top_notify_dropdown"><a href="javascript:void(0);" onclick="gwtlog.closeTopNotifDropDown(this,event);" class="al notif-dropdown-close"></a><ul onclick="gwtlog.openTopNotif();">'+d+'</ul></section>';
			
			ga('#notif_flying_box').html(markup);
		} else if($.trim(d) != '' && ga('#new_top_notify_dropdown').length){
			
			ga('#new_top_notify_dropdown ul').html(d);
			
		}
		
		
	});
	}

	};	

	var n_getData = function(){
    var send = self.g('cmd=notifications');

    send.done(function(r) {  
        var d = validateJson(r); 
		
        if (d['response'] == '1' && d['count'] > 0) {

			
			if(d.count !== self.last_c.notif){
			ga('.notif_space').closest('li').addClass('__active');
            ga('.notif_space').html(self.nn(d['count']));
			self.enable_sound();
			checkForDropDownNotify();
			}
			self.last_c.notif = d.count;

        } else {
			ga('.notif_space').closest('li').removeClass('__active');
			ga('.notif_space').empty();
			self.last_c.notif = 0;
		}

         
    });
	
	
	}
 
 
        self.socket_io.on('notifications', function(data,userid){  
		 
			
            n_getData();
			
        });
		
	n_getData();
	},
	this.mod_online_users = function(){
		
 
		
		
	var online_card = '<div class="friends-online" data-uonff="true" id="friend_%uid" data-friend-id="%uid" data-int-on="%int_on" data-onl="%onl">\
        <a href="/user/%uid" title="%uname" rel="tipsy" data-tipsy-orientation="e" onclick="return new_chat_window(this,event);" id="y-%uid"  data-uch=\'{"id":"%uid","fullname":"%uname","photo":"%avatar"}\'>\
		<div class="online_u_cnt">\
		<div class="online_u_avatar">\
		<img src="/getPhoto?p=%avatar&onlinehook=1&sz=small" alt="%uname" />\
		<div class="online_fr_status_avatar"><i class="ic-online"></i></div>\
		</div>\
		<div class="online_u_str ellip">\
			<div class="online_u_name">%uname</div>\
			<div class="online_fr_status"></div>\
		</div>\
		</div>\
		</a>\
    </div>';	


    var friendCont = ga('.online-fr_list #fcards_hide_f_sch');

   var checkFriendLength = function(){
   var uCount = friendCont.children().length;

   if(uCount > online_hook_limit) friendCont.children(':last').remove();
 

   };

    var setUOnOff = function(o,uid,o_ago){
    var friend = friendCont.find('#friend_'+ uid);
	
	
			if(o){
			  
				friend.find('.ic-offline').addClass('ic-online');
				friend.find('.online_fr_status').html('<i class="ic-online"></i><span>'+lang.active_now+'</span>');
				friend.find('.online_fr_status_avatar').html('<i class="ic-online"></i>');

				if(friend.attr('data-uonff')){

					friend.removeClass('_on__highlight').addClass('_on__highlight');
							setTimeout(function(){
										friend.removeClass('_on__highlight');
								},7500);
					}
					
				friend.removeAttr('data-uonff');
				
				} else {
					friend.attr('data-uonff','true').find('.ic-online').addClass('ic-offline');
					friend.find('.online_fr_status').html('<span>'+o_ago+'</span>');
					friend.find('.online_fr_status_avatar').html('<div class="online_timestamp_str">'+o_ago+'</div>');
				}

			checkFriendLength();

	}
		
		
    var onOffU = function(uid, Uint, o, o_ago, callback) {


            if (callback) {
                callback(uid);
            }

			setUOnOff(o,uid,o_ago);

		 

            friendCont.find('#friend_' + uid).attr('data-int-on', Uint);


	}

	
	var u_getData = function(){
 
			var send = self.g('cmd=online&contacts='+JSON.stringify(my_contacts));

			send.done(function(r) {


				var r = validateJson(r);

				if(r['response'] == '1') {
					var uData = validateJson(r['data']);
 
 
			 
					friendCont.find('.ic-online').removeClass('ic-online').addClass('ic-offline');
					for(var i = 0; i < uData.length; i++) {

					
					// for friends
					if(uData[i].is_friend == 1){
						
						if(!friendCont.find('[data-friend-id="' + uData[i].id + '"]').length) {
							friendCont.prepend(online_card.replace(/%uid/g,uData[i].id).replace(/%onl/g,uData[i].online).replace(/%avatar/g,uData[i].photo).replace(/%uname/g,uData[i].fullname).replace(/%int_on/g,uData[i].online_int));
							setUOnOff(1, uData[i].id);
							up_href();
							
							onOffU(uData[i].id, uData[i].online_int, uData[i].online, uData[i].online_ago);
							ga('.empty_online_hook').remove();
						} else {

							onOffU(uData[i].id, uData[i].online_int, uData[i].online, uData[i].online_ago);
						}
						
					}
						// for contacts
						// assign online status for all contacts
						var global_ic_class = ga('.global_user_online_'+uData[i].id);
						if(uData[i].online){
							
							global_ic_class.each(function(){
								
								
								if(ga(this).hasClass('only_ic')) 
									ga(this).html('<i class="ic-online"></i>'); 
								else 
									ga(this).html('<span class="active_user_global"><i class="ic-online"></i><span class="active_user_global_txt">'+lang.active_now+'</span></span>');
								
								
							});
							

						} else {
							
							global_ic_class.each(function(){
								
								
								if(ga(this).hasClass('only_ic')) 
									ga(this).empty(); 
								else 
									ga(this).html('<span>'+uData[i].online_ago+'</span>');
								
								
							});
							
					
							
						}
					}

					if(ga('#fcards_hide_f_sch').children().length) {
						tinysort(ga('.friends-online'), {
							data: 'int-on',
							order: 'desc',
							ignoreDashes: true
						});
					}
					
 
					
					

					

				}
				
					var t = self.stitime()/2;
				 	setTimeout(u_getData, t);
			 
					
			});

	}
	
	
	u_getData();
		
	},
	this.mod_guests = function(){
	

	var g_getData = function(){
    var send = self.g('cmd=guests');

    send.done(function(d) {

        var r = validateJson(d);


        if (r['response'] == 1 && r['count'] > 0) {
	
			if( r.count !== self.last_c.guests )
            ga('.g_notif_space').html(self.b(r['count']));
			self.last_c.guests = r.count;
        } else {
			ga('.g_notif_space').empty();
			self.last_c.guests = 0;
		}

 
    });
	};
	
	self.socket_io.on('guests_notif', function(data,userid){  
		 
			
            g_getData();
			
	});
	g_getData();
	},
	this.mod_grades = function(){
		
	var gr_getData = function(){
    var send = self.g('cmd=grades');

    send.done(function(r) {
 
        var d = validateJson(r);


        if (d['response'] == '1' && d['count'] > 0) {

			
			if(d.count !== self.last_c.grades)
            ga('.gr_notif_space').html(self.b(d['count']));
		
			self.last_c.grades = d.count;

        } else {
			ga('.gr_notif_space').empty();
			self.last_c.grades = 0;
		}

         
    });
	}
	self.socket_io.on('grades_notif', function(data,userid){  
		 
			
            gr_getData();
			
	});
	gr_getData();
	},
	this.mod_live_map = function(){
		
		
	},
	this.updateCountMessages = function(count,just_active){
	
		if(just_active) return ga('.messenger_space').closest('li').addClass('__active');
		
		var current_bubble_count = parseInt(ga('.messenger_space').find('.lnavMenuCount_redesign').text());
		
		if(current_bubble_count != count){
			
			if(count > 0)
			ga('.messenger_space').closest('li').addClass('__active');
		else
			ga('.messenger_space').closest('li').removeClass('__active');
		
			ga('.messenger_space').html(self.nn( count ));
	
			self.last_c.messages = count;
		}
	
	if( parseInt(ga('.messenger_space').find('.lnavMenuCount_redesign').text()) <= 0)
		ga('.messenger_space').empty();
		
	},
	this.mod_messenger_aditional_f = function(){
		
		var typing_markup = '<div class="typing"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
		
		
		// messenger notifications
		self.socket_io.on('messenger_notification', function(w,room_id,uid,categ) {  
			
			
				if(ga('#room_'+room_id).length){
				
				var shortcut_id = ga('.messenger-shortcut-container #room_'+room_id).length ? ga('.messenger-shortcut-container #room_'+room_id).closest('section').attr('id') : '----------';
				var is_messenger = ga('.pmessenger #room_'+room_id).closest('.pmessenger');
				var u_fullname = ga('.ufullname'+room_id).val();
			 
				
				switch(categ){
					
					case 'nicknames':
								var d_w = w.split('*');
								var new_nickname = d_w[2];
								
								 
								
								if($.trim(new_nickname)){
									is_messenger.find('.xweeWrt').text(new_nickname);
									ga('#'+shortcut_id).find('.mshortcut-u-name-str>a').text(new_nickname);
								}else{
									is_messenger.find('.xweeWrt').text(u_fullname);
									ga('#'+shortcut_id).find('.mshortcut-u-name-str>a').text(u_fullname);
								}
								
								if(is_messenger)
									messenger.sWriteNotification(w,categ);
							
								if(shortcut_id)
									mess_shortcut('mshortcut-'+(room_id - uid)).sWriteNotification(w,categ);
								
								
								messenger.turnOnSound();
					break;
					
					case 'colors':
					//self.sWriteNotification(w,categ);
					
								if(is_messenger)
									messenger.sWriteNotification(w,categ);
							
								if(shortcut_id)
									mess_shortcut('mshortcut-'+(room_id - uid)).sWriteNotification(w,categ);
								
								messenger.turnOnSound();
					break;
					
					
					
				}
	
	
				}
				
			
			});
		
		// seen
		self.socket_io.on('seen', function(msg_id,uid) {  
				var seen_markup = '<div title="'+lang.mess_msg_seen+'" rel="tipsy" id="mess_sent_status" class="messenger_sent_Status mess-message-seen"><i class="glyphicon glyphicon-eye-open messenger-sent-ic" style="color:%color;" rel="gliph-mess-color"></i></div>';
				var color = chat_default_color;

				
				var shortcut_cnt = ga(".messenger-shortcut-container").find('#msg_'+msg_id).closest('.messenger-shortcut-container');
				var shortcut_id = shortcut_cnt.attr('id');
				
 
				// for chat
				if(shortcut_cnt.length){
					color = ga('#'+shortcut_id).find('#chat-curr-color').val();
					ga('#msg_'+msg_id).find('#mess_sent_status').replaceWith(seen_markup.replace(/%color/g,color));
				} 

				if(ga('.pmessenger').length) {
					color = ga('#mess-curr-color').val();
					ga('.pmessenger #msg_'+msg_id).find('#mess_sent_status').replaceWith(seen_markup.replace(/%color/g,color));
				}
				
				
				
				
				
				
				

				
		});
		
		
		self.socket_io.on('typing', function(typing,room_id,uid) {  
 
					var room_messages = ga('.pmessenger #room_'+room_id);
					var shortcut_room = ga(".messenger-shortcut#room_"+room_id).closest('section');
					 
					// for messenger
					if(room_messages.length){
						
 
						if (typing == 'yes' && room_messages.length) {
							 
							var messages_col = room_messages.find('#messages-tick').find('.nano-content');
							var typing_block = messages_col.find('.typing');
							if(!typing_block.length){
							messages_col.append(typing_markup);
							
							messenger.scrollChat(1);
							}
							
						} else {
							room_messages.find('.typing').remove();
							
						}
						
					}
					
					
					// for chat
					if(shortcut_room.length){
					
					var shortcut_id = shortcut_room.attr('id');
 
						
						
						if (typing == 'yes' && shortcut_room.length) {
 
							var messages_col = shortcut_room.find('.nano-content');
							var typing_block = messages_col.find('.typing');
							if(!typing_block.length){
							messages_col.append(typing_markup);
							
							messenger_shortcut.scrollChat(shortcut_id,1);
							}
							
						} else {
							shortcut_room.find('.typing').remove();
							
						}
					}
		});
 
	},
	this.mod_messages = function(){
	
	var _this = this;
	
 
 
 
 
	var m_getData = function(){
		
		
		
    var send = self.g('cmd=messages');

    send.done(function(r) {  
 
        var d = validateJson(r);
		var msgs_count = 0;
		unread_messages_by_user = d.user_count;
        if (d['response'] == '1' && d['count'] > 0) {
 



			// append message in active chat

			// messenger
		//	if(ga('.pmessenger').length){
				

				 d.count = messenger.appendNewMessages(d.messages,d.user,d.count);
				
			//}  
			
			if(d.count > 0  && d.count != self.last_c.messages)
				self.updateCountMessages(d.count);
			else if (d.count > 0  && d.count == self.last_c.messages)
				self.updateCountMessages(d.count,1);
			

			
			
				self.last_c.messages = d.count;
				
				
        } else {

			ga('.messenger_space').empty();
			self.last_c.messages = 0;

		}

         
    });
		
		
		
		
	};
	
	self.socket_io.on('messages_notif', function(userid,aditional_data){  
		  

			if(aditional_data == false)
			{

            m_getData();
			}
			
			
	});
 
		m_getData();
	},
	this.nn = function(c){
	c = c > 99 ? '99+' : c;
	return '<div class="lnavMenuCount_redesign zoomIn animated">' + c + '</div>';
	},
	this.enable_sound = function(){
			var notif_sound = "/cmd/sounds/pop_cork";
			var user_notif_st = validateJson(_U.notif_settings);
			 
			  if(user_notif_st.notification_sound == "on") {
					ga('#sound_notif_new_ntf').remove();

					ga('<audio id="sound_notif_new_ntf" autoplay="true" style="display:none;">\
						<source src="' + notif_sound + '.ogg" type="audio/ogg">\
						<source src="' + notif_sound + '.mp3" type="audio/mpeg">\
						</audio>').appendTo('body');
					setTimeout(function() {
						ga('#sound_notif_new_ntf').remove();

					}, 1500);
			   
			  }
	},
	
	self.closeTopNotifDropDown = function(el,ev){
	ev.preventDefault();
	ga(el).closest('#new_top_notify_dropdown').remove();
	
},	



self.openTopNotif = function (){
	
	ga('#new_top_notify_dropdown').remove();
	ga('.top_notifa').trigger('click');
},
/** bubble **/
this.b = function(c) {

    var n_bubble = '<div class="lnavMenuCount zoomIn animated">+' + c + '</div>';
 

    return n_bubble;
},
/** generate timer **/
this.stitime = function() {
    var min = 15000,
        max = self.mtime;
    return Math.floor(Math.random() * (max - min + 1) + min);
},
this.getCounts = function(){
	return self.last_c;
	
}
	
	
	
	
}

 
ga(document).ready(gwtlog.startBoot());
