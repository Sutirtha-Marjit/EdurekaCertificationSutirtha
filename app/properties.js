module.exports = {
    applicationName: 'Employee Management System',
    port: 4500,
    staticFolder: 'webapp',
    post: {
        Registration: '/post/register',
        Department: '/post/department',
        ToDeleteEmployee: '/remove/employee',
        ToDeleteDepartment:'/remove/department',
        ToUpdateEmployee:'/update/employee',
        ToUpdateDepartment:'/update/department',
    },
    rest: {
        Test: '/rest/test/:p',
        Departments: '/rest/departments',
        Employees: '/rest/employees',
        EmployeesToSearch: '/rest/employees-to-search/:empname/:gender/:department',
        EmployeesToSearchByName: '/rest/employees-by-empname/:empname',
        EmployeesToSearchByGender: '/rest/employees-by-gender/:gender',
        EmployeesToSearchByDepartments: '/rest/employees-by-department/:department'
    },
    statusMessage: {
        APPLICATION_START: "Application started",
        IMPORT_JOB_DONE: "Packages imported to environment successfully",
        DEPARTMENT_CREATED: "A new department created in system",
        USER_REGISTERED_SUCCESSFULLY: "Employee have been registered successfully",
        USER_REGISTRATION_FAILED: "Registration is unsuccessful. Please try again.",
        MONGODB_NOT_AVAILABLE: "MongoDB is not available. Please check the environment",
        EXPRESS_NOT_AVAILABLE: "Express is unavailable. Please check the environment",
        DBMANAGER_CONFIG_IMPROPER: "DBManager configuration is improper. Please check it carefully."
    },
    db: {

    },
    developerinfo: {
        name: 'Sutirtha Marjit',
        skill: 'Professional Javascript Developer',
        email: 'sutirtha.marjit@gmail.com',
        linkedin: 'https://www.linkedin.com/in/sutirtha-marjit-46032b6b'
    }

};