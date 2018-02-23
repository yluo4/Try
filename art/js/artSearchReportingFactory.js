angular.module('abFactories').factory('artSearchReportingFactory', ['abMessageFactory', 'abDirectiveUIFactory',
      '$timeout', '$http', '$log', 'artInventorySelectFactory', 'abDirectiveUtilFactory',
      function(abMessageFactory, abDirectiveUIFactory,
        $timeout, $http, $log, artInventorySelectFactory, abDirectiveUtilFactory) {

        var srvFactory = {};

        srvFactory.initSearchCriteria = function(obj) {
          var scope = obj.scope;
          scope.searchAccessErrMsg = scope.config.wd.jsonOptions.searchAccessErrorMessage.split(',');
          scope.search_mylogin_profile = true;
          var params = window.location.search.substring(1);
          var vars = params.split("&");
          var pendingLscOrderNumber = '';
          if(vars.length > 1){
            pendingLscOrderNumber = vars[1].split("=")[1];
          }

          $http.get(scope.config.wd.jsonOptions.tokenUrl + global.attuid).then(function(response) {
              var res = {
                "xaccesstoken": response.data.token
              }
              amplify.store("artSearchReportAccessToken", res);
              abMessageFactory.publish("artSearchReportTokenGenerated", response.data);
              if(pendingLscOrderNumber){
                amplify.publish('lscOrderSelected', {
                  'lsc_order_number': pendingLscOrderNumber
                });
              }
            },
            function(response) {
              scope.search_mylogin_profile = false;
              $log.error(response);
              var link = document.getElementById('emailSearch');
              link.onclick = function() {
                  this.href = "mailto:rh8744@att.com?subject=";
                  this.href += getData();
              };
              function getData() {
                  return 'User Access Request for Access Rehoming Tool';
              };
            })
        }

        srvFactory.search = function(obj) {
          var scope = obj.scope;
          if (scope.from_date === undefined) {
            scope.from_date = '';
          }
          if (scope.to_date === undefined) {
            scope.to_date = '';
          }
          if (scope.lsc_order === undefined) {
            scope.lsc_order = '';
          }
          if (scope.co_7450 === undefined) {
            scope.co_7450 = '';
          }
          if (scope.wire_center === undefined) {
            scope.wire_center = '';
          }
          if (scope.overdue === undefined) {
            scope.overdue = 'No';
          }

          if (scope.lsc_order === '' && scope.from_date === '' &&
            scope.to_date === '' && scope.co_7450 === '' &&
            scope.wire_center === '' && scope.overdue === 'No') {
            abDirectiveUIFactory.addAlert(scope, {
              type: 'warning',
              msg: 'Atleast one selection criteria is required!'
            });
            amplify.publish('reset', {});
            srvFactory.userEnteredCriteria = "";
          } else {
            var lsc = '',
              dateTo = '',
              co7450 = '',
              wireCenter = '',
              overdueOrders = 'No';
            if (scope.lsc_order === '') {
              lsc = 'All';
            } else {
              lsc = scope.lsc_order;
            }
            if (scope.from_date === '') {
              dateFrom = 'All';
            } else {
              dateFrom = scope.from_date;
            }
            if (scope.to_date === '') {
              dateTo = 'All';
            } else {
              dateTo = scope.to_date;
            }
            if (scope.co_7450 === '') {
              co7450 = 'All';
            } else {
              co7450 = scope.co_7450;
            }
            if (scope.wire_center === '') {
              wireCenter = 'All';
            } else {
              wireCenter = scope.wire_center;
            }
            if (scope.overdue === '') {
              overdueOrders = 'No';
            } else {
              overdueOrders = scope.overdue;
            }
            srvFactory.userEnteredCriteria = {
              'lsc_order': lsc,
              'from_date': dateFrom,
              'to_date': dateTo,
              'co_7450': co7450,
              'wire_center': wireCenter,
              'overdue': overdueOrders
            };

            $timeout(function() {
              amplify.publish('searchClicked', {
                'lsc_order': lsc,
                'from_date': dateFrom,
                'to_date': dateTo,
                'co_7450': co7450,
                'wire_center': wireCenter,
                'overdue': overdueOrders
              });
            }, 500);
          }
        }
        /* Reset to default state */
        srvFactory.reset = function(obj) {
          var scope = obj.scope;
          amplify.publish('reset', {});
          srvFactory.clearText(obj);
          scope.overdue = 'No';
          srvFactory.userEnteredCriteria = "";
        }

        /* Clear user's selections */
        srvFactory.clearText = function(obj) {
          var scope = obj.scope;
          scope.lsc_order = "";
          scope.from_date = "";
          scope.to_date = "";
          scope.co_7450 = "";
          scope.wire_center = "";
        }

        /* Publish selected order */
        srvFactory.parentLscOrderSelected = function(obj) {
          var parentOrderNumber = obj.dataItem;
          amplify.publish('lscOrderSelected', {
            'lsc_order_number': parentOrderNumber
          });
        }
        srvFactory.openOrderSubmissionAppboard = function(obj) {
          var scope = obj.scope;
          var orderSubmissionAppboardUrl = scope.config.wd.jsonOptions.url;
          window.open(orderSubmissionAppboardUrl);
        }

        /* Open wiki page for ART help guide */
        srvFactory.goToHelpGuide = function(obj) {
           artInventorySelectFactory.openHelpGuide(obj);
        }

        srvFactory.loadDashboardReport = function(obj) {
          var scope = obj.scope;
          if(obj.dataItem ){
             scope.token = obj.dataItem.token;
          }
          if(!scope.token){
            scope.token = amplify.store("artSearchReportAccessToken").xaccesstoken;
          }
          scope.hasDashboardReportData = false;
          var url = scope.config.wd.jsonOptions.url + '?_t_s=' + (new Date()).getTime();

          var drGridStyle = abDirectiveUtilFactory.getGridSize(scope.config);
          var h = drGridStyle.height;
          scope.drGridHeight = {
            'height': (h - 50) + 'px'
          };
          scope.gridOptions = {
            "expandableRowTemplate": "/appboard/icecap-appboard-lob-plugins/art/views/template/drExpandableRowTemplate.html",
          //  "enableHorizontalScrollbar": 0,
            "enableFiltering": true,
            "expandableRowHeight": 179
          };

          scope.gridOptions.columnDefs = [
            {
              "name": "",
              "field": "month_year",
              "width": 90,
              "pinnedLeft": true,
              "cellClass": "dr-monthyear-cell",
              "enableColumnMenu": false
            },
            {
              "name": "Parent Orders",
              "field": "total_parent_orders",
              "width": 75,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "Child Orders",
              "field": "total_child_orders",
              "width": 75,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "7330",
              "field": "orders_7330",
              "width": 65,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "7342",
              "field": "orders_7342",
              "width": 65,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "7360",
              "field": "orders_7360",
              "width": 65,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "Pending",
              "field": "orders_pending",
              "width": 80,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "Cancelled",
              "field": "orders_cancelled",
              "width": 85,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            },
            {
              "name": "Completed",
              "field": "orders_completed",
              "width": 85,
              "cellClass": "dr-maingrid-data-row",
              "enableColumnMenu": false
            }
          ];

          scope.$parent.loader.loading = true;
          $timeout(function(){
              $http({
                  "method": "GET",
                    "url": url,
                    "headers": {
                        "x-access-token": scope.token
                    }
              }).then(function(response) {

              var data = response.data;
              for (i = 0; i < data.length; i++) {
                data[i].subGridOptions = {
                  "appScopeProvider": srvFactory.drSubGridScope,
                  "enableColumnMenu": false,
                  "columnDefs": [{
                      "name": "Order Number",
                      "field": "order_number",
                      "width": 145,
                      "enableColumnMenu": false,
                      "cellTemplate": "<div style='padding-left:14px;padding-top:2px'><a href='#' ng-click='grid.appScope.drSubgridOrderNumberSelected(row.entity.order_number)'>{{row.entity.order_number}}</a></div>"
                    },
                    {
                      "name": "Order Type",
                      "field": "order_type_node",
                      "width": 100,
                      "cellClass": "dr-subgrid-data-row",
                      "enableColumnMenu": false
                    },
                    {
                      "name": "Order Status",
                      "field": "order_status",
                      "width": 140,
                      "cellClass": "dr-subgrid-data-row",
                      "enableColumnMenu": false
                    },
                    {
                      "name": "Order Date",
                      "field": "order_date",
                      "width": 110,
                      "cellClass": "dr-subgrid-data-row",
                      "cellFilter": "formatDateValue",
                      "enableColumnMenu": false
                    },
                    {
                      "name": "Order Due Date",
                      "field": "order_due_date",
                      "width": 105,
                      "cellClass": "dr-subgrid-data-row",
                      "cellFilter": "formatDateValue",
                      "enableColumnMenu": false
                    },
                    {
                      "name": "Order Completion Date",
                      "field": "order_completion_date",
                      "width": 120,
                      "cellClass": "dr-subgrid-data-row",
                      "cellFilter": "formatDateValue",
                      "enableColumnMenu": false
                    }
                  ],
                  "data": data[i].orders
                }
              }
              scope.gridOptions.data = data;
              srvFactory.drData = data;
              if(!scope.config.wd.wTitle || scope.config.wd.wTitle.indexOf('Search Results') != -1){
                scope.config.wd.wTitle = 'Dashboard Report'
              }
              scope.$parent.loader.loading = false;
              scope.hasDashboardReportData = (scope.gridOptions.data && scope.gridOptions.data.length > 0);
            }, function(response) {
              abDirectiveUIFactory.addAlert(scope, {
                type: 'error',
                msg: 'Error in retrieving data from server.'
              });
              $log.error(response);
              scope.$parent.loader.loading = false;
              scope.hasDashboardReportData = false;
            });
          }, 1000);
          scope.gridOptions.onRegisterApi = function(gridApi) {
            scope.gridApi = gridApi;
          };
        }

        srvFactory.drSubGridScope = {
          drSubgridOrderNumberSelected: function(ordNum){
            var drLscOrderNumber = ordNum;
            amplify.publish('lscOrderSelected', {
              'lsc_order_number': drLscOrderNumber
            });
          }
       }

       /* Dashboard Report excel */
      srvFactory.exportDashboardReport = function(obj){
      var fileTitle = 'Dashboard Report';
      var csv = ''
      var drData = srvFactory.drData;
      var drMainGridData = [];
      var subgridObj = {};
      var subgridData = [];
      for (var i in drData){
         var drMainGridObj = {};
         for(var key in drData[i]){
             if(key !== 'subGridOptions' && key !== '$$hashKey'){
              drMainGridObj[key] = drData[i][key];
            }
          }
          if(Object.keys(drMainGridObj).length !== 0 && drMainGridObj.constructor === Object){
            drMainGridData.push(drMainGridObj);
          }
        }
        var subgridDataRows = [];
        if(drMainGridData.length > 0) {
           for(var j in drMainGridData) {
             if(drMainGridData[j].orders.length > 0 || subgridDataRows.length === 0) {
               subgridDataRows = drMainGridData[j].orders;
               break;
             } else {
               continue;
             }
           }
          var subgridCol = [];
          if(subgridDataRows.length > 0) {
            subgridCol = Object.keys(subgridDataRows[0]);
          }
          var maingridCol = Object.keys(drMainGridData[0]);
          var orders = '';
          var csvContent = createHierarchicalGridCSVContent(maingridCol, drMainGridData);
          csv += csvContent + '\r\n';
        }
        downloadCsvFile(csv, fileTitle);
      }
        srvFactory.ExportSearchResultsToExcel = function(obj) {
          var scope = obj.scope;
          var fileTitle = 'Search Results';
          var csv = ''
          var criteria = [];
          var criteriaColumns = Object.keys(srvFactory.userEnteredCriteria);
          var criteriaData = [];
          criteriaData.push(srvFactory.userEnteredCriteria);
          var csvContentSc = artInventorySelectFactory.updateCSVContent(criteriaColumns, criteriaData);
          csv = 'Search Criteria:' + '\r\n';
          csv += csvContentSc + '\r\n' + '\r\n';
          if (scope.data.length > 0) {
            var searchResultsObject = scope.data;
            var csvData = artInventorySelectFactory.prepareDataForCSVContent(searchResultsObject);
            var searchResultsColumns = csvData.columns;
            var searchResultsData = csvData.data;
            var csvContSr = artInventorySelectFactory.updateCSVContent(searchResultsColumns, searchResultsData);
            csv += 'Search Results:' + '\r\n';
            csv += csvContSr;
          } else {
            csv += '';
          }
          downloadCsvFile(csv, fileTitle);
        }
        var createHierarchicalGridCSVContent = function(columns, data) {
          var csvContent = "";
          /* Get Column row */
          if (!(columns === null || columns === '' || columns === undefined)) {
            var rowContent = "";
            /* This loop will extract the column headers from columns array */
            for (var j = 0; j < columns.length; j++) {
              if (!(columns[j] === undefined || columns[j] === 'orders')) {
                var column = columns[j].replace(/_/g, " ");
                rowContent += column.toUpperCase() + ',';
              }
            }
            rowContent = rowContent.slice(0, -1);
            csvContent += rowContent + '\r\n';
          }

          /* Get data rows */
          if (data === null && typeof variable === "object") {
            data = '';
          }

          if (!(data === '')) {
            //1st loop is to extract each row
            for (var i = 0; i < data.length; i++) {
              var nestedData = JSON.parse(angular.toJson(data[i].orders));
              var rowCont = "";
              // 2nd loop to extract each column and convert it in a comma-separated string
              for (var index = 0; index < columns.length; index++) {
                    var columnName = columns[index];
                    var value = data[i][columnName];
                    if (typeof value === 'undefined') {
                      value = '';
                    }
                    if (value === null) {
                      value = '';
                    }
                    if(value.constructor !== Array){
                      rowCont += '"' + value + '",';
                    }
              }
              rowCont.slice(0, -1);
              csvContent += rowCont + '\r\n';
              if(nestedData.length > 0){
                var nestedCol = Object.keys(nestedData[0]);
                var rowC = "";
                /* This loop will extract the column headers from columns array */
                for (var k = 0; k <nestedCol.length; k++) {
                  if (nestedCol[k] !== undefined) {
                    var nCol = nestedCol[k].replace(/_/g, " ");
                    rowC += nCol.toUpperCase() + ',';
                  }
                }
                rowC = rowC.slice(0, -1);
                csvContent +=  ',' + rowC + '\r\n';
              /* Get data rows */
                //1st loop is to extract each data row
                for (var m = 0; m < nestedData.length; m++) {
                    var row_con = "";
                    //2nd loop will extract each column and convert it in string comma-separated row
                    for (var idx = 0; idx < nestedCol.length; idx++) {
                      var nColName = '', val = '';
                        nColName = nestedCol[idx];
                        if(nColName === 'order_date' || nColName === 'order_due_date' || nColName === 'order_completion_date') {
                          val = nestedData[m][nColName].substring(0, 10);
                        } else {
                          val = nestedData[m][nColName];
                        }
                        if (typeof val === 'undefined') {
                          val = '';
                        }
                        if (val === null) {
                          val = '';
                        }
                        row_con +=  '"' + val + '",';
                    }
                    row_con.slice(0, -1);
                    csvContent += ',' + row_con + '\r\n';
                }
              }
            }
          }
          return csvContent;
        }
        var downloadCsvFile = function(csv, fileTitle){
          if (csv === '') {
            alert('No data')
            return
          }
          // Generate a file name
          var fileName = ''
          // this will remove the blank-spaces from the title and replace it with an underscore
          fileName += fileTitle.replace(/ /g, '_')

          if (navigator.msSaveBlob) {
            var blob = new Blob([csv], {
              type: 'text/csv;charset=utf-8;'
            })
            navigator.msSaveOrOpenBlob(blob, fileName + '.csv')
          } else {
            // Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(csv)
            // Now the little tricky part.
            // you can use either>> window.open(uri)
            // but this will not work in some browsers
            // or you will not get the correct file extension
            // this trick will generate a temp <a /> tag
            var link = document.createElement('a')
            link.href = uri
            // set the visibility hidden so it will not effect on your web-layout
            link.style = 'visibility:hidden'
            link.download = fileName + '.csv'
            // this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        }

        return srvFactory
        }
      ])
      .filter('formatDateValue', function() {
          return function(input) {
            if (!input){
              return '';
            } else {
              return input.substring(0, 10);
            }
          };
       });
