export async function createUserProfilePage() {
    const main = document.getElementById('main');
    main.innerHTML = '<p>Loading your profile...</p>';

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to view your profile.');
            window.location.href = '/login';
            return;
        }
        console.log(localStorage.getItem('username'));
        

        const res = await fetch(`http://localhost:3000/api/user/:${localStorage.getItem('username')}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error('Failed to load profile');

        const data = await res.json();
        
        main.innerHTML = '';

        // Profile Header
        const header = document.createElement('div');
        header.innerHTML = `<h2>Your Profile (@${data.username})</h2>`;

        // About Field
        const aboutLabel = document.createElement('label');
        aboutLabel.textContent = 'About: ';
        const aboutInput = document.createElement('textarea');
        aboutInput.value = data.about || '';
        header.appendChild(aboutLabel);
        header.appendChild(aboutInput);

        // Email Field
        const emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email: ';
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.value = data.email || '';
        header.appendChild(document.createElement('br'));
        header.appendChild(emailLabel);
        header.appendChild(emailInput);

        // Save Button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save Changes';
        saveButton.addEventListener('click', async () => {
            const updated = {
                about: aboutInput.value,
                email: emailInput.value,
            };

            const updateRes = await fetch('http://localhost:3000/api/user/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updated),
            });

            if (updateRes.ok) {
                alert('Profile updated!');
            } else {
                alert('Failed to update profile.');
            }
        });

        header.appendChild(document.createElement('br'));
        header.appendChild(saveButton);

        const resetPassword = document.createElement('a')
        resetPassword.id = 'reset-pass';
        resetPassword.href = '/change-password'
        resetPassword.innerText = 'Reset Password'
        header.appendChild(resetPassword);

        main.appendChild(header);

        // Posts
        if (data.posts?.length) {
            const postSection = document.createElement('div');
            postSection.innerHTML = `<h3>Your Submissions</h3>`;
            const postList = document.createElement('ul');
            data.posts.forEach(post => {
                const li = document.createElement('li');
                li.textContent = post.title || '[No title]';
                postList.appendChild(li);
            });
            postSection.appendChild(postList);
            main.appendChild(postSection);
        }

        // Comments
        if (data.comments?.length) {
            const commentSection = document.createElement('div');
            commentSection.innerHTML = `<h3>Your Comments</h3>`;
            const commentList = document.createElement('ul');
            data.comments.forEach(comment => {
                const li = document.createElement('li');
                li.textContent = comment.text || '[No content]';
                commentList.appendChild(li);
            });
            commentSection.appendChild(commentList);
            main.appendChild(commentSection);
        }

    } catch (err) {
        console.error(err);
        main.innerHTML = '<p>Could not load your profile.</p>';
    }
}
