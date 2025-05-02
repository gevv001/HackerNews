export const createPostItem = (post) => {
    const postElem = document.createElement('li');
    postElem.classList.add('post-item');


    postElem.innerHTML = `
        <p class="post-title">
            <a href="${post.url || '#'}" target="_blank">${post.title}</a>
        </p>
        <p class="post-meta">
            by <a href="/user?id=${post.author.username}"><strong>${post.author.username}</strong></a> • ${new Date(post.createdAt).toLocaleString()}
        </p>
    `
    return postElem
}