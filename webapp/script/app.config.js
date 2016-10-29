empDataMantSystem.config(function($routeProvider) {

    $routeProvider.when('/', { templateUrl: 'templates/emplistview.tpl.html', controller: null });
    $routeProvider.when('/add', { templateUrl: 'templates/registration.tpl.html', controller: RegistrationController });

});