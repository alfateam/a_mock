function newResolver() {

	var _onSuccess,
		successArgs,
		_onError,
		errorArgs;

	function resolver(onSuccess, onError) {		
		_onSuccess = onSuccess;	
		_onError = onError;	
		invokeSuccess() || invokeError();
	}

	resolver.resolve = function() {
		successArgs = arguments;
		invokeSuccess();			
	};	

	function invokeSuccess() {
		if (_onSuccess && successArgs) {
			_onSuccess.apply(null,successArgs);
			return true;
		}
	}

	resolver.reject = function() {
		errorArgs = arguments;
		invokeError();
	};

	function invokeError() {
		if (_onError && errorArgs)
			_onError.apply(null,errorArgs);
	}

	return resolver;

}

module.exports = newResolver;