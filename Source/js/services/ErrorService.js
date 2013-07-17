define(['services/services'], 
	function(services) {
		services.factory('ErrorService', function() {
			return {
				errorMessage: null,
				setError: function(msg) {
					this.errorMessage = msg;
				},
				clear: function() {
					this.errorMessage = null;
				}
			};
		});
	}
);