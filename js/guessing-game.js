// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  let m = array.length;
  while (m > 0) {
    let i = Math.floor(Math.random() * m--);
    let t = array[m];
    array[m] = array[i];
    array[i] = t;
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
    if (typeof num !== 'number' || num < 1 || num > 100 || isNaN(num)) {
      throw new Error('That is an invalid guess.');
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    }

    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    }

    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }

    const diff = this.difference();

    if (diff < 10) return "You're burning up!";
    if (diff < 25) return "You're lukewarm.";
    if (diff < 50) return "You're a bit chilly.";
    return "You're ice cold!";
  }

  provideHint() {
    const hintArray = [this.winningNumber];
    while (hintArray.length < 3) {
      const rand = generateWinningNumber();
      if (!hintArray.includes(rand)) {
        hintArray.push(rand);
      }
    }
    return shuffle(hintArray);
  }
}

function newGame() {
  return new Game();
}

// DOM Interaction
document.addEventListener("DOMContentLoaded", () => {
  let game = new Game();
  const guessInput = document.getElementById('guessInput');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const hintBtn = document.getElementById('hintBtn');
  const resultText = document.getElementById('result');
  const pastGuessesList = document.getElementById('pastGuesses');

  function updateGuessesDisplay() {
    pastGuessesList.textContent = game.pastGuesses.join(', ');
  }

  function resetGame() {
    game = newGame();
    guessInput.value = '';
    resultText.textContent = '';
    pastGuessesList.textContent = '';
  }

  submitBtn.addEventListener('click', () => {
    const guess = parseInt(guessInput.value, 10);
    try {
      const result = game.playersGuessSubmission(guess);
      resultText.textContent = result;
      updateGuessesDisplay();
    } catch (error) {
      resultText.textContent = error.message;
    }
    guessInput.value = '';
  });

  resetBtn.addEventListener('click', resetGame);

  hintBtn.addEventListener('click', () => {
    const hints = game.provideHint();
    resultText.textContent = `One of these is correct: ${hints.join(', ')}`;
  });
});
