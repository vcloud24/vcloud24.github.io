// Encrypted accounts (for demonstration purposes)
const accounts = [
  { username: "user1", password: "5f4dcc3b5aa765d61d8327deb882cf99", code: "7349" }, 
  { username: "user2", password: "482c811da5d5b4bc6d497ffa98491e38", code: "7349" }, 
];

function encrypt(input) {
  // Simple MD5 hash for demonstration (use a secure hashing algorithm in production)
  return CryptoJS.MD5(input).toString();
}

function validateLogin(username, password) {
  const encryptedPassword = encrypt(password);
  return accounts.find(acc => acc.username === username && acc.password === encryptedPassword);
}
