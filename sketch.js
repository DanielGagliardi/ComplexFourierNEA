var fourierSeries;
var numberOfTerms = 200;
var indexes;
var t = 0;
var xOffset;
var yOffset;
var drawnLine = [];
var timeIncrement = 0.001;
var points = [];
var totalLength;
var pathString;

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

	var req = new XMLHttpRequest();
	req.onload = function () {
		var text = this.responseText;
		var parser = new DOMParser();
		var svg = parser.parseFromString(text, "text/xml");
		pathString = svg.getElementsByTagName("path")[0].getAttribute("d");
		console.log(pathString);
		for (i = 0; i <= Snap.path.getTotalLength(pathString); i++) {
			var point = Snap.path.getPointAtLength(pathString, i);
			points.push([point.x, point.y]);
		}
		console.log(points);
		fourierSeries = FourierSeries_Gen(points, numberOfTerms);
	}	
	req.open('GET', './resources/pi.svg');
	req.send();

	indexes = Index_Gen(numberOfTerms);

	createCanvas(windowWidth, windowHeight);
	background("black");
}

function draw() {
	background("black");

	var x = 0;
	var y = 0;
	xOffset = 600;
	yOffset = 300;
	translate(xOffset, yOffset);

	for (i = 0; i < numberOfTerms; i++) {
		var oldx = x;
		var oldy = y;
		var Ci = fourierSeries[i];
		radius = sqrt(Ci.re * Ci.re + Ci.im * Ci.im);
		initialAngle = atan2(Ci.im, Ci.re);
		frequency = indexes[i];
		x += radius * cos(frequency * t * TWO_PI + initialAngle);
		y += radius * sin(frequency * t * TWO_PI + initialAngle);

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
	stroke(0, 255, 0);
	strokeWeight(1);
	for (var i = 0; i < points.length; i++) {
		vertex(points[i][0], points[i][1]);
	}
	endShape();

	noFill();
	beginShape();
	stroke(255, 0, 128);
	strokeWeight(2);
	for (var i = 0; i < drawnLine.length; i++) {
		vertex(drawnLine[i][0], drawnLine[i][1]);
	}
	endShape();

	t += timeIncrement;
}
