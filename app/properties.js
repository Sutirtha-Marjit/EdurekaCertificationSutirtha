module.exports = {
    applicationName: '',
    port: 4500,
    staticFolder: 'webapp',
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
    },
    developerinfo: {
        name: 'Sutirtha Marjit',
        skill: 'Professional Javascript Developer',
        email: 'sutirtha.marjit@gmail.com',
        linkedin: 'https://www.linkedin.com/in/sutirtha-marjit-46032b6b'
    }

};