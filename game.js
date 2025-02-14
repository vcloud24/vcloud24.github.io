let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let time = 0;
let score = 0;
let timerInterval;

// Start game
function startGame() {
    gameActive = true;
    document.getElementById("gameBoard").style.display = "grid";
    resetBoard();
    startTimer();
    setInterval(showAd, 120000); // Show ad every 2 minutes
}

// Reset board
function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    renderBoard();
}

// Render board
function renderBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Player move
function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        renderBoard();
        checkWin();
        currentPlayer = "O";
        if (gameActive) {
            setTimeout(aiMove, 500); // AI makes a move
        }
    }
}

// AI move (unbeatable)
function aiMove() {
    const bestMove = getBestMove();
    board[bestMove] = "O";
    renderBoard();
    checkWin();
    currentPlayer = "X";
}

// Minimax algorithm for AI
function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        draw: 0
    };

    const result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check for winner
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            alert(`Player ${board[a]} wins!`);
            updateScore();
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        alert("It's a draw!");
    }
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("time").textContent = formatTime(time);
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Ads
function showAd() {
    const adText = "Play VCLOUD24, VGAMES1, and VUYANI1 at vcloud24.github.io!";
    alert(adText);
}

// Event listeners
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => makeMove(parseInt(cell.getAttribute("data-index"))));
});
