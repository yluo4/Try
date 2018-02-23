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


var covertCoordinateToStr = function(coord, s) {
    return (coord[0] * s) + "," + (coord[1] * s);
};

var findAicCloudPath = function(x, y, width, height) {
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
    var ratio = width / default_width;
    for (var i = 0; i < cs.length; i++) {
        cs[i][0][0] *= ratio;
        cs[i][1][0] *= ratio;
        cs[i][2][0] *= ratio;
    }
    
    var cloudPath = "m" + x + "," + y;
    for (var i = 0; i < cs.length; i++) {
        var coord1 = covertCoordinateToStr(cs[i][0], 1);
        var coord2 = covertCoordinateToStr(cs[i][1], 1);
        var coord3 = covertCoordinateToStr(cs[i][2], 1);

        cloudPath += " c" + coord1 + " " + coord2 + " " + coord3;
    }
    
    var lineLen = height;
    cloudPath += " l0," + lineLen;

    for (var i = 0; i < cs.length; i++) {
        var coord1 = covertCoordinateToStr(cs[i][0], -1);
        var coord2 = covertCoordinateToStr(cs[i][1], -1);
        var coord3 = covertCoordinateToStr(cs[i][2], -1);

        cloudPath += " c" + coord1 + " " + coord2 + " " + coord3;
    }

    cloudPath += " l0," + (-lineLen);
    
    
    return cloudPath;
    
    /*
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
    */
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
        src: "app/images/router-grey.png"
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
    
    var rect;
    var innerRect1;
    var innerRect2;
    var text;
    var imag;
    var vpeNameText;
    var vmNameText1;
    var vmNameText2;
    var pserverText;
    var testRect;
    this.draw = function() {
        rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        
        innerRect1 = group.addRectangle(innerRectAttrs1.x, innerRectAttrs1.y, innerRectAttrs1.rx, innerRectAttrs1.ry, innerRectAttrs1.width, innerRectAttrs1.height);
        
        innerRect2 = group.addRectangle(innerRectAttrs2.x, innerRectAttrs2.y, innerRectAttrs2.rx, innerRectAttrs2.ry, innerRectAttrs2.width, innerRectAttrs2.height);
        
        if (hasAlert) {
            rect.attr("class", "device");
            innerRect1.attr("class", "inner-device");
            innerRect2.attr("class", "alert-device");
            
            imagAttrs.src = "../images/router-red.png";
        } else {
            rect.attr("class", "device");
            innerRect1.attr("class", "inner-device");
            innerRect2.attr("class", "inner-device");
            
            imagAttrs.src = "../images/router-grey.png";
        }

        text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vPE");

        imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);

        vpeNameText = group.addText(vpeNameAttrs.x, vpeNameAttrs.y, vpeNameAttrs.fill, vpeNameAttrs.size, vpeName);
        
        vmNameText1 = group.addText(vmNameAttrs1.x, vmNameAttrs1.y, vmNameAttrs1.fill, vmNameAttrs1.size, vpeAsscn.vpe_vm_fej);
        
        vmNameText2 = group.addText(vmNameAttrs2.x, vmNameAttrs2.y, vmNameAttrs2.fill, vmNameAttrs2.size, vpeAsscn.vpe_vm_rej);
        
        pserverText = group.addText(pserverAttrs.x, pserverAttrs.y, pserverAttrs.fill, pserverAttrs.size, vpeAsscn.vpe_hostname);

        if (hasAlert) {
            addEvent();
        }
        
        //testRect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        /*
        testRect = d3.select("svg").append("g").append("rect").attr("x", 1)
                    .attr("y", 1)
                    .attr("width", 1)
                    .attr("height", 1);
        testRect.attr("fill", "transparent");
        testRect.attr("stroke", "#ff0000");
        */
    };
    
    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    this.getG = function() {
        return group.getG();
    };
    
    this.addDragEvent = function(x, y, edge, isSource, aic, aicName) {
        var g = group.getG();
        var dragstarted = function() {
            d3.event.sourceEvent.stopPropagation();
        };
        var dragged = function() {
            x = x + d3.event.dx;
            y = y + d3.event.dy;
       
            g.attr("transform", "translate(" + x + ", " + y + ")");
            
            edge.modifyPath(d3.event.dx, d3.event.dy, isSource);
            
            var box = container.node().getBBox();
            var padding = 20;
            var pathD = findAicCloudPath(box.x - padding, box.y - padding, box.width + 2 * padding, box.height + 2 * padding);
            aic.attr("d", pathD);
            
            aicName.attr("x", box.x - padding)
                    .attr("y", box.y - padding);
            
            //console.log(container.node().getBBox().width + ", " + container.node().getBBox().height);
            //console.log(container.node().getBBox());
            
            //var box = container.node().getBBox();
            /*
            var box = container.node().getBoundingClientRect();
            testRect.attr("x", box.x)
                    .attr("y", box.y)
                    .attr("width", box.width)
                    .attr("height", box.height);
            */
        };
    
        var drag = d3.behavior.drag()
                    .origin(function() { return {x: 200, y: 0}; })
                    .on("dragstart", dragstarted)
                    .on("drag", dragged);
        g.call(drag);
    };
    
    var isSmallView = false;
    var t = d3.transition()
              .duration(750)
              .ease("linear");
    this.toSmallView = function() {
        if (isSmallView) return;
        
        innerRect1.transition(t).style("visibility", "hidden");
        innerRect2.transition(t).style("visibility", "hidden");
        vmNameText1.transition(t).style("visibility", "hidden");
        vmNameText2.transition(t).style("visibility", "hidden");
        pserverText.transition(t).style("visibility", "hidden");
        
        if (hasAlert) {
            rect.transition(t).attr("class", "alert-device");
        }
        text.transition(t).attr("x", 83)
            .attr("y", 172)
            .style("font-size", 30);
    
        imag.transition(t).attr("x", 69)
            .attr("y", 160)
            .attr("width", 80)
            .attr("height", 80);
    
        vpeNameText.transition(t).attr("x", 62)
                .attr("y", 240)
                .style("font-size", 18);
        
        isSmallView = true;
    };
    
    this.toBigView = function() {
        if (!isSmallView) return;
        
        innerRect1.transition(t).style("visibility", "visible");
        innerRect2.transition(t).style("visibility", "visible");
        vmNameText1.transition(t).style("visibility", "visible");
        vmNameText2.transition(t).style("visibility", "visible");
        pserverText.transition(t).style("visibility", "visible");
        
        rect.transition(t).attr("class", "device");
        
        text.transition(t).attr("x", 99)
            .attr("y", 162)
            .style("font-size", 12);
    
        imag.transition(t).attr("x", 95)
            .attr("y", 160)
            .attr("width", 30)
            .attr("height", 30);
    
        vpeNameText.transition(t).attr("x", 79)
                .attr("y", 196)
                .style("font-size", 11);
        
        isSmallView = false;
    };
    
    var addEvent = function() {
        var g = group.getG();

        g.style("cursor", "pointer");	
        g.on("click", function() {
            /*
            tablePrams.settings({
                dataset: vpeAlerts
            });
            tablePrams.reload();
            $(".modal-table").show();
            */
        });
    };
};

var Edge = function(container, source, target) {
    var group = new Group(container);
    var color = "#067ab4";
    var path;
    var d;
    
    this.draw = function() {
        var sx = source.x;
        var sy = source.y;
        var tx = target.x;
        var ty = target.y;
        
        d = getPath(sx, sy, tx, ty);
        path = group.addPath(d, "none");
        path.style("stroke", color);
        path.style("stroke-width", "2px");
        
        highlightEvent();
    };
    
    this.modifyPath = function(dx, dy, isSource) {
        if (isSource) {
            source.x = source.x + dx;
            source.y = source.y + dy;
        } else {
            target.x = target.x + dx;
            target.y = target.y + dy;
        }
        
        var sx = source.x;
        var sy = source.y;
        var tx = target.x;
        var ty = target.y;
        d = getPath(sx, sy, tx, ty);
        path.attr("d", d);
    };
    
    /*
    var getPath = function(sx, sy, tx, ty) {
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
        
        var path = [
            "M",
            sx, sy,
            "C",
            c1x, c1y,
            c2x, c2y,
            tx, ty
        ];
     
        return path.join(" ");
    };
    */
    
    
    var getPath = function(sx, sy, tx, ty) {
        var c1x, c1y, c2x, c2y;
        
        /*
        var cv = getPath_V(tx, ty, sx, sy);
        var ch = getPath_H(sx, sy, tx, ty);
        
        c1x = cv.c2x;
        c1y = cv.c2y;
        c2x = ch.c2x;
        c2y = ch.c2y;
        */
        /*
        c1y = sy;
        c1x = sx - 10;
        c2y = ty;
        c2x = sx + 8;
        
        var nodeSize = 120;
        var curveFactor = (tx - sx) * nodeSize / 200;
        if (sx - tx < 5) {
            c1y = sy + curveFactor;
            c1x = sx - curveFactor;
            c2y = sy + (ty - sy)/2;
            c2x = tx;
        }
        */
        
        c1y = sy;
        c1x = sx + 8;
        c2y = ty;
        c2x = sx - 10;
        
        var path = [
            "M",
            sx, sy,
            "C",
            c1x, c1y,
            c2x, c2y,
            tx, ty
        ];
     
        return path.join(" ");
    };
    
    var highlightEvent = function() {
        var g = group.getG();
        
        g.on("mouseover", function() {
            path.style("stroke-width", "3px");
        });
        
        g.on("mouseout", function() {
            path.style("stroke-width", "2px");
        });
    };
};

var Topology = function() {
    var container = d3.select("svg");
    var group = container.append("g");
    var aic = group.append("path");
    var aicName = group.append("text");
    var deviceGroup = group.append("g");
    
    
    /*
    var rectAttrs = {
        x: 50 * s,
        y: 130 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 120 * s,
        height: 125 * s
    };
    */
    
    /*
    var source = {
        x: 110,
        y: 255
    };
    var target = {
        x: 310,
        y: 130
    };
    */
   
   /*
   var source = {
        x: 50,
        y: 192.5
    };
    var target = {
        x: 310,
        y: 130
    };
    */
   var source = {
        x: 110,
        y: 130
    };
    var target = {
        x: 250,
        y: 192.5
    };
    
    
    var edge = new Edge(deviceGroup, source, target);
    edge.draw();
    
    var vpeAssn = {
        vpe_vm_fej: "snbca401me601fej",
        vpe_vm_rej: "snbca401me601rej",
        vpe_hostname: "sagca125sd9"
    };
    var vpe = new VPE(deviceGroup, 1, "snbca401me6", true, null, vpeAssn, null, edge);
    vpe.draw();
    vpe.addDragEvent(0, 0, edge, true, aic, aicName);
    
    var vpe2 = new VPE(deviceGroup, 1, "snbca401me7", true, null, vpeAssn, null, edge);
    vpe2.draw();
    vpe2.addTransform("translate(" + 200 + ", " + 0 + ")");
    vpe2.addDragEvent(200, 0, edge, false, aic, aicName);
    
    
    var box = deviceGroup.node().getBBox();
    var padding = 20;
    var pathD = findAicCloudPath(box.x - padding, box.y - padding, box.width + 2 * padding, box.height + 2 * padding);
    aic.attr("d", pathD)
        .attr("fill", "transparent")
        .attr("stroke", "#2196f3");

    aicName.attr("x", box.x - padding)
            .attr("y", box.y - padding)
            .style("fill", "#2196f3")
            .style("font-size", "18px")
            .text("frdca-esx-az01");
    
    
    var zoomed = function() {
        //console.log(d3.event.sourceEvent);
        group.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        
        if (d3.event.scale >= 1) {
            vpe.toBigView();
            vpe2.toBigView();
        } else {
            vpe.toSmallView();
            vpe2.toSmallView();
        }
    };
    
    var zoom = d3.behavior.zoom()
                .scale(0.65)
                .scaleExtent([0.3, 5])
                .on("zoom", zoomed);
    container.call(zoom);
    group.attr("transform", "scale(0.65)");
    vpe.toSmallView();
    vpe2.toSmallView();
    
    /*
    var x = 200;
    var y = 0;
    var dragstarted = function() {
        d3.event.sourceEvent.stopPropagation();
    };
    var dragged = function() {
       x = x + d3.event.dx;
       y = y + d3.event.dy;
       
        vpe2.addTransform("translate(" + x + ", " + y + ")");
    };
    
    var drag = d3.behavior.drag()
                .origin(function() { return {x: 200, y: 0}; })
                .on("dragstart", dragstarted)
                .on("drag", dragged);
       
    vpe2.getG().call(drag);
    */
};


var topo = new Topology();
/*
var container = d3.select("svg");
var vpe = new TOPO.NodeVpe(container);
vpe.draw();
*/