define(['controllers/controllers'],
  function(controllers) {
    controllers.controller('AboutController', ['$scope', '$rootScope',
      function($scope, $rootScope) {
		$rootScope.pageTitle = 'Wheru :: About';
    }]);
});