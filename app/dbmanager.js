module.exports = {
    chalk:null,
    mongoose:null,
    schema:null,
    dbPathLocal:'mongodb://localhost/',
    dbPathMLAB:'',
    dbPath:null,
    dblocal:true,
    localConnectionActive:false,
    dbName:'sutirthatest',
    collection: {
        department: 'Department',
        employee: 'Employee'
    },
    bluePrint: {
        employee: {
            name: { type: String, required: true },
            dob: { type: Date, required: true },
            email: { type: String, required: true },
            sex: { type: String, required: true },
            department: { type: String }
        },
        department: {
            department_name: { type: String, required: true, unique: true },
            department_creator: { type: String, required: true },
            department_desc: { type: String },
        }
    },
    initConfig:function(successCallBack,errorCallBack){
        var self = this;
        console.log(this.chalk.green('\nDB initial configuraation started'));
        if(self.dblocal){
            self.dbPath = self.dbPathLocal+self.dbName;
            console.log('db is set to '+self.dbName);
            console.log(self.chalk.green('DB Path set to '+self.dbPath));
        }else{
            self.dbPath = self.dbPathMLAB+self.dbName;
            console.log('db is set to '+self.dbName);
            console.log(self.chalk.green('DB Path set to'+self.dbPath));
        }

        if(self.mongoose!==null && self.schema!==null){
            try{
                
                var EmployeeSchema = self.mongoose.Schema(self.bluePrint.employee);
                var DepartmentSchema = self.mongoose.Schema(self.bluePrint.department);
                self.Department = self.mongoose.model(self.collection.department,DepartmentSchema);
                self.Employee = self.mongoose.model(self.collection.employee,EmployeeSchema);

                console.log(self.chalk.green('Schemas are defined'));

                
                console.log(self.chalk.green('DB Connection initiated'));
                self.mongoose.connect(self.dbPath);
                console.log(self.chalk.green('DB Connection initiated'));
                self.mongoose.connection.once('open',function(){
                    self.localConnectionActive = true;
                    console.log(self.chalk.green('DB Connection opened'));
                    successCallBack();
                });

                
            }catch(e){
                errorCallBack();
            }           
            
        }else{
            console.erreor("Some how the mongoose is not configured properly or they are set to NULL. Please check the code");
        }
    },
    
    /*////////////////////@:DELETE DEPARTMENT:Start//////////////////////////// */
    postToDeleteDepartment:function(dataObject,callback){
        var self = this;
       // self.mongoose.connect(self.dbPath);

       // self.mongoose.connection.once('open',function(){

            self.Department.findOne({_id:dataObject.id},function(error,department){
            if(error){ callback({status:error}); return false;}
            if(department){
                department.remove();
                callback({status:department});
            }else{
                callback({status:null});
            }            
           // self.mongoose.disconnect();
        });

      //  });
        
    },
    /*////////////////////@:DELETE DEPARTMENT:End//////////////////////////// */
    /*////////////////////@:DELETE EMPLOYEE:Start//////////////////////////// */
    postToDeleteEmployee:function(dataObject,callback){
        var self = this;
        //self.mongoose.connect(self.dbPath);
        console.log(self.chalk.green('Employee delete request is received by DBManager'));

        //self.mongoose.connection.once('once',function(){
            console.log(self.chalk.blue('Connection established and search started for the employee'));
            self.Employee.findOne({_id:dataObject._id},function(error,employee){
            if(error){ callback({status:error}); /*self.mongoose.disconnect();*/ return false; }
            if(employee){
                console.log(self.chalk.blue('Got employee '+employee.name));
                console.log(self.chalk.blue('Remove operation is about to start for '+employee.name));
                employee.remove(function(error,employee){
                    if(error){callback({status:error}); return false;}
                    console.log(self.chalk.blue('Removed '+employee.name));
                    callback({status:employee});
                    //self.mongoose.disconnect();
                });
                
            }else{
                callback({status:null});
                //self.mongoose.disconnect();
            }            
        });

        //});
        
    },
    /*////////////////////@:DELETE EMPLOYEE:End//////////////////////////// */
    /*////////////////////@:EMPLOYEE REGISTRATION:Start//////////////////////////// */
    postRegistration:function(dataObject,callback){
        var self = this;
        //self.mongoose.connect(self.dbPath);
        //self.mongoose.connection.once('open',function(){
            var currentEmployee = new self.Employee(dataObject);
            currentEmployee.save(function(error,employee){
                if(error){callback({status:error}); /*self.mongoose.disconnect();*/ return false;}
                callback({status:currentEmployee});
               // self.mongoose.disconnect();
            });
       // });
       
    },
    /*////////////////////@:EMPLOYEE REGISTRATION:End//////////////////////////// */
    postDepartment:function(dataObject){
       // this.mongoose.connect('mongodb://localhost/sutirthatest');
        
        var currentDepartment = new this.Department({
            department_creator:dataObject.department_creator,
            department_desc:dataObject.department_desc,
            department_name:dataObject.department_name
        });

        currentDepartment.save();
       // this.mongoose.disconnect();
        
    },
    
    /*////////////////////@:UPDATE EMPLOYEE:Start//////////////////////////// */
    postToUpdateEmployee:function(id,toUpdateObject,callback){
        var self = this;
        //self.mongoose.connect(self.dbPath);
        console.log(self.chalk.green('Employee update request is received by DBManager'));

        //self.mongoose.connection.once('open',function(){
            self.Employee.findOne({_id:id},function(error,employee){
                if(error){callback(error); return false;}
                
                if(employee){
                    
                    console.log(self.chalk.blue('\nGot employee '+employee.name+' and update process is about to begin'));
                    console.log("Update requested :" +JSON.stringify(toUpdateObject));
                    for(var el in toUpdateObject){
                       
                       employee[el] =  toUpdateObject[el];
                    }
                    console.log('value update done! not saved to db yet');
                    console.log('After update document is looking like');
                    console.log(self.chalk.green('..........................................'));
                    console.log(employee);
                    console.log(self.chalk.green('..........................................'));

                    console.log(self.chalk.blue('\nGot updated employee '+employee.name+' and save process is about to begin'));
                    employee.save(function(error,employee){
                        console.log(self.chalk.blue('Save process is at last stage'));
                        if(error){callback(error); return false;}
                        callback({status:employee});
                        //self.mongoose.disconnect();
                        console.log(self.chalk.green('Save process is finished'));
                    });
                }else{
                   // self.mongoose.disconnect();
                }
                
            });

       // });
       
    },
    /*////////////////////@:UPDATE EMPLOYEE:End//////////////////////////// */

    /*////////////////////@:GET EMPLOYEES:End//////////////////////////// */
    getEmployees:function(callback){
       
       var self = this;
       if(self.localConnectionActive){ 
       //self.mongoose.connect(self.dbPath);
       console.log(self.chalk.green('.................................................'));
       console.log(self.chalk.green('get employee-list request is received by DBManager'));

       //self.mongoose.connection.once('open',function(){
         //  console.log(self.chalk.blue('Connection established to get employee-list'));
           self.Employee.find({},function(error,employeeList){
               console.log(self.chalk.blue('Search operation end'));
               if(error){ callback({status:error}); /*self.mongoose.disconnect();*/ return false;}
               console.log(self.chalk.blue('Got the employee-list'));
               callback(employeeList);
               //self.mongoose.disconnect();
               console.log(self.chalk.yellow('disconnection done'));
         });

      // })
       }        
    },
    getDepartments:function(serviceCallBack){

       var self = this;
      // self.mongoose.connect(self.dbPath);
       this.Department.find({},function(err,data){
           serviceCallBack(data);
       });

      // this.mongoose.disconnect();
    }

};