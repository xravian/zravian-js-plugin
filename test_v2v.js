// ==UserScript==
// @name			v2v
// @namespace		zravian.test
// @version			beta
// @description	for 用于v2v页面的测试
// @author			xravian
// @match			*.zravian.com/*
// @icon			data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant			GM_setValue
// ==/UserScript==

function GetCurVillageID() {
    var vlist_table = _('vlist');
    if (vlist_table == null) {
        //还没有分村的时候没有village列表，获取不到当前村庄
        console.log('只有一个村庄，就是当前村庄');
        return 0;
    }

    var tr = vlist_table.children[1].getElementsByTagName('tr');
    for (var i = 0; i < tr.length; i++) {
        var a = tr[i].getElementsByTagName('td')[1].children[0].children[0];
        if (a.getAttribute('style') != null) {
            var vid = a.getAttribute('href').split('=')[1];
            return vid;
        }
    }

    return 0;
}

function ExtSendTroopPage() {
    var info_table = _('short_info');
    if (info_table == null) { return; }

    var t1 = parseInt(document.getElementsByName('t[1]')[0].value);
    var t2 = parseInt(document.getElementsByName('t[2]')[0].value);
    var t3 = parseInt(document.getElementsByName('t[3]')[0].value);
    var t5 = parseInt(document.getElementsByName('t[5]')[0].value);
    var t6 = parseInt(document.getElementsByName('t[6]')[0].value);

    var res = t1*40 + t2*20 + t3*50 + t5*100 + t6*70;
    console.log(res);

    var tr = document.createElement("tr");
    info_table.children[0].appendChild(tr);
    tr.innerHTML = '<th>Expect:</th><td>' + res.toLocaleString() + '</td>';
}

function SaveTimeDuration() {
    var info_table = _('short_info');
    if (info_table == null) { return; }

    var tbody = info_table.children[0];
    var a = tbody.children[0].children[1].children[0];
    
    var vid1 = GetCurVillageID();
    var vid2 = a.getAttribute('href').split('=')[1];
    var k = vid1 + '-' + vid2;

    var html = document.getElementsByClassName('infos')[0].innerHTML;
    var r = html.match(/in[ ](\d:\d\d:\d\d)[ ][ ]at/);
    console.log(r[1]);

    GM_setValue(k, r[1]);
}

(function() {
    SaveTimeDuration();
})();