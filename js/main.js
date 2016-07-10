var cards = document.querySelectorAll('.card');
for(var i=0;i<cards.length;i++) {
  cards[i].onclick = function() {
    this.classList.toggle('active');
  }
}

var pieces = ["dog","car","battleship","hat","iron","thimble","boot"];
var squares = data.map(function(dataObj) {
  var square = new Square(dataObj.name, dataObj.type || "misc");

  if(dataObj.type === "property") {
    square.property = new Property(dataObj.name, dataObj.price, dataObj.rental, dataObj.color, dataObj.numberInSet, dataObj.housePrice);
  }

  if(dataObj.type === "station") {
    square.property = new Station(dataObj.name);
  }

  if(dataObj.type === "utility") {
    square.property = new Utility(dataObj.name);
  }

  if(dataObj.type === "tax") {
    square.amount = dataObj.amount;
  }

  return square;
});

var player1 = new Player(pieces.pop());
var player2 = new Player(pieces.pop());

function movePlayer(player) {
  player.move();
  var square = squares[player.square];
  console.log("Player has landed on " + square.name);

  if(square.property && !square.property.owner) {
    
    if(confirm(square.name + " is unowned... Would you like to buy for \u00A3" + square.property.price + "?")) {
      if(player.purchase(square.property)) {
        console.log(square.name + " purchased");
      } else {
        console.log(player.piece + " was unable to buy " + square.name);
      }
    }

  } else if(square.property && square.property.owner !== player) {

    if(square.property.isMortgaged) {
      console.log("Property is mortgaged. No rent to play");
    } else {

      console.log("Property is owned by " + square.property.owner.piece);

      console.log("Rent is: \u00A3" + square.property.rent);
      console.log("Paying rent to " + square.property.owner.piece);

      player.payRent(square.property);
    }

  } else if(square.type === 'tax') {
    player.money -= square.amount;
  }
}