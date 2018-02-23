/* 
 * This is VCE device node.  It will inherit from node class.
 */
"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeVce = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var props = props_a;
    /*  This is props sample
    var props = {
        x: 100,
        y: 100,
        tx: 0,
        ty: 0,
        vpename: "snbca401me6",
        vmname: "snbca401me601fej",
        pname: "sagca125sd9",
        hasAlert: true
    };
    */
    
    // node attributes
    var ra1 = {    // outside rect
        x: props.x,
        y: props.y,
        rx: 5,
        ry: 5,
        width: 120,
        height: 113
    };
    var ra2 = {    // middle rect
        x: props.x + 6,
        y: props.y + 7,
        rx: 6,
        ry: 6,
        width: 108,
        height: 86
    };
    var ra3 = {    // inner rect
        x: props.x + 13,
        y: props.y + 14,
        rx: 7,
        ry: 7,
        width: 94,
        height: 58
    };
    var dn = {    // device name
        x: props.x + 49,
        y: props.y + 32,
        fill: "#2196f3",
        size: "12px"
    };
    var ia = {    // image
        x: props.x + 45,
        y: props.y + 30,
        width: 30,
        height: 30,
        src: "../images/memory-grey.png"
    };
    var vn = {    // vpe name
        x: props.x + 29,
        y: props.y + 66,
        fill: "#2196f3",
        size: "11px"
    };
    var vmn = {  // vm name 
        x: props.x + 14,
        y: props.y + 86,
        fill: "#2196f3",
        size: "11px"
    };
    var pn = {    // physical server name
        x: props.x + 29,
        y: props.y + 106,
        fill: "#2196f3",
        size: "11px"
    };
    
    var rect1, rect2, rect3;
    var dname, vpename, vmname, pname, img;
    // override draw method
    this.draw = function() {
        rect1 = group.append("rect")
                .attr("x", ra1.x)
                .attr("y", ra1.y)
                .attr("rx", ra1.rx)
                .attr("ry", ra1.ry)
                .attr("width", ra1.width)
                .attr("height", ra1.height)
                .attr("class", "device");
        
        rect2 = group.append("rect")
                .attr("x", ra2.x)
                .attr("y", ra2.y)
                .attr("rx", ra2.rx)
                .attr("ry", ra2.ry)
                .attr("width", ra2.width)
                .attr("height", ra2.height)
                .attr("class", "inner-device");
        
        rect3 = group.append("rect")
                .attr("x", ra3.x)
                .attr("y", ra3.y)
                .attr("rx", ra3.rx)
                .attr("ry", ra3.ry)
                .attr("width", ra3.width)
                .attr("height", ra3.height)
                .attr("class", "inner-device");
        
        if (props.hasAlert) {
            rect3.attr("class", "alert-device");
            
            ia.src = "../images/memory-red.png";
        }
        
        dname = group.append("text")
                .attr("x", dn.x)
                .attr("y", dn.y)
                .style("fill", dn.fill)
                .style("font-size", dn.size)
                .text("vCE");
        
        vpename = group.append("text")
                .attr("x", vn.x)
                .attr("y", vn.y)
                .style("fill", vn.fill)
                .style("font-size", vn.size)
                .text(props.vpename);
        
        vmname = group.append("text")
                .attr("x", vmn.x)
                .attr("y", vmn.y)
                .style("fill", vmn.fill)
                .style("font-size", vmn.size)
                .text(props.vmname);
        
        pname = group.append("text")
                .attr("x", pn.x)
                .attr("y", pn.y)
                .style("fill", pn.fill)
                .style("font-size", pn.size)
                .text(props.pname);
        
        img = group.append("image")
                .attr("x", ia.x)
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
    
    this.getPortT = function() {  //get top port position
        var px = ra1.x + ra1.width / 2;
        var py = ra1.y;
        
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

TOPO.NodeVce.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeVce.prototype.constructor = TOPO.NodeVce;


