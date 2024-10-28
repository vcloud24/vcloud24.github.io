document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (accounts[username] && accounts[username].password === password) {
        window.location.href = "home-page.html";
    } else {
        document.getElementById("errorMessage").textContent = "Invalid username or password.";
    }
});

document.getElementById("createAccountBtn").addEventListener("click", function () {
    const username = prompt("Enter a new username:");
    const password = prompt("Enter a new password:");
    const birthYear = parseInt(prompt("Enter your birth year:"));
    const userIP = "123.456.78.90"; // Replace with actual IP

    const accountStatus = addAccount(username, password, birthYear, userIP);

    if (accountStatus !== "Account created") {
        alert(accountStatus);
    } else {
        addIPAddress(userIP);
        alert("Account created! You can now log in.");
    }
});
