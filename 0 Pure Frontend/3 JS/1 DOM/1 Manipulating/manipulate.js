var h1 = document.querySelector("h1");

/*
setInterval(toggleBig, 500);

function toggleBig(){
	h1.classList.toggle("big")
}
*/

var p = document.querySelector("p");
var ul = document.querySelector("ul");
var ptext = p.textContent;
var pWithHTML = p.innerHTML;
var count = 0;
setInterval(function(){
	p.textContent = ptext + count++;
}, 500)