let currentQuestionIndex = 0;
let score = 0;
let strikes = 0;
let questions = [];
let timer;
let timeRemaining = 30;

const questionText = document.getElementById('questionText');
const scoreDisplay = document.getElementById('score');
const strikesDisplay = document.getElementById('strikes');
const timeDisplay = document.getElementById('time');
const popup = document.getElementById('popup');
const finalScore = document.getElementById('finalScore');
const popupText = document.getElementById('popupText');

// Fetch random questions from an API
async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    questions = data.results.map((question) => ({
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: question.incorrect_answers,
    }));
    questions.forEach((q) => {
        q.options = [q.correct_answer, ...q.incorrect_answers];
        q.options = shuffleArray(q.options);
    });
    displayQuestion();
}

// Shuffle array helper function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Display the current question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0; // Reset if all questions are answered
    }
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;
    document.querySelectorAll('.options button').forEach((button, index) => {
        button.innerHTML = currentQuestion.options[index];
    });
    startTimer();
}

// Handle answering a question
function answerQuestion(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.options[selectedOption - 1] === currentQuestion.correct_answer) {
        score++;
        scoreDisplay.innerText = score;
        currentQuestionIndex++;
        displayQuestion();
    } else {
        strikes++;
        strikesDisplay.innerText = strikes;
        if (strikes >= 3) {
            endGame();
        } else {
            currentQuestionIndex++;
            displayQuestion();
        }
    }
}

// Timer function
function startTimer() {
    clearInterval(timer);
    timeRemaining = 30;
    timeDisplay.innerText = timeRemaining;

    timer = setInterval(() => {
        timeRemaining--;
        timeDisplay.innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            strikes++;
            strikesDisplay.innerText = strikes;
            if (strikes >= 3) {
                endGame();
            } else {
                currentQuestionIndex++;
                displayQuestion();
            }
        }
    }, 1000);
}

// End game function
function endGame() {
    clearInterval(timer);
    finalScore.innerText = score;
    popup.style.display = 'flex';
}

// Close the popup
function closePopup() {
    popup.style.display = 'none';
    currentQuestionIndex = 0; // Reset for the next round
    score = 0;
    strikes = 0;
    scoreDisplay.innerText = score;
    strikesDisplay.innerText = strikes;
    fetchQuestions(); // Fetch new questions for next round
}

// Share score function
function shareScore() {
    const shareMessage = `I GOT A SCORE OF ${score} IN VGAMES TRIVIA AT VCLOUD24.GITHUB.IO/GAME3.HTML`;
    alert(shareMessage); // You can implement a better share functionality if needed
}

// Start the game
fetchQuestions();

