var can;
var ctx;
var w;
var h;
var girlPic=new Image();
var starPic=new Image();
//定义星星的数量,定义一个数组
var num=60;
var stars=[];
//记录两帧的时间差，来确定星星图片的闪烁速度
var lastTime;
var deltaTime;

var switchy;
var life=0;

function init(){
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");//获得画布工具
	w=can.width;
	h=can.height;
	
	document.addEventListener("mousemove",mousemove,false);//"mousemove"监听的类型，mousemove调用的函数，在发生任何鼠标移动事件的时候，监听方法都会调用mousemove函数
	
	girlPic.src="src/girl.jpg";
	starPic.src="src/star.png";
	switchy=false;

    for(var i=0;i<num;i++){
    	var obj=new starObj();
    	stars.push(obj);//吧数组的每一个成员都变成starObj类
    	stars[i].init();
    }
    lastTime=Date.now();
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
	drawGirl();
	drawStars();
	aliveUpdate();
}

/*
 * 绘制背景的函数
 */
function drawBackground(){
	ctx.fillStyle="#393550";//设定颜色
	ctx.fillRect(0,0,w,h);//在画布填充颜色，从0,0点填充w,h大小
}

function drawGirl(){
	//drawImage(img,x,y,width,height)
	//x轴坐标正方向向右，y轴坐标正方向向下，（0,0）在canvas左上角
	ctx.drawImage(girlPic,100,150,600,300);	
}

//e是一个事件,unsefined只能用 === 运算来测试某个值是否是未定义的，因为 == 运算符认为 undefined 值等价于 null,但不是null。
//生成switchy用来判定鼠标是否在图片范围内
function mousemove(e){
	if(e.offsetX||e.layerX){
		var px=e.offsetX==undefined?e.layerX:e.offsetX;
		var py=e.offsetY==undefined?e.layerY:e.offsetY;
		//鼠标在图片范围内？out switchy=false;in switchy=true;
		//px在范围内&&py在范围内
		if(px>100&&px<700&&py>150&&py<450){
			switchy=true;
		}else{
			switchy=false;
		}
	}
}



