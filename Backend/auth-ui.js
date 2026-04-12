// --- Elements ---
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginTabs = document.getElementById('login-tabs');

const btnLogin = document.getElementById('show-login');
const btnRegister = document.getElementById('show-register');

const tabPhone = document.getElementById('tab-phone');
const tabEmail = document.getElementById('tab-email');

const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');

// --- Password field ---
let passwordField = null;
let loginStep = 1;

// Вход / Регистрация
btnRegister.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    loginTabs.classList.add('hidden');
    registerForm.classList.remove('hidden');

    btnRegister.classList.replace('text-gray-400', 'text-gray-800');
    btnLogin.classList.replace('text-gray-800', 'text-gray-400');
});

btnLogin.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    loginTabs.classList.remove('hidden');

    btnLogin.classList.replace('text-gray-400', 'text-gray-800');
    btnRegister.classList.replace('text-gray-800', 'text-gray-400');
});

// Телефон / Почта
tabPhone.addEventListener('click', () => {
    tabPhone.classList.add('tab-active');
    tabPhone.classList.remove('tab-inactive');

    tabEmail.classList.remove('tab-active');
    tabEmail.classList.add('tab-inactive');

    phoneInput.classList.remove('hidden');
    emailInput.classList.add('hidden');
});

tabEmail.addEventListener('click', () => {
    tabEmail.classList.add('tab-active');
    tabEmail.classList.remove('tab-inactive');

    tabPhone.classList.remove('tab-active');
    tabPhone.classList.add('tab-inactive');

    phoneInput.classList.add('hidden');
    emailInput.classList.remove('hidden');
});

// Маска телефона
const phoneMaskInput = document.querySelector('#phone-input input');

phoneMaskInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);

    let formatted = '';
    if (value.length > 0) formatted += value.substring(0, 3);
    if (value.length > 3) formatted += ' ' + value.substring(3, 6);
    if (value.length > 6) formatted += ' ' + value.substring(6, 8);
    if (value.length > 8) formatted += ' ' + value.substring(8, 10);

    e.target.value = formatted;
});

// Двухэтапный вход (пока без Supabase)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (loginStep === 1) {
        const isPhone = !phoneInput.classList.contains('hidden');
        const phone = phoneMaskInput.value.replace(/\s/g, '');
        const email = emailInput.querySelector('input')?.value;

        if (isPhone && phone.length !== 10) {
            alert('Введите корректный номер телефона');
            return;
        }

        if (!isPhone && (!email || !email.includes('@'))) {
            alert('Введите корректную почту');
            return;
        }

        if (!passwordField) {
            passwordField = document.createElement('input');
            passwordField.type = 'password';
            passwordField.placeholder = 'Пароль';
            passwordField.className =
                'w-full px-4 py-3 rounded-xl input-field text-center focus:outline-none';
            loginForm.insertBefore(passwordField, loginForm.lastElementChild);
        }

        loginStep = 2;
        return;
    }

    if (loginStep === 2) {
        if (!passwordField.value.trim()) {
            alert('Введите пароль');
            return;
        }

        alert('Здесь будет запрос к Supabase');
    }
});

// Регистрация (пока без Supabase)
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Здесь будет регистрация через Supabase');
});
