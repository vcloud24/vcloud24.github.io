let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    if (currentSlide === 0) {
        document.querySelector('.welcome').textContent = 'Welcome | Sawubona | Bienvenue | Loop';
    }
}

function chooseLanguage(language) {
    const creditsText = {
        en: "Created with GitHub, ChatGPT, and Notepad++",
        zu: "Kwenziwe kusetshenziswa iGitHub, iChatGPT, neNotepad++",
        fr: "Créé avec GitHub, ChatGPT et Notepad++"
    };
    document.getElementById('creditsText').textContent = creditsText[language];
    showNextSlide();
}

function displayInfo() {
    const date = new Date();
    document.getElementById('dateTime').textContent = date.toLocaleString();
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('country').textContent = `Country: ${data.country_name}`;
            document.getElementById('ipAddress').textContent = `IP Address: ${data.ip}`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    setInterval(showNextSlide, 5000); // 5 seconds per slide
    displayInfo();
    setInterval(() => {
        document.getElementById('timeDisplay').textContent = new Date().toLocaleTimeString();
    }, 1000);
});
