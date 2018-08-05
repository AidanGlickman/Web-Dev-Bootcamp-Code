var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("index")
})

app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thing: thing})
})

app.get("/posts", function(req, res){
	var posts = [
		{title: "AHHhhhhHHhahahhah", author: "Susy"},
		{title: "Wowee Many cool", author: "Big WOw Man"},
		{title: "Oh my triceratops", author: "Many OOOooh Guy"}
	]

	res.render("posts", {posts:posts})
})

app.listen(3000, function(){
	console.log("App being served on port 3000")
})