module.exports = {
    moduleName: "ServiceManager",
    manager: {},
    app: null,
    chalk: null,
    serviceObject: { data: {}, developer: null },
    bindPostRoutes: function(path, functionName) {
        var self = this;
        if (self.app !== null && self['post' + functionName]) {
            self.app.post(path, function(request, response) {
                self['post' + functionName](request, response);
            });
        }
    },
    bindRoutes: function(path, functionName) {
        var self = this;
        if (self.app !== null && self['get' + functionName]) {

            self.app.get(path, function(request, response) {

                self['get' + functionName](request, response);
            })

            console.log(self.chalk.yellow('Router configured with '), self.chalk.bold(path));
        }
    },
    postToDeleteEmployee: function(request, response){
        
        if(this.DBManager!==undefined){
            this.DBManager.postToDeleteEmployee({_id:request.body.id},function(deleteResponse){
                
                response.end(JSON.stringify(deleteResponse));
            });
            

        }
    },
    postToDeleteDepartment: function(request, response){
        console.log(this.chalk.blue('Request received to delete a department'));
        var self = this;
        if(this.DBManager!==undefined){

            this.DBManager.postToDeleteDepartment({id:request.body.id},function(deleteResponse){
                var output ={};
                output.data = deleteResponse;
                output.developer = self.manager;
                response.end(JSON.stringify(output));
            });
        }
    },
    postToUpdateEmployee:function(request, response){
        var self = this;
        var output={};
        if(self.DBManager!==undefined){
            var deletereqobj = JSON.parse(request.body.deletereqobj);
            self.DBManager.postToUpdateEmployee(request.body.id,deletereqobj,function(dataObject){
                output.data = dataObject;
                output.developer = self.manager;
                response.end(JSON.stringify(output));
            });            
        }
    },
    postRegistration: function(request, response) {
        var self = this;
        if(self.DBManager!==undefined){
            self.DBManager.postRegistration({
                name:request.body.name,
                dob: request.body.dob,
                email: request.body.email,
                sex: request.body.sex,
                department: request.body.department 
            },function(dataObject){
                var output = {};
                output.data = self.serviceObject;
                output.developer = self.manager; 
                response.end(JSON.stringify(output));

            });
        }
        
        
    },
    postDepartment: function(request, response) {        
        if(this.DBManager!==undefined){
            this.DBManager.postDepartment({
                department_name:request.body.toAddDepartmentName,
                department_creator:request.body.currentAdminEmail,
                department_desc:request.body.toAddDepartmentDesc
            });
            response.end(JSON.stringify({success:true}));
        }else{
            response.end(JSON.stringify({Error:"DBManager is missing"}));
        }
        
    },
    getDepartments: function(request, response) {
        var self = this;
        var output = {};
        response.contentType('application/javascript');
        if(self.DBManager!==undefined){
            self.DBManager.getDepartments(function(departments){
                output = self.serviceObject;
                output.developer = self.manager;
                output.data = departments;
                response.end(JSON.stringify(output));
            });
        }        
        
    },
    getCorrectAge : function(dateString){
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    },
    getEmployees: function(request, response) {
        var self = this;
        var output = {};
        response.contentType('application/javascript');
        if(self.DBManager!==undefined){
            self.DBManager.getEmployees(function(employees){
                var ageArray=[];
                output = self.serviceObject;
                output.developer = self.manager;
                for(var i=0;i<employees.length;i++){
                    ageArray.push(self.getCorrectAge(employees[i].dob));
                }       
                output.ages = ageArray;
                output.data = employees;
                response.end(JSON.stringify(output));
            });
        }
        
    },

    getEmployeesToSearchByName: function(request, response) {
        var output = {};
        var self = this;
        var searchParamObject={};
        response.contentType('application/javascript');
        searchParamObject.empname = request.param('empname');        
        
        if(self.DBManager!==undefined){
            self.DBManager.getEmployeesToSearchByName(searchParamObject,function(employees){
                var ageArray=[];
                output = self.serviceObject;
                output.developer = self.manager;
                for(var i=0;i<employees.length;i++){
                    ageArray.push(self.getCorrectAge(employees[i].dob));
                }       
                output.ages = ageArray;
                output.data = employees;
                response.end(JSON.stringify(output));
            });
        }
        
    },

    getEmployeesToSearch: function(request, response) {
        response.contentType('application/javascript');
        response.end('{status:"service not available"}');
    },

    getEmployeesToSearchByGender: function(request, response) {
        response.contentType('application/javascript');
         response.end('{status:"service not available"}');
    },

    getEmployeesToSearchByDepartments: function(request, response) {
        response.end('{q2q:10,q:900}');
    },

    getTest: function(request, response) {
        response.end('{q2q:10,q:900}');
    }

};