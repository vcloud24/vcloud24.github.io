document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;

    if (accounts.includes(username)) {
        window.location.href = "home-page.html";
    } else {
        document.getElementById("errorMessage").textContent = "Username not found. Try again or create an account.";
    }
});

document.getElementById("createAccountBtn").addEventListener("click", function () {
    const username = prompt("Enter a new username:");
    const accountStatus = addAccount(username);

    if (accountStatus === "Username is taken") {
        alert(accountStatus);
    } else {
        addIPAddress("123.456.78.90"); // Replace with actual IP retrieval
        alert("Account created! You can now log in.");
    }
});
