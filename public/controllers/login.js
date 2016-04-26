(function() {
    angular.module('login')
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/', {
                    templateUrl: '/profile',
                    controller: 'SignupForm',
                    controllerAs: 'signup',
                    caseInsensitiveMatch: true
                })
                .when('/login', {
                    templateUrl: '/views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login',
                    caseInsensitiveMatch: true
                })
                .otherwise({
                    templateUrl: '/views/landing.html',
                    controller: 'IndexController',
                    controllerAs: 'index'
                });

            $locationProvider.html5Mode(true); //Use html5Mode so your angular routes don't have #/route
        }])
        .controller('LoginController', ['$http', '$scope', function($http, $scope) {
            // Custom Login functionality
        }])
        .controller('IndexController', ['$http', '$scope', function($http, $scope) {
            // Custom Index functionality
             // $scope.message = "howya"; 
        }])
        .controller('SignupController', ['$http', '$scope', function($http, $scope) {
             // $scope.message = "howya";    
                }])
        .controller('LoginForm', ['$http', '$scope', function($http, $scope) {
            $scope.login = function() {
                $http
                    .post('/login', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                    });
            }
            $scope.connect = function() {
                $http
                    .post('/connect/local', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                    });
            }
        }])
        .controller('SignupForm', ['$http', '$scope', function($http, $scope) {
            $scope.signup = function() {
                // message
                $scope.message = "howya";
                console.log("sdfsdf");
                $http
                    .post('/signup', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                    });
            }
        }])
})();