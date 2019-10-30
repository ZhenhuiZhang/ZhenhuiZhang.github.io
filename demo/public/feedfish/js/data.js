var dataObj=function(){
	this.fruitNum=0;
	this.double=1;//是否吃到蓝色果实，吃到了分值加倍（2），得到的分值为fruitNum*double
	this.score=0;
	this.gameOver=false;//记录，游戏结束没
	this.alpha=0;
}
dataObj.prototype.reset=function(){
	this.fruitNum=0;
	this.double=1;
}
dataObj.prototype.draw=function(){
	var w=can1.width;
	var h=can1.height;
	
	ctx1.save();
	ctx1.shadowBlur=10;//shadowBlur 属性设置或返回阴影的模糊级数。
	ctx1.shadowColor="white";//阴影颜色
	ctx1.fillStyle="white";//填充颜色
	ctx1.fillText("SCORE: "+this.score,w*0.5,h-20);
	if(this.gameOver){
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	ctx1.restore();//让里面的样式只适用在这里，而不作用在其他内容；
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;//转换分数后，数据恢复原始状态
}
