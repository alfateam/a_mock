var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expect  = newRequireMock('./expect');
var expectAnything = newRequireMock('./expectAnything');
var expectArray = newRequireMock('./expectArray');
var _return = newRequireMock('./return');
var newWhenCalledEmitter = newRequireMock('../eventEmitter');

var sut = require('../expectCore');


(function(){
	console.log('expectCore');
	var mockContext = {};
	var compositeAreCorrectArguments = newMock();
	var whenCalledEmitter = {}	;
	var hasCorrectArgument = {};
	var index = 1;
	var didAdd;

	stubWhenCalledEmitter();
	stubMockContext();
	stubCompositeAreCorrectArguments();

	function stubWhenCalledEmitter() {
		newWhenCalledEmitter.expect().return(whenCalledEmitter);		
	}

	function stubMockContext() {
		mockContext.compositeAreCorrectArguments = compositeAreCorrectArguments;		
	}

	function stubCompositeAreCorrectArguments() {
		var add = newMock();
		add.expect(hasCorrectArgument).whenCalled(onAdd).return(null);
		compositeAreCorrectArguments.add = add;		
	}

	function onAdd() {
		didAdd = true;
	}

	var sut2 = sut(hasCorrectArgument,index,mockContext);

	test('it should set mockContext.NumberOfArgs to index+1',function() {
		assert.equal(mockContext.numberOfArgs,index+1); 
	});

	test('it should add areSameArgument to compositeAreCorrectArguments',function() {
		assert.ok(didAdd);
	});

	test('it should set mockContext.whenCalledEmitter',function() {
		assert.equal(mockContext.whenCalledEmitter,whenCalledEmitter);
	});


	(function() {
		console.log('expect');
		var expected = {};
		var arg = {};
		var arg2 = {};
		expect.expect(index+1).expect(mockContext).expect(arg).expect(arg2).return(expected);
		var returned = sut2.expect(arg,arg2); 

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('expectAnything');
		var expected = {};
		var arg = {};
		expectAnything.expect(index+1).expect(mockContext).return(expected);
		var returned = sut2.expectAnything(); 

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('expectArray');
		var expected = {};
		var arg = {};		
		expectArray.expect(index+1).expect(mockContext).expect(arg).return(expected);
		var returned = sut2.expectArray(arg); 

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('return');
		var expected = {};
		var arg = {};
		_return.expect(arg).expect(index+1).expect(mockContext).return(expected);
		var returned = sut2.return(arg); 

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('whenCalled');
		var callback = {};
		var expected;
		var add = newMock();
		whenCalledEmitter.add = add;
		var didAddCallback;
		add.expect(callback).whenCalled(onAddCallback).return();

		function onAddCallback() {
			didAddCallback = true;
		}

		mockContext.whenCalledEmitter = whenCalledEmitter;
				
		var returned = sut2.whenCalled(callback); 

		test('should add callback to whenCalledEmitter',function() {
			assert.ok(didAddCallback)
		});

		test('should return self',function() {
			assert.equal(returned,sut2);
		});
	})();

})();
