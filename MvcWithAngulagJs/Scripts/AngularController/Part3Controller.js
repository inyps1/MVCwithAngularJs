angular.module('MyApp')
    .controller('Part3Controller', function ($scope, LoginService) {
        $scope.IsLoggedIn = false;
        $scope.Message = '';
        $scope.Submitted = false;
        $scope.IsFormValid = false;

        $scope.LoginData = {
            Username: '',
            Password: ''
        };

        //check is Form valid or not
        $scope.$watch('f1.$valid', function (newVal) {
            $scope.IsFormValid = newVal;
        });
        $scope.Login = function () {
            $scope.Submitted = true;
            if ($scope.IsFormValid) {
                LoginService.GetUser($scope.LoginData).then(function (d) {
                    if (d.data.Username != null) {
                        $scope.IsLoggedIn = true;
                        $scope.Message = "Successfully login done. Welcome " + d.data.FullName;
                    }
                    else {
                        alert('Invalid Credentials');
                    }
                });
            };
        };

    })
    .factory('LoginService', function ($http) {
        var fac = {};
        fac.GetUser = function (d) {
            return $http({
                url: '/Data/UserLogin',
                method: 'POST',
                data: JSON.stringify(d),
                headers: {'content-type':'application/json'}
            });
        };
        return fac;
    });