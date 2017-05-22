(function () {

   

    var app = angular.module('MyApp', ['ngRoute']);

    app.controller('HomeController', function ($scope) {

        $scope.Message = "Yahoo !!!! We have successfully done our first part";

    });

})();