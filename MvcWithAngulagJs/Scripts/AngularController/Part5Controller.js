
angular.module('MyApp')
    .controller('Part5Controller', function ($scope, LocationService) {
        $scope.CountryId = null;
        $scope.StateId = null;
        $scope.CountryList = null;
        $scope.StateList = null;

        $scope.StateTextToShow = '-- Select State --';
        $scope.Result = "";

        //populate country
        LocationService.GetCountry().then(function (d) {
            $scope.CountryList = d.data;
        }, function (error) {
            alert('Error !');
        });
        //function for populate state
        $scope.GetState = function () { //this function will be called after country selection
            //alert('getstate called' + $scope.CountryId);
            $scope.StateId = null; //clear selected state if any
            $scope.StateList = null;// clear previously loaded states
            $scope.StateTextToShow = "Please wait........";//this will show until load states from databases
            //load states
            LocationService.GetState($scope.CountryId).then(function (d) {
                $scope.StateList = d.data;
                $scope.StateTextToShow = "-- Select State --";
            }, function (error) {
                alert('Error !');
            });
        };
        //function for show result
        $scope.ShowResult = function () {
            $scope.Result = "Selected Country Id :"+$scope.CountryId + " State Id: "+$scope.StateId;
        };
    })
    .factory('LocationService', function ($http) {
        var fac = {};
        fac.GetCountry = function () {
            return $http.get('/Data/GetCountries');
        };

        fac.GetState = function (countryId) {
            
            return $http.get('/Data/GetStates?countryId=' + countryId);
        };
        return fac;
    })