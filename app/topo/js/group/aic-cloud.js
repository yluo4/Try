/* 
 * This is the cloud group to group vpe and vce together
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.AicCloud = function(container_a, props_a) {
    var container = container_a;
    var group = container.append("g");
    
    var default_props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        aicName: ""
    };
    var props = props_a || default_props;
    
    var pa;  // path attribute
    var na;  // aic name attribute
    var setAttrs = function() {
        pa = {
            x: props.x,
            y: props.y,
            width: props.width,
            height: props.height,
            stroke: "#daeafd",
            stroke_width: "3px",
            fill: "none"
        };
        na = {
            x: props.x + 10,
            y: props.y + 10,
            size: "18px",
            fill: "#2196f3"
        };
    };
    setAttrs();
    
    var path = group.append("path");
    var aicName = group.append("text");
    this.draw = function(props_b) {
        props = props_b || props;
        setAttrs();
        
        var d = calDAttr(pa.x, pa.y, pa.width, pa.height);
        path.attr("d", d)
                .style("stroke", pa.stroke)
                .style("stroke-width", pa.stroke_width)
                .style("fill", pa.fill);
        
        aicName.attr("x", na.x)
                .attr("y", na.y)
                .style("size", na.size)
                .style("fill", na.fill)
                .text(props.aicName);
    };
    
    this.updatePath = function(x, y, width, height) {
        pa.x = x;
        pa.y = y;
        pa.width = width;
        pa.height = height;
        
        var d = calDAttr(pa.x, pa.y, pa.width, pa.height);
        path.attr("d", d);
        
        na.x = pa.x + 10;
        na.y = pa.y + 10;
        aicName.attr("x", na.x)
                .attr("y", na.y);
    };
    
    
    var covertCoordinateToStr = function(coord, s) {
        return (coord[0] * s) + "," + (coord[1] * s);
    };
    
    var calDAttr = function(x, y, width, height) {
        var cs = [
                [[0,-10], [5,-12], [13,-14]],
                [[0,-15], [25,-15], [30,-10]],
                [[10,-10], [30,-10], [40,0]],
                [[15,-10], [30,-5], [40,2]],
                [[8,-5], [25,-5], [30,5]],
                [[5,-10], [25,-10], [30,-5]],
                [[14,-12], [42,-10], [45,8]],
                [[8,2], [13,2], [13,14]]
             ];
        var default_width = 241;
        var ratio = width / default_width;
        for (var i = 0; i < cs.length; i++) {
            cs[i][0][0] *= ratio;
            cs[i][1][0] *= ratio;
            cs[i][2][0] *= ratio;
        }

        var d= "m" + x + "," + y;
        for (var i = 0; i < cs.length; i++) {
            var coord1 = covertCoordinateToStr(cs[i][0], 1);
            var coord2 = covertCoordinateToStr(cs[i][1], 1);
            var coord3 = covertCoordinateToStr(cs[i][2], 1);

            d += " c" + coord1 + " " + coord2 + " " + coord3;
        }

        var lineLen = height;
        d += " l0," + lineLen;

        for (var i = 0; i < cs.length; i++) {
            var coord1 = covertCoordinateToStr(cs[i][0], -1);
            var coord2 = covertCoordinateToStr(cs[i][1], -1);
            var coord3 = covertCoordinateToStr(cs[i][2], -1);

            d += " c" + coord1 + " " + coord2 + " " + coord3;
        }

        d += " l0," + (-lineLen);


        return d;
    };
    
};


