document.getElementById("enterButton").addEventListener("click", () => {
  document.getElementById("landingPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const account = validateLogin(username, password);
  if (account) {
    const code = prompt("Enter the five-digit code:");
    if (code === account.code) {
      document.getElementById("loginPage").classList.add("hidden");
      document.getElementById("gamePage").classList.remove("hidden");
    } else {
      alert("Invalid code!");
    }
  } else {
    document.getElementById("errorMessage").textContent = "Invalid username or password!";
  }
});

document.getElementById("guestMode").addEventListener("click", () => {
  const code = prompt("Enter the guest code:");
  if (code === "0000") {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");
  } else if (code === "9898") {
    location.reload(); // Reset the web
  } else {
    alert("Invalid guest code!");
  }
});
