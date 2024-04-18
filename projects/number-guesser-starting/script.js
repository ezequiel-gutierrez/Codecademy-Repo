let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:


// Generates a number between 1 to 9 (Inclusive)
function generateTarget() {
    return Math.floor(Math.random()*9+1);
}

/* Use Math.abs() to get the absolute value between the random number and both the user and computer number.
The smallest value is the one that guessed the closest*/
function compareGuesses(user, computer, randomNumber) {
    let userGuess = Math.abs(user - randomNumber);
    let computerGuess = Math.abs(computer - randomNumber);

    // If the user guess is smaller or equal then the computer's guess, then return true, else return false
    // I checked if the cumputer guess was smaller than the user guess after the else statement, but it isnt necessary
    if (userGuess <= computerGuess) {
        return true;
    } else if (computerGuess < userGuess) {
        return false;
    }
}

// Adds 1 to either the human or computer score depending on the string that was passed to the function.
function updateScore(str) {
    if (str === "human") {
        humanScore += 1;
    } else if (str === "computer"){
        computerScore +=1;
    }
}

// Adds 1 to the variable holding the amount of rounds played.
function advanceRound() {
    currentRoundNumber += 1;
}

// Uncomment the following pieces of code if you want to test each function on your own:

// Generate Target
// console.log(generateTarget());

// Compare Guess (player wins)
// console.log(compareGuesses(6, 4, 9));

// Compare Guess (player lost)
// console.log(compareGuesses(1, 8, 9));

// Compare Guess (Tie)
// console.log(compareGuesses(5, 5, 5));

// Update Score
// updateScore("human");
// updateScore("human");
// updateScore("human");
// updateScore("computer");
// updateScore("computer");
// console.log(`Human has scored ${humanScore} times and Computer has scored ${computerScore} times`);

// Advance Round
// console.log(`You are currently on round ${currentRoundNumber}`);
// advanceRound();
// console.log(`You advanced to round ${currentRoundNumber}`);



// Thank you for looking at the code <3 <3 <3