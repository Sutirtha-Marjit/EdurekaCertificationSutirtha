empDataMantSystem.config(function($routeProvider) {

    $routeProvider.when('/', { templateUrl: 'templates/emplistviewupdate.tpl.html', controller: null });
    $routeProvider.when('/add', { templateUrl: 'templates/registration.tpl.html', controller: null });
    $routeProvider.when('/update', { templateUrl: 'templates/emplistviewupdate.tpl.html', controller: null });
    $routeProvider.when('/view', { templateUrl: 'templates/emplistview.tpl.html', controller: null });
    $routeProvider.when('/search', { templateUrl: 'templates/searchresult.tpl.html', controller: null });
    $routeProvider.when('/configuration', { templateUrl: 'templates/configuration.tpl.html', controller: null });

});