/*
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
}*/

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

var provider = new firebase.auth.GoogleAuthProvider();
var user;

function googleSignIn(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// The signed-in user info.
		user = result.user;
		// console.log("success");
		// console.table(user);
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
}
function submit() {
	try{
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
		var data = {
			timeStamp: dateTime,
			UID: user.uid
		}
	console.log(data);
	ref.push(data);
	} catch(error) {
		alert("Sign in to submit")
	}
}







