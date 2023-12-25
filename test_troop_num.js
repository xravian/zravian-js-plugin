// ==UserScript==
// @name			troop_num
// @namespace		zravian.test
// @version			beta
// @description	for 用于统计村庄兵力
// @author			xravian
// @match			*.zravian.com/*
// @icon			data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant			GM_setValue
// @grant			GM_getValue
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

function CalTroopNum() {
    //                       |       Roman       |      Teutons      |        Gaul       |
    var troop_r = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);     //RallyPoint里的兵力
    var troop_s = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);     //普兵营里的兵力
    var troop_S = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);     //大兵营里的兵力
    var f = _('build').getElementsByTagName('form')[0];
    var tb1 = f.children[0];
    var td1 = tb1.getElementsByTagName('td');
    for (var i=3; i<td1.length-1; i=i+3) {
        var txt = td2[i].innerHTML;
        //console.log(txt);
        var r = txt.match(/class="unit[ ]u(\d+)".+\(Available:[ ](\d+)\)</);
        troop_r[r[1]] = parseInt(r[2]);
    }

    var tb2 = f.nextElementSibling;
    if (tb2.nodeName.toLowerCase() == 'table') {
        var td2 = tb2.getElementsByTagName('td');
        console.log(td2.length);
        for (var i = 2; i < td2.length - 1; i = i + 2) {
            var txt = td2[i].innerHTML;
            var r = txt.match(/class="unit[ ]u(\d+)".+>[ ](\d+)[ ]/);
            troop_r[r[1]] += parseInt(r[2]);
        }
    }


}

(function() {
    CalTroopNum();
})();
