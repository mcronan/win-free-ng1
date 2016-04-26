var winApp = angular.module('winApp', ['ngResource', 'ngRoute']);

winApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider    
                .when('/profile', {
                    templateUrl: 'profile',
                    controller: 'profileController',
                });
        // $locationProvider.html5Mode(true);
}]);


winApp.factory('winFactory', function($resource) {
	var model = $resource('/api/users');
	return {
		model : model,
		users : model.query()
	}
})


winApp.controller('landingController', ['$scope', function($scope) {
	$scope.theMessage = "The Landing Controller";
	console.log("landingController")
}]);


//  Signup Controller
winApp.controller('signupForm', ['$http', '$scope', '$location', function($http, $scope,$location) {
			console.log("signup boom");
			$scope.message = "howya"

            $scope.signup = function() {
                console.log("Signup Func boom");
                $http
                    .post('/signup', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                        window.location="http://localhost:3500/profile"
                    });
            }
        }])


//  Login Controller
winApp.controller('loginForm', ['$http', '$scope', '$location',function($http, $scope, $location) {
            $scope.message = "howya";
			console.log("Login Boom");
            $scope.login = function() {
                // message
                console.log("Login Func Boom");
                $http
                    .post('/login', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                    });   

            }
        }])

winApp.controller('profileController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            $scope.message = "profile controller"
            //Custom Profile functionality
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data; //Expose the user data to your angular scope
                });
        }])

winApp.controller('aboutController', function($scope) {
	$scope.message = "About Controller"
});

winApp.controller('formController', function($scope,winFactory) {

	$scope.users = winFactory.users;
	$scope.message = "Form Controller"

	// $scope.addUser = function() {
	// 	console.log("addUser funciton")
	// 	var userSave = new winFactory.model(this.newestUser)
	// 		userSave.$save(function(returnData) {
	// 			console.log(returnData)
	// 			winFactory.users.push(returnData)
	// 		})
	// }
});

winApp.controller('videoController', function($scope, $timeout, $location) {
	$scope.message = "Video Controller";

	$scope.timeInS = 3000;
	// countdown timer
	var countDown = function() {
		var theTime = $scope.timeInS -= 100;
		var timer = $timeout(countDown, 100)
			if(theTime === 0) {
				console.log("done")
				// $location.path("reference")
				window.location="http://localhost:3500/reference"
			}
	}

	$timeout(countDown, 100)
});

// winApp.controller('profileController', function($scope, winFactory) {
// 	// $scope.users = winFactory.users;

// 	$scope.message = "Profile Controller";
// 	// $scope.email = user.local.email;
// });


winApp.controller('referenceController', function($scope) {
	// $scope.random = Math.floor((Math.random() * 1000000) + 1)

	 makeId = function()  {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 8; i++ )
		    text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
}

$scope.random = makeId()

});


