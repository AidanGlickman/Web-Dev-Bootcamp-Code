var movies = [
	{
		title: "In Bruges",
		hasWatched: false,
		rating: 5
	},
	{
		title: "Frozen",
		hasWatched: true,
		rating: 4.5
	}
]

movies.forEach(function(movie){
	console.log(buildStringFromMovie(movie));
})

function buildStringFromMovie(movie){
		var result = "You have ";
	if(!movie.hasWatched){
		result += "not ";
	}
	result += "watched " + "\"" + movie.title + 
		"\" - " + movie.rating + " stars";
}