function SpaceShip(y, cw, ch, speedX, img, bottom) {
  this.canvasWidth  = cw;
  this.canvasHeight = ch;
  this.width        = 120;
  this.height       = 110;
  this.x            = cw;
  this.y            = y;
  this.speedX       = speedX;
  this.img          = img;
  this.bottom       = bottom;
  this.showSpaceShip   = false;
};

SpaceShip.prototype.show = function(p) {
  p.imageMode(p.CENTER);
  p.image(this.img, this.x, this.y, this.width, this.height);
};
// shake the spaceship up/down by a random y component
SpaceShip.prototype.move = function(p) {
  if (this.y >= this.bottom
      || this.y <= 0) {
    this.y = this.canvasHeight/2;
  }
  else {
    this.y += p.random(-3, 3);
  }
  
  if ((this.x + this.width / 2 ) <= 0) {
    this.showSpaceShip = false;
    this.x = this.canvasWidth;
  }
  else {
    this.x -= this.speedX;
  }
}

SpaceShip.prototype.hideSpaceShip = function(p) {
    this.x = this.canvasWidth;
    this.y = p.random(110, this.bottom - 110)
    this.showSpaceShip = false;
}