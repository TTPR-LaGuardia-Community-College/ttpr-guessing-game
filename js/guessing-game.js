/*/* 

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
  num=Math.floor(Math.random()*100)+1;
  return num;
  // Return random integer
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  let m=array.length;
  while (m>0){
    let i=Math.floor(Math.random()*m);
    m--;

    let temp=array[m];
    array[m]=array[i];
    array[i]=temp;
  }
  return array;

  // Modify array in place and return it
}

class Game {
  constructor() {
    this.playersGuess=null;
    this.pastGuesses=[];
    this.winningNumber=generateWinningNumber();

    // Initialize properties:
    // - playersGuess (current guess)
    // - pastGuesseses (array of previous guesses)
    // - winningNumber (generated number)
  }
  
  // Return absolute difference between guess and winning number
  difference() {
    return Math.abs(this.playersGuess-this.winningNumber);
    // Calculate and return difference
  }

  // Return true if guess is lower than winning number
  isLower() {
    return this.playersGuess<this.winningNumber;
    // Return boolean comparison
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    if (typeof(num)!=="number"){
      throw "This is an invalid input";
    }
    if (num<1 || num>100){
      throw "This is an invalid input";
    }

    this.playersGuess=num;
    return this.checkGuess()
    // Throw error if invalid number
    // Set playersGuess
    // Return checkGuess result
  }

  // Evaluate guess and return feedback message
  checkGuess() {
    if (this.playersGuess===this.winningNumber){
      return "You win";
    }
    if (this.pastGuesses.includes(this.playersGuess)){
      return "You already used this number";
    }
    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length ===3 ){
      return `You lost. The number was ${this.winningNumber}`;
    }
    if (Math.abs(this.playersGuess-this.winningNumber)<10){
      return "You're burning up";
    }
    if (Math.abs(this.playersGuess-this.winningNumber)<25){
      return "You're lukewarm";
    }
    if (Math.abs(this.playersGuess-this.winningNumber)<50){
      return "You're a bit chilly";
    }
    if (Math.abs(this.playersGuess-this.winningNumber)<100){
      return "You're ice cold";
    }
    

    // Handle win condition
    // Handle duplicate guess
    // Add to pastGuesses
    // Handle max guesses
    // Return temperature feedback
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    let hintArray=[
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber()
    ];
    return shuffle(hintArray);
  }
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  let game=new Game();
  let input=document.getElementById("playerInput");
  let subBtn=document.getElementById("submitButton");
  let hintBtn=document.getElementById("hintButton");
  let restBtn=document.getElementById("resetButton");
  let messageArea = document.getElementById("messageArea");

function displayMessage(msg) {
  messageArea.textContent = msg;
}

subBtn.addEventListener("click", () => {
  const guess = parseInt(input.value, 10);
  let message;
  try {
    message = game.playersGuessSubmission(guess);
  } catch (err) {
    message = err;
  }
  displayMessage(message);

  if (message.includes("win") || message.includes("lost")) {
    submitBtn.disabled = true;
    input.disabled = true;
  }

  // Update DOM with the message
});

hintBtn.addEventListener("click", () => {
  const hints = game.provideHint();
  displayMessage(`One of these is correct: ${hints} BITCH!`);

});

restBtn.addEventListener("click", () => {
  game = new Game();
  input.value = "";
  input.disabled = false;
  submitBtn.disabled = false;
  displayMessage("New game started! Enter your guess.");
  
  
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
});

displayMessage("Game loaded. Guess a number between 1 and 100!");
});
