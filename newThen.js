var newPromise = require('deferred');

function newThen() {
	var def = newPromise();

	function promise(success, error) {
		if (arguments.length == 0)
			return def.resolve();
		if (success !== null )			
			return def.resolve(success);
		return def.reject(error);
	}

	promise.then = function(success,error) {
		return def.promise.apply(def,arguments);
	};

	promise.resolve = function() {
		return def.resolve.apply(def,arguments);
	};

	promise.reject = function() {
		return def.reject.apply(def,arguments);
	};

	return promise;

}

module.exports = newThen;