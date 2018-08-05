var mongoose = require("mongoose");

var Post = require("./models/post");
var User = require("./models/user");

mongoose.connect('mongodb://localhost:27017/blogdemoref', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});



// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bobby Bob Bob"
// });


// Post.create({
// 	title: "Goooood content",
// 	content: "JK title was the only good part hehehe"
// })

Post.create({
	title: "Yum Yum Yum",
	content: "I wuv me a yum yum. yum yum"
}, function(err, post){
	User.findOne({email: "bob@gmail.com"}, function(err, user){
		if(err)
			console.log(err)
		else{
			user.posts.push(post)
			user.save(function(err, user){
				if(err)
					console.log(err)
				else
					console.log(user)
			})
		}
	})
})

// User.findOne(
// 	{email: "bob@gmail.com"})
// 	.populate("posts")
// 	.exec(function(err, user){
// 		if(err)
// 			console.log(err)
// 		else
// 			console.log(user)
// 	})




