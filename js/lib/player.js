function Player(piece) {
  this.piece = piece;
  this.square = 0;
  this.money = 1500;
  this.inJail = false;
  this.properties = [];
}

Player.prototype.move = function() {
  this.square += Math.ceil(Math.random() * 11) + 1;

  if(this.square > 39) {
    this.square = this.square%40;
  }

  return this;
}

Player.prototype.purchase = function(property) {

  if(this.money - property.price < 0) {
    return false;
  }

  this.money -= property.price;
  this.properties.push(property);
  property.owner = this;
}