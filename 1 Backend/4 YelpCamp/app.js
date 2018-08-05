var bodyParser   = require("body-parser"),
	mongoose 	 = require("mongoose"),
	express		 = require("express"),
	seedDB		 = require("./seeds"),
	app			 = express();
	
// CONNECT
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }).then(() => {
	console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// SEED DATA (FOR TESTING ONLY!!)
seedDB();

// SETUP
app.use(express.static(__dirname+ "/public"))
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// MODELS
var Campground = require("./models/campground");
var Comment = require("./models/comment");


// ROUTES
app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index", {campgrounds:campgrounds});
	})
});

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new")
})

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id)
	.populate("comments")
	.exec(function(err, campground){
		if(err)
			console.log(err)
		else
			res.render("campgrounds/show", {campground: campground})
	})
})

app.post("/campgrounds", function(req, res){
	Campground.create(req.body.campground, function(err, campground){
		if(err)
			console.log(err)
		else
			res.redirect("/campgrounds");
	});
});

// +++++++++++COMMENT ROUTES++++++++++++++++

app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err)
		else
			res.render("comments/new", {campground: campground})
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			red.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}
				else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});

})


//RUN SERVER
app.listen(3000, function(){
	console.log("Yelp Camp is being served on port 3000");
});