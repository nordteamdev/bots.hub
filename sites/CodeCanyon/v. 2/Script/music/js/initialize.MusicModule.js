
var popup_music_is_constructed = false;
var popup_music_is_showed = false;

(function(jQuery) {


    jQuery.fn.MusicModule = function(options) {

        var $this = jQuery(this),
            nav_apple = navigator.userAgent.match(/(iPod|iPhone|iPad)/),
            p_left, p_top;

        // default settings
        var settings = jQuery.extend({
            music_path: '/music/',
            p_file: "/index.html",
            append_to: "body",
            open_method: 'default',
            w_modal: true,
            p_left: "100",
            p_top: "50",
            beforeOpen: function() {}
        }, options);



        // inject css
        jQuery('<link rel="stylesheet" type="text/css" href="' + settings.music_path + '/css/initialize.css?v=1.9">').prependTo(settings.append_to);
        var injectCss = {
            layer_overlay_init: 'position: fixed;top: 0;left: 0;right: 0;bottom:0;z-index: 100;height: 100%;width:100%;background: rgba(0, 0, 0, 0.62);',
            layer_overlay_icon: 'position: fixed;display: block;left: 0;right:0;bottom:0;margin:auto;top: 0;width: 99px;height: 99px;z-index: 3000;background: url(' + settings.music_path + '/css/images/wMusic-99.png) no-repeat;',

        };

        // construct html element "Music"
        var o_div = '<div open-mth="overlay" style="' + injectCss.layer_overlay_init + '"></div>',
            t_div = '<div open-mth="overlay" style="' + injectCss.layer_overlay_icon + '"></div>',
            on_mi = '<div id="wMusic_aria" data-m-container="true"></div>'; /// do not change the attribute


        var __create_music = '<li class="toolbar_nav_i" plpsbtn="1">' +
            '<span class="m_hidden" href="javascript:void(0);" music_layer_hidden="true"></span>' +
            '<a class="toolbar_nav_a toolbar_nav_a__marks" href="javascript:;" music_layer="true">' +
            '<div class="toolbar_nav_music_i_ic"></div>' +
            //'<div id="topPanelMusicPlayerControl" onclick="SP_playMusic(this,event)" class="toolbar_music-play"></div>'+
            '</a></li>';

        p_left = (nav_apple ? 'auto' : settings.p_left);
        p_top = (nav_apple ? 'auto' : settings.p_top);
        $this.replaceWith(__create_music);
        jQuery('[music_layer_hidden="true"]').on('click', function() {

            call_music($this, 1);


        });

        jQuery('[music_layer="true"]').on('click', function() {
            var $this = jQuery(this);
            if (!popup_music_is_showed) {
                popup_music_is_showed = true;
                return call_music($this);
            } else {
                popup_music_is_showed = false;
                return jQuery.socplusMusic('hide');
            }

        });

        // call MusicWindow's JavaScript file
        function call_music(el, h) {

            if (popup_music_is_constructed == false) {

                settings.beforeOpen.call(this);

                if (settings.open_method !== 'default' && !h)
                    jQuery(o_div + t_div).appendTo(settings.append_to);

                opac = (settings.open_method === 'overlay' ? '0' : '1');

                jQuery(on_mi).appendTo(settings.append_to);
                jQuery.ajax({
                    url: settings.music_path + settings.p_file,
                    cache: false,
                    async: true,
                    success: function(data) {

                        var m_vis = 'visible';
                        var m_hdn = '';

                        if (h) {
                            m_vis = 'invisible';
                            m_hdn = '__hidden';
							mus_start_invisible = true;
                        }

                        jQuery('[data-m-container]')
                            .css({
                                'margin-left': p_left + 'px',
                                'margin-top': p_top + 'px',
                                'opacity': opac,
                                'display': 'block'
                            })
                            .html(jprintf(data, m_hdn, m_vis)).find(!settings.w_modal ? '.layer_ovr' : '').remove();
                        popup_music_is_constructed = window.location.pathname;
                        if (!h) jQuery('[plpsbtn]').addClass('__active');

                        // call MusicWindow's father :)
                        jQuery.ajax({
                            url: '/music/javascript/musicModule.js?v=13',
                            cache: false,
                            async: true,
                            dataType: 'script',
                            success: function() {

                                setTimeout(function() {
                                    jQuery('[data-m-container]').show()

                                    if (h) {
                                        setTimeout(function() {

                                            jQuery.socplusMusic('hide');
                                        }, 2000)
                                    }
                                }, 500);
                            }
                        });

                    }

                });

            } else jQuery.socplusMusic('show');


        };

    };

}(jQuery));
