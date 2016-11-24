var EmployeeListController = function($scope, $http) {

    $scope.employeeList = [];
    $scope.selectedIndex = null;
    $scope.operationON = false;
    
    var getEmployeeListRequest = function(){
        return {
            method: 'GET',
            url:'/rest/employees',
            headers: { 'Content-type': 'application/json' },
        }
    }

    var getEmpListSuccess = function(empList){
        console.log(empList);
        $scope.employeeList = empList.data.data;
    };

    var getEmpListError = function(error){

    };

    $scope.operate = function(mode,i){
        switch(mode){
            case "del":
            var ans = confirm('Are you really want to delete the employee"'+$scope.employeeList[i].name+'"?');
            break;

            case "edit":
            break;

            case "show":
            break;
            
        }
    };

    $http(getEmployeeListRequest()).then(getEmpListSuccess).then(getEmpListError);

    

    

}

empDataMantSystem.controller('EmployeeListController', ['$scope', '$http', EmployeeListController]);