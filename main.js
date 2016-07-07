$(function(){
  console.log("js loaded");

  var pieces = ["dog","car","boat","hat","iron","cat","boot"];

  function Player(piece) {
    this.piece = piece;
    this.square = 0;
    this.money = 1500;
  }

  Player.prototype.move = function() {
    this.square += Math.ceil(Math.random() * 12);
  }

  function Square(name, type, property) {
    this.name = name;
    this.type = type;
    
    if(!!property && type !== "property") throw new Error("You are trying to set a property to a none property square");

    if(type === "property") {
      if(!property) throw new Error(name + " does not have a property");
      if(!(property instnaceof Property)) throw new Error(name + "'s property is not a Property instance");
      this.property = property;
    }
  }

  function Property(price, rental, color) {
    this.price = price;
    this.rental = rental;
    this.color;
    this.houses = 0;
    this.owner = null;
  }
});