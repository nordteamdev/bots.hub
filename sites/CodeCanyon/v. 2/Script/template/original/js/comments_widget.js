var wd_comments_db = [];



function setCursorAfterElement(ele) {
  if (!ele.nextElementSibling) {
    var dummyElement = document.createElement('aftermention')
    dummyElement.appendChild(document.createTextNode('\u00A0'))
    ele.parentNode.appendChild(dummyElement)
  }
  var nextElement = ele.nextElementSibling
  nextElement.tabIndex=0
  nextElement.focus()
  var r = document.createRange();
  r.setStart(nextElement.childNodes[0], 1);
  r.setEnd(nextElement.childNodes[0], 1);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
  //document.execCommand("delete", false, null);
}
	function mentionThis(el,evt,comment_to_id,user_name, user_id){
		var parent_txt = ga('[data-wdcommid="'+comment_to_id+'"]');
		  var textar = parent_txt.find('[contenteditable]');
		   ga('#post-choose-friend-dropdown').remove();
		   textar.empty();
		   parent_txt.find('textarea').val('');
		  textar.html('<umention class="user_tagged_comment">'+user_name+'</umention>');///.focusEnd();

			

		setCursorAfterElement(textar.find('.user_tagged_comment')[0]);

		
		if( ! parent_txt.find('.mentioned_users').length )
		parent_txt.append('<section class="mentioned_users"><input type="hidden" value="'+user_id+'" /><input type="hidden" value="'+user_name+'" /></section>');
		
		
textar.on('keydown.removeTaggedUser', function(event) {
	var el = this;
    // Check for a backspace
    if (event.keyCode == 8) {
        s = window.getSelection();
        r = s.getRangeAt(0)
        el = r.startContainer.parentElement
        // Check if the current element is the .label
        if (el.classList.contains('user_tagged_comment')) { 
            // Check if we are exactly at the end of the .label element
            if (r.startOffset == r.endOffset && r.endOffset == el.textContent.length) {
                // prevent the default delete behavior
                event.preventDefault();
                if (el.classList.contains('highlight')) {
                    // remove the element
                    el.remove();
					parent_txt.find('.mentioned_users').remove();
                } else {
                    el.classList.add('highlight');
                }
                return;
            }
        }
    }
    event.target.querySelectorAll('umention.highlight').forEach(function(el) { el.classList.remove('highlight');})
});
		  
	  }
function commentsWidget(id,$obj,categ,css,$scroll,$container,author_id,limit,noSticky){
	var randId = (new Date()).getTime();
	var randmId = 'comm_widget_'+randId;
	var markup = '<div id="'+randmId+'" class="comm_widget_pb">'+
	'<ul id="comm_wd_con_'+randId+'" class="comm_widget phlayer_ul_comms"></ul>'+
	'</div>'+
	'<div id="comment-typing-notif" class="comment-typing-notif"><div class="typing_txt">'+lang.Someone_typing_comment+'</div><div class="typing-indicator-comments-widget"><span></span><span></span><span></span></div></div>'+
	'<div id="comments_sticky_'+randId+'" data-wdcommid="'+id+'" class="comments-p-sticky">'+
	'<textarea class="comm_wd_emoji" id="post-com-emoji_'+randId+'"></textarea>'+
	'<section class="emoji_input_controls"><a id="smiles_w_'+randId+'" class="em_disc_toolbar_i_ic__sm smiles_w" href="javascript:;"></a></div>'+
	'<div id="WD_tracks_'+id+'" class="WD_attached_tracks __'+categ+'"><ul></ul></div>'+
	'</section>';
	$obj.append(markup);

	var in_community = $obj.hasClass('incommunity');

 
	var cm_txt = buildEmoji('#post-com-emoji_'+randId, '#smiles_w_'+randId, 'post_viewer','after',css,categ,id);
	/* 
	
	if(NODEJS_ENABLED == "yes") {
	var typingComment_Timeout;
	var typingCommentTimeout_func = function() {
				 
		sio.emit("typing_comment", 'no', _U.i, id);
		
	}
	// typing comment notification
	cm_txt.on('keyup.typing_comment',function(e){

			 sio.emit("typing_comment", "yes", _U.i, id);
		 
		 
				clearTimeout(typingComment_Timeout);
				typingComment_Timeout = setTimeout(typingCommentTimeout_func, 1500);
	});
	
	sio.on('typing_comment', function(_typing, uid, post_id) {  console.log(uid);
		
		if(uid != _U.i){
			var $post = ga('[data-wdcommid="'+post_id+'"]').parent();
			if(_typing == 'yes'){
			
				$post.find('#comment-typing-notif').show();
		
			} else {
				
				$post.find('#comment-typing-notif').hide();
				
			}
		
		}
	
	});
	
	}
	*/
	
	
	var $comm_scroll = $scroll ? $scroll : ga(window);
	var $comm_sticky = ga('#comments_sticky_'+randId);
	var $comm_ul = ga('#comm_wd_con_'+randId);
	var $container = ga($container);

	localStorage.setItem('attch_checkUser',author_id);

	WD_getComments(id,categ,'#'+randmId,'',[$comm_scroll,$comm_sticky,$comm_ul,$container,noSticky],limit,in_community);
	
	/*
	//used for get users from database while typing @..
	  cm_txt.mentionsInput({
		onDataRequest:function (mode, query, callback) {  
		 /// $.getJSON('ajax/get_users_json.php', function(responseData) {
			/// var send = jAjax('/cmd.php','post',{cmd:'mention-get-user','mention-key':ga('#post-com-emoji_'+randId).val()});
			/// send.done(function(responseData) { alert(responseData);
			
			var all_friends = validateJson(_all_fr); //console.log(responseData)
			
 
			
			      var responseData = new Array();
                for (var u in all_friends) { 
				if(all_friends[u].allow_tag_in_posts !== 'nobody')
					responseData.push({ 'id':all_friends[u].id, 'name': all_friends[u].uname, 'avatar' : '/getPhoto?p='+all_friends[u].photo+'&sz=small&g='+all_friends[u].gender, 'type':'user'});
				}
			
			
			responseData = _.filter(responseData, function(item) { return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
			callback.call(this, responseData);
		////  });
		}
	  });
	  */

	  
	  
	  
	  var commentsTagUser = function($this, $txt, all_friends) {
	 
 var comment_to = $this.closest('.comments-p-sticky').data('wdcommid');
	 if($txt.length <= 2 || $txt == ''){ 
	  ga('#post-choose-friend-dropdown').remove();
	 return;
	  }
	 
	 
	 
	 
 if ($txt.length >= 4) {
    var l_friends_l = all_friends;
	
    // check for users with same name
    var cnt_same_name = [];
    for (var key in all_friends) {
        if (!tg_k_skip_this && $txt.indexOf(all_friends[key].uname) > -1 && all_friends[key].allow_tag_in_posts != 'nobody') {  
            var found_same_name;
 
            for (var c in l_friends_l) {
                if (l_friends_l[c].uname == all_friends[key].uname && l_friends_l[c].id != all_friends[key].id) {
                    cnt_same_name.push(all_friends[key].id);
                }
            }
        }
    }
  
 
        var crtPostition = $this.caret('position');
        var sv_uname = '',
            last_value = '';
 

 
  var sugg_tg_w = new Array();
  var low_$txt = $txt.toLowerCase();
 
                 for (var u in all_friends) { 
			
				  var user_low_name = all_friends[u].uname.toLowerCase();
				// alert('TXT->'+low_$txt+'\nUnname -> '+all_friends[u].uname.toLowerCase()+'\n'+user_low_name.indexOf(low_$txt));
				
				if(all_friends[u].allow_tag_in_posts != 'nobody' && (user_low_name.indexOf(low_$txt) > -1   )){
					sugg_tg_w.push({ 'id':all_friends[u].id, 'name': all_friends[u].uname, 'photo' : '/getPhoto?p='+all_friends[u].photo+'&sz=small&g='+all_friends[u].gender, 'type':'user'} );
				
				
				} 
				 }
				
		 
				
 if(sugg_tg_w.length > 0) {
 	var mention_td = ga('<section id="post-choose-friend-dropdown" style="display:none;"><div contenteditable="false" style="left:' + Math.abs((crtPostition.left + 150 > $this.width() ? crtPostition.left - 150 : (crtPostition.left < 50 ? 10 : crtPostition.left - 100))) + 'px;" class="post-tag-friend-dropdown"></div></section>');		
         
        // append drop down to choose the user
        if (!ga('section#post-choose-friend-dropdown')
            .length) {
				
	   $this.before(mention_td);
 
        }
 		
        $this.parent().find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
            .empty();
        var added_all_friends_from_dropDown;
		
		
        for (var k = 0; k < sugg_tg_w.length; k++) {
            var p_get_data = sugg_tg_w[k];
     
            $this.parent().find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
                .append('<div class="drp_li_people" id="i-' + p_get_data.id + '" onclick="return mentionThis(this,event,'+comment_to+',\'' + p_get_data.name + '\',\'' + p_get_data.id + '\');"><img src="' + p_get_data.photo + '"><span class="ellip">' + p_get_data.name + '</span></div>');
            sv_uname = p_get_data.uname;
        }
		
		setTimeout(function(){
		if(!isElementInViewport(ga('#post-choose-friend-dropdown').children())) ga('#post-choose-friend-dropdown .post-tag-friend-dropdown').addClass('_top');
 
		},100);
		
		
        $this.parent().find('#post-choose-friend-dropdown .post-tag-friend-dropdown')
            .children()
            .each(function() {
                if (!$(this)
                    .hasClass('__disabled')) added_all_friends_from_dropDown = 1;
            });
			
			
	            $this.parent().find('#post-choose-friend-dropdown')
                .show();
            $this.addClass('__mhg'); 

	  } else {
		  ga('#post-choose-friend-dropdown').remove();
	  }

    tg_k_skip_this = false;
    lastValue = $txt;
 
	  }  
	  }
	 
cm_txt.off('keyup.tagFriendsInComments')
        .on('keyup.tagFriendsInComments', function(e) {
            e.preventDefault();
			e.stopPropagation();
            var $this = ga(this);
            //doneSearchLink = setTimeout(function() {
            var $txt = $this[0].innerText || $this[0].textContent; //$this.text().toLowerCase();
            var all_friends = validateJson(_all_fr);

            if (!this.suggestInited) {
                var sugg_tg_w = new Array();
                for (var u in all_friends) { 
				if(all_friends[u].allow_tag_in_posts !== 'nobody')
					sugg_tg_w.push(all_friends[u].uname);
				}
                SuggestMe.init(ga(this), sugg_tg_w);
                this.suggestInited = true;
            }
	 
            
            commentsTagUser($this, $txt, all_friends);
             
        });
	
	cm_txt.attr('feed-comment-for',categ).off('keypress.sendComm keyup.sendComm keydown.sendComm')
		  .on('keypress.sendComm keyup.sendComm keydown.sendComm', function(e){

			  var _this = this;
			  
			  if(e.keyCode == 13 && !_this._send){ 
			  e.preventDefault();
			  e.stopPropagation();
			
			  _this._send = 1;
			  setTimeout(function(){_this._send = 0;},1000);
			  
			  commWidgetSdComm(e,id,ga('#post-com-emoji_'+randId).val(),ga(this),ga('#'+randmId),categ,$comm_scroll,function(){},in_community);
			  
			  
			  }
			  
		  });


}

	// sticky scroll
	function runWDcommSticky(wd_arr_el){
		
		var $comm_scroll = wd_arr_el[0],
			$comm_sticky = wd_arr_el[1],
			$comm_ul = wd_arr_el[2],
			$cont = wd_arr_el[3],
			nosticky = wd_arr_el[4];
			if(nosticky)return;
		if(!isElementInViewport($comm_ul)) $comm_sticky.addClass('fixed_always __on');
		  // scrolling sticky comment 
		  $comm_scroll.off('scroll.stickyComm'+(new Date()).getTime()).on('scroll.stickyComm'+(new Date()).getTime(), function(e){
			 e.preventDefault();
			 var $this = $(this);
			 var first_comm = $comm_ul.find('li:first');
			 var last_comm = $comm_ul.find('li:last');

			 if(typeof first_comm == undefined || typeof last_comm == undefined
				|| $comm_ul.children().length <= 1) {$comm_sticky.removeClass('fixed_always');return;}
			 
			 var first_comm_offs = first_comm.offset().top;
			 var last_comm_offs = last_comm.offset().top;
			 var comments_length = $comm_ul.children().length;
			 

			if(  $cont.find('.jb_attached_files.__post').children().length && ($this.scrollTop() >= last_comm_offs || $comm_sticky.offset().top >= last_comm_offs))
				$comm_sticky.removeClass('fixed_always __on');
			else
			if($this.scrollTop()-($cont.height() - $comm_ul.height()) <= last_comm_offs + last_comm.outerHeight() + ($comm_sticky.outerHeight() *2) || $comm_sticky.offset().top < last_comm_offs+last_comm.height() ) $comm_sticky.addClass('fixed_always __on');
			 if(comments_length >= 2 && ($comm_sticky.offset().top <= first_comm_offs+first_comm.outerHeight()
			|| $comm_sticky.offset().top >= last_comm_offs+last_comm.height()) ){ 
				 $comm_sticky.removeClass('fixed_always __on');
				
			/// } else {
			//	 $comm_sticky.addClass('fixed_always __on');

			 }
			
			 
			 loadAttach($cont);
			 
			 /*			 else if( $comm_sticky.offset().top >= last_comm_offs+last_comm.height()  ){
				 
				  $comm_sticky.removeClass('fixed_always');
				 
			 }*/
			  
		  });
	}
	

	

function commWidgetSdComm(e,id,comm,text_editor,$container,categ,$scroll,callback,community) {


e.preventDefault();
var random_id = new Date().getTime();
var author_name = _U.n;
var reply = 0;
var _comm_send_files = $container.parent().find('.jb_attached_files.__'+categ);
var _comm_send_files_c = _comm_send_files.children();
var _comm_with_mentioned_users = $container.parent().find('.mentioned_users');
var _comm_with_tracks = $container.parent().find('.WD_attached_tracks>ul');
var _comm_editing = isNumeric(text_editor.attr('comment_edit')) ? parseInt(text_editor.attr('comment_edit')) : '';
var is_reply = typeof text_editor.data('reply-commd') == 'object' && text_editor.attr('data-reply-commd') ? text_editor.data('reply-commd') : '';
var author_name = is_reply && typeof is_reply.auth != undefined ? is_reply.auth : '';
var reply_comm_id = is_reply && typeof is_reply.comm_i != undefined ? is_reply.comm_i : '';
var reply = is_reply && typeof is_reply.reply_mode != undefined ? is_reply.reply_mode : '';
var __post_as_reply = author_name ? '[postReply]@'+author_name+'[/postReply][postreplyvirgula],[/postreplyvirgula]' : '';


if(!$.trim(id))
return displayErr(lang.photo_comment_error);
else if(!$.trim(comm) && !_comm_with_tracks.children().length)
return text_editor.focus();


var send_data = {}, reply_send_data = {};
send_data['cmd'] = 'addComment';
send_data['type'] = 'pos';
send_data['view_as'] = 'json';
send_data['comment'] = comm;
send_data['categ'] = reply ? reply : categ;
send_data['id'] = escape(id);

if(community)
	send_data['community'] = 1;

reply_send_data['cmd'] = 'commentPostReply';
reply_send_data['type'] = 'pos';
reply_send_data['view_as'] = 'json';
reply_send_data['comment'] = __post_as_reply+ ( author_name ? comm.replace('@'+author_name+',','') : comm);
reply_send_data['commid'] = escape(reply_comm_id); // in reply mode, this is comment id
if(reply == 'reply_to_reply')
reply_send_data['reply_to_reply'] = 1;


delete_reply_storage();

if(_comm_editing){
	
	return _update_comment(_comm_editing,comm);
	
}
	
var _comm_appendTo = reply ? $container.find('ul li#comment_'+reply_comm_id) : $container.find('ul');
var photoViewerCommMarkup = photoViewerGetCommentsMarkup(_U.i,1,'',_comm_send_files_c.length ? 0 : 1),
    jq_CommMarkup = $(photoViewerCommMarkup), scrollingModal = $scroll,
    comm_markup_ready = photoViewerCommMarkup
.replace(/%comment%/g,comm.replace('<','&lt;').replace('>','&gt;').replace('@'+author_name,'').replace('[postReply]','').replace('[/postReply]',''))
.replace('%OPK%','__comment_posting')
.replace(/%comment_date%/g,'')
.replace(/%ADDED_TITLE%/g,lang.just_now)
.replace(/%REPLY%/g, (reply == 'reply_to_reply' ? '__reply_for_reply' : (reply ? '__reply' : '')) )
.replace(/%replies_count%/g, '')
.replace(/%comm_id%/g,random_id)
.replace(/%COMMENTS_IN%/g, categ)
.replace(/%author_id%/g,_U.i)
.replace(/%author_name%/g,_U.n)
.replace(/%author_photo%/g,_U.p)
.replace(/%author_gender%/g,_U.g)
.replace(/%likes_count%/g,0)
.replace(/%liked_view%/g,'')
.replace(/%cur_default%/g,'curDefault');







comm_markup_ready = str_smilies(comm_markup_ready);


    // mentioned users
    if (_comm_with_mentioned_users.find('input:first').length) {
 //ga(comm).find('.user_tagged_comment').remove();
			//ga(comm).prepend();
			
            comm = '[umention]' + escape(_comm_with_mentioned_users.find('input:first').val()) + '[/umention] '+comm.replace(_comm_with_mentioned_users.find('input:last').val(),'');

         	send_data['comment'] = comm.replace(/undefined/g,'');
			reply_send_data['comment'] = comm.replace(/undefined/g,'');
    
    }



    // send files
    if(_comm_send_files_c.length > 0){
	var count = 0;
    for(var i = 0; i < _comm_send_files_c.length; i++){	
    var bj_ph = _comm_send_files.find('.attach-photo_del:eq('+i+')');
    var jb_ph = bj_ph.attr('id').split('_')[1];
	var _attached = bj_ph.data('attached') ? 1 : 0;
    var inceput = count == 0 ? '[divstart]' : '';
    var sfarsit = count + 1 == _comm_send_files_c.length ? '[divend]' : '';
    comm += inceput + '[img]'+ escape(jb_ph) +(_attached ? '&from=attach&' : '') +'[/img]' + sfarsit;
	send_data['comment'] = comm.replace(/undefined/g,'');
	reply_send_data['comment'] = comm.replace(/undefined/g,'');
    count++;
    }
	
	}

    // with tracks
    if (_comm_with_tracks.children().length) {
        var songs_arr = [];
        // post contain songs
        _comm_with_tracks.children().each(function() {
            var $this = ga(this);
            var postSongId = escape($this.attr('id').split('-')[1]);

            comm += '[postSong]' + postSongId + '[/postSong]';

            songs_arr.push(postSongId);
         	send_data['comment'] = comm.replace(/undefined/g,'');
			reply_send_data['comment'] = comm.replace(/undefined/g,'');
        });

    }

	

if(reply && !_comm_appendTo.find('ol').length){ 
_comm_appendTo.append('<ol class="comm_replies '+( ga('li#comment_'+reply_comm_id).parent().prop("tagName") == 'OL' ? '__0p' : '')+'" id="repliesfor_'+reply_comm_id+'"></ol>');
_comm_appendTo = _comm_appendTo.find('.comm_replies#repliesfor_'+reply_comm_id);
}else if(reply && _comm_appendTo.find('ol').length)
_comm_appendTo = _comm_appendTo.find('.comm_replies#repliesfor_'+reply_comm_id);

_comm_appendTo.append(comm_markup_ready).find('li#comment_'+random_id+' ._55yn').removeClass('__none');
!reply && $container.find(':scrollable').length ? $container.find(':scrollable').scrollTop($container.find(':scrollable').get(0).scrollHeight) : '';//scrollingModal.scrollTop(scrollingModal[0].scrollHeight) : '';




text_editor.empty().focus();

var send_comm = jAjax('/cmd.php','post', reply ? reply_send_data : send_data);
send_comm.done(function(data){    
var res = validateJson(data);
if(res.s){
var text = res.text.replace(/\\/g, ""),
    com_id = res.comm_id,
    com_added = res.added;
var actual_comment = reply ? $container.find('ul li#comment_'+random_id) : $container.find('ul>li#comment_'+random_id);

actual_comment.removeClass('%OPK% __comment_posting').addClass('_replies__highlight').find('._55yn').remove();
actual_comment.find('.comment-date').html('&crarr;');
actual_comment.find('.comment-content').html(text);
comm_markup_ready = actual_comment[0].outerHTML;
actual_comment.attr('id','comment_'+com_id);
//ga([window,$scroll]).scrollTop(actual_comment.offset().top);

if(!isElementInViewport(actual_comment)){  
ga('html').find(':scrollable').scrollTop( Math.abs( actual_comment.offset().top - ga('.toolbar').height() ));
ga(window).scrollTop( Math.abs( actual_comment.offset().top - ga('.toolbar').height() ));
//ga('html').find(':scrollable').scrollTop( Math.abs( actual_comment.position().top - ga('.toolbar').height() ));

if($scroll)
 $scroll.scrollTop( Math.abs( actual_comment.offset().top - ga('.toolbar').height() ));
 
}

 
 
_comm_send_files.empty();
_comm_with_tracks.empty();
ga('#WD_tracks_'+id+'>ul').empty();
_comm_with_mentioned_users.remove();
text_editor.removeData('reply-commd').removeAttr('data-reply-commd');
text_editor.parent().find('.__comm_cancel_reply').trigger('click');
venobox();
}

if(callback) callback(comm_markup_ready.replace(/amp;/g,''));

});

}
	

//get emojarea
function buildEmoji(obj,btn,activeOn,btnpos,css,categ,id){
var  n = '<div data-emojbtn class="disc_toolbar_w _com_widget" style="margin-bottom: 0px;">'+
         '<div class="disc_toolbar">'+
         '<div class="disc_toolbar_i">'+
         '<a class="disc_toolbar_i_ic smiles_w __staple" href="javascript:;"></a>'+
         '</div>'+
         '<div class="disc_toolbar_i">'+
         '<a class="em_disc_toolbar_i_ic__sm" href="javascript:;"></a>'+
         '</div>'+
         '</div>'+
         '</div>';
var n = '<div data-emojbtn class="disc_toolbar_w" style="margin-bottom: 0px;"><a class="em_disc_toolbar_i_ic__sm smiles_w" href="javascript:;"></a></div>';
var attch = '<!--- Attach files section ---->'+
				'<div class="jb_attached_files __'+categ+'"></div>'+
				'<section class="attachjbfl">'+

				'<div class="mdialog_entertm_ics">'+
				//'<div onclick="attach_pPhoto(event)"><span class="tico"><i id="md_ics_photo" title="Photo" class="tico_img ic ic_photoattach"></i></span></div>  '+
				//'<div onclick="attach_pPhoto(event,1)"><span class="tico"><i id="md_ics_photo_computer" title="Photo from computer" class="tico_img ic ic_photo"></i></span></div> '+
				'</div>'+
				'</section>';
				var avatar_markup = '<div class="user_card avt"><img src="/getPhoto?p='+_U.p+'&sz=small&g='+_U.g+'"></div>';
$obj = $(obj);



            com_emj = $obj.emojiarea({
                wysiwyg: true,
                buttonLabel: 'Emojis',
                buttonPosition: btnpos ? 'before' : 'after',
                button: btn ? btn : ''
            });
	    _act_emoji = activeOn;

		var btn_parent = $(btn).parent();

		if(!btn_parent.find('.attachjbfl').length)
		btn_parent.parent().append(attch);
		var emoji_textarea = $obj.parent().find('.emoji-wysiwyg-editor');
		if(css){
			
			/* for feed */
			if( ga('#hook_feed_wl_pg').hasClass('u_prof_redesign_feed') ){
				
				css.width = 451;
			
			} else if ( ga('#hook_feed_wl_pg').hasClass('__two_columgap') ){
				css.width = 292;
				
			}		
			
			emoji_textarea.css(css);
			
			
		}
		emoji_textarea.before(avatar_markup);

            return emoji_textarea;

}
// scroll to comments
function WD_scroll_to_comments(obj,ev){
	ev.preventDefault();
	var $el = $(obj);
	var scrollable;
	var comments_cnt;
	switch($el.data('scron'))
	{
		
		
		case 'post':
		var cnt = $('#pp_post_viewer');
	    scrollable = cnt.find(':scrollable');
		comments_cnt = cnt.find('.comments_cnt');
		break;
		
	}
	
			if(scrollable.length && comments_cnt.length) {
				cnt.find('[contenteditable="true"]').focus();
			scrollable.scrollTop(comments_cnt.offset().top);
			}
}
    // get comments
    function WD_getComments(id, categ, cont, load_prev, wd_arr_el, limit, community) {
        var phlayer_comm_space_a = ga(cont);
        var phlayer_comm_space = ga(cont).find('ul');

        if (!load_prev) {
            // remove button load previous comments
            phlayer_comm_space_a.find('.comm_previous_load').remove();
            phlayer_comm_space.empty();
        }

        /*
        // load comments from array if exists (without call ajax)
        if (typeof wd_comments_db[id] != 'undefined' && !load_prev) {
            phlayer_comm_space_a
                .removeClass('__nocoms');
          if(wd_comments_db[id].prev == 'yes')
			  phlayer_comm_space_a.find('.comm_previous_load')
                .remove();
            phlayer_comm_space.html(wd_comments_db[id].markup.replace(/undefined/g, ''));
            return false;
			if (typeof wd_comments_db[id] != 'undefined' && !load_prev)
	wd_arr_el = wd_comments_db[id];
        }*/

		
		var customlimit = wd_arr_el && !(wd_arr_el instanceof Array) ? '&customlimit='+wd_arr_el : '';
		var limit_c = limit;
		var limit = limit && !load_prev ? '&limit='+escape(limit_c) : '';
        var previous_comments_button_markup = '<div class="comm_previous_load" onclick="return _comments_loadPrev(this,event,\'comm_widget\',\''+categ+'\',\''+cont+'\');" data-loadcommentsforphi="' + o_krypt(id) + '" data-loadmorecomentsin="%QTG%"><i class="ic ic-prev-comments"></i><span>View %C previous comments</span></div>';
        var previous_replies_button_markup = '<div class="comment_previous_replies_btn" data-rreply="%rr%" onclick="return commShowPrevReplies(this,event);"><i class="ic tico_img ic-more-replies"></i><a href="javascript:;">%c replies</a></div>';
        var getWComm = jAjax('/cmd.php', 'post', 'cmd=' + (load_prev ? 'getPostPrevComments' : 'getPostComments') + limit + customlimit + (community ? '&community=1' : '') +'&type=pos&categ='+categ+'&id=' + (load_prev ? id : o_krypt(id)));
        getWComm.done(function(data) {   //alert(data+'---'+id);//$('body').prepend('<pre>'+data);return;
            var res = validateJson(data, 1); 
			 
			if(res.s == '0')             
			// remove button load previous comments
            phlayer_comm_space_a.find('.comm_previous_load').remove();
			
            if (typeof res.comm_data != 'undefined' && res.s != '0') {

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
                            .replace(/%COMMENTS_IN%/g, categ)
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
                        phlayer_comm_space.prepend(phlayer_comments_ready);
						/*.find('.jb_attach_in_msg').each(function() {

                            var $this = $(this);

                            $this.attr('data-bgattach', $this.attr('style')).removeAttr('style').attr('style','background-image:url('+_st._ATTACH_BLANK+');background-size: initial;background-color:#eee;');//.removeAttr('style');

                        });
						*/
					 
                        if (!phlayer_comm_space.closest('ul')
                            .parent()
                            .find('.comm_previous_load')
                            .length && ( (data_comm.comments_count > _st.phlayer_comments_limit && !limit_c) || (limit_c && data_comm.comments_count > limit_c) ) && !load_prev)
                            phlayer_comm_space.closest('ul')
                            .parent()
                            .prepend(previous_comments_button_markup.replace(/%C/g, Math.ceil(data_comm.comments_count - (limit_c ? limit_c : _st.phlayer_comments_limit)))
                                .replace(/%QTG%/g, 'PhotoViewer'));

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
                                    .replace(/%COMMENTS_IN%/g, categ)
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
                                            .replace(/%COMMENTS_IN%/g, categ)
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
					loadAttach(ga(cont));
					
                    //if(!load_prev) wd_comments_db[id] = { markup: phlayer_comm_space_a.html(),prev: load_prev ? 'yes' : 'no' }; //phlayer_comm_space.html();
					venobox();
					if(!load_prev)
						runWDcommSticky(wd_arr_el);
					
					
					
					
					
                }

            } else ga('.phlayer_emoji_input_sticky')
                .addClass('__nocoms'); //return displayErr(lang.photoViewer_error_loading_comm);

        });

		
		
    }

// edit comment
function comment_edit(el,ev){
    ev.preventDefault();
	var _commedit_textarea, $el = ga(el),
		comments_in = $el.data('comments-in'),
		_comedit_parentLI = $el.closest('li'),
		_comedit_getComment = _comedit_parentLI.find('.comment-content');
	
	switch(comments_in){
		
		case 'PhotoViewer':
		
		var _commedit_emoji_input = ga('#pp_photo_viewer .phlayer_emoji_input_sticky'),
			_comedit_$scrollToCommEl = $('.modal-new-phly'),
			_commedit_textarea = ga('#phlayer-com-emoji');
			
		ga('li.comment.__comment_edit [title="'+lang.cancel_edit+'"]').trigger('click');
		setTimeout(function(){
			if(_commedit_emoji_input.offset().top > $el.offset().top+_comedit_parentLI.height())
				_comedit_$scrollToCommEl.animate({scrollTop:  '-='+ Math.abs(_commedit_emoji_input.offset().top-$el.offset().top-_comedit_parentLI.outerHeight()) + 'px'},'fast');
			else 
				_comedit_$scrollToCommEl.animate({scrollTop:  '+='+ Math.abs(_commedit_emoji_input.offset().top-$el.offset().top-_comedit_parentLI.outerHeight()) + 'px'},'fast');
		},100);
		
		break;
		
		case 'localComms':
		
		var _commedit_emoji_input = $el.closest('.sect_comment_static').find('.scomments_static_add_comm'),
			_comedit_$scrollToCommEl = $el.closest('.sect_comment_static').find('.local_minimum_comments'),
			_commedit_textarea = $el.closest('.sect_comment_static').find('textarea.post_comm_inp_txtarea');
		ga('li.comment.__comment_edit [title="'+lang.cancel_edit+'"]').trigger('click');
		setTimeout(function(){
						if(_commedit_emoji_input.offset().top > $el.offset().top+_comedit_parentLI.height())
							_comedit_$scrollToCommEl.animate({scrollTop:  '-='+ Math.abs(_commedit_emoji_input.offset().top-$el.offset().top-_comedit_parentLI.outerHeight()) + 'px'},'fast');
						else 
							_comedit_$scrollToCommEl.animate({scrollTop:  '+='+ Math.abs(_commedit_emoji_input.offset().top-$el.offset().top-_comedit_parentLI.outerHeight()) + 'px'},'fast');
		},100);
		
		break;
		
		case 'post':
		
		// comment in feed
		var _comm_In_feed = $el.closest('.feed_post_comments_widget'), _feed_id = _comm_In_feed.length ? _comm_In_feed : '';
		_feed_id = _feed_id ? ga('[wdcommid="'+_feed_id+'"]') : '';
		var _commedit_emoji_input = _comm_In_feed.length ? _comm_In_feed : ga('#pp_post_viewer .comments-p-sticky'),
			_comedit_$scrollToCommEl = _comm_In_feed.length ? ga('html,body') : ga('#pp_post_viewer .modal-new-phly.__post_vvw'),
			_commedit_textarea = _feed_id ? _feed_id.find('textarea') : _comedit_$scrollToCommEl.find('textarea.comm_wd_emoji');
			
		ga('li.comment.__comment_edit [title="'+lang.cancel_edit+'"]').trigger('click');
		
		setTimeout(function(){
						if(_commedit_emoji_input.offset().top > $el.offset().top+_comedit_parentLI.height())
							_comedit_$scrollToCommEl.animate({scrollTop:  (ga('.__comment_edit').offset().top -55 )+ 'px'},'fast');//'-='+ Math.abs(_commedit_emoji_input.offset().top-$el.offset().top-_comedit_parentLI.outerHeight())  + 'px'},'fast');
						else 
							_comedit_$scrollToCommEl.animate({scrollTop: (ga('.__comment_edit').offset().top -55) + 'px'},'fast'); ///'+='+ Math.abs(_commedit_emoji_input.offset().top-$el.offset().top-_comedit_parentLI.outerHeight())  + 'px'},'fast');
		},100);
		
		break;
		
		
	}
	
	if(typeof _commedit_textarea == 'object'){
		var _commedit_emojarea = _commedit_emoji_input.find('[contenteditable="true"]');///_commedit_textarea.parent().find('[contenteditable="true"]');
			_comedit_parentLI.addClass('__comment_edit');

		if( ! ga('body section#edit_comment_html').length ){
		ga('body').prepend('<section style="position:absolute;display:none;" id="edit_comment_html">'+_comedit_getComment.html()+'</section>');
		var _comment_getPhotos = ga('#edit_comment_html').find('.mdialog_atch_items_container');
		ga('#edit_comment_html').find('.mdialog_atch_items_container').remove();
		}
		
		// assign id of currently editing comment
		if(comments_in == 'PhotoViewer' || comments_in == 'post')
		_commedit_emojarea.attr('comment_edit',_comedit_parentLI.attr('id').match(/\d/g).join('')).html( ga('#edit_comment_html').html() ).focusEnd();
		else
		_commedit_textarea.attr('comment_edit',_comedit_parentLI.attr('id').match(/\d/g).join('')).val( ga('#edit_comment_html').text() ).focus();
	
	
		ga('#edit_comment_html').remove();
		$el.attr('title',lang.cancel_edit).removeAttr('onclick').off('click click.cancel_edit').on('click.cancel_edit', function(e){
			e.preventDefault();
			var $this = ga(this);
			$this.attr('title',lang.Edit).off('click').on('click', function(e){ e.preventDefault(); return comment_edit($(this),e); });
			_comedit_parentLI.removeClass('__comment_edit');
			
			if(comments_in == 'PhotoViewer' || comments_in == 'post')
				_commedit_emojarea.removeAttr('comment_edit').empty();
			else
				_commedit_textarea.removeAttr('comment_edit').val('');
			
		});
	}
	
}

// attach tracks
function commAttachTracks(ev, obj, id) {

    ev.preventDefault();
    ev.stopImmediatePropagation();
    var $this = ga(obj);

   // stop_expand_post_area = true;
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
        'overflow': 'auto',
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

                if ($('#WD_tracks_'+id+'>ul').children().length) {
                    jCont.find('a.flat_button:first').removeClass('__disabled');
                    jCont.find('.mus_tabs_i_a_count').text(parseInt(ga('#WD_tracks_'+id+'>ul').children().length));
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
                   // $('.post_add_songs>ul').empty();
					ga('#WD_tracks_'+id+'>ul').empty();
				
                    $.each(_selectedSongsdb, function(a, b) {

                        var _x_delete_song_ic_markup = ga(x_delete_song_ic);
                        ga('#WD_tracks_'+id+'>ul').prepend(b).find('.mus-tr_add').replaceWith(_x_delete_song_ic_markup);
                        _x_delete_song_ic_markup.off('click.deleteSongFromComment').on('click.deleteSongFromComment', function(e) {

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
                    if (!Object.keys(_selectedSongsdb).length) $('#WD_tracks_'+id+'>ul').empty();
                    $('#nohook_modal_close').trigger('click');
                   // stop_expand_post_area = false;
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

// send sticker
function sendSticker(el,evt,community){
	
	
	el = ga(el);
	
	var send_in = el.data('send-in'),
	    send_to_id = el.data('send-to-id'),
		sticker_code = el.data('sticker-code');
	
	
	var randId = (new Date()).getTime();
	var randmId = 'comm_widget_'+randId;
	
	
	var msg = sticker_code;
	
	
		switch (send_in){
		
	case 'PM':
		messenger.send(0, evt, msg);
	break;
	
	case 'chat':
	
	
		//sendPM(false, evt, msg, send_to_id.split('_')[1])
		chatTabSend(el,evt,'chat_'+send_to_id.split('_')[1],msg);
			
		break;
		
		case 'feed_comments':
		
		 var cnt_cmm_id = ga('[data-wdcommid="'+send_to_id+'"]'),
			 cnt_cmm_editor = cnt_cmm_id.find('.emoji-wysiwyg-editor');

			 
		commWidgetSdComm(evt, send_to_id, msg, cnt_cmm_editor, ga('#comm_widget_'+cnt_cmm_id.attr('id').match(/\d/g).join('')), cnt_cmm_editor.attr('feed-comment-for'), ga(window), function(){}, community);
		
		
		break;
		
		case 'post':
		case 'video':
		case 'photo':
		case 'market_product':
		
		 var cnt_cmm_id = ga('[data-wdcommid="'+send_to_id+'"]'),
			 cnt_cmm_editor = cnt_cmm_id.find('.emoji-wysiwyg-editor');

			 
		commWidgetSdComm(evt, send_to_id, msg, cnt_cmm_editor, ga('#comm_widget_'+cnt_cmm_id.attr('id').match(/\d/g).join('')), send_in, ga(window), function(){}, community);
		
		
		break;
		
	}
	// close emoji tab
	ga('body').trigger('mouseup.closeEmojiSm');
	
	
}

// send gif
function sendGif(el,evt,community) {
	
	el = ga(el);
	
	var send_in = el.data('send-in'),
	    send_to_id = el.data('send-to'),
		gif_url = el.data('gif');
	
	
	var randId = (new Date()).getTime();
	var randmId = 'comm_widget_'+randId;
	
	
	var msg = '[gif]'+gif_url+'[/gif]';
	
	
		switch (send_in){
		
	case 'PM':
		messenger.send(0, evt, msg);
	break;
	
	case 'chat':
	
	
		//sendPM(false, evt, msg, send_to_id.split('_')[1])
		chatTabSend(el,evt,'chat_'+send_to_id.split('_')[1],msg);
			
		break;
		
		case 'feed_comments':
		
		 var cnt_cmm_id = ga('[data-wdcommid="'+send_to_id+'"]'),
			 cnt_cmm_editor = cnt_cmm_id.find('.emoji-wysiwyg-editor');

			 
		commWidgetSdComm(evt, send_to_id, msg, cnt_cmm_editor, ga('#comm_widget_'+cnt_cmm_id.attr('id').match(/\d/g).join('')), cnt_cmm_editor.attr('feed-comment-for'), ga(window), function(){}, community);
		
		
		break;
		
		case 'post':
		case 'video':
		case 'photo':
		case 'market_product':
		
		 var cnt_cmm_id = ga('[data-wdcommid="'+send_to_id+'"]'),
			 cnt_cmm_editor = cnt_cmm_id.find('.emoji-wysiwyg-editor');

			 
		commWidgetSdComm(evt, send_to_id, msg, cnt_cmm_editor, ga('#comm_widget_'+cnt_cmm_id.attr('id').match(/\d/g).join('')), send_in, ga(window), function(){}, community);
		
		
		break;
		
	}
	// close gif's popup
	ga('#nohook_modal_close').trigger('click');

	
}

// search for gif
function searchGIF(elem,evt,input_id){
	elem = ga(elem);
	var send_in = elem.data('send-in');
	var send_to_id = elem.data('send-to-id');
	var in_community = elem.closest('.incommunity').length ? 1 : 0;
	var that = this; 
	var gifs_box_markup = '<div class="gif_search_popup">\
							<div class="search_input_outer">\
							<input type="text" class="it search-input_it" rel-gif-search="1" id="gif_search" placeholder="'+lang.input_search_gift+'">\
							<span id="gif-empty-input"></span>\
							<span id="gif-loading-input"></span>\
							</div>\
							<div class="gif_index_cnt nano"><div class="nano-content gifs-nano-cnt"></div></div></div>';
	
	var random_key = function (length, current) {
 current = current ? current : '';
  return length ? random_key(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;

}
    var jb_ = new jBox('Modal', {
        appendTo: ga('body'),
		id: 'gifs_search',
        title: lang.j_modal_post_search_gif,
        overlay: true,animation: 'zoomIn',draggable:'title',
        fade: false,
        closeButton: 'box',
        'overflow': 'hidden',
        'fixed': true,
        blockScroll: true,
        height: '380px',
        width: '290px',
        minHeight: '100px',

        position: {
            x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
            y: 'center' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
        }, 
        onClose: function() {
            prn_modal();
			ga('#gifs_search').remove();
        }
    });
	 
	jb_.open().ajax({
        type: 'POST',
        url: '/cmd.php',
        data: {
            cmd: 'gifs',
			key: random_key(1)
        },
        reload: true,
        setContent: false,
        success: function(data) {
			
			
					var d = validateJson(data);

					jb_.setContent(gifs_box_markup);
					
					var search_GIF_input = ga('[rel-gif-search="1"]'), gifs_loading_input = ga('#gif-loading-input'),gifs_empty_input = ga('#gif-empty-input'), gifs_nano_c = ga('.gif_index_cnt.nano'), gifs_appto = ga('.gifs-nano-cnt');
					
					search_GIF_input.focus();
					
					
					
					for(var i=0; i < d.data.length;++i){
						var ud = d.data[i];
						
						gifs_appto.append('<A id="'+ud.id+'" data-send-in="'+send_in+'" data-send-to="'+send_to_id+'" data-gif="'+ud['images']['fixed_height']['url']+'" onclick="sendGif(this,event,'+in_community+');" href="javascript:void(0);">\
						<img width="'+ud['images']['fixed_height']['width']+'" height="'+ud['images']['fixed_height']['height']+'" src="'+ud['images']['fixed_height']['url']+'" /></a>');
						
					}
					setTimeout(function(){gifs_nano_c.nanoScroller();},1000);
		
					
					search_GIF_input.off('keyup.searchGif').on('keyup.searchGIf', function(evt){
						var _that = this;
						clearTimeout(that.srchGif_timeout);
						gifs_empty_input.hide();
						gifs_loading_input.show();
						that.srchGif_timeout = setTimeout(function(){
							
							searchGifs(_that.value,send_in,send_to_id,in_community);
							
						},1000);
						
					});
					search_GIF_input.off('keydown.searchGif keypress.searchGif').on('keydown.searchGIf keypress.searchGif', function(evt){
						clearTimeout(that.srchGif_timeout);
						gifs_empty_input.show();
					});
				gifs_empty_input.off('click.seaerchGifInputEmpty').on('click.seaerchGifInputEmpty',function(){
					search_GIF_input.val('');search_GIF_input.trigger('keyup.searchGif');
					ga(this).hide();
				});
			}
            

       

    });
}
// search gifs
function searchGifs(k,send_in,send_to_id,community) {
	var that = this;

	var send = jAjax('/cmd.php', 'post', { cmd: 'gifs', key: k ? escape(k) : 'smile' });
	send.done(function(a){
		
		var d = validateJson(a);
		
		var gifs_nano_c = ga('.gif_index_cnt.nano'), gifs_empty_input = ga('#gif-empty-input'),gifs_loading_input = ga('#gif-loading-input'), gifs_appto = ga('.gifs-nano-cnt');
		
		gifs_loading_input.hide();
		gifs_empty_input.show();
		
		gifs_appto.empty();
		
					for(var i=0; i < d.data.length;++i){
						
						var ud = d.data[i];
						that.gifUrl = ud['images']['fixed_height_small']['url'];
	
						gifs_appto.append('<A id="'+ud.id+'" data-send-in="'+send_in+'" data-send-to="'+send_to_id+'" data-gif="'+ud['images']['fixed_height_small']['url']+'" onclick="sendGif(this,event,'+community+');" href="javascript:void(0);">\
						<img width="'+ud['images']['fixed_height_small']['width']+'" height="'+ud['images']['fixed_height_small']['height']+'" src="'+ud['images']['fixed_height_small']['url']+'" /></a>');	

					}
	});
}