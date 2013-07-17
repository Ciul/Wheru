define(['services/services'], 
	function(services) {
		services.factory('Blog', ['$http',
			function($http) {
				// MooTools Class
				var BlogService = new Class({
					
					// $http:		$http,
					$baseUrl:	__app.webroot + 'blog',
					$posts:		[],
					
					initialize: function() {
						this.$http = $http;
					},
					
					get: function() {
						console.log('getting...');
					},
					
					query: function() {
						var posts = [];
						
						this.$http.get(this.$baseUrl, {
							headers: {
								SERVICE: true
							}
						})
						.success(function(response) {
							angular.copy(response, posts);
						});
						
						return posts;
					},
					
					save: function() {
						console.log('saving...');
					}
					
				});
				
				return new BlogService();
				
			}
		]);
	}
);