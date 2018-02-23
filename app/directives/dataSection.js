/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
var app = angular.module('gamma', [])
app.directive("dataSection", function () {
    return {
        restrict: 'E',
        templateUrl: 'app/views/dataSection.html',
        controller: 'dataController'
    };
});
