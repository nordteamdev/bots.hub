
ga(window).on('resize.makeResponsive', function(){
	setTimeout(function(){
var user_menu = ga('.left_sd_b_wht'), us_menu_control_btn = ga('.user_menu_control'),main_cont_col = ga('#mainContent');
 
 
 // restructure chat tabs
 if(!anonym_content && NODEJS_ENABLED) messenger_shortcut.restructureChatTabs();
 
 if(ga(window).width() >= 1130 && ga(window).width() <= 1250){
	 ga('#stl_left').addClass('responsive');
 } else if (ga(window).width() < 1130){
	 
	 ga('#stl_left').addClass('__nonei');
 } else {
	 ga('#stl_left').removeClass('responsive __nonei');
 }
 
 if(ga(window).width() <= 959 && !readCookie('window_alert_responsive')){
	 
	if(MOB_VIEW_ENABLED == '1'){
	
	modernPopup(function(confirm_btn,cnt,cancel_btn){
		
		
		confirm_btn.on('click', function(){
			 
			window.location.href=MOB_HOST;
		});
		
		cancel_btn.on('click.nlrio',function(){
			createCookie('window_alert_responsive',1,1);
			
		});
	},false,lang.no_responsive_please_go_to_mobile);
	
	}
	
	
	} else {
		
		ga('#sc_modern_popup').remove();
		
	}
 
 
   if(  isBodyRestive()  ) {
	    
	if( !ga('body').hasClass('css-1024') || !ga('body').hasClass('css-1200') || !ga('body').hasClass('css-1320')){
	

	//us_menu_control_btn.addClass('__on');
	main_cont_col.removeAttr('style');
	
	if( user_menu.hasClass('__collapsed') && !ga('html').hasClass('w1200'))
	user_menu.addClass('colapsedremoved').removeClass('__collapsed');

ga('.ft').addClass('ftmin');


	//if(ga('#profile_left_side_bar').hasClass('_hidden')) us_menu_control_btn.removeClass('__on');
  
		ga('#profile_left_side_bar .left_sd_b_wht').css('height',(ga(window).height() - 50)+'px');
	} else {
		ga('.ft').removeClass('ftmin');
		
	}
	
	
	// online hook
	if ( (ga('body').hasClass('css-1024') || ga('body').hasClass('css-1200') || ga('body').hasClass('css-1320')) && !ga('.nav_tool_friends_online').hasClass('_m') ){
		
		ga('.nav_tool_friends_online').addClass('_m enabled').prepend('<div class="hookonline_m"><span class="hookonline_m_txt"><span style="position: relative;    float: left;    left: 0;    bottom: 0;" class="ic-online"></span>&nbsp;Online users</span></div>');
				
		
		
	} 

	if( ga('body').hasClass('css-1024') || ga('body').hasClass('css-1200')  || ga('body').hasClass('css-1320') ){
		
	//	ga('.left_sd_b_wht').addClass('__collapsed');
		ga('.user_menu_control').hide();
		
		} 
		
		
		
	if (! (ga('body').hasClass('css-1024') || ga('body').hasClass('css-1200')|| ga('body').hasClass('css-1320')) ) {
		
			outFromtablet();
	} 
	
	
	//ga('.nav_tool_friends_online._m').click(function(e){
		ga('.hookonline_m').off('click').on('click', function(e){
		if(!ga('.online-fr_block').hasClass('onlinehook_m_show')){
			
		ga(this).addClass('fix')
		ga('.online-fr_block').addClass('onlinehook_m_show');
		
		} else {
			
		ga(this).removeClass('fix');
		
		ga('.online-fr_block').removeClass('onlinehook_m_show');
		}
		
	});

	
	
    } else {
		
		
		// no use responsive
		
		outFromtablet();
		 
		ga('.user_menu_control').hide();
		ga('.left_sd_b_wht').removeAttr('class').addClass('left_sd_b_wht');
		
		ga('html').removeClass('_min');
		
		
	//if( user_menu.hasClass('colapsedremoved') && !ga('html').hasClass('w1200')){
	//user_menu.removeClass('colapsedremoved').addClass('__collapsed');
	
	}
		
	///}
	if(  isBodyRestive()  ) {
	ga('.left_sd_b_wht').find('a').on('click.hideMenu',function(e){
		
		//if(us_menu_control_btn.hasClass('__on'))
			//us_menu_control_btn.trigger('click');
		
	});
	} else {
		ga('.left_sd_b_wht').find('a').off('click.hideMenu');
		
	}
	
	/*if(ga(window).width() >= 1223 && !ga('html').hasClass('_min'))
		ga('.user_menu_control').trigger('click');
	*/
	
	// show music icon in left menu
	if(ga('body').hasClass('css-320') || ga('body').hasClass('css-400') || ga('body').hasClass('css-480')) {
	
	ga('.lf_men._music').removeClass('__none');
   }else{ ga('.lf_men._music').addClass('__none');}
   
   
   },1000);
});


function outFromtablet(){
	
			ga('.left_sd_b_wht').removeClass('__collapsed');
		//ga('.user_menu_control').show();
		
		
		ga('.nav_tool_friends_online').removeClass('_m enabled');
		ga('.hookonline_m').remove();
}
 ga(document).ready(function() {
ga(window).trigger('resize.makeResponsive');
 });
//alert(ga(window).width());