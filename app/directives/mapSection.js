/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
var app = angular.module('gamma', [])
app.directive("mapSection", function () {
    return {
        restrict: 'E',
        templateUrl: 'app/views/mapsSection.html',
        controller: 'mapController'
    };
});
