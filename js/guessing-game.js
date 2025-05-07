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
    return this.checkGuess();
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

    const diff = this.difference();
    if(diff < 10) return "You're burning up!";
    else if(diff < 25) return "You're lukewarm.";
    else if(diff < 50) return "You're a bit chilly.";
    else if(diff < 100) return "You're ice cold!";
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    let hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber()
    ]
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

  let inputField = document.getElementById("guessInput");
  inputField.autocomplete = "off";
  let pastGuessesRow = document.getElementsByClassName("before");

  let submitButton = document.getElementById("submit");
  let resetButton = document.getElementById("reset");
  let hintButton = document.getElementById("hint");

  let div = document.getElementById("message");

  submitButton.addEventListener("click", () => {
    const guess = Number(inputField.value);
    if(Number.isNaN(guess)) {
      div.innerHTML = "Invalid number!";
      return;
    }
    let message = game.playersGuessSubmission(guess);
    div.innerHTML = message;
    for(let i = 0; i < game.pastGuesses.length; ++i) {
      pastGuessesRow[i].innerHTML = game.pastGuesses[i];
    }
    if(game.pastGuesses.length === 5) {
      submitButton.disabled = true;
    }
  })

  resetButton.addEventListener("click", () => {
    game = new Game();
    submitButton.disabled = false;
    for(let i = 0; i < pastGuessesRow.length; ++i) {
      pastGuessesRow[i].innerHTML = "?";
    }
    div.innerHTML = "Please enter a number.";
  })

  hintButton.addEventListener("click", () => {
    const hintArray = game.provideHint();
    div.innerHTML = "Possible Numbers: ";
    div.innerHTML += hintArray;
  })
});
