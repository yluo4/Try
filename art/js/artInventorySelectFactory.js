angular.module('abFactories').factory('artInventorySelectFactory', ['abMessageFactory', 'abDirectiveDataFactory', 'abDirectiveUIFactory', '$http', '$log',
  function(abMessageFactory, abDirectiveDataFactory, abDirectiveUIFactory, $http, $log) {
    var srvFactory = {};

    /* Event method for initialization when inventory select widget is loaded */
    srvFactory.init = function(obj) {
      var scope = obj.scope; // form base widget scope
      scope.accessErrMsg = scope.config.wd.jsonOptions.accessErrorMessage.split(',');
      scope.mylogin_profile = true;
      $http.get(scope.config.wd.jsonOptions.tokenUrl + global.attuid).then(function(response) {
          var res = {
            "xaccesstoken": response.data.token
          }
          amplify.store("artAccessToken", res);
          abMessageFactory.publish("artAccessTokenGenerated", response.data);
        },
        function(response) {
          scope.mylogin_profile = false;
          $log.error(response);
          var link = document.getElementById('email');
          link.onclick = function() {
              this.href = "mailto:rh8744@att.com?subject=";
              this.href += getData();
          };
          function getData() {
              return 'User Access Request for Access Rehoming Tool';
          };
        })
    }


    /* Capture user selected options as an array, publish array and wirecenter id. */
    srvFactory.select = function(obj) {
      var scope = obj.scope;
      scope.parameters = [];
      if (scope.region_id) {
        angular.forEach(scope.regions, function(reg) {
          if (scope.region_id === reg.id) {
            var region = reg.value;
            scope.parameters.push({
              name: 'Region',
              value: region
            });
          }
        });
      } else {
        scope.parameters.push({
          name: 'Region',
          value: ''
        });
      }
      if (scope.state_id) {
        angular.forEach(scope.states, function(st) {
          if (scope.state_id === st.id) {
            var state = st.value;
            scope.parameters.push({
              name: 'State',
              value: state
            });
          }
        });
      } else {
        scope.parameters.push({
          name: 'State',
          value: ''
        });
      }
      if (scope.dma_id) {
        angular.forEach(scope.dmas, function(dma) {
          if (scope.dma_id === dma.id) {
            var dma = dma.value;
            scope.parameters.push({
              name: 'Dma',
              value: dma
            });
          }
        });
      } else {
        scope.parameters.push({
          name: 'DMA',
          value: ''
        });
      }
      if (scope.wirecenter_id) {
        angular.forEach(scope.wirecenters, function(co) {
          if (scope.wirecenter_id === co.id) {
            var wireCenter = co.value;
            scope.parameters.push({
              name: 'Wire Center',
              value: wireCenter
            });
          }
        });
      } else {
        scope.parameters.push({
          name: 'Wire Center',
          value: ''
        });
      }
      scope.parameters.splice(0, 0, {
        name: 'PARAMETER',
        value: 'VALUE'
      });

      srvFactory.selectedParameters = scope.parameters;
      amplify.publish('parametersSelected', {
        'parameters': scope.parameters
      });
      if (!(scope.wirecenter_id === null || scope.wirecenter_id === '' || scope.wirecenter_id === undefined)) {
        abMessageFactory.publish("wirecenterSelected", {
          "wirecenter_id": scope.wirecenter_id
        });
      } else {
        abDirectiveUIFactory.addAlert(scope, {
          type: 'warning',
          msg: 'Please select a wirecenter!'
        });
      }
    }
    /* Clear out all drop downs if no region is selected.
     * If region is selected, publish region_id. */
    srvFactory.regionSelected = function(obj) {
      var scope = obj.scope;
      if (scope.region_id === null || scope.region_id === "") {
        scope.state_id = "";
        scope.dma_id = "";
        scope.wirecenter_id = "";
        scope.states = [];
        scope.dmas = [];
        scope.wirecenters = [];
        srvFactory.reset(obj);
      } else {
        amplify.publish('regionSelected', {
          "region_id": scope.region_id
        });
      }
    }
    /* Clear out subsequent drop downs if no state is selected.
     * If state is selected, publish state_id. */
    srvFactory.stateSelected = function(obj) {
      var scope = obj.scope;
      if (scope.state_id === null || scope.state_id === "") {
        scope.dma_id = "";
        scope.wirecenter_id = "";
        scope.dmas = [];
        scope.wirecenters = [];
        srvFactory.clearSelectedData();
      } else {
        amplify.publish('stateSelected', {
          "state_id": scope.state_id
        });
      }
    }
    /* Clear out subsequent drop downs if no dma is selected.
     * If dma is selected, publish dma_id. */
    srvFactory.stateDmaSelected = function(obj) {
      var scope = obj.scope;
      if (scope.dma_id === null || scope.dma_id === "") {
        scope.wirecenter_id = "";
        scope.wirecenters = [];
        srvFactory.clearSelectedData();
      } else {
        amplify.publish('stateDmaSelected', {
          "state_id": scope.state_id,
          "dma_id": scope.dma_id
        });
      }
    }
    /* Clear out subsequent drop downs if no wire center is selected.
     * If wire center is selected, publish wirecenter_id. */
    srvFactory.wirecenterSelected = function(obj) {
      srvFactory.clearSelectedData();
      srvFactory.selectedDeviceRow = null;
      srvFactory.cardsData = "";
      srvFactory.ports = "";
      if(srvFactory.isRehomeChecked) {
        amplify.publish('resetIsDeviceStaticFlag', {'wc_id' : obj.scope.wirecenter_id});
      }
    }

    /* Clear all selected data. */
    srvFactory.reset = function(obj) {
      var scope = obj.scope;
      scope.region_id = "";
      scope.state_id = "";
      scope.dma_id = "";
      scope.wirecenter_id = "";
      scope.states = [];
      scope.dmas = [];
      scope.wirecenters = [];
      scope.parameters = [];
      srvFactory.selectedParameters = "";
      srvFactory.selectedDeviceRow = null;
      srvFactory.cardsData = "";
      srvFactory.ports = "";
      srvFactory.clearSelectedData();
    }

    srvFactory.clearSelectedData = function() {
      amplify.publish('reset', {});
    }
    /* Publish selected device. */
    srvFactory.deviceSelected = function(obj) {
      var scope = obj.scope;
      var device_name = obj.dataItem;
      amplify.publish('deviceSelected', {
        'device_name': device_name
      });
      if (scope.isChecked) {
        scope.isDeviceStatic = true;
      }

      // Icecap publishes selected row with the name - (widgetName + 'ItemSelected')
      amplify.subscribe('artSelectDeviceItemSelected', function(selectedDeviceRow) {
        srvFactory.selectedDeviceRow = selectedDeviceRow;
      });
    }
    /* To change device name to a link from static if user already selected a rehome device, but navigates away from it by selecting a different wirecenter */
    srvFactory.resetDeviceStatic = function(obj){
      var scope = obj.scope;
      if (scope.selectedItem.wire_center === obj.dataItem.wc_id) {
        if(scope.selectedItem.device_name !== scope.rehomeDevice){
          scope.isDeviceStatic = false;
        }
      }
    }

    /* If rehome checkbox is checked, make device name static in device widget. */
    srvFactory.rehomeChecked = function(obj) {
      var scope = obj.scope;
      scope.rehomeDevice = obj.dataItem.deviceName;
      srvFactory.isRehomeChecked = scope.isChecked = obj.dataItem.isChecked;
      if (scope.selectedItem.device_name === scope.rehomeDevice && obj.dataItem.isChecked) {
        scope.isDeviceStatic = true;
      } else if (scope.selectedItem.device_name === scope.rehomeDevice && !obj.dataItem.isChecked) {
        scope.isDeviceStatic = false;
      } else {
        scope.isDeviceStatic = false;
      }
    }
    /* Device widget init function. */
    srvFactory.initDevice = function(obj) {
      var scope = obj.scope;
      scope.isDeviceStatic = false;
    }
    /* Preapre card and port arrays for cards and ports widget. Publish ports data. */
    srvFactory.loadCardsView = function(obj) {
      var scope = obj.scope;
      scope.device_name = obj.dataItem.device_name;
      var token = amplify.store("artAccessToken");
      var header = {
        "headers": {
          "x-access-token": token["xaccesstoken"]
        }
      };
      scope.loader.loading = true;
      $http.get(scope.config.wd.jsonOptions.url + scope.device_name + '?_t_s=' + (new Date()).getTime(), header)
        .success(function(data, status, headers, config) {
          var cardRows = [];
          var portRows = [];
          if (data.name === obj.dataItem.device_name) {
            var slots = data.slots;
            for (var i = 0; i < slots.length; i++) {
              var subSlots = slots[i].sub_slot;
              for (var j = 0; j < subSlots.length; j++) {
                var subSlot = subSlots[j];
                var portsInfo = subSlot.sub_slot_ports;
                var cardRow = {
                  slot: subSlot.slot,
                  sub_slot: subSlot.sub_slot,
                  sub_slot_desc: subSlot.sub_slot_desc,
                  sub_slot_equipped_status: subSlot.sub_slot_equipped_status,
                  sub_slot_admin_status: subSlot.sub_slot_admin_status,
                  sub_slot_operational_status: subSlot.sub_slot_operational_status
                };
                cardRows.push(cardRow);

                for (var k = 0; k < portsInfo.length; k++) {
                  var portRow = {
                    slot: portsInfo[k].slot,
                    sub_slot: portsInfo[k].sub_slot,
                    port_num: portsInfo[k].port_num,
                    port_type: portsInfo[k].port_type,
                    port_desc: portsInfo[k].port_desc,
                    port_speed: portsInfo[k].port_speed,
                    admin_status: portsInfo[k].admin_status,
                    oper_status: portsInfo[k].oper_status,
                    z_clli: portsInfo[k].z_clli,
                    z_device: portsInfo[k].z_device,
                    z_slot: portsInfo[k].z_slot,
                    z_sub_slot: portsInfo[k].z_sub_slot,
                    z_port: portsInfo[k].z_port,
                    z_port_status: portsInfo[k].port_status,
                    z_vendor: portsInfo[k].z_vendor,
                    z_model: portsInfo[k].z_model,
                    z_device_type: portsInfo[k].z_device_type
                  };
                  portRows.push(portRow);
                }
              }
            }
            scope.data = cardRows;
            scope.loader.loading = false;
            srvFactory.cardsData = cardRows;
            amplify.publish('portsData', {
              'ports': portRows
            });

          } else {
            cardRows = [];
            portRows = [];
            scope.data = [];
            srvFactory.cardsData = '';
            amplify.publish('portsData', {
              'ports': ''
            });
          }
          amplify.publish('deviceData', {
            'device_data': data
          });
        })
        .error(function(data, status, headers, config) {
          abDirectiveUIFactory.addAlert(scope, {
            type: 'error',
            msg: 'Oops, an error has happened!'
          });
          $log.error(data);
          scope.loader.loading = false;
        });
    }
    /* Get port data. */
    srvFactory.loadPortsView = function(obj) {
      var scope = obj.scope;
      scope.loader.loading = true;
      var data = [];
      amplify.subscribe('portsData', function(ports) {
        data = Object.keys(ports).map(function(key) {
          return ports[key];
        });
        scope.data = data[0];
        scope.loader.loading = false;
        srvFactory.ports = scope.data;
      });
    }
    srvFactory.clearCardsPortsData = function(obj) {
      var scope = obj.scope;
      if (!obj.dataItem.isChecked) {
        scope.data = '';
        srvFactory.selectedDeviceRow = '';
        srvFactory.cardsData = '';
        srvFactory.ports = '';
      }
    }
    srvFactory.reloadCardsView = function(obj) {
      var scope = obj.scope;
      var deviceDatasLen = obj.dataItem.device_datas.length;
      obj.dataItem.device_name = obj.dataItem.device_datas[deviceDatasLen-1].name;
      srvFactory.loadCardsView(obj);
    }
    srvFactory.reloadPortsView = function(obj) {
      var scope = obj.scope;
      srvFactory.loadPortsView(obj);
    }
    /* Publish selected order */
    srvFactory.lscOrderSelected = function(obj) {
      var orderNumber = obj.dataItem;
      amplify.publish('lscOrderSelected', {
        'lsc_order_number': orderNumber
      });
    }
    /* Publish refresh pending orders event to refresh the grid data */
    srvFactory.refreshPendingOrders = function(obj) {
      amplify.publish('refreshPendingOrdersEvent', {"wirecenter_id": amplify.store("wirecenterSelectedData").wirecenter_id});
    }

    srvFactory.openSearchReportingAppboard = function(obj) {
      var scope = obj.scope;
      var searchAndReportingAppboardUrl = scope.config.wd.jsonOptions.url;
      window.open(searchAndReportingAppboardUrl);
    }
    /* Open ART tool help guide wiki page */
    srvFactory.openHelpGuide = function(obj) {
      var scope = obj.scope;
      var helpGuideUrl = scope.config.wd.jsonOptions.helpGuideUrl;
      window.open(helpGuideUrl);
    }
    /* Export to excel function for device widget. */
    srvFactory.exportCo7450ToExcel = function(obj) {
      var reportTitle = 'Devices';
      var params = srvFactory.selectedParameters;
      var devices = '',
        selectedDeviceData = '',
        cards = '',
        ports = '';
      var downloadReport = true;
      if (obj.scope.data.length > 0) {
        devices = obj.scope.data;
      }
      exportDeviceCompleteDataToExcel(reportTitle, params, devices, selectedDeviceData, cards, ports);
    }
    /* Export to excel function for cards and ports widget. */
    srvFactory.exportSelectedDeviceCompleteDataToExcel = function(obj) {
      var reportTitle = 'Complete CO7450 Data';
      var devices = '';
      var params = '';
      var selectedDeviceData = '';
      var cards = srvFactory.cardsData;
      var ports = srvFactory.ports;
      if (!(cards === '' && ports === '')) {
        params = srvFactory.selectedParameters;
        selectedDeviceData = srvFactory.selectedDeviceRow;
      }
      exportDeviceCompleteDataToExcel(reportTitle, params, devices, selectedDeviceData, cards, ports);
    }

    /* ART's general export to excel function called by individual export to excel funtion of the widget. */
    var exportDeviceCompleteDataToExcel = function(reportTitle, params, devices, selectedDeviceData, cards, ports) {
      var fileTitle = reportTitle;
      var csv = ''
      var row = ''

      /* Display selected parameters */
      if (params !== '') {
        var rowContent = "";
        //loop will extract each value and convert it in string comma-separated
        for (var i = 0; i < params.length; i++) {
          var parameterName = params[i].name;
          var parameterValue = params[i].value;
          if (typeof parameterName === 'undefined') {
            parameterName = '';
          }
          if (typeof parameterValue === 'undefined') {
            parameterValue = '';
          }
          rowContent += parameterName + ',' + parameterValue + '\r\n';
        }
        rowContent.slice(0, rowContent.length - 1);
        csv += rowContent + '\r\n' + '\r\n';
      }
      /* Export devices */
      if (!(devices === '' || devices === null || devices === undefined)) {
        var devicesCSVData = srvFactory.prepareDataForCSVContent(devices);
        var deviceColumns = devicesCSVData.columns;
        for (var k in deviceColumns) {
          if (deviceColumns[k] === 'wire_center' || deviceColumns[k] === 'device_color_value') {
            delete deviceColumns[k];
          }
        }
        delete deviceColumns.dashbd_id;
        var devicesData = devicesCSVData.data;
        for (var j = 0; j < devicesData.length; j++) {
          /* By default, icecap inserts dashboard id in grid's selected item */
          delete devicesData[j].dashbd_id;
          delete devicesData[j].wire_center;
          delete devicesData[j].device_color_value;
          if (devicesData[j]['g6_supported']) {
            var val = devicesData[j].g6_supported;
            if (!(val === null || val === '' || val === undefined)) {
              val = val.replace(/,/g, ', ');
              devicesData[j].g6_supported = val;
            }
          }
        }
        var csvcont = srvFactory.updateCSVContent(deviceColumns, devicesData);
        csv += csvcont + '\r\n' + '\r\n';
      }
      /* Export selected device */
      if (!(selectedDeviceData === '' || selectedDeviceData === null || selectedDeviceData === undefined)) {
        var selectedDeviceRowOriginal = JSON.parse(angular.toJson(selectedDeviceData));
        /* By default, icecap inserts dashboard id in grid's selected item */
        delete selectedDeviceRowOriginal.dashbd_id;
        delete selectedDeviceRowOriginal.wire_center;
        delete selectedDeviceRowOriginal.device_color_value;
        var value = selectedDeviceRowOriginal.g6_supported;
        if (!(value === null || value === '' || value === undefined)) {
          value = value.replace(/,/g, ', ');
          selectedDeviceRowOriginal.g6_supported = value;
        }
        var selectedDeviceColumns = [];
        var selectedDeviceColumns = Object.keys(selectedDeviceRowOriginal);
        var selectedDeviceRow = [];
        selectedDeviceRow.push(selectedDeviceRowOriginal);
        var csvContent = srvFactory.updateCSVContent(selectedDeviceColumns, selectedDeviceRow);
        csv += csvContent + '\r\n' + '\r\n';
      }
      /* Export cards for selected device */
      if (!(cards === '' || cards === null || cards === undefined)) {
        var cardCSVData = srvFactory.prepareDataForCSVContent(cards);
        var cardColumns = cardCSVData.columns;
        var cardData = cardCSVData.data;
        var csv_cont = srvFactory.updateCSVContent(cardColumns, cardData);
        csv += csv_cont + '\r\n' + '\r\n';
      }
      /* Export ports for selected device */
      if (!(ports === '' || ports === null || ports === undefined)) {
        var portCSVData = srvFactory.prepareDataForCSVContent(ports);
        var portColumns = portCSVData.columns;
        var portData = portCSVData.data;
        var csvcontent = srvFactory.updateCSVContent(portColumns, portData);
        csv += csvcontent + '\r\n' + '\r\n';
      }

      if (csv === '') {
        alert('No Data')
        return
      }
      // Generate a file name
      var fileName = ''
      // This will remove the blank-spaces from the title and replace it with an underscore
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
    /* Prepare data for CSV. */
    srvFactory.prepareDataForCSVContent = function(data) {
      var arrData = JSON.parse(angular.toJson(data));
      var col = Object.keys(arrData[0]);
      var csvData = {
        data: arrData,
        columns: col
      }
      return csvData;
    }
    /* Update CSV */
    srvFactory.updateCSVContent = function(columns, data) {
      var csvContent = "";
      /* Get Column row */
      if (columns !== null || columns !== '' || columns !== undefined) {
        var rowContent = "";
        /* This loop will extract the column headers from columns array */
        for (var j = 0; j < columns.length; j++) {
          if (columns[j] !== undefined) {
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
          var rowContent = "";
          //2nd loop will extract each column and convert it in string comma-separated
          for (var index in columns) {
            var columnName = columns[index];
            var value = data[i][columnName];
            if (typeof value === 'undefined') {
              value = '';
            }
            if (value === null) {
              value = '';
            }
            rowContent += '"' + value + '",';
          }
          rowContent.slice(0, -1);
          csvContent += rowContent + '\r\n';
        }
      }
      return csvContent;
    }

    return srvFactory
  }
])
