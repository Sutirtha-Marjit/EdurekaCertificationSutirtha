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
        
    };

    var registrationSuccess = function() {
        
        window.location.href = "#/config-list-of-departments";
    };

    var registrationError = function() {

    };

    $scope.deleteDepartment = function(i){
        var ans = confirm('Really want to remove '+$scope.departmentList[i].department_name);
        if(ans){

            $http({
            url:'/remove/department',
            method:'POST',
            data:{id:$scope.departmentList[i]._id},
            headers: { 'Content-type': 'application/json' }
        }).then(function(dataObject){
            alert(dataObject.data.data.status.department_name+" is removed");
            getDepartments();
        }).then(function(){
            
        });

        }
        
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