(function(a) {
    a.fn.photo_stars = function(p) {
        var p = p || {};
        var b = p && p.rating_star_length ? p.rating_star_length : "5";
        var c = p && p.rating_function_name ? p.rating_function_name : "";
        var e = p && p.rating_initial_value ? p.rating_initial_value : "";
        var d = p && p.directory ? p.directory : "images";
        var f = "";
        var g = a(this);
        b = parseInt(b);
        init();
  function rate_manipulation(){
        g.next("ul").children("li").hover(function() {
            jQuery(this).parent().children("li").css('background-image', 'url(' + d + '/nst.gif)');
            var a = jQuery(this).parent().children("li").index(jQuery(this));
            jQuery(this).parent().children("li").slice(0, a + 1).css('background-image', 'url(' + d + '/sth.gif)')
        }, function() {});
        g.next("ul").children("li").on('click',function(e) {
	    e.preventDefault();
            var a = jQuery(this).parent().children("li").index(jQuery(this));
            f = a + 1;
            g.val(f);
            if (c != "") {
                eval(c + "(" + g.val() + ")")
            }
	    rate_this_artist(f,jQuery(this).closest('.photo_rating').find('input:first').data('photo-numb'),g);
        });
        g.next("ul").hover(function() {}, function() {
            if (f == "") {
                jQuery(this).children("li").css('background-image', 'url(' + d + '/nst.gif)')
            } else {
                jQuery(this).children("li").css('background-image', 'url(' + d + '/nst.gif)');
                jQuery(this).children("li").slice(0, f).css('background-image', 'url(' + d + '/sth.gif)')
            }
        });
}
        function init() {


if(jQuery('#rate_photo').length != 0 && jQuery('[data-photo-numb]').length != 0){
        jQuery.ajax({
            url: '/profile',
            type: 'POST',
            data: {
                cmd: 'check_photo_rate',
                photoid: jQuery('#rate_photo').data('photo-numb')
            },
            cache: false,
            success: function(res) {
            var z;
            if(res !== 'a' || res !== '0') res = res.split('>:<');
            jQuery('<div style="clear:both;"></div>').insertAfter(g);
            g.css("float", "left");
            var a = jQuery("<ul>");
            a.attr("class", "photo_stars");
            for (var i = 1; i <= b; i++) {
		if(res[1] >= '1') z = 'none';
                a.append('<li style="background-image:url(' + d + '/nst.gif); pointer-events:'+z+'"><span>' + i + '</span></li>');

            }
            a.insertAfter(g);

            if (res !== 'a') {
                f = res[0];
                g.val(e);
                g.next("ul").children("li").slice(0, f).css('background-image', 'url(' + d + '/sth.gif)')
            } 
             rate_manipulation();

            },
            error: function(a, b, c) {
                return jQuery.windowMusic('error', null, b);
            }
        });

   }

           }
	  }
})(jQuery);