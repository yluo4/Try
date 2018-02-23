/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
portalControl.controller('ce2CrsServicePathController', ['$scope', '$window', '$log', '$http', 'NgTableParams',
    function ($scope, $window, $log, $http, NgTableParams) {
       // set time;
        var getTimeUTC = function() {
            var current = moment.utc();
            current.second(0);
            
            return current;
        };
        $scope.dateTimeForCe2Crs = getTimeUTC();
        
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
        $scope.tableParamsByService = createTableParams();
        $scope.modalTableParamsByService = createTableParams();
        
        $scope.cust = "";
        $scope.custs = [];
        $scope.ce = "";
        $scope.ces = [];
        var custCesObj = {};
        var loadCustsCes = function() {
            var url = '/gamma/api/quickWin/custCes';
            
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                custCesObj = response.data;
                
                $scope.custs = Object.keys(custCesObj);
                $scope.custs.sort();
                
                $("#ce2crsPath .ceList").selectpicker('refresh');
            }, function errorCallback(response) {
            });
        }();
        
        
        $scope.custChanged = function() {
            $scope.ce = "";
            $scope.ces = custCesObj[$scope.cust].sort();
        };
        
        $scope.submitCe2Crs = function() {
            $("#ce2crsPath .submit").button('loading');
            $("#ce2crsPath .table-area").hide();
            
            var dateTimeStr = $scope.dateTimeForCe2Crs.format('YYYYMMDDHHmmss');
            var url = '/gamma/api/quickWin/ce2CrsServicePath?time=' + dateTimeStr
                      + "&cust=" + encodeURIComponent($scope.cust) + "&ce=" + $scope.ce;
            console.log(url);
            
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                var data = response.data;
                
                //console.log(data);
                /*
                var vpls2Crs = data.vpls2Crs;
                var vceSvrBean = vpls2Crs.vceSvrBean;
                var vpeSvrBean = vpls2Crs.vpeSvrBean;
                var vceTopoData = prepareTopologyData(vceSvrBean.alerts);
                var vpeTopoData = prepareTopologyData(vpeSvrBean.alerts);
                var topoData = {
                    vceTopoData: vceTopoData,
                    vpeTopoData: vpeTopoData
                };
                */
               /*
                var vpls2Crs = data.vpls2Crs;
                var vceSvrBean = vpls2Crs.vceSvrBean;
                var vpeSvrBean = vpls2Crs.vpeSvrBean;
                var alertsByVce = vceSvrBean.alerts.dataBeans;
                var alertsByVpe = vpeSvrBean.alerts.dataBeans;
                
                var vceAlertsByVce = [];
                for (var i = 0; i < alertsByVce.length; i++) {
                    var alertType = alertsByVce[i].alertType;
                    if (alertType == "vCE Alert") {
                        vceAlertsByVce.push(alertsByVce[i]);
                    }
                }
                var vpeAlertsByVpe = [];
                for (var i = 0; i < alertsByVpe.length; i++) {
                    var alertType = alertsByVpe[i].alertType;
                    if (alertType == "vPE Alert") {
                        vpeAlertsByVpe.push(alertsByVpe[i]);
                    }
                }
                var alertsByService = {
                    vceAlertsByVce: vceAlertsByVce,
                    vpeAlertsByVpe: vpeAlertsByVpe
                };
                
                var displayTable = {
                    tableParams: $scope.tableParamsByService,
                    tableArea: $("#ce2crsPath .table-area")
                };
                */
               
                var service = data.serviceID;
                var vpls2Crs = data.vpls2Crs;
                var alerts = vpls2Crs.alerts;
                var dataBeans = alerts.dataBeans;
                
                var vceAlertsByVce = [];
                var vpeAlertsByVpe = [];
                var dataBeansByService = [];
                for (var i = 0; i < dataBeans.length; i++) {
                    var serviceID = dataBeans[i].serviceID;
                    var alertType = dataBeans[i].alertType;
                    if (service == serviceID) {
                        if (alertType == "vCE Alert") {
                            vceAlertsByVce.push(dataBeans[i]);
                        }
                        if (alertType == "vPE Alert") {
                            vpeAlertsByVpe.push(dataBeans[i]);
                        }
                        
                        dataBeansByService.push(dataBeans[i]);
                    }
                }
                var alertsDataByService = {
                    vceAlertsByVce: vceAlertsByVce,
                    vpeAlertsByVpe: vpeAlertsByVpe
                };
                
                var displayTable = {
                    tableParams: $scope.tableParamsByService,
                    tableArea: $("#ce2crsPath .table-area")
                };
                
                var alertsByService = {
                    dataBeans: dataBeansByService,
                    vpeAsscns: alerts.vpeAsscns,
                    vceAsscns: alerts.vceAsscns
                };
                topoDataByService = prepareTopologyData(alertsByService);
                topoData = prepareTopologyData(alerts);
                
                container.selectAll("g").remove();
                container.attr("width", "100%");
                $("#ce2crsPath .submit").button('reset');
                $("#ce2CrsTopology").show();
                
                var topology = new Ce2CrsPathTopology(container, 1, $scope.ce.toLowerCase(), data, alertsDataByService, displayTable);
                topology.draw();
            }, function errorCallback(response) {
            });
        };
        
        
        var topoDataByService = {};
        var topoData = {};
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
            
            var topologyData = {
                alerts: alerts,
                asscns: asscns
            };
            
            return topologyData;
        };
        
        
        var selectedVPE = null;
        var selectedVCE = null;
        var selectedType = "VCE";
        $scope.openModalByCe2Crs = function(type, vpe, vce) {
            selectedVPE = vpe;
            selectedVCE = vce;
            selectedType = type;
            
            $(".modal-table").hide();
            $("#ce2crsModal").modal({
		backdrop: 'static',
		keyboard: false
            });
            
        };
        
        var CustInfoTopo = function() {
            this.drawTopology = function(cust) {
                modalContainer.selectAll("g").remove();
                $(".modal-table").hide();
                
                var url = '/gamma/api/quickWin/custInfo?cust=' + encodeURIComponent(cust);
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    var data = response.data;
                    
                    modalContainer.attr("width", '100%');
                    var custTopology = new CustTopology(modalContainer, 1, data, topoData, $scope.modalTableParamsByService);
                    custTopology.draw();
                    
                }, function errorCallback(response) {
                });
            };
        };
        
        $("#ce2crsModal").on("shown.bs.modal", function() {
            modalContainer.selectAll("g").remove();
            modalContainer.attr("width", '100%');
            $(".modal-table").hide();
            
            if (selectedType == "VPE") {
                var topology = new Topology(modalContainer, 1, selectedVPE, topoDataByService, 
                $scope.modalTableParamsByService, custInfoTopo);
                topology.draw();
            } else {
                var topology = new TopologyForVceClick(modalContainer, 1, selectedVPE, selectedVCE, topoDataByService, 
                $scope.modalTableParamsByService, custInfoTopo);
                topology.draw();
            }
            
	});
        
        $scope.backButtonClickCe2Crs = function() {
            modalContainer.selectAll("g").remove();
            modalContainer.attr("width", '100%');
            $(".modal-table").hide();
            
            if (selectedType == "VPE") {
                var topology = new Topology(modalContainer, 1, selectedVPE, topoDataByService, 
                $scope.modalTableParamsByService, custInfoTopo);
                topology.draw();
            } else {
                var topology = new TopologyForVceClick(modalContainer, 1, selectedVPE, selectedVCE, topoDataByService, 
                $scope.modalTableParamsByService, custInfoTopo);
                topology.draw();
            }
            /*
            var topology = new Topology(modalContainer, 1, selectedVPE, topoDataByService, 
            $scope.modalTableParamsByService, custInfoTopo);
            topology.draw();
            */
        };
        
        var custInfoTopo = new CustInfoTopo();
        var container = d3.select("#ce2CrsTopology svg").attr("width", "100%").attr("height", 300);
        var modalContainer = d3.select("#ce2CrsAlertsTopology svg").attr("width", '100%').attr("height", 550);
        
    }
]);

