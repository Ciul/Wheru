define(['directives/directives'], function(directives) {
	directives.directive('icon', function() {
		return {
			restrict:	'A',
			scope:		{/* isolate scope */},
			replace:	true,
			template:	'<span data-ng-class="klass"></span>',
			link:		function(scope, element, attrs) {
				var icon = 'icon-' + attrs.icon || attrs.type || attrs.name || '';
				scope.klass = (attrs['class'] || '').concat(' ', icon);
				
				// Change Icon
				scope.changeIcon = function(name) {
					if (angular.isString(name)) {
						var icon = 'icon-' + name;
						scope.klass = attrs['class'].concat(' ', icon);
					}
				}
			}
		};
	});
});