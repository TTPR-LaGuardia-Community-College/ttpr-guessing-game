// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  let randomNum = Math.floor(Math.random() * 100) + 1;
  return randomNum;
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
    // Initialize properties:
    this.playersGuess = null; // Current guess
    this.pastGuesses = []; // Array of previous guesses
    this.winningNumber = generateWinningNumber(); // Winning number
  }

  // Return absolute difference between guess and winning number
  difference() {
    var diff = Math.abs(this.playersGuess - this.winningNumber);
    return diff; // Return absolute difference
  }

  // Return true if guess is lower than winning number
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true; // Return boolean comparison
    }
    return false; 
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    if (num < 1 || num > 100 || isNaN(num)) {
      throw ("That is an invalid guess.");
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
      return "You Win!";
    }
    // Handle duplicate guess
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    }
    // Add to pastGuesses
      this.pastGuesses.push(this.playersGuess);
    // Handle max guesses
    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }
    // Return temperature feedback
    const diff = this.difference();
    if (diff < 10) return "You're burning up!";
    if (diff < 25) return "You're lukewarm.";
    if (diff < 50) return "You're a bit chilly.";
    return "You're ice cold!";
  }
  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    let hintArray = [];
    hintArray.push(this.winningNumber);
    // Create array of random numbers
    while (hintArray.length < 3) {
      let randomNum = generateWinningNumber();
      if (!hintArray.includes(randomNum)) {
        hintArray.push(randomNum);
      }
    }
    // Shuffle and return
    return shuffle(hintArray);
  }
}

function newGame() {
  return new Game();
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  let game = new Game(); // ✅ start new game

  const guessInput = document.getElementById("Guess");
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const display = document.getElementById("display");
  const guessBoxes = document.querySelectorAll(".guess");
  const closeButton = document.getElementById("close-btn");
  const bgMusic = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");
  const clickSound = document.getElementById("click-sound");

  window.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, { once: true });
  [submitButton, resetButton, hintButton, closeButton, muteBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => clickSound.play());
    }
  });

  if (submitButton) {
    submitButton.addEventListener("click", () => {
      const guess = parseInt(display.value);
      if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
      }
      try {
        const result = game.playersGuessSubmission(guess);
        display.value = guess; // using input instead of innerText

        const index = game.pastGuesses.length - 1;
        if (index < guessBoxes.length) {
          guessBoxes[index].innerText = guess;
        }

        alert(result);

        if (result === "You Win!" || result === "You Lose.") {
          setTimeout(() => {
            game = new Game();
            display.value = "";
            guessBoxes.forEach(box => box.innerText = "?");
            alert("Game reset. New number generated.");
          }, 1000);
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      game = new Game();
      display.value = "";
      guessBoxes.forEach(box => box.innerText = "?");
      alert("Game reset. New number generated.");
    });
  }

  if (hintButton) {
    hintButton.addEventListener("click", () => {
      const hint = game.provideHint();
      alert("Hints: " + hint.join(", "));
    });
  }
  if (bgMusic) {
    muteBtn.addEventListener("click", () => {
      bgMusic.muted = !bgMusic.muted;
      muteBtn.textContent = bgMusic.muted ? "🔇" : "🔊";
  });
}

if (closeButton) {
  closeButton.addEventListener("click", () => {
    alert("Closing app... Goodbye!");
    document.querySelector(".window").style.display = "none";
  });
}
  if (game.pastGuesses.length > 0) {
    alert("Previous guesses: " + game.pastGuesses.join(", "));
  }
});
