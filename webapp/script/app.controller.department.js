var DepartmentController = function($scope, $http) {

    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.currentAdminEmail = '';
    $scope.toAddDepartmentName = '';
    $scope.toAddDepartmentDesc = '';

    $scope.validCurrentAdminEmail = function() {
        return validateEmail($scope.currentAdminEmail);
    };

    


};
empDataMantSystem.controller('DepartmentController', ['$scope', '$http', DepartmentController]);