function Property(price, rental, color) {
  this.price = parseFloat(price);
  this.rental = rental;
  this.color = color;
  this.houses = 0;
  this.owner = null;
  this.isMortgaged = false;
}

Object.defineProperty(Property.prototype, "rent", {
  get: function getRent() {
    return this.rental[this.houses];
  }
});

Property.prototype.mortgage = function() {
  this.mortgage = true;
  return true;
}

Property.prototype.unMortgage = function() {
  this.mortgage = false;
  return true;
}

Property.prototype.buy = function(player) {
  this.owner = player;
  return true;
}

Property.prototype.addHouse = function() {
  if(this.houses < 5) {
    this.houses++;
    return this.houses;
  }
  return false;
}