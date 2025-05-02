import { loadPage } from "../../router.js";
import { createNavBar } from "../Components/navBar.js";

export function createLoginPage() {
    const main = document.getElementById('main');
    main.innerHTML = `
      <h2>Login</h2>
      <form id="login-form">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    `;
  
    document.querySelector('#login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
  
      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (!res.ok) throw new Error('Login failed');
  
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user);
        alert('Login successful');

  
        const redirect = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');

        createNavBar();
        window.history.pushState({}, '', redirect);
        loadPage();
      } catch (err) {
        alert(err.message);
      }
    });
  }
  