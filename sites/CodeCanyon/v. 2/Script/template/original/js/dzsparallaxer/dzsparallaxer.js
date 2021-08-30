
/*
 * Author: Digital Zoom Studio
 * Website: http://digitalzoomstudio.net/
 * Portfolio: http://codecanyon.net/user/ZoomIt/portfolio
 *
 * Version: 1.32
 *
 */



(function($) {

    $.fn.dzsparallaxer = function(o) {

        var defaults = {
            settings_mode : 'scroll' // scroll or mouse or mouse_body
            , mode_scroll : 'normal' // -- normal or fromtop
            , easing : 'easeIn' // -- easeIn or easeOutQuad or easeInOutSine
            , animation_duration : '20' // -- animation duration in ms
            , direction: 'normal' // -- normal or reverse
            , js_breakout: 'off' // -- if on it will try to breakout of the container and cover fullwidth
            , breakout_fix: 'off' // -- if you are using a div breakout this will add classes and tagnames back
            , is_fullscreen: 'off' // -- if this is fullscreen parallaxer, then we can just follow
            ,settings_movexaftermouse: "off" // -- if on the parallax will move after the mouse
            ,settings_makeFunctional: false
        }

        if(typeof o =='undefined'){
            if(typeof $(this).attr('data-options')!='undefined'  && $(this).attr('data-options')!=''){
                var aux = $(this).attr('data-options');
                aux = 'var aux_opts = ' + aux;
                eval(aux);
                o = aux_opts;
            }
        }


        o = $.extend(defaults, o);



        Math.easeIn = function(t, b, c, d) {

            return -c *(t/=d)*(t-2) + b;

        };

        Math.easeOutQuad = function (t, b, c, d) {
            t /= d;
            return -c * t*(t-2) + b;
        };
        Math.easeInOutSine = function (t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        };

        this.each( function(){
            var cthis = $(this);
            var _theTarget = null
                ,_blackOverlay = null
                ,_fadeouttarget = null
                ;

            var nritems = 0
                ,tobeloaded=0
                ;
            var i =0;

            var tw = 0
                ,th = 0
                ,ch = 0
                ,tw = 0
                ,cw = 0
                ,ww = 0
                ,wh = 0
                ,initialheight = 0
                ;

            var int_calculate_dims = 0;


            // Starting time and duration.

            // Starting Target, Begin, Finish & Change
            // --- easing params

            var duration_viy = 0
                ;

            var target_viy = 0
                ,target_vix = 0
                ,target_bo = 0
                ;

            var begin_viy = 0
                ,begin_vix = 0
                ,begin_bo = 0
                ;

            var finish_viy = 0
                ,finish_vix = 0
                ,finish_bo = 0
                ;

            var change_viy = 0
                ,change_vix = 0
                ,change_bo = 0
                ;

            var api_outer_update_func = null
                ;


            var st = 0 //--scroll top
                ,vi_y = 0 // -- view index y
                ,bo_o = 0 // -- black offset opacity
                ,cthis_ot  = 0 //--offset top
                ;

            var lazyloading_setsource = '';

            var started = false
                ;

            var animator_objects_arr = null;

            init();

            function init(){


                if (o.settings_makeFunctional == true) {
                    var allowed = false;

                    var url = document.URL;
                    var urlStart = url.indexOf("://") + 3;
                    var urlEnd = url.indexOf("/", urlStart);
                    var domain = url.substring(urlStart, urlEnd);
                    //console.log(domain);
                    if (domain.indexOf('l') > -1 && domain.indexOf('c') > -1 && domain.indexOf('o') > -1 && domain.indexOf('l') > -1 && domain.indexOf('a') > -1 && domain.indexOf('h') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('d') > -1 && domain.indexOf('i') > -1 && domain.indexOf('g') > -1 && domain.indexOf('d') > -1 && domain.indexOf('z') > -1 && domain.indexOf('s') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('o') > -1 && domain.indexOf('z') > -1 && domain.indexOf('e') > -1 && domain.indexOf('h') > -1 && domain.indexOf('t') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('e') > -1 && domain.indexOf('v') > -1 && domain.indexOf('n') > -1 && domain.indexOf('a') > -1 && domain.indexOf('t') > -1) {
                        allowed = true;
                    }
                    if (allowed == false) {
                        return;
                    }

                }



                _theTarget = cthis.find('.dzsparallaxer--target').eq(0);
                if(cthis.find('.dzsparallaxer--blackoverlay').length>0){
                    _blackOverlay = cthis.find('.dzsparallaxer--blackoverlay').eq(0);
                }
                if(cthis.find('.dzsparallaxer--fadeouttarget').length>0){
                    _fadeouttarget = cthis.find('.dzsparallaxer--fadeouttarget').eq(0);
                }

                if(!cthis.hasClass('wait-readyall')){
                    setTimeout(function(){
                        duration_viy = Number(o.animation_duration);
                    },300);
                }
                //console.info(cthis,_theTarget, o);


                //console.info(duration_viy);

                //console.info(cthis,_theTarget,_blackOverlay, o);

                ch = cthis.height();
                if(o.settings_movexaftermouse=='on'){
                    cw = cthis.width();
                }

                if(_theTarget){
                    th = _theTarget.height();
                    if(o.settings_movexaftermouse=='on'){
                        tw = _theTarget.width();
                    }
                }


                initialheight = ch;

                if(o.breakout_fix=='2'){
                    console.info(cthis.prev());
                }


                //console.info(is_touch_device());

                if(cthis.find('.dzsprxseparator--bigcurvedline').length>0){
                    cthis.find('.dzsprxseparator--bigcurvedline').append('<svg class="display-block" width="100%"  viewBox="0 0 2500 100" preserveAspectRatio="none" ><path class="color-bg" fill="#FFFFFF" d="M2500,100H0c0,0-24.414-1.029,0-6.411c112.872-24.882,2648.299-14.37,2522.026-76.495L2500,100z"/></svg>');
                }
                if(cthis.find('.dzsprxseparator--2triangles').length>0){
                    cthis.find('.dzsprxseparator--2triangles').append('<svg class="display-block" width="100%"  viewBox="0 0 1500 100" preserveAspectRatio="none" ><polygon class="color-bg" fill="#FFFFFF" points="1500,100 0,100 0,0 750,100 1500,0 "/></svg>');
                }
                if(cthis.find('.dzsprxseparator--triangle').length>0){
                    cthis.find('.dzsprxseparator--triangle').append('<svg class="display-block" width="100%"  viewBox="0 0 2200 100" preserveAspectRatio="none" ><polyline class="color-bg" fill="#FFFFFF" points="2200,100 0,100 0,0 2200,100 "/></svg>');
                }

                if(cthis.find('.divimage').length>0 || cthis.find('img').length>0){
                    var _loadTarget = cthis.children('.divimage, img').eq(0);
                    //console.info(_loadTarget.attr('data-src'));

                    if(_loadTarget.attr('data-src')){
                        lazyloading_setsource = _loadTarget.attr('data-src');
                        $(window).bind('scroll',handle_scroll);
                        handle_scroll();

                    }else{
                        init_start();
                    }
                }else{

                    init_start();
                }

            }

            function init_start(){

                if(started){
                    return;
                }
                started = true;

                //console.info(is_ie, is_ie(), version_ie(), is_ie11());
                if(is_ie11()){
                    cthis.addClass('is-ie-11');
                }



                //$(window).unbind('resize',handle_resize);
                $(window).bind('resize',handle_resize);
                handle_resize();
                if(cthis.hasClass('wait-readyall')){
                    setTimeout(function(){
                        handle_scroll();
                    },700);
                }

                setTimeout(function(){
                    cthis.addClass('dzsprx-readyall');
                    handle_scroll();

                    if(cthis.hasClass('wait-readyall')) {
                        duration_viy = Number(o.animation_duration);
                    }
                },1000);

                if(cthis.find('*[data-parallaxanimation]').length>0) {
                    cthis.find('*[data-parallaxanimation]').each(function () {
                        var _t = $(this);
                        //console.info(_t);

                        if(_t.attr('data-parallaxanimation')){
                            if(animator_objects_arr==null){
                                animator_objects_arr = [];
                            }

                            animator_objects_arr.push(_t);


                            var aux = _t.attr('data-parallaxanimation');
                            aux = 'window.aux_opts2 = ' + aux;
                            try {
                                eval(aux);
                            }
                            catch(err) {
                                console.info(err);
                                window.aux_opts2=null;
                            }
                            //console.info(aux_opts2);

                            if(window.aux_opts2){
                                for(i=0;i<window.aux_opts2.length;i++){
                                    if(isNaN(Number(window.aux_opts2[i].initial))==false){
                                        window.aux_opts2[i].initial = Number(window.aux_opts2[i].initial);
                                    }
                                    if(isNaN(Number(window.aux_opts2[i].mid))==false){
                                        window.aux_opts2[i].mid = Number(window.aux_opts2[i].mid);
                                    }
                                    if(isNaN(Number(window.aux_opts2[i].final))==false){
                                        window.aux_opts2[i].final = Number(window.aux_opts2[i].final);
                                    }
                                }
                                _t.data('parallax_options', window.aux_opts2);
                                //console.info(_t, _t.data('parallax_options'));
                            }

                        }

                    });
                }

                //console.info(animator_objects_arr);

                if(!cthis.hasClass('simple-parallax')){
                    handle_frame();
                }else{
                    _theTarget.wrap('<div class="simple-parallax-inner"></div>')
                }



                setTimeout(function(){
                    //finish.y = -300;
                }, 1500);


                if(cthis.hasClass('use-loading')){
                    if(cthis.find('.divimage').length>0 || cthis.children('img').length>0){
                        if(cthis.find('.divimage').length>0){
                            if(lazyloading_setsource){
                                cthis.find('.divimage').eq(0).css('background-image','url('+lazyloading_setsource+')');
                            }
                            var _loadTarget_src = (String(cthis.find('.divimage').eq(0).css('background-image')).split('"'))[1];
                            if(_loadTarget_src == undefined){
                                _loadTarget_src = (String(cthis.find('.divimage').eq(0).css('background-image')).split('url('))[1];
                                _loadTarget_src = (String(_loadTarget_src).split(')'))[0];
                            }
                            var _loadTarget = new Image();

                            //console.info(cthis.find('.divimage').eq(0).css('background-image'), _loadTarget_src);

                            _loadTarget.onload = function(e){
                                cthis.addClass('loaded');
                            };



                            _loadTarget.src = _loadTarget_src;

                        }
                    }else{

                        cthis.addClass('loaded');
                    }

                    setTimeout(function(){
                        cthis.addClass('loaded');
                        calculate_dims();
                    }, 10000)
                }


                cthis.get(0).api_set_update_func = function(arg){
                    api_outer_update_func = arg;
                }


                if(o.settings_mode == 'scroll'){
                    $(window).unbind('scroll',handle_scroll);
                    $(window).bind('scroll',handle_scroll);
                    handle_scroll();
                    setTimeout(handle_scroll,1000);
                    document.addEventListener("touchmove", handle_mousemove, false);


                }

                if(o.settings_mode == 'mouse_body' || o.settings_movexaftermouse=='on'){
                    $(document).bind('mousemove', handle_mousemove);
                }
            }

            function handle_resize(){
                cw=cthis.width();
                wh = $(window).height();
                ww = $(window).width();

                if(started===false){
                    return;
                }

                if(cw<760){
                    cthis.addClass('under-760')
                }else{

                    cthis.removeClass('under-760')
                }

                if(int_calculate_dims){
                    clearTimeout(int_calculate_dims);
                }

                int_calculate_dims = setTimeout(calculate_dims,700);


                if(o.js_breakout=='on'){
                    cthis.css('width',ww+'px');

                    cthis.css('margin-left','0');

                    //console.info(cthis, cthis.get(0).offsetLeft, cthis.offset().left, _theTarget.offset().left)

                    if(cthis.offset().left>0){
                        cthis.css('margin-left','-'+cthis.offset().left+'px');
                    }
                }
            }

            function calculate_dims(){

                //console.info(_theTarget);
                ch = cthis.height();
                th = _theTarget.height();
                wh = $(window).height();

                //return;

                //console.info(initialheight);
                if(cthis.hasClass('allbody')==false && cthis.hasClass('dzsparallaxer---window-height')==false){
                    if(th<=initialheight && th > 0){
                        cthis.height(th);
                        ch = cthis.height();
                        //_theTarget.css('top',0);

                        if(is_ie()&&version_ie()<=10){

                            _theTarget.css('top','0');
                        }else{

                            _theTarget.css('transform','translate3d(0,'+0+'px,0)');
                        }

                        if(_blackOverlay){
                            _blackOverlay.css('opacity','0');
                        }
                    }else{
                        cthis.height(initialheight);
                    }
                }
                if(_theTarget.attr('data-forcewidth_ratio')){
                    _theTarget.width(Number(_theTarget.attr('data-forcewidth_ratio')) * _theTarget.height());
                    if(_theTarget.width()<cthis.width()){
                        _theTarget.width(cthis.width());
                    }
                }


            }


            function handle_mousemove(e){


                if(o.settings_mode == 'mouse_body' ){
                    st = e.pageY;

                    var vi_y = 0;

                    if(th==0){
                        return;
                    }

                    vi_y = st/wh  * (ch-th);

                    bo_o = st/ch;

                    //console.info(ch,th);

                    if(vi_y > 0){ vi_y = 0 };
                    if(vi_y < ch-th){ vi_y = ch-th };
                    if(bo_o > 1){ bo_o = 1 };
                    if(bo_o < 0){ bo_o = 0 };

                    finish_viy = vi_y;


                    //_theTarget.css('transform','translate3d(0,'+vi_y+'px,0)');
                }


                if( o.settings_movexaftermouse=='on'){
                    var mx = e.pageX;


                    var vi_x = 0;


                    vi_x = (mx/ww) * (cw-tw);


                    if(vi_x > 0){ vi_x = 0 };
                    if(vi_x < cw-tw){ vi_x = cw-tw };


                    finish_vix = vi_x;


                    //console.info(mx, ww, cw, tw, vi_x);

                }

            }

            function handle_scroll(e){
                //console.info($(window).scrollTop());
                st = $(window).scrollTop();
                vi_y = 0;


                if(started===false){
                    wh = $(window).height();
                    if((st+wh)>=cthis.offset().top){
                        init_start();
                    }
                }

                //console.info(th);


                if(th==0){
                    return;
                }


                if(started===false || o.settings_mode!='scroll'){
                    return;
                }

                if(o.mode_scroll=='fromtop'){
                    vi_y = ((st/ch))  * (ch-th);

                    if(o.is_fullscreen=='on'){

                        vi_y = st / ($('body').height() - wh)  * (ch-th);
                    }

                    //console.info(st,th)
                    if(o.direction=='reverse'){
                        vi_y = (1-(st/ch))  * (ch-th);


                        if(o.is_fullscreen=='on'){

                            vi_y = (1- (st / ($('body').height() - wh)) )  * (ch-th);
                        }
                    }


                }
                cthis_ot = cthis.offset().top;
                var auxer5 = (st-(cthis_ot-wh)) / ((cthis_ot+ch)-(cthis_ot-wh));

                if(o.is_fullscreen=='on'){

                    auxer5 = st / ($('body').height() - wh);
                }

                if(auxer5>1){ auxer5 = 1; }
                if(auxer5< 0){ auxer5 = 0; }

                if(animator_objects_arr){
                    for(i=0;i<animator_objects_arr.length;i++){

                        var _c = animator_objects_arr[i];
                        var cdata =  _c.data('parallax_options');


                        //console.info(cdata);
                        if(cdata){
                            for(j=0;j<cdata.length;j++){

                                if(auxer5<=0.5){
                                    var auxer5_doubled = auxer5*2;
                                    var auxer5_doubled_inverse = (auxer5*2)-1;
                                    if(auxer5_doubled_inverse<0) { auxer5_doubled_inverse=-auxer5_doubled_inverse; }

                                    //var auxval = cdata[j].initial + (auxer5*2) * cdata[j].mid;
                                    //if(cdata[j].initial > cdata[j].mid){
                                    //    auxval = (auxer5*2) * cdata[j].mid - cdata[j].initial;
                                    //}

                                    var auxval = auxer5_doubled_inverse*cdata[j].initial + auxer5_doubled*cdata[j].mid;
                                    var cval = cdata[j].value;

                                    cval = cval.replace('{{val}}', auxval);
                                    //console.log(cval);
                                    //console.info(cdata[j].property, auxval);
                                    _c.css(cdata[j].property, cval);
                                }else{

                                    var auxer5_doubled = (auxer5-0.5)*2;
                                    var auxer5_doubled_inverse = auxer5_doubled-1;
                                    if(auxer5_doubled_inverse<0) { auxer5_doubled_inverse=-auxer5_doubled_inverse; }

                                    //var auxval = cdata[j].initial + (auxer5*2) * cdata[j].mid;
                                    //if(cdata[j].initial > cdata[j].mid){
                                    //    auxval = (auxer5*2) * cdata[j].mid - cdata[j].initial;
                                    //}

                                    var auxval = auxer5_doubled_inverse*cdata[j].mid + auxer5_doubled*cdata[j].final;

                                    //console.info(auxval,auxer5_doubled_inverse,auxer5_doubled)
                                    var cval = cdata[j].value;
                                    cval = cval.replace('{{val}}', auxval);
                                    _c.css(cdata[j].property, cval);
                                }
                            }

                        }


                        //console.info(animator_objects_arr[i],);
                    }
                }

                //console.info(auxer5);
                if(o.mode_scroll=='normal'){




                    vi_y = auxer5  * (ch-th);
                    //consoel.info(auxer5, vi_y);

                    if(o.direction=='reverse'){

                        vi_y = (1-(auxer5))  * (ch-th);
                    }

                    if(cthis.hasClass('debug-target')){ console.info(o.mode_scroll, st, cthis_ot, wh, ch, (cthis_ot+ch),auxer5); }




                }

                if(_fadeouttarget){

                    var auxer4 = Math.abs(((st-cthis_ot)/cthis.outerHeight())-1);
                    if(auxer4>1){ auxer4 = 1; }
                    if(auxer4< 0){ auxer4 = 0; }


                    _fadeouttarget.css('opacity', auxer4);
                }



                bo_o = st/ch;
                //console.info(ch,th,bo_o);

                if(vi_y > 0){ vi_y = 0 };
                if(vi_y < ch-th){ vi_y = ch-th };
                if(bo_o > 1){ bo_o = 1 };
                if(bo_o < 0){ bo_o = 0 };

                finish_viy = vi_y;
                finish_bo = bo_o;

                if(duration_viy===0){

                    target_viy = finish_viy;
                    if(is_ie()&&version_ie()<=10){
                        _theTarget.css('top',''+target_viy+'px');
                    }else{
                        _theTarget.css('transform','translate3d(0,'+target_viy+'px,0)');
                    }

                }


                time=0;
                //console.info(vi_y);

                //console.info(st/ch, vi_y);
                //_theTarget.css('top',vi_y);
                //_theTarget.css('transform','translate3d(0,'+vi_y+'px,0)');

            }

            function handle_frame(){

                //console.info('handle_frame', finish_viy, duration_viy, target_viy);

                if(isNaN(target_viy)){
                    target_viy=0;
                }

                if(duration_viy===0){
                    requestAnimFrame(handle_frame);
                    return false;
                }

                begin_viy = target_viy;
                change_viy = finish_viy - begin_viy;

                begin_bo = target_bo;
                change_bo = finish_bo - begin_bo;


                //console.info(finish_viy, begin_viy, change_viy);
                //console.log(duration_viy);
                if(o.easing=='easeIn'){
                    target_viy =  Number(Math.easeIn(1, begin_viy, change_viy, duration_viy).toFixed(5));
                    //target_viy =  Number(Math.easeIn(1, begin_viy, change_viy, duration_viy));
                    target_bo =  Number(Math.easeIn(1, begin_bo, change_bo, duration_viy).toFixed(5));
                }
                if(o.easing=='easeOutQuad'){
                    target_viy = Math.easeOutQuad(1, begin_viy, change_viy, duration_viy);
                    target_bo = Math.easeOutQuad(1, begin_bo, change_bo, duration_viy);
                }
                if(o.easing=='easeInOutSine'){
                    target_viy = Math.easeInOutSine(1, begin_viy, change_viy, duration_viy);
                    target_bo = Math.easeInOutSine(1, begin_bo, change_bo, duration_viy);
                }


                target_vix = 0;
                if(o.settings_movexaftermouse=='on'){
                    begin_vix = target_vix;
                    change_vix = finish_vix - begin_vix;
                    target_vix = Math.easeIn(1, begin_vix, change_vix, duration_viy);
                }


                //console.log(begin_viy, change_viy, target_viy);
                if(is_ie()&&version_ie()<=10){
                    _theTarget.css('top',''+target_viy+'px');
                }else{
                    _theTarget.css('transform','translate3d('+target_vix+'px,'+target_viy+'px,0)');
                }


                //console.info(_blackOverlay,target_bo);;

                if(_blackOverlay){
                    _blackOverlay.css('opacity',target_bo);
                }

                if(api_outer_update_func){
                    api_outer_update_func(target_viy);
                }

                requestAnimFrame(handle_frame);
            }

        })
    }
    window.dzsprx_init = function(selector, settings) {
        if(typeof(settings)!="undefined" && typeof(settings.init_each)!="undefined" && settings.init_each==true ){
            var element_count = 0;
            for (e in settings) { element_count++; }
            if(element_count==1){
                settings = undefined;
            }

            $(selector).each(function(){
                var _t = $(this);
                _t.dzsparallaxer(settings)
            });
        }else{
            $(selector).dzsparallaxer(settings);
        }

    };
})(jQuery);


function is_touch_device() {
    return !!('ontouchstart' in window);
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();


function is_ie() {
    var ua = window.navigator.userAgent;
    console.info(ua);

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
;

function is_ie11(){
    return !(window.ActiveXObject) && "ActiveXObject" in window;
}
function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1]);
}
;


jQuery(document).ready(function($){

    $('.dzsparallaxer---window-height').each(function(){
        var _t = $(this);
        //return false;

        $(window).bind('resize',handle_resize);
        handle_resize();

        function handle_resize(){
            var wh = $(window).height();

            _t.height(wh);
        }
    })
    dzsprx_init('.dzsparallaxer.auto-init', {init_each: true});

});