var Player = function(hab){
    this.hotAirBalloon = hab;
    this.isKeyPress = false;

    this.update = function(){
        if(this.isKeyPress && this.hotAirBalloon.fuel > 0){
          this.hotAirBalloon.temperature += 0.05;
          this.hotAirBalloon.fuel -= 0.01;
        }
    }



    this.keydown = function(e, list){
        if(e.key === 'H'){
           this.key = 'H';
           this.isKeyPress = true;
        }
    }

    this.keyup = function(e, list){
        if(e.key){
            if(this.key === e.key){
                this.isKeyPress = false;
            }
        }
    }
}
