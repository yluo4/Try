/* 
 * This is an abstract which is used as the common edge where other specific 
 * edges inherited from.
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.Edge = function(container_a) {
    var container = container_a;
    var group = container.append("g");
    
    this.draw = function() {};  // should be overrided by subclass
    
    this.calDAttrV = function(sx, sy, tx, ty) {   // vertical wise
        var c1x, c1y, c2x, c2y;
        
        var nodeSize = 120;
        if (ty - 5 < sy) {
            var curveFactor = (sy - ty) * nodeSize / 200;
            if (Math.abs(tx - sx) < nodeSize / 2) {
                c1y = sy + curveFactor;
                c1x = sx - curveFactor;
                c2y = ty - curveFactor;
                c2x = tx - curveFactor;
            } else {
                c1y = sy + curveFactor;
                c1x = sx + (tx > sx ? curveFactor : -curveFactor);
                c2y = ty - curveFactor;
                c2x = tx + (tx > sx ? -curveFactor : curveFactor);
            }
        } else {
            c1y = sy + (ty - sy)/2;
            c1x = sx;
            c2y = c1y;
            c2x = tx;
        }
        
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
    
    this.calDAttrH = function(sx, sy, tx, ty) {    // horizontal wise
        var c1x, c1y, c2x, c2y;
        
        var nodeSize = 120;
        if (tx - 5 < sx) {
            var curveFactor = (sx - tx) * nodeSize / 200;
            if (Math.abs(ty - sy) < nodeSize / 2) {
                c1x = sx + curveFactor;
                c1y = sy - curveFactor;
                c2x = tx - curveFactor;
                c2y = ty - curveFactor;
            } else {
                c1x = sx + curveFactor;
                c1y = sy + (ty > sy ? curveFactor : -curveFactor);
                c2x = tx - curveFactor;
                c2y = ty + (ty > sy ? -curveFactor : curveFactor);
            }
        } else {
            c1x = sx + (tx - sx)/2;
            c1y = sy;
            c2x = c1x;
            c2y = ty;
        }
        
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
    
    this.addTooltip = function(links) {
        if (links == null) return;
        if (links.length == 0) return;
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        group.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        group.on("mouseout", function() {
            tip.remove();
        });
    };
    
    this.getGroup = function() {
        return group;
    };
};


