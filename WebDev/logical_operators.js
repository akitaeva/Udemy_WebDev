//construct greetings depending on the specific age number

var bouncer = (age) => { 
    if (age < 0 ) { 
        console.log("This must be an error!");
    }
    else if (age === 21 ) {
        console.log("HAppy birthday!");
    }
    else if (age % 2 !== 0) {
        console.log("Your age is odd!");
    }
    else if ( Math.sqrt(Math.sqrt(age)) % 1 ===0) {
        console.log("Perfect square!");
    }
}

bouncer(16);
bouncer(5);