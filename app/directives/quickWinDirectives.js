/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
portalControl.directive("vpeAlertByTime", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/vpeAlertByTime.html?modified=71',
        controller: 'vpeAlertByTimeController'
    };
});

app.directive('startDatetimezByTime', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.startTimeByTime,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.startTimeByTime = e.date;
            });
        }
    };
});

app.directive('endDatetimezByTime', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.endTimeByTime,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.endTimeByTime = e.date;
            });
        }
    };
});


portalControl.directive("vpeAlertByCustomer", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/vpeAlertByCustomer.html?modified=57',
        controller: 'vpeAlertByCustomerController'
    };
});

app.directive('startDatetimezByCustomer', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.startTimeByCustomer,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.startTimeByCustomer = e.date;
            });
        }
    };
});

app.directive('endDatetimezByCustomer', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.endTimeByCustomer,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.endTimeByCustomer = e.date;
            });
        }
    };
});

portalControl.directive("vpeAlertByVce", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/vpeAlertByVce.html?modified=57',
        controller: 'vpeAlertByVceController'
    };
});

app.directive('startDatetimezByVce', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.startTimeByVce,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.startTimeByVce = e.date;
            });
        }
    };
});

app.directive('endDatetimezByVce', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.endTimeByVce,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.endTimeByVce = e.date;
            });
        }
    };
});

portalControl.directive("vpls2CrsServicePath", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/vpls2CrsServicePath.html?modified=12',
        controller: 'vpls2CrsServicePathController'
    };
});

app.directive('datetimezVpls2Crs', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            scope.loadVplsPes(scope.dateTimeForVpls2Crs);  // initialize vpls selection
            
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.dateTimeForVpls2Crs,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.dateTimeForVpls2Crs = e.date;
                scope.loadVplsPes(scope.dateTimeForVpls2Crs);
            });
        }
    };
});


portalControl.directive("emt2CrsServicePath", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/emt2CrsServicePath.html?modified=3',
        controller: 'emt2CrsServicePathController'
    };
});

app.directive('datetimezEmt2Crs', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.dateTimeForEmt2Crs,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.dateTimeForEmt2Crs = e.date;
            });
        }
    };
});


portalControl.directive("ce2CrsServicePath", function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/ce2CrsServicePath.html?modified=12',
        controller: 'ce2CrsServicePathController'
    };
});

app.directive('datetimezCe2Crs', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                format: "MM/DD/YYYY h:mm a",
                useCurrent: false,
                defaultDate: scope.dateTimeForCe2Crs,
                stepping: 1
            }).on('dp.change', function(e) {
                scope.dateTimeForCe2Crs = e.date;
            });
        }
    };
});



portalControl.directive('onOptionsUpdate', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    element.parent().selectpicker('refresh');
                });
            }
        }
    };
}]);

