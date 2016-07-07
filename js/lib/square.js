function Square(name, type, property) {
  this.name = name;
  this.type = type;

  if(type === "property") {
    this.property = property;
  }
}