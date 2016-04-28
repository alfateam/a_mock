var newPromise = require('deferred');
var _setTimeout = setTimeout;
var _clearTimeout = clearTimeout;

function newThen() {
    var def = newPromise();
	var parentFilename = getRequiringModulePath();
    var timeout = 10;
    var timerId = _setTimeout(function() {
		console.error('aborting a promise in ' + parentFilename + ' that took more than ' + timeout + 's to fulfill');
		throw new Error();
	}, 10*1000);

	function promise(success, error) {
		if (arguments.length == 0)
			return def.resolve();
		if (success !== null )
			return def.resolve(success);
		return def.reject(error);
	}

	promise.then = function(success, error) {
		return def.promise.apply(def,arguments);
	};

	promise.resolve = function() {
		_clearTimeout(timerId);
		return def.resolve.apply(def,arguments);
	};

	promise.reject = function() {
		_clearTimeout(timerId);
		return def.reject.apply(def,arguments);
	};

	return promise;
}

function getRequiringModulePath() {
    var path;
    var mod = module;
    //3 levels up: this file -> a_mock/index -> a/index -> requiring module
    for(var i = 0; i < 3; i++) {
        if(!mod.parent) return path;
        mod = mod.parent;
        path = mod.filename;
    }
    return path;
}

module.exports = newThen;
