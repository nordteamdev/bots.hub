var story = new stories();
	

function stories() {
	var self = this;
	this.body = $('body');
	this.story_upload_progress;
	this.canvas;
	this.video_max_file_size = 40; // 40mb
	this.video_max_duration = 31;// 30 sec
	this.videoFile;
	this.videoCover;
	
	this.add = function(evt){
		self.story_upload_progress = ga('.story_uploading_progr');
		
		var files = ga(evt.target)[0].files;

		var img_files = new Array(), vd_files = new Array();
		
		for (var i = 0; i < files.length; i++)
		{
			
			
	
        if (isImage(files[i].name)) {
			
		   
		   img_files.push(files[i]);
        }
		
        else if (isVideo(files[i].name)) {

			vd_files.push(files[i]);
        }
	}
	
	if(img_files.length) self.readPicture(evt,img_files);//self.uploadPictures(evt,img_files);
	if(vd_files.length) self.readVideo(evt);
		
		
		
		
	}
	,
	
	this.readVideo = function(evt){
		 
     var input = ga(evt.target);
    var video_file = input[0].files[0];
	
	
	
		var ValidateSize = function(file) {
				var FileSize = file.size / 1024 / 1024; // in MB
				if (FileSize > self.video_max_file_size) {
					return false;
				} else {
					return true;
				}
			}
	
	

 
        var
            file_ext = video_file.name.split('.').pop().toLowerCase();

        if ($.inArray(file_ext, _st.videoTypes) == -1 && $.trim(file_ext)) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
 
            return displayErr(lang.up_invalid_file_ext.replace('%s', _st.videoTypes));
        }

    /*     if (!ValidateSize(video_file)) {
 
            return displayErr('Your video file is too large, maximum 20mb');
        }

		if(vd_dur > 20){
			return displayErr('Your video file is too large, maximum 20 seconds');
			
		}*/
 
		var checkVideoDuration = function(){
 
		
		
			var test_vid = document.createElement('video');
			 
			  // create url to use as the src of the video
			  var fileURL = URL.createObjectURL(video_file);
			  test_vid.src = fileURL;
			  // wait for duration to change from NaN to the actual duration
			  test_vid.ondurationchange = function() {
				if(this.duration.toFixed(2) > self.video_max_duration)
					return displayErr('Your video file is too large, maximum 30 seconds.');
				else
					self.prepareStory(video_file,1);
			  };
			 
		
		
		
		
		
		
		
		}
		checkVideoDuration();
		
	},
	this.uploadPictures = function(ev,files){
		
		


    var input = ga(ev.target);
    var files = files || input[0].files;
    var count = 0;
    var totalFiles = files.length;

    for (var i = 0; i < files.length; i++) {




        var file_ext = files[i].name.split('.').pop().toLowerCase();

        if ($.inArray(file_ext, _st.photoTypes) == -1 && $.trim(file_ext)) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
        }

        if (files.length > _st.maxFilesUpload) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            return displayErr(lang.up_maximumFiles.replace('%s', _st.maxFilesUpload));
        }

		

		
	}


		var finished_file = 1;
		var _calc_fil = 100/parseInt(totalFiles);
		
		var trigger_attachUp = function() {

        if (typeof files[count] === 'undefined' || count > totalFiles - 1) {
            return false;
        }

        var formData = new FormData();
        formData.append('files[]', files[count]);
        formData.append('act', 'upload-pictures');
		formData.append('cmd', 'upload');
 

		
		
        $.ajax({
            url:'/stories.php',
            type: 'POST',
            xhr: function() { // Custom XMLHttpRequest
                var Xhr = $.ajaxSettings.xhr();
                if (Xhr.upload) { // Check if upload property exists
                    Xhr.upload.addEventListener('progress', function(e) {

                        if (e.lengthComputable) {

                            var p_percentage = Math.round((e.loaded / e.total) * 100);
                            self.story_upload_progress.addClass('on').css('width', (p_percentage/totalFiles) + '%');
							
 
								
                        }




                    }, false); // For handling the progress of the upload
                }
                return Xhr;
            },
            //Ajax events
            beforeSend: function() {
				
				self.story_upload_progress.addClass('on');
				
            },
            success: function(data) {
				self.story_upload_progress.removeClass('on').removeAttr('style');
                var response = validateJson(data);

                if (response['status'] === 'OK') {
					finished_file++;
					
					
					self.prepareStory(response);
					
					
					setTimeout(function() {
                         
                        count++;
                        trigger_attachUp();
                    }, 50);
					
                } else return displayErr(data);

            },
            error: function() {
				self.story_upload_progress.removeClass('on').removeAttr('style');
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
	
	
	
	
	
	
	
	
	
	},
	this.closePreparePopup = function(story_id,without_confirm){
		
	if(without_confirm){ 
		ga('#new_story_prepare').remove();
		ga('body,html').removeClass(_nscroll);
	} else {	
	confirm_act(lang.confirm_cancel_story, function ()
	{
		ga('#new_story_prepare').remove();
		ga('body,html').removeClass(_nscroll);
		//self.deleteStory(story_id);
	});
	}
	
	},
	this.deleteStory = function(id){
	confirm_act(lang.confirm_delete_story, function ()
	{
		var s = {};
		s['cmd'] = 'deleteStory';
		s['id'] = escape(id);
		var send = jAjax('/stories.php', 'post', s);
		send.done(function(data){   
		
			
			if(data == 'success'){
			var story = ga('#story_uid_'+id);
			story.removeClass('with').addClass('_empty');
			story.find('.story_a_head_name').text(lang.add_your_story);
			
			story.find('.story_a_time_ago').text(lang.add_story_descr);
			story.find('#img_story').attr('src','/getPhoto?p='+_U.p+'&sz=small');
			
			} else {
				return displayErr(lang.somethingWrongWhileDeletingYourStory);
				
			}
		});
		
	});
	},
	
	this.readPicture = function(evt){
		 var input = evt.target;
 
			var reader = new FileReader();
			reader.onload = function ()
			{
				var dataURL = reader.result;
				self.prepareStory(dataURL);
				
			};
			reader.readAsDataURL(input.files[0]);
	
 
	},
	this.prepareStory = function(imageData,is_video){
		var $b = ga('body');
		var default_brush_size = 8;
		 
		var story_id = 1; 
		ga('body,html').addClass(_nscroll);
		
		if(!is_video){
		
		$b.prepend('<section id="new_story_prepare">\
			<script src="'+_THEME+'/js/jquery.jqscribble.js?c='+ (new Date().getTime())+'" type="text/javascript"></script>\
			<script src="'+_THEME+'/js/jqscribble.extrabrushes.js?v='+ (new Date().getTime())+'" type="text/javascript"></script>\
			<script src="'+_THEME+'/js/jcanvas.min.js?v='+ (new Date().getTime())+'" type="text/javascript"></script>\
					<div class="new_story_prepare_cnt">\
					<header id="story_header_def" class="b47lm"><button onclick="story.closePreparePopup('+story_id+');" class="_9_TEu storiesSpriteX__outline__44 "><span class="Szr5J">Close</span></button>\
					<div class="Mlo3j">\
					<button id="story_download" class="zkCaU storiesSpriteDownload__filled__44 "></button>\
					<button id="story_stickers" class="Wp9Qu storiesSpriteSticker__outline__44"></button><button id="story_tool_creion" class="CcNFK storiesSpriteDrawing_tools__filled__44"></button><button id="story_text" class="PavHP storiesSpriteText__filled__44 "></button></div></header>\
						<div class="story_new_imgbox"><img style="display:none;" id="new_story_img_for_canvas" src="'+imageData+'" class="story_prepare_big_img" />\
						<canvas class="story_prepare_canvas HWfWh" style="z-index:0;" id="canvas_new_story"></canvas>\
						<canvas class="story_prepare_canvas x3piU" id="canvas_new_story_draw"></canvas>\
						<canvas class="story_prepare_canvas x3piU cvst" id="canvas_new_story_text_stickers"></canvas>\
						</div>\
												<div class="_7hHlA"></div>\
						<footer id="story_footer_def" class="zefSl"><div class="fj0fV"><button onclick="story.create();" class="u34XU"><div class="storiesSpriteNew_story__outline__24__grey_0"></div><span class="IEXVe">'+lang.add_your_story+'</span></button></div></footer>\
					</div>\
		\
		</section>');
		}else{
			
		var video_file = imageData;
		self.videoFile = video_file;
		$b.prepend('<section id="new_story_prepare">\
			<script src="'+_THEME+'/js/jquery.jqscribble.js?c='+ (new Date().getTime())+'" type="text/javascript"></script>\
			<script src="'+_THEME+'/js/jqscribble.extrabrushes.js?v='+ (new Date().getTime())+'" type="text/javascript"></script>\
			<script src="'+_THEME+'/js/jcanvas.min.js?v='+ (new Date().getTime())+'" type="text/javascript"></script>\
					<div class="new_story_prepare_cnt">\
					<header id="story_header_def" class="b47lm"><button onclick="story.closePreparePopup('+story_id+');" class="_9_TEu storiesSpriteX__outline__44 "><span class="Szr5J">Close</span></button><div class="Mlo3j"><button id="story_download" class="zkCaU storiesSpriteDownload__filled__44 "></button><button id="story_stickers" class="Wp9Qu storiesSpriteSticker__outline__44"></button><button id="story_tool_creion" class="CcNFK storiesSpriteDrawing_tools__filled__44"></button><button id="story_text" class="PavHP storiesSpriteText__filled__44 "></button></div></header>\
						<div class="story_new_imgbox">\
						<video loop muted autoplay="true" id="video_story_hidden" src="'+ (URL.createObjectURL(video_file)) +'"></video>\
						<canvas class="story_prepare_canvas HWfWh" style="z-index:0;" id="canvas_new_story"></canvas>\
						<canvas class="story_prepare_canvas x3piU" id="canvas_new_story_draw"></canvas>\
						<canvas class="story_prepare_canvas x3piU cvst" id="canvas_new_story_text_stickers"></canvas>\
						</div>\
												<div class="_7hHlA"></div>\
						<footer id="story_footer_def" class="zefSl"><div class="fj0fV"><button onclick="story.create(1);" class="u34XU"><div class="storiesSpriteNew_story__outline__24__grey_0"></div><span class="IEXVe">'+lang.add_your_story+'</span></button></div></footer>\
					</div>\
		\
		</section>');
			
			
		}
 	var canvas = ga("#canvas_new_story"), ctx_pattern;
	var story_creion = $b.find('#story_tool_creion'),
	    story_text = $b.find('#story_text'),
		story_stickers = $b.find('#story_stickers'),
		story_download = $b.find('#story_download'),
		story_header_def = $b.find('#story_header_def'),
		story_footer_def = $b.find('#story_footer_def'),
		story_header_def_html = story_header_def.clone();
	var draw_canvas = ga('#canvas_new_story_draw');
	self.canvas = canvas;
 
	var canvas_stickers_text = ga('#canvas_new_story_text_stickers');
	var dragStop, dragStart, drop_layer_timeout;
	
	
	if(is_video){
 
	story_download.remove();
	story_stickers.remove();
	story_text.remove();
	story_creion.remove();
	
	}
	
		  dragStart = function(evel){
							story_header_def.hide();
							story_footer_def.hide();
							
							if(!ga('#trash-button-footer').length) {
							story_footer_def.before(trash_button());
						
							  
							

							
				  var enterDroppable = function(elem) {
						ga(elem).addClass('_31yHh');
						 
						 clearTimeout(drop_layer_timeout);
					drop_layer_timeout = setTimeout(function(){
						canvas_stickers_text.removeLayer(evel.name);
						dragStop();
						},300);
						
					}

   var leaveDroppable = function(elem) {
      ga(elem).removeClass('_31yHh');
	  clearTimeout(drop_layer_timeout);
    }		
 
 

ga('#trash_button_id').off('mouseenter.deleteCanvasEl mouseover.deleteCanvasEl').on('mouseenter.deleteCanvasEl mouseover.deleteCanvasEl', function(e){
	
	enterDroppable(this);
});
 
							
 ga('#trash_button_id').off('mouseout.deleteCanvasEl mouseleave.deleteCanvasEl').on('mouseout.deleteCanvasEl mouseleave.deleteCanvasEl', function(e){
	
	leaveDroppable(this);
});
							
							
							
						
							}			
		}
		 dragStop = function(){
							story_header_def.show();
							story_footer_def.show();
							
							ga('#trash-button-footer').remove();
							
		}
	var pic,
	c = canvas[0],ctx = c.getContext("2d");
	
	if(!is_video){
	// load image and append to canvas element
	ga('#new_story_img_for_canvas').load(function(){
		
	pic = ga(this);


		
		 
		draw_canvas.jqScribble({brush: BasicBrush, brushSize:default_brush_size, brushColor:'white'});
		canvas[0].width = pic.width();
		canvas[0].height = pic.height();
		
		draw_canvas[0].width = pic.width();
		draw_canvas[0].height = pic.height();
		
 
 
		
		canvas_stickers_text[0].width = pic.width();
		canvas_stickers_text[0].height = pic.height();
		
		setTimeout(function(){


			ctx.drawImage(pic[0],0,0,pic.width(),pic.height());
 
		},100);
setTimeout(function(){
	draw_canvas.data("jqScribble").disable();
},300);
	
	});
	
	
	
	} else {
		var cover_created = false;
		ajaxLoading();
		var vid = ga('#video_story_hidden');
		pic = vid;
		  vid[0].addEventListener('play', function() { 
		  removeAjaxLoad();
			
			var $this = this; //cache
			(function loop() {
			  if (!$this.paused && !$this.ended) {
				ctx.drawImage($this, 0, 0);
				setTimeout(loop, 1000 / 30); // drawing at 30fps
				if(cover_created == false)
					self.videoCover = c.toDataURL("image/jpg");
			  }
			})();
			cover_created = true;
		  }, 0);
		  
		  
		  
		  
		  
 


		
		 
		draw_canvas.jqScribble({brush: BasicBrush, brushSize:default_brush_size, brushColor:'white'});
		canvas[0].width = vid.width();
		canvas[0].height = vid.height();
		
		draw_canvas[0].width = vid.width();
		draw_canvas[0].height = vid.height();
		
 
 
		
		canvas_stickers_text[0].width = vid.width();
		canvas_stickers_text[0].height = vid.height();
		  
		  
		  
		  
		  
		
	}
	var colors = function(t){
		
		var m = '<div class="_1QAey XLA05 " id="'+ (t ? 'story-pallete-colors-text' : 'story-pallete-colors')+'">\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: rgb(253, 203, 92);"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: rgb(253, 141, 50);"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: rgb(209, 8, 105);"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: rgb(163, 7, 186);"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: rgb(56, 151, 240);"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: rgb(112, 192, 80);"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH  " style="background-color: black;"></div></button>\
		<button class="Od09U " role="menuitem"><div class="tbejH jafog " style="background-color: white;"></div></button>\
		</div>';
		return m;
	}
	var trash_button = function(){
		
		return '<footer class="zefSl" id="trash-button-footer"><div class="_85xE9">\
				<div class="jcqi7 " id="trash_button_id"><span class="glyphsSpriteDelete__outline__24__grey_0 u-__7" aria-label="Delete sticker icon"></span></div>\
				</div></footer>';
	}
	var brushSize = function(){
		var m = '<div class="brush_slider"><input type="range" max="16" value="'+default_brush_size+'" min="1" class="slider_brush_range"></input></div>';//'<div class="_7OwuK ponQR"><div class="erOVW"><div class="P7Y8r"></div></div><div class="_7Nm0T" role="menuitem"><div class="HyTC5"></div></div></div>';
		
		return m;
		
		
	}
	var story_stickers_img = function(){
		
	 var dir = __STORIES_STICKERS;
	 var stickers_count = 34;
	 
	 var m = '';
	 var c = 0;
	 for(var i = 1; i < stickers_count;i++){
		 
		 if(c % 3 == 0) m+='<div class="Nnq7C QOE5j">';
		 
		 m +=  '<button class="mWegc stickerToStory" id="sticker">\
		<img class="tRWwG" src="'+dir+i+'.png" alt="" id="sticker">\
		</button>';
		c++;
		 if(c % 3 == 0) m+='</div>';
		
		
		
	 }
	 
	 return m;
		
	}
	
	
	// add text
	ga('#story_text').on('click', function(e){
		
		story_header_def.hide();
		story_footer_def.hide();
 
	if(ga('#story__cnt_text').length && ga('#story__cnt_text').css('display') == 'none'){
		
		ga('#story__cnt_text').show();
		ga('#story_contenteditable_focus').focus();
		return;
	}
	
	
		var t = '<div class="m1lpM" role="button" tabindex="-1">\
		<span class="gW5EZ" id="story_contenteditable_focus" contenteditable="true" role="textbox" tabindex="-1" style="width:'+pic.width()+'px;height:'+pic.height()+'px;color: white; text-shadow: rgba(150, 150, 150, 0.3) 0px 1px 2px; font-size: 22px; font-weight: 600; line-height: 22px;"></span>\
		</div>';
		
		story_header_def.before('<div id="story__cnt_text"><header class="xCE4Y">\
		<button class="Dl2M5" id="story_ctx_edited_done_text" href="javascript:void(0);">'+lang.Done+'</button></header>'+t+colors(1)+'</div>');

		ga('#story_contenteditable_focus').focus();
		// done click
		ga('#story_ctx_edited_done_text').on('click.doneText', function(e){
			
			ga('#story__cnt_text').hide();
			story_header_def.show();
			story_footer_def.show();
			
			
			canvas_stickers_text.css({'width':canvas.width(),'height':canvas.height()});
			var txt_ctx = canvas_stickers_text[0].getContext('2d');
 
			var text_value = ga('.gW5EZ').innerText();
			
			ga('.gW5EZ').empty();
 
var measureText = function(pText, pFontSize, w, h, pStyle) {
    var lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;
	lDiv.style.wordBreak = 'break-all';
	lDiv.style.maxWidth = w+'px';
	lDiv.style.maxHeight = h+'px';
    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };
 
    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}
 
 
var text_size  = measureText(text_value,22,canvas.width(),canvas.height());
 
var cord_x =  Math.abs(canvas.width()/2) - (text_size.width /2);
var cord_y = Math.abs((canvas.height()/2) - (text_size.height /2));
 
			 canvas_stickers_text.drawText({
				 layer:true,
				 name: 'LT'+Math.floor(Math.random() * (999 - 33 + 1) + 33),
			  fontStyle: 'bold',
			   draggable: true,
			  fillStyle: ga(".gW5EZ").css('color'),
			  shadowColor: 'rgba(150, 150, 150, 0.3)',
			  shadowBlur: 2,
			  fromCenter: false,
			  x: cord_x,
			  y: cord_y,
			  fontSize: 22, respectAlign: true,
			  align:'center',
			lineHeight:1.1,
			  fontFamily: 'Arial, Verdana, sans-serif',
			  text: text_value,
			  maxWidth: canvas_stickers_text.width(),
 
				  drag: function(l) {
						dragStart(l);	
				  },
 
				  dragstop: function(l) {
							dragStop(l);
				  }
			});
				 
				
			
		});

		// colors picker
		story_header_def.parent().find('#story-pallete-colors-text').children().each(function(){
			
			ga(this).on('click',function(e){
			e.preventDefault(); 
			var this_color = ga(this).children();
			ga(".gW5EZ").css({'color': this_color.css('background-color')});
			ga('.tbejH.jafog').removeClass('jafog');
			this_color.addClass('jafog');
			ga('#story_contenteditable_focus').focus();
		});
		
		});
	});
	var hideStickersPanel = function(){
	 
		ga('#story_stickers_sidebar').removeClass('__show');//.on(crossEvent, function(e){  ga(this).hide() });
	}
	
	var showStickersPane = function(){
		ga('#story_stickers_sidebar').addClass('__show');
		 
 
	}
	// stickers
	story_stickers.on('click.addStikersToStory', function(e){
		
		
		var stickers_markup = '<div id="story_stickers_sidebar">\
		<button class="abscloeic_stickers_stories _9_TEu storiesSpriteX__outline__44 "><span class="Szr5J">Close</span></button>\
		<div class="story_stickers_cnt">\
		<div class="nano" style="height:'+ (ga(window).height()) +'px;"><div class="nano-content">'+story_stickers_img()+'</div></div></div>\
		</div>\
		</div>';
		
		if(!ga('#story_stickers_sidebar').length){
			
			ga('.new_story_prepare_cnt').append(stickers_markup);
			
			showStickersPane();
			// close stickers panel
			ga('.abscloeic_stickers_stories').on('click',function(e){
				hideStickersPanel();
			});
			
			// add stickers
			ga('.stickerToStory').on('click', function(e){
				
				var $_this = ga(this);
 
			 
			 var s_img = $_this.find('img')[0];
 
 
			 
var resizeSticker = function (img_ref) { 
    var img = $(img_ref);
	
 
	
	var maxWidth = 120; // Max width for the image
	var maxHeight = 120;    // Max height for the image
	var ratio = 0;  // Used for aspect ratio
	var width = img[0].naturalWidth;    // Current image width
	var height = img[0].naturalHeight;  // Current image height

	if (width > maxWidth && width > height) {
	    
	    ratio = width / height;
 
		return {"width" : maxWidth, "height" :maxWidth/ratio};
	}else  if (height > maxHeight && height > width){
	    
	    ratio = height / width;
 
		return {"width" : maxHeight/ratio, "height" :maxHeight};
	}else {

 
		return {"width" : maxWidth, "height" :maxHeight};
 
	}
	
 
}
var img_resize_size = resizeSticker(s_img);
var centerShift_x = (canvas.width() - img_resize_size.width)/2;
var centerShift_y = (canvas.height() - img_resize_size.height)/2;

 
					canvas_stickers_text.drawImage({
					  source: s_img.src,
					  x: centerShift_x, y: centerShift_y,
 
						width:img_resize_size.width,
						height:img_resize_size.height,
 
					  fromCenter: false,
					  draggable:true,
						layer:true,
						name: 'ST'+Math.floor(Math.random() * (999 - 33 + 1) + 33),
						maxWidth: canvas_stickers_text.width(),
						align:'center',
										  drag: function(l) {
						dragStart(l);	
				  },
 
				  dragstop: function(l) {
							dragStop(l);
				  }
					});
				hideStickersPanel();
				 
			});
			
			
			nanoScrollStart();
		} else {
			showStickersPane();
		}
		
	});
	
	// download story
	story_download.on('click',function(e){
		e.preventDefault();

		ajaxLoading();
		var datauri = self.createImageFromCanvases();

		
 var link = document.createElement('a');
 link.id = "download_canvas_a";
  link.download = 'story-'+  (new Date().toDateString()) +'.jpeg';
  link.href = datauri;
  link.click();
		
		ga('#unique_save_canvas_type,#download_canvas_a').remove();
	});
	
	

	
	// creion function
	story_creion.on('click',function(e){
		
		story_header_def.hide();
		story_footer_def.hide();
		 
 
		
		draw_canvas.addClass('z2').data("jqScribble").enable();
		
		
	if(ga('#story__cnt_creion').length && ga('#story__cnt_creion').css('display') == 'none'){
		
		ga('#story__cnt_creion').show();
		return;
	}
		
		
		story_header_def.before('<div id="story__cnt_creion"><header id="story_brush_panel" class="xCE4Y">\
		<button class="Dl2M5" id="story_ctx_edited_done" href="javascript:void(0);">'+lang.Done+'</button>\
		<div class="gFo7i">\
		<button id="story_prepare_brush1" class="story_brush FZIGk storiesSpriteMarker__outline__44 active "></button>\
		<button id="story_prepare_brush2" class="story_brush _7m-OJ  storiesSpriteChisel__outline__44"></button>\
		<button id="story_prepare_brush3" class="story_brush -nmJK  storiesSpriteMagic__outline__44"></button>\
		<button id="story_prepare_eraser" class="story_brush d7ni5  storiesSpriteEraser__outline__44"></button>\
		</div></header>'+brushSize()+colors()+'</div>');
	

	
		
	
	
	
		// done click
		ga('#story_ctx_edited_done').on('click.doneBrushes', function(e){
			
			ga('#story__cnt_creion').hide();
			story_header_def.show();
			story_footer_def.show();
			draw_canvas.removeClass('z2').data("jqScribble").disable();
		});
	
 
		// update brush range
		ga('.slider_brush_range').on('change',function(e){
			var _val = ga(this)[0].value;
 
			 
			
			draw_canvas.data("jqScribble").update({brushSize:_val});
			
		});
 
 
		// colors picker
		story_header_def.parent().find('#story-pallete-colors').children().each(function(){
			
			ga(this).on('click',function(e){
			e.preventDefault(); 
			var this_color = ga(this).children();
			draw_canvas.data("jqScribble").update({brushColor: this_color.css('background-color')});
			ga('.tbejH.jafog').removeClass('jafog');
			this_color.addClass('jafog');
		});
		
		});
		
		
		// brush 1
		ga('#story_prepare_brush1').on('click',function(e){
			
			
			ga('.story_brush.active').removeClass('active');
			ga(this).addClass('active');
			
			draw_canvas.data("jqScribble").update({brush: BasicBrush});
		});
		// brush 2
		ga('#story_prepare_brush2').on('click',function(e){
			
			
			ga('.story_brush.active').removeClass('active');
			ga(this).addClass('active');
 
			draw_canvas.data("jqScribble").update({brush: StoryBrush2});
		});
		// brush 3
		ga('#story_prepare_brush3').on('click',function(e){
			
			ga('.story_brush.active').removeClass('active');
			ga(this).addClass('active');
 
			draw_canvas.data("jqScribble").update({brush: StoryBrush3});
		});
		
		// eraser
		ga('#story_prepare_eraser').on('click',function(e){
			
			
			ga('.story_brush.active').removeClass('active');
			ga(this).addClass('active');
			
			draw_canvas.data("jqScribble").update({brush:eraser});
 
		});
		
	});
	

	},

	
		this.createImageFromCanvases = function(){
		
var canvasMain = document.createElement('canvas');
var ctx = canvasMain.getContext('2d');
canvasMain.id="unique_save_canvas_type";
canvasMain.width = self.canvas.width();
canvasMain.height = self.canvas.height();
 
    ga( '#new_story_prepare canvas' ).each( function( i ) {
		
		ctx.drawImage(this, 0, 0);    
		
	});


var dataUri = canvasMain.toDataURL("image/jpg"); //extract main canvas as url
ga(canvasMain).remove();
removeAjaxLoad();
return dataUri;
	},

this.create = function(is_video){
	
	
		if(is_video){
			
			return self.createVideoStory();
			
		}
	
	
	
	
	
	
	
	
		var canvas_data = self.createImageFromCanvases();
		ajaxLoading();
		var s = {};
		s['cmd'] = 'create-story';
		s['type'] = 'image';
		s['data'] = canvas_data;
		
		
		var send = jAjax('/stories.php', 'post', s);
		
		send.done(function(data){ 
		
			removeAjaxLoad();
			var d = validateJson(data);
			
			if(d.success == '1'){
				var user_story = ga('[data-story-by-user="'+_U.i+'"]');
				self.closePreparePopup(d.id,1);
				user_story.removeClass('_empty with');
				user_story.find('.story_a_head_name').text(lang.View_your_story);
				user_story.find('.story_a_time_ago').text(lang.just_now);
				user_story.find('[data-new-story-input]').hide();
				user_story.find('.invisible-a-openstory').show();
				
				
				setTimeout(function(){
				user_story.addClass('with');
				user_story.find('#img_story').attr('src','/stories?cmd=view-picture&id='+d.image_id+'&size=thumb');
				user_story.find('.stories-hookData').html('<!--'+d.story_obj+'-->');
				},500);
			} else {
				
				return displayErr(lang.somethingWrongWhileCreatingYourStory);
			}
			
		});
		
		
		
	},
 
this.openStory = function(el,ev,st_id,multi){
	el = ga(el);
 var stories_data = {};
 var stories_data_obj = [];
 
		var story_data = multi ? objHook(ga('.stories_while').find('.hookData_while_stories_friends').html()) : objHook(el.closest('li').find('.hookData.stories-hookData').html());
		var story_DOM_id = 'story'+Math.floor(Math.random() * (999 - 33 + 1) + 33);
		 
		/*
		var story_preview_plugin = '<section id="Story_preview-plugin">\
		<link rel="stylesheet" href="'+_STORY_VIEW_PLUGIN+'/css/zuck.min.css">\
		<link rel="stylesheet" href="'+_STORY_VIEW_PLUGIN+'/skins/snapgram.css">\
		<script src="'+_STORY_VIEW_PLUGIN+'/js/zuck.min.js" type="text/javascript"></script></section>';
		
		if(!ga('body').find('#Story_preview').length)
		ga('body').prepend(story_preview_plugin);
	*/
	 
	
 
	if(multi){
		var stories_data = [];
		
		
		for(var j = 0; j < story_data.length;j++){
					var u_story = story_data[j];
 

 
						 var multi_stories_data_obj = [];
						 for(var i = 0; i < story_data[j].files.length;i++){
							 var s_files = story_data[j].files[i];
							 multi_stories_data_obj.push(Zuck.buildItem("Story-"+u_story.id+"-"+i, s_files.type, 5, s_files.url, s_files.url, '', false, false, s_files.time));
							 
							 
						 }
						stories_data.push({
							
							
							id: "ViewStory-"+u_story.id,
							photo: u_story.author.avatar,
							name: u_story.author.name,
							link: u_story.author.link,
							lastUpdated: u_story.time,
							items: multi_stories_data_obj
							
							
						});
	 
		}
 
 
	} else {
					
					var u_story = story_data;
 
					 stories_data['id'] = "ViewStory-"+u_story.id;
					  stories_data['photo'] = u_story.author.avatar;
					   stories_data['name'] = u_story.author.name;
					    stories_data['link'] = u_story.author.link;
						 stories_data['lastUpdated'] = u_story.time;
 
						 for(var i = 0; i < story_data.files.length;i++){
							 var s_files = story_data.files[i];
							 stories_data_obj.push(Zuck.buildItem("Story-"+u_story.id+"-"+i, s_files.type, 5, s_files.url, s_files.url, '', false, false, s_files.time));
							 
							 
						 }
						 stories_data['items'] = stories_data_obj;
						 stories_data = [stories_data];
	}



				ga('#stories-openable').replaceWith('<div id="stories-openable"></div>');

				var stories = new Zuck('stories-openable', {
				 
									skin: 'snapgram',      // container class
									avatars: true,         // shows user photo instead of last story item preview
									list: false,           // displays a timeline instead of carousel
									openEffect: false,      // enables effect when opening story - may decrease performance
									cubeEffect: true,     // enables the 3d cube effect when sliding story - may decrease performance
									autoFullScreen: false, // enables fullscreen on mobile browsers
									backButton: true,      // adds a back button to close the story viewer
									backNative: false,     // uses window history to enable back button on browsers/android
									previousTap: true,     // use 1/3 of the screen to navigate to previous item when tap the story
									localStorage: false,
									stories: stories_data,
									callbacks:  {
												
												// add views
												onView: function(story_id) { // on view story

												var story__id_num = story_id.split('-')[1];
												var x = {};
												x['cmd'] = 'add-views';
												x['id'] = escape(story__id_num);
												var send = jAjax('/stories.php', 'post',x);
 
												send.done(function(){
													ga('#story_uid_'+story__id_num).addClass('_seen');
												});
												
												
												var v_aj = jAjax('/stories.php', 'post',{'cmd':'get-views','id':story__id_num});
												v_aj.done(function(a){ 
													var a = validateJson(a);
													var story_viewer = ga('.story-viewer');
													var users = '';
													if(a.count > 0 && a.author == _U.i){
														
														var more_users = '', users_details = '';
														

														
														
														if(!story_viewer.find('#story-u-views').length) {
															
															
															for(var i=0; i< a.users.length;i++){
																var user = a.users[i];
																
																
																if(a.count > a.users.length && a.users.length-1 == i){
																	
																	more_users = '<a class="stories-viewed-more nodecor" href="javascript:void(0);" onclick="story.viewAllUsers(this,event,'+story__id_num+','+a.count+');">+'+(a.count - a.users.length)+'</a>';
																}
														
																users_details += '<div class="xji3Xg"><div class="xbgWwf"><img src="/getPhoto?p='+user.user_avatar+'&sz=small" /></div><div class="fcca5w ellip">'+user.user_name+'</div></div>';
																users += '<div class="reXgg3">'+more_users+'<img src="/getPhoto?p='+user.user_avatar+'&sz=small" /></div>'; 
																
															}
															
															
															
															story_viewer.prepend('<section id="story-u-views" onmouseout="ga(\'.story-viewer\').removeClass(\'paused\');" onmouseover="ga(\'.story-viewer\').addClass(\'paused\');" class="soh-s">\
															<div class="foh-s story-users-bxvw">'+users_details+'</div>\
															<ul>'+users+'</ul>\
															</section>');
															
														}
														
														
														 
														
													} 
												});
												
												 
												} 
												 
												
									}
						
									 
 
				});
				
 
				var createdStory = ga('[data-id="ViewStory-'+st_id+'"]');
				createdStory.trigger('click'); 
				
				
			 
			
 
				//createdStory.remove();
		
	},
	this.viewAllUsers = function(el,evt,id,count){
		
		el = ga(el);
		
		evt.preventDefault();
 
		
	var dcont = '<div id="modal_main" style="height:'+(ga(window).height()-180)+'px" class="modal_main ">\
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
			
		
	setTimeout(function(){ga('.story-viewer').addClass('paused');},500);
	ga('<div/>')
		.addClass('story-view-guests-all jboxnpadding')
		.appendTo(ga('body'));
	var jb_ = new jBox('Modal',
	{
		appendTo: ga('.story-view-guests-all'),
		title: lang.story_viewed_by,
		overlay: true,
		fade: false,
		closeButton: 'box',
		//'overflow': 'hidden',
		///'fixed': true,
		///blockScroll: true,
		//height: 'auto',
		width: '600px',
		minHeight: '62px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 0
		},
		
		onClose: function ()
		{
			ga('.story-viewer').removeClass('paused');
			ga('.story-view-guests-all').remove();
		}
	});
	jb_.open()
		.ajax(
		{
			type: 'POST',
			url: '/stories.php',
			data:
			{
				cmd: 'get-story-guests',
				id: id
			},
			reload: true,
			setContent: false,
			cache: false,
			success: function (data)
			{  
				var jCont = ga('.story-view-guests-all .jBox-content');
				if (data == '0') return displayErr(lang.err_tehnic);
				else if (data == '1') return displayErr(lang.not_found);
				else
				{
					var knw_d = validateJson(data);
					var a = knw_d.users;
				 
					if (!count)
					{
						return jb_.setContent(lang.no_guests_on_story);
					}
					jb_.setContent(dcont);
					 
					for (var b = 0; b < a.length; b++)
					{
						var res = a[b];
						jCont.find('ul.photoPeopleLike')
							.append(__plkphotouserMarkup.replace(/%uid/g, res.id)
								.replace(/%photo/g, res.photo)
								.replace(/%uname/g, res.name)
								.replace(/%nickname/g, res.nick)
								.replace(/%yearsold/g, res.yearsold +'&nbsp;'+lang.yearsold)
								.replace(/%cityCountry/g, lang.from + '&nbsp;' +res.user_location)
								.replace(/%gender/, res.gender));
					}
					
					jb_.position();
					setTimeout(function(){ga('.ppymknw.nano').nanoScroller();},1000);
				}
			}
		});
		
		
		
		
		
		
		
		
		
		
	},
 this.shortcutOpenStory = function(uid){
	ga('.invisible-a-openstory#u-'+uid).trigger('click');
 },

	this.playAll = function(el,ev){
		
		ev.preventDefault();
		el = ga(el);
		
		el.closest('section').find('.li_story:not(.my):first').find('.invisible-a-openstory').trigger('click');
		
	},
 
	this.createVideoStory = function(){ 
		var file = self.videoFile;
		

    var files = file;
    var count = 0;
    var totalFiles = files.length;

 


		var finished_file = 1;
		var _calc_fil = 100/parseInt(totalFiles);
		
		var trigger_attachUp = function() {
/*
        if (typeof files[count] === 'undefined' || count > totalFiles - 1) { 
            return false;
        }*/

        var formData = new FormData();
        formData.append('files[]', files);
		formData.append('cmd', 'createVideoStory');
 

		
		
        $.ajax({
            url:'/stories.php',
            type: 'POST',
            xhr: function() { // Custom XMLHttpRequest
                var Xhr = $.ajaxSettings.xhr();
                if (Xhr.upload) { // Check if upload property exists
                    Xhr.upload.addEventListener('progress', function(e) {

                        if (e.lengthComputable) {

                            var p_percentage = Math.round((e.loaded / e.total) * 100);
                            self.story_upload_progress.addClass('on').css('width', (p_percentage) + '%');
							
 
								
                        }




                    }, false); // For handling the progress of the upload
                }
                return Xhr;
            },
            //Ajax events
            beforeSend: function() {
				self.story_upload_progress.removeAttr('style').text(lang.Uploading_please_wait);
				 self.closePreparePopup(1,1);
				self.story_upload_progress.addClass('on');
				
            },
            success: function(data) {  
				
                var response = validateJson(data);

                if (response['status'] === 'OK') {
					finished_file++;
					
					//self.story_upload_progress.removeClass('on').removeAttr('style');
					
					self.story_upload_progress.addClass('_cover').text('Processing video cover...');
				setTimeout(function() {
					self.createCoverForVideoStory(response.video_id,response.story_id);
				}, 50);
					/*	self.prepareStory(response);
				
					
					setTimeout(function() {
                         
                        count++;
                        trigger_attachUp();
                    }, 50);
					*/
					
                } else return displayErr(data);

            },
            error: function() {
				self.story_upload_progress.text('An error occured.');
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
	
	
	
	},
	this.createCoverForVideoStory = function(vd_id,story_id){
		
		var s = {};
		s['cmd'] = 'createCoverForVideo';
		s['id']  = vd_id;
		s['cover'] = self.videoCover;
		s['story_id'] = story_id;
 
		var send = jAjax('/stories.php', 'post', s);
		
		send.done(function(data){ 
		
		 
			var d = validateJson(data);
			
			if(d.success == '1'){
				self.story_upload_progress.removeAttr('style').removeClass('on').text(lang.Uploading_please_wait);
				var user_story = ga('[data-story-by-user="'+_U.i+'"]');
				self.closePreparePopup(d.id,1);
				user_story.removeClass('_empty with');
				user_story.find('.story_a_head_name').text(lang.View_your_story);
				user_story.find('.story_a_time_ago').text(lang.just_now);
				user_story.find('[data-new-story-input]').hide();
				user_story.find('.invisible-a-openstory').show();
				
				
				setTimeout(function(){
				user_story.addClass('with');
				user_story.find('#img_story').attr('src','/stories?cmd=view-picture&id='+d.image_id+'&size=thumb');
				user_story.find('.stories-hookData').html('<!--'+d.story_obj+'-->');
				},500);
			} else {
				
				return displayErr(lang.somethingWrongWhileCreatingYourStory);
			}
			
		});
		
	},
	this.showMore = function(el,ev){
		
		ev.preventDefault();
		
		el = ga(el);
		
		el.closest('.stories_while').children().each(function(){
				
				if(ga(this).css('display') == 'none'){
					ga(this).addClass('_replies__highlight').show();
				}
		});
		nanoScrollStart();
		el.hide();
		
	}
	
}


