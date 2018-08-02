var liList = document.querySelectorAll("li");

for(var i = 0; i < liList.length; i++){
	liList[i].addEventListener("mouseover", function(){
		this.classList.add("onhover");
	});
	liList[i].addEventListener("mouseout", function(){
		this.classList.remove("onhover");
	});
	liList[i].addEventListener("click", function(){
		this.classList.toggle("done");
	});
}