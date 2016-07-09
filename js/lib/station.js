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