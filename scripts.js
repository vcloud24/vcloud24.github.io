let currentSlide = 0;

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');

    if (currentSlide === 0) {
        document.querySelector('.welcome').textContent = 'Welcome | Sawubona | Bienvenue | Loop';
    }
}

function chooseLanguage(lang) {
    const creditsText = {
        en: "Made using GitHub, ChatGPT, and Notepad++",
        zu: "Kwenziwe kusetshenziswa iGitHub, iChatGPT, neNotepad++",
        fr: "Créé avec GitHub, ChatGPT et Notepad++"
    };
    document.getElementById('creditsText').textContent = creditsText[lang];
    nextSlide();
}

function displayInfo() {
    document.getElementById('dateTime').textContent = new Date().toLocaleString();
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('country').textContent = `Country: ${data.country_name}`;
            document.getElementById('ipAddress').textContent = `IP Address: ${data.ip}`;
        });
}

setInterval(nextSlide, 5000);

document.addEventListener("DOMContentLoaded", () => {
    displayInfo();
    setInterval(() => {
        document.getElementById('timeDisplay').textContent = new Date().toLocaleTimeString();
    }, 1000);
});
