// Check off todos by clicking

$(document.body).on("click", "li", function () {
	$(this).toggleClass("completed")
})

$(document.body).on("click", "span", function(){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	})
	event.stopPropagation();
})

$("input[type='text']").on("keypress", function(event){
	if(event.which === 13){
		addTodo($(this).val());
		$(this).val("");
	}
})

function addTodo(arg) {
	$("ul").append("<li><span><i class='far fa-trash'></i></span>" + arg + "</li>")
}

$(".fa-pencil-alt").on("click", function(){
	$("input[type='text']").slideToggle();
})