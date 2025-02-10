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
document.getElementById('timeDate').textContent = playerInfo.timeDate;

// Custom Modal
const customModal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');
const modalButton = document.getElementById('modalButton');

function showModal(message) {
  modalMessage.textContent = message;
  customModal.style.display = 'block';
}

modalButton.addEventListener('click', () => {
  customModal.style.display = 'none';
});

// Copy Shareable Link
document.getElementById('copyLinkButton').addEventListener('click', () => {
  const shareableLink = window.location.href; // Current URL
  navigator.clipboard.writeText(shareableLink).then(() => {
    showModal('Link copied to clipboard!');
  });
});

// Share on Facebook
document.getElementById('facebookButton').addEventListener('click', () => {
  const shareMessage = `🎮 Tic Tac Toe Results:\nName: ${playerInfo.name}\nWins: ${playerInfo.wins}\nLosses: ${playerInfo.losses}\nTime Played: ${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s\nDate & Time: ${playerInfo.timeDate}\n\nCan you beat the bot? Try it here: vcloud24.github.io`;
  const facebookUrl = `https://www.facebook.com/profile.php?id=61572881767013&message=${encodeURIComponent(shareMessage)}`;
  window.open(facebookUrl, '_blank');
});

// Share on WhatsApp
document.getElementById('whatsappButton').addEventListener('click', () => {
  const shareMessage = `🎮 Tic Tac Toe Results:\nName: ${playerInfo.name}\nWins: ${playerInfo.wins}\nLosses: ${playerInfo.losses}\nTime Played: ${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s\nDate & Time: ${playerInfo.timeDate}\n\nCan you beat the bot? Try it here: vcloud24.github.io`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  window.open(whatsappUrl, '_blank');
});

// Share on Twitter
document.getElementById('twitterButton').addEventListener('click', () => {
  const shareMessage = `🎮 Tic Tac Toe Results:\nName: ${playerInfo.name}\nWins: ${playerInfo.wins}\nLosses: ${playerInfo.losses}\nTime Played: ${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s\nDate & Time: ${playerInfo.timeDate}\n\nCan you beat the bot? Try it here: vcloud24.github.io`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
  window.open(twitterUrl, '_blank');
});

// Share on LinkedIn
document.getElementById('linkedinButton').addEventListener('click', () => {
  const shareMessage = `🎮 Tic Tac Toe Results:\nName: ${playerInfo.name}\nWins: ${playerInfo.wins}\nLosses: ${playerInfo.losses}\nTime Played: ${Math.floor(playerInfo.time / 60)}m ${playerInfo.time % 60}s\nDate & Time: ${playerInfo.timeDate}\n\nCan you beat the bot? Try it here: vcloud24.github.io`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://vcloud24.github.io')}&summary=${encodeURIComponent(shareMessage)}`;
  window.open(linkedinUrl, '_blank');
});

// Send Feedback
document.getElementById('feedbackButton').addEventListener('click', () => {
  window.location.href = `mailto:vilakazigames@gmail.com?subject=Tic%20Tac%20Toe%20Feedback&body=Your%20feedback%20here...`;
});

// Disable right-click and Inspect
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
    alert('Inspect is disabled.');
  }
});
