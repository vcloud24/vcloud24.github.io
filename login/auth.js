// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWd8eowMTSwfcjvZv8yqVrPYQVtn0SkeM",
  authDomain: "vcloud24-f47a3.firebaseapp.com",
  databaseURL: "https://vcloud24-f47a3-default-rtdb.firebaseio.com",
  projectId: "vcloud24-f47a3",
  storageBucket: "vcloud24-f47a3.appspot.com",
  messagingSenderId: "662896035334",
  appId: "1:662896035334:web:1234567890abcdef12345"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// DOM Elements
const loginForm = document.getElementById('login-form');
const createForm = document.getElementById('create-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const createUsername = document.getElementById('create-username');
const createEmail = document.getElementById('create-email');
const createPassword = document.getElementById('create-password');
const loginButton = document.getElementById('login-button');
const createButton = document.getElementById('create-button');
const switchToCreate = document.getElementById('switch-to-create');
const switchToLogin = document.getElementById('switch-to-login');
const message = document.getElementById('message');

// Switch between Login and Create Account forms
switchToCreate.addEventListener('click', () => {
  loginForm.style.display = 'none';
  createForm.style.display = 'block';
  document.getElementById('title').textContent = 'Create Account';
});

switchToLogin.addEventListener('click', () => {
  createForm.style.display = 'none';
  loginForm.style.display = 'block';
  document.getElementById('title').textContent = 'Login';
});

// Login
loginButton.addEventListener('click', () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  if (!email || !password) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessage('Login successful!', 'success');
      // Redirect to another page or perform other actions
    })
    .catch((error) => {
      showMessage(error.message, 'error');
    });
});

// Create Account
createButton.addEventListener('click', () => {
  const username = createUsername.value;
  const email = createEmail.value;
  const password = createPassword.value;

  if (!username || !email || !password) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  // Check if username already exists
  database.ref('usernames').once('value', (snapshot) => {
    const usernames = snapshot.val() || {};
    if (usernames[username]) {
      showMessage('Username already exists. Please choose another.', 'error');
      return;
    }

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Encrypt username
        const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret-key').toString();

        // Store user info in Firebase
        database.ref('users/' + user.uid).set({
          username: encryptedUsername,
          email: email
        });

        // Store username mapping
        database.ref('usernames/' + username).set(true);

        showMessage('Account created successfully!', 'success');
        // Redirect to another page or perform other actions
      })
      .catch((error) => {
        showMessage(error.message, 'error');
      });
  });
});

// Show messages
function showMessage(text, type) {
  message.textContent = text;
  message.style.color = type === 'error' ? '#ff4444' : '#00ff00';
  setTimeout(() => {
    message.textContent = '';
  }, 3000);
}
