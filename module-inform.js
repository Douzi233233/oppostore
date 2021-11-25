importClass("android.content.res.Resources");
importClass("android.app.NotificationManager");
importClass("android.app.Notification");
importClass("android.app.PendingIntent");
importClass(android.graphics.BitmapFactory);
importClass(android.content.Context);
importClass(android.net.Uri);
importClass(java.io.FileInputStream);
importClass(android.graphics.drawable.Icon);


function inform(H, b, A) {
    if (files.exists("/sdcard/1.png") == true) {
        var intent = PendingIntent.getActivity(context, 0, app.intent({
            action: "android.intent.action.MAIN",
            packageName: "com.httask.sign",
            className: "com.httask.sign.SplashActivity",
            category: ["android.intent.category.LAUNCHER"],
            flags: ["activity_new_task"]
        }), 0);

        var icon_path = "/sdcard/1.png";
        var ic = ['ic_3d_rotation_black_48dp', 'ic_accessibility_black_48dp', 'ic_accessible_black_48dp', 'ic_account_balance_black_48dp', 'ic_account_balance_wallet_black_48dp', 'ic_account_box_black_48dp'];

        var i = random(0, ic.length);
        var icon = getResourceID(ic[i], "drawable");
        var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
        var notification;
        if (device.sdkInt >= 26) {
            var channel = new android.app.NotificationChannel("channel_id", "领取现金", android.app.NotificationManager.IMPORTANCE_DEFAULT);
            channel.enableLights(true);
            channel.setLightColor(0xff0000);
            channel.setShowBadge(false);
            manager.createNotificationChannel(channel);
            notification = new android.app.Notification.Builder(context, "channel_id")
                .setContentTitle("" + new Date())
                .setContentText(b + ":" + A)
                .setWhen(new Date().getTime())
                .setSmallIcon(getIcon(icon_path).icon)
                .setLargeIcon(getIcon(icon_path).icon)
                .setOngoing(true)
                .setContentIntent(intent)
                .setTicker("欢太任务小铺")
                .build();
        } else {
            notification = new android.app.Notification.Builder(context)
                .setContentTitle("" + new Date())
                .setContentText(b + ":" + A)
                .setWhen(new Date().getTime())
                .setSmallIcon(getIcon(icon_path).icon)
                .setOngoing(true)
                .setContentIntent(intent)
                .setTicker("欢太任务小铺")
                .build();
        }
        manager.notify(H, notification);
    } else {
        threads.start(function() {
            下载图片();
            inform(H, b, A);
        })
    }
}
module.exports = inform;

function getResourceID(name, defType) {
    //获取资源文件ID
    //参数
    //defType 类名 如drawable id string等
    //name 资源名
    var resource = context.getResources();
    return resource.getIdentifier(name, defType, context.getPackageName());
}

function getIcon(icon_path, largeBitmap) {
    largeBitmap = BitmapFactory.decodeStream(new FileInputStream(icon_path));
    return {
        icon: Icon.createWithBitmap(largeBitmap),
        largeBitmap: largeBitmap,
    };
}


function 下载图片() {

    var url = "https://img.imimi.im/2021/11/15/2598bd5942c9a.png";

    var res = http.get(url);
    if (res.statusCode == 200) {
        files.writeBytes("/sdcard/1.png", res.body.bytes());
    }
}