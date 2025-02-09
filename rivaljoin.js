// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  databaseURL: "YOUR_FIREBASE_DATABASE_URL",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get the match ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const matchId = urlParams.get('joined');
const matchRef = database.ref(`matches/${matchId}`);

// Listen for game state changes
matchRef.on('value', (snapshot) => {
  const gameState = snapshot.val();
  if (gameState) {
    updateBoard(gameState.board);
    updateStatus(gameState.status);
  }
});

// Handle cell clicks
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    matchRef.once('value', (snapshot) => {
      const gameState = snapshot.val();
      if (gameState.board[index] === '' && gameState.currentPlayer === 'O') {
        const newBoard = [...gameState.board];
        newBoard[index] = 'O';
        matchRef.update({
          board: newBoard,
          currentPlayer: 'X'
        });
        checkWinner(newBoard);
      }
    });
  });
});

// Update the board
function updateBoard(board) {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Update the status
function updateStatus(status) {
  const statusElement = document.getElementById('status');
  if (status === 'waiting') {
    statusElement.textContent = 'Waiting for host to start...';
  } else if (status === 'playing') {
    statusElement.textContent = 'Game in progress...';
  } else if (status === 'X' || status === 'O') {
    statusElement.textContent = `Player ${status} wins!`;
  } else if (status === 'tie') {
    statusElement.textContent = 'It\'s a tie!';
  }
}

// Check for a winner
function checkWinner(board) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      matchRef.update({ status: board[a] });
      return;
    }
  }

  if (!board.includes('')) {
    matchRef.update({ status: 'tie' });
  }
}

// Custom Modal
const customModal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');
const modalButton = document.getElementById('modalButton');

function showModal(message) {
  modalMessage.textContent = message;
  customModal.style.display = 'block';
}

modalButton.addEventListener('click', () => {
  customModal.style.display = 'none';
});
