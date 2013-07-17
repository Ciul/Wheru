define(['directives/directives'],
	function(directives) {
		directives.directive('alertBar', ['$parse', function($parse) {
			return {
				restrict:	'A',
				template:	'<div data-alert class="alert-box alert" data-ng-show="errorMessage">' +
							'{{errorMessage}}' +
							'<a href="#" data-ng-click="hideAlert() class="close">&times;</a>' +
							'</div>',
				link:		function(scope, elem, attrs) {
					var alertMessageAttr = attrs['alertmessage'];
					scope.errorMessage = null;
					
					scope.$watch(alertMessageAttr, function(newVal) {
						scope.errorMessage = newVal;
					});
					
					scope.hideAlert = function() {
						scope.errorMessage = null;
						// Also clear the error message on the bound variable.
						// Doing this so that if the same error happens again
						// the alert bar will be shown again next time.
						$parse(alertMessageAttr).assign(scope, null);
					};
				}
			};
		}]);
	}
);