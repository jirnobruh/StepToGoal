import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Elements ---
const loadingDiv = document.getElementById('loading');
const profileContent = document.getElementById('profile-content');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');

// --- Загрузка профиля при открытии страницы ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Получаем текущего пользователя
        const { data: { user }, error: userError } = await client.auth.getUser();

        if (userError || !user) {
            // Если не авторизован, перенаправляем на авторизацию
            window.location.href = '../Frontend/auth.html';
            return;
        }

        // Получаем профиль из таблицы profiles
        const { data: profile, error: profileError } = await client
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (profileError || !profile) {
            showError();
            return;
        }

        // Заполняем поля профиля
        document.getElementById('profile-first-name').textContent = profile.first_name || 'Не указано';
        document.getElementById('profile-last-name').textContent = profile.last_name || 'Не указано';
        document.getElementById('profile-phone').textContent = profile.phone_raw || 'Не указано';
        document.getElementById('profile-email').textContent = profile.email || 'Не указано';

        // Показываем профиль
        loadingDiv.classList.add('hidden');
        profileContent.classList.remove('hidden');

    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        showError();
    }
});

// --- Выход из аккаунта ---
logoutBtn.addEventListener('click', async () => {
    const { error } = await client.auth.signOut();

    if (error) {
        alert('Ошибка выхода: ' + error.message);
    } else {
        window.location.href = '../Frontend/auth.html';
    }
});

// --- Показать ошибку ---
const showError = () => {
    loadingDiv.classList.add('hidden');
    profileContent.classList.add('hidden');
    errorMessage.classList.remove('hidden');
};

// --- Боковое меню ---
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const menuOverlay = document.getElementById('menu-overlay');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('-translate-x-full');
    menuOverlay.classList.toggle('hidden');
});

menuOverlay.addEventListener('click', () => {
    sideMenu.classList.add('-translate-x-full');
    menuOverlay.classList.add('hidden');
});
