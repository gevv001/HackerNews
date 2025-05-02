export function createSubmitPage() {
    const main = document.getElementById('main');
    main.innerHTML = `
      <h2>Submit a Post</h2>
      <form id="submit-form">
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="About" name="about"/>
        <input type="url" placeholder="URL" name="url"/>
        <button type="submit">Submit</button>
      </form>

      <p>Title required. If no url, post is a question in Ask. If URL present, text is optional. for Show, prefix the title with Show HN:</p>
    `;

    document.getElementById('submit-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const url = form.url.value;
        const about = form.about.value;

        try {
            const res = await fetch('http://localhost:3000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, about, url }),
            });
            console.log(res);
            
            if (!res.ok) throw new Error('Failed to submit');
            alert('Post submitted!');
            window.location.href = '/';
        } catch (err) {
            alert(err.message);
        }
    });
}
