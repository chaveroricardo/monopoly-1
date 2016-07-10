function Player(piece) {
  this.piece = piece;
  this.square = 0;
  this.money = 1500;
  this.inJail = false;
  this.timeInJail = 0;
  this.properties = [];
  this.getOutOfJailFreeCards = 0;

  this.infoPanel = document.createElement("DIV");
  this.infoPanel.className = "player " + this.piece;
  this.infoPanel.innerHTML = '<div class="playing-piece"></div>\
                              <div class="money">1,500</div>\
                              <div class="properties">\
                                <div class="row">\
                                  <div class="brown"></div>\
                                  <div class="light-blue"></div>\
                                  <div class="pink"></div>\
                                  <div class="orange"></div>\
                                </div>\
                                <div class="row">\
                                  <div class="red"></div>\
                                  <div class="yellow"></div>\
                                  <div class="green"></div>\
                                  <div class="dark-blue"></div>\
                                </div>\
                                <div class="row">\
                                  <div class="station"></div>\
                                  <div class="utility"></div>\
                                  <div class="cards"></div>\
                                </div>\
                                <div class="shield"></div>\
                              </div>';
  
  this.infoPanel.onclick = function() {
    this.classList.toggle("active");
  }

  this.infoPanel.querySelector('.properties .shield').onclick = function() {
    event.stopPropagation();
    var properties = this.parentNode;
    properties.classList.remove("active");
    properties.querySelector(".row > div.active").classList.remove("active")
  }

  var deedSets = this.infoPanel.querySelectorAll('.properties .row > div');
  for(var i=0;i<deedSets.length;i++) {
    deedSets[i].onclick = function() {
      event.stopPropagation();
      this.classList.toggle("active");
      this.parentNode.parentNode.classList.toggle("active");
    }
  }

  document.querySelector('#players').appendChild(this.infoPanel);
}

Player.prototype.dice = {
  domElements: document.querySelectorAll('.die'),
  total: 2,
  isDouble: false,
  roll: function() {
    return new Promise(function(resolve, reject) {
      var rolls = 10;
      var dice = [1,1];
      while(rolls--) {
        setTimeout(function() {
          dice = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
          this.domElements[0].className = this.domElements[0].className.replace(/show-[1-6]/, "show-" + dice[0]);
          this.domElements[1].className = this.domElements[1].className.replace(/show-[1-6]/, "show-" + dice[1]);
          this.isDouble = dice[0] === dice[1];
          this.total = dice[0] + dice[1];
          return resolve(this);
        }.bind(this), 100 * rolls);
      }
    }.bind(this));
  }
}

Player.prototype.move = function() {

  this.dice.roll().then(function() {

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
  }.bind(this));
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