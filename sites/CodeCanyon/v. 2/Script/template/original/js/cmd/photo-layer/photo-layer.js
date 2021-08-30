var store_photos = {};
var ajax_send = {};
var phlayer_top_editor_menu = !1;
for (var i = 0; i < slides_C; ++i)
    store_photos[slides[i].id] = slides[i]; //store_photos.push(slides[i]);	  


 

ga('#phlayer_store_slides')
    .remove();

// set the current userid in localstorage
localStorage.setItem('attch_checkUser', uid);

if (exist_photo == 0) {
    ga('body')
        .removeClass('__noScrollable');
    ga('#pp_photo_viewer')
        .remove();
    displayErr(lang.photo_dose_not_exist);

} else {

    var thumbnailsUpdated, timeout_x, timeout_y;

    ga(document)
        .ready(function() {

            ga('#boss-gallery')
                .nobleSlider({
					//_SLIDER_ENABLE_AUTO_HEIGHT	:true,
	/*		_SLIDE_ADJUST_RESIZE: {
	
		// notebook, desktop
		1024: {

		_SLIDER_WIDTH: 1024,
		_SLIDER_HEIGHT: 570,
		_THUMBS_ALIGNMENT: 'bottom'

		// any settings here (ex: turn slide to fade)

		},

		// tablets
		800: {

		_SLIDER_WIDTH: 400,
		_SLIDER_HEIGHT: 300,
		_THUMBS_ALIGNMENT: 'top'

		// any settings here (ex: hide arrows, etc..)

		},
	
		// mobile devices
		700: {

		_SLIDER_WIDTH: 450,
		_SLIDER_HEIGHT: 200,
		_THUMBS_ALIGNMENT: 'left'

		// any settings here (ex: shrink thumbnails, etc..)

		}

             },		*/
					
					
                     _SLIDER_BEZIER_ENGINE: 'cubic-bezier(.6,.12,.16,.65)',
                     _SLIDE_ANIMATION_DURATION: 400, // miliseconds
                    _SLIDE_FADE: false,
                    //_ENABLE_TOUCH_FOR_THUMBS:false,
                   // _FADE_EFFECT_DURATION: 1,
                    _FADE_OUT_PREV_SLIDE: true,
                    _SLIDER_BEZIER_ENGINE: 'cubic-bezier(.26,.96,.58,.99)',
                    _TOUCH_SWIPE_TRESHOLD: 50,
                    _TOUCH_SWIPE_SPEED_RATIO: 1.3,
                    _IMAGE_SCALE_MODE: 'original',
                    //_ASPECT_RATIO: 1.8,
                        //,_SLIDER_ENABLE_AUTO_HEIGHT:true
                        //,_SLIDER_HEIGHT_ANIMATION_DURATION:200
                        // _IMG_SMALL_SIZE: 500,
                        /// _IMG_MEDIUM_SIZE: 800,
                        // _IMG_LARGE_SIZE: 1600,
                       _ENABLE_TOUCH_SWIPE:true, 
                    _SLIDE_END_HIDE_ARROWS: true,
                    _LARGE_IMAGES_ON_FULL_SCREEN: true,
                    _FADE_ARROWS: false,
                    _NUM_IMAGES_TO_PRELOAD: 1,
                    _SLIDER_HEIGHT: 570,
                    _SLIDER_WIDTH: 1024,
                    _INITIAL_ACTIVE_SLIDE: $('.nb-slide.__starter')
                        .index(),
                    _ALLOW_FULL_SCREEN: true,
                    _SLIDES_ORIENTATION: 'horizontal',
                    _IMAGE_TO_CENTER: true,
                    /*_ALLOW_TO_PULL: {
                                           pullDistance: 160,
                                           maxOpacity: 0.9,
                                           closeButton: '.js_popup_close',
                                           overlayClass: '.modal-new',
                                           popupContainer: '.photo-layer '
                                       },&*/
                    _ENABLE_ARROWS: true,
                    _ENABLE_PAGINATION: false,

                    _CLBK_IMAGE_LOADED: function(ev) {

                        widget_reposition(ev.index);


                        /*
                        		var act_image = $('.nb-slide.nb__active').find('img');
                        		if(!act_image.hasClass('large-image-loaded'))
                        		act_image.attr('src',act_image.attr('src').replace('&low','')).addClass('large-image-loaded');
                        */
                    },
                    _RESIZE_SLIDER: function() {
                        widget_reposition($('.nb-slide.nb__active')
                            .index(), 1);
                    },
                    update: function() {

                    },
                    _CLBK_GET_TO_SLIDE: function(ev) {
                        var evt = document.createEvent('Event');

                        evt.preventDefault();
                        evt.stopImmediatePropagation();
                        ///for(var k in ajax_send)
                        //	ajax_send[k].abort();
                        //window.stop();
                        clearTimeout(ply_r_time);
                        $('.pl_pc_photo_stub')
                            .hide();
                        $('.photo-layer_bottom')
                            .addClass('__white_bg');
                        ///$('#phlayer_ratings').empty();
                        $('.modal-new-phly')
                            .scrollTop(0);
                        setTimeout(function() {
                            $('.phlayer_emoji_input_sticky')
                                .removeClass('__on __bfon')
                                .removeAttr('style');
                        }, 100);

                        // check for removed photos & remove slides
                        var removed_slides = $('.nb-slide.__removed');
                        if (removed_slides.length) {
                            setTimeout(function() {
                                $('.photo-layer_bottom')
                                    .show();
                                $('.pl_pc_photo_stub')
                                    .remove();
                                removed_slides.remove();
                                $('#boss-gallery')
                                    .nobleSlider('_previousSlide');
                                $('#boss-gallery')
                                    .nobleSlider('update');

                            }, 150);
                        }
                        phlayer_top_editor_menu = !1;
						
						// disable zoom in when slide to another photo
						if(ga('#phlayer_zoom').hasClass('active'))
							ga('#phlayer_zoom').trigger('click.zoomin');

                    },
                    _CLBK_WHEN_SLIDE_COMPLETE: function(ev) {

                        //for(var k in ajax_send)
                        //	ajax_send[k].abort();						
                        //window.stop();
                        var act_image = $('.nb-slide.nb__active')
                            .find('img');
                        //if(!act_image.attr('src').indexOf('&low') == -1)
                        //act_image.attr('src',act_image.attr('src').replace('&low','')).addClass('large-image-loaded');

                        ///widget_reposition(ev.index);
                        var curul_slide = $('.nb-slide.nb__active');
                        var curul_slide_id = curul_slide.data('slpid'); //$('.nb-slide').eq(ev.index).data('slpid');
                        act_image.addClass('target-photo-' + curul_slide_id);
                        clearTimeout(ply_r_time);
                        ply_r_time = setTimeout(function() {
                            ga('.photo-layer_bottom')
                                .removeClass('__white_bg');
                            photoLayer_RightInf(curul_slide_id, curul_slide, ev.index);

                        }, 150);
						
						
						createUrl('', '', store_photos[curul_slide_id]['direct-photo-link']);//photo_direct_link);

                    }
                });
            ///$(window).off('resize').on('resize',function(){widget_reposition($('.nb-slide.nb__active').index(),1);});


            // right menu and emojarea input keep fixed on scrolling
            $('.modal-new-phly')
                .off('scroll.w')
                .on('scroll.w', function() {
                    var phlayer_sticky_right = $('.photo-layer_r-col_sticky'),
                        phlayer_photocnt = $('.photo-layer_cnt'),
                        ph_emoji_sticky = $('.photo-layer_bottom .comments-p-sticky');
                    var phlayer_commUL = $('.phlayer_ul_comms ul'),
                        phlayer_commlength = phlayer_commUL.children()
                        .length,
                        phlayer_first_comm = $('.phlayer_ul_comms ul>li:first'),
                        phlayer_last_comm = $('.phlayer_ul_comms ul>li:last');

                    if ($(this)
                        .scrollTop() >= phlayer_photocnt.height()) {
                        phlayer_sticky_right.addClass('fixed_always')
                            .css('top', '0');
                        //$('.phlayer_widget_plus_rating_sticky').addClass('fixed_always').css({'top':'0','z-index':'1','background':'#ccc','width':$('.photo_layer_bottom_com').width()});
                    } else if ($(this)
                        .scrollTop() <= phlayer_photocnt.height()) {
                        phlayer_sticky_right.removeClass('fixed_always')
                            .css('top', 'auto');
                        //$('.phlayer_widget_plus_rating_sticky').removeClass('fixed_always').removeAttr('style');
                    }

                    ///else ph_emoji_sticky.css('bottom','0');


                    if (phlayer_commlength >= 1 && phlayer_first_comm.offset()
                        .top - phlayer_first_comm.height() >= ph_emoji_sticky.offset()
                        .top)
                        ph_emoji_sticky.removeClass(' __on __bfon __nocoms');


                    if (phlayer_commlength >= 2 && phlayer_last_comm.offset()
                        .top + phlayer_last_comm.height() + 10 <= ph_emoji_sticky.offset()
                        .top)
                        ph_emoji_sticky.removeClass('__on __bfon __nocoms');


                    if (phlayer_commlength >= 2 && phlayer_last_comm.offset()
                        .top + phlayer_last_comm.height() + ph_emoji_sticky.height() / 2 >= ph_emoji_sticky.offset()
                        .top)
                        ph_emoji_sticky.addClass(' __on')



                    if (phlayer_commlength >= 2 && isElementInViewport(ph_emoji_sticky) &&
                        phlayer_last_comm.offset()
                        .top > ph_emoji_sticky.offset()
                        .top) { ////&& isElementInViewport(phlayer_first_comm,ph_emoji_sticky.outerHeight()) && !isElementInViewport(phlayer_last_comm,ph_emoji_sticky.outerHeight()) ){
                        ph_emoji_sticky.addClass(' __on')
                            .removeClass('__bfon __nocoms')
                            .css('bottom', '0');



                    }

                    if (phlayer_commlength >= 1 && phlayer_first_comm.offset()
                        .top + phlayer_first_comm.height() >= ph_emoji_sticky.offset()
                        .top)
                        ph_emoji_sticky.removeClass(' __on __bfon')
                        .css({
                            'position': 'relative'
                        });


                    if (phlayer_commlength >= 1 && !isElementInViewport(ph_emoji_sticky) //&& !isElementInViewport(phlayer_last_comm) 

                    ) {

                        ph_emoji_sticky.addClass('__bfon')
                            .css('bottom', phlayer_commUL.height() - (phlayer_first_comm.height() - ph_emoji_sticky.outerHeight() / 2));
                    } else ph_emoji_sticky.removeClass('__bfon')
                        .addClass('')
                        .css({
                            'position': '',
                            'bottom': '0'
                        });

                    if (!phlayer_commlength)
                        ph_emoji_sticky.removeClass(' __bfon __on')
                        .css('poition', 'relative');

                   
                    // load attached images
                    var __phlayerCommAttchFl = $('.phlayer_ul_comms').find('.jb_attach_in_msg');
                    __phlayerCommAttchFl.each(function() {
                        var $this = $(this);
                        var _this = this;
                        if (isElementInViewport($this) && !_this.ld) {
                            _this.ld = 1;

                            $this.attr('style', $this.data('bgattach')).removeAttr('data-bgattach').waitForImages(function() {
                                // All descendant images have loaded, now slide up.
                                _this.ld = 0;
                            });

                        }

                    });

                });

		// build comments section
		/*commentsWidget( ga('#phlayer_act_f2').val(),
						ga('#phlayer-com-emoji'),
						'photo',
						{'width':'80%','height':'auto','min-height':20,'overflow':'hidden','padding':'3px 74px 2px 7px'},
						ga('#pp_photo_viewer'),
						'#phlayer-com-emoji',uid,'2',1);*/
					 
				 
				/*
            var com_emojiTxtEditor = getEmojare('#phlayer-com-emoji', '.com_smiles_w', 'photo_layer');



            // send comment by pressing ENTER key
            com_emojiTxtEditor.off('keyupdown.phlayercomm keypress.phlayercomm keyup.phlayercomm')
                .on('keyupdown.phlayercomm keypress.phlayercomm keyup.phlayercomm', function(e) {
                    var _this = this,
                        photoID_enc = $('#phlayer_act_f')
                        .val(),
                        photoID = $('#phlayer_act_f2')
                        .val();
                    if ($(this)
                        .attr('data-execreply')) return;

                    if (e.keyCode == 13 && !_this.ok_sned) {
                        _this.ok_sned = true;
                        setTimeout(function() {
                            _this.ok_sned = false;
                        }, 1000);
                        sendComment(photoID_enc, $('#phlayer-com-emoji')
                            .val(), com_emojiTxtEditor, e, 'PhotoViewer',

                            function(text) {
                                phlayer_save_comments[x_krypt(photoID)] = $('.phlayer_ul_comms')
                                    .html();
                                store_photos[photoID].count_comments = parseInt($('#phly_comments_id')
                                    .text());
                                $('.__nocoms').removeClass('__nocoms');
                                if ($('.phlayer_ul_comms ul')
                                    .children()
                                    .length >= 2) ga('.phlayer_emoji_input_sticky')
                                    .addClass('fixed_always');


                            }
                        );
                    }

                });
				
				*/
				
            var phlyGetTopBarEl = function() {
                return $('.photo_viewer_top_sidebar');
            }

            var phlayer_top_editor = function(a) {
                    var phly_top_editor = phlyGetTopBarEl(),
                        slider_fullscreen_btn = $('.nb-full-screen-button');

                    if (!phlayer_top_editor_menu) return;

                    if (a) {
                        phly_top_editor.css({
                            '-webkit-transform': 'translate3d(0,0px,0)',
                            'transform': 'translate3d(0,0px,0)'
                        });
                        if (!$('#boss-gallery')
                            .hasClass('nb-full-screen')) slider_fullscreen_btn.hide();
                    } else {
                        phly_top_editor.css({
                            '-webkit-transform': '',
                            'transform': ''
                        });
                        slider_fullscreen_btn.fadeIn();
                    }
                }
            // show options bar and big like btn by mouse position
            $('.photo-layer_cnt')
                .off('mousemove.phlayer')
                .on('mousemove.phlayer', function(e) {
                    var phly_top_editor = phlyGetTopBarEl(),
                        phlayer_big_like_button = $('#phlayer_big_like_btn');
                    var cursorX = e.pageX;
                    var cursorY = e.pageY;
                    var this_show_lk = !1;
                    // options bar
                    if (phly_top_editor.offset()
                        .top + 100 >= cursorY && !$(this)
                        .find('.nb-slide.nb__active')
                        .hasClass('__removed')) {
                        phlayer_top_editor(1);
                        phlayer_big_like_button.removeClass('__show');
                        this_show_lk = !0;
                    } else {
                        phlayer_top_editor();
                        this_show_lk = !1;
                    }
                    if (this_show_lk || _phlayer_is_own_photo === _U.i) return;

                    // like button
                    if (phlayer_big_like_button.offset()
                        .top + 150 >= cursorY && !$(this)
                        .find('.nb-slide.nb__active')
                        .hasClass('__removed')) {
                        phlayer_big_like_button.addClass('__show');
                    } else {
                        phlayer_big_like_button.removeClass('__show');
                    }

                });

            // assign width to editor bar
            //$('.photo_viewer_top_sidebar').css({'width':$('.photo-layer_cnt').width(), 'position':'fixed'});

            // at initializing slider show the editor menu after 1.5sec
            if (!readCookie('phlayer_top_editor')) {
                setTimeout(function() {
                    phlayer_top_editor(1);
                }, 1500);
                createCookie('phlayer_top_editor', '1');
            }
        });

    function widget_reposition(index, x) {

        var cur_slide = $('.nb-slide')
            .eq(index),
            cur_slide_img = cur_slide.find('img');

        if (cur_slide_img.attr('src') !== preloader || x) {

            var css = {},
                _L_R = (cur_slide.width() - cur_slide_img.width()) / 2,
                _L_B = (cur_slide.height() - cur_slide_img.height()) / 2;
            css['right'] = _L_R;
            css['bottom'] = _L_B;
            css['display'] = 'inline';
            cur_slide.find('.widget_photoLayer')
                .css(css);
            cur_slide.find('.widget_lsco_bot_shadow')
                .css({
                    'display': 'inline',
                    'width': cur_slide_img.width(),
                    'left': _L_R,
                    'height': cur_slide_img.height(),
                    'top': (cur_slide.height() - cur_slide_img.height()) / 2
                });
            cur_slide.find('.photo-layer_bottom_block')
                .css({
                    'left': _L_R,
                    'bottom': _L_B,
                    'visibility': 'visible'
                });
            cur_slide.find('.photo-layer_description_tx')
                .css('max-width', cur_slide_img.width() - 200);

        }

    }

    // cancle update photo description
    function cancel_updatePhotoInfo(el, evt, t) {
        evt.preventDefault();
        ga('#plp_descrCnt').find('#phlayer_photo_descr').removeAttr('contenteditable').removeAttr('style').text(t);
        ga('#plp_descrCnt').parent().parent().find('.form-actions').remove();

    }
    // update photo description
    function update_photoDescription(pid, evt) {
        evt.preventDefault();

        if (!$.trim(pid) || !isNumeric(pid)) {return displayErr(lang.err_tehnic);}
        else {  
            var descr = ga('span#phlayer_photo_descr').text();
            ajax_send.photo_description = jAjax('/cmd.php', 'post', 'cmd=updatePhotoDescription&descr=' + descr + '&photoid=' + escape(pid));
            ajax_send.photo_description.done(function(d) {  
 
                if (d == 0) return displayErr(lang.err_update_photo_info);
                else {
                    cancel_updatePhotoInfo('', evt);
                    store_photos[pid].info = d;
                }
            });

        }
    }

    function photoLayer_RightInf(i, imgtag, imgindex) {
        if (i === phlayer_last_infID) return;

        phlayer_last_infID = i;

		if(clubid){
			
			
        var m =
            '<div class="photo-layer_r-col_sticky">' +
            ' <!-- UserHeaderPLRB -->' +
            ' <div class="photo-layer_info_w">' +
            '   <div class="ucard">' +
            '     <div class="ucard_img">' + 
            '      <a class="ucard_img_a" hrefattr="true" href="/community/%clubid"><img class="" src="/clubpicture?i=%clubid&size=small&clubid=%clubid&corr=1&logo=true" alt="%group_name" width="32" height="32"></a>' +
            '  </div>' +
            ' <div class="ucard_info ellip"><a title="%group_name" class="ucard_info_name o ellip" hrefattr="true" href="/community/%clubid">%group_name</a><span class="lightgray"><span>%group_category</span>&nbsp;<span class="communities_row_info_bullet">&#8226;</span>&nbsp;<span>%group_subcategory</span></span>' +
            ' </div>' +
            ' </div>' +
            '  <div class="photo-layer_album ellip"><a class="lp" title="%group_albumname%" href="/community/%clubid/album-%group_albumid" hrefattr="true">%group_albumname%</a>' +
            ' </div>' +
            ' <div class="photo-layer_date ellip" title="' + lang.at + ' %padded_time%">%added%</div>' +
            '</div>' +

            '<div class="photo-file_details">Photo details</div>' +
            ' <ul class="u-menu">' +
            '<li class="u-menu_li"><span class="ic-w lp">Photo:</span> <span id="p_make">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">Created with:</span> <span id="p_model">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">OS:</span> <span id="p_os">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">Datetime original:</span> <span id="p_dtoriginal">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">Original photo dimension:</span> <span id="p_xpx">&minus;</span> x <span id="p_ypx">&minus;</span></li>' +

            '</ul>' +

            '</div>';
			
		} else {
		
        var m =
            '<div class="photo-layer_r-col_sticky">' +
            ' <!-- UserHeaderPLRB -->' +
            ' <div class="photo-layer_info_w">' +
            '   <div class="ucard">' +
            '     <div class="ucard_img">' +
            '      <a class="ucard_img_a" hrefattr="true" href="/user/%uid%"><img class="" src="/getPhoto?p=%photo%&sz=small&onlinehook=1&g=%ugender%" alt="%uname%" width="32" height="32"></a>' +
            '  </div>' +
            ' <div class="ucard_info ellip"><a title="%uname%" class="ucard_info_name o ellip" hrefattr="true" href="/user/%uid%">%uname%</a><span class="lightgray"><span>%uage% years old, </span><span title="%location%">%location%</span></span>' +
            ' </div>' +
            ' </div>' +
            '  <div class="photo-layer_album ellip"><a class="lp" title="%albumname%" href="%albumhref%" hrefattr="true">%albumname%</a>' +
            ' </div>' +
            ' <div class="photo-layer_date ellip" title="' + lang.at + ' %padded_time%">%padded%</div>' +
            '</div>' +

            '<div class="photo-file_details">Photo details</div>' +
            ' <ul class="u-menu">' +
            '<li class="u-menu_li"><span class="ic-w lp">Photo:</span> <span id="p_make">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">Created with:</span> <span id="p_model">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">OS:</span> <span id="p_os">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">Datetime original:</span> <span id="p_dtoriginal">&minus;</span></li>' +
            '<li class="u-menu_li"><span class="ic-w lp">Original photo dimension:</span> <span id="p_xpx">&minus;</span> x <span id="p_ypx">&minus;</span></li>' +

            '</ul>' +

            '</div>';
			
			
		}
        var phlayer_crop_photo = ga('#phly_crop_photo_btn');
        var phly_rotate_photo = ga('#phly_rotate_photo');
        var phly_delete_photo = ga('#phly_delete_photo');
        var phly_big_like_btn = ga('#phlayer_big_like_btn');
        var g = store_photos[i];
        var user_gender = g.ugender;
        var user_age = (new Date())
            .getFullYear() - g.uage;
        var padded = timeConverter(g.padded);

        // allow edit info of photo
        if (g.userid === _U.i)
            ga('#plp_descrCnt').addClass('__editable');



        ga('#plp_descrCnt.__editable').off('click.editPhotoInfo').on('click.editPhotoInfo', function(e) {
            e.preventDefault();
            var $this = $(this);
            var __cntedit_decsr = $this.find('#phlayer_photo_descr');
            var curr_descr = __cntedit_decsr.text();
            var form_btns_markup = '<div class="form-actions">\
									<a id="plp_descrSave" onclick="return update_photoDescription(' + i + ',event);" href="javascript:void(0)"  class="button-pro __small __bd1 __sec">Save</a>\
									<a id="plp_descrCancel" onclick="cancel_updatePhotoInfo(this,event,\'' + curr_descr + '\');" href="javascript:void(0)" class="button-pro __small __sec">Cancel</a>\
									</div>';
            this.css = {};
            this.css['background-color'] = '#fff';
            this.css['padding'] = '4px';
            this.css['box-shadow'] = '1px 1px 2px 0px rgba(0, 0, 0, 0.32) inset';
            this.css['cursor'] = 'auto';
            this.css['outline'] = '0';
            this.css['min-height'] = '20px';
            this.css['width'] = '100%';
            this.css['display'] = 'block';
            __cntedit_decsr.attr('contenteditable', 'true').on('keypress keydown', function(e) {
                if (e.keyCode == 13) e.preventDefault();
            }).css(this.css).focus();
            if (!$this.closest('.photo-layer_bottom_block').find('.form-actions').length)
                $this.closest('.photo-layer_bottom_block').append(form_btns_markup);
        });
		// zoom image
	   // var viewer = ImageViewer();
		ga('#phlayer_zoom').off('click.zoomin').on('click.zoomin',function () {
			var cur_act_image = ga('.photo-layer_cnt .nb-slides');//.attr('src');
			//var imgSrc = this.src,
           // highResolutionImage = $(this).data('high-res-img');
				//ImageViewer(wrapper.find('.image-container'))
		//	viewer.show(cur_act_image, cur_act_image);
		
		if(!this._on){
			this._on = 1;
			ga('.photo_viewer_top_sidebar').addClass('_v_visible');//attr('style','transform: translate3d(0px, 0px, 0px);');
			ga('.nb__active').addClass('zoomon').zoom({on:"mouseover",duration:"1",touch:false});	
			ga(this).addClass('active');
			ga(this).find('i').addClass('active');
			ga('.pli:not(.active)').addClass('__disabled');
		}else{
			this._on = 0;
			ga('.zoomon').removeClass('zoomon').trigger('zoom.destroy');
			ga('.photo_viewer_top_sidebar').removeClass('_v_visible');
			ga(this).removeClass('active');
			ga(this).find('i').removeClass('active');
			ga('.pli:not(.active)').removeClass('__disabled');
		}
		///ga("#boss-gallery").off( eventType )

		});
        // tag people
        $('#phlayer_tag_friends')
            .off('click.tagP')
            .on('click.tagP', function(e) {
                e.preventDefault();
                var __image_to_det = $('img.target-photo-' + g.id);

                /*
                // detect faces by php (deprecated)
                var send = jAjax('/cmd.php', 'post', 'cmd=phpFaceDetector&photo='+i+'&user='+g.userid)
                send.done(function(data){
                alert(data);

                });
                */

                // check for tags in photo
                var get_tags_in_photo = __image_to_det.parent()
                    .find('.__tagged');
                if (get_tags_in_photo.length) {
                    var get__this_tag_id = get_tags_in_photo.find('._tagged_user')
                        .attr('id')
                        .split('_')[1];
                    __tags_users_ck.push(get__this_tag_id);

                    if (g.userid === _U.i)
                        get_tags_in_photo.removeClass('__defaultCur')
                        .draggable({
                            containment: "parent"
                        });
                    else {

                        get_tags_in_photo.each(function() {
                            var this_tag_id = $(this)
                                .find('._tagged_user')
                                .attr('id')
                                .split('_')[1];

                            if (this_tag_id === _U.i)
                                get_tags_in_photo.find('#tgu_' + this_tag_id)
                                .parent()
                                .removeClass('__defaultCur')
                                .draggable({
                                    containment: "parent"
                                });
                            get_tags_in_photo.find('#tgu_' + this_tag_id)
                                .find('.tagged_close')
                                .removeAttr('onclick')
                                .off('click.deleteMeFromTags click')
                                .on('click.deleteMeFromTags', function(e) {
                                    e.preventDefault();

                                    $(this)
                                        .closest('section')
                                        .remove();
                                    deleteTagsFromBottom(this, event);
                                    $('#finish_tag_edit').addClass('tg_remove_himself')
                                        .trigger('click');
                                });
                        });

                    }

                }

                $('.photo_viewer_top_sidebar')
                    .addClass('__off');
                $('.photo-layer_panel.__pins')
                    .removeClass('__off')
                    .on(crossEvent, function() {
                        $(this)
                            .addClass('z1');
                    });
                __image_to_det.off('click.tagit')
                    .on('click.tagit', function(e) {
                        var $this = $(this);
                        var offset = $this.parent()
                            .offset();

                        var position = {

                            left: e.pageX - 7 - offset.left,
                            top: e.pageY - 7 - offset.top
                        }

                        var __tag_appendFriends = function() {
                            var __me_tg_fr = '<div class="tag_me fixed_always"><div onclick="return _tagThisUser(this,event);" data-taginfo=\'{"uname":"' + _U.n + '","uid":"' + _U.i + '","uphoto":"' + _U.p + '","ugender":"' + _U.g + '"}\' id="taguinfo_' + _U.i + '" class="__tags_friends_list"><img src="/getPhoto?p=' + _U.p + '&sz=small&g=' + _U.g + '"><span class="utagName">' + _U.n + '</span></div></div>';
                            var __tg_allFriends = '';
                            for (var j = 0; j < __tag_friends.length; j++) {
                                var __f_vr_d = __tag_friends[j];
                                __tg_allFriends += '<div onclick="return _tagThisUser(this,event);" data-taginfo=\'{"uname":"' + __f_vr_d.name + '","uid":"' + __f_vr_d.id + '","uphoto":"' + __f_vr_d.photo + '", "ugender" : "' + __f_vr_d.gender + '"}\' id="taguinfo_' + __f_vr_d.id + '" class="__tags_friends_list"><img src="/getPhoto?p=' + __f_vr_d.photo + '&sz=small&g=' + __f_vr_d.gender + '"><span class="utagName">' + __f_vr_d.name + '</span></div>';
                            }

                            $('section.phlayer_tag:not(.__tagged)')
                                .remove();
                            var tag_markup = $('<section class="phlayer_tag" style="display:block;border-radius: 50%;width:14px;height:14px;background:rgba(0,0,0,0.55);"><div class="phlayer_tags"><div onclick="$(this).closest(\'section\').remove();deleteTagsFromBottom(this,event);" class="close_box_ic"></div><input placeholder="' + lang.whoIsIt + '" onkeyup="showTagAsTextBtn(this,event);" type="text" class="phlayer_tags_input">' + __me_tg_fr + '<div class="sct_tag_my_friends">' + __tg_allFriends + '</div></div></section>')
                                .draggable({
                                    containment: "parent"
                                })
                                .css({
                                    "position": "absolute",
                                    "top": position.top,
                                    "left": position.left
                                });

                            $this.parent()
                                .append(tag_markup)
                                .find('.phlayer_tags_input')
                                .fastLiveFilter('.sct_tag_my_friends', {
                                    timeout: 200,

                                })
                                .focus();
                        }

                        // get friends
                        var __tagP_gFriends = function() {



                            ajaxLoading();

                            ajax_send.tag_friends = jAjax('/cmd.php', 'post', 'cmd=getAllFriends');

                            ajax_send.tag_friends.done(function(data) {

                                removeAjaxLoad();
                                var data = validateJson(data, 1);

                                __tag_friends = data;
                                __tag_appendFriends();
                            });

                        }
                        if (!__tag_friends) __tagP_gFriends();
                        else __tag_appendFriends();



                    })
                    .addClass('tagging');
                $('#boss-gallery')
                    .nobleSlider('destroyTouchSwipe')
                    .nobleSlider('destroyKeyboard');
                // destroy arrows & big like btn
                $('.nb-arrows,#phlayer_big_like_btn').fadeOut();
                $('.nb-full-screen-button').addClass('_hide_always');
                /*
                // detect by php (deprecated)
                var send = jAjax('/cmd.php', 'post', 'cmd=faceDetect&photo='+i+'&user='+g.userid)
                send.done(function(data){
                alert(data);

                });

                			var __image_to_det = $('img.target-photo-'+g.id);

                			//when you hover on a photo
                		//	__image_to_det.mouseenter(function(){

                				
                				//set $(this) in a variable to avoid conflict
                				var $this = __image_to_det;	

                				//find the exact face and make it display:block
                				$($this).parent().find('.face').show();			
                //$(this).load(function(){

                				//find whether the faces are already detected or not
                				//if not then call the faceDetection() to find the faces
                				if(!($($this).hasClass('done'))){
                					var faces = $this.faceDetection({
                					                       error:function(code, message) {
                                    alert('Error: ' + message);
                                },
                						complete:function(faces) {
                							$($this).addClass('done');
                console.log(faces)
                					var marg = 15;
                					for (var i = 0; i < faces.length; i++) {
                                var left   = (faces[i].x - marg),
                                    top    = (faces[i].y - marg),
                                    width  = (faces[i].width  + (marg * 2)),
                                    height = (faces[i].height + (marg * 2));

                               var fc =  $('<div />', {
                                    'class': 'face',
                                    'css': {
                                        'left':   left   * faces[i].scaleX + 'px',
                                        'top':    top    * faces[i].scaleY + 'px',
                                        'width':  width * faces[i].scaleX + 'px',
                                        'height': height * faces[i].scaleY + 'px',
                						'margin-left': $this.css('margin-left'),
                						'margin-top':$this.css('margin-top')
                                    }
                                }).appendTo($($this).parent());
                				
                					}
                							
                						}
                					});

                					
                				}
                			//	});
                			
                			
                		//});


                 
                	  $('body').prepend('<section style="    position: relative;visibility:hidden;opacity:0;    width: 600px;    height: auto;    margin: 20px auto;    border: 10px solid #fff;    box-shadow: 0 5px 5px #000;" id="image_test_for_faces"><img style=" display: block;width: 100%; height: auto;" id="faceDetector_img_ready" src="'+$('#tag-photo-'+i).attr('src')+'"></section>')
                	  .find('#faceDetector_img_ready').load(function(){
                	  setTimeout(function(){
                	     $(this).faceDetection({
                        complete: function (faces) {
                                                    for (var i = 0; i < faces.length; i++) {
                                            $('<div>', {
                                                'class':'face',
                                                'css': {
                                                    'position': 'absolute',
                                                    'left':     faces[i].x * faces[i].scaleX + 'px',
                                                    'top':      faces[i].y * faces[i].scaleY + 'px',
                                                    'width':    faces[i].width  * faces[i].scaleX + 'px',
                                                    'height':   faces[i].height * faces[i].scaleY + 'px'
                                                }
                                            })
                                            .insertAfter(this);
                                        }
                			
                			
                			//$('#image_test_for_faces').remove();
                        },
                		error: function (code, message) {
                    alert(code+'\nMsg:'+message)
                }

                    });
                	},500);
                	});
                	 
                	*/



            });

        // set the photo id to big like button
        phly_big_like_btn.remove();
       // if (g.userid !== _U.i)
            ga('#s_phlayer_big_like_btn')
            .html('<div id="phlayer_big_like_btn" data-callback="phlayerClickBigLike" onclick="return likeClick(this,event);" class="phlayer_like_btn ' + (g.liked_by_me == '1' ? '__active' : '') + '"><i class="ic tico_img ic-klass-big"></i></div>')
            .find('#phlayer_big_like_btn')
            .attr('data-log-click', '{"type":"like","item":"photo","itemid":"' + i + '"}');
        _phlayer_is_own_photo = g.userid;

        // get comments for respective photo
       // getComments(g.id);
	   getPhotoViewerComments(g.id);
	   


        // get tags for respective photo
        getPhotoTags(g.id);

		// check for favorite
		isFavorite(g.id);
		
		
        /// set comments count, shares and likes
        ga('#phly_likes_id')
            .text(g.likes);
        ga('#phly_shares_id')
            .text(0);
        ga('#phly_comments_id')
            .text(g.count_comments);

        // set current photo id
        ga('#phlayer_act_f')
            .val(o_krypt(i));
        ga('#phlayer_act_f2')
            .val(i);

        // set photo description
        ga('#plp_descrCancel').trigger('click');
        ga('#phlayer_photo_descr')
            .html(g.info);

        if (g.uphoto == i) {

            phlayer_crop_photo.attr({
                    'href': '/profile?q=' + uid + '&id=' + i + '&cmd=crop_photo',
                    'title': 'Crop'
                })
                .find('i')
                .removeClass('ic_phly_profilepicture')
                .addClass('ic_phly_crop');

        } else {

            phlayer_crop_photo.attr({
                    'href': '/profile?q=' + uid + '&id=' + i + '&cmd=crop_photo',
                    'title': 'Set as profile picture'
                })
                .find('i')
                .removeClass('ic_phly_crop')
                .addClass('ic_phly_profilepicture');

        }

        // hide options buttons for non-owner of this photo
        if (g.userid !== _U.i) {
			
            phlayer_crop_photo.hide(); // crop btn
            phly_delete_photo.hide(); // delete btn
            phly_rotate_photo.hide(); // rotate btn
            ga('#phlayer_bookmark_photo').show(); // bookmark photo
            ga('#phly_report_photo').show(); // report photo
        } else {
            phlayer_crop_photo.show(); //crop btn
            phly_delete_photo.show(); // delete btn
            phly_rotate_photo.show(); // rotate btn
            ga('#phlayer_bookmark_photo').hide(); // bookmark photo
            ga('#phly_report_photo').hide(); // report photo
        }

		
		
        phlayer_top_editor_menu = !0;
        // insert into localstorage data for undelete respective photo
        localStorage.setItem('phlayer-rotatephoto', i);
        phly_rotate_photo.attr('data-photoc', i);


        phly_delete_photo.attr({
            'href': '/profile?q=' + uid + '&cmd=deletephoto&ph=' + i,
            'data-undophoto': '{"uid":"' + uid + '","pid":"' + i + '","aid":"' + g.paid + '","pfl":"' + g.pfilename + '","ex":"' + g.pext + '","fsize":"' + g.fsize + '","pos":"' + g.ppos + '","ad":"' + g.padded + '"}'
        });
        // insert into localstorage data for undelete respective photo
        localStorage.setItem('phlayer-undophoto', '{"uid":"' + uid + '","pid":"' + i + '","aid":"' + g.paid + '","pfl":"' + g.pfilename + '","ex":"' + g.pext + '","fsize":"' + g.fsize + '","pos":"' + g.ppos + '","ad":"' + g.padded + '"}');

        // photo report
        ga('#phly_report_photo')
            .off('click.photo_report')
            .on('click.photo_report', function(e) {
                var phly_send_obj = {
                    "uid": navuid,
                    "id": i,
                    "type": "photo"
                };
                return windowsPopup('report_photo', phly_send_obj);
            });

        // photo getlink
        ga('#phlayer_get_link')
            .off('click.photo_link')
            .on('click.photo_link', function(e) {
				 
					itemGenerateLink();
            });
			
        // get photo rating
        ajax_send.check_ratings = jAjax('/profile', 'post', 'cmd=check_photo_rate&type=pos&photoid=' + i + (clubid ? '&clubid='+clubid : ''));
        ajax_send.check_ratings.done(function(data) {  
            var data = validateJson(data, 1); 
            var phlayer_bottom_cnt = ga('.photo_layer_bottom_com'),
                phlayer_rating_section = ga('#phlayer_ratings');


            if (data.success) {

                var no_rated_markup = '<div data-photoc-id="' + i + '" data-rateit-u="cmd=rateit&type=pos&itemid=' + i + (clubid ? '&clubid='+clubid : '')+'" class="phlayer_rating_stars '+ (clubid ? 'is_community' : '') +'" id="phlayer_rating_stars"><div class="rate-ex0-cnt __empty ' + (data.photo_owner ? '__stdisabled' : '') + '">\
            		<div id="1" class="rate-btn-1 rate-btn"></div>\
            		<div id="2" class="rate-btn-2 rate-btn"></div>\
            		<div id="3" class="rate-btn-3 rate-btn"></div>\
            		<div id="4" class="rate-btn-4 rate-btn"></div>\
            		<div id="5" class="rate-btn-5 rate-btn"></div>\
        		</div></div>';

                var rated_markup = '<div data-photoc-id="' + i + '" class="phlayer_rating_stars" id="phlayer_rating_stars">\
			<div class="rate-ex0-cnt __rated ' + (data.voted_by_me == 1 ? '__dbld' : '') + '">\
            		<div id="1" class="rate-btn-1 rate-btn"></div>\
            		<div id="2" class="rate-btn-2 rate-btn"></div>\
            		<div id="3" class="rate-btn-3 rate-btn"></div>\
            		<div id="4" class="rate-btn-4 rate-btn"></div>\
            		<div id="5" class="rate-btn-5 rate-btn"></div>\
        		</div></div>';

                var rated_markup =

                    '<div data-photoc-id="' + i + '" ' + (data.voted_by_me == 1 ? 'title="' + lang.your_rate_is.replace('%s', data.my_rate) + '"' : '') + ' class="phlayer_rating_stars __exist_rating ' + (data.voted_by_me == 1 ? '__dbld' : '') + (data.photo_owner ? '__stdisabled' : '') + '" id="phlayer_rating_stars">\
					 <div id="star_already_rated_0_simulator" class="star_bg" style="position: absolute; top: 0px; left: ' + Math.floor(data.rate_bg) + 'px; padding: 0px; margin: 0px; width: 120px; height: 24px; /*z-index: 0; */background-position: -' + Math.floor(data.rate_bg) + 'px 0px;background-repeat: repeat-x;"></div>\
					 <div id="star_already_rated_1_simulator" class="star_bg" style="position: absolute; top: 0px; left: 0px; padding: 0px; margin: 0px; width: ' + data.rate_bg + '%; height: 24px; /*z-index: 1; */background-position: 0px -24px;background-repeat: repeat-x;"></div>\
					 <div onclick="sendRate(this,event,255)" id="star_already_rated_2_simulator" class="star_bg" style="position:absolute;top:0px;left:0px;padding:0;cursor:pointer;margin:0;background-position: 0px -48px;background-repeat: repeat-x;width:0px;height:24px;/*z-index:2;*/"></div>\
					 <div class="phly_rating_inf">' + (data.voted_by_me == 1 ? '<!--<div class="ic tico ic_voted_succ"></div>--->' : '') + '<span class="phly_maxrw">' + data.rate_value + '</span>/5 (from ' + data.rate_times + ' ratings)</div></div>';

                /* '<div class="phlayer_rating_stars" id="phlayer_rating_stars"><div class="rate-result-cnt">\
                                    <div class="rate-bg" style="width:'+data.rate_bg+'%"></div>\
                                    <div class="rate-stars"></div>\
                                    </div></div>';
                */
                //if(!phlayer_rating_section.find('#phlayer_rating_stars').length)

                if (phlayer_rating_section.length)
                    phlayer_rating_section.html(data.rate_times && data.rate_value ? rated_markup : no_rated_markup)
                    .find('.phlayer_rating_stars.__exist_rating')
                    .off('mousemove.alreadyRated')
                    .on('mousemove.alreadyRated', function(e) {
                        if (data.voted_by_me == 1) {
                            $(this)
                                .off('mousemove.alreadyRated');
                            return;
                        }

                        var st_xoff = 0;
                        var flying_stars = ga('#star_already_rated_2_simulator'),
                            flyin_st_z = ga('#star_already_rated_0_simulator'),
                            flyin_st_o = ga('#star_already_rated_1_simulator');

                        var stars_off = e.pageX - flying_stars.offset()
                            .left;
                        if (stars_off >= 1 && stars_off <= 24) {
                            st_xoff = 20;
                            st_yoff = 120;
                            st_zoff = 0;
                        } else if (stars_off >= 24 && stars_off <= 24 * 2) {
                            st_xoff = 40;
                            st_yoff = 100;
                            st_zoff = 1;
                        } else if (stars_off >= 24 * 2 && stars_off <= 24 * 3) {
                            st_xoff = 60;
                            st_yoff = 80;
                            st_zoff = 2;
                        } else if (stars_off >= 24 * 3 && stars_off <= 24 * 4) {
                            st_xoff = 80;
                            st_yoff = 60;
                            st_zoff = 3;
                        } else if (stars_off >= 24 * 4 && stars_off <= 24 * 5) {
                            st_xoff = 100;
                            st_yoff = 40;
                            st_zoff = 4;
                        }
                        flying_stars.css('width', st_xoff + '%');

                        if (!flyin_st_o.data('star-owd'))
                            flyin_st_o.attr('data-star-owd', flyin_st_o.css('width'));
                        flyin_st_o.css('width', '0');

                        if (!flyin_st_z.data('star-ol'))
                            flyin_st_z.attr('data-star-ol', flyin_st_z.css('left'));

                        if (!flyin_st_z.data('star-owd'))
                            flyin_st_z.attr('data-star-owd', flyin_st_z.css('width'));

                        if (!flyin_st_z.data('star-obgpos'))
                            flyin_st_z.attr('data-star-obgpos', flyin_st_z.css('background-position'));

                        flyin_st_z.css({
                            'left': st_zoff * 24 + 'px',
                            'width': st_yoff + 'px',
                            'background-position': st_zoff * 24 + 'px 0'
                        });
                    })
                    .off('mouseleave.alreadyRated')
                    .on('mouseleave.alreadyRated', function(e) {
                        var flying_stars = ga('#star_already_rated_2_simulator'),
                            flyin_st_z = ga('#star_already_rated_0_simulator'),
                            flyin_st_o = ga('#star_already_rated_1_simulator');

                        flyin_st_o.css('width', flyin_st_o.data('star-owd'));
                        flyin_st_z.css({
                            'left': flyin_st_z.data('star-ol'),
                            'width': flyin_st_z.data('star-owd'),
                            'background-position': flyin_st_z.data('star-obgpos')
                        });
                        flying_stars.css('width', '0%');
                    });
            } else {

                phlayer_bottom_cnt.prepend('<div class="phlayer_rating_stars" id="phlayer_rating_stars"><h3>An error occured at receiving rates</h3></div>');

            }

        });

        var ap_im = function(pdata) {

	if(clubid) {
		 
            ga('.pl_right_w')
                .html(m.replace(/%clubid/g, clubid)
					.replace(/%group_logo/g, g.community_logo)
					.replace(/%group_name/g, g.name)
                    .replace(/%group_albumname%/g, g.community_album_name == null ? lang.main_album : g.community_album_name)
                    .replace(/%group_albumid/g, g.community_album_id == null ? '0' : g.community_album_id)
                    .replace(/%group_subcategory/g, g.community_sub_category)
                    .replace(/%group_category/g, g.community_category)
					.replace(/%group_path_to_logo/g, g.community_logo_path)
					.replace(/%padded_time%/g, padded[1])
                    .replace(/%added%/g, padded[0])

                );
		

	} else {
            ga('.pl_right_w')
                .html(m.replace(/%uname%/g, g.fullname)
					.replace(/%albumname%/g, g.albumname != null ? g.albumname : lang.personal_photos)
					.replace(/%albumhref%/g, g.albumname != null ? '/profile?q='+g.uid+'&cmd=album&i='+g.albid+'&nav=photos' : '/photos/'+g.uid)
                    .replace(/%photo%/g, g.uphoto)
                    .replace(/%uage%/g, user_age)
                    .replace(/%ugender%/g, user_gender)
                    .replace(/%location%/g, g.ulocation)
                    .replace(/%uid%/g, g.uid)
                    .replace(/%padded%/g, padded[0])
                    .replace(/%padded_time%/g, padded[1])

                );
	}

        }

        var pdetails = gThisPhotoDetails(ga('.nb-slide[data-slpid="' + i + '"]')
            .find('img'),
            function(img_details) {  
               
            });
			ap_im(); 
    }

    function gThisPhotoDetails(file, callback) {
		
        if (file.attr('src') != preloader) {
            EXIF.getData(file[0], function() {
                var pdt_mk = EXIF.getTag(this, "Make"),
                    pdt_md = EXIF.getTag(this, "Model"),
                    pdt_os = EXIF.getTag(this, "Software"),
                    pdt_dt = EXIF.getTag(this, "DateTimeOriginal"),
                    pdt_xp = EXIF.getTag(this, "PixelXDimension"),
                    pdt_yp = EXIF.getTag(this, "PixelYDimension");
                ////callback([  typeof pdt_xp !== 'undefined' ? pdt_xp : '&minus;', typeof pdt_yp !== 'undefined' ? pdt_yp : '&minus;']);

				if(typeof pdt_mk !== 'undefined')
					ga('#p_make').text(pdt_mk);
			
				if(typeof pdt_md !== 'undefined')
					ga('#p_model').text(pdt_md);
				
				if(typeof pdt_os !== 'undefined')
					ga('#p_os').text(pdt_os);
			
				if(typeof pdt_dt !== 'undefined')
					ga('#p_dtoriginal').text(pdt_dt);
			
				if(typeof pdt_xp !== 'undefined')
					ga('#p_xpx').text(pdt_xp);
				
				if(typeof pdt_yp !== 'undefined')
					ga('#p_ypx').text(pdt_yp);
				
            });
        }

    }

    function timeConverter(UNIX_timestamp) {
        var c = new Date();
        var a = new Date(UNIX_timestamp * 1000);
        var months = [lang.january, lang.february, lang.march, lang.april, lang.may, lang.june, lang.july, lang.august, lang.september, lang.octomber, lang.november, lang.december];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time = date + ' ' + month + ' ' + (year != c.getFullYear() ? year : '');
        return [time, hour + ':' + min];
    }

	// is favorite
	function isFavorite(itemid){
		
		var ajax_send_for_fv = jAjax('/cmd.php', 'post', {  "cmd" : "isfavorite", "categ":"photo", "itemid" : escape(itemid)  });
		ajax_send_for_fv.done(function(data){
			
			if(data > 0){
				
				
				ga('#phlayer_bookmark_photo').replaceWith('<div id="phlayer_bookmark_photo" data-deletebookmark="'+data+'" onclick="return deleteBookmark(event,this,\'photo\');" class="pli" title="Remove from bookmark" data-tipsy-orientation="n" rel="tipsy"><i class="ic tico ic_phly_bookmarked"></i></div>');
			} else {
				
				ga('#phlayer_bookmark_photo').replaceWith('<div id="phlayer_bookmark_photo" data-bookmark=\'{"categ":"photo","itemid":"'+itemid+'"}\' onclick="return bookmarkthis(this,event);" class="pli" title="Bookmark" data-tipsy-orientation="n" rel="tipsy"><i class="ic tico ic_phly_bookmark"></i></div>');
				
			}
			
			
		});
		
	}
		function getPhotoViewerComments(pid){  
		ga('#phlayer-com-emoji').empty(); 

		var s_element = clubid ? ga('#phlayer-com-emoji').addClass('incommunity') : ga('#phlayer-com-emoji'); 

		
				// build comments section
		commentsWidget( ///ga('#phlayer_act_f2').val(),
						pid,
						s_element,
						'photo',
						{'width':'80%','height':'auto','min-height':20,'overflow':'hidden','padding':'3px 74px 2px 7px'},
						ga('#pp_photo_viewer'),
						'#phlayer-com-emoji', uid,'2',1);
	}
    // get comments
    function getComments(photoid, load_prev) {
        var phlayer_comm_space_a = $('.phlayer_ul_comms');
        var phlayer_comm_space = $('.phlayer_ul_comms>ul');

        if (!load_prev) {
            // remove button load previous comments
            $('.comm_previous_load').remove();
            phlayer_comm_space.empty();
        }


        // load comments from array if exists (without call ajax)
        if (typeof phlayer_save_comments[x_krypt(photoid)] != 'undefined' && !load_prev) {
            ga('.phlayer_emoji_input_sticky')
                .removeClass('__nocoms');
            phlayer_comm_space_a.find('.comm_previous_load')
                .remove();
            phlayer_comm_space_a.html(phlayer_save_comments[x_krypt(photoid)].replace(/undefined/g, ''));
            return false;
        }



        var previous_comments_button_markup = '<div class="comm_previous_load" onclick="return _comments_loadPrev(this,event,\'PhotoViewer\');" data-loadcommentsforphi="' + o_krypt(photoid) + '" data-loadmorecomentsin="%CTG%"><i class="ic ic-prev-comments"></i><span>View %C previous comments</span></div>';
        var previous_replies_button_markup = '<div class="comment_previous_replies_btn" data-rreply="%rr%" onclick="return commShowPrevReplies(this,event);"><i class="ic tico_img ic-more-replies"></i><a href="javascript:;">%c replies</a></div>';
        ajax_send.send_for_comm = jAjax('/profile', 'post', 'cmd=' + (load_prev ? 'getPhotoPrevComments' : 'getPhotoComments') + '&type=pos&photoid=' + (load_prev ? photoid : o_krypt(photoid)));
        ajax_send.send_for_comm.done(function(data) { //alert(data);//$('body').prepend('<pre>'+data);return;
            var res = validateJson(data, 1);

            if (res.s != '0') {

                if (res.comm_data.length) {
                    ga('.phlayer_emoji_input_sticky')
                        .removeClass('__nocoms');

                    if (load_prev)
                        load_prev.remove();
                    else
                        phlayer_comm_space.closest('ul')
                        .parent()
                        .find('.comm_previous_load')
                        .remove();

                    for (var i = 0; i < res.comm_data.length; i++) {
                        var data_comm = res.comm_data[i];
                        var reply_comm_d = data_comm.replies;

                        // comments
                        var phlayer_comments_ready = photoViewerGetCommentsMarkup(data_comm.author_id, data_comm.allow_edit, data_comm.updated, data_comm.can_be_edited)
                            .replace('%OPK%', '')
                            .replace(/%DISPLAY%/g, '')
                            .replace(/%comm_id%/g, data_comm.id)
                            .replace(/%comment_date%/g, data_comm.added)
                            .replace(/%comment%/g, data_comm.text)
                            .replace(/%COMMENTS_IN%/g, 'PhotoViewer')
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
                        /*
                        phlayer_comments_ready = $(phlayer_comments_ready);
						
                        phlayer_comments_ready.find('.jb_attach_in_msg').each(function(){
                        	
                        	var $this = $(this);
                        	
                        	$this.attr('data-bgattach',$this.attr('style'));
                        	
                        });*/

                        phlayer_comm_space.prepend(phlayer_comments_ready).find('.jb_attach_in_msg').each(function() {

                            var $this = $(this);

                            $this.attr('data-bgattach', $this.attr('style')).removeAttr('style');

                        });

                        if (!phlayer_comm_space.closest('ul')
                            .parent()
                            .find('.comm_previous_load')
                            .length && data_comm.comments_count > _st.phlayer_comments_limit && !load_prev)
                            phlayer_comm_space.closest('ul')
                            .parent()
                            .prepend(previous_comments_button_markup.replace(/%C/g, parseInt(data_comm.comments_count - _st.phlayer_comments_limit))
                                .replace(/%CTG%/g, 'PhotoViewer'));

                        if (reply_comm_d.length) {

                            var __appended_Comm = phlayer_comm_space.find('li#comment_' + data_comm.id);

                            if (!__appended_Comm.find('ol.comm_replies#repliesfor_' + data_comm.id)
                                .length)
                                __appended_Comm.append('<ol class="comm_replies" id="repliesfor_' + data_comm.id + '"></ol>');

                            for (var k = 0; k < reply_comm_d.length; k++) {

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
                                    .replace(/%COMMENTS_IN%/g, 'PhotoViewer')
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
                                if (k > _st.replies_limit - 1 && reply_comm_d.length - 1 === k)
                                    __appended_Comm.find('ol.comm_replies#repliesfor_' + data_comm.id)
                                    .prepend(previous_replies_button_markup.replace(/%c/g, k - (_st.replies_limit - 1))
                                        .replace(/%rr%/g, '0'));

                                //alert(reply_comm.r_id+'\n'+reply_of_reply_arr.length);

                                // if reply of reply exist, append it
                                if (reply_of_reply_arr.length) {

                                    if (!reply_markup.find('ol.comm_replies#repliesfor_' + reply_comm.r_id)
                                        .length)
                                        reply_markup.append('<ol class="comm_replies __0p" id="repliesfor_' + reply_comm.r_id + '"></ol>');


                                    for (var j = 0; j < reply_of_reply_arr.length; j++) {
                                        var reply_of_reply = reply_of_reply_arr[j];


                                        // reply of reply
                                        var phlayer_reply_of_reply_ready = photoViewerGetCommentsMarkup(reply_of_reply.r_author_id, reply_of_reply.r_allow_edit, reply_of_reply.r_updated, reply_of_reply.r_can_be_edited)
                                            .replace('%OPK%', '')
                                            .replace(/%DISPLAY%/g, 'hidden') ///j > _st.replies_limit-1 ? 'hidden' : '')
                                            .replace(/%comm_id%/g, reply_of_reply.r_id)
                                            .replace(/%comment_date%/g, reply_of_reply.r_added)
                                            .replace(/%comment%/g, reply_of_reply.r_text)
                                            .replace(/%ADDED_TITLE%/g, reply_of_reply.r_long_time_ag)
                                            .replace(/%COMMENTS_IN%/g, 'PhotoViewer')
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

                                        // add button show more replies
                                        ///if(j > _st.replies_limit-1 && reply_of_reply_arr.length-1 === j)
                                        if (reply_of_reply_arr.length - 1 === j)
                                            reply_markup.find('.comm_replies#repliesfor_' + reply_comm.r_id)
                                            .prepend(previous_replies_button_markup.replace(/%c/g, reply_of_reply_arr.length)
                                                .replace(/%rr%/g, '1'));

                                        //alert(reply_comm.r_id+'\n'+reply_of_reply_arr.length+'\n'+reply_markup.find('.comm_replies').html());

                                    } // reply to reply loop
                                }


                            }

                        } // if replies


                    }

                    phlayer_save_comments[x_krypt(photoid)] = phlayer_comm_space_a.html(); //phlayer_comm_space.html();

					
					venobox();
					
                }

            } else ga('.phlayer_emoji_input_sticky')
                .addClass('__nocoms'); //return displayErr(lang.photoViewer_error_loading_comm);

        });

    }

} // else exist photo

// callback after click on big like button
function phlayerClickBigLike(sended_data, rec_obj, $this) {
    var phlayer_likes_count = $('.photo_layer_bottom_com #phly_likes_id');
    var phlayer_num_likes_count = parseInt(phlayer_likes_count.text());
    if (rec_obj.like_action) {
        // plus like, +1
        phlayer_likes_count.text(phlayer_num_likes_count + 1);
        $this.addClass('__active');
        store_photos[sended_data.itemid].liked_by_me = '1';
        store_photos[sended_data.itemid].likes = phlayer_num_likes_count + 1;
    } else {
        // minus like, -1
        phlayer_likes_count.text(phlayer_num_likes_count - 1);
        $this.removeClass('__active');
        store_photos[sended_data.itemid].liked_by_me = '0';
        store_photos[sended_data.itemid].likes = phlayer_num_likes_count - 1;
    }

}

// bottom tags markup
function bottom_tag_markup() {

    return '<span id="plp_pinnedTrigger_%uid%" class="js-pin-trigger" data-id="%pin_id%"><span class="tag">' +
        '<span class="tag_tx"><%atag% href="/profile?q=%uid%" hrefattr="true">%uname%</%atag%>' +
        '<span style="display:%allow_tag_delete%" onclick="return deletePhotoTag(this,event,\'%uid%\');" data-id="%pin_id%" class="js-del-pin-trigger tag_del_w"> <i class="fader"></i> <span class="tag_del ic_close-cs1 ic10"></span></span>' +
        '</span></span></span>';

}

// get tags
function getPhotoTags(pid) {

    var _tag_markup = '<section class="phlayer_tag __tagged __defaultCur" style="display: block;z-index: 1; border-radius: 50%; width: 14px; height: 14px; position: absolute; top: %p_top%px; left: %p_left%px; background: rgba(0, 0, 0, 0.55);">' +
        '<div class="_tagged_user" id="tgu_%uid%"><div class="tagged_uinfo">' +
        '<div onclick="$(this).closest(\'section\').remove();deleteTagsFromBottom(this,event);" class="tagged_close ic"></div>' +
        '<img src="/getPhoto?p=%uphoto%&sz=small&g=%ugender%"><span class="tuname ellip">%uname%</span></div></div></section>';

    var bottom_tag_pin = bottom_tag_markup();

    if (!pid) return;

    ajax_send.getPhotoTags = jAjax('/cmd.php', 'post', 'cmd=getPhotoTags&photoid=' + escape(pid));
    ajax_send.getPhotoTags.done(function(data) { //alert(data)
        if (data == 0) return;
        else if (data == 1) {
            $('.phlayer_tag.__tagged.__defaultCur')
                .remove();
            $('.phlayer_bottom_tags')
                .hide()
                .find('tgdt')
                .empty();
        } else {

            data = validateJson(data, 1);

            for (var i = 0; i < data.length; i++) {
                var r = data[i];

                $('.nb-slide[data-slpid="' + pid + '"] .nb-image-container')
                    .prepend(
                        _tag_markup
                        .replace(/%p_top%/g, r.p_top)
                        .replace(/%p_left%/g, r.p_left)
                        .replace(/%uid%/g, r.userid)
                        .replace(/%uphoto%/g, r.uphoto)
                        .replace(/%ugender%/g, r.ugender)
                        .replace(/%uname%/g, r.uname)
                    );


                $('.phlayer_bottom_tags')
                    .show()
                    .find('tgdt')
                    .append(
                        bottom_tag_pin
                        .replace(/%uid%/g, r.userid)
                        .replace(/%pin_id%/g, r.pin_id)
                        .replace(/%uname%/g, r.uname)
                        .replace(/%allow_tag_delete%/g, r.photo_owner === _U.i ? '' : 'none')
                        .replace(/%atag%/g, r.userid.indexOf('as-text') != -1 ? 'atag' : 'a')
                    );

            }

        }

    });


}

// delete tag from photo
function deletePhotoTag(el, ev, uid) {
    ev.preventDefault();

    var $el = ga(el);
    $el.closest('.js-pin-trigger')
        .remove();
    ga('section #tgu_' + uid)
        .closest('section')
        .remove();
    ga('button#finish_tag_edit').addClass('__ear')
        .trigger('click');


}

// finish tagging
function finishTagging(el, ev) {
    ev.preventDefault();
    var $el = $(el),
        tg_remove_himself = $el.hasClass('tg_remove_himself') ? '1' : '',
        _t_obj = {};
    var ear = $el.hasClass('__ear') ? 1 : '';
    var tagging_in_slide = $('.nb-slide.nb__active');
    var __t_photo = tagging_in_slide.data('slpid');
    tagging_in_slide.find('.phlayer_tag.__tagged')
        .removeClass('ui-draggable ui-draggable-handle')
        .addClass('__defaultCur')
        .each(function(i) {
            var $this = $(this);
            var __t_position_top = $this.css('top')
                .replace('px', ''),
                __t_position_left = $this.css('left')
                .replace('px', '');
            var __t_user = $this.find('._tagged_user')
                .attr('id')
                .split('_')[1];

            if (__t_user.indexOf('as-text') != -1)
                _t_obj[i] = {
                    pos_top: __t_position_top,
                    pos_left: __t_position_left,
                    user: __t_user,
                    uname: $this.find('.tuname').text(),
                    photo: __t_photo

                };
            else
                _t_obj[i] = {
                    pos_top: __t_position_top,
                    pos_left: __t_position_left,
                    user: __t_user,
                    photo: __t_photo

                };

        });

    //alert(__tags_users_ck);

    $el.removeClass('__ear').addClass('curDefault')
        .text(lang.Please_wait);

    var afterTagDoneClick = function() {

        $el.removeClass('curDefault tg_remove_himself')
            .text(lang.Done);


        $('.photo_viewer_top_sidebar')
            .removeClass('__off');
        $el.closest('.photo-layer_panel.__pins')
            .removeClass('z1')
            .addClass('__off').on(crossEvent, function() {
                $(this).removeClass('z1');
            });
        tagging_in_slide.find('img.tagging')
            .removeClass('tagging')
            .off('click.tagit');
        $('#boss-gallery')
            .nobleSlider('initTouchSwipe')
            .nobleSlider('initKeyboard');

        // restore arrows & big like btn
        $('.nb-arrows,#phlayer_big_like_btn').fadeIn();
        $('.nb-full-screen-button').removeClass('_hide_always');

    }

    if (!__tags_users_ck.length && !ear) return afterTagDoneClick();
    ajaxLoading();
    ajax_send.savePhotoTags = jAjax('/cmd.php', 'post', 'cmd=saveTaggsInPhoto&removeHimself=' + tg_remove_himself + '&byu=' + escape(_U.i) + '&photo=' + escape(__t_photo) + '&tags=' + JSON.stringify(_t_obj));
    ajax_send.savePhotoTags.done(function(data) {

        removeAjaxLoad();
        afterTagDoneClick();

        if (data == 2) jboxNotice(lang.tags_is_under_review.replace('%s', $('.photo-layer_info_w a.ucard_info_name')
            .html()), 'right', 'bottom', '#000'); //displayErr(lang.not_permision_to_update_tag);


    });
}


// get tagged user markup
function taggedUMarkup() {

    var _tagged_u_markup = '<div class="_tagged_user" id="tgu_%tid%"><div class="tagged_uinfo"><div onclick="$(this).closest(\'section\').remove();deleteTagsFromBottom(this,event);" class="tagged_close ic"></div><img src="%tphoto%"><span class="tuname ellip">%tuname%</span></div></div>';

    return _tagged_u_markup;

}

// tag user
function _tagThisUser(el, ev) {

    ev.preventDefault();
    var curr_tagging_photo = $('.nb-slide.nb__active');
    var $el = $(el);
    var _tag_udata = $el.data('taginfo');

    if (curr_tagging_photo.find('#tgu_' + _tag_udata.uid)
        .length)
        return jboxNotice(lang.tagging_user_already_tagged, 'right', 'bottom', 'red');

    $('.phlayer_tags')
        .replaceWith(
            taggedUMarkup()
            .replace(/%tid%/g, _tag_udata.uid)
            .replace(/%tphoto%/g, '/getPhoto?p=' + _tag_udata.uphoto + '&sz=small&g=' + _tag_udata.ugender)
            .replace(/%tuname%/g, _tag_udata.uname)
        );
    $('.phlayer_tag')
        .addClass('__tagged');
    $('.phlayer_bottom_tags')
        .show()
        .find('tgdt')
        .append(
            bottom_tag_markup()
            .replace(/%uid%/g, _tag_udata.uid)
            .replace(/%pin_id%/g, '')
            .replace(/%uname%/g, _tag_udata.uname)
            .replace(/%allow_tag_delete%/g, '')
            .replace(/%atag%/g, _tag_udata.uid.indexOf('as-text') != -1 ? 'atag' : 'a')
        );
    __tags_users_ck.push(_tag_udata.uid);
}

// delete bottom tags
function deleteTagsFromBottom(el, ev) {
    ev.preventDefault();
    var $el = $(el);
    var tag_uid = $el.closest('._tagged_user')
        .attr('id')
        .split('_')[1];
    ga('#plp_pinnedTrigger_' + tag_uid)
        .remove();
    delete __tags_users_ck[__tags_users_ck.pindexof(tag_uid)];
}

// show button tag as text
function showTagAsTextBtn(el, ev) {
    ev.preventDefault();
    var __tag_box = $('.phlayer_tags');
    var btn_shtxt = '<div class="plpp_add_text_c" id="plpp_add_text_c">' +
        '<button class="plpp_add_text button-pro __def __wide" id="plpp_add_text">' + lang.tag_add_as_text + '</button></div>';

    if (!$.trim($(el).val())) return __tag_box.find('#plpp_add_text_c').remove();

    if (!__tag_box.find('#plpp_add_text_c').length)
        __tag_box.append(btn_shtxt).find('button#plpp_add_text').off('click.tagAsText').on('click.tagAsText', function(e) {
            e.preventDefault();
            var __random_id = 'as-text-' + (new Date()).getTime();
            $('.phlayer_tags')
                .replaceWith(
                    taggedUMarkup()
                    .replace(/%tid%/g, __random_id)
                    .replace(/%tphoto%/g, '/getPhoto?p=0&sz=small')
                    .replace(/%tuname%/g, el.value)
                );
            ga('.phlayer_tag')
                .addClass('__tagged');
            $('.phlayer_bottom_tags')
                .show()
                .find('tgdt')
                .append(
                    bottom_tag_markup()
                    .replace(/%uid%/g, __random_id)
                    .replace(/%pin_id%/g, '')
                    .replace(/%uname%/g, el.value)
                    .replace(/%allow_tag_delete%/g, '')
                    .replace(/%atag%/g, 'atag')
                );
            __tags_users_ck.push(__random_id);

        });

}
