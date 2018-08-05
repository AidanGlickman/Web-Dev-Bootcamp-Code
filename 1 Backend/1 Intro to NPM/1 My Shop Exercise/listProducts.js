var faker = require('faker');


console.log("====================\nWelcome to my shop!\n====================")
for (var i = 0; i < 10; i++) {
	console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}