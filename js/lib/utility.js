function Utility() {
  this.price = 150;
  this.owner = null;
  this.isMortgaged = false;
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