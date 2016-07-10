// ############ EVENT HANDLERS #############

var cards = document.querySelectorAll('.card');
for(var i=0;i<cards.length;i++) {
  cards[i].onclick = function() {
    this.classList.toggle('active');
  }
}

var die = document.querySelectorAll('.die');
for(var i=0;i<die.length;i++) {
  die[i].onclick = function rollDice() {

    for(var i=0;i<die.length;i++) {
      (function(i) {
        var rolls = 10;
        while(rolls--) {
          setTimeout(function() {
            var randomFace = Math.ceil(Math.random() * 6);
            die[i].className = die[i].className.replace(/show-[1-6]/, "show-" + randomFace);
          }.bind(die[i]), 100 * rolls);
        }
      }(i));
    }
  }
}

var players = document.querySelectorAll('#players .player');
for(var i=0;i<players.length;i++) {
  players[i].onclick = function() {
    this.classList.toggle("active");
  }
}

// var players = document.querySelectorAll('.title-deed');
// for(var i=0;i<players.length;i++) {
//   players[i].onclick = function() {
//     this.classList.toggle("mortgaged");
//   }
// }


var pieces = ["dog","car","battleship","hat","iron","thimble","boot"];
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