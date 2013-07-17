define(['services/services', 'mootools'], function(services) {
	services.service('FourSquare', ['$rootScope', '$http',
		function($rootScope, $http) {
			var FourSquareClientID	= 'HLNS3S5WPCAFG4TAGAPUAUKQSU5F25UTBGZZJPDHUSAUAHWO'; // http://foursquare.com
			
			var tokenFourSquare = new Class({
				
				initialize: function(clientID) {
					this.clientID		= clientID;
					this.connected		= false;
					this.oauth_token	= null;
					
					this.$http			= $http;
				},
				
				// Connect to FourSquare App
				connect: function(redirect_uri) {
					var $self = this; // Keep reference for easier binding.
					
					(!redirect_uri)
						redirect_uri = location.origin + location.pathname + 'auth/auth.html';
					
					var authenticate_uri = 'https://foursquare.com/oauth2/authenticate?' +
											'client_id=' + this.clientID +
											'&response_type=token' +
											'&redirect_uri=' + redirect_uri;
					
					var W = window.open(authenticate_uri, '_blank', 'menubar=no,toolbar=no');
					
					// Listen to messages
					var listener =  function(e) {
						// Only allowed to be opened within same origin.
						if (e.event.origin != location.origin)
							return false;
						
						var data = JSON.decode(e.event.data);
						if (data.success) {
							$rootScope.$apply(function() {
								$self.connected		= true;
								$self.oauth_token	= data.access_token;
							});
						}
						
						// Remove listener event since no further needed.
						window.removeEvent('message', listener);
					};
					
					window.addEvent('message', listener);
				},
				
				// Find Trending Places
				trendings: function(ll) {
					ll = !!ll ? ll : null;
					var $self = this; // For easier binding.
					
					var parameters = {
						callback:		'JSON_CALLBACK',
						oauth_token:	this.oauth_token,
						ll:				ll,
						v:				'20130716',
						limit:			50,
						radius:			2000
					};
					
					var trendings = [];
					
					this.$http({
						method: 'JSONP',
						url:	'https://api.foursquare.com/v2/venues/trending',
						params:	parameters
					})
					.success(function(data, status, headers, config) {
						console.log(data.response);
						if (data.meta.code == 200) {
							angular.copy(data.response.venues, trendings);
						}
					})
					.error(function(data, status, headers, config) {
						
					});
					
					return trendings;
				}
				
			});
			
			return new tokenFourSquare(FourSquareClientID);
		}
	]);
});