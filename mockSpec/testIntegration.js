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

	var red, green, reset;
	red   = '\u001b[31m';
	green = '\u001b[32m';
	reset = '\u001b[0m';

	var err = new Error;
  	err.name = 'MockError';
  	err.message = 'unexpected arguments 1,2';
  	
  	try {
  		throw err;
  	}
  	catch(e) {
  		
  		var lines = e.stack.split('\n');

		lines.splice(0,3);
	
		var stack = lines.join('\n');

  		err.stack = e.name + ': ' + e.message + '\n' + stack;
  	}

  	//console.log(stack);
  	//err.stack = err.name + ': ' + err.message + '\n' + '    at stack 1\n    at 2\n    at 3';


  
  //Error.captureStackTrace(err, arguments.callee);
  try {
  	throw err;
  }
  catch(e) {
  	console.log(e.stack);
  }

  try {
  	var c = new undefined;
  }
  catch(e) {
  	console.log(e.stack);
  }
  //this.error(err.stack);
  /*
	var error = new Error('foo bar.');
	error.message = 'msg';
	error.stack = 'this is trace.';
	throw error;
	try {
		var error = new Error('foo');
		
		console.log(expectedTrace);
		sut();

	}
	catch(e) {
		error = e; 
		
	 console.log(error.stack);
	}

	test('throws with minimum stack trace',function() {
		assert.equal('som error msg',error);
	});
*/

})();
