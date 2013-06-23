function isEqualArg(x,y) {
	if (isArray(x) && isArray(y)) 
		return isEqualArray(x,y);
	return isEqualStruct(x,y);
}

function isArray(x) {
	if (Array.isArray) {
		return Array.isArray(x);
	}
	return Object.prototype.toString.call(x) === '[object Array]';
}

function isEqualArray(x,y) {
	return x.length == y.length && equalContents();

	function equalContents() {
		var xElement, yElement;
		for (var i = 0; i < x.length; i++) {
			xElement = x[i];
			yElement = y[i];
			if (!isEqualArg(xElement,yElement))
				return false;
		};
		return true;
	}
}

function isEqualStruct(x,y) {
	if (isValueType(x) || isValueType(y))
		return x === y;
	var xLength = Object.keys(x).length;
	var yLength = Object.keys(y).length;
	if (xLength == 0 && yLength == 0)
		return x === y;
	return (xLength == yLength) && equalProperties();

	function equalProperties() {
		for (var property in x) {
			if (! (property in y))
				return false;
			xPropValue = x[property];
			yPropValue = y[property];
			if (! isEqualStruct(xPropValue,yPropValue))
				return false;
		};
		return true;
	}
}

function isValueType(x) {
	return (x === null) || (typeof x !== 'object');
}

module.exports = isEqualArg;