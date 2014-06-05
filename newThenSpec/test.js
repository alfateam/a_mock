var assert = require('assert');
var test = require('../test');
var requireMock = require('../partialMock/simple/newRequireMock');
var mock = require('../partialMock/simple/newMock');

(function(){
	console.log('then');
	
	var newPromise = requireMock('./promise');
	var newResolver = requireMock('./promise/newResolver');
	var resolve = {};
	var reject = {};
	var resolver = {};
	resolver.resolve = resolve;
	resolver.reject = reject;
	newResolver.expect().return(resolver);
	var promise = {};
	newPromise.expect(resolver).return(promise);
	promise.then = mock();

	var arg = {};
	var promiseResult = {};
	promise.then.expect(arg).return(promiseResult);

	var sut = require('../newThen')();		

	test('then should return promiseResult',function() {
		assert.equal(sut.then(arg),promiseResult);
	});

})();
