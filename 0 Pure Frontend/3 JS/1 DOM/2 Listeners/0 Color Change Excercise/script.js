var button = document.querySelector("#toggle");
/*var isChanged = false;
button.addEventListener("click", function() {
	if(isChanged){
		document.body.style.backgroundColor = "white";
		isChanged = false;
	}
	else{
		document.body.style.backgroundColor = "purple";
		isChanged = true;
	}
})*/

button.addEventListener("click", function(){
	document.body.classList.toggle("purple");
})