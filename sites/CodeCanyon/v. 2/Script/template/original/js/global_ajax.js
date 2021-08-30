"use strict";

var hasClbk, activeEl,_g_scrollTop;

var globalAjax = new(function() {

    function colorateContent(target) {

        var themeIcChanger = '<div id="hook_Block_ThemesControlRB" class="hookBlock">' +
            '<div class="covers_control_anim">' +
            '<a href="/themes?nav=themes" class="covers_control_cnt_w al" hrefattr="true">' +
            '<div class="covers_control_ic"></div><div class="covers_control_cnt">' + lang.change_theme + '</div></a>' +
            '</div></div>';
        var t = document.getElementById(target),
            $t = $(t);
        if (location.pathname.substring(1) === 'themes')
            t.classList.add('covers-front');
        else
            t.classList.remove('covers-front');


        if ($t.find('#hook_Block_ThemesControlRB').length == 0 && window.location.pathname.substring(1) !== 'themes') {
            $t.prepend(themeIcChanger);
            up_href();
        }
    }

    // get profile theme
    function getTheme(){

    //if(stop_theme_ch) return false;

    var th_header_image = $('#th_v_bod'), th_body_col = $('#st_left_right_theme');
       /// th_header_image.removeAttr('src');
      ///  th_body_col.html('');
    var sd = jAjax('/profile', 'post', 'cmd=gTheme&view_as=json&type=pos');
    sd.done(function(data){
    
    if(data !== '0' && data !== '' && typeof data == 'string'){
    var dj = validateJson(data);

if(theme_last_uid !== dj.uid) {
th_header_image.attr('src',dj.header_photo);

th_body_col.replaceWith('<style id="st_left_right_theme">.cover_t_c_repeat_l, .cover_t_c_repeat_r {   background-image: url('+dj.body+'?v='+Math.random()+');}body {    background-image: url('+dj.body+'?v='+Math.random()+');}</style>');
theme_last_uid = dj.uid;

}

    } else if(data === '0'){
th_header_image.removeAttr('src');
th_body_col.html('');
    }


    });

    }

    function highlightPages() {


        // add active class to the active element
        ga('.mctc_navMenu,.lf_men').filter('.__active').removeClass('__active');
        var nav = typeof window.location.href.split('nav=')[1] != 'undefined' ? window.location.href.split('nav=')[1].split('&')[0] : '';
        if (nav){
			var active_a = $('.mctc_navMenu a[data-navact="' + nav + '"],.left_wd_menu a[data-navact="' + nav + '"],.lf_men._'+nav);
            active_a.addClass('__active').parent().addClass('__active');
	    if(active_a.closest('ul').hasClass('mctc_navMenuDDL'))
		ga('#mctc_navMenuDropdownSec_otherSections > .mctc_navMenuDropdownSecLabel').addClass('__active');
       } else if (!nav && window.location.href === _st.host + '/' || window.location.pathname === '/profile')
            ga('.mctc_navMenu a:first').addClass('__active').parent().addClass('__active');

		if(!nav && window.location.href === _st.host+'/') ga('._feed').addClass('__active');
        ///else $('.mctc_navMenu a:first').addClass('__active');

    }

    function g_closeReq() {
        oLoadingBox.parentNode && document.body.removeChild(oLoadingBox);
        bIsLoading = false;
        // highlightPages();
    }

    function g_abortReq() {
        if (!bIsLoading) {
            return;
        }
        oReq.abort();
        g_closeReq();
    }

    function g_ajaxError() {
        alert("Unknown error.");
    }

    function g_ajaxLoad() {
        var vMsg, nStatus = this.status;
        switch (nStatus) {
            case 200:
//console.log(this.responseText);
			vMsg = JSON.parse(this.responseText);
 
                var pageTitle = oPageInfo.title != '' ? oPageInfo.title + (vMsg.page != '' ? ' - ' + vMsg.page : '') : '';
				var w_html = ga('html'), w_body = ga('body');
                document.title = pageTitle != '' ? pageTitle : document.title; //oPageInfo.title = vMsg.page;
				
                if(!escape_filter_box) 
					document.getElementById(sTargetId).innerHTML = vMsg.content;
				else 
					document.getElementById('search_ajax_new_results').innerHTML = vMsg.content;
				
                if (bUpdateURL) {
                    if (bUpdateURL != 255) history.pushState(oPageInfo, pageTitle, oPageInfo.url);
                    bUpdateURL = false;
                    g_init();
                }
				if(w_html.find('#index_wall_n').length) {
					
					    w_html.find('#mainContent').addClass('__wall'); 
						//w_html.scrollTop(ga('.feed-top-nav').offset().top-ga('.toolbar').height());
						w_html.scrollTop(0);

		}else {
		w_html.find('#mainContent').removeClass('__wall');
		if(!ga('#in_app_page').length) w_html.scrollTop(0); else w_html.scrollTop(0);
		}
                w_html.find('[rel="flocv"]').replaceWith('<script rel="flocv" type="text/javascript" src="'+_THEME+'/js/_system.js"></script>');
				 
				
				w_html.find('#mainContent').css('left','');
				// empty shortcut menu
                ga('.hook_Block_ShortcutMenu').empty();

		// profile theme
		//getTheme();
	
				// remove bugged tipsy
				ga('.tipsy').remove();
				
				
				appsPage();

                // callback
                runCallback();
				
				if(_g_scrollTop) w_html.scrollTop(_g_scrollTop); 

                //colorateContent(sTargetId);
				_isWall = false;
				escape_filter_box = false;
				_g_scrollTop = false;
                break;
            default:
                vMsg = nStatus + ": " + (oHTTPStatus[nStatus] || "Unknown");
                switch (Math.floor(nStatus / 100)) {
                    /*
                    case 1:
                        // Informational 1xx
                        console.log("Information code " + vMsg);
                        break;
                    case 2:
                        // Successful 2xx
                        console.log("Successful code " + vMsg);
                        break;
                    case 3:
                        // Redirection 3xx
                        console.log("Redirection code " + vMsg);
                        break;
                    */
                    case 4:
                        /* Client Error 4xx */
                        alert("Client Error #" + vMsg);
                        break;
                    case 5:
                        /* Server Error 5xx */
                        alert("Server Error #" + vMsg);
                        break;
                    default:
                        /* Unknown status */
                        g_ajaxError();
                }
        }
        g_closeReq();
    }

    function g_filterURL(sURL, sViewMode) {

        return sURL.replace(rSearch, "") + ("?" + sURL.replace(rHost, "&").replace(rView, sViewMode ? "&" + sViewKey + "=" + sViewMode : "").slice(1)).replace(rEndQstMark, "");
    }
    function flURL(url, param, value) {
        var a = document.createElement('a'),
            regex = /[?&]([^=]+)=([^&]*)/g;
        var match, str = [];
        a.href = url;
        value = value || "";
        while (match = regex.exec(a.search))
            if (encodeURIComponent(param) != match[1]) str.push(match[1] + "=" + match[2]);
        str.push(encodeURIComponent(param) + "=" + encodeURIComponent(value));
        a.search = (a.search.substring(0, 1) == "?" ? "" : "?") + str.join("&");
        return a.href.replace(' ','');
    }
    function gXMLobject() {
        oReq = false;
        if (window.XMLHttpRequest) {
            try {
                oReq = new XMLHttpRequest()
            } catch (e) {
                oReq = false
            }
        } else {
            if (window.ActiveXObject) {
                try {
                    oReq = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (e) {
                    try {
                        oReq = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (e) {
                        oReq = false
                    }
                }
            }
        }
        return oReq;
    }
    function g_getPage(sPage) {
        if (bIsLoading) {
            return;
        }
        //oReq = new XMLHttpRequest();
	   /*$.each(xhrPool, function(idx, jqXHR) {
			  jqXHR.abort();
		});	*/
		oReq = gXMLobject();
        bIsLoading = true;
        oReq.onload = g_ajaxLoad;
        oReq.onerror = g_ajaxError;
        if (sPage) {
            oPageInfo.url = sPage;//g_filterURL(sPage, null);
        }
       oReq.open("get", g_filterURL(oPageInfo.url, "json") + "&global-ajax&ajax=1&token=" + (new Date()).getTime(), true);


		oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

        oReq.send();
        oLoadingBox.parentNode || document.body.appendChild(oLoadingBox);
    }

    function g_requestPage(sURL) {
        if (history.pushState) {
            bUpdateURL = true;
            g_getPage(sURL);
        } else {
            /* Ajax navigation is not supported */
            location.assign(sURL);
        }
    }

    function hasCallback(l) {
        hasClbk = l.getAttribute('data-clbk');
    }

    function runCallback() {
        if (hasClbk) {
            window[hasClbk](arguments);
            hasClbk = false;
        }
    }

    function g_processLink(element) {
        activeEl = element;
		if(ga(element).hasClass('reloadwall')) _isWall = true;
		if(ga(element).data('scrolltop')) _g_scrollTop = ga(element).data('scrolltop');
		
        g_requestPage(element.href || $(element).data('dhref'));
        return false;
        /*if (this.getAttribute('hrefattr') === "true") {
            g_requestPage(this.href);
            return false;
        }
        return true;*/
    }

    function g_init() {
        oPageInfo.title = document.title;
        highlightPages();
	if(acvm) {
var mint = setInterval(function(){
if($().NobilMusicWindow){
ga('[music_layer="true"]').click();
clearInterval(mint);

}

},100);
acvm = false;

	}

	    ga(document).off('click.globalAjax').on('click.globalAjax', '[hrefattr]', function(e){
                e.preventDefault();
				e.stopImmediatePropagation();
				var $this = ga(this);
												if(stop_cl){
					
													var cnf = new jBox('Confirm', {
														content:stop_cl,
														confirmButton: lang.leave_this_page,	
														cancelButton: lang.remain_on_this_page,	
														confirm: function(){e.stopPropagation();e.preventDefault(); stop_cl=!1; unbindRemainOnSite();$this.trigger('click'); },
														//cancel: function(){}
													});
													cnf.open();
					
													return;
											}
				if($this.hasClass('closejbox')) ga('#nohook_modal_close').trigger('click'); 
				
                if (this.getAttribute('data-clbk') !== "") hasCallback(this);

				if(  $this.hasClass('search-filter-box') || $this.attr('href').indexOf('/search?filterbox=1') > -1  ) escape_filter_box = 1;
				
                if (window.location.href === this.href && !ga(this).hasClass('reloadwall') && !$(this).hasClass('hrefimportant'))
                   return runCallback();
                else
                    g_processLink(this);


            });

  
    }

    var

    /* customizable constants */
        sTargetId = "mainContent",
        sViewKey = "view_as",
        sAjaxClass = "ajax-nav",
		escape_filter_box, // for search page

        /* not customizable constants */
        rSearch = /\?.*$/,
        rHost = /^[^\?]*\?*&*/,
        rView = new RegExp("&" + sViewKey + "\\=[^&]*|&*$", "i"),
        rEndQstMark = /\?$/,
		_isWall,
        oLoadingBox = document.createElement("div"),
        oCover = document.createElement("div"),
        oLoadingImg = new Image(),
        oPageInfo = {
            title: null,
            url: location.href
        },
        oHTTPStatus = /* http://www.iana.org/assignments/http-status-codes/http-status-codes.xml */ {
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            306: "Reserved",
            307: "Temporary Redirect",
            308: "Permanent Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            425: "Unassigned",
            426: "Upgrade Required",
            427: "Unassigned",
            428: "Precondition Required",
            429: "Too Many Requests",
            430: "Unassigned",
            431: "Request Header Fields Too Large",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates (Experimental)",
            507: "Insufficient Storage",
            508: "Loop Detected",
            509: "Unassigned",
            510: "Not Extended",
            511: "Network Authentication Required"
        };
    var theme_last_uid;
    var oReq, bIsLoading = false,
        bUpdateURL = false;

    oLoadingBox.id = "ajax-loader";
    oCover.onclick = g_abortReq;
    //oLoadingImg.src = "";//"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
    oCover.appendChild(oLoadingImg);
    oLoadingBox.appendChild(oCover);
    up_href = function() {
        return g_init()
    };
    window.onpopstate = function(oEvent) {
     /*   bUpdateURL = 255;
        oPageInfo.title = typeof oEvent.state.title != 'undefined' ? (oEvent.state.title != null ? oEvent.state.title : '') : '';
        oPageInfo.url = oEvent.state.url;alert(oEvent.state.url);
        g_getPage();*/
oPageInfo.title = '';
        bUpdateURL = 255;
        //   oPageInfo.title = oEvent.state.title;
        oPageInfo.url = window.location.href;
        g_getPage(oPageInfo.url);

    };

    // for themes page
    window.onload = function() {
        //colorateContent(sTargetId);
    }
    window.addEventListener ? addEventListener("load", g_init, false) : window.attachEvent ? attachEvent("onload", g_init) : (onload = g_init);

    // Public methods
    this.open = g_requestPage;
    this.stop = g_abortReq;
    this.rebuildLinks = g_init;

})();