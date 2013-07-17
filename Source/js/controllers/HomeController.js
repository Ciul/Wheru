define(['controllers/controllers'],
	function(controllers) {
		controllers.controller('HomeController', ['$scope', '$rootScope', '$route', '$log', '$location', 
			function($scope, $rootScope, $route, $log, $location) {
				// $location.path('otra');
				$rootScope.pageTitle = 'Wheru :: Home';
			}
		]);
});