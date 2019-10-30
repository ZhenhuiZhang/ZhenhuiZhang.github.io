var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var can;
var can2;

var ctx;
var ctx2;

var lastTime;
var deltaTime;
var bgImg=new Image();

//定义障碍的数量,定义一个数组
var num=5;
var stars=[];

//定义人物
var jack=new peopleObj();
var data;

function init(){
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");//获得画布工具
	can2=document.getElementById("canvas2");
	ctx2=can.getContext("2d");//获得画布工具
	w=can.width;
	h=can.height;
	
	can.addEventListener("click",onClick,false);//"mousemove"监听的类型，mousemove调用的函数，在发生任何鼠标移动事件的时候，监听方法都会调用mousemove函数
	
	bgImg.src="img/asd.jpg";
	switchy=false;
	data=new dataObj();
	jack.init();
    for(var i=0;i<num;i++){
    	var obj=new starObj();
    	stars.push(obj);//吧数组的每一个成员都变成starObj类
    	stars[i].init();
    }
    lastTime=Date.now();
	deltaTime=0;
	gameloop();      //在初始化结束调用，requestAnimFrame(gameloop)每隔一段时间刷新,
}
document.body.onload=init;//html加载完之后就调用初始化

/*
 *一帧一帧的渲染， 每隔一段时间刷新一个新的帧，这样你看到的就是序列帧，看起来就栋了
 */
function gameloop(){
	//循环调用函数：requestAnimFrame(function(){})依据电脑的性能来确定每次回调的时间，避免函数复杂运行时间长，而回调时间短,setTimeout(function{},time)一定时间后开始循环调用,setInterval(function(){},time)先调用再隔时间调用
	window.requestAnimFrame(gameloop);//在commonFunction中封装好，对各种浏览器的支持
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	drawBackground();
	drawStars();
	drawPeople();
	momFruitsCollision();
	data.draw();
}


function drawBackground(){
	//drawImage(img,x,y,width,height)
	//x轴坐标正方向向右，y轴坐标正方向向下，（0,0）在canvas左上角
	ctx.drawImage(bgImg,0,0,300,100);
//	ctx2.fillText("SCORE: "+this.score,w*0.1,h*0.1);
}

//点击人物跳起
function onClick(e){
	jack.ySpd=-5;
}