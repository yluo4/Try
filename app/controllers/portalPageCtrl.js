/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var portalControl = app.controller('PortalPageCtrl', ['$scope', "$window", "$log", '$http',
    function ($scope, $window, $log, $http) {
        // toggle panel
        $scope.togglePanel = function(evt) {
            var icon = $(evt.currentTarget);
            var subSectionBody = icon.parent().parent().next();
            
            subSectionBody.slideToggle("normal");
            icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
            
            

        };
        
        // loading customers and vces
        $scope.customerNames = [];
        $scope.vceNames = [];

        $http({
            method: 'GET',
            url: '/gamma/api/quickWin/custVCENames'
        }).then(function successCallback(response) {
            var data = response.data;
            var customers = data.custNames;
            var vceNames = data.vceNames;

            if (!angular.isArray(customers)) {
                customers = [customers];
            }
            if (!angular.isArray(vceNames)) {
                vceNames = [vceNames];
            }
            
            $scope.customerNames = customers;
            $scope.vceNames = vceNames;
            $("#byCustomer .report-content").show();
            $("#byVCE .report-content").show();
            $("#byCustomer .activity-indicator").hide();
            $("#byVCE .activity-indicator").hide();
        }, function errorCallback(response) {
        });
    }
]);