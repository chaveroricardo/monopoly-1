function Station(name) {
  this.price = 200;
  this.owner = null;
  this.isMortgaged = false;

  this.titleDeed = document.createElement("DIV");
  this.titleDeed.className = "title-deed station";
  this.titleDeed.innerHTML = '<div class="front">\
                                <div class="header">\
                                  <h3>' + name + '</h3>\
                                </div>\
                                <div class="details">\
                                  <dl>\
                                    <dt>RENT</dt><dd>£25</dd>\
                                    <dt>If 2 stations are owned</dt><dd>£50</dd>\
                                    <dt>If 3 stations are owned</dt><dd>£100</dd>\
                                    <dt>If 4 stations are owned</dt><dd>£200</dd>\
                                  </dl>\
                                  <h5>Mortgage Value £100</h5>\
                                </div>\
                              </div>\
                              <div class="back">\
                                <h3>Mortgaged</h3>\
                                <h4>' + name + '</h4>\
                                <h5>Mortgaged for £100</h5>\
                                <p>Card must be turned this side up if property is mortgaged</p>\
                              </div>';
}

Object.defineProperty(Station.prototype, "rent", {
  get: function() {
    var stationsOwned = this.owner.properties.filter(function(property) {
      return (property instanceof Station);
    }).length;

    return [25,50,100,200][stationsOwned-1];
  }
});