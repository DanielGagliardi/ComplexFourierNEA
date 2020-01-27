var fourierSeries;
var numberOfTerms;
var indexes;
var t = 0;
var xOffset;
var yOffset;
var drawnLine = [];
var timeIncrement = 0.001;
var shapes = [pi_points, sigma_points];
var points = shapes[0];


var req = new XMLHttpRequest();
req.onload = function () {
	var text = this.responseText;
	
	var parser = new DOMParser();
	var svg = parser.parseFromString(text,"text/xml");
	var path = svg.getElementsByTagName("path")[0].getAttribute("d");
	alert(path);
	alert(Snap.path.getTotalLength(path));
};

req.open('GET', './resources/sigma.svg');
req.send();




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
	numberOfTerms = 300;
	fourierSeries = FourierSeries_Gen(points, numberOfTerms);
	indexes = Index_Gen(numberOfTerms);
	//frameRate(30);
}

function draw() {
	background("black");
	/*	beginShape();
	noFill();
	stroke(255);
	strokeWeight(3);
	for (i = 0; i < points.length; i++) {
		xOffset = 600;
		yOffset = 200;
		vertex(points[i][0] + xOffset, points[i][1] + yOffset);
	}
	endShape(CLOSE);*/
	 x = 0;
	var y = 0;
	//console.log(fourierSeries);
	xOffset = 600;
	yOffset = 300;
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
		stroke(255, 255, 255, 100);
		circle(oldx, oldy, radius * 2);

		strokeWeight(1);
		stroke(255, 255, 255, 100);
		line(oldx, oldy, x, y);
	}

	drawnLine.push([x, y]);

	noFill();
	beginShape();
	for (var i = 0; i < drawnLine.length; i++) {
		stroke(255, 255, 0);
		strokeWeight(1);
		vertex(drawnLine[i][0], drawnLine[i][1]);
	}
	endShape();

	t += timeIncrement;
}


/*
var parser = new DOMParser();
var svg = parser.parseFromString(text,"text/xml");
var path = svg.getElementsByTagName("path")[0].getAttribute("d");
*/