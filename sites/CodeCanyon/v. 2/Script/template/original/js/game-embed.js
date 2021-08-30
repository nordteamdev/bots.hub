if (typeof build_miniclip_game !== "function") {
    var build_miniclip_game = function() {
        var l = document.querySelectorAll("#miniclip-game-embed, .miniclip-game-embed");
        if (l.length > 0) {
            var e = 750;
            var b = 500;
            var g = ["8-ball-multiplayer-pool"];
            var c = ["en", "es", "fr", "pt", "cn", "se", "de", "in", "ro", "br", "tr", "pl", "ru", "jp", "it", "hu", "kr"];
            var m = "";
            var d = "";
            var q = "";
            var j = "";
            var a = "";
            var n = "";
            var p = "";
            var h = "";
            for (var o = 0, f = l.length; o < f; o++) {
                var r = l[o];
                m = r.getAttribute("data-game-name");
                n = r.getAttribute("data-language");
                d = r.getAttribute("data-theme");
                q = r.getAttribute("data-width");
                j = r.getAttribute("data-height");
                a = r.getAttribute("data-credits");
                p = r.getAttribute("data-source");
                h = r.getAttribute("data-campaign");
                var s = "";
                if (h && p) {
                    s = "&utm_source=" + p + "&utm_medium=wp-games=plugin&utm_campaign=" + h
                }
                if (g.indexOf(m) !== -1) {
                    if (q < e) {
                        q = e
                    }
                    if (j < b) {
                        j = b
                    }
                }
                if (!d) {
                    d = 1
                }
                if (d.indexOf("#") !== -1) {
                    d = d.replace("#", "color/")
                }
                if (!n) {
                    n = "en"
                }
                n = n.toLowerCase();
                if (c.indexOf(n) === -1) {
                    n = "en"
                }
                var k = '<iframe src="//www.miniclip.com/games/' + m + "/" + n + "/webgame.php?bodybg=" + d + "&width=" + q + "&height=" + j + "&forcecredits=" + a + s + '" width="' + q + '" height="' + j + '" frameborder="0" scrolling="no" style="border:none;" allowfullscreen></iframe>';
                r.innerHTML = k
            }
        }
    };
 
    
};