var importobject = {
    chalk: require("chalk"),
    express: require("express"),
    bodyparser: require("body-parser"),
    properties: require('./app/properties'),
    servicemanager: require('./app/servicemanager')
};
var EmployeeManagementSystem = require("./app/employeemanagementsystem.js");

var emSystem = new EmployeeManagementSystem(importobject);
emSystem.init();
emSystem.start();