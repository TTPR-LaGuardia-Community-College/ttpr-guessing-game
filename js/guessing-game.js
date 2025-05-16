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
  let randomNum = Math.floor(Math.random() * 100)
  return randomNum
  // Return random integer
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  // Modify array in place and return it
  // Start from the last element and swap 
  // one by one. We don't need to run for 
  // the first element that's why i > 0 
  for (let i = array.length - 1; i > 0; i--) {

    // Pick a random index from 0 to i inclusive
    let j = Math.floor(Math.random() * (i + 1));

    // Swap arr[i] with the element 
    // at random index 
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

class Game {
  playersGuess;
  pastGuesses;
  winningNumber;
  constructor() {
    // Initialize properties:
    this.playersGuess = 0
    this.pastGuesses = []
    this.winningNumber = generateWinningNumber()
    // - playersGuess (current guess)
    // - pastGuesses (array of previous guesses)
    // - winningNumber (generated number)
  }

  // Return absolute difference between guess and winning number
  difference() {
    // Calculate and return difference
    let dif = 0
    dif = Math.abs(this.playersGuess[-1] - this.winningNumber)
    return dif
  }

  // Return true if guess is lower than winning number
  isLower() {
    // Return boolean comparison
    if (this.playersGuess < this.winningNumber) {
      return true;
    }
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    // Set playersGuess
    // Return checkGuess result
    this.playersGuess = num
    try {
      return this.checkGuess(num)
    } catch (err) {
      return 'invalid input'
    }

  }

  // Evaluate guess and return feedback message
  checkGuess(playersGuess) {
    // Handle win condition
    let msg = ''

    if (this.playersGuess == this.winningNumber) {
      msg += 'winning number!'
    }
    if (this.pastGuesses.includes(playersGuess)) {
      console.log(this.pastGuesses)
      console.log(this.playersGuess)
      msg += 'duplicate!'
    }
    if (this.isLower()) {
      msg += "is lower than winning number"
    }

    this.pastGuesses.push(playersGuess) //the player guess is pushed into the passGuess which affect duplicate event
    if (this.pastGuesses.length >= 5) {
      msg += 'reach max attemps'
    }
    return msg
    // Handle duplicate guess
    // Add to pastGuesses
    // Handle max guesses
    // Return temperature feedback
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    let hintArray = []
    for (let i = 0; i < 2; i++) {
      hintArray.push(Math.floor(Math.random() * 100))
    }
    hintArray.push(this.winningNumber)
    shuffle(hintArray)
    return hintArray;
  }
  resetGame() {
    this.playersGuess = 0
    this.pastGuesses = []
    console.log(this.pastGuesses)
    this.winningNumber = generateWinningNumber()
  }
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize game state
  let game = new Game()
  // Get DOM elements
  let input = document.getElementById('numberGuess')
  let btnSubmit = document.getElementById('btn-summit')
  let btnReset = document.getElementById('btn-reset')
  let btnHint = document.getElementById('btn-hint')
  let field = document.getElementById('num-field')

  // Set up event handlers for:
  btnSubmit.addEventListener('click', function () {
    //field.innerHTML = game.checkGuess(input.value)
    field.innerHTML =
      game.playersGuessSubmission(input.value)
    console.log(game.pastGuesses)
    console.log(game.playersGuess)
    function validation() {
      if (game.playersGuess > 100) {
        field.innerHTML = "invalid number"
      } else if (game.playersGuess < 0) {
        field.innerHTML = "invalid number"
      }
    }
    validation()
  })
  btnReset.addEventListener('click', function () {
    game.resetGame()
    input.value = 0
  })
  btnHint.addEventListener('click', function () {
    field.innerHTML = game.provideHint().toString()
  })
  // - Submit guess
  // - Reset game
  // - Show hint
  // Implement:
  // - Input validation
  // - Display updates
  // - Game state management
});


