var DepartmentController = function($scope, $http) {

    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.departmentList = null;

    $scope.department = {
        currentAdminEmail: '',
        toAddDepartmentName: '',
        toAddDepartmentDesc: ''
    };

    var getDepartmentListRequest = function(){
        return {
            method: 'GET',
            url:'/rest/departments',
            headers: { 'Content-type': 'application/json' },
        }
    }

    var getRegistrationRequest = function() {

        return {
            method: 'POST',
            url: '/post/department',
            headers: { 'Content-type': 'application/json' },
            data: $scope.department
        };

    };


    var getDepartments = function(){
        $http(getDepartmentListRequest()).then(getDepartmentSuccess,getDepartmentError);
    }

    var getDepartmentError = function(){

    };

    var getDepartmentSuccess = function(departments){
        $scope.departmentList = departments.data.data;
        console.log($scope.departmentList);
    };

    var registrationSuccess = function() {
        window.location = "#/config-add-department";
    };

    var registrationError = function() {

    };

    $scope.validCurrentAdminEmail = function() {
        return validateEmail($scope.department.currentAdminEmail);
    };

    $scope.registerDepartment = function() {
        $http(getRegistrationRequest()).then(registrationSuccess, registrationError);
    };

    getDepartments();

};
empDataMantSystem.controller('DepartmentController', ['$scope', '$http', DepartmentController]);