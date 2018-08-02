window.setTimeout(function() {
  var todos = new Array();
  quit=false;
  while(!quit){
	  var input = prompt("What would you like to do?")

	  if(input=="list"){
	  	listTodos();
	  }
	  else if(input=="new"){
	  	todos.push(prompt("Enter your new todo."))
	  }

	  else if(input=="delete"){
	  	deleteTodo();
	  }
	  else if(input=="quit"){
	  	quit=true;
	  }
  }
}, 500);

function listTodos(){
	console.log("**********");
	  	todos.forEach(function(todo, i){
	  		console.log(i + ": " + todo);
	  	})
	  	console.log("**********");
}

function deleteTodo(){
	var index = prompt("Enter the index of the item to be deleted.");
	  	todos.splice(index, 1);
}