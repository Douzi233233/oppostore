var advancedEngines = require("./module-advancedEngines.js")

var storage = storages.create("OPPO商城小铺");




let  dataList2 = [{
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





const scripts = ["./res/task/"+ dataList2[0]['name'] + ".js", "./res/task/"+ dataList2[1]['name'] + ".js", "./res/task/"+ dataList2[2]['name'] + ".js", "./res/task/"+ dataList2[3]['name'] + ".js", "./res/task/"+ dataList2[4]['name'] + ".js", "./res/task/"+ dataList2[5]['name'] + ".js", "./res/task/"+ dataList2[6]['name'] + ".js", "./res/task/"+ dataList2[7]['name'] + ".js", "./res/task/"+ dataList2[8]['name'] + ".js", "./res/task/"+ dataList2[9]['name'] + ".js", "./res/task/"+ dataList2[10]['name'] + ".js", "./res/task/"+ dataList2[11]['name'] + ".js", "./res/task/"+ dataList2[12]['name'] + ".js","./res/task/task-over.js"];

var enginess = [];


var mainEngine = engines.myEngine();
setInterval(() => {}, 1000);
events.on("control", (i) => {
    i++;
    if (i >= scripts.length) exit() //这里不知道为什么用clearInterval不行

    let args = {
        mainEngine: mainEngine,
        index: i
    }
    var ae = advancedEngines.execScriptFile(scripts[i], args)
    while (!ae.getEngine()); //等待脚本运行
    let aengine = ae.getEngine()
    enginess.push(aengine); //便于后续管理  
});
mainEngine.emit("control", -1);