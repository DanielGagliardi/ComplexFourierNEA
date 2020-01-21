window.onload = function() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  beginShape();

  noFill();
  stroke(255);
  strokeWeight(3);

  for (i=0; i<points.length; i++) {
    vertex(points[i][0], points[i][1]);
    console.log(points[i][0], points[i][1]);
  }

  endShape(CLOSE);
}

function draw() {
}


