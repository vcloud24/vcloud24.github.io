// Encrypted accounts (username: encryptedPassword)
const accounts = {
    "vuy25@vc.git": "U2FsdGVkX19zZWNyZXRfa2V5X2hlcmU=imunavailable", // Encrypted password for [imunavailable]
    "phili123@vc.git": "U2FsdGVkX19zZWNyZXRfa2V5X2hlcmU=iamtheghost", // Encrypted password for [iamtheghost]
    "jimmy2@vc.git": "U2FsdGVkX19zZWNyZXRfa2V5X2hlcmU=stronger1010" // Encrypted password for [stronger1010]
};

// Encryption functions
function encrypt(data) {
    return CryptoJS.AES.encrypt(data, "hardcore-key").toString();
}

function decrypt(data) {
    const bytes = CryptoJS.AES.decrypt(data, "hardcore-key");
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Login logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (accounts[username] && decrypt(accounts[username]) === password) {
        const code = prompt("Enter five-digit code:");
        if (code === "7349") {
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("gamePage").style.display = "block";
        } else if (code === "9898") {
            alert("Resetting web...");
            window.location.reload();
        } else {
            alert("Invalid code. Try again.");
        }
    } else {
        alert("Invalid username or password.");
    }
});

// Guest mode
function guestMode() {
    const code = prompt("Enter guest code:");
    if (code === "0000") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("gamePage").style.display = "block";
    } else {
        alert("Invalid code. Try again.");
    }
}
