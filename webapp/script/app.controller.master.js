var MasterController = function($scope, $http) {

    $scope.version = "1.0.0";
    $scope.$on('$viewContentLoaded', function() {
        DOM_CONTROL.LinkHighlight();
    });


};
empDataMantSystem.controller('MasterController', ['$scope', '$http', MasterController]);