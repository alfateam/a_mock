var newPromise = require('./promise');
var newResolver = require('./promise/newResolver');

function newThen() {
	var resolver = newResolver();
	var _promise = newPromise(resolver);

	function promise() {
		
	}

	promise.then = function() {
		return _promise.then.apply(_promise,arguments);
	};

	return promise;

}

module.exports = newThen;