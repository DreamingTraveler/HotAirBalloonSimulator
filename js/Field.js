var Field = function(){
    this.screenPosition = {
      x:0,
      y:1000330
    }
    this.hotAirBalloon = new HotAirBalloon(this);

    this.load = function(){

      this.player = new Player(this.hotAirBalloon);
    };

    this.init = function(){
      this.airPressure = 100000;//Pa
      this.constR = 287;
      this.temperature = 298;//25+273
      this.airDensity = 1.3// kg/m^3
      this.hotAirBalloon.init();
    };

    this.update = function(){
      this.player.update();
      this.hotAirBalloon.update();

      this.airDensity = 1.3*(298/this.temperature);

      if(this.hotAirBalloon.altitude > 0){
        this.temperature = 298 - (this.hotAirBalloon.altitude / 100 * 0.65);
      }

      if(this.hotAirBalloon.pic.position.y > 510 && this.hotAirBalloon.airDensity < this.airDensity &&
         this.screenPosition.y <= 1000330 && this.hotAirBalloon.isFlying){
          this.screenPosition.y -= this.hotAirBalloon.previousVelocity + 0.5*this.hotAirBalloon.acceleration;
      }
      this.generateWind();

    };

    this.generateWind = function(){
      if(this.hotAirBalloon.altitude > 2){
        this.hotAirBalloon.pic.position.x += 0.1;
        this.hotAirBalloon.cat.position.x += 0.1;
        this.screenPosition.x += 0.1;
      }
      if(this.hotAirBalloon.altitude > 15){
        this.hotAirBalloon.pic.position.x += 0.3;
        this.hotAirBalloon.cat.position.x += 0.3;
        this.screenPosition.x += 0.3;
      }
    };

    this.draw = function(ctx){
      //this.bg.draw();
      var screenRow = Math.floor(this.screenPosition.y / 32), screenCol = Math.floor(this.screenPosition.x / 32);
      for(var i = 0; i < 2000; i++){
        ctx.fillStyle = 'rgba(136, 219, 189, 0.81)';
        ctx.fillRect(0 - this.screenPosition.x, i*3400 - this.screenPosition.y, 100000, 680);

        ctx.fillStyle = 'rgba(42, 119, 163, 0.77)';
        ctx.fillRect(0 - this.screenPosition.x, i*3400 - this.screenPosition.y+680, 100000, 680);

        ctx.fillStyle = 'rgba(93, 11, 149, 0.54)';
        ctx.fillRect(0 - this.screenPosition.x, i*3400 - this.screenPosition.y+680*2, 100000, 680);

        ctx.fillStyle = 'rgba(191, 58, 162, 0.62)';
        ctx.fillRect(0 - this.screenPosition.x, i*3400 - this.screenPosition.y+680*3, 100000, 680);

        ctx.fillStyle = 'rgba(232, 182, 30, 0.52)';
        ctx.fillRect(0 - this.screenPosition.x, i*3400 - this.screenPosition.y+680*4, 100000, 680);
      }
      for(var i = 0; i < 2000; i++){
        ctx.fillStyle = 'rgb(8, 96, 45)';
        ctx.fillRect(i*300 - this.screenPosition.x, 0 - this.screenPosition.y, 20, 1100000);
      }

      ctx.fillStyle = 'black';
      ctx.font = '20px bold Arial';
      ctx.fillText('Press H to heat hot air balloon', 100, 650);

      this.hotAirBalloon.pic.position.x -= this.screenPosition.x;
      this.hotAirBalloon.pic.position.y -= this.screenPosition.y;
      this.hotAirBalloon.pic.draw();
      this.hotAirBalloon.pic.position.x += this.screenPosition.x;
      this.hotAirBalloon.pic.position.y += this.screenPosition.y;

      this.hotAirBalloon.cat.position.x -= this.screenPosition.x;
      this.hotAirBalloon.cat.position.y -= this.screenPosition.y;
      this.hotAirBalloon.cat.draw();
      this.hotAirBalloon.cat.position.x += this.screenPosition.x;
      this.hotAirBalloon.cat.position.y += this.screenPosition.y;

      this.hotAirBalloon.draw(ctx);
    };



}
