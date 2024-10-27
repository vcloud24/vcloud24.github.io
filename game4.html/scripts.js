const cardColors = ['#ff69b4', '#00bfff', '#ffd700', '#ff4500', '#32cd32', '#6a5acd', '#ff1493', '#1e90ff'];
let firstCard = null, secondCard = null, score = 0, strikes = 0;

document.addEventListener('DOMContentLoaded', () => {
    setupGame();
    updateScore();
    updateStrikes();
});

function setupGame() {
    const shuffledColors = [...cardColors, ...cardColors].sort(() => Math.random() - 0.5);
    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = '';

    shuffledColors.forEach(color => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<div class="card-inner">
            <div class="card-front" style="background-color: ${color};"></div>
            <div class="card-back"></div>
        </div>`;
        card.addEventListener('click', () => flipCard(card, color));
        cardGrid.appendChild(card);
    });
}

function flipCard(card, color) {
    if (firstCard && secondCard) return;
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = { card, color };
    } else if (!secondCard && card !== firstCard.card) {
        secondCard = { card, color };
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.color === secondCard.color) {
        score++;
        resetCards();
    } else {
        strikes++;
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
    updateScore();
    updateStrikes();
    if (strikes >= 3) endGame();
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateStrikes() {
    document.getElementById('strikes').textContent = strikes;
}

function endGame() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function shareScore() {
    const message = `I GOT A SCORE OF ${score} IN VGAMES MEMORY GAME AT VCLOUD24.GITHUB.IO/GAME3.HTML. CAN YOU BEAT IT?`;
    alert(message);
}
