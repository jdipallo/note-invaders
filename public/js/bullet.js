function Bullet(x, y, speedY) {
  this.width = 10;
  this.height = 50;
  this.x = x;
  this.y = y;
  this.speedY = speedY;
  this.showMe = false;
};

Bullet.prototype.show = function() {
  imageMode(CENTER);
  image(bulletImg, this.x, this.y, this.width, this.height);
};

Bullet.prototype.move = function() {
  this.y -= this.speedY;
};

Bullet.prototype.isOffScreen = function() {
  if (this.y < 0) {
    return true;
  } else {
    return false;
  }
}

Bullet.prototype.hitNote = function(note) {
  if (((this.y - this.height / 2) + 10) <= (note.y + note.height / 2)) {
    if (((this.x - this.width / 2) >= (note.x - note.width / 2)) && (this.x - (this.width / 2) <= (note.x + note.width / 2))) {
      return true;
    }
  }
  // var d = dist(this.x, this.y, note.x, note.y);
  return false;
}

Bullet.prototype.markForDelete = function() {
  this.showMe = true;
}
Bullet.prototype.isMarkedForDelete = function() {
  return this.showMe;
}