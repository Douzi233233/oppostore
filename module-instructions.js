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


function instructions() {
    let view = ui.inflate(
        <LinearLayout gravity="center">
            <LinearLayout orientation="vertical" >
                <scroll>
                    <card cardCornerRadius="8dp"  margin="25 0 25 0"  layout_width="match_parent" layout_height="wrap_content">
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
                        textSize="16sp"
                        text="欢迎使用欢太任务小辅"
                        w="*"
                        gravity="center"
                        >
                    </text>
                    
                    <text id="升级内容" >
                    </text>
                    <text
                    textSize="14sp"
                    textColor="#ffffff"
                    gravity="center"
                    id="我已知晓"
                    paddingTop="10"
                    paddingBottom="10dp"
                    focusable="true"
                    layout_width="match_parent"
                    layout_height="wrap_content"
                    text="我已知晓"
                    margin="12 0 0 12"
                    />
                    <text
                    textSize="14sp"
                    textColor="#ffffff"
                    gravity="center"
                    id="我不同意"
                    paddingTop="10"
                    paddingBottom="10dp"
                    focusable="true"
                    layout_width="match_parent"
                    layout_height="wrap_content"
                    text="我不同意"
                    margin="12 0 0 12"
                    />
                </LinearLayout>
            </card>
        </scroll>
        </LinearLayout>
        </LinearLayout>,
        null,
        false
    );

    //
    let 升级内容 = ["", "1、本应用基于auto.js开发， 提供OPPO特定活动任务的自动化执行功能;", "", "2、正常使用前需要手动登录某太账号,推荐使用验证码的方式登录，登录状态仅在设备本地记录，作者承诺不主动收集您的账户信息，任何可能需要您提供相关信息的功能将会提前弹窗提醒进行二次确认;", "", "3、脚本在执行的过程中需要保证脚本进程的存活，且设备网络状态良好", "", "4、若在使用中遇到问题，可尝试重启脚本，或在相关社群反馈并耐心等待脚本的后续更新;", "", "5、本应用所有功能完全免费开放,仅用于学习交流用途。严禁篡改程序功能，出售贩卖、商业谋利或其他非法用途;", "", "6、作者将尽义务保护您的个人权益，但无法对您在使用过程中可能造成的意外损失负责，若您继续使用本应用，将默认您已知晓并同意以上说明;", "", "7、添加群“959329050”，获取最新活动脚本及相关内容。", ""].join("\n");
    view.升级内容.setText(升级内容);
    // setBackgroundPureColour(view.我已知晓);
    view1 = view.我已知晓;
    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");
    view1 = view.我不同意;
    setBackgroundRoundGradientColor(view1, "topLeftToBottomRight");

    let mPopWindow = new PopupWindow(
        view,
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        true
    );
    mPopWindow.setFocusable(false);
    mPopWindow.setOutsideTouchable(false);
    mPopWindow.setContentView(view);

    ui.run(function() {

        mPopWindow.showAtLocation(activity.getWindow().getDecorView(), Gravity.CENTER, 0, 0);

        backgroundAlpha(0.3);
    });


    mPopWindow.setOnDismissListener(
        new PopupWindow.OnDismissListener({
            onDismiss: function() {
                backgroundAlpha(0.99);
            },
        })
    );

    view.我已知晓.click(function() {
        storage.put("instructions", "同意");
        mPopWindow.dismiss();

    });
    view.我不同意.click(function() {
        
    engines.stopAll();


    });



    return mPopWindow;
}
module.exports = instructions;
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