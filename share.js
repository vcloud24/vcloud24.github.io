// Decrypt data from URL
const urlParams = new URLSearchParams(window.location.search);
const encryptedData = urlParams.get('info');

if (!encryptedData) {
  alert('No data found in the URL.');
  window.location.href = 'https://vcloud24.github.io'; // Redirect to home if no data
}

// Decrypt the data (AES encryption)
const secretKey = 'secret-key'; // Must match the key used for encryption
const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey);
const playerInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// Display player info
document.getElementById('name').textContent = playerInfo.name;
document.getElementById('wins').textContent = playerInfo.wins;
document.getElementById('losses').textContent = playerInfo.losses;
document.getElementById('time').textContent = `${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s`;
document.getElementById('mode').textContent = playerInfo.mode;

// Share button functionality
document.getElementById('shareButton').addEventListener('click', () => {
  const shareMessage = `🎮 Tic Tac Toe Results:\nName: ${playerInfo.name}\nWins: ${playerInfo.wins}\nLosses: ${playerInfo.losses}\nTime Played: ${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s\nMode: ${playerInfo.mode}\n\nCan you beat the bot? Try it here: vcloud24.github.io`;

  // Share to WhatsApp
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  
  // Share to Facebook
  const facebookUrl = `https://www.facebook.com/profile.php?id=61572881767013&message=${encodeURIComponent(shareMessage)}`;

  // Open share options
  const shareOption = prompt('Share to:\n1. WhatsApp\n2. Facebook\nEnter 1 or 2:');
  if (shareOption === '1') {
    window.open(whatsappUrl, '_blank');
  } else if (shareOption === '2') {
    window.open(facebookUrl, '_blank');
  } else {
    alert('Invalid option.');
  }
});

// Disable right-click and Inspect
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
    alert('Inspect is disabled.');
  }
});
