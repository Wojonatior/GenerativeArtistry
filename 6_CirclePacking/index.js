var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const size = window.innerWidth / 2;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

var circles = []
const MIN_RADIUS = 2;
const MAX_RADIUS = 100;
const TOTAL_CIRCLES = 600;
const MAX_ATTEMPTS = 500;

const floor = Math.floor;
const random = Math.random;
const PI = Math.PI;
const sqrt = Math.sqrt;

const createAndDrawCircle = () => {
  var newCircle; 
  var safeToDraw = false;
  for(var tries=0; tries<MAX_ATTEMPTS; tries++){
    var newCircle = {
      x: floor(random() * size),
      y: floor(random() * size),
      radius: MIN_RADIUS
    };
    if(circleCollides(newCircle)){
      continue;
    } else {
      safeToDraw = true;
      break;
    }
  }

  if(!safeToDraw)
    return;

  for(var radius = MIN_RADIUS; radius < MAX_RADIUS; radius++){
    newCircle.radius = radius;
    if(circleCollides(newCircle)){
      newCircle.radius--;
      break;
    }
  }

  circles.push(newCircle);
  context.beginPath();
  context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*PI);
  context.stroke();

};

const circleCollides = (circle) => {
  for(var i=0; i<circles.length; i++){
    var testCircle = circles[i];
    const a = circle.radius + testCircle.radius;
    const x = circle.x - testCircle.x;
    const y = circle.y - testCircle.y;
    if(a >= sqrt((x*x) + (y*y))){
      return true;
    }
  }

  if(circle.x + circle.radius >= size ||
     circle.x - circle.radius <= 0) {
    return true;
  }
    
  if(circle.y + circle.radius >= size ||
      circle.y - circle.radius <= 0) {
    return true;
  }
  

  return false;
}

for(var _=0; _<TOTAL_CIRCLES; _++){
  createAndDrawCircle();
}
