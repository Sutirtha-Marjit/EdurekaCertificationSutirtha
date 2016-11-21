module.exports = {
    mongoose:null,
    schema:null,
    dbPathLocal:'mongodb://localhost/',
    dbName:'edurekacertdb',
    collection: {
        department: 'department',
        employee: 'employee'
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
                successCallBack();
            }catch(e){
                errorCallBack();
            }           
            
        }else{
            console.erreor("Some how the mongoose is not configured properly or they are set to NULL. Please check the code");
        }
    },
    postDepartment:function(dataObject){
        console.log(dataObject);
    }

};