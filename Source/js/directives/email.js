define(['directives/directives'], function(directives) {
	directives.directive('email', function() {
		return {
			restrict:	'E',
			template:	'<a data-ng-class="class" data-ng-href="mailto:{{email}}">{{email}}</div>',
			replace:	true,
			scope:		{/* isolated scope */},
			link:	function(scope, element, attrs) {
				scope.email		= attrs.local.concat('@', attrs.domain); // Assign {local}@{domain} to scope.email.
				scope['class']	= attrs['class'];
			}
		}
	});
});