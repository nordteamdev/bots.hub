	
function _jj(a){
	
	return ga('#submit_search').find(a);
}	

// build search query
function _filter(mode){
	
	var _s_query = {},
	_a_filter_btn = ga('#trigger_filter_query'),
	_sf_gender = _jj('[name="gender"]'),
	_sf_fromage = _jj('[name="fromage"]'),
	_sg_toage = _jj('[name="toage"]'),
	_sg_allc = _jj('[name="allc"]'),
	_sg_location = _jj('[name="location"]');

	
	
	if( s_escape(_sf_gender) )
		_s_query['gender'] = s_escape(_sf_gender);
	
	if( s_escape(_sf_fromage) )
		_s_query['fromage'] = s_escape(_sf_fromage);	
	
	if( s_escape(_sg_toage) )
		_s_query['toage'] = s_escape(_sg_toage);
	 
	if( $.trim(_sg_location.val())  )
		_s_query['location'] = $.trim(_sg_location.val());
	
 
	
	if( s_escape(_sg_allc) ){
		//delete _s_query['location'];
		_s_query['allc'] = s_escape(_sg_allc);
	}
 
	_a_filter_btn.removeClass('reloadwall').addClass('reloadwall').removeAttr('href').attr('href','/online?'+$.param(_s_query)).trigger('click');
}


	// from age
	ga(document).off('selectmenuchange.ofromage').on( "selectmenuchange.ofromage", '#o_field_fromage', function( ev, ui ) {
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_fromage = ga('[name="fromage"]'), _field_toage = ga('#o_field_toage'), _toage_ui_menu = _field_toage.prop('selectedIndex', 0), _condition = 0, _val = $.trim(ui.item.value);
		_search_filter_fromage.val( _val );
		_filter('fromage');	
		
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
	ga(document).off('selectmenuchange.otoage').on( "selectmenuchange.otoage", '#o_field_toage', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_toage = ga('[name="toage"]'), _field_fromage = ga('#o_field_fromage'), _condition = 0, _val = $.trim(ui.item.value);
		_search_filter_toage.val( _val );
		_filter('toage');
		
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
	// filter gender
	ga(document).off('click._oFilterGender').on('click._oFilterGender', '[data-o-filter-gender]', function(e){
		e.preventDefault();
		e.stopPropagation();
			
		
		
		var $this = ga(this), _form_val = '';
		///if($this.hasClass('__active')) return;
		
		switch($this.data('o-filter-gender')){
			
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
		
		ga('.v2_gs_filter_list.__gender .__active').removeClass('__active');
		$this.addClass('__active');
		ga('[name="gender"]').val($.trim(_form_val));
		_filter('gender');
	});
		function _fo_rmactive($el){
		
		$el.closest('ul').find('.__active').removeClass('__active');
	}
	// all countries
	ga(document).off('click._ofAllCountries').on('click._ofAllCountries', '[data-o-allc]', function(e){
		e.preventDefault();
		var $this = ga(this);
		
		if(!$this.hasClass('__active')){
		_fo_rmactive($this);
		$this.addClass('__active');
		ga('#field_location_int').attr('disabled',true);
		 
		ga('[name="location"]').val('');
		ga('[name="allc"]').val(1);
		_filter('allc');
		}
	});

	/*
	// search by location
	_d.off('click.focustomPlace').on('click.focustomPlace', '#customPlaceItemSpan', function(e){
		e.preventDefault();

		var $this = ga(this);
		
		if($this.hasClass('__active')){
		_fo_rmactive($this);
		$this.addClass('__active');
		ga('#field_country_int,#field_city_int').selectmenu( "enable" );
		
		 $('#field_country_int').on( "selectmenuchange", function( ev, ui ) { 
		 ev.preventDefault();
		 var gStates = validateJson(__glb_states), _s_cities = ga('#field_city_int');
		 
		 ga('[name="country"]').val(ui.item.value);
		 
		 _s_cities.empty();
		 for(var i =0; i < gStates[ui.item.value].length; i++)
			 _s_cities.append( ( i == 0 ? '<option value="" selected>'+lang.choose_a_city+'</option>' : '') + '<option value="'+gStates[ui.item.value][i].id+'">'+gStates[ui.item.value][i].name+'</option>');
			 
			 
		 
		 _s_cities.selectmenu('refresh');

		 _filter('country');
		 } );



		} else {
		//_s_rmactive($this);
		$this.removeClass('__active');
		ga('#field_country_int,#field_city_int').attr('disabled','disabled');
		}
		
	});
	*/
	
	// search by location
	_d.off('blur.filterLocation').on( "blur.filterLocation", '#field_location_int', function( ev, ui ) { 
	
	setTimeout(function(){
	ga('[name="location"]').val(ga('#location_id').val());
	},100);
	
	setTimeout(function(){
	_filter('location');
	},500);
	});