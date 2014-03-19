function execute(returnValue,fallback,hasCorrectArguments,mockContext,shouldDecrementExpectCount,whenCalledEmitter) {	
	var negotiateDecrementExpectCount = require('./negotiateDecrementExpectCount');

	var index = 6;
	var args = [];
	while(index < arguments.length) {
		args.push(arguments[index]);
		index++;
	}
	var expectedCallbacks = mockContext.expectedCallbacks;
	mockContext.expectedCallbacks = [];
	if (hasCorrectArguments.apply(null,args)) {
		negotiateDecrementExpectCount(shouldDecrementExpectCount,mockContext);
		whenCalledEmitter.emit.apply(null,args);
		runExpectedCallbacks(expectedCallbacks, args);

		return returnValue;
	}
		
	return fallback.apply(null,args);
}

function runExpectedCallbacks(callbacks, args) {
	for(var i in callbacks) {
		callbacks[i].apply(null, args);
	}
}

module.exports = execute;