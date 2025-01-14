// Select DOM elements
const nameInput = document.querySelector('.name'); // Only exists on the registration page
const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');
const alertBox = document.querySelector('.alert-box');
const alertMsg = document.querySelector('.alert');

// Utility function to display alerts
const showAlert = (message) => {
    alertMsg.textContent = message;
    alertBox.style.top = '5%';
    setTimeout(() => {
        alertBox.style.top = '-100%';
    }, 3000);
};

// Utility function to validate fields
const validateFields = (fields) => {
    for (const [fieldName, value] of Object.entries(fields)) {
        if (!value.trim()) {
            showAlert(`${fieldName} is required`);
            return false;
        }
    }

    if (fields.email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(fields.email)) {
            showAlert('Invalid email format');
            return false;
        }
    }

    if (fields.password && fields.password.length < 6) {
        showAlert('Password must be at least 6 characters');
        return false;
    }

    return true;
};

// Registration function
const handleRegister = async () => {
    const username = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateFields({ username, email, password })) return;

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';

        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showAlert(data.message || 'An error occurred');
        }
    } catch (error) {
        showAlert('Something went wrong. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    }
};

// Login function
const handleLogin = async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateFields({ email, password })) return;

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem('token', data.token);
            window.location.href = 'home.html';
        } else {
            showAlert(data.message || 'Login failed');
        }
    } catch (error) {
        showAlert('Something went wrong. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';
    }
};

// Determine which function to call based on the page
if (nameInput) {
    submitBtn.addEventListener('click', handleRegister); // Register page
} else {
    submitBtn.addEventListener('click', handleLogin); // Login page
}
