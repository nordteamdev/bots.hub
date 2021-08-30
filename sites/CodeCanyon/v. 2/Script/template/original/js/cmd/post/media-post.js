var _selectedLinks = {};
var __selectableSongs = {};
var _r_all_images = {};
var pr_nx_image = {};
var captured_thumb_video = [];
var _polldb = { options: {} };
var p_place;
var vd_cover_selected = '<div class="vd slider_i_success"><span class="tico c-green"><i class="tico_img ic ic_ok"></i></span></div>';

function postUploadPhotosSkema() {


    return '<div id="post_upload_%s" data-postshpid class="ec_items __uploading notOvr soh-s">' +
        '<div class="eg_gotph">' +
        '<div class="uploading_ovr"></div>' +
        '<div class="ph disabling-layer"><span class="photo-sc_i_utility_delete-status"></span>' +
        '<div class="photo-sc_i_utility_undo-delete"><a id="restore_recent_upload" onclick="restorePhoto(this,event)" href="#" class="il">' + lang.restore_photo + '</a></div></div>' +
        '<a class="ic10 ic10_close ic_delete_min foh-s tico_img" style="display:none;" id="delete_recent_upload" title="' + lang.delete_photo + '" onclick="deletePhoto(this,event)" href="#"></a>' +
        // '<div class="img_fak"></div>' +
        '<img src="" class="img_fak" border="0" />' +
        //'<span class="selectable-card_ovr"></span><span class="selectable-card_ic"></span>'+
        '<div class="ucard-b_tx_cnt __uploadingInfo">' + lang.uploading + '<div class="bold fs-13 mw170 ellip">%s</div></div>' +

        '<div class="pup_bar_m_upload">' +
        '<div class="main_progress_photo"></div>' +
        '</div>' +
        '</div></div>';

}
function postUploadPhotosSkemaCommunity() {


    return '<div id="post_upload_%s" data-postshpid class="ec_items __uploading notOvr soh-s">' +
        '<div class="eg_gotph">' +
        '<div class="uploading_ovr"></div>' +
        '<div class="ph disabling-layer"><span class="photo-sc_i_utility_delete-status"></span>' +
        '</div>' +
'<a class="ic10 ic10_close ic_delete_min foh-s tico_img icommunity" style="display:none;" id="delete_recent_upload" title="' + lang.delete_photo + '" onclick="var evt = event,_that = this;event.preventDefault();event.stopPropagation();return confirm_act(\''+lang.community_confirm_delete_picture+'\',function(){deletePhoto(_that,evt)});" href="javascript:void(0);"></a>' +
        // '<div class="img_fak"></div>' +
        '<img src="" class="img_fak" border="0" />' +
        //'<span class="selectable-card_ovr"></span><span class="selectable-card_ic"></span>'+
        '<div class="ucard-b_tx_cnt __uploadingInfo">' + lang.uploading + '<div class="bold fs-13 mw170 ellip">%s</div></div>' +

        '<div class="pup_bar_m_upload">' +
        '<div class="main_progress_photo"></div>' +
        '</div>' +
        '</div></div>';

}
function postUploadPhotosSkemaCommunityAlbum() {
var random_id = randomIntFromInterval(11, 99);
return '<div id="community_upload_%s" class="ce11 soh-s" href="javascript:void(0);">\
<div class="uploading_ovr"></div>\
  <img class="img_fak" border="0" />\
	<a href="javascript:void(0);" style="display:none;" class="ic10 ic10_close ic_delete_min foh-s tico_img icommunity" id="delete_recent_upload" title="' + lang.delete_photo + '" onclick="var evt = event,_that = this;event.preventDefault();event.stopPropagation();return confirm_act(\''+lang.community_confirm_delete_picture+'\',function(){deletePhoto(_that,evt)});"></a>\
  <div class="comm_upload_photo_descr"><textarea class="icommunity itx__placeholder itx" recent-upl="true" id="up_txt_'+random_id+'" onclick="expand_txt_up(this,'+random_id+',event)" placeholder="'+lang.add_descr+'" maxlength="255" name="descr" cols="16" rows="1"></textarea></div>\
  <div class="ucard-b_tx_cnt __uploadingInfo">' + lang.uploading + '<div class="bold fs-13 mw170 ellip">%s</div></div>\
  <div class="pup_bar_m_upload">\
  <div class="main_progress_photo"></div>\
  </div>\
 </div>';
 
 
}
///////////////////////
//
// video upload
////////////////////

function postUploadVideoSkema() {


    return '<div id="vdpost_upload_%s" class="ec_items vd __uploading notOvr soh-s">' +
        '<div class="eg_gotph">' +
        '<div class="post_video_dur"></div>' +
        '<div class="uploading_ovr"></div>' +
        '<div class="ph disabling-layer vd"><span class="photo-sc_i_utility_delete-status vd"></span>' +
        '<div class="photo-sc_i_utility_undo-delete"><a id="restore_recent_upload_vd" onclick="restoreVideo(this,event)" href="#" class="il">' + lang.restore_photo + '</a></div></div>' +
        '<a class="ic10 ic10_close ic_delete_min foh-s tico_img" style="display:none;" id="delete_recent_upload" title="' + lang.delete_video + '" onclick="deleteVideo(this,event)" href="#"></a>' +
        '<div style="display:none;" class="vd_cover"></div>' +
        '<div class="upl_movie_ic tico_img"></div>' +
        '<div class="ucard-b_tx_cnt __uploadingInfo"><div class="bold fs-13 mw170 ellip">%s</div></div>' +

        '<div class="pup_bar_m_upload">' +
        '<div class="main_progress_photo"></div>' +
        '</div>' +
        '</div></div>';

}

function postUploadVideoSkemaCommunity () {
	
    return '<div id="vdpost_upload_%s" class="ec_items vd __uploading notOvr soh-s icommunity">' +
        '<div class="eg_gotph">' +
        '<div class="post_video_dur"></div>' +
        '<div class="uploading_ovr"></div>' +
        '<div class="ph disabling-layer vd"><span class="photo-sc_i_utility_delete-status vd"></span>' +
		'</div>' +
        '<a class="ic10 ic10_close ic_delete_min foh-s tico_img" style="display:none;" id="delete_recent_upload" title="' + lang.delete_video + '" onclick="deleteVideo(this,event,1)" href="#"></a>' +
        '<div style="display:none;" class="vd_cover"></div>' +
        '<div class="upl_movie_ic tico_img"></div>' +
        '<div class="ucard-b_tx_cnt __uploadingInfo"><div class="bold fs-13 mw170 ellip">%s</div></div>' +

        '<div class="pup_bar_m_upload">' +
        '<div class="main_progress_photo"></div>' +
        '</div>' +
        '</div></div>';
}
function postUploadVideoSkemaCommunityAlbum(){
	
	var random_id = randomIntFromInterval(11, 99);
return '<div id="community_upload_video_%s" class="ce11 soh-s"  href="javascript:void(0);">\
 <img border="0" src="/videoCover?v=0&clubid=0&corr=1" class="club-item" />\
 <div class="comm_fake_vd_cover" style="Background-image:url(/videoCover?v=0&clubid=0&playic=1);"></div>\
 <a href="javascript:void(0);" style="display:none;" class="ic10 ic10_close ic_delete_min foh-s tico_img icommunity" id="delete_recent_upload" title="' + lang.delete_video + '" onclick="var evt = event,_that = this;event.preventDefault();event.stopPropagation();return confirm_act(\''+lang.community_confirm_delete_video+'\',function(){deleteVideo(_that,event,1)});"></a>\
  <div><i class="vid-card_duration">--:--</i></div>\
  <div class="vd_wll_prof_title ellip">%s</div>\
</div>';
 


	
}
/* Attach files from post textarea */
function post_build_vid_upload(ev,c_files) {

    var input = ga(ev.target);
    var files = c_files || input[0].files;
    var vdContent = ga('.post_up_videos');


    for (var i = 0; i < files.length; i++) {




        var
            file_ext = files[i].name.split('.').pop().toLowerCase();

        if ($.inArray(file_ext, _st.videoTypes) == -1 && $.trim(file_ext)) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            ga('.atch_cont .ec_items.__uploading').remove();
            edUpload();
            return displayErr(lang.up_invalid_file_ext.replace('%s', _st.videoTypes));
        }

        if (files.length > _st.maxVideoFilesUpload) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            edUpload();
            return displayErr(lang.up_maximumFiles.replace('%s', _st.maxVideoFilesUpload));
        }
		if(input.hasClass('in-album')){

			ga('#community_pictures_wall').prepend(jprintf( postUploadVideoSkemaCommunityAlbum(), i, files[i].name));
			 communityAlbumPicturesWall(1);
        }else if ( !input.hasClass('icommunity')) vdContent.prepend(jprintf(postUploadVideoSkema(), i, files[i].name));
		else vdContent.prepend(jprintf(postUploadVideoSkemaCommunity(), i, files[i].name));
    }
    edUpload(1);
    postShareVideo(files, input, ev);

}

function postShareVideo(files, input, evt) {


    var fr_i = {};
    var count = 0;
    var totalFiles = files.length;
	var _el = input;
	var in_community = _el.hasClass('icommunity'), in_albums = input.hasClass('in-album');
	var is_post = _el.closest('#community_add_post').hasClass('is_comm_post');
	
    var trigger_attachUp = function() {

        if (typeof files[count] === 'undefined' || count > totalFiles - 1) {
            ga('section#post_btmm_btnss').show();
            edUpload();
            return false;
        }

        var formData = new FormData();
        formData.append('files[]', files[count]);
		
		if(in_community) {
			
		formData.append('cmd', 'add-video');
		formData.append('albumid', escape(input.data('albumid')));
		formData.append('id', escape(input.data('clubid')));
		if(is_post) formData.append('is_post', 1);
		} else {
        formData.append('request', 'upload');
		
		}
		
        $.ajax({
            url: in_community ? '/communities.php' : _st.uploadVideoFile,
            type: 'POST',
            xhr: function() { // Custom XMLHttpRequest
                var Xhr = $.ajaxSettings.xhr();
                if (Xhr.upload) { // Check if upload property exists
                    Xhr.upload.addEventListener('progress', function(e) {

                        var p_cont = ga('#vdpost_upload_' + count + ' .main_progress_photo');
                        if (e.lengthComputable) {

                            var p_percentage = Math.round((e.loaded / e.total) * 100);
                            p_cont.css('width', p_percentage + '%');

                        }




                    }, false); // For handling the progress of the upload
                }
                return Xhr;
            },
            //Ajax events
            beforeSend: function() {
				/*
				if(in_albums){


				
				
				var _vd_markup = ga('#community_upload_video_' + count);
				_vd_markup.find('video').prop('src',files[count].name);
				var generateVideoThumbPreview = function (){
					var canvas = _vd_markup.find('.comm_album_vd_canvas')[0];
					var video = _vd_markup.find('video')[0];
					canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
					return canvas.toDataURL("image/png");
				}
				
				// generate thumbnail preview
				_vd_markup.find('img').attr('src',generateVideoThumbPreview());
				
                }*/
				
				ga('section#post_btmm_btnss').hide();
            },
            success: function(data) { 
                var response = validateJson(data);

                if (response['status'] === 'OK') {
                    var vid = response.videoid;
                    fr_i[vid] = 1;


                    var video_frames = '<section class="video_uploaded_slider" id="frames_vd_' + vid + '"><video crossorigin="anonymous" style="display:none;" controls="false" id="video_' + vid + '" width="720" height="405">\
									<source src="' + response.src + '"></source>\
									</video>\
									<canvas style="display:none;" id="canvas_' + vid + '"></canvas>\
									<div class="vd_thumbs_cnt" id="thumbnailContainer_' + vid + '"></div></section>';
                    var container = in_albums ? ga('#community_upload_video_' + count) : ga('#vdpost_upload_' + count);
                    // var u_image = container.find('img');
                    container.attr('data-postshvid', response['videoid']);
                    //jb_attach_uploads.push(response['photoid']);
                    //u_image.attr({'src':'/getPhoto?p='+response['photoid']+'&sz=small&v'+(new Date()).getTime()});
                    // container.children(':first').addClass('selectable-card __selected').attr({'data-photoc': response['photoid'], 'onclick': 'jb_uploaded_attach_click(event,this)', 'id': 'abidal_'+response['photoid']});
                    
					if(in_community) {
						
						
					container.find('#delete_recent_upload').removeAttr('style').attr('href', '/communities.php?userid=' + (response['userid']) 
					+ '&id='+escape(input.data('clubid'))+'&filename='+response['filename']+'&cmd=delete-video&videoid=' + response['videoid']);
						
					} else {
					container.find('#restore_recent_upload_vd').attr('href', '/cmd.php?q=' + (response['userid']) + '&cmd=restoreVideo&vid=' + response.videoid);
                    container.find('#delete_recent_upload').removeAttr('style').attr('href', '/cmd.php?q=' + (response['userid']) + '&cmd=deletevideo&vd=' + response['videoid']);
                    }
					
					container.find('.pup_bar_m_upload').remove();
                    container.find('.post_video_dur,.vid-card_duration').text(response['vd_dur']);
					if(in_albums)container.find('.vd_wll_prof_title').text(response.title);
                    container.find('div:first').append('<div id="frames_vd_' + vid + '" class="frames_processing">\
														<div class="frames_loading_ic"></div>\
														</div>');
                    container.append(video_frames);

                    // get video thumbs
                    var fr_video = document.getElementById('video_' + vid);
                    var w, h, ratio;
                    var generateThumbnail = function(i) {
                        var thecanvas = document.getElementById('canvas_' + vid);

                        //generate thumbnail URL data
                        var context = thecanvas.getContext('2d');
                        //context.drawImage(fr_video, 0, 0, 720, 405);

                        var vd_thumbs_cnt = ga('#thumbnailContainer_' + vid);
                        var create_slider = '<div id="nb-nearby-' + vid + '" class="nobleSlider">\
									<div class="nb-slides"></div></div>';
						
						if(in_community){
						 var thumbs_mk = '<div onclick="setVideoCover(event,this,' + vid + ',\''+escape(input.data('clubid'))+'\');" data-setdefaultcover="1" class="nb-slide __vd_hv_cv">\
								 <div class="slider_i_cover"><div class="slider_i_cover_tx">' + lang.Make + '<br>' + lang.cover + '</div></div>\
								 <img class="nb-image" src="'+_THEME+'/css/images/blank.gif" \
									data-src="%img" \
								 />\
								 </div>';	
							
						} else {
                        var thumbs_mk = '<div onclick="setVideoCover(event,this,' + vid + ');" data-setdefaultcover="1" class="nb-slide __vd_hv_cv">\
								 <div class="slider_i_cover"><div class="slider_i_cover_tx">' + lang.Make + '<br>' + lang.cover + '</div></div>\
								 <img class="nb-image" src="'+_THEME+'/css/images/blank.gif" \
									data-src="%img" \
								 />\
								 </div>';
						}
						
						
                        // Calculate the ratio of the video's width to height
                        ratio = fr_video.videoWidth / fr_video.videoHeight;
                        // Define the required width as 100 pixels smaller than the actual video's width
                        w = fr_video.videoWidth - 100;
                        // Calculate the height based on the video's width and the ratio
                        h = parseInt(w / ratio, 10);
                        // Set the canvas width and height to the values just calculated
                        thecanvas.width = w;
                        thecanvas.height = h;

                        // Define the size of the rectangle that will be filled (basically the entire element)
                        context.fillRect(0, 0, w, h);
                        // Grab the image from the video
                        context.drawImage(fr_video, 0, 0, w, h);

                        var dataURL = thecanvas.toDataURL();

                        if (!vd_thumbs_cnt.find('.nobleSlider').length)
                            vd_thumbs_cnt.html(create_slider);


                        //create img
                        //var img = document.createElement('img');
                        //img.setAttribute('src', dataURL);
                        var vvd_img = ga(thumbs_mk.replace('%img', dataURL));
                        vd_thumbs_cnt.find('.nb-slides').append(vvd_img);

                        return dataURL;
                        //append img in container div
                        //document.getElementById('thumbnailContainer_'+vid).appendChild(img);
                    }
                    fr_video.addEventListener('loadeddata', function() {

                        fr_video.currentTime = fr_i[vid];

                    }, false);

                    fr_video.addEventListener('seeked', function() {

                        /// now video has seeked and current frames will show
                        /// at the time as we expect
                        var img_data = generateThumbnail(fr_i[vid]);

                        /// when frame is captured, increase
                        fr_i[vid] += 10;
                        var _this = this;

                        // send first capture 
                        if (!(captured_thumb_video.indexOf(vid) > -1)) {
                            createVideoCapture(vid, img_data, ( in_community ? escape(input.data('clubid')) : '' ) );
                            captured_thumb_video.push(vid);
                            _this.img_active = img_data;
                        }


                        /// if we are not passed end, seek to next interval
                        if (fr_i[vid] <= fr_video.duration) {
                            /// this will trigger another seeked event
                            fr_video.currentTime = fr_i[vid];

                        } else {
							
                            /// DONE!, build slider
                            ga('#nb-nearby-' + vid).nobleSlider({
                                _SLIDER_BEZIER_ENGINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)', // bezier function
                                _SLIDE_ANIMATION_DURATION: 300, // miliseconds
                                _TOUCH_SWIPE_TRESHOLD: 10,
                                _TOUCH_SWIPE_SPEED_RATIO: 0.65,
                                _ENABLE_TOUCH_SWIPE: false,
                                _SLIDES_SPACING: 10,
                                _IMAGE_TO_CENTER: true,
                                _SLIDER_WIDTH: '100%', 
                                //_LOAD_ALL_IMAGES : true,
                                _IMAGE_SCALE_MODE: 'fit-for-smaller',
                                _SLIDER_HEIGHT: in_albums ? '100%' : 225,
                                //_ALLOW_FULL_SCREEN:true,
                                //_LARGE_IMAGES_ON_FULL_SCREEN:true,
                                //_IMG_SMALL_SIZE: 1000,
                                //_IMG_MEDIUM_SIZE: 1600,
                                //_IMG_LARGE_SIZE: 1000,
                                _SLIDE_LOOP: true,
                                //_AUTO_PLAY_SLIDE:true,
                                _ENABLE_PAGINATION: false,
                                _ENABLE_ARROWS: true,
                                //_ASPECT_RATIO: 1.5,
                                _VISIBLE_DIMENSION: '100%',
                                init: function() {
                                    ga('#thumbnailContainer_' + vid).css({
                                        'position': 'absolute',
                                        'visibility': 'visible',
                                        /*'margin-top': '-113px',*/
										'height':'100%',
										'top':'0',
                                        'opacity': '1'
                                    });
                                    ga('#frames_vd_' + vid).remove();
                                    ga('canvas#canvas_' + vid).hide();
                                    var cc_vvvd_img = ga('.nb-image[data-default="' + _this.img_active + '"]');
                                    cc_vvvd_img.before(vd_cover_selected);
									
                                    cc_vvvd_img.parent().parent().addClass('__selected');
                                }

                            });

                        }

                    }, false);


                    container.append('<div class="vd_add_descr_field" id="vd_' + vid + '"><input type="text" name="vd_title" value="' + response.title + '" placeholder="' + lang.title + '..." class="vd_title_field"><textarea name="video_descr" placeholder="'+lang.about_video+'" class="vd_descr_txt textarea-auto-resize"></textarea><ul class="tagit"></ul></div>')
                        .find('.vd_add_descr_field').off('click').on('click', 'input,textarea,[contenteditable]', function(e) {
                            e.preventDefault();

                            var $this = ga(this);
                            if ($this.prop('nodeName') == 'TEXTAREA') {
                                $this.addClass('__maximize');
                                auto_rsz($this);
                            } else if ($this.hasClass('vd_tags')) {
                                e.stopPropagation();
                                var $this = $(this);

                                $this.find('.cedit_placeholder').remove();


                            }
                            if ($this.parent().parent().prop('nodeName') == 'UL') {

                                if (!$this.parent().parent().parent().find('.btn-save-vd-descr').length)
                                    $this.parent().parent().parent().append('<button '+ (in_community ? 'data-clubid="'+escape(input.data('clubid'))+'"' : '') +' onclick="saveVdInfo(this,event);" class="btn-save-vd-descr flat_button">' + lang.save + '</button><br/><div class="err_sp_dsp"></div>');

                            } else {
                                if (!$this.parent().find('.btn-save-vd-descr').length)
                                    $this.parent().append('<button '+ (in_community ? 'data-clubid="'+escape(input.data('clubid'))+'"' : '') +' onclick="saveVdInfo(this,event);" class="btn-save-vd-descr flat_button">' + lang.save + '</button><br/><div class="err_sp_dsp"></div>');
                            }
                            $this.off('click');

                        });
                    ga(".tagit").tagit({
                        fieldName: "vdTags",
                        animate: false,
                        autocomplete: {
                            delay: 0,
                            minLength: 2
                        },
                        placeholderText: lang.tags + '...',
                        singleField: true,
                        beforeTagAdded: function(event, ui) {
                            ga('.tagit-new>input').removeAttr('placeholder');
                        }
                    });
                    setTimeout(function() {
                        ga('.tagit-new').css('maxlength', 25);
                    }, 1000);
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

/* Attach files from post textarea */
function post_build_upload(ev,c_files) {


    var input = ga(ev.target);
    var files = c_files || input[0].files;
    var phContent = ga('.post_up_photos');


    for (var i = 0; i < files.length; i++) {




        var
            file_ext = files[i].name.split('.').pop().toLowerCase();

        if ($.inArray(file_ext, _st.photoTypes) == -1 && $.trim(file_ext)) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            ga('.atch_cont .ec_items.__uploading').remove();
            edUpload();
            return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
        }

        if (files.length > _st.maxFilesUpload) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            edUpload();
            return displayErr(lang.up_maximumFiles.replace('%s', _st.maxFilesUpload));
        }

		
		if(input.hasClass('in-album')){

			ga('#community_pictures_wall').prepend(jprintf(postUploadPhotosSkemaCommunityAlbum(), i, files[i].name));
			
		} else if(input.hasClass('icommunity')){
		   
		   phContent.prepend(jprintf(postUploadPhotosSkemaCommunity(), i, files[i].name));
		   
	   } else {phContent.prepend(jprintf(postUploadPhotosSkema(), i, files[i].name));}
    }
    edUpload(1);
    postSharePhotos(files, input, ev);

}

// upload photos from post
function postSharePhotos(files, input, evt) {
	
	var _el = ga(evt.target);
	var in_community = _el.hasClass('icommunity'), 
		in_albums = input.hasClass('in-album');
	var is_post = _el.closest('#community_add_post').hasClass('is_comm_post');
    var readAttach = function(o) {

        //var input = event.target;

        var reader = new FileReader();
        reader.onload = function() {
            var dataURL = reader.result;

            var container = in_albums ? ga('#community_upload_'+o) : ga('#post_upload_' + o);
            var output = container.find('img')[0]; //container.find('.img_fak')[0];

            if (container.length == 0) return false;

            output.src = dataURL;
            // output.style.backgroundImage = 'url('+dataURL+')';
			if(in_albums) communityAlbumPicturesWall(1);
            container.find('.__uploadingInfo').addClass('__off');
            container.find('.uploading_ovr').addClass('__on');
            setTimeout(function() {
                container.find('.uploading_ovr.__on,.pup_bar_m_upload').remove();
            }, 1500);

        };

        reader.readAsDataURL(files[o]);

    }

    var count = 0;
    var totalFiles = files.length;
    var jb_rd_btn = ga('.jb_ready_btn'),
        jb_files_to_app = ga('.jb_attached_files');

		var popup = 'community';
		var cf = files.length;
		var pBar = getUploadBar(popup, cf);
		var finished_file = 1;
		var _calc_fil = 100/parseInt(totalFiles);
		var trigger_attachUp = function() {

        if (typeof files[count] === 'undefined' || count > totalFiles - 1) {
            ga('section#post_btmm_btnss').show();
            edUpload();
            return false;
        }

        var formData = new FormData();
        formData.append('files[]', files[count]);
		
		if( in_community ) {
		formData.append('cmd', 'addphotos');	
		formData.append('id', escape(_el.data('clubid')));	
		formData.append('albumid', escape(_el.data('albumid')));
		if(is_post) formData.append('is_post', 1);
		} else {
		
        formData.append('request', 'upload');
        formData.append('where', 'album');
        formData.append('mode', 'main');
        formData.append('albid', '0');
        formData.append('to_album', 'misce');
		
		}

		
		
        $.ajax({
            url: in_community ? '/communities.php' : _st.uploadFile,
            type: 'POST',
            xhr: function() { // Custom XMLHttpRequest
                var Xhr = $.ajaxSettings.xhr();
                if (Xhr.upload) { // Check if upload property exists
                    Xhr.upload.addEventListener('progress', function(e) {

                        var p_cont = ga('#community_upload_' + count + ' .main_progress_photo');
                        if (e.lengthComputable) {

                            var p_percentage = Math.round((e.loaded / e.total) * 100);
                            p_cont.css('width', p_percentage + '%');
							
			if(in_albums) {

			
		if (_calc_fil*finished_file < 100)
			{
				pBar.find('.progress_photo')
					.css('width', _calc_fil*finished_file + '%')
					.closest(pBar)
					.find('.percentage_elaps')
					.text(_calc_fil*finished_file + '%');
			}
			else
			{
				pBar.find('._atcompl')
					.css('visibility', 'visible');
				pBar.find('.progress_photo')
					.css('width', '100%')
					.closest(pBar)
					.find('.percentage_elaps')
					.html('<div class="upload_complete _waiting ic50 tico_img"></div>');
			}
			
			}
								
                        }




                    }, false); // For handling the progress of the upload
                }
                return Xhr;
            },
            //Ajax events
            beforeSend: function() {
				
				if(in_albums) pBar.css('visibility', 'visible');
				
                ga('section#post_btmm_btnss').hide();
                readAttach(count);
				
            },
            success: function(data) {
                var response = validateJson(data);

                if (response['status'] === 'OK') {
					finished_file++;
					
					if(in_albums) {
						var _txt_area = ga('#community_upload_' + count).find('textarea');
						_txt_area.data({'fileid':response['photoid'],'clubid':input.data('clubid')});
						auto_rsz(_txt_area);
					
					var progressBarTimeout;
				var removeProgressBar = function ()
				{
					progressBarTimeout = setTimeout(function ()
					{
						pBar.remove();
					}, 8000);
				}
					pBar.find('.site_ovr,.uploadTextCenterInf')
					.hide();
				pBar.hover(function ()
				{
					clearTimeout(progressBarTimeout);
				}, function ()
				{
					removeProgressBar();
				});
				removeProgressBar();
					}
					
					
					
					
					
                    var container = in_albums ? ga('#community_upload_'+count) : ga('#post_upload_' + count);
                    var u_image = container.find('img');
                    container.attr('data-postshpid', response['photoid']);
                    //jb_attach_uploads.push(response['photoid']);
                    u_image.attr({
                        'src': in_community ? '/clubpicture?i=' + response['photoid'] + '&size='+ (in_albums ? 'medium' : 'small') +'&clubid='+ response.clubid +'&v' + (new Date()).getTime() : '/getPhoto?p=' + response['photoid'] + '&sz=small&v' + (new Date()).getTime()
                    });
					
					
					if( in_community ){
						
						////switch( _el.data('album') ){
							
							///case 'main':
							
					/*
					container.find('#restore_recent_upload').attr('href', '/communities?pic=' + response['photoid'] 
					+ '&userid=' + (response['userid']) 
					+ '&cmd=return-pic&albumid=' 
					+ (response['albumid']) 
					+ '&filename=' 
					+ (response['filename']) 
					+ '&type=' 
					+ (response['extension']) 
					+ '&size=' + (response['filesize']) 
					+ '&added=' + response['added']);
					
					*/
					
                    container.find('#delete_recent_upload').removeAttr('style').attr('href', '/communities?userid=' + (response['userid']) 
					+ '&cmd=delete-pic&filename='+response['filename']+'&id='+response['clubid']+'&picid=' + response['photoid']);
                    
							
							////break;
							
							
							
						///}
						
						
					} else {
					
					
                   
				   // container.children(':first').addClass('selectable-card __selected').attr({'data-photoc': response['photoid'], 'onclick': 'jb_uploaded_attach_click(event,this)', 'id': 'abidal_'+response['photoid']});
                    container.find('#restore_recent_upload').attr('href', '/profile?pid=' + response['photoid'] + '&q=' + (response['userid']) + '&cmd=phreturn&i=' + (response['albumid']) + '&phf=' + (response['filename']) + '&ex=' + (response['extension']) + '&fsz=' + (response['filesize']) + '&pos=0&ad=' + response['added']);
                    container.find('#delete_recent_upload').removeAttr('style').attr('href', '/profile?q=' + (response['userid']) + '&cmd=deletephoto&ph=' + response['photoid']);
                    

					
					}
					
					setTimeout(function() {
                        container.removeAttr('id');
                        count++;
                        trigger_attachUp();
                    }, 50);
					
                } else return displayErr(data);

            },
            error: function() {pBar.remove();
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

//remove attach link
function removeLkAttach(e, o) {
    e.preventDefault();
    var $o = ga(o);
    var pppid = $o.parent().find('img').data('ppid');
    var $lk = $o.data('lk');
    var $lk_id = $o.attr('id').split('.')[0];

    ga('.post_url_preview#u-' + $lk_id).slideUp('fast',function() {
        ga(this).remove()
    });
    delete fetchedUrls[fetchedUrls.indexOf($lk)];
    delete _selectedLinks[$lk];

    /*
    ajaxLoading();
    var send = jAjax('/cmd.php', 'post', {cmd:'deletePostAttachedPhoto', pid:escape(pppid)})
    send.done(function(d){
    	removeAjaxLoad();
    	if(d == 1){

    	} else displayErr(lang.err_tehnic);
    });*/
}

/* fetch url
----------*/
function postFetchUrl(url, id) {

    var urlContainer = ga('.post_url_link');
	var is_community = urlContainer.closest('#community_add_post');
	var clubid = is_community.hasClass('is_comm_post') ? is_community.data('id') : '';
    var delete_X = '<span data-lk="' + url + '" id="' + id + '.close" onclick="removeLkAttach(event,this);" class="ic10 ic10_close posting-form_sctn_del foh-s"></span>';
    var urlPreview = '<div class="post_url_preview soh-s" id="u-' + id + '">' + delete_X + '<div id="lk_prev_cnt"><div class="url_prev_loading"></div></div></div>';
    if (!urlContainer.find('.post_url_preview#u-' + id).length)
        urlContainer.prepend(urlPreview);
    else
        urlContainer.find('.post_url_preview#u-' + id).replaceWith(urlPreview);
    urlPreview = urlContainer.find('.post_url_preview#u-' + id + ' #lk_prev_cnt');

    var send = jAjax('/cmd.php', 'post', {cmd:'fetchUrl','url':url,'clubid':clubid ? escape(clubid) : ''});
    send.done(function(data) {
		
        urlPreview.empty();

        if (data == 0) return urlPreview.html('<div class="err_attach_link">' + lang.failed_attach_link + '<a href="javascript:;" onclick="return postFetchUrl(\'' + url + '\',\'' + id + '\');"><div class="err_attach_reload"><i class="ic ic-retry"></i> ' + lang.Retry + '</div></a></div>');
        else {

            var obj = validateJson(data);

            if (obj.type == 'image') {
                ///urlPreview.parent().addClass('__image').append('<div class="preview-only-image"><img data-ppid="'+obj.photoid+'" class="post_url_only_image" src="/getPhoto?p='+obj.photoid+'&sz=thumb"></div>');
                //var data = obj;
                //data.url = url;
                //data.site_name = url_domain(url);
                //_selectedLinks[url] = JSON.stringify(data);
                //postAttachedPhotosByLink.push(obj.photoid);
                urlPreview.parent().remove();
                var photoFromLinkMarkup = '<div data-postshpid="' + obj.photoid + '" class="ec_items __uploading notOvr soh-s">\
										<div class="eg_gotph">\
										<div class="ph disabling-layer"><span class="photo-sc_i_utility_delete-status"></span>\
										<div class="photo-sc_i_utility_undo-delete"><a id="restore_recent_upload" onclick="restorePhoto(this,event)" href="/profile?pid=' + obj.photoid + '&q=' + _U.i + '&cmd=phreturn&i=' + obj.phalbum + '&phf=' + obj.phFilename + '&ex=' + obj.phext + '&fsz=' + obj.phsize + '&pos=0&ad=' + obj.phadded + '" class="il">Restore</a></div>\
										</div>\
										<a class="ic10 ic10_close ic_delete_min foh-s tico_img" id="delete_recent_upload" title="Delete photo" onclick="deletePhoto(this,event)" href="/profile?q=' + _U.i + '&cmd=deletephoto&ph=' + obj.photoid + '"></a><img src="/getPhoto?p=' + obj.photoid + '&sz=small" class="img_fak" border="0">\
										</div>\
										</div>';
										
				var communityPhotoMarkup = '<div data-postshpid="' + obj.photoid + '" class="ec_items __uploading notOvr soh-s">\
											<div class="eg_gotph">\
											<div class="ph disabling-layer"><span class="photo-sc_i_utility_delete-status"></span>\
											</div>\
											<a class="ic10 ic10_close ic_delete_min foh-s tico_img icommunity" id="delete_recent_upload" title="Delete photo" onclick="deletePhoto(this,event)" href="/communities?userid=' + _U.i + '&cmd=delete-pic&filename='+obj['phFilename']+'&id='+obj['clubid']+'&picid=' + obj.photoid+'"></a>\
											<img src="/clubpicture?i=' + obj.photoid + '&size=small&clubid='+ obj.clubid +'&v' + (new Date()).getTime()+'" class="img_fak" border="0">\
											</div>\
											</div>';	

										
                ga('.post_up_photos').prepend(clubid ? communityPhotoMarkup : photoFromLinkMarkup);
                return;
            }
            if (obj.type == 'video') {
                //urlPreview.parent().addClass('__video').append('<div><div class="preview-link-has-video __onlyvid"><div class="vid-card__m"><div class="vid_play"></div></div></div><div class="video-prv-cover" style="background-image:url('+obj.image+');"></div><div class="video-title-c">'+obj.title+'</div></div>');
                ///	var data = obj;
                //data.url = data.url == undefined ? url : data.url;
                //data.site_name = data.site_name == undefined ? url_domain(url) : data.site_name;
                ///_selectedLinks[url] = JSON.stringify(data);
                urlPreview.parent().remove();
               
			if(clubid)
				   ga('.post_up_videos').prepend('<div class="shared-video-fr-ext ec_items vd soh-s icommunity" data-postshvid="' + obj.vd_id + '"><div class="vid-card__m"><div class="vid_play mm"></div></div>\
			        <div class="uploading_ovr"></div>\
					<div class="post_video_dur">' + obj.vd_dur + '</div>\
			<a class="ic10 ic10_close ic_delete_min foh-s tico_img" id="delete_recent_upload" title="' + lang.delete_video + '" onclick="deleteVideo(this,event,'+obj.clubid+')" href="/communities.php?userid=' + _U.i + '&id='+obj.clubid+'&cmd=delete-video&extern=1&videoid=' + obj.vd_id + '"></a>\
			<div class="video-prv-cover" style="background-image:url(/videoCover?v=' + obj.vd_id + '&clubid='+obj.clubid+');"></div>\
			<div class="video-title-c">\
			<div class="vd_title_bt_txt ellip">' + obj.vd_title + '</div>\
			</div></div>');
			else
			   ga('.post_up_videos').prepend('<div class="shared-video-fr-ext ec_items vd soh-s" data-postshvid="' + obj.vd_id + '"><div class="vid-card__m"><div class="vid_play mm"></div></div>\
			        <div class="uploading_ovr"></div>\
					<div class="post_video_dur">' + obj.vd_dur + '</div>\
					<div class="ph disabling-layer vd"><span class="photo-sc_i_utility_delete-status vd"></span>\
				<div class="photo-sc_i_utility_undo-delete"><a id="restore_recent_upload_vd" onclick="restoreVideo(this,event)" href="/cmd.php?q=' + _U.i + '&cmd=restoreVideo&vid=' + obj.vd_id + '" class="il">' + lang.restore_photo + '</a></div></div>\
			<a class="ic10 ic10_close ic_delete_min foh-s tico_img" id="delete_recent_upload" title="' + lang.delete_video + '" onclick="deleteVideo(this,event)" href="/cmd.php?q=' + _U.i + '&cmd=deletevideo&amp;vd=' + obj.vd_id + '"></a>\
			<div class="video-prv-cover" style="background-image:url(/videoCover?v=' + obj.vd_id + ');"></div><div class="video-title-c"><div class="vd_title_bt_txt ellip">' + obj.vd_title + '</div></div></div>');
                return;
            }


            var _r_all_img = new Array();
            var all_images = obj.all_images;
            var c_all_images = typeof all_images != 'undefined' ? all_images.length : 0;
            var data = obj;

            if (obj.image !== undefined) _r_all_img.push(obj.image);
            for (var i = 0; i < c_all_images; i++) {
                _r_all_img.push(all_images[i]);

            }
            var _s_images_markup = '<div class="media-photos_ac"><span data-itimg="' + id + '" class="ic media-photos_ac_i _flleft __disabled ic_i_arrow-l __left"></span><span data-itimg="' + id + '" class="ic _flleft __right media-photos_ac_i ic_i_arrow-r"></span><span class="preview-link-im-count _flright" id="n_count_' + id + '"><span class="preview-df-count">1</span> / ' + _r_all_img.length + '</span><!--<span class="media-photos_ac_close __removeCollage ic ic_close-w-nh"></span>--></div>';


            _r_all_images[id] = {
                orig_image: obj.image !== undefined ? obj.image : '',
                all_images: _r_all_img
            };
            pr_nx_image[id] = 0;

            console.log(_r_all_images);
            var all_images = _r_all_images;
            var all_images_count = typeof all_images != 'undefined' ? all_images.length : 0;
            var enableNextPrevImages = function() {

                // previous image
                urlPreview.find('.__left').off('click').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var _Img_id = parseInt($this.data('itimg'));
                    var pr_num_count = urlPreview.find('.preview-df-count');

                    urlPreview.find('.__right').removeClass('__disabled');
                    if (pr_nx_image[id] <= 0) {
                        $(this).addClass('__disabled');

                        ///alert(pr_nx_image[id] +'>='+ _r_all_images[_Img_id]['all_images'].length)
                        return;
                    }
                    pr_nx_image[id] = parseInt(pr_nx_image[id]) - 1;
                    pr_num_count.text(parseInt(pr_num_count.text()) - 1);
                    var prev_img_src = _r_all_images[_Img_id]['all_images'][pr_nx_image[id]];


                    $('img#cl_i_' + _Img_id).attr('src', prev_img_src);
                    // update image in json data
                    var link_data = validateJson(_selectedLinks[url]);
                    link_data.image = prev_img_src;
                    _selectedLinks[url] = JSON.stringify(link_data);
                });
                // next image
                urlPreview.find('.__right').off('click').on('click', function(e) {

                    e.preventDefault();
                    var $this = $(this);
                    var _Img_id = parseInt($this.data('itimg'));
                    var pr_num_count = urlPreview.find('.preview-df-count');
                    urlPreview.find('.__left').removeClass('__disabled');
                    if (pr_nx_image[id] >= _r_all_images[_Img_id]['all_images'].length - 1) {
                        $(this).addClass('__disabled');

                        ///alert(pr_nx_image[id] +'>='+ _r_all_images[_Img_id]['all_images'].length)
                        return;
                    }

                    pr_nx_image[id] = parseInt(pr_nx_image[id]) + 1;
                    pr_num_count.text(parseInt(pr_num_count.text()) + 1);
                    var next_img_src = _r_all_images[_Img_id]['all_images'][pr_nx_image[id]];

                    //alert(next_img_src);
                    $('img#cl_i_' + _Img_id).attr('src', next_img_src);
                    // update image in json string
                    var link_data = validateJson(_selectedLinks[url]);
                    link_data.image = next_img_src;
                    _selectedLinks[url] = JSON.stringify(link_data);

                });

            }
            if (obj.image !== undefined || _r_all_img.length) {
                ///$('.preview-image-thumb').attr('style', "background-image: url('"+ obj.image +"')");
                urlPreview.append('<div class="link-preview-image-thumb">' + (c_all_images > 0 ? _s_images_markup : '') + (obj.type == 'video' ? '<div class="preview-link-has-video"><div class="preview-v-play-ic"></div></div>' : '') + '<img id="cl_i_' + id + '" src="' + _r_all_img[0] + '"></div>');
                enableNextPrevImages();

            } else {
                //$('.preview-image-thumb').attr('style', 'background-image: url(media/no-image.jpg)');
                urlPreview.append('<div class="link-preview-image-thumb __noimage">' + (c_all_images > 0 ? _s_images_markup + '<img id="cl_i_' + id + '">' : '') + '</div>');
                enableNextPrevImages();
            }

            if (obj.title) {
                urlPreview.append('<div class="preview-info-cnt"></div>');
                urlPreview.find('.preview-info-cnt').append('<div class="link-preview-title ellip textWrap">' + obj.title + '</div>');
            }

            if (obj.description) {
                //$('.preview-description').text(obj.description);
                urlPreview.find('.preview-info-cnt').append('<div class="link-preview-description textWrap">' + obj.description + '</div>');
            }
            if (obj.site_name) {
                urlPreview.find('.preview-info-cnt').append('<div class="link-preview-site-name textWrap"><a href="/r?u=' + obj.url + '">' + obj.site_name + '</a></div>');
            } else {
                urlPreview.find('.preview-info-cnt').append('<div class="link-preview-site-name textWrap"><a href="/r?u=' + url + '">' + url_domain(url) + '</a></div>');
                data.site_name = url_domain(url);
                data.url = url;
            }
            _selectedLinks[url] = JSON.stringify(data);

        }
    });

}
/*
 add post
----------- */
function setStatus(btn, e, emoj, sType) {
    e.preventDefault();

    var sub_ajax = {};
    var tagged_people_n_post = [];
    var $btn = ga(btn),
        txtarea = emoj,
        vl = txtarea.parent().find('textarea').val(),///txtarea[0].innerText || txtarea[0].textContent, //textarea.html().replace(/&nbsp;/g,' '),
        msg = ga('#message_status_per'),
        sType = sType || '';
		
		var clubid = $btn.closest('#community_add_post');
		
		clubid = clubid.length ? clubid.data('id') : false;
 
		var community_purl = clubid ? '&clubid='+escape(clubid) : '';
		
    // content for sharing photos;
    var postPhotosContent = ga('.post_up_photos');
    var postSongsContent = ga('.post_add_songs > ul');
    var postLinksContent = ga('.post_url_link');
    var postVideosContent = ga('.post_up_videos');
    var checked_as_status = clubid ? '' : (ga('input[name="post_as_status"]').is(':checked') ? '&post_as_status=1' : '');
	var is_bg_color = ga('#bgcolor-post').val() == 'true' ? ga('#bgcolor-post').attr('class') : 0;
	
    /*
        // when toggle textarea, remove error message
        var _st_i = setInterval(function() {
            if (textarea.height() < 100) {
                clearInterval(_st_i);
                msg.empty()
            }
        }, 1000);
    */

		// check for bg colors
	if(is_bg_color) {
		    if (!$.trim(vl)) {
 
        return txtarea.focusEnd();

    }
		vl = vl.replace(lang.bg_color_write_post, '');
		vl = '[postBg]' + vl +'[postBgColor]'+ is_bg_color + '[/postBgColor][/postBg]';
		
		sType = 'bgcolor';
		
	}

	else {
	
	
	

    // check for share photos
    if (postPhotosContent.find('.ec_items').length) {
        var photos_arr = [];
        // post contain photos
        postPhotosContent.children().each(function() {
            var $this = $(this);
            var postPhotoId = escape($this.data('postshpid'));
            if (!$this.find('.disabling-layer').hasClass('__on')) {
                vl += '[postPhoto]' + postPhotoId + '[/postPhoto]';
                photos_arr.push(postPhotoId);
                sub_ajax['share_photos'] = photos_arr;
            }
        });

        sType = 'photo';
    }



    // check for videos
    if (postVideosContent.children().length) {
        var videos_arr = [];
        // post contain photos
        postVideosContent.children().each(function() {
            var $this = $(this);
            var postVidId = escape($this.data('postshvid'));
            if (!$this.hasClass('__deleted')) {
                vl += '[postVideo]' + postVidId + '[/postVideo]';
                videos_arr.push(postVidId);

            }
            if (videos_arr.length)
                sub_ajax['share_videos'] = videos_arr;
        });

        sType = 'videos';


    }

    // check for songs
    if (postSongsContent.children().length) {
        var songs_arr = [];
        // post contain songs
        postSongsContent.children().each(function() {
            var $this = $(this);
            var postSongId = escape($this.attr('id').split('-')[1]);

            vl += '[postSong]' + postSongId + '[/postSong]';

            songs_arr.push(postSongId);
            sub_ajax['share_songs'] = songs_arr;
        });

        sType = 'songs';
    }
	
	// check for poll
	if(ga('#poll_markup').length){
		var first_option = ga('.poll_options_04a:first');
		if(!_polldb.hasOwnProperty('question'))
		return ga('[name="poll_question"]').addClass('err').focus();
		else if( !(Object.keys(_polldb.options).length >= 2) )
			return !$.trim(first_option.val()) ? first_option.addClass('err').focus() 
					: 
					first_option.closest('.poll_options').find('input:eq(1)').addClass('err').focus();
		else
		{
			// ok, lets build the poll

            var pollData = {
                cmd: 'newPoll',
				polldata: JSON.stringify(_polldb)
            };
		       $.ajax({
                url: '/cmd.php',
                async: false,
                type: 'post',
                data: pollData,
                success: function(id) {
                   if(id > 0) vl += '[poll]' + id + '[/poll]';
                }
            });
			
		}
		
		sType = 'poll';
	}

    // check for links
    if (Object.keys(_selectedLinks).length) {
        var links_arr = [];
        for (var k in _selectedLinks) {
            var gLinkMarkup = _selectedLinks[k];

            var sd = {
                cmd: 'shareLink',
                lnk: k,
                obj: gLinkMarkup

            };
            //var insertLink = jAjax('/cmd.php','post',sd);
            $.ajax({
                url: '/cmd.php',
                async: false,
                type: 'post',
                data: sd,
                success: function(id) {
                    vl += '[postLink]' + id + '[/postLink]';
                    links_arr.push(id);
                }
            });



        }

        if (links_arr.length)
            sub_ajax['share_links'] = links_arr;

        _selectedLinks = {};
        sType = 'links';
    }

    // check for places tag
    if (p_place && $('._location').length) {

        vl += '[postPlace]' + p_place + '[/postPlace]';

        sType = 'place';


        sub_ajax['share_places'] = p_place;

        if (!taggedPeopleDb.length) remove_all_post_tags(1);
    }

    // check for tagged people
    if (taggedPeopleDb.length) {
        var people_tag_arr = [];
        for (var i = 0; i < taggedPeopleDb.length; i++) {
            vl += '[postTag]' + taggedPeopleDb[i] + '[/postTag]';
            people_tag_arr.push(taggedPeopleDb[i]);
            tagged_people_n_post.push(taggedPeopleDb[i]);
        }
        if (people_tag_arr.length)
            sub_ajax['share_tg_people'] = people_tag_arr;

        sType = 'tag';
        remove_all_post_tags(1);
    }
	
	}

    if (!$.trim(vl)) {
        //msg.text(lang.enter_something_st);
        return txtarea.focusEnd();
        /*        textarea.on('keypress', function() {
                    msg.empty()
                }).focus();*/
    }

	

    var send = jAjax('/profile', 'post', 'q=' + vl + checked_as_status + community_purl + '&categ=' + sType + '&cmd=pStatus&type=pos&view_as=json');
    ajaxLoading();


    send.done(function(r) {  
        var res = validateJson(r);

        unbindRemainOnSite();
        removeAjaxLoad();

        if (res && res['response'] != 'OK') {
            return displayErr(res['response']);
        } else {

            if (tagged_people_n_post.length) {
                var p_mm_data = {
                    cmd: 'sendNotifToTaggedPeople',
                    post: res.id,
                    friends: tagged_people_n_post
                };
                var sd = jAjax('/cmd.php', 'post', p_mm_data);
            }
            postPhotosContent.empty();
            postSongsContent.empty();
            txtarea.empty();
			_polldb = {options: {}};
            ///$(document).trigger('click');
            if(!clubid) clickOnHome();
			else ga('#autoclickclub').trigger('click');
        }


    });



}
// remove post
function hideCurStatus(obj, evt) {
    evt.preventDefault();

    var $obj = $(obj);
    var st_id = $obj.attr('id').split('.')[1];
    var s = jAjax('/profile', 'post', 'cmd=hideStatus&i=' + escape(st_id) + '&type=pos');
    s.done(function(d) {
        if (d != '1') return displayErr(d);
        else $('#hook_Block_MiddleColumnTopCard_StatusNew').remove();

    });


}

// remove poll option 
function removePollOption(evt) {

    evt.preventDefault();
    var _this = ga(evt.target);
	var _parent_dv = _this.closest('.medadd_c_polla_wr');
    _parent_dv.remove();
    delete _polldb.options[_parent_dv.find('input').attr('id')];
	
	
//	console.log(_polldb);
}

// update poll question
function updatePollQuestion(evt){
	$.trim(ga(evt.target).val()) ? _polldb.question = ga(evt.target).val() : delete _polldb['question'];
}

//update poll options (add/remove options)
function updatePollOptions(evt){
	var _p_option = ga(evt.target);

	
	$.trim(_p_option.val()) ? _polldb.options[_p_option.attr('id')] = _p_option.val() : delete _polldb.options[_p_option.attr('id')];

	
}
// remove border error for poll inputs on blurred
function removePollinputErr(evt){
	
	evt.preventDefault();
	var _this = ga(evt.target);
	
	if($.trim(_this.val()))
		_this.removeClass('err');
	
}
// create poll
function postAddPoll(evt) {

    evt.preventDefault();
    var _this = ga(evt.target);
    var _poll_space = ga('.post_poll');
    var delete_poll_option = '<div class="foh-s page_media_x_wrap medadd_c_pollrem" title="Remove option" onclick="return removePollOption(event);"><div class="page_media_x"></div></div>';
    var _poll_markup = '<section id="poll_markup" class="poll_markup_hidden">\
							<div class="poll01a">'+lang.poll_question+'</div>\
							<div class="page_media_x_wrap bpll0 inl_bl" title="Remove attachment" onclick="postAddPoll(event);"><div class="page_media_x"></div></div>\
							<div class="poll02a"><textarea onkeyup="updatePollQuestion(event);" onblur="removePollinputErr(event);" class="poll03a" name="poll_question"></textarea></div>\
							<div class="poll01a">'+lang.poll_options+'</div>\
							<div class="poll_options">\
							<div class="medadd_c_polla_wr soh-s"><input id="1" value="" onblur="removePollinputErr(event);" onkeyup="updatePollOptions(event);" type="text" class="poll_options_04a" />' + delete_poll_option + '</div>\
							<div class="medadd_c_polla_wr soh-s"><input id="2" value="" onblur="removePollinputErr(event);" onkeyup="updatePollOptions(event);" type="text" class="poll_options_04a" />' + delete_poll_option + '</div>\
							</div>\
							<div class="medadd_c_polladd_wr" id="poll_fkinput_add_opt"><div class="medadd_c_polladd poll_options_04a fakeinput">'+lang.poll_add_option+'</div></div>\
							</section>';
	var p_opts_id = 2;
    if (!_poll_space.children().length) {

        _this.addClass('active');
        // build poll
		_polldb = {options: {}};
        _poll_space.html(_poll_markup).find('#poll_fkinput_add_opt').off('click.poll_addoption').on('click.poll_addoption', function(e) {

            e.preventDefault();
			
			if(ga('.poll_options').children().length > 14) return modernPopup(function(){},1,'Sorry, you can not add more than 14 options.');
			
            var p_opts = ga('#poll_markup').find('.poll_options');
			p_opts_id++;
            p_opts.append('<div class="medadd_c_polla_wr soh-s"><input value="" onblur="removePollinputErr(event);" id="'+p_opts_id+'" onkeyup="updatePollOptions(event);" type="text" class="poll_options_04a" />' + delete_poll_option + '</div>');
            p_opts.find('.medadd_c_polla_wr:last>input').focus();

        });
        _poll_space.find('#poll_markup').slideDown();

    } else {

        _this.removeClass('active');
        // remove poll
        _poll_space.find('#poll_markup').slideUp(function(){_poll_space.empty();});
    }
}

// add songs
function postAddSongs(ev, obj) {

    ev.preventDefault();
    ev.stopImmediatePropagation();
    var $this = ga(obj);

    stop_expand_post_area = true;
    var dcont = '<div id="modal_main" class="modal_main">\
    <div id="modal_cnt" class="modal_cnt">\
        <ul class="cardsList photoPeopleLike">\
        </ul>\
    </div>\
</div>';
    var song_ul_markup = '<div class="mus_playlist-add_h">\
    <div class="jcol-l">\
        <div class="mus_tabs">\
            <span class="mus_tabs_i __active __mymusic">\
                <span class="mus_tabs_i_a">' + lang.my_music + '\
                </span>\
            </span>\
            <span class="mus_tabs_i">\
                <span class="mus_tabs_i_a">\
                  <span>' + lang.selected + '\
                  </span>\
            <span class="mus_tabs_i_a_count">0</span> </span></span>\
        </div>\
    </div>\
    <div class="jcol-r">\
        <div class="mus_playlist-add_search">\
            <input id="jb_m_livesearch" placeholder="Search for music" class="it vl_it mus_playlist-add_livesearch">\
            <span class="mus_playlist-add_searchicon">\
              </span>\
        </div>\
    </div>\
</div>\
<div class="mus_playlist-add_cnt">\
    <div class="mus_playlist-add_tracks nano" style="height: 365px;">\
        <div class="mus_playlist-add_lst nano-content">\
            <ul></ul>\
        </div>\
    </div>\
    <div class="mus_playlist-add_shadow m_hidden">\
    </div>\
	<div class="form-actions __center"> <a class="flat_button form-actions_yes __disabled">Add</a><a class="flat_button secondary">Cancel</a> </div>\
</div>';
    var x_delete_song_ic = '<a href="javascript:;" class="delete_songf425" onclick="return false;"><i class="x_del_blue hv-opac"></i></a>';
    var x_add_song_ic = '<div class="mus-tr_right-controls foh-s"><span class="mus-tr_add"></span></div>';
    var song_markup = '<li id="tr-%songid%"> <div class="mus-tr_i __selectable soh-s %selected%" id="s-%songid%">\
                        <div class="mus-tr_hld">\
                            <span onclick="event.preventDefault();event.stopPropagation();nobilMusicPlayOutsideTrack(this,event);" class="track_play __play js-track_play __mus_out" id="' + _U.i + '_%songid%" data-track-inf=\'{"track":"%filename%","cover":"%cover%","artist":"%artist%","songname":"%song_name%","albumname":"%album%"}\' title="Play">\
                      </span>\
                            <div class="mus-tr_cnt">\
                                <span class="mus-tr_artist">%artist%</span>\
								&nbsp;-&nbsp;\
                                <span class="mus-tr_song">%song_name%</span>\
                            </div>\
                            <div class="mus-tr_right-controls foh-s">\
								%right_ikon\
                        </span>\
                            </div>\
                        </div>\
                    </div>\
                </li>';

    var repositionJBpopup = function() {

        //jb__;

    }
    var musTabSelectorStartNanoScroll = function() {
        ga(".mus_playlist-add_cnt .nano").nanoScroller();
    };
    ga('<div/>').addClass('sct').appendTo(ga('body'));
    var jb_ = new jBox('Modal', {
        appendTo: ga('.sct'),
        title: lang.j_modal_post_select_tracks,
        overlay: true,
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': true,
        blockScroll: true,
        height: 'auto',
        width: '530px',
        minHeight: '100px',

        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        },
        onClose: function() {
            prn_modal();
        }
    }).setContent(song_ul_markup);
    jb_.open().ajax({
        type: 'POST',
        url: '/cmd.php',
        data: {
            cmd: 'postSelectTracks'
        },
        reload: true,
        setContent: false,
        success: function(data) { //alert(data);
            var jCont = ga('.jBox-content');
            var _selectedSongsdb = {};
            var mymusic_data = '',
                jbdoneTyping_Interval, bloclAddSClick = !1;
            if (data == 0) return displayErr(lang.err_tehnic);
            else {
                var a = data == 1 ? lang.youDosentHaveSongs : validateJson(data);

                if ($('.post_add_songs>ul').children().length) {
                    jCont.find('a.flat_button:first').removeClass('__disabled');
                    jCont.find('.mus_tabs_i_a_count').text(parseInt(ga('.post_add_songs>ul').children().length));
                    for (var j in __selectableSongs)
                        _selectedSongsdb[j] = __selectableSongs[j];
                } else __selectableSongs = [];


                if (data != 1)
                    for (var b = 0; b < a.length; b++) {
                        var res = a[b];

                        var _m_song_markup = song_markup.replace(/%selected%/g, (typeof __selectableSongs[res.id] != 'undefined' ? '__selected' : ''))
                            .replace(/%album%/g, res.album)
                            .replace(/%songid%/g, res.id)
                            .replace(/%filename%/g, res.filename)
                            .replace(/%artist%/g, res.artist)
                            .replace(/%right_ikon/g, x_add_song_ic)
                            .replace(/%song_name%/g, res.title)
                            .replace(/%cover%/g, res.cover);
                        var _m_song_mark_local = _m_song_markup.replace(/__selected/g, '');
                        // for(var k in _selectedSongsdb)
                        /// c_songs_ul.find('#s-'+k).addClass('__selected');
                        jCont.find('.mus_playlist-add_lst>ul').append(_m_song_markup);
                        mymusic_data += _m_song_mark_local;
                    }
                else jCont.find('.mus_playlist-add_lst>ul').html(a);

                musTabSelectorStartNanoScroll();

                var __acdcSong = function($s) {
                    var jbsong_id = $s.attr('id').split('-')[1];
                    var count_selected = jCont.find('.mus_tabs_i_a_count');
                    var _selected_count = parseInt(count_selected.text());

                    if ($s.hasClass('__selected')) {
                        $s.removeClass('__selected');

                        delete _selectedSongsdb[jbsong_id];
                    } else {
                        $s.addClass('__selected');
                        _selectedSongsdb[jbsong_id] = $s.closest('li')[0].outerHTML;
                    }
                    if (Object.keys(_selectedSongsdb).length) {
                        jCont.find('a.flat_button:first').removeClass('__disabled');
                    } else
                        jCont.find('a.flat_button:first').addClass('__disabled');

                    count_selected.text(parseInt(Object.keys(_selectedSongsdb).length));

                }
                var appendSelectedSearchedSongs = function($obj) {
                    jCont.find('.mus_tabs_i.__active').removeClass('__active');
                    $obj.addClass('__active');
                    var c_songs_ul = jCont.find('.mus_playlist-add_lst ul');
                    c_songs_ul.empty();
                    if ($obj.hasClass('__mymusic')) {
                        c_songs_ul.html(mymusic_data);

                        for (var k in _selectedSongsdb)
                            c_songs_ul.find('#s-' + k).addClass('__selected');
                    } else {
                        $.each(_selectedSongsdb, function(a, b) {
                            c_songs_ul.prepend(b);
                        }); //alert(Object.keys(_selectedSongsdb).length);console.log(_selectedSongsdb)
                    }
                    c_songs_ul.find('.mus-tr_i.__selectable').off('click.SelectSong').on('click.selectSong', function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        __acdcSong($this);

                    });
                }
                jCont.find('.mus-tr_i.__selectable').off('click.SelectSong').on('click.selectSong', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    __acdcSong($this);

                });
                //add click
                jCont.find('a.flat_button:first').off('click.addsongs').on('click.addsongs', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (bloclAddSClick || !Object.keys(_selectedSongsdb).length) return;
                    bloclAddSClick = !0;
                    $('.post_add_songs>ul').empty();
                    $.each(_selectedSongsdb, function(a, b) {

                        var _x_delete_song_ic_markup = ga(x_delete_song_ic);
                        ga('.post_add_songs>ul').prepend(b).find('.mus-tr_add').replaceWith(_x_delete_song_ic_markup);
                        _x_delete_song_ic_markup.off('click.deleteSongFromPost').on('click.deleteSongFromPost', function(e) {

                            e.preventDefault();

                            var $this = ga(this),
                                jb_songli = $this.closest('li'),
                                jbsongid = jb_songli.attr('id').split('-')[1];

                            jb_songli.remove();

                            delete _selectedSongsdb[jbsongid];
                            delete __selectableSongs[jbsongid];



                        });
                    });
                    __selectableSongs = {};
                    for (var i in _selectedSongsdb)
                        __selectableSongs[i] = _selectedSongsdb[i];
                    ga(this).next().trigger('click');

                });


                // cancel click
                jCont.find('a.flat_button:last').off('click.csongs').on('click.csongs', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (!Object.keys(_selectedSongsdb).length) $('.post_add_songs>ul').empty();
                    $('#nohook_modal_close').trigger('click');
                    stop_expand_post_area = false;
                });
                //tabs click

                jCont.find('.mus_tabs_i').off('click.SelectedSong').on('click.selectedSong', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    appendSelectedSearchedSongs($this);
                    musTabSelectorStartNanoScroll();
                });

                //search
                var search_inp_load = jCont.find('.mus_playlist-add_searchicon');
                var jblivesearch_res = function(sinp, e) {
                    var jcontUL = jCont.find('ul');
                    e.preventDefault();
                    e.stopPropagation();
                    if (!$.trim(sinp.val())) return jcontUL.html(lang.enter_artist_or_songname);
                    search_inp_load.addClass('__loading');
                    var send = jAjax('/cmd.php', 'post', 'cmd=postSearchMusic&key=' + sinp.val());
                    send.done(function(d) {
                        jcontUL.empty();
                        search_inp_load.removeClass('__loading');
                        if (d == 1) //no result
                            jcontUL.html(lang.song_search_empty);
                        else if (data == 2) jcontUL.html(lang.enter_artist_or_songname);
                        else if (data == 0) return displayErr(lang.err_tehnic.replace('%c', '[POST_MUSIC_SEARCH_ERR]'));
                        else {
                            d = validateJson(d);
                            for (var b = 0; b < d.length; b++) {
                                var res = d[b];
                                var _m_song_markup = song_markup.replace(/%album%/g, res.album)
                                    .replace(/%songid%/g, res.id)
                                    .replace(/%filename%/g, res.filename)
                                    .replace(/%artist%/g, res.artist)
                                    .replace(/%song_name%/g, res.title)
                                    .replace(/%right_ikon/g, x_add_song_ic)
                                    .replace(/%cover%/g, res.cover);
                                jcontUL.append(_m_song_markup);
                            }
                            for (var k in _selectedSongsdb)
                                jcontUL.find('#s-' + k).addClass('__selected');
                            jcontUL.find('.mus-tr_i.__selectable').off('click.SelectSong').on('click.selectSong', function(e) {
                                e.preventDefault();
                                var $this = $(this);
                                __acdcSong($this);

                            });

                        }
                        musTabSelectorStartNanoScroll();
                    });
                }
                var search_m_input = jCont.find('#jb_m_livesearch');

                search_m_input.off('keyup').on('keyup', function(e) {
                    clearTimeout(jbdoneTyping_Interval);
                    jbdoneTyping_Interval = setTimeout(function() {
                        $('.jBox-container .mus_tabs_i.__active').removeClass('__active');
                        jblivesearch_res(search_m_input, e);
                    }, 500)
                });
                search_m_input.off('keydown keypress').on('keydown keypress', function(e) {
                    clearTimeout(jbdoneTyping_Interval)
                });
            }


        }

    });

}
// set video cover
function setVideoCover(ev, obj, vid,community) {
	
    ev.preventDefault();
    var $obj = ga(obj);
    var img = ga(obj).find('img');
    var img_data = img.data('default');
    var curr_cover = ga('#nb-nearby-' + vid + ' .vd.slider_i_success');
    ga('#nb-nearby-' + vid + ' .__vd_hv_cv.__selected').removeClass('__selected');
	
	ajaxLoading();
    var d = createVideoCapture(vid, img_data,community);
    d.done(function(d) { 
		removeAjaxLoad();
        d = validateJson(d);
        if (d.s == 1) {

            curr_cover.remove();
            if ($obj.closest('.ec_items.vd').find('.video_prvw_cover').length)
                $obj.closest('.ec_items.vd').find('.video_prvw_cover').removeAttr('style').css('background-image', 'url(/videoCover?v=' + d.vid + (community ? '&clubid='+community+'' : '') + '&r=' + (new Date()).getTime() + ')');

            img.before(vd_cover_selected);
            $obj.addClass('__selected');
        } else displayErr(d.s);

    });
}
// create video thumb
function createVideoCapture(vid, img_data,community) {

if(community) {
	
    var jd = {

        cmd: 'createVideoThumbnail',
        vid: vid,
        img_data: img_data,
		clubid: community
		

    };	
} else {
    var jd = {

        cmd: 'createVideoThumbnail',
        vid: vid,
        img_data: img_data
		

    };
	
}
    var send = jAjax('/cmd.php', 'post', jd)
    return send;
}
//save video info
function saveVdInfo(btn, ev) {
    ev.preventDefault();
    var $btn = ga(btn);
	var clubid = $btn.data('clubid');
	
	clubid = clubid ? clubid : '';

    var $fm_data = $btn.closest('.vd_add_descr_field');
    var vid = $fm_data.attr('id').split('_')[1];
    var $vd_title = $fm_data.find('input[name="vd_title"]');
    var $vd_descr = $fm_data.find('textarea[name="video_descr"]');
    var $vd_tags = $fm_data.find('input[name="vdTags"]');
	
	
    var formData = new FormData();
    formData.append('tags', $vd_tags.val());
    formData.append('title', $vd_title.val());
    formData.append('descr', $vd_descr.val());
    
    formData.append('vid', vid);
	
	if(clubid)
		formData.append('clubid', clubid);

		formData.append('cmd', 'saveVideoInfo');

    if (!$.trim($vd_title.val())) return $vd_title.addClass('__err').focus();
    else {
        $fm_data.addClass('__disabled');
        //var send = jAjax('/cmd.php', 'post', formData);
        var send = $.ajax({

            url: '/cmd.php',
            type: 'post',
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false


        });
        send.done(function(d) {
            $fm_data.removeClass('__disabled');
            d = validateJson(d);

            if (d.s == 1) {

                $fm_data.addClass('collapsed').slideUp(function() {
                    var _$this = ga(this);
                    setTimeout(function() {
                        _$this.show()
                    }, 2000);
                });
                if (!$fm_data.closest('.ec_items.vd').hasClass('_vdplayic'))
                    $fm_data.closest('.ec_items.vd').addClass('_vdplayic').prepend('<div class="video_prvw_cover" style="background-image:url(/videoCover?v=' + d.vid + (clubid ? '&clubid='+clubid+'' : '') + ');"></div><div class="share-video-playic mm"><div class="vid_play_m"></div></div><div class="video-title-crvw ellip">' + d.title + '</div>');
                else {
                    $fm_data.closest('.ec_items.vd').find('.video-title-crvw').text(d.title);
                    $fm_data.closest('.ec_items.vd').find('.video_prvw_cover').removeAttr('style').css('background-image', 'url(/videoCover?v=' + d.vid + (clubid ? '&clubid='+clubid+'' : '') + '&r=' + (new Date()).getTime() + ')');
                }

            } else $fm_data.find('.err_sp_dsp').text(d.s);
        });

    }
}

function bgColorsPost(){
	
	
	return ga('<section id="post_add_bg" class=""><div class="posting_cp-w js-color-picker __collapsed">\
    <div class="posting_cp">\
        <div class="posting_cp-lst">\
            <div uid="hide-post-color-picker" class="posting_cp_i __toggler">\
                <div class="posting_cp_i_ic ic12_close-w"></div>\
            </div>\
            <div class="posting_cp_i __color-4 js-color-picker-i" uid="4"></div>\
            <div class="posting_cp_i __color-3 js-color-picker-i" uid="3"></div>\
            <div class="posting_cp_i __color-12 js-color-picker-i" uid="12"></div>\
            <div class="posting_cp_i __color-9 js-color-picker-i" uid="9"></div>\
            <div class="posting_cp_i __color-6 js-color-picker-i" uid="6"></div>\
            <div class="posting_cp_i __color-7 js-color-picker-i" uid="7"></div>\
            <div class="posting_cp_i __color-8 js-color-picker-i" uid="8"></div>\
        </div>\
    </div>\
</div></section>');
	
}

function postingFormPlaceHolder(ev, el) {
    //ev.preventDefault();
    ev.stopPropagation();
    var $el = ga(el);
    var post_txt = $el.parent()
        .find('#posting_form_text_field');
    var posting_form = $el.closest('#posting_form_text_field-w');
    var post_buttons = $el.parent()
        .find('.post_bottom_opts');
    var cancel_button = $el.parent()
        .find('#post_cancel');
    var post_share = $el.parent()
        .find('#post_share');
    var doneSearchLink;
    // media buttons
    var post_picture = ga('.ic-post-picture');
    var postPicInputFile = function(e, obj) {
        //e.preventDefault();
        //e.stopPropagation();
        //var $this = $(obj);
        //$this.off('click.postPic').children().trigger('click');
    }
	
	if(!$el.parent()
        .find('[contenteditable="true"]').length) 
		{
	post_txt = posting_form.find('#post_contenteditable_txt').emojiarea({
                wysiwyg: true,
				stickers:false,
                buttonLabel: 'Emojis',
                buttonPosition: 'before',
                button: '.em_disc_toolbar_i_ic__sm.post.smiles_w'
            }); post_txt.parent().find('.media_selector').remove();
			
		}
			
			post_txt = $el.parent()
        .find('[contenteditable="true"]');
		
		
	 $el.hide();
 
	var bgColors = bgColorsPost();
 
	if(!$el.parent().find('#post_add_bg').length) {
	$el.parent().find('.emoji-wysiwyg-editor').after(bgColors);	
	
	bgColors.find('.js-color-picker').off('click.showPostBgColors').on('click.showPostBgColors', function(e){
		e.stopPropagation();
		
		ga(this).removeClass('__collapsed');
	});
	bgColors.find('[uid="hide-post-color-picker"]').off('click.hidePostBgColorPicker').on('click.hidePostBgColorPicker', function(e){  
		e.preventDefault();
		e.stopPropagation();
		ga('#post_add_bg').find('.js-color-picker').addClass('__collapsed');
		ga('#posting_form_text_field-w').removeClass('postHasBg');
		ga('.emoji-wysiwyg-editor.__has-bg,.bgpost.smiles_w').remove();
		$el.show();
		ga('#bgcolor-post').removeAttr('class').val('false');
		ga('#upost_add_media_files').removeClass('disabledpost-mediafiles'); 
	});
	var post_txt_first = post_txt;
	bgColors.find('.js-color-picker-i').on('click.PostPickColor', function(e){  
	
	
	
	
	
		if(!ga('#post_add_bg').find('.js-color-picker').hasClass('__collapsed')){
			e.preventDefault();
		e.stopPropagation();
		//ga('#post_add_bg').find('.js-color-picker').addClass('__collapsed');
		var _color = ga(this).attr('uid');
		ga('#posting_form_text_field-w').addClass('postHasBg');
		ga('#bgcolor-post').addClass(_color).val('true');
		ga('#upost_add_media_files').addClass('disabledpost-mediafiles');
		//this.post_txt_first = this.post_txt_first || post_txt;
		
		// empty media files
		ga('.post_bottom_opts').find('.post_add_songs').empty();
		ga('.post_bottom_opts').find('.post_up_videos').empty();
		ga('.post_bottom_opts').find('.post_up_photos').empty();
		ga('.post_bottom_opts').find('.post_url_link').empty();
		ga('.post_bottom_opts').find('.post_poll').empty();
		 
		
		post_txt_first.removeAttr('class');
		
		post_txt_first.addClass('emoji-wysiwyg-editor __has-bg __color-'+_color);
		 
		if(!ga('.js-color-picker').hasClass('created')) {
		ga('.js-color-picker').addClass('created');
		 
		post_txt.html('	<div class="pf_color-picker-w">\
    <div class="posting_itx-w">\
        <div class="input_placeholder colorpicker">'+lang.bg_color_write_post+'</div>\
          <span class="pform_name-bg" style="top: 0px; left: 0px; width: 0px; height: 0px;"></span>\
        <textarea class="posting_itx outline0 emoji-tx h-mod js-ok-e ok-posting-handler" style="display:none;" id="bg_post_contenteditable_txt"></textarea>\
		\
    </div>\
</div>');
var old_post_txt = post_txt;
post_txt.before('	<a id="smiles_w_'+new Date().getTime()+'" class="em_disc_toolbar_i_ic__sm bgpost smiles_w" href="javascript:;"></a>');
post_txt.attr('contenteditable',false);
var original_textarea_class = post_txt.find('#bg_post_contenteditable_txt').attr('class');
	post_txt = post_txt.find('#bg_post_contenteditable_txt').emojiarea({
                wysiwyg: true,stickers:false,
                buttonLabel: 'Emojis',
                buttonPosition: 'before',
                button: '.em_disc_toolbar_i_ic__sm.bgpost.smiles_w'
            }); 
			old_post_txt.parent().find('.media_selector').remove();
			post_txt = ga('.pf_color-picker-w').find('[contenteditable="true"]');
			
		post_txt.attr('class',original_textarea_class);//css({'width':'60%','height':'120px'})
ga('.post.smiles_w').hide();
			ga('.input_placeholder.colorpicker').on('click.hidePlaceholderColorPicker', function(e){
				
				ga(this).hide();
				post_txt.focus();
			});
		}
		
		}
		
	});
	
	} else {
	ga('#post_add_bg').show();
	}
			
    post_picture.off('click.postPic')
        .on('click.postPic', function(e) {
            var $this = ga(this);
            postPicInputFile(e, $this);
            setTimeout(function() {
                post_picture.on('click.postPic', function(e) {
                    return postPicInputFile(e, post_picture);
                });
            }, 1000);
        });
   
    post_buttons.removeClass('__op1');
	//ga('body').prepend('<div class="layer_ovr_media_post"></div>');
	post_txt.css({'position':'relative','padding':'7px','height':'auto','background':'#fff','min-height': '80px'})
        .focus();
		
		ga('.post.smiles_w').show();
    //post_txt.off('click').on('click', function(e){e.stopPropagation();});
    cancel_button.off('click')
        .on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            postingFormExpandBack($el);
        });
    post_share.off('click')
        .on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            setStatus(ga(this), e, post_txt);
			if(checkForTogglePostForm($el)) postingFormExpandBack($el);
        });
    post_txt[0].addEventListener("paste", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var _this = this;
        var $this = ga(this);
        var evSpace = $.Event("keyup.validateLink", {
            which: 32,
            keyCode: 32
        }); 
       // $this.trigger(evSpace);
        if (e.clipboardData && e.clipboardData.getData && !_this.stopInsert) {
			
            var text = e.clipboardData.getData("text/plain");
            document.execCommand("insertHTML", false, text);
            $this.trigger(evSpace);
			
        } else if (window.clipboardData && window.clipboardData.getData && !_this.stopInsert) {
			
            var text = window.clipboardData.getData("Text");
            insertTextAtCursor(text);
            $this.trigger(evSpace);
        }
       _this.stopInsert = true;
        setTimeout(function() {
            _this.stopInsert = false;
        }, 100);
    });
    posting_form.off('click')
        .on('click', function(e) {
            e.stopPropagation();
        });
    // tag friends
    post_txt.off('keyup.tagFriends')
        .on('keyup.tagFriends', function(e) {
            e.preventDefault();
			e.stopPropagation();
            var $this = $(this);
            //doneSearchLink = setTimeout(function() {
            var $txt = $this[0].innerText || $this[0].textContent; //$this.text().toLowerCase();
            var all_friends = validateJson(_all_fr);
			/*var _prepare_all_friends = new Array();
			for(var x in all_friends)
			{
				
				if(all_friends[x].allow_tag_in_posts !== 'nobody') _prepare_all_friends.push(all_friends[x]);
			}
			all_friends = new Array();
			all_friends = _prepare_all_friends;
			*/
            if (!this.suggestInited) {
                var sugg_tg_w = new Array();
                for (var u in all_friends) { 
				if(all_friends[u].allow_tag_in_posts !== 'nobody')
					sugg_tg_w.push(all_friends[u].uname);
				}
                SuggestMe.init(ga(this), sugg_tg_w);
                this.suggestInited = true;
            }
            //var taggedPeopleDb = [];
            post_bottom_tagged_ln($this, $txt, all_friends);
            //},100);
        });
    //post_txt.off('keypress.gcaretPos').on('keypress.gcaretPos', function(e){
    //$(this).attr('data-caret-p',getCaretPosition($(this)[0]));
    //});
    // fetch links
    post_txt.off('keydown.validateLink keypress.validateLink')
        .on('keydown.validateLink keypress.validateLink', clearTimeout(doneSearchLink));
    post_txt.off('keyup.validateLink')
        .on('keyup.validateLink', function(e) { 
            e.preventDefault();
            var _this = this;
            var $this = $(this);
            clearTimeout(doneSearchLink);
             
				
			//if (e.keyCode == 32) 
				doneSearchLink = setTimeout(function() {
                _this.urlId = fetchedUrls.length;
                var geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))", "g");
                var t_txt = ValidURL($this.text());
                var url = t_txt ? $.trim(t_txt.match(geturl)) : ''; //$.trim(t_html.match(gUrl()));
                var multi_urls = typeof url.match(geturl) == 'object' && url ? url.match(geturl)
                    .length : 0;
                //alert(typeof url.match(geturl))
                if (!getDomainExt(url)) return;
                if (multi_urls > 1) {
                    var all_urls = url.split(',');
                    for (var i = 0; i < multi_urls; ++i) {
                        url = all_urls[i];
                        if (url && !(fetchedUrls.indexOf(url) > -1)) {
                            fetchedUrls.push(url);
                            $this.text($this.text()
                                    .replace(url, ''))
                                .focusEnd();
                            postFetchUrl(url, _this.urlId);
                        }
                    }
                } else {
                    if (url && !(fetchedUrls.indexOf(url) > -1)) {
                        fetchedUrls.push(url);
                        $this.html($this.text()
                                .replace(url, ''))
                            .focusEnd();
                        postFetchUrl(url, _this.urlId);
                    }
                }
            }, 100);
        });
    ga(document)
        .off('click.togglePostForm')
        .on('click.tooglePostForm', 'body', function(e) {
          ///  e.preventDefault();
		  
			if(checkForTogglePostForm($el)) postingFormExpandBack($el);
        });
}

function checkForTogglePostForm($el){
	
            if (
			!ga('.pf_color-picker-w').length &&
			!ga('.post_add_songs>ul')
                .children()
                .length && !ga('.post_up_photos')
                .children()
                .length && !ga('.post_url_link')
                .children()
                .length && !ga('.tagged_people_loc')
                .children()
                .length && ga('.post_poll')
                .html() == '' && $el.parent().find('[contenteditable="true"]')
                .html() == '' && !stop_expand_post_area && !ga('#lf_map_i')
                .is(':visible') && !ga('.post_up_videos')
                .children()
                .length) return true; else return false;
	
}
function post_bottom_tagged_ln($this, $txt, all_friends) {
    var l_friends_l = all_friends;
	
    // check for users with same name
    var cnt_same_name = [];
    for (var key in all_friends) {
        if (!tg_k_skip_this && $txt.indexOf(all_friends[key].uname) > -1 && all_friends[key].allow_tag_in_posts != 'nobody') { ///&& !(taggedPeopleDb.indexOf(all_friends[key].id) > -1) ){
            var found_same_name;
            /*if(taggedPeopleSameName.length) 
            	for(var b in taggedPeopleSameName){
            		//if() return;
            	if(typeof taggedPeopleSameName[b] !== 'function' && $txt.indexOf(taggedPeopleSameName[b].toLowerCase()) > -1)found_same_name=true;
            }*/
            ///if( !tg_k_skip_this && !($.inArray(all_friends[key].uname, taggedPeopleSameName) > -1) || found_same_name) 
            for (var c in l_friends_l) {
                if (l_friends_l[c].uname == all_friends[key].uname && l_friends_l[c].id != all_friends[key].id) {
                    cnt_same_name.push(all_friends[key].id);
                }
            }
        }
    }
    if (cnt_same_name.length >= 2) {
        ///$('section#post-choose-friend-dropdown').remove();
        /// console.log(cnt_same_name);
        var crtPostition = $this.caret('position');
        var sv_uname = '',
            last_value = '';
        //$this.find('#post-choose-friend-dropdown').remove();
        // if($this.hasClass('__mhg'))$this.css('min-height','80px').removeClass('__mhg');
        // append drop down to choose the user
        if (!ga('section#post-choose-friend-dropdown')
            .length) {
            $this.append('<section id="post-choose-friend-dropdown" style="display:none;"><div contenteditable="false" style="left:' + Math.abs((crtPostition.left + 150 > $this.width() ? crtPostition.left - 150 : (crtPostition.left < 50 ? 10 : crtPostition.left - 100))) + 'px;" class="post-tag-friend-dropdown"></div></section>');
        }
        $this.css('min-height', '80px');
        $this.find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
            .empty();
        var added_all_friends_from_dropDown;
        for (var k = 0; k < cnt_same_name.length; k++) {
            var p_get_data = all_friends[cnt_same_name[k]];
            //if(!(taggedPeopleSameName.indexOf(p_get_data.id) > -1) )
            $this.find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
                .append('<div class="drp_li_people ' + (taggedPeopleSameName.indexOf(p_get_data.id) > -1 ? '__disabled' : '') + '" id="i-' + p_get_data.id + '" onclick="return postTagFromDropDown(this,event);"><img src="/getPhoto?p=' + p_get_data.photo + '&g=' + p_get_data.gender + '&sz=small"><span class="ellip">' + p_get_data.uname + '</span></div>');
            sv_uname = p_get_data.uname;
        }
        $this.find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
            .children()
            .each(function() {
                if (!$(this)
                    .hasClass('__disabled')) added_all_friends_from_dropDown = 1;
            });
        if (added_all_friends_from_dropDown) {
            $this.find('#post-choose-friend-dropdown')
                .show();
            $this.css('min-height', '+=' + ($this.find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
                    .height() + 50) + 'px')
                .addClass('__mhg'); ///($this.outerHeight()+ $this.find('#post-choose-friend-dropdown').children().outerHeight()) ).addClass('__mhg');
            ///markWord(sv_uname,$this);//$this.html().find()
            // highlight the user name
            if (lastValue != $txt && $txt) {
                lastValue = $txt;
                setTimeout(function() {
                    markWord(sv_uname, $this);
                }, 500);
                $this.focusEnd();
            }
            return;
        } else {
            $this.find('#post-choose-friend-dropdown')
                .remove();
            added_all_friends_from_dropDown = false;
        }
        ///}
        //if(added_all_friends_from_dropDown) 
        // return;
    } else {
        ga('#post-choose-friend-dropdown')
            .remove();
        $this.css('min-height', '80px')
            .removeClass('__mhg');
    }
    for (var i in all_friends) {
        var friend_data = all_friends[i];
        if ($txt.indexOf(friend_data.uname) > -1 && all_friends[i].allow_tag_in_posts != 'nobody') {
            if (tg_k_skip_this) {
                for (var j in all_friends)
                    if (tg_k_skip_this == all_friends[j].id) friend_data = all_friends[j];
            }
            if (!$this.parent()
                .find('.tagged_people_loc')
                .length) {
                $this.parent().find('.post.smiles_w').after('<div class="tagged_people_loc soh-s"><div class="__pdd ellip"><div class="_people pple_places">' + lang.with + ' </div><div title="' + lang.remove_tags + '" onclick="return remove_all_post_tags(1);" class="x-delete-post-tag __alltg ic10 ic10_close tg_del foh-s"></div></div></div>');
                ga('.post_bottom_opts')
                    .removeClass('brd');
            } else if (!$this.parent()
                .find('.tagged_people_loc ._people')
                .length) {
                ga('.tagged_people_loc > .__pdd')
                    .prepend('<div class="_people">' + lang.with + ' </div>');
            }
            var $tg_people = $this.parent()
                .find('.tagged_people_loc ._people');
            if (!(taggedPeopleDb.indexOf(friend_data.id) > -1)) {
                taggedPeopleDb.push(friend_data.id);
                //if(condition >= Object.keys(all_friends).length) tg_k_skip_this = false;	
                $this.text($txt.replace(friend_data.uname, ' '))
                    .focusEnd();
                if (taggedPeopleDb.length == 1) {
                    $tg_people.append('<div class="li_people" id="post-tagged-' + friend_data.id + '"><a class="o" href="/user/' + friend_data.id + '" hrefattr="true">' + friend_data.uname + '</a></div>');
                    this.ftcnt = '<div class="tooltip-tagged-p mb0 soh-s" id="post-tagged-' + friend_data.id + '"><img src="/getPhoto?p=' + friend_data.photo + '&g=' + friend_data.gender + '&sz=small"><a href="/profile?q=' + friend_data.id + '" hrefattr="true" class="o">' + friend_data.uname + '</a><div title="' + lang.remove_tag + '" onclick="return unTagFromPost(this,event);" class="x-delete-post-tag ic10 ic10_close tg_del foh-s"></div></div>';
                    jboxTitleTip($('.li_people#post-tagged-' + friend_data.id), this.ftcnt, '', friend_data.id);
                } else if (taggedPeopleDb.length == 2) {
                    $tg_people.append('<span class="and-separator">&nbsp;' + lang.and + '&nbsp;</span><div class="li_people" id="post-tagged-' + friend_data.id + '"><a class="o" href="/user/' + friend_data.id + '" hrefattr="true">' + friend_data.uname + '</a></div>');
                    this.ttcnt = '<div class="tooltip-tagged-p mb0 soh-s" id="post-tagged-' + friend_data.id + '"><img src="/getPhoto?p=' + friend_data.photo + '&g=' + friend_data.gender + '&sz=small"><a href="/profile?q=' + friend_data.id + '" hrefattr="true" class="o">' + friend_data.uname + '</a><div title="' + lang.remove_tag + '" onclick="return unTagFromPost(this,event);" class="x-delete-post-tag ic10 ic10_close tg_del foh-s"></div></div>';
                    ///jb_create_tooltip_cnt += 
                    jboxTitleTip(ga('.li_people#post-tagged-' + friend_data.id), this.ttcnt, '', friend_data.id);
                } else if (taggedPeopleDb.length >= 3) {
                    if (!$tg_people.find('.and_other_people')
                        .length) $tg_people.append('<div class="and_other_people s il"></div>');
                    $tg_people.find('.and_other_people')
                        .html(lang.and + ' <span id="jb-tooltip-tagged-in-post">' + (taggedPeopleDb.length - 2) + '</span> ' + lang.other_friends);
                    jb_create_tooltip_cnt += '<div class="tooltip-tagged-p soh-s" id="post-tagged-' + friend_data.id + '"><img src="/getPhoto?p=' + friend_data.photo + '&g=' + friend_data.gender + '&sz=small"><a href="/user/' + friend_data.id + '" hrefattr="true" class="o">' + friend_data.uname + '</a><div title="' + lang.remove_tag + '" onclick="return unTagFromPost(this,event);" class="x-delete-post-tag ic10 ic10_close tg_del foh-s"></div></div>';
                    $tg_people.find('.and-separator')
                        .html(',&nbsp;');
                    jboxTitleTip(ga('.and_other_people'), jb_create_tooltip_cnt, 1);
                }
            }
        }
    }
    tg_k_skip_this = false;
    lastValue = $txt;
} // tag from dropdown
function postTagFromDropDown(obj, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var $obj = ga(obj);
    var tag_i = $obj.attr('id')
        .split('-')[1];
    $obj.parent()
        .remove();
    tg_k_skip_this = tag_i;
    ga('#posting_form_text_field')
        .trigger('keyup.tagFriends');
    taggedPeopleSameName.push(tag_i);
}

function remove_all_post_tags(a) {
    if (!ga('._location')
        .length || a) ga('.tagged_people_loc')
        .remove();
    ga('#tagged-people-n-post,#post-choose-friend-dropdown')
        .remove();
    ga('.post_bottom_opts')
        .addClass('brd');
    ga('.suggest_li.search-tip.__selected')
        .removeClass('__selected');
    taggedPeopleDb = [];
    taggedPeopleSameName = [];
    jb_create_tooltip_cnt = '';
    if (!ga('._location')
        .length) p_place = 0;
}

function postingFormExpandBack(obj) {
    var $el = ga(obj);
    var post_txt = $el.parent()
        .find('[contenteditable="true"]');
    var post_buttons = $el.parent()
        .find('.post_bottom_opts');
    $el.show();
    post_txt.removeAttr('style')
        .empty();
    post_buttons.addClass('__op1');
		ga('#main_ff_share.__opened').removeClass('__opened');
		
		// hide smilies button
		ga('.post.smiles_w').hide();
		
		// hide color picker
		ga('#post_add_bg').hide();
}

// untag people from post
function unTagFromPost(obj, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var $obj = $(obj);
    var untag_id = parseInt($obj.parent()
        .attr('id')
        .match(/\d/g)
        .join(''));
    $obj.parent()
        .addClass('__disabled');
    ///taggedPeopleDb.splice( taggedPeopleDb.indexOf(untag_id), 1 );
    //delete taggedPeopleDb[taggedPeopleDb.indexOf(untag_id)];
    taggedPeopleDb.remove(taggedPeopleDb.pindexof(untag_id));
    if (taggedPeopleSameName.length) taggedPeopleSameName.remove(taggedPeopleSameName.pindexof(untag_id));
    if (taggedPeopleDb.length <= 0) ga('._people')
        .remove();
    //if(taggedPeopleSameNamePName.length) taggedPeopleSameNamePName.remove(taggedPeopleSameNamePName.pindexof($obj.parent().find('a').text().toLowerCase()));
    //delete jb_create_tooltip_cnt[untag_id];
    //post_bottom_tagged_ln($this,$txt,all_friends);
    if (ga('.li_people#post-tagged-' + untag_id)
        .length) {
        ga('body')
            .prepend('<section style="display:none;" id="rmv_tag_from_jbTooltip">' + jb_create_tooltip_cnt + '</section>')
            ///$('section#rmv_tag_from_jbTooltip').find('#post-tagged-'+untag_id).remove();
        ga('#tagged-people-n-post-' + untag_id)
            .remove();
        if (taggedPeopleDb.length >= 2) {
            var first_u_tg = $('section#rmv_tag_from_jbTooltip')
                .find(':first');
            ga('.li_people#post-tagged-' + untag_id)
                .attr('id', first_u_tg.attr('id'))
                .find('a')
                .attr('href', '/profile?q=' + first_u_tg.attr('id')
                    .match(/\d/g)
                    .join(''))
                .text(first_u_tg.find('a')
                    .text());
            first_u_tg.remove();
            var oftcnt = '<div class="tooltip-tagged-p mb0 soh-s" id="' + first_u_tg.attr('id') + '"><img src="' + first_u_tg.find('img')
                .attr('src') + '"><a href="/user/' + first_u_tg.attr('id')
                .match(/\d/g)
                .join('') + '" hrefattr="true" class="o">' + first_u_tg.find('a')
                .text() + '</a><div title="' + lang.remove_tag + '" onclick="return unTagFromPost(this,event);" class="x-delete-post-tag ic10 ic10_close tg_del foh-s"></div></div>';
            jboxTitleTip($('.li_people#' + first_u_tg.attr('id')), oftcnt, '', first_u_tg.attr('id')
                .match(/\d/g)
                .join(''));
        } else ga('.li_people#post-tagged-' + untag_id)
            .remove();
        jb_create_tooltip_cnt = ga('section#rmv_tag_from_jbTooltip')
            .html();
        if (jb_create_tooltip_cnt === '') {
            ga('.and_other_people')
                .remove();
            ga('.and-separator')
                .html('&nbsp;' + lang.and + '&nbsp;')
        }
        ga('section#rmv_tag_from_jbTooltip')
            .remove();
        //return;
    }
    if (jb_create_tooltip_cnt != '' && !$('section#rmv_tag_from_jbTooltip')
        .length && !$('.li_people#post-tagged-' + untag_id)
        .length) {
        ga('body')
            .prepend('<section style="display:none;" id="rmv_tag_from_jbTooltip">' + jb_create_tooltip_cnt + '</section>')
        ga('section#rmv_tag_from_jbTooltip')
            .find('#post-tagged-' + untag_id)
            .remove();
        jb_create_tooltip_cnt = $('section#rmv_tag_from_jbTooltip')
            .html();
        ga('section#rmv_tag_from_jbTooltip')
            .remove();
    }
    if (taggedPeopleDb.length == 2) {
        ga('.and_other_people')
            .remove();
        ga('.and-separator')
            .html('&nbsp;' + lang.and + '&nbsp;');
        //alert('and')
    } else if (taggedPeopleDb.length == 1) {
        ga('.and-separator')
            .remove();
        ga('.li_people#post-tagged-' + untag_id)
            .remove();
    } else if (taggedPeopleDb.length >= 3) {
        ga('#jb-tooltip-tagged-in-post')
            .html((taggedPeopleDb.length - 2));
    } else {
        remove_all_post_tags();
    }
}
