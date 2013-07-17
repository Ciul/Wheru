define(['directives/directives'], function(directives) {
	directives.directive('helpblock', ['$timeout', function($timeout) {
		return {
			restrict:	'A',
			// replace:	true,
			// transclude:	true,
			// scope:		{/* Isolated scope */},
			link:		function(scope, element, attrs) {
				scope.type		= attrs.type || 'error'; // Add alert-error class by default
				scope.hidden	= false; // Initially hidden
				scope.shown		= !scope.hidden; // Initially hidden
				var delay		= attrs.delay || 200; // Default delay for transitions is 200ms
				
				scope.hide = function() {
					scope.shown		= false;	// Transition opacity to 0
					$timeout(function() {
						scope.hidden	= true; // Then hide helpblock element
					}, attrs.delay);
				};
				
				scope.show = function() {
					scope.hidden	= false;	// Show helpblock element
					$timeout(function() {
						scope.shown	= true;		// Transition opacity to 1 
					}, 100); // Give a little time for fade in transition to apply correctly after element has appeared
				};
				
			},
			template:	'<div class="help-block alert alert-{{type}} fade flat" data-ng-class="{hidden: hidden, in: shown}" tabindex="-1">' +
						'<button type="button" class="close" data-ng-click="hide()" tabindex="-1">×</button>' +
						'<span data-ng-transclude></span>' +
						'</div>'
		};
	}]);
});