var RegistrationController = function($scope, $http) {

    $scope.departmentList = ["Human Resource", "Finance", "Marketing & Sales", "Web and Communication", "Technical", "Admin", "Corporate affairs"];
    $scope.empName = "";
    $scope.empDOB = "";
    $scope.empEmail = "";
    $scope.gender = "";
    $scope.department = "";

};
empDataMantSystem.controller('RegistrationController', ['$scope', '$http', RegistrationController]);