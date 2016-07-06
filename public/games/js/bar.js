var starObj=function(){
	this.x;
	this.y;
//	this.picNo;
	this.timer;
	//星星在x轴跟y轴的移动速度
	this.xSpd;
	this.ySpd;
}
starObj.prototype.itemLength=6;
starObj.prototype.xSpd=1;
starObj.prototype.init=function(){
	this.x=Math.random()*300+80;//Math.random()返回[0,1);
	this.y=94;//在图片范围内随机出现
//	this.picNo=Math.floor(Math.random()*7);//[0,7),向下取整，让图片初始值不一样，就在图片显示的星星不一样
	this.timer=0;
//	this.xSpd=1;//[-1.5,1.5)
//	this.ySpd=Math.random()*3-1.5;
}

		
//定义一个draw的方法,
starObj.prototype.draw=function(){
	
		//beginPath,告诉场景我们要开始一个路径，moveto告诉它一个起始点，lineto是从起始点到达的另外一个点，strokeStyle给绘制线段的颜色，stroke绘制线段，lineWidth线段的宽度，lineCap线段结尾的样式，globalAlpha给绘制的线段一个透明度
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);//开始点的坐标
		ctx.lineTo(this.x,this.y+this.itemLength);
		ctx.stroke();
	
}

starObj.prototype.update=function(){
	this.x-=this.xSpd;//deltaTime使星星的移动速度流畅一点
//	this.y+=this.ySpd*deltaTime*0.004;
	//this.x超过范围init，重新出现在图片中
	if(this.x<0||this.x>300){
//		this.init();//超出了就重生
		this.x=Math.random()*50+300;
		return;//重生了就退出函数，下面没必要执行了
	}
}

function drawStars(){
	ctx.save();
	ctx.strokeStyle="#000000";
//	ctx.lineCap="round";
	ctx.lineWidth=3;
	for(var i=0;i<num;i++){
		stars[i].update();
		stars[i].draw();
	}
	ctx.restore();//save,restore让里面设置的样式只在里面有效，到外面要重新设置
}
