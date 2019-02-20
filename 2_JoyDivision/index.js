var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// const size = window.innerWidth;
const size = 320;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

const step = 10;
const lines = [];

for(var i=step; i<=size - step; i+=step){
  var line = [];
  for(var j=step; j<=size - step; j+=step){
    // x uses the interior loop variable so that it moves horizonally
    var distanceToCenter = Math.abs(j - size / 2);
    var variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
    var random = Math.random() * variance / 2 * -1
    const point = {x: j, y: i + random};
    line.push(point);
  }
  lines.push(line);
}

for(var i = 0; i < lines.length; i++) {

  context.beginPath();
  context.moveTo(lines[i][0].x, lines[i][0].y);
  
  for(var j = 0; j < lines[i].length; j++) {
    context.lineTo(lines[i][j].x, lines[i][j].y);
  }
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.fill();
  context.restore();
  context.stroke();
}
