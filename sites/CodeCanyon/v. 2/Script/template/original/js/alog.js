var mtime = 30000; // 30 sec
var url = '/gwtlog';
var nt = (new Date()).getTime();
var functions = ['getLiveNotif', 'uOn', 'gGuests', 'getLiveGr', 'mapNotif'];
var last_c = [];


/* checking function */
function g(data) {

   var send = jAjax(url, 'post', data + '&view_as=json&token=' + nt);

   return send;

}

/** generate timer **/
function stitime() {
    var min = 1,
        max = 9;
    return mtime + Math.floor(Math.random() * (max - min + 1)) + min;
}


// update online status
function uOn() {
 
		

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
			  
				friend.find('.ic-offline').removeClass('ic-offline').addClass('ic-online');
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
					friend.attr('data-uonff','true').find('.ic-online').removeClass('ic-online').addClass('ic-offline');
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
        // alert when a new user is online
    var notifNewOnUs = function(i) {
        var $body = ga('body');
/*
        var new_us = $('<section class="new_fr_on">' +
            '<div class="us_n_details">' +
            '<A href="/profile?q=' + i + '">' +
            '<div class="us_new_photo">' +
            '<img src="/getPhoto?p=' + p + '&sz=small&token=' + nt + '" />' +
            '</div>' +
            '<div class="n_us_fname">' + n + '</div></a></div>' +
            '</section>');
*/
       // $body.append(new_us);

     var user = friendCont.find('[data-friend-id="'+i+'"]');
  /*  user.addClass('__right_now');
    user.focus();
setTimeout(function(){
    user.removeClass('__right_now');
},500);*/


    }

  
    var send = g('cmd=online');

    send.done(function(r) {

 
       r = validateJson(r);


				if(r['response'] == '1') {
					var uData = validateJson(r['data']);
 
 
			 
					friendCont.find('.ic-online').removeClass('ic-online').addClass('ic-offline');
					for(var i = 0; i < uData.length; i++) {

					
					// for friends
					if(uData[i].is_friend == 1){
						
						if(!friendCont.find('[data-friend-id="' + uData[i].id + '"]').length) {
							friendCont.prepend(online_card.replace(/%uid/g,uData[i].id).replace(/%onl/g,uData[i].online).replace(/%avatar/g,uData[i].photo).replace(/%uname/g,uData[i].fullname).replace(/%int_on/g,uData[i].online_int));
							//setUOnOff(1, uData[i].id);
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

        setTimeout(uOn, stitime()/3);
    });

}

/** bubble **/
function b(c) {

    var n_bubble = '<div class="lnavMenuCount zoomIn animated">+' + c + '</div>';
	
	
	/* '<div class="toolbar_nav_notif __header">' +
        '<div id="counter_ToolbarDiscussions" class="notifications zoomIn animated">' +
        '<div class="counterText">' + c + '</div>' +
        '</div></div>';*/

    return n_bubble;
}
function nn(c){
	
	c = c > 99 ? '99+' : c;
	return '<div class="lnavMenuCount_redesign zoomIn animated">' + c + '</div>';
}

// sound
function notifSound() {

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
}
function closeTopNotifDropDown(el,ev){
	ev.preventDefault();
	ga(el).closest('#new_top_notify_dropdown').remove();
	
}

function openTopNotif(){
	
	ga('#new_top_notify_dropdown').remove();
	ga('.top_notifa').trigger('click');
}

// dropdown notifications
function checkForDropDownNotify(){
	var user_notif_st = validateJson(_U.notif_settings);
	if(!ga('.notification_box_flying').length && user_notif_st.important_notif_dropdown == "on"){
	var send = jAjax('/cmd.php','post',{'cmd':'dropdown-notify'});
	send.done(function(d){
		 
		if($.trim(d) != '' && !ga('#new_top_notify_dropdown').length){
			
			var markup = '<section id="new_top_notify_dropdown"><a href="javascript:void(0);" onclick="closeTopNotifDropDown(this,event);" class="al notif-dropdown-close"></a><ul onclick="openTopNotif();">'+d+'</ul></section>';
			
			ga('#notif_flying_box').html(markup);
		} else if($.trim(d) != '' && ga('#new_top_notify_dropdown').length){
			
			ga('#new_top_notify_dropdown ul').html(d);
			
		}
		
		
	});
	}
}
/* check for notifications */
function getLiveNotif() {

    var send = g('cmd=notifications');

    send.done(function(r) {

        var d = validateJson(r);

        if (d['response'] == '1' && d['count'] > 0) {

			
			if(d.count !== last_c.notif){
			ga('.notif_space').closest('li').addClass('on');
            ga('.notif_space').html(nn(d['count']));
			notifSound();
			checkForDropDownNotify();
			}
			last_c.notif = d.count;

        } else {
			ga('.notif_space').closest('li').removeClass('on');
			ga('.notif_space').empty();
			last_c.notif = 0;
		}

        setTimeout(getLiveNotif, stitime());
    });

}
/* check for grades */
function getLiveGr() {

    var send = g('cmd=grades');

    send.done(function(r) {

        var d = validateJson(r);


        if (d['response'] == '1' && d['count'] > 0) {

			
			if(d.count !== last_c.grades)
            ga('.gr_notif_space').html(b(d['count']));
		
			last_c.grades = d.count;

        } else {
			ga('.gr_notif_space').empty();
		}

        setTimeout(getLiveGr, stitime());
    });

}

// get notification from map
function mapNotif(){
	
    var send = g('cmd=mapnotif');

    send.done(function(r) {

		var d = validateJson(r);
		
        if (d['response'] == '1' && d['count'] > 0) {

			
			if(d.count !== last_c.mapnotif){
			ga('.map-notif_space').closest('li').addClass('on');
            ga('.map-notif_space').html(nn(d['count']));
			//ga('.map-notif_space').closest('li').find('a').removeAttr('href').removeAttr('hrefattr');

			//notifSound();
			//checkForDropDownNotify();
			}
			last_c.mapnotif = d.count;

        } else {
			ga('.map-notif_space').closest('li').removeClass('on');
			ga('.map-notif_space').empty();

			last_c.mapnotif = 0;
			
			//ga('.map-notif_space').closest('li').find('a').attr({'href':'/users-on-map','hrefattr':'true'});
			
			 //up_href();
		}

        setTimeout(mapNotif, stitime());
		
		
	});
	
}
// get guests notif
function gGuests(){

    var send = g('cmd=guests');

    send.done(function(d) {

        var r = validateJson(d);


        if (r['response'] == 1 && r['count'] > 0) {
	
			if( r.count !== last_c.guests )
            ga('.g_notif_space').html(b(r['count']));
			last_c.guests = r.count;
        } else {
			ga('.g_notif_space').empty();
		}

        setTimeout(gGuests, stitime());
    });


}

function startBoot() {
	if(typeof _U == 'undefined' || anonym_content) return false;
    for (var i = 0; i < functions.length; i++)
        window[functions[i]](arguments);

}
ga(document).ready(startBoot);


