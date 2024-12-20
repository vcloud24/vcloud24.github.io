document.addEventListener("DOMContentLoaded", function () {
    // Countdown Timer
    const countdownElement = document.getElementById("countdown");
    const endDate = new Date("January 20, 2025 18:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = endDate - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownElement.textContent = "Countdown Ended";
            document.getElementById("redirect-msg").textContent = "Go to my main channel https://youtube.com/@VUYANI-SIYANDA-VILAKAZI to watch the video!";
        }
    }

    setInterval(updateCountdown, 1000);

    // Speech Box
    const speechBox = document.getElementById("speech-box");
    const speechTimeline = [
        { time: 0, message: "Yo, what’s up?" },
        { time: 3, message: "I’m Vilakazi Vuyani, and I’m about to take on a crazy challenge:" },
        { time: 9, message: "Can ChatGPT AI actually help me get fit, lose weight, and see results in just 30 days—WITHOUT spending any cash?" },
        { time: 15, message: "The game plan? I’m sticking to the basics—push-ups, planks, and other simple workouts." },
        { time: 20, message: "It ain’t gonna be easy, but I’m ready to give it my all!" },
        { time: 25, message: "Starting tomorrow, I’ll be posting proof every single day." },
        { time: 30, message: "Wanna follow the journey? Hit up vcloud24/training to check out my daily training pics." },
        { time: 37, message: "Or slide over to my Instagram @vuyaniphila86 for updates on my workouts AND my personal life." },
        { time: 43, message: "Oh, and don’t forget to subscribe and smash that like button!" },
        { time: 49, message: "Every like will keep me hyped and could make this my forever routine." },
        { time: 55, message: "Let’s do this thing—wish me luck and let’s make it happen!" }
    ];

    let speechIndex = 0;
    const speechStart = new Date().getTime();

    function updateSpeech() {
        const now = new Date().getTime();
        const elapsed = Math.floor((now - speechStart) / 1000);

        if (speechIndex < speechTimeline.length && elapsed >= speechTimeline[speechIndex].time) {
            speechBox.textContent = speechTimeline[speechIndex].message;
            speechIndex++;
        }
    }

    setInterval(updateSpeech, 500);

    // Gallery
    const imageGrid = document.getElementById("image-grid");
    const imageFolder = "https://vcloud24.github.io/fit/";
    const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];

    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = `${imageFolder}${image}`;
        imgElement.alt = "Fitness Image";
        imageGrid.appendChild(imgElement);
    });

    // Calendar
    const calendar = document.getElementById("calendar");
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    function buildCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        calendar.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            calendar.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement("div");
            dayCell.className = "day";
            dayCell.textContent = day;

            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayCell.classList.add("today");
            }

            calendar.appendChild(dayCell);
        }
    }

    buildCalendar(month, year);
});
