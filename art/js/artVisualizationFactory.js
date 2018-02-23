angular.module('abFactories').factory("artVisualizationFactory", ['$http', '$timeout', '$q', 'abRepoFactory', function ($http, $timeout, $q, abRepoFactory) {
    var srvFactory = {};
    var state = {
        rehomeChecked: false,
        isShowInNodeView: false,
        isShowRehomeView: false,
        maxOrderCount: 0,
        currOrderCount: 0
    };
    var portStatusMap = {
        "WORKING": "type-working",
        "PENDING": "type-pending",
        "PENDING ORDER": "type-pending-order",
        "IN PROGRESS": "type-in-progress",
        "DESIGN": "type-design",
        "RESERVED": "type-reserved",
        "DEFECTIVE": "type-defective",
        "SPARE": "type-spare"
    };

    // In Node View.  This is section will have all the methods for the in node view widgets.
    var inNodeView = {};
    srvFactory.inNodeViewInitial = function(obj) {
        var scope = obj.scope;
        var inNode = {};
        scope.inNode = inNode;

        inNode.isShowInNodeView = false;
        state.isShowInNodeView = false;
        // legend
        inNode.isShowLegend = false;
        inNode.legendBtnClick = function(e) {
            var btn = $(e.currentTarget);
            if (!inNode.isShowLegend) {
                var offset = btn.offset();
                $(".color-key").css({
                    top:  offset.top,
                    left: offset.left
                });
            }
            inNode.isShowLegend = !inNode.isShowLegend;
        };
        inNode.legendCancelIconClick = function() {
            inNode.isShowLegend = false;
        };

        inNode.rehomeChecked = false;
        inNode.rehomeCheckChanged = function() {
            state.rehomeChecked = inNode.rehomeChecked;
            amplify.publish('rehomeCheckboxChangeEvent', {
                "deviceName": inNodeView.deviceName,
                "isChecked": inNode.rehomeChecked
            });

            wipeOutViewPickedStatus(inNodeView);
            resetOrderSummary();
            enableWorkingPorts();
            disableViewSparePorts(inNodeView, "Source port cannot be a Spare port.");
        };

        inNode.portClick = function(m, n) {
            var device = inNodeView.device;
            var port = device[m][n];
            if (!port || !port.isPickable) return false;

            if (port.isPicked) {
                if (port.isFromPort) {
                    fromPortUnPickedHandler([m, n]);
                } else {
                    if (summary.sourcePicked) {
                        alert("Sorry! You cannot unselect this 'to' port, because there is still one 'from' port without 'to' port!");
                    } else {
                        toPortUnPickedHandler([m, n]);
                    }
                }
            } else {
                if (!summary.sourcePicked) {
                    fromPortPickedHandler([m, n]);
                } else {
                    toPortPickedHandler([m, n], true);
                }
            }
        };

        inNode.portMouseOver = function(m, n, e) {
            var device = inNodeView.device;
            var port = device[m][n];

            // showing associated picked port.
            if (port && port.isPicked) {
                if (port.isFromPort) {
                    fromPortMouseoverHandler([m, n]);
                } else {
                    toPortMouseoverHandler([m, n]);
                }
            }

            // showing port tooltip
            if (port) {
                setInfoTooltipContent(port);
                infoTooltip.isPortTooltip = true;
                infoTooltip.isShow = true;
            }
        };
        inNode.portMouseOut = function(m, n) {
            var device = inNodeView.device;
            var port = device[m][n];

            // hiding associated picked port.
            if (port && port.isPicked) {
                if (port.isFromPort) {
                    fromPortMouseoutHandler([m, n]);
                } else {
                    toPortMouseoutHandler([m, n]);
                }
            }

            // hiding port tooltip
            if (port) {
                infoTooltip.isShow = false;
            }
        };

        inNode.resetBtnClick = function() {
            resetOrderSummary();
            wipeOutViewPickedStatus(inNodeView);
            enableWorkingPorts();
            disableViewSparePorts(inNodeView, "Source port cannot be a Spare port.");
            if (state.isShowRehomeView) {
                wipeOutViewPickedStatus(rehomeView);
                disableViewSparePorts(rehomeView, "Source port cannot be a Spare port.");
            }
        };

        inNode.getPortName = getPortName;

        inNode.iomMdaMouseOver = iomMdaMouseOver;
        inNode.iomMdaMouseOut = iomMdaMouseOut;
    };

    srvFactory.loadInNodeDeviceInfoBegin = function(obj) {
        var scope = obj.scope;
        if (!state.rehomeChecked) {
            scope.$parent.loader.loading = true;
        }
    };

    srvFactory.loadInNodeDeviceInfo = function(obj) {
        if (state.rehomeChecked) return;

        var scope = obj.scope;
        //var inNode = scope.inNode || {};
        var data = obj.dataItem.device_data;

        setInNodeDeviceInfo(obj, data);
        /*
        inNode.isShowInNodeView = true;
        state.isShowInNodeView = true;
        inNodeView = deviceInfoConverter(data);
        findIOPorts(inNodeView);
        //findLagMembersAndG6Access();
        findLagMembers(inNodeView);
        findG6Access(inNodeView);
        inNode.inNodeView = inNodeView;

        resetOrderSummary();
        enableWorkingPorts();
        disableViewSparePorts(inNodeView, "Source port cannot be a Spare port.");
        */
        scope.$parent.loader.loading = false;
    };
    srvFactory.loadInNodeDeviceInfoFromSubmission = function(obj) {
        var scope = obj.scope;
        var datas = obj.dataItem.device_datas;

        setInNodeDeviceInfo(obj, datas[0]);
    };
    var setInNodeDeviceInfo = function(obj, data) {
        var scope = obj.scope;
        var inNode = scope.inNode || {};

        inNode.isShowInNodeView = true;
        state.isShowInNodeView = true;
        inNodeView = deviceInfoConverter(data);
        findIOPorts(inNodeView);
        //findLagMembersAndG6Access();
        findLagMembers(inNodeView);
        findG6Access(inNodeView);
        inNode.inNodeView = inNodeView;

        resetOrderSummary();
        enableWorkingPorts();
        disableViewSparePorts(inNodeView, "Source port cannot be a Spare port.");
    };

    srvFactory.resetInNodeVisual = function(obj) {
        var scope = obj.scope;
        // wipe out the selections if rehome checkbox is checked, otherwise
        // blank out in node
        var inNode = scope.inNode || {};
        if (state.rehomeChecked) {
            wipeOutViewPickedStatus(inNodeView);
            enableWorkingPorts();
            disableViewSparePorts(inNodeView, "Source port cannot be a Spare port.");
        } else {
            inNode.isShowInNodeView = false;
            state.isShowInNodeView = false;
        }

        // reset order summary
        resetOrderSummary();
    };


    // Rehome view.  This section will have all the methods for Rehome view widgets
    var rehomeView = {};
    srvFactory.rehomeViewInitial = function(obj) {
        var scope = obj.scope;
        var rehome = {};
        scope.rehome = rehome;

        rehome.isShowRehomeView = false;
        state.isShowRehomeView = false;

        rehome.portClick = function(m, n) {
            var device = rehomeView.device;
            var port = device[m][n];
            if (!port || !port.isPickable) return false;

            if (port.isPicked) {
                if (summary.sourcePicked) {
                    alert("Sorry! You cannot unselect this 'to' port, because there is still one 'from' port without 'to' port!");
                } else {
                    toPortUnPickedHandler([m, n]);
                }
            } else {
                toPortPickedHandler([m, n], false);
            }
        };

        rehome.portMouseOver = function(m, n) {
            var device = rehomeView.device;
            var port = device[m][n];

            if (port && port.isPicked) {
                toPortMouseoverHandler([m, n]);
            }

            // showing port tooltip
            if (port) {
                setInfoTooltipContent(port);
                infoTooltip.isPortTooltip = true;
                infoTooltip.isShow = true;
            }
        };
        rehome.portMouseOut = function(m, n) {
            var device = rehomeView.device;
            var port = device[m][n];

            if (port && port.isPicked) {
                toPortMouseoutHandler([m, n]);
            }

            // hiding port tooltip
            if (port) {
                infoTooltip.isShow = false;
            }
        };

        rehome.getPortName = getPortName;

        rehome.iomMdaMouseOver = iomMdaMouseOver;
        rehome.iomMdaMouseOut = iomMdaMouseOut;
    };

    srvFactory.loadRehomeDeviceInfoBegin = function(obj) {
        var scope = obj.scope;
        if (state.rehomeChecked) {
            scope.$parent.loader.loading = true;
        }
    };

    srvFactory.loadRehomeDeviceInfo = function(obj) {
        if (!state.rehomeChecked) return;

        var scope = obj.scope;
        var rehome = scope.rehome || {};
        var data = obj.dataItem.device_data;

        setRehomeDeviceInfo(obj, data);
        /*
        rehome.isShowRehomeView = true;
        state.isShowRehomeView = true;
        rehomeView = deviceInfoConverter(data);
        findIOPorts(rehomeView);
        findG6Access(rehomeView);
        rehome.rehomeView = rehomeView;

        wipeOutViewPickedStatus(inNodeView);
        resetOrderSummary();
        enableWorkingPorts();
        disableSparePorts("Source port cannot be a Spare port.");
        */
        scope.$parent.loader.loading = false;
    };
    srvFactory.loadRehomeDeviceInfoFromSubmission = function(obj) {
        if (!state.rehomeChecked) return;
        var scope = obj.scope;
        var datas = obj.dataItem.device_datas;

        setRehomeDeviceInfo(obj, datas[1]);
    };
    var setRehomeDeviceInfo = function(obj, data) {
        var scope = obj.scope;
        var rehome = scope.rehome || {};

        rehome.isShowRehomeView = true;
        state.isShowRehomeView = true;
        rehomeView = deviceInfoConverter(data);
        findIOPorts(rehomeView);
        findG6Access(rehomeView);
        rehome.rehomeView = rehomeView;

        wipeOutViewPickedStatus(inNodeView);
        resetOrderSummary();
        enableWorkingPorts();
        disableSparePorts("Source port cannot be a Spare port.");
    };

    srvFactory.uncheckRehomeHandler = function(obj) {
        var scope = obj.scope;
        var rehome = scope.rehome || {};

        if (!state.rehomeChecked) {
            rehome.isShowRehomeView = false;
            state.isShowRehomeView = false;
        }
    };

    srvFactory.resetRehomeVisual = function(obj) {
        var scope = obj.scope;
        // blank out rehome
        var rehome = scope.rehome || {};
        rehome.isShowRehomeView = false;
        state.isShowRehomeView = false;
    };


    // Order Summary.  This is for order summary widgets.
    var summary = {
        "source": {},
        "sourcePicked": false,
        "orders": [],
        "orderNum": 0,
        "from": "",
        "to": "",
        "scenario": {},
        "scenarioChosen": false,
        "lagTargetSlotsMap": {},
        "g6TargetSlotsMap": {},
        "pickedLagCountMap": {},
        "pickedG6CountMap": {}
    };
    srvFactory.orderSummaryInitial = function(obj) {
        var scope = obj.scope;
        var orderSummary = {};
        scope.orderSummary = orderSummary;

        orderSummary.from = summary.from;
        orderSummary.to = summary.to;
        orderSummary.orders = summary.orders;
        orderSummary.scenario = summary.scenario;

    };
    srvFactory.orderSummaryPortPickedHandler = function(obj) {
        var scope = obj.scope;
        var orderSummary = {};
        scope.orderSummary = orderSummary;

        orderSummary.from = summary.from;
        orderSummary.to = summary.to;
        orderSummary.orders = summary.orders;
        orderSummary.scenario = scenarioToStr(summary.scenario);
    };
    var scenarioToStr = function(scenario) {
        var source = scenario.source;
        var target = scenario.target;

        var str = "";
        if (source) {
            str += scenarioEndToStr(source);
        }
        if (target) {
            str += " to ";
            str += scenarioEndToStr(target);
        }
        return str;
    };
    var scenarioEndToStr = function(end) {
        var str = "";
        var mode = (end.mode === "ROUTED" ? "R" : "S");
        var port_type = (end.port_type === "GIGE" ? "1G" : "10G");
        str += end.name;
        str += " " + end.key;
        str += ", " + mode;
        str += " " + port_type;
        return str;
    };
    var resetOrderSummary = function() {
        summary = {
            "source": {},
            "sourcePicked": false,
            "orders": [],
            "orderNum": 0,
            "from": "",
            "to": "",
            "scenario": {},
            "scenarioChosen": false,
            "lagTargetSlotsMap": {},
            "g6TargetSlotsMap": {},
            "pickedLagCountMap": {},
            "pickedG6CountMap": {}
        };
        amplify.publish('portPickedEvent', []);
    };


    // Order Submission.  This section contains all the methods for order submission widgets.
    var calendarDateOrderMap = {};
    //var artAccessToken = "";
    srvFactory.orderSubmissionInitial = function(obj) {
        var scope = obj.scope;
        var orderSubmission = {};
        scope.orderSubmission = orderSubmission;

        // load access token
        //loadAccessToken(obj);

        // order Calendar
        //orderSubmission.dt = new Date();
        orderSubmission.dt = "";
        orderSubmission.opened = false;
        orderSubmission.open = function() {
            orderSubmission.opened = true;
        };
        var startDate = moment().add(3, "d").toDate();
        orderSubmission.dateOptions = {
            "dateDisabled": dayDisabled,
            "customClass": getDayClass,
            "minDate": startDate
        };
        orderSubmission.dateChange = function() {
            if (orderSubmission.dt) {
                var date = moment(orderSubmission.dt);
                var startDate = moment().add(3, "d");
                var maxOrderCount = state.maxOrderCount;
                var dateStr = date.format("YYYY-MM-DD");
                var orderCount = srvFactory.getOrderCountPerDay(dateStr);
                if (!date.isBefore(startDate, "day") && orderCount < maxOrderCount) {
                    state.currOrderCount = orderCount;
                    if (summary.orders.length === 0) {
                        enableWorkingPorts();
                    } else {
                        var order = summary.orders[summary.orders.length - 1];
                        if (order.target) {
                            enableWorkingPorts();
                        }
                    }
                }
            } else {
                state.currOrderCount = 0;
                if (summary.orders.length === 0) {
                    enableWorkingPorts();
                } else {
                    var order = summary.orders[summary.orders.length - 1];
                    if (order.target) {
                        enableWorkingPorts();
                    }
                }
            }
        };

        // order notes
        orderSubmission.orderNotes = "";
        orderSubmission.orderNotesStyle = {
            "overflow-x": "hidden"
        };
        orderSubmission.validateNotes = function() {
            notesValidation(obj);
        };

        // order submit
        var orderSubmitUrl = scope.config.wd.jsonOptions.urls.orderSubmitUrl + "?t_s=" + (new Date()).getTime();
        orderSubmission.submitClick = function() {
            var isValid = submissionDataValidation(obj);
            if (isValid) {
                /*
                if (!artAccessToken) {
                    orderSubmission.isSucc = false;
                    orderSubmission.isShowAlertArea = true;
                    orderSubmission.message = "Order Submission Failed! Because Access Token Gerating Failed!";
                    return false;
                }
                */

                orderSubmission.isSubmitting = true;
                var submissionData = prepareSubmissionData(obj);
                var token = amplify.store("artAccessToken").xaccesstoken;
                $http({
                    "method": "POST",
                    "url": orderSubmitUrl,
                    "data": submissionData,
                    "headers": {
                        "x-access-token": token
                    }
                }).then(function(res) {
                    var data = res.data;
                    var status = data.status;
                    var desc = data.description;
                    if (status === "SUCCESS") {
                        orderSubmission.isSucc = true;
                        orderSubmission.orderNotes = "";  // reset notes
                        //amplify.publish("orderSubmitSuccEvent", {"isSucc": true});
                    } else {
                        orderSubmission.isSucc = false;
                    }
                    orderSubmission.message = desc;

                    //reset calendar
                    loadingInfoAfterSubmission(obj);
                }, function(res) {
                    var data = res.data;
                    orderSubmission.isSucc = false;
                    orderSubmission.isShowAlertArea = true;
                    orderSubmission.message = "Order Submission Failed! " + data.error;
                    console.error(res);
                    orderSubmission.isSubmitting = false;
                });
            }
        };

        // alert message
        orderSubmission.isSucc = false;
        orderSubmission.isShowAlertArea = false;
        orderSubmission.closeAlertArea = function() {
            orderSubmission.isShowAlertArea = false;
        };
        orderSubmission.message = "";

        // disable calendar or not
        orderSubmission.calendarDisabled = true;

        // button disable or not
        orderSubmission.isSubmitting = false;
    };
    var dayDisabled = function(data) {
        var date = moment(data.date);
        var mode = data.mode;
        var maxOrderCount = state.maxOrderCount;
        var dateStr = date.format("YYYY-MM-DD");
        var orderCount = srvFactory.getOrderCountPerDay(dateStr);
        // disable not available cell
        if (mode === "day" && orderCount >= maxOrderCount) {
            return true;
        }
        // disable patially available cell when picked orders larger than left.
        var orderNum = summary.orderNum;
        if (orderNum + orderCount > maxOrderCount) {
            return true;
        }
        return false;
    };
    var getDayClass = function(data) {
        var date = moment(data.date);
        var mode = data.mode;
        var startDate = moment().add(3, "d");
        if (mode === "day" && moment().isSame(date, "day")) {
            return "current-day-cell";
        }
        if (mode === "day" && date.isSameOrAfter(startDate, "day")) {
            var maxOrderCount = state.maxOrderCount;
            var dateStr = date.format("YYYY-MM-DD");
            var orderCount = srvFactory.getOrderCountPerDay(dateStr);
            if (orderCount === 0) return "available-day-cell";
            if (orderCount < maxOrderCount) return "partially-available-day-cell";
            return "not-available-day-cell";
        }
        return "";
    };
    /*
    var loadAccessToken = function(obj) {
        var scope = obj.scope;
        var tokenGeneratingUrl = scope.config.wd.jsonOptions.urls.tokenGeneratingUrl + global.attuid;
        $http({
            "method": "GET",
            "url": tokenGeneratingUrl
        }).then(function(res) {
            artAccessToken = res.data.token;
        }, function(res) {
            console.error(res);
        });
    };
    */
    var loadingInfoAfterSubmission = function(obj) {
        var scope = obj.scope;
        var orderSubmission = scope.orderSubmission || {};
        var orderDatesUrl = scope.config.wd.jsonOptions.urls.orderDatesUrl + "?t_s=" + (new Date()).getTime();
        var deviceInfoUrl = scope.config.wd.jsonOptions.urls.deviceInfoUrl;
        var token = amplify.store("artAccessToken").xaccesstoken;

        var promises = [];
        // For order count per date data
        promises.push($http({
            "method": "GET",
            "url": orderDatesUrl,
            "headers": {
                "x-access-token": token
            }
        }));
        // For device update
        promises.push($http({
            "method": "GET",
            "url": deviceInfoUrl + inNodeView.deviceName + "?t_s=" + (new Date()).getTime(),
            "headers": {
                "x-access-token": token
            }
        }));
        if (state.rehomeChecked) {
            promises.push($http({
                "method": "GET",
                "url": deviceInfoUrl + rehomeView.deviceName + "?t_s=" + (new Date()).getTime(),
                "headers": {
                    "x-access-token": token
                }
            }));
        }

        orderSubmission.dt = "";
        orderSubmission.calendarDisabled = true;
        $q.all(promises).then(function(responses) {
            // For order count per date data
            var data = responses[0].data;
            state.maxOrderCount = parseInt(data.max_orders_per_day);
            calendarDateOrderMap = createDateOrderMap(data.orders);
            // For device update
            var device_datas = [];
            device_datas.push(responses[1].data);
            if (state.rehomeChecked) {
                device_datas.push(responses[2].data);
            }

            amplify.publish("orderSubmitResultEvent", {
                "rehomeChecked": state.rehomeChecked,
                "device_datas": device_datas,
                "wirecenter_id": amplify.store("wirecenterSelectedData").wirecenter_id
            });
            orderSubmission.calendarDisabled = false;
            orderSubmission.isSubmitting = false;
            orderSubmission.isShowAlertArea = true;
        }, function(error) {
            orderSubmission.isSucc = false;
            orderSubmission.isShowAlertArea = true;
            orderSubmission.message = "Error while doing refresh.";
            orderSubmission.isSubmitting = false;
            console.error(error);
        });

    };
    var loadDateOrderData = function(obj) {
        var scope = obj.scope;
        var orderSubmission = scope.orderSubmission || {};
        var orderDatesUrl = scope.config.wd.jsonOptions.urls.orderDatesUrl + "?t_s=" + (new Date()).getTime();
        var token = amplify.store("artAccessToken").xaccesstoken;

        orderSubmission.dt = "";
        orderSubmission.calendarDisabled = true;
        $http({
            "method": "GET",
            "url": orderDatesUrl,
            "headers": {
                "x-access-token": token
            }
        }).then(function(res) {
            state.maxOrderCount = parseInt(res.data.max_orders_per_day);
            calendarDateOrderMap = createDateOrderMap(res.data.orders);
            orderSubmission.calendarDisabled = false;
        }, function(res) {
            orderSubmission.isSucc = false;
            orderSubmission.isShowAlertArea = true;
            orderSubmission.message = "Error while loading order count per day into Calendar.";
            console.error(res);
        });
    };
    var createDateOrderMap = function(orders) {
        var map = {};
        if (orders) {
            for (var i = 0; i < orders.length; i++) {
                map[orders[i].order_due_date] = parseInt(orders[i].order_count);
            }
        }
        return map;
    };
    var dateValidation = function(obj) {
        var scope = obj.scope;
        var orderSubmission = scope.orderSubmission || {};

        if (!orderSubmission.dt) {
            orderSubmission.isSucc = false;
            orderSubmission.isShowAlertArea = true;
            orderSubmission.message = "Please pick a date from Calendar or enter a date with valid format.";
            return false;
        }

        var date = moment(orderSubmission.dt);
        var startDate = moment().add(3, "d");
        var maxOrderCount = state.maxOrderCount;
        var dateStr = date.format("YYYY-MM-DD");
        var orderNum = summary.orderNum;
        var orderCount = srvFactory.getOrderCountPerDay(dateStr);
        if (date.isBefore(startDate, "day") || orderNum + orderCount > maxOrderCount) {
            orderSubmission.isSucc = false;
            orderSubmission.isShowAlertArea = true;
            orderSubmission.message = "Please pick a date that is available to submit orders in the Calendar.";
            return false;
        }

        return true;
    };
    var notesValidation = function(obj) {
        var scope = obj.scope;
        var orderSubmission = scope.orderSubmission || {};

        var maxLength = 1000;
        var message = "Notes cannot exceed 1000 characters.";
        if (orderSubmission.orderNotes.length > maxLength) {
            orderSubmission.isSucc = false;
            orderSubmission.isShowAlertArea = true;
            orderSubmission.message = message;
            orderSubmission.orderNotesStyle.border = "1px solid #ff0000";
            return false;
        } else {
            if (orderSubmission.orderNotesStyle.border) {
                orderSubmission.isShowAlertArea = false;
                orderSubmission.orderNotesStyle.border = null;
            }
        }

        return true;
    };
    var submissionDataValidation = function(obj) {
        var scope = obj.scope;
        var orderSubmission = scope.orderSubmission || {};

        // validate order
        var orders = summary.orders;
        if (orders.length === 0) {
            orderSubmission.isSucc = false;
            orderSubmission.isShowAlertArea = true;
            orderSubmission.message = "Please pick the source and target ports to submit an order.";
            return false;
        } else {
            var order = orders[orders.length - 1];
            if (!order.target) {
                orderSubmission.isSucc = false;
                orderSubmission.isShowAlertArea = true;
                orderSubmission.message = "Please pick the source and target ports to submit an order.";
                return false;
            }
        }
        // lag memebers and G6 ports validation for rehoming
        if (state.rehomeChecked) {
            for (var port_desc in inNodeView.lagMembersMap) {
                if (inNodeView.lagMembersMap.hasOwnProperty(port_desc)) {
                    var lagCount = inNodeView.lagMembersMap[port_desc].length;
                    var pickedLagCount = summary.pickedLagCountMap[port_desc];
                    if (pickedLagCount && pickedLagCount > 0 && pickedLagCount < lagCount) {
                        orderSubmission.isSucc = false;
                        orderSubmission.isShowAlertArea = true;
                        orderSubmission.message = "All the ports of the specific LAG group should be selected for movement.";
                        return false;
                    }
                }
            }
            for (var z_device in inNodeView.g6AccessPortsMap) {
                if (inNodeView.g6AccessPortsMap.hasOwnProperty(z_device)) {
                    var g6Count = inNodeView.g6AccessPortsMap[z_device].length;
                    var pickedG6Count = summary.pickedG6CountMap[z_device];
                    if (pickedG6Count && pickedG6Count > 0 && pickedG6Count < g6Count) {
                        orderSubmission.isSucc = false;
                        orderSubmission.isShowAlertArea = true;
                        orderSubmission.message = "All the ports of the specific G6 group should be selected for movement.";
                        return false;
                    }
                }
            }
        }

        // validate date
        if (!dateValidation(obj)) return false;

        // notes length validation
        if (!notesValidation(obj)) return false;

        return true;
    };
    var prepareSubmissionData = function(obj) {
        var scope = obj.scope;
        var orderSubmission = scope.orderSubmission || {};

        var attuid = global.attuid;
        var moveType = state.rehomeChecked ? "Re-Home" : "In-Node";
        var dueDate = moment(orderSubmission.dt).format("MM/DD/YYYY");;
        var orderNotes = orderSubmission.orderNotes;
        var orderInfo = {
            "userid": attuid,
            "moveType": moveType,
            "dueDate": dueDate,
            "notes": orderNotes
        };

        var orderDetails = [];
        var orders = summary.orders;
        var sourceDevice = inNodeView.device;
        var sourceDeviceName = inNodeView.deviceName;
        var sourceWirecenter = inNodeView.deviceWirecenter;
        var destDevice = state.rehomeChecked ? rehomeView.device : inNodeView.device;
        var destDeviceName = state.rehomeChecked ? rehomeView.deviceName : inNodeView.deviceName;
        var destWirecenter = state.rehomeChecked ? rehomeView.deviceWirecenter : inNodeView.deviceWirecenter;
        for (var i = 0; i < orders.length; i++) {
            var source_pos = orders[i].source.pos;
            var source_port = sourceDevice[source_pos[0]][source_pos[1]];
            var target_pos = orders[i].target.pos;
            var target_port = destDevice[target_pos[0]][target_pos[1]];

            orderDetails.push({
                "sourceWirecenter": sourceWirecenter,
                "sourceDevice": sourceDeviceName,
                "sourceCardSlot": source_port.slot + "-" + source_port.sub_slot,
                "sourcePortName": source_port.port_num,
                "destWirecenter": destWirecenter,
                "destDevice": destDeviceName,
                "destCardSlot": target_port.slot + "-" + target_port.sub_slot,
                "destPortName": target_port.port_num,
                "accessNode": source_port.z_device,
                "subscriberCount": source_port.sub_count
            });
        }

        return {
            "order": orderInfo,
            "orderDetails": orderDetails
        };
    };

    srvFactory.accessTokenGeneratedEvent = function(obj) {
        loadDateOrderData(obj);
    };

    srvFactory.getOrderCountPerDay = function(date) {
        if (calendarDateOrderMap.hasOwnProperty(date)) {
            return calendarDateOrderMap[date];
        }
        return 0;
    };

    srvFactory.dayCellTooltipHandler = function(isShow) {

        if (isShow) {
            infoTooltip.iomMda = "111123456";
            infoTooltip.isPortTooltip = false;
            infoTooltip.isShow = true;
        } else {
            infoTooltip.isShow = false;
        }
    };

    srvFactory.getMaxOrderCount = function() {
        return state.maxOrderCount;
    };

    srvFactory.pickMax2Orders = function(obj) {
        var dataItem = obj.dataItem;
        if (dataItem.value === "2") {
            console.log(dataItem.value);
        }
    };

    srvFactory.pickMax4Orders = function(obj) {
        var dataItem = obj.dataItem;
        if (dataItem.value === "4") {
            console.log(dataItem.value);
        }
    };


    // This is to handle the tooltip directive
    var infoTooltip = {};
    srvFactory.portInfoTooltipInitial = function(obj) {
        var scope = obj.scope;
        infoTooltip = {
            "port_type": "",
            "port_desc": "",
            "port_status": "",
            "circuit_type": "",
            "z_device": "",
            "sub_count": "",
            "pending_order": "",
            "pending_order_circuit": "",
            "isShowReason": false,
            "reason": "",
            "position": {
                "top": "-1000px",
                "left": "-1000px"
            },
            "isShow": false
        };
        scope.infoTooltip = infoTooltip;
    };

    var setInfoTooltipContent = function(port) {
        infoTooltip.port_type = port.port_type;
        infoTooltip.port_desc = port.port_desc;
        infoTooltip.port_status = port.port_status;
        infoTooltip.circuit_type = port.circuit_type;
        infoTooltip.z_device = port.z_device;
        infoTooltip.sub_count = port.sub_count;
        infoTooltip.lag_order = port.lag_order;
        infoTooltip.isShowLAG_order = port.isShowLAG_order;
        infoTooltip.pending_order = port.pending_order;
        infoTooltip.pending_order_circuit = port.pending_order_circuit;
        infoTooltip.isShowReason = port.isShowReason;
        infoTooltip.reason = port.reason;
    };



    // Common methods.  This section contains all the common methods.
    // convert device info to a matrix data and other info object.

    var deviceInfoConverter = function(info) {
        var deviceName = info.name;
        var deviceMode = info.mode;
        var deviceKey = info.key;
        var deviceG6Connected = info.g6_connected;
        var deviceG6Supported = info.g6_supported;
        var deviceWirecenter = info.wire_center;
        var slots = info.slots;

        // slots title info
        var slotsTitle = [];
        for (var i = 0; i < slots.length; i++) {
            var name = "UNKNOWN";
            var displayName = "UNKNOWN";
            var slot_num = slots[i].slot_num;
            var mda1_desc = "UNKNOWN";
            var mda2_desc = "UNKNOWN";
            if (slots[i].iom_name) {
                name = slots[i].iom_name;
                displayName = slots[i].iom_name;
                if (displayName.length > 7) {
                    displayName = displayName.substring(displayName.length - 7);
                }
                var sub_slots = slots[i].sub_slot;
                if (sub_slots && sub_slots.length > 0 && sub_slots[0].sub_slot_desc) {
                    mda1_desc = sub_slots[0].sub_slot_desc;
                }
                if (sub_slots && sub_slots.length > 1 && sub_slots[1].sub_slot_desc) {
                    mda2_desc = sub_slots[1].sub_slot_desc;
                }
            }
            slotsTitle.push({
                "name": name,
                "displayName": displayName,
                "slot_num": slot_num,
                "mda1_desc": mda1_desc,
                "mda2_desc": mda2_desc
            });
        }

        // initialize the device matrix
        var device = [];
        for (var i = 0; i < 20; i++) {
            var row = [];
            for (var j = 0; j < (slots.length * 2); j++) {
                row.push(null);
            }
            device.push(row);
        }
        var workingDevice = [];
        var spareDevice = [];
        for (var i = 0; i < 20; i++) {
            var row = device[i];
            for (var j = 0; j < slots.length; j++) {
                var subSlot1 = [];
                var subSlot2 = [];
                var sub_slots = slots[j].sub_slot;
                if (sub_slots && sub_slots.length > 0 && sub_slots[0].sub_slot_ports) {
                    subSlot1 = sub_slots[0].sub_slot_ports;
                }
                if (sub_slots && sub_slots.length > 1 && sub_slots[1].sub_slot_ports) {
                    subSlot2 = sub_slots[1].sub_slot_ports;
                }

                if (i < subSlot1.length) {
                    if (subSlot1[i].port_status === "WORKING") {
                        workingDevice.push([i, j * 2]);
                    }
                    if (subSlot1[i].port_status === "SPARE") {
                        spareDevice.push([i, j * 2]);
                    }
                    subSlot1[i].port_cell_class = portStatusMap[subSlot1[i].port_status];
                    setPortUnPickable(subSlot1[i]);
                    subSlot1[i].isPicked = false;
                    row[j * 2] = subSlot1[i];
                }
                if (i < subSlot2.length) {
                    if (subSlot2[i].port_status === "WORKING") {
                        workingDevice.push([i, j * 2 + 1]);
                    }
                    if (subSlot2[i].port_status === "SPARE") {
                        spareDevice.push([i, j * 2 + 1]);
                    }
                    subSlot2[i].port_cell_class = portStatusMap[subSlot2[i].port_status];
                    setPortUnPickable(subSlot2[i]);
                    subSlot2[i].isPicked = false;
                    row[j * 2 + 1] = subSlot2[i];
                }
            }
        }

        return {
            deviceName: deviceName,
            deviceMode: deviceMode,
            deviceKey: deviceKey,
            deviceG6Connected: deviceG6Connected,
            deviceG6Supported: deviceG6Supported,
            deviceWirecenter: deviceWirecenter,
            slotsTitle: slotsTitle,
            device: device,
            workingDevice: workingDevice,
            spareDevice: spareDevice
        };
    };
    var findIOPorts = function(view) {
        var workingDevice = view.workingDevice;
        var device = view.device;
        view.IOSubSlots = [];
        for (var i = 0; i < workingDevice.length; i++) {
            var p = workingDevice[i];
            var port = device[p[0]][p[1]];

            if (port.circuit_type === "IO-CO") {
                port.isIO = true;
                if (view.IOSubSlots.indexOf(p[1]) === -1) {
                    view.IOSubSlots.push(p[1]);
                }
            }
        }
    };
    var findLagMembers = function(view) {
        var workingDevice = view.workingDevice;
        var device = view.device;
        var lagMembersMap = {};
        for (var i = 0; i < workingDevice.length; i++) {
            var p = workingDevice[i];
            var port = device[p[0]][p[1]];
            //if (port.port_desc === "") continue;  // port description is empty is not considered as lag members
            if (lagMembersMap[port.port_desc]) {
                lagMembersMap[port.port_desc].push(workingDevice[i]);
            } else {
                lagMembersMap[port.port_desc] = [workingDevice[i]];
            }
        }

        view.lagMembersMap = {};
        for (var port_desc in lagMembersMap) {
            if (lagMembersMap.hasOwnProperty(port_desc)) {
                var lagMembers = lagMembersMap[port_desc];
                if (lagMembers.length > 1) {
                    view.lagMembersMap[port_desc] = lagMembers;
                    // set port to lag members
                    for (var i = 0; i < lagMembers.length; i++) {
                        var p = lagMembers[i];
                        var port = device[p[0]][p[1]];
                        port.isLagMember = true;
                        //port.port_cell_class = addClass(port.port_cell_class, "type-lag-member");
                    }
                }
            }
        }
    };
    var findG6Access = function(view) {
        var workingDevice = view.workingDevice;
        var device = view.device;
        var g6AccessPortsMap = {};
        for (var i = 0; i < workingDevice.length; i++) {
            var p = workingDevice[i];
            var port = device[p[0]][p[1]];
            // find G6 Access
            if (port.port_desc && port.port_desc.indexOf("-ANM-") != -1) {
                port.isG6 = true;
                if (g6AccessPortsMap[port.z_device]) {
                    g6AccessPortsMap[port.z_device].push(workingDevice[i]);
                } else {
                    g6AccessPortsMap[port.z_device] = [workingDevice[i]];
                }
            }
        }
        view.g6AccessPortsMap = g6AccessPortsMap;
    };

    // This is used to handle port picked
    var fromPortPickedHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);
        var device = inNodeView.device;
        var port = device[pos[0]][pos[1]];

        if (!summary.scenarioChosen) {
            summary.from = inNodeView.deviceName;
            summary.scenario.source = {
                "name": inNodeView.deviceName,
                "mode": inNodeView.deviceMode,
                "key": inNodeView.deviceKey,
                "port_type": port.port_type
            };
        }
        summary.source = {
            "pos": pos,
            "posStr": posStr
        };
        summary.orders.push({
            "source": summary.source
        });
        summary.sourcePicked = true;
        port.isPicked = true;
        port.isFromPort = true;
        highlightLagMembers(port);
        highlightG6Access(port);
        port.port_cell_class = addClass(port.port_cell_class, "type-from-in-progress");
        summary.orderNum = calOrderNum();
        amplify.publish('portPickedEvent', []);

        disableWorkingPorts("Target port cannot be a Working port.");
        enableSparePorts();
    };
    var highlightLagMembers = function(port) {
        if (!port.isLagMember) return;
        var device = inNodeView.device;
        if (!summary.pickedLagCountMap[port.port_desc]) {
            summary.pickedLagCountMap[port.port_desc] = 0;
        }
        if (summary.pickedLagCountMap[port.port_desc] === 0) {
            var lagMembers = inNodeView.lagMembersMap[port.port_desc];
            for (var i = 0; i < lagMembers.length; i++) {
                var p = lagMembers[i];
                var lagPort = device[p[0]][p[1]];
                lagPort.port_cell_class = addClass(lagPort.port_cell_class, "type-lag-member");
                lagPort.isShowLAG_order = true;
            }
        }
        summary.pickedLagCountMap[port.port_desc]++;
    };
    var highlightG6Access = function(port) {
        if (!port.isG6) return;
        var device = inNodeView.device;
        if (!summary.pickedG6CountMap[port.z_device]) {
            summary.pickedG6CountMap[port.z_device] = 0;
        }
        if (summary.pickedG6CountMap[port.z_device] === 0) {
            var g6AccessPorts = inNodeView.g6AccessPortsMap[port.z_device];
            for (var i = 0; i < g6AccessPorts.length; i++) {
                var p = g6AccessPorts[i];
                var g6Port = device[p[0]][p[1]];
                g6Port.port_cell_class = addClass(g6Port.port_cell_class, "type-lag-member");
            }
        }
        summary.pickedG6CountMap[port.z_device]++;
    };

    var toPortPickedHandler = function(pos, isInNodeView) {
        var posStr = portPlaceStrConverter(pos);
        var view = isInNodeView ? inNodeView : rehomeView;
        var device = view.device;
        var port = device[pos[0]][pos[1]];

        if (!summary.scenarioChosen) {
            summary.to = view.deviceName;
            summary.scenario.target = {
                "name": view.deviceName,
                "mode": view.deviceMode,
                "key": view.deviceKey,
                "port_type": port.port_type
            };
            summary.scenarioChosen = true;
        }

        var order = summary.orders[summary.orders.length - 1];
        order.target = {
            "pos": pos,
            "posStr": posStr,
            "isInNodeView": isInNodeView
        };
        addLagAndG6TargetSlot(order.source, pos);
        summary.sourcePicked = false;
        port.isPicked = true;
        port.isFromPort = false;
        port.port_cell_class = addClass(port.port_cell_class, "type-to-in-progress");
        summary.orderNum = calOrderNum();
        amplify.publish('portPickedEvent', []);

        // do not allow more orders if the number of orders are more than 2
        enableWorkingPorts();
        disableSparePorts("Source port cannot be a Spare port.");
    };
    var addLagAndG6TargetSlot = function(source, targetPos) {
        var sourcePos = source.pos;
        var device = inNodeView.device;
        var sourcePort = device[sourcePos[0]][sourcePos[1]];
        var slot = parseInt(targetPos[1] / 2) + 1;

        // lag member
        // lagTargetSlots = [{"slot": 1, "LAG_orders": ["1", "3"]},{},{}...]
        if (sourcePort.isLagMember) {
            var slotMap  = {
                "slot": slot,
                "LAG_orders": [sourcePort.LAG_order]
            };
            if (summary.lagTargetSlotsMap[sourcePort.port_desc]) {
                var lagTargetSlots = summary.lagTargetSlotsMap[sourcePort.port_desc];
                var index = -1;
                for (var i = 0; i < lagTargetSlots.length; i++) {
                    if (lagTargetSlots[i].slot === slot) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    slotMap = lagTargetSlots[index];
                    slotMap.LAG_orders.push(sourcePort.LAG_order);
                } else {
                    summary.lagTargetSlotsMap[sourcePort.port_desc].push(slotMap);
                }
            } else {
                summary.lagTargetSlotsMap[sourcePort.port_desc] = [slotMap];
            }
        }
        // G6
        if (sourcePort.isG6) {
            if (summary.g6TargetSlotsMap[sourcePort.z_device]) {
                summary.g6TargetSlotsMap[sourcePort.z_device].push(slot);
            } else {
                summary.g6TargetSlotsMap[sourcePort.z_device] = [slot];
            }
        }
    };

    var fromPortUnPickedHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);
        var device = inNodeView.device;
        //var port = device[pos[0]][pos[1]];

        var index = 0;
        for (var i = 0; i < summary.orders.length; i++) {
            if (summary.orders[i].source.posStr === posStr) {
                index = i;
                break;
            }
        }
        var order = summary.orders[index];
        var source_pos = order.source.pos;
        var source_port = device[source_pos[0]][source_pos[1]];
        source_port.isPicked = false;
        source_port.port_cell_class = removeClass(source_port.port_cell_class, "type-from-in-progress");
        if (order.target) {
            var target_pos = order.target.pos;
            var view = order.target.isInNodeView ? inNodeView : rehomeView;
            var target_port = view.device[target_pos[0]][target_pos[1]];
            target_port.isPicked = false;
            target_port.port_cell_class = removeClass(target_port.port_cell_class, "type-to-in-progress");
            target_port.port_cell_class = removeClass(target_port.port_cell_class, "to-in-progress-pulse");
            removeLagAndG6TargetSlot(order.source, target_pos);
        } else {
            // this is current source picked and target not picked yet case.  We
            // unpick the current source and should set sourcePicked to false
            if (index === summary.orders.length - 1) summary.sourcePicked = false;
        }
        summary.orders.splice(index, 1);
        unHighlightLagMembers(source_port);
        unHighlightG6Access(source_port);

        if (summary.orders.length === 0) {
            summary = {
                "source": {},
                "sourcePicked": false,
                "orders": [],
                "orderNum": 0,
                "from": "",
                "to": "",
                "scenario": {},
                "scenarioChosen": false,
                "lagTargetSlotsMap": {},
                "g6TargetSlotsMap": {},
                "pickedLagCountMap": {},
                "pickedG6CountMap": {}
            };
        }
        summary.orderNum = calOrderNum();
        amplify.publish('portPickedEvent', []);

        if (summary.sourcePicked) {
            disableWorkingPorts("Target port cannot be a Working port.");
            enableSparePorts();
        } else {
            enableWorkingPorts();
            disableSparePorts("Source port cannot be a Spare port.");
        }
    };
    var unHighlightLagMembers = function(port) {
        if (!port.isLagMember) return;
        var device = inNodeView.device;
        if (summary.pickedLagCountMap[port.port_desc] === 1) {
            var lagMembers = inNodeView.lagMembersMap[port.port_desc];
            for (var i = 0; i < lagMembers.length; i++) {
                var p = lagMembers[i];
                var lagPort = device[p[0]][p[1]];
                lagPort.port_cell_class = removeClass(lagPort.port_cell_class, "type-lag-member");
                lagPort.isShowLAG_order = false;
            }
        }
        summary.pickedLagCountMap[port.port_desc]--;
    };
    var unHighlightG6Access = function(port) {
        if (!port.isG6) return;
        var device = inNodeView.device;
        if (summary.pickedG6CountMap[port.z_device] === 1) {
            var g6AccessPorts = inNodeView.g6AccessPortsMap[port.z_device];
            for (var i = 0; i < g6AccessPorts.length; i++) {
                var p = g6AccessPorts[i];
                var g6Port = device[p[0]][p[1]];
                g6Port.port_cell_class = removeClass(g6Port.port_cell_class, "type-lag-member");
            }
        }
        summary.pickedG6CountMap[port.z_device]--;
    };


    var toPortUnPickedHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);

        var index = 0;
        for (var i = 0; i < summary.orders.length; i++) {
            if (summary.orders[i].target.posStr === posStr) {
                index = i;
                break;
            }
        }
        var order = summary.orders[index];
        var target_pos = order.target.pos;
        var view = order.target.isInNodeView ? inNodeView : rehomeView;
        var target_port = view.device[target_pos[0]][target_pos[1]];
        target_port.isPicked = false;
        summary.sourcePicked = true;
        target_port.port_cell_class = removeClass(target_port.port_cell_class, "type-to-in-progress");
        var source_pos = order.source.pos;
        var source_port = inNodeView.device[source_pos[0]][source_pos[1]];
        source_port.port_cell_class = removeClass(source_port.port_cell_class, "from-in-progress-pulse");
        removeLagAndG6TargetSlot(order.source, pos);

        summary.orders.splice(index, 1);
        order.target = null;
        summary.orders.push(order);

        if (summary.orders.length === 1) {
            summary.to = "";
            summary.scenario.target = null;
            summary.scenarioChosen = false;
        }
        summary.orderNum = calOrderNum();
        amplify.publish('portPickedEvent', []);

        disableWorkingPorts("Target port cannot be a Working port.");
        enableSparePorts();
    };
    var removeLagAndG6TargetSlot = function(source, targetPos) {
        var sourcePos = source.pos;
        var device = inNodeView.device;
        var sourcePort = device[sourcePos[0]][sourcePos[1]];
        var slot = parseInt(targetPos[1] / 2) + 1;

        // lag member
        if (sourcePort.isLagMember) {
            var lagTargetSlots = summary.lagTargetSlotsMap[sourcePort.port_desc];
            var index = -1;
            for (var i = 0; i < lagTargetSlots.length; i++) {
                if (lagTargetSlots[i].slot === slot) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                var slotMap = lagTargetSlots[index];
                var lagOrderIndex = slotMap.LAG_orders.indexOf(sourcePort.LAG_order);
                if (lagOrderIndex > -1) {
                    slotMap.LAG_orders.splice(lagOrderIndex, 1);
                }
                if (slotMap.LAG_orders.length == 0) {
                    lagTargetSlots.splice(index, 1);
                }
            }
        }
        // G6
        if (sourcePort.isG6) {
            var g6TargetSlots = summary.g6TargetSlotsMap[sourcePort.z_device];
            var index = g6TargetSlots.indexOf(slot);
            if (index > -1) {
                g6TargetSlots.splice(index, 1);
            }
        }
    };

    var fromPortMouseoverHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);

        var index = 0;
        for (var i = 0; i < summary.orders.length; i++) {
            if (summary.orders[i].source.posStr === posStr) {
                index = i;
                break;
            }
        }
        var order = summary.orders[index];
        if (order.target) {
            var target_pos = order.target.pos;
            var view = order.target.isInNodeView ? inNodeView : rehomeView;
            var target_port = view.device[target_pos[0]][target_pos[1]];
            target_port.port_cell_class = addClass(target_port.port_cell_class, "to-in-progress-pulse");
        }
    };
    var fromPortMouseoutHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);

        var index = 0;
        for (var i = 0; i < summary.orders.length; i++) {
            if (summary.orders[i].source.posStr === posStr) {
                index = i;
                break;
            }
        }
        var order = summary.orders[index];
        if (order.target) {
            var target_pos = order.target.pos;
            var view = order.target.isInNodeView ? inNodeView : rehomeView;
            var target_port = view.device[target_pos[0]][target_pos[1]];
            target_port.port_cell_class = removeClass(target_port.port_cell_class, "to-in-progress-pulse");
        }
    };

    var toPortMouseoverHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);

        var index = 0;
        for (var i = 0; i < summary.orders.length; i++) {
            if (summary.orders[i].target.posStr === posStr) {
                index = i;
                break;
            }
        }
        var order = summary.orders[index];
        var source_pos = order.source.pos;
        var source_port = inNodeView.device[source_pos[0]][source_pos[1]];
        source_port.port_cell_class = addClass(source_port.port_cell_class, "from-in-progress-pulse");
    };
    var toPortMouseoutHandler = function(pos) {
        var posStr = portPlaceStrConverter(pos);

        var index = 0;
        for (var i = 0; i < summary.orders.length; i++) {
            if (summary.orders[i].target.posStr === posStr) {
                index = i;
                break;
            }
        }
        var order = summary.orders[index];
        var source_pos = order.source.pos;
        var source_port = inNodeView.device[source_pos[0]][source_pos[1]];
        source_port.port_cell_class = removeClass(source_port.port_cell_class, "from-in-progress-pulse");
    };

    var wipeOutViewPickedStatus = function(view) {
        var device = view.device;
        var workingDevice = view.workingDevice;
        var spareDevice = view.spareDevice;
        for (var i = 0; i < workingDevice.length; i++) {
            var p = workingDevice[i];
            var port = device[p[0]][p[1]];

            if (port.isPicked) {
                port.isPicked = false;
                port.port_cell_class = removeClass(port.port_cell_class, "type-from-in-progress");
            }
            if (port.isG6) {
                port.port_cell_class = removeClass(port.port_cell_class, "type-lag-member");
            }
            if (port.isLagMember) {
                port.port_cell_class = removeClass(port.port_cell_class, "type-lag-member");
                port.isShowLAG_order = false;
            }
        }

        for (var i = 0; i < spareDevice.length; i++) {
            var p = spareDevice[i];
            var port = device[p[0]][p[1]];

            if (port.isPicked) {
                port.isPicked = false;
                port.port_cell_class = removeClass(port.port_cell_class, "type-to-in-progress");
            }
        }
    };

    var disableWorkingPorts = function(reason) {
        // For In Node Working Ports
        var workingDevice = inNodeView.workingDevice;
        var device = inNodeView.device;
        for (var i = 0; i < workingDevice.length; i++) {
            var p = workingDevice[i];
            var port = device[p[0]][p[1]];

            if (!port.isPicked) {
                setPortUnPickable(port, reason);
            }
        }
        // For Rehome Working Ports
        workingDevice = rehomeView.workingDevice;
        device = rehomeView.device;
        if (workingDevice && device) {
            for (var i = 0; i < workingDevice.length; i++) {
                var p = workingDevice[i];
                var port = device[p[0]][p[1]];

                port.isShowReason = true;
                port.reason = "Target port cannot be a Working port.";
            }
        }
    };
    var enableWorkingPorts = function() {
        // For In Node Working Ports
        var workingDevice = inNodeView.workingDevice;
        var device = inNodeView.device;
        var orderNum = summary.orderNum;
        if (workingDevice && device) {
            for (var i = 0; i < workingDevice.length; i++) {
                var p = workingDevice[i];
                var port = device[p[0]][p[1]];

                if (!port.isPicked) {
                    applyRulesToFromPort(port, orderNum);
                }
            }
        }
        // For Rehome Working Ports
        workingDevice = rehomeView.workingDevice;
        device = rehomeView.device;
        if (workingDevice && device) {
            for (var i = 0; i < workingDevice.length; i++) {
                var p = workingDevice[i];
                var port = device[p[0]][p[1]];

                port.isShowReason = false;
            }
        }
    };
    var calOrderNum = function() {
        var count = 0;
        var lagGroups = [];
        var g6Groups = [];
        var device = inNodeView.device;
        for (var i = 0; i < summary.orders.length; i++) {
            var order = summary.orders[i];
            var source_pos = order.source.pos;
            var source_port = device[source_pos[0]][source_pos[1]];
            var port_desc = source_port.port_desc;
            var z_device = source_port.z_device;
            if (source_port.isLagMember) {
                if (lagGroups.indexOf(port_desc) === -1) {
                    lagGroups.push(port_desc);
                }
            } else if (source_port.isG6) {
                if (g6Groups.indexOf(z_device) === -1) {
                    g6Groups.push(z_device);
                }
            } else {
                count++;
            }
        }
        count += lagGroups.length + g6Groups.length;
        return count;
    };

    var disableSparePorts = function(reason) {
        disableViewSparePorts(inNodeView, reason);
        if (state.rehomeChecked) {
            disableViewSparePorts(rehomeView, reason);
        }
    };
    var disableViewSparePorts = function(view, reason) {
        var spareDevice = view.spareDevice;
        var device = view.device;
        for (var i = 0; i < spareDevice.length; i++) {
            var p = spareDevice[i];
            var port = device[p[0]][p[1]];

            if (!port.isPicked) {
                setPortUnPickable(port, reason);
            }
        }
    };
    var enableSparePorts = function() {
        enableViewSparePorts(inNodeView, true);
        if (state.rehomeChecked) {
            enableViewSparePorts(rehomeView, false);
        }
    };
    var enableViewSparePorts = function(view, isInNodeView) {
        var spareDevice = view.spareDevice;
        var device = view.device;
        for (var i = 0; i < spareDevice.length; i++) {
            var p = spareDevice[i];
            var port = device[p[0]][p[1]];

            if (!port.isPicked) {
                applyRulesToToPort(p, port, isInNodeView);
            }
        }
    };

    var applyRulesToFromPort = function(port, orderNum) {
        var scenario = summary.scenario;
        var scenarioChosen = summary.scenarioChosen;
        var deviceKey = inNodeView.deviceKey;
        var deviceMode = inNodeView.deviceMode;

        // validate if exceed max order number
        if (exceedMaxOrderNum(port, orderNum)) {
            setPortUnPickable(port, "Cannot exceed the max orders per day.");
            return;
        }

        // IO port validation
        if (port.isIO) {
            setPortUnPickable(port, "IO port cannot be moved to another port.");
            return;
        }

        // Scenario validation
        if (scenarioChosen) {
            if (scenario.source.port_type === port.port_type) {
                setPortPickable(port);
            } else {
                setPortUnPickable(port, "Port type is not matched.");
            }
        } else {
            if (deviceMode === "ROUTED" && deviceKey === "BF") {
                setPortUnPickable(port, "As device is Routed mode, the key cannot be Brown Filed.");
            } else if (deviceMode === "SWITCHED" && port.port_type === "10GIGE") {
                setPortUnPickable(port, "As device is Switched mode, port type cannot be 10GIGE.");
            } else {
                setPortPickable(port);
            }
        }
    };
    var exceedMaxOrderNum = function(port, orderNum) {
        if (orderNum + state.currOrderCount >= state.maxOrderCount) {
            if (port.isLagMember) {
                var lagTargetSlots = summary.lagTargetSlotsMap[port.port_desc];
                if (lagTargetSlots && lagTargetSlots.length > 0) return false;
                return true;
            } else if (port.isG6) {
                var g6TargetSlots = summary.g6TargetSlotsMap[port.z_device];
                if (g6TargetSlots && g6TargetSlots.length > 0) return false;
                return true;
            } else {
                return true;
            }
        }
        return false;
    };

    var applyRulesToToPort = function(pos, port, isInNodeView) {
        var view = isInNodeView ? inNodeView : rehomeView;
        var scenario = summary.scenario;
        var scenarioChosen = summary.scenarioChosen;

        if (isInNodeView && state.rehomeChecked) {
            setPortUnPickable(port, "Please choose a Spare port in Rehome widget.");
        } else {
            var order = summary.orders[summary.orders.length - 1];
            // G6 Supported violation validation
            if (isG6SupportedViolation(order.source, isInNodeView)) {
                setPortUnPickable(port, "The G6 on the target 7450 does not support the source device.");
                return;
            }

            // IO port validation
            var IOSubSlots = view.IOSubSlots;
            if (IOSubSlots.indexOf(pos[1]) > -1) {
                setPortUnPickable(port, "Cannot move a port to the IO connected port.");
                return;
            }

            // Lag members and G6 validation
            if (isLagTargetSlotPort(order.source, pos, isInNodeView)) {
                setPortUnPickable(port, "LAG members should maintain diversified IOM MDA rule.");
                return;
            }
            /*
            if (isG6RehomePort(order.source, isInNodeView)) {
                setPortUnPickable(port, "G6 connection already exists.");
                return;
            }
            */
            if (isG6TargetSlotPort(order.source, pos, isInNodeView)) {
                setPortUnPickable(port, "G6 ports should maintain diversified IOM MDA rule.");
                return;
            }

            // Scenario validation
            if (scenarioChosen) {
                if (scenario.target.port_type === port.port_type) {
                    setPortPickable(port);
                } else {
                    setPortUnPickable(port, "Port type is not matched.");
                }
            } else {
                // Scenario 1
                if (scenario.source.key === "GF" && scenario.source.mode === "ROUTED"
                    && !state.rehomeChecked) {
                    if (scenario.source.port_type != port.port_type) {
                        setPortUnPickable(port, "Port type is not matched.");
                    } else {
                        setPortPickable(port);
                    }
                }
                // Scenario 2
                else if (scenario.source.key === "GF" && scenario.source.mode === "ROUTED"
                    && state.rehomeChecked) {
                    if (view.deviceKey != "GF") {
                        setPortUnPickable(port, "Not matched with Scenario 2, as target device is not green field.");
                    } else if (view.deviceMode != "ROUTED") {
                        setPortUnPickable(port, "Not matched with Scenario 2, as target device is not Routed.");
                    } else if (scenario.source.port_type != port.port_type) {
                        setPortUnPickable(port, "Port type is not matched.");
                    } else {
                        setPortPickable(port);
                    }
                }
                // Scenario 3 or scenario 4
                else if (scenario.source.mode === "SWITCHED" && scenario.source.port_type === "GIGE"
                    && state.rehomeChecked) {
                    if (view.deviceMode === "ROUTED" && view.deviceKey != "GF") {
                        setPortUnPickable(port, "Not matched with Scenario 3, as target device is Routed, but it is not green field.");
                    } else if (scenario.source.port_type != port.port_type) {
                        setPortUnPickable(port, "Port type is not matched.");
                    } else {
                        setPortPickable(port);
                    }
                }
                // Scenario 5
                else if (scenario.source.key === "OF" && scenario.source.mode === "ROUTED"
                    && !state.rehomeChecked) {
                    if (scenario.source.port_type != port.port_type) {
                        setPortUnPickable(port, "Port type is not matched.");
                    } else {
                        setPortPickable(port);
                    }
                }
                // Scenario 6
                else if (scenario.source.key === "OF" && scenario.source.mode === "ROUTED"
                    && state.rehomeChecked) {
                    if (view.deviceKey != "GF") {
                        setPortUnPickable(port, "Not matched with Scenario 6, as target device is not green field.");
                    } else if (view.deviceMode != "ROUTED") {
                        setPortUnPickable(port, "Not matched with Scenario 2, as target device is not Routed.");
                    } else if (scenario.source.port_type != port.port_type) {
                        setPortUnPickable(port, "Port type is not matched.");
                    } else {
                        setPortPickable(port);
                    }
                }
                // Scenario 7
                else if (scenario.source.mode === "SWITCHED" && scenario.source.port_type === "GIGE"
                    && !state.rehomeChecked) {
                    if (scenario.source.port_type != port.port_type) {
                        setPortUnPickable(port, "Port type is not matched.");
                    } else {
                        setPortPickable(port);
                    }
                }
                // no scenario matched.
                else {
                    setPortUnPickable(port, "No Scenario matched.");
                }
            }
        }
    };
    var isG6SupportedViolation = function(source, isInNodeView) {
        if (isInNodeView) return false;
        var sourcePos = source.pos;
        var device = inNodeView.device;
        var sourcePort = device[sourcePos[0]][sourcePos[1]];
        var circuit_type = sourcePort.circuit_type;
        if (!circuit_type) return false;
        var strs = circuit_type.split('/');
        var isGpon = (strs[strs.length - 1] === "GPON");
        if (isGpon) {
            if (rehomeView.deviceG6Connected === "Y" && inNodeView.deviceG6Connected === "Y"
                && !hasSameG6Support(inNodeView.deviceG6Supported, rehomeView.deviceG6Supported)) {
                return true;
            }
        }
        return false;
    };
    var hasSameG6Support = function(sourceStr, targetStr) {
        if (!targetStr) return true;
        if (!sourceStr) return false;
        var s = sourceStr.split(",");
        var t = targetStr.split(",");
        for (var i = 0; i < s.length; i++) {
            for (var j = 0; j < t.length; j++) {
                if (s[i] === t[j]) return true;
            }
        }
        return false;
    };
    var isLagTargetSlotPort = function(source, targetPos, isInNodeView) {
        var sourcePos = source.pos;
        var device = inNodeView.device;
        var sourcePort = device[sourcePos[0]][sourcePos[1]];
        var slot = parseInt(targetPos[1] / 2) + 1;

        if (sourcePort.isLagMember) {
            // block the movement to slot where existing a lag members port.
            if (isInNodeView) {
                var sourceSlot = parseInt(sourcePos[1] / 2) + 1;
                if (sourceSlot === slot) return false;
                var lagMembers = inNodeView.lagMembersMap[sourcePort.port_desc];
                if (lagMembers) {
                    for (var i = 0; i < lagMembers.length; i++) {
                        var lagMember = lagMembers[i];
                        var lagMemberPort = device[lagMember[0]][lagMember[1]];
                        var lagMemberSlot = parseInt(lagMember[1] / 2) + 1;
                        if (lagMemberSlot === slot) {
                            var LAG_order1 = parseInt(lagMemberPort.LAG_order);
                            var LAG_order2 = parseInt(sourcePort.LAG_order);
                            if (Math.abs(LAG_order1 - LAG_order2) != 2) {
                                return true;
                            }
                        }
                    }
                }
            }

            // block the movement to slot where a lag members port moved to.
            var lagTargetSlots = summary.lagTargetSlotsMap[sourcePort.port_desc];
            if (lagTargetSlots) {
                var index = -1;
                for (var i = 0; i < lagTargetSlots.length; i++) {
                    if (lagTargetSlots[i].slot === slot) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    var slotMap = lagTargetSlots[index];
                    if (slotMap.LAG_orders.length === 1) {
                        var LAG_order1 = parseInt(slotMap.LAG_orders[0]);
                        var LAG_order2 = parseInt(sourcePort.LAG_order);
                        if (Math.abs(LAG_order1 - LAG_order2) === 2) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    };
    var isG6RehomePort = function(source, isInNodeView) {
        if (!isInNodeView) {
            var sourcePos = source.pos;
            var device = inNodeView.device;
            var sourcePort = device[sourcePos[0]][sourcePos[1]];
            if (sourcePort.isG6 && Object.keys(rehomeView.g6AccessPortsMap).length > 0) {
                return true;
            }
        }
        return false;
    };
    var isG6TargetSlotPort = function(source, targetPos, isInNodeView) {
        var sourcePos = source.pos;
        var device = inNodeView.device;
        var sourcePort = device[sourcePos[0]][sourcePos[1]];
        var slot = parseInt(targetPos[1] / 2) + 1;

        if (sourcePort.isG6) {
            // block the movement to slot where existing a G6 port.
            if (isInNodeView) {
                var sourceSlot = parseInt(sourcePos[1] / 2) + 1;
                if (sourceSlot === slot) return false;
                var g6AccessPorts = inNodeView.g6AccessPortsMap[sourcePort.z_device];
                if (g6AccessPorts) {
                    for (var i = 0; i < g6AccessPorts.length; i++) {
                        var g6AccessPort = g6AccessPorts[i];
                        var g6AccessSlot = parseInt(g6AccessPort[1] / 2) + 1;
                        if (g6AccessSlot === slot) return true;
                    }
                }
            }
            // block the movement to slot where another G6 moved to.
            var g6TargetSlots = summary.g6TargetSlotsMap[sourcePort.z_device];
            if (g6TargetSlots) {
                if (g6TargetSlots.indexOf(slot) > -1) return true;
            }
        }
        return false;
    };

    var setPortPickable = function(port) {
        port.isPickable = true;
        port.port_cell_class = removeClass(port.port_cell_class, "unPickable-cell");
        port.port_cell_class = addClass(port.port_cell_class, "pickable-cell");
        port.isShowReason = false;
    };
    var setPortUnPickable = function(port, reason) {
        port.isPickable = false;
        port.port_cell_class = removeClass(port.port_cell_class, "pickable-cell");
        port.port_cell_class = addClass(port.port_cell_class, "unPickable-cell");
        if (reason) {
            port.isShowReason = true;
            port.reason = reason;
        }
    };

    var getPortName = function(port) {
        if (!port) return "";
        if (port.isIO) return "IO";
        if (port.isG6) return "G6";
        return port.port_num;
    };

    var iomMdaMouseOver = function(iomMda) {
        infoTooltip.iomMda = iomMda;
        infoTooltip.isPortTooltip = false;
        infoTooltip.isShow = true;
    };
    var iomMdaMouseOut = function() {
        infoTooltip.isShow = false;
    };

    var addClass = function(classStr, c) {
        var cs = classStr.split(" ");
        var isExist = false;
        for (var i = 0; i < cs.length; i++) {
            if (cs[i] === c) isExist = true;
        }
        if (!isExist) classStr += " " + c;
        return classStr;
    };

    var removeClass = function(classStr, c) {
        if (!classStr) return "";
        var cs = classStr.split(" ");
        var newStr = "";
        for (var i = 0; i < cs.length; i++) {
            if (cs[i] != c) newStr += " " + cs[i];
        }

        return newStr.trim();
    };

    var portPlaceStrConverter = function(p) {
        var slot = parseInt(p[1] / 2) + 1;
        var subSlot = (p[1] % 2) + 1;
        var portNum = p[0] + 1;

        return slot + "-" + subSlot + "-" + portNum;
    };

    return srvFactory;
}]);
