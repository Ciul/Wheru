define([
	'controllers/controllers',
	'leaflet'
	], function(controllers, leaflet) {
		controllers.controller('MapController', ['$scope',
			function($scope) {
				var CloudMadeApiKey		= '457738a985034df2833a7873ac048434'; // http://cloudmade.com/
				
				$scope.map = map = leaflet.map('map')
					.setView([4.62,-74.12], 15)
					.whenReady(function() {
						this.locate({
							setView: true
						});
					});
				
				leaflet.tileLayer('http://{s}.tile.cloudmade.com/'+ CloudMadeApiKey +'/997/256/{z}/{x}/{y}.png', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
					maxZoom: 18
				}).addTo(map);
				
				var popup = L.popup();

				function onMapClick(e) {
					if (!$scope.FourSquare.connected)
						$scope.FourSquare.connect();
					else
						$scope.$emit('mapClicked', e);
				}
				
				map.on('click', onMapClick);
				
				$scope.$on('placeMarker', function(event, place) {
					
					var marker = leaflet.marker(
						[place.location.lat, place.location.lng],
						{
							riseOnHover:	true
						}
					).addTo(map);
						
					marker.bindPopup(
						'<h6>' +  place.name +'</h6>'
					).openPopup();
						
					// marker.bindLabel(place.name);
				});
			}
		]);
});