function removeItemPgFromMyColl(el,event){
	
	el = ga(el);
	var page_id = escape(el.attr('rel'));
	var page_type = escape(el.attr('rel-categ'));
	var send = jAjax('/cmd.php', 'post', {'cmd':'removePageItemFromColl','page_id':page_id, 'type':page_type });
	send.done(function(d){
		
		if(d == 1){
			
			if(ga('.movies_pg').length){
				
				
				if(el.hasClass('author')){
					el.closest('.movie_pg_li').fadeOut(function(){ga(this).remove()});
				
				}else{
				
					el.hide();
					el.parent().find('#bmv-pg-sub-btn-add').show();
				}
				
				
				
			} else if( ga('html').hasClass('bookspg')) {
				
				
				if(el.hasClass('author')){
					el.closest('.prof_book_item').fadeOut(function(){ga(this).remove()});
					ga('.tipsy').remove();
				}else{
				
					el.hide();
					el.parent().find('#bmv-pg-sub-btn-add').show();
				}
				
				
				
			} else {
				
			el.hide();
			el.parent().find('#bmv-pg-sub-btn-add').show();
			
			}
			
		} else {
			
			
			return displayErr(lang.err_tehnic);
		}
		
	});
	
}

function addItemPgToMyColl(el,event){
	
	el = ga(el);
	var page_id = escape(el.attr('rel'));
	var sdata = JSON.stringify(el.data('send'));
	
	var send = jAjax('/cmd.php', 'post', {'cmd':'addPageItemToMyColl','sdata': sdata});
	send.done(function(d){
		
		if(d == 1){
			
			el.hide();
			el.parent().find('#bmv-pg-sub-btn-remove').show();
		} else {
			
			
			return displayErr(lang.err_tehnic);
		}
		
	});
	
	
}