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


// function createBoard(){
//   var firstLine = 1100;
//   var secondLine = 900;
//   var thirdLine = 300;
//   var fourthLine = 0;
//   for (var i = 0; i < 11; i++) {
//     document.getElementsByClassName("square")[i].setAttribute("style", "left: "+ firstLine +"px");
//     firstLine -= 100;
//   }

//   for (var j = 11; j < 21; j++) {
//     document.getElementsByClassName("square")[j].setAttribute("style", "top: "+ secondLine +"px");
//     secondLine -= 100;
//   }

//   // for (var k = 21; k < 30; k++) {
//   //   document.getElementsByClassName("square")[k].setAttribute("style", "left: "+ thirdLine +"px");
//   //   thirdLine += 100;
//   // }

//   // for (var l = 32; l < 39; l++) {
//   //   document.getElementsByClassName("square")[l].setAttribute("style", "top: "+ thirdLine +"px");
//   //   fourthLine += 100;
//   // }
// }

// createBoard();