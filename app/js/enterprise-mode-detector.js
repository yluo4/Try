/* 
    add the following to the web page

    <body onload="detectIfEnterpriseMode()"> 
 */
function detectIfEnterpriseMode() {
    // set function vars

    var EMCheck = navigator.userAgent;
    var bwow64 = (EMCheck.indexOf("WOW64") > -1);  //With IE 8 this and Trident/4.0 are in the header
    var btrident4 = (EMCheck.indexOf("Trident/4.0") > -1);  //AT&T Enterprise Mode on
    var btrident7 = (EMCheck.indexOf("Trident/7.0") > -1);  //AT&T Enterprise Mode off
    var bIsFirefox = (EMCheck.indexOf("Firefox") > -1);
    var bIsChrome = (EMCheck.indexOf("Chrome") > -1);
    if (btrident4 && !(bwow64)) {
        alert('IE 11 Enterprise Mode is Checked\nINSIGHT 2.0 does NOT work in IE11 with Enterprise Mode checked.\nTo continue please select "Tools > and uncheck Enterprise Mode".');
    }

}


