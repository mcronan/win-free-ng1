var winApp = angular.module('winApp', ['ngResource', 'ngRoute']);

winApp.config(function($routeProvider) {
	$routeProvider
	// .when('/', {
	// 	templateUrl : '/landing',
	// 	controller : 'landingController'
	// })
	.when('/about', {
		templateUrl : '/templates/sneaky',
		// controller : 'aboutController'
	})
});


winApp.factory('winFactory', function($resource) {

	var model = $resource('/api/users');

	return {
		model : model,
		users : model.query()
	}
})



winApp.controller('landingController', function($scope) {
	$scope.message = "The Landing Controller"
});

winApp.controller('aboutController', function($scope) {
	$scope.message = "About Controller"
});

winApp.controller('formController', function($scope,winFactory) {

	$scope.users = winFactory.users;

	$scope.message = "Form Controller"

	$scope.addUser = function() {
		console.log("addUser funciton")
		var userSave = new winFactory.model(this.newestUser)
			userSave.$save(function(returnData) {
				console.log(returnData)
				winFactory.users.push(returnData)
			})
	}
});

winApp.controller('videoController', function($scope, $timeout, $location) {
	$scope.message = "Video Controller"

	$scope.timeInS = 3000;
	// countdown timer
	var countDown = function() {
		var theTime = $scope.timeInS -= 100;
		var timer = $timeout(countDown, 100)
			if(theTime === 0) {
				console.log("done")
				// $location.path("/reference")
				window.location="http://localhost:3500/reference"
			}
	}

	$timeout(countDown, 100)


});