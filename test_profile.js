// ==UserScript==
// @name			profile
// @namespace		zravian.test
// @version			beta
// @description	for 用于profile页面的测试
// @author			xravian
// @match			*.zravian.com/*
// @icon			data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
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

function ExtProfilePage() {
    var url = window.location.href;
    if (url.indexOf('profile.php') < 0) { return; }

    var profile_table = _('profile');
    var user_name = profile_table.children[0].children[0].children[0].innerHTML;
    console.log('玩家用户名: ' + user_name);

    var table_village = _('villages');
    if (table_village == null) {
        return null;
        console.log('找不到村庄table');
    }

	//攻击icon
	var img = '<img src="assets/x.gif" class="iReport iReport2" style="height:12px;">';

    //children[0]是thead，children[1]是tbody，tbody下面是每一个tr
    var tbody = table_village.children[1];
    var tr = tbody.getElementsByTagName('tr');
    for (var i = 0; i < tr.length; i++) {

        var vid1 = GetCurVillageID();

        //获取每个村庄的vid
        var td = tr[i].getElementsByTagName('td');
        var href = td[0].children[0].getAttribute('href');
        var vid2 = href.substr(href.indexOf('=') + 1);


        var k = vid1 + '-' + vid2;
        var t = GM_getValue(k, 'NaN');

        if (td[0].children.length > 1) {
            td[0].innerHTML = td[0].children[0].outerHTML + '<a href="v2v.php?id=' + vid2 + '">' + img +'</a>';
            td[0].innerHTML += '<span class="none3">(capital)</span> (T=' + t + ')';
        } else {
            td[0].innerHTML += '<a href="v2v.php?id=' + vid2 + '">' + img +'</a> (T=' + t + ')';
        }

        var vname = td[0].children[0].innerHTML;
        var x = parseInt(td[2].children[0].innerHTML.replace('(',''));
        var y = parseInt(td[2].children[2].innerHTML.replace('(',''));

        console.log(vname + '\t' + vid2 + '\t' + x + '|' + y);
    }
}

(function() {
    ExtProfilePage();
})();
