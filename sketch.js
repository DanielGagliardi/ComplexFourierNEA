var fourierSeries;
var numberOfTerms;
var indexes;
var t = 0;
var xOffset;
var yOffset;
var drawnLine = [];
var timeIncrement = 0.001;
var shapes = [pi_points,sigma_points];
var points = shapes[0];

/*
var text = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="568.88px" width="588.42px"><path style="fill:black; stroke:none" d="M 10.499686,177.03840 L 31.174931,178.56990 C 52.615925,154.32116 61.039171,82.595924 187.38789,96.634671 C 182.79339,403.95560 48.021426,436.37234 56.444675,499.41907 C 59.507674,535.15406 87.840417,557.10556 118.47041,558.38181 C 215.21014,555.06356 210.87089,424.63084 240.99038,95.868921 L 365.80760,95.868921 C 359.17110,211.75239 341.04836,327.63586 339.00636,441.22208 C 340.53786,516.77606 386.48285,557.10556 446.97708,557.61606 C 546.52456,560.93431 577.92030,444.79558 577.92030,395.27709 L 556.47931,395.27710 C 554.43731,436.11709 534.78306,465.47083 492.92207,467.25758 C 378.82535,468.78908 441.61683,266.63113 442.38258,97.400421 L 577.92030,98.166171 L 577.15455,11.636437 C 13.807491,8.9075799 85.312284,-2.1366151 10.499686,177.03840 z" /></svg>';
var parser = new DOMParser();
var svg = parser.parseFromString(text,"text/xml");
var path = svg.getElementsByTagName("path")[0].getAttribute("d");
*/



function setup() {
  class Complex {
    constructor(realPart, imaginaryPart) {
      this.re = realPart;
      this.im = imaginaryPart;
    }
  }

  function Complex_Add(z, w) {
    //adds 2 complex numbers together
    var result = new Complex(z.re + w.re, z.im + w.im);
    return result
  }

  function Complex_Multiply(z, w) {
    //adds 2 complex numbers together
    var result = new Complex(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
    return result
  }
  /*testing complex functions

  var z = new Complex(1,1);
  var w = new Complex(2,2);
  console.log(Complex_Multiply(z,w).re, Complex_Multiply(z,w).im);
  */

  function Index_Gen(numberOfTerms) {
    if (numberOfTerms === 0) {
      return [];
    } else if (numberOfTerms === 1) {
      return [0];
    } else {
      var odd = numberOfTerms % 2;
      var indexes = [0];
      for (index = 1; index <= numberOfTerms / 2; index++) {
        indexes.push(index);
        indexes.push(-1 * index);
      }
      if (odd === 0) {
        indexes.pop();
      }
      return indexes;
    }
  }

  function Fourier_Coefficient(path, index) {
    //declaring variables 
    var n = index;
    var N = path.length;
    var coefficient = new Complex(0, 0);
    //summation
    for (k = 1; k <= N; k++) {
      var x = path[k - 1][0];
      var y = path[k - 1][1];
      var term1 = new Complex(x, y);
      var term2 = new Complex(cos(-n * 2 * PI * k / N), sin(-n * 2 * PI * k / N));
      var insert = Complex_Multiply(term1, term2);
      var coefficient = Complex_Add(coefficient, insert);
    }
    //dividing by N
    var finalCoefficient = new Complex(coefficient.re / N, coefficient.im / N);
    return finalCoefficient;
  }
  //console.log(Fourier_Coefficient(points,0));
  function FourierSeries_Gen(path, numberOfTerms) {
    var numberOfPoints = path.length;
    var indexes = Index_Gen(numberOfTerms);
    //Fourier series is an array of complex coefficients that match the order of the indexes eg. [C0,C1,C-1,C2,C-2,…]
    var fourierSeries = [];
    for (i = 0; i <= numberOfTerms - 1; i++) {
      var index = indexes[i];
      fourierSeries.push(Fourier_Coefficient(path, index));
    }
    return fourierSeries
  }

  createCanvas(windowWidth, windowHeight);
  background("black");

  //pre animation set up
  numberOfTerms = 512;
  fourierSeries = FourierSeries_Gen(points, numberOfTerms);
  indexes = Index_Gen(numberOfTerms);
  //frameRate(30);
}

function draw() {
  background("black");
  /*  beginShape();
  noFill();
  stroke(255);
  strokeWeight(3);
  for (i = 0; i < points.length; i++) {
    xOffset = 600;
    yOffset = 200;
    vertex(points[i][0] + xOffset, points[i][1] + yOffset);
  }
  endShape(CLOSE);  */
  var x = 0;
  var y = 0;
  //console.log(fourierSeries);
  xOffset = 600;
  yOffset = 400;
  translate(xOffset, yOffset);
  for (i = 0; i < numberOfTerms; i++) {
    //console.log(i);
    var oldx = x;
    var oldy = y;
    var Ci = fourierSeries[i];
    radius = sqrt(Ci.re * Ci.re + Ci.im * Ci.im);
    initialAngle = atan2(Ci.im, Ci.re);
    frequency = indexes[i];
    x += radius * cos(frequency * t * TWO_PI + initialAngle);
    y += radius * sin(frequency * t * TWO_PI + initialAngle);
    
    //console.log("x", x, "y", y , "oldx", oldx, "oldy", oldy, "radius", radius, "Ci", Ci, "initalAngle", initialAngle, "frequency", frequency);
    noFill();
    strokeWeight(1);
    stroke(255);
    circle(oldx, oldy, radius * 2);

    strokeWeight(1);
    stroke(255);
    line(oldx, oldy, x, y);
  }

  drawnLine.push([x,y]);

  noFill();
  beginShape();
  for (var i = 0; i < drawnLine.length; i++) {
    stroke(255,255,0);
    strokeWeight(1);
    vertex(drawnLine[i][0], drawnLine[i][1]);
  }
  endShape();

  t += timeIncrement;
}

