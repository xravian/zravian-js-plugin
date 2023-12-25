// ==UserScript==
// @name			spy
// @namespace		zravian.test
// @version			beta
// @description	for 用于自动发起侦查
// @author			xravian
// @match			*.zravian.com/*
// @icon			data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

function GetPageType() {
    var type = '';
    var url = window.location.href;
    

    console.log(type);
}

function AddSpyLink() {
    var url = window.location.href;
    if (url.indexOf('village3.php') < 0) { return; }

    var tb = _('options');
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var a = '<a href="#" onclick="">» Add to spy list</a>';

    tr.appendChild(td);
    tb.appendChild(tr);
}


(function() {
    AddSpyLink();
})();