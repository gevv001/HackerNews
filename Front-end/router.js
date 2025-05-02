import { createMainPage } from './JS/Pages/home.js';
import { createLoginPage } from './JS/Pages/login.js';
import { createRegisterPage } from './JS/Pages/register.js';
import { redirectToLogin } from './JS/API/auth.js';
import { createSubmitPage } from './JS/Pages/submit.js';
import { isLoggedIn } from './JS/API/auth.js';
import { createUserProfilePage } from './JS/Pages/profile.js';
import { createPostDetailPage } from './JS/Pages/postDetail.js';
import { createChangePasswordPage } from './JS/Pages/changePassword.js';


const routes = {
    '/': () => createMainPage('news'),
    '/news': () => createMainPage('news'),
    '/ask': () => createMainPage('ask'),
    '/show': () => createMainPage('show'),
    '/comments': () => createMainPage('comments'),
    '/login': () => createLoginPage(),
    '/register': () => createRegisterPage(),
    '/submit': () => {
        if (!isLoggedIn()) {
            redirectToLogin('/submit');
        } else {
            createSubmitPage();
        }
    },
    '/user': () => createUserProfilePage(),
    '/change-password': () => createChangePasswordPage()
};

export function loadPage() {
    const path = window.location.pathname;
    const routeFn = routes[path];

    const main = document.getElementById('main')
    main.innerHTML = '';

    const itemMatch = path.match(/^\/item\/([a-f0-9]{24})$/);
    if (itemMatch) {

        const postId = itemMatch[1];
        createPostDetailPage(postId);
        return;
    }

    if (routeFn) {
        routeFn();
    } else {
        main.innerHTML = '<h2>404 Page Not Found</h2>';
    }
}

export function initRouter() {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href.startsWith(window.location.origin)) {
            const href = link.getAttribute('href');
            e.preventDefault();
            history.pushState({}, '', href);
            loadPage();
        }
    });

    window.addEventListener('popstate', loadPage);

    loadPage();
}
