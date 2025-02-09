const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const timeDisplay = document.getElementById('time');
const bootScreen = document.getElementById('bootScreen');
const customModal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');
const modalInputName = document.getElementById('modalInputName');
const modalInputAge = document.getElementById('modalInputAge');
const modalInputGender = document.getElementById('modalInputGender');
const modalButton = document.getElementById('modalButton');

let wins = 0;
let losses = 0;
let time = 0;
let playerTurn = true;
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerName = '';
let playerAge = '';
let playerGender = '';

// Show custom modal
function showModal(message, callback) {
  modalMessage.textContent = message;
  modalInputName.style.display = 'block';
  modalInputAge.style.display = 'block';
  modalInputGender.style.display = 'block';
  modalButton.onclick = () => {
    const nameValue = modalInputName.value.trim();
    const ageValue = modalInputAge.value.trim();
    const genderValue = modalInputGender.value.trim();
    if (nameValue && ageValue && genderValue) {
      customModal.style.display = 'none';
      callback(nameValue, ageValue, genderValue);
    }
  };
  customModal.style.display = 'block';
}

// Boot-up screen
setTimeout(() => {
  bootScreen.style.display = 'none';
  showModal('Enter your details to start the game:', (name, age, gender) => {
    playerName = name;
    playerAge = age;
    playerGender = gender;
    customModal.style.display = 'none';
  });
}, 2000); // Simulate 2-second boot-up

// Minimax Algorithm
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1, // Player wins
    O: 1,  // AI wins
    tie: 0 // Tie
  };

  const winner = checkWinner();
  if (winner !== null) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O'; // AI's move
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X'; // Player's move
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// AI Move
function aiMove() {
  let bestScore = -Infinity;
  let move;

  // Check for immediate winning move
  for (let i = 0; i < 9; i++) {
    if (boardState[i] === '') {
      boardState[i] = 'O';
      if (checkWinner() === 'O') {
        cells[i].textContent = 'O';
        losses++;
        lossesDisplay.textContent = losses;
        setTimeout(resetGame, 1000);
        return;
      }
      boardState[i] = '';
    }
  }

  // Check for player's winning move and block it
  for (let i = 0; i < 9; i++) {
    if (boardState[i] === '') {
      boardState[i] = 'X';
      if (checkWinner() === 'X') {
        boardState[i] = 'O'; // Block the player
        cells[i].textContent = 'O';
        playerTurn = true;
        return;
      }
      boardState[i] = '';
    }
  }

  // Use Minimax to find the best move
  for (let i = 0; i < 9; i++) {
    if (boardState[i] === '') {
      boardState[i] = 'O';
      let score = minimax(boardState, 0, false);
      boardState[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  if (move !== undefined) {
    boardState[move] = 'O';
    cells[move].textContent = 'O';
    playerTurn = true;
    checkWinner();
  }
}

// Check Winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }

  if (!boardState.includes('')) return 'tie';
  return null;
}

// Handle Cell Click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (playerTurn && cell.textContent === '') {
      const index = cell.getAttribute('data-index');
      boardState[index] = 'X';
      cell.textContent = 'X';
      playerTurn = false;

      const winner = checkWinner();
      if (winner === 'X') {
        wins++;
        winsDisplay.textContent = wins;
        resetGame();
      } else if (winner === 'tie') {
        resetGame();
      } else {
        setTimeout(aiMove, 500);
      }
    }
  });
});

// Reset Game
function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  playerTurn = true;

  if (losses === 2) {
    const now = new Date();
    const timeDate = now.toLocaleString();
    const data = JSON.stringify({
      name: playerName,
      age: playerAge,
      gender: playerGender,
      wins,
      losses,
      time,
      timeDate
    });
    const encryptedData = CryptoJS.AES.encrypt(data, 'secret-key').toString();
    window.location.href = `https://vcloud24.github.io/share?info=${encodeURIComponent(encryptedData)}`;
  }
}

// Timer
setInterval(() => {
  time++;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}, 1000);
