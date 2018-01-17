class Parallax {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.width = 600;
    this.height = 400;
    this.speed = 0.2;
    this.drawSelf = this.drawSelf.bind(this);
  }

  drawSelf() {
    ctx_bg.clearRect(this.posX, this.posY, this.width, this.height);
    this.posX += this.speed;
    if (this.posX > this.width) { this.posX = 0; }
    if (this.posX > 0) { ctx_bg.drawImage(imageRepo.spaceBG,
      this.posX - this.width + 1, this.posY, this.width, this.height); }
    ctx_bg.drawImage(imageRepo.spaceBG,
    this.posX, this.posY, this.width, this.height)
  }
}

module.exports = Parallax;
