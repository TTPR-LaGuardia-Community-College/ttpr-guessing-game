function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

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

  playersGuessSubmission(guess) {
    if (typeof guess !== 'number' || guess < 1 || guess > 100) {
      throw 'That is an invalid guess.';
    }
    this.playersGuess = guess;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) return "You Win!";
    if (this.pastGuesses.includes(this.playersGuess)) return "You have already guessed that number.";
    
    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5) return "You Lose.";

    const diff = this.difference();
    if (diff < 10) return "You're burning up!";
    if (diff < 25) return "You're lukewarm.";
    if (diff < 50) return "You're a bit chilly.";
    return "You're ice cold!";
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  provideHint() {
    const hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
  }
}

function newGame() {
  return new Game();
}
