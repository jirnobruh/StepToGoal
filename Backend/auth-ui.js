import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Инициализация клиента
// Используем проверку, так как в модулях supabase может подгружаться чуть иначе
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Elements ---
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const phoneLoginInput = document.querySelector('#phone-input input');
const phoneRegInput = document.getElementById('reg-phone');
const loginTabs = document.getElementById('login-tabs');
const btnLogin = document.getElementById('show-login');
const btnRegister = document.getElementById('show-register');
const tabPhone = document.getElementById('tab-phone');
const tabEmail = document.getElementById('tab-email');
const phoneInputCont = document.getElementById('phone-input');
const emailInputCont = document.getElementById('email-input');
const phoneMaskInput = phoneInputCont.querySelector('input');

let loginStep = 1; // ОСТАВИЛИ ТОЛЬКО ОДНО ОБЪЯВЛЕНИЕ
let isPhoneMode = true;

// --- УНИФИКАЦИЯ НОМЕРА ---
// Функция достает только цифры и всегда добавляет +7 в начало
const getCleanPhone = (inputValue) => {
    const digits = inputValue.replace(/\D/g, ''); // Удаляем всё кроме цифр
    return `+7${digits}`; // Всегда возвращаем +79991112233
};

const formatPhoneToEmail = (phoneValue) => {
    return `${getCleanPhone(phoneValue)}@phone.local`;
};

// --- МАСКА ДЛЯ ОБОИХ ПОЛЕЙ ---
const applyMask = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 10);
    let m = '';
    if (v.length > 0) m += v.substring(0, 3);
    if (v.length > 3) m += ' ' + v.substring(3, 6);
    if (v.length > 6) m += ' ' + v.substring(6, 8);
    if (v.length > 8) m += ' ' + v.substring(8, 10);
    e.target.value = m;
};

phoneLoginInput.addEventListener('input', applyMask);
phoneRegInput.addEventListener('input', applyMask);

// --- Переключение Вход/Регистрация ---
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

// --- Переключение Телефон/Почта ---
const switchTab = (mode) => {
    isPhoneMode = mode === 'phone';

    // Обновляем классы вкладок
    if (isPhoneMode) {
        tabPhone.className = 'flex-1 py-2 text-sm tab-active';
        tabEmail.className = 'flex-1 py-2 text-sm tab-inactive';
        phoneInputCont.classList.remove('hidden');
        emailInputCont.classList.add('hidden');
    } else {
        tabPhone.className = 'flex-1 py-2 text-sm tab-inactive';
        tabEmail.className = 'flex-1 py-2 text-sm tab-active';
        phoneInputCont.classList.add('hidden');
        emailInputCont.classList.remove('hidden');
    }
};

tabPhone.addEventListener('click', () => switchTab('phone'));
tabEmail.addEventListener('click', () => switchTab('email'));

// --- Маска телефона (7999 123 45 67) ---
phoneMaskInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 10);
    let m = '';
    if (v.length > 0) m += v.substring(0, 3);
    if (v.length > 3) m += ' ' + v.substring(3, 6);
    if (v.length > 6) m += ' ' + v.substring(6, 8);
    if (v.length > 8) m += ' ' + v.substring(8, 10);
    e.target.value = m;
});

// --- ВХОД ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    if (loginStep === 1) {
        if (!document.getElementById('login-password')) {
            const passInput = document.createElement('input');
            passInput.id = 'login-password';
            passInput.type = 'password';
            passInput.placeholder = 'Пароль';
            passInput.className = 'w-full px-4 py-3 rounded-xl input-field text-center focus:outline-none mt-4';
            passInput.required = true;
            loginForm.insertBefore(passInput, submitBtn);
        }
        submitBtn.innerText = 'Подтвердить';
        loginStep = 2;
        return;
    }

    if (loginStep === 2) {
        const password = document.getElementById('login-password').value;
        const isPhone = !document.getElementById('phone-input').classList.contains('hidden');

        submitBtn.disabled = true;
        let emailForLogin;

        if (isPhone) {
            // Для входа по телефону: ищем профиль по phone_raw
            const cleanPhone = getCleanPhone(phoneLoginInput.value);
            console.log("Поиск профиля для телефона:", cleanPhone);

            const { data: profileData, error: profileError } = await client
                .from('profiles')
                .select('email')
                .eq('phone_raw', cleanPhone)
                .single();

            if (profileError || !profileData?.email) {
                alert('Пользователь с таким номером не найден');
                submitBtn.disabled = false;
                return;
            }

            emailForLogin = profileData.email;
        } else {
            emailForLogin = document.querySelector('#email-input input').value;
        }

        console.log("Попытка входа с email:", emailForLogin);

        const { error } = await client.auth.signInWithPassword({
            email: emailForLogin,
            password: password
        });

        if (error) {
            alert('Ошибка входа: ' + error.message);
            submitBtn.disabled = false;
        } else {
            window.location.href = '../index.html';
        }
    }
});

// --- РЕГИСТРАЦИЯ ---
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('reg-first-name').value;
    const lastName = document.getElementById('reg-last-name').value;
    const phoneValue = phoneRegInput.value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const passwordConfirm = document.getElementById('reg-password-confirm').value;

    if (password !== passwordConfirm) return alert('Пароли не совпадают!');
    if (password.length < 6) return alert('Пароль слишком короткий');

    const cleanPhone = getCleanPhone(phoneValue);
    // Если введена почта - используем её, если нет - наш спец. формат
    const regEmail = email.trim() !== '' ? email : `${cleanPhone}@phone.local`;

    const { data, error } = await client.auth.signUp({
        email: regEmail,
        password: password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                phone_raw: cleanPhone // Сохраняем как +79991112233
            }
        }
    });

    if (error) {
        alert('Ошибка: ' + error.message);
        return;
    }

    // После успешной регистрации создаём запись в profiles
    if (data?.user?.id) {
        const { error: profileError } = await client
            .from('profiles')
            .insert({
                user_id: data.user.id,
                phone_raw: cleanPhone,
                first_name: firstName,
                last_name: lastName,
                email: regEmail
            });

        if (profileError) {
            console.error('Ошибка создания профиля:', profileError);
            alert('Профиль создан, но произошла ошибка при сохранении данных');
            return;
        }
    }

    alert('Успешно! Теперь войдите в систему.');
    location.reload(); // Перезагрузим, чтобы сбросить формы
});