var mongoose = require('mongoose');
var passpostLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passpostLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;