/* 
 * This is an abstract which is used as the common node where other specific 
 * nodes inherited from.
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.Node = function(container_a) {
    var container = container_a;
    var group = container.append("g");
    
    this.draw = function() {};  // should be overrided by subclass
    
    this.getGroup = function() {
        return group;
    };
};


