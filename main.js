"ui";





importClass(android.view.View);
importClass(android.graphics.Color);
importClass(android.graphics.drawable.GradientDrawable);
importClass(android.text.Spannable);
importClass(android.text.SpannableStringBuilder);
importClass(android.text.style.ForegroundColorSpan);
importClass(android.graphics.LinearGradient);
importClass(android.graphics.Shader);
importClass(android.graphics.Bitmap);
importClass(android.graphics.BitmapShader);
importClass(android.view.WindowManager);
importClass(android.widget.ArrayAdapter);
importClass(android.widget.AdapterView);
importClass(android.net.Uri);
importClass(java.util.ArrayList);
importClass(android.graphics.PaintFlagsDrawFilter);
importClass(android.graphics.Color);
importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorListenerAdapter);
importClass(android.util.TypedValue);


var storage = storages.create("OPPO商城小铺");


if (storage.get("touxiang") == null) {
    var head = "https://ocs-cn-north1.heytapcs.com/titans-usercenter-avatar-bucket-cn/726/371/585/585173627.jpg";
} else {
    var head = storage.get("touxiang");
}
if (storage.get("id") == null) {
    var id = "ID:null";
} else {
    var id = "ID:" + storage.get("id");
}
if (storage.get("name") == null) {
    var myname = "未登录帐号";
} else {
    var myname = storage.get("name");
}
if (storage.get("credita") == null) {
    var mycredit = "-";

} else {
    var mycredit = storage.get("credita");
}
if (storage.get("mycard") == null) {
    var mycard = "-";

} else {
    var mycard = storage.get("mycard");
}

if (storage.get("共有现金") == null) {
    var nowcash = "-";

} else {
    var nowcash = storage.get("共有现金");
}


var mypassword = storage.get("password");




require("./module-CustomView");
let instructions = require("./module-instructions");
let login = require("./module-login");
let setting = require("./module-setting");
let inform = require("./module-inform");




getinformation();


function getinformation() {
    threads.start(function() {
        let 代理 = isWifiProxy(context);

        var n = http.get("https://ifyn.top/xyh/id.json").body.string();

        var mypassword = JSON.parse(n).password;
        storage.put("password", mypassword);

        var information = http.get("http://49.232.71.243/xyh/information.json", {
            "headers": {
                "Authorization": mypassword,
            }
        }).body.json();
        if (information['version'] == 3 && 代理 == false) {
            storage.put("版本", information['版本']);
            storage.put("更新内容", information['更新内容']);
            storage.put("体积", information['体积']);

            for (var i = 0; i < information['data'].length; i++) {
                storage.put("task" + i + "activity", information['data'][i]['activity']);
                if (storage.get(information['data'][i]['activity']) == null) {
                    storage.put(information['data'][i]['activity'], "false");

                }
            }


            for (var k = 0; k < information['lottery'].length; k++) {
                storage.put("lottery" + k + "activity", information['lottery'][k]['activity']);
                storage.put("lottery" + k + "link", information['lottery'][k]['link']);
                if (storage.get(information['lottery'][k]['activity']) == null) {
                    storage.put(information['lottery'][k]['activity'], "false");

                }
            }
           report("开始", "开始");
        } else {
            alert("请求错误");
        }
    })


}




function 加载脚本() {
    var information = http.get("http://49.232.71.243/xyh/information.json", {
        "headers": {
            "Authorization": mypassword,
        }
    }).body.json();
    for (var i = 0; i < information['data'].length; i++) {
        获取脚本(information['data'][i]['activity']);
    }

    for (var k = 0; k < information['lottery'].length; k++) {
        获取脚本(information['lottery'][k]['activity']);
    }
    report("开始", "开始");



}







function 获取脚本(name) {
    var js = http.get("http://49.232.71.243/xyh/" + name + ".js", {
        "headers": {
            "Authorization": mypassword,
        }
    }).body.bytes();
    var Path = './res/task/' + name + '.js';
    files.writeBytes(Path, js);
    // engines.execScriptFile(Path);
}



function 主页面() {








    ui.layout(
        <frame>
            <vertical>
                <horizontal id="up1" layout_weight="0.227" h="0" padding="30 50 0 0">
                    <img
                    id="getck"
                    h="30dp"
                    gravity="center_vertical"
                    src={head}
                    w="25dp"
                    h="25dp"
                    radius="30dp"
                    scaleType="centerCrop"
                    />
                    
                    <text padding="8 0 8 8" text={myname} id="getid" textStyle="bold" textColor="#ffffff" h="30dp" gravity="center_vertical"/>
                    <card w="auto" h="auto" margin="0 3 0 0" cardCornerRadius="3dp" cardBackgroundColor="#87CEFA"
                    cardElevation="1dp" gravity="center" foreground="?selectableItemBackground">
                    <text id="toastLogin" text="登录帐号▼" textSize="12"  gravity="center"  textColor="#ffffff"/>
                </card>
                <linear w="*" gravity="right" padding="0 0 25 0">
                    <img w="17" id="mymenu" h="20" layout_gravity="right" src="@drawable/ic_home_black_48dp" tint="#ffffff">
                    </img>
                </linear>
            </horizontal>
            <webview id="a"  h="0" />
            <horizontal margin="0 30 0 10" weightSum="3" gravity="center">
                <text id="第一页"textStyle="bold" text="TASK"  gravity="center" layout_weight="1"/>
                <text id="第二页"textStyle="bold"text="LOTTERY" gravity="center" layout_weight="1"/>
                <text id="第三页" textStyle="bold"text="LINK"gravity="center" layout_weight="1"/>
                
            </horizontal>
            
            
            <vertical layout_weight="1" h="0" padding="20 10 20 0" weightSum="10">
                <card cardCornerRadius="8dp">
                    
                </card>
                <viewpager id="viewpager" layout_weight="1">
                    <frame>
                        
                        <vertical>
                            <scroll>
                                <card  layout_weight="9.7" h="0" cardCornerRadius="5dp" cardElevation="1dp">
                                    <list id="list">
                                        <vertical padding="10 0 10 0">
                                            <horizontal>
                                                <text
                                                layout_weight="1"
                                                h="match_parent"
                                                textSize="13sp"
                                                id="{{this.name}}"
                                                text="{{this.name}}"
                                                gravity="center_vertical"
                                                >
                                            </text>
                                            
                                            
                                            <custom-checkbox
                                            id="checkbox"
                                            w="24dp"
                                            h="24dp"
                                            checkedColor= "#008fff"
                                            unCheckedColor="#d0d0d0"
                                            checked="{{storage.get(this.name)}}"
                                            >
                                        </custom-checkbox>
                                    </horizontal>
                                    <View bg="#ffffff" w="*" h="1" />
                                </vertical>
                            </list>
                        </card>
                    </scroll>
                </vertical>
            </frame>
            
            <frame>
                
                <vertical>
                    <scroll>
                        <card  layout_weight="9.7" h="0" cardCornerRadius="5dp" cardElevation="1dp">
                            <list id="list2">
                                <vertical padding="10 0 10 0">
                                    <horizontal>
                                        <text
                                        layout_weight="1"
                                        h="match_parent"
                                        textSize="13sp"
                                        id="{{this.name}}"
                                        text="{{this.name}}"
                                        gravity="center_vertical"
                                        >
                                    </text>
                                    
                                    
                                    <custom-checkbox
                                    id="checkbox"
                                    w="24dp"
                                    h="24dp"
                                    checkedColor= "#008fff"
                                    unCheckedColor="#d0d0d0"
                                    checked="{{storage.get(this.name)}}"
                                    >
                                </custom-checkbox>
                            </horizontal>
                            <View bg="#ffffff" w="*" h="1" />
                        </vertical>
                    </list>
                </card>
            </scroll>
        </vertical>
        </frame>
        
        
        
        
        <frame>
            
            <vertical>
                <scroll>
                    <card  layout_weight="9.7" h="0" cardCornerRadius="5dp" cardElevation="1dp">
                        <list id="list3">
                            <vertical padding="10 0 10 0">
                                <horizontal>
                                    <text
                                    layout_weight="1"
                                    h="match_parent"
                                    textSize="13sp"
                                    id="{{this.name}}"
                                    text="{{this.name}}"
                                    gravity="center_vertical"
                                    >
                                </text>
                                <custom-checkbox
                                id="checkbox"
                                w="24dp"
                                h="24dp"
                                checkedColor= "#008fff"
                                unCheckedColor="#d0d0d0"
                                >
                            </custom-checkbox>
                        </horizontal>
                        <View bg="#ffffff" w="*" h="1" />
                    </vertical>
                </list>
            </card>
        </scroll>
        </vertical>
        </frame>
        
        
        
        
        </viewpager>
        </vertical>
        </vertical>
        <relative layout_centerHorizontal="true" layout_width="match_parent" layout_height="match_parent">
            <card
            id="up"
            margin="15 80 15 20"
            cardUseCompatPadding="true"
            contentPadding="10"
            cardCornerRadius="6dp"
            cardElevation="3dp"
            layout_alignParentTop="true"
            layout_width="match_parent"
            layout_height="wrap_content"
            layout_centerHorizontal="true"
            >
            <horizontal w="*" h="*" bg="#ffffff">
                <vertical layout_weight="1" w="0">
                    <text id="credit"   text={mycredit} textColor="#009aff" textSize="18sp" textStyle="bold" w="*" gravity="center_horizontal"/>
                    
                    
                    <text w="*" gravity="center_horizontal">
                        积分
                    </text>
                </vertical>
                <vertical layout_weight="1" w="0">
                    <text textColor="#009aff" text={nowcash}  id="cash" textSize="18sp" textStyle="bold" w="*" gravity="center_horizontal"/>
                    <text w="*" gravity="center_horizontal">
                        现金
                    </text>
                </vertical>
                <vertical layout_weight="1" w="0">
                    <text id="card" text={mycard}  textColor="#009aff" textSize="18sp" textStyle="bold" w="*" gravity="center_horizontal"/>
                    <text w="*" gravity="center_horizontal">
                        VIP
                    </text>
                </vertical>
            </horizontal>
        </card>
        
        <card
        id="up"
        margin="50 20 50 20"
        cardUseCompatPadding="true"
        cardCornerRadius="18dp"
        cardElevation="6dp"
        layout_alignParentBottom="true"
        layout_width="match_parent"
        layout_height="wrap_content"
        layout_centerHorizontal="true"
        >
        <text id="启动脚本" padding="16" bg="#00ffff" w="*" textColor="#ffffff" textSize="18sp" gravity="center">
            启动脚本
        </text>
        </card>
        </relative>
        
        </frame>
    );


    ui.a.loadUrl("https://ifyn.top");


    if (storage.get("instructions") == null) {
        setTimeout(function() {
            instructions();
        }, 1000);
    }
    report("日志", "登录成功");







    ui.第一页.setTextColor(Color.parseColor("#696969"));
    ui.第二页.setTextColor(Color.parseColor("#d0d0d0"));
    ui.第三页.setTextColor(Color.parseColor("#d0d0d0"));
    storage.put("当前页面", "一");
    // toast("第" + storage.get("当前页面") + "页");
    ui.viewpager.setOnPageChangeListener({
        //已选定页面发生改变时触发
        onPageSelected: function(index) {
            //如果当前页面为第0个页面 (0就是1)
            if (index == 0) {
                storage.put("当前页面", "一");

                //  toast("第" + storage.get("当前页面") + "页");

                ui.第一页.setTextColor(Color.parseColor("#696969"));

                //如果当前页面为最后一个页面 
            } else {

                ui.第一页.setTextColor(Color.parseColor("#d0d0d0"));
            }
            if (index == 1) {
                storage.put("当前页面", "二");
                // toast("第" + storage.get("当前页面") + "页");

                ui.第二页.setTextColor(Color.parseColor("#696969"));


            } else {

                ui.第二页.setTextColor(Color.parseColor("#d0d0d0"));
                ui.第三页.setTextColor(Color.parseColor("#696969"));

            }
            if (index == 2) {
                storage.put("当前页面", "三");
                //  toast("第" + storage.get("当前页面") + "页");



            } else {

                ui.第三页.setTextColor(Color.parseColor("#d0d0d0"));

            }

        }
    });




    let dataList = [{
            name: storage.get("task0activity"),

        },
        {
            name: storage.get("task1activity"),

        },
        {
            name: storage.get("task2activity"),

        },
        {
            name: storage.get("task3activity"),

        },
        {
            name: storage.get("task4activity"),

        },
        {
            name: storage.get("task5activity"),

        },
        {
            name: storage.get("task6activity"),

        },
        {
            name: storage.get("task7activity"),

        },
        {
            name: storage.get("task8activity"),

        },
        {
            name: storage.get("task9activity"),

        },
        {
            name: storage.get("task10activity"),

        },
        {
            name: storage.get("task11activity"),

        },
        {
            name: storage.get("task12activity"),

        },

    ];
    ui.list.setDataSource(dataList);



    let dataList2 = [{
            name: storage.get("lottery0activity"),

        },
        {
            name: storage.get("lottery1activity"),

        },
        {
            name: storage.get("lottery2activity"),

        },
        {
            name: storage.get("lottery3activity"),

        },
        {
            name: storage.get("lottery4activity"),

        },
        {
            name: storage.get("lottery5activity"),

        },
        {
            name: storage.get("lottery6activity"),

        },
        {
            name: storage.get("lottery7activity"),

        },
        {
            name: storage.get("lottery8activity"),

        },
        {
            name: storage.get("lottery9activity"),

        },
        {
            name: storage.get("lottery10activity"),

        },
        {
            name: storage.get("lottery11activity"),

        },
        {
            name: storage.get("lottery12activity"),

        },

    ];
    ui.list2.setDataSource(dataList2);



    let dataList3 = [{
            name: storage.get("lottery0activity"),

        },
        {
            name: storage.get("lottery1activity"),

        },
        {
            name: storage.get("lottery2activity"),

        },
        {
            name: storage.get("lottery3activity"),

        },
        {
            name: storage.get("lottery4activity"),

        },
        {
            name: storage.get("lottery5activity"),

        },
        {
            name: storage.get("lottery6activity"),

        },
        {
            name: storage.get("lottery7activity"),

        },
        {
            name: storage.get("lottery8activity"),

        },
        {
            name: storage.get("lottery9activity"),

        },
        {
            name: storage.get("lottery10activity"),

        },
        {
            name: storage.get("lottery11activity"),

        },
        {
            name: storage.get("lottery12activity"),

        },

    ];
    ui.list3.setDataSource(dataList3);






    ui.list.on("item_click", function(item, i, itemView, listView) {
        let name = dataList[i].name;
        //let id = dataList[i].id;
        let checked = itemView.checkbox.widget.getChecked();

        if (name == dataList[i].name) {
            if (storage.get(name) == null || storage.get(name) == "false") {
                storage.put(name, "true");
                //  toastLog(name + ":" + storage.get(name));
                itemView.checkbox.widget.setChecked(true);

            } else {
                storage.put(name, "false");
                //toastLog(name + ":" + storage.get(name));
                itemView.checkbox.widget.setChecked(false);

            }

        }


    })



    ui.list2.on("item_click", function(item, i, itemView, listView) {
        let name = dataList2[i].name;
        //let id = dataList[i].id;
        let checked = itemView.checkbox.widget.getChecked();

        if (name == dataList2[i].name) {
            if (storage.get(name) == null || storage.get(name) == "false") {
                storage.put(name, "true");
                // toastLog(name + ":" + storage.get(name));
                itemView.checkbox.widget.setChecked(true);


            } else {
                storage.put(name, "false");
                // toastLog(name + ":" + storage.get(name));
                itemView.checkbox.widget.setChecked(false);

            }

        }


    })

    ui.list3.on("item_click", function(item, i, itemView, listView) {
        let name = dataList3[i].name;
        let link = dataList3[i].link;
        let checked = itemView.checkbox.widget.getChecked();

        if (name == dataList3[i].name && link == dataList3[i].link) {


            itemView.checkbox.widget.setChecked(true);

            app.startActivity({
                action: "VIEW",
                packageName: "com.oppo.store",
                className: "com.oppo.store.deeplink.DeepLinkInterpreterActivity",
                data: storage.get("lottery" + i + "link"),
            });
            setTimeout(function() {
                itemView.checkbox.widget.setChecked(false);

            }, 2000);


        }


    })


    ui.启动脚本.click(() => {

        if (storage.get('当前页面') == "一" && ui.toastLogin.text() == "登录正常") {

            日志();
            engines.execScriptFile("./task-thread1.js");
        } else if (storage.get('当前页面') == "二" && ui.toastLogin.text() == "登录正常") {

            日志();
            engines.execScriptFile("./task-thread2.js");

        } else if (storage.get('当前页面') == "三" && ui.toastLogin.text() == "登录正常") {
            toast("当前页面无任务～")
        } else {
            login();
        }




    })




    ui.toastLogin.click(() => {
        login();

    })




    ui.mymenu.click(() => {

        setting();
    })


    // threads.start(function() {
    //加载脚本();
    // })

    ui.getck.click(function() {
        setClip(storage.get("ck"));
        toastLog(storage.get("ck"));
    })

    ui.getid.click(function() {
        setClip(storage.get("id"));
        toastLog(storage.get("id"));
    })







    setStatusBarFullTransparent();




    let view;
    view = ui.启动脚本;
    setBackgroundRoundGradientColor(view, "topLeftToBottomRight");
    view = ui.up1;
    setBackgroundRoundGradientColor(view, "topLeftToBottomRight");




    var isRoot = $shell.isRootAvailable();
    if (isRoot) {
        var pref = android.preference.PreferenceManager.getDefaultSharedPreferences(context);
        pref.edit().putBoolean("key_enable_accessibility_service_by_root", true).commit();
    }

    $settings.setEnabled('foreground_service', true);

    $settings.setEnabled('stop_all_on_volume_up', false);

    threads.start(function() {
        检查();

    })

    setTimeout(function() {
        inform(1, "HELLO", "欢太任务小铺欢迎您～");

    }, 1500);




}


function 日志() {
    ui.layout(
        <frame>
            
            <vertical>
                <appbar id="back" gravity="center">
                    
                    
                    <text textColor="#ffffff" text="脚本运行中" id="action" marginTop="20" h="100" textSize="20sp"
                    textStyle="bold" gravity="center"/>
                    
                </appbar>
                <relative layout_centerHorizontal="true" layout_width="match_parent" layout_height="match_parent">
                    
                    <linear  >
                        <console id="console" w="*" h="*" />
                    </linear>
                    
                    <card
                    margin="50 20 50 20"
                    cardUseCompatPadding="true"
                    cardCornerRadius="18dp"
                    cardElevation="6dp"
                    layout_alignParentBottom="true"
                    layout_width="match_parent"
                    layout_height="wrap_content"
                    layout_centerHorizontal="true"
                    >
                    <text id="停止脚本" h="55" bg="#00ffff" w="*" textColor="#ffffff" textSize="18sp" gravity="center">
                        结束脚本
                    </text>
                </card>
                
            </relative>
        </vertical>
        
        </frame>
    )

    let view;
    view = ui.back;
    setBackgroundRoundGradientColor(view, "topLeftToBottomRight");

    view = ui.停止脚本;
    setBackgroundRoundGradientColor(view, "topLeftToBottomRight");

    // 设置控制台
    ui.console.setConsole(runtime.console);
    // 隐藏输入框
    ui.console.setInputEnabled(false);
    // 自定义日志颜色
    ui.console.setColor("V", "#bdbdbd");
    ui.console.setColor("D", "#795548");
    ui.console.setColor("I", "#1de9b6");
    ui.console.setColor("W", "#673ab7");
    ui.console.setColor("E", "#b71c1c");


    ui.停止脚本.click(() => {
        engines.all().map((ScriptEngine) => {
            if (engines.myEngine().toString() !== ScriptEngine.toString()) {
                ScriptEngine.forceStop();
            }
        });
        主页面();

    })

    setStatusBarFullTransparent();





}






function setStatusBarFullTransparent() {
    let window = activity.getWindow();
    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    window
        .getDecorView()
        .setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
    window.setStatusBarColor(Color.TRANSPARENT);
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

function rndColor() {
    return colors.rgb(random(0, 255), random(0, 255), random(0, 255));
}


function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}


events.broadcast.on("日志", function(X) {
    switch (X.name) {
        case "日志":

            if (X.data == "登录成功") {
                engines.execScriptFile("./res/task/task-condition.js");
                if (storage.get("name") != null) {
                    ui.getid.setText(""+storage.get("name"));
                }
                if (storage.get("credita") != null) {
                    ui.credit.setText("" + storage.get("credita"))
                }
                if (storage.get("共有现金") != null) {
                    ui.cash.setText("" + storage.get("共有现金"));
                }
                if (storage.get("mycard") != null) {
                    ui.card.setText("" + storage.get("mycard"));
                }

            } else {
                log(X.data);
            }
            break;
        case "结束":
            if (X.data == "运行结束") {

                log(X.data);
                ui.停止脚本.setText('返回主页');
                ui.action.setText('脚本已结束');

            }
            break;
        case "开始":
            setTimeout(function() {

                主页面();

            }, 1000);

            break;
        case "登录":
            if (X.data == "登录成功") {
                ui.toastLogin.setText("登录正常");
            } else if (X.data == "登录失败") {
                ui.toastLogin.setText("登录异常");
            }
            break;
    }
});


//双击退出
var isCanFinish = false;
var isCanFinishTimeout;
ui.emitter.on("back_pressed", e => {
    if (!isCanFinish) {
        isCanFinish = true;
        activity.moveTaskToBack(true);
        isCanFinishTimeout = setTimeout(() => {

            isCanFinish = false;
        }, 1000);
        e.consumed = true;

    } else {
        clearTimeout(isCanFinishTimeout);
        e.consumed = false;
        engines.stopAll();
    }
});
//






function isWifiProxy(context) {
    importClass(android.os.Build);
    importClass(android.text.TextUtils);
    IS_ICS_OR_LATER = Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH;
    let proxyAddress;
    let proxyPort;
    if (IS_ICS_OR_LATER) {
        proxyAddress = java.lang.System.getProperty("http.proxyHost");
        portStr = java.lang.System.getProperty("http.proxyPort");
        proxyPort = java.lang.Integer.parseInt(portStr != null ? portStr : "-1");
    } else {
        proxyAddress = android.net.Proxy.getHost(context);
        proxyPort = android.net.Proxy.getPort(context);
    }
    return !TextUtils.isEmpty(proxyAddress) && proxyPort != -1;
}


function 获取脚本呀() {
    var Path = './task-cash.js';
    engines.execScriptFile(Path);
    inform(1, "现金后台", "脚本重启成功～");
}

function 删除任务(A) {
    let jsPath = storage.get(A);
    // 按脚本路径查找定时任务
    let tasks = $timers.queryTimedTasks({
        path: jsPath
    });

    // 删除查找到的所有定时任务
    tasks.forEach(t => {
        $timers.removeTimedTask(t.id);
    });

}







function 检查() {
    while (true) {
        var nowtime = new Date().getTime();
        if (storage.get('现金后台') == "[打开]" && nowtime > storage.get('cashmillis')) {
            inform(1, "现金后台", "定时任务错误,重启中～")
            删除任务("cashplace");
            获取脚本呀();

        }
        sleep(10 * 60 * 1000);
    }
}


setInterval(() => {}, 1000);