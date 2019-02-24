var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const size = window.innerWidth / 2;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

const squareSize = 30;
const randomDisplacement = 15;
const rotateMultiplier = 20;
const offset = 10;

const plusOrMinus = () =>  Math.random() < .5 ? -1 : 1;

function drawSquare(width, height){
  context.beginPath();
  context.rect(-width/2, -height/2, width, height);
  context.stroke();
}

for(var column = squareSize; column <= (size - squareSize); column += squareSize){
  for(var row = squareSize; row <= (size - squareSize); row += squareSize){
    const rotateAmount = row  / size * Math.PI / 180 * plusOrMinus() * Math.random() * rotateMultiplier;
    const translationAmount = row / size * plusOrMinus() * Math.random() * randomDisplacement;

    context.save();
    context.translate(column + translationAmount + offset, row + offset);
    context.rotate(rotateAmount);
    drawSquare(squareSize, squareSize);
    context.restore();
  }
}
