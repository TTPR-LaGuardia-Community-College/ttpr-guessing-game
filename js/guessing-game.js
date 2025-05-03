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
            return 'You Win!';
        }
        // Handle duplicate guess
        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }

        // Add to pastGuesses
        this.pastGuesses.push(this.playersGuess);
        // Handle max guesses
        if (this.pastGuesses.length > 3) {
            return 'You Lose.';
        }
        // Return temperature feedback
        if(this.difference() < 10) {
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
});
