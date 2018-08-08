var bodyParser     = require("body-parser"),
	mongoose 	   = require("mongoose"),
	passport 	   = require("passport"),
	localStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
	express		   = require("express"),
	seedDB		   = require("./seeds"),
	flash		   = require("connect-flash"),
	app			   = express();
	
// CONNECT
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }).then(() => {
	console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// SEED DATA (FOR TESTING)
// seedDB();

// SETUP
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// MODELS
var Campground  = require("./models/campground"),
	Comment 	= require("./models/comment"),
	User 		= require("./models/user");

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "IDK I heard I was just supposed to put some random text in here so I guess thats what I will do.",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next()
})

// ROUTES
var indexRoutes = require("./routes/index"),
	campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes = require("./routes/comments");
	

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//RUN SERVER
app.listen(3000, function(){
	console.log("Yelp Camp is being served on port 3000");
});