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
    postRegistration: function(request, response) {
        if(this.DBManager!==undefined){
            this.DBManager.postRegistration({
                name:request.body.name,
                dob: request.body.dob,
                email: request.body.email,
                sex: request.body.sex,
                department: request.body.department 
            });
        }
        console.log(request.body.name);
        response.end(JSON.stringify(request.body));
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
    getEmployees: function(request, response) {
        response.contentType('application/javascript');
        response.end('{b:10}');
    },

    getEmployeesToSearchByName: function(request, response) {
        response.contentType('application/javascript');
        response.end('{bdad:10}');
    },

    getEmployeesToSearch: function(request, response) {
        response.contentType('application/javascript');
        response.end('{q:10,q:900}');
    },

    getEmployeesToSearchByGender: function(request, response) {
        response.contentType('application/javascript');
        response.end('{q212:10,q:900}');
    },

    getEmployeesToSearchByDepartments: function(request, response) {
        response.end('{q2q:10,q:900}');
    },

    getTest: function(request, response) {
        response.end('{q2q:10,q:900}');
    }

};