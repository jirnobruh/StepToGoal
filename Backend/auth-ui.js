// Tabs: login/register
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginTabs = document.getElementById('login-tabs');

const btnLogin = document.getElementById('show-login');
const btnRegister = document.getElementById('show-register');

// Tabs: phone/email
const tabPhone = document.getElementById('tab-phone');
const tabEmail = document.getElementById('tab-email');

const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');

// Switch to register
btnRegister.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    loginTabs.classList.add('hidden');
    registerForm.classList.remove('hidden');

    btnRegister.classList.replace('text-gray-400', 'text-gray-800');
    btnLogin.classList.replace('text-gray-800', 'text-gray-400');
});

// Switch to login
btnLogin.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    loginTabs.classList.remove('hidden');

    btnLogin.classList.replace('text-gray-400', 'text-gray-800');
    btnRegister.classList.replace('text-gray-800', 'text-gray-400');
});

// Switch to phone login
tabPhone.addEventListener('click', () => {
    tabPhone.classList.add('tab-active');
    tabPhone.classList.remove('tab-inactive');

    tabEmail.classList.remove('tab-active');
    tabEmail.classList.add('tab-inactive');

    phoneInput.classList.remove('hidden');
    emailInput.classList.add('hidden');
});

// Switch to email login
tabEmail.addEventListener('click', () => {
    tabEmail.classList.add('tab-active');
    tabEmail.classList.remove('tab-inactive');

    tabPhone.classList.remove('tab-active');
    tabPhone.classList.add('tab-inactive');

    phoneInput.classList.add('hidden');
    emailInput.classList.remove('hidden');
});
