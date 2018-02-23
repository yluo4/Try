/* 
 * This is for service path vpe device
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeVpe2 = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var default_props = {
        x: 100,
        y: 100,
        hasAlert: true,
        psrvs: []
    };
    var props = props_a || default_props;
    
    // node attrbutes
    var ra1, ra2, dn, ia, pn, vn;
    var setAttrs = function() {
        ra1 = {
            x: props.x,
            y: props.y,
            rx: 5,
            ry: 5,
            width: 75,
            height: 65
        };
        ra2 = {
            x: props.x + 10,
            y: props.y + 8,
            rx: 7,
            ry: 7,
            width: 55,
            height: 43
        };
        dn = {
            x: props.x,
            y: props.y + 23,
            fill: "#000000",
            size: "15px"
        };
        ia = {
            x: props.x + 20,
            y: props.y + 20,
            width: 35,
            height: 35,
            src: "../images/router-grey.png"
        };
        pn = {
            x: props.x,
            y: props.y + 65 + 16,
            fill: "#2196f3",
            size: "12px"
        };
        vn = {
            x: props.x,
            y: props.y + 62,
            fill: "#2196f3",
            size: "10px"
        };
    };
    setAttrs();
    
    var rect1 = group.append("rect");
    var rect2 = group.append("rect");
    var dname = group.append("text");
    var img = group.append("image");
    this.draw = function(props_b) {
        props = props_b || props;
        processProps();
        setAttrs();
        
        rect1.attr("x", ra1.x)
            .attr("y", ra1.y)
            .attr("rx", ra1.rx)
            .attr("ry", ra1.ry)
            .attr("width", ra1.width)
            .attr("height", ra1.height)
            .attr("class", "device");
    
        rect2.attr("x", ra2.x)
            .attr("y", ra2.y)
            .attr("rx", ra2.rx)
            .attr("ry", ra2.ry)
            .attr("width", ra2.width)
            .attr("height", ra2.height)
            .attr("class", "inner-device");
        var r2Box = rect2.node().getBBox();
    
        if (props.hasAlert) {
            rect2.attr("class", "alert-device");
            
            ia.src = "../images/router-red.png";
        }
        
        dname.attr("x", dn.x)
            .attr("y", dn.y)
            .style("fill", dn.fill)
            .style("font-size", dn.size)
            .text("vPE");
        var tBox = dname.node().getBBox();
        dn.x = ra2.x + (r2Box.width - tBox.width) / 2;
        dname.attr("x", dn.x);
    
        img.attr("x", ia.x)
            .attr("y", ia.y)
            .attr("width", ia.width)
            .attr("height", ia.height)
            .attr("xlink:href", ia.src);
    
        // vpe pserver names
        var psrvs = props.psrvs || [];
        if (psrvs.length > 0) {
            var psrvText = group.append("text")
                    .attr("x", pn.x)
                    .attr("y", pn.y)
                    .style("fill", pn.fill)
                    .style("font-size", pn.size)
                    .text(psrvs[0]);
            var psrvTextBox = psrvText.node().getBBox();
            pn.x = ra1.x + (ra1.width - psrvTextBox.width) / 2;
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
        
        // vpe name
        if (props.vpe != null) {
            var vpeText = group.append("text")
                    .attr("x", vn.x)
                    .attr("y", vn.y)
                    .style("fill", vn.fill)
                    .style("font-size", vn.size)
                    .text(props.vpe);
            var vpeTextBox = vpeText.node().getBBox();
            vn.x = ra1.x + (ra1.width - vpeTextBox.width) / 2;
            vpeText.attr("x", vn.x);
        }
    };
    
    var processProps = function() {
        if (props.py != null) {
            var y = props.py - ra1.height / 2;
            props.y = y;
        }
    };
    
    this.getPortL = function() {
        var px = ra1.x;
        var py = ra1.y + ra1.height / 2;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.getPortR = function() {
        var px = ra1.x + ra1.width;
        var py = ra1.y + ra1.height / 2;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.getPort1T = function() {
        var px = ra1.x + ra1.width / 4;
        var py = arrow1T == null ? ra1.y : ra1.y - 6;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.getPort2T = function() {
        var px = ra1.x + (ra1.width * 3) / 4;
        var py = ra1.y;
        
        return {
            x: px,
            y: py
        };
    };
    
    var arrow1T = null;
    this.addArrow = function() {
        var x = ra1.x + ra1.width / 4;
        var y = ra1.y - 6;
        
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
        arrow1T = group.append("path")
                .attr("d", d)
                .style("fill", pa.fill);
    };
};

TOPO.NodeVpe2.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeVpe2.prototype.constructor = TOPO.NodeVpe2;
