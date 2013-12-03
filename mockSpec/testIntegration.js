var assert = require('assert');
var test = require('../test');
var mock = require('../mock');

(function clearCache() {
	Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; });
})();

console.log('mock');

(function(){
	console.log('an object');
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


(function foo(){
	console.log('violating function throws with minium stack trace');

	var sut = mock();
	var error;
	var expectedTrace;
	try {
		/*var error = new Error('foo');
		
		console.log(expectedTrace);
		*/sut();

	}
	catch(e) {
		error = e; 
		
	 console.log(error.stack);
	}

	test('throws with minimum stack trace',function() {
		assert.equal('som error msg',error);
	});


})();
