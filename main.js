$(function(){
  console.log("js loaded");

  var pieces = ["dog","car","boat","hat","iron","cat","boot"];
  var $properties = $('.property');
  oldKentRoad = $properties[0];
  oldKentRoad._propertyData = new Property("Old Kent Road", 60, [2, 10, 30, 90, 160, 250], "brown");

  console.log($('#dog').parent());

  function Player(piece) {
    this.piece = piece;
    this.square = "go";
    this.money = 1500;
  }

  function Property(name, price, rental, color) {
    this.name = name;
    this.price = price;
    this.rental = rental;
    this.color;
    this.houses = 0;
    this.owner = null;
  }

  function Die() {
    this.value = 1;
  }

  Die.prototype.roll = function() {
    this.value = Math.ceil(Math.random() * 6);
  }
});