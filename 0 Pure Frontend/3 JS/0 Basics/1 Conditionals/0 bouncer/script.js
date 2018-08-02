var age = prompt("How old are you?");
if(age<0){
	throw new Error("Age cannot be negative.");
}
else if(age<18){
	alert("You may not enter the club.");
}
else if(age<21){
	alert("You can enter, but you cannot drink.");
}
else{
	alert("You may enter the club and you may drink.");
}
if(Math.sqrt(age)%1==0){
	alert("Perfect Square!");
}