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

// Generate a unique match ID
const matchId = Math.random().toString(36).substring(2, 15);
const matchRef = database.ref(`matches/${matchId}`);

// Set initial game state
const initialGameState = {
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  status: 'waiting'
};
matchRef.set(initialGameState);

// Update the URL with the match ID
window.history.replaceState({}, '', `?match=${matchId}`);

// Display the match link
const copyLinkButton = document.getElementById('copyLinkButton');
copyLinkButton.addEventListener('click', () => {
  const matchLink = `${window.location.origin}/rivaljoin?joined=${matchId}`;
  navigator.clipboard.writeText(matchLink).then(() => {
    showModal('Match link copied to clipboard!');
  });
});

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
      if (gameState.board[index] === '' && gameState.currentPlayer === 'X') {
        const newBoard = [...gameState.board];
        newBoard[index] = 'X';
        matchRef.update({
          board: newBoard,
          currentPlayer: 'O'
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
    statusElement.textContent = 'Waiting for player to join...';
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
