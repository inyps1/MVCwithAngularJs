
angular.module('MyApp') // extending from previously created angular module in the first part  
    .controller('Part4Controller', function ($scope, EmployeeService) {
        $scope.Employees = null;
        EmployeeService.GetEmployeeList().then(function (d) {
            $scope.Employees = d.data;
            console.log(d.data);
        }, function (error) {
            alert('Error !');
        });
    })
    .factory('EmployeeService', function ($http) {
        var fac = {};
        fac.GetEmployeeList = function () {
            return $http.get('/Data/GetEmployeeList')
        }
        return fac;
    });