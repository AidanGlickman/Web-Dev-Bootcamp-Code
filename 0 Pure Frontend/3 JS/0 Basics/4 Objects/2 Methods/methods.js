var person = {
	name: "Chuck",
	age: 45;
	isCool: false,
	friends: ["friend1", "friend2"],
	addFriend: function(name){
		this.friends.push(name);
	}
}

console.log(person.friends);
person.addFriend("friend3");
console.log(person.friends);
