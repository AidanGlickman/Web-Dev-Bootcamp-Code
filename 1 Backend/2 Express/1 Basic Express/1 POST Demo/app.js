var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs");

var friends = ["Bob", "Bob1", "Bob2", "Bob3"]

app.get("/", function(req, res){
	res.render("index");
})

app.post("/addfriend", function(req, res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends")
})

app.get("/friends", function(req, res){
	res.render("friends", {friends:friends})
})

app.listen(3000, function(){
	console.log("Serving on port 3000")
})