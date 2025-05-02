export const createFooter = () => {
    const footer = document.createElement('footer');
    
    footer.innerHTML = `
        <hr>
        <p>@Hacker News Clone</p>
        <p>2025</p>
    `

    const app = document.getElementById('app');
    app.appendChild(footer);
}