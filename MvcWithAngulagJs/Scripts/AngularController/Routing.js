angular.module('MyApp', ['ngRoute']) //ngRout is not required, I have added to make you understand in a single place
    .config(function ($routeProvider, $locationProvider) {
        //here we will write code for implement routing
        $routeProvider
            .when('/', {
                redirectTo: function () {
                    return '/home'
                }
            })
            .when('/home', {
                templateUrl: '/Template/Home.html',
                controller:'HomeController'
            })
            .when('/about', {
                templateUrl: '/Template/About.html',
                controller: 'AboutController'
            })
            .when('/order/:id', {
                templateUrl: '/Template/Order.html',
                controller: 'OrderController'
            })
            .otherwise({
                templateUrl: '/Template/Error.html',
                controller: 'ErrorController'
            })
        $locationProvider.html5Mode(false).hashPrefix('!');// this is for hashbang mode
    })
    .controller('HomeController', function ($scope) {
        $scope.Message = "This is HOME page";
    })
    .controller('AboutController', function ($scope) {
        $scope.Message = "This is About page";
    })
    .controller('OrderController', function ($scope, $routeParams) {
        // $routeParams used to get query string value
        $scope.Message = "This is ORDER page with query string id value "+$routeParams.id;
    })
    .controller('ErrorController', function ($scope) {
        $scope.Message = "404 NOT found";
    })