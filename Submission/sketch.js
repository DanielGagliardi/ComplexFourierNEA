var database;
var nameInput;
var shapeInput;
var submitButton;

function setup() {
	//createCanvas(windowWidth, windowHeight);
	nameInput = createInput("Name");
	shapeInput = createInput("PathString");
	submitButton = createButton("Submit");
	submitButton.mousePressed(submitShape);


	var firebaseConfig = {
		apiKey: "AIzaSyC_h5WroslBWC8y2isN_ORXkHJtEwm50To",
		authDomain: "fourier-shapes-116aa.firebaseapp.com",
		databaseURL: "https://fourier-shapes-116aa.firebaseio.com",
		projectId: "fourier-shapes-116aa",
		storageBucket: "fourier-shapes-116aa.appspot.com",
		messagingSenderId: "1052849510920",
		appId: "1:1052849510920:web:f0a4d632d3415192f6cfbd",
		measurementId: "G-0RPNBKTX2P"
	  };
	
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	console.log(firebase);
	database = firebase.database();

	var ref = database.ref("shapes");

	function submitShape() {
		var data = {
			name: nameInput.value(),
			pathString: shapeInput.value()
		};
		console.log(data);
		ref.push(data);
	}





}

