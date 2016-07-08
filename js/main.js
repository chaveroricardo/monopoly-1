var pieces = ["dog","car","boat","hat","iron","cat","boot"];
var squares = data.map(function(dataObj) {
  var square = new Square(dataObj.name, dataObj.type);

  if(dataObj.type === "property") {
    square.property = new Property(dataObj.price, dataObj.rental, dataObj.color);
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
    
    console.log("Property is unowned... purchasing...");
    player.purchase(square.property);

  } else if(square.property && square.property.owner !== player) {

    console.log("Property is owned by " + square.property.owner.piece);
    console.log("Property has " + square.property.houses + ", rent is: £" + square.property.rent);
    console.log("Paying rent to " + square.property.owner.piece);

    if(player.money - square.property.rent <= 0) {
      player.money = 0;

      // TO DO... allow player to mortgage property, sell houses, make deal etc
      console.log("Game over... " + player.piece + " is bankrupt");
      square.property.owner.money += player.money;
    }
    player.money -= square.property.rent;
    square.property.owner.money += square.property.rent;

  }
}