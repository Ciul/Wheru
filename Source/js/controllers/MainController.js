define([
	'controllers/controllers',
	'leaflet',
	'services/FourSquareService'
	], function(controllers, leaflet) {
		controllers.controller('MainController', ['$scope', 'FourSquare', '$rootScope',
			function($scope, $FourSquare, $rootScope) {
				// Set page title to Home.
				$rootScope.pageTitle = 'Wheru :: Home';
				// Load FourSquare service on $scope.
				$scope.FourSquare	= $FourSquare;
				// Trending places.
				$scope.places			= [];
				// Map markers for each Place.
				$scope.placesMarkers	= [];
				// Flags
				$scope.flags = {
					searched:	false,
					searching:	false
				};
				// Connect to FourSquare app and request permissions.
				$scope.connect = function() {
					if (!$scope.FourSquare.connected)
						$scope.FourSquare.connect();
				};
				
				var CloudMadeApiKey		= '457738a985034df2833a7873ac048434'; // http://cloudmade.com/
				
				// Map stuff
				var popup			= leaflet.popup(),
					searchCircle;
				
				// Leaflet map.
				$scope.map = map = leaflet.map('map')
					.setView([4.62,-74.12], 15)
					.whenReady(function() {
						this.locate({
							setView: true
						});
					});
				
				
				// Initialize map.
				leaflet.tileLayer('http://{s}.tile.cloudmade.com/'+ CloudMadeApiKey +'/997/256/{z}/{x}/{y}.png', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
					maxZoom: 18
				}).addTo(map);
				
				
				function onMapClick(e) {
					// If not connected to FourSquare yet, then connect.
					if (!$scope.FourSquare.connected)
						$scope.FourSquare.connect();
					else {
						// If connected then go ahead and search trending places.
						$scope.places	= $scope.FourSquare.trendings(String.from(e.latlng.lat) + ',' + String.from(e.latlng.lng));
						// Map search is now dirty.
						$scope.searched	= true;
					}
					
					// If first time searching create search scope circle, otherwise just update it's position.
					if (!$scope.searched) {
						searchCircle = leaflet.circle([e.latlng.lat, e.latlng.lng], 2000, {
							fillOpacity: 0
						}).addTo(map);
					} else {
						searchCircle.setLatLng([e.latlng.lat, e.latlng.lng]);
					}
				}
				// Map click event.
				map.on('click', onMapClick);
				
				// View a place on the map.
				$scope.viewMarker = function(index) {
					$scope.placesMarkers[index].openPopup();
				}
				
				// Add/Remove markers according to trending places found.
				function updatePlaceMarkers(newPlaces, oldPlaces) {
					if (oldPlaces == newPlaces)
						return;
					
					// Remove old places
					var i = oldPlaces.length;
					while (i--) {
						map.removeLayer($scope.placesMarkers[i]);
						$scope.placesMarkers.pop();
					}
					
					// Create new markers for places.
					i = newPlaces.length;
					while (i--) {
						// Create marker and add it to map.
						var marker = leaflet.marker(
							[newPlaces[i].location.lat, newPlaces[i].location.lng],
							{
								riseOnHover:	true
							}
						)
						.bindPopup('<h6>' + newPlaces[i].name + '</h6>')
						.addTo(map);
						// Save reference for marker.
						$scope.placesMarkers.unshift(marker);
					}
				}
				window.s = $scope;
				// Listen for places changes.
				$scope.$watch('places', updatePlaceMarkers);
				
			}
		]);
});