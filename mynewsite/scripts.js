document.getElementById("proceedBtn").addEventListener("click", function () {
    const userIP = "123.456.78.90"; // Placeholder IP, replace with actual IP retrieval logic

    if (ipAddresses.includes(userIP)) {
        window.location.href = "home-page.html";
    } else {
        window.location.href = "log-in.html";
    }
});
