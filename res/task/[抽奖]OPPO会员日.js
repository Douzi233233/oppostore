var storage = storages.create("OPPO商城小铺");

var COOKIE = storage.get("ck");
var UA = storage.get("ua");
var mypassword = storage.get("password");
http.__okhttp__.setTimeout(10000);

var headers= {
     "Host": "hd.oppo.com",
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



if (storage.get("[抽奖]OPPO会员日") == "true") {
    开始();
}





function 开始() {

        lottery("1825", "1606", "OPPO会员日", "", "");


}





function peng(aid) {
    var url = "https://hd.oppo.com/task/list?aid=" + aid;
    ret = http.get(url, {
        headers: headers,
    });

}




function lottery(aid, lid, name, sku, spu) {
    if (aid != 815 && lid != 460) {
        report("日志", "--------" + name + "抽奖--------");

        var i = 0;
        while (i < 10) {


            sleep(3000);

            peng(aid);


            var url = "https://hd.oppo.com/platform/lottery";
            r = http.post(url, {
                "aid": aid,
                "lid": lid,
                "mobile": "",
                "authcode": "",
                "captcha": "",
                "isCheck": 0,
                "source_type": "501",
                "s_channel": "oppo_appstore",
                "sku": sku,
                "spu": spu,

            }, {
                headers: headers,
            }).body.json();
            if (r['msg'] == "提交成功") {
                report("日志", "抽奖结果：" + r['data']['goods_name'])
            } else {
                report("日志", r['msg']);
                break;
            }
        }
    } else {
        report("日志", "--------" + name + "抽奖--------");

        var i = 0;
        while (i < 10) {


            sleep(3000);


            //

            var url = "https://hd.oppo.com/platform/lottery";
            r = http.post(url, {
                "aid": aid,
                "lid": lid,
                "mobile": "",
                "authcode": "",
                "captcha": "",
                "isCheck": 0,
                "source_type": "501",
                "s_channel": "oppo_appstore",
                "sku": sku,
                "spu": spu,
            }, {
                headers: headers,
            }).body.json();
            if (r['data']['goods_name'] == "") {
                report("日志", "抽奖结果：" + r['data']['goods_name'])

                break;
            } else {
                report("日志", "抽奖结果：" + r['data']['goods_name'])

            }
        }



    }


}

function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}

mainEngine.emit("control",index);