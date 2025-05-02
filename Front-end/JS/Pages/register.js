import { loadPage } from "../../router.js";


export function createRegisterPage() {
    const main = document.getElementById('main');
    main.innerHTML = `
      <h2>Register</h2>
      <form id="register-form">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    `;

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error('Registration failed');

            const data = await res.json();
            localStorage.setItem('token', data.token);
            alert('Registered successfully');

            window.history.pushState({}, '', '/');
            loadPage();
        } catch (err) {
            alert(err.message);
        }
    });
}
