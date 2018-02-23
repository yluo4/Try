"use strict";

var app = angular.module('gamma', ['ngRoute', 'ui.bootstrap',
    'angularUtils.directives.dirPagination', 'cgBusy', 'ngTable']);

app.config(function ($routeProvider) {
    'use strict';
    $routeProvider
            .when('/', {
                templateUrl: 'app/views/portal.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});

app.directive('attFooter', function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/footer.html'
    };
});

app.controller('NavigationCtrl', ['$scope', "$window", "$log",
    function ($scope, $window, $log) {
        $scope.message = "This is the main menu navigation section";
    }]);

app.directive('menuNavigation', function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/navigation.html',
        controller: 'NavigationCtrl'
    };
});



/*
var portalControl = app.controller('PortalPageCtrl', ['$scope', "$window", "$log",
    function ($scope, $window, $log) {
        $scope.message = "This is the portal content section";
        $scope.isCollapsed = [false, false, false];
    }
]);


portalControl.controller('mapController', ['$scope', "$window", "$log",
    function ($scope, $window, $log) {
        $scope.message = "This is the main map section";
    }]);

portalControl.directive("mapSection", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/mapsSection.html',
        controller: 'mapController'
    };
});
portalControl.controller('dataController', ['$scope', "$window", "$log",
    function ($scope, $window, $log) {
        $scope.message = "This is the main data section";
    }]);

portalControl.directive("dataSection", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/dataSection.html',
        controller: 'dataController'
    };
});

portalControl.controller('visualController', ['$scope', "$window", "$log",
    function ($scope, $window, $log) {
        $scope.message = "This is the main visual section";
    }]);

portalControl.directive("visualSection", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/visualSection.html',
        controller: 'visualController'
    };
});
*/