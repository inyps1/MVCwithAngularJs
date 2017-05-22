
angular.module('MyApp')
    .controller('Part7Controller', function ($scope, OrderService) {
        $scope.Orders = [];

        OrderService.GetOrders().then(function (d) {
            $scope.Orders = d.data;
        });
    })
    .factory('OrderService', function ($http) {
        var fac = {};
        fac.GetOrders = function () {
            return $http.get('/Data/CustomerOrders');
        };
        return fac;
    });