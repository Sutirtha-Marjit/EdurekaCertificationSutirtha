var SearchResultController = function($scope, $http) {

$scope.employeeList = [];
$scope.departmentList=[];
$scope.ages = [];
$scope.searchText = "";
$scope.operationON = false;
$scope.toEditEmployee = {};
$scope.recentlyUpdatedId = null;

var getEmployeeListRequest = function(){
        return {
            method: 'GET',
            url:'/rest/employees',
            headers: { 'Content-type': 'application/json' }
        }
    }

var getEmpListSuccess = function(empList){
        var rawData = empList.data.data;
        for(var i=0;i<rawData.length;i++){
            rawData[i].dob = new Date(rawData[i].dob);
        }
        $scope.ages = empList.data.ages;
        $scope.employeeList = rawData;
        
    };

    var getEmpListError = function(error){

    };

    var updateList = function(){
        $http(getEmployeeListRequest()).then(getEmpListSuccess).then(getEmpListError);
    };


    $scope.processSearch = function(){
        if($scope.searchText.length>0){
            updateList();
        }

    };


};
empDataMantSystem.controller('SearchResultController', ['$scope', '$http', SearchResultController]);