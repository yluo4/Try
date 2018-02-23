/* 
 * This is a cloud node
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.NodeCloud = function(container_a, props_a) {
    TOPO.Node.call(this, container_a);
    
    // group variable comes from parent Node class
    var group = this.getGroup();
    var default_props = {
        x: 100,
        y: 100,
        dname: "CBB"
    };
    var props = props_a || default_props;
    
    // node attributes
    var ca, dn;
    var setAttrs = function() {
        ca = {
            x: props.x,
            y: props.y
        };
        dn = {
            x: props.x,
            y: props.y + 35,
            fill: "#000000",
            size: "15px"
        };
        
    };
    setAttrs();
    
    var cloud = group.append("path");
    var dname = group.append("text");
    this.draw = function(props_b) {
        props = props_b || props;
        setAttrs();
        
        drawCloud(ca.x, ca.y);
        cloud.attr("class", "device");
        var cBox = cloud.node().getBBox();
        
        dname.attr("x", dn.x)
            .attr("y", dn.y)
            .style("fill", dn.fill)
            .style("font-size", dn.size)
            .text(props.dname);
        var tBox = dname.node().getBBox();
    
        dn.x = ca.x + (cBox.width - tBox.width) / 2;
        //dn.y = ca.y + (cBox.height - tBox.height) / 2 + tBox.height - 4;
        dname.attr("x", dn.x);
        
    };
    
    
    var covertCoordinateToStr = function(coord, s) {
        return (coord[0] * s) + "," + (coord[1] * s);
    };
    
    var drawCloud = function(x, y) {
        //var m = [394.366699, 127.3815];
        var m = [0, 0];
        var s = 0.25;
        var cs = [[[-22.941772,-4.904694], [-46.158722,0.708252], [-62.186584,12.902008]],
                  [[-8.37384,-8.030792],[-19.712555,-14.228928],[-33.312866,-17.136307]],
                  [[-35.00177,-7.482788],[-71.059845,9.127151],[-80.438599,37.053909]],
                  [[-0.689178,2.052063],[-0.870636,4.115631],[-1.240234,6.168045]],
                  [[-31.520813,-2.614288],[-61.681259,13.129868],[-70.14299,38.32637]],
                  [[-8.384399,24.965973],[7.437393,50.494476],[35.874542,60.990814]],
                  [[-1.545776,2.674438],[-2.987061,5.429688],[-3.974472,8.369537]],
                  [[-9.378616,27.926758],[11.46022,56.63443],[46.462067,64.117218]],
                  [[17.144012,3.66568],[34.469452,1.513214],[48.851593,-4.876282]],
                  [[7.926422,13.52948],[22.704803,24.41864],[42.186432,28.583282]],
                  [[27.796051,5.942566],[56.002014,-3.470947],[71.229797,-21.513611]],
                  [[6.168396,3.484131],[13.02478,6.36615],[20.748199,8.017609]],
                  [[35.001801,7.482788],[70.9823,-9.144043],[80.361084,-37.070801]],
                  [[4.716125,-14.042999],[1.797913,-28.254333],[-6.715454,-39.901459]],
                  [[8.425476,-6.410095],[15.020569,-14.529816],[18.251953,-24.151886]],
                  [[9.378723,-27.927094],[-11.460144,-56.634766],[-46.461945,-64.117569]],
                  [[-3.68457,-0.787354],[-7.375366,-1.230911],[-11.050262,-1.500015]],
                  [[2.17804,-24.524094],[-17.576782,-47.662125],[-48.442261,-54.260864]]];
        
        var cp = "";
        for (var i = 0; i < cs.length; i++) {
            var coord1 = covertCoordinateToStr(cs[i][0], s);
            var coord2 = covertCoordinateToStr(cs[i][1], s);
            var coord3 = covertCoordinateToStr(cs[i][2], s);

            cp += " c" + coord1 + " " + coord2 + " " + coord3;
        }
        cp += "z";
        
        var d = "m" + m[0] + "," + m[1] + cp;
        cloud.attr("d", d);
        var box = cloud.node().getBBox();
        
        m[0] = m[0] - box.x + x;
        m[1] = m[1] - box.y + y;
        d = "m" + m[0] + "," + m[1] + cp;
        cloud.attr("d", d);
    };
    
};

TOPO.NodeCloud.prototype = Object.create(TOPO.Node.prototype);
TOPO.NodeCloud.prototype.constructor = TOPO.NodeCloud;


