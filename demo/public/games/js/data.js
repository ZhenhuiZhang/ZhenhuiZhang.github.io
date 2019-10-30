var dataObj=function(){
	this.score=0;
	this.alpha=0;
}

dataObj.prototype.draw=function(){
	var w=can2.width;
	var h=can2.height;
//	this.score+=parseInt(deltaTime*0.06);
	
	ctx2.save();
//	ctx2.shadowBlur=10;//shadowBlur 属性设置或返回阴影的模糊级数。
//	ctx2.shadowColor="white";//阴影颜色
	ctx2.fillStyle="white";//填充颜色
	ctx2.fillText("SCORE: "+this.score,w*0.1,h*0.1);
	ctx2.restore();//让里面的样式只适用在这里，而不作用在其他内容；
}