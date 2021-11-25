var storage = storages.create("OPPO商城小铺");


var UA = storage.get("ua");
var mypassword = storage.get("password");
http.__okhttp__.setTimeout(10000);



if(storage.get("ck")!=null){
if(storage.get("ck").indexOf('Op_lpvt_f18367c55fd7569d9000cd9986846577=')!=-1&&storage.get("ck").indexOf('Op_lvt_f18367c55fd7569d9000cd9986846577=')!=-1){
var time1=storage.get("ck").split("Op_lpvt_f18367c55fd7569d9000cd9986846577=")[1].split(';')[0];
var time2=storage.get("ck").split("Op_lvt_f18367c55fd7569d9000cd9986846577=")[1].split(';')[0];
var COOKIE=storage.get("ck").replace(time1,Math.round(new Date().getTime()/1000)).replace(time2,Math.round(new Date().getTime()/1000-10000)+','+Math.round(new Date().getTime()/1000));
}else{
var COOKIE=storage.get("ck");
}
}

var headers= {
     "Host": "store.oppo.com",
     "Connection": "keep-alive",
     "Accept": "application/json, text/javascript, */*; q=0.01",
     "X-Requested-With": "XMLHttpRequest",
     "User-Agent":UA,
     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
     "Origin": "https://hd.oppo.com",
     "Sec-Fetch-Site": "same-origin",
     "Sec-Fetch-Mode": "cors",
     "Sec-Fetch-Dest": "empty",
     "Referer": "https://store.oppo.com/cn/app/taskCenter/index",
     "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
     "Cookie":COOKIE,
        
    };

log(COOKIE);


creditfresh();
cashfresh();



function creditfresh() {

    httemp = http.get("https://store.oppo.com/cn/oapi/credits/web/credits/show", {
        headers: headers,
    }).body.json();
    if (httemp['code'] == 200) {
        
        report("登录", "登录成功");

        var usercredit = httemp.data.userCredits;
        storage.put("credita", usercredit);

    } else {
        report("登录", "登录失败");

    }


}

function cashfresh() {
    cashret = http.get("https://store.oppo.com/cn/oapi/omp-web/web/dailyCash/getUserBalance?activityId=1", {
        headers:{
     "Host": "store.oppo.com",
     "Connection": "keep-alive",
     "Accept": "application/json, text/javascript, */*; q=0.01",
     "X-Requested-With": "XMLHttpRequest",
     "User-Agent":UA,
     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
     "Origin": "https://hd.oppo.com",
     "Sec-Fetch-Site": "same-origin",
     "Sec-Fetch-Mode": "cors",
     "Sec-Fetch-Dest": "empty",
     "Referer": "https://store.oppo.com/cn/app/cashRedEnvelope?activityId=1&us=qiandao&um=task",
     "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
     "Cookie":COOKIE,
        
    }
    }).body.json();
    if (cashret['code'] == 200) {
        storage.put("共有现金", cashret['data']);
    }


}


function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}

