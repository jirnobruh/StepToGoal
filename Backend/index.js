const toggleBtn = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');

toggleBtn.addEventListener('click', () => {
    sideMenu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});

overlay.addEventListener('click', () => {
    sideMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

(function () {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const hero = document.getElementById('hero');

    function updateHeroHeight() {
        const vh = window.innerHeight;
        const headerH = header ? header.getBoundingClientRect().height : 0;
        const footerH = footer ? footer.getBoundingClientRect().height : 0;
        const gap = 24; // запас, чтобы элементы не прилипали

        // Выставляем точную высоту секции, чтобы footer был виден без пустоты
        const target = Math.max(420, vh - headerH - footerH - gap);
        hero.style.height = target + 'px';
    }

    window.addEventListener('load', updateHeroHeight);
    window.addEventListener('resize', updateHeroHeight);

    // Если футер/header меняют размер динамически
    if (window.ResizeObserver && header && footer) {
        const ro = new ResizeObserver(updateHeroHeight);
        ro.observe(header);
        ro.observe(footer);
    }
})();

document.getElementById('user-icon').addEventListener('click', () => {
    window.location.href = 'Frontend/profile.html';
});