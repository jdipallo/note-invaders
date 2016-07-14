function GuitarGun(canvasWidth, canvasHeight, flyingVImg) {
  this.flyingVImg = flyingVImg;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.x = canvasWidth / 2;
  this.y = canvasHeight - 80;
  this.height = 150;
  this.width = 50;
};

GuitarGun.prototype.show = function(p) {
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > this.canvasWidth - this.width) {
    this.x = this.canvasWidth - this.width - 3; // just a few extra pixels to look nice next to X boundary
  }
  p.imageMode(p.CENTER)
  p.image(this.flyingVImg, this.x, this.y, this.width, this.height);
};

GuitarGun.prototype.move = function(direction) {
  this.x += direction * 7;
}