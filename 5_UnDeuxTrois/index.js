var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const size = window.innerWidth / 2;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 4;
context.lineCap = 'round';

const step = 20;
const thirdOfHeight = size / 3;

const draw = (x, y, width, height, positions) => {
  context.save();
  context.translate(x + (width/2), y + (height/2));
  context.rotate(Math.random() * 5);
  context.translate(-(height/2), -(width/2));
  const gray = Math.floor(Math.random()*10 + 2).toString(16);
  context.strokeStyle = '#' + gray + gray + gray;

  for(var i=0; i<=positions.length; i++){
    context.beginPath();
    context.moveTo(positions[i] * width, 0);
    context.lineTo(positions[i] * width, height);
    context.stroke();
  }
  context.restore();
}

for(var y = step; y < size - step; y += step) {
  for(var x = step; x < size - step; x+= step) {
    var positions;
    if(y < thirdOfHeight) {
      positions = [0.5];
    } else if(y < thirdOfHeight * 2) {
      positions = [0.2, 0.8];
    } else {
      positions = [0.1, 0.5, 0.9];
    }
    draw(x, y, step, step, positions);
  }
}
