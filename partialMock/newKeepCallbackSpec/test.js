var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var sut = require('../newKeepCallback');

(function() {
	console.log('keepCallback');
	var callbackMock = {};
	callbackMock.setCallback = newMock();

	

	(function() {
		var index = 2;
		var callback = function() {};
		var didSetCallback;


		callbackMock.setCallback.expect(callback).whenCalled(onSetCallback).return();

		function onSetCallback() {
			didSetCallback = true;
		}

		var sut2 = sut(index, callbackMock);
		sut2(undefined, undefined, callback);

		test('it should setCallback on callbackMock with expected callback', function() {
			assert.ok(didSetCallback);
		});
	})();
})();