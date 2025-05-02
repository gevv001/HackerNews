export function createChangePasswordPage() {
    const main = document.getElementById('main');
    main.innerHTML = `
        <h2>Change Password</h2>
        <form id="change-password-form">
            <input type="password" name="currentPassword" placeholder="Current Password" required /><br />
            <input type="password" name="newPassword" placeholder="New Password" required /><br />
            <button type="submit">Change Password</button>
        </form>
    `;

    document.getElementById('change-password-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const currentPassword = form.currentPassword.value;
        const newPassword = form.newPassword.value;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:3000/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const result = await res.json();
            

            if (!res.ok) {
                alert(result.message || 'Error changing password');
            } else {
                alert('Password changed successfully');
                form.reset();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong');
        }
    });
}
