//setup before functions
var srch_typingTimer;                //timer identifier
var srch_doneTypingInterval = 500;  //time in ms, 5 second for example
var _fromagevalue, _toagevalue;
var sugg_li_html = '';

	var tophead_search_addfriend_btn = '<div style="display:%add_friend" class=" add-friend-topsearch-sug _72gdz _73dsgg"><span class="_e616g"><button class="_aj7mu _2hpcs _95tat _o0442">'+lang.add+'</button></span></div>';
	var tophead_search_friend_btn = '<div style="display:%is_friend" class="add-friend-topsearch-sug _72gdz _73dsgg"><span class="_e616g"><button class="_aj7mu isfriend _2hpcs _95tat _o0442">'+lang.friends+'</button></span></div>';
	var tophead_search_sugg_markup = '<div onclick="topsearch_Ovr(this,1);" class="search_sugg_markup"><a href="/search?key=%key" id="search-top-head-direct" hrefattr="true"><div class="search_all_sugg_btn ellip">'+lang.Search+' <span id="tophead_search_suggkey">%key</span></div></a><ul></ul></div>';
	var tphead_search_sugg_li = '<li><a class="tophead_sugg" onclick="toSearchHistory(event,\'%uid\');" href="/user/%uid" hrefattr="true"><div class="sug_us_photo"><img src="/getPhoto?p=%photo&sz=small&g=%gender">%online</div><div class="sug_us_inf"><div class="sug_us_name ellip">%uname</div><div class="sug_us_dt ellip">%details</div></div>'+tophead_search_friend_btn+tophead_search_addfriend_btn+'</a></li>';


// add|remove overlay when search input is active
function topsearch_Ovr($el,m){
	
	var $body = ga('body');
	if(m){
		
		//remove
		if($body.find('.top_search_ovr').length){
			$body.find('.top_search_ovr,.search_sugg_markup').remove();
			if($el) ga($el).removeClass('__focus');
		}
		
		
	} else {
		
		// add
		if(!$body.find('.top_search_ovr').length){
			ga('.toolbar').removeClass('__opac');
			$body.prepend('<div class="top_search_ovr"></div>').find('.top_search_ovr').on('click', function(e){ e.preventDefault();e.stopPropagation();topsearch_Ovr($el,1); });
		}
		
	}
	
}

function recentSearches($el){
	
	if($el.parent().find('.search_sugg_markup').hasClass('recent-search-visible')) return;
	
	// get search history
	//var send = jAjax('/cmd.php', 'post', 'cmd=getSearchHistory');
	
	//send.done(function(data){
		 
 
		var r = validateJson(search_history);
		
			var pr_sugg_tophd = $el.parent().find('.search_sugg_markup');
			
			pr_sugg_tophd.remove();
				$el.parent().append(tophead_search_sugg_markup.replace(/%key/g, ''));
				$el.parent().find('.search_sugg_markup').addClass('recent-search-visible');
				pr_sugg_tophd = $el.parent().find('.search_sugg_markup');
				var sugg_li_apto = pr_sugg_tophd.find('ul');
				
		if(r.length){
			var d = r;
			sugg_li_html = '';
			for(var i=0;i<d.length;i++){
				var x = d[i]; 
				sugg_li_html += tphead_search_sugg_li
													 .replace(/%is_friend/g, 'none')
													 .replace(/%add_friend/g, 'none')
													 .replace(/%uid/g, x.id)
													 .replace(/%photo/g, x.uphoto)
													 .replace(/%gender/g, x.gender)
													 .replace(/%uname/g, x.fullname)
													 .replace(/%online/g, x.online ? '<span class="ic-online"></span>' : '')
													 .replace(/%details/g, x.yearsold +' '+lang.yearsold+',&nbsp;'+ x.location);
													 
			}
			
			sugg_li_apto.html(sugg_li_html);
			
		} else {
			

			$el.parent().find('.search_sugg_markup').remove();
		
		}
		
	///});
	
}
function r_tophead_search($el){
	recentSearches($el);
	if(!$el.hasClass('__focus')){
		

		
		$el.addClass('__focus').off('keyup.search').on('keyup.search', function(e){
			e.preventDefault();
			clearTimeout(srch_typingTimer);
			var $this = ga(this), top_header_search_btn = ga('#topheader_search_a');
			srch_typingTimer = setTimeout(function(){srch_doneTyping($this,e);}, srch_doneTypingInterval);
			top_header_search_btn.removeAttr('href').attr('href','/search?key='+$.trim($this.find('input:first').val()));
			up_href();
			if(e.keyCode == 13) ga('#topheader_search_a').trigger('click.submitSearch');
		});
		
		$el.off('keydown.search').on('keydown.search', function(e){
			clearTimeout(srch_typingTimer);
		});
		ga('#topheader_search_a').off('click.submitSearch').on('click.submitSearch', function(e){
			e.preventDefault();
			//e.stopPropagation();
			//topsearch_Ovr($el,1);
		ga('.top_search_ovr').trigger('click');
		ga('._tophead_search').off('keyup.search keydown.search').blur();
			setTimeout(function(){ga(this).trigger('click');},100);
		});
		topsearch_Ovr($el);
	}
	
	
}

_d.off('click.tpSearch').on('click.tpSearch', '.toolbar_search .it_w', function(e){
	e.preventDefault();
	e.stopPropagation();
 
	return r_tophead_search(ga(this));
});

// close search by ESC key
ga(document).off('keyup.closeSearchSuggestions').on('keyup.closeSearchSuggestions', function(e){

	if(e.keyCode == 27){
		closeSearchSuggestionsFromDOM();
	}
});

ga(document).off('click.closeSearchSuggestionsDOM').on('click.closeSearchSuggestionsDOM', function(e){

	closeSearchSuggestionsFromDOM();
}); 
function closeSearchSuggestionsFromDOM(){
	
		ga('.top_search_ovr').trigger('click');
		ga('._tophead_search').off('keyup.search keydown.search').blur();
		ga('.search_sugg_markup').remove();
}
 


//user is "finished typing," do something
function srch_doneTyping ($el,e) {
var k = $.trim($el.find('input').val());
		sugg_li_html = '';
		if(!k && e.keyCode != 27)return recentSearches($el);
if(k){
	$el.find('.glyphicon-search:not(.bb)').hide();
	$el.find('.topheader_submit_search_btn').show();
	$el.find('.ic_close').off('click.emptySearchInput').on('click.emptySearchInput',function(e){
		
		var tophe_srch_inp =  $el.find('input:first');
		ga('.search_sugg_markup').remove();
		tophe_srch_inp.val(''); 
		tophe_srch_inp.trigger('keyup.search');

		}).show();
			var pr_sugg_tophd = $el.parent().find('.search_sugg_markup');
			
			if(!pr_sugg_tophd.length)
				$el.parent().append(tophead_search_sugg_markup.replace(/%key/g, k));
			
			
				pr_sugg_tophd = $el.parent().find('.search_sugg_markup');
				ga('#tophead_search_suggkey').html(k);
				ga('#search-top-head-direct').attr('href','/search?key='+k);

	var send = jAjax('/cmd.php','post','cmd=tophead_search_sugg&key='+k);
	
	send.done(function(data){
	 

		var r = validateJson(data);
		

				var sugg_li_apto = pr_sugg_tophd.find('ul');
				
		if(r.length){
			var d = r;
			for(var i=0;i<d.length;i++){
				var x = d[i];console.log(x);
				sugg_li_html += tphead_search_sugg_li
													 .replace(/%is_friend/g, x.is_friend ? '' : 'none')
													 .replace(/%add_friend/g, x.is_friend ? 'none' : '')
													 .replace(/%uid/g, x.id)
													 .replace(/%photo/g, x.uphoto)
													 .replace(/%gender/g, x.gender)
													 .replace(/%uname/g, x.fullname)
													 .replace(/%online/g, x.online > r.on_int ? '<span class="ic-online"></span>' : '')
													 .replace(/%details/g, x.yearsold +' '+lang.yearsold+',&nbsp;'+ x.location);
													 
			}
			
			sugg_li_apto.html(sugg_li_html);
			
		} else {
			

			$el.parent().find('.search_sugg_markup').remove();
		
		}
		
		
	});
	
} else {
			$el.find('.topheader_submit_search_btn').hide();
			$el.find('.glyphicon-search:not(.bb)').show();
			$el.find('.ic_close').off('click.emptySearchInput').hide();
			
}



}


function searchRightFilter(){
	
	
	var _s_rmactive = function($el){
		
		$el.closest('ul').find('.__active').removeClass('__active');
	};
	
	// search by location
	_d.off('click.customPlace').on('click.customPlace', '#customPlaceItemSpan', function(e){
		e.preventDefault();

		var $this = $(this);
		
		if(!$this.hasClass('__active')){
		_s_rmactive($this);
		$this.addClass('__active');
		////$('#field_country_int,#field_city_int').selectmenu( "enable" );
		/*
		 $('#field_country_int').on( "selectmenuchange", function( ev, ui ) { 
		 ev.preventDefault();
		 var gStates = validateJson(__glb_states), _s_cities = $('#field_city_int');
		 
		 $('[name="country"]').val(ui.item.value);
		 
		 _s_cities.empty();
		 for(var i =0; i < gStates[ui.item.value].length; i++)
			 _s_cities.append( ( i == 0 ? '<option value="" selected>'+lang.choose_a_city+'</option>' : '') + '<option value="'+gStates[ui.item.value][i].id+'">'+gStates[ui.item.value][i].name+'</option>');
			 
			 
		 
		 _s_cities.selectmenu('refresh');

		 _sQuery('country');
		 } );
		 */

ga('#field_location_int').removeAttr('disabled').removeClass('__disabled').on('blur',function(e){
	var _this = ga(this);
	setTimeout(function(){ 
	ga('[name="location"]').val( encodeURIComponent(ga('[name="location_name"]').val()) );
 ga('[name="s_location_id"]').val( ga('#location_id').val() );
	},100);
		setTimeout(function(){ 
	 
	_sQuery('location');
	},300);
});

		} else {
		//_s_rmactive($this);
		$this.removeClass('__active');
		ga('#field_location_int').attr('disabled','disabled');
		}
		
	});
	
 
	
	// location dosen't matter
	_d.off('click.searchLocationDosenMatter').on('click.searchLocationDosenMatter', '#locationDoesntMatterSpan', function(e){
		e.preventDefault();
		var $this = $(this);
		
		if(!$this.hasClass('__active')){
		_s_rmactive($this);
		$this.addClass('__active');
		$('#field_location_int').attr('disabled',true).addClass('__disabled');
		$('[name="location_name"]').val('');
		_sQuery('anylocation');
		}
		
	});
	
	// filter gender
	_d.off('click._searchFilterGender').on('click._searchFilterGender', '[data-search-filter-gender]', function(e){
		e.preventDefault();
		var $this = $(this), _form_val = '';
		if($this.hasClass('__active')) return;
		switch($this.data('search-filter-gender')){
			
			default:
			case 'any':
			_form_val = '';
			break;
			case 'male':
			_form_val = '1';
			break;
			case 'female':
			_form_val = '2';
			break;
			
		}
		$('.v2_gs_filter_list.__gender .__active').removeClass('__active');
		$this.addClass('__active');
		$('[name="gender"]').val($.trim(_form_val));
		_sQuery('gender');
	});
	
	
	// from age
	_d.off('selectmenuchange.fromage').on( "selectmenuchange.fromage", '#field_fromage', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_fromage = $('[name="fromage"]'), _field_toage = $('#field_toage'), _toage_ui_menu = _field_toage.prop('selectedIndex', 0), _condition = 0, _val = $.trim(ui.item.value);
		_search_filter_fromage.val( _val );
		_sQuery('fromage');	
		
			_val > 0 ? _fromagevalue = _val : _fromagevalue = false; 
			!_val || _val === '' ? _val = 15 : _val = _val;
			
			_field_toage.empty();
			for(var i = parseInt(_val)+1; i < 82; i++){
				if(_condition === 0) _field_toage.append('<option '+( !_toagevalue ? 'selected="selected"' : '' )+' value="">'+lang.to+'</option>');
				_field_toage.append('<option '+( _toagevalue && i == _toagevalue ? 'selected="selected"' : '' )+' value="'+i+'">'+lang.to+' '+i+'</option>');
				++_condition;
			}
			
			_field_toage.selectmenu('refresh');
			
	});
	
	// to age
	_d.off('selectmenuchange.toage').on( "selectmenuchange.toage", '#field_toage', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_toage = $('[name="toage"]'), _field_fromage = $('#field_fromage'), _condition = 0, _val = $.trim(ui.item.value);
		_search_filter_toage.val( _val );
		_sQuery('toage');
		
			_val > 0 ? _toagevalue = _val : _toagevalue = false; 
			!_val || _val === '' ? _val = 81 : _val = _val;
		
			_field_fromage.empty();
			for(var i = 15; i < parseInt(_val); i++){
				if(_condition === 0) _field_fromage.append('<option '+( !_fromagevalue ? 'selected="selected"' : '' )+' value="">'+lang.from+'</option>');
				_field_fromage.append('<option '+( _fromagevalue && i == _fromagevalue ? 'selected="selected"' : '' )+' value="'+i+'">'+lang.from+' '+i+'</option>');
				++_condition;
			}
			
			_field_fromage.selectmenu('refresh');
			
			
	});
	
	// checkbox online
	_d.off('click.check_online').on('click.check_online', '#field_onSite', function(e){
		
		var _search_filter_onnow = $('[name="online.now"]');
		
		if(!$.trim(_search_filter_onnow.val()))
			_search_filter_onnow.val(1);
		else
			_search_filter_onnow.val('');
		
		_sQuery('online');
	});
	
	// checkbox with photo
	_d.off('click.with_photo').on('click.with_photo', '#field_withPhoto', function(e){
		
		var _search_filter_wphoto = $('[name="with.photo"]');
		
		if(!$.trim(_search_filter_wphoto.val()))
			_search_filter_wphoto.val(1);
		else
			_search_filter_wphoto.val('');
		
		_sQuery('withphoto');
	});
	
	// checkbox relationship
	_d.off('click.relationship').on('click.relationship', '#field_single', function(e){
		
		
		var _search_filter_relationship = $('[name="relationship"]');
		
		if(!$.trim(_search_filter_relationship.val()))
			_search_filter_relationship.val(1);
		else
			_search_filter_relationship.val('');
		
		_sQuery('relationship');
	});
	
	// toogle to date birthday
	_d.off('click.relationship').on('click.relationship', '.age_filter_toggler', function(e){
		e.preventDefault();
		var $this = $(this), _custom_birthday = $('#customBirthday'), _custom_age = $('#customAge');
		
		if(!$this.hasClass('__activee')){
			
		$(this).addClass('__activee').text(lang.search_by_age);
		_custom_birthday.removeClass('__by-date-i');
		_custom_age.addClass('__by-date-i');
		
		$('[name="fromage"],[name="toage"]').val('');
		$('#field_fromage,#field_toage').selectmenu('refresh');
		} else {
			
		$(this).removeClass('__activee').text(lang.search_by_birthday);
		_custom_birthday.addClass('__by-date-i');
		_custom_age.removeClass('__by-date-i');	
		$('[name="bday"],[name="bmonth"],[name="byear"]').val('');
		$('#field_bthday,#field_bthmonth,#field_bthyear').selectmenu('refresh');
		}
		
	});
	
	
	// bday change
	_d.off('selectmenuchange.bday').on( "selectmenuchange.bday", '#field_bthday', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_toage = $('[name="bday"]'), _val = $.trim(ui.item.value);
		_search_filter_toage.val( _val );
		_sQuery('bday');
	});
	
	// bmonth change
	_d.off('selectmenuchange.bmonth').on( "selectmenuchange.bmonth", '#field_bthmonth', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_toage = $('[name="bmonth"]'), _val = $.trim(ui.item.value);
		_search_filter_toage.val( _val );
		_sQuery('bmonth');
	});
	
	// bmyear change
	_d.off('selectmenuchange.byear').on( "selectmenuchange.byear", '#field_bthyear', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_toage = $('[name="byear"]'), _val = $.trim(ui.item.value);
		_search_filter_toage.val( _val );
		_sQuery('byear');
	});

}

// insert into search history
function toSearchHistory(evt,uid){
	
	var _this = ga(evt.target);
	closeSearchSuggestionsFromDOM();
	if(uid || uid > 0 || uid !== _U.i){
	
	jAjax('/cmd.php','post','cmd=toSearchHistory&uid='+escape(uid));
		
	
	}
	
	
}

function _jj(a){
	
	return $('#submit_search').find(a);
}
function s_escape(b){
	
	return isNumeric(b.val()) ? $.trim(b.val()) : '';
	
}
// build search query
function _sQuery(mode){
	
	var _s_query = {},
	_a_key = $.trim($('#query_usersearch').val()),
	_a_search_btn = $('#trigger_search_query'),
	_sf_gender = _jj('[name="gender"]'),
	_sf_fromage = _jj('[name="fromage"]'),
	_sg_toage = _jj('[name="toage"]'),
	_sg_bday = _jj('[name="bday"]'),
	_sg_bmonth = _jj('[name="bmonth"]'),
	_sg_byear = _jj('[name="byear"]'),
	_sg_location = _jj('[name="location"]'),
 
	_sg_online_now = _jj('[name="online.now"]'),
	_sg_with_photo = _jj('[name="with.photo"]'),
	_sg_relationship = _jj('[name="relationship"]');

	_s_query['filterbox'] = 1;
	
	if(_a_key)
	    _s_query['key'] = _a_key;
	
	if( s_escape(_sf_gender) )
		_s_query['gender'] = s_escape(_sf_gender);
	
	if( s_escape(_sf_fromage) )
		_s_query['fromage'] = s_escape(_sf_fromage);	
	
	if( s_escape(_sg_toage) )
		_s_query['toage'] = s_escape(_sg_toage);
	
	if( s_escape(_sg_bday) )
		_s_query['bday'] = s_escape(_sg_bday);
	
	if( s_escape(_sg_bmonth) )
		_s_query['bmonth'] = s_escape(_sg_bmonth);
	
	if( s_escape(_sg_byear) )
		_s_query['byear'] = s_escape(_sg_byear);
	
	if( $.trim(_sg_location.val()) ){
		
		_s_query['location'] = (_sg_location.val());
	
	}
	
	if( s_escape(_sg_online_now) )
		_s_query['online'] = s_escape(_sg_online_now);
	
	if( s_escape(_sg_with_photo) )
		_s_query['withphoto'] = s_escape(_sg_with_photo);
	
	if( s_escape(_sg_relationship) )
		_s_query['relationship'] = s_escape(_sg_relationship);
 
	$('#gs_result_list').addClass('__searching');
	 
	_a_search_btn.removeClass('reloadwall').addClass('reloadwall').removeAttr('href').attr('href','/search?'+$.param(_s_query)).trigger('click');
}

