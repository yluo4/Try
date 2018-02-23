/* 
 * This is a template for square device
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeSquare = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var default_props = {
        x: 100,
        y: 100,
        dname: "VPLS/PE",
        psrvs: []
    };
    var props = props_a || default_props;

    // node attributes
    var ra, dn, pn;
    var setAttrs = function() {
        ra = {
            x: props.x,
            y: props.y,
            rx: 5,
            ry: 5,
            width: 75,
            height: 65
        };
        dn = {
            x: props.x,
            y: props.y + 36.5,
            fill: "#000000",
            size: "15px"
        };
        pn = {
            x: props.x,
            y: props.y + 65 + 15,
            fill: "#2196f3",
            size: "12px"
        };
    };
    setAttrs();
    
    var rect = group.append("rect");
    var dname = group.append("text");
    this.draw = function(props_b) {
        props = props_b || props;
        processProps();
        setAttrs();
        
        rect.attr("x", ra.x)
                .attr("y", ra.y)
                .attr("rx", ra.rx)
                .attr("ry", ra.ry)
                .attr("width", ra.width)
                .attr("height", ra.height)
                .attr("class", "device");
        var rBox = rect.node().getBBox();
        
        dname.attr("x", dn.x)
            .attr("y", dn.y)
            .style("fill", dn.fill)
            .style("font-size", dn.size)
            .text(props.dname);
        var tBox = dname.node().getBBox();
        dn.x = ra.x + (rBox.width - tBox.width) / 2;
        //dn.y = ra.y + (rBox.height - tBox.height) / 2 + tBox.height - 4;
        dname.attr("x", dn.x);
        
        // device pserver names
        var psrvs = props.psrvs || [];
        if (psrvs.length > 0) {
            var psrvText = group.append("text")
                    .attr("x", pn.x)
                    .attr("y", pn.y)
                    .style("fill", pn.fill)
                    .style("font-size", pn.size)
                    .text(psrvs[0]);
            var psrvTextBox = psrvText.node().getBBox();
            pn.x = ra.x + (ra.width - psrvTextBox.width) / 2;
            psrvText.attr("x", pn.x);
            
            var ty = pn.y + 12;
            for (var i = 1; i < psrvs.length; i++) {
                group.append("text")
                    .attr("x", pn.x)
                    .attr("y", ty)
                    .style("fill", pn.fill)
                    .style("font-size", pn.size)
                    .text(psrvs[i]);
            }
        }
    };
    
    var processProps = function() {
        if (props.py != null) {
            var y = props.py - ra.height / 2;
            props.y = y;
        }
    };
    
    this.getPortL = function() {
        var px = ra.x;
        var py = ra.y + ra.height / 2;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.getPortR = function() {
        var px = ra.x + ra.width;
        var py = ra.y + ra.height / 2;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.getPortT = function() {
        var px = ra.x + ra.width / 2;
        var py = arrowT == null ? ra.y : ra.y - 6;
        
        return {
            x: px,
            y: py
        };
    };
    
    var arrowT = null;
    this.addArrow = function() {
        var x = ra.x + ra.width / 2;
        var y = ra.y - 6;
        
        var dArr= [
            "M",
            x, y,
            "l",
            5, 0,
            -5, 6,
            -5, -6,
            5, 0
        ];
        
        var pa = {
            fill: "#067ab4"
        };
        
        var d = dArr.join(" ");
        arrowT = group.append("path")
                .attr("d", d)
                .style("fill", pa.fill);
    };
    
};

TOPO.NodeSquare.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeSquare.prototype.constructor = TOPO.NodeSquare;
