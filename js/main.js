var pieces = ["dog","car","boat","hat","iron","cat","boot"];
var squares = data.map(function(dataObj) {
  var square = new Square(dataObj.name, dataObj.type || "misc");

  if(dataObj.type === "property") {
    square.property = new Property(dataObj.price, dataObj.rental, dataObj.color, dataObj.numberInSet, dataObj.housePrice);
  }

  if(dataObj.type === "station") {
    square.property = new Station();
  }

  if(dataObj.type === "utility") {
    square.property = new Utility();
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
    
    if(confirm(square.name + " is unowned... Would you like to buy for £" + square.property.price + "?")) {
      player.purchase(square.property);
    }

  } else if(square.property && square.property.owner !== player) {

    console.log("Property is owned by " + square.property.owner.piece);
    console.log("Property has " + square.property.houses + ", rent is: £" + square.property.rent);
    console.log("Paying rent to " + square.property.owner.piece);

    player.payRent(square.property);

  } else if(square.type === 'tax') {
    player.money -= square.amount;
  }
}