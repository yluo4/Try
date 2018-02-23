/* 
 * This is a common edge to connect two devices
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.EdgeCommon = function(container_a, props_a) {
    TOPO.Edge.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    
    var default_props = {
        sx: 0,
        sy: 0,
        tx: 10,
        ty: 10,
        isVertical: true,
        isTopLeft: true
    };
    var props = props_a || default_props;
    
    var thisEdge = this;
    
    var pa; // path attributes
    var calDAttr;
    
    var setAttrs = function() {
        pa = {   // path attribute
            sx: props.sx,
            sy: props.sy,
            tx: props.tx,
            ty: props.ty,
            stroke: "#067ab4" ,
            stroke_width: "2px",
            fill: "none"
        };
        
        if (props.isVertical != null) {
            calDAttr = props.isVertical ? thisEdge.calDAttrV : thisEdge.calDAttrH;
        } else {
            calDAttr = props.isTopLeft ? calDAttrVTopLeft: calDAttrVTopRight;
        }
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
    
    var calDAttrVTopLeft = function(sx, sy, tx, ty) {
        var c1x, c1y, c2x, c2y;
        
        c1y = sy;
        c1x = sx + 2;
        c2y = ty;
        c2x = sx - 10;
        
        var d = [
            "M",
            sx, sy,
            "C",
            c1x, c1y,
            c2x, c2y,
            tx, ty
        ];
        
        return d.join(" ");
    };
    
    var calDAttrVTopRight = function(sx, sy, tx, ty) {
        var c1x, c1y, c2x, c2y;
        
        c1y = sy;
        c1x = sx - 2;
        c2y = ty;
        c2x = sx + 10;
        
        var d = [
            "M",
            sx, sy,
            "C",
            c1x, c1y,
            c2x, c2y,
            tx, ty
        ];
        
        return d.join(" ");
    };
    
};

TOPO.EdgeCommon.prototype = Object.create(TOPO.Edge.prototype);
TOPO.EdgeCommon.prototype.constructor = TOPO.EdgeCommon;

