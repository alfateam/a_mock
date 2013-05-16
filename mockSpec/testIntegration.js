var assert = require('assert');
var test = require('../test');
var mock = require('../mock');

(function clearCache() {
	Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; });
})();


(function(){
	console.log('mock');
	var realName = 'Alfonzo';
	function newCustomer() {

		var c = {};
		var _name = realName;

		c.getName = function () 
		{
			return _name;
		};

		c.realName = 'propValue';
		return c;
	}


	var customer = newCustomer(realName);
	var customerMock = mock(customer);
	var expected = {};
	customerMock.getName.expect().return(expected);

	var returned = customer.getName();
	var returned2 = customer.getName();

	test('it should first return from mock',function() {
		assert.equal(returned,expected);
	});

	test('it should secondly return from real object',function() {
		assert.equal(returned2,realName);
	});

	test('it verify should return true',function() {
		assert.ok(customerMock.verify());
	});

})();
