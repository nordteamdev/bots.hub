var apps_covers = new Array();
	var reports_id = new Array();
function addCoverInputForGameSection(evt){
	
	var _element = ga(evt.target);
	
	
	_element.before(' <div class="it_w it_w it_w__3gc"><input type="file" name="game.cover[]"></div>');
	
	
	
}



function unverifyGroup(evt,group_id){
	evt.preventDefault();
	var el = ga(evt.target);
	
	var send = jAjax('/admin.php', 'post', 'json=1&cmd=unverify-group&group_id='+escape(group_id));
	send.done(function(d){
		 
		if(d == 1){
			
			
			el.text('Verify this Group');
			el.removeClass('secondary');
		} else 
			alert('An error occured at verifing this group');
		
	});
}
function verifyGroup(evt,group_id){
	
	evt.preventDefault();
	var el = ga(evt.target);
	
	var send = jAjax('/admin.php', 'post', 'json=1&cmd=verify-group&group_id='+escape(group_id));
	send.done(function(d){
		 
		if(d == 1){
			
			
			el.text('Un-verify this Group');
			el.addClass('secondary');
		} else 
			alert('An error occured at verifing this group');
		
	});	
	
}
// upload themes

function uploadThemeImage(evt){
    var file = (evt.target).files[0];
window.URL = window.URL || window.webkitURL;
    evt.preventDefault(); //Stop the submit for now

	var uploadThisThemeImage = function(file){
		
    var formdata = new FormData();

    formdata.append("file[]",file);
	
	 formdata.append("json", 1);
	 formdata.append("cmd", "uploadthemeimage");
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandlerThemes, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "admin.php");
    ajax.send(formdata);
		
		
	};
	
	    if( file ) {
        var img = new Image();

        img.src = window.URL.createObjectURL( file );

        img.onload = function() {
            var width = img.naturalWidth,
                height = img.naturalHeight;

            window.URL.revokeObjectURL( img.src );

            if( width < 960 || height < 320) {
                alert('Sorry, The image size must not be less than 930x320.\nYour image is: '+width+'x'+height+' px.');
            } else if( width > 1800 || height > 390) {
				 alert('Sorry, The image is too big, size must not be higher than 1800x390.\nYour image is: '+width+'x'+height+' px.');
			}else {
				
			uploadThisThemeImage(file);
				
				
			}
            
        };
    }
}
function completeHandlerThemes(event){
	
	var msg = validateJson(event.target.responseText);
	//alert(event.target.responseText);
    _("status").innerHTML = msg.msg;
    _("progressBar").value = 0;
	 _("progressBar").style.display='none';

		 var cv = msg.cover;

		 
		 ga('#covers').prepend('<li style="opacity:1;" class="th_upl_sc_cover"><img src="/cmd/themes/thumb/'+cv+'"></li>');

ga('[name="th_image"]').val(cv);
	
		
	 

	
	
}

// delete theme
function deleteTheme(id){

		var r = confirm("Please confirm the deletion request.");

	if(r){
	var send = jAjax('/admin.php', 'post', 'cmd=deleteTheme&json=1&id='+escape(id));
	send.done(function(d){
		
		if(d === '0'){
			return displayErr(lang.err_tehnic);
			
		} else {
			
			ga("#theme"+id).slideUp(function(){ga(this).remove()});
		}
		
	});
}
}
// upload covers for games
function _(el){
    return document.getElementById(el);
}

function uploadGifts(evt){
    var file = (evt.target).files;
	var ins = file.length;

    // alert(file.name+" | "+file.size+" | "+file.type);
    var formdata = new FormData();
	for (var x = 0; x < ins; x++) {
    formdata.append("files[]",file[x]);
	}
	 formdata.append("json", 1);
	 formdata.append("cmd", "uploadgifts");
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandlerGifts, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "admin.php");
    ajax.send(formdata);
	//}
}

function uploadGameCovers(evt){
    var file = (evt.target).files;
	var ins = file.length;

    // alert(file.name+" | "+file.size+" | "+file.type);
    var formdata = new FormData();
	for (var x = 0; x < ins; x++) {
    formdata.append("files[]",file[x]);
	}
	 formdata.append("json", 1);
	 formdata.append("cmd", "uploadgamecovers");
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "admin.php");
    ajax.send(formdata);
	//}
}

function completeHandlerGifts(event){
	var msg = validateJson(event.target.responseText);
	
	//alert(event.target.responseText);
    _("status").innerHTML = msg.msg;
    _("progressBar").value = 0;
	 _("progressBar").style.display='none';
	 ga('#files').remove();
	var o = 0;
	alert(msg);
	 for(var i =0;i<msg.covers.length;i++){	o++;
		 var cv = msg.covers[i];
		 var sl = o === msg.covers.length ? "_sel" : "";
		 
		 ga('#covers').prepend('<li class="gift '+ sl +'"><img src="/stcmd/gifts/'+cv+'"></li>');

	if(o === msg.covers.length) ga('[name="gift"]').val(cv);
	
		 }
	 
}

function progressHandler(event){
	_("progressBar").style.display='';
   // _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
}
function completeHandler(event){
	var msg = validateJson(event.target.responseText);
	//alert(event.target.responseText);
    _("status").innerHTML = msg.msg;
    _("progressBar").value = 0;
	 _("progressBar").style.display='none';
	var o = 0;
	ga('.g_cover').removeClass('_sel');
	 for(var i =0;i<msg.covers.length;i++){	o++;
		 var cv = msg.covers[i];
		 var sl = o === msg.covers.length ? "_sel" : "";
		 
		 ga('#covers').prepend('<li rel="tipsy" title="Use this as default app cover" class="g_cover '+ sl +'"><A href="javascript:;"  onclick="ga(\'.g_cover\').removeClass(\'_sel\');ga(this).parent().addClass(\'_sel\');ga(\'[name=default_cover]\').val(\''+cv+'\');"><img src="/stcmd/apps-covers/thumb/'+cv+'"></a></li>');

	if(o === msg.covers.length) ga('[name="default_cover"]').val(cv);
	
	apps_covers.push(cv);
		 }
	 
}
function errorHandler(event){
    _("status").innerHTML = "Upload Failed";
}
function abortHandler(event){
    _("status").innerHTML = "Upload Aborted";
}

// submit gift
function addGift(event, f){
	
	
	var send = js_subForm(f);
	send.done(function(data){
	if(data !== 'ok'){
		
		alert(data);
	} else {
		window.location.reload();
		
	}
		
	});
}

// create app
function createNewApp(event,f){

	ga('[name="covers"]').val(JSON.stringify(apps_covers));
	
	var send = js_subForm(f);
	send.done(function(data){
	if(data !== 'ok'){
		
		alert(data);
	} else {
		window.location.reload();
		
	}
		
	});
	
	
}
// delete gift
function deleteGift(id){
	var r = confirm("Please confirm the deletion request.");

	if(r){
	var send = jAjax('/admin.php', 'post', 'cmd=deleteGift&json=1&giftid='+escape(id));
	send.done(function(d){
		
		if(d === '0'){
			return displayErr(lang.err_tehnic);
			
		} else {
			
			ga("#gift"+id).slideUp(function(){ga(this).remove()});
		}
		
	});
}
	
}
// delete app
function deleteApp(id){
	var r = confirm("Please confirm the deletion request.");

	if(r){
	var send = jAjax('/admin.php', 'post', 'cmd=deleteApp&json=1&appid='+escape(id));
	send.done(function(d){
		
		if(d === '0'){
			return displayErr(lang.err_tehnic);
			
		} else {
			
			ga("#app"+id).slideUp(function(){ga(this).remove()});
		}
		
	});
}
	
}
// delete song
function deleteSong(id){
	var r = confirm("Are you sure that you want to delete this track ?");

	if(r){
	var send = jAjax('/admin.php', 'post', 'cmd=deleteTrack&json=1&id='+escape(id));
	send.done(function(d){
		
		if(d == 0){
			return displayErr(lang.err_tehnic);
			
		} else {
			
			ga("#track"+id).css('opacity','0.6').slideUp(function(){ga(this).remove()});
		}
		
	});
}
}
// delete video
function deleteVideo(id){
	var r = confirm("Are you sure that you want to delete this video ?");

	if(r){
	var send = jAjax('/admin.php', 'post', 'cmd=deleteVideo&json=1&id='+escape(id));
	send.done(function(d){
		
		if(d == 0){
			return displayErr(lang.err_tehnic);
			
		} else {
			
			ga("#vd"+id).css('opacity','0.6').slideUp(function(){ga(this).remove()});
		}
		
	});
}
}

// delete post
function deletePost(id){
	var r = confirm("Are you sure that you want to delete this post ?");

	if(r){
	var send = jAjax('/admin.php', 'post', 'cmd=deletePost&json=1&id='+escape(id));
	send.done(function(d){
		
		if(d == 0) {
			return displayErr(lang.err_tehnic);
		} else {
			ga("#p"+id).css('opacity','0.6').slideUp(function(){ga(this).remove()});
		}
		
	});
}
}


function formatCheckbox(){
	var _chbox_isvd = ga('.chbox_group').hasClass('vd');
	var _chbox = ga('.chbox_group input');

	var _evt_namespace = 'vd'
	
	_chbox.off('click.'+_evt_namespace).on('click.'+_evt_namespace, function(e){
		

		var a = ga(this);
		var _input = a.parent().hasClass('vd') ? ga('#vd_valid_formats') : ga('#valid_formats');
	
		if(a.is(':checked')){
			
			if( !$.trim(_input.val()) )
			_input.val(a.val());	
			else
			_input.val(_input.val()+', '+a.val());
			
		} else {
			_input.val(_input.val().replace(', '+a.val(), '').replace(a.val()+', ','').replace(a.val(),'')   );
			
		}
		
	});
	
}

function removeInput(e){
	
	var el = ga(e.target);
	
	el.closest('.soh-s').remove();
	
}

function addInput(e,name,isarray){
	
	var el = ga(e.target);
	
	el.before('<div class="medadd_c_polla_wr soh-s"><input name="'+name+(isarray ? '[]' : '')+'" id="'+name+'" value="" type="text" class="poll_options_04a">\
    <div class="foh-s page_media_x_wrap medadd_c_pollrem" title="Remove option" onclick="return removeInput(event);">\
        <div class="page_media_x"></div>\
    </div></div>').find('input:first').focus();
	
}

// live preview for inputs, textarea
function livepreview(){
	
	ga(document).off('keyup.livepreview').on('keyup.livepreview', 'textarea', function(e){
		e.preventDefault();
		var _this = ga(this);
		var _preview = _this.closest('.form-group').find('.preview-txt');
		var _preview_fieldset = _this.closest('.form-group').find('fieldset.livepreview');
		_preview.html(_this.val());
		
		if( $.trim(_this.val())  )
		  _preview_fieldset.fadeIn();
	  else
		  _preview_fieldset.hide();
	});
	
	ga(document).ready(function(){
		ga('.ads-textarea').trigger('keyup.livepreview');
	});
	
}

//hide all previews
function hidePreviews(evt){
	var _this = ga(evt.target);
	if(_this.is(':checked'))
	ga('fieldset.livepreview').addClass('__hide');
else
	ga('fieldset.livepreview').removeClass('__hide');
}

// admin panel notification messages
function admincpMsgNotif(evt){
	evt.preventDefault();
	var _t = ga(evt.target);
	
	var _b = ga('body'), _top_feedback_d = ga('.admincp_messages_top');
	
	
	var removeTopFeedbackBox = function(){
		_top_feedback_d.find('#feedback_notif_box').remove();_t.parent().removeClass('focus');
	};
	
	if(!_b.find('#feedback_notif_box').length){
		ajaxLoading();
		_t.parent().addClass('focus');
		var send = jAjax('/admin.php', 'post', 'cmd=getFeedbackMsgs&json=1');
	send.done(function(d){
		removeAjaxLoad();
	
		_top_feedback_d.prepend(d);
		
		ga('#f.nano').nanoScroller();
		
	});
		
		
		
		
	} else {
		
		removeTopFeedbackBox();
		
	}
	
	_b.off('keyup.closeTopFeedbackBox').on('keyup.closeTopFeedbackBox', function(e){
		
		
		if(e.keyCode == 27) removeTopFeedbackBox();
		
	});
	
}
function adminPopup(w,h,title,cnt){
	w = w && w !== 'auto' ? w : '';
	h = h && h !== 'auto' ? h : '';
var _m = '<section id="admin_popup"><div class="layer_ovr" id="lovr_close_adp"></div><div style="width:'+w+'px;height:'+h+';" class="adp_ppc"><div class="adp_title">'+title+'<div class="ic ic_close" id="close_adm_p"></div></div><div class="adp_cnt">'+cnt+'</div></div></section>';	
	
	var rmvAp = function(){
		
		ga('body #admin_popup').remove();
		
	};
	
	rmvAp();
	
	ga('body').prepend(_m);
	
	ga('body').off('keyup.closeadp').on('keyup.closeadp', function(e){
		
		e.preventDefault();
		
		if(e.keyCode == 27) rmvAp();
		
	});
	
	ga(document).off('click.cladp').on('click.cladp', '#close_adm_p,#lovr_close_adp', function(){
		rmvAp();
	});
	
	
}

function getThisFeedback(evt,el){
	
	evt.preventDefault();
	el = ga(el);
	var fid = el.attr('id');
	
	var send = jAjax('/admin.php', 'post', 'cmd=getFeedbackContent&json=1&id='+escape(fid));
	send.done(function(data){
		
		if(data !== 0){
			
			adminPopup('744','530','Feedback',data);
			
		}
		
	});
	
	
}

// save site language
function saveSiteLang(ev,f,l_name){
	ev.preventDefault();
	var _s_btn = ga(ev.target),index_a,index_b, php_obj = new Object(), js_obj = new Object();

php_inputs = ga('fieldset#php_lang input, fieldset#php_lang textarea');
js_inputs = ga('fieldset#js_lang input, fieldset#js_lang textarea');

for (index_a = 0; index_a < php_inputs.length; ++index_a) {
	php_obj[ga(php_inputs[index_a]).attr('name')] =  ga(php_inputs[index_a])[0].nodeName == 'textarea' ? ga(php_inputs[index_a]).html() : ga(php_inputs[index_a]).val();
}
	
for (index_b = 0; index_b < js_inputs.length; ++index_b) 
	js_obj[ga(js_inputs[index_b]).attr('name')] = ga(js_inputs[index_b])[0].nodeName == 'textarea' ? ga(js_inputs[index_b]).html() : ga(js_inputs[index_b]).val();
	
   
   var saveLang = jAjax('/admin.php', 'post', {'json' : 1, 'cmd' : 'updateLang', 'lname' : l_name, 'p_lang' : JSON.stringify(php_obj), 'j_lang' : JSON.stringify(js_obj)});
   ajaxLoading();
   saveLang.done(function(data){
	   
	  removeAjaxLoad();
	  
		if(data === '1')
			kn_liveNotif('Updated!','done',4000,'The language file was successfully updated.');
	   else
		   kn_liveNotif('Ooops!','warn',6000,'An error occured at updatating language file, please retry.');
   });
   
}
function mailFormCheckEmptyInp(e){
	
	var _m_subj = ga('#mail_subject'),
		_m_msg = ga('#mail_message'),
		_m_tp = ga('#mail_to');
		
		if( !$.trim(_m_subj.val()) ){
			e.preventDefault();
			alert('Please enter the subject');
			_m_subj.focus();
			return;
		} else
		if( !$.trim(_m_msg.val()) ){
			e.preventDefault();
			alert('Please enter the message');
			_m_msg.focus();
			return;
		} else
		
		if( !$.trim(_m_tp.val()) ){
			e.preventDefault();
			alert('Who get the message ? select category of users.');
			_m_tp.focus();
			return;
		} else
		
		return true;
}
function LangaddInput(e){
	
	var el = ga(e.target);
	var r_id = randomIntFromInterval(99, 9999);
	/*
	el.before('<div class="medadd_c_polla_wr soh-s">\
	<input type="text" name="l_key'+r_id+'" id="l_ley'+r_id+'" placeholder="Language key" class="poll_options_04a" />\
	<input name="'+name+'" id="'+name+'" type="text" placeholder="Label" class="poll_options_04a">\
    <div class="foh-s page_media_x_wrap medadd_c_pollrem" title="Remove option" onclick="return removeInput(event);">\
    </div></div>').find('input:first').focus();*/
	
	var _lkey = ga('<input/>').attr({ "type" : "text", "name" : "l_key"+r_id, "id" : "l_key"+r_id, "placeholder" : "Language key"}).addClass('poll_options_04a');
	//var _llabel = ga('<input/>').attr({ "name" : r_id, "id" : r_id, "type" : "text", "placeholder" : "Label", "autocomplete" : "off" }).addClass('poll_options_04a');
	var _llabel = ga('<textarea/>').attr({ "name" : r_id, "id" : r_id, "type" : "text", "placeholder" : "Label", "autocomplete" : "off" }).addClass('poll_options_04a _likeinput');
	var m =	'<div class="form-group soh-s">'+
	'<label class="col-md-3" for="'+r_id+'">'+
	'</label>'+
	'<div labeldiv="true" class="col-md-6">'+
	'<div class="foh-s lang_remove_inp" title="Remove option" onclick="return removeInput(event);"><div class="page_media_x"></div></div>'+
	'</div></div>';
	
	
	
	m = ga(m);
	m.find('label').html(_lkey);
	m.find('[labeldiv="true"]').prepend(_llabel);
	el.before(m);
	
	_lkey.on('blur', function(e){
		
	if( $.trim(ga(this).val())) {
		ga(this).replaceWith('<span title="'+this.value+'">'+this.value+'</span>');
		//ga(this).parent().removeAttr('for').attr('for',this.value);
		_llabel.attr({'name':this.value, 'id' : this.value});
	}
	
	
	}).focus();/*
	_llabel.on('keyup',function(e){
		var _ntxt = !true;
		if( this.value.length >= 70 && !ga(this).hasClass('hastxt'))
		{
			_ntxt = ga('<textarea id="'+this.getAttribute('id')+'" name="'+this.getAttribute('id')+'" class="form-control input-md">'+this.value+'</textarea>');
			ga(this).addClass('hastxt').hide().after(_ntxt);
			_ntxt.focus();
			//ga(this).replaceWith().focus();
		
		
		}else{ //if( this.value.length < 70 && ga(this).hasClass('hastxt') )  //this.nodeName == 'textarea')
			//_ntxt.hide();
			_llabel.parent().find('textarea').hide();
			_llabel.show();
		}
			///ga(this).replaceWith('<input id="'+this.getAttribute('id')+'" name="'+this.getAttribute('id')+'" type="text" class="poll_options_04a" value="'+this.value+'" autocomplete="off">');
			
	});*/
	_llabel.autogrow({ vertical: true, horizontal:false });

}

function markAllChBxTbl(evt){
	

	
	var _this = ga(evt.target);

	_this.closest('table').find('tr input[type="checkbox"]').each(function(){
		
		if(_this.is(':checked')){
		ga(this)[0].checked=true;
		ga('.last-btn').show();
		reports_id.push(ga(this).data('rid'));
	}else{
		ga(this)[0].checked=false;
		ga('.last-btn').hide();
		reports_id = new Array();
	}
	});
	
	
}

function markAsReadAllCheckedReports(el){
	el = ga(el);

	
	if(reports_id.length){
		ajaxLoading();
		var send = jAjax('/admin.php', 'post', 'json=1&cmd=reportsMarkAsRead&ids='+JSON.stringify(reports_id));
		send.done(function(data){

			removeAjaxLoad();
		if(data == 1){
			kn_liveNotif('Updated!','done',4000,'Selected reports was successfully marked as read.');
			window.location.reload();
		}else
		   kn_liveNotif('Ooops!','warn',6000,'An error occured at marking reports, please retry.');
		});
		
	} else {
		el.hide();
		alert('Please tick an item to mark as read.');
	}
	
}

function showActButton(el){
	el = ga(el);
	
	if( el.is(':checked') ){
		ga('.last-btn').show();
		reports_id.push(el.data('rid'));
	}else{
		ga('.last-btn').hide();
		reports_id = new Array();
}


}

ga(document).ready(function(){
	var _biiq = ga('.nav_lmenu .mcatli._act').parent();
	var pos_active_lm = _biiq.length ? _biiq.position().top - 10 : false;
	ga('.mcatli').hover(function(){
		
		ga(this).parent().prev().addClass('no_underline');
	}, function(){
		if(!ga(this).parent().prev().hasClass('_important'))
		ga(this).parent().prev().removeClass('no_underline');
		
	});
	ga('.mcatli._act').parent().prev().addClass('no_underline _important');
	ga('.nano').nanoScroller({ scrollTop: pos_active_lm ? pos_active_lm : 30 });

	
	// search
	ga('.toolbar_search._admin,.toolbar_search._admin input').on('click.adcp_search',function(e){
	//	e.preventDefault();
		e.stopPropagation();
		ga(this).closest('.toolbar_search._admin').addClass('_focus');
		ga('.topheader_submit_search_btn').show();
		ga('.toolbar_search._admin .ui-selectmenu-button').css({'visibility':'visible','opacity':'1'});
	});
	
	ga(document).off('click.adcp_search').on('click.adcp_search', function(e){
		ga('.toolbar_search._admin').removeClass('_focus');
		ga('.topheader_submit_search_btn').hide();
		ga('.toolbar_search._admin .ui-selectmenu-button').css({'visibility':'hidden','opacity':'0'});
	});
	ga( '#adcp_header_search_select' ).on( "selectmenuselect", function( e, ui ) {  
		e.stopPropagation();

	});
});