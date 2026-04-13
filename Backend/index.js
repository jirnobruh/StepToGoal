const toggleBtn = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');
const menuClose = document.getElementById('menu-close');

function openMenu() {
    if (sideMenu && overlay) {
        sideMenu.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeMenu() {
    if (sideMenu && overlay) {
        sideMenu.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
if (overlay) overlay.addEventListener('click', closeMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);

const userIcon = document.getElementById('user-icon');
if (userIcon) {
    userIcon.addEventListener('click', () => {
        window.location.href = 'Frontend/profile.html';
    });
}
