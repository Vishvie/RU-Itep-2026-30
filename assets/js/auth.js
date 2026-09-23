import { auth, onAuthStateChanged, signOut } from './firebase-init.js';

window.isAdmin = false;

export function setupAuth() {
    onAuthStateChanged(auth, (user) => {
        window.isAdmin = !!user;

        if (user) {
            document.documentElement.classList.add('is-admin');
            
            const adminLoginLink = document.getElementById('admin-login-link');
            const adminLogoutBtn = document.getElementById('admin-logout-btn');
            
            if (adminLoginLink) adminLoginLink.style.display = 'none';
            if (adminLogoutBtn) adminLogoutBtn.style.display = 'block';
        } else {
            document.documentElement.classList.remove('is-admin');
            
            const adminLoginLink = document.getElementById('admin-login-link');
            const adminLogoutBtn = document.getElementById('admin-logout-btn');
            
            if (adminLoginLink) adminLoginLink.style.display = 'block';
            if (adminLogoutBtn) adminLogoutBtn.style.display = 'none';
        }
    });

    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', async () => {
            await signOut(auth);
            window.location.reload();
        });
    }
}

document.addEventListener('DOMContentLoaded', setupAuth);
