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

// Prevent user from modifying the data
Object.freeze(playerInfo); // Freeze the object to prevent changes

// Share button functionality
document.getElementById('shareButton').addEventListener('click', () => {
  const shareMessage = `Check out my Tic Tac Toe results!\nName: ${playerInfo.name}\nWins: ${playerInfo.wins}\nLosses: ${playerInfo.losses}\nTime Played: ${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s`;

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
