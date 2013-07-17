define(['services/services'],
	function(services) {
		services.factory('Persona', ['$resource', function($resource) {
			return $resource(
				'personas/:username/:action',
				{
					username:	'@username',
					action:		'@action'
				},
				{
					login:		{method: 'POST'},
					isLoggedIn:	{
						method: 'GET',
						params:	{
							action: 'isloggedin'
						}
					},
					logout:		{method: 'GET'},
					getUser:	{
						method: 'POST',
						params:	{
							action: 'retrieve'
						},
						isArray: false
					}
				}
			);
		}]);
	}
);
