empDataMantSystem.config(function($routeProvider) {

    $routeProvider.when('/', { templateUrl: 'templates/emplistviewupdate.tpl.html', controller: null });
    $routeProvider.when('/page-not-found', { templateUrl: 'templates/error.404.tpl.html', controller: null });
    $routeProvider.when('/add', { templateUrl: 'templates/registration.tpl.html', controller: null });
    $routeProvider.when('/update', { templateUrl: 'templates/emplistviewupdate.tpl.html', controller: null });
    $routeProvider.when('/view', { templateUrl: 'templates/emplistview.tpl.html', controller: null });
    $routeProvider.when('/search', { templateUrl: 'templates/searchresult.tpl.html', controller: null });
    $routeProvider.when('/configuration', { templateUrl: 'templates/configuration.tpl.html', controller: null });
    $routeProvider.when('/config-add-department', { templateUrl: 'templates/config.adddepartments.tpl.html', controller: null });
    $routeProvider.when('/config-list-of-departments', { templateUrl: 'templates/config.departments.tpl.html', controller: null });
    $routeProvider.when('/config-user-log', { templateUrl: 'templates/config.userlog.tpl.html', controller: null });
    $routeProvider.otherwise({ redirectTo: '/page-not-found' });
    //config-user-log
});