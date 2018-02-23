/* 
 * This is for Servie path topology.
 * 
 */

"use strict";

var TOPO = TOPO || {};  // namespace

TOPO.PathTopo = function(container_a, props_a) {
    var container = container_a;
    var group = container.append("g");
    
    var default_props = {
        x: 100,
        y: 500,
        jsData: {}
    };
    var props = props_a || default_props;
    
    var setAttrs = function() {
    };
    setAttrs();

    this.draw = function(props_b) {
        props = props_b || props;
        setAttrs();
        
        //var jsData = {"serviceID":"AS/VLXP/000050/SC_INTERNET","ce2Vpls":{"ntes":["ynvlla600bw"],"circuit1s":["ju101/ge1n/brsslama0cw/ynvlla600bw"],"emts":[],"emuxs":[],"circuit2s":[],"ipag1s":["brsslama0cw"],"circuit3s":["jp102/ge10/brsslama0cw/oplslatl1vw"],"ipag2s":["oplslatl1vw","lfytlavm2aw"],"circuit4s":[],"mpcios":[],"circuit5s":["jp102/ge10/lfytlavm2aw/nworlamawd3"],"vplsPes":["nwrla304vr1"]},"vpls2Crs":{"toaBean":{"links":["nwrla304vr1:xe-11/1/0|nwrlatax102:xe-1/0/83","nwrla304vr1:xe-1/1/0|nwrlatax101:xe-0/0/83"],"names":["nwrlatax102","nwrlatax101"]},"vceSvrBean":{"links":["nwrla124snd:vmnic2-2/1|nwrlatax101:xe-0/0/44","nwrla123snd:vmnic4-5/1|nwrlatax101:xe-0/0/23","nwrla123snd:vmnic3-2/2|nwrlatax102:xe-1/0/43","nwrla124snd:vmnic6-6/1|nwrlatax101:xe-0/0/24","nwrla123snd:vmnic6-6/1|nwrlatax101:xe-0/0/23","nwrla124snd:vmnic3-2/2|nwrlatax102:xe-1/0/44","nwrla123snd:vmnic0-0/1|nwrlatax101:xe-0/0/53","nwrla123snd:vmnic3-5/1|nwrlatax102:xe-1/0/43","nwrla123snd:vmnic2-2/1|nwrlatax101:xe-0/0/43","nwrla124snd:vmnic0-0/1|nwrlatax101:xe-0/0/54","nwrla123snd:vmnic7-6/2|nwrlatax102:xe-1/0/23","nwrla123snd:vmnic1-0/2|nwrlatax102:xe-1/0/53","nwrla124snd:vmnic1-0/2|nwrlatax102:xe-1/0/54","nwrla124snd:vmnic4-5/1|nwrlatax102:xe-1/0/44","nwrla124snd:vmnic4-5/1|nwrlatax101:xe-0/0/24","nwrla124snd:vmnic7-6/2|nwrlatax102:xe-1/0/24"],"names":["nwrla124snd","nwrla123snd"],"vce":"nwrla411vbc"},"vpeSvrBean":{"links":["nwrla125snd:em0-0/1|nwrlatax101:xe-0/0/55","nwrla125snd:p6p1-6/1|nwrlatax101:xe-0/0/25","nwrla125snd:p6p2-6/2|nwrlatax102:xe-1/0/25","nwrla125snd:p2p1-2/1|nwrlatax101:xe-0/0/45","nwrla125snd:em1-0/2|nwrlatax102:xe-1/0/55","nwrla125snd:p5p1-5/1|nwrlatax102:xe-1/0/45"],"names":["nwrla125snd"],"vpe":"nwrla401me6"},"crsBean":{"links":["nwrla22crs:TenGigE2/1/0/1|nwrlatax102:xe-1/0/84","nwrla21crs:TenGigE2/1/0/1|nwrlatax101:xe-0/0/84"],"names":["nwrla22crs","nwrla21crs"]},"alerts":{"dataBeans":[],"vpeAsscns":[],"vceAsscns":[]},"vpe2CrsLogicBean":{"links":["nwrla401me6:ae0.21|nwrla21crs:bundle-ether3485.4001","nwrla401me6:ae0|nwrla22crs:bundle-ether3497","nwrla401me6:ae0.22|nwrla22crs:bundle-ether3497.4002"]},"vce2VpeLogicalLinks":[{"link":"nwrla411vbc:dp0p192p1|nwrla401me6:ae0.3503.3001","hasAlert":false}],"vpe2CrsLogicalLinks":[{"link":"nwrla401me6:ae0.21|nwrla21crs:bundle-ether3485.4001","hasAlert":false},{"link":"nwrla401me6:ae0|nwrla22crs:bundle-ether3497","hasAlert":false},{"link":"nwrla401me6:ae0.22|nwrla22crs:bundle-ether3497.4002","hasAlert":false}]}};
        var jsData = {"serviceID":"AS/VLXP/000514/SW_INTERNET","ce2Vpls":{"ntes":["hktntxvg0bw"],"circuit1s":["ju101/ge1n/hktntxvg0aw/hktntxvg0bw"],"emts":["hktntxvg0aw"],"emuxs":[],"circuit2s":["ju101/ge1n/hktntxvg0aw/hstntxsa0nw","ju102/ge1n/hktntxvg0aw/hstntxsa0nw"],"ipag1s":["hstntxsa0nw"],"circuit3s":["jp101/ge10/hstntxsa0nw/hstntxun0jw"],"ipag2s":["hstntxun0jw"],"circuit4s":["jc101/ge100/hstntxcl0yw/hstntxun0jw"],"mpcios":["hstntxcl0yw"],"circuit5s":["jp104/ge10/hstntxcl0yw/hstntx01wac","jp106/ge10/hstntxcl0yw/hstntx01wac"],"vplsPes":["hs1tx303vr1"]},"vpls2Crs":{"toaBean":{"links":["hs1tx303vr1:xe-9/1/2|hustxtax102:xe-1/0/83","hs1tx303vr1:xe-1/1/2|hustxtax101:xe-0/0/83"],"names":["hustxtax102","hustxtax101"]},"vceSvrBean":{"links":["hustx123sd9:vmnic0-0/1|hustxtax101:xe-0/0/53","hustx124sd9:vmnic2-3/1|hustxtax101:xe-0/0/24","hustx123sd9:vmnic3-3/2|hustxtax102:xe-1/0/23","hustx124sd9:vmnic7-6/2|hustxtax102:xe-1/0/44","hustx123sd9:vmnic8-4/1|hustxtax101:xe-0/0/43","hustx123sd9:vmnic4-0/1|hustxtax101:xe-0/0/53","hustx123sd9:vmnic1-0/2|hustxtax102:xe-1/0/53","hustx124sd9:vmnic4-0/1|hustxtax101:xe-0/0/54","hustx123sd9:vmnic11-6/2|hustxtax102:xe-1/0/43","hustx124sd9:vmnic4-4/1|hustxtax101:xe-0/0/44","hustx124sd9:vmnic3-3/2|hustxtax102:xe-1/0/24","hustx123sd9:vmnic7-6/2|hustxtax102:xe-1/0/43","hustx123sd9:vmnic2-3/1|hustxtax101:xe-0/0/23","hustx124sd9:vmnic1-0/2|hustxtax102:xe-1/0/54","hustx123sd9:vmnic7-3/2|hustxtax102:xe-1/0/23","hustx124sd9:vmnic11-6/2|hustxtax102:xe-1/0/44","hustx124sd9:vmnic6-3/1|hustxtax101:xe-0/0/24","hustx124sd9:vmnic0-0/1|hustxtax101:xe-0/0/54","hustx123sd9:vmnic4-4/1|hustxtax101:xe-0/0/43","hustx124sd9:vmnic8-4/1|hustxtax101:xe-0/0/44","hustx123sd9:vmnic6-3/1|hustxtax101:xe-0/0/23","hustx124sd9:vmnic5-0/2|hustxtax102:xe-1/0/54","hustx123sd9:vmnic5-0/2|hustxtax102:xe-1/0/53","hustx124sd9:vmnic7-3/2|hustxtax102:xe-1/0/24"],"names":["hustx123sd9","hustx124sd9"],"vce":"hustx417vbc"},"vpeSvrBean":{"links":["hustx125sd9:em1-0/2|hustxtax102:xe-1/0/55","hustx125sd9:p6p2-6/2|hustxtax102:xe-1/0/45","hustx125sd9:p4p1-4/1|hustxtax101:xe-0/0/45","hustx125sd9:p3p1-3/1|hustxtax101:xe-0/0/25","hustx125sd9:em0-0/1|hustxtax101:xe-0/0/55","hustx125sd9:p3p2-3/2|hustxtax102:xe-1/0/25"],"names":["hustx125sd9"],"vpe":"hsttx401me6"},"crsBean":{"links":[],"names":[]},"alerts":{"dataBeans":[],"vpeAsscns":[],"vceAsscns":[]},"vpe2CrsLogicBean":{"links":[]},"vce2VpeLogicalLinks":[],"vpe2CrsLogicalLinks":[]}};
        //var jsData = props.jsData;
        
        /*
        var jsData1 = {
            devices: [
                {
                    dname: "CE",
                    psrvs: ["ynvlla600bw"]
                },
                {
                    dname: "NTE",
                    psrvs: ["ynvlla600bw"]
                },
                {
                    dname: "EMT",
                    psrvs: ["hktntxvg0aw"]
                },
                {
                    dname: "IPAG",
                    ipag1_psrvs: ["brsslama0cw"],
                    ipag2_psrvs: ["oplslatl1vw","lfytlavm2aw"]
                },
                {
                    dname: "MPCIO",
                    psrvs: ["hstntxcl0yw"]
                }
            ],
            links: [
                [],
                ["ju101/ge1n/brsslama0cw/ynvlla600bw"],
                ["ju101/ge1n/hktntxvg0aw/hstntxsa0nw","ju102/ge1n/hktntxvg0aw/hstntxsa0nw"],
                ["jp101/ge10/hstntxsa0nw/hstntxun0jw"]
            ]
        };
        */
       var jsData1 = prepareData(jsData.ce2Vpls);
        
        // edges initializing
        var edgesArr = [];
        for (var i = 0; i < jsData1.links.length; i++) {
            edgesArr.push(new TOPO.EdgeCommon(group));
        }
        
        var edges = {};
        /*
        edges.ce_nte = new TOPO.EdgeCommon(group);
        edges.nte_ipag = new TOPO.EdgeCommon(group);
        */
        edges.ipag_vpls = new TOPO.EdgeCommon(group);
        edges.vpls_vce = new TOPO.EdgeDot(group);
        edges.vpls_toa = new TOPO.EdgeCommon(group);
        edges.vce_vpe = new TOPO.EdgeDot(group);
        edges.toa_vce = new TOPO.EdgeCommon(group);
        edges.vce_toa = new TOPO.EdgeCommon(group);
        edges.vpe_cbb = new TOPO.EdgeDot(group);
        edges.toa_vpe = new TOPO.EdgeCommon(group);
        edges.vpe_toa = new TOPO.EdgeCommon(group);
        edges.toa_cbb = new TOPO.EdgeCommon(group);
        
        var portR = drawCe2Vpls(jsData1, edgesArr);
        
        /*
        var portL, portR, p, ep;
        
        p = {
            x: props.x,
            y: props.y,
            dname: "CE",
            psrvs: ["ynvlla600bw"]
        };
        var ce = new TOPO.NodeRect(group, p);
        ce.draw();
        portR = ce.getPortR();
        
        p = {
            x: portR.x + 60,
            py: portR.y,
            dname: "NTE",
            psrvs: ["ynvlla600bw"]
        };
        var nte = new TOPO.NodeRect(group, p);
        nte.draw();
        portL = nte.getPortL();
        
        ep = {
            sx: portR.x,
            sy: portR.y,
            tx: portL.x,
            ty: portL.y,
            isVertical: false
        };
        edges.ce_nte.draw(ep);
        
        portR = nte.getPortR();
        
        p = {
            x: portR.x + 60,
            py: portR.y,
            ipag1_psrvs: ["brsslama0cw"],
            ipag2_psrvs: ["oplslatl1vw","lfytlavm2aw"]
        };
        var ipag = new TOPO.NodeIpag(group, p);
        ipag.draw();
        portL = ipag.getPortL();
        
        ep = {
            sx: portR.x,
            sy: portR.y,
            tx: portL.x,
            ty: portL.y,
            isVertical: false
        };
        edges.nte_ipag.draw(ep);
        edges.nte_ipag.addTooltip(["ju101/ge1n/brsslama0cw/ynvlla600bw"]);
        
        portR = ipag.getPortR();
        */
       
        var jsData2 = {
            toVplsLinks: jsData.ce2Vpls.circuit5s,
            vplsPes: jsData.ce2Vpls.vplsPes,
            vpls2CrsData: jsData.vpls2Crs
        };
        drawVpls2Cbb(portR, edges, jsData2);
        
        
        addZoomEvent([0, 0]);
    };
    
    var prepareData = function(ce2VplsData) {
        var data = {
            devices: [],
            links:[]
        };
        
        data.devices.push({
            dname: "CE",
            psrvs: ["ynvlla600bw"]
        });
        data.links.push([]);
        
        if (ce2VplsData.ntes.length != 0) {
            data.devices.push({
                dname: "NTE",
                psrvs: ce2VplsData.ntes
            });
            data.links.push(ce2VplsData.circuit1s);
        }
        
        if (ce2VplsData.emts.length != 0 || ce2VplsData.emuxs.length != 0) {
            if (ce2VplsData.emts.length != 0) {
                data.devices.push({
                    dname: "EMT",
                    psrvs: ce2VplsData.emts
                });
            }
            if (ce2VplsData.emuxs.length != 0) {
                data.devices.push({
                    dname: "EMUX",
                    psrvs: ce2VplsData.emuxs
                });
            }
            
            data.links.push(ce2VplsData.circuit2s);
        }
        
        data.devices.push({
            dname: "IPAG",
            ipag1_psrvs: ce2VplsData.ipag1s,
            ipag2_psrvs: ce2VplsData.ipag2s
        });
        
        if (ce2VplsData.mpcios.length != 0) {
            data.links.push(ce2VplsData.circuit4s);
            
            data.devices.push({
                dname: "MPCIO",
                psrvs: ce2VplsData.mpcios
            });
        }
        
        return data;
    };
    
    var drawCe2Vpls = function(jsData, edgesArr) {
        var devices = jsData.devices;
        var links = jsData.links;
        
        // 
        var p = {
            x: props.x,
            y: props.y,
            dname: devices[0].dname,
            psrvs: devices[0].psrvs
        };
        var device = new TOPO.NodeRect(group, p);
        device.draw();
        var portR = device.getPortR();
        
        var ep, portL;
        for (var i = 1; i < devices.length; i++) {
            var dname = devices[i].dname;
            if (dname != "IPAG") {
                p = {
                    x: portR.x + 60,
                    py: portR.y,
                    dname: dname,
                    psrvs: devices[i].psrvs
                };
                
                device = new TOPO.NodeRect(group, p);
                device.draw();
                
                portL = device.getPortL();
                ep = {
                    sx: portR.x,
                    sy: portR.y,
                    tx: portL.x,
                    ty: portL.y,
                    isVertical: false
                };
                edgesArr[i - 1].draw(ep);
                edgesArr[i - 1].addTooltip(links[i - 1]);
                portR = device.getPortR();
            } else {
                p = {
                    x: portR.x + 60,
                    py: portR.y,
                    ipag1_psrvs: devices[i].ipag1_psrvs,
                    ipag2_psrvs: devices[i].ipag2_psrvs
                };
                device = new TOPO.NodeIpag(group, p);
                device.draw();
                
                portL = device.getPortL();
                ep = {
                    sx: portR.x,
                    sy: portR.y,
                    tx: portL.x,
                    ty: portL.y,
                    isVertical: false
                };
                edgesArr[i - 1].draw(ep);
                edgesArr[i - 1].addTooltip(links[i - 1]);
                portR = device.getPortR();
            }
        }
        
        return portR;
    };
    
    var drawVpls2Cbb = function(port, edges, data) {   // port is the right port of previous device
        var jsData = data.vpls2CrsData;
        var vplsPes = data.vplsPes;
        var toVplsLinks = data.toVplsLinks;
        
        var p, ep;  // p is device props and ep is edge props
        // vpls
        p = {
            x: port.x + 60,
            py: port.y,
            dname: "VPLS/PE",
            psrvs: vplsPes
        };
        var vpls = new TOPO.NodeSquare(group, p);
        vpls.draw();
        vpls.addArrow();
        var vpls_portL = vpls.getPortL();
        
        ep = {
            sx: port.x,
            sy: port.y,
            tx: vpls_portL.x,
            ty: vpls_portL.y,
            isVertical: false
        };
        edges.ipag_vpls.draw(ep);
        edges.ipag_vpls.addTooltip(toVplsLinks);
        var vpls_portR = vpls.getPortR();
        // End vpls
        
        // vce
        var vce_psrvs = jsData.vceSvrBean.names;
        var vce_name = jsData.vceSvrBean.vce;
        p = {
            x: vpls_portR.x + 70,
            hasAlert: true,
            py: vpls_portR.y,
            psrvs: vce_psrvs,
            vce: vce_name
        };
        var vce = new TOPO.NodeVce2(group, p);
        vce.draw();
        vce.addArrow();
        var vce_portL = vce.getPortL();
        
        ep = {
            sx: vpls_portR.x,
            sy: vpls_portR.y,
            tx: vce_portL.x,
            ty: vce_portL.y,
            isVertical: false
        };
        edges.vpls_vce.draw(ep);
        var vce_portR = vce.getPortR();
        // end vce
        
        // vpe
        var vpe_psrvs = jsData.vpeSvrBean.names;
        var vpe_name = jsData.vpeSvrBean.vpe;
        p = {
            x: vce_portR.x + 80,
            hasAlert: true,
            py: vce_portR.y,
            psrvs: vpe_psrvs,
            vpe: vpe_name
        };
        var vpe = new TOPO.NodeVpe2(group, p);
        vpe.draw();
        vpe.addArrow();
        var vpe_portL = vpe.getPortL();
        
        ep = {
            sx: vce_portR.x,
            sy: vce_portR.y,
            tx: vpe_portL.x,
            ty: vpe_portL.y,
            isVertical: false
        };
        edges.vce_vpe.draw(ep);
        var vce_vpe_logicLinks = [];
        for (var i = 0; i < jsData.vce2VpeLogicalLinks.length; i++) {
            vce_vpe_logicLinks.push(jsData.vce2VpeLogicalLinks[i].link);
        }
        edges.vce_vpe.addTooltip(vce_vpe_logicLinks);
        var vpe_portR = vpe.getPortR();
        // end vpe
        
        // cbb
        var crs_psrvs = jsData.crsBean.names;
        p = {
            x: vpe_portR.x + 100,
            py: vpe_portR.y,
            psrvs: crs_psrvs
        };
        var cbb = new TOPO.NodeCbb(group, p);
        cbb.draw();
        cbb.addArrow();
        var cbb_portL = cbb.getPortL();
        
        ep = {
            sx: vpe_portR.x,
            sy: vpe_portR.y,
            tx: cbb_portL.x,
            ty: cbb_portL.y,
            isVertical: false 
        };
        edges.vpe_cbb.draw(ep);
        var vpe_cbb_logicLinks = [];
        for (var i = 0; i < jsData.vpe2CrsLogicalLinks.length; i++) {
            vpe_cbb_logicLinks.push(jsData.vpe2CrsLogicalLinks[i].link);
        }
        edges.vpe_cbb.addTooltip(vpe_cbb_logicLinks);
        // end cbb
        
        // toa
        var toa_names = jsData.toaBean.names;
        p = {
            x: vpls_portR.x + 10,
            y: vpls_portR.y - 155,
            names: toa_names
        };
        var toa = new TOPO.NodeToa(group, p);
        toa.draw();
        
        var toa_portL = toa.getPortL();
        var vpls_portT = vpls.getPortT();
        ep = {
            sx: vpls_portT.x,
            sy: vpls_portT.y,
            tx: toa_portL.x,
            ty: toa_portL.y,
            isTopLeft: true
        };
        edges.vpls_toa.draw(ep);
        edges.vpls_toa.addTooltip(jsData.toaBean.links);
        
        var vce_port1T = vce.getPort1T();
        var vce_port2T = vce.getPort2T();
        var vpe_port1T = vpe.getPort1T();
        var vpe_port2T = vpe.getPort2T();
        var ports = {
            vcePort1: vce_port1T,
            vcePort2: vce_port2T,
            vpePort1: vpe_port1T,
            vpePort2: vpe_port2T
        };
        toa.setPorts(ports);
        var toa_port1B = toa.getPort1B();
        var toa_port2B = toa.getPort2B();
        var toa_port3B = toa.getPort3B();
        var toa_port4B = toa.getPort4B();
        ep = {
            sx: toa_port1B.x,
            sy: toa_port1B.y,
            tx: vce_port1T.x,
            ty: vce_port1T.y,
            isVertical: true
        };
        edges.toa_vce.draw(ep);
        edges.toa_vce.addTooltip(jsData.vceSvrBean.links);
        ep = {
            sx: toa_port2B.x,
            sy: toa_port2B.y,
            tx: vce_port2T.x,
            ty: vce_port2T.y,
            isVertical: true
        };
        edges.vce_toa.draw(ep);
        edges.vce_toa.addTooltip(jsData.vceSvrBean.links);
        ep = {
            sx: toa_port3B.x,
            sy: toa_port3B.y,
            tx: vpe_port1T.x,
            ty: vpe_port1T.y,
            isVertical: true
        };
        edges.toa_vpe.draw(ep);
        edges.toa_vpe.addTooltip(jsData.vpeSvrBean.links);
        ep = {
            sx: toa_port4B.x,
            sy: toa_port4B.y,
            tx: vpe_port2T.x,
            ty: vpe_port2T.y,
            isVertical: true
        };
        edges.vpe_toa.draw(ep);
        edges.vpe_toa.addTooltip(jsData.vpeSvrBean.links);
        
        var toa_portR = toa.getPortR();
        var cbb_portT = cbb.getPortT();
        ep = {
            sx: cbb_portT.x,
            sy: cbb_portT.y,
            tx: toa_portR.x,
            ty: toa_portR.y,
            isTopLeft: false
        };
        edges.toa_cbb.draw(ep);
        edges.toa_cbb.addTooltip(jsData.crsBean.links);
        
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