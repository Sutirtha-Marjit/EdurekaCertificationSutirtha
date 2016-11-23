module.exports = {
    mongoose:null,
    schema:null,
    dbPathLocal:'mongodb://localhost/',
    dbName:'edurekacertdb',
    collection: {
        department: 'Department',
        employee: 'Employee'
    },
    bluePrint: {
        employee: {
            name: { type: String, required: true },
            dob: { type: Date, required: true },
            email: { type: String, required: true },
            gender: { type: String, required: true },
            department: { type: String }
        },
        department: {
            department_name: { type: String, required: true, unique: true },
            department_creator: { type: String, required: true },
            department_desc: { type: String },
        }
    },
    initConfig:function(successCallBack,errorCallBack){
        console.log(this.dbName);
        if(this.mongoose!==null && this.schema!==null){
            try{
                //this.mongoose.connect('mongodb://localhost/sutirthatest');
                var DepartmentSchema = this.mongoose.Schema(this.bluePrint.department);
                this.Department = this.mongoose.model(this.collection.department,DepartmentSchema);
                successCallBack();
            }catch(e){
                errorCallBack();
            }           
            
        }else{
            console.erreor("Some how the mongoose is not configured properly or they are set to NULL. Please check the code");
        }
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
    getDepartments:function(serviceCallBack){
       this.mongoose.connect('mongodb://localhost/sutirthatest');
       this.Department.find({},function(err,data){
           serviceCallBack(data);
       })
          
      
       

       this.mongoose.disconnect();
    }

};