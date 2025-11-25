// Меню (копия логики)
const toggleBtn = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');

toggleBtn && toggleBtn.addEventListener('click', () => {
    sideMenu && sideMenu.classList.remove('-translate-x-full');
    overlay && overlay.classList.remove('hidden');
});
overlay && overlay.addEventListener('click', () => {
    sideMenu && sideMenu.classList.add('-translate-x-full');
    overlay && overlay.classList.add('hidden');
});

// Кнопка назад: если есть история — назад, иначе на index.html
const backBtn = document.getElementById('back-btn');
backBtn && backBtn.addEventListener('click', () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = 'directions.html';
});

// Темы: кликабельны — пока логируем и можно переходить на topic.html
document.querySelectorAll('.topics-list a').forEach(a => {
    a.addEventListener('click', (e) => {
        // Здесь можно добавить аналитику или анимацию
        // По умолчанию ссылка ведёт на topic.html?topic=...
        // Если хочешь перехватить и сделать SPA — preventDefault и обработать.
        console.log('Открыть тему:', a.dataset.topic);
    });
});

