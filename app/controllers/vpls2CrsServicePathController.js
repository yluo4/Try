/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
portalControl.controller('vpls2CrsServicePathController', ['$scope', '$window', '$log', '$http', 'NgTableParams',
    function ($scope, $window, $log, $http, NgTableParams) {
       // set time;
        var getTimeUTC = function() {
            var current = moment.utc();
            current.second(0);
            
            return current;
        };
        $scope.dateTimeForVpls2Crs = getTimeUTC();
        
        $scope.vplsPe = "";
        $scope.vplsPes = [];
        $scope.loadVplsPes = function(time) {
            var dateTimeStr = time.format('YYYYMMDDHHmmss');
            var url = '/gamma/api/quickWin/vplsPes?time=' + dateTimeStr;
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
                data.push(dateTimeStr);
                $scope.vplsPes = data;
            }, function errorCallback(response) {
            });
        };
        
        
        $scope.submitVpls2Crs = function() {
            $("#vpls2crsPath .submit").button('loading');
            
            var dateTimeStr = $scope.dateTimeForVpls2Crs.format('YYYYMMDDHHmmss');
            var url = '/gamma/api/quickWin/vpls2CrsServicePath?time=' + dateTimeStr
                      + "&vplsPe=" + $scope.vplsPe;
            console.log(url);
            
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                var data = response.data;
                //console.log(data);
                
                container.selectAll("g").remove();
                var topology = new PathTopology(container, 1, $scope.vplsPe, data);
                topology.draw();
                
                $("#vpls2crsPath .submit").button('reset');
                $("#vpls2CrsTopology").show();
            }, function errorCallback(response) {
            });
        };
        
        var container = d3.select("#vpls2CrsTopology svg").attr("width", "100%").attr("height", 300);
        
    }
]);

