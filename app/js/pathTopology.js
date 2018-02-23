/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// CE
var CE_PATH = function(container, s, ceName) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 150 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var textAttrs = {
        x: 70 * s,
        y: 167 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 43 * s,
        y: 190 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "CE");
        
        var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, ceName);
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// NTE
var NTE_PATH = function(container, s, nteNames) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 150 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var textAttrs = {
        x: 65 * s,
        y: 167 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 43 * s,
        y: 190 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "NTE");
        
        nteNames.sort();
        for (var i = 0; i < nteNames.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, nteNames[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// EMT
var EMT_PATH = function(container, s, emtNames) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 150 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var textAttrs = {
        x: 65 * s,
        y: 167 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 43 * s,
        y: 190 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "EMT");
        
        emtNames.sort();
        for (var i = 0; i < emtNames.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, emtNames[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// EMUX
var EMUX_PATH = function(container, s, emuxNames) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 150 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var textAttrs = {
        x: 59 * s,
        y: 167 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 43 * s,
        y: 190 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "EMUX");
        
        emuxNames.sort();
        for (var i = 0; i < emuxNames.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, emuxNames[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};



// IPAG
var IPAG_PATH = function(container, s, ce2Vpls) {
    var group = new Group(container);
    var cloudSize = 0.25 * s;
    var textAttrs = {
        x: 65 * s,
        y: 65 * s,
        fill: "#000000",
        size: 15 * s
    };

    var rect1Attrs = {
        x: -20 * s,
        y: 50 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var text1Attrs = {
        x: -10 * s,
        y: 67 * s,
        fill: "#000000",
        size: 15 * s
    };
    var ipag1Attrs = {
        x: -25 * s,
        y: 90 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    var rect2Attrs = {
        x: 120 * s,
        y: 50 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var text2Attrs = {
        x: 130 * s,
        y: 67 * s,
        fill: "#000000",
        size: 15 * s
    };
    var ipag2Attrs = {
        x: 125 * s,
        y: 90 * s,
        fill: "#2196f3",
        size: 12 * s
    };


    this.draw = function() {
        var ipag1s = ce2Vpls.ipag1s;
        var ipag2s = ce2Vpls.ipag2s;
        if (ipag1s.length == 0 && ipag2s.length == 0) return;
        
        var cloud = group.addCloud(cloudSize);
        cloud.attr("class", "device");
        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "IPAG");
        
        if (ipag1s.length > 0) {
            var rect1 = group.addRectangle(rect1Attrs.x, rect1Attrs.y, rect1Attrs.rx, rect1Attrs.ry, rect1Attrs.width, rect1Attrs.height);
            rect1.attr("class", "device");
            var text1 = group.addText(text1Attrs.x, text1Attrs.y, text1Attrs.fill, text1Attrs.size, "IPAG1");

            ipag1s.sort();
            for (var i = 0; i < ipag1s.length; i++) {
                var name = group.addText(ipag1Attrs.x, ipag1Attrs.y, ipag1Attrs.fill, ipag1Attrs.size, ipag1s[i]);
                var translate = "translate(" + 0 + ", " + (12 * i) + ")";
                name.attr("transform", translate);
            }
        }   

        if (ipag2s.length > 0) {
            var rect2 = group.addRectangle(rect2Attrs.x, rect2Attrs.y, rect2Attrs.rx, rect2Attrs.ry, rect2Attrs.width, rect2Attrs.height);
            rect2.attr("class", "device");
            var text2 = group.addText(text2Attrs.x, text2Attrs.y, text2Attrs.fill, text2Attrs.size, "IPAG2");

            ipag2s.sort();
            for (var i = 0; i < ipag2s.length; i++) {
                var name = group.addText(ipag2Attrs.x, ipag2Attrs.y, ipag2Attrs.fill, ipag2Attrs.size, ipag2s[i]);
                var translate = "translate(" + 0 + ", " + (12 * i) + ")";
                name.attr("transform", translate);
            }
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// EMT
var MPCIO_PATH = function(container, s, mpcioNames) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 150 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var textAttrs = {
        x: 57 * s,
        y: 167 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 43 * s,
        y: 190 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "MPCIO");
        
        mpcioNames.sort();
        for (var i = 0; i < mpcioNames.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, mpcioNames[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// VPLS
var VPLS_PATH = function(container, s, vplsPes) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 130 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 75 * s,
        height: 65 * s
    };
    var text1Attrs = {
        x: 57 * s,
        y: 167 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 53 * s,
        y: 211 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text1 = group.addText(text1Attrs.x, text1Attrs.y, text1Attrs.fill, text1Attrs.size, "VPLS/PE");
        
        vplsPes.sort();
        for (var i = 0; i < vplsPes.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, vplsPes[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// VCE
var VCE_PATH = function(container, s, vceName, vceSvrs, alerts, displayTable) {
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
        y: 138 * s,
        rx: 7 * s,
        ry: 7 * s,
        width: 55 * s,
        height: 43 * s
    };
    var textAttrs = {
        x: 73 * s,
        y: 153 * s,
        fill: "#000000",
        size: 15 * s
    };
    var imagAttrs = {
        x: 70 * s,
        y: 150 * s,
        width: 35 * s,
        height: 30 * s,
        src: "app/images/memory-grey.png"
    };
    var vceNameAttrs = {
        x: 59 * s,
        y: 192 * s,
        fill: "#2196f3",
        size: 10 * s
    };
    var nameAttrs = {
        x: 53 * s,
        y: 211 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var hasAlert = (alerts.length > 0);
        
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);

        var innerRect = group.addRectangle(innerRectAttrs.x, innerRectAttrs.y, innerRectAttrs.rx, innerRectAttrs.ry, innerRectAttrs.width, innerRectAttrs.height);
        
        if (hasAlert) {
            rect.attr("class", "device");
            innerRect.attr("class", "alert-device");
            
            imagAttrs.src = "app/images/memory-red.png";
        } else {
            rect.attr("class", "device");
            innerRect.attr("class", "inner-device");
            
            imagAttrs.src = "app/images/memory-grey.png";
        }

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vCE");

        var imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);
        
        if (vceName != null) {
            var vce = group.addText(vceNameAttrs.x, vceNameAttrs.y, vceNameAttrs.fill, vceNameAttrs.size, vceName);
        }
        
        vceSvrs.sort();
        for (var i = 0; i < vceSvrs.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, vceSvrs[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
        
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
        
        var tableParams = displayTable.tableParams;
        var tableArea = displayTable.tableArea;
        g.on("click", function() {
            tableParams.settings({
                dataset: alerts
            });
            tableParams.reload();
            //$(".modal-table").show();
            tableArea.show();
        });
    };
};



// VPE
var VPE_PATH = function(container, s, vpeName, vpeSvrs, alerts, displayTable) {
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
        y: 138 * s,
        rx: 7 * s,
        ry: 7 * s,
        width: 55 * s,
        height: 43 * s
    };
    var textAttrs = {
        x: 73 * s,
        y: 153 * s,
        fill: "#000000",
        size: 15 * s
    };
    var imagAttrs = {
        x: 70 * s,
        y: 150 * s,
        width: 35 * s,
        height: 35 * s,
        src: "app/images/router-grey.png"
    };
    var vpeNameAttrs = {
        x: 59 * s,
        y: 192 * s,
        fill: "#2196f3",
        size: 10 * s
    };
    var nameAttrs = {
        x: 53 * s,
        y: 211 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var hasAlert = (alerts.length > 0);
        
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        
        var innerRect = group.addRectangle(innerRectAttrs.x, innerRectAttrs.y, innerRectAttrs.rx, innerRectAttrs.ry, innerRectAttrs.width, innerRectAttrs.height);
        
        if (hasAlert) {
            rect.attr("class", "device");
            innerRect.attr("class", "alert-device");
            
            imagAttrs.src = "app/images/router-red.png";
        } else {
            rect.attr("class", "device");
            innerRect.attr("class", "inner-device");
            
            imagAttrs.src = "app/images/router-grey.png";
        }

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "vPE");

        var imag = group.addImage(imagAttrs.x, imagAttrs.y, imagAttrs.width, imagAttrs.height, imagAttrs.src);
        
        if (vpeName != null) {
            var vpe = group.addText(vpeNameAttrs.x, vpeNameAttrs.y, vpeNameAttrs.fill, vpeNameAttrs.size, vpeName);
        }
        
        vpeSvrs.sort();
        for (var i = 0; i < vpeSvrs.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, vpeSvrs[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }
        
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
        
        var tableParams = displayTable.tableParams;
        var tableArea = displayTable.tableArea;
        g.on("click", function() {
            tableParams.settings({
                dataset: alerts
            });
            tableParams.reload();
            //$(".modal-table").show();
            tableArea.show();
        });
    };
};


// CBB
var CBB_PATH = function(container, s, crsNames) {
    var group = new Group(container);
    var cloudSize = 0.25 * s;
    var textAttrs = {
        x: 65 * s,
        y: 65 * s,
        fill: "#000000",
        size: 15 * s
    };

    var rect1Attrs = {
        x: -10 * s,
        y: 60 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 60 * s,
        height: 25 * s
    };
    var text1Attrs = {
        x: 3 * s,
        y: 77 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: -9 * s,
        y: 100 * s,
        fill: "#2196f3",
        size: 12 * s
    };


    this.draw = function() {
        var cloud = group.addCloud(cloudSize);
        cloud.attr("class", "device");
        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "CBB");

        var rect1 = group.addRectangle(rect1Attrs.x, rect1Attrs.y, rect1Attrs.rx, rect1Attrs.ry, rect1Attrs.width, rect1Attrs.height);
        rect1.attr("class", "device");
        var text1 = group.addText(text1Attrs.x, text1Attrs.y, text1Attrs.fill, text1Attrs.size, "CRS");
        
        crsNames.sort();
        for (var i = 0; i < crsNames.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, crsNames[i]);
            var translate = "translate(" + 0 + ", " + (12 * i) + ")";
            name.attr("transform", translate);
        }

    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// TOA
var TOA_PATH = function(container, s, toas) {
    var group = new Group(container);
    var rectAttrs = {
        x: 50 * s,
        y: 10 * s,
        rx: 5 * s,
        ry: 5 * s,
        width: 370 * s,
        height: 70 * s
    };
    var textAttrs = {
        x: 220 * s,
        y: 25 * s,
        fill: "#000000",
        size: 15 * s
    };
    var nameAttrs = {
        x: 205 * s,
        y: 5 * s,
        fill: "#2196f3",
        size: 12 * s
    };

    this.draw = function() {
        var rect = group.addRectangle(rectAttrs.x, rectAttrs.y, rectAttrs.rx, rectAttrs.ry, rectAttrs.width, rectAttrs.height);
        rect.attr("class", "device");

        var text = group.addText(textAttrs.x, textAttrs.y, textAttrs.fill, textAttrs.size, "TOA");
        
        toas.sort();
        for (var i = 0; i < toas.length; i++) {
            var name = group.addText(nameAttrs.x, nameAttrs.y, nameAttrs.fill, nameAttrs.size, toas[i]);
            var transY = -12 * (toas.length - 1 - i);
            var translate = "translate(" + 0 + ", " + transY + ")";
            name.attr("transform", translate);
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};

// Common link
var Common_Link = function(container, s, links) {
    var group = new Group(container);
    //var color = "#bf9000";
    var color = "#067ab4";
    var lineAttrs = {
        x1: 50 * s,
        y1: 162.5 * s,
        x2: 110 * s,
        y2: 162.5 * s,
        stroke_width: 2 * s
    };

    this.draw = function() {
        var line = group.addLine(lineAttrs.x1, lineAttrs.y1, lineAttrs.x2, lineAttrs.y2, color, lineAttrs.stroke_width);
        
        if (links != null) {
            addTooltip();
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};


// Logical link
var Logical_Link = function(container, s, length, links) {
    var group = new Group(container);
    //var color = "#bf9000";
    var color = "#067ab4";
    var lineAttrs = {
        x1: 50 * s,
        y1: 162.5 * s,
        x2: (50 + length) * s,
        y2: 162.5 * s,
        stroke_width: 2 * s
    };

    this.draw = function() {
        var line = group.addLine(lineAttrs.x1, lineAttrs.y1, lineAttrs.x2, lineAttrs.y2, color, lineAttrs.stroke_width);
        line.style("stroke-dasharray", "5, 5");
        
        if (links != null && links.length > 0) {
            addTooltip();
        }
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0].link +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i].link + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};


// EMT to IPAG link
var EMT_IPAG_Link = function(container, s) {
    var group = new Group(container);
    //var color = "#bf9000";
    var color = "#067ab4";
    var lineAttrs = {
        x1: 50 * s,
        y1: 162.5 * s,
        x2: 110 * s,
        y2: 162.5 * s,
        stroke_width: 2 * s
    };

    this.draw = function() {
        var line = group.addLine(lineAttrs.x1, lineAttrs.y1, lineAttrs.x2, lineAttrs.y2, color, lineAttrs.stroke_width);
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};
	
// IPAG to VPLS link
var IPAG_VPLS_Link = function(container, s) {
    var group = new Group(container);
    //var color = "#bf9000";
    var color = "#067ab4";
    var lineAttrs = {
        x1: 50 * s,
        y1: 162.5 * s,
        x2: 110 * s,
        y2: 162.5 * s,
        stroke_width: 2 * s
    };

    this.draw = function() {
        var line = group.addLine(lineAttrs.x1, lineAttrs.y1, lineAttrs.x2, lineAttrs.y2, color, lineAttrs.stroke_width);
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
};


// VPLS to TOA link
var VPLS_TOA_Link = function(container, s, links) {
    var group = new Group(container);
    //var colorsPool = ["#ffc107", "#ff0000"];
    //var color = "#008000";
    var color = "#067ab4";
    var pathAttrs = {
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: 50 * s,
                y: 124 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: -80 * s
            },
            {
                com: "l",
                x: 37 * s,
                y: 0 * s
            }
        ]
    };

    var getStartPoint = function(dAttrs) {
        var x = dAttrs[0].x;
        var y = dAttrs[0].y;
        var point = [x, y];

        return point;
    };

    var getEndPoint = function(dAttrs) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dAttrs.length; i++) {
                x += dAttrs[i].x;
                y += dAttrs[i].y;
        }
        var point = [x, y];

        return point;
    };

    var getD = function(dAttrs) {
        var d = dAttrs[0].com + dAttrs[0].x + "," + dAttrs[0].y;
        for (var i = 1; i < dAttrs.length; i++) {
                d += " " + dAttrs[i].com + dAttrs[i].x + "," + dAttrs[i].y;
        }

        return d;
    };

    this.draw = function() {
        // line
        var dAttrs = pathAttrs.dAttrs;
        var d = getD(dAttrs);

        var path = group.addPath(d, pathAttrs.fill);
        path.style("stroke", color)
                .style("stroke-width", pathAttrs.stroke_width);

        // marker1
        var marker1StartPoint = getStartPoint(pathAttrs.dAttrs);
        var marker1 = group.addArrowHeadDown(marker1StartPoint, color, s);

        // marker2
        var marker2StartPoint = getEndPoint(pathAttrs.dAttrs);
        var marker2 = group.addArrowHeadRight(marker2StartPoint, color, s);

        //addClickEvent(path, marker1, marker2);
        addTooltip();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };

    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};
	
// TOA to VCE Link
var TOA_VCE_Link = function(container, s, links) {
    var group = new Group(container);
    //var color = "#ffc107";
    var color = "#067ab4";
    var path1Attrs = {
        stroke_dasharray: "15 5 2 5 2 5",
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: 50 * s,
                y: 44 * s
            },
            {
                com: "l",
                x: 80 * s,
                y: 0 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: 36 * s
            }
        ]
    };

    var getEndPoint = function(dAttrs) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dAttrs.length; i++) {
                x += dAttrs[i].x;
                y += dAttrs[i].y;
        }
        var point = [x, y];

        return point;
    };

    var path2StartPoint = getEndPoint(path1Attrs.dAttrs);
    var path2Attrs = {
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: path2StartPoint[0],
                y: path2StartPoint[1]
            },
            {
                com: "l",
                x: 0 * s,
                y: 44 * s
            }
        ]
    };


    var getD = function(dAttrs) {
        var d = dAttrs[0].com + dAttrs[0].x + "," + dAttrs[0].y;
        for (var i = 1; i < dAttrs.length; i++) {
                d += " " + dAttrs[i].com + dAttrs[i].x + "," + dAttrs[i].y;
        }

        return d;
    };

    this.draw = function() {
        // line1
        var dAttrs = path1Attrs.dAttrs;
        var d = getD(dAttrs);

        var path = group.addPath(d, path1Attrs.fill);
        path.style("stroke", color)
                .style("stroke-width", path1Attrs.stroke_width)
                .style("stroke-dasharray", path1Attrs.stroke_dasharray);

        // line2
        dAttrs = path2Attrs.dAttrs;
        d = getD(dAttrs);

        path = group.addPath(d, path2Attrs.fill);
        path.style("stroke", color)
                .style("stroke-width", path2Attrs.stroke_width);

        // marker
        var markerStartPoint = getEndPoint(path2Attrs.dAttrs);
        path = group.addArrowHeadDown(markerStartPoint, color, s);

        // add event
        addTooltip();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };

    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};
	
	
// VCE to TOA Link
var VCE_TOA_Link = function(container, s, links) {
    var group = new Group(container);
    //var color = "#008000";
    var color = "#067ab4";

    var pathAttrs = {
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: 50 * s,
                y: 130 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: -44 * s
            }
        ]
    };

    var getEndPoint = function(dAttrs) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dAttrs.length; i++) {
            x += dAttrs[i].x;
            y += dAttrs[i].y;
        }
        var point = [x, y];

        return point;
    };

    var getD = function(dAttrs) {
        var d = dAttrs[0].com + dAttrs[0].x + "," + dAttrs[0].y;
        for (var i = 1; i < dAttrs.length; i++) {
            d += " " + dAttrs[i].com + dAttrs[i].x + "," + dAttrs[i].y;
        }

        return d;
    };

    this.draw = function() {
        // line
        var dAttrs = pathAttrs.dAttrs;
        var d = getD(dAttrs);

        var path = group.addPath(d, pathAttrs.fill);
        path.style("stroke", color)
                .style("stroke-width", pathAttrs.stroke_width);

        // marker
        var markerStartPoint = getEndPoint(pathAttrs.dAttrs);
        path = group.addArrowHeadUp(markerStartPoint, color, s);

        // event
        addTooltip();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};
	
// TOA to VPE Link
var TOA_VPE_Link = function(container, s, links) {
    var group = new Group(container);
    //var color = "#008000";
    var color = "#067ab4";
    var path1Attrs = {
        stroke_dasharray: "15 5 2 5 2 5",
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: 50 * s,
                y: 80 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: -36 * s
            },
            {
                com: "l",
                x: 125 * s,
                y: 0 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: 36 * s
            }
        ]
    };

    var getEndPoint = function(dAttrs) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dAttrs.length; i++) {
            x += dAttrs[i].x;
            y += dAttrs[i].y;
        }
        var point = [x, y];

        return point;
    };

    var path2StartPoint = getEndPoint(path1Attrs.dAttrs);
    var path2Attrs = {
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: path2StartPoint[0],
                y: path2StartPoint[1]
            },
            {
                com: "l",
                x: 0 * s,
                y: 44 * s
            }
        ]
    };


    var getD = function(dAttrs) {
        var d = dAttrs[0].com + dAttrs[0].x + "," + dAttrs[0].y;
        for (var i = 1; i < dAttrs.length; i++) {
            d += " " + dAttrs[i].com + dAttrs[i].x + "," + dAttrs[i].y;
        }

        return d;
    };

    this.draw = function() {
        // line1
        var dAttrs = path1Attrs.dAttrs;
        var d = getD(dAttrs);

        var path = group.addPath(d, path1Attrs.fill);
        path.style("stroke", color)
                .style("stroke-width", path1Attrs.stroke_width)
                .style("stroke-dasharray", path1Attrs.stroke_dasharray);


        // line2
        dAttrs = path2Attrs.dAttrs;
        d = getD(dAttrs);

        path = group.addPath(d, path2Attrs.fill);
        path.style("stroke", color)
                .style("stroke-width", path2Attrs.stroke_width);

        // marker
        var markerStartPoint = getEndPoint(path2Attrs.dAttrs);
        path = group.addArrowHeadDown(markerStartPoint, color, s);
        
        // event
        addTooltip();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };

    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};
	
	
// VPE to TOA Link
var VPE_TOA_Link = function(container, s, links) {
    var group = new Group(container);
    //var color = "#ff0000";
    var color = "#067ab4";

    var path1Attrs = {
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: 50 * s,
                y: 130 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: -44 * s
            }
        ]
    };

    var getEndPoint = function(dAttrs) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dAttrs.length; i++) {
            x += dAttrs[i].x;
            y += dAttrs[i].y;
        }
        var point = [x, y];

        return point;
    };

    var path2StartPoint = getEndPoint(path1Attrs.dAttrs);
    var path2Attrs = {
        stroke_dasharray: "15 5 2 5 2 5",
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: path2StartPoint[0],
                y: path2StartPoint[1] - 6
            },
            {
                com: "l",
                x: 0 * s,
                y: -36 * s
            },
            {
                com: "l",
                x: 95 * s,
                y: 0 * s
            }
        ]
    };

    var getD = function(dAttrs) {
        var d = dAttrs[0].com + dAttrs[0].x + "," + dAttrs[0].y;
        for (var i = 1; i < dAttrs.length; i++) {
            d += " " + dAttrs[i].com + dAttrs[i].x + "," + dAttrs[i].y;
        }

        return d;
    };

    this.draw = function() {
        // line1
        var dAttrs = path1Attrs.dAttrs;
        var d = getD(dAttrs);

        var path = group.addPath(d, path1Attrs.fill);
        path.style("stroke", color)
                .style("stroke-width", path1Attrs.stroke_width);

        // marker
        var markerStartPoint = getEndPoint(path1Attrs.dAttrs);
        path = group.addArrowHeadUp(markerStartPoint, color, s);

        // line2
        dAttrs = path2Attrs.dAttrs;
        d = getD(dAttrs);

        path = group.addPath(d, path2Attrs.fill);
        path.style("stroke", color)
                .style("stroke-width", path2Attrs.stroke_width)
                .style("stroke-dasharray", path2Attrs.stroke_dasharray);
        
        // event
        addTooltip();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    
    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};
	
	
// TOA to CBB
var TOA_CBB_Link = function(container, s, links) {
    var group = new Group(container);
    //var color = "#008000";
    var color = "#067ab4";
    var pathAttrs = {
        stroke_width: 2 * s,
        fill: "none",
        dAttrs: [
            {
                com: "M",
                x: 50 * s,
                y: 44 * s
            },
            {
                com: "l",
                x: 40 * s,
                y: 0 * s
            },
            {
                com: "l",
                x: 0 * s,
                y: 100 * s
            }
        ]
    };

    var getStartPoint = function(dAttrs) {
        var x = dAttrs[0].x;
        var y = dAttrs[0].y;
        var point = [x, y];

        return point;
    };

    var getEndPoint = function(dAttrs) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < dAttrs.length; i++) {
            x += dAttrs[i].x;
            y += dAttrs[i].y;
        }
        var point = [x, y];

        return point;
    };

    var getD = function(dAttrs) {
        var d = dAttrs[0].com + dAttrs[0].x + "," + dAttrs[0].y;
        for (var i = 1; i < dAttrs.length; i++) {
            d += " " + dAttrs[i].com + dAttrs[i].x + "," + dAttrs[i].y;
        }

        return d;
    };

    this.draw = function() {
        // line
        var dAttrs = pathAttrs.dAttrs;
        var d = getD(dAttrs);

        var path = group.addPath(d, pathAttrs.fill);
        path.style("stroke", color)
                .style("stroke-width", pathAttrs.stroke_width);

        // marker1
        var marker1StartPoint = getStartPoint(pathAttrs.dAttrs);
        path = group.addArrowHeadLeft(marker1StartPoint, color, s);

        // marker2
        var marker2StartPoint = getEndPoint(pathAttrs.dAttrs);
        path = group.addArrowHeadDown(marker2StartPoint, color, s);
        
        // event
        addTooltip();
    };

    this.addTransform = function(t) {
        group.addTransform(t);
    };
    
    
    var addTooltip = function() {
        var g = group.getG();
        
        var linksHtml = "";
        if (links.length > 0) {
            linksHtml = "<span>" + links[0] +"</span>";
            for (var i = 1; i < links.length; i++) {
                linksHtml += "<br/><span>" + links[i] + "</span>";
            }
        }
           
        var tip;
        g.on("mouseover", function() {
            var x = d3.event.pageX;
            var y = d3.event.pageY;

            x = x + 15;
	    y = y - 25;
            tip = d3.select("body")
                    .append("div")
                    .attr("class", "pathTooltip")
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(linksHtml);
        });

        g.on("mouseout", function() {
            tip.remove();
        });
    };
};
        
        
        
var PathTopology = function (container, s, vplsPe, pathData) {
    var group = container.append("g");
    
    this.draw = function() {
        var translate;
        var toaBean = pathData.toaBean;
        var vceSvrBean = pathData.vceSvrBean;
        var vpeSvrBean = pathData.vpeSvrBean;
        var crsBean = pathData.crsBean;
			
        var vpls = new VPLS_PATH(group, s, vplsPe);
        vpls.draw();
        translate = "translate(" + (490 * s) + ", " + (0 * s) + ")";
        vpls.addTransform(translate);

        var vce = new VCE_PATH(group, s, vceSvrBean.names);
        vce.draw();
        translate = "translate(" + (630 * s) + ", " + (0 * s) + ")";
        vce.addTransform(translate);

        var vpe = new VPE_PATH(group, s, vpeSvrBean.names);
        vpe.draw();
        translate = "translate(" + (790 * s) + ", " + (0 * s) + ")";
        vpe.addTransform(translate);

        var cbb = new CBB_PATH(group, s, crsBean.names);
        cbb.draw();
        translate = "translate(" + (1020 * s) + ", " + (90 * s) + ")";
        cbb.addTransform(translate);

        var toa = new TOA_PATH(group, s, toaBean.names);
        toa.draw();
        translate = "translate(" + (570 * s) + ", " + (0 * s) + ")";
        toa.addTransform(translate);

        var vpls_toa_link = new VPLS_TOA_Link(group, s, toaBean.links);
        vpls_toa_link.draw();
        translate = "translate(" + (527 * s) + ", " + (0 * s) + ")";
        vpls_toa_link.addTransform(translate);

        var toa_vce_link = new TOA_VCE_Link(group, s, vceSvrBean.links);
        toa_vce_link.draw();
        translate = "translate(" + (570 * s) + ", " + (0 * s) + ")";
        toa_vce_link.addTransform(translate);

        var vce_toa_link = new VCE_TOA_Link(group, s, vceSvrBean.links);
        vce_toa_link.draw();
        translate = "translate(" + (685 * s) + ", " + (0 * s) + ")";
        vce_toa_link.addTransform(translate);

        var toa_vpe_link = new TOA_VPE_Link(group, s, vpeSvrBean.links);
        toa_vpe_link.draw();
        translate = "translate(" + (685 * s) + ", " + (0 * s) + ")";
        toa_vpe_link.addTransform(translate);

        var vpe_toa_link = new VPE_TOA_Link(group, s, vpeSvrBean.links);
        vpe_toa_link.draw();
        translate = "translate(" + (845 * s) + ", " + (0 * s) + ")";
        vpe_toa_link.addTransform(translate);

        var toa_cbb_link = new TOA_CBB_Link(group, s, crsBean.links);
        toa_cbb_link.draw();
        translate = "translate(" + (946 * s) + ", " + (0 * s) + ")";
        toa_cbb_link.addTransform(translate);
        
        translate = "translate(" + (-200) + ", " + 40 + ")";
        this.addTransform(translate);
    };
    
    this.addTransform = function(t) {
        group.attr("transform", t);
    };
};


var Emt2CrsPathTopology = function (container, s, emtName, pathData) {
    var group = container.append("g");
    
    this.draw = function() {
        var translate;
        var emt2Vpls = pathData.emt2Vpls;
        var vpls2Crs = pathData.vpls2Crs;
        var toaBean = vpls2Crs.toaBean;
        var vceSvrBean = vpls2Crs.vceSvrBean;
        var vpeSvrBean = vpls2Crs.vpeSvrBean;
        var crsBean = vpls2Crs.crsBean;
        var vplsPe = emt2Vpls.vplsPes[0];
        var xTrans = calXTrans(emt2Vpls);
        
        var emt = new EMT_PATH(group, s, emtName);
        emt.draw();
        var translate = "translate(" + (xTrans.emt * s) + ", " + (0 * s) + ")";
        emt.addTransform(translate);

        var ipag = new IPAG_PATH(group, s, emt2Vpls);
        ipag.draw();
        translate = "translate(" + (xTrans.ipag * s) + ", " + (100 * s) + ")";
        ipag.addTransform(translate);
			
        var vpls = new VPLS_PATH(group, s, vplsPe);
        vpls.draw();
        translate = "translate(" + (490 * s) + ", " + (0 * s) + ")";
        vpls.addTransform(translate);

        var vce = new VCE_PATH(group, s, vceSvrBean.names);
        vce.draw();
        translate = "translate(" + (630 * s) + ", " + (0 * s) + ")";
        vce.addTransform(translate);

        var vpe = new VPE_PATH(group, s, vpeSvrBean.names);
        vpe.draw();
        translate = "translate(" + (790 * s) + ", " + (0 * s) + ")";
        vpe.addTransform(translate);

        var cbb = new CBB_PATH(group, s, crsBean.names);
        cbb.draw();
        translate = "translate(" + (1020 * s) + ", " + (90 * s) + ")";
        cbb.addTransform(translate);

        var toa = new TOA_PATH(group, s, toaBean.names);
        toa.draw();
        translate = "translate(" + (570 * s) + ", " + (0 * s) + ")";
        toa.addTransform(translate);
        
        var emt_ipag_link = new EMT_IPAG_Link(group, s);
        emt_ipag_link.draw();
        translate = "translate(" + (xTrans.emt_ipag_link * s) + ", " + (0 * s) + ")";
        emt_ipag_link.addTransform(translate);
			
        var ipag_vpls_link = new IPAG_VPLS_Link(group, s);
        ipag_vpls_link.draw();
        translate = "translate(" + (430 * s) + ", " + (0 * s) + ")";
        ipag_vpls_link.addTransform(translate);

        var vpls_toa_link = new VPLS_TOA_Link(group, s, toaBean.links);
        vpls_toa_link.draw();
        translate = "translate(" + (527 * s) + ", " + (0 * s) + ")";
        vpls_toa_link.addTransform(translate);

        var toa_vce_link = new TOA_VCE_Link(group, s, vceSvrBean.links);
        toa_vce_link.draw();
        translate = "translate(" + (570 * s) + ", " + (0 * s) + ")";
        toa_vce_link.addTransform(translate);

        var vce_toa_link = new VCE_TOA_Link(group, s, vceSvrBean.links);
        vce_toa_link.draw();
        translate = "translate(" + (685 * s) + ", " + (0 * s) + ")";
        vce_toa_link.addTransform(translate);

        var toa_vpe_link = new TOA_VPE_Link(group, s, vpeSvrBean.links);
        toa_vpe_link.draw();
        translate = "translate(" + (685 * s) + ", " + (0 * s) + ")";
        toa_vpe_link.addTransform(translate);

        var vpe_toa_link = new VPE_TOA_Link(group, s, vpeSvrBean.links);
        vpe_toa_link.draw();
        translate = "translate(" + (845 * s) + ", " + (0 * s) + ")";
        vpe_toa_link.addTransform(translate);

        var toa_cbb_link = new TOA_CBB_Link(group, s, crsBean.links);
        toa_cbb_link.draw();
        translate = "translate(" + (946 * s) + ", " + (0 * s) + ")";
        toa_cbb_link.addTransform(translate);
        
        translate = "translate(" + (-50) + ", " + 40 + ")";
        this.addTransform(translate);
    };
    
    this.addTransform = function(t) {
        group.attr("transform", t);
    };
    
    var calXTrans = function(emt2Vpls) {
        var len1 = emt2Vpls.ipag1s.length;
        var len2 = emt2Vpls.ipag2s.length;
        
        var xTrans = {
            emt: 110,
            emt_ipag_link: 170,
            ipag: 300
        };
        if (len1 == 0 && len2 == 0) {
            xTrans.emt = 370;
            xTrans.emt_ipag_link = 430;
            xTrans.ipag = 300;
        }
        
        if (len1 == 0 && len2 != 0) {
            xTrans.emt = 168;
            xTrans.emt_ipag_link = 228;
            xTrans.ipag = 300;
        }
        
        if (len1 != 0 && len2 == 0) {
            xTrans.emt = 163;
            xTrans.emt_ipag_link = 223;
            xTrans.ipag = 353;
        }
        
        return xTrans;
    };
};



var Ce2CrsPathTopology = function (container, s, ceName, pathData, alerts, displayTable) {
    var group = container.append("g");
    
    this.draw = function() {
        var translate;
        var ce2Vpls = pathData.ce2Vpls;
        var vpls2Crs = pathData.vpls2Crs;
        var toaBean = vpls2Crs.toaBean;
        var vceSvrBean = vpls2Crs.vceSvrBean;
        var vpeSvrBean = vpls2Crs.vpeSvrBean;
        var crsBean = vpls2Crs.crsBean;
        var vpe2CrsLogicBean = vpls2Crs.vpe2CrsLogicBean;
        var vce2VpeLogicalLinks = vpls2Crs.vce2VpeLogicalLinks;
        var vpe2CrsLogicalLinks = vpls2Crs.vpe2CrsLogicalLinks;
        console.log(vce2VpeLogicalLinks);
        console.log(vpe2CrsLogicalLinks);
        var xTrans = calXTrans(ce2Vpls);
        var vceAlertsByVce = alerts.vceAlertsByVce;
        var vpeAlertsByVpe = alerts.vpeAlertsByVpe;
        
        var ce = new CE_PATH(group, s, ceName);
        ce.draw();
        var translate = "translate(" + (xTrans.ce * s) + ", " + (0 * s) + ")";
        ce.addTransform(translate);
        
        if (xTrans.hasNte) {
            var nte = new NTE_PATH(group, s, ce2Vpls.ntes);
            nte.draw();
            translate = "translate(" + (xTrans.nte * s) + ", " + (0 * s) + ")";
            nte.addTransform(translate);
        }   
        
        if (xTrans.hasEmt) {
            var emt = new EMT_PATH(group, s, ce2Vpls.emts);
            emt.draw();
            translate = "translate(" + (xTrans.emt * s) + ", " + (0 * s) + ")";
            emt.addTransform(translate);
        }
        
        if (xTrans.hasEmux) {
            var emux = new EMUX_PATH(group, s, ce2Vpls.emuxs);
            emux.draw();
            translate = "translate(" + (xTrans.emux * s) + ", " + (0 * s) + ")";
            emux.addTransform(translate);
        }

        if (xTrans.hasIpag1 || xTrans.hasIpag2) {
            var ipag = new IPAG_PATH(group, s, ce2Vpls);
            ipag.draw();
            translate = "translate(" + (xTrans.ipag * s) + ", " + (100 * s) + ")";
            ipag.addTransform(translate);
        }
        
        if (xTrans.hasMpcio) {
            var mpcio = new MPCIO_PATH(group, s, ce2Vpls.mpcios);
            mpcio.draw();
            translate = "translate(" + (xTrans.mpcio * s) + ", " + (0 * s) + ")";
            mpcio.addTransform(translate);
        }
			
        var vpls = new VPLS_PATH(group, s, ce2Vpls.vplsPes);
        vpls.draw();
        translate = "translate(" + (490 * s) + ", " + (0 * s) + ")";
        vpls.addTransform(translate);

        var vce = new VCE_PATH(group, s, vceSvrBean.vce, vceSvrBean.names, vceAlertsByVce, displayTable);
        vce.draw();
        translate = "translate(" + (630 * s) + ", " + (0 * s) + ")";
        vce.addTransform(translate);

        var vpe = new VPE_PATH(group, s, vpeSvrBean.vpe, vpeSvrBean.names, vpeAlertsByVpe, displayTable);
        vpe.draw();
        translate = "translate(" + (790 * s) + ", " + (0 * s) + ")";
        vpe.addTransform(translate);

        var cbb = new CBB_PATH(group, s, crsBean.names);
        cbb.draw();
        translate = "translate(" + (1020 * s) + ", " + (90 * s) + ")";
        cbb.addTransform(translate);

        var toa = new TOA_PATH(group, s, toaBean.names);
        toa.draw();
        translate = "translate(" + (570 * s) + ", " + (0 * s) + ")";
        toa.addTransform(translate);
        
        if (xTrans.hasNte) {
            var nte_link = new Common_Link(group, s, null);
            nte_link.draw();
            translate = "translate(" + (xTrans.nte_link * s) + ", " + (0 * s) + ")";
            nte_link.addTransform(translate);
        }
        
        if (xTrans.hasCircuit1) {
            var circuit1 = new Common_Link(group, s, ce2Vpls.circuit1s);
            circuit1.draw();
            translate = "translate(" + (xTrans.circuit1 * s) + ", " + (0 * s) + ")";
            circuit1.addTransform(translate);
        }
        
        if (xTrans.hasCircuit2) {
            var circuit2 = new Common_Link(group, s, ce2Vpls.circuit2s);
            circuit2.draw();
            translate = "translate(" + (xTrans.circuit2 * s) + ", " + (0 * s) + ")";
            circuit2.addTransform(translate);
        }
        
        if (xTrans.hasCircuit4) {
            var circuit4 = new Common_Link(group, s, ce2Vpls.circuit4s);
            circuit4.draw();
            translate = "translate(" + (xTrans.circuit4 * s) + ", " + (0 * s) + ")";
            circuit4.addTransform(translate);
        }
        
        if (xTrans.hasCircuit5) {
            var circuit5 = new Common_Link(group, s, ce2Vpls.circuit5s);
            circuit5.draw();
            translate = "translate(" + (xTrans.circuit5 * s) + ", " + (0 * s) + ")";
            circuit5.addTransform(translate);
        }

        var vpls_toa_link = new VPLS_TOA_Link(group, s, toaBean.links);
        vpls_toa_link.draw();
        translate = "translate(" + (527 * s) + ", " + (0 * s) + ")";
        vpls_toa_link.addTransform(translate);

        var toa_vce_link = new TOA_VCE_Link(group, s, vceSvrBean.links);
        toa_vce_link.draw();
        translate = "translate(" + (570 * s) + ", " + (0 * s) + ")";
        toa_vce_link.addTransform(translate);

        var vce_toa_link = new VCE_TOA_Link(group, s, vceSvrBean.links);
        vce_toa_link.draw();
        translate = "translate(" + (685 * s) + ", " + (0 * s) + ")";
        vce_toa_link.addTransform(translate);

        var toa_vpe_link = new TOA_VPE_Link(group, s, vpeSvrBean.links);
        toa_vpe_link.draw();
        translate = "translate(" + (685 * s) + ", " + (0 * s) + ")";
        toa_vpe_link.addTransform(translate);

        var vpe_toa_link = new VPE_TOA_Link(group, s, vpeSvrBean.links);
        vpe_toa_link.draw();
        translate = "translate(" + (845 * s) + ", " + (0 * s) + ")";
        vpe_toa_link.addTransform(translate);

        var toa_cbb_link = new TOA_CBB_Link(group, s, crsBean.links);
        toa_cbb_link.draw();
        translate = "translate(" + (946 * s) + ", " + (0 * s) + ")";
        toa_cbb_link.addTransform(translate);
        
        // logical links
        var vpls_vce_link = new Logical_Link(group, s, 64, []);
        vpls_vce_link.draw();
        translate = "translate(" + (565 * s) + ", " + (0 * s) + ")";
        vpls_vce_link.addTransform(translate);
        
        var vce_vpe_link = new Logical_Link(group, s, 84, vce2VpeLogicalLinks);
        vce_vpe_link.draw();
        translate = "translate(" + (705 * s) + ", " + (0 * s) + ")";
        vce_vpe_link.addTransform(translate);
        
        var vpe_crs_link = new Logical_Link(group, s, 94, vpe2CrsLogicalLinks);
        vpe_crs_link.draw();
        translate = "translate(" + (865 * s) + ", " + (0 * s) + ")";
        vpe_crs_link.addTransform(translate);
        
        
        // Center topology view
        var ceDefaultX = 50;
        var ceX = ceDefaultX + xTrans.ce;
        var svgWidth = container.node().getBoundingClientRect().width;
        var gWidth = group.node().getBBox().width;
        var topoPadding = 20;
        
        var topoXTrans = (svgWidth - gWidth) / 2 - ceX;
        if (gWidth + topoPadding >= svgWidth) {
            container.attr("width", gWidth + topoPadding);
            topoXTrans = -ceX + topoPadding;
        }
        
        translate = "translate(" + topoXTrans + ", " + 40 + ")";
        this.addTransform(translate);
    };
    
    this.addTransform = function(t) {
        group.attr("transform", t);
    };
    
    var calXTrans = function(ce2Vpls) {
        var hasNte = (ce2Vpls.ntes.length > 0);
        var hasEmt = (ce2Vpls.emts.length > 0);
        var hasEmux = (ce2Vpls.emuxs.length > 0);
        var hasIpag1 = (ce2Vpls.ipag1s.length > 0);
        var hasIpag2 = (ce2Vpls.ipag2s.length > 0);
        var hasMpcio = (ce2Vpls.mpcios.length > 0);
        var hasCircuit1 = (ce2Vpls.circuit1s.length > 0);
        var hasCircuit2 = (ce2Vpls.circuit2s.length > 0);
        var hasCircuit3 = (ce2Vpls.circuit3s.length > 0);
        var hasCircuit4 = (ce2Vpls.circuit4s.length > 0);
        var hasCircuit5 = (ce2Vpls.circuit5s.length > 0);
        
        var xTrans = {
            ce: -250,
            nte_link: -190,
            nte: -130,
            emt_link: -70,
            emt: -10,
            emux: -10,
            ipag_link: 50,
            ipag: 180,
            mpcio_link: 310,
            mpcio: 370,
            vpls_link: 430,
            circuit1: -70,
            circuit2: 50,
            circuit3: 0,
            circuit4: 310,
            circuit5: 430,
            hasNte: hasNte,
            hasEmt: hasEmt,
            hasEmux: hasEmux,
            hasIpag1: hasIpag1,
            hasIpag2: hasIpag2,
            hasMpcio: hasMpcio,
            hasCircuit1: hasCircuit1,
            hasCircuit2: hasCircuit2,
            hasCircuit3: hasCircuit3,
            hasCircuit4: hasCircuit4,
            hasCircuit5: hasCircuit5
        };
        
        if (!hasNte) {
            xTrans.ce = xTrans.ce + 120;
        }
        
        if (!hasEmt && !hasEmux) {
            xTrans.ce = xTrans.ce + 120;
            xTrans.nte_link = xTrans.nte_link + 120;
            xTrans.nte = xTrans.nte + 120;
            xTrans.circuit1 = xTrans.circuit1 + 120;
        }
        
        var xOffset = 0;
        if (!hasIpag1 && hasIpag2) {
            xOffset = 58;
        }
        if (hasIpag1 && !hasIpag2) {
            xOffset = 53;
        }
        if (!hasIpag1 && !hasIpag2) {
            xOffset = 260;
        }
        xTrans.ce = xTrans.ce + xOffset;
        xTrans.nte_link = xTrans.nte_link + xOffset;
        xTrans.nte = xTrans.nte + xOffset;
        xTrans.circuit1 = xTrans.circuit1 + xOffset;
        xTrans.emt = xTrans.emt + xOffset;
        xTrans.emux = xTrans.emux + xOffset;
        xTrans.circuit2 = xTrans.circuit2 + xOffset;
        
        if (!hasMpcio) {
            xOffset = 120;
            xTrans.ce = xTrans.ce + xOffset;
            xTrans.nte_link = xTrans.nte_link + xOffset;
            xTrans.nte = xTrans.nte + xOffset;
            xTrans.circuit1 = xTrans.circuit1 + xOffset;
            xTrans.emt = xTrans.emt + xOffset;
            xTrans.emux = xTrans.emux + xOffset;
            xTrans.circuit2 = xTrans.circuit2 + xOffset;
            xTrans.ipag = xTrans.ipag + xOffset;
        }
        
        return xTrans;
    };
};