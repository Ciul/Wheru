// The app/scripts/app.js file, which defines our AngularJS app
define([
	'angular',
	'angularResource',
	'angularCookies',
	'controllers/controllers',
	'services/services',
	'filters/filters',
	'directives/directives'
	],
	function(angular) {
		var module;
		try {
			// Retrieve Wheru module if already defined.
			module = angular.module('Wheru');
		} catch(e) {
			// If Wheru module is not already defined then it needs to be initialized.
			module = angular.module('Wheru', ['ngResource', 'ngCookies', 'controllers', 'services', 'filters', 'directives']);
		} finally {
			return module;
		};		
	}
);