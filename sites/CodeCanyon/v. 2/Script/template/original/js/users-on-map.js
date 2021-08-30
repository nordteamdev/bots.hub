var user_live_lang_long = {};
var user_map_status = {};
var map_markers = [];
var map_u_suggest_list ={
					
					'feeling_good' : {
						'id': 'feeling_good',
						'ic' : '<i class="icofont icofont-emo-simple-smile">&#xebbd;</i>',
						'text': lang._map_sugg_feeling_good
						
					},

					'drink_coffe' :{
						'id':'drink_coffe',
						'ic' : '<i class="icofont icofont-coffee-mug">&#xec3f;</i>',
						'text': lang._map_sugg_drink 
						
					},
					
					'eating' :{
						'id':'eating',
						'ic' : '<i class="icofont icofont-pizza-slice">&#xec6b;</i>',
						'text': lang._map_sugg_eat 
						
					},
					'watching' :{
						'id':'watching',
						'ic' : '<i class="icofont icofont-film">&#xeff9;</i>',
						'text': lang._map_sugg_watching
						
					},
					
					
					'listen' :{
						'id':'listen',
						'ic' : '<i class="icofont icofont-headphone">&#xf01b;</i>',
						'text': lang._map_sugg_listen
						
					},
					
					'shopping' :{
						'id':'shopping',
						'ic' : '<i class="icofont icofont-shopping-cart">&#xf0cd;</i>',
						'text': lang._map_sugg_shopping
						
					},
					
					
					'playing' :{
						'id':'playing',
						'ic' : '<i class="icofont icofont-game-pad">&#xf00c;</i>',
						'text': lang._map_sugg_playing
						
					},
					
					'reading' :{
						'id':'reading',
						'ic' : '<i class="icofont icofont-book">&#xef8f;</i>',
						'text': lang._map_sugg_reading
						
					}
};

var _map_u_status_feelings = {
	
	
	'feeling_good': {
		
		'ic':'good',
		'text':lang._map_feelings_good
	},
	
	'feeling_sad': {
		
		'ic':'sad',
		'text':lang._map_feelings_sad
	},
	'feeling_happy': {
		
		'ic':'happy',
		'text':lang._map_feelings_happy
	},
	
	'feeling_astonished': {
		
		'ic':'astonished',
		'text':lang._map_feelings_astonished
	},
	'feeling_awesome': {
		
		'ic':'awesome',
		'text':lang._map_feelings_awesome
	},
	'feeling_inlove': {
		
		'ic':'inlove',
		'text':lang._map_feelings_inlove
	},
	
	'feeling_nervous': {
		
		'ic':'nervous',
		'text':lang._map_feelings_nervous
	},
	'feeling_tired': {
		
		'ic':'tired',
		'text':lang._map_feelings_tired
	},
	'feeling_excited': {
		
		'ic':'excited',
		'text':lang._map_feelings_excited
	}
};

var _map_drinks = {
	
	'beer': {
		
		'ic':'beer',
		'text' : lang._map_drink_beer
		
	},
	
	'cocktail':
	{
		
		'ic':'cocktail',
		'text' : lang._map_drink_cocktail	
		
	},
	
	'coffe':{
		
		'ic':'coffe',
		'text' : lang._map_drink_coffe
	},
	
	'water':{
		
		'ic':'water',
		'text' : lang._map_drink_water
	},
	
	'wine':{
		'ic':'wine',
		'text' : lang._map_drink_wine
	},
	
	'champagne':{
		
		'ic':'champagne',
		'text' : lang._map_drink_champagne
	},
	
	'whisky':{
		
		'ic':'whisky',
		'text' : lang._map_drink_whisky
	},
	'juice':{
		
		'ic':'juice',
		'text' : lang._map_drink_juice
		
	},
	'mojito':{
		
		'ic':'mojito',
		'text' : lang._map_drink_mojito
		
	}
	
}



var _map_eat = {
	
	'pizza': {
		
		'ic':'pizza',
		'text' : lang._map_eating_pizza
		
	},
	
	'hamburger': {
		
		'ic':'hamburger',
		'text': lang._map_eating_hamburger
	},
	
	'kebab':{
		
		'ic':'kebab',
		'text' : lang._map_eating_kebab
		
	},
	
	
	'soup':
	{
		
		'ic':'soup',
		'text' : lang._map_eating_soup
		
	},
	
	'barbeque':{
		
		'ic':'barbeque',
		'text' : lang._map_eating_barbeque
	},
 
	'cake':{
		
		'ic':'cake',
		'text' : lang._map_eating_cake
		
	},
	'ice_cream':{
		
		'ic':'ice_cream',
		'text' : lang._map_eating_ice_cream
		
	},
	
	
	'salad':{
		'ic':'salad',
		'text' : lang._map_eating_salad
	},
	
	'fish':{
		
		'ic':'fish',
		'text' : lang._map_eating_fish
	},
	
	'fruits':{
		
		'ic':'fruits',
		'text' : lang._map_eating_fruits
	},
	'vegetables':{
		
		'ic':'vegetables',
		'text' : lang._map_eating_vegetables
		
	}

	
};



var _map_sport = {
	
	'soccer': {
		
		'ic':'soccer',
		'text' : lang._map_playing_soccer
		
	},
	'volleyball': {
		
		'ic':'volleyball',
		'text' : lang._map_playing_volleyball
		
	},
	
	'basketball': {
		
		'ic':'basketball',
		'text' : lang._map_playing_basketball
		
	},
	'hockey': {
		
		'ic':'hockey',
		'text' : lang._map_playing_hockey
		
	},	
	
	'golf': {
		
		'ic':'golf',
		'text' : lang._map_playing_golf
		
	},
	'bowling': {
		
		'ic':'bowling',
		'text' : lang._map_playing_bowling
		
	},
	

	'billiard': {
		
		'ic':'billiard',
		'text' : lang._map_playing_billiard
		
	},
	'rugby': {
		
		'ic':'rugby',
		'text' : lang._map_playing_rugby
		
	},
	'swimming': {
		
		'ic':'swimming',
		'text' : lang._map_playing_swimming
		
	},
	'skiing': {
		
		'ic':'skiing',
		'text' : lang._map_playing_skiing
		
	},
	'fishing': {
		
		'ic':'fishing',
		'text' : lang._map_playing_fishing
		
	},
	'wrestling': {
		
		'ic':'wrestling',
		'text' : lang._map_playing_wrestling
		
	}
	
	 
};

/*
$('.invisible-href-mp').on('click', function(e){
	
	if($(this).find('.map-notif_space').html() != ''){
		e.preventDefault();
		e.stopPropagation();
		return;
	}
	
});
*/
function umapcl(){
	

	 

	ga('#user_map_feeling_output').removeClass('start').html('<a href="javascript:void(0);" class="reopen_flg_sugg '+el_class+'">'+el_html+'&nbsp;<span class="user_location_status"></span></a>');
	ga('.user_status_map_inp input,#inp_sugg_map').hide(); 
	ga('#input_hidden_map_flng').val(el_class);
	ga('.reopen_flg_sugg').on('click',function(e){
		ga('.user_status_map_inp').find('[rel=savestatusonmap]').show();
		ga('#user_map_feeling_output').replaceWith(orig_html);
		ga('.user_status_map_inp input,#inp_sugg_map').show(); 
		ga('#input_hidden_map_flng').val('').removeClass('custom');
	});
}



function mapSelectFeelings(el) {
	
    var cnt = createForSuggSearchMedia();
	var lis = '';
	for(var k  in _map_u_status_feelings){
		
		var a = _map_u_status_feelings[k];
		
		lis += '<li><a class="feelings_a_sel" href="javascript:void(0);" data-sug-id="'+a.ic+'" data-suggest-categ="feeling_good_-_'+a.ic+'" onclick="mapSetThisStatus(event,this);"><div class="feeling_sugg_ic"><div class="map_feelings_ic '+a.ic+'"></div></div><div class="feeling_text">'+a.text+'</div></a></li>';
		
	}
	
	cnt.html('<div class="map_select_sugg_subcateg nano"><div class="nano-content">\
				<ul id="movie_list">'+lis+'</ul></div>\
	</div>');	
	
	nanoScrollStart();
}
function mapSelectDrink(el) {
	
    var cnt = createForSuggSearchMedia();
	var lis = '';
	for(var k  in _map_drinks){
		
		var a = _map_drinks[k];
		
		lis += '<li><a class="feelings_a_sel" href="javascript:void(0);" data-sug-id="'+a.ic+'" data-suggest-categ="drinking_-_'+a.ic+'" onclick="mapSetThisStatus(event,this);"><div class="feeling_sugg_ic"><div class="map-drinkic '+a.ic+'"></div></div><div class="feeling_text">'+a.text+'</div></a></li>';
		
	}
	
	cnt.html('<div class="map_select_sugg_subcateg nano"><div class="nano-content">\
				<ul id="movie_list">'+lis+'</ul></div>\
	</div>');	
		nanoScrollStart();
}
function mapSelectEat(el) {
	
    var cnt = createForSuggSearchMedia();
	var lis = '';
	for(var k  in _map_eat){
		
		var a = _map_eat[k];
		
		lis += '<li><a class="feelings_a_sel" href="javascript:void(0);" data-sug-id="'+a.ic+'" data-suggest-categ="eating_-_'+a.ic+'" onclick="mapSetThisStatus(event,this);"><div class="feeling_sugg_ic"><div class="map-eatic '+a.ic+'"></div></div><div class="feeling_text">'+a.text+'</div></a></li>';
		
	}
	
	cnt.html('<div class="map_select_sugg_subcateg nano"><div class="nano-content">\
				<ul id="movie_list">'+lis+'</ul></div>\
	</div>');	
		nanoScrollStart();
}
function mapSelectSport(el) {
	
    var cnt = createForSuggSearchMedia();
	var lis = '';
	for(var k  in _map_sport){
		
		var a = _map_sport[k];
		
		lis += '<li><a class="feelings_a_sel" href="javascript:void(0);" data-sug-id="'+a.ic+'" data-suggest-categ="playing_-_'+a.ic+'" onclick="mapSetThisStatus(event,this);"><div class="feeling_sugg_ic"><div class="map-playingic '+a.ic+'"></div></div><div class="feeling_text">'+a.text+'</div></a></li>';
		
	}
	
	cnt.html('<div class="map_select_sugg_subcateg nano"><div class="nano-content">\
				<ul id="movie_list">'+lis+'</ul></div>\
	</div>');	
		nanoScrollStart();
	
}
function userMapClone(el,event){
 
	el = ga(el);
	
	if(el.hasClass('noclick')) return;
	
	
	var orig_html = ga('.sug_map_li.start').clone();
	var el_html = el.html();
	
	var el_class = el.attr('class');
	
	
	
	var clone_sug_list = el.find('span').clone();
	var map_sugg_list_input = '<input type="text" value="" placeholder="%s" id="sugg_map_li_search_for"	/>';
 
	switch(el_class){
		
		
		case 'watching':

		mapCheckInFindMovies(el);
	
	
		break;
		
		case 'feeling_good':
		mapSelectFeelings(el);
		break;
		
		case 'drink_coffe':
		mapSelectDrink(el);
		break;
		
		case 'eating':
		mapSelectEat(el);
		break;
		
		
		case 'listen':
		mapCheckInFindTracks(el);
		break;	
		
		case 'shopping':
		mapAtShopping(el,event);
		break;
		
		case 'playing':
		mapSelectSport(el);
		break;
		
		case 'reading':
		mapSearchForBooks(el);
		break;
		
		
		
	}
	
	
	
}
function mapAtShopping(el,event) {
	
	var a = ga('<a/>').attr({'data-suggest-categ':'shopping_-_1','data-sug-id':'0'});
	
	mapSetThisStatus(event,a);
	
	
}
function createForSuggSearchMedia(){
	
	var hidden_opts = {
		
		'visibility':'hidden', 'opacity':0
		
	};
	var show_opts = {
		
		'visibility':'visible', 'opacity':1
		
	}
	var map_sugg_markup = '<div id="map_media_step_mk"><a href="javascript:void(0);" id="map_sugg_back_btn"><span class="glyphicon glyphicon-chevron-left"></span>'+lang.back+'</a><div class="mp_cnt"></div></div>';
	
	
	ga('#default_checkin_opts').addClass('__hidetoleft').on(crossEvent, function (){
		ga(this).css(hidden_opts);
	});
	if(!ga('#map_media_step_mk').length)
	ga('#default_checkin_opts').before(map_sugg_markup);
	ga('#map_sugg_back_btn').on('click',function(e){
		ga('#map_media_step_mk').remove();
		ga('#default_checkin_opts').removeClass('__hidetoleft').on(crossEvent, function (){
				ga(this).css(show_opts);
			});
		
	});
	
	return ga('#map_media_step_mk').find('.mp_cnt');
	
}
function mapStatusCreatedMarkup(){
	
	return '<div class="map_status_set sug_map_li"><div class="%categ map_status_set_ic">%ic</div><div class="map_status_set_str"><span class="map_selected_status %categ">#ic_str</span>&nbsp;%title</div><div class="map_preview_footer"><a rel="savestatusonmap" onclick="setUserStatusOnMap(event,this);">OK</a><a rel="deletestatusonmap" onclick="deleteStatusFromMap(event,this);">'+lang.remove+'</a></div></div>';
}
function replaceFeelingsToEMoji(c){
	var r,p;
	switch(c){
		
		
		case 'good':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_blush';
		p = 'background-position: -78px -0px;';
		break;
		case 'sad':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_pensive';
		p = 'background-position: -416px -0px;';
		break;
		case 'happy':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_smiley';
		p = 'background-position: -26px -0px;';
		break;
		case 'astonished':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_open_mouth';
		p = 'background-position: -572px -26px;';
		break;
		case 'awesome':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_grin';
		p = 'background-position: -52px -0px;';
		break;
		case 'inlove':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_heart-eyes';
		p = 'background-position: -156px -0px;';
		break;
		case 'nervous':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_rage';
		p = 'background-position: -182px -26px;';
		break;
		case 'tired':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_sweat';
		p = 'background-position: -26px -26px;';
		break;
		case 'excited':
		r = 'emotics emoji-spritesheet-0 emoji-w26 emoji-code-bg-kn_yum';
		p = 'background-position: -286px -26px;';
		break;
		
	}
	
	return [r,p];
}
function mapSetThisStatus(event,el){
	el = ga(el);
	
	var categ_split = el.data('suggest-categ').split('_-_');
	var categ = categ_split[0];
	var title = decodeURIComponent(categ_split[1]);
	var id = el.data('sug-id');
	var ic, ic_str,m;
	switch(categ) {
		
		
		
		case 'watching':
		ic = map_u_suggest_list[categ].ic;
		ic_str = lang['_map_sugg_'+categ];
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<a href="javascript:void(0);">'+title+'</a>');
		break;		
		
		case 'feeling_good':
		ic = map_u_suggest_list[categ].ic;
		ic_str = lang['_map_sugg_'+categ];
		var replace_to_emoji = replaceFeelingsToEMoji(title);
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<span style="'+replace_to_emoji[1]+'" class="map_feelings_ic_set '+replace_to_emoji[0]+'"></span>'+title);
		break;	
		
		case 'drinking':
		ic = map_u_suggest_list['drink_coffe'].ic; 
		ic_str = lang['map_sugg_drinking'];
 
		m = mapStatusCreatedMarkup().replace(/%categ/g, 'drink_coffe').replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<span class="map-drinkic small '+title+'"></span>'+title);
		break;
		
		case 'eating':
		ic = map_u_suggest_list[categ].ic; 
		ic_str = lang['map_sugg_eating'];
 
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<span class="map-eatic small '+title+'"></span>'+title);
		break;
		
		case 'listen':
		ic = map_u_suggest_list[categ].ic;
		ic_str = lang['_map_sugg_listen'];
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<a href="javascript:void(0);">'+title+'</a>');
		break;
		
		case 'shopping':
		ic = map_u_suggest_list[categ].ic;
		ic_str = lang['_map_sugg_shopping'];
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'');
		break;
		
		case 'playing':
		ic = map_u_suggest_list[categ].ic; 
		ic_str = lang['_map_sugg_playing'];
 
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<span class="map-playingic small '+title+'"></span>'+title);
		break;
		
		case 'reading':
		ic = map_u_suggest_list[categ].ic;
		ic_str = lang['_map_sugg_'+categ];
		m = mapStatusCreatedMarkup().replace(/%categ/g, categ).replace(/%ic/g, ic).replace(/#ic_str/g,ic_str).replace(/%title/g,'<a href="javascript:void(0);">'+title+'</a>');
		break;
		
	}
	ga('.user_status_map_inp').html(
	
	m
	
	);
	ga('#input_hidden_map_flng').removeClass('custom').val(categ+'_-_'+id);
}

function mapBooksRes(result){
	 
		var r = validateJson(result); 
		var book_markup = '';
		
		if( r.items.length > 0 ) {
		for( var i =0; i < r.items.length;i++){
			
			
			var book = r.items[i];
			var bookInfo = book.volumeInfo;
			var poster = bookInfo.hasOwnProperty('imageLinks') ? '/bookGetPoster?p='+encodeURIComponent(bookInfo.imageLinks.smallThumbnail) : '/bookGetPoster?p=nope'; 
			var title = bookInfo.title;
			var book_about = bookInfo.hasOwnProperty('description') ? bookInfo.description : '';
			var book_about = bookInfo.hasOwnProperty('authors') ? lang.book_authors_sugg+':&nbsp;'+bookInfo.authors : '';
			var book_id = book.id;
			
			book_markup += '<li><div class="hookData __none"><!--'+JSON.stringify(book)+'--></div><a href="javascript:void(0);" data-sug-id="'+book_id+'" data-suggest-categ="reading_-_'+encodeURIComponent(title)+'" onclick="userAddBook(this,event);mapSetThisStatus(event,this);" class="sc_suggestion_movie_a"><div class="sc_suggestion_cover" style="background-image:url('+poster+')"></div><div class="sc_suggestion_str"><div class="sc_suggestion_title">'+title+'</div><div class="sc_suggestion_info">'+book_about+'</div></div></a></li>';
			
			
		} 
		} else book_markup = '<div style="text-align:center;">'+lang.lang_book_not_found+'</div>';
			
		
		
		ga('#movie_list').html(book_markup);
		nanoScrollStart();
}
function mapMoviesRes(result){
	
		 
		
		var r = validateJson(result);
		var movies_markup = '';
		
		if( r.results.length > 0 ) {
		for( var i =0; i < r.results.length;i++){
			
			
			var movie = r.results[i];
			var poster = '/movieGetPoster?p='+movie.poster_path; 
			var title = movie.original_title;
			var movie_about = movie.overview;
			var movie_id = movie.id;
			
			movies_markup += '<li><div class="hookData __none"><!--'+JSON.stringify(movie)+'--></div><a href="javascript:void(0);" data-sug-id="'+movie_id+'" data-suggest-categ="watching_-_'+encodeURIComponent(title)+'" onclick="userAddMovieToWatched(this,event);mapSetThisStatus(event,this);" class="sc_suggestion_movie_a"><div class="sc_suggestion_cover" style="background-image:url('+poster+')"></div><div class="sc_suggestion_str"><div class="sc_suggestion_title">'+title+'</div><div class="sc_suggestion_info">'+movie_about+'</div></div></a></li>';
			
			
		} 
		} else movies_markup = '<div style="text-align:center;">'+lang.lang_movie_not_found+'</div>';
			
		
		
		ga('#movie_list').html(movies_markup);
		nanoScrollStart();

	
}
function mapTracksRes(result){
	
		 
		
		var r = validateJson(result);
		var tracks_markup = '';
		
		if( r.length > 0 ) {
		for( var i =0; i < r.length;i++){
			
			
			var track = r[i];
			var poster = '/trackGetPoster?p='+encodeURIComponent(track.cover); 
			var title = track.artist + '&nbsp;-&nbsp;'+track.title;
			var track_about = track.album;
			var track_id = track.id;
			
			tracks_markup += '<li><div class="hookData __none"><!--'+JSON.stringify(track)+'--></div><a href="javascript:void(0);" data-sug-id="'+track_id+'" data-suggest-categ="listen_-_'+encodeURIComponent(title)+'" onclick="mapSetThisStatus(event,this);" class="sc_suggestion_movie_a"><div class="sc_suggestion_cover" style="background-image:url('+poster+')"></div><div class="sc_suggestion_str"><div class="sc_suggestion_title">'+title+'</div><div class="sc_suggestion_info">'+track_about+'</div></div></a></li>';
			
			
		} 
		} else tracks_markup = '<div style="text-align:center;">'+lang.lang_track_not_found+'</div>';
			
		
		
		ga('#movie_list').html(tracks_markup);
		nanoScrollStart();

	
}
function mapSearchForBooks(res,el){
    var cnt = createForSuggSearchMedia();
	
	
	cnt.html('<div class="map_select_sugg_subcateg nano">\
				<div class="nano-content"><div class="input_serch_ic"><input type="text" class="it" rel="input_search_books" search-callback="mapBooksRes" placeholder="ex. Brothers Grimm" value="" /><i class="div-loader input-ic-loader __none"></i></div>\
				 <ul id="movie_list"></ul></div>\
	</div>');
}
function mapCheckInFindMovies(res,el){
	
    var cnt = createForSuggSearchMedia();
	
	
	cnt.html('<div class="map_select_sugg_subcateg nano">\
				<div class="nano-content"><div class="input_serch_ic"><input type="text" class="it" rel="input_search_movies" search-callback="mapMoviesRes" placeholder="ex. 12 Angry Men" value="" /><i class="div-loader input-ic-loader __none"></i></div>\
				 <ul id="movie_list"></ul></div>\
	</div>');
	

}

function mapCheckInFindTracks(res,el){
	
    var cnt = createForSuggSearchMedia();
	
	
	cnt.html('<div class="map_select_sugg_subcateg nano">\
				<div class="nano-content"><div class="input_serch_ic"><input type="text" class="it" rel="input_search_tracks" search-callback="mapTracksRes" placeholder="ex. Shy Glizzy - First 48" value="" /><i class="div-loader input-ic-loader __none"></i></div>\
				 <ul id="movie_list"></ul></div>\
	</div>');
	

}
function hideMapSugg(el,event){
	
	el = ga(el);
	
	if($.trim(el.val()) != ''){
		
		ga('#inp_sugg_map').hide();
		ga('#input_hidden_map_flng').addClass('custom').val(el.val());
	} else {
		ga('#input_hidden_map_flng').removeClass('custom').val('');
		ga('#inp_sugg_map').show();
	}
	
}
function setUserStatusOnMap(event,el){
	el = ga(el);
	var g_flng = ga("#input_hidden_map_flng");
	var data = {};
	data['cmd'] = 'map-live-checkin';
	data['value'] = g_flng.val();
	data['lat_long'] = JSON.stringify(user_live_lang_long);  
	if ( $.trim(g_flng.val()) )
	{
		
		if( g_flng.hasClass('custom')){
			
			data['is_custom'] = 1;
		}
		ajaxLoading();
		var send = jAjax('/cmd.php', 'post', $.param(data));
		send.done( function(r){ 
			removeAjaxLoad();
			var d = validateJson(r);
			if(d.is == 1){
 
				
				 
				var marker = getMarker(d,false,_U.i);

 
				ga('#map_marker_user_'+_U.i).remove();
				ga('.map_user_status').replaceWith(marker);
				el.hide();
				
				updateMarkerCnt(_U.i,marker);
				
				
				
				setTimeout(function(){	
				
							var marker_cont = ga('[title="map_marker_user_'+_U.i+'"]');
							var marker_pos = marker_cont.css('transform');
							ga('.leaflet-marker-pane').prepend('<div class="sug_map_li friend" id="map_marker_user_'+_U.i+'" onclick="openMarkerId(event,'+_U.i+');" style="position:absolute;z-index:5100!important;margin-left: 2px;margin-top: -41px;transform:'+marker_pos+'"><A class="'+d['class']+'">'+d.ic+'</a></div>');
				
				},100);
				
				
				
				
				
				
				// show notification
				kn_liveNotif(lang.map_status_shared_done,'done',2500,lang.map_status_shared_done_descr);
				
			} else {
				return displayErr(lang.err_tehnic);
			}
			
		});
 
 	}
}

function deleteStatusFromMap(evt,el){
	
	evt.preventDefault();
	
	var send = jAjax('/cmd.php', 'post', {'cmd':'deleteStatusFromMap'});
	send.done(function(d) { 
		var r = { 'is' : '0', };
			if(d == '1') {
				
				var marker = getMarker(r,false,_U.i);
				ga('#map_marker_user_'+_U.i).remove();
				ga('.map_user_status').replaceWith(marker);
				
				
				updateMarkerCnt(_U.i,marker);


			} else {
				return displayErr(lang.err_tehnic);
			}
		
	});
	
}
function inputMaxLength(event, el, c){
	
	if( el.value.length > c){
		event.preventDefault();
		el.parent().find('.maxlength').text( c - el.value.length <= 0 ? 0 : c - el.value.length );
	}
	
	
}
function updateMarkerCnt(userid,newContent){
	var marker_title = 'map_marker_user_'+userid;
	 
	    for (var i=0; i < map_markers.length;i++){
        var markerID = map_markers[i].options.title;
		 
        if (markerID == marker_title){ 
            map_markers[i].setPopupContent(newContent);
			
        };
    }
}
function openMarkerId(e,userid){
	e.preventDefault();
	e.stopPropagation();
	var marker_title = 'map_marker_user_'+userid;
	 
	    for (var i=0; i < map_markers.length;i++){
        var markerID = map_markers[i].options.title;
		 
        if (markerID == marker_title){ 
            map_markers[i].openPopup();
			
        };
    }
 
}


function getMarker(r,user,user_id){
 
	
		var marker = '';
	if(r.is == '1')	
	marker = '<div class="map_user_status"><input type="hidden" id="input_hidden_map_flng" value="'+r['class']+'">'+
    '<ul>'+
 
        '<li>'+
            '<div class="user_status_map_inp">'+
               ' <div class="sug_map_li" id="user_map_feeling_output"><div class="map_status_set_ic '+r['class']+'">'+r.ic+'</div><div class="map_status_set_str">'+r.text+ '<div class="map_status_u_created">'+r.added+'</div></div></div><input type="text" onkeyup="hideMapSugg(this,event);" onkeypress="return inputMaxLength(event, this, 50);" onfocus="showMapInpSugg(this,event);" class="it" placeholder="ex: awwsome" style="display: none;">'+
               (user_id == _U.i ? '<a rel="removestatusonmap" onclick="deleteStatusFromMap(event,this);" >'+lang.remove+'</a></div>' : '' )+
        '</li>'+
   ' </ul>'+
	'</div>';
	else if (user_id == _U.i)
	marker = '<div class="map_user_status"><input type="hidden" id="input_hidden_map_flng" /><ul><li><div class="user-status-on-map-q">'+lang.map_status_question+'</div></li>\
	<li><div class="user_status_map_inp"><div class="sug_map_li start" id="user_map_feeling_output"><i class="icofont icofont-volume-up">&#xf109;</i></div><input type="text" onkeyup="hideMapSugg(this,event);"  onkeypress="return inputMaxLength(event, this, 50);" onfocus="showMapInpSugg(this,event);" class="it" placeholder="ex: awwsome" /><a rel="savestatusonmap" onclick="setUserStatusOnMap(event,this);">OK</a></div></li></ul></div>';	
	else
	marker = '<div class="lpopup-userdt"><div class="umap-uimg"><img src="/getPhoto?p='+user.photo+'&sz=small" /></div>'+
		'<div class="live-map-user-info"><div class="live-map-user-name">'+user.fullname+''+
		'<a title="send a message" href="javascript:void(0);" onclick="return new_chat_window(this,event);" id="y-'+user.id+'" data-uch=\'{"id":"'+user.id+'","fullname":"'+user.fullname+'","photo":"'+user.photo+'"}\' class="online-fr_msg livemap-smsg"></a></div>'+
		'<div class="livemap-user-locfr">'+lang.from+'&nbsp;'+user.loc_from+'</div>'+
	     (user.mutual_friends > 0 ? '<div class="lvmap-mutualfriends">'+lang.mutual_friends+':&nbsp;'+user.mutual_friends+'</div>' : '')+'<div class="fo4c_h_divider!"></div>'+
		 '<div class="ulvmap-now-on">'+lang.at+'&nbsp;'+user.at+'</div>'+
		 
		 '</div></div></div>';
	
	return marker;
	
	
}


    // check for map status
	function checkUserStatusOnMap(lat,lon,map,user_id,user) {
	user_id = user_id ? user_id : _U.i;
	
	

	var $marker = '';
 
	
	var send = jAjax('/cmd.php','post',{ 'cmd':'checkForUserMapStatus', 'lat_long':(lat+','+lon),'userid':escape(user_id) });
	send.done(function(d){
 
		var r = validateJson(d);
		
 
 $marker = getMarker(r,user,user_id);
 if(user_id == _U.i) {
	
	

 
	
	marker = new L.marker([lat, lon],{title:'map_marker_user_'+user_id}).bindPopup(  $marker  );
		map.addLayer(marker);
		
		map_markers.push(marker);
		
		if(r.is == '1'){
			var marker_cont = ga('[title="map_marker_user_'+user_id+'"]');
			var marker_pos = marker_cont.css('transform');
			ga('.leaflet-marker-pane').prepend('<div class="sug_map_li" id="map_marker_user_'+user_id+'" onclick="openMarkerId(event,'+user_id+');" style="position:absolute;z-index:400!important;margin-left: 2px;margin-top: -48px;transform:'+marker_pos+'"><A class="'+r['class']+'">'+r.ic+'</a></div>');
		} else {
			
			marker.openPopup();
		}

	
 } else if(user){
	 
 var iconstyle = '',AutocloseMapPopup;
	 
	 
			var userMarker = L.divIcon({
									 id:'muser_'+user.id,
									 className: 'map-marker ',
									 iconSize:[26,26], popupAnchor: [3,-10],
									 html:'<a href="/user/'+ user.id +'" hrefattr="true"><div class="user-on-map-picture map-user-glowing" style="'+iconstyle+'"><img  src="/getPhoto?p='+user.photo+'&sz=small" /></div>'+ ( user.online ? '<span class="ic-online"></span>' : '')+'</a>'
		});
		 
		
			if( lat != 0 && lon != 0 && lat != undefined && lon != undefined) {
		 

			 
				
				 
				if(r.is == '0') {
					
				u_marker = new L.marker([lat, lon], {title:'map_marker_user_'+user.id, icon: userMarker}).bindPopup( $marker );
				map_markers.push(u_marker);	
					
				} else {
					
					
					u_marker = new L.marker([lat, lon], {title:'map_marker_user_'+user.id, icon: userMarker}).bindPopup( $marker );
					map_markers.push(u_marker);	
					
				setTimeout(function(){	
				
							var marker_cont = ga('[title="map_marker_user_'+user_id+'"]');
							var marker_pos = marker_cont.css('transform');
							ga('.leaflet-marker-pane').prepend('<div class="sug_map_li friend" id="map_marker_user_'+user_id+'" onclick="openMarkerId(event,'+user_id+');" style="position:absolute;z-index:5100!important;margin-left: 2px;margin-top: -17px;transform:'+marker_pos+'"><A class="'+r['class']+'">'+r.ic+'</a></div>');
				
				},100);
				
				}
				
				
			////});
			
		u_marker.on('mouseover', function (e) {
			 
			clearTimeout(AutocloseMapPopup);
            this.openPopup();
        });
		
		/*
        u_marker.on('mouseout', function (e) {
           var that = this;
		AutocloseMapPopup = setTimeout(function(){
		   that.closePopup();
			},700);

		   });*/
		
		
		map.addLayer(u_marker);
		up_href();
		
		} 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
 }
 
 
 
  	map.on('zoomstart',function(){
		
		ga('.sug_map_li').hide();
	});
	 map.on('zoomend', function() {
			
				
				ga('.sug_map_li').each(function(){
				var id = ga(this).attr('id');
				var marker_cont = ga('[title="'+id+'"]');
				var marke_pos = marker_cont.css('transform');	
					ga(this).css('transform',marke_pos).show();
					
				});
	});
		
	});

	}

function showMapInpSugg(el,evt){
 
	evt.preventDefault();
	
	el = ga(el);
	
	var sugg_li_list = '';
 
		for(var k in map_u_suggest_list){
		var a = map_u_suggest_list[k];
 
		sugg_li_list += '<li class="sug_map_li"><A class="'+a.id+'" onclick="userMapClone(this,event);">'+a.ic+' <span>'+ a.text +' '+ ( a.id == 'shopping' ? '' : '...') +'</span></a></li>';
		
		
	}
	
	var ul_suggestions = '<ul id="inp_sugg_map"><div id="default_checkin_opts">'+sugg_li_list+'</div></ul>';
	
	if (!el.parent().find('#inp_sugg_map').length) {
		
		el.after(ul_suggestions);
		
	}
	
	
}
 
function usersOnMapPage() {
	var online_hook = ga('.online-fr_block'), u_glob_left_MENU = ga('#profile_left_side_bar');
	
	if( ga('#users-on-map-pg').length) {
		 
		ga('html').scrollTop(0).addClass('uonmap');
		
		u_glob_left_MENU.hide();
		var top_bar = ga('.toolbar');
		
		
		var css = {
			
			'width': '100%',//ga(window).width() - ga('.nav_tool_friends_online').width(),
			'height': ga(window).height() - top_bar.height(),
			'top': top_bar.height(),
			'margin-bottom': '60px',
			'position':'relative',
			///'border-right':'1px solid #dcdcdc'
			
		};
		ga('#users-onmap-cnt').css(css);
		online_hook.css({'border-left':'1px solid rgb(213, 213, 214)','background-color':'#fff','opacity':'0.83'});
		
	 
	    var checkMapLoading = function (){
			
			if(typeof startLiveMap == "function"){
			startLiveMap();
		
			} else {
				setTimeout(checkMapLoading,1000);
			}
		
		};
		
		startLiveMap();
	} else {
		online_hook.removeAttr('style');
		ga('html').removeClass('uonmap');
		u_glob_left_MENU.show();
	}
	
	
	
	
}
function startLiveMap (){
	
	

L.GeoIP = L.extend({

    getPosition: function (ip) {
		//var url = _HTTP+'api.ipstack.com/%ip%?access_key=9a7466b8a7b58ec15e72b05f1fbae505&format=1';
     //   var url = '/cmd.php?//_HTTP+'geoplugin.net/json.gp?ip=188.191.210.50//_HTTP+"freegeoip.net/json/";
        var result = {};//L.latLng(0, 0);
 
		
	/*	
        if (ip !== undefined) {
            //url = url.replace('%ip%',ip);
        } else {
            //lookup our own ip address
        }*/
	 	var params = 'cmd=getGeoLocByHttp&ip='+ip;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/cmd.php', true);
		    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            var status = xhr.status; 
            if (status == 200) {
                var geoip_response = JSON.parse(xhr.responseText);
                result.lat = geoip_response.latitude;
                result.lng = geoip_response.longitude;
				 
            } else {
                console.log("Leaflet.GeoIP.getPosition failed because its XMLHttpRequest got this response: " + xhr.status);
            }
        };
        xhr.send(params); 
		 /*
		 var result = {};
		 var send = jAjax('/cmd.php', 'post',{'cmd':'getGeoLocByHttp','ip':ip});
		 send.done(function(data){ alert(data);
				var geoip_response = validateJson(data);
			    result.lat = geoip_response.latitude;
                result.lng = geoip_response.longitude;
				
		 });
		 */
		 
 
		 
		 
		 return result;
        
    },

    centerMapOnPosition: function (map, zoom, ip) { 
        var position = L.GeoIP.getPosition(ip);
        map.setView(position, zoom);
    }
});
	
	
		var marker, map, newUser, users, mapquest, firstLoad, m_users = new Array();
      firstLoad = true;
	  

	  /*
		function liveUserOnMap(){
		
		
			var send = jAjax('/cmd.php', 'post', {'cmd': 'liveUserOnMap', 'users':JSON.stringify(m_users)});
			
			send.done(function(data){
			
			alert(data);
			 var d = validateJson(data);
			 
			 for(var i = 0; i < d.length; i++){
			 
				var u = d[i];
			 ga('#muser_'+d.user_id).remove();
				  var lat = (e.latlng.lat);
					var lng = (e.latlng.lng);
					var newLatLng = new L.LatLng(lat, lng);
					
					marker.setLatLng(newLatLng); 
			 
			 }
			
			setTimeout(function(){
							liveUserOnMap();
			},9000);
			
			
			});
			
		
		}
		*/

	function addUsers(e) {
 
       var s_data = {}
	   s_data['cmd'] = 'addUsersOnmap';
	   s_data['lat_long'] = JSON.stringify(user_live_lang_long);
 
		ajaxLoading();
		ga('body').prepend('<div id="id-txt-map-load-friends" class="map-search-for-friends"><div class="map-search-for-friends-text">'+  lang.map_search_friends +'</div></div>');
         var send = jAjax('/cmd.php', 'post', $.param(s_data));
			  send.done(function(data) {  
			  removeAjaxLoad();
			 setTimeout(function() {ga('#id-txt-map-load-friends').animate({opacity:'0.1'},1000,function(){ ga(this).remove()});},1000);
			
		var d = validateJson(data);
	 /*
		for(var x=0;x<d.length;x++) {
 
		
		var user = d[x];
		var ip = user.ip;
		 
		if(ip.length > 0) {
			
			
		//var pos = L.GeoIP.getPosition(ip);
		 	//	 var result = {};
		 var send = jAjax('/cmd.php', 'post',{'cmd':'getGeoLocByHttp','ip':ip});
		 send.done(function(data){  
				var geoip_response = validateJson(data);
			 //   result.lat = geoip_response.latitude;
             //   result.lng = geoip_response.longitude;
		m_users.push(user.id);

		checkUserStatusOnMap(geoip_response.latitude,geoip_response.longitude,map,user.id,user);
		 });
 
		}
		
		
		}*/
		var _c = 0;
		
		
		var _prepend_users_on_map = function(c){
			
		if(c < d.length){
		var user = d[c];
		var ip = user.ip;
			
		if(ip.length > 0) {
 
		 var send = jAjax('/cmd.php', 'post',{'cmd':'getGeoLocByHttp','ip':ip,'uid':user.id});
		 send.done(function(data){  
				var geoip_response = validateJson(data);
 
		m_users.push(user.id);

		checkUserStatusOnMap(geoip_response.latitude,geoip_response.longitude,map,user.id,user);
		 
		
		
		
			c++;
			_prepend_users_on_map(c);
		
		
		 });
 
		}
		}	
		}
 
		_prepend_users_on_map(_c);
 
 


		
		
		
		});
		
		
      }



     /// users = new L.MarkerClusterGroup({spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: true});
     newUser = new L.LayerGroup();
	  
	  
	 map = new L.Map('umap-loc', {zoom: 3}).whenReady(function(){
		
		
		     // map.addControl(new L.Control.Scale());
	  addUsers();
	  
	 

	 // liveUserOnMap();

		ga('#umap-loading').remove()});
	map.addLayer(new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));	//base layer
		var markersLayer = new L.LayerGroup();	//layer contain searched elements
	  
	  
	var lcm = map.locate({ setView: true, maxZoom:3, enableHighAccuracy:true }).on('locationfound', function(e){
		 user_live_lang_long = { 'latitude' : e.latitude,  'longitude': e.longitude};
		 ga('#users-onmap-cnt').find('#map_loc_notfound').remove();
      var geolocControl = new L.control({
        position: 'topright'
      });
      geolocControl.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-control');
        div.innerHTML = '<a class="leaflet-control-geoloc" href="#" onclick="geoLocate(); return false;" title="My location"></a>';
        return div;
      };
  
 
       // check for map status
	 checkUserStatusOnMap(e.latitude, e.longitude, map, _U.i);

	

		/////map.openPopup( marker );
		location_found = true;
//search_plugin_init();
	}).on('locationerror', function(e){
	
			marker = new L.marker([44.4361414, 26.1027443]);
		map.addLayer(marker);
		location_found=false;
		ga('#users-onmap-cnt').prepend('<div id="map_loc_notfound" class="fixed_always"><div class="layer_ovr"></div><div class="map_load_error">Map not loaded. Turn on your location.<a href="/users-on-map?tk='+  (new Date().getTime()) +'" hrefattr="true"><i class="icofont icofont-refresh">&#xf0b6;</i>Reload map</a></div></div>');
		up_href();
	});
 
}
function fmapBoxNoData() {
	
	return '<div class="fmapbox_empty"><div class="ic_empty_fmapbox"><i class="icofont icofont-globe">&#xf012;</i><div class="fmapbox_empty_txt">'+lang.fmapbox_empty+'</div></div></div>';
	
}
function getPostsOnMapForPeriod(e,el,c){
	
	el = ga(el);

	ga('.ftop_a_active_tab').removeClass('active');
	ga('#fmap_box_title_top').addClass('active');
	var send = jAjax('/cmd.php', 'post', { 'cmd':'getajaxpostsonmap','c':c });
	send.done(function(d){
		ga('#fmap_box_title_top').html(el.text()+'<i class="icofont icofont-caret-down">&#xeb25;</i>');
		ga('.fmap-box-fohmenu').find('.active').removeClass('active');
		el.addClass('active');
		var g = validateJson(d);
 
		if(g.length > 0){
		ga('.fmap_box_cnt').empty();
		for(var i =0; i < g.length;i++){
			var b = g[i];
		ga('.fmap_box_cnt').append('<div class="fmapbox_status_l" style="background-color:'+b.bg+'"><div class="f_left fmapbox_user_info_p"><img src="/getPhoto?p='+b.user_photo+'&sz=small"/></div><div class="fmapbox_uname"><a href="/user/'+b.user_id+'" hrefattr="true">'+b.user_name+'</a></div><div class="fmabox_li_cnt">'+b.status+'</div><div class="fmapbox_time">'+b.time_ago+'</div></div>');
	
		}
		} else {
			
			ga('.fmap_box_cnt').html(fmapBoxNoData());
		}
	});
	
}

function fmapBoxNearbyPeople(ev,el){
	
	el = ga(el);
	ga('.ftop_a_active_tab,#fmap_box_title_top').removeClass('active');
	el.addClass('active');
	
	var send = jAjax('/cmd.php', 'post', { 'cmd':'getnearbypeople' });
	send.done(function(d){
 
		var g = validateJson(d);
		console.log(g);
		if(g.length > 0){
		ga('.fmap_box_cnt').empty();
		for(var i =0; i < g.length;i++){
			var b = g[i];
		ga('.fmap_box_cnt').append('<div class="fmapbox_status_l" style="background-color:'+b.bg+'"><div class="f_left fmapbox_user_info_p"><img src="/getPhoto?p='+b.user_photo+'&sz=small"/></div><div class="fmabox_li_cnt lh140"><a class="bold" href="/user/'+b.user_id+'" hrefattr="true">'+b.user_fullname+'</a>&nbsp;'+lang.is_near_you.replace('%distance','<b>'+b.distance+'km</b>')+'&nbsp;'+b.time_ago+'.</div><div class="fmapbox_footer_nearby_loc">'+b.location+'</div></div>');
	
		}
		
		} else {
			
			ga('.fmap_box_cnt').html(fmapBoxNoData());
		}
		
	});
}