function Player(piece) {
  this.piece = piece;
  this.square = 0;
  this.money = 1500;
  this.inJail = false;
  this.timeInJail = 0;
  this.properties = [];
  this.getOutOfJailFreeCards = 0;
}

Player.prototype.dice = {
  total: 2,
  isDouble: false,
  roll: function() {
    var dice = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
    this.isDouble = dice[0] === dice[1];

    this.total = dice[0] + dice[1];
  }
}

Player.prototype.move = function() {

  this.dice.roll();

  if(this.inJail) {

    var leavingJail = false;

    if(!this.dice.isDouble) {
      this.timeInJail++;

      if(this.timeInJail === 3 || confirm("Would you like to pay \u00A350 to get out of jail?")) {
        this.money -= 50;
        leavingJail = true;
      }
      
      else if(this.getOutOfJailFreeCards && confirm("Would you like to use a 'Get Out of Jail Free' card?")) {
        this.getOutOfJailFreeCards--;
        leavingJail = true;
      }
    } else {
      leavingJail = true;
    }

    if(!this.isBankrupt && leavingJail) {
      this.inJail = false;
      this.timeInJail = 0;
    }

    return;
  }

  this.square += this.dice.total;

  if(this.square === 30) {
    this.square = 10;
    this.inJail = true;
  }

  if(this.square > 39) {
    this.square = this.square%40;
    this.money += 200; // player has passed go
    console.log(this.piece + " passed go");
  }

  return this;
}

Player.prototype.purchase = function(property) {

  if(this.money - property.price < 0) {
    return false;
  }

  this.money -= property.price;
  this.properties.push(property);
  property.owner = this;

  if(property.canBuildHouses) {
    console.log(this.piece + " has all the " + property.color + " properties");
  }

  return true;
}

Player.prototype.payRent = function(property) {
  this.money -= property.rent;

  if(!this.isBankrupt) {
    property.owner.money += property.rent;
  }
  else {
    property.owner.money += this.money + property.rent; // player pays what (s)he can
    // TODO: player needs to be able to resign, or mortgage properties to make up the remainder
  }
}

Object.defineProperty(Player.prototype, "isBankrupt", {
  get: function isBankrupt() {
    return this.money < 0;
  }
});