function Utility(name) {
  this.price = 150;
  this.owner = null;
  this.isMortgaged = false;

  this.titleDeed = document.createElement("DIV");
  this.titleDeed.className = "title-deed utility " + (name.toLowerCase().replace(" ", "-"));

  this.titleDeed.innerHTML = '<div class="front">\
                                <div class="header">\
                                  <h3>' + name + '</h3>\
                                </div>\
                                <div class="details">\
                                  <p>If one Utility is owned, rent is 4 times the amount shown on the dice</p>\
                                  <p>If both Utilities are owned, rent is 10 times the amount shown on the dice</p>\
                                  <h5>Mortgage Value £75</h5>\
                                </div>\
                              </div>\
                              <div class="back">\
                                <h3>Mortgaged</h3>\
                                <h4>' + name + '</h4>\
                                <h5>Mortgaged for £75</h5>\
                                <p>Card must be turned this side up if property is mortgaged</p>\
                              </div>';
}

Object.defineProperty(Utility.prototype, "rent", {
  get: function getRent() {
    var lastDiceRoll = this.owner.dice.total;
    var utilitiesOwned = this.owner.properties.filter(function(property) {
      return (property instanceof Utility);
    }).length;

    return utilitiesOwned === 2 ? 10 * lastDiceRoll : 4 * lastDiceRoll;
  }
});