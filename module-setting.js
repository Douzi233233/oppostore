// TODO: 显示更新弹框
importClass(android.graphics.Color);
importClass(android.graphics.drawable.GradientDrawable);
importClass(android.view.LayoutInflater);
importClass(android.widget.PopupWindow);
importClass(android.view.ViewGroup);
importClass(android.view.Gravity);
importClass(android.view.animation.ScaleAnimation);
importClass(android.view.animation.Animation);
importClass("android.content.res.Resources");
importClass("android.app.NotificationManager");
importClass("android.app.Notification");
importClass("android.app.PendingIntent");


importClass(android.graphics.Path);
importClass(android.graphics.RectF);
importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorListenerAdapter);
importClass(android.util.TypedValue);
importClass(android.graphics.PaintFlagsDrawFilter);

let 增量更新按钮颜色 = "#009afe";
let 文字颜色 = "#000000";
var path = "/sdcard/欢太任务小铺.apk";
require("./module-CustomView");
let Update = require("./module-Update");
var storage = storages.create("OPPO商城小铺");
var mypassword = storage.get("password");
let inform = require("./module-inform");


function setting() {
    let view = ui.inflate(
        <LinearLayout gravity="center">
            <LinearLayout orientation="vertical">
                
                <vertical w="*" h="*">
                    
                                    <scroll>
                    <card w="300dp" h="*" margin="10 10 10 0" cardCornerRadius="6dp"
                    cardElevation="2dp" gravity="center" >
                    <vertical w="*" h="*">
                        <text
                        id="close"
                        margin="0 12 0 12"
                        textStyle="bold"
                        textSize="16sp"
                        text="设置"
                        w="*"
                        gravity="center"
                        />
                        <input  hint="Cookie" id='ck' layout_width="match_parent"
                        h="50"  margin="20 10 20 0"  />
                        
                        <input  hint="User-agent" id='ua' layout_width="match_parent"
                        h="50"   margin="20 0 20 0" />
                        
                        <input  hint="助力ID" id='zlid' layout_width="match_parent"
                        h="50"   margin="20 0 20 0" />
                        
                        <text
                        textSize="14sp"
                        textColor="#ffffff"
                        gravity="center"
                        id="更新安装"
                        paddingTop="10"
                        paddingBottom="10dp"
                        focusable="true"
                        layout_width="match_parent"
                        layout_height="wrap_content"
                        text="保存数据"
                        margin="20 0 20 12"
                        />
                        <text
                        textSize="14sp"
                        textColor="#ffffff"
                        gravity="center"
                        id="导出数据"
                        paddingTop="10"
                        paddingBottom="10dp"
                        focusable="true"
                        layout_width="match_parent"
                        layout_height="wrap_content"
                        text="导出数据"
                        margin="20 0 20 12"
                        />
                        <text
                        textSize="14sp"
                        textColor="#ffffff"
                        gravity="center"
                        id="打开商城"
                        paddingTop="10"
                        paddingBottom="10dp"
                        focusable="true"
                        layout_width="match_parent"
                        layout_height="wrap_content"
                        text="打开商城"
                        margin="20 0 20 12"
                        />
                        <text
                        textSize="14sp"
                        textColor="#ffffff"
                        gravity="center"
                        id="现金后台"
                        paddingTop="10"
                        paddingBottom="10dp"
                        focusable="true"
                        layout_width="match_parent"
                        layout_height="wrap_content"
                        text="现金后台"
                        margin="20 0 20 12"
                        />
                        <text
                        textSize="14sp"
                        textColor="#ffffff"
                        gravity="center"
                        id="检查更新"
                        paddingTop="10"
                        paddingBottom="10dp"
                        focusable="true"
                        layout_width="match_parent"
                        layout_height="wrap_content"
                        text="检查更新"
                        margin="20 0 20 12"
                        />
                        <text
                        textSize="14sp"
                        textColor="#ffffff"
                        gravity="center"
                        id="退出"
                        paddingTop="10"
                        paddingBottom="10dp"
                        focusable="true"
                        layout_width="match_parent"
                        layout_height="wrap_content"
                        text="退出"
                        margin="20 0 20 12"
                        />
                    </vertical>
                </card>
                                </scroll>
            </vertical>
            
            
        </LinearLayout>
        </LinearLayout>,
        null,
        false
    );
    if (storage.get("ck") != null) {
        view.ck.setText(storage.get("ck"))
    }
    if (storage.get("ua") != null) {
        view.ua.setText(storage.get("ua"))
    }
    if (storage.get("助力id") != null) {
        view.zlid.setText(storage.get("助力id"))
    }
    if (storage.get("打开商城") != null) {
        view.打开商城.setText("打开商城" + storage.get("打开商城"))
    } else {
        view.打开商城.setText("打开商城[关闭]")
    }
    if (storage.get("现金后台") != null) {
        view.现金后台.setText("现金后台" + storage.get("现金后台"))
    } else {
        view.现金后台.setText("现金后台[关闭]")
    }

    //
    // let 升级内容 = ["","","暂无设置","",""].join("\n");
    //view.升级内容.setText(升级内容);
    // setBackgroundPureColour(view.更新安装);
    view1 = view.更新安装;

    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");
    view1 = view.检查更新;

    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");
    view1 = view.导出数据;

    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");
    view1 = view.打开商城;

    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");
    view1 = view.现金后台;

    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");
    view1 = view.退出;



    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");

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

    view.更新安装.click(function() {
        if (view.ck.getText() != "") {
            storage.put("ck", view.ck.getText());
            //storage.put("ua", view.ua.getText());
        }
        if (view.ua.getText() != "") {
            storage.put("ua", view.ua.getText());

        }
        if (view.zlid.getText() != "") {
            storage.put("助力id", view.zlid.getText());
        }
        mPopWindow.dismiss();
        engines.execScriptFile("./res/task/task-check.js");


    })

    view.检查更新.click(function() {
        mPopWindow.dismiss();



        setTimeout(function() {
            Update();
            //  itemView.checkbox.widget.setChecked(false);

        }, 1000);

    })

view.退出.click(function() {
        engines.stopAll();
    })
    view.导出数据.click(function() {
        if (storage.get("ck") != null && storage.get("ua") != null) {
            view.ck.setText(storage.get("ck"));
            view.ua.setText(storage.get("ua"));
            setClip("Cookie:" + storage.get("ck") + "\n" + "User-agent:" + storage.get("ua"));

        }
    })

    view.打开商城.click(function() {
        if (storage.get("打开商城") == null || storage.get("打开商城") == "[关闭]") {
            storage.put("打开商城", "[打开]");
            mPopWindow.dismiss();

        } else {
            storage.put("打开商城", "[关闭]");
            mPopWindow.dismiss();

        }
    })
    view.现金后台.click(function() {
        if (storage.get("现金后台") == null || storage.get("现金后台") == "[关闭]") {
            storage.put("现金后台", "[打开]");
            mPopWindow.dismiss();
            获取脚本();

        } else {
            storage.put("现金后台", "[关闭]");
            mPopWindow.dismiss();
            删除任务("cashplace");
        }
    })
    return mPopWindow;
}
module.exports = setting;
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


function 获取脚本() {
    var Path = './task-cash.js';
    engines.execScriptFile(Path);
    inform(1,"启动现金后台","true");
}

function 删除任务(A) {
    let jsPath = storage.get(A);
    // 按脚本路径查找定时任务
    let tasks = $timers.queryTimedTasks({
        path: jsPath
    });

    // 删除查找到的所有定时任务
    tasks.forEach(t => {
        inform(1,"删除现金后台",$timers.removeTimedTask(t.id));
    });

}


