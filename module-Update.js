// TODO: 显示更新弹框
importClass(android.graphics.Color);
importClass(android.graphics.drawable.GradientDrawable);
importClass(android.view.LayoutInflater);
importClass(android.widget.PopupWindow);
importClass(android.view.ViewGroup);
importClass(android.view.Gravity);
importClass(android.view.animation.ScaleAnimation);
importClass(android.view.animation.Animation);

importClass(android.graphics.Path);
importClass(android.graphics.RectF);
importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorListenerAdapter);
importClass(android.util.TypedValue);
importClass(android.graphics.PaintFlagsDrawFilter);



function Update() {
    let view = ui.inflate(
        <LinearLayout gravity="center">
            <LinearLayout orientation="vertical" layout_width="310dp">
                <card cardCornerRadius="6dp"  layout_width="match_parent" layout_height="wrap_content">
                    <LinearLayout
                    orientation="vertical"
                    background="#ffffff"
                    layout_width="match_parent"
                    layout_height="wrap_content"
                    padding="30 0 30 0"
                    >
                    <text
                    margin="0 12 0 12"
                    textStyle="bold"
                    textColor="#008fff"
                    textSize="18sp"
                    text="欢太任务小铺"
                    w="*"
                    gravity="center"
                    >
                </text>
                <text id="升级内容">
                </text>
                <progressbar id="_progress" marginBottom="-6" w="*" margin="0 12 0 12"style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" visibility="invisible" />
                
                <text
                textSize="14sp"
                textColor="#ffffff"
                gravity="center"
                id="安装软件"
                paddingTop="10dp"
                paddingBottom="10dp"
                focusable="true"
                layout_width="match_parent"
                layout_height="wrap_content"
                text="安装软件"
                margin="0 0 0 12"
                />
            </LinearLayout>
        </card>
        </LinearLayout>
        </LinearLayout>,
        null,
        false
    );
    
    //监听脚本间广播'download'事件
events.broadcast.on("download", function (X) {
    switch (X.name) {
        case "进度":
            ui.run(() => {
                view._progress.setProgress(0 + X.data);
                view.安装软件.setText("下载中 " + X.data + "%");
            })
            break;
        case "结果":
            if (X.data == "下载完成") {
               ui.run(() => { 
              view.安装软件.setText("下载完成");
               })
            }
            break;
    }
});

    let 升级内容 = ["版本:"+storage.get('版本'), "增量包体积:"+storage.get('体积'), "", "更新内容:", storage.get('更新内容')].join("\n");
    view.升级内容.setText(升级内容);
    //setBackgroundPureColour(view.安装软件);
    view1 = view.安装软件;
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
    view.安装软件.click(function() {
        view._progress.attr("visibility", "visible");
        view.安装软件.setText("下载中 0%");
        engines.execScriptFile("./res/task/task-download.js");
    });
    
   return mPopWindow;
}
module.exports = Update;
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



