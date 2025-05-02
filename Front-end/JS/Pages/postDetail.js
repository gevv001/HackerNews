export async function createPostDetailPage(postId) {
    const main = document.getElementById('main');
    main.innerHTML = '<p>Loading post...</p>';

    try {
        const res = await fetch(`http://localhost:3000/api/item/:${postId}`);
        if (!res.ok) throw new Error('Failed to load post');
        const data = await res.json();
        const { post, comments } = data;

        main.innerHTML = '';

        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.text || 'No information'}</p>
            <hr />
        `;
        main.appendChild(postDiv);

        const leaveComment = document.createElement('form');
        leaveComment.id = 'comment-form';
        leaveComment.innerHTML = ` 
            <input type="text" placeholder="Leave Your comment" name="comment-form" required />
            <button type="submit">Submit</button>
        `
        main.appendChild(leaveComment)

        leaveComment.addEventListener('submit', async (e) => {
            e.preventDefault();

            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to comment.');
                return;
            }

            const text = e.target['comment-form'].value.trim();
            if (!text) return;

            try {
                const res = await fetch('http://127.0.0.1:3000/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        text,
                        postId,
                        parentComId: null
                    })
                });

                if (!res.ok) {
                    const err = await res.json();
                    alert(err.message || 'Failed to submit comment.');
                    return;
                }

                const newComment = await res.json();

                e.target.reset();
                console.log(newComment);


                const newDiv = document.createElement('div');
                newDiv.classList.add('comment');
                newDiv.style.marginLeft = '0px';
                newDiv.innerHTML = `
                    <p><strong>${newComment.comment.author?.username || 'anonymous'}</strong>: ${newComment.comment.text}</p>
                `;
                commentContainer.prepend(newDiv);


            } catch (err) {
                console.error('Error posting comment:', err);
                alert('Something went wrong while posting your comment.');
            }
        });


        const commentSection = document.createElement('div');
        commentSection.innerHTML = `<h3>Comments</h3>`;
        const commentContainer = document.createElement('div');
        commentSection.appendChild(commentContainer);
        main.appendChild(commentSection);

        const commentMap = {};
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.classList.add('comment');
            div.style.marginLeft = `${comment.depth * 20}px`;
            div.innerHTML = `
                <p><strong>${comment.author.username || 'anonymous'}</strong>: ${comment.text}</p>
                <button class="reply-btn" data-id="${comment._id}" data-depth="${comment.depth}">Reply</button>
                <div class="reply-form-container" data-id="${comment._id}"></div>
            `;

            commentMap[comment._id] = { comment, element: div, children: [] };
        });

        const roots = [];
        comments.forEach(comment => {
            const node = commentMap[comment._id];
            if (comment.parentComId) {
                const parent = commentMap[comment.parentComId];
                if (parent) {
                    parent.children.push(node);
                }
            } else {
                roots.push(node);
            }
        });

        function renderCommentNode(node, container) {
            container.appendChild(node.element);
            node.children.forEach(child => renderCommentNode(child, container));
        }

        roots.forEach(root => renderCommentNode(root, commentContainer));

        commentSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('reply-btn')) {
                const parentComId = e.target.dataset.id;
                const depth = parseInt(e.target.dataset.depth, 10) + 1;

                const container = commentSection.querySelector(`.reply-form-container[data-id="${parentComId}"]`);
                container.innerHTML = `
                    <form class="reply-form">
                        <input type="text" name="reply" placeholder="Write a reply..." required />
                        <button type="submit">Submit reply</button>
                    </form>
                `;

                container.querySelector('.reply-form').addEventListener('submit', async (ev) => {
                    ev.preventDefault();
                    const text = ev.target.reply.value.trim();
                    if (!text) return;

                    const token = localStorage.getItem('token');
                    if (!token) {
                        alert('You must be logged in to comment.');
                        return;
                    }

                    try {
                        const res = await fetch('http://127.0.0.1:3000/api/comments', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({
                                text,
                                postId,
                                parentComId
                            })
                        });

                        if (!res.ok) {
                            const err = await res.json();
                            alert(err.message || 'Failed to post reply.');
                            return;
                        }

                        const newComment = await res.json();

                        const replyNode = document.createElement('div');
                        replyNode.classList.add('comment');
                        replyNode.style.marginLeft = `${(newComment.comment.depth || depth) * 20}px`;
                        replyNode.innerHTML = `
                            <p><strong>${newComment.comment.author.username}</strong>: ${newComment.comment.text}</p>
                            <button class="reply-btn" data-id="${newComment.comment._id}" data-depth="${newComment.comment.depth || depth}">Reply</button>
                            <div class="reply-form-container" data-id="${newComment.comment._id}"></div>
                        `;
                        container.parentNode.appendChild(replyNode);

                        ev.target.remove();
                    } catch (err) {
                        console.error('Reply error:', err);
                    }
                });
            }
        });

    } catch (err) {
        console.error(err);
        main.innerHTML = '<p>Error loading post.</p>';
    }
}
