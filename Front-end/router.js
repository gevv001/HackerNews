import { createMainPage } from './JS/Pages/home.js';
// import other page functions as needed

const routes = {
    '/': () => createMainPage('news'),
    '/news': () => createMainPage('news'),
    '/ask': () => createMainPage('ask'),
    '/show': () => createMainPage('show'),
    '/comments': () => createMainPage('comments'),
    // add other paths like '/login', '/post/:id', etc.
};

export function loadPage() {
    const path = window.location.pathname;
    console.log(path);
    
    const routeFn = routes[path];

    const main = document.getElementById('main') || document.getElementById('app');
    main.innerHTML = ''; // Clear previous content

    if (routeFn) {
        console.log(routeFn);
        
        routeFn();
    } else {
        main.innerHTML = '<h2>404 Page Not Found</h2>';
    }
}

export function initRouter() {
    // Handle link clicks
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href.startsWith(window.location.origin)) {
            const href = link.getAttribute('href');
            if (routes[href]) {
                e.preventDefault();
                history.pushState({}, '', href);
                loadPage();
            }
        }
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', loadPage);

    // Load the initial page
    loadPage();
}
