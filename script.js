const playerForm = document.getElementById('playerForm');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const gameBoard = document.getElementById('game');
const restartButton = document.getElementById('restart');
const winnerMessage = document.getElementById('winnerMessage');
const cells = document.querySelectorAll('[data-cell]');

let player1Name = '';
let player2Name = '';
let isXTurn = true;

playerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  player1Name = player1Input.value;
  player2Name = player2Input.value;

  playerForm.classList.add('d-none');
  gameBoard.classList.remove('d-none');
  restartButton.classList.remove('d-none');
});

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  winnerMessage.textContent = '';
  isXTurn = true;
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return cells[a].textContent;
    }
  }
  return null;
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent || winnerMessage.textContent) return;

    cell.textContent = isXTurn ? 'X' : 'O';
    cell.classList.add(isXTurn ? 'x' : 'o');
    const winner = checkWin();
    if (winner) {
      winnerMessage.textContent = `${winner === 'X' ? player1Name : player2Name} venceu!`;
    } else if (Array.from(cells).every(cell => cell.textContent)) {
      winnerMessage.textContent = 'Empate!';
    }
    isXTurn = !isXTurn;
  });
});

restartButton.addEventListener('click', () => {
  restartGame();
  playerForm.classList.remove('d-none');
  gameBoard.classList.add('d-none');
  restartButton.classList.add('d-none');
});
