const keys = {
  ArrowUp: {
    move: () => playerPosition.y++,
    condition: () => playerPosition.y < 3,
    score: 20,
  },
  ArrowLeft: {
    move: () => playerPosition.x--,
    condition: () => playerPosition.x > 0,
    score: 50,
  },
  ArrowDown: {
    move: () => playerPosition.y--,
    condition: () => playerPosition.y > 0,
    score: 90,
  },
  ArrowRight: {
    move: () => playerPosition.x++,
    condition: () => playerPosition.x < 3,
    score: 70,
  },
};

const stepbackPenality = 25;
const distance = 50;
let playerLocationHistory = [];
const playerDiv = document.getElementById("player");
const playerPosition = {
  y: 0,
  x: 0,
};
const initialPlayerPosition = playerPositionFormatted();
let playerIsMoving = false;
let playerScore = 0;
movePlayerDiv(playerPosition);
savePlayerLocationHistory();

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  e.preventDefault();
  if (e.key in keys) {
    handleArrowKey(e.key);
  }
}

function handleArrowKey(key) {
  if (!canPlayerMove(key)) {
    return;
  }
  changePlayerPosition(key);
  movePlayerDiv(playerPosition);
  preventPlayerMoveThenAllowAfterDelay(500);
  handlePlayerScore(key);
  if (playerPositionFormatted() == initialPlayerPosition) {
    resetPlayerScoreAndLocationHistory();
  }
  console.log("playerScore", playerScore);
  savePlayerLocationHistory();
}

function canPlayerMove(key) {
  if (playerIsMoving) {
    return false;
  }
  if (keys[key].condition === false) {
    return false;
  }
  return true;
}

function changePlayerPosition(key) {
  keys[key].move();
}

function preventPlayerMoveThenAllowAfterDelay(delay) {
  playerIsMoving = true;
  setTimeout(() => {
    playerIsMoving = false;
  }, delay);
}

function handlePlayerScore(key) {
  if (playerHasStepBack()) {
    playerScore -= stepbackPenality;
  }
  playerScore += keys[key].score;
}

function resetPlayerScoreAndLocationHistory() {
  playerScore = 0;
  playerLocationHistory = [];
}

function playerHasStepBack() {
  return playerLocationHistory.includes(playerPositionFormatted());
}

function movePlayerDiv({ x, y }) {
  playerDiv.style.bottom = y * distance + "px";
  playerDiv.style.left = x * distance + "px";
  console.log("x", x, "y", y);
}

function savePlayerLocationHistory() {
  playerLocationHistory.push(playerPositionFormatted());
}

function playerPositionFormatted() {
  return `${playerPosition.x},${playerPosition.y}`;
}
