var p1butt = document.querySelector("#p1")
var p2butt = document.querySelector("#p2")

var p1disp = document.querySelector("#p1disp");
var p2disp = document.querySelector("#p2disp");
var windisp = document.querySelector("#winscore")

var resetbutt = document.querySelector("#reset")
var input = document.querySelector("input");

var p1score = 0;
var p2score = 0;
var gameOver = false;
var winningScore = 5;

p1butt.addEventListener("click", function(){
	if(!gameOver){
		p1score++;
		if (p1score >= winningScore) {
			gameOver = true;
			p1disp.classList.add("won");
		}
		p1disp.textContent = p1score;
	}
})

p2butt.addEventListener("click", function(){
	if(!gameOver){
		p2score++;
		if (p2score >= winningScore) {
			gameOver = true;
			p2disp.classList.add("won");
		}
		p2disp.textContent = p2score;
	}
})

input.addEventListener("change", function(){
	reset();
	winningScore = Number(this.value);
	windisp.textContent = winningScore;
})

resetbutt.addEventListener("click", reset)

function reset(){
	p1score=0;
	p2score=0;
	
	p1disp.textContent=p1score;
	p2disp.textContent=p2score;

	p1disp.classList.remove("won");
	p2disp.classList.remove("won");

	gameOver=false;
}
