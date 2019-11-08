//定义为有很多个物体的一个物体池，他每一个成员都有一个状态，需要用到的时候就判断alive状态是否满足条件（空闲），空闲就把它拿出来执行任务
var waveObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];//是否执行任务
	this.r=[];//半径
}
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;//是没执行任务，可以用
		this.r[i]=0;
	}
}
waveObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="white";
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.04;//半径慢慢变大
			if(this.r[i]>50){
				this.alive[i]=false;//完成任务，生命结束	
				break;//跳出本次循环i++，r>50时，alpha是负值不希望绘制了
			}
			var alpha=1-this.r[i]/50;//半径逐渐增大，颜色逐渐减弱，反比关系
			
			//api canvas context.arc(圆的中心的 x 坐标,圆的中心的 y 坐标,圆的半径,起始角以弧度计（弧的圆形的三点钟位置是 0 度）,结束角以弧度计,可选规定应该逆时针还是顺时针绘图False = 顺时针true = 逆时针);
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);//绘制整个圆周
			ctx1.closePath();
			ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";//慢慢消失
			ctx1.stroke();
			//draw
		}
	}
	ctx1.restore();
}
waveObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i])
			{
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;//获得圆圈出生的位置
			//born
			return;//找到一个就退出循环
			}
	}
}