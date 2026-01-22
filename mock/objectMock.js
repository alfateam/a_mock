var newMockContext = require('./mockContext');
var newPartialMock = require('../partialMock');

function collectPropertyNames(subject) {
	var names = {};
	for (var name in subject) {
		names[name] = true;
	}
	var proto = Object.getPrototypeOf(subject);
	while (proto && proto !== Object.prototype && proto !== Function.prototype) {
		var props = Object.getOwnPropertyNames(proto);
		for (var i = 0; i < props.length; i++) {
			var prop = props[i];
			if (prop === 'constructor' || names[prop])
				continue;
			var desc = Object.getOwnPropertyDescriptor(proto, prop);
			if (desc && typeof desc.value === 'function')
				names[prop] = true;
		}
		proto = Object.getPrototypeOf(proto);
	}
	return Object.keys(names);
}

function _new(subject,mockContext,parent) {
	var newObjectMock = require('./objectMock');

	var mockContext = newMockContext(mockContext);
	var mock = {};
	mock.verify = mockContext.verify;
	if (subject instanceof Function) {
		mock = newPartialMock(subject, parent);		
		mockContext.verify.add(mock.verify);
	}
	if (!(subject instanceof Object))
		return mock;
	var propertyNames = collectPropertyNames(subject);
	for(var i = 0; i < propertyNames.length; i++) {
		var propertyName = propertyNames[i];
		if (Object.prototype.hasOwnProperty.call(mock, propertyName))
			continue;
		var property = subject[propertyName];
		mock[propertyName] = newObjectMock(property,mockContext,subject);
	}
	return mock;
}

module.exports  = _new
