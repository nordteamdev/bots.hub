function communitiesFirstStep(evt){
	
	var _el = ga(evt.target),
	comm_title = ga('#group_create_title'),
	comm_type = ga('#community_type'),
	comm_general_category = ga('#comm_general_category'),
	comm_category = ga('#comm_category'),
	comm_subcategory = ga('#comm_subcategory'),
	comm_cover = ga('#community_cover_url'),
	comm_website = ga('#group_create_website'),
	comm_description = ga('#group_edit_desc'),
	comm_privacy = ga('#community_privacy'),
	comm_bd_day = ga('#community_bd_day').val(),
	comm_bd_month = ga('#community_bd_month').val(),
	comm_bd_year = ga('#community_bd_year').val(),
	comm_location = ga('#community_location_v').val(),
	comm_location_lat = ga('#community_location_lat').val(),
	comm_location_lon = ga('#community_location_lon').val(),
	comm_location_data = ga('#community_location_data').val();
	
	var c_birthday = '';
	
	if( (comm_bd_day && comm_bd_month && comm_bd_year) && ( comm_bd_year >= 1900 &&  (comm_bd_month <= 12 && comm_bd_month > 0) && (comm_bd_day > 0 && comm_bd_day <= 31)  ) ){
		
		c_birthday = comm_bd_year+'-'+comm_bd_month+'-'+comm_bd_day;
		
	}
	

	
	var applyButton = function(c) {
		
		
		switch(c){
			
			case 'enable':
			_el.text(lang.Create_community).removeAttr('disabled');
			break;
			
			case 'disable':
			_el.text(lang.Loading_please_wait).attr('disabled',true);
			break;
			
		}
		
	}
	
	var commHighlight = function(a){
		
		
		a.addClass('err_highlight').focus().on(endAnimationEvent() + '.commHighlight', function(e) {
			
			ga(this).removeClass('err_highlight');
		});
		
	}
	
	
	if( !$.trim(comm_title.val())){
		
		commHighlight(comm_title);
		
		return applyButton('enable');
		
	}
	else if( !$.trim(comm_type.val())){
		
		commHighlight(ga('.comm_radios'));
		
		return applyButton('enable');
		
	}else if( !$.trim(comm_general_category.val())){
		
		commHighlight(ga('.generalcategory'));
		
		return applyButton('enable');
		
	}
	else if( !$.trim(comm_category.val())){
		
		commHighlight(ga('.generalcategory'));
		
		return applyButton('enable');
		
	}else if( comm_subcategory.length && !$.trim(comm_subcategory.val())){
		
		commHighlight(ga('.generalcategory'));
		
		return applyButton('enable');
		
	} else {
		
		if(!this.go) {
		applyButton('disable');
		setTimeout(function(){ga('#community_step_two').show();applyButton('enable');},1000);
		this.go = 1;
		} else {
			applyButton('disable');
			this.go = 0;
			var send = jAjax('/communities.php', 'post',{ 
			
			'cmd':'saveCommunity',
			
			'd':JSON.stringify({ 
		
			'title': comm_title.val(),
			'type' : escape(comm_type.val()),
			'general_category' : comm_general_category.val(),
			'category' : comm_category.val(),
			'subcategory' : comm_subcategory.length ? comm_subcategory.val() : '',
			'cover' : comm_cover.val(),
			'website' : comm_website.val(),
			'description' : comm_description.val(),
			'privacy' : escape(comm_privacy.val()),
			'birthday' : c_birthday,
			'location' : comm_location,
			'location_lat' : comm_location_lat,
			'location_lon' : comm_location_lon,
			'location_data' : $.trim(comm_location_data) ? objHook(comm_location_data) : ''

			})
			
			});
				send.done(function(d){
					
					var r = validateJson(d);
					
					
					if(r['msg'] == '1'){
						
						
						setTimeout(function(){
							ga('#community_go').attr('href','/community/'+r.id).trigger('click');
							ga('#new_comm_popup_close').trigger('click');
						},500);
						
					} else {

						return kn_liveNotif(lang.community_not_create,'error',5000,lang.community_error_creating);
						
					}
					
				});
			
		}

	}
}

function communityUpdate(evt){
	
	var _el = ga(evt.target),
	comm_title = ga('#group_create_title'),
	comm_type = ga('#community_type'),
	comm_general_category = ga('#comm_general_category'),
	comm_category = ga('#comm_category'),
	comm_subcategory = ga('#comm_subcategory'),
	comm_cover = ga('#community_cover_url'),
	comm_website = ga('#group_create_website'),
	comm_description = ga('#group_edit_desc'),
	comm_privacy = ga('#community_privacy'),
	comm_allow_to_add_post = ga('#allow_to_post_input').val(),
	comm_bd_day = ga('#community_bd_day').val(),
	comm_bd_month = ga('#community_bd_month').val(),
	comm_bd_year = ga('#community_bd_year').val(),
		comm_location = ga('#community_location_v').val(),
	comm_location_lat = ga('#community_location_lat').val(),
	comm_location_lon = ga('#community_location_lon').val(),
	comm_location_data = ga('#community_location_data').val();
	
	var c_birthday = '';
	
	if( (comm_bd_day && comm_bd_month && comm_bd_year) && ( comm_bd_year >= 1900 &&  (comm_bd_month <= 12 && comm_bd_month > 0) && (comm_bd_day > 0 && comm_bd_day <= 31)  ) ){
		
		c_birthday = comm_bd_year+'-'+comm_bd_month+'-'+comm_bd_day;
		
	}
	

	
	var applyButton = function(c) {
		
		
		switch(c){
			
			case 'enable':
			_el.removeAttr('disabled');
			break;
			
			case 'disable':
			_el.attr('disabled',true);
			break;
			
		}
		
	}
	
	var commHighlight = function(a){
		
		
		a.addClass('err_highlight').focus().on(endAnimationEvent() + '.commHighlight', function(e) {
			
			ga(this).removeClass('err_highlight');
		});
		
	}
	
	
	if( !$.trim(comm_title.val())){
		
		commHighlight(comm_title);
		
		return applyButton('enable');
		
	}
	else if( !$.trim(comm_type.val())){
		
		commHighlight(ga('.comm_radios'));
		
		return applyButton('enable');
		
	}else if( !$.trim(comm_general_category.val())){
		
		commHighlight(ga('.generalcategory'));
		
		return applyButton('enable');
		
	}
	else if( !$.trim(comm_category.val())){
		
		commHighlight(ga('.generalcategory'));
		
		return applyButton('enable');
		
	}else if( comm_subcategory.length && !$.trim(comm_subcategory.val())){
		
		commHighlight(ga('.generalcategory'));
		
		return applyButton('enable');
		
	} else {
		
		 
		    applyButton('disable');

			var send = jAjax('/communities.php', 'post',{ 
			
			'cmd':'updateCommunity',
			'id' : escape(_el.data('id')),
			'd':JSON.stringify({ 
			
			'title': comm_title.val(),
			'type' : escape(comm_type.val()),
			'general_category' : comm_general_category.val(),
			'category' : comm_category.val(),
			'subcategory' : comm_subcategory.length ? comm_subcategory.val() : '',
			'cover' : comm_cover.val(),
			'website' : comm_website.val(),
			'description' : comm_description.val(),
			'privacy' : escape(comm_privacy.val()),
			'birthday' : c_birthday,
			'allow_to_post' : comm_allow_to_add_post,
			'location' : comm_location,
			'location_lat' : comm_location_lat,
			'location_lon' : comm_location_lon,
			'location_data' : $.trim(comm_location_data) ? objHook(comm_location_data) : ''
			})
			
			});
				send.done(function(d){
					  
					var r = validateJson(d);
					
					
					if(r['msg'] == '1'){
						
						
						setTimeout(function(){
												ga('#community_go').attr('href','/community/'+r.id+'?update='+(new Date().getTime())).trigger('click');
												ga('#new_comm_popup_close').trigger('click');
						},500);
						
					} else {

						return kn_liveNotif(lang.community_not_updated,'error',5000,lang.community_error_updating);
						
					}
					
				});
			
		}


}


// check cover size before upload
function checkCommCoverSize(evt){
	var input = ga(evt.target);

var _URL = window.URL || window.webkitURL;

    var comm_file, comm_img;
    if ((comm_file = input[0].files[0])) {
        comm_img = new Image();
        comm_img.onload = function () {

		if(this.width < 795 || this.height < 200)
			return ga('.comm_cover_error').html(lang.community_cover_size);
		else
			uploadCommunityCover(evt);
        };
        comm_img.src = _URL.createObjectURL(comm_file);
    }
	
	
}
// update status message
function communityUpdateStatus(event) {
	
	var el = ga(event.target).closest('#comm_current_info');
	
	var comm_status_txt = ga('#comm_update_status'), comm_up_status = ga('.comm_status_update');

	
	
		if(comm_up_status.hasClass('hidden')){
			el.hide();
			comm_up_status.removeClass('hidden').show();
			comm_status_txt.focus();
			return;
		}

	comm_status_txt.emojiarea({
                wysiwyg: true,
                buttonLabel: 'Emojis'+ (new Date()).getTime(),
                buttonPosition: 'after',
                button: '#comm_sm_btn'
            });


	
var limit = 100;
comm_up_status.find('div:first').keypress(function() {
	var l = this.innerHTML.length;
	
	ga('.comm_status_update_maxlength').html(  (limit - l) < 0 ? 0 : limit - l  );
	
  return  l < limit;
}).on({
  'paste': function(e) {
    var len = this.innerHTML.length,
      cp = e.originalEvent.clipboardData.getData('text');
    if (len < limit)
      this.innerHTML += cp.substring(0, limit - len);	
    return false;
  },
  'drop': function(e) {
    e.preventDefault();
    e.stopPropagation();
  }
});
			
	comm_up_status.show();
	el.hide();
}

function communityUpdateStatusCancel(evt){

	ga('.comm_status_update').addClass('hidden').hide();
	ga('#comm_current_info').fadeIn();
	
}

function communityStatusSave(evt) {
	
	evt.preventDefault();
	
	var c_status = ga(evt.target).closest('.comm_status_update').find('[contenteditable]').text();
	
	ajaxLoading();
	
	var send = jAjax('/communities.php', 'post', {'cmd':'saveStatus', 'id' : escape(ga(evt.target).data('clubid')), 'status': c_status});
	send.done(function(d){
		removeAjaxLoad();
		var b = validateJson(d);
		
		
		if(b.msg != '0') {
			
		
			
			if(b['status'] != '') 
				ga('#comm_current_info>span').html(b['status']).removeClass('no_current_info').addClass('my_current_info');
			else 
				ga('#comm_current_info>span').html( ga('#comm_current_info').data('nocurrinfotxt') ).removeClass('my_current_info').addClass('no_current_info');
			
			
				
			ga('#community_cancel_updating_status').trigger('click');
			
		} else {
			
			kn_liveNotif(lang.community_set_status_err,'error',5000,lang.community_set_status_err_descr);
			
		}
		
		
		
	});
	
}
/* change cover */
function changeCommunityCover(evt){
	

	
	var el = ga(evt.target);	
	var jb_ = new jBox('Modal',
	{
		id:'comm_change_cover',
		title: lang.Change_cover,
		overlay: true,
		fade: false,
		draggable:true,
		closeButton: 'box',
		'overflow': 'hidden',
		'fixed': false,
		blockScroll: true,
		height: 'auto',
		width: '640px',
		minHeight: '100px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 70
		},
		onClose:function(){
			
			ga('#comm_change_cover').remove();
		}
	});

	jb_.open()
		.ajax(
		{
			type: 'POST',
			url: '/communities.php',
			data:
			{
				cmd: 'changeCover',
				id:escape(el.parent().data('id'))
			},

			reload: true,
			setContent: true
		});
}

/* delete cover */
function deleteCommunityCover(evt){
	
	
	var send = jAjax('/communities.php','post',{cmd:'deleteCover',id:ga(evt.target).parent().data('id')});
	
	send.done(function(d){  
		var b = validateJson(d);

		
		if(b.msg == '1'){
			
			ga('.page_cover .comm_page_cover>img').attr({'src':b.default_cover,'style':''}).addClass('height100');
			ga('.page_cover_action.delete,.page_cover_action.edit').hide();
			
			
		} else {
			
			return displayErr(b.msg);
		}
		
	});
	
}

// join the group
function joinThisGroup(evt,notif) {
	
	var btn = ga(evt.target);
	var g_id = escape(btn.data('id'));
	
	ajaxLoading();
	
	var send = jAjax('/communities.php','post',{cmd:'join',id:g_id});
	send.done(function(data){  
		
		if(data == '1'){
			if(ga('#private_community').length) ga('#private_community').trigger('click');
			ga('#unjoin_button_'+g_id).addClass('show');
			ga('#join_button_'+g_id).removeClass('show');
			kn_liveNotif(lang.community_subscribe_success,'done',4000,lang.community_subscribe_success_descr);
			
			if(notif){
				ga('#subscribed_success_'+g_id).show();
				ga('#notif_club_close_'+g_id).text(lang.close);
				btn.remove();
			}
			
		} else {
			
			kn_liveNotif(lang.community_subscribe_error,'error',4000,lang.comm_subscribe_error_descr);
			
		}
		removeAjaxLoad();
		
	});
	
	
}

// confirm ujoin group
function confirmUnjoin(evt){
	
	confirm_act(lang.confirm_unjoin_group, function(event){
		unjoinThisGroup(evt);
		
		});
	
}

// unjoin the group
function unjoinThisGroup(evt) {
	
	var btn = ga(evt.target);
	var g_id = escape(btn.data('id'));

	
	
	ajaxLoading();
	
	var send = jAjax('/communities.php','post',{cmd:'unjoin',id:g_id});
	send.done(function(data){
		
		if(data == '1'){
			if(ga('#private_community').length) ga('#private_community').trigger('click');
			ga('#unjoin_button_'+g_id).removeClass('show');
			ga('#join_button_'+g_id).addClass('show');
			kn_liveNotif(lang.community_unsubscribe_success,'done',4000,lang.community_unsubscribe_success_descr);
		} else {
			
			kn_liveNotif(lang.community_unsubscribe_error,'error',4000,lang.comm_unsubscribe_error_descr);
			
		}
		removeAjaxLoad();
		
	});
	
	
}

function communityCoverEdit (evt) {
	
	
	var el = ga(evt.target);
	var pos = el.data('position');
	var cover_menu = ga('.page_cover_menu');
	var _image_cover = ga('.community_page_cover');
	var _c_image_cover = ga('.comm_page_cover');
	var _c_no_pointer = ga('.c_no_pointer');
	
	var _start_cv_st = ga('.comm_page_cover').html();
	
	var _reposition_bottom_control = ga('.page_cover .theme_custom_cvk_sv');
	
	cover_menu.hide();
	_c_no_pointer.hide();
	
	var cancelRepositionCover = function(a){
		
		_reposition_bottom_control.hide();
		_image_cover.addClass('_default_cur');
		if(!a)ga('.comm_page_cover').html(_start_cv_st);
		cover_menu.show();
	    _c_image_cover.imagedrag('destroy');
		_c_no_pointer.show();
	};
	
	// cancel
	ga('#comm_cancel_wrap_theme').off('click.cancelRepositionCover').on('click.cancelRepositionCover',function(e){
		cancelRepositionCover();
	});
	
	// save
	ga(document).off('click.saveTheme','#comm_save_wrap_theme').on('click.saveTheme', '#comm_save_wrap_theme', function(){
							
							ajaxLoading();
							var send = jAjax('/communities.php', 'post', {
							cmd:'communitySaveCover',
							position: escape(ga('#community_cover_position').val().replace('px','')),
							id: escape(el.data('id'))
							
							});
							send.done(function(data){
						
								removeAjaxLoad();
								if(data === '1') {
									cancelRepositionCover(1);
									kn_liveNotif(lang.theme_saved,'done',4000,'');
								}else 
									kn_liveNotif(lang.cover_was_not_saved,'error',4000,lang.comm_err_save_cover);
								
							});
							
							
	});
	

	setTimeout(function(){
	
				_c_image_cover.imagedrag({
															input: "#community_cover_position",
															position: pos ? pos+'px' : 'top',
															attribute: "value"
														});
														_image_cover.removeClass('_default_cur');
														_reposition_bottom_control.show();
									},100);
	
}

/* upload cover
*/
function uploadCommunityCover(evt){

		
		var input = ga(evt.target);
		var el = input;
		var _form_i = input.closest('#commCover');
		var form_data = new FormData(_form_i[0]);

		$.ajax(
		{
			url: '/communities.php', //Server script to process data
			type: 'POST',
			xhr: function ()
			{ // Custom XMLHttpRequest
				var Xhr = $.ajaxSettings.xhr();
				if (Xhr.upload)
				{ // Check if upload property exists
					Xhr.upload.addEventListener('progress', function (e)
					{
							var upload_percentage = ajaxuploadprogress(e);
							
							_form_i.parent().find('.comm_upload_bar').css({'width':upload_percentage+'%'});
								
							
					}, false); // For handling the progress of the upload
				}
				return Xhr;
			},
			//Ajax events
			beforeSend: function (jqXHR)
			{
							
				ga('.comm_cover_error').empty();
				_form_i.parent().find('.comm_upload_bar').css({'width':'0%'});
				if(!validateUpload(input)){
				jqXHR.abort();
				return ga('.comm_cover_error').html(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
				} else {
				
				_form_i.parent().find('.community_add_cover_txt').show().text(lang.uploading);
				
			
					
				}
				
			},
			success: function (data)
			{   
				var response = validateJson(data);
				if (response['msg'] === 'OK')
				{
					
					
						
					_form_i.hide();
					ga('.comm_cover_preview_succ').html('<img src="'+response.file+'" />');
					ga('#community_cover_url').val( response.s3 == 'yes' ? response.file : response.clean_cover_url  );
					ga('.community_add_cover').addClass('uploaded');
					_form_i.parent().find('.community_add_cover_txt').hide().text('+ '+lang.Add_cover);
					
					if(response['close_p']){ ga('#comm_cover_update_okay_btn').off('click.livechangecommcover').on('click.livechangecommcover',function(){
						
						ga('.comm_page_cover').find('img').attr('src', response.file).removeClass('height100');
						ga('#nohook_modal_close').trigger('click');
						ga('.page_cover_action.delete,.page_cover_action.edit').show();
					}).show();}
					
				}
				else return ga('.comm_cover_error').html(response.msg);
			},
			error: function ()
			{
				return ga('.comm_cover_error').html(lang.somethingWrong);
			},
			// Form data
			data: form_data,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});
	
	
}


/* upload image */
function communityUploadImage(evt,single) {
	
	var el = ga(evt.target);	
	var jb_ = new jBox('Modal',
	{
		id:'comm_upload_image',
		title: lang.Upload_photo_photo,
		overlay: true,
		fade: false,
		draggable:true,
		closeButton: 'box',
		'overflow': 'hidden',
		'fixed': false,
		blockScroll: true,
		height: 'auto',
		width: '640px',
		minHeight: '100px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 70
		},
		onClose:function(){
			
			ga('#comm_upload_image').remove();
		}
	});

	jb_.open()
		.ajax(
		{
			type: 'POST',
			url: '/communities.php',
			data:
			{
				cmd: 'uploadImagesPopup',
				id : escape(el.data('id')),
				single: single
			},

			reload: true,
			setContent: true
		});
	
	
}


/* add logo image */
function communityAddLogo(evt) {
	
		var input = ga(evt.target);

		var _form_i = input.closest('#commLogo');
		var form_data = new FormData(_form_i[0]);
		var progressBar = _form_i.find('.comm-upload-progress-bar');
		var filename = input.val().replace(/C:\\fakepath\\/i, '');

		var parent_progressbar = ga('.parentcommuploadprbar');
		
		
		var HideShowUploadButton = function (a){
			
			// hide/show select files  button
				a ? input.parent().show() : input.parent().hide();
			
			
		}
		
		
		$.ajax(
		{
			url: '/communities.php', //Server script to process data
			type: 'POST',
			xhr: function ()
			{ // Custom XMLHttpRequest
				var Xhr = $.ajaxSettings.xhr();
				if (Xhr.upload)
				{ // Check if upload property exists
					Xhr.upload.addEventListener('progress', function (e)
					{
							var upload_percentage = ajaxuploadprogress(e);
							
							
							
							progressBar.css({'background-size':upload_percentage+'% 100%'});
								
							
					}, false); // For handling the progress of the upload
				}
				return Xhr;
			},
			//Ajax events
			beforeSend: function (jqXHR)
			{
				var c_err_msg = ga('.comm_logo_error');			
				progressBar.css({'background-size':'0% 100%'});
				c_err_msg.empty();
				if(!validateUpload(input)){
				jqXHR.abort();
				parent_progressbar.hide();
				return c_err_msg.html(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
				} else {
				
				// show progress bar
				parent_progressbar.show();
				
				// hide select files  button
				HideShowUploadButton();
				progressBar.text(filename);

			
					
				}
				
			},
			success: function (data)
			{  
			
				var response = validateJson(data);
				if (response['msg'] === 'OK')
				{
					var comm_logo_a = ga('#group_update_profile_image');
					ajaxLoading();
					// close popup
					ga('#nohook_modal_close').trigger('click');
					comm_logo_a.find('img').attr('src',response.small_size);
					setTimeout(function(){removeAjaxLoad();comm_logo_a.addClass('highlight_border');},500);
				
					
				}
				else {
					parent_progressbar.hide();
					HideShowUploadButton(1);
					return ga('.comm_logo_error').html(response.msg);
					
					}
			},
			error: function ()
			{ 
				parent_progressbar.hide();
				HideShowUploadButton(1);
				return ga('.comm_logo_error').html(lang.somethingWrong);
			},
			// Form data
			data: form_data,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});
	
}

/* add images */
function communityAddImages(evt) {
	
	var files_input = ga(evt.target);
	var files = files_input[0].files;
	
	var count = 0;
	var totalFiles = files.length;
	
    var formData = new FormData();
	formData.append('files[]', files[count]);
	
	var communityBuildUploadSkema = function(id){
		
		var comm_upl_markup = '<div class="comm_upload_images" id="cm_upload_'+id+'"><span class="com_file_name">'+files[id].name+'</span></div>';
		
	}

	
	var readPhotos = function (o)
	{
		
		communityBuildUploadSkema(o);
		
		var input = event.target;
		var container = ga('#cm_upload_' + o);
		var output = container.find('img')[0];
		if (container.length)
		{
			var reader = new FileReader();
			reader.onload = function ()
			{
				var dataURL = reader.result;
				if (container.length == 0) return false;
				output.src = dataURL;
				
				container.find('.__uploadingInfo')
					.addClass('__off');
				container.find('.uploading_ovr')
					.addClass('__on');
			};
			reader.readAsDataURL(files[o]);
		}
	}

	var commUploadProgressHandling = function(e, count, ctotal)
	{
		var p_id = ga('#cm_upload_' + count);
		var p_cont = ga('#cm_upload_' + count)
			.find('.main_progress_photo');
		if (e.lengthComputable)
		{
			var p_percentage = Math.round((e.loaded / e.total) * 100);
			p_cont.css('width', p_percentage + '%');
			pBar.find('#totalFiles')
				.text(ctotal);
			if (p_percentage >= 100)
			{
				pBar.find('.progress_photo')
					.css('width', (100 / ctotal) * (count + 1) + '%');
				pBar.find('#uploadedFiles')
					.text(count + 1);
				countPhotos(null, 1);
			}
		}
	};
	
	var trigger_upForm = function ()
	{
		
		
		if (typeof files[count] === 'undefined' || count > files.length - 1)
		{
			var progressBarTimeout;
			var progressBarRemove = function ()
			{
				progressBarTimeout = setTimeout(function ()
				{
					progressBar.remove();
				}, 8000);
			}
			progressBar.hover(function ()
			{
				clearTimeout(progressBarTimeout);
				
			}, function ()
			{
				progressBarRemove();
			});

			progressBarRemove();
			return false;
		}
		


		$.ajax(
		{
			url: '/communities.php', //Server script to process data
			type: 'POST',
			xhr: function ()
			{ // Custom XMLHttpRequest
				var Xhr = $.ajaxSettings.xhr();
				if (Xhr.upload)
				{ // Check if upload property exists
					Xhr.upload.addEventListener('progress', function (e)
					{
						commUploadProgressHandling(e, count, totalFiles);
					}, false); // For handling the progress of the upload
				}
				return Xhr;
			},
			//Ajax events
			beforeSend: function ()
			{
				readPhotos(count);
			},
			success: function (data)
			{//alert(data)
				var response = validateJson(data);
				if (response['status'] === 'OK')
				{
					var container = ga('#cm_upload_' + count);
					if (container.length)
					{
						container.find('img')[0].src = '';
					}
					setTimeout(function ()
					{
						count++;
						trigger_upForm();
					}, 50);
				}
				else
				{ return displayErr(data);}
			},
			error: function ()
			{
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

/* actions button */
function communityActionsMenu(evt) {
	
	evt.stopPropagation();
	
	var el = ga(evt.target);
	var m = ga('#community_action_menu');
	
	if( !m.is(':visible') ){

	m.fadeIn();
	} else {
	m.hide();
	
	}
	
	
}

/* edit community */
function editCommunity(evt,id){
	
	var el = ga(evt.target);

		ga('<div/>')
		.addClass('modal-new')
		.appendTo(ga('body'));
	
	var jb_ = new jBox('Modal',
	{
		appendTo: ga('.modal-new'),
		id:'jb_edit_community',
		title: lang.Edit_community,
		overlay: false,
		fade: false,
		closeButton: 'box',
		'overflow': 'hidden',
		'fixed': false,
		blockScroll: true,
		height: 'auto',
		width: '450px',
		minHeight: '300px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 30
		},onClose:function(){
			ga('#jb_edit_community').remove();
			prn_modal();
		}
	}).open()
		.ajax(
		{
			type: 'POST',
			url: '/communities.php',
			data:
			{
				cmd: 'edit-community',
				id:escape(id)
			},

			reload: true,
			setContent: true
		});
	

	
	
}


function userToAdmin(evt,id) {
	
	var el = ga(evt.target);

		ga('<div/>')
		.addClass('modal-new')
		.appendTo(ga('body'));
	
	var jb_ = new jBox('Modal',
	{
		appendTo: ga('.modal-new'),
		id:'jb_admins_community',
		title: lang.Community_admins,
		overlay: false,
		fade: false,
		closeButton: 'box',
		'overflow': 'hidden',
		'fixed': false,
		blockScroll: true,
		height: 'auto',
		width: '650px',
		minHeight: '300px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 30
		},onClose:function(){
			ga('#jb_admins_community').remove();
			prn_modal();
		}
	}).open()
		.ajax(
		{
			type: 'POST',
			url: '/communities.php',
			data:
			{
				cmd: 'add-admin',
				id:escape(id)
			},

			reload: true,
			setContent: true
		});
}

function communityAddRemoveAdmin(evt,el) {
	evt.preventDefault();
	
	var btn = ga(el);
	var d = btn.data('tosend');
	var n = d;
	
	ajaxLoading();
	
	var m_old_admin =   '<li id="old_ad_'+d.admin_id+'">\
						<a href="javascript:void(0);" class="soh-s" data-tosend=\'{"admin_photo":"'+d.admin_photo+'","admin_fullname":"'+d.admin_fullname+'","admin_id":"'+d.admin_id+'","id":"'+d.id+'","action":"remove"}\' onclick="communityAddRemoveAdmin(event,this);">\
						<div class="verified"></div><div class="verified_admin_remove foh-s"><span>'+lang.remove+'</span></div>\
						<img src="/getPhoto?p='+d.admin_photo+'&sz=small"/><div class="ellip">'+d.admin_fullname+'</div></a>\
						</li>';

	var m_new_admin =   '<li id="new_ad_'+d.admin_id+'">\
						<a href="javascript:void(0);" data-tosend=\'{"admin_photo":"'+d.admin_photo+'","admin_fullname":"'+d.admin_fullname+'","admin_id":"'+d.admin_id+'","id":"'+d.id+'","action":"add"}\' onclick="communityAddRemoveAdmin(event,this);"><img src="/getPhoto?p='+d.admin_photo+'&sz=small"/><div>'+d.admin_fullname+'</div></a>\
						</li>';
	 
	
	var send = jAjax('/communities.php','post', { 'cmd':'cm-admin-'+d.action, 'id':escape(d.id), 'admin_id':escape(d.admin_id) });
	
	switch(d.action) {
		
		
		case 'remove':
		
		
		send.done(function(d){
		 
			removeAjaxLoad();
			
			if(d == 1){
				
				
				ga('#old_ad_'+n.admin_id).remove();
				ga('.comm_p_n_admins').prepend(m_new_admin);
			} else {
				
				
				kn_liveNotif(lang.err_remove_administrator,'warn',4000,'');
				
			}
			
		});
		
		break;
		
		case 'add':
		
		send.done(function(d){
		 
			removeAjaxLoad();
			if(d == 1){
				
				
				ga('#new_ad_'+n.admin_id).remove();
				ga('.comm_popup_curr_admins').prepend(m_old_admin);
			} else {
				
				kn_liveNotif(lang.err_add_administrator,'warn',4000,'');
				
			}
		});
		
		break;
		
	}
	
}

function showCommunityFollowersPopup(evt,id) {
	
	var el = ga(evt.target);

		ga('<div/>')
		.addClass('modal-new')
		.appendTo(ga('body'));
	
	var jb_ = new jBox('Modal',
	{
		appendTo: ga('.modal-new'),
		id:'jb_followers_community',
		title: lang.Community_followers,
		overlay: false,
		fade: false,
		closeButton: 'box',
		'overflow': 'hidden',
		'fixed': false,
		blockScroll: true,
		height: 'auto',
		width: '650px',
		minHeight: '300px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 30
		},onClose:function(){
			ga('#jb_followers_community').remove();
			prn_modal();
		}
	}).open()
		.ajax(
		{
			type: 'POST',
			url: '/communities.php',
			data:
			{
				cmd: 'followers-community',
				id:escape(id)
			},

			reload: true,
			setContent: true
		});
}

/* communities search */
function communitySearch(elm) {
	
	s_key = elm.val();
elm.parent().addClass('cui_search_loading').removeClass('cui_search_field_empty');
	ga('.search_communities_results').css('opacity',.75);
	
	if($.trim(s_key)){
		
		
		
		var send = jAjax('/communities.php','post',{'cmd':'searchGroups','key':decodeURIComponent(s_key)});
		send.done(function(d){
			
			// hide old groups
		ga('#each_group_def').hide();
		ga('.search_communities_results').css('opacity',1);
		// append results
		ga('#search_app_groups').html(d);
		elm.parent().removeClass('cui_search_loading');
		});
		
		
		
		
	} else {
		ga('#comm_clear_search_input').trigger('click');
		
	}
	
	
	
}
function clearCommSearchInput(evt){
	evt.preventDefault();
	
	var el=ga(evt.target);
	el.parent().addClass('cui_search_field_empty').find('input#community_search_query').val('');

		ga('#search_app_groups').empty();
		ga('#each_group_def').show();
		ga('.search_communities_results').css('opacity',1);
}

function communityAlbumSettings(evt,el){
	
	el = ga(el);
	var _d = el.data('si');
	
	
	

		ga('<div/>')
		.addClass('modal-new')
		.appendTo(ga('body'));
	
	var jb_ = new jBox('Modal',
	{
		appendTo: ga('.modal-new'),
		id:'jb_album_community_edit',
		title: lang.Community_edit_album,
		overlay: false,
		fade: false,
		closeButton: 'box',
		'overflow': 'hidden',
		'fixed': false,
		blockScroll: true,
		height: 'auto',
		width: '350px',
		minHeight: '200px',
		position:
		{
			x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		offset:
		{
			x: 0,
			y: 30
		},onClose:function(){
			ga('#jb_album_community_edit').remove();
			prn_modal();
		}
	}).open()
		.ajax(
		{
			type: 'POST',
			url: '/communities.php',
			data:
			{
				cmd: 'album-edit',
				id:escape(_d.clubid),
				albumid:escape(_d.albumid)
			},

			reload: true,
			setContent: true
		});
}
function shareGroupToFriends(evt,el,clubid){
	
	
	
	
	
	
	
		evt.preventDefault();
	
	var _data = JSON.parse(ga('.dvox_cnt').find('input[type=hidden]').val());

	if(_data.length <= 0) { 

			return kn_liveNotif(lang.not_sent,'info',5000,lang.share_group_not_recipients);
	}
	ajaxLoading();
	var send = jAjax('/communities.php','post',{cmd:'share-community',to: _data, id:escape(clubid)}); 
	send.done(function(data){
		removeAjaxLoad();
	 
		if(data == 1) {
			removeShareAsMsg();
			return kn_liveNotif(lang.Sent,'done',5000,lang.share_group_sent);
		} else 
			return kn_liveNotif(lang.Error,'error',5000,lang.err_tehnic);
		
		
	});
	
	
	
	
}

// upload files to community
function communityUploadFiles(evt) {

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
	
	if(img_files.length) post_build_upload(evt,img_files);
	if(vd_files.length) post_build_vid_upload(evt,vd_files);
}



// share community to friends
function inviteFriendsToCommunity(el,ev){
	
	ev.preventDefault();
	
	el = ga(el);
	var _data = el.data('clubdata');
	var _cr_popup = '<section id="share_as_msg">'+
	'<div class="layer_ovr" onclick="removeShareAsMsg();"></div><div class="dvox_shfriends"><div class="dvox_title">'+_data.title+'</div><span title="'+lang.close+'" onclick="removeShareAsMsg();" class="tico tico__n-t notifs_close"><i class="tico_img ic ic_close"></i></span>'+
	'<div class="dvox_divider"></div><div class="dvox_cnt"><div class="dvox_input_title">'+lang.type_a_friend_name+'</div><Div class="text-core"><textarea id="friend_tg" class="friend_tg_txt" rows="1"></textarea></div><div class="dvox_bottom_btns"> <button class="flat_button __small" onclick="shareGroupToFriends(event,this,'+_data.clubid+');">'+lang.Share+'</button> '+
'<button type="button" onclick="removeShareAsMsg();" style="border-color: #fff; color:#000;" class="ml-10 flat_button secondary">'+lang.Cancel+'</button>'+
'	</div></div></div></section>';
	var _b = ga('body');
	
	removeShareAsMsg();
	
	_b.prepend(_cr_popup);
	
			//console.log(validateJson(_all_fr));
			var friends_list = validateJson(_all_fr), suggest_list = [], suggest_list_photo = [];
			
			
		for(var i in friends_list)
      {
      
      
      suggest_list.push(friends_list[i].uname);
      suggest_list_photo[friends_list[i].uname] = {photo:friends_list[i].photo,gender:friends_list[i].gender};

      }
	
	
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
	
	
	_b.off('keyup.closeShareMsgPopup').on('keyup.closeShareMsgPopup', function(e){
		
		if(e.keyCode == 27) removeShareAsMsg();
	});
}
function createCommunityAlbum(evt,update,album_id){
	
	var el = ga(evt.target);
	var album_title = update ? ga('#album_title_update') : ga('[data-new-album="group_new_album_name"]').last();
	var delete_album = update ? ga('#album_delete').is(':checked') : '';
	
	if(!$.trim(album_title.val())){
				album_title.addClass('err_highlight').focus().on(endAnimationEvent() + '.newAlbumTitle', function(e) {
			
			ga(this).removeClass('err_highlight');
		});
		
		return;
	}
	
	ajaxLoading();

	var send=jAjax('/communities.php','post',{cmd: update ? 'update-album' : 'add-album',albumid:escape(album_id),del_album:delete_album,title:$.trim(album_title.val()),id:escape(el.data('id'))});
	send.done(function(data){ 
		removeAjaxLoad();
		var d = validateJson(data);
		
		if(update){
			
			if( d.msg == 1){
				
			setTimeout(function(){ga('#nohook_modal_close').trigger('click');},50);
			var album_id = ga('#group_album_'+d.albumid);
			
			if(d.deleted == 1) { 
				
				if(ga('#h1albumtitle').length) {
					
					ga('.ui_crumb.all_albums').trigger('click');
				}else
				album_id.fadeOut(function(){ga(this).remove()});
			
			} else {
				
				album_id.find('.photo-sc_grid_abt>a').text(album_title.val());
				ga('#h1albumtitle').text(album_title.val());
				ga('.ui_crumb.album_name').text(album_title.val());
			}
			
			} else {
				
				ga('#group_album_edit_ajax_msg').html(d.m_status);
				
				
			}
			
			
			return;
		}
		
		
		if(d.msg == 1){
			var _new_alb_href = ga('#new_album_done_href');
			_new_alb_href.attr('href',_new_alb_href.attr('href')+'/album-'+d.albumid).trigger('click');
			
		} else {
			
			return displayErr(lang.errCreateAlbum);
		}
		
	});
	
	
}
function getCRandomId(){
	
var random_id = random_id || new Date().getTime();	
	return random_id;
}


// load more items in album
function communityAlbumLoadMore(evt){
	
	evt.preventDefault();
	evt.stopPropagation();
	
	var $el = ga(evt.target);
	var data = $el.data('loadcommmore');

	var cmd = data.cmd, clubid = data.clubid, page = data.page, albumid = data.albumid;
	
	///alert(cmd);
	///return;
	
	
	$el.addClass('__disabled');
	ajaxLoading();
	var send = jAjax('/communities.php','post',{'cmd':data.cmd,'albumid':escape(data.albumid),'id':escape(data.clubid),'page':escape(data.page)});
	send.done(function(d){

	
	var $d = ga(d);
		
		
		setTimeout(function(){
				
		removeAjaxLoad();
				
		var c_album = ga('#community_pictures_wall');
		
		
		if(d !== '[END]'){
			// add +1 page
						///$d.filter('.feed').addClass('_nfeed__highlight');
						page++;
			c_album.append($d).justifiedGallery('norewind');
			///communityAlbumPicturesWall(1);
			setTimeout(function(){ga(window).trigger('resize');},300);
			$el.remove();
			setTimeout(function(){c_album.after('<div class="link-show-more loader-controls private _comm_feed_load_more" \
							data-loadcommmore=\'{"cmd":"'+cmd+'","albumid":"'+albumid+'","clubid":"'+clubid+'","page":"'+page+'"}\'\
			onclick="return communityAlbumLoadMore(event);">'+lang.Load_more+'</div>');},1000);
			
			////c_album.append(FeedbuildLoadMoreButton(club_id,page));
			
			////wallPhotosCollage(c_feed, function(){ });
		} else {
			$el.remove();
			feedEmpty(c_album,1);
			
		}
			
		},500);
		
	});
	
}

// wall in page
function communityFeedPage(evt){

	var $el = ga(evt.target);
	var club_id = parseInt($el.data('clubid'));
	var page = parseInt($el.data('page'));
	$el.addClass('__disabled');
ajaxLoading();
	var send = jAjax('/communities.php','post',{cmd:'feed',p:escape(page),id:escape(club_id)});
	send.done(function(d){
$el.remove();
	var $d = ga(d);
		
		
		setTimeout(function(){
				removeAjaxLoad();
		var c_feed = ga('.community_pg_feed');
		
		
		if(d !== '[END]'){
			// add +1 page
			page++;
			$d.filter('.feed').addClass('_nfeed__highlight');
			c_feed.append($d);
			c_feed.append(FeedbuildLoadMoreButton(club_id,page));
			
			wallPhotosCollage(c_feed, function(){ });

							// build map
							if (ga('.community_pg_feed').find('.map-box').length)
								ga('.community_pg_feed').find('.map-box').each(function ()
								{
									var _t_data_ka = ga(this).find('.hookMapData').html();
									var d_lc_map_dt = objHook(_t_data_ka);
									postPopupBuildMap(_t_data_ka, 'feed-tip-map-loc-' + d_lc_map_dt['pl-i']);
								});
			
		} else {
			feedEmpty(c_feed);
			
		}
			
		},500);
		
	});
	
}
function FeedbuildLoadMoreButton(club_id,page){
	page = page || 2;
	return '<div class="link-show-more private loader-controls _comm_feed_load_more" data-clubid="'+club_id+'" data-page="'+page+'" onclick="return communityFeedPage(event);">Load more</div>'
	
}
// get wall
function communityFeed(){
 
	var club = ga('#page_club_id');
	var club_id = club.val();
	
	if(club.length){
		
			
	var send = jAjax('/communities.php','post',{cmd:'feed',id:escape(club_id)});
	send.done(function(d){  console.log(d);
		setTimeout(function(){

		var c_feed = ga('.community_pg_feed');
		
	
		if(d !== '[END]'){  
			c_feed.html(d);
			

			if( ! ga('._comm_feed_load_more').length )
			c_feed.append(FeedbuildLoadMoreButton(club_id,2));
		
		

		
			wallPhotosCollage(c_feed, function(){ });
			 

							// build map
							if (ga('.community_pg_feed').find('.map-box').length)
								ga('.community_pg_feed').find('.map-box').each(function ()
								{
									var _t_data_ka = ga(this).find('.hookMapData').html();
									var d_lc_map_dt = objHook(_t_data_ka);
									postPopupBuildMap(_t_data_ka, 'feed-tip-map-loc-' + d_lc_map_dt['pl-i']);
								});
			
			
		} else {
			
			c_feed.addClass('_transparent _noborder').html(emptyFeedText());
			
		}

		
		},1000);
	});
	
	}
	
}

var community_search_timeout;
ga(document).off('keyup.communitySearch').on('keyup.communitySearch','#community_search_query',
function(e)
{
	var _this = ga(this);
	clearTimeout(community_search_timeout);
	
	community_search_timeout = setTimeout(function(){
		communitySearch(_this);		
	},800);
	
});

ga(document).off('keydown.communitySearch keypress.communitySearch').on('keydown.communitySearch keypress.communitySearch','#community_search_query',
function(e)
{
clearTimeout(community_search_timeout);
});




ga(document).off('mouseover.GroupPage').on('mouseover.groupPage','#group_pg_details',
function(e){
	
	e.preventDefault();
	//e.stopImmediatePropagation();
	
	var add_Album = ga('.comm_add_album'), isADM = ga('#isadm');
	if( isADM.length ){
		
	var el = ga('#group_update_profile_image');
			  el.jBox('Tooltip', {
				    id: 'group_update_profile_image_tooltip',
				    position: {x: 'center', y: 'bottom'},
					content: '<a data-id="'+el.data('id')+'" onclick="communityUploadImage(event,1);" href="javascript:void(0);"><i class="group_upload_ic"></i>'+ lang.Upload_photo_photo +'</a>',
					closeOnMouseleave: true,

	});
	
	}
	
	
	
	if(add_Album.length && isADM.length) {
		
		var add_album_markup = '<div class="comm-add-album-tooltip"><input type="text" placeholder="'+lang.album_title+'" class="it" data-new-album="group_new_album_name" /><div class="comm-new-album-submit-btn"><button class="flat_button" data-id="'+add_Album.data('id')+'" onclick="return createCommunityAlbum(event);">'+lang.Create+'</button></div></div>';
		var el = add_Album;
	
			  el.jBox('Tooltip', {
				    id: 'group_update_profile_image_tooltip',
				    position: {x: 'center', y: 'bottom'},
					pointer:'right:20',
					content: add_album_markup,
					closeOnMouseleave: true,
					trigger:'click'
					/*onOpen:function(){alert('opened'); },
					onClose:function(){
						ga('#group_update_profile_image_tooltip').remove(); 
						random_id = false;
						}*/

			  });
  
	}
	
});


// hide action menu
ga('body').on('click.hideCommunityActionMenu',function(e) {
	ga('#community_action_menu').hide();
});

// in albums page keep to top header nav menu
ga(window).off('scroll.keepNavAlbumMenu').on('scroll.keepNavAlbumMenu',function(e){
	
	var _nav_m = ga('.comm_nav_header'), toolbar_menu = ga('.toolbar.__redesign');
	if(_nav_m.length) {
		
	if( _nav_m.offset().top - (_nav_m.height()/2) <= toolbar_menu.offset().top) {
		
	this.a_start_position = this.a_start_position || _nav_m.offset().top;
	_nav_m.addClass('fixed_always').css({'top':toolbar_menu.height() + (_nav_m.height()/2) - 5,zIndex:10,'opacity':.95,width:_nav_m.parent().width()}); 
	
	} 
	else 
		if(_nav_m.offset().top <= this.start_position) {
		_nav_m.removeClass('fixed_always').removeAttr('style'); this.a_start_position = 0;
	}
	
	}
	
	
	// keep fixed right columns
	var block_to_fixed = ga('.comm_fixed_right');
	
	if( block_to_fixed.length ) {
		
	if( block_to_fixed.offset().top - 40 <= toolbar_menu.offset().top) {
		this.b_start_position = this.b_start_position || block_to_fixed.offset().top;
	block_to_fixed.addClass('fixed_always').css({'left':ga('.shadow_position_fixed').offset().left,'height':(ga(window).height() - toolbar_menu.height())+'px','width':ga('.shadow_position_fixed').outerWidth()+'px','top':toolbar_menu.height() });
    ga('.dgroup_fixed_nano').addClass('nano-content');
	ga(".group_fixed_nano").addClass('nano').nanoScroller(); //init nano

	} else {
		if(block_to_fixed.offset().top <= this.b_start_position) {
		block_to_fixed.removeClass('fixed_always').removeAttr('style'); this.b_start_position = 0;
		    ga(".group_fixed_nano").removeClass('nano').nanoScroller({ destroy: true }); //for destroy nano
			ga('.dgroup_fixed_nano').removeClass('nano-content').removeAttr('style');
	}
	}
	
	}
	
	
});
