/* ALL IMPORT JOBS : Start*/
var Chalk = require("chalk");
var Express = require("express");
var BodyParser = require("body-parser");
var PROP = require('./app/properties.js');
/* ALL IMPORT JOBS : End*/

var port = PROP.port || process.env.port;
console.log(Chalk.green("Application started at " + new Date()));
console.log('All import jobs done without any error');

var app = Express();
app.use(Express.static('webapp'));


app.listen(port, function() {
    console.log(Chalk.blue('Application started at ' + port + ' port...'));
});