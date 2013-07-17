define(['controllers/controllers', 'services/FourSquareService'], function(controllers) {
	controllers.controller('MainController', ['$scope', 'FourSquare',
		function($scope, $FourSquare) {
			$scope.FourSquare	= $FourSquare;
			
			$scope.debug		= false;
			$scope.toggledebug = function() {
				$scope.debug = !$scope.debug;
			};
			
			$scope.$on('placeClicked', function(event, place) {
				$scope.$broadcast('placeMarker', place);
			});
			
			$scope.$on('mapClicked', function(event, e) {
				$scope.$broadcast('mapSearch', e);
			});
		}
	]);
});