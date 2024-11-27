document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    // List of links with additional details for previews
    const links = [
        { name: "VGAMES Home", url: "https://vcloud24.github.io/", preview: "The central hub for VGAMES." },
        { name: "Ludo Game", url: "https://vcloud24.github.io/ludo.html/", preview: "Play the classic Ludo game online." },
        { name: "Tic Tac Toe", url: "https://vcloud24.github.io/TIC-TAC-TOE.html/", preview: "Enjoy a fun game of Tic Tac Toe." },
        { name: "Trivia Game (PC)", url: "https://vcloud24.github.io/game3.html/", note: "Trivia only for PC", preview: "Test your knowledge in a PC-optimized trivia game." },
        { name: "Trivia Game (Mobile)", url: "https://vcloud24.github.io/zax.html", note: "Trivia for mobile devices", preview: "Mobile-friendly trivia experience." },
        { name: "Game 4", url: "https://vcloud24.github.io/game4.html/", preview: "Discover the exciting Game 4." },
        { name: "Admin Bot 2", url: "https://vcloud24.github.io/bot2.html", restricted: true, preview: "Restricted bot access." },
        { name: "Admin Bot", url: "https://vcloud24.github.io/bot.html", restricted: true, preview: "Admin bot management tool." },
        { name: "My New Site", url: "https://vcloud24.github.io/mynewsite", preview: "Explore the new site layout." },
        { name: "VGAMES 2", url: "https://vuyani1.github.io/", preview: "Experience VGAMES version 2." },
        { name: "History Quiz", url: "https://vgames1.github.io/aquiz.html", preview: "Challenge yourself with history trivia." },
        { name: "Maths Quiz", url: "https://vgames1.github.io/ball.html", preview: "Solve fun math problems." },
        { name: "General Trivia", url: "https://vgames1.github.io/atrivia.html", preview: "Test your general knowledge." },
        { name: "Unscramble Game", url: "https://vgames1.github.io/scram.html", preview: "Unscramble words to win." },
        { name: "AI Feature", url: "https://vgames1.github.io/vai.html", preview: "Explore AI-powered features." },
        { name: "Adventure Game", url: "https://vgames1.github.io/adventure.html", note: "Off limits until February 2025", preview: "An epic adventure game (available February 2025)." },
        { name: "HTML File Previewer", url: "https://vcloud24.github.io/lo", preview: "Preview and test HTML files." }
    ];

    // Autocomplete functionality
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.toLowerCase();
        const suggestions = links
            .filter(link => link.name.toLowerCase().includes(searchQuery))
            .map(link => link.name);

        // Clear previous suggestions
        const datalist = document.getElementById('suggestions');
        datalist.innerHTML = "";

        suggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });
    });

    // Search function
    const performSearch = () => {
        const searchQuery = searchInput.value.toLowerCase();
        const results = links.filter(link => link.name.toLowerCase().includes(searchQuery));

        // Display results in a styled popup
        const popup = window.open("", "Search Results", "width=600,height=700");
        popup.document.write(`
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #4caf50, #f44336); color: #fff; }
                h1 { text-align: center; margin-bottom: 20px; }
                a { color: #ffeb3b; text-decoration: none; font-weight: bold; }
                p { margin: 10px 0; }
            </style>
            <h1>Search Results</h1>
        `);

        if (results.length > 0) {
            results.forEach(result => {
                const status = result.restricted ? "<strong>Restricted Access</strong>" :
                              result.note ? `<em>${result.note}</em>` : "Available";
                popup.document.write(`
                    <p>
                        <a href="${result.url}" target="_blank">${result.name}</a><br>
                        ${result.preview}<br>
                        Status: ${status}
                    </p>
                `);
            });
        } else {
            popup.document.write("<p>No results found. Try another search.</p>");
        }
    };

    // Trigger search on button click or Enter key press
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter") performSearch();
    });
});
