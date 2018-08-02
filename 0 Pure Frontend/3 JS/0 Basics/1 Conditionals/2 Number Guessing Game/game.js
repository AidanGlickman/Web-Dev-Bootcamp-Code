var secretNum = 4;
var won = false;

while(!won){
	var guess = Number(prompt("Guess a number."));
	if(guess===secretNum){
		won = true;
		alert("Correct!");
	}
	else if(guess<secretNum){
		alert("Too low.")
	}
	else{
		alert("Too high.")
	}
}