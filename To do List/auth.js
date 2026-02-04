/* ============================================
   AUTHENTICATION LOGIC (auth.js)
   ============================================ */

// Fixed credentials for demo
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = '123';
const LOGIN_STORAGE_KEY = 'taskManagerLogin';

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const loginBtn = document.querySelector('.login-btn');

    // Check if user is already logged in
    checkExistingLogin();

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Clear error message on input
    usernameInput.addEventListener('input', function() {
        errorMessage.classList.remove('show');
        document.querySelector('.login-card').classList.remove('shake');
    });

    passwordInput.addEventListener('input', function() {
        errorMessage.classList.remove('show');
        document.querySelector('.login-card').classList.remove('shake');
    });
});

/**
 * Check if user is already logged in (redirect if true)
 */
function checkExistingLogin() {
    const loginData = getLoginData();
    if (loginData && loginData.isLoggedIn) {
        window.location.href = 'index.html';
    }
}

/**
 * Handle login form submission
 */
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginCard = document.querySelector('.login-card');

    // Validate credentials
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Credentials are correct
        setLoginData({
            isLoggedIn: true,
            username: username,
            loginTime: new Date().toISOString()
        });

        // Clear form
        document.getElementById('loginForm').reset();
        errorMessage.classList.remove('show');
        loginCard.classList.remove('shake');

        // Redirect to task manager
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    } else {
        // Credentials are incorrect
        errorMessage.textContent = 'Enter correct credentials';
        errorMessage.classList.add('show');
        loginCard.classList.add('shake');

        // Clear password field
        document.getElementById('password').value = '';
    }
}

/**
 * Store login data in localStorage
 * @param {Object} data - Login data to store
 */
function setLoginData(data) {
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Retrieve login data from localStorage
 * @returns {Object|null} Login data or null if not found
 */
function getLoginData() {
    const data = localStorage.getItem(LOGIN_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
function isLoggedIn() {
    const loginData = getLoginData();
    return loginData && loginData.isLoggedIn === true;
}

/**
 * Logout user
 */
function logoutUser() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    window.location.href = 'login.html';
}
