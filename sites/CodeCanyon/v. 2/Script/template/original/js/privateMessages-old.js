// notification sound (wav)
var pm_sound = "/cmd/sounds/button_tiny";

var newChatWindow = {};
var windowFocus = true;
var username;
var mDialogOpened;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 1000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle, originalFav = ga('#favicon').attr('href');
var blinkOrder = 0;
var typing = 0;
var message_editable, mdialog_hide_loader, m_last_c;
var chat_scroll;
var m_placeholder = lang.pm_emoji_placeholder;
var md_page = 1,
    msg_page = 1;
var md_loaded_all_conversations;

// for num count
var chatHeartbeatCount_x = 0;
var minChatHeartbeat_x = 1000;
var chatHeartbeatTime_x = minChatHeartbeat_x;


var recipient_photo, recipient_name;
var emj, emojiTxtEditor;
var allMessages = '';
var mDialog, d_lg, startChatHeartBeat;
var lastCountUpdate;
var ms_srch_time;

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();



var markup =
    '<div id="m-id-msg-%s" class="dk_order_messages %s %s d_comment_w d_comment_w__avatar %s">' +
    '<cmntmarker></cmntmarker>' +
    ' <div id="m-id-msg-%s" class="d_comment_w_back ">' +
    ' <div class="disc-comment-pointer-bottom">' +
    ' <div class="disc-repl-pointer"><i style="margin-top:1px"></i><i style="margin-top:2px"></i><i style="margin-top:3px"></i><i style="margin-top:4px"></i><i style="margin-top:3px"></i><i style="margin-top:2px"></i><i style="margin-top:1px"></i></div>' +
    '</div>' +
    '</div>' +
    '<div class="d_comment_w_center  d_comment_w_center__compressed d_comment_w_center__compressed_w_avatar __me">' +
    '<div class="d_comment_left_w" id="m-id-msg-%s">' +
    ' <div class="d_comment_author_icon">' +
    '  <a href="/user/%s" hrefattr="true">' +
    '  <div class="ucard-v __rounded __xxxs">' +
    '  <div class="section">' +
    ' <div class="photo"><img class="photo_img" uid="goToUserFromComment" width="32px" height="32px" src="/getPhoto?p=%s&sz=small" alt=""></div>' +
    ' <div class="f_onl_gtm"><div class="%s"></div></div>' +
    ' <onlinemarker></onlinemarker>' +
    ' </div>' +
    ' </div>' +
    '</a>' +
    '</div>' +
    ' <marker></marker>' +
    '</div>' +
    '<div class="d_comment_right_w show-on-hover" id="m-id-msg-%s">' +
    ' <div class="d_comment_text_w %s">' +
    ' <div class="d_comment_r fade-on-hover">' +
    ' <div class="d_comment_act_w">' +
    ' <a id="m-id-msg-%s" class="d_comment_act d_comment_act_del d_comment_act_spam ic10 ic10_edit __noHover" style="display:none;"></a>' +
    ' <a title="' + lang.del_pm + '" onclick="delM(this,event)" id="m-id-msg-%s" class="d_comment_act d_comment_act_del d_comment_act_spam ic10 ic10_close-g " uid="delMsg"></a><span title="' + lang.report + '" onclick="mdialog_report(event,this)" id="m-id-msg-%s" class="d_comment_act d_comment_act_spam ic10 ic10_warn-g" uid="reportSpam"></span>' +
    '<div d="editP_space"></div>' +
    ' <a id="m-id-msg-%s" class="d_comment_act d_comment_act_process d_comment_act_spam ic10 ic10_process" style="display:none;"></a>' +
    ' </div>' +
    '  <div class="d_comment_time">%s</div>' +
    ' <timemarker></timemarker>' +
    ' </div>' +
    '<div class="d_comment_text textWrap" id="m-id-msg-%s">%s</div>' +
    '<div id="m-id-msg-%s" class="d_comment_error" style="display:none;"></div>' +
    '</div>' +
    '</div>' +
    '</div></div>',

    load_old_msg_markup = 
    '<div class="messenger_older_msg_div"><a class="messenger_older_msg_a" href="javascript:void(0);" onclick="mdialog_load_prev_messages(event,this);" uid="mdialog_prev_btn_ld" id="id-prev-comm-link-w-msg"><span class="txt-msg-old-load-g">%s</span><span class="txt-msg-old-load">'+lang.please_wait+'</span></a></div>',

    text_markup = '<div class="dk_order_messages %s %s d_comment_w d_comment_w__avatar %s">' +
    ' <cmntmarker></cmntmarker>' +

    '<div class="pm_mfrom_%s"></div>' +
    '<div class="d_comment_left_w d_comment_left_w__compressed"></div>' +

    '<div class="d_comment_w_center  d_comment_w_center__compressed show-on-hover" id="m-id-msg-%s">' +
    '<div class="d_comment_text_w %s">' +
    '<div class="d_comment_r fade-on-hover">' +
    '<div class="d_comment_act_w">' +
    ' <a id="m-id-msg-%s" class="d_comment_act d_comment_act_del d_comment_act_spam ic10 ic10_edit __noHover" style="display:none;"></a>' +
    ' <a title="' + lang.del_pm + '" onclick="delM(this,event)" id="m-id-msg-%s" class="d_comment_act d_comment_act_del d_comment_act_spam ic10 ic10_close-g " uid="delMsg"></a><span title="' + lang.report + '" onclick="mdialog_report(event,this)" id="m-id-msg-%s" class="d_comment_act d_comment_act_spam ic10 ic10_warn-g" uid="reportSpam"></span>' +
    '<div d="editP_space"></div>' +
    ' <a id="m-id-msg-%s" class="d_comment_act d_comment_act_process d_comment_act_spam ic10 ic10_process" style="display:none;"></a>' +
    '</div>' +
    '<div class="d_comment_time">%s</div>' +
    ' <timemarker></timemarker>' +
    '</div>' +
    '<div class="d_comment_text textWrap" id="m-id-msg-%s">%s</div>' +
    ' <div id="m-id-msg-%s" class="d_comment_error" style="display:none;"></div>' +
    ' </div>' +
    '</div></div>',

    /// user markup
    u_markup = '<div onclick="chatWith(event,this,%s)" class="disc-i %s" id="y-%s" data-uconv=\'{"id":"%s","fullname":"%s","photo":"%s"}\'>' +
    '<div id="lst-mitem-avatar-%s" class="disc-i_image">' +
    '<div class="ucard-v __rounded __xxs">' +
    '<div class="section">' +
    '<div class="photo"><img class="photo_img" width="48px" height="48px" src="/getPhoto?p=%s&sz=small" alt="%s"></div>' +
    '<div id="f_onl_gtm">%s</div>' +
    '<div id="lst-mitem-st-%s"></div>' +
    '</div>' +
    ' </div>' +
    ' </div>' +
    '<div class="disc-i_cnt">' +
    ' <div id="lst-mitem-name-%s" class="disc-i_cnt_name">%s</div>' +
    ' <div id="lst-mitem-lst-msg-%s">' +
    ' <div id="chat_lstMsg" class="disc-i_cnt_tx ellip">%s</div>' +
    ' </div>' +
    '</div>' +
    '<div class="notificationFeedNewToolbar_dialogs notifications %s">' +
    ' <div class="counterText">%s</div>' +
    '  <markercnt></markercnt>' +
    ' </div>' +
    '</div>',

    header_count = '<div class="toolbar_nav_notif __header">' +
    '<div id="counter_ToolbarDiscussions" class="notifications zoomIn animated">' +
    '<div class="counterText">%s</div>' +
    '</div></div>',
	header_count = '<div class="lnavMenuCount zoomIn animated">+%s</div>',
    date_markup = '<div class="d_comment_w d_comment_w__avatar __me d_comment_time_delim"><div class="d_comment_w_center"><div class="d_comment_time_delim_t"><span class="d_comment_time_delim_date">%s</span></div></div></div>',

    pencil_m = '<a title="' + lang.pm_edit_shortcut + '" onclick="edt_m(event,%s)" d="editP_space_oc" class="d_comment_act d_comment_act_del d_comment_act_spam ic10 ic10_edit " uid="editMsg"></a>',

    cancel_edit_m = '<div class="disc_add_comment_reply_w" style="display: block;"><span class="disc_add_comment_reply">' + lang.pm_edit_of_msg + '</span><a uid="uidCancelEdit" onclick="leaveEditing(event)" class="lp disc_add_comment_noreplay">' + lang.cancel + '</a></div>';

function closeMsgDialog(el) {
	createUrl('','',prev_url);
	ga(el).removeClass('__active');
    ga('#messageHookBl').hide().addClass('__message_bl_hidden');
    ga('body').removeClass('__noScrollable'); //.css('overflow','auto');
}

function showLoadedMsgDialog(el) {
    ga('body').addClass('__noScrollable');
    ga(el).addClass('__active');
    ga('#messageHookBl').show().removeClass('__message_bl_hidden');
    ga('ul .toolbar_nav li').filter('.__active').removeClass('__active');
    // $('body').css('overflow', 'hidden');
    ga('.m_notif_space').empty();
}

function visibleMd() {
    var h = ga('#messageHookBl');

    return h.is(':visible') ? true : false;

}

function pm_sound_enable() {
    return readCookie('dk_pm_sound') === 'on' || !readCookie('dk_pm_sound') ? 1 : 0;
}

function remove_hide_convers() {

    var cur_u = ga('.disc-i_sel');
    cur_u.slideUp(400, function() {
        cur_u.remove();
        setTimeout(function() {
            ga('#pm_dlg_lft_users>:first').trigger('click');
        }, 500);
    });

}

function privateMessages(event, el) {
    event.preventDefault();

    var $el = ga(el),
        $body = ga('body');

    hActive(el);

	createUrl('','','/messages');
	
    if ($body.find('#messageHookBl').length !== 0) {
        showLoadedMsgDialog(el);
    } else {
        $body.addClass('__noScrollable');
        var send = jAjax(_THEME+'/nav/popups/p_messages.html', 'post', new Date());

        send.done(function(d) {

            var $d = ga(d);

			$d.find('#notAllowSendPm').replaceWith(lang.pm_not_allow_receive);
            mDialog = $d.find('.mdialog_list_conversations');
            chat_scroll = $d.find('.mdialog_chat_conversation_cnt');
			
			// check for ad
			var getAd = jAjax('/cmd.php', 'post', 'cmd=getMessageAd');
			getAd.done(function(data){
				if(data){
					ga('#msg-ad-cnt').html('<div class="msg-w-ads">'+data+'</div>');
				}
			});
			
			
            // menu dropdown edit
            var m_sound = $d.find('[uid="enDisSound"]'),
                m_block = $d.find('[uid="blockOpponent"]'),
                m_unblock = $d.find('[uid="unBlockOpponent"]'),
                m_hide = $d.find('[uid="uidHideDialog"]'),
                m_delet = $d.find('[uid="retFromDialog"]');

            d_lg = $d.find('.mdialog_m');
            d_lg.css('height', ga(window).height() - 80);
            $d.find('.mdialog_msg_close,.popup_ovr').on('click', function(e) {
                e.preventDefault();
                closeMsgDialog(el);
            });

            $d.find('[uid="prevDialogs"]').on('click', md_m_more_conv);

            $d.find('#md_ics_photo').attr('title', lang.photo);
            $d.find('#md_ics_photo_computer').attr('title', lang.photo_computer);

            // left side scrolling
            mDialog.off('scroll.bx').on('scroll.bx', function(e) {
                var dialog_tabs = ga('.mdialog_list_tabs'),
                    chat_l_us = ga('.uChatDLeft:first');

                if (dialog_tabs.offset().top >= chat_l_us.offset().top - chat_l_us.height())
                    dialog_tabs.addClass('_bshadow');
                else
                    dialog_tabs.removeClass('_bshadow');

            });

            // search friends
            var ms_s_inp = $d.find('#msrch-input-0');
            ms_s_inp.on('keydown keypress', function() {
                clearTimeout(ms_srch_time)
            });
            ms_s_inp.on('keyup', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                var $this = ga(this);
                var ms_u_key = $this.val();
                var l_s_msg_us = ga('#pm_dlg_lft_users');
                var mdialog_srch_res = ga('#msg_d_search_res');
                var lupa_ic = ga('#msrch-act-1');
                var fbc_loader = "_55yn _55yo _55ym";
                if (mdialog_srch_res.length == 0) l_s_msg_us.before('<section id="msg_d_search_res"></section');



                if ($.trim(ms_u_key)) {
                    clearTimeout(ms_srch_time);
                    lupa_ic.removeClass('__remover').addClass(fbc_loader); //addClass('__loader');

                    ms_srch_time = setTimeout(function() {
                        var send = jAjax(pm__action, 'post', 'action=searchFriends&key=' + escape(ms_u_key));
                        send.done(function(data) { alert(data);
                            var vd = validateJson(data);
                            lupa_ic.removeClass(fbc_loader).addClass('__remover').on('click', function() {
                                $this.val('');
                                ms_s_inp.trigger('keyup')
                            });
                            if (vd.length <= 0) {
                                // empty result
                                mdialog_srch_res.html('<div class="mdialog_search_empty">' + lang.pm_no_friends_found + '</div>');
                            } else {
                                // result
                                var r_html = '';

                                //aaCtiveTab(0,1);
                                l_s_msg_us.hide();

                                for (var i = 0; i < vd.length; i++) {
                                    var rsd = vd[i];
                                    var mg_us_mkup = jprintf(u_markup, '1', 'onUcLeft', rsd.id, rsd.id, rsd.name, rsd.photo, rsd.id, rsd.photo, rsd.name, (rsd.online == 'true' ? '<div class="ic-online"></div>' : ''), rsd.id, rsd.id, rsd.name, rsd.id, '', 'notifications__hide', '');
                                    r_html += mg_us_mkup;

                                }
                                mdialog_srch_res.html(r_html);
                            }

                        });
                    }, 500);

                } else {
                    l_s_msg_us.show();
                    mdialog_srch_res.remove();
                    //aaCtiveTab();
                    lupa_ic.removeClass('__remover ' + fbc_loader);
                }

            });

            var sound_o_f = function(k) {

                if (k) {
                    m_sound.find('#s_u_txt').text(lang.pm_sound_disable);
                    m_sound.find('.ic_sound-on').removeClass('ic_sound-on').addClass('ic_sound-off');
                } else {
                    m_sound.find('.ic_sound-off').removeClass('ic_sound-off').addClass('ic_sound-on');
                    m_sound.find('#s_u_txt').text(lang.pm_sound_enable);
                }

            }

            m_block.find('#block_u_txt').replaceWith(lang.pm_block_u_txt);
            m_unblock.find('#unblock_u_txt').replaceWith(lang.pm_unblock_u_txt);
            m_hide.find('#hide_u_txt').replaceWith(lang.pm_hide_convers);
            m_delet.find('#del_u_txt').replaceWith(lang.pm_delete_convers);
            m_sound.find('#s_u_txt').text(pm_sound_enable() ? lang.pm_sound_disable : lang.pm_sound_enable);
            if (pm_sound_enable()) sound_o_f(1);
            else sound_o_f();




            // enable|disable sound notif
            m_sound.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();



                if (pm_sound_enable()) {
                    createCookie('dk_pm_sound', 'off');
                    sound_o_f();
                } else {
                    createCookie('dk_pm_sound', 'on');
                    sound_o_f(1);
                    setTimeout('turnOnSound();', 100);
                }

            });

            // delete conversation
            m_delet.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                confirm_act(jprintf(lang.pm_confirm_delete_conversation, $('#pm_header_dtl').text()),
                    function(event) {

                        var send = jAjax(pm__action, 'post', 'action=delConversation&to=' + escape(recipientId));
                        send.done(function(res) {

                            if (res == '1') {

                                remove_hide_convers();
                            } else {
                                displayErr(res);
                            }
                        }); //ajax


                    }); //confirm

            });

            // hide the conversation
            m_hide.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
		 
                var send = jAjax(pm__action, 'post', 'action=hideConversation&to=' + escape(recipientId));
                send.done(function(res) {

                    if (res == '1') {

                        remove_hide_convers();
                    } else {
                        displayErr(res);
                    }


                });

            });

            // add user to blacklist
            m_block.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();


                confirm_act(jprintf(lang.pm_to_blacklist, $('#pm_header_dtl').text()),
                    function(event) {

                        var send = jAjax(pm__action, 'post', 'action=uToBlackList&to=' + escape(recipientId));
                        send.done(function(res) {

                            if (res === '1') {

                                remove_hide_convers();
                            } else if (res === '0') {
                                displayErr(lang.pm_err_us_to_blacklist);
                            } else if (res !== '1' && res !== '0') displayErr(res);

                        }); // ajax

                    }); // confirmation

            }); // click

            $body.find('#page_layout').prepend($d);

            getContacts($d);
            $('.m_notif_space').empty();
            mDialogOpened = true;
        });


    }

}
// calculate scroll loader
function md_scroll_l(t) {

    return t.scrollTop() >= t[0].scrollHeight - t.height() ? true : false;

}

function md_m_more_conv() {
    ++md_page;
    var l = $('#pm_dlg_lft_users');
    var s_at = l.children().length;



    var send = jAjax(pm__action, 'post', 'action=moreConversations&i=' + escape(md_page) + '&s_at=' + (s_at) + '&token=' + (new Date()).getTime());

    send.done(function(html) {


        if (html != 0) {
            l.append(html);
        } else {
            md_loaded_all_conversations = 1;
            ga('[uid="prevDialogs"]').remove();
        }
    });

}

function getContacts(pBlock) {

    var send = jAjax(pm__action, 'post', 'action=getUsDialogs&view_as=json&d=' + new Date());
    send.done(function(data) { //alert(data)
        var d = validateJson(data);

        pBlock.find('#hooKMsgkLoadingContactDLeft').replaceWith(d.content);
        setTimeout(function() {
            if(ga('[data-uconv]').length > 10) pBlock.find('[uid="prevDialogs"]').removeClass('m_hidden');
///            pBlock.find('.mdialog_list_conversations div.disc-i:first').triggerf('click');
			
        }, 1500);

    });

    // loading more conversations via scrolling event
    mDialog.off('scroll.loadMOre').on('scroll.loadMore', function(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var $this = $(this);

        if (md_loaded_all_conversations) {
            $this.unbind('scroll.loadMore');
            return;
        }

        if (md_scroll_l($this)) md_m_more_conv();


    });

}
// automatically scroll down the scrollbar
function scrollChat() {

    //chat_scroll.animate({scrollTop: chat_scroll[0].scrollHeight});
    mdialog_hide_loader ? chat_scroll.scrollTop(chat_scroll[0].scrollHeight) : setTimeout(function() {
        chat_scroll.scrollTop(chat_scroll[0].scrollHeight)
    }, 200);
	var add_shared_class = ga('.msg_shared_cnt').closest('.d_comment_text_w');
	add_shared_class.addClass('transparent_bkg');
	add_shared_class.parent().addClass('transparent_bkg');
	
}

function getChatPattern() {
    return $('.mdialog_chat.__pattern');
}

function getChatCont() {
    return ga('#prvmsg_nano');
}

function removeChatLoader() {
    setTimeout(function() {
        getChatPattern().find('#mpm-loader').remove()
    }, 300);
}

function prependMsg(m) {  
    getChatCont().prepend(m);
}

function insertM(m) {
    getChatCont().html(m);
}

function loadingChat(message) {
    var chat_pattern = getChatPattern(),
        loader = '<section id="mpm-loader"><div class="message_loader_bg"></div><div class="message_loader_ic"></div></section>';
    chat_pattern.removeClass('__ll_init');
    if (!message)
        chat_pattern.prepend(loader);
    else {
        //  removeChatLoader();
        insertM(message);
        allMessages = '';
        if (!emj) {

            emj = ga('.mdialog_chat #emj').emojiarea({
                wysiwyg: true,
                buttonLabel: 'Emojis',
                buttonPosition: 'after',
                button: '.disc_toolbar_i_ic.__more'
            });
            emojiTxtEditor = ga('.mdialog_chat .emoji-wysiwyg-editor');


            _act_emoji = 'messages';
            // send message by pressing ENTER key
            emojiTxtEditor.on('keydown keypress keyup', function(e) {

                // $(this).removeClass('emoji-empty-focus');
                if (e.keyCode == 13) sendPM(this, e);
                // edit the last message by up arrow key
                if (e.keyCode == 38 && !$.trim(emj.val())) getChatCont().find('[uid="editMsg"]:last').trigger('click');
                // if pressing esc, cancel editing
                if (e.keyCode == 27) ga('[uid="uidCancelEdit"]').trigger('click');
            });

        }
        typingHead();
        scrollChat();
		
		// photos collage
		ga('.mdialog_atch_items_container').hide().imagesLoaded( function() {
					ga('.mdialog_atch_items_container').show().collagePlus(
												{
													'fadeSpeed'     : 10,
													'targetHeight'  : 190,        'allowPartialLastRow'   : false

											}
					);
		});
		

var pm_venoOptions = {

    bgcolor: '#5dff5e',         // default: '#fff'
    numeratio: true,            // default: false


    // is called when opening is finished
    post_open_callback  : function(content, blocknum, blocktitle){
				ga('body').attr('style','overflow:hidden!important');
	},



    // is called after finished closing. 
    post_close_callback : function(content,blocknum,blocktitle){
        ga('body').removeAttr('style');
    }
}

  ga('.mdialog_atch_items_container .venobox').venobox(pm_venoOptions); 

// Init gallery
//var gallery = new Gallery(elem);




        setTimeout(function() {
            getChatCont().find('.__underline_m').removeClass('__underline_m');
        }, 3000);


    }

}

function chatWith(evt, object, x) {
    evt.preventDefault();
    var allU = ga('#pm_dlg_lft_users');
    var atc = ga('.jb_attached_files.__messages');

    // hide online ic
    ga('#chat_active_now').hide();
	//loadAttach( ga('[uid="uidCommentsPanelClick"]') );

    if (atc.children().length != 0) {
        confirm_act(lang.pm_lost_files_confirm, function(event) {
            atc.empty();
            chatWith(evt, object, x);

        });
        return;
    }

    if (!visibleMd()) ga('#triggerMDialog').trigger('click');

    // if the messages dialog is not opened, waiting for loading
    // then click on the respective user
    if (!mDialogOpened) {

        var wait_open_mdialog = setInterval(function() {
            if (mDialogOpened) {
                clearInterval(wait_open_mdialog);
                chatWith(evt, object, x);
            }
        }, 2500);
        return false;
    }

    if (x) {
        var fUs = allU.find('#' + ga(object).attr('id'));

        if (fUs.length != 0)
            object = fUs;
        else {
            var y = $(object).data('uconv'),
                ui = y.id,
                un = y.fullname,
                up = y.photo;


            var u_mkup = jprintf(u_markup, '0', 'uChatDLeft', ui, ui, un, up, ui, up, un, '<div class="ic-online"></div>', ui, ui, un, ui, '', 'notifications__hide', '');
            allU.prepend(u_mkup);
            object = allU.find('#' + $(object).attr('id'));

        }
    }

    var $object = ga(object);
    var pm_uid = $object.data('uconv').id,
        pm_name = $object.data('uconv').fullname,
        pm_photo = $object.data('uconv').photo;
    var p_call_header = ga('#pm_header_dtl');

    recipientId = pm_uid;
    recipient_photo = pm_photo,
        recipient_name = pm_name;
    msg_page = 1;
    var op_win_chat = JSON.stringify({
        "id": recipientId,
        "fullname": recipient_name,
        "photo": recipient_photo
    });
    ga('[did="uchatw"]').html('<div title="Toggle chat window" onclick="return new_chat_window(this,event);" class="open_chat_in_window" data-uch=\'' + op_win_chat + '\'></div>');
    p_call_header.attr({
        'href': '/user/' + pm_uid,
        'hrefattr': true
    }).text(pm_name);
    setTimeout('up_href()', 2300);
    if (!mdialog_hide_loader) getChatCont().empty();
    switchToConversation();
    /// if (!mdialog_hide_loader) loadingChat();
    mDialog.find('.disc-i_sel').removeClass('disc-i_sel');
    $object.addClass('disc-i_sel');
    ga('.blocked_u_no_pm').remove();

    var getMessages = jAjax(pm__action, 'post', 'action=getMessages&to=' + escape(recipientId) + '&view_as=json');
    getMessages.done(function(data) {
		//alert(data);
		ga('.msg_window_no_user_selected').remove();
		
		
        var r = validateJson(data);
        var msg_count;
		
		// check for recipient's settings (if allow to receive messages from foreign people)
	if(r.allowsendpm == false) {ga('.mdialog_chat_add-comment').hide();ga('.pm_not_allow').removeClass('__none');}
		else {
			
			ga('.pm_not_allow').addClass('__none');ga('.mdialog_chat_add-comment').show();
		}
        $object.removeClass('__new_msg').find('.notifications').addClass('notifications__hide').find('.counterText').html('0');

        if (r.exp) {
            allMessages = '<div class="mdialog_newdialogmsg">' + r.exp + ' <br/> ' + r.sub + '</div>';

        } else {
            var gM = generateMessages(r).split('|STRIP|');
            msg_count = gM[1];
            allMessages = gM[0];

        }

        ga('[uid="mdialog_prev_btn_ld"]').remove();
        if (msg_count) {
            getChatCont().before(jprintf(load_old_msg_markup, lang.pm_load_old));

            chat_scroll.on('scroll', function(ev) {
                //ev.preventDefault();
               // ev.stopImmediatePropagation();
                var $this = $(this);

                ////if(md_loaded_all_conversations) {$this.unbind('scroll'); return;}

                if ($this.scrollTop() <= 10) mdialog_load_older_msgs();


            });


        }
		

		//ga('#prvmsg_nano').nanoScroller();
        upNewMsgCount();
        loadingChat(allMessages);
        emojiTxtEditor.removeClass('emoji-empty-focus').empty().focus();
		
		
        // add placeholder to our emoji textarea
        emojiTxtEditor.addClass('__placeholder_ex').html(m_placeholder);
        emojiTxtEditor.on('focus click', function(e) {

            var $this = $(this);
            if ($this.hasClass('__placeholder_ex')) {
                $this.removeClass('__placeholder_ex').empty();
            }

        }).on('blur', function(e) {
            var $this = $(this);

            if (!$.trim(emj.val()))
                $this.html(m_placeholder).addClass('__placeholder_ex');

        });


        mdialog_hide_loader = false;
        if (!startChatHeartBeat) {
            setTimeout('chatHeartBeat()', 5000);
            startChatHeartBeat = true;
        }

    });
	
	
}

function generateMessages(r, fd, load_old) {
    var y = 0,
        last_date, m_c, msgs = '';

	r = load_old ? r : r.messages;
    for (var i = 0; i < r.length; i++) {

        var m_id = r[i].id,
            m_msg = r[i].msg,
            m_count = r[i].count,
            m_fromU = r[i].fromUser,
            m_toU = r[i].toUser,
            m_time = r[i].time,
            m_lastby = r[i].lastby,
            m_read = r[i].read,
            m_date = r[i].date,
            m_c_date = r[i].currDate,
            m_dateMonth = r[i].dateMonth,
 
			m_bg = r[i].bg,
            // user details
            u_online = r[i].uonline,
            r_id = m_fromU !== recipientId ? _U.i : recipientId,
            r_ph = m_fromU !== recipientId ? _U.p : recipient_photo,
            whois = m_fromU === _U.i ? '__me' : '';

 
        var l_dat = $('.d_comment_time_delim_date:first').text();
        var hj = l_dat == m_dateMonth && fd ? true : false;

        m_c = m_count;
        msgs += m_lastby === y && m_date == last_date ?

            jprintf(text_markup, m_bg == 'no' ? 'transparent' : '', (whois ? _U.i : recipientId), whois, (whois ? 'r' : 'l'), m_id, (m_read == 'no' && m_fromU != _U.i ? '__underline_m' : ''), m_id, m_id, m_id, m_id, m_time, m_id, m_msg, m_id) :
            (m_date !== last_date && !hj ? jprintf(date_markup, m_dateMonth) : '') + jprintf(markup, m_id,m_bg == 'no' ? 'transparent' : '', (whois ? _U.i : recipientId), whois, m_id, m_id, r_id, r_ph, (u_online ? 'ic-online' : ''), m_id, (m_read == 'no' && m_toU == _U.i ? '__underline_m' : ''), m_id, m_id, m_id, m_id, m_time, m_id, m_msg, m_id);

        y = m_lastby;
        last_date = m_date;

    }

    return msgs + '|STRIP|' + m_c;

}

function sendPM(el, event, stk, toId) {
    event.preventDefault();
    emojiTxtEditor.empty().focus();
    var count = 0;
    var atch_files = ga('.jb_attached_files.__messages').children();
	var atch_tracks = ga('#WD_tracks_PM>ul');
    var $el = ga(el),
        text = stk ? stk : emj.val();

	recipientId = toId ? toId : recipientId;	
		
	// photos	
    if (atch_files.length > 0 && !stk) {
        for (var i = 0; i < atch_files.length; i++) {
            var bj_ph = ga('.attach-photo_del:eq(' + i + ')');
            var jb_ph = bj_ph.attr('id').split('_')[1];
            var _attached_m = bj_ph.data('attached') ? 1 : 0;
            var inceput = count == 0 ? '[divstart]' : '';
            var sfarsit = count + 1 == atch_files.length ? '[divend]' : '';
            text += inceput + '[img]' + escape(jb_ph) + (_attached_m ? '&Dfrom=Dattach&' : '') + '[/img]' + sfarsit;
            count++;
        }

    }
	
	// with tracks
    if (atch_tracks.children().length) {
        var songs_arr = [];
        // post contain songs
        atch_tracks.children().each(function() {
            var $this = ga(this);
            var postSongId = escape($this.attr('id').split('-')[1]);

            text += '[postSong]' + postSongId + '[/postSong]';

            songs_arr.push(postSongId);
       
        });

    }
	
    if (!$.trim(text) || text == m_placeholder) {
        emojiTxtEditor.addClass('_emoji-empty-focus').focus();
        return;
    } else
    if (!recipientId) {
        setTimeout(function() {
            window.location.reload(1)
        }, 3000);
        return displayErr(lang.pm_no_recipient);

    } else {
		
        var act = message_editable ? 'editMessage&i=' + message_editable : 'sendMessage';
        var ac = 'action=' + act + '&to=' + escape(recipientId) + '&bg='+ (stk ? 'no' : 'yes') +'&text=' + encodeURIComponent(text) + '&view_as=json';
        var send = jAjax(pm__action, 'post', ac);
        var new_m = $('.mdialog_newdialogmsg');
        var l_status_message = ga('.mdialog_send_message_loader');
        l_status_message.addClass('__visible');
        send.done(function(data) {//alert(data);
            var res = validateJson(data);
            // message delivered, hide loader ic
            l_status_message.removeClass('__visible');
            if (res.response === 'blacklist') {
                if (ga('.blocked_u_no_pm').length == 0)
                    ga('.emoji-wysiwyg-editor').after('<div class="blocked_u_no_pm">' + jprintf(lang.pm_user_to_blacklist, ga('#pm_header_dtl').text()) + '</div>');
                setTimeout(function() {
                    ga('.blocked_u_no_pm').addClass('__up');
                }, 1000);
            } else if (res.response === 'success') {

                var text = res.text.replace(/\\/g, ""),
                    time = !message_editable ? res.time : '',
                    mid = res.msgid,
                    read = res.rd,
					m_bg = res.bg,
                    recid = res.recipient;

                ga('.jb_attached_files.__messages').empty();
				atch_tracks.empty();

                if (chatBoxes.indexOf(recipientId) == -1 && !message_editable) {
                    mdialog_hide_loader = true;
                    setTimeout(function() {
                        ga('#y-' + recipientId).trigger('click');
                    }, 100);
                    chatBoxes.push(recipientId);

                }

                if (!message_editable)
                    apMessage(mid, '__me', _U.i, _U.p, time, text, 1, m_bg);
                else {
                    ga('[uid="uidCancelEdit"]').trigger('click');
                    ga('#m-id-msg-' + mid + ' .textWrap').html(text);
                }

                chatHeartBeat();




                // add pencil icon, that can make the comment editable
                setTimeout(function() {
                    if (recid != _U.i && !message_editable) {
                        m_d().find('a[d="editP_space_oc"]').remove();
                        m_d().find('div[d="editP_space"]:last').replaceWith(jprintf(pencil_m, mid));
                    }
                }, 1000);

                if (new_m.length != 0) new_m.remove();
            } else if (res.response !== 'success') {
                return displayErr(res.response);
            } else {
                return displayErr(lang.pm_error_deliv);
            }

        });

    }


}

function m_d() {
    return ga('.m_dialog_w_chat');
}

function apMessage(mid, whois, userId, userPhoto, mtime, mtext, online, m_bg) {

    
    m_d().append(
        m_d().find('.dk_order_messages:last').hasClass(userId) ?
        jprintf(text_markup, m_bg == 'no' ? 'transparent' : '', userId, whois, (whois ? 'r' : 'l'), mid, '', mid, mid, mid, mid, mtime, mid, mtext, mid) :
        jprintf(markup, mid, m_bg == 'no' ? 'transparent' : '', userId, whois, mid, mid, userId, userPhoto, (online ? 'ic-online' : ''), mid, '', mid, mid, mid, mid, mtime, mid, mtext, mid)
    );


    // scroll down to the last message
    scrollChat();
}

function mdialog_load_older_msgs() {
    var mdil_loader = $('#id-prev-comm-link-w-msg'),
        last_msg_id_vport = getChatCont().find('[uid="delMsg"]:first').attr('id');
		
		if(mdil_loader.hasClass('in-progress') || !mdil_loader.length) return;
		
    mdil_loader.addClass('in-progress');

	++msg_page;
 
    var send = jAjax(pm__action, 'post', 'action=oldm&to=' + escape(recipientId) + '&i=' + escape(msg_page) + '&view_as=json');
    send.done(function(res) { 
        var data = validateJson(res);
        mdil_loader.removeClass('in-progress');
        if (data.exp == '1') {
            mdil_loader.parent().remove();
        } else {
			 
            var r = generateMessages(data, 1, 1).split('|STRIP|'),
                msg_text = r[0],
                msg_count = r[1];
            prependMsg(msg_text);
            chat_scroll.scrollTop(getChatCont().find('[uid="delMsg"]#' + last_msg_id_vport).closest('.dk_order_messages').position().top - 50);
        }

    });
}

function mdialog_load_prev_messages(ev, ob) {
    ev.preventDefault();
    mdialog_load_older_msgs();
}

function chatHeartBeat() {

	var itemsfound = 0;
	
	if (windowFocus == false) {
 
		var blinkNumber = 0;
		var titleChanged = 0;
		for (x in newMessagesWin) {
			if (newMessagesWin[x] == true) {
				++blinkNumber;
				if (blinkNumber >= blinkOrder) {
					document.title = '* * * * * * * * * *';//x+' says...';
					ga('#favicon').attr({'href':ga('#favicon').attr('pm-href')+ '?v'+ Math.random()});
					titleChanged = 1;
					break;	
				}
			}
		}
		
		if (titleChanged == 0) {
			document.title = originalTitle;
			chatWindowTurnOnOriginalFavicon();
	
			blinkOrder = 0;
		} else {
			++blinkOrder;
		}

	} else {
		for (x in newMessagesWin) {
			newMessagesWin[x] = false;
		}
	}

	for (x in newMessages) {
		if (newMessages[x] == true) {
			if (chatboxFocus[x] == false) {
				//FIXME: add toggle all or none policy, otherwise it looks funny
				//$('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
				//alert('e');
			}
		}
	}

    // typing
    var sTyping = jAjax(pm__action, 'post', 'action=typing&to=' + escape(recipientId) + '&tp=' + escape(typing) + '&view_as=json');
    sTyping.done(function(data) {
       


        var messageWindow = $('.m_dialog_w_chat');
        var rsp = validateJson(data);


        if (rsp.typing === '1' && recipientId === rsp.user) {
            if (messageWindow.find('[data-utyping="true"]').length == 0)
                messageWindow.append('<div class="toCenterTtp" data-utyping="true"><span class="ic12 ico-inline ic12_typing"></span><span class="msg_seen_tx">' + (recipient_name.split(' ')[0]) + '&nbsp;' + lang.typing + ' ...</span></div>');
            scrollChat();
        } else if (rsp.typing !== '1') {

            messageWindow.find('[data-utyping="true"]').remove();

        }

    });


    // update messages on active conversation
    var req = jAjax(pm__action, 'post', 'action=chatheartbeat&to=' + escape(recipientId) + '&view_as=json');

    req.done(function(data) {




        for (var items = validateJson(data), i = 0; i < items.length; ++i) {
            if (items) {
                var c = items[i],
                    message_id = c.id,
                    message_txt = c.msg.replace(/\\/g, ""),
                    from_user = c.from,
                    sended_at = c.time,
                    last_msg_by = c.lastby,
                    recipient_online = c.uonline,
                    message_read = c.read;


                if (from_user === recipientId) {
                    apMessage(message_id, '', recipientId, recipient_photo, sended_at, message_txt, recipient_online);

                    newMessages[recipient_name] = true;
                    newMessagesWin[recipient_name] = true;
                } else if (from_user != recipientId && mDialog.find('#y-' + from_user).length != 0) {

                    //NUM count


                } else {

                    // prepend new user

                }

                itemsfound += 1;
                if (windowFocus === false) turnOnSound();
            }
        }

        chatHeartbeatCount++;

        if (itemsfound > 0) {
            chatHeartbeatTime = minChatHeartbeat;
            chatHeartbeatCount = 1;
        } else if (chatHeartbeatCount >= 10) {
            chatHeartbeatTime *= 2;
            chatHeartbeatCount = 1;
            if (chatHeartbeatTime > maxChatHeartbeat) {
                chatHeartbeatTime = maxChatHeartbeat;
            }
        }

        setTimeout('chatHeartBeat();', chatHeartbeatTime);
        ///console.log("Chat Time",chatHeartbeatTime);
    });


}
			function chatWindowTurnOnOriginalFavicon(){
				
				ga('#favicon').attr({'href':ga('#favicon').attr('original-href') + '?v'+ Math.random()});
				
			}
// check for new messages, and append notification count
function upNewMsgCount(off) {
	
    var $msgBl = ga('#messageHookBl'),
        msg_c_spc = ga('.m_notif_space'),
        wChat = ga('.mdialog_chat_conversation'),
        on_mark = '<div class="ic-online"></div>';
    var itfound = 0;

	
	if( anonym_content ) return;
	
	
    var nCountReq = jAjax(pm__action, 'post', 'action=chatNumCount&view_as=json');

    nCountReq.done(function(data) { 
        var bData = data.split('|-|');
        if (bData[0] === 'null') {
            var uo = validateJson(bData[1]);

            for (var i = 0; i < uo.length; i++) {
                var xd = uo[i],
                    xd_ui = xd.o_uid,
                    xd_on = xd.o_uConnected;


                // add|remove online icon from left side of users
                if (xd_on)
                    ga('#y-' + xd_ui).find('#f_onl_gtm').html(on_mark);
                else
                    ga('#y-' + xd_ui).find('#f_onl_gtm').empty();

                // add|remove online icon from messages window
                if (xd_on && xd_ui === recipientId)
                    ga('#chat_active_now').show();
                else if (!xd_on && xd_ui === recipientId)
                    ga('#chat_active_now').hide();

                if (xd_on && xd_ui === recipientId && wChat.find('.f_onl_gtm>.ic-online').length == 0)
                    wChat.find('.f_onl_gtm').html(on_mark);
                else if (!xd_on && xd_ui === recipientId && wChat.find('.f_onl_gtm>.ic-online').length !== 0)
                    wChat.find('.f_onl_gtm').empty();



            }
            ga('#fOnCount').html(bData[2] !== '0' ? '<div onclick="fOnlineTab(this,event)">' + lang.fr_online + ' ' + bData[2] + '</div>' : '<div class="__disabled">' + lang.fr_no_online + '</div>');
            msg_c_spc.empty();

        } else if (bData[0] !== 'null') {

            var explode_data = bData;
            // show message icon on header
            if ($msgBl.hasClass('__message_bl_hidden') || $msgBl.length == 0) {

                if (explode_data[1] !== lastCountUpdate) {
                    msg_c_spc.html(jprintf(header_count, explode_data[1]));
                    if (!off) turnOnSound();
                }

                lastCountUpdate = explode_data[1];
            }
            if ($msgBl.length !== 0) {
                for (var r = validateJson(explode_data[0]), x = 0; x < r.length; ++x) {

                    if (r[x].uid === recipientId) return false;
                    if (r[x].uid != recipientId && r[x].count != m_last_c) turnOnSound();
                    var usInDialogList = mDialog.find('#y-' + r[x].uid);
                    usInDialogList.find('.msg_timestamp_u').text(r[x].time);
                    usInDialogList.addClass('__new_msg').find('.notifications').removeClass('notifications__hide').find('.counterText').html('+' + r[x].count);
                    usInDialogList.find('#chat_lstMsg').html(r[r.length - 1].msg);
					 
                    m_last_c = r[x].count;

                    // prepend new user
                    if (usInDialogList.length == 0) {
                        ///id, id, fullname, photo, id, photo, fullname, id, id, fullname, id, message
                        var gUserD = jprintf(u_markup, '0', 'uChatDLeft', r[x].uid, r[x].uid, r[x].fullname, r[x].photo, r[x].uid, r[x].photo, r[x].fullname, '', r[x].uid, r[x].uid, r[x].fullname, r[x].uid, r[x].msg, '', r[x].count);
                        mDialog.find('div:first').after(gUserD);
                    }

                }

            }

            itfound += 1;

        }


        chatHeartbeatCount_x++;

        if (itfound > 0) {
            chatHeartbeatTime_x = minChatHeartbeat_x;
            chatHeartbeatCount_x = 1;
        } else if (chatHeartbeatCount_x >= 10) {
            chatHeartbeatTime_x *= 2;
            chatHeartbeatCount_x = 1;
            if (chatHeartbeatTime_x > maxChatHeartbeat) {
                chatHeartbeatTime_x = maxChatHeartbeat;
            }
        }

        setTimeout('upNewMsgCount();', chatHeartbeatTime_x);
        console.log("Num Time", chatHeartbeatTime_x);
    });
}

// set active tab
function aaCtiveTab(a, b, c) {

    var msg_top_tabs = ga('.mdialog_list_tabs');

    if (b) {
        msg_top_tabs.find('.toggle-span-selected').removeClass('toggle-span-selected');
        return;
    }

    if (a)
        msg_top_tabs.find('.toggle-span-selected').removeClass('toggle-span-selected').closest(msg_top_tabs).find('.toggle-span:last').addClass('toggle-span-selected');
    else
        msg_top_tabs.find('.toggle-span-selected').removeClass('toggle-span-selected').closest(msg_top_tabs).find('.toggle-span:first').addClass('toggle-span-selected');

}

// edit messsage
function edt_m(e, i) {
    e.preventDefault();
    var $o = $(e.target),
        txt = $o.closest('.d_comment_text_w').find('.textWrap').html();
    $o.closest('.dk_order_messages').addClass('d_comment_disabled_editable');
    $('.emoji-wysiwyg-editor').before(cancel_edit_m);

    emojiTxtEditor.focus().html(txt);
    message_editable = i;
}

function leaveEditing(event) {
    var $obj = $(event.target);

    $obj.parent().remove();
    emojiTxtEditor.empty();
    ga('.dk_order_messages.d_comment_disabled_editable').removeClass('d_comment_disabled_editable');
    message_editable = false;
}

// report message
function mdialog_report(e, o) {

    e.preventDefault();
    var $o = $(o),
        m_e = $o.attr('id').split('-'),
        m_id = m_e[m_e.length - 1],
        msg = $o.closest('.d_comment_w').find('.textWrap .mdialog_atch_items_container').length != 0 ? '' : $o.closest('.d_comment_w').find('.textWrap').html();

    confirm_act(lang.pm_report_confirm + '<br/><div class="c_mdialog_sm_mg ellip">' + msg + '</div>',
        function(event) {

            var s_d = jAjax(pm__action, 'post', 'action=spam&i=' + escape(m_id) + '&view_as=json');
            s_d.done(function(r) {

                if (r === '1') {
                    ga('.m_dialog_w_chat').find('.textWrap#m-id-msg-' + escape(m_id)).html('<i>' + lang.pm_reported_msg + '</i>');
                    ga('#m-id-msg-' + escape(m_id)).closest('.dk_order_messages').addClass('deleted_pm');
                } else
                    return displayErr(r);

            });

        });

}
// delete message
function delM(o, e) {
    e.preventDefault();
    var $o = ga(o),
        m_e = $o.attr('id').split('-'),
        m_id = m_e[m_e.length - 1],
        msg = $o.closest('.d_comment_w').find('.textWrap .mdialog_atch_items_container').length != 0 ? '' : $o.closest('.d_comment_w').find('.textWrap').html();

    confirm_act(lang.pm_delete_confirm + '<br/><div class="c_mdialog_sm_mg ellip">' + msg + '</div>',
        function(event) {

            var s_d = jAjax(pm__action, 'post', 'action=del&i=' + escape(m_id) + '&view_as=json');
            s_d.done(function(r) {

                if (r === '1') {
                    ga('.m_dialog_w_chat').find('.textWrap#m-id-msg-' + escape(m_id)).html('<i>' + lang.pm_deleted_succ + '</i>');
                    ga('#m-id-msg-' + escape(m_id)).closest('.dk_order_messages').addClass('deleted_pm');
                } else
                    return displayErr(r);

            });

        });

}

// dropDown
function md_enb_dropDown(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var $t = ga(ev.target);
    var $d = ga('.comments_smiles_popup');
    var css = {};
    css['width'] = chat_scroll.width();
    var removeD = function() {

        $d.removeClass('__o_act');

    }

    var addD = function() {

        $d.addClass('__o_act'); //.css(css);
    }


    if ($d.hasClass('__o_act'))
        removeD();
    else
        addD();

    ga(document).on('click.pmDialog', function(e) {
        e.stopPropagation();
        removeD()
    });

}

function gLU() {
    return ga('.uChatDLeft');
}

// switch to conversation
function switchToConversation() {

    var uLch = gLU();
    var prev_d = $('[uid="prevDialogs"]');
    ga('.onUcLeft').remove();
    ga('#pm_dlg_lft_users').show();

    if (!prev_d.hasClass('m_hidden'))
        prev_d.show();

    uLch.show();

    aaCtiveTab(0);
}

// switch to online users tab
function fOnlineTab(o, e) {
    e.preventDefault();
    var uLch = gLU();
    uLch.hide();

    aaCtiveTab(1);

    var prev_d = $('[uid="prevDialogs"]');
    if (!prev_d.hasClass('m_hidden'))
        prev_d.hide();

    var send = jAjax(pm__action, 'post', 'action=onlineTab&view_as=json');

    send.done(function(result) { //alert(result);
        ga('#msg_d_search_res').remove();
		var u_mkup = '';
        if (result !== 'null') {

            for (var rs = validateJson(result), i = 0; i < rs.length; i++) {
				var d = rs[i];
				
				if( !ga('#mess_online_u_'+d.id).length ) {
                
                ///id, id, fullname, photo, id, photo, fullname, online, id, id, fullname, id, notif_hide, message
                u_mkup += '<div id="mess_online_u_'+d.id+'">'+jprintf(u_markup, '1', 'onUcLeft', d.id, d.id, d.name, d.photo, d.id, d.photo, d.name, '<div class="ic-online"></div>', d.id, d.id, d.name, d.id, '', 'notifications__hide', '')+'</div>';
                //uLch.last()
				}
            }
			 ga('#pm_dlg_lft_users').after(u_mkup);
        } else {

            // no online friends
        }



    });

}

// sound
function turnOnSound() {

    /*$('#sound_notif_new_msg').remove();
    if (pm_sound_enable()) {alert('sound');$('body').append('<embed id="sound_notif_new_msg" src="' + pm_sound + '" autostart="true" hidden="true" loop="false"></embed>');}
*/
    if (pm_sound_enable()) {
        ga('#sound_notif_new_msg').remove();

        ga('<audio id="sound_notif_new_msg" autoplay="true" style="display:none;">\
    <source src="' + pm_sound + '.ogg" type="audio/ogg">\
    <source src="' + pm_sound + '.mp3" type="audio/mpeg">\
	</audio>').appendTo('body');
        setTimeout(function() {
            ga('#sound_notif_new_msg').remove();

        }, 300);
    }

}

/*
// messages count
function headerBCountMsg(){
var $msgBl = $('#messageHookBl');


if($msgBl.hasClass('__message_bl_hidden') || $msgBl.length == 0){

var send = jAjax(pm__action, 'post', 'action=headerNumCount&view_as=json');

send.done(function(data){



});

}

setTimeout('headerBCountMsg()',1500);

}
*/
// resize the messages dialog
function resizeMsgDialog() {
    var $w = ga(window);
    if (typeof d_lg != 'undefined') d_lg.height($w.height() - 80);
}
window.onload = function() {
    upNewMsgCount(1);
    originalTitle = document.title;
};

ga(window).on("resize.pmDialog", resizeMsgDialog);

ga([window, document]).blur(function() {
    windowFocus = false;

}).focus(function() {

    windowFocus = true;
    document.title = originalTitle;
    ga('#favicon').attr('href', originalFav + '?v=' + Math.random());
});




/* Live typing notification
---------------------------- */
function typingHead() {

    var typingTimer;
    var doneTypingInterval = 500;


    emojiTxtEditor.on('keypress.msgWin', function() {
        typing = 1;

        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);

    });

    emojiTxtEditor.on('keydown.msgWin', function() {
        clearTimeout(typingTimer);
        typing = 0;

    });

}

function doneTyping() {
    typing = 0;
    return typing;
}

/* Chat window
----------------------------------*/
/*function new_chat_window(el, ev) {
    ev.preventDefault();
    var $th_el = $(el);
    var $u_data = $th_el.data('uch');
    var chat_uid = $u_data.id;
    var w_wd = 284;
    var w_wh = 308;
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var w_width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var w_height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var w_left = ((w_width / 2) - (w_wd / 2)) + dualScreenLeft;
    var w_top = ((w_height / 2) - (w_wh / 2)) + dualScreenTop;

    // Puts focus on the newChatWindow
    if (window.focus && chat_uid in newChatWindow) {

        newChatWindow[chat_uid].focus();
    } else {

        newChatWindow[chat_uid] = window.open("/chat?q=" + chat_uid + "&_tok=" + (new Date()).getTime(), "_blank", 'location=0,minimizable=0,dependent=1,dialog=0,menubar=0,toolbar=0,location=0,personalbar=0,status=1,fullscreen=0,resizable=0,scrollbars=1,width=' + w_wd + ', height=' + w_wh + ', top=' + w_top + ', left=' + w_left);
        remainOnSite('DUDE YOU HAVE CHAT WINDOWS', 'chatWindow' + chat_uid, function() {
            for (x in newChatWindow) newChatWindow[x].close();
        });
    }


    var chat_w_interval = window.setInterval(function() {
        try {
            if (newChatWindow[chat_uid] == null || newChatWindow[chat_uid].closed) {
                window.clearInterval(chat_w_interval);
                delete newChatWindow[chat_uid];
                unbindRemainOnSite('chatWindow' + chat_uid);
            }
        } catch (e) {
            alert(e);
        }
    }, 1000);

}

function focusActChatWindow(id) {

    newChatWindow[id].blur();
    setTimeout(newChatWindow[id].focus(), 10);
}
*/

function new_chat_window(el, ev) {  
	    var $th_el = $(el);
    var $u_data = $th_el.data('uch');
    var chat_uid = $u_data.id;
	
	MchatWith(1);

}