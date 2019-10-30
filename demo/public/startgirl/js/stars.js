var starObj=function(){
	this.x;
	this.y;
	this.picNo;
	this.timer;
	//星星在x轴跟y轴的移动速度
	this.xSpd;
	this.ySpd;
}
starObj.prototype.init=function(){
	this.x=Math.random()*600+100;//Math.random()返回[0,1);
	this.y=Math.random()*300+150;//在图片范围内随机出现
	this.picNo=Math.floor(Math.random()*7);//[0,7),向下取整，让图片初始值不一样，就在图片显示的星星不一样
	this.timer=0;
	this.xSpd=Math.random()*3-1.5;//[-1.5,1.5)
	this.ySpd=Math.random()*3-1.5;
}

starObj.prototype.update=function(){
	this.x+=this.xSpd*deltaTime*0.004;//deltaTime使星星的移动速度流畅一点
	this.y+=this.ySpd*deltaTime*0.004;
	
	//this.x超过范围init，重新出现在图片中
	if(this.x<100||this.x>700){
		this.init();//超出了就重生
		return;//重生了就退出函数，下面没必要执行了
	}
	//this.y超过范围init，重新出现在图片中
	if(this.y<150||this.y>450){
		this.init();
		return;
	}
	this.timer+=deltaTime;
	if(this.timer>50){
		this.picNo+=1;
		this.picNo%=7;
		this.timer=0;
	}//累计超出50才换图片位置，按时间变化，不让它闪烁太快
}

//定义一个draw的方法,
starObj.prototype.draw=function(){
	//globalAlpha全局透明度，属性设置或返回绘图的当前透明值（alpha 或 transparency）,之后的改变的所有内容的透明度
	//save()
	ctx.save();
	ctx.globalAlpha=life;//调节透明度
	ctx.drawImage(starPic,this.picNo*7,0,7,7,this.x,this.y,7,7);
	//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);sx开始剪切的 x 坐标位置。sy开始剪切的 y 坐标位置。swidth被剪切图像的宽度。sheight被剪切图像的高度。x在画布上放置图像的 x 坐标位置。y在画布上放置图像的 y 坐标位置。width要使用的图像的宽度。（伸展或缩小图像）height要使用的图像的高度。（伸展或缩小图像）
	//restore()，重置之后就变回save()时的设置，就是透明度只在画星星是起作用
	ctx.restore();
}
function drawStars(){
	for(var i=0;i<num;i++){
		stars[i].update();
		stars[i].draw();
	}
}

function aliveUpdate(){
	if(switchy)//in area
	{   //show star
		life+=0.03*deltaTime*0.05;//鼠标在图片里透明度就慢慢增加
		if(life>1){
			life=1;
		}
	}else//out of area
	{   //hide star
		life-=0.03*deltaTime*0.05;////鼠标在图片外透明度就慢慢减少
		if(life<0){
			life=0;
		}
	}
}
