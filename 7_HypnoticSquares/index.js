var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const size = window.innerWidth / 2;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;

context.scale(dpr, dpr);
context.lineWidth = 2;

const FINAL_SIZE = 3;
const offset = 2;
const tileStep = (size - offset * 2) / 7;
const START_SIZE = tileStep;
const directions = [-1, 0, 1];
var startSteps;

function draw(x, y, width, height, xMovement, yMovement, steps){
  context.beginPath();
  context.rect(x, y, width, height);
  context.stroke();
  if(steps >= 0){
    const nextSize = START_SIZE * steps / startSteps + FINAL_SIZE;
    const rootNextX = x + (width - nextSize) / 2;
    const rootNextY = y + (height - nextSize) / 2;
    const nextX = rootNextX - ((x - rootNextX) / (steps + 2)) * xMovement
    const nextY = rootNextY - ((y - rootNextY) / (steps + 2)) * yMovement
    draw(nextX, nextY, nextSize, nextSize, xMovement, yMovement, steps - 1);
  }
}

for(var x=offset; x<size - offset; x+=tileStep){
  for(var y=offset; y<size - offset; y+=tileStep){
    startSteps = 2 + Math.ceil(Math.random() * 3)
    var xDirection = directions[Math.floor(Math.random() * directions.length)]
    var yDirection = directions[Math.floor(Math.random() * directions.length)]

    draw(x,y,START_SIZE, START_SIZE, xDirection, yDirection, startSteps - 1);
  }
}
