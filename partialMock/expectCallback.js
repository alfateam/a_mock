function expectCallback(index, mockContext, callbackMock) {
	var newHasFunctionArgument = require('./newHasFunctionArgument');
	var newKeepCallback = require('./newKeepCallback');
	var expectCore = require('./expectCore');

	mockContext.expectedCallbacks.push(newKeepCallback(index, callbackMock));
	hasFunctionArgument = newHasFunctionArgument(index);
	return expectCore(hasFunctionArgument, index, mockContext);
}

module.exports = expectCallback;