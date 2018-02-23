/* 
 * This is for service path ipag device
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeIpag = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var default_props = {
        x: 100,
        y: 100,
        ipag1_psrvs: [],
        ipag2_psrvs: []
    };
    var props = props_a || default_props;
    
    // node attrbutes
    var ig, ig1, ig2;
    var setAttrs = function() {
        ig1 = {
            x: props.x,
            y: props.y + 20,
            dname: "IPAG1"
        };
        
        ig = {
            x: props.x + 56,
            y: props.y,
            dname: "IPAG"
        };
        
        ig2 = {
            x: props.x + 140,
            y: props.y + 20,
            dname: "IPAG2"
        };
    };
    setAttrs();
    
    var ipag = new TOPO.NodeCloud(group);
    var ipag1 = new TOPO.NodeRect(group);
    var ipag2 = new TOPO.NodeRect(group);
    this.draw = function(props_b) {
        props = props_b || props;
        processProps();
        setAttrs();
        
        ig1.psrvs = props.ipag1_psrvs || [];
        ipag1.draw(ig1);
        ig2.psrvs = props.ipag2_psrvs || [];
        ipag2.draw(ig2);
        ipag.draw(ig);
    };
    
    var processProps = function() {
        if (props.py != null) {
            var y = props.py - ipag1.getHeight() / 2 - 20;
            props.y = y;
        }
    };
    
    this.getPortL = function() {
        return ipag1.getPortL();
    };
    
    this.getPortR = function() {
        return ipag2.getPortR();
    };
};

TOPO.NodeIpag.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeIpag.prototype.constructor = TOPO.NodeIpag;
