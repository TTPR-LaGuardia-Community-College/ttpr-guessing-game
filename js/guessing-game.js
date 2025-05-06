/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

/* 
NUMBER GUESSING GAME
Implement the missing code based on the comments
*/

// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  for(let i = array.length - 1; i >= 0; --i) {
    let j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class Game {
  constructor() {
    // Initialize properties:
    // - playersGuess (current guess)
    // - pastGuesses (array of previous guesses)
    // - winningNumber (generated number)
    this.playersGuess = null;
    this.pastGuesses = new Array();
    this.winningNumber = generateWinningNumber();
  }

  // Return absolute difference between guess and winning number
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  // Return true if guess is lower than winning number
  isLower() {
    return this.playersGuess - this.winningNumber < 0;
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    // Set playersGuess
    // Return checkGuess result
    if(typeof num !== "number" || num < 1 || num > 100) {
      throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    return this.checkGuess(this.playersGuess);
  }

  // Evaluate guess and return feedback message
  checkGuess() {
    // Handle win condition
    // Handle duplicate guess
    // Add to pastGuesses
    // Handle max guesses
    // Return temperature feedback
    if(this.playersGuess === this.winningNumber) {
      return "You Win!";
    }
    if(this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    }

    this.pastGuesses.push(this.playersGuess);

    if(this.pastGuesses.length === 5) {
      return "You Lose.";
    }

    let diff = this.difference();

    if(diff < 10) {
      return "You're burning up!";
    }
    else if(diff < 25) {
      return "You're lukewarm.";
    }
    else if(diff < 50) {
      return "You're a bit chilly.";
    }
    else if(diff < 100) {
      return "You're ice cold!";
    }
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    let hintArray = new Array();
    hintArray.push(this.winningNumber);
    hintArray.push(generateWinningNumber());
    hintArray.push(generateWinningNumber());
    shuffle(hintArray);
    return hintArray;
  }
}

function newGame() {
  return new Game();
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize game state
  // Get DOM elements
  // Set up event handlers for:
  // - Submit guess
  // - Reset game
  // - Show hint
  // Implement:
  // - Input validation
  // - Display updates
  // - Game state management
  let game = newGame();
  
});
