var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expectCore  = newRequireMock('./expectCore');
var newHasFunctionArgument = newRequireMock('./newHasFunctionArgument');
var newKeepCallback = newRequireMock('./newKeepCallback');
var sut = require('../expectCallback');

(function() {
	console.log('expectCallback');
	var mockContext = {};
	var index = {};
	var callbackMock = {};
	var keepCallback = {};
	var expected = {};

	newKeepCallback.expect(index).expect(callbackMock).return(keepCallback);

	mockContext.expectedCallbacks = [];

	var hasFunctionArgument = {};
	newHasFunctionArgument.expect(index).return(hasFunctionArgument);
	expectCore.expect(hasFunctionArgument).expect(index).expect(mockContext).return(expected);

	var returned = sut(index, mockContext, callbackMock);

	(function() {
		
		test('should add keepCallback to mockContext.expectedCallbacks', function() {
			assert.equal(mockContext.expectedCallbacks[0], keepCallback);
		});

		test('should return expected', function() {
			assert.equal(returned, expected);
		});
	})();
})();