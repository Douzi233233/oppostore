var storage = storages.create("OPPO商城小铺");

var COOKIE = storage.get("ck");
var UA = storage.get("ua");


var url = "https://www.heytap.com/cn/oapi/goods/web/rebate/goods/1000";
ret = http.get(url, {
    headers: {
     //"Host": "www.heytap.com",
     "Connection": "keep-alive",
     "s_channel": "h5_m",
     "ut": "direct",
     "uc": "zhounianqing",
     "Cache-Control": "no-cache",
     "um": "peijian",
     "User-Agent":UA,
     "Accept": "application/json, text/plain, */*",
     "source_type": "504",
     "utm_medium": "share_oppo_appstore",
     "us": "IOThuichang",
     "utm_source": "share_oppo_appstore",
     "Referer": "https://www.heytap.com/cn/m/inviteGift/index?referer=MmZZSlI0SmcrU1Foa2hscGF4UTFGdz09&rebateId=1000&utm_campaign=flzhuanqu&utm_medium=share_oppo_appstore&utm_source=share_oppo_appstore&utm_term=MmZZSlI0SmcrU1Foa2hscGF4UTFGdz09&end=",
     "Accept-Language": "zh-CN,zh;q=0.9",
     "Cookie": COOKIE+";utm_medium=share_oppo_appstore;utm_source=share_oppo_appstore;referer=MmZZSlI0SmcrU1Foa2hscGF4UTFGdz09",
     "Content-Type": "text/html; charset=UTF-8"
}
});






function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}




mainEngine.emit("control",index);
