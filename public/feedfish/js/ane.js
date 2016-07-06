var aneObj=function(){
        //start point,control point,end point(sin)，用正弦函数控制那个点来回动
	this.rootx=[];//start point不动的
        this.headx=[];//记录变化中的头部坐标，让果实在上面出生长大
        this.heady=[];
        this.amp=[];//每一个海葵都有自己的一个振幅
        this.alpha=0;//正弦函数的角度
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;//Math.random取值[0,1),每隔一段距离就长一棵海葵,this.x[]储存那个位置
                this.headx[i]=this.rootx[i];
                this.heady[i]=canHeight-250+Math.random()*50;
                this.amp[i]=Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){
        this.alpha+=deltaTime*0.0008;//正弦函数的角度（x坐标）一直在变化,同时也是摆动的速度
        var l=Math.sin(this.alpha);//就是正弦函数坐标轴上的y坐标[-1,1]
	ctx2.save();
	ctx2.strokeStyle="#3b154e";
	ctx2.lineCap="round";
	ctx2.lineWidth=20;
	ctx2.globalAlpha=0.6;//strokrStyle必须定义在stroke之前，这样才能绘制，这几个每个海葵都是一样的，不必每次循环都定义
	for(var i=0;i<this.num;i++){
		//beginPath,告诉场景我们要开始一个路径，moveto告诉它一个起始点，lineto是从起始点到达的另外一个点，strokeStyle给绘制线段的颜色，stroke绘制线段，lineWidth线段的宽度，lineCap线段结尾的样式，globalAlpha给绘制的线段一个透明度
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);//开始点的坐标
                //quadraticCurveTo（cpx,cpy,x,y）绘制二次贝塞尔曲线,(cpx,cpy)控制点的坐标，(x,y)结束点的坐标
                this.headx[i]=this.rootx[i]+l*this.amp[i]
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();//save,restore让里面设置的样式只在里面有效，到外面要重新设置
}