const Bullet = require('./bullet');
const Explosion = require('./explosion');

class Cannon {
  constructor() {
    this.posX = canvas.width/2 - 12;
    this.posY = canvas.height - 140;
    this.width = 30;
    this.height = 80;
    this.alive = false;
    this.tag = "playerCannon";
    this.deathtimer = 0;
    this.cooldown = 10;
    this.cooling = false;

    this.drawSelf = this.drawSelf.bind(this);
    this.screenResets = this.screenResets.bind(this);
    this.destroy = this.destroy.bind(this);
    this.respawn = this.respawn.bind(this);
  }

  drawSelf() {
    ctx.clearRect(this.posX, this.posY, this.width, this.height -25);
    ctx.drawImage(imageRepo.cannonSheet,
    0, 0, 90, 220,
    this.posX, this.posY, this.width, this.height);
  }
  screenResets() {
    //if it goes off right side
    if (this.posX > 580)
    this.posX = 40;
    if (this.posX < 30)
    this.posX = 570;
  }

  respawn() {
    this.alive = true;
    ctx.drawImage(imageRepo.cannonSheet,
    0, 0, 90, 220,
    this.posX, this.posY, this.width, this.height);
  }

  destroy() {
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
    let newexplo = new Explosion(this);
    newexplo.drawSelf();
    explosionList.push(newexplo);
    this.alive = false;
  }

  playerShoot() {

    if (!this.cooling) {
      audioRepo.shootsound.play();
      let nb = new Bullet(
        this.posX + 5, this.posY, 10, 6, 12);
        nb.spawn(this.posX + 5, this.posY, 10, 6, 12, "player");
        nb.drawSelf();
        bulletList.push(nb);
        this.cooling = true;
    }

  }
}

class Mothership {
  constructor() {
    this.posX = 60;
    this.posY = 288;
    this.width = 500;
    this.height = 200;
    this.tag = "mothership";
    this.hullHP = 100;
    this.shieldHP = 100;
    this.alive = true;

    this.drawSelf = this.drawSelf.bind(this);
    this.drawShield = this.drawShield.bind(this);
    this.clearShield = this.clearShield.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
  }

  drawSelf() {
    // ctx.clearRect(this.posX, this.posY, this.width, this.height);
    ctx.drawImage(imageRepo.mothershipImg,
    this.posX, this.posY, this.width, this.height);
  }

  takeDamage() {
    if (this.shieldHP > 0) {
      this.shieldHP -= 10;
    } else {
      this.hullHP -= 10;
    }
  }

  drawShield() {
    ctx.clearRect(this.posX - 20, this.posY - 60, this.width, this.height);
    ctx.globalAlpha = 0.4;
    ctx.drawImage(imageRepo.shieldSheet,
    0, 0, 300, 100,
    this.posX - 20, this.posY - 60, this.width, this.height);
    ctx.globalAlpha = 1;
  }

  clearShield() {
    ctx.clearRect(this.posX - 20, this.posY - 60, this.width, this.height);
  }
}

module.exports.Cannon = Cannon;
module.exports.Mothership = Mothership;
