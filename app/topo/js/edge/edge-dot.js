/* 
 * This is a dot edge
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.EdgeDot = function(container_a, props_a) {
    TOPO.Edge.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    
    var default_props = {
        sx: 0,
        sy: 0,
        tx: 10,
        ty: 10,
        isVertical: true
    };
    var props = props_a || default_props;
    
    var calDAttr = props.isVertical ? this.calDAttrV : this.calDAttrH;
    
    var pa; // path attributes
    
    var setAttrs = function() {
        pa = {   // path attribute
            sx: props.sx,
            sy: props.sy,
            tx: props.tx,
            ty: props.ty,
            stroke: "#067ab4" ,
            stroke_width: "2px",
            stroke_arr: "5, 5",
            fill: "none"
        };
    };
    setAttrs();
    
    var path = group.append("path");
    this.draw = function(props_b) {
        props = props_b || props;
        setAttrs();
        
        var d = calDAttr(pa.sx, pa.sy, pa.tx, pa.ty);
        
        path.attr("d", d)
            .style("stroke", pa.stroke)
            .style("stroke-width", pa.stroke_width)
            .style("stroke-dasharray", pa.stroke_arr)
            .style("fill", pa.fill);
        
        highlightEvent();
    };
    
    this.updatePath = function(dx, dy, isSource) {
        if (isSource) {
            pa.sx = pa.sx + dx;
            pa.sy = pa.sy + dy;
        } else {
            pa.tx = pa.tx + dx;
            pa.ty = pa.ty + dy;
        }
        
        var d = calDAttr(pa.sx, pa.sy, pa.tx, pa.ty);
        path.attr("d", d);
    };
    
    var highlightEvent = function() {
        group.on("mouseover", function() {
            path.style("stroke-width", "3px");
        });
        
        group.on("mouseout", function() {
            path.style("stroke-width", "2px");
        });
    };

};

TOPO.EdgeDot.prototype = Object.create(TOPO.Edge.prototype);
TOPO.EdgeDot.prototype.constructor = TOPO.EdgeDot;