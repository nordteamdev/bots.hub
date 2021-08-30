

 // global vars
 var _nb_enabledFullScreenMode,
     _nb_easingOnMultipleClick = true,
     _nb_db_position,
     _nb_startPull,
     _nb_parallax_enabled = 1,
     _nb__crP,
     _nb_slidesStock = [],
     _nb_visImages_timeout,
     _nb_autoHeight_timeout,
     _nb_slideLoop_timeout,
     _nb_global_swipeSpeed,
     _nb_last_position = {},
     _nb_isTouchDevice = 'ontouchstart' in document.documentElement;


 ;
 (function(window, $) {

     'use strict';

     // Methods
     $.nobleSlider = {

         // List of added plugins
         plugins: [],

         // Add a plugin by extending the core prototype
         injectPlugin: function(n, p) {
             this.plugins.push(n);
             $.extend(nobleSlider.prototype, p);
         }
     };

     var NS = $.nobleSlider._DF_NM = '__SLIDER__';

     var nobleSlider = function(pattern, opts) {

         // Reference to the slider instance
         this.pattern = pattern;

         // Reference to the slider jQuery element
         this.__slider = $(this.pattern);

         // Reference to the slides (nb-slides) jQuery element
         this.__a_slides = null;

         // Reference to the mask (nb-mask) jQuery element
         this.__slGhost = null;

         // Reference to the slides (nb-slides-container) jQuery element
         this.__slPort = null;

         // Array of nobleSliderSlide objects, ordered by their DOM index
         this._slides = [];

         // Array of nobleSliderSlide objects, ordered by their left/top position in the slider.
         // This will be updated continuously if the slider is loopable.
         this._slidesTRIM = [];

         // Holds the options passed to the slider when it was instantiated
         this.opts = opts;

         // Holds the final settings of the slider after merging the specified
         // ones with the default ones.
         this.st = {};

         // Another reference to the settings which will not be altered by breakpoints or by other means
         this._OST = {};

         // Reference to the original 'getSlide' method
         this._orgGTSL = null;

         // The index of the currently selected slide (starts with 0)
         this._activeSL_IND = 0;

         // The index of the previously selected slide
         this._prevSL_IND = 0;

         // Indicates the position of the slide considered to be in the middle.
         // If there are 5 slides (0, 1, 2, 3, 4) the middle position will be 2.
         // If there are 6 slides (0, 1, 2, 3, 4, 5) the middle position will be approximated to 2.
         this._mdSL_POS = 0;

         // Indicates the type of supported transition (CSS3 2D, CSS3 3D or JavaScript)
         this._sup_ANIM = null;

         // Indicates the required vendor prefix for CSS (i.e., -webkit, -moz, etc.)
         this._browserPFX = null;

         // Indicates the name of the CSS transition's complete event (i.e., transitionend, webkitTransitionEnd, etc.)
         this._crossEVT = null;

         // Indicates the 'left' or 'top' position
         this._posPropty = null;

         // Indicates if the current browser is IE
         this.isIE = null;

         // The position of the slides container
         this._sl_POS = 0;

         // The width of the individual slide
         this._SLIDE_W = 0;

         // The height of the individual slide
         this._SLIDE_H = 0;

         // The width or height, depending on the orientation, of the individual slide
         this._SLIDE_DIMENSION = 0;

         // Reference to the old slide width, used to check if the width has changed
         this._prev_SLIDE_W = 0;

         // Reference to the old slide height, used to check if the height has changed
         this._prev_SLIDE_H = 0;

         // Reference to the old window width, used to check if the window width has changed
         this._prev_WIN_W = 0;

         // Reference to the old window height, used to check if the window height has changed
         this._prev_WIN_H = 0;

         // The distance from the margin of the slider to the left/top of the selected slide.
         // This is useful in calculating the position of the selected slide when there are 
         // more visible slides.
         this._visible_EQ = 0;

         // Property used for deferring the resizing of the slider
         this._ALLOW_RZ = true;

         // Unique ID to be used for event listening
         this._original_ID = new Date().getTime();

         // Stores size breakpoints
         this._SLIDE_ADJUST_RESIZE = [];

         // Indicates the current size breakpoint
         this._cur_brkp = -1;

         // An array of shuffled indexes, based on which the slides will be shuffled
         this._randomizeArr = [];

         // Initialize the slider
         this.__INITIALIZE();
     };

     nobleSlider.prototype = {

         // The starting place for the slider
         __INITIALIZE: function() {
             var _this = this;

             this._sup_ANIM = nobleSliderUtils.getBrowserFeatures();
             this._browserPFX = nobleSliderUtils._getBrowserPrefix();
             this._crossEVT = nobleSliderUtils.__getTransitionEVT();
             this.isIE = nobleSliderUtils._chmsIE();

             // Remove the 'nb-no-js' when the slider's JavaScript code starts running
             this.__slider.removeClass('nb-no-js');

             // Add the 'ios' class if it's an iOS device
             if (window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                 this.__slider.addClass('ios');
             }
             // clear previous bezier value
             localStorage.removeItem('cbz');
             localStorage.removeItem('slideOnlyThumbs');

             // Check if IE (older than 11) is used and add the version number as a class to the slider since
             // older IE versions might need CSS tweaks.
             var rmsie = /(msie) ([\w.]+)/,
                 ieVersion = rmsie.exec(window.navigator.userAgent.toLowerCase());

             if (this.isIE) {
                 this.__slider.addClass('ie');
             }

             if (ieVersion !== null) {
                 this.__slider.addClass('ie' + parseInt(ieVersion[2], 10));
             }


             // Set up the slides containers
             // nobleSlider > nb-slides-container > nb-mask > nb-slides > nb-slide
             this.__slPort = $('<div class="nb-slides-container"></div>').appendTo(this.__slider);
             this.__slGhost = $('<div class="nb-mask"></div>').appendTo(this.__slPort);
             this.__a_slides = this.__slider.find('.nb-slides').appendTo(this.__slGhost);
             this.__slider.find('.nb-slide').appendTo(this.__a_slides);

             var plugins = $.nobleSlider.plugins;

             // Merge the plugins default settings with the core's default settings
             if (typeof plugins !== 'undefined') {
                 for (var i = 0; i < plugins.length; i++) {
                     var defaults = plugins[i].substring(0, 1).toLowerCase() + plugins[i].substring(1) + 'Defaults';

                     if (typeof this[defaults] !== 'undefined') {
                         $.extend(this.defaults, this[defaults]);
                     }
                 }
             }

             // Merge the specified setting with the default ones
             this.st = $.extend({}, this.defaults, this.opts);

             localStorage.setItem('slideOnlyThumbs', this.st._SHOW_ONLY_THUMBS);

             // Initialize the plugins
             if (typeof plugins !== 'undefined') {
                 for (var j = 0; j < plugins.length; j++) {
                     if (typeof this['init' + plugins[j]] !== 'undefined') {
                         this['init' + plugins[j]]();
                     }
                 }
             }

             // Keep a reference of the original settings and use it
             // to restore the settings when the breakpoints are used.
             this._OST = $.extend({}, this.st);

             // Get the reference to the 'getSlide' method
             this._orgGTSL = this.getSlide;

             // Parse the breakpoints object and store the values into an array,
             // sorting them in ascending order based on the specified size.
             if (this.st._SLIDE_ADJUST_RESIZE !== null) {
                 for (var sizes in this.st._SLIDE_ADJUST_RESIZE) {
                     this._SLIDE_ADJUST_RESIZE.push({
                         size: parseInt(sizes, 10),
                         properties: this.st._SLIDE_ADJUST_RESIZE[sizes]
                     });
                 }

                 this._SLIDE_ADJUST_RESIZE = this._SLIDE_ADJUST_RESIZE.sort(function(a, b) {
                     return a.size >= b.size ? 1 : -1;
                 });
             }

             // Set which slide should be selected initially
             this._activeSL_IND = this.st._INITIAL_ACTIVE_SLIDE;

             // Shuffle/randomize the slides
             if (this.st._RANDOMIZE_SLIDES === true) {
                 var slides = this.__a_slides.find('.nb-slide'),
                     shuffledSlides = [];

                 // Populate the '_randomizeArr' with index numbers
                 slides.each(function(index) {
                     _this._randomizeArr.push(index);
                 });

                 for (var k = this._randomizeArr.length - 1; k > 0; k--) {
                     var l = Math.floor(Math.random() * (k + 1)),
                         temp = this._randomizeArr[k];

                     this._randomizeArr[k] = this._randomizeArr[l];
                     this._randomizeArr[l] = temp;
                 }

                 // Reposition the slides based on the order of the indexes in the
                 // '_randomizeArr' array
                 $.each(this._randomizeArr, function(index, element) {
                     shuffledSlides.push(slides[element]);
                 });

                 // Append the sorted slides to the slider
                 this.__a_slides.empty().append(shuffledSlides);
             }

             // Resize the slider when the browser window resizes.
             // Also, deffer the resizing in order to not allow multiple
             // resizes in a 200 milliseconds interval.
             $(window).on('resize.' + this._original_ID + '.' + NS, function() {

                 // Get the current width and height of the window
                 var newWindowWidth = $(window).width(),
                     newWindowHeight = $(window).height();

                 // If the resize is not allowed yet or if the window size hasn't changed (this needs to be verified
                 // because in IE8 and lower the resize event is triggered whenever an element from the page changes
                 // its size) return early.
                 if (_this._ALLOW_RZ === false ||
                     (_this._prev_WIN_W === newWindowWidth && _this._prev_WIN_H === newWindowHeight)) {
                     return;
                 }

                 // Asign the new values for the window width and height
                 _this._prev_WIN_W = newWindowWidth;
                 _this._prev_WIN_H = newWindowHeight;

                 _this._ALLOW_RZ = false;

                 setTimeout(function() {
                     _this.resize();
                     _this._ALLOW_RZ = true;
                 }, 200);
             });

             // Resize the slider when the 'update' method is called.
             this.on('update.' + NS, function() {

                 // Reset the previous slide width
                 _this._prev_SLIDE_W = 0;

                 // Some updates might require a resize
                 _this.resize();
             });

             this.update();

             // add the 'nb__active' class to the initially selected slide
             this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).addClass('nb__active');
             // enable parallax
             this.enableDisable_parallax(this._activeSL_IND);

             // add object to local storage
             localStorage.setItem('NB_slide_bezier', this.st._SLIDER_BEZIER_ENGINE);



             // remove all slides from DOM, to save memory
             /*
	     this.__a_slides.children().each(function(i){

		_nb_slidesStock[i] = this.outerHTML;

		if(i <= 2)
		return;

		this.remove();


	      });*/



			var _this = this;
             // Fire the 'init' event
             this.trigger({
                 type: 'init'
             });
             if ($.isFunction(this.st.init)) {
                 this.st.init.call(this, {
                     el:_this
                 });
				 this.update();
             }
         },

         // Update the slider by checking for setting changes and for slides
         // _this weren't initialized yet.
         update: function() {
             var _this = this;

             // Check the current slider orientation and reset CSS _this might have been
             // added for a different orientation, since the orientation can be changed
             // at runtime.
             if (this.st._SLIDES_ORIENTATION === 'horizontal') {
                 this.__slider.removeClass('nb-vertical').addClass('nb-horizontal');
                 this.__slider.css({
                     'height': '',
                     'max-height': ''
                 });
                 this.__a_slides.find('.nb-slide').css('top', '');
             } else if (this.st._SLIDES_ORIENTATION === 'vertical') {
                 this.__slider.removeClass('nb-horizontal').addClass('nb-vertical');
                 this.__a_slides.find('.nb-slide').css('left', '');
             }

             // Set the position _this will be used to arrange elements, like the slides,
             // based on the orientation.
             this._posPropty = this.st._SLIDES_ORIENTATION === 'horizontal' ? 'left' : 'top';

             // Reset the 'getSlide' method
             this.getSlide = this._orgGTSL;

             // _SLIDE_LOOP through the array of nobleSliderSlide objects and if a stored slide is found
             // which is not in the DOM anymore, destroy _this slide.
             for (var i = this._slides.length - 1; i >= 0; i--) {
                 if (this.__slider.find('.nb-slide[data-index="' + i + '"]').length === 0) {
                     var slide = this._slides[i];

                     slide.destroy();
                     this._slides.splice(i, 1);
                 }
             }

             this._slidesTRIM.length = 0;

             // _SLIDE_LOOP through the list of slides and initialize newly added slides if any,
             // and reset the index of each slide.
			
             this.__slider.find('.nb-slide').each(function(index) {
                 var $slide = $(this);

                 if (typeof $slide.attr('data-init') === 'undefined') {
                     _this._createSlide(index, $slide);
                 } else {
                     _this._slides[index].setIndex(index);
                 }

                 _this._slidesTRIM.push(index);
             });

             // Calculate the position/index of the middle slide
             this._mdSL_POS = parseInt((_this._slidesTRIM.length - 1) / 2, 10);

             // Arrange the slides in a _SLIDE_LOOP
             if (this.st._SLIDE_LOOP === true) {
                 this._updateSlidesOrder();
             }

             // Fire the 'update' event
             this.trigger({
                 type: 'update'
             });
             if ($.isFunction(this.st.update)) {
                 this.st.update.call(this, {
                     type: 'update'
                 });
             }
         },

         // Create a nobleSliderSlide instance for the slide passed as a jQuery element
         _createSlide: function(index, element) {
             var _this = this,
                 slide = new nobleSliderSlide($(element), index, this.st);

             this._slides.splice(index, 0, slide);
         },

         // Arrange the slide elements in a _SLIDE_LOOP inside the 'slidesOrder' array
         _updateSlidesOrder: function() {
             var slicedItems,
                 i,

                 // Calculate the distance between the selected element and the middle position
                 distance = $.inArray(this._activeSL_IND, this._slidesTRIM) - this._mdSL_POS;

             // If the distance is negative it means _this the selected slider is before the middle position, so
             // slides from the end of the array will be added at the beginning, in order to shift the selected slide
             // forward.
             // 
             // If the distance is positive, slides from the beginning of the array will be added at the end.
             if (distance < 0) {
                 slicedItems = this._slidesTRIM.splice(distance, Math.abs(distance));

                 for (i = slicedItems.length - 1; i >= 0; i--) {
                     this._slidesTRIM.unshift(slicedItems[i]);
                 }
             } else if (distance > 0) {
                 slicedItems = this._slidesTRIM.splice(0, distance);

                 for (i = 0; i <= slicedItems.length - 1; i++) {
                     this._slidesTRIM.push(slicedItems[i]);
                 }
             }
         },

         // Set the left/top position of the slides based on their position in the 'slidesOrder' array
         _updateSlidesPosition: function() {
             var selectedSlidePixelPosition = parseInt(this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).css(this._posPropty), 10);

             for (var slideIndex = 0; slideIndex < this._slidesTRIM.length; slideIndex++) {
                 var slide = this.__a_slides.find('.nb-slide').eq(this._slidesTRIM[slideIndex]);
                 slide.css(this._posPropty, selectedSlidePixelPosition + (slideIndex - this._mdSL_POS) * (this._SLIDE_DIMENSION + this.st._SLIDES_SPACING));
             }

         },

         // Set the left/top position of the slides based on their position in the 'slidesOrder' array,
         // and also set the position of the slides container.
         _resetSlidesPosition: function() {
             for (var slideIndex = 0; slideIndex < this._slidesTRIM.length; slideIndex++) {
                 var slide = this.__a_slides.find('.nb-slide').eq(this._slidesTRIM[slideIndex]);
                 slide.css(this._posPropty, slideIndex * (this._SLIDE_DIMENSION + this.st._SLIDES_SPACING));
             }

             var newSlidesPosition = -parseInt(this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).css(this._posPropty), 10) + this._visible_EQ;
             this._moveSlide(newSlidesPosition, true);
         },

         // Called when the slider needs to resize
         resize: function(a) {
             var _this = this;


             // Check if the current window width is bigger than the biggest breakpoint
             // and if necessary reset the properties to the original settings.
             // 
             // If the window width is smaller than a certain breakpoint, apply the settings specified
             // for _this breakpoint but only after merging them with the original settings
             // in order to make sure _this only the specified settings for the breakpoint are applied
             if (this.st._SLIDE_ADJUST_RESIZE !== null && this._SLIDE_ADJUST_RESIZE.length > 0) {
                 if ($(window).width() > this._SLIDE_ADJUST_RESIZE[this._SLIDE_ADJUST_RESIZE.length - 1].size && this._cur_brkp !== -1) {
                     this._cur_brkp = -1;
                     this._setProperties(this._OST, false);
                 } else {
                     for (var i = 0, n = this._SLIDE_ADJUST_RESIZE.length; i < n; i++) {
                         if ($(window).width() <= this._SLIDE_ADJUST_RESIZE[i].size) {
                             if (this._cur_brkp !== this._SLIDE_ADJUST_RESIZE[i].size) {
                                 var eventObject = {
                                     type: '_CLBK_ADJUST_RESIZE_REACH',
                                     size: this._SLIDE_ADJUST_RESIZE[i].size,
                                     settings: this._SLIDE_ADJUST_RESIZE[i].properties
                                 };
                                 this.trigger(eventObject);
                                 if ($.isFunction(this.st._CLBK_ADJUST_RESIZE_REACH))
                                     this.st._CLBK_ADJUST_RESIZE_REACH.call(this, eventObject);

                                 this._cur_brkp = this._SLIDE_ADJUST_RESIZE[i].size;
                                 var settings = $.extend({}, this._OST, this._SLIDE_ADJUST_RESIZE[i].properties);
                                 this._setProperties(settings, false);

                                 return;
                             }

                             break;
                         }
                     }
                 }
             }

             // Set the width of the main slider container based on whether or not the slider is responsive,
             // full width or full size
             if (this.st._SLIDER_IS_RESPONSIVE === true) {
                 if ((this.st._ENFORCE_SLIDER_SIZE === 'maxWidth' || this.st._ENFORCE_SLIDER_SIZE === 'maxHeight') &&
                     (this.st._VISIBLE_DIMENSION === 'auto' || this.st._VISIBLE_DIMENSION !== 'auto' && this.st._SLIDES_ORIENTATION === 'vertical')
                 ) {
                     this.__slider.css('margin', 0);
                     this.__slider.css({
                         'width': $(window).width(),
                         'max-width': '',
                         'marginLeft': -this.__slider.offset().left
                     });
                 } else {
                     this.__slider.css({
                         'width': '100%',
                         'max-width': this.st._SLIDER_WIDTH,
                         'marginLeft': ''
                     });
                 }
             } else {
                 this.__slider.css({
                     'width': this.st._SLIDER_WIDTH
                 });
             }

             // Calculate the aspect ratio of the slider
             if (this.st._ASPECT_RATIO === null) {
                 this.st._ASPECT_RATIO = this.st._SLIDER_WIDTH / this.st._SLIDER_HEIGHT;
             }

             // Initially set the slide width to the size of the slider.
             // Later, this will be set to less if there are multiple visible slides.
             this._SLIDE_W = this.__slider.width();

             // Set the height to the same size as the browser window if the slider is set to be 'maxHeight',
             // or calculate the height based on the width and the aspect ratio.
             if (this.st._ENFORCE_SLIDER_SIZE === 'maxHeight') {
                 this._SLIDE_H = $(window).height();
             } else {
                 this._SLIDE_H = isNaN(this.st._ASPECT_RATIO) ? this.st._SLIDER_HEIGHT : this._SLIDE_W / this.st._ASPECT_RATIO;
             }

             // Resize the slider only if the size of the slider has changed
             // If it hasn't, return.
             if (this._prev_SLIDE_W !== this._SLIDE_W ||
                 this._prev_SLIDE_H !== this._SLIDE_H ||
                 this.st._VISIBLE_DIMENSION !== 'auto' ||
                 this.__slider.outerWidth() > this.__slider.parent().width() ||
                 this.__slider.width() !== this.__slGhost.width()
             ) {
                 this._prev_SLIDE_W = this._SLIDE_W;
                 this._prev_SLIDE_H = this._SLIDE_H;
             } else {
                 return;
             }

             // The slide width or slide height is needed for several calculation, so create a reference to it
             // based on the current orientation.
             this._SLIDE_DIMENSION = this.st._SLIDES_ORIENTATION === 'horizontal' ? this._SLIDE_W : this._SLIDE_H;

             // Initially set the visible size of the slides and the offset of the selected slide as if there is only
             // on visible slide.
             // If there will be multiple visible slides (when '_VISIBLE_DIMENSION' is different than 'auto'), these will
             // be updated accordingly.
             this.visibleSlidesSize = this._SLIDE_DIMENSION;
             this._visible_EQ = 0;

             // _SLIDE_LOOP through the existing slides and reset their size.
             $.each(this._slides, function(index, element) {
                 element._setSize(_this._SLIDE_W, _this._SLIDE_H);
             });

             // Set the initial size of the mask container to the size of an individual slide
             this.__slGhost.css({
                 'width': this._SLIDE_W > $(window).width() ? $(window).width() : this._SLIDE_W,
                 'height': this._SLIDE_H
             });

             // Adjust the height if it's set to 'auto'
             if (this.st._SLIDER_ENABLE_AUTO_HEIGHT === true) {

                 // Delay the resizing of the height to allow for other resize handlers
                 // to execute first before calculating the final height of the slide
                 setTimeout(function() {
                     _this._resizeHeight();
                 }, 1);
             } else {
                 this.__slGhost.css(this._browserPFX + 'transition', '');
             }

             // The '_VISIBLE_DIMENSION' option can be set to fixed or percentage size to make more slides
             // visible at a time.
             // By default it's set to 'auto'.
             if (this.st._VISIBLE_DIMENSION !== 'auto') {
                 if (this.st._SLIDES_ORIENTATION === 'horizontal') {

                     // If the size is forced to full width or full window, the '_VISIBLE_DIMENSION' option will be
                     // ignored and the slider will become as wide as the browser window.
                     if (this.st._ENFORCE_SLIDER_SIZE === 'maxWidth' || this.st._ENFORCE_SLIDER_SIZE === 'maxHeight') {
                         this.__slider.css('margin', 0);
                         this.__slider.css({
                             'width': $(window).width(),
                             'max-width': '',
                             'marginLeft': -this.__slider.offset().left
                         });
                     } else {
                         this.__slider.css({
                             'width': this.st._VISIBLE_DIMENSION,
                             'max-width': '100%',
                             'marginLeft': 0
                         });
                     }

                     this.__slGhost.css('width', this.__slider.width());

                     this.visibleSlidesSize = this.__slGhost.width();
                     this._visible_EQ = Math.round((this.__slider.width() - this._SLIDE_W) / 2);
                 } else {

                     // If the size is forced to full window, the '_VISIBLE_DIMENSION' option will be
                     // ignored and the slider will become as high as the browser window.
                     if (this.st._ENFORCE_SLIDER_SIZE === 'maxHeight') {
                         this.__slider.css({
                             'height': $(window).height(),
                             'max-height': ''
                         });
                     } else {
                         this.__slider.css({
                             'height': this.st._VISIBLE_DIMENSION,
                             'max-height': '100%'
                         });
                     }

                     this.__slGhost.css('height', this.__slider.height());

                     this.visibleSlidesSize = this.__slGhost.height();
                     this._visible_EQ = Math.round((this.__slider.height() - this._SLIDE_H) / 2);
                 }
             }

             this._resetSlidesPosition();

             // Fire the '_RESIZE_SLIDER' event
             this.trigger({
                 type: '_RESIZE_SLIDER'
             });
             if ($.isFunction(this.st._RESIZE_SLIDER)) {
                 this.st._RESIZE_SLIDER.call(this, {
                     type: '_RESIZE_SLIDER'
                 });
             }


         },

         // Resize the height of the slider to the height of the selected slide.
         // It's used when the '_SLIDER_ENABLE_AUTO_HEIGHT' option is set to 'true'.
         _resizeHeight: function() {
             var _this = this,
                 selectedSlide = this._getSlideData(this._activeSL_IND),
                 size = selectedSlide.getSize();

             selectedSlide.off('imagesLoaded.' + NS);
             selectedSlide.on('imagesLoaded.' + NS, function(event) {
                 if (event.index === _this._activeSL_IND) {
                     var size = selectedSlide.getSize();
                     _this._resizeSliderHeight(size.height);
                 }
             });

             // If the selected slide contains images which are still loading,
             // wait for the loading to complete and then request the size again.
             if (size !== 'loading') {
                 this._resizeSliderHeight(size.height);
             }
         },

         // Open the slide at the specified index
         getSlide: function(index, speed, ar) {

             var _this = this;

             if (index === this._activeSL_IND || typeof this._slides[index] === 'undefined') {
                 return;
             }
             var speed = typeof speed != 'undefined' ? speed : _nb_global_swipeSpeed;

             this._prevSL_IND = this._activeSL_IND;
             this._activeSL_IND = index;

             // Re-assign the 'nb__active' class to the currently selected slide
             this.__a_slides.find('.nb__active').removeClass('nb__active');
             this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).addClass('nb__active');


             // If the slider is loopable reorder the slides to have the selected slide in the middle
             // and update the slides' position.
             if (this.st._SLIDE_LOOP === true) {
                 clearTimeout(_nb_slideLoop_timeout);
                 _nb_slideLoop_timeout = setTimeout(function() {
                     _this._updateSlidesOrder();
                     _this._updateSlidesPosition();
                 }, 10);
             }

             // Adjust the height of the slider
             if (this.st._SLIDER_ENABLE_AUTO_HEIGHT === true) {
                 this._resizeHeight();
             }

             // Calculate the new position _this the slides container need to take
             var newSlidesPosition = -parseInt(this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).css(this._posPropty), 10) + this._visible_EQ;


             // Move the slides container to the new position
             this._moveSlide(newSlidesPosition, false, function() {
                 if (_this.st._SLIDE_LOOP === true) {
                     _this._resetSlidesPosition();
                 }
                 _nb_startPull = false;
                 _nb_easingOnMultipleClick = true;
                 // Fire the '_CLBK_WHEN_SLIDE_COMPLETE' event
                 _this.trigger({
                     type: '_CLBK_WHEN_SLIDE_COMPLETE',
                     index: index,
                     previousIndex: _this._prevSL_IND
                 });
                 if ($.isFunction(_this.st._CLBK_WHEN_SLIDE_COMPLETE)) {
                     _this.st._CLBK_WHEN_SLIDE_COMPLETE.call(_this, {
                         type: '_CLBK_WHEN_SLIDE_COMPLETE',
                         index: index,
                         previousIndex: _this._prevSL_IND
                     });
                 }
             }, null, speed, null, (ar ? (ar == 'ease-out' ? 'ease-out' : true) : false));
             _nb_global_swipeSpeed = false;
             this.enableDisable_parallax(this._activeSL_IND);

             // Fire the 'getSlide' event
             this.trigger({
                 type: 'getSlide',
                 index: index,
                 previousIndex: this._prevSL_IND
             });

             if ($.isFunction(this.st._CLBK_GET_TO_SLIDE)) {
                 this.st._CLBK_GET_TO_SLIDE.call(this, {
                     type: 'getSlide',
                     index: index,
                     previousIndex: this._prevSL_IND
                 });
             }

         },
         enableDisable_parallax: function(index) {
             if (!this.st._PARALLAX_EFFECT) return false;
             var _this = this;
             var nextImage = _this.__a_slides.find('.nb-slide').eq(index).find('.nb-image');

             $('[data-parallaxnb]').removeAttr('data-parallaxnb').attr('data-parallax', 'true');
             if (_this.__a_slides.find('.nb-slide').eq(index).attr('rel') == 'parallax') {
                 _this.__a_slides.find('.nb-slide').eq(index).find('[data-parallax]').each(function() {
                     $(this).attr('data-parallaxnb', 'true');
                 });
                 _this._parallax_enable();

             } else _this._parallax_disable();

         },
         // Open the next slide
         _nextSlide: function() {clearTimeout(_nb_visImages_timeout);
             var index = (this._activeSL_IND >= this.getTotalSlides() - 1) ? 0 : (this._activeSL_IND + 1);
             this.getSlide(index, null, _nb_easingOnMultipleClick);
             _nb_easingOnMultipleClick = 'ease-out';
         },

         // Open the previous slide
         _previousSlide: function() {clearTimeout(_nb_visImages_timeout);
             var index = this._activeSL_IND <= 0 ? (this.getTotalSlides() - 1) : (this._activeSL_IND - 1);
             this.getSlide(index, null, _nb_easingOnMultipleClick);
             _nb_easingOnMultipleClick = 'ease-out';
         },

         _pullTo: function(p, i, c, iY, lY, lX, pD) {

             var ev = event || window.event;
             ev.preventDefault();

             var $this = this;
             _nb_startPull = true;
             var cssTrans = {},
                 opacCss = {};
             var overlay = $this.st._ALLOW_TO_PULL.overlayClass;
             var notif_pulling = "    color: #fff;  text-align: center;  font-size: 14px;  padding-left: 10px;  margin-top: 1px;  vertical-align: middle;";
             var pullingNotifMarkup = '<div id="notif_pulling" style=" z-index:-2;position: absolute;  top: -16px;  left: 50%; margin-left:-60px; display:none;"> <span class="ic_pull"></span> <span style="' + notif_pulling + '">Pull to close...</span></div>';
             var pullNotificationText = $($this.st._ALLOW_TO_PULL.popupContainer).find('#notif_pulling');

             if (pullNotificationText.length <= 0) {
                 $($this.st._ALLOW_TO_PULL.popupContainer).append(pullingNotifMarkup);
                 pullNotificationText = $($this.st._ALLOW_TO_PULL.popupContainer).find('#notif_pulling');
                 pullNotificationText.hide().fadeIn() //('slow','1');
             } else
                 $($this.st._ALLOW_TO_PULL.popupContainer).find('#notif_pulling').fadeIn()
             getMouseCoord(lX, lY, 'vertical');
             updateMouseCoord(lX, lY);

             i == 'end' ? (_nb__crP == '_|_' ? p = $(window).height() : p = -$(window).height()) : p = p;

             this._sup_ANIM === 'css3D' ?
                 cssTrans[this._browserPFX + 'transform'] = i == 'animate' ? 'translate3d(' + c + 'px, 0, 0)' : 'translate3d(' + c + 'px, ' + p + 'px, 0)' :
                 cssTrans[this._browserPFX + 'transform'] = i == 'animate' ? 'translate(' + c + 'px, 0)' : 'translate(' + c + 'px, ' + p + 'px)';

             if (i == 'animate') cssTrans[this._browserPFX + 'transition'] = '.4s ease';
             else if (i == 'end') cssTrans[this._browserPFX + 'transition'] = '.2s ease';
             else
                 cssTrans[this._browserPFX + 'transition'] = '';


             var getOpac = function() {
                 var _viewportSize = $($this.st._ALLOW_TO_PULL.overlayClass).height();
                 var yOffset = lY - iY; // difference between initial and current position
                 var result = Math.abs(yOffset / (_viewportSize / 1.2));
                 return i == 'animate' ? $this.st._ALLOW_TO_PULL.maxOpacity : $this.st._ALLOW_TO_PULL.maxOpacity - result;
             }
             this.overTrans = i == 'animate' ? 'opacity .7s ease' : '';
             opacCss['transition'] = this.overTrans;
             opacCss['-webkit-transition'] = this.overTrans;
             opacCss['-ms-transition'] = this.overTrans;
             opacCss['-moz-transition'] = this.overTrans;
             opacCss['-o-transition'] = this.overTrans;
             opacCss['opacity'] = getOpac;
             opacCss['-moz-opacity'] = getOpac;
             opacCss['-moz-opacity'] = '"alpha(opacity=' + (getOpac * 100) + ')"';

             $($this.st._ALLOW_TO_PULL.overlayClass).css(opacCss);
             $($this.st._ALLOW_TO_PULL.popupContainer).find('.nb-caption-container').css(opacCss);
             $($this.st._ALLOW_TO_PULL.popupContainer).find('.nb-full-screen-button').css(opacCss);
             $($this.st._ALLOW_TO_PULL.popupContainer).find('.js__p_close').css(opacCss);
             this.__a_slides.css(cssTrans);
             if (i == 'instant' && pD < this.st._ALLOW_TO_PULL.pullDistance) pullNotificationText.css({
                 'top': _nb__crP == '_|_' ? '+=1px' : '-=1px',
                 'z-index': _nb__crP == '_|_' ? '0' : '-2'
             });
             pD > this.st._ALLOW_TO_PULL.pullDistance ? pullNotificationText.find('span:first').addClass('__release').closest(pullNotificationText).find('span:last').text('Release to close..') : pullNotificationText.find('span:first').removeClass('__release').closest(pullNotificationText).find('span:last').text('Pull to close..');

             if (i == 'animate') pullNotificationText.fadeOut(400, function() {
                 $(this).css({
                     'top': '-16px',
                     'z-index': '-2'
                 })
             });
             if (i == 'end')
                 this.__a_slides.on("webkitTransitionEnd transitionend mozTransitionEnd oTransitionEnd", function(event) {
                     $($this.st._ALLOW_TO_PULL.closeButton).trigger('click');
                 });

             return;

         },

         // Move the slides container to the specified position.
         // The movement can be instant or animated.
         _moveSlide: function(position, instant, callback, v, y, x, ar) {
             var _this = this,
                 css = {};
             _nb_db_position = !v ? position : _nb_db_position;
             if (position === this._sl_POS) {
                 return;
             }

             this._sl_POS = position;

             if ((this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') && (!document.all && document.querySelector)) {
                 var left = this.st._SLIDES_ORIENTATION === 'horizontal' ? position : 0,
                     top = this.st._SLIDES_ORIENTATION === 'horizontal' ? 0 : position;

                 if (this._sup_ANIM === 'css3D')
                     css[this._browserPFX + 'transform'] = 'translate3d(' + left + 'px, ' + (!x ? top : 0) + 'px, 0) translateZ(0)';
                 else
                     css[this._browserPFX + 'transform'] = 'translate(' + left + 'px, ' + (!x ? top : 0) + 'px) translateZ(0)';



                 if (typeof instant !== 'undefined' && instant === true) {
                     css[this._browserPFX + 'transition-duration'] = '';
                     css[this._browserPFX + 'transition-timing-function'] = '';
                     css[this._browserPFX + 'backface-visibility'] = '';
                     css[this._browserPFX + 'perspective'] = '';
                     css[this._browserPFX + 'touch-action'] = '';
                 } else {
                     this.__a_slides.addClass('nb-animated');

                     var get_bezier = typeof localStorage.getItem('cbz') != 'undefined' ? JSON.parse(localStorage.getItem('cbz')) : '';
                     ///transition = this.st._SLIDE_ANIMATION_DURATION / 1000 + 's';///v ? v / 1000 + "s" : y ? parseInt(y, 10) + "ms" : (!get_bezier ? this.st._SLIDE_ANIMATION_DURATION / 1000 + 's' : get_bezier['bezier_tm']);

                     css[this._browserPFX + 'transition-duration'] = v ? v / 1000 + "s" : y ? parseInt(y, 10) + "ms" : (!get_bezier ? this.st._SLIDE_ANIMATION_DURATION / 1000 + 's' : get_bezier['bezier_tm']);
                     css[this._browserPFX + 'transition-timing-function'] = ar ? (ar == 'ease-out' ? ar : 'cubic-bezier(0.445, 0.05, 0.55, 0.95)') : (!get_bezier ? this.st._SLIDER_BEZIER_ENGINE : get_bezier['bezier_en']);
                     css[this._browserPFX + 'backface-visibility'] = 'hidden';
                     css[this._browserPFX + 'perspective'] = '1000';
                     css[this._browserPFX + 'touch-action'] = 'pan-y';

                     this.__a_slides.on(this._crossEVT, function(event) {
                         if (event.target !== event.currentTarget) {
                             return;
                         }

                         _this.__a_slides.off(_this._crossEVT);
                         _this.__a_slides.removeClass('nb-animated');

                         if (typeof callback === 'function') {
                             callback();
                         }
                     });
                 }

                 this.__a_slides.css(css);

             } else {
                 var dur = v ? v / 1000 + "s" : y ? parseInt(y, 10) + "ms" : (!get_bezier ? this.st._SLIDE_ANIMATION_DURATION / 1000 + 's' : get_bezier['bezier_tm']);
                 css['margin-' + this._posPropty] = position;

                 if (typeof instant !== 'undefined' && instant === true) {
                     this.__a_slides.css(css);
                 } else {
                     this.__a_slides.addClass('nb-animated');
                     this.__a_slides.animate(css, dur, function() {
                         _this.__a_slides.removeClass('nb-animated');

                         if (typeof callback === 'function') {
                             callback();
                         }
                     });
                 }
             }
         },

         // Stop the movement of the slides
         __stopSlideMovement: function() {
            
             var css = {};

             if (this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') {

                 // Get the current position of the slides by parsing the 'transform' property
                 var matrixString = this.__a_slides.css(this._browserPFX + 'transform'),
                     matrixType = matrixString.indexOf('matrix3d') !== -1 ? 'matrix3d' : 'matrix',
                     matrixArray = matrixString.replace(matrixType, '').match(/-?[0-9\.]+/g),
                     left = matrixType === 'matrix3d' ? parseInt(matrixArray[12], 10) : parseInt(matrixArray[4], 10),
                     top = matrixType === 'matrix3d' ? parseInt(matrixArray[13], 10) : parseInt(matrixArray[5], 10);

                 // Set the transform property to the value _this the transform had when the function was called
                 if (this._sup_ANIM === 'css3D') {
                     css[this._browserPFX + 'transform'] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
                 } else {
                     css[this._browserPFX + 'transform'] = 'translate(' + left + 'px, ' + top + 'px)';
                 }
		
                 css[this._browserPFX + 'transition'] = '';
                 css[this._browserPFX + 'transition-duration'] = '';
                 css[this._browserPFX + 'transition-timing-function'] = '';
                 css[this._browserPFX + 'backface-visibility'] = '';
                 css[this._browserPFX + 'perspective'] = '';
                 css[this._browserPFX + 'touch-action'] = '';

                 this.__a_slides.css(css);
                 $(document).off(this._crossEVT); //this.__a_slide.off(this._crossEVT);
                 this._sl_POS = this.st._SLIDES_ORIENTATION === 'horizontal' ? left : top;
             } else {
                 this.__a_slides.stop();
                 this._sl_POS = parseInt(this.__a_slides.css('margin-' + this._posPropty), 10);
             }

             this.__a_slides.removeClass('nb-animated');
         },

         // Resize the height of the slider to the specified value
         _resizeSliderHeight: function(height) {

             var _this = this,
                 css = {
                     'height': height
                 };

             if (this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') {
                 css[this._browserPFX + 'transition'] = 'height ' + this.st._SLIDER_HEIGHT_ANIMATION_DURATION / 1000 + 's ease-in-out';
                 clearTimeout(_nb_autoHeight_timeout);
                 this.__slGhost.off(this._crossEVT);
                 this.__slGhost.on(this._crossEVT, function(event) {
                     if (event.target !== event.currentTarget) {
                         return;
                     }

                     _this.__slGhost.off(_this._crossEVT);

                     // Fire the '_CLBK_RESIZE_HEIGHT_COMPLETE' event
                     _this.trigger({
                         type: '_CLBK_RESIZE_HEIGHT_COMPLETE'
                     });
                     if ($.isFunction(_this.st._CLBK_RESIZE_HEIGHT_COMPLETE)) {
                         _this.st._CLBK_RESIZE_HEIGHT_COMPLETE.call(_this, {
                             type: '_CLBK_RESIZE_HEIGHT_COMPLETE'
                         });
                     }
                 });
                 _nb_autoHeight_timeout = setTimeout(function() {
                     _this.__slGhost.css(css);
                 }, this.st._SLIDER_HEIGHT_ANIMATION_DELAY);
             } else {
                 this.__slGhost.stop().animate(css, this.st._SLIDER_HEIGHT_ANIMATION_DURATION, function(event) {
                     // Fire the '_CLBK_RESIZE_HEIGHT_COMPLETE' event
                     _this.trigger({
                         type: '_CLBK_RESIZE_HEIGHT_COMPLETE'
                     });
                     if ($.isFunction(_this.st._CLBK_RESIZE_HEIGHT_COMPLETE)) {
                         _this.st._CLBK_RESIZE_HEIGHT_COMPLETE.call(_this, {
                             type: '_CLBK_RESIZE_HEIGHT_COMPLETE'
                         });
                     }
                 });
             }

         },

         // Destroy the slider instance
         destroy: function() {
             // Remove the stored reference to this instance
             this.__slider.removeData('nobleSlider');

             // Clean the CSS
             this.__slider.removeAttr('style');
             this.__a_slides.removeAttr('style');

             // Remove event listeners
             this.off('update.' + NS);
             $(window).off('resize.' + this._original_ID + '.' + NS);

             // Destroy plugins
             var plugins = $.nobleSlider.plugins;

             if (typeof plugins !== 'undefined') {
                 for (var i = 0; i < plugins.length; i++) {
                     if (typeof this['destroy' + plugins[i]] !== 'undefined') {
                         this['destroy' + plugins[i]]();
                     }
                 }
             }

             // Destroy all slides
             $.each(this._slides, function(index, element) {
                 element.destroy();
             });

             this._slides.length = 0;

             // Move the slides to their initial position in the DOM and 
             // remove the container elements created dynamically.
             this.__a_slides.prependTo(this.__slider);
             this.__slPort.remove();
         },

         // Set properties on runtime
         _setProperties: function(properties, store) {
             // Parse the properties passed as an object
             for (var prop in properties) {
                 this.st[prop] = properties[prop];

                 // Alter the original settings as well unless 'false' is passed to the 'store' parameter
                 if (store !== false) {
                     this._OST[prop] = properties[prop];
                 }
             }

             this.update();
         },

         // Attach an event handler to the slider
         on: function(type, callback) {
             return this.__slider.on(type, callback);
         },

         // Detach an event handler
         off: function(type) {
             return this.__slider.off(type);
         },

         // Trigger an event on the slider
         trigger: function(data) {
             return this.__slider.triggerHandler(data);
         },

         // Return the slide at the specified index
         _getSlideData: function(index) {
             return this._slides[index];
         },

         // Return the index of the currently opened slide
         _getActiveSlide: function() {
             return this._activeSL_IND;
         },

         // Return the total amount of slides
         getTotalSlides: function() {
             return this._slides.length;
         },

         // The default options of the slider
         defaults: {
             // cubic bezier of the slide
             _SLIDER_BEZIER_ENGINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',

             // create slide only from thumbnails (like carousel)
             _SHOW_ONLY_THUMBS: false,

             // Width of the slide
             _SLIDER_WIDTH: 500,

             // Height of the slide
             _SLIDER_HEIGHT: 300,

             // Indicates if the slider is responsive
             _SLIDER_IS_RESPONSIVE: true,

             // The aspect ratio of the slider (width/height)
             _ASPECT_RATIO: null,

             // The scale mode for images (fit-for-smaller, fit-for-bigger, original and default)
             _IMAGE_SCALE_MODE: 'fit-for-bigger',

             // Indicates if the image will be centered
             _IMAGE_TO_CENTER: true,

	     // load automatically all images when slider is initialize
	     _LOAD_ALL_IMAGES: false,

	     // count of images to preload
	     _NUM_IMAGES_TO_PRELOAD: 1,

             // Indicates if height of the slider will be adjusted to the
             // height of the selected slide
             _SLIDER_ENABLE_AUTO_HEIGHT: false,

             // hide arrows if the device support touch
             _AUTO_HIDE_ARROWS_FOR_TOUCH_DEVICES: true,

             // Indicates the initially selected slide
             _INITIAL_ACTIVE_SLIDE: 0,

             // Indicates if the slides will be shuffled
             _RANDOMIZE_SLIDES: false,

             // Indicates whether the slides will be arranged horizontally
             // or vertically. Can be set to 'horizontal' or 'vertical'.
             _SLIDES_ORIENTATION: 'horizontal',

             // allow to pull [ down | up ]
             _ALLOW_TO_PULL: false,

             // Indicates if the size of the slider will be forced to 'maxWidth' or 'maxHeight'
             _ENFORCE_SLIDER_SIZE: 'none',

             // Indicates if the slider will be loopable
             _SLIDE_LOOP: false,

             // The distance between slides
             _SLIDES_SPACING: 10,

             // The duration of the slide animation
             _SLIDE_ANIMATION_DURATION: 600,

             // The duration of the height animation
             _SLIDER_HEIGHT_ANIMATION_DURATION: 600,

	     // disable auto height delay
	     _SLIDER_HEIGHT_ANIMATION_DELAY:200,

             // Sets the size of the visible area, allowing the increase of it in order
             // to make more slides visible.
             // By default, only the selected slide will be visible. 
             _VISIBLE_DIMENSION: 'auto',

             // Breakpoints for allowing the slider's options to be changed
             // based on the size of the window.
             _SLIDE_ADJUST_RESIZE: null,

             // Slider container padding from left
             _PADDING_LEFT: 0,

             // panorama mode
             _PANORAMA: false,

             // Called when the slider is initialized
             init: function() {},

             // Called when the slider is updates
             update: function() {},

             // Called when the slider is resized
             _RESIZE_SLIDER: function() {},

             // Called when a new slide is selected
             _CLBK_GET_TO_SLIDE: function() {},

             // Called when the image loaded complete
             _CLBK_IMAGE_LOADED: function() {},

             // Called when the navigation to the newly selected slide is complete
             _CLBK_WHEN_SLIDE_COMPLETE: function() {},

             // Called when the height animation of the slider is complete
             _CLBK_RESIZE_HEIGHT_COMPLETE: function() {},

             // Called when a breakpoint is reached
             _CLBK_ADJUST_RESIZE_REACH: function() {}
         }
     };

     var nobleSliderSlide = function(slide, index, settings) {

         // Reference to the slide jQuery element
         this.$slide = slide;

         // Reference to the main slide image
         this.$mainImage = null;

         // Reference to the container _this will hold the main image
         this.$imageContainer = null;

         // Indicates whether the slide has a main image
         this.hasMainImage = false;

         // Indicates whether the main image is loaded
         this.isMainImageLoaded = false;

         // Indicates whether the main image is in the process of being loaded
         this.isMainImageLoading = false;

         // Indicates whether the slide has any image. There could be other images (i.e., in layers)
         // besides the main slide image.
         this.hasImages = false;

         // Indicates if all the images in the slide are loaded
         this.areImagesLoaded = false;

         // The width and height of the slide
         this.width = 0;
         this.height = 0;

         // Reference to the global settings of the slider
         this.st = settings;

         // Set the index of the slide
         this.setIndex(index);

         // Initialize the slide
         this._init();
     };

     nobleSliderSlide.prototype = {

         // The starting point for the slide
         _init: function() {
             var _this = this;

             // Mark the slide as initialized
             this.$slide.attr('data-init', true);

             // Get the main slide image if there is one
             this.$mainImage = this.$slide.find('.nb-image').length !== 0 ? this.$slide.find('.nb-image') : null;



             // If there is a main slide image, create a container for it and add the image to this container.
             // The container will allow the isolation of the image from the rest of the slide's content. This is
             // helpful when you want to show some content below the image and not cover it.
             if (this.$mainImage !== null) {

                 this.hasMainImage = true;

                 this.$imageContainer = $('<div ' + (this.st._PANORAMA ? 'style="overflow:visible;"' : '') + ' class="nb-image-container"></div>').prependTo(this.$slide);


                 if (typeof this.$mainImage.attr('data-parallaxnb') != 'undefined' && this.$mainImage.hasClass('__parallax')) {


                     $('<div id="img_cont_for_' + this.$imageContainer.parent().index() + '" class="nb__parallax_background_image" data-parallax="true" data-depth="' + this.$mainImage.data('depth') + '"> </div>').appendTo(this.$imageContainer);
                     this.$mainImage.appendTo('#img_cont_for_' + this.$imageContainer.parent().index());
                     this.$mainImage.removeAttr('data-parallax').removeAttr('data-depth');


                 } else if (this.$mainImage.parent('a').length !== 0) {
                     this.$mainImage.parent('a').appendTo(this.$imageContainer);
                 } else {
                     this.$mainImage.appendTo(this.$imageContainer);
                 }

                 if (typeof this.$mainImage.attr('data-parallaxnb') != 'undefined' && !this.$mainImage.hasClass('__parallax')) {

                     this.$imageContainer.attr({
                         'data-parallax': this.$mainImage.data('parallax'),
                         'data-depth': this.$mainImage.data('depth')
                     });
                     this.$mainImage.removeAttr('data-parallax').removeAttr('data-depth');
                 }


             }

             this.hasImages = this.$slide.find('img').length !== 0 ? true : false;
         },

         // Set the size of the slide
         _setSize: function(width, height) {
             var _this = this;

             this.width = width;
             this.height = this.st._SLIDER_ENABLE_AUTO_HEIGHT === true ? 'auto' : height;

             this.$slide.css({
                 'width': this.width,
                 'height': this.height
             });

             if (this.hasMainImage === true) {

                 this.$imageContainer.css({
                     'width': this.width,
                     'height': this.height
                 });

                 // Resize the main image if it's loaded. If the 'data-src' attribute is present it means
                 // _this the image will be lazy-loaded
                 if (typeof this.$mainImage.attr('data-src') === 'undefined') {
                     this._resizeMainImage();
                 }
             }
         },

         // Get the size (width and height) of the slide
         getSize: function() {
             var _this = this,
                 size;

             // Check if all images have loaded, and if they have, return the size, else, return 'loading'
             if (this.hasImages === true && this.areImagesLoaded === false && typeof this.$slide.attr('data-loading') === 'undefined') {
                 this.$slide.attr('data-loading', true);

                 var status = nobleSliderUtils._cImgComplete(this.$slide, function() {
                     _this.areImagesLoaded = true;
                     _this.$slide.removeAttr('data-loading');
                     _this.trigger({
                         type: 'imagesLoaded.' + NS,
                         index: _this.index
                     });
                 });

                 if (status === 'complete') {
                     size = this._calcSizeDim();

                     return {
                         'width': size.width,
                         'height': size.height
                     };
                 } else {
                     return 'loading';
                 }
             } else {
                 size = this._calcSizeDim();

                 return {
                     'width': size.width,
                     'height': size.height
                 };
             }
         },

         // Calculate the width and height of the slide by going
         // through all the child elements and measuring their 'bottom'
         // and 'right' properties. The element with the biggest
         // 'right'/'bottom' property will determine the slide's
         // width/height.
         _calcSizeDim: function() {

			 
             var width = this.$slide.width(),
                 height = this.$slide.height();

             this.$slide.children().each(function(index, element) {
                 var child = $(element);

                 if (child.is(':hidden') === true) {
                     return;
                 }

                 var rect = element.getBoundingClientRect(),
                     bottom = child.position().top + (rect.bottom - rect.top),
                     right = child.position().left + (rect.right - rect.left);

                 if (bottom > height) {
                     height = bottom;
                 }

                 if (right > width) {
                     width = right;
                 }
             });

             return {
                 width: width,
                 height: height
             };
         },

         // Resize the main image.
         // 
         // Call this when the slide resizes or when the main image has changed to a different image.
         _resizeMainImage: function(isNewImage) {
             var _this = this;

             // If the main image has changed, reset the 'flags'
             if (isNewImage === true) {
                 this.isMainImageLoaded = false;
                 this.isMainImageLoading = false;
             }

             // If the image was not loaded yet and it's not in the process of being loaded, load it
             if (this.isMainImageLoaded === false && this.isMainImageLoading === false) {
                 this.isMainImageLoading = true;

                 nobleSliderUtils._cImgComplete(this.$mainImage, function() {
                     _this.isMainImageLoaded = true;
                     _this.isMainImageLoading = false;
                     _this._resizeMainImage();
                     _this.trigger({
                         type: 'imagesLoaded.' + NS,
                         index: _this.index
                     });
                 });

                 return;
             }

             if (this.st._PANORAMA) {
                 var slides = $('.nb-slides-container').find('.nb-slide');
                 var slides_count = slides.length;

                 this.$mainImage.css({
                     width: (slides.outerWidth() * slides_count >= this.$mainImage.prop('naturalWidth') ? this.$mainImage.prop('naturalWidth') : slides.outerWidth() * slides_count),
                     height: this.$mainImage.prop('naturalHeight')
                 });
                 this.$mainImage.css({
                     'marginLeft': -this.st._PANORAMA.marginX,
                     'marginTop': this.st._PANORAMA.marginY === 'auto' ? (this.$imageContainer.height() - this.$mainImage.height()) * 0.5 : -this.st._PANORAMA.marginY
                 });
                 return false;
             }
             if (this.$mainImage.attr('data-parallax')) {

                 var c = {
                     width: this.$mainImage.width(),
                     height: this.$mainImage.height(),
                     'marginLeft': (this.$imageContainer.width() - this.$mainImage.width()) * 0.5,
                     'marginTop': (this.$imageContainer.height() - this.$mainImage.height()) * 0.5
                 };
                 var d = {
                     height: 'auto'
                 };
                 this.$mainImage.css(c);
                 this.$mainImage.parent().css(d);

                 if (this.st._PARALLAX_EFFECT.imageToCenter) this.$mainImage.css({
                     'marginLeft': (this.$imageContainer.width() - this.$mainImage.width()) * this.st._PARALLAX_EFFECT.imageToCenter.marginX,
                     'marginTop': (this.$imageContainer.height() - this.$mainImage.height()) * this.st._PARALLAX_EFFECT.imageToCenter.marginY
                 });
                 return false;

             }


            // After the main image has loaded, resize it
             if (this.st._SLIDER_ENABLE_AUTO_HEIGHT === true) {
				 //this.$mainImage.attr('style','position:absolute;top:0;bottom:0;left:0;right:0;margin:auto!important;max-width:'+_this.st._SLIDER_WIDTH+'px!important;max-height:'+_this.st._SLIDER_HEIGHT+'px!important');
                 this.$mainImage.css({
                     width: '100%',
                     height:'auto',
                     'marginLeft': '',
                     'marginTop': ''
                 });
             } else {
                 if (this.st._IMAGE_SCALE_MODE === 'fit-for-smaller') {
                     if (this.$mainImage.width() / this.$mainImage.height() <= this.width / this.height) {
                         this.$mainImage.css({
                             width: '100%',
                             height: 'auto'
                         });
                     } else {
                         this.$mainImage.css({
                             width: 'auto',
                             height: '100%'
                         });
                     }
                 } else if (this.st._IMAGE_SCALE_MODE === 'fit-for-bigger') {
                     if (this.$mainImage.width() / this.$mainImage.height() >= this.width / this.height) {
                         this.$mainImage.css({
                             width: '100%',
                             height: 'auto'
                         });
                     } else {
                         this.$mainImage.css({
                             width: 'auto',
                             height: '100%'
                         });
                     }
                 } else if (this.st._IMAGE_SCALE_MODE === 'original') {
                     this.$mainImage.css({
                         maxWidth: '100%',
                         maxHeight: '100%'
                     });
                 }
                 if (this.st._IMAGE_TO_CENTER === true) {
                     this.$mainImage.css({
                         'marginLeft': (this.$imageContainer.width() - this.$mainImage.width()) * 0.5,
                         'marginTop': (this.$imageContainer.height() - this.$mainImage.height()) * 0.5
                     });
                 }
             }
         },

         // Destroy the slide
         destroy: function() {
             // Clean the slide element from attached styles and data
             this.$slide.removeAttr('style');
             this.$slide.removeAttr('data-init');
             this.$slide.removeAttr('data-index');
             this.$slide.removeAttr('data-loaded');

             // If there is a main image, remove its container
             if (this.hasMainImage === true) {
                 this.$slide.find('.nb-image')
                     .removeAttr('style')
                     .appendTo(this.$slide);

                 this.$slide.find('.nb-image-container').remove();
             }
         },

         // Return the index of the slide
         getIndex: function() {
             return this.index;
         },

         // Set the index of the slide
         setIndex: function(index) {
             this.index = index;
             this.$slide.attr('data-index', this.index);
         },

         // Attach an event handler to the slide
         on: function(type, callback) {
             return this.$slide.on(type, callback);
         },

         // Detach an event handler to the slide
         off: function(type) {
             return this.$slide.off(type);
         },

         // Trigger an event on the slide
         trigger: function(data) {
             return this.$slide.triggerHandler(data);
         }
     };

     window.nobleSlider = nobleSlider;
     window.nobleSliderSlide = nobleSliderSlide;

     $.fn.nobleSlider = function(options) {
         var args = Array.prototype.slice.call(arguments, 1);

         return this.each(function() {
             // Instantiate the slider or alter it
             if (typeof $(this).data('nobleSlider') === 'undefined') {
                 var newInstance = new nobleSlider(this, options);

                 // Store a reference to the instance created
                 $(this).data('nobleSlider', newInstance);
             } else if (typeof options !== 'undefined') {
                 var currentInstance = $(this).data('nobleSlider');

                 // Check the type of argument passed
                 if (typeof currentInstance[options] === 'function') {
                     currentInstance[options].apply(currentInstance, args);
                 } else if (typeof currentInstance.settings[options] !== 'undefined') {
                     var obj = {};
                     obj[options] = args[0];
                     currentInstance._setProperties(obj);
                 } else if (typeof options === 'object') {
                     currentInstance._setProperties(options);
                 } else {
                     $.error(options + ' does not exist in nobleSlider.');
                 }
             }
         });
     };

     // Contains useful utility functions
     var nobleSliderUtils = {

         // Indicates what type of animations are supported in the current browser
         // Can be CSS 3D, CSS 2D or JavaScript
         _sup_ANIM: null,

         // Indicates the required vendor prefix for the current browser
         _browserPFX: null,

         // Indicates the name of the transition's complete event for the current browser
         _crossEVT: null,

         // Indicates if the current browser is Internet Explorer (any version)
         isIE: null,

         // Check whether CSS3 3D or 2D transforms are supported. If they aren't, use JavaScript animations
         getBrowserFeatures: function() {
             if (this._sup_ANIM !== null) {
                 return this._sup_ANIM;
             }

             var element = document.body || document.documentElement,
                 elementStyle = element.style,
                 isCSSTransitions = typeof elementStyle.transition !== 'undefined' ||
                 typeof elementStyle.WebkitTransition !== 'undefined' ||
                 typeof elementStyle.MozTransition !== 'undefined' ||
                 typeof elementStyle.OTransition !== 'undefined';

             if (isCSSTransitions === true) {
                 var div = document.createElement('div');

                 // Check if 3D transforms are supported
                 if (typeof div.style.WebkitPerspective !== 'undefined' || typeof div.style.perspective !== 'undefined') {
                     this._sup_ANIM = 'css3D';
                 }

                 // Additional checks for Webkit
                 if (this._sup_ANIM === 'css3D' && typeof div.styleWebkitPerspective !== 'undefined') {
                     var style = document.createElement('style');
                     style.textContent = '@media (transform-3d),(-webkit-transform-3d){#test-for-3D{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}';
                     document.getElementsByTagName('head')[0].appendChild(style);

                     div.id = 'test-for-3D';
                     document.body.appendChild(div);

                     if (!(div.offsetLeft === 9 && div.offsetHeight === 5)) {
                         this._sup_ANIM = null;
                     }

                     style.parentNode.removeChild(style);
                     div.parentNode.removeChild(div);
                 }

                 // If CSS 3D transforms are not supported, check if 2D transforms are supported
                 if (this._sup_ANIM === null && (typeof div.style['-webkit-transform'] !== 'undefined' || typeof div.style.transform !== 'undefined')) {
                     this._sup_ANIM = 'css2D';
                 }
             } else {
                 this._sup_ANIM = 'js';
             }

             return this._sup_ANIM;
         },

         // Check what vendor prefix should be used in the current browser
         _getBrowserPrefix: function() {
             if (this._browserPFX !== null) {
                 return this._browserPFX;
             }

             var div = document.createElement('div'),
                 prefixes = ['Webkit', 'Moz', 'ms', 'O'];

             if ('transform' in div.style) {
                 this._browserPFX = '';
                 return this._browserPFX;
             }

             for (var i = 0; i < prefixes.length; i++) {
                 if ((prefixes[i] + 'Transform') in div.style) {
                     this._browserPFX = '-' + prefixes[i].toLowerCase() + '-';
                     break;
                 }
             }

             return this._browserPFX;
         },

         // Check the name of the transition's complete event in the current browser
         __getTransitionEVT: function() {
             if (this._crossEVT !== null) {
                 return this._crossEVT;
             }

             var div = document.createElement('div'),
                 transitions = {
                     'transition': 'transitionend',
                     'WebkitTransition': 'webkitTransitionEnd',
                     'MozTransition': 'transitionend',
                     'OTransition': 'oTransitionEnd'
                 };

             for (var transition in transitions) {
                 if (transition in div.style) {
                     this._crossEVT = transitions[transition];
                     break;
                 }
             }

             return this._crossEVT;
         },

         // If a single image is passed, check if it's loaded.
         // If a different element is passed, check if there are images
         // inside it, and check if these images are loaded.
         _cImgComplete: function(target, callback) {
             var _this = this,

                 // Check the initial status of the image(s)
                 status = this._checkImgStatus(target);

             // If there are loading images, wait for them to load.
             // If the images are loaded, call the callback function directly.
             if (status === 'loading') {
                 var checkImages = setInterval(function() {
                     status = _this._checkImgStatus(target);

                     if (status === 'complete') {
                         clearInterval(checkImages);

                         if (typeof callback === 'function') {
                             callback();
                         }
                     }
                 }, 100);
             } else if (typeof callback === 'function') {
                 callback();
             }

             return status;
         },

         _checkImgStatus: function(target) {
             var status = 'complete';

             if (target.is('img') && target[0].complete === false) {
                 status = 'loading';
             } else {
                 target.find('img').each(function(index) {
                     var image = $(this)[0];

                     if (image.complete === false) {
                         status = 'loading';
                     }
                 });
             }

             return status;
         },

         _chmsIE: function() {
             if (this.isIE !== null) {
                 return this.isIE;
             }

             var userAgent = window.navigator.userAgent,
                 msie = userAgent.indexOf('MSIE');

             if (userAgent.indexOf('MSIE') !== -1 || userAgent.match(/Trident.*rv\:11\./)) {
                 this.isIE = true;
             } else {
                 this.isIE = false;
             }

             return this.isIE;
         }
     };

     window.nobleSliderUtils = nobleSliderUtils;

 })(window, jQuery);

 // Thumbnails plugin
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Thumbnails.' + $.nobleSlider._DF_NM;

     var Thumbnails = {

         // Reference to the thumbnail scroller 
         $thumbnails: null,

         // Reference to the container of the thumbnail scroller
         $thumbnailsContainer: null,

         // List of Thumbnail objects
         thumbnails: null,

         // Index of the selected thumbnail
         selectedThumbnailIndex: 0,

         // Total size (width or height, depending on the orientation) of the thumbnails
         thumbnailsSize: 0,

         // Size of the thumbnail's container
         thumbnailsContainerSize: 0,

         // The position of the thumbnail scroller inside its container
         thumbnailsPosition: 0,

         // Orientation of the thumbnails
         thumbnailsOrientation: null,

         // Indicates the 'left' or 'top' position based on the orientation of the thumbnails
         thumbnailsPositionProperty: null,

         // Indicates if there are thumbnails in the slider
         isThumbnailScroller: false,

         initThumbnails: function() {
             var _this = this;

             this.thumbnails = [];

             _this.on('update.' + NS, $.proxy(_this._thumbsWUpdate, _this));
             _this.on('_RESIZE_SLIDER.' + NS, $.proxy(_this._thumbnailsOnResize, _this));
             _this.on('getSlide.' + NS, function(event) {
                 _this._gotoThumbnail(event.index)
             });
         },

         // Called when the slider is updated
         _thumbsWUpdate: function() {
             var _this = this;

             if (this.__slider.find('.nb-thumbnail').length === 0 && this.thumbnails.length === 0) {
                 this.isThumbnailScroller = false;
                 return;
             }

             this.isThumbnailScroller = true;

             // Create the container of the thumbnail scroller, if it wasn't created yet
             if (this.$thumbnailsContainer === null) {
                 this.$thumbnailsContainer = $('<div class="nb-thumbnails-container"></div>').insertAfter(this.__slPort);
             }

             // If the thumbnails' main container doesn't exist, create it, and get a reference to it
             if (this.$thumbnails === null) {
                 if (this.__slider.find('.nb-thumbnails').length !== 0) {
                     this.$thumbnails = this.__slider.find('.nb-thumbnails').appendTo(this.$thumbnailsContainer);

                     // Shuffle/randomize the thumbnails
                     if (this.st._RANDOMIZE_SLIDES === true) {
                         var thumbnails = this.$thumbnails.find('.nb-thumbnail'),
                             shuffledThumbnails = [];

                         // Reposition the thumbnails based on the order of the indexes in the
                         // '_randomizeArr' array
                         $.each(this._randomizeArr, function(index, element) {
                             var $thumbnail = $(thumbnails[element]);

                             if ($thumbnail.parent('a').length !== 0) {
                                 $thumbnail = $thumbnail.parent('a');
                             }

                             shuffledThumbnails.push($thumbnail);
                         });

                         // Append the sorted thumbnails to the thumbnail scroller
                         this.$thumbnails.empty().append(shuffledThumbnails);
                     }
                 } else {
                     this.$thumbnails = $('<div class="nb-thumbnails"></div>').appendTo(this.$thumbnailsContainer);
                 }
             }

             // Check if there are thumbnails inside the slides and move them in the thumbnails container
             this.__a_slides.find('.nb-thumbnail').each(function(index) {
                 var $thumbnail = $(this),
                     thumbnailIndex = $thumbnail.parents('.nb-slide').index(),
                     lastThumbnailIndex = _this.$thumbnails.find('.nb-thumbnail').length - 1;

                 if ($thumbnail.parent('a').length !== 0) {
                     $thumbnail = $thumbnail.parent('a');
                 }

                 // If the index of the slide _this contains the thumbnail is greater than the total number
                 // of thumbnails from the thumbnails container, position the thumbnail at the end.
                 // Otherwise, add the thumbnails at the corresponding position.
                 if (thumbnailIndex > lastThumbnailIndex) {
                     $thumbnail.appendTo(_this.$thumbnails);
                 } else {
                     $thumbnail.insertBefore(_this.$thumbnails.find('.nb-thumbnail').eq(thumbnailIndex));
                 }
             });

             // _SLIDE_LOOP through the Thumbnail objects and if a corresponding element is not found in the DOM,
             // it means _this the thumbnail might have been removed. In this case, destroy _this Thumbnail instance.
             for (var i = this.thumbnails.length - 1; i >= 0; i--) {
                 if (this.$thumbnails.find('.nb-thumbnail[data-index="' + i + '"]').length === 0) {
                     var thumbnail = this.thumbnails[i];

                     thumbnail.destroy();
                     this.thumbnails.splice(i, 1);
                 }
             }

             // _SLIDE_LOOP through the thumbnails and if there is any uninitialized thumbnail,
             // initialize it, else update the thumbnail's index.
             this.$thumbnails.find('.nb-thumbnail').each(function(index) {
                 var $thumbnail = $(this);

                 if (typeof $thumbnail.attr('data-init') === 'undefined') {
                     _this._createThumbnail($thumbnail, index);
                 } else {
                     _this.thumbnails[index].setIndex(index);
                 }
             });

             // Remove the previous class _this corresponds to the position of the thumbnail scroller
             this.$thumbnailsContainer.removeClass('nb-top-thumbnails nb-bottom-thumbnails nb-left-thumbnails nb-right-thumbnails');

             // Check the position of the thumbnail scroller and assign it the appropriate class and styling
             if (this.st._THUMBS_ALIGNMENT === 'top') {
                 this.$thumbnailsContainer.addClass('nb-top-thumbnails');
                 this.thumbnailsOrientation = 'horizontal';
             } else if (this.st._THUMBS_ALIGNMENT === 'bottom') {
                 this.$thumbnailsContainer.addClass('nb-bottom-thumbnails');
                 this.thumbnailsOrientation = 'horizontal';
             } else if (this.st._THUMBS_ALIGNMENT === 'left') {
                 this.$thumbnailsContainer.addClass('nb-left-thumbnails');
                 this.thumbnailsOrientation = 'vertical';
             } else if (this.st._THUMBS_ALIGNMENT === 'right') {
                 this.$thumbnailsContainer.addClass('nb-right-thumbnails');
                 this.thumbnailsOrientation = 'vertical';
             }

             // highlight
             this.st._HIGHLIGHT_ACTIVE_THUMB === true ? this.$thumbnailsContainer.addClass('nb-thumb-highlight') : this.$thumbnailsContainer.removeClass('nb-thumb-highlight');


             // Mark the thumbnail _this corresponds to the selected slide
             this.selectedThumbnailIndex = this._activeSL_IND;
             this.$thumbnails.find('.nb-thumbnail-container').eq(this.selectedThumbnailIndex).addClass('nb-selected-thumbnail');

             // Calculate the total size of the thumbnails
             this.thumbnailsSize = 2;

             $.each(this.thumbnails, function(index, thumbnail) {
                 thumbnail._setSize(_this.st._THUMB_SIZE_WIDTH, _this.st._THUMB_SIZE_HEIGHT);
                 _this.thumbnailsSize += _this.thumbnailsOrientation === 'horizontal' ? thumbnail.getSize().width : thumbnail.getSize().height;
             });

             // Set the size of the thumbnails
             if (this.thumbnailsOrientation === 'horizontal') {
                 this.$thumbnails.css({
                     'width': this.thumbnailsSize,
                     'height': this.st._THUMB_SIZE_HEIGHT
                 });
                 this.$thumbnailsContainer.css('height', '');
                 this.thumbnailsPositionProperty = 'left';
             } else {
                 this.$thumbnails.css({
                     'width': this.st._THUMB_SIZE_WIDTH,
                     'height': this.thumbnailsSize
                 });
                 this.$thumbnailsContainer.css('width', '');
                 this.thumbnailsPositionProperty = 'top';
             }

             // Fire the '_CLBK_THUMB_HOVER_IN' event
             this.$thumbnailsContainer.on('mouseover mouseenter', function(e) {
                 e.preventDefault();
                 e.stopImmediatePropagation();
                 _this.trigger({
                     type: '_CLBK_THUMB_HOVER_IN'
                 });
                 if ($.isFunction(_this.st._CLBK_THUMB_HOVER_IN)) {
                     _this.st._CLBK_THUMB_HOVER_IN.call(_this, {
                         type: '_CLBK_THUMB_HOVER_IN'
                     });
                 }
             });

             // Fire the '_CLBK_THUMB_HOVER_OUT' event
             this.$thumbnailsContainer.on('mouseout mouseleave', function(e) {
                 e.preventDefault();
                 e.stopImmediatePropagation();
                 _this.trigger({
                     type: '_CLBK_THUMB_HOVER_OUT'
                 });
                 if ($.isFunction(_this.st._CLBK_THUMB_HOVER_OUT)) {
                     _this.st._CLBK_THUMB_HOVER_OUT.call(_this, {
                         type: '_CLBK_THUMB_HOVER_OUT'
                     });
                 }
             });

             // Fire the '_CLBK_THUMB_UPDATE' event
             this.trigger({
                 type: '_CLBK_THUMB_UPDATE'
             });
             if ($.isFunction(this.st._CLBK_THUMB_UPDATE)) {
                 this.st._CLBK_THUMB_UPDATE.call(this, {
                     type: '_CLBK_THUMB_UPDATE'
                 });
             }
         },

         // Create an individual thumbnail
         _createThumbnail: function(element, index) {
             var _this = this,
                 thumbnail = new Thumbnail(element, this.$thumbnails, index);

             // When the thumbnail is clicked, navigate to the corresponding slide
             thumbnail.on('thumbnailClick.' + NS, function(event) {
                 _this.getSlide(event.index);
             });

             // Add the thumbnail at the specified index
             this.thumbnails.splice(index, 0, thumbnail);
         },

         // Called when the slider is resized.
         // Resets the size and position of the thumbnail scroller container.
         _thumbnailsOnResize: function() {
             if (this.isThumbnailScroller === false) {
                 return;
             }

             var _this = this,
                 newThumbnailsPosition;

             if (this.thumbnailsOrientation === 'horizontal') {
                 this.thumbnailsContainerSize = this.st._THUMBS_CONTAINER_SIZE > 0 ? this.st._THUMBS_CONTAINER_SIZE : Math.min(this.__slGhost.width(), this.thumbnailsSize);
                 this.$thumbnailsContainer.css('width', this.thumbnailsContainerSize);

                 // Reduce the slide mask's height, to make room for the thumbnails
                 if (this.st._ENFORCE_SLIDER_SIZE === 'maxHeight') {
                     this.__slGhost.css('height', this.__slGhost.height() - this.$thumbnailsContainer.outerHeight(true));

                     // Resize the slide
                     this._SLIDE_H = this.__slGhost.height();

                     $.each(this._slides, function(index, element) {
                         element._setSize(_this._SLIDE_W, _this._SLIDE_H);
                     });
                 }
             } else if (this.thumbnailsOrientation === 'vertical') {

                 // Check if the width of the slide mask plus the width of the thumbnail scroller is greater than
                 // the width of the slider's container and if _this's the case, reduce the slides container width
                 // in order to make the entire slider fit inside the slider's container.
                 if (this.__slGhost.width() + this.$thumbnailsContainer.outerWidth(true) > this.__slider.parent().width()) {
                     // Reduce the slider's width, to make room for the thumbnails
                     if (this.st._ENFORCE_SLIDER_SIZE === 'maxWidth' || this.st._ENFORCE_SLIDER_SIZE === 'maxHeight') {
                         this.__slider.css('max-width', $(window).width() - this.$thumbnailsContainer.outerWidth(true));
                     } else {
                         this.__slider.css('max-width', this.__slider.parent().width() - this.$thumbnailsContainer.outerWidth(true));
                     }

                     this.__slGhost.css('width', this.__slider.width());

                     // If the slides are horizontally oriented, update the visible size and the offset
                     // of the selected slide, since the slider's size was reduced to make room for the thumbnails.
                     // 
                     // If the slides are vertically oriented, update the width and height (to maintain the aspect ratio)
                     // of the slides.
                     if (this.st._SLIDES_ORIENTATION === 'horizontal') {
                         this._visible_EQ = Math.round((this.__slider.width() - this._SLIDE_DIMENSION) / 2);
                         this.visibleSlidesSize = this.__slGhost.width();
                     } else if (this.st._SLIDES_ORIENTATION === 'vertical') {
                         this._SLIDE_W = this.__slider.width();

                         $.each(this._slides, function(index, element) {
                             element._setSize(_this._SLIDE_W, _this._SLIDE_H);
                         });
                     }

                     // Re-arrange the slides
                     this._resetSlidesPosition();
                 }

                 this.thumbnailsContainerSize = Math.min(this.__slGhost.height(), this.thumbnailsSize);
                 this.$thumbnailsContainer.css('height', this.thumbnailsContainerSize);
             }

             // If the total size of the thumbnails is smaller than the thumbnail scroller' container (which has
             // the same size as the slides container), it means _this all the thumbnails will be visible, so set
             // the position of the thumbnail scroller to 0.
             // 
             // If _this's not the case, the thumbnail scroller will be positioned based on which thumbnail is selected.
             if (this.thumbnailsSize <= this.thumbnailsContainerSize || this.$thumbnails.find('.nb-selected-thumbnail').length === 0) {
                 newThumbnailsPosition = 0;
             } else {
                 newThumbnailsPosition = Math.max(-this.thumbnails[this.selectedThumbnailIndex].getPosition()[this.thumbnailsPositionProperty], this.thumbnailsContainerSize - this.thumbnailsSize);
             }

             // Add a padding to the slider, based on the thumbnail scroller's orientation, to make room
             // for the thumbnails.
             if (this.st._THUMBS_ALIGNMENT === 'top') {
                 this.__slider.css({
                     'paddingTop': this.$thumbnailsContainer.outerHeight(true),
                     'paddingLeft': '',
                     'paddingRight': ''
                 });
             } else if (this.st._THUMBS_ALIGNMENT === 'bottom') {
                 this.__slider.css({
                     'paddingTop': '',
                     'paddingLeft': '',
                     'paddingRight': ''
                 });
             } else if (this.st._THUMBS_ALIGNMENT === 'left') {
                 this.__slider.css({
                     'paddingTop': '',
                     'paddingLeft': parseInt(this.$thumbnailsContainer.outerWidth() + this.st._PADDING_LEFT),
                     'paddingRight': ''
                 });
             } else if (this.st._THUMBS_ALIGNMENT === 'right') {
                 this.__slider.css({
                     'paddingTop': '',
                     'paddingLeft': '',
                     'paddingRight': parseInt(this.$thumbnailsContainer.outerWidth() + this.st._PADDING_LEFT)
                 });
             }

             this._moveThumbs(newThumbnailsPosition, null, null, true);
         },

         // Selects the thumbnail at the indicated index and moves the thumbnail scroller
         // accordingly.
         _gotoThumbnail: function(index) {

             if (this.isThumbnailScroller === false || typeof this.thumbnails[index] === 'undefined') {
                 return;
             }

             var _this = this;
             var previousIndex = this.selectedThumbnailIndex,
                 newThumbnailsPosition = this.thumbnailsPosition;



             this.selectedThumbnailIndex = index;

             // Set the 'selected' class to the appropriate thumbnail
             _this.$thumbnails.find('.nb-selected-thumbnail')[0].classList.remove('nb-selected-thumbnail');
             _this.$thumbnails.find('.nb-thumbnail-container').eq(_this.selectedThumbnailIndex)[0].classList.add('nb-selected-thumbnail');


             // Calculate the new position _this the thumbnail scroller needs to go to.
             // 
             // If the selected thumbnail has a higher index than the previous one, make sure _this the thumbnail
             // _this comes after the selected thumbnail will be visible, if the selected thumbnail is not the
             // last thumbnail in the list.
             // 
             // If the selected thumbnail has a lower index than the previous one, make sure _this the thumbnail
             // _this's before the selected thumbnail will be visible, if the selected thumbnail is not the
             // first thumbnail in the list.
             if (this.selectedThumbnailIndex >= previousIndex) {

                 var nextThumbnailIndex = this.selectedThumbnailIndex === this.thumbnails.length - 1 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex + 1,
                     nextThumbnail = this.thumbnails[nextThumbnailIndex];

                 var nextThumbnailPosition = this.thumbnailsOrientation === 'horizontal' ? nextThumbnail.getPosition().right : nextThumbnail.getPosition().bottom,
                     thumbnailsRightPosition = -this.thumbnailsPosition + this.thumbnailsContainerSize;

                 if (nextThumbnailPosition > thumbnailsRightPosition) {
                     newThumbnailsPosition = this.thumbnailsPosition - (nextThumbnailPosition - thumbnailsRightPosition);
                 }
             } else if (this.selectedThumbnailIndex < previousIndex) {

                 var previousThumbnailIndex = this.selectedThumbnailIndex === 0 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex - 1,
                     previousThumbnail = this.thumbnails[previousThumbnailIndex],
                     previousThumbnailPosition = this.thumbnailsOrientation === 'horizontal' ? previousThumbnail.getPosition().left : previousThumbnail.getPosition().top;

                 if (previousThumbnailPosition < -this.thumbnailsPosition) {
                     newThumbnailsPosition = -previousThumbnailPosition;
                 }
             }


             // Move the thumbnail scroller to the calculated position
             _this._moveThumbs(newThumbnailsPosition, null, null, true, (_nb_global_swipeSpeed < 200 ? 200 : parseInt(_nb_global_swipeSpeed, 10)), 'quadratic');

             // Fire the '_CLBK_GO_TO_THUMB' event
             this.trigger({
                 type: '_CLBK_GO_TO_THUMB'
             });
             if ($.isFunction(this.st._CLBK_GO_TO_THUMB)) {
                 this.st._CLBK_GO_TO_THUMB.call(this, {
                     type: '_CLBK_GO_TO_THUMB'
                 });
             }
         },

         // Move the thumbnail scroller to the indicated position
         _moveThumbs: function(position, instant, callback, animation, speed, ease) {
             var _this = this,
                 css_timing_func,
                 useBezier = animation,
                 css = {};

             // Return if the position hasn't changed
             if (position === this.thumbnailsPosition) {
                 return;
             }

             if (ease) {

                 switch (ease) {

                     case 'linear':
                         css_timing_func = 'cubic-bezier(0, 0, 1, 1)';
                         break;

                     case 'easeInOut':
                         css_timing_func = 'ease-in-out';
                         break;

                     case 'ease-out':
                         css_timing_func = 'ease-out';
                         break;

                     case 'quadratic':
                         css_timing_func = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                         break;

                 }


             }

             this.thumbnailsPosition = position;

             // Use CSS transitions if they are supported. If not, use JavaScript animation
             if (this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') {
                 var transition,
                     left = this.thumbnailsOrientation === 'horizontal' ? position : 0,
                     top = this.thumbnailsOrientation === 'horizontal' ? 0 : position;

                 if (this._sup_ANIM === 'css3D') {
                     css[this._browserPFX + 'transform'] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
                 } else {
                     css[this._browserPFX + 'transform'] = 'translate(' + left + 'px, ' + top + 'px)';
                 }

                 if (typeof instant !== 'undefined' && instant === true) {

                     transition = '';
                     css[this._browserPFX + 'transition-property'] = '';
                     css[this._browserPFX + 'transition-duration'] = '';
                     css[this._browserPFX + 'transition-timing-function'] = '';
                     css[this._browserPFX + 'backface-visibility'] = '';
                     css[this._browserPFX + 'perspective'] = '';

                 } else {
                     this.$thumbnails.addClass('nb-animated');
                     if (!useBezier)
                         transition = this._browserPFX + 'transform ' + (typeof speed != 'undefined' ? speed + "ms" : this.st._SLIDE_ANIMATION_DURATION / 1000 + "s") + " cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                     else {
                         css[this._browserPFX + 'transition-property'] = this._browserPFX + 'transform';
                         css[this._browserPFX + 'transition-duration'] = this.st._SLIDE_ANIMATION_DURATION / 1000 + 's'; ///typeof speed != 'undefined' ? speed + "ms" : this.st._SLIDE_ANIMATION_DURATION / 1000 + 's';
                         css[this._browserPFX + 'transition-timing-function'] = css_timing_func ? css_timing_func : 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
                         css[this._browserPFX + 'backface-visibility'] = 'hidden';
                         css[this._browserPFX + 'perspective'] = '1000';


                     }



                     this.$thumbnails.on(this._crossEVT, function(event) {
                         if (event.target !== event.currentTarget) {
                             return;
                         }
                         _nb_easingOnMultipleClick = true;
                         _this.$thumbnails.off(_this._crossEVT);
                         _this.$thumbnails.removeClass('nb-animated');

                         if (typeof callback === 'function') {
                             callback();
                         }

                         // Fire the '_CLBK_THUMB_MOVE_COMPLETE' event
                         _this.trigger({
                             type: '_CLBK_THUMB_MOVE_COMPLETE'
                         });
                         if ($.isFunction(_this.st._CLBK_THUMB_MOVE_COMPLETE)) {
                             _this.st._CLBK_THUMB_MOVE_COMPLETE.call(_this, {
                                 type: '_CLBK_THUMB_MOVE_COMPLETE'
                             });
                         }
                     });
                 }
                 if (!useBezier)
                     css[this._browserPFX + 'transition'] = transition;

                 this.$thumbnails.css(css);
             } else {
                 css['margin-' + this.thumbnailsPositionProperty] = position;

                 if (typeof instant !== 'undefined' && instant === true) {
                     this.$thumbnails.css(css);
                 } else {
                     this.$thumbnails
                         .addClass('nb-animated')
                         .animate(css, 700, function() {
                             _this.$thumbnails.removeClass('nb-animated');

                             if (typeof callback === 'function') {
                                 callback();
                             }

                             // Fire the '_CLBK_THUMB_MOVE_COMPLETE' event
                             _this.trigger({
                                 type: '_CLBK_THUMB_MOVE_COMPLETE'
                             });
                             if ($.isFunction(_this.st._CLBK_THUMB_MOVE_COMPLETE)) {
                                 _this.st._CLBK_THUMB_MOVE_COMPLETE.call(_this, {
                                     type: '_CLBK_THUMB_MOVE_COMPLETE'
                                 });
                             }
                         });
                 }
             }
         },

         // Stop the movement of the thumbnail scroller
         _stopThumbsMovement: function() {
             var css = {};

             if (this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') {
                 var matrixString = this.$thumbnails.css(this._browserPFX + 'transform'),
                     matrixType = matrixString.indexOf('matrix3d') !== -1 ? 'matrix3d' : 'matrix',
                     matrixArray = matrixString.replace(matrixType, '').match(/-?[0-9\.]+/g),
                     left = matrixType === 'matrix3d' ? parseInt(matrixArray[12], 10) : parseInt(matrixArray[4], 10),
                     top = matrixType === 'matrix3d' ? parseInt(matrixArray[13], 10) : parseInt(matrixArray[5], 10);

                 if (this._sup_ANIM === 'css3D') {
                     css[this._browserPFX + 'transform'] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
                 } else {
                     css[this._browserPFX + 'transform'] = 'translate(' + left + 'px, ' + top + 'px)';
                 }

                 css[this._browserPFX + 'transition'] = '';
                 css[this._browserPFX + 'transition-property'] = '';
                 css[this._browserPFX + 'transition-duration'] = '';
                 css[this._browserPFX + 'transition-timing-function'] = '';
                 css[this._browserPFX + 'backface-visibility'] = '';
                 css[this._browserPFX + 'perspective'] = '';
                 this.$thumbnails.css(css);
                 this.$thumbnails.off(this._crossEVT);
                 this.thumbnailsPosition = this.thumbnailsOrientation === 'horizontal' ? left : top;
             } else {
                 this.$thumbnails.stop();
                 this.thumbnailsPosition = parseInt(this.$thumbnails.css('margin-' + this.thumbnailsPositionProperty), 10);
             }

             this.$thumbnails.removeClass('nb-animated');
         },

         // Destroy the plugin
         destroyThumbnails: function() {
             var _this = this;

             // Remove event listeners
             this.off('update.' + NS);

             if (this.isThumbnailScroller === false) {
                 return;
             }

             this.off('_RESIZE_SLIDER.' + NS);
             this.off('getSlide.' + NS);
             $(window).off('resize.' + this._original_ID + '.' + NS);

             // Destroy the individual thumbnails
             this.$thumbnails.find('.nb-thumbnail').each(function() {
                 var $thumbnail = $(this),
                     index = parseInt($thumbnail.attr('data-index'), 10),
                     thumbnail = _this.thumbnails[index];

                 thumbnail.off('thumbnailClick.' + NS);
                 thumbnail.destroy();
             });

             this.thumbnails.length = 0;

             // Add the thumbnail scroller directly in the slider and
             // remove the thumbnail scroller container
             this.$thumbnails.appendTo(this.__slider);
             this.$thumbnailsContainer.remove();

             // Remove any created padding
             this.__slider.css({
                 'paddingTop': '',
                 'paddingLeft': '',
                 'paddingRight': ''
             });
         },

         thumbnailsDefaults: {

             // Sets the width of the thumbnail
             _THUMB_SIZE_WIDTH: 110,

             // Sets the height of the thumbnail
             _THUMB_SIZE_HEIGHT: 90,

             // Sets the position of the thumbnail scroller (top, bottom, right, left)
             _THUMBS_ALIGNMENT: 'bottom',

             // Indicates if a pointer will be displayed for the selected thumbnail
             _HIGHLIGHT_ACTIVE_THUMB: false,

             // Sets size of thumbnails container
             _THUMBS_CONTAINER_SIZE: 0,

             // append thumbnails to slider container (not to thumbnails container)
             _THUMB_ARROWS_ASSIGN_TO: false,

             // Called when the mouse is over thumbnails
             _CLBK_THUMB_HOVER_IN: function() {},

             // Called when the mouse is out thumbnails
             _CLBK_THUMB_HOVER_OUT: function() {},

             // Called when the thumbnails are updated
             _CLBK_THUMB_UPDATE: function() {},

             // Called when a new thumbnail is selected
             _CLBK_GO_TO_THUMB: function() {},

             // Called when the thumbnail scroller has moved
             _CLBK_THUMB_MOVE_COMPLETE: function() {}
         }
     };

     var Thumbnail = function(thumbnail, thumbnails, index) {

         // Reference to the thumbnail jQuery element
         this.$thumbnail = thumbnail;

         // Reference to the thumbnail scroller
         this.$thumbnails = thumbnails;

         // Reference to the thumbnail's container, which will be 
         // created dynamically.
         this.$thumbnailContainer = null;

         // The width and height of the thumbnail
         this.width = 0;
         this.height = 0;

         // Indicates whether the thumbnail's image is loaded
         this.isImageLoaded = false;

         // Set the index of the slide
         this.setIndex(index);

         // Initialize the thumbnail
         this._init();
     };

     Thumbnail.prototype = {

         _init: function() {
             var _this = this;

             // Mark the thumbnail as initialized
             this.$thumbnail.attr('data-init', true);

             // Create a container for the thumbnail and add the original thumbnail to this container.
             // Having a container will help crop the thumbnail image if it's too large.
             this.$thumbnailContainer = $('<div class="nb-thumbnail-container"></div>').appendTo(this.$thumbnails);

             if (this.$thumbnail.parent('a').length !== 0) {
                 this.$thumbnail.parent('a').appendTo(this.$thumbnailContainer);
             } else {
                 this.$thumbnail.appendTo(this.$thumbnailContainer);
             }

             // When the thumbnail container is clicked, fire an event
             this.$thumbnailContainer.on('click.' + NS, function(e) {
                 _this.trigger({
                     type: 'thumbnailClick.' + NS,
                     index: _this.index
                 });
             });
         },

         // Set the width and height of the thumbnail
         _setSize: function(width, height) {
             this.width = width;
             this.height = height;

             // Apply the width and height to the thumbnail's container
             this.$thumbnailContainer.css({
                 'width': this.width,
                 'height': this.height
             });

             // If there is an image, resize it to fit the thumbnail container
             if (this.$thumbnail.is('img') && typeof this.$thumbnail.attr('data-src') === 'undefined') {
                 this.resizeImage();
             }
         },

         // Return the width and height of the thumbnail
         getSize: function() {
             return {
                 width: this.$thumbnailContainer.outerWidth(true),
                 height: this.$thumbnailContainer.outerHeight(true)
             };
         },

         // Return the top, bottom, left and right position of the thumbnail
         getPosition: function() {
             return {
                 left: this.$thumbnailContainer.position().left + parseInt(this.$thumbnailContainer.css('marginLeft'), 10),
                 right: this.$thumbnailContainer.position().left + parseInt(this.$thumbnailContainer.css('marginLeft'), 10) + this.$thumbnailContainer.outerWidth(),
                 top: this.$thumbnailContainer.position().top + parseInt(this.$thumbnailContainer.css('marginTop'), 10),
                 bottom: this.$thumbnailContainer.position().top + parseInt(this.$thumbnailContainer.css('marginTop'), 10) + this.$thumbnailContainer.outerHeight()
             };
         },

         // Set the index of the thumbnail
         setIndex: function(index) {
             this.index = index;
             this.$thumbnail.attr('data-index', this.index);
         },

         // Resize the thumbnail's image
         resizeImage: function() {
             var _this = this;

             // If the image is not loaded yet, load it
             if (this.isImageLoaded === false) {
                 nobleSliderUtils._cImgComplete(this.$thumbnailContainer, function() {
                     _this.isImageLoaded = true;
                     _this.resizeImage();
                 });

                 return;
             }

             // Get the reference to the thumbnail image again because it was replaced by
             // another img element during the loading process
             this.$thumbnail = this.$thumbnailContainer.find('.nb-thumbnail');

             // Calculate whether the image should stretch horizontally or vertically
             var imageWidth = this.$thumbnail.width(),
                 imageHeight = this.$thumbnail.height();

             if (imageWidth / imageHeight <= this.width / this.height) {
                 this.$thumbnail.css({
                     width: '100%',
                     height: 'auto'
                 });
             } else {
                 this.$thumbnail.css({
                     width: 'auto',
                     height: '100%'
                 });
             }

             this.$thumbnail.css({
                 'marginLeft': (this.$thumbnailContainer.width() - this.$thumbnail.width()) * 0.5,
                 'marginTop': (this.$thumbnailContainer.height() - this.$thumbnail.height()) * 0.5
             });
         },

         // Destroy the thumbnail
         destroy: function() {
             this.$thumbnailContainer.off('click.' + NS);

             // Remove added attributes
             this.$thumbnail.removeAttr('data-init');
             this.$thumbnail.removeAttr('data-index');

             // Remove the thumbnail's container and add the thumbnail
             // back to the thumbnail scroller container
             if (this.$thumbnail.parent('a').length !== 0) {
                 this.$thumbnail.parent('a').insertBefore(this.$thumbnailContainer);
             } else {
                 this.$thumbnail.insertBefore(this.$thumbnailContainer);
             }

             this.$thumbnailContainer.remove();
         },

         // Attach an event handler to the slide
         on: function(type, callback) {
             return this.$thumbnailContainer.on(type, callback);
         },

         // Detach an event handler to the slide
         off: function(type) {
             return this.$thumbnailContainer.off(type);
         },

         // Trigger an event on the slide
         trigger: function(data) {
             return this.$thumbnailContainer.triggerHandler(data);
         }
     };

     $.nobleSlider.injectPlugin('Thumbnails', Thumbnails);

 })(window, jQuery);

 // ConditionalImages plugin 
 ;
 (function(window, $) {

     "use strict";

     var NS = 'ConditionalImages.' + $.nobleSlider._DF_NM;

     var ConditionalImages = {

         // Reference to the previous size
         previousImageSize: null,

         // Reference to the current size
         currentImageSize: null,

         // Indicates if the current display supports high PPI
         isRetinaScreen: false,

         initConditionalImages: function() {
             this.currentImageSize = this.previousImageSize = 'default';
             this.isRetinaScreen = (typeof this._isRetina !== 'undefined') && (this._isRetina() === true);

             this.on('update.' + NS, $.proxy(this._conditionalImagesWUpdate, this));
             this.on('_RESIZE_SLIDER.' + NS, $.proxy(this._conditionalImagesWResize, this));
         },

         // _SLIDE_LOOP through all the existing images and specify the original path of the image
         // inside the 'data-default' attribute.
         _conditionalImagesWUpdate: function() {
             $.each(this._slides, function(index, element) {
                 var $slide = element.$slide;

                 $slide.find('img:not([ data-default ])').each(function() {
                     var $image = $(this);

                     if (typeof $image.attr('data-src') !== 'undefined') {
                         $image.attr({
                             'data-default': $image.attr('data-src'),
                             'data-blank': $image.attr('src')
                         });
                     } else {
                         $image.attr({
                             'data-default': $image.attr('src'),
                             'data-blank': $image.attr('src')
                         });
                     }
                 });
             });
         },

         // When the window resizes, identify the applyable image size based on the current size of the slider
         // and apply it to all images _this have a version of the image specified for this size.
         _conditionalImagesWResize: function() {
             var loader_markup = '<div class="nb_full_screen_load_img"></div>';

             if (this._SLIDE_W <= this.st._IMG_SMALL_SIZE && (!this.st._LARGE_IMAGES_ON_FULL_SCREEN || !_nb_enabledFullScreenMode)) {
                 this.currentImageSize = 'small';
             } else if (this._SLIDE_W <= this.st._IMG_MEDIUM_SIZE && (!this.st._LARGE_IMAGES_ON_FULL_SCREEN || !_nb_enabledFullScreenMode)) {
                 this.currentImageSize = 'medium';
             } else if (this._SLIDE_W <= this.st._IMG_LARGE_SIZE || (this.st._LARGE_IMAGES_ON_FULL_SCREEN && _nb_enabledFullScreenMode)) {
                 this.currentImageSize = 'large';
             } else {
                 this.currentImageSize = 'default';
             }

             if (this.previousImageSize !== this.currentImageSize) {
                 var _this = this;

                 $.each(this._slides, function(index, element) {
                     var $slide = element.$slide;

                     $slide.find('img').each(function() {
                         var $image = $(this),
                             imageSource = '';


                         // Check if the current display supports high PPI and if a retina version of the current size was specified
                         if (_this.isRetinaScreen === true && typeof $image.attr('data-retina' + _this.currentImageSize) !== 'undefined') {
                             imageSource = $image.attr('data-retina' + _this.currentImageSize);

                             // If the retina image was not loaded yet, replace the default image source with the one
                             // _this corresponds to the current slider size
                             if (typeof $image.attr('data-retina') !== 'undefined' && $image.attr('data-retina') !== imageSource) {
                                 $image.attr('data-retina', imageSource);
                             }
                         } else if ((_this.isRetinaScreen === false || _this.isRetinaScreen === true && typeof $image.attr('data-retina') === 'undefined') && typeof $image.attr('data-' + _this.currentImageSize) !== 'undefined') {
                             imageSource = $image.attr('data-' + _this.currentImageSize);

                             // If the image is set to lazy load, replace the image source with the one
                             // _this corresponds to the current slider size
                             if (typeof $image.attr('data-src') !== 'undefined' && $image.attr('data-src') !== imageSource) {
                                 $image.attr('data-src', imageSource);
                             }
                         }

                         if (imageSource !== '') {

                             // The existence of the 'data-src' attribute indicates _this the image
                             // will be lazy loaded, so don't load the new image yet
                             if (typeof $image.attr('data-src') === 'undefined' && $image.attr('src') !== imageSource) {
                                 $image.before(loader_markup);
                                 _this._l_ConditionalImage($image, imageSource, function(newImage) {
                                     if (newImage.hasClass('nb-image')) {
                                         element.$mainImage = newImage;
                                         element._resizeMainImage(true);
                                         element.$mainImage.fadeTo("fast", 0).load(function() {
                                             $slide.find('.nb_full_screen_load_img').remove();
                                             $(this).fadeTo("slow", 1)
                                         })
                                     }
                                 });
                             }
                         }
                     });
                 });

                 this.previousImageSize = this.currentImageSize;
             }


         },

         // Replace the target image with a new image
         _l_ConditionalImage: function(image, source, callback) {

             // Create a new image element
             var newImage = $(new Image());

             // Copy the class(es) and inline style
             newImage.attr('class', image.attr('class'));
             newImage.attr('style', image.attr('style'));

             // Copy the data attributes
             $.each(image.data(), function(name, value) {
                 newImage.attr('data-' + name, value);
             });

             // Copy the width and height attributes if they exist
             if (typeof image.attr('width') !== 'undefined') {
                 newImage.attr('width', image.attr('width'));
             }

             if (typeof image.attr('height') !== 'undefined') {
                 newImage.attr('height', image.attr('height'));
             }

             if (typeof image.attr('alt') !== 'undefined') {
                 newImage.attr('alt', image.attr('alt'));
             }

             if (typeof image.attr('title') !== 'undefined') {
                 newImage.attr('title', image.attr('title'));
             }

             newImage.attr('src', source);

             // Add the new image in the same container and remove the older image
             newImage.insertAfter(image);
             image.remove();
             image = null;

             if (typeof callback === 'function') {
                 callback(newImage);
             }
         },

         // Destroy plugin
         _destroy_ConditionalImages: function() {
             this.off('update.' + NS);
             this.off('_RESIZE_SLIDER.' + NS);
         },

         conditionalImagesDefaults: {

             // If the slider size is below this size, the small version of the images will be used
             _IMG_SMALL_SIZE: 480,

             // If the slider size is below this size, the small version of the images will be used
             _IMG_MEDIUM_SIZE: 768,

             // If the slider size is below this size, the small version of the images will be used
             _IMG_LARGE_SIZE: 1024,

             // when full screen is enabled set image to large size
             _LARGE_IMAGES_ON_FULL_SCREEN: false

         }
     };

     $.nobleSlider.injectPlugin('ConditionalImages', ConditionalImages);

 })(window, jQuery);

 // Retina plugin.
 // 
 // Adds the possibility to load a different image when the slider is
 // viewed on a retina screen.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Retina.' + $.nobleSlider._DF_NM;

     var Retina = {

         initRetina: function() {
             var _this = this;

             // Return if it's not a retina screen
             if (this._isRetina() === false) {
                 return;
             }

             this.on('update.' + NS, $.proxy(this._checkRetinaImages, this));

             if (this.__slider.find('.nb-thumbnail').length !== 0) {
                 this.on('update.Thumbnails.' + NS, $.proxy(this._checkRetinaThumImages, this));
             }
         },

         // Checks if the current display supports high PPI
         _isRetina: function() {
             if (window.devicePixelRatio >= 2) {
                 return true;
             }

             if (window.matchMedia && (window.matchMedia("(-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx)").matches)) {
                 return true;
             }

             return false;
         },

         // _SLIDE_LOOP through the slides and replace the images with their retina version
         _checkRetinaImages: function() {
             var _this = this;

             $.each(this._slides, function(index, element) {
                 var $slide = element.$slide;

                 if (typeof $slide.attr('data-retina-loaded') === 'undefined') {
                     $slide.attr('data-retina-loaded', true);

                     $slide.find('img[data-retina]').each(function() {
                         var $image = $(this);

                         if (typeof $image.attr('data-src') !== 'undefined') {
                             $image.attr('data-src', $image.attr('data-retina'));
                         } else {
                             _this._loadRetinaImage($image, function(newImage) {
                                 if (newImage.hasClass('nb-image')) {
                                     element.$mainImage = newImage;
                                     element._resizeMainImage(true);
                                 }
                             });
                         }
                     });
                 }
             });
         },

         // _SLIDE_LOOP through the thumbnails and replace the images with their retina version
         _checkRetinaThumImages: function() {
             var _this = this;

             $.each(this.thumbnails, function(index, element) {
                 var $thumbnail = element.$thumbnailContainer;

                 if (typeof $thumbnail.attr('data-retina-loaded') === 'undefined') {
                     $thumbnail.attr('data-retina-loaded', true);

                     $thumbnail.find('img[data-retina]').each(function() {
                         var $image = $(this);

                         if (typeof $image.attr('data-src') !== 'undefined') {
                             $image.attr('data-src', $image.attr('data-retina'));
                         } else {
                             _this._loadRetinaImage($image, function(newImage) {
                                 if (newImage.hasClass('nb-thumbnail')) {
                                     element.resizeImage();
                                 }
                             });
                         }
                     });
                 }
             });
         },

         // Load the retina image
         _loadRetinaImage: function(image, callback) {
             var retinaFound = false,
                 newImagePath = '';

             // Check if there is a retina image specified
             if (typeof image.attr('data-retina') !== 'undefined') {
                 retinaFound = true;

                 newImagePath = image.attr('data-retina');
             }

             // Check if there is a lazy loaded, non-retina, image specified
             if (typeof image.attr('data-src') !== 'undefined') {
                 if (retinaFound === false) {
                     newImagePath = image.attr('data-src');
                 }

                 image.removeAttr('data-src');
             }

             // Return if there isn't a retina or lazy loaded image
             if (newImagePath === '') {
                 return;
             }

             // Create a new image element
             var newImage = $(new Image());

             // Copy the class(es) and inline style
             newImage.attr('class', image.attr('class'));
             newImage.attr('style', image.attr('style'));

             // Copy the data attributes
             $.each(image.data(), function(name, value) {
                 newImage.attr('data-' + name, value);
             });

             // Copy the width and height attributes if they exist
             if (typeof image.attr('width') !== 'undefined') {
                 newImage.attr('width', image.attr('width'));
             }

             if (typeof image.attr('height') !== 'undefined') {
                 newImage.attr('height', image.attr('height'));
             }

             if (typeof image.attr('alt') !== 'undefined') {
                 newImage.attr('alt', image.attr('alt'));
             }

             if (typeof image.attr('title') !== 'undefined') {
                 newImage.attr('title', image.attr('title'));
             }

             // Add the new image in the same container and remove the older image
             newImage.insertAfter(image);
             image.remove();
             image = null;

             // Assign the source of the image
             newImage.attr('src', newImagePath);

             if (typeof callback === 'function') {
                 callback(newImage);
             }
         },

         // Destroy the plugin
         _destroy_Retina: function() {
             this.off('update.' + NS);
             this.off('update.Thumbnails.' + NS);
         }
     };

     $.nobleSlider.injectPlugin('Retina', Retina);

 })(window, jQuery);

 // Lazy Loading plugin
 // 
 // Adds the possibility to delay the loading of the images until the slides/thumbnails
 // _this contain them become visible. This technique improves the initial loading
 // performance.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'LazyLoading.' + $.nobleSlider._DF_NM;

     var LazyLoading = {

         allowLazyLoadingCheck: true,

         initLazyLoading: function() {
             var _this = this;

             // The 'resize' event is fired after every update, so it's possible to use it for checking
             // if the update made new slides become visible
             // 
             // Also, resizing the slider might make new slides or thumbnails visible
             this.on('_RESIZE_SLIDER.' + NS, $.proxy(this._lazyLoadingWResize, this));

             // Check visible images when a new slide is selected
             this.on('getSlide.' + NS, $.proxy(this._checkLoadVisibleImages, this));

             // Check visible thumbnail images when the thumbnails are updated because new thumbnail
             // might have been added or the settings might have been changed so _this more thumbnail
             // images become visible
             // 
             // Also, check visible thumbnail images after the thumbnails have moved because new thumbnails might
             // have become visible
             this.on('_CLBK_THUMB_UPDATE.' + NS + ' ' + '_CLBK_THUMB_MOVE_COMPLETE.' + NS, $.proxy(this._checkLoadVisibleThumbImages, this));


         },

         _lazyLoadingWResize: function() {
             var _this = this;

             if (this.allowLazyLoadingCheck === false) {
                 return;
             }

             this.allowLazyLoadingCheck = false;

             this._checkLoadVisibleImages();

             if (this.__slider.find('.nb-thumbnail').length !== 0) {
                 this._checkLoadVisibleThumbImages();
             }

             // Use a timer to deffer the loading of images in order to prevent too many
             // checking attempts
             setTimeout(function() {
                 _this.allowLazyLoadingCheck = true;
             }, 500);
         },

         // Check visible slides and load their images
         _checkLoadVisibleImages: function() {
             if (this.__slider.find('.nb-slide:not([ data-loaded ])').length === 0) {
                 return;
             }

             var _this = this,

                 // Use either the middle position or the index of the selected slide as a reference, depending on
                 // whether the slider is loopable
                 referencePosition = this.st._SLIDE_LOOP === true ? this._mdSL_POS : this._activeSL_IND,

                 // Calculate how many slides are visible at the sides of the selected slide
                 visibleOnSides = Math.ceil((this.visibleSlidesSize - this._SLIDE_DIMENSION) / 2 / this._SLIDE_DIMENSION),

                 // Calculate the indexes of the first and last slide _this will be checked
                 from = referencePosition - visibleOnSides - 1 > 0 ? referencePosition - visibleOnSides - 1 : 0,
                 to = referencePosition + visibleOnSides + 1 < this.getTotalSlides() - 1 ? referencePosition + visibleOnSides + 1 : this.getTotalSlides() - 1,

                 // Get all the slides need to be checked
                 slidesToCheck = _this.st._LOAD_ALL_IMAGES ? this._slidesTRIM : this._slidesTRIM.slice(from, to + _this.st._NUM_IMAGES_TO_PRELOAD);
                 clearTimeout(_nb_visImages_timeout);


             // _SLIDE_LOOP through the selected slides and if the slide is not marked as having
             // been loaded yet, _SLIDE_LOOP through its images and load them.
             _nb_visImages_timeout = setTimeout(function() {


		
                 $.each(slidesToCheck, function(index, element) {

                     var slide = _this._slides[element],
                         $slide = slide.$slide;


                     if (typeof $slide.attr('data-loaded') === 'undefined') {
                         $slide.attr('data-loaded', true);

                         $slide.find('img[ data-src ]').each(function() {
                             var image = $(this);

                             _this._loadImage(image, function(newImage) {
		  //  if($(newImage).closest('.nb-slide').hasClass('nb__active')){
                     // Fire the '_CLBK_IMAGE_LOADED' event
                     _this.trigger({
                         type: '_CLBK_IMAGE_LOADED',
                         index: $slide.index()
                     });
                     if ($.isFunction(_this.st._CLBK_IMAGE_LOADED)) {
                         _this.st._CLBK_IMAGE_LOADED.call(_this, {
                             type: '_CLBK_IMAGE_LOADED',
                             index: $slide.index()
                         });
                     }
		//	}


                     // Fire the '_CLBK_WHEN_SLIDE_COMPLETE' event
                     _this.trigger({
                         type: '_CLBK_WHEN_SLIDE_COMPLETE',
                         index: index
                     });
                     if ($.isFunction(_this.st._CLBK_WHEN_SLIDE_COMPLETE)) {
                         _this.st._CLBK_WHEN_SLIDE_COMPLETE.call(_this, {
                             type: '_CLBK_WHEN_SLIDE_COMPLETE',
                             index: index
                         });
                     }

                                 if (newImage.hasClass('nb-image')) {
                                     slide.$mainImage = newImage;	
                                     slide._resizeMainImage(true);
                                 }
                             });
                         });
                     }
                 });
             }, parseInt(_this.st._SLIDE_ANIMATION_DURATION+500));
         },

         // Check visible thumbnails and load their images
         _checkLoadVisibleThumbImages: function() {
             if (this.__slider.find('.nb-thumbnail-container:not([ data-loaded ])').length === 0) {
                 return;
             }

             var _this = this,
                 thumbnailSize = this.thumbnailsSize / this.thumbnails.length,

                 // Calculate the indexes of the first and last thumbnail _this will be checked
                 from = Math.floor(Math.abs(this.thumbnailsPosition / thumbnailSize)),
                 to = Math.floor((-this.thumbnailsPosition + this.thumbnailsContainerSize) / thumbnailSize),

                 // Get all the thumbnails _this need to be checked
                 thumbnailsToCheck = this.thumbnails.slice(from, to + 1);

             // _SLIDE_LOOP through the selected thumbnails and if the thumbnail is not marked as having
             // been loaded yet, load its image.
             $.each(thumbnailsToCheck, function(index, element) {
                 var $thumbnailContainer = element.$thumbnailContainer;

                 if (typeof $thumbnailContainer.attr('data-loaded') === 'undefined') {
                     $thumbnailContainer.attr('data-loaded', true)

                     $thumbnailContainer.find('img[ data-src ]').each(function() {
                         var image = $(this);

                         _this._loadImage(image, function() {
                             element.resizeImage();
                         });
                     });
                 }
             });
         },

         // Load an image
         _loadImage: function(image, callback) {
             // Create a new image element
             var newImage = $(new Image());
		

             // Copy the class(es) and inline style
             newImage.attr('class', image.attr('class'));
             newImage.attr('style', image.attr('style'));


             // Copy the data attributes
             $.each(image.data(), function(name, value) {
                 newImage.attr('data-' + name, value);
             });

             // Copy the width and height attributes if they exist
             if (typeof image.attr('width') !== 'undefined') {
                 newImage.attr('width', image.attr('width'));
             }

             if (typeof image.attr('height') !== 'undefined') {
                 newImage.attr('height', image.attr('height'));
             }

             if (typeof image.attr('alt') !== 'undefined') {
                 newImage.attr('alt', image.attr('alt'));
             }

             if (typeof image.attr('title') !== 'undefined') {
                 newImage.attr('title', image.attr('title'));
             }


             // Assign the source of the image
             newImage.attr('src', image.attr('data-src'));
             newImage.removeAttr('data-src');

             newImage.load(function() {
                 // Add the new image in the same container and remove the older image
                 newImage.insertAfter(image);
                 if(image) image.remove();
                 image = null;

                 if (typeof callback === 'function') {
                     callback(newImage);
                 }
             });
         },

         // Destroy the plugin
         _destroy_LazyLoading: function() {
             this.off('update.' + NS);
             this.off('getSlide.' + NS);
             this.off('_RESIZE_SLIDER.' + NS);
             this.off('_CLBK_THUMB_UPDATE.' + NS);
             this.off('_CLBK_THUMB_MOVE_COMPLETE.' + NS);
         }
     };

     $.nobleSlider.injectPlugin('LazyLoading', LazyLoading);

 })(window, jQuery);

 // Layers plugin
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Layers.' + $.nobleSlider._DF_NM;

     var Layers = {

         // Reference to the original 'getSlide' method
         layersgetSlideReference: null,

         // Reference to the timer _this will delay the overriding
         // of the 'getSlide' method
         wtFotLayTimer: null,

         initLayers: function() {
             this.on('update.' + NS, $.proxy(this._layersOnUpdate, this));
             this.on('_RESIZE_SLIDER.' + NS, $.proxy(this._layersOnResize, this));
             this.on('getSlide.' + NS, $.proxy(this._layersOngetSlide, this));
         },

         // _SLIDE_LOOP through the slides and initialize all layers
         _layersOnUpdate: function(event) {
             var _this = this;

             $.each(this._slides, function(index, element) {
                 var $slide = element.$slide;

                 // Initialize the layers
                 this.$slide.find('.nb-layer:not([ data-init-layer ])').each(function() {
                     var layer = new Layer($(this));
                     $(this).find('[element-fullscreen]').css({
                         'width': $(window).width()
                     });
                     // Add the 'layers' array to the slide objects (instance of nobleSliderSlide)
                     if (typeof element.layers === 'undefined') {
                         element.layers = [];
                     }

                     element.layers.push(layer);

                     if ($(this).not('[static-layer]')) {
                         // Add the 'animatedLayers' array to the slide objects (instance of nobleSliderSlide)
                         if (typeof element.animatedLayers === 'undefined') {
                             element.animatedLayers = [];
                         }

                         element.animatedLayers.push(layer);
                     }
                 });
             });

             // If the '_WAIT_TO_END_LAYERS' option is enabled, the slider will not move to another slide
             // until all the layers from the previous slide will be hidden. To achieve this,
             // replace the current 'getSlide' function with another function _this will include the 
             // required functionality.
             // 
             // Since the 'getSlide' method might be overridden by other plugins as well, delay this
             // override to make sure it's the last override.
             if (this.st._WAIT_TO_END_LAYERS === true) {
                 clearTimeout(this.wtFotLayTimer);

                 this.wtFotLayTimer = setTimeout(function() {
                     _this.layersgetSlideReference = _this.getSlide;
                     _this.getSlide = _this._layersgetSlide;
                 }, 1);
             }
         },

         // When the slider resizes, try to scale down the layers proportionally. The automatic scaling
         // will make use of an option, '_AUTO_SCALE_REFER', by comparing the current width of the slider
         // with the reference width. So, if the reference width is 1000 pixels and the current width is
         // 500 pixels, it means _this the layers will be scaled down to 50% of their size.
         _layersOnResize: function() {
             var _this = this,
                 _AUTO_SCALE_REFER,
                 useAutoScale = this.st._AUTO_SCALE_LAYERS_BLOCK,
                 scaleRatio;

             if (this.st._AUTO_SCALE_LAYERS_BLOCK === false) {
                 // Show the layers for the initial slide
                 this.showLayers(this._activeSL_IND);

                 return;
             }

             // If there isn't a reference for how the layers should scale down automatically, use the 'width'
             // option as a reference, unless the width was set to a percentage. If there isn't a set reference and
             // the width was set to a percentage, auto scaling will not be used because it's not possible to
             // calculate how much should the layers scale.
             if (this.st._AUTO_SCALE_REFER === -1) {
                 if (typeof this.st._SLIDER_WIDTH === 'string' && this.st._SLIDER_WIDTH.indexOf('%') !== -1) {
                     useAutoScale = false;
                 } else {
                     _AUTO_SCALE_REFER = parseInt(this.st._SLIDER_WIDTH, 10);
                 }
             } else {
                 _AUTO_SCALE_REFER = this.st._AUTO_SCALE_REFER;
             }

             if (useAutoScale === true && this._SLIDE_W < _AUTO_SCALE_REFER) {
                 scaleRatio = _this._SLIDE_W / _AUTO_SCALE_REFER;
             } else {
                 scaleRatio = this.st._SCALE_RATIO ? this.st._SCALE_RATIO : 1;
             }

             $.each(this._slides, function(index, slide) {
                 if (typeof slide.layers !== 'undefined') {
                     $.each(slide.layers, function(index, layer) {
                         layer.scale(scaleRatio);
                     });
                 }
             });

             // Show the layers for the initial slide
             this.showLayers(this._activeSL_IND);
         },

         // Replace the 'getSlide' method with this one, which makes it possible to 
         // change the slide only after the layers from the previous slide are hidden.
         _layersgetSlide: function(index) {
             var _this = this,
                 animatedLayers = this._slides[this._activeSL_IND].animatedLayers;

             // If the slider is dragged, don't wait for the layer to hide
             if (this.__slider.hasClass('nb-swiping') || typeof animatedLayers === 'undefined' || animatedLayers.length === 0) {
                 this.layersgetSlideReference(index);

                 this.hideLayers(index - 1);
                 this.hideLayers(index + 1);
             } else {
                 this.on('_CLBK_LAYERS_HIDE.' + NS, function() {
                     _this.off('_CLBK_LAYERS_HIDE.' + NS);
                     _this.layersgetSlideReference(index);
                 });

                 this.hideLayers(this._activeSL_IND);
             }
         },

         // When a new slide is selected, hide the layers from the previous slide
         // and show the layers from the current slide.
         _layersOngetSlide: function(event) {
             if (this._prevSL_IND !== this._activeSL_IND && this.st._WAIT_TO_END_LAYERS === false) {
                 this.hideLayers(this._prevSL_IND);
             }

             this.showLayers(this._activeSL_IND);
         },

         // Show the animated layers from the slide at the specified index,
         // and fire an event when all the layers from the slide become visible.
         showLayers: function(index) {

             if (this.st._SHOW_ONLY_THUMBS) return;

             var _this = this,
                 animatedLayers = typeof this._slides[index] == 'undefined' ? 0 : this._slides[index].animatedLayers,
                 layerCounter = 0;

             if (typeof animatedLayers === 'undefined') {
                 return;
             }

             $.each(animatedLayers, function(index, element) {

                 // If the layer is already visible, increment the counter directly, else wait 
                 // for the layer's showing animation to complete.
                 if (element.isVisible() === true) {
                     layerCounter++;

                     if (layerCounter === animatedLayers.length) {
                         _this.trigger({
                             type: '_CLBK_LAYERS_LOADED',
                             index: index
                         });
                         if ($.isFunction(_this.st._CLBK_LAYERS_LOADED)) {
                             _this.st._CLBK_LAYERS_LOADED.call(_this, {
                                 type: '_CLBK_LAYERS_LOADED',
                                 index: index
                             });
                         }
                     }
                 } else {
                     element.show(function() {
                         layerCounter++;

                         if (layerCounter === animatedLayers.length) {
                             _this.trigger({
                                 type: '_CLBK_LAYERS_LOADED',
                                 index: index
                             });
                             if ($.isFunction(_this.st._CLBK_LAYERS_LOADED)) {
                                 _this.st._CLBK_LAYERS_LOADED.call(_this, {
                                     type: '_CLBK_LAYERS_LOADED',
                                     index: index
                                 });
                             }
                         }
                     });
                 }
             });
         },

         // Hide the animated layers from the slide at the specified index,
         // and fire an event when all the layers from the slide become invisible.
         hideLayers: function(index) {
             if (typeof this._slides[index] == 'undefined') return;

             var _this = this,
                 animatedLayers = this._slides[index].animatedLayers,
                 layerCounter = 0;

             if (typeof animatedLayers === 'undefined') {
                 return;
             }

             $.each(animatedLayers, function(index, element) {

                 // If the layer is already invisible, increment the counter directly, else wait 
                 // for the layer's hiding animation to complete.
                 if (element.isVisible() === false) {
                     layerCounter++;

                     if (layerCounter === animatedLayers.length) {
                         _this.trigger({
                             type: '_CLBK_LAYERS_HIDE',
                             index: index
                         });
                         if ($.isFunction(_this.st._CLBK_LAYERS_HIDE)) {
                             _this.st._CLBK_LAYERS_HIDE.call(_this, {
                                 type: '_CLBK_LAYERS_HIDE',
                                 index: index
                             });
                         }
                     }
                 } else {
                     element.hide(function() {
                         layerCounter++;

                         if (layerCounter === animatedLayers.length) {
                             _this.trigger({
                                 type: '_CLBK_LAYERS_HIDE',
                                 index: index
                             });
                             if ($.isFunction(_this.st._CLBK_LAYERS_HIDE)) {
                                 _this.st._CLBK_LAYERS_HIDE.call(_this, {
                                     type: '_CLBK_LAYERS_HIDE',
                                     index: index
                                 });
                             }
                         }
                     });
                 }
             });
         },

         // Destroy the plugin
         destroyLayers: function() {
             this.off('update.' + NS);
             this.off('resize.' + NS);
             this.off('getSlide.' + NS);
             this.off('_CLBK_LAYERS_HIDE.' + NS);
         },

         layersDefaults: {

             // Indicates whether the slider will wait for the layers to disappear before
             // going to a new slide
             _WAIT_TO_END_LAYERS: false,

             // Indicates whether the layers will be scaled automatically
             _AUTO_SCALE_LAYERS_BLOCK: true,

             // Sets a reference width which will be compared to the current slider width
             // in order to determine how much the layers need to scale down. By default,
             // the reference width will be equal to the slide width. However, if the slide width
             // is set to a percentage value, then it's necessary to set a specific value for '_AUTO_SCALE_REFER'.
             _AUTO_SCALE_REFER: -1,

             // Called when all animated layers become visible
             _CLBK_LAYERS_LOADED: function() {},

             // Called when all animated layers become invisible
             _CLBK_LAYERS_HIDE: function() {}
         }
     };

     // Override the slide's 'destroy' method in order to destroy the 
     // layers _this where added to the slide as well.
     var slideDestroy = window.nobleSliderSlide.prototype.destroy;

     window.nobleSliderSlide.prototype.destroy = function() {
         if (typeof this.layers !== 'undefined') {
             $.each(this.layers, function(index, element) {
                 element.destroy();
             });

             this.layers.length = 0;
         }

         if (typeof this.animatedLayers !== 'undefined') {
             this.animatedLayers.length = 0;
         }

         slideDestroy.apply(this);
     };

     var Layer = function(layer) {

         // Reference to the layer jQuery element
         this.$layer = layer;

         // Indicates whether a layer is currently visible or hidden
         this.visible = false;

         // Indicates whether the layer was styled
         this.styled = false;

         // Holds the data attributes added to the layer
         this.data = null;

         // Indicates the layer's reference point (topLeft, bottomLeft, topRight or bottomRight)
         this.position = null;

         // Indicates which CSS property (left or right) will be used for positioning the layer 
         this.horizontalProperty = null;

         // Indicates which CSS property (top or bottom) will be used for positioning the layer 
         this.verticalProperty = null;

         // Indicates the value of the horizontal position
         this.horizontalPosition = null;

         // Indicates the value of the vertical position
         this.verticalPosition = null;

         // Indicates how much the layers needs to be scaled
         this.scaleRatio = 1;

         // Indicates the type of supported transition (CSS3 2D, CSS3 3D or JavaScript)
         this._sup_ANIM = nobleSliderUtils.getBrowserFeatures();

         // Vendor prefix for CSS [-webkit, -moz, -ms ....]
         this._browserPFX = nobleSliderUtils._getBrowserPrefix();

         // Indicates the name of the CSS transition's complete event (i.e., transitionend, webkitTransitionEnd, etc.)
         this._crossEVT = nobleSliderUtils.__getTransitionEVT();

         // Reference to the timer _this will be used to hide the layers automatically after a given time interval
         this.stayTimer = null;

         this._init();
     };

     Layer.prototype = {

         // Initialize the layers
         _init: function() {
             this.$layer.attr('data-init-layer', true);

             if (this.$layer.attr('static-layer')) {
                 this._setStyle();
             } else {
                 this.$layer.css({
                     'visibility': 'hidden',
                     'display': 'none'
                 });
             }
         },

         // Set the size and position of the layer
         _setStyle: function() {
             this.styled = true;

             this.$layer.css('display', '');

             // Get the data attributes specified in HTML
             this.data = this.$layer.data();

             if (typeof this.data.width !== 'undefined') {
                 this.$layer.css('width', this.data.width);
             }

             if (typeof this.data.height !== 'undefined') {
                 this.$layer.css('height', this.data.height);
             }

             if (typeof this.data.depth !== 'undefined') {
                 this.$layer.css('z-index', this.data.depth);
             }

             this.position = this.data.position ? (this.data.position).toLowerCase() : 'topleft';

             if (this.position.indexOf('right') !== -1) {
                 this.horizontalProperty = 'right';
             } else if (this.position.indexOf('left') !== -1) {
                 this.horizontalProperty = 'left';
             } else {
                 this.horizontalProperty = 'center';
             }

             if (this.position.indexOf('bottom') !== -1) {
                 this.verticalProperty = 'bottom';
             } else if (this.position.indexOf('top') !== -1) {
                 this.verticalProperty = 'top';
             } else {
                 this.verticalProperty = 'center';
             }

             this._setPosition();

             this.scale(this.scaleRatio);
         },

         // Set the position of the layer
         _setPosition: function() {
             var inlineStyle = this.$layer.attr('style');

             this.horizontalPosition = typeof this.data.horizontal !== 'undefined' ? this.data.horizontal : 0;
             this.verticalPosition = typeof this.data.vertical !== 'undefined' ? this.data.vertical : 0;

             // Set the horizontal position of the layer based on the data set
             if (this.horizontalProperty === 'center') {

                 // prevent content wrapping while setting the width
                 if (this.$layer.is('img') === false && (typeof inlineStyle === 'undefined' || (typeof inlineStyle !== 'undefined' && inlineStyle.indexOf('width') === -1))) {
                     this.$layer.css('white-space', 'nowrap');
                     this.$layer.css('width', this.$layer.outerWidth(true));
                 }

                 this.$layer.css({
                     'marginLeft': 'auto',
                     'marginRight': 'auto',
                     'left': this.horizontalPosition,
                     'right': 0
                 });
             } else {
                 this.$layer.css(this.horizontalProperty, this.horizontalPosition);
             }

             // Set the vertical position of the layer based on the data set
             if (this.verticalProperty === 'center') {

                 // prevent content wrapping while setting the height
                 if (this.$layer.is('img') === false && (typeof inlineStyle === 'undefined' || (typeof inlineStyle !== 'undefined' && inlineStyle.indexOf('height') === -1))) {
                     this.$layer.css('white-space', 'nowrap');
                     this.$layer.css('height', this.$layer.outerHeight(true));
                 }

                 this.$layer.css({
                     'marginTop': 'auto',
                     'marginBottom': 'auto',
                     'top': this.verticalPosition,
                     'bottom': 0
                 });
             } else {
                 this.$layer.css(this.verticalProperty, this.verticalPosition);
             }
         },

         // Scale the layer
         scale: function(ratio) {

             // Return if the layer is set to be unscalable
             if (this.$layer.hasClass('nb-no-scale')) {
                 return;
             }

             // Store the ratio (even if the layer is not ready to be scaled yet)
             this.scaleRatio = ratio;

             // Return if the layer is not styled yet
             if (this.styled === false) {
                 return;
             }

             var horizontalProperty = this.horizontalProperty === 'center' ? 'left' : this.horizontalProperty,
                 verticalProperty = this.verticalProperty === 'center' ? 'top' : this.verticalProperty,
                 css = {};

             // Apply the scaling
             css[this._browserPFX + 'transform-origin'] = this.horizontalProperty + ' ' + this.verticalProperty;
             css[this._browserPFX + 'transform'] = 'scale(' + this.scaleRatio + ')';

             // If the position is not set to a percentage value, apply the scaling to the position
             if (typeof this.horizontalPosition !== 'string') {
                 css[horizontalProperty] = this.horizontalPosition * this.scaleRatio;
             }

             // If the position is not set to a percentage value, apply the scaling to the position
             if (typeof this.verticalPosition !== 'string') {
                 css[verticalProperty] = this.verticalPosition * this.scaleRatio;
             }

             // If the width or height is set to a percentage value, increase the percentage in order to
             // maintain the same layer to slide proportions. This is necessary because otherwise the scaling
             // transform would minimize the layers more than intended.
             if (typeof this.data.width === 'string' && this.data.width.indexOf('%') !== -1) {
                 css.width = (parseInt(this.data.width, 10) / this.scaleRatio).toString() + '%';
             }

             if (typeof this.data.height === 'string' && this.data.height.indexOf('%') !== -1) {
                 css.height = (parseInt(this.data.height, 10) / this.scaleRatio).toString() + '%';
             }

             this.$layer.css(css);
         },

         // Show the layer
         show: function(callback) {

             if (this.visible === true || this.$layer.attr('static-layer')) {
                 return;
             }

             this.visible = true;

             // First, style the layer if it's not already styled
             if (this.styled === false) {
                 this._setStyle();
             }

             var _this = this,
                 offset = typeof this.data.showOffset !== 'undefined' ? this.data.showOffset : 50,
                 duration = typeof this.data.showDuration !== 'undefined' ? this.data.showDuration / 1000 : 0.4,
                 delay = typeof this.data.showDelay !== 'undefined' ? this.data.showDelay : 10,
                 stayDuration = typeof _this.data.stayDuration !== 'undefined' ? parseInt(_this.data.stayDuration, 10) : -1;

             // Animate the layers with CSS3 or with JavaScript
             if (this._sup_ANIM === 'js') {
                 this.$layer
                     .stop()
                     .delay(delay)
                     .css({
                         'opacity': 0,
                         'visibility': 'visible'
                     })
                     .animate({
                         'opacity': 1
                     }, duration * 1000, function() {

                         // Hide the layer after a given time interval
                         if (stayDuration !== -1) {
                             _this.stayTimer = setTimeout(function() {
                                 _this.hide();
                                 _this.stayTimer = null;
                             }, stayDuration);
                         }

                         if (typeof callback !== 'undefined') {
                             callback();
                         }
                     });
             } else {
                 var start = {
                         'opacity': 0,
                         'visibility': 'visible'
                     },
                     target = {
                         'opacity': 1,
                         'display': ''
                     },
                     transformValues = '';

                 start[this._browserPFX + 'transform'] = 'scale(' + this.scaleRatio + ')';
                 target[this._browserPFX + 'transform'] = 'scale(' + this.scaleRatio + ')';
                 target[this._browserPFX + 'transition'] = 'opacity ' + duration + 's';

                 if (typeof this.data.showTransition !== 'undefined') {
                     if (this.data.showTransition === 'left') {
                         transformValues = offset + 'px, 0';
                     } else if (this.data.showTransition === 'right') {
                         transformValues = '-' + offset + 'px, 0';
                     } else if (this.data.showTransition === 'up') {
                         transformValues = '0, ' + offset + 'px';
                     } else if (this.data.showTransition === 'down') {
                         transformValues = '0, -' + offset + 'px';
                     }

                     start[this._browserPFX + 'transform'] += this._sup_ANIM === 'css3D' ? ' translate3d(' + transformValues + ', 0)' : ' translate(' + transformValues + ')';
                     target[this._browserPFX + 'transform'] += this._sup_ANIM === 'css3D' ? ' translate3d(0, 0, 0)' : ' translate(0, 0)';
                     target[this._browserPFX + 'transition'] += ', ' + this._browserPFX + 'transform ' + duration + 's';
                 }

                 // Listen when the layer animation is complete
                 this.$layer.on(this._crossEVT, function(event) {
                     if (event.target !== event.currentTarget) {
                         return;
                     }

                     _this.$layer
                         .off(_this._crossEVT)
                         .css(_this._browserPFX + 'transition', '');

                     // Hide the layer after a given time interval
                     if (stayDuration !== -1) {
                         _this.stayTimer = setTimeout(function() {
                             _this.hide();
                             _this.stayTimer = null;
                         }, stayDuration);
                     }

                     if (typeof callback !== 'undefined') {
                         callback();
                     }
                 });

                 this.$layer.css(start);

                 setTimeout(function() {
                     _this.$layer.css(target);
                 }, delay);
             }
         },

         // Hide the layer
         hide: function(callback) {

             if (this.visible === false || this.$layer.attr('static-layer')) {
                 return;
             }

             var _this = this,
                 offset = typeof this.data.hideOffset !== 'undefined' ? this.data.hideOffset : 50,
                 duration = typeof this.data.hideDuration !== 'undefined' ? this.data.hideDuration / 1000 : 0.4,
                 delay = typeof this.data.hideDelay !== 'undefined' ? this.data.hideDelay : 10;

             this.visible = false;

             // If the layer is hidden before it hides automatically, clear the timer
             if (this.stayTimer !== null) {
                 clearTimeout(this.stayTimer);
             }

             // Animate the layers with CSS3 or with JavaScript
             if (this._sup_ANIM === 'js') {
                 this.$layer
                     .stop()
                     .delay(delay)
                     .animate({
                         'opacity': 0
                     }, duration * 1000, function() {
                         $(this).css('visibility', 'hidden');

                         if (typeof callback !== 'undefined') {
                             callback();
                         }
                     });
             } else {
                 var transformValues = '',
                     target = {
                         'opacity': 0
                     };

                 if (this.$layer.attr('layer-caption') == 'true')
                     target['display'] = 'none';
                 target[this._browserPFX + 'transform'] = 'scale(' + this.scaleRatio + ')';
                 target[this._browserPFX + 'transition'] = 'opacity ' + duration + 's';

                 if (typeof this.data.hideTransition !== 'undefined') {
                     if (this.data.hideTransition === 'left') {
                         transformValues = '-' + offset + 'px, 0';
                     } else if (this.data.hideTransition === 'right') {
                         transformValues = offset + 'px, 0';
                     } else if (this.data.hideTransition === 'up') {
                         transformValues = '0, -' + offset + 'px';
                     } else if (this.data.hideTransition === 'down') {
                         transformValues = '0, ' + offset + 'px';
                     }

                     target[this._browserPFX + 'transform'] += this._sup_ANIM === 'css3D' ? ' translate3d(' + transformValues + ', 0)' : ' translate(' + transformValues + ')';
                     target[this._browserPFX + 'transition'] += ', ' + this._browserPFX + 'transform ' + duration + 's';
                 }

                 // Listen when the layer animation is complete
                 this.$layer.on(this._crossEVT, function(event) {
                     if (event.target !== event.currentTarget) {
                         return;
                     }

                     _this.$layer
                         .off(_this._crossEVT)
                         .css(_this._browserPFX + 'transition', '');

                     // Hide the layer after transition
                     if (_this.visible === false) {
                         _this.$layer.css('visibility', 'hidden');
                     }

                     if (typeof callback !== 'undefined') {
                         callback();
                     }
                 });

                 setTimeout(function() {
                     _this.$layer.css(target);
                 }, delay);
             }
         },

         isVisible: function() {
             if (this.visible === false || this.$layer.is(':hidden')) {
                 return false;
             }

             return true;
         },

         // Destroy the layer
         destroy: function() {
             this.$layer.removeAttr('style');
             this.$layer.removeAttr('data-init-layer');
         }
     };

     $.nobleSlider.injectPlugin('Layers', Layers);

 })(window, jQuery);

 // Fade plugin.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Fade.' + $.nobleSlider._DF_NM;

     var Fade = {

         // Reference to the original 'getSlide' method
         fadegetSlideReference: null,

         initFade: function() {
             this.on('update.' + NS, $.proxy(this._fadeOnUpdate, this));
         },

         // If fade is enabled, store a reference to the original 'getSlide' method
         // and then assign a new function to 'getSlide'.
         _fadeOnUpdate: function() {
             if (this.st._SLIDE_FADE === true) {
                 this.fadegetSlideReference = this.getSlide;
                 this.getSlide = this._fadegetSlide;
             }
         },

         // Will replace the original 'getSlide' function by adding a cross-fade effect
         // between the previous and the next slide.
         _fadegetSlide: function(index) {
             if (index === this._activeSL_IND) {
                 return;
             }

             // If the slides are being swiped/dragged, don't use fade, but call the original method instead.
             // If not, which means _this a new slide was selected through a button, arrows or direct call, then
             // use fade.
             if (this.__slider.hasClass('nb-swiping')) {
                 this.fadegetSlideReference(index);
             } else {
                 var _this = this,
                     $_nextSlide,
                     $_previousSlide,
                     newIndex = index;

                 // _SLIDE_LOOP through all the slides and overlap the the previous and next slide,
                 // and hide the other slides.
                 $.each(this._slides, function(index, element) {
                     var nav_apple = navigator.userAgent.match(/(iPod|iPhone|iPad)/),
                         slideIndex = element.getIndex(),
                         $slide = element.$slide;

                     if (slideIndex === newIndex) {
                         $slide.css({
                             'opacity': 0,
                             'left': 0,
                             'top': 0,
                             'z-index': 20
                         });
                         $_nextSlide = $slide;
                     } else if (slideIndex === _this._activeSL_IND) {
                         $slide.css({
                             'opacity': 1,
                             'left': 0,
                             'top': 0,
                             'z-index': 10
                         });
                         $_previousSlide = $slide;
                     } else {
                         if (!_nb_isTouchDevice || nav_apple) $slide.css('visibility', 'hidden');
                     }
                 });

                 // Set the new indexes for the previous and selected slides
                 this._prevSL_IND = this._activeSL_IND;
                 this._activeSL_IND = index;

                 // Re-assign the 'nb-selected' class to the currently selected slide
                 this.__a_slides.find('.nb__active').removeClass('nb__active');
                 this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).addClass('nb__active');

                 // Rearrange the slides if the slider is _SLIDE_LOOPable
                 if (_this.st._SLIDE_LOOP === true) {
                     _this._updateSlidesOrder();
                 }

                 // Move the slides container so _this the cross-fading slides (which now have the top and left
                 // position set to 0) become visible and in the center of the slider.
                 this._moveSlide(this._visible_EQ, true);

                 // Fade out the previous slide, if indicated, in addition to fading in the next slide
                 if (this.st._FADE_OUT_PREV_SLIDE === true) {
                     this._fadeSlideTo($_previousSlide, 0);
                 }

                 // Fade in the selected slide
                 this._fadeSlideTo($_nextSlide, 1, function() {

                     // After the animation is over, make all the slides visible again
                     $.each(_this._slides, function(index, element) {
                         var $slide = element.$slide;
                         $slide.css({
                             'visibility': '',
                             'opacity': '',
                             'z-index': ''
                         });
                     });

                     // Reset the position of the slides and slides container
                     _this._resetSlidesPosition();

                     // Fire the '_CLBK_WHEN_SLIDE_COMPLETE' event
                     _this.trigger({
                         type: '_CLBK_WHEN_SLIDE_COMPLETE',
                         index: index,
                         previousIndex: _this._prevSL_IND
                     });
                     if ($.isFunction(_this.st._CLBK_WHEN_SLIDE_COMPLETE)) {
                         _this.st._CLBK_WHEN_SLIDE_COMPLETE.call(_this, {
                             type: '_CLBK_WHEN_SLIDE_COMPLETE',
                             index: index,
                             previousIndex: _this._prevSL_IND
                         });
                     }
                 });

                 if (this.st._SLIDER_ENABLE_AUTO_HEIGHT === true) {
                     this._resizeHeight();
                 }

                 // Fire the 'getSlide' event
                 this.trigger({
                     type: 'getSlide',
                     index: index,
                     previousIndex: this._prevSL_IND
                 });
                 if ($.isFunction(this.st._CLBK_GET_TO_SLIDE)) {
                     this.st._CLBK_GET_TO_SLIDE.call(this, {
                         type: 'getSlide',
                         index: index,
                         previousIndex: this._prevSL_IND
                     });
                 }
             }
         },

         // Fade the target slide to the specified opacity (0 or 1)
         _fadeSlideTo: function(target, opacity, callback) {
             var _this = this;

             // Use CSS transitions if they are supported. If not, use JavaScript animation.
             if (this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') {

                 // There needs to be a delay between the moment the opacity is set
                 // and the moment the transitions starts.
                 setTimeout(function() {
                     var css = {
                         'opacity': opacity
                     };
                     css[_this._browserPFX + 'transition'] = 'opacity ' + _this.st._FADE_EFFECT_DURATION / 1000 + 's';
                     target.css(css);
                 }, 100);

                 target.on(this._crossEVT, function(event) {
                     if (event.target !== event.currentTarget) {
                         return;
                     }

                     target.off(_this._crossEVT);
                     target.css(_this._browserPFX + 'transition', '');

                     if (typeof callback === 'function') {
                         callback();
                     }
                 });
             } else {
                 target.stop().animate({
                     'opacity': opacity
                 }, this.st._FADE_EFFECT_DURATION, function() {
                     if (typeof callback === 'function') {
                         callback();
                     }
                 });
             }
         },

         // Destroy the plugin
         destroyFade: function() {
             this.off('update.' + NS);

             if (this.fadegetSlideReference !== null) {
                 this.getSlide = this.fadegetSlideReference;
             }
         },

         fadeDefaults: {

             // Indicates if fade will be used
             _SLIDE_FADE: false,

             // Indicates if the previous slide will be faded out (in addition to the next slide being faded in)
             _FADE_OUT_PREV_SLIDE: true,

             // Sets the duration of the fade effect
             _FADE_EFFECT_DURATION: 500,
         }
     };

     $.nobleSlider.injectPlugin('Fade', Fade);

 })(window, jQuery);




 // Touch Swipe plugin.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'TouchSwipe.' + $.nobleSlider._DF_NM;
     var startX, endX, difference, startTime, endTime, touchStop;

     var TouchSwipe = {

         // The x and y coordinates of the pointer/finger's starting position
         touchStartPoint: {
             x: 0,
             y: 0
         },

         // The x and y coordinates of the pointer/finger's end position
         touchEndPoint: {
             x: 0,
             y: 0
         },

         // The distance from the starting to the end position on the x and y axis
         touchDistance: {
             x: 0,
             y: 0
         },

         // The position of the slides when the touch swipe starts
         touchStartPosition: 0,

         // Indicates if the slides are being swiped
         isTouchMoving: false,
         // Stores the names of the events
         touchSwipeEvents: {
             startEvent: '',
             moveEvent: '',
             endEvent: ''
         },

         initTouchSwipe: function() {
             var _this = this;

             // check if touch swipe is enabled
             if (this.st._ENABLE_TOUCH_SWIPE === false) {
                 return;
             }

             this.touchSwipeEvents.startEvent = 'touchstart' + '.' + NS + ' mousedown' + '.' + NS;
             this.touchSwipeEvents.moveEvent = 'touchmove' + '.' + NS + ' mousemove' + '.' + NS;
             this.touchSwipeEvents.endEvent = 'touchend' + '.' + this._original_ID + '.' + NS + ' mouseup' + '.' + this._original_ID + '.' + NS;


             // Listen for touch swipe/mouse move events//this.__slGhost
             this.__slGhost.on(this.touchSwipeEvents.startEvent, $.proxy(this._onTouchStart, this));
             $(document).on('dragstart.' + NS, function(event) {
                 event.preventDefault();

             });

             // Add the grabbing icon
             this.__slGhost.addClass('nb-grab');
         },

         // Called when the slides starts being dragged
         _onTouchStart: function(event) {

             // Disable dragging if the element is set to allow selections
             if ($(event.target).closest('.nb-draggsl').length >= 1) {
                 return;
             }

             var _this = this,
                 eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

             touchStop = 0;
             _nb_startPull = false;
             this.pullDistance = 0;

             // Prevent default behavior only for mouse events
             if (typeof event.originalEvent.touches === 'undefined') {
                 event.preventDefault();
             }

             // Disable click events on links
             $(event.target).parents('.nb-slide').find('a').one('click.' + NS, function(event) {
                 event.preventDefault();
             });

             // Get the initial position of the mouse pointer and the initial position
             // of the slides' container
             this.touchStartPoint.x = eventObject.pageX || eventObject.clientX;
             this.touchStartPoint.y = eventObject.pageY || eventObject.clientY;
             this.touchStartPosition = this._sl_POS;

             // Clear the previous distance values
             this.touchDistance.x = this.touchDistance.y = 0;

             // If the slides are being grabbed while they're still animating, stop the
             // current movement
             if (this.__a_slides.hasClass('nb-animated')) {
                 this.isTouchMoving = true;
                 this.__stopSlideMovement();
                 this.touchStartPosition = this._sl_POS;
             }


             var d = new Date();
             startTime = d.getTime();
             startX = this.touchStartPoint.x; //starting point

             // Listen for move and end events
             //this.__slGhost
             $(document).on(this.touchSwipeEvents.moveEvent, $.proxy(this._onTouchMove, this));
             $(document).on(this.touchSwipeEvents.endEvent, $.proxy(this._onTouchEnd, this));

             // Swap grabbing icons
             this.__slGhost.removeClass('nb-grab').addClass('nb-grabbing');

             // Add 'nb-swiping' class to indicate _this the slides are being swiped
             this.__slider.addClass('nb-swiping');


         },

         // Called during the slides' dragging
         _onTouchMove: function(event) {

             var eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

             touchStop = this.st._SLIDES_ORIENTATION === 'horizontal' ? this.touchEndPoint.x : this.touchEndPoint.y;

             // Indicate _this the move event is being fired
             this.isTouchMoving = true;

             // Get the current position of the mouse pointer
             this.touchEndPoint.x = eventObject.pageX || eventObject.clientX;
             this.touchEndPoint.y = eventObject.pageY || eventObject.clientY;

             // Calculate the distance of the movement on both axis
             this.touchDistance.x = this.touchEndPoint.x - this.touchStartPoint.x;
             this.touchDistance.y = this.touchEndPoint.y - this.touchStartPoint.y;




             // Calculate the distance of the swipe _this takes place in the same direction as the orientation of the slides
             // and calculate the distance from the opposite direction.
             // 
             // For a swipe to be valid there should more distance in the same direction as the orientation of the slides.
             var distance = this.st._SLIDES_ORIENTATION === 'horizontal' ? this.touchDistance.x : this.touchDistance.y,
                 oppositeDistance = this.st._SLIDES_ORIENTATION === 'horizontal' ? this.touchDistance.y : this.touchDistance.x;


             if (this.st._ALLOW_TO_PULL && Math.abs(this.touchDistance.y) > Math.abs(this.touchDistance.x)) {
                 this.pullDistance = this.touchDistance.y;
                 return this._pullTo(this.touchDistance.y, 'instant', this._sl_POS, this.touchStartPoint.y, this.touchEndPoint.y, this.touchEndPoint.x, Math.abs(this.pullDistance));

             }


             // If the movement is in the same direction as the orientation of the slides, the swipe is valid
             if (Math.abs(distance) > Math.abs(oppositeDistance)) {
                 event.preventDefault();
             } else {
                 return;
             }



             if (this.st._SLIDE_LOOP === false) {
                 // Make the slides move slower if they're dragged outside its bounds
                 if ((this._sl_POS > this.touchStartPosition && this._activeSL_IND === 0) ||
                     (this._sl_POS < this.touchStartPosition && this._activeSL_IND === this.getTotalSlides() - 1)
                 ) {
                     distance = distance * 0.18;
                 }
             }
             if (!_nb_startPull) this._moveSlide(this.touchStartPosition + distance, true);
         },

         // Called when the slides are released
         _onTouchEnd: function(event) {

             var swipeSpeed, swipeSpeed_x2,
                 _this = this,
                 touchDistance = this.st._SLIDES_ORIENTATION === 'horizontal' ? this.touchDistance.x : this.touchDistance.y,
                 touchOrienSepw = this.st._SLIDES_ORIENTATION === 'horizontal' ? this.touchEndPoint.x : this.touchEndPoint.y;


             // Remove the move and end listeners
             ///this.__slGhost
             $(document).off(this.touchSwipeEvents.moveEvent);
             $(document).off(this.touchSwipeEvents.endEvent);

             // Swap grabbing icons
             this.__slGhost.removeClass('nb-grabbing').addClass('nb-grab');

             // Check if there is intention for a tap
             if (this.isTouchMoving === false || this.isTouchMoving === true && Math.abs(this.touchDistance.x) < 10 && Math.abs(this.touchDistance.y) < 10) {
                 // Re-enable click events on links
                 $(event.target).parents('.nb-slide').find('a').off('click.' + NS);
                 this.__slider.removeClass('nb-swiping');
             }

             // Remove the 'nb-swiping' class but with a delay
             // because there might be other event listeners _this check
             // the existence of this class, and this class should still be 
             // applied for those listeners, since there was a swipe event
             setTimeout(function() {
                 _this.__slider.removeClass('nb-swiping');
             }, 1);

             // Return if the slides didn't move
             if (this.isTouchMoving === false) {
                 return;
             }

             this.isTouchMoving = false;

             $(event.target).parents('.nb-slide').one('click', function(event) {
                 event.preventDefault();
             });

             // Calculate the old position of the slides in order to return to it if the swipe
             // is below the threshold
             var oldSlidesPosition = -parseInt(this.__a_slides.find('.nb-slide').eq(this._activeSL_IND).css(this._posPropty), 10) + this._visible_EQ;


             if (this.st._ALLOW_TO_PULL) {
                 if (Math.abs(this.pullDistance) < this.st._ALLOW_TO_PULL.pullDistance && Math.abs(this.pullDistance)) return this._pullTo(oldSlidesPosition, 'animate', oldSlidesPosition, this.touchStartPoint.y, this.touchEndPoint.y, this.touchEndPoint.x, Math.abs(this.pullDistance));
                 else if (Math.abs(this.pullDistance) > this.st._ALLOW_TO_PULL.pullDistance && Math.abs(this.pullDistance)) return this._pullTo(oldSlidesPosition, 'end', oldSlidesPosition, this.touchStartPoint.y, this.touchEndPoint.y, this.touchEndPoint.x, Math.abs(this.pullDistance));
             }

             if (Math.abs(touchDistance) < this.st._TOUCH_SWIPE_TRESHOLD || (touchStop > touchOrienSepw && 0 < touchDistance) || (touchStop < touchOrienSepw && 0 > touchDistance))

                 this._moveSlide(oldSlidesPosition);

             else {

                 // Calculate by how many slides the slides container has moved
                 var slideArrayDistance = touchDistance / (this._SLIDE_DIMENSION + this.st._SLIDES_SPACING);


                 // Floor the obtained value and add or subtract 1, depending on the direction of the swipe
                 slideArrayDistance = parseInt(slideArrayDistance, 10) + (slideArrayDistance > 0 ? 1 : -1);

                 // Get the index of the currently selected slide and subtract the position index in order to obtain
                 // the new index of the selected slide. 
                 var _nextSlideIndex = this._slidesTRIM[$.inArray(this._activeSL_IND, this._slidesTRIM) - slideArrayDistance];

                 var c = function(a) {
                     return typeof a == 'undefined' ? _this.st._SLIDE_ANIMATION_DURATION : (100 > a ? 100 : _this.st._SLIDE_ANIMATION_DURATION < a ? _this.st._SLIDE_ANIMATION_DURATION : a)
                 }

                 swipeSpeed = c(Math.abs(((this.st._SLIDES_ORIENTATION === 'horizontal' ? this.__slider.width() : this.__slider.height()) + this.st._TOUCH_SWIPE_TRESHOLD) * this.st._TOUCH_SWIPE_SPEED_RATIO) / (Math.abs(touchDistance) / (new Date().getTime() - startTime)));
                 _nb_global_swipeSpeed = swipeSpeed;

                 //c(Math.abs(oldSlidesPosition - (-_nextSlideIndex) * ((this.st._SLIDES_ORIENTATION === 'horizontal' ? this.__slider.width() : this.__slider.height()) + this.st._TOUCH_SWIPE_TRESHOLD)) / (Math.abs(touchDistance) / (new Date().getTime() - startTime)));
                 /// c(Math.abs(oldSlidesPosition - (-_nextSlideIndex) * ((this.st._SLIDES_ORIENTATION === 'horizontal' ? this.__slider.width() : this.__slider.height()) + this.st._TOUCH_SWIPE_TRESHOLD)) / (Math.abs(touchDistance) / (new Date().getTime() - startTime)));
                 ///c(Math.abs( ((this.st._SLIDES_ORIENTATION === 'horizontal' ? this.__slider.width() : this.__slider.height()) + this.st._TOUCH_SWIPE_TRESHOLD) * 0.4) / (Math.abs(touchDistance) / (new Date().getTime() - startTime)));
                 ////c(Math.abs(touchOrienSepw-(startX*0.1)) / (Math.abs(touchDistance) / (new Date().getTime() - startTime) )),
                 //////c(Math.abs(oldSlidesPosition - (-_nextSlideIndex) * ((this.st._SLIDES_ORIENTATION === 'horizontal' ? this.__slider.width() : this.__slider.height()) + this.st._TOUCH_SWIPE_TRESHOLD)) / (Math.abs(touchDistance) / (new Date().getTime() - startTime)));


                 swipeSpeed_x2 = c(Math.abs(oldSlidesPosition - (-1) * ((this.st._SLIDES_ORIENTATION === 'horizontal' ? this.__slider.width() : this.__slider.height()) + this.st._TOUCH_SWIPE_TRESHOLD)) / (Math.abs(touchDistance) / (new Date().getTime() - startTime)));


                 if (this.st._SLIDE_LOOP === true) {
                     this.getSlide(_nextSlideIndex, swipeSpeed);
                 } else {
                     if (typeof _nextSlideIndex !== 'undefined') {
                         this.getSlide(_nextSlideIndex, swipeSpeed);
                     } else {
                         this._moveSlide(oldSlidesPosition, false, null, null, swipeSpeed_x2);
                     }
                 }
             }

         },

         // Destroy the plugin
         destroyTouchSwipe: function() {
             this.__slGhost.off(this.touchSwipeEvents.startEvent);
             this.__slGhost.off(this.touchSwipeEvents.moveEvent);
             this.__slGhost.off('dragstart.' + NS);
             $(document).off(this.touchSwipeEvents.endEvent);
             this.__slGhost.removeClass('nb-grab');

             $(document).off(this.touchSwipeEvents.startEvent);
             $(document).off(this.touchSwipeEvents.moveEvent);
             $(document).off('dragstart.' + NS);

         },

         touchSwipeDefaults: {

             // Indicates whether the touch swipe will be enabled
             _ENABLE_TOUCH_SWIPE: true,

             // Sets the minimum amount to slide move
             _TOUCH_SWIPE_TRESHOLD: 50,

             // Touch speed ratio
             _TOUCH_SWIPE_SPEED_RATIO: 0.44 // calculated in decrease, for example: for fasting speed need to set to 0.22 
         }
     };

     $.nobleSlider.injectPlugin('TouchSwipe', TouchSwipe);

 })(window, jQuery);



 // Captions plugin
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Caption.' + $.nobleSlider._DF_NM;

     var Caption = {

         // Reference to the container element _this will hold the caption
         $captionContainer: null,

         // The caption content/text
         captionContent: '',

         initCaption: function() {
             this.on('update.' + NS, $.proxy(this._captionOnUpdate, this));
             this.on('getSlide.' + NS, $.proxy(this._updateCaptionContent, this));
         },

         // Create the caption container and hide the captions inside the slides
         _captionOnUpdate: function() {
             var _this = this;
             this.$captionContainer = this.__slider.find('.nb-caption-container');

             if (this.__slider.find('.nb-caption').length && this.$captionContainer.length === 0) {
                 this.$captionContainer = $('<div class="nb-caption-container"></div>').appendTo(this.__slider);

                 // Show the caption for the selected slide
               //  setTimeout(function() {
                     _this._updateCaptionContent();
                 //}, 50);
             }

             // Hide the captions inside the slides
             this.__a_slides.find('.nb-caption').each(function() {
                 $(this).css('display', 'none');
             });
         },

         // Show the caption content for the selected slide
         _updateCaptionContent: function() {
             var _this = this,
                 newCaptionField = this.__slider.find('.nb-slide').eq(this._activeSL_IND).find('.nb-caption'),
                 newCaptionContent = newCaptionField.length !== 0 ? newCaptionField.html() : '';

             // Either use a fade effect for swapping the captions or use an instant change
             if (this.st._FADE_CAPTION === true) {

                 // If the previous slide had a caption, fade out _this caption first and when the animation is over
                 // fade in the current caption.
                 // If the previous slide didn't have a caption, fade in the current caption directly.
                 if (this.captionContent !== '') {

                     // If the caption container has 0 opacity when the fade out transition starts, set it
                     // to 1 because the transition wouldn't work if the initial and final values are the same,
                     // and the callback functions wouldn't fire in this case.
                     if (parseFloat(this.$captionContainer.css('opacity'), 10) === 0) {
                         this.$captionContainer.css(this._browserPFX + 'transition', '');
                         this.$captionContainer.css('opacity', 1);
                     }

                     this._fadeCaptionTo(0, function() {
                         _this.captionContent = newCaptionContent;

                         if (newCaptionContent !== '') {
                             _this.$captionContainer.html(_this.captionContent);
                             _this._fadeCaptionTo(1);
                         } else {
                             _this.$captionContainer.empty();
                         }
                     });
                 } else {
                     this.captionContent = newCaptionContent;
                     this.$captionContainer.html(this.captionContent);
                     this.$captionContainer.css('opacity', 0);
                     this._fadeCaptionTo(1);
                 }
             } else {
                 this.captionContent = newCaptionContent;
                 this.$captionContainer.html(this.captionContent);
             }
         },

         // Fade the caption container to the specified opacity
         _fadeCaptionTo: function(opacity, callback) {
             var _this = this;

             // Use CSS transitions if they are supported. If not, use JavaScript animation.
             if (this._sup_ANIM === 'css3D' || this._sup_ANIM === 'css2D') {

                 // There needs to be a delay between the moment the opacity is set
                 // and the moment the transitions starts.
                 setTimeout(function() {
                     var css = {
                         'opacity': opacity
                     };
                     css[_this._browserPFX + 'transition'] = 'opacity ' + _this.st._FADE_CAPTION_DUR / 1000 + 's';
                     _this.$captionContainer.css(css);
                 }, 1);

                 this.$captionContainer.on(this._crossEVT, function(event) {
                     if (event.target !== event.currentTarget) {
                         return;
                     }

                     _this.$captionContainer.off(_this._crossEVT);
                     _this.$captionContainer.css(_this._browserPFX + 'transition', '');

                     if (typeof callback === 'function') {
                         callback();
                     }
                 });
             } else {
                 this.$captionContainer.stop().animate({
                     'opacity': opacity
                 }, this.st._FADE_CAPTION_DUR, function() {
                     if (typeof callback === 'function') {
                         callback();
                     }
                 });
             }
         },

         // Destroy the plugin
         destroyCaption: function() {
             this.off('update.' + NS);
             this.off('getSlide.' + NS);

             this.$captionContainer.remove();

             this.__slider.find('.nb-caption').each(function() {
                 $(this).css('display', '');
             });
         },

         captionDefaults: {

             // Indicates whether or not the captions will be faded
             _FADE_CAPTION: false,

             // Sets the duration of the fade animation
             _FADE_CAPTION_DUR: 500
         }
     };

     $.nobleSlider.injectPlugin('Caption', Caption);

 })(window, jQuery);

 // Deep Linking plugin.
 // 
 // Updates the hash of the URL as the user navigates through the slides.
 // Also, allows navigating to a specific slide by indicating it in the hash.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'DeepLinking.' + $.nobleSlider._DF_NM;

     var DeepLinking = {

         initDeepLinking: function() {
             var _this = this;

             // Parse the initial hash
             this.on('init.' + NS, function() {
                 _this._gotoHash(window.location.hash);
             });

             // Update the hash when a new slide is selected
             this.on('getSlide.' + NS, function(event) {
                 if (_this.st._DEEP_LINKING === true) {
			event.preventDefault();

                     // get the 'id' attribute of the slide
                     var slideId = _this.__slider.find('.nb-slide').eq(event.index).attr('id');

                     // if the slide doesn't have an 'id' attribute, use the slide index
                     if (typeof slideId === 'undefined') {
                         slideId = event.index;
                     }
		    setTimeout(function(){

                     window.location.hash = _this.__slider.attr('id') + '/' + slideId;




},10);
                 }
             });

             // Check when the hash changes and navigate to the indicated slide
             $(window).on('hashchange.' + this._original_ID + '.' + NS, function() {
                 _this._gotoHash(window.location.hash);
             });
         },

         // Parse the hash and return the slider id and the slide id
         _parseHash: function(hash) {
             if (hash !== '') {
                 // Eliminate the # symbol
                 hash = hash.substring(1);

                 // Get the specified slider id and slide id
                 var values = hash.split('/'),
                     slideId = values.pop(),
                     sliderId = hash.slice(0, -slideId.toString().length - 1);

                 if (this.__slider.attr('id') === sliderId) {
                     return {
                         'sliderID': sliderId,
                         'slideId': slideId
                     };
                 }
             }

             return false;
         },

         // Navigate to the appropriate slide, based on the specified hash
         _gotoHash: function(hash) {
             var result = this._parseHash(hash);

             if (result === false) {
                 return;
             }

             var slideId = result.slideId,
                 slideIdNumber = parseInt(slideId, 10);

             // check if the specified slide id is a number or string
             if (isNaN(slideIdNumber)) {
                 // get the index of the slide based on the specified id
                 var slideIndex = this.__slider.find('.nb-slide#' + slideId).index();

                 if (slideIndex !== -1 && slideIndex !== this._activeSL_IND) {
                     this.getSlide(slideIndex);
                 }
             } else if (slideIdNumber !== this._activeSL_IND) {
                 this.getSlide(slideIdNumber);
             }
         },

         // Destroy the plugin
         destroyDeepLinking: function() {
             this.off('init.' + NS);
             this.off('getSlide.' + NS);
             $(window).off('hashchange.' + this._original_ID + '.' + NS);
         },

         deepLinkingDefaults: {

             // Indicates whether the hash will be updated when a new slide is selected
             _DEEP_LINKING: false
         }
     };

     $.nobleSlider.injectPlugin('DeepLinking', DeepLinking);

 })(window, jQuery);

 // Autoplay plugin.
 // 
 // Adds automatic navigation through the slides by calling the
 // '_nextSlide' or '_previousSlide' methods at certain time intervals.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Autoplay.' + $.nobleSlider._DF_NM;

     var Autoplay = {

         autoplayTimer: null,

         isTimerRunning: false,

         isTimerPaused: false,

         initAutoplay: function() {
             this.on('update.' + NS, $.proxy(this._autoplayOnUpdate, this));
         },

         // Start the autoplay if it's enabled, or stop it if it's disabled but running 
         _autoplayOnUpdate: function(event) {
             if (this.st._AUTO_PLAY_SLIDE === true) {
                 this.on('getSlide.' + NS, $.proxy(this._autoplayOngetSlide, this));
                 this.on('mouseenter.' + NS, $.proxy(this._autoplayOnMouseEnter, this));
                 this.on('mouseleave.' + NS, $.proxy(this._autoplayOnMouseLeave, this));

                 this.startAutoplay();
             } else {
                 this.off('getSlide.' + NS);
                 this.off('mouseenter.' + NS);
                 this.off('mouseleave.' + NS);

                 this.stopAutoplay();
             }
         },

         // Restart the autoplay timer when a new slide is selected
         _autoplayOngetSlide: function(event) {
             // stop previous timers before starting a new one
             if (this.isTimerRunning === true) {
                 this.stopAutoplay();
             }

             if (this.isTimerPaused === false) {
                 this.startAutoplay();
             }
         },

         // Pause the autoplay when the slider is hovered
         _autoplayOnMouseEnter: function(event) {
             if (this.isTimerRunning && (this.st._AUTO_PLAY_HOVER === 'pause' || this.st._AUTO_PLAY_HOVER === 'stop')) {
                 this.stopAutoplay();
                 this.isTimerPaused = true;
             }
         },

         // Start the autoplay when the mouse moves away from the slider
         _autoplayOnMouseLeave: function(event) {
             if (this.st._AUTO_PLAY_SLIDE === true && this.isTimerRunning === false && this.st.AUTO_PLAY_HOVER !== 'stop') {
                 this.startAutoplay();
                 this.isTimerPaused = false;
             }
         },

         // Starts the autoplay
         startAutoplay: function() {
             var _this = this;

             this.isTimerRunning = true;

             this.autoplayTimer = setTimeout(function() {
                 if (_this.st._AUTO_PLAY_DIRECTION === 'default') {
                     _this._nextSlide();
                 } else if (_this.st._AUTO_PLAY_DIRECTION === 'previous') {
                     _this._previousSlide();
                 }
             }, this.st._AUTO_PLAY_DELAY);
         },

         // Stops the autoplay
         stopAutoplay: function() {
             this.isTimerRunning = false;
             this.isTimerPaused = false;

             clearTimeout(this.autoplayTimer);
         },

         // Destroy the plugin
         destroyAutoplay: function() {
             clearTimeout(this.autoplayTimer);

             this.off('update.' + NS);
             this.off('getSlide.' + NS);
             this.off('mouseenter.' + NS);
             this.off('mouseleave.' + NS);
         },

         autoplayDefaults: {
             // Indicates whether or not autoplay will be enabled
             _AUTO_PLAY_SLIDE: false,

             // Sets the delay/interval at which the autoplay will run
             _AUTO_PLAY_DELAY: 3000,

             // Indicates whether autoplay will navigate to the next slide or previous slide
             _AUTO_PLAY_DIRECTION: 'default',

             // Indicates if the autoplay will be paused or stopped when the slider is hovered.
             // Possible values are 'pause', 'stop' or 'default'.
             _AUTO_PLAY_HOVER: 'pause'
         }
     };

     $.nobleSlider.injectPlugin('Autoplay', Autoplay);

 })(window, jQuery);

 // Keyboard Shortcuts plugin.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Keyboard.' + $.nobleSlider._DF_NM;
     var tTimeout, keyDown_t;
     var keyBoardShortcutSlide = function(el, ev) {
         // lArrow key go to the previous slide. (horizontal)
         // rArrow key go to the next slide. (horizontal)
         // dArrow key got to the next slide (vertical)
         // uArrow key go to the previous slide (vertical)
         // Enter key - open the link attached to the main slide image.

         switch (ev.which) {

             case 37:
                 if (el.st._SLIDES_ORIENTATION == 'horizontal') el._previousSlide(); // <- left

                 break;

             case 39:
                 if (el.st._SLIDES_ORIENTATION == 'horizontal') el._nextSlide(); // -> right

                 break;

             case 38:
                 if (el.st._SLIDES_ORIENTATION == 'vertical') el._previousSlide(); // /\ up

                 break;

             case 40:
                 if (el.st._SLIDES_ORIENTATION == 'vertical') el._nextSlide(); // \/ down

                 break;

             case 13:
                 el.__slider.find('.nb-slide').eq(el._activeSL_IND).find('.nb-image-container a').length != 0 ? el.__slider.find('.nb-slide').eq(el._activeSL_IND).find('.nb-image-container a').trigger('click') : ''; // enter

                 break;

         }


     };
     var Keyboard = {

         initKeyboard: function() {
             var _this = this,
                 hasFocus = false,
                 timer;
             if (this.st._KEYBOARD_SHORTCUTS === false) {
                 return;
             }
             // Detect when the slide is in focus and when it's not, and, optionally, make it
             // responsive to keyboard input only when it's in focus
             this.__slider.on('focus.' + NS, function() {
                 hasFocus = true;
             });

             this.__slider.on('blur.' + NS, function() {
                 hasFocus = false;
             });


             $(document).on('keydown.' + this._original_ID + '.' + NS, function(event) {
                 if (_this.st._ENABLE_KEYBOARD_ONLY_SLIDER_ACTIVE === true && hasFocus === false) {
                     return;
                 }

                 if (!tTimeout) {
                     tTimeout = true;
                     timer = setTimeout(function() {
                         keyDown_t = true;
                         tTimeout = false;
                         keyBoardShortcutSlide(_this, event)
                     }, 800);
                 }


             });
             $(document).on('keyup.' + this._original_ID + '.' + NS, function(event) {

                 tTimeout = false;
                 clearTimeout(timer);
                 if (!keyDown_t) keyBoardShortcutSlide(_this, event);
                 keyDown_t = false;
             });
         },

         // Destroy the plugin
         destroyKeyboard: function() {
             this.__slider.off('focus.' + NS);
             this.__slider.off('blur.' + NS);
             $(document).off('keydown.' + this._original_ID + '.' + NS);
         },

         keyboardDefaults: {

             // Indicates whether keyboard navigation will be enabled
             _KEYBOARD_SHORTCUTS: true,

             // Indicates whether the slider will respond to keyboard input only when
             // the slider is in focus.
             _ENABLE_KEYBOARD_ONLY_SLIDER_ACTIVE: false
         }
     };

     $.nobleSlider.injectPlugin('Keyboard', Keyboard);

 })(window, jQuery);

 // Full Screen plugin.
 // 
 // Adds the possibility to open the slider full-screen, using the HMTL5 FullScreen API.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'FullScreen.' + $.nobleSlider._DF_NM;

     var FullScreen = {

         // Indicates whether the slider is currently in full-screen mode
         _fullScreen_enabled: false,

         // Reference to the full-screen button
         $fullScreenButton: null,

         // Reference to a set of settings _this influence the slider's size
         // before it goes full-screen
         _szBFSCRE: {},

         initFullScreen: function() {
             if (!(document.fullscreenEnabled ||
                     document.webkitFullscreenEnabled ||
                     document.mozFullScreenEnabled ||
                     document.msFullscreenEnabled)) {
                 return;
             }

             this.on('update.' + NS, $.proxy(this._fullScreenOnUpdate, this));
         },

         // Create or remove the full-screen button depending on the value of the 'fullScreen' option
         _fullScreenOnUpdate: function() {
             if (this.st._ALLOW_FULL_SCREEN === true && this.$fullScreenButton === null) {
                 this._addFullScreen();
             } else if (this.st._ALLOW_FULL_SCREEN === false && this.$fullScreenButton !== null) {
                 this._removeFullScreen();
             }

             if (this.st._ALLOW_FULL_SCREEN === true) {
                 if (this.st._FADE_FULL_SCREEN_BUTTON === true) {
                     this.$fullScreenButton.addClass('nb-fade-full-screen');
                 } else if (this.st._FADE_FULL_SCREEN_BUTTON === false) {
                     this.$fullScreenButton.removeClass('nb-fade-full-screen');
                 }
             }
         },

         // Create the full-screen button
         _addFullScreen: function() {
             this.$fullScreenButton = $('<div class="nb-full-screen-button" title="Toggle Fullscreen"></div>').appendTo(this.__slPort);
             this.$fullScreenButton.on('click.' + NS, $.proxy(this._onFullScreenButtonClick, this));

             document.addEventListener('fullscreenchange', $.proxy(this._onFullScreenChange, this));
             document.addEventListener('mozfullscreenchange', $.proxy(this._onFullScreenChange, this));
             document.addEventListener('webkitfullscreenchange', $.proxy(this._onFullScreenChange, this));
             document.addEventListener('MSFullscreenChange', $.proxy(this._onFullScreenChange, this));
         },

         // Remove the full-screen button
         _removeFullScreen: function() {
             if (this.$fullScreenButton !== null) {
                 this.$fullScreenButton.off('click.' + NS);
                 this.$fullScreenButton.remove();
                 this.$fullScreenButton = null;
                 document.removeEventListener('fullscreenchange', this._onFullScreenChange);
                 document.removeEventListener('mozfullscreenchange', this._onFullScreenChange);
                 document.removeEventListener('webkitfullscreenchange', this._onFullScreenChange);
                 document.removeEventListener('MSFullscreenChange', this._onFullScreenChange);
             }
         },

         // When the full-screen button is clicked, put the slider into full-screen mode, and
         // take it out of the full-screen mode when it's clicked again.
         _onFullScreenButtonClick: function() {
             if (this._fullScreen_enabled === false) {
                 this.$fullScreenButton.addClass('__active');
                 if (this.pattern.requestFullScreen) {
                     this.pattern.requestFullScreen();
                 } else if (this.pattern.mozRequestFullScreen) {
                     this.pattern.mozRequestFullScreen();
                 } else if (this.pattern.webkitRequestFullScreen) {
                     this.pattern.webkitRequestFullScreen();
                 } else if (this.pattern.msRequestFullscreen) {
                     this.pattern.msRequestFullscreen();
                 }
             } else {
                 this.$fullScreenButton.removeClass('__active');
                 if (document.exitFullScreen) {
                     document.exitFullScreen();
                 } else if (document.mozCancelFullScreen) {
                     document.mozCancelFullScreen();
                 } else if (document.webkitCancelFullScreen) {
                     document.webkitCancelFullScreen();
                 } else if (document.msExitFullscreen) {
                     document.msExitFullscreen();
                 }
             }
         },

         // This will be called whenever the full-screen mode changes.
         // If the slider is in full-screen mode, set it to 'full window', and if it's
         // not in full-screen mode anymore, set it back to the original size.
         _onFullScreenChange: function() {
             this._fullScreen_enabled = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? true : false;

             if (this._fullScreen_enabled === true) {
                 _nb_enabledFullScreenMode = true;
                 this._szBFSCRE = {
                     _ENFORCE_SLIDER_SIZE: this.st._ENFORCE_SLIDER_SIZE,
                     _SLIDER_ENABLE_AUTO_HEIGHT: this.st._SLIDER_ENABLE_AUTO_HEIGHT
                 };
                 this.__slider.addClass('nb-full-screen');
                 this.st._ENFORCE_SLIDER_SIZE = 'maxHeight';
                 this.st._SLIDER_ENABLE_AUTO_HEIGHT = false;

             } else {
                 _nb_enabledFullScreenMode = false;
                 this.__slider.css('margin', '');
                 this.__slider.removeClass('nb-full-screen');
                 this.st._ENFORCE_SLIDER_SIZE = this._szBFSCRE._ENFORCE_SLIDER_SIZE;
                 this.st._SLIDER_ENABLE_AUTO_HEIGHT = this._szBFSCRE._SLIDER_ENABLE_AUTO_HEIGHT;


             }

             this.resize();
         },

         // Destroy the plugin
         destroyFullScreen: function() {
             this.off('update.' + NS);
             this._removeFullScreen();
         },

         fullScreenDefaults: {

             // Indicates whether the full-screen button is enabled
             _ALLOW_FULL_SCREEN: false,

             // Indicates whether the button will fade in only on hover
             _FADE_FULL_SCREEN_BUTTON: true
         }
     };

     $.nobleSlider.injectPlugin('FullScreen', FullScreen);

 })(window, jQuery);

 // Pagination plugin.
 // 
 // Adds navigation pages at the bottom of the slider.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Buttons.' + $.nobleSlider._DF_NM;

     var Buttons = {

         // Reference to the buttons container
         $buttons: null,

         initButtons: function() {
             this.on('update.' + NS, $.proxy(this._buttonsOnUpdate, this));
         },

         _buttonsOnUpdate: function() {
             this.$buttons = this.__slider.find('.nb-buttons');

             // If there is more _this one slide but the buttons weren't created yet, create the buttons.
             // If the buttons were created but their number differs from the total number of slides, re-create the buttons.
             // If the buttons were created but there are less than one slide, remove the buttons.s
             if (this.st._ENABLE_PAGINATION === true && this.getTotalSlides() > 1 && this.$buttons.length === 0) {
                 this._createButtons();
             } else if (this.st._ENABLE_PAGINATION === true && this.getTotalSlides() !== this.$buttons.find('.nb-button').length && this.$buttons.length !== 0) {
                 this._adjustButtons();
             } else if (this.st._ENABLE_PAGINATION === false || (this.getTotalSlides() <= 1 && this.$buttons.length !== 0)) {
                 this._removeButtons();
             }
         },

         // Create the buttons
         _createButtons: function() {
             var _this = this;
             var enabledTabs = this.__slider.hasClass('nb-tab-container');
             var page_markup = '<div class="nb-button"></div>';
             var tabsContainer = this.__slider.find('.tabs-buttons');
             var tabsElements = tabsContainer.find('li');
             // Create the buttons' container
             this.$buttons = enabledTabs ? $('<div class="nb-buttons"></div>').prependTo(this.__slider) : $('<div class="nb-buttons"></div>').appendTo(this.__slider);

             // Create the buttons
             for (var i = 0; i < this.getTotalSlides(); i++) {

                 if (enabledTabs) {
                     var generateTabData = tabsElements.eq(i - tabsElements.length);
                     var appendTabInfo = '<div class="nb_dtab"><div>' + (generateTabData.find('#nb-tab-title').html()) + '<span>' + (generateTabData.find('#nb-tab-descr').html()) + '</span></div></div>';
                     page_markup = '<div class="nb-button">' + appendTabInfo + '</div>';
                     generateTabData.remove();
                     if (i > tabsElements.length) tabsContainer.remove();
                 }


                 $(page_markup).appendTo(this.$buttons);
             }


             // Listen for button clicks 
             this.$buttons.on('click.' + NS, '.nb-button', function() {
                 _this.getSlide($(this).index());
             });

             // Set the initially selected button
             this.$buttons.find('.nb-button').eq(this._activeSL_IND).addClass('nb-selected-button');

             // Select the corresponding button when the slide changes
             this.on('getSlide.' + NS, function(event) {
                 _this.$buttons.find('.nb-selected-button').removeClass('nb-selected-button');
                 _this.$buttons.find('.nb-button').eq(event.index).addClass('nb-selected-button');
             });

             // Indicate _this the slider has buttons 
             this.__slider.addClass('nb-has-buttons');
         },

         // Re-create the buttons. This is calles when the number of slides changes.
         _adjustButtons: function() {
             this.$buttons.empty();

             // Create the buttons
             for (var i = 0; i < this.getTotalSlides(); i++) {
                 $('<div class="nb-button"></div>').appendTo(this.$buttons);
             }

             // Change the selected the buttons
             this.$buttons.find('.nb-selected-button').removeClass('nb-selected-button');
             this.$buttons.find('.nb-button').eq(this._activeSL_IND).addClass('nb-selected-button');
         },

         // Remove the buttons
         _removeButtons: function() {
             this.$buttons.off('click.' + NS, '.nb-button');
             this.off('getSlide.' + NS);
             this.$buttons.remove();
             this.__slider.removeClass('nb-has-buttons');
         },

         destroyButtons: function() {
             this._removeButtons();
             this.off('update.' + NS);
         },

         buttonsDefaults: {

             // Indicates whether the buttons will be created
             _ENABLE_PAGINATION: true
         }
     };

     $.nobleSlider.injectPlugin('Buttons', Buttons);

 })(window, jQuery);

 // Arrows plugin.
 // 
 // Adds arrows for navigating to the next or previous slide.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Arrows.' + $.nobleSlider._DF_NM;

     var Arrows = {

         // Reference to the arrows container
         $arrows: null,

         // Reference to the previous arrow
         $previousArrow: null,

         // Reference to the next arrow
         $nextArrow: null,

         initArrows: function() {

             if (this.st._AUTO_HIDE_ARROWS_FOR_TOUCH_DEVICES && _nb_isTouchDevice) return;

             this.on('update.' + NS, $.proxy(this._arrowsOnUpdate, this));
             this.on('getSlide.' + NS, $.proxy(this._checkArrowsVisibility, this));

         },

         _arrowsOnUpdate: function() {
             var _this = this;

             var a = function(d) {
                 var c;
                 !d ? c = parseInt(_nb_db_position + 20) : c = parseInt(_nb_db_position - 20);
                 _this._moveSlide(c, false, null, 400);

                 setTimeout(function() {
                     b(!d ? parseInt(c - 20) : parseInt(c + 20))
                 }, 400);
             }
             var b = function(a) {
                     _this._moveSlide(a, false, null, 400);
                 }
                 // Create the arrows if the 'arrows' option is set to true
             if (this.st._ENABLE_ARROWS === true && this.$arrows === null) {
                 this.$arrows = $('<div class="nb-arrows"></div>').appendTo(this.__slPort);

                 this.$previousArrow = $('<div class="_nb-arrow _nb-previous-arrow"></div>').appendTo(this.$arrows);
                 this.$nextArrow = $('<div class="_nb-arrow _nb-next-arrow"></div>').appendTo(this.$arrows);

                 this.$previousArrow.off('click').on('click.' + NS, function() {
                     if (_this._activeSL_IND === 0 && !_this.st._SLIDE_LOOP)
                         return a();

                     _this._previousSlide();
                 });

                 this.$nextArrow.off('click').on('click.' + NS, function() {
                     if (_this._activeSL_IND === _this.getTotalSlides() - 1 && !_this.st._SLIDE_LOOP)
                         return a(true);

                     _this._nextSlide();
                 });

                 this._checkArrowsVisibility();
             } else if (this.st._ENABLE_ARROWS === false && this.$arrows !== null) {
                 this._removeArrows();
             }

             if (this.st._ENABLE_ARROWS === true) {
                 if (this.st._FADE_ARROWS === true) {
                     this.$arrows.addClass('nb-fade-arrows');
                 } else if (this.st._FADE_ARROWS === false) {
                     this.$arrows.removeClass('nb-fade-arrows');
                 }
             }
         },

         // Show or hide the arrows depending on the position of the selected slide
         _checkArrowsVisibility: function() {
             if (this.st._ENABLE_ARROWS === false || this.st._SLIDE_LOOP === true) {
                 return;
             }

             this.st._SLIDE_END_HIDE_ARROWS ? (this._activeSL_IND === 0 ? this.$previousArrow.addClass('__invisible') : this.$previousArrow.removeClass('__invisible')) : (this._activeSL_IND === 0 ? this.$previousArrow.addClass('__disabled') : this.$previousArrow.removeClass('__disabled')),
                 this.st._SLIDE_END_HIDE_ARROWS ? (this._activeSL_IND === this.getTotalSlides() - 1 ? this.$nextArrow.addClass('__invisible') : this.$nextArrow.removeClass('__invisible')) : (this._activeSL_IND === this.getTotalSlides() - 1 ? this.$nextArrow.addClass('__disabled') : this.$nextArrow.removeClass('__disabled'));

         },

         _removeArrows: function() {
             if (this.$arrows !== null) {
                 this.$previousArrow.off('click.' + NS);
                 this.$nextArrow.off('click.' + NS);
                 this.$arrows.remove();
                 this.$arrows = null;
             }
         },

         destroyArrows: function() {
             this._removeArrows();
             this.off('update.' + NS);
             this.off('getSlide.' + NS);
         },

         arrowsDefaults: {

             // Indicates whether the arrow buttons will be created
             _ENABLE_ARROWS: false,

             // When slide end disable arrows (false) to hide it (true)
             _SLIDE_END_HIDE_ARROWS: false,

             // Indicates whether the arrows will fade in only on hover
             _FADE_ARROWS: true
         }
     };

     $.nobleSlider.injectPlugin('Arrows', Arrows);

 })(window, jQuery);


 // Video plugin
 ;
 (function(window, $) {

     "use strict";

     var NS = 'Video.' + $.nobleSlider._DF_NM;

     var Video = {

         initVideo: function() {
             this.on('update.' + NS, $.proxy(this._videoOnUpdate, this));
             this.on('_CLBK_WHEN_SLIDE_COMPLETE.' + NS, $.proxy(this._videoWSlideComplete, this));
         },

         _videoOnUpdate: function() {
             var _this = this;

             // create play button
             this.__slider.find('.nb-video').each(function() {
                 var play_btn_markup = '<div class="nb-video-btn"><div class="nb_video_play_btn" title="Play"></div></div>';
                 //$(this).attr('muted') ? $(this).attr('muted,'true') : '';
                 if ($(this).parent().find('.nb-video-btn').length != 0 || $(this).hasClass('video-no-controls')) {
                     $(this).removeAttr('controls');
                     return
                 };
                 if (this.nodeName !== 'VIDEO')
                     $(this).prepend(play_btn_markup)
                 else
                     $(this).before(play_btn_markup)
             });

             // Find all the inline videos and initialize them
             this.__slider.find('.nb-video').not('a, [data-video-init]').each(function() {
                 var video = $(this);
                 _this._initVideo(video);
             });


             // Find all the lazy-loaded videos and preinitialize them. They will be initialized
             // only when their play button is clicked.
             this.__slider.find('a.nb-video').not('[data-video-preinit]').each(function() {
                 var video = $(this);
                 _this._preinitVideo(video);
             });
         },

         // Initialize the target video
         _initVideo: function(video) {
             var _this = this;

             video.attr('data-video-init', true)
                 .videoController();


             // When the video starts playing, pause the autoplay if it's running
             video.on('videoPlay.' + NS, function() {
                 if (_this.st._VIDEO_PLAY_ACT === 'stopAutoplay' && typeof _this.stopAutoplay !== 'undefined') {
                     _this.stopAutoplay();
                     _this.st._AUTO_PLAY_SLIDE = false;
                 }

                 // Fire the '_CLBK_VIDEO_PLAY' event
                 var eventObject = {
                     type: 'videoPlay',
                     video: video
                 };
                 _this.trigger(eventObject);
                 if ($.isFunction(_this.st._CLBK_VIDEO_PLAY)) {
                     _this.st._CLBK_VIDEO_PLAY.call(_this, eventObject);
                 }
             });

             // When the video is paused, restart the autoplay
             video.on('videoPause.' + NS, function() {
                 if (_this.st._VIDEO_PAUSE_ACT === 'startAutoplay' && typeof _this.startAutoplay !== 'undefined') {
                     _this.startAutoplay();
                     _this.st._AUTO_PLAY_SLIDE = true;
                 }

                 // Fire the '_CLBK_VIDEO_PAUSE' event
                 var eventObject = {
                     type: 'videoPause',
                     video: video
                 };
                 _this.trigger(eventObject);
                 if ($.isFunction(_this.st._CLBK_VIDEO_PAUSE)) {
                     _this.st._CLBK_VIDEO_PAUSE.call(_this, eventObject);
                 }
             });

             // When the video ends, restart the autoplay (which was paused during the playback), or
             // go to the next slide, or replay the video
             video.on('videoEnded.' + NS, function() {
                 if (_this.st._WHEN_VIDEO_END_ACTION === 'auto_play' && typeof _this.startAutoplay !== 'undefined') {
                     _this.startAutoplay();
                     _this.st._AUTO_PLAY_SLIDE = true;
                 } else if (_this.st._WHEN_VIDEO_END_ACTION === 'slide_to_next') {
                     _this._nextSlide();
                 } else if (_this.st._WHEN_VIDEO_END_ACTION === 'replay_video') {
                     video.videoController('replay');
                 }

                 // Fire the [video end] event
                 var eventObject = {
                     type: 'videoEnd',
                     video: video
                 };
                 _this.trigger(eventObject);
                 if ($.isFunction(_this.st._CLBK_VIDEO_END)) {
                     _this.st._CLBK_VIDEO_END.call(_this, eventObject);
                 }
             });
         },

         // Pre-initialize the video. This is for lazy loaded videos.
         _preinitVideo: function(video) {
             var _this = this;

             video.attr('data-video-preinit', true);

             var _NB_startVideo = function() {
                 var href = video.attr('href'),
                     iframe,
                     provider,
                     regExp,
                     match,
                     id,
                     src,
                     videoAttributes,
                     videoWidth = video.children('img').attr('width'),
                     videoHeight = video.children('img').attr('height');

                 // Check if it's a youtube or vimeo video
                 if (href.indexOf('youtube') !== -1 || href.indexOf('youtu.be') !== -1) {
                     provider = 'youtube';
                 } else if (href.indexOf('vimeo') !== -1) {
                     provider = 'vimeo';
                 }

                 // Get the id of the video
                 regExp = provider === 'youtube' ? /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ : /http:\/\/(www\.)?vimeo.com\/(\d+)/;
                 match = href.match(regExp);
                 id = match[2];

                 // Get the source of the iframe _this will be created
                 src = provider === 'youtube' ? 'http://www.youtube.com/embed/' + id + '?modestbranding=1&autohide=0&autoplay=1&showinfo=0&enablejsapi=1&wmode=opaque' : 'http://player.vimeo.com/video/' + id + '?api=1&autoplay=1';

                 // Get the attributes passed to the video link and then pass them to the iframe's src
                 videoAttributes = href.split('?')[1];

                 if (typeof videoAttributes !== 'undefined') {
                     videoAttributes = videoAttributes.split('&');

                     $.each(videoAttributes, function(index, value) {
                         if (value.indexOf(id) === -1) {
                             src += '&' + value;
                         }
                     });
                 }

                 // Create the iframe
                 iframe = $('<iframe></iframe>')
                     .attr({
                         'src': src,
                         'width': videoWidth,
                         'height': videoHeight,
                         'class': video.attr('class'),
                         'frameborder': 0
                     }).insertBefore(video);

                 // Initialize the video and play it
                 _this._initVideo(iframe);
                 iframe.videoController('play');

                 // Hide the video poster
                 video.css('display', 'none');
                 var _add_ovr = function(x) {
                     x ? video.parent().find('iframe').before('<div class="video_close_ovr"></div>') : video.parent().find('.video_close_ovr').remove()
                 }
                 var _restore_video = function(c) {
                     $(c).remove();
                     video.show();
                     video.parent().find('iframe').remove();
                     _add_ovr();
                     video.parents().find('.nb-video-btn').removeClass('__fadeOut').addClass('__fadeIn');
                 }

                 video.before('<div class="nb_video_x_close"></div>');
                 video.parents().find('.nb_video_x_close').bind('click touchstart', function(e) {
			 e.preventDefault();e.stopImmediatePropagation();
                         _restore_video(this)
                     })
                     .hover(function() {
                         _add_ovr(true)
                     }, function() {
                         _add_ovr()
                     });

             }

             // When the video poster is clicked, remove the poster and create
             // the inline video
             video.on('click.' + NS, function(event) {
                 event.preventDefault()
             });
             video.find('.nb-video-btn').on('click.' + NS, function(event) {

                 // If the video is being dragged, don't start the video
                 if (_this.__slider.hasClass('nb-swiping')) {
                     return;
                 }

                 event.preventDefault();
                 this.classList.add('__fadeOut');
                 setTimeout(_NB_startVideo, 190);


             });


         },

         // Called when a new slide is selected
         _videoWSlideComplete: function(event) {

             // Get the video from the previous slide
             var previousVideo = this.__a_slides.find('.nb-slide').eq(event.previousIndex).find('.nb-video[data-video-init]');

             // Handle the video from the previous slide by stopping it, or pausing it,
             // or remove it, depending on the value of the '_LEAVE_ACTIVE_SLIDE_VIDEO_ACTION' option.
             if (event.previousIndex !== -1 && previousVideo.length !== 0) {
                 if (this.st._LEAVE_ACTIVE_SLIDE_VIDEO_ACTION === 'stop_video') {
                     previousVideo.videoController('stop');
                 } else if (this.st._LEAVE_ACTIVE_SLIDE_VIDEO_ACTION === 'pause_video') {
                     previousVideo.videoController('pause');
                 } else if (this.st._LEAVE_ACTIVE_SLIDE_VIDEO_ACTION === 'remove_video') {
                     // If the video was lazy-loaded, remove it and show the poster again. If the video
                     // was not lazy-loaded, but inline, stop the video.
                     if (previousVideo.siblings('a.nb-video').length !== 0) {
                         $('.nb_video_x_close').trigger('click');
                         previousVideo.siblings('a.nb-video').css('display', '');
                         previousVideo.videoController('destroy');
                         previousVideo.remove();
                     } else {
                         previousVideo.videoController('stop');
                     }
                 }
             }

             // Handle the video from the selected slide
             if (this.st._ACTIVE_SLIDE_VIDEO_ACTION === 'play_video') {
                 var loadedVideo = this.__a_slides.find('.nb-slide').eq(event.index).find('.nb-video[data-video-init]'),
                     unloadedVideo = this.__a_slides.find('.nb-slide').eq(event.index).find('.nb-video[data-video-preinit]');

                 // If the video was already initialized, play it. If it's not initialized (because
                 // it's lazy loaded) initialize it and play it.
                 if (loadedVideo.length !== 0) {
                     loadedVideo.videoController('play');
                 } else if (unloadedVideo.length !== 0) {
                     unloadedVideo.trigger('click.' + NS);
                 }
             }
         },

         // Destroy plugin
         _destroy_Video: function() {
             this.__slider.find('.nb-video[ data-video-preinit ]').each(function() {
                 var video = $(this);
                 video.removeAttr('data-video-preinit');
                 video.off('click.' + NS);
             });

             // _SLIDE_LOOP through the all the videos and destroy them
             this.__slider.find('.nb-video[ data-video-init ]').each(function() {
                 var video = $(this);
                 video.removeAttr('data-video-init');
                 video.off('Video');
                 video.videoController('destroy');
             });

             this.off('update.' + NS);
             this.off('_CLBK_WHEN_SLIDE_COMPLETE.' + NS);
         },

         videoDefaults: {

             // Sets the action to the video will perform when its slide container is selected
             // ( 'play_video' or 'default' )
             _ACTIVE_SLIDE_VIDEO_ACTION: 'default',

             // Sets the action to the video will perform when another slide is selected
             // ( 'stop_video', 'pause_video', 'remove_video' and 'default' )
             _LEAVE_ACTIVE_SLIDE_VIDEO_ACTION: 'pause_video',

             // Sets the action to the slider will perform when the video starts playing
             // ( 'stopAutoplay' and 'default' )
             _VIDEO_PLAY_ACT: 'stopAutoplay',

             // Sets the action to the slider will perform when the video is paused
             // ( 'startAutoplay' or 'default' )
             _VIDEO_PAUSE_ACT: 'default',

             // Sets the action to the slider will perform when the video ends
             // ( 'auto_play', 'slide_to_next', 'replay_video' and 'default' )
             _WHEN_VIDEO_END_ACTION: 'default',

             // Called when the video starts playing
             _CLBK_VIDEO_PLAY: function() {},

             // Called when the video is paused
             _CLBK_VIDEO_PAUSE: function() {},

             // Called when the video ends
             _CLBK_VIDEO_END: function() {}
         }
     };

     $.nobleSlider.injectPlugin('Video', Video);

 })(window, jQuery);

 // Video Controller jQuery plugin
 // Creates a universal controller for multiple video types and providers
 ;
 (function($) {

     "use strict";

     // Check if an iOS device is used.
     // This information is important because a video can not be
     // controlled programmatically unless the user has started the video manually.
     var isIOS = window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

     var VideoController = function(pattern, opts) {
         this._video = $(pattern); //this.$video = $(pattern);
         this.opts = opts;
         this.st = {};
         this.player = null;

         this._init();
     };

     VideoController.prototype = {

         _init: function() {
             this.st = $.extend({}, this.defaults, this.opts);

             var _this = this,
                 players = $.VideoController.players,
                 videoID = this._video.attr('id');

             // _SLIDE_LOOP through the available video players
             // and check if the targeted video element is supported by one of the players.
             // If a compatible type is found, store the video type.
             for (var name in players) {
                 if (typeof players[name] !== 'undefined' && players[name].isType(this._video)) {
                     this.player = new players[name](this._video);
                     break;
                 }
             }

             // Return if the player could not be instantiated
             if (this.player === null) {
                 return;
             }

             // Add event listeners
             var events = ['ready', 'start', 'play', 'pause', 'ended'];

             $.each(events, function(index, element) {
                 var event = 'video' + element.charAt(0).toUpperCase() + element.slice(1);

                 _this.player.on(element, function() {
                     _this.trigger({
                         type: event,
                         video: videoID
                     });
                     if ($.isFunction(_this.st[event])) {
                         _this.st[event].call(_this, {
                             type: event,
                             video: videoID
                         });
                     }
                 });
             });
         },

         play: function() {
             if (isIOS === true && this.player.isStarted() === false || this.player.getState() === 'playing') {
                 return;
             }

             this.player.play();
         },

         stop: function() {
             if (isIOS === true && this.player.isStarted() === false || this.player.getState() === 'stopped') {
                 return;
             }

             this.player.stop();
         },

         pause: function() {
             if (isIOS === true && this.player.isStarted() === false || this.player.getState() === 'paused') {
                 return;
             }

             this.player.pause();
         },

         replay: function() {
             if (isIOS === true && this.player.isStarted() === false) {
                 return;
             }

             this.player.replay();
         },

         on: function(type, callback) {
             return this._video.on(type, callback);
         },

         off: function(type) {
             return this._video.off(type);
         },

         trigger: function(data) {
             return this._video.triggerHandler(data);
         },

         destroy: function() {
             if (this.player.isStarted() === true) {
                 this.stop();
             }

             this.player.off('ready');
             this.player.off('start');
             this.player.off('play');
             this.player.off('pause');
             this.player.off('ended');

             this._video.removeData('videoController');
         },

         defaults: {
             _CLBK_VIDEO_READY: function() {},
             _CLBK_VIDEO_START: function() {},
             _CLBK_VIDEO_PLAY: function() {},
             _CLBK_VIDEO_PAUSE: function() {},
             _CLBK_VIDEO_END: function() {}
         }

     };

     $.VideoController = {
         players: {},

         addPlayer: function(name, player) {
             this.players[name] = player;
         }
     };

     $.fn.videoController = function(options) {
         var args = Array.prototype.slice.call(arguments, 1);

         return this.each(function() {
             // Instantiate the video controller or call a function on the current instance
             if (typeof $(this).data('videoController') === 'undefined') {
                 var newInstance = new VideoController(this, options);

                 // Store a reference to the instance created
                 $(this).data('videoController', newInstance);
             } else if (typeof options !== 'undefined') {
                 var currentInstance = $(this).data('videoController');

                 // Check the type of argument passed
                 if (typeof currentInstance[options] === 'function') {
                     currentInstance[options].apply(currentInstance, args);
                 } else {
                     $.error(options + ' does not exist in videoController.');
                 }
             }
         });
     };

     // Base object for the video players
     var Video = function(video) {
         this._video = video;
         this.player = null;
         this.ready = false;
         this.started = false;
         this.state = '';
         this.events = $({});

         this._init();
     };

     Video.prototype = {
         _init: function() {},

         play: function() {},

         pause: function() {},

         stop: function() {},

         replay: function() {},

         isType: function() {},

         isReady: function() {
             return this.ready;
         },

         isStarted: function() {
             return this.started;
         },

         getState: function() {
             return this.state;
         },

         on: function(type, callback) {
             return this.events.on(type, callback);
         },

         off: function(type) {
             return this.events.off(type);
         },

         trigger: function(data) {
             return this.events.triggerHandler(data);
         }
     };

     // YouTube video
     var _YOUTUBE_VIDHelper = {
         youtubeAPIAdded: false,
         _YOUTUBE_VIDs: []
     };

     var _YOUTUBE_VID = function(video) {
         this.init = false;
         var youtubeAPILoaded = window.YT && window.YT.Player;

         if (typeof youtubeAPILoaded !== 'undefined') {
             Video.call(this, video);
         } else {
             _YOUTUBE_VIDHelper._YOUTUBE_VIDs.push({
                 'video': video,
                 'scope': this
             });

             if (_YOUTUBE_VIDHelper.youtubeAPIAdded === false) {
                 _YOUTUBE_VIDHelper.youtubeAPIAdded = true;

                 var tag = document.createElement('script');
                 tag.src = "http://www.youtube.com/player_api";
                 var firstScriptTag = document.getElementsByTagName('script')[0];
                 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                 window.onYouTubePlayerAPIReady = function() {
                     $.each(_YOUTUBE_VIDHelper._YOUTUBE_VIDs, function(index, element) {
                         Video.call(element.scope, element.video);
                     });
                 };
             }
         }
     };

     _YOUTUBE_VID.prototype = new Video();
     _YOUTUBE_VID.prototype.constructor = _YOUTUBE_VID;
     $.VideoController.addPlayer('_YOUTUBE_VID', _YOUTUBE_VID);

     _YOUTUBE_VID.isType = function(video) {
         if (video.is('iframe')) {
             var src = video.attr('src');

             if (src.indexOf('youtube.com') !== -1 || src.indexOf('youtu.be') !== -1) {
                 return true;
             }
         }

         return false;
     };

     _YOUTUBE_VID.prototype._init = function() {
         this.init = true;
         this._setup();
     };

     _YOUTUBE_VID.prototype._setup = function() {
         var _this = this;

         // Get a reference to the player
         this.player = new YT.Player(this._video[0], {
             events: {
                 'onReady': function() {
                     _this.trigger({
                         type: 'ready'
                     });
                     _this.ready = true;
                 },

                 'onStateChange': function(event) {
                     switch (event.data) {
                         case YT.PlayerState.PLAYING:
                             if (_this.started === false) {
                                 _this.started = true;
                                 _this.trigger({
                                     type: 'start'
                                 });
                             }

                             _this.state = 'playing';
                             _this.trigger({
                                 type: 'play'
                             });
                             break;

                         case YT.PlayerState.PAUSED:
                             _this.state = 'paused';
                             _this.trigger({
                                 type: 'pause'
                             });
                             break;

                         case YT.PlayerState.ENDED:
                             _this.state = 'ended';
                             _this.trigger({
                                 type: 'ended'
                             });
                             break;
                     }
                 }
             }
         });
     };

     _YOUTUBE_VID.prototype.play = function() {
         var _this = this;

         if (this.ready === true) {
             this.player.playVideo();
         } else {
             var timer = setInterval(function() {
                 if (_this.ready === true) {
                     clearInterval(timer);
                     _this.player.playVideo();
                 }
             }, 100);
         }
     };

     _YOUTUBE_VID.prototype.pause = function() {
         // On iOS, simply pausing the video can make other videos unresponsive
         // so we stop the video instead.
         if (isIOS === true) {
             this.stop();
         } else {
             this.player.pauseVideo();
         }
     };

     _YOUTUBE_VID.prototype.stop = function() {
         this.player.seekTo(1);
         this.player.stopVideo();
         this.state = 'stopped';
     };

     _YOUTUBE_VID.prototype.replay = function() {
         this.player.seekTo(1);
         this.player.playVideo();
     };

     _YOUTUBE_VID.prototype.on = function(type, callback) {
         var _this = this;

         if (this.init === true) {
             Video.prototype.on.call(this, type, callback);
         } else {
             var timer = setInterval(function() {
                 if (_this.init === true) {
                     clearInterval(timer);
                     Video.prototype.on.call(_this, type, callback);
                 }
             }, 100);
         }
     };

     // Vimeo video
     var VimeoVideoHelper = {
         vimeoAPIAdded: false,
         vimeoVideos: []
     };

     var VimeoVideo = function(video) {
         this.init = false;

         if (typeof window.Froogaloop !== 'undefined') {
             Video.call(this, video);
         } else {
             VimeoVideoHelper.vimeoVideos.push({
                 'video': video,
                 'scope': this
             });

             if (VimeoVideoHelper.vimeoAPIAdded === false) {
                 VimeoVideoHelper.vimeoAPIAdded = true;

                 var tag = document.createElement('script');
                 tag.src = "http://a.vimeocdn.com/js/froogaloop2.min.js";
                 var firstScriptTag = document.getElementsByTagName('script')[0];
                 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                 var checkVimeoAPITimer = setInterval(function() {
                     if (typeof window.Froogaloop !== 'undefined') {
                         clearInterval(checkVimeoAPITimer);

                         $.each(VimeoVideoHelper.vimeoVideos, function(index, element) {
                             Video.call(element.scope, element.video);
                         });
                     }
                 }, 100);
             }
         }
     };

     VimeoVideo.prototype = new Video();
     VimeoVideo.prototype.constructor = VimeoVideo;
     $.VideoController.addPlayer('VimeoVideo', VimeoVideo);

     VimeoVideo.isType = function(video) {
         if (video.is('iframe')) {
             var src = video.attr('src');

             if (src.indexOf('vimeo.com') !== -1) {
                 return true;
             }
         }

         return false;
     };

     VimeoVideo.prototype._init = function() {
         this.init = true;
         this._setup();
     };

     VimeoVideo.prototype._setup = function() {
         var _this = this;

         // Get a reference to the player
         _this.player = $f(this._video[0]);

         _this.player.addEvent('ready', function() {
             _this.ready = true;
             _this.trigger({
                 type: 'ready'
             });

             _this.player.addEvent('play', function() {
                 if (_this.started === false) {
                     _this.started = true;
                     _this.trigger({
                         type: 'start'
                     });
                 }

                 _this.state = 'playing';
                 _this.trigger({
                     type: 'play'
                 });
             });

             _this.player.addEvent('pause', function() {
                 _this.state = 'paused';
                 _this.trigger({
                     type: 'pause'
                 });
             });

             _this.player.addEvent('finish', function() {
                 _this.state = 'ended';
                 _this.trigger({
                     type: 'ended'
                 });
             });
         });
     };

     VimeoVideo.prototype.play = function() {
         var _this = this;

         if (_this.ready === true) {
             this.player.api('play');
         } else {
             var timer = setInterval(function() {
                 if (_this.ready === true) {
                     clearInterval(timer);
                     _this.player.api('play');
                 }
             }, 100);
         }
     };

     VimeoVideo.prototype.pause = function() {
         this.player.api('pause');
     };

     VimeoVideo.prototype.stop = function() {
         this.player.api('seekTo', 0);
         this.player.api('pause');
         this.state = 'stopped';
     };

     VimeoVideo.prototype.replay = function() {
         this.player.api('seekTo', 0);
         this.player.api('play');
     };

     VimeoVideo.prototype.on = function(type, callback) {
         var _this = this;

         if (this.init === true) {
             Video.prototype.on.call(this, type, callback);
         } else {
             var timer = setInterval(function() {
                 if (_this.init === true) {
                     clearInterval(timer);
                     Video.prototype.on.call(_this, type, callback);
                 }
             }, 100);
         }
     };

     // HTML5 video
     var HTML5Video = function(video) {
         Video.call(this, video);
     };

     HTML5Video.prototype = new Video();
     HTML5Video.prototype.constructor = HTML5Video;
     $.VideoController.addPlayer('HTML5Video', HTML5Video);

     HTML5Video.isType = function(video) {
         if (video.is('video') && video.hasClass('video-js') === false && video.hasClass('sublime') === false) {
             return true;
         }

         return false;
     };

     HTML5Video.prototype._init = function() {
         var _this = this;

         // Get a reference to the player
         this.player = this._video[0];
         this.ready = true;

         $(this.player).prev().on('click', function(e) {
             e.preventDefault();
             var vid = $(this).next();
             vid.attr('controls', 'true').get(0).play();
             $(this).addClass('__fadeOut');
         });

         this.player.addEventListener('play', function() {
             if (_this.started === false) {
                 _this.started = true;
                 _this.trigger({
                     type: 'start'
                 });
             }

             _this.state = 'playing';
             _this.trigger({
                 type: 'play'
             });
         });

         this.player.addEventListener('pause', function() {
             _this.state = 'paused';
             _this.trigger({
                 type: 'pause'
             });
         });

         this.player.addEventListener('ended', function() {
             _this.state = 'ended';
             _this.trigger({
                 type: 'ended'
             });
         });
     };

     HTML5Video.prototype.play = function() {
         this.player.play();
     };

     HTML5Video.prototype.pause = function() {
         this.player.pause();
     };

     HTML5Video.prototype.stop = function() {
         this.player.currentTime = 0;
         this.player.pause();
         this.state = 'stopped';
     };

     HTML5Video.prototype.replay = function() {
         this.player.currentTime = 0;
         this.player.play();
     };


 })(jQuery);



 // Thumbnail Touch Swipe plugin.
 // 
 // Adds touch-swipe functionality for thumbnails.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'ThumbnailTouchSwipe.' + $.nobleSlider._DF_NM;
     var distance, intermediateTime, startTime;

     var ThumbnailTouchSwipe = {

         // The x and y coordinates of the pointer/finger's starting position
         thumbnailTouchStartPoint: {
             x: 0,
             y: 0
         },

         // The x and y coordinates of the pointer/finger's end position
         thumbnailTouchEndPoint: {
             x: 0,
             y: 0
         },

         // The distance from the starting to the end position on the x and y axis
         thumbnailTouchDistance: {
             x: 0,
             y: 0
         },

         // The position of the thumbnail scroller when the touch swipe starts
         thumbnailTouchStartPosition: 0,

         // Indicates if the thumbnail scroller is being swiped
         isThumbnailTouchMoving: false,

         // Indicates if the touch swipe was initialized
         isThumbnailTouchSwipe: false,

         // Stores the names of the events
         thumbnailTouchSwipeEvents: {
             startEvent: '',
             moveEvent: '',
             endEvent: ''
         },

         initThumbnailTouchSwipe: function() {
             this.on('update.' + NS, $.proxy(this._thumbnailTouchSwipeOnUpdate, this));
         },

         _thumbnailTouchSwipeOnUpdate: function() {

             // Return if there are no thumbnails
             if (this.isThumbnailScroller === false) {
                 return;
             }

             // Initialize the touch swipe functionality if it wasn't initialized yet
             if (this.st._ENABLE_TOUCH_FOR_THUMBS === true && this.isThumbnailTouchSwipe === false) {
                 this.isThumbnailTouchSwipe = true;

                 this.thumbnailTouchSwipeEvents.startEvent = 'touchstart' + '.' + NS + ' mousedown' + '.' + NS;
                 this.thumbnailTouchSwipeEvents.moveEvent = 'touchmove' + '.' + NS + ' mousemove' + '.' + NS;
                 this.thumbnailTouchSwipeEvents.endEvent = 'touchend' + '.' + this._original_ID + '.' + NS + ' mouseup' + '.' + this._original_ID + '.' + NS;

                 // Listen for touch swipe/mouse move events
                 this.$thumbnails.on(this.thumbnailTouchSwipeEvents.startEvent, $.proxy(this._onThumbnailTouchStart, this));
                 this.$thumbnails.on('dragstart.' + NS, function(event) {
                     event.preventDefault();
                 });

                 // Add the grabbing icon
                 this.$thumbnails.addClass('nb-grab');
             }

             // Remove the default thumbnailClick
             $.each(this.thumbnails, function(index, thumbnail) {
                 thumbnail.off('thumbnailClick');
             });
         },

         // Called when the thumbnail scroller starts being dragged
         _onThumbnailTouchStart: function(event) {
             startTime = new Date().getTime();
             // global variable
             distance = 0;

             // Disable dragging if the element is set to allow selections
             if ($(event.target).closest('.nb-draggsl').length >= 1) {
                 return;
             }

             var _this = this,
                 eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

             // Prevent default behavior for mouse events
             if (typeof event.originalEvent.touches === 'undefined') {
                 event.preventDefault();
             }

             // Disable click events on links
             $(event.target).parents('.nb-thumbnail-container').find('a').one('click.' + NS, function(event) {
                 event.preventDefault();
             });

             // Get the initial position of the mouse pointer and the initial position
             // of the thumbnail scroller
             this.thumbnailTouchStartPoint.x = eventObject.pageX || eventObject.clientX;
             this.thumbnailTouchStartPoint.y = eventObject.pageY || eventObject.clientY;
             this.thumbnailTouchStartPosition = this.thumbnailsPosition;

             // Clear the previous distance values
             this.thumbnailTouchDistance.x = this.thumbnailTouchDistance.y = 0;

             // If the thumbnail scroller is being grabbed while it's still animating, stop the
             // current movement
             if (this.$thumbnails.hasClass('nb-animated')) {
                 this.isThumbnailTouchMoving = true;
                 this._stopThumbsMovement();
                 this.thumbnailTouchStartPosition = this.thumbnailsPosition;
             }

             // Listen for move and end events//this.$thumbnails
             $(document).on(this.thumbnailTouchSwipeEvents.moveEvent, $.proxy(this._onThumbnailTouchMove, this));
             $(document).on(this.thumbnailTouchSwipeEvents.endEvent, $.proxy(this._onThumbnailTouchEnd, this));

             // Swap grabbing icons
             this.$thumbnails.removeClass('nb-grab').addClass('nb-grabbing');

             // Add 'nb-swiping' class to indicate _this the thumbnail scroller is being swiped
             this.$thumbnailsContainer.addClass('nb-swiping');
         },

         // Called during the thumbnail scroller's dragging
         _onThumbnailTouchMove: function(event) {
             var eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;
             intermediateTime = new Date().getTime();

             // Indicate _this the move event is being fired
             this.isThumbnailTouchMoving = true;

             // Get the current position of the mouse pointer
             this.thumbnailTouchEndPoint.x = eventObject.pageX || eventObject.clientX;
             this.thumbnailTouchEndPoint.y = eventObject.pageY || eventObject.clientY;

             // Calculate the distance of the movement on both axis
             this.thumbnailTouchDistance.x = this.thumbnailTouchEndPoint.x - this.thumbnailTouchStartPoint.x;
             this.thumbnailTouchDistance.y = this.thumbnailTouchEndPoint.y - this.thumbnailTouchStartPoint.y;
             getMouseCoord(this.thumbnailTouchEndPoint.x, this.thumbnailTouchEndPoint.y, this.thumbnailsOrientation);
             updateMouseCoord(this.thumbnailTouchEndPoint.x, this.thumbnailTouchEndPoint.y);


             // Calculate the distance of the swipe _this takes place in the same direction as the orientation of the thumbnails
             // and calculate the distance from the opposite direction.
             // 
             // For a swipe to be valid there should more distance in the same direction as the orientation of the thumbnails.
             distance = this.thumbnailsOrientation === 'horizontal' ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y;
             var oppositeDistance = this.thumbnailsOrientation === 'horizontal' ? this.thumbnailTouchDistance.y : this.thumbnailTouchDistance.x;

             // If the movement is in the same direction as the orientation of the thumbnails, the swipe is valid
             if (Math.abs(distance) > Math.abs(oppositeDistance)) {
                 event.preventDefault();
             } else {
                 return;
             }

             // Make the thumbnail scroller move slower if it's dragged outside its bounds
             if (this.thumbnailsPosition >= 0) {
                 var infOffset = -this.thumbnailTouchStartPosition;
                 distance = infOffset + (distance - infOffset) * 0.2;
             } else if (this.thumbnailsPosition <= -this.thumbnailsSize + this.thumbnailsContainerSize) {
                 var supOffset = this.thumbnailsSize - this.thumbnailsContainerSize + this.thumbnailTouchStartPosition;
                 distance = -supOffset + (distance + supOffset) * 0.2;
             }

             this._moveThumbs(this.thumbnailTouchStartPosition + distance, true);
         },

         // Called when the thumbnail scroller is released
         _onThumbnailTouchEnd: function(event) {
             var _this = this,
                 thumbnailTouchDistance = this.thumbnailsOrientation === 'horizontal' ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y;

             var endTime = new Date().getTime();

             var vel = (endTime - intermediateTime);

             // Remove the move and end listeners
             $(document).off(this.thumbnailTouchSwipeEvents.moveEvent);
             $(document).off(this.thumbnailTouchSwipeEvents.endEvent);

             // Swap grabbing icons
             this.$thumbnails.removeClass('nb-grabbing').addClass('nb-grab');

             // Check if there is intention for a tap/click
             if (this.isThumbnailTouchMoving === false ||
                 this.isThumbnailTouchMoving === true &&
                 Math.abs(this.thumbnailTouchDistance.x) < 10 &&
                 Math.abs(this.thumbnailTouchDistance.y) < 10
             ) {
                 var targetThumbnail = $(event.target).hasClass('nb-thumbnail-container') ? $(event.target) : $(event.target).parents('.nb-thumbnail-container'),
                     index = targetThumbnail.index();


                 // If a link is cliked, navigate to this link, else navigate to the slide this corresponds to the thumbnail
                 if ($(event.target).parents('a').length !== 0) {
                     $(event.target).parents('a').off('click.' + NS);
                     this.$thumbnailsContainer.removeClass('nb-swiping');
                 } else if (index !== this.selectedThumbnailIndex && index !== -1) {
                     event.preventDefault();
                     this.getSlide(index);
                 }

                 return;
             }


             this.isThumbnailTouchMoving = false;
             var dSpeed = Math.abs(((_nb__crP === '|-' || _nb__crP === '-|' ? $('.nb-thumbnails.nb-grab').width() : $('.nb-thumbnails.nb-grab').height()) + this.st._TOUCH_SWIPE_TRESHOLD)) / (Math.abs(distance) / (endTime - startTime));

             var swSpeed = 100 > dSpeed ? 100 : dSpeed < 600 ? dSpeed : 600;

             $(event.target).parents('.nb-thumbnail').one('click', function(event) {
                 event.preventDefault();
             });

             // Remove the 'nb-swiping' class but with a delay
             // because there might be other event listeners _this check
             // the existence of this class, and this class should still be 
             // applied for those listeners, since there was a swipe event
             setTimeout(function() {
                 _this.$thumbnailsContainer.removeClass('nb-swiping');

             }, 1);

             if (vel <= 50) {

                 var _x_to;

                 switch (_nb__crP) {

                     // horizontal slide
                     case "|-":
                         _x_to = _this.thumbnailTouchStartPosition + distance + Math.abs(this.thumbnailTouchDistance.x);
                         break;
                     case "-|":
                         _x_to = _this.thumbnailTouchStartPosition + distance - Math.abs(this.thumbnailTouchDistance.x);
                         break;

                         // vertical slide
                     case "|":
                         _x_to = _this.thumbnailTouchStartPosition + distance - Math.abs(this.thumbnailTouchDistance.y);
                         break;
                     case "_|_":
                         _x_to = _this.thumbnailTouchStartPosition + distance + Math.abs(this.thumbnailTouchDistance.y);
                         break;

                 }

                 _this._moveThumbs(_x_to, null, null, null, swSpeed);
             }

             // Keep the thumbnail scroller inside the bounds
             if (this.thumbnailsPosition > 0) {
                 this._moveThumbs(0);
             } else if (this.thumbnailsPosition < this.thumbnailsContainerSize - this.thumbnailsSize) {
                 this._moveThumbs(this.thumbnailsContainerSize - this.thumbnailsSize);
             }


             // Fire the '_CLBK_THUMB_MOVE_COMPLETE' event
             this.trigger({
                 type: '_CLBK_THUMB_MOVE_COMPLETE'
             });
             if ($.isFunction(this.st._CLBK_THUMB_MOVE_COMPLETE)) {
                 this.st._CLBK_THUMB_MOVE_COMPLETE.call(this, {
                     type: '_CLBK_THUMB_MOVE_COMPLETE'
                 });
             }
         },

         // Destroy the plugin
         destroyThumbnailTouchSwipe: function() {
             this.off('update.' + NS);

             if (this.isThumbnailScroller === false) {
                 return;
             }

             this.$thumbnails.off(this.thumbnailTouchSwipeEvents.startEvent);
             this.$thumbnails.off(this.thumbnailTouchSwipeEvents.moveEvent);
             this.$thumbnails.off('dragstart.' + NS);
             $(document).off(this.thumbnailTouchSwipeEvents.endEvent);
             this.$thumbnails.removeClass('nb-grab');
         },

         thumbnailTouchSwipeDefaults: {

             // Indicates whether the touch swipe will be enabled for thumbnails
             _ENABLE_TOUCH_FOR_THUMBS: true
         }
     };

     $.nobleSlider.injectPlugin('ThumbnailTouchSwipe', ThumbnailTouchSwipe);

 })(window, jQuery);

 // Thumbnail Arrows plugin.
 // 
 // Adds thumbnail arrows for moving the thumbnail scroller.
 ;
 (function(window, $) {

     "use strict";

     var NS = 'ThumbnailArrows.' + $.nobleSlider._DF_NM;

     var ThumbnailArrows = {

         // Reference to the arrows container
         $thumbnailArrows: null,

         // Reference to the 'previous' thumbnail arrow
         $previousThumbnailArrow: null,

         // Reference to the 'next' thumbnail arrow
         $nextThumbnailArrow: null,

         initThumbnailArrows: function() {
             var _this = this;

             if (this.st._AUTO_HIDE_ARROWS_FOR_TOUCH_DEVICES && _nb_isTouchDevice) return;

             this.on('update.' + NS, $.proxy(this._thumbArrowsOnUpdate, this));

             // Check if the arrows need to be visible or invisible when the thumbnail scroller
             // resizes and when the thumbnail scroller moves.
             this.on('_RESIZE_SLIDER.' + NS + ' ' + '_CLBK_THUMB_MOVE_COMPLETE.' + NS, function() {
                 if (_this.isThumbnailScroller === true && _this.st._THUMB_ENABLE_ARROWS === true) {
                     _this._checkThumbArrowsVisibility();
                 }
             });
         },

         // Called when the slider is updated
         _thumbArrowsOnUpdate: function() {
             var _this = this;

             if (this.isThumbnailScroller === false) {
                 return;
             }

             // Create or remove the thumbnail scroller arrows
             if (this.st._THUMB_ENABLE_ARROWS === true && this.$thumbnailArrows === null) {

                 this.$thumbnailArrows = $('<div class="nb-thumbnail-arrows"></div>').appendTo(this.st._THUMB_ARROWS_ASSIGN_TO ? this.st._THUMB_ARROWS_ASSIGN_TO : this.$thumbnailsContainer);

                 this.$previousThumbnailArrow = $('<div class="nb-thumbnail-arrow nb-previous-thumbnail-arrow"></div>').appendTo(this.$thumbnailArrows);
                 this.$nextThumbnailArrow = $('<div class="nb-thumbnail-arrow nb-next-thumbnail-arrow"></div>').appendTo(this.$thumbnailArrows);

                 this.$previousThumbnailArrow.on('click.' + NS, function() {
                     if (_nb_easingOnMultipleClick != 'ease-out') _nb_easingOnMultipleClick = false;
                     var previousPosition = Math.min(0, _this.thumbnailsPosition + _this.thumbnailsContainerSize);
                     _this._moveThumbs(previousPosition, null, null, true, null, _nb_easingOnMultipleClick);
                     _nb_easingOnMultipleClick = 'ease-out';
                 });

                 this.$nextThumbnailArrow.on('click.' + NS, function() {
                     if (_nb_easingOnMultipleClick != 'ease-out') _nb_easingOnMultipleClick = false;
                     var nextPosition = Math.max(_this.thumbnailsContainerSize - _this.thumbnailsSize, _this.thumbnailsPosition - _this.thumbnailsContainerSize);
                     _this._moveThumbs(nextPosition, null, null, true, null, _nb_easingOnMultipleClick);
                     _nb_easingOnMultipleClick = 'ease-out';
                 });

             } else if (this.st._THUMB_ENABLE_ARROWS === false && this.$thumbnailArrows !== null) {
                 this._removeThumbArrows();
             }

             // Add fading functionality and check if the arrows need to be visible or not
             if (this.st._THUMB_ENABLE_ARROWS === true) {
                 if (this.st._THUMB_ARROWS_FADE === true) {
                     this.$thumbnailArrows.addClass('nb-fade-thumbnail-arrows');
                 } else if (this.st._THUMB_ARROWS_FADE === false) {
                     this.$thumbnailArrows.removeClass('nb-fade-thumbnail-arrows');
                 }

                 this._checkThumbArrowsVisibility();
             }
         },

         // Checks if the 'next' or 'previous' arrows need to be visible or hidden,
         // based on the position of the thumbnail scroller
         _checkThumbArrowsVisibility: function() {

             if (this.st._HIDE_THUMB_ARROWS_WHEN_SLIDE_END) {

                 if (this.thumbnailsPosition === 0) {
                     this.$previousThumbnailArrow.css('display', 'none');
                 } else {
                     this.$previousThumbnailArrow.css('display', 'block');
                 }

                 if (this.thumbnailsPosition === this.thumbnailsContainerSize - this.thumbnailsSize) {
                     this.$nextThumbnailArrow.css('display', 'none');
                 } else {
                     this.$nextThumbnailArrow.css('display', 'block');
                 }


             } else {

                 if (this.thumbnailsPosition === 0) {
                     this.$previousThumbnailArrow.addClass('__disabled');
                 } else {
                     this.$previousThumbnailArrow.removeClass('__disabled');
                 }

                 if (this.thumbnailsPosition === this.thumbnailsContainerSize - this.thumbnailsSize) {
                     this.$nextThumbnailArrow.addClass('__disabled');
                 } else {
                     this.$nextThumbnailArrow.removeClass('__disabled');
                 }

             }
         },

         // Remove the thumbnail arrows
         _removeThumbArrows: function() {
             if (this.$thumbnailArrows !== null) {
                 this.$previousThumbnailArrow.off('click.' + NS);
                 this.$nextThumbnailArrow.off('click.' + NS);
                 this.$thumbnailArrows.remove();
                 this.$thumbnailArrows = null;
             }
         },

         // Destroy the plugin
         _destroy_ThumbArrows: function() {
             this._removeThumbArrows();
             this.off('update.' + NS);
             this.off('_RESIZE_SLIDER.' + NS);
             this.off('_CLBK_THUMB_MOVE_COMPLETE.' + NS);
         },

         thumbnailArrowsDefaults: {

             // Indicates whether the thumbnail arrows will be enabled
             _THUMB_ENABLE_ARROWS: false,

             // Indicates whether the thumbnail arrows will be faded
             _THUMB_ARROWS_FADE: true,

             // hide arrows when slide ended
             _HIDE_THUMB_ARROWS_WHEN_SLIDE_END: true
         }
     };

     $.nobleSlider.injectPlugin('ThumbnailArrows', ThumbnailArrows);

 })(window, jQuery);

 /**
  --- START PARRALAX 
 ----------------------------
 **/


 ;
 (function($, window, document, undefined, event) {

     // Strict Mode
     'use strict';

     // Constants
     var MAGIC_NUMBER = 30;
     var DEFAULTS = {
         relativeInput: false,
         clipRelativeInput: false,
         calibrationThreshold: 10,
         calibrationDelay: 500,
         supportDelay: 500,
         calibrateX: false,
         calibrateY: true,
         invertX: true,
         invertY: true,
         limitX: false,
         limitY: false,
         scalarX: 30.0,
         scalarY: 10.0,
         frictionX: 0.1,
         frictionY: 0.1,
         originX: 0.5,
         originY: 0.5,
         _PARALLAX_EFFECT: false
     }

     var NS = 'Parallax.' + $.nobleSlider._DF_NM;
     var element;
     var parallax_int;
     var evt = event;

     var Parallax = {
         initParallax: function() {

             if (this.st._PARALLAX_EFFECT || DEFAULTS._PARALLAX_EFFECT)
                 this.on('update.' + NS, $.proxy(this._init, this));

         },
         _init: function(options) {
             var _this = this;
             var element = this.__a_slides.find('.nb-slide[rel="parallax"]');
             this.elSettings = [];
             this.defaults = DEFAULTS;
             // DOM Context
             this.element = element;


             // Selections
             this.$context = $(element).data('api', this);
             this.$layers = this.$context.find('[data-parallax]');
             this.$scrollP = this.$context.find('[data-onscrollparallax]');

             this.element.find('[data-parallax]').each(function(i) {
                 var t = $(this);
                 _this.elSettings[i] = {
                     calibrate_x: t.data('calibratex') || null,
                     calibrate_y: t.data('calibratey') || null,
                     invert_x: t.data('invertx') || null,
                     invert_y: t.data('inverty') || null,
                     limit_x: t.data('limitx') || null,
                     limit_y: t.data('limity') || null,
                     scalar_x: t.data('scalarx') || null,
                     scalar_y: t.data('scalary') || null,
                     friction_x: t.data('frictionx') || null,
                     friction_y: t.data('frictiony') || null,
                     origin_x: t.data('originx') || null,
                     origin_y: t.data('originy') || null
                 }
                 this.setAttribute('data-parallaxlayerid', i);
             });

             // Data Extraction
             var data = {
                 calibrateX: this.$context.data('calibrate-x') || null,
                 calibrateY: this.$context.data('calibrate-y') || null,
                 invertX: this.$context.data('invert-x') || null,
                 invertY: this.$context.data('invert-y') || null,
                 limitX: parseFloat(this.$context.data('limit-x')) || null,
                 limitY: parseFloat(this.$context.data('limit-y')) || null,
                 scalarX: parseFloat(this.$context.data('scalar-x')) || null,
                 scalarY: parseFloat(this.$context.data('scalar-y')) || null,
                 frictionX: parseFloat(this.$context.data('friction-x')) || null,
                 frictionY: parseFloat(this.$context.data('friction-y')) || null,
                 originX: parseFloat(this.$context.data('origin-x')) || null,
                 originY: parseFloat(this.$context.data('origin-y')) || null
             };

             this.ww = null;
             this.wh = null;
             this.wcx = null;
             this.wcy = null;
             this.wrx = null;
             this.wry = null;
             this.portrait = null;
             this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
             this.vendors = [null, ['-webkit-', 'webkit'],
                 ['-moz-', 'Moz'],
                 ['-o-', 'O'],
                 ['-ms-', 'ms']
             ];
             this.motionSupport = !!window.DeviceMotionEvent;
             this.orientationSupport = !!window.DeviceOrientationEvent;
             this.orientationStatus = 0;
             this.transform2DSupport = this.transformSupport('2D');
             this.transform3DSupport = this.transformSupport('3D');
             this.propertyCache = {};

             // Delete Null Data Values
             for (var key in data) {
                 if (data[key] === null) delete data[key];
             }

             // Compose Settings Object
             $.extend(this, DEFAULTS, options, data);

             // States
             this.calibrationTimer = null;
             this.calibrationFlag = true;
             this.enabled = false;
             this.depths = [];
             this.raf = null;

             // Element Bounds
             this.bounds = null;
             this.ex = 0;
             this.ey = 0;
             this.ew = 0;
             this.eh = 0;

             // Element Center
             this.ecx = 0;
             this.ecy = 0;

             // Element Range
             this.erx = 0;
             this.ery = 0;

             // Calibration
             this.cx = 0;
             this.cy = 0;

             // Input
             this.ix = 0;
             this.iy = 0;

             // Motion
             this.mx = 0;
             this.my = 0;

             // Velocity
             this.vx = 0;
             this.vy = 0;

             // Callbacks
             this.onMouseMove = this.st._PARALLAX_EFFECT.parallaxOrientation === 'deviceOrientation' || this.st._PARALLAX_EFFECT.parallaxOrientation === 'default' ? this.onMouseMove.bind(this) : null;;
             this.onScrolling = this.st._PARALLAX_EFFECT.parallaxOrientation === 'scrollOrientation' || this.st._PARALLAX_EFFECT.parallaxOrientation === 'default' ? this.onScrolling.bind(this) : null;
             //this.onTouchMove = this.onScrolling.bind(this);
             this.onDeviceOrientation = this.st._PARALLAX_EFFECT.parallaxOrientation === 'deviceOrientation' || this.st._PARALLAX_EFFECT.parallaxOrientation === 'default' ? this.onDeviceOrientation.bind(this) : null;
             this.onOrientationTimer = this.onOrientationTimer.bind(this);
             this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
             this.onAnimationFrame = this.onAnimationFrame.bind(this);
             this.onWindowResize = this.onWindowResize.bind(this);

             // Initialise
             this.initialise();
         },

         transformSupport: function(value) {
             var element = document.createElement('div');
             var propertySupport = false;
             var propertyValue = null;
             var featureSupport = false;
             var cssProperty = null;
             var jsProperty = null;
             for (var i = 0, l = this.vendors.length; i < l; i++) {
                 if (this.vendors[i] !== null) {
                     cssProperty = this.vendors[i][0] + 'transform';
                     jsProperty = this.vendors[i][1] + 'Transform';
                 } else {
                     cssProperty = 'transform';
                     jsProperty = 'transform';
                 }
                 if (element.style[jsProperty] !== undefined) {
                     propertySupport = true;
                     break;
                 }
             }
             switch (value) {
                 case '2D':
                     featureSupport = propertySupport;
                     break;
                 case '3D':
                     if (propertySupport) {
                         var body = document.body || document.createElement('body');
                         var documentElement = document.documentElement;
                         var documentOverflow = documentElement.style.overflow;
                         if (!document.body) {
                             documentElement.style.overflow = 'hidden';
                             documentElement.appendChild(body);
                             body.style.overflow = 'hidden';
                             body.style.background = '';
                         }
                         body.appendChild(element);
                         element.style[jsProperty] = 'translate3d(1px,1px,1px)';
                         propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
                         featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
                         documentElement.style.overflow = documentOverflow;
                         body.removeChild(element);
                     }
                     break;
             }
             return featureSupport;
         },


         initialise: function() {

             // Configure Styles
             if (this.$context.css('position') === 'static') {
                 this.$context.css({
                     position: 'relative'
                 });
             }

             // Hardware Accelerate Context
             this.accelerate(this.$context);

             // Setup
             this._p_updateLayers();
             this.updateDimensions();
             this._parallax_enable();
             this.queueCalibration(this.calibrationDelay);

             var API = {
                 enable: Plugin.prototype.enable,
                 disable: Plugin.prototype.disable,
                 updateLayers: Plugin.prototype.updateLayers,
                 calibrate: Plugin.prototype.calibrate,
                 friction: Plugin.prototype.friction,
                 invert: Plugin.prototype.invert,
                 scalar: Plugin.prototype.scalar,
                 limit: Plugin.prototype.limit,
                 origin: Plugin.prototype.origin
             };
         },

         _p_updateLayers: function() {

             // Cache Layer Elements
             this.$layers = this.$context.find('[data-parallaxnb]');
             this.depths = [];

             // Configure Layer Styles
             this.$layers.css({
                 position: 'absolute',
                 display: 'block',
                 left: 0,
                 top: 0
             });
             this.$layers.first().css({
                 position: 'relative'
             });

             // Hardware Accelerate Layers
             this.accelerate(this.$layers);

             // Cache Depths
             this.$layers.each($.proxy(function(index, element) {
                 this.depths.push($(element).data('depth') || 0);
             }, this));
         },

         updateDimensions: function() {
             this.ww = window.innerWidth;
             this.wh = window.innerHeight;
             this.wcx = this.ww * this.originX;
             this.wcy = this.wh * this.originY;
             this.wrx = Math.max(this.wcx, this.ww - this.wcx);
             this.wry = Math.max(this.wcy, this.wh - this.wcy);
         },

         updateBounds: function() {
             this.bounds = this.element[0].getBoundingClientRect();
             this.ex = this.bounds.left;
             this.ey = this.bounds.top;
             this.ew = this.bounds.width;
             this.eh = this.bounds.height;
             this.ecx = this.ew * this.originX;
             this.ecy = this.eh * this.originY;
             this.erx = Math.max(this.ecx, this.ew - this.ecx);
             this.ery = Math.max(this.ecy, this.eh - this.ecy);
         },

         queueCalibration: function(delay) {
             clearTimeout(this.calibrationTimer);
             this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
         },

         _parallax_enable: function() {
             var evt = evt;
             this._p_updateLayers();
             if (!this.enabled) {
                 this.enabled = true;
                 if (this.orientationSupport) {
                     this.portrait = null;
                     window.addEventListener('deviceorientation', this.onDeviceOrientation);
                     window.addEventListener('touchmove', this.onScrolling);
                     setTimeout(this.onOrientationTimer, this.supportDelay);
                 } else {
                     this.cx = 0;
                     this.cy = 0;
                     this.portrait = false;
                     window.addEventListener('mousemove', this.onMouseMove);
                     window.addEventListener('scroll', this.onScrolling);
                 }
                 window.addEventListener('resize', this.onWindowResize);
                 this.raf = requestAnimationFrame(this.onAnimationFrame);
             }
         },

         _parallax_disable: function() {
             if (this.enabled) {
                 this.enabled = false;
                 if (this.orientationSupport) {
                     window.removeEventListener('deviceorientation', this.onDeviceOrientation);
                     window.removeEventListener('PARALLAX_O.touchmove', this.onScrolling);
                 } else {
                     window.removeEventListener('scroll', this.onScrolling);
                     window.removeEventListener('mousemove', this.onMouseMove);
                 }

                 window.removeEventListener('resize', this.onWindowResize);
                 cancelAnimationFrame(this.raf);
             }
         },

         calibrate: function(x, y) {
             this.calibrateX = x === undefined ? this.calibrateX : x;
             this.calibrateY = y === undefined ? this.calibrateY : y;
         },

         invert: function(x, y) {
             this.invertX = x === undefined ? this.invertX : x;
             this.invertY = y === undefined ? this.invertY : y;
         },

         friction: function(x, y) {
             this.frictionX = x === undefined ? this.frictionX : x;
             this.frictionY = y === undefined ? this.frictionY : y;
         },

         scalar: function(x, y) {
             this.scalarX = x === undefined ? this.scalarX : x;
             this.scalarY = y === undefined ? this.scalarY : y;
         },

         limit: function(x, y) {
             this.limitX = x === undefined ? this.limitX : x;
             this.limitY = y === undefined ? this.limitY : y;
         },

         origin: function(x, y) {
             this.originX = x === undefined ? this.originX : x;
             this.originY = y === undefined ? this.originY : y;
         },

         clamp: function(value, min, max) {
             value = Math.max(value, min);
             value = Math.min(value, max);
             return value;
         },

         css: function(element, property, value) {
             var jsProperty = this.propertyCache[property];
             if (!jsProperty) {
                 for (var i = 0, l = this.vendors.length; i < l; i++) {
                     if (this.vendors[i] !== null) {
                         jsProperty = $.camelCase(this.vendors[i][1] + '-' + property);
                     } else {
                         jsProperty = property;
                     }
                     if (element.style[jsProperty] !== undefined) {
                         this.propertyCache[property] = jsProperty;
                         break;
                     }
                 }
             }
             element.style[jsProperty] = value;
         },

         accelerate: function($element) {
             for (var i = 0, l = $element.length; i < l; i++) {
                 var element = $element[i];
                 this.css(element, 'transform', 'translate3d(0,0,0)');
                 this.css(element, 'transform-style', 'preserve-3d');
                 this.css(element, 'backface-visibility', 'hidden');
             }
         },

         setPosition: function(element, x, y) {
             x += 'px';
             y += 'px';
             if (this.transform3DSupport) {
                 this.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)');
             } else if (this.transform2DSupport) {
                 this.css(element, 'transform', 'translate(' + x + ',' + y + ')');
             } else {
                 element.style.left = x;
                 element.style.top = y;
             }
         },

         onOrientationTimer: function(event) {
             if (this.orientationSupport && this.orientationStatus === 0) {
                 this._parallax_disable();
                 this.orientationSupport = false;
                 this._parallax_enable();
             }
         },

         onCalibrationTimer: function(event) {
             this.calibrationFlag = true;
         },

         onWindowResize: function(event) {
             this.updateDimensions();
         },

         onAnimationFrame: function() {

             this.updateBounds();

             var dx = this.ix - this.cx;
             var dy = this.iy - this.cy;
             if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
                 this.queueCalibration(0);
             }

             for (var i = 0, l = this.$layers.length; i < l; i++) {
                 var o = $(this.$layers[i]).data('parallaxlayerid');

                 if (this.portrait) {
                     this.mx = this.elSettings[o].calibrate_x ? dy : this.iy;
                     this.my = this.elSettings[o].calibrate_y ? dx : this.ix;
                 } else {
                     this.mx = this.elSettings[o].calibrate_x ? dx : this.ix;
                     this.my = this.elSettings[o].calibrate_y ? dy : this.iy;
                 }

                 this.mx *= this.ew * ((this.elSettings[o].scalar_x ? this.elSettings[o].scalar_x : this.defaults.scalarX) / 100);
                 this.my *= this.eh * ((this.elSettings[o].scalar_y ? this.elSettings[o].scalar_y : this.defaults.scalarY) / 100);

                 if (!isNaN(parseFloat((this.elSettings[o].limit_x ? this.elSettings[o].limit_x : this.defaults.limitX)))) {
                     this.mx = this.clamp(this.mx, -(this.elSettings[o].limit_x ? this.elSettings[0].limit_x : this.defaults.limitX), (this.elSettings[o].limit_x ? this.elSettings[0].limit_x : this.defaults.limitX));
                 }
                 if (!isNaN(parseFloat((this.elSettings[o].limit_y ? this.elSettings[o].limit_y : this.defaults.limitY)))) {
                     this.my = this.clamp(this.my, -(this.elSettings[o].limit_y ? this.elSettings[0].limit_y : this.defaults.limitY), (this.elSettings[o].limit_y ? this.elSettings[0].limit_y : this.defaults.limitY));
                 }

                 if (i <= 0) {
                     // friction
                     this.vx += (this.mx - this.vx) * (this.elSettings[o].friction_x ? this.elSettings[o].friction_x : this.defaults.frictionX);
                     this.vy += (this.my - this.vy) * (this.elSettings[o].friction_y ? this.elSettings[o].friction_y : this.defaults.frictionY);
                 }


                 var depth = this.depths[i];
                 var layer = this.$layers[i];
                 var xOffset = this.vx * depth * ((this.elSettings[o].invert_x ? this.elSettings[o].invert_x : this.defaults.invertX) ? -1 : 1);
                 var yOffset = this.vy * depth * ((this.elSettings[o].invert_y ? this.elSettings[o].invert_y : this.defaults.invertY) ? -1 : 1);

                 this.setPosition(layer, xOffset, yOffset);


             }


             this.raf = requestAnimationFrame(this.onAnimationFrame);


         },

         onDeviceOrientation: function(event) {

             // Validate environment and event properties.
             if (!this.desktop && event.beta !== null && event.gamma !== null) {

                 // Set orientation status.
                 this.orientationStatus = 1;

                 // Extract Rotation
                 var x = (event.beta || 0) / MAGIC_NUMBER; //  -90 :: 90
                 var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

                 // Detect Orientation Change
                 var portrait = window.innerHeight > window.innerWidth;
                 if (this.portrait !== portrait) {
                     this.portrait = portrait;
                     this.calibrationFlag = true;
                 }

                 // Set Calibration
                 if (this.calibrationFlag) {
                     this.calibrationFlag = false;
                     this.cx = x;
                     this.cy = y;
                 }

                 // Set Input
                 this.ix = x;
                 this.iy = y;
             }
         },

         onMouseMove: function(event) {

             this.element.closest('.nb__active').hover(function() {
                 _nb_parallax_enabled = 1;
             }, function() {
                 _nb_parallax_enabled = 0;
             });
             if (!_nb_parallax_enabled) return;
             // Cache mouse coordinates.
             var clientX = event.clientX;
             var clientY = event.clientY;

             // Calculate Mouse Input
             if (!this.orientationSupport && this.relativeInput) {

                 // Clip mouse coordinates inside element bounds.
                 if (this.clipRelativeInput) {
                     clientX = Math.max(clientX, this.ex);
                     clientX = Math.min(clientX, this.ex + this.ew);
                     clientY = Math.max(clientY, this.ey);
                     clientY = Math.min(clientY, this.ey + this.eh);
                 }

                 // Calculate input relative to the element.
                 this.ix = (clientX - this.ex - this.ecx) / this.erx;
                 this.iy = (clientY - this.ey - this.ecy) / this.ery;

             } else {

                 // Calculate input relative to the window.
                 this.ix = (clientX - this.wcx) / this.wrx;
                 this.iy = (clientY - this.wcy) / this.wry;
             }
         },
         onScrolling: function(event) {
             var _this = this;

             this.element.each(function() {
                 if ($(this).find('[data-onscrollparallax="true"]').length != 0)
                     _this.setPosition(this, 0, $(window).scrollTop() * -(_this.st._PARALLAX_EFFECT.scrollingRatio ? _this.st._PARALLAX_EFFECT.scrollingRatio : .3), true);
             });

         }

     };


     $.nobleSlider.injectPlugin('Parallax', Parallax);

 })(window.jQuery, window, document);

 /**
  * Request Animation Frame Polyfill.
  * @author Erik Möller
  */
 ;
 (function() {

     var lastTime = 0;
     var vendors = ['ms', 'moz', 'webkit', 'o'];

     for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
         window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
         window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
     }

     if (!window.requestAnimationFrame) {
         window.requestAnimationFrame = function(callback, element) {
             var currTime = new Date().getTime();
             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
             var id = window.setTimeout(function() {
                     callback(currTime + timeToCall);
                 },
                 timeToCall);
             lastTime = currTime + timeToCall;
             return id;
         };
     }

     if (!window.cancelAnimationFrame) {
         window.cancelAnimationFrame = function(id) {
             clearTimeout(id);
         };
     }

 }());


 /* global FUNCTIONS 
 -------------- */
 jQuery.fn.outerHTML = function(s) {
     return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
 };
 jQuery.fn.getAttributes = function() {
     var elem = this,
         attr = {};

     if (elem && elem.length) jQuery.each(elem.get(0).attributes, function(v, n) {
         n = n.nodeName || n.name;
         v = elem.attr(n); // relay on jQuery.fn.attr, it makes some filtering and checks
         if (v != undefined && v !== false) attr[n] = v
     })

     return attr
 };

 function getMouseCoord(ePX, ePY, orientation) {

     //check to make sure there is data to compare against
     if (typeof(ePX) != 'undefined') {

         //get the change from last position to this position
         var deltaX = _nb_last_position.x - ePX,
             deltaY = _nb_last_position.y - ePY;

         //check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
         if (orientation == 'horizontal') {

             if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0)
                 _nb__crP = "-|"; // left
             else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0)
                 _nb__crP = "|-"; // right

         } else {

             if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0)
                 _nb__crP = "|"; // up
             else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0)
                 _nb__crP = "_|_"; // down

         }



     }


 }

 function updateMouseCoord(ePX, ePY) {
     //set the new last position to the current for next time
     _nb_last_position = {
         x: ePX,
         y: ePY
     };
 }