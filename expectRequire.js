var mod = require('module');
var partialMock = require('./partialMock/simple/newPartialMock')(mod._load);
var originalLoad = mod._load;
mod._load = loadHook;

function loadHook(request,parent,isMain) {
	return partialMock(request,parent,isMain);
}

function expect(request) {
	return partialMock.expect(request).expectAnything().expectAnything();
}

loadHook._aClearMocks = function(){	
	mod._load = originalLoad;
	if (mod._load._aClearMocks)
		mod._load._aClearMocks();
};

expect.clear = loadHook._aClearMocks;


module.exports = expect;