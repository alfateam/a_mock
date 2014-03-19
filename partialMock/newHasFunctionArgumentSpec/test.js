var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasFunctionArgument');

(function() {
	console.log('newHasFunctionArgument');
	var index = 1;

	var sut = newSut(index);

	(function() {
		console.log('not a function');
		var returned = sut(function() {}, 1);

		test('it should return false', function() {
			assert.equal(returned, false);
		});
	})();

	(function() {
		console.log('a function');
		var returned = sut(1, function() {});

		test('it should return true', function() {
			assert.equal(returned, true);
		});
	})();
})();