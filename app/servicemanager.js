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
        console.log(request.body.name);
        response.end(JSON.stringify(request.body));
    },
    postDepartment: function(request, response) {
        
        response.end(JSON.stringify(request.body));
    },
    getDepartments: function(request, response) {
        response.contentType('application/javascript');
        this.serviceObject.developer = this.manager;
        response.end(JSON.stringify(this.serviceObject));
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