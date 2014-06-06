var newPromise = require('./promise');
var newResolver = require('./promise/newResolver');

function newThen() {
	var resolver = newResolver();
	var _promise = newPromise(resolver);

	function promise(success, error) {
		if (success !== null)			
			return resolver.resolve(success);
		if (error !== null)
			return resolver.reject(error);
		return resolver.resolve();
	}

	promise.then = function() {
		return _promise.then.apply(_promise,arguments);
	};

	promise.resolve = resolver.resolve;
	promise.reject = resolver.reject;

	return promise;

}

module.exports = newThen;