var EmployeeListController = function($scope, $http) {

    $scope.employeeList = [];
    $scope.departmentList=[];
    $scope.ages = [];
    $scope.selectedIndex = null;
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

    var getDepartmentListRequest = function(){
        return {
            method: 'GET',
            url:'/rest/departments',
            headers: { 'Content-type': 'application/json' },
        }
    }

    var getDepartmentSuccess = function(departments){
        
        $scope.departmentList = departments.data.data;        
    };

    var getDepartments = function(){
        
        $http(getDepartmentListRequest()).then(getDepartmentSuccess,function(){alert('error');});
    }

    

    var getEmpListSuccess = function(empList){
        var rawData = empList.data.data;
        for(var i=0;i<rawData.length;i++){
            rawData[i].dob = new Date(rawData[i].dob);
        }
        $scope.ages = empList.data.ages;
        $scope.employeeList = rawData;
        getDepartments();
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

    var diffChecker = function(){
        var changeArray=[];         

        for(var el in $scope.toEditEmployee){
            if(el!=='dob'){
                if($scope.toEditEmployee[el]!== $scope.employeeList[$scope.selectedIndex][el]){
                    changeArray.push(el);
                }
            }else{
                var t1 = new Date($scope.toEditEmployee[el]).getTime();
                var t2 = new Date($scope.employeeList[$scope.selectedIndex][el]).getTime();                
                if(t1!==t2){ changeArray.push(el); }
            }             
        }
        
        return changeArray;
    };

    $scope.getAnimClass = function(emp){
        if(emp._id === $scope.recentlyUpdatedId){
            return "lastEditedAnim";
        }
        return "normal";
    };

    $scope.update = function(){
        
        var toUpdate = {};
        var ch = diffChecker();
        for(var i=0;i<ch.length;i++){
            toUpdate[ch[i]] = $scope.toEditEmployee[ch[i]];
        }   

        $http({
            method:'POST',
            url:'/update/employee',
            data:{id:$scope.toEditEmployee._id,deletereqobj:JSON.stringify(toUpdate)},
            headers: { 'Content-type': 'application/json' }
        }).then(function(data){
            $scope.recentlyUpdatedId = $scope.toEditEmployee._id;
            $scope.operationON = false;
            updateList();
        }).then();

        

    };

    var openEditWindowWith = function(i){
        $scope.operationON = true;
        $scope.selectedIndex = i;
        $scope.toEditEmployee = {};

        for(var el in $scope.employeeList[i]){
            $scope.toEditEmployee[el] = $scope.employeeList[i][el];    
        }
        console.log($scope.toEditEmployee);
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