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
  // Return random integer
  return Math.floor(Math.random()*100) + 1;
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  let m = array.length, i;
  while (m){
    i = Math.floor(Math.random()*m--);
    [array[m], array[i]] = [array[i], array[m]];
  }
  // Modify array in place and return it
  return array;
}

class Game {
  constructor() {
    // Initialize properties:
    // - playersGuess (current guess)
    this.playersGuess = null;
    // - pastGuesses (array of previous guesses)
    this.pastGuesses = [];
    // - winningNumber (generated number)
    this.winningNumber = generateWinningNumber();
    
  }

  // Return absolute difference between guess and winning number
  difference() {
    // Calculate and return difference
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  // Return true if guess is lower than winning number
  isLower() {
    // Return boolean comparison
    return this.playersGuess < this.winningNumber;
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    if(typeof num !== 'number' || num < 1 || num > 100 || isNaN(num)){
      throw "Invalid Guess";
    }
    // Set playersGuess
    this.playersGuess = num;
    // Return checkGuess result
    return this.checkGuess();
  }

  // Evaluate guess and return feedback message
  checkGuess() {
    // Handle win condition
    if(this.playersGuess === this.winningNumber){
      return "You Win!";
    }
    // Handle duplicate guess
    if(this.pastGuesses.includes(this.playersGuess)){
      return "You have already guessed that number.";
    }
    // Add to pastGuesses
    this.pastGuesses.push(this.playersGuess);
    // Handle max guesses
    if(this.pastGuesses.length === 5){
      return "You Lose";
    }
    // Return temperature feedback
    const diff = this.difference();
    if(diff<10) return "You're burning up!";
    if(diff<25) return "You're lukewarm.";
    if(diff<50) return "You're a bit chilly.";
    return "You're ice cold!"
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    const hints = [this.winningNumber, generateWinningNumber()
      , generateWinningNumber()];
    return shuffle(hints);
  }
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize game state
  const game = new Game();
  // Get DOM elements
  const guessInput = document.getElementById("player-input");
  // Set up event handlers for:
  // - Submit guess
  const submitBtn = document.getElementById("submit");
  // - Reset game
  const resetBtn = document.getElementById("reset");
  // - Show hint
  const hintBtn = document.getElementById("hint");
  // Implement:
  const feedback = document.getElementById("feedback");
  // - Input validation
  const pastGuessesList = document.getElementById("past-guesses");
  // - Display updates
  function updateGuessList(){
    pastGuessesList.innerHTML = game.pastGuesses.map(g=> `<li>${g}</li>`).join("");
  }
  // - Game state management
  submitBtn.addEventListener("click", () => {
    const value = Number(guessInput.value);
    try{
      const result = game.playersGuessSubmission(value);
      feedback.textContent = result;
      updateGuessList();
    } catch (err){
      feedback.textContent = err;
    }
    guessInput.value = "";
  });

  resetBtn.addEventListener("click", () => {
    location.reload();
  });

  hintBtn.addEventListener("click", () => {
    const hints = game.provideHint();
    feedback.textContent = `One of these is correct: ${hints.join(", ")}`;
  });

  function disableGame(){
    guessInput.disabled = true;
    submitButton.disabled = true; 
  }
});
