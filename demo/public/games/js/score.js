//判断人物和障碍物的距离
function momFruitsCollision(){
    var startNum=stars.length
	{
		for(var i=0;i<startNum;i++){
			
				var l=calLength2(stars[i].x,stars[i].y,jack.x,jack.y);//calculate length，大鱼跟果实距离的平方
				if(l<35){
					starObj.prototype.xSpd=0;
					this.alpha+=1*0.0005;
					if(this.alpha>1){
						this.alpha=1;
					}
					ctx2.fillStyle="rgba(255,255,255,"+this.alpha+")";
					ctx2.fillText("GAMEOVER",w*0.4,h*0.3);
					
				}
			}
		
	}
}
