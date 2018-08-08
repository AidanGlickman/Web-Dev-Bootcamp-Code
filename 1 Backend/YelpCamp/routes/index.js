var passport = require("passport"),
	express = require("express"),
	middleware = require("../middleware"),
	router  = express.Router();

var User = require("../models/user");


router.get("/", function(req, res){
	res.render("index");
});

// ++++++++++++++AUTH ROUTES+++++++++++++++++

router.get("/register", function(req, res){
	res.render("auth/register");
});

router.post("/register", function(req, res){
	User.register(new User({
		username: req.body.username
	}), req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Signed Up!");
			res.redirect("/campgrounds");
		})
	})
});

router.get("/login", function(req, res){
	res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged out.");
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	else
		res.redirect("/login")
}

module.exports = router;