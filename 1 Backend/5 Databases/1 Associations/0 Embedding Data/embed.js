var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blogdemo', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);


var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
// 	email: "charlie@brown.edu",
// 	name: "Charlie Brown"
// })

// newUser.posts.push({
// 	title: "Very good Yum yum",
// 	content: "Boy, I sure love me some cabbage"
// })

// newUser.save(function(err, user){
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log(user)
// })

User.findOne(
	{name: "Charlie Brown"}, function(err, user){
		if(err)
			console.log(err)
		else{
				user.posts.push({
					title: "Less Bad Yum No Yum",
					content: "Herats of palm is a yuk yuk no want."
				});
				user.save(function(err, user){
					if(err)
						console.log(err);
					else
						console.log(user);
				});
			}
	}

);



// var newPost = new Post({
// 	title: "Reflections on Apples",
// 	content: "Very gud yum yum."
// });

// newPost.save(function(err, post){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(post);
// });