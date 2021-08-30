// search bar
$('#open_header_search').on('click', function(event) {
	event.preventDefault();
	$('body').addClass('search_open');
	$('.search-container').find('.search-input').focus();
	
});
$('#close_header_search').on('click', function(event) {
	event.preventDefault();
	$('body').removeClass('search_open');
});