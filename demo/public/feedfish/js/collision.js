//判断大鱼和果实的距离
function momFruitsCollision(){
	if(!data.gameOver)//gameover
	{
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);//calculate length，大鱼跟果实距离的平方
				if(l<900){
					fruit.dead(i);//fruit eaten
					data.fruitNum++;//吃到果实时
					mom.momBodyCount++;
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}//大于7就停在7那里
				    if(fruit.fruitType[i]=="blue")//blue
				    {
				         data.double=2;	
				    }
				    wave.born(fruit.x[i],fruit.y[i]);//吃到果实就产生圈
				}
			}
		}
	}
}
//mom baby collision大鱼跟小鱼碰撞,更新分数
function momBabyCollision(){
	if(data.fruitNum>0&&!data.gameOver)//当大鱼有捕捉到果实时才执行，gameover
	{
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			//baby recover
			baby.babyBodyCount=0;//计数器变回0，图片变回开始的时候的那张
			mom.momBodyCount=0;
			//score update
			data.addScore();
			//draw halo
			halo.born(baby.x,baby.y);
		}
	}
}