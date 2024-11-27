document.getElementById('search-btn').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const links = [
        { name: "VGAMES Home", url: "https://vcloud24.github.io/", preview: "https://via.placeholder.com/150/FF0000/FFFFFF?text=VGAMES" },
        { name: "Ludo Game", url: "https://vcloud24.github.io/ludo.html/", preview: "https://via.placeholder.com/150/33CC33/FFFFFF?text=Ludo+Game" },
        { name: "Tic Tac Toe", url: "https://vcloud24.github.io/TIC-TAC-TOE.html/", preview: "https://via.placeholder.com/150/FF9900/FFFFFF?text=Tic+Tac+Toe" },
        { name: "Trivia Game (PC)", url: "https://vcloud24.github.io/game3.html/", note: "Trivia only for PC", preview: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Trivia+PC" },
        { name: "Trivia Game (Mobile)", url: "https://vcloud24.github.io/zax.html", note: "Trivia for mobile", preview: "https://via.placeholder.com/150/FFFF00/000000?text=Trivia+Mobile" },
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
        { name: "Adventure Game", url: "https://vgames1.github.io/adventure.html", note: "Off limits until February 2025", preview: "https://via.placeholder.com/150/CC00CC/FFFFFF?text=Adventure+Game" },
        // Add remaining links...

    ];

    const results = links.filter(link => link.name.toLowerCase().includes(searchQuery));

    let popup = window.open("", "Search Results", "width=600,height=800");
    popup.document.write(`
        <div id="popup-container">
            <h1>Search Results</h1>
    `);

    if (results.length > 0) {
        results.forEach(result => {
            popup.document.write(`
                <div style="margin-bottom: 15px;">
                    <img src="${result.preview}" alt="${result.name} Preview" style="width: 100px; border-radius: 10px;" />
                    <p>
                        <a href="${result.url}" target="_blank">${result.name}</a>
                        ${result.note ? `<em>- ${result.note}</em>` : ""}
                    </p>
                </div>
            `);
        });
    } else {
        popup.document.write(`<p>No results found for your search.</p>`);
    }

    popup.document.write("</div>");
});
