/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var app = angular.module('gamma', []);
app.directive('attFooter', function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/views/footer.html'
    };
});


