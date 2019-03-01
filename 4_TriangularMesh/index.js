var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

 const size = window.innerWidth / 2;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineJoin = 'bevel';

var line;
var odd = false;
var lines = [];
const gap = size / 7;

for(var y=(gap/2); y <= size-(gap/2); y += gap){
  odd = !odd;
  line = [];
  for (var x=(gap/2); x <= size-(gap/2); x += gap){
    dot = {
      x: x + (odd ? gap/2 : 0),
      y
    }
    line.push({
      x: dot.x + (Math.random() * .8 - .4) * gap,
      y: dot.y + (Math.random() * .8 - .4) * gap
    });
    context.beginPath();
    context.fill();
  }
  lines.push(line);
}


const drawTriangle = (A, B, C) => {
  context.beginPath();
  context.moveTo(A.x, A.y);
  context.lineTo(B.x, B.y);
  context.lineTo(C.x, C.y);
  context.lineTo(A.x, A.y);
  context.closePath();
  context.stroke();
  const gray = Math.floor(Math.random()*16).toString(16);
  context.fillStyle = '#' + gray + gray + gray;
  context.fill();
}

var dotLine;
odd = true;
for(var y=0; y<lines.length - 1; y++){
  odd = !odd;
  dotLine = []
  for(var i=0; i< lines[y].length; i++){
    dotLine.push(odd ? lines[y][i] : lines[y+1][i]);
    dotLine.push(odd ? lines[y+1][i] : lines[y][i])
  }
  for(var i=0; i< dotLine.length - 2; i++){
    drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);
  }
}
