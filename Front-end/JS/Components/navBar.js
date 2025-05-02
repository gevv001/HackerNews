export const createNavBar = (authorized = false) => {
    const header = document.getElementById('header');
    header.classList.add('navbar');
    
    
    if (!authorized) {
        header.innerHTML = `
            <nav class="nav">
                <a href="/" class="logo" data-link>Hacker News</a>
                <ul class="nav-links">
                    <li><a href="/news" data-link>News</a></li>
                    <li><a href="/comments" data-link>Comments</a></li>
                    <li><a href="/ask" data-link>Ask</a></li>
                    <li><a href="/show" data-link>Show</a></li>
                    <li><a href="/submit" data-link>Submit</a></li>
                </ul>
                <a href="/login" class="login" data-link>Log in</a>
            </nav>
        `;
    } else {
        header.innerHTML = `
            <nav class="nav">
                <a href="/" class="logo" data-link>Hacker News</a>
                <ul class="nav-links">
                    <li><a href="/welcome" data-link>Welcome</a></li>
                    <li><a href="/news" data-link>News</a></li>
                    <li><a href="/comments" data-link>Comments</a></li>
                    <li><a href="/ask" data-link>Ask</a></li>
                    <li><a href="/show" data-link>Show</a></li>
                    <li><a href="/submit" data-link>Submit</a></li>
                </ul>
                <ul class="nav-profile">
                    <li><a href="/user" data-link>Profile</a></li>
                    <li><button id="logout">Log out</button></li>
                </ul>
            </nav>
        `;
    }

    const app = document.getElementById('app');
    console.log(app);
    
    app.prepend(header); 
};
