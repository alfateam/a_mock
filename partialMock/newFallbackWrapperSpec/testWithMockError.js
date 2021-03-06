var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');
var getStackTrace = newRequireMock('./fallbackWrapper/getStackTrace');
var newSut = require('../newFallbackWrapper');

(function() {
	console.log('newFallbackWrapper');	
	var sut = newSut(originalFallback);
	var didIncrementStackTrace
	var originalStackTraceLimit = Error.stackTraceLimit;

	function originalFallback() {
			didIncrementStackTrace = (Error.stackTraceLimit == originalStackTraceLimit + 2);
			var e = new Error();
			e.name = 'Mock Error';
			e.message = 'message';
			throw e;
	}

	(function() {
		console.log('execute with mock error');
		var arg = {};				
		var error;
		var stackTrace = 'stackTrace';
		var expectedTrace = 'Mock Error: message\nstackTrace';
		
		getStackTrace.expect().return(stackTrace);
		try {
			sut(arg);
		}
		catch(e) {
			error = e;
		}
		

		function onFallback() {
			didIncrementStackTrace = (Error.stackTraceLimit == originalStackTraceLimit + 2);
			var e = new Error();
			e.name = 'Mock Error';
			e.message = 'message';
			throw e;
		}


		test('it increments stack trace limit by two before executing fallback', function() {
			assert.ok(didIncrementStackTrace);
		});

		test('it should set stack on error',function() {
			assert.equal(error.stack,expectedTrace);
		});

		test('it resets stack trace limit', function() {
			assert.equal(Error.stackTraceLimit,originalStackTraceLimit);
		});
	})();
})();
