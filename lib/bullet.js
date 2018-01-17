const Explosion = require('./explosion');

//main bullet script
class Bullet {
    constructor(x, y, velocity, width, height) {
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.width = width;
      this.height = height;

      this.alive = false;
      this.defaultWidth = 6;
      this.defaultHeight = 12;
      this.defaultVelocity = 5;
      this.tag = "";
      //decide the tag on spawn

      this.spawn = this.spawn.bind(this);
      this.drawSelf = this.drawSelf.bind(this);
      this.destroy = this.destroy.bind(this);
      this.checkIntersect = this.checkIntersect.bind(this);
      this.checkCollision = this.checkCollision.bind(this);
    }


    spawn(x, y, velocity, width, height, tag) {
      this.posX = x;
      this.posY = y;
      this.velocity = velocity;
      this.width = width;
      this.height = height;
      this.alive = true;
      this.tag = tag;
    }

    drawSelf() {
      ctx.clearRect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "orange";
      ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    //I plugged in the numbers from the actual positions of the
    //bullet and mothership and it returned true
    checkIntersect(otherobj) {
      if (this.posX < otherobj.posX + otherobj.width &&
        this.posX + this.width > otherobj.posX &&
        this.posY < otherobj.posY + otherobj.height &&
        this.height + this.posY > otherobj.posY) {
          return true;
      } else {
        return false;
      }
    }

    checkCollision(otherObjects) {
      //player bullets ONLY check against enemy list
      //enemy bullets ONLY check against player objects
      if (this.alive) {

        for (let i = 0; i < otherObjects.length; i++) {
          //it gets in here but never fulfills check intersect with Mship
          // console.log("now checking for collision");
            //only for player

          if (otherObjects[i].alive) {

            if (this.checkIntersect(otherObjects[i])) {
              // debugger
              if (otherObjects[i].tag === "enemyShip") {
                //enemy unit
                otherObjects[i].destroy();
                otherObjects.splice(i, 1);
                window.score += 10;
                this.destroy();

              } else if (otherObjects[i].tag === "mothership") {
                //mothership dmg
                otherObjects[i].takeDamage();
                this.destroy();
              } else if (otherObjects[i].tag === "playerCannon") {
                //cannon death
                otherObjects[0].takeDamage();
                otherObjects[i].destroy();
                this.destroy();
              } else if (otherObjects[i].tag === "enemy1") {
                //enemy bullet
                otherObjects[i].destroy();
                this.destroy();
              }

            }//end of checkIntersect
          }//end of otherObjects alive
        }//end of for

      }//end of bullet alive
    };

    destroy() {
      //create explosion
      let newexplo = new Explosion(this);
      newexplo.drawSelf();
      audioRepo.smallExplo.play();
      explosionList.push(newexplo);

      ctx.clearRect(this.posX, this.posY, this.width, this.height);
      this.alive = false;
      this.posX = -1000;
      this.posY = -1000;
    }
  }

module.exports = Bullet;
