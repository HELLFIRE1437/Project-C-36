class Food {
    constructor(){
    this.lastFed;
    this.image=loadImage('images/Milk.png');
    }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

    display(){
      var x=80,y=100;
      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
      if(foodS!=0){
        for(var i=0;i<foodS;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}
