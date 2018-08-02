var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	modeButtonListeners();
	

	resetButton.addEventListener("click", reset)

	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background=colors[i];

		squares[i].addEventListener("click", function(){
			if(this.style.background==pickedColor){
				messageDisplay.textContent = "Correct!"
				resetButton.textContent = "Play Again?"
				changeColors(pickedColor);
				h1.style.background = pickedColor;
			}
			else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again!"
			}
		})
	}

	reset();
}

function modeButtonListeners() {
	for (var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");

			this.textContent === "Easy" ? numSquares=3 : numSquares=6;
			reset();
		});
	}
}

function setUpSquares(){
	
}


function reset() {
	colors = generateRandomColors(numSquares);

	pickedColor = pickColor();

	colorDisplay.textContent = pickedColor;

	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display="block";
			squares[i].style.background=colors[i];
		}
		else{
			squares[i].style.display="none";
		}
	}
	h1.style.background = "steelblue";

	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background=color;
	}
}

function pickColor() {
	return colors[Math.floor(Math.random()*colors.length)]
}

function generateRandomColors(num){
	var arr = []
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}	
	return arr;
}

function randomColor() {
	return "rgb(" + randomVal() + ", " + randomVal() + ", " + randomVal()+ ")";
}

function randomVal(){
	return Math.floor(Math.random()*256)
}