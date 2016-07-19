function Note(name, img, imgFile, x, y, speedY, canvasWidth, canvasHeight, bottomOfDrawingArea) {
  this.name         = name;
  this.img          = img;
  this.imgFile      = imgFile;
  this.width        = 70;
  this.height       = 95;
  this.x            = x;
  this.y            = y;
  this.speedY       = speedY;
  this.noteVelocity = 127;
  this.canvasWidth  = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.bottomOfDrawingArea = bottomOfDrawingArea + 3;
};

Note.prototype.show = function(p) {
  p.imageMode(p.CENTER);
  p.image(this.img, this.x, this.y, this.width, this.height);
};

Note.prototype.move = function() {
  if ((this.y + this.height/2) >= this.bottomOfDrawingArea) {
    this.y = 10;
  }
  this.y += this.speedY;
}

// lets move our correct "target" note to the bottom where the progress
// of melody notes will land based on note position in the melody
Note.prototype.moveToMelodyProgress = function(position) {

}

// determine if the note that was hit is the correct note that
// needed to be hit. i.e.- the note in play (the current note in melody)
Note.prototype.wasHit = function() {
  
}