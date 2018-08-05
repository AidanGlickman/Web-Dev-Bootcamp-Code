// REQUIRES
var expressSanitizer = require("express-sanitizer"),
	methodOverride   = require("method-override"),
	bodyParser  	 = require("body-parser"),
	mongoose 		 = require("mongoose"),
	express 		 = require("express"),
	app				 = express();
	

//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/restfulblog', { useNewUrlParser: true }).then(() => {
	console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer())
app.use(methodOverride("_method"));

//MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
	title: {
				type: String, 
				default: "Untitled Blog Post"
			 },
	image: {
				type: String,
				default: "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
			},
	body: {
				type: String, 
				default: "No body"
			 },
	created: {
				type: Date, 
				default: Date.now
			 }
});
var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs")
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err)
			console.log(err)
		else
			res.render("index", {
				blogs: blogs
			});
	});
});

app.get("/blogs/new", function(req, res){
	res.render("new")
});

app.post("/blogs", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, blog){
		if(err)
			res.render("new");
		else
			res.redirect("/blogs");
	});
});

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err)
			res.redirect("/blogs");
		else
			res.render("show", {blog:blog});
	});
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err)
			res.redirect("/blogs");
		else
			res.render("edit", {blog:blog});
	});
});

app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
		if(err)
			res.redirect("/blogs");
		else
			res.redirect("/blogs/" + req.params.id);
	});
});

app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.redirect("/blogs");
		else
			res.redirect("/blogs");
	});
});


// SERVE
app.listen(3000, function(){
	console.log("App is being served on port 3000")
});