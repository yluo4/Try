/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('gamma', [])
        .service('UtilityService', [function () {

                this.packData = function (dataArray) {
                    var firstElement = dataArray[0];
                    if (Array.isArray(firstElement)) {
                        var paramsData = [];
                        for (var i = 0; i < dataArray.length; i++) {
                            var jsonObj = {};
                            for (var j = 0; j < dataArray[i].length; j++) {
                                this.packDataRow(jsonObj, dataArray[i][j]);
                            }
                            paramsData.push(jsonObj);
                        }
                        return paramsData;
                    }
                    else {
                        var jsonObj = {};
                        for (var i = 0; i < dataArray.length; i++) {
                            this.packDataRow(jsonObj, dataArray[i]);
                        }
                        return jsonObj;
                    }
                };

                this.packDataRow = function (jsonObj, valueObj) {
                    if (valueObj) {
                        var name = valueObj["name"];
                        var value = valueObj["value"];
                        jsonObj[name] = value;
                    }
                };

                //-----------------------------------------------------------------
                // unPackData unpacks the packed data formated above into 
                // up the name value pairs expected by the middleware
                // to use, send the results of this function 
                // to the "reports", "columns", or "data" arrays from the
                // middleware JSON object
                this.unPackData = function (packedData) {
                    if (Array.isArray(packedData)) {
                        var jsonObjRows = [];
                        for (var i = 0; i < packedData.length; i++) {
                            jsonObjRows.push(this.unPackDataRow(packedData[i]));
                        }
                        return jsonObjRows;
                    }
                    else {
                        return this.unPackDataRow(packedData);
                    }
                };

                this.unPackDataRow = function (valueObj) {
                    var jsonObjRow = [];
                    for (var key in valueObj) {
                        if (valueObj.hasOwnProperty(key)) {
                            var val = valueObj[key];
                            var jsonObj = {};
                            jsonObj["name"] = key;
                            jsonObj["value"] = val;
                            jsonObjRow.push(jsonObj);
                        }
                    }
                    return jsonObjRow;
                };
            }]); 