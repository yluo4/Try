/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Topology
var Group = function(container) {
    var g = container.append("g");

    this.getG = function() {
        return g;
    };

    this.addRectangle = function(x, y, rx, ry, width, height) {
        var rect = g.append("rect")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("rx", rx)
                    .attr("ry", ry)
                    .attr("width", width)
                    .attr("height", height);

        return rect;
    };

    this.addCloud = function(s) {
        var m = [394.366699, 127.3815];
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

        var cloudPath = "m" + (m[0] * s) + "," + (m[1] * s);
        for (var i = 0; i < cs.length; i++) {
            var coord1 = covertCoordinateToStr(cs[i][0], s);
            var coord2 = covertCoordinateToStr(cs[i][1], s);
            var coord3 = covertCoordinateToStr(cs[i][2], s);

            cloudPath += " c" + coord1 + " " + coord2 + " " + coord3;
        }
        cloudPath += "z";

        var cloud = g.append("path")
                     .attr("d", cloudPath);

        return cloud;
    };
    
    this.addRectCloud = function(length, width, s) {
        var m = [50,50];
        var cs = [
                  [[0,-10], [5,-12], [13,-14]],
                  [[0,-15], [25,-15], [30,-10]],
                  [[10,-10], [30,-10], [40,0]],
                  [[15,-10], [30,-5], [40,2]],
                  [[8,-5], [25,-5], [30,5]],
                  [[5,-10], [25,-10], [30,-5]],
                  [[14,-12], [42,-10], [45,8]],
                  [[8,2], [13,2], [13,14]]
                 ];
        var default_width = 241;  
        var ratio = (width * s) / default_width;
        for (var i = 0; i < cs.length; i++) {
            cs[i][0][0] *= ratio;
            cs[i][1][0] *= ratio;
            cs[i][2][0] *= ratio;
        }

        var cloudPath = "m" + (m[0] * s) + "," + (m[1] * s);
        for (var i = 0; i < cs.length; i++) {
            var coord1 = covertCoordinateToStr(cs[i][0], s);
            var coord2 = covertCoordinateToStr(cs[i][1], s);
            var coord3 = covertCoordinateToStr(cs[i][2], s);

            cloudPath += " c" + coord1 + " " + coord2 + " " + coord3;
        }

        var lineLen = length * s;
        cloudPath += " l0," + lineLen;

        for (var i = 0; i < cs.length; i++) {
            var coord1 = covertCoordinateToStr(cs[i][0], -s);
            var coord2 = covertCoordinateToStr(cs[i][1], -s);
            var coord3 = covertCoordinateToStr(cs[i][2], -s);

            cloudPath += " c" + coord1 + " " + coord2 + " " + coord3;
        }

        cloudPath += " l0," + (-lineLen);

        var cloud = g.append("path")
                    .attr("d", cloudPath)
                    .style("fill", "none")
                    .style("stroke", "#daeafd")
                    .style("stroke-width", "3px");

        return cloud;
    };

    var covertCoordinateToStr = function(coord, s) {
        return (coord[0] * s) + "," + (coord[1] * s);
    };


    this.addCircle = function(cx, cy, r) {
        var circle = g.append("circle")
                      .attr("cx", cx)
                      .attr("cy", cy)
                      .attr("r", r);

        return circle;
    };


    this.addText = function(x, y, fill, size, t) {
        var text = g.append("text")
                    .attr("x", x)
                    .attr("y", y)
                    .style("fill", fill)
                    .style("font-size", size)
                    .text(t);

        return text;
    };

    this.addImage = function(x, y, width, height, src) {
        var image = g.append("image")
                     .attr("x", x)
                     .attr("y", y)
                     .attr("width", width)
                     .attr("height", height)
                     .attr("xlink:href", src);

        return image;
    };

    this.addLine = function(x1, y1, x2, y2, stroke, stroke_width) {
        var line = g.append("line")
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", x2)
                    .attr("y2", y2)
                    .style("stroke", stroke)
                    .style("stroke-width", stroke_width);

        return line;
    };


    this.addPath = function(d, fill) {
        var path = g.append("path")
                    .attr("d", d)
                    .style("fill", fill);

        return path;
    };

    this.addArrowHeadDown = function(startPoint, fill, s) {
        var d = "M" + startPoint[0] + "," + startPoint[1];
        d += " l" + (5 * s) + "," + (0 * s);
        d += " l" + (-5 * s) + "," + (6 * s);
        d += " l" + (-5 * s) + "," + (-6 * s);
        d += " l" + (5 * s) + "," + (0 * s);

        var path = this.addPath(d, fill);
        return path;
    };

    this.addArrowHeadUp = function(startPoint, fill, s) {
        var d = "M" + startPoint[0] + "," + startPoint[1];
        d += " l" + (5 * s) + "," + (0 * s);
        d += " l" + (-5 * s) + "," + (-6 * s);
        d += " l" + (-5 * s) + "," + (6 * s);
        d += " l" + (5 * s) + "," + (0 * s);

        var path = this.addPath(d, fill);
        return path;
    };

    this.addArrowHeadLeft = function(startPoint, fill, s) {
        var d = "M" + startPoint[0] + "," + startPoint[1];
        d += " l" + (0 * s) + "," + (-5 * s);
        d += " l" + (-6 * s) + "," + (5 * s);
        d += " l" + (6 * s) + "," + (5 * s);
        d += " l" + (0 * s) + "," + (-5 * s);

        var path = this.addPath(d, fill);
        return path;
    };

    this.addArrowHeadRight = function(startPoint, fill, s) {
        var d = "M" + startPoint[0] + "," + startPoint[1];
        d += " l" + (0 * s) + "," + (-5 * s);
        d += " l" + (6 * s) + "," + (5 * s);
        d += " l" + (-6 * s) + "," + (5 * s);
        d += " l" + (0 * s) + "," + (-5 * s);

        var path = this.addPath(d, fill);
        return path;
    };


    this.addTransform = function(t) {
        g.attr("transform", t);
    };
};


// VPE
var VPE = function(container, s, vpeName, hasAlert, vpeAlerts, vpeAsscn, tablePrams) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 130 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 120 * s,
        height: 125 * s
    };
    var innerRectAttrs1 = {
        x: 56 * s,
        y: 137 * s,
        rx: 6 * s,
        ry: 6 * s,
        width: 108 * s,
        height: 98 * s
    };
    var innerRectAttrs2 = {
        x: 63 * s,
        y: 144 * s,
        rx: 7 * s,
        ry: 7 * s,
        width: 94 * s,
        height: 58 * s
    };
    var textAttrs = {
        x: 99 * s,
        y: 162 * s,
        fill: "#2196f3",
        size: 12 * s
    };
    var imagAttrs = {
        x: 95 * s,
        y: 160 * s,
        width: 30 * s,
        height: 30 * s,
        src: "app/images/router.png"
    };
    var vpeNameAttrs = {
        x: 79 * s,
        y: 196 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    var vmNameAttrs1 = {
        x: 66 * s,
        y: 216 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    var vmNameAttrs2 = {
        x: 66 * s,
        y: 228 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    var pserverAttrs = {
        x: 79 * s,
        y: 248 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    
    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        
        var innerRect1 = group.addRectangle(innerRectAttrs1.x, innerRectAttrs1.y, innerRectAttrs1.rx, innerRectAttrs1.ry, innerRectAttrs1.width, innerRectAttrs1.height);
        
        var innerRect2 = group.addRectangle(innerRectAttrs2.x, innerRectAttrs2.y, innerRectAttrs2.rx, innerRectAttrs2.ry, innerRectAttrs2.width, innerRectAttrs2.height);
        
        if (hasAlert) {
            rect.attr("class", "alert-device");
            innerRect1.attr("class", "alert-inner-device");
            innerRect2.attr("class", "alert-inner-device");
        } else {
            rect.attr("class", "device");
            innerRect1.attr("class", "inner-device");
            innerRect2.attr("class", "inner-device");
        }

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vPE");

        var imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);

        var vpeNameText = group.addText(vpeNameAttrs.x, vpeNameAttrs.y, vpeNameAttrs.fill, vpeNameAttrs.size, vpeName);
        
        var vmNameText1 = group.addText(vmNameAttrs1.x, vmNameAttrs1.y, vmNameAttrs1.fill, vmNameAttrs1.size, vpeAsscn.vpe_vm_fej);
        
        var vmNameText2 = group.addText(vmNameAttrs2.x, vmNameAttrs2.y, vmNameAttrs2.fill, vmNameAttrs2.size, vpeAsscn.vpe_vm_rej);
        
        var pserverText = group.addText(pserverAttrs.x, pserverAttrs.y, pserverAttrs.fill, pserverAttrs.size, vpeAsscn.vpe_hostname);

        if (hasAlert) {
            addEvent();
        }
    };
    
    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    var addEvent = function() {
        var g = group.getG();

        g.style("cursor", "pointer");	
        g.on("click", function() {
            tablePrams.settings({
                dataset: vpeAlerts
            });
            tablePrams.reload();
            $(".modal-table").show();
        });
    };
};


// VCE
var VCE = function(container, s, vceName, hasAlert, vceAlerts, vceAsscn, tableParams) {
    var group = new Group(container);
    
    var rectAttrs = {
        x: 50 * s,
        y: 130 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 120 * s,
        height: 113 * s
    };
    var innerRectAttrs1 = {
        x: 56 * s,
        y: 137 * s,
        rx: 6 * s,
        ry: 6 * s,
        width: 108 * s,
        height: 86 * s
    };
    var innerRectAttrs2 = {
        x: 63 * s,
        y: 144 * s,
        rx: 7 * s,
        ry: 7 * s,
        width: 94 * s,
        height: 58 * s
    };
    var textAttrs = {
        x: 99 * s,
        y: 162 * s,
        fill: "#2196f3",
        size: 12 * s
    };
    var imagAttrs = {
        x: 95 * s,
        y: 160 * s,
        width: 30 * s,
        height: 30 * s,
        src: "app/images/memory.png"
    };
    var vceNameAttrs = {
        x: 79 * s,
        y: 196 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    var vmNameAttrs = {
        x: 64 * s,
        y: 216 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    var pserverAttrs = {
        x: 79 * s,
        y: 236 * s,
        fill: "#2196f3",
        size: 11 * s
    };
    
    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        
        var innerRect1 = group.addRectangle(innerRectAttrs1.x, innerRectAttrs1.y, innerRectAttrs1.rx, innerRectAttrs1.ry, innerRectAttrs1.width, innerRectAttrs1.height);
        
        var innerRect2 = group.addRectangle(innerRectAttrs2.x, innerRectAttrs2.y, innerRectAttrs2.rx, innerRectAttrs2.ry, innerRectAttrs2.width, innerRectAttrs2.height);
        
        if (hasAlert) {
            rect.attr("class", "alert-device");
            innerRect1.attr("class", "alert-inner-device");
            innerRect2.attr("class", "alert-inner-device");
        } else {
            rect.attr("class", "device");
            innerRect1.attr("class", "inner-device");
            innerRect2.attr("class", "inner-device");
        }

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vCE");

        var imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);

        var vceNameText = group.addText(vceNameAttrs.x, vceNameAttrs.y, vceNameAttrs.fill, vceNameAttrs.size, vceName);
        
        var vce_vm = vceAsscn == null ? "" : vceAsscn.vce_vm;
        var vmNameText = group.addText(vmNameAttrs.x, vmNameAttrs.y, vmNameAttrs.fill, vmNameAttrs.size, vce_vm);
        
        var vce_hostname = vceAsscn == null ? "" : vceAsscn.vce_hostname;
        var pserverText = group.addText(pserverAttrs.x, pserverAttrs.y, pserverAttrs.fill, pserverAttrs.size, vce_hostname);

        if (hasAlert) {
            addEvent();
        }
    };
    
    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    var addEvent = function() {
        var g = group.getG();

        g.style("cursor", "pointer");
        g.on("click", function() {
            tableParams.settings({
                dataset: vceAlerts
            });
            tableParams.reload();
            $(".modal-table").show();
        });
    };
};


// Customer
var Cust = function(container, s, custName, hasAlert, custInfoTopo) {
    var group = new Group(container);

    var custNameAttrs = {
        x: 50 * s,
        y: 130 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    var rectAttrs = {
        x: 50 * s,
        y: 112 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 75 * s,
        height: 30 * s
    };

    this.draw = function() {
        var custName_short = custName.split("_")[0];
        var custNameText = group.addText(custNameAttrs.x, custNameAttrs.y, custNameAttrs.fill, custNameAttrs.size, custName_short);
        var size = custNameText.node().getBBox().width;  // getBBox will only work when element is visible
        var x = 50 * s + (120 *s - size) / 2;
        custNameText.attr("x", x);

        rectAttrs.width = size + 15 * s;
        rectAttrs.x = x - 7.5 * s;
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.style("fill-opacity", 0);
        rect.style("stroke-width", 2);
        if (hasAlert) {
            rect.style("stroke", "#ff0000");
        } else {
            rect.style("stroke", "#008000");
        }
        
        addEvent();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    var addEvent = function() {
        var g = group.getG();

        g.style("cursor", "pointer");
        g.on("click", function() {
            custInfoTopo.drawTopology(custName);
        });
    };
};


// link
var Link = function(container, s, lineAttrs) {
    var group = new Group(container);
    var color = "#067ab4";

    this.draw = function() {
        lineAttrs.stroke_width = 2 * s;
        var line = group.addLine(lineAttrs.x1, lineAttrs.y1, lineAttrs.x2, lineAttrs.y2, color, lineAttrs.stroke_width);
    };

    this.addTransform = function(t) {
            group.addTransform(t);
    };
};

// AIC Cloud
var AIC_Cloud = function(container, s, aicName) {
    var group = new Group(container);
    var aicNameAttrs = {
        x: 60 * s,
        y: 60 * s,
        fill: "#2196f3",
        size: 18 * s
    };
    
    this.draw = function(length, width) {
        group.addRectCloud(length, width, s);
        
        var aicNameText = group.addText(aicNameAttrs.x, aicNameAttrs.y, aicNameAttrs.fill, aicNameAttrs.size, aicName);
        var size = aicNameText.node().getBBox().width;  // getBBox will only work when element is visible
        //var x = 50 * s + (width *s - size) / 2;
        //aicNameText.attr("x", x);
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};

// City
var City = function(container, s, name, jointX, jointY, hasAlert) {
    var group = new Group(container);
    
    var nameAttrs = {
        x: 50 * s,
        y: 130 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    var rectAttrs = {
        x: 50 * s,
        y: 112 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 75 * s,
        height: 30 * s
    };

    this.draw = function() {
        var nameText = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, name);
        var size = nameText.node().getBBox().width;  // getBBox will only work when element is visible
        var x = jointX - size / 2;
        var y = jointY + 18 * s;
        nameText.attr("x", x);
        nameText.attr("y", y);

        rectAttrs.width = size + 15 * s;
        rectAttrs.x = x - 7.5 * s;
        rectAttrs.y = jointY;
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.style("fill-opacity", 0);
        rect.style("stroke-width", 2);
        if (hasAlert) {
            rect.style("stroke", "#ff0000");
        } else {
            rect.style("stroke", "#008000");
        }
        
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};

// CustBox
var CustBox = function(container, s, custName, aic_width_sum, y) {
    var group = new Group(container);
    
    var sidePadding = 10 * s;
    var aic_padding = 20 * s;
    var box_padding = 5 * s;
    
    var nameAttrs = {
        x: 50 * s,
        y: 130 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    var rectAttrs = {
        x: 50 * s - aic_padding + sidePadding,
        y: y,
        rx: 5 * s,
        ry: 5 * s,
        height: 60 * s
    };
    rectAttrs.width = aic_width_sum - sidePadding * 2;
    
    this.draw = function() {
        var custName_short = custName.split("_")[0];
        var nameText = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, custName_short);
        var size = nameText.node().getBBox().width;  // getBBox will only work when element is visible
        
        if (rectAttrs.width < (size + box_padding * 2)) {   // in case cust name is longer than box
            rectAttrs.x = rectAttrs.x - ((size + box_padding * 2) - rectAttrs.width) / 2;
            rectAttrs.width = (size + box_padding * 2);
        }
        var x = rectAttrs.x + (rectAttrs.width - size) / 2;
        var y = rectAttrs.y + rectAttrs.height - 8 * s;
        nameText.attr("x", x);
        nameText.attr("y", y);
        
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.style("fill-opacity", 0);
        rect.style("stroke-width", 2);
        rect.style("stroke", "#ff0000");
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
};


var Topology = function(container, s, vpeName, topologyData, tableParams, custInfoTopo) {
    var group = container.append("g");
    
    var initialX = 50 * s;
    var initialY = 130 * s;
    var vpeWidth = 120 * s;
    var vpeHeight = 125 * s;
    var vpeYTrans = -70 * s;
    var vceWidth = 120 * s;
    var vceHeight = 113 * s;
    var vceXTrans = 220 * s;
    var vceYTrans = 130 * s;
    var custXTrans = vceXTrans;
    var custYTrans = vceYTrans + vceHeight + 90 * s;
    var aic_padding = 20 * s;
    var aicHeight = initialY + custYTrans - 50 * s - 60 * s;

    this.draw = function() {
        var translate;
        var lineAttrs;
        var alerts = topologyData.alerts;
        var asscns = topologyData.asscns;
        var vceCustNames = getVCECustNames(alerts);
        
        var vpe = new VPE(group, s, vpeName, true, alerts.vpeAlerts[vpeName], asscns.vpeAsscns[vpeName], tableParams);
        vpe.draw();
        var vpePos = calVPEPos(vceCustNames.length);
        translate = "translate(" + vpePos + ", " + vpeYTrans + ")";
        vpe.addTransform(translate);
        
        lineAttrs = calVpeToBridgeLineAttrs(vpePos);
        var vpeToBridgeLine = new Link(group, s, lineAttrs);
        vpeToBridgeLine.draw();
        
        lineAttrs = calBridgeLineAttrs(vceCustNames.length);
        var bridge = new Link(group, s, lineAttrs);
        bridge.draw();
        
        for (var i = 0; i < vceCustNames.length; i++) {
            var vceName = vceCustNames[i].vceName;
            var custName = vceCustNames[i].custName;
            //var custName = vceCustNames[i].custName.split("_")[0];
            
            var hasAlert = (alerts.vceAlerts[vceName] != null);
            var vce = new VCE(group, s, vceName, hasAlert, alerts.vceAlerts[vceName], asscns.vceAsscns[vceName], tableParams);
            vce.draw();
            translate = "translate(" + (vceXTrans * i) + ", " + vceYTrans + ")";
            vce.addTransform(translate);
            
            lineAttrs = calBridgeToVceLineAttrs(i);
            var bridgeToVceLine = new Link(group, s, lineAttrs);
            bridgeToVceLine.draw();
            
            var cust = new Cust(group, s, custName, hasAlert, custInfoTopo);
            cust.draw();
            translate = "translate(" + (custXTrans * i) + ", " + custYTrans + ")";
            cust.addTransform(translate);
            
            lineAttrs = calVceToCustLineAttrs(i);
            var vceToCustLine = new Link(group, s, lineAttrs);
            vceToCustLine.draw();
        }
        
        var aic_cloud_width = calAicCloudWidth(vceCustNames.length);
        var aic_cloud = new AIC_Cloud(group, s, asscns.vpeAsscns[vpeName].aic);
        aic_cloud.draw(aicHeight, aic_cloud_width);
        translate = "translate(" + (-aic_padding) + ", " + (-10) + ")";
        aic_cloud.addTransform(translate);
        
        var gPos = calGPos(vceCustNames.length);
        translate = "translate(" + gPos + ", " + 0 + ")";
        this.addTransform(translate);
    };

    this.addTransform = function(t) {
        group.attr("transform", t);
    };

    var getVCECustNames = function(alerts) {
        var vpeAlerts = alerts.vpeAlerts[vpeName];
        var isExist = {};
        var vceCustNames = [];

        for (var i = 0; i < vpeAlerts.length; i++) {
            var vceName = vpeAlerts[i].vceName;
            var custName = vpeAlerts[i].customerName;

            if (isExist[vceName] == null) {
                vceCustNames.push({vceName: vceName, custName: custName});
                isExist[vceName] = true;
            }
        }

        vceCustNames.sort(function(a, b) {
            var vceA = a.vceName;
            var vceB = b.vceName;
            return vceA.localeCompare(vceB);
        });

        return vceCustNames;
    };

    var calVPEPos = function(vceCount) {
        var vcesTotalWidth = vceWidth + (vceCount - 1) * vceXTrans;
        
        var vpePos = (vcesTotalWidth - vpeWidth) / 2;
        return vpePos;
    };

    var calGPos = function(vceCount) {
        var vcesTotalWidth = vceWidth + (vceCount - 1) * vceXTrans;

        return (768 - vcesTotalWidth) / 2;
    };

    var calVpeToBridgeLineAttrs = function(vpePos) {
        var x1 = vpePos + initialX + (vpeWidth / 2);
        var y1 = initialY + vpeYTrans + vpeHeight;
        var x2 = x1;
        var y2 = y1 + (initialY + vceYTrans - y1) / 2;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calBridgeLineAttrs = function(vceCount) {
        var x1 = initialX + vceWidth / 2;
        var vpeY = initialY + vpeYTrans + vpeHeight;
        var y1 = vpeY + (initialY + vceYTrans - vpeY) / 2;
        var x2 = x1 + (vceCount - 1) * vceXTrans;
        var y2 = y1;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calBridgeToVceLineAttrs = function(i) {
        var x1 = initialX + vceWidth / 2 + vceXTrans * i;
        var vpeY = initialY + vpeYTrans + vpeHeight;
        var y1 = vpeY + (initialY + vceYTrans - vpeY) / 2;
        var x2 = x1;
        var y2 = initialY + vceYTrans;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calVceToCustLineAttrs = function(i) {
        var x1 = initialX + vceWidth / 2 + vceXTrans * i;
        var y1 = initialY + vceYTrans + vceHeight;
        var x2 = x1;
        var y2 = initialY + custYTrans - 18;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };
    
    var calAicCloudWidth = function(vceCount) {
        var vcesTotalWidth = vceWidth + (vceCount - 1) * vceXTrans;
        
        return vcesTotalWidth + aic_padding * 2;
    };
};



var CustTopology = function(container, s, custInfo, topologyData, tableParams) {
    var group = container.append("g");
    
    var initialX = 50 * s;
    var initialY = 130 * s;
    var vpeWidth = 120 * s;
    var vpeHeight = 125 * s;
    var vpeYTrans = -70 * s;
    var vceWidth = 120 * s;
    var vceHeight = 113 * s;
    var vceXTrans = 140 * s;
    var vceYTrans = 130 * s;
    var aic_padding = 20 * s;
    var aicHeight = initialY + vceYTrans + vceHeight - 20 * s;
    var vceToCustBridgeHeight = 30 * s;
    var custBridgeToCityHeight = 40 * s;
    var topology_padding = 10 * s;
    
    var alerts = topologyData.alerts;

    this.draw = function() {
        var translate;
        var aicInfos = custInfo.aicInfos;
        
        var aic_width_sum = {
            width_sum: 0
        };
        for (var i = 0; i < aicInfos.length; i++) {
            var aicInfo = aicInfos[i];
            drawAicCloud(group, aicInfo, aic_width_sum);
        }
        
        var custBoxY = initialY + vceYTrans + vceHeight + vceToCustBridgeHeight + custBridgeToCityHeight - 6 * s;
        var custBox = new CustBox(group, s, custInfo.cust, aic_width_sum.width_sum - aic_padding, custBoxY);
        custBox.draw();
        
        // position of topology
        var svgWidth = container.node().getBoundingClientRect().width;
        var gWidth = group.node().getBBox().width;
        var gX = initialX - aic_padding;
        
        var topologyWidth = gWidth + 2 * topology_padding;
        if (topologyWidth > svgWidth) {
            container.attr("width", topologyWidth);
            
            var gXTrans = topology_padding - gX;
            translate = "translate(" + gXTrans + ", " + 0 + ")";
            group.attr("transform", translate);
        } else {
            var gXTrans = calGPos(svgWidth, gWidth, gX);
            translate = "translate(" + gXTrans + ", " + 0 + ")";
            group.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.attr("transform", t);
    };
    
    var drawVpeVce = function(container, vpeInfo, vceCount) {
        var subGroup = container.append("g");
        var vceInfos = vpeInfo.vceInfos;
        var hasAlertInCloud = false;
        var translate;
        var lineAttrs;

        var vpeAsscn = {
            vpe_vm_fej: vpeInfo.vpe_vm_fej,
            vpe_vm_rej: vpeInfo.vpe_vm_rej,
            vpe_hostname: vpeInfo.vpe_hostname
        };

        var hasAlert = (alerts.vpeAlerts[vpeInfo.vpe] != null);
        hasAlertInCloud = hasAlertInCloud || hasAlert;
        var vpe = new VPE(subGroup, s, vpeInfo.vpe, hasAlert, alerts.vpeAlerts[vpeInfo.vpe], vpeAsscn, tableParams);
        vpe.draw();
        var vpePos = calVPEPos(vceInfos.length);
        translate = "translate(" + vpePos + ", " + vpeYTrans + ")";
        vpe.addTransform(translate);

        lineAttrs = calVpeToBridgeLineAttrs(vpePos);
        var vpeToBridgeLine = new Link(subGroup, s, lineAttrs);
        vpeToBridgeLine.draw();

        lineAttrs = calBridgeLineAttrs(vceInfos.length);
        var bridge = new Link(subGroup, s, lineAttrs);
        bridge.draw();

        for (var j = 0; j < vceInfos.length; j++) {
            var vceName = vceInfos[j].vce;
            var vce_vm = vceInfos[j].vce_vm;
            var vce_hostname = vceInfos[j].vce_hostname;

            var vceAsscn = null;
            if (vce_vm != null && vce_hostname != null) {
                vceAsscn = {
                    vce_vm: vce_vm,
                    vce_hostname: vce_hostname
                };
            }

            var hasAlert = (alerts.vceAlerts[vceName] != null);
            hasAlertInCloud = hasAlertInCloud || hasAlert;
            var vce = new VCE(subGroup, s, vceName, hasAlert, alerts.vceAlerts[vceName], vceAsscn, tableParams);
            vce.draw();
            translate = "translate(" + (vceXTrans * j) + ", " + vceYTrans + ")";
            vce.addTransform(translate);

            lineAttrs = calBridgeToVceLineAttrs(j);
            var bridgeToVceLine = new Link(subGroup, s, lineAttrs);
            bridgeToVceLine.draw();
            
            lineAttrs = calVceToCustBridgeLineAttrs(j);
            var vceToCustBridgeLine = new Link(subGroup, s, lineAttrs);
            vceToCustBridgeLine.draw();
        }
        
        translate = "translate(" + (vceXTrans * vceCount) + ", " + 0 + ")";
        subGroup.attr("transform", translate);
        
        return hasAlertInCloud;
    };
    
    var drawAicCloud = function(container, aicInfo, aic_width_sum) {
        var subGroup = container.append("g");
        var vpeInfos = aicInfo.vpeInfos;

        var vceCount = 0;
        var hasAlertInCloud = false;
        for (var j = 0; j < vpeInfos.length; j++) {
            var vpeInfo = vpeInfos[j];
            var vceInfos = vpeInfo.vceInfos;
            var hasAlert = drawVpeVce(subGroup, vpeInfo, vceCount);
            vceCount += vceInfos.length;
            
            hasAlertInCloud = hasAlertInCloud || hasAlert;
        }
        
        var lineAttrs = calCustBridgeLineAttrs(vceCount);
        var custBridgeLine = new Link(subGroup, s, lineAttrs);
        custBridgeLine.draw();
        
        lineAttrs = calCustBridgeToCityLineAttrs(vceCount);
        var custBridgeToCityLine = new Link(subGroup, s, lineAttrs);
        custBridgeToCityLine.draw();
        
        var city = new City(subGroup, s, aicInfo.city, lineAttrs.x2, lineAttrs.y2, hasAlertInCloud);
        city.draw();
        
        var aic_cloud_width = calAicCloudWidth(vceCount);
        var aic_cloud = new AIC_Cloud(subGroup, s, aicInfo.aic);
        aic_cloud.draw(aicHeight, aic_cloud_width);
        var translate = "translate(" + (-aic_padding) + ", " + (-10) + ")";
        aic_cloud.addTransform(translate);
        
        translate = "translate(" + (aic_width_sum.width_sum) + ", " + 0 + ")";
        subGroup.attr("transform", translate);
        aic_width_sum.width_sum += aic_cloud_width + aic_padding;
    };

    var calVPEPos = function(vceCount) {
        var vcesTotalWidth = vceWidth + (vceCount - 1) * vceXTrans;
        
        var vpePos = (vcesTotalWidth - vpeWidth) / 2;
        return vpePos;
    };

    var calGPos = function(svgWidth, gWidth, gX) {
        var trans = (svgWidth - gWidth) / 2 - gX;

        return trans;
    };

    var calVpeToBridgeLineAttrs = function(vpePos) {
        var x1 = vpePos + initialX + (vpeWidth / 2);
        var y1 = initialY + vpeYTrans + vpeHeight;
        var x2 = x1;
        var y2 = y1 + (initialY + vceYTrans - y1) / 2;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calBridgeLineAttrs = function(vceCount) {
        var x1 = initialX + vceWidth / 2;
        var vpeY = initialY + vpeYTrans + vpeHeight;
        var y1 = vpeY + (initialY + vceYTrans - vpeY) / 2;
        var x2 = x1 + (vceCount - 1) * vceXTrans;
        var y2 = y1;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calBridgeToVceLineAttrs = function(i) {
        var x1 = initialX + vceWidth / 2 + vceXTrans * i;
        var vpeY = initialY + vpeYTrans + vpeHeight;
        var y1 = vpeY + (initialY + vceYTrans - vpeY) / 2;
        var x2 = x1;
        var y2 = initialY + vceYTrans;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calVceToCustBridgeLineAttrs = function(i) {
        var x1 = initialX + vceWidth / 2 + vceXTrans * i;
        var y1 = initialY + vceYTrans + vceHeight;
        var x2 = x1;
        var y2 = y1 + vceToCustBridgeHeight;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };
    
    var calCustBridgeLineAttrs = function(vceCount) {
        var x1 = initialX + vceWidth / 2;
        var y1 = initialY + vceYTrans + vceHeight + vceToCustBridgeHeight;
        var x2 = x1 + (vceCount - 1) * vceXTrans;
        var y2 = y1;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };
    
    var calCustBridgeToCityLineAttrs = function(vceCount) {
        var x1 = initialX + vceWidth / 2 + ((vceCount - 1) * vceXTrans) / 2;
        var y1 = initialY + vceYTrans + vceHeight + vceToCustBridgeHeight;
        var x2 = x1;
        var y2 = y1 + custBridgeToCityHeight;
        
        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };
    
    var calAicCloudWidth = function(vceCount) {
        var vcesTotalWidth = vceWidth + (vceCount - 1) * vceXTrans;
        
        return vcesTotalWidth + aic_padding * 2;
    };
};