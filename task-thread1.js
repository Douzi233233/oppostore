var advancedEngines = require("./module-advancedEngines.js")

var storage = storages.create("OPPO商城小铺");


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
    


    

          const scripts =["./res/task/"+dataList[0]['name'] + ".js", "./res/task/"+dataList[1]['name'] + ".js", "./res/task/"+dataList[2]['name'] + ".js", "./res/task/"+dataList[3]['name'] + ".js", "./res/task/"+dataList[4]['name'] + ".js", "./res/task/"+dataList[5]['name'] + ".js", "./res/task/"+dataList[6]['name'] + ".js", "./res/task/"+dataList[7]['name'] + ".js", "./res/task/"+dataList[8]['name'] + ".js", "./res/task/"+dataList[9]['name'] + ".js", "./res/task/"+dataList[10]['name'] + ".js", "./res/task/"+dataList[11]['name'] + ".js","./res/task/"+dataList[12]['name'] + ".js","./res/task/task-over.js"];
          //const scripts =["./res/task/"+dataList[0]['name'] + ".js", "./res/task/"+dataList[1]['name']];

            var enginess = [];


            var mainEngine = engines.myEngine();
            setInterval(()=>{},1000);
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
