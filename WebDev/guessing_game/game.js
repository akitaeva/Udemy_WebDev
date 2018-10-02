// create a secret number
const secretNumber = () => {
   return secretNum = Math.round(Math.random()*this.range);
}

const getRange = () => {
   return range = prompt("Pick the upper limit fot the secret number: ");
   
}


const getGuess = () => {
//get user input for a guess
    const userInput = prompt("Pick a number between 0 and " + this.range);
    const guess =Number(userInput);
//compare the input to a secret number - too low, too high, or the match!
    if (guess == this.secretNum) { 
        alert ("You guessed it!!");
        return this.availGuesses = -1 ;
    } 
    else if (guess > this.secretNum) {
        alert ("Wrong!! Too high!");
    }
    else {
        alert ("Wrong!! Too low!");
    }
    console.log("guess in the function:", guess, "the secret num ", this.secretNum); 
};

const Game = () => {
    getRange();
    secretNumber();
    //count the attempts
    for (availGuesses = 10; availGuesses > 0; availGuesses--) {
        getGuess();
        console.log("the avail guesses INSIDE: ", availGuesses);
    }
   //win or lose alert
    if (availGuesses < 0) {
        alert("You have won!")
    }
    else {
        alert("You have lost! Reload the page to start again!")
    }
}

Game();






