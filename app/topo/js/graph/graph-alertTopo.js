/* 
 * This is to draw a topology for vpe, vce, customer connectivity
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.AlertTopo = function(container_a, props_a) {
    var container = container_a;
    var group = container.append("g");
    
    
    var default_props = {
        jsData: {}
        
    };
    var props = props_a || default_props;
    
    var setAttrs = function() {
    };
    setAttrs();
    
    this.draw = function(props_b) {
        props = props_b || props;
        setAttrs();
        
        var jsData = props.jsData;
        if (jsData == null) return;
        
        var subG = group.append("g");
        var aicCloud = new TOPO.AicCloud(subG);
        
        /*
        var jsData = {
            vpe: {
                name: "nwrla401me6",
                vm1: "nwrla401me601fej",
                vm2: "nwrla401me601rej",
                ps: "nwrla125snd",
                hasAlert: true
            },
            vces: [
                {
                    name: "nwrla411vbc",
                    vm: "nwrla411vbc11ceb",
                    ps: "nwrla123snd",
                    hasAlert: true
                },
                {
                    name: "nwrla412vbc",
                    vm: "nwrla412vbc12ceb",
                    ps: "nwrla123snd",
                    hasAlert: true
                },
                {
                    name: "nwrla414vbc",
                    vm: "nwrla414vbc14ceb",
                    ps: "nwrla123snd",
                    hasAlert: true
                },
                {
                    name: "nwrla415vbc",
                    vm: "nwrla415vbc15ceb",
                    ps: "nwrla124snd",
                    hasAlert: true
                },
                {
                    name: "nwrla416vbc",
                    vm: "nwrla416vbc16ceb",
                    ps: "nwrla123snd",
                    hasAlert: true
                },
                {
                    name: "nwrla417vbc",
                    vm: "nwrla417vbc17ceb",
                    ps: "nwrla124snd",
                    hasAlert: true
                },
                {
                    name: "nwrla418vbc",
                    vm: "nwrla418vbc18ceb",
                    ps: "nwrla123snd",
                    hasAlert: true
                },
                {
                    name: "nwrla419vbc",
                    vm: "nwrla419vbc19ceb",
                    ps: "nwrla124snd",
                    hasAlert: true
                }
            ]
        };
        */
        
        
        var connectGroup = drawVpeVcesConnects(jsData, aicCloud);
        var box = connectGroup.node().getBBox();
        
        var padding = 20;
        var cloud_props = {
            x: box.x - padding,
            y: box.y - padding,
            width: box.width + padding * 2,
            height: box.height + padding * 2,
            aicName: jsData.aic
        };
        aicCloud.draw(cloud_props);
        
        // center the graph
        var svgWidth = container.node().getBoundingClientRect().width;
        var offsetX = (svgWidth - (box.width + padding * 2)) / 2;
        group.attr("transform", "translate(" + offsetX + ", " + 50 + ")");
        
        
        addZoomEvent([offsetX, 50]);
    };
    
   
   var drawVpeVcesConnects = function(jsData, aic) {
        var subG = group.append("g");
        var GAP_V = 200;
        var GAP_H = 200;

        var vpe = jsData.vpe;
        var vces = jsData.vces;

        // declare edges
        var edges = [];
        var edgeG = subG.append("g");
        for (var i = 0; i < vces.length; i++) {
            var edge = new TOPO.EdgeCommon(edgeG);
            edges.push(edge);
        }

        var nodeVces = [];
        var nodeG = subG.append("g");
        var vceX = 0;
        var vceY = GAP_H;
        for (var i = 0; i < vces.length; i++) {
            var vce_props = {
                x: vceX,
                y: vceY,
                tx: 0,
                ty: 0,
                vpename: vces[i].name,
                vmname: vces[i].vm,
                pname: vces[i].ps,
                hasAlert: vces[i].hasAlert
            };

            var nodeVce = new TOPO.NodeVce(nodeG, vce_props);
            nodeVce.draw();
            nodeVces.push(nodeVce);
            
            vceX += GAP_V;
        }
        
        var width = 0;
        if (vces.length > 0) {
            width = (vces.length - 1) * GAP_V + nodeVces[0].getWidth();
        }
        
        var nodeVpe = new TOPO.NodeVpe(nodeG);
        var vpe_props = {
            x: (width - nodeVpe.getWidth()) / 2,
            y: 0,
            tx: 0,
            ty: 0,
            vpename: vpe.name,
            vmname1: vpe.vm1,
            vmname2: vpe.vm2,
            pname: vpe.ps,
            hasAlert: vpe.hasAlert
        };
        nodeVpe.draw(vpe_props);
        nodeVpe.addDragEvent(subG, edges, [], aic);
        
        var vpePort = nodeVpe.getPortB();
        for (var i = 0; i < nodeVces.length; i++) {
            var vcePort = nodeVces[i].getPortT();
            
            var edge_props = {
                sx: vpePort.x,
                sy: vpePort.y,
                tx: vcePort.x,
                ty: vcePort.y,
                isVertical: true
            };
            
            edges[i].draw(edge_props);
            
            nodeVces[i].addDragEvent(subG, [], [edges[i]], aic);
        }
        
        return subG;
   };
   
   /*
    var drawVpeVcesConnects = function(jsData, aic) {
        var subG = group.append("g");
        var MAX_VCES_EACH_ROW = 4;
        var VCE_GAP_H = 200;
        var VCE_GAP_V = 200;
        
        var vpe = jsData.vpe;
        var vces = jsData.vces;
        MAX_VCES_EACH_ROW = vces.length;
        
        var edges = [];
        var edgeG = subG.append("g");
        for (var i = 0; i < vces.length; i++) {
            var edge = new TOPO.EdgeCommon(edgeG);
            edges.push(edge);
        }
        
        var sizeAttrs = {};
        var nodeG = subG.append("g");
        var nodeVpe = new TOPO.NodeVpe(nodeG);
        nodeVpe.addDragEvent(subG, edges, [], aic);
        sizeAttrs.vpeWidth = nodeVpe.getWidth();
        sizeAttrs.vpeHeight = nodeVpe.getHeight();
        
        var nodeVces = [];
        var posX = 0;
        var posY = 200;
        var width = 0;
        var height = 0;
        for (var i = 0; i < vces.length; i++) {
            var vce_props = {
                x: posX,
                y: posY,
                tx: 0,
                ty: 0,
                vpename: vces[i].name,
                vmname: vces[i].vm,
                pname: vces[i].ps,
                hasAlert: vces[i].hasAlert
            };
            
            var nodeVce = new TOPO.NodeVce(nodeG, vce_props);
            nodeVce.draw();
            nodeVces.push(nodeVce);
            
            if ((i + 1) % MAX_VCES_EACH_ROW == 0) {
                posX = 0;
                posY += VCE_GAP_V;
            } else {
                posX += VCE_GAP_H;
            }
            
            if (i == 0) {
                sizeAttrs.vceWidth = nodeVce.getWidth();
                sizeAttrs.vceHeight = nodeVce.getHeight();
            }
            //if (i < MAX_VCES_EACH_ROW) {
               // if (i == 0) {
                   // width = nodeVce.getWidth();
               // } else {
                 //   width += VCE_GAP_H;
                //}
            //}
        }
        
        var n = MAX_VCES_EACH_ROW < vces.length ? MAX_VCES_EACH_ROW : vces.length;
        width = (n - 1) * VCE_GAP_H + sizeAttrs.vceWidth;
        height = 200 + parseInt((vces.length - 1) / MAX_VCES_EACH_ROW) * VCE_GAP_V + sizeAttrs.vceHeight;
        
        var vpe_props = {
            x: (width - nodeVpe.getWidth()) / 2,
            y: 0,
            tx: 0,
            ty: 0,
            vpename: vpe.name,
            vmname1: vpe.vm1,
            vmname2: vpe.vm2,
            pname: vpe.ps,
            hasAlert: true
        };
        nodeVpe.draw(vpe_props);
        
        var vpePort = nodeVpe.getPortB();
        for (var i = 0; i < nodeVces.length; i++) {
            var vcePort = nodeVces[i].getPortT();
            
            var edge_props = {
                sx: vpePort.x,
                sy: vpePort.y,
                tx: vcePort.x,
                ty: vcePort.y,
                isVertical: true
            };
            
            edges[i].draw(edge_props);
            
            nodeVces[i].addDragEvent(subG, [], [edges[i]], aic);
        }
        
        return {
            width: width,
            height: height
        };
    };
    */
    
    var zoomed = function() {
        //console.log(d3.event.sourceEvent);
        group.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        
    };
    
    var addZoomEvent = function(currTran) {
        var zoom = d3.behavior.zoom()
                .translate(currTran)
                .scaleExtent([0.3, 5])
                .on("zoom", zoomed);
        container.call(zoom);
    };
    
    
};
