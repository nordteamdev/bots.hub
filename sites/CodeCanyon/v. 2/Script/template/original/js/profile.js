var pf_menu_friend_other_actions,pf_menu_friend_other_actions_top_menu, fr_this_us_gend, fr_relationship;
var pf_curr_wloc = window.location.search;
var pf_search_timeout;

function replaceRelationship(code, a) {

    var res = code;
    if (!a) {
        switch (code) {
            case '1':
                res = '[relative]';
                break;
            case '2':
                res = 'best_friend';
                break;
            case '3':
                res = 'colleague';
                break;
            case '4':
                res = 'classmate';
                break;
            case '5':
                res = 'coursemate';
                break;
            case '6':
                res = 'army_friend';
                break;
            case '7':
                res = 'playing_together';
                break;
            case '8':
                res = '';
                break;
        }
    } else {

        switch (code) {
            case '[relative]':
                res = '1';
                break;
            case 'best_friend':
                res = '2';
                break;
            case 'colleague':
                res = '3';
                break;
            case 'classmate':
                res = '4';
                break;
            case 'coursemate':
                res = '5';
                break;
            case 'army_friend':
                res = '6';
                break;
            case 'playing_together':
                res = '7';
                break;
            case '':
                res = '8';
                break;
        }

    }

    return res;
}

function updateFriendRelationShip(evt, arr, friend_d, obj,new_req) {
    evt.preventDefault();
    var pf_rl_direct = '';
    if(localStorage.getItem('direct_relat')){
    pf_rl_direct = 'direct=1&';
    localStorage.removeItem('direct_relat');
    }
   
  //  if (arr.length <= 0) { return jboxNotice(jprintf(lang.what_is_your_friend_relationship, friend_d.ufn), 'left', 'top', 'yellow');
        var param = arr.length <= 0 ? 'cmd=updateRelationShip&i=' + escape(friend_d.uid) + '&type=pos' : pf_rl_direct+'cmd=updateRelationShip&fr=' + arr + '&i=' + escape(friend_d.uid) + '&type=pos';
        var send = jAjax('/profile', 'post', param);
        send.done(function(res) {
     

            if (res != '1') return displayErr(res);
            else {
				if(new_req){
					var request_friend_sent_btn = '<button class="flat_button button_wide secondary __request_sent"><i class="icofont icofont-send-mail">&#xf0c5;</i>'+lang.friend_request_has_been_sent+'</button>';
					ga('#action_menu_set_relationship').replaceWith(request_friend_sent_btn);
				}
				ga('.mml_ic_close.__rlts').trigger('click');}

        });

    

}

function grltfrSubktg(u_gender){

        switch (u_gender) {
            default:
                case 'male':
                h = '<option value="' + lang.relative + '">' + lang.relative + '</option>' +
                '<option value="' + lang.father + '">' + lang.father + '</option>' +
                '<option value="' + lang.brother + '">' + lang.brother + '</option>' +
                '<option value="' + lang.uncle + '">' + lang.uncle + '</option>' +
                '<option value="' + lang.nephew + '">' + lang.nephew + '</option>' +
                '<option value="' + lang.grandfather + '">' + lang.grandfather + '</option>' +
                '<option value="' + lang.father_in_law + '">' + lang.father_in_law + '</option>' +
                '<option value="' + lang.son_in_law + '">' + lang.son_in_law + '</option>' +
                '<option value="' + lang.godfather + '">' + lang.godfather + '</option>' +
                '<option value="' + lang.godson + '">' + lang.godson + '</option>';

            break;
            case 'female':
                    h = '<option value="' + lang.relative + '">' + lang.relative + '</option>' +
                    '<option value="' + lang.mother + '">' + lang.mother + '</option>' +
                    '<option value="' + lang.sister + '">' + lang.sister + '</option>' +
                    '<option value="' + lang.aunt + '">' + lang.aunt + '</option>' +
                    '<option value="' + lang.niece + '">' + lang.niece + '</option>' +
                    '<option value="' + lang.mother_in_law + '">' + lang.mother_in_law + '</option>' +
                    '<option value="' + lang.daughter_in_law + '">' + lang.daughter_in_law + '</option>' +
                    '<option value="' + lang.godmother + '">' + lang.godmother + '</option>' +
                    '<option value="' + lang.goddaughter + '">' + lang.goddaughter + '</option>';
                break;
        }
        return '<select id="rel_type_sel_relatives" class="isl isl__res __relationship_opts" style="height: auto;" size="10">' + h +
        '</select>';;


}

function fr_subcategoryOpts(obj, ev, a) {

    var $this = $(obj), inp_o = $('input#1');

	if(a){ 

		if(inp_o.prop('checked')){ inp_o.closest('li').removeClass('__fff'); inp_o[0].checked=false }else{inp_o.closest('li').addClass('__fff'); inp_o[0].checked=true;}
	}


    var subcateg = grltfrSubktg(fr_this_us_gend);
    if ($('#rel_type_sel_relatives').length != 0)
        $('#rel_type_sel_relatives').remove();
    else
        $this.parent().append(subcateg);


    if (!$('#rel_type_sel_relatives option[selected="selected"]').length) {
        var first_opt = $('#rel_type_sel_relatives option:first');
        first_opt.attr('selected', 'selected').trigger('click');
      //  fr_relationship.push(first_opt.val());alert(fr_relationship);
    }

    var spliceOutctg = function(obj) {

        $('#rel_type_sel_relatives').find('option').each(function() {
            if (fr_relationship.indexOf($(this).val()) != -1)
                fr_relationship.remove(fr_relationship.indexOf($(this).val()));
        });

    }

    $('#rel_type_sel_relatives option').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var all_opts = $(this).closest('select');
        var $this = $(this);
        spliceOutctg();

        fr_relationship.push($this.val());

    });

}

// set the friend relationship
ga(document).off('click.rlq').on('click.rlq', '#action_menu_set_relationship_a', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $b = $('body');
	var $that = $(this);
    var user_d = typeof $(this).data('usnf')[0] != 'undefined' ? $(this).data('usnf')[0] : $(this).data('usnf');
    var user_relat = user_d.relationship !== null && user_d.relationship.indexOf(',') ? user_d.relationship.split(',') : [];
    var hookPrepBl;
    var namspc = (new Date()).getTime();
    fr_relationship = new Array();
    fr_this_us_gend = user_d.gender;


    var m = '<section id="relationship_md"><div class="modal-new __rlt_ff"><div class="indicate_friend_relat" style="left:%spx;">' +
        '<span title="' + lang.close + '" class="mml_ac_i ic mml_ic_close __rlts"></span>' +
        '<div class="panelLayer_t-simple"><span class="ellip">' + user_d.ufn + '</span> is your</div>' +
        '<ul class="relat_menu">' +
        '<li class="relat_item _first"><input onclick="fr_subcategoryOpts(this,event)" id="1" type="checkbox"/> <label onclick="event.preventDefault();fr_subcategoryOpts(this,event,1)" for="1" class="rel_tile">' + lang.relative + '</label></li>' +
        '<li class="relat_item"><input id="2" type="checkbox"/> <label for="2" class="rel_tile">' + lang.best_friend + '</label></li>' +
        '<li class="relat_item"><input id="3" type="checkbox"/> <label for="3" class="rel_tile">' + lang.colleague + '</label></li>' +
        '<li class="relat_item"><input id="4" type="checkbox"/> <label for="4" class="rel_tile">' + lang.classmate + '</label></li>' +
        '<li class="relat_item"><input id="5" type="checkbox"/> <label for="5" class="rel_tile">' + lang.coursemate + '</label></li>' +
        '<li class="relat_item"><input id="6" type="checkbox"/> <label for="6" class="rel_tile">' + lang.army_friend + '</label></li>' +
        '<li class="relat_item"><input id="7" type="checkbox"/> <label for="7" class="rel_tile">' + lang.playing_together + '</label></li>' +
        '<li class="relat_item __no_relation"><input id="8" type="checkbox"/> <label for="8" class="rel_tile">' + lang.no_relation + '</label></li>' +
        '</ul><div class="rltsh_btn"><button disabled class=" __disabled button-pro relationship_save">' + lang.save + '</button></div></div></div></section>';

   // $('.u_p_left_column')
	ga(this).parent().append(jprintf(m, ga(this).offset().left)).find('input').on('click', function(e) {

        var $t = $(this).closest('li');
        var fr_btn = $('button.relationship_save');
        var fcl = "__fff";

        var enableSaveBtn = function() {
            fr_btn.removeAttr('disabled').removeClass('__disabled').off('click').on('click', function(e) {
                updateFriendRelationShip(e, fr_relationship, user_d, this, $that.hasClass('__from_new_req'));
            });
        }
        var disableSaveBtn = function() {
            fr_btn.attr('disabled', true).addClass('__disabled');
        }

        if($t.hasClass('__no_relation')){
	fr_relationship = new Array();
        $('#rel_type_sel_relatives').slideUp(400,function(){$(this).remove()});
	if($t.hasClass(fcl)){disableSaveBtn();
	$t.removeClass(fcl);
	}else{ $t.addClass(fcl);enableSaveBtn();}
	$('.relat_menu').children().each(function(){
	if(!$(this).hasClass('__no_relation')){
	$(this).removeClass(fcl);
	$(this).find('input:first')[0].checked=false;
	}
	});
	return;
 	}

        if ($t.hasClass(fcl)) {
            // delete from array
            if (!$t.hasClass('_first')) fr_relationship.remove(fr_relationship.indexOf(replaceRelationship($t.find('input').attr('id'))))
            $t.removeClass(fcl);
	    $('.__no_relation').removeClass(fcl).find('input')[0].checked=false;
        } else {
	    $('.__no_relation').removeClass(fcl).find('input')[0].checked=false;
            $t.addClass(fcl);
            // add to array    
            if (!$t.hasClass('_first')) fr_relationship.push(replaceRelationship($t.find('input').attr('id')));
        }

        if ($('#relationship_md ul li.__fff').length != 0) {
            enableSaveBtn();
        } else {
            disableSaveBtn();
        }

    });

    // auto tick on init
    if (user_d.relationship != '') {
        for (var c = 0; c < user_relat.length; ++c) {
            var respective_id = $('.relat_menu input#' + replaceRelationship(user_relat[c], 1));
            if (respective_id.length != 0)
                respective_id.trigger('click');
            else if (/^[a-zA-Z]+$/.test(replaceRelationship(user_relat[c], 1))) {
                $('.relat_menu input#1').trigger('click');
                $('#rel_type_sel_relatives option[value="' + user_relat[c] + '"]').attr('selected', 'selected').trigger('click');
            }
        }
    }

    hookPrepBl = $('#relationship_md .indicate_friend_relat');



    var original_scrollPos = $b.scrollTop();
    $b.animate({
        scrollTop: 97
    }, function() {

        hookPrepBl.addClass('__visible').on('click', function(e) {
            e.stopPropagation();
        });
    }).css('overflow', 'hidden').on('click keyup', function(e) {
        $(this).off('click keyup');
        var relationShipFrClose = function() {
            $('#relationship_md .indicate_friend_relat').removeClass('__visible').on(crossEvent, function() {
                $b.css('overflow', 'auto').scrollTop(original_scrollPos);
                $(this).closest('section').remove();
            });
        }

        if (e.keyCode == 27 || e.type == "click")
            relationShipFrClose();

    });
    $('.mml_ic_close.__rlts').on('click', function() {
        $b.trigger('click');
        $(this).off('click');
    });
});

// other actions, in profile page
$(document).on('click.b1', '#action_menu_expand_item_a', function(e) {
    e.preventDefault();

    var ul_dropdown = $('#action_menu_sub_action_menu');

    if (ul_dropdown.hasClass('__show')) {
        ul_dropdown.removeClass('__show');
    } else {
        ul_dropdown.addClass('__show');
    }



});

ga(document).on('mouseover.b1 mouseenter.b1', '#action_menu_sub_action_menu', function(e) {
    clearTimeout(pf_menu_friend_other_actions);
    $('#action_menu_sub_action_menu').addClass('__show');
});
ga(document).on('mouseout.b1 mouseleave.b1', '#action_menu_sub_action_menu', function(e) {
    pf_menu_friend_other_actions = setTimeout(function() {
        $('#action_menu_sub_action_menu').removeClass('__show');
    }, 1000);
});


// other click, top menu
ga(document).on('click.b2', '#mctc_navMenuDropdownSec_otherSections', function(e) {
 
    var ul_dropdown = ga('.mctc_navMenuDDC');

    if (ul_dropdown.hasClass('__show')) {
        ul_dropdown.removeClass('__show');
    } else {
        ul_dropdown.addClass('__show');
    }



});

ga(document).on('mouseover.b2 mouseenter.b2', '.mctc_navMenuDDL', function(e) {
    clearTimeout(pf_menu_friend_other_actions_top_menu);
    ga('.mctc_navMenuDDC').addClass('__show');
});
ga(document).on('mouseout.b2 mouseleave.b2', '.mctc_navMenuDDL', function(e) {
    pf_menu_friend_other_actions_top_menu = setTimeout(function() {
        ga('.mctc_navMenuDDC').removeClass('__show');
    }, 1000);
});

function deleteFriend(el, evt, shortcut) {
    var _this = $(el);
    var fid = escape(_this.data('fid').split('_')[1]);

    confirm_act(lang.confirm_delete_friend, function() {

        var send = jAjax('/profile', 'post', 'cmd=unfriend&i=' + fid + '&type=pos');
        send.done(function(res) {//alert(res);

            if (res == '1') {
               // $('ul.__prut li:first').removeClass('m_hidden');
               // $('ul.__prut li:eq(1)').addClass('m_hidden');
			   	if(shortcut){
					ga('#hook_ShortcutMenu_'+fid).closest('li,.ugrid_i').fadeOut();
					ga('#friendCardId_'+fid).fadeOut();
				} else {
				ga(el).remove();
				var add_friend_req = '<button class="flat_button button_wide _send_request" href="/profile?q='+fid+'&cmd=addFriend&i='+fid+'" onclick="addFriend(this,event,\''+o_krypt(fid)+'\')" title="'+lang.friend_request+'" data-friend-btn="add_friend_btn_sub_photo"><i class="join_to_group_ic"></i>'+lang.friend_request+'</button>';
				ga('[data-friend-btn="add_friend_btn_sub_photo"]').replaceWith(add_friend_req);

				}
            } else {

                return displayErr(lang.err_delete_fr);

            }

        });


    });

}

// search for friends in friends page
function searchForFriends($this,ev){
ev.preventDefault();
var empty_res = '<div class="stub-empty __friends"><div class="stub-empty_img"></div><div class="stub-empty_t">'+lang.friends_search_no_res+'</div><div class="stub-empty_tx">'+lang.friends_search_no_res_no_comm+'</div></div>';

var $this = $($this);

clearTimeout(pf_search_timeout);
pf_search_timeout = setTimeout(function(){
var key = $.trim($this.val());
var friendid = escape($.trim($this.data('euid')));
var res_ot = ga('#hook_friends_fr_srch_res'), cancel_ic = ga("#searchFriends_searchIconId");
var list = $this.data('interfacemode') ? '&list=1' : '';

var k = function(a){
res_ot.css('opacity',a? 0.4 : 1);
}

if(!key){
localStorage.removeItem( '_1_fr_key');
cancel_ic.removeClass('ic_close-g');
$('.sfrtriggerclick.m_hidden').trigger('click');
 k();

 }
else{
k(1);
if (history.pushState) {
window.history.pushState('', '', '/friends/'+$this.data('euid')+'/key/'+key);
}

cancel_ic.addClass('ic_close-g').off('click').on('click',function(e){ $this.val('').trigger('keyup'); });
var send = jAjax('/profile','post','friendid='+friendid+'&cmd=searchFriends'+list+'&key='+key+'&type=pos&view_as=json');
send.done(function(data){
 
var res = validateJson(data);
var list_view = $('.ic.ic_list-view'), grid_view = $('.ic.ic_grid-view');
$('.wide_friends_lf_cl .nav-side .nav-side_i.__ac').removeClass('__ac');
$('.wide_friends_lf_cl .nav-side .nav-side_i:first').addClass('__ac');

///localStorage.setItem( '_fr_view_btn', { list_view:list_view.attr('href'), grid_view: grid_view.attr('href') });

list_view.attr('href',list_view.attr('href') ? list_view.attr('href').replace('mode','dr') : list_view.attr('href'));
grid_view.attr('href',grid_view.attr('href') ? grid_view.attr('href').replace('mode','dr') : grid_view.attr('href'));

/*
if(localStorage.getItem('_1_fr_key'))
localStorage.removeItem( '_1_fr_key');
else
localStorage.setItem( '_1_fr_key',key);
//createCookie('_1_fr_key',key);
*/

if(res.is_result)
 res_ot.html(res.result);
else
 res_ot.html(empty_res);

k(0);
});

}


},500);

}

function selectToIndicateRelation(_grl){
var ffr_p_arr = {};


                   $('#ifSQtext').off('focus.kdru').on('focus.kdru',function(){ $('[data-onm="All "]').trigger('click'); }).fastLiveFilter('.cardsTable>tbody>tr',{
    			timeout: 200
		   });

$("#cppaste_injava").children().each(function(i){
var $this = $(this), sort_rrl = $this.find('.nav-side_tx'), allFrP = $('ul#allFriendsPopup');

if(parseInt($this.find('.lstp-t').html()) > 0)
allFrP.append('<li class="inav-drop_li"><a class="inav_a" data-onm="'+(sort_rrl.html().split('<')[0])+'" data-pfrfilter="'+sort_rrl.data('defaultmdrelat')+'" href="javascript:;">'+sort_rrl.html()+'</a></li>').find('a[data-pfrfilter]').off('click.filtpfr').on('click.filtpfr',function(e){

var $this = $(this);
var availableRelation = $this.data('pfrfilter');
var allFriendsP = $('.cardsTable.__friends_popup td');

allFriendsP.each(function(){
var __t = $(this);
var is_comma = /\,/.test(__t.data('fpoprelation')) ? 1 : 0;
var findRelation = is_comma ? __t.data('fpoprelation').split(',') : __t.data('fpoprelation');
__t.removeAttr('otr').show();

if(availableRelation == 'all')return;

if(is_comma){

for(var j = 0; j < findRelation.length; ++j){

if(availableRelation.indexOf(findRelation[j]) == -1 && !__t.attr('otr')) __t.hide();
else
__t.attr('otr',1).show();}

} else {

if(availableRelation.indexOf(findRelation) == -1 || !__t.data('fpoprelation')) __t.hide();

}


});
$('.inav_ul_li_ac').removeClass('inav_ul_li_ac');
allFrP.hide();
var norhrt = $('.tico_simb_txt');
norhrt.html($this.data('onm'));
norhrt.closest('li').addClass('inav_ul_li_ac');
});

});

// click on selected cards
$(document).off('click.slccards', '#hook_InviteCardTabHook_invSelectedTab').on('click.slccards', '#hook_InviteCardTabHook_invSelectedTab', function(e){
e.preventDefault();

var $this = $(this);
$('[data-onm="All "]').trigger('click');
$('.ifCard._ppf>div:not(.ifSelected)').closest('td').hide();

$('.inav_ul_li_ac').removeClass('inav_ul_li_ac');
$this.parent().addClass('inav_ul_li_ac');

});
$(document).off('click.allfrp','#allFriendsBtn').on('click.allfrp', '#allFriendsBtn', function(e){
var tim, _this = this;

var dropSl = $('#allFriendsPopup');
if(!this.clyo){
dropSl.show();
_this.clyo=true;
} else {
dropSl.hide();
_this.clyo=false;
}


dropSl.off('mouseover.drp mouseenter.drp').on('mouseover.drp mouseenter.drp',function(e){
clearTimeout(tim);
$(this).show();
_this.clyo=true;
});
dropSl.off('mouseout.drp mouseleave.drp').on('mouseout.drp mouseleave.drp',function(e){
var $t = $(this);
clearTimeout(tim);
tim = setTimeout(function(){
$t.hide();
_this.clyo=false;
},500);
});

});

$(document).off("click.indicrelat",".frp .ifModern").on("click.indicrelat", ".frp .ifModern", function(e){
e.preventDefault();
var _t = $(this), fid = _t.find('input[name="st.layer.selid"]').val(),
_slc_cards = $("#fpop_slc_count"),_slc_cards_val = parseInt(_slc_cards.html());
var _sel = "ifSelected";
var btn_invite = $('#hook_FormButton_button_invite');
var event_namespace = 'sv_'+new Date();

btn_invite.off('click.'+event_namespace).on('click.'+'click.'+event_namespace, function(e){
e.preventDefault();
var $this = $(this);
var sdt = {
		cmd:'saveFriendPopupRelationship',
		data: ffr_p_arr,
		type: 'pos'

	   };
$this.addClass('__noevent').val(lang.Loading_please_wait);

var send = jAjax('/profile','post',sdt);
    send.done(function(r){
	if(r != '1'){
	$this.removeClass('__noevent').val(lang.Save);
	return displayErr(lang.err_tehnic);
	} else {
	$this.val(lang.saved);
	document.getElementById('nohook_modal_close').click();
	jboxNotice(lang.relationShipToNotif,'left','bottom','#000');
	}
	

	});

});

var th_disableEnableSaveBtn = function(){

var slc_elements = $('.frp .ifSelected'), _slc_btn_ck = $("#hook_InviteCardTabHook_invSelectedTab");

if(!slc_elements.length){
btn_invite.addClass('__disabled').attr('disabled','disabled');
_slc_btn_ck.addClass('__disabled').attr('disabled','disabled');
}else{
btn_invite.removeClass('__disabled').removeAttr('disabled');
_slc_btn_ck.removeClass('__disabled').removeAttr('disabled');
}

}


if(_t.hasClass(_sel)){
_t.removeClass(_sel);
delete ffr_p_arr[fid];
_slc_cards.html(--_slc_cards_val);
$('#zburator_'+fid).remove();
$('#hook_InviteChangeCardRel_'+fid).find('.ifSelectedRelatName').remove();
} else {

if(_grl !== 'relative'){
ffr_p_arr[fid]=_grl;
_t.addClass(_sel);
_slc_cards.html(++_slc_cards_val);
} else {
var $b = $('body');
var _thpo = _t.find('div:first').offset(),
 pt = $(window).height() - (_thpo.top+20) < 185 ? _thpo.top-185 : _thpo.top+20,
 pl = _thpo.left+32;

if(!$b.find('#zburator_'+fid).length && !_t.closest('td').hasClass('_oh46'))
$b.append('<div data-zburator="true" id="zburator_'+fid+'" onmouseover="clearTimeout(this.tmo);this.style.display=\'inline\';" onmouseout="var _zbthis=this;this.tmo = setTimeout(function(){_zbthis.style.display=\'none\';},100);" style="z-index:99999;position:absolute;top:'+pt+'px;left:'+pl+'px;">'+grltfrSubktg(_t.data('ugen'))+'</div>')
.find('select option').off('click.sloptzb_'+fid).on('click.sloptzb_'+fid,function(e){
e.preventDefault();

_t.addClass(_sel);
_slc_cards.html(++_slc_cards_val);
ffr_p_arr[fid]=$(this).val();
th_disableEnableSaveBtn();
$('#hook_InviteChangeCardRel_'+fid).find('.ifChange').append('<div style="visibility: visible;position: absolute;color:#F29407;top: 34px;" class="ifSelectedRelatName">'+$(this).val()+'</div>');
$(this).closest('[data-zburator]').trigger('mouseout');
});
else
$b.find('#zburator_'+fid).show();

if(_t.closest('td').hasClass('_oh46'))
_t.addClass('__disabled');

}


}
th_disableEnableSaveBtn();

});

}

//delete user account
function deleteUserAccount(evt){
	
	evt.preventDefault();
	
	var _this = ga(evt.target);
	var uid = _this.data('uid');
	
	confirm_act(lang.delete_user_account_confirm,function(event){ 

		var send = jAjax('/cmd.php', 'post', 'cmd=deleteprofile&id='+escape(uid));
		send.done(function(data){
		
			if(data == '1'){
				
				window.location='./logout';
			} else {
								
				displayErr(lang.err_deleting_your_account);
			}
			
		});


	});
	
	
}

//private profile
function privateAccount(evt,mode){
	
	evt.preventDefault();
	
	var _this = ga(evt.target);
var mode = mode ? mode : _this.data('mode');

var privateProfileLU = function (){
	
		var send = jAjax('/cmd.php', 'post', 'cmd=privateprofile&mode='+escape(mode));
		send.done(function(data){
		
			if(data === '1') {
				
				
					_this[0].checked=  mode === 'off' ? false : true;
					
					setTimeout(function(){window.location.reload()},800);
			} else 
				displayErr(lang.err_tehnic);
			
		});	
	
};
if(mode === 'on'){
	
		confirm_act(lang.confirm_private_account,function(event){ 
		
		privateProfileLU();
		

		
		});
} else privateProfileLU();
	
}

// save privacy settings
function saveFormSettings(f,e){
	
	e.preventDefault();
	
	ajaxLoading();
	var sendForm = js_subForm(f);

	sendForm.done(function (data)
	{ 
		removeAjaxLoad();
		 
	});
	
}

// set status
function profile_add_text_status(el,evt){
	
	evt.preventDefault();
	el = ga(el);
	var cancel_markup = el.clone();
	var status_msg_loc = el.find('.status_msg_txt');
	var curr_status = status_msg_loc.html() == lang.profile_leave_status_msg ? '' : status_msg_loc.html();
	var max_status_length = 190;
	var markup = ga('<div id="new_status_msg_loading_spinner"><span class="div-loader"></span></div><section id="user_add_status_msg" style="display:none;" class="soh-s">\
	\
				  <div class="uasm_pd">\
				  <div class="textarea_profile_add_msg"><textarea id="profile_status_msg" name="dk.profile_status_message" class="dark" autocomplete="off" style="overflow: hidden; resize: none;">'+curr_status+'</textarea>\
				  <a id="profile_status_msg_emoji_btn" class="foh-s em_disc_toolbar_i_ic__sm smiles_w" href="javascript:void(0);"></a></div>\
				  <button class="button-pro __small uasm_btns" id="profile_add_status_msg">'+lang.Post+'</button>\
				  <a href="javascript:void(0);" class="uasm_btns" id="status_msg_cancel">'+lang.Cancel+'</a>\
				  <span id="new_msg_Status_err"></span></div>\
				  </section>');
	 
		
	el.replaceWith(markup);
	
	markup.find('#status_msg_cancel').off('click.cancelStatusMsg').on('click.cancelStatusMsg',function(e){
		
		ga('#user_add_status_msg').replaceWith(cancel_markup);
	});
	
	
    markup.find('#profile_add_status_msg').off('click.addStatusMsg').on('click.addStatusMsg',function(e){
		
		var new_msg_Status_err = ga('#new_msg_Status_err');
		var status_contenteditable = ga('#user_add_status_msg [contenteditable="true"]');
		var ok = true, err_msg = '';
		
		
		// check for status length
		if(  status_contenteditable.text().length > max_status_length) {
			
			ok = false;
			err_msg = lang.profile_status_msg_too_long;
			
		}
		
		if( !ok ){
			
			
			new_msg_Status_err.css('display','block').text(err_msg);
			
		} else {
			
			new_msg_Status_err.hide().empty();
			ga('#user_add_status_msg .uasm_pd').prepend('<div class="layer_ovr" style="background:rgba(239, 239, 239, 0.48)!important"></div>');
			
			ga('#profile_add_status_msg').html('<div class="div-loader"></div>');
			
			 var new_status_msg = $.trim(ga('#profile_status_msg').val()) ? ga('#profile_status_msg').val() : '';
			var send = jAjax('/cmd.php', 'post', {cmd:'user_save_profile_status',value: new_status_msg});
			send.done(function(d){
				
				if(d == 'status_err_add') {
					
					ga('#user_add_status_msg .uasm_pd').find('.layer_ovr').remove();
					ga('#profile_add_status_msg').html(lang.Post);
					new_msg_Status_err.css('display','block').text(lang.profile_add_status_msg_err);
				} else {
					
					// success
					ga('#status_msg_cancel').trigger('click.cancelStatusMsg');
					if(d != '') ga('.status_msg_txt').html(d); else ga('.status_msg_txt').text(lang.profile_leave_status_msg); //ga('.profile_add_text_post_msg_a').html(d);
				}
				
				
			});
			
		}
		
	});
	
	
	ga('#profile_status_msg').emojiarea(
	{
		wysiwyg: true,
		stickers:false,
		buttonLabel: 'Emojis',
		buttonPosition: 'after',
		button:ga('#profile_status_msg_emoji_btn')
	});
	setTimeout(function(){
	ga('#user_add_status_msg .ms_items_more_wrap').remove();
	ga('#user_add_status_msg [contenteditable="true"]').attr('data-input-length',max_status_length);
	contenteditableLength();
	ga('#new_status_msg_loading_spinner').remove();
	ga('#user_add_status_msg').fadeIn();
	},500);
 
}


function saveNotificationSettings(el,ev){
	ev.preventDefault();
	el = ga(el);
	var $nen = el.hasClass('enabled') ? "off" : "on";
	var k = el.data('notif-key');
	 var notifSettSaved = function (){
		 
		 kn_liveNotif(lang.Done,'done',1400,lang.settings_notification_saved);
		 
	 }
	 
	var user_notif_st = validateJson(_U.notif_settings);
	var send = jAjax('/cmd.php', 'post', {cmd:'savenotificationsettings','notif-st-key':k,'val':$nen});
	send.done(function(d){  
		var r = validateJson(d);
 
		if( r.msg == 'off' ){
			el.removeClass('enabled');
			el.find('._settings_ienable').removeClass('on');
			notifSettSaved();
			
			user_notif_st[r.key] = r.msg;
		} else if (r.msg == 'on'){
			
			el.addClass('enabled');
			el.find('._settings_ienable').addClass('on');
			notifSettSaved();
			user_notif_st[r.key] = r.msg;
		} else return displayErr(lang.somethingWrong);
		
	});
	
	
}
function hideBooksPgSugg(el) {
	
	if( $.trim(ga(el).val()) == '')
	{
		
				ga('#books_list').html('');
				ga('.bookspg_search_res').removeAttr('style');
	}
	
}
function hideMoviesPgSugg(el) {
	
	if( $.trim(ga(el).val()) == '')
	{
		
				ga('#movie_list').html('');
				ga('.movies-author-search-ul-while').removeAttr('style');
	}
	
}
function profileAddBooks(result) {
	
		var r = validateJson(result); 
		var book_markup = '';
		var book_not_found = '<div style="text-align:center;">'+lang.lang_book_not_found+'</div>';
		
		
		if( r.hasOwnProperty('items') ){
		
		if( r.items.length > 0 ) {
		for( var i =0; i < r.items.length;i++){
			
			
			var book = r.items[i];
			var bookInfo = book.volumeInfo;
			var poster = bookInfo.hasOwnProperty('imageLinks') ? '/bookGetPoster?p='+encodeURIComponent(bookInfo.imageLinks.smallThumbnail) : '/bookGetPoster?p=nope'; 
			var title = bookInfo.title;
			var book_about = bookInfo.hasOwnProperty('description') ? bookInfo.description : '';
			var book_about = bookInfo.hasOwnProperty('authors') ? lang.book_authors_sugg+':&nbsp;'+bookInfo.authors : '';
			var book_id = book.id;
			
			book_markup += '<li><div class="hookData __none"><!--'+JSON.stringify(book)+'--></div><a href="javascript:void(0);" data-sug-id="'+book_id+'" data-suggest-categ="'+encodeURIComponent(title)+'" onclick="userAddBook(this,event,1);" class="sc_suggestion_movie_a"><div class="sc_suggestion_cover" style="background-image:url('+poster+')"></div><div class="sc_suggestion_str"><div class="sc_suggestion_title">'+title+'</div><div class="sc_suggestion_info">'+book_about+'</div></div></a></li>';
			
			
		} 
		
		
		
		} else book_markup = book_not_found;

		} else book_markup = book_not_found;	
			
		if(ga('html').hasClass('bookspg')){
			
			if(book_markup !== book_not_found) {
				
				ga('.bookspg_search_res').css('height','240px')
				ga('#books_list').html(book_markup);
			} else {
				ga('#books_list').html('');
				ga('.bookspg_search_res').removeAttr('style');
				
			}				
				
		
			
		} else {
		
		ga('#books_list').html(book_markup);
		}
		nanoScrollStart();
		
		
}
function profileAddMovies(result){
	
		 
		
		var r = validateJson(result);
		var movies_markup = '';
		var movie_not_found = '<div style="text-align:center;">'+lang.lang_movie_not_found+'</div>';
		
		
		 
		if( r.results.length > 0 ) {
		for( var i =0; i < r.results.length;i++){
			
			
			var movie = r.results[i];
			var poster = '/movieGetPoster?p='+movie.poster_path; 
			var title = movie.original_title;
			var movie_about = movie.overview;
			var movie_id = movie.id;
			
			movies_markup += '<li><div class="hookData __none"><!--'+JSON.stringify(movie)+'--></div><a href="javascript:void(0);" data-sug-id="'+movie_id+'" data-suggest-categ="'+encodeURIComponent(title)+'" onclick="userAddMovieToWatched(this,event,1);" class="sc_suggestion_movie_a"><div class="sc_suggestion_cover" style="background-image:url('+poster+')"></div><div class="sc_suggestion_str"><div class="sc_suggestion_title">'+title+'</div><div class="sc_suggestion_info">'+movie_about+'</div></div></a></li>';
			
			
		} 
		} else movies_markup = movie_not_found;
		 
		
		
		if(ga('.movies_pg').length){
			
			if(movies_markup !== movie_not_found) {
				
				ga('.movies-author-search-ul-while').css('height','240px')
				ga('#movie_list').html(movies_markup);
			} else {
				ga('#movie_list').html('');
				ga('.movies-author-search-ul-while').removeAttr('style');
				
			}				
				
		
			
		} else {
		
		ga('#movie_list').html(movies_markup);
		}
		
		
		
		nanoScrollStart();

	
}
function bookPageSearchFor(el,evt){
	
	evt.preventDefault();
	
	var b_search = ga('#add_books_to_col_popup');
	
	if( !b_search.length) {
		
		var m = '<section id="add_books_to_col_popup"><div class="layer_ovr"></div>\
		<div class="bookspg_add_to_col_box">\
		<h3>'+lang.search_for_books+'</h3><span id="close_flying_notification_box" class="tico tico__n-t notifs_close"><i class="tico_img ic ic_close"></i></span>\
		<div class="books_pp_searc_cnt">\
		\
<div class="map_select_sugg_subcateg nano">\
				<div class="nano-content"><div class="input_serch_ic"><input type="text" class="it" rel="input_search_books" search-callback="mapBooksRes" placeholder="ex. Brothers Grimm" value="" /><i class="div-loader input-ic-loader __none"></i></div>\
				 <ul id="movie_list"></ul></div>\
	</div>\
		\
		</div>\
		</div></section>';
		
		ga('.books_pg').prepend(m);
		
	}
	
}
/*
ga(document).off('mouseover.profilePage').on('mouseover.profilePage','#profile_change_main_photo',
function(e){
	
	if(ga('#_wall_itsme').length){
	var el = ga('#profile_change_main_photo');
			  el.jBox('Tooltip', {
				    id: 'u_update_profile_image_tooltip',
				    position: {x: 'center', y: 'bottom'},
					content: '<a href="/profile?cmd=change-profile-photo" onclick="selectProfilePhoto(event,this);" class="u-menu_a"><i class="ico-profile-change-photo icofont icofont-edit">&#xefe2;</i>'+lang.change_profile_photo+'</span></a>',
					closeOnMouseleave: true,

	});
	
	}
	
	
	});*/