function Player(piece) {
  this.piece = piece;
  this.square = 0;
  this.money = 1500;
  this.inJail = false;
}

Player.prototype.move = function() {
  this.square += Math.ceil(Math.random() * 12);

  if(this.square > 39) {
    this.square = this.square%40;
  }
}