var DepartmentController = function($scope, $http) {

    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.department = {
        currentAdminEmail: '',
        toAddDepartmentName: '',
        toAddDepartmentDesc: ''
    };

    var getRegistrationRequest = function() {

        return {
            method: 'POST',
            url: '/post/department',
            headers: { 'Content-type': 'application/json' },
            data: $scope.department
        };

    };

    var registrationSuccess = function() {

    };

    var registrationError = function() {

    };

    $scope.validCurrentAdminEmail = function() {
        return validateEmail($scope.department.currentAdminEmail);
    };

    $scope.registerDepartment = function() {
        $http(getRegistrationRequest()).then(registrationSuccess, registrationError);
    };

};
empDataMantSystem.controller('DepartmentController', ['$scope', '$http', DepartmentController]);