var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var importobject = {
    chalk: require("chalk"),
    express: require("express"),
    bodyparser: require("body-parser"),
    mongoose: mongoose,
    schema: Schema,
    properties: require('./app/properties'),
    servicemanager: require('./app/servicemanager'),
    dbmanager: require('./app/dbmanager')

};
var EmployeeManagementSystem = require("./app/employeemanagementsystem.js");

var emSystem = new EmployeeManagementSystem(importobject);
emSystem.init();
emSystem.start();


/*Tutorial Points*/
//CLASS 4 Recording : 110 Minutes : App route