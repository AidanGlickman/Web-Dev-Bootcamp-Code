$("h1").click(function(){
	alert("h1 has been clicked.")
})

$("button").click(function(){
	alert("Button " + $(this).text() + " has been clicked.");
})