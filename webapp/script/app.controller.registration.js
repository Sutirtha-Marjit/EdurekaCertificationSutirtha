var RegistrationController = function($scope, $http) {



    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var getCorrectAge = function(dateString){
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    var validDate = function(str) {
        
        return !isNaN((new Date(str)).getTime());
    }

    var getDepartmentSuccess = function(departments){
        $scope.departmentList = departments.data.data;
        console.log($scope.departmentList);
    };

    var getDepartmentListRequest = function(){
        return {
            method: 'GET',
            url:'/rest/departments',
            headers: { 'Content-type': 'application/json' },
        }
    }

    var getDepartments = function(){
        $http(getDepartmentListRequest()).then(getDepartmentSuccess,function(){});
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
        window.location = "/#/update";
    };

    var registrationError = function() {
        console.log('error');
    };

    $scope.validDOB = false;

    $scope.$watch('emp.dob',function(newVal,oldVal){

        $scope.validDOB = validDate(newVal);
    });
    
    $scope.departmentList = [];

    $scope.emp = {
        name: "",
        dob: "",
        email: "",
        sex: "Not to disclose",
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

    getDepartments();

};
empDataMantSystem.controller('RegistrationController', ['$scope', '$http', RegistrationController]);

/*
if ($scope.emp.name.length > 0 && $scope.emp.sex.length >0 ) {
                return true;
            }
*/