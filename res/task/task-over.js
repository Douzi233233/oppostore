
report("结束", "运行结束");
function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("日志", {
        name: X,
        data: Y
    });
}




mainEngine.emit("control",index);
