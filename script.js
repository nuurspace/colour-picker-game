var numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var pickedColor = pickColor();
var button = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//Adding an event Listener for all mode buttons
//We currently only have easy and hard moddes but the code is flexible enough to support more difficulties
for(var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");

		//Short if statements are so cool
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

		reset();
	});
}

function reset(){
	//OR USE RESET
	//Generate all new colours
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//Change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squared
	button.textContent = "New Color";

	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
}

button.addEventListener("click", function(){
	reset();
	h1.style.backgroundColor = "steelblue";
});

colorDisplay.textContent = pickedColor;

for (var i = 0 ; i < squares.length; i++ ) {
	//Add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	//Add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;

		if (clickedColor === pickedColor){
			messageDisplay.textContent = randomSuccessMsg();
			button.textContent = "Play Again?"
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}

function changeColors(color){
	//loop through all squares
	//change each color to match given color
	for (var i = 0 ; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


function generateRandomColors(number){
	var numberArray = [];
	for (var i = 0; i < number; i++){
		numberArray.push(randomNum());
	} return numberArray;
}

function randomNum(){
	var r = Math.floor(Math.random()*256 + 1);
	var g = Math.floor(Math.random()*256 + 1);
	var b = Math.floor(Math.random()*256 + 1);

	return "rgb(" + r + ", " + g  + ", " + b + ")";
}

function randomSuccessMsg () {
	var messages = [
		"Damn you are good at this",
		"You are on fire!",
		"You are the color master",
		"You make this game look easy",
		"Success, it's a match!"
	];

	var randomMsg = messages[Math.floor(Math.random()*messages.length)]

	return randomMsg;
}