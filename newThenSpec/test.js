var assert = require('assert');
var test = require('../test');
var requireMock = require('../partialMock/simple/newRequireMock');
var mock = require('../partialMock/simple/newMock');

(function(){
	console.log('then');
	
	var newPromise = requireMock('./promise');
	var newResolver = requireMock('./promise/newResolver');
	var resolve = mock();
	var reject = mock();
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

	test('then resolve should point at resolver.resolve',function() {
		assert.equal(sut.resolve,resolve);
	});

	test('then reject should point at resolver.reject',function() {
		assert.equal(sut.reject,reject);
	});

	test('then implicit resolve should return from resolve',function() {
		arg = {};
		var expected = {};
		resolve.expect(arg).return(expected);
		assert.equal(sut(arg), expected);
	});

	test('then implicit reject should return from reject',function() {
		arg = {};
		var expected = {};
		reject.expect(arg).return(expected);
		assert.equal(sut(null,arg), expected);
	});

	test('then implicit resolve/reject with no args should return from resolve',function() {
		var expected = {};
		resolve.expectAnything().return(expected);
		assert.equal(sut(), expected);
	});

})();
