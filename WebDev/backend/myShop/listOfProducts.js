const faker = require('faker');

const generator = () => {

    console.log("===========================================");
    console.log(("       welcome to my shop").toUpperCase());
    console.log("===========================================");
    for (i=0; i<10; i++) {
        let randomProduct = faker.commerce.productName(); // generate product names
        let randomPrice = faker.commerce.price(); // generate product prices
        console.log(randomProduct +" - $"+ randomPrice);
    }


}

generator();