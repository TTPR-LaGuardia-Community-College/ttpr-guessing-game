// guessing-game.js

// Generate a random winning number between 1 and 100
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Shuffle an array in place using Fisher-Yates algorithm
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (typeof num !== 'number' || num < 1 || num > 100) {
      throw 'That is an invalid guess.';
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return 'You Win!';
    }
    if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    }
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5) {
      return 'You Lose.';
    }
    const diff = this.difference();
    if (diff < 10) return "You're burning up!";
    if (diff < 25) return "You're lukewarm.";
    if (diff < 50) return "You're a bit chilly.";
    return "You're ice cold!";
  }

  provideHint() {
    const hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
  }
}

function newGame() {
  return new Game();
}

