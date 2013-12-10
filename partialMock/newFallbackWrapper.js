function _new(originalFallback) {

	var fallback = originalFallback;

	function execute() {
		Error.stackTraceLimit = Error.stackTraceLimit + 2;
		try {
			return fallback.apply(null,arguments);	
		}
		catch (e) {			
			if (e.name = 'Mock Error') {
  				e.stack = e.name + ': ' + e.message + '\n' + trace();

			}
			throw e;
		}
		finally {
			Error.stackTraceLimit = Error.stackTraceLimit - 2;
		}
		
	}

	execute.setFallback = function(fallback2) {
		fallback = fallback2;
	};

	function trace() {
		try	{
			throw new Error();

		}
		catch(e) {
			var lines = e.stack.split('\n');				
			lines.splice(0,4);
			var stack = lines.join('\n');
			return stack;
		}
	}

	return execute;
}

module.exports = _new;