var HotAirBalloon = function(field){
    this.field = field;
    this.pic = new Framework.Sprite("image/HAB.png");
    this.cat = new Framework.Sprite('image/cat.png');


    this.init = function(){
      this.cat.scale = 0.5;
      this.pic.scale = 0.3;
      this.pic.position = {
          x: 680 - this.field.screenPosition.x,
          y: 1000830
      };
      this.cat.position = this.pic.position;
      this.temperature = 298;//273+25
      this.altitude = 0;
      this.volume = 2000; //m^3
      this.airPressure;
      this.airDensity = 1.3;//D(kg/m^3)
      this.airMass = this.airDensity * this.volume;//M=DV
      this.weight = 300; //kg
      this.gravity = this.weight * 9.8;//G = m*g (m(kg);g=9.8N/kg)
      this.buoyancy;
      this.dT = 0;
      this.heat = 132;//cal
      this.acceleration = 0;
      this.previousVelocity = 0;
      this.currentVelocity = 0;
      this.fuel = 20;
      this.counter = 0;
      this.isFlying = false;
    }
    this.update = function(){
      // console.log("Temperature = "+(this.temperature-273));
      this.counter++;
      //this.airPressure = 1/22 * this.field.constR * this.temperature
      this.temperature -= (0.026 * (this.temperature - this.field.temperature))/120;
      this.airDensity = 1.3*(298/this.temperature);
      this.airMass = this.airDensity * this.volume;
      this.buoyancy = this.volume*(this.field.airDensity - this.airDensity)*9.8;//F=mgV
      this.dT = this.heat / (this.airMass * 0.00024);
      //if(this.buoyancy > this.gravity){
        this.acceleration = ((this.buoyancy-this.gravity)/this.weight)/10;
      //}
      if(this.counter % 120 === 0 && this.isFlying){
        if(this.currentVelocity >= 6){
          this.currentVelocity = 6;
        }
        this.previousVelocity = this.currentVelocity;
        this.currentVelocity += this.acceleration;
        //console.log("Vo = "+this.previousVelocity);
        //console.log("V = "+this.currentVelocity);
      }

        // else{
        //   this.acceleration = -9.8;
        // }

        // console.log("Dbal = "+this.airDensity);
        // console.log("Dair = "+this.field.airDensity);
        // console.log("Buoyancy = "+this.buoyancy);
        // console.log("Gravity = "+this.gravity);
        // console.log("Acceleration = "+this.acceleration);
        // console.log("Air mass = "+this.airMass);
        // console.log("V = "+this.currentVelocity);
        // console.log(this.field.screenPosition.y);
        // console.log(this.pic.position.x);
      this.pic.draw();

      if(this.pic.position.y < 1000820 || this.buoyancy > this.gravity){
        this.isFlying = true;
      }
      else{
        this.isFlying = false;
      }


     if(this.airDensity < this.field.airDensity && this.pic.position.y > 0 &&
        this.pic.position.y <= 1000830 && this.isFlying){
      //  if(this.pic.position.y <= 1000820){
      //    this.pic.position.y = 1000830-;
      //  }
       this.pic.position.y -= (this.previousVelocity + 0.5*this.acceleration);
       this.cat.position.y -= (this.previousVelocity + 0.5*this.acceleration);
       this.altitude = Math.round((1000830 - this.pic.position.y)/120);
     }

    }

    this.draw = function(ctx){
      ctx.fillStyle = 'black';
      ctx.font = '20px bold Arial';
      ctx.fillText("Distance: " + Math.round((this.pic.position.x - 680)/10)  + "m", 1130, 40);
      ctx.fillText("Altitude: " + Math.round(this.altitude) + "m", 1150, 80);
      ctx.fillText("Temperature(Air in balloon): " + (Math.round(this.temperature)-273) + "C", 900, 120);
      ctx.fillText("Temperature(Outside air): " + Math.round((this.field.temperature-273)*100)/100 + "C", 30, 120);
      ctx.fillText("Buoyancy: " + Math.round(this.buoyancy*100)/100 + "N", 1100, 160);
      ctx.fillText("Gravity: " + Math.round(this.gravity*100)/100 + "N", 30, 160);
      ctx.fillText("Velocity: " + Math.abs(Math.round(this.currentVelocity*100)/100) + " m/s", 1100, 200);
      ctx.fillText("Acceleration: " + Math.round(this.acceleration*100)/100 + " m/s^2", 1000, 240);
      ctx.fillText("Fuel: " + Math.round(this.fuel*100)/100 + "gal", 1150, 280);
    }

}
