function Station() {
  this.price = 200;
  this.owner = null;
  this.isMortgaged = false;
}

Object.defineProperty(Station.prototype, "rent", {
  get: function() {
    var stationsOwned = this.owner.properties.filter(function(property) {
      return (property instanceof Station);
    }).length;

    return [25,50,100,200][stationsOwned-1];
  }
});

function Utility() {
  this.price = 150;
  this.owner = null;
  this.isMortgaged = false;
}

Utility.prototype.rent = function(lastDiceRoll) {
  var utilitiesOwned = this.owner.properties.filter(function(property) {
    return (property instanceof Utility);
  }).length;

  return utilitiesOwned === 2 ? 10 * lastDiceRoll : 4 * lastDiceRoll;
}