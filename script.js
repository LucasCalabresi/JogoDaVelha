const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart');
const winnerMessage = document.getElementById('winnerMessage');

let currentPlayer = 'X';

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
};

const isDraw = () => {
  return [...cells].every(cell => cell.textContent !== '');
};

const handleClick = (e) => {
  const cell = e.target;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    winnerMessage.textContent = `Jogador ${currentPlayer} venceu!`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
  } else if (isDraw()) {
    winnerMessage.textContent = 'Empate!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const startGame = () => {
  currentPlayer = 'X';
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
};

restartButton.addEventListener('click', startGame);

startGame();
