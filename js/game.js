// Fisher-Yates Shuffle
function shuffle(array) {
  let m = array.length, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
}

// Generate Winning Number
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Game Class
function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(num) {
  if (typeof num !== 'number' || num < 1 || num > 100) {
    throw 'That is an invalid guess.';
  }
  this.playersGuess = num;
  return this.checkGuess();
};

Game.prototype.checkGuess = function() {
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
  if (this.difference() < 10) return "You're burning up!";
  if (this.difference() < 25) return "You're lukewarm.";
  if (this.difference() < 50) return "You're a bit chilly.";
  return "You're ice cold!";
};

Game.prototype.provideHint = function() {
  let hints = [this.winningNumber];
  while (hints.length < 3) {
    let num = generateWinningNumber();
    if (!hints.includes(num)) hints.push(num);
  }
  return shuffle(hints);
};

function newGame() {
  return new Game();
}
