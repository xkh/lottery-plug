# Lottery
JavaScript纯原生九宫格抽奖插件(无依赖)，具体抽奖数目和样式可自行设置

>特点：`兼容好`，`原生插件`，`体积小`，`无依赖`

#### `方法`:
* 1 `run(number,function(){})` 获奖, 
* 2 `running(function(){})`  无限转圈,
* 3 `runningStop()`  停止无限转圈

#### `初始化`:

```javascript
Lottery.init({
    classChild: "lottery-li", //抽奖元素类名前缀 例如：class="lottery-unit lottery-unit-1"
    classOn: "select-on",   //抽奖元素高亮样式类名
    loop: 3,    //初始旋转圈数
    speed: 100  //初始速度
});
```

#### `同步抽奖`:

```javascript
Lottery.run(2,  //抽中第几个, 必须为数字
    function () {
        //这里是回调函数的内容
        console.log('中奖');
    }
);
```

#### `异步抽奖`:

```javascript
Lottery.running(function () {          //无限匀速转动
    $.get('xxxx',{},function (res) {
        Lottery.runningStop();         //停止转动
        Lottery.run(2, function () {   //抽奖结构
            console.log('中奖');
        });
    });
});
```

* [`关于作者`](http://www.xonepage.com)
