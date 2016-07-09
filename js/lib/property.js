function Property(price, rental, color, numberInSet, housePrice) {
  this.price = parseFloat(price);
  this.rental = rental;
  this.color = color;
  this.numberInSet = numberInSet;
  this.houses = 0;
  this.owner = null;
  this.isMortgaged = false;
  this.housePrice = housePrice;
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

Object.defineProperty(Property.prototype, "canBuildHouses", {
  get: function canBuildHouses() {
    return this.owner.properties.filter(function(property) {
      return property.color === this.color;
    }) === this.numberInSet;
  }
});

Property.prototype.addHouse = function() {
  if(this.canBuildHouses && this.houses < 5 && this.money >= this.housePrice) {
    this.houses++;
    this.money -= this.housePrice;
    return this.houses;
  }
  return false;
}