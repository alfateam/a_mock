var assert = require('assert');
var test = require('../test');
var requireMock = require('../partialMock/simple/newRequireMock');
var mock = require('../partialMock/simple/newMock');

(function(){
	console.log('then');
	
	var newResolver = requireMock('deferred');
	var resolve = mock();
	var reject = mock();
	var resolver = {};
	resolver.resolve = resolve;
	resolver.reject = reject;

	resolver.promise = mock();

	newResolver.expect().return(resolver);
	var promise = {};
	promise.then = mock();

	var arg = {};
	
	var sut = require('../newThen')();		

	test('then should return promiseResult',function() {
		var expected = {};
		resolver.promise.expect(arg).return(expected);
		assert.equal(sut.then(arg),expected);
	});

	test('then resolve should invoke resolver.resolve',function() {
		var expected = {};
		resolver.resolve.expect(arg).return(expected);
		assert.equal(sut.resolve(arg),expected);
	});	

	test('then reject should invoke resolver.reject',function() {
		var expected = {};
		resolver.reject.expect(arg).return(expected);
		assert.equal(sut.reject(arg),expected);
	});

	test('then implicit resolve should invoke resolver.resolve',function() {
		var expected = {};
		resolver.resolve.expect(arg).return(expected);
		assert.equal(sut(arg),expected);
	});	

	test('then implicit reject should invoke resolver.reject',function() {
		var expected = {};
		resolver.reject.expect(arg).return(expected);
		assert.equal(sut(null,arg),expected);
	});

	test('then implicit resolve/reject with no args should return from resolve',function() {
		var expected = {};
		resolver.resolve.expect().return(expected);
		assert.equal(sut(), expected);
	});

})();
