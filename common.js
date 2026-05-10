// common.js - إدارة الجلسة والقائمة المنسدلة
function isLoggedIn() {
    return localStorage.getItem('dabirha_user') !== null;
}

function getCurrentUser() {
    const userStr = localStorage.getItem('dabirha_user');
    return userStr ? JSON.parse(userStr) : null;
}

function logout() {
    localStorage.removeItem('dabirha_user');
    window.location.href = 'index.html';
}

function requireLogin() {
    if (!isLoggedIn()) {
        alert('الرجاء تسجيل الدخول أولاً');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function updateNavbarForAuth() {
    const loginBtn = document.getElementById('loginNavBtn');
    const userMenuContainer = document.getElementById('userMenuContainer');
    if (!loginBtn) return;
    if (isLoggedIn()) {
        const user = getCurrentUser();
        const userName = user.firstName || user.email || 'مستخدم';
        loginBtn.style.display = 'none';
        if (!userMenuContainer) {
            const newContainer = document.createElement('div');
            newContainer.id = 'userMenuContainer';
            newContainer.className = 'user-menu-container';
            newContainer.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-dropdown-btn">👤 ${userName} <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        <a href="profile.html">📋 ملفي الشخصي</a>
                        <a href="#" id="logoutBtnFromMenu">🚪 تسجيل الخروج</a>
                    </div>
                </div>
            `;
            const navActions = loginBtn.parentNode;
            navActions.appendChild(newContainer);
            document.getElementById('logoutBtnFromMenu')?.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        } else {
            const userNameSpan = userMenuContainer.querySelector('.user-dropdown-btn');
            if (userNameSpan) userNameSpan.innerHTML = `👤 ${userName} <i class="fas fa-chevron-down"></i>`;
            userMenuContainer.style.display = 'block';
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (userMenuContainer) userMenuContainer.style.display = 'none';
    }
}