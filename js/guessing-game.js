// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Fisher-Yates shuffle
function shuffle(array) {
  let m = array.length, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
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
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        return 'You Lose.';
      }

      let diff = this.difference();
      if (diff < 10) return "You're burning up!";
      if (diff < 25) return "You're lukewarm.";
      if (diff < 50) return "You're a bit chilly.";
      return "You're ice cold!";
    }
  }

  provideHint() {
    const hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
  }
}

// DOM Setup
document.addEventListener("DOMContentLoaded", () => {
  let game = new Game();

  // DOM elements
  const guessInput = document.getElementById("guess-input");
  const submitButton = document.getElementById("submit-btn");
  const resetButton = document.getElementById("reset-btn");
  const hintButton = document.getElementById("hint-btn");
  const feedback = document.getElementById("feedback");
  const attempts = document.getElementById("attempts");

  // Initial UI state
  attempts.textContent = `Attempts left: ${5}`;

  submitButton.addEventListener("click", () => {
    const guess = Number(guessInput.value);
    try {
      const result = game.playersGuessSubmission(guess);
      feedback.textContent = result;

      if (result === "You Win!" || result === "You Lose.") {
        disableGame();
      }

      attempts.textContent = `Attempts left: ${5 - game.pastGuesses.length}`;
    } catch (err) {
      feedback.textContent = err;
    }

    guessInput.value = "";
    guessInput.focus();
  });

  resetButton.addEventListener("click", () => {
    game = new Game();
    feedback.textContent = "";
    attempts.textContent = `Attempts left: 5`;
    guessInput.disabled = false;
    submitButton.disabled = false;
    guessInput.value = "";
    guessInput.focus();
  });

  hintButton.addEventListener("click", () => {
    const hints = game.provideHint();
    feedback.textContent = `💡 Hint: One of these is correct → ${hints.join(', ')}`;
  });

  function disableGame() {
    guessInput.disabled = true;
    submitButton.disabled = true;
  }
});
