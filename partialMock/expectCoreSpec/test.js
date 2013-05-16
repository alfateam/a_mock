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
			assert.equal(returned,expected)
		});
	})();

	(function() {
		console.log('expectAnything');
		var expected = {};
		var arg = {};
		expectAnything.expect(index+1).expect(mockContext).return(expected);
		var returned = sut2.expectAnything(); 

		test('should return expected',function() {
			assert.equal(returned,expected)
		});
	})();

	(function() {
		console.log('expectArray');
		var expected = {};
		var arg = {};		
		expectArray.expect(index+1).expect(mockContext).expect(arg).return(expected);
		var returned = sut2.expectArray(arg); 

		test('should return expected',function() {
			assert.equal(returned,expected)
		});
	})();

	(function() {
		console.log('return');
		var expected = {};
		var arg = {};
		_return.expect(arg).expect(index+1).expect(mockContext).return(expected);
		var returned = sut2.return(arg); 

		test('should return expected',function() {
			assert.equal(returned,expected)
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

	(function() {
		console.log('repeat');
		var expected = {};
		var times = 2;
		var returnContext = {};
		var repeatMock = newMock();
		_return.expectAnything().expect(index+1).expect(mockContext).whenCalled(onReturn).return(returnContext);
		
		function onReturn(returnValue) {
			if (returnValue !== undefined)
				throw new Error('unexpected argument');
		}

		returnContext.repeat = repeatMock;
		repeatMock.expect(times).return(expected);

		var returned = sut2.repeat(times); 

		test('should return expected',function() {
			assert.equal(returned,expected)
		});
	})();

	(function() {
		console.log('repeatAny');
		var expected = {};
		var returnContext = {};
		var repeatMock = newMock();
		_return.expectAnything().expect(index+1).expect(mockContext).whenCalled(onReturn).return(returnContext);
		
		function onReturn(returnValue) {
			if (returnValue !== undefined)
				throw new Error('unexpected argument');
		}

		returnContext.repeatAny = repeatMock;
		repeatMock.expect().return(expected);

		var returned = sut2.repeatAny(); 

		test('should return expected',function() {
			assert.equal(returned,expected)
		});
	})();

})();
