/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
var app = angular.module('gamma', []);
app.controller('NavigationCtrl', ['$scope', "$window", "$log",
    function ($scope, $window, $log) {
        $scope.message = "This is the main menu navigation section";
    }]);

