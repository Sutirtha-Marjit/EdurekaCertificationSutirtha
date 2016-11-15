module.exports = {
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
    }
};