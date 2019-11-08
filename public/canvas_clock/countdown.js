var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;//数字距离画布的上边距
var MARGIN_LEFT = 30;//的一个数字距离画布的左边距

var endTime = new Date(); //截止日期2015-11-17-20:37:00
//endTime.setTime(endTime.getTime()+3600*1000);//当前时间一个小时之后
curShowTimeSeconds = 0;

var balls = [];
var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

window.onload = function () {
    WINDOW_HEIGHT = document.body.clientHeight;
    WINDOW_WIDTH = document.body.clientWidth;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.random(WINDOW_HEIGHT / 5);

    var can = document.getElementById("canvas");
    var ctx = can.getContext("2d");
    can.width = WINDOW_WIDTH;
    can.height = WINDOW_HEIGHT;

    curShowTimeSeconds =getCurrentShowTimeSeconds();
    setInterval(
            function () {
                render(ctx);//绘制
                update();//数据的改变
            }
    ,
            50
            );//动画的实现，动画帧
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();//当前时间的毫秒数
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();//endTime.getTime() - curTime.getTime();//获取当前时间与截止时间的倒计时
    //ret = Math.round(ret / 1000);//毫秒转变成秒，Math.round()转换为整数

    return ret >= 0 ? ret : 0;
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();//接下来要显示的时间
    var nextHours = parseInt(nextShowTimeSeconds / 3600);//分解
    var nextMinutes = parseInt(nextShowTimeSeconds - nextHours * 3600) / 60;
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);//当前的时间，分解
    var curMinutes = parseInt(curShowTimeSeconds - curHours * 3600) / 60;
    var curSeconds = curShowTimeSeconds % 60;
    if (nextSeconds != curSeconds)//判断时间有没有变化
    {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        };//判断小时的十位数有没有改变
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        };//判断小时的个位数有没有改变

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        };//判断分钟的数有没有改变
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        };//判断分钟的个位数有没有改变

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        };//判断秒钟的数有没有改变
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        };//判断秒钟的个位数有没有改变
        curShowTimeSeconds = nextShowTimeSeconds;//下次执行时，在render（）中会分解并显示
    }
    updateBalls();
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(), //[1.5,2.5)加速度
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, //ceil()取整，Math.pow(x,y)这个函数是求x的y次方,结果是4或者是-4
                    vy: -5 * Math.random(), //有一个向上的速度
                    color: colors[Math.floor(Math.random() * colors.length)], //[0,9],ceil()、floor()、round(),Round是四舍五入的。Ceiling是向上取整。float是向下取整
                }//生成一个小球的类
                balls.push(aBall);//在balls数组中加入aBall
            }
        }
    }
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS)//如果球到底部了，位置不变运动方向相反且有损耗
        {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];//看有多少个小球还在画布中，把符合的小球挤在数组的前面循环结束后从0到cnt-1的小球都是在屏幕中的
        }
    }
    while (balls.length > Math.min(300, cnt)) {
        balls.pop();//每次超出了就把最后一个删除，节省空间
    }
}

function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//clearRect() 方法清空给定矩形内的指定像素。清空上一帧的内容
    var hours = parseInt(curShowTimeSeconds / 3600);//距离的小时数
    var minutes = parseInt(curShowTimeSeconds - hours * 3600) / 60;//距离的分钟数
    var seconds = curShowTimeSeconds % 60;//

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);//具体绘制小时
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);//第二个数字画在第一个数字所用的距离（7*2*（RADIUS*1））再加上两个数字之间留的空隙（RADIUS*1）
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);//冒号
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);//具体绘制分钟，距离冒号开始绘制的距离4*2*（RADIUS*1）再加上两个数字之间留的空隙（RADIUS*1）
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);//具体绘制秒
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for (var i = 0; i < balls.length; i++) //有多少个小球就画
    {   
//        ctx.save();
        ctx.fillStyle = balls[i].color;
        ctx.shadowBlur=30;
	ctx.shadowColor=balls[i].color;//增加阴影颜色,
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
//        ctx.restore();如果想要只是小球有阴影就加上，
    }
}

function renderDigit(x, y, num, cxt)//digit是三维数组，num是二维数组的索引
{
    cxt.fillStyle = "rgb(0,102,153)";

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

}

