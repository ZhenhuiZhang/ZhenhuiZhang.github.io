//两个canvas和他们对应的两个场景,lastTime上一帧被执行的时间,deltaTime记录两帧间隔的时间差
var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;//获取canvas的尺寸

var bgPic=new Image();

var ane;
var fruit;
var mom;
var baby;
var babyTail=[];//小鱼尾巴动画序列帧
var babyEye=[];
var babyBody=[];
var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];

var data;
var wave;//大鱼吃果实的时候白色的圈
var halo;//小鱼跟大鱼接触时的光圈

var dust;//漂浮物
var dustPic=[];

var mx;
var my;//鼠标的位置
//body加载完之后就把game作为所有js脚本的路口
document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameLoop();
}
function init(){
	//获得canvas context(场景),canvas相当于画布，context相当于画笔
	can1=document.getElementById("canvas1");//fishes,dust,UI,cirsle
	ctx1=can1.getContext('2d');
	can2=document.getElementById("canvas2");//background,ane,fruits
	ctx2=can2.getContext('2d');             //绘制2d场景
	
	can1.addEventListener('mousemove',onMouseMove,false);//检测鼠标移动,是一个侦听事件并处理相应的函数
	
	bgPic.src="./src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;
	ane=new aneObj();
	ane.init();//初始化
	fruit=new fruitObj();
	fruit.init();
	mom=new momObj();
	mom.init();
	baby=new babyObj();
	baby.init();
	mx=canWidth*0.5;
	my=canHeight*0.5;
	//小鱼动画
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();//每一个变量都是图片
		babyTail[i].src="./src/babyTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}
	//大鱼动画
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}
	data=new dataObj();
	for(var i=0;i<8;i++){
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src="./src/bigSwim"+i+".png";
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";//left,center,right
	
	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();
        
        for(var i=0;i<7;i++){
            dustPic[i]=new Image();
            dustPic[i].src="./src/dust"+i+".png";
        }
        dust=new dustObj();
        dust.init();
}
/*
 * 一帧一帧的的刷新,根据每一帧的时间差，来调整物体平滑的运动
 */
function gameLoop(){
	window.requestAnimFrame(gameLoop);//setInterval,setTimeout（）,当前绘制完成之后会只能根据你机器的性能，(时间间隔不确定的，会变化)间隔多长时间绘制下一帧;frame per second(fps)
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;  //跟新上一帧的时间
    if(deltaTime>40)deltaTime=40;//防止deltaTime变得很大时，果实变很大
    drawBackground();
    ane.draw();
    fruitMonitor();//每一帧都要进行判断
    fruit.draw();
    
    ctx1.clearRect(0,0,canWidth,canHeight); //清空canvas1前面一帧的内容，在干净的画布上再重新画鱼
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

/*
 * offsetX:IE特有,鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值
 * layerX:FF特有,鼠标相比较于当前坐标系的位置,即如果触发元素没有设置绝对定位或相对定位,以页面为参考点,如果有,将改变参考坐标系,从触发元素盒子模型的border区域的左上角为参考点
 * offsetX/offsetY：W3C- IE+ Firefox- Opera+ Safari+ chrome+
 * layerX/layerY：W3C- IE- Firefox+ Opera- Safari+ chrome+
 */
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX||e.layerX){
			mx=e.offSetX==undefined?e.layerX:e.offSetX;
			my=e.offSetY==undefined?e.layerY:e.offSetY;
		}
	}
}
