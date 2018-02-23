/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var container = d3.select("svg");

/*
var vpeProps = {
    x: 100,
    y: 100,
    tx: 0,
    ty: 0,
    vpename: "snbca401me6",
    vmname1: "snbca401me601fej",
    vmname2: "snbca401me601rej",
    pname: "sagca125sd9",
    hasAlert: true
};

var vceProps = {
    x: 100,
    y: 100,
    tx: 0,
    ty: 0,
    vpename: "snbca401me6",
    vmname: "snbca401me601fej",
    pname: "sagca125sd9",
    hasAlert: true
};
*/

/*
var edge = new TOPO.EdgeCommon(container);
var props = {   // path attribute
            sx: 10,
            sy: 10,
            tx: 300,
            ty: 500,
            stroke: "#067ab4" ,
            stroke_width: "2px",
            fill: "none"
        };

edge.draw(props);
*/
/*
var aicCloud = new TOPO.AicCloud(container);
var props = {
    x: 100,
    y: 100,
    width: 300,
    height: 500,
    aicName: "hustx-esx-az01"
};
aicCloud.draw(props);
*/
/*
var alertTopo = new TOPO.AlertTopo(container);
alertTopo.draw();

var custTopo = new TOPO.CustTopo(container);
custTopo.draw();

var rect = new TOPO.NodeRect(container);
rect.draw();

var cloud = new TOPO.NodeCloud(container);
cloud.draw();


var vpe2 = new TOPO.NodeVpe2(container);
vpe2.draw();

var ipag = new TOPO.NodeIpag(container);
ipag.draw();
*/

var path = new TOPO.PathTopo(container);
path.draw();
