/* 
 * This is VPE device node.  It will inherit from node class.
 */
"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeVpe = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    
    var default_props = {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        vpename: "",
        vmname1: "",
        vmname2: "",
        pname: "",
        hasAlert: true
    };
    var props = props_a || default_props;
    
    // node attributes
    var ra1, ra2, ra3, dn, ia, vn, vmn1, vmn2, pn;
    var setAttrs = function() {
        ra1 = {    // outside rect
            x: props.x,
            y: props.y,
            rx: 5,
            ry: 5,
            width: 120,
            height: 125
        };
        ra2 = {    // middle rect
            x: props.x + 6,
            y: props.y + 7,
            rx: 6,
            ry: 6,
            width: 108,
            height: 98
        };
        ra3 = {    // inner rect
            x: props.x + 13,
            y: props.y + 14,
            rx: 7,
            ry: 7,
            width: 94,
            height: 58
        };
        dn = {    // device name
            x: props.x + 49,
            y: props.y + 32,
            fill: "#2196f3",
            size: "12px"
        };
        ia = {    // image
            x: props.x + 45,
            y: props.y + 30,
            width: 30,
            height: 30,
            src: "../images/router-grey.png"
        };
        vn = {    // vpe name
            x: props.x + 29,
            y: props.y + 66,
            fill: "#2196f3",
            size: "11px"
        };
        vmn1 = {  // vm1 name 
            x: props.x + 16,
            y: props.y + 86,
            fill: "#2196f3",
            size: "11px"
        };
        vmn2 = {   // vm2 name
            x: props.x + 16,
            y: props.y + 98,
            fill: "#2196f3",
            size: "11px"
        };
        pn = {    // physical server name
            x: props.x + 29,
            y: props.y + 118,
            fill: "#2196f3",
            size: "11px"
        };
    };
    setAttrs();
    
    
    var rect1 = group.append("rect");
    var rect2 = group.append("rect");
    var rect3 = group.append("rect");
    var dname = group.append("text");
    var vpename = group.append("text");
    var vmname1 = group.append("text");
    var vmname2 = group.append("text");
    var pname = group.append("text");
    var img = group.append("image");
    // override draw method
    this.draw = function(props_b) {
        props = props_b || props;
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
        
        rect3.attr("x", ra3.x)
            .attr("y", ra3.y)
            .attr("rx", ra3.rx)
            .attr("ry", ra3.ry)
            .attr("width", ra3.width)
            .attr("height", ra3.height)
            .attr("class", "inner-device");
        
        if (props.hasAlert) {
            rect3.attr("class", "alert-device");
            
            ia.src = "../images/router-red.png";
        }
        
        dname.attr("x", dn.x)
            .attr("y", dn.y)
            .style("fill", dn.fill)
            .style("font-size", dn.size)
            .text("vPE");
        
        vpename.attr("x", vn.x)
            .attr("y", vn.y)
            .style("fill", vn.fill)
            .style("font-size", vn.size)
            .text(props.vpename);
        
        vmname1.attr("x", vmn1.x)
            .attr("y", vmn1.y)
            .style("fill", vmn1.fill)
            .style("font-size", vmn1.size)
            .text(props.vmname1);
        
        vmname2.attr("x", vmn2.x)
            .attr("y", vmn2.y)
            .style("fill", vmn2.fill)
            .style("font-size", vmn2.size)
            .text(props.vmname2);
        
        pname.attr("x", pn.x)
            .attr("y", pn.y)
            .style("fill", pn.fill)
            .style("font-size", pn.size)
            .text(props.pname);
        
        img.attr("x", ia.x)
            .attr("y", ia.y)
            .attr("width", ia.width)
            .attr("height", ia.height)
            .attr("xlink:href", ia.src);
        
    };
    
    this.getWidth = function() {
        return ra1.width;
    };
    this.getHeight = function() {
        return ra1.height;
    };
    
    this.getPortB = function() {  // get bottom port position
        var px = ra1.x + ra1.width / 2;
        var py = ra1.y + ra1.height;
        
        return {
            x: px,
            y: py
        };
    };
    
    this.addDragEvent = function(connectGroup, sEdges, tEdges, aic) {
        var tranX = props.tx;
        var tranY = props.ty;
        
        var dragstarted = function() {
            d3.event.sourceEvent.stopPropagation();
        };
        
        var dragged = function() {
            tranX = tranX + d3.event.dx;
            tranY = tranY + d3.event.dy;
            
            group.attr("transform", "translate(" + tranX + ", " + tranY + ")");
            
            // edges updates
            for (var i = 0; i < sEdges.length; i++) {
                sEdges[i].updatePath(d3.event.dx, d3.event.dy, true);
            }
            
            for (var i = 0; i < tEdges.length; i++) {
                tEdges[i].updatePath(d3.event.dx, d3.event.dy, false);
            }
            
            // aic cloud updates
            var box = connectGroup.node().getBBox();
            aic.updatePath(box.x - 10, box.y - 10, box.width + 20, box.height + 20);
            
            
        };
        
        var drag = d3.behavior.drag()
                    .origin(function() { return {x: props.tx, y: props.ty}; })
                    .on("dragstart", dragstarted)
                    .on("drag", dragged);
        group.call(drag);
    };
};

TOPO.NodeVpe.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeVpe.prototype.constructor = TOPO.NodeVpe;
