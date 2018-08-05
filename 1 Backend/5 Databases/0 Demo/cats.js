var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String

});

var Cat = mongoose.model("Cat", catSchema);

var addCat = new Cat({
	name: "Mrs. Norris",
	age: 7,
	temperament: "Petrified"
});

addCat.save(function(err, cat){
	if(err)
		console.log("Something went wrong.")
	else
		console.log("Saved!")
});

Cat.find({}, function(err, cats){
	if(err)
		console.log("ERROR", err);
	else
		console.log(cats)
	
})