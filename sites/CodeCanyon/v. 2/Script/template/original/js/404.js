"use strict";
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function demo() {
	var image = document.getElementById('background');
	image.onload = function() {
		var engine = new RainyDay('canvas','background', window.innerWidth, window.innerHeight, 1, getURLParameter("blur") || 20);
		var preset = getURLParameter("preset") || 2;
		if (preset == 1) {
			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_DROPS;
			engine.rain([ engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1) ], 100);
		} else if (preset == 2) {
			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_DROPS;
			engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
			engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
		} else if (preset == 3) {
			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_SMUDGE;
			engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
		}
	};
	image.crossOrigin = "anonymous";
	image.src="http://i.imgur.com/641Gt09.jpg";

	var youtube = getURLParameter("youtube");
	if (youtube) {
		var div = document.getElementById("sound");
		var player = document.createElement('iframe');
		player.frameborder = "0";
		if (!getURLParameter("novideo")) {
			div.style.zIndex = 1000;
			player.setAttribute("class", "video");
		} else {
			player.height = "1";
			player.width = "1";
		}
		player.src = "https://youtube.com/embed/" + youtube + "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1";
		div.appendChild(player);
	}
}
