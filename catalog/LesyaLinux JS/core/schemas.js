const mongoose = require("mongoose");
const schema = new mongoose.Schema({
	id: {type: Number, required: true, unique: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	nickname: {type: String, default: null},
	balance: {type: Number, default: 0},
	coins: {type: Number, default: 0},
	uid: {type: Number, required: true, unique: true},
	rating: {type: Number, default: 0},
	register: {type: Number, required: true, unique: true},
	shot: {type: Number, default: 0},
	roulette: {type: Boolean, default: false},
	section: {type: String, default: null},
	miner: {type: Boolean, default: false},
	miner_spot: {type: Number, default: 0},
	miner_step: {type: Number, default: 1},
	bonus: {type: Number, default: null},
	marry: {type: Number, default: null},
	bank: {type: Number, default: 0},
	admin: {type: Boolean, default: false},
	creator: {type: Boolean, default: false},
	// inv
	car: { type: String, default: null },
	house: { type: String, default: null },
	apartment: { type: String, default: null },
	ptichka: { type: String, default: null },
	phone: { type: String, default: null },
	gameconsole: { type: String, default: null },
	helicopter: { type: String, default: null },
	yacht: { type: String, default: null },
	computer: { type: String, default: null },
	aircraft: { type: String, default: null },
	miners: { type: Array, default: [] },
	bussines: { type: Array, default: [] },
	// Jobs
	days: {type: Number, default: 0},			// days
	cooldown: {type: Number, default: 0},		// unix
	job: {type: Number, default: null},			// id
	ignore: {type: Boolean, default: false},
	nick: {type: Boolean, default: true}
});
mongoose.model("user", schema).update();

module.exports = {
    "User": mongoose.model("user", schema)
};