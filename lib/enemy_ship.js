const Bullet = require('./bullet');

class enemyShip {
  constructor(x, y, velocityX, velocityY, width, height, tag) {
    //attrs
    this.posX = x;
    this.posY = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.width = width;
    this.height = height;
    this.tag = tag;
    this.alive = true;
    this.cooldown = false;
    this.cooldownTimer = randomInt(0,10);

    //bindings

    this.shoot = this.shoot.bind(this);
    this.cooldownreset = this.cooldownreset.bind(this);
    this.drawSelf = this.drawSelf.bind(this);
    this.clearSelf = this.clearSelf.bind(this);
  }

  drawSelf() {
    ctx.fillStyle = "White";
    ctx.drawImage(imageRepo.enemy1,
      this.posX, this.posY, this.width, this.height);
  }

  clearSelf() {
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
  }

  moveHorizontal() {
      if (randomInt(0,2) === 0) {
        this.posX += 30;
      } else {
        this.posX -= 30;
      }
    this.screenResets();
  }

  moveVertical() {
    let chancetoMoveForward = randomInt(0,10);
    let forwardVelocity = 0;
      if (chancetoMoveForward >= 9) {
        forwardVelocity = 30;
      }
    this.posY += forwardVelocity;
  }

  cooldownreset() {
    this.cooldown = false;
  }


  shoot(source) {
    if (this.cooldown) {
      this.cooldownTimer -= 1;
    } else {
      let nb = new Bullet(
        source.posX + 5, source.posY, 10, 6, 12);
        nb.spawn(source.posX + 7, source.posY + 28, 10, 6, 12, "enemy1");
        nb.drawSelf();
        bulletList.push(nb);
        this.cooldown = true;
        this.cooldownTimer = randomInt(0,10);
    }
  }

  screenResets() {
    if (this.posX < 60)
    this.posX = 60;
    if (this.posX > 520)
    this.posX = 520;
    if (this.posY > 400)
    this.destroy();
  }


  destroy() {
    //clear self
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
    this.alive = false;
    this.posX = -1000;
    this.posY = -1000;
  }

}//end of enemy ship

module.exports = enemyShip;
