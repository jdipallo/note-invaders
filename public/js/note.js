function Note(name, img, x, y, speedY, canvasWidth, canvasHeight, gameOverLine) {
  this.name         = name;
  this.img          = img;
  this.width        = 70;
  this.height       = 85;
  this.x            = x;
  this.y            = y;
  this.speedY       = speedY;
  this.noteVelocity = 127;
  this.canvasWidth  = canvasWidth;
  this.canvasHeight = canvasHeight;
};

Note.prototype.show = function(p) {
  p.imageMode(p.CENTER);
  p.image(this.img, this.x, this.y, this.width, this.height);
};

Note.prototype.move = function() {
  if (this.y >= (this.canvasHeight - this.gameOverLine) - this.height) {
    this.y = 10;
  }
  this.y += this.speedY;
}

// determine if the note that was hit is the correct note that
// needed to be hit. i.e.- the note in play (the current note in melody)
Note.prototype.wasHit = function() {
  
}