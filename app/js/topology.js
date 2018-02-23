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
var VPE = function(container, s, vpeName, vpeAlerts, tablePrams) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 130 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 75 * s,
        height: 65 * s
    };
    var innerRectAttrs = {
        x: 60 * s,
        y: 141 * s,
        rx: 7 * s,
        ry: 7 * s,
        width: 55 * s,
        height: 43 * s
    };
    var textAttrs = {
        x: 73 * s,
        y: 156 * s,
        fill: "#000000",
        size: 15 * s
    };
    var imagAttrs = {
        x: 70 * s,
        y: 153 * s,
        width: 35 * s,
        height: 35 * s,
        src: "app/images/router.png"
    };
    var vpeNameAttrs = {
        x: 52 * s,
        y: 125 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "alert-device");

        var innerRect = group.addRectangle(innerRectAttrs.x, innerRectAttrs.y, innerRectAttrs.rx, innerRectAttrs.ry, innerRectAttrs.width, innerRectAttrs.height);
        innerRect.attr("class", "alert-inner-device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vPE");

        var imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);

        var vpeNameText = group.addText(vpeNameAttrs.x, vpeNameAttrs.y, vpeNameAttrs.fill, vpeNameAttrs.size, vpeName);

        addEvent();
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
var VCE = function(container, s, vceName, hasAlert, vceAlerts, tablePrams) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 130 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 75 * s,
        height: 65 * s
    };
    var innerRectAttrs = {
        x: 60 * s,
        y: 141 * s,
        rx: 7 * s,
        ry: 7 * s,
        width: 55 * s,
        height: 43 * s
    };
    var textAttrs = {
        x: 73 * s,
        y: 156 * s,
        fill: "#000000",
        size: 15 * s
    };
    var imagAttrs = {
        x: 70 * s,
        y: 153 * s,
        width: 35 * s,
        height: 30 * s,
        src: "app/images/memory.png"
    };
    var vceNameAttrs = {
        x: 53 * s,
        y: 211 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);

        var innerRect = group.addRectangle(innerRectAttrs.x, innerRectAttrs.y, innerRectAttrs.rx, innerRectAttrs.ry, innerRectAttrs.width, innerRectAttrs.height);

        if (hasAlert) {
            rect.attr("class", "alert-device");
            innerRect.attr("class", "alert-inner-device");
        } else {
            rect.attr("class", "device");
            innerRect.attr("class", "inner-device");
        }

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vCE");

        var imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);

        var vceNameText = group.addText(vceNameAttrs.x, vceNameAttrs.y, vceNameAttrs.fill, vceNameAttrs.size, vceName);

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
                dataset: vceAlerts
            });
            tablePrams.reload();
            $(".modal-table").show();
        });
    };
};


// Customer
var Cust = function(container, s, custName, hasAlert) {
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
        var custNameText = group.addText(custNameAttrs.x, custNameAttrs.y, custNameAttrs.fill, custNameAttrs.size, custName);
        var size = custNameText.node().getBBox().width;  // getBBox will only work when element is visible
        var x = 50 * s + (75 *s - size) / 2;
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
    };

    this.addTransform = function(t) {
        group.addTransform(t);
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


var Topology = function(container, s, vpeName, alerts, tableParams) {
    var group = container.append("g");

    this.draw = function() {
        var vceCustNames = getVCECustNames();
        var translate;
        var lineAttrs;

        var vpe = new VPE(group, s, vpeName, alerts.vpeAlerts[vpeName], tableParams);
        vpe.draw();
        var vpePos = calVPEPos(vceCustNames.length);
        translate = "translate(" + vpePos + ", " + (-100 * s) + ")";
        vpe.addTransform(translate);

        lineAttrs = calVpeToBridgeLineAttrs(vpePos);
        var vpeToBridgeLine = new Link(group, s, lineAttrs);
        vpeToBridgeLine.draw();

        lineAttrs = calBridgeLineAttrs(vceCustNames.length);
        var bridge = new Link(group, s, lineAttrs);
        bridge.draw();

        var vceAlerts = alerts.vceAlerts;
        for (var i = 0; i < vceCustNames.length; i++) {
            var vceName = vceCustNames[i].vceName;
            var custName = vceCustNames[i].custName.split("_")[0];

            var hasAlert = (vceAlerts[vceName] != null);
            var vce = new VCE(group, s, vceName, hasAlert, vceAlerts[vceName], tableParams);
            vce.draw();
            translate = "translate(" + (200 * s * i) + ", " + (50 * s) + ")";
            vce.addTransform(translate);

            lineAttrs = calBridgeToVceLineAttrs(i);
            var bridgeToVceLine = new Link(group, s, lineAttrs);
            bridgeToVceLine.draw();

            var cust = new Cust(group, s, custName, hasAlert);
            cust.draw();
            translate = "translate(" + (200 * s * i) + ", " + (210 * s) + ")";
            cust.addTransform(translate);

            lineAttrs = calVceToCustLineAttrs(i);
            var vceToCustLine = new Link(group, s, lineAttrs);
            vceToCustLine.draw();
        }

        var gPos = calGPos(vceCustNames.length);
        translate = "translate(" + gPos + ", " + (0 * s) + ")";
        this.addTransform(translate);
    };

    this.addTransform = function(t) {
        group.attr("transform", t);
    };

    var getVCECustNames = function() {
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
        var vcesTotalWidth = (75 + (vceCount - 1) * 200) * s;

        var vpePos = (vcesTotalWidth - 75 * s) / 2;
        return vpePos;
    };

    var calGPos = function(vceCount) {
        var vcesTotalWidth = (75 + (vceCount - 1) * 200) * s;

        return (768 - vcesTotalWidth) / 2;
    };

    var calVpeToBridgeLineAttrs = function(vpePos) {
        var x1 = vpePos + 50 * s + (75 / 2) * s;
        var y1 = (130 - 100 + 65) * s;
        var x2 = x1;
        var y2 = ((150 - 65) / 2 + 130 - 100 + 65) * s;

        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calBridgeLineAttrs = function(vceCount) {
        var x1 = (50 + 75 / 2) * s;
        var y1 = ((150 - 65) / 2 + 130 - 100 + 65) * s;
        var x2 = x1 + (vceCount - 1) * 200 * s;
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
        var x1 = (50 + 75 / 2 + 200 * i) * s;
        var y1 = ((150 - 65) / 2 + 130 - 100 + 65) * s;
        var x2 = x1;
        var y2 = (130 + 50) * s;

        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };

    var calVceToCustLineAttrs = function(i) {
        var x1 = (50 + 75 / 2 + 200 * i) * s;
        var y1 = (130 + 50 + 65 + 18) * s;
        var x2 = x1;
        var y2 = y1 + 60 * s;

        var lineAttrs = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };

        return lineAttrs;
    };
};

