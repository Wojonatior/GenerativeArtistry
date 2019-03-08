var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const SIZE = window.innerWidth / 2;
const STEP = SIZE / 12;
const dpr = window.devicePixelRatio;

canvas.width = SIZE * dpr;
canvas.height = SIZE * dpr;

context.scale(dpr, dpr);
context.lineWidth = 8;

const coinFlip = () => Math.random() > .75;
const WHITE = '#F2F5F1';
var COLORS = ['#D40920', '#1356A2', '#F7D842']

var squares = [{
  x: 0,
  y: 0,
  width: SIZE,
  height: SIZE
}];

const splitSquaresWith = (coordinates) => {
  const {x, y} = coordinates;
  // var squaresToAdd = [];
  // var squaresThisIteration = [];
  // squares.reverse().map((square, i) => {
  //   if(x && x > square.x && x < square.x + square.width){
  //     squaresToAdd = squaresToAdd.concat(splitOnX(square, x))
  //   }
  //   if(y && y > square.y && y < square.y + square.height){
  //     squaresToAdd = squaresToAdd.concat(splitOnY(square, x))
  //   }
  // });
  // squares = squares.concat(squaresToAdd);
  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];
    
    if (x && x > square.x && x < square.x + square.width) {
      if (coinFlip()) {
        squares.splice(i, 1);
        squares = squares.concat(splitOnX(square, x));
      }
    }
  
    if (y && y > square.y && y < square.y + square.height) {
      if (coinFlip()) {
        squares.splice(i, 1);
        squares = squares.concat(splitOnY(square, y));
      }
    }
  }
};

const splitOnX = (square, splitAt)  => {
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height
  };
  
  var squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height
  };
  
  return [squareA, squareB];
};

const splitOnY = (square, splitAt) => {
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y)
  };

  var squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y
  };

  return [squareA, squareB];
}; 

for (var i = 0; i < SIZE; i += STEP) {
  splitSquaresWith({ y: i });
  splitSquaresWith({ x: i });
};

const draw = () => {
  for (var i = 0; i < COLORS.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = COLORS[i];
  }

  squares.map((square, i) => {
    context.beginPath();
    context.fillStyle = squares[i].color || WHITE;
    context.rect(
      square.x,
      square.y,
      square.width,
      square.height
    );
    context.fill()
    context.stroke();
  });
};

draw()
