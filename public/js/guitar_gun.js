function GuitarGun(canvasWidth, canvasHeight, flyingVImg) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.flyingVImg = flyingVImg;
  this.x = canvasWidth / 2;
  this.y = canvasHeight - 80;
  this.height = 150;
  this.width = 50;
};

GuitarGun.prototype.show = function(p) {
  if (this.x < this.width / 2) {
    this.x = this.width / 2;
  } 
  else if (this.x > this.canvasWidth - this.width / 2) {
    this.x = this.canvasWidth - this.width / 2;
  }
  p.imageMode(p.CENTER)
  p.image(this.flyingVImg, this.x, this.y, this.width, this.height);
};

GuitarGun.prototype.move = function(direction) {
  this.x += direction * 7;
}