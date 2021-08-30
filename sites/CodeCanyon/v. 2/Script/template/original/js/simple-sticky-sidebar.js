
/* ========================================================================
 * Simple Sticky Sidebar
 * @version 0.1
 * @author Ismail Farooq <ismail_farooq@yahoo.com>
 * @license The MIT License (MIT) (https://github.com/ismailfarooq/simple-sticky-sidebar/blob/master/LICENSE)
 * ======================================================================== */


function setStyle(element, cssProperty) {
	for (var property in cssProperty){
		element.style[property] = cssProperty[property];
	}
}

function destroySticky(element){
	setStyle(element, {
		top 		: '',
		left		: '',
		bottom		: '',
		width		: '',
		position	: ''
	});
}

function getOffset(el) {
	el = el.getBoundingClientRect();
	return {
		left: el.left + window.scrollX,
		top: el.top + window.scrollY
	}
}

function simpleStickySidebar(element, options) {
	
	// Global options
	var sticky = document.querySelector(element); // Sticky sidebar
	var container = document.querySelector(options.container); // Sticky sidebar container
	var topSpace = options.topSpace ? options.topSpace : 0; // Top spacing after sticky
	var bottomSpace = options.bottomSpace ? options.bottomSpace : 0; // Bottom spacing after sticky

	// vars
	var $window = window; // window
	var stickyHeight = sticky.getBoundingClientRect().height; // Sticky sidebar height
	var stickyOffsetTop = getOffset(sticky).top; // Sticky sidebar top offset
	var stickyOffsetBottom = getOffset(sticky).top + sticky.getBoundingClientRect().height; // Sticky sidebar bottom offset
	var stickyOffsetLeft = getOffset(sticky).left; // Sticky sidebar left offset
	var topFixed = false; // checkpoint
	var bottomFixed = false; // checkpoint
	var lastScrollVal = 0; // checkpoint
	
	var getStickyHeight = function() {
		return document.querySelector(element).getBoundingClientRect().height;
	};

	// scrolling
	window.addEventListener('scroll', function(event) {
		var scrollTop = window.scrollY;
		// when scroll position touch the "Sidebar"
		if(scrollTop > stickyOffsetTop - topSpace){
			// if "Sidebar" smaller than viewport
			if(getStickyHeight() <= $window.innerHeight - topSpace){
				// fix "Sidebar" from top
		   		setStyle(sticky, {
		   			top 		: topSpace + "px",
		   			left		: stickyOffsetLeft + "px",
		   			bottom		: '',
		   			width		: sticky.getBoundingClientRect().width + "px",
		   			position	: 'fixed'
		   		});
			}
			else {
				// scrolling down
				if (scrollTop > lastScrollVal){
					// if "Sidebar" fixed from top during scrolling down
					if(topFixed){
						// get new offset of "Sidebar"
						var absoluteStickyOffsetTop = getOffset(sticky).top;

				   		setStyle(sticky, {
				   			top 		: absoluteStickyOffsetTop - getOffset(container).top + "px",
				   			left		: '',
				   			bottom		: '',
				   			width		: '',
				   			position	: 'absolute'
				   		});
						topFixed = false;	
					}
					// make "Sidebar" fixed from bottom when bottom area visible in viewport
					if(scrollTop > stickyOffsetBottom - $window.innerHeight){
						setStyle(sticky, {
				   			top 		: '',
				   			left		: stickyOffsetLeft + "px",
				   			bottom		: bottomSpace + "px",
				   			width		: sticky.getBoundingClientRect().width + "px",
				   			position	: 'fixed'
				   		});
				   		bottomFixed = true;
					}
				} else { // scrolling up
					// get new offset of "Sidebar" during scrolling up
					var absoluteStickyOffsetTop = getOffset(sticky).top;
					//  if "Sidebar" fixed from bottom, stop sticky to its position
					if(bottomFixed){
						setStyle(sticky, {
				   			top 		: absoluteStickyOffsetTop - getOffset(container).top + "px",
				   			left		: '',
				   			bottom		: '',
				   			width		: '',
				   			position	: 'absolute'
				   		});
						bottomFixed = false;	
					}
					// make "Sidebar" fixed from top when top area visible in viewport
					if(scrollTop < absoluteStickyOffsetTop - topSpace){
						setStyle(sticky, {
				   			top 		: topSpace + "px",
				   			left		: stickyOffsetLeft + "px",
				   			bottom		: '',
				   			width		: sticky.getBoundingClientRect().width + "px",
				   			position	: 'fixed'
				   		});
				   		topFixed = true;
					}
				}
				lastScrollVal = scrollTop;
			}
		} else {
			// make sidebar to default position
			destroySticky(sticky);
		}
	});
}
