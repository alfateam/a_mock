var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasSameArgument');


(function() {
	console.log('newHasSameArgument');
	var expectedArg = {};
	var index = 1;
	
	var sut = newSut(expectedArg,index);

	(function() {
		console.log('too few arguments.execute');
		var returned = sut('somearg');

		test('it should return false',function() {
			assert.equal(false,returned);
		});
		
	})();

	(function() {
		console.log('incorrect argument.execute');
		var returned = sut('arg','arg2');

		test('it should return false',function() {
			assert.equal(false,returned);
		});

	})();

	(function() {
		console.log('correct argument.execute');
		var returned = sut('arg',expectedArg);

		test('it should return true',function() {
			assert.equal(true,returned);
		});

	})();
})();
