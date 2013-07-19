// RequireJs Configuration.
requirejs.config({
	// By default load any module IDs from js/vendor
	baseUrl: 'js',
	waitSeconds: 15,
	paths: {
		angular:			'vendor/angular/angular.min',
		angularResource:	'vendor/angular/angular-resource.min',
		angularCookies:		'vendor/angular/angular-cookies.min',
		mootools:			'vendor/mootools/mootools-core.min',
		mootoolsMore:		'vendor/mootools/mootools-more.min',
		domReady:			'vendor/require/domReady',
		jquery:				'vendor/jquery/jquery.min',
		jquerync:			'vendor/jquery/jquery.noconflict',
		moofb:				'vendor/moofb/moofb',
		leaflet:			'http://cdn.leafletjs.com/leaflet-0.6.2/leaflet',
		modernizr:			'vendor/foundation/custom.modernizr',
		foundation:			'vendor/foundation/foundation.min',
		leafletPlugins:		'vendor/leaflet/plugins'
	},
	map: {
		'*': {
			'jquery' : 'jquerync' // When any requires jquery, retrieves jquerync instead.
		},
		'jquerync': {
			'jquery': 'jquery' // When jquerync requires jquery, retrieves real jquery.
		}
	},
	shim: {
		app: {
			deps: ['foundation', 'mootoolsMore']
		},
		foundation: {
			deps: ['jquery'],
		},
		angular: {
			deps:		['mootools', 'jquery'],
			exports:	'angular'
		},
		angularResource: {
			deps:		['angular']
		},
		angularCookies: {
			deps: ['angular']
		},
		mootools: {
			exports: 'MooTools',
			init: function() {
				// Add message native event to MooTools Element.NativeEvents. 
				Element.NativeEvents.message = 2;
			}
		},
		mootoolsMore: {
			deps: ['mootools']
		},
		jquery: {
			deps: ['mootools'] // Force jquery to always load after MooTools.
		},
		foundation: {
			deps: ['jquery'],
			init: function() {
				jQuery(document).foundation(); // Initialize foundation over the page.
			}
		},
		leafletPlugins: {
			deps: ['leaflet']
		},
		moofb:	{
			deps: ['mootools']
		}
	}
});

require([
	'angular',
	'app',
	'domReady',
	// 'services/userService',
	// 'controllers/RootController',
	'controllers/HomeController',
	'controllers/AboutController',
	'controllers/MainController',
	'controllers/MapController',
	'controllers/PlacesController',
	'directives/debug',
	'directives/email',
	'directives/icon',
	],
	function(angular, app, domReady) {
		
		app.config([
			'$routeProvider', '$httpProvider',
			function($routeProvider, $httpProvider) {
				// Setting Global requests headers
				$httpProvider.defaults.headers.common['X-XSRF-TOKEN'] = 'SAFE_TOKEN'; // This should be given from server side.
				
				// Define routes here
				$routeProvider.
					when('/', {
						templateUrl:		'views/home.html',
						controller:			'MainController'
					}).
					when('/about', {
						templateUrl:		'views/about.html',
						controller:			'AboutController'
					}).
					otherwise({
						redirectTo: '/'
					});
					
			}
		]);
		
		domReady(function() {
			angular.bootstrap(document, ['Wheru']);
			
			// The following is required if you want AngularJS Scenario tests to work
			$(document.html).addClass('ng-app: Wheru');
		});
		
	}
);