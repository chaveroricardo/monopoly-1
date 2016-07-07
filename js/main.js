var pieces = ["dog","car","boat","hat","iron","cat","boot"];
var squares = data.map(function(dataObj) {
  var square = new Square(dataObj.name, dataObj.type);

  if(dataObj.type === "property") {
    square.property = new Property(dataObj.price, dataObj.rental, dataObj.color);
  }

  return square;
});

var player = new Player();

console.log(squares);