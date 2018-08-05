var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi There!")
})

app.get("/bye", function(req, res) {
	res.send("Goodbye!")
})

app.get("/dog", function(req, res){
	console.log("Req sent to dog.")
	res.send("WOOF!")
})

app.get("/r/:subredditName", function(req, res){
	res.send("Welcome to the " + req.params.subredditName.toUpperCase() + " subreddit 0wO")
})

app.get("*", function(req, res){
	res.send("Route not defined. git gud scrubbbb")
})

app.listen(3000, function() {
	console.log("Serving First app on port 3000")
})