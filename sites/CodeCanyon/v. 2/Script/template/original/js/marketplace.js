 
var market = new marketPlace();
	

function marketPlace() {
	var self = this;
	this.uploaded_images = 0;
	this.pictures_db = {};
	this.default_cover = false;
	this.body = $('body');
	
	
	
	
	

	
	this.editProduct = function(el,evt,id){
	self.pictures_db = {};
    self.uploaded_images = 0;
						ga('<div/>')
						.addClass('modal-new')
						.appendTo(ga('body'));
						ga('body').addClass('noscroll');
					var jb_ = new jBox('Modal',
					{
						appendTo: ga('.modal-new'),
						id:'jb_new_product',
						title: lang.Edit_product,
						overlay: false,
						fade: false,
						closeButton: 'box',
						'overflow': 'hidden',
						'fixed': false,
						blockScroll: true,
						height: 'auto',
						width: '600px',
						minHeight: '300px',
						position:
						{
							x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
							y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
						},
						offset:
						{
							x: 0,
							y: 30
						},onClose:function(){
							ga('#jb_new_product').remove();
							prn_modal();
						}
					}).open()
						.ajax(
						{
							type: 'POST',
							url: '/market.php',
							data:
							{
								cmd: 'edit-product',
								id: escape(id)
							},

							reload: true,
							setContent: false,
							success: function (data)
							{
								ga('#jb_new_product').find('.jBox-content').html( data === '0' ? '<div class="no_rows" id="no_apps"><div>'+lang.err_launch_app+'</div></div>' : data);
								ga('select').selectmenu();
								getUserLocation();
								var all_product_images = objHook(ga('#product_pics_count').html());
								 
								for(var i =0; i < all_product_images.length;i++)
								self.pictures_db[all_product_images[i]['id']] = all_product_images[i]['id'];
								 
							
								self.default_cover = ga('#product_edit_default_cover').val();
							
 
							}
						});
	},
	
	
	this.changeView = function(ev,el,c){
		el = ga(el);
		
		switch(c){
			
			case 1:
 
			el.closest('#marketplace').find('#list-icon').removeClass('selected');
			el.closest('#marketplace').find('#card-icon').addClass('selected');
			el.closest('#marketplace').find('.market_row_line').addClass('market_row').removeClass('market_row_line');
			createCookie('market_products_list_view', '', 1);
			break;
			
			case 2:
			el.closest('#marketplace').find('#list-icon').addClass('selected');
			el.closest('#marketplace').find('#card-icon').removeClass('selected');
			el.closest('#marketplace').find('.market_row').removeClass('market_row').addClass('market_row_line');
			createCookie('market_products_list_view', '10', 1);
			break;
			
			
		}
		
	},
	this.searchProducts = function(el,ev){
		ev.preventDefault();
		el = ga(el);
		/*var a_products = ga('#produts_listed_db'), s = {};
		
		s['cmd'] = 'search-products';
		s['key'] = escape(el.val()); 
		s['view_as'] = 'json';
		a_products.addClass('searching');
		var send = jAjax('/market.php', 'get', s);
		
		send.done(function(data){
			alert(data);
			    data = validateJson(data);
				a_products.addClass('__none');
				ga('#search_app_products').html(data.content);
		 
			
		});*/
		var k = el.val();
		
		if($.trim(k))
			ga('#market_search_a_href').attr('href','/market/products/search/'+urlencode(k)).trigger('click');
		else
			ga('#market_browse_products').trigger('click');
	},
    this.addProduct = function (el,evt) {
	self.pictures_db = {};
    self.uploaded_images = 0;
						ga('<div/>')
						.addClass('modal-new')
						.appendTo(ga('body'));
						ga('body').addClass('noscroll');
					var jb_ = new jBox('Modal',
					{
						appendTo: ga('.modal-new'),
						id:'jb_new_product',
						title: lang.Add_product,
						overlay: false,
						fade: false,
						closeButton: 'box',
						'overflow': 'hidden',
						'fixed': false,
						blockScroll: true,
						height: 'auto',
						width: '600px',
						minHeight: '300px',
						position:
						{
							x: 'center', // Horizontal Position (Use a number, 'left', 'right' or 'center')
							y: 'top' // Vertical Position (Use a number, 'top', 'bottom' or 'center')
						},
						offset:
						{
							x: 0,
							y: 30
						},onClose:function(){
							ga('#jb_new_product').remove();
							prn_modal();
						}
					}).open()
						.ajax(
						{
							type: 'POST',
							url: '/market.php',
							data:
							{
								cmd: 'new-product'
							},

							reload: true,
							setContent: false,
							success: function (data)
							{
								ga('#jb_new_product').find('.jBox-content').html( data === '0' ? '<div class="no_rows" id="no_apps"><div>'+lang.err_launch_app+'</div></div>' : data);
								ga('select').selectmenu();
								getUserLocation();
							}
						});
						
	  
    },
	this.changeLocation = function(el,ev){
		ev.preventDefault();
		el = ga(el);
		ga('#product_location').removeAttr('disabled readonly').get(0).select();
		ga('#product_location').trigger('keyup.searchforCountriesAndCities');
		
	}
	,
	this.placeProductRequiredField = function(ev,field){
		ev.preventDefault();
		var t = new Date().getTime();
		field.addClass('err_highlight').focus().on(endAnimationEvent() + '.marketnewproduct_'+t, function(e) {
			
			ga(this).removeClass('err_highlight');
		});
		return;
		
	},
	this.placeProduct = function(ev,el,form,product_id){
		ev.preventDefault();
		el = ga(el); // save button
		form = ga(form);
		
		var product_title = form.find('#item_name'),
			product_description = form.find('#item_description'),
			product_price = form.find('#item_price'),
			product_location = form.find('#product_location'),
			product_location_id = form.find('#location_id'),
			product_category = form.find('[name="product_category"]');
		
		
		if(!$.trim(product_title.val())){
			this.placeProductRequiredField(ev,product_title);
		} else if(!$.trim(product_description.val())){
			this.placeProductRequiredField(ev,product_description);
		} else if(!$.trim(product_price.val())){
			this.placeProductRequiredField(ev,product_price);
		} else if(!$.trim(product_location.val())){
			this.placeProductRequiredField(ev,product_location);
		} else if(!$.trim(product_location_id.val())){
			this.placeProductRequiredField(ev,product_location);
		} else if(!$.trim(product_category.val())){ 
			this.placeProductRequiredField(ev,ga('#'+product_category.attr('id')+'-button'));
		} else if(!self.default_cover){
			this.productErrMsg(ga('#product_add_err'),lang.product_need_cover);
		} else {
		
		
		var s_data = {};
		
		s_data['cmd'] = 'create-new-product';
		s_data['product_title'] = product_title.val();
		s_data['product_description'] = product_description.val();
		s_data['product_price'] = product_price.val();
		s_data['product_location'] = product_location.val();
		s_data['product_category'] = product_category.val();
		s_data['product_pictures'] = JSON.stringify(this.pictures_db);
		s_data['product_cover'] = self.default_cover;
		
		if(product_id)
			s_data['product_id'] = escape(product_id);
		
		el.text(lang.please_wait);
		var send = jAjax('/market.php', 'post', s_data);
		send.done( function(data){  
			
			if(data > 0){
				var link_to_product = ga('<a/>').attr({'href':'/market/product/'+data,'hrefattr':'true'});
				ga('#new_product_go').attr('href','/market/product/'+data).trigger('click');
 
				ga('#nohook_modal_close').trigger('click');
 
			} else {
				el.text(lang.save);
				displayErr(lang.somethingWrong);
			}
			
		});
		
	}
		
	},
	this.productErrMsg = function(el,msg){
		
		return el.show().html('<div class="msg_err _show">'+msg+'</div>');

	},
	this.deleteProductImage = function(el,fn){
		
		var pic_id = ga(el).data('pic-id');
		var s = {};
		s['cmd'] = 'deletePicture';
		s['id'] = escape(pic_id); 
		if(fn && !ga(el).hasClass('s3')){
			s['fname'] = ga(el).data('pic-filename');
		}
		
		var send = jAjax('/market.php', 'post', s);
		send.done(function(data){
			
		
			
			if(data == 1){
				ga(el).closest('.market_upload_images').remove();
				delete self.pictures_db[pic_id];
				
				if(self.default_cover == pic_id && Object.keys(self.pictures_db).length){
					self.default_cover = false;
					ga('#new_product_no_cover').show();
					
				}  
				
				if( !Object.keys(self.pictures_db).length ){
					ga('#market_new_photo_upload').show();
					ga('#market_ei_photos_wrap').hide();
				}else {
					ga('#market_new_photo_upload').hide();
					ga('#market_ei_photos_wrap').show();
				}
				 
			} else {
				return displayErr(lang.somethingWrong);
			}
		});
		
	},
	this.makeDefaultCover = function(evt){
		var el = ga(evt.target);
		var pic_id = el.data('pic-id'),
			fake_item_id = el.data('pic-fakeid');
		 
		 self.default_cover = pic_id;
		 ga('.market_upload_images').removeClass('cover');
		 el.closest('.market_upload_images').addClass('cover');
		 ga('#new_product_no_cover').hide();
	},
	this.addPictures = function(evt){
	
	evt.preventDefault();
		
	var files_input = ga(evt.target);
	var files = files_input[0].files;
	var input = evt.target;
	var count = 0;
	var totalFiles = files.length;
	var mt_rand = new Date().getTime();
	var is_cover = false;
	
	if(files_input.hasClass('for_cover')){
		
		is_cover = true;
	}
	
 
	var marketBuildUploadSkema = function(id,cover){
	 
		return '<div class="market_upload_images '+ (cover ? 'cover' : '') +'" id="mk_upload_product"><a class="product_make_cover_image" onclick="market.makeDefaultCover(event);" href="javascript:void(0);">&nbsp;</a><a class="ui_thumb_x_button ui_thumb_small_x" id="delete_product_picture" onclick="market.deleteProductImage(this,1);" href="javascript:void(0);"><i class="ui_thumb_x"></i></a><div class="upload_bar_percent_redesign"></div><div class="market_file_name ellip">'+files[id].name+'</div><img class="market_new_pictures" /><div class="market_picture_is_cover">'+lang.cover+'</div></div>';
		
	}



	
	var readPhotos = function (o)
	{
		if(!ga('.market_upload_images').length)
		ga('#market_new_photo_upload').hide().after(marketBuildUploadSkema(o,1));
	 else
		ga('.market_upload_images:last').after(marketBuildUploadSkema(o));
		

		var container = ga('#mk_upload_product');
		var output = container.find('img')[0];
		if (container.length)
		{
			var reader = new FileReader();
			reader.onload = function ()
			{
				var dataURL = reader.result;
				if (container.length == 0) return false;
				output.src = dataURL;
				
				 
				
				container.find('.__uploadingInfo')
					.addClass('__off');
				container.find('.uploading_ovr')
					.addClass('__on');
			};
			reader.readAsDataURL(files[o]);
		}
	}

 
	
	var trigger_upForm = function ()
	{
		if (typeof files[count] === 'undefined' || count > totalFiles - 1)
		{

			return false;
		}
		
	 
	if(Object.keys(self.pictures_db).length > 4){ 
		return ga('#new_product_photos_limit').show();
	} else {
		 
		ga('#new_product_photos_limit').hide();
	}
		
		
    var formData = new FormData();
	formData.append('files[]', files[count]);
	formData.append('cmd', 'upload-images');
 

		$.ajax(
		{
			url: '/market.php', //Server script to process data
			type: 'POST',
			xhr: function ()
			{ // Custom XMLHttpRequest
				var Xhr = $.ajaxSettings.xhr();
				if (Xhr.upload)
				{ // Check if upload property exists
					Xhr.upload.addEventListener('progress', function (e)
					{
							var upload_percentage = ajaxuploadprogress(e);
							
							ga('#mk_upload_product').find('.upload_bar_percent_redesign').css({'width':upload_percentage+'%','display':'inline'});
							
					}, false); // For handling the progress of the upload
				}
				return Xhr;
			},
			//Ajax events
			beforeSend: function ()
			{
				
				
				if(!validateUpload(input)){
				jqXHR.abort();
				return displayErr(lang.up_invalid_file_ext.replace('%s', _st.photoTypes));
				} else {
					
				readPhotos(count);
				ga('#mk_upload_product').find('.upload_bar_percent_redesign').css({'width':'0%'});
 
				
		 
					
				}
				
			},
			success: function (data)
			{ 
			self.uploaded_images++;
			var container = ga('#mk_upload_product');
		 
			ga('#market_ei_photos_wrap').fadeIn();
			
		 
				var response = validateJson(data);
				if (response['status'] === 'OK')
				{
					
					
					if (container.length)
					{
						container.find('#delete_product_picture').attr({'data-pic-id' : response.photoid, 'data-pic-filename':response.filename});
						container.find('.product_make_cover_image').attr({'data-pic-id' : response.photoid, 'data-pic-fakeid':response.fake_item_id});
						if(response.s3 == 'yes'){
							container.find('#delete_product_picture').addClass('s3');
						}
						container.find('img')[0].src = response.small_image_url;
						container.removeAttr('id');
						self.pictures_db[response.photoid] = response.photoid;
						
						if(is_cover) self.default_cover = response.photoid;
						
						 
					}
					setTimeout(function ()
					{
						count++;
						trigger_upForm();
					}, 50);
				}
				else
				{ return displayErr(data);}
			},
			error: function ()
			{
				return displayErr(lang.somethingWrong)
			},
			// Form data
			data: formData,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});
	}
	trigger_upForm();
		
		
	},
	
	this.viewProductInDOM = function(){
		
 
		
		
		
		
		
		
		
        var thumbnailsUpdated,
            timeout_x, timeout_y;


 

            $('#marketplace_gallery').nobleSlider({
				_INITIAL_ACTIVE_SLIDE: $('.nb-slide._active').index(),
                _SLIDER_BEZIER_ENGINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
                _SLIDE_ANIMATION_DURATION: 600, // miliseconds
                _TOUCH_SWIPE_TRESHOLD: 10,
                _TOUCH_SWIPE_SPEED_RATIO: 0.94,
                _IMAGE_SCALE_MODE: 'fit-for-bigger',
                _DEEP_LINKING: false,
                _SLIDER_WIDTH: '100%',
                _SLIDER_HEIGHT: 510,
                _SLIDE_FADE: false,
                _FADE_ARROWS: false,
                _FADE_FULL_SCREEN_BUTTON: false,
                _SLIDE_LOOP: false,
                _ENABLE_ARROWS: true,
                _ENABLE_PAGINATION: false,
                _AUTO_PLAY_SLIDE: false,
                _AUTO_PLAY_DELAY: 5000,
                _AUTO_PLAY_DIRECTION: 'normal',
                _AUTO_PLAY_HOVER: 'pause', // 'pause', 'stop' or 'none'.
                _ALLOW_FULL_SCREEN: true,
                _LARGE_IMAGES_ON_FULL_SCREEN: true,
                _IMG_SMALL_SIZE: 500,
                _IMG_MEDIUM_SIZE: 1600,
                _IMG_LARGE_SIZE: 3000,
                _THUMB_ARROWS_FADE: true,
                _THUMBS_CONTAINER_SIZE: 168,
                _THUMB_SIZE_WIDTH: 20,
                _THUMB_SIZE_HEIGHT: 20,
                _THUMB_ENABLE_ARROWS: true,
                _THUMB_ARROWS_ASSIGN_TO: $('#marketplace_gallery'),
                _SLIDE_ADJUST_RESIZE: {

                    360: {
                        _SLIDER_WIDTH: 510,
                    },
                    700: {
                        _SLIDER_HEIGHT: 220
                    },
                    900: {
                        _SLIDER_HEIGHT: 420
                    }

                },
                // callbacks
                _CLBK_WHEN_SLIDE_COMPLETE: function() {
                    var currSlideImage = $('.nb__active').find('.nb-image');
                    $('#baron_download_btn').attr('href', currSlideImage.attr('data-large').length != 0 ? currSlideImage.attr('data-large') : currSlideImage.attr('src'));
                },
                _CLBK_THUMB_HOVER_IN: function() {

                    clearTimeout(timeout_x);
                    clearTimeout(timeout_y);
                    var thumbArrows = $('.nb-thumbnail-arrows');
                    var $boss = $('#marketplace_gallery');
                    var thumbsCont = $boss.find('.nb-thumbnails-container');
                    $boss.addClass('__activeThumbs');
                    thumbsCont.addClass('__hover');

                    thumbArrows.hover(
                        function(e) {
                            clearTimeout(timeout_x);
                        },
                        function() {
                            clearTimeout(timeout_x);
                            clearTimeout(timeout_y);
                            timeout_y = setTimeout(function() {
                                thumbsCont.trigger('mouseout')
                            }, 300)
                        });

                    this.st._THUMB_SIZE_WIDTH = 50;
                    this.st._THUMB_SIZE_HEIGHT = 50;
                    this.st._THUMBS_CONTAINER_SIZE = 50 * 5;

                    if (!thumbnailsUpdated) {
                        $('#marketplace_gallery').nobleSlider('_thumbsWUpdate');
                        $('#marketplace_gallery').nobleSlider('_thumbnailsOnResize');
                        thumbnailsUpdated = true;
                    }

                },
                _CLBK_THUMB_HOVER_OUT: function() {

                    var $this = this,
                        $boss = $('#marketplace_gallery'),
                        thumbsCont = $boss.find('.nb-thumbnails-container');


                    timeout_x = setTimeout(function() {
                        $boss.removeClass('__activeThumbs');
                        thumbsCont.removeClass('__hover');
                        thumbnailsUpdated = false;

                        $this.st._THUMB_SIZE_WIDTH = 20;
                        $this.st._THUMB_SIZE_HEIGHT = 20;
                        $this.st._THUMBS_CONTAINER_SIZE = 168;

                        $('#marketplace_gallery').nobleSlider('_thumbsWUpdate');
                        $('#marketplace_gallery').nobleSlider('_thumbnailsOnResize');

                    }, 1000);

                }
            });
			
		setTimeout(function(){

     self.preparePageForProduct();
		
		},2000);
		
		
		// get comments
		//ga('#product-item-details-comments-section');
		
 
 
		var $author_id = ga('#id_product_for_comments').val();
		var $item_id = ga('#id_product_for_comments').val();
 
		commentsWidget($item_id,
								ga('#product-view-load-comments'),
								'market_product',
								{'width':'80%','height':'auto','min-height':20,'overflow':'hidden','padding':'3px 7px'},
								'',
								ga('#product-item-details-comments-section'),$author_id,30,0);
								

		
	},
	this.preparePageForProduct = function(){
		
		
	var online_hook = ga('.online-fr_block'), u_glob_left_MENU = ga('#profile_left_side_bar');
	
 
		 
		 
		
 
		var top_bar = ga('.toolbar');
		
		
		var css = {
			
			'width': ga(window).width() - ga('.nav_tool_friends_online').width(),
			'min-height': ga(window).height() - top_bar.height(),
			'top': top_bar.height(),
			'margin-bottom': '40px',
			'position':'relative',
			'float':'left',
			'background-color':'#fff'
 
			
		};
 
		

		ga('html').addClass('market-view-product').removeClass('page-w1320');
		ga('#mainContent').removeClass('full_width').css(css);
 
		$('#marketplace_gallery').nobleSlider('resize');
		
		var comm_sticky = ga('.comments-p-sticky');					
		setTimeout(function(){

				comm_sticky.css('min-width',comm_sticky.closest('.product-details-sides').width()+'px');
		},10);		
		
		$(window).off('resize.preparePageForProduct').on('resize.preparePageForProduct',function(){
			setTimeout(function(){
			self.preparePageForProduct();
			},1500);
		});
		
	},
	this.viewProductInDOM_QUIT = function(){
		ga('html').removeClass('market-view-product');
		ga('#mainContent').removeAttr('style');
	},
	this.closeProductPopup = function(e){
		e.preventDefault();
		e.stopPropagation();
		ga('body').removeClass('__noScrollable').find('#window_market_product_view').remove();
		createUrl('', '', prev_url);
	},
	this.toggleMinimizedFilters = function(ev,el){
		
		el = ga(el);
		
		if(el.parent().hasClass('ui_rmenu_item_expanded')){
			
			el.parent().removeClass('ui_rmenu_item_expanded');
		}else{
			el.parent().addClass('ui_rmenu_item_expanded');
		}
		
	},
	this._jj = function(a){
 
	return $('#market_submit_filter').find(a);
	},
	this.s_escape = function (b){
	
	return $.trim(b.val());
	
	},
 
	this.searchFilter = function(){
 
	// order
	ga(document).off('selectmenuchange.MarketFilterORder').on( "selectmenuchange.MarketFilterORder", '#market-filter-order', function( ev, ui ) { 
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_order = $('[name="order"]'), _val = $.trim(ui.item.value);
		_search_filter_order.val( _val );
		self._sQuery('order');
	});
	
	
	// category
	ga(document).off('selectmenuchange.MarketFilterCateg').on( "selectmenuchange.MarketFilterCateg", '#market-filter-category', function( ev, ui ) {  
		ev.preventDefault();ev.stopImmediatePropagation();
		var _search_filter_categ = $('[name="category"]'), _val = $.trim(ui.item.value);
		_search_filter_categ.val( _val );
		self._sQuery('category');
	});
	
	// price from
	ga(document).off('blur.MarketFilterPriceFrom').on( "blur.MarketFilterPriceFrom", '[name="price_from"]', function( ev ) {  
	
		ev.preventDefault();ev.stopImmediatePropagation();
		 
		ga(this).val( $.trim(ga(this).val()) );
		self._sQuery('price_from');
	});
		
	// price to
	ga(document).off('blur.MarketFilterPriceTo').on( "blur.MarketFilterPriceTo", '[name="price_to"]', function( ev ) {  
	
		ev.preventDefault();ev.stopImmediatePropagation();
		 
		ga(this).val( $.trim(ga(this).val()) );
		self._sQuery('price_to');
	});
	// location
	ga(document).off('blur.MarketFilterLocation').on( "blur.MarketFilterLocation", '[name="location_name"]', function( ev ) {  
	var el = ga(this);
		ev.preventDefault();ev.stopImmediatePropagation();
		 setTimeout(function(){
		el.val( el.val() );
		self._sQuery('location_name');
		 },500);
	});
	},
	this._sQuery = function(mode){
	
	var _s_query = {},
 
	_a_search_btn = $('#market_trigger_filter_query'),
	_sf_order = self._jj('[name="order"]'),
	_sf_category = self._jj('[name="products_category"]'),
	_sf_price_from = self._jj('[name="price_from"]'),
	_sf_price_to = self._jj('[name="price_to"]'),
	_sg_location = self._jj('[name="location_name"]');

	_s_query['cmd'] = 'filter';
	//_s_query['view_as'] = 'json';
 
	if( self.s_escape(_sf_order) )
		_s_query['order'] = self.s_escape(_sf_order);
	
	if( self.s_escape(_sf_category) )
		_s_query['category'] = self.s_escape(_sf_category);	

	
	if( self.s_escape(_sf_price_from) )
		_s_query['price-from'] = self.s_escape(_sf_price_from);	
	
	if( self.s_escape(_sf_price_to) )
		_s_query['price-to'] = self.s_escape(_sf_price_to);	
	
 
		if( $.trim(_sg_location.val()) ){
		
		_s_query['location'] = (_sg_location.val());
	
	}
	
 
 
	$('#market-loading-query').addClass('__searching');
	 
	_a_search_btn.removeClass('reloadwall').addClass('reloadwall').removeAttr('href').attr('href','/market?'+$.param(_s_query)).trigger('click');
	console.log('/market?'+$.param(_s_query));
 
	
	},
	this.popupNextPrev = function(e,obj){
		
	e.preventDefault();
	e.stopImmediatePropagation();
	if (this._in)
	{
		return;
	}
	var _this = this;
	var $this = $(obj);
	var $b = $('body');
	var g = generateUrl($this[0]);
	this._in = 1;
	var call_pd = jAjax(g[0], 'post', g[1] + '&type=pos&nop=1');
	call_pd.done(function (data)
	{ 
		_this._in = 0;
		createUrl('', '', $this.attr('href'));
		if (data == 0) return displayErr(lang.sorry_product_was_not_found);
		else
		{
			var $data = ga(data);
			var post_scrl = $('#window_market_product_view')
				.find('.media-layer_hld');
			post_scrl.html($data);

			
			
			
			
				// add comments
				var $author_id = ga('#window_market_product_view #id_product_for_comments').val();
				var $item_id = ga('#window_market_product_view #id_product_for_comments').val();
		 
				commentsWidget($item_id,
										ga('#window_market_product_view #product-view-load-comments'),
										'market_product',
										{'width':'80%','height':'auto','min-height':20,'overflow':'hidden','padding':'3px 7px'},
								        ga('#window_market_product_view').find(':scrollable'),
										'#popup_product_details',$author_id,30,0);
				var comm_sticky = ga('#window_market_product_view .comments-p-sticky');					
				setTimeout(function(){

						comm_sticky.css('min-width',comm_sticky.closest('#product-item-details-comments-section').width()+'px');
				},10);	
				
				// price format
				priceFormat();
				// close popup
				$data.find('.media-layer_close').off('click.closeProductPopup').on('click.closeProductPopup', function(e){
					self.closeProductPopup(e);
				});
			
		}
	});
		
	},
	this.openProductViaPopup = function(el,e,product_id){
			ajaxLoading();
			var $this = ga(el);
			var send = jAjax('/market.php', 'post', {'cmd':'open-product-via-popup','id':product_id});
			
			send.done(function(data){
				removeAjaxLoad();
				var $data = ga(data);
				ga('body').addClass('__noScrollable').prepend($data);
				
				createUrl('', '', $this.attr('href'));
				// add comments
				var $author_id = ga('#window_market_product_view #id_product_for_comments').val();
				var $item_id = ga('#window_market_product_view #id_product_for_comments').val();
		 
				commentsWidget($item_id,
										ga('#window_market_product_view #product-view-load-comments'),
										'market_product',
										{'width':'80%','height':'auto','min-height':20,'overflow':'hidden','padding':'3px 7px'},
								        ga('#window_market_product_view').find(':scrollable'),
										'#popup_product_details',$author_id,30,0);
				var comm_sticky = ga('#window_market_product_view .comments-p-sticky');					
				setTimeout(function(){

						comm_sticky.css('min-width',comm_sticky.closest('#product-item-details-comments-section').width()+'px');
				},10);	
				
				// price format
				priceFormat();
				// close popup
				$data.find('.media-layer_close').off('click.closeProductPopup').on('click.closeProductPopup', function(e){
					self.closeProductPopup(e);
				});
				
			});
	}
	,
	this.popupSelectThumb = function (el,ev){
		
		ev.preventDefault();
		
		el = ga(el);
		
		if(!el.hasClass('active')) {
			
			ga('.window_prodcut_thumb.active').removeClass('active');
			ga('#market_item_photo').attr('src', el.data('large-src'));
			el.addClass('active');
			
			
		}
		
		
	},
	this.showBigPhoto = function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		var product_cnt = ga('.window-market-product-cnt');
		var product_act_image = ga('#market_item_photo');
		
		var w = ga(window).width() - 150;
		var h = ga(window).height();
		
		product_cnt.hide();
		
		product_cnt.before(
			'<div id="window_product_popup_bigimage" style="width:'+w+'px;height:'+h+'px;" class="window_product_popup_bigimage"><img src="'+product_act_image.attr('src')+'" /><div class="ic media-layer_close_ico" onclick="market.closeBigPhoto(event);"></div></div>'
		
		);
		
		ga(window).off('keyup.closeProductBigImage').on('keyup.closeProductBigImage', function(e){
			
			if(e.keyCode == 27) self.closeBigPhoto(e);
		});
		
	},
	this.closeBigPhoto = function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		var product_cnt = ga('.window-market-product-cnt');
		ga('#window_product_popup_bigimage').remove();
		product_cnt.show();
		
	},
	this.addProductToFav = function(ev,el,id,t){
		ev.preventDefault();
		ev.stopPropagation();
		var b = {};
		b['cmd'] = 'add-to-favorites';
		b['id'] = escape(id);
		
		ajaxLoading();
		var send = jAjax('/market.php', 'post', b);
		
		send.done(function(d){
		removeAjaxLoad();
			
			
			d = validateJson(d);
			
			if(d.succ == '1'){
				
				if(d.mode == 'removed'){
					
					ga(el).removeClass('selected');
					if(!t) ga(el).find('.market_fav_btn_text').text(lang.Add_produt_to_fav);
					if(t) ga(el).closest('.market_row').removeClass('_isfav');
				} else {
					ga(el).addClass('selected');
					if(!t) ga(el).find('.market_fav_btn_text').text(lang.product_is_in_fav);
					if(t) ga(el).closest('.market_row').addClass('_isfav');
				}
				
			} else {
				return displayErr(lang.somethingWrong);
			}
			
		});
	},
	this.deleteProduct = function(el,evt,id){
		var s = {};
		s['cmd'] = 'delete-product';
		s['id'] = escape(id);
		
		
		confirm_act(lang.are_you_sure_you_want_to_delete_product, function (event)
		{
		var send = jAjax('/market.php', 'post', s);
		send.done(function(data){  
			switch(data){
				
				
				case 'success':
				ga('#market_item'+id).css('opacity','0.5').slideUp(function(){ga(this).remove()});
				break;
				
				case 'not_found':
				displayErr(lang.sorry_product_was_not_found);
				break;
				
				case 'unknown':
				default:
				displayErr(lang.somethingWrong);
				break;
				
			}
			
		});
		
		});
	}

	
  }

 