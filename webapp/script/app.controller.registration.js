var RegistrationController = function($scope, $http) {

    console.log($scope);
    
    $scope.departmentList = ["Human Resource", "Finance", "Marketing & Sales", "Web and Communication", "Technical", "Admin", "Corporate affairs"];
    $scope.empName = "";
    $scope.empDOB = "";
    $scope.empEmail = "";
    $scope.gender = "";
    $scope.department = "";

};
empDataMantSystem.controller('RegistrationController', ['$scope', '$http', RegistrationController]);