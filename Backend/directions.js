// Меню (копия логики из index.html)
const toggleBtn = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');

toggleBtn && toggleBtn.addEventListener('click', () => {
    sideMenu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});
overlay && overlay.addEventListener('click', () => {
    sideMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

// Обработчик кликов по направлениям
document.querySelectorAll('.dir-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dir = btn.dataset.direction;
        // Пока просто логируем; здесь можно перейти на страницу дисциплин или открыть модал
        console.log('Выбрано направление:', dir);
        // Пример: window.location.href = `/disciplines.html?direction=${encodeURIComponent(dir)}`;
    });
});