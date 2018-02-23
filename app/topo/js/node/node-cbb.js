/* 
 * This is for service path CBB device
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeCbb = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var default_props = {
        x: 100,
        y: 100,
        psrvs: []
    };
    var props = props_a || default_props;

    // node attrbutes
    var cbba, crsa;
    var setAttrs = function() {
        cbba = {
            x: props.x + 48,
            y: props.y,
            dname: "CBB"
        };
        
        crsa = {
            x: props.x,
            y: props.y + 30,
            dname: "CRS"
        };
    };
    setAttrs();
    
    var cbb = new TOPO.NodeCloud(group);
    var crs = new TOPO.NodeRect(group);
    this.draw = function(props_b) {
        props = props_b || props;
        processProps();
        setAttrs();
        
        cbb.draw(cbba);
        
        crsa.psrvs = props.psrvs || [];
        crs.draw(crsa);
    };
    
    var processProps = function() {
        if (props.py != null) {
            var y = props.py - crs.getHeight() / 2 - 30;
            props.y = y;
        }
    };
    
    this.getPortL = function() {
        return crs.getPortL();
    };
    
    this.getPortT = function() {
        return crs.getPortT();
    };
    
    this.addArrow = function() {
        crs.addArrow();
    };
};

TOPO.NodeCbb.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeCbb.prototype.constructor = TOPO.NodeCbb;