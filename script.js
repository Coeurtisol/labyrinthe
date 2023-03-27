const keys = {
  ArrowUp: {
    move: () => playerPosition.y < 3 && playerPosition.y++,
    score: 20,
  },
  ArrowLeft: {
    move: () => playerPosition.x > 0 && playerPosition.x--,
    score: 50,
  },
  ArrowDown: {
    move: () => playerPosition.y > 0 && playerPosition.y--,
    score: 90,
  },
  ArrowRight: {
    move: () => playerPosition.x < 3 && playerPosition.x++,
    score: 70,
  },
};

const penality = 25;
let locationHistory = [];
const distance = 50;
const divPlayer = document.querySelector(".player");
const playerPosition = {
  y: 0,
  x: 0,
};
let playerIsMoving = false;
let playerScore = 0;
movePlayer(playerPosition);
saveLocationHistory();

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  e.preventDefault();
  const { key } = e;
  if (key in keys) {
    handleArrowKey(key);
  }
}

function handleArrowKey(key) {
  if (!checkPlayerCanMove(key)) {
    return;
  }

  movePlayer(playerPosition);
  handlePlayerIsMoving();

  handlePlayerScore(key);

  saveLocationHistory();
}

function checkPlayerCanMove(key) {
  if (playerIsMoving === true) {
    return false;
  }
  if (keys[key].move() === false) {
    return false;
  }
  return true;
}

function handlePlayerIsMoving() {
  playerIsMoving = true;
  setTimeout(() => {
    playerIsMoving = false;
  }, 500);
}

function handlePlayerScore(key) {
  if (locationHistory.includes(playerPositionFormatted())) {
    playerScore -= penality;
  }
  playerScore += keys[key].score;
  if (playerPositionFormatted() == "0,0") {
    playerScore = 0;
    locationHistory = [];
  }
  console.log("playerScore", playerScore);
}

function movePlayer({ x, y }) {
  divPlayer.style.bottom = y * distance + "px";
  divPlayer.style.left = x * distance + "px";
  console.log("x", x, "y", y);
}

function saveLocationHistory() {
  locationHistory.push(playerPositionFormatted());
}

function playerPositionFormatted() {
  return `${playerPosition.x},${playerPosition.y}`;
}
