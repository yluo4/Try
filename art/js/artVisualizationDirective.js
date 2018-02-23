
angular.module('abDirectives').directive('colorKeyDiv', ['$document', function($document) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'icecap-appboard-lob-plugins/art/views/template/color-key-legend-template.html',
        link: function(scope, element, attrs) {
            $(element).appendTo($("body"));
            // Start Draggable
            var colorKeyElem = $(element).find(".color-key");
            var startX, startY, initialMouseX, initialMouseY;

            colorKeyElem.on("mousedown", function(e) {
                startX = colorKeyElem.prop('offsetLeft');
                startY = colorKeyElem.prop('offsetTop');
                initialMouseX = e.clientX;
                initialMouseY = e.clientY;

                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                return false;
            });

            var mousemove = function(e) {
                var dx = e.clientX - initialMouseX;
                var dy = e.clientY - initialMouseY;
                colorKeyElem.css({
                    top:  startY + dy + 'px',
                    left: startX + dx + 'px'
                });
                return false;
            };

            var mouseup = function(e) {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            };
            // End Draggable
        }
    };
}]);


angular.module('abDirectives').directive('portInfoTooltip',
        ['artVisualizationFactory', '$document', '$window', function(srvFactory, $document, $window) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'icecap-appboard-lob-plugins/art/views/template/port-info-tooltip-template.html',
        link: function(scope, element, attrs) {
            $(element).appendTo($("body"));

            var obj = {
                "scope": scope
            };
            srvFactory.portInfoTooltipInitial(obj);

            // move tooltip when mouse move around the port.
            var docWidth = $($document).width();
            var tooltipElem = $(element).find(".info-tooltip");
            scope.$watch(function(scope) {
                return scope.infoTooltip.isShow;
            }, function(newValue, oldValue) {
                if (newValue) {
                    $document.on('mousemove', mousemove);
                } else {
                    $document.off('mousemove', mousemove);
                }
   	      	});
            var mousemove = function(e) {
                var top = e.clientY + 10;
                var left = e.clientX + 10;
                // if tooltip is out of the screen, display the tooltip on the left side
                var tooltipWidth = tooltipElem.width();
                if (left + tooltipWidth > docWidth) {
                    left = left - tooltipWidth - 35;
                }

                scope.$apply(function() {
                    scope.infoTooltip.position = {
                        "top": top + 'px',
                        "left": left + 'px'
                    };
                });

                return false;
            };
        }
    };
}]);

// As the widget container's overflow is set to hidden, the calendar will be hidden
// This directive is to set the parent widget container to not hidden.
// Also set the z-index of the parent widget to be larger than the others.
angular.module('abDirectives').directive('adjustWidgetCss',
        ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            $timeout(function () {
                var wContainer = $(element).closest("div.w-container");
                var wLi = wContainer.parent();
                wContainer.css("overflow", "visible");
                wLi.css("z-index", 3);
            });
        }
    };
}]);


// Customize calendar
angular.module('abDirectives').directive('ordersPerDay',
        ['artVisualizationFactory', function(srvFactory) {
    return {
        restrict: 'A',
        scope: {
            "curDate": "="
        },
        link: function(scope, element, attrs) {
            var date = moment(scope.curDate);
            var startDate = moment().add(3, "d");
            if (date.isSameOrAfter(startDate, "day")) {
                var dateStr = date.format("YYYY-MM-DD");
                $(element).html(srvFactory.getOrderCountPerDay(dateStr));
            }
        }
    };
}]);


angular.module('abDirectives').directive('dayCellTooltipHandler',
        ['artVisualizationFactory', function(srvFactory) {
    return {
        restrict: 'A',
        scope: {
        },
        link: function(scope, element, attrs) {
            $(element).on('mouseover', function() {

                scope.$apply(function() {
                    srvFactory.dayCellTooltipHandler(true);
                });
                return false;
            });
            $(element).on('mouseleave', function() {

                scope.$apply(function() {
                    srvFactory.dayCellTooltipHandler(false);
                });
                return false;
            });
            scope.$on('$destroy', function() {
                srvFactory.dayCellTooltipHandler(false);
            });
        }
    };
}]);

// button loading status
angular.module('abDirectives').directive('submittingButton',
        ['artVisualizationFactory', function(srvFactory) {
    return {
        restrict: 'A',
        scope: {
            "isSubmitting": "="
        },
        link: function(scope, element, attrs) {
            scope.$watch(function(scope) {
                return scope.isSubmitting;
            }, function(newValue, oldValue) {
                if (newValue) {
                    $(element).html("<i class='fa fa-circle-o-notch fa-spin'></i> Submitting...");
                    $(element).prop("disabled", true);
                } else {
                    $(element).html("&nbsp; Submit Order &nbsp;");
                    $(element).prop("disabled", false);
                }
   	      	});
        }
    };
}]);

// Calendar max orders display update
angular.module('abDirectives').directive('calMaxOrdersUpdate',
        ['artVisualizationFactory', function(srvFactory) {
    return {
        restrict: 'A',
        scope: {
        },
        link: function(scope, element, attrs) {
            var max = srvFactory.getMaxOrderCount();
            $(element).html("Max orders per day - " + max);
        }
    };
}]);
