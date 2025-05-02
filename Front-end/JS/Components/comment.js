export const createComment = (comment) => {
    const comElem = document.createElement('li');
    comElem.classList.add('post-item');

    comElem.innerHTML =
        `
        <p class="post-meta">
            <a href="/user?id=${comment.author.username}"><strong>${comment.author.username}</strong></a> • ${new Date(comment.createdAt).toLocaleString()} 
            <button>parent</button>
            <a>on: ${comment.postId.title}</a>
        </p>
        <p>${comment.text}</p>

    `
    return comElem
}