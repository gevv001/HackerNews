import { loadPage } from "../../router.js";

export function isLoggedIn() {
    return Boolean(localStorage.getItem('token'));
}

export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

export function redirectToLogin(redirectPath = '/') {
    alert('Please log in to continue.');
    localStorage.setItem('redirectAfterLogin', redirectPath);
    history.pushState({}, '', '/login');
    loadPage();
}
