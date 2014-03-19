function create(index, callback) {
	return function() {
		callback.setCallback(arguments[index]);
	}
}

module.exports = create;