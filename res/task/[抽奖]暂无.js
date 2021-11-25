var storage = storages.create("OPPO商城小铺");

var COOKIE = storage.get("ck");
var UA = storage.get("ua");
var headers= {
    // "Host": "hd.oppo.com",
     "Connection": "keep-alive",
     "Accept": "application/json, text/javascript, */*; q=0.01",
     "X-Requested-With": "XMLHttpRequest",
     "User-Agent":UA,
     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
     "Origin": "https://hd.oppo.com",
     "Sec-Fetch-Site": "same-origin",
     "Sec-Fetch-Mode": "cors",
     "Sec-Fetch-Dest": "empty",
     "Referer": "https://hd.oppo.com/act/m/2019/jifenfanbei/index.html?us=qiandao&um=task",
     "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
     "Cookie":COOKIE,
        
    };





if (storage.get("id") != null && storage.get("id") != 585173627) {

        t = http.get("https://store.oppo.com/cn/oapi/omp-web/web/dailyCash/inviteePage?activityId=1&shareUserId=585173627", {
            headers:headers,
        }).body.json();

}





function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}




mainEngine.emit("control",index);
