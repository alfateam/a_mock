var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newFallbackWrapper');

(function() {
	console.log('newFallbackWrapper');
	var originalFallback = newMock();
	var sut = newSut(originalFallback);

	(function() {
		console.log('execute');
		var arg = {};		
		var expected = {};
		originalFallback.expect(arg).return(expected);
		var returned = sut(arg);

		test('it should result from originalFallback',function() {
			assert.equal(returned,expected);
		});

		(function() {
			console.log('setFallback');
			var fallback = newMock();			
			sut.setFallback(fallback);

			(function() {
				console.log('execute');
				var expected = {};
				fallback.expect(arg).return(expected);
				var returned = sut(arg);

				test('it should return result from new fallback',function() {
					assert.equal(returned,expected);
				});
			})();
		})();
	})();

})();
