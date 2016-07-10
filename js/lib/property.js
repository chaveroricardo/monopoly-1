function Property(name, price, rental, color, housePrice) {
  this.price = parseFloat(price);
  this.rental = rental;
  this.color = color;
  this.houses = 0;
  this.owner = null;
  this.isMortgaged = false;
  this.housePrice = housePrice;

  this.titleDeed = document.createElement("DIV");
  this.titleDeed.className = "title-deed";

  this.titleDeed.innerHTML = '<div class="front">\
                                <div class="header ' + this.color + '">\
                                  <h4>Title Deed</h4>\
                                  <h3>' + name + '</h3>\
                                </div>\
                                <div class="details">\
                                  <h4>Rent £' + this.rental[0] + '</h4>\
                                  <dl>\
                                    <dt>With 1 House</dt><dd>£' + this.rental[1] + '</dd>\
                                    <dt>With 2 House</dt><dd>£' + this.rental[2] + '</dd>\
                                    <dt>With 3 House</dt><dd>£' + this.rental[3] + '</dd>\
                                    <dt>With 4 House</dt><dd>£' + this.rental[4] + '</dd>\
                                    <dt>With HOTEL</dt><dd>£' + this.rental[5] + '</dd>\
                                  </dl>\
                                  <h5>Mortgage Value £' + (this.price/2) + '</h5>\
                                  <h6>House cost £' + this.housePrice + ' each</h6>\
                                  <h6>Hotels, £' + this.housePrice + ' each<br>plus 4 houses</h6>\
                                </div>\
                              </div>\
                              <div class="back">\
                                <h3>Mortgaged</h3>\
                                <h4>' + name + '</h4>\
                                <h5>Mortgaged for £' + (this.price/2) + '</h5>\
                                <p>Card must be turned this side up if property is mortgaged</p>\
                              </div>';

  this.titleDeed.onclick = function() {
    if(this.parentNode.classList.contains("active")) {
      event.stopPropagation();
      this.classList.toggle("mortgaged");
    }
  }
}

Object.defineProperty(Property.prototype, "rent", {
  get: function getRent() {
    return this.rental[this.houses];
  }
});

Object.defineProperty(Property.prototype, "numberInSet", {
  get: function numberInSet() {
    return ["brown", "darkBlue"].indexOf(this.color) === -1 ? 3 : 2;
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