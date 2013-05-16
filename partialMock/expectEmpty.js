function expectEmpty(mockContext) {
	var _return = require('./return');
	mockContext.whenCalledEmitter = require('../eventEmitter')();
	var hasCorrectArgument = require('./newHasNoMoreArguments')(0);
	
	var c = {};
	mockContext.compositeAreCorrectArguments.add(hasCorrectArgument);
	mockContext.numberOfArgs = 0;

	c.return = function(arg) {
		return _return(arg,0,mockContext);
	};

	c.whenCalled = function(callback) {
		mockContext.whenCalledEmitter.add(callback);
		return c;
	};

	c.repeat = function(times) {
		return _return(undefined,0,mockContext).repeat(times);
	};

	c.repeatAny = function() {
		return _return(undefined,0,mockContext).repeatAny();
	};

	return c;
}

module.exports = expectEmpty;