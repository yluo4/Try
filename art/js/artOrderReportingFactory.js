angular.module('abFactories').factory("artOrderReportingFactory", ['$http', 'abDirectiveUtilFactory', 'uiGridConstants', function ($http, abDirectiveUtilFactory, uiGridConstants) {
    var srvFactory = {};
    var csvDatas = {
        "orderSummaryCsv": "",
        "orderDetailCsv": ""
    };

    // Order Summary widget section
    srvFactory.orderSummaryInitial = function(obj) {
        var scope = obj.scope;
        var gridOptions = scope.gridOptions = scope.config.wd.jsonOptions.gridOptions;
        var subGridOptions = scope.config.wd.jsonOptions.subGridOptions;

        // grid height calculation based on widget height
        var titleHeight = 35;
        var wSize = abDirectiveUtilFactory.getGridSize(scope.config);
        var gridHeight = wSize.height - titleHeight;
        scope.gridStyle = {
            "height": gridHeight + "px"
        };
        gridOptions.expandableRowHeight = gridHeight - 85;
        gridOptions.expandableRowScope = {
            "subGridStyle": {"height": (gridHeight - 85 - 30) + "px"}
        };
        gridOptions.expandableRowScope.childOrderNumClick = function(orderNum) {
            amplify.publish('orderSummaryChildOrderNumClickEvent', {
                "orderNum": orderNum
            });
        };

        gridOptions.onRegisterApi = function(gridApi){
            scope.gridApi = gridApi;
            gridApi.grid.registerDataChangeCallback(function() {
                gridApi.expandable.expandAllRows();
            });
        };

        scope.hasOrderSummary = false;
    };

    srvFactory.orderSummaryLoading = function(obj) {
        var scope = obj.scope;
        var orderNum = obj.dataItem.lsc_order_number;
        var gridOptions = scope.gridOptions;
        var subGridOptions = scope.config.wd.jsonOptions.subGridOptions;
        var orderSummaryUrl = scope.config.wd.jsonOptions.urls.orderSummaryUrl;
        var token = amplify.store("artSearchReportAccessToken").xaccesstoken;

        // loading data
        amplify.publish("orderSummaryLoadingEvent", {});
        scope.$parent.loader.loading = true;
        $http({
            "method": "GET",
            "url": orderSummaryUrl + orderNum + "?t_s=" + (new Date()).getTime(),
            "headers": {
                "x-access-token": token
            }
        }).then(function(res) {
            // For Testing
            /*
            res.data.order_notes = "VRAD Rehome From 5-2-9 to 1-1-4 First Run 27 June";
            var children = res.data.child_lsc_oder_detail;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                child.child_comment_from_granite = "VRAD Rehome From 5-2-9 to 1-1-4 First Run 27 June abc sffsdf dsfsdf";
            }
            */
            // End For Testing

            subGridOptions.data = res.data.child_lsc_oder_detail;
            res.data.subGridOptions = subGridOptions;
            gridOptions.data = [res.data];

            // recalculate subGrid height based the number of data
            var subGridHeight = res.data.child_lsc_oder_detail.length * 30 + 100;
            subGridHeight = Math.max(subGridHeight, gridOptions.expandableRowHeight);
            gridOptions.expandableRowHeight = subGridHeight;
            gridOptions.expandableRowScope.subGridStyle = {
                "height": (subGridHeight - 30) + "px"
            };

            scope.$parent.loader.loading = false;
            scope.hasOrderSummary = (gridOptions.data && gridOptions.data.length > 0);
            if (scope.hasOrderSummary) {
                csvDatas.orderSummaryCsv = prepareOrderSummaryCsv(res.data, gridOptions.columnDefs, subGridOptions.columnDefs);
            } else {
                csvDatas.orderSummaryCsv = "";
            }
        }, function(res) {
            console.error(res);
            scope.hasOrderSummary = false;
        });
    };

    srvFactory.blankoutOrderSummary = function(obj) {
        var scope = obj.scope;
        scope.hasOrderSummary = false;
    };

    srvFactory.exportOrderSummary = function(obj) {
        downloadCsvFile(csvDatas.orderSummaryCsv, "Order Summary");
    };

    var prepareOrderSummaryCsv = function(data, parentColumnDefs, childColumnDefs) {
        var csv = "";

        csv += "Parent LSC Order Info" + "\r\n";
        // parent grid header
        for (var i = 0; i < parentColumnDefs.length; i++) {
            csv += parentColumnDefs[i].name + ",";
        }
        csv += "\r\n";
        // parent grid Content
        for (var i = 0; i < parentColumnDefs.length; i++) {
            csv += data[parentColumnDefs[i].field] + ",";
        }
        csv += "\r\n";

        csv += ",";
        csv += "Child LSC Order Info" + "\r\n";
        // child header
        csv += ",";
        for (var i = 0; i < childColumnDefs.length; i++) {
            csv += childColumnDefs[i].name + ",";
        }
        csv += "\r\n";
        // child grid Content
        var children = data.child_lsc_oder_detail;
        for (var i = 0; i < children.length; i++) {
            csv += ",";
            for (var j = 0; j < childColumnDefs.length; j++) {
                csv += children[i][childColumnDefs[j].field] + ",";
            }
            csv += "\r\n";
        }

        return csv;
    };

    // Order Detail widget section
    srvFactory.orderDetailInitial = function(obj) {
        var scope = obj.scope;
        var gridOptions = scope.gridOptions = scope.config.wd.jsonOptions.gridOptions;

        // grid height calculation based on widget height
        var titleHeight = 35;
        var wSize = abDirectiveUtilFactory.getGridSize(scope.config);
        var gridHeight = wSize.height - titleHeight;
        scope.gridStyle = {
            "height": gridHeight + "px"
        };

        gridOptions.onRegisterApi = function(gridApi){
            scope.gridApi = gridApi;
        };

        scope.hasOrderDetail = false;
    };

    srvFactory.orderDetailLoading = function(obj) {
        var scope = obj.scope;
        var gridOptions = scope.gridOptions;
        var orderNum = scope.orderNum = obj.dataItem.orderNum;
        var orderDetailUrl = scope.config.wd.jsonOptions.urls.orderDetailUrl;
        var token = amplify.store("artSearchReportAccessToken").xaccesstoken;

        // loading data
        scope.$parent.loader.loading = true;
        $http({
            "method": "GET",
            "url": orderDetailUrl + orderNum + "?t_s=" + (new Date()).getTime(),
            "headers": {
                "x-access-token": token
            }
        }).then(function(res) {
            gridOptions.data = res.data;
            scope.$parent.loader.loading = false;
            scope.hasOrderDetail = (gridOptions.data && gridOptions.data.length > 0);
            if (scope.hasOrderDetail) {
                csvDatas.orderDetailCsv = prepareOrderDetailCsv(res.data, orderNum, gridOptions.columnDefs);
            } else {
                csvDatas.orderDetailCsv = "";
            }
        }, function(res) {
            console.error(res);
            scope.$parent.loader.loading = false;
            scope.hasOrderDetail = false;
        });
    };

    srvFactory.blankoutOrderDetail = function(obj) {
        var scope = obj.scope;
        scope.hasOrderDetail = false;
    };

    srvFactory.exportOrderDetail = function(obj) {
        downloadCsvFile(csvDatas.orderDetailCsv, "Order Detail");
    };

    var prepareOrderDetailCsv = function(data, orderNum, columnDefs) {
        var csv = "";

        csv += "Order Number: " + orderNum + "\r\n";
        // grid header
        for (var i = 0; i < columnDefs.length; i++) {
            csv += columnDefs[i].name + ",";
        }
        csv += "\r\n";
        // grid Content
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < columnDefs.length; j++) {
                csv += data[i][columnDefs[j].field] + ",";
            }
            csv += "\r\n";
        }

        return csv;
    };


    // CSV download
    var downloadCsvFile = function(csv, fileTitle) {
        if (!csv) return;
        // Generate a file name
        var fileName = '';
        // this will remove the blank-spaces from the title and replace it with an underscore
        fileName += fileTitle.replace(/ /g, '_') + '.csv';

        if (navigator.msSaveBlob) {
            var blob = new Blob([csv], {
                type: 'text/csv;charset=utf-8;'
            });
            navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          // Initialize file format you want csv or xls
          var uri = 'data:text/csv;charset=utf-8,' + escape(csv);
          var link = document.createElement('a');
          link.href = uri;
          link.style = 'visibility:hidden';
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
    };

    return srvFactory;
}]);
