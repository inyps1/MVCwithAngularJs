
var app =angular.module('MyApp');

app.controller('Part6Controller', function ($scope, RegistrationService) {
    //Default Variable
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.submittedText = "Save";
    $scope.submitted = false;
    $scope.message = "";
    $scope.isFormValid = false;
    $scope.User = {
        Username: '',
        Password: '',
        FullName: '',
        Email: '',
        Gender:''

    };
    //Check form validation // here f1 is our form name
    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });
    //save Data
    $scope.SaveData = function (data) {
        if ($scope.submittedText == "Save") {
            $scope.submitted = true;
            $scope.message = "";
            if ($scope.isFormValid) {
                $scope.submittedText = "PLease Wait....";
                $scope.User = data;
                RegistrationService.SaveFormData($scope.User).then(function (d) {
                    alert(d.data);
                    if (d.data == "Success") {
                        //have to clear form
                        ClearForm();
                    }
                    $scope.submittedText = "Save";
                });
            }
            else {
                $scope.message = 'Please fill required fields value';
            }
        }
    };
    //clear Form
    function ClearForm() {
        $scope.User = null;
        $scope.f1.$setPristine(); // here f1 our form name
        $scope.submitted = false;
    };
})
 .factory('RegistrationService', function ($http, $q) {
     //here $q is a angular service with help us to run asynchronous function and return result when procesing done.

     var fac = {};
     fac.SaveFormData = function (data) {
         var defer = $q.defer();
         $http({
             url: '/Data/Register',
             method: 'POST',
             data: JSON.stringify(data),
             headers: { 'content-type': 'application/json' }
         }).then(function mySucces(d) {
             defer.resolve(d);
         }, function myError(e) {
             alert('Error !');
             defer.reject(e);
         });
         //$http({
         //    url: '/Data/Register',
         //    method: 'POST',
         //    data: JSON.stringify(data),
         //    headers: {'content-type':'application/json'}
         //}).success(function (d) {
         //    //success callback
         //    defer.resolve(d);
         //}).error(function (e) {
         //    //failed callback
         //    alert('Error !');
         //    defer.reject(e);
         //});
         return defer.promise;
     };
     return fac;
 });