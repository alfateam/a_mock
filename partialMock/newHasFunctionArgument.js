// 
function isFunction(subject) {
	return Object.prototype.toString.call(subject) === '[object Function]';
}

function _new(index) {
	return function() {
		return isFunction(arguments[index]);
	};
}

module.exports = _new;