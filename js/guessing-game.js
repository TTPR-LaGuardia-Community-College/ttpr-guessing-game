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
    // Return random integer
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.hintUsed = false;

        // Game.prototype.checkGuess();
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

        if (typeof num !== 'number' || num < 1 || num > 100) {
            throw 'That is an invalid guess.';
        }
        // Set playersGuess
        this.playersGuess = num;
        // Return checkGuess result
        return this.checkGuess();
    }

    // Evaluate guess and return feedback message
    checkGuess() {
        // Handle win condition
        if (this.playersGuess === this.winningNumber) {
            this.pastGuesses.push(this.winningNumber);
            //confetti();
            return 'You Win!';
        }
        // Handle duplicate guess
        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }
        // Add to pastGuesses
        this.pastGuesses.push(this.playersGuess);
        // Handle max guesses
        if (this.pastGuesses.length >= 5) {
            return 'You Lose.';
        }
        // Return temperature feedback
        if (this.difference() < 10) {
            return "You're burning up!"
        } else if (this.difference() < 25) {
            return "You're lukewarm."
        } else if (this.difference() < 50) {
            return "You're a bit chilly."
        } else if (this.difference() < 100) {
            return "You're ice cold!"
        }
    }

    // Generate array with 3 numbers (winning + 2 random)
    provideHint() {
        // Create array and shuffle
        const hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
        return shuffle(hintArray);
    }

}

// Number input validation
const input = document.getElementById("guess-input");
input.addEventListener("input", () => {
    const value = parseInt(input.value, 10);
    if (value < 1) input.value = 1;
    if (value > 100) input.value = 100;
});

function newGame() {
    return new Game();
}


// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Initialize game state
    let game = newGame();
    // Get DOM elements
    const quote = document.querySelector(".quote");
    const guessButton = document.querySelector(".guess-button");
    const guessInput = document.getElementById("guess-input");
    // Set up event handlers for:
    // - Submit guess
    guessButton.addEventListener("click", function () {
        const number = Number(guessInput.value);
        const answerBoxes = document.querySelectorAll('.answer');
        if(game.pastGuesses.includes(game.winningNumber)) {
            quote.innerHTML = "You've already won! Please start a new game.";
            return;
        }
        if (game.pastGuesses.length >= 5) {
            quote.innerHTML = "You've lost the game! Please start a new game.";
            return;
        }
        if (!number || isNaN(number)) {
            quote.innerHTML = "There is no number!";
        } else {
            // quote.innerHTML = game.checkGuess();
            quote.innerHTML = game.playersGuessSubmission(number);
            if (game.pastGuesses.includes(game.winningNumber)) {
                confetti();
            }
            answerBoxes[game.pastGuesses.length - 1].innerHTML = number;
        }
        guessInput.value = '';
    });

    // - Reset game
    const resetButton = document.querySelector(".reset-btn");
    resetButton.addEventListener("click", function () {

        game = newGame();
        const answerBoxes = document.querySelectorAll('.answer');
        const hintBoxes = document.querySelectorAll('.hint');
        answerBoxes.forEach(answerBox => {
            answerBox.innerHTML = '?';
        })

        hintBoxes.forEach(hintBox => {
            hintBox.innerHTML = '!';
        })

        guessInput.value = '';

        quote.innerHTML = "(Between 1 and 100)";
    })
    // - Show hint

    const hintButton = document.querySelector(".hint-btn");
    hintButton.addEventListener("click", function () {
        const hint = game.provideHint();
        const answerBoxes = document.querySelectorAll('.hint');
        if (!game.hintUsed) {
            answerBoxes.forEach((answerBox, i) => {
                answerBox.innerHTML = hint[i];
            })
            game.hintUsed = true;
            return;
        }

        document.querySelector('.quote').innerHTML = "You've already used your hint!";
    })
    // Implement:
    // - Input validation
    // - Display updates
    // - Game state management
});
