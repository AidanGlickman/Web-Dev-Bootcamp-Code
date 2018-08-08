var express = require("express"),
	router  = express.Router({mergeParams: true}),
	middleware = require("../middleware");

var Campground = require("../models/campground"),
	Comment = require("../models/comment");


//SHOW FORM
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Something went wrong.");
			res.redirect("back")
		}
		else
			res.render("comments/new", {campground: campground})
	});
});


//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Something went wrong.");
			red.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong.");
					res.redirect("back")
				}
				else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Created comment.");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// SHOW EDIT FORM
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			req.flash("error", "Something went wrong.");
			res.redirect("back");
		}
		else{
			Campground.findById(req.params.id, function(err, campground){
				if(err){
					req.flash("error", "Something went wrong.");
					res.redirect("back");
				}
				else{
					res.render("comments/edit", {comment:comment, campground:campground});
				}
			});
		}
	});
});

// EDIT COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		if(err){
			req.flash("error", "Something went wrong.");
			res.redirect("back")
		}
		else{
			req.flash("success", "Edited comment.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "Something went wrong.");
			res.redirect("back")
		}
		else{
			req.flash("success", "Deleted comment.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});



module.exports = router;