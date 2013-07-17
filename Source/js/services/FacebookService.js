define(['services/services', 'moofb'], function(services) {
	services.service('Facebook', ['$q', '$rootScope', function($q, $rootScope) {
		// Adds <div id="fb-root"></div> to the site; this is mandatory for FB Connect API to work.
		var fbroot = angular.element('<div id="fb-root"></div>');
		angular.element('body').append(fbroot);
		
		
		var deferred = $q.defer();
		
		var moofb = new MooFB.Base(__app.facebook.appId, {
			automatic: {
				fbroot: false // Handled by angular.element previously.
			},
			onLoad:	function() {
				$rootScope.$apply(function() {
					deferred.resolve(moofb);
				});
			}
		});
		
		// Append promise for further chaining if necessary.
		moofb['$deferred'] = deferred;
		
		return deferred.promise;
	}]);
});