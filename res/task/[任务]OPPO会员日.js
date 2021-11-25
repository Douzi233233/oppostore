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




if(storage.get("[任务]OPPO会员日") == "true"){
    开始();
}

function 开始(){
    action(1825);
}


function share(count,goods){
    for (var i = 0; i < count; i++) {
            sleep(2000);
            var url = "https://hd.oppo.com/app/share";
            ret = http.post(url, {
                "share_id": goods,
            }, {
                headers: headers,
            }).body.json();
            report("日志",ret['msg']);
        }
}

function peng(aid) {
    var url = "https://hd.oppo.com/task/list?aid=" + aid;
    ret = http.get(url, {
        headers: headers,
    });

}


function action(myaid) {
    taskret = http.get("https://hd.oppo.com/task/list?aid=" + myaid, {
        headers: headers,
    }).body.json();
    for (var i = 0; i < 10; i++) {
        if (taskret['data'][i] != null) {

            var aid = taskret['data'][i]['t_index'].split("i")[0];
            var t_index = taskret['data'][i]['t_index'];
            storage.put("tasktitle", taskret['data'][i]['title']);
            sleep(2000);
            任务("finish", aid, t_index);
            sleep(1000);
            peng(aid);
            sleep(1000);
            任务("award", aid, t_index);
        }
    }

}



function 任务(xx, yy, zz) {

    sleep(2000);

    r = http.post("https://hd.oppo.com/task/" + xx, {
        "aid": yy,
        "t_index": zz,
    }, {
        headers: headers,
    }).body.json();
    var b = r.msg;
    report("日志","[" + storage.get("tasktitle") + "]:" + b);

}







function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}
mainEngine.emit("control",index);