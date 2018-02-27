/*
**@Author  xkh
*/
var Lottery = {
    option: {
        classChild: "",                //每个格子class名
        classOn: "",                   //选中格子class名
        loop: 3,                       //圈数
        speed: 90,                     //初始速度
        step: 0,                       //初始位置
        flag: true
    },
    /**
     * @description 初始化配置
     * @param obj
     * @returns {Lottery.option|{classChild, classOn, loop, speed, step, flag}}
     */
    init: function (obj) {
        this.option = Object.assign(this.option, obj);
        this.option.$unit = document.getElementsByClassName(this.option.classChild);
        this.option.long = this.option.$unit.length;
        return this.option;
    },
    /**
     * @description 清空样式,到最初
     */
    clears: function () {
        const opts = this.option;
        const _unit = opts.$unit;
        for (var i = 0; i < _unit.length; i++) {
            var _classVal = _unit[i].getAttribute("class");
            _classVal = _classVal.replace(" "+opts.classOn, "");
            _unit[i].setAttribute('class', _classVal);
        }
    },
    /**
     * @description 转动到中奖位置,同步时可以直接调用
     * @param num 中奖位置
     * @param callback  中奖后回调
     * @returns {boolean}
     */
    run: function (num, callback) {
        var opts = this.option;
        var that = this;
        if (typeof num === "number") {
            var _speed = opts.speed;
            var _total = opts.loop * opts.long + num;
            var _flag = this.option.flag;
            if(!_flag){
                //防止多次点击
                return false;
            }
            that.option.step = ((that.option.step + opts.long) % opts.long -1)<0?0:(that.option.step + opts.long) % opts.long -1;
            var _run = function () {
                if (that.option.step < _total) {
                    that.option.flag = false;
                    that.clears();
                    var $u = document.getElementsByClassName(that.option.classChild + "-" + ((that.option.step + that.option.long) % that.option.long + 1))[0];
                    var _classVal = $u.getAttribute("class");
                    _classVal = _classVal.concat(" " + that.option.classOn);
                    $u.setAttribute('class', _classVal);
                    that.option.step++;
                    setTimeout(_run, that.option.step > (that.option.loop - 1) * that.option.long + num ? _speed += 30 : _speed);
                } else {
                    that.option.flag = true;
                    that.option.step = num;
                    _speed = that.option.speed;
                    callback.call(that);
                    // that.clears();
                    return false;
                }
            };
            _run();
        }
    },
    /**
     * @description 无限均速转动,当需要异步操作时,需配合runningStop()使用
     * @param callback 回调异步方法
     * @returns {boolean}
     */
    running: function (callback) {
        var that = this;
        if(!this.option.flag) {
            //防止多次点击
            return false;
        }else{
            callback();
        }
        var _run = function () {
            that.option.flag = false;
            that.clears();
            var $u = document.getElementsByClassName(that.option.classChild + "-" + ((that.option.step + that.option.long) % that.option.long + 1))[0];
            var _classVal = $u.getAttribute("class");
            _classVal = _classVal.concat(" " + that.option.classOn);
            $u.setAttribute('class', _classVal);
            that.option.step++;
            console.log('速度3',that.option.speed);
        };
        this.option.runningInterval = setInterval(_run,that.option.speed);
    },
    /**
     * @description 停止均速运动, 配合running()使用
     */
    runningStop: function () {
        console.log('停止均速运动');
        this.option.flag = true;
        clearInterval(this.option.runningInterval);
    }
};



