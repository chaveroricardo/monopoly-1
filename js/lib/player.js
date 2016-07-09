function Player(piece) {
  this.piece = piece;
  this.square = 0;
  this.money = 1500;
  this.inJail = false;
  this.properties = [];
  this.lastDiceRoll = 0;
}

Player.prototype.move = function() {
  this.lastDiceRoll = Math.ceil(Math.random() * 11) + 1;
  this.square += this.lastDiceRoll;

  if(this.square > 39) {
    this.square = this.square%40;
    this.money += 200; // player has passed go
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

Player.prototype.payRent = function(property) {
  this.money -= property.rent;

  if(!this.isBankrupt) {
    property.owner.money += property.rent;
  }
  else {
    property.owner.money += this.money + property.rent; // player pays what (s)he can
    // TODO: player needs to be able to resign, or mortgage properties to make up the remainder
  }
}

Object.defineProperty(Player.prototype, "isBankrupt", {
  get: function isBankrupt() {
    return this.money < 0;
  }
});





























