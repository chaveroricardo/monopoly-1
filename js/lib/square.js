function Square(name, type, property) {
  this.name = name;
  this.type = type;

  if(["property", "station", "utility"].indexOf(type) !== -1) {
    this.property = property;
  }
}