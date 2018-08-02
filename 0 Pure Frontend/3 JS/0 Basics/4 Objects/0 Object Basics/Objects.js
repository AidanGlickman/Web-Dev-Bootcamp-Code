var person = {
	name: "Travis",
	age: 21,
	city: "Los Angeles"
};

console.log(person.name);
console.log(person["name"]);

person["age"] += 1;
person.city = "London";