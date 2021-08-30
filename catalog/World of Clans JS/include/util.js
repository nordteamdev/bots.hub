module.exports = {
  random: function(x, y) {
    return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
  },
  pick: function(array) {
		return array[this.random(array.length - 1)];
	},
	number_format:function( number, decimals, dec_point, thousands_sep ) {
		var i, j, kw, kd, km;
		if( isNaN(decimals = Math.abs(decimals)) ){
			decimals = 2;
		}
		if( dec_point == undefined ){
			dec_point = ",";
		}
		if( thousands_sep == undefined ){
			thousands_sep = ".";
		}

		i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

		if( (j = i.length) > 3 ){
			j = j % 3;
		} else{
			j = 0;
		}

		km = (j ? i.substr(0, j) + thousands_sep : "");
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
		return km + kw + kd;
	},
	unixStampLeft:function(stamp) {
		stamp = stamp / 1000;

		let s = stamp % 60;
		stamp = ( stamp - s ) / 60;

		let m = stamp % 60;
		stamp = ( stamp - m ) / 60;

		let	h = ( stamp ) % 24;
		let	d = ( stamp - h ) / 24;

		let text = ``;

		if(d > 0) text += Math.floor(d) + " д. ";
		if(h > 0) text += Math.floor(h) + " ч. ";
		if(m > 0) text += Math.floor(m) + " мин. ";
		if(s > 0) text += Math.floor(s) + " с.";

		return text;
	},
	unixStampLeftMassiv:function(stamp) {
		stamp = stamp / 1000;

		let s = stamp % 60;
		stamp = ( stamp - s ) / 60;

		let m = stamp % 60;
		stamp = ( stamp - m ) / 60;

		let	h = ( stamp ) % 24;
		let	d = ( stamp - h ) / 24;

		return [(d > 0 ? Math.floor(d):0), (h > 0 ? Math.floor(h):0), (m > 0 ? Math.floor(m):0), (s > 0 ? Math.floor(s):0)];
	},
  MatchReplace: function(match, obj) {
		match = match.replace(/(\.|\,)/ig, '');
		match = match.replace(/(к|k)/ig, '000');
		match = match.replace(/(м|m)/ig, '000000');
		match = match.replace(/(вабанк|вобанк|все|всё)/ig, obj);
		match = match.replace(/[^0-9]/ig, '');
		return match;
	}
}
