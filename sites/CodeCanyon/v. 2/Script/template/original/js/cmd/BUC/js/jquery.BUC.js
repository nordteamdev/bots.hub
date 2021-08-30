 /*				        
  *   @ Bertil Alfredsson (c)2017			 			         
  *   @ bertil1alfredsson@gmail.com
  *   @ Documentation ->  www.briliantsc.com/documentation.html	 
  *   @ More -> www.briliantsc.com		 
  */


(function($) {

    jQuery.extend(jQuery.expr[":"], {
        scrollable: function(element) {
            var vertically_scrollable, horizontally_scrollable;
            if (jQuery(element).css('overflow') == 'scroll' || jQuery(element).css('overflowX') == 'scroll' || jQuery(element).css('overflowY') == 'scroll') return true;

            vertically_scrollable = (element.clientHeight < element.scrollHeight) && (
                jQuery.inArray(jQuery(element).css('overflowY'), ['scroll', 'auto']) != -1 || jQuery.inArray(jQuery(element).css('overflow'), ['scroll', 'auto']) != -1);

            if (vertically_scrollable) return true;

            horizontally_scrollable = (element.clientWidth < element.scrollWidth) && (
                jQuery.inArray(jQuery(element).css('overflowX'), ['scroll', 'auto']) != -1 || jQuery.inArray(jQuery(element).css('overflow'), ['scroll', 'auto']) != -1);
            return horizontally_scrollable;
        }
    });
    jQuery.fn.verticalAlign = function(a) {
        a = a || 1;

        var valueInString = (($(this).parent().height() - $(this).height()) / 2) / a;
        var num = parseFloat(valueInString);


        return this
            .css("margin-top", valueInString + 'px'); ///num - (num * .40)  + 'px' )



    };

    function BUC(element, options) {

        this.$window = $(window);
        this.$body = $('body');
        this.$element = $(element);
        this.options = options;
        this.buc_rand_id;
        this.enabled = true;
        this.stopHorzSlider = false;
        this.wall;
        this.fwall;
        this.BUC;
        this.BUC_columns_section;
        this.BUC_columns_dv;
        this.bucfilter;
        this.buc_ms_container;
        this.recentBUCScrollPosition;

        //this.clbk = function(){};

        this.init();

    };
    // from http://widgets.twimg.com/j/1/widget.js
    var K = function() {
        var a = navigator.userAgent;
        return {
            ie: a.match(/MSIE\s([^;]*)/)
        }
    }();




    function parseTwitterDate(tdate) {
        var system_date = new Date(Date.parse(tdate));
        var user_date = new Date();
        if (K.ie) {
            system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
        }
        var diff = Math.floor((user_date - system_date) / 1000);
        if (diff <= 1) {
            return "just now";
        }
        if (diff < 20) {
            return diff + " seconds ago";
        }
        if (diff < 40) {
            return "half a minute ago";
        }
        if (diff < 60) {
            return "less than a minute ago";
        }
        if (diff <= 90) {
            return "one minute ago";
        }
        if (diff <= 3540) {
            return Math.round(diff / 60) + " minutes ago";
        }
        if (diff <= 5400) {
            return "1 hour ago";
        }
        if (diff <= 86400) {
            return Math.round(diff / 3600) + " hours ago";
        }
        if (diff <= 129600) {
            return "1 day ago";
        }
        if (diff < 604800) {
            return Math.round(diff / 86400) + " days ago";
        }
        if (diff <= 777600) {
            return "1 week ago";
        }
        return "on " + system_date;
    }

    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    function timeSince(epoch) {
        var secs = ((new Date()).getTime() / 1000) - epoch;
        Math.floor(secs);
        var minutes = secs / 60;
        secs = Math.floor(secs % 60);
        if (minutes < 1) {
            return secs + (secs > 1 ? ' seconds ago' : ' second ago');
        }
        var hours = minutes / 60;
        minutes = Math.floor(minutes % 60);
        if (hours < 1) {
            return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
        }
        var days = hours / 24;
        hours = Math.floor(hours % 24);
        if (days < 1) {
            return hours + (hours > 1 ? ' hours ago' : ' hour ago');
        }
        var weeks = days / 7;
        days = Math.floor(days % 7);
        if (weeks < 1) {
            return days + (days > 1 ? ' days ago' : ' day ago');
        }
        var months = weeks / 4.35;
        weeks = Math.floor(weeks % 4.35);
        if (months < 1) {
            return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
        }
        var years = months / 12;
        months = Math.floor(months % 12);
        if (years < 1) {
            return months + (months > 1 ? ' months ago' : ' month ago');
        }
        years = Math.floor(years);
        return years + (years > 1 ? ' years ago' : ' years ago');
    }



    function getDateDayName(x) {

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var dayName = days[d.getDay()];
        return x ? new Date().getDate() : dayName;
    }

    function roundCount(count) {
        if (count < 1000) {
            return count;
        } else if (count > 1000 && count < 1000000) {
            count = count / 1000;
            count = parseFloat(count).toFixed(1);
            return count + " K";
        } else if (count > 1000000) {
            count = count / 1000000;
            count = parseFloat(count).toFixed(1);
            return count + " M";
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getTime(date) {
        // Split timestamp into [ Y, M, D, h, m, s ]
        var actiondate = new Date(parseInt(date) * 1000);
        var today = new Date();
        if (today.getDate() === actiondate.getDate() && today.getMonth() === actiondate.getMonth() && today.getYear() === actiondate.getYear()) {
            var hourssince = today.getHours() - actiondate.getHours();
            var minutessince = today.getMinutes() - actiondate.getMinutes();
            var secondssince = today.getSeconds() - actiondate.getSeconds();
            if (hourssince > 0) {
                date = hourssince + 'h';
            } else if (minutessince > 0) {
                date = minutessince + 'm';
            } else {
                date = secondssince + 's';
            }
        } else {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var diffDays = Math.round(Math.abs((today.getTime() - actiondate.getTime()) / (oneDay)));
            if (diffDays >= 7) {
                date = Math.round(diffDays / 7) + 'w';
            } else {
                if (diffDays == '0') {
                    diffDays = '1';
                }
                date = diffDays + 'd';
            }
        }
        return date;
    }




    BUC.prototype = {

        init: function() {
            var _that = this;

            var create_open_button = $(_that.options.open_button);//$('<a/>').attr('href', 'javascript:void(0);').html('Open');
            this.$element.replaceWith(create_open_button);

            create_open_button.on('click', function(e) {

                _that._showIt();

            });

        },
        _showIt: function() {
            var _that = this,
                css = {};
            this.buc_rand_id = this.buc_rand_id || Math.floor(Math.random() * 7) + 1;

            if (!this.$body.find('#BUC_' + this.buc_rand_id).length) {

                this.create(this.buc_rand_id);

            } else {


                ////$('#BUC_' + this.buc_rand_id).css('translate');

                this.BUC.vegas('play');
                var css = {},
                    _buc_id = $('#BUC_' + _that.buc_rand_id);

                css[this._BrowserPrefix() + 'transform'] = this.getBwFeatures() + '(0,0,0) translateZ(0)';
                css[this._BrowserPrefix() + 'transition'] = this._BrowserPrefix() + 'transform ' + _that.options.init_anim_duration + 'ms ' + _that.options.init_anim_easing;

                //$(this).show();
                _that.$body.addClass('_hide_overflow');


                _buc_id.show().css(css).off(_that.endTransitionEvent() + '.hideBucP');
                /*_buc_id.css(css).on(_that.endTransitionEvent()+'.showBucP', function(e){
                	//e.preventDefault();
                //	e.stopImmediatePropagation();
                //	$(this).removeClass('__visible')

                });
			
                */
            }

        },
        _hideIt: function() {
            var _that = this,
                css = {},
                _buc_id = $('#BUC_' + _that.buc_rand_id);
            ///$('#BUC_' + _that.buc_rand_id).slideUp(2000);
            css[this._BrowserPrefix() + 'transform'] = this.getBwFeatures() + '(-' + this.$window.width() + 'px,0,0) translateZ(0)';
            css[this._BrowserPrefix() + 'transition'] = this._BrowserPrefix() + 'transform ' + _that.options.init_anim_duration + 'ms ' + _that.options.init_anim_easing;

            ///if(_buc_id.hasClass('__visible')) return;
            this.BUC.vegas('pause');
            _buc_id.css(css).on(_that.endTransitionEvent() + '.hideBucP', function(e) {
                //	e.preventDefault();
                //	e.stopImmediatePropagation();

                $(this).hide();
                _that.$body.removeClass('_hide_overflow');
            });

        },
        create: function(buc_rand_id) {

            var _that = this;

            // hide body overflow
            this.$body.addClass('_hide_overflow');



            this.BUC = $('<section/>').css({
                'width': '100%',
                'height': '100%',
                'overflow': 'auto!important',
                'width': this.$window.width(),
                'height': this.$window.height(),

            }).attr('id', 'BUC_' + buc_rand_id).addClass('BUC_section');
            this.BUC_columns_section = $('<section/>').addClass('fwall _hidden');
            var BUC_section = this.BUC;
            this.BUC_columns_dv = $('<div/>').attr('id', 'buc_columns_section').addClass('BUC_COLUMNS_SECTION');

            var BUC_columns_dv = this.BUC_columns_dv;
            var BUC_columns_section = this.BUC_columns_section;




            // create background image
            BUC_section.vegas(this.options.vegas);

            BUC_columns_dv.append(BUC_columns_section);

            BUC_section.append(BUC_columns_dv);

            // add to DOM
            this.$body.prepend(BUC_section);




            ///this.fwall = this.BUC_columns_section;

            // blocks
            var buc_blocks = this.options.blocks;
            var buc_blocks_count = buc_blocks.length;



            var blocks = '';

            for (var j = 0; j < buc_blocks_count; j++) {

                var this_block = buc_blocks[j];
                var size_class = this_block.size;
                var bgcolor = this_block.color;
                var is_crosb = typeof this_block.crosb != undefined ? this_block.crosb : false;
                var use_crosb = is_crosb ? 'data-fixSize=' + is_crosb.fixSize + ' data-nested="' + is_crosb.nested + '" data-cellW=' + is_crosb.cellW + ' data-cellH=' + is_crosb.cellH + ' data-gutterX=' + is_crosb.gutterX + '' : '';
                var u_html = this_block.html;
                var clk = typeof this_block.click != 'undefined' ? 'onclick="' + this_block.click + '();"' : '';
                var c_pointer = clk != '' ? 'cursor:pointer;' : '';
                blocks += '<div ' + clk + ' ' + use_crosb + ' class="item ' + size_class + ' level1 buc_block ' + (j == 0 ? 'first-item' : '') + '" id="buc_block_' + j + '" style="' + c_pointer + 'background-color:' + bgcolor + ';">' + u_html + '</div>';

            }

            BUC_columns_section.html(blocks); ///append('<div class="buc_column" style="/*margin:'+this.options.columns_margin+'*/" id="buc_column_'+i+'">'+blocks+'</div>');

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                // add close button
                BUC_columns_section.prepend('<a href="javascript:void(0);" class="buc_hidepan"><i class="bucic _close"></i></a>');

                $('.buc_hidepan').on('click', function(e) {
                    _that._hideIt();

                });
            }


            //this.buildMenuBar();

            var colour = [
                "rgb(142, 68, 173)",
                "rgb(243, 156, 18)",
                "rgb(211, 84, 0)",
                "rgb(0, 106, 63)",
                "rgb(41, 128, 185)",
                "rgb(192, 57, 43)",
                "rgb(135, 0, 0)",
                "rgb(39, 174, 96)"
            ];
            this.BUC_columns_dv.find(".item:not(.level1)").each(function() {
                var backgroundColor = colour[colour.length * Math.random() << 0];
                $(this).css({
                    backgroundColor: backgroundColor
                });
            });


            this.wall = new Freewall(this.BUC_columns_dv);
            this.wall.reset({
                selector: '.level1',
                draggable: false,
                cellW: 160,
                delay: 10,
                cellH: 160,
                fixSize: 0,

                onResize: function() {
                    //      wall.fitHeight(_that.$window.height() - 90);
                    ///	wall.fitWidth();
                    _that.wall.fitHeight(495);
                }
            });
            // caculator height for IE7;
            _that.wall.fitHeight(495);
            //wall.fitWidth();


            _that.$window.on('resize.RefreshBuc', function() {



                $('#BUC_' + buc_rand_id).css({
                    'min-width': _that.$window.width(),
                    'min-height': _that.$window.height()
                });

                _that.wall.refresh();

                setTimeout(function() {
                    $('.fwall').css('transition', 'margin .18s ease').height(_that.gBigHeight()).verticalAlign(1);
                }, 1000);

            });

            // trigger window resize
            _that.$window.trigger("resize");


            /// slide horizontally
            this.enableScrollPanelHorizontally();




            // close buc panel by pressing ESC
            this.$window.on('keyup.hideBUC', function(e) {
                e.preventDefault();


                if (e.keyCode == 27 && $('.fwall').css('display') != 'none')
                    _that._hideIt();

            });

            /*  // complete blocks's info
            this.getCelebBirthday();

            // complete weather block
            this.getCurrentWether();

            // get flickr photos
            this.getFlickrPhotos();

            // build instagram feed
            this.buildInstagramFeed();
			
			// build fb wall
			this.buildFBwall();
			
			// build news
			this.buildNews();

			// build twitter
			this.buildTwtWall();
			
			// build pinterest
			this.buildPinterest();
			
			// build youtube
			this.buildYoutube();
			
			// build tumblr
			this.buildTumblr();
			*/


            _that.bucShowLoadingSpinner();
            $.when(
                this.getCelebBirthday(),
                this.getCurrentWether(),
                this.getFlickrPhotos(),
                this.buildInstagramFeed(),
                this.buildFBwall(),
                this.buildNews(),
                this.buildTwtWall(),
                this.buildPinterest(),
                this.buildYoutube(),
                this.buildTumblr(),
                this.buildGMap()
            ).then(function(a, b, c, d, e, f, g, h, i, j, k) {


                setTimeout(function() {

                    _that.bucHideLoadingSpinner();
                    _that.BUC_columns_section.removeClass('_hidden');

                }, 1500);

                // make each block openable
                $('[buc-open-gallery]').off('click.bucBlockOpenGallery').on('click.bucBlockOpenGallery', function(e) {
                    e.preventDefault();

                    var _categ = $(this).data('categ');


                    _that.openGallery(_categ);



                });


                // vertical center
                //_that.BUC_columns_dv
                //_that.BUC_columns_dv.verticalAlign();



                // Set the container height
                $('.fwall').height(_that.gBigHeight()).verticalAlign(1);

                // add reload button for corrupted block
                $('.buc_block').each(function() {

                    if (!$(this).find('.reload-a').length)
                        $(this).prepend('<a class="buc-reload-btn" href="javascript:void(0);"><div class="reloadSingle"></div></a>')
                        .find('.buc-reload-btn').on('click', function() {
                            var _this = $(this);
                            var _categ = $(this).parent().find('[data-social]').data('social');
                            $(this).find('div:first').addClass('reloading');

                            var _rsr = function(d) {
                                if (d) _this.remove();
                                else _this.find('.reloading').removeClass('reloading');
                            };
                            switch (_categ) {

                                case 'birthday':
                                    _that.getCelebBirthday(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'weather':
                                    _that.getCurrentWether(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'flickr':
                                    _that.getFlickrPhotos(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'instagram':
                                    _that.buildInstagramFeed(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'facebook':
                                    _that.buildFBwall(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'news':
                                    _that.buildNews(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'twitter':
                                    _that.buildTwtWall(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'pinterest':
                                    _that.buildPinterest(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                                case 'youtube':
                                    _that.buildYoutube(0, function(a) {
                                        _rsr(a);
                                    });
                                    break;
                            }

                        });

                });

            });

        },

        gBigHeight: function() {

            var biggestHeight = 0;

            // Loop through elements children to find & set the biggest height
            $('.fwall').children().each(function() {
                var _this = $(this);
                // If this elements height is bigger than the biggestHeight
                if (_this.outerHeight(true) > biggestHeight) {
                    // Set the biggestHeight to this Height
                    biggestHeight = _this.outerHeight(true);
                }
            });

            return biggestHeight;

        },
        // @c = category
        // callback after imported successfully data
        callback: function(c) {

            if (c) $('[data-social="' + c + '"]').parent().find('.buc-reload-btn').remove();

        },
        enableScrollPanelHorizontally: function() {

            var _that = this;


            // slide horizontally panel
            this.BUC_columns_dv.on('mousewheel.bucscroll', function(event, delta) {


                if (!_that.stopHorzSlider) {
                    this.scrollLeft -= (delta * 140);

                    event.preventDefault();
                }

            });

            this.BUC_columns_dv.find('.item').on('mouseover.bhv mouseenter.bhv', function() {

                if ($(this).find(':scrollable').length) _that.stopHorzSlider = true;
                else _that.stopHorzSlider = false;


            }).on('mouseout.bhv mouseleave.bhv', function() {
                _that.stopHorzSlider = false;
            });

        },
        disableScrollPanelHorizontally: function() {

            this.BUC_columns_dv.off('mousewheel.bucscroll');

        },
        pauseVideos: function() {
            var _that = this;
            $('body').find('.playing')
                .each(function() {
                    if (!_that.isElementInViewport($(this))) $(this).find('[button-vd-pause]').trigger('click');

                });

        },
        bucShowLoadingSpinner: function() {
            var spinner_markup = '<div /*style="background-color:{{bg-color}};opacity:0.1"*/ class="buclayerp-bg">\
			<div class="bucloadingic">        \
			<div class="preloader-spin">\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
            <div class="preloader-spin__petal"></div>\
			</div></div>';

            if (!this.BUC.find('.buclayerp-bg').length)
                this.BUC.prepend(spinner_markup);
            else
                this.BUC.find('.buclayerp-bg').fadeIn();

        },
        bucHideLoadingSpinner: function() {
            if (this.BUC.find('.buclayerp-bg').length)
                this.BUC.find('.buclayerp-bg').fadeOut();
        },
        /*
        buildMenuBar:function(){
        	var _that = this;
        	
        	// create left/right menubar
        	this.BUC.prepend('<div id="bucMenuBar" style="background:'+this.options.menuBar.bgcolor+';" class="buc_menubar _'+this.options.menuBar.position+'">\
        	<div class="buc_menuBar_verticalCenter">\
        	<a data-buc-menubar-action="hide" href="javascript:void(0);"><i class="bucic _close"></i></a>\
        	<a data-buc-menubar-action="drag" href="javascript:void(0);"><i class="bucic _drag"></i></a>\
        	<a data-buc-menubar-action="rezize" href="javascript:void(0);"><i class="bucic _enlarge"></i></a>\
        	<a data-buc-menubar-action="filter" href="javascript:void(0);"><i class="bucic _filter"></i></a>\
        	<a data-buc-menubar-action="hide" href="javascript:void(0);"><i class="bucic _close"></i></a>\
        	</div>\
        	</div>');
        	
        	var buc_blocks_fw = $('.fwall');
        	$('[data-buc-menubar-action="hide"]').on('click', function(e){
        	_that._hideIt();
        	});
        	
        	
        	
        	// filter blocks
        	$('[data-buc-menubar-action="filter"]').on('click', function(e){
        		$('.buc_block').each(function(){
        			
        			$(this).prepend('<a class="bucic_close_ic" href="javascript:void(0);"><i class="bucic _close_block"></i></a>');
        			
        		});
        		
        	});
        	
        	
        	$('[data-buc-menubar-action="drag"]').on('click', function(e){
        	
        		
        		
        		if( !this.active  ) {
        		$(this).addClass('_active');
        		buc_blocks_fw.sortable();
        		buc_blocks_fw.disableSelection();
        		buc_blocks_fw.addClass('sortable');
        		this.active = 1;
        		
        		} else {
        			
        		$(this).removeClass('_active');
        		buc_blocks_fw.sortable('destroy');//.sortable({cancel: '.buc_block'});//sortable('destroy');
        		//buc_blocks_fw.unbind();
        		buc_blocks_fw.removeClass('sortable');
        		this.active = 0;	
        		}
        		
        	});
        	
        	$('[data-buc-menubar-action="rezize"]').on('click', function(e){
		
        		    buc_blocks_fw.children().each(function(){$(this).resizable();});

        		
        	});
        	
        	
        },*/
        openGallery: function(categ) {

            var _that = this;
            var buc_popup_markup = '<section class="bucfilter nano" id="bucfilter">\
			<div class="ic-close-filter" id="buc-close-filter-gall"></div>\
			<div class="buc_filter_header filter_header_{{bc-filter-header-categ}}"><i class="{{bc-filter-header-categ}}_logo"></i><div class="buc_header_text">{{bc-filter-header-categ}}</div></div>\
			<div class="nano-content" style="max-height:{{bfilter-max-height}}px" id="bfiltercnt">\
			</div>\
			</div></section>';

            var p_colors = {
                'instagram': '#fff',
                'facebook': '#4457a5',
                'pinterest': '#bc1b22',
                'flickr': '#e2e2e2',
                'twitter': '#1da1f2',
                'youtube': '#a6181c',
                'news': '#b12045'


            };


            buc_popup_markup = _that.makeTemplate(buc_popup_markup, {
                '{{bg-color}}': p_colors[categ],
                '{{bfilter-max-height}}': _that.BUC_columns_dv.height(),
                '{{bc-filter-header-categ}}': categ

            });

            var _buc_columns_section = _that.BUC_columns_dv.find('section');
            _buc_columns_section.fadeOut();
            _that.bucShowLoadingSpinner();
            _that.BUC_columns_dv.find('#bucfilter').remove();
            _buc_columns_section.before(buc_popup_markup);
            _that.bucfilter = $('#bucfilter');

            switch (categ) {

                case 'instagram':


                    _that.buildInstagramFeed(function() {


                        _that.showFilteredGallery();


                    });



                    break;

                case 'facebook':


                    _that.buildFBwall(function() {


                        _that.showFilteredGallery();


                    });

                    break;

                case 'twitter':


                    _that.buildTwtWall(function() {


                        _that.showFilteredGallery();


                    });

                    break;

                case 'pinterest':


                    _that.buildPinterest(function() {


                        _that.showFilteredGallery();


                    });

                    break;

                case 'flickr':


                    _that.getFlickrPhotos(function() {


                        _that.showFilteredGallery();


                    });

                    break;
                case 'youtube':


                    _that.buildYoutube(function() {


                        _that.showFilteredGallery();


                    });

                    break;

                case 'news':


                    _that.buildNews(function() {


                        _that.showFilteredGallery();


                    });

                    break;
                case 'tumblr':


                    _that.buildTumblr(function() {


                        _that.showFilteredGallery();


                    });

                    break;

            }


        },
        showFilteredGallery: function() {
            var _that = this;
            _that.recentBUCScrollPosition = _that.BUC_columns_dv.scrollLeft();

            setTimeout(function() {


                _that.bucHideLoadingSpinner();

                _that.buc_ms_container = $('#bfiltercnt');


                var buc_masonry_cnt = function() {
                    var ms_items = _that.buc_ms_container.find('.bucblockitem');
                    _that.buc_ms_container.masonry({
                        // options

                        itemSelector: ms_items,
                        isAnimated: false,
                        isFitWidth: true,
                        gutterWidth: 0
                    });
                }

                buc_masonry_cnt();

                _that.$window.on('resize.bucFilterMasonryCnt', function() {

                    _that.buc_ms_container.css('maxHeight', _that.BUC_columns_dv.height())

                    buc_masonry_cnt();
                    _that.bucfilter.nanoScroller();

                });

                _that.bucfilter.nanoScroller();
                _that.buc_ms_container.addClass('_visible');
                _that.disableScrollPanelHorizontally();
                _that.buc_ms_container.on('scroll.bucfilter', function() {

                    if ($(this).scrollTop() > 10) _that.BUC_columns_dv.addClass('top0pt0');
                    else _that.BUC_columns_dv.removeClass('top0pt0');


                });


                _that.$body.off('keyup.closeFilterBuc').on('keyup.closeFilterBuc', function(e) {

                    if (e.keyCode == 27) _that.closeFilteredGallery(e);
                });

                $('#buc-close-filter-gall').on('click', function(e) {

                    _that.closeFilteredGallery(e);
                });

            }, 1000);

        },
        closeFilteredGallery: function(e) {

            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }



            var _that = this;
            _that.$body.off('keyup.closeFilterBuc')
            _that.bucfilter.remove();
            _that.buc_ms_container.off('scroll.bucfilter');
            _that.buc_ms_container.removeClass('_visible');
            _that.enableScrollPanelHorizontally();
            _that.bucShowLoadingSpinner();

            setTimeout(function() {
                _that.BUC_columns_dv.removeClass('top0pt0');
                _that.bucHideLoadingSpinner();
                _that.BUC_columns_dv.find('section').fadeIn();

                _that.BUC_columns_dv.animate({
                    scrollLeft: _that.recentBUCScrollPosition
                });
                _that.BUC.find('.nano').nanoScroller();
            }, 1000);
        },
        isElementInViewport: function(el, plusHeight, minusHeight) {

            //special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            if (typeof el != 'undefined') {
                var rect = el.getBoundingClientRect();
                if (minusHeight) {
                    return (rect.top - minusHeight >= 0 && rect.left - minusHeight >= 0 && rect.bottom - minusHeight <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */ rect.right - minusHeight <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
                } else if (plusHeight) {
                    return (rect.top + plusHeight >= 0 && rect.left + plusHeight >= 0 && rect.bottom + plusHeight <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */ rect.right + plusHeight <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
                } else {
                    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */ rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
                }

            }
        },
        // slider top/bottom
        bucSlider: function(section, elem, n, delay, speed) {

            var _that = this;
            var slidetimeout = null;

            n++;
            if (n == $(section).find(elem).length) n = 0;

            var timeoutonextslidefunc = function(b) {
                if ($(section).find('.playing').length) return;

                $(section).stop().animate({
                    scrollTop: typeof $(section + ' ' + elem).eq(b ? b : n).get(0) != 'undefined' ? $(section + ' ' + elem).eq(b ? b : n).get(0).offsetTop : 0
                }, speed, function() {


                    slidetimeout = setTimeout(function() {
                        _that.bucSlider(section, elem, b ? b : n, delay, speed);
                    }, delay);


                });


            };

            timeoutonextslidefunc();


            $(section).off('scroll.scrollSlider').on('scroll.scrollSlider', function(e) {
                _that.pauseVideos();

            });



            $(section).parent().off('click.stopbucSlider mouseenter.stopbucSlider').on("click.stopbucSlider mouseenter.stopbucSlider", function() {

                $(section).stop(true, false);
                clearTimeout(slidetimeout);
            });

            $(section).parent().off('mouseleave.resumebucSlider').on("mouseleave.resumebucSlider", function() {


                var goToelem;
                $(section + ' ' + elem).each(function() {


                    if ($(this).position().top > 0) {

                        goToelem = $(this).index();
                        return false;
                    }
                });

                timeoutonextslidefunc(goToelem ? goToelem : '');

            });


        },

        // slider left/right
        bucSliderHorizontal: function(section, elem, n, delay, speed) {

            var _that = this;
            var slidetimeout = null;

            n++;
            if (n == $(section).find(elem).length) n = 0;

            var timeoutonextslidefunc = function(b) {
                if ($(section).find('.playing').length) return;

                $(section).stop().animate({
                    scrollLeft: $(section + ' ' + elem).eq(b ? b : n)[0].offsetLeft + 6
                }, speed, function() {


                    slidetimeout = setTimeout(function() {
                        _that.bucSliderHorizontal(section, elem, b ? b : n, delay, speed);

                    }, delay);


                });


            };

            timeoutonextslidefunc();


            $(section).off('scroll.scrollSlider').on('scroll.scrollSlider', function(e) {
                _that.pauseVideos();

            });



            $(section).parent().off('click.stopbucSlider mouseenter.stopbucSlider').on("click.stopbucSlider mouseenter.stopbucSlider", function() {

                $(section).stop(true, false);
                clearTimeout(slidetimeout);
            });

            $(section).parent().off('mouseleave.resumebucSlider').on("mouseleave.resumebucSlider", function() {


                var goToelem;
                $(section + ' ' + elem).each(function() {


                    if ($(this).position().left > 0) {

                        goToelem = $(this).index();
                        return false;
                    }
                });

                timeoutonextslidefunc(goToelem ? goToelem : '');

            });


        },


        // fadeIn 
        bucFadeIn: function(n, section, elem, delay, speed) {

            var _that = this;


            $(section).find(elem).eq(n).css(_that._BrowserPrefix() + 'animation-duration', speed + 'ms').addClass('animfadein').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
                setTimeout(function() {
                    $(this).removeClass('animfadein');
                    n++;
                    if (n == $(section).find(elem).length) n = 0;
                    _that.bucFadeIn(n, section, elem, delay, speed);
                }, delay);
            });




        },

        // Check what vendor prefix should be used in the current browser
        _BrowserPrefix: function() {
            var resp = '';
            var div = document.createElement('div'),
                prefixes = ['Webkit', 'Moz', 'ms', 'O'];

            if ('transform' in div.style) {
                return '';
            }

            for (var i = 0; i < prefixes.length; i++) {
                if ((prefixes[i] + 'Transform') in div.style) {
                    resp = '-' + prefixes[i].toLowerCase() + '-';
                    break;
                }
            }

            return resp;
        },
        getBwFeatures: function() {
            var result = '';
            var element = document.body || document.documentElement,
                elementStyle = element.style,
                isCSSTransitions = typeof elementStyle.transition !== 'undefined' || typeof elementStyle.WebkitTransition !== 'undefined' || typeof elementStyle.MozTransition !== 'undefined' || typeof elementStyle.OTransition !== 'undefined';
            if (isCSSTransitions === true) {
                var div = document.createElement('div');
                // Check if 3D transforms are supported
                if (typeof div.style.WebkitPerspective !== 'undefined' || typeof div.style.perspective !== 'undefined') {
                    result = 'translate3d';
                }
                // Additional checks for Webkit
                if (result === 'css3D' && typeof div.styleWebkitPerspective !== 'undefined') {
                    var style = document.createElement('style');
                    style.textContent = '@media (transform-3d),(-webkit-transform-3d){#test-for-3D{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}';
                    document.getElementsByTagName('head')[0].appendChild(style);
                    div.id = 'test-for-3D';
                    document.body.appendChild(div);
                    if (!(div.offsetLeft === 9 && div.offsetHeight === 5)) {
                        result = null;
                    }
                    style.parentNode.removeChild(style);
                    div.parentNode.removeChild(div);
                }
                // If CSS 3D transforms are not supported, check if 2D transforms are supported
                if (!result && (typeof div.style['-webkit-transform'] !== 'undefined' || typeof div.style.transform !== 'undefined')) {
                    result = 'translate';
                }
            } else {
                result = 'translate';
            }
            return result;
        },

        endTransitionEvent: function() {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        },
        endAnimationEvent: function() {
            var t;
            var el = document.createElement('fakeelement');
            var animation = {
                'animation': 'animationend',
                'OAnimation': 'oAnimationEnd',
                'MSAnimation': 'MSAnimationEnd',
                'WebkitAnimation': 'webkitAnimationEnd'
            };
            for (t in animation) {
                if (el.style[t] !== undefined) {
                    return animation[t];
                }
            }
        },
        _getVideoSize: function() {

            return ((61 / 100) * $(window).height());
        },
        // make template
        makeTemplate: function(s, a) {
            var x;

            for (var i in a) {
                x = new RegExp(i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "g");

                s = s.replace(x, a[i]);
            }

            return s;


        },
        getCurrentWether: function(a, clbk) {
            var _that = this;
            $.ajax({
                url: "https://geoip-db.com/jsonp",
                jsonpCallback: "callback",
                dataType: "jsonp",
                success: function(loc) {
                    console.log(loc);
                    $('#country').html(loc.country_name);
                    $('#state').html(loc.state);
                    $('#city').html(loc.city);
                    $('#latitude').html(loc.latitude);
                    $('#longitude').html(loc.longitude);
                    $('#ip').html(loc.IPv4);

                    // get wather
                    $.ajax({
                        url: "http://api.openweathermap.org/data/2.5/weather?lat=47.0056&lon=28.8575&units=metric&appid=16a8f2515eb8f3b8cfd46ecce7cff3b7",
                        jsonpCallback: "callback",
                        dataType: "jsonp",
                        error: function() {
                            if (clbk) clbk(0);
                        },
                        success: function(weather) {

                            _that.callback('weather');
                            console.log(weather);

                            var temperature_gr_celsius = weather.main.temp;
                            var city_name = weather.name;
                            var weather_descr = weather.weather[0].description;
                            var weather_ic = weather.weather[0].icon;
                            var weather_pressure = weather.main.pressure;
                            var weather_humidity = weather.main.humidity;


                            // Create a new JavaScript Date object based on the timestamp
                            // multiplied by 1000 so that the argument is in milliseconds, not seconds.\
                            var date = new Date(weather.dt * 1000);
                            // Hours part from the timestamp
                            var hours = date.getHours();


                            var bg_weather_wallpaper = weather.weather[0].main + '/day.jpg';
                            var night_time = ["20", "21", "22", "23", "24", "0", "1", "2", "3", "4", "5", "6"];

                            if (night_time.indexOf(hours.toString()) > -1)
                                bg_weather_wallpaper = weather.weather[0].main + '/night.jpg';


                            // create background wallpaper
                            $('#weather_forecast_img').attr('style', 'background-image:url(' + _that.options.host + '/templates/weather/background/' + bg_weather_wallpaper + ')');


                            // grade celsius
                            $('.weather_grades_celsius').html(temperature_gr_celsius + '&deg;');

                            // city name
                            $('.weather_city_name').html(city_name);

                            // weather description
                            $('.weather_descr').html(weather_descr);

                            // weather icon
                            $('.weather_icon img').attr('src', 'http://openweathermap.org/img/w/' + weather_ic + '.png');

                            // humity
                            $('#weather_humidity').html(weather_humidity + '%');
                            //	alert(weather_pressure)
                            // pressure
                            $('#weather_pressure').html(weather_pressure + 'hPa');
                            if (clbk) clbk(1);
                        }
                    });



                }
            });

        },
        buildGMap: function() {
            var _that = this;
            var gm_opts = _that.options.wall.gmaps;

            // Note: This example requires that you consent to location sharing when
            // prompted by your browser. If you see the error "The Geolocation service
            // failed.", it means you probably did not give permission for the browser to
            // locate you.
            $.getScript(gm_opts.url + '&key=' + gm_opts.apikey, function() {

                var map, infoWindow;
                var binitGMap = function() {

                    map = new google.maps.Map(document.getElementById('gmaps'), {
                        center: {
                            lat: -34.397,
                            lng: 150.644
                        },
                        zoom: 6
                    });

                    infoWindow = new google.maps.InfoWindow;

                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {

                        navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent('<div class="gmap-location-found">Your Location</div>');
                            infoWindow.open(map);
                            map.setCenter(pos);
                        }, function() {
                            handleLocationError(true, infoWindow, map.getCenter());
                        });

                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());
                    }

                };

                binitGMap();

                var handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(browserHasGeolocation ?
                        '<div class="gmap-location-found">Error: The Geolocation service failed.</div>' :
                        '<div class="gmap-location-found">Error: Your browser doesn\'t support geolocation.</div>');
                    infoWindow.open(map);



                }




            });



        },
        // youtube
        buildYoutube: function(filter, clbk) {




            var _that = this;
            var yt_opts = _that.options.wall.youtube;
            var _app_to = filter ? '#bfiltercnt' : '#youtubewall > #yt-slider-cnt';


            var url = yt_opts.yturl + yt_opts.channelID + '&order=' + yt_opts.order + '&key=' + yt_opts.key + '&maxResults=' + (filter ? yt_opts.filter_result_limit : yt_opts.limit);
            $.getJSON(url, function(data) {

                _that.callback('youtube');
                for (var i = 0; i < data.items.length; ++i) {
                    var item = data.items[i];
                    console.log(item);
                    $(_app_to).append(_that.makeTemplate(yt_opts.markup, {
                            '{{yt-thumb}}': item.snippet.thumbnails.medium.url,
                            '{{yt-title}}': item.snippet.title,
                            '{{yt-added}}': timeSince(toTimestamp(item.snippet.publishedAt)),
                            '{{yt-vd-id}}': item.id.videoId
                        })

                    );




                }

                $('#yt-slider-cnt .ytwall-block').each(function() {


                    $(this).find('.yt_video_play_btn').on('click', function(e) {
                        e.preventDefault();
                        var video_id = $(this).attr('id');
                        var yt_block = $(this).closest('.ytwall-block');
                        var yt_thumb = yt_block.find('.yt-bg-thumb'),
                            yt_thumb_w = yt_thumb.width(),
                            yt_thumb_h = yt_thumb.height();
                        yt_thumb.hide();
                        $(this).closest('.ytwall-block').find('.yt-bg-thumb').after('<iframe id="yt_iframe_play" width="' + yt_thumb_w + '" height="' + yt_thumb_h + '"  src="https://www.youtube.com/embed/' + video_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
                        yt_block.addClass('playing');


                    });

                });

                $('#yt-slider-cnt').mousewheel(function(event, delta) {

                    this.scrollLeft -= (delta * 90);

                    event.preventDefault();
                    event.stopPropagation();
                    var yt_cur_playing = $('.ytwall-block.playing');

                    yt_cur_playing.removeClass('playing');
                    yt_cur_playing.find('.yt-bg-thumb').show();
                    $('#yt_iframe_play').remove();

                });
                setTimeout(function() {

                    //$('#yt-slider-cnt').nanoScroller();

                    _that.bucSliderHorizontal('#yt-slider-cnt', '.ytwall-block', 0, 5000, 2900);




                }, 1000);

                if (clbk) clbk(1);
                if (filter) filter();
            }).error(function() {

                if (clbk) clbk(0);

            });
        },

        // news 
        buildNews: function(filter, clbk) {


            var _that = this;
            var news_opts = _that.options.wall.news;
            var _app_to = filter ? '#bfiltercnt' : '#news_wall';


            $.ajax({
                type: 'post',
                dataType: 'json',
                url: news_opts.newsurl,
                data: {
                    'country': news_opts.country,
                    'language': news_opts.language,
                    'key': news_opts.apiKey,
                    'category': news_opts.category,
                    'source': news_opts.source
                },
                error: function() {
                    if (clbk) clbk(0);
                },
                success: function(res) {
                    console.log(res);
                    _that.callback('news');
                    var d;


                    d = res.articles ? res.articles : '';
                    if (d) {
                        for (var i = 0; i < d.length; i++) {

                            $(_app_to).append(_that.makeTemplate(news_opts.markup, {
                                    '{{news-image}}': d[i].urlToImage,
                                    '{{news-title}}': d[i].title,
                                    '{{news-link}}': d[i].url
                                })

                            );
                        }
                    }


                    _that.bucFadeIn(0, '.news_wall', '.news-block-img', 9000, 2000);
                    if (clbk) clbk(1);
                    if (filter) filter();
                }
            });


        },

        // pinterest
        buildPinterest: function(filter, clbk) {



            var _that = this;
            var pin_opts = _that.options.wall.pinterest;
            var _app_to = filter ? '#bfiltercnt' : '.pinterest_wall';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: pin_opts.pinurl,
                data: {
                    'id': pin_opts.page,
                    'limit': filter ? pin_opts.filter_result_limit : pin_opts.limit,
                    'feed': 'user',
                    'type': 'pinterest'
                },

                success: function(d) {
                    console.log(d);
                    if (clbk) clbk(1);

                    _that.callback('pinterest');
                    if (d) {
                        for (var i = 0; i < d.item.length; i++) {
                            var p = d.item[i];
                            ///var _twtwall = _that.makeTemplate(,{  '{{twt-attachment-type}}' : t.entities.media[0].type === 'video' ? twt_opts.markup._cnt_video : twt_opts.markup._cnt_image});

                            $(_app_to).append(_that.makeTemplate(pin_opts.markup.wall, {
                                    '{{pin-image-src}}': p.image,
                                    '{{pin-text}}': p.text,
                                    '{{pin-feed-title}}': p.feedTitle,
                                    '{{pin-created}}': timeSince(toTimestamp(p.publishedDate))

                                })

                            );
                        }
                        LetterAvatar.transform();
                        setTimeout(function() {

                            $('#pinterestnano').nanoScroller();

                            _that.bucSlider('.pinterest_wall', '.pinwall-block', 0, 5000, 2900);
                        }, 1000);
                        if (filter) filter();
                    }

                },
                error: function(a, b, c) {
                    if (clbk) clbk(0);
                }
            });

        },

        // twitter
        buildTwtWall: function(filter, clbk) {


            var _that = this;
            var twt_opts = _that.options.wall.twitter;
            var _app_to = filter ? '#bfiltercnt' : '#twt_wall';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: twt_opts.twturl,
                data: {
                    'consumer_key': twt_opts.twt_consumer_key,
                    'consumer_secret': twt_opts.twt_consumer_secret,
                    'oauth_access_token': twt_opts.twt_oauth_access_token,
                    'oauth_access_token_secret': twt_opts.twt_oauth_access_token_secret,
                    'categ': 'timeline',
                    'screen_name': twt_opts.page,
                    'count': filter ? twt_opts.filter_result_limit : twt_opts.limit,
                    'include_entities': twt_opts.include_entities,
                    'include_rts': twt_opts.include_rts,
                    'exclude_replies': twt_opts.exclude_replies
                },
                success: function(d) {
                    console.log(d);
                    _that.callback('twitter');
                    if (d) {
                        for (var i = 0; i < d.length; i++) {
                            var t = d[i];
                            //alert(typeof t.entities.media);
                            var _twtwall = _that.makeTemplate(twt_opts.markup.wall, {
                                '{{twt-attachment-type}}': twt_opts.markup._cnt_image
                            }); //typeof t.entities.media !== 'undefined'  ? (t.entities.media[0].type === 'video' ? twt_opts.markup._cnt_video : twt_opts.markup._cnt_image) : ''});

                            $(_app_to).append(_that.makeTemplate(_twtwall, {
                                    '{{twt-header-name}}': t.user.name,
                                    '{{twt-header-created}}': parseTwitterDate(t.created_at),
                                    '{{twt-header-ic}}': t.user.profile_image_url,
                                    '{{twt-username}}': t.user.screen_name,
                                    '{{twt-cnt-description}}': t.full_text,
                                    '{{twt-image-src}}': t.entities.media != undefined ? t.entities.media[0].media_url : ''
                                })

                            );
                        }

                        setTimeout(function() {

                            $('.twtnano').nanoScroller();

                            _that.bucSlider('#twt_wall', '.twtwall-block', 0, 5000, 2900);
                        }, 1000);
                        if (clbk) clbk(1);
                        if (filter) filter();
                    }

                },
                error: function(a, b, c) {
                    if (clbk) clbk(0);
                }
            });


        },
        buildTumblr: function(filter, clbk) {

            var _that = this;
            var tb_opts = _that.options.wall.tumblr;
            var _app_to = filter ? $('#bfiltercnt') : $('#tb-slider-cnt');
            var _url = 'http://' + tb_opts.page + '.tumblr.com/api/read/json?callback=?&num=' + escape(filter ? tb_opts.filter_result_limit : tb_opts.limit);


            $.getJSON(_url, function(res) {

                var d;


                d = res.posts ? res.posts : '';

                console.log(d);
                for (var i = 0; i < d.length; i++) {
                    var _tbwall = _that.makeTemplate(tb_opts.markup.wall, {
                        '{{tb-attachment-type}}': d[i].type === 'video' ? tb_opts.markup._cnt_video : tb_opts.markup._cnt_image
                    });

                    _app_to.append(_that.makeTemplate(_tbwall, {
                        '{{tb-image-src}}': d[i]['photo-url-400'],
                        '{{tumblr-video}}': d[i]['video-player-250'],
                        '{{tumblr-caption}}': d[i].type === 'video' ? d[i]['video-caption'] : d[i]['photo-caption'],
                        '{{tb-page-ic}}': d[i].tumblelog['avatar_url_48'],
                        '{{tb-title}}': d[i].tumblelog.title,
                        '{{tb-timestamp}}': timeSince(d[i]['unix-timestamp']),
                        '{{tb-page-url}}': d[i].tumblelog.url,
                        '{{tb-post-url}}': d[i].url
                    }));
                }


                setTimeout(function() {

                    $('#tumblrnano').nanoScroller();

                    _that.bucSlider('#tb-slider-cnt', '.tumblrwall-block', 0, 6000, 3700);

                }, 1000);
                if (clbk) clbk(1);
                if (filter) filter();
                _that.callback('tumblr');

            }).error(function() {
                if (clbk) clbk(0);
            });


        },


        // facebook wall
        buildFBwall: function(filter, clbk) { 
            var _that = this;
            var fb_opts = _that.options.wall.facebook;alert(fb_opts.fburl);
            var _app_to = filter ? $('#bfiltercnt') : $('#facebookwall')
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: fb_opts.fburl,
                data: {
                    'page': fb_opts.page,
                    'wall_type': fb_opts.wall_type,
                    'limit': filter ? fb_opts.filter_result_limit : fb_opts.result_limit,
                    'fb.app.id': fb_opts.fb_app_id,
                    'fb.app.secret': fb_opts.fb_app_secret
                },
                error: function() {
                    if (clbk) clbk(0);
                },
                success: function(res) { console.log(res);

                    var d;


                    d = res.d.feed.entries ? res.d.feed.entries : '';

                    console.log(d);
                    for (var i = 0; i < d.length; i++) {
                        var _fbwall = _that.makeTemplate(fb_opts.markup.wall, {
                            '{{fb-attachment-type}}': d[i].TYPE === 'video' ? fb_opts.markup._cnt_video : fb_opts.markup._cnt_image
                        });

                        _app_to.append(_that.makeTemplate(_fbwall, {
                            '{{fb-image-src}}': d[i].THUMB,
                            '{{fb-attachment-video-id}}': d[i].ATTACHMENT_ID,
                            '{{fb-video-poster}}': d[i].THUMB,
                            '{{fb-video-src}}': d[i].POST_ID,
                            '{{fb-video-src}}': d[i].VIDEO_SOURCE,
                            '{{fb-max-video-height}}': _that._getVideoSize(),

                            '{{fb-comments-count}}': d[i].COMMENTS_COUNT,
                            '{{fb-likes-count}}': d[i].LIKES_COUNT,
                            '{{fb-header-created}}': d[i].DATE,
                            '{{fb-link}}': d[i].LINK,
                            '{{fb-wall-id}}': d[i].POST_ID,
                            '{{fb-cnt-description}}': d[i].CONTENT,
                            '{{fb-header-ic}}': d[i].PROFILE_PHOTO,
                            '{{fb-header-name}}': d[i].pageTITLE
                        }));
                    }


                    setTimeout(function() {

                        $('#facebooknano').nanoScroller();

                        _that.bucSlider('#facebookwall', '.fbwall-block', 0, 6000, 3700);

                    }, 1000);
                    if (clbk) clbk(1);
                    if (filter) filter();
                    _that.callback('facebook');
                }
            });

        },

        // instagram feed
        buildInstagramFeed: function(filter, clbk) {
            var _that = this;
			var inst_opts = _that.options.wall.instagram;
			
            var feed = new Instafeed({
                target: filter ? 'bfiltercnt' : 'instagramfeed',
                get: inst_opts.get, 
                userId: inst_opts.userId,

                accessToken: inst_opts.accessToken,

                sortBy: 'most-recent',
                limit: filter ? inst_opts.filter_result_limit : inst_opts.limit,
                resolution: 'standard_resolution',
                filter: function(image) {
                    var i_vd_size = _that._getVideoSize();
                    if (image.type == 'image') {
                        image.template_vd_img = '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>';
                    } else {
                        image.template_vd_img = '<div id="instgrvd{{model.id}}" class="instgr_video_player">\
				  <div class="instgr_video_controls_play" button-vd-play="1" onclick="document.getElementById(\'instgrvd{{model.id}}\').classList.add(\'playing\');document.getElementById(\'instagram_player_{{model.id}}\').play()">\
				  <div class="insgr_ic_play">&nbsp;</div>\
				  </div>\
				  <div class="instgr_video_controls_pause" button-vd-pause="1" onclick="document.getElementById(\'instgrvd{{model.id}}\').classList.remove(\'playing\');document.getElementById(\'instagram_player_{{model.id}}\').pause()">\
				  <div class="insgr_ic_pause" >&nbsp;</div>\
				  </div>\
				  <video id="instagram_player_{{model.id}}" width="100%" height="100%" style="max-height:' + i_vd_size + 'px;" poster="{{model.images.standard_resolution.url}}" loop>\
				 \
				  <source src="{{model.videos.standard_resolution.url}}" type="video/mp4" /></video></div>';


                    }
                    return true;
                },
                template: inst_opts.template, 
                error: function() {
                    if (clbk) clbk(0);
                },
                success: function(data) {

                    _that.callback('instagram');
                    for (var i = 0; i < data.data.length; i++) {



                        //count
                        var count = data.data[i].likes.count;
                        data.data[i].likes.roundcount = roundCount(count);
                        data.data[i].likes.count = numberWithCommas(count);

                        //comment
                        var comment = data.data[i].comments.count;
                        data.data[i].comments.roundcount = roundCount(comment);
                        data.data[i].comments.count = numberWithCommas(comment);

                        //time
                        var time = getTime(data.data[i].created_time);
                        data.data[i].time = time;

                        // text
                        for (var j = 0; j < data.data[i].tags.length; j++)
                            data.data[i].caption.text = data.data[i].caption.text.toLowerCase().replace('#' + data.data[i].tags[j], '<a target="_blank" href="https://www.instagram.com/explore/tags/' + data.data[i].tags[j] + '/">' + '#' + data.data[i].tags[j] + '</a>');


                    }
                    console.log(data);
                    if (clbk) clbk(1);
                },
                after: function() {

                    if (filter) filter();

                    setTimeout(function() {

                        $("#instagramnano").nanoScroller();

                        _that.bucSlider('#instagramfeed', '.instagram_feed', 0, 3000, 2000);

                    }, 1000)

                }
            });

            feed.run();


        },


        // flickr photos
        getFlickrPhotos: function(filter, clbk) {
            var _that = this;
            var _app_to = filter ? '#bfiltercnt' : '.flickr_im';

            $.getJSON(this.options.host + '/templates/flickr/flickr-api.php', function(data) {

                _that.callback('flickr');
                var items_count = data.items.length;



                //$('.flickr_imgs flickr_imgs ul');
                for (var i = 0; i < items_count; i++) {

                    var flickr_item = data.items[i];

                    $(_app_to).append('<div class="flicrk_img_slideshow bucblockitem" style="background-image:url(' + flickr_item.media.m + ')"><a href="' + flickr_item.link + '" target="_blank" class="flickr_photo_interract_view"></a><div class="flickr-photo-list-photo-interaction-interaction-bar"><div class="flickr-photo-list-photo-interaction-bar-text"><div class="flickr-photo-list-photo-interaction-bar-text-title">' + flickr_item.title + '</div></div></div></div>');


                }

                //$('.flickr_im').cycle({fx:'fadeINVER'});
                _that.bucFadeIn(0, '.flickr_im', '.flicrk_img_slideshow', 8000, 1800);
                if (clbk) clbk(1);
                if (filter) filter();
            }).error(function() {
                if (clbk) clbk(0);
            });




        },

        getCelebBirthday: function(a, clbk) {
            var _that = this;
            $.getJSON(this.options.host + "/templates/calendar/api.php", function(data) {
                _that.callback('birthday');
                var dt = data;
                console.log(dt);
                var birthdays = dt.Birthdays;
                var random_id = Math.floor(Math.random() * (birthdays.length - 1) + 1);


                var p_name = birthdays[random_id].name;
                var p_age = birthdays[random_id].age;
                var p_have_twitter = birthdays[random_id].twitter;


                $('.celeb_name').html(p_name + "'s birthday");
                $('.celeb_age').html('Age:&nbsp;' + p_age);
                $('.celeb_twitter').html(p_have_twitter ? '<A target="_blank" href="http://twitter.com/' + p_have_twitter + '>@' + p_have_twitter + '</a>' : '');
                $('.today_number').html(getDateDayName(1));
				$('.today_day_name').html(getDateDayName());

			   if (clbk) clbk(1);
            }).error(function(a, b, c) {

                if (clbk) clbk(0);

            });

        },

        enable: function() {
            this.enabled = true;
        },
        disable: function() {
            this.enabled = false;
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled;
        }
    };

    $.fn.BUC = function(options) {


        options = $.extend({}, $.fn.BUC.defaults, options);
        new BUC(this, options);

        return this;

    };

    $.fn.BUC.defaults = {
        host: 'http://localhost/',
		open_button: '<a href="javascript:void(0);">Open</a>',
        init_anim_duration: 340, // left & right slide, transition speed
        init_anim_easing: 'cubic-bezier(0.51, 0.38, 0, 0.86)', // transition easing

        /*
        @Disabled in v1
        menuBar: { 
		
        			position: 'right', // use right or left position
        			bgcolor: 'rgba(0, 0, 0, 0.41);' // background color
        },
        */

        // Background style
        vegas: {
            overlay: true,
            shuffle: true,

            firstTransition: 'fade',
            firstTransitionDuration: 8000,

            delay: 26000,
            preloadImage: true,
            transition: ['fade', 'fade2', 'blur', 'blur2'],

            transitionDuration: 2000,
            slides: [

                {
                    src: '/assets/vegas/images/1.png?v=2'
                },
                {
                    src: '/assets/vegas/images/2.png?v=2'
                },
                {
                    src: '/assets/vegas/images/3.jpg?v=2'
                },
                {
                    src: '/assets/vegas/images/4.png?v=2'
                },
                {
                    src: '/assets/vegas/images/5.jpg?v=2'
                },
                {
                    src: '/assets/vegas/images/6.jpg?v=2'
                },
                {
                    src: '/assets/vegas/images/7.jpg?v=2'
                },
                {
                    src: '/assets/vegas/images/8.jpg?v=2'
                }
            ]
        },

        blocks: [

            // calendar
            {
                html: '<div data-social="birthday" class="birthday_cnt"><div class="celeb_info">\
															<div class="celeb_name">&nbsp;</div>\
															<div class="celeb_age">&nbsp;</div>\
															<div class="celeb_twitter">&nbsp;</div>\
															</div>\
															<div class="today_date"><div class="today_number t_number"></div><div class="today_day_name"></div></div></div>',

                color: '#603cba',
                size: 'size21'


            },

            // weather
            {
                title: 'Block One',
                color: '#3498db',
                size: 'size22',
                html: '<div data-social="weather" class="weather_forecast">\
													<div class="weather_forecast_img" id="weather_forecast_img"></div>\
													<div class="weather_data_cnt">\
													<div class="weather_cnt_padding">\
													<div class="weather_grades_celsius t_number"></div>\
													<div class="weather_city_name ff"></div>\
													<div class="weather_descr ff"></div>\
													<div class="weather_icon"><img/></div>\
													<ul class="weather_bottom_i">\
													<li><div class="weatherli">Pressure:<span id="weather_pressure"></span></div></li>\
													<li><div class="weatherli">Humidity:<span id="weather_humidity"></span></div></li>\
													</ul>\
													</div>\
													</div>\
													</div>'

            },

            // instagram
            {
                html: '<header buc-open-gallery data-categ="instagram" class="instagram_top_header_ic"><i class="instagram_logo"></i></header><div data-social="instagram" class="nano" id="instagramnano"><div  id="instagramfeed" class="cycle-slideshow nano-content"></div></div>',

                color: '#fafafa',
                size: 'size23'


            },

            // flickr
            {
                html: '<header buc-open-gallery data-categ="flickr" class="flickr_top_header_ic"><i class="flickr_logo"></i></header><div data-social="flickr" class="flickr_im"></div>',

                color: '#333',
                size: 'size21'


            },


            // twitter
            {
                html: '<header buc-open-gallery data-categ="twitter" class="twt_top_header_ic"><i class="twt_logo"></i></header><div data-social="twitter" class="twtnano nano"><div id="twt_wall" class="twt_wall nano-content"></div></div>',

                color: '#1da1f2',
                size: 'size44'



            },

            // pinterest
            {
                html: '<header buc-open-gallery data-categ="pinterest" class="pinterest_top_header_ic"><i class="pinterest_logo"></i></header><div data-social="pinterest" class="pinterestnano nano" id="pinterestnano"><div class="pinterest_wall nano-content"></div></div>',

                color: '#bd081c',
                size: 'size44'


            },


            // news
            {
                html: '<header style="display:none;" buc-open-gallery data-categ="news" class="news_top_header_ic"></header><div data-social="news" id="news_wall" class="news_wall"></div>',

                color: '#b11840',
                size: 'size21'



            },


            //facebook
            {
                html: '<header buc-open-gallery data-categ="facebook" class="facebook_top_header_ic"><i class="facebook_logo"></i></header><div data-social="facebook" class="nano" id="facebooknano"><div id="facebookwall" class="facebook_wall nano-content"></div></div>',

                color: '#4457a5',
                size: 'size23'

            },

            //youtube
            {
                html: '<header buc-open-gallery data-categ="youtube" class="youtube_top_header_ic"><i class="youtube_logo"></i></header><div data-social="youtube" id="youtubewall" class="youtube_wall"><div id="yt-slider-cnt" class="yt-slider-cnt"></div></div>',

                color: '#f00',
                size: 'size21'


            },
            // tumblr
            {
                html: '<header buc-open-gallery data-categ="tumblr" class="tumblr_top_header_ic"><i class="tumblr_logo"></i></header><div data-social="tumblr" id="tumblrnano" class="nano tumblr_wall"><div id="tb-slider-cnt" class="tb-slider-cnt nano-content"></div></div>',

                color: '#36465d',
                size: 'size44'


            },

            // maps
            {
                html: '<div id="gmaps" class="gmaps"></div>',

                color: '#ddd',
                size: 'size23'

            }

        ],
        // Social Networks
        wall: {


            news: {

                newsurl: '/templates/news/news-api.php', // url api
                apiKey: '1a3fe735a7aa41cc9e926c4aa045538f', // your api key
                source: 'bbc-news', // list of sources here https://newsapi.org/sources
                category: 'general', // available categories [business, entertainment, gaming, general, music, politics, science-and-nature, sport, technology].
                //sortby: 'latest', // available options [latest,popular,top]
                language: 'en', // Possible options: en, de, fr.
                country: 'us', // Possible options: au, de, gb, in, it, us.
                markup: '<div class="news-block-img bucblockitem" style="background-image:url({{news-image}})">\
					<a href="{{news-link}}" target="_blank" class="news-block-a"></a>\
					<div class="news-title"><div class="news-title1"><a href="javascript:void(0);" onclick="$(\'.news_top_header_ic\').trigger(\'click\');" buc-open-gallery data-categ="news"><i class="news-ic"></i></a><span class="news-title-text">{{news-title}}</div></div></div></div>'
            },
			instagram: {
				
                get: 'user',
                userId: '22832340',// INSTAGRAM PAGE ID 

                accessToken: '4784198969.ba4c844.62f855e7f91f480eb231516c3bf768f4', // YOUR accessToken

                filter_result_limit: 40, // Limit of posts in filter mode
			    limit: 15, // limit of posts
				
				
				template: '<div  class="instagram_feed bucblockitem"><div class="instgr_header">' +
                    '<div class="instgr_profile_picture"><img src="{{model.caption.from.profile_picture}}"/></div>' +
                    '<div class="instgr_feedtitle"><div class="instgr_profile_name instgr_074f">{{model.caption.from.username}}</div>' +
                    '<div class="instgr_location instgr_074f">{{model.location.name}}</div>' +
                    '</div></div>' +

                    '<div class="instgr_cnt">' +
                    '{{model.template_vd_img}}' +
                    '</div>' +

                    '<div class="instgr_footer">' +
                    '<span class="instgr_likes instgr_footer_counts">{{model.likes.roundcount}} likes</span>' +
                    '<span class="instgr_footer_bullet">&#8226;</span>' +
                    '<span class="instgr_comments instgr_footer_counts">{{model.comments.count}} comments</span>' +
                    '<div class="instgr_caption_descr">{{model.caption.text}}</div>' +
                    '<div class="instgr_added_feed_time">{{model.time}} ago</div>' +
                    '</div>' +

                    '</div>'
				
				
			},
            facebook: {
                fburl: '/templates/facebook/fb-api.php',
                fb_app_id: '376081552810462', // YOUR FACEBOOK APP ID
                fb_app_secret: 'd9aeb5675407729bbf5c60424b6e03e2', // YOUR FACEBOOK APP SECRET
                page: 'ufc', // FACEBOOK PAGE NAME OR ID 
                result_limit: 4, // POSTS LIMIT
                filter_result_limit: 40, // POSTS LIMIT IN FILTERED 
                wall_type: 'feed', // FEED OR POSTS,
                markup: {


                    wall: '<div class="fbwall-block bucblockitem">\
					\
					\
								  <header class="fb-header">\
								  <div class="fbpg-ic"><img src="{{fb-header-ic}}" /></div>\
								  <div class="fb-header-txt"><div class="fb-header-name">{{fb-header-name}}</div>\
								  <div class="fb-header-added">{{fb-header-created}}</div></div>\
								  </header>\
					\
					\
									<div class="fb-content">\
									<div class="fb-descr">{{fb-cnt-description}}</div>\
										{{fb-attachment-type}}\
									</div>\
									<div class="fb-footer"><div class="fb-comm-count">{{fb-comments-count}} comments</div><span class="fb_footer_bullet">&#8226;</span><div class="fb-likes-count">{{fb-likes-count}} likes</div></div>\
								  </div>',

                    _cnt_video: '<div id="fbwallvd{{fb-wall-id}}" class="fb-wall-video-cnt">  \
				  <div class="fb_video_controls_play" button-vd-play="1" onclick="document.getElementById(\'fbwallvd{{fb-wall-id}}\').classList.add(\'playing\');var fb_video_tag = document.getElementById(\'fb_player_{{fb-wall-id}}\');fb_video_tag.setAttribute(\'controls\',\'true\');fb_video_tag.play()">\
				  <div class="fb_ic_play">&nbsp;</div>\
				  </div>\
				  <div class="fb_video_controls_pause" button-vd-pause="1" onclick="document.getElementById(\'fbwallvd{{fb-wall-id}}\').classList.remove(\'playing\');var fb_video_tag = document.getElementById(\'fb_player_{{fb-wall-id}}\'); fb_video_tag.removeAttribute(\'controls\');fb_video_tag.pause()">\
				  <div class="fb_ic_pause">&nbsp;</div>\
				  </div>\
				  <video id="fb_player_{{fb-wall-id}}" width="100%" height="auto" style="max-height:{{fb-max-video-height}}px;" poster="{{fb-video-poster}}" loop="false">\
				  <source src="{{fb-video-src}}" type="video/mp4" /></video>\
				  </div>',

                    _cnt_image: '<div class="fb-wall-image"><img src="{{fb-image-src}}" /></div>'

                }
            },
            youtube: {

                yturl: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=',
                channelID: 'UCk8XGxi7fsTqQQRVq9LSraw', // channel id
                order: 'date', // available opts [ date, rating, relevance, title ]
                key: 'AIzaSyDkWfm9LViG3qKV5yEHazHbs_dguSEUV2o', // YOUTUBE API KEY
                limit: 9, // Results limit
                filter_result_limit: 40, // POSTS LIMIT IN FILTER MODE
                markup: '<div class="ytwall-block bucblockitem"><div class="yt-bg-thumb" style="background-image:url({{yt-thumb}});"><div class="yt-video-btn"><div id="{{yt-vd-id}}" class="yt_video_play_btn" title="Play"></div></div></div><div class="yt-text"><div class="yt-title"><a href="https://www.youtube.com/watch?v={{yt-vd-id}}" target="_blank">{{yt-title}}</a></div><div class="yt-added">{{yt-added}}</div></div></div>'


            },

            twitter: {
                twturl: '/templates/twitter/twitter-api.php',
                twt_consumer_key: 'lJhiGPKLflNXM9GT49SwJs5RE', // YOUR TWT CONSUMER KEY
                twt_consumer_secret: '0dpL7SDUNpHSW7jvMNLlINck4hAU5O5MyXDHczCvoN2CqXs0Vb', // YOUR TWT CONSUMER KEY SECRET
                twt_oauth_access_token: '3110872181-0gRZk1bBj9SxRpJCHpMj057Fm7GA8J3BLATOrCz', // YOUR TWT ACCESS TOKEN 
                twt_oauth_access_token_secret: 'QECmXT1u67a0YI3TB3HRB1l21G72hTQbwQERul3nOGUg4', // YOUR TWT ACCESS TOKEN SECRET
                page: 'ufc', // PAGE NAME
                result_limit: 4, // LIMIT
                filter_result_limit: 40, // POSTS LIMIT IN FILTER MODE
                exclude_replies: true,
                include_rts: false,
                include_entities: true,
                markup: {


                    wall: '<div class="twtwall-block bucblockitem">\
					\
					\
								  <header class="twt-header">\
								  <div class="twtpg-ic"><img src="{{twt-header-ic}}" /></div>\
								  <div class="twt-header-txt"><div class="twt-header-name"><span class="twt-hdname">{{twt-header-name}}</span>&nbsp;<span class="twt-username">@{{twt-username}}</span><span class="twt_separator_bullet">&#8226;</span><span class="twt-created">{{twt-header-created}}</span></div>\
								  <div class="twt-header-descr">{{twt-cnt-description}}</div></div>\
								  </header>\
					\
					\
									<div class="twt-content">\
										{{twt-attachment-type}}\
									</div>\
									<div class="twt-footer"></div>\
								  </div>',

                    _cnt_video: '<div id="twtwallvd{{twt-wall-id}}" class="twt-wall-video-cnt">  \
				  <div class="twt_video_controls_play" button-vd-play="1" onclick="document.getElementById(\'twtwallvd{{twt-wall-id}}\').classList.add(\'playing\');var twt_video_tag = document.getElementById(\'twt_player_{{twt-wall-id}}\');twt_video_tag.setAttribute(\'controls\',\'true\');twt_video_tag.play()">\
				  <div class="twt_ic_play">&nbsp;</div>\
				  </div>\
				  <div class="twt_video_controls_pause" button-vd-pause="1" onclick="document.getElementById(\'twtwallvd{{twt-wall-id}}\').classList.remove(\'playing\');var twt_video_tag = document.getElementById(\'twt_player_{{twt-wall-id}}\'); twt_video_tag.removeAttribute(\'controls\');twt_video_tag.pause()">\
				  <div class="twt_ic_pause">&nbsp;</div>\
				  </div>\
				  <video id="twt_player_{{twt-wall-id}}" width="100%" height="auto" style="max-height:{{twt-max-video-height}}px;" poster="{{twt-video-poster}}" loop="false">\
				  <source src="{{twt-video-src}}" type="video/mp4" /></video>\
				  </div>',

                    _cnt_image: '<div class="twt-wall-image"><img src="{{twt-image-src}}" /></div>'

                }
            },


            pinterest: {
                pinurl: '/templates/rss/rss.php',
                page: 'ufc', // PAGE NAME
                limit: 4, // LIMIT
                filter_result_limit: 25, // LIMIT OF POSTS IN FILTER MODE
                markup: {


                    wall: '<div class="pinwall-block bucblockitem">\
				\
									<div class="pin-content">\
										<div class="pin-attch"><img src="{{pin-image-src}}" /></div>\
										<div class="pin-text">{{pin-text}}</div>\
									</div>\
									<div class="pin-footer"><div class="pin-avatar"><img class="round" width="24" height="24" avatar="{{pin-feed-title}}"></div><div class="pin-feedtitle">{{pin-feed-title}}</div><div class="pin-created">{{pin-created}}</div></div>\
								  </div>'

                }
            },

            tumblr: {

                page: 'ufc', // PAGE NAME
                limit: 6, // POSTS LIMIT
                filter_result_limit: 40, // LIMIT OF POSTS IN FILTER MODE
                markup: {


                    wall: '<div class="tumblrwall-block bucblockitem">\
				\
									<div class="tumblr-content">\
										<div class="tumblr-caption">{{tumblr-caption}}</div>\
										<div class="tumblr-attach"><a href="{{tb-post-url}}" target="_blank">{{tb-attachment-type}}</a></div>\
									</div>\
									<div class="tumblr-footer"><div class="tb-page-ic"><img src="{{tb-page-ic}}" /></div><A href="{{tb-page-url}}" target="_blank"><div class="tb-pagetitle">{{tb-title}}</div></a><div class="tb-right-time">{{tb-timestamp}}</div></div>\
								  </div>',
                    _cnt_video: '<div class="tb-wall-video">{{tumblr-video}}</div>',



                    _cnt_image: '<div class="tb-wall-image"><img src="{{tb-image-src}}" /></div>'

                }



            },

            gmaps: {

                url: 'https://maps.googleapis.com/maps/api/js?',
                apikey: 'AIzaSyCLlnEW1shPJ5ubJBfJ0eCt8_02zRsQFEE',
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 6



            }


        }

    };


})(jQuery);



/*
 * LetterAvatar
 * 
 * Artur Heinze
 * Create Letter avatar based on Initials
 * based on https://gist.github.com/leecrossley/6027780
 */
(function(w, d) {


    function LetterAvatar(name, size) {

        name = name || '';
        size = size || 60;

        var colours = [
                "#19181e", "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
                "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", "#999"
            ],

            nameSplit = String(name).toUpperCase().split(' '),
            initials, charIndex, colourIndex, canvas, context, dataURI;


        if (nameSplit.length == 1) {
            initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
        } else {
            initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        }

        if (w.devicePixelRatio) {
            size = (size * w.devicePixelRatio);
        }

        charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
        colourIndex = charIndex % 20;
        canvas = d.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        context = canvas.getContext("2d");

        context.fillStyle = colours[colourIndex - 1];
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "#FFF";
        context.fillText(initials, size / 2, size / 1.5);

        dataURI = canvas.toDataURL();
        canvas = null;

        return dataURI;
    }

    LetterAvatar.transform = function() {

        Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
            name = img.getAttribute('avatar');
            img.src = LetterAvatar(name, img.getAttribute('width'));
            img.removeAttribute('avatar');
            img.setAttribute('alt', name);
        });
    };


    // AMD support
    if (typeof define === 'function' && define.amd) {

        define(function() {
            return LetterAvatar;
        });

        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {

        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = LetterAvatar;
        }

        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.LetterAvatar = LetterAvatar;

    } else {

        window.LetterAvatar = LetterAvatar;

        d.addEventListener('DOMContentLoaded', function(event) {
            // LetterAvatar.transform();
        });
    }

})(window, document);




/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});