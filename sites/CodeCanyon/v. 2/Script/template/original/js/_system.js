var $body = ga('body');
var $document = ga(document);
var _d = $document;
var $window = ga(window);
var prev_url = window.location.href;
var _winH = $window.height();
var _winW = $window.width();
var globalCont;
var g_element;
var psize;
var removeThisPanel;
var pVendor = getVendor();
var bFeature = getBwFeatures();
var crossEvent = whichTransitionEvent();
var cDialogUrl = _THEME + '/body/confirmation_dialog.html';
var uploadGetFiles;
var checkedCount;
var keepScrollBar;
var sh_user_details;
var observe;
var jb_create_tooltip_cnt = '';
var stop_expand_post_area;
var tg_k_skip_this;
var profile_photos_wall;
var ms_container, checkFeedItemsSize;
var startLiveMap;
var dev_enabled;
var _peer;
var existingCall;
var call_user_answered;
var global_messenger_count = 0;
var gl_scrollChatDelay = false;
var newCallWindow = {};
 
var movementPhotosArray = [],

    fetchedUrls = [],
    update_states_arr = [],
    taggedPeopleDb = [],
    taggedPeopleSameName = [],
    jb_attach_uploads = [],
    _gifs = [],
    _maps_db = [];
function testWebSocket() { 
    websocket = new WebSocket("ws://localhost:3000"); // WHAT URL SHOULD BE USED HERE? 
    websocket.onopen = function(evt) { console.log("WBS OPEN") }; 

    websocket.onclose = function(evt) {console.log(evt); console.log("WBS CLOSE") }; 
    websocket.onmessage = function(evt) { console.log("WBS MESSAGE") }; 
    websocket.onerror = function(evt) { console.log(evt);console.log("WBS ERROR") }; 
}  
function twebs(){
  if ("WebSocket" in window)
        {
            var conn = new WebSocket('ws://localhost:3000');

            conn.onopen = function(e) {
                console.log("Connection established!");
                showMessage('Connected', 0);
            };

            conn.onmessage = function(e) {
                console.log(e.data);
                showMessage(e.data, 1);
            };

            conn.onclose = function(e) {
                console.log(e.code);
                console.log(e.reason);
            };              

            conn.onerror = function(e) {
                console.log(e);
            };      

        } else {
            console.log('Your browser does not support Websocket!');
        }
}
	function showMessage(msg, append){
         console.log(msg);
	}
function debounce(e, t, o) {
    var n = void 0;
    return function() {
        var i = this,
            r = arguments,
            a = o && !n;
        clearTimeout(n), n = setTimeout(function() {
            n = null, o || e.apply(i, r)
        }, t), a && e.apply(this, r)
    }
}

function checkFeedItemsSize(ms_container, ms_items) {


    var _is_permm = localStorage.getItem('feed_waiting_anim');
    if(_is_permm) return;
    ms_items.filter('div.feed')
        .each(function() {
            var pin = ga(this);
            var pinHeight = pin.height();
            var checkSize = function() {
                var _is_permm = localStorage.getItem('feed_waiting_anim');
                if(_is_permm) {
                    setTimeout(checkSize, 1000);
                    return;
                }
                var currHeight = pin.height();
                if(pinHeight != currHeight) {
                    ms_container.masonry('reload', function() {
                        pinHeight = currHeight;
                        setTimeout(checkSize, 500);
                    });
                } else {
                    setTimeout(checkSize, 1000);
                }
            }
            checkSize();
        });
    //setTimeout(function(){wall.fitWidth();},1000);



}

function post_select_dropDown() {
    var select_c = $('.scn_selector[data-selector-size]')
        .length != 0 ? $('.scn_selector[data-selector-size]') : $('.scn_selector');
    select_c.css('width', select_c.data('selector-size'))
        .on('click', function(e) {
            e.preventDefault();
            var $this = jQuery(this);
            $this.find('section')
                .show();
        })
        .find('section')
        .css('width', select_c.outerWidth() - 4);
}
window.onload = function() {
    post_select_dropDown();
}

function evstop(e, p) {
    if(p) e.preventDefault();
    e.stopImmediatePropagation();
}

function createUrl(state, title, url) {
    history.pushState(state, title, url)
}

function f(a, b) {
    return a.find(b);
}

function trim(a) {
    return $.trim(a.val());
}

function apErr(t, el, cl) {
    return ga('<span class="new_user_reg_form_info_err ' + (typeof cl != 'undefined' ? cl : '') + '" data-textmsg="true">' + t + '</span>')
        .insertAfter(el);
}

function prn_modal() {
    ga('.modal-new,.orig-modal,.sct')
        .remove();
    ga('html').removeClass('bezovr');
}
// video click play
function playVDP(e, obj) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(obj);
    playThisVideo($this, $this.data('video-meta'));
}

function removeMinVideoFromDOM() {

    ga('#min_vd_fly').remove();

}

function playThisVideo(vd_el, data, flying, from) {


    var videoViewsAdd = function(id) {
        // +1 view
        var send = jAjax('/cmd.php', 'post', {
            cmd: "video_add_views",
            "vid": id,
            "clubid": data.vd_clubid > 0 ? data.vd_clubid : 0
        });
        /*send.done(function(d){
	   
								alert(d);
	   
						});*/
    };
    //vd_el.flowplayer();
    if(!flying) vd_el.hide();
    // select the above element as player container

    var container = vd_el.closest('.feed_mediavideos').length ? vd_el.closest('.feed_mediavideos').find("#videojw_" + data.vd_i)[0] : (vd_el.closest('.media-block.media-video').length ? vd_el.closest('.media-block.media-video').parent().find("#videojw_" + data.vd_i)[0] : ( vd_el.closest('#video_all').length ? vd_el.closest('.vp-layer_cnt').find("#videojw_" + data.vd_i)[0] : vd_el.closest(".feed_videos_cnt").find("#videojw_" + data.vd_i)[0]));//document.getElementById("videojw_" + data.vd_i);
    var custom_size = vd_el.data('customsize') ? vd_el.data('customsize')
        .split('|') : '';
    var is_mywall = ga('body .__wall')
        .length;
    var video_wd = is_mywall && !vd_el.closest('#video_all')
        .length ? 564 : (vd_el.closest('#video_all')
            .length ? 664 : (custom_size ? custom_size[0] : 548));
    var video_hg = is_mywall && !vd_el.closest('#video_all')
        .length ? 208 : (vd_el.closest('#video_all')
            .length ? 375 : (custom_size ? custom_size[1] : 308));

    video_wd = vd_el.closest('.mdialog_chat_conversation_cnt').length ? 343 : video_wd;
    video_hg = vd_el.closest('.mdialog_chat_conversation_cnt').length ? 186 : video_hg;

    video_wd = vd_el.width();
    video_hg = vd_el.height();

    container.style.display = 'block';
    var is_vimeo;

    /*
    if (data.vd_ext == 'YouTube')
    {
    	var mediaElementMarkup = '<video autoplay width="' + video_wd + '" height="' + video_hg + '" id="mdel_vd_' + data.vd_i + '" preload="none">\
    							<source type="video/youtube" src="' + data.vd_fn + '" />\
    							</video>';

    }
    else if (data.vd_ext == 'Vimeo')
    {
    	var mediaElementMarkup = '<iframe id="vm_vd_' + data.vd_i + '" src="' + data.vd_fn + '?api=1&autoplay=1" width="' + video_wd + '" height="' + video_hg + '" class="vd_vimeo_player" frameborder="0"></iframe>';
    	is_vimeo = true;
    	
    	
    	video/vimeo
    }
    else
    */

    data.vd_ext = data.vd_ext == 'NULL' ? '' : data.vd_ext;
    var v_poster = data.vd_clubid > 0 ? '/videoCover?v=' + data.vd_i + '&clubid=' + data.vd_clubid + '&_tk=' + new Date().getTime() : '/videoCover?v=' + data.vd_i + '&_tk=' + new Date().getTime();

    if(data.vd_s3 == 'yes') {

        var mediaElementMarkup = '<input type="hidden" id="curvideo_lv_time" /><video width="' + video_wd + '" height="' + video_hg + '" src="' + data.s3_url + data.vd_s3_userid + '/' + data.vd_fn + '" type="video/' + data.vd_ext + '" \
								  id="mdel_vd_' + data.vd_i + '" poster="' + v_poster + '" \
							      controls="controls" preload="none" autoplay></video>';

    } else if(data.vd_ext == 'mp4') {
        var mediaElementMarkup = '<input type="hidden" id="curvideo_lv_time" /><video width="' + video_wd + '" height="' + video_hg + '" src="' + _st.host + '/' + data.vd_p + data.vd_fn + '.' + data.vd_ext + '" type="video/' + data.vd_ext + '" \
								  id="mdel_vd_' + data.vd_i + '" poster="' + v_poster + '" \
							      controls="controls" preload="none" autoplay></video>';


    } else {
        var mediaElementMarkup = '<input type="hidden" id="curvideo_lv_time" /><video autoplay width="' + video_wd + '" height="' + video_hg + '" id="mdel_vd_' + data.vd_i + '" preload="none">\
									<source  src="' + data.vd_fn + '" />\
									</video>';
    }

    //vd_el.replaceWith(mediaElementMarkup);
    container.innerHTML = mediaElementMarkup;
    var media, updateLiveVideoTime;

    var vd_player = new MediaElementPlayer('mdel_vd_' + data.vd_i, {

        // This is needed to make Jump Forward to work correctly
        pluginPath: _st.host + '/cmd/mediaelement/build/',
        setCurrentTime: 9,
        startLanguage: __g_lang,
        features: ['playpause', 'current', 'progress', 'duration', 'speed', 'skipback', 'jumpforward', 'tracks',
					'markers', 'volume', 'fullscreen', 'chromecast', 'ads', 'vast', 'contextmenu'],

        success: function(mediaElement, domObject) {
            media = mediaElement; // make it available for other functions
            videoViewsAdd(data.vd_i);

            // add event listeners
            mediaElement.addEventListener('timeupdate', function(e) {
                ga('#curvideo_lv_time').val(media.getCurrentTime());
            }, false);



        }

    });
    from = from || (ga('.startFrom').length ? ga('.startFrom').attr('id') : false);
    if(from)
        media.setCurrentTime(from); // set star




    /*
    var player = new MediaElementPlayer('#mdel_vd_' + data.vd_i,
    {
    	// path to Flash and Silverlight plugins
    	///pluginPath: '/cmd/mediaelement/build/',
    				stretching: 'none',
    		pluginPath: '/cmd/mediaelement/build/',
    	// name of flash file
    	//flashName: 'flashmediaelement.swf',Â plugins: ['flash','silverlight'],
    	//mode:'auto_plugin',timerRate: 100
    	///plugins: ['flash', 'silverlight'],
    //	autoplay: true,
    	// force iPad's native controls
    //	iPadUseNativeControls: true,
    	// force iPhone's native controls
    //	iPhoneUseNativeControls: true,
    	// force Android's native controls
    //	AndroidUseNativeControls: true,
    //	preload: 'none',
    	//silverlightName: 'silverlightmediaelement.xap',
    	
    				success: function (media) {
    					
    					player.load();
    	player.play();
    					
    			var renderer = document.getElementById(media.id + data.vd_i);

    			media.addEventListener('loadedmetadata', function () {
    				var src = media.originalNode.getAttribute('src').replace('&amp;', '&');
    				if (src !== null && src !== undefined) {
    					renderer.querySelector('.src').innerHTML = '<a href="' + src + '" target="_blank">' + src + '</a>';
    					renderer.querySelector('.renderer').innerHTML = media.rendererName;
    					renderer.querySelector('.error').innerHTML = '';
    				}
    			});

    			media.addEventListener('error', function (e) {
    				renderer.querySelector('.error').innerHTML = '<strong>Error</strong>: ' + e.message;
    			});
    		}
    	//
    	success: function (media, node, player)
    	{
    		media.play();
    		var $pl = $(node)
    			.closest('.mejs-container');
    		videoViewsAdd(data.vd_i);
    		// add event listener
    		media.addEventListener('playing', function (e)
    		{
    			$pl.addClass('__vdplaying');
    			//alert('play')
    		}, false);
    		// add event listener
    		media.addEventListener('canplay', function (e)
    		{
    			if (!this.played_o) media.play();
    			this.played_o = 1;
    		}, false);
    		media.addEventListener('pause', function (e)
    		{
    			$pl.removeClass('__vdplaying');
    		}, false);
    		media.addEventListener('ended', function (e)
    		{
    			$pl.removeClass('__vdplaying');
    		}, false);
    	},
    	error: function ()
    	{
    		alert('Error setting media!');
    	}
    });*/

}
// moder popup
function modernPopup(func, no_cancel_btn, text) {

    ga('#sc_modern_popup').remove();


    ga('body').prepend('<div id="sc_modern_popup" class="sc_modern_popup"><div class="sc_moder_popup_ovr"></div><div id="sc_modern_popup_cnt">\
		<div class="modernPopup_scnt"></div>\
		<div class="modernPopup-Confirm-footer">' + (no_cancel_btn ? '' : '<div onclick="ga(\'#sc_modern_popup\').remove();" class="modernPopup-Confirm-button modernPopup-Confirm-button-cancel">' + lang.Cancel + '</div>') + '<div id="modernpopup-confirm-btn" class="modernPopup-Confirm-button">' + lang.Ok + '</div></div>\
		</div></div>');

    func(ga('#modernpopup-confirm-btn'), ga('.modernPopup_scnt'), ga('.modernPopup-Confirm-button-cancel'));

    if(text) {

        ga('#modernpopup-confirm-btn').on('click', function(e) {
            ga('#sc_modern_popup').remove();

        });

        return ga('.modernPopup_scnt').html('<div class="modern_popup_str">' + text + '</div>');

    }

}
// confirmation dialog
function confirm_act(text, callback, l, cancel, btns) {
    var close_confirm = function(a) {
        // $('body').find('#confirmation_dialog').fadeOut(10, function() {
        ga('body')
            .find('#confirmation__dialog')
            .remove()
        /// });
    }
    close_confirm();
    var cnf = new jBox('Confirm', {
        content: !l ? text : lang.confirm_logout,
        id: 'confirmation__dialog',
        animation: false,
        confirmButton: btns ? btns.confirm_button : (l ? lang.logout : lang.okay),
        cancelButton: btns ? btns.cancel_button : lang.cancel,
        zIndex: 999999,
        confirm: function(ev) {
            //var ev = event || window.event;
            // e.preventDefault();
            //close_confirm();
            callback(ev);
        },
        cancel: function(ev) {

            if(cancel) cancel(ev);
        },
        //cancel: function(){}
    });
    cnf.open();
    /*
        var request = jAjax(cDialogUrl, 'get', '');
        request.done(function(html) {
            var $body = $('body');
            var rData = jprintf(html, !l ? text : lang.confirm_logout, lang.okay, lang.cancel);

            if ($('#confirmation_dialog').length != 0)
                return false;
            else {


                $body.prepend(rData).find('.dialog_content').switchClass('__hidden', '__visible', 100).find('#c_okay').on('click', function(e) {
                    e.preventDefault();
                    close_confirm();
                    callback(e);

                });

                $body.find('#c_cancel').on('click', function(e) {
                    e.preventDefault();
                    close_confirm();


                });

                if (l) {
                    $('#c_okay').text(lang.logout);
                }

            }

        });
    	*/
}

window.whitespaceRegex = /[\t\r\n\f]/g;

function ge(el) {
    return (typeof el == 'string' || typeof el == 'number') ? document.getElementById(el) : (typeof el == 'jQuery' ? el : $(el));
}

function isChecked(el) {
    el = ge(el);
    return hasClass(el, 'on') ? 1 : '';
}

function toggleClass(obj, name, v) {
    if(v === undefined) {
        v = obj.hasClass(name);
    }
    (v ? addClass : removeClass)(obj, name);
    return v;
}

function addClass(obj, name) {
    if((obj = ge(obj)) && !hasClass(obj, name)) {
        obj.className = (obj.className ? obj.className + ' ' : '') + name;
    }
}

function removeClass(obj, name) {
    if(obj = ge(obj)) {
        obj.className = trim((obj.className || '').replace((new RegExp('(\\s|^)' + name + '(\\s|$)')), ' '));
    }
}

function hasClass(obj, name) {
    obj = ge(obj);
    if(obj &&
        obj.nodeType === 1 &&
        (" " + obj.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + name + " ") >= 0) {
        return true;
    }

    return false;
}

function ga(a) {
    return $(a);
}

function checkbox(el, v) {
    el = ga(el);
    // if (!el || hasClass(el, 'disabled')) return;
    if(!el || el.hasClass('disabled')) return;


    // toggleClass(el, 'on', v);
    $(el).toggleClass("on");
    return false;
}

function scrollBackBtnTrigger(a, ev, to) {

    ev.preventDefault();

    var $this = $(a);

    $this.remove();
    $('body').scrollTop(to);
}

function createScrollBack() {
    var $_b = $('body');
    var _last_scroll_pos = $_b.scrollTop();
    if(!$_b.find('#_theme_down_arr').length) {

        $_b.find('#mainContent').append('<div onclick="scrollBackBtnTrigger(this,event,' + _last_scroll_pos + ');" class="theme_down_ic" id="_theme_down_arr"><div class="th_down_txt">' + lang.back + '</div><div class="ic dwth_ic"></div></div>');

    }

    $(window).off('scroll.backbtn').on('scroll.backbtn', function(e) {

        if($(this).scrollTop() >= _last_scroll_pos) {
            $_b.off('scroll.backbtn');
            $('#_theme_down_arr').fadeOut(800, function() {
                $(this).remove()
            });
        }
    });

}
/* Themes preview
-------------------------*/

function themePreview(id, object, evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var $object = $(object),
        $_b = $('body');
    // close preview
    var close_theme_preview = function(e) {
        e.preventDefault();
        ga('#hook_Modal_popLayerModalTHPRVW')
            .remove();
    }
    ajaxLoading();
    var send = jAjax($object.attr('href'), 'post', 'action=preview&i=' + escape(id));
    send.done(function(data) {
        removeAjaxLoad();
        var d = validateJson(data);



        var _theme_prf_p = ga('#user-r-theme-loc');
        createScrollBack();
        var m = '<div class="uprf_coll_abs_kn"><div class="vp_header_kn_theme_bg"></div><div class="cover_t_c_repeat dzsparallaxer"><div id="hook_Block_ThemeTopCenterImageRB" class="hookBlock"><img class="kn_img_setted divimage dzsparallaxer--target" alt="" id="th_v_bod"></div></div></div>';

        _theme_prf_p.html(m);



        ga('.vp_header_kn_theme_bg').removeAttr('style').attr('style', 'background-image:url(' + d.body + ')');
        ga('#th_v_bod').attr('src', d.photo);
        ga('html').animate({
            'scrollTop': 20
        }, 800);


        var send = jAjax($object.attr('href'), 'post', 'action=save&i=' + escape(id));
        send.done(function(data) {
            if(data === '0') {
                // error
                return displayErr(lang.err_save_theme);
            } else {

                kn_liveNotif(lang.theme_updated, 'done', 3500, lang.theme_was_successfully_updated);
            }

        });
        /* params
         @str = text notif
         @l = offset left
         @t = offset top
         @c = color
        */
        /*
        var $d = $(data);
        $('body')
        	.prepend($d);
        $d.find('.ic_close-w, #button_previewCancel, #popLayer_mo')
        	.on('click', function (e)
        	{
        		close_theme_preview(e);
        	});
        // save theme
        $d.find('#hook_FormButton_button_previewConfirm')
        	.on('click', function (e)
        	{
        		e.preventDefault();
        		var send = jAjax($object.attr('href'), 'post', 'action=save&i=' + escape(id));
        		send.done(function (data)
        		{
        			if (data === '0')
        			{
        				// error
        				return displayErr(lang.err_save_theme);
        			}
        			else
        			{
        				var res = validateJson(data);
        				$('#t_cover_th_vw')
        					.removeAttr('style')
        					.find('img')
        					.removeAttr('src')
        					.attr('src', res.photo + '?v=' + Math.random());
        				$('body #st_left_right_theme')
        					.replaceWith('<style id="st_left_right_theme">.cover_t_c_repeat_l, .cover_t_c_repeat_r {   background-image: url(' + res.body + '?v=' + Math.random() + ');}body {    background-image: url(' + res.body + '?v=' + Math.random() + ');}</style>');
        				// success
        				close_theme_preview(e);
        			}
        		});
        	});
        	*/
    });
}

function searchMovies(key) {


    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'search-movies',
        'key': key
    });

    return send;

}

function searchTracks(key) {


    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'postSearchMusic',
        'key': key
    });

    return send;

}

function searchBooks(key) {


    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'search-books',
        'key': key
    });

    return send;

}

function jsonAddSlashes(str) {

    return (str + '')
        .replace(/[\\"']/g, '\\$&')
        .replace(/\u0000/g, '\\0')

}

function userAddMovieToWatched(el, event, clone) {

    el = ga(el);
    var movie_json = objHook(el.parent().find('.hookData').html());

    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'addmovietouser',
        'movie': JSON.stringify(movie_json)
    });

    send.done(function(d) {

        if(clone) {


            if(ga('#user-profile-view').length) {

                var movies_scroll_slider = ga('.uslider_cnt._movies');
                var movie_markup = '<li class="prof_movie_item _replies__highlight"><a href="/page/movie/' + d + '/" hrefattr="true"><div class="movie_cover" style="background-image:url(/movieGetPoster?p=' + encodeURIComponent(movie_json.poster_path) + ')"></div><div class="movie_title">' + movie_json.original_title + '</div></a></li>';

                movies_scroll_slider.scrollLeft(0);
                movies_scroll_slider.prepend(movie_markup);
            }

            if(ga('.movies_pg').length) {
                var movies_while = ga('.movies_ul_while');
                var movie_markup = '<li class="prof_movie_item relative movie_pg_li _replies__highlight"><a href="/page/movie/' + d + '/" hrefattr="true"><div class="movie_cover" style="background-image:url(/movieGetPoster?p=' + encodeURIComponent(movie_json.poster_path) + ')"></div><div class="movie_title">' + movie_json.original_title + '</div></a></li>';
                ga('[rel="input_search_movies"]').val('').trigger('keyup');

                setTimeout(function() {
                    movies_while.prepend(movie_markup);
                }, 500);
            }

            up_href();
        }

    });
}

function marketViewProductInDom() {

    if(ga('.market_view_product').length) {

        market.viewProductInDOM();
    } else {

        market.viewProductInDOM_QUIT();
    }

}

function usersBooksPage() {
    var online_hook = ga('.online-fr_block'),
        u_glob_left_MENU = ga('#profile_left_side_bar');

    if(ga('.books_pg').length) {

        ga('html').scrollTop(0).addClass('bookspg');

        u_glob_left_MENU.hide();
        var top_bar = ga('.toolbar');



        //alert(css);console.log(css);

        setTimeout(function() {

            var css = {

                'width': ga(window).width() - ga('.nav_tool_friends_online').outerWidth() - 16,
                'min-height': ga(window).height() - top_bar.height(),
                'top': top_bar.height(),
                'margin-bottom': '60px',
                'position': 'relative'
                //'border-right':'1px solid #dcdcdc'

            };

            ga('.books_pg').css(css);
        }, 1000);
        //online_hook.css({'border-left':'1px solid rgb(213, 213, 214)','background-color':'#fff','opacity':'0.83'});


    } else {
        online_hook.removeAttr('style');
        ga('html').removeClass('bookspg');
        u_glob_left_MENU.show();
    }




}

function userAddBook(el, event, clone) {

    el = ga(el);
    var book_json = objHook(el.parent().find('.hookData').html());

    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'addbooktouser',
        'book': JSON.stringify(book_json)
    });

    send.done(function(d) {


        if(clone) {


            var book = book_json;
            var bookInfo = book.volumeInfo;
            var poster = bookInfo.hasOwnProperty('imageLinks') ? '/bookGetPoster?p=' + encodeURIComponent(bookInfo.imageLinks.smallThumbnail) : '/bookGetPoster?p=nope';
            var title = bookInfo.title;



            if(ga('#user-profile-view').length) {



                var books_scroll_slider = ga('.uslider_cnt._books');
                var book_markup = '<li class="prof_book_item _replies__highlight">\
										<a href="/page/book/' + d + '/" hrefattr="true">\
										<div class="book_cover" style="background-image:url(' + poster + ')"></div>\
										<div class="book_title">' + title + '</div>\
										</a>\
									</li>';

                books_scroll_slider.scrollLeft(0);
                books_scroll_slider.prepend(book_markup);
            }

            if(ga('html').hasClass('bookspg')) {

                var books_scroll_slider = ga('html');
                var book_markup = '<li class="prof_book_item _replies__highlight">\
										<a href="/page/book/' + d + '/" hrefattr="true">\
										<div class="book_cover" style="background-image:url(' + poster + ')"></div>\
										<div class="book_title">' + title + '</div>\
										</a>\
									</li>';
                ga('[rel="input_search_books"]').val('').trigger('keyup');
                setTimeout(function() {

                    books_scroll_slider.scrollTop(0);
                    ga('.user-books-while').prepend(book_markup);
                }, 1000);

            }


            up_href();
        }




    });
}
// delete cover
function deleteOwnTheme(evt) {

    evt.preventDefault();
    var _elm = ga(evt.target);
    var _cv_id = _elm.attr('id').match(/\d/g).join('');
    return confirm_act(lang.confirm_delete_cover, function(evt) {

        var send = jAjax('/cmd.php', 'post', 'cmd=deletemyowncover&i=' + escape(_cv_id));
        send.done(function(data) {

            if(data === '1') {

                _elm.closest('.ec_theme').css('width', 0).on(crossEvent, function() {
                    ga(this).remove();
                });

            } else {

                return displayErr(lang.err_delete_cover);
            }


        });

    });

}

// show my own themes
function showMyOwnThemes(evt) {

    var $_element = ga(evt.target),
        $_element_id = evt.target.id;
    var _el_par = $_element.parent();


    if(_el_par.hasClass('_show')) {



        _el_par.find('span').html('&#9654;');
        _el_par.find('a').html(lang.show_themes_created_by_me);

        _el_par.find('.my_themes_cnt').hide();

        setTimeout(function() {
            _el_par.removeAttr('style').animate({
                "left": ga('#middleColumn').width()
            }, 900, "linear", function() {


                setTimeout(function() {

                    _el_par.removeClass('_show').removeAttr('style');
                }, 100);




            });
        }, 200);

    } else

    {



        _el_par.animate({
            "right": ga('#middleColumn').width() - ($_element.parent().width() + 10)
        }, 1000, "linear", function() {
            setTimeout(function() {

                _el_par.addClass('_show').removeAttr('style');
                _el_par.find('span').html('&#9660;');
                _el_par.find('a').html(lang.hide);

                _el_par.find('.my_themes_cnt').show();

                if($_element_id in _target_evt) {
                    ga('.knt_themes').html(_target_evt[$_element_id]);
                    ga("img.lazyimg_thm").lazyload();
                    return;
                }

                var send = jAjax('/cmd.php', 'post', 'cmd=showMyOwnThemes');
                send.done(function(data) {

                    if(data != '0') {

                        var b = validateJson(data),
                            thm_markup = '',
                            c = 0;

                        for(var k = 0; k < b.length; ++k) {

                            var a = b[k];


                            thm_markup += (c == 0 ? '<div class="old_own_themes">' : '') + '<div class="ec_theme"><div class="theme_hover_bg" id="ectheme_i' + a.id + '" data-cvposition="' + a.position + '" data-themeurl="' + a.src + '" onclick="return switchToThisTheme(event);"></div><div class="theme_oww_delete"><a href="javascript:;" id="cv_eknfviw_ajji-' + a.id + '-juicy" title="' + lang.delete_cover + '" onclick="deleteOwnTheme(event);" class="x_delete_pp"></a></div><img data-original="' + a.src + '" class="theme_s_img lazyimg_thm" /><div class="theme_added_time" title="' + lang.created + ' ' + a.added + '">' + a.added + '</div> <div class="theme_pp_menu"><div><a href="javascript:;" id="ectheme_i' + a.id + '" data-themeurl="' + a.src + '" onclick="return switchToThisTheme(event);"><i class="ic ic_set_theme"></i>Set this theme</a></div></div> </div>' + (c == 2 ? '</div>' : '');
                            if(c == 2) c = 0;
                            else c++;
                        }

                        // insert content
                        ga('.knt_themes').html(thm_markup);
                        ga("img.lazyimg_thm").lazyload();
                        _target_evt[$_element_id] = thm_markup;

                    } else {


                        ga('.knt_themes').html('<div class="cl-alert-box notice">' + lang.you_dosent_have_your_theme + '</div>');

                    }


                });


            }, 500)
        });
    }
}

// switch to old themes
function switchToThisTheme(evt) {

    evt.preventDefault();
    var $el = ga(evt.target);
    var theme_id = escape($el.attr('id').match(/\d/g).join('')),
        cover_position = escape($el.data('cvposition')),
        cover_url = $el.data('themeurl');
    createScrollBack();
    customCoverSet(cover_url, theme_id, cover_position);

}

// Turn to standart theme
function standartTheme(evt) {

    evt.preventDefault();
    var $el = ga(evt.target);

    return confirm_act(lang.switch_theme_to_default, function(event) {


        var send = jAjax('/cmd.php', 'post', 'cmd=switchToDefaultTheme');
        send.done(function(data) {

            if(data === '1') {

                kn_liveNotif(lang.theme_changed, 'done', 3500, lang.theme_was_successfully_switched_to_default);
                setTimeout(function() {
                    window.location.reload();
                }, 4000);
                ajaxLoading();
            } else displayErr(lang.somethingWrong);

        });


    });



}

// get all participants in a poll
function pollGetTotalVotes(e, optionid) {

    e.preventDefault();

    var $el = ga(e.target);
    var pollId = $el.attr('id').split('pollmiv|')[1];

    var poll_participants = '';
    var poll_u_markup_schel = '<div id="modal_cnt" class="modal_cnt">\
					<div data-block="ShowLikers" class="loader-container">\
					<ul class="cardsList jbpop"></ul></div></div>';

    var p_u_markup = '<li class="cardsList_li show-on-hover">\
                <div class="userCard">\
                    <div class="card_main">\
                        <div class="card_wrp">\
                            <div class="photoWrapper">\
                                <a class="photoWrapper" href="/user/%uid" hrefattr="true"><img src="/getPhoto?p=%pid&sz=thumb&g=%gender" alt="%uname" width="128" height="128">%online</a>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="card_add">\
                        <div class="ellip"><a href="/user/%uid" class="o" hrefattr="true">%uname</a></div>\
                    </div>\
                </div>\
            </li>';


    var jb_ = new jBox('Modal', {
        id: 'forpoll' + pollId,
        title: lang.poll_participants,
        fade: false,
        closeButton: 'box',
        'fixed': true,
        height: 'auto',
        width: '818px',
        minHeight: '100px',
        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        offset: {
            x: 0,
            y: 30
        },
        onClose: function() {
            ga('#forpoll' + pollId).remove();

        }
    });
    jb_.open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'pollParticipants',
                sondageid: pollId,
                optionid: optionid ? optionid : 0,
                view_as: 'json'
            },

            reload: true,
            setContent: false,
            success: function(data) {
                var d = validateJson(data);

                if(d.succ == 1) {

                    ga('#forpoll' + pollId).find('.jBox-content').html(poll_u_markup_schel);

                    for(var i = 0; i < d.data.length; i++) {
                        var b = d.data[i];
                        poll_participants += p_u_markup.replace(/%uid/g, b.uid).replace(/%pid/g, b.uphoto).replace(/%uname/g, b.uname).replace('%gender', b.ugender).replace('%online', b.online ? '<span class="ic-online"></span>' : '');

                    }


                    ga('#forpoll' + pollId).find('ul.cardsList').html(poll_participants);
                } else {

                    displayErr(d.err);

                }

            }
        });
}

/*
@title - Popup title
@data - Popup html content
@w - Popup Width
@h - Popup Height
*/
function kn_popup(title, data, w, h, _cbk, zInd) {

    var _p_markup = '<section style="z-index:' + zInd + '" id="kn_popup" class="_window"><div class="layer_ovr"></div><div class="kn_popup_box" style="' + (w && w != 'auto' ? 'width:' + w + 'px;' : '') + (h ? 'height:' + h + 'px;' : '') + '"><div class="kn_popup_header"><div class="kn_popup_title">' + title + '</div><div class="kn_popup_close"></div></div><div class="kn_popup_cnt">' + data + '</div></div></section>';
    var $_bb = $('body');
    $_bb.find('#kn_popup').remove();
    if(!$_bb.find('#kn_popup').length) {
        $_bb.addClass(_nscroll);
        $_bb.append(_p_markup).find('.kn_popup_close,.layer_ovr').off('click.kn_p_close').on('click.kn_p_close', function(e) {

            e.preventDefault();

            $_bb.find('#kn_popup').remove();
            $_bb.removeClass(_nscroll);

        });
        // shortcut for KN popup
        ga(window).off('keyup.kn_popup').on('keyup.kn_popup', function(e) {

            if(e.keyCode == 27) return ga('.kn_popup_close').trigger('click');

        });
        if(_cbk)
            _cbk($_bb.find('#kn_popup'));
    }


}

function createTheme(el, ev) {

    ev.preventDefault();

    var $el = $(el);

    var _choose_btn = '<div class="cr_theme_btn"><div class="cr_theme_progress_br"></div><form method="post" enctype="multipart/form-data"><input type="hidden" name="method" value="cover"/><input type="hidden" value="1" name="submit"/><input onchange="return uploadProfileCovers(this,event,\'1\',\'cover\');" class="_ff_slw_sorting html5-link-upload cr_inputfile" type="file" accept="image/*" name="file[]"><i class="ic ic_theme_from_comp"></i><span class="cr_th_txt">' + lang.upload_from_computer + '</span></form></div><div class="cr_theme_btn" onclick="themeBuildSlideshow(this,event);"><i class="ic ic_theme_slideshow"></i><span class="cr_th_txt">' + lang.create_theme_slideshow + '</span></div>';
    kn_popup(lang.New_theme, _choose_btn, 'auto', 185);


}

function updateRangeValue(el) {
    var _val = el.value;
    el = ga(el);
    el.val(_val);
    el.parent().find('.slider-inp-val').text(_val + 'ms');

}

function getUserSphotoAlbums(evt, sucfunc) {
    evt.preventDefault();
    evt.stopPropagation();
    var _el_id = evt.target.id;
    if(_el_id in _target_evt) {
        return sucfunc(_target_evt[_el_id]);
    }
    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', 'cmd=getmyphotoalbums');
    send.done(function(data) {
        removeAjaxLoad();
        var __d = validateJson(data);
        sucfunc(__d);
        _target_evt[_el_id] = __d;
    });
    send.fail(function(a, b, c) {
        return displayErr(a + b + c);
    });

}

// get user's photos by respective album
function getUserSphotosFalbum(evt, alb, callf) {

    evt.preventDefault();
    evt.stopImmediatePropagation();
    var _el_id = evt.target.id;


    alb = ga(alb);
    var alb_id = alb.attr('id').match(/\d/g).join('');
    //if(_el_id in _target_evt){ return callf(_target_evt[_el_id],alb_id);}
    ajaxLoading();

    var send = jAjax('/cmd.php', 'post', 'cmd=getphotosfromalbum&alb_id=' + escape(alb_id));
    send.done(function(data) {

        removeAjaxLoad();
        var __d = validateJson(data);
        callf(__d, alb_id);
        //_target_evt[_el_id] = __d;
    });
    send.fail(function(a, b, c) {
        return displayErr(a + b + c);
    });

}

function slideshowPopupResetToDefault(el, ev) {

    ev.preventDefault();


    ga(el).remove();
    ga('.section_alb_all_im').remove();
    ga('.h_ex_your_ph').show();
    ga('#slshow_config_h').show();
}

/*
@a - array [ count, data ]
@a_id - album id (number)
*/
function slideshowPhotosFromAlbum(a, a_id) {

    var _all_jeunim = '';
    var _img_app_space = $('#slshow_config_h'),
        _slshow_img_con = $('#slideshow_images_an_config');
    _img_app_space.hide();

    $('.list-albums-o').fadeOut();


    if(!_slshow_img_con.find('#images_for_alb_' + a_id).length) {

        for(var i = 0; i < a.data.length; i++) {
            var _eud = a.data[i];
            _all_jeunim += '<div class="slideshow_my_im_item" id="im-' + _eud.id + '"><div class="slideshow_item_checked ic"></div><img src="/getPhoto?p=' + _eud.id + '&sz=small" /></div>';
        }

        // hide "explore photos btn" and show back button
        var _expl_btn = $('.h_ex_your_ph');
        _expl_btn.hide();
        if(!_expl_btn.parent().find('.__return_slsh_pp').length) {
            _expl_btn.after('<div class="sk43_return_btn" onclick="slideshowPopupResetToDefault(this,event);"><i class="ic ic-return-b-blue"></i>' + lang.back + '</div>');

        }


        _slshow_img_con.append('<div class="section_alb_all_im" id="images_for_alb_' + a_id + '"><div class="all_img_he_sec">' + a.count + ' images</div><div class="nano"><div class="nano-content">' + _all_jeunim + '</div></div></div>');
        ga(document).off('click.select_oP').on('click.select_oP', '.slideshow_my_im_item', function(e) {

            e.stopPropagation();
            var $_this = $(this),
                c_im = 0;

            // before check if need to remove elements
            ga('.o_photo_slideshow').each(function() {

                var _this = ga(this);

                if(_this.hasClass('_noopac') || _this.hasClass('__occ'))
                    c_im++;

            });

            if(c_im >= 6) {
                kn_liveNotif(lang.reached_limit_of_photos, 'warn', 6000, lang.remove_images_that_you_want_to_replace);
                return;
            }

            if($_this.hasClass('__on')) {

                $_this.removeClass('__on');
                c_im = c_im - 1;
            } else {
                ajaxLoading();

                var __add_to_slideshow_cnt = ga('#photos_sort_slideshow');
                var _slsh_photos_co = $('.o_photo_slideshow').filter(':not(.__occ):not(._noopac):first'),
                    _slsh_photos_co_id = _slsh_photos_co.attr('id');
                var _this_img_src = $_this.find('img').attr('src');


                var copy_images = jAjax('/cmd.php', 'post', 'cmd=copyImagesToSlideshow&img_id=' + escape($_this.attr('id').match(/\d/g).join('')));
                copy_images.done(function(data) {
                    removeAjaxLoad();

                    if(data > 0) {

                        _slsh_photos_co.addClass('__occ').attr({
                            'data-sop': $_this[0].id,
                            'data-originali': $_this.attr('id')
                        }).find('.slideshow-preview-uploaded-img').attr('style', 'background-image:url(' + _this_img_src + ')');
                        _slsh_photos_co.find('[data-slideshowremoveitem="1"]').attr('id', 'slshowim_' + data);


                        //.find('.slideshow-preview-uploaded-img').attr('style','background-image:url('+_this_img_src+')');
                        //$_this.css('position','absolute').animate({'top': '-100px'},10000);
                        $_this.addClass('__on');
                        c_im = c_im + 1;
                    } else {

                        displayErr(lang.err_slideshow_copy_photo);

                    }
                });
            }

        });
        var _nano_scroll_simg = $('#images_for_alb_' + a_id + ' .nano'),
            p = 2,
            randId = Math.floor(Math.random() * 2);

        _nano_scroll_simg.nanoScroller();
        _nano_scroll_simg.off('scrollend.a' + randId).on('scrollend.a' + randId, function() {


            var _get_more_photos = jAjax('/load-more-data.php', 'post', 'cmd=profilePersonalPhotosMore&album=' + escape(a_id) + '&json_code=1&i=' + escape(_U.i) + '&p=' + (p++));
            _get_more_photos.done(function(data) {

                var _b = validateJson(data);

                if(_b.length) {

                    for(var k = 0; k < _b.length; k++)
                        $('#images_for_alb_' + a_id + ' .nano .nano-content').append('<div class="slideshow_my_im_item" id="im-' + _b[k].id + '"><div class="slideshow_item_checked ic"></div><img src="/getPhoto?p=' + _b[k].id + '&sz=small&g=' + _U.g + '"></div>');

                    _nano_scroll_simg.nanoScroller();

                } else {

                    _nano_scroll_simg.off('scrollend.a' + randId);

                }

            });

        });

    }

}

// get user's photo albums for slideshow
function slideshowGPhotoAlbums(a) {
    var albums_html = '';
    var albums_explore_btn = $('.h_ex_your_ph');


    if(albums_explore_btn.find('.list-albums-o').length) return albums_explore_btn.find('.list-albums-o').fadeIn();

    for(var i = 0; i < a.length; i++) {
        var _xkoe = a[i];
        albums_html += '<div id="sl-i-alb-' + _xkoe.id + '" onclick="evstop(event);getUserSphotosFalbum(event,this,function(data,id){slideshowPhotosFromAlbum(data,id);});" class="col-card __no-decor _novitrina ovr-menu_soh">\
						<div><div class="photo-sc_i_cover">\
						<div class="photo-sc_i_cnt __prw">\
						<a href="javascript:void(0)" class="photo-sc_i_cnt_a">\
						<img class="photo-sc_i_cnt_a_img va_target" src="/getPhoto?p=' + _xkoe.cover + '&sz=thumb">\
						<div class="col-card_ovr"></div></a></div></div>\
						<div class="photo-sc_grid_abt ellip">\
						<span class="o" title="' + _xkoe.name + '">' + _xkoe.name + '</span><span class="alb_count_pp">' + _xkoe.count + ' photos</span></div></div></div>';
    }
    if(!albums_explore_btn.find('.list-albums-o').length) {

        albums_explore_btn.append('<div class="list-albums-o" onclick="evstop(event);"><div class="up_arr_st3"></div><div class="nano albums_list-9q0" ><div class="nano-content">' + albums_html + '</div></div></div>');
        ga(".list-albums-o .nano").nanoScroller();
        ga(window).off('keyup.slideshow-dropdownhide').on('keyup.slideshow-dropdownhide', function(ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            if(ev.keyCode == 27)
                albums_explore_btn.find('.list-albums-o').fadeOut();
        });
        ga('body').off('click.slideshow-dropdownhide').on('click.slideshow-dropdownhide', function(e) {
            //e.preventDefault();
            albums_explore_btn.find('.list-albums-o').fadeOut();
        });
    }
}

function X_validateUpload(elem) {
    var _validFileExtensions = [];

    elem = elem instanceof jQuery ? elem.val() : ga(elem).val();

    for(var k = 0; k < _st.photoTypes.length; k++)
        _validFileExtensions.push('.' + _st.photoTypes[k]);


    if(!elem.hasExtension(_validFileExtensions))
        return false; //displayErr('Error at uploading these files');
    else
        return true;
}

function validateUpload(elem) {

    elem = elem instanceof jQuery ? elem : ga(elem);
    elem = elem
        .val()
        .replace(/C:\\fakepath\\/i, "")
        .split('.')
        .pop()
        .toLowerCase();

    if($.inArray(elem, _st.photoTypes) == -1 && $.trim(elem))
        return false;
    else
        return true;


}



// change site language
function globalLangSet(evt) {

    evt.preventDefault();
    var _a = ga(evt.target);
    var _l_markup = '';
    if(!_a.hasClass('open')) {
        ajaxLoading();
        var send = jAjax('/cmd.php', 'post', 'cmd=getSiteLanguagesList');
        send.done(function(d) {
            removeAjaxLoad();
            var _data = validateJson(d);

            for(var i = 0; i < _data.length; ++i)
                _l_markup += '<option  ' + (__g_lang == _data[i].lang_a ? 'selected' : '') + ' value="' + _data[i].lang_a + '">' + _data[i].lang_str + '</option>';

            _a.before('<select class="lang_p_box_sel">' + _l_markup + '</select>');
            ga('.lang_p_box_sel').selectmenu();
            ga('#gl_lang_set').hide();

            ga(document).off('selectmenuchange.changeLanguage').on("selectmenuchange.changeLanguage", '.lang_p_box_sel', function(ev, ui) {
                ajaxLoading();
                var send = jAjax('/cmd.php', 'post', {
                    'cmd': 'updateUserLanguage',
                    'lang': ui.item.value
                });
                send.done(function(d) {
                    removeAjaxLoad();
                    if(d == 1) {
                        window.location.reload();
                    }


                });

            });

        });




    }


}

// forgot pass
function forgotFormSend() {

    var f_email = ga('#forgot_input'),
        _error = ga('#error');

    if(!validateEmail(f_email.val())) {
        f_email.addClass('error');
        _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.forgot_invalid_email + '</b><br/>' + lang.forgot_invalid_email_sub + '</div></div>');
        return;
    } else {

        f_email.removeClass('error');
        _error.empty();

        ajaxLoading();
        var send = jAjax('/cmd.php', 'post', {
            cmd: 'forgotPass',
            mail: f_email.val()
        });
        send.done(function(data) {
            removeAjaxLoad();
            if(data == '2' || data == '0') {

                f_email.addClass('error');
                _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.forgot_email_not_found + '</b><br/>' + lang.forgot_invalid_email_sub + '</div></div>');
            } else if(data == '3') {
                _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.forgot_email_not_sent + '</b><br/>' + lang.forgot_not_sent_descr + '</div></div>');
            } else {

                ga('.restore_page_section').html('<b>' + lang.forgot_mail_sent.replace('%s', f_email.val()) + '</b>');
                ga('.bottom_row').empty();
            }

        });

    }

}

function forgotSetNewPass() {

    var pass_field_o = ga('#pass_field_o'),
        pass_field_t = ga('#pass_field_t'),
        code = ga('[name="code"]'),
        _error = ga('#error');

    if(pass_field_o.val().length < 6)
        return _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.Error + '</b><br/>' + lang.newPasswordIsTooShort + '</div></div>');


    if(pass_field_o.val() !== pass_field_t.val()) {
        return _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.Error + '</b><br/>' + lang.passDontMatch + '</div></div>');


    }
    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'forgotSetNewPass',
        'email': ga('[name="email"]').val(),
        'rps': ga('[name="rps"]').val(),
        'repass': pass_field_o.val(),
        'newpass': pass_field_t.val(),
        'code': code.val()
    });
    send.done(function(data) {

        removeAjaxLoad();
        if(data == '2')
            return _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.Error + '</b><br/>' + lang.newPasswordItSame + '</div></div>');
        else if(data == '3')
            return _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.Error + '</b><br/>' + lang.newPasswordIsTooShort + '</div></div>');
        else if(data == '4')
            return _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.Error + '</b><br/>' + lang.passwordDidntMatch + '</div></div>');
        else if(data == '1') {
            kn_liveNotif(lang.forgot_pass_updated_title, 'done', 4000, lang.forgot_pass_updated_descr);
            setTimeout(function() {
                window.location = '/';
            }, 4500);
        } else return displayErr(lang.err_tehnic);

    });

}

// custom covers set 
function customCoverSet(cover_url, theme_id, pos) {



    ga('.kn_popup_close').trigger('click');
    var _df_id_theme = ga('#user-r-theme-loc');
    var _df_theme_ = _df_id_theme.html();




    _df_id_theme.html('<div class="vp_header_custom_theme"><img src="' + cover_url + '" class="kn_theme_cust_cover"></div><input type="hidden" name="kover_pos_r" id="kn_kover_pos_val"/><div class="theme_custom_cvk_sv"><div class="reposition_cover">' + lang.drag_to_reposition_cover + '</div><div class="fl_right"><button id="cancel_wrap_theme" class="flat_button _cancel mr_r12">' + lang.cancel + '</button><button class="flat_button" id="save_wrap_theme">' + lang.save + '</button></div></div>')
        .find('#cancel_wrap_theme').off('click.cancelTheme').on('click.cancelTheme', function(e) {
            e.preventDefault();
            _df_id_theme.html(_df_theme_);

        });
    ga(document).off('click.saveTheme', '#save_wrap_theme').on('click.saveTheme', '#save_wrap_theme', function() {

        ajaxLoading();
        var send = jAjax('/cmd.php', 'post', 'cmd=saveWrapCover&theme_pos=' + escape(ga('#kn_kover_pos_val').val().replace('px', '')) + '&theme_id=' + escape(theme_id));
        send.done(function(data) {

            removeAjaxLoad();
            if(data === '1') {
                var drg_img = ga(".vp_header_custom_theme img");
                drg_img.draggable('destroy');
                drg_img.addClass('curdef');
                ga('#kn_kover_pos_val,.theme_custom_cvk_sv').remove();
                kn_liveNotif(lang.theme_saved, 'done', 4000, lang.now_the_theme_is_visible_into_your_profile);
            } else kn_liveNotif(lang.cover_was_not_saved, 'error', 4000, lang.err_save_theme);

        });


    });

    setTimeout(function() {

        ga(".vp_header_custom_theme").imagedrag({
            input: "#kn_kover_pos_val",
            position: pos ? pos + 'px' : 'middle',
            attribute: "value"
        });
    }, 100);




    setTimeout(function() {
        ga(window).scrollTop(0);
    }, 500);




}


/* upload user's profile cover
@param element "inp" - file input
@param event "evt" - window event
@param number "i_d" - square id
@param string "mth" - method
*/


function uploadProfileCovers(el, evt, i_d, mth) {

    var input = ga(evt.target);
    var _form_i = input.parent();
    var form_data = new FormData(_form_i[0]);

    $.ajax({
        url: _st.uploadCovers, //Server script to process data
        type: 'POST',
        xhr: function() { // Custom XMLHttpRequest
            var Xhr = $.ajaxSettings.xhr();
            if(Xhr.upload) { // Check if upload property exists
                Xhr.upload.addEventListener('progress', function(e) {
                    var upload_percentage = ajaxuploadprogress(e);

                    if(mth === 'slideshow') ga('#photos_sort_slideshow .upload_bar_percent#pbar-' + i_d).css({
                        'width': upload_percentage + '%',
                        'display': 'inline'
                    });
                    else {
                        _form_i.parent().find('.cr_theme_progress_br').css({
                            'width': upload_percentage + '%'
                        });

                    }
                }, false); // For handling the progress of the upload
            }
            return Xhr;
        },
        //Ajax events
        beforeSend: function(jqXHR) {
            if(!validateUpload(input)) {
                jqXHR.abort();
                return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
            } else {

                if(mth === 'slideshow')
                    ga('#o-' + i_d + ' i').hide();
                else {
                    _form_i.parent().find('.cr_theme_progress_br').css({
                        'width': '0%'
                    });
                    _form_i.find('.cr_th_txt').text(lang.uploading);
                    _form_i.find('.ic_theme_from_comp').addClass('_uploading');
                    //_form_i.closest('.cr_theme_btn').addClass('_uploading');

                }

            }

        },
        success: function(data) {
            var response = validateJson(data);
            if(response['status'] === 'OK') {


                if(response.method === 'cover') {

                    customCoverSet(response.cover_url, response.theme_id);


                } else {

                    var _serch_elm = ga('#o-' + i_d);
                    _serch_elm.addClass('_noopac').attr('data-sid', response.photoid);
                    _serch_elm.find('.attach-photo_del').attr('id', 'slshowim_' + response.photoid);
                    readURL(evt, el, '#i-' + i_d, 1);
                    setTimeout(function() {
                        _serch_elm.find('.upload_bar_percent').fadeOut(1000, function() {
                            ga(this).removeAttr('style')
                        });
                    }, 2000);

                }


            } else return displayErr(data);
        },
        error: function() {
            return displayErr(lang.somethingWrong)
        },
        // Form data
        data: form_data,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });


}

function slshow_remove_item(elm, evt) {

    evt.preventDefault();
    elm = ga(elm);

    var _elm_i = elm.attr('id').match(/\d/g).join('');
    var _elem_orig_id = elm.parent().data('originali');
    var _cls_elem = elm.closest('.o_photo_slideshow');
    var send = jAjax('/cmd.php', 'post', 'cmd=removeImageFromSlideshow&img=' + escape(_elm_i));
    ajaxLoading();
    send.done(function(data) {
        removeAjaxLoad();
        if(data === '1') {
            _cls_elem.removeClass('_noopac __occ').find('.upload_bar_percent').removeAttr('style');
            _cls_elem.find('.slideshow-preview-uploaded-img').removeAttr('style');
            _cls_elem.find('.plus_slideshow_photo').show();
            ga('.slideshow_my_im_item.__on#' + _elem_orig_id).removeClass('__on');
        } else return displayErr(lang.somethingWrong + ' -- [Err. code: ' + data + ']');

    });


}

function themeBuildSlideshow(el, ev) {
    ev.preventDefault();

    var $el = ga(el);
    var _g_data = '',
        _g_photos = '';
    var _slideshow_transition_options = '<option value="fade">fade</option>\
										 <option value="fade2">fade2</option>\
										 <option value="slideLeft">slideLeft</option>\
										 <option value="slideLeft2">slideLeft2</option>\
										 <option value="slideRight">slideRight</option>\
										 <option value="slideRight2">slideRight2</option>\
										 <option value="slideUp">slideUp</option>\
										 <option value="slideUp2">slideUp2</option>\
										 <option value="slideDown">slideDown</option>\
										 <option value="slideDown2">slideDown2</option>\
										 <option value="zoomIn">zoomIn</option>\
										 <option value="zoomIn2">zoomIn2</option>\
										 <option value="zoomOut">zoomOut</option>\
										 <option value="zoomOut2">zoomOut2</option>\
										 <option value="swirlLeft">swirlLeft</option>\
										 <option value="swirlLeft2">swirlLeft2</option>\
										 <option value="swirlRight">swirlRight</option>\
										 <option value="swirlRight2">swirlRight2</option>\
										 <option value="burn">burn</option>\
										 <option value="burn2">burn2</option>\
										 <option value="blur">blur</option>\
										 <option value="blur2">blur2</option>\
										 <option value="flash">flash</option>\
										 <option value="flash2">flash2</option>';

    var _is_slideshow_enabled = '<div class="slideshow_status_on_off"><label>Enabled<input type="checkbox" id="slideshow_enabled_cbox" class="ios-switch tinyswitch"/><div><div></div></div></label></div>';
    var _explore_your_photos = '<div class="h_ex_your_ph" id="slideshow_explore_your_photos84884" onclick="return getUserSphotoAlbums(event,function(a){slideshowGPhotoAlbums(a);});"><i class="ic ic_open_folder"></i>' + lang.explore_your_photos + '</div>';
    var _gphotos_title = '<div class="htitle_ad3rvjp">Add Photos</div>';
    var _gresort_slshow_images = '<div class="checkbox rs_slidesh_imgs" onclick="checkbox(this);$(\'._ff_slw_sorting\').toggleClass(\'off\');" name="slideshow_images_repos">Sorting images<div class="fl_r"></div></div>';
    var _separator_bullet = '<span class="rs_slidesh_bullet">&#8226;</span>';
    var _o_ph_mk_before = '<div id="photos_sort_slideshow">';
    var _o_photo_markup = '<div id="o-%s" data-sid="%s" class="o_photo_slideshow"><div class="upload_bar_percent" id="pbar-%s"></div><div class="attach-photo_del" data-slideshowremoveitem="1" onclick="slshow_remove_item(this,event);" title="' + lang.remove + '" id="slshowim_%s"><div class="ic10 ic10_i_close"></div></div><div class="slideshow-preview-uploaded-img" id="i-%s"></div><i class="plus_slideshow_photo"></i><form method="post" enctype="multipart/form-data"><input type="hidden" name="method" value="slideshow"/><input type="hidden" value="1" name="submit"/><input onchange="return uploadProfileCovers(this,event,\'%s\',\'slideshow\');" class="_ff_slw_sorting html5-link-upload _80" type="file" accept="image/*" name="file[]"></form></div>';
    var _o_ph_mk_after = '</div>';
    var _o_options_hd = '<section id="slideshow_images_an_config"><div id="slshow_config_h"><div class="htitle_ad3rvjp">Slideshow configuration</div>';
    var _o_slideshow_config = '<form class="o4sli2">\
	<div class="checkbox _w100 mt16" onclick="checkbox(this);" name="slideshow_overlay">Overlay<div class="fl_r"></div></div>\
	<div class="checkbox _w100 mt16" onclick="checkbox(this);" name="slideshow_shuffle">Shuffle<div class="fl_r"></div></div>\
	<div class="_select _w100 mt16" onclick="checkbox(this);" name="slideshow_transition">Transition<div class="fl_r"><select id="transition_options_select">' + _slideshow_transition_options + '</select></div></div>\
	<div class="_w100 mt16" name="slideshow_trans_dur">Transition Duration\
	  <div class="slider-wrp">\
            <span class="slider-inp-val"></span><input min="100" max="8000" name="trans.duration" value="500" onchange="updateRangeValue(this);" type="range" class="slide-inp" /></div></div>\
	<div class="checkbox _w100 mt16" onclick="checkbox(this);" name="slideshow_timer">Timer<div class="fl_r"></div></div>\
	<div class="_w100 mt16" onclick="checkbox(this);" name="slideshow_delay">Delay\
	<div class="slider-wrp">\
            <span class="slider-inp-val"></span><input min="1000" max="8000" value="1000" name="delay" onchange="updateRangeValue(this);" type="range" class="slide-inp" /></div>\</div>\
	</form></div></section>';
    var _o_bottom_btns = '<div class="slideshow_bottom_control_btns">' + _is_slideshow_enabled + '<button onclick="event.preventDefault();return ga(\'.kn_popup_close\').trigger(\'click\');" class="btn_a_slideshow_cancel">Close</button><button class="button-pro __small" onclick="return saveSlideshowConfig(event);" id="save_slideshow">Save</button></div>';

    for(var i = 0; i < 6; ++i)
        _g_photos += jprintf(_o_photo_markup, i, i, i, i, i, i);


    _g_data += _explore_your_photos + _gphotos_title + _separator_bullet + _gresort_slshow_images + _o_ph_mk_before + _g_photos + _o_ph_mk_after + _o_options_hd + _o_slideshow_config + _o_bottom_btns;
    kn_popup(lang.New_Theme_slideshow, _g_data, 592, 503, function(popup) {
            var all_square_f_imgs = popup.find('#photos_sort_slideshow');
            all_square_f_imgs.sortable({
                axis: 'x',

                cursor: 'move',

            }).disableSelection();
            ga('select#transition_options_select')
                .selectmenu();
            all_square_f_imgs.on('sortupdate', function(event, photo) {

                var d = ga(this)
                    .sortable('serialize');
                var d = all_square_f_imgs.sortable('serialize', {
                    attribute: 'data-sid', //this will look up this attribute
                    key: 'img[]', //this manually sets the key
                    expression: /(.+)/ //expression is a RegExp allowing to determine how to split the data in key-value. In your case it's just the value

                });

                var reqSortUpdate = $.ajax({
                    url: '/cmd.php',
                    type: 'post',
                    data: d + '&' + $.param({
                        'cmd': 'updateSlideShowPosition'
                    }),
                    cache: false
                });
                reqSortUpdate.done(function(a) {
                    if(a != '1') return displayErr(lang.err_sort_photos);
                });
                reqSortUpdate.fail(function(b, c) {
                    return displayErr(lang.err_req + b.status);
                });
            });

            all_square_f_imgs.css('opacity', '.3');
            ajaxLoading();

            setTimeout(function() {
                var send = jAjax('/cmd.php', 'post', 'cmd=getSlidesShowConfiguration');
                send.done(function(d) {

                    //alert(d);
                    all_square_f_imgs.css('opacity', '1');
                    removeAjaxLoad();

                    var r = validateJson(d),
                        _s_config = r.conf;

                    if(r.photos.length) {


                        for(var b = 0; b < r.photos.length; b++) {
                            d = r.photos[b];

                            var _square_of_ph = ga('.o_photo_slideshow:not(._noopac):first');
                            _square_of_ph.attr('data-sid', d.id);
                            _square_of_ph.addClass('_noopac');
                            _square_of_ph.find('.slideshow-preview-uploaded-img').attr('style', 'background-image:url(' + d.img + ')');
                            _square_of_ph.find('i').hide();
                            _square_of_ph.find('.attach-photo_del').attr('id', 'slshowim_' + d.id);
                        }
                    }


                    if(_s_config.enabled === 'yes') ga('#slideshow_enabled_cbox')[0].checked = true;



                    // set default options
                    if(_s_config.options !== '') {
                        var sl_df_opts = validateJson(_s_config.options);
                        sl_df_opts.overlay != 'false' ? ga('[name="slideshow_overlay"]').addClass('on') : '';
                        sl_df_opts.shuffle != 'false' ? ga('[name="slideshow_shuffle"]').addClass('on') : '';
                        sl_df_opts.timer != 'false' ? ga('[name="slideshow_timer"]').addClass('on') : '';
                        ga('[name="slideshow_trans_dur"]').find('input[name="trans.duration"]').val(sl_df_opts.trans_duration);
                        ga('[name="slideshow_delay"]').find('input[name="delay"]').val(sl_df_opts.delay);
                        ga('[name="slideshow_transition"] #transition_options_select').val(sl_df_opts.transition);
                        ga("#transition_options_select").selectmenu("refresh");
                    }

                });
            }, 200);


        }



    );

    // overlay: true,shuffle:true,transition:'fade',preloadImage: true,transitionDuration: 3000,timer:false,delay:8000,
}

// save slideshow parameters
function saveSlideshowConfig(evt) {

    evt.preventDefault();

    var el = ga(evt.target);
    var _is_photos = !1,
        _no_succ_notif = 0;
    // check if there's photos
    ga('#photos_sort_slideshow').children().each(function() {

        if(ga(this).hasClass('_noopac') || ga(this).hasClass('__occ'))
            _is_photos = !0;

    });


    if(!_is_photos) {

        ga('#slideshow_enabled_cbox')[0].checked = false;
        kn_liveNotif(lang.theme_not_saved, 'info', 2800, lang.your_slideshow_was_not_saved);
        _no_succ_notif = 1;

    }


    var _form_c = ga('#slideshow_images_an_config form:first');
    var _s_overlay = _form_c.find('[name="slideshow_overlay"]').hasClass('on'),
        _s_shuffle = _form_c.find('[name="slideshow_shuffle"]').hasClass('on'),
        _s_transition = _form_c.find('[name="slideshow_transition"] #transition_options_select').val(),
        _s_trans_duration = _form_c.find('[name="slideshow_trans_dur"] input:first').val(),
        _s_timer = _form_c.find('[name="slideshow_timer"]').hasClass('on'),
        _s_delay = _form_c.find('[name="slideshow_delay"] input:first').val(),
        _s_enabled = ga('#slideshow_enabled_cbox').is(':checked') ? 'yes' : 'no';

    var _s_post_arr = new Object();
    _s_post_arr['overlay'] = _s_overlay;
    _s_post_arr['shuffle'] = _s_shuffle;
    _s_post_arr['transition'] = _s_transition;
    _s_post_arr['trans_duration'] = _s_trans_duration;
    _s_post_arr['timer'] = _s_timer;
    _s_post_arr['delay'] = _s_delay;
    _s_post_arr['enabled'] = _s_enabled;
    _s_post_arr['cmd'] = 'saveSlideshowConfig';
    ajaxLoading();

    var send = jAjax('/cmd.php', 'post', $.param(_s_post_arr));
    send.done(function(data) {

        if(data === '1') {
            setTimeout(function() {
                el.parent().find('button:first').trigger('click');
            }, 700);
            if(!_no_succ_notif) kn_liveNotif(lang.theme_saved, 'done', 3200, lang.now_the_theme_is_visible_into_your_profile);

            setTimeout(function() {
                removeAjaxLoad();
                window.location.reload();
            }, 3000);

        } else return displayErr(data);

    });
}

function readURL(evt, input, id, bg, ckbk) {

    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            bg ? $(id).attr('style', 'background-image:url(' + e.target.result + ')') : $(id).attr('src', e.target.result);
            if(ckbk) ckbk(evt);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function countChars(obj) {
    var method = $.inArray(obj.nodeName.toLowerCase(),
    ['textarea', 'input']) !== -1 ? 'val' : 'text';
    return $(obj)[method]().length;
}
/*
@title - Notification title *str
@m - Notification mode [ done || warn || error || info ] *str
@timer - notification timer to auto hide
@desce - notifcation description 
*/
function kn_liveNotif(title, m, timer, descr) {

    var _notif_markup = '<section id="kn_notif_ge"> <div class="kn_notif_tr ' + m + '"> <div class="ic ic_notif_close ic_close" title="' + lang.close + '"></div> <div class="ic ic_kn_live_notif"></div> <div class="kn_notif_sec"> <div class="kn_notif_title">' + title + '</div> <div class="kn_notif_descr">' + descr + '</div> </div> </div> </section>';
    var _bd = ga('body'),
        _prev_notif = _bd.find('#kn_notif_ge');

    _prev_notif.remove();



    if(!_prev_notif.length) {

        _bd.append(_notif_markup);

        var removeIt_ntf = function(a) {

            var _remove_func = function() {

                _bd.find('#kn_notif_ge > div:first').removeClass('__show').on(crossEvent, function() {
                    ga(this).parent().remove();
                });

            }

            if(!a) {
                setTimeout(function() {

                    _remove_func();

                }, (timer ? timer : 5000));
            } else {

                _remove_func();
            }

        };

        setTimeout(function() {
            _bd.find('.kn_notif_tr').addClass('__show').off('click.hideIt').on('click.hideIt', function(evt) {

                evt.preventDefault();
                removeIt_ntf(1);

            });
        }, 100);


        removeIt_ntf();
    }


}

/* Registration Form
------------------------- */
// validate email (check for available)
function reg_validateEmail(el, ev) {
    ev.preventDefault();
    var $el = $(el),
        $_s_Btn = $('[name="button_continue"]');
    $el.removeAttr('onfocus')
        .off('focusout.vlmail')
        .on('focusout.vlmail', function() {
            var $_this = $(this);
            if($_this.data('currem') !== $_this.val() && $.trim($_this.val())) {
                var check_m = jAjax('/profile', 'post', 'type=pos&cmd=registrationValidateEmail&rm=' + $_this.val());
                check_m.done(function(d) {
                    switch (d) {
                        case '0':
                            return false;
                            break;
                        case '_INVALID_TYPE':
                            $_this.css('border', '1px solid red')
                            $_this.parent()
                                .find('.reg_em_err')
                                .removeClass('__none')
                                .html(lang.reg_invalid_email_type);
                            $_s_Btn.addClass('__disabled')
                                .off('click.reg_continue')
                                .on('click.reg_continue', function(e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    return;
                                });
                            break;
                        case '_EMAIL_EXIST':
                            $_this.css('border', '1px solid red')
                            $_this.parent()
                                .find('.reg_em_err')
                                .removeClass('__none')
                                .html(lang.reg_mail_already_in_use);
                            $_s_Btn.addClass('__disabled')
                                .off('click.reg_continue')
                                .on('click.reg_continue', function(e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    return;
                                });
                            break;
                        case '_SUCCESS':
                            $_this.removeAttr('style');
                            $_this.parent()
                                .find('.reg_em_err')
                                .addClass('__none')
                                .empty();
                            $_s_Btn.removeClass('__disabled')
                                .off('click.reg_continue');
                            break;
                    }
                });
            }
            if($.trim($_this.val())) $_this.attr('data-currem', $_this.val());
        });
}

function takesignup(ev) {
	var form = ga('#new_user');
	var s_err;
    var cssBorder = {
        'border': '1px solid red'
    };

 
        var $this = form;
        var fname = f($this, '#reg_first_name'),
            sname = f($this, '#reg_last_name'),
            bday = f($this, '#day'),
            bmonth = f($this, '#month'),
            byear = f($this, '#year'),
            genre = f($this, '[name="fr.gender"]'),
            location = f($this, '#reg_country'),
            phone = f($this, '#js_phone_number'),

            admail = f($this, '#reg_mail'),
            pass = f($this, '#reg_password');
        var req = function(el) {
            s_err = true;
            el.attr('requiredf', 'true')
                .css(cssBorder)
                .focus();
        }
        $this.find('[data-textmsg]')
            .remove();
        $this.find('[requiredf]')
            .removeAttr('style')
            .removeAttr('requiredf');
        s_err = false;
        if(!trim(fname)) {
            apErr(lang['reg_first_name_empty'], fname);
            req(fname)
        }
        if(!trim(sname)) {
            apErr(lang['reg_sname_empty'], sname);
            req(sname)
        }
        if(!trim(bday) || !trim(bmonth) || !trim(byear)) {
            if(!trim(bday)) req(ga('#day-button')); //req(bday);
            if(!trim(bmonth)) req(ga('#month-button')); //req(bmonth);
            if(!trim(byear)) req(ga('#year-button')); //req(byear);
            apErr(lang['reg_bday_empty'], ga('#year-button'));
        }
        if(!genre.is(':checked')) {
            apErr(lang['reg_genre_empty'], genre.last(), '__ml165 __mtm5');
            req(genre)
        }

        if(!validatePhoneNumber(trim(phone)) || !trim(phone)) {
            apErr(lang['sg_invalid_phone'], phone);
            req(phone);
        }
        if(!trim(location)) {
            apErr(lang['reg_country_empty'], location);
            req(location)
        } else if(!ga('#location_selected_from_list').length || !ga('#location_selected_from_list').hasClass('yes')) {


            apErr(lang['reg_country_empty'], location);
            req(location)
        }

        if(!trim(admail)) {
            apErr(lang['reg_mail_empty'], admail);
            req(admail)
        }
        if(!trim(pass)) {
            apErr(lang['reg_pass_empty'], pass);
            req(pass)
        } else if(pass.val()
            .length < 6) {
            apErr(lang['reg_pass_length'], pass, '__mt3');
            req(pass)
        }
        if(s_err) ev.preventDefault(); else $this.submit();
		
 
}
/* LOGIN FORM 
-----------------------*/
function takelogin(ev,form){
	
		ev.preventDefault();
		
		var borderErr = {};
		borderErr['border'] = '1px solid red';
		var lfrm = ga(form),
			msg = lfrm.find('#anonymLoginMsg'),
			returnto_field = ga('input#returnto');
			email_field = ga('input#field_email'),
			pass_field = ga('input#field_password'); 
		
		
	
        var $this = ga(form);
        var removeOvr = function() {
            email_field.removeAttr('style');
            pass_field.removeAttr('style');
            $this.removeAttr('style');
            ga('.login-spinner').addClass('__none');
        }
        $this.css({
            'pointer-events': 'none',
            'opacity': '0.3'
        });
        ga('.login-spinner').removeClass('__none');
		
		
        $.ajax({
            type: lfrm.attr('method'),
            url: lfrm.attr('action'),
            data: lfrm.serialize(),
            success: function(data) {
                var log = data.split('|*|')[0],
                    mText = data.split('|*|')[1];
                switch (log) {
                    case 'email':
                        removeOvr();
                        email_field.css(borderErr)
                            .focus();
                        msg.addClass('_vis');
                        msg[0].innerHTML = mText;
                        break;
                    case 'pass':
                        removeOvr();
                        pass_field.css(borderErr)
                            .focus();
                        msg.addClass('_vis');
                        msg[0].innerHTML = mText;
                        break;
                    case '!INVALID_ACC':
                    case '!SERVER_ERROR':
                    case '!PENDING_ACC':
                    case '!INCORRECT_DETAILS':
                        removeOvr();
                        msg.addClass('_vis');
                        msg[0].innerHTML = mText;
                        break;
                    case 'location':
                        window.location = mText;
                        break;
                    default:
                    case '1':
                        window.location = './';
                }
            }
        });
        
		
}
 

function jboxMouse($el) {
    new jBox('Mouse', {
        getContent: 'title',
        attach: $el,
        trigger: 'mouseenter'
    });
}
/* params
 @str = text notif
 @l = offset left
 @t = offset top
 @c = color
*/
function jboxNotice(str, l, t, c) {
    new jBox('Notice', {
        fixed: true,
        position: {
            x: 20,
            y: 20
        },
        attributes: {
            x: l,
            y: t
        },
        color: c,
        audio: '/js/cmd/jBox/audio/beep1',
        stack: true,
        content: str
    });
}

function jboxTolltip(obj, str, gift) {
    if(gift) {
        ga('#' + obj)
            .jBox('Tooltip', {
                onCreated: function() {
                    // alert(str);
                    //str = validateJson(str);
                    this.setContent('<div class="tooltip-gift-big"><img src="/stcmd/gifts/' + str.gift + '"></div><br/><div class="gift-from">' + (!str['private'] && !str['anonym'] ? lang.from + '&nbsp;<a href="/user/' + str.user_id + '" class="ob" hrefattr="true">' + str.user_fullname + '</a>' : (str['private'] == 'yes' ? lang.private_gift : lang.anonym_gift)) + '</div?');
                },
                //onClose: function() { ga('#gift-tooltip-'+str.giftid).remove(); },
                id: 'gift-tooltip-' + str.giftid,
                trigger: 'mouseenter',
                closeOnMouseleave: true,

                position: {
                    x: 'center',
                    y: 'bottom'
                },
                outside: 'y',
                reload: true,
                pointer: true,
                adjustPosition: true,
                reposition: true
            });
    } else
        ga(obj)
        .jBox('Tooltip', {
            getContent: str,
            trigger: 'mouseenter',
            position: {
                x: 'center',
                y: 'top'
            },
            outside: 'y',
            pointer: true,
            adjustPosition: true,
            reposition: true
        });
}
//get emojarea
function getEmojare(obj, btn, activeOn, btnpos, css) {
    var n = '<div data-emojbtn class="disc_toolbar_w" style="margin-bottom: 0px;">' + '<div class="disc_toolbar">' + '<div class="disc_toolbar_i">' + '<a class="disc_toolbar_i_ic smiles_w __staple" href="javascript:;"></a>' + '</div>' + '<div class="disc_toolbar_i">' + '<a class="em_disc_toolbar_i_ic__sm" href="javascript:;"></a>' + '</div>' + '</div>' + '</div>';
    var n = '<div data-emojbtn class="disc_toolbar_w" style="margin-bottom: 0px;"><a class="em_disc_toolbar_i_ic__sm smiles_w" href="javascript:;"></a></div>';
    var attch = '<!--- Attach files section ---->' + '<div class="jb_attached_files __messages"></div>' + '<section data-attcjfl="1">' + '<div class="mdialog_entertm_ics">' + '<div onclick="attach_pPhoto(event)"><span class="tico"><i id="md_ics_photo" title="Photo" class="tico_img ic ic_photoattach"></i></span></div>  ' + '<div onclick="attach_pPhoto(event,1)"><span class="tico"><i id="md_ics_photo_computer" title="Photo from computer" class="tico_img ic ic_photo"></i></span></div> ' + '</div>' + '</section>';
    $obj = $(obj);
    com_emj = $obj.emojiarea({
        wysiwyg: true,
        buttonLabel: 'Emojis',
        buttonPosition: btnpos ? 'before' : 'after',
        button: btn ? btn : ''
    });
    _act_emoji = activeOn;
    var btn_parent = ga(btn)
        .parent();
    if(!btn_parent.find('[data-attcjfl="1"]')
        .length) btn_parent.append(attch);
    var emoji_textarea = $obj.parent()
        .find('.emoji-wysiwyg-editor');
    if(css) {
        emoji_textarea.css(css);
    }
    return emoji_textarea;
}

function displayErr(str) {
    removeAjaxLoad();
    var errMarkup = '<section class="st_nav_error"><div class="site_ovr __light"></div><div class="site_ajax_error_msg"><div class="report_txt __info">%s</div><div class="ic close_err"></div></div></section>';
    var __err = ga('body')
        .find('section.st_nav_error');
    __err.remove();
    ga('body')
        //.find('.global_content')
        .prepend(errMarkup.replace('%s', str))
        .on('click', function(e) {
            clearTimeout(this.errTimeout);
            var $this = $(this);
            $this.find('.site_ajax_error_msg')
                .animate({
                    top: '-50px'
                }, 200, function() {
                    $this.find('section.st_nav_error')
                        .remove();
                });
        });
    ga('.site_ajax_error_msg')
        .animate({
            top: '0px'
        }, 300);
    if(_st.err_auto_hide) this.errTimeout = setTimeout(function() {
        ga('.site_ajax_error_msg')
            .animate({
                top: '-50px'
            }, 200, function() {
                ga('body section.st_nav_error')
                    .remove()
            });
    }, _st.err_HideTimeout);
}
// allow only numbers and dot .
function inputPrice(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;


    if(charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
// send gift
function sendGift(el, evt) {

    evt.preventDefault();

    el = ga(el);
    var gift_id = el.data('giftid');
 

    ga('<div/>')
        .addClass('modal-new gifts')
        .appendTo(ga('body'));

    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-new'),
        //title: lang.j_modal_select_photos,
        overlay: false,
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': false,
        blockScroll: true,
        height: 'auto',
        width: '854px',
        minHeight: '100px',
        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        offset: {
            x: 0,
            y: 70
        },
        onClose: function() {
            prn_modal();
        }
    });
    //alert(localStorage.getItem('attch_checkUser'));//jBoxGetUploadHtml
    jb_.open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'getGiftPopup',
                view_as: 'json',
                giftid: escape(gift_id)
            },

            reload: true,
            setContent: false,
            success: function(data) {
                var jCont = ga('.modal-new .jBox-content');
                var res = validateJson(data);
                jb_.setContent(res.content);


                $('#field_search_query_gift')
                    .fastLiveFilter('.ugrid_cnt.mbt60fajy3', {
                        timeout: 200,
                        callback: function(total) {
                            /*$('#filter_search_count')
                            	.html(total);*/
                        }
                    });

            }
        });

}

function sendGiftTo(uid, gid) {
    prn_modal();
    ga('<div/>')
        .addClass('modal-new ready-gifts')
        .appendTo(ga('body'));

    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-new'),
        //title: lang.j_modal_select_photos,
        overlay: false,
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': false,
        blockScroll: true,
        height: 'auto',
        width: '854px',
        minHeight: '100px',
        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        offset: {
            x: 0,
            y: 70
        },
        onClose: function() {
            prn_modal();
        }
    });

    jb_.open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'giftReadyToSend',
                view_as: 'json',
                gid: escape(gid),
                uid: escape(uid)
            },

            reload: true,
            setContent: false,
            success: function(data) {
                var jCont = ga('.modal-new .jBox-content');
                var res = validateJson(data);
                jb_.setContent(res.content);

            }
        });

}

/* Update description and rotate of recent uploaded photos
---------------------------------------------------- */
function rotate_photo(el, id, e, rotatePhotoLayer) {

    e.preventDefault();
    e.stopPropagation();
    var angle = parseInt(el.getAttribute('data-angle')) + parseInt(90);
    var $el = $(el);
    if(!rotatePhotoLayer) {
        var cont = $("#up_txt_" + id);
        var c = cont.closest('[data-parintii]');
        var rImg = c.prevAll('img');
        var iId = escape(cont.closest('[data-photoc]')
            .data('photoc'));
        var e_css = {};
        var d_css = {};
        d_css['opacity'] = 0.2;
        d_css['pointer-events'] = 'none';
        e_css['opacity'] = 1;
        e_css['pointer-events'] = 'auto';
        c.css(d_css);
    } else {
        var iId = escape(localStorage.getItem('phlayer-rotatephoto'));
        var slider_active_img = $('.nb-slides div[data-slpid="' + iId + '"]');
        var rImg = slider_active_img.find('img');
        ajaxLoading();
    }
    var request = jAjax('/profile.php', 'post', 'q=' + angle + '&ph=' + iId + '&cmd=rotate&type=pos');
    request.done(function(data) {
        if(data != '1') {
            if(!photoLayer) c.css(e_css);
            return displayErr(lang.somethingWrong);
        } else {
            if(!rotatePhotoLayer) {
                rImg.css({
                    '-webkit-transform': 'rotate(' + angle + 'deg)',
                    'transform': 'rotate(' + angle + 'deg)',
                    //'-webkit-transition' : '-webkit-transform .1s ease',
                    //'transition' : 'transform .1s ease'
                });
            } else {
                $('img [src="' + rImg.attr('src') + '"]')
                    .attr('src', rImg.attr('src') + '&v=' + (new Date())
                        .getTime());
                rImg.attr('src', rImg.attr('src') + '&v=' + (new Date())
                        .getTime())
                    .load(function() {
                        widget_reposition(slider_active_img.index(), 1);
                    });
            }
            el.setAttribute('data-angle', (angle === 360 ? 0 : angle));
        }
        if(!rotatePhotoLayer) c.css(e_css);
        else removeAjaxLoad();
    });
}

function expand_txt_up(txt, id, e) {
    e.preventDefault();
    e.stopPropagation();
    var _this = this,
        tx = ga("#up_txt_" + id),
        tg = tx.closest('[data-parintii="true"]')
        .find('.tag-friends');
    if(!tx.hasClass('__exp')) {
        tg.hide();
        tx.addClass('__exp')
            .css({
                height: 80
            });
    }
    ga('body')
        .off('click.saveMediaInfo').on('click.saveMediaInfo', function(e) {
            var t = ga('textarea[recent-upl="true"]');
            t.css({
                height: 32
            });
            t.removeClass('__exp');
            ga('.tag-friends._recu')
                .fadeIn();
            for(var i = 0; i < t.length; i++)
                if(tx.hasClass('icommunity')) communitySendFileDescription(t.eq(i), t.eq(i).data('fileid'), t.eq(i).data('clubid'));
                else upPhotoSendDescr(t.eq(i));
        });
}

function communitySendFileDescription(d, fileid, _id) {
    var descr = d.val();

    if(!$.trim(descr)) return false;
    ajaxLoading();
    var req = jAjax('/communities.php', 'post', {
        cmd: 'save-file-info',
        info: descr,
        file_id: escape(fileid),
        id: escape(_id)
    });
    req.done(function(resp) {
        removeAjaxLoad();
        if(resp != '1') return displayErr(lang.somethingWrong);
        else {

            d.removeAttr('style');

        }
    });
}

function upPhotoSendDescr(d) {
    var descr = d.val();
    var pid = escape(d.closest('.eg_gotph[data-photoc]')
        .data('photoc'));
    if(!$.trim(descr)) return false;
    var req = jAjax('/profile', 'post', 'cmd=phdescr&type=pos&q=' + descr + '&ph=' + pid);
    req.done(function(resp) {
        if(resp != '1') return displayErr(lang.somethingWrong);
        else {
            var descInput = d.closest('.descrInpCnt'),
                parintii = d.closest('[data-parintii]'),
                descCnt = parintii.find('.descrCnt'),
                change = parintii.find('.desc_change');
            descInput.hide()
                .find('textarea')
                .val('');
            descCnt.show()
                .find('.plp_descrCntText')
                .text(descr);
            change.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                descCnt.hide();
                descInput.show()
                    .find('textarea')
                    .val(descCnt.children(':first')
                        .text())
                    .css({
                        height: 80
                    })
                    .focus();
                parintii.find('.tag-friends')
                    .hide();
            });
        }
    });
}
/* end update description
--------------------------  */
function doUploadFiles(event, files, progressBar, albID) {
    var photoAddTextarea = function(c) {
        var randomId = (new Date())
            .getTime();
        var getDescrTemp = jAjax('/upload-inc/descr_tem.html', 'get', '');
        getDescrTemp.done(function(html) {
            c.find('img')
                .after(jprintf(html, lang.change, randomId, randomId, lang.add_descr, lang.tag_friend, randomId, lang.rotate_photo));
        });
    }
    var readPhotos = function(o) {
        var input = event.target;
        var container = $('#bf_upload_' + o);
        var output = container.find('img')[0]; //container.find('.img_fak')[0];
        if(container.length) {
            container.closest('.photos_content').find('.userAddPhoto').addClass('__square').parent().removeClass('xc3F');
            var reader = new FileReader();
            reader.onload = function() {
                var dataURL = reader.result;
                if(container.length == 0) return false;
                output.src = dataURL;
                ///output.style.backgroundImage = 'url('+dataURL+')';
                container.find('.__uploadingInfo')
                    .addClass('__off');
                container.find('.uploading_ovr')
                    .addClass('__on');
            };
            reader.readAsDataURL(files[o]);
        }
    }
    var count = 0;
    var totalFiles = files.length;
    var trigger_upForm = function() {
        if(typeof files[count] === 'undefined' || count > files.length - 1) {
            var progressBarTimeout;
            var progressBarRemove = function() {
                progressBarTimeout = setTimeout(function() {
                    progressBar.remove();
                }, 8000);
            }
            progressBar.hover(function() {
                clearTimeout(progressBarTimeout)
            }, function() {
                progressBarRemove();
            });
            edUpload();
            if(!albID) photoTabClick("#pphotosTab");
            progressBarRemove();
            return false;
        }
        var formData = new FormData();
        formData.append('files[]', files[count]);
        formData.append('albid', albID);
        $.ajax({
            url: _st.uploadFile, //Server script to process data
            type: 'POST',
            xhr: function() { // Custom XMLHttpRequest
                var Xhr = $.ajaxSettings.xhr();
                if(Xhr.upload) { // Check if upload property exists
                    Xhr.upload.addEventListener('progress', function(e) {
                        mainUploadProgressHandling(e, count, progressBar, count, totalFiles)
                    }, false); // For handling the progress of the upload
                }
                return Xhr;
            },
            //Ajax events
            beforeSend: function() {
                readPhotos(count);

            },
            success: function(data) { //alert(data)
                var response = validateJson(data);
                if(response['status'] === 'OK') {
                    var container = $('#bf_upload_' + count);
                    if(container.length) {
                        container.find('img')[0].src = '/getPhoto?p=' + response['photoid'] + '&sz=grid&v' + (new Date())
                            .getTime();
                        container.children(':first')
                            .attr('data-photoc', response['photoid']);
                        container.find('#restore_recent_upload')
                            .attr('href', '/profile?pid=' + (response['photoid']) + '&q=' + (response['userid']) + '&cmd=phreturn&i=' + (response['albumid']) + '&phf=' + (response['filename']) + '&ex=' + (response['extension']) + '&fsz=' + (response['filesize']) + '&pos=0&ad=' + response['added']);
                        container.find('#delete_recent_upload')
                            .removeAttr('style')
                            .attr('href', '/profile?q=' + (response['userid']) + '&cmd=deletephoto&ph=' + response['photoid']);
                        container.find('.uploading_ovr.__on,.pup_bar_m_upload')
                            .remove();
                        photoAddTextarea(container);
                    }
                    setTimeout(function() {
                        count++;
                        trigger_upForm();
                    }, 50);
                } else return displayErr(data);
            },
            error: function() {
                return displayErr(lang.somethingWrong)
            },
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    }
    trigger_upForm();
}
/*****************************************
function formUpload(form, popup, e, files) {




    var formData = new FormData(form[0]);
    $.ajax({
        url: _st.uploadFile, //Server script to process data
        type: 'POST',
        xhr: function() { // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Check if upload property exists
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: function() {},
        success: function() {},
        error: function() {},
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });

}
*****************************************************/
function ajaxuploadprogress(e) {
    var rsp = 0;
    if(e.lengthComputable) {
        rsp = Math.round((e.loaded / e.total) * 100);

    }

    return rsp;
}

function mainUploadProgressHandling(e, i, pBar, count, ctotal) {
    var p_id = ga('#bf_upload_' + i);
    var p_cont = ga('#bf_upload_' + i)
        .find('.main_progress_photo');
    if(e.lengthComputable) {
        var p_percentage = Math.round((e.loaded / e.total) * 100);
        p_cont.css('width', p_percentage + '%');
        pBar.find('#totalFiles')
            .text(ctotal);
        if(p_percentage >= 100) {
            pBar.find('.progress_photo')
                .css('width', (100 / ctotal) * (count + 1) + '%');
            pBar.find('#uploadedFiles')
                .text(count + 1);
            countPhotos(null, 1);
        }
    }
}

function edUpload(c) {
    var uploadBox = ga('.userAddPhoto,.jb_attch_uadph,.post_attch_uadph'),
        prc = $('.upload_processing');
    if(c) {
        prc.remove();
        uploadBox.css({
            'pointer-events': 'none',
            'opacity': 0.2
        });
    } else uploadBox.removeAttr('style');
}

function getUploadSkem(a) {
    if(!a) {
        // markup for upload photos
        var mkup = '<div id="bf_upload_%s" class="ec_items __uploading notOvr">' + '<div class="eg_gotph">' + '<div class="uploading_ovr"></div>' + '<div class="ph disabling-layer"><span class="photo-sc_i_utility_delete-status">' + lang.photo_deleted + '</span>' + '<div class="photo-sc_i_utility_undo-delete"><a id="restore_recent_upload" onclick="restorePhoto(this,event)" href="#" class="il">' + lang.restore_photo + '</a></div></div>' + '<a class="x_delete_pp" style="display:none;" id="delete_recent_upload" title="' + lang.delete_photo + '" onclick="deletePhoto(this,event)" href="#"></a>' +
            //'<div class="img_fak"></div>' +
            '<a href="/photo?q=2&show=pphotos&from=medium&a=0&o=&cmd=openPhotoViewer" data-vphopen="1" data-vphi="MzU="><img src="" class="img_fak" border="0" /></a>' + '<div class="ucard-b_tx_cnt __uploadingInfo">' + lang.uploading + '<div class="bold fs-13 mw170 ellip">%s</div></div>' + '<div class="pup_bar_m_upload">' + '<div class="main_progress_photo"></div>' + '</div>' + '</div></div>';
    } else {
        // markup for attachements
        var mkup = '<div id="at_upload_%s" class="ec_items __uploading notOvr">' + '<div class="eg_gotph">' + '<div class="uploading_ovr"></div>' + '<div class="ph disabling-layer"><span class="photo-sc_i_utility_delete-status">' + lang.photo_deleted + '</span>' + '<div class="photo-sc_i_utility_undo-delete"><a id="restore_recent_upload" onclick="restorePhoto(this,event)" href="#" class="il">' + lang.restore_photo + '</a></div></div>' + '<a class="x_delete_pp" style="display:none;" id="delete_recent_upload" title="' + lang.delete_photo + '" onclick="deletePhoto(this,event)" href="#"></a>' +
            // '<div class="img_fak"></div>' +
            '<img src="" class="img_fak" border="0" />' + '<span class="selectable-card_ovr"></span><span class="selectable-card_ic"></span>' + '<div class="ucard-b_tx_cnt __uploadingInfo">' + lang.uploading + '<div class="bold fs-13 mw170 ellip">%s</div></div>' + '<div class="pup_bar_m_upload">' + '<div class="main_progress_photo"></div>' + '</div>' + '</div></div>';
    }
    return mkup;
}

function upload_form() {
    jQuery('form#phform')
        .on('change drop', function(e) {
            //e.preventDefault();
            var $this = ga(this);
            var popup = $this.children('[name="mode"]')
                .val();
            var cf = document.all && !window.atob ? $this.find('input:file')
                .get(0)
                .files : parseInt($this.find('input:file', this)[0].files.length);
            edUpload(true);
            if(popup === 'main' && 'FileReader' in window) {
                var input = $this.children('input[type="file"]');
                var files = input[0].files;
                if(!$this.hasClass('__inAlbum')) photoTabClick("#pphotosTab");

                uploadGetFiles = function(b) {
                    //for (var i = files.length-1; i >= 0; i--){
                    for(var i = 0; i < files.length; i++) {
                        var phContent = $('.photos_content');
                        var file_ext = files[i].name.split('.')
                            .pop()
                            .toLowerCase(); ///input.val().replace(/C:\\fakepath\\/i, "").split('.').pop().toLowerCase();
                        if($.inArray(file_ext, _st.photoTypes) == -1 && $.trim(file_ext)) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            ga('.ec_items.__uploading')
                                .remove();
                            edUpload();
                            return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
                        }
                        if(files.length > _st.maxFilesUpload) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            edUpload();
                            return displayErr(lang.up_maximumFiles.replace('%s', _st.maxFilesUpload));
                        }
                        phContent.children(':first')
                            .after(jprintf(getUploadSkem(), i, files[i].name));
                    }
                    var pBar = getUploadBar(popup, cf);
                    pBar.css('visibility', 'visible');
                    doUploadFiles(e, files, pBar, b);
                    uploadGetFiles = false;
                }


                if($this.hasClass('__inAlbum')) uploadGetFiles($this.closest('[parent-alb="true"]')
                    .attr('id'));
                return;
            } else popup = 'feed';
            return upload_photo($this, popup, e, cf);
        });
}

function assign_bfupl_img() {
    var intervalt = setInterval(function() {
        if(typeof uploadGetFiles == 'function' && $('.photos_content')
            .length != 0) {
            if(uploadGetFiles) {
                clearInterval(intervalt);
                uploadGetFiles();
            }
        }
    }, 50);
}

function getUploadBar(a, cf) {

    var markup;
    switch (a) {
        case 'first':
        case 'feed':
            markup = '<section class="upload_processing"><div class="site_ovr __darknest __mt3"></div><div class="pup_bar"><div class="progress_photo"></div>' + '<div aria-hidden="false" style="visibility:hidden;" class="progress_tx ellip _atcompl"><span class="tico tico__12">' + ' <i class="tico_img ic12 ic12_i_photo __upload"></i>' + ' <span id="progress_tx"></span>' + lang.uploaded + ' <a id="uploadPageLink" href="#" class="wl"><span id="uploadedFiles">%s</span> from <span id="totalFiles">%s</span> photos</a></span>' + '</div>' + '</div><div class="uploadTextCenterInf"><div class="percentage_elaps">0%</div></div></section>';
            break;
        case 'feedchange':
            markup = '<section class="upload_processing"><div class="site_ovr __darknest __mt3"></div><div class="pup_bar"><div class="progress_photo"></div>' + '<div aria-hidden="false" style="visibility:hidden;" class="progress_tx ellip _atcompl"><span class="tico tico__12">' + ' <i class="tico_img ic12 ic12_i_photo __upload"></i>' + ' <span id="progress_tx"></span>' + lang.uploaded + ' <a id="uploadPageLink" href="#" class="wl"><span id="uploadedFiles">%s</span> from <span id="totalFiles">%s</span> photos</a></span>' + '</div>' + '</div><div class="uploadTextCenterInf"><div class="percentage_elaps">0%</div></div></section>';
            break;
        case 'community':
            markup = '<section class="upload_processing"><div class="pup_bar"><div class="progress_photo"></div>' + '<div aria-hidden="false" style="visibility:hidden;" class="progress_tx ellip _atcompl"><span class="tico tico__12">' + ' <i class="tico_img ic12 ic12_i_photo __upload"></i>' + ' <span id="progress_tx"></span>' + lang.uploaded + ' <a id="uploadPageLink" href="#" class="wl"><span id="uploadedFiles">%s</span> from <span id="totalFiles">%s</span> photos</a></span>' + '</div>' + '</div></section>';
            break;
        case 'main':
            markup = '<section class="upload_processing"><div style="display:none;" class="site_ovr __darknest __mt3"></div><div class="pup_bar"><div class="progress_photo"></div>' + '<div aria-hidden="false" class="progress_tx ellip _atcompl"><span class="tico tico__12">' + ' <i class="tico_img ic12 ic12_i_photo __upload"></i>' + ' <span id="progress_tx"></span>' + lang.uploaded + ' <a id="uploadPageLink" href="#" class="wl"><span id="uploadedFiles">0</span> from <span id="totalFiles">0</span> photos</a></span>' + '</div>' + '</div></section>';
            break;
    }
    ga('body').prepend(jprintf(markup, cf, cf))
        .find('.pup_bar')
        .on('mouseover mouseenter', function() {
            ga(this)
                .addClass('__addB')
        });
    return ga('section.upload_processing');
}

function photoTabClick(element) {
    ga(element ? element : '#photosTab')
        .trigger('click');
}

function upload_photo(t, popup, evt, cf) {
    var files = t.children('input[type="file"]')[0].files,
        maxfiles = _st.maxFilesUpload,
        file_ext = t.find('input[type="file"]')
        .val()
        .replace(/C:\\fakepath\\/i, "")
        .split('.')
        .pop()
        .toLowerCase();
    t.attr("action", _st.uploadFile);
    if($.inArray(file_ext, _st.photoTypes) == -1 && $.trim(file_ext)) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
    }
    if(files > maxfiles) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        return displayErr(lang.up_maximumFiles.replace('%s', maxfiles));
    }
    var pBar = getUploadBar(popup, cf);
    var options = {
        beforeSend: function() {
            pBar.css('visibility', 'visible');

        },
        uploadProgress: function(event, position, total, percentComplete) {
            if(percentComplete < 100) {
                pBar.find('.progress_photo')
                    .css('width', percentComplete + '%')
                    .closest(pBar)
                    .find('.percentage_elaps')
                    .text(percentComplete + '%');
            } else {
                pBar.find('._atcompl')
                    .css('visibility', 'visible');
                pBar.find('.progress_photo')
                    .css('width', '100%')
                    .closest(pBar)
                    .find('.percentage_elaps')
                    .html('<div class="upload_complete _waiting ic50 tico_img"></div>');
            }
        },
        complete: function(response) {
            var rsp = JSON.parse(response.responseText);
            if(rsp['status'] == 'OK') {
                var progressBarTimeout;
                var removeProgressBar = function() {
                    progressBarTimeout = setTimeout(function() {
                        pBar.remove();
                    }, 8000);
                }
                edUpload();
                countPhotos(null, files.length);
                if(popup == 'feed') photoTabClick("#pphotosTab");
                pBar.find('.site_ovr,.uploadTextCenterInf')
                    .hide();
                pBar.hover(function() {
                    clearTimeout(progressBarTimeout);
                }, function() {
                    removeProgressBar();
                });
                removeProgressBar();
            } else {
                displayErr(response.responseText);
            }
        },
        error: function() {
            pBar.remove();
            if(!$.trim(file_ext)) return;
            return displayErr(lang.up_err_occur);
        }
    };
    if(cf > maxfiles) {
        return displayErr(lang.up_maximumFiles.replace('%s', maxfiles));
    } else t.ajaxForm(options)
        .trigger('submit');
}

function jAjax(u, t, d, pForm, guest) {



    if(!pForm) {
        var req = jQuery.ajax({
            url: u,
            type: t,
            data: d,
            beforeSend: function(jqXHR, settings) {
                xhrPool.push(jqXHR);
            }
            //  cache true
        });
    } else {
        var req = jQuery.ajax({
            url: u,
            type: t,
            data: d,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    }
    req.fail(function(a, b) {
        //return displayErr(b.status);
    });
    return req;
}

function runAjax(element, evt, type) {
    evt.preventDefault();
    var $el = $(element),
        href = $el.attr('href')
        .split('?'),
        url = href[0],
        data = href[1];
    var query = jAjax(url, type, data + '&view_as=json');
    return query;
}
/* popup */
function popupMainBtns() {
    // poup overlay click (close popup)
    ga('.popup_ovr,.custom_popup_close,.js_popup_close, .layer_close, .ic_close')
        .on('click', function(e) {
            e.preventDefault();
            removePopup();
            createUrl('', '', prev_url);
        });
    ga('.popup_ovr')
        .hover(function() {
            ga('.js_popup_close')
                .addClass('__on');
        }, function() {
            ga('.js_popup_close')
                .removeClass('__on');
        });
}

function removePopup(a) {
    var pBlock = ga('.popup_container #hook_Block');
    var css = {};
    if(pBlock.hasClass('__slide')) {
        if(pBlock.hasClass('_toRight')) {
            //css['right'] = '-1000px';
            css[pVendor + 'transform'] = bFeature + '(0,0,0) translateZ(0)';
            css[pVendor + 'transition'] = pVendor + 'transform ' + _st.popup_anim_dur + 'ms ' + _st.popup_easing;
        } else {
            //css['left'] = '-1000px';
            css[pVendor + 'transform'] = bFeature + '(0,0,0) translateZ(0)';
            css[pVendor + 'transition'] = pVendor + 'transform ' + _st.popup_anim_dur + 'ms ' + _st.popup_easing;
        }
        ga('section.popup_container #hook_Block')
            .css(css);
        setTimeout(function() {
            ga('body')
                .removeClass(_nscroll)
                .find('section.popup_container')
                .remove();
        }, 200);
    } else ga('body')
        .removeClass(_nscroll)
        .find('section.popup_container')
        .remove();
    if(keepScrollBar > 0) {
        ga('body')
            .scrollTop(keepScrollBar);
        keepScrollBar = 0;
    }
    if(!a) hNactive();


    ga('.notifs_close').trigger('click');
}
// check if the music window is initialized
function ch_status_musWindow() {
    return ga('body')
        .find('#mus_search_gl')
        .length;
}

function nobilMusicSearch(song, a) {
    if(!a) mus_trig_click();
    var mus_search_interval = setInterval(function() {
        if(ch_status_musWindow() !== 0) {
            clearInterval(mus_search_interval);
            ajaxLoading();
            setTimeout(function() {
                $('.mml_search input:first')
                    .val(song);
                $('#mus_search_gl')
                    .attr('data-query', '?action=searchResult&method=inx&key=' + song)
                    .trigger('click');
                removeAjaxLoad();
            }, 2000);
        } else {
            nobilMusicSearch(song, 1);
        }
    }, 200);
}

function nobilMusicSearchAlbum(key, a) {
    if(!a) mus_trig_click();
    var mus_search_interval = setInterval(function() {
        if(ch_status_musWindow() !== 0) {
            clearInterval(mus_search_interval);
            ajaxLoading();
            setTimeout(function() {
                $('#getArtistAlbum')
                    .attr('data-query', '?action=searchResult&method=artistalbums&key=' + key)
                    .trigger('click');
                removeAjaxLoad();
            }, 2000);
        } else {
            nobilMusicSearchAlbum(key, 1);
        }
    }, 200);
}

function nobilMusicArtistRadio(key, a) {
    if(!a) mus_trig_click();
    var mus_search_interval = setInterval(function() {
        if(ch_status_musWindow() !== 0) {
            clearInterval(mus_search_interval);
            ajaxLoading();
            setTimeout(function() {
                $('#getArtistSimilarSongs')
                    .attr('data-query', '?action=searchResult&method=artistradio&key=' + key)
                    .trigger('click');
                removeAjaxLoad();
            }, 2000);
        } else {
            nobilMusicArtistRadio(key, 1);
        }
    }, 200);
}

function nobilMusicPlayAlbumArtist(key, a) {
    if(!a) mus_trig_click();
    var mus_search_interval = setInterval(function() {
        if(ch_status_musWindow() !== 0) {
            clearInterval(mus_search_interval);
            ajaxLoading();
            setTimeout(function() {
                $('#playFromOutside')
                    .attr('data-query', '?action=searchResult&method=inx&key=' + key + '&play=true')
                    .trigger('click');
                removeAjaxLoad();
            }, 2000);
        } else {
            nobilMusicPlayAlbumArtist(key, 1);
        }
    }, 200);
}

function removeOutPlayBtn() {
    if($('.m_portal_track_pause')
        .length != 0) $('.m_portal_track_pause')
        .removeClass('m_portal_track_pause')
        .attr('title', lang.play_track);
    $('.mus-tr_play.js-mus-tr_play')
        .removeClass('__pause');
}

function addOutPlayIc(el) {
    el.addClass('m_portal_track_pause')
        .attr('title', lang.pause_track);
}

function faddTrackToMyCollection(t, e) {
    if(e) e.preventDefault();
    else e = window.event || event;
    if($.socplusMusic) {
        $.socplusMusic('addTrack', e, t, true);
        removeAjaxLoad();
    } else {
        ajaxLoading();
        mus_trig_click(1);
        checkMusicLife(e, 'faddTrackToMyCollection', t);
    }
}

function feedAllAddedTracks(el, evt) {
    evt.preventDefault();
    var $el = $(el),
        g_t_id = $el.data('tracks')
        .id,
        g_t_u = $el.data('tracks')
        .ufn,
        g_t_uid = $el.data('tracks')
        .uid;
    /*
    for(var i=0;i<generate_id.length;i++)
    nr.push(generate_id[i]);
    */
    mus_trig_click();
    checkMusicLife(evt, 'MusGetUserAddPage', g_t_id + '_U_' + g_t_u + '_U_' + g_t_uid);
}

function MusGetUserAddPage(d) {
    var d = d.split('_U_');
    var tid = d[0],
        ufn = d[1],
        uid = d[2];
    setTimeout(function() {
        $('#uAddedFeed')
            .attr({
                'data-action': 'true',
                'data-query': '?tid=' + tid + '&ufn=' + ufn + '&uid=' + uid
            })
            .trigger('click');
    }, 500);
}

function mus_play_song(el) {
    removeOutPlayBtn();
    addOutPlayIc(el);
    // play song
    $.socplusMusic('playThisSong', null, el.data('track-inf')['track'], el.attr('id'), el.data('track-inf')['cover'], el.data('track-inf')['artist'], el.data('track-inf')['songname'], null, null, 1);
}

function mus_trig_click(l) {
    var c = l ? ga('[music_layer_hidden="true"]') : ga('[music_layer="true"]');
    c.trigger('click');
}

function nobilMusicPlayOutsideTrack(el, evt, a) {
    if(evt) evt.preventDefault();
    var $this = ga(el);
    if($this.hasClass('m_portal_track_pause')) {
        removeOutPlayBtn();
        $this.addClass('__m_paused');
        audio.pause();
        return;
    } else if($this.hasClass('__m_paused')) {
        $this.removeClass('__m_paused');
        addOutPlayIc($this);
        audio.play();
        return;
    }
    if($.socplusMusic) {
        removeAjaxLoad();
        return mus_play_song($this);
    } else {
        ajaxLoading();
        if(!a) mus_trig_click(1);
        /*
        var iv = setInterval(function(){

        if($.socplusMusic){

        clearInterval(iv);
        setTimeout('mus_play_song($this)',500);

        }



        },200);

        */
        checkMusicLife(evt, 'nobilMusicPlayOutsideTrack', el);
    }
}

function copyText() {

    try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successfully' : 'unsuccessfully'

        var w = msg == 'successfully' ? 'done' : 'warn';
        kn_liveNotif(lang.text_copied_to_clipboard.replace('%s', msg), w, 1000, '');
    } catch (err) {
        kn_liveNotif(lang.text_unable_to_copy_to_clipboard, 'warn', 1000, '');
    }

}
// generate link for item
function itemGenerateLink() {

    var markup = ga('<section id="item_get_direct_link"><div class="layer_ovr"></div>\
	<div class="item-direkt-link-p">\
	<span title="close" class="tico tico__n-t notifs_close close-direkt-link-popup"><i class="tico_img ic ic_close"></i></span>\
	<div class="drlk1">' + lang.direct_url + '</div>\
	<div class="drlk2"><input type="text" value="' + window.location + '"/></div>\
	<div class="drkl3 taCenter"><button id="copy_to_clipboard" class="flat_button">Copy to clipboard</button></div>\
	</div></div>');

    var $b = ga('body');

    if(!$b.find('#item_get_direct_link').length)
        $b.prepend(markup);

    $b.find('.close-direkt-link-popup').on('click.closeItemDirectLink', function(e) {
        $b.find('#item_get_direct_link').remove();
    });

    $b.off('keyup.closeItemDirectLink').on('keyup.closeItemDirectLink', function(e) {

        if(e.keyCode == 27)
            $b.find('#item_get_direct_link').remove();
    });
    markup.find('#copy_to_clipboard').on('click', function() {
        copyText(markup.find('input').val());

    });
    markup.find('input')[0].select();
    markup.find('input').focus();

}

function feed_liked_popup(el, feedid) {
    var $el = $(el);
    var lk_feed_jb = new jBox('Modal', {
        attach: $el,
        width: 'auto',
        height: 'auto',
        maxWidth: 700,
        closeButton: 'overlay',
        animation: false
    });
    lk_feed_jb.open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'LikeFeedGetAllFriends',
                fid: escape(feedid)
            },
            reload: true,
            setContent: false,
            cache: true,
            success: function(data) {
                lk_feed_jb.setContent(data);
            }
        });
}

function jbFeedTooltip($el) {
    if($el.length) {
        var gHTMLCont = $el.data('getjs');
        var th_tooltip_more = $el.data('tooltipmore');
        var feedId = $el.data('feedid');
        var doneHhtml = '';
        var markup_u_cn = '<div class="f_liked_tooltip"><a href="/user/%uid" hrefattr="true"><img src="/getPhoto?p=%photo&sz=small&g=%gender"><span>%name</span></a></div>';
        for(var i = 0; i < gHTMLCont.length; ++i) {
            var a = gHTMLCont[i];
            doneHhtml += markup_u_cn.replace(/%photo/, a.photo)
                .replace(/%uid/, a.id)
                .replace(/%name/, a.name)
                .replace(/%gender/, a.gender);
        }
        if(th_tooltip_more) {
            doneHhtml += '<a class="eshyo_c_friends" onclick="return feed_liked_popup(this,' + feedId + ');" href="javascript:;">' + lang.All + '&nbsp;' + th_tooltip_more + '&nbsp;' + (th_tooltip_more === 1 ? lang.friend : lang.friends) + '</a>';
        }
        $el.jBox('Tooltip', {
            closeOnMouseleave: true,
            animation: 'zoomIn',
            content: doneHhtml, //theme:'TooltipDark',
            trigger: 'mouseenter',
            //position: {x: 'center', y: 'bottom'},
            outside: 'y',
            pointer: true,
            adjustPosition: true,
            reposition: true
        });
    }
}

function SP_playMusic(el, evt) {
    evt.preventDefault();
    checkMusicLife(evt, 'start_play_music');
}

function checkMusicLife(evt, clbk, v) {
    if($.socplusMusic) {
        evt.stopImmediatePropagation();
        window[clbk](v);
    } else {
        var _ivl = setInterval(function() {
            if($.socplusMusic) {
                clearInterval(_ivl);
                window[clbk](v);
            }
        }, 2000);
    }
}

function start_play_music() {
    audio.playPause();
}
// shortcut menu
function gShortcutMenu(data) {
    var arg = data.ulmen;

    var sh_markup = '<div style="%css_position%"  class="gwt-shortcutMenu gwt-shortcutMenu__show" id="%sid%">' +
        '<table class="collapse">' +
        '<colgroup>' +
        '<col>' +
        '</colgroup>' +
        '<tbody>' +
        '<tr>' +
        '<td>' +
        '<div>' +
        ' <div class="shortcutRoundedPanel">' +
        ' <div class="srp_cnt">' +
        '   <div class="gwt-shortcutMenu-content">' +
        '  <div class="gwt-shortcutMenu-arrow_w">' +
        '    <div class="gwt-shortcutMenu-arrow"></div>' +
        '  </div>' +
        (arg.photo == '1' && !arg.group ? '<div class="sc-menu_user_img_w"><a href="/user/%uid%" class="o" hrefattr="true"><img src="/getPhoto?p=%photoid%&sz=thumb&g=%ugender%" class="sc-menu_user_img"></a></div>' :
            (arg.photo == '1' && arg.product == '1' ? '<div class="sc-menu_user_img_w"><a href="/market/product/%uid%" class="o" hrefattr="true"><img src="%photoid%" class="sc-menu_user_img"></a></div>' :
                (arg.photo == '1' && arg.group == '1' ? '<div class="sc-menu_user_img_w"><a href="/community/%uid%" class="o" hrefattr="true"><img src="%photoid%" class="sc-menu_user_img"></a></div>' : ''))) +
        '  <div class="highlight" aria-hidden="false">%uname%</div>' +
        ' <div class="gwt-shortcutMenu-header taCenter darkgray" aria-hidden="true" style="display: none;"></div>' +
        ' <div class="gwt-shortcutMenu-iconlink-splitter" aria-hidden="false"></div>' +
        ' <ul class="ul">' +
        (arg.product ? '<li class="ic_zoom" aria-hidden="false"><a href="/market/product/%uid%" hrefattr="true" data-open-marketproduct="%uid%" class="gwt-shortcutMenu-iconlink-item __pointer_curs"><span>View product</span></a></li>' : '') +
        (arg.story ? '<li class="ic_zoom" aria-hidden="false"><a href="javascript:void(0);" onclick="story.shortcutOpenStory(\'%uid%\')" class="gwt-shortcutMenu-iconlink-item __pointer_curs"><span>View story</span></a></li>' : '') +
        (arg.story ? '<li class="ic_add_to_story"><a href="javascript:void(0);" onclick="ga(\'[data-new-story-input]\').trigger(\'click\');" class="gwt-shortcutMenu-iconlink-item"><span>Add to story</span></a></li>' : '') +
        (arg.story ? '<div class="gwt-shortcutMenu-iconlink-splitter"></div><li class="ic_close-nh"><a href="javascript:void(0);" onclick="story.deleteStory(\'' + arg.story + '\');" class="gwt-shortcutMenu-iconlink-item"><span>Delete my story</span></a></li>' : '') +
        '<li class="ic_zoom %display_photo%" aria-hidden="false"><a href="/photo?q=%uid%&show=single&from=medium&o=%photoid_k%&cmd=openPhotoViewer&_token=' + (new Date().getTime()) + '" data-vphopen="1" data-vphi="%photoid_b%" class="gwt-shortcutMenu-iconlink-item __pointer_curs"><span>Zoom in</span></a></li>' +
        (arg.group || arg.product || arg.story ? '' : '<li class="ic_message" aria-hidden="false"><a href="javascript:;" onclick="return new_chat_window(this,event);" id="y-%uid%" data-uch=\'{"id":"%uid%","fullname":"%uname%","photo":"%photoid%"}\' class="gwt-shortcutMenu-iconlink-item"><span>Send a message</span></a></li>') +
        (arg.group ? '<li class="ic_zoom" aria-hidden="false"><a href="/community/%uid%" hrefattr="true" class="gwt-shortcutMenu-iconlink-item"><span>View group</span></a></li>' : (arg.product || arg.story ? '' : '<li class="ic_view_profile" aria-hidden="false"><a href="/user/%uid%" hrefattr="true" class="gwt-shortcutMenu-iconlink-item"><span>View profile</span></a></li>')) +
        (arg.product ? '<li class="ic_message" aria-hidden="false"><a href="javascript:;" onclick="return new_chat_window(this,event);" id="y-%product_author_id%" data-uch=\'{"id":"%product_author_id%","fullname":"%product_author_name%","photo":"%product_author_avatar%"}\' class="gwt-shortcutMenu-iconlink-item"><span>Contact seller</span></a></li>' : '') +
        (arg.product && (arg.edit_product == '1' || arg.delete_product == '1') ? '<div class="gwt-shortcutMenu-iconlink-splitter"></div>' : '') +
        (arg.product && arg.edit_product == '1' ? '<li class="ic_settings"><a href="javascript:void(0);" onclick="market.editProduct(this,event,\'%uid%\');" class="gwt-shortcutMenu-iconlink-item"><span>Edit product</span></a></li>' : '') +
        (arg.product && arg.delete_product == '1' ? '<li class="ic_delete"><a href="javascript:void(0);" onclick="market.deleteProduct(this,event,\'%uid%\');" class="gwt-shortcutMenu-iconlink-item"><span>Delete product</span></a></li>' : '') +
        (arg.call == '1' && NODEJS_ENABLED ? '<li class="ic_icon_18_friendCall" aria-hidden="false" style=""><a href="javascript:void(0);" onclick="messenger_shortcut.call(this,event,\'audio\',\'%uid%\');" class="gwt-shortcutMenu-iconlink-item"><span>Call</span></a>' : '') +
        '<div></div>' +
        '</li>' +
        (arg.invite_group == '1' && arg.group ? '<li class="ic_group" aria-hidden="false"><a href="javascript:void(0);" data-clubdata=\'{"clubid":"%uid%","title":"' + lang.community_invite_friends + '"}\' onclick="inviteFriendsToCommunity(this,event);" class="gwt-shortcutMenu-iconlink-item"><span>Invite to the group</span></a></li>' : '') +
        (arg.send_gift == '1' ? '<li class="ic_present" aria-hidden="false"><a href="/gifts/u/%uid%" hrefattr="true" class="gwt-shortcutMenu-iconlink-item"><span>Send a gift</span></a></li>' : '') +
        '<li class="ic_close-nh" aria-hidden="true" style="display: none;"><a href="javascript:;" class="gwt-shortcutMenu-iconlink-item"><span>Remove tag</span></a></li>' +
        '</ul>' +
        (arg.photos_friends == '1' ? '<div class="gwt-shortcutMenu-iconlink-splitter" aria-hidden="false"></div>' +
            '<ul class="ul" aria-hidden="false">' +
            '<li class="ic_photos"><a href="/photos/%uid%" hrefattr="true" class="gwt-shortcutMenu-iconlink-item"><span>Photos</span></a></li>' +
            '<li class="ic_ffriend"><a href="/friends/%uid%" class="gwt-shortcutMenu-iconlink-item"><span>Friends of your friend</span></a></li>' +
            ' </ul>' : '') +
        (arg.unblock == '1' || arg.block == '1' || arg.guest == '1' ? '  <div><div class="gwt-shortcutMenu-iconlink-splitter"></div><ul class="ul">' +
            (arg.unblock == '1' ? '  <li class="ic_block-off"><a href="javascript:;" data-unblockui="%uid%" onclick="removeBlackList(event,this);" class="gwt-shortcutMenu-iconlink-item"><span>Unblock</span></a></li>' : '') +
            (arg.block == '1' ? '  <li class="ic_block"><a href="javascript:;" onclick="event.preventDefault();event.stopPropagation();toBlackList(this,\'guest_blacklist\',\'' + data.uid + '\');return false;" class="gwt-shortcutMenu-iconlink-item"><span>Block</span></a></li>' : '') +
            (arg.guest == '1' ? '  <li class="ic_delete"><a href="javascript:;" data-hideguest="%uid%" onclick="hideFromGuests(event,this);" class="gwt-shortcutMenu-iconlink-item"><span>' + lang.hideFromGuests + '</span></a></li>' : '') +
            (arg.delete_bookmark == '1' ? '  <li class="ic_delete_bookmark"><a href="javascript:;" data-deletebookmark="%bookmarkid%" onclick="deleteBookmark(event,this);" class="gwt-shortcutMenu-iconlink-item"><span>' + lang.deleteBookmark + '</span></a></li>' : '') +
            '</ul></div>' : '') +

        (arg.unfriend == '1' ? '<div><div class="gwt-shortcutMenu-iconlink-splitter"></div><ul class="ul"><li class="ic_delete"><a href="javascript:;" onclick="return deleteFriend(this,event,1);" data-fid="f_%uid%" class="gwt-shortcutMenu-iconlink-item"><span>Unfriend</span></a></li></ul></div>' : '') +
        ' <ul class="ul">' +
        ' <div aria-hidden="true" style="display: none;">' +
        ' <div class="gwt-shortcutMenu-iconlink-splitter"></div>' +
        ' <li class="ic_delete"><a href="javascript:;" class="gwt-shortcutMenu-iconlink-item"><span>Remove from the list</span></a></li>' +
        ' </div>' +
        ' </ul>' +
        ' </div>' +
        ' </div>' +
        ' <div class="gwt-HTML"></div>' +
        ' </div>' +
        ' </div>' +
        '</td>' +
        ' </tr>' +
        ' </tbody>' +
        '</table>' +
        '</div>';
    /*
    var sh_el = $('[data-show-shortcut="true"]');
    var modul = sh_el.find('[data-module="ShortcutMenu"]');


    var sh_opts = {

            content: sh_markup,
    	delayOpen: parseInt(modul.data('show')),
            delayClose: parseInt(modul.data('hide')),
            closeOnMouseleave: true,onCloseComplete:function(){ $('.jBox-wrapper').remove();}
    	};

        sh_el.jBox('Tooltip',sh_opts);*/
    return sh_markup;
}

function shortcutActv(el) {
    var g = el.getAttribute('data-shortcut-inf');
    sh_user_details = validateJson(g);
}

function guest_blacklist(uid) {
    ga('#gu_' + uid)
        .remove();
}

function profile_blacklist(uid) {
    ga('#return_to_blacklist_pg')
        .trigger('click');
}
// unblock user
function removeBlackList(ev, el, f) {
    ev.preventDefault();
    ev.stopPropagation();
    var $el = ga(el);
    confirm_act(lang.unblock_confirm, function(event) {
        var uid = escape($el.data('unblockui'));
        var send = jAjax('/cmd.php', 'post', 'cmd=removeBlackList&id=' + uid);
        send.done(function(res) {
            if(res === '1') {
                /*	$el.closest('.u_cardsList_li')
                		.fadeOut(function ()
                		{
                			ga(this)
                				.remove();
                		});*/
                ga('#blck_uid_' + uid).fadeOut(function() {
                    ga(this)
                        .remove();
                });
            } else {
                displayErr(lang.unblock_err);
            }
            if(f) f();
        }); // ajax
    }); // confirmation
}


// block user
function toBlackList(obj, calbak, adt) {
    confirm_act(lang.blacklist_confirm, function(event) {
        var uid = adt ? escape(adt) : escape(sh_user_details.uid);
        var send = jAjax(pm__action, 'post', 'action=uToBlackList&to=' + uid);
        send.done(function(res) {
            if(res === '1') {
                window[calbak](uid);
            } else if(res === '0') {
                displayErr(lang.blacklist_err);
            } else if(res !== '1' && res !== '0') {
                displayErr(res);
            }
        }); // ajax
    }); // confirmation
}


// add to bookmark
function bookmarkthis(el, ev) {

    ev.preventDefault();

    el = ga(el);
    var b_data = el.data('bookmark'),
        b_categ = b_data.categ,
        b_itemid = b_data.itemid;

    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'bookmarkThis',
        'categ': b_categ,
        'itemid': b_itemid
    });
    send.done(function(data) {

        if(data === 'exist') {

            return kn_liveNotif(lang.already_bookmarked, 'warn', 5000, lang.the_item_is_already_in_your_bookmarks);

        } else if(data === '1') {

            switch (b_categ) {

                case 'user':
                    el.replaceWith('<div class="u_profile_bookmarked"><span class="tico"><i class="tico_img ic ic-ok"></i>' + lang.added_to_your_bookmarks + '</span></div>');
                    break;
                case 'photo':
                    el.find('i').replaceWith('<i class="ic tico ic_phly_bookmarked"></i>');
                    break;
                case 'post':
                    el.addClass('active').css('pointer-events', 'none');
                    break;

            }


            kn_liveNotif(lang.bookmark_added_title, 'done', 4000, lang.bookmark_added_descr);

        } else {
            return kn_liveNotif(lang.bookmark_add_error, 'error', 6000, lang.bookmark_add_error_descr);

        }

    });


}

// delete bookmark
function deleteBookmark(evt, el, f, c) {

    evt.preventDefault();

    el = ga(el);
    var b_id = el.data('deletebookmark');


    var send = jAjax('/cmd.php', 'post', 'cmd=deletebookmark&id=' + escape(b_id));
    send.done(function(data) {

        if(data === '1') {

            kn_liveNotif(lang.bookmark_removed_title, 'done', 4000, lang.bookmark_removed_descr);
            if(!f) ga('[data-bookmark="' + b_id + '"]').remove();
            else {

                switch (f) {

                    case 'photo':

                        el.find('i').replaceWith('<i class="ic tico ic_phly_bookmark"></i>');
                        el.addClass('__disabled');

                        break;

                    case 'post':
                        el.removeClass('active').css('pointer-events', 'none');
                        break;

                }


            }
            if(c) c();
        } else {

            return kn_liveNotif(lang.bookmark_remove_error, 'error', 6000, lang.bookmark_remove_error_descr);
        }



    });



}

// remove guest
function hideFromGuests(ev, el) {
    ev.preventDefault();
    ev.stopPropagation();
    var $el = $(el);
    confirm_act(lang.hideGuest_confirm, function(event) {
        var uid = escape($el.data('hideguest'));
        var send = jAjax('/cmd.php', 'post', 'cmd=removeGuest&id=' + uid);
        send.done(function(res) {
            if(res === '1') {
                //$el.closest('.u_cardsList_li')
                ga('#gu_' + uid).remove();
            } else {
                displayErr(lang.unblock_err);
            }
        }); // ajax
    }); // confirmation
}
// remove tag from post
function removeTagFromPost(obj, ev) {
    ev.preventDefault();
    var $el = $(obj);
    var post_id = $el.data('freq')
        .i;
    var author_id = $el.data('freq')
        .auth;
    var nid = $el.data('freq')
        .nid;
    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', 'cmd=removeTagFromPost&i=' + post_id + '&auth=' + author_id);
    send.done(function(data) {
        removeAjaxLoad();
        if(data == 0) return displayErr(lang.post_not_found);
        else {
            $('#hook_FormButton_fri_' + nid)
                .trigger('click');
        }
    });
}
// post as status
function postAsCurStatus(obj, ev) {
    ev.preventDefault();
    var $el = $(obj);
    if($el.closest('.feed')
        .hasClass('__setted')) return;
    var post_id = $el.data('postcurr')
        .i;
    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', 'cmd=setAsCurrPost&i=' + post_id);
    send.done(function(data) {
        removeAjaxLoad();
        if(data == 0) return displayErr(lang.post_not_found);
        else {
            $el.closest('.media_feed.status_pg')
                .find('.__setted')
                .removeClass('__setted')
                .find('span:last')
                .text(lang.set_as_curr_status);
            $el.addClass('__setted');
            $el.find('span:last')
                .text(lang.posted_as_status);
            setTimeout(function() {
                $('#post_page_reload')
                    .trigger('click');
            }, 500);
        }
    });
}
// delete posts
function deleteMyPost(ev, obj) {
    ev.preventDefault();
    var $el = $(obj);
    var post_id = $el.data('post-d')
        .i;
    var send = jAjax('/cmd.php', 'post', 'cmd=deleteMyPost&i=' + post_id);
    send.done(function(data) {
        if(data == 0) return displayErr(lang.post_not_found);
        else {
            ga('#pp_post_viewer .mlr_cnts,#st_fd_i_' + x_krypt(post_id))
                .addClass('__deleted');
            ga('#hook_Block_MiddleColumnTopCard_StatusNew')
                .hide();
        }
    });
}
// restore post
function restoreMyPost(ev, obj) {
    ev.preventDefault();
    var $el = $(obj);
    var post_data = JSON.stringify($el.data('post-d'));
    var send = jAjax('/cmd.php', 'post', 'cmd=restoreMyPost&d=' + post_data);
    send.done(function(data) {
        if(data == 0) return displayErr(lang.post_restore_err);
        else {
            $('#pp_post_viewer .mlr_cnts,#st_fd_i_' + x_krypt($el.data('post-d')
                    .i))
                .removeClass('__deleted');
            $('#hook_Block_MiddleColumnTopCard_StatusNew')
                .show();
        }
    });
}
// comment like 
function commentLike(el, e) {
    e.preventDefault();
    var $el = $(el);
    var comm_id = $el.closest('li')
        .attr('id')
        .match(/\d/g)
        .join('');
    if(!comm_id || !isNumeric(comm_id) || typeof _U.i == 'undefined') return displayErr(lang.err_tehnic);
    var $el_parent = $el.parent();
    /*if ($el.hasClass('curDefault') || $el.parent()
    	.hasClass('__liked')) return;
    */
    var sendCommLike = jAjax('/cmd.php', 'post', 'cmd=commLike&type=pos&comm_id=' + escape(comm_id));
    sendCommLike.done(function(d) {
        if(d == 1) {
            //$el.addClass('curDefault');
            $el_parent
                .addClass('__liked');
            $el.next()
                .text(parseInt($el.next()
                    .text()) + 1);

            var u_lk_markup = '<li class="userlkcomm _highlight_mprof_tooltip" id="u-%uid"><a class="ellip" data-clbk="removePopup" href="/user/%uid" hrefattr="true">%uname</a></li>';
            $el_parent.find('.nopeoplelikedthiscomm').hide();
            $el_parent.find('.commentslikestooptip').prepend(u_lk_markup.replace(/%uid/g, _U.i).replace(/%photo/g, _U.p).replace(/%uname/g, _U.n));
            setTimeout(function() {
                $el_parent.find('._highlight_mprof_tooltip').removeClass('_highlight_mprof_tooltip');
            }, 1500);
        } else if(d == 3) {
            $el_parent
                .removeClass('__liked');
            $el.next()
                .text(parseInt($el.next()
                    .text()) - 1);
            $el_parent.find('#u-' + _U.i).remove();
            if(!$el_parent.find('.commentslikestooptip>.userlkcomm').length) $el_parent.find('.nopeoplelikedthiscomm').show();
        } else if(d == 2) $el.parent()
            .addClass('__liked');
    });
}
// button [show previous replies] click
function commShowPrevReplies(el, ev, a) {
    ev.preventDefault();
    var $el = ga(el);
    if($el.data('rreply') == '0' || a) $el.closest('ol')
        .find('li:not(.__reply_for_reply).hidden')
        .fadeIn(function() {
            ga(this)
                .addClass('_replies__highlight')
                .removeClass('hidden');
        });
    else $el.closest('ol')
        .find('li.__reply_for_reply.hidden')
        .fadeIn(function() {
            ga(this)
                .addClass('_replies__highlight')
                .removeClass('hidden');
        });
    $el.hide();
    /*
    	setTimeout(function ()
    	{
    		ga('._replies__highlight')
    			.removeClass('_replies__highlight');
    	}, 7000);*/
}

function photoViewerGetCommentsMarkup(author, allow_edit, edited, can_be_edited, abia) {
    var phlayer_comm_markup = '<li class="comment %OPK% %REPLY% %DISPLAY%" data-aria-visible="%DISPLAY%" id="comment_%comm_id%">' + '<div class="comment-icon circle-icon ">' +
        '<span class="kn_shortcutmenu">	<span class="hookDataShortcut" data-shortcutmenudata=\'{"uid":"%author_id%","uname":"%author_name%","uphoto":"%author_photo%","ugender":"male","ulmen":{"photo":"0","guest":"0","block":"0","unblock":"0","unfriend":"0"}}\' id="hook_ShortcutMenu_%author_id%"></span>' +
        '<a href="/user/%author_id%">' +
        '<img title="%author_name%" alt="%author_name%" src="/getPhoto?p=%author_photo%&sz=small&g=%author_gender%" width="32" height="32">' +
        '</a></span>' +
        '</div>' +
        '<p class="comment-author">' +
        '<span class="kn_shortcutmenu">	<span class="hookDataShortcut" data-shortcutmenudata=\'{"uid":"%author_id%","uname":"%author_name%","uphoto":"%author_photo%","ugender":"male","ulmen":{"photo":"1","guest":"0","block":"0","unblock":"0","unfriend":"0"}}\' id="hook_ShortcutMenu_%author_id%"></span><a title="%author_name%" class="ellip" href="/user/%author_id%" hrefattr="true"><span data-authorname>%author_name%</span></a></span>' +
        '<span class="phlayer_comm_posting_progress ' +
        (abia ? '' : '__none') + ' _55yn _55yo _55ym"></span>' +
        '<span class="comment-date" title="%ADDED_TITLE%">%comment_date%</span>' +
        '<span class="' + (edited ? '__visible __opac1' : '') +
        ' comm_actions_report_edit __toRight">' +
        (author === _U.i && allow_edit && !edited && can_be_edited ? '<a href="javascript:;" data-comments-in="%COMMENTS_IN%" onclick="return comment_edit(this,event);" class="comment-edit ic tico_img icon-comment-edit" title="Edit"></a>' : '') +
        (edited && !can_be_edited ? '<a href="javascript:void(0);" onclick="event.preventDefault();return;" class=" comment-edit ic tico_img icon-comment-edit-upd" title="%EDITED_AT%"></a>' : '') +
        (author !== _U.i ? '<a href="javascript:;" onclick=\'var _thissobj = {"uid":' + _U.i + ',"id":"%comm_id%","type":"comment"}; return windowsPopup("report",_thissobj);\' class="comment-report mlr_top_ac_i ic12 ic12_warn ic tico_img ic-comm-report" title="Report"></a>' : '') +
        '</span>' +
        '</p>' +
        '<div class="comment-content">%comment%</div>' +

        '<div class="comment_bottom"><div class="comment-actions">' +
        '<div class="comment-likes %liked_view%">' +

        '<a href="javascript:void(0);" onclick="return replyToComment(this,event,\'%COMMENTS_IN%\');" class="comment-reply" title="' + lang.Reply + '"><i class="ic tico_img icon-comment-reply"></i>' + lang.Reply + '</a>' +
        '<span class="comm_reply_count" title="%replies_count% reply">%replies_count%</span>' +
        '<span class="comm_ics_bullet">&#8226;</span><span class="comment_likes_count_js"><a href="javascript:;" onclick="commentLike(this,event)" class="comment-like" title="' + lang.Like + '"><i class="ic tico_img icon-comment-like"></i>' + lang.Like + '</a>' +
        '<span data-commi="%comm_id%" class="comm_likes_count">%likes_count%</span></span>' +
        '</div>' +
        '</div></div>' +


        '</li>';


    return phlayer_comm_markup;
}

function delete_reply_storage() {
    localStorage.setItem('com_reply', '');
    localStorage.setItem('com_reply_author', '');
    localStorage.setItem('com_reply_id', '');
}
// reply to the comment
function replyToComment(el, ev, oni) {
    var $scrollToCommEl = '';
    var $el = ga(el);
    $el.addClass('__active');
    switch (oni) {
        case 'PhotoViewer':
            $scrollToCommEl = ga('.modal-new-phly');
            break;
        case 'localComms':
            $scrollToCommEl = $el.closest('.local_minimum_comments');
            break;
        case 'post':
            $scrollToCommEl = ga('#pp_post_viewer :scrollable:first');
            break;

        case 'market_product':
            $scrollToCommEl = ga('#window_market_product_view').length ? ga('#window_market_product_view').find(':scrollable') : ga('html,body');
            break;
    }
    ga('.__comm_cancel_reply')
        .trigger('click.commCancelReply');
    if($scrollToCommEl) {
        var reply_to_reply = '',
            reply_to_reply_html = '',
            reply_to_reply_author,
            send_as_reply_for_reply,
            emoji_input;
        var comm_parentLI = $el.closest('li');
        var _comm_id = comm_parentLI.attr('id')
            .match(/\d/g)
            .join('');
        var comm_id = comm_parentLI.attr('id');
        var getAuthorName = comm_parentLI.find('[data-authorname]')
            .html();
        var startScrollingFrom = $scrollToCommEl.scrollTop();
        switch (oni) {
            case 'PhotoViewer':
                emoji_input = ga('#pp_photo_viewer .phlayer_emoji_input_sticky');
                break;
            case 'localComms':
                emoji_input = $el.closest('.sect_comment_static')
                    .find('.scomments_static_add_comm');
                break;
            case 'post':
                emoji_input = $el.closest('.comm_widget').parent().parent().find('.comments-p-sticky');

                //$el.closest('.feed_post_comments_widget').length ? ga('.feed_post_comments_widget .comments-p-sticky') : ga('#pp_post_viewer .comments-p-sticky');
                break;
            case 'market_product':
                emoji_input = $el.closest('#product-item-details-comments-section').find('.comments-p-sticky');
                break;

        }



        $('.phlayer_ul_comms ul li:not(.__reply)')
            .not('#' + comm_id)
            .addClass('curDefault')
            .css('opacity', '0.4');
        emoji_input.addClass('__reply');
        if(comm_parentLI.hasClass('__reply') || comm_parentLI.hasClass('__reply_for_reply')) {
            reply_to_reply = 1;
            comm_parentLI.parents('li')
                .removeClass('curDefault')
                .css('opacity', '1');
        }
        if(comm_parentLI.hasClass('__reply_for_reply') && (oni == 'PhotoViewer' || oni == 'post' || oni == 'market_product')) {
            reply_to_reply_html = '<span class="post_reply_cl">@' + getAuthorName + '</span>,&nbsp;';
            reply_to_reply = '[postReply]@' + getAuthorName + '[/postReply],';
            send_as_reply_for_reply = getAuthorName;
            localStorage.setItem('com_reply_author', getAuthorName);
            _comm_id = comm_parentLI.closest('li.__reply')
                .attr('id')
                .match(/\d/g)
                .join('');
            reply_to_reply_author = comm_parentLI.closest('li.__reply')
                .find('[data-authorname]')
                .html();
        } else if(comm_parentLI.hasClass('__reply_for_reply') && oni == 'localComms') {
            reply_to_reply_html = '@' + getAuthorName + ', ';
            reply_to_reply = '[postReply]@' + getAuthorName + '[/postReply],';
            send_as_reply_for_reply = getAuthorName;
            localStorage.setItem('com_reply_author', getAuthorName);
            _comm_id = comm_parentLI.closest('li.__reply')
                .attr('id')
                .match(/\d/g)
                .join('');
            reply_to_reply_author = comm_parentLI.closest('li.__reply')
                .find('[data-authorname]')
                .text();
            emoji_input.find('textarea')
                .attr({
                    'replyauthorname': getAuthorName
                });
        }
        localStorage.setItem('com_reply', reply_to_reply ? 'reply_to_reply' : 'reply');
        localStorage.setItem('com_reply_id', _comm_id);
        if(!emoji_input.find('.comment_reply_text')
            .length) emoji_input.prepend('<div class="comment_reply_text">' + lang.Reply_to + ' ' + getAuthorName + ' &bull; <a href="javascript:;" class="__albastru __comm_cancel_reply">' + lang.cancel + '</a></div>')
            .find('.__comm_cancel_reply')
            .off('click.commCancelReply')
            .on('click.commCancelReply', function(e) {
                $el.removeClass('__active');
                emoji_input.removeClass('__reply');
                delete_reply_storage();
                if(oni == 'PhotoViewer' || oni == 'post' || oni == 'market_product') emoji_input.find('[contenteditable]')
                    .removeAttr('data-execreply').removeAttr('data-comm-reply').removeData('reply-commd').removeAttr('data-reply-commd')
                    .empty();
                else if(oni == 'localComms') emoji_input.find('textarea')
                    .removeAttr('data-comm-reply').removeAttr('replyauthorname').removeAttr('data_reply_commi').removeData('reply-commd').removeAttr('data-reply-commd')
                    .val('')
                    .focus();
                $('.phlayer_ul_comms ul li')
                    .removeClass('curDefault')
                    .css('opacity', '1');
                $('.comment_reply_text')
                    .remove();
                $scrollToCommEl.animate({
                    scrollTop: startScrollingFrom
                }, 'fast');
            });

        if(emoji_input.offset()
            .top > $el.offset()
            .top + $el.closest('li')
            .height()) $scrollToCommEl.animate({
            scrollTop: '-=' + Math.abs(emoji_input.offset()
                .top - $el.offset()
                .top - $el.closest('li')
                .height()) + 'px'
        }, 'fast');
        else $scrollToCommEl.animate({
            scrollTop: '+=' + Math.abs(emoji_input.offset()
                .top - $el.offset()
                .top - $el.closest('li')
                .height()) + 'px'
        }, 'fast');
        if(reply_to_reply && (oni == 'PhotoViewer' || oni == 'post' || oni == 'market_product')) emoji_input.find('[contenteditable="true"]')
            .html(reply_to_reply_html)
            .focusEnd();
        else if(reply_to_reply && oni == 'localComms') emoji_input.find('textarea')
            .val(reply_to_reply_html)
            .focus();
        if(oni == 'PhotoViewer') {
            emoji_input.find('[contenteditable="true"]')
                .attr('data-execreply', true)
                .off('keypress.replyComm')
                .on('keypress.replyComm', function(e) {
                    if(e.keyCode == 13) {
                        var __com_txt_value = $('#phlayer-com-emoji');
                        $(this)
                            .find('.post_reply_cl')
                            .remove();
                        sendComment(_comm_id, $('#phlayer-com-emoji')
                            .val(), $(this), e, 'PhotoViewer', '', reply_to_reply ? 'reply_to_reply' : 'reply', send_as_reply_for_reply);
                        $(this)
                            .empty();
                        $(this)
                            .off('keypress.replyComm')
                            .removeData('execreply');
                        $('.__comm_cancel_reply')
                            .trigger('click');
                    }
                })
                .focus();
        } else if(oni == 'localComms') {
            emoji_input.find('textarea').attr('data_reply_commi', _comm_id).attr('data-comm-reply', reply_to_reply ? 'reply_to_reply' : 'reply');

        } else if(oni == 'post' || oni == 'market_product') {
            var obj = {};
            obj['comm_i'] = _comm_id;
            obj['reply_mode'] = reply_to_reply ? 'reply_to_reply' : 'reply';
            if(reply_to_reply) obj['auth'] = getAuthorName;
            emoji_input.find('[contenteditable="true"]').attr('data-reply-commd', JSON.stringify(obj));
            //.attr('data-reply-commd', JSON.stringify(obj));
        }
    }
}
// load previous comments
function _comments_loadPrev(el, ev, m, categ, cont) {
    ev.preventDefault();
    var $el = ga(el);
    var itemID = $el.data('loadcommentsforphi');
    $el.addClass('__loading curDefault')
        .find('i:first')
        .addClass('_55yn _55yo _55ym')
        .closest($el)
        .find('span:first')
        .text(lang.Please_wait + '...');
    switch (m) {
        case 'PhotoViewer':
            getComments(itemID, $el);
            break;
        case 'localComms':
            photoCommentBfLayer(ev, '', itemID, $el);
            break;
        case 'comm_widget':
            WD_getComments(itemID, categ, ga(cont), $el, 2);
            break;
    }
    //commShowPrevReplies(el,ev,1);
}
// update comment
function _update_comment(_comm_id, txt) {
    if($.trim(txt) && $.trim(_comm_id)) {
        var _comm_update = jAjax('/cmd.php', 'post', 'cmd=updateComment&comm_id=' + escape(_comm_id) + '&text=' + txt + '&view_as=json&up_from=' + escape(_U.i));
        _comm_update.done(function(data) {
            if(data == 0) return displayErr(lang.err_editing_comment);
            else if(data == 2) return displayErr(lang.comm_update_empty);
            else if(data == 3) return displayErr(lang.comm_update_notfound);
            // success
            else {
                var _editing_comment = $('li#comment_' + _comm_id);
                _editing_comment.find('.comment-content')
                    .html(data);
                _editing_comment.find('.comment-edit')
                    .trigger('click');
                _editing_comment.find('.comment-edit')
                    .addClass('icon-comment-edit-upd curDefault')
                    .removeAttr('onclick')
                    .off('click');
            }
        });
    } else {
        return displayErr(lang.err_editing_comment);
    }
}
// send comment
function sendComment(pid, comm, text_editor, e, oni, callback, reply, author_name) {
    e.preventDefault();
    var random_id = new Date()
        .getTime();
    var _comm_editing = isNumeric(text_editor.attr('comment_edit')) ? text_editor.attr('comment_edit') : '';
    var __post_as_reply = author_name ? '[postReply]@' + author_name + '[/postReply][postreplyvirgula],[/postreplyvirgula]' : '';
    var send_data = {},
        reply_send_data = {};
    send_data['cmd'] = 'photoPostComment';
    send_data['type'] = 'pos';
    send_data['view_as'] = 'json';
    send_data['comment'] = comm;
    send_data['commToPhoto'] = escape(pid);
    reply_send_data['cmd'] = 'commentPostReply';
    reply_send_data['type'] = 'pos';
    reply_send_data['view_as'] = 'json';
    reply_send_data['comment'] = __post_as_reply + (author_name ? comm.replace('@' + author_name + ',', '') : comm);
    reply_send_data['commid'] = escape(pid); // in reply mode, this is comment id
    if(reply == 'reply_to_reply') reply_send_data['reply_to_reply'] = 1;
    delete_reply_storage();
    if(_comm_editing) {
        return _update_comment(_comm_editing, comm);
    }
    if(oni == 'PhotoViewer') {
        var count = 0;
        var _comm_emoji_space = $('.phlayer_emoji_input_sticky .emoji_space');
        var _comm_send_files = _comm_emoji_space.find('.jb_attached_files');
        var _comm_send_files_c = _comm_send_files.children();
    }
    if(!$.trim(pid)) return displayErr(lang.photo_comment_error);
    else if(!$.trim(comm) && !_comm_send_files_c.length) return text_editor.focus();
    if(oni == 'PhotoViewer') {
        var _comm_appendTo = reply ? $('.phlayer_ul_comms>ul li#comment_' + pid) : $('.phlayer_ul_comms>ul');
        var photoViewerCommMarkup = photoViewerGetCommentsMarkup(_U.i, 1, '', _comm_send_files_c.length ? 0 : 1),
            jq_CommMarkup = $(photoViewerCommMarkup),
            scrollingModal = $('.modal-new-phly'),
            comm_markup_ready = photoViewerCommMarkup.replace(/%comment%/g, comm.replace('<', '&lt;')
                .replace('>', '&gt;')
                .replace('@' + author_name, '')
                .replace('[postReply]', '')
                .replace('[/postReply]', ''))
            .replace('%OPK%', '__comment_posting')
            .replace(/%comment_date%/g, '')
            .replace(/%ADDED_TITLE%/g, lang.right_now)
            .replace(/%REPLY%/g, reply ? '__reply' : '')
            .replace(/%replies_count%/g, '')
            .replace(/%comm_id%/g, random_id)
            .replace(/%COMMENTS_IN%/g, oni)
            .replace(/%author_id%/g, _U.i)
            .replace(/%author_name%/g, _U.n)
            .replace(/%author_photo%/g, _U.p)
            .replace(/%author_gender%/g, _U.g)
            .replace(/%likes_count%/g, 0)
            .replace(/%liked_view%/g, '')
            .replace(/%cur_default%/g, 'curDefault');
        /// send files
        if(_comm_send_files_c.length > 0) {
            for(var i = 0; i < _comm_send_files_c.length; i++) {
                var bj_ph = _comm_send_files.find('.attach-photo_del:eq(' + i + ')');
                var jb_ph = bj_ph.attr('id')
                    .split('_')[1];
                var _attached = bj_ph.data('attached') ? 1 : 0;
                var inceput = count == 0 ? '[divstart]' : '';
                var sfarsit = count + 1 == _comm_send_files_c.length ? '[divend]' : '';
                comm += inceput + '[img]' + escape(jb_ph) + (_attached ? '&from=attach&' : '') + '[/img]' + sfarsit;
                send_data['comment'] = comm.replace(/undefined/g, '');
                reply_send_data['comment'] = comm.replace(/undefined/g, '');
                count++;
            }
        }
        if(reply && !_comm_appendTo.find('ol')
            .length) {
            _comm_appendTo.append('<ol class="comm_replies ' + ($('li#comment_' + pid)
                .parent()
                .prop("tagName") == 'OL' ? '__0p' : '') + '" id="repliesfor_' + pid + '"></ol>');
            _comm_appendTo = _comm_appendTo.find('.comm_replies#repliesfor_' + pid);
        } else if(reply && _comm_appendTo.find('ol')
            .length) _comm_appendTo = _comm_appendTo.find('.comm_replies#repliesfor_' + pid);
        _comm_appendTo.append(comm_markup_ready)
            .find('li#comment_' + random_id + ' ._55yn')
            .removeClass('__none');
        !reply ? scrollingModal.scrollTop(scrollingModal[0].scrollHeight) : '';
    }
    if(oni == 'PhotoViewer') text_editor.empty()
        .focus();
    else if(oni == 'localComms') text_editor.val('')
        .focus();
    var send_comm = jAjax(reply ? '/cmd.php' : '/profile', 'post', reply ? reply_send_data : send_data);
    send_comm.done(function(data) {
        var res = validateJson(data);
        if(res.s) {
            var text = res.text.replace(/\\/g, ""),
                com_id = res.comm_id,
                com_added = res.added;
            var actual_comment = reply ? $('.phlayer_ul_comms>ul li#comment_' + random_id) : $('.phlayer_ul_comms>ul>li#comment_' + random_id);
            actual_comment.removeClass('%OPK% __comment_posting')
                .find('._55yn')
                .remove();
            actual_comment.find('.comment-date')
                .html('&crarr;');
            actual_comment.find('.comment-content')
                .html(text);
            comm_markup_ready = actual_comment[0].outerHTML;
            actual_comment.attr('id', 'comment_' + com_id);
            if(oni == 'PhotoViewer') {
                var phlayer_comm_count = $('#phly_comments_id');
                phlayer_comm_count.text(Math.ceil(parseInt(phlayer_comm_count.text()) + 1));
                _comm_send_files.empty();
            }
        }
        if(callback) callback(comm_markup_ready.replace(/amp;/g, ''));
    });
}

function sendRate(obj, e, dataRate) {
    e.preventDefault();
    var rated_markup = '<div title="' + lang.your_rate_is + '" class="phlayer_rating_stars __exist_rating __dbld" id="phlayer_rating_stars">\
    <div id="star_already_rated_0_simulator" class="star_bg" style="position: absolute; top: 0px; left: #rate_bg#px; padding: 0px; margin: 0px; width: 120px; height: 24px; z-index: 0; background-position: -#rate_bg#px 0px;background-repeat: repeat-x;"></div>\
    <div id="star_already_rated_1_simulator" class="star_bg" style="position: absolute; top: 0px; left: 0px; padding: 0px; margin: 0px; width: #rate_bg#%; height: 24px; z-index: 1; background-position: 0px -24px;background-repeat: repeat-x;"></div>\
    <div class="phly_rating_inf"><div class="ic tico ic_voted_succ"></div><span class="phly_maxrw">%rated_sum%</span>/5 (from %rated_times% ratings)</div></div>';
    var $obj = ga(obj);
    var pid = escape($obj.closest('[data-photoc-id]')
        .data('photoc-id'));
    var stele = dataRate;
    if(stele == 255) {
        switch ($obj.css('width')
            .replace('px', '')) {
            case '24':
                stele = 1;
                break;
            case '48':
                stele = 2;
                break;
            case '72':
                stele = 3;
                break;
            case '96':
                stele = 4;
                break;
            case '120':
                stele = 5;
                break;
        }
    }

    var is_community = $obj.closest('#phlayer_rating_stars').hasClass('is_community') ? '&clubid=1' : '';

    var send_rate = jAjax('/profile', 'post', 'cmd=rateit&type=pos&itemid=' + pid + '&rate=' + stele + is_community);
    send_rate.done(function(s) {
        var s = validateJson(s);
        if(s.success) {
            $('#phlayer_ratings')
                .html(rated_markup.replace('%s', stele)
                    .replace(/#rate_bg#/g, s.rate_bg)
                    .replace('%rated_sum%', s.rate_value)
                    .replace('%rated_times%', s.rate_times));
        }
    });
}
// create popups like windows 8 (full width, auto height)
function windowsPopup(cmd, dt) {
    var send = jAjax('/profile', 'post', 'cmd=wpopups&type=pos&action=' + cmd + '&dt=' + JSON.stringify(dt));
    send.done(function(data) {
        var $data = ga(data);
        var $wp_b = ga('body');
        $data.find('.close_x_right_btn,.w8_cancel_form,.layer_ovr')
            .off('click.closew8p')
            .on('click.closew8p', function(e) {
                e.preventDefault();
                ga('#w8fullw_popup')
                    .remove();
            });
        if(!$wp_b.find('#w8fullw_popup')
            .length) $wp_b.prepend($data)
            .find('.w8_popup_style')
            .css('top', (ga(window)
                .height() - $data.find('.w8_popup_style')
                .outerHeight()) / 2);
    });
}

function removeFtTpaPopup() {

    ga('body').find('#pp_ft_markup').remove();

}

function reportThis(evt) {

    evt.preventDefault();

    var _this = ga(evt.target);
    var _obj = _this.data('reportobj');
    var _reason = _this.closest('#cfrmPopLayerRegisterSpam').find('#defaultreason').text();

    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'report_this',
        'item_id': _obj.id,
        'item_type': _obj.type,
        'reason': _reason
    });
    send.done(function(data) {
        removeAjaxLoad();
        if(data === '1') {
            ga('#w8fullw_popup').fadeOut(function() {
                ga(this).remove();
            });
            kn_liveNotif(lang.Reported, 'done', 5000, lang.your_report_has_been_successfully_sent);
        } else
            kn_liveNotif('Ooops!', 'warn', 4000, lang.err_tehnic);

    });
}

// contact support
function contactUs(e) {
    if(e) e.preventDefault();
    else e = window.event || event;
    if($.socplusMusic) {
        $.socplusMusic('feedback');
        removeAjaxLoad();
    } else {
        ajaxLoading();
        mus_trig_click(1);
        checkMusicLife(e, 'contactUsApply');
    }
}

function contactUsApply() {
    $.socplusMusic('feedback');
    removeAjaxLoad();
}

function tpaPopup(evt) {

    evt.preventDefault();
    var _this = ga(evt.target);
    var _m = _this.data('mm');
    var $body = ga('body');
    var _pp_ft_markup = ga('<section/>').attr('id', 'pp_ft_markup');
    var _jb41ll = '<div onclick="removeFtTpaPopup();" class="layer_ovr _dark"></div>';
    _pp_ft_markup.html(_jb41ll + '<div id="pp_ft_cnt"><div class="ft_title"></div><div class="nano"><div class="ft_cnt nano-content"></div></div></div>');

    $body.find('#pp_ft_markup').remove();

    $body.prepend(_pp_ft_markup);

    var send = jAjax('/cmd.php', 'post', 'cmd=tpapopup&a=' + _m);

    send.done(function(data) {

        var d = validateJson(data);

        if(d) {


            $body.find('#pp_ft_markup .ft_cnt').html(d.cnt);
            $body.find('#pp_ft_markup .ft_title').html(d.title + '<a href="javascript:;" onclick="removeFtTpaPopup();" class="ft_done_btn">' + lang.Done + '</a>');
            $body.find('#pp_ft_markup .nano').nanoScroller();

            ga('body').off('keyup.closeTpaPopup').on('keyup.closeTpaPopup', function(e) {

                if(e.keyCode == 27 || e.keyCode == 13) removeFtTpaPopup();
            });

        }

    });


}

function rpopup(event, data, theme, type, mt, h, w, pd) {
    var event = event || window.event;
    var sub;
    var data = data.split('?')[1];
    event.preventDefault();
    removePopup(1);
    keepScrollBar = ga('body')
        .scrollTop();

    var $body = ga('body');
    if(theme === 'sub_header') {
        $body
            .addClass(_nscroll)
            .prepend('<section class="popup_container __z100">' + '<div class="popup_ovr __mlight"></div>' + '<div class="st_nv_popup_content"><div class="popup_waiting_ic">' + lang.Please_wait + '...</div></div>' + '</section>');

    } else {
        !theme ?
            $body
            .addClass(_nscroll)
            .prepend('<section class="popup_container"><div class="popup_ovr"></div><div class="st_nv_popup_content"><div class="popup_waiting_ic">' + lang.Please_wait + '...</div></div><div class="pright_corner bvkr"><div class="js_popup_close ic"></div></div></section>') :
            $body
            .addClass(_nscroll)
            .prepend('<section class="popup_container">' + '<div class="popup_ovr __light"></div>' + '<div class="st_nv_popup_content __light"><div class="popup_waiting_ic __small">' + lang.Please_wait + '...</div></div></section>');
    }
    setTimeout(popupMainBtns, 100);
    // as json
    var request = jAjax(_st.purl, !type ? 'get' : 'post', data + '&view_as=json');
    request.fail(function(a, b) {
        return displayErr(lang.somethingWrong + ' <br/> ' + b.status)
    });
    request.done(function(data) {
        var parseData = validateJson(data);
        ga('.st_nv_popup_content')
            .replaceWith(parseData['content']);
        setTimeout(popupMainBtns, 100);
        psize = resizePopup(mt, h, w, theme, pd);
    });
    return request;
}
// build slide popup (the right & left popup)
function rsSidPopup(pos, width, pd) {
    var c = ga('#hook_Block');
    var o = ga('.popup_ovr');
    var css = {};
    css['position'] = 'fixed';
    css[pos] = -(width + 100);
    css['width'] = width;
    css['height'] = '100%';
    css['border-' + (pos === 'left' ? 'right' : 'left')] = '1px solid #7f919e';
    css['zIndex'] = 30;
    css['padding'] = pd >= 1 ? (pd == 1 ? 0 : pd) : 20;
    css[pVendor + 'transition'] = pVendor + 'transform ' + _st.popup_anim_dur + 'ms ' + _st.popup_easing;
    c.css(css);
    o.css('background', 'rgba(0, 0, 0, 0.9)');
    if(pos === 'right') c.delay(150)
        .queue(function() {
            c.css(pVendor + 'transform', bFeature + '(-' + (width + 100) + 'px, 0, 0) translateZ(0)')
        });
    else c.delay(150)
        .queue(function() {
            c.css(pVendor + 'transform', bFeature + '(' + (width + 100) + 'px, 0, 0) translateZ(0)')
        });
    return [c.width(), c.height()];
}

function resizePopup(mt, h, w, p, pd) {
    var c = ga('#hook_Block');
    var t = p ? ga('table.mw_tbl') : '';
    var style = {};
    // if p have value, mean is the light popup called
    if(t) t.css('width', w);
    if(p == 'right' || p == 'left') return rsSidPopup(p, w, pd);
    var mxH = mt ? parseInt(_winH - 40) : (_winH / 2) - (c.height() / 2);
    style['marginTop'] = p == 'sub_header' ? '50' : (_winH - mxH) / 2;
    style['marginLeft'] = p == 'sub_header' ? '' : (_winW - (w === 'auto' || !w ? c.width() : w)) / 2;
    style['visibility'] = 'visible';
    style['overflow'] = 'hidden';
    style['height'] = h == 'auto' ? mxH : (!h ? '' : h);
    style['width'] = w == 'auto' ? _winW - 100 : (!w ? '' : w);
    c.css(style);
    return [c.width(), c.height()];
}

function selectProfilePhoto(ev, el) {



    var send = rpopup(ev, el.getAttribute('href'), false, false, true);
    send.done(function(data) {
        createUrl('', '', el.getAttribute('href'));
        var d = validateJson(data);


        if(d == '0') {


            return displayErr(lang.somethingWrong);

        } else {
            ga('.pright_corner.bvkr').remove();




        }

    });

}


/* photos */
// set album cover
function setAlbumCover(el, ev) {
    ev.preventDefault();
    var $el = $(el),
        href = $el.attr('href')
        .split('?'),
        url = href[0],
        data = href[1];
    var send = jAjax(url, 'post', data + '&type=pos&view_as=json');
    send.done(function(data) {
        if(data !== '0') {
            $('.photos_content')
                .find('.__current_album_cover')
                .removeClass('__disabled __current_album_cover');
            $el.addClass('__disabled __current_album_cover');
        } else {
            return displayErr(lang.somethingWrong + ' [at update album cover]');
        }
    });
}
// remove photos movement panel
function removeMovementPanel() {
    var panel = $('#movePhotos_header');
    panel.switchClass('__on', '__off', 100)
        .promise()
        .done(function() {
            var _this = $(this);
            setTimeout(function() {
                _this.remove()
            }, 500)
        });
}

function moveSelectedPhotos(a, b, albumId) {
    b.preventDefault();
    var animFileTransfer = $('<div id="file-transfer-mv-ph"><div class="layer_ovr _libg"></div><div class="fAnimTransfer"></div></div>');
    if(typeof checkedCount != 'function' || checkedCount() <= 0) return displayErr(lang.requiredCheckedPhotos);
    if($('#file-transfer-mv-ph')
        .length != 0) return false;
    else $('body')
        .prepend(animFileTransfer);
    if(movementPhotosArray.length > 0) {
        var formData = new FormData();
        formData.append('mvarr[]', movementPhotosArray);
        formData.append('cmd', 'movePhotos');
        formData.append('type', 'pos');
        formData.append('view_as', 'json');
        formData.append('i', escape(albumId));
        formData.append('q', escape(currAlbum()));
        var sendPhotos = jAjax('/profile', 'post', formData, 1);
        sendPhotos.done(function(data) {
            if(data != '1') return displayErr(lang.somethingWrongAtMovePhotos);
            else setTimeout(function() {
                // remove file transfer dialog
                animFileTransfer.remove();
                for(var i = 0; i < movementPhotosArray.length; i++) $('#pp_' + movementPhotosArray[i])
                    .closest('.ec_items')
                    .remove();
                // close header panel
                $('.close_movment_panel')
                    .trigger('click');
                movementPhotosArray = new Array();
            }, 700);
        });
    } else {
        return displayErr(lang.somethingWrongAtMovePhotos);
    }
}

function toThisAlbum(el, ev, albumId) {
    ev.preventDefault();
    var parentSlider = $('#nb-move-to-albums');
    var sClass = "_selected";
    parentSlider.find('.nb-thumbnail.' + sClass)
        .removeClass(sClass);
    $(el)
        .addClass(sClass);
    $('.bklbtn')
        .addClass('__active', 200)
        .on('click', function(e) {
            moveSelectedPhotos($(this), e, albumId)
        });
}

function currAlbum() {
    var c = $('body')
        .find('[parent-alb="true"]');
    return c.length != 0 ? c.attr('id') : 0;
}
// move photos
function movePhotos(el, evt) {
    evt.preventDefault();
    var chb;
    var $el = $(el);
    var objBtn = $('#obj_photos_movement');
    var selectableClass = "selectable-card";
    var selectedClass = "__selected";
    var parentC = "ec_items";
    var photos_grid = $('.photos_content .' + parentC + ':not(:first)');
    var photosCount = photos_grid.length;
    if($el.attr('id') != 'obj_photos_movement') objBtn.addClass('__disabled');
    else $el.addClass('__disabled');
    var getHeader = function() {
        ajaxLoading();
        var req = jAjax(_THEME + '/nav/profile/movePhotosHeader.html', 'get', '');
        req.done(function(markup) {
            var $body = $('body');
            var $m = $(jprintf(markup, lang.selectAll, lang.move));
            var min_slider = $m.find('.album_slider');
            var getAlbums = jAjax('/profile', 'post', 'q=' + escape(currAlbum()) + '&cmd=getAlbums&type=pos&view_as=json&token=' + (new Date())
                .getTime());
            //min_slider.html('<h3 style="color:#fff;vertical-align:middle;">'+lang.loading+'</h3>');
            getAlbums.done(function(albums) {
                if(albums == '0') {
                    bal = 0;
                    return displayErr(lang.somethingWrong);
                } else if(albums == '0-albums') {
                    bal = 0;
                    return displayErr(lang.no_albums);
                }
                var v = validateJson(albums);
                min_slider.html(v['content'])
                    .find('#nb-move-to-albums')
                    .nobleSlider({
                        _SLIDER_BEZIER_ENGINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)', // bezier function
                        _SLIDE_ANIMATION_DURATION: 500, // miliseconds
                        _SHOW_ONLY_THUMBS: true,
                        _SLIDER_WIDTH: 500,
                        _SLIDER_HEIGHT: 0,
                        _SLIDE_LOOP: false,
                        _AUTO_PLAY_SLIDE: false,
                        _ENABLE_PAGINATION: false,
                        _ENABLE_ARROWS: false,
                        // _VISIBLE_DIMENSION: '100%',
                        _THUMB_SIZE_WIDTH: 75,
                        _THUMB_SIZE_HEIGHT: 80,
                        _THUMB_ENABLE_ARROWS: true,
                        _THUMB_ARROWS_FADE: true,
                        _HIDE_THUMB_ARROWS_WHEN_SLIDE_END: true
                    });
                removeAjaxLoad();
            });
            if($('body')
                .find('#movePhotos_header')
                .length != 0) return false;
            else {
                $body.find('.toolbar')
                    .after($m);
                $m.switchClass('__off', '__on', 100);
                enableFuncBtn();
            }
        });
    }
    var unseAll = function(mode, rem) {
        photos_grid.each(function(i) {
            var $this = $(this);
            // select all
            if(!mode) {
                $this.removeClass(selectedClass);
                moveThis($this, true);
            }
            // deselect all
            else {
                if(rem) {
                    objBtn.removeClass('__disabled');
                    $this.removeClass('selectable-card')
                        .find('#selectable_controls')
                        .remove();
                }
                $this.removeClass(selectedClass);
                moveThis($this);
            }
        });
    }
    var enableFuncBtn = function() {
        chb = $('#check_all_photos');
        chb.find('input')
            .on('click', function(e) {
                var _this = $(this);
                if(_this.prop('checked')) unseAll();
                else unseAll(1);
            });
        delete chb;
    }
    removeThisPanel = function() {
        unseAll(1, 1);
        removeMovementPanel();
    }
    checkedCount = function() {
        var c = $('.' + parentC)
            .filter('.' + selectedClass)
            .length;
        return c;
    }
    var moveThis = function(obj, a) {
        var $x = obj;
        var parenElPhot = $x.closest('.' + parentC);
        var pID = parenElPhot.find('span:first')
            .attr('id')
            .split('_')[1];
        if(a) {
            parenElPhot.addClass(selectedClass);
            movementPhotosArray.push(pID);
        } else {

            parenElPhot.removeClass(selectedClass);
            var key = movementPhotosArray.pindexof(pID);
            delete movementPhotosArray[key];
        }
        var intm = setInterval(function() {
            if(chb && typeof chb == 'object') {
                clearInterval(intm);
                if(checkedCount() >= photosCount) chb.children('input')
                    .prop('checked', true);
                else chb.children('input')
                    .prop('checked', false);
            }
        }, 10);
    }
    var checkThis = function(_this, evt) {
        evt.stopImmediatePropagation();
        if(!_this.closest('.' + parentC)
            .hasClass(selectedClass)) moveThis(_this, true)
        else moveThis(_this)
    }
    getHeader();
    photos_grid.each(function(i) {
        var $this = $(this);
        $this.addClass(selectableClass)
            .children(':first')
            .append('<div id="selectable_controls"><span class="selectable-card_ovr"></span><span class="selectable-card_ic"></span></div>');
        $this.on('click', function(e) {
            e.preventDefault();
            checkThis($(this), e);
        });
    });
}
// delete album
function delete_album(event, obj, albumId) {
    event.preventDefault();
    ajaxLoading();
    // escape
    var id = escape(albumId);
    var aj = jAjax('/profile.php', 'post', 'type=pos&cmd=deleteAlbum&i=' + id + '&view_as=json');
    aj.done(function(resp) {
        var res = validateJson(resp);
        if(res['response'] != '1') return displayErr(res['message']);
        else {
            $('.ul_album#a_' + res['id'])
                .fadeOut(1200, function() {
                    $(this)
                        .remove()
                });
            removePopup();
        }
        removeAjaxLoad();
    });
}
//create new album
function addAlbum(el, event, edit) {
    event.preventDefault();
    var p = rpopup(event, el.getAttribute('href'), 'right', false, false, 0, 260);
    p.done(function(data) {
        if(edit) {
            var form = $('form[name="doAlbum"]');
            var ni = $(el)
                .data('album-ni'),
                visible_to = $(el)
                .data('album-c');
            form.prepend('<input type="hidden" name="edit" value="' + ni['id'] + '"/>');
            ///form.find('input[name="cmd"]').val('editAlbum');
            ga('#albumNam')
                .val(urldecode(ni['name']));
            ga('button[name="button_plpscp_confirm"]')
                .text(lang.save)
                .removeAttr('onclick')
                .on('click', function(e) {
                    doNewAlbum(form[0], e, ni['id'])
                });
            ga('button.custom_popup_close')
                .addClass('__delete')
                .removeClass('custom_popup_close')
                .text(lang.del)
                .on('click', function(e) {
                    confirm_act(lang.confirm_delete_album, function(event) {
                        delete_album(e, this, ni['id']);
                        photoTabClick();
                    })
                });
            ga('.squaredFour input')
                .removeAttr('checked');
            ga('.header_til')
                .text(lang.sett);
            for(var i = 0; i < visible_to.length; i++) ga('.squaredFour input[value="' + visible_to[i] + '"]')[0].checked = true;
        }
    });
}
// update profile's photo
function cropPhoto(p) {
    var cropper;
    var showCoords = function(c, img, oimgW, oimgH) {
        var fackW = img.width(),
            fackH = img.height();
        ga('#js_crop_x')
            .val(c.x);
        ga('#js_crop_y')
            .val(c.y);
        ga('#js_crop_x2')
            .val(c.x2);
        ga('#js_crop_y2')
            .val(c.y2);
        ga('#js_crop_w')
            .val(c.w);
        ga('#js_crop_h')
            .val(c.h);
        ga('#js_crop_w2')
            .val(fackW);
        ga('#js_crop_h2')
            .val(fackH);
        ga('#js_crop_w3')
            .val(oimgW);
        ga('#js_crop_h3')
            .val(oimgH);
    };
    var img = new Image();
    img.src = p;
    var alloWstart = false;
    img.onload = function() {
        var imgW, imgH;
        if(typeof this.naturalWidth != 'undefined' || this.naturalWidth) {
            imgW = this.naturalWidth;
            imgH = this.naturalHeight;
        } else {
            imgW = this.width;
            imgH = this.height;
        }
        if(imgW <= _st.min_crop_w || imgH <= _st.min_crop_h) {
            removePopup();
            return displayErr(lang.err_small_img.replace('%x', _st.min_crop_w)
                .replace('%y', _st.min_crop_h));
        } else {
            $.getScript(_THEME + "/js/cmd/jcrop/jquery.Jcrop.js")
                .done(function(s, Status) {
                    cropper = ga('#jcrop_img')
                        .Jcrop({
                            setSelect: [0, imgH, 0, 0],
                            createHandles: ['nw', 'ne', 'se', 'sw'],
                            aspectRatio: 1,
                            handleOpacity: 1,
                            trueSize: [imgW, imgH],
                            minSize: [224, 224],
                            fadeTime: 500,
                            bgFade: true,
                            borderOpacity: 1,
                            onChange: function(c) {
                                showCoords(c, ga('.cropper_img'), imgW, imgH);
                                if(alloWstart) ga('#__plpcte_buttons')
                                    .addClass('__hidden');
                                setTimeout(function() {
                                    alloWstart = true;
                                }, 1500)
                            },
                            onSelect: function() {
                                ga('#__plpcte_buttons')
                                    .removeClass('__hidden');
                            },
                        });
                })
                .fail(function(jqxhr, settings, exception) {
                    displayErr("Something went wrong" + exception);
                });
        }
    }
}

function js_subForm(f, url, type) {
    var hform = ga(f);
    var s = $.ajax({
        url: url ? url : hform.attr('action'),
        type: type ? type : hform.attr('method'),
        data: hform.serialize()
    });
    s.fail(function(a, b) {
        return displayErr(b.status);
    });
    return s;
}

function confirmCropPhoto(f, e) {
    e.preventDefault();
    ajaxLoading();
    var sendForm = js_subForm(f);
    sendForm.done(function(data) {
        if(data === '0') return displayErr(lang.somethingWrong)
        // php return OK result
        else {
            var photoId = data;
            var p_link = _st.getphoto.replace('%i', photoId)
                .replace('%s', 'small') + "&token=" + (new Date())
                .getTime();
            ga('.compactProfile img, .toolbar_ucard img')
                .removeAttr('src')
                .attr('src', p_link);


            ga('.u_profile_photo').css('background-image', 'url(' + p_link + ')');
            ga('.profle_avatar > img').attr('src', p_link);


            g_element.hide();
            removeAjaxLoad();
            removePopup();
        }
    });
}
// crop photos
function upProfPh(el, evt, a) {
    if(typeof g_element != 'undefined') g_element.show();
    var callPopup = rpopup(evt, el.getAttribute('href'), false, false, true, 'auto');
    callPopup.done(function(data) {
        setTimeout(function() {
            g_element = ga(el);
            var mParent = ga('.cr_photo_bg');
            ga('.popup_ovr')
                .css('z-index', '-1');
            mParent.css('height', psize[1]);
            ga('.cropper_img')
                .css({
                    'max-width': mParent.width(),
                    'max-height': mParent.height()
                });
        }, 10);
    });
}

function countPhotos(action, count) {
    /*
    	var navMenuPhCounts = ga('.navMenuCount._photos'), leftMenPhCount = ga('.lf_men._photos .lnavMenuCount');
    	var userPhotoCounts = parseInt(navMenuPhCounts.text());
    	var c = action ? (action == 'plus' ? ++userPhotoCounts : --userPhotoCounts) : '';
    	navMenuPhCounts.text((!count ? c : parseInt(userPhotoCounts + count) ));
    	leftMenPhCount.text((!count ? c : parseInt(userPhotoCounts + count) ));*/
}
// edit video
function editVideo(el, ev) {
    ev.preventDefault();
    var $el = $(el);
    var video_data = $el.data('videoinf');
    var available_tags = urldecode(video_data.tags);
    available_tags = available_tags.indexOf(',') > -1 ? available_tags.split(',') : available_tags;
    var existing_tags = '';
    if(Object.prototype.toString.call(available_tags) === '[object Array]') {
        for(var i = 0; i < available_tags.length; i++) existing_tags += '<li>' + available_tags[i] + '</li>';
    } else if(available_tags != '') {
        existing_tags = '<li>' + available_tags + '</li>';
    }
    var edit_markup = '<div class="vd_add_descr_field" id="vd_' + video_data.id + '"><input type="text" name="vd_title" value="' + urldecode(video_data.title) + '" placeholder="' + lang.title + '..." class="vd_title_field"><textarea name="video_descr" placeholder="" class="vd_descr_txt textarea-auto-resize">' + urldecode(video_data.descr) + '</textarea>' + '<ul class="tagit">' + existing_tags + '</ul>' + '</div>';
    if(!$el.hasClass('__active')) {
        $el.addClass('__active');
        $el.closest('.ec_items')
            .addClass('_editable')
            .find('#video_editable_section')
            .html(edit_markup)
            .find('.tagit')
            .tagit({
                availableTags: ['ac', 'dc'],
                fieldName: "vdTags",
                animate: false,
                autocomplete: {
                    delay: 0,
                    minLength: 2
                },
                placeholderText: lang.tags + '...',
                singleField: true,
                // beforeTagAdded: function(event, ui) {
            });
        $el.closest('.ec_items')
            .find('.vd_add_descr_field')
            .off('click')
            .on('click', 'input,textarea,[contenteditable]', function(e) {
                e.preventDefault();
                var $this = $(this);
                if($this.prop('nodeName') == 'TEXTAREA') {
                    $this.addClass('__maximize');
                    auto_rsz($this);
                } else if($this.hasClass('vd_tags')) {
                    e.stopPropagation();
                    var $this = $(this);
                    $this.find('.cedit_placeholder')
                        .remove();
                }
                if($this.parent()
                    .parent()
                    .prop('nodeName') == 'UL') {
                    if(!$this.parent()
                        .parent()
                        .parent()
                        .find('.btn-save-vd-descr')
                        .length) $this.parent()
                        .parent()
                        .parent()
                        .append('<button onclick="saveVdInfo(this,event);" class="btn-save-vd-descr vl_btn">' + lang.save + '</button><br/><div class="err_sp_dsp"></div>');
                } else {
                    if(!$this.parent()
                        .find('.btn-save-vd-descr')
                        .length) $this.parent()
                        .append('<button onclick="saveVdInfo(this,event);" class="btn-save-vd-descr vl_btn">' + lang.save + '</button><br/><div class="err_sp_dsp"></div>');
                }
                $this.off('click');
            });
    } else {
        $el.removeClass('__active');
        $el.closest('.ec_items')
            .removeClass('_editable')
            .find('#video_editable_section')
            .empty();
    }
}
// restore video
function restoreVideo(element, evt) {
    evt.preventDefault();
    var $el = ga(element),
        hrf = $el.attr('href')
        .split('?'),
        url = hrf[0],
        data = hrf[1];

    var aj = jAjax(url, 'post', data);
    aj.done(function(data) {
        var d = validateJson(data);
        if(d.s !== 1) {
            return displayErr(d.s);
        } else {

            // for trash album
            $el.closest('.ec_items.dlalb').remove();


            $el.closest('.ec_items.vd')
                .removeClass('__deleted')
                .find('.disabling-layer')
                .removeClass('__on');
            $el.closest('.ec_items.vd')
                .find('.vd_add_descr_field')
                .show();
            // for profile video album
            $el.closest('.ec_items._pfvd')
                .removeClass('__deleted notOvr')
                .find('.disabling-layer')
                .removeClass('__on');
            $el.closest('.ec_items._pfvd')
                .find('.x_delete_pp')
                .show();
        }
    });
}


// delete video
function deleteVideo(el, evt, clubid) {
    evt.preventDefault();
    var $el = ga(el),
        hrf = $el.attr('href')
        .split('?'),
        url = hrf[0],
        data = hrf[1];
    var aj = jAjax(url, 'post', data);
    aj.done(function(data) {


        var d = validateJson(data);


        if(clubid) {

            if(d.s === 1) {


                $el.closest('.ec_items.vd.icommunity').slideUp(function() {
                    ga(this).remove()
                });
                $el.closest('[rel="communityWallItem"]').remove();
                communityAlbumPicturesWall(1);
            } else {

                return displayErr(lang.community_video_err_delete);

            }


            return;
        }



        if(d.s === 1) {
            $el.closest('.ec_items.vd')
                .addClass('__deleted')
                .find('.disabling-layer')
                .addClass('__on');
            $el.closest('.ec_items.vd')
                .find('.vd_add_descr_field')
                .hide();
            // for profile video album
            $el.closest('.ec_items._pfvd')
                .addClass('__deleted notOvr')
                .find('.disabling-layer')
                .addClass('__on');
            $el.closest('.ec_items._pfvd')
                .find('.x_delete_pp')
                .hide();

        } else return displayErr(d.s);
    });
}

// delete photo definitive
function deleteImgDefinitive(ev) {
    var el = ga(ev.target);
    return confirm_act(lang.confirm_delete_img_definitive, function(evt) {

        var data = {};

        data['cmd'] = 'deleteimagedefinitive';
        data['picid'] = el.attr('id').split('df_img_i|')[1];
        var send = jAjax('/cmd.php', 'post', data);
        send.done(function(data) {

            if(data === '1') {
                el.closest('.ec_items.dlalb').fadeOut(function() {
                    ga(this).remove();
                });

            } else if(data === '404') {
                return displayErr(lang.delete_picture_definitive_not_found);

            } else
                return displayErr(lang.err_tehnic);

        });
    });
}
// delete video definitive
function deleteVideoDefinitive(ev) {
    var el = ga(ev.target);
    return confirm_act(lang.confirm_delete_video_definitive, function(evt) {

        var data = {};

        data['cmd'] = 'deletevideodefinitive';
        data['video_id'] = el.attr('id').split('|')[1];
        var send = jAjax('/cmd.php', 'post', data);
        send.done(function(data) {

            if(data === '1') {
                el.closest('.ec_items.dlalb').fadeOut(function() {
                    ga(this).remove();
                });

            } else if(data === '404') {
                return displayErr(lang.delete_video_definitive_not_found);

            } else
                return displayErr(lang.err_tehnic);

        });
    });
}

function deletePhoto(element, evt, photoLayer) {
    evt.preventDefault();
    var $el = ga(element),
        hrf = $el.attr('href')
        .split('?'),
        url = hrf[0],
        data = hrf[1];
    var aj = jAjax(url, 'get', data + '&view_as=json');
    aj.done(function(data) {


        if($el.hasClass('icommunity')) {

            if(data == '1') {

                $el.closest('[data-postshpid]').remove();
                communityAlbumPicturesWall(1);
            } else {

                return displayErr(lang.somethingWrong);

            }


            return;

        }


        if(data === '1') {
            countPhotos('minus');
            if(!photoLayer) {
                $el.parent()
                    .children('.ph.disabling-layer')
                    .css({
                        'width': $el.parent()
                            .width(),
                        'height': $el.parent()
                            .height()
                    })
                    .addClass('__on');
                $el.parent()
                    .children('a:not([data-vphopen])')
                    .hide();
                $el.closest('.ec_items')
                    .addClass('notOvr');
            } else {
                var phlayer_active_slide = ga('.nb-slide.nb__active'),
                    phlayer_active_image = phlayer_active_slide.find('img');
                var data_restore = validateJson(localStorage.getItem('phlayer-undophoto')); // $el.data('undophoto');
                ga('.photo-layer_bottom')
                    .hide();
                phlayer_active_slide.addClass('__removed');
                phlayer_active_slide.find('img')
                    .hide();
                phlayer_active_slide.find('section.phlayer_tag.__tagged')
                    .hide();
                phlayer_active_slide.find('.widget_lsco_bot_shadow')
                    .hide();
                phlayer_active_slide.find('.widget_photoLayer')
                    .hide();
                phlayer_active_slide.closest('.photo-layer')
                    .before('<div class="pl_pc_photo_stub">' + lang.photo_deleted + '.' + '<div class="photo-sc_i_utility_undo-delete"><a id="phlayer_rr_' + data_restore.pid + '" onclick="phLayerRestorePhoto(this);restorePhoto(this,event,1)" ' + 'href="/profile?pid=' + escape(data_restore.pid) + '&q=' + escape(data_restore.uid) + '&cmd=phreturn&i=' + escape(data_restore.aid) + '&phf=' + data_restore.pfl + '&ex=' + escape(data_restore.ex) + '&fsz=' + escape(data_restore.fsize) + '&pos=' + escape(data_restore.pos) + '&ad=' + escape(data_restore.ad) + '" class="il white-color">' + lang.restore_photo + '</a></div></div>');
                ga('[data-vphi="' + base64_encode(data_restore.pid) + '"]')
                    .children()
                    .append('<div onclick="event.preventDefault();event.stopPropagation();" id="restoreforphotoviewer_' + data_restore.pid + '" class="ph disabling-layer __on"><span class="photo-sc_i_utility_delete-status">The photo has been deleted.</span>' + '<div class="photo-sc_i_utility_undo-delete"><a onclick="restoreDeleteFromPhotoViewer(this,event);restorePhoto(this,event,1)"' + ' href="/profile?pid=' + escape(data_restore.pid) + '&q=' + escape(data_restore.uid) + '&cmd=phreturn&i=' + escape(data_restore.aid) + '&phf=' + data_restore.pfl + '&ex=' + escape(data_restore.ex) + '&fsz=' + escape(data_restore.fsize) + '&pos=' + escape(data_restore.pos) + '&ad=' + escape(data_restore.ad) + '" class="il">Restore</a></div></div>');
            }
        } else return displayErr(lang.err_del_photo);
    });
}

function phLayerRestorePhoto(o) {
    // $(o).closest('#pp_photo_viewer').find('.photo-layer').show(); 
    var phlRestore_phid = $(o)
        .attr('id')
        .match(/\d/g)
        .join('');
    var $active_slider = $('.nb-slide.nb__active');
    $('.phlayer_deleted_photo,.pl_pc_photo_stub')
        .remove();
    $('.photo-layer_bottom')
        .show();
    $active_slider.removeClass('__removed');
    $active_slider.find('img')
        .show();
    $active_slider.find('section.phlayer_tag.__tagged')
        .show();
    $active_slider.find('.widget_lsco_bot_shadow')
        .show();
    $active_slider.find('.widget_photoLayer')
        .show();
    ga('#restoreforphotoviewer_' + phlRestore_phid)
        .remove();
}

function restoreDeleteFromPhotoViewer(obj, ev) {
    ev.stopPropagation();
    var $obj = $(obj);
    $obj.closest('.disabling-layer')
        .remove();
}

function restorePhoto(element, evt, photoLayer, del_album) {
    evt.preventDefault();
    var $el = ga(element),
        hrf = $el.attr('href')
        .split('?'),
        url = hrf[0],
        data = hrf[1];

    ajaxLoading();
    $el.addClass('__disabled');
    var aj = jAjax(url, 'get', data + '&view_as=json');
    aj.done(function(data) {
        $el.removeClass('__disabled');
        removeAjaxLoad();
        if(data === '0') {
            return displayErr(lang.err_return_photo);
        } else {
            countPhotos('plus');
            if(!photoLayer) {
                var parentEl = $el.closest('.ph.disabling-layer.__on');
                var removeBtn = parentEl.parent()
                    .find('a.x_delete_pp,a.ic_delete_min');
                /*var removeBtnHr = removeBtn.attr('href')
                	.split('&');*/
                parentEl.removeClass('__on');
                $el.closest('.ec_items:not(.__uploading)')
                    .removeClass('notOvr');
                removeBtn.show();
                // removeBtn.removeAttr('style');
                // removeBtn.removeAttr('href').attr('href', removeBtnHr[0] + '&' + removeBtnHr[1] + '&ph=' + data);
            }

            if(del_album) {
                $el.closest('.ec_items.dlalb').fadeOut(1000, function() {
                    ga(this).remove()
                });
            }
        }
    });
}

function sortPhotos() {
    var sortable = $('#sortUphotos');
    if(sortable.length) {
        ga("img.sortimg.lazy-image").lazyload();
        sortable.sortable({
                items: ">div",
                revert: _st.sort_revert,
                delay: _st.sort_delay,
                distance: _st.sort_distance,
                placeholder: "sortablePhotosPlaceHolder",
                forcePlaceholderSize: true,
                cursor: 'move',
                opacity: _st.sort_opac
            })
            .disableSelection();
        sortable.on('sortupdate', function(event, photo) {
            var ac = (this.getAttribute('data-act') === 'personal' ? 'sortpersonal' : 'sortalbum'),
                alb = ac !== 'sortpersonal' ? this.getAttribute('data-act') : 0;
            var d = jQuery(this)
                .sortable('serialize');
            var b = sortable.data('postd')
                .split('?');
            var c = b[1].split('&');
            var reqSortUpdate = jQuery.ajax({
                url: b[0],
                type: 'post',
                data: d + '&' + jQuery.param({
                    'q': c[0].split('=')[1],
                    'cmd': c[1].split('=')[1],
                    'alb': alb,
                    'action': ac,
                    'type': 'pos'
                }),
                cache: false
            });
            reqSortUpdate.done(function(a) {
                if(a != '1') return displayErr(lang.err_sort_photos);
            });
            reqSortUpdate.fail(function(b, c) {
                return displayErr(lang.err_req + b.status);
            });
        });
    }
}

function clickOnHome() {
    ga('.a_user_toolbar_logo')
        .trigger('click');
}
// filter friends by certain letter
function fr_flt_b_lt(o, event) {
    event.preventDefault();
    var $o = ga(o);
    _gl_filter_by_letter = $o.text()
        .toUpperCase();
    checkLetterInDom();
    if(!ga('#hook_alpha .__loader')
        .length) ga('#hook_alpha')
        .append('<div class="light_modal_01"><div class="lmbd4"></div></div>');
}
// get alpha
function friendsAlphabetList(o, e) {
    e.preventDefault();
    var $o = ga(o),
        $b = ga('body');
    var uid = $o.data('alphui')
        .split(')')[1];
    var s = jAjax('/profile', 'post', 'cmd=getAlpha&i=' + escape(uid) + '&type=pos');
    s.done(function(r) {
        if(r == 'NODATA') displayErr(lang.no_friends);
        else {
            var $r = ga(r);
            if(!$b.find('section#hook_alpha')
                .length) $b.append($r);
            setTimeout(function() {
                $r.find('.drk-modal_1000')
                    .addClass('__col');
                ga([document, window]).off('keyup.kAlpha click.kAlpha')
                    .on('keyup.kAlpha click.kAlpha', function(e) {
                        if(e.type == 'click' || e.keyCode == 27) $b.find('section#hook_alpha')
                            .remove();
                    });
                $r.find('.ulistanim')
                    .addClass('__outz');
            }, 10);
        }
    });
}
// keep visible header of active letter
function AlphaKeepVisible(e) {
    e.preventDefault();
    var l = ga('.letter_header');
    var top_header = $('.toolbar');
    if(!l.length) return;
    var m = l.offset()
        .top;
    var b = 0;
    //$('[data-ltn]').removeClass('__active').css('top','auto');
    l.each(function() {
        var $this = $(this);
        $this.removeClass('__active fixed_always')
            .css({
                'top': 'auto'
            });
        //$this.removeClass('__active').css('transform','translate3d(0,0,0)');
        //if(top_header.offset().top+($('.toolbar').height()/2)+(l.height()/2)+10 >= $(this).offset().top && !$this.hasClass('__active'))
        if(top_header.offset()
            .top + top_header.height() >= $(this)
            .offset()
            .top) $this.addClass('__active fixed_always')
            .css({
                'top': ga('.toolbar').height()
            }); ///css('top', ($(window).scrollTop() - $this.offset().top) + $('.toolbar').height());//css('transform' , 'translate3d(0,'+($(window).scrollTop() - $this.offset().top) + $('.toolbar').height()+'px,0)');//'+='+(top_header.offset().top + l.offset().top) - ($('body').scrollTop()));
        /*
        if($this.offset().top + $this.outerHeight() >= $('[data-ltn]:eq('+($this.index()+1)+')').offset().top){
        //$this.css('top','-='+$this.offset().top + $this.outerHeight() - $('[data-ltn]:eq('+($this.index()+1)+')').offset().top);//$('[data-ltn]:eq('+($this.index()+1)+')').css('background','red');
        ////alphaHeadMoveSlow($this,$('[data-ltn]:eq('+($this.index()+1)+')'),top_header);
        }*/
        //$this.addClass('__active').css('transform','translate3d(0, '+($(window).scrollTop() - $this.offset().top) + $('.toolbar').height()+'px ,0)')
        $this.removeClass('__active');
    });
}

function alphaHeadMoveSlow(obj_o, obj_t, thead) {
    var a = obj_o,
        b = obj_t,
        c = thead;
    obj_o.css('top', '-=1px') //+obj_o.offset().top - obj_t.offset().top);
    if(obj_o.offset()
        .top + obj_o.height() > thead.offset()
        .top) setTimeout(function() {
        alphaHeadMoveSlow(a, b, c);
    }, 10);
}
// send friend request
function addFriend(el, ev, uid, v) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    var g = generateUrl(el);
    ga(el)
        .addClass('__disabled');
    var send = jAjax(g[0], 'post', g[1] + '&type=pos&view_as=json');
    send.done(function(data) {
        var dData = validateJson(data);
        ga(el)
            .removeClass('__disabled');
        if(dData) {

            var disableReqBtn = function() {

                ga(el)
                    .addClass('__disabled')
                    .removeAttr('onclick')
                    .attr('href', 'javascript:return false;')
                    .text(lang.friend_req_send);
            };
            if(dData.response == 'open_notif' && v == 'knownpeople') {
                disableReqBtn();
                return false;
            }

            if(dData.response === 'already_friends') {
                disableReqBtn();
                return kn_liveNotif(lang.friend_request_was_not_sent, 'warn', 6000, lang.this_user_already_exist_into_your_friends_list);
            } else if(dData.response === 'open_notif') {
                disableReqBtn();
                return kn_liveNotif(lang.friend_request_already_sent, 'info', 6000, lang.friend_request_was_sent_please_wait_while_the_user_will_accept_it);
            }

            if(dData['response'] == '1') {
                ga(el)
                    .addClass('__disabled');
                if(v == 'knownpeople') {
                    ga(el)
                        .removeAttr('onclick')
                        .attr('href', 'javascript:return false;')
                        .text(lang.friend_req_send);
                    return;
                } else if(v == 'button') {
                    ga(el)
                        .removeAttr('onclick').addClass('_disabled_button').text(lang.friend_req_send);
                    return;
                } else {
                    ga('#action_menu_friendship_request_sent')
                        .removeClass('m_hidden');
                    ga('#action_menu_set_relationship')
                        .removeClass('m_hidden'); //.find('a:first').trigger('click');
                }
                ajaxLoading();
                var send = jAjax('/profile', 'post', 'type=pos&cmd=loadFriendRelationShipBtn&uid=' + uid);
                send.done(function(d) {
                    removeAjaxLoad();
                    if(d !== '0') {
                        ga(el)
                            .removeClass('__disabled')
                            .parent()
                            .replaceWith(d);
                        setTimeout(function() {
                            ga('#action_menu_set_relationship_a')
                                .trigger('click.rlq');
                        }, 200);
                    } else {
                        var request_friend_sent_btn = '<button class="flat_button button_wide secondary __request_sent"><i class="icofont icofont-send-mail">&#xf0c5;</i>' + lang.friend_request_has_been_sent + '</button>';

                        ga(el)
                            .removeClass('__disabled')
                            .parent()
                            .replaceWith(request_friend_sent_btn);
                    }
                });
                localStorage.setItem('direct_relat', 1);
            } else if(dData['response'] == 'open_notif') {
                return ga('.toolbar_nav_notif_i_ic')
                    .parent()
                    .trigger('click');
            } else if(dData['response'] != '1' || dData['response'] != '0') return displayErr(dData['response']);
            else return displayErr(lang.somethingWrong);
        }
    });
}

function removeThisNotif(t, e, b) {
    e.preventDefault();
    var rn = function(a) {
        a.closest('.notif')
            .slideUp(300, function() {
                $(this)
                    .remove()
            });
    }
    if(b) return rn($(t));
    var $t = $(t);
    var u = generateUrl(t);
    var send = jAjax(u[0], 'post', u[1]);
    send.done(function(data) {
        var r = validateJson(data);
        if(r['response'] == '1') {
            rn($t);
        } else {
            return displayErr(lang.somethingWrong + ' [ err delete notif ]');
        }
    });
}

function removeNotifbyTrigXCLOSE(a) {
    var $t = $(a)
        .closest('[data-category]');
    $t.find('.ic12_close-g')
        .trigger('click');
}

function confirmFriendRelationShip(e, t) {
    e.preventDefault();
    var $t = $(t),
        n_parent_k = $t.closest('[data-category]'),
        freq = $t.data('freq')
        .split('-'),
        fId = $t.attr('id')
        .split('_')[3];
    if(typeof freq == 'undefined') return displayErr(lang.somethingWrong);
    n_parent_k.find('button[name="ACCEPT"]')
        .attr('disabled', true)
        .text(lang.Please_wait);
    var send = jAjax('/profile', 'post', 'cmd=updFriendRelat&i=' + escape(fId) + '&ph=' + escape(freq[1]) + '&type=pos');
    send.done(function(data) {
        if(data != '0') {
            n_parent_k.addClass('__confirm');
            n_parent_k.find('.__frrpkc_txt')
                .text(lang.is_your + ' ' + $t.data('rolereltxt'));
            n_parent_k.find('button[name="ACCEPT"]')
                .removeAttr('disabled')
                .attr("onclick", "removeNotifbyTrigXCLOSE(this);")
                .switchClass('__def', '__sec', 10)
                .text(lang.Remove);
        } else return displayErr(lang.err_tehnic);
    });
}

function vFriendReq(e, t, m) {
    e.preventDefault();
    var $t = $(t),
        freq = $t.data('freq')
        .split('-'),
        fId = escape($t.attr('id')
            .split('_')[3]);
    if(typeof freq == 'undefined') return displayErr(lang.somethingWrong);
    ajaxLoading();
    var send = jAjax('/profile', 'post', 'q=' + escape(m) + '&cmd=vFriendReq&i=' + fId + '&ph=' + escape(freq[0]) + '&nt=' + escape(freq[1]) + '&type=pos&view_as=json');
    send.done(function(data) {
        var d = validateJson(data);
        var $notif = $t.closest('.notif');
        // accept request
        if(d['response'] == '1' && m) {
            $notif.find('.notif_ac.fade-on-hover')
                .remove();
            $notif.addClass('__accept')
                .find('.notif_tx')
                .addClass('__accept')
                .find('.become_friend_text')
                .html('&nbsp;' + lang.yarfriend);
            $t.closest('.notif_btn')
                .replaceWith('<a class="r_not" href="/profile?cmd=removeNotif&i=' + escape(d['notif_id']) + '&type=pos&view_as=json" onclick="removeThisNotif(this,event)">' + lang.close + '</a>');
            $('#action_menu_friendship_request_confirm')
                .remove();
            // ignore request
        } else if(d['response'] == '1' && !m) {
            $('#send_friend_req_btn_green')
                .removeClass('m_hidden');
            $('#action_menu_friendship_request_confirm')
                .remove();
            removeThisNotif($t[0], e, 1);
        } else {
            return displayErr(lang.somethingWrong);
        }
        removeAjaxLoad();
    });
}

function hActive(el) {
    var $el = $(el);
    $('ul.toolbar_nav')
        .find('.__active')
        .removeClass('__active');
    $el.addClass('__active');
}

function hNactive() {
    $('ul.toolbar_nav')
        .find('.__active')
        .removeClass('__active');
}

function getMyGrades(el, ev) {
    ev.preventDefault();
    hActive(el);
    var send = rpopup(ev, el.getAttribute('href'), 'sub_header', false, true);
    send.done(function(data) { //alert(data)
        createUrl('', '', el.getAttribute('href'));
        var dData = validateJson(data);
        if(dData) {
            ga(el)
                .find('.gr_notif_space')
                .empty();
        }
    });
}

function closeNotif() {
    var el = ga('.notifcs .top_notifa');
    ga('#notif_flying_box').empty();
    el.removeClass('__active');
    el.parent().removeClass('__active');
    ga('#notif_top_ovr').remove();
    createUrl('', '', prev_url);
    ga('.messenger-shortcut-container').addClass('zindex1');
    removeTopGlobalHelper();
}

function addTopGlobalHelper() {
    var unique_id = Math.floor(Math.random() * 100);
    var top_helper_close = ga('#global_helper_close_top_boxes');

    top_helper_close.removeClass('__none');
    top_helper_close.off('click.gt' + unique_id).on('click.gt' + unique_id, function(e) {
        e.preventDefault();
        ga('body,html').trigger('click.closeMessBox');
        ga('#notif_top_ovr').trigger('click.hideTopNotif');
        closeNotif();
        removeTopGlobalHelper();
    });

}

function removeTopGlobalHelper() {
    ga('#global_helper_close_top_boxes').addClass('__none');
}

function getMyNotifications(el, ev) {
    ev.preventDefault();

    // close fmapbox
    ga('#map_posts_box_close').trigger('click');

    addTopGlobalHelper();

    //	hActive(el);
    // rpopup() params
    // @event
    // @url
    // @position (left || right) .. or theme
    // @type
    // @margin-top
    // @height (0 = 100%)
    // @width
    // @padding
    var box_notif = ga('#notif_flying_box');

    if(ga('#notif_flying_box').html() != '') {

        return closeNotif();
    }
    var url = generateUrl(el);
    var send = jAjax(_st.purl, 'get', url[1] + '&view_as=json'); //rpopup(ev, el.getAttribute('href'), 'left', false, false, 0, 504, 1);
    send.done(function(data) {

        createUrl('', '', el.getAttribute('href'));
        ga(el).parent().addClass('__active');
        var dData = validateJson(data);
        if(dData) {


            ga('body').prepend('<div class="notif_top_ovr layer_ovr fixed_always" id="notif_top_ovr"></div>');
            box_notif.html(dData.content);
            ga('.messenger-shortcut-container').addClass('zindex1');
            setTimeout(function() {

                box_notif.find('#close_flying_notification_box').off('click.hideTopNotif').on('click.hideTopNotif', function(e) {

                    e.preventDefault();
                    closeNotif();
                });

                ga(document).off('keyup.hideTopNotif').on('keyup.hideTopNotif', function(e) {

                    if(e.keyCode == 27) closeNotif();
                });
                ga(document).off('click.hideTopNotif').on('click.hideTopNotif', '#notif_top_ovr', function(e) {
                    closeNotif();
                });
                ga('#ntf_layer_left_menu >li:first>a')
                    .trigger('click');



            }, 100);
        }
    });
}

function generateUrl(element) {
    var $element = ga(element),
        href = $element.attr('href')
        .split('?'),
        url = href[0],
        data = href[1];
    if(typeof href == 'undefined') return displayErr(lang.somethingWrong + ' [tehnical error (split href)]');
    return [url, data];
}
// check if the browser is old version, add notification
function validateNav() {
    switch (navigator.sayswho) {
        // IE
        case 'IE 4':
        case 'IE 5':
        case 'IE 6':
        case 'IE 7':
        case 'IE 8':
        case 'IE 9':
            // safari
        case 'Safari 1':
        case 'Safari 2':
        case 'Safari 3':
        case 'Safari 4':
        case 'Safari 5':
        case 'Safari 6':
            if(ga('.browser-update')
                .length != 0) return false;
            var aj = jAjax(_THEME + '/body/old-browser.html', 'get', '');
            aj.done(function(data) {
                globalCont.prepend(data);
            });
            break;
    }
}
// create album
function doNewAlbum(form, ev, update) {
    ev.preventDefault();
    var redBord = function(el, color) {
        !color ? el.css('border', '1px solid red')
            .focus() : el.css('color', 'red');
        removeAjaxLoad();
    }
    var r_redBord = function(el) {
        el.removeAttr('style');
    };
    ajaxLoading();
    var sendForm = js_subForm(form);
    sendForm.done(function(data) {
        var d = validateJson(data);
        var alN = $('#albumNam'),
            vst = $('.p_me_nm'),
            alb_grid = $('.user_albums_grid'),
            alb_grid_first = alb_grid.children(':first');
        if(d['e_checkbox'] == '1' && d['e_albumname'] == '1') {
            redBord(vst, 1);
            redBord(alN);
            return;
        } else if(d['e_albumname'] == '1') {
            r_redBord(vst);
            redBord(alN);
            return;
        } else if(d['e_checkbox'] == '1') {
            r_redBord(alN);
            redBord(vst, 1);
            return;
        }
        if(d['response'] > 0 && !update) {
            var albMark = jAjax(_THEME + '/nav/profile/albumMarkup.html', 'get', '');
            albMark.done(function(html) {
                alb_grid_first.after(jprintf(html, d['uid'], d['response'], d['uid'], d['response'], d['name'], d['name']));
                // update ajax href link 
                up_href();
                alb_grid.find('a#album_location')
                    .trigger('click');
            });
            removePopup();
        } else if(d['response'] > 0 && update) {
            var thisAlbum = alb_grid.find('#a_' + update);
            thisAlbum.find('a:last')
                .text(d['name']);
            ///thisAlbum.find('[data-album-ni]').attr({'data-album-c': d['checks'], 'data-album-ni': '{"name":"'+d['name']+'","id":"'+d['response']+'"}'});
            thisAlbum.find('[data-album-ni]>span')
                .text(lang.updated)
                .parent()
                .addClass('__disabled');
            thisAlbum.find('.ic_settings')
                .addClass('__updated');
            // for controls in album details
            var albumDetailContr = $('.photo-sc_grid_controls');
            albumDetailContr.find('#album_detail_set')
                .text(lang.updated)
                .parents('a')
                .addClass('__disabled')
                .removeAttr('onclick');
            albumDetailContr.find('.ic_settings')
                .addClass('__updated');
            $('#alb_detail_title')
                .text(d['name']);
            removePopup();
        } else {
            return displayErr(lang.errCreateAlbum);
        }
        removeAjaxLoad();
    });
}
// album checkboxes
function albSquareCheck() {
    var elements = $('input[album-square-ch]');
    var everyone = $('#sq1');
    var allFriends = $('#sq2');
    elements.not('#sq1,#sq2')
        .off('click')
        .on('click', function(e) {
            everyone.prop('checked', false);
            allFriends.prop('checked', false);
        });
    allFriends.off('click')
        .on('click', function(e) {
            elements.not(everyone)
                .prop('checked', true);
            everyone.prop('checked', false);
        });
    everyone.off('click')
        .on('click', function(e) {
            elements.prop('checked', false);
            this.checked = true;
        });
}

function notifNav(el, evt) {
    evt.preventDefault();
    var $el = ga(el);
    var g = generateUrl(el);
    var c_wrap = ga('.notifs_wrap');
    c_wrap.html('<div class="ajax_small_loader"></div>');
    var send = jAjax(g[0], 'post', g[1] + '&view_as=json');
    send.done(function(d) {
        var d = validateJson(d);
        if(d) {
            c_wrap.html(d['content']);
            ga('#notification_nav_bar_categ')
                .text($el.data('navbartitle'));
            ga('#ntf_layer_left_menu > li > a.__active')
                .removeClass('__active');
            ga(el).addClass('__active');
            ga('.notif_space')
                .empty();
            setTimeout(up_href, 500);
            setTimeout(function() {
                ga('#notif-nano.nano').nanoScroller();
            }, 10);

        }
    });
}
// remove tags from notification popup
function removePhotoTagFromNotif(el, evt) {
    evt.preventDefault();
    var $el = $(el);
    var __this_nid = $el.data('freq')
        .split('-');
    var send = jAjax('/cmd.php', 'post', 'cmd=removeTagFromPhoto&photoid=' + escape(__this_nid[1]) + '&notif=' + escape(__this_nid[0]));
    send.done(function(data) {
        if(data == 0) return displayErr(lang.err_untag);
        else {
            $('#hook_FormButton_fri_' + __this_nid[0])
                .trigger('click');
        }
    });
}
// confirm tags from notification (tags request)
function confirmTaggedRequest(evt, el, notifID, photoID) {
    evt.preventDefault();
    var $el = $(el);
    var send = jAjax('/cmd.php', 'post', 'cmd=confirmRequestedTags&photo=' + escape(photoID) + '&notID=' + escape(notifID));
    send.done(function(data) {
        if(data != 1) return displayErr(lang.err_tehnic);
        else $('#hook_FormButton_fri_' + notifID)
            .trigger('click');
    });
}

function expand_postTextarea(textarea, e) {
    e.preventDefault();
    e.stopPropagation();
    var fwall = ga('#hook_Block_MiddleColumnTopCard_StatusNew'); //$('#hook_feed_wl_pg');
    var turnOu = function() {
        $(document)
            .on('click.status', function(e) {
                if($t.height() > minH) {
                    $t.css('height', minH);
                    fwall.removeClass('mt55');
                    btn.removeClass('_visb');
                }
            });
    }
    var $t = $(textarea),
        btn = $('#hiddenShareBtn');
    var maxH = 135,
        minH = 38;
    $t.css('height', maxH);
    fwall.addClass('mt55');
    btn.addClass('_visb');
    btn.hover(function() {
        $(document)
            .off('click.status')
    }, function() {
        turnOu();
    });
    turnOu();
}

function onlineBlock(a) {
    var $b = ga('.online-fr_block'),
        $mContent = ga('#mainContent'),
        $reklama = ga('.reklama_right'),
        $toolbar_h = ga('.toolbar').height();
    var css = {};
    css['height'] = ga(window)
        .height() - $toolbar_h; //'auto';///(($mContent.outerHeight() + $('#footer').height()) - $reklama.outerHeight()) - 10;
    /// if(!a) css['right'] = _winW - ($mContent.outerWidth() + $b.outerWidth() + 58);
    //if (!this.r || a)

    ga('.online-fr_list.nano').height(ga(window).height() - $toolbar_h - 145);
    ga('.online-fr_cards').off('scroll.boxsh').on('scroll.boxsh', function() {
        var _g_search_fr_on_tab = ga('.hook_search_friends');
        if(ga(this).scrollTop() > 10) _g_search_fr_on_tab.addClass('_shadow');
        else _g_search_fr_on_tab.removeClass('_shadow');
    });
    //$b.css(css);
    this.r = true;
}

function feed_album_ph_hover(o, e) {
    e.preventDefault();
    var $o = $(o);
    $o.parent()
        .children()
        .each(function() {
            var $this = $(this);
            $this.not($o)
                .css({
                    'display': '',
                    'z-index': $(this)
                        .data('orig-ind')
                });
            $o.css({
                    'display': 'inline',
                    'z-index': parseInt($o.css('z-index')) + 50
                })
                .addClass('__before_anim __anim')
                .on(crossEvent, function() {
                    $this.css('display', 'inline')
                });
        });
}

function feed_album_ph_out(o, e) {
    e.preventDefault();
    var $o = $(o);
    $o.removeClass('__before_anim __anim');
}
var getDimensions = function(item) {
    var elem = item[0];
    // This:
    //       * Gets elem computed styles:
    //             - CSS background-size
    //             - element's width and height
    //       * Extracts background URL
    var computedStyle = getComputedStyle(elem),
        image = new Image(),
        src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2'),
        cssSize = computedStyle.backgroundSize,
        elemW = parseInt(computedStyle.width.replace('px', ''), 10),
        elemH = parseInt(computedStyle.height.replace('px', ''), 10),
        elemDim = [elemW, elemH],
        computedDim = [],
        ratio;
    // Load the image with the extracted URL.
    // Should be in cache already.
    image.src = src;
    // Determine the 'ratio'
    ratio = image.width > image.height ? image.width / image.height : image.height / image.width;
    // Split background-size properties into array
    cssSize = cssSize.split(' ');
    // First property is width. It is always set to something.
    computedDim[0] = cssSize[0];
    // If height not set, set it to auto
    computedDim[1] = cssSize.length > 1 ? cssSize[1] : 'auto';
    if(cssSize[0] === 'cover') {
        // Width is greater than height
        if(elemDim[0] > elemDim[1]) {
            // Elem's ratio greater than or equal to img ratio
            if(elemDim[0] / elemDim[1] >= ratio) {
                computedDim[0] = elemDim[0];
                computedDim[1] = 'auto';
            } else {
                computedDim[0] = 'auto';
                computedDim[1] = elemDim[1];
            }
        } else {
            computedDim[0] = 'auto';
            computedDim[1] = elemDim[1];
        }
    } else if(cssSize[0] === 'contain') {
        // Width is less than height
        if(elemDim[0] < elemDim[1]) {
            computedDim[0] = elemDim[0];
            computedDim[1] = 'auto';
        } else {
            // elem's ratio is greater than or equal to img ratio
            if(elemDim[0] / elemDim[1] >= ratio) {
                computedDim[0] = 'auto';
                computedDim[1] = elemDim[1];
            } else {
                computedDim[1] = 'auto';
                computedDim[0] = elemDim[0];
            }
        }
    } else {
        // If not 'cover' or 'contain', loop through the values
        for(var i = cssSize.length; i--;) {
            // Check if values are in pixels or in percentage
            if(cssSize[i].indexOf('px') > -1) {
                // If in pixels, just remove the 'px' to get the value
                computedDim[i] = cssSize[i].replace('px', '');
            } else if(cssSize[i].indexOf('%') > -1) {
                // If percentage, get percentage of elem's dimension
                // and assign it to the computed dimension
                computedDim[i] = elemDim[i] * (cssSize[i].replace('%', '') / 100);
            }
        }
    }
    // If both values are set to auto, return image's 
    // original width and height
    if(computedDim[0] === 'auto' && computedDim[1] === 'auto') {
        computedDim[0] = image.width;
        computedDim[1] = image.height;
    } else {
        // Depending on whether width or height is auto,
        // calculate the value in pixels of auto.
        // ratio in here is just getting proportions.
        ratio = computedDim[0] === 'auto' ? image.height / computedDim[1] : image.width / computedDim[0];
        computedDim[0] = computedDim[0] === 'auto' ? image.width / ratio : computedDim[0];
        computedDim[1] = computedDim[1] === 'auto' ? image.height / ratio : computedDim[1];
    }
    // Finally, return an object with the width and height of the
    // background image.
    return {
        width: computedDim[0],
        height: computedDim[1]
    };
};
// mutual friends popup
function popupMutualFriends(el, ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    var $this = ga(el);
    var $this_data = $this.data('mtforui');
    var uid = escape($this_data.uid.match(/\d/g)
        .join(''));
    var dcont = '<div id="modal_main" style="height:' + (ga(window).height() - 180) + 'px" class="modal_main ">\
    <div id="modal_cnt" class="modal_cnt ppymknw nano">\
        <ul class="photoPeopleLike nano-content">\
        </ul>\
    </div>\
</div>';
    var __plkphotouserMarkup = '<li class="cardListUsLk show-on-hover">\
                <div class="userCard">\
					<div class="ucard_ph_lk432">\
                                <a class="photoWrapper" href="/user/%uid" data-offpopup="1" hrefattr="true"><img src="/getPhoto?p=%photo&sz=thumb&g=%gender" alt="" width="128" height="128"></a>\
                            </div>\
                    <div class="card_add">\
                        <div class="ellip"><a href="/user/%uid" class="o" data-offpopup="1" hrefattr="true">%uname</a></div>\
						<div class="_2uju6 ellip">%nickname</div>\
                    </div>\
				<div class="_72gdz _73dsgg"><span class="_e616g"><span class="_e425">%yearsold</span><span class="_e425">%cityCountry</span></span></div>\
				 </div>\
            </li>';



    ga('<div/>')
        .addClass('modal-newvv2 jboxnpadding')
        .appendTo(ga('body'));
    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-newvv2'),
        title: lang.is_also_friend_with.replace('%s', $this_data.uname),
        overlay: true,
        fade: false,
        closeButton: 'box',
        //'overflow': 'hidden',
        ///'fixed': true,
        ///blockScroll: true,
        //height: 'auto',
        width: '600px',
        minHeight: '62px',
        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        offset: {
            x: 0,
            y: 0
        },
        onClose: function() {
            prn_modal();
        }
    });
    jb_.open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'mutualfriendsfor',
                u: uid
            },
            reload: true,
            setContent: false,
            cache: false,
            success: function(data) { ///alert(data)
                var jCont = ga('.modal-newvv2 .jBox-content');
                if(data == '0') return displayErr(lang.err_tehnic);
                else if(data == '1') return displayErr(lang.not_found);
                else {
                    var knw_d = validateJson(data);
                    var a = knw_d.users;
                    var count_m = knw_d.count;
                    if(!count_m) {
                        return jb_.setContent(lang.popup_not_found_mutual_friends);
                    }
                    jb_.setContent(dcont);
                    // jb_.setTitle('('+count_m+')'+' '+lang.is_also_friend_with.replace('%s',$this_data.uname));
                    for(var b = 0; b < a.length; b++) {
                        var res = a[b];
                        jCont.find('ul.photoPeopleLike')
                            .append(__plkphotouserMarkup.replace(/%uid/g, res.id)
                                .replace(/%photo/g, res.photo)
                                .replace(/%uname/g, res.name)
                                .replace(/%nickname/g, res.nick)
                                .replace(/%yearsold/g, res.yearsold + '&nbsp;' + lang.yearsold) //res.fr_status === 'confirmed' ? '<button class="_aj7mu isfriend _2hpcs _95tat _o0442">'+lang.friends+'</button>' : ( res.fr_status === 'pending' ? '<button class="_aj7mu __disabled _2hpcs _95tat _o0442">'+lang.friend_request_has_been_sent+'</button>' : '<button href="/profile?q='+_U.i+'&cmd=addFriend&i='+res.id+'" onclick="addFriend(this,event,\''+o_krypt('+res.id+')+'\',\'button\')" class="_aj7mu _2hpcs _95tat _o0442">'+lang.friend_request+'</button>' ) )
                                .replace(/%cityCountry/g, lang.from + '&nbsp;' + res.cityCountry)
                                .replace(/%gender/, res.gender));
                    }

                    jb_.position();
                    setTimeout(function() {
                        ga('.ppymknw.nano').nanoScroller();
                    }, 1000);
                }
            }
        });
}
// reorder known people block
function knownPeopleReorder(el, ev) {
    ev.preventDefault();
    var $el = $(el);
    if($el.hasClass('__on')) {
        $el.removeClass('__on');
        $('.psbc_cnt')
            .removeClass('__list');
        $('.psbc_cnt ul')
            .children()
            .each(function() {
                var $this = $(this);
                $this.attr({
                        'original-title': $this.attr('nolist-original-title')
                    })
                    .removeAttr('nolist-original-title');
            });
    } else {
        $el.addClass('__on');
        $('.psbc_cnt')
            .addClass('__list');
        $('.psbc_cnt ul')
            .children()
            .each(function() {
                var $this = $(this);
                $this.attr({
                    'nolist-original-title': $this.attr('original-title'),
                    'original-title': $this.data('list-title')
                });
            });
    }
}

// run app
function runApp(evt) {



    evt.preventDefault();
    var _el = ga(evt.target);
    var _appid = _el.closest('[data-approw="true"]').attr('id'),
        _app_id = _appid.match(/\d/g).join('');


    ga('<div/>')
        .addClass('modal-new jbnopad')
        .appendTo(ga('body'));

    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-new'),
        id: 'jb' + _appid,
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
            ga('#jb' + _appid).remove();
            prn_modal();
        }
    });
    jb_.open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'runapp',
                appid: _app_id
            },

            reload: true,
            setContent: false,
            success: function(data) {
                ga('#jb' + _appid).find('.jBox-content').html(data === '0' ? '<div class="no_rows" id="no_apps"><div>' + lang.err_launch_app + '</div></div>' : data);
            }
        });

}

// clear search input in apps page
function clearAppSearchInput() {
    ga('#apps_search').addClass('ui_search_field_empty');
    ga('#apps_search_res').remove();
    ga('.apps_list_content').show();
    ga('#s_search').val('');
}

function itemRatings() {


    ga('[rel="start-rating"]').each(function() {

        var ratings_d = ga(this).data('rating');
        var current_stars = ratings_d['current_stars'];
        var rating_static = ratings_d['static'];
        var rating_stars = ratings_d['stars'];

        ga(this).attr({
            'data-ritemtype': ratings_d['item_type'],
            'data-ritemid': ratings_d['item_id'],
            'data-current': current_stars,
            'data-static': rating_static,
            'data-stars': rating_stars
        });



        var $this = ga(this);

        // get rating counts
        var send = jAjax('/cmd.php', 'post', {
            'cmd': 'get-item-rating-count',
            'item-id': ratings_d['item_id'],
            'item-type': ratings_d['item_type']
        });
        send.done(function(d) {
            var rating_cnt = $this.parent().find('.rating_sys_count');
            rating_cnt.removeClass('div-loader')
            if(d > 0) {

                rating_cnt.html(lang.based_on_count_rating.replace('%c', '<strong>' + d + '</strong>'));


            } else rating_cnt.addClass('__none');

        });



        ga(this).starRating({
            callback: function(value) {

                if($this.hasClass('staticrating')) {
                    return;
                }
                // send data
                var send = jAjax('/cmd.php', 'post', {
                    'cmd': 'rate-item',
                    'rating': escape(value),
                    'item-type': ratings_d['item_type'],
                    'item-id': ratings_d['item_id']
                });
                send.done(function(d) {

                    var r = validateJson(d);

                    if(r.msg == 0) {


                        return displayErr(lang.you_have_already_rated);
                    } else if(r.msg == 1) {

                        $this.addClass('staticrating');

                        for(var i = 0; i < r.total_rating; i++) {

                            $this.find('li:eq(' + i + ')').addClass('active');
                        }

                        kn_liveNotif(lang.rating_sent, 'done', 4000, lang.rating_sent_thanks);

                    } else {
                        return displayErr(lang.err_tehnic);

                    }

                });


            }
        });
    });

}
// search in apps page
function appsSearch() {


    var _search_input = ga('#s_search');
    var _input_timeout;

    var _searchGetResult = function(_this) {

        if($.trim(_this.val())) {
            ga('#apps_search').removeClass('ui_search_field_empty').addClass('ui_search_loading');
            var _by_genre = _this.data('searcgcateg');
            var send = jAjax('/cmd.php', 'post', 'cmd=searchInApps&genre=' + escape(_by_genre) + '&key=' + _this.val());
            send.done(function(data) {
                ga('#apps_search').removeClass('ui_search_loading');
                if(data === '0') {

                    return displayErr(lang.err_tehnic);

                } else {

                    ga('.apps_list_content').hide();

                    ga('#apps_search_res').remove();
                    ga('.apps_list_content').after(data);

                }
            });

        } else {
            ga('#apps_search').addClass('ui_search_field_empty');
            ga('#apps_search_res').remove();
            ga('.apps_list_content').show();
        }

    }


    _search_input.off('keyup.appsSearch').on('keyup.appsSearch', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var _this = ga(this);
        clearTimeout(_input_timeout);
        _input_timeout = setTimeout(function() {
            clearTimeout(_input_timeout);
            _searchGetResult(ga(_this));
        }, 500);

    });
    _search_input.off('keypress.appsSearch,keydown.appsSearch').on('keypress.appsSearch,keydown.appsSearch', function(e) {

        clearTimeout(_input_timeout);
    });
}

function updateSessionContacts(uid) {

    if(!isInArray(uid, my_contacts))
        my_contacts.push(uid);

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function plusNFeed(el, ev) {
    ev.preventDefault();
    var $el = ga(el),
        curr_scrollTop_pos = ga(window).scrollTop();
    var fbk_loader_markup = '<div class="_4-u2 mt8 _2iwp _4-u8"><div style="height:313px;" class="_2iwo"><div class="_2iwq"><div class="_2iwr"></div><div class="_2iws"></div><div class="_2iwt"></div><div class="_2iwu"></div><div class="_2iwv"></div><div class="_2iww"></div><div class="_2iwx"></div><div class="_2iwy"></div><div class="_2iwz"></div><div class="_2iw-"></div><div class="_2iw_"></div><div class="_2ix0"></div></div></div></div>';
    var hookWall = ga('#hook_feed_wl_pg'),
        w_inp = escape(hookWall.attr('data-feed-etp')),
        f_user = ga('[data-uprofile]').length ? '&uid=' + escape(ga('[data-uprofile]').attr('data-uprofile')) : ga('#wprofileid').length ? '&uid=' + escape(ga('#wprofileid').val()) : ''; //hookWall.attr('data-uprofile') ? '&uid='+escape(hookWall.attr('data-uprofile')) : '';
    f_group = hookWall.attr('data-groupid') ? '&filter=groups&i=' + escape(hookWall.attr('data-groupid')) : '';

    w_inp++;


    //alert('cmd=wall&fp=' + escape(w_inp) + f_user + '&token='+ new Date().getTime());
    $el.addClass('_noEvt')
        .html('<div class="div-loader"></div>');
    var req = jAjax('/profile', 'post', 'cmd=wall&fp=' + escape(w_inp) + f_user + f_group + '&token=' + ((new Date())
        .getTime()) + '&type=pos&view_as=json');
    req.done(function(data) {



        var jData = validateJson(data);
        var fData = jData.content;
        if(!hookWall.hasClass('profileu')) {
            //if(typeof ms_container != 'undefined') ms_container.masonry('destroy'); else ms_container = ga('#hook_feed_wl_pg');
            var curr_feed_height = hookWall.height();
            var $nfeed_stor = ga(fData);
            $nfeed_stor.filter('.feed')
                .addClass('_nfeed__highlight');
            hookWall.append($nfeed_stor);
            //.css('height', curr_feed_height);

            /*
			ms_items = ms_container.find('.feed');
			ms_container.masonry(
			{
				// options
				itemSelector: ms_items,
				isAnimated: false,
				isFitWidth: true,
				gutterWidth: 8
			});
			checkFeedItemsSize(ms_container, ms_items);
			*/

            hookWall.attr('data-feed-etp', w_inp);
            setTimeout(function() {wallPhotosCollage(hookWall, function() {});}, 500);
            //hookWall.masonry('reload');
        } else {
            var $nfeed_stor = ga(fData);
            hookWall.attr('data-feed-etp', w_inp).append($nfeed_stor);
            setTimeout(function() {
                wallPhotosCollage(hookWall, function() {});
            }, 500);

        }


        if(fData !== '[END]') {
            $el.removeClass('_noEvt')
                .empty()
                .html(lang.feed_more_stories);



            setTimeout(function() {
                // build map
                if(ga('#hook_feed_wl_pg')
                    .find('.map-box')
                    .length) ga('#hook_feed_wl_pg')
                    .find('.map-box')
                    .each(function() {
                        var _t_data_ka = ga(this)
                            .find('.hookMapData')
                            .html();
                        var d_lc_map_dt = objHook(_t_data_ka);
                        postPopupBuildMap(_t_data_ka, 'feed-tip-map-loc-' + d_lc_map_dt['pl-i']);
                    });
            }, 1);


            up_href();
            getUserLocation();
            // jbox title 
            jbFeedTooltip(ga('.feed_lk_oth_fr'));

            // price format
            priceFormat();
            // add css class "float:left" to the feed blocks
            setTimeout(function() {

                //if(hookWall.hasClass('__two_columgap')) ga('.feed').addClass('__fleft');

            }, 10);

            ga('[data-jboxmouse="1"]')
                .each(function() {
                    jboxMouse($(this));
                });

            // create vegas theme (specially for *new friend)
            generateVegasTheme(1);

            // create collage for user profile theme
            setTimeout(function() {

                feedThemeCollage();
            }, 10);
        } else {


            var removeLoadMBTN = function(elm) {


                elm.replaceWith('<div class="feed_loaded_complete"></div>');

            }
            // remove "load more" button 

            if($el.parent().hasClass('p28')) removeLoadMBTN($el.parent());
            else
                removeLoadMBTN($el);
        }


        ga(window).scrollTop(curr_scrollTop_pos);
    });
}

// slide feed filter
function feedFilterSlide(el, mode) {
    el = ga(el);
    switch (mode) {

        case 'forward':
            el.closest('.uslider').find('.uslider_cnt').animate({
                scrollLeft: '+=400px'
            });
            break;

        case 'back':
            el.closest('.uslider').find('.uslider_cnt').animate({
                scrollLeft: '-=400px'
            });
            break;

        default:
            return;

    }

}

function feedFilterSlideByArrws() {

    if(!ga('.uslider_cnt').hasScrollBar()) ga('.uslider_cnt').parent().find('.uslider_ctrl.__next').addClass('hidden');

    ga('.uslider_cnt').off('scroll.horizontal').on('scroll.horizontal', function(e) {
        var _a = ga(this),
            s_newScrollLeft = _a.scrollLeft(),
            s_width = _a.outerWidth(),
            h_scrollWidth = _a.get(0).scrollWidth;



        if(_a.scrollLeft() >= 10) {
            _a.parent().find('.uslider_ctrl.__prev').removeClass('hidden');

        } else {

            _a.parent().find('.uslider_ctrl.__prev').addClass('hidden');
        }



        if(h_scrollWidth - s_newScrollLeft === s_width) {
            _a.parent().find('.uslider_ctrl.__next').addClass('hidden');

        } else {

            _a.parent().find('.uslider_ctrl.__next').removeClass('hidden');
        }

    });

}


function arrgFeedBlocks() {



    // build feeeeeeeeed
    if(ga('#hook_feed_wl_pg')
        .length) {
        // CHECK ITEM SIZE FUNCTION
    };
    if(ga('#index_wall_n')
        .length) {
        ms_container = ga('#hook_feed_wl_pg');
        ms_items = ms_container.find('.feed');
        ms_container.masonry({
            // options
            itemSelector: ms_items,
            isAnimated: false,
            isFitWidth: true,
            gutterWidth: 8
        });
        checkFeedItemsSize(ms_container, ms_items);
        ga(window)
            .trigger('scroll');

        ga(window)
            .off('resize.feedItems')
            .on('resize.feedItems', function(e) {
                checkFeedItemsSize(ms_container, ms_items);
            });
    }



}

function emptyFeedText() {

    return '<div class="wall_no_results"><span>' + lang.empty_wall + '</span></div>';


}

function startFeedSlider() {


    if(ga('#feed-slider').length) {
        ga('.uslider_cnt').mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * 30);
            event.preventDefault();
        });
        feedFilterSlideByArrws();
    }



}

function getWall(obj, filt, blr) {
	ga(window).scrollTop(0);
    var fbk_loader_markup = '<div class="_4-u2 mbm _2iwp _4-u8"><div style="height:%spx;" class="_2iwo"><div class="_2iwq"><div class="_2iwr"></div><div class="_2iws"></div><div class="_2iwt"></div><div class="_2iwu"></div><div class="_2iwv"></div><div class="_2iww"></div><div class="_2iwx"></div><div class="_2iwy"></div><div class="_2iwz"></div><div class="_2iw-"></div><div class="_2iw_"></div><div class="_2ix0"></div></div></div></div>';
    var hookWall = ga('#hook_feed_wl_pg'),
        _slider_space = ga('#_slider_space');
    var fd_cont = ga('section#hook_feed_wl_pg .feed');
    var filter = filt ? '&filter=' + escape(filt) : '';
    var obj = obj ? ga(obj) : '';
    var id = '';
    var _feed_sh_mr_btn = ga('.link-show-more');

    // hide "show more" btn while loading the wall
    _feed_sh_mr_btn.hide();

    var sliderActiveUser = function() {

        ga('.nb-carousel.__active').removeClass('__active');
        obj.closest('.nb-carousel').addClass('__active');


    }

    if(filter) {
        obj.closest('.filter')
            .find('a.__active')
            .removeClass('__active');

        obj.addClass('__active');


        if(filt == 'certain') {
            var _favorite_item_id = escape(obj.data('fvid').split('_')[1]);
            id = '&i=' + _favorite_item_id;
            filter = '&filter=favorite';
            _w_sliders = 1;
            sliderActiveUser();
            hookWall.removeAttr('data-groupid').attr('data-uprofile', _favorite_item_id);
        } else if(filt == 'certain2') {
            var _favorite_item_id = escape(obj.data('fvid').split('_')[1]);
            id = '&i=' + _favorite_item_id;
            filter = '&filter=friends';
            _w_sliders = 1;
            sliderActiveUser();

            hookWall.removeAttr('data-groupid').attr('data-uprofile', _favorite_item_id);
        } else if(filt == 'certain3') {
            var _favorite_item_id = escape(obj.data('fvid').split('_')[1]);
            id = '&i=' + _favorite_item_id;
            filter = '&filter=groups';
            _w_sliders = 1;
            sliderActiveUser();

            hookWall.removeAttr('data-uprofile').attr('data-groupid', _favorite_item_id);
        }
    } else {
        hookWall.removeAttr('data-uprofile');
        hookWall.removeAttr('data-groupid');
        ga('.feed-top-nav a.__active')
            .removeClass('__active');
        ga('.feed-top-nav .filter_i:first')
            .addClass('__active');
    }



    var wall_interval = setInterval(function() {
        if(hookWall.length != 0) {
            clearInterval(wall_interval);
            if(!blr) {
                if(ga('body')
                    .find('#index_wall_n')
                    .length) {
                    //for(var i = 0; i < 6; i++) hookWall.addClass('__two_columgap __mt8').append(fbk_loader_markup.replace('%s',randomIntFromInterval(300,350)));//addClass('__loading_wall');
                } else {
                    hookWall.addClass('__loading_wall');
                }
            } else {
                // fd_cont.addClass('__blur4');
                hookWall.empty();
                for(var i = 0; i < 4; i++) hookWall.addClass(' __mt8')
                    .append(fbk_loader_markup.replace('%s', 313)); //addClass('__loading_wall');


            }

            setTimeout(function() {
                var is_my_profile = ga('#_wall_itsme')
                    .length ? '&me=1' : '';

                var profile_id = ga('#wprofileid').length ? '&uid=' + escape(ga('#wprofileid').val()) : '';

                var req = jAjax('/profile', 'post', 'cmd=wall' + profile_id + id + filter + is_my_profile + '&token=' + ((new Date())
                    .getTime()) + '&type=pos&view_as=json');
                req.done(function(data) { //alert(data);

                    var jData = validateJson(data);


                    if(jData.content === '[END]') {


                        if(hookWall.hasClass('u_prof_redesign_feed')) {

                            hookWall.removeClass('__loading_wall').html('<div class="wall_no_results"><span>' + lang.empty_feed + '</span></div>');

                        } else {

                            //ga('.feed-top-nav .filter_i:not(.__active)').remove();
                            ga('.feed-top-nav').html('<h4 style="text-align:center;">Your wall is empty, make friends.</h4>');
                            ga('#hook_feed_wl_pg').addClass('empty-feed');
                            var getEmptyFeed = jAjax('/cmd.php', 'post', 'cmd=emptyfeed');
                            getEmptyFeed.done(function(data) {


                                hookWall.html(data);




                                //arrgFeedBlocks();		




                            });
                        }

                        return;


                    }



                    // remove sliders from DOM
                    if(filt != 'certain' && filt != 'certain2') {
                        _slider_space.empty();
                    } else if(filt === 'certain' && ga('.w_slider._friends').length) {
                        _slider_space.empty();
                    } else if(filt === 'certain2' && ga('.w_slider._favorite').length) {
                        _slider_space.empty();
                    }


                    if(jData) {

                        if(!filter) hookWall.html(jData['content']);
                        else {
                            hookWall.html(jData['content']);
                            setTimeout(function() {
                                ga('body')
                                    .animate({
                                        scrollTop: ga('#_slider_space')
                                            .offset()
                                            .top - ga('.toolbar')
                                            .height()
                                    }, 500);
                            }, 200);
                            // append sliders in wall, only for [favorite && friends] categ
                            if(!_slider_space.children().length) _slider_space.html(jData['page']);
                        }
                        hookWall.removeClass('__loading_wall __mt8');
                        fd_cont.removeClass('__blur4');
                        up_href();
                        onlineBlock(1);
                        if(filt === 'friends') ga('.nb-carousel:first>a').trigger('click');


                        // price format
                        priceFormat();

                        // jbox title 
                        jbFeedTooltip(ga('.feed_lk_oth_fr'));

                        // show "load more" btn
                        if(hookWall.find('.feed').length) setTimeout(function() {
                            _feed_sh_mr_btn.fadeIn();
                        }, 1000);

                        // add css class "float:left" to the feed blocks
                        /*setTimeout(function(){
                        	
                        	//if(hookWall.hasClass('__two_columgap')) ga('.feed').addClass('__fleft');
                        	
                        if(hookWall.find('.feed').length <= 1) {ga('.feed').hide(); setTimeout(function(){ga('.feed').show();},200);}
                        	
                        },200);
                        */

                        ga('[data-jboxmouse="1"]')
                            .each(function() {
                                jboxMouse(ga(this));
                            });

                        // create collage for user profile theme
                        setTimeout(function() {

                            feedThemeCollage();
                            getUserLocation();
                        }, 10);

                        setTimeout(function() {
                            // build map
                            if(ga('#hook_feed_wl_pg')
                                .find('.map-box')
                                .length) ga('#hook_feed_wl_pg')
                                .find('.map-box')
                                .each(function() {
                                    var _t_data_ka = ga(this)
                                        .find('.hookMapData')
                                        .html();
                                    var d_lc_map_dt = objHook(_t_data_ka);
                                    postPopupBuildMap(_t_data_ka, 'feed-tip-map-loc-' + d_lc_map_dt['pl-i']);
                                });
                        }, 100);
                        setTimeout(function() {
                            // build comments
                            hookWall.find('.feed_cnt')
                                .each(function() {
                                    var $this = ga(this);
                                    var $this_feed_data = validateJson(ga(this)
                                            .attr('id')),
                                        $feed_id = $this_feed_data.fid,
                                        $author_id = $this_feed_data.uid;
                                    $this.removeAttr('id')
                                        .attr('id', 'feed_cnt_' + $feed_id);
                                    var $after_app = ga('<div/>')
                                        .attr('id', 'feed_post_comments_section_' + $feed_id);
                                    $this.closest('.feed')
                                        .find('.feed_f')
                                        .after($after_app);
                                    /*	commentsWidget($feed_id,
                                    	$after_app,
                                    	'post',
                                    	{'width':279,'height':'auto','min-height':20,'overflow':'hidden','padding':'3px 74px 2px 7px'},
                                    	'',
                                    	'#feed_cnt_'+$feed_id,$author_id,'2',1);*/
                                });
                        }, 200);
                        wallPhotosCollage(hookWall, function ()
                        {
                        	// $("#hook_feed_wl_pg").find('.feed').css({'float':'left','display':'inli});
                        	// build feeeeeeeeed
                        	//arrgFeedBlocks();
                        	//setTimeout(function(){wallPhotosCollage(hookWall, function () {});},500);
                        });
                        


                        if(ga(".__two_columgap").length) {
                            //	setTimeout(function(){ajaxLoading()},200);
                            //setTimeout(function(){arrgFeedBlocks();removeAjaxLoad();},2000);
                        }
                        // pause video
                        var _p_video_nvw = function() {

                            ga('body')
                                .find('.__vdplaying')
                                .each(function() {
                                    if(!isElementInViewport(ga(this))) ga(this)
                                        .closest('.mejs-container')
                                        .find('.mejs-playpause-button>button')
                                        .trigger('click');
                                });

                        }

                        // vegas themes

                        var _p_slideshow_stop_vw = function() {
                            var _vegas_infeed = hookWall.find('.feed_fr_slideshow');
                            if(_vegas_infeed.length) {

                                generateVegasTheme(1);
                                _vegas_infeed.each(function() {

                                    if(!isElementInViewport(ga(this))) ga(this).vegas('pause');
                                    else ga(this).vegas('play');


                                });
                            }
                        }


                        // slider 
                        ga('[rel="feed-slider"]').each(function() {

                            ga(this).nobleSlider({
                                _SLIDER_BEZIER_ENGINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
                                _SLIDE_ANIMATION_DURATION: 550, // miliseconds
                                //_ENFORCE_SLIDER_SIZE: 'maxWidth',
                                _TOUCH_SWIPE_TRESHOLD: 10,
                                _TOUCH_SWIPE_SPEED_RATIO: 0.6684,
                                _SLIDER_WIDTH: '100%',
                                _SLIDER_HEIGHT: 260,
                                _ENABLE_ARROWS: true,
                                _SLIDE_END_HIDE_ARROWS: false,
                                _ENABLE_PAGINATION: false,
                                _IMAGE_SCALE_MODE: 'fit-for-bigger',
                                _AUTO_PLAY_SLIDE: false,
                                _AUTO_SCALE_LAYERS_BLOCK: true,
                                _SCALE_RATIO: 1,
                                _SLIDE_LOOP: false,
                                _LOAD_ALL_IMAGES: false
                            });

                        });



                        // pause video if isn't in viewport or browser tab is not active
                        //ga(window).off('blur.videoPause').on('blur.videoPause',_p_video_nvw);
                        ga([window, document]).off('onfocusout.videoPause').on('onfocusout.videoPause', _p_video_nvw);
                        ga(window)
                            .off('scroll.videoVport')
                            .on('scroll.videoVport', _p_video_nvw);

                        // pause slideshow if isn't in viewport
                        ga(window)
                            .off('scroll.slideshowPause')
                            .on('scroll.slideshowPause', _p_slideshow_stop_vw);

                        ga(window)
                            .off('scroll.feedComments')
                            .on('scroll.feedComments', function() {
                                var $feed_comments_widget = hookWall.find('.feed_post_comments_widget');
                                $feed_comments_widget.each(function() {
                                    if(isElementInViewport(ga(this))) ga(this)
                                        .show();
                                });
                            });
                        // add pause button, if playing a track from feed
                        if($.socplusMusic) {
                            if(typeof audio != 'undefined' && audio.playing) {
                                var playing_id = ga('#audioTag')
                                    .attr('track-id');
                                playing_id = playing_id.split('_')[playing_id.split('_').length - 1]; //tonum(playing_id);

                                var find_track_in_wall = ga('[data-track-inf]');
                                find_track_in_wall.each(function() {
                                    var f_track = ga(this);
                                    var track_id = f_track.attr('id');
                                    track_id = track_id.split('_')[track_id.split('_').length - 1];



                                    if(track_id == playing_id)
                                        f_track.addClass('m_portal_track_pause');

                                });
                                /*	ga('#hook_Block_MiddleColumnTopCardUser')
                                		.find('.track_play#' + playing_id)
                                		.addClass('m_portal_track_pause');*/
                            }
                        }

                        userFeed();
                    }
                });
            }, 100);
        }
    }, 10);
}


function removeHeadCount(object) {
    var $object = $(object);
    setTimeout(function() {
        $object.find('.g_notif_space')
            .empty();
    }, 3400);
}

function st() {
    var style_css = ga('[scomm="common-global-style"]');
    style_css.attr('href', style_css.attr('href') + (new Date().getTime()));
    return true;
}

function sy() {
    var js_src = ga('[rel="flocv"]');
    js_src.attr('src', js_src.attr('src') + '?v' + (new Date().getTime()));
    domstart();
    return true;

}

function gRightColumBirthDay() {
    var lftcol = ga('#nav_right_side>.fixed_always'); //ga('#hook_Block_LeftColumn');
    if(lftcol.length) {
        var sendaj = jAjax('/profile', 'post', 'cmd=birthday&type=pos&view_as=json');
        sendaj.done(function(r) {
            var d = validateJson(r);
            if(d.content !== 'NODATA') {
                var online_hook_on_us = lftcol.find('.online-fr_block');
                ga('#hook_Block_HolidaysPortlet').remove();
                lftcol.prepend(d.content);

                var holiday_block = ga('#hook_Block_HolidaysPortlet');
                if(!online_hook_on_us.hasClass('__minimized')) online_hook_on_us.css({
                    'height': online_hook_on_us.height() - (holiday_block.height() + 48),
                    'top': 'auto',
                    'bottom': '0'
                }).addClass('__minimized');

                setTimeout(function() {
                    ga('.online-fr_list.nano').nanoScroller();
                }, 500);

                if(ga('.online-fr_block').hasClass('__min'))
                    holiday_block.css('width', '-=48px');


            }
        });
    }
}

function profilePhotoWallAppendNewCont(data, appTo) {
    /*
		var new_wall_photos_markup = '<a style="z-index:0" href="/photo?q={$user.id}&show=profileWall&from=medium&fszw={$this->getThisPhotoDimension($res.id,'medium','width')}&fszh={$this->getThisPhotoDimension($res.id,'medium','height')}&a={b_encode($res.albumid)}&o={b_encode($res.id)}&cmd=openPhotoViewer&_token={mt_rand(1000,99999)}" data-vphopen="1" data-vphi="{base64_encode($res.id)}">'+
								 '<div class="ce11 this_wall_family image-hover" style="display:none;'+
'width:{$this->generateRandomImageSize($this->getThisPhotoDimension($res.id,'medium','width'))}px;'+
'height:{$this->generateRandomImageSize($this->getThisPhotoDimension($res.id,'medium','height'))}px;'+
'background-image:url(/getPhoto?p={$res.id}&sz=medium&g={$user.gender});">'+


'<div class="photo_rate_res">'+
'<div class="photo_rate_bg" style="width:{$rates}%;"></div>'+
'<div class="photo_rate_stars"></div>'+
'</div>'+

'<div class="profilephoto-wall widgets">'+
'<span class="widged_albname ellip">%ALBUM_NAME</span>'+

'<div class="klass_comm_wdg_p __{$res.id}">'+
'<div {if $res.userid !== $this->USER['id']}data-callback="phwallLikeClick" data-log-click='{literal}{{/literal}"type":"like","item":"photo","itemid":"{$res.id}"{literal}}{/literal}'{/if} class="ic ic_klass_wd {if $res.userid == $this->USER['id']}_curDef{/if} {if $res.lbyme}__active{/if}"></div>'+
'<span data-pplikt="ppo_{$res.id}" data-popup-people-likedphoto="1" data-photolikesdropdown="{$res.id}" data-appendtooltipto=".klass_comm_wdg_p" class="prbt_klass_count">{$res.lc}</span>'+
'</div>'+

'<div class="klass_comm_wdg_p __comments" data-thicommi="comm_{$res.id}" onclick="return photoCommentBfLayer(event,this);">'+
'<div class="ic ic_comm_wd"></div>'+
'<span class="prbt_comm_count">{$res.kc}</span>'+
'</div>'+
'</div>'+
'</div>'+
'</a>';
	*/
    if(data) {
        appTo.append(data.content)
            .justifiedGallery('norewind');
    }
}

function feedEmpty(a, b) {
    var x = '<div class="feed_loaded_complete"></div>';
    b ? a.after(x) : a.append(x);

}

function communityAlbumPicturesWall(n) {

    var pictures_obj = ga('#community_pictures_wall');
    var pictures_count = n ? 2 : pictures_obj.data('pictures-count');



    if(pictures_obj.length && pictures_count > 0) {

        var _all_items = pictures_obj.find('img');



        ajaxLoading();




        pictures_obj
            .justifiedGallery({
                rowHeight: 180,
                //maxRowHeight: 'auto',
                margins:8,
                border: 0,
                rel: 'communityWallItem',
                lastRow: 'nojustify',
                fixedHeight: false,
                captions: true,
                randomize: false,
                /*sizeRangeSuffixes: {
                	lt100 : '_t', 
                	lt240 : '_m', 
                	lt320 : '_n', 
                	lt500 : '', 
                	lt640 : '_z', 
                	lt1024 : '_b'
                }*/
            })
            .on('jg.complete', function(e) {
                removeAjaxLoad();

            });


    }

}



function userPhotoWall(data, appTo) {
    if(ga("#profile_wall_photos").length) {
        /*
    //setTimeout(function(){

      profile_photos_wall = new freewall("#profile_wall_photos");
			profile_photos_wall.reset({
					selector: '.ce11>img',
					animate: false,	gutterX:1, gutterY:1,		
					
					onResize: function() {
										profile_photos_wall.fitWidth();
					}
			});

 			profile_photos_wall.fitWidth();

			$('.ce11').fadeIn();
//},900);
*/
        // for more images
        ga('#profile_wall_photos')
            .justifiedGallery({
                rowHeight: 180,
                //maxRowHeight: 'auto',
                margins: 6,
                border: 0,
                rel: 'profileWallPhotos',
                lastRow: 'nojustify',
                fixedHeight: false,
                captions: true,
                randomize: false,
                /*sizeRangeSuffixes: {
                	lt100 : '_t', 
                	lt240 : '_m', 
                	lt320 : '_n', 
                	lt500 : '', 
                	lt640 : '_z', 
                	lt1024 : '_b'
                }*/
            })
            .on('jg.complete', function(e) {});
    }
}

function profileJustifyLastPhotos() {
    /*
    if (ga('body')
    	.find('.a06')
    	.length)
    {
    	// justify for 5 photos
    	ga('.a06')
    		.justifiedGallery(
    		{
    			lastRow: 'hide',
    			rowHeight: 90,
    			margins: 8,
    			imagesAnimationDuration: 0,
    			//maxRowHeight: 120,
    		})
    		.on('jg.complete', function (e)
    		{
    					var time_d = 800;
    			switch ($('.a06')
    				.children()
    				.length)
    			{
    			case 1:
    				time_d = 300;
    				break;
    			case 2:
    				time_d = 600;
    				break;
    			case 3:
    				time_d = 900;
    				break;
    			case 4:
    				time_d = 1100;
    				break;
    			case 5:
    				time_d = 1500;
    				break;
    			}
    			setTimeout(function ()
    			{
    				$('.a06')
    					.slideDown(time_d);
    			}, 500);
    		});
    }
    */
}
	
function masonryPicturesFromFeedPosts(){
		


				
var gutter = 12;	
var multiple_pictures = ga('.feed_photos_collage_justified.__mmm'); // 6+
var p2 = ga('.feed_photos_collage_justified.__2');
var p3 = ga('.feed_photos_collage_justified.__3');
var p4 = ga('.feed_photos_collage_justified.__4');
var p5 = ga('.feed_photos_collage_justified.__5');



var feed = ga('.feed_b');
var feed_width = feed.width();

      var imageOrientation = function(img) {

            var orientation;


            if (img.naturalWidth > img.naturalHeight) {
                orientation = 'landscape';
            } else if (img.naturalWidth < img.naturalHeight) {
                orientation = 'portrait';
            } else {
                orientation = 'even';
            }

            return orientation;

        }
		
 if(p2.length){
 
    // put it in a function so you can easily reuse it elsewhere
    var fit2Images = function(img1, img2, gutter) {

		
        // turn your images into jQuery objects (so we can use .width() )
        var $img1 = ga(img1);
        var $img2 = ga(img2);
		
		
		if($img1.hasClass('collaged') || $img2.hasClass('collaged') )return;
		
		
        // calculate the aspect ratio to maintain proportions
        var ratio1 = $img1.width() / $img1.height();
        var ratio2 = $img2.width() / $img2.height();
        // get the target width of the two images combined, taking the gutter into account
        var targetWidth = $img1.parent().parent().width() - gutter;

        // calculate the new width of each image
        var width1 = targetWidth / (ratio1+ratio2) * ratio1;
        var width2 = targetWidth / (ratio1+ratio2) * ratio2;

        // set width, and height in proportion
        $img1.parent().parent().width(width1);
        $img1.parent().parent().height(width1 / ratio1);
        $img2.parent().parent().width(width2);
        $img2.parent().parent().height(width2 / ratio2);

        // add the gutter
        $img1.parent().parent().css('marginRight', gutter + 'px');
		
		$img1.parent().parent().css('display','inline-block');
		$img2.parent().parent().css('display','inline-block');
		
		$img1.addClass('collaged');
		$img2.addClass('collaged');

    }
	p2.each(function(){
		var pictures = ga(this).find('img');
		var arr = {};
		var first_picture,st2_pic;
 
 
	 
		
		pictures.each(function(i){
			
			var pic = ga(this);
			var pic_no = i;
			
				if(pic_no == 0)
				first_picture = this;
				else if (pic_no == 1)
				st2_pic = this;
			
			
			
			pic.on('load',function(){
				setTimeout(function(){
				if(pic_no == 1)
				  fit2Images(first_picture,st2_pic,gutter);
				},500);

			}).each(function() {
			  if(this.complete) ga(this).load();
			});
 
		});
		

 
		
	});
	

	
}

p3.justifiedGallery({
                lastRow: 'justify',
                rowHeight: 130,
                margins: gutter,
                maxRowHeight: 220,
                imagesAnimationDuration: 0,
            });
			
			
p4.justifiedGallery({
                lastRow: 'justify',
				
                rowHeight: 140,
                margins: gutter,
                imagesAnimationDuration: 0,
            });	

p5.justifiedGallery({
                lastRow: 'justify',
                rowHeight: 130,
                margins: gutter,
                imagesAnimationDuration: 0,
                maxRowHeight: 320
            });		

multiple_pictures.justifiedGallery({
                selector: '.feed_collage_i',
                lastRow: 'nojustify',
                rowHeight: 120,
                margins: gutter,
                //maxRowHeight: 190,
                imagesAnimationDuration: 0,
            });		
	
		
	
			
			
	}

function wallPhotosCollage(hookWall, callback) {


	if(ga('.feed_photos_collage_justified').length)
		masonryPicturesFromFeedPosts();







    if(ga('.feed_image_collage')
        .length) {
        // for more images
        ga('.feed_image_collage:not(.__1)')
            .justifiedGallery({
                lastRow: 'justify',
                rowHeight: 120,
				margins:12,
                imagesAnimationDuration: 0,
                //maxRowHeight: 340 ,
            })
            .on('jg.complete', function(e) {});
    }
    if(ga('.feed_videos_collage_justified')
        .length) {

        // 2 videos
        ga('.feed_videos_collage_justified.__2')
            .justifiedGallery({
                lastRow: 'justify',
                rowHeight: 100,
                margins: 12,
                maxRowHeight: 240,
                imagesAnimationDuration: 0,
            })
            .on('jg.complete', function(e) {});

        // 3 videos
        ga('.feed_videos_collage_justified.__3')
            .justifiedGallery({
                lastRow: 'justify',
                rowHeight: 170,
                margins: 12,
                maxRowHeight: 240,
                imagesAnimationDuration: 0,
            })
            .on('jg.complete', function(e) {});

        // 4 videos
        ga('.feed_videos_collage_justified.__4')
            .justifiedGallery({
                lastRow: 'justify',
                rowHeight: 180,
                margins: 12,
                maxRowHeight: 240,
                imagesAnimationDuration: 0,
            })
            .on('jg.complete', function(e) {});

        // 5 videos
        ga('.feed_videos_collage_justified.__5')
            .justifiedGallery({
                lastRow: 'justify',
                rowHeight: 180,
                margins: 12,
                maxRowHeight: 240,
                imagesAnimationDuration: 0,
            })
            .on('jg.complete', function(e) {});


        // multiple videos
        ga('.feed_videos_collage_justified.__mmm')
            .justifiedGallery({
                lastRow: 'justify',
                rowHeight: 180,
                margins: 12,
                imagesAnimationDuration: 0
            })
            .on('jg.complete', function(e) {});

    }


    if(ga('.feed-product-images-collage').length) {

        ga('.feed-product-images-collage').each(function() {
            ga(this).justifiedGallery({
                    rowHeight: 90,
                    maxRowHeight: 230,
                    margins: 6,
                    border: 0,
                    rel: 'marketProductPicture',
                    lastRow: 'justify',
                    fixedHeight: false,
                    captions: true,
                    randomize: true,
                    /*sizeRangeSuffixes: {
                    	lt100 : '_t', 
                    	lt240 : '_m', 
                    	lt320 : '_n', 
                    	lt500 : '', 
                    	lt640 : '_z', 
                    	lt1024 : '_b'
                    }*/
                })
                .on('jg.complete', function(e) {});

        });

    }


    if(ga('.nb-feed-post-images')
        .length) {
        // slider for news feed
        var slides_arr = [];
        ga('.nb-feed-post-images')
            .each(function() {
                if(typeof $(this)
                    .attr('id') == 'object') return;
                var $this = $(this);
                var sid = $(this)
                    .attr('id');

                ga('#' + sid)
                    .nobleSlider({
                        _SLIDER_BEZIER_ENGINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
                        _SLIDE_ANIMATION_DURATION: 400, // miliseconds
                        _IMAGE_SCALE_MODE: 'fit-for-bigger',
                        _IMAGE_TO_CENTER: true,
                        _TOUCH_SWIPE_TRESHOLD: 1,
                        _TOUCH_SWIPE_SPEED_RATIO: 0.6284,
                        _SLIDER_WIDTH: '60%',
                        _SLIDER_HEIGHT: 308,
                        _ALLOW_FULL_SCREEN: false,
                        //_SLIDES_ORIENTATION: 'vertical',
                        _ENABLE_PAGINATION: true,
                        _ENABLE_ARROWS: true,
                        _VISIBLE_DIMENSION: '100%',
                        _SLIDES_SPACING: 20,
                        _SLIDE_LOOP: true,
                        _CLBK_IMAGE_LOADED: function() {
                            slides_arr.push(sid);
                            ga('.nobleSlider')
                                .nobleSlider('update');
                        }
                    });
            });
    }
    //}
    callback();
    setTimeout(function() {
        ga('.justified-gallery').justifiedGallery('jg.resize');

    }, 3000);
}


function buyVotes() {

    ga('<div/>')
        .addClass('modal-new')
        .appendTo(ga('body'));

    var jb_ = new jBox('Modal', {
            appendTo: ga('.modal-new'),
            id: 'jb_buy_votes',
            title: lang.Buy_votes,
            overlay: false,
            fade: false,
            closeButton: 'box',
            'overflow': 'hidden',
            'fixed': false,
            blockScroll: true,
            height: 'auto',
            width: '450px',
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
                ga('#jb_buy_votes').remove();
                prn_modal();
            }
        }).open()
        .ajax({
            type: 'POST',
            url: '/cmd.php',
            data: {
                cmd: 'buy-votes'
            },

            reload: true,
            setContent: true,
            success: function(data) {

            }
        });

}

function createGroup(evt) {

    ga('<div/>')
        .addClass('modal-new')
        .appendTo(ga('body'));

    var jb_ = new jBox('Modal', {
            appendTo: ga('.modal-new'),
            id: 'jb_new_communities',
            title: lang.Create_new_community,
            overlay: false,
            fade: false,
            closeButton: 'box',
            'overflow': 'hidden',
            'fixed': false,
            blockScroll: true,
            height: 'auto',
            width: '450px',
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
                ga('#jb_new_communities').remove();
                prn_modal();
            }
        }).open()
        .ajax({
            type: 'POST',
            url: '/communities.php',
            data: {
                cmd: 'new-popup'
            },

            reload: true,
            setContent: false,
            success: function(data) {
                ga('#jb_new_communities').find('.jBox-content').html(data === '0' ? '<div class="no_rows" id="no_apps"><div>' + lang.err_launch_app + '</div></div>' : data);
            }
        });

}


function runPopups() {
    var w_url = window.location.pathname;
    switch (w_url) {
        case 'post':
            alert('postt')
            break;
    }
}

function loadAttach($cont) {
    $cont.find('.mdialog_atch_items_container')
        .children()
        .each(function() {
            var $this = ga(this);
            var $this_im = $this.find('i');
            if(isElementInViewport($this_im) && $this_im.hasClass('__default')) {
                $this_im.removeClass('__default')
                    .addClass('__loaded')
                    .css('background-image', 'url(' + $this_im.data('imageu') + ')');
            }
        });
}

function checkForMyFeed() {
    if($('body #index_wall_n')
        .length) $('#mainContent')
        .addClass('__wall');
}

function triggerLoadMore() {
    var _ncount = 0;
    ga(window)
        .scrollEnd(function() {
            var $this = $(this),
                btn_show_more_i = ga('.link-show-more.loader-controls:not(.private)');
            if(btn_show_more_i.length && isElementInViewport(btn_show_more_i) && !btn_show_more_i.hasClass('._incarcare') && _ncount <= 3) btn_show_more_i.trigger('click.lmore');
            btn_show_more_i.on('click.resetNCount', function(e) {
                _ncount = 0;
            });
            _ncount++;
        }, 600);
}

function profileRedesignPageMaximizeCont() {
    if(ga('#profile_redesign')
        .length) ga('#mainContentContentColumn,#mainContent')
        .addClass('__redesign_prof');
    else ga('#mainContentContentColumn,#mainContent')
        .removeClass('__redesign_prof');
}

function searchHints() {
    if($('#search_hints')
        .length) {
        var search_inp_awcompl = function() {
            var input = document.getElementById("query_usersearch");
            var awesomplete = new Awesomplete(input, {
                minChars: 1,
                maxItems: 12,
                autoFirst: false
            });
            awesomplete.list = search_hints;
            window.addEventListener("awesomplete-select", function(e) {
                $('#search_ic_submit')
                    .attr('href', '/search?key=' + $.trim(e.text.value))
                    .trigger('click');
            }, false);
        };
        if(search_hints.length <= 0) {
            var send = jAjax('/cmd.php', 'post', {
                cmd: 'searchHint',
                key: '1'
            });
            send.done(function(d) {
                var dt = validateJson(d, 1);
                for(var i = 0; i < dt.length; i++) {
                    search_hints.push(dt[i].fullname);
                    search_hints.push(dt[i].name);
                    search_hints.push(dt[i].surname);
                }
                search_inp_awcompl();
            });
        } else {
            search_inp_awcompl();
        }
    }
}

function searchPage() {
    var is_search_page = ga('#is_search_page');
    if(is_search_page.length) {
        var search_filter_col = ga('.v2_gs_filter_column_w');
        ga(window)
            .off('scroll.keepFixedSearchFilterCol')
            .on('scroll.keepFixedSearchFilterCol', function(e) {
                var srch_header = ga('.search_header');
                if(srch_header.length && $('.toolbar')
                    .offset()
                    .top + $('.toolbar')
                    .height() >= ga('.search_header')
                    .offset()
                    .top) search_filter_col.addClass('fixed_always')
                    .css('top', ga('.toolbar')
                        .height());
                else if(srch_header.length && $('.toolbar')
                    .offset()
                    .top < ga('.search_header')
                    .offset()
                    .top) search_filter_col.removeClass('fixed_always')
                    .removeAttr('style');
            });
        /*
        if(!$('.global_content').find('.search_cnt_filter').length){
        	
        	var send = jAjax('/cmd.php', 'post', {cmd:'getSearchFilterSide', key:1});
        	send.done(function(data){
        		$('#mainContent').before(data);
        		
        	});
        	
        }*/

        // filter show/hide
        filterBoxM();
    }
}

function filterBoxM() {


    ga(document).off('click.searchFilterBox').on('click.searchFilterBox', '.v2_gs_filter_t', function(e) {

        e.preventDefault();

        var a = ga(this).parent();

        if(a.hasClass('__open')) {

            a.removeClass('__open');

        } else {

            a.addClass('__open');
        }


    });

}

function disableEnableGlobalScrollBar() {
    var _reach_scrollTop = 0;
    setInterval(function() {
        var $bbdy = $('body');
        if($bbdy.hasClass(_nscroll)) {
            //_reach_scrollTop = !_reach_scrollTop ? $bbdy.scrollTop() : _reach_scrollTop;	
            //disable
            $bbdy.disableScroll();
        } else {
            //enable
            $bbdy.enableScroll();
            /*if(_reach_scrollTop){
            $bbdy.scrollTop(_reach_scrollTop);
            _reach_scrollTop = 0;
            }
            */
        }
    }, 100);
}

function feedThemeCollage() {
    var _f_kng42 = ga('._fknga1 .uprof_ntheme_photos_collage');
    if(_f_kng42.length) {

        _f_kng42
            .justifiedGallery({
                lastRow: 'hide',
                randomize: true,
                rowHeight: 80,
                margins: 0,
                fixedHeight: true,
                imagesAnimationDuration: 600,
            })
            .on('jg.complete', function(e) {});

    }

}

function profileThemeCollage() {

    if(ga('.uprof_ntheme_photos_collage')
        .length) {

        ga('.uprof_ntheme_photos_collage')
            .justifiedGallery({
                randomize: true,
                rowHeight: 160,
                margins: 0,
                lastRow: 'justify',
                //fixedHeight: false,
                //imagesAnimationDuration: 600,
            })
            .on('jg.complete', function(e) {});

        /*	var $grid = ga('.uprof_ntheme_photos_collage').imagesLoaded( function() {
  $grid.masonry({
    itemSelector: '.vp_header_item',
    percentPosition: true,
    columnWidth: '33.333%'
  }); 
});*/

        /*
        			var wall = new Freewall(".uprof_ntheme_photos_collage");
        wall.reset({
        					selector: '.vp_header_item',
        					animate: false,
        					cellW: 80,
        					cellH: 80,
        					delay: 30,fixSize:1,
        					onResize: function() {
        						wall.fitZone();
        					}
        				});
        				// caculator width and height for IE7;
        				wall.fitZone();
        			// for scroll bar appear;
        			ga(window).trigger("resize");
        */
    }
    /*else if (_i_kn_theme.length){


		var _img_to_show = _i_kn_theme.find('#th_v_bod'), _tuid = parseInt(_img_to_show.attr('tuid'));
		var x =  _tuid in _theme_delay ? _theme_delay[_tuid] : 0;
		var _is_end = false;
		var _th_delay_px = Math.abs(_i_kn_theme.width() - _img_to_show.width());
		if(x > 0){
			
			_img_to_show.removeClass('kn_img_setted').css(pVendor+'transform', 'translate3d(-'+x+'px,0,0) translateZ(0)');
			setTimeout(function(){_img_to_show.addClass('kn_img_setted');},500);
		}
		if(_img_to_show.width() > _i_kn_theme.width()){

			setInterval(function(){

				if(x >= _th_delay_px){
					x -= 1;
				}	else x += 1;
				
				
				_img_to_show.css(pVendor+'transform', 'translate3d(-'+x+'px,0,0) translateZ(0)');
				_theme_delay[_tuid] = x;
			///	console.log(_is_end);
				//console.log(_th_delay_px)
			}, 500);
			
			
		}
	}*/

}

function justifySharedPost() {




    if(ga('#post_shared').length) {


        ga('#post_shared').find('.media-photos_i-w')
            .justifiedGallery({
                randomize: true,
                rowHeight: 80,
                margins: 5,
                lastRow: 'justify',
                //fixedHeight: false,
                //imagesAnimationDuration: 600,
            })
            .on('jg.complete', function(e) {});


    }

}

function nanoScrollStart() {

    //setInterval(function(){

    ga('.nano').nanoScroller({
        preventPageScrolling: true
    });
    ga(".nano").nanoScroller();
    ga("#mainContent").find("img").load(function() {
        ga(".nano").nanoScroller();
    });

    //},1500);

}

// play gif images
function playGifImages() {

    ga(window).off('scroll.playGif').on('scroll.playGif', function(e) {

        ga('.gifplayer:not(.gifed)').each(function() {

            var _this = ga(this);

            if(!_this.hasClass('gifed')) {

                _this.gifplayer();
                _this.addClass('gifed');
                _gifs.push(_this.data('gif-id'));

            }


        });
        /*
        	ga('.gifplayer.gifed').each(function(){
        		
        			var _this = ga(this);

        			if ( !isElementInViewport(_this) ) {
        				alert('e');
        			_this.gifplayer('stop');
        			}
        		
        	});
        */
        if(_gifs.length) {
            for(var i = 0; i < _gifs.length; i++) {
                var _i_gif = ga('[data-gif-id="' + _gifs[i] + '"]'),
                    _gif_element = _i_gif.parent().find('.gp-gif-element:last');
                if(_gif_element.length && !isElementInViewport(_gif_element)) {
                    _i_gif.gifplayer('stop');
                }
            }
        }
    });
    /*
    	
    	ga(window).off('scroll.playGif').on('scroll.playGif', function(e){
    	var _f_gifs = ga('.global_content').find('.image-hover');
    		
    		if(_f_gifs.find('.image_gif_notation').length) {
    			
    			var _gifs = _f_gifs.find('.image_gif_notation:not(.__run)');
    			
    			_gifs.each(function(){
    				var _this = ga(this);
    				
    				 if(isElementInViewport(_this) && !_this.find('img').hasClass('_run')){
    					 
    					 _this.parent().find('img').off('load.gif').on('load.gif', function(){
    						
    						var _this_gif = ga(this), __gif_src = _this_gif.attr('src');
    						
    						_this_gif.addClass('_run').attr({ 'gif-orig-src':__gif_src, 'src':__gif_src.replace(/small/g, 'large')
    																					.replace(/medium/g, 'large')
    																					.replace(/thumb/g, 'large')
    																					.replace(/grid/g, 'large')
    																					.replace(/exp/g, 'large')+'?'+(new Date()).getTime()
    						});
    						
    						 
    					 });
    					 
    				 } else {
    					 
    					 
    					 _this.parent().find('img').off('load.gif').on('load.gif', function(){
    						
    						var _this_gif = ga(this), __gif_orig_src = _this_gif.attr('gif-orig-src');
    						
    						_this_gif.removeClass('_run').removeAttr('gif-orig-src').attr( 'src', __gif_orig_src+'?'+(new Date()).getTime() );
    						
    						 
    					 });
    					 
    					 
    				 }
    				
    			});
    			
    			
    		}
    		
    	});
    	
    	*/
}


function isBodyRestive() {
    var b = ga('body');

    if(
        b.hasClass('css-640') ||
        b.hasClass('css-400') ||
        b.hasClass('css-960') ||
        b.hasClass('css-480') ||
        b.hasClass('css-1024') ||
        b.hasClass('css-1200') ||
        b.hasClass('css-1320') ||
        b.hasClass('css-320')
    ) return true;
    else return false;

}

function userMenuCheckPosition() {

    var collapse_btn = ga('.user_menu_control');

    /*
    if(readCookie('user_menu_on') == 'no' && !collapse_btn.hasClass('_loaded') && !isBodyRestive() ){
    	setTimeout(function(){
    	collapse_btn.addClass('window_load _loaded').trigger('click.userMenu');
    	collapse_btn.removeClass('window_load');
    	},100);
    	
    }*/


}

function expandOnlineHook(ev, el, c) {

    ev.preventDefault();

    el = ga(el);
    var p = el.closest('.nav_tool_friends_online');


    if(!p.hasClass('enabled')) {

        p.addClass('enabled');

    } else {
        p.removeClass('enabled');
    }
	if(NODEJS_ENABLED) setTimeout(function(){messenger_shortcut.restructureChatTabs();},100);
    if(c) ga(c).removeAttr('style');
}

function runTipsy() {

    ga('[rel=tipsy]').each(function() {
        var orientation = ga(this).attr('data-tipsy-orientation') ? ga(this).data('tipsy-orientation') : $.fn.tipsy.autoNS;
        ga(this).tipsy({

            delayIn: 0, // delay before showing tooltip (ms)
            delayOut: 0, // delay before hiding tooltip (ms)
            fade: false, // fade tooltips in/out?
            fallback: '', // fallback text to use when no tooltip text
            gravity: orientation, // gravity//$.fn.tipsy.autoNS,//ga(this).data('tipsy-orientation') ? ga(this).data('tipsy-orientation') : 's', // gravity
            html: true, // is tooltip content HTML?
            live: true, // use live event support?
            offset: 0, // pixel offset of tooltip from element
            opacity: 1, // opacity of tooltip
            title: 'title', // attribute/callback containing tooltip text
            trigger: 'hover' // how tooltip is triggered - hover | focus | manual

        });
    });

}

function createEmoji() {

    var create_emoji = {
        // EMOTICONS
        emoticons: {

            ':smile:': 'smile',

            ':smiley:': 'smiley',

            ':grinning:': 'grinning',

            ':blush:': 'blush',

            ':relaxed:': 'relaxed',

            ':wink:': 'wink',

            ':heart-eyes:': 'heart-eyes',

            ':kissing_heart:': 'kissing_heart',

            ':kissing_closed_eyes:': 'kissing_closed_eyes',

            ':kissing:': 'kissing',

            ':kissing_smiling_eyes:': 'kissing_smiling_eyes',

            ':stuck_out_tongue_winking_eye:': 'stuck_out_tongue_winking_eye',

            ':stuck_out_tongue_closed_eyes:': 'stuck_out_tongue_closed_eyes',

            ':stuck_out_tongue:': 'stuck_out_tongue',

            ':flushed:': 'flushed',

            ':grin:': 'grin',

            ':pensive:': 'pensive',

            ":relieved:": 'relieved',

            ':unamused:': 'unamused',

            ':disappointed:': 'disappointed',

            ':persevere:': 'persevere',

            ':cry:': 'cry',

            ':joy:': 'joy',

            ':sob:': 'sob',

            ':sleepy:': 'sleepy',

            ':disappointed_relieved:': 'disappointed_relieved',

            ':cold_sweat:': 'cold_sweat',

            ':sweat_smile:': 'sweat_smile',

            ':sweat:': 'sweat',

            ':weary:': 'weary',

            ':tired_face:': 'tired_face',

            ':fearful:': 'fearful',

            ':scream:': 'scream',

            ':angry:': 'angry',

            ':rage:': 'rage',

            ':triumph:': 'triumph',

            ':confounded:': 'confounded',

            ':laughing:': 'laughing',

            ':yum:': 'yum',

            ':mask:': 'mask',

            ':sunglasses:': 'sunglasses',

            ':sleeping:': 'sleeping',

            ':dizzy_face:': 'dizzy_face',

            ':astonished:': 'astonished',

            ':worried:': 'worried',

            ':frowning:': 'frowning',

            ':anguished:': 'anguished',

            ':smiling_imp:': 'smiling_imp',

            ':imp:': 'imp',

            ':open_mouth:': 'open_mouth',

            ':grimacing:': 'grimacing',

            ':neutral_face:': 'neutral_face',

            ':confused:': 'confused',

            ':hushed:': 'hushed',

            ':no_mouth:': 'no_mouth',

            ':innocent:': 'innocent',

            ':smirk:': 'smirk',

            ':expressionless:': 'expressionless',

            ':man_with_gua_pi_mao:': 'man_with_gua_pi_mao',

            ':man_with_turban:': 'man_with_turban',

            ':cop:': 'cop',

            ':construction_worker:': 'construction_worker',

            ':guardsman:': 'guardsman',

            ':baby:': 'baby',

            ':boy:': 'boy',

            ':girl:': 'girl',

            ':man:': 'man',

            ':woman:': 'woman',

            ':older_man:': 'older_man',

            ':older_woman:': 'older_woman',

            ':person_with_blond_hair:': 'person_with_blond_hair',

            ':angel:': 'angel',

            ':princess:': 'princess',

            ':smiley_cat:': 'smiley_cat',

            ':smile_cat:': 'smile_cat',

            ':heart_eyes_cat:': 'heart_eyes_cat',

            ':kissing_cat:': 'kissing_cat',

            ':smirk_cat:': 'smirk_cat',

            ':scream_cat:': 'scream_cat',

            ':crying_cat_face:': 'crying_cat_face',

            ':joy_cat:': 'joy_cat',

            ':pouting_cat:': 'pouting_cat',

            ':japanese_ogre:': 'japanese_ogre',

            ':japanese_goblin:': 'japanese_goblin',

            ':see_no_evil:': 'see_no_evil',

            ':hear_no_evil:': 'hear_no_evil',

            ':speak_no_evil:': 'speak_no_evil',

            ':skull:': 'skull',

            ':alien:': 'alien',

            ':hankey:': 'hankey',

            ':fire:': 'fire',

            ':sparkles:': 'sparkles',

            ':star2:': 'star2',

            ':dizzy:': 'dizzy',

            ':boom:': 'boom',

            ':anger:': 'anger',

            ':sweat_drops:': 'sweat_drops',

            ':droplet:': 'droplet',

            ':zzz:': 'zzz',

            ':dash:': 'dash',

            ':ear:': 'ear',

            ':eyes:': 'eyes',

            ':nose:': 'nose',

            ':tongue:': 'tongue',

            ':lips:': 'lips',

            ':+1:': 'plus1',

            ':-1:': 'minus1',

            ':ok_hand:': 'ok_hand',

            ':facepunch:': 'facepunch',

            ':fist:': 'fist',

            ':v:': 'v',

            ':wave:': 'wave',

            ':hand:': 'hand',

            ':open_hands:': 'open_hands',

            ':point_up_2:': 'point_up_2',

            ':point_down:': 'point_down',

            ':point_right:': 'point_right',

            ':point_left:': 'point_left',

            ':raised_hands:': 'raised_hands',

            ':pray:': 'pray',

            ':point_up:': 'point_up',

            ':clap:': 'clap',

            ':muscle:': 'muscle',

            ':walking:': 'walking',

            ':runner:': 'runner',

            ':dancer:': 'dancer',

            ':couple:': 'couple',

            ':family:': 'family',

            ':two_men_holding_hands:': 'two_men_holding_hands',

            ':two_women_holding_hands:': 'two_women_holding_hands',

            ':couplekiss:': 'couplekiss',

            ':couple_with_heart:': 'couple_with_heart',

            ':dancers:': 'dancers',

            ':ok_woman:': 'ok_woman',

            ':no_good:': 'no_good',

            ':information_desk_person:': 'information_desk_person',

            ':raising_hand:': 'raising_hand',

            ':massage:': 'massage',

            ':haircut:': 'haircut',

            ':nail_care:': 'nail_care',

            ':ride_with_veil:': 'ride_with_veil',

            ':person_with_pouting_face:': 'person_with_pouting_face',

            ':person_frowning:': 'person_frowning',

            ':bow:': 'bow',

            ':tophat:': 'tophat',

            ':crown:': 'crown',

            ':womans_hat:': 'womans_hat',

            ':athletic_shoe:': 'athletic_shoe',

            ':mans_shoe:': 'mans_shoe',

            ':sandal:': 'sandal',

            ':high_heel:': 'high_heel',

            ':boot:': 'boot',

            ':shirt:': 'shirt',

            ':necktie:': 'necktie',

            ':womans_clothes:': 'womans_clothes',

            ':dress:': 'dress',

            ':running_shirt_with_sash:': 'running_shirt_with_sash',

            ':jeans:': 'jeans',

            ':kimono:': 'kimono',

            ':bikini:': 'bikini',

            ':briefcase:': 'briefcase',

            ':handbag:': 'handbag',

            ':pouch:': 'pouch',

            ':purse:': 'purse',

            ':eyeglasses:': 'eyeglasses',

            ':ribbon:': 'ribbon',

            ':closed_umbrella:': 'closed_umbrella',

            ':lipstick:': 'lipstick',

            ':yellow_heart:': 'yellow_heart',

            ':blue_heart:': 'blue_heart',

            ':purple_heart:': 'purple_heart',

            ':green_heart:': 'green_heart',

            ':heart:': 'heart',

            ':broken_heart:': 'broken_heart',

            ':heartpulse:': 'heartpulse',

            ':heartbeat:': 'heartbeat',

            ':two_hearts:': 'two_hearts',

            ':sparkling_heart:': 'sparkling_heart',

            ':revolving_hearts:': 'revolving_hearts',

            ':cupid:': 'cupid',

            ':love_letter:': 'love_letter',

            ':kiss:': 'kiss',

            ':ring:': 'ring',

            ':gem:': 'gem',

            ':bust_in_silhouette:': 'bust_in_silhouette',

            ':busts_in_silhouette:': 'busts_in_silhouette',

            ':speech_balloon:': 'speech_balloon',

            ':footprints:': 'footprints',

            ':thought_balloon:': 'thought_balloon'


        },


        // MEEPs
        meep: {

            '[m-)]': '1.png',

            '[m-L]': '2.png',

            '[m-D]': '3.png',

            '[m-I]': '4.png',

            '[m-C]': '5.png',

            '[m-LK]': '6.png',

            '[m-S]': '7.png',

            '[m-R]': '8.png',

            '[m-H]': '9.png',

            '[m-P]': '10.png',

            '[m-B]': '11.png',

            '[m-PK]': '12.png',

            '[m-HH]': '13.png',

            '[m-DN]': '14.png',

            '[m-O]': '15.png',

            '[m-BL]': '16.png',

            '[m-BR]': '17.png',

            '[m-IC]': '18.png',

            '[m-RUS]': '19.png',

            '[m-MBA]': '20.png',

            '[m-IB]': '21.png',

            '[m-IOK]': '22.png',

            '[m-GPP]': '23.png',

            '[m-DS]': '24.png',

            '[m-DM]': '25.png',

            '[m-OPN]': '26.png',

            '[m-BIF]': '27.png',

            '[m-KVZ]': '28.png',

            '[m-FRK]': '29.png',

            '[m-BFL]': '30.png',

            '[m-RKB]': '31.png',

            '[m-LST]': '32.png'
        },


        y_smilies: {

            // happy
            ':)': '1',

            //sad
            ':(': '2',

            //winking
            ';)': '3',


            //big grin
            ':d': '4',

            //batting eyelashes
            ':yah5:': '5',

            // big hug
            ':yah6:': '6',



            // confused
            ':yah7:': '7',


            // love struck
            ':yah8:': '8',


            // blushing
            ':yah9:': '9',

            // tongue
            ':p': '10',

            // kiss
            ':*': '11',

            // broken heart
            ':yah12:': '12',


            // surprise
            ':o': '13',


            // angry
            ':yah14:': '14',


            // smug
            ':yah15:': '15',

            // cool
            ':yah16:': '16',


            // worried
            ':yah17:': '17',



            // whew!
            ':yah18:': '18',


            // devil
            ':yah19:': '19',

            // crying
            ':yah20:': '20',

            // laughing
            ':yah21:': '21',


            // straight face
            ':|': '22',

            // raised eyebrows
            ':yah23:': '23',

            // rolling on the floor
            ':yah24:': '24',

            // angel
            ':yah25:': '25',


            // nerd
            ':yah26:': '26',


            // talk to the hand
            ':yah27:': '27',

            // call me
            ':yah28:': '28',


            // on the phone
            ':yah29:': '29',


            // at wits' end
            ':yah30:': '30',


            // wave
            ':yah31:': '31',


            // timeout
            ':yah32:': '32',


            // day dreaming
            ':yah33:': '33',

            // sleepy
            ':yah34:': '34',


            // rolling eyes
            ':yah35:': '35',

            // loser
            ':yah36:': '36',

            // sick
            ':yah37:': '37',

            // don't tell anyone
            ':yah38:': '38',


            // not talking
            ':yah39:': '39',


            // clown
            ':yah40:': '40',


            // silly
            ':yah41:': '41',

            // party
            ':yah42:': '42',

            // yawn
            ':yah43:': '43',

            // drooling
            ':yah44:': '44',

            // thinking
            ':yah45:': '45',

            // d'oh
            ':yah45': '46',

            // applause
            ':yah47:': '47',

            // nail biting
            ':yah48:': '48',

            // hypnotized
            ':yah49:': '49',

            // liar
            ':yah50:': '50',

            // waiting
            ':yah51:': '51',

            // sigh
            ':yah52:': '52',

            // phbbbbt
            ':yah53:': '53',

            // cowboy
            ':yah54:': '54',

            // i don't want to see
            ':yah55:': '55',

            // hurry up
            ':yah56:': '56',

            // rock on
            ':yah57:': '57',

            // thumbs down
            ':yah58:': '58',


            // thumbs up
            ':yah59:': '59',

            // it wasn't me
            ':yah60:': '60',

            // pirate
            ':yah61:': '61'

        },

        sticker: {
            // hacker-boy

            'hacker-boy': {

                ':hkboy1:': 'hkboy1',
                ':hkboy2:': 'hkboy2',
                ':hkboy3:': 'hkboy3',
                ':hkboy4:': 'hkboy4',
                ':hkboy5:': 'hkboy5',
                ':hkboy6:': 'hkboy6',
                ':hkboy7:': 'hkboy7',
                ':hkboy8:': 'hkboy8',
                ':hkboy9:': 'hkboy9',
                ':hkboy10:': 'hkboy10',
                ':hkboy11:': 'hkboy11',
                ':hkboy12:': 'hkboy12',
                ':hkboy13:': 'hkboy13',
                ':hkboy14:': 'hkboy14',
                ':hkboy15:': 'hkboy15',
                ':hkboy16:': 'hkboy16',
                ':hkboy17:': 'hkboy17',
                ':hkboy18:': 'hkboy18',
                ':hkboy19:': 'hkboy19',
                ':hkboy20:': 'hkboy20',
                ':hkboy21:': 'hkboy21',
                ':hkboy22:': 'hkboy22',
                ':hkboy23:': 'hkboy23',
                ':hkboy24:': 'hkboy24',
                ':hkboy25:': 'hkboy25',
                ':hkboy26:': 'hkboy26',
                ':hkboy27:': 'hkboy27',
                ':hkboy28:': 'hkboy28',
                ':hkboy29:': 'hkboy29',
                ':hkboy30:': 'hkboy30',
                ':hkboy31:': 'hkboy31',
                ':hkboy32:': 'hkboy32',
                ':hkboy33:': 'hkboy33',
                ':hkboy34:': 'hkboy34',
                ':hkboy35:': 'hkboy35',
                ':hkboy36:': 'hkboy36',
                ':hkboy37:': 'hkboy37',
                ':hkboy38:': 'hkboy38',
                ':hkboy39:': 'hkboy39',
                ':hkboy40:': 'hkboy40',
                ':hkboy41:': 'hkboy41',
                ':hkboy42:': 'hkboy42',
                ':hkboy43:': 'hkboy43'
            },


            // Cute cat
            'cute-cat': {

                ':cutecat0:': 'cutecat0',
                ':cutecat1:': 'cutecat1',
                ':cutecat2:': 'cutecat2',
                ':cutecat3:': 'cutecat3',
                ':cutecat4:': 'cutecat4',
                ':cutecat5:': 'cutecat5',
                ':cutecat6:': 'cutecat6',
                ':cutecat7:': 'cutecat7',
                ':cutecat8:': 'cutecat8',
                ':cutecat9:': 'cutecat9',
                ':cutecat10:': 'cutecat10',
                ':cutecat11:': 'cutecat11',
                ':cutecat12:': 'cutecat12',
                ':cutecat13:': 'cutecat13',
                ':cutecat14:': 'cutecat14',
                ':cutecat15:': 'cutecat15',
                ':cutecat16:': 'cutecat16',
                ':cutecat17:': 'cutecat17',
                ':cutecat18:': 'cutecat18',
                ':cutecat19:': 'cutecat19'

            }

        }
    };

    return create_emoji;

}

function emojipath() {
    return {

        emoticons: smilies_path,
        y_smilies: smilies_path + '/y/',
        sticker: smilies_path + '/stickers/',
        meep: meep_path


    };
}

function str_smilies(str) {

    var smilies_path = emojipath().emoticons,
        meep_path = emojipath().meep;

    var emoticons = createEmoji().emoticons,
        y_smilies = createEmoji().y_smilies;
    var stickers = createEmoji().sticker;

    // emoticons	
    var re = new RegExp(Object.keys(emoticons).join("|"), "gi");
    str = str.replace(re, function(matched) {
        return '<span class="emotics emoji-spritesheet-0 emoji-code-bg-kn_' + emoticons[matched] + '">&nbsp;</span>';
    });

    // stickers
    var re = new RegExp(Object.keys(stickers).join("|"), "gi");
    str = str.replace(re, function(matched) {
        return '<img src="' + _THEME + '/css/images/b/blank.gif" class="sticker hacker-boy sticker-spritesheet-0 sticker-code-bg-kn_' + stickers[matched] + '" alt="' + stickers[matched] + '" border="0" />';
    });


    // y_Smilies
    for(var i in y_smilies) {

        var x = new RegExp(escapeRegExp(i), "g");

        var smiley_img = '<img style="vertical-align:middle;" src="' + smilies_path + '/y/' + y_smilies[i] + '.gif" border="0">';

        str = str.replace(x, smiley_img);
    }


    return str;

}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function generateVegasTheme(feed) {


    var _buildVegas = function(_conf, _images, el) {
        var ab = el ? el : ga('#u__slideshow');
        ab.vegas({
            overlay: _conf.overlay == "true" ? true : false,
            shuffle: _conf.shuffle == "true" ? true : false,
            transition: _conf.transition ? _conf.transition : 'fade',
            preloadImage: true,
            transitionDuration: _conf.trans_duration,
            timer: _conf.timer == "true" ? true : false,
            delay: _conf.delay,
            slides: _images
        });
        ab.vegas('play');
    }


    if(feed) {

        // create slideshow in news feed
        if(ga('.feed_fr_slideshow').length) {

            ga('.feed_fr_slideshow').each(function() {
                var _this = ga(this),
                    _slides_o = new Array(),
                    _sl_conf = _this.find('div.hookJsData').data('jsonsliderconf'),
                    _slides_conf = validateJson(_sl_conf.conf.options);


                for(var k = 0; k < _sl_conf.photos.length; k++)
                    _slides_o.push({
                        src: _sl_conf.photos[k].img
                    });


                _buildVegas(_slides_conf, _slides_o, _this);
            });


        }

        return;

    } else {


        var _slideshow_data = objHook(ga('#slideshow_data').html());

        // create slideshow in profile page
        if(ga('#u__slideshow').length && _slideshow_data) {

            var _slides_o = new Array(),
                _slides_conf = validateJson(_slideshow_data.conf.options);

            for(var k = 0; k < _slideshow_data.photos.length; k++)
                _slides_o.push({
                    src: _slideshow_data.photos[k].img
                });


            _buildVegas(_slides_conf, _slides_o);

        }



    }

}


function constructPostsPage() {

    var status_pg_feed = ga('.media_feed.status_pg');
    wallPhotosCollage(status_pg_feed, function() {});

    // build map
    if(status_pg_feed.find('.map-box').length)
        status_pg_feed.find('.map-box').each(function() {
            var _t_data_ka = ga(this).find('.hookMapData').html();
            var d_lc_map_dt = objHook(_t_data_ka);
            postPopupBuildMap(_t_data_ka, 'feed-tip-map-loc-' + d_lc_map_dt['pl-i']);
        });


}

function mainContent() {

    return ga('#mainContent');

}


function siteOnlineUsersPg() {
    /*	if( ga('#site_online_users').length )
    	setTimeout(function(){ ga('#customPlaceItemSpan').trigger('click'); },100);
    */
}

function userFeed() {


    var _u_f_spc = ga('#hook_feed_wl_pg');

    if(_u_f_spc.length) {



        if(_u_f_spc.html() == '' || !_u_f_spc.html().length) {
            ga('#uprofile_load_more_btn').remove();


        }
    }
}

function giftsSlider() {

    if(ga(".p_giftslist").children().length) {
        new giftsSlideshow("#gifts-slider");

    }


}


function venobox($el) {


    var _venoOptions = {

        bgcolor: '#5dff5e', // default: '#fff'
        numeratio: true, // default: false


        // is called when opening is finished
        post_open_callback: function(content, blocknum, blocktitle) {
            $('body').attr('style', 'overflow:hidden!important');
        },



        // is called after finished closing. 
        post_close_callback: function(content, blocknum, blocktitle) {
            $('body').removeAttr('style');
        }
    }

    if($el) $el.venobox(_venoOptions);
    else ga('.venobox').venobox(_venoOptions);


}


// image views in chat window
function chatImagesView() {



    ga(document).off('click.vboxChatItem').on('click.vboxChatItem', '.vbox-item', function(e) {
        e.preventDefault();

        Array.prototype.forEach.call(document.getElementsByTagName("a"), function(anchor) {
            anchor.addEventListener("click", function(evt) {
                evt.preventDefault();

                var newImg = document.createElement("img");

                newImg.src = anchor.href;
                newImg.addEventListener("load", function imgLoad() {
                    this.removeEventListener("load", imgLoad);

                    window.open(newImg.src, "image", "width=" + newImg.width + "px,height=" + newImg.height + "px");
                }, false);
            }, false);

        });




    });


}

// responsive site
function restiveW() {
    //alert($(window).width());
    $('body').restive({
        breakpoints: [/*'240', '320', '400', '480', '640',*/ '960', '1024', '1200', '1320'],
        classes: [/*'css-240', 'css-320', 'css-400', 'css-480', 'css-640',*/ 'css-960', 'css-1024', 'css-1200', 'css-1320'],
        turbo_classes: 'is_mobile=r_mobi,is_phone=r_phone,is_tablet=r_tablet,is_landscape=r_landscape',

        force_dip: true




    });


}


function manageLeftMenu() {


    if(ga('#hide_left_menu').length) {
        ga('html').addClass('_theme');
        setTimeout(function() {
            ga('#profile_left_side_bar').hide();
        }, 10);
    } else {
        ga('html').removeClass('_theme');
        ga('#profile_left_side_bar').show();
    }

}

function getStoriesAjax() {

    var send = jAjax('/stories.php', 'post', {
        'cmd': 'getStoriesAjax'
    });
    send.done(function(d) {

        ga('#stories-right-ul').addClass('nano').html(d);
        nanoScrollStart();
        setTimeout(function() {
            keepRightColFix();
        }, 500);
    });

}

function scrollDirectionDetect() {
    var lastScroll = 0;

    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

        if(currentScroll > 0 && lastScroll <= currentScroll) {
            lastScroll = currentScroll;
            return "down";
        } else {
            lastScroll = currentScroll;
            return "up";
        }
    };
}

function getRightColumn() {

    var is_index = ga('#index_wall_n');


    var isnt_index = function() {
        ga("#mainContent").removeClass('indexwall');
        ga("#nav_right_side").remove();
    };

    if(is_index.length) {

        var a = ['filter-feed', 'stories', 'pymkn', 'groups', 'birthday'];

        //for(var i=0; i < a.length;i++){
        if(ga('#nav_right_side').length) return;
        var send = jAjax('/cmd.php', 'post', {
            'cmd': 'rightColumn',
            'act': a
        });

        send.done(function(d) {



            if(ga('#index_wall_n').length) {

                ga("#mainContent").addClass('indexwall').append('<div id="nav_right_side" class="nav_right_side"><div class="rightELFIXCont">' + d + '</div></div>');
                setTimeout(function() {

                    getStoriesAjax();




                }, 2000);
				ga('.feed-top-nav .filter_i:first')
				.addClass('__active');
                nanoScrollStart();
                keepRightColFix();


            } else {
                isnt_index();
            }


        });
    } else {

        isnt_index();
    }


}

function keepRightColFix() {

    var container = ga('#nav_right_side');

    if(container.length) {



        var element = container.find('.rightELFIXCont');
        var ScrollTop = 0;
        var lastScrollVal = 0;
        var toolbar_menu = ga('.toolbar');
        var headerHeight = toolbar_menu.height();
        var first_div = container.find('.sp_right_col:first');
        var last_div = container.find('.sp_right_col:last');
        block_to_fixed = last_div;


        ga(window).off('scroll.righColumnToTop').on('scroll.righColumnToTop', function(e) {


            var scrollVal = ga(this).scrollTop();
            block_to_fixed = element;



            var elxw = (element.height() > ga(window).height());


            if(scrollVal > element.offset().top + element.height() - ga(window).height()) {


                this.b_start_position = this.b_start_position || block_to_fixed.offset().top;
                element.css({
                    'top': 'auto',

                    'bottom': (elxw ? '0' : 'auto'),

                }).addClass('fixed_always');




            } else if(block_to_fixed.offset().top <= this.b_start_position) {
                block_to_fixed.removeClass('fixed_always').removeAttr('style');
                this.b_start_position = 0;


            }



        });




    }

}

function headerCreateBackButton() {
    setTimeout(function() {
        // modify header
        var _modify_header = ga('#modifyheader');
        if(_modify_header.length) {
            var _g_header_name = _modify_header.data('headername'),
                _back_href = _modify_header.data('backhref');
            //ga('html').addClass('appsmodifyheader');
            var _toolbar_back_link = '<div>\
									<a class="cfff toolbar_back h-mod" href="' + _back_href + '" id="toolbar_back_id" hrefattr="true">\
									<span class="tico"><i class="tico_img ic ic_arrow-l"></i>' + _g_header_name + '</span>\
									</a>\
									</div>';
            //ga('#toolbar_back_id').remove();
            //ga('.a_user_toolbar_logo').after(_toolbar_back_link);

            ga('#stl_left').addClass('back').off('click.goupglobal').attr({
                'title': _g_header_name,
                'href': _back_href,
                'hrefattr': 'true'
            });


            up_href();
        } else {
            ga('html').removeClass('appsmodifyheader');
            //ga('#toolbar_back_id').remove();
            ga('#stl_left').removeClass('back').removeAttr('style').removeAttr('href hrefattr title');
            // ga('#stl_text').removeClass('back').text(lang.Up);

        }

    }, 1000);

}

function appsPage() {

    var in_app_page = ga('#in_app_page');
    var user_play_app = ga('#user_play_app');


    if(user_play_app.length) {

        ga('#mainContent').addClass('user-play-app');
    } else {
        ga('#mainContent').removeClass('user-play-app');

    }


    if(in_app_page.length) {

        // ga('.left_sd_b_wht').hide('slide',{direction:'left'},2000);
        if(in_app_page.hasClass('hide_left_menu')) ga('#profile_left_side_bar').hide();
        //ga('#profile_left_side_bar').animate({ marginLeft: "-100%"} , 4000);
        setTimeout(function() {
            ga('#mainContent').addClass('apppage'); //.css({'width':'100%','margin-left':0});
            ga('#mainContentContentColumn').addClass('inapps'); ///.css({'width':'72%','box-sizing':'border-box','min-height':520});

            build_miniclip_game();
        }, 1);




        appsSearch();

    } else {

        //ga('#mainContent,#mainContentContentColumn').removeAttr('style');
        ga('#mainContent').css({
            'width': '',
            'margin-left': ''
        });
        ga('#mainContentContentColumn').removeClass('inapps').css({
            'width': '',
            'margin-left': '',
            'min-height': ''
        });
        ga('#mainContent').removeClass('apppage')
        //   ga('.left_sd_b_wht').show('slide',{direction:'left'},2000);
        ga('#profile_left_side_bar').show();
        ga('html').removeClass('appsmodifyheader');
        ga('#toolbar_back_id').remove();
        //ga('#profile_left_side_bar').animate({ marginLeft: "0%"} , 4000);
    }



}

function communityGetLocation(e) {
    e = e || '';

    // create community location on map
    if(ga('#club_map_cnt' + e).length) {
        var _comm_loc_data = ga('#community_location_hook_data' + e).html();
        var d_lc_map_dt = objHook(_comm_loc_data);
        var club_map_design = '<div class="feed-tip-map-loc media-map" id="community-tip-map-loc' + e + '-' + d_lc_map_dt['pl-i'] + '"><div class="map_loading"><div class="map_load_ic tico_img"></div></div></div>';
        var club_map_address = '<div class="club_map_address">' + d_lc_map_dt['road'] + '<span class="communities_row_info_bullet">&#8226;</span>' + d_lc_map_dt['city'] + ',&nbsp;' + d_lc_map_dt['country'] + '.</div>';
        ga('#club_map_cnt').html(club_map_address + club_map_design);

        postPopupBuildMap(_comm_loc_data, 'community-tip-map-loc' + e + '-' + d_lc_map_dt['pl-i']);

    }
}

function communityPage() {

    if(typeof communityFeed == 'function')
        communityFeed();

    communityGetLocation();

}

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
            //etc
            return true;
    }
    return false;
}

function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            //case 'wmw':
            // etc
            return true;
    }
    return false;
}

function runPopupsAfterRefresh() {

    var refresh_url = ga('#refresh-url');

    if(refresh_url.length) {

        var g_refresh_url = ga(refresh_url[0].outerHTML);
        g_refresh_url.attr('id', 'refresh-url-upd');

        refresh_url.remove();

        ajaxLoading();
        setTimeout(function() {

            clickOnHome();
            setTimeout(function() {
                ga('body').prepend('<div style="display:none;" id="refresh_url_section">' + g_refresh_url[0]['outerHTML'] + '</div>');
                removeAjaxLoad();
                ga('#refresh-url-upd').trigger('click');
                ga('#refresh_url_section').remove();
            }, 2000);
        }, 2000);

    }

}

function userSettingsPage() {

    if(ga('#hook_Block_User_Settings_Basic_info').length) {

        ga('#pedit_interests_interests').emojiarea({
            stickers: false,
            wysiwyg: true,
            buttonLabel: 'Emojis',
            buttonPosition: 'after',
            button: ga('#pedit_interests_interests_emoji_btn')
        });
        ga('#pedit_interests_quotes').emojiarea({
            stickers: false,
            wysiwyg: true,
            buttonLabel: 'Emojis',
            buttonPosition: 'after',
            button: ga('#pedit_interests_quotes_emoji_btn')
        });
        ga('#pedit_interests_about').emojiarea({
            stickers: false,
            wysiwyg: true,
            buttonLabel: 'Emojis',
            buttonPosition: 'after',
            button: ga('#pedit_interests_about_emoji_btn')
        });

        ga('#pedit_interests_hobby').emojiarea({
            stickers: false,
            wysiwyg: true,
            buttonLabel: 'Emojis',
            buttonPosition: 'after',
            button: ga('#pedit_interests_hobby_emoji_btn')
        });
        setTimeout(function() {
            ga('.ms_items_more_wrap').remove();
        }, 500);
    }
}

function footerAlign() {

    setTimeout(function() {
        if(ga('.ftmin').length && ga('#hook_Block_MainContainer').length)
            ga('.ftmin').css('margin-left', ga('#hook_Block_MainContainer').offset().left + 'px');
    }, 3000);


}

function addCssJsFiles() {

    var head = ga('head');
    var body = ga('body');
    var b = 0;


    if(!head.hasClass('media-loaded')) {
        body.css({
            'visibility': 'hidden',
            'opacity': '0'
        });

        for(var i = 0; i < global_css_files.length; i++) {

            head.append('<link rel="stylesheet" type="text/css" href="' + _THEME + '/css/' + global_css_files[i] + '" />');

            b = i;

        }

        for(var i = 0; i < global_js_files.length; i++)
            $.getScript(_THEME + '/js/' + global_js_files[i]);



        //callOtherScripts(); 
        head.addClass('media-loaded');

        if(b == global_css_files) {
            body.css({
                'visibility': 'visible',
                'opacity': '1'
            });

        }

    }


}

///addCssJsFiles();
function sLoadImages() {

    var o_images = ga('img[data-original]');

    if(o_images.length) {


        ga(window).on('scroll.LoadOiriginalImages', function() {

            o_images.each(function() {

                if(isElementInViewport(ga(this))) {


                    ga(this).attr('src', ga(this).data('original'));


                }

            });

        });


    }




}

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function foucsCommentInput(ev, cont) {

    ev.preventDefault();


    var that = this;
    var _el = ga(ev.target);

    var is_video_popup = _el.closest('#video_all').length ? _el.closest('#video_all') : false;
    var comment_editor = is_video_popup ? is_video_popup.find('[contenteditable="true"]') : _el.closest('.feed').find('[contenteditable="true"]');

    if(cont)
        comment_editor = ga(cont).find('[contenteditable="true"]');

    comment_editor.addClass('input_highlight').focus().on(endAnimationEvent() + '.inputFocused', function(e) {

        ga(this).removeClass('input_highlight');
    });


}

function commentsInPostsPage() {

    var post_comments_sections = ga('[rel="comments-in-posts-page"]');

    if(post_comments_sections.length) {


        post_comments_sections.each(function() {
            var _this = ga(this);

            var $feed_id = _this.attr('id'),
                $itemid = _this.data('original-post-id'),
                $shared_post_id = _this.data('shared-post-id');
            $author_id = _this.data('posts-author-id'),
                clubid = _this.data('posts-clubid'),
                categ = _this.data('comments-categ');




            var $this = ga('[data-gth="feed-posts-' + $feed_id + '"]');
            var $after_app = ga('<div/>').addClass('feed_post_comments_widget' + (clubid ? ' incommunity' : '')).attr('id', 'feed_post_comments_section_' + $feed_id);
            $this.find('.feed_f').after($after_app);
            commentsWidget($shared_post_id,
                $after_app,
                categ, {
                    'width': '75%',
                    'height': 'auto',
                    'min-height': 20,
                    'overflow': 'hidden',
                    'padding': '3px 7px'
                },
                '',
                '#feed_cnt_' + $feed_id, $author_id, '2', 1);

            //	ga(this).remove();
        });

    }

}


function checkUserCompleteProfile() {

    if(ga('html').hasClass('user') && !ga('html').hasClass('completed-profile')) {
        var send = jAjax('/cmd.php', 'post', {
            'cmd': 'completeProfile'
        });
        send.done(function(d) {
            var markup = '';
            d = validateJson(d);

            if(d.length) {
                var count = d.length;
                for(var i = 0; i < d.length; i++) {


                    switch (d[i]) {

                        case 'nickname':
                            markup += '<li><a href="/settings/' + _U.i + '" hrefattr="true"><i class="_inline ic ic_nav_basic_info"></i><span class="complete_li">' + lang.complete_nickname + '</span></a></li>';
                            break;

                        case 'location':
                            markup += '<li><a href="/settings/' + _U.i + '" hrefattr="true"><i class="_inline ic ic_location"></i><span class="complete_li">' + lang.complete_location + '</span></a></li>';
                            break;

                        case 'profile_photo':
                            markup += '<li><a href="/profile?cmd=change-profile-photo" onclick="selectProfilePhoto(event,this);"><i class="_inline ic ic_view_profile"></i><span class="complete_li">' + lang.complete_photo + '</span></a></li>';
                            break;

                        case 'friends':
                            markup += '<li><a href="/search" hrefattr="true"><i class="_inline ic ic_ffriend"></i><span class="complete_li">' + lang.complete_friends + '</span></a></li>';
                            break;

                        case 'phone':
                            markup += '<li><a href="/settings/' + _U.i + '" hrefattr="true"><i class="_inline ic ic_phone"></i><span class="complete_li">' + lang.complete_phone + '</span></a></li>';
                            break;

                    }



                }


                ga('body').prepend('<section id="complete_user_profile" class="fixed_always"><div class="cmpl_div _closed" onclick="completeProfileExpand(this,event);" id="complete_profile_toggle"><i class="complete_profile_ic"></i><count class="complete_count">' + count + '</count><ul>' + markup + '</ul></div></section>');


            }

            ga('html').addClass('completed-profile');

        });
    }

}

function completeProfileExpand(el, event) {

    el = ga(el);


    el.removeClass('_closed');


}


function contenteditableLength() {


    // Excempt keys(arrows, del, backspace, home, end);
    var excempt = [37, 38, 39, 40, 46, 8, 36, 35];
    // Loop through every editiable thing
    ga("[contenteditable='true']").each(function(index, elem) {
        var $elem = $(elem);
        // Check for a property called data-input-length="value" (<div contenteditiable="true" data-input-length="100">)
        var length = $elem.data('input-length');
        // Validation of value
        if(!isNaN(length)) {

            if(!$elem.parent().find('.contenteditable-max-chars').length)
                $elem.after('<span class="contenteditable-max-chars">' + length + '</span>');

            // Register keydown handler
            $elem.on('keydown', function(evt) {
                var count_down = length - $elem.text().length;
                $elem.parent().find('.contenteditable-max-chars').html(count_down < 0 ? '<span style="color:red;">' + count_down + '</span>' : count_down);

                // If the key isn't excempt AND the text is longer than length stop the action.
                if(excempt.indexOf(evt.which) === -1 && $elem.text().length > length) {
                    evt.preventDefault();
                    return false;
                }
            });
        }
    });



}

function marketPage() {
    var mcont = ga('#mainContent'),
        left_menu = ga('#profile_left_side_bar'),
        page_layout = ga('#page_layout'),
        marketplace = ga('#marketplace'),
        toolbar = ga('.toolbar .toolbar_c'),
        mainContentColumn = ga('#mainContentContentColumn');
    if(ga('#marketplace').length) {
        /*	page_layout.css({'display':'flex','box-sizing':'border-box','width':'1320px'});
        	left_menu.css('width','230px');
        	mcont.addClass('full_width').css({'width':'910px','transition':'width .3s ease'});
        	marketplace.css({'display':'flex','min-width':'910px'});
        	mainContentColumn.css('width','100%');
        	toolbar.css('width','auto');
        	*/
        //left_menu.hide();
        mcont.addClass('full_width')
        ga('html').addClass('market_pg page-w1320');
        market.searchFilter();
    } else {

        mcont.removeClass('full_width');
        //left_menu.show();
        ga('html').removeClass('market_pg page-w1320');
    }


}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

function priceFormat() {

    ga('.globalpriceformat').each(function() {
        var str = ga(this).text();
        var only_price_numb = str.match(/\d/g).join('');
        var only_letters = str.replace(/[^a-zA-Z]+/g, '');
        var new_price = formatMoney(only_price_numb);


        ga(this).text(str.replace(only_price_numb, new_price));

    });

}

function userProfile() {

    if(ga('#user-profile').length) {

        ga('html').addClass('page-Wmedium user-profile-view');


        // sticky right side
        var container = ga('#profile-sticky-right-side');
        if(container.length) {

            var element = container.find('#profile-sticky-right-side-fixed');
            var ScrollTop = 0;
            var lastScrollVal = 0;
            var toolbar_menu = ga('.toolbar');
            var headerHeight = toolbar_menu.height();

            var last_div = element.find('.blocks-p:last');
            var block_to_fixed = element;
            container.css('min-height', element.outerHeight());
            ga(window).off('scroll.keepProfileRight').on('scroll.keepProfileRight', function(e) {
                if(ga(this).scrollTop() >= container.offset().top && !element.hasClass('sticked')) {
                    var x = (element.height() + 100) > ga(window).height() ? (ga(window).height() - (element.height() + 100)) : 0;
                    element.addClass('sticked').sticky({
                        topSpacing: x
                    });

                }
            });

        }

    } else {
        ga('html').removeClass('page-Wmedium user-profile-view');
    }

}

function resizeMessenger() {

    ga('.pmessenger').css('height', (ga(window).height() - ga('.toolbar').outerHeight()) + 'px');

    ga('#messenger-contacts-last,#messenger-contacts-search-res,#messenger-contacts-online-res').css('height', (ga(window).height() - (ga('.toolbar').outerHeight() + ga('.pmessenger-contacts-header').height() + ga('._1nq2').height())) + 'px');
    nanoScrollStart();

}

function messengerPage() {


    if(ga('.pmessenger').length && !anonym_content) {


        ga('html').addClass('messenger');




        setTimeout(function() {

            if(ga('#profile_left_side_bar').css('display') != 'none') {

                ga('#profile_left_side_bar').hide();
            }
            ga(window).off('resize.restructureMessengerPage').on('resize.restructureMessengerPage', function() {
                resizeMessenger();
            });

            resizeMessenger();
            messenger.firstConvClick();
            messenger.searchMessenger();

        }, 1000);




    } else {

        ga('html').removeClass('messenger');

    }


}

function guestsPage() {

    if(ga('#guests_page_shown').length) {

        ga('.g_notif_space').empty();

    }

}

function connectIo() {
	if(!NODEJS_ENABLED) return false;
	else
    return io.connect(NODE_HOST, {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionAttempts': 10

    });



}

function reconnectPeer(p) {

    p.connect(_U.i, {
        host: NODE_HOST_NAME,
        port: NODE_PORT,
        debug: true,
        metadata: {

            'user_name': _U.n,
            'user_avatar': _U.p,
            'user_id': _U.i

        }

    });


}

function connectPeer() {
 

    if(!window._peer) {
 
        window._peer = new Peer(_U.i, {
            host: NODE_HOST_NAME,
            port: NODE_PORT,
			reconnectTimer: 3000,
			iceTransportPolicy: 'relay', 
		//	path: '/peerjs',  
            debug: 3, //key:'peerjs',//secure:true,
            metadata: {

                'user_name': _U.n,
                'user_avatar': _U.p,
                'user_id': _U.i

            },
 
   config: {
        'iceServers': [
            { url: iceservers_stun,
                credential: base64_decode(urldecode(iceservers_cr)),
                username: base64_decode(urldecode(iceservers_un))
				},
            {
                url: iceservers_turn,
                credential: base64_decode(urldecode(iceservers_cr)),
                username: base64_decode(urldecode(iceservers_un))
            }
        ]
    }
  

        });


        _peer = window._peer;

    }


    return window._peer;

}

function reloadCallingPopup(popup, call_type, uid, p, s) {

    popup.location.reload();

}

function disconnectPeer() {
    if(window._peer) _peer.disconnect();
}

function notifyPeerRecipient(n, recipient_id) {
    //messenger.callConnectionEmitNotifications(n,recipient_id);


}
if(NODEJS_ENABLED){
function new_chat_window(el, evt) {
	messenger.closeBox();
    messenger_shortcut.open(el, evt);

}
}

function makeAvailableForVideoCall() {
	
    // connect peer
    connectPeer();

    var socket = sio;
    var call_rejected = true;

    // Compatibility shim
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    //self.peerConnect();

    socket.on('call_stopped', function(uid) {
        if(uid != _U.i) return;

        call_rejected = false;
        ga('.calling_markup').closest('#confirmation__dialog').find('.jBox-Confirm-button-cancel').click();

    });


    _peer.on('open', function(id) {

        console.log(id);

    });

    // Receiving a call
    _peer.on('call', function(call) {
        call_user_answered = false;
        var _self = this;;
        // get caller info
        this.metadata = call.metadata;
        var caller_name = this.metadata.user_name;
        var caller_avatar = this.metadata.user_avatar;
        var caller_id = this.metadata.user_id;
        var call_type = this.metadata.call_type;

        // Answer the call 
        soundManager.play('incomming-call');

        if(call_type == 'video')
            var calling_markup = '<div class="calling_markup"><div class="user_calling_markup"><div class="calling_user_avatar"><img src="/getPhoto?p=' + caller_avatar + '&sz=small" /></div><div class="calling_user_name">' + caller_name + '</div></div><div class="calling_text_markup">' + lang.calling_you_with_video.replace('%user', caller_name) + '</div></div>';
        else
            var calling_markup = '<div class="calling_markup"><div class="user_calling_markup"><div class="calling_user_avatar"><img src="/getPhoto?p=' + caller_avatar + '&sz=small" /></div><div class="calling_user_name">' + caller_name + '</div></div><div class="calling_text_markup">' + lang.calling_you_audio.replace('%user', caller_name) + '</div></div>';


        // send notification that the user is connected
        socket.emit("call_user_connected", caller_id);

        existingCall = call;
        return confirm_act(calling_markup,

            // accept call
            function(evt) {

                // stop ringing	
                setTimeout(function() {
                    soundManager.stop('incomming-call');
                }, 10);


                setTimeout(function() {
                    call_user_answered = true;
                    messenger.createCallingPopup('answer-' + call_type, caller_id, call, socket);
                }, 100);

            }, false,

            // reject call
            function() {

                // decline answer
                setTimeout(function() {
                    soundManager.stop('incomming-call');
                }, 10);
                // send notification that the respective user rejected the call
                if(call_rejected) socket.emit("call_rejected", caller_id);
                setTimeout(function() {
                    call.close();
                    existingCall = false;
                }, 100);

                call_rejected = true;
                /*		  
                		  call.answer();
                		  setTimeout(function(){
                			call.close();
                		  },2000);
                */



            }, {
                'confirm_button': 'Answer',
                'cancel_button': 'Decline'
            });




    });

    // error
    _peer.on('error', function(err) {
        console.log(err); //console.log(b);console.log(c);

        if(err.type == 'unavailable-id') {

            _peer.disconnect();
            connectPeer();


        } else if(err.type == 'disconnected') {
            connectPeer();
        }


    });


}

function controlWindowTab() {




    ga(window).on("blur focus", function(e) {
        var prevType = ga(this).data("prevType");

        if(prevType != e.type) { //  reduce double fire issues
            switch (e.type) {
                case "blur":
                   if(NODEJS_ENABLED) messenger_shortcut.removeAllChatFocusClass();
                    window_tab_active = false;
                    break;
                case "focus":

                    window_tab_active = true;
                    break;
            }
        }

        ga(this).data("prevType", e.type);
    });




}

  
function domstart() { 

    justifySharedPost();
    restiveW();
    searchHints();
    searchPage();
    if(typeof searchRightFilter === 'function') searchRightFilter();
    profileWallToCenter();
    profileJustifyLastPhotos();
    profileRedesignPageMaximizeCont();
    triggerLoadMore();
    checkForMyFeed();
 
    upload_form();
    sortPhotos();
    validateNav();
    onlineBlock();
    startFeedSlider();
    itemRatings();
    sLoadImages();

    if(ga('#hook_feed_wl_pg').length) getWall();


    getUserLocation();
    userProfile();
    if(!ga('html').hasClass('admincp')) checkUserCompleteProfile();
    userPhotoWall();
    usersBooksPage();
    post_tagged_people_show_jb();
    post_tagget_places_show_jb();
    runPopups();
    disableEnableGlobalScrollBar();
    profileThemeCollage();
    playGifImages();
    userMenuCheckPosition();
    generateVegasTheme();
    siteOnlineUsersPg();
    appsPage();
    communityAlbumPicturesWall();
    communityPage();
    guestsPage();
    //footerAlign();
    priceFormat();
	if(NODEJS_ENABLED) messengerPage();
    venobox();
    chatImagesView();
 
    manageLeftMenu();
    // get right column
    getRightColumn();
    runPopupsAfterRefresh();
 
    giftTooltip();
    inputPhone();
    commentsInPostsPage();
    marketPage();

	if (!anonym_content) {
	if(NODEJS_ENABLED) makeAvailableForVideoCall();
	controlWindowTab();
	}

    userSettingsPage();
    headerCreateBackButton();
    setTimeout(function() {
        runTipsy();
        giftsSlider();
    }, 1000);
    constructPostsPage();
    usersOnMapPage();
    marketViewProductInDom();

    setInterval(function() {
        var toolbar_page_name = ga('.toolbar_back');
        if(ga('.toolbar_search .it_w').hasClass('__focus')) {
            toolbar_page_name.hide();
        } else {
            toolbar_page_name.show();
        }

    }, 1000);


/*
    window.onerror = function(message, source, lineno, colno, error) {

       alert(message + '\n' + source + '\n' + lineno + '\n' + colno + '\n' + error);


    }

 */
    // initialize sounds notif
    soundManager.setup({
        url: __SITEURL + 'swf/soundmanager',
        flashVersion: 9,
        autoLoad: true,
        debugMode: false,
        preferFlash: true, // prefer 100% HTML5 mode, where both supported
        onready: function() {


            new_message = soundManager.createSound({
                // optional id, for getSoundById() look-ups etc. If omitted, an id will be generated.
                id: 'new-message',
                url: __SITEURL + "/cmd/sounds/new_message.mp3",
                // optional sound parameters here, see Sound Properties for full list
                volume: 100,
                autoPlay: false
            });

            incomming_call = soundManager.createSound({
                // optional id, for getSoundById() look-ups etc. If omitted, an id will be generated.
                id: 'incomming-call',
                url: __SITEURL + "/cmd/sounds/call_ringing.mp3",
                // optional sound parameters here, see Sound Properties for full list
                volume: 100,
                autoPlay: false,
                onfinish: function() {
                    soundManager.play('incomming-call');
                }
            });
        },
        ontimeout: function() {
            // console.log('SM2 init failed!');
        },

        defaultOptions: {
            // set global default volume for all sound objects
            volume: 100
        }
    });
    //nanoScrollStart();
    globalCont = ga('.global_content');
    /*$.ajaxSetup(
	{
		cache: true,
		success: function(){ ga('#conection_refused').remove();},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
		//	alert(XMLHttpRequest.readyState);
			var err_conection_server_markup = '<div id="conection_refused" class="m_no_flash_block body" aria-hidden="false" style="z-index: 99999;">\
      <div class="m_no_flash_block_sh">\
      </div>\
      <div class="m_notification_content">\
        <div class="m_notification_sh">\
        </div>\
        <div class="m_notification_wrapper">\
          <div class="m_notification_container">\
            <div class="m_notification_popup_msg" id="tc1">\
              [Internet connection refused] <br/>Error, check your internet connection.\
              &nbsp;\
              Please, refresh the page Or please wait to connect automatically.<br/>This notification box will close automatically after successfully connection.\
            </div>\
            <div class="m_notification_popup_buttons style1" id="buttonContainer1">\
              <button type="button" onclick="window.location.reload()" class="gwt-Button" style="margin: 0px;">\
                Refresh\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>', $body = ga('body');
			
			
	
				
			
		if(!$body.find('#conection_refused').length && XMLHttpRequest.readyState == 0){
			
			$body.append(err_conection_server_markup);
			
		} 
		
			
			
		}

	});
*/
    // height for left menu
    var l_menu_us_control = ga('#profile_left_side_bar');
    l_menu_us_control.css('height', l_menu_us_control.find('div:first').height() + 'px');

    // custom [select]
    ga('select')
        .selectmenu({

            create: function(event, ui) {

                //  var t_id = ga(event.target).attr('id')+'-menu';

                // ga('#'+t_id).parent().addClass('nano');
                // ga('#'+t_id).addClass('nano-content');


                // ga(this).addClass('nano');
                //ga(this).find('ul').addClass('nano-content');

                ///  setTimeout(function(){ga('#'+t_id).parent().nanoScroller();},400);

            }



        });
    // $(window).on('scroll',function(e){
    var $onlineKeepFixed = ga('.online-fr_block'); ///$('.manip_pos_top');
    var $header = ga('.toolbar');
    // if($header.offset().top >= $onlineKeepFixed.offset().top)
    // $onlineKeepFixed.css('top', $header.offset().top - 400 );
    /// $onlineKeepFixed.stickyScroll({ container: '.nav_tool_friends_online',topBoundary:'-100px' });
    /*
        var el = $('.online-fr_block'),//$('.manip_pos_top'),
            el_off = $('.site_nav_right_side'),
            top_offset = el_off.offset().top;///nav_tool_friends_online////$('.online-fr_block').offset().top; //


    $(window).off('resize').on('resize',function(e){
    var ww = $(window).width();
    var css = {};

    css['marginLeft'] = (ww - ($("#mainContent").width() + $('.online-fr_block').width())) / 4;

    $("#mainContent").css(css);

    });
    */
    ga(window)
        .off('scroll.pointOvr')
        .on('scroll.pointOvr', function(e) {
            var top_bar = ga('.user .toolbar');
            var scroll_top = ga(window)
                .scrollTop();
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                ga('#pointerOverlay')
                    .removeClass('__auto');
                ga('html').removeClass('scrolling');
                //top_bar.removeClass('__opac');
            }, 250));
            ga('#pointerOverlay')
                .addClass('__auto');
            ga('html').addClass('scrolling');
            //if(!anonym_content) messenger_shortcut.removeAllChatFocusClass();
            var _topoffset = _st.scrollTopPosition;

            if(scroll_top > top_bar.height()) {
                top_bar.addClass('__opac');

            } else {
                top_bar.removeClass('__opac');

            }


            if(scroll_top > _topoffset) {
                ga('#stl_left').fadeIn(); //.addClass('over over_fast');
                //  el.css('top', scroll_top - _topoffset);
            } else {
                ga('#stl_left').fadeOut(); //removeClass('over over_fast');
                //  el.css('top', '');
            }

        });
    ///  });


}

function ajaxLoading() {
    //var markup = ga('<div class="global_ajax_loader"></div>');
    var b = ga('body');
    var markup = '<div class="globalAjaxLoader">\
			<div>        \
			<div class="preloader-spin">\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
			</div></div>';

    if(!b.find('.globalAjaxLoader').length)
        b.prepend(markup);
}

function removeAjaxLoad() {
    ga('body')
        .find('.globalAjaxLoader')
        .remove();
}
// auto send [comment|message], if there is a click on sticker
function autoSendTr(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    var img = ga(evt.target)
        .parent()
        .find('img');
    var msg = img.attr('alt');
    EMOJIOP.hide();


    switch (_act_emoji) {

        case 'messages':
            sendPM(0, evt, msg);
            break;

        case 'photo_layer':

            var reply_of_reply = localStorage.getItem('com_reply');
            var reply_author_name = localStorage.getItem('com_reply_author');
            var reply_comm_id = localStorage.getItem('com_reply_id');
            sendComment(reply_comm_id ? reply_comm_id : ga('#phlayer_act_f')
                .val(), msg, $('.photo_layer_bottom_com .emoji-wysiwyg-editor'), evt, 'PhotoViewer',
                function() {
                    ga('.__comm_cancel_reply')
                        .trigger('click')
                }, reply_of_reply, reply_author_name);

            break;

    }
}
/** Attach files to textarea ***/
function jb_build_upload(ev) {
    var input = $(ev.target);
    var files = input[0].files;
    var phContent = $('.atch_cont');
    if(jb_attach_uploads.length == 21) {
        return displayErr(lang.jb_attach_maxim);
    } else if(files.length > 21) {
        return displayErr(lang.jb_attach_maxim_twone);
    }
    for(var i = 0; i < files.length; i++) {
        var file_ext = files[i].name.split('.')
            .pop()
            .toLowerCase();
        if($.inArray(file_ext, _st.photoTypes) == -1 && $.trim(file_ext)) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            $('.atch_cont .ec_items.__uploading')
                .remove();
            edUpload();
            return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
        }
        if(files.length > _st.maxFilesUpload) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            edUpload();
            return displayErr(lang.up_maximumFiles.replace('%s', _st.maxFilesUpload));
        }
        phContent.prepend(jprintf(getUploadSkem(1), i, files[i].name));
    }
    edUpload(1);
    jb_upload_attach(files, input, ev);
}

function jb_uploaded_attach_click(e, obj) {
    e.preventDefault();
    var $this = ga(obj),
        jb_rd_btn = ga('.jb_ready_btn'),
        jb_files_to_app = ga('.jb_attached_files'),
        jb_ph_id = $this.attr('id')
        .split('_')[1],
        sl_card = $this,
        s_class = '__selected';
    if(!sl_card.hasClass(s_class)) {
        sl_card.addClass(s_class);
        jb_attach_uploads.push(jb_ph_id);
        jb_rd_btn.removeClass('__disabled');
    } else {
        sl_card.removeClass(s_class);

        delete jb_attach_uploads[jb_attach_uploads.pindexof(jb_ph_id)];
        //delete jb_attach_uploads[jb_attach_uploads.indexOf(jb_ph_id)];
        if(Object.keys(jb_attach_uploads)
            .length <= 0) jb_rd_btn.addClass('__disabled');
    }
}

function jb_enable_Ok_btn_upload() {
    var jb_rd_btn = ga('.jb_ready_btn'),
        jb_rd_btn_id = jb_rd_btn.attr('id'),
        jb_files_to_app = jb_rd_btn_id.indexOf('chat') > -1 ? ga('#' + jb_rd_btn_id + '.jb_attached_files') : (jb_rd_btn_id && !ga('.pmessenger').length ? ga('[data-wdcommid="' + jb_rd_btn_id + '"] .jb_attached_files') : ga('.jb_attached_files'));

    jb_rd_btn.off('click')
        .on('click', function(e) {
            e.preventDefault();
            if(jb_attach_uploads.length <= 0) {
                e.stopImmediatePropagation();
                ga(this)
                    .addClass('__disabled');
                return displayErr(lang.jb_attach_upload_no_files);
            }

            for(var i = 0; i < jb_attach_uploads.length; i++) {
                if(typeof jb_attach_uploads[i] != 'undefined') jb_files_to_app.prepend('<obattch><div class="attach-photo_del" data-attached="1" onclick="jb_delete_attach(event)" title="' + lang.del + '" id="attachDe_' + jb_attach_uploads[i] + '"><div class="ic10 ic10_i_close"></div></div><img src="/getPhoto?p=' + jb_attach_uploads[i] + '&attach=true&v=' + (new Date()
                    .getTime()) + '" class="attach-photo_img" border="0" /></obattch>');
            }
            jb_attach_uploads = [];

        });
}
// attach from computer (upload)
function jb_upload_attach(files, input, evt) {
    var readAttach = function(o) {
        //var input = event.target;
        var reader = new FileReader();
        reader.onload = function() {
            var dataURL = reader.result;
            var container = $('#at_upload_' + o);
            var output = container.find('img')[0]; //container.find('.img_fak')[0];
            if(container.length == 0) return false;
            output.src = dataURL;
            // output.style.backgroundImage = 'url('+dataURL+')';
            container.find('.__uploadingInfo')
                .addClass('__off');
            container.find('.uploading_ovr')
                .addClass('__on');
            setTimeout(function() {
                container.find('.uploading_ovr.__on,.pup_bar_m_upload')
                    .remove();
            }, 1500);
        };
        reader.readAsDataURL(files[o]);
    }
    var count = 0;
    var totalFiles = files.length;
    var jb_rd_btn = $('.jb_ready_btn'),
        jb_files_to_app = $('.jb_attached_files');
    var trigger_attachUp = function() {
        if(typeof files[count] === 'undefined' || count > totalFiles - 1) {
            if(jb_attach_uploads.length) jb_rd_btn.removeClass('__disabled');
            edUpload();
            return false;
        }
        var formData = new FormData();
        formData.append('files[]', files[count]);
        formData.append('to', recipientId);
        $.ajax({
            url: _st.attachUpload,
            type: 'POST',
            xhr: function() { // Custom XMLHttpRequest
                var Xhr = $.ajaxSettings.xhr();
                if(Xhr.upload) { // Check if upload property exists
                    Xhr.upload.addEventListener('progress', function(e) {
                        var p_cont = $('#at_upload_' + count + ' .main_progress_photo');
                        if(e.lengthComputable) {
                            var p_percentage = Math.round((e.loaded / e.total) * 100);
                            p_cont.css('width', p_percentage + '%');
                        }
                    }, false); // For handling the progress of the upload
                }
                return Xhr;
            },
            //Ajax events
            beforeSend: function() {
                readAttach(count);
            },
            success: function(data) {
                var response = validateJson(data);
                if(response['status'] === 'OK') {
                    var container = $('#at_upload_' + count);
                    var u_image = container.find('img');
                    jb_attach_uploads.push(response['photoid']);
                    u_image.attr({
                        'src': '/getPhoto?p=' + response['photoid'] + '&attach=true&v' + (new Date())
                            .getTime()
                    });
                    container.children(':first')
                        .addClass('selectable-card __selected')
                        .attr({
                            'data-photoc': response['photoid'],
                            'onclick': 'jb_uploaded_attach_click(event,this)',
                            'id': 'abidal_' + response['photoid']
                        });
                    container.find('#restore_recent_upload')
                        .attr('href', '/profile?q=' + (response['userid']) + '&cmd=phreturn&i=' + (response['albumid']) + '&phf=' + (response['filename']) + '&ex=' + (response['extension']) + '&fsz=' + (response['filesize']) + '&pos=0&ad=' + response['added']);
                    container.find('#delete_recent_upload')
                        .removeAttr('style')
                        .attr('href', '/profile?q=' + (response['userid']) + '&cmd=deletephoto&ph=' + response['photoid']);
                    setTimeout(function() {
                        container.removeAttr('id');
                        count++;
                        trigger_attachUp();
                    }, 50);
                } else return displayErr(data);
            },
            error: function() {
                return displayErr(lang.somethingWrong)
            },
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    }
    trigger_attachUp();
}

function jBoxModalGetAlbumPhotos(ev, i) {
    ev.preventDefault();
    var $obj = $(ev.target);
    var albumId = escape(i);
    var send = jAjax('/profile', 'post', 'cmd=jBoxPhotoAlbum&i=' + albumId + '&type=pos&view_as=json');
    send.done(function(data) {
        data = validateJson(data);
        $('[uid="jbox_all_inclus_alb_pph"]')
            .html(data.content);
        setTimeout('jb_attachfl_enablePhotoSlct()', 500);
        ///jb_modal_attchfiles_repositionControlBtn();
    });
}
// next|prev post
function postPopupNextPrev(e, obj) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if(this._in) {
        return;
    }
    var _this = this;
    var $this = $(obj);
    var $b = $('body');
    var g = generateUrl($this[0]);
    this._in = 1;
    var call_pd = jAjax(g[0], 'post', g[1] + '&type=pos');
    call_pd.done(function(data) {
        _this._in = 0;
        createUrl('', '', $this.attr('href'));
        if(data == 0) return displayErr(lang.post_not_found);
        else {
            var post_scrl = $('#pp_post_viewer')
                .find('#pp_post_viewer_html_cnt');
            post_scrl.html(data);
            var author_id = parseInt($b.find('.post_author_i')
                .text());
            // build map
            if(ga('#pp_post_viewer').find('.map-box').length) {


                postPopupBuildMap(ga('#pp_post_viewer')
                    .find('.map-box>.hookMapData')
                    .html(), ga('#pp_post_viewer').find('.media-map').attr('id'));

            }
            // build comments section
            commentsWidget(g[1].split('=')[1], $('#postViewerCommentsSection'), 'post', {
                    'width': 432,
                    'height': 'auto',
                    'min-height': 20,
                    'overflow': 'hidden',
                    'padding': '3px 74px 2px 7px'
                }, $('#pp_post_viewer')
                .find(':scrollable'), '#mtLayerMain', author_id);
            post_scrl.trigger('scroll');
            // close popup
            $b.find('.media-layer_close_ico')
                .off('click')
                .on('click', function(e) {
                    e.preventDefault();
                    $b.removeClass(_nscroll);
                    $(this)
                        .closest('#pp_post_viewer')
                        .remove();
                    createUrl('', '', localStorage.getItem('postViewer_default_cur_loc'));
                    localStorage.removeItem('postViewer_default_cur_loc');
                    localStorage.removeItem('attch_checkUser');
                });
        }
    });
}
// remove postViewer
function removePostViewer(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    $('#pp_post_viewer')
        .find('.media-layer_close_ico')
        .trigger('click');
}

// report post
function reportCnt(e, cntid, cnttype) {
    e.preventDefault();
    e.stopPropagation();
    var report_obj = {
        "uid": _U.i,
        "id": cntid,
        "type": cnttype
    };
    return windowsPopup('report', report_obj);
}
// open photoviewer
function openPhotoViewer(e, obj) {
    e.preventDefault();
    e.stopPropagation();
    var $this = ga(obj);
    var p_id = $this.data('vphi');
    var g = generateUrl($this[0]);
    var bd_prg_ic = ga('body #load_ic_pop_rd');
    if(ga('#pp_photo_viewer')
        .length) return false;
    var call_pv = jAjax(g[0], 'post', g[1] + '&cur_pid=' + escape(p_id) + '&type=pos');
    call_pv.done(function(data)

        {


            var $d = ga(data);
            ga('body')
                .addClass(_nscroll)
                .append($d);


            setTimeout(function() {
                bd_prg_ic.addClass('__transparent');
            }, 200);
            $d.find('.photo-layer,#boss-gallery')
                /*.hover(function(e){
                		$('.js_popup_close').removeClass('__on') }

                		,function(e){$('.js_popup_close').addClass('__on') }
                		)*/
                .off('click.stopProp')
                .on('click.stopProp', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            $d.find('.js_popup_close')
                .off('click.mdcl')
                .on('click.mdcl', function() {
                    ga('body')
                        .removeClass(_nscroll);
                    ga("#pp_photo_viewer")
                        .remove();
                    localStorage.removeItem('attch_checkUser');
                    createUrl('', '', prev_url);
                });
            ///$d.find('img#__plpcte_target').load(function(){
            //$(".st_nv_popup_content.__child").hide();
            ///});
            var ppl_cur_img = $d.find('img#__plpcte_target');
            var ppl_img = new Image();
            ppl_img.src = ppl_cur_img.data('ppvwlg');
            ppl_img.onload = function() {
                ppl_cur_img[0].src = this.src;
                ppl_cur_img.removeAttr('style');
                ga(".st_nv_popup_content_processing")
                    .hide();
            };
        });
}

function postPopupBuildMap(data, customid) {
	var random_id = new Date().getTime();
    var m_id = !customid ? 'post-tip-map-loc' : customid;
    var mp_data = objHook(data);
    var latlng = [mp_data['pl-lt'], mp_data['pl-ln']];

	
	var rid = 'post-tip-map-loc'+random_id;
	ga('#'+m_id).attr('id',rid);
	
	
   if(!ga('#' + rid).length) return;


    var pmap = new L.Map(rid)
        .off().setView(latlng, 17)
        .whenReady(function() {
            ga('.map_loading')
                .remove()
        });
 
		
    pmap.addLayer(new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')); //base layer
    var newMarker = new L.marker(latlng)
        .addTo(pmap);
    newMarker.bindPopup(mp_data['display_name']); //.openPopup();
    L.Util.requestAnimFrame(pmap.invalidateSize, pmap, !1, pmap._container);
    ga('.leaflet-control-attribution.leaflet-control')
        .remove();
}

function createStories() {

    //if(ga('#stories').length)
    //story.createStories();
}

function post_tagget_places_show_jb() {
    var obj = ga('.post_jb_tip_map');
    if(!obj.length) return false;
    if(ga('#tagged-pplace-n-post-uje')
        .length) ga('#tagged-pplace-n-post-uje')
        .remove();
    var mp_data = objHook(obj.find('.hookData')
        .html());


    if(mp_data == undefined) return;


    var mp_tip_markup = '<div class="post-map-loc-name">' + (mp_data['pl-type'] == ('vilage' || 'town' || 'city' || 'country') ? lang['in'] : lang.at) + ' ' + mp_data['display_name'] + '</div><div class="post-tip-map" id="post-tip-map"><div class="map_loading"><div class="map_load_ic tico_img"></div></div></div>';
    obj.jBox('Tooltip', {
        content: mp_tip_markup,
        id: 'tagged-pplace-n-post-uje',
        closeOnMouseleave: true,
        position: {
            x: 'center',
            y: 'top'
        },
        ///outside: 'y',
        pointer: true,
        adjustPosition: true,
        reposition: true,
        onOpen: function() {
            if(!this.mapped) {
                var latlng = [mp_data['pl-lt'], mp_data['pl-ln']];
                var pmap = new L.Map('post-tip-map')
                    .setView(latlng, 17)
                    .whenReady(function() {
                        ga('.map_loading')
                            .remove()
                    });
                pmap.addLayer(new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')); //base layer
                var newMarker = new L.marker(latlng)
                    .addTo(pmap);
                newMarker.bindPopup(mp_data['display_name']); //.openPopup();
                L.Util.requestAnimFrame(pmap.invalidateSize, pmap, !1, pmap._container);
                ga('.leaflet-control-attribution.leaflet-control')
                    .remove();
                this.mapped = true;
            }
        }
    });
}

function post_tagged_people_show_jb() {
    var $ob = ga('.post-tagged-friends');
    if(!$ob.length) return;
    $ob.each(function() {
        var $this = $(this);
        var $this_markup = $this.data('udatacont');
        var $this_uid = parseInt($this.attr('id'));
        // remove created tooltips
        $('#tagged-people-n-post-uje-' + $this_uid)
            .remove();
        $this.jBox('Tooltip', {
            //content: 'aaaa',//stc ? jb_create_tooltip_cnt : c,
            id: 'tagged-people-n-post-uje-' + $this_uid,
            closeOnMouseleave: true,
            position: {
                x: 'center',
                y: 'top'
            },
            ///outside: 'y',
            pointer: true,
            adjustPosition: true,
            reposition: true,
            onOpen: function() {
                this.js_mk = '<div class="tooltip-tagged-p __posted mb0" id="post-pp-tagged-' + $this_markup.uid + '"><img src="/getPhoto?p=' + $this_markup.uphoto + '&g=' + $this_markup.ugender + '&sz=small"><a href="/user/' + $this_markup.uid + '" hrefattr="true" class="o">' + $this_markup.uname + '</a></div>';
                this.setContent(this.js_mk);
            }
        });
    });
    var hidden_tagged_people = $('.all-hidden-tagged-people');
    // remove created tooltips
    ga('#tagged-people-n-post-uje-hidden-cnt')
        .remove();
    hidden_tagged_people.jBox('Tooltip', {
        //content: 'aaaa',//stc ? jb_create_tooltip_cnt : c,
        id: 'tagged-people-n-post-uje-hidden-cnt',
        closeOnMouseleave: true,
        position: {
            x: 'center',
            y: 'top'
        },
        ///outside: 'y',
        pointer: true,
        adjustPosition: true,
        reposition: true,
        maxHeight: 220,
        onOpen: function() {
            var _this = this;
            _this.js_mk_hd = '';
            ga('.post-tagged-friends[data-aria-hidden="true"]')
                .each(function() {
                    var $this = $(this);
                    var $this_markup = $this.data('udatacont');
                    var $this_uid = parseInt($this.attr('id'));
                    _this.js_mk_hd += '<div class="tooltip-tagged-p __posted ellip" title="' + $this_markup.uname + '" id="post-pp-tagged-' + $this_markup.uid + '"><img src="/getPhoto?p=' + $this_markup.uphoto + '&g=' + $this_markup.ugender + '&sz=small"><a href="/user/' + $this_markup.uid + '" hrefattr="true" class="o">' + $this_markup.uname + '</a></div>';
                });
            this.setContent(_this.js_mk_hd);
        }
    });
}

function jb_modal_attchfiles_repositionControlBtn() {
    /*
    	var criteriu = $('.sticky-plank_hld');
    	var jbx = $('.jBox-content:last'), jbc = $('.jBox-container:last'), wh = $(window).height();

    	if(jbx.height() <= screen.height && $(window).scrollTop() < jbx.height()){
    	jbx.css('height','+='+criteriu.height());
    	criteriu.css({'bottom':screen.height-(jbx.outerHeight()+100), 'width':jbc.outerWidth(), 'position':'fixed'});
    	}else criteriu.removeAttr('style').css('position','absolute');
    */
    var control_btns = $('<a/>')
        .addClass('jb_ready_btn __disabled')
        .text('OK');
    ga('.jBox-closeButton:last')
        .append(control_btns);
}

function jb_attachfl_enablePhotoSlct() {
    var $o = ga('[uid="jbx_attch_ph_sel"]');
    var jb_attach_files = [];
    $o.on('click', function(e) {

        e.preventDefault();
        var $this = ga(this),
            jb_rd_btn = ga('.jb_ready_btn'),
            jb_rd_btn_id = jb_rd_btn.attr('id'),
            jb_files_to_app = jb_rd_btn_id.indexOf('chat') > -1 ? ga('#' + jb_rd_btn_id + '.jb_attached_files') : (jb_rd_btn_id && !ga('.pmessenger').length ? ga('[data-wdcommid="' + jb_rd_btn_id + '"] .jb_attached_files') : ga('.jb_attached_files')),
            jb_ph_id = $this.attr('id')
            .split('_')[1],
            sl_card = $this.find('.selectable-card'),
            s_class = '__selected';

        if(!sl_card.hasClass(s_class)) {
            sl_card.addClass(s_class);
            jb_attach_files.push(jb_ph_id);
            jb_rd_btn.removeClass('__disabled')
                .off('click')
                .on('click', function(e) {
                    e.preventDefault();
                    if(jb_files_to_app.children()
                        .length >= 21 || Object.keys(jb_attach_files)
                        .length > 21 || (jb_files_to_app.children()
                            .length + Object.keys(jb_attach_files)
                            .length) > 21) {
                        displayErr(lang.jb_attach_maxim);
                    } else {
                        for(var i = 0; i < jb_attach_files.length; i++) {
                            if(typeof jb_attach_files[i] != 'undefined') jb_files_to_app.prepend('<obattch><div class="attach-photo_del" onclick="jb_delete_attach(event)" title="' + lang.del + '" id="attachDe_' + jb_attach_files[i] + '"><div class="ic10 ic10_i_close"></div></div><img src="/getPhoto?p=' + jb_attach_files[i] + '&sz=small" class="attach-photo_img" border="0" /></obattch>');
                        }
                    }
                });
        } else {
            sl_card.removeClass(s_class);
            delete jb_attach_files[jb_attach_files.pindexof(jb_ph_id)];
            //delete jb_attach_files[jb_attach_files.indexOf(jb_ph_id)];
            if(Object.keys(jb_attach_files)
                .length <= 0) jb_rd_btn.addClass('__disabled');
        }
    });
}

function jb_delete_attach(evt) {
    var $obj = $(evt.target);
    $obj.closest('obattch')
        .slideDown(400, function() {
            $(this)
                .remove();
        });
}

function attach_pPhoto(a, b, c) {
    setTimeout(function() {
        window.trigger_attach_pPhoto(a, b, c)
    }, 100);
}

function attach_video(v) {
    setTimeout(function() {
        window.trigger_attach_video(v)
    }, 100);
}

function trigger_attach_video(evt) {



}

function trigger_attach_pPhoto(evt, upload, customid) {

    evt.preventDefault();
    ga('<div/>')
        .addClass('modal-new')
        .appendTo(ga('body'));

    var jb_ = new jBox('Modal', {
        appendTo: ga('.modal-new'),
        title: lang.j_modal_select_photos,
        overlay: false,
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': false,
        blockScroll: true,
        height: 'auto',
        width: '818px',
        minHeight: '100px',
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
    //alert(localStorage.getItem('attch_checkUser'));//jBoxGetUploadHtml
    jb_.open()
        .ajax({
            type: 'POST',
            url: '/profile',
            data: {
                cmd: upload ? 'gJBupload' : 'gAllPhotos',
                type: 'pos',
                view_as: 'json',
                i: recipientId ? recipientId : '' // && !localStorage.getItem('attch_checkUser') ? recipientId : localStorage.getItem('attch_checkUser')
            },

            reload: true,
            setContent: false,
            success: function(data) {

                var jCont = ga('.modal-new .jBox-content');
                var res = validateJson(data);
                jb_.setContent(res.content);
                //recipientId = 0;

                jb_modal_attchfiles_repositionControlBtn();
                if(customid) ga('.jb_ready_btn').attr('id', customid);
                setTimeout('jb_attachfl_enablePhotoSlct()', 500);

            }
        });

}
// build popup via jBox plugin
function jbPopup(evt, obj, nofix, minH) {
    evt.preventDefault();
    var friend_mkp = '<td class="ifCard">' + '<div id="hook_Block_FeedFavoriteItemBlock-%s" class="hookBlock">' + '<a class="popUp_select_i curPointer selectable-card __gerb %s" href="javascript:;">' + '<div class="popUp_select_img posR" style="position: relative;">' + ' <img src="/getPhoto?p=%s&sz=thumb&token=' + (new Date())
        .getTime() + '" alt="" width="128" height="128"><span class="selectable-card_ic"></span></div>' + '<div class="popUp_select_name">%s</div>' + ' </a>' + '</div>' + '</td>';
    var us_srch = '<div class="inav gm-cl-aft" style="margin-bottom: 26px">' + ' <div class="inav_search">' + ' <table class="input-flx-f input-flx-f__no-i-border">' + '  <tbody>' + '  <tr>' + '  <td class="gm-w100">' + '  <div class="it_w">' + '    <input type="text" name="st.layer.query" value="" placeholder="' + lang.searchfriends + '" id="ifSQtext" class="it" maxlength="50" autocomplete="off" style="color: rgb(153, 153, 153);">' + ' </div>' + '  </td>' + '  <td>' + '     <input class="search_ib" type="submit" name="button_invite_search"  value="" id="hook_FormButton_button_invite_search">' + '  </td>' + '  </tr>' + '   </tbody>' + '  </table>' + '  </div>' + ' <div class="inav_nav">' + ' <ul class="inav_ul inav__search_l">' +
        /*          '  <li class="inav_ul_li floatRight"></li>'+*/
        '  <li class="inav_ul_li floatRight"><span id="filter_search_count">%s</span></li>' + '  <li class="inav_ul_li inav_ul_li_ac"><a class="inav_a" href="javascript:void(0)l" hrefattr="true">' + lang.allfriends + '</a></li>' + '</ul>' + '  </div>' + '</div>';
    var $obj = $(obj);
    var g_data = $obj.data('jbst');
    !nofix ? $('<div/>')
        .addClass('modal-new')
        .appendTo(ga('body')) : ga('<div/>')
        .addClass('orig-modal')
        .appendTo($('body'));
    var jb_ = new jBox('Modal', {
        appendTo: !nofix ? ga('.modal-new') : ga('.orig-modal'),
        title: g_data.title,
        overlay: !nofix ? false : true,
        fade: false,
        closeButton: 'box',
        'overflow': !nofix ? 'hidden' : 'auto',
        'fixed': !nofix ? false : true,
        blockScroll: true,
        draggable: 'title',
        height: 'auto',
        width: g_data.wd,
        minHeight: minH ? minH : '100px',
        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: !nofix ? 'top' : 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')}
        },
        offset: {
            x: 0,
            y: !nofix ? 30 : 0
        },
        onClose: function() {
            prn_modal();
            ga('[data-zburator="true"]')
                .remove();
            if(g_data.cmd == 'all_friends') ga('body .feed-top-nav>.filter>a:eq(2)')
                .trigger('click');
        }
    });
    jb_.open()
        .ajax({
            type: 'POST',
            url: '/profile',
            data: {
                cmd: g_data.cmd,
                type: 'pos',
                relation: $obj.data('indicatorrel') ? escape($obj.data('indicatorrel')) : '',
                view_as: 'json'
            },
            reload: true,
            setContent: false,
            success: function(data) { //alert(data);
                var jCont = !nofix ? $('.modal-new .jBox-content') : $('.orig-modal .jBox-content');
                var res = validateJson(data);
                if(g_data.cmd == 'all_friends') {
                    var feedToFavTh = function(ob, evt) {
                        evt.preventDefault();
                        var $o = $(ob);
                        var b_mode = $o.hasClass('__active') ? 'remove' : 'add',
                            d_ui = escape($o.parent()
                                .attr('id')
                                .split('-')[1]);
                        var sd = jAjax('/profile', 'post', 'cmd=feedFilterFav&i=' + d_ui + '&q=' + b_mode + '&type=pos');
                        sd.done(function(a) {
                            if(a == '1') {
                                if(b_mode == 'remove') $o.removeClass('__active');
                                else $o.addClass('__active');
                            } else jboxNotice(a, 'right', 'bottom', 'red');
                        });
                    }
                    jCont.append(jprintf(us_srch, res.length));
                    jCont.append('<div id="ifCards" class="ifCards"><div><table class="cardsTable"><tbody><tr></tr></tbody></table></div></div>');
                    for(var i = 0; i < res.length; i++) {
                        var a = res[i];
                        $('#ifCards table>tbody>tr')
                            .append(jprintf(friend_mkp, a.id, a.status ? '__active' : '', a.photo, a.fname))
                            .find('.__gerb')
                            .
                        off('click.bgf')
                            .on('click.bgf', function(e) {
                                feedToFavTh(this, e);
                            });
                    }
                    $('#ifSQtext')
                        .fastLiveFilter('.cardsTable>tbody>tr', {
                            timeout: 200,
                            callback: function(total) {
                                $('#filter_search_count')
                                    .html(total);
                            }
                        });
                } else {
                    jb_.setContent(res.content);
                }
                if(nofix) jb_.position({
                    x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
                    y: 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
                });
            }
        });
}
// local comments keep fixed textarea on scrolling
function stickyLocalCommScroll(ev, el, id) {
    ev.preventDefault();
    var $el = $(el);
    var $_comm_last_child = $el.find('li.comment:last');
    var _eldktyus = $('.scomments_static_add_comm#comph_' + id);
    if($_comm_last_child.offset()
        .top + $_comm_last_child.outerHeight() < _eldktyus.offset()
        .top) _eldktyus.removeClass('__sticky');
    else _eldktyus.addClass('__sticky');
    ga('.local_minimum_comments')
        .addClass('__visible');
}
// update local comment (editing)
function localCommentUpdate($txt) {
    var comm_id = escape($txt.attr('comment_edit'));
    if(!isNumeric(comm_id)) return displayErr(lang.err_tehnic);
    else {
        _update_comment(comm_id, $txt.val());
    }
}

function sendLocalComment($txt, reply, pid, author_name, categ, community) {
    var __lc_comment = $txt.val();
    if(!$.trim(__lc_comment)) return $txt.focus();
    else {
        if($txt.attr('comment_edit')) return localCommentUpdate($txt);
        var __post_as_reply = author_name && reply == 'reply_to_reply' ? '[postReply]@' + author_name + '[/postReply][postreplyvirgula],[/postreplyvirgula]' : '';
        var pid = escape($txt.data('valtoph'));
        var r_comm_id = escape($txt.attr('data_reply_commi'));
        var send_data = {},
            reply_send_data = {};
        send_data['cmd'] = 'photoPostComment';
        send_data['type'] = 'pos';
        send_data['view_as'] = 'json';
        send_data['comment'] = __lc_comment;
        send_data['commToPhoto'] = pid;
        send_data['categ'] = categ;

        if(community) send_data['community'] = 1;

        reply_send_data['cmd'] = 'commentPostReply';
        reply_send_data['type'] = 'pos';
        reply_send_data['view_as'] = 'json';
        reply_send_data['comment'] = __post_as_reply + (author_name ? __lc_comment.replace('@' + author_name + ',', '') : __lc_comment);
        reply_send_data['commid'] = r_comm_id;
        if(reply == 'reply_to_reply') reply_send_data['reply_to_reply'] = 1;
        delete_reply_storage();
        //alert(reply + '\nAuthor name'+author_name); return;
        var random_id = new Date()
            .getTime();
        var localCommMarkup = photoViewerGetCommentsMarkup(_U.i, 1, 0, 1, 1);
        var appendLCcomm = localCommMarkup.replace(/%comment%/g, __lc_comment.replace('<', '&lt;')
                .replace('>', '&gt;')
                .replace('@' + _U.n, '')
                .replace('[postReply]', '')
                .replace('[/postReply]', ''))
            .replace('%OPK%', '__comment_posting')
            .replace(/%comment_date%/g, '')
            .replace(/%ADDED_TITLE%/g, lang.right_now)
            .replace(/%REPLY%/g, reply ? '__reply' : '')
            .replace(/%replies_count%/g, '')
            .replace(/%comm_id%/g, random_id)
            .replace(/%COMMENTS_IN%/g, 'localComms')
            .replace(/%author_id%/g, _U.i)
            .replace(/%author_name%/g, _U.n)
            .replace(/%author_photo%/g, _U.p)
            .replace(/%author_gender%/g, _U.g)
            .replace(/%likes_count%/g, 0)
            .replace(/%liked_view%/g, '')
            .replace(/%cur_default%/g, 'curDefault');
        $txt.val('')
            .focus();
        var scrollingModal = ga('.local_minimum_comments#cm_' + pid);
        var _comm_appendTo = reply ? ga('.sect_comment_static ul#cm_' + pid + ' li#comment_' + r_comm_id) : ga('.sect_comment_static ul#cm_' + pid);
        if(reply && !_comm_appendTo.find('ol')
            .length) {
            _comm_appendTo.append('<ol class="comm_replies ' + (ga('li#comment_' + r_comm_id)
                .parent()
                .prop("tagName") == 'OL' ? '__0p' : '') + '" id="repliesfor_' + r_comm_id + '"></ol>');
            _comm_appendTo = _comm_appendTo.find('.comm_replies#repliesfor_' + r_comm_id);
        } else if(reply && _comm_appendTo.find('ol')
            .length) _comm_appendTo = _comm_appendTo.find('.comm_replies#repliesfor_' + r_comm_id);
        _comm_appendTo.append(appendLCcomm)
            .find('li#comment_' + random_id + ' ._55yn')
            .removeClass('__none');
        !reply ? scrollingModal.scrollTop(scrollingModal[0].scrollHeight) : '';
        if(reply) scrollingModal.parent()
            .find('.__comm_cancel_reply')
            .trigger('click.commCancelReply');
        //$('.sect_comment_static ul#cm_'+pid).append(appendLCcomm);
        //$('.local_minimum_comments#cm_'+pid).scrollTop($('.local_minimum_comments')[0].scrollHeight);
        var send = jAjax(reply ? '/cmd.php' : '/profile', 'post', reply ? reply_send_data : send_data);
        send.done(function(d) {
            d = validateJson(d);
            var curr_lc_appended_comm = ga('.sect_comment_static ul#cm_' + pid + ' li#comment_' + random_id);
            if(d.s == '1') {
                curr_lc_appended_comm.attr('id', 'comment_' + d.comm_id)
                    .find('.comment-date')
                    .attr('title', lang.right_now)
                    .html('&crarr;');
                curr_lc_appended_comm.find('.comment-content')
                    .html(d.text.replace(/\\/g, ""));
                curr_lc_appended_comm.find('.phlayer_comm_posting_progress')
                    .addClass('__none');
            }
        });
    }
}

function buyGift(evt, f) {

    evt.preventDefault();

    var t_btn = ga(evt.target);
    var s_gift = t_btn.data('gifts');


    if(s_gift == 'no') {
        ga('.cant_buy_gift').fadeIn('fast');
        return;
    }

    ajaxLoading();
    var sendForm = js_subForm(f);
    sendForm.done(function(data) {
        removeAjaxLoad();

        if(data === '1') {
            var _current_balance = ga('.balance_c');
            _current_balance.text(parseInt(_current_balance.text()) - parseInt(ga('input[name="price"]').val()));
            // close popup box
            document.getElementById('nohook_modal_close').click();

            // show notification
            kn_liveNotif(lang.gift_succ_sent, 'done', 5000, lang.gift_send_succ_descr);

        } else {

            // show a error notification
            kn_liveNotif(lang.gift_not_sent, 'error', 5000, lang.gift_send_err);
        }


    });

}

function giftTooltip() {

    ga('.gift-item,.gift_item:not(.notooltip)').each(function(e) {

        jboxTolltip(this.id, ga(this).data('gift-tooltip'), 1);
    });

}

function giftsSlideshow(element) {
    this.el = document.querySelector(element);
    this.init();


    giftTooltip();
}

giftsSlideshow.prototype = {
    init: function() {
        this.wrapper = this.el.querySelector(".p_giftslist");
        this.slides = this.el.querySelectorAll(".gift-item");
        this.previous = this.el.querySelector(".slider-previous");
        this.next = this.el.querySelector(".slider-next");
        this.index = 0;
        this.total = this.slides.length;
        this.timer = null;

        this.action();
        this.stopStart();
    },
    _slideTo: function(slide) {
        //if(!slide)return;
        var currentSlide = this.slides[slide];

        ///currentSlide.style.zIndex = 2;
        currentSlide.style.display = '';
        currentSlide.style.opacity = 1;

        for(var i = 0; i < this.slides.length; i++) {
            var slide = this.slides[i];
            if(slide !== currentSlide) {
                ///slide.style.opacity = 0;
                ///slide.style.zIndex = 1;
                ga(slide).css('opacity', 0)
                    .on(crossEvent, function() {
                        ga(this).hide();
                    });


            }
        }


    },
    action: function() {
        var self = this;
        self.timer = setInterval(function() {
            self.index++;
            if(self.index == self.slides.length) {
                self.index = 0;
            }
            self._slideTo(self.index);

        }, 3000);
    },
    stopStart: function() {
        var self = this;
        var ev_name_space = randomIntFromInterval(5, 999);
        self.el.addEventListener("mouseover", function() {
            clearInterval(self.timer);
            self.timer = null;

        }, false);
        self.el.addEventListener("mouseout", function() {
            self.action();

        }, false);
    }


};




// accept gift
function acceptGift(evt, el, notif_id) {
    evt.preventDefault();

    el = ga(el);
    var gift_q = el.data('giftq');


    ajaxLoading();



    var send = jAjax('/cmd.php', 'post', $.param(gift_q));
    send.done(function(data) {
        removeAjaxLoad();
        if(data === '1') {

            // gift received successfully
            kn_liveNotif(lang.gift_succ_received, 'done', 5000, lang.gift_send_received_descr);

            // hide the gift from notifications
            ga('#hook_FormButton_fri_' + notif_id).trigger('click');
        } else {

            // error receive the gift
            kn_liveNotif(lang.gift_not_accept_err, 'error', 5000, lang.gift_not_accept_err_descr);
        }

    });

}

function triggPrevTxtEV(el) {
    var e = $.Event("keyup.localSendComm", {
        which: 13,
        keyCode: 13
    });
    ga(el)
        .prev()
        .trigger(e);
}

function uncheckOther(id) {

    document.getElementById(id).checked = false;

}

function photoCommentBfLayer(ev, el, load_prev, load_prev_obj) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    var $el = load_prev ? load_prev_obj.closest('.this_wall_family')
        .find('.klass_comm_wdg_p.__comments') : ga(el),
        _comm_gl_count = 0,
        is_community = (load_prev_obj ? load_prev_obj.data('community') : ga(el).data('community')) ? '&community=1' : '',
        categ = load_prev_obj ? load_prev_obj.data('categ') : ga(el).data('categ'),
        __thwlFM = $el.closest('.this_wall_family'),
        __tparentel = $el.hasClass('_in_feed') ? $el.closest('.widget-list').parent() : $el.closest('.profilephoto-wall.widgets')
        .parent(),
        pid = load_prev ? x_krypt(load_prev) : escape($el.data('thicommi')
            .match(/\d/g)
            .join(''));

    var _pwl_comments_markup = ga('<div class="sect_comment_static" onclick="event.preventDefault();evstop(event);" id="comph_' + pid + '"><ul id="cm_' + pid + '" onscroll="stickyLocalCommScroll(event,this,' + pid + ');" class="phlayer_ul_comms local_minimum_comments"></ul>' +
        '<div class="scomments_static_add_comm" id="comph_' + pid + '"><div class="flexthcn" id="al_comm_ph_' + pid + '"><img class="post_comm_rounded_avt" src="/getPhoto?p=' + _U.p + '&sz=small&g=' + _U.g + '">' +
        '<textarea data-valtoph="' + pid + '" placeholder="' + lang.Write + '..." class="post_comm_inp_txtarea"></textarea><button onclick="triggPrevTxtEV(this);" class="btn_local_comms_send button-pro">+</button>' +
        '</div></div></div>');

    if(!load_prev) $el.addClass('__loading');
    else load_prev_obj.remove();

    var previous_comments_button_markup = '<div class="comm_previous_load" onclick="return _comments_loadPrev(this,event,\'localComms\');" data-categ="' + categ + '" ' + (is_community ? "data-community" : "") + ' data-loadcommentsforphi="' + o_krypt(pid) + '" data-loadmorecomentsin="%QTG%"><i class="ic ic-prev-comments"></i><span>View %C previous comments</span></div>';
    var previous_replies_button_markup = '<div class="comment_previous_replies_btn" data-rreply="%rr%" onclick="return commShowPrevReplies(this,event);">+<a href="javascript:;">%c replies</a></div>';
    var send = jAjax('/cmd.php', 'post', 'cmd=' + (load_prev ? 'selectPrevMinCommentsForPhoto' : 'selectMinCommentsForPhoto') + is_community + '&categ=' + categ + '&photo=' + (load_prev ? load_prev : o_krypt(pid)));
    send.done(function(data) {
        ajaxLoading();
        var checkAllowComment = jAjax('/cmd.php', 'post', {
            cmd: 'allowCommentOnPhoto',
            photoid: pid
        });
        checkAllowComment.done(function(r) {
            removeAjaxLoad();
            if(!r) {

                _pwl_comments_markup.find('#al_comm_ph_' + pid).replaceWith('<div class="localcomm_not_allow_comment"><span>' + lang.addusertofriendstoleavecomments + '</span></div>');
            }

        });

        var d = validateJson(data);
        //if(d.s == 0) return; // no comments
        var comm_count = d.comments_count;
        var comm_data = d.comm_data;
        // maximize content for smallest objects
        var _yPhoW = __thwlFM.width(),
            _yPhAddW = 0,
            is_cov_cont = __thwlFM.hasClass('thumb') ? 'cover' : 'contain';
        switch (true) {
            case _yPhoW < 230 && _yPhoW > 200:
                _yPhAddW = 80;
                break;
            case _yPhoW < 200 && _yPhoW > 180:
                _yPhAddW = 100;
                break;
            case _yPhoW < 180 && _yPhoW > 160:
                _yPhAddW = 120;
                break;
            case _yPhoW < 160 && _yPhoW > 140:
                _yPhAddW = 150;
                break;
            case _yPhoW < 140 && _yPhoW > 120:
                _yPhAddW = 170;
                break;
            case _yPhoW < 120 && _yPhoW > 100:
                _yPhAddW = 190;
                break;
            case _yPhoW < 100 && _yPhoW > 80:
                _yPhAddW = 210;
                break;
            case _yPhoW < 80:
                _yPhAddW = 230;
                break;
        }
        if(_yPhAddW > 0 && !__thwlFM.hasClass('thumb')) {
            __thwlFM.addClass('customWidth')
                .attr({
                    'data-defaultstyle': __thwlFM.attr('style'),
                    'data-customwadd': _yPhAddW
                })
                .css({
                    width: '+=' + _yPhAddW,
                    'margin-left': '-' + (_yPhAddW / 2) + 'px'
                });
        }
        if(__thwlFM.hasClass('micro') && !load_prev) {
            __thwlFM.parent()
                .addClass('__active_comm');
            __thwlFM.css({
                'background-image': 'url(' + (__thwlFM.find('img')
                    .attr('src')
                    .replace('thumb', 'medium')) + ')',
                'background-repeat': 'no-repeat',
                'background-size': is_cov_cont,
                'background-color': '#333',
                'background-position': '50%'
            });
            __thwlFM.find('img:first')
                .hide();
            if(!__thwlFM.hasClass('noclone')) {
                __thwlFM.parent()
                    .before('<div class="__ect_item_clone _' + pid + '"></div>');

                var cloned_position = ga('.__ect_item_clone._' + pid).position();
                __thwlFM.parent().css({
                    'left': cloned_position.left,
                    'top': cloned_position.top
                });

            }
            var localCommsOpenPhotoViewer = function(e, $this) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.off('click.openPhotoViewerByTriggerA');
                setTimeout(function() {
                    $this.on('click.openPhotoViewerByTriggerA', function(e) {
                        localCommsOpenPhotoViewer(e, $this);
                    });
                }, 1000);
                return $this.find("a:first")
                    .trigger("click");
            };
            __thwlFM.off('click.openPhotoViewerByTriggerA')
                .on('click.openPhotoViewerByTriggerA', function(e) {
                    localCommsOpenPhotoViewer(e, $(this));
                });
        }
        $el.removeClass('__loading');
        ga('.this_wall_family')
            .addClass('__3opac');
        if(!__thwlFM.find('.close_x_right_btn')
            .length) __thwlFM.prepend('<div class="localComms_reposit_close_ic"><div class="close_x_right_btn" title="' + lang.Close + '"></div></div>')
            .find('.close_x_right_btn')
            .off('click.closeLocalComms')
            .on('click.closeLocalComms', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                if(__thwlFM.hasClass('customWidth')) {
                    __thwlFM.attr('style', __thwlFM.data('defaultstyle')); //width(__thwlFM.data('defaultwidth'));
                    __thwlFM.removeAttr('data-defaultstyle data-customwadd')
                        .removeClass('customWidth');
                }
                __thwlFM.removeClass('__active')
                    .find('.localComms_reposit_close_ic')
                    .remove();
                __thwlFM.find('.sect_comment_static')
                    .remove();
                if(!ga('body .this_wall_family.__active')
                    .length) $('.this_wall_family')
                    .removeClass('__3opac');
                if(__thwlFM.hasClass('micro') && !load_prev) {
                    __thwlFM.parent()
                        .removeClass('__active_comm'); //.removeAttr('style');
                    //__thwlFM.removeAttr('style');
                    __thwlFM.find('img:first')
                        .show();
                    ga('.__ect_item_clone._' + pid)
                        .remove();
                    __thwlFM.off('click');
                }
            });
        if(!__tparentel.find('.sect_comment_static')
            .length) {
            __tparentel.addClass('__active')
                .append(_pwl_comments_markup)
                .find('textarea')
                .css('max-width', ga(el)
                    .closest('.this_wall_family')
                    .width() - 68)
                .off('keyup.localSendComm')
                .on('keyup.localSendComm', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    if(e.keyCode == 13) {
                        return sendLocalComment($this, $this.attr('data-comm-reply'), pid, $this.attr('replyauthorname'), categ, is_community ? 1 : 0);
                    }
                })
                .focus();
        }
        /*var _unvda = load_prev ? __thwlFM : __tparentel;
        var _aunvda = load_prev ? '1' : '2';
        alert(_aunvda);
        alert(pid);
        var _thOL_COMMS = _unvda.find('.sect_comment_static#comph_' + pid + ' ul');
        if(_aunvda == '1') { console.log(__thwlFM);   _thOL_COMMS.remove();}*/
        var _thOL_COMMS = ga('.sect_comment_static#comph_' + pid + ' ul');

        var _get_last_comment_id = _thOL_COMMS.find('li:first').attr('id');

        //alert(_thOL_COMMS.length);
        if(typeof comm_data != 'undefined' && d.s != 0) {
            for(var i = 0; i < comm_data.length; i++) {
                var data_comm = comm_data[i];
                var reply_comm_d = data_comm.replies;
                _comm_gl_count = data_comm.comments_count;
                var phlayer_comments_ready = photoViewerGetCommentsMarkup(data_comm.author_id, data_comm.allow_edit, data_comm.updated, data_comm.can_be_edited)
                    .replace('%OPK%', '')
                    .replace(/%DISPLAY%/g, '')
                    .replace(/%comm_id%/g, data_comm.id)
                    .replace(/%comment_date%/g, data_comm.added)
                    .replace(/%comment%/g, data_comm.text)
                    .replace(/%COMMENTS_IN%/g, 'localComms')
                    .replace(/%ADDED_TITLE%/g, data_comm.long_time_ag)
                    .replace(/%REPLY%/g, '')
                    .replace(/%EDITED_AT%/g, lang.comm_edited_at + data_comm.updated)
                    .replace(/%author_id%/g, data_comm.author_id)
                    .replace(/%author_name%/g, data_comm.author_name)
                    .replace(/%author_photo%/g, data_comm.author_img)
                    .replace(/%author_gender%/g, data_comm.author_gender)
                    .replace(/%replies_count%/g, data_comm.replies_count)
                    .replace(/%reply_view%/g, data_comm.replied_by_me ? '__replied' : (data_comm.replies_count > 0 ? '__count_replies' : ''))
                    .replace(/%likes_count%/g, data_comm.comm_likes_count)
                    .replace(/%liked_view%/g, data_comm.liked_by_me ? '__liked' : (data_comm.comm_likes_count > 0 ? '__count_like' : ''))
                    .replace(/%cur_default%/g, data_comm.liked_by_me || data_comm.author_id === _U.i ? 'curDefault' : '');
                _thOL_COMMS.prepend(phlayer_comments_ready);
                // Replies
                if(reply_comm_d.length) {
                    var __appended_Comm = _thOL_COMMS.find('li#comment_' + data_comm.id);
                    if(!__appended_Comm.find('ol.comm_replies#repliesfor_' + data_comm.id)
                        .length) __appended_Comm.append('<ol class="comm_replies" id="repliesfor_' + data_comm.id + '"></ol>');
                    for(var k = 0; k < reply_comm_d.length; k++) {
                        var reply_comm = reply_comm_d[k];
                        var reply_of_reply_arr = reply_comm.r_of_reply;
                        // replies
                        var phlayer_replies_ready = photoViewerGetCommentsMarkup(reply_comm.r_author_id, reply_comm.r_allow_edit, reply_comm.r_updated, reply_comm.r_can_be_edited)
                            .replace('%OPK%', '')
                            .replace(/%DISPLAY%/g, k > _st.replies_limit - 1 ? 'hidden' : '')
                            .replace(/%comm_id%/g, reply_comm.r_id)
                            .replace(/%comment_date%/g, reply_comm.r_added)
                            .replace(/%comment%/g, reply_comm.r_text)
                            .replace(/%ADDED_TITLE%/g, reply_comm.r_long_time_ag)
                            .replace(/%EDITED_AT%/g, lang.comm_edited_at + reply_comm.r_updated)
                            .replace(/%COMMENTS_IN%/g, 'localComms')
                            .replace(/%author_id%/g, reply_comm.r_author_id)
                            .replace(/%author_name%/g, reply_comm.r_author_name)
                            .replace(/%author_photo%/g, reply_comm.r_author_img)
                            .replace(/%author_gender%/g, reply_comm.r_author_gender)
                            .replace(/%REPLY%/g, '__reply')
                            .replace(/%replies_count%/g, reply_comm.r_replies_count)
                            .replace(/%likes_count%/g, reply_comm.r_comm_likes_count)
                            .replace(/%liked_view%/g, reply_comm.r_liked_by_me ? '__liked' : (reply_comm.r_comm_likes_count > 0 ? '__count_like' : ''))
                            .replace(/%cur_default%/g, reply_comm.r_liked_by_me || reply_comm.r_author_id === _U.i ? 'curDefault' : '');
                        var reply_markup = __appended_Comm.find('ol.comm_replies#repliesfor_' + data_comm.id)
                            .prepend(phlayer_replies_ready)
                            .find('li#comment_' + reply_comm.r_id);
                        // add button show more replies
                        if(k > _st.replies_limit - 1 && reply_comm_d.length - 1 === k) __appended_Comm.find('ol.comm_replies#repliesfor_' + data_comm.id)
                            .prepend(previous_replies_button_markup.replace(/%c/g, k - (_st.replies_limit - 1))
                                .replace(/%rr%/g, '0'));
                        // Reply of replies
                        if(reply_of_reply_arr.length) {
                            if(!reply_markup.find('ol.comm_replies#repliesfor_' + reply_comm.r_id)
                                .length) reply_markup.append('<ol class="comm_replies __0p" id="repliesfor_' + reply_comm.r_id + '"></ol>');
                            for(var j = 0; j < reply_of_reply_arr.length; j++) {
                                var reply_of_reply = reply_of_reply_arr[j];
                                // reply of reply
                                var phlayer_reply_of_reply_ready = photoViewerGetCommentsMarkup(reply_of_reply.r_author_id, reply_of_reply.r_allow_edit, reply_of_reply.r_updated, reply_of_reply.r_can_be_edited)
                                    .replace('%OPK%', '')
                                    .replace(/%DISPLAY%/g, 'hidden') ///j > _st.replies_limit-1 ? 'hidden' : '')
                                    .replace(/%comm_id%/g, reply_of_reply.r_id)
                                    .replace(/%comment_date%/g, reply_of_reply.r_added)
                                    .replace(/%comment%/g, reply_of_reply.r_text)
                                    .replace(/%ADDED_TITLE%/g, reply_of_reply.r_long_time_ag)
                                    .replace(/%COMMENTS_IN%/g, 'localComms')
                                    .replace(/%EDITED_AT%/g, lang.comm_edited_at + reply_of_reply.r_updated)
                                    .replace(/%author_id%/g, reply_of_reply.r_author_id)
                                    .replace(/%author_name%/g, reply_of_reply.r_author_name)
                                    .replace(/%author_photo%/g, reply_of_reply.r_author_img)
                                    .replace(/%author_gender%/g, reply_of_reply.r_author_gender)
                                    .replace(/%REPLY%/g, '__reply_for_reply')
                                    .replace(/%replies_count%/g, '')
                                    .replace(/%likes_count%/g, reply_of_reply.r_comm_likes_count)
                                    .replace(/%liked_view%/g, reply_of_reply.r_liked_by_me ? '__liked' : (reply_of_reply.r_comm_likes_count > 0 ? '__count_like' : ''))
                                    .replace(/%cur_default%/g, reply_of_reply.r_liked_by_me || reply_of_reply.r_author_id === _U.i ? 'curDefault' : '');
                                ///$('#repliesfor_'+reply_comm.r_id).prepend(phlayer_reply_of_reply_ready);
                                reply_markup.find('.comm_replies#repliesfor_' + reply_comm.r_id)
                                    .prepend(phlayer_reply_of_reply_ready);
                                if(reply_of_reply_arr.length - 1 === j) reply_markup.find('.comm_replies#repliesfor_' + reply_comm.r_id)
                                    .prepend(previous_replies_button_markup.replace(/%c/g, reply_of_reply_arr.length)
                                        .replace(/%rr%/g, '1'));
                            }
                        }
                    }
                }
            }

            // previous comments button
            if(!_thOL_COMMS.closest('ul')
                .find('.comm_previous_load')
                .length && _comm_gl_count > _st.phlayer_comments_limit && !load_prev) _thOL_COMMS.closest('ul')
                .prepend(previous_comments_button_markup.replace(/%C/g, parseInt(_comm_gl_count - 5))
                    .replace(/%QTG%/g, 'localComms'));
            if(!load_prev) {
                // make resizable
                setTimeout(function() {
                    __tparentel.find('.sect_comment_static')
                        .resizable({
                            /*
                            							maxHeight: _thOL_COMMS.hasScrollBar() ? _thOL_COMMS[0].scrollHeight + 50 : _thOL_COMMS.parent()
                            								.height() + 10,
                            							maxWidth: _thOL_COMMS.closest('.this_wall_family')
                            								.width() < 180 ? '400' : _thOL_COMMS.parent()
                            								.width(),
                            							
                            							*/
                            minHeight: __tparentel.find('.sect_comment_static')
                                .height(),
                            minWidth: __tparentel.find('.sect_comment_static')
                                .width(),
                            maxWidth: _thOL_COMMS.parent()
                                .width(),
                            maxHeight: 500,
                            start: function(event, ui) {
                                _thOL_COMMS.css('max-height', '100%');
                            }, //.scrollTop(_thOL_COMMS.prop('scrollHeight')); },
                            stop: function(event, ui) {
                                _thOL_COMMS.trigger('scroll');
                            },
                            resize: function() {
                                _thOL_COMMS.parent()
                                    .find('textarea')
                                    .css('max-width', _thOL_COMMS.parent()
                                        .width() - 90);
                            },
                            alsoResize: _thOL_COMMS
                        });
                }, 500);
                _thOL_COMMS.scrollTop(_thOL_COMMS[0].scrollHeight);
            } else
            // keep the scroll to the last comment
            {
                //alert( Math.abs(ga('#'+_get_last_comment_id).offset().top - ga(window).height()) );
                //	_thOL_COMMS.scrollTop( Math.abs(ga('#'+_get_last_comment_id).offset().top - ga(window).height()) );
                //_thOL_COMMS.scrollTo('#'+_get_last_comment_id);
            }
        }
    });
}
// grades on scroll, load more data
function gradesOnscroll(el, ev) {
    ev.preventDefault();
    var $el = ga(el);
    if($el.hasScrollBar()) {
        if($el.height() + $el.scrollTop() >= $el[0].scrollHeight - 10) {
            $el.find('[data-loadd]')
                .trigger('click');
        }
    }
}
// build months
function getMonthsDays(uday) {
    var m = '';
    for(var i = 1; i < 32; i++) m += '<option ' + (uday == i ? 'selected="selected"' : '') + ' value="' + i + '">' + i + '</option>';
    return m;
}
// build years
function getYears(uyear) {
    var y = '';
    for(var i = 1925; i < cur_year - 15; i++) y += '<option ' + (uyear == i ? 'selected="selected"' : '') + ' value="' + i + '">' + i + '</option>';
    return y;
}
//get 12 months
function getMonths(uMonths) {
    return '<option ' + (uMonths == 1 ? 'selected="selected"' : '') + ' value="1">' + lang.january + '</option>\
                                <option ' + (uMonths == 2 ? 'selected="selected"' : '') + ' value="2">' + lang.february + '</option>\
                                <option ' + (uMonths == 3 ? 'selected="selected"' : '') + ' value="3">' + lang.march + '</option>\
                                <option ' + (uMonths == 4 ? 'selected="selected"' : '') + ' value="4">' + lang.april + '</option>\
                                <option ' + (uMonths == 5 ? 'selected="selected"' : '') + ' value="5">' + lang.may + '</option>\
                                <option ' + (uMonths == 6 ? 'selected="selected"' : '') + ' value="6">' + lang.june + '</option>\
                                <option ' + (uMonths == 7 ? 'selected="selected"' : '') + ' value="7">' + lang.july + '</option>\
                                <option ' + (uMonths == 8 ? 'selected="selected"' : '') + ' value="8">' + lang.august + '</option>\
                                <option ' + (uMonths == 9 ? 'selected="selected"' : '') + ' value="9">' + lang.september + '</option>\
                                <option ' + (uMonths == 10 ? 'selected="selected"' : '') + ' value="10">' + lang.october + '</option>\
                                <option ' + (uMonths == 11 ? 'selected="selected"' : '') + ' value="11">' + lang.november + '</option>\
                                <option ' + (uMonths == 12 ? 'selected="selected"' : '') + ' value="12">' + lang.december + '</option>';
}

function savePersonalInformationForm(e, f) {
    e.preventDefault();
    var field_bday = ga("#field_bday"),
        field_bmonth = ga("#field_bmonth"),
        field_byear = ga("#field_byear");
    var field_location = ga("#stfr_location"),
        field_location_approved = ga("#location_selected_from_list");
    if(!$.trim(field_bday.val()) || !$.trim(field_bmonth.val()) || !$.trim(field_byear.val())) return updInfoErr('.__bd', lang.pleaseSelectYourBirthDate);
    else if(!$.trim(field_location.val()) || !$.trim(ga('#location_id').val()))
        return updInfoErr(field_location, lang.pleaseEnterYourCountry);

    ajaxLoading();
    var sendForm = js_subForm(f);
    sendForm.done(function(data) {
        removeAjaxLoad();
        if(data == 2) return updInfoErr(field_location, lang.pleaseEnterACountryFromDropDownList);
        //else if (data == 3) return updInfoErr(field_location, lang.pleaseEnterACityFromDropDownList);
        else if(data == 4) return kn_liveNotif(lang.err_update_uname, 'warn', 6000, lang.err_update_uname_descr);
        else if(data == 5) return kn_liveNotif(lang.err_update_surname, 'warn', 6000, lang.err_update_surname_descr);
        else if(data == 6) return kn_liveNotif(lang.err_surname_is_same_as_name, 'warn', 6000, lang.err_surname_is_same_as_name_descr);
        else if(data == 1) {
            if(localStorage.getItem('pinfoUpd')) {
                ga('#update_birthday')
                    .text(ga('#hidden_fUpd_M')
                        .val() + ' ' + ga('#hidden_fUpd_D')
                        .val() + ' ' + ga('#hidden_fUpd_Y')
                        .val());
                localStorage.removeItem('pinfoUpd');
            }
            ga('#user_location')
                .text(field_location
                    .val());

            ga('#cancel_stPI_form')
                .trigger('click');
            updInfoErr('.__bd', null, 1);
            updInfoErr(field_location, null, 1);
        } else return displayErr(lang.err_tehnic);
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function saveMail(e, f) {
    e.preventDefault();

    var mail_inp = f.find('#mail_update'),
        pass_m_inp = f.find('#em_curr_pass');
    if(!$.trim(mail_inp.val()) || !validateEmail(mail_inp.val())) return updInfoErr(mail_inp, lang.pleaseEnterAValidEmail);
    else if(!$.trim(pass_m_inp.val())) return updInfoErr(pass_m_inp, lang.pleaseEnterYourPassword);
    ajaxLoading();
    var sendForm = js_subForm(f);
    sendForm.done(function(data) {
        removeAjaxLoad();
        if(data == 2) return updInfoErr(mail_inp, lang.pleaseEnterAValidEmail);
        else if(data == 5) return updInfoErr(mail_inp, lang.thisIsYourCurrentlyEmail);
        else if(data == 3) return updInfoErr(mail_inp, lang.emailIsAlreadyInUse);
        else if(data == 4) return updInfoErr(pass_m_inp, lang.incorrectPass);
        else if(data == 1) { // success
            $('#curr_email_div')
                .text(mail_inp.val());
            pass_m_inp.val('');
            updInfoErr(pass_m_inp, null, 1);
            updInfoErr(mail_inp, null, 1);
            window.location = '/?logme=passChanged';
        } else return displayErr(lang.err_tehnic);
    });
}

function updateNewPassword(e, f) {
    e.preventDefault();
    var old_pass_input = $('#pass_update'),
        new_pass_input = $('#newpass_update'),
        re_pass_input = $('#repass_update');
    if(!$.trim(old_pass_input.val())) return updInfoErr(old_pass_input, lang.pleaseEnterYourPassword);
    else if(!$.trim(new_pass_input.val())) return updInfoErr(new_pass_input, lang.pleaseChooseANewPassword);
    else if(!$.trim(re_pass_input.val())) return updInfoErr(re_pass_input, lang.passDontMatch);
    else if(re_pass_input.val() !== new_pass_input.val()) return updInfoErr(re_pass_input, lang.passDontMatch);
    else if(new_pass_input.val()
        .length < 6) return updInfoErr(new_pass_input, lang.newPasswordIsTooShort);
    ajaxLoading();
    var sendForm = js_subForm(f);
    sendForm.done(function(data) {
        removeAjaxLoad();
        if(data == 2) return updInfoErr(old_pass_input, lang.yourOldPassIsIncorrect);
        else if(data == 3) return updInfoErr(new_pass_input, lang.newPasswordIsTooShort);
        else if(data == 4) return updInfoErr(re_pass_input, lang.passDontMatch);
        else if(data == 1) {
            $('#pass_update,#newpass_update,#repass_update')
                .val('');
            updInfoErr(old_pass_input, null, 1);
            updInfoErr(new_pass_input, null, 1);
            updInfoErr(re_pass_input, null, 1);
            $('#block3_cancel_stPI_form')
                .trigger('click');
            setTimeout(function() {
                window.location = '/?logme=passChanged';
            }, 10);
        } else return displayErr(lang.err_tehnic);
    });
}

function updInfoErr($el, $str, a) {
    var $EL = $el;
    var $el = typeof $el == 'string' ? $($el) : $el;
    if(typeof $EL == 'string') {
        $el.hide()
            .empty();
        if(!a) $el.show()
            .html($str);
        else $el.hide()
            .empty();
        return;
    }
    $el.closest('section')
        .find('.input-e')
        .hide()
        .empty();
    if(!a) $el.focus()
        .parent()
        .parent()
        .find('.input-e')
        .show()
        .html($str);
    else $el.parent()
        .parent()
        .find('.input-e')
        .hide()
        .empty();
}

function confirmSmsCode(code, clbk) {


    if(!ga('#usettings_confirm_sms_code').length) {

        ga('body').prepend('<section id="usettings_confirm_sms_code"><div class="layer_ovr"></div>\<div class="confirm_sms_code_box">' +
            '<h3>' + lang.enter_your_secret_code_4_digits + '</h3><input autocomplete="off" onkeyup="ga(\'#secret_code_invalid_err\').hide();" maxlength="4" id="secret-code-input" placeholder="----" class="secret_code_class" type="text" value="" />' +
            '<div id="secret_code_invalid_err" class="update_phone_number_err __none">' + lang.incorect_secret_code + '</div>' +
            '<div class="confirm-sms_code_btm_btns">' +
            '<button class="flat_button" id="secret_code_popup_confirm">' + lang.Confirm + '</button>' +
            '<button class="flat_button secondary" id="cancelbtn" onclick="ga(\'#usettings_confirm_sms_code\').remove();">' + lang.Cancel + '</button>' +
            '</div></div>' +
            '</section>');
        ga('#secret_code_popup_confirm').on('click', function(e) {

            if(ga('#secret-code-input').val() != code) {
                ga('#secret_code_invalid_err').show();
                clbk(false);
            } else {
                ga('#usettings_confirm_sms_code').remove();
                clbk(true);

            }

        });
    }

}

function savePhone(e, f) {
    e.preventDefault();
    var phoneInput = ga('#js_phone_number');
    var currPass = ga('#p_stfr_must_pass');


    if(!validatePhoneNumber(trim(phoneInput)) || !trim(phoneInput)) {
        return updInfoErr(phoneInput, lang.sg_invalid_phone);
    } else if(!$.trim(currPass.val())) {
        return updInfoErr(currPass, lang.pleaseEnterYourPassword);
    } else if($.trim(phoneInput.val())) {
        updInfoErr(phoneInput, null, 1);
        ajaxLoading();
        var sendForm = js_subForm(f);
        sendForm.done(function(r) {
            removeAjaxLoad();
            var data = validateJson(r);


            if(data.status == 'error' && data.msg == '2') return updInfoErr(currPass, lang.incorrectPass);
            if(data.status == 'error' && data.msg == '3') return updInfoErr(currPass, lang.sg_phone_in_use);
            if($.trim($('#js_phone_number')
                    .val()) && data.status == 'success') {



                confirmSmsCode(data.code, function(res) {


                    if(res) {

                        var send = jAjax('/cmd.php', 'post', {
                            'cmd': 'user-settings-update-phone',
                            'phone': escape(ga('#js_phone_number').val())
                        });
                        send.done(function(d) {

                            if(d == 1) {
                                ga('#updated_phone')
                                    .removeAttr('style')
                                    .text(ga('#js_phone_number')
                                        .val());
                                ga('#block2_cancel_stPI_form')
                                    .trigger('click');
                                currPass.val('');
                                updInfoErr(currPass, null, 1);
                            } else {
                                return displayErr(lang.err_tehnic);
                            }
                        });


                    } else
                        return;
                });




            } else
                return updInfoErr(currPass, '[' + data.status + ']&nbsp;' + data.msg);
        });
    }
}

function saveNickName(e, f) {
    e.preventDefault();
    var nickInput = $('#nickname_update');
    var currPass = $('#stfr_must_pass');
    if(!$.trim(nickInput.val()) || wSpace(nickInput.val()) || /^\d+$/.test(nickInput.val())) {
        return updInfoErr(nickInput, lang.pleaseEnterAvalidNickName);
    } else if(!$.trim(currPass.val())) {
        return updInfoErr(currPass, lang.pleaseEnterYourPassword);
    } else if($.trim(nickInput.val())) {
        updInfoErr(nickInput, null, 1);
        ajaxLoading();
        var sendForm = js_subForm(f);
        sendForm.done(function(data) {
            removeAjaxLoad();
            if(data == 2) return updInfoErr(currPass, lang.incorrectPass);
            if($.trim($('#nickname_update')
                    .val()) && data == 1) {
                $('#updated_nickname')
                    .removeAttr('style')
                    .text($('#nickname_update')
                        .val());
                $('#block2_cancel_stPI_form')
                    .trigger('click');
                currPass.val('');
                updInfoErr(currPass, null, 1);
            } else return displayErr(lang.err_tehnic);
        });
    }
}
// slide up current opened settings tab
function slideUpSettingsTab(el, ev) {
    ev.preventDefault();
    var $el = $(el);
    var pSect = $el.closest('section');
    var aActHr = $el.closest('[data-stcateg]');
    aActHr.removeClass('__active')
        .find('.user-settings_i_lk')
        .fadeIn();
    pSect.slideUp();
}

function updateNewBirthDayInput(el, ev, a) {
    var $el = $(el);
    switch (a) {
        case 'day':
            $('#hidden_fUpd_D')
                .val($(el)
                    .val());
            break;
        case 'month':
            $('#hidden_fUpd_M')
                .val($(el)
                    .find('option[value="' + $(el)
                        .val() + '"]')
                    .text());
            break;
        case 'year':
            $('#hidden_fUpd_Y')
                .val($(el)
                    .val());
            break;
    }
    localStorage.setItem('pinfoUpd', 1);
}

function translate_str(evt, el) {

    evt.preventDefault();
    el = ga(el);
    var str_txt = el.find('[rel="str_text"]').text();
    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'translate_str',
        'str_text': str_txt
    });

    send.done(function(data) {

        if(data) {
            var tr_txt_container = el.closest('.div_str_translate');
            tr_txt_container.addClass('_translated');
            tr_txt_container.find('.tr_output').removeClass('__none').text(data).addClass('_replies__highlight');
            tr_txt_container.find('a.a_str_translate').removeAttr('onclick').addClass('curDefault').css('color', '#919798');
        } else {

            displayErr(lang.somethingWrong);
        }

    });

}

function inputPhone() {

    var p_input = ga(".phone-input");

    if(p_input.length) {
        p_input.each(function() {

            var _this = ga(this);
            var my_country_code = $.trim(_this.data('user-country')) != '' ? _this.data('user-country') : false;
            var el_pl = _this.intlTelInput({
                // allowDropdown: false,
                 autoHideDialCode: false,
                 autoPlaceholder: "on",
                // dropdownContainer: "body",
                // excludeCountries: ["us"],
                 formatOnDisplay: false,
                // geoIpLookup: function(callback) {
                //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                //     var countryCode = (resp && resp.country) ? resp.country : "";
                //     callback(countryCode);
                //   });
                // },
                //  hiddenInput: "js_phone_number",
                initialCountry: my_country_code ? my_country_code : 'us',
                nationalMode: true,
                // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
                 placeholderNumberType: "MOBILE",
                preferredCountries: my_country_code ? [my_country_code] : ['nl', 'ru', 'us', 'gb'],
                 separateDialCode: true,
                // utilsScript: "build/js/utils.js"
            });
            _this.on('blur', function() {



                var getDialCode = _this.intlTelInput("getSelectedCountryData");
                var p_number = getDialCode.dialCode + _this.val();
                ga('#js_phone_number').val(p_number);

                if(!validatePhoneNumber(p_number)) {
 
                    _this.css('border-color', 'red');
                } else _this.removeAttr('style');
            });

        });

    }


}
/*
function getSecretCode(mode,key){
	alert(key+'--'+mode)

	var send = jAjax('/cmd.php','post',{'cmd':'getsecretcode','by':mode, 'k':escape(key)});
	send.done(function(d){
		alert(d);
		ga('#get-secret-code-cnt').html(d);
		
		setTimeout(function(){
	ga(document).off('selectmenuchange.se').on( "selectmenuchange.se", '#select_mode', function( ev, ui ) { 
		 
		 var _val = $.trim(ui.item.value);
		getSecretCode( _val,key );
 
	});
		},1000);
	});
}
*/
function confirmSecretCode(mode) {
    ajaxLoading();
    var _error = ga('#error');
    var code = $.trim(ga('#secret-code-input').val());
    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'confirm-secret-code',
        'code': escape(code),
        'mode': mode
    });
    send.done(function(d) {
        removeAjaxLoad();
        var r = validateJson(d);

        if(r.status == 'ok' && r.msg == 'activate_account') {
            _error.empty();
            window.location = '/?user=' + r.login_username;
            kn_liveNotif(lang.your_account_has_been_activated_title_notif, 'done', 6000, lang.your_account_has_been_activated_descr_notif);

        } else if(r.status == 'ok' && r.msg == 'restore-password') {
            _error.empty();
            window.location = '/changepass/' + r.login_username + '/' + r.new_code;
        } else {



            _error.html('<div class="msg ferror"><div class="msg_text"><b>' + lang.Error + '</b><br/>' + r.msg + '</div></div>');
        }


    });


}

function getSecretCode(via, mode) {

    var _error = ga('#error');
    var $to = escape(ga('#scode_input').val());
    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', {
        'cmd': 'get-secret-code',
        'via': via,
        'mode': mode,
        'to': $to
    });
    send.done(function(r) {
        removeAjaxLoad();

        var d = validateJson(r);

        if(d.status == 'success') {
            var _a_location = ga('<a/>').attr({
                'hrefattr': 'true',
                'href': '/confirmcode/' + via + '/' + $to + '/'
            });

            ga('#confirm-secret-code').html(_a_location);
            up_href();

            _a_location.trigger('click');



        } else if(d.status == 'error') {

            _error.html(d.msg);

        } else {
            _error.html(lang.err_tehnic);
        }


    });


}
(function($) {
    $.fn.innerText = function(msg) {
        if(msg) {
            if(document.body.innerText) {
                for(var i in this) {
                    this[i].innerText = msg;
                }
            } else {
                for(var i in this) {
                    this[i].innerHTML.replace(/&amp;lt;br&amp;gt;/gi, "n").replace(/(&amp;lt;([^&amp;gt;]+)&amp;gt;)/gi, "");
                }
            }
            return this;
        } else {
            if(document.body.innerText) {
                return this[0].innerText;
            } else {
                return this[0].innerHTML.replace(/&amp;lt;br&amp;gt;/gi, "n").replace(/(&amp;lt;([^&amp;gt;]+)&amp;gt;)/gi, "");
            }
        }
    };
})(jQuery);

function validatePhoneNumber(str) {
    var valid = /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){6,45}$/im.test(str);
 
    return valid;
}

function tonum(str) {

    return str.match(/\d/g).join('');
}

function selectThisLocation(evt) {

    //evt.preventDefault();

    var el = ga(evt.target);
    var location_val = el.parent().data('location-name');
    var location_id = el.parent().attr('id');
    ga('.getuserlocation').val(location_val);
    ga('#location_id').val(location_id);
    el.closest('ul').slideUp();

    if(ga('#location_selected_from_list').length)
        el.closest('section#google_found_locations').find('#location_selected_from_list').val(1).addClass('yes').removeClass('no');

}

function getUserLocation() {

    var need_user_country = ga('[rel="getusercountry"]');


    if(need_user_country.length) {



        need_user_country.each(function() {
            var $this = ga(this);
            var user_id = ga(this).attr('id');
            user_id = tonum(user_id);

            if(saved_location.hasOwnProperty(user_id)) {

                $this.replaceWith(saved_location[user_id]);
            } else {

                need_user_country.html('<span class="div-loader"></span>');
                var send = jAjax('/cmd.php', 'post', {
                    'cmd': 'getThisUserLocationLeaflet',
                    'user_id': escape(user_id)
                });

                send.done(function(location) {


                    saved_location[user_id] = location;


                    $this.replaceWith(location);

                });




            }

        });



    }



}

function wSpace(s) {
    return /\s/g.test(s);
}
$.ui.autocomplete.filter = function(a, b) {
    var g = new RegExp($.ui.autocomplete.escapeRegex(b), "i");
    return $.grep(a, function(c) {
        return g.test(c.value || c)
    })
}
// autocomplete countries
function countryAutoComplete(el) {
    var $el = $(el);
    var getCountriesArr = new Array();
    var ggCountries = validateJson(__glb_countries);
    for(var a = 0; a < ggCountries.length; ++a) getCountriesArr.push({
        "id": ggCountries[a].id,
        "code": ggCountries[a].code,
        "value": ggCountries[a].name,
        "label": ggCountries[a].name
    });
    $el.removeAttr('onfocus')
        .off('keypress')
        .on('keypress', function() {
            $("#stfr_city,#reg_city")
                .addClass('__disabled');
        })
        .autocomplete({
            minLength: 0,
            html: true,
            source: getCountriesArr,
            autoFocus: true,
            focus: function(event, ui) {
                //$( "#stfr_country" ).attr('country-id',ui.item.id);
                update_states_arr = new Array();
                var ggStates = validateJson(__glb_states);
                for(var b = 0; b < ggStates[ui.item.id].length; ++b) update_states_arr.push({
                    "id": ggStates[ui.item.id][b].id,
                    "label": ggStates[ui.item.id][b].name
                });
                console.log(ggStates);
                return false;
            },
            select: function(event, ui) {
                var customE = $.Event("keydown", {
                    which: 8,
                    keyCode: 8
                });
                ga("#stfr_country,#reg_country")
                    .val(ui.item.label);
                ga("#real_country")
                    .val(ui.item.id);
                ga("#stfr_city,#reg_city")
                    .removeClass('__disabled')
                    .val('')
                    .focus()
                    .trigger(customE);
                return false;
            }
        })
        .data("ui-autocomplete")
        ._renderItem = (function(ul, item) {
            return ga("<li></li>")
                .data("item.autocomplete", item)
                .append('<span>' + item.label + '</span><span class="autocomplete_c_code">' + item.code + '</span>')
                .appendTo(ul);
        });
}
// autocomplete states
function statesAutoComplete(el) {
    var $el = $(el);
    $el.autocomplete({
        minLength: -1,
        autoFocus: true,
        source: update_states_arr,
        select: function(event, ui) {
            $("#real_city")
                .val(ui.item.id);
        }
    });
}
// edit personal information
function editGeneralSettings(el, evt) {
    var $el = $(el),
        $BBD_HTLM;
    var cmd = $el.data('stcateg');
    if($el.find('section')
        .length && $el.find('section')
        .is(':visible')) {
        //evt.preventDefault();
        evt.stopPropagation();
        return;
    }
    ga('[data-stcateg].__active')
        .each(function() {
            var block_l_a = $(this)
                .find('div:last');
            slideUpSettingsTab(block_l_a, evt);
        });
    $el.addClass('__active')
        .find('.user-settings_i_lk')
        .hide();
    switch (cmd) {
        case 'personalInfo':
            var exUserBirthDay = _U.b.split('-');
            var thisUserDay = exUserBirthDay[2],
                thisUserMonth = exUserBirthDay[1],
                thisUserYear = exUserBirthDay[0];
            $BBD_HTLM = '<section class="st_pifo_upd"><form method="post" id="save_personal_information_form" autocomplete="off" action="/cmd.php">\
			<input name="cmd" value="savePersonalInformation" type="hidden" />\
			<input type="hidden" id="hidden_fUpd_D" value="' + thisUserDay + '" />\
			<input type="hidden" id="hidden_fUpd_M" value="' + thisUserMonth + '" />\
		    <input type="hidden" id="hidden_fUpd_Y" value="' + thisUserYear + '" />\
			<div class="form form__gl-2-2 __settings">\
            <div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.Name + '</label></span>\
            <div class="it_w">\
            <input type="text" name="fr.name" value="' + _U.fn + '" class="it" maxlength="16">\
            </div><span class="input-e"></span></div>\
			\
			<div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.Surname + '</label></span>\
            <div class="it_w">\
            <input type="text" name="fr.surname" value="' + _U.sn + '" class="it" maxlength="16">\
            </div><span class="input-e"></span></div>\
			\
			<div class="form_i"><span class="input-l"><label for="field_bday">' + lang.Date_Of_Birth + '</label></span>\
                                <table class="input-flx-f ">\
                                    <tbody>\
                                        <tr>\
                                            <td class="input-flx-f__padding-r ">\
                                                <select onchange="updateNewBirthDayInput(this,event,\'day\');" name="fr.bday" id="field_bday" class="isl isl__day">\
                                                    <option value="">' + lang.day + '</option>\
													' + getMonthsDays(thisUserDay) + '\
                                                </select>\
                                            </td>\
                                            <td class="input-flx-f__padding-r">\
                                                <select onchange="updateNewBirthDayInput(this,event,\'month\');" name="fr.bmonth" id="field_bmonth" class="isl">\
                                                    <option value="">' + lang.month + '</option>\
													' + getMonths(thisUserMonth) + '\
                                                </select>\
                                            </td>\
                                            <td class="input-flx-f__padding-r">\
                                                <select onchange="updateNewBirthDayInput(this,event,\'year\');" name="fr.byear" id="field_byear" class="isl isl__4num">\
													<option value="">' + lang.year + '</option>\
													' + getYears(thisUserYear) + '\
                                                </select>\
                                            </td>\
                                        </tr>\
                                    </tbody>\
                                </table><span class="input-e __bd"></span></div>\
			 \
			 <div class="form_i"><span class="input-l"><label for="field_gender">' + lang.Im + '</label></span>\
             <ul class="form_ul form_ul__inline">\
             <li class="form_ul_li">\
             <input class="irc" type="radio" name="fr.gender" value="1" id="field_gender_1" ' + (_U.g == 'male' ? 'checked="checked"' : '') + '><span class="irc_l"><label for="field_gender_1">' + lang.Male + '</label></span></li>\
             <li class="form_ul_li">\
             <input class="irc" type="radio" name="fr.gender" value="2" id="field_gender_2" ' + (_U.g == 'female' ? 'checked="checked"' : '') + '><span class="irc_l"><label for="field_gender_2">' + lang.Female + '</label></span></li>\
             </ul><span class="input-e"></span></div>\
			\
			<div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.Location + '</label></span>\
            <div class="it_w">\
			<input id="stfr_location" autocomplete="off" name="location_name" placeholder="' + lang.location_name_eg + '" class="it getuserlocation" type="text" value="' + _U.loc_name + '" />\
			<input type="hidden" name="location_id" id="location_id" value="' + _U.loc_id + '" /><input type="hidden" id="settings_approved_location" name="location_approved" value="1" class="yes" />\
            </div><span class="input-e"></span></div>\
			\
			</div>\
			<div class="notif_btn __settings">\
			<button onclick="return savePersonalInformationForm(event,$(\'form#save_personal_information_form\'));" type="submit" class="button-pro __def __small mr-8">' + lang.Save + '</button>\
			<a href="javascript:;" id="cancel_stPI_form" onclick="return slideUpSettingsTab(this,event);" class="">' + lang.Cancel + '</a>\
			</div></form>\
			</section>';
            break;
        case 'nickname':
            $BBD_HTLM = '<section class="st_pifo_upd"><form method="post" id="save_nickname_form" action="/cmd.php">\
			<input name="cmd" value="saveNickName" type="hidden" />\
			<div class="form form__gl-2-2 __settings">\
            <div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.Nickname + '</label></span>\
            <div class="it_w">\
            <input type="text" id="nickname_update" onkeypress="if(event.keyCode == 32) event.preventDefault();" name="fr.nick" value="' + _U.nick + '" class="it" maxlength="48">\
            </div><span class="input-e"></span></div>\
			\
			<div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.CurrentPassword + '</label></span>\
            <div class="it_w">\
            <input type="password" name="fr.pass" id="stfr_must_pass" class="it">\
            </div><span class="input-e"></span></div>\
			<div class="notif_btn __settings">\
			<button onclick="return saveNickName(event,$(\'form#save_nickname_form\'));" type="submit" class="button-pro __def __small mr-8">' + lang.Save + '</button>\
			<a href="javascript:;" id="block2_cancel_stPI_form" onclick="return slideUpSettingsTab(this,event);" class="">' + lang.Cancel + '</a>\
			</div></form></section>';
            break;

        case 'phone':
            $BBD_HTLM = '<section class="st_pifo_upd"><form method="post" id="save_phone_form" action="/cmd.php">\
			<input name="cmd" value="savePhone" type="hidden" />\
			<div class="form form__gl-2-2 __settings">\
            <div class="form_i">\
			<span class="input-l"><label for="phone_update">' + lang.reg_phone + '</label></span>\
            <div class="it_w">\
            <input type="text" autocomplete="off" data-user-country="' + _U.country_code + '" placeholder="' + lang.reg_phone_placeholder + '" id="phone_update" onkeypress="if(event.keyCode == 32) event.preventDefault();" name="fr.phone" value="" class="phone-input it" maxlength="20">\
            <input type="hidden" name="phone_number" id="js_phone_number" value="" /></div><span class="input-e"></span></div>\
			\
			<div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.CurrentPassword + '</label></span>\
            <div class="it_w">\
            <input type="password" name="fr.pass" id="p_stfr_must_pass" class="it">\
            </div><span class="input-e"></span></div>\
			<div class="notif_btn __settings">\
			<button onclick="return savePhone(event,$(\'form#save_phone_form\'));" type="submit" class="button-pro __def __small mr-8">' + lang.Save + '</button>\
			<a href="javascript:;" id="block2_cancel_stPI_form" onclick="return slideUpSettingsTab(this,event);" class="">' + lang.Cancel + '</a>\
			</div></form></section>';

            break;

        case 'password':
            $BBD_HTLM = '<section class="st_pifo_upd"><form method="post" id="updatePassword_form" action="/cmd.php">\
			<input name="cmd" value="updatePassword" type="hidden" />\
			<div class="form form__gl-2-2 __settings">\
			<div class="change_pass_descr">' + lang.changePassDescr + '</div>\
            <div class="form_i">\
			<span class="input-l"><label for="pass_update">' + lang.CurrentPassword + '</label></span>\
            <div class="it_w">\
            <input type="password" id="pass_update" onkeypress="if(event.keyCode == 32) event.preventDefault();" name="fr.oldpass" class="it">\
            </div><span class="input-e"></span></div>\
			\
			<div class="form_i">\
			<span class="input-l"><label for="newpass_update">' + lang.newPassword + '</label></span>\
            <div class="it_w">\
            <input type="password" id="newpass_update" onkeypress="if(event.keyCode == 32) event.preventDefault();" name="fr.newpass" id="stfr_must_pass" class="it">\
            </div><span class="input-e"></span></div>\
			<div class="form_i">\
			<span class="input-l"><label for="repass_update">' + lang.reTypePassword + '</label></span>\
            <div class="it_w">\
            <input type="password" id="repass_update" onkeypress="if(event.keyCode == 32) event.preventDefault();" name="fr.repass" id="stfr_must_pass" class="it">\
            </div><span class="input-e"></span></div>\
			<div class="notif_btn __settings">\
			<button onclick="return updateNewPassword(event,$(\'form#updatePassword_form\'));" type="submit" class="button-pro __def __small mr-8">' + lang.Save + '</button>\
			<a href="javascript:;" id="block3_cancel_stPI_form" onclick="return slideUpSettingsTab(this,event);" class="">' + lang.Cancel + '</a>\
			</div></form></section>';
            break;
        case 'email':
            $BBD_HTLM = '<section class="st_pifo_upd"><form method="post" autocomplete="false" id="save_mail_form" action="/cmd.php">\
			<input name="cmd" value="updateProfileEmail" type="hidden" />\
			<div class="form form__gl-2-2 __settings">\
            <div class="form_i">\
			<span class="input-l"><label for="field_name">' + lang.NewEmail + '</label></span>\
            <div class="it_w">\
            <input type="email" autocomplete="false" readonly onfocus="this.removeAttribute(\'readonly\');" id="mail_update" onkeypress="if(event.keyCode == 32) event.preventDefault();" name="fr.mail" class="it">\
            </div><span class="input-e"></span></div>\
			\
			<div class="form_i">\
			<span class="input-l"><label for="em_curr_pass">' + lang.CurrentPassword + '</label></span>\
            <div class="it_w">\
            <input type="password" autocomplete="false" readonly onfocus="this.removeAttribute(\'readonly\');" id="em_curr_pass" name="fr.pass" id="stfr_m_must_pass" class="it">\
            </div><span class="input-e"></span></div>\
			<div class="notif_btn __settings">\
			<button onclick="return saveMail(event,$(\'form#save_mail_form\'));" type="submit" class="button-pro __def __small mr-8">' + lang.Save + '</button>\
			<a href="javascript:;" id="block4_cancel_stPI_form" onclick="return slideUpSettingsTab(this,event);" class="">' + lang.Cancel + '</a>\
			</div></form></section>';
            break;
        default:
            return;
    }
    if(!$el.find('section')
        .length) {
        $el.append($BBD_HTLM)
            .find('section')
            .slideDown();
        inputPhone();
    } else $el.find('section')
        .slideDown();
}


function PollVote(evt) {
    var total;
    var width, html = "",
        label = "";
    var _this = ga(evt.target);
    var p_cnt = _this.closest('.poll-container')
    var _question_id = p_cnt.attr('id').split('mzv|')[1];

    var ans = p_cnt.find('.options input[type=radio]:checked').val();
    var p_opts = p_cnt.find('.options');
    if(ans) {
        poll_loading(p_cnt);
        $.ajax({
            type: "POST",
            url: "/cmd.php",
            data: "cmd=pollvote&quid=" + escape(_question_id) + "&ans=" + ans,
            dataType: "json",
            success: function(response) {
                poll_loading(p_cnt, 'stop');

                html = "<div class='result' style='display:none'>";
                total = response.total;

                if(response.success == 1) {
                    $.each(response.opt, function(aid, label) {
                        if(response.details[aid] == undefined) {
                            width = 0
                            acount = 0
                        } else {
                            acount = response.details[aid];
                            width = Math.round((parseInt(acount) / parseInt(total)) * 100);
                        }
                        html += '<div class="bar-holder">' + label + ' (' + acount + ' votes)<div class="perc"></div><div class="bc"><div class="bar" style="width:' + width + '%">' + width + '% &nbsp;</div></div></div>';
                    });
                    html += '</div>';
                    html += '<p><span class="total">Total votes : <b>' + total + '</b></span>';

                    p_opts.html(html);
                    p_cnt.find('.sub').remove();
                    p_cnt.find(".result").slideDown();
                } else if(response.success == 2) {

                    kn_liveNotif(lang.already_voted_in_poll, 'done', 6000, lang.already_voted_in_poll_descr);
                } else {
                    kn_liveNotif(lang.err_vote_poll, 'error', 6000, lang.err_vote_poll_descr);
                }
            }
        });

    }
}



/* Social networks, invite friends */
function FacebookInviteFriends() {



    $.getScript("https://connect.facebook.net/en_US/all.js").done(function(script, textStatus) {

        if(top.location != self.location) {
            top.location = self.location
        }
        FB.init({
            appId: '278457429296671',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v2.9'
        });


        FB.ui({
            method: 'apprequests',
            message: 'Visit Konnect!'
        });



    });




}

function poll_loading(pcnt, stop) {

    if(stop) {
        pcnt.find('.poll_loader_2fa').remove();
        return;
    }

    if(!pcnt.find('.poll-loader').length) pcnt.find(".options").before('<div class="poll_loader_2fa"><div class="loader_ic_in_pll"></div></div>');
}



function jboxTitleTip(obj, c, stc, h) {
    obj.jBox('Tooltip', {
        content: stc ? jb_create_tooltip_cnt : c,
        id: !h ? 'tagged-people-n-post' : 'tagged-people-n-post-' + h,
        closeOnMouseleave: true,
        position: {
            x: 'center',
            y: 'top'
        },
        ///outside: 'y',
        pointer: true,
        adjustPosition: true,
        reposition: true,
        onOpen: function() {
            if(stc) this.setContent(jb_create_tooltip_cnt);
        }
    });
}

function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if(window.getSelection) {
        sel = window.getSelection();
        if(sel.rangeCount) {
            range = sel.getRangeAt(0);
            if(range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if(document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if(range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}


function markWord(word, div) {
    var html = div.html(), ///div[0].innerText || div[0].textContent,
        //html = html.replace(/<\/?span>/gi, ''),
        //text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '),
        exp, c = 0;
    /// $.each(words, function(i, word) {
    //    exp = new RegExp(word, 'gi');
    html = html.toString()
        .replace(word, '<span class="li">' + word + '</span>');
    /// });
    div.html(html);
}



/* FUNCTIONS 
---------------- */
$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};
/*
$(function() {
    setInterval(function() {
        $('[rel=tipsy]').tipsy({

            delayIn: 0, // delay before showing tooltip (ms)
            delayOut: 0, // delay before hiding tooltip (ms)
            fade: false, // fade tooltips in/out?
            fallback: '', // fallback text to use when no tooltip text
            gravity: 'sw', // gravity
            html: false, // is tooltip content HTML?
            live: false, // use live event support?
            offset: 0, // pixel offset of tooltip from element
            opacity: 1, // opacity of tooltip
            title: 'title', // attribute/callback containing tooltip text
            trigger: 'hover' // how tooltip is triggered - hover | focus | manual
        });

    }, 5000);
});
*/
//jQuery ismouseover  method
(function($) {
    $.mlp = {
        x: 0,
        y: 0
    }; // Mouse Last Position
    function documentHandler() {
        var $current = this === document ? $(this) : $(this)
            .contents();
        $current.mousemove(function(e) {
            jQuery.mlp = {
                x: e.pageX,
                y: e.pageY
            }
        });
        $current.find("iframe")
            .load(documentHandler);
    }
    $(documentHandler);
    $.fn.ismouseover = function(overThis) {
        var result = false;
        this.eq(0)
            .each(function() {
                var $current = $(this)
                    .is("iframe") ? $(this)
                    .contents()
                    .find("body") : $(this);
                var offset = $current.offset();
                result = offset.left <= $.mlp.x && offset.left + $current.outerWidth() > $.mlp.x && offset.top <= $.mlp.y && offset.top + $current.outerHeight() > $.mlp.y;
            });
        return result;
    };
})(jQuery);
$.fn.disableScroll = function() {
    window.oldScrollPos = $(window)
        .scrollTop();
    $(window)
        .on('scroll.scrolldisabler', function(event) {
            $(window)
                .scrollTop(window.oldScrollPos);
            event.preventDefault();
        });
};
$.fn.enableScroll = function() {
    $(window)
        .off('scroll.scrolldisabler');
};
$.fn.scrollEnd = function(callback, timeout) {
    $(this)
        .scroll(function() {
            var $this = $(this);
            if($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
};
$.fn.focusEnd = function() {
    $(this)
        .focus();
    var tmp = $('<span />')
        .appendTo($(this)),
        node = tmp.get(0),
        range = null,
        sel = null;
    if(document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if(window.getSelection) {
        range = document.createRange();
        range.selectNode(node);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    tmp.remove();
    return this;
}
$.fn.hasScrollBar = function() {
    return this.get(0)
        .scrollHeight > this.height();
}



Array.prototype.pindexof = function(val) {
    var i = this.length;
    while(i--) {
        if(this[i] == val) return i;
    }
    return -1;
}
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
}

function searchPlaceInGroups(el, place_lt, place_ln) {

    el = ga(el);

    if(!el.hasClass('club-href')) {

        ajaxLoading();
        var send = jAjax('/cmd.php', 'post', {
            cmd: 'searchPlaceInGroups',
            'ln': escape(place_lt),
            'lt': escape(place_ln)
        });
        send.done(function(data) {
            removeAjaxLoad();
            if(data > 0) {


                el.removeAttr('href').removeAttr('onclick').addClass('club-href').attr({
                    'href': '/community/' + data,
                    'hrefattr': 'true'
                });

                up_href();
                el.trigger('click');
            } else {


                kn_liveNotif(lang.place_not_found, 'info', 4000, lang.place_not_found_in_communities);

            }

        });

    }


}

/*
Object.defineProperty(Array.prototype, 'pindexof', {
  enumerable: false, 
   value: function (val) { 
   
   
   	var i = this.length;
	while (i--)
	{
		if (this[i] == val) return i;
	}
	return -1;
   
   }
});

Object.defineProperty(Array.prototype, 'remove', {
  enumerable: false, 
   value: function (from, to)
{
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}
});
*/
function removeValue(list, value, separator) {
    separator = separator || ",";
    var values = list.split(separator);
    for(var i = 0; i < values.length; i++) {
        if(values[i] == value) {
            values.splice(i, 1);
            return values.join(separator);
        }
    }
    return list;
}

function jprintf(format, data) {
    var arg = arguments;
    var i = 1;
    return format.replace(/%((%)|s)/g, function(m) {
        return m[2] || arg[i++]
    })
}
navigator.sayswho = (function() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if(M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if(tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();
// find scrollable
(function($) {
    jQuery.extend(jQuery.expr[":"], {
        scrollable: function(element) {
            var vertically_scrollable, horizontally_scrollable;
            if(jQuery(element)
                .css('overflow') == 'scroll' || jQuery(element)
                .css('overflowX') == 'scroll' || jQuery(element)
                .css('overflowY') == 'scroll') return true;
            vertically_scrollable = (element.clientHeight < element.scrollHeight) && (jQuery.inArray(jQuery(element)
                .css('overflowY'), ['scroll', 'auto']) != -1 || jQuery.inArray(jQuery(element)
                .css('overflow'), ['scroll', 'auto']) != -1);
            if(vertically_scrollable) return true;
            horizontally_scrollable = (element.clientWidth < element.scrollWidth) && (jQuery.inArray(jQuery(element)
                .css('overflowX'), ['scroll', 'auto']) != -1 || jQuery.inArray(jQuery(element)
                .css('overflow'), ['scroll', 'auto']) != -1);
            return horizontally_scrollable;
        }
    })
})($);
//This handles the queues    
(function($) {
    var ajaxQueue = $({});
    $.ajaxQueue = function(ajaxOpts) {
        var oldComplete = ajaxOpts.complete;
        ajaxQueue.queue(function(next) {
            ajaxOpts.complete = function() {
                if(oldComplete) oldComplete.apply(this, arguments);
                next();
            };
            $.ajax(ajaxOpts);
        });
    };
})(jQuery);
$.fn.scrollTo = function(target, options, callback) {
    if(typeof options == 'function' && arguments.length == 2) {
        callback = options;
        options = target;
    }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function() {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset()
            .top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({
            scrollTop: scrollY
        }, parseInt(settings.duration), settings.easing, function() {
            if(typeof callback == 'function') {
                callback.call(this);
            }
        });
    });
}

function validateJson(str, no_err) {
    try {
        var json = JSON.parse(str);

        if(typeof json.hasOwnProperty('status'))
            if(json.status === 'require_login')
                window.location.reload();


        return json;
    } catch (e) {
        if(!no_err) {
            console.log(str);

            //if(!dev_enabled) setTimeout(function(){window.location.reload()},500);
        } //' + lang.somethingWrong);
        return false;
    }
}

function urldecode(str) {
    return decodeURIComponent((str + '')
        .replace(/\+/g, '%20'));
}

// callback when a css animation end
function endAnimationEvent() {

    var t;
    var el = document.createElement('fakeelement');
    var animation = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MSAnimation': 'MSAnimationEnd',
        'WebkitAnimation': 'webkitAnimationEnd'
    };
    for(t in animation) {
        if(el.style[t] !== undefined) {
            return animation[t];
        }
    }

}
// get browser vendor prefix
function getVendor() {
    var result = '';
    var div = document.createElement('div'),
        prefixes = ['Webkit', 'Moz', 'ms', 'O'];
    if('transform' in div.style) return result;
    for(var i = 0; i < prefixes.length; i++) {
        if((prefixes[i] + 'Transform') in div.style) {
            result = '-' + prefixes[i].toLowerCase() + '-';
            break;
        }
    }
    return result;
}
$.fn.scrollEnd = function(callback, timeout) {
    $(this)
        .scroll(function() {
            var $this = $(this);
            if($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
};
// get browser 3d support
function getBwFeatures() {
    var result = '';
    var element = document.body || document.documentElement,
        elementStyle = element.style,
        isCSSTransitions = typeof elementStyle.transition !== 'undefined' || typeof elementStyle.WebkitTransition !== 'undefined' || typeof elementStyle.MozTransition !== 'undefined' || typeof elementStyle.OTransition !== 'undefined';
    if(isCSSTransitions === true) {
        var div = document.createElement('div');
        // Check if 3D transforms are supported
        if(typeof div.style.WebkitPerspective !== 'undefined' || typeof div.style.perspective !== 'undefined') {
            result = 'translate3d';
        }
        // Additional checks for Webkit
        if(result === 'css3D' && typeof div.styleWebkitPerspective !== 'undefined') {
            var style = document.createElement('style');
            style.textContent = '@media (transform-3d),(-webkit-transform-3d){#test-for-3D{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}';
            document.getElementsByTagName('head')[0].appendChild(style);
            div.id = 'test-for-3D';
            document.body.appendChild(div);
            if(!(div.offsetLeft === 9 && div.offsetHeight === 5)) {
                result = null;
            }
            style.parentNode.removeChild(style);
            div.parentNode.removeChild(div);
        }
        // If CSS 3D transforms are not supported, check if 2D transforms are supported
        if(!result && (typeof div.style['-webkit-transform'] !== 'undefined' || typeof div.style.transform !== 'undefined')) {
            result = 'translate';
        }
    } else {
        result = 'translate';
    }
    return result;
}
/* From Modernizr */
function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }
    for(t in transitions) {
        if(el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

function createCookie(name, value, days) {
    if(!days) days = 100;
    if(days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0) == ' ') c = c.substring(1, c.length);
        if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

function base64_decode(data) {
    //  discuss at: http://phpjs.org/functions/base64_decode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman
    // bugfixed by: Pellentesque Malesuada
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: base64_decode('YQ===');
    //   returns 2: 'a'
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = '',
        tmp_arr = [];
    if(!data) {
        return data;
    }
    data += '';
    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if(h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if(h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while(i < data.length);
    dec = tmp_arr.join('');
    return dec.replace(/\0+$/, '');
}

function profileWallToCenter() {


    /*
    var is_profile_redesign = ga('.gap_item._about'),
    	mcnt = $('#mainContent');
    if (is_profile_redesign.length)
    {
    	ga(window)
    		.off('scroll.redesignProfileWall')
    		.on('scroll.redesignProfileWall', function (e)
    		{
    			if ( ga(this)
    				.scrollTop() >= (is_profile_redesign.offset()
    					.top + is_profile_redesign.height()) - ga('.toolbar.__redesign')
    				.height()){ alert('este');
    				if (!mcnt.data('prevleftpos')) mcnt.attr('data-prevleftpos', mcnt.css('left'));
    				if(!mcnt.data('defaultwidth')) mcnt.attr('data-defaultwidth',mcnt.width());
    				is_profile_redesign.css({'position':'absolute'});//,'left':'-1200px','height':'100px','width':'10px','min-width':'10px','margin':'0','overflow':'hidden'});
    				mcnt.css({'left' : '-145px','width':'506px','transition':'left .2s linear','transform':'translateZ(0)'});
    				//is_profile_redesign.hide();
    				
    			}
    			else if ( ga(this)
    				.scrollTop() <= (is_profile_redesign.position()
    					.top + is_profile_redesign.height()) - ga('.toolbar.__redesign')
    				.height() )
    			{
    				is_profile_redesign.removeAttr('style');
    				mcnt.css('transition','inherit');
    				mcnt.removeAttr('data-prevleftpos')
    					.css('left', mcnt.data('prevleftpos'));
    					
    				mcnt.removeAttr('data-defaultwidth')
    					.css('width', mcnt.data('defaultwidth'));
    				//is_profile_redesign.show();
    				
    			}
    		});
    }
    else $(window)
    	.off('scroll.redesignProfileWall');
    	
    	
    	*/
    var _wall_m = ga('.gap_item._wall');
    var _p_wall_divider = ga('.gap_i_divider');
    var header_height = ga('.toolbar.__redesign').outerHeight();
    var v5_redesign = ga('.gap_item._about'),
        profile_wall_sect = ga('.u_prof_redesign_feed'),
        _profile_wall_gap = ga('.gap_item._wall');
    var is_profile_redesign = v5_redesign.find('.v115-redesign-prof-col:last'),
        mcnt = $('#mainContent');
    if(is_profile_redesign.length) {
        ga(window)
            .off('scroll.redesignProfileWall')
            .on('scroll.redesignProfileWall', function(e) {


                if(ga(this)
                    .scrollTop() >= (is_profile_redesign.offset()
                        .top + is_profile_redesign.outerHeight()) - header_height) {


                    /*		var css = {};
					css['-webkit-column-count'] = 2;
					css['-moz-column-count'] = 2;
					css['column-count'] = 2;
					css['-webkit-column-gap'] = 2;
					css['-moz-column-gap'] = 2;
					css['column-gap'] = 2;
					css['page-break-inside'] = 'avoid';
					css['break-inside'] = 'avoid-column';
					
 
 
					var h = 0, w = v5_redesign.find('.v115-redesign-prof-col').width();
					v5_redesign.find('.v115-redesign-prof-col').each(function(){
						
						h = h+ga(this).height();
						
					});
					
					
						if(!_profile_wall_gap.hasClass('sized')) {
 							v5_redesign.css({'position':'absolute'});
							v5_redesign.before('<div class="feed" id="feed_clone" style="flex:1;width:'+w+'px;overflow:auto;position:relative;height:'+h+'px;float:left;"></div>');
							profile_wall_sect.css(css);
							_profile_wall_gap.addClass('sized').css('max-width','100%');
						}
						
						profile_wall_sect.find('.feed').css({'width':'100%','overflow':'auto','float':'left'});
					
	*/
                    var wall_m_left = _wall_m.width() / 2;
                    if(!mcnt.data('prevleftpos')) mcnt.attr('data-prevleftpos', mcnt.css('left'));
                    if(!mcnt.data('defaultwidth')) mcnt.attr('data-defaultwidth', mcnt.width());
                    v5_redesign.css({
                        'position': 'absolute',
                        'visibility': 'hidden',
                        'opacity': 0
                    }); //,'left':'-1200px','height':'100px','width':'10px','min-width':'10px','margin':'0','overflow':'hidden'});
                    _wall_m.css({
                        'left': 'calc(50% - ' + wall_m_left + 'px)',
                        'position': 'relative',
                        'Xtransition': 'left .2s linear',
                        'Xtransform': 'translateZ(0)'
                    });
                    _p_wall_divider.hide();

                }
                if(ga(this)
                    .scrollTop() <= (is_profile_redesign.offset()
                        .top + is_profile_redesign.outerHeight()) - header_height) {
                    v5_redesign.removeAttr('style');
                    profile_wall_sect.removeAttr('style');
                    ga('#feed_clone').remove();
                    _profile_wall_gap.removeClass('sized').removeAttr('style');
                    ga('.feed').removeAttr('style');

                    _wall_m.css('left', mcnt.data('prevleftpos'));
                    mcnt.css('transition', 'inherit');
                    mcnt.removeAttr('data-prevleftpos');
                    _p_wall_divider.show();

                    mcnt.removeAttr('data-defaultwidth')
                        .css('width', mcnt.data('defaultwidth'));
                    //profile_wall_sect.removeClass('absolute_items');
                }


            });
    } else ga(window)
        .off('scroll.redesignProfileWall');


}

function base64_encode(data) {
    //  discuss at: http://phpjs.org/functions/base64_encode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Rafa Kukawski (http://kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    //   example 1: base64_encode('Kevin van Zonneveld');
    //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    //   example 2: base64_encode('a');
    //   returns 2: 'YQ=='
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];
    if(!data) {
        return data;
    }
    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while(i < data.length);
    enc = tmp_arr.join('');
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}


function o_krypt(str) {
    var ret = '';
    str = str.toString();
    for(var i = 0; i < str.length; i++) {
        switch (str[i]) {
            case '1':
                ret += "@11";
                break;
            case '2':
                ret += "@21";
                break;
            case '3':
                ret += "@31";
                break;
            case '4':
                ret += "@41";
                break;
            case '5':
                ret += "@51";
                break;
            case '6':
                ret += "@61";
                break;
            case '7':
                ret += "@71";
                break;
            case '8':
                ret += "@81";
                break;
            case '9':
                ret += "@91";
                break;
            case '0':
                ret += "@01";
                break;
        }
    }
    return ret;
}

function x_krypt(str) {
    return str.replace(/@11/g, 1)
        .replace(/@21/g, 2)
        .replace(/@31/g, 3)
        .replace(/@41/g, 4)
        .replace(/@51/g, 5)
        .replace(/@61/g, 6)
        .replace(/@71/g, 7)
        .replace(/@81/g, 8)
        .replace(/@91/g, 9)
        .replace(/@01/g, 0);
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isElementInViewport(el, plusHeight, minusHeight) {

    //special bonus for those using jQuery
    if(typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    if(typeof el != 'undefined') {
        var rect = el.getBoundingClientRect();
        if(minusHeight) {
            return (rect.top - minusHeight >= 0 && rect.left - minusHeight >= 0 && rect.bottom - minusHeight <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */ rect.right - minusHeight <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
        } else if(plusHeight) {
            return (rect.top + plusHeight >= 0 && rect.left + plusHeight >= 0 && rect.bottom + plusHeight <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */ rect.right + plusHeight <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
        } else {
            return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */ rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
        }

    }
}

function ValidURL(str) {
    var pattern = /(https?\:\/\/|\s)[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})(\/+[a-z0-9_.\:\;-]*)*(\?[\&\%\|\+a-z0-9_=,\.\:\;-]*)?([\&\%\|\+&a-z0-9_=,\:\;\.-]*)([\!\#\/\&\%\|\+a-z0-9_=,\:\;\.-]*)}*/i;
    return pattern.test(str) ? urlify(str) : false;
}

function urlify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return url;
    });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

function gUrl(str) {
    return new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))", "g");
}

function getDomainExt(d) {

    if(!ValidURL(d)) return false;
    else {

        var AllowDomains = ["aero", "biz", "cat", "com", "coop", "edu", "gov", "info", "int", "jobs", "mil", "mobi", "museum", "name", "net", "org", "travel", "ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cs", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "me", "mc", "md", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "yu", "za", "zm", "zr", "zw"];
        d = new URL(d)
            .hostname;
        var domain = d.split('.')
            .pop();
        if(AllowDomains.indexOf(domain) > -1) return true;
        else return false;
    }

}

function url_domain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}

function insertTextAtCursor(text) {
    var sel, range, html;
    if(window.getSelection) {
        sel = window.getSelection();
        if(sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
        }
    } else if(document.selection && document.selection.createRange) {
        document.selection.createRange()
            .text = text;
    }
}
if(typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.indexOf(str) == 0;
    };
}
var SuggestMe = function() {
    "use strict";
    return {
        init: init
    };

    function init(elm, words) {
        if(words.length <= 2) return;
        this.$el = elm;
        this.$el.on("keypress", function(event) {
            if(event.keyCode === 13) {
                var sel = rangy.getSelection();
                if(!sel.isCollapsed) {
                    var range = sel.getRangeAt(0);
                    range.collapse(false);
                    var textNode = document.createTextNode("  ");
                    range.insertNode(textNode);
                    sel.collapseToEnd();
                    event.preventDefault();
                }
            }
        });
        this.$el.on("keyup", function(event) {
            var c = String.fromCharCode(event.keyCode);
            var isWordcharacter = c.match(/\w/);
            if(isWordcharacter && !event.ctrlKey) {
                var elm = this;
                var lastWord = getLastWord(elm);
                if(lastWord) {
                    $.each(words, function(a) {
                        var word = words[a];
                        if(word.startsWith(lastWord)) {
                            var sel = rangy.getSelection();
                            if(sel.rangeCount > 0) {
                                var range = sel.getRangeAt(0)
                                    .cloneRange();
                                range.collapse(false);
                                var htNode = document.createElement('span');
                                htNode.classList.add('opacSelection');
                                var textNode = document.createTextNode(word.replace(lastWord, ""));
                                htNode.appendChild(textNode);
                                range.insertNode(htNode);
                                range.selectNodeContents(textNode);
                                rangy.getSelection()
                                    .setSingleRange(range);
                                return false;
                            }
                        }
                    });
                }
            }
        });
    }

    function getLastWord(elm) {
        var val = elm.innerText.trim();
        val = val.replace(/(\r\n|\n|\r)/gm, " ");
        var idx = val.lastIndexOf(' ');
        var lastWord = val.substring(idx + 1)
            .trim();
        return lastWord;
    }
}();


(function() {
    var hidden = "hidden";

    // Standards:
    if(hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
        var v = "visible",
            h = "hidden",
            evtMap = {
                focus: v,
                focusin: v,
                pageshow: v,
                blur: h,
                focusout: h,
                pagehide: h
            };

        evt = evt || window.event;
        if(evt.type in evtMap)
            ga('body').addClass(evtMap[evt.type]);
        else
            ga('body').addClass(this[hidden] ? "hidden" : "visible");
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if(document[hidden] !== undefined)
        onchange({
            type: document[hidden] ? "blur" : "focus"
        });
})();


function FireEvent(ElementId, EventName) {
    if(document.getElementById(ElementId) != null) {
        if(document.getElementById(ElementId)
            .fireEvent) {
            document.getElementById(ElementId)
                .fireEvent('on' + EventName);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(EventName, true, false);
            document.getElementById(ElementId)
                .dispatchEvent(evObj);
        }
    }
}

function checkJson(text) {

    if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        return true;

    } else {

        return false;

    }

}

function objHook(str) {
    if(typeof str == 'undefined') return;
    else
        return validateJson(str.replace(/<!--/g, '')
            .replace(/-->/g, ''));
}


var beforeUnloadTimeout = 0;

function unbindRemainOnSite(namespace) {


    if(namespace) ga(window)
        .off('beforeunload.' + namespace);
    else ga(window)
        .off('beforeunload');
    stop_cl = false;
    ga(window).bind('unload', function() { //alert('e')
        clearTimeout(beforeUnloadTimeout);
    });
}

function remainOnSite(str, namespace, callback) {
    stop_cl = str;
    ga(window)
        .on("beforeunload." + namespace, function() {


            beforeUnloadTimeout = setTimeout(function() {
                if(callback) callback();
            }, 1000);

            return str;
        });
}

function auto_rsz($el) {
    var text = $el[0];

    function resize() {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change', resize);
    observe(text, 'cut', delayedResize);
    observe(text, 'paste', delayedResize);
    observe(text, 'drop', delayedResize);
    observe(text, 'keydown', delayedResize);
    text.focus();
    text.select();
    resize();
}
if(window.attachEvent) {
    observe = function(element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
} else {
    observe = function(element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}

function Uvalidate(oForm) {
    var _validFileExtensions = [];

    for(var k = 0; k < _st.photoTypes.length; k++)
        _validFileExtensions.push('.' + _st.photoTypes[k]);

    var arrInputs = oForm.getElementsByTagName("input");
    for(var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if(oInput.type == "file") {
            var sFileName = oInput.value;
            if(sFileName.length > 0) {
                var blnValid = false;
                for(var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if(sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }

                if(!blnValid) {
                    displayErr("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    return false;
                }
            }
        }
    }

    return true;
}
$.fn.hasExtension = function(exts) {
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test($(this).val());
}

$document.ready(domstart);
