$("input").keypress(function(event){
	if(event.which===13){
		alert("You entered " + $(this).val())
	}
})