var assert = require('assert');
var test = require('../test');

(function() {
	var sut = require('../mockCallback');
	var errorMsg = "Callback not set, unable to call.";
	(function() {
		var returned = sut();
		var thrownErrorMsg;
		var thrownName;
		var thrownStack;
		try {
			returned();
		} 
		catch(error) {
			thrownErrorMsg = error.message;
			thrownName = error.name;
			thrownStack = error.stack;
		}

		test('it should throw correct msg', function(){
			assert.equal(thrownErrorMsg, errorMsg);
	    });

	    test('it should throw correct name', function(){
			assert.equal(thrownName, 'Mock Callback Error');
	    });

	    test('it should have stack', function(){
			assert.ok(thrownStack);
	    });
	})();

	(function() {
		var callbackMock = sut();
		var expectedArguments = [1,2,3];
		var expectedReturn = 4;
		var sentArguments;
		function callback() {
			sentArguments = [].slice.call(arguments);
			return expectedReturn;
		}

		callbackMock.setCallback(callback);
		var returned = callbackMock.apply(this, expectedArguments);

		test('it should forward arguments to stored callback', function() {
			assert.deepEqual(sentArguments, expectedArguments);
		});

		test('it should forward return value of stored callback', function() {
			assert.equal(returned, expectedReturn);
		})
	})();
})();