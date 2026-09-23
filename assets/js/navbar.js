// Navbar scroll logic & Mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const menu = document.getElementById('navbar-menu');
            
            if (currentScroll > 80 && currentScroll > lastScroll && menu && !menu.classList.contains('active')) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            if (currentScroll > 0) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        });
    }

    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('navbar-menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');

            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
});
