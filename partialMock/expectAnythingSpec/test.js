var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expectCore  = newRequireMock('./expectCore');
var newHasArgument = newRequireMock('./newHasArgument');

var sut = require('../expectAnything');


(function(){
	console.log('expectAnything');
	var mockContext = {};
	var hasArgument = {};
	var index = {};
	var expected = {};

	stubHasArgument();
	stubExpectCore();

	function stubHasArgument() {
		newHasArgument.expect(index).return(hasArgument);
	}

	function stubExpectCore() {
		expectCore.expect(hasArgument).expect(index).expect(mockContext).return(expected);
	}

	var returned  = sut(index,mockContext);

	test('it should return expected from expectCore',function() {
		assert.equal(expected,returned);
	});

})();
