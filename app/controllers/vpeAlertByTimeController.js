/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
portalControl.controller('vpeAlertByTimeController', ['$scope', '$window', '$log', '$http', 'NgTableParams',
    function ($scope, $window, $log, $http, NgTableParams) {
        // set time;
        var getStartEndUTC = function() {
            var current = moment.utc();
            current.second(0);
            
            var s = moment(current).subtract(1, 'd');
            var e = current;
            return [s, e];
        };
        var time = getStartEndUTC();
        $scope.startTimeByTime = time[0];
        $scope.endTimeByTime = time[1];
        
        // click submit
        var createTableParams = function() {
            var initialParams = {
                sorting: {vpeName: "asc"},
                count: 5,
                group: {
                    alertType: "desc"
                }
            };
            
            var initialSettings = {
                counts: []
            };
            
            return new NgTableParams(initialParams, initialSettings);
        };
        $scope.tableParamsByTime = createTableParams();
        $scope.modalTableParamsByTime = createTableParams();
        
        $scope.submitByTime = function() {
            $("#byTime .submit").button('loading');
            $("#byTime .report-result .table-area").hide();
            
            var startTimeStr = $scope.startTimeByTime.format('YYYYMMDDHHmmss');
            var endTimeStr = $scope.endTimeByTime.format('YYYYMMDDHHmmss');
            var url = '/gamma/api/quickWin/reportByTime?startTime=' + startTimeStr
                      + "&endTime=" + endTimeStr;
            console.log(url);
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                var reportResult = response.data;
                var data = reportResult.dataBeans;
                if (!angular.isArray(data)) {
                    data = [data];
                }
                $scope.tableParamsByTime.settings({
                    dataset: data
                });
                
                prepareTopologyData(reportResult);
                
                $("#byTime .report-result .table-area").show();
                $("#byTime .submit").button('reset');
            }, function errorCallback(response) {
            });
        };
        
        var topologyData = {};
        var prepareTopologyData = function(reportResult) {
            var data = reportResult.dataBeans;
            var vpeAsscnsData = reportResult.vpeAsscns;
            var vceAsscnsData = reportResult.vceAsscns;
            
            var alerts = {
                vpeAlerts: {},
                vceAlerts: {}
            };
            for (var i = 0; i < data.length; i++) {
                var alertType = data[i].alertType;

                if (alertType == "vPE Alert") {
                    var vpeName = data[i].vpeName;
                    var alertsTmp = alerts.vpeAlerts;

                    if (alertsTmp[vpeName] == null) {
                        alertsTmp[vpeName] = [data[i]];
                    } else {
                        alertsTmp[vpeName].push(data[i]);
                    }
                } else {
                    var vceName = data[i].vceName;
                    var alertsTmp = alerts.vceAlerts;

                    if (alertsTmp[vceName] == null) {
                        alertsTmp[vceName] = [data[i]];
                    } else {
                        alertsTmp[vceName].push(data[i]);
                    }
                }
            }
            
            var asscns = {
                vpeAsscns: {},
                vceAsscns: {}
            };
            for (var i = 0; i < vpeAsscnsData.length; i++) {
                var vpe = vpeAsscnsData[i].vpe;
                var vnfc = vpeAsscnsData[i].vnfc;
                var vpe_vm = vpeAsscnsData[i].vpe_vm;
                var vpe_hostname = vpeAsscnsData[i].vpe_hostname;
                var aic = vpeAsscnsData[i].aic;
                
                var asscnsTmp = asscns.vpeAsscns;
                if (asscnsTmp[vpe] == null) {
                    asscnsTmp[vpe] = {
                        vpe_hostname: vpe_hostname,
                        aic: aic
                    };
                }
                if (vnfc == "fej") {
                    asscnsTmp[vpe].vpe_vm_fej = vpe_vm;
                } else {
                    asscnsTmp[vpe].vpe_vm_rej = vpe_vm;
                }
            }
            
            for (var i = 0; i < vceAsscnsData.length; i++) {
                var vce = vceAsscnsData[i].vce;
                var vce_vm = vceAsscnsData[i].vce_vm;
                var vce_hostname = vceAsscnsData[i].vce_hostname;
                
                var asscnsTmp = asscns.vceAsscns;
                if (asscnsTmp[vce] == null) {
                    asscnsTmp[vce] = {
                        vce_vm: vce_vm,
                        vce_hostname: vce_hostname
                    };
                }
            }
            
            topologyData = {
                alerts: alerts,
                asscns: asscns
            };
        };
        
        
        var selectedVPE;
        $scope.openModalByTime = function(vpeName) {
            selectedVPE = vpeName;
            $(".modal-table").hide();
            $("#byTimeModal").modal({
		backdrop: 'static',
		keyboard: false
            });
            
        };
        
        var CustInfoTopo = function() {
            this.drawTopology = function(cust) {
                container.selectAll("g").remove();
                $(".modal-table").hide();
                
                /*
                var data = {"cust":"Irongate Energy Services, LLC_8310006456220","aicInfos":[{"aic":"dsvtx-esx-az01","city":"Dallas","vpeInfos":[{"vpe":"dlstx401me6","vpe_vm_fej":"dlstx401me601fej","vpe_vm_rej":"dlstx401me601rej","vpe_hostname":"dsvtx185snd","vceInfos":[{"vce":"dlltx422vbc"},{"vce":"dlltx411vbc","vce_vm":"dlltx411vbc11ceb","vce_hostname":"dsvtx188snd"}]},{"vpe":"dlstx401me6","vpe_vm_fej":"dlstx401me601fej","vpe_vm_rej":"dlstx401me601rej","vpe_hostname":"dsvtx185snd","vceInfos":[{"vce":"dlltx411vbc","vce_vm":"dlltx411vbc11ceb","vce_hostname":"dsvtx188snd"}]}]},{"aic":"nwrla-esx-az01","city":"New Orleans","vpeInfos":[{"vpe":"nwrla401me6","vpe_vm_fej":"nwrla401me601fej","vpe_vm_rej":"nwrla401me601rej","vpe_hostname":"nwrla125snd","vceInfos":[{"vce":"nwrla411vbc","vce_vm":"nwrla411vbc11ceb","vce_hostname":"nwrla123snd"},{"vce":"nwrla417vbc","vce_vm":"nwrla417vbc17ceb","vce_hostname":"nwrla124snd"},{"vce":"nwrla412vbc","vce_vm":"nwrla412vbc12ceb","vce_hostname":"nwrla124snd"}]}]},{"aic":"hustx-esx-az01","city":"Houston","vpeInfos":[{"vpe":"hsttx401me6","vpe_vm_fej":"hsttx401me601fej","vpe_vm_rej":"hsttx401me601rej","vpe_hostname":"hustx125sd9","vceInfos":[{"vce":"hustx417vbc","vce_vm":"hustx417vbc17ceb","vce_hostname":"hustx124sd9"}]}]}]};
                var custTopology = new CustTopology(container, 1, data);
                custTopology.draw();
                */
                var url = '/gamma/api/quickWin/custInfo?cust=' + encodeURIComponent(cust);
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    var data = response.data;
                    
                    container.attr("width", '100%');
                    var custTopology = new CustTopology(container, 1, data, topologyData, $scope.modalTableParamsByTime);
                    custTopology.draw();
                    
                }, function errorCallback(response) {
                });
            };
        };
        
        var custInfoTopo = new CustInfoTopo();
        var container = d3.select("#byTimeTopology svg").attr("width", '100%').attr("height", 550);
        $("#byTimeModal").on("shown.bs.modal", function() {
            container.selectAll("g").remove();
            container.attr("width", '100%');
            $(".modal-table").hide();
            var topology = new Topology(container, 1, selectedVPE, topologyData, 
            $scope.modalTableParamsByTime, custInfoTopo);
            topology.draw();
	});
        
        $scope.backButtonClickByTime = function() {
            container.selectAll("g").remove();
            container.attr("width", '100%');
            $(".modal-table").hide();
            var topology = new Topology(container, 1, selectedVPE, topologyData, 
            $scope.modalTableParamsByTime, custInfoTopo);
            topology.draw();
        };
    }
]);

