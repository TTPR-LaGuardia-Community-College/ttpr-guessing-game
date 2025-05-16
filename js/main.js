let game = newGame();

function updateDisplay(message) {
  document.getElementById('title').textContent = message;
  document.getElementById('guess-list').children[game.pastGuesses.length - 1].textContent = game.playersGuess;
}

document.getElementById('submit').addEventListener('click', function() {
  let guess = Number(document.getElementById('player-input').value);
  document.getElementById('player-input').value = '';
  let message = game.playersGuessSubmission(guess);
  updateDisplay(message);
});

document.getElementById('reset').addEventListener('click', function() {
  game = newGame();
  document.getElementById('title').textContent = 'Guessing Game!';
  document.getElementById('guess-list').innerHTML = '<li>-</li><li>-</li><li>-</li><li>-</li><li>-</li>';
});
