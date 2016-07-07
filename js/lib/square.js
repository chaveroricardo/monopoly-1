function Square(name, type, property) {
  this.name = name;
  this.type = type;
  
  if(!!property && type !== "property") throw new Error("You are trying to set a property to a none property square");

  if(type === "property") {
    if(!property) throw new Error(name + " does not have a property");
    if(!(property instnaceof Property)) throw new Error(name + "'s property is not a Property instance");
    this.property = property;
  }
}