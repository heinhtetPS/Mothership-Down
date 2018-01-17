class Explosion {
  constructor(source) {
    this.posX = source.posX;
    this.posY = source.posY;
    this.width = 42;
    this.height = 44;
    this.alive = true;
    this.timer  = 0;

    //for spriteAnim
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.maxFrames = 7;


      this.update = this.update.bind(this);
      this.drawSelf = this.drawSelf.bind(this);
    // this.destroy = this.destroy.bind(this);
  }

  update() {
    this.tickCount += 1;
    this.timer += 1;
      // debugger
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.maxFrames) {
        this.frameIndex += 1;

      }
    }
  }

  drawSelf() {
      ctx.clearRect(this.posX, this.posY, this.width, this.height);
      ctx.drawImage(imageRepo.explosion,
        this.frameIndex * 297 / 7,          0,        42,        44,
        this.posX, this.posY, this.width, this.height);
  }

  destroy() {
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
    this.alive = false;
    this.posX = -1000;
    this.posY = -1000;
  }
}

module.exports = Explosion;
