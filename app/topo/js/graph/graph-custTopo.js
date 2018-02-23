/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.CustTopo = function(container_a, props_a) {
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
        
        /*
        var jsData = {
            cust: "QQQQQQQQ",
            aics: [
                {
                    aic: "hustx-esx-az01",
                    connections: [
                        {
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
                                }
                            ]
                        },
                        {
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
                                }
                            ]
                        }
                    ]
                },
                {
                    aic: "hustx-esx-az01",
                    connections: [
                        {
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
                                }
                            ]
                        }
                    ]
                },
                {
                    aic: "hustx-esx-az01",
                    connections: [
                        {
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
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        */
        
        drawAic(jsData.aics);
        
        addZoomEvent([0, 0]);
    };
    
    
    var drawVpeVcesConnects = function(conntProps) {
        var subG = conntProps.conntsG.append("g");
        var GAP_V = 200;
        var GAP_H = 200;
        
        var jsData = conntProps.jsData;
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
        var vceX = conntProps.x;
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
            x: conntProps.x + (width - nodeVpe.getWidth()) / 2,
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
        nodeVpe.addDragEvent(conntProps.conntsG, edges, [], conntProps.aic);
        
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
            
            nodeVces[i].addDragEvent(conntProps.conntsG, [], [edges[i]], conntProps.aic);
        }
        
        return subG;
    };
    
    var drawAic = function(jsData) {
        var subG = group.append("g");
        var CONNT_GAP_V = 50;
        
        var aicTranX = 20;
        for (var i = 0; i < jsData.length; i++) {
            var aicG = subG.append("g");
            var conntsG = aicG.append("g");
            
            var aicCloud = new TOPO.AicCloud(aicG);
            var conntX = 0;
            for (var j = 0; j < jsData[i].connections.length; j++) {
                var conntProps = {
                    jsData: jsData[i].connections[j],
                    aic: aicCloud,
                    x: conntX,
                    conntsG: conntsG
                };
                
                var conntG = drawVpeVcesConnects(conntProps);
                var box = conntG.node().getBBox();
                
                conntX += box.width + CONNT_GAP_V;
            }
           var conntsBox = conntsG.node().getBBox();
            
            var padding = 10;
            var cloud_props = {
                x: 0 - padding,
                y: 0 - padding,
                width: conntsBox.width + padding * 2,
                height: conntsBox.height + padding * 2,
                aicName: jsData[i].aic
            };
            aicCloud.draw(cloud_props);
            
            aicG.attr("transform", "translate(" + aicTranX + ", " + 50 + ")");
            var aicBox = aicG.node().getBBox();
            aicTranX += aicBox.width + padding;
        }
        
        return subG;
    };
    
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


