var EmployeeListController = function($scope, $http) {

    $scope.employeeList = [];
    $scope.selectedIndex = null;
    $scope.operationON = false;
    
    var getEmployeeListRequest = function(){
        return {
            method: 'GET',
            url:'/rest/employees',
            headers: { 'Content-type': 'application/json' }
        }
    }

    var getEmpListSuccess = function(empList){
        console.log(empList);
        $scope.employeeList = empList.data.data;
    };

    var getEmpListError = function(error){

    };

    var requestToDelete = function(_id){
        $http({
            method:'POST',
            url:'/remove/employee',
            data:{id:_id},
            headers: { 'Content-type': 'application/json' }
        }).then(function(data){
            updateList();
        }).then(function(){

        });
    };

    var updateList = function(){
        $http(getEmployeeListRequest()).then(getEmpListSuccess).then(getEmpListError);
    };

    var openEditWindowWith = function(i){
        $scope.operationON = true;

    };

    $scope.operate = function(mode,i){
        switch(mode){
            case "del":
            var ans = confirm('Are you really want to delete the employee"'+$scope.employeeList[i].name+'"?');
            if(ans){
                requestToDelete($scope.employeeList[i]._id);
            }
            
            break;

            case "edit":
            
                openEditWindowWith(i);
            break;

            case "show":
            break;
            
        }
    };

    updateList();    

}

empDataMantSystem.controller('EmployeeListController', ['$scope', '$http', EmployeeListController]);