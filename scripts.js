let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Function to show the next slide
function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to first slide
    slides[currentSlide].classList.add('active');
    
    // Check if returning to the first slide to add "Loop"
    if (currentSlide === 0) {
        document.querySelector('.welcome-text').textContent = 'Welcome | Sawubona | Bienvenue | Loop';
    }
}

// Function to choose language (removed Zulu and French)
function chooseLanguage(language) {
    const creditsText = {
        en: "Created with GitHub, ChatGPT, and Notepad++"
    };
    document.getElementById('creditsText').textContent = creditsText[language];
    showNextSlide();
}

// Function to display user info
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

// Initialize slides
document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        if (currentSlide === 4) {
            // If we're on slide 5, wait 30 seconds before moving to the next slide
            setTimeout(showNextSlide, 30000); // 30 seconds
        } else {
            showNextSlide(); // Regular transition for other slides
        }
    }, 5000); // 5 seconds per slide, except slide 5
    displayInfo();
    setInterval(() => {
        document.getElementById('timeDisplay').textContent = new Date().toLocaleTimeString();
    }, 1000);
});


<script>
    document.addEventListener('DOMContentLoaded', () => {
        fetch('https://vcloud24.github.io/bot.html')
            .then(() => {
                console.log('Connected to monitoring system.');
            })
            .catch(() => {
                console.error('Failed to connect to monitoring system.');
            });
    });
</script>
<a href="https://vcloud24.github.io/bot.html" target="_blank">Visit Monitoring System</a>
