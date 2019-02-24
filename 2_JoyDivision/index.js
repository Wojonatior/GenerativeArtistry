var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

 const size = window.innerWidth / 2;
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

for(var i = 4; i < lines.length; i++) {

  context.beginPath();
  context.moveTo(lines[i][0].x, lines[i][0].y);
  
  for(var j = 0; j < lines[i].length - 1; j++) {
    var xc = (lines[i][j].x +lines[i][j + 1].x) / 2;
    var yc = (lines[i][j].y +lines[i][j + 1].y) / 2;
    context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
  }
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.fill();
  context.restore();
  context.stroke();
}
