function mockCallback() {
	var error = new Error();
	error.name = "Mock Callback Error";
	error.message = "Callback not set, unable to call.";
	throw error;
}

function create() {
	var callback = mockCallback;
	var forwarder = function() {
		return callback.apply(this, arguments);
	};
	forwarder.setCallback = function(newCallback) {
		if(!newCallback)
			throw new Error("Expects function");
		callback = newCallback;
	};

	return forwarder;
}

module.exports = create;