	function place_markup(in_community){

		return 		   '<li onclick=\'return '+ (in_community ? 'saveLocationForClub(event,this)' : 'saveLocation(event,this)') +';\' data-coordsmp="%lt,%ln" data-lklngname="%display_name" class="suggest_li search-tip %active" id="gpf_PlaceSearch_%osm_id">\
						<div class="hookData"><!--{"pl-i":"%osm_id","pl-n":"%fname","pl-type":"%type","display_name":"%display_name","county":"%county","country":"%country","city":"%city","road":"%road","house_num":"%house_number","pl-lt":"%lt","pl-ln":"%ln"}--></div>\
						<div class="ucard">\
						<div class="ucard_img">\
						<div class="ucard_img_a">\
						<div title="%type" class="stub-img__48 stub-place stub-place-%place_amenity"></div>\
						</div>\
						</div>\
						<div class="ucard_info">\
						<div class="ucard_info_name ellip" title="%fname">%fname</div>\
						<div class="ucard_add-info_i ellip" title="%type">%type</div>\
						<div class="ucard_add-info_i ellip dd_name-ff" title="%display_name">%country_code %city %road %house_number</div>\
						</div></div>\
						</li>';
	}
function gLocation(ev,obj){
	ev.preventDefault();
	
	var $obj = ga(obj);
	

	
	
	var map_inited = false;
	var in_community = $obj.closest('#community_add_post');
	var community_popup = $obj.closest('#community_add_location');
	var add_map_to = community_popup.length ? community_popup : (in_community.length ? $obj.closest('#community_add_post') : ga('#main_ff_share'));
	var lf_map_i = add_map_to.find('#lf_map_i');
	
	

	if(!lf_map_i.length){
		add_map_to = community_popup.length ? community_popup.find('#new_comm_location') : add_map_to.find('#posting_form_text_field-w');
		
		
		
		
	if(community_popup.length) add_map_to.show();
	
	add_map_to.append('<section id="lf_map_i"><div class="map_loading"><div class="map_load_ic tico_img"></div></div><div id="lf_map_findbox"></div><div id="lf_map_cnt" class="lf_map_cnt"></div></section>');
	lf_map_i = add_map_to.find('#lf_map_i');
	} else {
		$obj.addClass('map_created');
		lf_map_i.show();
		map_inited=true;
	}
		
		
	ga('#post_btmm_btnss').children().each(function(){
	ga(this).addClass('__disabled');
	
	});
$obj.removeClass('__disabled').addClass('active').removeAttr('onclick');
if($obj.hasClass('active'))
	$obj.off('click.mapControl').on('click.mapControl',function(e){
		var $this = ga(this);
		e.preventDefault();
		
		ga('#post_btmm_btnss').children().each(function(){

			ga(this).removeClass('__disabled active');
	
		});
		$this.off('click.mapControl').on('click.mapControl',function(e){gLocation(e,this);});
	
		lf_map_i.hide();
	});
	if($obj.hasClass('map_created')) return;
	//if(map_inited)return;
	
	var search_plugin_init,location_found;
	var map = new L.Map('lf_map_cnt', {zoom: 17}).whenReady(function(){ga('.map_loading').remove()});
	map.addLayer(new L.TileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
		{
		maxZoom: 18,

		id: 'mapbox.streets'	
		}
	
	));	//base layer
		var markersLayer = new L.LayerGroup();	//layer contain searched elements

	var marker;

	var lcm = map.locate({ setView: true, maxZoom:13, enableHighAccuracy:true }).on('locationfound', function(e){
		
	marker = new L.marker([e.latitude, e.longitude]).bindPopup(lang.map_you_are_here);
		map.addLayer(marker);
		location_found = true;
search_plugin_init();
	}).on('locationerror', function(e){
	
			marker = new L.marker([44.4361414, 26.1027443]);
		map.addLayer(marker);
		location_found=false;
	 search_plugin_init();
	
	});
	
	
	
	/*
Find trees 100m around a given location:

  [out:json];
  node
  (around:100.0,lat,lon)
  ["natural"="tree"];
  out;
*/
var happyLittleTree = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Emojione_1F333.svg/32px-Emojione_1F333.svg.png',
    iconSize: [32, 32]
});
	
	map.on('click', function(e){
	var url = 'https://overpass-api.de/api/interpreter?data='+
	
		///decodeURIComponent('[out:json];node[~"^(amenity)$"~"(college|kindergarten|bus_station|clinic|hospital|library|public_bookcase|school|music_school|driving_school|veterinary|arts_centre|brothel|universitybar|cafe|biergarten|pub|car_rental|car_sharing|car_wash|dentist|dentist|pharmacy|doctors|bank|fuel|cinema|community_centre|gambling|studio|swingerclub|marketplace|toilets|photo_booth|animal_boarding|ice_cream|restaurant|fast_food|brothel|stripclub|swingerclub|casino|theatre|nightclub|planetarium|gym|post_office|register_office|sauna)"](around:200.0,'+e.latlng.lat+','+e.latlng.lng+');out;');
'[out:json];(node[~"^(tourism)$"~"."](around:100.0,'+e.latlng.lat+','+e.latlng.lng+');node[aeroway="aerodrome"](around:100.0,'+e.latlng.lat+','+e.latlng.lng+');node[place="city"](around:100.0,'+e.latlng.lat+','+e.latlng.lng+');node[~"^(shop)$"~"."](around:100.0,'+e.latlng.lat+','+e.latlng.lng+');node["leisure"~"adult_gaming_centre|amusement_arcade|beach_resort|bandstand|bird_hide|dance|dog_park|firepit|fishing|garden|golf_course|hackerspace|ice_rink|marina|miniature_golf|nature_reserve|park|pitch|playground|slipway|sports_centre|stadium|summer_camp|swimming_pool|swimming_area|track|water_park|wildlife_hide"](around:100.0,'+e.latlng.lat+','+e.latlng.lng+');node["amenity"~"place_of_worship|college|kindergarten|bus_station|clinic|hospital|library|public_bookcase|school|music_school|driving_school|veterinary|arts_centre|brothel|universitybar|cafe|biergarten|pub|car_rental|car_sharing|car_wash|dentist|dentist|pharmacy|doctors|bank|fuel|cinema|community_centre|gambling|studio|swingerclub|marketplace|toilets|photo_booth|animal_boarding|ice_cream|restaurant|fast_food|brothel|stripclub|swingerclub|casino|theatre|nightclub|planetarium|gym|post_office|register_office|sauna"](around:100.0,'+e.latlng.lat+','+e.latlng.lng+'););out;';
///'[out:json];node[~"^(amenity|shop|leisure|highway)$"~"."](around:100.0,'+e.latlng.lat+','+e.latlng.lng+');out;';

///'[out:json];node(around:50.0,'+e.latlng.lat+','+e.latlng.lng+');out;';

	$.get(url, function(data) {
    if(data.hasOwnProperty("elements")){
		if(!ga('#lf_map_cnt #found_locations').length)
			ga('#lf_map_cnt').prepend('<div id="found_locations" class="pmap_placeFoundCount"><span id="gpf_PlaceCount">0</span></div>');
		
		var pl_icons = [];
		ga('.search-tooltip').empty();
		ga('.pmap_placeFoundCount #gpf_PlaceCount').html('0');
    	if(data.elements.length > 0) {
			ga('.pmap_placeFoundCount #gpf_PlaceCount').html(data.elements.length);
			if(!ga('.search-tooltip').is(':visible'))ga('.search-tooltip').show();
			
      	for(var i in data.elements){
        	///new L.marker([data.elements[i].lat, data.elements[i].lon], {icon: happyLittleTree}).addTo(map);
			
			if(typeof data.elements[i] == 'undefined' || typeof data.elements[i] == 'function') return;
			var query = data.elements[i].lat.toString() + ',' + data.elements[i].lon.toString();
			var place_ic = typeof data.elements[i].tags.amenity != 'undefined' ? data.elements[i].tags.amenity : (typeof data.elements[i].tags.shop != 'undefined' ? data.elements[i].tags.shop : (typeof data.elements[i].tags.leisure != 'undefined' ? data.elements[i].tags.leisure : '') );
			pl_icons[data.elements[i].id] = place_ic;
			//$.ajaxSetup({async: false});
		
			
		
			
		
			var send = jAjax('https://nominatim.openstreetmap.org/search',
			'get',{'format':'json','addressdetails':1,'accept-language':__g_lang,'extratags':1,'namedetails':1,'q':query});
			
			send.done(function(d){
			
							var type = typeof d[0].type !== 'undefined' && d[0].type.length ? d[0].type : 0;
							
							if(type && type === 'yes'){ga('.pmap_placeFoundCount #gpf_PlaceCount').html(parseInt(ga('.pmap_placeFoundCount #gpf_PlaceCount').html())-1); return;}
							
							
							var place_id = typeof d[0].placeid !== 'undefined' && d[0].placeid.length ? d[0].placeid : 0;
							var q = typeof d[0].namedetails.name !== 'undefined' && d[0].namedetails.name.length ? d[0].namedetails.name : d[0].display_name;
							var road = typeof d[0].address.road !== 'undefined' && d[0].address.road.length ? d[0].address.road : '';
							var display_name = typeof d[0].display_name !== 'undefined' && d[0].display_name.length ? d[0].display_name : '';
							var city = typeof d[0].address.city !== 'undefined' && d[0].address.city.length ? d[0].address.city+',' : '';
							var house_number = typeof d[0].address.house_number !== 'undefined' && d[0].address.house_number.length ? d[0].address.house_number+',' : '';
							var country = typeof d[0].address.country !== 'undefined' && d[0].address.country.length ? d[0].address.country : '';
							var county = typeof d[0].address.county !== 'undefined' && d[0].address.county.length ? d[0].address.county : '';
							var country_code = typeof d[0].address.country_code !== 'undefined' && d[0].address.country_code.length ? d[0].address.country_code.toUpperCase() : '';
							var p_markup = place_markup(community_popup.length).replace(/%active/g, '')
														.replace(/%osm_id/g, d[0].osm_id)
														.replace(/%fname/g,q)
														.replace(/%type/g, d[0].type)
														.replace(/%place_amenity/g, pl_icons[d[0].osm_id])
														.replace(/%road/g,road)
														.replace(/%city/g,city + (road != '' ? ',' : ''))
														.replace(/%lt/g, d[0].lat)
														.replace(/%ln/g, d[0].lon)
														.replace(/%display_name/g,display_name)
														.replace(/%house_number/g,house_number)
														.replace(/%country_code/g, country_code + (city != '' ? ',' : ''))
														.replace(/%country/g,country)
														.replace(/%county/g,county);
								

							ga('.search-tooltip').append(p_markup).find('#gpf_PlaceSearch_'+d[0].osm_id).off('mouseover').on('mouseover',function(e){
			


							ga(".search-tip.__active").removeClass('__active');
							ga(this).addClass('__active');
					///_this._input.setAttribute('where',dn);
					var dtltng = $(this).data('coordsmp').split(',');
					var ll = [dtltng[0],dtltng[1]]; 

					e.preventDefault();

				map.setView(ll,17,{animation:true});
				marker.setLatLng(ll);  //show circle/marker in location found
		
			marker.bindPopup(ga(this).data('lklngname'));
		});

							if(type == 'village')
								ga('#gpf_PlaceSearch_'+d[0].osm_id).find('.dd_name-ff').text(county + ', ' + country);
			});
					
		}	
        
      }
    }
  });
	marker.setLatLng(e.latlng).unbindPopup();
});


	
	search_plugin_init = function(){
		
		
			map.addControl( new L.Control.Search({
			container: 'lf_map_findbox',
			//layer: markersLayer,
			initial: true,
			collapsed: false,
			marker: marker,
			url: 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language='+__g_lang+'&extratags=1&namedetails=1&q={s}',
			jsonpParam: 'json_callback',
			propertyName: 'display_name',
			propertyLoc: ['lat','lon'],
			circleLocation: false,
			markerLocation: true,			
			autoType: false,autoResize: false,
			autoCollapse: false,
			minLength: 0,
			zoom:17,
			casesesitive: false,
			history:true,
			textErr: lang.map_location_not_found,	//error message
			textCancel: lang.Cancel,		//title in cancel button		
			textPlaceholder: lang.Search+'...'//placeholder value
		}) );
		
	
	}


		ga('.leaflet-control-attribution.leaflet-control').remove();
}

function saveLocationForClub(ev,el){
	

	ev.preventDefault();

	var $el = ga(el);
	var pp_place = objHook($el.find('.hookData').html()), pp_place_n = $el.find('.hookData').html();
	
	ga('#community_location_v').val('yes');
	ga('#community_location_lat').val(pp_place['pl-lt']);
	ga('#community_location_lon').val(pp_place['pl-ln']);
	
	
	ga('#community_location_data').val(pp_place_n.toString());

	
	ga('.community_location_name_selected').text(pp_place['display_name']);
	
	
	
	ga('.suggest_li.search-tip.__selected').removeClass('__selected');
	$el.addClass('__selected');
	
}

// save location
function saveLocation(ev,el){
	
	ev.preventDefault();

	var $el = $(el);
	var pp_place = objHook($el.find('.hookData').html());
	
	ajaxLoading();
	var r_place_id = ga('.tagged_people_loc .li_place').length ? ga('.tagged_people_loc .li_place').attr('id').match(/\d/g).join('') : '';
	var data = {cmd:'checkin',data:pp_place, placeid:pp_place['pl-i'],place_type:pp_place['pl-type'],delete_id:r_place_id};
	var send = jAjax('/cmd.php', 'post', data);
	send.done(function(a){
		
    removeAjaxLoad();
	p_place = 0;
	if(a == 0) return displayErr(lang.err_ocur_at_checkin);
	else {
		remainOnSite(lang.post_not_finished_confirm,'saveLocation');
		p_place = a;
		var jbLocationTag = function (obj,c){
			
		ga('#tagged-place-n-post').remove();
		var ic_remove_tagged_place = '<div title="'+lang.remove_place+'" onclick="return remove_place_from_post('+a+');" class="x-remove-place-tag  ic10 ic10_close foh-s"></div>';
		var jj_cont = '<div class="jb_place_tip soh-s">'+ic_remove_tagged_place+'<div rel="tipsy" title="'+pp_place['pl-type']+'" class="jb-tip-ic stub-img__48 stub-place stub-place-'+pp_place['pl-type']+'"></div><div class="jb-place-tip-name">'+pp_place['display_name']+'</div></div>';
					obj.jBox('Tooltip', {
												content: jj_cont,
												id: 'tagged-place-n-post',
												closeOnMouseleave: true,
												//position: {x: 'center', y: 'top'},
												///outside: 'y',
												pointer: true,
												adjustPosition: true,
												reposition: true,
												onOpen:function(){
														//if(stc) this.setContent(jb_create_tooltip_cnt);												
												}
					});
					
					ga('#ic-checkin-at-post').trigger('click');

}
	
	
	ga('.suggest_li.search-tip.__selected').removeClass('__selected');
	$el.addClass('__selected');
	 
	 var at_place_nm = '<div class="li_place" id="place_tip_'+a+'"><a class="o" href="javascript:;">'+pp_place['pl-n']+'</a></div>';
	 var share_bbx = ga('#posting_form_text_field-w').find('.post.smiles_w');//$('#posting_form_text_field-w');
	 			   if(!share_bbx.parent().find('.tagged_people_loc').length){
					share_bbx.after('<div class="tagged_people_loc soh-s"><div class="__pdd ellip"><div class="_location pple_places">&nbsp;'+lang.at+'&nbsp;'+at_place_nm+'</div><div title="'+lang.remove_tags+'" onclick="return remove_all_post_tags(1);" class="x-delete-post-tag __alltg ic10 ic10_close tg_del foh-s"></div></div></div>');
					ga('.post_bottom_opts').removeClass('brd');
					jbLocationTag(ga('._location'));
					} else if( !share_bbx.parent().find('.tagged_people_loc ._location').length ) {
						ga('.tagged_people_loc ._people').after('<div class="_location">&nbsp;'+lang.at+'&nbsp;'+at_place_nm+'</div>');
						jbLocationTag(ga('._location'));
						
					} else {
						ga('.tagged_people_loc ._location').replaceWith('<div class="_location">&nbsp;'+lang.at+'&nbsp;'+at_place_nm+'</div>');
						jbLocationTag(ga('._location'));
					}
	 
	}
	 
	 	});
}

function remove_place_from_post(place_id){
ajaxLoading();
	var remove_place_from_db = jAjax('/cmd.php', 'post', 'cmd=removeCheckedIn&i='+place_id);
	remove_place_from_db.done(function(d){
		removeAjaxLoad();
	
	$('#tagged-place-n-post,._location').remove();
	if(!$('._people').length) remove_all_post_tags(1);
	$('.suggest_li.search-tip.__selected').removeClass('__selected');
	p_place = 0;
	unbindRemainOnSite('saveLocation');
	});
}