var RegistrationController = function($scope, $http) {



    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var invalidDate = function(str) {

        return isNAN((new Date(str)).getTime());
    }

    var getRegistrationRequest = function() {

        return {
            method: 'POST',
            url: '/post/register',
            headers: { 'Content-type': 'application/json' },
            data: $scope.emp
        };

    };

    var registrationSuccess = function() {

    };

    var registrationError = function() {
        console.log('error');
    };

    //$scope.departmentList = ["Human Resource", "Finance", "Marketing & Sales", "Web and Communication", "Technical", "Admin", "Corporate affairs"];
    $scope.departmentList = [];

    $scope.emp = {
        name: "",
        dob: "",
        email: "",
        sex: "",
        department: ""
    };

    $scope.registrationValid = function() {

        return true;

    };

    $scope.register = function() {
        if ($scope.registrationValid()) {
            var reqObj = getRegistrationRequest();
            $http(reqObj).then(registrationSuccess, registrationError);

        }
    };

};
empDataMantSystem.controller('RegistrationController', ['$scope', '$http', RegistrationController]);

/*
if ($scope.emp.name.length > 0 && $scope.emp.sex.length >0 ) {
                return true;
            }
*/