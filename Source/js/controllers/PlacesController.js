define(['controllers/controllers'], function(controllers) {
	controllers.controller('PlacesController', ['$scope',
		function($scope) {
			$scope.searched = false;
			$scope.places	= [];
			
			$scope.connect = function() {
				if (!$scope.FourSquare.connected)
					$scope.FourSquare.connect();
			};
			
			// search = function(oldVal, newVal) {
				// if (oldVal == newVal)
					// return;
				
				// if ($scope.FourSquare.connected)
					// $scope.places = $scope.FourSquare.trendings('4.6849,-74.14544');
			// };
			
			// Search for trending places after connecting.
			// $scope.$watch('FourSquare.connected', search);
			
			$scope.viewMarker = function(index) {
				$scope.$emit('placeClicked', $scope.places[index]);
			};
			
			$scope.$on('mapSearch', function(event, e) {
				console.log('Searching: ', String.from(e.latlng.lat) + ',' + String.from(e.latlng.lng));
				$scope.places	= $scope.FourSquare.trendings(String.from(e.latlng.lat) + ',' + String.from(e.latlng.lng));
				$scope.searched	= true;
			});
		}
	]);
});