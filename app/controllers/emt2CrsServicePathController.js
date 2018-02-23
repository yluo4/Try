/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
portalControl.controller('emt2CrsServicePathController', ['$scope', '$window', '$log', '$http', 'NgTableParams',
    function ($scope, $window, $log, $http, NgTableParams) {
       // set time;
        var getTimeUTC = function() {
            var current = moment.utc();
            current.second(0);
            
            return current;
        };
        $scope.dateTimeForEmt2Crs = getTimeUTC();
        
        $scope.emt = "";
        $scope.emts = [];
        var loadEmts = function() {
            var url = '/gamma/api/quickWin/emts';
            console.log(url);
            
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                var data = response.data;

                if (!angular.isArray(data)) {
                    data = [data];
                }
                data.sort();
                $scope.emts = data;
            }, function errorCallback(response) {
            });
        };
        loadEmts();
        
        
        $scope.submitEmt2Crs = function() {
            $("#emt2crsPath .submit").button('loading');
            
            var dateTimeStr = $scope.dateTimeForEmt2Crs.format('YYYYMMDDHHmmss');
            var url = '/gamma/api/quickWin/emt2CrsServicePath?time=' + dateTimeStr
                      + "&emt=" + $scope.emt;
            console.log(url);
            
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                var data = response.data;
                //console.log(data);
                var emt2Vpls = data.emt2Vpls;
                var vpls2Crs = data.vpls2Crs;
                
                container.selectAll("g").remove();
                var topology = new Emt2CrsPathTopology(container, 1, $scope.emt.toLowerCase(), data);
                topology.draw();
                
                $("#emt2crsPath .submit").button('reset');
                $("#emt2CrsTopology").show();
            }, function errorCallback(response) {
            });
        };
        
        var container = d3.select("#emt2CrsTopology svg").attr("width", "100%").attr("height", 300);
        
    }
]);

