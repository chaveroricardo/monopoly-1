function Property(price, rental, color) {

  if(isNaN(price)) throw new Error("Property price is not a number");
  if(!(rental instnaceof Array)) throw new Error("Rental needs to be an array");
  if(rental.length < 5) throw new Error("Rental needs 5 values");

  this.price = parseFloat(price);
  this.rental = rental;
  this.color;
  this.houses = 0;
  this.owner = null;
  this.isMortgaged: false;
}