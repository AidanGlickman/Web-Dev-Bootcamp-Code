var express 			  = require('express'),
	mongoose 			  = require('mongoose'),
	passport 			  = require('passport'),
	bodyParser 			  = require('body-parser'),
	localStrategy 		  = require('passport-local'),
	expressSession 		  = require('express-session'),
	passportLocalMongoose = require('passport-local-mongoose');

// MODELS
var User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/secretpagedemo', 
{ useNewUrlParser: true }).then(() => {
	console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

var app = express();

app.use(expressSession({
	secret: "Stanley Horse Tranquilizer",
	resave: false,
	saveUninitialized: false 
}))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ++++++++++++
//    ROUTES
// ++++++++++++

app.get("/", function(req, res){
	res.render('home');
});

app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret")
});

app.get("/register", function(req, res){
	res.render("register")
});

app.post("/register", function(req, res){
	User.register(new User({
		username: req.body.username
	}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret")
		});
	});
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "secret",
	failureRedirect: "login"
}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/")
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	else
		res.redirect("/login")
}

app.listen(3000, function(){
	console.log("app is being served on port 3000.");
})