/*EmployeeManagementSystem*/

module.exports = function(importobject) {

    var app = null;
    var port = null;
    var serviceFunction = {};
    var Chalk = importobject.chalk;
    var Express = importobject.express;
    var PROP = importobject.properties;
    var BodyParser = importobject.bodyparser;
    var ServiceManager = importobject.servicemanager;

    console.log(Chalk.green(PROP.statusMessage.IMPORT_JOB_DONE));

    var routerConfig = function() {
        var r;
        ServiceManager.manager = PROP.developerinfo;
        ServiceManager.app = app;
        ServiceManager.chalk = Chalk;
        if (app !== null) {

            for (r in PROP.rest) {
                ServiceManager.bindRoutes(PROP.rest[r], r);
            }
        }
    };

    this.init = function() {
        app = Express();
        app.use(Express.static(PROP.staticFolder));
        routerConfig();

    };

    this.start = function() {
        console.log(Chalk.green(PROP.statusMessage.APPLICATION_START));
        if (app === null) {
            console.log(Chalk.red('Something went wrong. Express is not working properly'));
        } else {
            port = process.env.port || PROP.port;
            app.listen(port, function() {
                console.log(Chalk.green(new Date()));
                console.log(Chalk.green('Application started at ' + port + ' port...'));
            });
        }
    };

};