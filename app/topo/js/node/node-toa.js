/* 
 * This is TOA device.
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeToa = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var default_props = {
        x: 100,
        y: 100,
        names: []
    };
    var props = props_a || default_props;
    
    // node attributes
    var ra, dn, tn;
    var setAttrs = function() {
        ra = {
            x: props.x,
            y: props.y,
            rx: 5,
            ry: 5,
            width: 370,
            height: 70
        };
        dn = {
            x: props.x,
            y: props.y + 15,
            fill: "#000000",
            size: "15px"
        };
        tn = {
            x: props.x,
            y: props.y - 5,
            fill: "#2196f3",
            size: "12px"
        };
    };
    setAttrs();
    
    var rect = group.append("rect");
    var dname = group.append("text");
    this.draw = function(props_b) {
        props = props_b || props;
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
            .text("TOA");
        var tBox = dname.node().getBBox();
        dn.x = ra.x + (rBox.width - tBox.width) / 2;
        //dn.y = ra.y + (rBox.height - tBox.height) / 2 + tBox.height - 4;
        dname.attr("x", dn.x);
        
        var names = props.names || [];
        if (names.length > 0) {
            var tname = group.append("text")
                    .attr("x", tn.x)
                    .attr("y", tn.y)
                    .style("fill", tn.fill)
                    .style("font-size", tn.size)
                    .text(names[0]);
            var tnameBox = tname.node().getBBox();
            tn.x = ra.x + (rBox.width - tnameBox.width) / 2;
            tname.attr("x", tn.x);
            
            var ty = tn.y - 12;
            for (var i = 1; i < names.length; i++) {
                tname = group.append("text")
                    .attr("x", tn.x)
                    .attr("y", ty)
                    .style("fill", tn.fill)
                    .style("font-size", tn.size)
                    .text(names[i]);
                
                ty = ty - 12;
            }
        }
        
    };
    
    var port1B, port2B, port3B, port4B;
    this.setPorts = function(ports) {
        var vcePort1 = ports.vcePort1;
        var vcePort2 = ports.vcePort2;
        var vpePort1 = ports.vpePort1;
        var vpePort2 = ports.vpePort2;
        
        var px = vcePort1.x;
        var py = ra.y + ra.height;
        port1B = {
            x: px,
            y: py
        };
        
        px = vcePort2.x;
        port2B = {
            x: px,
            y: py
        };
        
        px = vpePort1.x;
        port3B = {
            x: px,
            y: py
        };
        
        px = vpePort2.x;
        port4B = {
            x: px,
            y: py
        };
        
        ports = {
            pl: this.getPortL(),
            p1b: port1B,
            p2b: port2B,
            p3b: port3B,
            p4b: port4B,
            pr: this.getPortR()
        };
        addInternalEdges(ports);
        
        addArrow();
    };
    
    this.getPort1B = function() {
        return port1B;
    };
    
    this.getPort2B = function() {
        port2B.y = arrow2B == null ? port2B.y : port2B.y + 6;
        return port2B;
    };
    
    this.getPort3B = function() {
        return port3B;
    };
    
    this.getPort4B = function() {
        port4B.y = arrow4B == null ? port4B.y : port4B.y + 6;
        return port4B;
    };
    
    this.getPortL = function() {
        var px = arrowL == null ? ra.x : ra.x - 6;
        var py = ra.y + ra.height / 2;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.getPortR = function() {
        var px = ra.x + ra.width;
        px = arrowR == null ? px : px + 6; 
        var py = ra.y + ra.height / 2;
        
        return {
            x: px,
            y: py
        };
    };
    
    var arrowL = null, arrowR = null, arrow2B = null, arrow4B = null;
    var addArrow = function() {
        var pa = {
            fill: "#067ab4"
        };
        
        var x = ra.x - 6;
        var y = ra.y + ra.height / 2;
        var dArr= [
            "M",
            x, y,
            "l",
            0, -5,
            6, 5,
            -6, 5,
            0, -5
        ];
        var d = dArr.join(" ");
        arrowL = group.append("path")
                .attr("d", d)
                .style("fill", pa.fill);
        
        x = ra.x + ra.width + 6;
        y = ra.y + ra.height / 2;
        dArr= [
            "M",
            x, y,
            "l",
            0, -5,
            -6, 5,
            6, 5,
            0, -5
        ];
        d = dArr.join(" ");
        arrowR = group.append("path")
                .attr("d", d)
                .style("fill", pa.fill);
        
        x = port2B.x;
        y = port2B.y + 6;
        dArr= [
            "M",
            x, y,
            "l",
            5, 0,
            -5, -6,
            -5, 6,
            5, 0
        ];
        d = dArr.join(" ");
        arrow2B = group.append("path")
                .attr("d", d)
                .style("fill", pa.fill);
        
        x = port4B.x;
        y = port4B.y + 6;
        dArr= [
            "M",
            x, y,
            "l",
            5, 0,
            -5, -6,
            -5, 6,
            5, 0
        ];
        d = dArr.join(" ");
        arrow2B = group.append("path")
                .attr("d", d)
                .style("fill", pa.fill);
    };
    
    var addInternalEdges = function(ports) {
        var pl = ports.pl;
        var p1b = ports.p1b;
        var p2b = ports.p2b;
        var p3b = ports.p3b;
        var p4b = ports.p4b;
        var pr = ports.pr;
        
        var pa = {
            stroke: "#067ab4" ,
            stroke_width: "2px",
            stroke_arr: "15, 5, 2, 5, 2, 5",
            fill: "none"
        };
        
        // edge between port left and port1 bottom
        var dArr = [
            "M",
            pl.x, pl.y,
            "L",
            p1b.x, pl.y,
            "L",
            p1b.x, p1b.y
        ];
        var d = dArr.join(" ");
        var itnalP1 = group.append("path")
                .attr("d", d)
                .style("stroke", pa.stroke)
                .style("stroke-width", pa.stroke_width)
                .style("stroke-dasharray", pa.stroke_arr)
                .style("fill", pa.fill);
        
        // edge between port2B and port3B
        dArr = [
            "M",
            p2b.x, p2b.y,
            "L",
            p2b.x, pl.y,
            "L",
            p3b.x, pl.y,
            "L",
            p3b.x, p3b.y
        ];
        d = dArr.join(" ");
        var itnalP2 = group.append("path")
                .attr("d", d)
                .style("stroke", pa.stroke)
                .style("stroke-width", pa.stroke_width)
                .style("stroke-dasharray", pa.stroke_arr)
                .style("fill", pa.fill);
        
        // edge between port3B and port4B
        dArr = [
            "M",
            p4b.x, p4b.y,
            "L",
            p4b.x, pl.y,
            "L",
            pr.x, pr.y
        ];
        d = dArr.join(" ");
        var itnalP3 = group.append("path")
                .attr("d", d)
                .style("stroke", pa.stroke)
                .style("stroke-width", pa.stroke_width)
                .style("stroke-dasharray", pa.stroke_arr)
                .style("fill", pa.fill);
        
    };
    
};

TOPO.NodeToa.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeToa.prototype.constructor = TOPO.NodeToa;

