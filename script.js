const board = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const pvpBtn = document.getElementById("pvp");
const pvcBtn = document.getElementById("pvc");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;
let vsComputer = false;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell;
    div.addEventListener("click", () => handleClick(index));
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (isGameOver || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
    return;
  } else if (cells.every(cell => cell)) {
    statusText.textContent = "Draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Turn: ${currentPlayer}`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let available = cells.map((val, idx) => val ? null : idx).filter(v => v !== null);
  let random = available[Math.floor(Math.random() * available.length)];
  handleClick(random);
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];
  return wins.some(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[b] === cells[c]);
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  statusText.textContent = "Turn: X";
  renderBoard();
}

pvpBtn.onclick = () => {
  vsComputer = false;
  resetGame();
};

pvcBtn.onclick = () => {
  vsComputer = true;
  resetGame();
};

resetBtn.onclick = resetGame;

renderBoard();
