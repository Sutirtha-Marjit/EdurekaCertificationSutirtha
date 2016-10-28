
/* ALL IMPORT JOBS : Start*/
var Chalk = require("chalk");
var Express = require("express");
var BodyParser = require("body-parser");
/* ALL IMPORT JOBS : End*/

console.log(Chalk.green("Application started at "+new Date()));
console.log('All import jobs done without any error');

var app = Express();
app.use(Express.static('webapp'));



app.listen(3000,function(){
    console.log(Chalk.blue('Application started at 3000 port...'));
});


