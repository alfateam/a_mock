var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newFallbackWrapper = newRequireMock('./newFallbackWrapper');
var newMutableAnd = newRequireMock('../newMutableAnd');

var newSut = require('../newMockContext');

(function() {
	console.log('newMockContext');
	var originalFallback = {};
	var fallbackWrapper = {};
	var passedContext;
	var mutableAnd = {};
	newFallbackWrapper.expect(originalFallback).return(fallbackWrapper);
	newMutableAnd.expect().return(mutableAnd);
	
	var sut = newSut(originalFallback);

	test('it should set execute to fallbackWrapper',function() {
		assert.equal(sut.execute,fallbackWrapper);
	});

	test('it should set originalFallback',function() {
		assert.equal(sut.originalFallback,originalFallback);
	});

	test('it should set compositeAreCorrectArguments',function() {
		assert.equal(sut.compositeAreCorrectArguments,mutableAnd);
	});

	test('it should set lastExecute',function() {
		assert.equal(sut.lastExecute,fallbackWrapper);
	});

	test('it should set expectCount to zero',function() {
		assert.equal(sut.expectCount,0);
	});

	test('it should set expectedCallbacks to empty list', function() {
		assert.equal(sut.expectedCallbacks.length, 0);
	});
})();
