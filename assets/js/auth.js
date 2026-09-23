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

window.customConfirm = function(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        overlay.style.backdropFilter = 'blur(4px)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '999999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';

        const modal = document.createElement('div');
        modal.style.backgroundColor = 'var(--bg-secondary, #fff)';
        modal.style.padding = '2.5rem 2rem';
        modal.style.borderRadius = '24px';
        modal.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        modal.style.maxWidth = '400px';
        modal.style.width = '90%';
        modal.style.textAlign = 'center';
        modal.style.transform = 'translateY(20px) scale(0.95)';
        modal.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        const iconContainer = document.createElement('div');
        iconContainer.style.fontSize = '4rem';
        iconContainer.style.color = '#ef4444';
        iconContainer.style.marginBottom = '1rem';
        iconContainer.innerHTML = '<ion-icon name="warning-outline"></ion-icon>';

        const text = document.createElement('h3');
        text.innerText = message;
        text.style.fontSize = '1.25rem';
        text.style.color = 'var(--text-primary, #111827)';
        text.style.marginBottom = '2rem';
        text.style.fontFamily = 'var(--font-heading, sans-serif)';
        text.style.fontWeight = '600';
        text.style.lineHeight = '1.4';

        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '1rem';
        btnContainer.style.justifyContent = 'center';

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = 'Cancel';
        cancelBtn.style.padding = '12px 24px';
        cancelBtn.style.borderRadius = '999px';
        cancelBtn.style.border = '1px solid var(--border-color, #e5e7eb)';
        cancelBtn.style.backgroundColor = 'transparent';
        cancelBtn.style.color = 'var(--text-secondary, #4b5563)';
        cancelBtn.style.cursor = 'pointer';
        cancelBtn.style.fontWeight = '500';
        cancelBtn.style.fontSize = '1rem';
        cancelBtn.style.fontFamily = 'var(--font-body, sans-serif)';
        cancelBtn.style.flex = '1';
        cancelBtn.style.transition = 'all 0.2s';
        cancelBtn.onmouseover = () => { cancelBtn.style.backgroundColor = 'var(--bg-tertiary, #f3f4f6)'; cancelBtn.style.color = 'var(--text-primary, #111827)'; };
        cancelBtn.onmouseout = () => { cancelBtn.style.backgroundColor = 'transparent'; cancelBtn.style.color = 'var(--text-secondary, #4b5563)'; };
        cancelBtn.onclick = () => close(false);

        const confirmBtn = document.createElement('button');
        confirmBtn.innerText = 'Delete';
        confirmBtn.style.padding = '12px 24px';
        confirmBtn.style.borderRadius = '999px';
        confirmBtn.style.border = 'none';
        confirmBtn.style.backgroundColor = '#ef4444';
        confirmBtn.style.color = '#fff';
        confirmBtn.style.cursor = 'pointer';
        confirmBtn.style.fontWeight = '600';
        confirmBtn.style.fontSize = '1rem';
        confirmBtn.style.fontFamily = 'var(--font-body, sans-serif)';
        confirmBtn.style.flex = '1';
        confirmBtn.style.transition = 'background-color 0.2s, transform 0.1s';
        confirmBtn.onmouseover = () => confirmBtn.style.backgroundColor = '#dc2626';
        confirmBtn.onmouseout = () => confirmBtn.style.backgroundColor = '#ef4444';
        confirmBtn.onmousedown = () => confirmBtn.style.transform = 'scale(0.96)';
        confirmBtn.onmouseup = () => confirmBtn.style.transform = 'scale(1)';
        confirmBtn.onclick = () => close(true);

        btnContainer.appendChild(cancelBtn);
        btnContainer.appendChild(confirmBtn);
        
        modal.appendChild(iconContainer);
        modal.appendChild(text);
        modal.appendChild(btnContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0) scale(1)';
        });

        function close(result) {
            overlay.style.opacity = '0';
            modal.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                resolve(result);
            }, 300);
        }
    });
};
