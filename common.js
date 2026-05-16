// common.js - النسخة المحدّثة

// ============ Storage Helpers ============
// localStorage → يحفظ المستخدمين والإعلانات بشكل دائم
// sessionStorage → يحفظ الجلسة الحالية فقط

function isLoggedIn() {
    return sessionStorage.getItem('dabirha_session') !== null;
}

function getCurrentUser() {
    const sessionStr = sessionStorage.getItem('dabirha_session');
    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr);
    // اجلب بيانات المستخدم الكاملة من localStorage
    const users = JSON.parse(localStorage.getItem('dabirha_users')) || [];
    return users.find(u => u.email === session.email) || session;
}

function logout() {
    // احذف الجلسة فقط وليس localStorage
    sessionStorage.removeItem('dabirha_session');
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

// ============ Footer HTML ============
function getFooterHTML() {
    return `
    <footer>
        <div class="footer-inner" style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px; max-width: 1200px; margin: 0 auto;">
            <div class="footer-col">
                <h4 style="color: white;">دبرها</h4>
                <ul class="footer-links" style="list-style: none; padding: 0;">
                    <li><a href="about.html" style="color: #9CA3AF;">عن المنصة</a></li>
                    <li><a href="terms.html" style="color: #9CA3AF;">شروط الاستخدام</a></li>
                    <li><a href="privacy.html" style="color: #9CA3AF;">سياسة الخصوصية</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 style="color: white;">تواصل معنا</h4>
                <div class="social-icons" style="display: flex; gap: 16px;">
                    <a href="#" onclick="return false;" style="color: #9CA3AF;"><i class="fab fa-facebook"></i></a>
                    <a href="#" onclick="return false;" style="color: #9CA3AF;"><i class="fab fa-instagram"></i></a>
                    <a href="#" onclick="return false;" style="color: #9CA3AF;"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4 style="color: white;">روابط سريعة</h4>
                <ul class="footer-links" style="list-style: none; padding: 0;">
                    <li><a href="hand-tools.html" style="color: #9CA3AF;">معدات يدوية</a></li>
                    <li><a href="heavy-vehicles.html" style="color: #9CA3AF;">مركبات ثقيلة</a></li>
                    <li><a href="add-listing.html" style="color: #9CA3AF;">أضف إعلانك</a></li>
                    <li><a href="profile.html" style="color: #9CA3AF;">حسابي</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom" style="text-align: center; padding-top: 30px; margin-top: 30px; border-top: 1px solid #333;">
            © 2025 دبّرها – جميع الحقوق محفوظة
        </div>
    </footer>
    `;
}

// ============ Navbar Auth ============
function updateNavbarForAuth() {
    const loginBtn = document.getElementById('loginNavBtn');
    let userMenuContainer = document.getElementById('userMenuContainer');

    if (!loginBtn) return;

    if (isLoggedIn()) {
        const user = getCurrentUser();
        const userName = user ? (user.firstName || user.email || 'مستخدم') : 'مستخدم';
        loginBtn.style.display = 'none';

        if (!userMenuContainer) {
            userMenuContainer = document.createElement('div');
            userMenuContainer.id = 'userMenuContainer';
            userMenuContainer.className = 'user-menu-container';
            loginBtn.parentNode.appendChild(userMenuContainer);
        }

        userMenuContainer.style.display = 'block';
        userMenuContainer.innerHTML = `
            <div class="user-dropdown">
                <button class="user-dropdown-btn">👤 ${userName} <i class="fas fa-chevron-down"></i></button>
                <div class="dropdown-content">
                    <a href="profile.html">📋 ملفي الشخصي</a>
                    <a href="#" id="logoutBtnFromMenu">🚪 تسجيل الخروج</a>
                </div>
            </div>
        `;

        document.getElementById('logoutBtnFromMenu').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        loginBtn.style.display = 'block';
        if (userMenuContainer) userMenuContainer.style.display = 'none';
    }
}

// ============ تشغيل تلقائي ============
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbarForAuth);
} else {
    updateNavbarForAuth();
}
