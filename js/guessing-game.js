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
  let randomNumber = Math.ceil(Math.random() * 100)

  return randomNumber;
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i (inclusive)
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements
    let tempVar = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempVar;

    // Debug logs
    console.log("Generated random index:", randomIndex);
    console.log("Randomly chosen array element:", array[randomIndex]);
    console.log("Current array:", array);
    console.log(`Swapped ${array[i]} and ${array[randomIndex]}`);
  }
  return array;
}

//just to make sure shuffle function works
//shuffle(["A", "B", "C", "D", "E", "F"]);
//console.log("is this even working?");


class Game {
  constructor() {
    // Initialize properties:
    // - playersGuess (current guess)
    this.playerGuess = null;
    // - pastGuesses (array of previous guesses)
    this.pastGuesses = [];
    // - winningNumber (generated number)
    this.winningNumber = generateWinningNumber();
  }

  // Return absolute difference between guess and winning number
  difference() {
    // Calculate and return difference
    return Math.abs(this.winningNumber - this.playerGuess);
  }

  // Return true if guess is lower than winning number
  isLower() {
    // Return boolean comparison
    return this.playerGuess < this.winningNumber;
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    // Set playersGuess
    // Return checkGuess result

    console.log('current num: ', num);

    console.log("num type: ", typeof num);

    console.log("num within range? ", 0 < num && num < 100);

    if ((typeof num == "number") && (1 < num) && (num < 100)) {

      this.playerGuess = num;
      console.log("user initial guess: ", num);


    }

    else {

      throw ("Number should be of number type and between 1-100!");
    }

    return this.playerGuess;

  }


  // Evaluate guess and return feedback message
  checkGuess() {
    // Handle win condition
    // Handle duplicate guess
    // Add to pastGuesses
    // Handle max guesses
    // Return temperature feedback

    let maxGuesses = 5;



    if (this.playerGuess === this.winningNumber) {
      console.log("YOU WON!");

      let winningMessage = document.getElementById("winning-message");
      winningMessage.innerHTML = "YOU WON!"

      let winningArea = document.getElementById("winning-area");

      let img = document.createElement("img");
      img.src = "img/isagi-blue-lock.gif";
      img.alt = "BLUE LOCK ISAGI";


      winningArea.appendChild(img);

    }

    this.pastGuesses.push(this.playerGuess);
    console.log(`YOU STILL HAVE ${maxGuesses - this.pastGuesses.length} TRIES TO GO..`)

    const searchResult = this.pastGuesses.filter(item => item === this.playerGuess).length;
    console.log(`is ${this.playerGuess} inside [${this.pastGuesses}] more than once? ${searchResult}`);
    if (searchResult > 1) {

      let duplicateErrorMessage = document.getElementById("response-area-message");
      duplicateErrorMessage.innerHTML = "you already tired this number! Try another one..";
      console.error("you already tired this number! Try another one..");

      let hintsMessage = document.getElementById("response-area-hints");
      hintsMessage.innerHTML = `need a hand? here's a hint: ${this.provideHint()}`
    }
    console.log("current guess history: ", this.pastGuesses);



    if (this.pastGuesses.length === maxGuesses) {

      console.log("you used up all of your tries!");
    }

  }





  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    let hint = [];
    let random1 = generateWinningNumber();
    let random2 = generateWinningNumber();
    hint.push(this.winningNumber, random1, random2)
    hint = shuffle(hint);
    console.log("hints array: ", hint);

    return hint;
  }

}


// let gameObject = new Game();

// console.log("new game obj created ", gameObject);
// gameObject.playersGuessSubmission(46);
// gameObject.provideHint();
// gameObject.checkGuess();



function submitGuess(object) {

  let button = document.getElementById("submitButton")

  button.addEventListener('click', () => {

    let inputValue = document.getElementById("inputValue").value;

    object.playerGuess = Number(inputValue);



    console.log("input value: ", inputValue);

    object.playersGuessSubmission(object.playerGuess);

    object.checkGuess();

    object.provideHint();



  })



}


function resetGame(button) {

  button.addEventListener('click', () => {
    location.reload();
  }

  );

}





// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize game state
  let gameObject = new Game();
  console.log("new game obj created ", gameObject)


  // Get DOM elements
  // Set up event handlers for:
  // - Submit guess

  submitGuess(gameObject);

  // - Reset game

  let resetButton = document.getElementById('resetButton');

  resetGame(resetButton);



  // - Show hint
  // Implement:
  // - Input validation
  // - Display updates
  // - Game state management
});
