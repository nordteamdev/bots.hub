let Utils = {
	random: (x, y) => { return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x) },
	pick: (array) => { return array[Utils.random(0, array.length - 1)] }
}

module.exports = Utils;