      var storage = storages.create("OPPO商城小铺");

      var mypassword = storage.get("password");
      var COOKIE = storage.get("ck");
      //log(COOKIE);
      var UA = storage.get("ua");
      http.__okhttp__.setTimeout(20000)
      //设置联网超时为10s
      

      var headers = {
          //"Host": "hd.oppo.com",
          "Connection": "keep-alive",
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://hd.oppo.com",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          "Referer": "https://hd.oppo.com/act/m/2019/jifenfanbei/index.html?us=qiandao&um=task",
          "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "Cookie": COOKIE,

      };

      //var COOKIE = storage.get("ck")
      ret = http.get("https://store.oppo.com/cn/oapi/users/web/member/check?unpaid=0&cartNumber=0", {
          headers: headers,
      }).body.json();
      var mm = ret['data'];
      if (ret['code'] == 200 && mm != null) {
          storage.put("id", ret['data']['id']);
          storage.put("name", ret['data']['name']);

          var b = String(ret['data']['id']).split('');
          var front = b[2] + b[1] + b[0];
          var mid = b[5] + b[4] + b[3];
          var last = b[8] + b[7] + b[6];
          sleep(2000);
          var url = "https://ocs-cn-north1.heytapcs.com/titans-usercenter-avatar-bucket-cn/" + last + "/" + mid + "/" + front + "/" + ret['data']['id'] + ".jpg";
          storage.put("touxiang", url);
          var temp = http.get('https://store.oppo.com/cn/oapi/credits/web/credits/show', {
              headers: headers,
          }).body.json();
          var usercredit = temp.data.userCredits;
          storage.put("credita", usercredit);
          sleep(1500);
          var 验证 = http.get("http://49.232.71.243/xyh/id.txt", {
              "headers": {
                  "Authorization": mypassword,
              }
          }).body.string();

          if (验证.indexOf(storage.get("id")) >= 0) {
              storage.put("验证", "true");
              toast("帐号资格认证成功");
          } else {
              storage.put("验证", "false");
              toast("帐号资格认证失败");
          }
          sleep(2000);
          ret = http.get("https://msec.opposhop.cn/users/vi/member/getMemberUserInfo", {
              headers: headers,
          }).body.json();
          if (ret['meta']['code'] == 200) {
              log(ret['detail'][0]['remark']);
              storage.put("mycard", ret['detail'][0]['remark']);
              storage.put("ck状态", "true");
          }
          sleep(2000);
          ret = http.get("https://store.oppo.com/cn/oapi/omp-web/web/dailyCash/getUserBalance?activityId=1", {
              headers: headers,
          }).body.json();
          if (ret['code'] == 200) {
              storage.put("共有现金", ret['data']);
          }
          report("日志", "登录成功");
      }else{
          toast("请输入正确数据");
      }

      function report(X, Y) {
          Y = Y || false;
          events.broadcast.emit("日志", {
              name: X,
              data: Y
          });
      }