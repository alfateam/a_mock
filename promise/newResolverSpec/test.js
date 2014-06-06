var assert = require('assert');
var test = require('../../test');
var mock = require('../../partialMock/simple/newMock');

(function(){
	console.log('newResolver');
	
	


	test('then invoking waits',function() {		
		var sut = require('../newResolver')();
		assert.equal(sut(), undefined);
	});

	test('then resolve invokes success',function() {
		var arg = {};
		var sut = require('../newResolver')();
		var success = mock();
		var failed = mock();
		sut(success,failed);		
		var didInvoke;
		success.expect(arg).whenCalled(onSuccess).return(null);
		sut.resolve(arg);

		function onSuccess() {
			didInvoke = true;
		}

		assert.ok(didInvoke);
	});

	test('then pre-resolve invokes success',function() {
		var arg = {};
		var sut = require('../newResolver')();
		var success = mock();
		var failed = mock();
		sut.resolve(arg);
		success.expect(arg).whenCalled(onSuccess).return(null);		
		sut(success,failed);		
		var didInvoke;

		function onSuccess() {
			didInvoke = true;
		}

		assert.ok(didInvoke);
	});

	test('then reject invokes failed',function() {
		var arg = {};
		var sut = require('../newResolver')();
		var success = mock();
		var failed = mock();
		sut(success,failed);		
		var didInvoke;
		failed.expect(arg).whenCalled(onFailed).return(null);
		sut.reject(arg);

		function onFailed() {
			didInvoke = true;
		}

		assert.ok(didInvoke);
	});

	test('then pre-reject invokes failed',function() {
		var arg = {};
		var sut = require('../newResolver')();
		var success = mock();
		var failed = mock();
		sut.reject(arg);		
		var didInvoke;
		failed.expect(arg).whenCalled(onFailed).return(null);
		sut(success,failed);		

		function onFailed() {
			didInvoke = true;
		}

		assert.ok(didInvoke);
	});

})();
