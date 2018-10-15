const faker = require('faker');

const generator = () => {

    console.log("===========================================");
    console.log(("       welcome to my shop").toUpperCase());
    console.log("===========================================");
    for (i=0; i<10; i++) {
        // generate products and prices
        console.log(faker.commerce.productName() +" - $"+ faker.commerce.price());
    }


}

generator();