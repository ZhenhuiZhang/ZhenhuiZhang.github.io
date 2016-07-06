var fruitObj=function(){
   this.alive=[];//bool	
   this.x=[];
   this.y=[];
   this.aneNO=[];
   this.l=[]; //果实图片的长度
   this.spd=[];//给每一个果实一个成长跟上升的速度
   this.fruitType=[];//果实类型
   this.orange=new Image();
   this.blue=new Image();//两种果实
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
                this.aneNO[i]=0;
		this.l[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.02)
		this.fruitType[i]="";
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";//初始化的时候把图片加载进来
}

fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		//draw
		//fine an ane,grow,fly up
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
		    if(this.l[i]<=14)//成长，
                    {      
                           var NO=this.aneNO[i]
                           this.x[i]=ane.headx[NO];
                           this.y[i]=ane.heady[NO];
			   this.l[i]+=this.spd[i]*deltaTime;//变大
		    }else{
			   this.y[i]-=this.spd[i]*7*deltaTime;//向上飘
		    }
                    ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		    if(this.y[i]<10){
			   this.alive[i]=false;
		    }
	     }
	}
}

//找一个海葵(位置)成长出来
fruitObj.prototype.born=function(i){
	this.aneNO[i]=Math.floor(Math.random()*ane.num);//Math.floor整数值,aneID范围0-49告诉它长在哪一个海葵上
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();//为果实随机分配一种类型
	if(ran<0.2){
	    this.fruitType[i]="blue";//orange,blue
    }else{
    	this.fruitType[i]="orange";
    }
}

fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}

function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		//send fruit
		sendFruit();
		return;
	}
}

function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;//当有一个出生就结束循环，每次只产生一个
		}
	}
}
