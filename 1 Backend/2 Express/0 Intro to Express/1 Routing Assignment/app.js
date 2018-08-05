var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});


app.get("/speak/:animal", function(req, res){
	var speakSounds = {
		dog: "Woof Woof!",
		pig: "Oink!",
		cow: "Moo!",
		cat: "Meow!",
		chicken: "Cluck Cluck!"
	}
	var animal = req.params.animal.toLowerCase();
	res.send("The " + animal + " says " + "'" + speakSounds[animal] + "'")
})

app.get("/speak/*", function(req, res){
	res.send("No sound is defined for this animal.")
})

app.get("/repeat/:word/:num", function(req, res){
	var sendme = ""
	for (var i = 0; i < Number(req.params.num); i++) {
		sendme += req.params.word + " "
	}
	res.send(sendme)
})


app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen(3000, function(){
	console.log("Assignment being served on port 3000")
})