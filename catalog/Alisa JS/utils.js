const utils = {
	random: (x, y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x),
	pick: (array) => array[utils.random(0, array.length - 1)],
	spaces: (number) => number.toLocaleString("ru"),
	decline: (n, titles) => titles[(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)],
	days: (unix) => {
		return Math.floor(unix / 86400000);
	},
	parseBet: (str, balance) => Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))) < 0 ? 0 : Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))),
	getSadEmoji: () => utils.pick(["😞", "😔", "😟", "😩", "😣", "☹️", "🙁", "😕", "😦", "😧"]),
	filter: (text) => /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(text) ? true : false,
	formatNumber: (count) => {
		count = Math.floor(count);
		let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)); 
		let result = parseFloat((count / Math.pow(1000, i)).toFixed(2)); 
		if (i >= 17) return "Дохуя";
		result += " " + ["", "тыс", "млн", "млрд", "трлн", "кврлн", "квинтл", "скстлн", "сптлн", "октлн", "нонлн", "дцлн", "ундцлн", "додцлн", "трдцлн", "квтуордцлн", "квндцлн"][i];
		return result;
	}
};

module.exports = utils;