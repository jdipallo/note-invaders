function Note(name, img, x, y, speedY) {
  this.name         = name;
  this.img          = img;
  this.width        = 70;
  this.height       = 85;
  this.x            = x;
  this.y            = y;
  this.speedY       = speedY;
  this.noteVelocity = 127;
};

Note.prototype.show = function() {
  imageMode(CENTER);
  image(this.img, this.x, this.y, this.width, this.height);
};

Note.prototype.move = function() {
  if (this.y >= (canvasHeight - gameOverLine) - this.height) {
    this.y = 10;
  }
  this.y += this.speedY;
}

// determine if the note that was hit is the correct note that
// needed to be hit. i.e.- the note in play (the current note in melody)
Note.prototype.wasHit = function() {
  
}