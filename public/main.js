var winApp = angular.module('winApp', ['ngResource', 'ngRoute']);

winApp.config(function($routeProvider) {
	$routeProvider
	// .when('/', {
	// 	templateUrl : '/landing',
	// 	controller : 'landingController'
	// })
	.when('/about', {
		templateUrl : '/templates/sneaky',
		controller : 'aboutController'
	})
});

winApp.controller('landingController', function($scope) {
	$scope.message = "The Landing Controller"
});

winApp.controller('aboutController', function($scope) {
	$scope.message = "About Controller"
});