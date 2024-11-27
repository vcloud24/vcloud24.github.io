document.getElementById('search-btn').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const links = [
        { name: "VGAMES Home", url: "https://vcloud24.github.io/" },
        { name: "Ludo Game", url: "https://vcloud24.github.io/ludo.html/" },
        { name: "Tic Tac Toe", url: "https://vcloud24.github.io/TIC-TAC-TOE.html/" },
        { name: "Trivia Game (PC)", url: "https://vcloud24.github.io/game3.html/", note: "Trivia only for PC" },
        { name: "Trivia Game (Mobile)", url: "https://vcloud24.github.io/zax.html", note: "Trivia for mobile devices" },
        { name: "Game 4", url: "https://vcloud24.github.io/game4.html/" },
        { name: "Admin Bot 2", url: "https://vcloud24.github.io/bot2.html", restricted: true },
        { name: "Admin Bot", url: "https://vcloud24.github.io/bot.html", restricted: true },
        { name: "My New Site", url: "https://vcloud24.github.io/mynewsite" },
        { name: "VGAMES 2", url: "https://vuyani1.github.io/" },
        { name: "History Quiz", url: "https://vgames1.github.io/aquiz.html" },
        { name: "Maths Quiz", url: "https://vgames1.github.io/ball.html" },
        { name: "General Trivia", url: "https://vgames1.github.io/atrivia.html" },
        { name: "Unscramble Game", url: "https://vgames1.github.io/scram.html" },
        { name: "AI Feature", url: "https://vgames1.github.io/vai.html" },
        { name: "Adventure Game", url: "https://vgames1.github.io/adventure.html", note: "Off limits until February 2025" },
        { name: "HTML File Previewer", url: "https://vcloud24.github.io/lo" }
    ];

    const results = links.filter(link => link.name.toLowerCase().includes(searchQuery));

    if (results.length > 0) {
        let popup = window.open("", "Search Results", "width=500,height=600");
        popup.document.write("<h1>Search Results</h1>");
        results.forEach(result => {
            if (result.name === "Adventure Game") {
                popup.document.write(
                    `<p>${result.name} - <em>${result.note}</em> <strong>Unavailable</strong></p>`
                );
            } else if (result.restricted) {
                popup.document.write(
                    `<p>${result.name} - <strong>Restricted Access</strong></p>`
                );
            } else {
                popup.document.write(
                    `<p><a href="${result.url}" target="_blank">${result.name}</a> ${
                        result.note ? ` - <em>${result.note}</em>` : ""
                    }</p>`
                );
            }
        });
    } else {
        alert("No results found.");
    }
});
