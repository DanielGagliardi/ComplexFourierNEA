window.onload = function() {
}

class Complex {
  constructor(realPart, imaginaryPart) {
      this.re = realPart;
      this.im = imaginaryPart;
  }
}

function Complex_Add(z, w) {
  //adds 2 complex numbers together
  result = new Complex(z.re + w.re, z.im + w.im);
  return result
}

function Complex_Multiply(z, w) {
  //adds 2 complex numbers together
  result = new Complex(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
  return result
}

//testing complex functions
/*
var z = new Complex(1,1);
var w = new Complex(2,2);
console.log(Complex_Multiply(z,w).re, Complex_Multiply(z,w).im);
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(3);
  for (i=0; i<points.length; i++) {
    var xOffset = 600;
    var yOffset = 200; 
    vertex(points[i][0] + xOffset, points[i][1] + yOffset);
  }
  endShape(CLOSE);
}

function draw() {
}


