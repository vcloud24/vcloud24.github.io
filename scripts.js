// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const loginScreen = document.getElementById('loginScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const usernameDisplay = document.getElementById('usernameDisplay');
const playerScoreDisplay = document.getElementById('playerScore');
const botScoreDisplay = document.getElementById('botScore');
const timerDisplay = document.getElementById('timer');
const resultsText = document.getElementById('resultsText');
const playAgainButton = document.getElementById('playAgain');
const shareScoreButton = document.getElementById('shareScore');
const premiumGamesButton = document.getElementById('premiumGames');

// Game Variables
let playerScore = 0;
let botScore = 0;
let time = 0;
let timerInterval;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

// Show Loading Screen First
setTimeout(() => {
  loadingScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
}, 3000);

// Login Functionality
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  localStorage.setItem('username', username);
  startGame();
});

document.getElementById('guestLogin').addEventListener('click', () => {
  localStorage.setItem('username', 'Guest');
  startGame();
});

function startGame() {
  loginScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  usernameDisplay.textContent = localStorage.getItem('username');
  startTimer();
  resetBoard();
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// Reset Board
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
  });
}

// Tic Tac Toe Logic
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] === '') {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
      endGame(currentPlayer === 'X' ? 'Player' : 'Bot');
      return;
    }
    if (board.every(cell => cell !== '')) {
      endGame('Draw');
      return;
    }
    currentPlayer = 'O'; // Switch to bot's turn
    botMove();
  }
}

// Minimax Algorithm
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1, // Player wins
    O: 1,  // Bot wins
    draw: 0
  };

  // Check for a winner
  const winner = checkWin();
  if (winner !== null) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O'; // Bot's move
        const score = minimax(board, depth + 1, false);
        board[i] = ''; // Undo move
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X'; // Player's move
        const score = minimax(board, depth + 1, true);
        board[i] = ''; // Undo move
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Bot's Move (Unbeatable)
function botMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O'; // Try this move
      const score = minimax(board, 0, false);
      board[i] = ''; // Undo move
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  // Make the best move
  board[bestMove] = 'O';
  document.querySelector(`.cell[data-index="${bestMove}"]`).textContent = 'O';

  // Check if the bot wins
  if (checkWin()) {
    endGame('Bot');
  }
}

// Check for a Winner
function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      return board[a]; // Return the winner ('X' or 'O')
    }
  }

  if (board.every(cell => cell !== '')) {
    return 'draw'; // Return 'draw' if the board is full
  }

  return null; // No winner yet
}

// End Game Logic
function endGame(winner) {
  clearInterval(timerInterval);
  if (winner === 'Player') {
    playerScore++;
    playerScoreDisplay.textContent = playerScore;
  } else if (winner === 'Bot') {
    botScore++;
    botScoreDisplay.textContent = botScore;
  }
  resultsText.textContent = `${winner} Wins!`;
  gameScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
}

// Play Again
playAgainButton.addEventListener('click', () => {
  resetBoard();
  resultsScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  startTimer();
});

// Share Encrypted Score
shareScoreButton.addEventListener('click', () => {
  const scoreData = {
    player: localStorage.getItem('username'),
    score: playerScore,
    time: timerDisplay.textContent,
    date: new Date().toLocaleString()
  };
  const encryptedScore = CryptoJS.AES.encrypt(JSON.stringify(scoreData), 'vgames-secret-key').toString();
  const shareLink = `https://vcloud24.github.io/score=id?${encodeURIComponent(encryptedScore)}`;
  alert(`Share this link: ${shareLink}`);
});

// Premium Games Link
premiumGamesButton.addEventListener('click', () => {
  const premiumData = {
    user: localStorage.getItem('username'),
    date: new Date().toLocaleString()
  };
  const encryptedPremium = CryptoJS.AES.encrypt(JSON.stringify(premiumData), 'vgames-secret-key').toString();
  window.location.href = `https://vcloud24.github.io/prem?enc=${encodeURIComponent(encryptedPremium)}`;
});
