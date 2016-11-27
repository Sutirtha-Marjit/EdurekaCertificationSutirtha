module.exports = {
    chalk:null,
    mongoose:null,
    schema:null,
    dbPathLocal:'mongodb://localhost/',
    dbPathMLAB:'',
    dbPath:null,
    localConnectionActive:true,
    dbName:'sutirthatest',/* edurekacertdb */
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
        console.log(this.chalk.green('\nDB initial configuraation started'));
        if(this.localConnectionActive){
            this.dbPath = this.dbPathLocal+this.dbName;
            console.log('db is set to '+this.dbName);
            console.log(this.chalk.green('DB Path set to '+this.dbPath));
        }else{
            this.dbPath = this.dbPathMLAB+this.dbName;
            console.log('db is set to '+this.dbName);
            console.log(this.chalk.green('DB Path set to'+this.dbPath));
        }

        if(this.mongoose!==null && this.schema!==null){
            try{
                
                var EmployeeSchema = this.mongoose.Schema(this.bluePrint.employee);
                var DepartmentSchema = this.mongoose.Schema(this.bluePrint.department);
                this.Department = this.mongoose.model(this.collection.department,DepartmentSchema);
                this.Employee = this.mongoose.model(this.collection.employee,EmployeeSchema);

                console.log(this.chalk.green('Schemas are defined'));

                successCallBack();
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
        self.mongoose.connect(self.dbPath);

        self.mongoose.connection.once('open',function(){

            self.Department.findOne({_id:dataObject.id},function(error,department){
            if(error){ callback({status:error}); return false;}
            if(department){
                department.remove();
                callback({status:department});
            }else{
                callback({status:null});
            }            
            self.mongoose.disconnect();
        });

        });
        
    },
    /*////////////////////@:DELETE DEPARTMENT:End//////////////////////////// */
    postToDeleteEmployee:function(dataObject,callback){
        var self = this;
        this.mongoose.connect('mongodb://localhost/sutirthatest');
        this.Employee.findOne({_id:dataObject._id},function(error,employee){
            if(error){ callback({msg:"error while deleting"}); }
            employee.remove();
            self.mongoose.disconnect();
            callback({msg:"success"});
        });
        
    },
    postRegistration:function(dataObject){
        this.mongoose.connect('mongodb://localhost/sutirthatest');        
        var currentEmployee = new this.Employee(dataObject);
        currentEmployee.save();
        this.mongoose.disconnect();
    },
    postDepartment:function(dataObject){
        this.mongoose.connect('mongodb://localhost/sutirthatest');
        
        var currentDepartment = new this.Department({
            department_creator:dataObject.department_creator,
            department_desc:dataObject.department_desc,
            department_name:dataObject.department_name
        });

        currentDepartment.save();
        this.mongoose.disconnect();
        
    },
    /*////////////////////@:UPDATE EMPLOYEE:Start//////////////////////////// */
    postToUpdateEmployee:function(id,toUpdateObject,callback){
        var self = this;
        self.mongoose.connect(self.dbPath);
        console.log(self.chalk.green('Employee update request is received by DBManager'));

        self.mongoose.connection.once('open',function(){
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
                        self.mongoose.disconnect();
                        console.log(self.chalk.green('Save process is finished'));
                    });
                }else{
                    self.mongoose.disconnect();
                }
                
            });

        });
       
    },
    /*////////////////////@:UPDATE EMPLOYEE:End//////////////////////////// */

    /*////////////////////@:GET EMPLOYEES:End//////////////////////////// */
    getEmployees:function(serviceCallBack){
       this.mongoose.connect('mongodb://localhost/sutirthatest');
       this.Employee.find({},function(err,data){
           serviceCallBack(data);
       }); 

       this.mongoose.disconnect();
    },
    getDepartments:function(serviceCallBack){
       this.mongoose.connect('mongodb://localhost/sutirthatest');
       this.Department.find({},function(err,data){
           serviceCallBack(data);
       })
          
      
       

       this.mongoose.disconnect();
    }

};