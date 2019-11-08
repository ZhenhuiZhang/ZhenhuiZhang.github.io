//首先建立一个小鱼的类，然后定义一个小鱼的变量来继承
var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	
	this.babyTailTimer=0;
	this.babyTailCount=0;//小鱼尾巴序列帧计时器和记录计算到哪一帧的变量
	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;//当前这张图片持续多少时间
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;	
}
babyObj.prototype.draw=function(){
	//lerp x,y
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	//lerp angle
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//-PI到PI
	//lerp angle让小鱼的角度不断的趋向于大鱼的角度
	this.angle=lerpAngle(beta,this.angle,0.6);
	
	//baby tail count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;//取值为0到7
		this.babyTailTimer%=50;//计时器复原
	}
	
	//baby eye 
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;//当图片是睁着眼睛，我们希望它的睁着眼睛的时间在[2000,3500)
		}else{
			this.babyEyeInterval=200;//眯眼睛时间200毫秒
		}
	}
	
	//baby body
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;//一帧一帧的慢慢变白
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;//停在变白这帧
			//game over
			data.gameOver=true;
		}
	}
	
	//ctx1
	ctx1.save();
	//translate()转移原点的相对坐标
	ctx1.translate(this.x,this.y);//this.x,this.y就变成了0,0点
	ctx1.rotate(this.angle);
	
	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);//因为图片有大小，我们希望图片中心是原点
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);//先画什么会在下面
	ctx1.restore();//里面的方法只适用于小鱼，对其他内容不产生影响
}
//基本的类就建立了