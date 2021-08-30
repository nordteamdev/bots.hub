module.exports = function(data) {
	_this = this;
	this.set = function(field, value) {
		data[field] = value;
		return data.save();
	};
	this.inc = function(field, inc) {
		data[field] += inc;
		return data.save();
	};
	this.dec = function(field, dec) {
		data[field] -= dec;
		return data.save();
	};
	this.push = function(field, value) {
		data[field].push(value);
		return data.save();
	};
	this.pull = function(field, value) {
		data[field].splice(data[field].indexOf(value), 1);
		return data.save();
	};
	this.pushSet = function(field, value) {
		if (!~data[field].indexOf(value)) data[field].push(value);
		return data.save();
	};
	this.remove = function() {
		return data.remove().then(() => data.save());
	};
	this.save = function() {
		return data.save();
	};
};