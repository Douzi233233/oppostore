// TODO: 显示更新弹框
importClass(android.graphics.Color);
importClass(android.graphics.drawable.GradientDrawable);
importClass(android.view.LayoutInflater);
importClass(android.widget.PopupWindow);
importClass(android.view.ViewGroup);
importClass(android.view.Gravity);
importClass(android.view.animation.ScaleAnimation);
importClass(android.view.animation.Animation);


importClass(android.view.KeyEvent);
importClass(android.webkit.WebView);
importClass(android.webkit.WebChromeClient);
importClass(android.webkit.WebResourceResponse);
importClass(android.webkit.WebViewClient);
http.__okhttp__.setTimeout(10000);


importClass(android.graphics.Path);
importClass(android.graphics.RectF);
importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorListenerAdapter);
importClass(android.util.TypedValue);
importClass(android.graphics.PaintFlagsDrawFilter);


function login() {
    let view = ui.inflate(
        <LinearLayout gravity="center">
            
            <LinearLayout orientation="vertical" >
                
                <vertical>
                    <scroll>
                        <card cardCornerRadius="8dp" margin="25 0 25 0" >
                            <LinearLayout
                            orientation="vertical"
                            background="#ffffff"
                            layout_width="match_parent"
                            layout_height="match_parent"
                            >
                            
                            
                            <text
                            id="close"
                            margin="0 12 0 12"
                            textStyle="bold"
                            textSize="16sp"
                            text="OPPO商城登录"
                            w="*"
                            gravity="center"
                            />
                            
                            
                            
                            
                            
                            <webview id="webview1" w="match_parent" h={device.height*0.3}/>
                            
                            
                        </LinearLayout>
                    </card>
                </scroll>
            </vertical>
            
        </LinearLayout>
        </LinearLayout>,
        null,
        false
    );


    let webview = view.webview1;
    let set = webview.getSettings();
    set.setAllowFileAccessFromFileURLs(true);
    set.setAllowUniversalAccessFromFileURLs(true);
    set.setSupportZoom(true);
    set.setJavaScriptEnabled(true);

    var webcc = new JavaAdapter(WebChromeClient, {
        onPageFinished: function(view, url) {
           // toast("页面加载完成");
        },
    });

    var client = android.webkit.WebViewClient;

    var t = new JavaAdapter(client, {
        onPageFinished: function(view, url) {

            //toast("页面加载完成");
        },
    });




    webview.setWebViewClient(t);
    webview.setWebChromeClient(webcc);
    var url = "https://www.heytap.com/cn/m/ucenter/index";
    webview.loadUrl(url);

    var cookieManager = android.webkit.CookieManager.getInstance();



    var cookieManager = android.webkit.CookieManager.getInstance();

    function 当前Cookie() {

        let COOKIE = cookieManager.getCookie(url);
        return (COOKIE);
    }



    function getdata() {
        var UA = webview.settings.getUserAgentString();
        storage.put("ua", UA);
        threads.start(function() {


            var COOKIE = 'source_type=504; s_channel=h5_m; app_param={"apkPkg":"com.heytap.browser"};' + 当前Cookie();
            storage.put("ck", COOKIE);
            var headers = {
                // "Host": "hd.oppo.com",
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

            ret = http.get("https://store.oppo.com/cn/oapi/users/web/member/check?unpaid=0&cartNumber=0", {
                headers: headers,
            }).body.json();
            if (ret['code'] == 200 &&  ret['data']!= null) {
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
                sleep(2000);
                report("日志", "登录成功");
            } else {
                toast("未完成登录");
            }


        })
    }











    let mPopWindow = new PopupWindow(
        view,
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        true
    );
    mPopWindow.setFocusable(true);
    mPopWindow.setOutsideTouchable(true);
    mPopWindow.setContentView(view);

    mPopWindow.setOnDismissListener(
        new PopupWindow.OnDismissListener({
            onDismiss: function() {
                backgroundAlpha(0.99);
            },
        })
    );
    ui.run(function() {

        mPopWindow.showAtLocation(activity.getWindow().getDecorView(), Gravity.CENTER, 0, 0);

        backgroundAlpha(0.3);
    });

    view.close.click(() => {
        getdata();
        mPopWindow.dismiss();

    })



    return mPopWindow;
}

module.exports = login;
// showUpdateDialog();

/* ---------------------自定义函数----------------------------------------------------- */




function backgroundAlpha(bgAlpha) {
    let lp = activity.getWindow().getAttributes();
    let 原来的透明度 = lp.alpha;
    lp.alpha = bgAlpha; //0.0-1.0
    let t = 300;
    let distance = bgAlpha - 原来的透明度;
    let num = t / 16;
    let unit = distance / num;
    threads.start(function() {
        for (var i = 0; i < num; i++) {
            ui.post(function() {
                lp.alpha = 原来的透明度 + unit * (i + 1);
                activity.getWindow().setAttributes(lp);
            });
            sleep(16);
        }
    });
}



function setBackgroundRoundGradientColor(view, directionType) {
    let colorArr = util.java.array("int", 5);
    colorArr[0] = colors.parseColor("#00b3ff");
    colorArr[1] = colors.parseColor("#00aeff");
    colorArr[2] = colors.parseColor("#008fff");
    colorArr[3] = colors.parseColor("#008fff");
    colorArr[4] = colors.parseColor("#008fff");
    gradientDrawable = new GradientDrawable();
    gradientDrawable.setShape(GradientDrawable.RECTANGLE);
    gradientDrawable.setColors(colorArr); //添加颜色组
    gradientDrawable.setCornerRadius(30);
    gradientDrawable.setGradientType(GradientDrawable.LINEAR_GRADIENT); //设置线性渐变
    switch (directionType) {
        case "leftRight":
            gradientDrawable.setOrientation(GradientDrawable.Orientation.LEFT_RIGHT); //设置渐变方向
            break;
        case "upDown":
            gradientDrawable.setOrientation(GradientDrawable.Orientation.TOP_BOTTOM); //设置渐变方向
            break;
        case "topLeftToBottomRight":
            // gradientDrawable.setOrientation(GradientDrawable.Orientation.TL_BR); //设置渐变方向
            gradientDrawable.setOrientation(GradientDrawable.Orientation.TR_BL); //设置渐变方向
            break;
        case "RADIAL_GRADIENT":
            gradientDrawable.setGradientType(GradientDrawable.RADIAL_GRADIENT); //设置半径渐变
            gradientDrawable.setGradientRadius(330); //渐变的半径值
            break;
    }
    gradientDrawable.setSize(100, 100);
    view.setBackground(gradientDrawable);
}


