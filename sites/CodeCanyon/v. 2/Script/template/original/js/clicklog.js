var _clog_timeouts = _clog_timeouts || {likesPhDrw:{}};
var video_popup_retine_href;

// like click
function likeClick(el,ev){
	ev.preventDefault();
	var $el = ga(el);

            var s_data = {};
            var $this = $el;
            var data = $this.data('log-click');
			var callback = $this.data('callback');
            var pfile = '/logclick';
            var fname = '';
            switch (data.type) {

            case 'like':

                s_data['cmd'] = data.type;
                s_data['type'] = data.type;
                s_data['itemid'] = data.itemid;
                s_data['item'] = data.item;

                fname = 'succLike';

                break;


            }

            var send = jAjax(pfile, 'post', s_data);

            send.done(function (resp) { 
			if(resp == '2') return;
			
                var dt = validateJson(resp);

                if (dt.succ == '0') displayErr(lang.error_send_log_click);
                else{
                    if(!callback)eval(fname)(s_data, dt, $this);
					else eval(callback)(s_data, dt, $this);
				}

            });
}

// bind onclick event to dynamically created HTML elements in DOM
function liveHandlerCl() {

    ga(document)
        .off('click.lik')
        .on("click.lik", "[data-log-click]", function (e) {
            e.preventDefault();
			e.stopPropagation();
            var s_data = {};
            var $this = ga(this);
            var data = $this.data('log-click');
			var callback = $this.data('callback');
            var pfile = '/logclick';
            var fname = '';
            switch (data.type) {

            case 'like':

                s_data['cmd'] = data.type;
                s_data['type'] = data.type;
                s_data['itemid'] = data.itemid;
                s_data['item'] = data.item;
				s_data['clubid'] = typeof data.community != undefined ? escape(data.community) : 0;

				 
                fname = 'succLike';

                break;


            }
	

            var send = jAjax(pfile, 'post', s_data);

            send.done(function (resp) {  
			
				if(resp == '2') return;
                var dt = validateJson(resp);

                if (dt.succ == '0') displayErr(lang.error_send_log_click);
                else{
					
                    if(!callback)eval(fname)(s_data, dt, $this);
					else eval(callback)(s_data, dt, $this);
				}

            });

        });



    // hide from news feed
    ga(document)
        .on('click', '.al.feed_close:not(._nofeed)', function (e) {
           // e.preventDefault();
			//e.stopImmediatePropagation();
			localStorage.setItem('feed_waiting_anim','1');
            var $this = ga(this);
            var feed_id = escape($this.data('gth'));
            var send = jAjax('/profile', 'post', 'cmd=hide_from_feed&i=' + feed_id + '&type=pos');
            send.done(function (data) {

                if (data == '0') {
                    return displayErr(lang.error_to_hide_feed);

                } else {
                    var tf = $this.closest('.feed');
                    tf.slideUp(333, function () {
                        tf.remove();
						localStorage.removeItem("feed_waiting_anim");
                    });
                }


            });

        });
		
		
		// search input (in search page)
		ga(document).off('keyup.tSearch').on('keyup.tSearch', '#query_usersearch', function(e){
			
			var _$t = ga(this), _s_key = $.trim(_$t.val()), _s_submit_ic = _$t.closest('.search-wrapper').find('#search_ic_submit');
			
			if(!_s_key) return _$t.focus();
			
			_s_submit_ic.removeAttr('href').attr('href','/search?key='+_s_key);
			if(_s_key && e.keyCode == 13){
				
				_s_submit_ic.addClass('__simulate_active').trigger('click');
				setTimeout(function(){_s_submit_ic.removeClass('__simulate_active')}, 500);
				
			}
			
		});

    /*
    	// show shortcut menu
            $(document).on('mouseover mouseenter', '[data-show-shortcut="true"]', function(e){
    	sh_active_uid = $(this).find('[data-module="ShortcutMenu"]').data('uid');
    	///gShortcutMenu(e,$(this));
    	});

        // Use the option closeOnMouseleave to keep it open
        $('[data-show-shortcut="true"]').jBox('Tooltip', {
            content: 'hahahahhahahahah haahaha hh a',
    	delayOpen: parseInt($(this).find('[data-module="ShortcutMenu"]').data('show')),
            delayClose: parseInt($(this).find('[data-module="ShortcutMenu"]').data('hide')),
            closeOnMouseleave: 1,//constructOnInit: 1,onCloseComplete:function(){$(this).remove(); }
        });*/

	var removeShortcutMenuFromDom = function(e,el){
		
		e.preventDefault();
		e.stopPropagation();
		//var $this = $(this);
		//var _that = ga(el);
		//var $this = _that.find('.hookDataShortcut[data-shortcutmenudata]');
		//var shortcutID = $this.attr('id').split('_')[2];

		var $b = ga('body');
		clearTimeout(_clog_timeouts.hideShortCutMenu);
	    clearTimeout(_clog_timeouts.showShortCutMenu);
		_clog_timeouts.hideShortCutMenu = setTimeout(function(){
		//if($b.find('.gwt-shortcutMenu').length)
		$b.find('.hook_Block_ShortcutMenu').empty();		
		},700);
		
	};

	// shorctu menu
	ga(document).off('mouseover.shortcutmenu').on('mouseover.shortcutmenu', '.kn_shortcutmenu', function(e){
		
		
		if(isBodyRestive())return;
		
		//e.preventDefault();
		e.stopPropagation();
		var _that = ga(this);
		var $this = _that.find('.hookDataShortcut[data-shortcutmenudata]');
		var shortcutID = $this.attr('id').split('_')[2];
		var shortcutData = $this.data('shortcutmenudata');
		
		var pos = $.extend({}, _that.offset(), {
                    width: _that[0].offsetWidth,
                    height: _that[0].offsetHeight
                });
		var actualWidth = 144;
            //actualHeight = 1525;
			
		var _pos_top = pos.top + pos.height,
			_pos_left = pos.left + pos.width / 2;- actualWidth / 2;
 
		
		
		
		var markup = gShortcutMenu(shortcutData);
		var $b = ga('body');
		var $shortcut_space = $b.find('.hook_Block_ShortcutMenu');
		$b.find('.gwt-shortcutMenu').hide();
		$shortcut_space.empty();
		clearTimeout(_clog_timeouts.hideShortCutMenu);
		clearTimeout(_clog_timeouts.showShortCutMenu);
		_clog_timeouts.showShortCutMenu = setTimeout(function(){
		//if(!$this.find('.gwt-shortcutMenu#'+shortcutID).length)
		markup = markup;
 
			$shortcut_space.html(markup
								.replace(/%css_position%/g,'top:'+_pos_top+'px;bottom:auto;left:'+_pos_left+'px;')
								.replace(/%sid%/g,shortcutID)
								.replace(/%display_photo%/g,shortcutData.uphoto > 0 ? '' : '__none')
								.replace(/%uid%/g,shortcutData.uid)
								.replace(/%uname%/g,shortcutData.uname)
								.replace(/%photoid%/g,shortcutData.uphoto)
								.replace(/%ugender%/g,shortcutData.ugender)
								.replace(/%bookmarkid%/g,shortcutData.bookmarkid)
								.replace(/%product_author_id%/g,shortcutData.product_author_id)
								.replace(/%product_author_name%/g,shortcutData.product_author_name)
								.replace(/%product_author_avatar%/g,shortcutData.product_author_avatar)
								.replace(/%photoid_b%/g,base64_encode(shortcutData.uphoto)) // base64 encode photo id
								.replace(/%photoid_k%/g,o_krypt(shortcutData.uphoto)) // our enkrypter encode photo id
								
								);
 				
			var $shortcut_in_dom = $shortcut_space.find('.gwt-shortcutMenu');		

		$shortcut_in_dom.css('left',(pos.left + pos.width / 2 - $shortcut_in_dom.outerWidth() / 2)+'px');		

			
			if( !isElementInViewport( $shortcut_in_dom ) ) $shortcut_in_dom.css('top', pos.top - $shortcut_in_dom[0].offsetHeight).find('.gwt-shortcutMenu-arrow_w').addClass('gwt-shortcutMenu-arrow__bottom');
		///else $this.find('.gwt-shortcutMenu#'+shortcutID).show();
		},500);
		
	}).off('mouseout.shortcutmenu').on('mouseout.shortcutmenu', '.kn_shortcutmenu', function(e){
		removeShortcutMenuFromDom(e,this);
	});
		
	ga(document).off('mouseover.onshortcutmenu').on('mouseover.onshortcutmenu', '.gwt-shortcutMenu__show', function(e){
		e.preventDefault();e.stopImmediatePropagation();
		clearTimeout(_clog_timeouts.hideShortCutMenu);
		
	}).off('mouseout.shortcutmenuOverOn').on('mouseout.shortcutmenuOverOn', '.gwt-shortcutMenu__show', function(e){
		removeShortcutMenuFromDom(e,this);
	});

	/*
	// tipsy title notif
	ga(document).off('mouseover.tps').on('mouseover.tps', '[rel=tipsy]',function(e){
runTipsy();
	});*/
	
	// go up hover
	ga(document).off('mouseover.goup').on('mouseover.goup', '#stl_left', function(e){
		
		ga(this).addClass('over over_fast');
		
	});
	ga(document).off('mouseout.goup').on('mouseout.goup', '#stl_left', function(e){
		
		ga(this).removeClass('over over_fast');
		
	});
	
	// go up click
    ga(document)
        .on('click.goupglobal', '#stl_left:not(.back)', function (e) {
            
		ga(window).scrollTop(0);
        });
	
	
	// clear search field in chat
	ga(document).off('click.clear_search_chat').on('click.clear_search_chat', '#clear_chat_search', function(e){
			e.preventDefault();
			ga("#online_field_search").val('');
			ga('#s_result').empty();
			ga('#fcards_hide_f_sch').show();
			ga('#clear_chat_search').hide();
			ga('#gliphy_search_minimize').show();
	});
	
	// search users in chat
	ga(document).off('keyup.search_chat').on('keyup.search_chat', '#online_field_search', function(e){
			e.preventDefault();
	
			
			var $this = ga(this), _s_key = $.trim($this.val()), minimize_ic = ga('#gliphy_search_minimize'), _clear = ga('#clear_chat_search'), _s_ic = ga('#gliphy_search_chat_ic'), _l_ic = ga('#gliphy_loading_chat_ic'), _fr_list = ga('.online-fr_list');
				
			if(!_s_key) return $this.focus();
			else if(_s_key && e.keyCode == 13){
				_s_ic.addClass('__none');
				_l_ic.show();
				minimize_ic.hide();
				_fr_list.addClass('_op');
				var send = jAjax('/cmd.php', 'post', { "cmd" : "searchChatFriends", "key" : _s_key });
				send.done(function(data){
				_l_ic.hide();
				_s_ic.removeClass('__none');
				_fr_list.removeClass('_op');
				_clear.show();
					var _d = validateJson(data);
					if(_d.length){
						
					var _d_html = '';
	
					for(var i=0;i<_d.length;i++){
						var _rfr = _d[i];
						

						
						
						/*
					_d_html +=  '<div class="online-fr_i soh-s" data-friend-id="'+_rfr.fid+'" data-int-on="'+_rfr.online_int+'" data-onl="0">\
								 <a href="/user/'+_rfr.fid+'" class="online-fr_link" hrefattr="true"></a><div class="ucard-v __xxs _onlinefriends __h">\
								 <div class="section"><div class="photo"><img class="photo_img" src="/getPhoto?p='+_rfr.fphoto+'&onlinehook=1&sz=small&g='+_rfr.fgender+'" alt="'+_rfr.fullname+'" width="32" height="32"></div></div>\
								 <div class="caption"><div class="online-fr_name ellip">'+_rfr.fullname+'</div>\
								 <div class="online_fr_status"> <span>'+_rfr.fonline+'</span></div><div class="right_media_u_on_mask foh-s">\
								 <div class="right_md_onl_mask"></div><a title="Send a message" href="javascript:;" onclick="return new_chat_window(this,event);" id="y-'+_rfr.fid+'" data-uch=\'{"id":"'+_rfr.fid+'","fullname":"'+_rfr.fullname+'","photo":"'+_rfr.fphoto+'"}\' class="online-fr_msg">\
								 </a></div></div></div></div>';	*/
								 
					_d_html += '<div class="friends-online" id="friend_'+_rfr.fid+'" data-friend-id="'+_rfr.fid+'" data-int-on="'+_rfr.online_int+'" data-onl="0">\
								<a href="/user/'+_rfr.fid+'" title="'+_rfr.fullname+'" rel="tipsy" data-tipsy-orientation="e" onclick="return new_chat_window(this,event);" id="y-'+_rfr.fid+'" data-uch=\'{"id":"'+_rfr.fid+'","fullname":"'+_rfr.fullname+'","photo":"'+_rfr.fphoto+'"}\'>\
								<div class="online_u_cnt">\
								<div class="online_u_avatar">\
								<img src="/getPhoto?p='+_rfr.fphoto+'&onlinehook=1&sz=small&g='+_rfr.fgender+'" alt="'+_rfr.fullname+'" />\
								</div>\
								<div class="online_u_str ellip">\
									<div class="online_u_name">'+_rfr.fullname+'</div>\
									<div class="online_fr_status"> <span>'+_rfr.fonline+'</span> </div>\
								</div>\
								</div>\
								</a>\
							</div>';			 
						
					}
						
					ga('#fcards_hide_f_sch').hide();ga('#s_result').html(_d_html);	
					nanoScrollStart();
					} else kn_liveNotif(lang.Not_found,'info',3500,lang.No_results_for +'&nbsp;"'+_s_key+'"');
					
					
				});
				
			}
			
	});
    
	// show embera links
    ga(document)
        .off('click.showEmbera')
        .on('click.showEmbera', '[rel="showembera"]', function (e) {
			var id = ga(this).attr('id').split('-')[1];
			ga('#'+id).show();
			ga('#clickhide-'+id).removeClass('__none');
			ga(this).addClass('__none');
			
	});
	
	// hide embera links
    ga(document)
        .off('click.hideEmbera')
        .on('click.hideEmbera', '[rel="hideembera"]', function (e) {
			
			var id = ga(this).attr('id').split('-')[1];
			
			ga('#'+id).hide();
			ga('#clickshow-'+id).removeClass('__none');
			ga(this).addClass('__none');
			
    });
    // load more data
    ga(document)
        .off('click.lmore')
        .on('click.lmore', '.loader-controls:not(.private)', function (e) {
            e.preventDefault();
            var $this = ga(this);
			
			var removeLoadMBTN = function(elm){
				
				
				elm.replaceWith('<div class="feed_loaded_complete"></div>');
				
			}
			
			if($this.hasClass('_incarcare')) return;
						
						
            var sendData = $this.data('loadd');
            var appTo = sendData.appto;
            var newobj = {
                  "cmd": sendData.cmd
                , "i": sendData.i
                , "p": ++sendData.p
				, "c": typeof sendData.c != undefined ? sendData.c : ''
			    , "video_album": $this.hasClass('load-user-album-videos') ? 1 : 0
            }; 

      //     if(sendData.cmd === 'friends_more') return;

			$this.addClass('_incarcare').attr('data-ltext',$this.text()).html('<div class="load_more_data_waiting"></div>');
			
            var send = jAjax(_st.load_m_file, 'post', $.param(sendData));
            send.done(function (result) { 
			
			
 
			
			
				$this.html($this.data('ltext'));
                $this.removeClass('_incarcare').removeData('ltext').removeAttr('data-ltext').attr('data-loadd', JSON.stringify(newobj));

                var r = validateJson(result);
				
				switch(sendData.cmd){
					
					// load more friends in friends page
					case 'friends_more':
					lMoreFriends(r, appTo, sendData.i, $this);
					break;
					
					// load more grades in mark popup
					case 'more_grades': 
					if(r.content == 'NULL') {return removeLoadMBTN($this);}
					ga(appTo).append(r.content);
					break;
					
					// load more photos in profile page for (all photos)
					case 'profileWallPhotosMore':
					if(r.content == 'NULL' || (typeof r.hide_btn != undefined && r.hide_btn == true && r.content == 'NULL')) {return removeLoadMBTN($this);}
					profilePhotoWallAppendNewCont(r,ga(appTo));
					
					break;
					
					// load more photos in profile page for personal photos album or photo album
					case 'profilePersonalPhotosMore':
					case 'profileAlbumPhotosMore':
					if(r.content == 'NULL' || (typeof r.hide_btn != undefined && r.hide_btn == true && r.content == 'NULL')) {return removeLoadMBTN($this);}
					ga(appTo).append(r.content);
					
					break;
					case 'market_search_product_more':
					case 'market_browse_product_more':
					case 'market_my_product_more':
					if(r.content == 'NULL' || (typeof r.hide_btn != undefined && r.hide_btn == true && r.content == 'NULL')) {return removeLoadMBTN($this);}
					ga(appTo).append(r.content);
					break;
				}





            });
        });


	//rating 
	        ga(document).off('mouseover.rateStars').on('mouseover.rateStars', '.rate-btn', function(){
                ga('.rate-btn').removeClass('rate-btn-hover');
                var therate = $(this).attr('id');
                for (var i = therate; i >= 0; i--) {
                    ga('.rate-btn-'+i).addClass('rate-btn-hover');
                };
		ga(this).off('click.rateStars').on('click.rateStars', function(e){


		e.preventDefault();
        	var therate = $(this).attr('id');

		
		sendRate(this,e,therate);

		});

            }).off('mouseout.rate').on('mouseout.rate', '.rate-btn', function(){
		if(!ga(this).data('init-stars'))
		ga('.rate-btn').removeClass('rate-btn-hover');
	   });
	/*
		.off('click.rateStars').on('click.rateStars', '.rate-btn', function(e){alert('olyona');
		e.preventDefault();
                var therate = $(this).attr('id');
                var dataRate = $(this).closest('#phlayer_rating_stars').data('rateit-u')+'&rate='+therate;//'act=rate&post_id=<?php echo $post_id; ?>&rate='+therate; //
                $('.rate-btn').removeClass('rate-btn-active');
                for (var i = therate; i >= 0; i--) {
                    $('.rate-btn-'+i).addClass('rate-btn-active');
                };
		var send_rate = jAjax('/profile', 'post', dataRate);
		send_rate.done(function(s){
		alert('success -- '+s);
		});
                
            });*/
	
	
	// stop propagation for local opened comments, cause if not stop it then photo layer open automatically
	ga(document).off('click.localPhotoCommProp').on('click.localPhotoCommProp', '.sect_comment_static', function(e){
		e.preventDefault();e.stopImmediatePropagation();		
	});
	
	// remove image-hover class on local comments is opened
	ga(document).off('mouseover.localcommentsPh').on('mouseover.localcommentsPh', '.sect_comment_static', function(e){
		
		ga(this).parent().removeClass('image-hover');
		
	}).off('mouseout.localcommentsPh').on('mouseout.localcommentsPh', '.sect_comment_static', function(e){
		
				ga(this).parent().addClass('image-hover');
				ga('.local_minimum_comments').removeClass('__visible');
	});
	



	// video click play
	ga(document).off('click.playVideo').on('click.playVideo', '[data-video-meta]', function(e){
		e.preventDefault();
		e.stopPropagation();
		var $this = ga(this);
		 
		playThisVideo($this,$this.data('video-meta'));
		
		
	});
	
	
	// jbox popup with all people who liked respective photo
	ga(document).off('click.photoLikesAllPeople').on('click.photoLikesAllPeople', '[data-popup-people-likedphoto="1"]', function(ev){
	ev.preventDefault();
	ev.stopImmediatePropagation();
	var $this = ga(this);
	var pid = escape($this.data('pplikt').match(/\d/g).join(''));
	
	var dcont = '<div id="modal_main" class="modal_main">\
    <div id="modal_cnt" class="modal_cnt">\
        <ul class="modal_p_people_liked_photo comm_popup_followers">\
        </ul>\
    </div>\
</div>';
var __plkphotouserMarkup = '<li><a href="/user/%uid" class="closejbox" hrefattr="true"><img src="/getPhoto?p=%photo&sz=thumb&g=%gender"><div>%uname</div></a></li>';
	
	ga('<div/>').addClass('modal-new').appendTo(ga('body'));
    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-new'),
        title: lang.j_modal_liked_photo,
        overlay: false,
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': false,
        blockScroll: true,
        height: 'auto',
		width: '650px',
		minHeight: '300px',

        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        offset: {
            x: 0,
            y: 30
        },
        onClose: function() {
            prn_modal();
        }
    });
    jb_.open().ajax({
        type: 'POST',
        url: '/cmd.php',
        data: {
            cmd: 'allPeopleLikedPhoto',
	        photo: pid
        },
        reload: true,
        setContent: false,
        success: function(data) {
            var jCont = ga('.modal-new .jBox-content');


			if(data == 0) return displayErr(lang.err_tehnic);
			else if(data == 1) return displayErr(lang.not_found);
			else {
		     var a = validateJson(data);
			 jb_.setContent(dcont);
			 for(var b =0;b<a.length;b++){
				 var res = a[b];
				 jCont.find('ul.modal_p_people_liked_photo').append(__plkphotouserMarkup.replace(/%uid/g,res.id).replace(/%photo/g,res.photo).replace(/%uname/g,res.name).replace(/%gender/,res.gender)); 
			 }
			
				
			}
            

        }

    });
	
		
	});
	
	
	// jbox popup with all people who rated respective photo
	ga(document).off('click.photoRatedAllPeople').on('click.photoRatedAllPeople', '[data-popup-people-ratedphoto="1"]', function(ev){
	ev.preventDefault();
	ev.stopImmediatePropagation();
	var $this = ga(this);
	var pid = escape($this.data('pplikt').match(/\d/g).join(''));
	
	var dcont = '<div id="modal_main" class="modal_main">\
    <div id="modal_cnt" class="modal_cnt">\
        <ul class="modal_p_people_rated_photo comm_popup_followers">\
        </ul>\
    </div>\
</div>';
var __plkphotouserMarkup = '<li><a href="/user/%uid" class="closejbox" hrefattr="true"><img src="/getPhoto?p=%photo&sz=thumb&g=%gender"><div>%uname</div></a></li>';
	
	ga('<div/>').addClass('modal-new').appendTo(ga('body'));
    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-new'),
        title: lang.j_modal_liked_photo,
        overlay: false,
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': false,
        blockScroll: true,
        height: 'auto',
		width: '650px',
		minHeight: '300px',

        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        offset: {
            x: 0,
            y: 30
        },
        onClose: function() {
            prn_modal();
        }
    });
    jb_.open().ajax({
        type: 'POST',
        url: '/cmd.php',
        data: {
            cmd: 'allPeopleRatedPhoto',
	        photo: pid
        },
        reload: true,
        setContent: false,
        success: function(data) {
            var jCont = ga('.modal-new .jBox-content');
 

			if(data == 0) return displayErr(lang.err_tehnic);
			else if(data == 1) return displayErr(lang.not_found);
			else {
		     var a = validateJson(data);
			 jb_.setContent(dcont);
			 for(var b =0;b<a.length;b++){
				 var res = a[b];
				 jCont.find('ul.modal_p_people_rated_photo').append(__plkphotouserMarkup.replace(/%uid/g,res.id).replace(/%photo/g,res.photo).replace(/%uname/g,res.name).replace(/%gender/,res.gender)); 
			 }
			
				
			}
            

        }

    });
	
		
	});
	
	
	// dropdown for photo likes
	ga(document).off('mouseover.photoLikesPeople').on('mouseover.photoLikesPeople', '[data-photolikesdropdown]', function(e){
		
		e.preventDefault();
		e.stopPropagation();
		var __forpid = escape(ga(this).data('photolikesdropdown'));
		var __container_atPeLK = ga('[data-lkdrp="hook_Block_LikesInPh_'+__forpid+'"]');
		var __tooltip_appendto = ga(this).data('appendtooltipto');
		var _is_community = ga(this).closest('[data-community="true"]').length ? '&community=1' : '';
		var _hasCateg = ga(this).data('itemcateg');
		var _is_dark = ga(this).hasClass('_lightp') ? false : true;
		
		var __dark_tooltip_markup = '<section id="ph_likes_for_'+__forpid+'"><div class="phlikes_tooltip __dark"></div></section>';
		var __dark_tooltip_markup = '<div data-lkdrp="hook_Block_LikesInPh_'+__forpid+'" id="hook_Block_LikesInPh_'+__forpid+'" onmouseout="this.classList.remove(\'__important\');thisDrpDarPeLph('+__forpid+');" onmouseover="event.stopPropagation();this.classList.add(\'__important\');" class="posR">\
									<div class="sc-menu sc-menu__top '+ (_is_dark ? '__dark' : '__light') +' __lktooltip">\
									<div id="hook_Block_LikedUsersBlock_'+__forpid+'">\
									<ul class="u-menu">\
									<li сlass="u-menu_li">\
									<ul class="ucard-mini-list __ppeachpeople">\
									</ul>\
									</li>\
									<li style="display:none" class="mb-2x _all_pins"><a href="javascript:;" data-pplikt="ppo_'+__forpid+'" data-popup-people-likedphoto="1" class="al">All %all_pins</a></li>\
									</ul>\
									</div>\
									<div class="sc-menu_arw_w">\
									<div class="sc-menu_arw"></div>\
									</div>\
									</div>\
									</div>';
		var __lk_each_people_markup = '<li class="ucard-mini-list_li" %likedbyme>\
									<a href="/user/%profileid" class="ucard-mini o" hrefattr="true"><img src="/getPhoto?p=%photo&sz=small&g=%gender" class="ucard-mini_img">\
									<div class="ucard-mini_cnt">\
                                    <div class="ucard-mini_cnt_i __dc ellip">%uname</div>\
									</div>\
									</a>\
									</li>';
		
		if(typeof _clog_timeouts.likesPhDrw != undefined) { ga('.visb_lkdropdown:not(#hook_Block_LikesInPh_'+__forpid+')').fadeOut(); clearTimeout(_clog_timeouts.likesPhDrw);}
        ///if(!__container_atPeLK.length){
	    if(!ga(this).closest('li').find('[data-lkdrp="hook_Block_LikesInPh_'+__forpid+'"]').length){
		   ga(this).closest(__tooltip_appendto).append(__dark_tooltip_markup);
		   __container_atPeLK = ga('[data-lkdrp="hook_Block_LikesInPh_'+__forpid+'"]');
	}else{
		__container_atPeLK.addClass('visb_lkdropdown').fadeIn();
	}
	
	var repositionDropDownP = function (){
		if( !isElementInViewport(__container_atPeLK.find('div:first')) )__container_atPeLK.find('div:first').removeClass('sc-menu__top'); else __container_atPeLK.find('div:first').addClass('sc-menu__top');
	}

	
		if(!__container_atPeLK.find('.__ppeachpeople').length) return repositionDropDownP();
		
		var send = jAjax('/cmd.php', 'post', 'cmd=dropDownPhotoLikesPeople'+_is_community + (_hasCateg ? '&item='+_hasCateg : '') +'&photo='+__forpid);
		send.done(function(d){
			var _cntToAp = __container_atPeLK.find('ul.__ppeachpeople');
			if(d != 0){

				d = validateJson(d);
				var u = d.users;
				
				__container_atPeLK.find('li._all_pins').css('display',(d.total > 5 ? '' : 'none')).children().text(lang.All+' '+d.total);
				for(var j =0; j< u.length;++j){
					d = u[j];
					_cntToAp.append(__lk_each_people_markup.replace(/%likedbyme/g,d.id === _U.i ? 'likedbyme="1"' : '').replace(/%photo/g,d.photo).replace(/%gender/g,d.gender).replace(/%profileid/g,d.id).replace(/%uname/g,d.name));
					
				}

			} else _cntToAp.html(lang.err_comm_no_people_liked);
			
			 _cntToAp.removeClass('__ppeachpeople');
			 repositionDropDownP();
		});
	}).off('mouseout.photoLikesPeople').on('mouseout.photoLikesPeople', '[data-photolikesdropdown]', function(e){
		
		e.preventDefault();
		var __forpid = escape(ga(this).data('photolikesdropdown'));
		thisDrpDarPeLph(__forpid);

	});

	// get people who liked the comment
	ga(document).off('mouseover.commentHoverLikedPeople', '.comment_likes_count_js').on('mouseover.commentHoverLikedPeople', '.comment_likes_count_js', function(e){
		
		clearTimeout(_clog_timeouts.commentsLikesTooltip);
		var $this = ga(this);
		var _this_uq_id = $this.find('.comm_likes_count').data('commi');
		var this_unique_id = "comment-like-tooltip-"+_this_uq_id;
		ga('.comment_like_tooltip:not(.loading)').hide();
 
 
		if(!$this.hasClass('__on') && !$this.find('#'+this_unique_id).length)
		{
			
 
		
		var u_lk_markup = '<li class="userlkcomm" id="u-%uid"><a class="ellip" data-clbk="removePopup" href="/user/%uid" hrefattr="true">%uname</a></li>';//'<div data-dhref="/user/%uid" hrefattr="true" class="people_liked_this_comm"><img src="/getPhoto?p=%photo&sz=small&g=%gender"><div class="u_p_lk_cm_name">%uname</div></div>';
		var u_more_u_markup = '<li><A href="javascript:void(0);">+ %count</a></li>';
		$this.prepend('<div class="comment_like_tooltip loading" id="'+this_unique_id+'"><ul class="commentslikestooptip"><li>'+lang.Please_wait+'</li></ul></div>');
			var send = jAjax('/cmd.php','post',{'cmd':'hoverLikesPeople','comm_id':escape(_this_uq_id)});
			send.done(function(d){
				 
								  var markup = '';
								  if(d == 0) markup = '<li>'+lang.err_tehnic+'</li>';
								  else if(d == 2) markup = '<li class="nopeoplelikedthiscomm">'+lang.err_comm_no_people_liked+'</li>';
								  else {
									 
									  var r_d = validateJson(d);
									  var count = r_d.count;
									  var users = r_d.users;
									  var users_length =  users.length;
									  
									  for(var i=0; i< users_length; i++){
										  var r = users[i];
										 
										  markup += u_lk_markup.replace(/%uid/g,r.id).replace(/%photo/g,r.photo).replace(/%gender/g,r.gender).replace(/%uname/g,r.fname);
									  
									  }
									  
									if(count > users_length) markup += u_more_u_markup.replace(/%count/, (count-users_length));
								  }
							
				$this.find('#'+this_unique_id+'>ul').html(markup);
				$this.find('.comment_like_tooltip.loading').removeClass('loading');
				$this.addClass('__loaded');
				
			});
		
			
		} else if ($this.hasClass('__loaded')){
			
			
			$this.find('#'+this_unique_id).show();
			
		}
	
		$this.addClass('__on');
	 
		
	}).off('mouseout.commentHoverLikedPeople', '.comment_likes_count_js').on('mouseout.commentHoverLikedPeople', '.comment_likes_count_js', function(e){
		var $this = ga(this);
		
		_clog_timeouts.commentsLikesTooltip = setTimeout(function(){
		$this.removeClass('__on');
		$this.find('.comment_like_tooltip').hide();
		},500);
		
	});
	/*ga(document).off('mouseover.commentHoverLikedPeople', '.comment_likes_count_js').on('mouseover.commentHoverLikedPeople', '.comment_likes_count_js', function(e){
		e.preventDefault();
		var $this = ga(this);
		var _this_uq_id = $this.find('.comm_likes_count').data('commi');
		var this_unique_id = "like-tooltip-"+_this_uq_id;
		var u_lk_markup = '<div data-dhref="/user/%uid" hrefattr="true" class="people_liked_this_comm"><img src="/getPhoto?p=%photo&sz=small&g=%gender"><div class="u_p_lk_cm_name">%uname</div></div>';
		
	// Use the option closeOnMouseleave to keep it open
    var this_jb = ga(this).jBox('Tooltip', {
		id: this_unique_id,delayOpen:200,
        closeOnClick: 'body',closeOnEsc:true,trigger:'click',
	  ajax: {
      url: '/cmd.php',minWidth:150,minHeight:60,
	  data: 'cmd=hoverLikesPeople&comm_id='+_this_uq_id,
      setContent:false,type:'post',
	  reload:true,
      spinner: true, success:function(d){
		  var this_jb_cont = '';
		  if(d == 0) this_jb_cont = lang.err_tehnic;
		  else if(d == 2) this_jb_cont = lang.err_comm_no_people_liked;
		  else {
			  
			  var r_d = validateJson(d);
			  for(var i=0; i< r_d.length; i++){
				  var r = r_d[i];
				  
				  this_jb_cont += u_lk_markup.replace(/%uid/g,r.id).replace(/%photo/g,r.photo).replace(/%gender/g,r.gender).replace(/%uname/g,r.fname);
			  }
			  
			  
		  }
		  this_jb.setContent(this_jb_cont);
	  
	  }
   }
    });
	ga(this).trigger('click');
		ga('#'+this_unique_id).hover(function(){ if(typeof _clog_timeouts.likesCommJb != 'undefined') clearTimeout(_clog_timeouts.likesCommJb);
			$this.off('mouseout.commentHoverLikedPeople', '.comment_likes_count_js');
			ga('li.comment#comment_'+_this_uq_id).addClass('__hover');
			},function(){
				$this.off('mouseout.commentHoverLikedPeople', '.comment_likes_count_js').on('mouseout.commentHoverLikedPeople', '.comment_likes_count_js', function(e){
					e.preventDefault();
					$this.trigger('click');
					ga('li.comment#comment_'+_this_uq_id).removeClass('__hover');
			}).trigger('click');
				ga('li.comment#comment_'+_this_uq_id).removeClass('__hover');
			});
	}).off('mouseout.commentHoverLikedPeople', '.comment_likes_count_js').on('mouseout.commentHoverLikedPeople', '.comment_likes_count_js', function(e){
		e.preventDefault();
		var $this = ga(this);
		
		if(typeof _clog_timeouts.likesCommJb != 'undefined') clearTimeout(_clog_timeouts.likesCommJb);
		_clog_timeouts.likesCommJb = setTimeout(function(){$this.trigger('click');$('li.comment#comment_'+$this.find('.comm_likes_count').data('commi')).removeClass('__hover');},200);
	});
	*/
/*
	// hover on commments
	ga(document).off('mouseover.comments').on('mouseover.comments', 'li.comment', function(e){
		e.stopPropagation();
		var css = {};
		css['opacity'] = 1;
		css['visibility'] = 'visible';
		ga(this).find('.__toRight:first,.comment-reply:first,.comment-likes:first').css(css);
	
		
	}).off('mouseout.comments').on('mouseout.comments', 'li.comment', function(e){
		e.stopPropagation();
		var css = {};
		css['opacity'] = 0;
		css['visibility'] = 'hidden';
		ga(this).find('.__toRight:first,.comment-reply:first,.comment-likes:first').css(css);
		
	});
	*/
	// open post details
	ga(document).off('click.postDetails').on('click.postDetails', '[data-type-post]', function(e){
		
		e.preventDefault();
		e.stopImmediatePropagation();
		
		if(this._in) { return;}
		var _this = this;
		var $this = ga(this);
		var $b = ga('body');
		var g = generateUrl($this[0]);
		// close if exist another popup
		ga('#pp_post_viewer').remove();
		localStorage.removeItem('postViewer_default_cur_loc');
		this._in=1;
		var call_pd = jAjax(g[0], 'post', g[1]+'&type=pos');
		call_pd.done(function(data) {
		 _this._in=0;
		 
		 var in_community = false;
		 
		 if(  g[1].indexOf('clubid') != -1 ) in_community = true;
		 
		if(data == 0) return displayErr(lang.post_not_found);
		else {
		var curr_window_url = window.location.href;

		localStorage.setItem('postViewer_default_cur_loc',curr_window_url);
		createUrl('' ,'',$this.attr('href'));
		$b.addClass(_nscroll);
		$b.prepend(data);
		var author_id = parseInt($b.find('.post_author_i').text());
		
		// build map
			if (ga('#pp_post_viewer').find('.map-box').length) {
				  
				
				 postPopupBuildMap(ga('#pp_post_viewer')
				.find('.map-box>.hookMapData')
				.html(),ga('#pp_post_viewer').find('.media-map').attr('id'));
				
			}
		
		// scroll to bottom 
		if($this.hasClass('scrollbottom'))
			$b.find('.modal-new-phly').scrollTop($b.find('.modal-new-phly .mlr_cnts').height());
		
		// scroll to respective photo
		if($this.hasClass('scrollTo')){  
			$b.find('.modal-new-phly').scrollTop($b.find('[data-imagescrollto="'+$this.data('scrollto')+'"]').position().top);
			
		}
			
		
		var $CM_OBJ = in_community ? ga('#postViewerCommentsSection').addClass('incommunity') : ga('#postViewerCommentsSection');
		
		
		 var p_id = in_community ? '2' : '1';
        
		
		// build comments section
		commentsWidget(g[1].split('=')[p_id],
						$CM_OBJ,
						'post',
						{'width':432,'height':'auto','min-height':20,'overflow':'hidden','padding':'3px 74px 2px 7px'},
						ga('#pp_post_viewer').find(':scrollable'),
						'#mtLayerMain',author_id);
		

		
		
		setTimeout(function(){
		var cc_img_eac = 0;
		

		
		// scroll to comments
		if($this.data('scrollto') == 'comments')
			$b.find('.modal-new-phly').scrollTop(ga('.comments_cnt').offset().top);
				
				
		
		$b.find('.media-photos').find('img').each(function(){
			
			var $this = ga(this);
			if(isElementInViewport($this) && cc_img_eac <= 3)
				$this.attr('src',$this.data('original')).removeAttr('data-original').load(function(){
					
					$(this).removeAttr('style').addClass('__inited');
					
				});
			
			cc_img_eac++;
		});
		$b.find('#pp_post_viewer_html_cnt').off('scroll.ImageLoad').on('scroll.ImageLoad',function(e){
			 
			var $this = $(this);
			
			$this.find('img:not(.__inited)').each(function(){
				var _$this = $(this);
				if(isElementInViewport(_$this))
				_$this.attr('src',_$this.data('original')).removeAttr('data-original').load(function(){
					
					ga(this).removeAttr('style').addClass('__inited');
					
				});
			});
			
		});
		$b.find('#pp_post_viewer_html_cnt').trigger('scroll');
		

		
		},500);
		var removePostDetailsPopup = function()
		{
			ga('#pp_post_viewer').remove();
			createUrl('' ,'',curr_window_url);
			localStorage.removeItem('attch_checkUser');
			 
			$b.removeClass(_nscroll);
		}
		$b.find('.modal-new-phly.__post_vvw,.media-layer_close_ico').off('click.closeModalPost').on('click.closeModalPost',function(e){
			e.preventDefault();
			//$b.removeClass('__noScrollable');
			removePostDetailsPopup();

		});
		
		ga(document).off('keyup.closePostdetailsPopup').on('keyup.closePostdetailsPopup', function( e ){
			
			if(e.keyCode == 27) removePostDetailsPopup();
			
		});
		
		
		}
		
		});
		
	});
		// open popup for market product
		ga(document).off('click.openMarketProduct').on('click.openMarketProduct', '[data-open-marketproduct]', function(e){
			
			e.preventDefault();
			e.stopImmediatePropagation();
			var product_id = escape(ga(this).data('open-marketproduct'));
			return market.openProductViaPopup(this,e,product_id);
 
		});
	

		// minimize videos
		ga(document).off('click.minimizeVideos').on('click.minimizeVideos', '#vpl_minimize', function(e){
			
			e.preventDefault();
			
			var $body = ga('body');
			var video_meta = ga(this).closest('#video_all').find('[data-video-meta]').data('video-meta'); 
			var vid_id = video_meta.vd_i;
			
			
			if( !$body.find('#min_vd_'+vid_id).length ) {
				//removeMinVideoFromDOM();
				var video_url = window.location.href;
				var play_from = ga('#curvideo_lv_time').val();
				ga('#vpl_close').find('.ic').trigger('click');
				var min_vd_html = ga('<section id="min_vd_fly"><div class="flying_min_vd soh-s"><div class="playfromclass"><input type="hidden" id="curvideo_lv_time" />'+
				'<div class="flying_video_top_menu foh-s"><ul>'+
				'<li id="vd_flying_drag"><a href="javascript:void(0);" id="flying_vd_move"><span class="glyphicon glyphicon-move"></span></a></li>'+
				'<li><a href="'+video_url+'" class="playFrom" data-ivideo="1" onclick="removeMinVideoFromDOM();" id="flying_vd_openpopup"><span class="glyphicon glyphicon-fullscreen"></span></a></li>'+
				'<li><a href="javascript:void(0);" id="flying_vd_close"><span class="glyphicon glyphicon-remove"></span></a></li>'+
				'</ul></div>'+
				'<div id="videojw_'+vid_id+'"></div></div></div></section>');
				
				
				
				$body.prepend(min_vd_html);
				min_vd_html.find('#flying_vd_close').on('click',function(e){ 
				removeMinVideoFromDOM();
				});
 
				
				min_vd_html.draggable({
											  drag: function( ev, ui ) {
												  
												  
												  //ev.preventDefault();
												  ev.stopImmediatePropagation();
												  
												  
											  }
										});
				playThisVideo(ga('#min_vd_fly'), video_meta,1,play_from);
				
			}
			
		});
		
		// open video popup
		ga(document).off('click.openVideo').on('click.openVideo', '[data-ivideo="1"]', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $this = ga(this);
			var $body = ga('body');
			var in_community = ga(this).attr('href').indexOf('clubid') > -1 ? 'incommunity' : '';
			var playFrom = $this.hasClass('playFrom') ? $this.closest('.playfromclass').find('#curvideo_lv_time').val() : '';
			var send = runAjax($this, e, 'post');
			
            send.done(function (data) {
			
			switch(data){
				
				case '0': // invalid id
				return displayErr(lang.invalid_video_id);
				break;
				case '1': // video not found
				return displayErr(lang.video_not_found);
				break;
				default:

				video_popup_retine_href = !video_popup_retine_href ? window.location.href : video_popup_retine_href;
				createUrl('' ,'',$this.attr('href'));
				if(!$body.find('#video_all').length)
					$body.addClass('__noScrollable').prepend(data);
				else
					$body.find('#video_all .media-layer_c').html(data);
			
			    $body.find('#video_all .media-layer_close_ovr,#video_all .media-layer_close_ico').off('click.closeVideo').on('click.closeVIdeo',function(e){
					ga('#video_all').remove();
					createUrl('' ,'',video_popup_retine_href);
					$body.removeClass('__noScrollable');
					video_popup_retine_href = false;
				});
				var video_popup_cnt = $body.find('#video_all');
		video_popup_cnt.prepend('<div class="__none startFrom" id="'+playFrom+'"></div>');
				// scroll to comments
				if($this.data('scrollto') == 'comments')
					$body.find('.media-layer__video').scrollTop(ga('#movie-comments').offset().top);
		
				// play video
				setTimeout(function(){ga('#vd_auto_play').trigger('click');},50);
				
								
				// build comments section
				commentsWidget(parseInt(video_popup_cnt.find('#v_vid').text()),
						ga('#movie-comments').addClass(in_community),
						'video',
						{'width':'80%','height':'auto','min-height':20,'overflow':'hidden','padding':'3px 74px 2px 7px'},
						ga('#video_all').find(':scrollable'),
						'.vp-layer_cnt',parseInt(video_popup_cnt.find('#v_author').text()),'3',1);
				break;
			}
			
			});
			
		});	
	
	// open photo viewer (layer)
	ga(document).off('click.photoViewer').on('click.photoViewer', '[data-vphopen="1"]',function(e){

		return openPhotoViewer(e,this);

	});

}

// for alphabetically filter
function checkLetterInDom($obj){
           var r = false;
	   var $obj = ga('.loader-controls');
	   //if($obj.data('loadd').alpha === '' || _gl_filter_by_letter == 'NULL') return;

	   if($obj.length && $obj.data('loadd').alpha === '' || _gl_filter_by_letter === 'NULL')return;

           var lt_in_DOM = ga('.letter_patern[data-ltn='+_gl_filter_by_letter+']');

	   if(lt_in_DOM.length){
				ga('#hook_alpha').remove();
				if (history.pushState) {
  				window.history.pushState('', '', window.location.search+'#'+_gl_filter_by_letter);
				} 
      				// move scrollbar to position of called letter
      				ga('html,body').animate({scrollTop:lt_in_DOM.offset().top-50});///scrollTop(lt_in_DOM.offset().top-50);

      				_gl_filter_by_letter = 'NULL';

 	r = true;
	} else $obj.trigger('click');

		return r;
}

// append more friends in friends page
function lMoreFriends(d, appTo, puid, $obj) {

    var is_alpha = $obj.data('loadd').alpha;

    // markup friends, for alpha
    var f_markup = is_alpha ? '<div id="friendCardId_%s" class="ugrid_i">' +
        '<div class="ucard-v __xs __h __list-view">' +
        '<div class="section">' +
        '<a href="/user/%s" hrefattr="true">' +
        '<div class="photo">' +
        ' <img src="/getPhoto?p=%s&sz=thumb" class="photo_img" width="128" height="128" alt="%s"></div>' +
        ' </a>' +
        ' </div>' +
        ' <div class="caption">' +
        '   <div class="ucard-v_ac"><a title="' + lang.send_gift + '" href="/gifts/u/%s" hrefattr="true" data-scrolltop="200" class="lp"><span class="tico"><i class="tico_img ic ic_present"></i>' + lang.send_gift + '</span></a>' +
        '   <a title="send a message" href="javascript:;" onclick="chatWith(event,this,1)" id="y-%s" data-uconv=\'{"id":"%s","fullname":"%s","photo":"%s"}\' class="lp"><span class="tico"><i class="tico_img ic ic_message"></i>' + lang.send_message + '</span></a></div>' +
        '  <div class="ellip"><a class="o" href="/user/%s" hrefattr="true">%s</a></div>' +
        ' <div class="timestamp">%s</div>%s' +
        ' </div>' +
        ' </div>' +
        '</div>'
	:
	'<li id="friendCardId_%s" class="ugrid_i"><div class="ucard-v ">'
	+'<div class="section">%s<a href="/user/%s" hrefattr="true">'
	+'<div class="photo"><div class="stub-img stub-img__user128-female stub-img__128 photo_img"></div>'
	+'<img src="/getPhoto?p=%s&sz=thumb" class="photo_img" width="128" height="128" alt="%s"></div></a></div>'
	/*
								 + '<span class="kn_shortcutmenu wh100">'+
                                  '<div class="hookDataShortcut" data-shortcutmenudata=\'{"uid":"%s","uname":"%s","uphoto":"%s","ugender":"%s","ulmen":{"guest":"0","block":"0","unblock":"0","unfriend": "1"}\' id="hook_ShortcutMenu_%s">'+
                                  '</div>	'+
								  '</span>'+
	*/
	+'<div class="caption"><div class="ellip"><a class="o" href="/user/%s" hrefattr="true">%s</a></div>'
	+'<div class="timestamp">%s</div></div></div> </li>';

    
    var f_markup_alpha_post_mus = '<div class="ust">' +
        '<div class="ust_tx ust_music">' +
        '<div class="ust_music-cntrl" id="dv_pm_out_post_%s" onclick="return false;"><i onclick="nobilMusicPlayOutsideTrack(this,event)" data-track-inf=\'{"track":"%s","cover":"%s","artist":"%s","songname":"%s","albumname":"%s"}\' title="Play" id="pm_out_post_%s" class="ust_play"></i></div><a class="ust_a" data-type-post="1" href="post?i=%s" title="%s" rel="tipsy">%s</a></div>' +

        '</div>';
    var f_markup_alpha_post_txt = ' <div class="ust">' +
        ' <div class="ust_tx"><a title="%s" class="ust_a" data-type-post="1" href="/post?i=%s">%s</a></div>' +
        ' </div>';


    if(!d.length)$obj.remove();
    var prevLetter = $('.letter_header:last').text().toUpperCase();
    var arrLetts = [];
    for (var i = 0; i < d.length; i++) {
        var x = d[i]
            , uid = x.id
            , fullname = x.fullname
            , photo = x.photo
	    , dtonl = x.dt
            , letter = x.curLetter.toUpperCase()
            , p_id = x.p_id
            , p_text = x.p_text
            , p_type = x.p_type
            , track = x.track
            , cover = x.cover
            , artist = x.artist
            , songname = x.songname
            , albumname = x.albumname;

        if(x.limit > d.length) $obj.remove();
	if(letter != prevLetter && is_alpha){
	ga('#' + appTo).append('<div class="letter_patern" data-ltn="'+letter+'"></div><div class="letter_header" data-ltn="'+letter+'" data-alphui="gbkrw)'+puid+'" onclick="friendsAlphabetList(this,event);">'+letter+'</div>');
        prevLetter = letter;
	arrLetts.push(letter);
	}
        ga('#' + appTo)
            .append(
is_alpha ?
jprintf(f_markup, uid, uid, photo, fullname,uid, uid, uid, fullname, photo, uid, fullname, dtonl, (p_text != null ? (p_type == 'song' ? jprintf(f_markup_alpha_post_mus, p_text, track, cover, artist, songname, albumname, p_text,  p_id, artist + '&nbsp;-&nbsp;' + songname, artist + '&nbsp;-&nbsp;' + songname) : jprintf(f_markup_alpha_post_txt, p_text,p_id, p_text)) : ''))
:
jprintf(f_markup,uid,
(p_text != null ? (p_type == 'song' ? jprintf(f_markup_alpha_post_mus, p_text, track, cover, artist, songname, albumname, p_text, p_id, artist + '&nbsp;-&nbsp;' + songname, artist + '&nbsp;-&nbsp;' + songname) : jprintf(f_markup_alpha_post_txt, p_text, p_id, p_text)) : '')
,uid,photo,fullname /*uid,fullname,photo,'male',uid*/  ,uid,fullname,dtonl)

);

    }

 // run instantly the function while found certain letter
 if(_gl_filter_by_letter != 'NULL' && $.inArray( _gl_filter_by_letter, arrLetts ) == -1 ) {

return $obj.trigger('click');

} else eval('checkLetterInDom')(arguments);


}

// remove share as message popup
function removeShareAsMsg(){
	
	return ga('#share_as_msg').length ? document.getElementById('share_as_msg').remove() : '';
}
function shareContentInMsg(evt,i,d){
	
	evt.preventDefault();
	
	var _data = JSON.parse(d);

	if(_data.length <= 0) { 

			return kn_liveNotif(lang.not_sent,'info',5000,lang.share_in_msg_not_recipients);
	}
	
	var send = jAjax('/cmd.php', 'post', {cmd : 'shareInMsg', to: _data, itemid: i} );
	send.done(function(data){ 
		if(data == 1) {
			removeShareAsMsg();
			return kn_liveNotif(lang.Sent,'done',5000,lang.share_in_msg_sent);
		} else 
			return kn_liveNotif(lang.Error,'error',5000,lang.err_tehnic);
		
		
	});
	
}
// share as message
function shareAsMessage(el,ev,itemid){
	
	ev.preventDefault();
	
	el = ga(el);


	var _cr_popup = '<section id="share_as_msg">'+
					'<div class="layer_ovr" onclick="removeShareAsMsg();"></div><div class="dvox_shfriends"><div class="dvox_title">'+lang.share_in_message+'</div><span id="sharing_sel_count"></span><span title="'+lang.close+'" onclick="removeShareAsMsg();" class="tico tico__n-t notifs_close"><i class="tico_img ic ic_close"></i></span>'+
					'<div class="dvox_divider"></div>'+
					'<div class="dvox_cnt">'+
					'<div class="dvox_input_title"><input type="text" class="dvox_input it" placeholder="'+lang.type_a_friend_name+'" /></div>'+
					'<div id="sharing_to_friends_list" class="dvox_friends_cnt"></div>'+
					'<div class="dvox_bottom_btns"> <button class="flat_button" id="button-sharing">'+lang.Send+'</button> '+
					'<button type="button" onclick="removeShareAsMsg();" style="border-color: #fff; color:#000;" class="ml-10 flat_button secondary">'+lang.Cancel+'</button>'+
					'</div>'+
					'</div></section>';


	var _b = ga('body');

	removeShareAsMsg();
	
	_b.prepend(_cr_popup);
	
			//console.log(validateJson(_all_fr));
			var friends_list = validateJson(_all_fr), selected_users = {};
			
			
		for(var i in friends_list)
      {
      
      
 
		var f = friends_list[i];
		var friend_m = '<a class="dbox_f_c" id="u_'+f.id+'" href="javascript:void(0);"><div class="dvox_f_img"><img src="/getPhoto?p=' +
                        f['photo'] + '&sz=small&g='+f['gender']+'" /></div><div class="dvox_f_name">' + f.uname+'</div></a>';
                 
		ga('#sharing_to_friends_list').append(friend_m).find('.dbox_f_c').off('click.select-user-sh').on('click.select-user-sh',function(e){
			
			evstop(e);
			var uid = tonum(ga(this).attr('id'));
			if(ga(this).hasClass('sel')){
				ga(this).removeClass('sel');
				delete selected_users[uid];
			} else {
				ga(this).addClass('sel');
				selected_users[uid] = uid;
			}
			
			
			
		});
		ga('#button-sharing').off('click.sharing_now').on('click.sharing_now',function(E){
			
			evstop(E);
			
			shareContentInMsg(event,itemid,JSON.stringify(selected_users));
		});
      }
	  
                    ga('.dvox_input')
                        .fastLiveFilter('#sharing_to_friends_list', {
                            timeout: 200,
                            callback: function(total) {
                                ga('#sharing_sel_count')
                                    .html('('+total+'&nbsp;'+lang.friends+')');
                            }
                        });
	  
	  
	/*
	
  ga('#friend_tg')
        .textext({
            plugins : 'tags autocomplete arrow',
			
            autocomplete : {
                dropdownMaxHeight : '200px',

                render : function(suggestion)
                {

                    return '<div class="dvox_f_img"><img src="/getPhoto?p=' +
                        suggest_list_photo[suggestion]['photo'] + '&sz=small&g='+suggest_list_photo[suggestion]['gender']+'" /></div><div class="dvox_f_name">' + suggestion+'</div>';
                }
            }
			
        })
        .bind('getSuggestions', function(e, data)
        {

			
            var 
                textext = ga(e.target).textext()[0],
                query = (data ? data.query : '') || ''
                ;

            ga(this).trigger(
                'setSuggestions',
                { result : textext.itemManager().filter(suggest_list, query) }
            );
        })
        ;
	*/
	
	_b.off('keyup.closeShareMsgPopup').on('keyup.closeShareMsgPopup', function(e){
		
		if(e.keyCode == 27) removeShareAsMsg();
	});
}

// share public 
function reshareContent(ev,el,itemid,type,authorid){
	
	ev.preventDefault();
	
	el = ga(el);
	
	ajaxLoading();
	
	var share_community = el.hasClass('sharecommunity') ? 'yes' : 'no';
	var share_community_club = el.hasClass('sharecommunityclub') ? 1 : 0;
	
	var send = jAjax('/cmd.php', 'post', { cmd:'reshare', it_id: itemid,'type':type, 'post.author' : share_community == 'yes' && share_community_club ? escape(itemid) : escape(authorid), 'share-community':share_community });
	send.done(function(data){
	
	
		removeAjaxLoad();
		
		
		if(data == 1){
			
			var shared_community = el.hasClass('sharecommunity');
			
			
			if(!shared_community){
			el.removeAttr('onclick').addClass('curDefault').find('.ic_reshare').addClass('__done');
			el.find('#reshare_text_done').text(lang.reshare_success);
			el.closest('#sharebuttonwp').find('button').addClass('__active');
			
			
			// +1 shared count
			var sh_curr_count = parseInt(el.closest('#sharebuttonwp').find('.js-count').text());
			el.closest('#sharebuttonwp').find('.js-count').text( parseInt(sh_curr_count) +1 );
			
			// after 2 sec close automatically the share box
			setTimeout(function(){ ga(document).trigger('click.v2closeReshareDialog'); },2000);
			
			} else {
				
				if(share_community_club)
				kn_liveNotif(lang.community_shared_success,'done',6000,lang.community_shared_succ_descr);
			else
				kn_liveNotif(lang.share_in_msg_sent,'done',6000,'');
			}
			
		} else kn_liveNotif(lang.err_reshare_title,'error',6000,lang.err_reshare_descr);
		
	});
	
	
}


// share dialog opener
function shareBox(el,evt,type,post_authorid){
	
	evt.preventDefault();
	evt.stopPropagation();
	
	var el_id = ga(el).attr('id');
	
	var _reshared = ga(el).hasClass('__active');
	var is_community = ga(el).hasClass('sharecommunity') ? 'sharecommunity' : '';
	var elid_rp = el_id.replace('reshare_','');
	var share_in_msg = is_community ? 'community_'+type+'-'+elid_rp : type+'-'+elid_rp;
	var sharebox_m = '<section class="shareboxsection" id="shareboxmarkup_'+el_id+'" onclick="event.stopPropagation();">\
	<div class="sc-menu __reshare __noarrow sc-menu__top">\
    <ul class="u-menu ">\
        <div data-l="t,reshare-menu">\
            <div class="hookBlock">\
              <a href="javascript:void(0);" onclick="return reshareContent(event,this,'+elid_rp+',\''+type+'\',\''+post_authorid+'\');" class="u-menu_li  '+is_community+' '+ ( _reshared ? 'curDefault' : '' ) +' js-doNotHide reshare"><span class="tico "><i class="tico_img ic ic_reshare '+ ( _reshared ? '__done' : '' ) +'"></i><span id="reshare_text_done">'+ ( _reshared ? lang.reshare_success : lang.share_now ) +'</span></span>\
                <div class="u-menu_tx">'+lang.reshare_descr+'</div></a></div>\
                      <a href="javascript:void(0);" onclick="shareAsMessage(this,event,\''+share_in_msg+'\');" class="u-menu_li js-hide-dropdown"><span class="tico "><i class="tico_img ic ic_message"></i>'+lang.share_as_msg+'</span></a>\
						</div>\
    </ul>\
    <div class="sc-menu_arw_w">\
        <div class="sc-menu_arw"></div>\
    </div>\
</div></section>';
    // <a data-l="t,feed" href="/feed" class="u-menu_li js-hide-dropdown"><span class="tico "><i class="tico_img ic ic_blog"></i>Add your own text</span></a>
   //  <a data-l="t,group" href="/feed" class="u-menu_li js-hide-dropdown"><span class="tico "><i class="tico_img ic ic_group"></i>Post in the group</span></a>
	
	
	ga('.shareboxsection').remove();
	
	ga(el).closest('#sharebuttonwp').prepend(sharebox_m);
	
	if( !isElementInViewport(ga('.shareboxsection .sc-menu'),0,50) ) ga('.shareboxsection .sc-menu').removeClass('sc-menu__top');
	
	
}

// close share dialog
ga(document).off('click.v2closeReshareDialog').on('click.v2closeReshareDialog', function(e){
 
	ga('.shareboxsection,#share_box_layer_ovr').remove();
	
});

// close share dialog by pressing ESC key
ga(document).off('keyup.v2closeReshareDialog').on('keyup.v2closeReshareDialog', function(e){
	
	if(e.keyCode == 27)
	ga('.shareboxsection,#share_box_layer_ovr').remove();
	
});

// user menu control opener
ga(document).off('click.userMenu').on('click.userMenu', '.user_menu_control', function(e){
	e.preventDefault();
	var $this = ga(this);
	var user_menu = ga('.left_sd_b_wht'), online_block = ga('.online-fr_block'), main_cont_col = ga('#mainContent');
	
	// check if is mobile
	if(isBodyRestive()){
		
		user_menu.removeClass('__collapsed');
		
		
		var collapse_abs_menu = function (m){
		
		if(m === 'hide'){
			user_menu.parent().addClass('_hidden');
			$this.removeClass('__on');
		} else {
			$this.addClass('__on');
			user_menu.parent().removeClass('_hidden');
			
		}
		
		
		};
		
		
			if(user_menu.parent().hasClass('_hidden')){
		collapse_abs_menu();
		
	}else{
		collapse_abs_menu('hide');

	}
		
		
		return;
	}
	
	
	var collapse_menu = function (m){
		
		if(m === 'min'){
	
		//user_menu.addClass('__collapsed');
		///$this.removeClass('__on');
		
		
		
		// footer 
		//ga('.ft').addClass('ftmin');
		//createCookie('user_menu_on','yes');
		//online_block.removeClass('__min').css('width', '');
		//online_block.parent().find('#hook_Block_HolidaysPortlet').css('width', '');
		//main_cont_col.css('left','');
		//ga('html').addClass('_min');
		
		
		
		} else {
		

		//user_menu.removeClass('__collapsed');
		//$this.addClass('__on');
		
		
		
		//footer
		//ga('.ft').removeClass('ftmin');
		//online_block.addClass('__min').css('width', '-=48px');
		//online_block.parent().find('#hook_Block_HolidaysPortlet').css('width', '-=48px');
	///	main_cont_col.css('left','26px');
	///	createCookie('user_menu_on','no');
		//ga('html').removeClass('_min');
		
		
		}
		
		
	};
	
	if($this.hasClass('window_load')){
		
		return collapse_menu();
	}
	
	if(user_menu.hasClass('__collapsed')){
		collapse_menu();
		
	}else{
		collapse_menu('min');

	}
	
});
function cloneMyProfileForLikesTooltip(){
	return 				'<li class="ucard-mini-list_li _highlight_mprof_tooltip" likedbyme="1">\
						<a href="/user/'+_U.i+'" class="ucard-mini o" hrefattr="true">\
						<img src="/getPhoto?p='+_U.p+'&sz=small&g='+_U.g+'" class="ucard-mini_img">\
						<div class="ucard-mini_cnt"><div class="ucard-mini_cnt_i __dc ellip">'+_U.n+'</div></div></a></li>';
}
function succLike(obj, rec_obj, el) {
    var $el = el;

						
    var curr_like = $el.find('.js-count')
        , curr_like_c = parseInt(curr_like.text());
    var b_lk_parent = $el.parent(), _ul_likes_us = $el.closest('li').find('ul.u-menu');

    if (rec_obj.like_action) {
        // plus like, +1
        ++curr_like_c;
        curr_like.text(curr_like_c);
        b_lk_parent.addClass('__active');
		if(!_ul_likes_us.find('[likedbyme="1"]').length) {_ul_likes_us.prepend(cloneMyProfileForLikesTooltip());setTimeout(function(){ _ul_likes_us.find('._highlight_mprof_tooltip').removeClass('_highlight_mprof_tooltip'); },4000);}
    } else {
        // minus like, -1
        --curr_like_c;
        curr_like.text(curr_like_c);
        b_lk_parent.removeClass('__active');
		_ul_likes_us.find('[likedbyme="1"]').remove();
    }

}

// callback for like ic click on wall photo
function phwallLikeClick(obj,rec_obj,el){
	    var $el = el;
    var curr_like = $el.next()
        , curr_like_c = parseInt(curr_like.text());

	    if (rec_obj.like_action) {
        // plus like, +1
        ++curr_like_c;
        curr_like.text(curr_like_c);
        $el.addClass('__active');
    } else {
        // minus like, -1
        --curr_like_c;
        curr_like.text(curr_like_c);
        $el.removeClass('__active');
    }
	
}

// hide dropdown (photo likes)
function thisDrpDarPeLph(id){
	
		var _searchinDomDropDwLaLikP = ga('[data-lkdrp="hook_Block_LikesInPh_'+id+'"]');
		
		///if(typeof _clog_timeouts.likesPhDrw == undefined) _clog_timeouts.likesPhDrw.id = '';
		
		_clog_timeouts.likesPhDrw = setTimeout(function(){
		if(!_searchinDomDropDwLaLikP.hasClass('__important'))
		_searchinDomDropDwLaLikP.removeClass('visb_lkdropdown').fadeOut();
		},200);
}

// set reason for Report button in report window
ga(document).off('click.report_reason').on('click.report_reason', '#report_specify_reason input[type="radio"]', function(e){
	e.stopPropagation();
	var _reason_val = ga(this).val();
	
	ga('#defaultreason').text(_reason_val);
	
});



var _g_c_timeout, _g_complete_timeout;
ga(document).off('mouseover.completeProfile').on('mouseover.completeProfile','#complete_user_profile', function(e) {
	e.stopPropagation();
	clearTimeout(_g_complete_timeout);
	
});
ga(document).off('mouseout.completeProfile').on('mouseout.completeProfile','#complete_user_profile', function(e) {
	clearTimeout(_g_complete_timeout);
	if(!ga('.cmpl_div').hasClass('_closed'))
	 _g_complete_timeout = setTimeout(function(){
		 
		 ga('.cmpl_div').addClass('_closed');
	 },1200);
	
});
ga(document).off('focus.searchForCountriesAndCities').on('focus.searchforCountriesAndCities','.getuserlocation', function(e) {
	
	var a = ga(this);
	var location_ul_list = a.parent().find('#google_found_locations>ul');
	if(location_ul_list.css('display') == 'none')
		location_ul_list.slideDown();
	
	
});

ga(document).off('keyup.searchForCountriesAndCities').on('keyup.searchforCountriesAndCities','.getuserlocation', function(e) { e.preventDefault();e.stopImmediatePropagation();
	clearTimeout(_g_c_timeout);
		el = ga(this);
	ga('#location_selected_from_list').remove();
	ga('#settings_approved_location').remove();
	_g_c_timeout = setTimeout(function(){
	var val = $.trim(el.val());
	
	var errFindCountry = function(){
		ga('#google_found_locations,#err_find_google_country').remove();
		el.after('<div style="color:red;" id="err_find_google_country">:/ Sorry, we can not find your location.</div>');
	}
	if(val) {
		
		var autocomplete_markup = '<li id="%location_id" data-location-name="%location_name"><a href="javascript:void(0);" onclick="selectThisLocation(event);">%location_name</a></li>';
		var _results = '';
		// https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language=en&extratags=1&namedetails=1&q=val
		
		
		
		
		
		

 
	
	
	
	
	
	
	
	
	if (window.XMLHttpRequest === undefined) {
			window.XMLHttpRequest = function() {
				try { return new ActiveXObject("Microsoft.XMLHTTP.6.0"); }
				catch  (e1) {
					try { return new ActiveXObject("Microsoft.XMLHTTP.3.0"); }
					catch (e2) { throw new Error("XMLHttpRequest is not supported"); }
				}
			};
		}
		var IE8or9 = ( L.Browser.ie && !window.atob && document.querySelector ),
			request = IE8or9 ? new XDomainRequest() : new XMLHttpRequest();
 
			var aurl = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language='+__g_lang+'&extratags=1&namedetails=1&q='+val;
 

		request.open("GET", aurl);
		var that = this;
 
		request.onload = function() { 

		
		var json = request.responseText;
		
		
		if(checkJson(json)){  //document.write('<pre>'+json);
			var data = validateJson(json);
			
			//if(data.hasOwnProperty('display_name')){
			//var predictions = data.predictions;
			
			if(data.length){
			for(var i =0; i < data.length;++i){
				
				

	  
			var address = data[i].address;
			var state = address.state != 'undefined' ? address.state : '';
			var town = address.town != 'undefined' ? address.town : '';
			var county = address.county != 'undefined' ? address.county : '';
			var country = address.country != 'undefined' ? address.country : '';
			var full_address = county+', '+country;
				
				
				_results += autocomplete_markup.replace('%location_id',data[i].place_id).replace(/%location_name/g,data[i].display_name);
			}
			
			ga('#google_found_locations').remove();
			el.after('<section id="google_found_locations" class="location_found"><input type="hidden" name="location_approved" value="0" id="location_selected_from_list" class="no" /><ul>'+_results+'</ul></section>');
			}else {
				
				errFindCountry();
			}
			
			
		} else {
			errFindCountry();
			
			
		}
		
		
		
		
		
		
		};
 
		request.send();
   
	
	
	
	
	
	
	
 

		
		
		
		
		
		
		
		/*
		
		var send = jAjax('https://nominatim.openstreetmap.org/search', 'GET', {'format':'json','addressdetails':'1','accept-language':'en','extratags':'1','namedetails':val});








		//var send = jAjax('/cmd.php', 'post', {'cmd':'getLeafletLocations','input':val});
		
		send.done(function(json){   
	 
		if(checkJson(json)){
			var data = validateJson(json);
			
			if(data.hasOwnProperty('predictions')){
			var predictions = data.predictions;
			
			if(predictions.length){
			for(var i =0; i < predictions.length;++i)
				_results += autocomplete_markup.replace('%location_id',predictions[i].place_id).replace(/%location_name/g,predictions[i].description);

			
			ga('#google_found_locations').remove();
			el.after('<section id="google_found_locations" class="location_found"><input type="hidden" name="location_approved" value="0" id="location_selected_from_list" class="no" /><ul>'+_results+'</ul></section>');
			}else {
				
				errFindCountry();
			}
			
			}
		} else {
			errFindCountry();
			
			
		}
	
		});
		*/
		
	}
	
	},500);
	
	
});


// get user location
ga(document).off('keydown.searchForCountriesAndCities,keypress.searchForCountriesAndCities').on('keydown.searchforCountriesAndCities,keypress.searchForCountriesAndCities','.getuserlocation', function(e) {
	
 
	clearTimeout(_g_c_timeout);

 
	
});

// search movies
ga(document).off('keyup.searchMovies').on('keyup.searchMovies', '[rel="input_search_movies"]', function(e){
	
	var _this = ga(this);
	var _this_callback = ga(this).attr('search-callback');
	var _movie_key = ga(this).val();
	var ic_loader = _this.parent().find('.input-ic-loader');

	clearTimeout(_clog_timeouts.search_movies);
	_clog_timeouts.search_movies = setTimeout(function(){  
	if( $.trim(_movie_key)){
			ic_loader.removeClass('__none');
			var movies_arr = searchMovies(_movie_key);
					movies_arr.done(function(d){
						ic_loader.addClass('__none');
						window[_this_callback](d);
						 
					});
	}
	},500);
});
// search movies
ga(document).off('keydown.searchMovies,keypress.searchMovies').on('keydown.searchMovies,keypress.searchMovies', '[rel="input_search_movies"]', function(e){
	
	clearTimeout(_clog_timeouts.search_movies);
	
});
ga(document).off('click.clearToolbarOpac').on('click.clearToolbarOpac', '.toolbar', function(e){ 
	ga(this).removeClass('__opac');
});
// search tracks
ga(document).off('keyup.searchTracks').on('keyup.searchTracks', '[rel="input_search_tracks"]', function(e){
	
	var _this = ga(this);
	var _this_callback = ga(this).attr('search-callback');
	var _track_key = ga(this).val();
	var ic_loader = _this.parent().find('.input-ic-loader');

	clearTimeout(_clog_timeouts.search_tracks);
	_clog_timeouts.search_tracks = setTimeout(function(){  
	if( $.trim(_track_key)){
			ic_loader.removeClass('__none');
			var track_arr = searchTracks(_track_key);
					track_arr.done(function(d){
						ic_loader.addClass('__none');
						window[_this_callback](d);
						 
					});
	}
	},500);
});
// search tracks
ga(document).off('keydown.searchTracks,keypress.searchTracks').on('keydown.searchTracks,keypress.searchTracks', '[rel="input_search_tracks"]', function(e){
	
	clearTimeout(_clog_timeouts.search_tracks);
	
});

// search books
ga(document).off('keyup.searchBooks').on('keyup.searchBooks', '[rel="input_search_books"]', function(e){
	
	var _this = ga(this);
	var _this_callback = ga(this).attr('search-callback');
	var _book_key = ga(this).val();
	var ic_loader = _this.parent().find('.input-ic-loader');

	clearTimeout(_clog_timeouts.search_books);
	_clog_timeouts.search_books = setTimeout(function(){  
	if( $.trim(_book_key)){
			ic_loader.removeClass('__none');
			var book_arr = searchBooks(_book_key);
				book_arr.done(function(d){
						ic_loader.addClass('__none');
						window[_this_callback](d);
						 
					});
	}
	},500);
});
// search books
ga(document).off('keydown.searchBooks,keypress.searchBooks').on('keydown.searchBooks,keypress.searchBooks', '[rel="input_search_books"]', function(e){
	
	clearTimeout(_clog_timeouts.search_books);
	
});
/*
// keep slider for feed at top
ga(window).on('scroll.KeepFeedSliderAtTop', function(e){
	
	var wall_slider = ga('#feedSlider');
	
	
	if(wall_slider.length){
		
		
		if( ga(this).scrollTop() >= wall_slider.offset().top){
			
			var slider_w = wall_slider.width();
			if( !wall_slider.hasClass('fixed_always') )
				wall_slider.css('width',slider_w);
			
			wall_slider.addClass('fixed_always');
			
		}
		
		
		
	}
	
	
});
*/

// click friends on map
ga(document).off('click.friendsOnMap').on('click.friendsOnMap', '#top_friends_on_map_click', function(e){
	
	var $this = ga(this);
	
	//if($this.parent().hasClass('on')){
$this.addClass('__active');
// close notification box
ga('#close_flying_notification_box').trigger('click');
		e.preventDefault();
		var closeMapPostsBox = function(){
			
			ga('#friends_on_map_box_statuses').remove();
			$this.removeClass('__active');
		};
		
		var send = jAjax('/cmd.php', 'post', {'cmd':'viewStatusesOnMap'});
		
		send.done(function(d){
			
			var $b = ga('#space_f_map_posts');
			
			if(!$b.find('#friends_on_map_box_statuses').length){
				
			$b.append(d);
			ga('#fmapbox_start_btn').trigger('click');
			ga(document).off('keyup.closeStatuseMapP').on('keyup.closeStatuseMapP', function(e){
				
				if(e.keyCode == 27)
					closeMapPostsBox();
				
			});
			
			ga('#map_posts_box_close').on('click',function(e){
				closeMapPostsBox();
				
			});
			
			ga('#fmap_footer_go_toMap').on('click',function(e){
				closeMapPostsBox();
				
			});
			
			
			} else {
				
				// close the box
				closeMapPostsBox();
			}
			
		});
		
		
		
	//} 
	
});


ga(document)
    .ready(liveHandlerCl);
