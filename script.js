const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let playing = false;

const statusText = document.getElementById("status");
const startBtn = document.getElementById("start-btn");

let score = 0;
const scoreText = document.getElementById("score");

const buttons = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  yellow: document.getElementById("yellow"),
};

startBtn.addEventListener("click", startGame);

for (let color of colors) {
  buttons[color].addEventListener("click", () => handleClick(color));
}

function startGame() {
  sequence = [];
  playerSequence = [];
  score = 0;
  updateScore();
  playing = true;
  statusText.textContent = "Watch the sequence...";
  nextRound();
}

function nextRound() {
  playerSequence = [];
  const nextColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(nextColor);
  playSequence();
}

async function playSequence() {
  for (let color of sequence) {
    await highlight(color);
  }
  statusText.textContent = "Your turn!";
}

function highlight(color) {
  return new Promise((resolve) => {
    buttons[color].classList.add("active");
    setTimeout(() => {
      buttons[color].classList.remove("active");
      setTimeout(resolve, 250);
    }, 500);
  });
}

function updateScore() {
  scoreText.textContent = `Score: ${score}`;
}

function handleClick(color) {
  if (!playing) return;

  playerSequence.push(color);
  highlight(color);

  const index = playerSequence.length - 1;
  if (playerSequence[index] !== sequence[index]) {
    statusText.textContent = "Wrong! Game over!";
    playing = false;
    return;
  }

  if (playerSequence.length === sequence.length) {
     score++;
      updateScore();
    statusText.textContent = "Good! Next round...";
    setTimeout(nextRound, 1000);
  }
}

